import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      "The password must contain uppercase and lowercase letters, numbers and special characters.",
  })
  password: string;
}
