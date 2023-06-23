import { inject } from "@loopback/core"
import {
  api,
  put,
  Request,
  requestBody,
  response,
  RestBindings,
} from "@loopback/rest"
import { UserService } from "../services/user.service"
import { USERS_SERVICE } from "../keys"
import { UserResponseSchema, UserUpdateRequestBody } from "./users.docs"
import { authenticate } from "@loopback/authentication"
import { User } from "../models"
import { SecurityBindings, securityId, UserProfile } from "@loopback/security"

@api({ basePath: "/users" })
export class UsersController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(USERS_SERVICE)
    public userService: UserService,
    @inject(SecurityBindings.USER)
    private userProfile: UserProfile,
  ) {}

  @authenticate("jwt")
  @put("/")
  @response(200, UserResponseSchema)
  updateUser(@requestBody(UserUpdateRequestBody) user: Partial<User>) {
    return this.userService.updateUser(
      Number.parseInt(this.userProfile[securityId as keyof UserProfile]),
      user,
    )
  }
}
