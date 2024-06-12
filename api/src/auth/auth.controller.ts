import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const jwtCode = await this.authService.login(req.user)
    res.cookie('access_token', jwtCode.access_token, { httpOnly: true })
    res.cookie('refresh_token', jwtCode.refresh_token, { httpOnly: true })
    return res.json({ message: 'Login successful' })
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('refresh')
  async refreshToken(@Request() req, @Res() res: Response) {
    const jwtCode = await this.authService.refreshToken(req.user)
    res.cookie('access_token', jwtCode.access_token, { httpOnly: true })
    res.cookie('refresh_token', jwtCode.refresh_token, { httpOnly: true })
    return res.json({ message: 'Token successfully updated' })
  }
}
