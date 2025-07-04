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
import { BookService } from "./book.service";

@Update()
export class BookUpdate {
  constructor(private readonly bookService: BookService) {}
  
  @Hears("Kitob")
  async onHearsLibrary(@Ctx() ctx: Context){
    await this.bookService.onBook(ctx)
  }

  @Hears("Yangi kitob qoshish")
  async addNewLibrary(@Ctx() ctx: Context){
    await this.bookService.addNewBook(ctx)
  }

//   @Hears("Barcha kutubxonalar")
//   async allLibrary(@Ctx() ctx: Context){
//     await this.bookService.allBook(ctx)
//   }

//   @Action(/^dellib_+\d+$/)
//   async delLibrary(@Ctx() ctx: Context){
//     await this.bookService.delLibrary(ctx)
//   }

//   @Action(/^loclib_+\d+$/)
//   async locLibrary(@Ctx() ctx: Context){
//     await this.libraryService.locLibrary(ctx)
//   }
}
