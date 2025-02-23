//=================================================================================================
// Change_Tile.js
//=================================================================================================
/*:
 * @plugindesc 改变地图图块
 * @author 芯☆淡茹水
 * @help
 * 
 * 
 * 
 * 
 * @command ChangeTile
 * @text 更改图块
 * @desc 更改地图上的图块。
 * 
 * @arg mapId
 * @type number
 * @text 地图ID
 * @desc 目标图块所在的地图ID, （写 0 表示当前地图）。
 * @default 0
 * 
 * @arg x
 * @type number
 * @text X坐标
 * @desc 目标图块所在的X坐标。
 * @default 0
 * 
 * @arg y
 * @type number
 * @text Y坐标
 * @desc 目标图块所在的Y坐标。
 * @default 0
 * 
 * @arg layer
 * @text 图层
 * @desc 目标图块所在的图层（写图层类型：A ~ E）。
 * @default
 * 
 * @arg index
 * @type number
 * @text 图块序号
 * @desc 在数据库地图编辑器对应图层上，从左到右，从上到下数，
 *       该图块所在的序号（第一个序号是 0）。
 * @default
 * 
 * 
 * @command RemoveTile
 * @text 移除图块
 * @desc 移除地图上已更改过的图块。
 * 
 * @arg mapId
 * @type number
 * @text 地图ID
 * @desc 目标图块所在的地图ID, （写 0 表示当前地图）。
 * @default 0
 * 
 * @arg x
 * @type number
 * @text X坐标
 * @desc 目标图块所在的X坐标。
 * @default 0
 * 
 * @arg y
 * @type number
 * @text Y坐标
 * @desc 目标图块所在的Y坐标。
 * @default 0
 * 
 * @arg layer
 * @text 图层
 * @desc 目标图块所在的图层（写图层类型：A ~ E）。
 * @default
 * 
*/
//=================================================================================================
;(() => {
//=================================================================================================
const GetMapTileKeySym = function(mapId, x, y, layerSym) {
    return [mapId, x, y, layerSym];
};
//=================================================================================================
PluginManager.registerCommand('XdRs_ChangeTile', 'ChangeTile', args => {
    if ($gameMap) {
        $gameMap.changeTile(args.layer, parseInt(args.index), parseInt(args.x), parseInt(args.y), parseInt(args.mapId));
    }
});
PluginManager.registerCommand('XdRs_ChangeTile', 'RemoveTile', args => {
    if ($gameMap) {
        $gameMap.removeChangedTile(args.layer, parseInt(args.x), parseInt(args.y), parseInt(args.mapId));
    }
});
//=================================================================================================
const XR_Tilemap_readMapData = Tilemap.prototype._readMapData;
Tilemap.prototype._readMapData = function(x, y, z) {
    const layerSym = ['A','B','C','D','E'][z];
    const id = $gameMap.getCurrentChangedTile(x, y, layerSym);
    return id || XR_Tilemap_readMapData.call(this, x, y, z);
};
//=================================================================================================
const XR_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    XR_Game_Map_initialize.call(this);
    this._changedTileData = {};
};
const XR_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    XR_Game_Map_setup.call(this, mapId);
    this.setupExcessTiles();
};
Game_Map.prototype.setupExcessTiles = function() {
    this._excessTiles = {};
    const arr = Object.keys(this._changedTileData);
    arr.forEach(sym => {
        const arr = sym.split(',').map(n => parseInt(n));
        if (arr[0] === this._mapId) {
            this.addExcessTile(arr[1], arr[2], this._changedTileData[sym]);
        }
    });
};
Game_Map.prototype.addExcessTile = function(x, y, tileId) {
    const key = ''+x+'_'+y;
    this._excessTiles[key] = this._excessTiles[key] || [];
    this._excessTiles[key].push(tileId);
};
Game_Map.prototype.changeTile = function(layerSym, tileIndex, x, y, mapId) {
    layerSym = layerSym.toUpperCase();
    if (['A','B','C','D','E'].contains(layerSym)) {
        mapId = mapId || this._mapId;
        let tileId = 0;
        if (layerSym === 'A') {
            const kind = tileIndex % 16;
            const start = Tilemap['TILE_ID_A' + (Math.floor(tileIndex / 16) + 1)];
            tileId = start + kind * 48;
            if (!Tilemap.isAutotile(tileId) && !Tilemap.isTileA5(tileId)) {
                tileId = 0;
            }
        } else  {
            tileIndex = tileIndex % 256;
            tileId = tileIndex + ['B','C','D','E'].indexOf(layerSym) * 256;
        }
        if (tileId > 0) {
            const sym = GetMapTileKeySym(mapId, x, y, layerSym);
            const tmp = this.getCurrentChangedTile(x, y, layerSym);
            this._changedTileData[sym] = tileId;
            if (this._mapId === mapId && tmp !== this.getCurrentChangedTile(x, y, layerSym)) {
                this.addExcessTile(x, y, tileId);
                this.refreshTileMap && this.refreshTileMap();
            }
        }
    }
};
Game_Map.prototype.removeChangedTile = function(layerSym, x, y, mapId) {
    mapId = mapId || this._mapId;
    layerSym = layerSym.toUpperCase();
    const sym = GetMapTileKeySym(mapId, x, y, layerSym);
    if (this._changedTileData[sym] !== void 0) {
        const key = ''+x+'_'+y;
        if (mapId === this._mapId && this._excessTiles[key]) {
            const id = this._changedTileData[sym];
            this._excessTiles[key].remove(id);
        }
        delete this._changedTileData[sym];
        this.refreshTileMap && this.refreshTileMap();
    }
};
Game_Map.prototype.getCurrentChangedTile = function(x, y, layerSym) {
    const sym = GetMapTileKeySym(this._mapId, x, y, layerSym);
    return this._changedTileData[sym] || 0;
};
const XR_Game_Map_allTiles = Game_Map.prototype.allTiles;
Game_Map.prototype.allTiles = function(x, y) {
    const arr = XR_Game_Map_allTiles.call(this, x, y);
    const key = ''+x+'_'+y;
    return (this._excessTiles[key] || []).concat(arr);
};
//=================================================================================================
const XR_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
    XR_Spriteset_Map_createTilemap.call(this);
    $gameMap.refreshTileMap = () => { this._tilemap.refresh(); };
};
//=================================================================================================
})();
//=================================================================================================
// end
//=================================================================================================