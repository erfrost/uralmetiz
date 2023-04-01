import { Autocomplete, Button, Link, Paper, TextField } from "@mui/material";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import api from "@/pages/api/apiRequest";

const mockData = [
  {
    id: 1,
    title: "Фланцы плоские сталь 20",
    description: "Описание товара",
    category_id: 1,
    subcategory_id: 1,
    price: 10000,
    photo_url: "https://example.com/photo.jpg",
    specifications: [
      {
        key: "Размер",
        value: "< 15 см",
      },
    ],
  },
  {
    id: 2,
    title: "Фланцы плоские сталь 40",
    description: "Описание товара",
    category_id: 1,
    subcategory_id: 1,
    price: 50000,
    photo_url: "https://example.com/photo.jpg",
    specifications: [
      {
        key: "Размер",
        value: "< 15 см",
      },
    ],
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(
    mockData.map((i) => ({ label: i.title, id: i.id }))
  );
  const [formatedData, setFormatedData] = useState([]);

  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  async function get() {
    const { data: resData } = await api("items?limit=50");
  }

  useEffect(() => {
    if (searchQuery !== "") {
    }
  }, [searchQuery]);

  const handleSelect = (selectedId) => {
    window.location.href - "/";
  };
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <Button className={styles.button} variant="contained">
          Каталог товаров
          <FilterListIcon />
        </Button>
        {/* <TextField
          className={styles.input}
          id="outlined-basic"
          label="Поиск товаров..."
          variant="outlined"
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className={styles.input}
          options={data}
          sx={{ width: 300 }}
          onChange={(e, newVal) => handleSelect(newVal.id)}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleChange}
              value={searchQuery}
              label="Поиск товаров"
            />
          )}
        />
      </div>
      <div className={styles.bottom}>
        <Link className={styles.link} underline="none" href={"/"}>
          О Нас
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Новости
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Сертфикаты
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Стандарты
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Доставка
        </Link>
      </div>
      {/* <div className={styles.result_block}>
        <Paper className={styles.modal_container} elevation={2}>
          <div className={styles.upper}>
            <Button className={styles.button} variant="contained">
              Каталог товаров
              <FilterListIcon />
            </Button>
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Поиск товаров..."
              variant="outlined"
            />
          </div>
        </Paper>
      </div> */}
    </div>
  );
};

export default Search;
