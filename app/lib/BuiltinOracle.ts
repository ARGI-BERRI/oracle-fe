const fates = ["大吉", "中吉", "吉", "小吉", "末吉", "凶", "大凶"];

export function receive() {
  return fates[Math.floor(Math.random() * fates.length)];
}
