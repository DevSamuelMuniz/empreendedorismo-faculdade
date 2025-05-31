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
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from "@mui/material";
import { Schedule, Close } from "@mui/icons-material";

const consultasMock = [
  {
    id: 1,
    profissional: "Dr. João da Silva",
    especialidade: "Cardiologia",
    hospital: "Hospital Coração Recife",
    paciente: "Samuel Muniz",
    endereco: "Av. Agamenon Magalhães, 1234 - Recife, PE",
    latitude: -8.047562,
    longitude: -34.876964,
    data: "10/04/2025",
    hora: "14:00",
    status: "Agendada",
  },
  {
    id: 2,
    profissional: "Dra. Marina Costa",
    especialidade: "Dermatologia",
    hospital: "Clínica Pele Viva",
    paciente: "Lucas Lima",
    endereco: "Rua das Flores, 120 - Recife, PE",
    latitude: -8.054378,
    longitude: -34.887432,
    data: "15/04/2025",
    hora: "09:30",
    status: "Realizada",
  },
  {
    id: 3,
    profissional: "Dr. Ricardo Nunes",
    especialidade: "Neurologia",
    hospital: "NeuroCentro Recife",
    paciente: "Carla Dias",
    endereco: "Av. Rui Barbosa, 789 - Recife, PE",
    latitude: -8.042001,
    longitude: -34.907281,
    data: "18/04/2025",
    hora: "16:00",
    status: "Cancelada",
  },
  {
    id: 4,
    profissional: "Dra. Ana Beatriz",
    especialidade: "Pediatria",
    hospital: "Hospital Infantil Recife",
    paciente: "Pedro Henrique",
    endereco: "Av. Norte Miguel Arraes, 345 - Recife, PE",
    latitude: -8.040112,
    longitude: -34.920144,
    data: "20/04/2025",
    hora: "10:00",
    status: "Agendada",
  },
];

export default function Consultas() {
  const [consultas, setConsultas] = useState(consultasMock);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [openModal, setOpenModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null);

  useEffect(() => {
    if (filtroStatus === "Todos") {
      setConsultas(consultasMock);
    } else {
      setConsultas(consultasMock.filter((c) => c.status === filtroStatus));
    }
  }, [filtroStatus]);

  const openDetalhes = (consulta: any) => {
    setConsultaSelecionada(consulta);
    setOpenModal(true);
  };

  const closeModal = () => {
    setConsultaSelecionada(null);
    setOpenModal(false);
  };

  const confirmarCancelamento = () => {
    const atualizadas = consultas.map((c) =>
      c.id === consultaSelecionada.id ? { ...c, status: "Cancelada" } : c
    );
    setConsultas(atualizadas);
    closeModal();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <div className="pt-24 pl-64 pr-6 pb-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Suas consultas
        </h1>

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

          <Link href="/sistema/Agendamento">
            <Button variant="contained" startIcon={<Schedule />}>
              Nova Consulta
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {consultas.map((consulta) => (
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
                color={
                  consulta.status === "Realizada"
                    ? "success"
                    : consulta.status === "Cancelada"
                    ? "error"
                    : "warning"
                }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Informações Gerais</h3>
              <p>
                <strong>Médico:</strong> {consultaSelecionada?.profissional}
              </p>
              <p>
                <strong>Especialidade:</strong>{" "}
                {consultaSelecionada?.especialidade}
              </p>
              <p>
                <strong>Paciente:</strong> {consultaSelecionada?.paciente}
              </p>
              <p>
                <strong>Hospital:</strong> {consultaSelecionada?.hospital}
              </p>
              <p>
                <strong>Endereço:</strong> {consultaSelecionada?.endereco}
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Horário</h3>
                <p>
                  <strong>Data:</strong> {consultaSelecionada?.data}
                </p>
                <p>
                  <strong>Hora:</strong> {consultaSelecionada?.hora}
                </p>
                <Chip
                  label={consultaSelecionada?.status}
                  className="mt-2"
                  color={
                    consultaSelecionada?.status === "Realizada"
                      ? "success"
                      : consultaSelecionada?.status === "Cancelada"
                      ? "error"
                      : "warning"
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Localização</h3>
              <iframe
                src={`https://maps.google.com/maps?q=${consultaSelecionada?.latitude},${consultaSelecionada?.longitude}&z=15&output=embed`}
                width="100%"
                height="250"
                style={{ borderRadius: 8 }}
                loading="lazy"
              ></iframe>

              <p className="mt-2 text-sm text-gray-600">
                Chegue com 15 minutos de antecedência. Traga seus documentos e
                exames anteriores.
              </p>

              <Button
                variant="outlined"
                className="mt-4"
                href={`https://www.google.com/maps/search/?api=1&query=${consultaSelecionada?.latitude},${consultaSelecionada?.longitude}`}
                target="_blank"
              >
                Abrir no Google Maps
              </Button>
            </div>
          </div>
        </DialogContent>

        {consultaSelecionada?.status === "Agendada" && (
          <DialogActions>
            <Button
              onClick={confirmarCancelamento}
              color="error"
              variant="contained"
            >
              Cancelar Consulta
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </main>
  );
}
