import { ReadStream } from "fs";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import aws from "aws-sdk";

aws.config.update({
    region : process.env.AWS_DEFAULT_REGION,
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

export default class AWSApi{

    s3 = new aws.S3({apiVersion : '2006-03-01'});

    async upload(key:  string, createReadStream : () => ReadStream){
        const fileStream = createReadStream();
    
        const uploadParams : PutObjectRequest = {
            Bucket : process.env.AWS_S3_BUCKET_NAME!,
            Key: key, 
            Body : fileStream
        }
    
        const {Location} = await this.s3.upload(uploadParams).promise()
    
        return {
            url : Location
        };
    }

    async deleteFile(key: string){
        const bucketParams : PutObjectRequest = {
            Bucket : process.env.AWS_S3_BUCKET_NAME!,
            Key : key
        }

        const result = await this.s3.deleteObject(bucketParams).promise()
        if(!result.DeleteMarker){
            return false;
        }
        return true;
    }

}