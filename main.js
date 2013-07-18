/**
 * New node file
 */
 
var app = require('express').createServer();
var winston = require('winston');
var mongoose = require('mongoose');
var java = require('java');
java.classpath.push("tripletExtraction.jar");
java.classpath.push("java_lib/joda-time.jar");
java.classpath.push("java_lib/jollyday.jar");
java.classpath.push("java_lib/xom.jar");
java.classpath.push("java_lib/stanford-corenlp-1.3.5-models.jar");
java.classpath.push("java_lib/stanford-corenlp-1.3.5.jar");
java.classpath.push("java_lib/log4j-1.2.17.jar");


app.listen(3000);

var logger = new (winston.Logger)({
	transports : [new (winston.transports.Console)(),
					new (winston.transports.File)({filename: 'logs/general.log'})] //,
	
});

logger.log("Trying to run java");

var CoreNlpParser = java.import("com.tadbitstrange.tripletExtractionFromSentence.CoreNlpParser");
var parser = new CoreNlpParser();

console.log(new Date().getTime());
console.log(parser.parseToStringSync("My dog has fleas."));
console.log(new Date().getTime());

console.log(new Date().getTime());
parser.parseToString("The fleas make me sad.", function(err, result) {
	if(err == undefined) {
		console.log("Good " + new Date().getTime())
		console.log(result);
	}
	
	process.exit(0);
});



