var fs = require('fs');
var path = require('path');
const testFolder = './streamlines/';
const writeToDir = './_streamlines/';

//alle Dateien einlesen. Zurückgeben, die auf '.json' enden
// input: Pfad zum Verzeichnis
getJsonFiles = function(folder){
	var arrayOfFiles = [];
	fs.readdirSync(folder)
		.filter(file => path.extname(file).toLowerCase() === '.json')
		.forEach(json => arrayOfFiles.push(json));
	return arrayOfFiles;
}

// Vom Objekt nur Features mit Länge zurückgeben, die länger sind als minLength
// input originalles JSON Objekt, Int: minimale Pfadlänge der Linie  
var reduce = (singleJS, minLength) =>  singleJS.features.filter(feature=>feature.geometry.coordinates.length> minLength);

//optional etwas Statistik in die Konsole
//input: alte Länge, eneue Länge
var printResult = (oldL,newL,minLength) => console.log("from " + oldL + ' -> ' + newL, "reduced by " + (1- newL/oldL).toFixed(2)*100 + "%", "compress to length of " + minLength);  

// neue JSON schreiben
// input: Dateiname, neues JSON
var writeResults = (oldanme,json) => fs.writeFile(writeToDir+oldanme, JSON.stringify(json), 'utf8', function(){console.log("done writing: ./_streamlines/" + oldanme)});


function compress(minLength){
	getJsonFiles(testFolder).forEach(function(fileName){ 
		var oldJson = require(testFolder+fileName)
		var reducedJson = reduce(oldJson, minLength);
		printResult(oldJson.features.length,reducedJson.length,minLength)
		oldJson.features = reducedJson;
		if (!fs.existsSync(writeToDir)) fs.mkdirSync(writeToDir);
		writeResults(fileName,oldJson);
	}) 
}

exports.compress = function (level) {
  compress(level)
  console.log("exit")
}
