const request = require('supertest')
const app = require('../app')
const mongoose = require("mongoose");
const userService = require("../services/user.service")
const resumeService = require("../services/resume.service")
const {signJwt} = require("../utils/jwt.utils");
const { MongoMemoryServer } = require('mongodb-memory-server')

describe('resumeBuilder route', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('GET /resumeBuilder', () => {
        describe('called without a token as a new user', () => {
            it('should return empty resume and new token', async () => {
                // noinspection ES6RedundantAwait
                const {statusCode, body} = await request(app)
                    .get('/api/resumeBuilder')
                expect(statusCode).toEqual(201)
                expect(body).toHaveProperty('token')
                expect(body).toHaveProperty('resume')
                expect(body.currentStep).toEqual("personalInfo")
            })
        })

        describe('called with a token as an existing user', () => {

            it('should return current resume for the user', async () => {
                const mockUserId = new mongoose.Types.ObjectId().toString()
                const mockUser = {
                    _id: mockUserId,
                };
                const mockResume = {
                    "_id": new mongoose.Types.ObjectId().toString(),
                    "_creator": mockUserId,
                    "data": {
                        "personalInfo": {
                            "firstName": "Mohamed",
                            "lastName": "Amir",
                            "email": "m@m.com",
                            "phone": "12312412",
                            "birthday": "2022-05-05T17:03:16.679Z",
                            "address": "1 sdgfds st"
                        },
                        "education": [{
                            "degree": "Computer Science",
                            "school": "Cairo University",
                            "graduationYear": 2022
                        }, {
                            "degree": "Mechanical Engineering",
                            "school": "Alexandria University",
                            "graduationYear": 2015
                        }],
                        "experience": null,
                        "skills": null
                    }
                }

                jest
                    .spyOn(userService, "getUserById")
                    .mockReturnValueOnce(mockUser);
                jest
                    .spyOn(resumeService, "getActiveResumesForUserOrCreateOne")
                    .mockReturnValueOnce(mockResume)
                const jwt = signJwt(mockUserId)
                // noinspection ES6RedundantAwait
                const {statusCode, body} = await request(app)
                    .get('/api/resumeBuilder')
                    .set("Authorization", `Bearer ${jwt}`)

                expect(statusCode).toEqual(200)
                expect(body.resume).toEqual(mockResume.data)
            })
        })
    })

    describe('POST /resumeBuilder/:step', () => {
        describe('called without a token', () => {
            it('should return 401 unauthorized', async () => {
                // noinspection ES6RedundantAwait
                const {statusCode, body} = await request(app)
                    .post('/api/resumeBuilder/personalInfo')
                    .send({
                        data: {
                            "firstName": "Mohamed",
                            "lastName": "Amir",
                            "email": "m@m.com",
                            "phone": "12312412",
                            "birthday": "2022-05-06T17:03:16.679Z",
                            "address": "1 abc st"
                        }
                    })
                expect(statusCode).toEqual(401)
            })
        })

        //TODO write tests for all scenarios
    })

})
