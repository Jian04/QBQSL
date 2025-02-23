//=============================================================================
// Ganfly Plugins - IndependEquipSystem
// GF_3_IndependEquipSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_3_IndependEquipSystem = true;

var GF = GF || {};
GF.IES = GF.IES || {};
GF.IES.version = 1.0;
GF.IES.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        物品 - 独立装备系统
 * @author ganfly
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 * @orderAfter GF_2_CoreOfItemEquip
 * @base GF_2_CoreOfItemEquip
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 独立装备系统，这是对默认物品系统的整合和增强。
 * 新增以下功能：
 *
 *  1.独立装备
 *      可以在插件参数中设置武器/防具为独立装备，独立装备具有各自独立
 *  的属性，能够被修改属性，并且保留那些修改后的属性。
 *  
 *  2.随机属性
 *      对于在非商店途径获得的装备，可以为其设定一个整体随机属性浮动值。  
 *  如果不希望某装备具有随机属性，则可以使用备注将其浮动值设置为0。
 *  如果希望所有装备都不具有随机属性，则可以将整体随机属性浮动参数设置
 *  为0。另外，可以通过备注设置更多自定义随机属性，包括：
 *
 *      随机基础参数
 *      随机装备特性
 *      随机镶嵌槽(需要GF_4_EquipAttach)。
 *
 *  3.随机词缀
 *      随机词缀，允许将一个基础独立装备同一些词缀装备组合在一起形成
 *  一个新的独立装备，这个新的独立装备的大部分参数将会是基础装备和词
 *  缀装备的‘加和’或者‘乘积’，并根据备注决定用某些词缀装备的参数替代
 *  基础装备参数，随机词缀将根据基础装备的备注去随机选择词缀装备，允
 *  许为一个基础装备添加多个词缀。
 *
 *  例如前缀装备‘无敌的’(攻击+10)与基础装备‘大剑’(攻击+20)组合后
 *  得到新武器‘无敌的大剑’(攻击+30)
 *
 *  注意：在战斗测试模式下，独立装备无效。        
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
 *
 * ---- 第3层 ----
 *
 * 这个插件是第3层插件，必须放在第0，1，2层下面，所有4，5层GF插件的上面。
 *
 * ============================================================================
 *  装备名称系统
 * ============================================================================
 *
 * 独立装备的名称由以下几个部分构成：
 *
 *      前缀   基础名称   后缀   Boost点数
 *
 *     其中基础名称默认为装备数据库名称，前缀、后缀、Boost点数默
 * 认为空，可通过插件修改。
 *     对于一个前缀为“无敌的”，基础名称为“大剑”，后缀为空，Boost
 * 点数为5的武器，其名称为
 *
 *      无敌的大剑(+5)
 *
 *  注意：对于带有<Priority Name>备注的装备，其装备名将会被锁定。
 *  锁定名称默认为装备数据库名称，可通过插件修改。
 *
 * ============================================================================
 *  备注 - 基本
 * ============================================================================
 *
 * ---武器/防具备注
 *
 *     <Independ Equip: true>
 *     <Independ Equip: false>
 *     <独立装备: true>
 *     <独立装备: false>
 *
 *     - 设定该武器/防具为独立装备/非独立装备，这将会覆盖相应插件参数。
 *
 *     <Priority Name>
 *     <锁定名称>
 *
 *     - 这将会锁定该武器/防具的名字，其名字不会被前后缀改变
 *
 *     <On Creation Eval>
 *      item.price = baseItem.price;
 *      item.price += Math.floor(Random() * 100);
 *     </On Creation Eval>
 *     <生成代码>
 *      item.price = baseItem.price;
 *      item.price += Math.floor(Random() * 100);
 *     </生成代码>
 *
 *     - 生成该独立装备时运行的代码，可用于自定义该装备生成的属性
 *     item代表生成的装备，baseItem代表其基础装备
 *
 *     <Random Variance: x>
 *     <随机变化: x>
 *
 *     - 设定该武器/防具的整体随机属性浮动，x为浮动上限，可为负数
 *     例如一个攻击+10的武器，<Random Variance: 10>表示
 *     其攻击在+10到+20之间浮动
 *
 *     <Random Item Param>
 *       random param
 *       random param
 *     </Random Item Param> 
 *     <随机装备属性>
 *       random param
 *       random param
 *     </随机装备属性> 
 *
 *     - 这可以设置该武器/防具附加的随机属性，每行填一种
 *     随机属性。具体的随机属性写法参照下面的随机属性列表
 *     
 *     例如：
 *
 *     <Random Item Param>
 *      Random ATK: 5 10
 *      Random DEF: -10 20
 *     </Random Item Param>
 *
 * ============================================================================
 *  备注 - 随机词缀
 * ============================================================================
 * 
 * 以下备注请置于基础装备的备注栏中
 *
 * ----武器/防具备注
 *
 *     <Prefixes>
 *     affix item list
 *     affix item list
 *     </Prefixes>
 *     <前缀>
 *     affix item list
 *     affix item list
 *     </前缀>
 *
 *     <Suffixes>
 *     affix item list
 *     affix item list
 *     </Suffixes>
 *     <后缀>
 *     affix item list
 *     affix item list
 *     </后缀>
 * 
 *     这将会设置该武器/防具绑定的前缀装备或后缀装备，
 *      <Prefixes>为前缀，<Suffixes>为后缀
 *     每行代表一个新的词缀装备或者是物品设置
 *     affix item list替换为以下语句：
 *
 * ----affix item list------
 *
 *     x x y% x x y%
 *     
 *     这将会给该装备添加一个新的词缀装备，
 *     x替换为武器/防具id或id范围，其中范围用a-b表示，
 *     如果基础装备是武器，则x为武器id，否则为防具id
 *     每一组x后的y%代表这一组id的概率占比，
 *     如果这一行的概率之和小于100%，则剩余的概率代表不添加
 *     最终的词缀装备id将会从这一行中
 *     所有的id组中按y%概率随机选择一个，
 *     然后从这个id组中随机选择一个id
 *
 *     例如 2-5 8 50% 9-13 30%
 *     意思是有50%概率从2,3,4,5,8中选择一个，
 *     有30%概率从9,10,11,12,13中选择一个，
 *     还有20%概率不选择。
 *
 *
 *     <Use Weapon Affix>
 *     <Use Armor Affix>
 *     <使用武器词缀>
 *     <使用防具词缀>
 *     这将会设置该基础装备会从武器或防具中选择词缀装备
 *     默认情况下，基础装备是武器的话，
 *     词缀装备会从武器中选择，防具同理
 *     而加上这条备注后，将会强制从设定的武器/防具中选择 
 *
 * ----------------------------------------------------------------------------
 *
 * 以下备注请置于词缀装备的备注栏中
 * 
 * ----武器/防具备注
 *
 *     <Affix Item Set>
 *      set list
 *      set list
 *     </Affix Item Set>
 *     <词缀装备设置>
 *      set list
 *      set list
 *     </词缀装备设置>
 *
 *     这可以设置一些词缀装备的特性，
 *     每一行代表一种特性，set list替换为以下语句：
 *
 * ----set list----
 *
 *     Name Type: 替代
 *     Name Type: 叠加
 *     Name Type: 不变
 *
 *     - 这使得该装备被选择为词缀装备时将装备名作为
 *     词缀加到基础装备的装备名上面的类型。
 *     这个设置会覆盖插件参数中的'词缀名称类型'
 * ----
 *
 *     Affix Name: x
 *     
 *     - 默认情况下，词缀装备将会把装备名称加入到
 *     基础装备名词缀中。
 *     这条备注将会设置加入到基础装备名词缀中的文字
 *     x替换为要设置的文字
 * ----
 *
 *     Replace Animation
 *
 *     - 这将会用该词缀装备的动画来替代基础装备的动画
 *     这个设置会覆盖插件参数中的'替换为词缀动画'
 * ----
 *
 *     Replace Type
 *
 *     - 这将会用该词缀装备的武器/防具类型来替代
 *     基础装备的武器/防具类型
 *     这个设置会覆盖插件参数中的'替换为词缀武器/防具类型'
 * ----
 *
 *     Icon Type: 替代
 *     Icon Type: 叠加
 *     Icon Type: 不变
 *     
 *     - 这将会设置是用词缀装备的图标替代基础装备的图标
 *     还是叠加基础装备的图标，如果有多个词缀装备图标
 *     叠加到基础装备上，则会按照备注中的词缀装备顺序
 *     依次叠加。
 *     这个设置会覆盖插件参数中的'词缀装备图标类型'
 * ----
 *
 *     Replace Color
 *     
 *     - 这将会用词缀装备的颜色代替基础装备的颜色
 *     这个设置会覆盖插件参数中的'替换为词缀物品颜色'
 * ----
 *
 *     Affix Type: prefix
 *     Affix Type: suffix
 *
 *     - 这将会强制指定该词缀装备是前缀还是后缀
 *     无视基础装备的设定
 * ----
 *
 *     Linked Equip Suit: x
 *
 *     - 这条备注需要GF_4_EquipSuit的支持
 *     这将会设定该词缀装备关联的套装
 *     其中x替换为套装id
 *     注意：每个套装最多关联一个词缀装备
 *     被关联的套装将会变成词缀随机型套装
 *     具体内容请参阅GF_4_EquipSuit的帮助
 *     的随机词缀套装部分。
 *
 * ---------------------------
 *
 *     <Custom Affix Requirement>
 *      enable = true;
 *     </Custom Affix Requirement>
 *     <词缀装备条件>
 *      enable = true;
 *     </词缀装备条件>
 *
 *     这可以设置该装备被选择为词缀装备需要满足的条件
 *     中间填js代码，enable的值代表是否满足条件
 *
 * ---------------------------
 *
 *     <Custom Affix Effect>
 *      var atkBonus = Math.floor((Math.random() * 100) + 50);
 *      newItem.params[2] += atkBonus;
 *      newItem.name += " +" + atkBonus;
 *      newItem.price += atkBonus;
 *     </Custom Affix Effect>
 *     <词缀额外效果>
 *      var atkBonus = Math.floor((Math.random() * 100) + 50);
 *      newItem.params[2] += atkBonus;
 *      newItem.name += " +" + atkBonus;
 *      newItem.price += atkBonus;
 *     </词缀额外效果>
 *
 *     这可以设置该装备作为词缀装备被加到基础装备上时
 *     提供的额外效果，中间填js代码。
 *     其中affixItem 代表词缀装备，
 *     baseItem 代表基础装备
 *     newItem 代表最终生成的新装备
 *
 * ============================================================================
 *  随机属性列表
 * ============================================================================
 * 
 * 以下是你可以在<Random Item Param>下填的随机属性备注的列表   
 *      
 * ----随机属性----
 *    
 *     Random Stat Stat Stat: min max   
 * 
 *     - 将Stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     将会从所有Stat中随机选择一个
 *     这将会设置该武器/防具的随机基础属性数值
 *     min和max 替换为数值，表示随机的范围，必须满足min <= max
 *     min和max可以为负数。
 *     例如 Random MMP MHP: 6 12 
 * ----
 *
 *     Random Stat Stat Stat: min% max%
 *     
 *     - 将Stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG,
 *     TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR
 *     将会从所有Stat中随机选择一个
 *     这将会按百分比设置该武器/防具的随机基础属性/额外属性/特殊属性
 *     min和max 替换为数值，表示随机的范围，必须满足min <= max
 *     min和max可以为负数。
 *     例如 Random MMP MHP: 6% 12% 
 *     !!注意：对于基础属性，5%代表*105%，-5%代表*95%
 *             对于额外属性，5%代表+5%，-5%代表-5%
 *             对于特殊属性，5%代表*105%，-5%代表*95%
 * ----
 *
 *     Random Attack Element: x x x    
 * 
 *     - 这将会设置该武器/防具的随机攻击属性
 *     x替换为元素属性id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     例如 Random Attack Element: 1 3-5 
 * ----
 *
 *     Random Attack State: x x x
 *     Random Attack State: x x x, y%
 *     Random Attack State: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机攻击附加状态
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示附加状态的概率，
 *     min和max 替换为数值，表示附加状态的概率的随机范围，
 *     必须满足min <= max
 *     例如 Random Attack State: 6 12-20 5 
 * ----
 *
 *     Random Debuff Rate: stat stat stat, y%
 *     Random Debuff Rate: stat stat stat, min% max%
 *
 *     - 这将会设置该武器/防具的随机Debuff有效度
 *     将stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     将会从所有stat中随机选择一个
 *     y替换为数值，表示Debuff有效度，
 *     min和max 替换为数值，表示Debuff有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random Debuff Rate: MMP MHP, 20% 50%
 * ----
 *
 *     Random Element Rate: x x x, y%
 *     Random Element Rate: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机属性有效度
 *     x替换为元素属性id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示属性有效度，
 *     min和max 替换为数值，表示属性有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random Element Rate: 5 1-3, 66%
 * ----
 *     
 *     Random Skill: x x x
 *
 *     - 这将会设置该武器/防具的附带的随机技能
 *     x 替换为技能的id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random Skill: 5 7-9 22
 * ----
 * 
 *     Random Skill Type: x x x
 *
 *     - 这将会设置该武器/防具的附带的随机技能类型
 *     x 替换为技能类型的id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random Skill Type: 5 7-9 22 
 * ----
 *
 *     Random State Rate: x x x, y%
 *     Random State Rate: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机状态有效度
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示状态有效度，
 *     min和max 替换为数值，表示状态有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random State Rate: 1-5, 15% 80%
 * ----
 *     
 *     Random State Resist: x x x
 *
 *     - 这将会设置该武器/防具的随机状态免疫
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random State Resist: 5 8 12
 * ----
 *
 *     Random Augment Slot: x x x
 *     Random Augment Slot: x x x, y
 *     Random Augment Slot: x x x, min max
 *
 *     - 这条备注需要GF_4_EquipAttach的支持
 *     这将会设置该武器/防具的随机镶嵌槽，x替换为镶嵌槽类型。
 *     y替换为数值，表示镶嵌槽数量，
 *     min和max 替换为数值，表示镶嵌槽数量的随机范围，
 *     必须满足min <= max
 *     将会从所有列出的镶嵌槽类型中随机选择相应数量的镶嵌槽
 *     如果随机到的数量为0，则不附加这项属性
 *     例如 Random Augment Slot: Orb, 1 3
 *          意思是增加1-3个类型为Orb的镶嵌槽
 * ----
 *
 *     Random Prefix Equip: x x y% x x y%
 *     Random Suffix Equip: x x y% x x y%
 *
 *     这将会给该装备添加一个新的词缀装备，Prefix前缀，Suffix后缀
 *     x替换为武器/防具id或id范围，其中范围用a-b表示，
 *     如果基础装备是武器，则x为武器id，否则为防具id
 *     每一组x后的y%代表这一组id的概率占比，
 *     如果这一行的概率之和小于100%，则剩余的概率代表不添加
 *     最终的词缀装备id将会从这一行中
 *     所有的id组中按y%概率随机选择一个，
 *     然后从这个id组中随机选择一个id
 *
 *     例如 Random Prefix Equip: 2-5 8 50% 9-13 30%
 *     意思是有50%概率从2,3,4,5,8中选择一个，
 *     有30%概率从9,10,11,12,13中选择一个，
 *     还有20%概率不选择。
 *     
 *     注意：请不要将这条备注填入词缀装备的随机属性列表中，以防止无限嵌套
 *
 * ============================================================================
 *  插件指令
 * ============================================================================
 *
 *   是否锁定随机属性
 *
 *   锁定随机词缀池
 *
 *   重置随机词缀池
 *
 *   注意：一旦重启了游戏，则装备将会恢复获得随机属性
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 * 
 * $gameSystem.averagePartyLevel()
 *     返回队伍中所有成员的平均等级
 * 
 * $gameSystem.averageBattleLevel()
 *     返回队伍中所有参战成员的平均等级
 *
 * ItemManager.combineAffixWithBaseItem(affixItem, newItem, affixType)
 *     将一个武器/防具作为词缀加到另一个武器/防具上
 *     其中affixItem为词缀装备，newItem为目标装备
 *     affixType为词缀类型，填'prefix'或者'suffix'，
 *     不填的话默认为'prefix'
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
 * @command ChangeVarianceStock
 * @text 是否锁定随机属性
 * @desc 锁定后，接下来获得的装备均没有随机属性，默认为解锁状态
 *
 * @arg varianceStock
 * @text 锁定/解锁
 * @type boolean
 * @on 锁定
 * @off 解锁
 * @desc 锁定/解锁随机属性
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForceItemAffix
 * @text 锁定随机词缀池
 * @desc 锁定随机词缀池
 *
 * @arg AffixType
 * @text 前缀/后缀
 * @type boolean
 * @on 前缀
 * @off 后缀
 * @desc 该词缀属于前缀/后缀
 * @default true
 *
 * @arg AffixItem
 * @text 词缀池内容
 * @type text[]
 * @desc 词缀池内容，每行按照 x x y% x x y% 填写
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ResetItemAffix
 * @text 重置随机词缀池
 * @desc 重置随机词缀池
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param General
 * @text ----常规设置----
 * @default
 *
 * @param EnableIndependEquip
 * @text 是否启用独立装备
 * @parent General
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 是否默认启用独立装备
 * @default true
 *
 * @param Random Variance
 * @text 独立装备默认随机属性浮动
 * @parent General
 * @type number
 * @desc 独立装备随机属性浮动，从非商店途径获得装备时，其属性会浮动。
 * @default 0
 *
 * @param Negative Variance
 * @text 是否允许负面随机属性
 * @parent General
 * @type boolean
 * @on 允许
 * @off 不允许
 * @desc 如果使用了独立装备随机属性浮动，是否允许属性变为负数？
 * @default false
 *
 * @param ShowSet
 * @text ----显示设置----
 * @default
 *
 * @param Name Format
 * @text 独立装备名格式
 * @parent ShowSet
 * @desc 独立装备名显示格式
 * %1 - 前缀, %2 - 基础名, %3 - 后缀, %4 Boost点数
 * @default %1%2%3%4
 *
 * @param Name Spacing
 * @text 是否显示前后缀空格
 * @parent ShowSet
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在前后缀之间及与基础名之间显示空格
 * @default false
 *
 * @param Boost Format
 * @text boost点数显示格式
 * @parent ShowSet
 * @desc 独立装备boost点数显示格式
 * %1 - boost点数
 * @default (+%1)
 *
 * @param List Equipped Items
 * @text 是否显示已装备的独立装备
 * @parent ShowSet
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在物品列表中显示已装备的独立装备?
 * @default true
 *
 * @param Equipped Items Type
 * @text 已装备的独立装备显示模式
 * @parent ShowSet
 * @type select
 * @option 显示装备角色名称
 * @option 显示装备角色头像
 * @option 不显示角色标记
 * @desc 已装备的独立装备显示模式
 * @default 显示装备角色头像
 *
 * @param AffixSet
 * @text ----词缀设置----
 * @default
 *
 * @param AffixNameType
 * @text 词缀名称类型
 * @parent AffixSet
 * @type select
 * @option 替代基础装备的原有词缀
 * @value 替代
 * @option 叠加基础装备的原有词缀
 * @value 叠加
 * @option 不改变基础装备的原有词缀
 * @value 不变
 * @desc 词缀名称类型
 * @default 替代
 *
 * @param ReplaceAffixAnimation
 * @text 替换为词缀动画?
 * @parent AffixSet
 * @type boolean
 * @on 替换
 * @off 不替换
 * @desc 是否用词缀装备的动画来替代基础装备的动画
 * @default false
 *
 * @param ReplaceAffixType
 * @text 替换为词缀武器/防具类型?
 * @parent AffixSet
 * @type boolean
 * @on 替换
 * @off 不替换
 * @desc 是否用词缀装备的武器/防具类型来替代基础装备的武器/防具类型
 * @default false
 *
 * @param ReplaceAffixIcon
 * @text 词缀装备图标类型
 * @parent AffixSet
 * @type select
 * @option 词缀装备的图标替代基础装备的图标
 * @value 替代
 * @option 词缀装备的图标叠加基础装备的图标
 * @value 叠加
 * @option 不显示词缀装备的图标
 * @value 不变
 * @desc 词缀装备图标类型
 * @default 不变
 *
 * @param ReplaceAffixColor
 * @text 替换为词缀物品颜色?
 * @parent AffixSet
 * @type boolean
 * @on 替换
 * @off 不替换
 * @desc 是否用词缀装备的物品颜色来替代基础装备的物品颜色
 * @default true
 *
 * @param Price Add
 * @text ----随机变动----
 * @default
 *
 * @param ParamPriceAdd
 * @text 每一点参数的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机属性时，每一点参数会将对应的价格加上。
 * @default 10
 *
 * @param AttackElementPriceAdd
 * @text 攻击属性的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机攻击属性时，会将对应的价格加上。
 * @default 50
 *
 * @param AttackStatePriceAdd
 * @text 攻击附加状态的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机攻击附加状态时，会将对应的价格加上。
 * @default 50
 *
 * @param DebuffRatePriceAdd
 * @text Debuff有效度的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机debuff有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param ElementRatePriceAdd
 * @text 属性有效度的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机属性有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param SkillPriceAdd
 * @text 附加技能的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机附加技能时，会将对应的价格加上。
 * @default 50
 *
 * @param StypePriceAdd
 * @text 附加技能类型的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机附加技能类型时，会将对应的价格加上。
 * @default 50
 *
 * @param StateRatePriceAdd
 * @text 状态有效度的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机状态有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param StateResistPriceAdd
 * @text 状态免疫的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有随机状态免疫时，会将对应的价格加上。
 * @default 50
 *
 * @param AugmentSlotPriceAdd
 * @text 镶嵌槽的价格附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有一个随机镶嵌槽时，会将对应的价格加上。
 * @default 50
 *
 * @param BoostPointAdd
 * @text 随机属性的Boost点数附加
 * @parent Price Add
 * @type number
 * @desc 当装备具有一项随机属性时，会将对应的Boost点数加上。
 * @default 0
 *
 */

//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.IES.pluginName);
GF.Param = GF.Param || {};

GF.Param.IESEnableIndependEquip = eval(GF.Parameters['EnableIndependEquip']);
GF.Param.IESRandomVariance = Number(GF.Parameters['Random Variance']);
GF.Param.IESNegVar = eval(GF.Parameters['Negative Variance']);

GF.Param.IESNameFmt = String(GF.Parameters['Name Format']);
GF.Param.IESNameSpacing = String(GF.Parameters['Name Spacing']);
GF.Param.IESBoostFmt = String(GF.Parameters['Boost Format']);
GF.Param.IESShEquipped = eval(GF.Parameters['List Equipped Items']);
GF.Param.IESEquippedItemType = String(GF.Parameters['Equipped Items Type']);

GF.Param.IESAffixNameType = String(GF.Parameters['AffixNameType']);
GF.Param.IESReplaceAffixAni = eval(GF.Parameters['ReplaceAffixAnimation']);
GF.Param.IESReplaceAffixType = eval(GF.Parameters['ReplaceAffixType']);
GF.Param.IESReplaceAffixIcon = String(GF.Parameters['ReplaceAffixIcon']);
GF.Param.IESReplaceAffixColor = eval(GF.Parameters['ReplaceAffixColor']);

GF.Param.IESParamPriceAdd = Number(GF.Parameters['ParamPriceAdd']);
GF.Param.IESAttackElementPriceAdd = Number(GF.Parameters['AttackElementPriceAdd']);
GF.Param.IESAttackStatePriceAdd = Number(GF.Parameters['AttackStatePriceAdd']);
GF.Param.IESDebuffRatePriceAdd = Number(GF.Parameters['DebuffRatePriceAdd']);
GF.Param.IESElementRatePriceAdd = Number(GF.Parameters['ElementRatePriceAdd']);
GF.Param.IESSkillPriceAdd = Number(GF.Parameters['SkillPriceAdd']);
GF.Param.IESStypePriceAdd = Number(GF.Parameters['StypePriceAdd']);
GF.Param.IESStateRatePriceAdd = Number(GF.Parameters['StateRatePriceAdd']);
GF.Param.IESStateResistPriceAdd = Number(GF.Parameters['StateResistPriceAdd']);
GF.Param.IESAugmentSlotPriceAdd = Number(GF.Parameters['AugmentSlotPriceAdd']);
GF.Param.IESBoostPointAdd = Number(GF.Parameters['BoostPointAdd']);

//=============================================================================
// DataManager
//=============================================================================

GF.IES.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!GF.IES.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!GF._loaded_GF_3_IndependEquipSystem) {
        this.setDatabaseLengths();
        this.processIESystemNotetags($dataWeapons);
        this.processIESystemNotetags($dataArmors);
        GF._loaded_GF_3_IndependEquipSystem = true;
    }
    return true;
};

DataManager.setDatabaseLengths = function () {
    this._baseWeaponsLength = $dataWeapons.length;
    this._baseArmorsLength = $dataArmors.length;
};

DataManager.processIESystemNotetags = function (group) {
	for (const obj of group) {
		if (!obj) continue;
		this.setupIESystemNotetags(obj);
	}
};

DataManager.setupIESystemNotetags = function (obj) {
	var notedata = obj.note.split(/[\r\n]+/);

	obj.randomVariance = GF.Param.IESRandomVariance;
	obj.independent = GF.Param.IESEnableIndependEquip;
	obj.setPriorityName = false;
	obj.onCreationEval = '';
	obj.randomParamList = [];
	obj.affixItemRequire = true;
	obj.customAffixEffect = '';
	obj.combineItemList = [];
	obj.affixItemSet = {};
	obj.affixItemSet.nameType = GF.Param.IESAffixNameType;
	obj.affixItemSet.replaceAnimation = GF.Param.IESReplaceAffixAni;
	obj.affixItemSet.replaceType = GF.Param.IESReplaceAffixType;
	obj.affixItemSet.iconType = GF.Param.IESReplaceAffixIcon;
	obj.affixItemSet.replaceColor = GF.Param.IESReplaceAffixColor;
	var evalMode = 'none';

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(/<(?:RANDOM VARIANCE|随机变化):\s*(\d+)>/i)) {
			obj.randomVariance = parseInt(RegExp.$1);
		} else if (line.match(/<(?:INDEPEND EQUIP|独立装备):\s*(TRUE|FALSE)>/i)) {
			obj.independent = eval(RegExp.$1);
		} else if (line.match(/<(?:PRIORITY NAME|锁定名称)>/i)) {
			obj.setPriorityName = true;
		} else if (line.match(/<(?:ON CREATION EVAL|生成代码)>/i)) {
			evalMode = 'on create eval';
		} else if (line.match(/<\/(?:ON CREATION EVAL|生成代码)>/i)) {
			evalMode = 'none';
		} else if (evalMode === 'on create eval') {
			obj.onCreationEval = obj.onCreationEval + line + '\n';
		} else if (line.match(/<(?:RANDOM ITEM PARAM|随机装备属性)>/i)) {
			evalMode = 'randomParam';
		} else if (line.match(/<\/(?:RANDOM ITEM PARAM|随机装备属性)>/i)) {
			evalMode = 'none';
		} else if (evalMode === 'randomParam') {
			obj.randomParamList.push(line);
		} else if (line.match(/<(?:USE WEAPON AFFIX|使用武器词缀)>/i)) {
			obj.useWeaponAffix = true;
		} else if (line.match(/<(?:USE ARMOR AFFIX|使用防具词缀)>/i)) {
			obj.useArmorAffix = true;
		} else if (line.match(/<(?:CUSTOM AFFIX REQUIREMENT|词缀装备条件)>/i)) {
			evalMode = 'custom requirement';
			obj.affixItemRequire = '';
		} else if (line.match(/<\/(?:CUSTOM AFFIX REQUIREMENT|词缀装备条件)>/i)) {
			evalMode = 'none';
		} else if (line.match(/<(?:CUSTOM AFFIX EFFECT|词缀额外效果)>/i)) {
			evalMode = 'custom effect';
		} else if (line.match(/<\/(?:CUSTOM AFFIX EFFECT|词缀额外效果)>/i)) {
			evalMode = 'none';
		} else if (line.match(/<(?:SUFFIXES|后缀)>/i)) {
			evalMode = 'suffix';
		} else if (line.match(/<\/(?:SUFFIXES|后缀)>/i)) {
			evalMode = 'none';
		} else if (line.match(/<(?:PREFIXES|前缀)>/i)) {
			evalMode = 'prefix';
		} else if (line.match(/<\/(?:PREFIXES|前缀)>/i)) {
			evalMode = 'none';
		} else if (line.match(/<(?:AFFIX ITEM SET|词缀装备设置)>/i)) {
			evalMode = 'affix item set';
		} else if (line.match(/<\/(?:AFFIX ITEM SET|词缀装备设置)>/i)) {
			evalMode = 'none';
		} else if (evalMode === 'custom requirement') {
			obj.affixItemRequire = obj.affixItemRequire + line + '\n';
		} else if (evalMode === 'custom effect') {
			obj.customAffixEffect = obj.customAffixEffect + line + '\n';
		} else if (evalMode === 'suffix' || evalMode === 'prefix') { 
			obj.combineItemList.push(this.processCombineItem(line, evalMode));
		} else if (evalMode === 'affix item set') {
			this.processAffixItemSet(obj, line);
		}
	}
};

DataManager.processAffixItemSet = function (obj, line) {
	var set = obj.affixItemSet;
	if (line.match(/NAME TYPE:[ ](.*)/i)) {
		set.nameType = String(RegExp.$1);
	} else if (line.match(/AFFIX NAME:[ ](.*)/i)) {
		set.affixName = String(RegExp.$1);
	} else if (line.match(/REPLACE ANIMATION/i)) {
		set.replaceAnimation = true;
	} else if (line.match(/REPLACE TYPE/i)) {
		set.replaceType = true;
	} else if (line.match(/ICON TYPE:[ ](.*)/i)) {
		set.iconType = String(RegExp.$1);
	} else if (line.match(/REPLACE COLOR/i)) {
		set.replaceColor = true;
	} else if (line.match(/AFFIX TYPE:[ ](.*)/i)) {
		var type = String(RegExp.$1);
		if (type === 'prefix' || type === 'suffix') {
			set.affixType = type;
		}
	} else if (line.match(/LINKED EQUIP SUIT:[ ](\d+)/i)) {
		set.linkedESuit = parseInt(RegExp.$1);
	}
};

DataManager.processCombineItem = function (line, affixType) {
	var lineSplit = line.trim().split(/\s+/i);
	var numberLine = "";
	var lineChoices = [];
	for (var j = 0; j < lineSplit.length; j++) {
		var split = lineSplit[j];
		if (split.contains("%")) {
			var chance = parseInt(split.replace('%', ''));
			lineChoices.push({chance: chance, line: numberLine.trim()});
			numberLine = '';
		} else {
			numberLine += split + ' ';
		}
	}
	return {lineChoices: lineChoices, affixType: affixType};
};

GF.IES.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    GF.IES.DataManager_createGameObjects.call(this);
    this.createIndependentGroups();
    this.loadIndependentItems();
};

DataManager.createIndependentGroups = function () {
    this._independentWeapons = [];
    this._independentArmors = [];
};

DataManager.loadIndependentItems = function () {
	const difWeapons = $dataWeapons.length - DataManager._baseWeaponsLength;
	$dataWeapons.splice(DataManager._baseWeaponsLength, difWeapons);
	this.setIndependentLength($dataWeapons);
	$dataWeapons = $dataWeapons.concat(this._independentWeapons);

	var difArmors = $dataArmors.length - DataManager._baseArmorsLength;
	$dataArmors.splice(DataManager._baseArmorsLength, difArmors);
	this.setIndependentLength($dataArmors);
	$dataArmors = $dataArmors.concat(this._independentArmors);
};

DataManager.independentEquipStartId = function () {
	return 2000;
};

DataManager.setIndependentLength = function (group) {
	const stratId = this.independentEquipStartId();
	while(group.length <= stratId) {
		group.push(null);
	}
};

DataManager.saveGameWithoutRescue = function (savefileId) {
    var json = JsonEx.stringify(this.makeSaveContents());
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

GF.IES.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = GF.IES.DataManager_makeSaveContents.call(this);
    contents.weapons = this._independentWeapons;
    contents.armors = this._independentArmors;
    return contents;
};

GF.IES.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    GF.IES.DataManager_extractSaveContents.call(this, contents);
    this._independentWeapons = contents.weapons || [];
    this._independentArmors = contents.armors || [];
    this.loadIndependentItems();
};

DataManager.isIndependent = function (item) {
    if (!item) return false;
    if (this.isBattleTest()) return false;
	if (this.isItem(item)) return false; 	
    if (this.isWeapon(item)) return item.independent;
    if (this.isArmor(item)) return item.independent;
    return false;
};

DataManager.registerNewItem = function (item) {
    if (!this.isNewItemValid(item)) return item;
    var newItem = JsonEx.makeDeepCopy(item);
    this.addNewIndependentItem(item, newItem);
    return newItem;
};

DataManager.isNewItemValid = function (item) {
    if (!item) return false;
	if (this.isItem(item)) return false;
    if (item.baseItemId) return false;
    return item.id === this.getDatabase(item).indexOf(item);
};

DataManager.addNewIndependentItem = function (baseItem, newItem) {
	this.setNewIndependentItemId(baseItem, newItem);
    ItemManager.setNewIndependentItem(baseItem, newItem);
	this.pushNewIndependentItemIntoGroup(baseItem, newItem);
};

DataManager.setNewIndependentItemId = function (baseItem, newItem) {
	var start = this.independentEquipStartId() + 1;
	var database = this.getDatabase(baseItem);
	var index = database.indexOf(null, start);
	newItem.id = (index > -1) ? index : database.length;
};

DataManager.pushNewIndependentItemIntoGroup = function (baseItem, newItem) {
    var database = this.getDatabase(baseItem);
	var container = this.getContainer(baseItem);
	if (newItem.id === this.getDatabase(baseItem).length) {
		database.push(newItem);
		container.push(newItem);
	} else {
		var index = newItem.id;
		database[index] = newItem;
		container[index - this.independentEquipStartId() - 1] = newItem;
	}
};

DataManager.removeIndependentItem = function (item) {
    if (!item) return;
    if (this.independentItemIsUsed(item)) return;
    var container = this.getContainer(item);
    var database = this.getDatabase(item);
    var index = container.indexOf(item);
    container[index] = null;
    var index = database.indexOf(item);
    database[index] = null;
};

DataManager.independentItemIsUsed = function (item) {
    if ($gameParty.numItems(item) > 0) return false;
    for (var i = 0; i < $dataActors.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (actor.equips().contains(item)) return true;
    }
    return false;
};

DataManager.getDatabase = function (item) {
    if (!item) return [];
    if (this.isItem(item)) return [];
    if (this.isWeapon(item)) return $dataWeapons;
    if (this.isArmor(item)) return $dataArmors;
    return [];
};

DataManager.getContainer = function (item) {
    if (!item) return [];
    if (this.isItem(item)) return [];
    if (this.isWeapon(item)) return this._independentWeapons;
    if (this.isArmor(item)) return this._independentArmors;
    return [];
};

DataManager.getBaseItem = function (item) {
    if (!this.isIndependent(item)) return item;
    if (!item.baseItemId) return item;
    var baseItem = this.getDatabase(item)[item.baseItemId];
    return baseItem;
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.setNewIndependentItem = function (baseItem, newItem) {
    this.initialNewIndependentItem(baseItem, newItem);
	this.customizeNewIndependentItem(baseItem, newItem);
    this.onCreationEval(baseItem, newItem);
};

ItemManager.initialNewIndependentItem = function (baseItem, newItem) {
	newItem.baseItemId = baseItem.id;
    newItem.baseItemName = baseItem.name;
    newItem.baseItemPrice = baseItem.price;
    newItem.baseItemIconIndex = baseItem.iconIndex;
    newItem.namePrefix = '';
    newItem.nameSuffix = '';
    newItem.priorityName = baseItem.setPriorityName ? baseItem.name : '';
    newItem.boostCount = 0;
    newItem.note = '';
};

ItemManager.customizeNewIndependentItem = function (baseItem, newItem) {
	this.randomizeInitialEquip(baseItem, newItem);
	this.processRandomItemParamList(baseItem, newItem);
	this.applyItemCombineEffect(baseItem, newItem);
    this.updateItemName(newItem);
};

ItemManager.randomizeInitialEquip = function (baseItem, newItem) {
	if ($gameTemp.varianceStock()) return;
    if (baseItem.randomVariance <= 0) return;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    for (var i = 0; i < 8; ++i) {
        if (newItem.params[i] === 0) continue;
        newItem.params[i] += Math.floor(Math.random() * randomValue - offset);
        if (!GF.Param.IESNegVar && baseItem.params[i] >= 0) {
            newItem.params[i] = Math.max(newItem.params[i], 0);
        }
		var value = newItem.params[i] - baseItem.params[i];
		newItem.price += value * GF.Param.IESParamPriceAdd;
    }
};

ItemManager.processRandomItemParamList = function (baseItem, newItem) {
	if (!newItem.randomParamList || !newItem.randomParamList.length) return;
	if ($gameTemp.varianceStock()) return;
	var list = newItem.randomParamList;
	for (var i = 0; i < list.length; ++i) {
		var line = list[i];
		this.processRandomItemParam(line, baseItem, newItem);
	}
};

ItemManager.processRandomItemParam = function (line, baseItem, newItem) {
	const lineSplit = line.split(':');
	// RANDOM ATTACK ELEMENT: x x x
	if (lineSplit[0].trim().match(/RANDOM ATTACK ELEMENT/i)) {
		var elementList = this.getNumberList(lineSplit[1]);
		return this.applyRandomAttackElement(newItem, elementList);
	} 
	// RANDOM ATTACK STATE: x x x
	if (lineSplit[0].trim().match(/RANDOM ATTACK STATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomAttackState(newItem, text);
	}
	// RANDOM DEBUFF RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM DEBUFF RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomDebuffRate(newItem, text);
	}
	// RANDOM ELEMENT RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM ELEMENT RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomElementRate(newItem, text);
	} 
    // RANDOM SKILL: x x x
    if (lineSplit[0].trim().match(/RANDOM SKILL/i)) {
		var skillList = this.getNumberList(lineSplit[1]);
		return this.applyRandomSkill(newItem, skillList);
	}
	// RANDOM SKILL TYPE: x x x
	if (lineSplit[0].trim().match(/RANDOM SKILL TYPE/i)) {
		var stypeList = this.getNumberList(lineSplit[1]);
		return this.applyRandomSkillType(newItem, stypeList);
	} 
	// RANDOM STATE RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM STATE RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomStateRate(newItem, text);
	} 
	// RANDOM STATE RESIST: x x x
	if (lineSplit[0].trim().match(/RANDOM STATE RESIST/i)) {
		var stateList = this.getNumberList(lineSplit[1]);
		return this.applyRandomStateResist(newItem, stateList);
	}
	// RANDOM AUGMENT SLOT: x x x
	if (Imported.GF_4_EquipAttach) {
		if (lineSplit[0].trim().match(/RANDOM AUGMENT SLOT/i)) {
			var text = lineSplit[1].toUpperCase().trim();
			return this.applyRandomAugmentSlot(newItem, text);
		}
	}
	// RANDOM PREFIX: x x y% x x y%
	if (lineSplit[0].trim().match(/RANDOM PREFIX EQUIP/i)) {
		var affixList = DataManager.processCombineItem(lineSplit[1], 'prefix');
		return this.applyPerItemCombineEffect([affixList], baseItem, newItem);
	}
	// RANDOM SUFFIX: x x y% x x y%
	if (lineSplit[0].trim().match(/RANDOM SUFFIX EQUIP/i)) {
		var affixList = DataManager.processCombineItem(lineSplit[1], 'suffix');
		return this.applyPerItemCombineEffect([affixList], baseItem, newItem);
	}
	// STAT: MIN MAX
	if (line.match(/RANDOM[ ](.*):[ ]([\-]?\d+)[ ]([\-]?\d+)/i)) {
		var min = parseInt(RegExp.$2) || 0;
		var max = parseInt(RegExp.$3) || 0;
		var paramList = String(RegExp.$1).toUpperCase().trim().split(/\s+/i);
		return this.applyRandomParamPlus(newItem, paramList, min, max);
	}
	// STAT: MIN% MAX%
	if (line.match(/RANDOM[ ](.*):[ ]([\-]?\d+)[%％][ ]([\-]?\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$2) || 0;
		var max = parseFloat(RegExp.$3) || 0;
		var paramList = String(RegExp.$1).toUpperCase().trim().split(/\s+/i);
		return this.applyRandomParamRate(newItem, paramList, min, max);
	}
};

ItemManager.addTraitToItem = function(item, code, dataId, value) {
    var trait = {
      code: code,
      dataId: dataId,
      value: value
    }
    item.traits.push(trait);
};

ItemManager.interpretParamNote = function (string) {
	var paramList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	var xParamList = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
	var sParamList = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
	if (paramList.indexOf(string) >= 0 && paramList.indexOf(string) < 8)
		return [paramList.indexOf(string), 'TRAIT_PARAM'];
	if (xParamList.indexOf(string) >= 0 && xParamList.indexOf(string) < 10)
		return [xParamList.indexOf(string), 'TRAIT_XPARAM'];
	if (sParamList.indexOf(string) >= 0 && sParamList.indexOf(string) < 10)
		return [sParamList.indexOf(string), 'TRAIT_SPARAM'];
	return [null, null];
};

ItemManager.applyRandomParamPlus = function (newItem, paramList, min, max) {
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
	var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
	newItem.params[paramId] += randomValue;
	newItem.price += randomValue * GF.Param.IESParamPriceAdd;
	var boost = GF.Param.IESBoostPointAdd * (randomValue > 0 ? 1 : -1);
	newItem.boostCount += boost;
};

ItemManager.applyRandomParamRate = function(newItem, paramList, min, max) {
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
	var paramType = this.interpretParamNote(param)[1];
	var code = Game_BattlerBase[paramType];
	var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
	var rate = parseFloat(randomValue * 0.01) + 1;
	var value = 0;
	if (paramType === 'TRAIT_PARAM') {
		value = Math.floor(newItem.params[paramId] * (rate - 1));
	} else if (paramType === 'TRAIT_XPARAM') {
		value = randomValue;
		rate -= 1;
	}
	newItem.price += value * GF.Param.IESParamPriceAdd;
	var boost = GF.Param.IESBoostPointAdd * (randomValue > 0 ? 1 : -1);
	newItem.boostCount += boost;
	this.addTraitToItem(newItem, code, paramId, rate);
};

ItemManager.applyRandomAttackElement = function(newItem, elementList) {
	if (!elementList || !elementList.length) return;
    var id = this.getRandomIdInList(elementList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
	newItem.price += GF.Param.IESAttackElementPriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd;
    this.addTraitToItem(newItem, code, id, 0);
};

ItemManager.applyRandomAttackState = function(newItem, text) {
	if (text.contains(',')) {
		var textSplit = text.split(',');
		if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
			var min = parseFloat(RegExp.$1);
			var max = parseFloat(RegExp.$2);
			var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
			var rate = parseFloat(randomValue * 0.01);
		}
		else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
			var rate = parseFloat(RegExp.$1 * 0.01);
		}
		var stateList = this.getNumberList(textSplit[0]);
    } else {
		var stateList = this.getNumberList(text);
		var rate = 1.0;
    }
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_ATTACK_STATE;
	newItem.price += GF.Param.IESAttackStatePriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd;
    this.addTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomDebuffRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    } else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var paramList = textSplit[0].trim().split(/\s+/i);
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
    var code = Game_BattlerBase.TRAIT_DEBUFF_RATE;
	newItem.price += GF.Param.IESDebuffRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GF.Param.IESBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addTraitToItem(newItem, code, paramId, rate);	
};

ItemManager.applyRandomElementRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    } else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var elementList = this.getNumberList(textSplit[0]);
	var id = this.getRandomIdInList(elementList);
	if (!id) return;
	var code = Game_BattlerBase.TRAIT_ELEMENT_RATE;
	newItem.price += GF.Param.IESElementRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GF.Param.IESBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomSkill = function(newItem, skillList) {
	if (!skillList || !skillList.length) return;
	var id = this.getRandomIdInList(skillList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_SKILL_ADD;
	newItem.price += GF.Param.IESSkillPriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd;
    this.addTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomSkillType = function(newItem, stypeList) {
	if (!stypeList || !stypeList.length) return;
	var id = this.getRandomIdInList(stypeList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_STYPE_ADD;
	newItem.price += GF.Param.IESStypePriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd;
    this.addTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomStateRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    } else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var stateList = this.getNumberList(textSplit[0]);
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
	var code = Game_BattlerBase.TRAIT_STATE_RATE;
	newItem.price += GF.Param.IESStateRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GF.Param.IESBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomStateResist = function(newItem, stateList) {
    if (!stateList || !stateList.length) return;
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_STATE_RESIST;
	newItem.price += GF.Param.IESStateResistPriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd;
    this.addTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomAugmentSlot = function(newItem, text) {
	if (text.contains(',')) {
		var textSplit = text.split(',');
		if (textSplit[1].trim().match(/(\d+)[ ](\d+)/i)) {
			var min = parseInt(RegExp.$1);
			var max = parseInt(RegExp.$2);
			var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
		} else if (textSplit[1].trim().match(/(\d+)/i)) {
			var randomValue = parseInt(RegExp.$1);
		}
		var slotList = textSplit[0].trim().split(/\s+/i);
    } else {
		var randomValue = 1;
		var slotList = text.trim().split(/\s+/i);
    }
	if (!randomValue) return;
	var slotAdd = [];
	for (var i = 0; i < randomValue; i++) {
		var slot = this.getRandomIdInList(slotList);
		if (!slot) continue;
		slotAdd.push(slot);
	}		
	newItem.augmentSlots = newItem.augmentSlots.concat(slotAdd);
	newItem.price += GF.Param.IESAugmentSlotPriceAdd;
	newItem.boostCount += GF.Param.IESBoostPointAdd * randomValue;
};

ItemManager.getRandomIdInList = function (array) {
	const diceRoll = Math.floor(Math.random() * array.length);
	const selected = array[diceRoll];
	return selected;
};

ItemManager.getNumberList = function (string) {
	var nums = [];
	var stringSplit = string.trim().split(/\s+/i);
	for (var i = 0; i < stringSplit.length; i++) {
		if (stringSplit[i].contains('-')) {
			var split = stringSplit[i].split('-');
			var min = parseInt(split[0]);
			var max = parseInt(split[1]);
			if (!min || min > max) continue;
			for (var j = min; j <= max; j++) {
				nums.push(j);
			}
		} else {
			nums.push(parseInt(stringSplit[i]));
		}
	}
	return nums;
};

ItemManager.setBaseName = function (item, value) {
    item.baseItemName = value;
};

ItemManager.setNamePrefix = function (item, value) {
    item.namePrefix = value;
    if (eval(GF.Param.IESNameSpacing) && item.namePrefix.length > 0) {
        item.namePrefix = item.namePrefix + ' ';
    }
};

ItemManager.setNameSuffix = function (item, value) {
    item.nameSuffix = value;
    if (eval(GF.Param.IESNameSpacing) && item.nameSuffix.length > 0) {
        item.nameSuffix = ' ' + item.nameSuffix;
    }
};

ItemManager.setPriorityName = function (item, value) {
    item.priorityName = value;
};

ItemManager.updateItemName = function (item) {
    if (item.priorityName && item.priorityName.length > 0) {
        item.name = item.priorityName;
        return;
    }
    var prefix = item.namePrefix || '';
    var baseName = item.baseItemName || '';
    var suffix = item.nameSuffix || '';
    var boostCount = item.boostCount || 0;
    var fmt = GF.Param.IESBoostFmt;
    var boostText = fmt.format(boostCount);
    if (boostText === fmt.format(0)) {
        boostText = '';
    } else if (eval(GF.Param.IESNameSpacing)) {
        boostText = ' ' + boostText;
    }
    fmt = GF.Param.IESNameFmt;
    item.name = fmt.format(prefix, baseName, suffix, boostText);
};

ItemManager.increaseItemBoostCount = function (item, value) {
    value = value || 0;
    if (!item.boostCount) item.boostCount = 0;
    item.boostCount += value;
    this.updateItemName(item);
};

ItemManager.onCreationEval = function (baseItem, newItem) {
    var item = newItem;
    if (item.onCreationEval === '') return;
    var weapon = item;
    var armor = item;
    var baseWeapon = baseItem;
    var baseArmor = baseItem;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.onCreationEval;
    try {
        eval(code);
    } catch (e) {
		GF.Util.displayError(e, code, 'ITEM CREATION CUSTOM CODE ERROR');
    }
    item.onCreationEval = '';
};


ItemManager.applyItemCombineEffect = function (baseItem, newItem) {
	if (!newItem.combineItemList || !newItem.combineItemList.length) return;
	if ($gameTemp.varianceStock()) return;
	const forceItemAffix = $gameSystem.forceItemAffix();
	if (forceItemAffix && forceItemAffix.length) {
		this.applyPerItemCombineEffect(forceItemAffix, baseItem, newItem);
	} else {
		this.applyPerItemCombineEffect(newItem.combineItemList, baseItem, newItem);
	}
};

ItemManager.applyPerItemCombineEffect = function (combineItemList, baseItem, newItem) {
	const dataType = this.getRIAItemDataType(newItem);
	for (const line of combineItemList) {
		var affixType = line.affixType;
		var id = this.getRandomObj(line, dataType);
		if (!id) continue;
		var affixItem = dataType[id];
		this.combineWithBaseItem(affixItem, baseItem, newItem, affixType);
	}
};

ItemManager.combineAffixWithBaseItem = function (affixItem, newItem, affixType) {
	if (!affixItem || !newItem) return;
	if (!affixItem.wtypeId && !affixItem.atypeId) return;
	if (!newItem.wtypeId && !newItem.atypeId) return;
	if (!affixType || !['prefix', 'suffix'].contains(affixType))
		affixType = 'prefix';
	const baseItem = DataManager.getBaseItem(newItem);
	this.combineWithBaseItem(affixItem, baseItem, newItem, affixType);
};

ItemManager.combineWithBaseItem = function (affixItem, baseItem, newItem, affixType) {
	this.combineSettedParam(affixItem, newItem, affixType);
	this.combineNormalParam(affixItem, newItem);
	this.combinePluginParam(affixItem, newItem);
	this.combineCustomEffect(affixItem, baseItem, newItem);
};

ItemManager.combineCustomEffect = function (affixItem, baseItem, newItem) {
	if (affixItem.customAffixEffect === '') return;
	eval(affixItem.customAffixEffect);
};

ItemManager.combineSettedParam = function (affixItem, newItem, affixType) {
	var set = affixItem.affixItemSet;
	if (set.affixType) 
		affixType = set.affixType;
	if (set.nameType !== '不变') {
		const affixName = set.affixName ? set.affixName : affixItem.name;
		if (affixType === "prefix") {
			const prefixName = set.nameType === '替代' ? affixName : affixName + newItem.namePrefix.trim();
			this.setNamePrefix(newItem, prefixName);
		} else if (affixType === "suffix") {
			const suffixName = set.nameType === '替代' ? affixName : newItem.nameSuffix.trim() + affixName;
			this.setNameSuffix(newItem, suffixName);
		}
		this.updateItemName(newItem);
	}
	if (set.replaceAnimation) {
		newItem.animationId = affixItem.animationId;
	}
	if (set.iconType === '替代') {
		newItem.iconIndex = affixItem.iconIndex;
	} else if (set.iconType === '叠加') {
		newItem.overlayIcons = newItem.overlayIcons || [];
		newItem.overlayIcons.push(affixItem.iconIndex);
	}
	if (set.replaceType) {
		if (newItem.wtypeId && affixItem.wtypeId) 
			newItem.wtypeId = affixItem.wtypeId;
		if (newItem.atypeId && affixItem.atypeId) 
			newItem.atypeId = affixItem.atypeId;
	}
	if (set.replaceColor) {
		newItem.textColor = affixItem.textColor;
	}
};

ItemManager.combineNormalParam = function (affixItem, newItem) {
	const list = affixItem.randomParamList;
	const baseItem = DataManager.getBaseItem(newItem);
	for (const line of list) {
		this.processRandomItemParam(line, baseItem, newItem);
	}
	newItem.price += affixItem.price;
	newItem.description += affixItem.description;
	newItem.traits = newItem.traits.concat(affixItem.traits);
	for (var i = 0; i < affixItem.params.length; i++) {
		newItem.params[i] += affixItem.params[i];
	}
};

ItemManager.getRIAItemDataType = function (newItem) {
	var dataType;
	if (newItem.wtypeId) 
		dataType = $dataWeapons;
	else if (newItem.atypeId) 
		dataType = $dataArmors;
	if (newItem.useArmorAffix) 
		dataType = $dataArmors;
	else if (newItem.useWeaponAffix) 
		dataType = $dataWeapons;
	return dataType;
};

ItemManager.isCombinedItem = function (item) {
	if (!item) return false;
	var enable = true;
	eval(item.affixItemRequire);
	return enable;
};

ItemManager.getRandomObj = function (choiceObj, dataType) {
	var diceRoll = Math.floor(Math.random() * 100) + 1;
	var lineChoices = choiceObj.lineChoices;
	var validChoices = [];
	for (var i = 0; i < lineChoices.length; i++) {
		var lineChoice = lineChoices[i];
		var itemIdList = this.getNumberList(lineChoice.line).filter(function (id) {
			return this.isCombinedItem(dataType[id]);
		}, this);
		if (itemIdList.length <= 0) continue;
		validChoices.push({chance: lineChoice.chance, itemIdList: itemIdList});
	}
	validChoices.sort(function (a, b) {
		if (a.chance === b.chance) {
			return Math.randomInt(2) === 0;
		}
		else {
			return a.chance - b.chance;
		}
	});
	for (var i = 0; i < validChoices.length; i++) {
		var chance = validChoices[i].chance;
		var itemIdList = validChoices[i].itemIdList;
		if (diceRoll <= chance) {
			return this.getRandomIdInList(itemIdList);
		} 
		else {
			diceRoll -= chance;
		}
	}
};

ItemManager.combinePluginParam = function (affixItem, newItem) {
	var set = affixItem.affixItemSet;
	
	newItem.weight += affixItem.weight;
	newItem.weightLimit += affixItem.weightLimit;
	if (!!affixItem.sellPrice) newItem.sellPrice += affixItem.sellPrice;
	//newItem.cannotSell = affixItem.cannotSell;
	//newItem.canSell = affixItem.canSell;
	newItem.randomVariance += affixItem.randomVariance;
    //newItem.setPriorityName = affixItem.setPriorityName;
    newItem.onCreationEval += affixItem.onCreationEval;
	if (Imported.GF_0_CoreOfParam) {
		for (var i = 0; i < 8; i++) {
			newItem.plusParams[i] += affixItem.plusParams[i];
			newItem.rateParams[i] *= affixItem.rateParams[i];
			newItem.flatParams[i] += affixItem.flatParams[i];
			//if (!!affixItem.maxParams[i])
			//	newItem.maxParams[i] = affixItem.maxParams[i];
			//if (!!affixItem.minParams[i])
			//	newItem.minParams[i] = affixItem.minParams[i];
		}
		for (var i = 0; i < 10; i++) {
			newItem.plusXParams[i] += affixItem.plusXParams[i];
			newItem.rateXParams[i] *= affixItem.rateXParams[i];
			newItem.flatXParams[i] += affixItem.flatXParams[i];
		}
		for (var i = 0; i < 10; i++) {
			newItem.plusSParams[i] += affixItem.plusSParams[i];
			newItem.rateSParams[i] *= affixItem.rateSParams[i];
			newItem.flatSParams[i] += affixItem.flatSParams[i];
		}
	}
	if (Imported.GF_4_EquipSuit) {
		if (set.linkedESuit) {
			var id = set.linkedESuit;
			if (newItem.equipSuit && newItem.equipSuit.contains(id)) {
				newItem.equipSuit = [id];
			}
		}
	}
	if (Imported.GF_3_ItemInfoWindow) {
		newItem.preInfos = newItem.preInfos.concat(affixItem.preInfos);
		newItem.afterInfos = newItem.afterInfos.concat(affixItem.afterInfos);
		newItem.topInfoText = newItem.topInfoText.concat(affixItem.topInfoText);
		newItem.bottomInfoText = newItem.bottomInfoText.concat(affixItem.bottomInfoText);
		newItem.infoEval += affixItem.infoEval;
	}
	if (Imported.GF_4_EquipAttach) {
		newItem.augmentSlots = newItem.augmentSlots.concat(affixItem.augmentSlots);
		newItem.augmentSlotsMax += affixItem.augmentSlotsMax;
	}
	if (Imported.GF_4_EquipUpgrade) {
		newItem.upgradeSlots += affixItem.upgradeSlots;
	}
	if (Imported.GF_4_PassiveState) {
		newItem.passiveStates = newItem.passiveStates.concat(affixItem.passiveStates);
	}
	if (Imported.YEP_AbsorptionBarrier) {
		newItem.barrierPenetrationRate += affixItem.barrierPenetrationRate;
		newItem.barrierPenetrationFlat += affixItem.barrierPenetrationFlat;
		//newItem.battleStartBarrierPoints = affixItem.battleStartBarrierPoints;
		//newItem.barrierRegen = affixItem.barrierRegen;
		newItem.barrierPenetrationRateEval += affixItem.barrierPenetrationRateEval;
		newItem.barrierPenetrationFlatEval += affixItem.barrierPenetrationFlatEval;
		//newItem.battleStartBarrierPointsEval = affixItem.battleStartBarrierPointsEval;
		//newItem.barrierRegenEval = affixItem.barrierRegenEval;
	}
	if (Imported.YEP_BattleEngineCore) {
		//newItem.reflectAnimationId = affixItem.reflectAnimationId;
		//newItem.spriteCannotMove = affixItem.spriteCannotMove;
		//newItem.anchorX = affixItem.anchorX;
		//newItem.anchorY = affixItem.anchorY;
	}
	if (Imported.YEP_BuffsStatesCore) {
		for (var i = 0; i < 8; i++) {
			newItem.maxBuff[i] += affixItem.maxBuff[i];
			newItem.maxDebuff[i] += affixItem.maxDebuff[i];
			
		}
	}
	if (Imported.YEP_DamageCore) {
		//newItem.breakDamageCap = affixItem.breakDamageCap;
		if (!!affixItem.damageCap) {
			if (!!newItem.damageCap)
				newItem.damageCap += affixItem.damageCap;
			else
				newItem.damageCap = affixItem.damageCap;
		}
		if (!!affixItem.healCap) {
			if (!!newItem.healCap)
				newItem.healCap += affixItem.healCap;
			else
				newItem.healCap = affixItem.healCap;
		}
	}
	if (Imported.YEP_DashToggle) {
		//newItem.disableDashing = affixItem.disableDashing;
	}
	if (Imported.YEP_ElementCore) {
		newItem.elementAbsorb = newItem.elementAbsorb.concat(affixItem.elementAbsorb);
		//newItem.elementReflect = affixItem.elementReflect;
		//newItem.elementAmplify = affixItem.elementAmplify;
		//newItem.elementMagnify = affixItem.elementMagnify;
		//newItem.elementNull = affixItem.elementNull;
		//newItem.elementForcedRate = affixItem.elementForcedRate;
	}
	if (Imported.YEP_EquipBattleSkills) {
		newItem.equipSkillSlots += affixItem.equipSkillSlots;
	}
	
	if (Imported.YEP_InstantCast) {
		newItem.instantSkill = newItem.instantSkill.concat(affixItem.instantSkill);
		newItem.instantItem = newItem.instantItem.concat(affixItem.instantItem);
		newItem.cancelInstantSkill = newItem.cancelInstantSkill.concat(affixItem.cancelInstantSkill);
		newItem.cancelInstantItem = newItem.cancelInstantItem.concat(affixItem.cancelInstantItem);
	}
	if (Imported.YEP_LifeSteal) {
		newItem.lifeSteal.hpPhysicalRate *= affixItem.lifeSteal.hpPhysicalRate;
		newItem.lifeSteal.hpMagicalRate *= affixItem.lifeSteal.hpMagicalRate;
		newItem.lifeSteal.hpCertainRate *= affixItem.lifeSteal.hpCertainRate;
		newItem.lifeSteal.hpPhysicalFlat += affixItem.lifeSteal.hpPhysicalFlat;
		newItem.lifeSteal.hpMagicalFlat += affixItem.lifeSteal.hpMagicalFlat;
		newItem.lifeSteal.hpCertainFlat += affixItem.lifeSteal.hpCertainFlat;
		newItem.lifeSteal.mpPhysicalRate *= affixItem.lifeSteal.mpPhysicalRate;
		newItem.lifeSteal.mpMagicalRate *= affixItem.lifeSteal.mpMagicalRate;
		newItem.lifeSteal.mpCertainRate *= affixItem.lifeSteal.mpCertainRate;
		newItem.lifeSteal.mpPhysicalFlat += affixItem.lifeSteal.mpPhysicalFlat;
		newItem.lifeSteal.mpMagicalFlat += affixItem.lifeSteal.mpMagicalFlat;
		newItem.lifeSteal.mpCertainFlat += affixItem.lifeSteal.mpCertainFlat;
		//newItem.lifeSteal.allGuard = affixItem.lifeSteal.allGuard;
		//newItem.lifeSteal.hpGuard = affixItem.lifeSteal.hpGuard;
		//newItem.lifeSteal.mpGuard = affixItem.lifeSteal.mpGuard;
		//newItem.lifeSteal.allNull = affixItem.lifeSteal.allNull;
		//newItem.lifeSteal.hpNull = affixItem.lifeSteal.hpNull;
		//newItem.lifeSteal.mpNull = affixItem.lifeSteal.mpNull;
	}
	if (Imported.YEP_RowFormation) {
		//newItem.rowLock = affixItem.rowLock;
	}
	
	if (Imported.YEP_StealSnatch) {
		//newItem.autoDebuff = affixItem.autoDebuff;
		newItem.afterStealEval += affixItem.afterStealEval;
		for (var i = 0; i < 5; i++) {
			newItem.stealRateBonus[i] += affixItem.stealRateBonus[i];
		}
	}
	if (Imported.YEP_Taunt) {
		//newItem.physTaunt = affixItem.physTaunt;
		//newItem.magicTaunt = affixItem.magicTaunt;
		//newItem.certainTaunt = affixItem.certainTaunt;
		//newItem.nullPhysTaunt = affixItem.nullPhysTaunt;
		//newItem.nullMagicTaunt = affixItem.nullMagicTaunt;
		//newItem.nullCertainTaunt = affixItem.nullCertainTaunt;
		//newItem.ignorePhysTaunt = affixItem.ignorePhysTaunt;
		//newItem.ignoreMagicTaunt = affixItem.ignoreMagicTaunt;
		//newItem.ignoreCertainTaunt = affixItem.ignoreCertainTaunt;
	}
	if (Imported.YEP_WeaponAnimation) {
		//newItem.weaponImageIndex = affixItem.weaponImageIndex;
		//newItem.weaponAttackMotion = affixItem.weaponAttackMotion;
		//newItem.weaponAnimationId = affixItem.weaponAnimationId;
		//newItem.weaponHue = affixItem.weaponHue;
	}
	if (Imported.YEP_WeaponUnleash) {
		//newItem.attackReplace = affixItem.attackReplace;
		newItem.attackReplaceEval += affixItem.attackReplaceEval;
		//newItem.guardReplace = affixItem.guardReplace;
		newItem.guardReplaceEval += affixItem.guardReplaceEval;
		newItem.weaponUnleash = newItem.weaponUnleash.concat(affixItem.weaponUnleash);
		newItem.guardUnleash = newItem.guardUnleash.concat(affixItem.guardUnleash);
		//newItem.weaponUnleashRate = affixItem.weaponUnleashRate;
		//newItem.guardUnleashRate = affixItem.guardUnleashRate;
	}
	if (Imported.YEP_X_ArmorScaling) {
		newItem.physArmorRedFlat += affixItem.physArmorRedFlat;
		newItem.physArmorRedRate += affixItem.physArmorRedRate;
		newItem.physArmorPenRate += affixItem.physArmorPenRate;
		newItem.physArmorPenFlat += affixItem.physArmorPenFlat;
		newItem.magArmorRedFlat += affixItem.magArmorRedFlat;
		newItem.magArmorRedRate += affixItem.magArmorRedRate;
		newItem.magArmorPenRate += affixItem.magArmorPenRate;
		newItem.magArmorPenFlat += affixItem.magArmorPenFlat;
		newItem.cerArmorRedFlat += affixItem.cerArmorRedFlat;
		newItem.cerArmorRedRate += affixItem.cerArmorRedRate;
		newItem.cerArmorPenRate += affixItem.cerArmorPenRate;
		newItem.cerArmorPenFlat += affixItem.cerArmorPenFlat;
	}
	if (Imported.YEP_X_BattleSysATB) {
		newItem.atbStartFlat += affixItem.atbStartFlat;
		newItem.atbStartRate += affixItem.atbStartRate;
		newItem.atbTurnFlat += affixItem.atbTurnFlat;
		newItem.atbTurnRate += affixItem.atbTurnRate;
		if (!!affixItem.atbHelp) {
			newItem.atbHelp = newItem.atbHelp || '';
			newItem.atbHelp += affixItem.atbHelp;
		}
	}
	if (Imported.YEP_X_BattleSysCTB) {
		newItem.ctbStartFlat += affixItem.ctbStartFlat;
		newItem.ctbStartRate += affixItem.ctbStartRate;
		newItem.ctbTurnFlat += affixItem.ctbTurnFlat;
		newItem.ctbTurnRate += affixItem.ctbTurnRate;
		if (!!affixItem.ctbHelp) {
			newItem.ctbHelp = newItem.ctbHelp || '';
			newItem.ctbHelp += affixItem.ctbHelp;
		}
	}
	if (Imported.YEP_X_ChangeBattleEquip) {
		//newItem.changeBattleEquipCooldown = affixItem.changeBattleEquipCooldown;
		//newItem.disableChangeBattleEquip = affixItem.disableChangeBattleEquip;
	}
	if (Imported.YEP_X_CriticalControl) {
		newItem.critMultBonus += affixItem.critMultBonus;
		newItem.flatCritBonus += affixItem.flatCritBonus;
		newItem.physicalCritRateBonus += affixItem.physicalCritRateBonus;
		newItem.magicalCritRateBonus += affixItem.magicalCritRateBonus;
		newItem.certainCritRateBonus += affixItem.certainCritRateBonus;
	}
	if (Imported.YEP_X_EquipRequirements) {
		//newItem.equipRequirements.atLeast = affixItem.equipRequirements.atLeast;
		//newItem.equipRequirements.atMost = affixItem.equipRequirements.atMost;
		newItem.equipRequirements.classes = newItem.equipRequirements.classes.concat(affixItem.equipRequirements.classes);
		newItem.equipRequirements.skills = newItem.equipRequirements.skills.concat(affixItem.equipRequirements.skills);
		newItem.equipRequirements.switches = newItem.equipRequirements.switches.concat(affixItem.equipRequirements.switches);
		//newItem.equipRequirements.unique = affixItem.equipRequirements.unique;
		newItem.customEquipReqText += affixItem.customEquipReqText;
		newItem.customEquipReqCondition += affixItem.customEquipReqCondition;
	}
	if (Imported.YEP_X_EquipSkillTiers) {
		//newItem.equipTierSlot = affixItem.equipTierSlot;
	}
	if (Imported.YEP_X_ItemDurability) {
		//newItem.repairWeaponType = affixItem.repairWeaponType;
		//newItem.repairArmorType = affixItem.repairArmorType;
		//newItem.repairSound = affixItem.repairSound;
		//newItem.repairWeaponUnbreakable = affixItem.repairWeaponUnbreakable;
		//newItem.repairArmorUnbreakable = affixItem.repairArmorUnbreakable;
		newItem.repairDurabilityEval += affixItem.repairDurabilityEval;
		
		//if (newItem.durability !== -1) 
		//	newItem.durability += affixItem.durability;
		newItem.durVariance += affixItem.durVariance;
		//newItem.durMax += affixItem.durMax;
		//newItem.breakSound = affixItem.breakSound;
		newItem.breakEval += affixItem.breakEval;
	}
	if (Imported.YEP_X_LimitedSkillUses) {
		newItem.globalUseMax += affixItem.globalUseMax;
		//newItem.stypeUseMax = affixItem.stypeUseMax;
		//newItem.skillUseMax = affixItem.skillUseMax;
		newItem.globalUseMaxEval += affixItem.globalUseMaxEval;
		//newItem.stypeUseMaxEval = affixItem.stypeUseMaxEval;
		//newItem.skillUseMaxEval = affixItem.skillUseMaxEval;
	}
	if (Imported.YEP_X_PartyLimitGauge) {
		newItem.partyLimitGaugePlus += affixItem.partyLimitGaugePlus;
		newItem.partyLimitGaugeRate *= affixItem.partyLimitGaugeRate;
	}
	if (Imported.YEP_X_SelectionControl) {
		newItem.cannotSelect = newItem.cannotSelect.concat(affixItem.cannotSelect);
	}
	if (Imported.YEP_X_SkillCostItems) {
		//newItem.itemGaugeColor1 = affixItem.itemGaugeColor1;
		//newItem.itemGaugeColor2 = affixItem.itemGaugeColor2;
		//newItem.itemGaugeText = affixItem.itemGaugeText;
		//newItem.itemGaugeTextColor = affixItem.itemGaugeTextColor;
		
		/*newItem.itemGaugeColor1 = affixItem.itemGaugeColor1;
		newItem.itemGaugeColor2 = affixItem.itemGaugeColor2;
		newItem.useItemCostSet = affixItem.useItemCostSet;
		newItem.useWeaponCostSet = affixItem.useWeaponCostSet;
		newItem.useArmorCostSet = affixItem.useArmorCostSet;
		newItem.useItemCostRate = affixItem.useItemCostRate;
		newItem.useWeaponCostRate = affixItem.useWeaponCostRate;
		newItem.useArmorCostRate = affixItem.useArmorCostRate;
		newItem.replaceItemCost = affixItem.replaceItemCost;*/
	}
	if (Imported.YEP_X_SkillCooldowns) {
		//newItem.cooldownChange = affixItem.cooldownChange;
		//newItem.stypeCooldownChange = affixItem.stypeCooldownChange;
		newItem.globalCooldownChange += affixItem.globalCooldownChange;
		//newItem.warmupChange = affixItem.warmupChange;
		//newItem.stypeWarmupChange = affixItem.stypeWarmupChange;
		newItem.globalWarmupChange += affixItem.globalWarmupChange;
		
		//newItem.cooldownDuration = affixItem.cooldownDuration;
		//newItem.stypeCooldownDuration = affixItem.stypeCooldownDuration;
		newItem.globalCooldownDuration *= affixItem.globalCooldownDuration;
		//newItem.cooldownRate = affixItem.cooldownRate;
		//newItem.stypeCooldownRate = affixItem.stypeCooldownRate;
		newItem.globalCooldownRate *= affixItem.globalCooldownRate;
	}
	if (Imported.YEP_X_CounterControl) {
		newItem.counterSkills = newItem.counterSkills.concat(affixItem.counterSkills);
		newItem.counterTotal += affixItem.counterTotal;
		newItem.targetCounterRate *= affixItem.targetCounterRate;
		newItem.targetCounterFlat += affixItem.targetCounterFlat;
		//newItem.evadeCounter = affixItem.evadeCounter;
		//newItem.hitCounter = affixItem.hitCounter;
		newItem.counterTotalEval += affixItem.counterTotalEval;
		newItem.counterSkillsEval += affixItem.counterSkillsEval;
		newItem.targetCounterRateEval += affixItem.targetCounterRateEval;
	}
};

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(GF.IES.pluginName, 'ChangeVarianceStock', args => {
	const enable = eval(args.varianceStock);
	if (enable) {
        $gameTemp.enableVarianceStock();
	} else {
        $gameTemp.disableVarianceStock();
	}
});

PluginManager.registerCommand(GF.IES.pluginName, 'ForceItemAffix', args => {
	const type = eval(args.AffixType);
	const inside = JSON.parse(args.AffixItem);
	const affixType = type ? 'prefix' : 'suffix';
	for (i = 0; i < inside.length; i++) {
		$gameSystem.getForceItemAffix(affixType, inside[i]);
	}
});

PluginManager.registerCommand(GF.IES.pluginName, 'ResetItemAffix', args => {
	$gameSystem.clearForceItemAffix();
});

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.enableVarianceStock = function () {
    this._independentStock = true;
};

Game_Temp.prototype.disableVarianceStock = function () {
    this._independentStock = false;
};

Game_Temp.prototype.varianceStock = function () {
    return this._independentStock;
};

//=============================================================================
// Game_Actor
//=============================================================================

GF.IES.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    GF.IES.Game_Actor_setup.call(this, actorId);
    if ($gameTemp._initialStartMemberEquip) return;
    this.initIndependentEquips($dataActors[actorId].equips);
};

Game_Actor.prototype.initIndependentEquips = function (equips) {
    var equips = this.convertInitEquips(equips);
    this.equipInitIndependentEquips(equips);
    this.releaseUnequippableItems(true);
    this.recoverAll();
    this.refresh();
};

Game_Actor.prototype.convertInitEquips = function (equips) {
    var items = [];
    for (var i = 0; i < equips.length; ++i) {
        var equipId = equips[i];
        if (equipId <= 0) continue;
        var equipType = $dataSystem.equipTypes[i + 1];
        if (equipType === $dataSystem.equipTypes[1] ||
            (i === 1 && this.isDualWield())) {
            var equip = $dataWeapons[equipId];
        } else {
            var equip = $dataArmors[equipId];
        }
        items.push(equip);
    }
    return items;
};

Game_Actor.prototype.equipInitIndependentEquips = function (equips) {
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; ++i) {
        this._equips[i] = new Game_Item();
    }
    for (var i = 0; i < maxSlots; ++i) {
        var slotType = slots[i];
        var equip = this.grabInitEquips(equips, slotType);
        if (DataManager.isIndependent(equip) && this.canEquip(equip)) {
            var array = $gameParty.gainIndependentItem(equip, 1)
                if (array instanceof Array) {
                    newItem = array[0];
                    this.changeEquip(i, newItem);
                }
        } else if (this.canEquip(equip)) {
            this._equips[i].setObject(equip);
        }
    }
};

Game_Actor.prototype.grabInitEquips = function (equips, slotType) {
    var item = null;
    for (var i = 0; i < equips.length; ++i) {
        var equip = equips[i];
        if (!equip)
            continue;
        if (slotType === 1 && DataManager.isWeapon(equip)) {
            item = equip;
            break;
        } else if (equip.etypeId === slotType) {
            item = equip;
            break;
        }
    }
    if (item)
        equips[i] = null;
    return item;
};

GF.IES.Game_Actor_hasWeapon = Game_Actor.prototype.hasWeapon;
Game_Actor.prototype.hasWeapon = function (weapon) {
    if (this.hasBaseItem(weapon)) return true;
    return GF.IES.Game_Actor_hasWeapon.call(this, weapon);
};

GF.IES.Game_Actor_hasArmor = Game_Actor.prototype.hasArmor;
Game_Actor.prototype.hasArmor = function (armor) {
    if (this.hasBaseItem(armor)) return true;
    return GF.IES.Game_Actor_hasArmor.call(this, armor);
};

Game_Actor.prototype.hasBaseItem = function (baseItem) {
    if (!DataManager.isIndependent(baseItem)) return false;
    var type = (DataManager.isWeapon(baseItem)) ? 'weapon' : 'armor';
    for (var i = 0; i < this.equips().length; ++i) {
        var equip = this.equips()[i];
        if (!equip) continue;
        if (!equip.baseItemId) continue;
        if (DataManager.isWeapon(equip) && type === 'weapon') {
            if (equip.baseItemId === baseItem.id)
                return true;
        } else if (DataManager.isArmor(equip) && type === 'armor') {
            if (equip.baseItemId === baseItem.id)
                return true;
        }
    }
    return false;
};

GF.IES.Game_Actor_changeEquipById = Game_Actor.prototype.changeEquipById;
Game_Actor.prototype.changeEquipById = function (etypeId, itemId) {
    if (itemId > 0) {
        var slotId = etypeId - 1;
        if (this.equipSlots()[slotId] === 1) {
            var baseItem = $dataWeapons[itemId];
        } else {
            var baseItem = $dataArmors[itemId];
        }
        if (!$gameParty.hasItem(baseItem)) {
            $gameParty.gainItem(baseItem, 1);
        }
        if (DataManager.isIndependent(baseItem)) {
            if (this.hasBaseItem(baseItem))
                return;
            var item = $gameParty.getMatchingBaseItem(baseItem, false);
            if (item === null) {
                $gameTemp.enableVarianceStock();
                $gameParty.gainItem(baseItem, 1);
                $gameTemp.disableVarianceStock();
                item = $gameParty.getMatchingBaseItem(baseItem, false);
            }
            this.changeEquip(slotId, item);
            return;
        }
    }
    GF.IES.Game_Actor_changeEquipById.call(this, etypeId, itemId)
};

Game_Actor.prototype.unequipItem = function (item) {
    for (var i = 0; i < this.equips().length; ++i) {
        var equip = this.equips()[i];
        if (!equip) continue;
        if (equip !== item) continue;
        this.changeEquip(i, null);
    }
};

//=============================================================================
// Game_Party
//=============================================================================

GF.IES.Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function () {
    GF.IES.Game_Party_setupStartingMembers.call(this);
    $gameTemp.enableVarianceStock();
    this.initActorEquips();
    $gameTemp.disableVarianceStock();
};

Game_Party.prototype.initActorEquips = function () {
    $gameTemp._initialStartMemberEquip = true;
    for (var i = 0; i < $dataActors.length; ++i) {
        var actor = $gameActors.actor(i);
        if (actor) {
            var baseActor = $dataActors[i];
            actor.initIndependentEquips(baseActor.equips);
        }
    }
    $gameTemp._initialStartMemberEquip = undefined;
};

GF.IES.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    if (DataManager.isIndependent(item)) {
        this.gainIndependentItem(item, amount, includeEquip);
    } else {
        GF.IES.Game_Party_gainItem.call(this, item, amount, includeEquip);
    }
};

Game_Party.prototype.gainIndependentItem = function (item, amount, includeEquip) {
    var arr = [];
    if (amount > 0) {
        for (var i = 0; i < amount; ++i) {
            var newItem = DataManager.registerNewItem(item);
            this.registerNewItem(item, newItem);
            arr.push(newItem);
        }
    } else if (amount < 0) {
        amount = Math.abs(amount);
        for (var i = 0; i < amount; ++i) {
            if (item.baseItemId) {
                this.removeIndependentItem(item, includeEquip);
            } else if (DataManager.isIndependent(item)) {
                var target = this.getMatchingBaseItem(item, includeEquip);
                if (target !== null) {
                    this.removeIndependentItem(target, includeEquip);
				}
            } else {
                this.removeBaseItem(item, includeEquip);
            }
        }
    }
    return arr;
};

Game_Party.prototype.registerNewItem = function (baseItem, newItem) {
    var container = this.itemContainer(baseItem);
    if (container) container[newItem.id] = 1;
};

Game_Party.prototype.removeIndependentItem = function (item, includeEquip) {
    if (includeEquip && this.checkItemIsEquipped(item)) {
        for (var i = 1; i < $gameActors._data.length; ++i) {
            var actor = $gameActors.actor(i);
            if (!actor) continue;
            if (!actor.equips().contains(item)) continue;
            actor.unequipItem(item);
        }
    }
    var container = this.itemContainer(item);
    container[item.id] = 0;
    if (container[item.id] <= 0) delete container[item.id];
};

Game_Party.prototype.removeBaseItem = function (item, includeEquip) {
    var container = this.itemContainer(item);
    container[item.id]--;
    if (container[item.id] <= 0) delete container[item.id];
    if (includeEquip) this.discardMembersEquip(item, -1);
};

Game_Party.prototype.getMatchingBaseItem = function (baseItem, equipped) {
    if (!baseItem) return null;
    if (DataManager.isItem(baseItem)) return null;
    if (DataManager.isWeapon(baseItem))
        var group = this.weapons();
    if (DataManager.isArmor(baseItem))
        var group = this.armors();
    if (equipped) {
        for (var a = 0; a < this.members().length; ++a) {
            var actor = this.members()[a];
            if (!actor) continue;
            if (DataManager.isWeapon(baseItem)) {
                group = group.concat(actor.weapons());
            } else if (DataManager.isArmor(baseItem)) {
                group = group.concat(actor.armors());
            }
        }
    }
    var baseItemId = baseItem.id;
    for (var i = 0; i < group.length; ++i) {
        var item = group[i];
        if (!item) continue;
        if (!item.baseItemId) continue;
        if (item.baseItemId !== baseItemId) continue;
        return item;
    }
    return null;
};

Game_Party.prototype.checkItemIsEquipped = function (item) {
    for (var i = 1; i < $gameActors._data.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (actor.equips().contains(item)) return true;
    }
    return false;
};

GF.IES.Game_Party_weapons = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function () {
    var results = GF.IES.Game_Party_weapons.call(this);
    results.sort(this.independentItemSort);
    return results;
};

GF.IES.Game_Party_armors = Game_Party.prototype.armors;
Game_Party.prototype.armors = function () {
    var results = GF.IES.Game_Party_armors.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Game_Party.prototype.independentItemSort = function (a, b) {
    var aa = (a.baseItemId) ? a.baseItemId : a.id;
    var bb = (b.baseItemId) ? b.baseItemId : b.id;
    if (aa < bb) return -1;
    if (aa >= bb) return 1;
    return 0;
};

GF.IES.Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function (item) {
    if (DataManager.isIndependent(item)) return 1;
    return GF.IES.Game_Party_maxItems.call(this, item);
};

GF.IES.Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem = function (item, includeEquip) {
    if (DataManager.isIndependent(item)) {
        if (this.numIndependentItems(item) > 0)
            return true;
    }
    return GF.IES.Game_Party_hasItem.call(this, item, includeEquip);
};

GF.IES.Game_Party_isAnyMemberEquipped = Game_Party.prototype.isAnyMemberEquipped;
Game_Party.prototype.isAnyMemberEquipped = function (item) {
    if (DataManager.isIndependent(item)) {
        for (var i = 0; i < this.members().length; ++i) {
            var actor = this.members()[i];
            if (!actor) continue;
            if (actor.hasBaseItem(item)) return true;
        }
    }
    return GF.IES.Game_Party_isAnyMemberEquipped.call(this, item);
};

Game_Party.prototype.numIndependentItems = function (baseItem) {
    var value = 0;
    if (!DataManager.isIndependent(baseItem))
        return this.numItems(baseItem);
    var id = baseItem.id;
    if (DataManager.isWeapon(baseItem))
        var group = this.weapons();
    if (DataManager.isArmor(baseItem))
        var group = this.armors();
    for (var i = 0; i < group.length; ++i) {
        var item = group[i];
        if (!item) continue;
        if (item.baseItemId && item.baseItemId === id)
            value += 1;
    }
    return value;
};

Game_Party.prototype.clearAllMatchingBaseItems = function (baseItem, equipped) {
    for (; ; ) {
        var item = this.getMatchingBaseItem(baseItem, equipped);
        if (item) {
            this.removeIndependentItem(item, equipped);
            DataManager.removeIndependentItem(item);
        } else {
            break;
        }
    }
};

Game_Party.prototype.refreshAllMembers = function () {
	const members = this.members();
	for (var i = 0; i < members.length; ++i) {
		const member = members[i];
		if (member) member.refresh();
	}
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.averagePartyLevel = function () {
	return this.averageLevelUtility($gameParty.allMembers());
};

Game_System.prototype.averageBattleLevel = function () {
	return this.averageLevelUtility($gameParty.battleMembers());
};

Game_System.prototype.averageLevelUtility = function (members) {
	if (members.length <= 0) return 0;
	var sum = 0;
	members.forEach(function (member) {
		sum += member.level;
	});
	return sum / members.length;
};

Game_System.prototype.clearForceItemAffix = function () {
	this._forceItemAffix = [];
};

Game_System.prototype.getForceItemAffix = function (evalMode, line) {
	this._forceItemAffix = this._forceItemAffix || [];
	this._forceItemAffix.push(DataManager.processCombineItem(line, evalMode));
};

Game_System.prototype.forceItemAffix = function () {
	return this._forceItemAffix || [];
};

//=============================================================================
// Game_Interpreter
//=============================================================================

GF.IES.Game_Interpreter_gameDataOperand = Game_Interpreter.prototype.gameDataOperand;
Game_Interpreter.prototype.gameDataOperand = function (type, param1, param2) {
    switch (type) {
    case 1:
        return $gameParty.numIndependentItems($dataWeapons[param1]);
    case 2:
        return $gameParty.numIndependentItems($dataArmors[param1]);
    default:
        return GF.IES.Game_Interpreter_gameDataOperand.call(this, type, param1, param2);
    }
};

//=============================================================================
// Window_Base
//=============================================================================

GF.IES.Window_Base_drawItemIcon = Window_Base.prototype.drawItemIcon;
Window_Base.prototype.drawItemIcon = function (item, rect) {
	GF.IES.Window_Base_drawItemIcon.call(this, item, rect);
	this.drawMultipleItemIcon(item, rect);
};

GF.IES.Window_Base_drawItemPicture = Window_Base.prototype.drawItemPicture;
Window_Base.prototype.drawItemPicture = function (bitmap, item, rect) {
	GF.IES.Window_Base_drawItemPicture.call(this, bitmap, item, rect);
	this.drawMultipleItemIcon(item, rect);
};

Window_Base.prototype.drawMultipleItemIcon = function (item, rect) {
	if (item && item.overlayIcons && item.overlayIcons.length) {
		for (const iconIndex of item.overlayIcons) {
			this.drawWholeIcon(iconIndex, rect);
		}
	}
};

GF.IES.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function (item, x, y, width) {
	GF.IES.Window_Base_drawItemName.call(this, item, x, y, width);
	if (item && item.overlayIcons && item.overlayIcons.length) {
		for (const iconIndex of item.overlayIcons) {
			this.drawIcon(iconIndex, x + 2, y + 2);
		}
	}
};

//=============================================================================
// Window_ItemList
//=============================================================================

GF.IES.Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function () {
    GF.IES.Window_ItemList_makeItemList.call(this);
    if (SceneManager._scene instanceof Scene_Item) {
        this.listEquippedItems();
	}
};

Window_ItemList.prototype.listEquippedItems = function () {
    if (!GF.Param.IESShEquipped) return;
    const results = [];
    for (const actor of $gameParty.members()) {
        if (!actor) continue;
        for (const equip of actor.equips()) {
            if (!equip) continue;
            if (!equip.baseItemId) continue;
            if (!this.includes(equip)) continue;
			results.push(equip);
        }
    }
    this._data = results.concat(this._data);
};

GF.IES.Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function (item, dx, dy, dw) {
    if (DataManager.isIndependent(item)) {
        if (DataManager.isWeapon(item)) {
			var index = $gameParty.weapons().indexOf(item);
		} else if (DataManager.isArmor(item)) {
			var index = $gameParty.armors().indexOf(item);
		}
		if (index < 0) this.drawEquippedActor(item, dx, dy, dw);
		return;
    } 
	GF.IES.Window_ItemList_drawItemNumber.call(this, item, dx, dy, dw);
};

Window_ItemList.prototype.drawEquippedActor = function (item, dx, dy, dw) {
	const actors = $gameParty.members();
	const showEquipType = GF.Param.IESEquippedItemType;
    for (const actor of actors) {
        if (!actor || !actor.equips() || !actor.equips().contains(item)) continue;
		if (showEquipType === '显示装备角色名称') {
			this.contents.fontSize = Number(GF.Param.COIEItemQt['ItemQuantityFontSize']);
			this.drawText(actor.name(), dx, dy, dw, 'right');
			this.resetFontSettings();
		} else if (showEquipType === '显示装备角色头像') {
			this.drawEquippedCharacter(actor, dx, dy, dw);
		}
		return;
    }
};

Window_ItemList.prototype.drawEquippedCharacter = function(actor, x, y, w) {
	const characterName = actor.characterName();
	const characterIndex = actor.characterIndex();
    const bitmap = ImageManager.loadCharacter(characterName);
    const big = ImageManager.isBigCharacter(characterName);
    const pw = bitmap.width / (big ? 3 : 12);
    const ph = bitmap.height / (big ? 4 : 8) / 1.5;
    const n = big ? 0: characterIndex;
    const sx = ((n % 4) * 3 + 1) * pw;
    const sy = Math.floor(n / 4) * 4 * ph * 1.5;
    this.contents.blt(bitmap, sx, sy, pw, ph, x + w - pw / 1.4, y);
};

//=============================================================================
// Window_EquipItem
//=============================================================================

GF.IES.Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function (item) {
    if (this._actor && !item && item !== null) return false;
    return GF.IES.Window_EquipItem_includes.call(this, item);
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

GF.IES.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function (x, y) {
    if (DataManager.isIndependent(this._item)) {
        this.drawIndependentPossession(x, y);
    } else {
		GF.IES.Window_ShopStatus_drawPossession.call(this, x, y);
	}
};

Window_ShopStatus.prototype.drawIndependentPossession = function (x, y) {
    var width = this.contents.width - this.itemPadding() - x;
    var baseItem = DataManager.getBaseItem(this._item);
    var value = String($gameParty.numIndependentItems(baseItem));
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.possession, x, y, width - this.textWidth(value));
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
};

//=============================================================================
// Scene_Item
//=============================================================================

GF.IES.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function () {
	GF.IES.Scene_Item_createItemWindow.call(this);
	this._itemWindow.setHandler('cancel', this.exitScene.bind(this));
};

Scene_Item.prototype.exitScene = function () {
	$gameParty.refreshAllMembers();
	this.popScene();
};

//=============================================================================
// Scene_Equip
//=============================================================================

GF.IES.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function () {
    this.actor().releaseUnequippableItems();
    GF.IES.Scene_Equip_refreshActor.call(this);
};

//=============================================================================
// Scene_Shop
//=============================================================================

GF.IES.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function (number) {
    $gameTemp.enableVarianceStock();
    GF.IES.Scene_Shop_doBuy.call(this, number);
    $gameTemp.disableVarianceStock();
};

GF.IES.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function (number) {
    GF.IES.Scene_Shop_doSell.call(this, number);
    if (!DataManager.isIndependent(this._item)) return;
    DataManager.removeIndependentItem(this._item);
};

GF.IES.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
	const item = this._item;
	if (DataManager.isIndependent(item)) {
		return this.maxIndependBuy(item);
	} else {
		return GF.IES.Scene_Shop_maxBuy.call(this);
	}
};

Scene_Shop.prototype.maxIndependBuy = function(item) {
	const num = $gameParty.numIndependentItems(item);
	const max = item.maxItem - num;
	const price = this.buyingPrice();
	if (price > 0) {
		return Math.min(max, Math.floor(this.money() / price));
	} else {
		return max;
	}
};

//=============================================================================
// Utilities
//=============================================================================

GF.Util = GF.Util || {};

GF.Util.randomInt = function(min, max) {
	if (max < min) [min, max] = [max, min];
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

//=============================================================================
// End of File
//=============================================================================