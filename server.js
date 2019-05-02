const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const {toXML} = require('jstoxml');

const users = require('./routes/users');
var ObjectId = require('mongodb').ObjectId;

const app = express();
let db;
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(session({
  secret: 'I am a god of war',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/gun-shop'
  })
}));

app.use(express.static('dist'));

app.use(bodyParser.json());

// app.get('/',(request, response, next)=>{
//   response.sendFile('dist/index.html');
// });

app.post('/models', (request, response, next)=>{

  if (request.body.filter == 'all') {
    console.log('request for all models');
    db.collection('models').find().toArray(function(err, docs){
      if(err){
        console.log(err);
        return response.sendStatus(500);
      }
      response.send(docs);
    });
  } else {
    console.log('request for filtered models');
    console.log(' ' + JSON.stringify(request.body));
    console.log(request.body);
    db.collection('models').find(request.body.filter).toArray(function(err, docs){
      if(err){
        console.log(err);
        return response.sendStatus(500);
      }
      response.send(docs);
    })
  }
  
});

app.post('/brands', (request, response, next)=>{

  console.log('request for brands');

  db.collection('brands').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs)
  })

})

app.post('/types', (request, response, next)=>{

  console.log('request for types');

  db.collection('types').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs)
  })
})

app.post('/orders', (request, response, next)=>{
  let user = request.session.user;
  if (user) {
    db.collection('orders').find({'user': user.login}).toArray(function(err, docs){
      if(err){
        console.log(err);
        return response.sendStatus(500);
      }
      response.send(docs)
    })
  } else {
    return response.sendStatus(500);
  }

})

app.post('/orderChangeState', (request, response, next)=>{
  let user = request.session.user;
  if (user) {
    console.log('user exists');
    console.log(request.body._id);
    db.collection('orders').updateOne({'user': user.login, '_id': new ObjectId(request.body._id)}, {$set: {'state': 'paid'}}, function(err, doc){
      if(err) {
        console.log(err);
        return response.sendStatus(500);
      }
      console.log('order updated');
      db.collection('orders').findOne({'user': user.login, '_id': new ObjectId(request.body._id)}, function(err, doc){
        if(err) {
          console.log(err);
          return response.sendStatus(500);
        }
        response.send(doc);
      })
    })
  } else {
    return response.sendStatus(500);
  }

})

app.post('/orderAddItem', (request, response, next)=>{
  let user = request.session.user;
  if (user) {
    db.collection('orders').findOne({'user': user.login, 'state': 'pending'}, function(err, doc){
      if(err) {
        console.log(err);
        return response.sendStatus(500);
      }
      console.log(doc);

      let modelCost = null;

      db.collection('models').findOne({'name': request.body.modelName}, function(err, docc) {
        if(err || docc == null){
          console.log(err);
          return response.sendStatus(500);
        }
        modelCost = docc.cost;

        if (doc == null) {

          db.collection('users').findOne({'login': user.login}, function(err, doccc){
            if(err || doccc == null) {
              console.log(err);
              return response.sendStatus(500);
            }
  
            db.collection('orders').insertOne({
              'items': [{'name': request.body.modelName, 'cost': modelCost, 'count': '1'}],
              'orderCost': modelCost,
              'user': user.login,
              'address': doccc.address,
              'state': 'pending'
              }, function(err, docc) {
              if(err){
                console.log(err);
                return response.sendStatus(500);
              }
              
              let json = {
                'items': [{'name': request.body.modelName, 'cost': modelCost, 'count': '1'}],  
                'orderCost': modelCost,
                'user': user.login,
                'address': doccc.address
              };
              let xml = toXML(json);
              fs.writeFileSync('dist/xmls/'+user.login+'_'+docc.ops[0]._id+'.xml', xml);
              return response.sendStatus(200);
            })
  
          })
  
        } else {
  
          let suchModelIndex = '';
  
          for(let item in doc.items) {
            if (doc.items[item].name == request.body.modelName) {
              suchModelIndex = item;
            }
          }
  
          if (suchModelIndex == '') {
            doc.items.push({'name': request.body.modelName, 'cost': modelCost, 'count': '1'});
            doc.orderCost = String(Number(doc.orderCost.substr(0, doc.orderCost.length-1)) + Number(modelCost.substr(0, modelCost.length-1))) + '$';
          } else {
            doc.items[suchModelIndex].count = String(Number(doc.items[suchModelIndex].count) + 1);
            doc.orderCost = String(Number(doc.orderCost.substr(0, doc.orderCost.length-1)) + Number(modelCost.substr(0, modelCost.length-1))) + '$';
          }
  
          db.collection('orders').replaceOne({'_id': new ObjectId(doc._id)}, doc, function(err, doc2){
            if(err){
              console.log(err);
              return response.sendStatus(500);
            }
            let json = {
              'items': doc.items,  
              'orderCost': doc.orderCost,
              'user': user.login,
              'address': doc.address
            };
            console.log(JSON.stringify(json));
            let xml = toXML(json);
            fs.writeFileSync('dist/xmls/'+user.login+'_'+doc._id+'.xml', xml);
            return response.sendStatus(200);
          })
  
        }

      })

    })
  } else {
    return response.sendStatus(500);
  }

})

app.use('/signin', users);


MongoClient.connect('mongodb://localhost:27017/', function(err, client){
  if(err){
    return console.log('cant connect to the database');
  }
  db = client.db('gun-shop');
  module.exports = db;
  app.listen(4444, function(){
    console.log('express server has ran');
  });
});
