var mqtt=require('mqtt')
var mongodb=require('mongodb')
var config=require(config.js);
var mongodbClient=mongodb.MongoClient
var mongodbURI='mongodb://'+config.dbUser+':'+config.dbPwd+'@'+config.dbName;
var deviceRoot="demo/devices/"
var collection,client
var lastDate

mongodbClient.connect(mongodbURI,setupCollection);

function setupCollection(err,db) {
  if(err) throw err;
  console.log("Setting up connection to db and broker.");
  collection=db.collection("test_mqtt");
  lastDate = new Date();
  lastDate.setSeconds(0);
  lastDate.setMilliseconds(0);
  newDoc(lastDate);
  client=mqtt.connect([{ host: config.mqttName, port: 1883 }])
  client.subscribe(deviceRoot+"+")
  client.on('message', insertEvent);
}

function insertEvent(topic,payload) {
  var key = new Date();
  key.setSeconds(0);
  key.setMilliseconds(0);
  if (key.toString() != lastDate.toString()) {
    console.log("New Doc");
    newDoc(key);
    lastDate = key;
  }
  var sec = new Date().getSeconds().toString();
  sec = "values."+sec;
  var action = {};
  action[sec] = payload.toString();
  key.setSeconds(0);
  key.setMilliseconds(0);
  collection.update(
    { _id:key },
    {
      $set: action
    },
    { upsert:true },
    function(err,docs) {
      if(err) throw err;
    }
  )
}

function newDoc(key) {
  collection.insertOne({
    _id: key,
    type: "Temperature",
    values: {
        0: 'NaN',
        1: 'NaN',
        2: 'NaN',
        3: 'NaN',
        4: 'NaN',
        5: 'NaN',
        6: 'NaN',
        7: 'NaN',
        8: 'NaN',
        9: 'NaN',
        10: 'NaN',
        11: 'NaN',
        12: 'NaN',
        13: 'NaN',
        14: 'NaN',
        15: 'NaN',
        16: 'NaN',
        17: 'NaN',
        18: 'NaN',
        19: 'NaN',
        20: 'NaN',
        21: 'NaN',
        22: 'NaN',
        23: 'NaN',
        24: 'NaN',
        25: 'NaN',
        26: 'NaN',
        27: 'NaN',
        28: 'NaN',
        29: 'NaN',
        30: 'NaN',
        31: 'NaN',
        32: 'NaN',
        33: 'NaN',
        34: 'NaN',
        35: 'NaN',
        36: 'NaN',
        37: 'NaN',
        38: 'NaN',
        39: 'NaN',
        40: 'NaN',
        41: 'NaN',
        42: 'NaN',
        43: 'NaN',
        44: 'NaN',
        45: 'NaN',
        46: 'NaN',
        47: 'NaN',
        48: 'NaN',
        49: 'NaN',
        50: 'NaN',
        51: 'NaN',
        52: 'NaN',
        53: 'NaN',
        54: 'NaN',
        55: 'NaN',
        56: 'NaN',
        57: 'NaN',
        58: 'NaN',
        59: 'NaN'
    },
    function(err,docs) {
      if(err) console.log("Insert blank doc failed");
    }
  });
}

function newDoc2(key) {
  collection.insertOne(
    {
      _id:key,
      values:
      {
        type: [ Number ],
        default: function() { return Array(60).fill(0); }
      },
    },
    function(err,docs) {
      if(err) { console.log("Insert fail"); }
    }
  )
}
