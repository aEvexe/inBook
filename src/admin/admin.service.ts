import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { BadRequestException} from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from 'src/admin/models/admin.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin,
  ){}

  async create(createAdminDto: CreateAdminDto) {
    const {password, confirm_password} = createAdminDto
    if(password !== confirm_password) {
      throw new BadRequestException("NOt matching password");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({...createAdminDto, password: hashed_password});
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

    async getUserByEmail(email: string) {
    const user = await this.adminModel.findOne({
      where: { email },
      include: {
        all: true
      },
    });

    return user?.dataValues
  }

  findUserByEmail(email: string) {
    return this.adminModel.findOne({where: {email}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}});
  }
}
