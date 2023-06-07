import React from "react";
import styles from "./MainPage/MainAdminPage.module.css";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InboxIcon from "@mui/icons-material/Inbox";
import CategoryIcon from "@mui/icons-material/Category";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
  const isMobileDevice = useMediaQuery({ maxWidth: 450 });

  const actions = [
    { icon: <InventoryIcon />, name: "Товары", href: "/admin/items" },
    { icon: <CategoryIcon />, name: "Категории", href: "/admin/categories" },
    { icon: <NewspaperIcon />, name: "Новости", href: "/admin/news" },
    { icon: <InboxIcon />, name: "Заявки", href: "/admin/orders" },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      className={styles.navigationBar}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => (window.location.href = action.href)}
          className={styles.navigationBarItem}
        />
      ))}
    </SpeedDial>
  );
};

export default Navigation;
