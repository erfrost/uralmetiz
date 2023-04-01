"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./NewsCarousel.module.scss";

const NewsCarousel = () => {
  return (
    <div className={styles.custom_carousel}>
      <Carousel
        width={"80%"}
        infiniteLoop
        autoPlay
        emulateTouch
        showThumbs={false}
      >
        <div>
          <img
            height={600}
            style={{ objectFit: "cover" }}
            src="https://img.freepik.com/free-photo/fake-news-words-surrounded-by-instruments-used-by-the-media-for-informing-people_23-2149261952.jpg?w=1480&t=st=1680279443~exp=1680280043~hmac=175ad2f01699618db59956c3f2cccea9c7812eff0b6d98d18c93faa0dce4926e"
          />
          <p className={styles.more_btn}>Подробнее</p>
        </div>
        <div>
          <img
            height={600}
            style={{ objectFit: "cover" }}
            src="https://img.freepik.com/free-photo/fake-news-words-surrounded-by-instruments-used-by-the-media-for-informing-people_23-2149261952.jpg?w=1480&t=st=1680279443~exp=1680280043~hmac=175ad2f01699618db59956c3f2cccea9c7812eff0b6d98d18c93faa0dce4926e"
          />
          <p className={styles.more_btn}>Подробнее</p>
        </div>
        <div>
          <img
            height={600}
            style={{ objectFit: "cover" }}
            src="https://img.freepik.com/free-photo/fake-news-words-surrounded-by-instruments-used-by-the-media-for-informing-people_23-2149261952.jpg?w=1480&t=st=1680279443~exp=1680280043~hmac=175ad2f01699618db59956c3f2cccea9c7812eff0b6d98d18c93faa0dce4926e"
          />
          <p className={styles.more_btn}>Подробнее</p>
        </div>
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
