"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

import Navbar from "@/components/sistema/navbarProfissional/navbar";
import Header from "@/components/sistema/headerProfissional/header";

interface Consulta {
  id: number;
  paciente: string;
  hospital: string;
  tipoConsulta: string;
  cpf: string;
  data: string;
  horario: string;
  status: "pendente" | "aceita" | "recusada";
}

export default function Inicio() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [modalAcaoAberto, setModalAcaoAberto] = useState(false);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] =
    useState<Consulta | null>(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState<
    "aceita" | "recusada" | null
  >(null);

  useEffect(() => {
    const dadosFicticios: Consulta[] = [
      {
        id: 1,
        paciente: "João da Silva",
        hospital: "Hospital das Clínicas",
        tipoConsulta: "Cardiologia",
        cpf: "123.456.789-00",
        data: "2025-06-01",
        horario: "14:00",
        status: "pendente",
      },
      {
        id: 2,
        paciente: "Maria Oliveira",
        hospital: "Hospital São Lucas",
        tipoConsulta: "Ortopedia",
        cpf: "987.654.321-00",
        data: "2025-06-02",
        horario: "09:30",
        status: "pendente",
      },
      {
        id: 3,
        paciente: "Pedro Santos",
        hospital: "Hospital Central",
        tipoConsulta: "Dermatologia",
        cpf: "456.789.123-00",
        data: "2025-06-03",
        horario: "16:15",
        status: "pendente",
      },
    ];

    setConsultas(dadosFicticios);
  }, []);

  const abrirModalAcao = (consulta: Consulta, acao: "aceita" | "recusada") => {
    setConsultaSelecionada(consulta);
    setAcaoSelecionada(acao);
    setModalAcaoAberto(true);
  };

  const confirmarAcao = () => {
    if (consultaSelecionada && acaoSelecionada) {
      setConsultas((prev) =>
        prev
          .map((c) =>
            c.id === consultaSelecionada.id
              ? { ...c, status: acaoSelecionada }
              : c
          )
          .filter((c) => c.status === "pendente")
      );
    }
    setModalAcaoAberto(false);
    setConsultaSelecionada(null);
    setAcaoSelecionada(null);
  };

  const abrirModalInfo = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setModalInfoAberto(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Box sx={{ position: "absolute", width: "100%", display: "flex" }}>
        <Navbar />
        <Header />
      </Box>

      <Box sx={{ pt: 14, pl: 36, pr: 6, pb: 8, margin: "auto" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} color="primary.dark">
          Consultas Pendentes
        </Typography>

        {consultas.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mt={6}
          >
            Nenhuma consulta pendente.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {consultas.map((consulta) => (
              <Paper
                key={consulta.id}
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.15)",
                  },
                }}
                onClick={() => abrirModalInfo(consulta)}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary.main"
                  >
                    {consulta.paciente}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {consulta.data} às {consulta.horario}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                    fontStyle="italic"
                  >
                    {consulta.tipoConsulta} - {consulta.hospital}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalAcao(consulta, "aceita");
                    }}
                    sx={{ fontWeight: "bold", minWidth: 100 }}
                  >
                    Aceitar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalAcao(consulta, "recusada");
                    }}
                    sx={{ fontWeight: "bold", minWidth: 100 }}
                  >
                    Recusar
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Modal de ação (Aceitar/Recusar) */}
        <Dialog
          open={modalAcaoAberto}
          onClose={() => setModalAcaoAberto(false)}
          PaperProps={{ sx: { borderRadius: 3, p: 2, minWidth: 700 } }}
        >
          <DialogTitle
            sx={{ fontWeight: "bold", color: "primary.main", pb: 0 }}
          >
            Confirmar ação
          </DialogTitle>
          <DialogContent sx={{ pt: 1, pb: 1 }}>
            <DialogContentText fontSize={16}>
              Deseja realmente{" "}
              <Box
                component="span"
                fontWeight="bold"
                color={
                  acaoSelecionada === "aceita" ? "success.main" : "error.main"
                }
              >
                {acaoSelecionada === "aceita" ? "aceitar" : "recusar"}
              </Box>{" "}
              a consulta de <strong>{consultaSelecionada?.paciente}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ pt: 0 }}>
            <Button onClick={() => setModalAcaoAberto(false)} variant="text">
              Cancelar
            </Button>
            <Button
              onClick={confirmarAcao}
              color={acaoSelecionada === "aceita" ? "success" : "error"}
              variant="contained"
              sx={{ fontWeight: "bold" }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de informações */}
        <Dialog
          open={modalInfoAberto}
          onClose={() => setModalInfoAberto(false)}
          PaperProps={{ sx: { borderRadius: 3, p: 3, maxWidth: 450, minWidth: 500 } }}
        >
          <DialogTitle
            sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
          >
            Informações da Consulta
          </DialogTitle>
          <DialogContent dividers>
            {[
              {
                label: "Nome do Paciente",
                value: consultaSelecionada?.paciente,
              },
              { label: "CPF", value: consultaSelecionada?.cpf },
              { label: "Hospital", value: consultaSelecionada?.hospital },
              { label: "Consulta", value: consultaSelecionada?.tipoConsulta },
              { label: "Data", value: consultaSelecionada?.data },
              { label: "Horário", value: consultaSelecionada?.horario },
              {
                label: "Status",
                value:
                  consultaSelecionada?.status === "pendente"
                    ? "Pendente"
                    : consultaSelecionada?.status === "aceita"
                    ? "Aceita"
                    : "Recusada",
                color:
                  consultaSelecionada?.status === "aceita"
                    ? "success.main"
                    : consultaSelecionada?.status === "recusada"
                    ? "error.main"
                    : "text.primary",
              },
            ].map(({ label, value, color }, i, arr) => (
              <Box key={label} sx={{ mb: i === arr.length - 1 ? 0 : 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color={color || "text.primary"}
                >
                  {value || "-"}
                </Typography>
                {i !== arr.length - 1 && <Divider sx={{ mt: 1, mb: 1 }} />}
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModalInfoAberto(false)}
              variant="contained"
              color="primary"
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
