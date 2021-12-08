import { FC, useEffect, useState } from "react";

import styles from "./cursor.module.sass";

export const Cursor: FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(v => !v);
    }, 500);

    return () => clearTimeout(timer);
  });

  return <span className={styles.root + ' ' + (show ? styles.show : undefined)} />;
};