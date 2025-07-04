import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Book } from "../models/book.model";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Book) private bookModel: typeof Book,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}
  async onBook(ctx: Context) {
    try {
        await ctx.replyWithHTML("Kerakli menuni tanlang:", {
      ...Markup.keyboard([["Yangi kitob qoshish", "Barcha kitoblar"]]).resize(),
    });
    } catch (error) {
        console.log("Error on onBook", error)
    }
  }

  async addNewBook(ctx: Context){
    try {
        const user_id =ctx.from?.id
        const user = this.botModel.findByPk(user_id)

        if(!user){
            await ctx.replyWithHTML(`Please press <b>Start</b>`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
        }

        await this.bookModel.create({
            user_id: user_id!,
            last_state: "name"
        })

        await ctx.replyWithHTML("Yangi kitob nomini kiriting: ", {
        ...Markup.removeKeyboard,
      });
    } catch (error) {
        console.log("Error on addNewBook", error)
    }
  }
}
