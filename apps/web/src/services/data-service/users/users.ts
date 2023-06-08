import { createApiHandler } from "../utils";
import axios from "axios";

export const getUsers = createApiHandler(async () => {
  const { data } = await axios.get<any[]>("/api/users");
  return data;
}, ["get_users"]);

export const createUser = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/users", payload);
  },
  ["create_user"]
);
