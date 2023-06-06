import { randomUUID } from "crypto"

export function newCode() {
  return randomUUID()
}