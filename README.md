MongoDB + React Web App Project

Requirements

-Node 
-MongoDB


How to Run:

-The project is divided in 2 main folders the "/react-backend" and "/react-backend/client".
 "/react-backend" is the part responsible to accept and respond the call coming from the client. 
 
	-Before starting the It, you should run "npm install" in the folder so the dependencies are installed.
	
	-After installing the dependencies the service can be started through the use of the command-line
	"node app.js". If the dependencies were installed and the mongoDB server is working the screen should 
	eccho " Listening through port 3001".
	
	-(Optional) The default port used for the MongoDB server was 27017, if necessary change it in 
	"react-backend/routes/routes.js"
	
-Once with the service running open a second command-line, go to "/react-backend/client" and run 
"npm install".

- Run the web service using "npm start".

-The WebApp can be seen at "localhost:3000".
