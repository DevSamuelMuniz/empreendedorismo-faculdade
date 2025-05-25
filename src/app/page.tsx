"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/imgs/logo.png";
import Paciente from "@/assets/app/pacientes.jpg";
import Medico from "@/assets/app/medico.jpg";
import Admin from "@/assets/app/admin.jpg";

export default function Home() {
  const router = useRouter();

  const sections = [
    {
      label: "Paciente",
      image: Paciente,
      route: "/paciente/entrar/login",
    },
    {
      label: "Médico",
      image: Medico,
      route: "/medico/entrar/login",
    },
    {
      label: "Administrador",
      image: Admin,
      route: "/admin/entrar/login",
    },
  ];

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="h-32 bg-blue-500 z-20 flex items-center justify-center align-middle">
        <Image
          className="w-32 object-contain"
          src={Logo}
          alt="Consulta médica"
        />
      </div>
      {sections.map((section, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => router.push(section.route)}
          onKeyDown={(e) => e.key === "Enter" && router.push(section.route)}
          className="flex-1 relative cursor-pointer group outline-none"
        >
          <Image
            src={section.image}
            alt={section.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
            priority
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/50 transition duration-300 z-10 flex items-center justify-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
              {section.label}
            </h2>
          </div>
        </div>
      ))}
    </main>
  );
}
