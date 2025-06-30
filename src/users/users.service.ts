import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User){}
  async create(createUserDto: CreateUserDto) {
    const {password, confirm_password} = createUserDto
    if(password !== confirm_password) {
      throw new BadRequestException("NOt matching password");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({...createUserDto, password: hashed_password})
    //sendMail
    return newUser
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({where: {email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.userModel.destroy({where:{id}});
  }

  async activateUser(link:string){
    if(!link){
      throw new BadRequestException("activate link not found");
    }

    const updatedUser = await this.userModel.update(
      {is_active: true},
      {
        where: {
          activation_link: link,
          is_active: false
        },
        returning: true,
      }
    )
    if(!updatedUser[1][0]){
      throw new BadRequestException("user already activated")
    }
    return {
      message: "user activated succesfully",
      is_active: updatedUser[1][0].is_active
    }
  }

  async updateRefreshToken(id: number, refresh_token: string){
    const updatedUser = await this.userModel.update(
      {refresh_token},
      {
        where: {id},
      }
    )
    return updatedUser
  }
}