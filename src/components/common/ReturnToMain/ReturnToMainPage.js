import { ArrowLeftOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import styles from "./ReturnToMainPage.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const ReturnToMainPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.prevText}>
        <KeyboardBackspaceIcon /> Вернуться на главную
      </p>
    </div>
  );
};

export default ReturnToMainPage;
