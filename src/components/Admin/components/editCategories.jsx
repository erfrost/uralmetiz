import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "./editData.module.css";
import newsStyles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";

const EditCategories = ({ id, handleSubmit, categories }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [editItemsData, setEditItemsData] = useState({
    title: "",
    description: "",
    photo_url: "",
    category_id: null,
    subcategory_id: null,
    price: null,
    specifications: [],
  });
  console.log(inputs);
  const handleChangeText = (id, e, index) => {
    switch (id) {
      case 1:
        setEditItemsData((prevState) => ({
          ...prevState,
          title: e.target.value,
        }));
        break;
      case 2:
        setInputs((prevState) =>
          prevState.map((input, i) =>
            i === index ? { ...input, title: e.target.value } : input
          )
        );
        break;
      default:
        break;
    }
  };
  const handleAddInput = () => {
    setInputs((prevState) => [...prevState, { title: "", data: "" }]);
  };
  const handleDeleteInput = (i) => {
    setInputs((prevState) => prevState.filter((input, index) => index !== i));
  };
  const addInputsData = () => {
    setEditItemsData((prevState) => ({
      ...prevState,
      specifications: inputs,
    }));
  };
  const handleFileSelect = (e) => {
    setEditItemsData((prevState) => ({
      ...prevState,
      photo_url: e.target.files[0].name,
    }));
    setPhotoUrl(e.target.files[0].name);
  };
  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
    setEditItemsData((prevState) => ({
      ...prevState,
      category: categories
        ? categories[categories.findIndex((cat) => cat.id === e.target.value)]
            .id
        : null,
    }));
  };
  const handleChangeSubCategory = (e) => {
    setEditItemsData((prevState) => ({
      ...prevState,
      sub_category:
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

  return (
    <Box className={mainStyles.body}>
      <Box className={mainStyles.main}>
        <Paper elevation={0} className={mainStyles.infoPanel}>
          <Box className={mainStyles.infoPanelTitle}>
            <Box className={mainStyles.title1}>КАТЕГОРИИ / РЕДАКТИРОВАНИЕ</Box>
            <Box className={styles.inputBox}>
              <TextField
                className={`${styles.textFieldWidth} ${newsStyles.textField}`}
                id="outlined-basic"
                label="Название категории"
                variant="filled"
                inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                value={editItemsData.title}
                onChange={(e) => handleChangeText(1, e)}
              />

              <Box
                className={`${styles.specificationBox} ${styles.textFieldWidth}`}
              >
                <Button
                  className={`${styles.btnAddSpecification} ${styles.btnStyle} ${styles.btnHover}`}
                  component="span"
                  onClick={handleAddInput}
                >
                  ДОБАВИТЬ ПОДКАТЕГОРИЮ
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
                        label="Название подкатегории"
                        variant="filled"
                        inputProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
                        value={inputs[index].title}
                        onChange={(e) => handleChangeText(2, e, index)}
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
                onClick={() => (window.location.href = "/admin/categories")}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditCategories;
