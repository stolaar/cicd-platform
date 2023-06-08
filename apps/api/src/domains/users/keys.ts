import { BindingKey } from "@loopback/core"
import { UserService } from "./services/user.service"

export const USERS_SERVICE = BindingKey.create<UserService>("service.user")
