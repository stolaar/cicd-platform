import { DataObject, repository } from "@loopback/repository"
import { UserRepository } from "../repositories/user.repository"
import { User } from "../models"
import { HttpErrors } from "@loopback/rest"
import { isEmpty } from "lodash"

export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async createUser(user: DataObject<User>) {
    const userExists = await this.checkIfUserExists(user?.email ?? "")

    if (userExists) {
      throw new HttpErrors.BadRequest(`${user.email} already exists`)
    }
    return this.userRepository.create({ ...user })
  }

  async getUsers() {
    return this.userRepository.find()
  }

  async getOneUser(userId: number) {
    return this.userRepository.findById(userId)
  }

  getFullUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async checkIfUserExists(email: string) {
    const userFromDb = await this.userRepository.findOne({
      where: {
        email,
      },
    })
    return !!userFromDb
  }

  async updateUser(userId: number, user: Partial<User>) {
    if (!isEmpty(user)) await this.userRepository.updateById(userId, user)
  }

  async deleteUser(userId: number) {
    return this.userRepository.deleteById(userId)
  }
}
