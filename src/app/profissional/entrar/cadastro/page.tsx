import Image from "next/image";
import Logo from "@/assets/imgs/logo.png";

export default function Cadastro() {
  return (
    <main className="flex h-screen w-screen">
      {/* Lado esquerdo - Formulário */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Crie sua conta
        </h2>
        <p className="text-gray-600 mb-4">Cadastre-se para acessar o sistema</p>

        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          {/* Campo de Nome */}
          <div className="mb-4">
            <label className="block text-gray-700">Nome completo</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-900"
              type="text"
              name="nomeCadastro"
              id="nomeCadastro"
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* Campo de e-mail */}
          <div className="mb-4">
            <label className="block text-gray-700">Seu email</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-900"
              type="email"
              name="emailCadastro"
              id="emailCadastro"
              placeholder="Digite seu email"
            />
          </div>

          {/* Campo de senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Crie uma senha</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-900"
              type="password"
              name="senhaCadastro"
              id="senhaCadastro"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Campo de confirmar senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirme sua senha</label>
            <input
              className="w-full p-2 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-900"
              type="password"
              name="confirmaSenha"
              id="confirmaSenha"
              placeholder="Digite a senha novamente"
            />
          </div>

          {/* Botão de cadastro */}
          <button
            className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-700 transition"
            type="submit"
          >
            Cadastrar
          </button>

          {/* Link para a tela de login */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Já tem uma conta?
            <a
              href="/profissional/entrar/login"
              className="ml-2 text-blue-900 hover:underline"
            >
              Faça login
            </a>
          </p>
        </form>
      </div>

      {/* Lado direito - Imagem */}
      <div className="hidden md:flex w-1/2 bg-blue-900 items-center justify-center">
        <Image
          className="h-[80%] w-96 object-contain"
          src={Logo}
          alt="Consulta médica"
        />
      </div>
    </main>
  );
}
