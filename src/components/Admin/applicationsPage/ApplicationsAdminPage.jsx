import React from "react";
import TableComponent from "../components/table";

const applications = [
  {
    id: 1,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 2,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 3,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 4,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 5,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 6,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 7,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 8,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 9,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
  {
    id: 10,
    cell_3: "Шурупы",
    cell_2: "+7 (945) 60-81",
    cell_1: "Тихон",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
  },
];

const ApplicationsAdminPage = () => {
  const ROWS_PER_PAGE = 4;
  const countItems = applications.length;
  const totalPages = Math.ceil(countItems / ROWS_PER_PAGE);

  return (
    <TableComponent
      title="ЗАЯВКИ"
      header_1="ИМЯ"
      header_2="ТЕЛЕФОН"
      header_3="НАЗВАНИЕ"
      items={applications}
      totalPages={totalPages}
      countItems={countItems}
      ROWS_PER_PAGE={ROWS_PER_PAGE}
    />
  );
};

export default ApplicationsAdminPage;
