//=============================================================================
// Ganfly Plugins - CoreOfSeniorGauge
// GF_1_CoreOfSeniorGauge.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_1_CoreOfSeniorGauge = true;

var GF = GF || {};
GF.COSG = GF.COSG || {};
GF.COSG.version = 1.0;
GF.COSG.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        系统 - 高级参数条核心
 * @author ganfly
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 * @orderAfter GF_0_CoreOfMech
 * @base GF_0_CoreOfMech
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 本插件为基础核心，主要为以后的UI插件提供支持，可以为后续UI插件
 * 提供参数条和参数数字的基础设置。
 *
 * 本插件参数的配置需要先配置参数条和参数数字，然后将其组合为完整
 * 的参数条组合。
 *
 * ============================================================================
 *  前置需求
 * ============================================================================
 *
 * 这个插件只能在RPGMakerMZ上运行。
 *
 * ---- 前置插件列表 ----
 *
 * GF_0_CoreOfMech        系统 - 物理核心
 *
 * ---- 第1层 ----
 *
 * 这个插件是第1层插件，必须放在第0层下面，所有2，3，4，5层GF插件的上面。 
 *
 * ============================================================================
 *  参数条
 * ============================================================================
 *
 * 主体：
 *   (1.参数条是贴图。用于实时显示生命、魔法、时间等变量值。
 *   (2.参数条有下列固定且硬性结构：
 *      只能为长方形、中心锚点在左上角、只从左向右伸缩、没有外框。
 *   (3.在上述固定结构的基础上，
 *      你可以使用遮罩做成平行四边形或圆角矩形，
 *      也可以修改旋转角度使其看起来为 从右向左 或 从下往上 的伸缩结构。
 * 参数条与外框：
 *   (1.参数条主体是一个完全裸露的条，没有外框。
 *   (2.相关子插件会提供外框的设计，比如 2框+1参数条，2框+3参数条 的结
 *      构。注意，参数条如果旋转了，外框也需要旋转。
 * 段：
 *   (1.段 表示 参数条图片 被分割的贴图部分。
 *   (2.段上限 表示 单段 能够容纳的最大参数值。公式为：
 *      当前参数值 / 段上限 = 当前段长度 / 资源图片长度
 *   (3.段 具有多段结构，通过 段数 来划分。
 *      段 具有流动效果，通过 段长度 来划分。
 * 凹槽条：
 *   (1.凹槽条是只处于上段与下段中间的条。当参数值（比如生命值）被打出
 *      空缺时，凹槽条不会立即扣除而留下红印，停留一段时间后再缩短。
 *   (2.多段时，如果一整段被你打掉了。凹槽条会立即结束延迟，开始缩短，
 *      直到完全缩短为0后，再从下一段开始重新计算凹槽条缩短
 * 弹出条：
 *   (1.参数值减少时，上段会切掉减少的部分，形成弹出条，用于播放 段的
 *      扣除动画效果。
 *   (2.注意，弹出条是不会被遮罩挡住的。如果你的遮罩遮挡后是一个不规则
 *      形状，那么弹出条弹出的形状仍然为长方形不变。
 * 粒子：
 *   (1.粒子效果只在参数条内部冒出。
 * 游标：
 *   (1.游标是跟随当前条进度移动的一个贴图。
 *      可以是单张贴图，也可以是gif贴图。
 *   (2.游标会根据加满的情况浮动，默认情况下，只要 单段 加满了，游标则
 *      会一直处于满状态。多段情况下，需要开启多段复位，实现游标复位。
 * 加满动画：
 *   (1.加满动画 是指参数条从无到有的一个动画过程。
 *   (2.部分子插件会屏蔽此功能，比如时间条，时间条是持续减少/增加的，
 *      不需要加满动画。
 *
 * ============================================================================
 *  参数数字
 * ============================================================================
 *
 * 主体：
 *   (1.参数数字有下列固定且硬性结构：
 *      只能根据基本符号和扩展符号显示内容、没有外框、只能左右挤占。
 * 符号：
 *   (1.基本符号用于表示数字关系，与参数值有关。
 *      图片资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 *   (2.扩展符号用于表示数字关系，与参数值无关。
 *      图片资源会被分成14等分，通过字母表示扩展符号（abcdefghijklmn）。
 *   (3.参数值减少时，如果瞬间减少了大段数值（比如从200降到100）。
 *      弹性滚动设置下，显示的参数数字不会立即达到100，而是慢慢滚动到100。
 * 排列：
 *   (1.符号根据中心锚点进行的对齐情况，分为右对齐、左对齐、居中三种。
 *      注意中心锚点的位置。
 *   (2.如果显示数字的宽度区域十分有限，你可以给参数数字添加宽度限制，
 *      宽度分为两种：缩放限制和挤压限制。
 * 额定值：
 *   (1.额定值可以根据当前数值达到某些条件时，直接改变显示的符号的信息。
 *   (2.你可以配置与基本符号不同的额定符号，达到额定条件后，相关基本符号
 *      可以转变为额定符号。
 *
 * ============================================================================
 *  完整参数条组合
 * ============================================================================
 *
 * 将参数条和参数数字以及前景图组合在一起形成完整的参数条组合，
 * 用于在后续插件中调用。
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
 * @param GaugeMeterSet
 * @text 参数条样式
 * @type struct<GaugeMeterSet>[]
 * @desc 配置参数条的样式信息。
 * @default []
 *
 * @param GaugeNumberSet
 * @text 参数数字样式
 * @type struct<GaugeNumberSet>[]
 * @desc 配置参数数字的样式信息。
 * @default []
 *
 * @param GaugeSet
 * @text 完整参数条组合样式
 * @type struct<GaugeSet>[]
 * @desc 配置完整参数条组合的样式信息。
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<GaugeMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~GaugeMeterSet:
 * 
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的参数条--
 *
 * @param MainPart
 * @text ---主体设置---
 * @desc 
 *
 * @param MeterMainPart
 * @text 整体设置
 * @parent MainPart
 * @type struct<MeterMainPart>
 * @desc 配置参数条的整体样式信息。
 * @default {"RotateAngle":"0","MeterImg":"","MeterBlockImg":""}
 *
 * @param MeterSectionSet
 * @text 分段设置
 * @parent MainPart
 * @type struct<MeterSectionSet>
 * @desc 配置参数条的分段样式信息。
 * @default {"SectionNum":"4","SectionCircle":"true","ShortenStyle":"匀速缩短","ElasticRate":"15","ShortenSpeed":"2.5","EnableFlow":"false","FlowDir":"从右往左","FlowSpeed":"0.5","FlowStyle":"三等份划分","FlowSecLength":"0"}
 * @param ExtraPart
 * @text ---附加结构设置---
 * @desc
 *
 * @param GrooveMeterSet
 * @text 凹槽条设置
 * @parent ExtraPart
 * @type struct<GrooveMeterSet>
 * @desc 配置凹槽条的样式信息。
 * @default {"EnableGroove":"false","GrooveImg":"","ShortenSpeed":"15.0","ShortenDelay":"60","RefreshDelay":"true"}
 *
 * @param EjectMeterSet
 * @text 弹出条设置
 * @parent ExtraPart
 * @type struct<EjectMeterSet>
 * @desc 配置弹出条的样式信息。
 * @default {"EnableEject":"false","EjectMode":"当前参数条","EjectOrbit":"{\"Note\":\"==新的弹出条弹道==\",\"MoveTime\":\"120\",\"MoveMode\":\"极坐标模式\",\"PolarModeSet\":\"{\\\"SpeedType\\\":\\\"只初速度\\\",\\\"StartSpeed\\\":\\\"1.0\\\",\\\"SpeedRandom\\\":\\\"2.0\\\",\\\"Accelerate\\\":\\\"0.0\\\",\\\"MaxSpeed\\\":\\\"99.0\\\",\\\"MinSpeed\\\":\\\"0.0\\\",\\\"DistanceFormula\\\":\\\"\\\\\\\"return 0.0\\\\\\\"\\\",\\\"DirType\\\":\\\"四周扩散(线性)\\\",\\\"FixDir\\\":\\\"90.0\\\",\\\"SectorDir\\\":\\\"45.0\\\",\\\"SectorAngle\\\":\\\"90.0\\\",\\\"DirFormula\\\":\\\"\\\\\\\"return 0.0\\\\\\\"\\\"}\",\"CartModeSet\":\"{\\\"WholeAngle\\\":\\\"0.0\\\",\\\"SpeedTypeX\\\":\\\"只初速度\\\",\\\"StartSpeedX\\\":\\\"1.0\\\",\\\"SpeedRandomX\\\":\\\"2.0\\\",\\\"AccelerateX\\\":\\\"0.0\\\",\\\"MaxSpeedX\\\":\\\"99.0\\\",\\\"MinSpeedX\\\":\\\"0.0\\\",\\\"DistanceFormulaX\\\":\\\"\\\\\\\"return 0.0\\\\\\\"\\\",\\\"SpeedTypeY\\\":\\\"只初速度\\\",\\\"StartSpeedY\\\":\\\"1.0\\\",\\\"SpeedRandomY\\\":\\\"2.0\\\",\\\"AccelerateY\\\":\\\"0.0\\\",\\\"MaxSpeedY\\\":\\\"99.0\\\",\\\"MinSpeedY\\\":\\\"0.0\\\",\\\"DistanceFormulaY\\\":\\\"\\\\\\\"return 0.0\\\\\\\"\\\"}\"}","EjectNumMax":"30"}
 *
 * @param ParticleEffectSet
 * @text 粒子效果设置
 * @parent ExtraPart
 * @type struct<ParticleEffectSet>
 * @desc 配置粒子效果的样式信息。
 * @default {"EnablePaticle":"false","PaticleImg":"","PaticleMode":"底部出现","PaticleXSpeed":"0","PaticleYSpeed":"-1.5","PaticleNum":"20","PaticleTime":"20"}
 *
 * @param CusorEffectSet
 * @text 游标设置
 * @parent ExtraPart
 * @type struct<CusorEffectSet>
 * @desc 配置游标的样式信息。
 * @default {"EnableCusor":"false","CusorImg":"[\"\"]","CusorInterval":"4","CusorInvert":"false","CusorOffsetX":"0","CusorOffsetY":"0","CusorMode":"一直显示","MultCusor":"false","BlockCusor":"false"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<MeterMainPart>
 * ---------------------------------------------------------------------------
 */
/*~struct~MeterMainPart:
 *
 * @param RotateAngle
 * @text 整体旋转角度
 * @type number
 * @min 0
 * @desc 参数条的整体旋转角度，单位角度。中心锚点在左上角。（逆时针，90度朝下，270度朝上）
 * @default 0
 *
 * @param MeterImg
 * @text 资源-参数条
 * @desc 参数条的图片资源，注意要与你后面配置的段数吻合。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param MeterBlockImg
 * @text 资源-参数条遮罩
 * @desc 参数条的遮罩资源。注意，如果开启了流动效果，凹槽条的长度需要适配 段长度。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 */
/* ---------------------------------------------------------------------------
 * struct<MeterSectionSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~MeterSectionSet:
 *
 * @param SectionNum
 * @text 段数
 * @type number
 * @min 1
 * @desc 资源中对应的段的数量，系统会将参数条图片资源切成指定数量的段数。
 * @default 4
 * 
 * @param SectionCircle
 * @text 段是否循环
 * @type boolean
 * @on 循环
 * @off 不循环
 * @desc 如果参数值比 段数x段上限 的值还要大。循环则从第一段继续计数，而不循环则保持满段状态。
 * @default true
 *
 * @param ShortenStyle
 * @text 缩短方式
 * @type select
 * @option 瞬间缩短
 * @value 瞬间缩短
 * @option 弹性缩短
 * @value 弹性缩短
 * @option 匀速缩短
 * @value 匀速缩短
 * @desc 你需要考虑 段与弹出条 的组合关系，如果有弹出条，建议设为瞬间缩短。
 * @default 匀速缩短
 *
 * @param ElasticRate
 * @text 弹性缩短比
 * @parent ShortenStyle
 * @desc 缩短方式为弹性缩短时，段缩短的速度。注意，弹性缩短为比例除数，值越大，速度越慢。
 * @default 15
 *
 * @param ShortenSpeed
 * @text 匀速缩短速度
 * @parent ShortenStyle
 * @desc 缩短方式为 匀速缩短 时，段变长或者缩短的速度。注意，单位为 像素/帧。
 * @default 2.5
 *
 * @param EnableFlow
 * @text 是否使用流动效果
 * @type boolean
 * @on 流动
 * @off 不流动
 * @desc 注意，设置流动后，素材长度会取三分之一或按指定段长度划分。
 * @default false
 *
 * @param FlowDir
 * @text 流动方向
 * @parent EnableFlow
 * @type select
 * @option 从右往左
 * @value 从右往左
 * @option 从左往右
 * @value 从左往右
 * @desc 流动效果的流动方向。
 * @default 从右往左
 *
 * @param FlowSpeed
 * @text 流动速度
 * @parent EnableFlow
 * @desc 段 流动的速度，单位像素/帧。可为小数。
 * @default 0.5
 *
 * @param FlowStyle
 * @text 流动段划分模式
 * @parent EnableFlow
 * @type select
 * @option 三等份划分
 * @value 三等份划分
 * @option 指定段长度划分
 * @value 指定段长度划分
 * @desc 使用流动效果时，对资源的划分模式。
 * @default 三等份划分
 * 
 * @param FlowSecLength
 * @text 段长度
 * @parent FlowStyle
 * @type number
 * @min 0
 * @desc 流动段划分模式中 选择"指定段长度切片"时，段的实际长度。
 * @default 0
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<GrooveMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~GrooveMeterSet:
 *
 * @param EnableGroove
 * @text 是否启用凹槽条
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param GrooveImg
 * @text 资源-凹槽条
 * @desc 凹槽条的图片资源。注意，如果开启了流动效果，凹槽条的长度需要适配 段长度。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 * @param ShortenSpeed
 * @text 扣除速度
 * @desc 凹槽条缩短的速度，单位像素/帧。
 * @default 15.0
 *
 * @param ShortenDelay
 * @text 扣除延迟
 * @type number
 * @min 0
 * @desc 凹槽条执行扣除的延迟时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param RefreshDelay
 * @text 连续扣除是否刷新延迟
 * @type boolean
 * @on 刷新
 * @off 不刷新
 * @desc 参数连续扣除时，比如连续受伤，会重新计算延迟时间，这时候你会看见一长条的红色凹槽条，等同于打出的伤害。
 * @default true
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<EjectMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~EjectMeterSet:
 *
 * @param EnableEject
 * @text 是否启用弹出效果
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param EjectMode
 * @text 弹出条块模式
 * @type select
 * @option 当前参数条
 * @value 当前参数条
 * @option 白色块
 * @value 白色块
 * @option 黑色块
 * @value 黑色块
 * @desc 弹出条的块图片模式，当前参数条是指 段的减去部分 。
 * @default 当前参数条
 *
 * @param EjectOrbit
 * @text 弹出条运动轨迹
 * @type struct<OrbitSet>
 * @desc 弹出条的运动轨迹的详细配置信息。这里的移动时长是弹出条的持续时间。
 * @default {"Note":"==新的弹出条弹道==","MoveTime":"120","MoveMode":"极坐标模式","PolarModeSet":"{\"SpeedType\":\"只初速度\",\"StartSpeed\":\"1.0\",\"SpeedRandom\":\"2.0\",\"Accelerate\":\"0.0\",\"MaxSpeed\":\"99.0\",\"MinSpeed\":\"0.0\",\"DistanceFormula\":\"\\\"return 0.0\\\"\",\"DirType\":\"四周扩散(线性)\",\"FixDir\":\"90.0\",\"SectorDir\":\"45.0\",\"SectorAngle\":\"90.0\",\"DirFormula\":\"\\\"return 0.0\\\"\"}","CartModeSet":"{\"WholeAngle\":\"0.0\",\"SpeedTypeX\":\"只初速度\",\"StartSpeedX\":\"1.0\",\"SpeedRandomX\":\"2.0\",\"AccelerateX\":\"0.0\",\"MaxSpeedX\":\"99.0\",\"MinSpeedX\":\"0.0\",\"DistanceFormulaX\":\"\\\"return 0.0\\\"\",\"SpeedTypeY\":\"只初速度\",\"StartSpeedY\":\"1.0\",\"SpeedRandomY\":\"2.0\",\"AccelerateY\":\"0.0\",\"MaxSpeedY\":\"99.0\",\"MinSpeedY\":\"0.0\",\"DistanceFormulaY\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param EjectNumMax
 * @text 弹出条最大数量
 * @type number
 * @min 0
 * @desc 弹出条的最大数量，一般战斗不会出现大量弹出条，而持续减少的参数量比如时间，会出现大量弹出条。
 * @default 30
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParticleEffectSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ParticleEffectSet:
 *
 * @param EnablePaticle
 * @text 是否启用粒子效果
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param PaticleImg
 * @text 资源-粒子
 * @desc 生命条中的粒子效果的粒子图片资源。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 * @param PaticleMode
 * @text 粒子出现模式
 * @type select
 * @option 随机出现
 * @value 随机出现
 * @option 左侧出现
 * @value 左侧出现
 * @option 右侧出现
 * @value 右侧出现
 * @option 顶部出现
 * @value 顶部出现
 * @option 底部出现
 * @value 底部出现
 * @desc 上下左右分别对应长方形的四个边的区域。
 * @default 底部出现
 *
 * @param PaticleXSpeed
 * @text 粒子X速度
 * @desc 粒子在x轴方向移动的速度。可为小数，可为负数。
 * @default 0
 *
 * @param PaticleYSpeed
 * @text 粒子Y速度
 * @desc 粒子在y轴方向移动的速度。可为小数，可为负数。
 * @default -1.5
 *
 * @param PaticleNum
 * @text 粒子数量
 * @type number
 * @min 0
 * @desc 条中出现的粒子的数量。
 * @default 20
 *
 * @param PaticleTime
 * @text 粒子持续时间
 * @type number
 * @min 1
 * @desc 粒子出现到粒子消失的时间。如果粒子离开参数条边界，则视为该粒子已经消失。
 * @default 20
 *
 */
/* ---------------------------------------------------------------------------
 * struct<CusorEffectSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~CusorEffectSet:
 *
 * @param EnableCusor
 * @text 是否启用游标
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param CusorImg
 * @text 资源-游标
 * @desc 参数条中游标的图片资源。可以为单张，也可以为多张形成gif。
 * @default [""]
 * @require 1
 * @dir img/
 * @type file[]
 *
 * @param CusorInterval
 * @text 动画帧间隔
 * @type number
 * @min 1
 * @desc 多帧游标的播放帧间隔，间隔越小，播放速度越快。
 * @default 4
 *
 * @param CusorInvert
 * @text 是否倒放
 * @type boolean
 * @on 倒放
 * @off 正常播放
 * @desc true - 倒放，false - 正常播放。多帧游标的播放顺序。
 * @default false
 *
 * @param CusorOffsetX
 * @text 偏移-游标 X
 * @desc 以游标浮动的位置为基准，x轴方向偏移，单位像素。
 * @default 0
 *
 * @param CusorOffsetY
 * @text 偏移-游标 Y
 * @desc 以游标浮动的位置为基准，y轴方向偏移，单位像素。
 * @default 0
 *
 * @param CusorMode
 * @text 游标显示模式
 * @type select
 * @option 亮光模式
 * @value 亮光模式
 * @option 闪烁模式
 * @value 闪烁模式
 * @option 受伤模式
 * @value 受伤模式
 * @option 增量模式
 * @value 增量模式
 * @option 变化模式
 * @value 变化模式
 * @option 一直显示
 * @value 一直显示
 * @desc 游标的显示模式，详细介绍见文档"关于参数条.docx"中游标介绍。
 * @default 一直显示
 *
 * @param MultCusor
 * @text 是否启用多段复位
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 参数有多段时，游标将复位并根据多段的位置浮动。如果不复位，第一层满了，游标将一直停在满的位置。
 * @default false
 *
 * @param BlockCusor
 * @text 遮罩是否能遮挡游标
 * @type boolean
 * @on 遮挡
 * @off 不遮挡
 * @desc 如果你希望游标和参数条一样，能被遮罩遮挡，可以设置ture开启遮挡。
 * @default false
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<OrbitSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~OrbitSet:
 *
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的弹出条弹道==
 *
 * @param MoveTime
 * @text 移动时长
 * @type number
 * @min 1
 * @desc 弹出条移动的持续时长，过了时间之后，碎片消失或者停止移动，单位帧。
 * @default 120
 *
 * @param MoveMode
 * @text 移动模式
 * @type select
 * @option 直角坐标模式
 * @value 直角坐标模式
 * @option 极坐标模式
 * @value 极坐标模式
 * @desc 描述弹出条运动的模式。
 * @default 极坐标模式
 * 
 * @param PolarModeSet
 * @text 极坐标模式设置
 * @parent MoveMode
 * @type struct<PolarModeSet>
 * @desc 弹出条的运动轨迹为极坐标模式时的设置
 * @default {"SpeedType":"只初速度","StartSpeed":"1.0","SpeedRandom":"2.0","Accelerate":"0.0","MaxSpeed":"99.0","MinSpeed":"0.0","DistanceFormula":"\"return 0.0\"","DirType":"四周扩散(线性)","FixDir":"90.0","SectorDir":"45.0","SectorAngle":"90.0","DirFormula":"\"return 0.0\""}
 *
 * @param CartModeSet
 * @text 直角坐标模式设置
 * @parent MoveMode
 * @type struct<CartModeSet>
 * @desc 弹出条的运动轨迹为直角坐标模式时的设置
 * @default {"WholeAngle":"0.0","SpeedTypeX":"只初速度","StartSpeedX":"1.0","SpeedRandomX":"2.0","AccelerateX":"0.0","MaxSpeedX":"99.0","MinSpeedX":"0.0","DistanceFormulaX":"\"return 0.0\"","SpeedTypeY":"只初速度","StartSpeedY":"1.0","SpeedRandomY":"2.0","AccelerateY":"0.0","MaxSpeedY":"99.0","MinSpeedY":"0.0","DistanceFormulaY":"\"return 0.0\""}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<PolarModeSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~PolarModeSet:
 *
 * @param SpeedType
 * @text 速度类型
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述弹出条速度的模式。
 * @default 只初速度
 * 
 * @param StartSpeed
 * @text 初速度
 * @parent SpeedType
 * @desc 弹出条的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param SpeedRandom
 * @text 速度随机波动量
 * @parent SpeedType
 * @desc 弹出条速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param Accelerate
 * @text 加速度
 * @parent SpeedType
 * @desc 弹出条的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param MaxSpeed
 * @text 最大速度
 * @parent SpeedType
 * @desc 弹出条的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param MinSpeed
 * @text 最小速度
 * @parent SpeedType
 * @desc 弹出条的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param DistanceFormula
 * @text 路程计算公式
 * @parent SpeedType
 * @type note
 * @desc 弹出条的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档"关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param DirType
 * @text 方向类型
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(抖动)
 * @value 四周扩散(抖动)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向计算公式
 * @value 方向计算公式
 * @desc 描述弹出条速度的模式。
 * @default 四周扩散(线性)
 * 
 * @param FixDir
 * @text 固定方向
 * @parent DirType
 * @desc 类型为固定方向时，弹出条固定方向的角度值。
 * @default 90.0
 * 
 * @param SectorDir
 * @text 扇形朝向
 * @parent DirType
 * @desc 类型为扇形范围方向时，扇形的朝向角度。
 * @default 45.0
 * 
 * @param SectorAngle
 * @text 扇形角度
 * @parent DirType
 * @desc 类型为扇形范围方向时，扇形弧的角度数。
 * @default 90.0
 * 
 * @param DirFormula
 * @text 方向计算公式
 * @parent DirType
 * @type note
 * @desc 弹出条的方向计算公式。可使用 变量和常量 来设计公式，具体看看文档"关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<CartModeSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~CartModeSet:
 *
 * @param WholeAngle
 * @text 直角坐标整体旋转
 * @desc 将下面设计好的xy公式，进行整体旋转，单位角度。
 * @default 0.0
 *
 * @param SpeedTypeX
 * @text X轴速度类型
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述弹出条速度的模式。
 * @default 只初速度
 * 
 * @param StartSpeedX
 * @text X轴初速度
 * @parent SpeedTypeX
 * @desc 弹出条的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param SpeedRandomX
 * @text X轴速度随机波动量
 * @parent SpeedTypeX
 * @desc 弹出条速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param AccelerateX
 * @text X轴加速度
 * @parent SpeedTypeX
 * @desc 弹出条的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param MaxSpeedX
 * @text X轴最大速度
 * @parent SpeedTypeX
 * @desc 弹出条的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param MinSpeedX
 * @text X轴最小速度
 * @parent SpeedTypeX
 * @desc 弹出条的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param DistanceFormulaX
 * @text X轴路程计算公式
 * @parent SpeedTypeX
 * @type note
 * @desc 弹出条的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档"关于弹道.docx"介绍。
 * @default "return 0.0"
 *
 * @param SpeedTypeY
 * @text Y轴速度类型
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述弹出条速度的模式。
 * @default 只初速度
 * 
 * @param StartSpeedY
 * @text Y轴初速度
 * @parent SpeedTypeY
 * @desc 弹出条的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param SpeedRandomY
 * @text Y轴速度随机波动量
 * @parent SpeedTypeY
 * @desc 弹出条速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param AccelerateY
 * @text Y轴加速度
 * @parent SpeedTypeY
 * @desc 弹出条的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param MaxSpeedY
 * @text Y轴最大速度
 * @parent SpeedTypeY
 * @desc 弹出条的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param MinSpeedY
 * @text Y轴最小速度
 * @parent SpeedTypeY
 * @desc 弹出条的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param DistanceFormulaY
 * @text Y轴路程计算公式
 * @parent SpeedTypeY
 * @type note
 * @desc 弹出条的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档"关于弹道.docx"介绍。
 * @default "return 0.0"
 *
 */
/* ---------------------------------------------------------------------------
 * struct<GaugeNumberSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~GaugeNumberSet:
 * 
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的参数数字--
 *
 * @param NumberMainPart
 * @text 整体设置
 * @type struct<NumberMainPart>
 * @desc 配置参数数字的整体样式信息。
 * @default {"RotateAngle":"0","BaseSymbolImg":"","ExSymbolImg":""}
 *
 * @param NumberSignSet
 * @text 符号设置
 * @type struct<NumberSignSet>
 * @desc 配置参数数字的符号样式信息。
 * @default {"ShowMinus":"true","ExSignPre":"","ExSignSuf":""}
 *
 * @param NumberAlignSet
 * @text 排列设置
 * @type struct<NumberAlignSet>
 * @desc 配置参数数字的排列样式信息。
 * @default {"AlignType":"右对齐","MaxSignNum":"20","SignSpace":"0","WidthType":"不限制宽度","LimitWidth":"300"}
 *
 * @param NumberScrollSet
 * @text 滚动设置
 * @type struct<NumberScrollSet>
 * @desc 配置参数数字的滚动样式信息。
 * @default {"ScrollType":"弹性滚动","ScrollSpeed":"10.0"}
 * 
 * @param NumberRatingSet
 * @text 额定值设置
 * @type struct<NumberRatingSet>
 * @desc 配置参数数字的额定值样式信息。
 * @default {"EnableRating":"false","ShowRating":"false","DefaultRating":"100","RatingCondition":"大于等于额定值时","LimitRating":"false","RatingSign":"不变化","RatingSignImg":"","RatingSignImgEx":""}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NumberMainPart>
 * ---------------------------------------------------------------------------
 */
/*~struct~NumberMainPart:
 *
 * @param RotateAngle
 * @text 整体旋转角度
 * @type number
 * @min 0
 * @desc 参数数字的整体旋转角度，单位角度。中心锚点在左上角。
 * @default 0
 * 
 * @param BaseSymbolImg
 * @text 资源-基本符号
 * @desc 基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 * @param ExSymbolImg
 * @text 资源-扩展符号
 * @desc 扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号(abcdefghijklm)。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NumberSignSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~NumberSignSet:
 *
 * @param ShowMinus
 * @text 是否显示负号
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 如果参数值出现了负数值，会显示负号。
 * @default true
 * 
 * @param ExSignPre
 * @text 额外符号前缀
 * @desc 除了当前显示的数字字符，额外显示的符号前缀。
 * @default 
 * 
 * @param ExSignSuf
 * @text 额外符号后缀
 * @desc 除了当前显示的数字字符，额外显示的符号后缀。
 * @default 
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NumberAlignSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~NumberAlignSet:
 *
 * @param AlignType
 * @text 对齐方式
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 居中
 * @value 居中
 * @option 左对齐
 * @value 左对齐
 * @desc 符号的对齐方式。
 * @default 右对齐
 *
 * @param MaxSignNum
 * @text 最大符号数量
 * @type number
 * @min 1
 * @desc 最多显示的符号数量，比如"1000"中有4个符号，"-100/-110"中有9个符号。
 * @default 20
 * 
 * @param SignSpace
 * @text 符号间间距
 * @desc 符号贴图之间的间距，可以为负数，负数的间距将会更加紧凑。
 * @default 0
 *
 * @param WidthType
 * @text 排列宽度模式
 * @type select
 * @option 不限制宽度
 * @value 不限制宽度
 * @option 缩放限制
 * @value 缩放限制
 * @option 挤压限制
 * @value 挤压限制
 * @desc 排列符号是宽度的模式。超出宽度时，缩放限制会横向缩放。挤压限制则会减小间距。
 * @default 不限制宽度
 *
 * @param LimitWidth
 * @text 排列限制宽度
 * @parent WidthType
 * @desc 模式中设置限制时，符号的最大宽度。
 * @default 300
 * 
 */
/* ---------------------------------------------------------------------------
 * struct<NumberScrollSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~NumberScrollSet:
 *
 * @param ScrollType
 * @text 滚动模式
 * @type select
 * @option 瞬间变化
 * @value 瞬间变化
 * @option 弹性滚动
 * @value 弹性滚动
 * @desc 滚动效果指 数字的值变化后，数值滚动到指定值的动画效果。
 * @default 弹性滚动
 * 
 * @param ScrollSpeed
 * @text 弹性变化速度
 * @desc 值为比例除数，值越小，速度越快。值越大，速度越慢。
 * @default 10.0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NumberRatingSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~NumberRatingSet:
 *
 * @param EnableRating
 * @text 是否启用额定值
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。额定值将根据参数值情况，改变符号样式。
 * @default false
 * 
 * @param ShowRating
 * @text 是否显示额定值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。"100/200"中，200为额定值，不显示额定值则只显示"100"。
 * @default false
 * 
 * @param DefaultRating
 * @text 默认额定值
 * @desc 用于比较的额定值。注意，部分子插件可能会覆盖该额定值，具体看子插件说明。
 * @default 100
 * 
 * @param RatingCondition
 * @text 额定条件
 * @type select
 * @option 小于额定值时
 * @value 小于额定值时
 * @option 大于额定值时
 * @value 大于额定值时
 * @option 等于额定值时
 * @value 等于额定值时
 * @option 小于等于额定值时
 * @value 小于等于额定值时
 * @option 大于等于额定值时
 * @value 大于等于额定值时
 * @desc 满足额定条件时，显示的符号将会变为额定符号。
 * @default 大于等于额定值时
 * 
 * @param LimitRating
 * @text 达到条件后是否限制值
 * @type boolean
 * @on 限制
 * @off 不限制
 * @desc true - 不限制，false - 不限制。大于等于额定值条件 且 出现"11/10"时，若限制将只显示"10/10"。
 * @default false
 * 
 * @param RatingSign
 * @text 达到条件时符号
 * @type select
 * @option 所有符号变为额定符号
 * @value 所有符号变为额定符号
 * @option 有效符号变为额定符号
 * @value 有效符号变为额定符号
 * @option 只参数符号变为额定符号
 * @value 只参数符号变为额定符号
 * @option 不变化
 * @value 不变化
 * @desc 满足额定条件后，变化的符号情况。
 * @default 不变化
 * 
 * @param RatingSignImg
 * @text 资源-额定基本符号
 * @desc 满足额定条件时基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 * 
 * @param RatingSignImgEx
 * @text 资源-额定扩展符号
 * @desc 满足额定条件时扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号（abcdefghijklmn）。
 * @default 
 * @require 1
 * @dir img/
 * @type file
 *
 */
/* ---------------------------------------------------------------------------
 * struct<GaugeSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~GaugeSet:
 *
 * @param Note
 * @text 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的完整参数条--
 *
 * @param MeterSet
 * @text 参数条设置
 * @type struct<PointMeterSet>
 * @desc 参数条设置
 * @default {"Show Meter":"false","Meter Style":"0","Meter X":"10","Meter Y":"10","Enable Refill Ani":"true","Refill Type":"匀速加满","Refill Time":"90","Refill Delay":"30"}
 *
 * @param ForegroundSet
 * @text 前景设置
 * @type struct<ForegroundSet>
 * @desc 前景设置
 * @default {"Foreground File":"","Foreground X":"0","Foreground Y":"0"}
 *
 * @param NumberSet
 * @text 参数数字设置
 * @type struct<PointNumberSet>
 * @desc 参数数字设置
 * @default {"Show Number":"false","Number Style":"0","Number X":"10","Number Y":"10"}
 *
 * @param NameSet
 * @text 名称显示设置
 * @type struct<NameSet>
 * @desc 名称显示设置
 * @default {"Show Name":"true","Name X":"94","Name Y":"51","Name Font Size":"20","Name Align":"left"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<PointMeterSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~PointMeterSet:
 *
 * @param Show Meter
 * @text 是否显示参数条
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param Meter Style
 * @text 参数条样式
 * @parent Show Meter
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param Meter X
 * @text 平移-参数条 X
 * @parent Show Meter
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param Meter Y
 * @text 平移-参数条 Y
 * @parent Show Meter
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 * 
 * @param Enable Refill Ani
 * @text 是否启用加满动画
 * @parent Show Meter
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param Refill Type
 * @text 加满方式
 * @parent Enable Refill Ani
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 参数条加满的方式。
 * @default 匀速加满
 *
 * @param Refill Time
 * @text 加满持续时间
 * @parent Enable Refill Ani
 * @type number
 * @min 1
 * @desc 动画将在时间内加满参数条，单位帧。（1秒60帧）
 * @default 90
 *
 * @param Refill Delay
 * @text 加满延迟
 * @parent Enable Refill Ani
 * @type number
 * @min 0
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 30
 *
 */
/* ---------------------------------------------------------------------------
 * struct<PointNumberSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~PointNumberSet:
 *
 * @param Show Number
 * @text 是否显示参数数字
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param Number Style
 * @text 参数数字样式
 * @parent Show Number
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param Number X
 * @text 平移-参数数字 X
 * @parent Show Number
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param Number Y
 * @text 平移-参数数字 Y
 * @parent Show Number
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
 * @text 资源-参数条前景
 * @desc 参数条前景图片资源。
 * @type file
 * @require 1
 * @dir img/
 * @default 
 *
 * @param Foreground X
 * @text 平移-参数条前景 X
 * @desc 修正校对图片的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param Foreground Y
 * @text 平移-参数条前景 Y
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
 * @text 是否显示名称
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param Name X
 * @text 平移-名称 X
 * @parent Show Name
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 94
 *
 * @param Name Y
 * @text 平移-名称 Y
 * @parent Show Name
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 51
 * 
 * @param Name Font Size
 * @text 名称字体大小
 * @parent Show Name
 * @type number
 * @min 1
 * @desc 名称的字体大小。
 * @default 20
 * 
 * @param Name Align
 * @text 名称文字朝向
 * @parent Show Name
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 名称文字朝向。
 * @default left
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.COSG.pluginName);
GF.Param = GF.Param || {};

GF.Param.COSGGaugeMeterSet = JSON.parse(GF.Parameters['GaugeMeterSet']);
GF.Param.COSGGaugeNumberSet = JSON.parse(GF.Parameters['GaugeNumberSet']);
GF.Param.COSGGaugeSet = JSON.parse(GF.Parameters['GaugeSet']);

//=============================================================================
// GaugeDataManger
//=============================================================================

GF.COSG.GaugeMeterSetList = [null];
GF.COSG.GaugeNumberSetList = [null];
GF.COSG.GaugeSetList = [null];

class GaugeDataManger {
	static initDatabase() {
		this.gaugeMeterDatabaseCreate();
		this.gaugeNumberDatabaseCreate();
		this.gaugeDatabaseCreate();
	}
	
    static gaugeMeterDatabaseCreate() {
        GF.COSG.GaugeMeterSetList = [null];
        const list = GF.Param.COSGGaugeMeterSet;
        for (let i = 1; i <= list.length; i++) {
            let gmData = JSON.parse(list[i - 1] || null);
            if (gmData) {
                this.initGaugeMeterData(i, gmData);
            }
        }
    }

    static initGaugeMeterData(id, dataFrom) {
        const data = {};
        // > 主体
        this.initMeterMainData(data, dataFrom);
        // > 分段条（段）
        this.initLevelData(data, dataFrom);
        // > 凹槽条
        this.initGrooveMeterData(data, dataFrom);
        // > 弹出条
        this.initEjectMeterData(data, dataFrom);
        // > 粒子
        this.initParticleData(data, dataFrom);
        // > 游标
        this.initCusorData(data, dataFrom);
        // > 加满动画
        //		data['filling_enable']【启用】
        //		data['filling_mode']【加满方式】
        //		data['filling_time']【持续时间】
        //		data['filling_delay']【动画延迟】
        GF.COSG.GaugeMeterSetList[id] = data;
    }
	
	static initMeterMainData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.MeterMainPart);
		//		data['x']【平移x（非实时赋值）】
        //		data['y']【平移y（非实时赋值）】
        //		data['anchor_x']【中心锚点x（非实时赋值）】
        //		data['anchor_y']【中心锚点y（非实时赋值）】
        //		data['visible']【可见】
        data.rotation = Number(dataFrom["RotateAngle"] || 0);
        data.meter_src = String(dataFrom["MeterImg"] || "");
        data.meter_src_mask = String(dataFrom["MeterBlockImg"] || "");
	}
	
    static initLevelData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.MeterSectionSet);
        //		data['level_max']【段上限】
        data['level_count'] = Number(dataFrom["SectionNum"] || 1);
        data['level_isLoop'] = eval(dataFrom["SectionCircle"] || 'true');
        data['shorten_mode'] = String(dataFrom["ShortenStyle"] || "匀速缩短");
		data['shorten_rate'] = Number(dataFrom["ElasticRate"] || 15);
        data['shorten_speed'] = Math.abs(Number(dataFrom["ShortenSpeed"] || 2.5));
        data['flow_enable'] = eval(dataFrom["EnableFlow"] || 'true');
        data['flow_dir'] = String(dataFrom["FlowDir"] || "从右往左");
        data['flow_speed'] = Number(dataFrom["FlowSpeed"] || 1.0);
        data['flow_srcMode'] = String(dataFrom["FlowStyle"] || "三等份划分");
        data['flow_levelLength'] = Number(dataFrom["FlowSecLength"] || 0);
    }

    static initGrooveMeterData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.GrooveMeterSet);
        data['leak_enable'] = eval(dataFrom["EnableGroove"] || "true");
        data['leak_src'] = String(dataFrom["GrooveImg"] || "");
        data['leak_speed'] = Number(dataFrom["ShortenSpeed"] || 15.0);
        data['leak_delay'] = Number(dataFrom["ShortenDelay"] || 0);
        data['leak_delayReflash'] = eval(dataFrom["RefreshDelay"] || "true");
    }

    static initEjectMeterData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.EjectMeterSet);
        data['spring_enable'] = eval(dataFrom["EnableEject"] || "true");
        data['spring_type'] = String(dataFrom["EjectMode"] || "当前参数条");
        data['spring_maxNum'] = Number(dataFrom["EjectNumMax"] || 30);
        if (dataFrom["EjectOrbit"] !== undefined && dataFrom["EjectOrbit"] !== "") {
            data['spring_ballistics'] = this.initEjectOrbitData(JSON.parse(dataFrom["EjectOrbit"]));
        } else {
            data['spring_ballistics'] = {};
        }
    }

    static initParticleData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.ParticleEffectSet);
        data['par_enable'] = eval(dataFrom["EnablePaticle"] || "true");
        data['par_src'] = String(dataFrom["PaticleImg"] || "");
        data['par_mode'] = String(dataFrom["PaticleMode"] || "底部出现");
        data['par_speedX'] = Number(dataFrom["PaticleXSpeed"] || 0);
        data['par_speedY'] = Number(dataFrom["PaticleYSpeed"] || -1.5);
        data['par_count'] = Number(dataFrom["PaticleNum"] || 20);
        data['par_life'] = Number(dataFrom["PaticleTime"] || 20);
    }

    static initCusorData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.CusorEffectSet);
        data['vernier_enable'] = eval(dataFrom["EnableCusor"] || "false");
        if (dataFrom["CusorImg"] !== undefined && dataFrom["CusorImg"] !== "") {
            data['vernier_src'] = JSON.parse(dataFrom["CusorImg"]);
        } else {
            data['vernier_src'] = [];
        }
        data['vernier_gif_interval'] = Number(dataFrom["CusorInterval"] || 0);
        data['vernier_gif_backrun'] = eval(dataFrom["CusorInvert"] || "true");
        data['vernier_x'] = Number(dataFrom["CusorOffsetX"] || 0);
        data['vernier_y'] = Number(dataFrom["CusorOffsetY"] || 0);
        data['vernier_mode'] = String(dataFrom["CusorMode"] || "一直显示");
        data['vernier_reset'] = eval(dataFrom["MultCusor"] || "false");
        data['vernier_maskCover'] = eval(dataFrom["BlockCusor"] || "false");
    }

    static initEjectOrbitData(dataFrom) {
        const data = {};
        //   移动（movement）
        //		data['movementNum']【数量】
        //		data['movementDelay']【延迟时间】
        data['movementTime'] = Number(dataFrom["MoveTime"] || 0);
        data['movementMode'] = String(dataFrom["MoveMode"] || "极坐标模式");
        //   极坐标（polar）
        this.initEjectOrbitPolarData(data, dataFrom);
        //   直角坐标（cartesian）
        this.initEjectOrbitCartData(data, dataFrom);
        //   轨道锚点（track） （关闭）
        //   两点式（twoPoint）（关闭）
        return data;
    }

    static initEjectOrbitPolarData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.PolarModeSet);
        data['polarSpeedType'] = String(dataFrom["SpeedType"] || "只初速度");
        data['polarSpeedBase'] = Number(dataFrom["StartSpeed"] || 0.0);
        data['polarSpeedRandom'] = Number(dataFrom["SpeedRandom"] || 0.0);
        data['polarSpeedInc'] = Number(dataFrom["Accelerate"] || 0);
        data['polarSpeedMax'] = Number(dataFrom["MaxSpeed"] || 0);
        data['polarSpeedMin'] = Number(dataFrom["MinSpeed"] || 0);
        data['polarDistanceFormula'] = JSON.parse(dataFrom["DistanceFormula"]) || 'return 0';
        data['polarDirType'] = String(dataFrom["DirType"] || "只初速度");
        data['polarDirFixed'] = Number(dataFrom["FixDir"] || 0);
        data['polarDirSectorFace'] = Number(dataFrom["SectorDir"] || 0);
        data['polarDirSectorDegree'] = Number(dataFrom["SectorAngle"] || 0);
        data['polarDirFormula'] = JSON.parse(dataFrom["DirFormula"]) || 'return 0';
    }

    static initEjectOrbitCartData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.CartModeSet);
        data['cartRotation'] = Number(dataFrom["WholeAngle"] || 0.0);
        data['cartXSpeedType'] = String(dataFrom["SpeedTypeX"] || "只初速度");
        data['cartXSpeedBase'] = Number(dataFrom["StartSpeedX"] || 0.0);
        data['cartXSpeedRandom'] = Number(dataFrom["SpeedRandomX"] || 0.0);
        data['cartXSpeedInc'] = Number(dataFrom["AccelerateX"] || 0);
        data['cartXSpeedMax'] = Number(dataFrom["MaxSpeedX"] || 0);
        data['cartXSpeedMin'] = Number(dataFrom["MinSpeedX"] || 0);
        data['cartXDistanceFormula'] = JSON.parse(dataFrom["DistanceFormulaX"]) || 'return 0';
        data['cartYSpeedType'] = String(dataFrom["SpeedTypeY"] || "只初速度");
        data['cartYSpeedBase'] = Number(dataFrom["StartSpeedY"] || 0.0);
        data['cartYSpeedRandom'] = Number(dataFrom["SpeedRandomY"] || 0.0);
        data['cartYSpeedInc'] = Number(dataFrom["AccelerateY"] || 0);
        data['cartYSpeedMax'] = Number(dataFrom["MaxSpeedY"] || 0);
        data['cartYSpeedMin'] = Number(dataFrom["MinSpeedY"] || 0);
        data['cartYDistanceFormula'] = JSON.parse(dataFrom["DistanceFormulaY"]) || 'return 0';
    }

    static gaugeNumberDatabaseCreate() {
        GF.COSG.GaugeNumberSetList = [null];
        const list = GF.Param.COSGGaugeNumberSet;
        for (let i = 1; i <= list.length; i++) {
            let gmData = JSON.parse(list[i - 1] || null);
            if (gmData) {
                this.initGaugeNumberData(i, gmData);
            }
        }
    }

    static initGaugeNumberData(id, dataFrom) {
        const data = {};
        // > 主体
		this.initNumberMainData(data, dataFrom);
        // > 符号
		this.initNumberSymbolData(data, dataFrom);
        // > 排列
		this.initNumberAlignData(data, dataFrom);
        // > 滚动效果
		this.initNumberScollData(data, dataFrom);
        // > 额定值
		this.initNumberRatingData(data, dataFrom);
        GF.COSG.GaugeNumberSetList[id] = data;
    }
	
	static initNumberMainData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberMainPart);
		//		data['x']【平移x（非实时赋值）】
        //		data['y']【平移y（非实时赋值）】
        //		data['visible']【可见】
        data['rotation'] = Number(dataFrom["RotateAngle"] || 0);
        data['symbol_src'] = String(dataFrom["BaseSymbolImg"] || "");
        data['symbolEx_src'] = String(dataFrom["ExSymbolImg"] || "");
	}
	
	static initNumberSymbolData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberSignSet);
		data['symbol_hasNegative'] = eval(dataFrom["ShowMinus"] || "true");
        data['symbol_prefix'] = String(dataFrom["ExSignPre"] || "");
        data['symbol_suffix'] = String(dataFrom["ExSignSuf"] || "");
	}
	
	static initNumberAlignData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberAlignSet);
		data['section_align'] = String(dataFrom["AlignType"] || "右对齐");
        data['section_spriteLength'] = Number(dataFrom["MaxSignNum"] || 20);
        data['section_interval'] = Number(dataFrom["SignSpace"] || 0);
        data['section_widthMode'] = String(dataFrom["WidthType"] || "不限制宽度");
        data['section_widthLimit'] = Number(dataFrom["LimitWidth"] || 300);
	}
	
	static initNumberScollData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberScrollSet);
		data['rolling_mode'] = String(dataFrom["ScrollType"] || "弹性滚动");
        data['rolling_speed'] = Number(dataFrom["ScrollSpeed"] || 10.0);
	}
	
	static initNumberRatingData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberRatingSet);
		data['specified_enable'] = eval(dataFrom["EnableRating"] || "false");
        data['specified_visible'] = eval(dataFrom["ShowRating"] || "false");
        data['specified_conditionNum'] = Number(dataFrom["DefaultRating"] || 100);
        data['specified_conditionType'] = String(dataFrom["RatingCondition"] || "大于等于额定值时");
        data['specified_remainChange'] = eval(dataFrom["LimitRating"] || "true");
        data['specified_changeType'] = String(dataFrom["RatingSign"] || "不变化");
        data['specified_symbol_src'] = String(dataFrom["RatingSignImg"] || "");
        data['specified_symbolEx_src'] = String(dataFrom["RatingSignImgEx"] || "");
	}
	
	static gaugeDatabaseCreate() {
        GF.COSG.GaugeSetList = [null];
        const list = GF.Param.COSGGaugeSet;
        for (let i = 1; i <= list.length; i++) {
            let gmData = JSON.parse(list[i - 1] || null);
            if (gmData) {
                this.initGaugeData(i, gmData);
            }
        }
    }
	
	static initGaugeData(id, dataFrom) {
        const data = {};
		// > 参数条
		this.initGaugeMeterSetData(data, dataFrom);
        // > 前景
		this.initGaugeForgroundData(data, dataFrom);
        // > 参数数字
		this.initGaugeNumberSetData(data, dataFrom);
        // > 名称显示
		this.initGaugeNameSetData(data, dataFrom);
        GF.COSG.GaugeSetList[id] = data;
	}
	
	static initGaugeMeterSetData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.MeterSet);
		data.meter_enable = eval(dataFrom['Show Meter']);
        data.meter_id = Number(dataFrom['Meter Style']);
        data.meter_x = Number(dataFrom['Meter X']);
		data.meter_y = Number(dataFrom['Meter Y']);
		data.meter_filling_enable = eval(dataFrom['Enable Refill Ani']);
		data.meter_filling_mode = String(dataFrom['Refill Type']);
        data.meter_filling_time = Number(dataFrom['Refill Time']);
		data.meter_filling_delay = Number(dataFrom['Refill Delay']);
	}
	
	static initGaugeForgroundData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.ForegroundSet);
		data.foreground_src = String(dataFrom['Foreground File']);
        data.foreground_x = Number(dataFrom['Foreground X']);
		data.foreground_y = Number(dataFrom['Foreground Y']);
	}
	
	static initGaugeNumberSetData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NumberSet);
		data.number_visible = eval(dataFrom['Show Number']);
        data.number_id = Number(dataFrom['Number Style']);
        data.number_x = Number(dataFrom['Number X']);
		data.number_y = Number(dataFrom['Number Y']);
	}
	
	static initGaugeNameSetData(data, dataWhole) {
        const dataFrom = JSON.parse(dataWhole.NameSet);
		data.name_show = eval(dataFrom['Show Name']);
        data.name_x = Number(dataFrom['Name X']);
		data.name_y = Number(dataFrom['Name Y']);
		data.name_font_size = Number(dataFrom['Name Font Size']);
		data.name_align = String(dataFrom['Name Align']);
	}
}
GaugeDataManger.initDatabase();

//=============================================================================
// Sprite_SeniorGaugeMeter
//=============================================================================

class Sprite_SeniorGaugeMeter extends Sprite {
    initialize(data) {
        super.initialize();
        this._drill_data = JsonEx.makeDeepCopy(data);
        this.drill_initData(); //初始化数据
        this.drill_initSprite(); //初始化对象
    }

    update() {
        super.update();
        this.drill_updateDelayingInit(); //延迟初始化
        this.drill_updateSprite(); //帧刷新对象
    }

    drill_COSG_reflashValue(value) {
        this._drill_new_value = value;
    }

    drill_COSG_setVisible(visible) {
        const data = this._drill_data;
        data['visible'] = visible;
    }

    drill_COSG_setLevelMax(level_max) {
        const data = this._drill_data;
        data['level_max'] = level_max;
    }

    drill_initData() {
        const data = this._drill_data;

        // > 默认值
        data['enable'] = true;
        if (data['x'] == undefined) {
            data['x'] = 0
        }; //主体 - 平移x（非实时赋值）
        if (data['y'] == undefined) {
            data['y'] = 0
        }; //主体 - 平移y（非实时赋值）
        if (data['anchor_x'] == undefined) {
            data['anchor_x'] = 0
        }; //主体 - 中心锚点x（非实时赋值）
        if (data['anchor_y'] == undefined) {
            data['anchor_y'] = 0
        }; //主体 - 中心锚点y（非实时赋值）
        if (data['rotation'] == undefined) {
            data['rotation'] = 0
        }; //主体 - 旋转（非实时赋值）
        if (data['visible'] == undefined) {
            data['visible'] = true
        }; //主体 - 可见
        if (data['meter_src'] == undefined) {
            data['meter_src'] = ""
        }; //主体 - 资源
        if (data['meter_src_mask'] == undefined) {
            data['meter_src_mask'] = ""
        }; //主体 - 遮罩

        if (data['level_max'] == undefined) {
            data['level_max'] = 100
        }; //分段条 - 单段最大值（段上限）
        if (data['level_count'] == undefined) {
            data['level_count'] = 1
        }; //分段条 - 段数量
        if (data['level_isLoop'] == undefined) {
            data['level_isLoop'] = false
        }; //分段条 - 段是否循环
        if (data['shorten_mode'] == undefined) {
            data['shorten_mode'] = "匀速缩短"
        }; //分段条 - 缩短方式
		if (data['shorten_rate'] == undefined) {
            data['shorten_rate'] = 15
        }; //分段条 - 弹性缩短比
        if (data['shorten_speed'] == undefined) {
            data['shorten_speed'] = 5.0
        }; //分段条 - 缩短速度
        if (data['flow_enable'] == undefined) {
            data['flow_enable'] = true
        }; //分段条 - 是否流动
        if (data['flow_dir'] == undefined) {
            data['flow_dir'] = "从右往左"
        }; //分段条 - 流动方向
        if (data['flow_speed'] == undefined) {
            data['flow_speed'] = 0.5
        }; //分段条 - 流动速度
        if (data['flow_srcMode'] == undefined) {
            data['flow_srcMode'] = "三等份划分"
        }; //分段条 - 流动段划分模式
        if (data['flow_levelLength'] == undefined) {
            data['flow_levelLength'] = 0
        }; //分段条 - 段长度

        if (data['leak_enable'] == undefined) {
            data['leak_enable'] = false
        }; //凹槽条 - 启用
        if (data['leak_src'] == undefined) {
            data['leak_src'] = ""
        }; //凹槽条 - 资源
        if (data['leak_speed'] == undefined) {
            data['leak_speed'] = 4.0
        }; //凹槽条 - 扣除速度
        if (data['leak_delay'] == undefined) {
            data['leak_delay'] = 0.0
        }; //凹槽条 - 扣除延迟
        if (data['leak_delayReflash'] == undefined) {
            data['leak_delayReflash'] = true
        }; //凹槽条 - 连续受伤是否刷新延迟

        if (data['spring_enable'] == undefined) {
            data['spring_enable'] = false
        }; //弹出条 - 启用
        if (data['spring_type'] == undefined) {
            data['spring_type'] = "当前参数条"
        }; //弹出条 - 块模式
        if (data['spring_ballistics'] == undefined) {
            data['spring_ballistics'] = {}
        }; //弹出条 - 弹道
        if (data['spring_maxNum'] == undefined) {
            data['spring_maxNum'] = 30
        }; //弹出条 - 最大数量

        if (data['par_enable'] == undefined) {
            data['par_enable'] = false
        }; //粒子 - 启用
        if (data['par_src'] == undefined) {
            data['par_src'] = ""
        }; //粒子 - 资源
        if (data['par_mode'] == undefined) {
            data['par_mode'] = "底部出现"
        }; //粒子 - 出现模式
        if (data['par_speedX'] == undefined) {
            data['par_speedX'] = 0
        }; //粒子 - X速度
        if (data['par_speedY'] == undefined) {
            data['par_speedY'] = -1.5
        }; //粒子 - Y速度
        if (data['par_count'] == undefined) {
            data['par_count'] = 20
        }; //粒子 - 数量
        if (data['par_life'] == undefined) {
            data['par_life'] = 20
        }; //粒子 - 持续时间

        if (data['vernier_enable'] == undefined) {
            data['vernier_enable'] = false
        }; //游标 - 启用
        if (data['vernier_src'] == undefined) {
            data['vernier_src'] = []
        }; //游标 - 资源
        if (data['vernier_gif_interval'] == undefined) {
            data['vernier_gif_interval'] = 4
        }; //游标 - 动画帧间隔
        if (data['vernier_gif_backrun'] == undefined) {
            data['vernier_gif_backrun'] = false
        }; //游标 - 是否倒放
        if (data['vernier_x'] == undefined) {
            data['vernier_x'] = 0
        }; //游标 - x
        if (data['vernier_y'] == undefined) {
            data['vernier_y'] = 0
        }; //游标 - y
        if (data['vernier_mode'] == undefined) {
            data['vernier_mode'] = "一直显示"
        }; //游标 - 显示模式
        if (data['vernier_reset'] == undefined) {
            data['vernier_reset'] = false
        }; //游标 - 多层重置
        if (data['vernier_maskCover'] == undefined) {
            data['vernier_maskCover'] = false
        }; //游标 - 遮罩遮挡

        if (data['filling_enable'] == undefined) {
            data['filling_enable'] = false
        }; //加满动画 - 启用
        if (data['filling_mode'] == undefined) {
            data['filling_mode'] = "匀速加满"
        }; //加满动画 - 加满方式
        if (data['filling_time'] == undefined) {
            data['filling_time'] = 60
        }; //加满动画 - 持续时间
        if (data['filling_delay'] == undefined) {
            data['filling_delay'] = 10
        }; //加满动画 - 动画延迟
    }

    drill_initSprite() {
        const data = this._drill_data;

        // > 私有对象初始化
        this._drill_new_value = 0; //变化因子 - 新变化参数【使用时只读】
        this._drill_cur_value = 0; //变化因子 - 当前参数【使用时只读】

        this._drill_meter_bitmap = null; //主体 - bitmap
        this._drill_radian = data['rotation'] / 180 * Math.PI; //主体 - 整体旋转弧度
        this._layer_outer = null; //层级 - 外层
        this._layer_context = null; //层级 - 内容层
        this._layer_contextMask = null; //层级 - 内容层遮罩

        this._drill_sectionUp_sprite = null; //分段条 - 贴图_上
        this._drill_sectionDown_sprite = null; //分段条 - 贴图_下
        this._drill_level_needInit = true; //分段条 - 初始化 锁
        this._drill_level_bitmaps = []; //分段条 - bitmap
        this._drill_level_isBlocked = false; //分段条 - 层级变换阻塞（每次层级降1时自动阻塞）
        this._drill_level_cur_value = 0; //分段条 - 层级条缓冲值
        this._drill_cur_level = -1; //分段条 - 当前所处的层级

        this._drill_leak_sprite = null; //凹槽条 - 贴图
        this._drill_leak_cur_value = 0; //凹槽条 - 缓冲值
        this._drill_leak_time = 0; //凹槽条 - 延时时间

        this._drill_spring_needInit = true; //弹出条 - 初始化 锁
        this._drill_spring_tank = []; //弹出条 - 贴图容器
        this._drill_spring_cur_tankIndex = 0; //弹出条 - 索引下标
        this._drill_spring_cur_value = 0; //弹出条 - 缓冲值

        this._drill_par_needInit = true; //粒子 - 初始化 锁
        this._drill_par_spriteTank = []; //粒子 - 贴图容器
        this._drill_par_bitmap = null; //粒子 - bitmap

        this._drill_vernier_needInit = true; //游标 - 初始化 锁
        this._drill_vernier_sprite = null; //游标 - 贴图
        this._drill_vernier_bitmaps = []; //游标 - bitmap
        this._drill_vernier_flash = 1; //游标 - 闪烁方向
        this._drill_vernier_time = 0; //游标 - 当前时间
        this._drill_vernier_cur = 0; //游标 - 当前动画帧

        this._drill_filling_needInit = true; //加满动画 - 初始化 锁
        this._drill_filling_mask = null; //加满动画 - 贴图


        // > 主体属性
        this._drill_attr_needInit = true;
        this.x = data['x'];
        this.y = data['y'];
        this.anchor.x = data['anchor_x'];
        this.anchor.y = data['anchor_y'];
        this.rotation = this._drill_radian;
        this.visible = false;

        // > 创建函数
        this.drill_createLayer(); //创建 - 层级
        this.drill_createSection(); //创建 - 分段条
        this.drill_createLeak(); //创建 - 凹槽条
        //创建 - 弹出条（无）
        this.drill_createParticle(); //创建 - 粒子
        this.drill_createVernier(); //创建 - 游标
        //创建 - 加满动画（无）
    }

    drill_createLayer() {
        // > 层级初始化
        this._layer_contextMask = new Sprite(); //内容层遮罩
        this._layer_context = new Sprite(); //内容层
        this.addChild(this._layer_context); //
        this._layer_outer = new Sprite(); //外层
        this.addChild(this._layer_outer); //

        // > 内容层遮罩初始化
        var data = this._drill_data;
        if (data['meter_src_mask'] !== "") {
            this._layer_contextMask.bitmap = ImageManager.loadCustomBitmap(data['meter_src_mask']);
            this._layer_context.addChild(this._layer_contextMask);
            this._layer_context.mask = this._layer_contextMask;
        }
    }

    drill_createSection() {
        // > 主体bitmap
        var data = this._drill_data;
        this._drill_meter_bitmap = ImageManager.loadCustomBitmap(data['meter_src']);

        // > 分段条初始化
        this._drill_sectionUp_sprite = new Sprite(); //分段条_上
        this._drill_sectionDown_sprite = new Sprite(); //分段条_下
        this._drill_sectionUp_sprite.zIndex = 30;
        this._drill_sectionDown_sprite.zIndex = 10;
        this._layer_context.addChild(this._drill_sectionUp_sprite);
        this._layer_context.addChild(this._drill_sectionDown_sprite);

        // > 流动位置
        this._drill_sectionUp_sprite_move = 0; //上条初始位置
        this._drill_sectionDown_sprite_move = 0; //下条初始位置
    }

    drill_createLeak() {
        this._drill_leak_sprite = new Sprite();
        this._layer_context.addChild(this._drill_leak_sprite); //必须创建一个贴图，不能独立

        var data = this._drill_data;
        if (data['leak_enable'] == true) {
            this._drill_leak_sprite.bitmap = ImageManager.loadCustomBitmap(data['leak_src']);
            this._drill_leak_sprite.setFrame(0, 0, 0, 0);
        }
    }

    drill_createParticle() {
        var data = this._drill_data;
        if (!data['par_enable']) {
            return;
        }

        this._drill_par_bitmap = ImageManager.loadCustomBitmap( data['par_src']);
    }

    drill_createVernier() {
        var data = this._drill_data;
        if (data['vernier_enable'] == false) {
            return;
        }

        this._drill_vernier_bitmaps = [];
        for (var j = 0; j < data['vernier_src'].length; j++) {
            this._drill_vernier_bitmaps[j] = ImageManager.loadCustomBitmap(data['vernier_src'][j]);
        }
    }

    drill_updateDelayingInit() {
        var data = this._drill_data;

        //加满动画
        if (this.drill_isLevelsReady() && this._drill_filling_needInit) {
            this._drill_filling_needInit = false;
            this.drill_delayingInitFilling();
        }
        //主体
        if (this.drill_isLevelsReady() && this._drill_attr_needInit) {
            this._drill_attr_needInit = false;
            var point = this.drill_COSG_getFixPointInAnchor(
                    0.0, 0.0,
                    data['anchor_x'], data['anchor_y'],
                    this.drill_levelWidth(), this.drill_levelHeight(),
                    this._drill_radian,
                    1.0, 1.0);
            this.x = data['x'] + point.x;
            this.y = data['y'] + point.y;
        }
        //显示
        if (this.drill_isLevelsReady() && this.visible != data['visible']) {
            this.visible = data['visible'];
        }
        //分段条
        if (this._drill_meter_bitmap.isReady() && this._drill_level_needInit) {
            this._drill_level_needInit = false;
            this.drill_delayingInitLevel();
        }
        //弹出条
        if (this.drill_isLevelsReady() && this._drill_spring_needInit) {
            this._drill_spring_needInit = false;
            this.drill_delayingInitSpring();
        }
        //粒子
        if (this._drill_par_bitmap && this._drill_par_bitmap.isReady() && this._drill_par_needInit) {
            this._drill_par_needInit = false;
            this.drill_delayingInitParticle();
        }
        //游标
        if (this._drill_vernier_bitmaps.length != 0 && this._drill_vernier_bitmaps[0].isReady() && this._drill_vernier_needInit) {
            this._drill_vernier_needInit = false;
            this.drill_delayingInitVernier();
        }
    }

    drill_delayingInitLevel() {
        var data = this._drill_data;
        this._drill_level_bitmaps = [];
        for (var i = 0; i < data['level_count']; i++) {

            // > 资源切割（分段条）
            var cut_height = this.drill_meterHeight() / data['level_count'];
            var new_bitmap = new Bitmap(this.drill_meterWidth(), cut_height);
            var x = 0;
            var y = cut_height * i;
            var w = this.drill_meterWidth(); //总宽
            var h = cut_height;
            new_bitmap.blt(this._drill_meter_bitmap, x, y, w, h, 0, 0, w, h);
            this._drill_level_bitmaps.push(new_bitmap);

        }
    }

    drill_delayingInitSpring() {
        var data = this._drill_data;
        if (data['spring_enable'] == false) {
            return;
        }
        this._drill_spring_tank = [];
        for (var j = 0; j < data['spring_maxNum']; j++) {

            // > 弹出条初始化（与分段条宽度高度一样）
            var cut_height = this.drill_meterHeight() / data['level_count'];
            var temp_sprite = new Sprite_SeniorGaugeMeterEject(this.drill_meterWidth(), cut_height);
            this._drill_spring_tank[j] = temp_sprite;
            this._layer_outer.addChild(temp_sprite);
        }
    }

    drill_delayingInitParticle() {
        var data = this._drill_data;
        if (data['par_enable'] == false) {
            return;
        }
        for (var j = 0; j < data['par_count']; j++) {
            var temp_sprite = new Sprite(this._drill_par_bitmap);
            temp_sprite.anchor.x = 0.5;
            temp_sprite.anchor.y = 0.5;
            temp_sprite.opacity = 0;
            temp_sprite.cur_life = Math.random() * data['par_life'];
            temp_sprite.cur_random = 0.3 * (Math.random() - 0.5) //随机因子
                temp_sprite.zIndex = 40;

            this._drill_par_spriteTank.push(temp_sprite);
            this._layer_context.addChild(temp_sprite);
        }
    }

    drill_delayingInitVernier() {
        var data = this._drill_data;
        if (data['vernier_enable'] == false) {
            return;
        }

        var temp_sprite = new Sprite(this._drill_vernier_bitmaps[0]);
        temp_sprite.anchor.x = 0.5;
        temp_sprite.anchor.y = 0.5;
        temp_sprite.opacity = 0;

        this._drill_vernier_sprite = temp_sprite;
        if (data['vernier_maskCover'] == true) {
            temp_sprite.zIndex = 50;
            this._layer_context.addChild(temp_sprite); //（处于内容层，会被遮挡）
        } else {
            temp_sprite.zIndex = 10;
            this._layer_outer.addChild(temp_sprite); //（游标位于弹出层）
        }
    }

    drill_delayingInitFilling() {
        var data = this._drill_data;
        if (data['filling_enable'] == false) {
            return;
        }

        var filling_data = {};
        filling_data['x'] = 0;
        filling_data['y'] = 0;
        filling_data['w'] = this.drill_levelWidth();
        filling_data['h'] = this.drill_levelHeight();
        filling_data['mode'] = data['filling_mode'];
        filling_data['time'] = data['filling_time'];
        filling_data['delay'] = data['filling_delay'];

        var temp_mask = new Sprite_SeniorGaugeMeterMask(filling_data);
        this.mask = temp_mask;
        this.addChild(temp_mask);
        this._drill_filling_mask = temp_mask;
    }

    drill_updateSprite() {
        var data = this._drill_data;
        if (!this.drill_isLevelsReady()) {
            return;
        }
        this.drill_updateSpringShowing(); //弹出条（在上段下段切换前，要捕获bitmap对象）
        this.drill_updateLevelValue(); //分段条 - 段值
        this.drill_updateSection(); //分段条 - 层级变换
        this.drill_updateSectionLength(); //分段条 - 长度+流动

        this.drill_updateLeakingValue(); //凹槽条数值
        this.drill_updateLeakingMeter(); //凹槽条绘制
        this.drill_updateLeakingBlock(); //段阻塞

        this.drill_updateParticle(); //粒子
        this.drill_updateVernier(); //游标
        this.drill_updateFilling(); //加满动画

        this._drill_cur_value = this._drill_new_value; //变化因子
    }

    drill_updateLevelValue() {
        var data = this._drill_data;
        if (this._drill_level_isBlocked) {
            return;
        } //阻塞时，分段条不变

        // > 缩短效果 - 瞬间缩短
        if (data['shorten_mode'] == "瞬间缩短" || (data['shorten_mode'] == "匀速缩短" && data['shorten_speed'] == 0)) {
            this._drill_level_cur_value = this._drill_new_value;
		// > 缩短效果 - 弹性缩短
		} else if(data['shorten_mode'] == "弹性缩短"){
            if (this._drill_level_cur_value < this._drill_new_value) {
                var diff = Math.max((this._drill_new_value - this._drill_level_cur_value) / data['shorten_rate'], 1);
                this._drill_level_cur_value += diff;
                if (this._drill_level_cur_value > this._drill_new_value) {
                    this._drill_level_cur_value = this._drill_new_value;
                }
            }
            if (this._drill_level_cur_value > this._drill_new_value) {
                var diff = Math.max((this._drill_level_cur_value - this._drill_new_value) / data['shorten_rate'], 1);
                this._drill_level_cur_value -= diff;
                if (this._drill_level_cur_value < this._drill_new_value) {
                    this._drill_level_cur_value = this._drill_new_value;
                }
            }
		// > 缩短效果 - 匀速缩短
		} else if(data['shorten_mode'] == "匀速缩短"){
			const ww = this.drill_meterWidth();
			if(ww) {
				if(this._drill_level_cur_value < this._drill_new_value){
					var diff = this._drill_new_value - this._drill_level_cur_value;
					var speed = data['level_max'] / ww * data['shorten_speed'];
					if(diff > data['level_max'] ){
						speed = speed * diff/data['level_max'];		//（如果差值远远大于匀速缩短，则加大缩短倍率）
					}
					this._drill_level_cur_value += speed;
					if( this._drill_level_cur_value > this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				} else if( this._drill_level_cur_value > this._drill_new_value){
					var diff = this._drill_level_cur_value - this._drill_new_value;
					var speed = data['level_max'] / ww * data['shorten_speed'];
					if( diff > data['level_max'] ){
						speed = speed * diff/data['level_max'];		//（如果差值远远大于匀速缩短，则加大缩短倍率）
					}
					this._drill_level_cur_value -= speed;
					if( this._drill_level_cur_value < this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				}
			}
		}
		
        // #阻塞 - 小于指定层级最大值时，阻塞
        var cur_max = this._drill_cur_level * data['level_max'] - 1;
        if (this._drill_level_cur_value < cur_max) {
            this._drill_level_cur_value = cur_max;
            //alert(cur_max);
        }
    }

    drill_updateSection() {
        var data = this._drill_data;

        var a1 = Math.floor(this._drill_level_cur_value / data['level_max']);
        var a2 = Math.floor(this._drill_level_cur_value % data['level_max']);

        if (this._drill_cur_level != a1) {

            // #层级阻塞
            // （小于层级时，必然阻塞。后面根据条件解除。）
            if (this._drill_cur_level > a1) {
                this._drill_cur_level -= 1;
                this._drill_level_isBlocked = true;
            }
            if (this._drill_cur_level < a1) {
                this._drill_cur_level = a1;
                this._drill_level_isBlocked = false;
            }

            // #层级变换
            if (a1 == 0) {
                //只剩最后一层时
                this._drill_sectionUp_sprite.bitmap = this._drill_level_bitmaps[0];
                this._drill_sectionDown_sprite.bitmap = null;
            } else if (a1 >= data['level_count']) {
                //参数值超过最大层时
                if (data['level_isLoop']) {
                    //循环色
                    var a3 = a1 % data['level_count'];
                    if (a3 == 0) {
                        this._drill_sectionUp_sprite.bitmap = this._drill_level_bitmaps[0];
                        this._drill_sectionDown_sprite.bitmap = this._drill_level_bitmaps[data['level_count'] - 1];
                    } else {
                        this._drill_sectionUp_sprite.bitmap = this._drill_level_bitmaps[a3];
                        this._drill_sectionDown_sprite.bitmap = this._drill_level_bitmaps[a3 - 1];
                    }
                } else {
                    //不循环色
                    this._drill_sectionUp_sprite.bitmap = this._drill_level_bitmaps[data['level_count'] - 1];
                    this._drill_sectionDown_sprite.bitmap = this._drill_level_bitmaps[data['level_count'] - 1];
                }
            } else {
                //	正常层
                this._drill_sectionUp_sprite.bitmap = this._drill_level_bitmaps[a1];
                this._drill_sectionDown_sprite.bitmap = this._drill_level_bitmaps[a1 - 1];
            }

        }
    }

    drill_updateSectionLength() {
        var data = this._drill_data;
        var a1 = Math.floor(this._drill_level_cur_value / data['level_max']);
        var a2 = Math.floor(this._drill_level_cur_value % data['level_max']);

        // > 长度计算
        var ww = this.drill_levelWidth() / data['level_max'] * a2;
        if (a2 == data['level_max'] - 1) {
            ww += 1
        } //799这种差一点点的参数值，补满条

        // > 流动效果
        var mw = Math.floor(this.drill_meterWidth());
        var w = Math.floor(this.drill_levelWidth());
        if (data['flow_enable']) {
            var f_speed = Math.abs(data['flow_speed']);
            if (data['flow_dir'] == "从左往右") {
                f_speed = -1 * f_speed;
            }
            if (f_speed > 0) {
                this._drill_sectionUp_sprite_move += f_speed;
                if (this._drill_sectionUp_sprite_move >= mw - w) {
                    this._drill_sectionUp_sprite_move = 0;
                }
            } else if (f_speed < 0) {
                this._drill_sectionUp_sprite_move += f_speed;
                if (this._drill_sectionUp_sprite_move <= 0) {
                    this._drill_sectionUp_sprite_move = mw - w;
                }
            }
            if (f_speed > 0) {
                this._drill_sectionDown_sprite_move += f_speed;
                if (this._drill_sectionDown_sprite_move >= mw - w) {
                    this._drill_sectionDown_sprite_move = 0;
                }
            } else if (f_speed < 0) {
                this._drill_sectionDown_sprite_move += f_speed;
                if (this._drill_sectionDown_sprite_move <= 0) {
                    this._drill_sectionDown_sprite_move = mw - w;
                }
            }
        }

        // > 上条/下条长度
        if (this._drill_sectionUp_sprite.bitmap != null) { //（流动和长度都只能通过setFrame一个函数控制，不能分开）
            this._drill_sectionUp_sprite.setFrame(this._drill_sectionUp_sprite_move, 0, ww, this.drill_levelHeight());
        }
        if (this._drill_sectionDown_sprite.bitmap != null) {
            this._drill_sectionDown_sprite.setFrame(this._drill_sectionDown_sprite_move, 0, w, this.drill_levelHeight());
        }
    }

    drill_updateLeakingValue() {
        var data = this._drill_data;

        // > 凹槽条持平
        if (this._drill_leak_cur_value <= this._drill_level_cur_value) {
            this._drill_leak_cur_value = this._drill_level_cur_value;
            this._drill_leak_time = data['leak_delay'];
        }

        // > 延迟 - 连续受伤刷新延迟
        if (data['leak_delayReflash'] &&
            this._drill_new_value != this._drill_cur_value) {
            this._drill_leak_time = data['leak_delay'];
        }

        // > 延迟 - 达到时间后开始缩短
        this._drill_leak_time -= 1;
        if (this._drill_leak_time <= 0) {
            if (this._drill_leak_cur_value > this._drill_level_cur_value) {
                this._drill_leak_cur_value -= (data['leak_speed'] * data['level_max'] / this.drill_levelWidth());
            }
        }

        // > 阻塞 - 凹槽条动作
        // （整段扣完，但是凹槽仍在，这时候需要等凹槽结束缩短后进行下一轮伤害）
        var a1 = Math.floor(this._drill_leak_cur_value / data['level_max']);
        var a2 = Math.floor(this._drill_leak_cur_value % data['level_max']);

        if (this._drill_level_isBlocked == true) { //阻塞时，解除等待延迟
            this._drill_leak_time = 0;
        }
        if (a2 == 0 && this._drill_leak_cur_value > 0 &&
            this._drill_leak_cur_value > this._drill_level_cur_value) { //如果当前层耗尽，强制减一，确保下一层的凹槽是满的
            this._drill_leak_cur_value -= 1;
        }
    }

    drill_updateLeakingMeter() {
        var data = this._drill_data;

        // > 凹槽条长度
        var a1 = Math.floor(this._drill_leak_cur_value / data['level_max']);
        var a2 = Math.floor(this._drill_leak_cur_value % data['level_max']);
        var ww = this.drill_levelWidth() / data['level_max'] * a2;

        if (this._drill_leak_sprite.bitmap != null) {
            this._drill_leak_sprite.setFrame(0, 0, ww, this.drill_levelHeight());
        }
    }

    drill_updateLeakingBlock() {
        var data = this._drill_data;

        // #凹槽条 - 流逝完毕后结束阻塞
        if (data['leak_enable'] == false || this._drill_leak_cur_value <= this._drill_level_cur_value) {
            this._drill_level_isBlocked = false;
        }

        // #排序 - 阻塞时的凹槽条位置变化
        if (this._drill_level_isBlocked == true && this._drill_leak_sprite.zIndex != 40) {
            this._drill_leak_sprite.zIndex = 40;
            this.drill_COSG_sortByZIndex();
        }
        if (this._drill_level_isBlocked == false && this._drill_leak_sprite.zIndex != 20) {
            this._drill_leak_sprite.zIndex = 20;
            this.drill_COSG_sortByZIndex();
        }
    }

    drill_updateSpringShowing() {
        var data = this._drill_data;
        if (data['spring_enable'] == false) {
            return;
        }

        // > 参数增加
        if (this._drill_spring_cur_value < this._drill_new_value) {
            // ... 暂不操作
        }

        // > 参数减少
        if (this._drill_spring_cur_value > this._drill_new_value) {

            var w1 = Math.floor(this._drill_spring_cur_value % data['level_max']); //原切点（参数值）
            var w2 = Math.floor(this._drill_new_value % data['level_max']); //新切点（参数值）
            w1 = this.drill_levelWidth() / data['level_max'] * w1; //原切点（长度值）
            w2 = this.drill_levelWidth() / data['level_max'] * w2; //新切点（长度值）

            // > 当前段减少
            if (w1 > w2) {
                var spring_bitmap = this._drill_sectionUp_sprite.bitmap;
                var spring_data = {}; //重新组装必要参数
                spring_data['x'] = w2;
                spring_data['y'] = 0;
                spring_data['w'] = w1 - w2; //弹出条宽度
                spring_data['h'] = this.drill_levelHeight();
                spring_data['type'] = data['spring_type'];
                spring_data['ballistics'] = data['spring_ballistics'];
                var spring_sprite = this._drill_spring_tank[this._drill_spring_cur_tankIndex];
                spring_sprite.drill_resetData(spring_data, spring_bitmap);

                this._drill_spring_cur_tankIndex += 1;
                this._drill_spring_cur_tankIndex %= data['spring_maxNum'];

                // > 段直接减少到下一段
            } else if (w2 > w1) {
                var spring_bitmap = this._drill_sectionUp_sprite.bitmap;
                var spring_data = {}; //头部的碎片
                spring_data['x'] = 0;
                spring_data['y'] = 0;
                spring_data['w'] = w1;
                spring_data['h'] = this.drill_levelHeight();
                spring_data['type'] = data['spring_type'];
                spring_data['ballistics'] = data['spring_ballistics'];
                var spring_sprite = this._drill_spring_tank[this._drill_spring_cur_tankIndex];
                spring_sprite.drill_resetData(spring_data, spring_bitmap);
                this._drill_spring_cur_tankIndex += 1;
                this._drill_spring_cur_tankIndex %= data['spring_maxNum'];

                var spring_bitmap = this._drill_sectionDown_sprite.bitmap;
                var spring_data = {}; //尾部的碎片
                spring_data['x'] = w2;
                spring_data['y'] = 0;
                spring_data['w'] = this.drill_levelWidth() - w2;
                spring_data['h'] = this.drill_levelHeight();
                spring_data['type'] = data['spring_type'];
                spring_data['ballistics'] = data['spring_ballistics'];
                var spring_sprite = this._drill_spring_tank[this._drill_spring_cur_tankIndex];
                spring_sprite.drill_resetData(spring_data, spring_bitmap);
                this._drill_spring_cur_tankIndex += 1;
                this._drill_spring_cur_tankIndex %= data['spring_maxNum'];
            }
        }

        // > 控制参数
        if (this._drill_spring_cur_value != this._drill_new_value) {
            this._drill_spring_cur_value = this._drill_new_value;
        }
    }

    drill_updateParticle() {
        var data = this._drill_data;
        if (data['par_enable'] == false) {
            return;
        }
        if (!this._drill_par_bitmap) {
            return;
        }
        if (!this._drill_par_bitmap.isReady()) {
            return;
        }

        var pw = this._drill_par_bitmap.width;
        var ph = this._drill_par_bitmap.height;

        for (var i = 0; i < this._drill_par_spriteTank.length; i++) {
            var par = this._drill_par_spriteTank[i];

            if (par.x < 0 - pw || //超出边界判定
                par.x > this.drill_levelWidthInLeft() + pw ||
                par.y < 0 - ph ||
                par.y > this.drill_levelHeight() + ph) {
                par.cur_life -= par.cur_life / 3;
            }

            par.x += (data['par_speedX'] + par.cur_random);
            par.y += (data['par_speedY'] + par.cur_random);
            par.cur_life -= 1;
            if (data['par_mode'] == "随机出现" ||
                data['par_mode'] == "左侧出现") { //随机出现有先显示后消失的过程
                var q = data['par_life'] / 4;
                if (par.cur_life < q) {
                    par.opacity = 255 * (par.cur_life / q);
                } else if (par.cur_life > q * 3) {
                    par.opacity = 255 * ((par.cur_life - q * 3) / q);
                }
            } else {
                par.opacity = 255 * (par.cur_life / data['par_life']);
            }

            if (par.cur_life <= 0) { //重新出现粒子
                par.cur_life = data['par_life'] + Math.random() * 0.4 * data['par_life'];
                if (data['par_mode'] == "底部出现") {
                    par.x = this.drill_levelWidthInLeft() * Math.random();
                    par.y = this.drill_levelHeight() + ph / 2;
                } else if (data['par_mode'] == "顶部出现") {
                    par.x = this.drill_levelWidthInLeft() * Math.random();
                    par.y = 0 - ph / 2;
                } else if (data['par_mode'] == "左侧出现") {
                    par.opacity = 0;
                    par.x = 0 - pw / 2 * Math.random();
                    par.y = this.drill_levelHeight() * Math.random();
                } else if (data['par_mode'] == "右侧出现") {
                    par.x = this.drill_levelWidthInLeft() + pw / 2;
                    par.y = this.drill_levelHeight() * Math.random();
                } else {
                    par.opacity = 0; //随机出现
                    par.x = this.drill_levelWidthInLeft() * Math.random();
                    par.y = this.drill_levelHeight() * Math.random();
                }
            }
        }
    }

    drill_updateVernier() {
        var data = this._drill_data;
        if (data['vernier_enable'] == false) {
            return;
        }
        if (this._drill_vernier_sprite == null) {
            return;
        }

        // > 游标位置
        var temp_sprite = this._drill_vernier_sprite;
        var float_pos;
        var float_cur = this._drill_level_cur_value;
        var float_max = data['level_max'];
        if (data['vernier_reset']) { //多段复位
            var a2 = Math.floor(float_cur % float_max);
            float_pos = this.drill_levelWidth() * a2 / float_max;
        } else {
            float_pos = this.drill_levelWidthInLeft();
        }
        temp_sprite.x = float_pos;
        temp_sprite.y = this.drill_levelHeight() / 2;
        temp_sprite.x += data['vernier_x'];
        temp_sprite.y += data['vernier_y'];

        // > 动画帧
        this._drill_vernier_time += 1;
        if (this._drill_vernier_time > data['vernier_gif_interval']) {
            this._drill_vernier_time = 0;

            this._drill_vernier_cur += 1;
            var len = this._drill_vernier_bitmaps.length;
            if (this._drill_vernier_cur >= len) {
                this._drill_vernier_cur = 0;
            }
            if (data['vernier_gif_backrun']) {
                temp_sprite.bitmap = this._drill_vernier_bitmaps[len - 1 - this._drill_vernier_cur];
            } else {
                temp_sprite.bitmap = this._drill_vernier_bitmaps[this._drill_vernier_cur];
            }
        }

        // > 游标模式
        if (data['vernier_mode'] == "亮光模式") {
            var a2 = Math.floor(float_cur % float_max);
            var tar_o;
            if (a2 < float_max / 3) {
                tar_o = 255 * a2 / (float_max / 3);
            }
            if (a2 > float_max / 3 * 2) {
                tar_o = 255 - 255 * (a2 - float_max / 3 * 2) / (float_max / 3);
            }
            if (temp_sprite.opacity > tar_o) {
                temp_sprite.opacity -= 3;
                if (temp_sprite.opacity < tar_o) {
                    temp_sprite.opacity = tar_o;
                }
            }
            if (temp_sprite.opacity < tar_o) {
                temp_sprite.opacity += 3;
                if (temp_sprite.opacity > tar_o) {
                    temp_sprite.opacity = tar_o;
                }
            }
        } else if (data['vernier_mode'] == "闪烁模式") {
            temp_sprite.opacity += this._drill_vernier_flash * 5;
            if (temp_sprite.opacity == 255) {
                this._drill_vernier_flash = -1;
            }
            if (temp_sprite.opacity == 0) {
                this._drill_vernier_flash = 1;
            }
        } else if (data['vernier_mode'] == "受伤模式") {
            temp_sprite.opacity -= 5;
            if (this._drill_cur_value > this._drill_new_value) {
                temp_sprite.opacity = 255;
            }
        } else if (data['vernier_mode'] == "增量模式") {
            temp_sprite.opacity -= 5;
            if (this._drill_cur_value < this._drill_new_value) {
                temp_sprite.opacity = 255;
            }
        } else if (data['vernier_mode'] == "变化模式") {
            temp_sprite.opacity -= 5;
            if (this._drill_cur_value > this._drill_new_value) {
                temp_sprite.opacity = 255;
            }
            if (this._drill_cur_value < this._drill_new_value) {
                temp_sprite.opacity = 255;
            }
        } else {
            temp_sprite.opacity = 255;
        }
    }

    drill_updateFilling() {
        var data = this._drill_data;
        if (!data['filling_enable']) return;
        if (this._drill_filling_mask == null) return;
        // > 播放结束后销毁（防止遮罩挡住弹出条）
        if (this._drill_filling_mask.drill_isEnding()) {
            this.mask = null;
            this.removeChild(this._drill_filling_mask);
			this._drill_filling_mask.destroy();
            this._drill_filling_mask = null;
        }
    }

    drill_COSG_sortByZIndex() {
        this._layer_context.children.sort((a, b) => a.zIndex - b.zIndex); //内容层
        this._layer_outer.children.sort((a, b) => a.zIndex - b.zIndex); //外层
    }

    drill_getCurLevelNum() {
        var data = this._drill_data;
        return Math.floor(this._drill_level_cur_value / data['level_max']);
    }

    drill_isLevelsReady() {
        if (!this._drill_level_bitmaps) {
            return false;
        }
        if (this._drill_level_bitmaps.length == 0) {
            return false;
        }
        for (var i = 0; i < this._drill_level_bitmaps.length; i++) {
            if (!this._drill_level_bitmaps[i].isReady()) {
                return false;
            }
        }
        return true;
    }

    drill_meterWidth() {
        if (!this._drill_meter_bitmap.isReady()) {
            return 0;
        }
        return this._drill_meter_bitmap.width;
    }

    drill_meterHeight() {
        if (!this._drill_meter_bitmap.isReady()) {
            return 0;
        }
        return this._drill_meter_bitmap.height;
    }

    drill_levelWidth() {
        if (this._drill_level_bitmaps.length == 0) {
            return 0;
        }
        var data = this._drill_data;
        if (data['flow_enable'] == true) {
            if (data['flow_srcMode'] == "指定段长度划分" && data['flow_levelLength'] != 0) {
                return data['flow_levelLength'];
            } else { //三等份划分
                return this._drill_level_bitmaps[0].width / 3;
            }
        } else {
            return this._drill_level_bitmaps[0].width;
        }
    }

    drill_levelHeight() {
        if (this._drill_level_bitmaps.length == 0) {
            return 0;
        }
        return this._drill_level_bitmaps[0].height;
    }

    drill_levelWidthInLeft() {
        if (this._drill_level_bitmaps.length == 0) {
            return 0;
        }
        if (this._drill_level_bitmaps[0].isReady() == false) {
            return 0;
        }

        var data = this._drill_data;
        var a1 = Math.floor(this._drill_level_cur_value / data['level_max']);
        var a2 = Math.floor(this._drill_level_cur_value % data['level_max']);
        if (a1 == 0) { //只剩最后一层时
            return this.drill_levelWidth() / data['level_max'] * a2;
        } else {
            return this.drill_levelWidth();
        }
    }

    drill_COSG_getFixPointInAnchor(
        org_anchor_x, org_anchor_y, //原贴图中心锚点
        target_anchor_x, target_anchor_y, //新的中心锚点
        width, height, //贴图高宽
        rotation, scale_x, scale_y) { //变换的值（旋转弧度+缩放）

        var ww = width * (target_anchor_x - org_anchor_x);
        var hh = height * (target_anchor_y - org_anchor_y);
        var xx = 0;
        var yy = 0;
        if (ww == 0 && hh == 0) {
            return {
                "x": 0,
                "y": 0
            };
        }
        if (ww == 0) {
            ww = 0.0001;
        }

        var r = Math.sqrt(Math.pow(ww, 2) + Math.pow(hh, 2));
        var p_degree = Math.atan(hh / ww);
        p_degree = Math.PI - p_degree;

        xx = r * Math.cos(rotation - p_degree); //圆公式 (x-a)²+(y-b)²=r²
        yy = r * Math.sin(rotation - p_degree); //圆极坐标 x=ρcosθ,y=ρsinθ

        xx += ww * (1 - scale_x);
        yy += hh * (1 - scale_y);

        return {
            "x": xx,
            "y": yy
        };
    }
}

//=============================================================================
// Sprite_SeniorGaugeMeterEject
//=============================================================================

class Sprite_SeniorGaugeMeterEject extends Sprite {
    initialize(width, height) {
        super.initialize();
        this._drill_cur_type = ""; //当前模式
        this._drill_width = width; //宽度
        this._drill_height = height; //高度
        this._drill_life = 0; //持续时间
        this._drill_time = 0; //当前时间
        this._drill_inited = false; //初始化

        this._drill_bitmap = null;
        this._drill_bitmap_white = new Bitmap(this._drill_width, this._drill_height);
        this._drill_bitmap_white.fillAll("#ffffff");
        this._drill_bitmap_black = new Bitmap(this._drill_width, this._drill_height);
        this._drill_bitmap_black.fillAll("#000000");
    }

    update() {
        super.update();
        if (this._drill_inited == false) {
            return;
        }
        this.drill_updateSprite(); //帧刷新对象
    }

    drill_resetData(data, parent_bitmap_obj) {
        // > 校验
        var life_time = data['ballistics']['movementTime'];
        if (life_time <= 0) {
            return;
        }

        // > 数据初始化
        this._drill_data = JsonEx.makeDeepCopy(data); //深拷贝数据
        this._drill_bitmap = parent_bitmap_obj; //父类参数条bitmap
        this._drill_inited = true;
        var data = this._drill_data;

        // > 默认值
        if (data['x'] == undefined) {
            data['x'] = 0
        }; //x
        if (data['y'] == undefined) {
            data['y'] = 0
        }; //y
        if (data['w'] == undefined) {
            data['w'] = 1
        }; //宽度
        if (data['h'] == undefined) {
            data['h'] = 1
        }; //高度
        if (data['type'] == undefined) {
            data['type'] = "当前参数条"
        }; //类型
        if (data['ballistics'] == undefined) {
            data['ballistics'] = {}
        }; //弹道
        data['w'] = Math.max(1, Math.ceil(data['w'])); //宽度可能<1情况
        data['h'] = Math.max(1, Math.ceil(data['h'])); //高度可能<1情况

        // > 私有对象初始化
        this._drill_life = life_time; //持续时间
        this._drill_time = 0; //计时器

        // > 弹道核心 - 初始化 + 推演
        OrbitManager.setMoveOrbitData(data['ballistics']);
        OrbitManager.calculateMoveOrbit(this, 0, data['x'], data['y']);

        // > 设置bitmap
        var temp_bitmap = null;
        if (data['type'] == "白色块") {
            this.bitmap = this._drill_bitmap_white;
        } else if (data['type'] == "黑色块") {
            this.bitmap = this._drill_bitmap_black;
        } else { // 当前参数条
            this.bitmap = this._drill_bitmap;
        }

        // > 锁定长方形
        this.setFrame(data['x'], data['y'], data['w'], data['h']);
    }

    drill_updateSprite() {
        this._drill_time += 1;

        // > 显示控制
        if (this._drill_time > this._drill_life) {
            this.visible = false;
            return;
        } else {
            this.visible = true;
        }

        // > 轨迹移动（自身只有一个sprite，与粒子群sprite不一样）
        var time = this._drill_time;
        if (time < 0) {
            time = 0;
        }
        if (time > this['_drill_COBa_x'].length - 1) {
            time = this['_drill_COBa_x'].length - 1;
        }
        this.x = this['_drill_COBa_x'][time]; //播放弹道轨迹
        this.y = this['_drill_COBa_y'][time];

        // > 抛物线透明
        var v1 = 1 / this._drill_life * 2;
        var a = 1 / this._drill_life / this._drill_life;
        var t = this._drill_time;
        this.opacity = 255 * (1 - (v1 * t - 0.5 * a * t * t));
    }
}

//=============================================================================
// Sprite_SeniorGaugeMeterMask
//=============================================================================

class Sprite_SeniorGaugeMeterMask extends Sprite {
    initialize(data) {
        super.initialize();
        this._drill_data = JsonEx.makeDeepCopy(data); //深拷贝数据
        this.drill_initData(); //初始化数据
        this.drill_initSprite(); //初始化对象
    }

    update() {
        super.update();
        this.drill_updateSprite(); //帧刷新对象
    }

    drill_initData() {
        var data = this._drill_data;

        // > 默认值
        if (data['x'] == undefined) {
            data['x'] = 0
        }; //x
        if (data['y'] == undefined) {
            data['y'] = 0
        }; //y
        if (data['w'] == undefined) {
            data['w'] = 1
        }; //宽度
        if (data['h'] == undefined) {
            data['h'] = 1
        }; //高度
        if (data['mode'] == undefined) {
            data['mode'] = "匀速加满"
        }; //加满方式
        if (data['time'] == undefined) {
            data['time'] = 30
        }; //加满时长
        if (data['delay'] == undefined) {
            data['delay'] = 10
        }; //加满延迟
    }

    drill_initSprite() {
        var data = this._drill_data;

        // > 私有对象初始化
        this._drill_cur_time = 0; //当前时间
        this._drill_bitmap_white = new Bitmap(data['w'], data['h']);
        this._drill_bitmap_white.fillNormalAll("#ffffff");

        // > 主体属性
        this.x = data['x'];
        this.y = data['y'];
        this.setFrame(0, 0, 0, data['h']);
        this.bitmap = this._drill_bitmap_white;
		this._cur_width = 0;
    }

    drill_updateSprite() {
        var data = this._drill_data;
        this._drill_cur_time += 1;

        // > 加满动画
        var p_time = this._drill_cur_time - data['delay'];
        p_time = Math.max(0, p_time);
		let width = 0;
        if (data['mode'] == "匀速加满") {
            width = Math.ceil(data['w'] * p_time / data['time']);
        } else if (data['mode'] == "弹性加满") {
            var a = 2 * data['w'] / data['time'] / data['time'];
            var c_time = data['time'] - p_time;
            width = Math.ceil(data['w'] - 0.5 * a * c_time * c_time);//抛物线减速
        }
		if (this._cur_width !== width) {
			this._cur_width = width;
			this.setFrame(0, 0, width, data['h']);
		}
    }

    drill_isPlaying() {
        var data = this._drill_data;
        return this._drill_cur_time <= data['delay'] + data['time'];
    }

    drill_isEnding() {
        return !this.drill_isPlaying();
    }
}

//=============================================================================
// Sprite_SeniorGaugeNumber
//=============================================================================

class Sprite_SeniorGaugeNumber extends Sprite {
    initialize(data) {
        super.initialize();
        this._drill_data = JsonEx.makeDeepCopy(data); //深拷贝数据
        this.drill_initData(); //初始化数据
        this.drill_initSprite(); //初始化对象
    }

    update() {
        super.update();
        this.drill_updateDelayingInit(); //延迟初始化
        this.drill_updateSprite(); //帧刷新对象
    }

    drill_COSG_reflashValue(value) {
        this._drill_new_value = value;
    }

    drill_COSG_setVisible(visible) {
        const data = this._drill_data;
        data['visible'] = visible;
    }

    drill_COSG_setSpecifiedNum(num) {
        const data = this._drill_data;
        data['specified_conditionNum'] = num;
    }

    drill_COSG_setSpecifiedNumVisible(visible) {
        const data = this._drill_data;
        data['specified_visible'] = visible;
    }

    drill_initData() {
        const data = this._drill_data;
        // > 默认值
        data['enable'] = true;
        if (data['x'] == undefined) {
            data['x'] = 0
        }; //主体 - 平移x（非实时赋值）
        if (data['y'] == undefined) {
            data['y'] = 0
        }; //主体 - 平移y（非实时赋值）
        if (data['rotation'] == undefined) {
            data['rotation'] = 0
        }; //主体 - 旋转（非实时赋值）
        if (data['visible'] == undefined) {
            data['visible'] = true
        }; //主体 - 可见
        if (data['symbol_src'] == undefined) {
            data['symbol_src'] = ""
        }; //主体 - 资源
        if (data['symbolEx_src'] == undefined) {
            data['symbolEx_src'] = ""
        }; //主体 - 资源
		
        if (data['symbol_hasNegative'] == undefined) {
            data['symbol_hasNegative'] = true
        }; //符号 - 是否显示负号
        if (data['symbol_prefix'] == undefined) {
            data['symbol_prefix'] = ""
        }; //符号 - 额外符号前缀
        if (data['symbol_suffix'] == undefined) {
            data['symbol_suffix'] = ""
        }; //符号 - 额外符号后缀

        if (data['section_align'] == undefined) {
            data['section_align'] = "右对齐"
        }; //排列 - 对齐方式
        if (data['section_spriteLength'] == undefined) {
            data['section_spriteLength'] = 20
        }; //排列 - 最大符号数量
        if (data['section_interval'] == undefined) {
            data['section_interval'] = 0
        }; //排列 - 符号间间距
        if (data['section_widthMode'] == undefined) {
            data['section_widthMode'] = "不限制宽度"
        }; //排列 - 排列宽度模式
        if (data['section_widthLimit'] == undefined) {
            data['section_widthLimit'] = 300
        }; //排列 - 排列限制宽度

        if (data['rolling_mode'] == undefined) {
            data['rolling_mode'] = "弹性滚动"
        }; //滚动 - 滚动模式
        if (data['rolling_speed'] == undefined) {
            data['rolling_speed'] = 10.0
        }; //滚动 - 弹性变化速度

        if (data['specified_enable'] == undefined) {
            data['specified_enable'] = false
        }; //额定值 - 是否启用
        if (data['specified_visible'] == undefined) {
            data['specified_visible'] = false
        }; //额定值 - 是否显示
        if (data['specified_conditionType'] == undefined) {
            data['specified_conditionType'] = "大于等于额定值时"
        }; //额定值 - 额定条件
        if (data['specified_conditionNum'] == undefined) {
            data['specified_conditionNum'] = 0
        }; //额定值 - 额定数值
        if (data['specified_remainChange'] == undefined) {
            data['specified_remainChange'] = false
        }; //额定值 - 达到条件后是否限制值
        if (data['specified_changeType'] == undefined) {
            data['specified_changeType'] = "不变化"
        }; //额定值 - 达到条件时符号
        if (data['specified_symbol_src'] == undefined) {
            data['specified_symbol_src'] = ""
        }; //额定值 - 额定基本符号资源
        if (data['specified_symbolEx_src'] == undefined) {
            data['specified_symbolEx_src'] = ""
        }; //额定值 - 额定扩展符号资源
    }

    drill_initSprite() {
        const data = this._drill_data;

        // > 私有对象初始化
        this._drill_new_value = 0; //变化因子 - 新变化参数【使用时只读】
        this._drill_cur_value = 0; //变化因子 - 当前参数【使用时只读】

        this._layer_outer = null; //层级 - 外层
        this._layer_context = null; //层级 - 内容层
        this._layer_contextMask = null; //层级 - 内容层遮罩

        this._drill_symbol_needInit = true; //符号 - 初始化 锁
        this._drill_symbol_bitmap = null; //符号 - 基本符号bitmap
        this._drill_symbolEx_bitmap = null; //符号 - 扩展符号bitmap
        this._drill_symbol_bitmapTank = []; //符号 - bitmap容器

        this._drill_section_layer = null; //排列 - 排列层
        this._drill_symbol_height = 0; //排列 - 高度
        this._drill_symbol_width = 0; //排列 - 宽度
        this._drill_section_changed = true; //排列 - 排列刷新
        this._drill_section_string = ""; //排列 - 转义字符串
        this._drill_section_spriteTank = []; //排列 - 贴图容器

        this._drill_rolling_cur_value = 0; //滚动 - 当前数值

        this._drill_specified_needInit = true; //额定值 - 初始化 锁
        this._drill_specified_bitmap = null; //额定值 - 额定基本符号bitmap
        this._drill_specifiedEx_bitmap = null; //额定值 - 额定扩展符号bitmap
        this._drill_specified_bitmapTank = []; //额定值 - 额定bitmap容器
        this._drill_specified_isFit = false; //额定值 - 是否满足额定条件
        this._drill_specified_checkString = ""; //额定值 - 判断用字符

        // > 主体属性
        this._drill_attr_needInit = true;
        this.x = data['x'];
        this.y = data['y'];
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.rotation = data['rotation'] / 180 * Math.PI;
        this.visible = false;

        // > 创建函数
        this.drill_createLayer(); //创建 - 层级
        this.drill_createSymbol(); //创建 - 符号
        this.drill_createSection(); //创建 - 排列
        this.drill_createSpecified(); //创建 - 额定值
    }

    drill_createLayer() {
        // > 层级初始化
        this._layer_context = new Sprite(); //内容层（暂不考虑遮罩）
        this.addChild(this._layer_context); //
        this._layer_outer = new Sprite(); //外层
        this.addChild(this._layer_outer); //
    }

    drill_createSymbol() {
        const data = this._drill_data;
        // > 符号bitmap
        if (data['symbol_src'] == "") {
            this._drill_symbol_bitmap = new Bitmap(0, 0);
        } else {
            this._drill_symbol_bitmap = ImageManager.loadCustomBitmap(data['symbol_src']);
        }
        if (data['symbolEx_src'] == "") {
            this._drill_symbolEx_bitmap = new Bitmap(0, 0);
        } else {
            this._drill_symbolEx_bitmap = ImageManager.loadCustomBitmap(data['symbolEx_src']);
        }
    }

    drill_createSection() {
        const data = this._drill_data;
        // > 排列层
        this._drill_section_layer = new Sprite();
        this._drill_section_layer.zIndex = 10;
        this._layer_context.addChild(this._drill_section_layer);
        // > 创建贴图
        this._drill_section_spriteTank = [];
        for (var i = 0; i < data['section_spriteLength']; i++) {
            var temp_sprite = new Sprite();
            temp_sprite.x = 0;
            temp_sprite.y = 0;
            temp_sprite.anchor.x = 0.5;
            temp_sprite.anchor.y = 0.5;
            this._drill_section_layer.addChild(temp_sprite);
            this._drill_section_spriteTank.push(temp_sprite);
        }
    }

    drill_createSpecified() {
        const data = this._drill_data;
        if (data['specified_enable'] == false) {
            return;
        }

        // > 额定符号bitmap
        if (data['symbol_src'] == "") {
            this._drill_specified_bitmap = new Bitmap(0, 0);
        } else if (data['specified_symbol_src'] === '') {
			this._drill_specified_bitmap = ImageManager.loadCustomBitmap(data['symbol_src']);
		} else {
            this._drill_specified_bitmap = ImageManager.loadCustomBitmap(data['specified_symbol_src']);
        }
        if (data['symbolEx_src'] == "") {
            this._drill_specifiedEx_bitmap = new Bitmap(0, 0);
        } else if (data['specified_symbolEx_src'] === '') {
			this._drill_specified_bitmap = ImageManager.loadCustomBitmap(data['symbolEx_src']);
		} else {
            this._drill_specifiedEx_bitmap = ImageManager.loadCustomBitmap(data['specified_symbolEx_src']);
        }
    }

    drill_updateDelayingInit() {
        const data = this._drill_data;

        //主体
        if (this._drill_symbol_bitmap.isReady() && this._drill_attr_needInit) {
            this._drill_attr_needInit = false;
            this._drill_symbol_height = this._drill_symbol_bitmap.height;
            this._drill_symbol_width = this._drill_symbol_bitmap.width;
        }
        //显示
        if (this._drill_symbol_bitmap.isReady() && this.visible != data['visible']) {
            this.visible = data['visible'];
        }
        //符号
        if (this._drill_symbol_bitmap.isReady() &&
            this._drill_symbolEx_bitmap.isReady() &&
            this._drill_symbol_needInit) {

            this._drill_symbol_needInit = false;
            this.drill_delayingInitSymbol();
        }
        //额定值
        if (data['specified_enable'] &&
            this._drill_specified_bitmap.isReady() &&
            this._drill_specifiedEx_bitmap.isReady() &&
            this._drill_specified_needInit) {

            this._drill_specified_needInit = false;
            this.drill_delayingInitSpecified();
        }
    }

    drill_delayingInitSymbol() {
        const data = this._drill_data;
        this._drill_symbol_bitmapTank = [];

        // > 资源切割（基本符号）
        var w = Math.ceil(this._drill_symbol_width / 14);
        var h = this._drill_symbol_height;
        for (var i = 0; i < 14; i++) {
            var x = w * i;
            var y = 0;
            var new_bitmap = new Bitmap(w, h);
            new_bitmap.blt(this._drill_symbol_bitmap, x, y, w, h, 0, 0, w, h);
            this._drill_symbol_bitmapTank.push(new_bitmap);
        }
        // > 资源切割（扩展符号）
        for (var i = 0; i < 14; i++) {
            var x = w * i;
            var y = 0;
            var new_bitmap = new Bitmap(w, h);
            new_bitmap.blt(this._drill_symbolEx_bitmap, x, y, w, h, 0, 0, w, h);
            this._drill_symbol_bitmapTank.push(new_bitmap);
        }
    }

    drill_delayingInitSpecified() {
        const data = this._drill_data;
        this._drill_specified_bitmapTank = [];

        // > 资源切割（额定基本符号）
        var w = Math.ceil(this._drill_specified_bitmap.width / 14);
        var h = this._drill_specified_bitmap.height;
        for (var i = 0; i < 14; i++) {
            var x = w * i;
            var y = 0;
            var new_bitmap = new Bitmap(w, h);
            new_bitmap.blt(this._drill_specified_bitmap, x, y, w, h, 0, 0, w, h);
            this._drill_specified_bitmapTank.push(new_bitmap);
        }
        // > 资源切割（额定扩展符号）
        for (var i = 0; i < 14; i++) {
            var x = w * i;
            var y = 0;
            var new_bitmap = new Bitmap(w, h);
            new_bitmap.blt(this._drill_specifiedEx_bitmap, x, y, w, h, 0, 0, w, h);
            this._drill_specified_bitmapTank.push(new_bitmap);
        }
    }

    drill_updateSprite() {
        const data = this._drill_data;
        if (!this.drill_isSymbolReady()) {
            return;
        }

        this.drill_updateRolling(); //滚动效果
        this.drill_updateOutputString(); //输出字符串（含额定值控制）
        this.drill_updateSpecifiedConvert(); //额定字符转义
        this.drill_updateSection(); //排列

        this._drill_cur_value = this._drill_new_value; //变化因子
    }

    drill_updateRolling() {
        const data = this._drill_data;
        if (this._drill_rolling_cur_value == this._drill_new_value) {
            return;
        }

        // > 滚动效果 - 瞬间变化
        if (data['rolling_mode'] == "瞬间变化" || data['rolling_time'] == 1) {
            this._drill_rolling_cur_value = this._drill_new_value;
        }

        // > 滚动效果 - 弹性滚动
        if (data['rolling_mode'] == "弹性滚动") {
            var move = (this._drill_new_value - this._drill_rolling_cur_value) / data['rolling_speed'];
            if (move > 0 && move < 1) {
                this._drill_rolling_cur_value = this._drill_new_value;
            } else if (move < 0 && move > -1) {
                this._drill_rolling_cur_value = this._drill_new_value;
            } else {
                move = Math.floor(move);
                this._drill_rolling_cur_value += move;
            }
        }

    }

    drill_updateOutputString() {
        const data = this._drill_data;
        // > 参数值字符串
        this._drill_section_string = String(this._drill_rolling_cur_value);
        if (data['symbol_hasNegative'] == false) { //负号
            this._drill_section_string = String(Math.abs(this._drill_rolling_cur_value));
        }
        this._drill_specified_checkString = this.drill_getFillString("1", this._drill_section_string.length);

        // > 额定值
        this.drill_updateSpecified();

        // > 拼接字符串
        this._drill_section_string = data['symbol_prefix'] + this._drill_section_string;
        this._drill_section_string = this._drill_section_string + data['symbol_suffix'];
        this._drill_specified_checkString = this.drill_getFillString("2", String(data['symbol_prefix']).length) + this._drill_specified_checkString;
        this._drill_specified_checkString = this._drill_specified_checkString + this.drill_getFillString("3", String(data['symbol_suffix']).length);
        this._drill_section_changed = true;
    }

    drill_updateSpecified() {
        const data = this._drill_data;
        if (data['specified_enable'] == false) {
            return;
        }

        // > 额定判断
        var is_fit = false;
        if (data['specified_conditionType'] == "小于额定值时") {
            is_fit = this._drill_rolling_cur_value < data['specified_conditionNum'];
        } else if (data['specified_conditionType'] == "大于额定值时") {
            is_fit = this._drill_rolling_cur_value > data['specified_conditionNum'];
        } else if (data['specified_conditionType'] == "等于额定值时") {
            is_fit = this._drill_rolling_cur_value == data['specified_conditionNum'];
        } else if (data['specified_conditionType'] == "小于等于额定值时") {
            is_fit = this._drill_rolling_cur_value <= data['specified_conditionNum'];
        } else if (data['specified_conditionType'] == "大于等于额定值时") {
            is_fit = this._drill_rolling_cur_value >= data['specified_conditionNum'];
        }
        this._drill_specified_isFit = is_fit;

        // > 保持额定值
        if (is_fit && data['specified_remainChange'] == true) {
            var num_str = String(data['specified_conditionNum'])
                this._drill_section_string = num_str;
            this._drill_specified_checkString = this.drill_getFillString("1", num_str.length);
        }
        // > 显示额定值 (120/100)
        if (data['specified_visible'] == true) {
            var num_str = String(data['specified_conditionNum'])
                this._drill_section_string += "/" + num_str;
            this._drill_specified_checkString += this.drill_getFillString("4", num_str.length + 1);
        }
    }

    drill_updateSpecifiedConvert() {
        const data = this._drill_data;
        //	每创建一个字符串时，都会追加 this._drill_specified_checkString 的判定字符，如下：
        // 		1 参数值
        // 		2 前缀
        // 		3 后缀
        // 		4 额定值
        if (this._drill_specified_isFit == false) {
            return;
        }

        if (data['specified_changeType'] == "所有符号变为额定符号") {
            this._drill_specified_checkString = this.drill_getFillString("s", this._drill_specified_checkString.length);
        }
        if (data['specified_changeType'] == "有效符号变为额定符号") {
            this._drill_specified_checkString = this._drill_specified_checkString.replace(/[1]/g, "s");
            this._drill_specified_checkString = this._drill_specified_checkString.replace(/[4]/g, "s");
        }
        if (data['specified_changeType'] == "只参数符号变为额定符号") {
            this._drill_specified_checkString = this._drill_specified_checkString.replace(/[1]/g, "s");
        }
    }

    drill_updateSection() {
        const data = this._drill_data;
        if (this._drill_section_changed == false) {
            return;
        }
        this._drill_section_changed = false;

        // > 转义字符串（必须在符号阶段时，把所有字符串都编辑好）
        var str_len = this._drill_section_string.length;
        if (str_len > data['section_spriteLength']) {
            str_len = data['section_spriteLength'];
        }
        for (var i = 0; i < this._drill_section_spriteTank.length; i++) {
            var temp_sprite = this._drill_section_spriteTank[i];
            if (i >= str_len) {
                temp_sprite.bitmap = null;
                continue;
            }

            // > 符号索引
            var temp_index = 0;
            var temp_char = this._drill_section_string.charAt(i).toLowerCase();
            if (temp_char == "0") {
                temp_index = 0;
            } else if (temp_char == "1") {
                temp_index = 1;
            } else if (temp_char == "2") {
                temp_index = 2;
            } else if (temp_char == "3") {
                temp_index = 3;
            } else if (temp_char == "4") {
                temp_index = 4;
            } else if (temp_char == "5") {
                temp_index = 5;
            } else if (temp_char == "6") {
                temp_index = 6;
            } else if (temp_char == "7") {
                temp_index = 7;
            } else if (temp_char == "8") {
                temp_index = 8;
            } else if (temp_char == "9") {
                temp_index = 9;
            } else if (temp_char == "+") {
                temp_index = 10;
            } else if (temp_char == "-") {
                temp_index = 11;
            } else if (temp_char == "x" || temp_char == "*") {
                temp_index = 12;
            } else if (temp_char == "/") {
                temp_index = 13;
            } else if (temp_char == "a") {
                temp_index = 14;
            } else if (temp_char == "b") {
                temp_index = 15;
            } else if (temp_char == "c") {
                temp_index = 16;
            } else if (temp_char == "d") {
                temp_index = 17;
            } else if (temp_char == "e") {
                temp_index = 18;
            } else if (temp_char == "f") {
                temp_index = 19;
            } else if (temp_char == "g") {
                temp_index = 20;
            } else if (temp_char == "h") {
                temp_index = 21;
            } else if (temp_char == "i") {
                temp_index = 22;
            } else if (temp_char == "j") {
                temp_index = 23;
            } else if (temp_char == "k") {
                temp_index = 24;
            } else if (temp_char == "l") {
                temp_index = 25;
            } else if (temp_char == "m") {
                temp_index = 26;
            } else if (temp_char == "n") {
                temp_index = 27;
            }

            // > 符号bitmap对象
            var temp_char = this._drill_specified_checkString.charAt(i).toLowerCase();
            if (temp_char == "s") {
                temp_sprite.bitmap = this._drill_specified_bitmapTank[temp_index]; //额定bitmap容器
            } else {
                temp_sprite.bitmap = this._drill_symbol_bitmapTank[temp_index]; //bitmap容器
            }
        }

        // > 排列
        var section_width = this.drill_width() + data['section_interval']; //单字符长度
        var section_widthTotal = str_len * section_width; //总长度
        if (section_widthTotal > data['section_widthLimit'] && data['section_widthMode'] == "挤压限制") {
            section_widthTotal = data['section_widthLimit'];
            section_width = Math.floor(section_widthTotal / str_len);
        }
        for (var i = 0; i < str_len; i++) {
            var temp_sprite = this._drill_section_spriteTank[i];
            if (data['section_align'] == "右对齐") {
                temp_sprite.x = i * section_width - section_widthTotal + this.drill_width() * 0.5;
                temp_sprite.y = 0;
            } else if (data['section_align'] == "左对齐") {
                temp_sprite.x = i * section_width + this.drill_width() * 0.5;
                temp_sprite.y = 0;
            } else { //居中
                temp_sprite.x = i * section_width - section_widthTotal * 0.5 + this.drill_width() * 0.5;
                temp_sprite.y = 0;
            }
        }
        if (data['section_widthMode'] == "缩放限制") {
            if (section_widthTotal > data['section_widthLimit']) {
                this.scale.x = data['section_widthLimit'] / section_widthTotal;
            } else {
                this.scale.x = 1.0;
            }
        }
    }

    drill_getFillString(str, len) {
        var temp_str = "";
        for (var i = 0; i < len; i++) {
            temp_str += str;
        }
        return temp_str;
    }

    drill_COSG_sortByZIndex() {
        this._layer_context.children.sort((a, b) => a.zIndex - b.zIndex); //内容层
        this._layer_outer.children.sort((a, b) => a.zIndex - b.zIndex); //外层
    }

    drill_isSymbolReady() {
        if (!this._drill_symbol_bitmapTank) {
            return false;
        }
        if (this._drill_symbol_bitmapTank.length == 0) {
            return false;
        }
        for (var i = 0; i < this._drill_symbol_bitmapTank.length; i++) {
            if (!this._drill_symbol_bitmapTank[i].isReady()) {
                return false;
            }
        }
        return true;
    }

    drill_width() {
        return Math.ceil(this._drill_symbol_width / 14);
    }

    drill_height() {
        return this._drill_symbol_height;
    }
}

//=============================================================================
// Sprite_PointMeter
//=============================================================================

class Sprite_PointMeter extends Sprite_SeniorGaugeMeter {
	initialize(data, actorId, type, cur = 0, max = 0) {
		this._actorId = actorId;
		this._statusType = type;
		this._evalCurrent = cur;
		this._evalMax = max;
		super.initialize(data);
	}
	
	drill_initData() {
		super.drill_initData();
		this.refresh();
	}
	
	refresh() {
		this.drill_COSG_setLevelMax(this.currentMaxValue());
		this.drill_COSG_reflashValue(this.currentValue());
	}
	
	drill_initSprite() {
		super.drill_initSprite();
		this._drill_new_value = this.currentValue();
        this._drill_cur_value = this.currentValue();
		this._drill_level_cur_value = this.currentValue();
	}
	
	setCustom(cur, max) {
		this._evalCurrent = cur;
		this._evalMax = max;
	}
	
	actor() {
		return $gameActors.actor(this._actorId);
	}
	
	currentValue() {
		if (!this.actor() && this._statusType !== 'custom') return NaN;
		switch (this._statusType) {
			case "hp":
				return this.actor().hp;
			case "mp":
				return this.actor().mp;
			case "tp":
				return this.actor().tp;
			case "exp":
				return this.getCurrentExp();
			case "level":
				return this.actor().level;
			case "time":
				return this.actor().tpbChargeTime();
			case "custom":
				return eval(this._evalCurrent);
		}
	}
	
	currentMaxValue() {
		if (!this.actor() && this._statusType !== 'custom') return NaN;
		switch (this._statusType) {
			case "hp":
				return this.actor().mhp;
			case "mp":
				return this.actor().mmp;
			case "tp":
				return this.actor().maxTp();
			case "exp":
				return this.getNextExp();
			case "level":
				return this.actor().maxLevel;
			case "time":
				return 1;
			case "custom":
				return eval(this._evalMax);
		}
	}
	
	getCurrentExp() {
		const actor = this.actor();
		const current = actor.nextLevelExp() - actor.nextRequiredExp() - actor.expForLevel(actor._level);
		return current;
	}
	
	getNextExp() {
		const actor = this.actor();
		const next = actor.expForLevel(actor._level + 1) - actor.expForLevel(actor._level);
		return next;
	}
}

//=============================================================================
// Sprite_PointNumber
//=============================================================================

class Sprite_PointNumber extends Sprite_SeniorGaugeNumber {
	initialize(data, actorId, type, cur = 0, max = 0) {
		this._actorId = actorId;
		this._statusType = type;
		this._evalCurrent = cur;
		this._evalMax = max;
		super.initialize(data);
	}
	
	drill_initData() {
		super.drill_initData();
		this.refresh();
	}
	
	refresh() {
		this.drill_COSG_setSpecifiedNum(this.currentMaxValue());
		this.drill_COSG_reflashValue(this.currentValue());
	}
	
	drill_initSprite() {
		super.drill_initSprite();
		this._drill_new_value = this.currentValue();
        this._drill_cur_value = this.currentValue();
	}
	
	setCustom(cur, max) {
		this._evalCurrent = cur;
		this._evalMax = max;
	}
	
	actor() {
		return $gameActors.actor(this._actorId);
	}
	
	currentValue() {
		if (!this.actor() && this._statusType !== 'custom') return NaN;
		switch (this._statusType) {
			case "hp":
				return this.actor().hp;
			case "mp":
				return this.actor().mp;
			case "tp":
				return this.actor().tp;
			case "exp":
				return this.getCurrentExp();
			case "level":
				return this.actor().level;
			case "time":
				return this.actor().tpbChargeTime();
			case "custom":
				return eval(this._evalCurrent);
		}
	}
	
	currentMaxValue() {
		if (!this.actor() && this._statusType !== 'custom') return NaN;
		switch (this._statusType) {
			case "hp":
				return this.actor().mhp;
			case "mp":
				return this.actor().mmp;
			case "tp":
				return this.actor().maxTp();
			case "exp":
				return this.getNextExp();
			case "level":
				return this.actor().maxLevel;
			case "time":
				return 1;
			case "custom":
				return eval(this._evalMax);
		}
	}
	
	getCurrentExp() {
		const actor = this.actor();
		const current = actor.nextLevelExp() - actor.nextRequiredExp() - actor.expForLevel(actor._level);
		return current;
	}
	
	getNextExp() {
		const actor = this.actor();
		const next = actor.expForLevel(actor._level + 1) - actor.expForLevel(actor._level);
		return next;
	}
}

//=============================================================================
// Sprite_PointGauge
//=============================================================================

class Sprite_PointGauge extends Sprite {
	initialize(data, actorId, type, cur = 0, max = 0, name = '') {
		super.initialize();
		this._styleData = data;
		this._actorId = actorId;
		this._type = type;
		this._evalCurrent = cur;
		this._evalMax = max;
		this._evalName = name;
		this.move(data.x, data.y);
		this.createAllPart();
	}
	
	setCustom(cur, max, name = '') {
		this._evalCurrent = cur;
		this._evalMax = max;
		this._evalName = name;
		if (this._meter) {
			this._meter.setCustom(this._evalCurrent, this._evalMax);
		}
		if (this._number) {
			this._number.setCustom(this._evalCurrent, this._evalMax);
		}
		this.refresh();
	}
	
	createAllPart() {
		this.createMeter();
		this.createForeground();
		this.createNumber();
		this.createName();
	}
	
	createMeter() {
		const style_data = this._styleData;
		if (!style_data.meter_enable) return;
		if (style_data.meter_id === 0) return;
		const temp_data = this.getMeterData(style_data);
		const actorId = this._actorId;
		const type = this._type;
		const cur = this._evalCurrent;
		const max = this._evalMax;
		this._meter = new Sprite_PointMeter(temp_data, actorId, type, cur, max);
		this.addChild(this._meter);
	}
	
	getMeterData(style_data) {
		const temp_data = JsonEx.makeDeepCopy(GF.COSG.GaugeMeterSetList[style_data.meter_id] || {});
		temp_data['x'] = style_data.meter_x;
		temp_data['y'] = style_data.meter_y;
		temp_data['filling_enable'] = style_data.meter_filling_enable;
		temp_data['filling_mode'] = style_data.meter_filling_mode;
		temp_data['filling_time'] = style_data.meter_filling_time;
		temp_data['filling_delay'] = style_data.meter_filling_delay;
		return temp_data;
	}
	
	createForeground() {
		const style_data = this._styleData;
		this._foreground = new Sprite(ImageManager.loadCustomBitmap(style_data.foreground_src));
		var x = style_data.foreground_x;
		var y = style_data.foreground_y;
		this._foreground.move(x, y);
		this.addChild(this._foreground);
	}
	
	createNumber() {
		const style_data = this._styleData;
		if (style_data.number_id === 0) return;
		const temp_data = this.getNumberData(style_data);
		const actorId = this._actorId;
		const type = this._type;
		const cur = this._evalCurrent;
		const max = this._evalMax;
		this._number = new Sprite_PointNumber(temp_data, actorId, type, cur, max);
		this.addChild(this._number);
	}
	
	getNumberData(style_data) {
		const temp_data = JsonEx.makeDeepCopy(GF.COSG.GaugeNumberSetList[style_data.number_id] || {});
		temp_data['x'] = style_data.number_x;
		temp_data['y'] = style_data.number_y;
		temp_data['visible'] = style_data.number_visible;
		return temp_data;
	}
	
	label() {
		switch (this._type) {
			case "hp":
				return TextManager.hpA;
			case "mp":
				return TextManager.mpA;
			case "tp":
				return TextManager.tpA;
			case "exp":
				return TextManager.expA;
			case "level":
				return TextManager.levelA;
			case "custom":
				return this._evalName;
			default:
				return "";
		}
	}
	
	createName() {
		const style_data = this._styleData;
		if (!style_data.name_show) return;
		this._name = new Sprite(new Bitmap(83, 35));
		this._name.move(style_data.name_x, style_data.name_y);
		this._name.bitmap.fontSize = style_data.name_font_size;
		this._name.bitmap.textColor = ColorManager.systemColor();
		this._name.bitmap.outlineColor = ColorManager.outlineColor();
		this._name.bitmap.outlineWidth = 2;
		this._name.bitmap.drawText(this.label(), 0, 0, 80, 32, style_data.name_align);
		this.addChild(this._name);
	}
	
	refresh() {
		if (this._meter) this._meter.refresh();
		if (this._number) this._number.refresh();
		if (this._name) {
			this._name.bitmap.drawText(this.label(), 0, 0, 80, 32, this._styleData.name_align);
		}
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
