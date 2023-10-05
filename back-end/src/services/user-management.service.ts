import { UserCredentialsRepository } from './../repositories/user-credentials.repository';
import  emailjs  from '@emailjs/nodejs';
import { EmailJSConst } from './constant';
import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings} from '../keys';
import {User, UserWithPassword} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {PasswordHasher} from './hash.password.bcryptjs';

export class UserManagementService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const {username, password} = credentials;
    const invalidCredentialsError = 'Invalid username or password.';

    if (!username) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {username},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }
  getRoleByDesignationId(designationId: number): string {
    switch (designationId) {
      case 1:
        return 'director';
        break;

      case 2:
        return 'admin';
        break;

      case 3:
        return 'mainPLHead';
        break;

      case 4:
        return 'subPLHead';
        break;

      case 5:
        return 'salesHead';
        break;

      case 6:
        return 'salesManager';
        break;

      case 7:
        return 'keyAccountManager';
        break;

      case 8:
        return 'financeHead';
        break;

      case 9:
        return 'financeUser';
        break;

      case 10:
        return 'researchManager';
        break;

      case 11:
        return 'researchAnalyst';
        break;
      case 12:
        return 'compliance';
        break;

      default:
        return 'admin';
        break;
    }
  }
  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.firstName) userName = `${user.firstName}`;
    if (user.lastName)
      userName = user.firstName
        ? `${userName} ${user.lastName}`
        : `${user.lastName}`;
    return {
      [securityId]: user.id,
      name: userName,
      id: user.id,
      roles: user.roles,
    };
  }

  async updateUser(userId: string, data: object) {
    const updateUser = await this.userRepository.updateById(userId, data);
    return updateUser;
  }

  async updatePassword(userId: string, newpassword: string)
  {
    const password = await this.passwordHasher.hashPassword(
      newpassword,
    );
   
    const userCredential: any= await this.userCredentialsRepository.findOne({where: {userId: userId }})
    
    userCredential.password = password;
    const updateUserCred = await this.userCredentialsRepository.update(userCredential);
    
    return updateUserCred;
  }

  
  async createUser(userWithPassword: UserWithPassword): Promise<User> {
    const invalidCredentialsError = 'Email already exist';
    const foundUser = await this.userRepository.findOne({
      where: { username: userWithPassword.username },
    });
    if (foundUser) {
       throw new HttpErrors.Conflict(invalidCredentialsError);
    }
    const password = await this.passwordHasher.hashPassword(
      userWithPassword.password,
    );
    userWithPassword.password = password;
    const user = await this.userRepository.create(
      _.omit(userWithPassword, 'password'),
    );
    user.id = user.id.toString();
    await this.userRepository.userCredentials(user.id).create({password});
    return user; 
  }

  SendRegistrationEmail(email: string, username: string, password: string) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sherpakr500@gmail.com',
        pass: 'P@ssword1@3',
      },
    });

    const mailOptions = {
      from: 'sherpakr500@gmail.com',
      to: email,
      subject: 'Sherpa Registration',
      text: '\n Username :' + username + '\n Password :' + password,
    };

    transporter.sendMail(
      mailOptions,
      function (error: any, info: {response: string}) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      },
    );
  }

  public async sendEmail(emailObj: any) {
   
    emailjs.send(EmailJSConst.SERVICE_ID, emailObj.templateId, emailObj, {
      publicKey: EmailJSConst.PUBLIC_KEY,
      privateKey: EmailJSConst.PRIVATE_KEY, 
        })
        .then((response) => { return true },
              (err) => {
          return false
          },
        );
        
        return true;
 }

 async verifyPassword(userId: string, oldPassword:string)
 {
   const userCredential: any= await this.userCredentialsRepository.findOne({where: {userId: userId }}) 
   const passwordMatched = await this.passwordHasher.comparePassword(
    oldPassword,
    userCredential.password,
  );
   return passwordMatched;
 }
  }