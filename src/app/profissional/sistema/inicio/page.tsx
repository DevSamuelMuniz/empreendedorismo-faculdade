"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Modal,
  Divider,
} from "@mui/material";
import Navbar from "@/components/sistema/navbarProfissional/navbar";
import Header from "@/components/sistema/headerProfissional/header";
import { useState } from "react";

export default function TelaInicial() {
  const nomeMedico = "Dr. João Mendes";

  const proximasConsultas = [
    {
      id: 1,
      paciente: "Maria Silva",
      cpf: "000.000.000-70",
      hospital: "UPA Lagoa Encantada",
      hora: "08:30",
      motivo: "Consulta de rotina",
      idade: 32,
      data: "16/10/2025",
      observacoes: "Paciente com histórico de pressão alta.",
    },
    {
      id: 2,
      paciente: "Carlos Oliveira",
      cpf: "000.000.000-80",
      hospital: "Medical Center",
      hora: "09:15",
      motivo: "Retorno",
      idade: 45,
      data: "30/10/2025",
      observacoes: "Paciente retornando após cirurgia.",
    },
  ];

  const todasConsultas = [
    {
      id: 1,
      paciente: "Maria Silva",
      hora: "08:30",
      status: "Concluída",
    },
    {
      id: 2,
      paciente: "Carlos Oliveira",
      hora: "09:15",
      status: "Em andamento",
    },
    {
      id: 3,
      paciente: "Ana Souza",
      hora: "10:00",
      status: "Pendente",
    },
  ];

  const [modalAberto, setModalAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any | null>(
    null
  );

  const abrirModal = (consulta: any) => {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setConsultaSelecionada(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <Box sx={{ position: "absolute", width: "100%", display: "flex" }}>
        <Navbar />
        <Header />
      </Box>

      <Box sx={{ pt: 12, pl: 32, pr: 4, pb: 6 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Bem-vindo, {nomeMedico}
        </Typography>
        <Typography variant="subtitle1" mb={4}>
          Aqui está uma visão geral do seu dia.
        </Typography>

        {/* Cards com Box */}
        <Box display="flex" flexWrap="wrap" gap={3} mb={5}>
          {/* Total */}
          <Paper
            elevation={3}
            sx={{ p: 3, borderLeft: "6px solid #1976d2", flex: "1 1 250px" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total de Consultas
            </Typography>
            <Typography variant="h4" color="primary">
              12
            </Typography>
            <Typography variant="body2">Agendadas para hoje</Typography>
          </Paper>

          {/* Pendentes */}
          <Paper
            elevation={3}
            sx={{ p: 3, borderLeft: "6px solid #ffa000", flex: "1 1 250px" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Pendentes
            </Typography>
            <Typography variant="h4" color="warning.main">
              5
            </Typography>
            <Typography variant="body2">Aguardando resposta</Typography>
          </Paper>

          {/* Concluídas */}
          <Paper
            elevation={3}
            sx={{ p: 3, borderLeft: "6px solid #2e7d32", flex: "1 1 250px" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Atendidas
            </Typography>
            <Typography variant="h4" color="success.main">
              7
            </Typography>
            <Typography variant="body2">Consultas concluídas</Typography>
          </Paper>
        </Box>

        {/* Próximas Consultas */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Próximas Consultas
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mb={5}>
          {proximasConsultas.map((consulta) => (
            <Paper
              key={consulta.id}
              elevation={3}
              sx={{
                p: 2,
                width: 300,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => abrirModal(consulta)}
            >
              <Typography variant="h6" fontWeight="bold">
                {consulta.hora} - {consulta.paciente}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {consulta.motivo}
              </Typography>
              <Typography variant="body2">
                <strong>Hospital:</strong> {consulta.hospital}
              </Typography>
              <Typography variant="body2">
                <strong>Idade:</strong> {consulta.idade} anos
              </Typography>
              <Typography variant="body2">
                <strong>Data:</strong> {consulta.data}
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }} fullWidth>
                Ver detalhes
              </Button>
            </Paper>
          ))}
        </Box>

        {/* Todas as Consultas (Cards) */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Todas as Consultas de Hoje
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {todasConsultas.map((consulta) => (
            <Paper
              key={consulta.id}
              elevation={2}
              sx={{
                p: 2,
                width: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight="bold">
                {consulta.hora} - {consulta.paciente}
              </Typography>
              <Box mt={1} display="flex" justifyContent="flex-end">
                <Chip
                  label={consulta.status}
                  color={
                    consulta.status === "Concluída"
                      ? "success"
                      : consulta.status === "Em andamento"
                      ? "warning"
                      : "default"
                  }
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* MODAL DE DETALHES */}
      <Modal open={modalAberto} onClose={fecharModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Detalhes da Consulta
          </Typography>
          {consultaSelecionada && (
            <>
              <Typography>
                <strong>Paciente:</strong> {consultaSelecionada.paciente}
              </Typography>
              <Typography>
                <strong>CPF:</strong> {consultaSelecionada.cpf}
              </Typography>
              <Typography>
                <strong>Hospital:</strong> {consultaSelecionada.hospital}
              </Typography>
              <Typography>
                <strong>Horário:</strong> {consultaSelecionada.hora}
              </Typography>
              <Typography>
                <strong>Motivo:</strong> {consultaSelecionada.motivo}
              </Typography>
              <Typography>
                <strong>Idade:</strong> {consultaSelecionada.idade} anos
              </Typography>
              <Typography mt={2}>
                <strong>Observações:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {consultaSelecionada.observacoes}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button fullWidth variant="contained" onClick={fecharModal}>
                Fechar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
