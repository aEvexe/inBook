import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../helpers/addMinutes";
import { decode, encode } from "../helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly botService: BotService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("NOt matching password");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });
    //sendMail
    return newUser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("activate link not found");
    }

    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException("user already activated");
    }
    return {
      message: "user activated succesfully",
      is_active: updatedUser[1][0].is_active,
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return updatedUser;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Frist register for bot");
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const dbOtp = await this.otpModel.create({
      otp,
      expiration_time,
      phone_number,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: dbOtp.id,
    }

    const encodedData = await encode(JSON.stringify(details))

    return {
      message: "OTP send to bot",
      verification_key: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto){
    const {phone, verification_key, otp} = verifyOtpDto;
    const decodedData = await decode(verification_key)
    const details = JSON.parse(decodedData)
    
    if(details.phone_number != phone){
      throw new BadRequestException("Otp bu telefon raqamga yuborilmagan")
    }

    const resultOtp = await this.otpModel.findOne({where: {id: details.otp_id}})

    if(resultOtp == null){
      throw new BadRequestException("Bunday otp mavjud emas")
    }

    if(resultOtp.verified){
      throw new BadRequestException("Bu Otp avval tekshirilgan")
    }

    if(resultOtp.expiration_time < new Date()){
      throw new BadRequestException("Bu Otpning vaqti otib ketgan")
    }

    if(otp != resultOtp.otp){
      throw new BadRequestException("Bu Otp mos emas")
    }

    const user = await this.userModel.update(
      {
        is_premium: true,
      },
      {
        where: {phone},
        returning: true
      }
      )

      if(!user[1][0]){
        throw new BadRequestException("Bunday foydanaluvchi yoq")
      }

      resultOtp.verified = true
      await resultOtp.save()
      return {
        message: "Siz premium user boldingiz",
        user: user[1][0]
      }
  }
}
