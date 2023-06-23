import { createApiHandler } from "../utils"
import { TRegister } from "@domain/auth/components/RegisterForm/validation/validation-schema"
import axios from "axios"

export const register = createApiHandler(
  async (payload: Pick<TRegister, "email" | "password">) => {
    await axios.post("/api/v2/auth/register", payload)
  },
  ["register"],
)
