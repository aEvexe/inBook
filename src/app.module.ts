import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from './users/users.module';
import { User } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/models/admin.model";
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from "./genre/models/genre.model";
import { LanguagesModule } from './languages/languages.module';
import { Languages } from "./languages/models/language.model";
import { AuthorsModule } from './authors/authors.module';
import { Author } from "./authors/models/author.model";
import { CategoriesModule } from './categories/categories.module';
import { Categories } from "./categories/models/category.model";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from './bot/bot.module';
import { BookModule } from './book/book.module';
import { Book } from "./book/models/book.model";
import { BookVersionModule } from './book-version/book-version.module';
import { BookVersion } from "./book-version/models/book-version.model";
import { AudioBookModule } from './audio-book/audio-book.module';
import { AudioBooks } from "./audio-book/models/audio-book.model";
import { AudioPartsModule } from './audio-parts/audio-parts.module';
import { AudioParts } from "./audio-parts/models/audio-part.model";
import { Bot } from "./bot/models/bot.model";
import { Library } from "./bot/models/library.model";
import { SubscribtionModule } from './subscribtion/subscribtion.module';
import { Subscription } from "./subscribtion/models/subscribtion.model";
import { CollectionModule } from './collections/collections.module';
import { Collection } from "./collections/models/collection.model";
import { BookCollectionModule } from './book-collection/book-collection.module';
import { BookCollection } from "./book-collection/models/book-collection.model";
import { BookmarkModule } from './book-marks/book-marks.module';
import { Bookmark } from "./book-marks/models/book-mark.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),

    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "static") }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Admin, Genre, Languages, Author, Categories, Book, BookVersion, AudioBooks, AudioParts, Bot, Library, Subscription, Collection, BookCollection, Bookmark],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),

    UsersModule,

    AuthModule,

    AdminModule,

    AdminAuthModule,

    GenreModule,

    LanguagesModule,

    AuthorsModule,

    CategoriesModule,

    BotModule,

    BookModule,

    BookVersionModule,

    AudioBookModule,

    AudioPartsModule,

    SubscribtionModule,

    CollectionModule,

    BookCollectionModule,

    BookmarkModule,

  ],
})
export class AppModule {}
