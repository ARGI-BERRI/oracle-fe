"use client";

import styles from "./css/main.module.css";

import { useEffect, useState } from "react";
import { Button, Center, Group, Paper, Skeleton, Text, useMantineColorScheme } from "@mantine/core";
import { Send, Clipboard, CheckCircle, Share2 } from "react-feather";
import { receive } from "@/app/lib/BuiltinOracle";
import EntranceSection from "./EntranceSection";
import ConfigSection from "./ConfigSection";

export default function Main() {
  const [fate, setFate] = useState("");
  const [receiveCount, setReceiveCount] = useState(-1);
  const [isCopied, setIsCopied] = useState(false);
  const [config, setConfig] = useState<ConfigBody>({});

  // color theme
  const isDarkMode = useMantineColorScheme().colorScheme == "dark";
  const dimmedColor = isDarkMode ? "" : "grey";

  async function receiveFate() {
    setReceiveCount(receiveCount + 1);

    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/oracle/?funny=${config.receiveFunnyFate}`;
    const response = await (await fetch(endpoint)).json();

    setFate(response.fate);
  }

  function copyText() {
    // Phase I: Clipboard
    const text =
      `${config.displayName ?? "あなた"}の今日の運勢は「${config.useMarkdown ? `**${fate}**` : fate}」です\n` +
      `${receiveCount > 0 ? `※ 引き直した回数：${receiveCount}回\n` : ""}` +
      "#おみくじコーナー #浅葱神社\n" +
      `${process.env.NEXT_PUBLIC_BASE_URL}\n`;
    navigator.clipboard.writeText(text);

    // Phase II: Button transition
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  function shareToX() {}

  useEffect(() => {
    receiveFate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <EntranceSection />

      <Paper className={styles.oracleOutcome} radius="sm" p="xl" withBorder>
        <Text c={dimmedColor}>
          <strong>{config.displayName || "あなた"}</strong>の今日の運勢は
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
        <Button variant="light" color="red" leftSection={<Send size={18} />} onClick={() => receiveFate()}>
          引きなおす
        </Button>
        <Button
          variant="light"
          color="gray"
          leftSection={isCopied ? <CheckCircle size={18} /> : <Clipboard size={18} />}
          onClick={() => copyText()}
        >
          {isCopied ? "コピー完了" : "コピーする"}
        </Button>
        <Button variant="subtle" color="gray" leftSection={<Share2 size={18} />} onClick={() => shareToX()}>
          X で共有
        </Button>
      </Group>

      <ConfigSection config={config} setConfig={setConfig} />
    </main>
  );
}
