"use client";

import styles from "./css/header.module.css";

import { ActionIcon, Avatar, Button, Group, Text, useMantineColorScheme } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { Moon, Sun } from "react-feather";

export default function Header() {
  const theme = useMantineColorScheme();
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <nav className={styles.header}>
      <Group justify="space-between">
        <Group>
          <Avatar src={user?.image} />
          {status !== "unauthenticated" && (
            <Text>
              {status === "loading" && "Loading..."}
              {status === "authenticated" && user?.name}
            </Text>
          )}
        </Group>

        <Group>
          {status !== "loading" && (
            <>
              <Group>
                <Button variant="subtle" color="red" onClick={() => (status === "unauthenticated" ? signIn() : signOut())}>
                  {status === "unauthenticated" && "ログイン"}
                  {status === "authenticated" && "ログアウト"}
                </Button>
                <ActionIcon variant="light" color="gray" onClick={() => theme.toggleColorScheme()}>
                  {theme.colorScheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </ActionIcon>
              </Group>
            </>
          )}
        </Group>
      </Group>
    </nav>
  );
}
