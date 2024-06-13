import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ApiProperty({ description: "The user's email" })
  email: string

  @IsOptional()
  @ApiProperty({ description: "The user's name" })
  name: string

  @IsOptional()
  @ApiProperty({ description: "The user's password" })
  password: string
}
