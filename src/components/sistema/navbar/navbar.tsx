import Image from "next/image";
import Logo from "@/assets/imgs/logo.png";

// Ícones do Material UI
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HistoryIcon from "@mui/icons-material/History";
import BiotechIcon from "@mui/icons-material/Biotech";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
  return (
    <main className="w-60 h-dvw bg-blue-500 z-20 fixed">
      <div className="flex justify-center pt-8">
        <Image className="w-30" src={Logo} alt="logo" />
      </div>

      <ul className="flex flex-col text-lg text-blue-500 font-semibold gap-4 pt-8 px-4">
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <HomeIcon /> Início
        </li>
        <a href="/sistema/Agendar">
          <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
            <EventAvailableIcon /> Agendar
          </li>
        </a>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <AssignmentIcon /> Consultas
        </li>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <LocalPharmacyIcon /> Receitas
        </li>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <CreditCardIcon /> Carteirinha
        </li>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <HistoryIcon /> Histórico
        </li>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <BiotechIcon /> Exames
        </li>
        <li className="bg-white cursor-pointer p-2 flex items-center gap-3 rounded hover:bg-blue-100 transition">
          <NotificationsIcon /> Notificações
        </li>
      </ul>
    </main>
  );
}
