import Header from "@/components/common/Header/Header";
import ReturnToMainPage from "@/components/common/ReturnToMain/ReturnToMainPage";
import Search from "@/components/common/Search/Search";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import ItemShow from "@/components/common/ItemShow/ItemShow";
import Footer from "@/components/common/Footer/Footer";

export default function CatalogItem({ item }) {
  console.log(item);
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
          <ItemShow item={item} />
        </div>
        <div style={{ marginTop: 60 }} />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  if (query.id) {
    return {
      props: {
        item: {
          id: 1,
          title: "Фланцы плоские сталь 20",
          description: "Описание товара",
          category_id: 1,
          subcategory_id: 1,
          price: 10000,
          photo_url:
            "https://www.zavod-rekom.ru/upload/medialibrary/f5b/flanets-ploskiy-privarnoy.png",
          specifications: [
            {
              key: "Размер",
              value: "< 15 см",
            },
          ],
        },
      },
    };
  } else {
    return {
      props: { item: null },
    };
  }
}
