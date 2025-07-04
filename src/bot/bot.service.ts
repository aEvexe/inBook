import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Library } from "./models/library.model";
import { Op } from "sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Library) private LibraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Please send <b>phone number☎️</b> to active your account`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("phone number☎️")],
            ]).resize(),
          }
        );
      } else if (!user.status) {
        await ctx.replyWithHTML(
          `Please send <b>phone number☎️</b> to active your account`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("phone number☎️")],
            ]).resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          `This Bot gives opportunity ti find books for premium users of inBook`,
          {
            ...Markup.keyboard([["Kutubhona", "Kitob"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on start`, error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Please press <b>Start</b>`, {
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else if (ctx.message.contact.user_id != user_id) {
          await ctx.replyWithHTML(
            `Please send your <b>phone number☎️</b> to active your account`,
            {
              ...Markup.keyboard([
                [Markup.button.contactRequest("phone number☎️")],
              ]).resize(),
            }
          );
        } else {
          let phone = ctx.message.contact.phone_number;
          phone = phone[0] != "+" ? "+" + phone : phone;
          user.phone_number = phone;
          user.status = true;
          await user.save();

          await ctx.replyWithHTML(
            `This Bot gives opportunity ti find books for premium users of inBook`,
            {
              ...Markup.removeKeyboard(),
            }
          );
        }
      }
    } catch (error) {
      console.log(`Error on contact: `, error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`You are not registered before`, {
          ...Markup.removeKeyboard(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();

        await this.bot.telegram.sendChatAction(user.user_id, "typing");

        await ctx.replyWithHTML(
          `U logged out temperarily to acitve again pres <b>Start</b>`,
          {
            ...Markup.keyboard([["/start"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Stop`, error);
    }
  }

  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }

      await this.bot.telegram.sendMessage(user.user_id, `verify code: ${OTP}`);

      return true;
    } catch (error) {
      console.log(`Error on otp`, error);
    }
  }

  async onText(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Please press <b>Start</b>`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        if ("text" in ctx.message!) {
          const library = await this.LibraryModel.findOne({
            where: { user_id, last_state: { [Op.ne]: "finish" } },
          });

          if (library) {
            const userInputText = ctx.message.text;
            switch (library.last_state) {
              case "name":
                library.name = userInputText;
                library.last_state = "address";
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini kiriting: ");
                break;

              case "address":
                library.address = userInputText;
                library.last_state = "location";
                await library.save();
                await ctx.replyWithHTML("Kutubxona locatsiasini yuboring: ", {
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("Manzil tanla")],
                  ]).resize(),
                });
                break;

              case "phone_number":
                library.phone_number = userInputText;
                library.last_state = "finish";
                await library.save();
                await ctx.replyWithHTML("Yango kutubxona qoshildi ", {
                  ...Markup.keyboard([
                    ["Yangi kutubxona qoshish", "Barcha kutubxonalar"],
                  ]).resize(),
                });
                break;
            }
          }


          
        }
      }
    } catch (error) {
      console.log(`Error on Text`, error);
    }
  }

  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Please press <b>Start</b>`, {
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else {
          const library = await this.LibraryModel.findOne({
            where: { user_id, last_state: "location" },
          });
          if (library) {
            library.location =
              ctx.message.location.latitude +
              "|" +
              ctx.message.location.longitude;
            library.last_state = "phone_number";
            await library.save();
            await ctx.replyWithHTML(
              "Kutubxona telefonini kiriting(masalan: 991234567):",
              {
                ...Markup.removeKeyboard(),
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(`Error on Location`, error);
    }
  }
}
