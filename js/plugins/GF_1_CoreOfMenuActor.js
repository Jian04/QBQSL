//=============================================================================
// Ganfly Plugins - CoreOfMenuActor
// GF_1_CoreOfMenuActor.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_1_CoreOfMenuActor = true;

var GF = GF || {};
GF.COMA = GF.COMA || {};
GF.COMA.version = 1.0;
GF.COMA.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        系统 - 角色信息框核心
 * @author ganfly
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 * @orderAfter GF_1_CoreOfSeniorGauge
 * @base GF_1_CoreOfSeniorGauge
 * @orderAfter GF_1_CoreOfSpriteUI
 * @base GF_1_CoreOfSpriteUI
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 用于各种界面的角色信息框，你需要为信息框配置各种参数条，背景，前景，
 * 角色姓名，头像，状态图标等。
 * 这些配置的样式将会显示在子插件作用的界面内，例如主菜单界面、物品界面。
 *
 * 对于信息框中的角色头像，默认为系统头像/地图模型/战斗模型，你可以为每
 * 个角色设置自定义立绘，
 * 还可以在不同信息框样式中使用不同自定义立绘。 
 * 
 * ============================================================================
 *  前置需求
 * ============================================================================
 *
 * 这个插件只能在RPGMakerMZ上运行。
 *
 * ---- 前置插件列表 ----
 *
 * GF_1_CoreOfSeniorGauge     系统 - 高级参数条核心
 * GF_1_CoreOfSpriteUI        系统 - 精灵UI核心
 *
 * ---- 第1层 ----
 *
 * 这个插件是第1层插件，必须放在第0层下面，所有2，3，4，5层GF插件的上面。 
 *     
 * ============================================================================
 *  插件指令
 * ============================================================================
 *
 *  改变角色自定义立绘
 *
 * ============================================================================
 *  用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 *  更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Commands
 * @ ==========================================================================
 *
 * @command ChangeFaceSet
 * @text 改变角色自定义立绘
 * @desc 改变角色自定义立绘
 *
 * @arg FaceSetId
 * @text 自定义立绘Id
 * @type number
 * @min 1
 * @desc 要修改的自定义立绘Id，填自定义立绘列表id值
 * @default 1
 *
 * @arg Custom Face File
 * @text 资源-立绘
 * @desc 自定义立绘的图片资源。
 * @type file[]
 * @require 1
 * @dir img/
 * @default [""]
 *
 * @arg updateFlash
 * @text 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @arg Actor Id
 * @text 立绘绑定角色id
 * @type actor
 * @desc 立绘绑定角色id。
 * @default 1
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param MenuActorStyle
 * @text 信息框样式
 * @type struct<MenuActorStyle>[]
 * @desc 配置信息框的样式信息。
 * @default []
 *
 * @param CustomFaceSet
 * @text 自定义立绘
 * @type struct<CustomFaceSet>[][]
 * @desc 配置自定义立绘。
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<MenuActorStyle>
 * ---------------------------------------------------------------------------
 */
/*~struct~MenuActorStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的角色信息样式==
 *
 * @param MainPart
 * @text ----总体设置----
 * @desc 
 *
 * @param Background Set
 * @text 信息框背景布局
 * @parent MainPart
 * @type file
 * @dir img/
 * @require 1
 * @desc 信息框背景布局
 * @default 
 *
 * @param Foreground Set
 * @text 信息框前景设置
 * @parent MainPart
 * @type struct<ForegroundSet>
 * @desc 信息框前景设置
 * @default {"Foreground File":"","Foreground X":"0","Foreground Y":"0"}
 *
 * @param PageButtonBitmapUp
 * @text 翻页按钮贴图-上一页
 * @parent MainPart
 * @type file
 * @require 1
 * @dir img/
 * @desc 自定义翻页按钮贴图-上一页
 * @default
 *
 * @param PageButtonBitmapDown
 * @text 翻页按钮贴图-下一页
 * @parent MainPart
 * @type file
 * @require 1
 * @dir img/
 * @desc 自定义翻页按钮贴图-下一页
 * @default
 *
 * @param Meter Set
 * @text ----参数条组合设置----
 * @desc 
 * 
 * @param HP Meter Set
 * @text 生命-参数条组合设置
 * @parent Meter Set
 * @type struct<PointMeterSet>
 * @desc 生命-参数条组合设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 * 
 * @param MP Meter Set
 * @text 魔法-参数条组合设置
 * @parent Meter Set
 * @type struct<PointMeterSet>
 * @desc 魔法-参数条组合设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 *
 * @param TP Meter Set
 * @text 怒气-参数条组合设置
 * @parent Meter Set
 * @type struct<PointMeterSet>
 * @desc 怒气-参数条组合设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 *
 * @param EXP Meter Set
 * @text 经验-参数条组合设置
 * @parent Meter Set
 * @type struct<PointMeterSet>
 * @desc 经验-参数条组合设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 *
 * @param LV Meter Set
 * @text 等级-参数条组合设置
 * @parent Meter Set
 * @type struct<PointMeterSet>
 * @desc 等级-参数条组合设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 *
 * @param Custom Meter Set
 * @text 自定义参数条组合-设置
 * @parent Meter Set
 * @type struct<CustomMeterSet>[]
 * @desc 自定义参数条组合-设置
 * @default []
 *
 * @param Extra
 * @text ----其他设置----
 * @desc 
 * 
 * @param Name Set
 * @text 姓名显示设置
 * @parent Extra
 * @type struct<NameSet>
 * @desc 姓名显示设置
 * @default {"Show Name":"true","Name X":"0","Name Y":"0","Name Font Size":"18","Name Align":"左对齐"}
 *
 * @param Class Set
 * @text 职业显示设置
 * @parent Extra
 * @type struct<ClassSet>
 * @desc 职业显示设置
 * @default {"Show Class":"true","Class X":"94","Class Y":"51","Class Font Size":"20","Class Align":"左对齐"}
 *
 * @param State Icon Set
 * @text 状态显示设置
 * @parent Extra
 * @type struct<StateIconSet>
 * @desc 状态显示设置
 * @default {"Show State Icon":"true","State Icon X":"200","State Icon Y":"-32","State Icon Show Type":"单一闪烁","State Icon Align":"左对齐","State Icon Space":"0","State Icon Max":"4"}
 *
 * @param Face Set
 * @text 头像显示设置
 * @parent Extra
 * @type struct<FaceSet>
 * @desc 头像显示设置
 * @default {"Show Face":"true","FaceLevel":"显示在背景上方","FaceType":"显示默认头像","Face X":"40","Face Y":"-100","Face Scale":"0.70"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<PointMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~PointMeterSet:
 *
 * @param Show Meter
 * @text 是否显示参数条组合
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示参数条组合
 * @default false
 *
 * @param Meter Style
 * @text 参数条组合样式
 * @parent Show Meter
 * @type number
 * @min 0
 * @desc 参数条组合的样式，对应高级参数条核心中的配置的id值。
 * @default 0
 *
 * @param Meter X
 * @text 平移-参数条组合 X
 * @parent Show Meter
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param Meter Y
 * @text 平移-参数条组合 Y
 * @parent Show Meter
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ForegroundSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ForegroundSet:
 *
 * @param Foreground File
 * @text 资源-信息框前景
 * @desc 信息框的图片资源。
 * @type file
 * @require 1
 * @dir img/
 * @default 
 *
 * @param Foreground X
 * @text 平移-信息框前景 X
 * @desc 修正校对图片的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param Foreground Y
 * @text 平移-信息框前景 Y
 * @desc 修正校对图片的位置用，y轴方向平移，单位像素。
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NameSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~NameSet:
 *
 * @param Show Name
 * @text 是否显示姓名
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param Name X
 * @text 平移-姓名 X
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 94
 *
 * @param Name Y
 * @text 平移-姓名 Y
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 51
 * 
 * @param Name Font Size
 * @text 姓名字体大小
 * @type number
 * @min 1
 * @desc 姓名的字体大小。
 * @default 20
 * 
 * @param Name Align
 * @text 姓名文字朝向
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 姓名文字朝向。
 * @default 左对齐
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<ClassSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ClassSet:
 *
 * @param Show Class
 * @text 是否显示职业
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param Class X
 * @text 平移-职业 X
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 94
 *
 * @param Class Y
 * @text 平移-职业 Y
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 51
 * 
 * @param Class Font Size
 * @text 职业字体大小
 * @type number
 * @min 1
 * @desc 职业的字体大小。
 * @default 20
 * 
 * @param Class Align
 * @text 职业文字朝向
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 职业文字朝向。
 * @default 左对齐
 *
 */
/* ---------------------------------------------------------------------------
 * struct<StateIconSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~StateIconSet:
 *
 * @param Show State Icon
 * @text 是否显示状态
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param State Icon X
 * @text 平移-状态 X
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 229
 *
 * @param State Icon Y
 * @text 平移-状态 Y
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 62
 *
 * @param State Icon Show Type
 * @text 状态显示模式
 * @type select
 * @option 单一闪烁
 * @value 单一闪烁
 * @option 直线并排
 * @value 直线并排
 * @desc 状态显示的模式。
 * @default 单一闪烁
 *
 * @param State Icon Align
 * @text 状态对齐方式
 * @parent State Icon Show Type
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 右对齐
 * @value 右对齐
 * @option 上对齐
 * @value 上对齐
 * @option 下对齐
 * @value 下对齐
 * @desc 直线并排的状态的对齐方式。
 * @default 左对齐
 *
 * @param State Icon Space
 * @text 状态间距
 * @parent State Icon Show Type
 * @type number
 * @min 0
 * @desc 直线并排的状态之间的间距，单位像素。
 * @default 0
 *
 * @param State Icon Max
 * @text 最大显示状态数量
 * @parent State Icon Show Type
 * @type number
 * @min 1
 * @desc 直线并排能显示的状态的最大数量。超过数量的状态图标不会被显示。
 * @default 4
 *
 */
/* ---------------------------------------------------------------------------
 * struct<FaceSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~FaceSet:
 *
 * @param Show Face
 * @text 是否显示头像
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param FaceLevel
 * @text 头像显示层级
 * @parent Show Face
 * @type select
 * @option 显示在背景上方
 * @value 显示在背景上方
 * @option 显示在背景下方
 * @value 显示在背景下方
 * @desc 头像显示层级
 * @default 显示在背景上方
 *
 * @param FaceType
 * @text 头像显示类型
 * @parent Show Face
 * @type select
 * @option 显示默认头像
 * @value 显示默认头像
 * @option 显示地图模型
 * @value 显示地图模型
 * @option 显示战斗模型
 * @value 显示战斗模型
 * @option 显示自定义立绘
 * @value 显示自定义立绘
 * @desc 头像显示类型
 * @default 显示默认头像
 * 
 * @param CustomFaceId
 * @text 自定义立绘Id
 * @parent FaceType
 * @type number
 * @min 1
 * @desc 头像显示类型为’显示自定义立绘‘时的自定义立绘Id，填自定义立绘列表id值
 * @default 1
 *
 * @param Face X
 * @text 平移-头像 X
 * @parent Show Face
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。可为负数。
 * @default 6
 *
 * @param Face Y
 * @text 平移-头像 Y
 * @parent Show Face
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。可为负数。
 * @default 6
 *
 * @param Face Scale
 * @text 缩放比例-头像
 * @parent Show Face
 * @type number
 * @decimals 2
 * @min 0.00
 * @desc 缩放比例-头像
 * @default 0.70
 *
 */
/* ---------------------------------------------------------------------------
 * struct<CustomFaceSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~CustomFaceSet:
 *
 * @param Custom Face File
 * @text 资源-立绘
 * @desc 自定义立绘的图片资源。
 * @type file[]
 * @require 1
 * @dir img/
 * @default [""]
 *
 * @param updateFlash
 * @text 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param Actor Id
 * @text 立绘绑定角色id
 * @type actor
 * @desc 立绘绑定角色id。
 * @default 1
 *
 */
/* ---------------------------------------------------------------------------
 * struct<CustomMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~CustomMeterSet:
 *
 * @param Custom Meter Current
 * @text 自定义参数条-当前数值代码
 * @desc 当前数值代码，this.actor()代表当前角色。
 * @default this.actor().hp
 *
 * @param Custom Meter Max
 * @text 自定义参数条-最大数值代码
 * @desc 最大数值代码，this.actor()代表当前角色。
 * @default this.actor().mhp
 *
 * @param Custom Meter Set
 * @text 自定义参数条-设置
 * @type struct<PointMeterSet>
 * @desc 自定义参数条-设置
 * @default {"Show Meter":"true","Meter Style":"0","Meter X":"10","Meter Y":"10"}
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.COMA.pluginName);
GF.Param = GF.Param || {};

GF.Param.COMAMenuActorStyle = JSON.parse(GF.Parameters['MenuActorStyle']);
GF.Param.COMACustomFaceSet = JSON.parse(GF.Parameters['CustomFaceSet']);

//=============================================================================
// MenuActorDataManager
//=============================================================================

GF.COMA.MenuActorStyleList = [null];
GF.COMA.CustomFaceList = [null];

class MenuActorDataManager {
	static initDatabase() {
		this.menuActorDatabaseCreate();
		this.customFaceDatabaseCreate();
	}
	
	static menuActorDatabaseCreate() {
		GF.COMA.MenuActorStyleList = [null];
        const list = GF.Param.COMAMenuActorStyle;
        for (let i = 1; i <= list.length; i++) {
            let gmData = JSON.parse(list[i - 1] || null);
            if (gmData) {
                this.initMenuActorData(i, gmData);
            }
        }
	}
	
	static initMenuActorData(id, data) {
		const Style = {
			background_set: String(data['Background Set']),
			pageBtn_up: String(data['PageButtonBitmapUp']),
			pageBtn_down: String(data['PageButtonBitmapDown']),
			foreground_set: this.initForgroundData(data['Foreground Set']),
			hp_meter_set: this.initPointMeterData(data['HP Meter Set']),
			mp_meter_set: this.initPointMeterData(data['MP Meter Set']),
			tp_meter_set: this.initPointMeterData(data['TP Meter Set']),
			exp_meter_set: this.initPointMeterData(data['EXP Meter Set']),
			lv_meter_set: this.initPointMeterData(data['LV Meter Set']),
			custom_meter_set: this.initCustomPointMeterData(data['Custom Meter Set']),
			name_set: this.initNameData(data['Name Set']),
			class_set: this.initClassData(data['Class Set']),
			state_icon_set: this.initStateIconData(data['State Icon Set']),
			face_set: this.initFaceData(data['Face Set'])
		};
		GF.COMA.MenuActorStyleList[id] = Style;
	}
	
	static initForgroundData(data) {
		data = JSON.parse(data);
		const Set = {
			foreground_src: String(data['Foreground File']),
			foreground_x: Number(data['Foreground X']),
			foreground_y: Number(data['Foreground Y'])
		};
		return Set;
	}
	
	static initPointMeterData(data) {
		data = JSON.parse(data);
		const Set = {
			meter_enable: eval(data['Show Meter']),
			meter_id: Number(data['Meter Style']),
			meter_x: Number(data['Meter X']),
			meter_y: Number(data['Meter Y'])
		};
		return Set;
	}
	
	static initCustomPointMeterData(datas) {
		datas = JSON.parse(datas);
		const Sets = [];
		for (let i = 0; i < datas.length; ++i) {
			let data = JSON.parse(datas[i]);
			let set = {
				custom_meter_cur: String(data['Custom Meter Current']),
				custom_meter_max: String(data['Custom Meter Max']),
				custom_meter_set: this.initPointMeterData(data['Custom Meter Set'])
			};
			Sets.push(set);
		}
		return Sets;
	}
	
	static initNameData(data) {
		data = JSON.parse(data);
		const Set = {
			name_show: eval(data['Show Name']),
			name_x: Number(data['Name X']),
			name_y: Number(data['Name Y']),
			name_font_size: Number(data['Name Font Size']),
			name_align: String(data['Name Align'])
		};
		return Set;
	}
	
	static initClassData(data) {
		data = JSON.parse(data);
		const Set = {
			class_show: eval(data['Show Class']),
			class_x: Number(data['Class X']),
			class_y: Number(data['Class Y']),
			class_font_size: Number(data['Class Font Size']),
			class_align: String(data['Class Align'])
		};
		return Set;
	}
	
	static initStateIconData(data) {
		data = JSON.parse(data);
		const Set = {
			state_icon_show: eval(data['Show State Icon']),
			state_icon_x: Number(data['State Icon X']),
			state_icon_y: Number(data['State Icon Y']),
			state_icon_show_type: String(data['State Icon Show Type']),
			state_icon_align: String(data['State Icon Align']),
			state_icon_space: Number(data['State Icon Space']),
			state_icon_max: Number(data['State Icon Max'])
		};
		return Set;
	}
	
	static initFaceData(data) {
		data = JSON.parse(data);
		const Set = {
			face_show: eval(data['Show Face']),
			face_level: data['FaceLevel'],
			face_type: data['FaceType'],
			face_custom_id: Number(data['CustomFaceId']),
			face_x: Number(data['Face X']),
			face_y: Number(data['Face Y']),
			face_scale: parseFloat(data['Face Scale'])
		};
		return Set;
	}
	
	static customFaceDatabaseCreate() {
		GF.COMA.CustomFaceList = [null];
        const lists = GF.Param.COMACustomFaceSet;
        for (let i = 0; i < lists.length; i++) {
            const list = JSON.parse(lists[i]);
			const customFaceData = [];
			for (let j = 0; j < list.length; j++) {
				const data = JSON.parse(list[j]);
				customFaceData[Number(data['Actor Id'])] = {
					face_src: JSON.parse(data['Custom Face File']),
					face_flash: Number(data['updateFlash'])
				};
			}
			GF.COMA.CustomFaceList.push(customFaceData);
        }
	}
}
MenuActorDataManager.initDatabase();

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(GF.COMA.pluginName, 'ChangeFaceSet', args => {
	const face_set_id = Number(args['FaceSetId']);
	const face_src = JSON.parse(args['Custom Face File']);
	const face_flash = Number(args['updateFlash']);
	const face_id = Number(args['Actor Id']);
	const data = {
		face_src: face_src,
		face_flash: face_flash
	};
	$gameSystem.setCustomFaceList(face_set_id, face_id, data);
});

//=============================================================================
// Game_System
//=============================================================================

GF.COMA.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	GF.COMA.Game_System_initialize.call(this);
	this._customFaceList = GF.COMA.CustomFaceList;
};

Game_System.prototype.setCustomFaceList = function(set_id, actor_id, data) {
	this._customFaceList[set_id] = this._customFaceList[set_id] || [];
	this._customFaceList[set_id][actor_id] = data;
};

Game_System.prototype.getCustomFaceList = function(set_id, actor_id) {
	this._customFaceList[set_id] = this._customFaceList[set_id] || [];
	return this._customFaceList[set_id][actor_id];
};

//=============================================================================
// Sprite_PartyCommand
//=============================================================================

class Sprite_PartyCommand extends Sprite_CommandWindow {
	initialize(data, styleId) {
		this._styleId = styleId;
		const styleData = GF.COMA.MenuActorStyleList[styleId];
		data.btn_src_file = GF.COMA.layoutSrcFile;
		data.page_up_bitmap = styleData.pageBtn_up;
		data.page_down_bitmap = styleData.pageBtn_down;
		super.initialize(data);
		this.deactivate();
	}
	
	extractBtnParamList(list) {
		const paramList = [];
		const party = $gameParty.members();
		for (const actor of party) {
			const param = {
				symbol: actor.actorId(),
				bitmap: '',
				name: '',
				enable: true
			}
			paramList.push(param);
		}
		return paramList;
	}
	
	getCommandData(inputData) {
		const data = super.getCommandData(inputData);
		data.styleId = this._styleId;
		return data;
	}
	
	addCommand(inputData) {
		const data = this.getCommandData(inputData);
		const commandButton = new Sprite_PartyMember(data);
		this._commands.push(commandButton);
		this.addChild(commandButton);
	}
	
	createNameSprite() {
	}
	
	refreshNameSprite() {
	}
	
	refreshSprite() {
		for (var i = 0; i < this._commands.length; ++i) 
			this._commands[i].refreshSprite();
	}
}

//=============================================================================
// Sprite_PartyMember
//=============================================================================

class Sprite_PartyMember extends Sprite_CommandButton {
	initialize(data) {
		const styleId = data.styleId;
		this._styleData = GF.COMA.MenuActorStyleList[styleId];
		data.bitmap = ImageManager.loadCustomBitmap(this._styleData.background_set);
		super.initialize(data);
		this.bitmap.addLoadListener(this.createAllPart.bind(this));
	}
	
	createButtonName(data) {
	}
	
	createAllPart() {
		this.createFace();
		this.createFaceMask();
		this.createHPMeter();
		this.createMPMeter();
		this.createTPMeter();
		this.createEXPMeter();
		this.createLVMeter();
		this.createCustomMeters();
		this.createForeground();
		this.createStateIcon();
		this.createName();
		this.createActorClass();
	}
	
	createFace() {
		const style_data = this._styleData.face_set;
		if (!style_data.face_show) return;
		this._face = new Sprite_MenuActorFace(style_data, this.symbol());
		const x = Math.floor(style_data.face_x - this.width / 2);
		const y = Math.floor(style_data.face_y - this.height / 2);
		this._face.move(x, y);
		this.addChild(this._face);
	}
	
	createFaceMask() {
		const style_data = this._styleData.face_set;
		if (!style_data.face_show) return;
		if (style_data.face_level === '显示在背景上方') return;
		this._faceMask = new Sprite(this.bitmap);
		this._faceMask.anchor = new Point(0.5, 0.5);
		this.addChild(this._faceMask);
	}
	
	createHPMeter() {
		const style_data = this._styleData.hp_meter_set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		this._hpMeter = new Sprite_PointGauge(temp_data, actorId, 'hp');
		this.addChild(this._hpMeter);
	}
	
	createMPMeter() {
		const style_data = this._styleData.mp_meter_set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		this._mpMeter = new Sprite_PointGauge(temp_data, actorId, 'mp');
		this.addChild(this._mpMeter);
	}
	
	createTPMeter() {
		const style_data = this._styleData.tp_meter_set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		this._tpMeter = new Sprite_PointGauge(temp_data, actorId, 'tp');
		this.addChild(this._tpMeter);
	}
	
	createEXPMeter() {
		const style_data = this._styleData.exp_meter_set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		this._expMeter = new Sprite_PointGauge(temp_data, actorId, 'exp');
		this.addChild(this._expMeter);
	}
	
	createLVMeter() {
		const style_data = this._styleData.lv_meter_set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		this._lvMeter = new Sprite_PointGauge(temp_data, actorId, 'level');
		this.addChild(this._lvMeter);
	}
	
	createCustomMeters() {
		this._customMeters = [];
		const style_datas = this._styleData.custom_meter_set;
		if (!style_datas.length) return;
		for (let i = 0; i < style_datas.length; ++i) {
			let data = style_datas[i];
			let cur = data.custom_meter_cur;
			let max = data.custom_meter_max;
			let set = data.custom_meter_set;
			this.createCustomMeter(set, cur, max);
		}
	}
	
	createCustomMeter(set, cur, max) {
		const style_data = set;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this.symbol();
		const meter = new Sprite_PointGauge(temp_data, actorId, 'custom');
		meter.setCustom(cur, max);
		this.addChild(meter);
		this._customMeters.push(meter);
	}
	
	getMeterData(style_data) {
		const temp_data = JsonEx.makeDeepCopy(GF.COSG.GaugeSetList[style_data.meter_id] || {});
		temp_data.x = Math.floor(style_data.meter_x - this.width / 2);
		temp_data.y = Math.floor(style_data.meter_y - this.height / 2);
		return temp_data;
	}
	
	createForeground() {
		const style_data = this._styleData.foreground_set;
		if (style_data.foreground_src === '') return;
		this._foreground = new Sprite(ImageManager.loadCustomBitmap(style_data.foreground_src));
		const x = Math.floor(style_data.foreground_x - this.width / 2);
		const y = Math.floor(style_data.foreground_y - this.height / 2);
		this._foreground.move(x, y);
		this.addChild(this._foreground);
	}
	
	createStateIcon() {
		const style_data = this._styleData.state_icon_set;
		if (!style_data.state_icon_show) return;
		const x = Math.floor(style_data.state_icon_x - this.width / 2);
		const y = Math.floor(style_data.state_icon_y - this.height / 2);
		if (style_data.state_icon_show_type === '直线并排') {
			const actorId = this.symbol();
			this._stateIcon = new Sprite_MenuStateIcon(x, y, actorId, style_data);
		} else {
			this._stateIcon = new Sprite_StateIcon();
			this._stateIcon.move(x, y);
			this._stateIcon.setup(this.actor());
		}
		this.addChild(this._stateIcon);
	}
	
	createName() {
		const style_data = this._styleData.name_set;
		if (!style_data.name_show) return;
		const data = {};
		data.x = Math.floor(style_data.name_x - this.width / 2);
		data.y = Math.floor(style_data.name_y - this.height / 2);
		data.align = style_data.name_align;
		data.fontSize = style_data.name_font_size;
		const obj = this.actor().actor();
		this._name = new Sprite_ObjName(data);
		this._name.setup(obj);
		this.addChild(this._name);
	}
	
	createActorClass() {
		const style_data = this._styleData.class_set;
		if (!style_data.class_show) return;
		const data = {};
		data.x = Math.floor(style_data.class_x - this.width / 2);
		data.y = Math.floor(style_data.class_y - this.height / 2);
		data.align = style_data.class_align;
		data.fontSize = style_data.class_font_size;
		const obj = this.actor().currentClass();
		this._actorClass = new Sprite_ObjName(data);
		this._actorClass.setup(obj);
		this.addChild(this._actorClass);
	}
	
	refreshSprite() {
		if (this._hpMeter) this._hpMeter.refresh();
		if (this._mpMeter) this._mpMeter.refresh();
		if (this._tpMeter) this._tpMeter.refresh();
		if (this._expMeter) this._expMeter.refresh();
		if (this._lvMeter) this._lvMeter.refresh();
	}
	
	actor() {
		return $gameActors.actor(this.symbol());
	}
}

//=============================================================================
// Sprite_MenuActorFace
//=============================================================================

class Sprite_MenuActorFace extends Sprite {
	initialize(data, actorId) {
		super.initialize();
		this._styleData = data;
		const scale = data.face_scale;
		this.scale = new Point(scale, scale);
		this.setActorId(actorId);
		this._updateTime = 0;
	}
	
	setActorId(actorId) {
		if (actorId === undefined || actorId === null) return;
		this._actorId = actorId;
		this.placebitmap();
	}
	
	placebitmap() {
		const data = this._styleData;
		if (data.face_type === '显示默认头像') {
			this.placeFace();
		} else if (data.face_type === '显示地图模型') {
			this.placeCharacter();
		} else if (data.face_type === '显示战斗模型') {
			this.placeSvBattler();
		} else if (data.face_type === '显示自定义立绘') {
			this.placeCustomImg();
		}
	}
	
	placeFace() {
		this.bitmap = ImageManager.loadFace(this.actor().faceName());
		const index = this.actor().faceIndex();
		const pw = ImageManager.faceWidth;
		const ph = ImageManager.faceHeight;
		const sx = index % 4 * pw;
		const sy = Math.floor(index / 4) * ph;
		this.setFrame(sx, sy, pw, ph);
	}
	
	placeCharacter() {
		this.bitmap = ImageManager.loadCharacter(this.actor().characterName());
		const index = this.actor().characterIndex();
		const big = ImageManager.isBigCharacter(this.actor().characterName());
		const pw = this.bitmap.width / (big ? 3 : 12);
		const ph = this.bitmap.height / (big ? 4 : 8);
		const n = big ? 0: index;
		const sx = ((n % 4) * 3 + 1) * pw;
		const sy = Math.floor(n / 4) * 4 * ph;
		this.setFrame(sx, sy, pw, ph);
	}
	
	placeSvBattler() {
		this.bitmap = ImageManager.loadSvActor(this.actor().battlerName());
		this.bitmap.addLoadListener((() => {
			const cw = this.bitmap.width / 9;
			const ch = this.bitmap.height / 6;
			this.setFrame(cw, 0, cw, ch);
		}).bind(this));
	}
	
	placeCustomImg() {
		const data = this._styleData;
		const actorId = this._actorId;
		const face_custom_id = data.face_custom_id;
		const faceList = $gameSystem.getCustomFaceList(face_custom_id, actorId);
		if (faceList) {
			this._faceList = [];
			for (const face of faceList.face_src) {
				this._faceList.push(ImageManager.loadCustomBitmap(face));
			}
			this.bitmap = this._faceList[0];
		}
	}
	
	update() {
		super.update();
		this._updateTime += 1;
		this.updateFace();
	}
	
	updateFace() {
		const data = this._styleData;
		if (data.face_type !== '显示自定义立绘') return;
		const list = this._faceList;
		if (!list) return;
		if (list.length <= 1) return;
		let time = this._updateTime;
		const actorId = this._actorId;
		const face_custom_id = data.face_custom_id;
		time = time / $gameSystem.getCustomFaceList(face_custom_id, actorId).face_flash;
		time = time % list.length;
		time = Math.floor(time);
		this.bitmap = list[time];
	}
	
	actor() {
		return $gameActors.actor(this._actorId);
	}
}

//=============================================================================
// Sprite_MenuStateIcon
//=============================================================================

class Sprite_MenuStateIcon extends Sprite {
	initialize(x, y, actorId, style_data) {
		super.initialize();
		this.anchor = new Point(0.5, 0.5);
		this.move(x, y);
		this._actorId = actorId;
		this._style_data = style_data;
		this.initStateIcon();
	}
	
	initStateIcon() {
		const style_data = this._style_data;
		this._sprite_tank = [];
		const bitmap = ImageManager.loadSystem('IconSet');
		const iw = ImageManager.iconWidth;
		const ih = ImageManager.iconHeight;
		const space = style_data.state_icon_space;
		const align = style_data.state_icon_align;
		for (let i = 0; i < style_data.state_icon_max; i++) {
			let temp_sprite = new Sprite(bitmap);
			temp_sprite.anchor = new Point(0.5, 0.5);
			temp_sprite.setFrame(0, 0, 0, 0);
			if (align === "右对齐") {
				temp_sprite.x = -1 * i * (iw + space);
			} else if (align === "上对齐") {
				temp_sprite.y = -1 * i * (ih + space);
			} else if (align === "下对齐") {
				temp_sprite.y = 1 * i * (ih + space);
			} else {
				temp_sprite.x = 1 * i * (iw + space);
			}
			this._sprite_tank.push(temp_sprite);
			this.addChild(temp_sprite);
		}
	}
	
	update() {
		super.update();
		this.updateStates();
	}
	
	updateStates() {
		if (!this.actor()) return;
		const icons = this.actor().allIcons();
		const iw = ImageManager.iconWidth;
		const ih = ImageManager.iconHeight;
		for (let i = 0; i < this._sprite_tank.length; i++) {
			let temp_sprite = this._sprite_tank[i];
			let id = Number(icons[i]);
			if (id) {
				let ix = id % 16 * iw;
				let iy = Math.floor(id / 16) * ih;
				temp_sprite.setFrame(ix, iy, iw, ih);
			} else {
				temp_sprite.setFrame(0, 0, 0, 0);
			}
		}
	}
	
	actor() {
		return $gameActors.actor(this._actorId);
	}
}

//=============================================================================
// Sprite_ObjName
//=============================================================================

class Sprite_ObjName extends Sprite {
	initialize(data) {
		this._setData = JsonEx.makeDeepCopy(data);
		this.initData();
		super.initialize();
		this.initMembers();
		this.createBitmap();
	}
	
	initData() {
		const data = this._setData;
		data.x = data.x || 0;
		data.y = data.y || 0;
		data.fontSize = data.fontSize || $gameSystem.mainFontSize();
		data.align = data.align || '左对齐';
	}
	
	initMembers() {
		this._obj = null;
		this._name = "";
		this._textColor = "";
	}
	
	destroy(options) {
		this.bitmap.destroy();
		super.destroy(options);
	}
	
	createBitmap() {
		const data = this._setData;
		const width = this.bitmapWidth();
		const height = this.bitmapHeight();
		this.bitmap = new Bitmap(width, height);
		this.move(data.x, data.y);
	}
	
	bitmapWidth() {
		return 128;
	}
	
	bitmapHeight() {
		return 30;
	}
	
	fontFace() {
		return $gameSystem.mainFontFace();
	}
	
	fontSize() {
		return this._setData.fontSize;
	}
	
	setup(obj) {
		this._obj = obj;
		this.refresh();
	}
	
	refresh() {
		const name = this.name();
		const color = this.textColor();
		if (name !== this._name || color !== this._textColor) {
			this._name = name;
			this._textColor = color;
			this.redraw();
		}
	}
	
	name() {
		return this._obj ? this._obj.name : "";
	}
	
	textColor() {
		if (this._obj && this._obj.textColor) {
			const color = this._obj.textColor;
			if (color !== '') {
				return color;
			}
		}
		return ColorManager.normalColor();
	}
	
	outlineColor() {
		return ColorManager.outlineColor();
	}
	
	outlineWidth() {
		return 3;
	}
	
	redraw() {
		const name = this.name();
		const width = this.bitmapWidth() - 2;
		const height = this.bitmapHeight() - 2;
		const align = this.textAlign();
		this.setupFont();
		this.bitmap.clear();
		this.bitmap.drawText(name, 0, 0, width, height, align);
	}
	
	setupFont() {
		this.bitmap.fontFace = this.fontFace();
		this.bitmap.fontSize = this.fontSize();
		this.bitmap.textColor = this.textColor();
		this.bitmap.outlineColor = this.outlineColor();
		this.bitmap.outlineWidth = this.outlineWidth();
	}
	
	textAlign() {
		const align = this._setData.align;
		if (align === "左对齐") {
			return 'left';
		} else if (align === "居中") {
			return 'center';
		} else if (align === "右对齐") {
			return 'right';
		}
		return 'left';
	}
	
	update() {
		super.update();
		if ($gameParty.inBattle()) {
			this.refresh();
		}
	}
}

//=============================================================================
// Utilities
//=============================================================================

GF.Util = GF.Util || {};

//=============================================================================
// End of File
//=============================================================================