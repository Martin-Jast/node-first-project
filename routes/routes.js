
var CollectionDriver  = require( '../routes/collectionDriver.js' );
const mongoose        = require( 'mongoose' );

//The Schema of the product
var productSchema = new mongoose.Schema( {
      image_url: String,
      productName: String,
      price: String,
      productDescription: String,
      id: String,
});

//Connect with DB as client
//This port should be changed to the default port of the DB server(default to windows is 27017)
mongoose.connect( "mongodb://localhost:27017", function( err, mongoclient ){
    if( !mongoclient ){
      console.error( "Error! Exiting... Must Start MongoDB first!" );
      process.exit( 1 );
    }
  });
var productModel = mongoose.model('Products', productSchema);
var collectionDriver = new CollectionDriver( productModel );

//Returns all products
exports.findAll = function( req, res ){
  collectionDriver.findAll( productModel, function( error, objs ){
    if( error ) res.send( 400, error );
    else res.send( 200, objs );
  });
};

//Returns a single product defined by it's ID
exports.findOne = function( req, res ){
  if( req.params.id ){
    collectionDriver.get( productModel, req.params.id, function( error, objs ){
      if( error ) res.send(400, error);
      else  res.send( 200, objs );
    });
  } else {
    res.send( 400, {
      error   : 'bad url',
      url     : req.url
    });
  }
};

//Create a new product and returns the whole product with the ID generated
exports.create = function( req, res ){
  var object = req.body;
  collectionDriver.save( productModel, object, function( err, productModels ){
    if( err ) res.send( 400, err );
    else  res.send(201, productModels);
  });
};

//Updates the necessary parameters of a single product defined by it's ID
exports.update = function( req, res ){
  if( req.params.id ){
  collectionDriver.update( productModel, req.params.id, req.body, function( err, docs ){
    if( err ) res.send( 400, err );
    else res.send( 200, docs );
  });
  }else{
    var error = { "message" : "Cannot PUT a whole collection." };
    res.send ( 400, error );
  }
};

//Removes a single product defined by it's ID (still not implemented).
exports.destroy = function(req, res){
  var entity = req.params.entity;
  var collection = req.params.collection;
  if( entity ){
    collectionDriver.delete( collection, entity, function( error, objs ){
      if( error ) res.send( 400, error );
      else res.send( 200, objs ); 
    });
  }else{
    var error = { "message" : "Cannot DELETE a whole collection" };
    res.send( 400, error );
  }
};
