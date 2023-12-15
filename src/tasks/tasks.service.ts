import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';

@Injectable()
export class TasksService {


async createCode(pInput: any): Promise<any> {
    // let appTempljsonPath: any = path.join('./dennnn', '.json');
    // console.log('s1 - ' + appTempljsonPath);
    // let app_template_json: any = await this.ReadFileAsJson(pInput);
    // console.log('s2 - ' + app_template_json);
    let app_template_com_fn_path: any = path.join(__dirname, '/schema.prisma');
    let ejs_convert: any = await this.CreateSchemaFile(
     // app_template_com_fn_path,
    //  'prisma',
      './appTemplate/index.ejs',
      pInput,
      './prisma/schema.prisma'
    );
     await this.createFile('./appTemplate/prisma.service.ejs','','./src/prisma.service.ts');
      let deletefile: any = await this.CreateDir(pInput);
    //   const { execSync } = require("child_process");    
    //   const cmd = 'npx prisma migrate dev';
    // execSync(cmd).toString();
    // const cmd1 = 'npm i @prisma/client@latest';
    // execSync(cmd1).toString();
      
    return pInput;
  }
  async CreateDir(strReadPath: JSON) {
    try {
     let jsondata:any = strReadPath
     let tables: any = JSON.parse(jsondata).dbObjects.objValues;
     let tablecount: any = tables.length;
    // console.log(tables);
     for(let i=0;i<tablecount; i++){
      let tabName: any = (tables[i].objName)
      await this.createFolder(tables[i].objName)
      let column: any = tables[i] 
      let condition: any = tables[i].objOps      
      await this.CreateSchemaFile('./appTemplate/model.ejs',JSON.stringify(column),'./src/'+ tabName+'/'+tabName+'.model.ts')
      await this.CreateSchemaFile('./appTemplate/controller.ejs',JSON.stringify(column),'./src/'+ tabName+'/'+tabName+'.controller.ts')
      await this.CreateSchemaFile('./appTemplate/serviceImpl.ejs',JSON.stringify(column),'./src/'+ tabName+'/'+tabName+'.service.ts')
      await this.CreateSchemaFile('./appTemplate/module.ejs',JSON.stringify(tabName),'./src/'+ tabName+'/'+tabName+'.module.ts')         
      await this.CreateSchemaFile('./appTemplate/appmodule.ejs',JSON.stringify(tabName),'./src/app.module.ts')         
       
    }
      return await(jsondata);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createFolder(foldername: string){
    let strroot_path: string = path.join('./src', foldername)
    fs.mkdirSync(strroot_path, { recursive: true });
    return await('success')
  }
  
  async CreateSchemaFile(template, data,path) {
    try {
      
      let objtemplate: any = await this.ReadFile(template);
      //console.log(objtemplate);
      let fn = ejs.compile(objtemplate);   
      let str = fn({
        data: JSON.parse(data),
      });
      // let str = fn(data);
      if (str != '') {
        // console.log(str);       
        fs.writeFileSync(path,str)
      }     
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createFile(template,data, path) {
    try {
      
      let objtemplate: any = await this.ReadFile(template);
      //console.log(objtemplate);
      let fn = ejs.compile(objtemplate);   
      let str = fn(data)
      if (str != '') {
        // console.log(str);       
        fs.writeFileSync(path,str)
      }     
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async ReadFile(strReadPath: any) {
    try {
      return await fs.readFileSync(strReadPath, 'utf8');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}