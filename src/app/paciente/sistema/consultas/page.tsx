"use client";

import { useEffect, useState } from "react";
import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";
import { motion } from "framer-motion";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import { Schedule, Close } from "@mui/icons-material";
import Link from "next/link";
import axios from "axios";

interface Consulta {
  id: number;
  profissional: string;
  especialidade: string;
  hospital: string;
  paciente: string;
  endereco: string;
  latitude: number;
  longitude: number;
  data: string;
  hora: string;
  status: string;
}

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [openModal, setOpenModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);

  const statusLabels: Record<string, string> = {
    pendente: "Agendada",
    concluido: "Realizada",
    cancelada: "Cancelada",
  };

  const corStatus: Record<string, any> = {
    Realizada: "success",
    Cancelada: "error",
    Agendada: "warning",
  };

  const fetchConsultas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/agendamentos");

      const formatadas: Consulta[] = response.data.map((ag: any) => ({
        id: ag.id_agendamento,
        profissional: ag.nome_profissional,
        especialidade: ag.tipo_consulta,
        hospital: ag.nome_unidade,
        paciente: ag.nome_paciente,
        endereco: ag.endereco_unidade,
        latitude: ag.latitude,
        longitude: ag.longitude,
        data: ag.data_consulta,
        hora: ag.hora_consulta,
        status: statusLabels[ag.status] || ag.status,
      }));

      setConsultas(formatadas);
    } catch (err) {
      console.error("Erro ao buscar consultas:", err);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const consultasFiltradas = filtroStatus === "Todos"
    ? consultas
    : consultas.filter((c) => c.status === filtroStatus);

  const openDetalhes = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setOpenModal(true);
  };

  const closeModal = () => {
    setConsultaSelecionada(null);
    setOpenModal(false);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <div className="pt-24 pl-64 pr-6 pb-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Consultas Agendadas</h1>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <FormControl variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Agendada">Agendada</MenuItem>
              <MenuItem value="Realizada">Realizada</MenuItem>
              <MenuItem value="Cancelada">Cancelada</MenuItem>
            </Select>
          </FormControl>

          <Link href="/paciente/sistema/agendamento">
            <Button variant="contained" startIcon={<Schedule />}>
              Nova Consulta
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {consultasFiltradas.map((consulta) => (
            <motion.div
              key={consulta.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => openDetalhes(consulta)}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4 cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {consulta.profissional}
              </h2>
              <p className="text-sm text-gray-600">
                {consulta.data} às {consulta.hora}
              </p>

              <Chip
                className="mt-2"
                label={consulta.status}
                color={corStatus[consulta.status] || "default"}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={closeModal}
        fullWidth
        maxWidth="lg"
        scroll="paper"
      >
        <DialogTitle className="flex justify-between items-center">
          Detalhes da Consulta
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {consultaSelecionada && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="h6">Informações</Typography>
                <p><strong>Médico:</strong> {consultaSelecionada.profissional}</p>
                <p><strong>Especialidade:</strong> {consultaSelecionada.especialidade}</p>
                <p><strong>Paciente:</strong> {consultaSelecionada.paciente}</p>
                <p><strong>Hospital:</strong> {consultaSelecionada.hospital}</p>
                <p><strong>Endereço:</strong> {consultaSelecionada.endereco}</p>

                <div className="mt-4">
                  <Typography variant="h6">Horário</Typography>
                  <p><strong>Data:</strong> {consultaSelecionada.data}</p>
                  <p><strong>Hora:</strong> {consultaSelecionada.hora}</p>
                  <Chip
                    label={consultaSelecionada.status}
                    className="mt-2"
                    color={corStatus[consultaSelecionada.status] || "default"}
                  />
                </div>
              </div>

              <div>
                <Typography variant="h6" className="mb-2">Localização</Typography>
                <iframe
                  src={`https://maps.google.com/maps?q=${consultaSelecionada.latitude},${consultaSelecionada.longitude}&z=15&output=embed`}
                  width="100%"
                  height="250"
                  style={{ borderRadius: 8 }}
                  loading="lazy"
                ></iframe>

                <p className="mt-2 text-sm text-gray-600">
                  Chegue com 15 minutos de antecedência. Leve documentos e exames anteriores.
                </p>

                <Button
                  variant="outlined"
                  className="mt-4"
                  href={`https://www.google.com/maps/search/?api=1&query=${consultaSelecionada.latitude},${consultaSelecionada.longitude}`}
                  target="_blank"
                >
                  Abrir no Google Maps
                </Button>
              </div>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
