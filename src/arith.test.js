const {addUser, deleteUser} = require('./Routes/userController');
const User = require('./models/User');
const MongoURI =  'mongodb+srv://nadahesham:test1234@cluster0.5uvnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
const app = require("./app");
const { deleteOne } = require('./models/User');
const request = require("supertest");

jest.setTimeout(10000)

test('POST("/add-user")', (done) => {
  request(app).post("/add-user").expect("content-type",/json/).send({
    "Name": "Amr Hoballah",
    "Email": "batates@me7amara.com",
    "Age": "22",
    "BornIn": "26/11/99",
    "LivesIn": "Cairo",
    "MartialStatus": "Single",
    "PhoneNumber": "07775000",
    "Job": "Student",
    "Password": "mesh3aref"
  }).expect(200).expect((res) => {"added"}).end((err,res) => {
    if(err)
      return deleteOne(err)
    return done();
  })
})