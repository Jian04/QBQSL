//=============================================================================
// MOG_TrPopUpBattle.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta os ícones dos tesouros após o inimigo morrer.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG Treasure PopUp Battle ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/04
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta os ícones dos tesouros após o inimigo morrer.
 * duang 对mog掉落进行了魔改 加了个掉落图标动画0.0
 * 一起逆天吧  ！ 
 * 加入qq群： 863966119 逆天交流群  ！ 逆天！
 * 一群rm作者大佬陪你共同成长！
 * 尽情享受吧！：
 * Duang
 * qq：546566631
 * 多种方式配置掉落动画
 *	一、在插件参数里 进行配置 
 *		例子：如果在 品质1参数设置了 DuangQualityNote 为 <Quality:1> 则所有带 <Quality:1>  注解的  掉落动画都会采用参数配置的的动画id进行显示
 *	    注意：自定义的品质注解 DuangQualityNote 必须为 <x:1> 这种插件常用注解格式 
 *	二、在武器或物品指定掉落动画
 *		除了参数设置对品质定义的掉落动画 也可以在物品注解中指定该物品的掉落动画
 *		列子   ：  <Drop AnimationID: 1>  
 *      指定掉落该物品的掉落动画id为 1 
 *      ！！！ 注解中的配置的动画id优先于插件参数中配置的动画id （也就是说了 写了<Drop AnimationID: 1>  那么插件参数配置的品质掉落动画id 对这个装备没有效果 会优先采用<Drop AnimationID: 1> ）
 *
 * @param Drop Item Real Time
 * @desc Ganhar o item em tempo real.
 * @type boolean 
 * @default true 
 *
 * @param Animation Type
 * @desc Tipo de animação.
 * 0 - Bouncing     1 - Floating
 * @type select
 * @default 0
 * @option Bouncing
 * @value 0
 * @option Floating
 * @value 1 
 *
 * @param Fade Duration
 * @desc Tempo para fazer o item desaparecer.
 * @type number
 * @default 20
 * @min 5
 *
 * @param Scale
 * @desc Tamanho do ícone do tesouro.
 * @default 0.8
 *
 *
 * @param DuangQuality List 1-15
 * @text ----装备品质名称列表1-10----
 * @default
 *
 * @param DuangQuality 1
 * @text 装备品质名称1
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"普通","DuangQualityNote":"<Quality:1>","IsEnable":"true","AnimationID":0}
 *
 * @param DuangQuality 2
 * @text 装备品质名称2
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 3
 * @text 装备品质名称3
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 4
 * @text 装备品质名称4
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default
 *
 * @param DuangQuality 5
 * @text 装备品质名称5
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default
 *
 * @param DuangQuality 6
 * @text 装备品质名称6
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 7
 * @text 装备品质名称7
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 8
 * @text 装备品质名称8
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 9
 * @text 装备品质名称9
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 10
 * @text 装备品质名称10
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 11
 * @text 装备品质名称11
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 12
 * @text 装备品质名称12
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 13
 * @text 装备品质名称13
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 14
 * @text 装备品质名称14
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 15
 * @text 装备品质名称15
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 */
 /* ---------------------------------------------------------------------------
 * struct<DuangQuality>
 * ---------------------------------------------------------------------------
 */
/*~struct~DuangQuality:
 *
 * @param DuangQualityName
 * @text 装备品质名称
 * @desc 装备品质名称，可以使用文字代码。例子：普通 
 * @default  
 *
 * @param DuangQualityNote
 * @text 备注
 * @desc 注意备注符号为英文输入法下的符号！！！根据该字段对物品进行扫描命中！例子：<Quality:1>
 * @default 
 *
 * @param IsEnable
 * @text 是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。填写 true  或者  false
 * @default true
 *
 * @param AnimationID
 * @text 掉落动画id
 * @desc 掉落动画id 例子：1 只能填写数字
 * @type Number
 * @min 0
 * @default 0
 */
/*~struct~ParamText:
 *
 * @param Name
 * @text 参数用语
 * @desc 参数的显示名称。
 * @default 
 *
 * @param Show
 * @text 参数是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 */


//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_TrPopUpBattle = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_TrPopUpBattle');
    Moghunter.trPopup_animation = Number(Moghunter.parameters['Animation Type'] || 0);
	Moghunter.trPopup_scale = Number(Moghunter.parameters['Scale'] || 0.8);
	Moghunter.trPopup_fadeDuration = Number(Moghunter.parameters['Fade Duration'] || 20);
	Moghunter.trPopup_dropRealTime = String(Moghunter.parameters['Drop Item Real Time'] || 'false');

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  Initialize
//==============================
var _mog_trPopBattle_tempInitialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_mog_trPopBattle_tempInitialize.call(this);
	this._trBatNeedPopUp = false;
	this._trBatRealTimeDrop = String(Moghunter.trPopup_dropRealTime) == 'true' ? true : false;
	this._trBatDropLock = false;
};

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  initMembers
//==============================
var _mog_trPopBattle_gEnemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
    _mog_trPopBattle_gEnemy_initMembers.call(this);
    this._treasure = {};
	this._treasure.needPopup = false;
	this._treasure.checked = false;
	this._treasure.item = [];
};

//==============================
//  ♦ OVERWRITE ♦  make Drop Items
//==============================
Game_Enemy.prototype.makeDropItems = function() {
	if (this._treasure.checked) {
	    return this._treasure.item;
	} else {
		const rate = this.dropItemRate();
		return this.enemy().dropItems.reduce((r, di) => {
			if (di.kind > 0 && Math.random() * di.denominator < rate) {
				return r.concat(this.itemObject(di.kind, di.dataId));
			} else {
				return r;
			}
		}, []);
    };
};
		
//=============================================================================
// ■■■ Battle Manager ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  gain Drop Items
//==============================
var _mog_BMangr_gainDropItems = BattleManager.gainDropItems;
BattleManager.gainDropItems = function() {
	if ($gameTemp._trBatDropLock) {return};
	_mog_BMangr_gainDropItems.call(this);
};

//=============================================================================
// ■■■ Scene Map ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  Initialize
//==============================
var _mog_trPopup_scMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	$gameTemp._trBatDropLock = false;
	_mog_trPopup_scMap_initialize.call(this)
};		
		
//=============================================================================
// ■■■ Sprite Enemy ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Update Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.updateCollapse = function() {
    _mog_trPopBattle_sprEnemy_updateCollapse.call(this);
	if (this._effectDuration === 0 && !this._enemy._treasure.checked) {this.checkTreasurePopup()};
};

//==============================
// ♦ ALIAS ♦  Update Boss Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
Sprite_Enemy.prototype.updateBossCollapse = function() {
    _mog_trPopBattle_sprEnemy_updateBossCollapse.call(this);
    if (this._effectDuration === 0 && !this._enemy._treasure.checked) {this.checkTreasurePopup()};
};

//==============================
// ♦ ALIAS ♦  Update Instant Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
Sprite_Enemy.prototype.updateInstantCollapse = function() {
    _mog_trPopBattle_sprEnemy_updateInstantCollapse.call(this);
	if (this._effectDuration === 0 && !this._enemy._treasure.checked) {this.checkTreasurePopup()};
};

//==============================
// * check Treasure Popup
//==============================
Sprite_Enemy.prototype.checkTreasurePopup = function() {
     this._enemy._treasure.item = this._enemy.makeDropItems();
	 this._enemy._treasure.checked = true;
	 if (this._enemy._treasure.item) {
		 this._enemy._treasure.needPopup = true;
		 $gameTemp._trBatNeedPopUp = true;
	 };
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ update
//==============================
var _mog_trPopupBat_sprBat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_mog_trPopupBat_sprBat_update.call(this);
	if ($gameTemp._trBatNeedPopUp) {this.treasurePopupR()};
};

//==============================
// * treasurePopupR
//==============================
Spriteset_Battle.prototype.treasurePopupR = function() {
	$gameTemp._trBatNeedPopUp = false;
	if (!this._enemiesTreasure) {this._enemiesTreasure = []};
	for (var i = 0; i < this._enemySprites.length; i++) {
		 if (this._enemySprites[i]._enemy && this._enemySprites[i]._enemy._treasure.needPopup) {
			 this._enemySprites[i]._enemy._treasure.needPopup = false;
		     this._enemiesTreasure[i] = new SpriteEnemyTrP(this._enemySprites[i]);
		     this._enemiesTreasure[i].z = this._enemySprites[i].z ? this._enemySprites[i].z + 1 : 2;
		     this._battleField.addChild(this._enemiesTreasure[i]);
		 };
	};
};

//=============================================================================
// ■■■ Sprite Enemy TrP ■■■
//=============================================================================
function SpriteEnemyTrP() {
    this.initialize.apply(this, arguments);
};

SpriteEnemyTrP.prototype = Object.create(Sprite.prototype);
SpriteEnemyTrP.prototype.constructor = SpriteEnemyTrP;

//==============================
// ♦ ALIAS ♦ Initialize
//==============================
SpriteEnemyTrP.prototype.initialize = function(sprite) {
    Sprite.prototype.initialize.call(this);	
	this._sprite = sprite;
	this._mode = Moghunter.trPopup_animation;
	this.visible = false;
	this._enemy = this._sprite._enemy;
    this.createIcon();
	if ($gameTemp._trBatRealTimeDrop) {
		$gameTemp._trBatDropLock = true;
		this.gainDropItemsIcons();
	};
};

//==============================
// * gainDropItems
//==============================
SpriteEnemyTrP.prototype.gainDropItemsIcons = function() {
    const items = this._enemy._treasure.item;
    for (const item of items) {
        $gameParty.gainItem(item, 1);
    }	
	
};

//==============================
// * create Icon
//==============================
SpriteEnemyTrP.prototype.createIcon = function() {
	this._iconImg = ImageManager.loadSystem("IconSet")
    this._icons = [];
	   for (var i = 0; i < this._enemy._treasure.item.length; i++) {
		 var item = this._enemy._treasure.item[i];
		 if (item) {
			 this._icons[i] = new Sprite(this._iconImg);
			 this._icons[i].item = item;
			 this._icons[i].index = i;
			 this._icons[i].anchor.x = 0.5;
			 this._icons[i].anchor.y = 1;
			 this.refreshIcons(this._icons[i]);
			 this.addChild(this._icons[i]);
			  if (item.QualityAnimationID!= undefined) {
				 if(typeof item.QualityAnimationID === 'number' && !isNaN(item.QualityAnimationID)){
					 var _targets = [];
					 _targets.push(this._icons[i]);
				 BattleManager._spriteset.createAnimationSprite111(_targets,$dataAnimations[item.QualityAnimationID], false, 0);
					
				 }
             }
		 };
	};
	this._icons.sort(function(a, b){return b.intY-a.intY});
	this.children.sort(function(a, b){return b.intY-a.intY});
	for (var i = 0; i < this._icons.length; i++) {
		 this.refreshWait(this._icons[i],i,this._icons.length);
	};
};
/**
 * 创建动画精灵
 * @param {*} targets 
 * @param {*} animation 
 * @param {*} mirror 
 * @param {*} delay 
 */
// prettier-ignore
Spriteset_Base.prototype.createAnimationSprite111 = function(
    targets, animation, mirror, delay
) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = targets;
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};

//==============================
// * refresh Wait
//==============================
SpriteEnemyTrP.prototype.refreshWait = function(sprite,index,maxv) {
	var mv = maxv * 20;
	var mvt = mv - (20 * index)
    sprite.wait = Moghunter.trPopup_fadeDuration + mvt;
};

//==============================
// * refresh Icons
//==============================
SpriteEnemyTrP.prototype.refreshIcons = function(sprite) {
	var w = ImageManager.iconWidth;
	var h = ImageManager.iconHeight;
	var iconindex = sprite.item.iconIndex;
	var sx = iconindex % 16 * w;
	var sy = Math.floor(iconindex / 16) * h;
	var hr = Math.randomInt(h);
    sprite.setFrame(sx,sy,w,h);
	sprite.intY = ((this._sprite.height / 3) + hr) - h;
	sprite.dr = 60;
	sprite.dy = 15;
	sprite.y = -40;
	sprite.ry = sprite.y + sprite.intY;
	var randx = (Math.random() * 0.5) + (sprite.index / 8);
	var rands = Math.randomInt(2);
	sprite.sx = rands === 0 ? randx : -randx;
	sprite.scale.x = Moghunter.trPopup_scale;
	sprite.scale.y = sprite.scale.x;
};

//==============================
// * Update Bounce
//==============================
SpriteEnemyTrP.prototype.updateBounce = function(sprite) {
	 sprite.dy += 0.6;
	 sprite.ry += sprite.dy;
	 if (sprite.ry >= 0) {
		 sprite.ry = 0;
		 sprite.dy *= -0.7;
	 };
	 sprite.y = -sprite.intY + Math.round(sprite.ry);
	 if (sprite.y < -sprite.intY) {sprite.x += sprite.sx};	
	 if (sprite.y === -sprite.intY) {this.updateFade(sprite)}; 
};

//==============================
// * Update Float
//==============================
SpriteEnemyTrP.prototype.updateFloat= function(sprite) {
	sprite.wait--;
	if (sprite.wait > 0) {return};	
    sprite.y -= 3
	sprite.opacity -= 8; 
};

//==============================
// * Update Animation
//==============================
SpriteEnemyTrP.prototype.updateAnimation= function(sprite) {
   if (this._mode === 1) {
	   this.updateFloat(sprite);
   } else {
       this.updateBounce(sprite);
   };
};

//==============================
// * Update Fade
//==============================
SpriteEnemyTrP.prototype.updateFade = function(sprite) {
	sprite.wait--;
	if (sprite.wait > 0) {return};
	sprite.opacity -= 15;
	sprite.scale.x -= 0.05
	sprite.scale.y += 0.15
};

//==============================
// * Update Sprites
//==============================
SpriteEnemyTrP.prototype.updateSprites = function(sprite) {
	 this.visible = true;
     this.updateAnimation(sprite);
	 if (sprite.opacity <= 0) {sprite.visible = false};
};

//==============================
// * Update
//==============================
SpriteEnemyTrP.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	this.x = this._sprite.x;
	this.y = this._sprite.y;
	if (this._iconImg.isReady()) {
		for (var i = 0; i < this._icons.length; i++) {
			if (this._icons[i].visible) {this.updateSprites(this._icons[i])};
		};
	};
};


//=============================================================================
// DataManager
//=============================================================================	
var $dataQualitysAnimation = [null];


DataManager.qualityANIDatabaseAdd = function(id, data) {
	
    if (!data) return $dataQualitysAnimation.push(null);
    var DuangQualityName = data['DuangQualityName'];
    var DuangQualityNote = data['DuangQualityNote'];
	var AnimationID = data['AnimationID'];
	var IsEnable = data['IsEnable'];
    var DuangQuality = {
        DuangQualityName: DuangQualityName,
		AnimationID:AnimationID,
        id: id,
        DuangQualityNote: DuangQualityNote,
        IsEnable: IsEnable
    };
	if(IsEnable=='true'){
		$dataQualitysAnimation.push(DuangQuality);
	}
   
};	
	
DataManager.qualityANIDatabaseCreate = function() {
    for (var i = 1; i <= 15; ++i) {
        var qualityData = JSON.parse(Moghunter.parameters['DuangQuality ' + i] || 'null');
        if (qualityData) {
			this.qualityANIDatabaseAdd(i, qualityData);
		}
    }

};

Moghunter.DataANIManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
 if (!Moghunter.DataANIManager_isDatabaseLoaded.call(this)) return false;
    if (!Moghunter._qualitysAnimationloaded) {
		
		this.qualityANIDatabaseCreate();
		this.processDuangQualityAnitags1($dataWeapons);
		this.processDuangQualityAnitags1($dataArmors);
		this.processDuangQualityAnitags1($dataItems);
        Moghunter._qualitysAnimationloaded = true;
    }
    return true;
};

DataManager.processDuangQualityAnitags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    obj.QualityAnimationID = undefined;
    var qualityAnimationID 	=this.getQualityAnimationID(obj);
	if(qualityAnimationID!=0){
		obj.QualityAnimationID = parseInt(qualityAnimationID);
	}
	var notedata = obj.note.split(/[\r\n]+/);
	for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
	  if (line.match(/<(?:Drop AnimationID):[ ](\d+)>/i)) {
		  obj.QualityAnimationID= parseInt(RegExp.$1);
	  }
    }
  }
};
 

DataManager.getQualityAnimationID = function (item) {
	var boo=0;
	if($dataQualitysAnimation.length>0){	
		for (var i = 0; i < $dataQualitysAnimation.length; ++i) {
			var qualityData = $dataQualitysAnimation[i];
			if (qualityData) {	
					  var DuangQualityNote = qualityData.DuangQualityNote;
					  if(this.validQualityAni(item,DuangQualityNote)){
						 boo=qualityData.AnimationID;
						 break;
					  }		
			}
		}
	}
	return boo;
}

DataManager.validQualityAni = function (item,DuangQualityNote) {
	if(item.meta.length!=0){
		if(DuangQualityNote.indexOf("<") != -1&&DuangQualityNote.indexOf(":") != -1&&DuangQualityNote.indexOf(">") != -1){	
			if(DuangQualityNote.length>4){
				var a = DuangQualityNote.indexOf("<");
				var b = DuangQualityNote.indexOf(":", a);
				var a2 = DuangQualityNote.indexOf(">");
				var c = DuangQualityNote.substring(a+1,b);
				var cc = DuangQualityNote.substring(b+1,a2);
				if(item.meta[c]==cc){
					return true;
				}else{
					return false;
				}
			}			
		}		
	}
	var notedata = item.note.split(/[\r\n]+/);
	if(notedata.indexOf(DuangQualityNote) != -1){
		return true;
	}else{
		return false;
	}
}
