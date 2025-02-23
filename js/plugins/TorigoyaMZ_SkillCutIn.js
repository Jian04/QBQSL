/*---------------------------------------------------------------------------*
 * TorigoyaMZ_SkillCutIn.js v.1.3.0
 *---------------------------------------------------------------------------*
 * 2021/09/30 01:23 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc 在技能激活前显示切入的插件 (v.1.3.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.3.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_SkillCutIn.js
 * @base TorigoyaMZ_FrameTween
 * @orderAfter TorigoyaMZ_FrameTween
 * @help
 * 在技能激活前显示切入的插件 (v.1.3.0)
 * https://torigoya-plugin.rutan.dev
 *
 * 这个插件需要 "Tween Animation Plugin"。
 * 这个插件需要依赖基础插件TorigoyaMZ_FrameTween.js（Tween动画插件）
 * 请把它放在Tween动画插件的下面。
 
 * 增加了在指定技能被激活前显示切入的能力。
 *
 * ------------------------------------------------------------
 * ■ 基本使用方法
 * ------------------------------------------------------------
 *
 * (1) 为切入准备一个普通图像
 *
 * ・切入点1的背景图像
 * ・切入点2的背景图像
 * ・切入的边界图像
 *
 * 你需要准备上述三种类型的图像
 * 你需要把它们放在图片的文件夹里（img/pictures）。
 * 你可以在以下网页上找到免费的图片。
 *
 * https://torigoya-plugin.rutan.dev/battle/skillCutIn
 *
 * (2) 准备好切入的人物形象。
 
 *准备尽可能多的你的角色的照片，以显示切入点。
 * 请把你的角色图片也放在图片文件夹（img/pictures）中。
 
 * （3）配置切入设置。
 
 *进入插件设置，打开 "盟友的剪接设置"，然后
 * 尽可能多地添加你想设置的项目。
 
 * ■ 目标设置
 
 * 设置 "哪个角色 "和 "使用什么技能"。
 * 例如，"哈罗德 "使用了 "星光II"。
 
 * 当你在这里设置的条件得到满足时，将显示切入点。
 
 * ■ 人物形象
 
 * 你可以选择要显示的角色的图像文件和
 *你可以调整显示的位置和大小。
 
 * ■ 个人设置（可选）
 
 * 如果你只想改变这个切入点的颜色 如果你想只改变这个切入点的颜色，请设置。
 * 如果你不需要，你可以省略。
 
 * ■备忘栏
 
 * 这是一个备忘字段。 可以自由制作备忘录。
 * 你也可以描述一些特殊的设置。
 
 * -----
 
 *这就完成了基本设置。
 *当你对目标人物使用技能时，会出现一个切入点。
 
 * ------------------------------------------------------------
 * ■ 专业使用
 * ------------------------------------------------------------
 *
 * 在每个切入设置的备注栏中。
 * 对于稍微复杂的用途，可以做一个特别说明。
 
 * 改变切入的角度
 
 * 默认情况下，角色切入是从屏幕的底部显示的。
 * 你可以通过在备忘栏中写下以下内容来改变角度。
 
 *<角度：45>。
 
 * 角度必须在0和360之间。
 * 如果角度为0，从左边开始，如果角度为90，从上面开始，从
 * 如果角度是180，就从右边开始，如果角度是270，就从下面开始。
 * 将分别显示角色切入。
 
 * 使切入的显示条件复杂化。
 
 * 例如，如果你想只在你的HP低于50%时显示切入。
 * *如果你想只在你的HP低于50%时显示切入，请在备忘栏里写上以下内容。
 *
 * <条件: a.hp <= a.mhp * 0.5>
 *
 * 只有当所写的条件为真时，才可以。
 * 相关的切入点将被显示出来。
 * 如同在伤害公式中，a就是你自己。
 *如伤害公式中，a是你自己，但b（你的对手）不是。
 
 * 当你使用一个项目，而不是一个技能时，会显示切入。
 
 *首先，在切入设置中，将技能ID设置为 "无"。
 * *然后在切入设置的备注栏中写下以下内容。
 
 *<项目：7>
 
 *这样一来，当你使用物品ID为：7的物品时
 *切入将被显示出来。
 
 * *在地图上显示切入点。
 
 * 这可以用插件命令来调用。
 * 请注意，要调用的切入必须有一个
 * 切入者必须事先得到一个呼叫名称。
 * 注意，要调用的切入点必须事先在切入点设置的备忘录栏中给出一个调用名称，
 * 如下所示。
 *
 * <呼叫名称: myCutIn>
 *
 * 「myCutIn」部分可以是你喜欢的任何名字。
 * 你也可以在插件命令中指定这个名称
 * 通过在插件命令中指定这个名称，你也可以在地图上显示切入点。
 * 关于如何调用它的细节，请参见文档页
 *
 * @param base
 * @text ■ 切入设置
 *
 * @param actorConfig
 * @text 盟友的切入设置
 * @desc 这些是演员的切入设置。
 *优先考虑在上的人。
 * @type struct<ActorCutinSet>[]
 * @parent base
 * @default []
 *
 * @param enemyConfig
 * @text 敌人的切入设置
 * @desc 这些是敌人的切入设置。
 * 最上面的第一个人具有优先权。
 * @type struct<EnemyCutinSet>[]
 * @parent base
 * @default []
 *
 * @param common
 * @text ■ 常见设置
 *
 * @param commonBackImage1
 * @text 背景画像1
 * @desc 指定要在整个背景上显示的图像
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_back1
 *
 * @param commonBackImage2
 * @text 背景画像2
 * @desc 指定要在角色背景中显示的图像
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_back2
 *
 * @param commonBorderImage
 * @text 境界線画像
 * @desc 指定要在切入的边界上显示的图像。
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_border
 *
 * @param commonBorderBlendMode
 * @text 边界图像混合
 * @desc 指定边界图像的混合模式
 * 仅在RPG2Kool MZ中可用
 * @type select
 * @parent common
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default add
 *
 * @param commonBorderSpeed
 * @text 边界图像的移动速度
 * @desc 指定边界图像的移动速度。
 * 只在RPG Tutool MZ中提供
 * @type number
 * @parent common
 * @default 30
 *
 * @param commonSound
 * @text 声音效果
 * @desc 设置显示切入时的声音效果。
 * 如果在每个切入点中指定了声音，它将优先考虑。
 * @type struct<Sound>
 * @parent common
 * @default {"name":"Skill2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param cutInLayer
 * @text 切入显示层
 * @desc 指定将显示切入的图层
 * 如果省略，将使用普通设置。
 * @type select
 * @parent common
 * @option 始终走在前列
 * @value foreground
 * @option 窗口上方
 * @value upperWindow
 * @option 窗口下方
 * @value lowerWindow
 * @default foreground
 *
 * @param cutInOpenAndCloseTime
 * @text 切入式显示开始/结束动画时间
 * @desc 指定切入显示的开始/结束动画应该播放多长时间。
 * 60 = 1秒。
 * @type number
 * @parent common
 * @default 25
 *
 * @param cutInStopTime
 * @text 切入停止时间
 * @desc 指定切入显示在屏幕上停留的时间。
 * 60 = 1秒。
 * @type number
 * @parent common
 * @default 10
 *
 * @param commonActor
 * @text ■ 盟友的共同设置
 *
 * @param actorBackColor1
 * @text 盟友: 背景色1
 * @desc 设置盟友的切入显示区域的背景颜色。
 * @type string
 * @parent commonActor
 * @default #000033
 *
 * @param actorBackColor2
 * @text 盟友: 背景色2
 * @desc 设置盟军切入显示区域的背景颜色。
 * 如果留空，它将与背景色1相同。
 * @type string
 * @parent commonActor
 * @default #6666ff
 *
 * @param actorBackTone
 * @text 盟友：效果色调1
 * @desc 设置盟友的背景效果的色调。
 * 仅在RPG Tucool MZ中提供。
 * @type struct<Color>
 * @parent commonActor
 * @default {"red":"-128","green":"-128","blue":"128"}
 *
 * @param actorBorderTone
 * @text 盟友：效果色调2
 * @desc 设置盟友边界效果的色调
 * 仅在RPG Tucool MZ中提供。
 * @type struct<Color>
 * @parent commonActor
 * @default {"red":"0","green":"0","blue":"0"}
 *
 * @param commonEnemy
 * @text ■ 敌人的常见设置
 *
 * @param enemyBackColor1
 * @text 敌人: 背景色1
 * @desc 设置敌人切入显示区域的背景颜色。
 * @type string
 * @parent commonEnemy
 * @default #330000
 *
 * @param enemyBackColor2
 * @text 敌人: 背景色2
 * @desc 设置敌人的切入显示区域的背景颜色。
 * 如果留空，它将与背景色1相同。
 * @type string
 * @parent commonEnemy
 * @default #ff6666
 *
 * @param enemyBackTone
 * @text 敌人: 效果 色调1
 * @desc 设置敌人背景效果的色调。
 * 仅在RPG Tucool MZ中可用。
 * @type struct<Color>
 * @parent commonEnemy
 * @default {"red":"128","green":"-128","blue":"-128"}
 *
 * @param enemyBorderTone
 * @text 敌人: 效果 色调2
 * @desc 设置敌人边界效果的色调
 * 仅在RPG Tutool MZ中可用。
 * @type struct<Color>
 * @parent commonEnemy
 * @default {"red":"0","green":"0","blue":"0"}
 *
 * @command showActorCutIn
 * @text 显示盟友的切入点
 * @desc 显示盟友的切入点
 *
 * @arg name
 * @text 使用的切入点名称
 * @desc 指定切入设置的备忘录字段中指定的呼叫名称
 * 所有的条件性决定将被跳过
 * @type string
 * @default
 *
 * @command showEnemyCutIn
 * @text 显示敌方切入点
 * @desc 显示敌方切入点
 *
 * @arg name
 * @text 使用的切入点名称
 * @desc 指定切入设置的备忘录字段中指定的呼叫名称
 * 所有的条件性决定将被跳过
 * @type string
 * @default
 */

/*~struct~ActorCutinSet:
 * @param target
 * @text ■ 目标设定
 *
 * @param render
 * @text ■ 角色图像设置
 *
 * @param picture
 * @text 人物形象
 * @desc 设置要在切入时显示的角色图片
 * 请将图片放到图片文件夹中。
 * @type file
 * @require true
 * @parent render
 * @dir img/pictures
 * @default
 *
 * @param pictureX
 * @text 角色图像位置：X
 * @desc 调整角色图像的显示位置（水平）。
 * 减号将图像向左移动，加号将其向右移动。
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureY
 * @text 角色图像位置：Y
 * @desc 调整角色图像的显示位置（垂直）。
 * 减去 - 将图像向上移动，加上 - 将其向下移动
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureScale
 * @text 角色图像：放大率
 * @desc 指定角色图像的放大系数
 * 如果你指定1，图像将被放大1倍，并按原样显示。
 * @type number
 * @parent render
 * @decimals 2
 * @min 0.01
 * @default 1
 *
 * @param advanced
 * @text ■ 个人配置（省略可）
 *
 * @param backColor1
 * @text 背景色1
 * @desc 设置切入显示区域的背景颜色。
 * 如果省略，将使用普通设置。
 * @type string
 * @parent advanced
 * @default
 *
 * @param backColor2
 * @text 背景色2
 * @desc 设置切入显示区域的背景颜色
 * 如果留空，它将与背景色1相同。
 * @type string
 * @parent advanced
 * @default
 *
 * @param backTone
 * @text 效果 色调1
 * @desc 设置背景效果的色调。
 * 仅在RPG2Kool MZ中可用。
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"-128","green":"-128","blue":"128"}
 *
 * @param borderTone
 * @text 效果 色调2
 * @desc 设置边界效果的色调。
 *只有在RPG Tutool MZ中才有。
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"0","green":"0","blue":"0"}
 *
 * @param backImage1
 * @text 背景画像1
 * @desc 指定要在整个背景上显示的图像
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param backImage2
 * @text 背景画像2
 * @desc 指定要在角色背景中显示的图像。
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderImage
 * @text 境界線画像
 * @desc 指定要在切入的边界显示的图像。
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderBlendMode
 * @text 边界图像混合
 * @desc 指定边界图像的混合模式。
 * 如果省略，将使用普通设置。
 * @type select
 * @parent advanced
 * @option 省略
 * @value
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default
 *
 * @param sound
 * @text 効果音
 * @desc 指定切入显示的声音效果。
 * 如果没有指定，将使用默认的声音效果。
 * @type struct<Sound>
 * @parent advanced
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param note
 * @text 注释部分
 * @desc 这是一个备忘录字段。
 * 你可以用与Tucool中备忘录字段相同的方式使用它。
 * @type multiline_string
 * @default
 *
 * @param actorId
 * @text 角色的ID
 * @desc 设置要被切割的角色
 * @type actor
 * @parent target
 * @default 0
 *
 * @param skillId
 * @text 技能ID
 * @desc 设置要切入的技能
 * @type skill
 * @parent target
 * @default 0
 */

/*~struct~EnemyCutinSet:
 * @param target
 * @text ■ 目标设置
 *
 * @param render
 * @text ■ 角色图像设置
 *
 * @param picture
 * @text 角色图像
 * @desc 设置要在切入时显示的角色图片
 * 请将图片放到图片文件夹中。
 * @type file
 * @require true
 * @parent render
 * @dir img/pictures
 * @default
 *
 * @param pictureX
 * @text 角色图像位置:X
 * @desc 调整角色图像的显示位置（水平）。
 * 减号将图像向左移动，加号将其向右移动。
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureY
 * @text 角色图像位置:Y
 * @desc 调整角色图像的显示位置（垂直）。
 * 减去 - 将图像向上移动，加上 - 将其向下移动
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureScale
 * @text 角色图像：放大率
 * @desc 指定角色图像的放大系数
 * 如果你指定1，图像将被放大1倍，并按原样显示。
 * @type number
 * @parent render
 * @decimals 2
 * @min 0.01
 * @default 1
 *
 * @param advanced
 * @text ■ 个人配置（省略可）
 *
 * @param backColor1
 * @text 背景色1
 * @desc 设置切入显示区域的背景颜色。
 * 如果省略，将使用普通设置。
 * @type string
 * @parent advanced
 * @default
 *
 * @param backColor2
 * @text 背景色2
 * @desc 设置切入显示区域的背景颜色
 * 如果留空，它将与背景色1相同。
 * @type string
 * @parent advanced
 * @default
 *
 * @param backTone
 * @text 效果 色调1
 * @desc 设置背景效果的色调。
 * 仅在RPG2Kool MZ中可用。
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"-128","green":"-128","blue":"128"}
 *
 * @param borderTone
 * @text 效果 色调2
 * @desc 设置边界效果的色调。
 *只有在RPG Tutool MZ中才有。
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"0","green":"0","blue":"0"}
 *
 * @param backImage1
 * @text 背景画像1
 * @desc 指定要在整个背景上显示的图像
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param backImage2
 * @text 背景画像2
 * @desc 指定要在角色背景中显示的图像。
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderImage
 * @text 境界線画像
 * @desc 指定要在切入的边界显示的图像。
 * 如果留空，将使用普通设置。
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderBlendMode
 * @text 边界图像混合
 * @desc 指定边界图像的混合模式。
 * 如果省略，将使用普通设置。
 * @type select
 * @parent advanced
 * @option 省略
 * @value
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default
 *
 * @param sound
 * @text 声音效果
 * @desc 指定切入显示的声音效果。
 * 如果没有指定，将使用默认的声音效果。
 * @type struct<Sound>
 * @parent advanced
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param note
 * @text 注释部分
 * @desc 这是一个备忘录字段。
 * 你可以用与Tucool中备忘录字段相同的方式使用它。
 * @type multiline_string
 * @default
 *
 * @param enemyId
 * @text 敌人ID
 * @desc 将敌人设置为切入点
 * @type enemy
 * @parent target
 * @default 0
 *
 * @param skillId
 * @text 技能ID
 * @desc 设置要切入的技能
 * @type skill
 * @parent target
 * @default 0
 */

/*~struct~Color:
 * @param red
 * @text 红色
 * @desc 设置红色的强度
 * 必须在-255到255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param green
 * @text 蓝色
 * @desc 设置蓝色的强度
 * 必须在-255到255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param blue
 * @text 绿色
 * @desc 设置绿色的强度
 * 该值应在-255至255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 */

/*~struct~ColorCustomize:
 * @param isUse
 * @text 你想使用它吗？
 * @desc 指定你是否要使用个别设置
 * 如果不使用，颜色将是普通设置的颜色。
 * @type boolean
 * @on 使用
 * @off 不使用
 * @default false
 *
 * @param red
 * @text 红色
 * @desc 设置红色的强度
 * 必须在-255到255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param green
 * @text 蓝色
 * @desc 设置蓝色的强度
 * 必须在-255到255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param blue
 * @text 绿色
 * @desc 设置绿色的强度
 * 该值应在-255至255的范围内
 * @type number
 * @min -255
 * @max 255
 * @default 0
 */

/*~struct~Sound:
 * @param name
 * @text 声音效果文件
 * @desc 选择一个声音效果文件
 * @type file
 * @require true
 * @dir audio/se
 * @default
 *
 * @param volume
 * @text 音量
 * @type number
 * @dir 指定声音效果的音量
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text 间距
 * @type number
 * @dir 指定效果音的间距
 * @min 0
 * @max 200
 * @default 100
 *
 * @param pan
 * @text 平移
 * @type number
 * @dir 指定声音效果的平移。
 * @min -100
 * @max 100
 * @default 0
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_SkillCutIn';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickNumberValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseFloat(parameter[key]);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return ''.concat(parameter[key] || defaultValue) === 'true';
    }

    function pickStructActorCutinSet(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            picture: pickStringValueFromParameter(parameter, 'picture', ''),
            pictureX: pickIntegerValueFromParameter(parameter, 'pictureX', 0),
            pictureY: pickIntegerValueFromParameter(parameter, 'pictureY', 0),
            pictureScale: pickNumberValueFromParameter(parameter, 'pictureScale', 1),
            backColor1: pickStringValueFromParameter(parameter, 'backColor1', ''),
            backColor2: pickStringValueFromParameter(parameter, 'backColor2', ''),
            backTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.backTone),
            borderTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.borderTone),
            backImage1: pickStringValueFromParameter(parameter, 'backImage1', ''),
            backImage2: pickStringValueFromParameter(parameter, 'backImage2', ''),
            borderImage: pickStringValueFromParameter(parameter, 'borderImage', ''),
            borderBlendMode: pickStringValueFromParameter(parameter, 'borderBlendMode', ''),
            sound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.sound),
            note: pickStringValueFromParameter(parameter, 'note', ''),
            actorId: pickIntegerValueFromParameter(parameter, 'actorId', 0),
            skillId: pickIntegerValueFromParameter(parameter, 'skillId', 0),
        };
    }

    function pickStructEnemyCutinSet(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            picture: pickStringValueFromParameter(parameter, 'picture', ''),
            pictureX: pickIntegerValueFromParameter(parameter, 'pictureX', 0),
            pictureY: pickIntegerValueFromParameter(parameter, 'pictureY', 0),
            pictureScale: pickNumberValueFromParameter(parameter, 'pictureScale', 1),
            backColor1: pickStringValueFromParameter(parameter, 'backColor1', ''),
            backColor2: pickStringValueFromParameter(parameter, 'backColor2', ''),
            backTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.backTone),
            borderTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.borderTone),
            backImage1: pickStringValueFromParameter(parameter, 'backImage1', ''),
            backImage2: pickStringValueFromParameter(parameter, 'backImage2', ''),
            borderImage: pickStringValueFromParameter(parameter, 'borderImage', ''),
            borderBlendMode: pickStringValueFromParameter(parameter, 'borderBlendMode', ''),
            sound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.sound),
            note: pickStringValueFromParameter(parameter, 'note', ''),
            enemyId: pickIntegerValueFromParameter(parameter, 'enemyId', 0),
            skillId: pickIntegerValueFromParameter(parameter, 'skillId', 0),
        };
    }

    function pickStructColor(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            red: pickIntegerValueFromParameter(parameter, 'red', 0),
            green: pickIntegerValueFromParameter(parameter, 'green', 0),
            blue: pickIntegerValueFromParameter(parameter, 'blue', 0),
        };
    }

    function pickStructColorCustomize(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            isUse: pickBooleanValueFromParameter(parameter, 'isUse', 'false'),
            red: pickIntegerValueFromParameter(parameter, 'red', 0),
            green: pickIntegerValueFromParameter(parameter, 'green', 0),
            blue: pickIntegerValueFromParameter(parameter, 'blue', 0),
        };
    }

    function pickStructSound(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            name: pickStringValueFromParameter(parameter, 'name', ''),
            volume: pickIntegerValueFromParameter(parameter, 'volume', 90),
            pitch: pickIntegerValueFromParameter(parameter, 'pitch', 100),
            pan: pickIntegerValueFromParameter(parameter, 'pan', 0),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.3.0',
            actorConfig: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructActorCutinSet(parameter);
                });
            })(parameter.actorConfig),
            enemyConfig: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructEnemyCutinSet(parameter);
                });
            })(parameter.enemyConfig),
            commonBackImage1: pickStringValueFromParameter(parameter, 'commonBackImage1', 'CutIn_back1'),
            commonBackImage2: pickStringValueFromParameter(parameter, 'commonBackImage2', 'CutIn_back2'),
            commonBorderImage: pickStringValueFromParameter(parameter, 'commonBorderImage', 'CutIn_border'),
            commonBorderBlendMode: pickStringValueFromParameter(parameter, 'commonBorderBlendMode', 'add'),
            commonBorderSpeed: pickIntegerValueFromParameter(parameter, 'commonBorderSpeed', 30),
            commonSound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.commonSound),
            cutInLayer: pickStringValueFromParameter(parameter, 'cutInLayer', 'foreground'),
            cutInOpenAndCloseTime: pickIntegerValueFromParameter(parameter, 'cutInOpenAndCloseTime', 25),
            cutInStopTime: pickIntegerValueFromParameter(parameter, 'cutInStopTime', 10),
            actorBackColor1: pickStringValueFromParameter(parameter, 'actorBackColor1', '#000033'),
            actorBackColor2: pickStringValueFromParameter(parameter, 'actorBackColor2', '#6666ff'),
            actorBackTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.actorBackTone),
            actorBorderTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.actorBorderTone),
            enemyBackColor1: pickStringValueFromParameter(parameter, 'enemyBackColor1', '#330000'),
            enemyBackColor2: pickStringValueFromParameter(parameter, 'enemyBackColor2', '#ff6666'),
            enemyBackTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.enemyBackTone),
            enemyBorderTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.enemyBorderTone),
        };
    }

    function unescapeMetaString(string) {
        return ''
            .concat(string || '')
            .trim()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }

    function evalCondition(a, code) {
        try {
            return !!eval(code);
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.error(e);
            return false;
        }
    }

    class Sprite_CutInBase extends Sprite {
        constructor(params) {
            super();
            this._params = params;
            this._callback = null;
            this._isPlaying = false;
            this._isStarting = false;
            this.anchor.x = this.anchor.y = 0.5;
            this.visible = false;
            this.onCreate();
        }

        get params() {
            return this._params;
        }

        /**
         * metaから指定keyを読み取る
         * @param {String | String[]} keys
         * @param {any} defaultValue
         * @returns {any}
         */
        getMeta(keys, defaultValue = undefined) {
            if (Array.isArray(keys)) {
                for (const key of keys) {
                    if (this.params.meta[key] !== undefined) return this.params.meta[key];
                }
            } else {
                if (this.params.meta[keys] !== undefined) return this.params.meta[keys];
            }
            return defaultValue;
        }

        /**
         * 全体の表示角度を取得
         * @returns {number}
         */
        getMainRotation() {
            if (!this._mainRotationCache) {
                const rotation = this.getMeta(['rotate', '角度'], undefined);
                if (rotation === undefined) {
                    if (this.params.isEnemy) {
                        this._mainRotationCache = Math.atan2(-Graphics.height, -Graphics.width);
                    } else {
                        this._mainRotationCache = Math.atan2(-Graphics.height, Graphics.width);
                    }
                } else {
                    this._mainRotationCache = (parseFloat(rotation) * Math.PI) / 180;
                }
            }
            return this._mainRotationCache;
        }

        /**
         * カットイン幅を取得
         * ※カットイン幅は画面の対角線の長さになる
         * @returns {number}
         */
        getMainWidth() {
            if (!this._mainWidthCache) {
                this._mainWidthCache = Math.ceil(Math.sqrt(Math.pow(Graphics.width, 2) + Math.pow(Graphics.height, 2)));
            }
            return this._mainWidthCache;
        }

        /**
         * 破棄
         */
        destroy() {
            this.onDestroy();
            if (Sprite.prototype.destroy) {
                Sprite.prototype.destroy.apply(this);
            }
        }

        /**
         * 再生開始
         * @returns {Promise}
         */
        play() {
            if (this._isPlaying) Promise.reject('isPlaying');

            return new Promise((resolve) => {
                this._callback = resolve;
                this._isPlaying = true;
            });
        }

        /**
         * 再生終了
         * このメソッドを外部から呼び出すことはない
         */
        finish() {
            if (!this._isPlaying) return;
            if (this._callback) this._callback();
            this._callback = null;
            this._isPlaying = false;
            this._isStarting = false;
        }

        /**
         * 更新
         */
        update() {
            if (this._isStarting) {
                this.onUpdate();
            } else if (this._isPlaying) {
                if (this.isReady()) {
                    this._isStarting = true;
                    this.visible = true;
                    this.onStart();
                }
            }

            super.update();
        }

        /**
         * 画像等のリソース読み込みが完了しているか
         * @returns {boolean}
         */
        isReady() {
            return ImageManager.isReady();
        }

        /**
         * カットイン効果音の再生
         */
        playSe() {
            const sound = this.getConfigSound();
            if (sound) AudioManager.playSe(sound);
        }

        /**
         * カットイン効果音の取得
         * @returns {null|any}
         */
        getConfigSound() {
            if (this.params.sound && this.params.sound.name) {
                return this.params.sound;
            } else if (Torigoya.SkillCutIn.parameter.commonSound && Torigoya.SkillCutIn.parameter.commonSound.name) {
                return Torigoya.SkillCutIn.parameter.commonSound;
            }
            return null;
        }

        /**
         * 背景画像1のファイル名を取得
         * @returns {string}
         */
        getCutInBackImageName1() {
            if (this.params.backImage1) return this.params.backImage1;
            return Torigoya.SkillCutIn.parameter.commonBackImage1;
        }

        /**
         * 背景画像2のファイル名を取得
         * @returns {string}
         */
        getCutInBackImageName2() {
            if (this.params.backImage2) return this.params.backImage2;
            return Torigoya.SkillCutIn.parameter.commonBackImage2;
        }

        /**
         * 境界線画像のファイル名を取得
         * @returns {string}
         */
        getCutInBorderImageName() {
            if (this.params.borderImage) return this.params.borderImage;
            return Torigoya.SkillCutIn.parameter.commonBorderImage;
        }

        /**
         * 境界線画像のブレンドモードを取得
         * @returns {PIXI.BLEND_MODES}
         */
        getCutInBorderBlendMode() {
            const mode = this.params.borderBlendMode || Torigoya.SkillCutIn.parameter.commonBorderBlendMode;
            switch (mode) {
                case 'add':
                    return PIXI.BLEND_MODES.ADD;
                case 'normal':
                default:
                    return PIXI.BLEND_MODES.NORMAL;
            }
        }

        /**
         * 背景色1を取得
         * @returns {string}
         */
        getBackColor1() {
            if (this.params.backColor1) return this.params.backColor1;

            if (this.params.isEnemy) {
                return Torigoya.SkillCutIn.parameter.enemyBackColor1;
            } else {
                return Torigoya.SkillCutIn.parameter.actorBackColor1;
            }
        }

        /**
         * 背景色2を取得
         * @returns {string}
         */
        getBackColor2() {
            if (this.params.backColor2) return this.params.backColor2;
            if (this.params.backColor1) return this.params.backColor1;

            if (this.params.isEnemy) {
                return Torigoya.SkillCutIn.parameter.enemyBackColor2 || Torigoya.SkillCutIn.parameter.enemyBackColor1;
            } else {
                return Torigoya.SkillCutIn.parameter.actorBackColor2 || Torigoya.SkillCutIn.parameter.actorBackColor1;
            }
        }

        /**
         * 背景色のトーンを取得
         * @returns {number[]}
         */
        getBackTone() {
            if (this.params.backTone && this.params.backTone.isUse) {
                const tone = this.params.backTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else if (this.params.isEnemy) {
                const tone = Torigoya.SkillCutIn.parameter.enemyBackTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else {
                const tone = Torigoya.SkillCutIn.parameter.actorBackTone;
                return [tone.red, tone.green, tone.blue, 0];
            }
        }

        /**
         * 境界線のトーンを取得
         * @returns {number[]}
         */
        getBorderTone() {
            if (this.params.borderTone && this.params.borderTone.isUse) {
                const tone = this.params.borderTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else if (this.params.isEnemy) {
                const tone = Torigoya.SkillCutIn.parameter.enemyBorderTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else {
                const tone = Torigoya.SkillCutIn.parameter.actorBorderTone;
                return [tone.red, tone.green, tone.blue, 0];
            }
        }

        /**
         * 生成処理（継承先で上書き）
         */
        onCreate() {
            // override me
        }

        /**
         * 開始処理（継承先で上書き）
         */
        onStart() {
            // override me
        }

        /**
         * 更新処理（継承先で上書き）
         */
        onUpdate() {
            // override me
        }

        /**
         * 破棄処理（継承先で上書き）
         */
        onDestroy() {
            // override me
        }
    }

    function callBitmapLoaded(bitmap, callback) {
        if (bitmap.isReady()) {
            callback();
        } else {
            bitmap.addLoadListener(callback);
        }
    }

    function easingBounce(n) {
        const s = 1.70158;
        const t2 = n - 1;
        return t2 * t2 * ((s + 1) * t2 + s) + 1;
    }

    class Sprite_CutInWoss extends Sprite_CutInBase {
        getMainSmallHeight() {
            if (!this._mainSmallHeightCache) {
                this._mainSmallHeightCache = this.getMainWidth() / 4;
            }
            return this._mainSmallHeightCache;
        }

        getMainLargeHeight() {
            if (!this._mainLargeHeightCache) {
                this._mainLargeHeightCache = this.getMainWidth() / 2;
            }
            return this._mainLargeHeightCache;
        }

        getBorderSpeed() {
            return Torigoya.SkillCutIn.parameter.commonBorderSpeed;
        }

        getOpenAndCloseTime() {
            return Torigoya.SkillCutIn.parameter.cutInOpenAndCloseTime;
        }

        getStopTime() {
            return Torigoya.SkillCutIn.parameter.cutInStopTime;
        }

        onCreate() {
            this._createMask();
            this._createGlobalBackPlaneSprite();
            this._createGlobalBackEffectSprite();
            this._createMainBackSprite();
            this._createCharacterSprite();
            this._createBorderSprites();
        }

        _createMask() {
            const w = this.getMainWidth();
            const h1 = this.getMainSmallHeight();
            const h2 = this.getMainLargeHeight();

            this._maskShape = new PIXI.Graphics();
            this._maskShape.clear();
            this._maskShape.beginFill(0xffffff);
            this._maskShape.moveTo(0, (h2 - h1) / 2);
            this._maskShape.lineTo(w, 0);
            this._maskShape.lineTo(w, h2);
            this._maskShape.lineTo(0, h2 - (h2 - h1) / 2);
            this._maskShape.endFill();
            this._maskShape.pivot = new PIXI.Point(w / 2, h2 / 2);
            this._maskShape.scale.y = 0;

            this._maskShape.rotation = this.getMainRotation();

            this.addChild(this._maskShape);
        }

        _createGlobalBackPlaneSprite() {
            const size = this.getMainWidth();
            const colorBitmap = new Bitmap(32, 32);
            colorBitmap.fillAll('#000000');
            this._globalBackPlaneSprite = new Sprite(colorBitmap);
            this._globalBackPlaneSprite.scale.x = this._globalBackPlaneSprite.scale.y = size / colorBitmap.width;
            this._globalBackPlaneSprite.anchor.x = this._globalBackPlaneSprite.anchor.y = 0.5;
            this._globalBackPlaneSprite.opacity = 0;
            this.addChild(this._globalBackPlaneSprite);
        }

        _createGlobalBackEffectSprite() {
            const size = this.getMainWidth();
            const bitmap = ImageManager.loadPicture(this.getCutInBackImageName1());
            const shapeHeight = (this.getMainLargeHeight() - this.getMainSmallHeight()) / 2;
            const r = Math.atan2(shapeHeight, this.getMainWidth());
            const colorTone = this.getBackTone();

            this._globalBackEffectSprites = new Array(2).fill(0).map((_, i) => {
                const mask = new PIXI.Graphics();
                mask.beginFill(0xffffff);
                mask.moveTo(0, 0);
                mask.lineTo(size, 0);
                mask.lineTo(size, size / 2);
                mask.lineTo(0, size / 2);
                mask.lineTo(0, 0);
                mask.endFill();
                mask.pivot = new PIXI.Point(size / 2, i === 0 ? size / 2 : 0);
                mask.rotation = this.getMainRotation();
                this.addChild(mask);

                const wrapperSprite = new Sprite();
                wrapperSprite.opacity = 0;
                wrapperSprite.mask = mask;
                wrapperSprite.x = Math.cos(r) * shapeHeight * (i === 0 ? -1 : 1);
                wrapperSprite.y = shapeHeight * (i === 0 ? -1 : 1);
                wrapperSprite.rotation = this.getMainRotation() + (i === 0 ? -1 : 1) * r;
                wrapperSprite.setColorTone(colorTone);
                wrapperSprite.blendMode = PIXI.BLEND_MODES.ADD;
                this.addChild(wrapperSprite);

                const sprite = new TilingSprite(bitmap);
                sprite.move(-size / 2, -size / 2, size, size);
                wrapperSprite.addChild(sprite);

                return sprite;
            });
        }

        _createMainBackSprite() {
            const width = this.getMainWidth();
            const height = this.getMainLargeHeight();

            const color1 = this.getBackColor1();
            const color2 = this.getBackColor2();

            const colorBitmap = new Bitmap(64, 64);
            colorBitmap.gradientFillRect(0, 0, colorBitmap.width, colorBitmap.height / 2, color1, color2, true);
            colorBitmap.gradientFillRect(
                0,
                colorBitmap.height / 2,
                colorBitmap.width,
                colorBitmap.height / 2,
                color2,
                color1,
                true
            );

            this._mainBackSprite = new Sprite(colorBitmap);
            this._mainBackSprite.anchor.x = this._mainBackSprite.anchor.y = 0.5;
            this._mainBackSprite.scale.x = width / colorBitmap.width;
            this._mainBackSprite.scale.y = height / colorBitmap.height;
            this._mainBackSprite.rotation = this.getMainRotation();
            this._mainBackSprite.mask = this._maskShape;
            this.addChild(this._mainBackSprite);

            const wrapperSprite = new Sprite();
            wrapperSprite.rotation = this.getMainRotation();
            wrapperSprite.mask = this._maskShape;
            this.addChild(wrapperSprite);

            const effectBitmap = ImageManager.loadPicture(this.getCutInBackImageName2());
            this._mainBackEffectSprite = new TilingSprite(effectBitmap);
            this._mainBackEffectSprite.blendMode = PIXI.BLEND_MODES.ADD;
            this._mainBackEffectSprite.opacity = 128;
            this._mainBackEffectSprite.move(-width / 2, -height / 2, width, height);
            wrapperSprite.addChild(this._mainBackEffectSprite);
        }

        _createCharacterSprite() {
            const l = this.getMainWidth() / 2;
            const x = -Math.cos(this.getMainRotation()) * l;
            const y = -Math.sin(this.getMainRotation()) * l;

            this._characterSprite = new Sprite();
            this._characterSprite.addChild(this._createCharacterInnerSprite());
            this._characterSprite.x = x;
            this._characterSprite.y = y;
            this._characterSprite.scale.x = this._characterSprite.scale.y = 2;
            this._characterSprite.mask = this._maskShape;
            this.addChild(this._characterSprite);

            const blurInner = this._createCharacterInnerSprite();
            blurInner.blendMode = PIXI.BLEND_MODES.ADD;
            this._blurCharacterSprite = new Sprite();
            this._blurCharacterSprite.addChild(blurInner);
            this._blurCharacterSprite.opacity = 0;
            this._blurCharacterSprite.scale.x = this._characterSprite.scale.y = 2;
            this._blurCharacterSprite.mask = this._maskShape;
            this.addChild(this._blurCharacterSprite);
        }

        _createCharacterInnerSprite() {
            const characterBitmap = ImageManager.loadPicture(this.params.picture);
            const sprite = new Sprite(characterBitmap);
            sprite.anchor.x = sprite.anchor.y = 0.5;

            sprite.x = this.params.pictureX;
            sprite.y = this.params.pictureY;
            sprite.scale.x = sprite.scale.y = this.params.pictureScale;

            return sprite;
        }

        _createBorderSprites() {
            const borderBitmap = ImageManager.loadPicture(this.getCutInBorderImageName());
            const colorTone = this.getBorderTone();

            this._borderSprites = new Array(2).fill(0).map((_, i) => {
                const wrapperSprite = new Sprite();
                wrapperSprite.rotation = this.getMainRotation();
                wrapperSprite.scale.y = 0;
                wrapperSprite.setColorTone(colorTone);
                this.addChild(wrapperSprite);

                const sprite = new TilingSprite(borderBitmap);
                callBitmapLoaded(borderBitmap, () => {
                    const w = this.getMainWidth();
                    const h = borderBitmap.height;
                    sprite.move(-w / 2, -h / 2, w, h);
                });
                sprite.blendMode = this.getCutInBorderBlendMode();
                wrapperSprite.addChild(sprite);
                return sprite;
            });
        }

        onStart() {
            this.playSe();

            this._onStartShape();
            this._onStartGlobalBackPlane();
            this._onStartGlobalBackEffect();
            this._onStartBorders();
            this._onStartCharacter();
        }

        _onStartShape() {
            Torigoya.FrameTween.create(this._maskShape.scale)
                .to(
                    {
                        y: 1,
                    },

                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        y: 0,
                    },

                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .call(() => this.finish())
                .start();
        }

        _onStartGlobalBackPlane() {
            Torigoya.FrameTween.create(this._globalBackPlaneSprite)
                .to(
                    {
                        opacity: 128,
                    },

                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        opacity: 0,
                    },

                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();
        }

        _onStartGlobalBackEffect() {
            this._globalBackEffectSprites.forEach((sprite) => {
                const wrapper = sprite.parent;
                Torigoya.FrameTween.create(wrapper)
                    .to(
                        {
                            opacity: 255,
                        },

                        this.getOpenAndCloseTime(),
                        easingBounce
                    )
                    .wait(this.getStopTime())
                    .to(
                        {
                            opacity: 0,
                        },

                        this.getOpenAndCloseTime(),
                        Torigoya.FrameTween.Easing.easeOutCubic
                    )
                    .start();
            });
        }

        _onStartBorders() {
            this._borderSprites.forEach((sprite) => {
                const wrapper = sprite.parent;
                Torigoya.FrameTween.create(wrapper.scale)
                    .to(
                        {
                            y: 1,
                        },

                        this.getOpenAndCloseTime(),
                        easingBounce
                    )
                    .wait(this.getStopTime())
                    .to(
                        {
                            y: 0,
                        },

                        this.getOpenAndCloseTime(),
                        Torigoya.FrameTween.Easing.easeOutCubic
                    )
                    .start();
            });
        }

        _onStartCharacter() {
            Torigoya.FrameTween.create(this._characterSprite)
                .to(
                    {
                        x: 0,
                        y: 0,
                        opacity: 255,
                    },

                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        opacity: 0,
                    },

                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            Torigoya.FrameTween.create(this._characterSprite.scale)
                .to(
                    {
                        x: 1,
                        y: 1,
                    },

                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        x: 3,
                        y: 3,
                    },

                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            const blurAnimationTime = this.getOpenAndCloseTime() / 2;

            Torigoya.FrameTween.create(this._blurCharacterSprite)
                .wait(blurAnimationTime)
                .to(
                    {
                        opacity: 255,
                    },

                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .to(
                    {
                        opacity: 0,
                    },

                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            Torigoya.FrameTween.create(this._blurCharacterSprite.scale)
                .wait(blurAnimationTime)
                .to(
                    {
                        x: 1,
                        y: 1,
                    },

                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .to(
                    {
                        x: 3,
                        y: 3,
                    },

                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();
        }

        onUpdate() {
            this._mainBackEffectSprite.origin.x -= 30;
            this._globalBackEffectSprites.forEach((sprite, i) => {
                sprite.origin.x += i === 0 ? -45 : 45;
            });
            this._onUpdateBorders();
        }

        _onUpdateBorders() {
            const shapeHeight = ((this.getMainLargeHeight() - this.getMainSmallHeight()) / 2) * this._maskShape.scale.y;
            const length =
                ((this.getMainSmallHeight() + (this.getMainLargeHeight() - this.getMainSmallHeight()) / 2) / 2) *
                this._maskShape.scale.y;
            const r = Math.atan2(shapeHeight, this.getMainWidth());

            this._borderSprites.forEach((sprite, i) => {
                const wrapperSprite = sprite.parent;
                const r2 = this.getMainRotation() + (i === 0 ? -1 : 1) * r;
                wrapperSprite.rotation = r2 + (i === 1 ? Math.PI : 0);
                const r3 = r2 + Math.PI / 2;
                wrapperSprite.x = Math.cos(r3) * length * (i === 0 ? -1 : 1);
                wrapperSprite.y = Math.sin(r3) * length * (i === 0 ? -1 : 1);

                sprite.origin.x += this.getBorderSpeed();
            });
        }

        onDestroy() {
            if (this._globalBackPlaneSprite.destroy) {
                this._globalBackPlaneSprite.destroy();
            } else {
                this._globalBackPlaneSprite.bitmap.resize(1, 1);
            }

            if (this._mainBackSprite.bitmap.destroy) {
                this._mainBackSprite.bitmap.destroy();
            } else {
                this._mainBackSprite.bitmap.resize(1, 1);
            }
            this._mainBackSprite.bitmap = null;
        }
    }

    class CutInManagerClass {
        constructor() {
            this._configCache = new Map();
            this._cutInParameter = null;
        }

        reset() {
            this.clear();
            this._configCache.clear();
        }

        clear() {
            this._cutInParameter = null;
        }

        setParameter(config, isEnemy = false) {
            this._cutInParameter = Object.assign({ isEnemy }, config);
        }

        getConfigByActor(actor, item) {
            const actorId = actor.actorId();

            if (DataManager.isSkill(item)) {
                const key = 'actorSkill::'.concat(actorId, '::').concat(item.id);
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                    (config) => config.actorId === actorId && config.skillId === item.id
                );

                this._configCache.set(key, result);

                return result;
            } else if (DataManager.isItem(item)) {
                const key = 'actorItem::'.concat(actorId, '::').concat(item.id);
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                    (config) =>
                        config.actorId === actorId &&
                        parseInt(config.meta['item'] || config.meta['アイテム'] || 0, 10) === item.id
                );

                this._configCache.set(key, result);

                return result;
            } else {
                return [];
            }
        }

        getConfigByEnemy(enemy, item) {
            const enemyId = enemy.enemyId();

            if (DataManager.isSkill(item)) {
                const key = 'enemySkill::'.concat(enemyId, '::').concat(item.id);
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.enemyConfig.filter(
                    (config) => config.enemyId === enemyId && config.skillId === item.id
                );

                this._configCache.set(key, result);

                return result;
            } else {
                return [];
            }
        }

        getConfigByNameFromActor(name) {
            const key = 'nameFromActor::'.concat(name);
            const cache = this._configCache.get(key);
            if (cache) return cache;

            const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                (config) => (config.meta['name'] || config.meta['呼び出し名'] || '').trim() === name
            );

            this._configCache.set(key, result);

            return result;
        }

        getConfigByNameFromEnemy(name) {
            const key = 'nameFromEnemy::'.concat(name);
            const cache = this._configCache.get(key);
            if (cache) return cache;

            const result = Torigoya.SkillCutIn.parameter.enemyConfig.filter(
                (config) => (config.meta['name'] || config.meta['呼び出し名'] || '').trim() === name
            );

            this._configCache.set(key, result);

            return result;
        }

        canPlayConfig(config, battler) {
            const condition = unescapeMetaString(config.meta['condition'] || config.meta['条件'] || '');
            if (condition && !evalCondition(battler, condition)) return false;

            return true;
        }

        isPlaying() {
            return !!this._cutInParameter;
        }

        getParameter() {
            return this._cutInParameter;
        }

        detectCutInClass() {
            return Sprite_CutInWoss;
        }
    }

    const CutInManager = new CutInManagerClass();

    function applyPluginToSpritesetBattle() {
        const upstream_Spriteset_Battle_isEffecting = Spriteset_Battle.prototype.isEffecting;
        Spriteset_Battle.prototype.isEffecting = function () {
            return upstream_Spriteset_Battle_isEffecting.apply(this) || CutInManager.isPlaying();
        };
    }

    function applyPluginToBattleManager() {
        const upstream_BattleManager_startAction = BattleManager.startAction;
        BattleManager.startAction = function () {
            this.torigoyaSkillCutIn_playCutIn();
            upstream_BattleManager_startAction.apply(this);
        };

        BattleManager.torigoyaSkillCutIn_playCutIn = function () {
            const subject = this._subject;
            if (!subject) return;

            const action = subject.currentAction();
            const item = action && action.item();
            if (!item) return;

            const configs = subject.isEnemy()
                ? CutInManager.getConfigByEnemy(subject, item)
                : CutInManager.getConfigByActor(subject, item);
            if (configs.length === 0) return;

            const config = configs.find((config) => CutInManager.canPlayConfig(config, subject));
            if (!config) return;

            CutInManager.setParameter(config, subject.isEnemy());

            this._logWindow.setWaitMode('effect');
        };
    }

    function applyPluginToGameInterpreter() {
        const upstream_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
        Game_Interpreter.prototype.updateWaitMode = function () {
            if (this._waitMode === 'torigoyaSkillCutIn') {
                return CutInManager.isPlaying();
            }

            return upstream_Game_Interpreter_updateWaitMode.apply(this);
        };
    }

    function createAndPlayCutInSprite() {
        const klass = CutInManager.detectCutInClass();
        if (!klass) {
            console.error('カットイン用のSpriteクラスが見つかりません');
            CutInManager.clear();
            return;
        }

        const parent = this._torigoyaSkillCutIn_cutInContainer || this;

        this._torigoyaSkillCutIn_cutInSprite = new klass(CutInManager.getParameter());
        this._torigoyaSkillCutIn_cutInSprite.x = Graphics.width / 2;
        this._torigoyaSkillCutIn_cutInSprite.y = Graphics.height / 2;
        parent.addChild(this._torigoyaSkillCutIn_cutInSprite);

        this._torigoyaSkillCutIn_cutInSprite.play().then(() => {
            CutInManager.clear();
            parent.removeChild(this._torigoyaSkillCutIn_cutInSprite);
            this._torigoyaSkillCutIn_cutInSprite.destroy();
            this._torigoyaSkillCutIn_cutInSprite = null;
        });
    }

    function commandShowActorCutIn({ name }) {
        const config = CutInManager.getConfigByNameFromActor(name)[0];
        if (!config) {
            return;
        }
        CutInManager.setParameter(config, false);
        this.setWaitMode('torigoyaSkillCutIn');
    }

    function commandShowEnemyCutIn({ name }) {
        const config = CutInManager.getConfigByNameFromEnemy(name)[0];
        if (!config) {
            return;
        }
        CutInManager.setParameter(config, true);
        this.setWaitMode('torigoyaSkillCutIn');
    }

    function createCutInContainer() {
        if (this._torigoyaSkillCutIn_cutInContainer) return;
        this._torigoyaSkillCutIn_cutInContainer = new Sprite();

        const layer = Torigoya.SkillCutIn.parameter.cutInLayer;

        if (this._windowLayer && layer !== 'foreground') {
            const windowIndex = this.getChildIndex(this._windowLayer);
            switch (Torigoya.SkillCutIn.parameter.cutInLayer) {
                case 'upperWindow':
                    this.addChildAt(this._torigoyaSkillCutIn_cutInContainer, windowIndex + 1);
                    break;
                case 'lowerWindow':
                    this.addChildAt(this._torigoyaSkillCutIn_cutInContainer, windowIndex);
                    break;
                default:
                    this.addChild(this._torigoyaSkillCutIn_cutInContainer);
            }
        } else {
            this.addChild(this._torigoyaSkillCutIn_cutInContainer);
        }
    }

    Torigoya.SkillCutIn = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    Torigoya.SkillCutIn.parameter.actorConfig.forEach((config) => DataManager.extractMetadata(config));
    Torigoya.SkillCutIn.parameter.enemyConfig.forEach((config) => DataManager.extractMetadata(config));

    Torigoya.SkillCutIn.CutInManager = CutInManager;
    Torigoya.SkillCutIn.Sprite_CutInBase = Sprite_CutInBase;
    Torigoya.SkillCutIn.Sprite_CutInWoss = Sprite_CutInWoss;

    applyPluginToBattleManager();
    applyPluginToSpritesetBattle();
    applyPluginToGameInterpreter();

    (() => {
        // -------------------------------------------------------------------------
        // SceneManager

        const upstream_SceneManager_onSceneTerminate = SceneManager.onSceneTerminate;
        SceneManager.onSceneTerminate = function () {
            CutInManager.reset();
            upstream_SceneManager_onSceneTerminate.apply(this);
        };

        // -------------------------------------------------------------------------
        // Scene_Message

        const upstream_Scene_Message_update = Scene_Message.prototype.update;
        Scene_Message.prototype.update = function () {
            upstream_Scene_Message_update.apply(this);
            this.torigoyaSkillCutIn_updateCutIn();
        };

        Scene_Message.prototype.torigoyaSkillCutIn_updateCutIn = function () {
            if (!CutInManager.isPlaying()) return;
            if (this._torigoyaSkillCutIn_cutInSprite) return;

            this.torigoyaSkillCutIn_createCutInContainer();
            this.torigoyaSkillCutIn_createAndPlayCutInSprite();
        };

        Scene_Message.prototype.torigoyaSkillCutIn_createCutInContainer = createCutInContainer;
        Scene_Message.prototype.torigoyaSkillCutIn_createAndPlayCutInSprite = createAndPlayCutInSprite;

        // -------------------------------------------------------------------------
        // プラグインコマンド

        PluginManager.registerCommand(Torigoya.SkillCutIn.name, 'showActorCutIn', commandShowActorCutIn);
        PluginManager.registerCommand(Torigoya.SkillCutIn.name, 'showEnemyCutIn', commandShowEnemyCutIn);
    })();
})();
