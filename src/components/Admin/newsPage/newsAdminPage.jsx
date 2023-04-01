import React from "react";
import "./newsAdminPage.module.css";
import "../MainPage/MainAdminPage.module.css";
import TableComponent from "../components/table";

const ROWS_PER_PAGE = 4;
const news = [
  {
    cell_1: 1,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 2,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2: "Заголовок",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 3,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 4,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "123Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 5,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 6,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 7,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 8,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 9,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 10,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "123Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 11,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "123Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 12,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "123Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
  {
    cell_1: 13,
    banner:
      "https://sun9-64.userapi.com/impg/m_aQ9uASja4E4JiowPfYEcsMcHPgr2tp6pV0IA/MMCsHykElzA.jpg?size=1280x720&quality=96&sign=995df0bc974d2a0bc2e2204d1c82a536&type=album",
    cell_2:
      "123Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, commodi!",
    content: "Content",
    date: "Date",
  },
];

const NewsAdminPage = () => {
  const countItems = news.length;
  const totalPages = Math.ceil(countItems / ROWS_PER_PAGE);

  return (
    <TableComponent
      title="НОВОСТИ"
      header_1="ID"
      header_2="ЗАГОЛОВОК"
      header_3="ДЕЙСТВИЯ"
      items={news}
      totalPages={totalPages}
      countItems={countItems}
      ROWS_PER_PAGE={ROWS_PER_PAGE}
    />
  );
};

export default NewsAdminPage;
