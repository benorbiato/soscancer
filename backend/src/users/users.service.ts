import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from '../common/dto/user.dto';
import { User } from '../common/interfaces/user.interface';
import { UserRole } from '../common/enums/user-role.enum';
import * as fs from 'fs';
import * as path from 'path';

const USERS_DB_PATH = path.join(__dirname, '../../../data/users.json');

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const data = fs.readFileSync(USERS_DB_PATH, 'utf8');
      this.users = JSON.parse(data).users || [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn('users.json not found, initializing with empty array.');
        this.users = [];
        this.saveUsers();
      } else {
        console.error('Failed to load users from users.json:', error);
        this.users = [];
      }
    }
  }

  private saveUsers() {
    fs.writeFileSync(USERS_DB_PATH, JSON.stringify({ users: this.users }, null, 2), 'utf8');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      role: createUserDto.role || UserRole.USER,
      hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    this.saveUsers();
    
    const { hashedPassword: _, ...result } = newUser;
    return result as User;
  }

  async findAll(): Promise<User[]> {
    return this.users.map(user => {
      const { hashedPassword, ...rest } = user;
      return rest as User;
    });
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { hashedPassword, ...rest } = user;
    return rest as User;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = this.users[userIndex];
    let hashedPassword = user.hashedPassword;

    if (updateUserDto.password) {
      hashedPassword = await bcrypt.hash(updateUserDto.password, 12);
    }

    const updatedUser: User = {
      ...user,
      ...updateUserDto,
      hashedPassword,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    this.saveUsers();
    
    const { hashedPassword: _, ...result } = updatedUser;
    return result as User;
  }

  async remove(id: string): Promise<void> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    if (this.users.length === initialLength) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.saveUsers();
  }
}