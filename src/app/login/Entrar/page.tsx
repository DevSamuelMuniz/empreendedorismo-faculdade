"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/imgs/logo.png";

export default function Login() {
  const router = useRouter();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    router.push("/sistema/Inicio");
  }

  return (
    <main className="flex h-screen w-screen">
      {/* Lado esquerdo - Imagem */}
      <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
        <Image
          className="h-[80%] w-96 object-contain"
          src={Logo}
          alt="Consulta médica"
        />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Bem-vindo!</h2>
        <p className="text-gray-600 mb-4">Acesse sua conta para continuar</p>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        >
          {/* Campo de e-mail */}
          <div className="mb-4">
            <label className="block text-gray-700">Seu email</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="emailLogin"
              id="emailLogin"
              placeholder="Digite seu email"
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Sua senha</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="senhaLogin"
              id="senhaLogin"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão de login */}
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            type="submit"
          >
            Entrar
          </button>

          {/* Link de criação de conta */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Ainda não tem uma conta?
            <a
              href="/login/Cadastro"
              className="ml-2 text-blue-600 hover:underline"
            >
              Criar uma conta
            </a>
          </p>

          {/* Link de recuperação de senha */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Esqueceu a senha?
            <a href="#" className="ml-2 text-blue-600 hover:underline">
              Recuperar
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
