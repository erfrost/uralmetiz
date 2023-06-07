import Header from "@/components/common/Header/Header";
import Head from "next/head";
import styles from "../../../components/Admin/MainPage/MainAdminPage.module.css";
import TableComponent from "@/components/Admin/components/table";
import serverApi from "@/pages/api/auth";
import Navigation from "@/components/Admin/navigation";
import { Box, Paper } from "@mui/material";

export default function Items({ categories }) {
  const ROWS_PER_PAGE = 5;
  const countItems = categories.length;
  const totalPages = Math.ceil(countItems / ROWS_PER_PAGE);
  console.log(categories);
  return (
    <>
      <Head>
        <title>ТПА Крепеж</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ minHeight: "100vh" }}>
        <Header />
        <Box className={styles.body}>
          <Box className={styles.main}>
            <Paper elevation={0} className={styles.infoPanel}>
              <Box className={styles.infoPanelTitle}>
                <TableComponent
                  items={categories}
                  title="КАТЕГОРИИ"
                  header_1="КАТЕГОРИЯ"
                  header_2="ПОДКАТЕГОРИИ"
                  header_3="ДЕЙСТВИЯ"
                  totalPages={totalPages}
                  countItems={countItems}
                  ROWS_PER_PAGE={ROWS_PER_PAGE}
                />
                <Navigation />
              </Box>
            </Paper>
          </Box>
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );
  const { data: catsData } = await serverApi("categories");

  if (catsData) {
    return {
      props: {
        categories: catsData,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
