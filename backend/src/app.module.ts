import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StaffModule } from './staff/staff.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { CategoriesModule } from './categories/categories.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://qw:${process.env.MONGO_PASSWORD}@cluster0.3h6h4.mongodb.net`,
      // synchronize: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      entities: [__dirname + '/entities/*.ts'],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', '/client/build'),
    }),
    ProductsModule,
    StaffModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    NewsletterModule,
  ],
})
export class AppModule {}
