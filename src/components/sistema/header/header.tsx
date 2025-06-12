//icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  IconButton,
  Drawer,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
} from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [openNotifications, setOpenNotifications] = useState(false);

  const toggleDrawer = (open: any) => () => {
    setOpenNotifications(open);
  };

  const notifications = [
    {
      title: "Consulta com Dr. João Realizada",
      time: "10/04/2025 - 14:00",
    },
    {
      title: "Resultado de exame disponível",
      time: "09/04/2025 - 08:30",
    },
    {
      title: "Nova mensagem do suporte",
      time: "08/04/2025 - 17:45",
    },
  ];

  return (
    <>
      <main className="bg-white shadow-md fixed z-10 w-full h-16 flex justify-end items-center gap-4 pr-6 text-gray-700">
        <IconButton onClick={toggleDrawer(true)}>
          <NotificationsIcon className="text-blue-500" />
        </IconButton>

        <a href="/paciente/entrar/login">
          <IconButton>
            <LogoutIcon className="text-blue-500" />
          </IconButton>
        </a>
      </main>

      <Drawer
        anchor="right"
        open={openNotifications}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 380,
            bgcolor: "#f9fafb",
            p: 2,
          },
        }}
      >
        <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
          Notificações
        </Typography>

        {notifications.map((notification, index) => (
          <Card
            key={index}
            className="mb-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#3b82f6", width: 36, height: 36 }}>
                  !
                </Avatar>
                <Box>
                  <Typography
                    variant="body1"
                    className="font-semibold text-gray-700"
                  >
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Drawer>
    </>
  );
}
