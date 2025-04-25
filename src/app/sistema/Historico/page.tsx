"use client";
import React from "react";

//components
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
} from "@mui/material";

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

export default function Historico() {
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
                    primary={`${c.paciente} - ${c.data} às ${c.hora}`}
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
