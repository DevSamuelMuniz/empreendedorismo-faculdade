"use client";

import React, { useEffect, useState } from "react";
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

const consultasMock = [
  {
    id: 1,
    profissionalSaude: "Dr. João da Silva",
    hospital: "UPA Lagoa Encantada",
    local: "Sala 03 - Bloco A",
    tipoAtendimento: "Clínico Geral",
    data: "2025-04-10",
    hora: "14:00",
    status: "Agendada",
  },
  {
    id: 2,
    profissionalSaude: "Dra. Maria Oliveira",
    hospital: "UPA Lagoa Encantada",
    local: "Sala 01 - Bloco B",
    tipoAtendimento: "Pediatra",
    data: "2025-04-11",
    hora: "09:30",
    status: "Realizada",
  },
  {
    id: 3,
    profissionalSaude: "Dr. Carlos Lima",
    hospital: "UPA Lagoa Encantada",
    local: "Consultório 2",
    tipoAtendimento: "Cardiologista",
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
  {
    id: 4,
    profissionalSaude: "Dr. João Lima",
    hospital: "UPA Lagoa Encantada",
    local: "Consultório 5",
    tipoAtendimento: "Dermatologista",
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
  {
    id: 5,
    profissionalSaude: "Dr. Carlos Lima",
    hospital: "UPA Lagoa Encantada",
    local: "Consultório 4",
    tipoAtendimento: "Ginecologista",
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
];

const consultasDisponiveis = [
  "Clínico Geral",
  "Pediatra",
  "Cardiologista",
  "Dermatologista",
  "Ginecologista",
];

export default function Dashboard() {
  const [consultas, setConsultas] = useState(consultasMock);
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  useEffect(() => {
    if (filtroStatus === "Todos") {
      setConsultas(consultasMock);
    } else {
      setConsultas(consultasMock.filter((c) => c.status === filtroStatus));
    }
  }, [filtroStatus]);

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
            {consultasDisponiveis.map((tipo, index) => (
              <Chip key={index} label={tipo} variant="outlined" clickable />
            ))}
          </Stack>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3} className="mb-6">
          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Minhas Consultas</Typography>
              <Typography variant="h4" color="primary">
                12
              </Typography>
            </CardContent>
          </Card>

          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Consultas Realizadas</Typography>
              <Typography variant="h4" color="secondary">
                6
              </Typography>
            </CardContent>
          </Card>

          <Card component={motion.div} whileHover={{ scale: 1.03 }} className="flex-1">
            <CardContent>
              <Typography variant="h6">Histórico Total</Typography>
              <Typography variant="h4" color="success.main">
                20
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Box className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <Typography variant="h5" fontWeight="medium">
            Suas Próximas Consultas
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

          <Link href="/sistema/Agendamento">
            <Button variant="contained" startIcon={<Schedule />}>
              Nova Consulta
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2} className="mb-6">
          {consultas.map((consulta) => (
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
                    color={
                      consulta.status === "Realizada"
                        ? "success"
                        : consulta.status === "Cancelada"
                        ? "error"
                        : "warning"
                    }
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
            {consultasMock.slice(0, 3).map((c) => (
              <Grid item xs={12} md={4} key={c.id}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  className="h-full"
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
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
                      color={
                        c.status === "Realizada"
                          ? "success"
                          : c.status === "Cancelada"
                          ? "error"
                          : "warning"
                      }
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
