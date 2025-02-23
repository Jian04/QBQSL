//=============================================================================
// GF50 Plugins - EquipAttach
// GF_4_EquipAttach.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_4_EquipAttach = true;

var GF = GF || {};
GF.EAH = GF.EAH || {};
GF.EAH.version = 1.0;
GF.EAH.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        物品 - 装备镶嵌
 * @author ganfly
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 * @orderAfter GF_3_IndependEquipSystem
 * @base GF_3_IndependEquipSystem
 * @orderAfter GF_3_ItemInfoWindow
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 本插件为独立装备系统的装备镶嵌扩展，可以给独立装备添加镶嵌机制。
 * 镶嵌可以给装备增加各种属性。
 *
 * 目前可附加的属性有：
 *
 *    基础/额外/特殊参数/价格改变
 *    攻击属性/状态
 *    Debuff/元素/状态抗性/状态免疫
 *    增加被动状态
 *    增加技能/技能类型
 *    改变物品名/图标/图片色调/前后缀/颜色
 *
 * 另外，可以使用特定物品增加装备的镶嵌槽
 *
 * ============================================================================
 *  前置需求
 * ============================================================================
 *
 * 这个插件只能在RPGMakerMZ上运行。
 *
 * ---- 前置插件列表 ----
 *
 * GF_2_CoreOfItemEquip       系统 - 物品装备核心
 * GF_3_IndependEquipSystem   物品 - 独立装备系统
 *
 * ---- 第4层 ----
 *
 * 这个插件是第4层插件，必须放在第0，1，2，3层下面，所有第5层GF插件的上面。
 *
 * ============================================================================
 *  兼容性
 * ============================================================================
 *
 * ---- 可扩展插件列表 ----
 *
 * GF_3_ItemInfoWindow        控件 - 物品信息窗口
 *
 *     本插件与GF_3_ItemInfoWindow共同使用可以在信息窗口内显示镶嵌物信息
 *
 * GF_2_CoreOfMainMenu        系统 - 主菜单核心
 *
 *     可以在主菜单设置进入镶嵌菜单的按钮
 *     关键字：equipAttach
 *     按钮名称：return '镶嵌';
 *     是否显示按钮：return Imported.GF_4_EquipAttach;
 *     是否允许激活按钮：return true;
 *     按钮激活后效果：运行代码
 *     按钮激活运行代码：SceneManager.push(Scene_EquipAttch);
 *
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ---武器/防具备注
 *
 *   <Augment Slots: x, x, x>
 *   <镶嵌槽: x, x, x>
 *   <Augment Slots>
 *    x
 *    x
 *    x
 *    x
 *   </Augment Slots>
 *   <镶嵌槽>
 *    宝石
 *    灵珠
 *    勋章
 *    印记
 *   </镶嵌槽>
 *
 *   - 设定该武器/防具的镶嵌槽，中间填该镶嵌槽的镶嵌物类型
 *
 *   <No Augment Slots>
 *   <无镶嵌槽>
 *
 *   - 该武器/防具没有镶嵌槽
 *
 *   <Augment Slots Max: x>
 *   <镶嵌槽上限: x>
 *
 *   - 设定该武器/防具的镶嵌槽数量上限，当实际镶嵌槽数量小于该
 *   值时可以使用特定物品增加镶嵌槽, x替换为数量
 *
 *
 * ---物品备注
 *
 *   <Augment: type>
 *    augment effect
 *    augment effect
 *   </Augment: type>
 *   <镶嵌效果: type>
 *    augment effect
 *    augment effect
 *   </镶嵌效果: type>
 *
 *   - 设定该物品为镶嵌物，type为镶嵌物类型，中间填镶嵌后的效果，
 *   这些效果会在移除该镶嵌物以后消失。可以给该物品添加多种类型
 *   的镶嵌物效果，以使得该物品在不同类型镶嵌槽中拥有不同效果
 *
 *   <Augment Attach: type>
 *    augment effect
 *    augment effect
 *   </Augment Attach: type>
 *   <镶嵌附加效果: type>
 *    augment effect
 *    augment effect
 *   </镶嵌附加效果: type>
 *
 *   - 设定该物品为镶嵌物，type为镶嵌物类型，中间填镶嵌后的效果，
 *   这些效果不会在移除该镶嵌物以后消失。可以给该物品添加多种类
 *   型的镶嵌物效果，以使得该物品在不同类型镶嵌槽中拥有不同效果
 *
 *   <Augment Detach: type>
 *    augment effect
 *    augment effect
 *   </Augment Detach: type>
 *   <镶嵌移除效果: type>
 *    augment effect
 *    augment effect
 *   </镶嵌移除效果: type>
 *
 *   - 设定该物品为镶嵌物，type为镶嵌物类型，中间填该镶嵌物移除后
 *   的效果。可以给该物品添加多种类型的镶嵌物效果，以使得该物品
 *   在不同类型镶嵌槽中拥有不同效果
 *
 *   <Augment Attach Eval: type>
 *    item.price += $gameParty.highestLevel();
 *    item.params[0] += $gameParty.highestLevel();
 *   </Augment Attach Eval: type>
 *   <自定义镶嵌附加效果: type>
 *    item.price += $gameParty.highestLevel();
 *    item.params[0] += $gameParty.highestLevel();
 *   </自定义镶嵌附加效果: type>
 *
 *   - 设定该物品为镶嵌物，type为镶嵌物类型，中间填镶嵌后的效果代
 *   码，这些效果不会在移除该镶嵌物以后消失。可以给该物品添加多
 *   种类型的镶嵌物效果，以使得该物品在不同类型镶嵌槽中拥有不同
 *   效果。其中item代表被镶嵌物品，effectItem代表镶嵌物
 *
 *   <Augment Detach Eval: type>
 *    item.price -= $gameParty.highestLevel();
 *    item.params[0] -= $gameParty.highestLevel();
 *   </Augment Detach Eval: type>
 *   <自定义镶嵌移除效果: type>
 *    item.price -= $gameParty.highestLevel();
 *    item.params[0] -= $gameParty.highestLevel();
 *   </自定义镶嵌移除效果: type>
 *
 *   - 设定该物品为镶嵌物，type为镶嵌物类型，中间填该镶嵌物移除后
 *   的效果代码。可以给该物品添加多种类型的镶嵌物效果，以使得该
 *   物品在不同类型镶嵌槽中拥有不同效果。
 *   其中item代表被镶嵌物品，effectItem代表镶嵌物
 *
 *   <Add Augment Slots: x, x, x>
 *   <增加镶嵌槽: x, x, x>
 *   <Add Augment Slots>
 *    Rune
 *    Glyph
 *    Orb
 *    Mark
 *   </Add Augment Slots>
 *   <增加镶嵌槽>
 *    宝石
 *    灵珠
 *    勋章
 *    印记
 *   </增加镶嵌槽>
 *
 *   - 设定该物品可以增加武器/防具的镶嵌槽，中间填增加的镶嵌槽
 *   的镶嵌物类型，注意最终镶嵌槽数量不会超过该武器/防具的镶嵌槽上限
 *
 * ============================================================================
 *  镶嵌效果列表
 * ============================================================================
 *
 * 以下备注请填入<Augment: type>,<Augment Attach: type>, 
 * <Augment Detatch: type> 以添加镶嵌的效果。
 *
 * --- 效果 ---
 *
 *     Param: +x
 *     Param: -x
 *
 *     - 将Param替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK,
 *     BOOST, PRICE, ALL, CURRENT,这将会改变被镶嵌物品的相应属性.
 *     其中BOOST为强化点, PRICE为价格,ALL为所有基础参数，CURRENT
 *     为所有非0基础参数。
 *
 * ---
 *
 *     Param: +x%
 *     Param: -x%
 *
 *     - 将Param替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG,
 *     TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR
 *     这将会按百分比改变被镶嵌物品的相应属性.
 *
 * ---
 *
 *     Cannot Detach
 *
 *     - 这将会使得该镶嵌物无法在镶嵌后被移除
 *
 * ---
 *
 *     Add Attack Element: x
 *     Remove Attack Element: x
 *
 *     - 增加/移除被镶嵌物品的相应攻击属性，x替换为元素id或元素名
 *
 * ---
 *
 *     Add Attack State: x
 *     Add Attack State: x, y%
 *     Remove Attack State: x
 *     Remove Attack State: x, y%
 *
 *     - 增加/移除被镶嵌物品的相应攻击附加状态，x替换为状态id或状态名
 *     y替换为数值，表示附加状态的概率，不填则为100%
 *
 * ---
 *
 *     Add Debuff Rate: param, x%
 *     Add Debuff Rate: param, +x%
 *     Add Debuff Rate: param, -x%
 *     Remove Debuff Rate: param, x%
 *     Remove Debuff Rate: param, +x%
 *     Remove Debuff Rate: param, -x%
 *
 *     - 增加/移除被镶嵌物品的相应Debuff有效度
 *     将param替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     x替换为有效度数值
 *
 * ---
 *    
 *     Add Element Rate: x, y%
 *     Add Element Rate: x, +y%
 *     Add Element Rate: x, -y%
 *     Remove Element Rate: x, y%
 *     Remove Element Rate: x, +y%
 *     Remove Element Rate: x, -y%
 *
 *     - 增加/移除被镶嵌物品的相应元素有效度，x替换为元素id或元素名
 *     y替换为有效度数值
 *
 * ---
 *
 *     Add Passive State: x
 *     Remove Passive State: x
 *
 *     - 增加/移除被镶嵌物品的被动状态，x替换为状态id或状态名
 *     需要 GF_2_CoreOfSkillState.js的支持.
 *
 * ---
 *
 *     Add Skill: x
 *     Remove Skill: x
 *
 *     - 增加/移除被镶嵌物品的附加技能，x替换为技能id或技能名
 *
 * ---
 *
 *     Add Skill Type: x
 *     Remove Skill Type: x
 *
 *    - 增加/移除被镶嵌物品的附加技能类型，x替换为技能类型id或技能类型名
 *
 * ---
 *
 *     Add State Rate: x, y%
 *     Add State Rate: x, +y%
 *     Add State Rate: x, -y%
 *     Remove State Rate: x, y%
 *     Remove State Rate: x, +y%
 *     Remove State Rate: x, -y%
 *
 *     - 增加/移除被镶嵌物品的状态有效度，x替换为状态id或状态名
 *     y替换为有效度数值
 *
 * ---
 *
 *     Add State Resist: x
 *     Remove State Resist: x
 *
 *     - 增加/移除被镶嵌物品的状态免疫，x替换为状态id或状态名
 *
 * ---
 *
 *     Change Base Name: x
 *     Cancel Base Name: x
 *
 *    - 改变/还原被镶嵌物品的基础名称，x替换为名称
 *    如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Icon: x
 *     Cancel Icon: x
 *
 *     - 改变/还原被镶嵌物品的图标，x替换为图标id
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Picture Hue: x
 *     Cancel Picture Hue: x
 *
 *     - 改变/还原被镶嵌物品的图片色调，x替换为色调值
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Picture Image: x
 *     Cancel Picture Image: x
 *
 *     - 改变/还原被镶嵌物品的图片文件，x替换为文件名
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Prefix: x
 *     Cancel Prefix: x
 *
 *     - 改变/还原被镶嵌物品的前缀，x替换为前缀名
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Priority Name: x
 *     Cancel Priority Name: x
 *
 *     - 改变/还原被镶嵌物品的固有名称，x替换为固有名称
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Suffix: x
 *     Cancel Suffix: x
 *
 *     - 改变/还原被镶嵌物品的后缀，x替换为后缀名
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 *
 * ---
 *
 *     Change Text Color: x
 *     Cancel Text Color: x
 *
 *     - 改变/还原被镶嵌物品的颜色，x替换为颜色id
 *     0-200为基础颜色，200以上为高级颜色
 *     如果有多个此类镶嵌物，则只有首先被镶嵌的才会生效
 * 
 * ============================================================================
 *  插件指令
 * ============================================================================
 * 
 * 显示/隐藏镶嵌物信息
 *
 * 显示/隐藏镶嵌物图标
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 *
 *  SceneManager.push(Scene_EquipAttch);
 *            进入镶嵌界面
 *
 *  $gameSystem.setEquipAttachShowInfo(value);
 *            设置显示/隐藏镶嵌物信息，value替换为true/false
 *
 *  $gameSystem.setEquipAttachShowSlot(value);
 *            设置显示/隐藏镶嵌物图标，value替换为true/false
 *
 *  $gameSystem.isEquipAttachShowInfo();
 *            返回显示/隐藏镶嵌物信息的值true/false
 *
 *  $gameSystem.isEquipAttachShowSlot();
 *            返回显示/隐藏镶嵌物图标的值true/false
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
 * @command EquipAttachShowInfo
 * @text 显示/隐藏镶嵌物信息
 * @desc 显示/隐藏物品信息窗口的镶嵌物信息
 *
 * @arg value
 * @text 显示/隐藏
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 显示/隐藏镶嵌物信息，这会覆盖插件参数中的设置
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EquipAttachShowSlot
 * @text 显示/隐藏镶嵌物图标
 * @desc 显示/隐藏物品名上的镶嵌物图标
 *
 * @arg value
 * @text 显示/隐藏
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 显示/隐藏物品名上的镶嵌物图标，这会覆盖插件参数中的设置
 * @default true
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 *
 * @param Default
 * @text ----默认设置----
 * @default
 *
 * @param Weapon Slots
 * @text 武器默认镶嵌槽
 * @parent Default
 * @type text[]
 * @desc 武器默认镶嵌槽
 * @default []
 *
 * @param Armor Slots
 * @text 防具默认镶嵌槽
 * @parent Default
 * @type text[]
 * @desc 防具默认镶嵌槽
 * @default []
 *
 * @param MaxSlots
 * @text 默认镶嵌槽上限
 * @parent Default
 * @type number
 * @min 0
 * @desc 默认镶嵌槽上限
 * @default 0
 *
 * @param ShowSet
 * @text ----显示设置----
 * @default
 *
 * @param ShowAugmentInfo
 * @text 是否显示镶嵌物信息
 * @parent ShowSet
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在物品信息窗口中显示镶嵌物信息，需要GF_3_ItemInfoWindow支持
 * @default true
 *
 * @param ShowAugmentSlot
 * @text 是否显示镶嵌物图标
 * @parent ShowSet
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在物品名上面显示镶嵌物图标
 * @default true
 *
 * @param No Augment Text
 * @text 无镶嵌物用语
 * @parent ShowSet
 * @desc 无镶嵌物用语.
 * @default \c[7]空槽
 *
 * @param NoAugmentIcon
 * @text 无镶嵌物图标
 * @parent ShowSet
 * @type number
 * @min 0
 * @desc 无镶嵌物图标
 * @default 16
 *
 * @param AugmentEffectText
 * @text 镶嵌效果用语
 * @parent ShowSet
 * @desc 镶嵌效果用语.
 * @default 镶嵌效果
 *
 * @param CanotDetachText
 * @text 不可移除用语
 * @parent ShowSet
 * @desc 不可移除用语.
 * @default 不可移除
 *
 * @param DetachText
 * @text 移除用语
 * @parent ShowSet
 * @desc 移除用语.
 * @default 移除
 *
 * @param AddSlotText
 * @text 增加镶嵌槽用语
 * @parent ShowSet
 * @desc 增加镶嵌槽用语.
 * @default 增加镶嵌槽
 *
 * @param AddSlotNumText
 * @text 可增加镶嵌槽数量用语
 * @parent ShowSet
 * @desc 可增加镶嵌槽数量用语.
 * @default 可打孔
 *
 * @param AttachMenuSet
 * @text ----镶嵌菜单设置----
 * @default
 *
 * @param MainLayoutFile
 * @text 资源-整体布局
 * @parent AttachMenuSet
 * @type file
 * @dir img/
 * @require 1
 * @desc 镶嵌菜单界面的整体布局。
 * @default 
 *
 * @param HelpWindowSet
 * @text 物品帮助窗口设置
 * @parent AttachMenuSet
 * @type struct<HelpWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"283","WindowY":"650","WindowWidth":"800","WindowHeight":"108","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"0\",\"SlideY\":\"80\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"-50\"}"}
 *
 * @param AttachEquipWindowSet
 * @text 可镶嵌装备列表窗口设置
 * @parent AttachMenuSet
 * @type struct<AttachEquipWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowCellBg":"true","WindowX":"170","WindowY":"180","WindowWidth":"740","WindowHeight":"210","WindowCols":"9","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param AugmentWindowSet
 * @text 镶嵌物列表窗口设置
 * @parent AttachMenuSet
 * @type struct<AttachEquipWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowCellBg":"true","WindowX":"170","WindowY":"390","WindowWidth":"740","WindowHeight":"210","WindowCols":"9","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param SlotWindowSet
 * @text 镶嵌槽窗口设置
 * @parent AttachMenuSet
 * @type struct<SlotWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowCellBg":"true","WindowCoodType":"常规直线排布","WindowCoodList":"[]","WindowX":"910","WindowY":"280","WindowWidth":"200","WindowHeight":"320","WindowCols":"2","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param MainItemWindowSet
 * @text 待镶嵌装备窗口设置
 * @parent AttachMenuSet
 * @type struct<MainItemWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowCellBg":"true","WindowX":"910","WindowY":"180","WindowWidth":"100","WindowHeight":"100","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param InfoWindowSet
 * @text 物品信息窗口设置
 * @parent AttachMenuSet
 * @type struct<InfoWindowSet>
 * @desc 窗口设置，需要GF_3_ItemInfoWindow支持
 * @default {"General":"","ShowWindow":"true","WindowSkin":"Window","WindowScale":"0.6","WindowBack":"true","WindowOutline":"true","WindowOutlineWidth":"2","ShowBigIcon":"true","FixWindow":"false","Fix":"","WindowX":"0","WindowY":"0","WindowWidth":"50","WindowHeight":"50","WindowLayout":"{\"LayoutType\":\"隐藏布局\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"25\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","FixMaxCols":"false","ScrollSpeed":"4","Float":"","OffsetX":"0","OffsetY":"0","OffsetWidth":"0","OffsetHeight":"0","ShowWindowSkin":"false"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<HelpWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~HelpWindowSet:
 *
 * @param WindowX
 * @text 窗口X坐标
 * @desc 窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @desc 窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 370
 *
 * @param WindowHeight
 * @text 窗口高度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 340
 *
 * @param WindowFontSize
 * @text 窗口字体大小
 * @type number
 * @min 1
 * @desc 窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param WindowMoving
 * @text 窗口移动动画
 * @type struct<WindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 * 
 * @param WindowLayout
 * @text 窗口布局
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<AttachEquipWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~AttachEquipWindowSet:
 *
 * @param WindowMode
 * @text 窗口类型
 * @type select
 * @option 小图标+物品名
 * @value 图标+物品名
 * @option 大图标方格
 * @value 仅图标
 * @desc 窗口类型。
 * @default 图标+物品名
 *
 * @param WindowCellBg
 * @text 是否显示背景颜色框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示与物品颜色相同的背景颜色框。
 * @default true
 *
 * @param WindowCellDrawName
 * @text 图标方格是否显示小物品名
 * @parent WindowMode
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 当窗口类型为大图标方格时，是否显示字体较小的物品名。
 * @default true
 *
 * @param WindowSmallNameSize
 * @text 小物品名字体大小
 * @parent WindowCellDrawName
 * @type number
 * @max 15
 * @min 1
 * @desc 小物品名字体大小
 * @default 12
 *
 * @param WindowX
 * @text 窗口X坐标
 * @desc 窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @desc 窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 370
 *
 * @param WindowHeight
 * @text 窗口高度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 340
 *
 * @param WindowCols
 * @text 窗口列数
 * @type number
 * @min 1
 * @desc 窗口的列数。
 * @default 1
 *
 * @param WindowFontSize
 * @text 窗口字体大小
 * @type number
 * @min 1
 * @desc 窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param WindowMoving
 * @text 窗口移动动画
 * @type struct<WindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 * 
 * @param WindowLayout
 * @text 窗口布局
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<SlotWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~SlotWindowSet:
 *
 * @param WindowMode
 * @text 窗口类型
 * @type select
 * @option 小图标+物品名列表
 * @value 图标+物品名
 * @option 自定义大图标方格
 * @value 仅图标
 * @desc 窗口类型。
 * @default 图标+物品名
 *
 * @param WindowCellBg
 * @text 是否显示背景颜色框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示与物品颜色相同的背景颜色框。
 * @default true
 *
 * @param WindowCellDrawName
 * @text 图标方格是否显示小物品名
 * @parent WindowMode
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 当窗口类型为大图标方格时，是否显示字体较小的物品名。
 * @default true
 *
 * @param WindowSmallNameSize
 * @text 小物品名字体大小
 * @parent WindowCellDrawName
 * @type number
 * @max 15
 * @min 1
 * @desc 小物品名字体大小
 * @default 12
 *
 * @param WindowCoodType
 * @text 选项排布类型
 * @type select
 * @option 常规直线排布
 * @value 常规直线排布
 * @option 自定义坐标
 * @value 自定义坐标
 * @desc 选项排布类型。
 * @default 常规直线排布
 *
 * @param WindowCoodList
 * @text 自定义坐标列表
 * @parent WindowCoodType
 * @type text[]
 * @desc 当选项排布类型为自定义坐标时，方格的坐标列表，例如 200,200 代表x=200，y=200。
 * @default []
 *
 * @param WindowX
 * @text 窗口X坐标
 * @desc 窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @desc 窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 370
 *
 * @param WindowHeight
 * @text 窗口高度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 340
 *
 * @param WindowCols
 * @text 窗口列数
 * @type number
 * @min 1
 * @desc 窗口的列数。
 * @default 1
 *
 * @param WindowFontSize
 * @text 窗口字体大小
 * @type number
 * @min 1
 * @desc 窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param WindowMoving
 * @text 窗口移动动画
 * @type struct<WindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 * 
 * @param WindowLayout
 * @text 窗口布局
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<MainItemWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~MainItemWindowSet:
 *
 * @param WindowMode
 * @text 窗口类型
 * @type select
 * @option 小图标+物品名
 * @value 图标+物品名
 * @option 大图标方格
 * @value 仅图标
 * @desc 窗口类型。
 * @default 图标+物品名
 *
 * @param WindowCellBg
 * @text 是否显示背景颜色框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示与物品颜色相同的背景颜色框。
 * @default true
 *
 * @param WindowCellDrawName
 * @text 图标方格是否显示小物品名
 * @parent WindowMode
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 当窗口类型为大图标方格时，是否显示字体较小的物品名。
 * @default true
 *
 * @param WindowSmallNameSize
 * @text 小物品名字体大小
 * @parent WindowCellDrawName
 * @type number
 * @max 15
 * @min 1
 * @desc 小物品名字体大小
 * @default 12
 *
 * @param WindowX
 * @text 窗口X坐标
 * @desc 窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @desc 窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 370
 *
 * @param WindowHeight
 * @text 窗口高度
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 340
 *
 * @param WindowFontSize
 * @text 窗口字体大小
 * @type number
 * @min 1
 * @desc 窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param WindowMoving
 * @text 窗口移动动画
 * @type struct<WindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 * 
 * @param WindowLayout
 * @text 窗口布局
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<WindowMoving>
 * ---------------------------------------------------------------------------
 */
/*~struct~WindowMoving:
 *
 * @param MoveType
 * @text 移动类型
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 不移动
 * @value 不移动
 * @desc 初始的移动方式。
 * @default 匀速移动
 *
 * @param MoveTime
 * @text 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param MoveDelay
 * @text 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param StartPoint
 * @text ---移动起点---
 * @default 
 *
 * @param CoordinateType
 * @text 坐标类型
 * @parent StartPoint
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param SlideX
 * @text 起点-相对坐标X
 * @parent StartPoint
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param SlideY
 * @text 起点-相对坐标Y
 * @parent StartPoint
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 *
 * @param SlideAbsoluteX
 * @text 起点-绝对坐标X
 * @parent StartPoint
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 0
 * 
 * @param SlideAbsoluteY
 * @text 起点-绝对坐标Y
 * @parent StartPoint
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<WindowLayout>
 * ---------------------------------------------------------------------------
 */
/*~struct~WindowLayout:
 *
 * @param LayoutType
 * @text 布局类型
 * @type select
 * @option 默认皮肤
 * @value 默认皮肤
 * @option 单张背景贴图
 * @value 单张背景贴图
 * @option 隐藏布局
 * @value 隐藏布局
 * @desc 窗口布局的类型。
 * @default 默认皮肤
 *
 * @param Background
 * @text ---单张背景贴图---
 * @default 
 *
 * @param BackgroundFile
 * @text 资源-贴图
 * @parent Background
 * @type file
 * @dir img/
 * @require 1
 * @desc 窗口的背景贴图的资源。
 * @default 
 *
 * @param BackgroundX
 * @text 贴图位置修正 X
 * @parent Background
 * @desc 修正图片的位置用。以窗口的点为基准，负数向右，正数向左，单位像素。
 * @default 0
 *
 * @param BackgroundY
 * @text 贴图位置修正 Y
 * @parent Background
 * @desc 修正图片的位置用。以窗口的点为基准，负数向上，正数向下，单位像素。
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<InfoWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~InfoWindowSet:
 *
 * @param General
 * @text ---基本设置---
 *
 * @param ShowWindow
 * @text 是否在该界面显示
 * @parent General
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在该界面显示模块信息窗口。
 * @default true
 *
 * @param WindowSkin
 * @text 窗口皮肤
 * @parent General
 * @type file
 * @dir img/system/
 * @desc 该界面模块信息窗口的窗口皮肤
 * @default Window
 *
 * @param WindowScale
 * @text 窗口缩放率
 * @parent General
 * @desc 该界面模块信息窗口的缩放率
 * @default 0.6
 *
 * @param WindowBack
 * @text 是否绘制窗口背景
 * @parent General
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否绘制窗口背景
 * @default true
 *
 * @param WindowOutline
 * @text 是否绘制窗口外框
 * @parent General
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否绘制窗口外框
 * @default true
 *
 * @param WindowOutlineWidth
 * @text 窗口外框线条宽度
 * @parent General
 * @type number
 * @min 1
 * @desc 窗口外框线条宽度。
 * @default 2
 *
 * @param ShowBigIcon
 * @text 是否显示大图标?
 * @parent General
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否在该界面模块信息窗口中显示大图标
 * @default true
 *
 * @param FixWindow
 * @text 固定/浮动窗口
 * @parent General
 * @type boolean
 * @on 固定
 * @off 浮动
 * @desc 设置在该界面模块信息窗口是固定窗口还是自适应浮动窗口。
 * @default false
 *
 * @param Fix
 * @text ---固定窗口设置---
 *
 * @param WindowX
 * @text 窗口X坐标
 * @parent Fix
 * @desc 窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @parent Fix
 * @desc 窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @parent Fix
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 50
 *
 * @param WindowHeight
 * @text 窗口高度
 * @parent Fix
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 50
 *
 * @param WindowLayout
 * @text 窗口布局
 * @parent Fix
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"隐藏布局","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 *
 * @param WindowMoving
 * @text 窗口移动动画
 * @parent Fix
 * @type struct<WindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 *
 * @param FixMaxCols
 * @text 是否固定列数?
 * @parent Fix
 * @type boolean
 * @on 固定
 * @off 不固定
 * @desc 固定窗口时是否固定列数为1
 * @default false
 *
 * @param ScrollSpeed
 * @text 窗口滚动速度
 * @parent Fix
 * @type number
 * @min 1
 * @desc 固定窗口时的窗口滚动速度
 * @default 4
 *
 * @param Float
 * @text ---浮动窗口设置---
 *
 * @param OffsetX
 * @text 窗口X偏移
 * @parent Float
 * @desc 该界面模块信息窗口的X坐标偏移量。
 * @default 0
 *
 * @param OffsetY
 * @text 窗口Y偏移
 * @parent Float
 * @desc 该界面模块信息窗口的Y坐标偏移量。
 * @default 0
 *
 * @param OffsetWidth
 * @text 窗口宽度修正
 * @parent Float
 * @type number
 * @min 0
 * @desc 该界面模块信息窗口的宽度修正。
 * @default 0
 *
 * @param OffsetHeight
 * @text 窗口高度修正
 * @parent Float
 * @type number
 * @min 0
 * @desc 该界面模块信息窗口的高度修正。
 * @default 0
 *
 * @param ShowWindowSkin
 * @text 是否显示窗口皮肤
 * @parent Float
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示窗口皮肤
 * @default false
 *
 */
//=============================================================================	
//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.EAH.pluginName);
GF.Param = GF.Param || {};

GF.Param.EAHSlot = {
	weapon: JSON.parse(GF.Parameters['Weapon Slots']),
	armor : JSON.parse(GF.Parameters['Armor Slots'])
};
GF.Param.EAHMaxSlots = Number(GF.Parameters['MaxSlots']);
GF.Param.EAHEnable = eval(GF.Parameters['Enable Augments']);
GF.Param.EAHShowAugmentInfo = eval(GF.Parameters['ShowAugmentInfo']);
GF.Param.EAHShowAugmentSlot = eval(GF.Parameters['ShowAugmentSlot']);
GF.Param.EAHNoneText = String(GF.Parameters['No Augment Text']);
GF.Param.EAHNoAugmentIcon = Number(GF.Parameters['NoAugmentIcon']);
GF.Param.EAHAugmentEffectText = String(GF.Parameters['AugmentEffectText']);
GF.Param.EAHCanotDetachText = String(GF.Parameters['CanotDetachText']);
GF.Param.EAHDetachText = String(GF.Parameters['DetachText']);
GF.Param.EAHAddSlotText = String(GF.Parameters['AddSlotText']);
GF.Param.EAHAddSlotNumText = String(GF.Parameters['AddSlotNumText']);

GF.Param.EAHMainLayoutFile = String(GF.Parameters['MainLayoutFile']);
GF.Param.EAHHelpWindowSet = DataManager.setupWindowInitParam(JSON.parse(GF.Parameters['HelpWindowSet']));
GF.Param.EAHAttachEquipWindowSet = GF.COIE.getItemListWindowParam(JSON.parse(GF.Parameters['AttachEquipWindowSet']));
GF.Param.EAHAugmentWindowSet = GF.COIE.getItemListWindowParam(JSON.parse(GF.Parameters['AugmentWindowSet']));
GF.Param.EAHSlotWindowSet = (() => {
	const set = JSON.parse(GF.Parameters['SlotWindowSet']);
	const newSet = GF.COIE.getItemListWindowParam(set);
	newSet.WindowCoodType = set.WindowCoodType;
	newSet.WindowCoodList = JSON.parse(set.WindowCoodList);
	return newSet;
})();
GF.Param.EAHMainItemWindowSet = GF.COIE.getItemListWindowParam(JSON.parse(GF.Parameters['MainItemWindowSet']));
if (Imported.GF_3_ItemInfoWindow) {
	GF.Param.EAHInfoWindowSet = GF.IIW.getInfoWindowParam(GF.Parameters['InfoWindowSet']);
};

//=============================================================================
// DataManager
//=============================================================================

GF.EAH.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!GF.EAH.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!GF._loaded_GF_4_EquipAttach) {
        this.processAugmentNotetags1($dataWeapons, 'weapon');
        this.processAugmentNotetags1($dataArmors, 'armor');
        this.processAugmentNotetags2($dataItems);
        GF._loaded_GF_4_EquipAttach = true;
    }
    return true;
};

DataManager.processAugmentNotetags1 = function (group, type) {
	for (var i = 1; i < group.length; i++) {
		var obj = group[i];
		this.setupAugmentNotetags1(obj, type);
	}
};

DataManager.setupAugmentNotetags1 = function (obj, type) {
	var notedata = obj.note.split(/[\r\n]+/);
	
	obj.augmentSlots = JsonEx.makeDeepCopy(GF.Param.EAHSlot[type]);
	obj.augmentSlotsMax = GF.Param.EAHMaxSlots;
	var evalMode = 'none';

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(/<(?:AUGMENT SLOTS|镶嵌槽):\s*(.*)>/i)) {
			var str = String(RegExp.$1).split(',');
			for (var s = 0; s < str.length; s++) {
				obj.augmentSlots.push(str[s].trim());
			}
		} else if (line.match(/<(?:AUGMENT SLOTS|镶嵌槽)>/i)) {
			var evalMode = 'augment slots';
			obj.augmentSlots = [];
		} else if (line.match(/<\/(?:AUGMENT SLOTS|镶嵌槽)>/i)) {
			var evalMode = 'none';
		} else if (evalMode === 'augment slots') {
			obj.augmentSlots.push(line.trim());
		} else if (line.match(/<(?:NO AUGMENT SLOTS|无镶嵌槽)>/i)) {
			obj.augmentSlots = [];
		} else if (line.match(/<(?:AUGMENT SLOTS MAX|镶嵌槽上限):\s*(\d+)>/i)) {
			obj.augmentSlotsMax = Number(RegExp.$1);
		} 
	}
};

DataManager.processAugmentNotetags2 = function (group) {
	for (var i = 1; i < group.length; i++) {
		var obj = group[i];
		this.setupAugmentNotetags2(obj);
	}
};

DataManager.setupAugmentNotetags2 = function (obj) {
    
	var notedata = obj.note.split(/[\r\n]+/);

	obj.augmentTypes = [];
	obj.augmentDataAttach = {};
	obj.augmentDataDetach = {};
	var evalMode = 'none';
	var evalType = 'none';
	obj.augmentEvalAttach = {};
	obj.augmentEvalDetach = {};
	obj.addAugmentSlots = [];

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(/<(?:AUGMENT|镶嵌效果):[ ](.*)>/i)) {
			var evalMode = 'augment auto';
			var evalType = String(RegExp.$1).toUpperCase().trim();
			this.makeAugmentEvalType(obj, evalType);
		} else if (line.match(/<\/(?:AUGMENT|镶嵌效果):[ ](.*)>/i)) {
			var evalMode = 'none';
			var evalType = 'none';
		} else if (evalMode === 'augment auto') {
			obj.augmentDataAttach[evalType].push(line);
			obj.augmentDataDetach[evalType].push(this.reverseAugmentAutoLine(line));
		} else if (line.match(/<(?:AUGMENT ATTACH|镶嵌附加效果):[ ](.*)>/i)) {
			var evalMode = 'augment attach';
			var evalType = String(RegExp.$1).toUpperCase().trim();
			this.makeAugmentEvalType(obj, evalType);
		} else if (line.match(/<\/(?:AUGMENT ATTACH|镶嵌附加效果):[ ](.*)>/i)) {
			var evalMode = 'none';
			var evalType = 'none';
		} else if (evalMode === 'augment attach') {
			obj.augmentDataAttach[evalType].push(line);
		} else if (line.match(/<(?:AUGMENT DETACH|镶嵌移除效果):[ ](.*)>/i)) {
			var evalMode = 'augment detach';
			var evalType = String(RegExp.$1).toUpperCase().trim();
			this.makeAugmentEvalType(obj, evalType);
		} else if (line.match(/<\/(?:AUGMENT DETACH|镶嵌移除效果):[ ](.*)>/i)) {
			var evalMode = 'none';
			var evalType = 'none';
		} else if (evalMode === 'augment detach') {
			obj.augmentDataDetach[evalType].push(line);
		} else if (line.match(/<(?:AUGMENT ATTACH EVAL|自定义镶嵌附加效果):[ ](.*)>/i)) {
			var evalMode = 'augment eval attach';
			var evalType = String(RegExp.$1).toUpperCase().trim();
			this.makeAugmentEvalType(obj, evalType);
		} else if (line.match(/<\/(?:AUGMENT ATTACH EVAL|自定义镶嵌附加效果):[ ](.*)>/i)) {
			var evalMode = 'none';
			var evalType = 'none';
		} else if (evalMode === 'augment eval attach') {
			obj.augmentEvalAttach[evalType] += line + '\n';
		} else if (line.match(/<(?:AUGMENT DETACH EVAL|自定义镶嵌移除效果):[ ](.*)>/i)) {
			var evalMode = 'augment eval detach';
			var evalType = String(RegExp.$1).toUpperCase().trim();
			this.makeAugmentEvalType(obj, evalType);
		} else if (line.match(/<\/(?:AUGMENT DETACH EVAL|自定义镶嵌移除效果):[ ](.*)>/i)) {
			var evalMode = 'none';
			var evalType = 'none';
		} else if (evalMode === 'augment eval detach') {
			obj.augmentEvalDetach[evalType] += line + '\n';
		} else if (line.match(/<(?:ADD AUGMENT SLOTS|增加镶嵌槽):\s*(.*)>/i)) {
			var str = String(RegExp.$1).split(',');
			for (var s = 0; s < str.length; s++) {
				obj.addAugmentSlots.push(str[s].trim());
			}
		} else if (line.match(/<(?:ADD AUGMENT SLOTS|增加镶嵌槽)>/i)) {
			var evalMode = 'augment slots add';
			obj.addAugmentSlots = [];
		} else if (line.match(/<\/(?:ADD AUGMENT SLOTS|增加镶嵌槽)>/i)) {
			var evalMode = 'none';
		} else if (evalMode === 'augment slots add') {
			obj.addAugmentSlots.push(line.trim());
		} 
	}
};

DataManager.reverseAugmentAutoLine = function (line) {
    if (line.match(/ADD[ ](.*):(.*)/i)) {
        var str1 = String(RegExp.$1);
        var str2 = String(RegExp.$2);
        return 'REMOVE ' + str1 + ':' + str2;
    } else if (line.match(/REMOVE[ ](.*):(.*)/i)) {
        var str1 = String(RegExp.$1);
        var str2 = String(RegExp.$2);
        return 'ADD ' + str1 + ':' + str2;
    } else if (line.match(/CHANGE[ ](.*):(.*)/i)) {
        var str1 = String(RegExp.$1);
        var str2 = String(RegExp.$2);
        return 'CANCEL ' + str1 + ':' + str2;
    } else if (line.match(/CANCEL[ ](.*):(.*)/i)) {
        var str1 = String(RegExp.$1);
        var str2 = String(RegExp.$2);
        return 'CHANGE ' + str1 + ':' + str2;
    } else if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
        return line;
    } else if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
        var str = String(RegExp.$1);
        var value = parseInt(RegExp.$2) * -1;
        if (value > 0) value = '+' + value;
        return str + ': ' + value;
    }
    return line;
};

DataManager.makeAugmentEvalType = function (obj, evalType) {
    obj.nonIndependent = true;
    obj.augmentDataAttach[evalType] = obj.augmentDataAttach[evalType] || [];
    obj.augmentDataDetach[evalType] = obj.augmentDataDetach[evalType] || [];
    obj.augmentEvalAttach[evalType] = obj.augmentEvalAttach[evalType] || '';
    obj.augmentEvalDetach[evalType] = obj.augmentEvalDetach[evalType] || '';
    obj.augmentTypes.push(evalType);
};


DataManager.isAugmentItem = function (item) {
	if (!item) return false;
	if (!this.isItem(item)) return false;
	return item.augmentTypes && item.augmentTypes.length;
};

DataManager.isAddSlotItem = function (item) {
	if (!item) return false;
	if (!this.isItem(item)) return false;
	return item.addAugmentSlots && item.addAugmentSlots.length;
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.addAugmentSlots = function (item, effectItem) {
    if (!item) return;
    this.checkAugmentSlots(item);
	const max = item.augmentSlotsMax || 0;
	let cur = item.augmentSlots.length;
	if (cur >= max) return;
    item.augmentSlots = item.augmentSlots.concat(effectItem.addAugmentSlots);
	if (effectItem.consumable) {
		$gameParty.loseItem(effectItem, 1);
	}
	cur = item.augmentSlots.length;
	if (cur > max) {
		item.augmentSlots.length = max;
	}
	this.checkAugmentSlots(item);
};

ItemManager.checkAugmentSlots = function (item) {
    if (DataManager.isItem(item)) return;
    if (item.augmentSlots === undefined) {
        const baseItem = DataManager.getBaseItem(item);
        item.augmentSlots = JsonEx.makeDeepCopy(baseItem.augmentSlots);
    }
    item.augmentSlotEnable = item.augmentSlotEnable || [];
    item.augmentSlotItems = item.augmentSlotItems || [];
    var length = item.augmentSlots.length;
    for (var i = 0; i < length; ++i) {
        if (item.augmentSlotEnable[i] === undefined) {
            item.augmentSlotEnable[i] = true;
        }
        if (item.augmentSlotItems[i] === undefined) {
            item.augmentSlotItems[i] = 'none';
        }
    }
};

ItemManager.applyAugmentEffects = function (item, effectItem, slotId, gain) {
    if (!item) return;
    gain = gain || 0;
    this.checkAugmentSlots(item);
    if (item.augmentSlotItems[slotId] !== 'none') {
        var augment = this.removeAugmentFromSlot(item, slotId);
        if (augment) $gameParty.gainItem(augment, gain);
    }
    this.installAugmentToSlot(item, effectItem, slotId);
    $gameParty.loseItem(effectItem, gain);
    this.augmentRefreshParty(item);
};

ItemManager.removeAugmentFromSlot = function (item, slotId) {
    $gameTemp._augmentSetting = 'detach';
    var type = item.augmentSlots[slotId].toUpperCase().trim();
    var augment = this.augmentInSlot(item, slotId);
    if (!augment) {
        $gameTemp._augmentSetting = undefined;
        return augment;
    }
    var list = augment.augmentDataDetach[type];
    if (list && list.length > 0) {
        this.processAugmentList(item, augment, slotId, list);
    }
    var code = augment.augmentEvalDetach[type];
    this.processAugmentEval(code, item, augment, slotId);
    $gameTemp._augmentSetting = undefined;
    return augment;
};

ItemManager.removeAllAugments = function (item) {
    var augments = [];
    this.checkAugmentSlots(item);
    var length = item.augmentSlotItems.length;
    for (var i = 0; i < length; ++i) {
        var augment = this.removeAugmentFromSlot(item, i);
        augments.push(augment);
    }
    return augments;
};

ItemManager.installAugmentToSlot = function (item, effectItem, slotId) {
    $gameTemp._augmentSetting = 'attach';
    var type = item.augmentSlots[slotId].toUpperCase().trim();
    if (DataManager.isItem(effectItem)) {
        item.augmentSlotItems[slotId] = 'item ' + effectItem.id;
    } else if (effectItem === null) {
        item.augmentSlotItems[slotId] = 'none';
        $gameTemp._augmentSetting = undefined;
        return;
    }
    if (!effectItem) {
        $gameTemp._augmentSetting = undefined;
        return;
    }
    var list = effectItem.augmentDataAttach[type];
    if (list && list.length > 0) {
        this.processAugmentList(item, effectItem, slotId, list);
    }
    var code = effectItem.augmentEvalAttach[type];
    this.processAugmentEval(code, item, effectItem, slotId);
    $gameTemp._augmentSetting = undefined;
};

ItemManager.installAugments = function (item, augments) {
    this.checkAugmentSlots(item);
    var length = augments.length;
    for (var i = 0; i < length; ++i) {
        var augment = augments[i];
        this.installAugmentToSlot(item, augment, i);
    }
};

ItemManager.augmentInSlot = function (item, slotId) {
	if (!item.augmentSlotItems) return null;
    const augment = item.augmentSlotItems[slotId];
	if (!augment) return null;
    if (augment.match(/ITEM[ ](\d+)/i)) {
        const id = parseInt(RegExp.$1);
        const item = $dataItems[id];
        return item || null;
    }
    return null;
};

ItemManager.augmentRefreshParty = function (item) {
    var length = $gameParty.allMembers().length;
    for (var i = 0; i < length; ++i) {
        var member = $gameParty.allMembers()[i];
        if (member && member.equips().contains(item))
            member.refresh();
    }
};

ItemManager.processAugmentList = function (item, effectItem, slotId, list) {
    var length = list.length;
    for (var i = 0; i < length; ++i) {
        var line = list[i];
        this.processAugmentEffect(line, item, effectItem, slotId);
    }
};

ItemManager.processAugmentEffect = function (line, mainItem, effectItem, slot) {
    // CANNOT DETACH
    if (line.match(/CANNOT DETACH/i)) {
        return this.applyAugmentCanotDetach(mainItem, slot);
    }
    // ADD ATTACK ELEMENT: x
    if (line.match(/ADD ATTACK ELEMENT:\s*(.*)/i)) {
        var element = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentAttackElement(mainItem, element, true);
    } else if (line.match(/REMOVE ATTACK ELEMENT:\s*(.*)/i)) {
        var element = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentAttackElement(mainItem, element, false);
    }
    // ADD ATTACK STATE: x
    if (line.match(/ADD ATTACK STATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentAttackState(mainItem, text, true);
    } else if (line.match(/REMOVE ATTACK STATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentAttackState(mainItem, text, false);
    }
    // ADD DEBUFF RATE: x
    if (line.match(/ADD DEBUFF RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentDebuff(mainItem, text, true);
    } else if (line.match(/REMOVE DEBUFF RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentDebuff(mainItem, text, false);
    }
    // ADD ELEMENT RATE: x
    if (line.match(/ADD ELEMENT RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentElement(mainItem, text, true);
    } else if (line.match(/REMOVE ELEMENT RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentElement(mainItem, text, false);
    }
    // ADD PASSIVE STATE: x
    if (Imported.GF_2_CoreOfSkillState) {
        if (line.match(/ADD PASSIVE STATE:\s*(.*)/i)) {
            var text = String(RegExp.$1).toUpperCase().trim();
            return this.applyAugmentPassiveState(mainItem, text, true);
        } else if (line.match(/REMOVE PASSIVE STATE:\s*(.*)/i)) {
            var text = String(RegExp.$1).toUpperCase().trim();
            return this.applyAugmentPassiveState(mainItem, text, false);
        }
    }
    // ADD SKILL: x
    if (line.match(/ADD SKILL:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentSkill(mainItem, text, true);
    } else if (line.match(/REMOVE SKILL:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentSkill(mainItem, text, false);
    }
    // ADD SKILL TYPE: x
    if (line.match(/ADD SKILL TYPE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentSkillType(mainItem, text, true);
    } else if (line.match(/REMOVE SKILL TYPE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentSkillType(mainItem, text, false);
    } 
    // ADD STATE RATE: x
    if (line.match(/ADD STATE RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentStateRate(mainItem, text, true);
    } else if (line.match(/REMOVE STATE RATE:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentStateRate(mainItem, text, false);
    }
    // ADD STATE RESIST: x
    if (line.match(/ADD STATE RESIST:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentStateResist(mainItem, text, true);
    } else if (line.match(/REMOVE STATE RESIST:\s*(.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.applyAugmentStateResist(mainItem, text, false);
    }
    // CHANGE BASE NAME: x
    if (line.match(/CHANGE BASE NAME:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetBaseName(mainItem, text, slot, true);
    } else if (line.match(/CANCEL BASE NAME:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetBaseName(mainItem, text, slot, false);
    }
    // CHANGE PREFIX: x
    if (line.match(/CHANGE PREFIX:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetPrefix(mainItem, text, slot, true);
    } else if (line.match(/CANCEL PREFIX:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetPrefix(mainItem, text, slot, false);
    }
    // CHANGE SUFFIX: x
    if (line.match(/CHANGE SUFFIX:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetSuffix(mainItem, text, slot, true);
    } else if (line.match(/CANCEL SUFFIX:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetSuffix(mainItem, text, slot, false);
    }
    // CHANGE PRIORITY NAME: x
    if (line.match(/CHANGE PRIORITY NAME:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetPriorityName(mainItem, text, slot, true);
    } else if (line.match(/CANCEL PRIORITY NAME:\s*(.*)/i)) {
        var text = String(RegExp.$1).trim();
        return this.applyAugmentSetPriorityName(mainItem, text, slot, false);
    }
    // CHANGE ICON: x
    if (line.match(/CHANGE ICON:\s*(\d+)/i)) {
        var icon = parseInt(RegExp.$1);
        return this.applyAugmentSetIcon(mainItem, icon, slot, true);
    } else if (line.match(/CANCEL ICON:\s*(\d+)/i)) {
        var icon = parseInt(RegExp.$1);
        return this.applyAugmentSetIcon(mainItem, icon, slot, false);
    }
    
	// CHANGE PICTURE IMAGE: x
	if (line.match(/CHANGE PICTURE IMAGE:\s*(.*)/i)) {
		var text = String(RegExp.$1).trim();
		return this.applyAugmentSetPictureImg(mainItem, text, slot, true);
	} else if (line.match(/CANCEL PICTURE IMAGE:\s*(.*)/i)) {
		var text = String(RegExp.$1).trim();
		return this.applyAugmentSetPictureImg(mainItem, text, slot, false);
	}
	// CHANGE PICTURE HUE: x
	if (line.match(/CHANGE PICTURE HUE:\s*(\d+)/i)) {
		var hue = parseInt(RegExp.$1).clamp(0, 360);
		return this.applyAugmentSetPictureHue(mainItem, hue, slot, true);
	} else if (line.match(/CANCEL PICTURE HUE:\s*(\d+)/i)) {
		var hue = parseInt(RegExp.$1).clamp(0, 360);
		return this.applyAugmentSetPictureHue(mainItem, hue, slot, false);
	}
    
    // CHANGE TEXT COLOR: x
    if (line.match(/CHANGE TEXT COLOR:\s*(.*)/i)) {
        var color = String(RegExp.$1);
        return this.applyAugmentSetTextColor(mainItem, color, slot, true);
    } else if (line.match(/CANCEL TEXT COLOR:\s*(.*)/i)) {
        var color = String(RegExp.$1);
        return this.applyAugmentSetTextColor(mainItem, color, slot, false);
    }
    // PARAM: +/-X%
    if (line.match(/(.*):\s*([\+\-]\d+)([%％])/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        var value = parseFloat(RegExp.$2);
        return this.applyAugmentParamRate(mainItem, param, value);
    }
    // PARAM: +/-X
    if (line.match(/(.*):\s*([\+\-]\d+)/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        var value = parseInt(RegExp.$2);
        return this.applyAugmentParamPlus(mainItem, param, value);
    }
};

ItemManager.adjustItemTrait = function (mainItem, code, dataId, value, add) {
    if (add) {
        this.addTraitToItem(mainItem, code, dataId, value);
    } else {
        this.deleteTraitFromItem(mainItem, code, dataId, value);
    }
};

ItemManager.deleteTraitFromItem = function (mainItem, code, dataId, value) {
    var index = this.getMatchingTraitIndex(mainItem, code, dataId, value);
    if (index >= 0)
        mainItem.traits.splice(index, 1);
};

ItemManager.getMatchingTraitIndex = function (mainItem, code, dataId, value) {
    var i = mainItem.traits.length;
    while (i--) {
        var trait = mainItem.traits[i];
        if (trait.code !== code) continue;
        if (trait.dataId !== dataId) continue;
        if (trait.value !== value) continue;
        return i;
    }
    return i;
};

ItemManager.applyAugmentCanotDetach = function (mainItem, slotId) {
    mainItem.augmentSlotEnable[slotId] = false;
};

ItemManager.applyAugmentAttackElement = function (mainItem, element, add) {
    if (element.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.ElementIdRef[element];
        if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
    this.adjustItemTrait(mainItem, code, id, 0, add);
};

ItemManager.applyAugmentAttackState = function (mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
        var name = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = GF.StateIdRef[name];
        if (!id) return;
    } else if (text.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
        var rate = 1.0;
    } else {
        var id = GF.StateIdRef[text];
        if (!id) return;
        var rate = 1.0;
    }
    var code = Game_BattlerBase.TRAIT_ATTACK_STATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentDebuff = function (mainItem, text, add) {
    if (text.match(/(.*),[ ](\d+)([%％])/i)) {
        var param = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        if (!id) return;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var param = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        rate += 1;
    } else {
        return;
    }
    var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
    var code = Game_BattlerBase.TRAIT_DEBUFF_RATE;
    this.adjustItemTrait(mainItem, code, paramId, rate, add);
};

ItemManager.applyAugmentElement = function (mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
        var name = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = GF.ElementIdRef[name];
        if (!id)
            return;
    } else if (text.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        rate += 1;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var name = String(RegExp.$1);
        var id = GF.ElementIdRef[name];
        var rate = parseFloat(RegExp.$2) * 0.01;
        rate += 1;
    } else {
        return;
    }
    var code = Game_BattlerBase.TRAIT_ELEMENT_RATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentPassiveState = function (mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.StateIdRef[text];
        if (!id) return;
    }
    mainItem.passiveStates = mainItem.passiveStates || [];
    if (add) {
        mainItem.passiveStates.push(id);
    } else {
        var index = mainItem.passiveStates.indexOf(id);
        if (index >= 0) mainItem.passiveStates.splice(index, 1);
    }
};

ItemManager.applyAugmentSkill = function (mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.SkillIdRef[text];
        if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_SKILL_ADD;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentSkillType = function (mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.STypeIdRef[text];
        if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_STYPE_ADD;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentStateRate = function (mainItem, text, add) {
    if (text.match(/(\d+),[ ](\d+)([%％])/i)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
    } else if (text.match(/(.*),[ ](\d+)([%％])/i)) {
        var name = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = GF.StateIdRef[name];
        if (!id) return;
    } else if (text.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        rate += 1;
    } else if (text.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var name = String(RegExp.$1);
        var id = GF.StateIdRef[name];
        var rate = parseFloat(RegExp.$2) * 0.01;
        rate += 1;
    } else {
        return;
    }
    var code = Game_BattlerBase.TRAIT_STATE_RATE;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.getAugmentFirstValue = function (array, def) {
    var length = array.length;
    for (var i = 0; i < length; ++i) {
        var item = array[i];
        if (item === null) continue;
        if (item !== undefined) return item;
    }
    return def;
};

ItemManager.applyAugmentStateResist = function (mainItem, text, add) {
    if (text.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.StateIdRef[text];
        if (!id) return;
    }
    var code = Game_BattlerBase.TRAIT_STATE_RESIST;
    this.adjustItemTrait(mainItem, code, id, 1, add);
};

ItemManager.applyAugmentSetBaseName = function (mainItem, text, slot, add) {
    mainItem.augmentBaseNames = mainItem.augmentBaseNames || [];
    if (add) {
        mainItem.augmentBaseNames[slot] = text;
    } else {
        mainItem.augmentBaseNames[slot] = undefined;
    }
    var baseName = DataManager.getBaseItem(mainItem).name;
    var name = this.getAugmentFirstValue(mainItem.augmentBaseNames, baseName);
    this.setBaseName(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetPrefix = function (mainItem, text, slot, add) {
    mainItem.augmentPrefixes = mainItem.augmentPrefixes || [];
    if (add) {
        mainItem.augmentPrefixes[slot] = text;
    } else {
        mainItem.augmentPrefixes[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentPrefixes, '');
    this.setNamePrefix(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetSuffix = function (mainItem, text, slot, add) {
    mainItem.augmentSuffixes = mainItem.augmentSuffixes || [];
    if (add) {
        mainItem.augmentSuffixes[slot] = text;
    } else {
        mainItem.augmentSuffixes[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentSuffixes, '');
    this.setNameSuffix(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetPriorityName = function (mainItem, text, slot, add) {
    mainItem.augmentPriorityNames = mainItem.augmentPriorityNames || [];
    if (add) {
        mainItem.augmentPriorityNames[slot] = text;
    } else {
        mainItem.augmentPriorityNames[slot] = undefined;
    }
    var name = this.getAugmentFirstValue(mainItem.augmentPriorityNames, '');
    this.setPriorityName(mainItem, name);
    this.updateItemName(mainItem);
};

ItemManager.applyAugmentSetIcon = function (mainItem, icon, slot, add) {
    mainItem.augmentIcons = mainItem.augmentIcons || [];
    if (add) {
        mainItem.augmentIcons[slot] = icon;
    } else {
        mainItem.augmentIcons[slot] = undefined;
    }
    var baseIcon = DataManager.getBaseItem(mainItem).iconIndex;
    var id = this.getAugmentFirstValue(mainItem.augmentIcons, baseIcon);
    mainItem.iconIndex = id;
};

ItemManager.applyAugmentSetPictureImg = function (mainItem, img, slot, add) {
    mainItem.augmentPictureImg = mainItem.augmentPictureImg || [];
    if (add) {
        mainItem.augmentPictureImg[slot] = img;
    } else {
        mainItem.augmentPictureImg[slot] = undefined;
    }
    var baseImg = DataManager.getBaseItem(mainItem).pictureImg;
    var id = this.getAugmentFirstValue(mainItem.augmentPictureImg, baseImg);
    mainItem.pictureImg = id;
};

ItemManager.applyAugmentSetPictureHue = function (mainItem, Hue, slot, add) {
    mainItem.augmentPictureHue = mainItem.augmentPictureHue || [];
    if (add) {
        mainItem.augmentPictureHue[slot] = Hue;
    } else {
        mainItem.augmentPictureHue[slot] = undefined;
    }
    var baseHue = DataManager.getBaseItem(mainItem).pictureHue;
    var id = this.getAugmentFirstValue(mainItem.augmentPictureHue, baseHue);
    mainItem.pictureHue = id;
};

ItemManager.applyAugmentSetTextColor = function (mainItem, color, slot, add) {
    mainItem.augmentTextColor = mainItem.augmentTextColor || [];
	if (color.slice(0,1) !== '#') {
		color = parseInt(color);
		if (color <= 200) {
			color = $dataColors[color];
		} else {
			color = $dataSeniorColors[color];
		}
	}
    if (add) {
        mainItem.augmentTextColor[slot] = color;
    } else {
        mainItem.augmentTextColor[slot] = undefined;
    }
    const colorStr = this.getAugmentFirstValue(mainItem.augmentTextColor, '#ffffff');
    mainItem.textColor = colorStr;
};

ItemManager.applyAugmentParamRate = function (mainItem, param, value) {
    var add = $gameTemp._augmentSetting === 'attach';
	var id = this.interpretParamNote(param)[0];
	if (id === null) return;
	var paramType = this.interpretParamNote(param)[1];
	var code = Game_BattlerBase[paramType];
    var rate = parseFloat(value * 0.01) + 1;
    if (paramType === 'TRAIT_XPARAM') rate -= 1;
    this.adjustItemTrait(mainItem, code, id, rate, add);
};

ItemManager.applyAugmentParamPlus = function (mainItem, param, value) {
	if (param === 'PRICE') {
		mainItem.price += value;
	} else if (param === 'BOOST') {
		mainItem.boostCount += value;
		this.updateItemName(mainItem);
	} else if (param === 'ALL') {
		for (var i = 0; i < 8; ++i) {
			mainItem.params[i] += value; 
		}
	} else if (param === 'CURRENT') {
		for (var i = 0; i < 8; ++i) {
			if (mainItem.params[i] === 0) continue;
			mainItem.params[i] += value;
        }
	} else {
		let paramId = this.interpretParamNote(param)[0];
		if (paramId !== null) {
			mainItem.params[paramId] += value;
		}
	}
};

ItemManager.processAugmentEval = function (code, item, effectItem, slotId) {
    if (code === '') return;
    var mainItem = item;
    var weapon = item;
    var armor = item;
    var baseItem = DataManager.getBaseItem(item);
    var baseWeapon = baseItem;
    var baseArmor = baseArmor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
        eval(code);
    } catch (e) {
		GF.Util.displayError(e, code, '自定义镶嵌效果代码错误');
    }
};

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(GF.EAH.pluginName, 'EquipAttachShowInfo', args => {
    $gameSystem.setEquipAttachShowInfo(eval(args.value));
});

PluginManager.registerCommand(GF.EAH.pluginName, 'EquipAttachShowSlot', args => {
    $gameSystem.setEquipAttachShowSlot(eval(args.value));
});

//=============================================================================
// Game_System
//=============================================================================

GF.EAH.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
    GF.EAH.Game_System_initialize.call(this);
    this.initEquipAttachSet();
};

Game_System.prototype.initEquipAttachSet = function () {
    this._equipAttachShowInfo = GF.Param.EAHShowAugmentInfo;
	this._equipAttachShowSlot = GF.Param.EAHShowAugmentSlot;
};

Game_System.prototype.isEquipAttachShowInfo = function () {
    if (this._equipAttachShowInfo === undefined) this.initEquipAttachSet();
    return this._equipAttachShowInfo;
};

Game_System.prototype.setEquipAttachShowInfo = function (value) {
    if (this._equipAttachShowInfo === undefined) this.initEquipAttachSet();
    this._equipAttachShowInfo = value;
};

Game_System.prototype.isEquipAttachShowSlot = function () {
    if (this._equipAttachShowSlot === undefined) this.initEquipAttachSet();
    return this._equipAttachShowSlot;
};

Game_System.prototype.setEquipAttachShowSlot = function (value) {
    if (this._equipAttachShowSlot === undefined) this.initEquipAttachSet();
    this._equipAttachShowSlot = value;
};

//=============================================================================
// Window_Base
//=============================================================================

GF.EAH.Window_Base_drawItemIcon = Window_Base.prototype.drawItemIcon;
Window_Base.prototype.drawItemIcon = function (item, rect) {
	GF.EAH.Window_Base_drawItemIcon.call(this, item, rect);
	this.drawAttachAugmentIcon(item, rect);
};

GF.EAH.Window_Base_drawItemPicture = Window_Base.prototype.drawItemPicture;
Window_Base.prototype.drawItemPicture = function (bitmap, item, rect) {
	GF.EAH.Window_Base_drawItemPicture.call(this, bitmap, item, rect);
	this.drawAttachAugmentIcon(item, rect);
};

Window_Base.prototype.drawAttachAugmentIcon = function (item, rect) {
	if (Imported.GF_3_ItemInfoWindow && (this instanceof Window_ObjectInfo)) return;
	if (!$gameSystem.isEquipAttachShowSlot()) return;
	if (!item) return;
	if (!DataManager.isIndependent(item)) return;
	ItemManager.checkAugmentSlots(item);
	const length = item.augmentSlotItems.length;
	if (!length) return;
	const icon = GF.Param.EAHNoAugmentIcon;
	const size = 10;
	const dx = 4;
	const dy = 4;
	const smallRect = new Rectangle(rect.x + dx, rect.y + dy, size, size);
	for (var i = 0; i < length; i++) {
		let slot = item.augmentSlotItems[i];
		if (slot.match(/NONE/i)) {
			this.drawWholeIcon(icon, smallRect);
		} else if (slot.match(/ITEM[ ](\d+)/i)) {
			let slotItem = $dataItems[parseInt(RegExp.$1)];
			if (slotItem) {
				this.drawWholeIcon(slotItem.iconIndex, smallRect);
			} else {
				this.drawWholeIcon(icon, smallRect);
			}
		} 
		smallRect.y += size;
		if (smallRect.y + size + dy >= rect.y + rect.height) {
			smallRect.y = rect.y + dy;
			smallRect.x += size;
		}
	}
};

GF.EAH.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function (item, x, y, width) {
	GF.EAH.Window_Base_drawItemName.call(this, item, x, y, width);
	this.drawItemNameAttachIcon(item, x, y, width);
};

Window_Base.prototype.drawItemNameAttachIcon = function (item, x, y, width) {
	if (!$gameSystem.isEquipAttachShowSlot()) return;
	if (!item) return;
	if (!DataManager.isIndependent(item)) return;
	ItemManager.checkAugmentSlots(item);
	const length = item.augmentSlotItems.length;
	if (!length) return;
	const icon = GF.Param.EAHNoAugmentIcon;
	let iconX = x + width - ImageManager.iconWidth * length;
	const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
	for (var i = 0; i < length; i++) {
		let slot = item.augmentSlotItems[i];
		if (slot.match(/NONE/i)) {
			this.drawIcon(icon, iconX, iconY);
		} else if (slot.match(/ITEM[ ](\d+)/i)) {
			let slotItem = $dataItems[parseInt(RegExp.$1)];
			if (slotItem) {
				this.drawIcon(slotItem.iconIndex, iconX, iconY);
			} else {
				this.drawIcon(icon, iconX, iconY);
			}
		} 
		iconX += ImageManager.iconWidth;
	}
};

//=============================================================================
// Window_AttachEquipList
//=============================================================================

class Window_AttachEquipList extends Window_ItemListPlus {
	includes(item) {
		if (!item) return false;
		if (!DataManager.isWeapon(item) && !DataManager.isArmor(item)) return false;
		if (!DataManager.isIndependent(item)) return false;
		return (item.augmentSlots && item.augmentSlots.length) || item.augmentSlotsMax;
	}
	
	makeItemList() {
		super.makeItemList();
		this.listEquippedItems();
	}
	
	isEnabled(item) {
		return true;
	}
	
	preSelectItem(item) {
		const index = this._data.indexOf(item);
		this.forceSelect(index >= 0 ? index : 0);
	}
	
	onTouchOk() {
		super.onTouchOk();
		if (this.isTouchedInsideFrame()) {
			SceneManager._scene.hideCusorItem();
		}
	}
	
	processCursorMove() {
		if (!this.isTouchedInsideFrame()) return;
		super.processCursorMove();
	}
	
	isOkEnabled() {
		return super.isOkEnabled() && this.isTouchedInsideFrame();
	}
}

//=============================================================================
// Window_AugmentList
//=============================================================================

class Window_AugmentList extends Window_ItemListPlus {
	initialize(set) {
		super.initialize(set);
		this._mainItem = null;
	}
	
	includes(item) {
		if (!item) return false;
		if (!DataManager.isItem(item)) return false;
		return DataManager.isAugmentItem(item) || DataManager.isAddSlotItem(item);
	}
	
	isEnabled(item) {
		if (!item) return false;
		const mainItem = this.mainItem();
		if (!mainItem) return false;
		const slots = mainItem.augmentSlots;
		if (DataManager.isAugmentItem(item)) {
			for (var i = 0; i < slots.length; ++i) {
				const slot = slots[i].toUpperCase().trim();
				const augment = ItemManager.augmentInSlot(mainItem, i);
				if (item.augmentTypes.contains(slot) && item !== augment) {
					return true;
				}
			}
		} else if (DataManager.isAddSlotItem(item)) {
			const max = mainItem.augmentSlotsMax || 0;
			return slots.length < max;
		}
		return false;
	}
	
	setMainItem(item) {
		if (this._mainItem !== item) {
			this._mainItem = item;
			this.refresh();
		}
	}
	
	mainItem() {
		return this._mainItem;
	}
	
	onTouchOk() {
		super.onTouchOk();
		const hitIndex = this.hitIndex();
		if (hitIndex === -1 && this.isTouchedInsideFrame()) {
			SceneManager._scene.hideCusorItem();
		}
	}
	
	processCursorMove() {
		if (!this.isTouchedInsideFrame()) return;
		super.processCursorMove();
	}
	
	isOkEnabled() {
		return super.isOkEnabled() && this.isTouchedInsideFrame();
	}
}

//=============================================================================
// Window_AugmentMainItem
//=============================================================================

class Window_AugmentMainItem extends Window_Base {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.EAHMainItemWindowSet;
		super.initialize(rect);
		this._mainItem = null;
		this.refresh();
		this.processWindowInitParam(this._windowSet.WindowSet);
	}
	
	setMainItem(item) {
		if (this._mainItem !== item) {
			this._mainItem = item;
			this.refresh();
		}
	}
	
	mainItem() {
		return this._mainItem;
	}
	
	refresh() {
		this.contents.clear();
        this.contentsBack.clear();
		this.drawMainItem();
	}
	
	drawMainItem() {
		const item = this._mainItem;
		if (!item) return;
		const x = 1;
		const y = 1;
		const width = this.innerWidth - 2;
		const height = this.innerHeight - 2;
		const rect = new Rectangle(x, y, width, height);
		if (this._windowSet.WindowMode === '图标+物品名') {
			this.drawItemName(item, x, y, width);
		} else {
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect);
			} else {
				this.drawItemIcon(item, rect);
			}
			this.drawSmallItemName(item, x, y + height - this.lineHeight(), width);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
	}
	
	prepareDrawItemImage(item, rect) {
		const bitmap = ItemManager.getItemPictureImage(item);
		bitmap.addLoadListener(this.drawItemPicture.bind(this, bitmap, item, rect));
	}
	
	drawSmallItemName(item, x, y, width) {
		if (!item) return;
		if (!this._windowSet.WindowCellDrawName) return;
		$gameTemp._isDrawingItemName = true;
		$gameTemp._curDrawingItem = item;
		this.resetTextColor();
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		this.drawText(item.name, x, y, width, 'center');
		$gameTemp._isDrawingItemName = false;
		this.resetFontSettings();
	}
	
	drawItemCellGrid(item, rect) {
		if (!item) return;
		let color = item.textColor;
		if (!color || color === '') color = '#ffffff';
		if (typeof(color) === 'string' && color !== '' && color.contains('drill__')) {
			this.contentsBack.strokeSeniorColorRoundRect(rect.x, rect.y, rect.width, rect.height, color, 5, 2);
		} else {
			this.contentsBack.strokeRect(rect.x, rect.y, rect.width, rect.height, color, 5, 2);
		}
	}
}

//=============================================================================
// Window_AugmentSlot
//=============================================================================

class Window_AugmentSlot extends Window_Selectable {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.EAHSlotWindowSet;
		super.initialize(rect);
		this._mainItem = null;
		this._effectItem = null;
		this.processWindowInitParam(this._windowSet.WindowSet);
		this.refresh();
	}
	
	maxCols() {
		return this._windowSet.WindowCols;
	}
	
	colSpacing() {
		if (this._windowSet.WindowMode === '图标+物品名') {
			return super.colSpacing();
		}
		return 4;
	}
	
	rowSpacing() {
		if (this._windowSet.WindowMode === '图标+物品名') {
			return super.rowSpacing();
		}
		return 4;
	}
	
	itemHeight() {
		if (this._windowSet.WindowMode === '图标+物品名') {
			return super.itemHeight();
		}
		return this.itemWidth();
	}
	
	itemRect(index) {
		if (this._windowSet.WindowCoodType === '常规直线排布') {
			return super.itemRect(index);
		} 
		const coodList = this._windowSet.WindowCoodList;
		const cood = coodList[index];
		if (!cood) {
			return super.itemRect(index);
		}
		let x = Number(cood.split(',')[0]);
		let y = Number(cood.split(',')[1]);
		if (x === undefined || y === undefined) {
			return super.itemRect(index);
		}
		const itemWidth = this.itemWidth();
		const itemHeight = this.itemHeight();
		const colSpacing = this.colSpacing();
		const rowSpacing = this.rowSpacing();
		x += colSpacing / 2 - this.scrollBaseX();
		y += rowSpacing / 2 - this.scrollBaseY();
		const width = itemWidth - colSpacing;
		const height = itemHeight - rowSpacing;
		return new Rectangle(x, y, width, height);
		
	}
	
	setMainItem(item) {
		if (this._mainItem !== item) {
			this.setSlotNameWidth(item);
			this._mainItem = item;
			ItemManager.checkAugmentSlots(this._mainItem);
			this.refresh();
		}
	}
	
	mainItem() {
		return this._mainItem;
	}
	
	setEffectItem(item) {
		this._effectItem = item;
	}
	
	setSlotNameWidth(item) {
		if (!item) return;
		this._nameWidth = 0;
		for (var i = 0; i < item.augmentSlots.length; ++i) {
			let text = item.augmentSlots[i] + ' ';
			this._nameWidth = Math.max(this._nameWidth, this.textWidth(text));
		}
		this._nameWidth += ImageManager.iconWidth;
	}
	
	maxItems() {
		return this._mainItem ? this._mainItem.augmentSlots.length : 0;
	}
	
	item() {
		return this.itemAt(this.index());
	}
	
	itemAt(index) {
		return this._mainItem ? ItemManager.augmentInSlot(this._mainItem, index) : null;
	}
	
	mainItemSlotName(item, index) {
		return item.augmentSlots[index];
	}
	
	isEnabled(index) {
		const mainItem = this.mainItem();
		if (!mainItem) return false;
		if (!mainItem.augmentSlotEnable) return false;
		return mainItem.augmentSlotEnable[index];
	}
	
	isCurrentItemEnabled() {
		const effectItem = this._effectItem;
		const mainItem = this.mainItem();
		const slotItem = ItemManager.augmentInSlot(mainItem, this.index());
		if (!effectItem) {
			return this.isEnabled(this.index()) && slotItem;
		} else if (effectItem && mainItem) {
			const slot = mainItem.augmentSlots[this.index()].toUpperCase().trim();
			if (effectItem.augmentTypes.contains(slot)) {
				return this.isEnabled(this.index()) && effectItem !== slotItem;
			}
		}
		return false;
	}
	
	drawSmallItemName(item, x, y, width) {
		if (!item) return;
		if (!this._windowSet.WindowCellDrawName) return;
		$gameTemp._isDrawingItemName = true;
		$gameTemp._curDrawingItem = item;
		this.resetTextColor();
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		this.drawText(item.name, x, y, width, 'center');
		$gameTemp._isDrawingItemName = false;
		this.resetFontSettings();
	}
	
	drawItem(index) {
		if(!this._mainItem) return;
		const item = this.itemAt(index);
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			const slotName = this.mainItemSlotName(this._mainItem, index);
			const slotNameWidth = this._nameWidth || 138;
			const rect = this.itemLineRect(index);
			const itemWidth = rect.width - slotNameWidth;
			this.changeTextColor(ColorManager.systemColor());
			this.changePaintOpacity(this.isEnabled(index));
			this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
			this.drawItemName(item, rect.x + slotNameWidth, rect.y, itemWidth);
			this.changePaintOpacity(true);
		} else {
			this.changePaintOpacity(this.isEnabled(index));
			if (item) {
				if (this.itemHasPictureImage(item)) {
					this.prepareDrawItemImage(item, rect, index);
				} else {
					this.drawItemIcon(item, rect);
				}
				this.drawSmallItemName(item, rect.x, rect.y, rect.width);
			} 
			this.drawEquipSlotName(index);
			this.changePaintOpacity(true);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect, index);
	}
	
	prepareDrawItemImage(item, rect, index) {
		const bitmap = ItemManager.getItemPictureImage(item);
		bitmap.addLoadListener(this.drawItemPicture.bind(this, bitmap, item, rect, index));
	}
	
	drawItemPicture(bitmap, item, rect, index) {
		this.changePaintOpacity(this.isEnabled(index));
		super.drawItemPicture(bitmap, item, rect);
		this.changePaintOpacity(1);
	}
	
	drawEquipSlotName(index) {
		const slotName = this.mainItemSlotName(this._mainItem, index);
		const rect = this.itemRect(index);
		const lineHeight = this.lineHeight();
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(slotName, rect.x, rect.y + rect.height - lineHeight, rect.width, 'center');
		this.resetFontSettings();
	}
	
	drawItemCellGrid(item, rect, index) {
		if (!item) return;
		let color = item.textColor;
		if (!color || color === '') color = '#ffffff';
		this.changePaintOpacity(this.isEnabled(index));
		if (typeof(color) === 'string' && color !== '' && color.contains('drill__')) {
			this.contentsBack.strokeSeniorColorRoundRect(rect.x, rect.y, rect.width, rect.height, color, 5, 2);
		} else {
			this.contentsBack.strokeRect(rect.x, rect.y, rect.width, rect.height, color, 5, 2);
		}
		this.changePaintOpacity(1);
	}
	
	cursorDown(wrap) {
		if (this._windowSet.WindowCoodType === '常规直线排布') {
			return super.cursorDown(wrap);
		} 
		this.cursorRight(wrap);
	}
	
	cursorUp(wrap) {
		if (this._windowSet.WindowCoodType === '常规直线排布') {
			return super.cursorUp(wrap);
		} 
		this.cursorLeft(wrap);
	}
	
	playOkSound() {
	}
	
	updateHelp() {
		super.updateHelp();
		this.setHelpWindowItem(this.item())
	}
	
	processCursorMove() {
		if (!this.isTouchedInsideFrame()) return;
		super.processCursorMove();
	}
	
	isOkEnabled() {
		return super.isOkEnabled() && this.isTouchedInsideFrame();
	}
}

//=============================================================================
// Scene_EquipAttch
//=============================================================================

class Scene_EquipAttch extends Scene_MenuBase {
	create() {
		super.create();
		this.createMainLayout();
		this.createHelpWindow();
		this.createAttachEquipWindow();
		this.createAugmentWindow();
		this.createSlotWindow();
		this.createMainItemWindow();
		this.createObjInfoWindow();
	}
	
	createMainLayout() {
		const layout = new Sprite(ImageManager.loadCustomBitmap(GF.Param.EAHMainLayoutFile));
		this._backField.addChild(layout);
	}
	
	createHelpWindow() {
		super.createHelpWindow();
		const helpWindowSet = GF.Param.EAHHelpWindowSet;
		this._helpWindow.processWindowInitParam(helpWindowSet);
		this._helpWindow.refresh();
	}
	
	createAttachEquipWindow() {
		const set = GF.Param.EAHAttachEquipWindowSet;
		this._attachEquipWindow = new Window_AttachEquipList(set);
		this._attachEquipWindow.setHelpWindow(this._helpWindow);
		this._attachEquipWindow.setHandler("ok", this.onEquipOk.bind(this));
		this._attachEquipWindow.setHandler("cancel", this.exitScene.bind(this));
		this._attachEquipWindow.activate();
		this.addWindow(this._attachEquipWindow);
	}
	
	createAugmentWindow() {
		const set = GF.Param.EAHAugmentWindowSet;
		this._augmentWindow = new Window_AugmentList(set);
		this._augmentWindow.setHelpWindow(this._helpWindow);
		this._augmentWindow.setHandler("ok", this.onAugmentOk.bind(this));
		this._augmentWindow.setHandler("cancel", this.exitScene.bind(this));
		this.addWindow(this._augmentWindow);
	}
	
	createSlotWindow() {
		this._slotWindow = new Window_AugmentSlot();
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
		this._slotWindow.setHandler("cancel", this.exitScene.bind(this));
		this.addWindow(this._slotWindow);
	}
	
	createMainItemWindow() {
		this._mainItemWindow = new Window_AugmentMainItem();
		this.addWindow(this._mainItemWindow);
	}
	
	createObjInfoWindow() {
		if (!Imported.GF_3_ItemInfoWindow) return;
		if (!GF.Param.EAHInfoWindowSet.ShowWindow) return;
		this._objInfoWindow = new Window_ObjectInfo(GF.Param.EAHInfoWindowSet);
		if (GF.Param.EAHInfoWindowSet.FixWindow) {
			this.addWindow(this._objInfoWindow);
		} else {
			this.addChild(this._objInfoWindow);
		}
		this._attachEquipWindow.setObjInfoWindow(this._objInfoWindow);
		this._objInfoWindow.setTargetWindow(this._attachEquipWindow);
		this._augmentWindow.setObjInfoWindow(this._objInfoWindow);
		this._slotWindow.setObjInfoWindow(this._objInfoWindow);
		if (GF.Param.EAHInfoWindowSet.FixWindow) {
			this._attachEquipWindow.select(0);
		}
	}
	
	showCusorItem(item) {
		this.hideCusorItem();
		this._cusorItemSprite = new Sprite_CusorItem(item, this._augmentWindow.itemHeight());
		this._slotWindow.setEffectItem(item);
		this.addChild(this._cusorItemSprite);
	}
	
	hideCusorItem() {
		if (!this._cusorItemSprite) return;
		this.removeChild(this._cusorItemSprite);
		this._cusorItemSprite.destroy();
		this._cusorItemSprite = null;
		this._slotWindow.setEffectItem(null);
	}
	
	onEquipOk() {
		const mainItem = this._attachEquipWindow.item();
		this._augmentWindow.activate();
		this._augmentWindow.resetInitParamMove();
		this._augmentWindow.setMainItem(mainItem);
		this._slotWindow.activate();
		this._slotWindow.resetInitParamMove();
		this._slotWindow.setMainItem(mainItem);
		this._slotWindow.smoothSelect(0);
		this._mainItemWindow.resetInitParamMove();
		this._mainItemWindow.setMainItem(mainItem);
		this._attachEquipWindow.activate();
	}
	
	onAugmentOk() {
		const mainItem = this._augmentWindow.mainItem();
		const effectItem = this._augmentWindow.item();
		if (DataManager.isAugmentItem(effectItem)) {
			this.showCusorItem(effectItem);
		} else if (DataManager.isAddSlotItem(effectItem)) {
			ItemManager.addAugmentSlots(mainItem, effectItem);
			this._augmentWindow.refresh();
			this._slotWindow.refresh();
			this._attachEquipWindow.refresh();
			this._mainItemWindow.refresh();
		}
		this._augmentWindow.activate();
	}
	
	onSlotOk() {
		const item = this._slotWindow.mainItem();
		const effectItem = this._cusorItemSprite ? this._cusorItemSprite._item : null;
		const slotId = this._slotWindow.index();
		const slot = item.augmentSlots[slotId].toUpperCase().trim();
		if (!effectItem) {
			const getItem = ItemManager.augmentInSlot(item, slotId);
			if (getItem) {
				this.showCusorItem(getItem);
			}
			ItemManager.applyAugmentEffects(item, null, slotId, 1);
		} else if (effectItem.augmentTypes.contains(slot)) {
			const getItem = ItemManager.augmentInSlot(item, slotId);
			if (getItem) {
				this.showCusorItem(getItem);
			} else {
				this.hideCusorItem();
			}
			ItemManager.applyAugmentEffects(item, effectItem, slotId, 1);
			SoundManager.playEquip();
		}
		this._slotWindow.activate();
		this._slotWindow.refresh();
		this._augmentWindow.refresh();
		this._attachEquipWindow.refresh();
		this._mainItemWindow.refresh();
	}
	
	exitScene() {
		$gameParty.refreshAllMembers();
		this.popScene();
	}
}

if (Imported.GF_3_ItemInfoWindow) {
//=============================================================================
// Window_ObjectInfo
//=============================================================================

GF.EAH.Window_ObjectInfo_getItemInfo = Window_ObjectInfo.prototype.getItemInfo;
Window_ObjectInfo.prototype.getItemInfo = function () {
	if (DataManager.isAugmentItem(this._item) && $gameSystem.isEquipAttachShowInfo()) {
		this.getAugmentItemInfo();
		this.getObjPrice();
		this.getObjWeight();
	} else if (DataManager.isAddSlotItem(this._item) && $gameSystem.isEquipAttachShowInfo()) {
		this.getAddSlotItemInfo();
		this.getObjPrice();
		this.getObjWeight();
	} else {
		GF.EAH.Window_ObjectInfo_getItemInfo.call(this);
	}
};

Window_ObjectInfo.prototype.getAugmentItemInfo = function() {
	const item = this._item;
	const text = this.addSystemColor(GF.Param.EAHAugmentEffectText);
	for (const type in item.augmentDataAttach) {
		const list = item.augmentDataAttach[type];
		this._data.push(this.addBasicColor(type) + ' ' + text + this.textColon());
		for (const line of list) {
			this.getAugmentEffect(line, item);
		}
	}
};

Window_ObjectInfo.prototype.getAugmentEffect = function(line, item) {
	// CANNOT DETACH
    if (line.match(/CANNOT DETACH/i)) {
        return this.getAugmentCanotDetach();
    }
    // ADD ATTACK ELEMENT: x
    if (line.match(/ADD ATTACK ELEMENT:[ ](.*)/i)) {
        var element = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentAttackElement(element, true);
    } else if (line.match(/REMOVE ATTACK ELEMENT:[ ](.*)/i)) {
        var element = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentAttackElement(element, false);
    }
    // ADD ATTACK STATE: x
    if (line.match(/ADD ATTACK STATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentAttackState(text, true);
    } else if (line.match(/REMOVE ATTACK STATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentAttackState(text, false);
    }
    // ADD DEBUFF RATE: x
    if (line.match(/ADD DEBUFF:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentDebuff(text, true);
    } else if (line.match(/REMOVE DEBUFF:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentDebuff(text, false);
    }
    // ADD ELEMENT RATE: x
    if (line.match(/ADD ELEMENT RATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentElement(text, true);
    } else if (line.match(/REMOVE ELEMENT RATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentElement(text, false);
    }
    // ADD PASSIVE STATE: x
    if (Imported.GF_2_CoreOfSkillState) {
        if (line.match(/ADD PASSIVE STATE:[ ](.*)/i)) {
            var text = String(RegExp.$1).toUpperCase().trim();
            return this.getAugmentPassiveState(text, true);
        } else if (line.match(/REMOVE PASSIVE STATE:[ ](.*)/i)) {
            var text = String(RegExp.$1).toUpperCase().trim();
            return this.getAugmentPassiveState(text, false);
        }
    }
    // ADD SKILL: x
    if (line.match(/ADD SKILL:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentSkill(text, true);
    } else if (line.match(/REMOVE SKILL:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentSkill(text, false);
    }
    // ADD SKILL TYPE: x
    if (line.match(/ADD SKILL TYPE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentSkillType(text, true);
    } else if (line.match(/REMOVE SKILL TYPE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentSkillType(text, false);
    } 
    // ADD STATE RATE: x
    if (line.match(/ADD STATE RATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentStateRate(text, true);
    } else if (line.match(/REMOVE STATE RATE:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentStateRate(text, false);
    }
    // ADD STATE RESIST: x
    if (line.match(/ADD STATE RESIST:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentStateResist(text, true);
    } else if (line.match(/REMOVE STATE RESIST:[ ](.*)/i)) {
        var text = String(RegExp.$1).toUpperCase().trim();
        return this.getAugmentStateResist(text, false);
    }
    // PARAM: +/-X%
    if (line.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        var value = parseFloat(RegExp.$2);
        return this.getAugmentParamRate(param, value);
    }
    // PARAM: +/-X
    if (line.match(/(.*):[ ]([\+\-]\d+)/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        var value = parseInt(RegExp.$2);
        return this.getAugmentParamPlus(item, param, value);
    }
};

Window_ObjectInfo.prototype.getAugmentCanotDetach = function() {
	const text = this.addBasicColor(GF.Param.EAHCanotDetachText);
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentAttackElement = function(element, add) {
	let text = '';
	if (element.match(/(\d+)/i)) {
        text = this.addBasicColor($dataSystem.elements[parseInt(RegExp.$1)]);
    } else {
        text = this.addBasicColor(element);
    }
	text = this.getObjText('IIWAttackText', 'AtkAttribute') + this.textColon() + text;
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentAttackState = function (stateText, add) {
    if (stateText.match(/(\d+),[ ](\d+)([%％])/i)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
    } else if (stateText.match(/(.*),[ ](\d+)([%％])/i)) {
        var name = String(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
        var id = GF.StateIdRef[name];
        if (!id) return;
    } else if (stateText.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
        var rate = 100;
    } else {
        var id = GF.StateIdRef[stateText];
        if (!id) return;
        var rate = 100;
    }
	let text = '';
	const state = $dataStates[id];
	if (eval(GF.Param.IIWMainText['ShowIcon']) && state.iconIndex) {
		text += '\\I['+ state.iconIndex + ']';
	}
	text += this.addBasicColor(state.name + ' ' + this.sortValueDD(rate) + '%');
	text = this.getObjText('IIWAttackText', 'AtkState') + this.textColon() + text;
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentDebuff = function (debuff, add) {
    if (debuff.match(/(.*),[ ](\d+)([%％])/i)) {
        var param = String(RegExp.$1);
        var rate = 100 - parseFloat(RegExp.$2);
        if (!id) return;
    } else if (debuff.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        var param = String(RegExp.$1);
        var rate = - parseFloat(RegExp.$2);
    } else {
        return;
    }
    var paramId = ItemManager.interpretParamNote(param)[0];
	if (paramId === null) return;
	let text = TextManager.param(paramId);
	text = this.addSystemColor(text);
	text += this.getObjText('IIWResistText', 'Debuff'); 
	text += rate > 0 ? this.addIncreaseColor('+' + this.sortValueDD(rate) + '%') : this.addDecreaseColor(this.sortValueDD(rate) + '%');
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentElement = function (element, add) {
	let text = '';
    if (element.match(/(\d+),[ ](\d+)([%％])/i)) {
        text = $dataSystem.elements[parseInt(RegExp.$1)];
        var rate = 100 - parseFloat(RegExp.$2);
    } else if (element.match(/(.*),[ ](\d+)([%％])/i)) {
        text = String(RegExp.$1);
        var rate = 100 - parseFloat(RegExp.$2);
    } else if (element.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
        text = $dataSystem.elements[parseInt(RegExp.$1)];
        var rate = - parseFloat(RegExp.$2);
    } else if (element.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        text = String(RegExp.$1);
        var rate = - parseFloat(RegExp.$2);
    } else {
        return;
    }
	text = this.addSystemColor(text);
	text += this.getObjText('IIWResistText', 'Attribute'); 
	text += rate > 0 ? this.addIncreaseColor('+' + this.sortValueDD(rate) + '%') : this.addDecreaseColor(this.sortValueDD(rate) + '%');
    if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentPassiveState = function (stateText, add) {
    if (stateText.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.StateIdRef[stateText];
        if (!id) return;
    }
	let text = '';
	const state = $dataStates[id];
	if (eval(GF.Param.IIWMainText['ShowIcon']) && state.iconIndex) {
		text = '\\I['+ state.iconIndex + ']';
	}
	text += this.addBasicColor(state.name);
	text = '被动' + this.textColon() + text;
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentSkill = function (skillText, add) {
    if (skillText.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.SkillIdRef[skillText];
        if (!id) return;
    }
	const skill = $dataSkills[id];
	let text = skill.name;
	if (eval(GF.Param.IIWMainText['ShowIcon']) && skill.iconIndex) {
		text = '\\I['+ skill.iconIndex + ']' + text;
	}
    text = this.getObjText('IIWSkillText', 'AddSkill') + this.textColon() + this.addBasicColor(text);
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentSkillType = function (sTypeText, add) {
	let text = '';
    if (sTypeText.match(/(\d+)/i)) {
		text = $dataSystem.skillTypes[parseInt(RegExp.$1)];
    } else {
        text = sTypeText;
    }
    text = this.getObjText('IIWSkillText', 'AddSType') + this.textColon() + this.addBasicColor(text);
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentStateRate = function (stateText, add) {
    if (stateText.match(/(\d+),[ ](\d+)([%％])/i)) {
        var id = parseInt(RegExp.$1);
        var rate = 100 - parseFloat(RegExp.$2);
    } else if (stateText.match(/(.*),[ ](\d+)([%％])/i)) {
        var name = String(RegExp.$1);
        var rate = 100 - parseFloat(RegExp.$2);
        var id = GF.StateIdRef[name];
        if (!id) return;
    } else if (stateText.match(/(\d+),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var id = parseInt(RegExp.$1);
        var rate =  - parseFloat(RegExp.$2);
    } else if (stateText.match(/(.*),[ ]([\+\-]\d+)([%％])/i)) {
        var add = $gameTemp._augmentSetting === 'attach';
        var name = String(RegExp.$1);
        var id = GF.StateIdRef[name];
        var rate =  - parseFloat(RegExp.$2);
    } else {
        return;
    }
    const state = $dataStates[id];
	let text = state.name;
	if (eval(GF.Param.IIWMainText['ShowIcon']) && state.iconIndex !== 0) 
		text = '\\I['+ state.iconIndex + ']' + text;
	text = this.addSystemColor(text);
	text += this.getObjText('IIWResistText', 'State'); 
	text += rate > 0 ? this.addIncreaseColor('+' + this.sortValueDD(rate) + '%') : this.addDecreaseColor(this.sortValueDD(rate) + '%');
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentStateResist = function (stateText, add) {
    if (stateText.match(/(\d+)/i)) {
        var id = parseInt(RegExp.$1);
    } else {
        var id = GF.StateIdRef[stateText];
        if (!id) return;
    }
	const state = $dataStates[id];
    let text = this.getObjText('IIWResistText', 'StateImmunity') + this.textColon();
	if (eval(GF.Param.IIWMainText['ShowIcon']) && state.iconIndex !== 0) 
		text += '\\I['+ state.iconIndex + ']';
	text += this.addBasicColor(state.name);
	if (!add) text = this.addDecreaseColor(GF.Param.EAHDetachText) + text;
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentParamRate = function (param, value) {
	var id = ItemManager.interpretParamNote(param)[0];
	if (id === null) return;
	var paramType = ItemManager.interpretParamNote(param)[1];
    let rate = parseFloat(value);
    if (paramType !== 'TRAIT_XPARAM') rate += 100;
	let text = '';
    if ((paramType === 'TRAIT_PARAM')) {
		text = this.addSystemColor(TextManager.param(id));
		var valueText = '\u00d7' + this.sortValueDD(rate) + '%';
		valueText = rate > 1.0 ? this.addIncreaseColor(valueText) : this.addDecreaseColor(valueText);
		text += valueText;
	} else if (paramType === 'TRAIT_XPARAM') {
		text = this.addSystemColor(TextManager.xparam(id));
		var valueText = this.sortValueDD(rate) + '%';
		valueText = rate > 0 ? this.addIncreaseColor('+' + valueText) : this.addDecreaseColor(valueText);
		text += valueText;
	} else if (paramType === 'TRAIT_SPARAM') {
		text = this.addSystemColor(TextManager.sparam(id));
		var valueText = '\u00d7' + this.sortValueDD(value) + '%';
		valueText = this.addBasicColor(valueText);
		text += valueText;
	}
	this._data.push(' ' + text);
};

Window_ObjectInfo.prototype.getAugmentParamPlus = function (item, param, value) {
	let text = '';
	if (param === 'PRICE') {
		text = this.addBasicColor((value > 0 ? '+' : '') + value);
		text = this.getObjText('IIWMainText','PriceText') + text;
		this._data.push(' ' + text);
	} else if (param === 'ALL') {
		for (var i = 0; i < 8; ++i) {
			text = this.addSystemColor(TextManager.param(i));
			text += value > 0 ? this.addIncreaseColor('+' + value) : this.addDecreaseColor(value);
			this._data.push(' ' + text);
		}
	} else if (param === 'CURRENT') {
		for (var i = 0; i < 8; ++i) {
			if (item.params[i] === 0) continue;
			text = this.addSystemColor(TextManager.param(i));
			text += value > 0 ? this.addIncreaseColor('+' + value) : this.addDecreaseColor(value);
			this._data.push(' ' + text);
        }
	} else {
		let paramId = ItemManager.interpretParamNote(param)[0];
		if (paramId !== null) {
			text = this.addSystemColor(TextManager.param(paramId));
			text += value > 0 ? this.addIncreaseColor('+' + value) : this.addDecreaseColor(value);
			this._data.push(' ' + text);
		}
	}
};

Window_ObjectInfo.prototype.getAddSlotItemInfo = function() {
	const item = this._item;
	const slots = item.addAugmentSlots;
	let text = this.addSystemColor(GF.Param.EAHAddSlotText) + this.textColon();
	let slotText = '';
	for (var i = 0; i < slots.length; ++i) {
		let slot = slots[i].toUpperCase().trim();
		slotText += slot;
		if (i < slots.length - 1) {
			slotText +='/';
		}
	}
	text += this.addBasicColor(slotText);
	this._data.push(text);
};

GF.EAH.Window_ObjectInfo_getEquipInfo = Window_ObjectInfo.prototype.getEquipInfo;
Window_ObjectInfo.prototype.getEquipInfo = function () {
	GF.EAH.Window_ObjectInfo_getEquipInfo.call(this);
	this.getEquipAugmentMax();
	this.getEquipAugmentInfo();
};

Window_ObjectInfo.prototype.getEquipAugmentMax = function() {
	if (!$gameSystem.isEquipAttachShowInfo()) return;
	const item = this._item;
	if (!DataManager.isIndependent(item)) return;
	ItemManager.checkAugmentSlots(item);
	const current = item.augmentSlotItems.length;
	const max = item.augmentSlotsMax;
	const num = max - current;
	if (num <= 0) return;
	const text = this.addSystemColor(GF.Param.EAHAddSlotNumText) + this.textColon() + this.addBasicColor(num);
	this._data.push(text);
};

Window_ObjectInfo.prototype.getEquipAugmentInfo = function() {
	if (!$gameSystem.isEquipAttachShowInfo()) return;
	const item = this._item;
	if (!DataManager.isIndependent(item)) return;
	ItemManager.checkAugmentSlots(item);
	for (var i = 0; i < item.augmentSlotItems.length; ++i) {
        this.getAugmentData(i);
    }
};

Window_ObjectInfo.prototype.getAugmentData = function(slot) {
    let text = this._item.augmentSlotItems[slot];
	const icon = GF.Param.EAHNoAugmentIcon;
	const noneText = this.addBasicColor((icon ? ('\\i[' + icon + ']') : '') + GF.Param.EAHNoneText);
    if (text.match(/NONE/i)) {
        text = noneText;
    } else if (text.match(/ITEM[ ](\d+)/i)) {
        var id = parseInt(RegExp.$1);
        var item = $dataItems[id];
        if (item) {
			let name = item.name;
			const color = item.textColor;
			if (color && color !== '') {
				name = '\\HexColor<' + color + '>'  + name + '\\c[0]';
			} 
            text = '\\i[' + item.iconIndex + ']' + name;
        } else {
            text = noneText;
        }
    } 
    this._data.push(text);
};

}

//=============================================================================
// Utilities
//=============================================================================

GF.Util = GF.Util || {};

//=============================================================================
// End of File
//=============================================================================