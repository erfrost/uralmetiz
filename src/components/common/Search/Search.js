import { Button, Link, TextField } from "@mui/material";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Search = () => {
  return (
    <div className={styles.container}>
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
      <div className={styles.bottom}>
        <Link className={styles.link} underline="none" href={"/"}>
          О Нас
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Новости
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Документация
        </Link>
        <Link className={styles.link} underline="none" href={"/"}>
          Доставка
        </Link>
      </div>
    </div>
  );
};

export default Search;
