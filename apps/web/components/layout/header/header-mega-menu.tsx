import Link from "next/link";
import type { NavMenuConfig } from "@/config/nav-menu";
import styles from "./header.module.scss";

export function HeaderMegaMenu({ menu, label }: { menu: NavMenuConfig; label: string }) {
  return (
    <div className={styles.navItemWithMenu}>
      <Link href={menu.href} className={`${styles.text} ${styles.navLabelLink}`}>
        {label}
      </Link>
      <div className={styles.megaMenu}>
        <ul className={styles.menuColumn}>
          {menu.categories.map((category) => (
            <li key={category.label} className={styles.menuCategory}>
              <span className={styles.menuCategoryLabel}>{category.label}</span>
              <ul className={styles.subMenuColumn}>
                {category.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.subMenuLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
