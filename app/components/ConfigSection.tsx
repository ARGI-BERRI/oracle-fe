import styles from "./css/config.module.css";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Collapse, Stack, TextInput, Switch, Code, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "react-feather";
import { useSession } from "next-auth/react";

interface Props {
  setConfig: Dispatch<SetStateAction<ConfigBody>>;
  config: ConfigBody;
}

export default function ConfigSection({ config, setConfig }: Props) {
  const { data: session, status } = useSession();

  const [configOpened, configState] = useDisclosure(false);
  const [debugOpened, debugState] = useDisclosure(false);

  async function saveConfig() {
    if (status !== "authenticated") {
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config`, {
      method: "POST",
      body: JSON.stringify(config),
    });
  }

  async function fetchConfig() {
    if (status !== "authenticated") {
      return {} as ConfigBody;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config`);
    const json = await response.json();
    const config = json.config;

    return config as ConfigBody;
  }

  useEffect(() => {
    (async () => {
      console.log(`Fetching your config. Status: ${status}`);
      setConfig(await fetchConfig());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <div className={styles.config}>
        <Button
          className={styles.config__button}
          variant="transparent"
          color="red"
          size="compact-md"
          leftSection={configOpened ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          onClick={configState.toggle}
        >
          おみくじの設定
        </Button>

        <Collapse in={configOpened}>
          <Stack>
            <TextInput
              label="お名前"
              placeholder="ARGIA"
              value={config.displayName ?? ""}
              onChange={(event) => setConfig({ ...config, displayName: event.currentTarget.value })}
            />
            <Switch
              color="red"
              label="変なおみくじも引くようにする"
              checked={config.receiveFunnyFate}
              onChange={(event) => setConfig({ ...config, receiveFunnyFate: event.currentTarget.checked })}
            />
            <Switch
              color="red"
              label="過去を覚えておく（※ 引き直した回数を内容に含める）"
              checked={config.rememberPast}
              onChange={(event) => setConfig({ ...config, rememberPast: event.currentTarget.checked })}
            />
            <Switch
              color="red"
              label="Markdown による装飾を有効にする（※ クリップボードに影響します）"
              checked={config.useMarkdown}
              onChange={(event) => setConfig({ ...config, useMarkdown: event.currentTarget.checked })}
            />
            <Button variant="light" color="red" onClick={() => saveConfig()}>
              保存する
            </Button>
          </Stack>
        </Collapse>
      </div>

      <div className={styles.config}>
        <Button
          className={styles.config__button}
          variant="transparent"
          color="red"
          size="compact-md"
          leftSection={debugOpened ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          onClick={debugState.toggle}
        >
          デバッグ情報
        </Button>

        <Collapse in={debugOpened}>
          <Text>configuration for {session?.user.email}</Text>
          <Code block className={styles.config__detail}>
            {JSON.stringify(config, null, "\t")}
          </Code>
        </Collapse>
      </div>
    </>
  );
}
