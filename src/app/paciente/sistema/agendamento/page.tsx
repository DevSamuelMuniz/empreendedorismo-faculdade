"use client";

import Header from "@/components/sistema/header/header";
import Navbar from "@/components/sistema/navbar/navbar";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import axios from "axios";

interface UnidadeSaude {
  id_unidade: number;
  un_nome: string;
}

interface Consulta {
  id_consulta: number;
  profissional_nome: string;
  unidade_nome: string;
  data_consulta: string;
  hora_consulta: string;
  tipo_consulta: string;
}

export default function AgendarConsulta() {
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const [pacienteNome, setPacienteNome] = useState("");
  const [pacienteCpf, setPacienteCpf] = useState("");

  const [unidadeSelecionada, setUnidadeSelecionada] = useState<UnidadeSaude | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const [tiposDisponiveis, setTiposDisponiveis] = useState<string[]>([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState<string[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/unidades", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUnidades(res.data))
      .catch(console.error);

    axios
      .get("http://localhost:8000/consultas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConsultas(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (unidadeSelecionada) {
      const tipos = consultas
        .filter((c) => c.unidade_nome === unidadeSelecionada.un_nome)
        .map((c) => c.tipo_consulta);

      setTiposDisponiveis([...new Set(tipos)]);
      setTipoSelecionado("");
      setDataSelecionada("");
      setHoraSelecionada("");
    }
  }, [unidadeSelecionada, consultas]);

  useEffect(() => {
    if (unidadeSelecionada && tipoSelecionado) {
      const datas = consultas
        .filter(
          (c) =>
            c.unidade_nome === unidadeSelecionada.un_nome &&
            c.tipo_consulta === tipoSelecionado
        )
        .map((c) => c.data_consulta);

      setDatasDisponiveis([...new Set(datas)]);
      setDataSelecionada("");
      setHoraSelecionada("");
    }
  }, [tipoSelecionado]);

  useEffect(() => {
    if (unidadeSelecionada && tipoSelecionado && dataSelecionada) {
      const horarios = consultas
        .filter(
          (c) =>
            c.unidade_nome === unidadeSelecionada.un_nome &&
            c.tipo_consulta === tipoSelecionado &&
            c.data_consulta === dataSelecionada
        )
        .map((c) => c.hora_consulta);

      setHorariosDisponiveis([...new Set(horarios)]);
      setHoraSelecionada("");
    }
  }, [dataSelecionada]);

  const handleAgendar = async () => {
    const token = localStorage.getItem("token");

    const consultaSelecionada = consultas.find(
      (c) =>
        c.unidade_nome === unidadeSelecionada?.un_nome &&
        c.tipo_consulta === tipoSelecionado &&
        c.data_consulta === dataSelecionada &&
        c.hora_consulta === horaSelecionada
    );

    if (!consultaSelecionada) {
      alert("Consulta não encontrada.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/agendamentos/novo",
        {
          cpf_paciente: pacienteCpf,
          id_consulta: consultaSelecionada.id_consulta,
          observacoes: tipoSelecionado,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSucesso(true);
      setPacienteCpf("");
      setPacienteNome("");
      setUnidadeSelecionada(null);
      setTipoSelecionado("");
      setDataSelecionada("");
      setHoraSelecionada("");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.detail || "Erro ao agendar.");
    }
  };

  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => setSucesso(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [sucesso]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <Box className="pt-24 pl-64 pr-6 pb-10 space-y-6">
        <Typography variant="h4" fontWeight="bold" color="text.secondary">
          Agendar Consulta
        </Typography>

        <Stack spacing={2}>
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
            options={unidades}
            getOptionLabel={(option) => option.un_nome}
            value={unidadeSelecionada}
            onChange={(e, value) => setUnidadeSelecionada(value)}
            renderInput={(params) => <TextField {...params} label="Unidade de Saúde" />}
          />

          {tiposDisponiveis.length > 0 && (
            <Autocomplete
              options={tiposDisponiveis}
              getOptionLabel={(option) => option}
              value={tipoSelecionado}
              onChange={(e, value) => setTipoSelecionado(value || "")}
              renderInput={(params) => <TextField {...params} label="Tipo de Consulta" />}
            />
          )}

          {datasDisponiveis.length > 0 && (
            <Autocomplete
              options={datasDisponiveis}
              getOptionLabel={(option) => option}
              value={dataSelecionada}
              onChange={(e, value) => setDataSelecionada(value || "")}
              renderInput={(params) => <TextField {...params} label="Data da Consulta" />}
            />
          )}

          {horariosDisponiveis.length > 0 && (
            <Autocomplete
              options={horariosDisponiveis}
              getOptionLabel={(option) => option}
              value={horaSelecionada}
              onChange={(e, value) => setHoraSelecionada(value || "")}
              renderInput={(params) => <TextField {...params} label="Horário" />}
            />
          )}

          {horaSelecionada && (
            <Button variant="contained" color="primary" onClick={handleAgendar}>
              Confirmar Agendamento
            </Button>
          )}
        </Stack>
      </Box>

      <Snackbar open={sucesso} autoHideDuration={3000} onClose={() => setSucesso(false)}>
        <Alert severity="success" onClose={() => setSucesso(false)}>
          Agendamento realizado com sucesso!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
