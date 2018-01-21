var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var request = require('request');
var cheerio = require('cheerio');
var bodyParser=require("body-parser");



app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});


app.get('/getContPrice', function(req, res){
function intervalFunc() {
  console.log('Cant stop me now!');
var searchvar='DCBBANK';
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log('loop completed');
            console.log(json[0].company+'done');         
        }
})
}
setInterval(intervalFunc, 1500);
});

var onlineUsers = {};
var onlineCount = 0;

function getPrice() {
  console.log('Cant stop me now!');
var searchvar='DCBBANK';
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log('loop completed');
            console.log(json[0].company+'done');         
        }
})
}

io.on('connection', function(socket){
	console.log('a user connected');
	
	
	
  socket.on('subscribeToPrice', (interval,symbol) => {
	  
	  
    console.log(symbol,'socket is subscribing to timer with interval ', interval);
    setInterval(() => {
		console.log("timer");
		//getPrice
		  console.log('Cant stop me now!');
var searchvar=symbol;
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log('loop completed');
            console.log(json[0].company+'done');     
			
socket.emit('timer', json[0].company);			
        }
})
//get price end
		
      
    }, interval);
  });
	
	
	
  socket.on('DCBBANK', (interval) => {
    console.log('socket is subscribing to timer with interval ', interval);
    setInterval(() => {
var searchvar='DCBBANK';
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log("DCBBANK"+json[0]+'done');   		
socket.emit('timer', json[0]);			
        }
})
//get price end
    }, interval);
  });
	

  socket.on('boi', (interval) => {
    console.log('socket is subscribing to timer with interval ', interval);
    setInterval(() => {
var searchvar='boi';
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log("boi"+json[0]+'done');   		
socket.emit('timer', json[0]);			
        }
})
//get price end
    }, interval);
  });
	
  socket.on('FEDERALBANK', (interval) => {
    console.log('socket is subscribing to timer with interval ', interval);
    setInterval(() => {
var searchvar='FEDERALBANK';
var shaVa='shareprice'
var share='https://www.google.co.in/search?q='+searchvar+shaVa;
    request(share, function(error, response, html){
        if(!error){
		  var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
			  var span = $('div');
	 span.each(function(i, elem) {
		 console.log(elem)
								 company[i] = $(this).find('span b').eq(0).text().trim();
								 
									if(company[i]!=""){
														json.push({
																company : company[i]
																});
													return false;
													}
								});
            console.log("FEDERALBANK"+json[0]+'done');   		
socket.emit('timer', json[0]);			
        }
})
//get price end
    }, interval);
  });
	
	
	  socket.on('subscribeToTimer', (interval) => {
    console.log('socket is subscribing to timer with interval ', interval);
    setInterval(() => {
		console.log("timer");
      socket.emit('timer', new Date());
    }, interval);
  });
	
	socket.on('login', function(obj){
		socket.name = obj.userid;
		
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			onlineCount++;
		}
		
		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		console.log(obj.username+'user');
	});
	
	socket.on('disconnect', function(){
		if(onlineUsers.hasOwnProperty(socket.name)) {
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
			delete onlineUsers[socket.name];
			onlineCount--;
			
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
			console.log(obj.username+'user');
		}
	});
	
	socket.on('message', function(obj){
		io.emit('message', obj);
		console.log(obj.username+'说：'+obj.content);
	});
  
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});