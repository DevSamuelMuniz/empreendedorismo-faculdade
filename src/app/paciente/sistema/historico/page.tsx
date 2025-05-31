"use client";
import React, { useState } from "react";
import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// Mock com mais detalhes
const consultasMock = [
  {
    id: 1,
    paciente: "João da Silva",
    profissional: "Dr. Ana Paula",
    especialidade: "Dermatologia",
    hospital: "Clínica Saúde Recife",
    endereco: "Rua das Flores, 500 - Recife, PE",
    latitude: -8.0489,
    longitude: -34.8770,
    data: "2025-04-10",
    hora: "14:00",
    status: "Agendada",
  },
  {
    id: 2,
    paciente: "Maria Oliveira",
    profissional: "Dr. Bruno Costa",
    especialidade: "Ortopedia",
    hospital: "Hospital Boa Viagem",
    endereco: "Av. Recife, 890 - Recife, PE",
    latitude: -8.1150,
    longitude: -34.9153,
    data: "2025-04-11",
    hora: "09:30",
    status: "Realizada",
  },
  {
    id: 3,
    paciente: "Carlos Lima",
    profissional: "Dra. Fernanda Souza",
    especialidade: "Pediatria",
    hospital: "Clínica Infantil Recife",
    endereco: "Rua das Crianças, 123 - Recife, PE",
    latitude: -8.0582,
    longitude: -34.8812,
    data: "2025-04-12",
    hora: "16:00",
    status: "Cancelada",
  },
];

export default function Historico() {
  const [openModal, setOpenModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null);

  const openDetalhes = (consulta: any) => {
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

      <Box className="pt-24 pl-64 pr-6 pb-10">
        <Typography
          className="flex items-center gap-3"
          variant="h4"
          fontWeight="bold"
          color="text.secondary"
          gutterBottom
        >
          Seu Histórico
        </Typography>

        <Paper elevation={2} className="p-4">
          <Typography variant="h6" gutterBottom>
            Consultas Recentes
          </Typography>

          <List>
            {consultasMock.map((c) => (
              <React.Fragment key={c.id}>
                <ListItem className="cursor-pointer" button onClick={() => openDetalhes(c)}>
                  <ListItemText
                    primary={`${c.paciente} - ${c.data} às ${c.hora}`}
                    secondary={`Status: ${c.status}`}
                  />
                  <Chip
                    label={c.status}
                    color={
                      c.status === "Realizada"
                        ? "success"
                        : c.status === "Cancelada"
                        ? "error"
                        : "warning"
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Modal com detalhes */}
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
                <h3 className="text-lg font-bold mb-2">Informações Gerais</h3>
                <p><strong>Paciente:</strong> {consultaSelecionada.paciente}</p>
                <p><strong>Médico:</strong> {consultaSelecionada.profissional}</p>
                <p><strong>Especialidade:</strong> {consultaSelecionada.especialidade}</p>
                <p><strong>Hospital:</strong> {consultaSelecionada.hospital}</p>
                <p><strong>Endereço:</strong> {consultaSelecionada.endereco}</p>

                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Horário</h3>
                  <p><strong>Data:</strong> {consultaSelecionada.data}</p>
                  <p><strong>Hora:</strong> {consultaSelecionada.hora}</p>
                  <Chip
                    label={consultaSelecionada.status}
                    className="mt-2"
                    color={
                      consultaSelecionada.status === "Realizada"
                        ? "success"
                        : consultaSelecionada.status === "Cancelada"
                        ? "error"
                        : "warning"
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Localização</h3>
                <iframe
                  src={`https://maps.google.com/maps?q=${consultaSelecionada.latitude},${consultaSelecionada.longitude}&z=15&output=embed`}
                  width="100%"
                  height="250"
                  style={{ borderRadius: 8 }}
                  loading="lazy"
                ></iframe>

                <p className="mt-2 text-sm text-gray-600">
                  Chegue com antecedência e leve seus documentos.
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
