import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

const EditData = ({
  id,
  handleCloseChange,
  handleSubmit,
  page,
  categories,
}) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [editNewsData, setEditNewsData] = useState({
    title: "",
    content: "",
    photo_url: "",
    updated_at: formattedDate,
  });
  const [editItemsData, setEditItemsData] = useState({
    title: "",
    description: "",
    photo_url: "",
    category: null,
    sub_category: null,
  });
  console.log(categories ? categories.data : null);
  const handleChangeText = (id, e) => {
    if (page === "НОВОСТИ") {
      id === 1
        ? setEditNewsData((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        : setEditNewsData((prevState) => ({
            ...prevState,
            content: e.target.value,
          }));
    } else {
      id === 1
        ? setEditItemsData((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        : setEditItemsData((prevState) => ({
            ...prevState,
            description: e.target.value,
          }));
    }
  };
  const handleFileSelect = (e) => {
    if (page === "НОВОСТИ") {
      setEditNewsData((prevState) => ({
        ...prevState,
        photo_url: e.target.files[0].name,
      }));
    } else {
      setEditItemsData((prevState) => ({
        ...prevState,
        photo_url: e.target.files[0].name,
      }));
    }
    setPhotoUrl(e.target.files[0].name);
  };
  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
    setEditItemsData((prevState) => ({
      ...prevState,
      category: categories
        ? categories.data[
            categories.data.findIndex((cat) => cat.id === e.target.value)
          ].title
        : null,
    }));
  };
  const handleChangeSubCategory = (e) => {
    setEditItemsData((prevState) => ({
      ...prevState,
      sub_category:
        categories && categoryId
          ? categories.data[
              categories.data.findIndex((cat) => cat.id === categoryId)
            ].subcategories[
              categories.data[
                categories.data.findIndex((cat) => cat.id === categoryId)
              ].subcategories.findIndex(
                (subcat) => subcat.id === e.target.value
              )
            ].title
          : null,
    }));
  };
  console.log(editItemsData);
  return (
    <>
      <Box className={mainStyles.title1}>
        <span className={styles.clickableWord} onClick={handleCloseChange}>
          {page}
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
          value={page === "НОВОСТИ" ? editNewsData.title : editItemsData.title}
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
          value={
            page === "НОВОСТИ"
              ? editNewsData.content
              : editItemsData.description
          }
          onChange={(e) => handleChangeText(2, e)}
        />

        {page === "ТОВАРЫ" ? (
          <Box
            className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.selectBox}`}
          >
            <FormControl className={styles.formControl}>
              <InputLabel id="demo-simple-select-label">Категории</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Категория"
                onChange={handleChangeCategory}
                className={styles.select}
              >
                {categories
                  ? categories.data.map((cat) => (
                      <MenuItem value={cat.id}>{cat.title}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel id="demo-simple-select-label">
                Подкатегории
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Подкатегория"
                onChange={handleChangeSubCategory}
                disabled={categoryId ? false : true}
                className={styles.select}
              >
                {categories && categoryId ? (
                  categories.data[
                    categories.data.findIndex((cat) => cat.id === categoryId)
                  ].subcategories.map((subcat) => (
                    <MenuItem value={subcat.id}>{subcat.title}</MenuItem>
                  ))
                ) : (
                  <MenuItem>Выберите категорию</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        ) : null}
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
            {photoUrl !== "" ? photoUrl : "Выбрать изображение"}
          </Button>
        </label>
        <Button
          variant="text"
          className={`${styles.btnSubmit} ${styles.btnHover}`}
          onClick={() =>
            handleSubmit(id, page === "НОВОСТИ" ? editNewsData : editItemsData)
          }
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default EditData;
