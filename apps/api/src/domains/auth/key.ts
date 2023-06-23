import { BindingKey } from "@loopback/core"
import { AuthService } from "./services/auth.service"

export const AUTH_SERVICE = BindingKey.create<AuthService>("service.auth")
