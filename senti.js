var salient = require('salient');
var inbox = require("inbox");
var analyser = new salient.sentiment.BayesSentimentAnalyser();

var client = inbox.createConnection(false, "imap.gmail.com", {
    secureConnection: true,
    auth:{
        user: "deva@cogzidel.com",
        pass: "Kd551355122!"
    }
});

exports.sentiment = function (req, res) {
	console.log("enter");
	var msg=[];
	client.connect();
	client.on("connect", function(){
	    client.openMailbox("INBOX", function(error, info){
	        if(error) throw error;
	 
	        client.listMessages(-10, function(err, messages){
	            messages.forEach(function(message){
	            	if(analyser.classify(message.title) >= 1)
	            		var point = "positive";
	            	else
	            		var point = "negative";

	               msg.push({message : message.title, senti_point : point});
	            });
	            res.json(msg);
	            
	        });
	 
	    });
	});
}
