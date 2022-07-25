// tslint:disable: import-name
// tslint:disable: ter-arrow-parens
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import userModel from '../models/user.model';
import teamModel from '../models/team.model';
import { validateUserToken } from '../middlewares/verifyToken';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import seed from '../db';

let token: string;
let teamA: any;
let teamB: any;
let fixturesId: string;
let fixtureLink: string;
let session: object;

beforeAll(async () => {
  await userModel.deleteMany({});

  const user = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'sandraifeoma@hotmail.com',
      name: 'Melanie Marie',
      password: 'password1234',
      role: 'admin',
    });
  token = user.body.token;
  await seed();

  teamA = await teamModel.findOne({ name: 'Liverpool' });
  teamB = await teamModel.findOne({ name: 'Manchester City' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User SignUp Routes', () => {

  it('A user can sign up', () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: 'Adam Smith',
        email: 'adam@gmail.com',
        password: 'password1234',
        passwordConfirm: 'password1234',
      })
      .expect(res => {
        expect(Object.keys(res.body.data)).toContain('name');
        expect(Object.keys(res.body.data)).toContain('email');
      });
  });

  // it('Should display sign up success', () => {
  //   return request(app)
  //     .post('/api/auth/signup')
  //     .send({
  //       name: 'Jason Durelo',
  //       email: 'jason@gmail.com',
  //       password: 'pass123456',
  //     })
  //     .expect(res => {
  //       expect(res.status).toBe('success');
  //     });
  // });

  // it('should warn if same user sign up again', () => {
  //   return request(app)
  //     .post('/api/auth/signup')
  //     .send({
  //       name: 'Jason Durelo',
  //       email: 'jason@gmail.com',
  //       password: 'pass123456',
  //     })
  //     .expect(res => {
  //       expect(res.body.message).toBe(`Email already exist`);
  //     });
  // });
});

// describe('User Login Routes', () => {
//   it('A registered user can login', () => {
//     return request(app)
//       .post('/api/auth/login')
//       .send({
//         email: 'sandra@gmail.com',
//         password: 'password1234',
//       })
//       .expect(res => {
//         expect(res.status).toBe(`success`);
//       });
//   });

//   it('A non registered user cannot login', () => {
//     return request(app)
//       .post('/api/auth/login')
//       .send({
//         email: 'bash@gmail.com',
//         password: 'pass123456',
//       })
//       .expect(res => {
//         expect(res.body.message).toBe(`Email does not exist.`);
//       });
//   });

//   it('Admin can login', () => {
//     return request(app)
//       .post('/api/auth/login')
//       .send({
//         email: 'sandraifeoma@hotmail.com',
//         password: 'password12345',
//       })
//       .expect(res => {
//         token = res.body.token;
//         expect(res.status).toBe(`success`);
//       });
//   });

//   it('Passwords should match', () => {
//     return request(app)
//       .post('/api/auth/login')
//       .send({
//         email: 'sandraifeoma@hotmail.com',
//         password: 'pass2',
//       })
//       .expect(res => {
//         expect(res.body.message).toBe(`Invalid email or password`);
//       });
//   });
// });
