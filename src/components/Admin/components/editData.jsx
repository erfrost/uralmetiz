import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "./editData.module.css";
import newsStyles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";

const EditData = ({ id, handleCloseChange, data }) => {
  const [addData, setData] = useState({
    cell_1: id,
    banner: "",
    cell_2: "",
    content: "",
    date: "Date",
  });

  const handleChangeText = (id, e) => {
    id === 1
      ? setData((prevState) => ({ ...prevState, cell_2: e.target.value }))
      : setData((prevState) => ({ ...prevState, content: e.target.value }));
  };
  const handleFileSelect = (e) => {
    setData((prevState) => ({ ...prevState, banner: e.target.files[0].name }));
  };

  const handleSubmit = () => {
    data[id - 1] = addData;
    handleCloseChange();
  };
  return (
    <>
      <Box className={mainStyles.title1}>
        <span className={styles.clickableWord} onClick={handleCloseChange}>
          НОВОСТИ
        </span>{" "}
        / РЕДАКТИРОВАНИЕ
      </Box>
      <Box className={styles.inputBox}>
        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-basic"
          label="Заголовок"
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={addData.cell_2}
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
          value={addData.content}
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
          <Button
            className={`${styles.btnFile} ${styles.btnHover}`}
            component="span"
          >
            {addData.banner !== "" ? addData.banner : "Выбрать изображение"}
          </Button>
        </label>
        <Button
          variant="text"
          className={`${styles.btnSubmit} ${styles.btnHover}`}
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default EditData;
