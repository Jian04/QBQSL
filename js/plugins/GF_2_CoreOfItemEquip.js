//=============================================================================
// Ganfly Plugins - CoreOfItemEquip
// GF_2_CoreOfItemEquip.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_2_CoreOfItemEquip = true;

var GF = GF || {};
GF.COIE = GF.COIE || {};
GF.COIE.version = 1.0;
GF.COIE.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        系统 - 物品装备核心
 * @author ganfly
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 * @orderAfter GF_1_CoreOfMenuActor
 * @base GF_1_CoreOfMenuActor
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 * 
 * 本插件为物品相关核心插件，全面升级了物品/装备/商店菜单，并添加了若干
 * 额外控制系统，主要提供以下功能
 *
 *   物品菜单自定义
 *   装备菜单自定义
 *   商店菜单自定义
 *   物品数量限制自定义
 *   物品重量系统
 *   物品图片
 *   商店扩展功能
 *   商店服务员
 *   装备栏自定义
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
 * GF_1_CoreOfMenuActor       系统 - 角色信息框核心
 *
 * ---- 第2层 ----
 *
 * 这个插件是第2层插件，必须放在第0，1层下面，所有3，4，5层GF插件的上面。
 *
 * ============================================================================
 *  物品类型介绍
 * ============================================================================
 * 
 * 用于控制和拓展物品类型。
 * 在插件参数'物品菜单设置-物品分类按钮分项设置'和'商店菜单
 * 设置-物品分类按钮分项设置'中分别设定两个界面的物品分类，
 * 其中每一项都要按照下面的关键字格式书写
 * 
 * ==关键字==                ==说明==
 *
 * item                      普通物品
 * keyItem                   重要物品
 * weapon                    所有武器
 * wType:x                   x号武器类型的武器
 * armor                     所有防具
 * aType:x                   x号防具类型的防具
 * eType:x                   x号装备类型的装备
 * x                         自定义分类名称
 *
 * 对于自定义分类名称，有两种方式设定其范围，一种是用物品备注，
 * 含有相应备注的物品将会显示在特定的分类下。
 *
 * 还有一种是在插件参数'特殊自定义分类'中预设该分类的范围，
 * 下面是一些预设的分类代码
 * 注意：优先级为 预设 > 备注
 *
 * ==分类名称==                  ==分类条件==
 *
 * 所有(物品/武器/防具)          !!item          
 * 所有物品(包括重要和隐藏物品)  DataManager.isItem(item)            
 * 隐藏物品A     DataManager.isItem(item) && item.itypeId === 3
 * 隐藏物品B     DataManager.isItem(item) && item.itypeId === 4
 * 消耗品        DataManager.isItem(item) && item.consumable
 * 非消耗品      DataManager.isItem(item) && !item.consumable
 * 始终可用      DataManager.isItem(item) && item.occasion === 0
 * 战斗可用      DataManager.isItem(item) && [0, 1].contains(item.occasion)
 * 非战斗可用    DataManager.isItem(item) && [0, 2].contains(item.occasion)
 * 不可用        DataManager.isItem(item) && item.occasion === 3
 *
 * ============================================================================
 *  物品重量系统
 * ============================================================================
 * 
 * 物品重量系统，可以限制背包中的物品数量
 * 背包最大承重 = 队伍基础最大承重 + 所有角色最大承重之和 + 增益
 * 可以设置超重时队伍附加的状态以及行走速度和禁止跑步
 * 物品/武器/防具/货币均可以设置重量
 * 物品/武器/防具/技能/状态均可以增加队伍的承重上限
 *
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ----物品/武器/防具备注
 *
 *    <Max: x> 
 *    <数量上限: x>
 *      - 设定该物品/武器/防具的数量上限为x
 *
 *    <Menu Category: x>
 *    <Menu Category: x, x, x>
 *    <物品类型: x>
 *    <物品类型: x, x, x>
 * 
 *      - 设定该物品/武器/防具的自定义分类为x，当物品的自定义分类
 *      和物品菜单里的分类关键字相同时，该物品就会显示在相应的分类下。
 *      例如：插件参数中有一个物品分类为'材料'
 *           则备注中含有<Menu Category: 材料>的物品就会显示在该分类下。
 * 
 *    <Picture: x>
 *    <图片: x>
 *      - 设定该物品/武器/防具的图片为x，该图片在大图标模式下会替代物品图标
 *      x替换为文件名(无后缀)，文件夹在插件参数中设置
 *
 *    <Weight: x>
 *    <重量: x>
 *      - 确定该物品/武器/防具的重量，x替换为重量
 *      例如 <Weight: 10>
 * 
 *    <Sell Price: x>
 *    <出售价格: x>
 *      - 设定该物品的售出价格，x替换为数值
 *    
 *    <Cannot Sell>
 *    <不可出售>
 *      - 这个物品强制无法出售
 *
 *    <Can Sell>
 *    <必能出售>
 *      - 这个物品一定可以出售
 * 
 *    <Shop Hide if Switch On: x>
 *    <Shop Hide if Switch Off: x>
 *    <开关打开时隐藏: x>
 *    <开关关闭时隐藏: x>
 *      - 当x号开关处于开启/关闭状态时，在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 * 
 *    <Shop Hide if Any Switch On: x, x, x>
 *    <Shop Hide if Any Switch Off: x, x, x>
 *    <任意开关打开时隐藏: x, x, x>
 *    <任意开关关闭时隐藏: x, x, x>
 *      - 当所有x号开关中有一个处于开启/关闭状态时，
 *      在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 * 
 *    <Shop Hide if All Switches On: x, x, x>
 *    <Shop Hide if All Switches Off: x, x, x>
 *    <所有开关打开时隐藏: x, x, x>
 *    <所有开关关闭时隐藏: x, x, x>
 *      - 当所有x号开关均处于开启/关闭状态时，
 *      在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 *
 * ----物品/武器/防具/技能/状态备注
 *
 *    <Weight Limit: +x>
 *    <Weight Limit: -x>
 *    <承重: +x>
 *    <承重: -x>
 *       改变队伍背包的最大承重，x替换为重量，正数增加，负数减少
 *       对于可使用的物品，使用后会永久改变最大承重
 *       对于不可使用的物品，只要该物品在背包里，最大承重就会改变
 *       对于武器/防具，装备以后改变最大承重
 *       对于技能，习得后改变最大承重
 *       对于状态，角色被状态影响时改变最大承重
 *       例如 <Weight Limit: +50>
 *
 * ----角色备注
 *
 *    <Weight Limit: x>
 *    <承重: x>
 *      设置该角色基础最大承重，x替换为重量
 *      例如 <Weight Limit: 100>
 *
 *    <Custom Weight Limit>
 *       limit = 20;
 *    </Custom Weight Limit>
 *    <自定义承重>
 *       limit = 20;
 *    </自定义承重>
 *      设置该角色的基础最大承重公式
 *      可以使用以下变量：
 *          atk, def, mat, mdf, agi, luk, hit, eva, hp, mp, tp, mhp, mmp, ...
 *      例如 
 *          <Custom Weight Limit>
 *           limit = actor.atk*10;
 *          </Custom Weight Limit>
 *              在这个例子中，该角色的最大承重为其攻击力的10倍
 *          
 *      注意: 最大承重最少为0.
 *
 * ----职业备注
 *    
 *   <Equip Slot: x>
 *   <Equip Slot: x, x, x>
 *   <装备栏: x>
 *   <装备栏: x, x, x>
 *     - 设定该职业的装备栏列表，会覆盖默认装备栏
 *     x替换为装备类型id
 *  
 *   <Equip Slot>
 *     xxx
 *   </Equip Slot>
 *   <装备栏>
 *     xxx
 *   </装备栏>
 *     - 设定该职业的装备栏列表，会覆盖默认装备栏
 *     中间每一行填一种装备类型名称
 *     例如 <装备栏>
 *           武器
 *           盾牌
 *          </装备栏>
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 * 
 *    $gameParty.getAllItemWeight()
 *               获取目前的背包重量  
 *     
 *    $gameParty.getItemWeightLimit()    
 *               获取背包的重量上限
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
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param ItemMenuSet
 * @text 物品菜单设置
 * @type struct<ItemMenuSet>
 * @desc 物品菜单设置
 * @default {"MainLayoutFile":"UI_Menu/moon02","HelpWindowSet":"{\"WindowX\":\"283\",\"WindowY\":\"650\",\"WindowWidth\":\"800\",\"WindowHeight\":\"108\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"0\\\",\\\"SlideY\\\":\\\"80\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"-50\\\"}\"}","ListWindowSet":"{\"WindowMode\":\"仅图标\",\"WindowCellDrawName\":\"true\",\"WindowSmallNameSize\":\"12\",\"WindowCellBg\":\"true\",\"WindowX\":\"170\",\"WindowY\":\"180\",\"WindowWidth\":\"740\",\"WindowHeight\":\"420\",\"WindowCols\":\"9\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","CategoryButtonSet":"{\"ButtonSetX\":\"230\",\"ButtonSetY\":\"150\",\"ButtonSetStyle\":\"4\",\"ButtonSetBitmap\":\"\"}","CategoryButtons":"[\"{\\\"Note\\\":\\\"--物品选项--\\\",\\\"Symbol\\\":\\\"item\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-道具选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--武器选项--\\\",\\\"Symbol\\\":\\\"weapon\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-武器选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--防具选项--\\\",\\\"Symbol\\\":\\\"armor\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-防具选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"-关键物品选项-\\\",\\\"Symbol\\\":\\\"keyItem\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-关键道具选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--蔬果选项--\\\",\\\"Symbol\\\":\\\"全部\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-蔬果选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\"]","SpecialCategory":"[\"{\\\"CategoryName\\\":\\\"全部\\\",\\\"CategoryCondition\\\":\\\"!!item\\\"}\",\"{\\\"CategoryName\\\":\\\"全部物品\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item)\\\"}\",\"{\\\"CategoryName\\\":\\\"隐藏物品A\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && item.itypeId === 3\\\"}\",\"{\\\"CategoryName\\\":\\\"隐藏物品B\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && item.itypeId === 4\\\"}\",\"{\\\"CategoryName\\\":\\\"消耗品\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && item.consumable\\\"}\",\"{\\\"CategoryName\\\":\\\"非消耗品\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && !item.consumable\\\"}\",\"{\\\"CategoryName\\\":\\\"始终可用\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && item.occasion === 0\\\"}\",\"{\\\"CategoryName\\\":\\\"战斗可用\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && [0, 1].contains(item.occasion)\\\"}\",\"{\\\"CategoryName\\\":\\\"非战斗可用\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && [0, 2].contains(item.occasion)\\\"}\",\"{\\\"CategoryName\\\":\\\"不可用\\\",\\\"CategoryCondition\\\":\\\"DataManager.isItem(item) && item.occasion === 3\\\"}\"]","ActorCmdSet":"{\"ShowActorCmd\":\"true\",\"ActorButtonSet\":\"2\",\"ActorCmdStyle\":\"1\",\"ActorCmdX\":\"1090\",\"ActorCmdY\":\"220\",\"ActorCmdNum\":\"4\"}","GoldWindowSet":"{\"GoldMode\":\"窗口模式\",\"WindowX\":\"280\",\"WindowY\":\"5\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"GoldNumber\":\"\",\"GoldNumberId\":\"1\",\"GoldWindow\":\"\",\"WindowWidth\":\"200\",\"WindowHeight\":\"70\",\"WindowFontSize\":\"20\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"隐藏布局\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","WeightWindowSet":"{\"WeightMode\":\"窗口模式\",\"WindowX\":\"10\",\"WindowY\":\"5\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WeightNumber\":\"\",\"WeightNumberId\":\"2\",\"WeightWindow\":\"\",\"WindowWidth\":\"230\",\"WindowHeight\":\"70\",\"WindowFontSize\":\"20\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"隐藏布局\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}"}
 *
 * @param EquipMenuSet
 * @text 装备菜单设置
 * @type struct<EquipMenuSet>
 * @desc 装备菜单设置
 * @default {"MainLayoutFile":"UI_Menu/moon02","EquipMenuMode":"装备列表常显/替换列表初始隐藏","HelpWindowSet":"{\"WindowX\":\"283\",\"WindowY\":\"650\",\"WindowWidth\":\"800\",\"WindowHeight\":\"108\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"0\\\",\\\"SlideY\\\":\\\"80\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"-50\\\"}\"}","SlotWindowSet":"{\"WindowMode\":\"仅图标\",\"WindowCellDrawName\":\"true\",\"WindowSmallNameSize\":\"12\",\"WindowCellBg\":\"true\",\"WindowCoodType\":\"自定义坐标\",\"WindowCoodList\":\"[\\\"0,0\\\",\\\"258,0\\\",\\\"0,172\\\",\\\"258,172\\\",\\\"0,344\\\",\\\"258,344\\\"]\",\"FaceSet\":\"{\\\"Show Face\\\":\\\"true\\\",\\\"FaceType\\\":\\\"显示自定义立绘\\\",\\\"CustomFaceId\\\":\\\"1\\\",\\\"Face X\\\":\\\"20\\\",\\\"Face Y\\\":\\\"86\\\",\\\"Face Scale\\\":\\\"1.00\\\"}\",\"WindowX\":\"500\",\"WindowY\":\"86\",\"WindowWidth\":\"370\",\"WindowHeight\":\"520\",\"WindowCols\":\"4\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"0\\\",\\\"SlideY\\\":\\\"-80\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","StatusWindowSet":"{\"WindowParam\":\"\",\"WindowParamList\":\"[\\\"MHP\\\",\\\"MMP\\\",\\\"ATK\\\",\\\"DEF\\\",\\\"MAT\\\",\\\"MDF\\\",\\\"AGI\\\"]\",\"WindowXParamList\":\"[\\\"HIT\\\",\\\"EVA\\\",\\\"CRI\\\"]\",\"WindowSParamList\":\"[]\",\"WindowParamBg\":\"true\",\"FaceSet\":\"{\\\"Show Face\\\":\\\"true\\\",\\\"FaceType\\\":\\\"显示战斗模型\\\",\\\"CustomFaceId\\\":\\\"1\\\",\\\"Face X\\\":\\\"160\\\",\\\"Face Y\\\":\\\"40\\\",\\\"Face Scale\\\":\\\"1.00\\\"}\",\"WindowX\":\"40\",\"WindowY\":\"86\",\"WindowWidth\":\"370\",\"WindowHeight\":\"520\",\"WindowFontSize\":\"20\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","EquipItemWindowSet":"{\"WindowMode\":\"仅图标\",\"WindowCellDrawName\":\"true\",\"WindowSmallNameSize\":\"12\",\"WindowCellBg\":\"true\",\"RemoveEquip\":\"\",\"RemoveText\":\"卸下\",\"RemoveIcon\":\"16\",\"Non-RemovableTypes\":\"[]\",\"WindowX\":\"960\",\"WindowY\":\"86\",\"WindowWidth\":\"370\",\"WindowHeight\":\"520\",\"WindowCols\":\"4\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"25\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","ActorCmdSet":"{\"ShowActorCmd\":\"true\",\"ActorButtonSet\":\"2\",\"ActorCmdStyle\":\"1\",\"ActorCmdX\":\"1090\",\"ActorCmdY\":\"220\",\"ActorCmdNum\":\"4\"}"}
 *
 * @param ShopMenuSet
 * @text 商店菜单设置
 * @type struct<ShopMenuSet>
 * @desc 商店菜单设置
 * @default {"MainLayoutFile":"UI_Menu/moon02","HelpWindowSet":"{\"WindowX\":\"283\",\"WindowY\":\"650\",\"WindowWidth\":\"800\",\"WindowHeight\":\"108\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"0\\\",\\\"SlideY\\\":\\\"80\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"-50\\\"}\"}","ShopCmdBtnSet":"{\"General\":\"\",\"ButtonSetX\":\"683\",\"ButtonSetY\":\"284\",\"ButtonSetStyle\":\"5\",\"ActiveOut\":\"\",\"ButtonActiveOut\":\"true\",\"ButtonActiveOutTime\":\"25\",\"ButtonActiveOutX\":\"110\",\"ButtonActiveOutY\":\"100\",\"ButtonBitmap\":\"\",\"ButtonBitmapBuy\":\"UI_Menu/商店界面-选项购买\",\"ButtonBitmapSell\":\"UI_Menu/商店界面-选项出售\",\"ButtonBitmapBack\":\"UI_Menu/商店界面-选项离开\"}","BuyWindowSet":"{\"WindowMode\":\"仅图标\",\"WindowCellDrawName\":\"true\",\"WindowSmallNameSize\":\"12\",\"WindowCellBg\":\"true\",\"WindowX\":\"170\",\"WindowY\":\"180\",\"WindowWidth\":\"740\",\"WindowHeight\":\"420\",\"WindowCols\":\"9\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","CategoryButtonSet":"{\"ButtonSetX\":\"230\",\"ButtonSetY\":\"150\",\"ButtonSetStyle\":\"4\",\"ButtonSetBitmap\":\"\"}","CategoryButtons":"[\"{\\\"Note\\\":\\\"--物品选项--\\\",\\\"Symbol\\\":\\\"item\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-道具选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--武器选项--\\\",\\\"Symbol\\\":\\\"weapon\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-武器选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--防具选项--\\\",\\\"Symbol\\\":\\\"armor\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-防具选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\",\"{\\\"Note\\\":\\\"--蔬果选项--\\\",\\\"Symbol\\\":\\\"全部\\\",\\\"Bitmap\\\":\\\"UI_Menu/道具界面-蔬果选项\\\",\\\"ShowButton\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\"}\"]","SellWindowSet":"{\"WindowMode\":\"仅图标\",\"WindowCellDrawName\":\"true\",\"WindowSmallNameSize\":\"12\",\"WindowCellBg\":\"true\",\"WindowX\":\"170\",\"WindowY\":\"180\",\"WindowWidth\":\"740\",\"WindowHeight\":\"420\",\"WindowCols\":\"9\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","NumberWindowSet":"{\"WindowX\":\"433\",\"WindowY\":\"230\",\"WindowWidth\":\"500\",\"WindowHeight\":\"320\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"25\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"0\\\",\\\"SlideY\\\":\\\"80\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","ShopStatusWindowSet":"{\"WindowX\":\"910\",\"WindowY\":\"180\",\"WindowWidth\":\"300\",\"WindowHeight\":\"420\",\"WindowFontSize\":\"22\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"15\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"默认皮肤\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","GoldWindowSet":"{\"GoldMode\":\"窗口模式\",\"WindowX\":\"280\",\"WindowY\":\"5\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"20\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"GoldNumber\":\"\",\"GoldNumberId\":\"1\",\"GoldWindow\":\"\",\"WindowWidth\":\"200\",\"WindowHeight\":\"70\",\"WindowFontSize\":\"20\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"隐藏布局\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","WeightWindowSet":"{\"WeightMode\":\"窗口模式\",\"WindowX\":\"10\",\"WindowY\":\"5\",\"WindowMoving\":\"{\\\"MoveType\\\":\\\"弹性移动\\\",\\\"MoveTime\\\":\\\"20\\\",\\\"MoveDelay\\\":\\\"0\\\",\\\"StartPoint\\\":\\\"\\\",\\\"CoordinateType\\\":\\\"相对坐标\\\",\\\"SlideX\\\":\\\"-80\\\",\\\"SlideY\\\":\\\"0\\\",\\\"SlideAbsoluteX\\\":\\\"0\\\",\\\"SlideAbsoluteY\\\":\\\"0\\\"}\",\"WeightNumber\":\"\",\"WeightNumberId\":\"2\",\"WeightWindow\":\"\",\"WindowWidth\":\"230\",\"WindowHeight\":\"70\",\"WindowFontSize\":\"20\",\"WindowLayout\":\"{\\\"LayoutType\\\":\\\"隐藏布局\\\",\\\"Background\\\":\\\"\\\",\\\"BackgroundFile\\\":\\\"\\\",\\\"BackgroundX\\\":\\\"0\\\",\\\"BackgroundY\\\":\\\"0\\\"}\"}","WaitressId":"1"}
 *
 * @param ItemQt
 * @text 物品数量设置
 * @type struct<ItemQt>
 * @desc 物品数量设置
 * @default {"MaxItems":"99","MaxWeapons":"99","MaxArmors":"99","ItemQuantityFmt":"×%1","ItemQuantityFontSize":"16"}
 *
 * @param ItemWeight
 * @text 物品重量设置
 * @type struct<ItemWeight>
 * @desc 物品重量设置
 * @default {"General":"","Enable Weight":"false","Party Weight Limit":"0","Actor Weight Limit":"100","Item Weight":"1","Gold Per Weight":"0","WeightWindow":"","Weight Text Fmt":"承重:%1/%2","Weight Number Fmt":"%1","OverWeight":"","Overweight Text Color":"17","Disable Dash":"true","Normal Speed":"4","Overweight Speed":"2","Overweight State":"0"}
 *
 * @param ShopWaitressSet
 * @text 商店服务员样式
 * @type struct<ShopWaitressSet>[]
 * @desc 配置商店服务员的样式信息。
 * @default [] 
 *
 * @param ItemPictureSrc
 * @text 物品自定义图片文件夹
 * @desc 物品自定义图片文件夹。
 * @default img/UI_Item/ 
 *
 */
/* ----------------------------------------------------------------------------
 * struct<ItemMenuSet>
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenuSet:
 *
 * @param MainLayoutFile
 * @text 资源-整体布局
 * @type file
 * @dir img/
 * @require 1
 * @desc 物品界面的整体布局。
 * @default 
 *
 * @param HelpWindowSet
 * @text 物品帮助窗口设置
 * @type struct<HelpWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"283","WindowY":"650","WindowWidth":"800","WindowHeight":"108","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"0\",\"SlideY\":\"80\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"-50\"}"}
 *
 * @param ListWindowSet
 * @text 物品列表窗口设置
 * @type struct<ListWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellBg":"true","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowX":"170","WindowY":"180","WindowWidth":"740","WindowHeight":"420","WindowCols":"9","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param CategoryButtonSet
 * @text 物品分类按钮总体设置
 * @type struct<CategoryButtonSet>
 * @desc 物品分类按钮总体设置。
 * @default {"ButtonSetX":"230","ButtonSetY":"150","ButtonSetStyle":"4","ButtonSetBitmap":""}
 *
 * @param CategoryButtons
 * @text 物品分类按钮分项设置
 * @parent CategoryButtonSet
 * @type struct<CategoryButtons>[]
 * @desc 物品分类按钮分项设置
 * @default ["{\"Note\":\"--物品选项--\",\"Symbol\":\"item\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--武器选项--\",\"Symbol\":\"weapon\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--防具选项--\",\"Symbol\":\"armor\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"-关键物品选项-\",\"Symbol\":\"keyItem\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--蔬果选项--\",\"Symbol\":\"全部\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}"]
 *
 * @param SpecialCategory
 * @text 特殊自定义分类设置
 * @parent CategoryButtonSet
 * @type struct<SpecialCategory>[]
 * @desc 特殊自定义分类
 * @default ["{\"CategoryName\":\"全部\",\"CategoryCondition\":\"!!item\"}","{\"CategoryName\":\"全部物品\",\"CategoryCondition\":\"DataManager.isItem(item)\"}","{\"CategoryName\":\"隐藏物品A\",\"CategoryCondition\":\"DataManager.isItem(item) && item.itypeId === 3\"}","{\"CategoryName\":\"隐藏物品B\",\"CategoryCondition\":\"DataManager.isItem(item) && item.itypeId === 4\"}","{\"CategoryName\":\"消耗品\",\"CategoryCondition\":\"DataManager.isItem(item) && item.consumable\"}","{\"CategoryName\":\"非消耗品\",\"CategoryCondition\":\"DataManager.isItem(item) && !item.consumable\"}","{\"CategoryName\":\"始终可用\",\"CategoryCondition\":\"DataManager.isItem(item) && item.occasion === 0\"}","{\"CategoryName\":\"战斗可用\",\"CategoryCondition\":\"DataManager.isItem(item) && [0, 1].contains(item.occasion)\"}","{\"CategoryName\":\"非战斗可用\",\"CategoryCondition\":\"DataManager.isItem(item) && [0, 2].contains(item.occasion)\"}","{\"CategoryName\":\"不可用\",\"CategoryCondition\":\"DataManager.isItem(item) && item.occasion === 3\"}"]
 *
 *
 * @param ActorCmdSet
 * @text 角色选择按钮设置
 * @type struct<ActorCmdSet>
 * @desc 角色信息框设置。
 * @default {"ShowActorCmd":"true","ActorButtonSet":"2","ActorCmdStyle":"1","ActorCmdX":"1090","ActorCmdY":"220","ActorCmdNum":"4"}
 *
 * @param GoldWindowSet
 * @text 货币显示设置
 * @type struct<GoldWindowSet>
 * @desc 货币显示设置。
 * @default {"GoldMode":"窗口模式","WindowX":"280","WindowY":"5","GoldNumber":"","GoldNumberId":"1","GoldWindow":"","WindowWidth":"200","WindowHeight":"70","WindowFontSize":"20","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"20\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param WeightWindowSet
 * @text 背包承重显示设置
 * @type struct<WeightWindowSet>
 * @desc 背包承重显示设置。
 * @default {"WeightMode":"窗口模式","WindowX":"10","WindowY":"5","WeightNumber":"","WeightNumberId":"2","WeightWindow":"","WindowWidth":"230","WindowHeight":"70","WindowFontSize":"20","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"20\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * struct<EquipMenuSet>
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenuSet:
 *
 * @param MainLayoutFile
 * @text 资源-整体布局
 * @type file
 * @dir img/
 * @require 1
 * @desc 装备界面的整体布局。
 * @default 
 *
 * @param EquipMenuMode
 * @text 窗口切换逻辑
 * @type select
 * @option 装备列表常显/替换列表初始隐藏
 * @option 装备列表常显/替换列表常显
 * @option 装备列表和替换列表交替显示
 * @desc 窗口切换逻辑。
 * @default 装备列表常显/替换列表初始隐藏
 *
 * @param HelpWindowSet
 * @text 装备帮助窗口设置
 * @type struct<HelpWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"283","WindowY":"650","WindowWidth":"800","WindowHeight":"108","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"0\",\"SlideY\":\"80\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"-50\"}"}
 *
 * @param SlotWindowSet
 * @text 装备列表窗口设置
 * @type struct<SlotWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellBg":"true","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowCoodType":"自定义坐标","WindowCoodList":"[\"0,0\",\"258,0\",\"0,172\",\"258,172\",\"0,344\",\"258,344\"]","FaceSet":"{\"Show Face\":\"true\",\"FaceType\":\"显示自定义立绘\",\"CustomFaceId\":\"1\",\"Face X\":\"20\",\"Face Y\":\"86\",\"Face Scale\":\"1.00\"}","WindowX":"500","WindowY":"86","WindowWidth":"370","WindowHeight":"520","WindowCols":"4","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"25\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"0\",\"SlideY\":\"-80\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param StatusWindowSet
 * @text 角色属性窗口设置
 * @type struct<StatusWindowSet>
 * @desc 窗口设置。
 * @default {"WindowParam":"","WindowParamList":"[\"MHP\",\"MMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\"]","WindowXParamList":"[\"HIT\",\"EVA\",\"CRI\"]","WindowSParamList":"[]","WindowParamBg":"true","FaceSet":"{\"Show Face\":\"true\",\"FaceType\":\"显示战斗模型\",\"CustomFaceId\":\"1\",\"Face X\":\"160\",\"Face Y\":\"40\",\"Face Scale\":\"1.00\"}","WindowX":"40","WindowY":"86","WindowWidth":"370","WindowHeight":"520","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"25\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param EquipItemWindowSet
 * @text 替换装备窗口设置
 * @type struct<EquipItemWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellBg":"true","WindowCellDrawName":"true","WindowSmallNameSize":"12","RemoveEquip":"","RemoveText":"卸下","RemoveIcon":"16","Non-RemovableTypes":"[]","WindowX":"960","WindowY":"86","WindowWidth":"370","WindowHeight":"520","WindowCols":"4","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"25\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param ActorCmdSet
 * @text 角色选择按钮设置
 * @type struct<ActorCmdSet>
 * @desc 角色信息框设置。
 * @default {"ShowActorCmd":"true","ActorButtonSet":"2","ActorCmdStyle":"1","ActorCmdX":"1090","ActorCmdY":"220","ActorCmdNum":"4"}
 *
 */
/* ----------------------------------------------------------------------------
 * struct<ShopMenuSet>
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenuSet:
 *
 * @param MainLayoutFile
 * @text 资源-整体布局
 * @type file
 * @dir img/
 * @require 1
 * @desc 物品界面的整体布局。
 * @default 
 *
 * @param HelpWindowSet
 * @text 物品帮助窗口设置
 * @type struct<HelpWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"283","WindowY":"650","WindowWidth":"800","WindowHeight":"108","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"0\",\"SlideY\":\"80\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"-50\"}"}
 *
 * @param ShopCmdBtnSet
 * @text 初始命令按钮设置
 * @type struct<ShopCmdBtnSet>
 * @desc 窗口设置。
 * @default {"General":"","ButtonSetX":"683","ButtonSetY":"284","ButtonSetStyle":"5","ActiveOut":"","ButtonActiveOut":"true","ButtonActiveOutTime":"25","ButtonActiveOutX":"110","ButtonActiveOutY":"100","ButtonBitmap":"","ButtonBitmapBuy":"","ButtonBitmapSell":"","ButtonBitmapBack":""}
 *
 * @param BuyWindowSet
 * @text 购买物品列表窗口设置
 * @type struct<ListWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellBg":"true","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowX":"170","WindowY":"180","WindowWidth":"740","WindowHeight":"420","WindowCols":"9","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param CategoryButtonSet
 * @text 物品分类按钮总体设置
 * @type struct<CategoryButtonSet>
 * @desc 物品分类按钮总体设置。
 * @default {"ButtonSetX":"230","ButtonSetY":"150","ButtonSetStyle":"4","ButtonSetBitmap":""}
 *
 * @param CategoryButtons
 * @text 物品分类按钮分项设置
 * @parent CategoryButtonSet
 * @type struct<CategoryButtons>[]
 * @desc 物品分类按钮分项设置
 * @default ["{\"Note\":\"--物品选项--\",\"Symbol\":\"item\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--武器选项--\",\"Symbol\":\"weapon\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--防具选项--\",\"Symbol\":\"armor\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"-关键物品选项-\",\"Symbol\":\"keyItem\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}","{\"Note\":\"--蔬果选项--\",\"Symbol\":\"全部\",\"Bitmap\":\"\",\"ShowButton\":\"\\\"return true;\\\"\"}"]
 *
 * @param SellWindowSet
 * @text 出售物品列表窗口设置
 * @type struct<ListWindowSet>
 * @desc 窗口设置。
 * @default {"WindowMode":"仅图标","WindowCellBg":"true","WindowCellDrawName":"true","WindowSmallNameSize":"12","WindowX":"170","WindowY":"180","WindowWidth":"740","WindowHeight":"420","WindowCols":"9","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param NumberWindowSet
 * @text 交易确认窗口设置
 * @type struct<HelpWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"170","WindowY":"180","WindowWidth":"740","WindowHeight":"420","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"25\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param ShopStatusWindowSet
 * @text 角色状态窗口设置
 * @type struct<ShopStatusWindowSet>
 * @desc 窗口设置。
 * @default {"WindowX":"910","WindowY":"180","WindowWidth":"300","WindowHeight":"420","WindowFontSize":"22","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"15\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"默认皮肤\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param GoldWindowSet
 * @text 货币显示设置
 * @type struct<GoldWindowSet>
 * @desc 货币显示设置。
 * @default {"GoldMode":"窗口模式","WindowX":"280","WindowY":"5","GoldNumber":"","GoldNumberId":"1","GoldWindow":"","WindowWidth":"200","WindowHeight":"70","WindowFontSize":"20","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"20\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"隐藏布局\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param WeightWindowSet
 * @text 背包承重显示设置
 * @type struct<WeightWindowSet>
 * @desc 背包承重显示设置。
 * @default {"WeightMode":"窗口模式","WindowX":"10","WindowY":"5","WeightNumber":"","WeightNumberId":"2","WeightWindow":"","WindowWidth":"230","WindowHeight":"70","WindowFontSize":"20","WindowMoving":"{\"MoveType\":\"弹性移动\",\"MoveTime\":\"20\",\"MoveDelay\":\"0\",\"StartPoint\":\"\",\"CoordinateType\":\"相对坐标\",\"SlideX\":\"-80\",\"SlideY\":\"0\",\"SlideAbsoluteX\":\"0\",\"SlideAbsoluteY\":\"0\"}","WindowLayout":"{\"LayoutType\":\"隐藏布局\",\"Background\":\"\",\"BackgroundFile\":\"\",\"BackgroundX\":\"0\",\"BackgroundY\":\"0\"}"}
 *
 * @param WaitressId
 * @text 默认服务员样式id
 * @type number
 * @min 0
 * @desc 默认服务员样式id，0代表没有服务员
 * @default 0
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
 * struct<ListWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ListWindowSet:
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
 * @param FaceSet
 * @text 头像显示
 * @type struct<FaceSet>
 * @desc 头像显示
 * @default {"Show Face":"true","FaceType":"显示默认头像","Face X":"40","Face Y":"-100","Face Scale":"0.70"}
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
 * struct<StatusWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~StatusWindowSet:
 *
 * @param WindowParam
 * @text ---参数显示---
 *
 * @param WindowParamList
 * @text 要显示的基础参数列表
 * @parent WindowParam
 * @type select[]
 * @option MHP
 * @option MMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc 要显示的基础参数列表。
 * @default ["MHP","MMP","ATK","DEF","MAT","MDF","AGI"]
 *
 * @param WindowXParamList
 * @text 要显示的额外参数列表
 * @parent WindowParam
 * @type select[]
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @desc 要显示的额外参数列表。
 * @default ["HIT","EVA","CRI"]
 *
 * @param WindowSParamList
 * @text 要显示的特殊参数列表
 * @parent WindowParam
 * @type select[]
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 要显示的特殊参数列表。
 * @default []
 *
 * @param WindowParamBg
 * @text 是否显示参数背景颜色
 * @parent WindowParam
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示参数背景颜色
 * @default true
 *
 * @param FaceSet
 * @text 头像显示
 * @type struct<FaceSet>
 * @desc 头像显示
 * @default {"Show Face":"true","FaceType":"显示默认头像","Face X":"40","Face Y":"-100","Face Scale":"0.70"}
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
 * struct<EquipItemWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~EquipItemWindowSet:
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
 * @param RemoveEquip
 * @text ---移除装备---
 * @default
 *
 * @param RemoveText
 * @text 移除装备用语
 * @parent RemoveEquip
 * @desc 移除装备用语
 * @default 卸下
 *
 * @param RemoveIcon
 * @text 移除装备图标
 * @parent RemoveEquip
 * @type number
 * @min 0
 * @desc 移除装备图标
 * @default 16
 *
 * @param Non-RemovableTypes
 * @text 不能移除的装备槽
 * @parent RemoveEquip
 * @type number[]
 * @min 1
 * @max 100
 * @desc 不能移除的装备槽，填装备类型id
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
 * struct<ShopStatusWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopStatusWindowSet:
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
 * struct<CategoryButtonSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~CategoryButtonSet:
 *
 * @param ButtonSetX
 * @text 平移-按钮组 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 408
 * 
 * @param ButtonSetY
 * @text 平移-按钮组 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 312
 * 
 * @param ButtonSetStyle
 * @text 按钮组样式
 * @type number
 * @min 1
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 1
 *
 * @param ButtonSetBitmap
 * @text 默认按钮贴图
 * @type file
 * @require 1
 * @dir img/
 * @desc 默认按钮的图片资源。
 * @default 
 *
 */
/* ---------------------------------------------------------------------------
 * struct<CategoryButtons>
 * ---------------------------------------------------------------------------
 */
/*~struct~CategoryButtons:
 *
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的按钮关键字对应--
 * 
 * @param Symbol
 * @text 关键字
 * @desc 按钮贴图是通过 菜单按钮关键字 绑定的。item。
 * @default item
 *
 * @param Bitmap
 * @text 按钮贴图
 * @type file
 * @require 1
 * @dir img/
 * @desc 按钮的图片资源。
 * @default 
 *
 * @param ShowButton
 * @text 是否显示按钮
 * @type note
 * @desc 根据代码运行结果决定是否显示按钮
 * @default "return true;"
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SpecialCategory>
 * ---------------------------------------------------------------------------
 */
/*~struct~SpecialCategory:
 *
 * @param CategoryName
 * @text 分类名称
 * @desc 分类名称
 * @default xxx
 *
 * @param CategoryCondition
 * @text 分类条件
 * @desc 该自定义分类满足的js条件，item代表相应物品
 * @default DataManager.isItem(item)
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ActorCmdSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ActorCmdSet:
 *
 * @param ShowActorCmd
 * @text 是否初始显示角色信息框
 * @type boolean
 * @on 显示
 * @off 关闭
 * @desc 是否初始显示角色信息框
 * @default true
 *
 * @param ActorButtonSet
 * @text 角色框按钮组样式
 * @parent ShowActorCmd
 * @type number
 * @min 1
 * @desc 角色框按钮组对应的样式配置，对应 精灵UI核心 的样式id。
 * @default 1
 *
 * @param ActorCmdStyle
 * @text 角色框样式
 * @parent ShowActorCmd
 * @type number
 * @min 1
 * @desc 角色框显示样式，对应 角色信息框核心 的样式id。
 * @default 1
 *
 * @param ActorCmdX
 * @text 平移-信息框组 X
 * @parent ShowActorCmd
 * @desc 以信息框组整体的位置为基准，x轴方向平移，0为贴在最左边。单位像素。
 * @default 0
 *
 * @param ActorCmdY
 * @text 平移-信息框组 Y
 * @parent ShowActorCmd
 * @desc 以信息框组整体的位置为基准，y轴方向平移，0为贴在最上面。单位像素。
 * @default 0
 * 
 * @param ActorCmdNum
 * @text 角色框数量上限
 * @parent ShowActorCmd
 * @type number
 * @min 1
 * @desc 物品菜单中显示的角色框数量上限。
 * @default 4
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<GoldWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~GoldWindowSet:
 *
 * @param GoldMode
 * @text 货币显示模式
 * @type select
 * @option 参数数字模式
 * @value 参数数字模式
 * @option 窗口模式
 * @value 窗口模式
 * @option 不显示
 * @value 不显示
 * @desc 货币显示的模式。
 * @default 参数数字模式
 *
 * @param WindowX
 * @text 货币显示坐标 X
 * @desc 货币数字的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 15
 *
 * @param WindowY
 * @text 货币显示坐标 Y
 * @desc 货币数字的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 180
 * 
 * @param WindowMoving
 * @text 货币移动动画
 * @type struct<WindowMoving>
 * @desc 窗口/参数数字会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"20","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 *
 * @param GoldNumber
 * @text --货币参数数字配置--
 * @default
 *
 * @param GoldNumberId
 * @text 货币参数数字 样式id
 * @parent GoldNumber
 * @desc 货币为'参数数字模式'时，货币参数数字在高级参数条核心的配置样式id。
 * @type number
 * @min 1
 * @default 1
 *
 * @param GoldWindow
 * @text --货币窗口配置--
 * @default
 *
 * @param WindowWidth
 * @text 货币窗口宽度
 * @parent GoldWindow
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。
 * @default 230
 *
 * @param WindowHeight
 * @text 货币窗口高度
 * @parent GoldWindow
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。
 * @default 240
 *
 * @param WindowFontSize
 * @text 货币窗口字体大小
 * @parent GoldWindow
 * @type number
 * @min 1
 * @desc 货币窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 * 
 * @param WindowLayout
 * @text 货币窗口布局
 * @parent GoldWindow
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<WeightWindowSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~WeightWindowSet:
 *
 * @param WeightMode
 * @text 背包承重显示模式
 * @type select
 * @option 参数数字模式
 * @value 参数数字模式
 * @option 窗口模式
 * @value 窗口模式
 * @option 不显示
 * @value 不显示
 * @desc 背包承重显示模式。
 * @default 参数数字模式
 *
 * @param WindowX
 * @text 背包承重显示坐标 X
 * @desc 背包承重数字的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 15
 *
 * @param WindowY
 * @text 背包承重显示坐标 Y
 * @desc 背包承重数字的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 180
 * 
 * @param WindowMoving
 * @text 背包承重移动动画
 * @type struct<WindowMoving>
 * @desc 窗口/参数数字会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"20","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 *
 * @param WeightNumber
 * @text -背包承重参数数字配置-
 * @default
 *
 * @param WeightNumberId
 * @text 背包承重参数数字 样式id
 * @parent WeightNumber
 * @desc 背包承重为'参数数字模式'时，背包承重参数数字在高级参数条核心的配置样式id。
 * @type number
 * @min 1
 * @default 1
 *
 * @param WeightWindow
 * @text --背包承重窗口配置--
 * @default
 *
 * @param WindowWidth
 * @text 背包承重窗口宽度
 * @parent WeightWindow
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。
 * @default 230
 *
 * @param WindowHeight
 * @text 背包承重窗口高度
 * @parent WeightWindow
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。
 * @default 240
 *
 * @param WindowFontSize
 * @text 背包承重窗口字体大小
 * @parent WeightWindow
 * @type number
 * @min 1
 * @desc 货币窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 * 
 * @param WindowLayout
 * @text 背包承重窗口布局
 * @parent WeightWindow
 * @type struct<WindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"LayoutType":"默认皮肤","Background":"","BackgroundFile":"","BackgroundX":"0","BackgroundY":"0"}
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<ShopCmdBtnSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopCmdBtnSet:
 *
 * @param General
 * @text ---主体设置---
 *
 * @param ButtonSetX
 * @text 平移-按钮组 X
 * @parent General
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 408
 * 
 * @param ButtonSetY
 * @text 平移-按钮组 Y
 * @parent General
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 312
 * 
 * @param ButtonSetStyle
 * @text 按钮组样式
 * @parent General
 * @type number
 * @min 1
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 1
 *
 * @param ActiveOut
 * @text ---激活后出列---
 *
 * @param ButtonActiveOut
 * @text 激活后是否出列
 * @parent ActiveOut
 * @type boolean
 * @on 出列
 * @off 不出列
 * @desc 激活后是否出列。
 * @default true
 *
 * @param ButtonActiveOutTime
 * @text 激活后出列变化时长
 * @parent ActiveOut
 * @type number
 * @min 1
 * @desc 激活后出列变化时长，单位帧。
 * @default 25
 *
 * @param ButtonActiveOutX
 * @text 激活后出列坐标X
 * @parent ActiveOut
 * @type number
 * @min 1
 * @desc 激活后出列坐标X，单位像素。
 * @default 110
 *
 * @param ButtonActiveOutY
 * @text 激活后出列坐标Y
 * @parent ActiveOut
 * @type number
 * @min 1
 * @desc 激活后出列坐标Y，单位像素。
 * @default 100
 *
 * @param ButtonBitmap
 * @text ---按钮贴图---
 *
 * @param ButtonBitmapBuy
 * @text 购买选项-按钮贴图
 * @parent ButtonBitmap
 * @type file
 * @require 1
 * @dir img/
 * @desc 购买选项-按钮贴图
 * @default 
 *
 * @param ButtonBitmapSell
 * @text 出售选项-按钮贴图
 * @parent ButtonBitmap
 * @type file
 * @require 1
 * @dir img/
 * @desc 出售选项-按钮贴图
 * @default 
 *
 * @param ButtonBitmapBack
 * @text 取消选项-按钮贴图
 * @parent ButtonBitmap
 * @type file
 * @require 1
 * @dir img/
 * @desc 取消选项-按钮贴图
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * struct<ItemQt>
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemQt:
 *
 * @param MaxItems
 * @text 物品数量上限
 * @desc 物品数量上限.
 * @default 99
 *
 * @param MaxWeapons
 * @text 武器数量上限
 * @desc 武器数量上限.
 * @default 99
 *
 * @param MaxArmors
 * @text 防具数量上限
 * @desc 防具数量上限.
 * @default 99
 *
 * @param ItemQuantityFmt
 * @text 数量显示格式
 * @desc 数量显示格式.
 * %1 - 物品数量
 * @default ×%1
 *
 * @param ItemQuantityFontSize
 * @text 字体大小
 * @type number
 * @min 1
 * @desc 数量字体大小.
 * @default 22
 *
 */
/* ----------------------------------------------------------------------------
 * struct<ItemWeight>
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemWeight:
 *
 * @param General
 * @text ----基本设置----
 * @default
 *
 * @param Enable Weight
 * @text 是否启用重量系统
 * @parent General
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 是否启用物品重量系统
 * @default true
 *
 * @param Party Weight Limit
 * @text 队伍最大承重
 * @parent General
 * @type number
 * @min 0
 * @desc 整个队伍能够承受的基础重量
 * @default 0
 *
 * @param Actor Weight Limit
 * @text 单个角色最大承重
 * @parent General
 * @type number
 * @min 0
 * @desc 单个角色能够承受的默认最大重量
 * @default 100
 * 
 * @param Item Weight
 * @text 单个物品默认重量
 * @parent General
 * @desc 单个物品的默认重量
 * @default 1
 * 
 * @param Gold Per Weight
 * @text 单位重量的货币数
 * @parent General
 * @type number
 * @min 0
 * @desc 单位重量的货币数
 * @default 0
 *
 * @param WeightWindow
 * @text ----显示设置----
 * @default
 *
 * @param Weight Text Fmt 
 * @text 重量显示的格式
 * @parent WeightWindow
 * @desc 菜单中重量窗口显示的格式
 * @default 重量:%1/%2
 *  
 * @param Weight Number Fmt
 * @text 重量数值显示的格式
 * @parent WeightWindow
 * @desc 重量数值显示的格式
 * @default %1
 *
 * @param OverWeight
 * @text ----超重影响----
 * @default
 *
 * @param Overweight Text Color
 * @text 超重时的字体颜色
 * @parent OverWeight
 * @desc 超重时的重量显示字体颜色
 * @default 17
 *
 * @param Disable Dash
 * @text 超重时禁止跑步
 * @parent OverWeight
 * @type boolean
 * @on 是
 * @off 否
 * @desc 是否在超重时禁止跑步
 * @default true
 * 
 * @param Normal Speed
 * @text 正常速度
 * @parent OverWeight
 * @type number
 * @min 1
 * @desc 没有超重时候的走路速度.
 * 可填: 1,2,3,4,5,6
 * @default 4
 * 
 * @param Overweight Speed
 * @text 超重速度
 * @parent OverWeight
 * @type number
 * @min 1
 * @desc 超重时候的走路速度.
 * 可填: 1,2,3,4,5,6
 * @default 2
 *  
 * @param Overweight State
 * @text 超重时全队附加的状态
 * @parent OverWeight
 * @type state
 * @desc 超重时全队附加的状态
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ShopWaitressSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopWaitressSet:
 * 
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的服务员样式--
 *
 * @param WaitressX
 * @text 服务员X坐标
 * @desc 服务员的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param WaitressY
 * @text 服务员Y坐标
 * @desc 服务员的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param WaitressMoving
 * @text 服务员移动动画
 * @type struct<WindowMoving>
 * @desc 服务员会从某个点跑回自己的原位置。
 * @default {"MoveType":"弹性移动","MoveTime":"25","MoveDelay":"0","StartPoint":"","CoordinateType":"相对坐标","SlideX":"-80","SlideY":"0","SlideAbsoluteX":"0","SlideAbsoluteY":"0"}
 *
 * @param ActionList
 * @text ---行为列表---
 *
 * @param DefaultAction
 * @text 行为-默认
 * @parent ActionList
 * @type struct<WaitressActDefault>
 * @desc 行为-默认。
 * @default {}
 *
 * @param WelcomeAction
 * @text 行为-欢迎光临
 * @parent ActionList
 * @type struct<WaitressAct>
 * @desc 行为-欢迎光临。
 * @default {}
 *
 * @param BuyAction
 * @text 行为-购买
 * @parent ActionList
 * @type struct<WaitressAct>
 * @desc 行为-购买。
 * @default {}
 *
 * @param SellAction
 * @text 行为-出售
 * @parent ActionList
 * @type struct<WaitressAct>
 * @desc 行为-出售。
 * @default {}
 *
 * @param NotEnoughAction
 * @text 行为-钱不够
 * @parent ActionList
 * @type struct<WaitressAct>
 * @desc 行为-钱不够。
 * @default {}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<WaitressActDefault>
 * ---------------------------------------------------------------------------
 */
/*~struct~WaitressActDefault:
 *
 * @param ActionGIF
 * @text 资源-动作GIF
 * @type file[]
 * @require 1
 * @dir img/
 * @desc 服务员的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default []
 *
 * @param ActionFlashTime
 * @text 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param ActionInverted
 * @text 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc 是否倒放
 * @default false
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<WaitressAct>
 * ---------------------------------------------------------------------------
 */
/*~struct~WaitressAct:
 * 
 * @param EnableAction
 * @text 是否启用该行为
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 是否启用该行为
 * @default true
 *
 * @param ActionTime
 * @text 动作持续时间
 * @type number
 * @min 1
 * @desc 服务员执行这个动作的持续时间。
 * @default 80
 * 
 * @param ActionDelay
 * @text 动作延迟
 * @type number
 * @min 0
 * @desc 开始执行动作的额外延迟时间。（1秒60帧）
 * @default 0
 *
 * @param ActionSE
 * @text 资源-动作声音
 * @type file
 * @require 1
 * @dir audio/se/
 * @desc 服务员执行该动作发出的声音。
 * @default 
 *
 * @param ActionGIF
 * @text 资源-动作GIF
 * @type file[]
 * @require 1
 * @dir img/
 * @desc 服务员动作的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default []
 *
 * @param ActionFlashTime
 * @text 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param ActionInverted
 * @text 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc 是否倒放
 * @default false
 *
 * @param ActionRepeat
 * @text GIF到末尾是否重播
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc GIF到末尾是否重播
 * @default true
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.COIE.pluginName);
GF.Param = GF.Param || {};

GF.COIE.getItemListWindowParam = function(data) {
	const set = {
		WindowSet: DataManager.setupWindowInitParam(data),
		WindowMode: data.WindowMode,
		WindowCellBg: eval(data.WindowCellBg),
		WindowCellDrawName: eval(data.WindowCellDrawName),
		WindowSmallNameSize: Number(data.WindowSmallNameSize),
		WindowCols: data.WindowCols ? Number(data.WindowCols) : 1
	};
	return set;
};

GF.COIE.initFaceData = function(data) {
	data = JSON.parse(data);
	const Set = {
		face_show: eval(data['Show Face']),
		face_type: data['FaceType'],
		face_custom_id: Number(data['CustomFaceId']),
		face_x: Number(data['Face X']),
		face_y: Number(data['Face Y']),
		face_scale: parseFloat(data['Face Scale'])
	};
	return Set;
};

GF.Param.COIEItemMenuSet = (() => {
	const set = JSON.parse(GF.Parameters['ItemMenuSet']);
	const helpWindowSet = JSON.parse(set.HelpWindowSet);
	set.HelpWindowSet = DataManager.setupWindowInitParam(helpWindowSet);
	const listWindowSet = JSON.parse(set.ListWindowSet);
	set.ListWindowSet = GF.COIE.getItemListWindowParam(listWindowSet);
	const cateBtnSet = JSON.parse(set.CategoryButtonSet);
	set.CategoryButtonSet = {
		ButtonSetX: Number(cateBtnSet.ButtonSetX),
		ButtonSetY: Number(cateBtnSet.ButtonSetY),
		ButtonSetStyle: Number(cateBtnSet.ButtonSetStyle),
		ButtonSetBitmap: cateBtnSet.ButtonSetBitmap
	};
	set.CategoryButtons = JSON.parse(set.CategoryButtons);
	set.CategoryButtons = set.CategoryButtons.map(set => {
		set = JSON.parse(set);
		set.ShowButton = JSON.parse(set.ShowButton);
		return set;
	});
	const specialCategory = JSON.parse(set.SpecialCategory);
	set.SpecialCategoryName = specialCategory.map(cat => JSON.parse(cat).CategoryName);
	set.SpecialCategoryCondition = specialCategory.map(cat => JSON.parse(cat).CategoryCondition);
	const actorCmdSet = JSON.parse(set.ActorCmdSet);
	set.ActorCmdSet = {
		ShowActorCmd: eval(actorCmdSet.ShowActorCmd),
		ActorButtonSet: Number(actorCmdSet.ActorButtonSet),
		ActorCmdStyle: Number(actorCmdSet.ActorCmdStyle),
		ActorCmdX: Number(actorCmdSet.ActorCmdX),
		ActorCmdY: Number(actorCmdSet.ActorCmdY),
		ActorCmdNum: Number(actorCmdSet.ActorCmdNum)
	};
	const goldWindowSet = JSON.parse(set.GoldWindowSet);
	set.GoldWindowSet = {
		WindowSet: DataManager.setupWindowInitParam(goldWindowSet),
		WindowMoving: JSON.parse(goldWindowSet.WindowMoving),
		GoldNumberId: Number(goldWindowSet.GoldNumberId),
		GoldMode: goldWindowSet.GoldMode
	};
	const weightWindowSet = JSON.parse(set.WeightWindowSet);
	set.WeightWindowSet = {
		WindowSet: DataManager.setupWindowInitParam(weightWindowSet),
		WindowMoving: JSON.parse(weightWindowSet.WindowMoving),
		WeightNumberId: Number(weightWindowSet.WeightNumberId),
		WeightMode: weightWindowSet.WeightMode
	};
	return set;
})();
GF.Param.COIEEquipMenuSet = (() => {
	const set = JSON.parse(GF.Parameters['EquipMenuSet']);
	const helpWindowSet = JSON.parse(set.HelpWindowSet);
	set.HelpWindowSet = DataManager.setupWindowInitParam(helpWindowSet);
	const SlotWindowSet = JSON.parse(set.SlotWindowSet);
	set.SlotWindowSet = GF.COIE.getItemListWindowParam(SlotWindowSet);
	set.SlotWindowSet.WindowCoodType = SlotWindowSet.WindowCoodType;
	set.SlotWindowSet.WindowCoodList = JSON.parse(SlotWindowSet.WindowCoodList);
	set.SlotWindowSet.FaceSet = GF.COIE.initFaceData(SlotWindowSet.FaceSet);
	const StatusWindowSet = JSON.parse(set.StatusWindowSet);
	set.StatusWindowSet = {
		WindowSet: DataManager.setupWindowInitParam(StatusWindowSet),
		WindowParamList: JSON.parse(StatusWindowSet.WindowParamList),
		WindowXParamList: JSON.parse(StatusWindowSet.WindowXParamList),
		WindowSParamList: JSON.parse(StatusWindowSet.WindowSParamList),
		WindowParamBg: eval(StatusWindowSet.WindowParamBg),
		FaceSet: GF.COIE.initFaceData(StatusWindowSet.FaceSet)
	};
	const EquipItemWindowSet = JSON.parse(set.EquipItemWindowSet);
	set.EquipItemWindowSet = GF.COIE.getItemListWindowParam(EquipItemWindowSet);
	set.EquipItemWindowSet.RemoveText = EquipItemWindowSet.RemoveText;
	set.EquipItemWindowSet.RemoveIcon = Number(EquipItemWindowSet.RemoveIcon);
	set.EquipItemWindowSet['Non-RemovableTypes'] = JSON.parse(EquipItemWindowSet['Non-RemovableTypes']).map(type => Number(type));
	const actorCmdSet = JSON.parse(set.ActorCmdSet);
	set.ActorCmdSet = {
		ShowActorCmd: eval(actorCmdSet.ShowActorCmd),
		ActorButtonSet: Number(actorCmdSet.ActorButtonSet),
		ActorCmdStyle: Number(actorCmdSet.ActorCmdStyle),
		ActorCmdX: Number(actorCmdSet.ActorCmdX),
		ActorCmdY: Number(actorCmdSet.ActorCmdY),
		ActorCmdNum: Number(actorCmdSet.ActorCmdNum)
	};
	return set;
})();
GF.Param.COIEShopMenuSet = (() => {
	const set = JSON.parse(GF.Parameters['ShopMenuSet']);
	const helpWindowSet = JSON.parse(set.HelpWindowSet);
	set.HelpWindowSet = DataManager.setupWindowInitParam(helpWindowSet);
	const ShopCmdBtnSet = JSON.parse(set.ShopCmdBtnSet);
	set.ShopCmdBtnSet = {
		ButtonSetX: Number(ShopCmdBtnSet.ButtonSetX),
		ButtonSetY: Number(ShopCmdBtnSet.ButtonSetY),
		ButtonSetStyle: Number(ShopCmdBtnSet.ButtonSetStyle),
		ButtonActiveOut: eval(ShopCmdBtnSet.ButtonActiveOut),
		ButtonActiveOutTime: Number(ShopCmdBtnSet.ButtonActiveOutTime),
		ButtonActiveOutX: Number(ShopCmdBtnSet.ButtonActiveOutX),
		ButtonActiveOutY: Number(ShopCmdBtnSet.ButtonActiveOutY),
		ButtonBitmapBuy: ShopCmdBtnSet.ButtonBitmapBuy,
		ButtonBitmapSell: ShopCmdBtnSet.ButtonBitmapSell,
		ButtonBitmapBack: ShopCmdBtnSet.ButtonBitmapBack,
	};
	const BuyWindowSet = JSON.parse(set.BuyWindowSet);
	set.BuyWindowSet = GF.COIE.getItemListWindowParam(BuyWindowSet);
	const cateBtnSet = JSON.parse(set.CategoryButtonSet);
	set.CategoryButtonSet = {
		ButtonSetX: Number(cateBtnSet.ButtonSetX),
		ButtonSetY: Number(cateBtnSet.ButtonSetY),
		ButtonSetStyle: Number(cateBtnSet.ButtonSetStyle),
		ButtonSetBitmap: cateBtnSet.ButtonSetBitmap
	};
	set.CategoryButtons = JSON.parse(set.CategoryButtons);
	set.CategoryButtons = set.CategoryButtons.map(set => {
		set = JSON.parse(set);
		set.ShowButton = JSON.parse(set.ShowButton);
		return set;
	});
	const SellWindowSet = JSON.parse(set.SellWindowSet);
	set.SellWindowSet = GF.COIE.getItemListWindowParam(SellWindowSet);
	const NumberWindowSet = JSON.parse(set.NumberWindowSet);
	set.NumberWindowSet = DataManager.setupWindowInitParam(NumberWindowSet);
	const ShopStatusWindowSet = JSON.parse(set.ShopStatusWindowSet);
	set.ShopStatusWindowSet = DataManager.setupWindowInitParam(ShopStatusWindowSet);
	const goldWindowSet = JSON.parse(set.GoldWindowSet);
	set.GoldWindowSet = {
		WindowSet: DataManager.setupWindowInitParam(goldWindowSet),
		WindowMoving: JSON.parse(goldWindowSet.WindowMoving),
		GoldNumberId: Number(goldWindowSet.GoldNumberId),
		GoldMode: goldWindowSet.GoldMode
	};
	const weightWindowSet = JSON.parse(set.WeightWindowSet);
	set.WeightWindowSet = {
		WindowSet: DataManager.setupWindowInitParam(weightWindowSet),
		WindowMoving: JSON.parse(weightWindowSet.WindowMoving),
		WeightNumberId: Number(weightWindowSet.WeightNumberId),
		WeightMode: weightWindowSet.WeightMode
	};
	set.WaitressId = Number(set.WaitressId);
	return set;
})();

GF.Param.COIEItemQt = JSON.parse(GF.Parameters['ItemQt']);
GF.Param.COIEItemWeight = JSON.parse(GF.Parameters['ItemWeight']);
GF.Param.COIEShopWaitressSet = JSON.parse(GF.Parameters['ShopWaitressSet']);
GF.Param.COIEItemPictureSrc = GF.Parameters['ItemPictureSrc'];

//=============================================================================
// MenuItemEquipDataManager
//=============================================================================

GF.COIE.ShopWaitressSetList = [null];

class MenuItemEquipDataManager {
	static getEquipParamList() {
		const statusWindowSet = GF.Param.COIEEquipMenuSet['StatusWindowSet'];
		const paramList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
		const xParamList = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
		const sParamList = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
		GF.COIE.ParamIndex = statusWindowSet.WindowParamList.map(param => paramList.indexOf(param));
		GF.COIE.XParamIndex = statusWindowSet.WindowXParamList.map(param => xParamList.indexOf(param));
		GF.COIE.SParamIndex = statusWindowSet.WindowSParamList.map(param => sParamList.indexOf(param));
	}
	
	static shopWaitressDatabaseCreate() {
        GF.COIE.ShopWaitressSetList = [null];
        const list = GF.Param.COIEShopWaitressSet;
        for (let i = 1; i <= list.length; i++) {
            let gmData = JSON.parse(list[i - 1] || null);
            if (gmData) {
                this.initShopWaitressSet(i, gmData);
            }
        }
    }
	
	static initShopWaitressSet(id, data) {
		const waitress = {};
		waitress['x'] = Number(data["WaitressX"] || 0);
		waitress['y'] = Number(data["WaitressY"] || 0);
		this.initWaitressSlideData(waitress, data);
		this.initWaitressActDefault(waitress, data);
		this.initWaitressAct(waitress, data);
		GF.COIE.ShopWaitressSetList[id] = waitress;
	}
	
	static initWaitressSlideData(waitress, dataFrom) {
		const data = JSON.parse(dataFrom.WaitressMoving);
		waitress['slideMoveType'] = String(data["MoveType"] || "匀速移动");
		waitress['slideTime'] = Number(data["MoveTime"] || 20);
		waitress['slideDelay'] = Number(data["MoveDelay"] || 0);
		waitress['slidePosType'] = String(data["CoordinateType"] || "相对坐标");
		waitress['slideX'] = Number(data["SlideX"] || -100);
		waitress['slideY'] = Number(data["SlideY"] || 0);
		waitress['slideAbsoluteX'] = Number(data["SlideAbsoluteX"] || 0);
		waitress['slideAbsoluteY'] = Number(data["SlideAbsoluteY"] || 0);
	}
	
	static initWaitressActDefault(waitress, dataFrom) {
		const data = JSON.parse(dataFrom.DefaultAction);
		const act_default = {};
		act_default['gif_src'] = JSON.parse(data['ActionGIF'] || []);
		act_default['gif_interval'] = Number(data['ActionFlashTime'] || 4);
		act_default['gif_back_run'] = eval(data['ActionInverted'] || "false");
		waitress['act-default'] = act_default;
	}
	
	static initWaitressAct(waitress, dataFrom) {
		let data = JSON.parse(dataFrom.WelcomeAction);
		waitress['act-welcome'] = this.convertWaitressAct(data);
		data = JSON.parse(dataFrom.BuyAction);
		waitress['act-buyOne'] = this.convertWaitressAct(data);
		data = JSON.parse(dataFrom.SellAction);
		waitress['act-sellOne'] = this.convertWaitressAct(data);
		data = JSON.parse(dataFrom.NotEnoughAction);
		waitress['act-goldNotEnough'] = this.convertWaitressAct(data);
	}
	
	static convertWaitressAct(dataFrom) {
		const data = {};
		data['enable'] = eval(dataFrom['EnableAction'] || "false");
		data['sustain'] = Number(dataFrom['ActionTime'] || 60);
		data['delay'] = Number(dataFrom['ActionDelay'] || 0);
		data['se'] = String(dataFrom['ActionSE'] || "");
		data['gif_src'] = JSON.parse(dataFrom['ActionGIF'] || []);
		data['gif_interval'] = Number(dataFrom['ActionFlashTime'] || 4);
		data['gif_back_run'] = eval(dataFrom['ActionInverted'] || "false");
		data['gif_replay'] = eval(dataFrom['ActionRepeat'] || "true");
		return data;
	}
	
}
MenuItemEquipDataManager.getEquipParamList();
MenuItemEquipDataManager.shopWaitressDatabaseCreate();

//=============================================================================
// DataManager
//=============================================================================

GF.COIE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!GF.COIE.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!GF._loaded_GF_2_CoreOfItemEquip) {
        this.processCOIENotetagsIWA($dataItems);
        this.processCOIENotetagsIWA($dataWeapons);
        this.processCOIENotetagsIWA($dataArmors);
		this.processCOIENotetagsS($dataSkills);
		this.processCOIENotetagsSta($dataStates);
		this.processCOIENotetagsAct($dataActors);
		this.processCOIENotetagsC($dataClasses);
        GF._loaded_GF_2_CoreOfItemEquip = true;
    }
    return true;
};

DataManager.processCOIENotetagsIWA = function (group) {
    for (const obj of group) {
		if (!obj) continue;
        this.setupCOIENotetags1(obj);
		this.setupCOIENotetags2(obj);
    }
};

DataManager.setupCOIENotetags1 = function (obj) {
	var notedata = obj.note.split(/[\r\n]+/);
		
	if (this.isItem(obj)) 
		obj.maxItem = Number(GF.Param.COIEItemQt['MaxItems']);
	else if (this.isWeapon(obj)) 
		obj.maxItem = Number(GF.Param.COIEItemQt['MaxWeapons']);
	else if (this.isArmor(obj))
		obj.maxItem = Number(GF.Param.COIEItemQt['MaxArmors']);
	
	obj.itemCategory = [];
	obj.weight = Number(GF.Param.COIEItemWeight['Item Weight']);
	obj.weightLimit = 0.0;
	obj.pictureImg = '';
	
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(/<(?:MAX|数量上限):\s*(\d+)>/i)) {
			obj.maxItem = parseInt(RegExp.$1);
		} else if (line.match(/<(?:MENU CATEGORY|物品类型):\s*(.*)>/i)) {
			var str = String(RegExp.$1).split(',');
			for (var s = 0; s < str.length; s++) {
				obj.itemCategory.push(str[s].trim());
			}
		} else if (line.match(/<(?:WEIGHT|重量):\s*(\d+)>/i)) {
            obj.weight = parseFloat(RegExp.$1);
        } else if (line.match(/<(?:WEIGHT|重量):\s*(\d+).(\d+)>/i)) {
            obj.weight = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        } else if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+)>/i)) {
            obj.weightLimit = parseFloat(RegExp.$1);
        } else if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+).(\d+)>/i)) {
            obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        } else if (line.match(/<(?:PICTURE|图片):\s*(.*)>/i)) {
			obj.pictureImg = String(RegExp.$1);
		} 
	}
};

DataManager.setupCOIENotetags2 = function (obj) {
    var notedata = obj.note.split(/[\r\n]+/);
	obj.shopSwitch = [];
	obj.sellPrice = undefined;
	obj.cannotSell = false;
    obj.canSell = false;
	obj.priceVariable = {};
	obj.priceMin = undefined;
	obj.priceMax = undefined;
	obj.shopVar = [];
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
		if (line.match(/<(?:SELL PRICE|出售价格):\s*(\d+)>/i)) {
			obj.sellPrice = parseInt(RegExp.$1);
		} else if (line.match(/<(?:CANNOT SELL|不可出售)>/i)) {
			obj.cannotSell = true;
		} else if (line.match(/<(?:CAN SELL|必能出售)>/i)) {
			obj.canSell = true;
		} else if (line.match(/<(?:SHOP SWITCH)[ ](\d+):\s*(.*)>/i)) {
			var switchId = parseInt(RegExp.$1);
			var SwitchType = String(RegExp.$2).toUpperCase().trim();
			if (SwitchType === 'ON') 
				SwitchType = 1;
			else if (SwitchType === 'OFF') 
				SwitchType = 2;
			else if (SwitchType === 'SWITCH') 
				SwitchType = 3;
			if ([1, 2, 3].contains(SwitchType))
				obj.shopSwitch.push([switchId, SwitchType]);
        } else if (line.match(/<(.*) PRICE VARIABLE:\s*(\d+)>/i)) {
			var varType = String(RegExp.$1).toLowerCase().trim();
			if (varType === 'base') {
				obj.priceVariable.base = parseInt(RegExp.$2);
			} else if (varType === 'percent'){
				obj.priceVariable.percent = obj.priceVariable.percent || [];
				obj.priceVariable.percent.push(parseInt(RegExp.$2));
			} else if (varType === 'increase'){
				obj.priceVariable.increase = obj.priceVariable.increase || [];
				obj.priceVariable.increase.push(parseInt(RegExp.$2));
			} else if (varType === 'exact') {
				obj.priceVariable.exact = parseInt(RegExp.$2);
			}
		} else if (line.match(/<Price MIN:\s*(\d+)>/i)) {
			obj.priceMin = parseInt(RegExp.$1);
		} else if (line.match(/<Price MAX:\s*(\d+)>/i)) {
			obj.priceMax = parseInt(RegExp.$1);
		} else if (line.match(/<(?:SHOP VAR)[ ](\d+):\s*(.*)[ ]([\+\-]\d+)?>/i)) {
			var varId = parseInt(RegExp.$1);
			var varType = String(RegExp.$2).toUpperCase().trim();
			var varPlus = parseInt(RegExp.$3) || 1;
			if (varType === 'BUY') 
				varType = 1;
			else if (varType === 'SELL') 
				varType = 2;
			else if (varType === 'SELLBUY') 
				varType = 3;
			if ([1, 2, 3].contains(varType))
				obj.shopVar.push([varId, varType, varPlus]);
		} 
    }
	if (!obj.shopSwitch.length)
		delete obj.shopSwitch;
	if (!obj.shopVar.length)
		delete obj.shopVar;
};

DataManager.processCOIENotetagsS = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
		
		obj.weightLimit = 0.0;
		obj.pictureImg = '';
	
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+)>/i)) {
				obj.weightLimit = parseFloat(RegExp.$1);
			} else if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+).(\d+)>/i)) {
				obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
			} else if (line.match(/<(?:PICTURE|图片):\s*(.*)>/i)) {
				obj.pictureImg = String(RegExp.$1);
			}
		}
    }
};

DataManager.processCOIENotetagsSta = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
		
		obj.weightLimit = 0.0;
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+)>/i)) {
				obj.weightLimit = parseFloat(RegExp.$1);
			} else if (line.match(/<(?:WEIGHT LIMIT|承重):\s*([\+\-]\d+).(\d+)>/i)) {
				obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
			}
		}
    }
};

DataManager.processCOIENotetagsAct = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
		
		obj.weightLimit = Number(GF.Param.COIEItemWeight['Actor Weight Limit']);
		obj.weightLimitEval = '';
		var evalMode = 'none';
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:WEIGHT LIMIT|承重):\s*(\d+)>/i)) {
				obj.weightLimit = parseFloat(RegExp.$1);
			} else if (line.match(/<(?:WEIGHT LIMIT|承重):\s*(\d+).(\d+)>/i)) {
				obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
			} else if (line.match(/<(?:CUSTOM WEIGHT LIMIT|自定义承重)>/i)) {
				evalMode = 'weight limit eval';
			} else if (line.match(/<\/(?:CUSTOM WEIGHT LIMIT|自定义承重)>/i)) {
				evalMode = 'none';
			} else if (evalMode === 'weight limit eval') {
				obj.weightLimitEval = obj.weightLimitEval + line + '\n';
			}
		}
    }
};

DataManager.processCOIENotetagsC = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
		
		obj.equipSlots = [];
		var equipSlots = false;
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:EQUIP SLOT|装备栏):\s*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.equipSlots = obj.equipSlots.concat(array);
			} else if (line.match(/<(?:EQUIP SLOT|装备栏)>/i)) {
				equipSlots = true;
			} else if (line.match(/<\/(?:EQUIP SLOT|装备栏)>/i)) {
				equipSlots = false;
			} else if (equipSlots) {
				const name = String(line.trim());
				const slotId = $dataSystem.equipTypes.indexOf(name);
				if (slotId >= 0) obj.equipSlots.push(slotId);
			} 
		}
		if (obj.equipSlots.length <= 0) 
			this.setDefaultEquipSlots(obj);
    }
};

DataManager.setDefaultEquipSlots = function (obj) {
    for (var i = 1; i < $dataSystem.equipTypes.length; ++i) {
        var name = $dataSystem.equipTypes[i];
        var slotId = $dataSystem.equipTypes.indexOf(name);
        if (slotId >= 0)
            obj.equipSlots.push(slotId);
    }
};

//=============================================================================
// ItemManager
//=============================================================================

function ItemManager() {
    throw new Error('This is a static class');
};

ItemManager.getItemPictureImageFilename = function (item) {
    if (!item) return '';
    if (item.pictureImg === undefined) {
        if (item.baseItemId) {
            var baseItem = DataManager.getBaseItem(item);
            item.pictureImg = baseItem.pictureImg;
        } else {
            return '';
        }
    }
    return item.pictureImg;
};

ItemManager.getItemPictureImage = function (item) {
    if (!item) return new Bitmap(1, 1);
    var filename = this.getItemPictureImageFilename(item);
    return ImageManager.loadBitmap(GF.Param.COIEItemPictureSrc, filename);
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

Game_Party.prototype.getAllItemWeight = function () {
	this.refreshWeightValues();
	return this.itemWeight();
};

Game_Party.prototype.getItemWeightLimit = function () {
	this.refreshWeightValues();
	return this.itemWeightLimit();
};

GF.COIE.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
    GF.COIE.Game_Party_initialize.call(this);
	this.setupWeightLimit();
};

Game_Party.prototype.setupWeightLimit = function () {
    this._itemWeight = 0.0;
    this._itemWeightLimit = 0.0;
    this._weightLimitBonus = 0.0;
};

Game_Party.prototype.itemWeight = function () {
	var weight = this._itemWeight;
	if (weight) {
		weight = Math.max(weight, 0);
		return weight;
	}
    return 0.0;
};

Game_Party.prototype.itemWeightLimit = function () {
	var limit = this._itemWeightLimit + this._weightLimitBonus;
	if (limit) {
		limit = Math.max(limit, 0);
		return limit;
	}
	return 0.0;
};

Game_Party.prototype.checkOverWeight = function () {
	if (this.isOverWeight()) {
        $gamePlayer.setMoveSpeed(Number(GF.Param.COIEItemWeight['Overweight Speed']));
    } else {
        $gamePlayer.setMoveSpeed(Number(GF.Param.COIEItemWeight['Normal Speed']));
    }
};

Game_Party.prototype.refreshWeightValues = function () {
    this.calculateItemWeightLimit();
    this.calculateItemWeight();
    this.checkOverWeight();
};

Game_Party.prototype.calculateItemWeightLimit = function () {
    var limit = Number(GF.Param.COIEItemWeight['Party Weight Limit']);
    for (var i = 0; i < this.allMembers().length; i++) {
        limit += this.allMembers()[i].calculateWeightLimit();
    }
    for (var i = 0; i < this.items().length; i++) {
        if (this.items()[i].consumable === false) {
            limit += this.items()[i].weightLimit || 0.0;
        }
    }
    this._itemWeightLimit = limit;
};

Game_Party.prototype.calculateItemWeight = function () {
    var weight = 0;
	const goldWight = Number(GF.Param.COIEItemWeight['Gold Per Weight']);
	if (goldWight) {
		weight += this.gold() / goldWight;
	}
    for (var i = 0; i < this.allItems().length; i++) {
        weight += this.calculateTotalItemWeight(this.allItems()[i]);
    }
	for (var i = 0; i < this.allMembers().length; i++) {
		weight += this.allMembers()[i].calculateEquipWeight();
	}
    this._itemWeight = weight;
};

Game_Party.prototype.calculateTotalItemWeight = function (item) {
	if (!item) return;
    var itemWeight = item.weight || 0.0;
	var itemCount = item.baseItemId ? 1 : this.numItems(item);
    return itemWeight * itemCount;
};

Game_Party.prototype.isOverWeight = function () {
    return this.itemWeight() > this.itemWeightLimit();
};

Game_Party.prototype.addWeightLimitBonus = function (amount) {
	this._weightLimitBonus = this._weightLimitBonus || 0.0;
    this._weightLimitBonus += amount;
};

GF.COIE.Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function (item) {    
	GF.COIE.Game_Party_consumeItem.call(this, item);
    if (DataManager.isItem(item) && item.consumable) {
        var amountToAdd = item.weightLimit || 0.0;
        this.addWeightLimitBonus(amountToAdd);
    }	
};

GF.COIE.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    GF.COIE.Game_Party_gainItem.call(this, item, amount, includeEquip);
	if (!eval(GF.Param.COIEItemWeight['Enable Weight'])) return;
	this.refreshWeightValues();
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

GF.COIE.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = GF.COIE.Game_BattlerBase_states.call(this);
    if (this.isActor() && $gameParty.isOverWeight()) {
		this.addOverWeightStates(array);
		this.sortOverweightStates(array);
    }
    return array;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.initEquips = function(equips) {
    equips = this.convertInitEquips(equips);
    this.equipInitEquips(equips);
    this.releaseUnequippableItems(true);
    this.recoverAll();
    this.refresh();
};

Game_Actor.prototype.convertInitEquips = function(equips) {
    const items = [];
    for (var i = 0; i < equips.length; ++i) {
		const equipId = equips[i];
		if (equipId <= 0) continue;
		const equipType = $dataSystem.equipTypes[i + 1];
		if (equipType === $dataSystem.equipTypes[1] || (i === 1 && this.isDualWield())) {
			var equip = $dataWeapons[equipId];
		} else {
			var equip = $dataArmors[equipId];
		}
		items.push(equip);
	}
    return items;
};

Game_Actor.prototype.equipInitEquips = function(equips) {
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; ++i) {
		this._equips[i] = new Game_Item();
    }
    for (var i = 0; i < maxSlots; ++i) {
		var slotType = slots[i];
		var equip = this.grabInitEquips(equips, slotType);
		if (this.canEquip(equip)) this._equips[i].setObject(equip);
    }
};

Game_Actor.prototype.grabInitEquips = function(equips, slotType) {
    var item = null;
    for (var i = 0; i < equips.length; ++i) {
		var equip = equips[i];
		if (!equip) continue;
		if (slotType === 1 && DataManager.isWeapon(equip)) {
			item = equip;
			break;
		} else if (equip.etypeId === slotType) {
			item = equip;
			break;
		}
    }
    if (item) equips[i] = null;
    return item;
};

Game_Actor.prototype.equipSlots = function() {
    var slots = this.currentClass().equipSlots.slice();
    if (slots.length >= 2 && this.isDualWield()) {
		slots[1] = 1;
	}
    return slots;
};

GF.COIE.Game_Actor_equips = Game_Actor.prototype.equips;
Game_Actor.prototype.equips = function () {
    for (var i = 0; i < this.currentClass().equipSlots.length; ++i) {
        if (this._equips[i] === undefined || this._equips[i] === null) {
            this._equips[i] = new Game_Item();
        }
    }
    return GF.COIE.Game_Actor_equips.call(this);
};

GF.COIE.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function (slotId, item) {
    if (!this._equips[slotId]) {
        this._equips[slotId] = new Game_Item();
	}
    GF.COIE.Game_Actor_changeEquip.call(this, slotId, item);
};

GF.COIE.Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function (slotId, item) {
    if (!this._equips[slotId]) {
        this._equips[slotId] = new Game_Item();
        this._equips[slotId].setEquip(this.equipSlots()[slotId] === 1, 0);
    }
    GF.COIE.Game_Actor_forceChangeEquip.call(this, slotId, item);
};

Game_Actor.prototype.calculateEquipWeight = function () {
    var weight = 0;
	for (var i = 0; i < this.equips().length; i++) {
		if (this.equips()[i] && this.equips()[i].weight)
			weight += this.equips()[i].weight;
	}
    return weight;
};

Game_Actor.prototype.calculateWeightLimit = function () {
	var limit = this.actor().weightLimit || 0.0;
	var limitEval = this.actor().weightLimitEval || '';
	var actor = this;
    if (limitEval !== '') {
        try {
			eval(limitEval);
		} catch (e) {
			GF.Util.displayError(e, code, 'Weight Limit EVAL ERROR');
		}
	}
	for (var i = 0; i < this.equips().length; i++) {
        if (this.equips()[i] && this.equips()[i].weightLimit) 
            limit += this.equips()[i].weightLimit;
    }
	for (var i = 0; i < this.states().length; i++) {
        if (this.states()[i] && this.states()[i].weightLimit) 
            limit += this.states()[i].weightLimit;
    }
	for (var i = 0; i < this.skills().length; i++) {
        if (this.skills()[i] && this.skills()[i].weightLimit) 
            limit += this.skills()[i].weightLimit;
    }
    return limit;
};

Game_Actor.prototype.addOverWeightStates = function(array) {
	var stateId = Number(GF.Param.COIEItemWeight['Overweight State']);
	if (stateId) {
		var state = $dataStates[stateId];
		array.push(state);
	}
};
	
Game_Actor.prototype.sortOverweightStates = function(array) {
    array.sort((a, b) => {
		var p1 = a.priority;
		var p2 = b.priority;
		if (p1 !== p2) return p2 - p1;
		return a - b;
    });
};	

GF.COIE.Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected;
Game_Actor.prototype.isStateAffected = function(stateId) {
    if (stateId == Number(GF.Param.COIEItemWeight['Overweight State'])) return true;
    return GF.COIE.Game_Actor_isStateAffected.call(this, stateId);
};

Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
	if (newItem && !$gameParty.hasItem(newItem)) {
		return false;
	} else {
		GF.COIE.Game_Party_gainItem.call($gameParty, oldItem, 1);
		GF.COIE.Game_Party_gainItem.call($gameParty, newItem, -1);
		return true;
	}
};

//=============================================================================
// Game_System
//=============================================================================

GF.COIE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
    GF.COIE.Game_System_initialize.call(this);
	if (!eval(GF.Param.COIEItemWeight['Enable Weight'])) return;
    if ($gameParty) $gameParty.refreshWeightValues();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Change Equipment
Game_Interpreter.prototype.command319 = function(params) {
    const actor = $gameActors.actor(params[0]);
    if (actor) {
		const index = actor.equipSlots().indexOf(params[1]) + 1;
        actor.changeEquipById(index, params[2]);
    }
    return true;
};

//=============================================================================
// Game_Map
//=============================================================================

GF.COIE.Game_Map_isDashDisabled = Game_Map.prototype.isDashDisabled;
Game_Map.prototype.isDashDisabled = function () {
    if (eval(GF.Param.COIEItemWeight['Disable Dash']) && $gameParty.isOverWeight()) {
        return true;
    }
    return GF.COIE.Game_Map_isDashDisabled.call(this);
};

//=============================================================================
// Window_ItemList
//=============================================================================

GF.COIE.Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function (rect) {
    GF.COIE.Window_ItemList_initialize.call(this, rect);
    this._ext = 'none';
};

Window_ItemList.prototype.setExt = function (ext) {
    if (this._ext === ext) return;
	this._ext = ext;
	this.refresh();
	this.scrollTo(0, 0);
};

Window_ItemList.prototype.includes = function (item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
        break;
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
        break;
    case 'weapon':
        return DataManager.isWeapon(item);
        break;
    case 'wType':
        return DataManager.isWeapon(item) && item.wtypeId === this._ext;
        break;
    case 'armor':
        return DataManager.isArmor(item);
        break;
    case 'aType':
        return DataManager.isArmor(item) && item.atypeId === this._ext;
        break;
    case 'eType':
        return item && item.etypeId === this._ext;
        break;
    default:
		const set = GF.Param.COIEItemMenuSet;
		var catIndex = set.SpecialCategoryName.indexOf(this._category);
		if (catIndex > -1) {
			return eval(set.SpecialCategoryCondition[catIndex]);
		} else {
			return item && item.itemCategory.contains(this._category);
		}
    }
};

Window_ItemList.prototype.numberWidth = function() {
	const fmt = String(GF.Param.COIEItemQt['ItemQuantityFmt']);
	const text = fmt.format('00');
	this.contents.fontSize = Number(GF.Param.COIEItemQt['ItemQuantityFontSize']);
	const width = this.textWidth(text);
	this.resetFontSettings();
    return width;
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
	const numItems = $gameParty.numItems(item);
	const fmt = String(GF.Param.COIEItemQt['ItemQuantityFmt']);
	const text = fmt.format(numItems);
	this.contents.fontSize = Number(GF.Param.COIEItemQt['ItemQuantityFontSize']);
    this.drawText(text, x, y, width, 'right');
	this.resetFontSettings();
};

//=============================================================================
// Window_ItemListPlus
//=============================================================================

class Window_ItemListPlus extends Window_ItemList {
	initialize(set) {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = set;
		super.initialize(rect);
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
		const item = this.itemAt(index);
		if (!item) return;
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			super.drawItem(index);
		} else {
			this.changePaintOpacity(this.isEnabled(item));
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect);
			} else {
				this.drawItemIcon(item, rect);
				this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
				this.drawItemNumber(item, rect.x, rect.y, rect.width - 4);
			}
			this.changePaintOpacity(1);
			
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
	}
	
	prepareDrawItemImage(item, rect) {
		const bitmap = ItemManager.getItemPictureImage(item);
		bitmap.addLoadListener(this.drawItemPicture.bind(this, bitmap, item, rect));
	}
	
	drawItemPicture(bitmap, item, rect) {
		this.changePaintOpacity(this.isEnabled(item));
		super.drawItemPicture(bitmap, item, rect);
		this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
		this.drawItemNumber(item, rect.x, rect.y, rect.width - 4);
		this.changePaintOpacity(1);
	}
}

//=============================================================================
// Window_ItemWeight
//=============================================================================

class Window_ItemWeight extends Window_Selectable {
	refresh() {
		const rect = this.itemLineRect(0);
		const x = rect.x;
		const y = rect.y;
		const width = rect.width;
		this.contents.clear();
		$gameParty.refreshWeightValues();
		this.drawItemWeightValue(x, y, width);
	}
	
	drawItemWeightValue(x, y, width) {
		const numFmt = GF.Param.COIEItemWeight['Weight Number Fmt'];
		const textFmt = GF.Param.COIEItemWeight['Weight Text Fmt']
		var current = numFmt.format(($gameParty.itemWeight()).toFixed(2));
		var limit = numFmt.format(($gameParty.itemWeightLimit()).toFixed(2));
		var weightText = textFmt.format(current, limit);
		if ($gameParty.isOverWeight()) {
			const color = Number(GF.Param.COIEItemWeight['Overweight Text Color']);
			this.changeTextColor(ColorManager.textColor(color));
		}
		this.drawText(weightText, x, y, width, 'center');
		this.resetTextColor();
	}
}

//=============================================================================
// Window_EquipSlotPlus
//=============================================================================

class Window_EquipSlotPlus extends Window_EquipSlot {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEEquipMenuSet['SlotWindowSet'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet.WindowSet);
		this.activate();
		this.createFace();
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
	
	slotNameWidth() {
		return this._nameWidth || super.slotNameWidth();
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
	
	_createClientArea() {
		this._FaceArea = new Sprite();
		this.addChild(this._FaceArea);
		this._FaceArea.opacity = 0;
		super._createClientArea();
	}
	
	createFace() {
		const style_data = this._windowSet.FaceSet;
		if (!style_data.face_show) return;
		const actorId = this._actor ? this._actor.actorId() : undefined;
		this._face = new Sprite_MenuActorFace(style_data, actorId);
		const x = Math.floor(style_data.face_x);
		const y = Math.floor(style_data.face_y);
		this._face.move(x, y);
		this._FaceArea.opacity = this.contentsOpacity;
		this._FaceArea.addChild(this._face);
	}
	
	setActor(actor) {
		this.setSlotNameWidth(actor);
		super.setActor(actor);
	}
	
	setSlotNameWidth(actor) {
		if (!actor) return;
		this._nameWidth = 0;
		for (var i = 0; i < actor.equipSlots().length; ++i) {
			var text = $dataSystem.equipTypes[actor.equipSlots()[i]] + ' ';
			this._nameWidth = Math.max(this._nameWidth, this.textWidth(text));
		}
		this._nameWidth += ImageManager.iconWidth;
	}
	
	refresh() {
		super.refresh();
		if (this._actor) {
			this.refreshFace();
		}
	}
	
	refreshFace() {
		if (this._face) {
			this._face.setActorId(this._actor.actorId());
		} 
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
		if (!this._actor) return;
		const item = this.itemAt(index);
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			super.drawItem(index);
		} else {
			this.changePaintOpacity(this.isEnabled(index));
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect, index);
			} else {
				this.drawItemIcon(item, rect);
			}
			if (item) {
				this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
			} else {
				this.drawEquipSlotName(index);
			}
			this.changePaintOpacity(true);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
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
		const slotName = this.actorSlotName(this._actor, index);
		const rect = this.itemRect(index);
		const lineHeight = this.lineHeight();
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(slotName, rect.x, rect.y + rect.height - lineHeight, rect.width, 'center');
		this.resetFontSettings();
	}
	
	update() {
		super.update();
		if (this._FaceArea.opacity !== this.contentsOpacity) {
			this._FaceArea.opacity = this.contentsOpacity;
		}
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
}

//=============================================================================
// Window_EquipItemPlus
//=============================================================================

class Window_EquipItemPlus extends Window_EquipItem {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEEquipMenuSet['EquipItemWindowSet'];
		this._nonRemove = this._windowSet['Non-RemovableTypes'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet.WindowSet);
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
	
	includes(item) {
		if (item === null && this._actor && this._data.length > 0) {
			const typeId = this._actor.equipSlots()[this._slotId];
			if (this._nonRemove.contains(typeId)) return false;
		}
		return super.includes(item);
	}
	
	isEnabled(item) {
		if (item === null && this._actor) {
			const typeId = this._actor.equipSlots()[this._slotId];
			if (this._nonRemove.contains(typeId)) return false;
		}
		return super.isEnabled(item);
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
		const item = this.itemAt(index);
		const rect = this.itemRect(index);
		if (item === null) {
			this.drawRemoveEquip(index);
		} else if (this._windowSet.WindowMode === '图标+物品名') {
			super.drawItem(index);
		} else {
			this.changePaintOpacity(this.isEnabled(item));
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect);
			} else {
				this.drawItemIcon(item, rect);
			}
			this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
			this.drawItemNumber(item, rect.x, rect.y, rect.width - 4);
			this.changePaintOpacity(1);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
	}
	
	drawRemoveEquip(index) {
		if (!this.isEnabled(null)) return;
		const text = this._windowSet.RemoveText;
		const icon = this._windowSet.RemoveIcon;
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			rect.width -= this.itemPadding();
			this.changePaintOpacity(true);
			const ibw = ImageManager.iconWidth + 4;
			const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2 + 2;
			this.resetTextColor();
			this.drawIcon(icon, rect.x + this.itemPadding(), iconY);
			this.drawText(text, rect.x + this.itemPadding() + ibw, rect.y, rect.width - ibw);
		} else {
			const color = ColorManager.gaugeBackColor();
			this.contents.paintOpacity = 64;
			this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
			this.changePaintOpacity(true);
			this.drawWholeIcon(icon, rect);
			if (!this._windowSet.WindowCellDrawName) return;
			this.contents.fontSize = this._windowSet.WindowSmallNameSize;
			this.drawText(text, rect.x, rect.y + rect.height - this.lineHeight(), rect.width, 'center');
			this.resetFontSettings();
		}
	}
	
	prepareDrawItemImage(item, rect) {
		const bitmap = ItemManager.getItemPictureImage(item);
		bitmap.addLoadListener(this.drawItemPicture.bind(this, bitmap, item, rect));
	}
	
	drawItemPicture(bitmap, item, rect) {
		this.changePaintOpacity(this.isEnabled(item));
		super.drawItemPicture(bitmap, item, rect);
		this.changePaintOpacity(1);
	}
}

//=============================================================================
// Window_EquipStatusPlus
//=============================================================================

class Window_EquipStatusPlus extends Window_EquipStatus {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEEquipMenuSet['StatusWindowSet'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet.WindowSet);
		this.calculNameWidth();
		this.createFace();
	}
	
	calculNameWidth() {
		this._paramNameWidth = 0;
		const paramIndex = GF.COIE.ParamIndex;
		const xparamIndex = GF.COIE.XParamIndex;
		const sparamIndex = GF.COIE.SParamIndex;
		for (var i = 0; i < paramIndex.length; ++i) {
			var value = this.textWidth(TextManager.param(paramIndex[i]));
			this._paramNameWidth = Math.max(value, this._paramNameWidth);
		}
		for (var i = 0; i < xparamIndex.length; ++i) {
			var value = this.textWidth(TextManager.xparam(xparamIndex[i]));
			this._paramNameWidth = Math.max(value, this._paramNameWidth);
		}
		for (var i = 0; i < sparamIndex.length; ++i) {
			var value = this.textWidth(TextManager.sparam(sparamIndex[i]));
			this._paramNameWidth = Math.max(value, this._paramNameWidth);
		}
		this._paramNameWidth += this.itemPadding();
	}
	
	_createClientArea() {
		this._FaceArea = new Sprite();
		this.addChild(this._FaceArea);
		this._FaceArea.opacity = 0;
		super._createClientArea();
	}
	
	createFace() {
		const style_data = this._windowSet.FaceSet;
		if (!style_data.face_show) return;
		const actorId = this._actor ? this._actor.actorId() : undefined;
		this._face = new Sprite_MenuActorFace(style_data, actorId);
		const x = Math.floor(style_data.face_x);
		const y = Math.floor(style_data.face_y);
		this._face.move(x, y);
		this._FaceArea.opacity = this.contentsOpacity;
		this._FaceArea.addChild(this._face);
	}
	
	refresh() {
		this.contents.clear();
		this.contentsBack.clear();
		if (this._actor) {
			const nameRect = this.itemLineRect(0);
			this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
			this.drawActorClass(this._actor, nameRect.x, nameRect.height, nameRect.width);
			this.drawActorLevel(this._actor);
			this.drawAllParams();
			this.refreshFace();
		}
	}
	
	drawActorLevel(actor) {
		this.changeTextColor(ColorManager.systemColor());
		const tWidth = this.textWidth(TextManager.levelA);
		const x = this.innerWidth - tWidth - 36;
		this.drawText(TextManager.levelA, x, 0, tWidth);
		this.resetTextColor();
		this.drawText(actor.level, x + tWidth, 0, 36, "right");
	}
	
	refreshFace() {
		this._FaceArea.opacity = this.contentsOpacity;
		if (this._face) {
			this._face.setActorId(this._actor.actorId());
		}
	}
	
	drawAllParams() {
		const paramIndex = GF.COIE.ParamIndex;
		const xparamIndex = GF.COIE.XParamIndex;
		const sparamIndex = GF.COIE.SParamIndex;
		const totalLength = paramIndex.length + xparamIndex.length + sparamIndex.length;
		let y = this.innerHeight - Math.floor(this.lineHeight() * totalLength);
		const x = this.itemPadding();
		for (let i = 0; i < paramIndex.length; i++) {
			const index = paramIndex[i];
			this.drawItem(x, y, index, 'param');
			y += this.lineHeight();
		}
		for (let i = 0; i < xparamIndex.length; i++) {
			const index = xparamIndex[i];
			this.drawItem(x, y, index, 'xparam');
			y += this.lineHeight();
		}
		for (let i = 0; i < sparamIndex.length; i++) {
			const index = sparamIndex[i];
			this.drawItem(x, y, index, 'sparam');
			y += this.lineHeight();
		}
	}
	
	drawItem(x, y, paramId, paramtype) {
		if (this._windowSet.WindowParamBg) {
			this.drawDarkRect(x - this.itemPadding(), y, this.innerWidth, this.lineHeight());
		}
		const paramX = this.paramX();
		const paramWidth = this.paramWidth();
		const rightArrowWidth = this.rightArrowWidth();
		this.drawParamName(x, y, paramId, paramtype);
		if (this._actor) {
			this.drawCurrentParam(paramX, y, paramId, paramtype);
		}
		if (this._tempActor) {
			this.drawRightArrow(paramX + paramWidth, y);
			this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId, paramtype);
		}
	}
	
	drawDarkRect(dx, dy, dw, dh) {
		var color = ColorManager.gaugeBackColor();
		this.changePaintOpacity(0);
		this.contentsBack.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
		this.changePaintOpacity(1);
	}
	
	drawParamName(x, y, paramId, paramType) {
		const width = this.paramX() - this.itemPadding() * 2;
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager[paramType](paramId), x, y, width);
	}
	
	drawCurrentParam(x, y, paramId, paramType) {
		const paramWidth = this.paramWidth();
		this.resetTextColor();
		let text = this._actor[paramType](paramId);
		if (paramType !== 'param') {
			text *= 100;
			text = text.toFixed(1);
			text += '%';
		}
		this.drawText(text, x, y, paramWidth, "right");
	}
	
	drawNewParam(x, y, paramId, paramType) {
		const paramWidth = this.paramWidth();
		let newValue = this._tempActor[paramType](paramId);
		const diffvalue = newValue - this._actor[paramType](paramId);
		this.resetTextColor();
		if (paramType !== 'sparam') {
			this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
		}
		if (paramType !== 'param') {
			newValue *= 100;
			newValue = newValue.toFixed(1);
			newValue += '%';
		}
		this.drawText(newValue, x, y, paramWidth, "right");
		if (diffvalue === 0) return;
		let diffText = diffvalue;
		if (paramType !== 'param') {
			diffText *= 100;
			diffText = diffText.toFixed(1);
			diffText += '%';
		}
		if (diffvalue > 0) {
			diffText = ' (+' + diffText + ')';
		} else {
			diffText = ' (' + diffText + ')';
		}
		this.drawText(diffText, x + paramWidth, y, paramWidth, 'left');
	}
	
	paramNameWidth() {
		return this._paramNameWidth || 0;
	}
	
	paramWidth() {
		const itemPadding = this.itemPadding();
		const rightArrowWidth = this.rightArrowWidth();
		const paramNameWidth = this.paramNameWidth();
		return (this.innerWidth - itemPadding * 2 - paramNameWidth - rightArrowWidth)/3;
	}
	
	rightArrowWidth() {
		return this.textWidth('\u2192' + ' ');
	}
	
	paramX() {
		const itemPadding = this.itemPadding();
		const paramNameWidth = this.paramNameWidth();
		return itemPadding + paramNameWidth;
	}
	
	update() {
		super.update();
		if (this._FaceArea.opacity !== this.contentsOpacity) {
			this._FaceArea.opacity = this.contentsOpacity;
		}
	}
}

//=============================================================================
// Window_ShopBuyPlus
//=============================================================================

class Window_ShopBuyPlus extends Window_ShopBuy {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEShopMenuSet['BuyWindowSet'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet.WindowSet);
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
		if (this._windowSet.WindowMode === '图标+物品名') {
			return super.itemRect(index);
		}
		const maxCols = this.maxCols();
		const itemWidth = this.itemWidth();
		const itemHeight = this.itemHeight();
		const priceHeight = this.smallPriceHeight();
		const colSpacing = this.colSpacing();
		const rowSpacing = this.rowSpacing();
		const col = index % maxCols;
		const row = Math.floor(index / maxCols);
		const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
		const y = row * (itemHeight + priceHeight) + rowSpacing / 2 - this.scrollBaseY();
		const width = itemWidth - colSpacing;
		const height = itemHeight - rowSpacing;
		return new Rectangle(x, y, width, height);
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
	
	drawItemSmallPrice(item, x, y, width) {
		if (!item) return;
		const price = this.price(item);
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		const priceWidth = this.textWidth(price);
		const icon = Number(GF.Param.COGGoldSettings['GoldIcon']);
		let size = this.contents.fontSize;
		if (icon === 0) size = 0;
		const priceX = x + (width - priceWidth - size)/2;
		this.drawText(price, priceX, y, width, 'left');
		if (icon !== 0) {
			const rect = new Rectangle(priceX + priceWidth + 2, y + size, size, size);
			this.drawWholeIcon(icon, rect);
		} 
		this.resetFontSettings();
	}
	
	smallPriceHeight() {
		return this._windowSet.WindowSmallNameSize + 2;
	}
	
	drawItem(index) {
		const item = this.itemAt(index);
		if (!item) return;
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			const rect = this.itemLineRect(index);
			const priceWidth = this.priceWidth();
			const priceX = rect.x + rect.width - priceWidth;
			const nameWidth = rect.width - priceWidth;
			this.changePaintOpacity(this.isEnabled(item));
			this.drawItemName(item, rect.x, rect.y, nameWidth);
			this.drawAllCurrency(item, priceX, rect.y, priceWidth);
			this.changePaintOpacity(true);
		} else {
			this.changePaintOpacity(this.isEnabled(item));
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect);
			} else {
				this.drawItemIcon(item, rect);
				this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
				this.drawItemSmallPrice(item, rect.x, rect.y + rect.height - this.smallPriceHeight() + 4, rect.width);
			}
			this.changePaintOpacity(true);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
	}
	
	drawAllCurrency(item, x, y, width) {
		const price = this.price(item);
		const unit = this.currencyUnit();
		this.drawCurrencyValue(price, unit, x, y, width);
	}
	
	currencyUnit() {
		return TextManager.currencyUnit;
	}
	
	prepareDrawItemImage(item, rect) {
		const bitmap = ItemManager.getItemPictureImage(item);
		bitmap.addLoadListener(this.drawItemPicture.bind(this, bitmap, item, rect));
	}
	
	drawItemPicture(bitmap, item, rect) {
		this.changePaintOpacity(this.isEnabled(item));
		super.drawItemPicture(bitmap, item, rect);
		this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
		this.drawItemSmallPrice(item, rect.x, rect.y + rect.height - this.smallPriceHeight() + 4, rect.width);
		this.changePaintOpacity(1);
	}
	
	setWaitress(waitress) {
		this._waitress = waitress;
	}
	
	processOk() {
		super.processOk();
		if (this._waitress && !this.isCurrentItemEnabled()) {
			this._waitress.drill_COWS_playAct("act-goldNotEnough");
		}
	}
}

//=============================================================================
// Window_ShopSellPlus
//=============================================================================

class Window_ShopSellPlus extends Window_ItemListPlus {
	isEnabled(item) {
		if (!item) return false;
		if ($gamePlayer.isDebugThrough()) return true;
		if (item.cannotSell) return false;
		if (item.canSell) return true;
		if (item.sellPrice !== undefined) {
			return item.sellPrice > 0;
		}
		return item.price > 0;
	}
	
	itemRect(index) {
		if (this._windowSet.WindowMode === '图标+物品名') {
			return super.itemRect(index);
		}
		const maxCols = this.maxCols();
		const itemWidth = this.itemWidth();
		const itemHeight = this.itemHeight();
		const priceHeight = this.smallPriceHeight();
		const colSpacing = this.colSpacing();
		const rowSpacing = this.rowSpacing();
		const col = index % maxCols;
		const row = Math.floor(index / maxCols);
		const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
		const y = row * (itemHeight + priceHeight) + rowSpacing / 2 - this.scrollBaseY();
		const width = itemWidth - colSpacing;
		const height = itemHeight - rowSpacing;
		return new Rectangle(x, y, width, height);
	}
	
	smallPriceHeight() {
		return this._windowSet.WindowSmallNameSize + 2;
	}
	
	drawItemSmallPrice(item, x, y, width) {
		if (!item) return;
		const price = item.sellPrice || item.price/2;
		this.contents.fontSize = this._windowSet.WindowSmallNameSize;
		const priceWidth = this.textWidth(price);
		const icon = Number(GF.Param.COGGoldSettings['GoldIcon']);
		let size = this.contents.fontSize;
		if (icon === 0) size = 0;
		const priceX = x + (width - priceWidth - size)/2;
		this.drawText(price, priceX, y, width, 'left');
		if (icon !== 0) {
			const rect = new Rectangle(priceX + priceWidth + 2, y + size, size, size);
			this.drawWholeIcon(icon, rect);
		} 
		this.resetFontSettings();
	}
	
	drawItem(index) {
		const item = this.itemAt(index);
		if (!item) return;
		const rect = this.itemRect(index);
		if (this._windowSet.WindowMode === '图标+物品名') {
			super.drawItem(index);
		} else {
			this.changePaintOpacity(this.isEnabled(item));
			if (this.itemHasPictureImage(item)) {
				this.prepareDrawItemImage(item, rect);
			} else {
				this.drawItemIcon(item, rect);
				this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
				this.drawItemNumber(item, rect.x, rect.y, rect.width - 4);
				this.drawItemSmallPrice(item, rect.x, rect.y + rect.height - this.smallPriceHeight() + 4, rect.width);
			}
			this.changePaintOpacity(true);
		}
		if (!this._windowSet.WindowCellBg) return;
		this.drawItemCellGrid(item, rect);
	}
	
	drawItemPicture(bitmap, item, rect) {
		this.changePaintOpacity(this.isEnabled(item));
		super.drawItemPicture(bitmap, item, rect);
		this.drawSmallItemName(item, rect.x, rect.y + rect.height - this.lineHeight(), rect.width);
		this.drawItemNumber(item, rect.x, rect.y, rect.width - 4);
		this.drawItemSmallPrice(item, rect.x, rect.y + rect.height - this.smallPriceHeight() + 4, rect.width);
		this.changePaintOpacity(1);
	}
	
	setStatusWindow(statusWindow) {
		this._statusWindow = statusWindow;
		this.callUpdateHelp();
	}
	
	updateHelp() {
		this.setHelpWindowItem(this.item());
		if (this._statusWindow) {
			this._statusWindow.setItem(this.item());
		}
	}
}

//=============================================================================
// Window_ShopNumberPlus
//=============================================================================

class Window_ShopNumberPlus extends Window_ShopNumber {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEShopMenuSet['NumberWindowSet'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet);
	}
}

//=============================================================================
// Window_ShopStatusPlus
//=============================================================================

class Window_ShopStatusPlus extends Window_ShopStatus {
	initialize() {
		const rect = new Rectangle(0, 0, 100, 100);
		this._windowSet = GF.Param.COIEShopMenuSet['ShopStatusWindowSet'];
		super.initialize(rect);
		this.processWindowInitParam(this._windowSet);
	}
	
	refresh() {
		this.contentsBack.clear();
		super.refresh();
	}
	
	drawEquipInfo() {
		const lineHeight = this.lineHeight();
		const paramheight = this.gaugeLineHeight() + 8;
		const x = 0;
		const width = this.innerWidth;
		const params = [0, 1, 2, 3, 4, 5, 6, 7];
		let y = this.innerHeight - (params.length * paramheight) - 4;
		let paramWidth = 0;
		let tableY = y;
		const dy = (lineHeight - paramheight) / 2;
		for (const paramId of params) {
			paramWidth = Math.max(this.drawParamName(x + 2, y - dy, paramId), paramWidth);
			y += paramheight;
		}
		const actorMax = $gameParty.maxBattleMembers();
		const actorWidth = Math.floor((width - paramWidth) / actorMax);
		paramWidth = width - (actorWidth * actorMax);
		for (const actor of this.statusMembers()) {
			const index = this.statusMembers().indexOf(actor);
			const actorX = x + paramWidth + (index * actorWidth);
			this.changePaintOpacity(actor.canEquip(this._item));
			this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);
			let actorY = tableY;
			for (const paramId of params) {
				this.drawActorParamDifference(actor, actorX, actorY - dy, paramId, actorWidth);
				actorY += paramheight;
			}
			this.changePaintOpacity(true);
		}
		const backY = lineHeight * 2;
		this.drawDarkRect(x, backY, paramWidth, tableY - backY);
		for (let i = 0; i < actorMax; i++) {
			const actorX = x + paramWidth + (i * actorWidth);
			this.drawDarkRect(actorX, backY, actorWidth, tableY - backY);
		}
		for (const paramId of params) {
			this.drawDarkRect(x, tableY, paramWidth, paramheight);
			for (let i = 0; i < actorMax; i++) {
				const actorX = x + paramWidth + (i * actorWidth);
				this.drawDarkRect(actorX, tableY, actorWidth, paramheight);
			}
			tableY += paramheight;
		}
	}
	
	drawParamName(x, y, paramId) {
		const text = TextManager.param(paramId);
		const width = this.textWidth(text);
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(text, x, y, width);
		return width;
	}
	
	drawActorParamDifference(actor, x, y, paramId, paramWidth) {
		const item1 = this.currentEquippedItem(actor, this._item.etypeId);
		const diffvalue = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
		this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
		if (!actor.canEquip(this._item)) return;
		if (diffvalue === 0) {
			this.drawText('-', x, y, paramWidth, 'center');
		} else {
			this.drawText((diffvalue > 0 ? "+" : "") + diffvalue, x, y, paramWidth, 'center');
		}
	}
	
	drawDarkRect(dx, dy, dw, dh) {
		const color = ColorManager.gaugeBackColor();
		this.changePaintOpacity(0);
		this.contentsBack.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
		this.changePaintOpacity(1);
	}
}

//=============================================================================
// Sprite_ItemCategory
//=============================================================================

class Sprite_ItemCategory extends Sprite_CommandWindow {
	initialize(categoryBtnSet, categoryBtnList) {
		const data = JsonEx.makeDeepCopy(GF.COSU.SpriteButtonSetList[categoryBtnSet.ButtonSetStyle] || {});
		data.x = categoryBtnSet.ButtonSetX;
		data.y = categoryBtnSet.ButtonSetY;
		data.btn_src_default = categoryBtnSet.ButtonSetBitmap;
		data.btn_paramList = categoryBtnList;
		super.initialize(data);
		this._index = 0;
	}
	
	extractBtnParamList(list) {
		const paramList = [];
		for(var i = 0; i < list.length; i++){
			const btn = list[i];
			const show = new Function(btn.ShowButton).call(this);
			if (!show) continue;
			const category = btn.Symbol;
			let symbol = '';
			let name = '';
			let ext = null;
			if (['item', 'weapon', 'armor', 'keyItem'].contains(category)) {
				symbol = category;
				name = TextManager[category];
			} else if (category.match(/wType:(\d+)/i)) {
				let id = parseInt(RegExp.$1);
				symbol = 'wType';
				name = $dataSystem.weaponTypes[id];
				ext = id;
			} else if (category.match(/aType:(\d+)/i)) {
				let id = parseInt(RegExp.$1);
				symbol = 'aType';
				name = $dataSystem.armorTypes[id];
				ext = id;
			} else if (category.match(/eType:(\d+)/i)) {
				let id = parseInt(RegExp.$1);
				symbol = 'eType';
				name = $dataSystem.equipTypes[id];
				ext = id;
			} else {
				symbol = category;
				name = category;
			}
			const param = {
				symbol: symbol,
				bitmap: btn.Bitmap || '',
				name: name,
				enable: true,
				ext: ext
			}
			paramList.push(param);
		}
		return paramList;
	}
	
	createNameSprite() {
	}
	
	refreshNameSprite() {
	}
	
	processWheel() {
	}
	
	processCursorMove() {
	}
	
	processHandling() {
	}
}

//=============================================================================
// Sprite_ItemPartyCommand
//=============================================================================

class Sprite_ItemPartyCommand extends Sprite_PartyCommand {
	initialize() {
		const actorCmdSet = GF.Param.COIEItemMenuSet['ActorCmdSet'];
		const actorBtnSet = actorCmdSet.ActorButtonSet;
		const styleId = actorCmdSet.ActorCmdStyle;
		const data = JsonEx.makeDeepCopy(GF.COSU.SpriteButtonSetList[actorBtnSet] || {});
		data.x = actorCmdSet.ActorCmdX;
		data.y = actorCmdSet.ActorCmdY;
		data.maxPageItems = actorCmdSet.ActorCmdNum;
		super.initialize(data, styleId);
	}
	
	addCommand(inputData) {
		const data = this.getCommandData(inputData);
		const commandButton = new Sprite_ItemPartyMember(data);
		this._commands.push(commandButton);
		this.addChild(commandButton);
	}
	
	previousPage() {
		super.previousPage();
		if (this.isActive()) {
			this.select(this.currentPage() * this.maxPageRows());
		}
	}
	
	nextPage() {
		super.nextPage();
		if (this.isActive()) {
			this.select(this.currentPage() * this.maxPageRows());
		}
	}
	
	selectForItem(item) {
		var actorId = this.currentSymbol() === null ? 0 : this.currentSymbol();
		var actor = $gameActors.actor(actorId);
		var action = new Game_Action(actor);
		action.setItemObject(item);
		this.selectLast();
	}
	
	selectLast() {
		this.select($gameParty.targetActor().index() || 0, true);
	}
}

//=============================================================================
// Sprite_ItemPartyMember
//=============================================================================

class Sprite_ItemPartyMember extends Sprite_PartyMember {
	processOk() {
		if (this.isOnTouched()) return;
		this._pressCount = 8;
		if (!this._act)
			this.scale = new Point(0.95, 0.95);
		$gameParty.setTargetActor($gameParty.members()[this.index()]);
		this.parent.updateInputData();
		this.parent.callOkHandler();
	}
}

//=============================================================================
// Sprite_ItemWeightNumber
//=============================================================================

class Sprite_ItemWeightNumber extends Sprite_SeniorGaugeNumber {
	initialize(weightWindowSet) {
		const data = GF.COSG.GaugeNumberSetList[weightWindowSet.WeightNumberId];
		data.x = weightWindowSet.WindowSet.x;
		data.y = weightWindowSet.WindowSet.y;
		super.initialize(data);
		const windowMoving = weightWindowSet.WindowMoving;
		this.processSingleButtonMove(windowMoving);
		this.refresh();
	}
	
	refresh() {
		this.drill_COSG_reflashValue(Math.floor($gameParty.itemWeight()));
		this._drill_data['specified_conditionNum'] = Math.floor($gameParty.itemWeightLimit());
	}
}

//=============================================================================
// Sprite_EquipPartyCommand
//=============================================================================

class Sprite_EquipPartyCommand extends Sprite_PartyCommand {
	initialize() {
		const actorCmdSet = GF.Param.COIEEquipMenuSet['ActorCmdSet'];
		const actorBtnSet = actorCmdSet.ActorButtonSet;
		const styleId = actorCmdSet.ActorCmdStyle;
		const data = JsonEx.makeDeepCopy(GF.COSU.SpriteButtonSetList[actorBtnSet] || {});
		data.x = actorCmdSet.ActorCmdX;
		data.y = actorCmdSet.ActorCmdY;
		data.maxPageItems = actorCmdSet.ActorCmdNum;
		super.initialize(data, styleId);
	}
}

//=============================================================================
// Sprite_ShopCommand
//=============================================================================

class Sprite_ShopCommand extends Sprite_CommandWindow {
	initialize() {
		const categoryBtnSet = GF.Param.COIEShopMenuSet['ShopCmdBtnSet'];
		const data = JsonEx.makeDeepCopy(GF.COSU.SpriteButtonSetList[categoryBtnSet.ButtonSetStyle] || {});
		data.x = categoryBtnSet.ButtonSetX;
		data.y = categoryBtnSet.ButtonSetY;
		data.active_out = categoryBtnSet.ButtonActiveOut;
		data.active_out_time = categoryBtnSet.ButtonActiveOutTime;
		data.active_out_x = categoryBtnSet.ButtonActiveOutX;
		data.active_out_y = categoryBtnSet.ButtonActiveOutY;
		super.initialize(data);
	}
	
	setPurchaseOnly(purchaseOnly) {
		this._commands[1].setEnabled(!purchaseOnly);
	}
	
	extractBtnParamList(list) {
		const categoryBtnSet = GF.Param.COIEShopMenuSet['ShopCmdBtnSet'];
		const param_buy = {
			symbol: 'buy',
			bitmap: categoryBtnSet.ButtonBitmapBuy,
			name: TextManager.buy,
			enable: true
		}
		const param_sell = {
			symbol: 'sell',
			bitmap: categoryBtnSet.ButtonBitmapSell,
			name: TextManager.sell,
			enable: true
		}
		const param_cancel = {
			symbol: 'cancel',
			bitmap: categoryBtnSet.ButtonBitmapBack,
			name: TextManager.cancel,
			enable: true
		}
		return [param_buy, param_sell, param_cancel];
	}
	
	activate() {
		super.activate();
		this._commands.forEach(command => {
			if (!command.visible) command.show();
		});
		this._index = -1;
		this.refreshCommandAct();
	}
	
	deactivate() {
		super.deactivate();
		this.refreshCommandAct();
		this._commands.forEach(command => {
			if (!command._act) command.hide();
		});
	}
}

//=============================================================================
// Sprite_ShopWaitress
//=============================================================================

class Sprite_ShopWaitress extends Sprite_Waitress {
	initialize(waitress) {
		const default_act_data = waitress['act-default'];
		super.initialize(default_act_data);
		this.opacity = 0;
		this.drill_COWA_setButtonMove(waitress);
		this.drill_COWS_pushNewAct("act-welcome", waitress["act-welcome"]);	
		this.drill_COWS_pushNewAct("act-buyOne", waitress["act-buyOne"]);
		this.drill_COWS_pushNewAct("act-sellOne", waitress["act-sellOne"]);
		this.drill_COWS_pushNewAct("act-goldNotEnough", waitress["act-goldNotEnough"]);
		this.drill_COWS_playAct("act-welcome");
	}
	
	update() {
		super.update();
		const data = this._moveAniData;
		if (data) {
			if(this._drill_time >= data["slideDelay"]) {
				this.opacity += 255 / data["slideTime"];
			}
		}
	}
}

//=============================================================================
// Sprite_CusorItem
//=============================================================================

class Sprite_CusorItem extends Sprite {
	initialize(item, size) {
		super.initialize();
		this.x = TouchInput.x;
		this.y = TouchInput.y;
		this.anchor = new Point(0.5, 0.5);
		this._size = size;
		this.setItem(item);
	}
	
	setItem(item) {
		if (this._item === item) return;
		this._item = item;
		this.refresh();
	}
	
	refresh() {
		const item = this._item;
		if (!item) return;
		if (this.itemHasPictureImage(item)) {
			this.bitmap = ItemManager.getItemPictureImage(item);
		} else {
			this.bitmap = ImageManager.loadSystem('IconSet');
			const iconIndex = item.iconIndex;
			const pw = ImageManager.iconWidth;
			const ph = ImageManager.iconHeight;
			const sx = (iconIndex % 16) * pw;
			const sy = Math.floor(iconIndex / 16) * ph;
			this.setFrame(sx, sy, pw, ph);
			const scale = this._size / ImageManager.iconWidth;
			this.scale = new Point(scale, scale);
		}
	}
	
	update() {
		super.update();
		if (!TouchInput.isHovered()) return;
		this.x = TouchInput.x;
		this.y = TouchInput.y;
	}
	
	itemHasPictureImage(item) {
		if (!item) return false;
		const filename = ItemManager.getItemPictureImageFilename(item);
		return filename !== '';
	}
}

//=============================================================================
// Scene_Map
//=============================================================================

GF.COIE.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    GF.COIE.Scene_Map_createDisplayObjects.call(this);
	if (!eval(GF.Param.COIEItemWeight['Enable Weight'])) return;
    $gameParty.refreshWeightValues();
};

//=============================================================================
// Scene_Item
//=============================================================================

Scene_Item.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createMainLayout();
	this.createHelpWindow();
    this.createItemWindow();
	this.createGoldWindow();
	this.createWeightWindow();
	this.createCategorySprite();
	this.createPartySprite();
};

Scene_Item.prototype.createMainLayout = function() {
	const layout = new Sprite(ImageManager.loadCustomBitmap(GF.Param.COIEItemMenuSet['MainLayoutFile']));
	this._backField.addChild(layout);	
};

GF.COIE.Scene_Item_createHelpWindow = Scene_Item.prototype.createHelpWindow;
Scene_Item.prototype.createHelpWindow = function() {
	GF.COIE.Scene_Item_createHelpWindow.call(this);
	const helpWindowSet = GF.Param.COIEItemMenuSet['HelpWindowSet'];
	this._helpWindow.processWindowInitParam(helpWindowSet);
	this._helpWindow.refresh();
};

Scene_Item.prototype.createItemWindow = function() {
	const set = GF.Param.COIEItemMenuSet['ListWindowSet'];
    this._itemWindow = new Window_ItemListPlus(set);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
	this._itemWindow.activate();
    this.addWindow(this._itemWindow);
};

Scene_Item.prototype.createGoldWindow = function() {
	const goldWindowSet = GF.Param.COIEItemMenuSet['GoldWindowSet'];
	if (goldWindowSet.GoldMode === "窗口模式"){
		const rect = new Rectangle(0, 0, 100, 100);
		this._goldWindow = new Window_Gold(rect);
		this.addWindow(this._goldWindow);
		this._goldWindow.processWindowInitParam(goldWindowSet.WindowSet);
		this._goldWindow.refresh();
	} else if (goldWindowSet.GoldMode === "参数数字模式") {
		const numData = GF.COSG.GaugeNumberSetList[goldWindowSet.GoldNumberId];
		numData.x = goldWindowSet.WindowSet.x;
		numData.y = goldWindowSet.WindowSet.y;
		this._goldNumberSprite = new Sprite_SeniorGaugeNumber(numData);
		this._goldNumberSprite.drill_COSG_reflashValue($gameParty.gold());
		this.addWindow(this._goldNumberSprite);
		const windowMoving = goldWindowSet.WindowMoving;
		this._goldNumberSprite.processSingleButtonMove(windowMoving);
	}
};

Scene_Item.prototype.createWeightWindow = function() {
	const weightWindowSet = GF.Param.COIEItemMenuSet['WeightWindowSet'];
	if (!eval(GF.Param.COIEItemWeight['Enable Weight'])) return;
	if (weightWindowSet.WeightMode === "窗口模式"){
		const rect = new Rectangle(0, 0, 100, 100);
		this._weightWindow = new Window_ItemWeight(rect);
		this._weightWindow.processWindowInitParam(weightWindowSet.WindowSet);
		this._weightWindow.refresh();
		this.addWindow(this._weightWindow);
	} else if(weightWindowSet.WeightMode === "参数数字模式") {
		this._weightNumberSprite = new Sprite_ItemWeightNumber(weightWindowSet);
		this.addWindow(this._weightNumberSprite);
	}
};

Scene_Item.prototype.createCategorySprite = function() {
	const set = GF.Param.COIEItemMenuSet;
	const categoryBtnSet = set['CategoryButtonSet'];
	const categoryBtnList = set['CategoryButtons'];
    this._categorySprite = new Sprite_ItemCategory(categoryBtnSet, categoryBtnList);
    this._categorySprite.setHandler('ok',     this.onCategoryOk.bind(this));
    this.addWindow(this._categorySprite);
	this.onCategoryOk();
	this._categorySprite.refreshCommandAct();
};

Scene_Item.prototype.createPartySprite = function() {
	this._showPartySprite = GF.Param.COIEItemMenuSet['ActorCmdSet'].ShowActorCmd;
    this._partySprite = new Sprite_ItemPartyCommand();
    this._partySprite.setHandler('ok',     this.onActorOk.bind(this));
    this._partySprite.setHandler('cancel', this.onActorCancel.bind(this));
	this._partySprite.visible = this._showPartySprite;
    this.addWindow(this._partySprite);
};

Scene_Item.prototype.onItemOk = function() {
	this._categorySprite.deactivate();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Scene_Item.prototype.showCusorItem = function() {
	this._cusorItemSprite = new Sprite_CusorItem(this.item(), this._itemWindow.itemHeight());
	this.addChild(this._cusorItemSprite);
};

Scene_Item.prototype.hideCusorItem = function() {
	if (!this._cusorItemSprite) return;
	this.removeChild(this._cusorItemSprite);
	this._cusorItemSprite.destroy();
	this._cusorItemSprite = null;
};

Scene_Item.prototype.refreshCusorItem = function() {
	if (!this._cusorItemSprite) return;
	this._cusorItemSprite.setItem(this.item());
};

GF.COIE.Scene_Item_onCategoryOk = Scene_Item.prototype.onCategoryOk;
Scene_Item.prototype.onCategoryOk = function() {
	this._itemWindow.setCategory(this._categorySprite.currentSymbol());
	this._itemWindow.setExt(this._categorySprite.currentExt());
	GF.COIE.Scene_Item_onCategoryOk.call(this);
	this._itemWindow.resetInitParamMove();
	this._helpWindow.resetInitParamMove();
};

GF.COIE.Scene_Item_onActorOk = Scene_Item.prototype.onActorOk;
Scene_Item.prototype.onActorOk = function() {
	GF.COIE.Scene_Item_onActorOk .call(this);
	this.refreshCusorItem();
};

Scene_Item.prototype.onActorCancel = function() {
	this._categorySprite.activate();
	this._partySprite.deselect();
	this._partySprite.deactivate();
	if (!this._showPartySprite) {
		this._partySprite.hide();
	}
	this._itemWindow.refresh();
	this._itemWindow.activate();
	this._itemWindow.selectLast();
	this.hideCusorItem();
};

Scene_Item.prototype.determineItem = function() {
    const action = new Game_Action(this.user());
    const item = this.item();
    action.setItemObject(item);
    if (action.isForFriend()) {
		if (!this._showPartySprite) {
			this._partySprite.show();
			this._partySprite.resetCommandMove();
		}
		this._partySprite._index = 0;
		this._partySprite.activate();
		this._partySprite.selectForItem(this.item());
		this.showCusorItem();
    } else {
		this.useItem();
		this.activateItemWindow();
		this._categorySprite.activate();
    }
};

Scene_Item.prototype.useItem = function() {
    this.playSeForItem();
    this.user().useItem(this.item());
    this.applyItem();
    this.checkCommonEvent();
    this.checkGameover();
	this._partySprite.refreshSprite();
	this._itemWindow.redrawCurrentItem();
	if (this._weightWindow) this._weightWindow.refresh();
	if (this._weightNumberSprite) this._weightNumberSprite.refresh();
};

Scene_Item.prototype.itemTargetActors = function() {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [$gameParty.members()[this._partySprite.index()]];
    }
};

//=============================================================================
// Scene_Equip
//=============================================================================

Scene_Equip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createMainLayout();
	this.createPartySprite();
	this.createHelpWindow();
    this.createStatusWindow();
    this.createSlotWindow();
    this.createItemWindow();
    this.refreshActor();
};

Scene_Equip.prototype.createMainLayout = function() {
	const layout = new Sprite(ImageManager.loadCustomBitmap(GF.Param.COIEEquipMenuSet['MainLayoutFile']));
	this._backField.addChild(layout);	
};

Scene_Equip.prototype.createPartySprite = function() {
	const show = GF.Param.COIEEquipMenuSet['ActorCmdSet'].ShowActorCmd;
	if (!show) return;
    this._partySprite = new Sprite_EquipPartyCommand();
    this.addWindow(this._partySprite);
};

GF.COIE.Scene_Equip_createHelpWindow = Scene_Equip.prototype.createHelpWindow;
Scene_Equip.prototype.createHelpWindow = function() {
	GF.COIE.Scene_Equip_createHelpWindow.call(this);
	const helpWindowSet = GF.Param.COIEEquipMenuSet['HelpWindowSet'];
	this._helpWindow.processWindowInitParam(helpWindowSet);
	this._helpWindow.refresh();
};

Scene_Equip.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_EquipStatusPlus();
    this.addWindow(this._statusWindow);
};

Scene_Equip.prototype.createSlotWindow = function() {
    this._slotWindow = new Window_EquipSlotPlus();
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
    this._slotWindow.setHandler("cancel", this.popScene.bind(this));
	this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
    this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.createItemWindow = function() {
    this._itemWindow = new Window_EquipItemPlus();
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	if (GF.Param.COIEEquipMenuSet['EquipMenuMode'] !== '装备列表常显/替换列表常显') {
		this._itemWindow.hide();
	}
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};

Scene_Equip.prototype.onActorChange = function() {
    Scene_MenuBase.prototype.onActorChange.call(this);
	this._statusWindow.resetInitParamMove();
    this.refreshActor();
    this.hideItemWindow();
    this._slotWindow.activate();
	this._slotWindow.resetInitParamMove();
	this._helpWindow.resetInitParamMove();
};

GF.COIE.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
	GF.COIE.Scene_Equip_onSlotOk.call(this);
	if (GF.Param.COIEEquipMenuSet['EquipMenuMode'] !== '装备列表常显/替换列表常显') {
		this._itemWindow.resetInitParamMove();
	}
	if (GF.Param.COIEEquipMenuSet['EquipMenuMode'] !== '装备列表和替换列表交替显示') {
		this._slotWindow.show();
	}
};

GF.COIE.Scene_Equip_hideItemWindow = Scene_Equip.prototype.hideItemWindow;
Scene_Equip.prototype.hideItemWindow = function() {
    GF.COIE.Scene_Equip_hideItemWindow.call(this);
	if (GF.Param.COIEEquipMenuSet['EquipMenuMode'] === '装备列表常显/替换列表常显') {
		this._itemWindow.show();
	}
};

//=============================================================================
// Scene_Shop
//=============================================================================

GF.COIE.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function (goods, purchaseOnly) {
    goods = JsonEx.makeDeepCopy(goods);
    GF.COIE.Scene_Shop_prepare.call(this, goods, purchaseOnly);
    this.adjustHideShowGoods();
};

Scene_Shop.prototype.adjustHideShowGoods = function () {
    const length = this._goods.length;
    for (var i = 0; i < length; ++i) {
        var good = this._goods[i];
        if (this.isGoodShown(good)) continue;
        this._goods[i][0] = -1;
    }
};

Scene_Shop.prototype.isGoodShown = function (good) {
	const typeList = [$dataItems, $dataWeapons, $dataArmors];
	if (![0, 1, 2].contains(good[0])) return false;
	let item = typeList[good[0]][good[1]];
    if (!item) return false;
	if (item.baseItemId) 
		item = DataManager.getBaseItem(item);
    if (item.note === undefined || item.note === null) return false;
	
	const note1 = /<(?:SHOP HIDE IF SWITCH ON|开关打开时隐藏):\s*(\d+)>/i;
	const note2 = /<(?:SHOP HIDE IF SWITCH OFF|开关关闭时隐藏):\s*(\d+)>/i;
	const note3 = /<(?:SHOP HIDE IF ANY SWITCH ON|任意开关打开时隐藏):\s*(\d+(?:\s*,\s*\d+)*)>/i;
	const note4 = /<(?:SHOP HIDE IF ANY SWITCH OFF|任意开关关闭时隐藏):\s*(\d+(?:\s*,\s*\d+)*)>/i;
	const note5 = /<(?:SHOP HIDE IF ALL SWITCHES ON|所有开关打开时隐藏):\s*(\d+(?:\s*,\s*\d+)*)>/i;
	const note6 = /<(?:SHOP HIDE IF ALL SWITCHES OFF|所有开关关闭时隐藏):\s*(\d+(?:\s*,\s*\d+)*)>/i;
	
    const notedata = item.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; ++i) {
        var line = notedata[i];
        if (line.match(note1)) {
            var hide = $gameSwitches.value(Number(RegExp.$1));
            if (hide) return false;    
        } else if (line.match(note2)) {
            var hide = !$gameSwitches.value(Number(RegExp.$1));
            if (hide) return false;            
        } else if (line.match(note3)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = false;
            for (var j = 0; j < array.length; ++j) {
                hide = hide || $gameSwitches.value(array[j]);
            }
            if (hide) return false;         
        } else if (line.match(note4)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = false;
            for (var j = 0; j < array.length; ++j) {
                hide = hide || !$gameSwitches.value(array[j]);
            }
            if (hide) return false;           
        } else if (line.match(note5)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = true;
            for (var j = 0; j < array.length; ++j) {
				hide = hide && $gameSwitches.value(array[j]);
            }
            if (hide) return false;            
        } else if (line.match(note6)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = true;
            for (var j = 0; j < array.length; ++j) {
                hide = hide && !$gameSwitches.value(array[j]);
            }
            if (hide) return false;           
        }
    }
    return true;
};

Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createMainLayout();
	this.createHelpWindow();
    this.createGoldWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createSellWindow();
	this.createWeightWindow();
	this.createCategorySprite();
	this.createCommandSprite();
	this.createConfirmBack();
	this.createNumberWindow();
	this.createWaitressSprite();
};

Scene_Shop.prototype.createMainLayout = function() {
	const layout = new Sprite(ImageManager.loadCustomBitmap(GF.Param.COIEShopMenuSet['MainLayoutFile']));
	this._backField.addChild(layout);	
};

GF.COIE.Scene_Shop_createHelpWindow = Scene_Shop.prototype.createHelpWindow;
Scene_Shop.prototype.createHelpWindow = function() {
	GF.COIE.Scene_Shop_createHelpWindow.call(this);
	const helpWindowSet = GF.Param.COIEShopMenuSet['HelpWindowSet'];
	this._helpWindow.processWindowInitParam(helpWindowSet);
	this._helpWindow.hide();
};

GF.COIE.Scene_Shop_createGoldWindow = Scene_Shop.prototype.createGoldWindow;
Scene_Shop.prototype.createGoldWindow = function() {
	GF.COIE.Scene_Shop_createGoldWindow.call(this);
	const goldWindowSet = GF.Param.COIEShopMenuSet['GoldWindowSet'];
	if (goldWindowSet.GoldMode === "窗口模式"){
		this._goldWindow.processWindowInitParam(goldWindowSet.WindowSet);
		this._goldWindow.refresh();
	} else if (goldWindowSet.GoldMode === "参数数字模式") {
		const numData = GF.COSG.GaugeNumberSetList[goldWindowSet.GoldNumberId];
		numData.x = goldWindowSet.WindowSet.x;
		numData.y = goldWindowSet.WindowSet.y;
		this._goldNumberSprite = new Sprite_SeniorGaugeNumber(numData);
		this._goldNumberSprite.drill_COSG_reflashValue($gameParty.gold());
		this.addWindow(this._goldNumberSprite);
		const windowMoving = goldWindowSet.WindowMoving;
		this._goldNumberSprite.processSingleButtonMove(windowMoving);
	}
	if (goldWindowSet.GoldMode !== "窗口模式") {
		this._goldWindow.hide();
		this._goldWindow.y = Graphics.boxHeight * 2;
	}
};

Scene_Shop.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_ShopStatusPlus();
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

Scene_Shop.prototype.createBuyWindow = function() {
    this._buyWindow = new Window_ShopBuyPlus();
    this._buyWindow.setupGoods(this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_Shop.prototype.createSellWindow = function() {
    const set = GF.Param.COIEShopMenuSet['SellWindowSet'];
    this._sellWindow = new Window_ShopSellPlus(set);
    this._sellWindow.setHelpWindow(this._helpWindow);
	this._sellWindow.setStatusWindow(this._statusWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler("ok", this.onSellOk.bind(this));
    this._sellWindow.setHandler("cancel", this.onSellCancel.bind(this));
    this.addWindow(this._sellWindow);
};

Scene_Shop.prototype.createWeightWindow = function() {
	const weightWindowSet = GF.Param.COIEShopMenuSet['WeightWindowSet'];
	if (!eval(GF.Param.COIEItemWeight['Enable Weight'])) return;
	if (weightWindowSet.WeightMode === "窗口模式"){
		const rect = new Rectangle(0, 0, 100, 100);
		this._weightWindow = new Window_ItemWeight(rect);
		this._weightWindow.processWindowInitParam(weightWindowSet.WindowSet);
		this._weightWindow.refresh();
		this.addWindow(this._weightWindow);
	} else if(weightWindowSet.WeightMode === "参数数字模式") {
		this._weightNumberSprite = new Sprite_ItemWeightNumber(weightWindowSet);
		this.addWindow(this._weightNumberSprite);
	}
};

Scene_Shop.prototype.createCategorySprite = function() {
	const categoryBtnSet = GF.Param.COIEShopMenuSet['CategoryButtonSet'];
	const categoryBtnList = GF.Param.COIEShopMenuSet['CategoryButtons'];
    this._categorySprite = new Sprite_ItemCategory(categoryBtnSet, categoryBtnList);
	this._categorySprite.hide();
    this._categorySprite.deactivate();
    this._categorySprite.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categorySprite);
};

Scene_Shop.prototype.createCommandSprite = function() {
    this._commandSprite = new Sprite_ShopCommand();
	this._commandSprite.setPurchaseOnly(this._purchaseOnly);
    this._commandSprite.setHandler("buy", this.commandBuy.bind(this));
    this._commandSprite.setHandler("sell", this.commandSell.bind(this));
    this._commandSprite.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandSprite);
};

Scene_Shop.prototype.createConfirmBack = function() {
	this._confirmBack = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
	this._confirmBack.bitmap.fillNormalAll('#000000');
	this._confirmBack.opacity = 160;
	this._confirmBack.hide();
	this.addWindow(this._confirmBack);
};

Scene_Shop.prototype.createNumberWindow = function() {
    this._numberWindow = new Window_ShopNumberPlus();
    this._numberWindow.hide();
    this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
    this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.createWaitressSprite = function() {
	const waitressId = GF.Param.COIEShopMenuSet['WaitressId'];
	if (waitressId === 0) return;
	const waitress = GF.COIE.ShopWaitressSetList[waitressId];
	this._waitressSprite = new Sprite_ShopWaitress(waitress);
	this._buyWindow.setWaitress(this._waitressSprite);
	this.addWindow(this._waitressSprite);
};

Scene_Shop.prototype.activateSellWindow = function() {
    this._sellWindow.activate();
	this._categorySprite.activate();
	this._statusWindow.show();
};

Scene_Shop.prototype.commandBuy = function() {
	this._commandSprite.deactivate();
    this.activateBuyWindow();
	this._helpWindow.show();
	this._helpWindow.resetInitParamMove();
	this._buyWindow.resetInitParamMove();
	this._statusWindow.resetInitParamMove();
};

Scene_Shop.prototype.commandSell = function() {
	this._commandSprite.deactivate();
    this._sellWindow.show();
    this._sellWindow.deselect();
    this._sellWindow.refresh();
    this._categorySprite.show();
    this._categorySprite.activate();
	this._helpWindow.show();
    this.onCategoryOk();
	this._categorySprite.refreshCommandAct();
};

Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
	this._confirmBack.show();
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
	this._numberWindow.resetInitParamMove();
};

Scene_Shop.prototype.onBuyCancel = function() {
	this._commandSprite.activate();
    this._buyWindow.hide();
    this._statusWindow.hide();
    this._statusWindow.setItem(null);
	this._helpWindow.hide();
};

GF.COIE.Scene_Shop_onCategoryOk = Scene_Shop.prototype.onCategoryOk;
Scene_Shop.prototype.onCategoryOk = function() {
	this._sellWindow.setCategory(this._categorySprite.currentSymbol());
	this._sellWindow.setExt(this._categorySprite.currentExt());
	GF.COIE.Scene_Shop_onCategoryOk.call(this);
	this._sellWindow.resetInitParamMove();
	this._helpWindow.resetInitParamMove();
	this._statusWindow.resetInitParamMove();
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
	this._categorySprite.deactivate();
    this._confirmBack.show();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
	this._numberWindow.resetInitParamMove();
};

Scene_Shop.prototype.onSellCancel = function() {
	this._commandSprite.activate();
    this._sellWindow.deselect();
	this._sellWindow.hide();
	this._statusWindow.hide();
    this._statusWindow.setItem(null);
	this._helpWindow.hide();
	this._categorySprite.hide();
    this._categorySprite.deactivate();
};

Scene_Shop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    switch (this._commandSprite.currentSymbol()) {
        case "buy":
            this.doBuy(this._numberWindow.number());
            break;
        case "sell":
            this.doSell(this._numberWindow.number());
            break;
    }
    this.endNumberInput();
    if (this._goldWindow) this._goldWindow.refresh();
	if (this._goldNumberSprite) this._goldNumberSprite.drill_COSG_reflashValue($gameParty.gold());
	if (this._weightWindow) this._weightWindow.refresh();
	if (this._weightNumberSprite) this._weightNumberSprite.refresh();
    this._statusWindow.refresh();
	this._sellWindow.refresh();
};

Scene_Shop.prototype.endNumberInput = function() {
	this._confirmBack.hide();
    this._numberWindow.hide();
    switch (this._commandSprite.currentSymbol()) {
        case "buy":
            this.activateBuyWindow();
            break;
        case "sell":
            this.activateSellWindow();
            break;
    }
};

GF.COIE.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
	if (this._waitressSprite) {
		this._waitressSprite.drill_COWS_playAct("act-buyOne");
	}
	GF.COIE.Scene_Shop_doBuy.call(this, number);
};

GF.COIE.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
	if (this._waitressSprite) {
		this._waitressSprite.drill_COWS_playAct("act-sellOne");
	}
	GF.COIE.Scene_Shop_doSell.call(this, number);
};

GF.COIE.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function () {
	var sellPrice = GF.COIE.Scene_Shop_sellingPrice.call(this);
	if (this._item && this._item.sellPrice !== undefined) {
		sellPrice = this._item.sellPrice;
    }
    return sellPrice;
};

//=============================================================================
// Utilities
//=============================================================================

GF.Util = GF.Util || {};

GF.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================