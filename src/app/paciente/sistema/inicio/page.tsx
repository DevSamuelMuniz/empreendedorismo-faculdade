"use client";

import React from "react";
import { useEffect, useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import { motion } from "framer-motion";
import Link from "next/link";
import { Schedule } from "@mui/icons-material";

const consultasMock = [
  {
    id: 1,
    profissionalSaude: "João da Silva",
    hospital: "UPA Lagoa Encantada" ,
    data: "2025-04-10",
    hora: "14:00",
    status: "Agendada",
  },
  {
    id: 2,
    profissionalSaude: "Maria Oliveira",
    hospital: "UPA Lagoa Encantada" ,
    data: "2025-04-11",
    hora: "09:30",
    status: "Realizada",
  },
  {
    id: 3,
    profissionalSaude: "Carlos Lima",
    hospital: "UPA Lagoa Encantada" ,
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
  {
    id: 4,
    profissionalSaude: "Carlos Lima",
    hospital: "UPA Lagoa Encantada" ,
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
  {
    id: 5,
    profissionalSaude: "Carlos Lima",
    hospital: "UPA Lagoa Encantada" ,
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
          <MedicalServicesIcon className="text-red-400" /> Olá, bem-vindo ao seu
          espaço
        </Typography>

        {/* Consultas disponíveis */}
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

        {/* Cards de informação */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          className="mb-6"
        >
          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            className="flex-1"
          >
            <CardContent>
              <Typography variant="h6">Minhas Consultas</Typography>
              <Typography variant="h4" color="primary">
                12
              </Typography>
            </CardContent>
          </Card>

          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            className="flex-1"
          >
            <CardContent>
              <Typography variant="h6">Consultas Realizadas</Typography>
              <Typography variant="h4" color="secondary">
                6
              </Typography>
            </CardContent>
          </Card>

          <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            className="flex-1"
          >
            <CardContent>
              <Typography variant="h6">Histórico Total</Typography>
              <Typography variant="h4" color="success.main">
                20
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Filtros e nova consulta */}
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

        {/* Consultas Futuras */}
        <Stack spacing={2} className="mb-6">
          {consultas.map((consulta) => (
            <Card
              key={consulta.id}
              className="hover:shadow-xl transition duration-300"
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
          ))}
        </Stack>

        {/* Histórico Recente */}
        <Paper elevation={2} className="p-4">
          <Typography variant="h6" gutterBottom>
            Consultas Recentes
          </Typography>
          <List>
            {consultasMock.slice(0, 3).map((c) => (
              <React.Fragment key={c.id}>
                <ListItem>
                  <ListItemText
                    primary={`${c.profissionalSaude} - ${c.data} às ${c.hora}`}
                    secondary={`Status: ${c.status}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </main>
  );
}
