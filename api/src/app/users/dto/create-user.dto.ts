import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string

  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      'The password must contain uppercase and lowercase letters, numbers and special characters.',
  })
  @ApiProperty({ description: 'The password of the user' })
  password: string
}
