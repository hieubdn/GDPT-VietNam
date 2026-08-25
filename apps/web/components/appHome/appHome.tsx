import { Search } from "../layout/search/search";
import { Purpose } from "./section/purpose/purpose";
import { Motto } from "./section/motto/motto";
import styles from "./apphome.module.scss";


export function AppHome() {
  return (
    <div className={styles.apphome}>
      <Search />
      <Purpose />
      <Motto />
    </div>
  );
}