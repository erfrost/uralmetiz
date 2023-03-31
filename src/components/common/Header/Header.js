import Image from "next/image";
import styles from "./Header.module.css";
import logo from "../../../../public/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href={"/"}>
        <Image src={logo} className={styles.logo} />
      </Link>
    </nav>
  );
};

export default Header;
