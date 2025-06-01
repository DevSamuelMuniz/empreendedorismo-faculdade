import Image from "next/image";
import Logo from "@/assets/imgs/logo.png";

// Ícones do Material UI
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  return (
    <main className="w-60 h-dvw bg-blue-900 z-20 fixed">
      <div className="flex justify-center pt-8">
        <Image className="w-30" src={Logo} alt="logo" />
      </div>

      <div>
        <ul className="flex flex-col text-lg text-blue-900 font-semibold gap-4 pt-8 px-4">
          <a href="/profissional/sistema/inicio">
            <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
              <HomeIcon /> Início
            </li>
          </a>

          <a href="/profissional/sistema/consultas">
            <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
              <AssignmentIcon /> Consultas
            </li>
          </a>

          <a href="/profissional/sistema/consultas">
            <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
              <EventAvailableIcon />
              Pendentes
            </li>
          </a>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col text-lg text-blue-900 font-semibold gap-4 pt-12 px-4">
          <a href="/profissional/sistema/perfil">
            <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
              <PersonIcon /> Meus dados
            </li>
          </a>
        </ul>
      </div>
    </main>
  );
}
