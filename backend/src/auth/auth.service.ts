import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RefreshTokenDto } from '../common/dto/auth.dto';
import { CreateUserDto } from '../common/dto/user.dto';
import { JwtPayload } from '../common/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return null;
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = { id: user.id, email: user.email, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      token_type: 'bearer',
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      user_role: user.role,
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      
      const payload: JwtPayload = { id: user.id, email: user.email, role: user.role };
      
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        token_type: 'bearer',
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        user_role: user.role,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refresh_token);
      const user = await this.usersService.findOne(payload.id);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload: JwtPayload = { id: user.id, email: user.email, role: user.role };
      
      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string) {
    return this.usersService.findOne(userId);
  }

  async updateProfile(userId: string, updateData: any) {
    return this.usersService.update(userId, updateData);
  }
}