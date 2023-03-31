import styles from "./Categories.module.scss";

const Categories = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Категории товаров</h2>
      <div className={styles.container}>
        <div className={styles.cat}></div>
        <div className={styles.cat}></div>
        <div className={styles.cat}></div>
        <div className={styles.cat}></div>
        <div className={styles.cat}></div>
        <div className={styles.cat}></div>
      </div>
    </div>
  );
};

export default Categories;
