import { DataObject, repository } from "@loopback/repository"
import { UserRepository } from "../repositories/user.repository"
import { User } from "../models"

export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async createUser(user: DataObject<User>) {
    return this.userRepository.create(user)
  }

  async getUsers() {
    return this.userRepository.find()
  }
}
