import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common"
import { Request, Response } from "express";
import { ProfileService } from "./Profile.service"
import { Profile } from "./Profile.model";

@Controller('api/v1/Profile')
export class ProfileController{
    constructor(private readonly Profile_Service: ProfileService){}
    @Get()
    async getAllProfile(@Req() request:Request, @Res() response:Response ):Promise<any>{
         const result =  await this.Profile_Service.getAllProfile()
         return response.status(200).json({
              status: "Ok!",
              message: "Successfully fetch data!",
              result: result 
         })
    }

    @Post()
    async postProfile(@Body() postData: Profile):Promise<Profile>{
         return this.Profile_Service.createProfile(postData)
    }

    @Get(':id/:title/:content')
    async getProfile(@Param('id') id:number,@Param('title') title: string,@Param('content') content: string):Promise<Profile | null>{
         return this.Profile_Service.getProfile(id,title,content)
    }   
      

    @Delete(':id/:title')
    async deleteProfile(@Param('id') id:number,@Param('title') title: string):Promise<Profile>{
         return this.Profile_Service.deleteProfile(id,title)
    }

    @Put(':id/:title')
    async updateProfile(@Param('id') id:number,@Param('title') title: string,@Body() data: Profile): Promise<Profile> {
      return this.Profile_Service.updateProfile(id,title,data);
    }
}

