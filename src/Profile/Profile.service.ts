import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { Profile } from "./Profile.model"

@Injectable()
export class ProfileService{
     constructor(private prisma: PrismaService){}    

     async updateProfile(id:number,title: string,data:Profile):Promise<Profile>{
          return this.prisma.profile.update({
                    where: {id:Number(id),title: String(title)},
                    data:{content: data.content,published: data.published,authorId: data.authorId}
              
          })
     }

     async createProfile(data: Profile): Promise<Profile>{
        return this.prisma.profile.create({
             data,
        })
     }

     async getAllProfile(): Promise<Profile[]>{
        return this.prisma.profile.findMany()
     }

     async getProfile(id:number,title: string,content: string): Promise<Profile | null>{
          return this.prisma.profile.findUnique({
               where: {id:Number(id),title: String(title),content: String(content)}
          })
     }

     async deleteProfile(id:number,title: string):Promise<Profile>{
     return this.prisma.profile.delete({
          where:{id:Number(id),title: String(title)}
     })
}

}
    
   