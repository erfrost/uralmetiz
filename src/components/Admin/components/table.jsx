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
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../newsPage/newsAdminPage.module.css";
import mainStyles from "../MainPage/MainAdminPage.module.css";
import Buttons from "./buttons";
import EditData from "./editData";
import AddData from "./addData";

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
  const [data, setData] = useState(items);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [textField, setTextField] = useState("");

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

  const handleDelete = (setData, id) => {
    if (title === "ЗАЯВКИ") {
      setData((prevState) => prevState.filter((n) => n.id !== id));
    } else {
      setData((prevState) => prevState.filter((n) => n.cell_1 !== id));
    }
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    setTextField(text);
  };
  const handleClickRow = (rowId) => {};

  return (
    <>
      {isEdit ? (
        <EditData
          id={dataId}
          data={data}
          handleCloseChange={handleCloseChange}
        />
      ) : isAdd ? (
        <AddData data={data} handleCloseAdd={handleCloseAdd} />
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
                      onClick={() =>
                        handleClickRow(title === "ЗАЯВКИ" ? n.id : n.cell_1)
                      }
                    >
                      <TableCell
                        align="center"
                        className={`${styles.fontMain} ${styles.tableCell} ${styles.cell1} ${styles.fontWeight}`}
                      >
                        {n.cell_1}
                      </TableCell>

                      <TableCell
                        align="left"
                        className={`${styles.fontMain} ${styles.tableCell} ${styles.cell2}`}
                      >
                        {n.cell_2.length <= 25
                          ? n.cell_2
                          : n.cell_2.slice(0, 24) + "..."}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={
                          title === "ЗАЯВКИ"
                            ? `${styles.fontMain} ${styles.tableCell} ${styles.cell3} ${styles.nameApplication}`
                            : `${styles.fontMain} ${styles.tableCell} ${styles.cell3}`
                        }
                      >
                        {title === "ЗАЯВКИ" ? (
                          n.cell_3
                        ) : (
                          <Buttons
                            id={title === "ЗАЯВКИ" ? n.id : n.cell_1}
                            handleDelete={() =>
                              handleDelete(
                                setData,
                                title === "ЗАЯВКИ" ? n.id : n.cell_1
                              )
                            }
                            handleOpenChange={() =>
                              handleOpenChange(
                                title === "ЗАЯВКИ" ? n.id : n.cell_1
                              )
                            }
                          />
                        )}
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
  );
};

export default TableComponent;