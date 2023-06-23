import { inject } from "@loopback/core"
import { api, post, requestBody, response } from "@loopback/rest"
import { Request, RestBindings } from "@loopback/rest"
import { AUTH_SERVICE } from "../key"
import { AuthService } from "../services/auth.service"
import { IPassword, IUserPayload } from "../types"
import {
  PasswordRequestBody,
  ResetPasswordResponseSchema,
  UserLoginRequestBody,
  UserLoginResponseSchema,
  UserSignUpRequestBody,
  UserSignUpResponseSchema,
} from "./auth.docs"

@api({ basePath: "/auth" })
export class AuthController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(AUTH_SERVICE)
    public authService: AuthService,
  ) {}

  @post("/register")
  @response(200, UserSignUpResponseSchema)
  createUser(@requestBody(UserSignUpRequestBody) user: IUserPayload) {
    return this.authService.register(user)
  }

  @post("/login")
  @response(200, UserLoginResponseSchema)
  loginUser(@requestBody(UserLoginRequestBody) user: IUserPayload) {
    return this.authService.login(user)
  }
  @post("/reset-password")
  @response(200, ResetPasswordResponseSchema)
  resetPassword() {
    return this.authService.resetPassword()
  }

  @post("/update-password")
  @response(200, ResetPasswordResponseSchema)
  updatePassword(@requestBody(PasswordRequestBody) user: IPassword) {
    return this.authService.updatePassword(user)
  }
}
