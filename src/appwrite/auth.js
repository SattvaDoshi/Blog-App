import conf from "../config/conf";
import {Client,Account,ID} from "appwrite"

export class Authservice{
    client = new Client;
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client);
    }

    async CreateAccount({email,password,name}){
        try {
           const userAcc= await this.account.CreateAccount(ID.unique,email,password,name)

           if(userAcc) return this.Login({email,password})
           else userAcc;


        } catch (error) {
            throw error
        }
    }

    async Login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
            
        } catch (error) {
            throw error
        }
    }

    async currentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }

}

const authservice = new Authservice();

export default authservice;