"use client";

import React, { use, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";

import styles from "./MainAdminPage.module.css";
import NewsAdminPage from "../newsPage/newsAdminPage";
import ProductsAdminPage from "../productsPage/productsAdminPage";
import ApplicationsAdminPage from "../applicationsPage/ApplicationsAdminPage";

const settings = ["Профиль", "Выход"];
const navigation = ["Главная", "Новости", "Товары", "Заявки"];

const MainAdminPage = () => {
  const [page, setPage] = useState("Главная");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenuIsHover, setMobileMenuIsHover] = useState(false);
  const isMobileDevice = useMediaQuery({ maxWidth: 450 });
  const isTabletDevice = useMediaQuery({ maxWidth: 830, minWidth: 450 });
  const isMobileMenu = useMediaQuery({ maxWidth: 1000 });

  const handleMobileMenuIsHover = () => {
    setMobileMenuIsHover((prevState) => !prevState);
  };

  const renderBox2 = (
    <>
      {!isMobileDevice && (
        <Grid className={styles.title1}>ГЛАВНАЯ СТРАНИЦА</Grid>
      )}
      {!isMobileDevice && !isTabletDevice ? (
        <Grid className={styles.title2}>Добрый день, Admin!</Grid>
      ) : (
        <Box className={styles.titleBox}>
          <Grid className={styles.title2}>Admin,</Grid>
          <Grid className={styles.title2_1}>Добрый день!</Grid>
        </Box>
      )}
      <Grid className={styles.title3}>У вас нет новых заявок!</Grid>
      <Grid className={styles.boxes}>
        <Box className={styles.box2Main}>
          <Box className={styles.box2Content}>
            <Grid className={styles.box2Header}>ПОСЛЕДНЯЯ ЗАЯВКА</Grid>
            <Grid className={styles.box2Titles}>
              <img
                className={styles.box2Image}
                alt="Смешной гвоздь"
                width="180px"
              />
              <Box className={styles.box2Texts}>
                <Grid>Наименование товара: </Grid>
                <Grid>Количество: </Grid>
                <Grid>Телефон: </Grid>
                <Grid className={styles.box2Text4}>Время заказа: </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box className={styles.box2Photo}></Box>
      </Grid>
    </>
  );

  const handleSwitchPage = (page) => {
    setPage(page);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box className={styles.body}>
      <Box className={styles.main}>
        {!isMobileDevice && (
          <Paper elevation={0} className={styles.navigationMain}>
            <Box className={styles.navigationBox}>
              <Grid className={styles.navigationTitle}>НАВИГАЦИЯ</Grid>
              <Grid>
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical outlined button group"
                  variant="text"
                  className={styles.buttonGroup}
                >
                  {navigation.map((nav) => {
                    return (
                      <Button
                        className={styles.button}
                        key={nav}
                        onClick={() => handleSwitchPage(nav)}
                      >
                        {nav}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Grid>
            </Box>
          </Paper>
        )}

        <Paper elevation={0} className={styles.infoPanel}>
          <Box className={styles.infoPanelTitle}>
            {page === "Главная" ? (
              renderBox2
            ) : page === "Новости" ? (
              <NewsAdminPage />
            ) : page === "Товары" ? (
              <ProductsAdminPage />
            ) : page === "Заявки" ? (
              <ApplicationsAdminPage />
            ) : null}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainAdminPage;
