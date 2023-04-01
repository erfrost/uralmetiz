import { Build } from "@mui/icons-material";
import { Paper } from "@mui/material";
import styles from "./CategoriesCatalog.module.scss";

const CategoriesCatalog = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Категории товаров</h2>
      <div className={styles.container}>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Фланцы</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Компенсаторы ЧЕГЛОК</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Заглушки АТК 24.200.02-90</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Заглушки поворотные</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Крепеж</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Прокладки</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Отводы</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Прокладки</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Переходы</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Тройники</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Комплект ответных фланцев</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <div className={styles.cat}>
            <p className={styles.cat_title}>Краны шаровые ALSO</p>
            <div className={styles.cat_icon}>
              <Build />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default CategoriesCatalog;
