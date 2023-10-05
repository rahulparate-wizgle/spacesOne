import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  get,
  post,
  requestBody,
  param,
  Request,
  Response,
  response,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';

import multer from 'multer';
import AuthACL from '../config/auth/AuthACL';

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const upload = multer({dest: 'uploads/'});
const {uploadFile, deleteFile,getAllFile} = require('../providers/awss3/s3');

const AuthorizeAcl = new AuthACL({
  resource_name: 'MediaStorage',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();

export class MediaStorageController {
  constructor() {}


  @get('/media/delete/{key}')
  @response(200, {
    description: 'Delete media',
  })
  async delete(@param.path.string('key') key: string): Promise<object> {
    const readStream = deleteFile(decodeURIComponent(key));
    return readStream;
  }

  @get('/media/getall')
  @response(200, {
    description: 'Delete media',
  })
  async getAll(): Promise<object> {
    const readStream = getAllFile();
    return readStream;
  }


  @post('/media/upload', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    },
  })
  async upload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {      
      upload.single('file')(request, response, async (err: any) => {
        if (err) reject(err);
        else {
          if (request.file == undefined) {
            throw new HttpErrors[422]('Please select file to upload.');
          }
          const file = request.file;
          const result = await uploadFile(file);
          resolve(result);
          return result;
        }
      });
    });
  }
}
