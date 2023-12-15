import { Prisma } from "@prisma/client";


export class Profile implements Prisma.ProfileCreateInput{
     
        id :number;     
        createdAt :Date;     
        updatedAt :Date;     
        title?:string;     
        content :string;     
        published :boolean;     
        authorId :number;     
}
    