function AutoTileConverter() { throw new Error('This is a static class'); }

AutoTileConverter._allSegments = [
    // 1st row
    [8, 9, 12, 13],
    [10, 9, 14, 13],
    [10, 11, 14, 15],
    [8, 11, 12, 15],
    [18, 17, 14, 7],
    [18, 17, 6, 7],
    [18, 17, 6, 13],
    [8, 9, 12, 7],
    [10, 9, 6, 7],
    [10, 11, 6, 15],
	// 2nd row
    [16, 17, 12, 13],
    [18, 17, 14, 13],
    [18, 19, 14, 15],
    [16, 19, 12, 15],
    [18, 3, 14, 7],
    [2, 3, 6, 7],
    [2, 17, 6, 13],
    [16, 3, 12, 7],
    [8, 11, 20, 23],
    [2, 19, 6, 15],
    // 3rd row
    [16, 17, 20, 21],
    [18, 17, 22, 21],
    [18, 19, 22, 23],
	[16, 19, 20, 23],
	[18, 3, 14, 13],
	[2, 3, 14, 13],
	[2, 17, 14, 13],
	[16, 3, 20, 21],
	[2, 3, 22, 21],
	[2, 19, 22, 23],
    // 4th row	
	[8, 9, 20, 21],
	[10, 9, 22, 21],
	[10, 11, 22, 23],
	[16, 17, 12, 7],
	[18, 19, 6, 15],
	[10, 9, 14, 7],
	[10, 9, 6, 13],
	[2, 3, 6, 13],
	[2, 3, 14, 7],
	[18, 3, 6, 13],
    // 5th row	
	[],
	[],
	[],
	[16, 3, 12, 13],
	[2,19, 14, 15],
	[18, 3, 22, 21],
	[2, 17, 22, 21],
	[2, 17, 6, 7],
	[18, 3, 6, 7],
	[2, 17, 14, 7],	
//End of editable output setup, do not touch anything below this.
];


AutoTileConverter.makeSegmentTile = function(source, bitmap, x, y, width, height, segments) {
  for (var i = 0; i < segments.length; i++) {
    var dx = x + (i % 2) * width;
    var dy = y + Math.floor(i / 2) * height;
    var index = segments[i];
    var sx = (index % 4) * width;
    var sy = Math.floor(index / 4) * height;
    bitmap.blt(source, sx, sy, width, height, dx, dy);
  }
};

AutoTileConverter.generateFullAutoTileBitmap = function(name, source) {


  var regEx = /tw\[(\d+)\]/i;
  var arr = regEx.exec(name);
  name = name.replace(regEx, '');
  var tileWidth = arr ? Number(arr[1]) : 48;


  regEx = /th\[(\d+)\]/i;
  arr = regEx.exec(name);
  name = name.replace(regEx, '');
  var tileHeight = arr ? Number(arr[1]) : 48;
  var sWidth = tileWidth / 2;
  var sHeight = tileHeight / 2;

  var bitmap = new Bitmap(tileWidth * 10, tileHeight * 5); //assign X/Y size (in tiles) of the exported image
  var allSegments = AutoTileConverter._allSegments;
  for (var i = 0; i < allSegments.length; i++) {
    var segments = allSegments[i];
    var x = (i % 10) * tileWidth; //X tiles number
    var y = Math.floor(i / 10) * tileHeight; //X tiles number
    AutoTileConverter.makeSegmentTile(source, bitmap, x, y, sWidth, sHeight, segments);
  }

  var fs = require('fs');
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);
  var canvas = bitmap._canvas;
  var dataURL = canvas.toDataURL("image/png", 1);
  var folderName = 'Tile Converter/Output';
  var dirPath = base + '/'+ folderName + '/';
  // If Directory Path does not exist create it
  if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }
    // Make Image Name
  var imageName = name;
  // Make File Name
  var fileName = dirPath + imageName + '.png';
  // Get Base 64 Data
  var base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
  // Write File
  fs.writeFileSync(fileName, base64Data, 'base64', function(err) { console.log(err); });
};


Scene_Boot.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._startDate = Date.now();


  var path = require('path');
  var fs = require('fs');
  var base = path.dirname(process.mainModule.filename);
  var filePath = base + '/Tile Converter/Input';
  // If Directory does not exist, create it.
  if (!fs.existsSync(filePath)) { fs.mkdirSync(filePath); }
  // Get Directory List
  var dirList = fs.readdirSync(filePath);
  // Go Through Directory List
  for (var i = 0; i < dirList.length; i++) {
    // Get Filename
    var filename = path.basename(dirList[i], '.png');
    var format = path.extname(dirList[i]);
    // If Format is not a Javascript file the continue on
    if (format !== '.png') { continue; }
    // Get Bitmap
    var bitmap = ImageManager.loadBitmap('Tile Converter/Input/', filename, 0, false)
    bitmap.addLoadListener(AutoTileConverter.generateFullAutoTileBitmap.bind(this, filename, bitmap));
  }
};