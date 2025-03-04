// src/dao/dao.module.ts
import { Module } from '@nestjs/common';
import { DaoController } from './dao.controller';
import { DaoService } from './dao.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dao, DaoSchema } from './schemas/dao.schema'; // Import the Dao schema
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Dao.name, schema: DaoSchema }]), // If you are saving DAO data in MongoDB
        ConfigModule // Import the config module to use environment variables
    ],
    controllers: [DaoController],
    providers: [DaoService],
    exports: [DaoService], // Export DaoService for use in other modules
})
export class DaoModule {}