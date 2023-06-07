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
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "./editData.module.css";
import newsStyles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";

const AddItems = ({ handleAdd, categories }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [addItemsData, setAddItemsData] = useState({
    title: "",
    description: "",
    photo_url: "",
    category_id: null,
    subcategory_id: null,
    price: null,
    specifications: [],
  });

  const handleChangeText = (id, e, index) => {
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
        setInputs((prevState) =>
          prevState.map((input, i) =>
            i === index ? { ...input, title: e.target.value } : input
          )
        );
        break;
      case 5:
        setInputs((prevState) =>
          prevState.map((input, i) =>
            i === index ? { ...input, data: e.target.value } : input
          )
        );
        break;
      default:
        break;
    }
  };
  const handleFileSelect = (e) => {
    setAddItemsData((prevState) => ({
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
        ? categories[categories.findIndex((cat) => cat.id === e.target.value)]
            .id
        : null,
    }));
  };
  const handleChangeSubCategory = (e) => {
    setAddItemsData((prevState) => ({
      ...prevState,
      subcategory_id:
        categories && categoryId
          ? categories[categories.findIndex((cat) => cat.id === categoryId)]
              .subcategories[
              categories[
                categories.findIndex((cat) => cat.id === categoryId)
              ].subcategories.findIndex(
                (subcat) => subcat.id === e.target.value
              )
            ].id
          : null,
    }));
  };
  const handleAddInput = () => {
    setInputs((prevState) => [...prevState, { title: "", data: "" }]);
  };
  const handleDeleteInput = (i) => {
    setInputs((prevState) => prevState.filter((input, index) => index !== i));
  };
  const addInputsData = () => {
    setAddItemsData((prevState) => ({
      ...prevState,
      specifications: inputs,
    }));
  };
  console.log(inputs);
  return (
    <>
      <Box className={mainStyles.title1}>ТОВАРЫ / ДОБАВЛЕНИЕ</Box>
      <Box className={styles.inputBox}>
        <TextField
          className={`${styles.textFieldWidth} ${newsStyles.textField}`}
          id="outlined-basic"
          label="Название"
          variant="filled"
          inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
          value={addItemsData.title}
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
          value={addItemsData.description}
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
                ? categories.map((cat) => (
                    <MenuItem value={cat.id}>{cat.title}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">Подкатегории</InputLabel>
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
                categories[
                  categories.findIndex((cat) => cat.id === categoryId)
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

        <Box className={`${styles.specificationBox} ${styles.textFieldWidth}`}>
          <Button
            className={`${styles.btnAddSpecification} ${styles.btnStyle} ${styles.btnHover}`}
            onClick={handleAddInput}
          >
            ДОБАВИТЬ ХАРАКТЕРИСТИКУ
          </Button>
        </Box>
        {inputs.map(
          (input, index) => (
            console.log(input, index),
            (
              <Box
                className={`${styles.textFieldWidth} ${styles.specificationInputBox}`}
              >
                <TextField
                  className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.specificationInput}`}
                  id="outlined-basic"
                  label="Характеристика"
                  variant="filled"
                  inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                  value={inputs[index].title}
                  onChange={(e) => handleChangeText(4, e, index)}
                />
                <TextField
                  className={`${styles.textFieldWidth} ${newsStyles.textField} ${styles.specificationInput}`}
                  id="outlined-basic"
                  label="Значение"
                  variant="filled"
                  inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                  value={inputs[index].data}
                  onChange={(e) => handleChangeText(5, e, index)}
                />
                <IconButton
                  className={`${styles.btnDelete} ${styles.btnHover}`}
                  component="span"
                  onClick={() => handleDeleteInput(index)}
                >
                  <ClearIcon className={styles.clearIcon} />
                </IconButton>
              </Box>
            )
          )
        )}
        <Button
          variant="text"
          className={`${styles.btnSubmit} ${styles.btnHover}`}
          onClick={() => {
            handleAdd(addItemsData), (window.location.href = "/admin/items");
          }}
        >
          Добавить товар
        </Button>
      </Box>
    </>
  );
};

export default AddItems;
