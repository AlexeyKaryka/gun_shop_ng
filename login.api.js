var ObjectId = require('mongodb').ObjectId;
//var o_id = new ObjectId(id);
const MongoClient = require('mongodb');
let db;

MongoClient.connect('mongodb://localhost:27017/', function(err, client){
  if(err){
    return console.log('cant connect to the database');
  }

  db = client.db('gun-shop');

  module.exports.createUser = function createUser(userData, res, req) {
    return db.collection('users').insertOne({
      'login': userData.login,
      'name': userData.name,
      'password': userData.password,
      'address': userData.address
    }, function(err, result){
      if (result) {
        req.session.user = {id: result.insertedId, login: userData.login}
        return res.send(JSON.stringify({
          name: userData.name,
          login: userData.login,
          address: userData.address
          //orders: []
        }));
      } else {
        return res.status(500).send('Some error occured, supposing ununique login!');
      }
    })
  }
  
  module.exports.checkUser = function checkUser(userData, res, req) {

    if (req.session.user) {
      
      return db.collection('users').findOne(
      new ObjectId(req.session.user.id),
      function(err, result){

        if (result) {
          const userDataResponse = {
            name: result.name,
            login: result.login,
            address: result.address,
          }
  
          // db.collection('orders').findOne({
          //   'user': result.login 
          // }, function(err, result) {
            
          //   return res.send(JSON.stringify({
          //     name: userDataResponse.name,
          //     login: userDataResponse.login,
          //     address: userDataResponse.address,
          //     orders: result
          //   }));
  
          // });
          return res.send(JSON.stringify({
            name: userDataResponse.name,
            login: userDataResponse.login,
            address: userDataResponse.address
          }));

        } else {
          return res.status(500).send('Invalid login or password');
        }

      });
    }

    return db.collection('users').findOne({
      'login': userData.login
    }, function(err, result){

      if (result && result.password == userData.password) {

        req.session.user = {id: result._id, login: result.login}
        const userDataResponse = {
          name: result.name,
          login: result.login,
          address: result.address,
        }

        // db.collection('orders').findOne({
        //   'user': userData.login 
        // }, function(err, result) {

        //   return res.send(JSON.stringify({
        //     name: userDataResponse.name,
        //     login: userDataResponse.login,
        //     address: userDataResponse.address,
        //     orders: result
        //   }));

        // });
        return res.send(JSON.stringify({
          name: userDataResponse.name,
          login: userDataResponse.login,
          address: userDataResponse.address
        }));

      } else {
        return res.status(500).send('Invalid login or password');
      }

    })
  }
});


