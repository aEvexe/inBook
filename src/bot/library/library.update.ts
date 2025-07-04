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
import { LibraryService } from "./library.service";

@Update()
export class LibraryUpdate {
  constructor(private readonly libraryService: LibraryService) {}
  
  @Hears("Kutubhona")
  async onHearsLibrary(@Ctx() ctx: Context){
    await this.libraryService.onLibrary(ctx)
  }

  @Hears("Yangi kutubxona qoshish")
  async addNewLibrary(@Ctx() ctx: Context){
    await this.libraryService.addNewLibrary(ctx)
  }

  @Hears("Barcha kutubxonalar")
  async allLibrary(@Ctx() ctx: Context){
    await this.libraryService.allLibrary(ctx)
  }

  @Action(/^dellib_+\d+$/)
  async delLibrary(@Ctx() ctx: Context){
    await this.libraryService.delLibrary(ctx)
  }

  @Action(/^loclib_+\d+$/)
  async locLibrary(@Ctx() ctx: Context){
    await this.libraryService.locLibrary(ctx)
  }
}
