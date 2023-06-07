import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
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

const AddNews = ({ handleAdd }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [addNewsData, setAddNewsData] = useState({
    title: "",
    content: "",
    photo_url: "",
    created_at: formattedDate,
  });

  const handleChangeText = (id, e) => {
    switch (id) {
      case 1:
        setAddNewsData((prevState) => ({
          ...prevState,
          title: e.target.value,
        }));
        break;
      case 1:
        setAddNewsData((prevState) => ({
          ...prevState,
          content: e.target.value,
        }));
        break;
      default:
        break;
    }
  };
  const handleFileSelect = (e) => {
    setAddNewsData((prevState) => ({
      ...prevState,
      photo_url: e.target.files[0].name,
    }));
    setPhotoUrl(e.target.files[0].name);
  };

  return (
    <>
      <Box className={mainStyles.title1}>НОВОСТИ / ДОБАВЛЕНИЕ</Box>
      <Box className={styles.inputBox}>
        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-basic"
          label="Заголовок"
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={addNewsData.title}
          onChange={(e) => handleChangeText(1, e)}
        />

        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-multiline-static"
          label="Контент"
          variant="filled"
          multiline
          rows={4}
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={addNewsData.content}
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
          onClick={() => {
            handleAdd(addNewsData), (window.location.href = "/admin/news");
          }}
        >
          Добавить новость
        </Button>
      </Box>
    </>
  );
};

export default AddNews;
