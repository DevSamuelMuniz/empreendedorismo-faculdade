"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Navbar from "@/components/sistema/navbar/navbar";
import Header from "@/components/sistema/header/header";

export default function EditarPaciente() {
  const [paciente, setPaciente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "123.456.789-00",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const campoEndereco = name.split(".")[1];
      setPaciente((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campoEndereco]: value,
        },
      }));
    } else {
      setPaciente((prev) => ({ ...prev, [name]: value }));
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
        <Typography
          className="flex items-center gap-3"
          variant="h4"
          fontWeight="bold"
          color="text.secondary"
          gutterBottom
        >
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
              sx={{ gridColumn: "span 1" }}
            />

            {/* Email */}
            <TextField
              fullWidth
              required
              label="E-mail"
              type="email"
              name="email"
              value={paciente.email}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Telefone */}
            <TextField
              fullWidth
              required
              label="Telefone"
              type="tel"
              name="telefone"
              value={paciente.telefone}
              onChange={handleChange}
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

            {/* Data Nascimento */}
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

            {/* Endereço - título (2 colunas) */}
            <Typography variant="h6" sx={{ gridColumn: "span 2" }}>
              Endereço
            </Typography>

            {/* Rua */}
            <TextField
              fullWidth
              required
              label="Rua"
              name="endereco.rua"
              value={paciente.endereco.rua}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Número */}
            <TextField
              fullWidth
              required
              label="Número"
              name="endereco.numero"
              value={paciente.endereco.numero}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Bairro */}
            <TextField
              fullWidth
              required
              label="Bairro"
              name="endereco.bairro"
              value={paciente.endereco.bairro}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Cidade */}
            <TextField
              fullWidth
              required
              label="Cidade"
              name="endereco.cidade"
              value={paciente.endereco.cidade}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Estado */}
            <TextField
              fullWidth
              required
              label="Estado"
              name="endereco.estado"
              value={paciente.endereco.estado}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* CEP */}
            <TextField
              fullWidth
              required
              label="CEP"
              name="endereco.cep"
              value={paciente.endereco.cep}
              onChange={handleChange}
              sx={{ gridColumn: "span 1" }}
            />

            {/* Botão enviar (2 colunas) */}
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
