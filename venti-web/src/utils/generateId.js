// venti-web/src/utils/generateId.js

export function generateId(prefix = "venti") {
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${prefix}-${randomNum}`;
}
