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

const AddData = ({ handleAdd, handleCloseAdd, page, categories }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [inputsSpecification, setInputsSpecification] = useState(false);
  const [specificationItem, setSpecificationItem] = useState({
    title: "",
    data: "",
  });
  const [addNewsData, setAddNewsData] = useState({
    title: "",
    content: "",
    photo_url: "",
    created_at: formattedDate,
  });
  const [addItemsData, setAddItemsData] = useState({
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
    } else {
      switch (id) {
        case 1:
          setAddItemsData((prevState) => ({
            ...prevState,
            title: e.target.value,
          }));
          break;
        case 2:
          setAddItemsData((prevState) => ({
            ...prevState,
            description: e.target.value,
          }));
          break;
        case 3:
          setAddItemsData((prevState) => ({
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
    page === "НОВОСТИ"
      ? setAddNewsData((prevState) => ({
          ...prevState,
          photo_url: e.target.files[0].name,
        }))
      : setAddItemsData((prevState) => ({
          ...prevState,
          photo_url: e.target.files[0].name,
        }));
    setPhotoUrl(e.target.files[0].name);
  };

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
    setAddItemsData((prevState) => ({
      ...prevState,
      category_id: categories
        ? categories.data[
            categories.data.findIndex((cat) => cat.id === e.target.value)
          ].id
        : null,
    }));
  };
  const handleChangeSubCategory = (e) => {
    setAddItemsData((prevState) => ({
      ...prevState,
      subcategory_id:
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
    setAddItemsData((prevState) => ({
      ...prevState,
      specifications: [...prevState.specifications, specificationItem],
    }));
    setSpecificationItem({ title: "", data: "" });
    handleCloseInputsSpecification();
  };
  return (
    <>
      <Box className={mainStyles.title1}>
        <span className={styles.clickableWord} onClick={handleCloseAdd}>
          {page}
        </span>{" "}
        / ДОБАВЛЕНИЕ
      </Box>
      <Box className={styles.inputBox}>
        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-basic"
          label={page === "НОВОСТИ" ? "Заголовок" : "Название товара"}
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={page === "НОВОСТИ" ? addNewsData.title : addItemsData.title}
          onChange={(e) => handleChangeText(1, e)}
        />

        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-multiline-static"
          label={page === "НОВОСТИ" ? "Контент" : "Описание товара"}
          variant="filled"
          multiline
          rows={4}
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={
            page === "НОВОСТИ" ? addNewsData.content : addItemsData.description
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
              value={addItemsData.price}
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
              <IconButton
                className={`${styles.btnDelete} ${styles.btnFile} ${styles.btnHover}`}
                component="span"
                onClick={handleCloseInputsSpecification}
              >
                <ClearIcon className={styles.clearIcon} />
              </IconButton>
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
            handleAdd(page === "НОВОСТИ" ? addNewsData : addItemsData)
          }
        >
          {`Добавить ${page === "НОВОСТИ" ? "новость" : "товар"}`}
        </Button>
      </Box>
    </>
  );
};

export default AddData;
