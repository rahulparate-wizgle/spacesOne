require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
var AWS = require('aws-sdk');

const bucket = 'wt-vp';// process.env.AWS_S3_BUCKETNAME;
const region ="ap-northeast-1";// process.env.AWS_S3_REGION;
const accessKeyId = "AKIAZSUATQL7CVQDORE3";// process.env.AWS_S3_ACCESSKEYID;
const secretAccessKey ="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";// process.env.AWS_S3_SECRETKEY;
const endpoint = "s3://arn:aws:s3:ap-northeast-1:658473452286:accesspoint/wt-vp/assets/"// process.env.S3_ENDPOINT;
const awsS3BaseUrl = 'https://wt-vp.s3.ap-northeast-1.amazonaws.com/'
AWS.config.update({ accessKeyId: accessKeyId,
secretAccessKey: secretAccessKey,
region: region});

// uploads a file to s3
async function uploadFile(file: any,path:string = "",name:string = "") {
  const fileStream = fs.createReadStream(file.path);
  if(!path){
    path = "common/";
  }
  if(!name){
    name = makeName(5);
    name += '.'+file.mimetype.split('/')[1];
  }
  try {
    const uploadParams = {
      Bucket: bucket,
      Body: fileStream,
      Key: path+ name,
    };
    let uploadPromise = await new AWS.S3().putObject(uploadParams).promise();
    return {
      isSuccess:true,
      url:awsS3BaseUrl+path+name
    } ;
  } catch (error) {
    return {
      isSuccess:false,
      message:JSON.stringify(error)
    } ;
  }
}

// uploads a file to s3
async function getAllFile() {
  try {
    const params = {
      Bucket: bucket,
      Delimiter: '',
      Prefix: '' 
    };
    await new AWS.S3().listObjects(params, function (err:any, data:any) {
      if(err)throw err;
      console.log( JSON.stringify(data));
      return data;
    });
    
  } catch (error) {
    return {
      isSuccess:false,
      message:JSON.stringify(error)
    } ;
  }
}


// uploads a file to s3
async function deleteFile(path:string) {
  try {
    const deleteParams = {
      Bucket: bucket,
      Key: path,
    };
    let deletePromise = await new AWS.S3().deleteObject(deleteParams).promise();
    return {
      isSuccess:true,
      deletePromise
    } ;
  } catch (error) {
    return {
      isSuccess:false,
      message:JSON.stringify(error)
    } ;
  }
}


function makeName(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.awsS3BaseUrl = awsS3BaseUrl;
