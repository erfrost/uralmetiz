import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "./editData.module.css";
import newsStyles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();
const formattedDate = `${day}.${month}.${year}`;

const EditNews = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [editNewsData, setEditNewsData] = useState({
    title: "",
    content: "",
    photo_url: "",
    updated_at: formattedDate,
  });

  const handleChangeText = (id, e) => {
    switch (id) {
      case 1:
        setEditNewsData((prevState) => ({
          ...prevState,
          title: e.target.value,
        }));
        break;
      case 1:
        setEditNewsData((prevState) => ({
          ...prevState,
          content: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const handleFileSelect = (e) => {
    setEditNewsData((prevState) => ({
      ...prevState,
      photo_url: e.target.files[0].name,
    }));
    setPhotoUrl(e.target.files[0].name);
  };

  return (
    <>
      <Box className={mainStyles.title1}>НОВОСТИ / РЕДАКТИРОВАНИЕ</Box>
      <Box className={styles.inputBox}>
        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-basic"
          label="Название"
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={editNewsData.title}
          onChange={(e) => handleChangeText(1, e)}
        />

        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-multiline-static"
          label="Описание"
          variant="filled"
          multiline
          rows={4}
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={editNewsData.content}
          onChange={(e) => handleChangeText(2, e)}
        />

        <label htmlFor="file-upload" className={styles.fileLabel}>
          <input
            id="file-upload"
            type="file"
            accept=".png, .jpeg"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <Button className={styles.btnFile} component="span">
            {photoUrl !== "" ? photoUrl : "Выбрать изображение"}
          </Button>
        </label>
        <Button
          variant="text"
          className={`${styles.btnSubmit} ${styles.btnHover}`}
          onClick={() => handleSubmit(id, editNewsData)}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default EditNews;
