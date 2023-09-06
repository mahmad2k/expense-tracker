import * as Crypto from "expo-crypto";

export function generateRandomId() {
  // (new Date).toString() + Math.random().toString();
  return Crypto.randomUUID();
}
