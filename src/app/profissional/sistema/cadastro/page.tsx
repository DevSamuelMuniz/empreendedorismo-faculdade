// pages/profissional/cadastro.tsx
import { useState } from 'react'

export default function CadastroProfissional() {
  const [hospitais, setHospitais] = useState<string[]>([])
  const [especialidades, setEspecialidades] = useState<string[]>([])
  const [horarios, setHorarios] = useState<string[]>([])

  const [novoHospital, setNovoHospital] = useState('')
  const [novaEspecialidade, setNovaEspecialidade] = useState('')
  const [novoHorario, setNovoHorario] = useState('')

  const adicionarHospital = () => {
    if (novoHospital.trim()) {
      setHospitais([...hospitais, novoHospital])
      setNovoHospital('')
    }
  }

  const adicionarEspecialidade = () => {
    if (novaEspecialidade.trim()) {
      setEspecialidades([...especialidades, novaEspecialidade])
      setNovaEspecialidade('')
    }
  }

  const adicionarHorario = () => {
    if (novoHorario.trim()) {
      setHorarios([...horarios, novoHorario])
      setNovoHorario('')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cadastro do Profissional</h1>

      {/* HOSPITAL */}
      <div className="mb-6">
        <label className="font-semibold block mb-1">Hospital</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={novoHospital}
            onChange={(e) => setNovoHospital(e.target.value)}
            placeholder="Nome do hospital"
            className="border rounded p-2 w-full"
          />
          <button onClick={adicionarHospital} className="bg-blue-600 text-white px-4 rounded">
            Adicionar
          </button>
        </div>
        <ul className="mt-2 list-disc pl-5">
          {hospitais.map((hosp, idx) => (
            <li key={idx}>{hosp}</li>
          ))}
        </ul>
      </div>

      {/* ESPECIALIDADE */}
      <div className="mb-6">
        <label className="font-semibold block mb-1">Especialidade</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={novaEspecialidade}
            onChange={(e) => setNovaEspecialidade(e.target.value)}
            placeholder="Ex: Cardiologia"
            className="border rounded p-2 w-full"
          />
          <button onClick={adicionarEspecialidade} className="bg-green-600 text-white px-4 rounded">
            Adicionar
          </button>
        </div>
        <ul className="mt-2 list-disc pl-5">
          {especialidades.map((esp, idx) => (
            <li key={idx}>{esp}</li>
          ))}
        </ul>
      </div>

      {/* HORÁRIOS */}
      <div>
        <label className="font-semibold block mb-1">Horário Disponível</label>
        <div className="flex gap-2">
          <input
            type="time"
            value={novoHorario}
            onChange={(e) => setNovoHorario(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button onClick={adicionarHorario} className="bg-purple-600 text-white px-4 rounded">
            Adicionar
          </button>
        </div>
        <ul className="mt-2 list-disc pl-5">
          {horarios.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
