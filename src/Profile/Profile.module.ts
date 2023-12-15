import { Module } from "@nestjs/common";
import { ProfileController } from "./Profile.controller";
import { ProfileService } from "./Profile.service";
import { PrismaService } from "src/prisma.service";

@Module({
     controllers: [ProfileController],
     providers: [ProfileService, PrismaService]
})
export class ProfileModule{}

