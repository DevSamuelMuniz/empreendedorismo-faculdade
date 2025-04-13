// AgendarConsulta.tsx
"use client";

import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

export default function AgendarConsulta() {
  const hospitalList = [
    { id: 1, nome: "Hospital Central" },
    { id: 2, nome: "Unidade Saúde Norte" },
    { id: 3, nome: "UPA Recife Sul" },
  ];

  const tipos = [
    {
      id: 1,
      nome: "Consulta Clínica Geral",
      descricao: "Atendimento médico geral.",
    },
    {
      id: 2,
      nome: "Exame de Sangue",
      descricao: "Coleta para análise laboratorial.",
    },
    {
      id: 3,
      nome: "Consulta Pediátrica",
      descricao: "Atendimento para crianças.",
    },
  ];

  const medicos = [
    {
      nome: "Dra. Carla Mendes",
      especialidade: "Clínico Geral",
      crm: "12345-PE",
    },
    { nome: "Dr. Rafael Sousa", especialidade: "Pediatra", crm: "67890-PE" },
  ];

  const [hospitalSelecionado, setHospitalSelecionado] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleAgendar = () => {
    if (hospitalSelecionado && tipoSelecionado && data && hora) {
      setSucesso(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          Agendar Consulta ou Exame
        </Typography>

        <Box my={4}>
          <Autocomplete
            options={hospitalList}
            getOptionLabel={(option) => option.nome}
            onChange={(e, value) => setHospitalSelecionado(value)}
            renderInput={(params) => (
              <TextField {...params} label="Selecione o hospital" fullWidth />
            )}
          />
        </Box>

        <Typography variant="h6" className="mb-2 text-gray-600">
          Tipo de Atendimento
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" mb={4}>
          {tipos.map((tipo) => (
            <Card
              key={tipo.id}
              onClick={() => setTipoSelecionado(tipo)}
              className={`cursor-pointer hover:shadow-md transition-all w-[300px] ${
                tipoSelecionado?.id === tipo.id
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <CardContent>
                <Typography variant="h6">{tipo.nome}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {tipo.descricao}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {tipoSelecionado?.nome.includes("Consulta") && (
          <Box mb={4}>
            <Typography variant="h6" className="mb-2 text-gray-600">
              Selecione o Médico
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {medicos.map((medico, index) => (
                <Card
                  key={index}
                  onClick={() => setMedicoSelecionado(medico)}
                  className={`cursor-pointer hover:shadow-md transition-all w-[300px] ${
                    medicoSelecionado?.nome === medico.nome
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar>{medico.nome[0]}</Avatar>
                      <Box>
                        <Typography>{medico.nome}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {medico.especialidade} | CRM {medico.crm}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        <Box display="flex" gap={4} mb={4} flexWrap="wrap">
          <DatePicker
            label="Escolha a data"
            value={data}
            onChange={(novaData) => setData(novaData)}
          />
          <TimePicker
            label="Horário"
            value={hora}
            onChange={(novaHora) => setHora(novaHora)}
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleAgendar}
          disabled={!hospitalSelecionado || !tipoSelecionado || !data || !hora}
        >
          Confirmar Agendamento
        </Button>

        <Snackbar
          open={sucesso}
          autoHideDuration={3000}
          onClose={() => setSucesso(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Consulta agendada com sucesso!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
