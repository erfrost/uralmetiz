import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import styles from "../newsPage/newsAdminPage.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Buttons({
  id,
  handleOpenChange,
  handleDelete,
  handleOpenInfo,
  isApplications,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = (id) => {
    setOpen(true);
  };
  const handleCloseModal = (e) => {
    setOpen(false);
  };

  return (
    <>
      {!isApplications ? (
        <>
          <Button
            className={`${styles.tableBtn} ${styles.fontMain}`}
            variant="text"
            onClick={() => handleOpenChange(id)}
          >
            Изменить
          </Button>
          <Button
            className={`${styles.tableBtn} ${styles.fontMain}`}
            variant="text"
            onClick={() => handleOpenModal(id)}
          >
            Удалить
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseModal}
            aria-describedby="alert-dialog-slide-description"
          >
            <Box className={styles.modalContent}>
              <DialogTitle
                className={`${styles.fontMain} ${styles.modalTitle}`}
              >
                Вы уверены что хотите удалить новость?
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  className={styles.DialogContentText}
                >
                  Это действие нельзя отменить
                </DialogContentText>
              </DialogContent>
            </Box>
            <DialogActions>
              <Button
                id="1"
                className={`${styles.modalBtn} ${styles.fontMain} ${styles.btnCancel}`}
                onClick={handleCloseModal}
              >
                Отменить
              </Button>
              <Button
                id="2"
                className={`${styles.btnDelete} ${styles.modalBtn} ${styles.fontMain}`}
                onClick={() => handleDelete(id)}
              >
                Удалить
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Button
          className={`${styles.tableBtn} ${styles.fontMain}`}
          variant="text"
          onClick={() => {
            handleOpenInfo(id);
            handleCloseModal;
          }}
        >
          Подробнее
        </Button>
      )}
    </>
  );
}
