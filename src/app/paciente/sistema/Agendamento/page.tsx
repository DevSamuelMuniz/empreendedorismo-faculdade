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
  MenuItem,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";

export default function AgendarConsulta() {
  const hospitalList = [
    { id: 1, nome: "Hospital Central" },
    { id: 2, nome: "Unidade Saúde Norte" },
    { id: 3, nome: "UPA Recife Sul" },
    { id: 4, nome: "Hospital Boa Viagem" },
    { id: 5, nome: "Centro Médico Olinda" },
  ];

  const tiposPorHospital = {
    "Hospital Central": [
      {
        id: 1,
        nome: "Consulta Clínica Geral",
        descricao: "Atendimento médico geral.",
      },
      {
        id: 2,
        nome: "Consulta Pediátrica",
        descricao: "Atendimento para crianças.",
      },
    ],
    "Unidade Saúde Norte": [
      {
        id: 2,
        nome: "Consulta Pediátrica",
        descricao: "Atendimento para crianças.",
      },
      {
        id: 5,
        nome: "Exame de Vista",
        descricao: "Exame oftalmológico completo.",
      },
    ],
    "UPA Recife Sul": [
      {
        id: 6,
        nome: "Consulta de Urgência",
        descricao: "Atendimento emergencial.",
      },
    ],
    "Hospital Boa Viagem": [
      { id: 4, nome: "Consulta Ginecológica", descricao: "Saúde da mulher." },
      {
        id: 7,
        nome: "Exame de Imagem",
        descricao: "Ultrassonografia e raio-x.",
      },
    ],
    "Centro Médico Olinda": [
      {
        id: 1,
        nome: "Consulta Clínica Geral",
        descricao: "Atendimento médico geral.",
      },
      {
        id: 8,
        nome: "Exame de Sangue",
        descricao: "Coleta para análise laboratorial.",
      },
    ],
  };

  const medicos = [
    {
      nome: "Dra. Carla Mendes",
      especialidade: "Clínico Geral",
      crm: "12345-PE",
      diasDisponiveis: ["Segunda", "Quarta", "Sexta"],
      horarios: ["08:00", "10:00", "14:00"],
      tipos: ["Consulta Clínica Geral"],
      hospitais: ["Hospital Central", "Centro Médico Olinda"],
    },
    {
      nome: "Dr. Rafael Sousa",
      especialidade: "Pediatra",
      crm: "67890-PE",
      diasDisponiveis: ["Terça", "Quinta"],
      horarios: ["09:00", "13:00", "16:00"],
      tipos: ["Consulta Pediátrica"],
      hospitais: ["Unidade Saúde Norte", "Hospital Central"],
    },
    {
      nome: "Dra. Juliana Lima",
      especialidade: "Ginecologista",
      crm: "11223-PE",
      diasDisponiveis: ["Segunda", "Terça", "Sexta"],
      horarios: ["07:00", "11:00", "15:00"],
      tipos: ["Consulta Ginecológica"],
      hospitais: ["Hospital Boa Viagem"],
    },
  ];

  const [hospitalSelecionado, setHospitalSelecionado] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<any>(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState<any>(null);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [pacienteNome, setPacienteNome] = useState("");
  const [pacienteCpf, setPacienteCpf] = useState("");

  const handleAgendar = () => {
    if (
      hospitalSelecionado &&
      tipoSelecionado &&
      diaSelecionado &&
      horarioSelecionado &&
      pacienteNome &&
      pacienteCpf
    ) {
      setSucesso(true);
      setPacienteNome("");
      setPacienteCpf("");
      setHospitalSelecionado(null);
      setTipoSelecionado(null);
      setMedicoSelecionado(null);
      setDiaSelecionado("");
      setHorarioSelecionado("");
    }
  };

  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => {
        setSucesso(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sucesso]);

  const tipos = hospitalSelecionado
    ? tiposPorHospital[hospitalSelecionado.nome] || []
    : [];

  const medicosFiltrados = medicos.filter((medico) =>
    tipoSelecionado && hospitalSelecionado
      ? medico.tipos.includes(tipoSelecionado.nome) &&
        medico.hospitais.includes(hospitalSelecionado.nome)
      : false
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <Box className="pt-24 pl-64 pr-6 pb-10 space-y-8">
        <Typography variant="h4" fontWeight="bold" color="text.secondary">
          Agendar Consulta ou Exame
        </Typography>

        <Typography color="red">
          Preencha todos os dados para ter o botão de confirmação.
        </Typography>
        <div className="flex flex-col gap-4">
          <TextField
            label="Nome do Paciente"
            value={pacienteNome}
            onChange={(e) => setPacienteNome(e.target.value)}
            fullWidth
          />
          <TextField
            label="CPF do Paciente"
            value={pacienteCpf}
            onChange={(e) => setPacienteCpf(e.target.value)}
            fullWidth
          />

          <Autocomplete
            options={hospitalList}
            getOptionLabel={(option) => option.nome}
            value={hospitalSelecionado}
            onChange={(e, value: any) => {
              setHospitalSelecionado(value);
              setTipoSelecionado(null);
              setMedicoSelecionado(null);
              setDiaSelecionado("");
              setHorarioSelecionado("");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Selecione o hospital" fullWidth />
            )}
          />
        </div>
        {hospitalSelecionado && tipos.length === 0 && (
          <Alert severity="info">
            Nenhum tipo de atendimento disponível para este hospital.
          </Alert>
        )}

        {hospitalSelecionado && tipos.length > 0 && (
          <>
            <Typography variant="h6" className="text-gray-600 mt-6">
              Tipo de Atendimento
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              {tipos.map((tipo: any) => (
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
          </>
        )}

        {tipoSelecionado?.nome.includes("Consulta") && (
          <Box>
            <Typography variant="h6" className="text-gray-600 mt-6 mb-2">
              Selecione o Médico
            </Typography>
            {medicosFiltrados.length === 0 ? (
              <Alert severity="info">
                Nenhum médico disponível para este atendimento neste hospital.
              </Alert>
            ) : (
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {medicosFiltrados.map((medico: any, index) => (
                  <Card
                    key={index}
                    onClick={() => {
                      setMedicoSelecionado(medico);
                      setDiaSelecionado("");
                      setHorarioSelecionado("");
                    }}
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
            )}
          </Box>
        )}

        {medicoSelecionado && (
          <Box>
            <Typography variant="h6" className="text-gray-600 mt-6">
              Selecione o Dia
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {medicoSelecionado.diasDisponiveis.map((dia: string) => (
                <Button
                  key={dia}
                  variant={diaSelecionado === dia ? "contained" : "outlined"}
                  onClick={() => setDiaSelecionado(dia)}
                >
                  {dia}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        {diaSelecionado && (
          <Box>
            <Typography variant="h6" className="text-gray-600 mt-6">
              Selecione o Horário
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {medicoSelecionado.horarios.map((hora: string) => (
                <Button
                  key={hora}
                  variant={
                    horarioSelecionado === hora ? "contained" : "outlined"
                  }
                  onClick={() => setHorarioSelecionado(hora)}
                >
                  {hora}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        {horarioSelecionado && (
          <Box>
            <Button variant="contained" color="primary" onClick={handleAgendar}>
              Confirmar Agendamento
            </Button>
          </Box>
        )}
      </Box>

      <Snackbar
        open={sucesso}
        autoHideDuration={3000}
        onClose={() => setSucesso(false)}
      >
        <Alert severity="success" onClose={() => setSucesso(false)}>
          Agendamento realizado com sucesso!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
