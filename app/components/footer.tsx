"use client";

import styles from "./css/footer.module.css";
import { Anchor, Text, useMantineColorScheme } from "@mantine/core";

export default function Footer() {
  const isDarkMode = useMantineColorScheme().colorScheme == "dark";
  const dimmedColor = isDarkMode ? "" : "grey";

  return (
    <footer className={styles.footer}>
      <Text c={dimmedColor} className={styles.footerText}>
        (C) 2023 ARGIA. Some rights reserved. <br />{" "}
        <Anchor href="https://gitlab.com/ARGI-BERRI/oracle-fe" target="_blank" rel="noopener noreferrer">
          oracle-fe
        </Anchor>{" "}
        is the frontend implementation of{" "}
        <Anchor href="https://gitlab.com/ARGI-BERRI/oracle-api" target="_blank" rel="noopener noreferrer">
          oracle-api
        </Anchor>
        .
      </Text>
    </footer>
  );
}
