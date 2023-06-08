import { inject } from "@loopback/core"
import {
  post,
  api,
  Request,
  response,
  RestBindings,
  getJsonSchemaRef,
  requestBody,
  get,
} from "@loopback/rest"
import { UserService } from "../services/user.service"
import { User } from "../models"
import { USERS_SERVICE } from "../keys"

@api({ basePath: "/users" })
export class UsersController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(USERS_SERVICE)
    public userService: UserService,
  ) {}

  @post("/")
  @response(200, {
    responses: {
      "200": {
        description: "User",
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  createUser(@requestBody() user: User): Promise<User> {
    return this.userService.createUser(user)
  }

  @get("/")
  @response(200, {
    responses: {
      "200": {
        description: "User",
        content: {
          type: "array",
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }
}
