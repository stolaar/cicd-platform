import { createApiHandler } from "../utils"
import axios from "axios"

export const getUsers = createApiHandler(async () => {
  const { data } = await axios.get<any[]>("/api/v2/users")
  return data
}, ["get_users"])

export const createUser = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/v2/users", payload)
  },
  ["create_user"],
)
