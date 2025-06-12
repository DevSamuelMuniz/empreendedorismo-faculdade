"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Navbar from "@/components/sistema/navbarProfissional/navbar";
import Header from "@/components/sistema/headerProfissional/header";
import axios from "axios";

export default function EditarPaciente() {
  const [pacienteOriginal, setPacienteOriginal] = useState<any>(null);
  const [paciente, setPaciente] = useState<any>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "12345678900", // usado para buscar
    dataNascimento: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    observacoes: "",
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/paciente/${paciente.cpf}`);
        const dados = response.data;

        setPacienteOriginal(dados);
        setPaciente((prev: any) => ({
          ...prev,
          nome: dados.pa_nome || "",
          email: dados.pa_email || "",
          telefone: dados.pa_telefone || "",
          dataNascimento: dados.pa_data_nascimento || "",
          endereco: {
            rua: dados.pa_endereco_rua || "",
            numero: dados.pa_endereco_numero || "",
            bairro: dados.pa_endereco_bairro || "",
            cidade: dados.pa_endereco_cidade || "",
            estado: dados.pa_endereco_estado || "",
            cep: dados.pa_endereco_cep || "",
          },
          observacoes: dados.pa_observacoes || "",
        }));
      } catch (error) {
        console.error("Erro ao buscar dados do paciente", error);
      }
    };

    fetchPaciente();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const campoEndereco = name.split(".")[1];
      setPaciente((prev: any) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campoEndereco]: value,
        },
      }));
    } else {
      setPaciente((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dados do paciente salvos!");
    console.log(paciente);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex w-full absolute">
        <Navbar />
        <Header />
      </div>

      <Box className="pt-24 pl-64 pr-6 pb-10">
        <Typography variant="h4" fontWeight="bold" color="text.secondary" gutterBottom>
          Altere seus dados
        </Typography>

        <Paper sx={{ p: 4, width: "100%" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Nome */}
            <TextField
              fullWidth
              required
              label="Nome completo"
              name="nome"
              value={paciente.nome}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_nome || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Email */}
            <TextField
              fullWidth
              required
              label="E-mail"
              name="email"
              type="email"
              value={paciente.email}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_email || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Telefone */}
            <TextField
              fullWidth
              required
              label="Telefone"
              name="telefone"
              type="tel"
              value={paciente.telefone}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_telefone || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* CPF (não editável) */}
            <TextField
              fullWidth
              label="CPF (não editável)"
              name="cpf"
              value={paciente.cpf}
              disabled
              sx={{ gridColumn: "span 1" }}
            />

            {/* Data de nascimento */}
            <TextField
              fullWidth
              required
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={paciente.dataNascimento}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ gridColumn: "span 1" }}
            />

            <Typography variant="h6" sx={{ gridColumn: "span 2" }}>
              Endereço
            </Typography>

            {/* Endereço: Rua */}
            <TextField
              fullWidth
              label="Rua"
              name="endereco.rua"
              value={paciente.endereco.rua}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_rua || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Número */}
            <TextField
              fullWidth
              label="Número"
              name="endereco.numero"
              value={paciente.endereco.numero}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_numero || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Bairro */}
            <TextField
              fullWidth
              label="Bairro"
              name="endereco.bairro"
              value={paciente.endereco.bairro}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_bairro || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Cidade */}
            <TextField
              fullWidth
              label="Cidade"
              name="endereco.cidade"
              value={paciente.endereco.cidade}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_cidade || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Estado */}
            <TextField
              fullWidth
              label="Estado"
              name="endereco.estado"
              value={paciente.endereco.estado}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_estado || ""}
              sx={{ gridColumn: "span 1" }}
            />

            {/* CEP */}
            <TextField
              fullWidth
              label="CEP"
              name="endereco.cep"
              value={paciente.endereco.cep}
              onChange={handleChange}
              placeholder={pacienteOriginal?.pa_endereco_cep || ""}
              sx={{ gridColumn: "span 1" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ gridColumn: "span 2" }}
            >
              Salvar alterações
            </Button>
          </form>
        </Paper>
      </Box>
    </main>
  );
}
