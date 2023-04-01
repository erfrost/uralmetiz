import React, { useState } from "react";
import styles from "./applicationInfo.module.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ApplicationInfo = ({
  data,
  categories,
  handleFinishOrder,
  handleDeleteOrder,
  setIsInfo,
}) => {
  console.log(data);
  const [openComplete, setOpenComplete] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const isMobileDevice = useMediaQuery({ maxWidth: 450 });
  const handleOpenModalComplete = () => {
    setOpenComplete(true);
  };
  const handleCloseModalComplete = () => {
    setOpenComplete(false);
  };
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  const priceTransform = (price) => {
    price = price.toString();
    console.log(`${price[0]} ${price[1]}${price[2]}${price[3]} ₽`);
    switch (price.length) {
      case 4:
        return `${price[0]} ${price[1]}${price[2]}${price[3]} ₽`;
        break;
      case 5:
        return `${price[0]}${price[1]} ${price[2]}${price[3]}${price[4]} ₽`;
        break;
      case 6:
        return `${price[0]}${price[1]}${price[2]} ${price[3]}${price[4]}${price[5]} ₽`;
        break;
      default:
        break;
    }
  };

  return (
    <Box className={styles.body}>
      {!isMobileDevice ? (
        <>
          {" "}
          <Box className={styles.header}>
            <Box className={styles.totalPrice}>
              {priceTransform(data.total_price)}
            </Box>
            <Box className={styles.buttons}>
              <Button
                variant="contained"
                className={`${styles.btn} ${styles.btnComplete}`}
                onClick={() => handleOpenModalComplete()}
              >
                Завершить
              </Button>
              <Button
                variant="contained"
                className={`${styles.btn} ${styles.btnDelete}`}
                onClick={() => handleOpenModalDelete()}
              >
                Удалить
              </Button>

              <Dialog
                open={openComplete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModalComplete}
                aria-describedby="alert-dialog-slide-description"
              >
                <Box className={styles.modalContent}>
                  <DialogTitle className={styles.modalTitle}>
                    Вы уверены что хотите завершить заказ?
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
                    className={styles.btnModalCancel}
                    onClick={handleCloseModalComplete}
                  >
                    Отменить
                  </Button>
                  <Button
                    id="2"
                    className={styles.btnModalComplete}
                    onClick={() => {
                      handleCloseModalComplete();
                      handleFinishOrder(data.id);
                      setIsInfo(false);
                    }}
                  >
                    Завершить
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModalDelete}
                aria-describedby="alert-dialog-slide-description"
              >
                <Box className={styles.modalContent}>
                  <DialogTitle className={styles.modalTitle}>
                    Вы уверены что хотите удалить заказ?
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
                    className={styles.btnModalCancel}
                    onClick={handleCloseModalDelete}
                  >
                    Отменить
                  </Button>
                  <Button
                    id="2"
                    className={styles.btnModalDelete}
                    onClick={() => {
                      handleCloseModalDelete();
                      handleDeleteOrder(data.id);
                      setIsInfo(false);
                    }}
                  >
                    Удалить
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Box className={styles.main}>
            <Box className={styles.mainInfo}>
              <Box className={styles.titleText}>Имя</Box>
              <Box className={styles.name}>{`: ${data.name}`}</Box>
            </Box>
            <Box className={styles.mainInfo}>
              <Box className={styles.titleText}>Телефон:&nbsp;</Box>
              <Link href={`tel:${data.phone}`} className={styles.phone}>
                +{data.phone}
              </Link>
            </Box>
            <Box className={`${styles.mainInfo} ${styles.flexColumn}`}>
              <Box className={styles.titleText}>Комментарий:</Box>

              <Box className={styles.comment}>
                {`"${data.comment}"`}"Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
              </Box>
            </Box>

            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <img
                    alt="image"
                    src={product.photo_url}
                    className={styles.image}
                  />
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <img
                    alt="image"
                    src={product.photo_url}
                    className={styles.image}
                  />
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box className={styles.main}>
          <Box className={styles.mainInfo}>
            <Box className={styles.titleText}>Имя</Box>
            <Box className={styles.name}>{`: ${data.name}`}</Box>
          </Box>
          <Box className={styles.mainInfo}>
            <Box className={styles.titleText}>Телефон:&nbsp;</Box>
            <Link href={`tel:${data.phone}`} className={styles.phone}>
              +{data.phone}
            </Link>
          </Box>
          <Box className={`${styles.mainInfo} ${styles.flexColumn}`}>
            <Box className={styles.titleText}>Комментарий:</Box>

            <Box className={styles.comment}>
              {`"${data.comment}"`}"Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </Box>
          </Box>
          <Box className={styles.buttons}>
            <Button
              variant="contained"
              className={`${styles.btn} ${styles.btnComplete}`}
              onClick={() => handleOpenModalComplete()}
            >
              Завершить
            </Button>
            <Button
              variant="contained"
              className={`${styles.btn} ${styles.btnDelete}`}
              onClick={() => handleOpenModalDelete()}
            >
              Удалить
            </Button>

            <Dialog
              open={openComplete}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseModalComplete}
              aria-describedby="alert-dialog-slide-description"
            >
              <Box className={styles.modalContent}>
                <DialogTitle className={styles.modalTitle}>
                  Вы уверены что хотите завершить заказ?
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
                  className={styles.btnModalCancel}
                  onClick={handleCloseModalComplete}
                >
                  Отменить
                </Button>
                <Button
                  id="2"
                  className={styles.btnModalComplete}
                  onClick={() => {
                    handleCloseModalComplete();
                    handleFinishOrder(data.id);
                    setIsInfo(false);
                  }}
                >
                  Завершить
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDelete}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseModalDelete}
              aria-describedby="alert-dialog-slide-description"
            >
              <Box className={styles.modalContent}>
                <DialogTitle className={styles.modalTitle}>
                  Вы уверены что хотите удалить заказ?
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
                  className={styles.btnModalCancel}
                  onClick={handleCloseModalDelete}
                >
                  Отменить
                </Button>
                <Button
                  id="2"
                  className={styles.btnModalDelete}
                  onClick={() => {
                    handleCloseModalDelete();
                    handleDeleteOrder(data.id);
                    setIsInfo(false);
                  }}
                >
                  Удалить
                </Button>
              </DialogActions>
            </Dialog>
            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
            {data.items.map((product) => (
              <Box className={styles.productMain}>
                <Box className={styles.productContent}>
                  <Box className={styles.texts}>
                    <Box className={styles.categories}>
                      <Box className={styles.category}>
                        {`${
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].title
                        } /`}
                      </Box>
                      <Box className={styles.category}>
                        {
                          categories.data[
                            categories.data.findIndex(
                              (category) => category.id === product.category_id
                            )
                          ].subcategories[
                            categories.data[
                              categories.data.findIndex(
                                (category) =>
                                  category.id === product.category_id
                              )
                            ].subcategories.findIndex(
                              (sub) => sub.id === product.subcategory_id
                            )
                          ].title
                        }
                      </Box>
                    </Box>
                    <Box className={styles.itemName}>{product.title}</Box>
                    <Box className={styles.price}>
                      {priceTransform(product.price)}
                    </Box>
                    <Box className={styles.paramsBox}>
                      {product.specifications.map((param) => (
                        <>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                          <Box className={styles.param}>
                            {param.title + ": " + param.data}
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ApplicationInfo;
