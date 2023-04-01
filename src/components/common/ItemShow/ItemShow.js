import { Button } from "@mui/material";
import Image from "next/image";
import styles from "./ItemShow.module.scss";

const ItemShow = ({ item }) => {
  return (
    <div className={styles.container}>
      <span className={styles.stepper}>Фланцы / Плоские</span>
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.image_container}>
        <Image src={item.photo_url} alt="image" width={500} height={400} />
        <div className={styles.sepcs_cont}>
          <div className={styles.top}>
            <h2 className={styles.specifications_title}>Характеристики</h2>
            <p className={styles.specifications}>
              {item.specifications.map((i) => (
                <span className={styles.specifications_item}>
                  {i.key}: {i.value}
                </span>
              ))}
              {item.specifications.map((i) => (
                <span className={styles.specifications_item}>Давление: 10</span>
              ))}
            </p>
          </div>
          <div className={styles.bottom}>
            <Button className={styles.button} variant="contained">
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
      <h2 className={styles.desc_title}>Описание</h2>
      <p className={styles.description}>
        Фланцы плоские из стали 20 - наиболее востребованный вид соединительных
        деталей трубопроводов. Рассчитаны на температуру среды от -30 до +300
        °С. Фланцы стальные плоские приварные используются для участков
        трубопроводов с давлением среды не более 2,5 МПа.Применяются в
        коммунальной и промышленной сферах.
      </p>
    </div>
  );
};

export default ItemShow;
