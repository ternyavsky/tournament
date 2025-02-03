import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/user.entity';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(
    login: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { login },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid login or password');
  }

  async registration(registrationDto: RegistrationDto): Promise<User> {
    const { email, password } = registrationDto;
    const user = this.usersRepository.create({
      email,
      password: await bcrypt.hash(password, 10),
    });
    return await this.usersRepository.save(user);
  }
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { login, password } = loginDto;
    const user = await this.validateUser(login, password);
    const payload = { login: user?.login, sub: user?._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
