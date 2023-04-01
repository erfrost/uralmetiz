import React from "react";
import TableComponent from "../components/table";

const products = [
  {
    cell_1: 1,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 2,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 3,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 4,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 5,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 6,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
  {
    cell_1: 7,
    banner:
      "https://www.enkor24.ru/u/images/products/9f/9f81becdc4a88f724a03f261cefd489030930647.png",
    cell_2: "Шурупы",
  },
];

const ProductsAdminPage = () => {
  const ROWS_PER_PAGE = 3;
  const countItems = products.length;
  const totalPages = Math.ceil(countItems / ROWS_PER_PAGE);

  return (
    <TableComponent
      title="ТОВАРЫ"
      header_1="ID"
      header_2="НАЗВАНИЕ"
      header_3="ДЕЙСТВИЯ"
      items={products}
      totalPages={totalPages}
      countItems={countItems}
      ROWS_PER_PAGE={ROWS_PER_PAGE}
    />
  );
};

export default ProductsAdminPage;
