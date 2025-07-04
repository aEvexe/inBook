import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Library } from "../models/library.model";

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Library) private libraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onLibrary(ctx: Context) {
    try {
      await ctx.replyWithHTML("Kerakli menuni tanlang: ", {
        ...Markup.keyboard([
          ["Yangi kutubxona qoshish", "Barcha kutubxonalar"],
        ]).resize(),
      });
    } catch (error) {
      console.log("Error on Library", error);
    }
  }

  async addNewLibrary(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Please press <b>Start</b>`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
      }

      await this.libraryModel.create({
        user_id: user_id!,
        last_state: "name",
      });

      await ctx.replyWithHTML("Yangi kutubxona nomini kiriting: ", {
        ...Markup.removeKeyboard,
      });
    } catch (error) {
      console.log("Error in adding new library", error);
    }
  }

  async allLibrary(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Please press <b>Start</b>`, {
          ...Markup.keyboard([["/start"]]).resize(),
        }); 
      } else {
        const librareies = await this.libraryModel.findAll({
          where: { last_state: "finish" },
        });

        if (librareies.length == 0) {
          await ctx.replyWithHTML("Kerakli menuni tanlang: ", {
            ...Markup.keyboard([
              ["Yangi kutubxona qoshish", "Barcha kutubxonalar"],
            ]).resize(),
          });
        } else {
          librareies.forEach(async (librareies) => {
            await ctx.replyWithHTML(
              `<b>nomi: </b>${librareies.name}\n<b>addressi: </b>${librareies.address}\n<b>telefoni: </b>${librareies.phone_number}\n`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "Kutubxona lokatsiaysi",
                        callback_data: `loclib_${librareies.id}`,
                      },
                      {
                        text: "Kutubxonani ochirish",
                        callback_data: `dellib_${librareies.id}`,
                      },
                    ],
                  ],
                },
              }
            );
          });
        }
      }
    } catch (error) {
      console.log("Error on allLibrary", error);
    }
  }

  async delLibrary(ctx: Context){
    try {
      const contextAction = ctx.callbackQuery!["data"]
      const lib_id = contextAction.split("_")[1]

      await this.libraryModel.destroy({where: {id: lib_id}})
      // await ctx.replyWithHTML("kutubxona ochirildi", {
      //       ...Markup.keyboard([
      //         ["Yangi kutubxona qoshish", "Barcha kutubxonalar"],
      //       ]).resize(),
      //     });
      await ctx.editMessageText("kutubxona ochirildi")
    } catch (error) {
      console.log("Error on delLibrary", error)
    }
  }

  async locLibrary(ctx: Context){
    try {
      const contextAction = ctx.callbackQuery!["data"]
      const lib_id = contextAction.split("_")[1]

      const contextMessage = ctx.callbackQuery!["message"];
      console.log(contextMessage)
      await ctx.deleteMessage(contextMessage?.message_id);

      const library = await this.libraryModel.findByPk(lib_id)
      await ctx.replyWithLocation(Number(library?.location.split("|")[0]), Number(library?.location.split("|")[1]))
    } catch (error) {
      console.log("Error on locLibrary", error)
    }
  }
}
