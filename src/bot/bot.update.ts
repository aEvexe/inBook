import { BotService } from "./bot.service";
import {
  Update,
  Start,
  Ctx,
  On,
  Hears,
  Command,
  Action,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    ctx.reply("Salom");
  }

  @On("photo")
  async onPhoto(@Ctx() ctx: Context) {
    if ("photo" in ctx.message!) {
      console.log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
      );
    }
  }

  @On("video")
  async onVideo(@Ctx() ctx: Context) {
    if ("video" in ctx.message!) {
      console.log(ctx.message.video);
      await ctx.reply(String(ctx.message.video.file_name));
    }
  }

  @On("sticker")
  async onSticker(@Ctx() ctx: Context) {
    if ("sticker" in ctx.message!) {
      console.log(ctx.message.sticker);
      await ctx.replyWithSticker(ctx.message.sticker.file_id);
    }
  }

  @On("animation")
  async onAnimation(@Ctx() ctx: Context) {
    if ("animation" in ctx.message!) {
      // console.log(ctx.message.animation);
      await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
    }
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    if ("contact" in ctx.message!) {
      // console.log(ctx.message.animation);
      await ctx.reply(String(ctx.message.contact.phone_number));
      await ctx.reply(String(ctx.message.contact.first_name));
      await ctx.reply(String(ctx.message.contact.last_name));
      await ctx.reply(String(ctx.message.contact.user_id));
    }
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    if ("location" in ctx.message!) {
      // console.log(ctx.message.animation);
      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
      await ctx.replyWithLocation(
        ctx.message.location.latitude,
        ctx.message.location.longitude
      );
    }
  }

  @On("voice")
  async onVoice(@Ctx() ctx: Context) {
    if ("voice" in ctx.message!) {
      console.log(ctx.message.voice);
      await ctx.reply(String(ctx.message.voice.duration));
    }
  }

  @On("document")
  async onDocument(@Ctx() ctx: Context) {
    if ("document" in ctx.message!) {
      console.log(ctx.message.document);
      await ctx.replyWithDocument(String(ctx.message.document.file_id));
    }
  }

  @Hears("hi")
  async onHearsHi(@Ctx() ctx: Context) {
    await ctx.replyWithHTML("hey whatsup");
  }

  @Command("help")
  async onCommandHelp(@Ctx() ctx: Context) {
    await ctx.replyWithHTML("help u later");
  }

  @Command("inline")
  async onCommandInline1(@Ctx() ctx: Context) {
    const inlineKeyboards = [
      [
        {
          text: "Product-1",
          callback_data: "product-1",
        },
        {
          text: "Product-2",
          callback_data: "product-2",
        },
        {
          text: "Product-3",
          callback_data: "product-3",
        },
      ],
      [
        {
          text: "Product-4",
          callback_data: "product-4",
        },
        {
          text: "Product-5",
          callback_data: "product-5",
        },
      ],
      [
        {
          text: "Product-6",
          callback_data: "product-6",
        },
      ],
    ];

    await ctx.reply("Choose needed Product:", {
      reply_markup: {
        inline_keyboard: inlineKeyboards,
      },
    });
  }

  @Action("product-1")
  async onActInPro1(@Ctx() ctx: Context) {
    await ctx.replyWithHTML("product 1 tanlandi");
  }

  @Action(/product-\d+/)
  async onActInPro(@Ctx() ctx: Context) {
    if ("data" in ctx.callbackQuery!) {
      const data = ctx.callbackQuery?.data;
      const productId = data.split("-")[1];
      await ctx.replyWithHTML(`${productId} product tanlandida`);
    }
  }

  @Command("main")
  async onCommandMain(@Ctx() ctx: Context) {
    await ctx.replyWithHTML("kerakli main button tanla:", {
      ...Markup.keyboard([
        ["Bir"],
        ["Ikki", "Uch"],
        ["tort", "besh", "olti"],
        [Markup.button.contactRequest("Telefon raqamingizni yuboring")],
        [Markup.button.locationRequest("locationni yuboring")],
      ])
        .resize()
        .oneTime(),
    });
  }

  @Hears("Bir")
  async onHearsBir(@Ctx() ctx: Context) {
    await ctx.replyWithHTML("hey whatsup");
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    if ("text" in ctx.message!) {
      if (ctx.message.text == "hi") {
        ctx.replyWithHTML(`<b>Hello</b>`);
      } else {
        ctx.replyWithHTML(ctx.message.text);
      }
    }
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
}
