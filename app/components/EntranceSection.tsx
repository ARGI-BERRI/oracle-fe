import styles from "./css/entrance.module.css";
import { Center, Text, Title } from "@mantine/core";

export default function EntranceSection() {
  return (
    <>
      <Center>
        <Title className={styles.title} size={"56px"}>
          ⛩
        </Title>
      </Center>
      <Text>あんたの今日の運勢を占います。気に入らなかったら何度でも引き直せます。しかし、過去は消せません。</Text>
    </>
  );
}
