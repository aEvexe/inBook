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

@Module({
  imports: [
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
      models: [User, Admin, Genre, Languages, Author, Categories],
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
  ],
})
export class AppModule {}
