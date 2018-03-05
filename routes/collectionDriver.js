var ObjectID = require( 'mongoose' ).ObjectID;
var productModel;
function CollectionDriver() {

};

module.exports = CollectionDriver ;
//You define class methods using the key word 'prototype'!
CollectionDriver.prototype.getCollection = function( productModel, callback ){
  productModel.find(function( error, the_collection) {
    if( error ) callback( error );
    else callback( null, the_collection );
  });
};

CollectionDriver.prototype.findAll = function( productModel, callback ){
  this.getCollection( productModel, function( error, the_collection ){
    if( error ) callback( error );
    else callback( null, the_collection );
  });
};

CollectionDriver.prototype.get = function( productModel, id, callback ){
  productModel.find({'_id': id}, function( error, doc ){
    if( error ) callback( error );
    else callback( null, doc );
  });
};

CollectionDriver.prototype.save = function( productModel, object, callback){
  productModel.create( object, function( err, productModels ){
    if( err ) callback( err, productModels );
      else callback( null, productModels );
    });
};

CollectionDriver.prototype.update = function( productModel, entityID, obj, callback){
  productModel.findOneAndUpdate({'_id': entityID}, obj, {upsert: true}, function( err, productModels){
    if( err ) callback( err, productModels );
      else callback( null, productModels );
  } );
};

CollectionDriver.prototype.delete = function( productModel, entityID, callback ){
  productModel.deleteOne({ _id: entityID }, callback( err ) );
};
