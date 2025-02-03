import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/entites/user.entity';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: User })
  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto): Promise<User> {
    return this.authService.registration(registrationDto);
  }

  @ApiResponse({ type: User })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
