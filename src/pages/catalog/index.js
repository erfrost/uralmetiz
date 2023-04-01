import Header from "@/components/common/Header/Header";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Footer from "@/components/common/Footer/Footer";
import ReturnToMainPage from "@/components/common/ReturnToMain/ReturnToMainPage";
import Search from "@/components/common/Search/Search";
import CategoriesCatalog from "@/components/common/CategoriesCatalog/CategoriesCatalog";

export default function Catalog() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className={styles.container}>
          <ReturnToMainPage />
          <Search />
          <CategoriesCatalog />
        </div>
        <div style={{ marginTop: 60 }} />
        <Footer />
      </main>
    </>
  );
}