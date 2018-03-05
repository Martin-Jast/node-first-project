var http              = require( 'http' ),
  //eslint-disable-next-line
    path              = require( 'path' ),
    express           = require( 'express' );
    routes            = require( './routes/routes.js'),
    bodyparser        = require( 'body-parser' );

    var app = express();
    app.set('port', process.env.PORT || 3001);
    app.set( 'views', path.join(__dirname, 'views' ) );
    app.set('view engine', 'html');
    app.use( bodyparser.json() );
    app.use( bodyparser.urlencoded({extended: true}) );

    app.get( '/products', routes.findAll);
    app.get( '/products/:id', routes.findOne);
    app.put('/products/:id', routes.update);
    app.post('/products', routes.create);

    //Error case
    app.get( '/', function( req, res ){
      res.send( '<html><body><h1>404 URL Not Found</h1></body></html>' );
    });

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
