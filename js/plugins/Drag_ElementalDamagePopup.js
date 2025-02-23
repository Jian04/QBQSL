//=============================================================================
// Drag_ElementalDamagePopup.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 允许根据元素自定义伤害弹出窗口
 * @author Drag
 * @version 1.0.0
 * @url https://discord.gg/ckYyc8hHGb
 *
 * @help 
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 * 发现一个bug，想提个建议吗？你可以在我的discord服务器上找到我。
 *
 * 这个插件可以让你在战斗中自定义元素伤害弹出窗口。
 *
 * 特点 :
 *
 * - 为所有元素设置十六进制颜色
 * - 字体大小
 * - 轮廓颜色和宽度（rgba颜色）
 *
 *
 * @param elementalColors
 * @type struct<elementalColors>[]
 * @text Elemental Colors
 * @default ["{\"name\":\"\",\"color\":\"\"}"]
 *
 * @param fontSize
 * @type number
 * @text Font Size
 * @desc 损坏弹出窗口的字体大小，默认为空
 *
 * @param outlineColor
 * @type struct<outlineColor>
 * @text Outline Color
 * @default {"red":"0","green":"0","blue":"0","alpha":"0.7"}
 *
 * @param outlineWidth
 * @type number
 * @text Outline Width
 * @desc 损坏弹出窗口的轮廓宽度
 * @default 4
*/
/*~struct~elementalColors:
 * @param name
 * @type text
 * @text Element ID/Name
 * @desc 数据库中元素的名称
 * @default
 *
 * @param color
 * @type text
 * @text Color
 * @desc 您希望此元素的伤害弹出窗口为六色吗
 * @default #ffffff
 */
 /*~struct~outlineColor:
 * @param red
 * @type number
 * @text Red
 * @desc 轮廓颜色的红色RGBA值
 * @default 0
 * @min 0
 * @max 255
 *
 * @param green
 * @type number
 * @text Green
 * @desc 轮廓颜色的绿色RGBA值
 * @default 0
 * @min 0
 * @max 255
 *
 * @param blue
 * @type number
 * @text Blue
 * @desc 轮廓颜色的蓝色RGBA值
 * @default 0
 * @min 0
 * @max 255
 *
 * @param alpha
 * @type text
 * @text Alpha
 * @desc 轮廓颜色的Alpha RGBA值（介于0和1之间）
 * @default 0.7
 */

var Imported = Imported || {};
Imported.DragElementalDamagePopup = true;

var Drag = Drag || {};
Drag.elementalDamagePopup = Drag.elementalDamagePopup || {};

(function() {
	
	Drag.elementalDamagePopup.pluginName = "Drag_ElementalDamagePopup";
	
	Drag.elementalDamagePopup.params = PluginManager.parameters(Drag.elementalDamagePopup.pluginName) || null;
	if (Drag.elementalDamagePopup.params) {
		Drag.elementalDamagePopup.params.fontSize = !isNaN(parseInt(Drag.elementalDamagePopup.params.fontSize)) ? parseInt(Drag.elementalDamagePopup.params.fontSize) : null;
		Drag.elementalDamagePopup.params.outlineWidth = !isNaN(parseInt(Drag.elementalDamagePopup.params.outlineWidth)) ? parseInt(Drag.elementalDamagePopup.params.outlineWidth) : 4;
		
		try {
			let elementalColors = [];
			for (let params of JSON.parse(Drag.elementalDamagePopup.params.elementalColors)) { 
				let parsedParams = JSON.parse(params);
				parsedParams.name = parsedParams.name || -1;
				parsedParams.color = parsedParams.color || "#FFFFFF";
				elementalColors.push(parsedParams.name, parsedParams.color);
			}
			Drag.elementalDamagePopup.params.elementalColors = elementalColors;
		} catch {
			Drag.elementalDamagePopup.params.elementalColors = [];
		}
		
		Drag.elementalDamagePopup.params.outlineColor = Drag.elementalDamagePopup.params.outlineColor || '{"red":"0","green":"0","blue":"0","alpha":"0.7"}';
		let parsedParams = JSON.parse(Drag.elementalDamagePopup.params.outlineColor);
		parsedParams.red = !isNaN(parseInt(parsedParams.red)) ? parseInt(parsedParams.red) : 0;
		parsedParams.green = !isNaN(parseInt(parsedParams.green)) ? parseInt(parsedParams.green) : 0;
		parsedParams.blue = !isNaN(parseInt(parsedParams.blue)) ? parseInt(parsedParams.blue) : 0;
		parsedParams.alpha = !isNaN(parseFloat(parsedParams.alpha)) ? parseFloat(parsedParams.alpha) : 0.7;
		Drag.elementalDamagePopup.params.outlineColor = parsedParams;
	}
	
	var Drag_Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		Drag_Game_Action_executeDamage.apply(this, arguments);
		const result = target.result();
		let skill = $dataSkills[this._item._itemId];
		let skillElementId = skill.damage.elementId
		result.elementId = skillElementId;
	};	

	var Drag_Sprite_Damage_setup = Sprite_Damage.prototype.setup;
	Sprite_Damage.prototype.setup = function(target) {
		this._result = target.result();
		Drag_Sprite_Damage_setup.apply(this, arguments);
	};

	Sprite_Damage.prototype.fontSize = function() {
		return Drag.elementalDamagePopup.params.fontSize || $gameSystem.mainFontSize() + 4;
	};

	Sprite_Damage.prototype.damageColor = function() {
		let elementId = this._result.elementId;
		let elementName = $dataSystem.elements[elementId];
		let index = Drag.elementalDamagePopup.params.elementalColors.indexOf(elementName);
		if (index > -1) {
			return Drag.elementalDamagePopup.params.elementalColors[index + 1];
		}
		return ColorManager.damageColor(this._colorType);
	};

	Sprite_Damage.prototype.outlineColor = function() {
		return `rgba(${Drag.elementalDamagePopup.params.outlineColor.red}, ${Drag.elementalDamagePopup.params.outlineColor.green}, ${Drag.elementalDamagePopup.params.outlineColor.blue}, ${Drag.elementalDamagePopup.params.outlineColor.alpha})`;
	};

	Sprite_Damage.prototype.outlineWidth = function() {
		return Drag.elementalDamagePopup.params.outlineWidth;
	};

	Sprite_Damage.prototype.createMiss = function() {
		const h = this.fontSize();
		const w = Math.floor(h * 3.0);
		const sprite = this.createChildSprite(w, h);
		sprite.bitmap.drawText("Miss", 0, 0, w, h, "center");
		sprite.dy = 0;
	};

	Sprite_Damage.prototype.createDigits = function(value) {
		const string = Math.abs(value).toString();
		const h = this.fontSize();
		const w = Math.floor(h * 0.75);
		for (let i = 0; i < string.length; i++) {
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
			sprite.x = (i - (string.length - 1) / 2) * w;
			sprite.dy = -i;
		}
	};	
})();