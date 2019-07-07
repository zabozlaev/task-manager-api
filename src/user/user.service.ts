import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import {
  Repository,
  FindManyOptions,
  UpdateManyOptions,
  FindOneOptions,
} from 'typeorm';
import { CreateUserDto } from './dtos/createUser';
import { UpdateUserDto } from './dtos/updateUser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: CreateUserDto) {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findOne(options: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }

  async me(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'email', 'createdAt'],
    });
    return user;
  }

  async listUsers(options: FindManyOptions<UserEntity> = { where: {} }) {
    return await this.userRepository.find({
      ...options,
      select: ['id', 'name', 'createdAt'],
    });
  }

  async deleteUserById(id: string) {
    return await this.userRepository.delete({
      id,
    });
  }

  async update(id: string, data: UpdateUserDto = {}) {
    return await this.userRepository.update(
      {
        id,
      },
      data,
    );
  }
}
