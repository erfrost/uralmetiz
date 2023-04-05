import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";
import Buttons from "./buttons";
import EditData from "./editData";
import AddData from "./addData";
import api from "@/pages/api/apiRequest";
import ApplicationInfo from "./applicationInfo";

const TableComponent = ({
  title,
  header_1,
  header_2,
  header_3,
  items,
  totalPages,
  countItems,
  ROWS_PER_PAGE,
}) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [dataId, setDataId] = useState(null);
  const [textField, setTextField] = useState("");
  const [loading, setLoading] = useState(true);

  //рендер количества строк
  const news1 = useMediaQuery({ maxWidth: 681 });
  const news2 = useMediaQuery({ maxWidth: 450 });
  const news3 = useMediaQuery({ maxWidth: 403 });
  const products1 = useMediaQuery({ maxWidth: 830 });
  const products2 = useMediaQuery({ maxWidth: 480 });
  const products3 = useMediaQuery({ maxWidth: 450 });
  const products4 = useMediaQuery({ maxWidth: 391 });
  const applications1 = useMediaQuery({ maxWidth: 830 });

  if (news1 && title === "НОВОСТИ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE - 1;
  }
  if (news2 && title === "НОВОСТИ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE + 1;
  }
  if (news3 && title === "НОВОСТИ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE - 1;
  }
  if (products1 && title === "ТОВАРЫ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE + 1;
  }
  if (products2 && title === "ТОВАРЫ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE - 1;
  }
  if (products3 && title === "ТОВАРЫ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE + 1;
  }
  if (products4 && title === "ТОВАРЫ") {
    ROWS_PER_PAGE = ROWS_PER_PAGE - 1;
  }

  //обрезка на страницы таблички
  const startIndex = page * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseChange = () => {
    setIsEdit(false);
  };
  const handleOpenChange = (id) => {
    setDataId(id);
    setIsEdit(true);
  };
  const handleCloseAdd = () => {
    setIsAdd(false);
  };
  const handleOpenAdd = () => {
    setIsAdd(true);
  };
  const handleOpenInfo = (id) => {
    setIsInfo(true);
    const indexData = data.findIndex((item) => item.id === id);
    setInfoItem(data[indexData]);
  };
  const handleCloseInfo = () => {
    setIsInfo(false);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setTextField(text);
  };

  async function getCategories() {
    const categories = await api("categories");
    setCategories(categories);
    setLoading(false);
  }
  async function getNews() {
    //  при монтировании компонента data === null, нам и нужен именно этот отрезок времени, чтобы не допустить повторных запросов к бекенду и не слать ему 100 ненужных и однотипных запросов, вместо одного
    if (!data) {
      // GET запрос
      const { data: responseData } = await api("news");
      setData(responseData);
    }
  }
  async function getItems() {
    //  при монтировании компонента data === null, нам и нужен именно этот отрезок времени, чтобы не допустить повторных запросов к бекенду и не слать ему 100 ненужных и однотипных запросов, вместо одного
    if (!data) {
      // GET запрос
      const { data: responseData } = await api("items");
      setData(responseData);
    }
  }
  async function getOrders() {
    //  при монтировании компонента data === null, нам и нужен именно этот отрезок времени, чтобы не допустить повторных запросов к бекенду и не слать ему 100 ненужных и однотипных запросов, вместо одного
    if (!data) {
      // GET запрос
      const { data: responseData } = await api("admin/orders");
      setData(responseData);
    }
    getCategories();
  }

  useEffect(() => {
    switch (title) {
      case "НОВОСТИ":
        getNews();
        break;
      case "ТОВАРЫ":
        getItems();
        break;
      case "ЗАЯВКИ":
        getOrders();
        break;
      default:
        break;
    }
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    let anchor = "";
    switch (title) {
      case "НОВОСТИ":
        anchor = "news";
        break;
      case "ТОВАРЫ":
        anchor = "items";
        break;
      case "ЗАЯВКИ":
        anchor = "orders";
        break;
      default:
        break;
    }
    const { data: responseData, message: errorMessage } = await api(
      `admin/${anchor}/${id}`,
      "DELETE"
    );
    if (responseData) {
      const itemIndex = data.findIndex((item) => item.id === id);
      const newData = data.filter((item, index) => index !== itemIndex);
      setData(newData);
    } else {
      if (errorMessage) {
        console.log(errorMessage); // Ошибка. Нужно обрабатывать.
      }
    }
  };
  const handleSubmit = async (id, editData) => {
    //if (title === "НОВОСТИ") {
    //  await api(`admin/news/${id}`, "PATCH", editData);
    //} else {
    //  await api(`admin/items/${id}`, "PATCH", editData);
    //}
  };
  const handleAdd = async (addData) => {
    //if (title === "НОВОСТИ") {
    //  await api(`admin/news`, "POST");
    //} else {
    //  await api(`admin/items`, "POST");
    //}
  };

  const handleFinishOrder = async (orderId) => {
    const { data: responseData, message: errorMessage } = await api(
      `admin/orders/${orderId}`,
      "PATCH"
    );
    if (responseData) {
      // Успешно ЗАВЕРШИЛИ заказ. Далее пиши мне, разберемся, куда их заносить.
    } else {
      if (errorMessage) {
        console.log(errorMessage); // Ошибка. Нужно обрабатывать.
      }
    }
  };
  // пример того, что придет в стейт data

  // [
  //   {
  //     "id": 1,
  //     "name": "Иван",
  //     "phone": "89999999999",
  //     "comment": "Комментарий",
  //     "total_price": 1000,
  //     "created_at": 1610000000,
  //     "items": [
  //       "string"
  //     ]
  //   }
  // ]
  console.log(data);
  return (
    <>
      {data && (
        <>
          {isEdit ? (
            <EditData
              id={dataId}
              handleSubmit={handleSubmit}
              handleCloseChange={handleCloseChange}
              page={title}
              categories={categories}
            />
          ) : isAdd ? (
            <AddData
              handleAdd={handleAdd}
              handleCloseAdd={handleCloseAdd}
              page={title}
              categories={categories}
            />
          ) : isInfo ? (
            <ApplicationInfo
              data={infoItem}
              categories={categories}
              handleFinishOrder={handleFinishOrder}
              handleDeleteOrder={handleDelete}
              setIsInfo={setIsInfo}
            />
          ) : (
            <>
              {title === "НОВОСТИ" ? (
                <Box className={styles.newsHeaderBox}>
                  <Box className={mainStyles.title1}>{title}</Box>
                  <Button
                    className={styles.newsHeaderBtn}
                    variant="text"
                    onClick={handleOpenAdd}
                  >
                    Добавить новость
                  </Button>
                </Box>
              ) : (
                <Box className={mainStyles.title1}>{title}</Box>
              )}

              {title === "ТОВАРЫ" ? (
                <Box className={styles.textFieldBox}>
                  <TextField
                    id="filled-basic"
                    label="Поиск по товарам"
                    variant="filled"
                    className={styles.textField}
                    value={textField}
                    onChange={handleSearch}
                  />
                  <Button
                    className={styles.productsHeaderBtn}
                    variant="text"
                    onClick={handleOpenAdd}
                  >
                    Добавить товар
                  </Button>
                </Box>
              ) : null}

              <Box
                className={
                  title === "ТОВАРЫ"
                    ? `${styles.boxTable} ${styles.productsBoxTable}`
                    : styles.boxTable
                }
              >
                <TableContainer className={styles.table}>
                  <Table aria-label="simple table" className={styles.tableMain}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className={`${styles.fontMain} ${styles.tableBorder} ${styles.fontWeight} ${styles.tableHeader}`}
                        >
                          {header_1}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={`${styles.fontMain} ${styles.tableBorder} ${styles.fontWeight} ${styles.tableHeader}`}
                        >
                          {header_2}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={`${styles.fontMain} ${styles.tableBorder} ${styles.fontWeight} ${styles.tableHeader}`}
                        >
                          {header_3}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.slice(startIndex, endIndex).map((n) => (
                        <TableRow
                          className={`${styles.tableRow} ${styles.tableBorder} ${styles.rowHover}`}
                          key={title === "ЗАЯВКИ" ? n.id : n.cell_1}
                        >
                          <TableCell
                            align="center"
                            className={`${styles.fontMain} ${styles.tableCell} ${styles.cell1} ${styles.fontWeight}`}
                          >
                            {title === "ЗАЯВКИ" ? n.total_price : n.id}
                          </TableCell>

                          <TableCell
                            align="left"
                            className={`${styles.fontMain} ${styles.tableCell} ${styles.cell2}`}
                          >
                            {title === "ЗАЯВКИ"
                              ? n.items.map((item) => item.title)
                              : n.title}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={
                              title === "ЗАЯВКИ"
                                ? `${styles.fontMain} ${styles.tableCell} ${styles.cell3} ${styles.nameApplication}`
                                : `${styles.fontMain} ${styles.tableCell} ${styles.cell3}`
                            }
                          >
                            <Buttons
                              id={n.id}
                              handleDelete={handleDelete}
                              handleOpenChange={() => handleOpenChange(n.id)}
                              isApplications={title === "ЗАЯВКИ" ? true : false}
                              handleOpenInfo={() =>
                                handleOpenInfo(
                                  title === "ЗАЯВКИ" ? n.id : n.cell_1
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={data.length}
                    rowsPerPage={ROWS_PER_PAGE}
                    page={page}
                    onPageChange={handleChangePage}
                    className={
                      title === "ТОВАРЫ"
                        ? `${styles.tablePagination} ${styles.productsPagination}`
                        : styles.tablePagination
                    }
                  />
                </TableContainer>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TableComponent;
