"use client";

import { useEffect, useState } from "react";

//components
import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";

//libs
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Schedule, Cancel } from "@mui/icons-material";

const consultasMock = [
  {
    id: 1,
    paciente: "João da Silva",
    data: "2025-04-10",
    hora: "14:00",
    status: "Agendada",
  },
  {
    id: 2,
    paciente: "Maria Oliveira",
    data: "2025-04-11",
    hora: "09:30",
    status: "Realizada",
  },
  {
    id: 3,
    paciente: "Carlos Lima",
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
];

export default function Consultas() {
  const [consultas, setConsultas] = useState(consultasMock);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [openModal, setOpenModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  useEffect(() => {
    if (filtroStatus === "Todos") {
      setConsultas(consultasMock);
    } else {
      setConsultas(consultasMock.filter((c) => c.status === filtroStatus));
    }
  }, [filtroStatus]);

  const handleOpenModal = (consulta: any) => {
    setConsultaSelecionada(consulta);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setConsultaSelecionada(null);
  };

  const confirmarCancelamento = () => {
    if (!consultaSelecionada) return;
    const atualizadas = consultas.map((c) =>
      c.id === consultaSelecionada.id ? { ...c, status: "Cancelada" } : c
    );
    setConsultas(atualizadas);
    handleCloseModal();
  };

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
          Suas consultas
        </Typography>

        {/* Filtros e nova consulta */}
        <Box className="flex justify-between items-center mb-4 flex-wrap gap-4">
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
                <Box className="flex justify-between items-center flex-wrap gap-2">
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {consulta.paciente}
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
                  </Box>

                  {consulta.status === "Agendada" && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleOpenModal(consulta)}
                    >
                      Cancelar consulta
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Modal de confirmação */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Cancelar Consulta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja cancelar a consulta com
            <strong>{consultaSelecionada?.paciente}</strong> no dia
            <strong>{consultaSelecionada?.data}</strong> às
            <strong>{consultaSelecionada?.hora}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Voltar</Button>
          <Button onClick={confirmarCancelamento} color="error" variant="contained">
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
