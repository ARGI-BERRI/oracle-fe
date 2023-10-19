"use client";

import styles from "./css/main.module.css";

import { useEffect, useState } from "react";
import { Button, Center, Group, Paper, Skeleton, Text, useMantineColorScheme } from "@mantine/core";
import { Send, Clipboard } from "react-feather";
import { receive } from "@/app/lib/BuiltinOracle";
import EntranceSection from "./EntranceSection";
import ConfigSection from "./ConfigSection";

export default function Main() {
  const [fate, setFate] = useState("");
  const [config, setConfig] = useState<ConfigBody>({});

  // color theme
  const isDarkMode = useMantineColorScheme().colorScheme == "dark";
  const dimmedColor = isDarkMode ? "" : "grey";

  useEffect(() => {
    setFate(receive());
  }, []);

  return (
    <main>
      <EntranceSection />

      <Paper className={styles.oracleOutcome} radius="sm" p="xl" withBorder>
        <Text c={dimmedColor}>
          <strong>{config.displayName || "あんた"}</strong>の今日の運勢は
        </Text>
        <Center mt={"lg"} mb={"lg"}>
          {fate ? (
            <Text size="3rem" fw={"800"}>
              {fate}
            </Text>
          ) : (
            <Skeleton height={10} m={"lg"} />
          )}
        </Center>
        <Text c={dimmedColor} ta="right">
          です
        </Text>
      </Paper>

      <Group>
        <Button variant="light" color="red" leftSection={<Send size={18} />} onClick={() => setFate(receive())}>
          引きなおす
        </Button>
        <Button variant="light" color="gray" leftSection={<Clipboard size={18} />}>
          コピー
        </Button>
        <Button variant="subtle" color="gray">
          X で共有
        </Button>
      </Group>

      <ConfigSection config={config} setConfig={setConfig} />
    </main>
  );
}
