// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { JwtModule } from '@nestjs/jwt';
import { DaoModule } from './dao/dao.module'; // Import DaoModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the configuration accessible globally
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI || 'mongodb://localhost:27017/default_db'),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    DaoModule, // Add DaoModule to imports
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}