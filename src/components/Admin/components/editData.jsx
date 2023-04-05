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
import React, { use, useState } from "react";
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
  const [inputsSpecification, setInputsSpecification] = useState(false);
  const [specificationItem, setSpecificationItem] = useState({
    title: "",
    data: "",
  });
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
    category_id: null,
    subcategory_id: null,
    price: null,
    specifications: [],
  });

  const handleChangeText = (id, e) => {
    if (page === "НОВОСТИ") {
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
    } else {
      switch (id) {
        case 1:
          setEditItemsData((prevState) => ({
            ...prevState,
            title: e.target.value,
          }));
          break;
        case 2:
          setEditItemsData((prevState) => ({
            ...prevState,
            description: e.target.value,
          }));
          break;
        case 3:
          setEditItemsData((prevState) => ({
            ...prevState,
            price: e.target.value,
          }));
          break;
        case 4:
          setSpecificationItem((prevState) => ({
            ...prevState,
            title: e.target.value,
          }));
          break;
        case 5:
          setSpecificationItem((prevState) => ({
            ...prevState,
            data: e.target.value,
          }));
          break;
        default:
          break;
      }
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
          ].id
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
            ].id
          : null,
    }));
  };

  const handleOpenInputsSpecification = () => {
    setInputsSpecification(true);
  };
  const handleCloseInputsSpecification = () => {
    setInputsSpecification(false);
  };
  const handleConfirmSpecification = () => {
    setEditItemsData((prevState) => ({
      ...prevState,
      specifications: [...prevState.specifications, specificationItem],
    }));
    setSpecificationItem({ title: "", data: "" });
    handleCloseInputsSpecification();
  };

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
          label="Название"
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={page === "НОВОСТИ" ? editNewsData.title : editItemsData.title}
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
                className={
                  categoryId
                    ? styles.select
                    : `${styles.select} ${styles.disabledSelect}`
                }
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
            <TextField
              className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.price}`}
              id="outlined-basic"
              label="Цена"
              variant="filled"
              inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
              value={editItemsData.price}
              onChange={(e) => handleChangeText(3, e)}
            />
          </Box>
        ) : null}
        {page === "ТОВАРЫ" ? (
          <>
            <Box
              className={`${styles.specificationBox} ${styles.textFieldWidth}`}
            >
              <Button
                className={`${styles.btnAddSpecification} ${styles.btnFile} ${styles.btnHover}`}
                component="span"
                onClick={handleOpenInputsSpecification}
              >
                ДОБАВИТЬ ХАРАКТЕРИСТИКУ
              </Button>
            </Box>
            {inputsSpecification ? (
              <Box
                className={`${styles.textFieldWidth} ${styles.specificationInputBox}`}
              >
                <TextField
                  className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.specificationInput}`}
                  id="outlined-basic"
                  label="Характеристика"
                  variant="filled"
                  inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                  value={specificationItem.title}
                  onChange={(e) => handleChangeText(4, e)}
                />
                <TextField
                  className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.specificationInput}`}
                  id="outlined-basic"
                  label="Значение"
                  variant="filled"
                  inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                  value={specificationItem.data}
                  onChange={(e) => handleChangeText(5, e)}
                />
                <IconButton
                  className={`${styles.btnDelete} ${styles.btnFile} ${styles.btnHover}`}
                  component="span"
                  onClick={handleConfirmSpecification}
                >
                  <CheckIcon className={styles.clearIcon} />
                </IconButton>
              </Box>
            ) : null}
          </>
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
