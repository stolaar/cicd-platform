import { inject } from "@loopback/core"
import { USERS_SERVICE } from "../../users/keys"
import { UserService } from "../../users/services/user.service"
import { IPassword, IUserPayload } from "../types"
import { compare, genSalt, hash } from "bcryptjs"
import { HttpErrors } from "@loopback/rest"
import { TokenServiceBindings } from "@loopback/authentication-jwt"
import { TokenService } from "@loopback/authentication"
import { securityId } from "@loopback/security"

export class AuthService {
  constructor(
    @inject(USERS_SERVICE)
    private readonly userService: UserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  async hashPassword(password: string) {
    const salt = await genSalt(15)
    return await hash(password, salt)
  }

  async comparePassword(password: string, hashPassword: string) {
    return await compare(password, hashPassword)
  }

  async register(user: IUserPayload) {
    const hashPassword = await this.hashPassword(user.password)

    return this.userService.createUser({
      ...user,
      password: hashPassword,
    })
  }

  async login(user: IUserPayload) {
    const userFromDb = await this.userService.getFullUserByEmail(user?.email)

    if (!userFromDb) {
      throw new HttpErrors.BadRequest("Invalid Credentials.")
    }

    const compare = await this.comparePassword(
      user.password,
      userFromDb?.password ?? "",
    )

    if (!compare) {
      throw new HttpErrors.BadRequest("Invalid Credentials.")
    }

    const payload = {
      email: user.email,
      [securityId]: userFromDb.id.toString(),
    }
    const accessToken = await this.jwtService.generateToken(payload)

    return { accessToken, user: userFromDb }
  }

  async resetPassword() {
    // Todo: implement
  }

  async updatePassword(user: IPassword) {
    const userFromDB = await this.userService.getFullUserByEmail(user.email)
    const hashPassword = await this.hashPassword(user.password)

    return await this.userService.updateUser(userFromDB?.id ?? 0, {
      password: hashPassword,
    })
  }
}
