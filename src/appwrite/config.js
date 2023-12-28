import conf from "../config/conf";
import { Client, Account, ID, Storage, Databases, Query } from "appwrite"

export class Service {
    clinet = new Client();
    database;
    bucket;



    constructor() {
        this.clinet
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.clinet);
        this.bucket = new Storage(this.clinet);
    }

    async createPost({ title, slug, content, featuredimg, status, userid }) {
        try {
            return this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug),
            {
                title,
                content,
                featuredimg,
                status,
                userid
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug, { title, content, featuredimg, status }) {
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug),
            {
                title,
                content,
                featuredimg,
                status
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPosts(queries =[Query.equal("status","active")]){
        try {
            return await this.database.getDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async uploadFile(file){
        try {
          return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)  
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileID)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileID)
    }

}

const service = new Service()

export default service;