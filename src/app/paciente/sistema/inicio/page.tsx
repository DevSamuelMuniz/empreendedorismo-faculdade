"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Paper,
  Grid,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Schedule } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";

interface Consulta {
  id: number;
  profissionalSaude: string;
  hospital: string;
  local: string;
  tipoAtendimento: string;
  data: string;
  hora: string;
  status: "Agendada" | "Realizada" | "Cancelada";
}

export default function Dashboard() {
  const [consultasTodas, setConsultasTodas] = useState<Consulta[]>([]);
  const [consultasFiltradas, setConsultasFiltradas] = useState<Consulta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const statusLabels: Record<string, "Agendada" | "Realizada" | "Cancelada"> = {
    pendente: "Agendada",
    concluido: "Realizada",
    cancelada: "Cancelada",
  };

  const corStatus: Record<string, "success" | "error" | "warning" | "default"> = {
    Realizada: "success",
    Cancelada: "error",
    Agendada: "warning",
  };

  const fetchConsultas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/agendamentos");

      const formatadas: Consulta[] = response.data.map((ag: any) => ({
        id: ag.id_agendamento,
        profissionalSaude: ag.nome_profissional,
        hospital: ag.nome_unidade,
        local: ag.endereco_unidade || "Sala não informada",
        tipoAtendimento: ag.observacoes || "Não informado",
        data: ag.data_consulta,
        hora: ag.hora_consulta,
        status: statusLabels[ag.status] || "Agendada",
      }));

      setConsultasTodas(formatadas);
      setConsultasFiltradas(formatadas);
    } catch (err) {
      console.error("Erro ao buscar agendamentos", err);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  useEffect(() => {
    if (filtroStatus === "Todos") {
      setConsultasFiltradas(consultasTodas);
    } else {
      setConsultasFiltradas(consultasTodas.filter((c) => c.status === filtroStatus));
    }
  }, [filtroStatus, consultasTodas]);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <Box className="pt-24 pl-64 pr-6 pb-10">
        <Typography
          className="flex items-center gap-3"
          variant="h4"
          fontWeight="bold"
          color="text.secondary"
          gutterBottom
        >
          <MedicalServicesIcon className="text-red-400" />
          Olá, bem-vindo ao seu espaço
        </Typography>

        <Paper elevation={3} className="p-4 mb-6">
          <Typography variant="h6" gutterBottom>
            Consultas Disponíveis
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {["Clínico Geral", "Pediatra", "Cardiologista", "Dermatologista", "Ginecologista"].map((tipo, index) => (
              <Chip key={index} label={tipo} variant="outlined" clickable />
            ))}
          </Stack>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3} className="mb-6">
          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Total de Consultas</Typography>
              <Typography variant="h4" color="primary">
                {consultasTodas.length}
              </Typography>
            </CardContent>
          </Card>

          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Realizadas</Typography>
              <Typography variant="h4" color="secondary">
                {consultasTodas.filter((c) => c.status === "Realizada").length}
              </Typography>
            </CardContent>
          </Card>

          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Histórico</Typography>
              <Typography variant="h4" color="success.main">
                {consultasTodas.length}
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Box className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Typography variant="h5" fontWeight="medium">
            Consultas Registradas
          </Typography>

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
        </Box>

        <Grid container spacing={2} className="mb-6">
          {consultasFiltradas.map((consulta) => (
            <Grid item xs={12} sm={6} md={4} key={consulta.id}>
              <Card
                className="hover:shadow-xl transition duration-300 h-full"
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {consulta.profissionalSaude}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {consulta.tipoAtendimento} - {consulta.hospital} - {consulta.local}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {consulta.data} às {consulta.hora}
                  </Typography>
                  <Chip
                    label={consulta.status}
                    className="mt-2"
                    color={corStatus[consulta.status] || "default"}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={2} className="p-4">
          <Typography variant="h6" gutterBottom>
            Consultas Recentes
          </Typography>
          <Grid container spacing={2}>
            {consultasFiltradas.slice(0, 3).map((c) => (
              <Grid item xs={12} md={4} key={c.id}>
                <Card component={motion.div} whileHover={{ scale: 1.03 }} className="h-full">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {c.profissionalSaude}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo: {c.tipoAtendimento}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hospital: {c.hospital}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data: {c.data} às {c.hora}
                    </Typography>
                    <Chip
                      label={c.status}
                      className="mt-2"
                      color={corStatus[c.status] || "default"}
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </main>
  );
}
