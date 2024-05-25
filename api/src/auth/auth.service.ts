import { Injectable } from "@nestjs/common";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail({ where: { email } });
  }
}