//=============================================================================
// Drill_GaugeForBoss.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.2]        敌人 - 高级BOSS生命固定框
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_GaugeForBoss +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能在战斗界面显示多个不同的BOSS生命固定框。
 * 该插件设置非常全面，你需要仔细学习以下文档：
 * "关于高级BOSS生命框.docx"、"关于参数条.docx"
 * 【支持插件关联资源的打包、加密】
 * ★★必须放在 车轮战 插件的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.生命条、魔法条、怒气条，统称"参数条"。
 * 2.不流动参数条的长度是原资源图片长度。
 *   流动参数条的长度是资源图片长度的三分之一。
 *   如果开启了参数条流动，那么参数条的图片会分成3等份，第1份和第3份要
 *   一模一样，第2份是第1份和第3份的过渡。
 *   开启流动，需要同时配置三分之一长度的 遮罩、凹槽条 资源。
 * 3.参数条可以有很多层，表示不同颜色的血量。魔法、怒气也都可以设置多层。
 * 4.生命数值图片会被分割成12份用于字符。除了0-9数字，还有"/"和"x"。
 *   分别用于最大生命(100/100)和生命层级数(x10)。
 * 5.生命层级数 = 当前生命 / 层值
 *   100的生命，100的层值，则层值为:"x1"。
 *   99的生命，100的层值，则层值为:"x0"。
 * 6.由于boss绑定将 样式和敌人 绑定在一起，也就是说，敌群设置的时候，
 *   这个boss只能出现一个，如果出现两个，则会出现两个重叠在一起样式。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以与其它插件组合。
 * 作用于：
 *   - MOG_ConsecutiveBattles 车轮战
 *     可以使得rmmv的敌人出现，以及车轮战出现的boss，出现时显示新的固定框。
 * 被扩展：
 *   - Drill_EnemyTextColor 敌人文本颜色
 *     通过该插件，可以使得boss的名字变色。
 *   - Drill_MiniPlateForState 状态和buff说明窗口
 *     通过该插件，可以状态能显示详细说明。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有gauge_meter文件夹！（img/gauge_meter）
 * 先确保项目img文件夹下是否有gauge_boss文件夹！（img/gauge_boss）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 样式1 资源-固定框背景 （img/gauge_boss）
 * 样式1 资源-固定框前景 （img/gauge_boss）
 * 样式1 资源-生命数值   （img/gauge_boss）
 * 样式1 资源-魔法数值   （img/gauge_boss）
 * 样式1 资源-怒气数值   （img/gauge_boss）
 * 样式2 ……
 * ……
 *
 * 样式1 生命条 资源-参数条     （img/gauge_meter）
 * 样式1 生命条 资源-参数条遮罩 （img/gauge_meter）
 * 样式1 生命条 资源-凹槽条     （img/gauge_meter）
 * 样式1 生命条 资源-粒子       （img/gauge_meter）
 * 样式1 魔法条 资源-参数条     （img/gauge_meter）
 * 样式1 魔法条 资源-参数条遮罩 （img/gauge_meter）
 * 样式1 魔法条 资源-凹槽条     （img/gauge_meter）
 * 样式1 魔法条 资源-粒子       （img/gauge_meter）
 * 样式2 ……
 * ……
 *
 * BOSS设置1 资源-BOSS头像 （img/gauge_boss）
 * BOSS设置2 资源-BOSS头像 （img/gauge_boss）
 * ……
 *
 * 需要配置的资源非常多，你需要仔细给你的文件分门别类。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改部分设置：
 * （冒号左右都有一个空格）
 *
 * 插件指令： >高级BOSS框 : 隐藏框 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示框 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏框 : 指定敌人 : 全部
 * 插件指令： >高级BOSS框 : 显示框 : 指定敌人 : 全部
 *
 * 插件指令： >高级BOSS框 : 隐藏生命数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏生命层级 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏魔法数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏魔法层级 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏怒气数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 隐藏怒气层级 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示生命数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示生命层级 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示魔法数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示魔法层级 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示怒气数值 : 指定敌人 : 1
 * 插件指令： >高级BOSS框 : 显示怒气层级 : 指定敌人 : 1
 * 
 * 1.指定敌人，数字对应的是战斗中从左至右第几个敌人。
 *   如果这个敌人并不是boss，则没有效果。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了显示隐藏的插件指令。修复了与技能树插件冲突的bug。
 * [v1.2]
 * 修复了生命值一直显示最大值的bug。
 *
 *
 * @param ---固定框样式---
 * @default
 *
 * @param 固定框样式-1
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==普通样式==","----整体框架----":"","生命条":"{\"标签\":\"--HP生命条--\",\"----主体----\":\"\",\"平移-条 X\":\"76\",\"平移-条 Y\":\"14\",\"条整体旋转角度\":\"0\",\"资源-条\":\"BOSS样式1-生命-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"5\",\"层级是否循环\":\"true\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"true\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"true\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"true\",\"资源-凹槽条\":\"BOSS样式1-生命-凹槽条\",\"扣除速度\":\"25\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"true\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"BOSS粒子-默认\",\"粒子出现模式\":\"右侧出现\",\"粒子流动X速度\":\"-1.4\",\"粒子流动Y速度\":\"0\",\"粒子数量\":\"20\",\"粒子持续时间\":\"80\"}","魔法条":"{\"标签\":\"--MP魔法条--\",\"----主体----\":\"\",\"平移-条 X\":\"83\",\"平移-条 Y\":\"29\",\"条整体旋转角度\":\"0\",\"资源-条\":\"BOSS样式1-魔法-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"1\",\"层级是否循环\":\"false\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"true\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"false\",\"资源-凹槽条\":\"BOSS凹槽条-默认\",\"扣除速度\":\"4\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"BOSS粒子-默认\",\"粒子出现模式\":\"底部出现\",\"粒子流动X速度\":\"-9 + time*0.9\",\"粒子流动Y速度\":\"-1.5\",\"粒子数量\":\"20\",\"粒子持续时间\":\"20\"}","怒气条":"{\"标签\":\"--TP怒气条--\",\"----主体----\":\"\",\"平移-条 X\":\"83\",\"平移-条 Y\":\"36\",\"条整体旋转角度\":\"0\",\"资源-条\":\"BOSS样式1-怒气-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"1\",\"层级是否循环\":\"false\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"true\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"false\",\"资源-凹槽条\":\"BOSS凹槽条-默认\",\"扣除速度\":\"4\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"BOSS粒子-默认\",\"粒子出现模式\":\"底部出现\",\"粒子流动X速度\":\"-9 + time*0.9\",\"粒子流动Y速度\":\"-1.5\",\"粒子数量\":\"20\",\"粒子持续时间\":\"20\"}","资源-固定框背景":"多层Boss生命固定框-框","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"左右震动","震动偏移量":"4","----加满动画----":"","是否播放生命条加满动画":"true","是否播放魔法条加满动画":"true","是否播放怒气条加满动画":"true","加满动画延迟":"60","加满时长":"90","加满方式":"匀速加满","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"94","平移-姓名 Y":"51","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"229","平移-状态 Y":"62","状态显示模式":"直线并排","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4","----生命数值----":"","资源-生命数值":"多层Boss生命固定框-生命数值","是否显示生命数值":"true","是否包含最大生命值":"false","平移-生命数值 X":"555","平移-生命数值 Y":"62","生命数值变化速度":"18","生命数值对齐方式":"右对齐","是否显示生命层级数":"false","平移-生命层级数 X":"540","平移-生命层级数 Y":"22","生命层级数对齐方式":"右对齐","----魔法数值----":"","资源-魔法数值":"","是否显示魔法数值":"false","是否包含最大魔法值":"false","平移-魔法数值 X":"555","平移-魔法数值 Y":"82","魔法数值变化速度":"18","魔法数值对齐方式":"右对齐","是否显示魔法层级数":"false","平移-魔法层级数 X":"540","平移-魔法层级数 Y":"42","魔法层级数对齐方式":"右对齐","----怒气数值----":"","资源-怒气数值":"","是否显示怒气数值":"false","是否包含最大怒气值":"false","平移-怒气数值 X":"555","平移-怒气数值 Y":"102","怒气数值变化速度":"18","怒气数值对齐方式":"右对齐","是否显示怒气层级数":"false","平移-怒气层级数 X":"540","平移-怒气层级数 Y":"42","怒气层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-2
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==超粗生命条==","----整体框架----":"","生命条":"{\"标签\":\"--HP生命条--\",\"----主体----\":\"\",\"平移-条 X\":\"84\",\"平移-条 Y\":\"9\",\"条整体旋转角度\":\"0\",\"资源-条\":\"BOSS样式2-生命-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"5\",\"层级是否循环\":\"true\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"true\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"false\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"true\",\"资源-凹槽条\":\"BOSS样式2-生命-凹槽条\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"true\",\"弹出条块模式\":\"白色块\",\"弹出X速度公式\":\"0\",\"弹出Y速度公式\":\"0\",\"持续时间\":\"40\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"BOSS样式3-粒子\",\"粒子出现模式\":\"右侧出现\",\"粒子流动X速度\":\"-1.4\",\"粒子流动Y速度\":\"0\",\"粒子数量\":\"20\",\"粒子持续时间\":\"80\"}","魔法条":"","怒气条":"","资源-固定框背景":"多层Boss生命固定框-框2","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"上下震动","震动偏移量":"4","----加满动画----":"","是否播放生命条加满动画":"true","是否播放魔法条加满动画":"true","是否播放怒气条加满动画":"true","加满动画延迟":"60","加满时长":"90","加满方式":"匀速加满","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"94","平移-姓名 Y":"51","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"229","平移-状态 Y":"62","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4","----生命数值----":"","资源-生命数值":"多层Boss生命固定框-生命数值","是否显示生命数值":"false","是否包含最大生命值":"false","平移-生命数值 X":"555","平移-生命数值 Y":"62","生命数值变化速度":"18","生命数值对齐方式":"右对齐","是否显示生命层级数":"true","平移-生命层级数 X":"540","平移-生命层级数 Y":"22","生命层级数对齐方式":"右对齐","----魔法数值----":"","资源-魔法数值":"多层Boss生命固定框-魔法数值","是否显示魔法数值":"false","是否包含最大魔法值":"false","平移-魔法数值 X":"555","平移-魔法数值 Y":"82","魔法数值变化速度":"18","魔法数值对齐方式":"右对齐","是否显示魔法层级数":"false","平移-魔法层级数 X":"540","平移-魔法层级数 Y":"42","魔法层级数对齐方式":"右对齐","----怒气数值----":"","资源-怒气数值":"多层Boss生命固定框-怒气数值","是否显示怒气数值":"false","是否包含最大怒气值":"false","平移-怒气数值 X":"555","平移-怒气数值 Y":"102","怒气数值变化速度":"18","怒气数值对齐方式":"右对齐","是否显示怒气层级数":"false","平移-怒气层级数 X":"540","平移-怒气层级数 Y":"42","怒气层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-3
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==魔法组合样式==","----整体框架----":"","生命条":"{\"标签\":\"--HP生命条--\",\"----主体----\":\"\",\"平移-条 X\":\"485\",\"平移-条 Y\":\"58\",\"条整体旋转角度\":\"180\",\"资源-条\":\"BOSS样式3-生命-反向参数条\",\"资源-条遮罩\":\"BOSS样式3-生命-反向遮罩\",\"条层级\":\"5\",\"层级是否循环\":\"true\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"false\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"true\",\"资源-凹槽条\":\"BOSS样式2-生命-凹槽条\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"白色块\",\"弹出X速度公式\":\"0\",\"弹出Y速度公式\":\"0\",\"持续时间\":\"40\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"true\",\"资源-粒子\":\"BOSS样式3-粒子\",\"粒子出现模式\":\"右侧出现\",\"粒子流动X速度\":\"-1.4\",\"粒子流动Y速度\":\"0\",\"粒子数量\":\"20\",\"粒子持续时间\":\"80\"}","魔法条":"{\"标签\":\"--MP魔法条--\",\"----主体----\":\"\",\"平移-条 X\":\"485\",\"平移-条 Y\":\"71\",\"条整体旋转角度\":\"180\",\"资源-条\":\"BOSS样式3-魔法-反向参数条\",\"资源-条遮罩\":\"BOSS样式3-魔法-反向遮罩\",\"条层级\":\"1\",\"层级是否循环\":\"false\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"false\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"true\",\"资源-凹槽条\":\"BOSS样式2-生命-凹槽条\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"白色块\",\"弹出X速度公式\":\"0\",\"弹出Y速度公式\":\"0\",\"持续时间\":\"40\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"true\",\"资源-粒子\":\"BOSS样式3-粒子\",\"粒子出现模式\":\"右侧出现\",\"粒子流动X速度\":\"-1.4\",\"粒子流动Y速度\":\"0\",\"粒子数量\":\"20\",\"粒子持续时间\":\"80\"}","怒气条":"","资源-固定框背景":"多层Boss生命固定框-框3","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"左右震动","震动偏移量":"4","----加满动画----":"","是否播放生命条加满动画":"true","是否播放魔法条加满动画":"true","是否播放怒气条加满动画":"true","加满动画延迟":"60","加满时长":"90","加满方式":"匀速加满","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"378","平移-姓名 Y":"10","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"340","平移-状态 Y":"20","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4","----生命数值----":"","资源-生命数值":"多层Boss生命固定框-生命数值-小型","是否显示生命数值":"true","是否包含最大生命值":"false","平移-生命数值 X":"425","平移-生命数值 Y":"43","生命数值变化速度":"18","生命数值对齐方式":"左对齐","是否显示生命层级数":"false","平移-生命层级数 X":"540","平移-生命层级数 Y":"22","生命层级数对齐方式":"右对齐","----魔法数值----":"","资源-魔法数值":"多层Boss生命固定框-魔法数值","是否显示魔法数值":"true","是否包含最大魔法值":"false","平移-魔法数值 X":"425","平移-魔法数值 Y":"65","魔法数值变化速度":"18","魔法数值对齐方式":"左对齐","是否显示魔法层级数":"false","平移-魔法层级数 X":"540","平移-魔法层级数 Y":"42","魔法层级数对齐方式":"右对齐","----怒气数值----":"","资源-怒气数值":"多层Boss生命固定框-怒气数值","是否显示怒气数值":"false","是否包含最大怒气值":"false","平移-怒气数值 X":"555","平移-怒气数值 Y":"102","怒气数值变化速度":"18","怒气数值对齐方式":"右对齐","是否显示怒气层级数":"false","平移-怒气层级数 X":"540","平移-怒气层级数 Y":"42","怒气层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-4
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-5
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-6
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-7
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-8
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-9
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-10
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param ---BOSS设置 1至20---
 * @default
 *
 * @param BOSS设置-1
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-2
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-3
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-4
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-5
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-6
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-7
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-8
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-9
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-10
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-11
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-12
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-13
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-14
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-15
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-16
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-17
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-18
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-19
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-20
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param ---BOSS设置21至40---
 * @default
 *
 * @param BOSS设置-21
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-22
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-23
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-24
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-25
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-26
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-27
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-28
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-29
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-30
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-31
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-32
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-33
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-34
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-35
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-36
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-37
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-38
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-39
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-40
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param ---BOSS设置41至60---
 * @default
 *
 * @param BOSS设置-41
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-42
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-43
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-44
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-45
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-46
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-47
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-48
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-49
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-50
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-51
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-52
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-53
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-54
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-55
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-56
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-57
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-58
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-59
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-60
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 */
/*~struct~GFBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的boss样式==
 *
 * @param ----整体框架----
 * @desc 
 *
 * @param 生命条
 * @parent ----整体框架----
 * @type struct<GaugeMeter>
 * @desc 生命条的设置。
 * @default 
 *
 * @param 魔法条
 * @parent ----整体框架----
 * @type struct<GaugeMeter>
 * @desc 魔法条的设置。
 * @default 
 *
 * @param 怒气条
 * @parent ----整体框架----
 * @type struct<GaugeMeter>
 * @desc 怒气条的设置。
 * @default 
 *
 * @param 资源-固定框背景
 * @parent ----整体框架----
 * @desc 固定框背景的图片资源。
 * @default BOSS固定框背景-默认
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ----整体框架----
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ----整体框架----
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ----整体框架----
 * @desc 固定框前景的图片资源，可以遮住生命条。
 * @default BOSS固定框前景-默认
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ----整体框架----
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ----整体框架----
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。
 * @default 0
 * 
 * 
 * @param ----震动效果----
 * @desc 
 * 
 * @param 受伤是否震动框
 * @parent ----震动效果----
 * @type boolean
 * @on 震动
 * @off 不震动
 * @desc true - 震动，false - 不震动
 * @default true
 *
 * @param 震动模式
 * @parent ----震动效果----
 * @type select
 * @option 左右震动
 * @value 左右震动
 * @option 上下震动
 * @value 上下震动
 * @desc 样式框震动的模式。
 * @default 左右震动
 *
 * @param 震动偏移量
 * @parent ----震动效果----
 * @type number
 * @min 1
 * @desc 震动偏移的距离，单位像素。
 * @default 10
 * 
 * 
 * @param ----加满动画----
 * @desc 
 * 
 * @param 是否播放生命条加满动画
 * @parent ----加满动画----
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 * 
 * @param 是否播放魔法条加满动画
 * @parent ----加满动画----
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 * 
 * @param 是否播放怒气条加满动画
 * @parent ----加满动画----
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param 加满动画延迟
 * @parent ----加满动画----
 * @type number
 * @min 1
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 加满时长
 * @parent ----加满动画----
 * @type number
 * @min 1
 * @desc 动画将在时间内加满生命条，单位帧。（1秒60帧）
 * @default 90
 *
 * @param 加满方式
 * @parent ----加满动画----
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 生命条加满的方式。
 * @default 匀速加满
 * 
 * @param ----姓名显示----
 * @desc 
 * 
 * @param 是否显示姓名
 * @parent ----姓名显示----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 平移-姓名 X
 * @parent ----姓名显示----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 94
 *
 * @param 平移-姓名 Y
 * @parent ----姓名显示----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 51
 *
 * @param 姓名字体大小
 * @parent ----姓名显示----
 * @type number
 * @min 1
 * @desc 姓名的字体大小。
 * @default 20
 * 
 * @param ----状态显示----
 * @desc 
 * 
 * @param 是否显示状态
 * @parent ----状态显示----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 平移-状态 X
 * @parent ----状态显示----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 229
 *
 * @param 平移-状态 Y
 * @parent ----状态显示----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 62
 *
 * @param 状态显示模式
 * @parent ----状态显示----
 * @type select
 * @option 单一闪烁
 * @value 单一闪烁
 * @option 直线并排
 * @value 直线并排
 * @desc 状态显示的模式。
 * @default 单一闪烁
 *
 * @param 状态对齐方式
 * @parent 状态显示模式
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
 * @param 状态间距
 * @parent 状态显示模式
 * @type number
 * @min 0
 * @desc 直线并排的状态之间的间距，单位像素。
 * @default 0
 *
 * @param 最大显示状态数量
 * @parent 状态显示模式
 * @type number
 * @min 1
 * @desc 直线并排能显示的状态的最大数量。超过数量的状态图标不会被显示。
 * @default 4
 * 
 * @param ----生命数值----
 * @desc 
 *
 * @param 资源-生命数值
 * @parent ----生命数值----
 * @desc 显示生命数值的图片资源。
 * @default BOSS生命数值-默认
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 * 
 * @param 是否显示生命数值
 * @parent ----生命数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 * 
 * @param 是否包含最大生命值
 * @parent 是否显示生命数值
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含。包含则显示"100/100"，不包含只显示"100"。
 * @default false
 *
 * @param 平移-生命数值 X
 * @parent 是否显示生命数值
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 555
 *
 * @param 平移-生命数值 Y
 * @parent 是否显示生命数值
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 62
 *
 * @param 生命数值变化速度
 * @parent 是否显示生命数值
 * @type number
 * @min 1
 * @desc 生命数值变化的速度。速度为比例除数，值越高速度越慢，1表示瞬间变化。
 * @default 18
 *
 * @param 生命数值对齐方式
 * @parent 是否显示生命数值
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 生命数值的对齐方式。
 * @default 右对齐
 * 
 * @param 是否显示生命层级数
 * @parent ----生命数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏。显示"x10"层级数。
 * @default true
 *
 * @param 平移-生命层级数 X
 * @parent 是否显示生命层级数
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 540
 *
 * @param 平移-生命层级数 Y
 * @parent 是否显示生命层级数
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 22
 *
 * @param 生命层级数对齐方式
 * @parent 是否显示生命层级数
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 生命层级数的对齐方式。
 * @default 右对齐
 * 
 * @param ----魔法数值----
 * @desc 
 *
 * @param 资源-魔法数值
 * @parent ----魔法数值----
 * @desc 显示魔法数值的图片资源。
 * @default 
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 * 
 * @param 是否显示魔法数值
 * @parent ----魔法数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 * 
 * @param 是否包含最大魔法值
 * @parent 是否显示魔法数值
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含。包含则显示"100/100"，不包含只显示"100"。
 * @default false
 *
 * @param 平移-魔法数值 X
 * @parent 是否显示魔法数值
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 555
 *
 * @param 平移-魔法数值 Y
 * @parent 是否显示魔法数值
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 82
 *
 * @param 魔法数值变化速度
 * @parent 是否显示魔法数值
 * @type number
 * @min 1
 * @desc 魔法数值变化的速度。速度为比例除数，值越高速度越慢，1表示瞬间变化。
 * @default 18
 *
 * @param 魔法数值对齐方式
 * @parent 是否显示魔法数值
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 魔法数值的对齐方式。
 * @default 右对齐
 * 
 * @param 是否显示魔法层级数
 * @parent ----魔法数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏。显示"x10"层级数。
 * @default false
 *
 * @param 平移-魔法层级数 X
 * @parent 是否显示魔法层级数
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 540
 *
 * @param 平移-魔法层级数 Y
 * @parent 是否显示魔法层级数
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 42
 *
 * @param 魔法层级数对齐方式
 * @parent 是否显示魔法层级数
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 魔法层级数的对齐方式。
 * @default 右对齐
 * 
 * @param ----怒气数值----
 * @desc 
 *
 * @param 资源-怒气数值
 * @parent ----怒气数值----
 * @desc 显示怒气数值的图片资源。
 * @default 
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 * 
 * @param 是否显示怒气数值
 * @parent ----怒气数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 * 
 * @param 是否包含最大怒气值
 * @parent 是否显示怒气数值
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含。包含则显示"100/100"，不包含只显示"100"。
 * @default false
 *
 * @param 平移-怒气数值 X
 * @parent 是否显示怒气数值
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 555
 *
 * @param 平移-怒气数值 Y
 * @parent 是否显示怒气数值
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 102
 *
 * @param 怒气数值变化速度
 * @parent 是否显示怒气数值
 * @type number
 * @min 1
 * @desc 怒气数值变化的速度。速度为比例除数，值越高速度越慢，1表示瞬间变化。
 * @default 18
 *
 * @param 怒气数值对齐方式
 * @parent 是否显示怒气数值
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 怒气数值的对齐方式。
 * @default 右对齐
 * 
 * @param 是否显示怒气层级数
 * @parent ----怒气数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏。显示"x10"层级数。
 * @default false
 *
 * @param 平移-怒气层级数 X
 * @parent 是否显示怒气层级数
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 540
 *
 * @param 平移-怒气层级数 Y
 * @parent 是否显示怒气层级数
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 42
 *
 * @param 怒气层级数对齐方式
 * @parent 是否显示怒气层级数
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 怒气层级数的对齐方式。
 * @default 右对齐
 *
 */
/*~struct~GFBBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的boss设置--
 * 
 * @param ----常规----
 * @desc 
 * 
 * @param 初始是否显示
 * @parent ----常规----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-固定框 X
 * @parent ----常规----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-固定框 Y
 * @parent ----常规----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 固定框起点 X
 * @parent ----常规----
 * @desc 固定框初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 固定框起点 Y
 * @parent ----常规----
 * @desc 固定框初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 固定框移动时长
 * @parent ----常规----
 * @type number
 * @min 1
 * @desc 从起点位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 60
 * 
 * @param ----绑定关联----
 * @desc 
 *
 * @param 绑定的敌人
 * @parent ----绑定关联----
 * @desc 设置指定的敌人为BOSS。
 * @type enemy
 * @default 0
 *
 * @param 绑定的样式
 * @parent ----绑定关联----
 * @desc 设置这个BOSS对应的框样式。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param ----BOSS头像----
 * @desc 
 *
 * @param 资源-BOSS头像
 * @parent ----BOSS头像----
 * @desc 生命条中的粒子效果的粒子图片资源。
 * @default BOSS头像-默认
 * @require 1
 * @dir img/gauge_boss/
 * @type file
 *
 * @param 平移-头像 X
 * @parent ----BOSS头像----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。可为负数。
 * @default 6
 *
 * @param 平移-头像 Y
 * @parent ----BOSS头像----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。可为负数。
 * @default 6
 * 
 * @param ----层值----
 * @desc 
 *
 * @param 单层生命条的层值
 * @parent ----层值----
 * @desc 作用于生命条。根据该BOSS的最大生命值，分配到单层生命条的值。
 * @type number
 * @min 1
 * @default 500
 *
 * @param 单层魔法条的层值
 * @parent ----层值----
 * @desc 作用于魔法条。根据该BOSS的最大魔法值，分配到单层魔法条的值。
 * @type number
 * @min 1
 * @default 200
 *
 * @param 单层怒气条的层值
 * @parent ----层值----
 * @desc 作用于怒气条。根据该BOSS的最大怒气值，分配到单层怒气条的值。
 * @type number
 * @min 1
 * @default 100
 *
 *
 * @param ----界面层级----
 * @desc 
 *
 * @param 战斗界面图片层级
 * @parent ----界面层级----
 * @type number
 * @min 0
 * @desc 战斗界面中，该框在战斗前面层，图片层级控制这些层的先后顺序。与多层战斗背景的图片层级共享。
 * @default 10
 * 
 *
 */
/*~struct~GaugeMeter:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的参数条--
 *
 * @param ----主体----
 * @desc 
 *
 * @param 平移-条 X
 * @parent ----主体----
 * @desc 以固定框的位置为基准，x轴方向平移，单位像素。
 * @default 76
 *
 * @param 平移-条 Y
 * @parent ----主体----
 * @desc 以固定框的位置为基准，x轴方向平移，单位像素。
 * @default 14
 *
 * @param 条整体旋转角度
 * @parent ----主体----
 * @type number
 * @min 0
 * @desc 整个条的旋转角度。
 * @default 0
 *
 * @param 资源-条
 * @parent ----主体----
 * @desc 条的图片资源。
 * @default BOSS参数条-默认
 * @require 1
 * @dir img/gauge_meter/
 * @type file
 *
 * @param 资源-条遮罩
 * @parent ----主体----
 * @desc 条的遮罩资源。注意，如果设置流动，遮罩只需要条的三分之一长度。
 * @default 
 * @require 1
 * @dir img/gauge_meter/
 * @type file
 *
 * @param 条层级
 * @parent ----主体----
 * @type number
 * @min 1
 * @desc 资源中对应的条层级数量。
 * @default 4
 *
 * @param 层级是否循环
 * @parent ----主体----
 * @type boolean
 * @on 循环
 * @off 不循环
 * @desc 如果敌人的参数值比最大的层级还要大，则循环使用层级。不循环则一直保持在最大层级。
 * @default true
 *
 * @param ----缩短效果----
 * @desc 
 *
 * @param 条是否瞬间缩短
 * @parent ----缩短效果----
 * @type boolean
 * @on 瞬间缩短
 * @off 匀速缩短
 * @desc 你需要考虑与弹出条的组合关系，如果有弹出条，建议瞬间缩短。
 * @default true
 *
 * @param 缩短速度
 * @parent ----缩短效果----
 * @desc 条变长或者缩短的速度，速度为比例除数，值越小，速度越快。
 * @default 2.5
 *
 * @param ----流动效果----
 * @desc 
 *
 * @param 条是否流动
 * @parent ----流动效果----
 * @type boolean
 * @on 流动
 * @off 不流动
 * @desc 注意，设置流动后，素材长度取三分之一。
 * @default true
 *
 * @param 条流动速度
 * @parent ----流动效果----
 * @desc 条向右流动的速度，单位像素/帧。可为小数，可为负数，负数向左流动。
 * @default 5.0
 *
 * @param ----凹槽条----
 * @desc 
 *
 * @param 是否启用凹槽条
 * @parent ----凹槽条----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 资源-凹槽条
 * @parent ----凹槽条----
 * @desc 生命凹槽条的图片资源。注意，设置流动，凹槽条为参数条的三分之一长。
 * @default BOSS凹槽条-默认
 * @require 1
 * @dir img/gauge_meter/
 * @type file
 *
 * @param 扣除速度
 * @parent ----凹槽条----
 * @type number
 * @min 1
 * @desc 凹槽条缩短的速度，单位像素/帧。
 * @default 15
 *
 * @param 扣除方式
 * @parent ----凹槽条----
 * @type select
 * @option 缩短扣除
 * @value 缩短扣除
 * @desc 凹槽条的扣除方式。
 * @default 缩短扣除
 *
 * @param 扣除延迟
 * @parent ----凹槽条----
 * @type number
 * @min 0
 * @desc 凹槽条执行扣除的延迟时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param 连续减少是否刷新延迟
 * @parent ----凹槽条----
 * @type boolean
 * @on 刷新
 * @off 不刷新
 * @desc 参数连续减少时，比如连续受伤，会重新计算延迟时间，这时候你会看见一长条的红色凹槽条，等同于打出的伤害。
 * @default true
 *
 * @param ----弹出条----
 * @desc 
 *
 * @param 是否启用弹出效果
 * @parent ----弹出条----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 弹出条块模式
 * @parent ----弹出条----
 * @type select
 * @option 当前参数条
 * @value 当前参数条
 * @option 白色块
 * @value 白色块
 * @option 黑色块
 * @value 黑色块
 * @desc 弹出条的块图片模式，当前参数条是指切割参数条一部分并弹出的效果。
 * @default 当前参数条
 *
 * @param 弹出X速度公式
 * @parent ----弹出条----
 * @desc 弹出的x方向速度公式。公式中可用时间变量time以及随机数ran（0到1之间）。time单位为帧。（1秒60帧）
 * @default 2*ran -1
 *
 * @param 弹出Y速度公式
 * @parent ----弹出条----
 * @desc 弹出的y方向速度公式。公式中可用时间变量time以及随机数ran（0到1之间）。time单位为帧。（1秒60帧）
 * @default -9 + time*0.9
 *
 * @param 持续时间
 * @parent ----弹出条----
 * @type number
 * @min 0
 * @desc 弹出条弹出后到消失的持续时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param ----粒子效果----
 * @desc 
 *
 * @param 是否启用粒子效果
 * @parent ----粒子效果----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param 资源-粒子
 * @parent ----粒子效果----
 * @desc 生命条中的粒子效果的粒子图片资源。
 * @default BOSS粒子-默认
 * @require 1
 * @dir img/gauge_meter/
 * @type file
 *
 * @param 粒子出现模式
 * @parent ----粒子效果----
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
 * @param 粒子流动X速度
 * @parent ----粒子效果----
 * @desc 粒子在x轴方向移动的速度。可为小数，可为负数。
 * @default 0
 *
 * @param 粒子流动Y速度
 * @parent ----粒子效果----
 * @desc 粒子在y轴方向移动的速度。可为小数，可为负数。
 * @default -1.5
 *
 * @param 粒子数量
 * @parent ----粒子效果----
 * @type number
 * @min 0
 * @desc 条中出现的粒子的数量。
 * @default 20
 *
 * @param 粒子持续时间
 * @parent ----粒子效果----
 * @type number
 * @min 1
 * @desc 粒子出现到粒子消失的时间。如果粒子离开参数条边界，则视为该粒子已经消失。
 * @default 20
 *
 * @param ----游标----
 * @desc 
 *
 * @param 是否启用游标
 * @parent ----游标----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param 游标显示模式
 * @parent ----游标----
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
 * @param 是否启用多层重置
 * @parent ----游标----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 参数有多层时，重置游标将根据多层的位置浮动。如果不重置，第一层满了，游标将一直停在满的位置。
 * @default false
 *
 * @param 资源-游标
 * @parent ----游标----
 * @desc 参数条中游标的图片资源。可以为单张，也可以为多张形成gif。
 * @default ["boss框游标-默认"]
 * @require 1
 * @dir img/gauge_meter/
 * @type file[]
 *
 * @param 偏移-游标 X
 * @parent ----游标----
 * @desc 以游标浮动的位置为基准，x轴方向偏移，单位像素。
 * @default 0
 *
 * @param 偏移-游标 Y
 * @parent ----游标----
 * @desc 以游标浮动的位置为基准，y轴方向偏移，单位像素。
 * @default 0
 *
 * @param 动画帧间隔
 * @parent ----游标----
 * @type number
 * @min 1
 * @desc 多帧游标的播放帧间隔，间隔越小，播放速度越快。
 * @default 4
 *
 * @param 是否倒放
 * @parent ----游标----
 * @type boolean
 * @on 倒放
 * @off 正常播放
 * @desc true - 倒放，false - 正常播放。多帧游标的播放顺序。
 * @default false
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GFB (Gauge_For_Boss)
//		临时全局变量	DrillUp.g_GFB_xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		生命条可以分成非常细的结构，大体框架与功能如下：
//			BOSS绑定 -> 固定框样式  一对一
//			固定框样式 -> BOSS绑定	一对多
//			参数条 -> 固定框样式	一对一
//			固定框样式 -> 参数条	一对多
//			
//			固定框样式：【GFB_Style】
//				->背景/前景布局
//				->生命条（参数条）
//				->魔法条（参数条）
//				->怒气条（参数条）
//				->震动效果
//				->加满动画
//				->数值显示
//				->状态显示
//			参数条：【Drill_GaugeMeter_Sprite】
//				->位置、图片、遮罩
//				->层级
//				->缩短效果
//				->流动效果
//				->凹槽条
//				->弹出条
//				->粒子效果
//				->游标
//			BOSS绑定：【GFB_Bind】
//				->位置、可见初始化
//				->初始位移
//				->绑定关联
//				->BOSS头像
//				->单层生命条的层值
//				->单层魔法条的层值
//				->单层怒气条的层值
//				->战斗界面层级
//				->地图界面层级	x
//
//		参数条是高度对象化的sprite大类。具体在类说明中有解释。		
//
//		弹出条局限性：	bitmap是rmmv自己写的类，经过图片存储等中介转换，最后给texture来渲染。
//						如果我要把sprite转成图片，必须先建立一个stage，然后addchild，再然后render，生成的图片还是有黑底的canvas。
//						（目前查看pixi的定义和rmmv的snap()方法，从脚本来说，非常难做到sprite单独导出成图片）
//						总的来说，目前的弹出条，只是根据以存在的bitmap来画，而不是sprite转换后的效果来画。粒子效果就加不进弹出条了。
//		数值显示：	数值显示稍微有点绕。已知js最大的位是16位。
//					那么包括显示显示生命上限，就是16+1+16个数字字符图片。
//					这里使用一个tank，根据当前生命值，分割数值，分配位数。
//					然后将位数的sprite一个个绘制上去。
//					【原本想把数值也对象化，方便拆解分离，但是由于最大生命、层级、以及资源分割成12份等的因素，
//					实时变化的hp还需要随时组装成tank的组传入，流程耦合太高，难以分离。】
//		状态显示：	状态和数值原理一样，建立固定数量的sprite，排成一排，然后根据情况变图标。
//
//		数值显示隐藏：	这里默认不建立那么多的sprite，如果显示/隐藏，则根据需求，重刷sprite。
//						假设2个boss，怒气、魔法、生命 + 最大值显示，如果不约束，则默认产生 2*3*33 个sprite。
//						（使用约束虽然一定程度上节省了一点点内存，但是代码这里变得比较绕。）

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeForBoss = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeForBoss');
	
	// * 变量获取 - 参数条初始化函数（必须写在前面）
	DrillUp.GFB_GaugeMeter_Init = function( dataFrom ) {
		var data = {};
		/*----------------GaugeMeter---------------*/
		//->图片、位置、遮罩
		data['x'] = Number( dataFrom["平移-条 X"] || 47);
		data['y'] = Number( dataFrom["平移-条 Y"] || 28);
		data['rotation'] = Number( dataFrom["条整体旋转角度"] || 0);
		data['src_meter'] = String( dataFrom["资源-条"] );
		data['src_meterMask'] = String( dataFrom["资源-条遮罩"] );
		//->层级
		data['level_count'] = Number( dataFrom["条层级"] || 1);
		data['level_is_loop'] = String( dataFrom["层级是否循环"] || "true") === "true";
		//->缩短效果
		data['shorten_speed'] = Math.abs( Number( dataFrom["缩短速度"] || 5.0) );
		data['shorten_speed'] = (String( dataFrom["条是否瞬间缩短"] || "true") === "true") ? 0.0 : data['shorten_speed'] ;
		//->流动效果
		data['m_enable'] = String( dataFrom["条是否流动"] || "true") === "true";
		data['m_speed'] = Number( dataFrom["条流动速度"] || 0);
		//->凹槽条
		data['l_enable'] = String( dataFrom["是否启用凹槽条"] || "true") === "true";
		data['l_meter'] = String( dataFrom["资源-凹槽条"] );
		data['l_speed'] = Number( dataFrom["扣除速度"] || 4);
		data['l_type'] = String( dataFrom["扣除方式"] || "缩短扣除");
		data['l_delay'] = Number( dataFrom["扣除延迟"] || 0);
		data['l_delayReflash'] = String( dataFrom["连续减少是否刷新延迟"] || "true") === "true";
		//->弹出条
		data['s_enable'] = String( dataFrom["是否启用弹出效果"] || "true") === "true";
		data['s_type'] = String( dataFrom["弹出条块模式"] || "当前参数条");
		data['s_formulaX'] = String( dataFrom["弹出X速度公式"] || "2*ran -1");
		data['s_formulaY'] = String( dataFrom["弹出Y速度公式"] || "-9 + time*0.9");
		data['s_life'] = Number( dataFrom["持续时间"] || 60);
		//->粒子效果
		data['p_enable'] = String( dataFrom["是否启用粒子效果"] || "true") === "true";
		data['p_src'] = String( dataFrom["资源-粒子"] );
		data['p_mode'] = String( dataFrom["粒子出现模式"] || "底部出现");
		data['p_speedX'] = Number( dataFrom["粒子流动X速度"] || 0);
		data['p_speedY'] = Number( dataFrom["粒子流动Y速度"] || -1.5);
		data['p_count'] = Number( dataFrom["粒子数量"] || 20);
		data['p_life'] = Number( dataFrom["粒子持续时间"] || 20);
		//->游标
		data['f_enable'] = String( dataFrom["是否启用游标"] || "false") === "true";
		data['f_mode'] = String( dataFrom["游标显示模式"] || "一直显示");
		data['f_reset'] = String( dataFrom["是否启用多层重置"] || "false") === "true";
		if( dataFrom['资源-游标'] ){
			data['f_src'] = JSON.parse( dataFrom['资源-游标'] );
		}else{
			data['f_src'] = [];
		}
		data['f_x'] = Number( dataFrom["偏移-游标 X"] || 0);
		data['f_y'] = Number( dataFrom["偏移-游标 Y"] || 0);
		data['f_interval'] = Number( dataFrom["动画帧间隔"] || 0);
		data['f_backrun'] = String( dataFrom["是否倒放"] || "true") === "true";
		
		return data;
	};
	
	DrillUp.g_GFB_Style_max = 10;
	DrillUp.g_GFB_Style = [];
	for (var i = 0; i < DrillUp.g_GFB_Style_max; i++) {
		if( DrillUp.parameters['固定框样式-' + String(i+1) ] != "" ){
			DrillUp.g_GFB_Style[i] = JSON.parse(DrillUp.parameters['固定框样式-' + String(i+1) ]);
			
			/*----------------GFB_Style---------------*/
			//->背景/前景布局
			DrillUp.g_GFB_Style[i]['src_background'] = String(DrillUp.g_GFB_Style[i]["资源-固定框背景"]);
			DrillUp.g_GFB_Style[i]['src_foreground'] = String(DrillUp.g_GFB_Style[i]["资源-固定框前景"]);
			DrillUp.g_GFB_Style[i]['background_x'] = Number(DrillUp.g_GFB_Style[i]["平移-固定框背景 X"] || 0);
			DrillUp.g_GFB_Style[i]['background_y'] = Number(DrillUp.g_GFB_Style[i]["平移-固定框背景 Y"] || 0);
			DrillUp.g_GFB_Style[i]['foreground_x'] = Number(DrillUp.g_GFB_Style[i]["平移-固定框前景 X"] || 0);
			DrillUp.g_GFB_Style[i]['foreground_y'] = Number(DrillUp.g_GFB_Style[i]["平移-固定框前景 Y"] || 0);
			//->生命条（参数条）
			if( DrillUp.g_GFB_Style[i]['生命条'] != "" ){
				var hp = JSON.parse(DrillUp.g_GFB_Style[i]['生命条']);
				DrillUp.g_GFB_Style[i]['hp'] = DrillUp.GFB_GaugeMeter_Init( hp );
			}
			//->魔法条（参数条）
			if( DrillUp.g_GFB_Style[i]['魔法条'] != "" ){
				var mp = JSON.parse(DrillUp.g_GFB_Style[i]['魔法条']);
				DrillUp.g_GFB_Style[i]['mp'] = DrillUp.GFB_GaugeMeter_Init( mp );
			}
			//->怒气条（参数条）
			if( DrillUp.g_GFB_Style[i]['怒气条'] != "" ){
				var tp = JSON.parse(DrillUp.g_GFB_Style[i]['怒气条']);
				DrillUp.g_GFB_Style[i]['tp'] = DrillUp.GFB_GaugeMeter_Init( tp );
			}
			
			//->震动效果
			DrillUp.g_GFB_Style[i]['shake_enable'] = String(DrillUp.g_GFB_Style[i]["受伤是否震动框"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['shake_mode'] = String(DrillUp.g_GFB_Style[i]["震动模式"] || "上下震动");
			DrillUp.g_GFB_Style[i]['shake_float'] = Number(DrillUp.g_GFB_Style[i]["震动偏移量"] || 4);
			
			//->加满动画
			DrillUp.g_GFB_Style[i]['fill_hp_enable'] = String(DrillUp.g_GFB_Style[i]["是否播放生命条加满动画"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['fill_mp_enable'] = String(DrillUp.g_GFB_Style[i]["是否播放魔法条加满动画"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['fill_tp_enable'] = String(DrillUp.g_GFB_Style[i]["是否播放怒气条加满动画"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['fill_delay'] = Number(DrillUp.g_GFB_Style[i]["加满动画延迟"] || 30);
			DrillUp.g_GFB_Style[i]['fill_time'] = Number(DrillUp.g_GFB_Style[i]["加满时长"] || 90);
			DrillUp.g_GFB_Style[i]['fill_type'] = String(DrillUp.g_GFB_Style[i]["加满方式"] || "匀速加满");
			
			//->名字显示
			DrillUp.g_GFB_Style[i]['name_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示姓名"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['name_x'] = Number(DrillUp.g_GFB_Style[i]["平移-姓名 X"] || 0);
			DrillUp.g_GFB_Style[i]['name_y'] = Number(DrillUp.g_GFB_Style[i]["平移-姓名 Y"] || 0);
			DrillUp.g_GFB_Style[i]['name_fontsize'] = Number(DrillUp.g_GFB_Style[i]["姓名字体大小"] || 22);
			
			//->状态显示
			DrillUp.g_GFB_Style[i]['state_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示状态"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['state_x'] = Number(DrillUp.g_GFB_Style[i]["平移-状态 X"] || 229);
			DrillUp.g_GFB_Style[i]['state_y'] = Number(DrillUp.g_GFB_Style[i]["平移-状态 Y"] || 46);
			DrillUp.g_GFB_Style[i]['state_mode'] = String(DrillUp.g_GFB_Style[i]["状态显示模式"] || "单一闪烁");
			DrillUp.g_GFB_Style[i]['state_align'] = String(DrillUp.g_GFB_Style[i]["状态对齐方式"] || "左对齐");
			DrillUp.g_GFB_Style[i]['state_spacing'] = Number(DrillUp.g_GFB_Style[i]["状态间距"] || 0);
			DrillUp.g_GFB_Style[i]['state_max'] = Number(DrillUp.g_GFB_Style[i]["最大显示状态数量"] || 4);
			
			//->数值显示
			DrillUp.g_GFB_Style[i]['num_hp_src'] = String(DrillUp.g_GFB_Style[i]["资源-生命数值"] );
			DrillUp.g_GFB_Style[i]['num_hp_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示生命数值"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['num_hp_enable_max'] = String(DrillUp.g_GFB_Style[i]["是否包含最大生命值"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_hp_x'] = Number(DrillUp.g_GFB_Style[i]["平移-生命数值 X"] || 555);
			DrillUp.g_GFB_Style[i]['num_hp_y'] = Number(DrillUp.g_GFB_Style[i]["平移-生命数值 Y"] || 62);
			DrillUp.g_GFB_Style[i]['num_hp_speed'] = Number(DrillUp.g_GFB_Style[i]["生命数值变化速度"] || 18);
			DrillUp.g_GFB_Style[i]['num_hp_align'] = String(DrillUp.g_GFB_Style[i]["生命数值对齐方式"] || "右对齐");
			DrillUp.g_GFB_Style[i]['num_hp_level_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示生命层级数"] || "true") === "true";
			DrillUp.g_GFB_Style[i]['num_hp_level_x'] = Number(DrillUp.g_GFB_Style[i]["平移-生命层级数 X"] || 540);
			DrillUp.g_GFB_Style[i]['num_hp_level_y'] = Number(DrillUp.g_GFB_Style[i]["平移-生命层级数 Y"] || 22);
			DrillUp.g_GFB_Style[i]['num_hp_level_align'] = String(DrillUp.g_GFB_Style[i]["生命层级数对齐方式"] || "右对齐");

			DrillUp.g_GFB_Style[i]['num_mp_src'] = String(DrillUp.g_GFB_Style[i]["资源-魔法数值"] );
			DrillUp.g_GFB_Style[i]['num_mp_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示魔法数值"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_mp_enable_max'] = String(DrillUp.g_GFB_Style[i]["是否包含最大魔法值"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_mp_x'] = Number(DrillUp.g_GFB_Style[i]["平移-魔法数值 X"] || 555);
			DrillUp.g_GFB_Style[i]['num_mp_y'] = Number(DrillUp.g_GFB_Style[i]["平移-魔法数值 Y"] || 82);
			DrillUp.g_GFB_Style[i]['num_mp_speed'] = Number(DrillUp.g_GFB_Style[i]["魔法数值变化速度"] || 18);
			DrillUp.g_GFB_Style[i]['num_mp_align'] = String(DrillUp.g_GFB_Style[i]["魔法数值对齐方式"] || "右对齐");
			DrillUp.g_GFB_Style[i]['num_mp_level_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示魔法层级数"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_mp_level_x'] = Number(DrillUp.g_GFB_Style[i]["平移-魔法层级数 X"] || 540);
			DrillUp.g_GFB_Style[i]['num_mp_level_y'] = Number(DrillUp.g_GFB_Style[i]["平移-魔法层级数 Y"] || 42);
			DrillUp.g_GFB_Style[i]['num_mp_level_align'] = String(DrillUp.g_GFB_Style[i]["魔法层级数对齐方式"] || "右对齐");
			
			DrillUp.g_GFB_Style[i]['num_tp_src'] = String(DrillUp.g_GFB_Style[i]["资源-怒气数值"] );
			DrillUp.g_GFB_Style[i]['num_tp_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示怒气数值"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_tp_enable_max'] = String(DrillUp.g_GFB_Style[i]["是否包含最大怒气值"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_tp_x'] = Number(DrillUp.g_GFB_Style[i]["平移-怒气数值 X"] || 555);
			DrillUp.g_GFB_Style[i]['num_tp_y'] = Number(DrillUp.g_GFB_Style[i]["平移-怒气数值 Y"] || 102);
			DrillUp.g_GFB_Style[i]['num_tp_speed'] = Number(DrillUp.g_GFB_Style[i]["怒气数值变化速度"] || 18);
			DrillUp.g_GFB_Style[i]['num_tp_align'] = String(DrillUp.g_GFB_Style[i]["怒气数值对齐方式"] || "右对齐");
			DrillUp.g_GFB_Style[i]['num_tp_level_enable'] = String(DrillUp.g_GFB_Style[i]["是否显示怒气层级数"] || "false") === "true";
			DrillUp.g_GFB_Style[i]['num_tp_level_x'] = Number(DrillUp.g_GFB_Style[i]["平移-怒气层级数 X"] || 540);
			DrillUp.g_GFB_Style[i]['num_tp_level_y'] = Number(DrillUp.g_GFB_Style[i]["平移-怒气层级数 Y"] || 42);
			DrillUp.g_GFB_Style[i]['num_tp_level_align'] = String(DrillUp.g_GFB_Style[i]["怒气层级数对齐方式"] || "右对齐");
			
			//alert(JSON.stringify(DrillUp.g_GFB_Style[i]));
		}else{
			DrillUp.g_GFB_Style[i] = [];
		}
	}
	
	DrillUp.GFB_Bind_max = 60;
	DrillUp.GFB_Bind = [];
	for (var i = 0; i < DrillUp.GFB_Bind_max; i++) {
		if( DrillUp.parameters['BOSS设置-' + String(i+1) ] != "" ){
			DrillUp.GFB_Bind[i] = JSON.parse(DrillUp.parameters['BOSS设置-' + String(i+1) ]);

			/*----------------GFB_Bind---------------*/
			//->位置、可见初始化
			DrillUp.GFB_Bind[i]['frame_x'] = Number(DrillUp.GFB_Bind[i]["平移-固定框 X"] || 0);
			DrillUp.GFB_Bind[i]['frame_y'] = Number(DrillUp.GFB_Bind[i]["平移-固定框 Y"] || 0);
			DrillUp.GFB_Bind[i]['visible'] = String(DrillUp.GFB_Bind[i]["初始是否显示"] || "true") === "true";
			DrillUp.GFB_Bind[i]['frame_slide_x'] = Number(DrillUp.GFB_Bind[i]["固定框起点 X"] || 0);
			DrillUp.GFB_Bind[i]['frame_slide_y'] = Number(DrillUp.GFB_Bind[i]["固定框起点 Y"] || -80);
			DrillUp.GFB_Bind[i]['frame_slide_time'] = Number(DrillUp.GFB_Bind[i]["固定框移动时长"] || 60);
			//->绑定关联
			DrillUp.GFB_Bind[i]['enemy_id'] = Number(DrillUp.GFB_Bind[i]["绑定的敌人"] || 0);
			DrillUp.GFB_Bind[i]['style_id'] = Number(DrillUp.GFB_Bind[i]["绑定的样式"] || 1);
			//->BOSS头像
			DrillUp.GFB_Bind[i]['head_src'] = String(DrillUp.GFB_Bind[i]["资源-BOSS头像"] );
			DrillUp.GFB_Bind[i]['head_x'] = Number(DrillUp.GFB_Bind[i]["平移-头像 X"] || 0);
			DrillUp.GFB_Bind[i]['head_y'] = Number(DrillUp.GFB_Bind[i]["平移-头像 Y"] || 0);
			//->单层条的层值
			DrillUp.GFB_Bind[i]['hp_level_max'] = Number(DrillUp.GFB_Bind[i]["单层生命条的层值"] || 500);
			DrillUp.GFB_Bind[i]['mp_level_max'] = Number(DrillUp.GFB_Bind[i]["单层魔法条的层值"] || 200);
			DrillUp.GFB_Bind[i]['tp_level_max'] = Number(DrillUp.GFB_Bind[i]["单层怒气条的层值"] || 100);
			
			//->战斗界面层级
			DrillUp.GFB_Bind[i]['z_index'] = Number(DrillUp.GFB_Bind[i]["战斗界面图片层级"] || 10);
			
			//->地图界面层级
			
		}else{
			DrillUp.GFB_Bind[i] = [];
		}
	}
	
	
//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.loadGaugeBoss = function(filename) {
    return this.loadBitmap('img/gauge_boss/', filename, 0, true);
};
ImageManager.loadGaugeMeter = function(filename) {
    return this.loadBitmap('img/gauge_meter/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_GFB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFB_pluginCommand.call(this, command, args);
	if (command === '>高级BOSS框') {
		if( !$gameTemp._drill_GFB_command ){$gameTemp._drill_GFB_command = [];}
		
		$gameTemp._drill_GFB_command.push( args );
	}
};
//=============================================================================
// * 添加固定框
//=============================================================================
//==============================
// * 战斗 - 创建背景
//==============================
var _drill_GFB_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFB_createLowerLayer.call(this);
	
	if( !this._drill_battleUpArea ){		//菜单前面层
		this._drill_battleUpArea = new Sprite();
		this._battleField.addChild(this._drill_battleUpArea);
	}
	
	this._drill_GFB_tank = [];
	this.drill_GFB_refreshAll();
}
//==============================
// * 战斗 - 刷新boss框
//==============================
Spriteset_Battle.prototype.drill_GFB_refreshAll = function() {
	var enemy = $gameTroop.members();
	for(var i = 0; i< enemy.length; i++ ){
		for(var j = 0; j< DrillUp.GFB_Bind.length; j++ ){
			if( enemy[i].isEnemy() && enemy[i].enemyId() == DrillUp.GFB_Bind[j]['enemy_id'] ){
				if( !enemy[i]._drill_has_GFB ){
					enemy[i]._drill_has_GFB = true;
					
					var temp_sprite = new Drill_GFB_StyleSprite(DrillUp.GFB_Bind[j],enemy[i]);
					this._drill_GFB_tank.push(temp_sprite);
					this._drill_battleUpArea.addChild(temp_sprite);
					
				}
			}
		}
	}
	//层级排序
	this._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
}

//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_GFB_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _drill_GFB_update.call(this);
	if( $gameTemp._drill_GFB_needReflash ){
		$gameTemp._drill_GFB_needReflash = false;
		this.drill_GFB_refreshAll();
	}
	this.drill_updatePluginCommand();
};

//==============================
// * 战斗 - 插件指令效果刷新
//==============================
Spriteset_Battle.prototype.drill_updatePluginCommand = function() {
	if( !$gameTemp._drill_GFB_command ){ return }
	if( $gameTemp._drill_GFB_command.length == 0 ){ return }
	if( this._drill_GFB_tank.length == 0 ){ return }
	
	for( var i=$gameTemp._drill_GFB_command.length-1; i>=0 ;i-- ){
		var args = $gameTemp._drill_GFB_command[i];
		var type = String(args[1]);
		var temp1 = String(args[3]);
		var temp2 = String(args[5]);
		if(temp2 == "全部"){
			for(var j=0; j<this._drill_GFB_tank.length; j++){
				var gauge = this._drill_GFB_tank[j];
				var refresh_numbers = false;
				if (type == "隐藏框") { gauge.visible = false; }
				if (type == "显示框") { gauge.visible = true; }
				if (type == "隐藏生命数值") { gauge._drill_style['num_hp_enable'] = false; refresh_numbers = true; }
				if (type == "显示生命数值") { gauge._drill_style['num_hp_enable'] = true; refresh_numbers = true; }
				if (type == "隐藏魔法数值") { gauge._drill_style['num_mp_enable'] = false; refresh_numbers = true; }
				if (type == "显示魔法数值") { gauge._drill_style['num_mp_enable'] = true; refresh_numbers = true; }
				if (type == "隐藏怒气数值") { gauge._drill_style['num_tp_enable'] = false; refresh_numbers = true; }
				if (type == "显示怒气数值") { gauge._drill_style['num_tp_enable'] = true; refresh_numbers = true; }
				if ( refresh_numbers ) {
					gauge.drill_recreateNumbers();	//重刷数值内容
				}
			}
		}else{
			var enemy = $gameTroop.members()[Number(temp2) -1];
			for(var j=0; j<this._drill_GFB_tank.length; j++){
				var gauge = this._drill_GFB_tank[j];
				var refresh_numbers = false;
				if( gauge._drill_enemy.enemyId == enemy.enemyId ){
					if (type == "隐藏框") { gauge.visible = false; }
					if (type == "显示框") { gauge.visible = true; }
					if (type == "隐藏生命数值") { gauge._drill_style['num_hp_enable'] = false; refresh_numbers = true; }
					if (type == "显示生命数值") { gauge._drill_style['num_hp_enable'] = true; refresh_numbers = true; }
					if (type == "隐藏魔法数值") { gauge._drill_style['num_mp_enable'] = false; refresh_numbers = true; }
					if (type == "显示魔法数值") { gauge._drill_style['num_mp_enable'] = true; refresh_numbers = true; }
					if (type == "隐藏怒气数值") { gauge._drill_style['num_tp_enable'] = false; refresh_numbers = true; }
					if (type == "显示怒气数值") { gauge._drill_style['num_tp_enable'] = true; refresh_numbers = true; }
					if ( refresh_numbers ) {
						gauge.drill_recreateNumbers();	//重刷数值内容
					}
				}
			}
		}
		$gameTemp._drill_GFB_command.splice(i,1);
	}
}
//==============================
// * 战斗 - 敌人出现
//==============================
var _drill_GFB_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    _drill_GFB_appear.call(this);
	$gameTemp._drill_GFB_needReflash = true;
};

//==============================
// * 战斗 - 敌人变身
//==============================
var _drill_GFB_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
	_drill_GFB_transform.call(this,enemyId);
	$gameTemp._drill_GFB_needReflash = true;
};

//==============================
// * 战斗 - 兼容车轮战
//==============================
if(Imported.MOG_ConsecutiveBattles){
	var _drill_GFB_prepareConBat = BattleManager.prepareConBat;
	BattleManager.prepareConBat = function() {
		_drill_GFB_prepareConBat.call(this);
		$gameTemp._drill_GFB_needReflash = true;
	}
}

//=============================================================================
// * Drill_GFB_StyleSprite 固定框样式
//=============================================================================
function Drill_GFB_StyleSprite() {
    this.initialize.apply(this, arguments);
};

Drill_GFB_StyleSprite.prototype = Object.create(Sprite.prototype);
Drill_GFB_StyleSprite.prototype.constructor = Drill_GFB_StyleSprite;

//==============================
// * 初始化-设置
//==============================
Drill_GFB_StyleSprite.prototype.initialize = function(bossBind,enemy) {
	Sprite.prototype.initialize.call(this);
	this._drill_bossBind = bossBind;	//绑定数据
	this._drill_style = DrillUp.g_GFB_Style[ bossBind['style_id']-1 ];	//样式数据
	this._drill_enemy = enemy;			//敌人数据
	
	this.visible = this._drill_bossBind['visible'];
	this._move = 0;
	this.opacity = 0;
	this.zIndex = this._drill_bossBind['z_index'];
	
	this._drill_fill_hp_needInit = true;	//加满动画 锁
	this._drill_fill_mp_needInit = true;	//加满动画 锁
	this._drill_fill_tp_needInit = true;	//加满动画 锁
	this._drill_fill_hp_is_end = false;		//加满动画 播放结束锁
	this._drill_fill_mp_is_end = false;		//加满动画 播放结束锁
	this._drill_fill_tp_is_end = false;		//加满动画 播放结束锁
	
	this._drill_shake_cur_life = 0;		//震动效果 生命
	this._drill_shake_trigger = 0;		//震动效果 触发
	this._drill_shake_dir = 1;			//震动效果 方向
	this._drill_shake_diff = 0;			//震动效果 实际偏移
	
	this._drill_num_initFinished = false;	//数值初始化
	this._drill_num_hp_needDraw = true;
	this._drill_num_mp_needDraw = true;
	this._drill_num_tp_needDraw = true;
	this._drill_num_cur_hp = 0;
	this._drill_num_cur_mp = 0;
	this._drill_num_cur_tp = 0;
	this._drill_num_hp = new Sprite();
	this._drill_num_mp = new Sprite();
	this._drill_num_tp = new Sprite();
	this._drill_num_hp_level = new Sprite();
	this._drill_num_mp_level = new Sprite();
	this._drill_num_tp_level = new Sprite();
	this._drill_num_hp_tank = [];
	this._drill_num_mp_tank = [];
	this._drill_num_tp_tank = [];
	this._drill_num_hp_level_tank = [];
	this._drill_num_mp_level_tank = [];
	this._drill_num_tp_level_tank = [];
	
	this._drill_system_icon = ImageManager.loadSystem("IconSet");
	this._drill_states_initFinished = false;
	
	this.drill_createBackground();	//建立背景
	this.drill_createHPMeter();		//建立生命参数条
	this.drill_createMPMeter();		//建立魔法参数条
	this.drill_createTPMeter();		//建立怒气参数条
	this.drill_createHeadImage();	//建立头像
	this.drill_createForeground();	//建立前景
	this.drill_createName();		//建立名称
	this.drill_recreateNumbers();		//建立数值
	this.drill_createState();		//建立状态
};
//==============================
// * 初始化-背景
//==============================
Drill_GFB_StyleSprite.prototype.drill_createBackground = function() {
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadGaugeBoss(this._drill_style['src_background']);
	temp_sprite.x = this._drill_style['background_x'];
	temp_sprite.y = this._drill_style['background_y'];
	this.addChild(temp_sprite);
}
//==============================
// * 初始化-生命条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHPMeter = function() {
	if( !this._drill_style['hp'] ){ return }
	var settings = JSON.parse(JSON.stringify( this._drill_style['hp'] ));	//拷贝object
	settings['level_max'] = this._drill_bossBind['hp_level_max'];
	
	this._drill_hp_meter = new Drill_GaugeMeter_Sprite(settings);	//生命条包含初始位置定义 + 动画遮罩
	this._drill_hp_meter_mask = new Drill_GaugeMeter_SpriteMask();
	
	if( this._drill_style['fill_hp_enable'] ){
		this._drill_hp_meter.addChild(this._drill_hp_meter_mask);
		this._drill_hp_meter.mask = this._drill_hp_meter_mask;
	}
	this.addChild(this._drill_hp_meter);
	
}
//==============================
// * 初始化-魔法条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createMPMeter = function() {
	if( !this._drill_style['mp'] ){ return }
	var settings = JSON.parse(JSON.stringify( this._drill_style['mp'] ));	//拷贝object
	settings['level_max'] = this._drill_bossBind['mp_level_max'];
	
	this._drill_mp_meter = new Drill_GaugeMeter_Sprite(settings);	//魔法条包含初始位置定义 + 动画遮罩
	this._drill_mp_meter_mask = new Drill_GaugeMeter_SpriteMask();
	
	if( this._drill_style['fill_mp_enable'] ){
		this._drill_mp_meter.addChild(this._drill_mp_meter_mask);
		this._drill_mp_meter.mask = this._drill_mp_meter_mask;
	}
	this.addChild(this._drill_mp_meter);
	
}
//==============================
// * 初始化-怒气条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createTPMeter = function() {
	if( !this._drill_style['tp'] ){ return }
	var settings = JSON.parse(JSON.stringify( this._drill_style['tp'] ));	//拷贝object
	settings['level_max'] = this._drill_bossBind['tp_level_max'];
	
	this._drill_tp_meter = new Drill_GaugeMeter_Sprite(settings);	//怒气条包含初始位置定义 + 动画遮罩
	this._drill_tp_meter_mask = new Drill_GaugeMeter_SpriteMask();
	
	if( this._drill_style['fill_tp_enable'] ){
		this._drill_tp_meter.addChild(this._drill_tp_meter_mask);
		this._drill_tp_meter.mask = this._drill_tp_meter_mask;
	}
	this.addChild(this._drill_tp_meter);
	
}
//==============================
// * 初始化-前景
//==============================
Drill_GFB_StyleSprite.prototype.drill_createForeground = function() {
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadGaugeBoss(this._drill_style['src_foreground']);
	temp_sprite.x = this._drill_style['foreground_x'];
	temp_sprite.y = this._drill_style['foreground_y'];
	this.addChild(temp_sprite);
}
//==============================
// * 初始化-头像
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHeadImage = function() {
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadGaugeBoss(this._drill_bossBind['head_src']);
	temp_sprite.x = this._drill_bossBind['head_x'];
	temp_sprite.y = this._drill_bossBind['head_y'];
	this.addChild(temp_sprite);
}
//==============================
// * 初始化-姓名框
//==============================
Drill_GFB_StyleSprite.prototype.drill_createName = function() {
	if( this._drill_style['name_enable'] == false ){ return }
	
	var font_size = this._drill_style['name_fontsize'];
	this._drill_name_sprite = new Sprite(new Bitmap(360, font_size+4 ));
	this._drill_name_sprite.x = this._drill_style['name_x'];
	this._drill_name_sprite.y = this._drill_style['name_y'];
	this._drill_name_sprite.bitmap.fontSize = font_size;
	this.drill_drawName();
	this.addChild(this._drill_name_sprite);
}
Drill_GFB_StyleSprite.prototype.drill_drawName = function() {
	this._drill_name_sprite.bitmap.drawText(this._drill_enemy.enemy().name, 0, 0, this._drill_name_sprite.width, this._drill_name_sprite.bitmap.fontSize,0);	
}
//==============================
// * 初始化-数值
//==============================
Drill_GFB_StyleSprite.prototype.drill_recreateNumbers = function() {
	// ->hp
	this._drill_num_hp_bitmap = ImageManager.loadGaugeBoss(this._drill_style['num_hp_src']);
	if( this._drill_style['num_hp_enable'] ){		// 生命 + 最大 （父类）
		this._drill_num_hp.anchor.x = 0.5;
		this._drill_num_hp.anchor.y = 0.5;
		this._drill_num_hp.x = this._drill_style['num_hp_x'];
		this._drill_num_hp.y = this._drill_style['num_hp_y'];
		this.addChild(this._drill_num_hp);
	}else{
		//this._drill_num_hp.visible = false;
	}
	if( this._drill_style['num_hp_level_enable'] ){	// 生命层级（父类）
		this._drill_num_hp_level.anchor.x = 0.5;
		this._drill_num_hp_level.anchor.y = 0.5;
		this._drill_num_hp_level.x = this._drill_style['num_hp_level_x'];
		this._drill_num_hp_level.y = this._drill_style['num_hp_level_y'];
		this.addChild(this._drill_num_hp_level);
	}else{
		//this._drill_num_hp_level.visible = false;
	}
	if( this._drill_num_hp_tank.length != 0 ){		//重建时，销毁已存在的sprite
		for( var k=this._drill_num_hp_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_hp_tank[k];
			this._drill_num_hp.removeChild(temp_sprite);
			this._drill_num_hp_tank.splice(k,1);
		}
	}
	if( this._drill_num_hp_level_tank.length != 0 ){
		for( var k=this._drill_num_hp_level_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_hp_level_tank[k];
			this._drill_num_hp_level.removeChild(temp_sprite);
			this._drill_num_hp_level_tank.splice(k,1);
		}
	}
	if( this._drill_style['num_hp_enable'] ){
		if( this._drill_style['num_hp_enable_max'] ){	// 生命 + 最大
			for(var i=0; i<33; i++){
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_hp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_hp_tank.push(temp_sprite);
				this._drill_num_hp.addChild(temp_sprite);
			}
		}else{
			for(var i=0; i<16; i++){	// 生命
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_hp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_hp_tank.push(temp_sprite);
				this._drill_num_hp.addChild(temp_sprite);
			}
		}
	}
	if( this._drill_style['num_hp_level_enable'] ){		// 生命层级
		for(var i=0; i<5; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.visible = false;
			temp_sprite.bitmap = this._drill_num_hp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			this._drill_num_hp_level_tank.push(temp_sprite);
			this._drill_num_hp_level.addChild(temp_sprite);
		}
	}
	// ->mp
	this._drill_num_mp_bitmap = ImageManager.loadGaugeBoss(this._drill_style['num_mp_src']);
	if( this._drill_style['num_mp_enable'] ){		// 魔法 + 最大 （父类）
		this._drill_num_mp.anchor.x = 0.5;
		this._drill_num_mp.anchor.y = 0.5;
		this._drill_num_mp.x = this._drill_style['num_mp_x'];
		this._drill_num_mp.y = this._drill_style['num_mp_y'];
		this.addChild(this._drill_num_mp);
	}
	if( this._drill_style['num_mp_level_enable'] ){	// 魔法层级（父类）
		this._drill_num_mp_level.anchor.x = 0.5;
		this._drill_num_mp_level.anchor.y = 0.5;
		this._drill_num_mp_level.x = this._drill_style['num_mp_level_x'];
		this._drill_num_mp_level.y = this._drill_style['num_mp_level_y'];
		this.addChild(this._drill_num_mp_level);
	}
	if( this._drill_num_mp_tank.length != 0 ){		//重建时，销毁已存在的sprite
		for( var k=this._drill_num_mp_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_mp_tank[k];
			this._drill_num_mp.removeChild(temp_sprite);
			this._drill_num_mp_tank.splice(k,1);
		}
	}
	if( this._drill_num_mp_level_tank.length != 0 ){
		for( var k=this._drill_num_mp_level_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_mp_level_tank[k];
			this._drill_num_mp_level.removeChild(temp_sprite);
			this._drill_num_mp_level_tank.splice(k,1);
		}
	}
	if( this._drill_style['num_mp_enable'] ){
		if( this._drill_style['num_mp_enable_max'] ){	// 魔法 + 最大
			for(var i=0; i<33; i++){
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_mp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_mp_tank.push(temp_sprite);
				this._drill_num_mp.addChild(temp_sprite);
			}
		}else{
			for(var i=0; i<16; i++){	// 魔法
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_mp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_mp_tank.push(temp_sprite);
				this._drill_num_mp.addChild(temp_sprite);
			}
		}
	}
	if( this._drill_style['num_mp_level_enable'] ){		// 魔法层级
		for(var i=0; i<5; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.visible = false;
			temp_sprite.bitmap = this._drill_num_mp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			this._drill_num_mp_level_tank.push(temp_sprite);
			this._drill_num_mp_level.addChild(temp_sprite);
		}
	}
	
	// ->tp
	this._drill_num_tp_bitmap = ImageManager.loadGaugeBoss(this._drill_style['num_tp_src']);
	if( this._drill_style['num_tp_enable'] ){		// 怒气 + 最大 （父类）
		this._drill_num_tp.anchor.x = 0.5;
		this._drill_num_tp.anchor.y = 0.5;
		this._drill_num_tp.x = this._drill_style['num_tp_x'];
		this._drill_num_tp.y = this._drill_style['num_tp_y'];
		this.addChild(this._drill_num_tp);
	}
	if( this._drill_style['num_tp_level_enable'] ){	// 怒气层级（父类）
		this._drill_num_tp_level.anchor.x = 0.5;
		this._drill_num_tp_level.anchor.y = 0.5;
		this._drill_num_tp_level.x = this._drill_style['num_tp_level_x'];
		this._drill_num_tp_level.y = this._drill_style['num_tp_level_y'];
		this.addChild(this._drill_num_tp_level);
	}
	if( this._drill_num_tp_tank.length != 0 ){		//重建时，销毁已存在的sprite
		for( var k=this._drill_num_tp_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_tp_tank[k];
			this._drill_num_tp.removeChild(temp_sprite);
			this._drill_num_tp_tank.splice(k,1);
		}
	}
	if( this._drill_num_tp_level_tank.length != 0 ){
		for( var k=this._drill_num_tp_level_tank.length-1; k>=0; k-- ){
			var temp_sprite = this._drill_num_tp_level_tank[k];
			this._drill_num_tp_level.removeChild(temp_sprite);
			this._drill_num_tp_level_tank.splice(k,1);
		}
	}
	if( this._drill_style['num_tp_enable'] ){
		if( this._drill_style['num_tp_enable_max'] ){	// 怒气 + 最大
			for(var i=0; i<33; i++){
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_tp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_tp_tank.push(temp_sprite);
				this._drill_num_tp.addChild(temp_sprite);
			}
		}else{
			for(var i=0; i<16; i++){	// 怒气
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_tp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_tp_tank.push(temp_sprite);
				this._drill_num_tp.addChild(temp_sprite);
			}
		}
	}
	if( this._drill_style['num_tp_level_enable'] ){		// 怒气层级
		for(var i=0; i<5; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.visible = false;
			temp_sprite.bitmap = this._drill_num_tp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			this._drill_num_tp_level_tank.push(temp_sprite);
			this._drill_num_tp_level.addChild(temp_sprite);
		}
	}
}
//==============================
// * 初始化-状态栏
//==============================
Drill_GFB_StyleSprite.prototype.drill_createState = function() {
	if( !this._drill_style['state_enable'] ){ return }
	
	if( this._drill_style['state_mode'] == "直线并排" ){
		this._drill_state_sprite = new Sprite();
		this._drill_state_sprite_tank = [];
		this._drill_state_sprite.anchor.x = 0.5;
		this._drill_state_sprite.anchor.y = 0.5;
		this._drill_state_sprite.x = this._drill_style['state_x'];
		this._drill_state_sprite.y = this._drill_style['state_y'];
	
		for(var i=0; i<this._drill_style['state_max']; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = this._drill_system_icon;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.setFrame(0,0,0,0);
			
			var iw = Window_Base._iconWidth;
			var ih = Window_Base._iconHeight;
			var space = this._drill_style['state_spacing'];
			var align = this._drill_style['state_align'];
			if( align == "右对齐" ){
				temp_sprite.x = -1 * i * (iw + space) ;
			}else if( align == "上对齐" ){
				temp_sprite.y = -1 * i * (ih + space) ;
			}else if( align == "下对齐" ){
				temp_sprite.y = 1 * i * (ih + space) ;
			}else{
				temp_sprite.x = 1 * i * (iw + space) ;
			}
			this._drill_state_sprite_tank.push(temp_sprite);
			this._drill_state_sprite.addChild(temp_sprite);
		}
	}else{
		this._drill_state_sprite = new Sprite_StateIcon();		//单一闪烁直接用rmmv默认的
		this._drill_state_sprite.anchor.x = 0.5;
		this._drill_state_sprite.anchor.y = 0.5;
		this._drill_state_sprite.x = this._drill_style['state_x'];
		this._drill_state_sprite.y = this._drill_style['state_y'];
		this._drill_state_sprite.setup(this._drill_enemy);
	}
	
	this.addChild(this._drill_state_sprite);
}

//==============================
// * 帧刷新
//==============================
Drill_GFB_StyleSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	// >数值初始化
	if(	this._drill_num_hp_bitmap.isReady() && 
		this._drill_num_mp_bitmap.isReady() && 
		this._drill_num_tp_bitmap.isReady() ){	
		this._drill_num_initFinished = true;
	}
	// >状态初始化
	if(	this._drill_system_icon.isReady() ){	
		this._drill_states_initFinished = true;
	}
	
	// >参数条值刷新
	if(this._drill_hp_meter){ this._drill_hp_meter.drill_reflashValue(this._drill_enemy._hp); }
	if(this._drill_mp_meter){ this._drill_mp_meter.drill_reflashValue(this._drill_enemy._mp); }
	if(this._drill_tp_meter){ this._drill_tp_meter.drill_reflashValue(this._drill_enemy._tp); }
	
	this.updatePos();			//初始位移
	this.updateShake();			//震动效果
	this.updateNumbersValue();	//数值缓冲
	this.updateNumbers();		//数值绘制
	this.updateHPFilling();		//生命条加满动画
	this.updateMPFilling();		//魔法条加满动画
	this.updateTPFilling();		//怒气条加满动画
	this.updateStates();		//状态绘制
}
//==============================
// * 帧刷新 - 初始位移
//==============================
Drill_GFB_StyleSprite.prototype.updatePos = function() {
	//（由于镜头实时会变，xy需要时刻固定重新计算位置）
	this.x = this._drill_bossBind['frame_x'] + this._drill_bossBind['frame_slide_x'];
	this.y = this._drill_bossBind['frame_y'] + this._drill_bossBind['frame_slide_y'];
	this._move += 1;
	
	var cur_t = Math.min( this._drill_bossBind['frame_slide_time'] , this._move );
	this.x -= cur_t /this._drill_bossBind['frame_slide_time'] * this._drill_bossBind['frame_slide_x'];
	this.y -= cur_t /this._drill_bossBind['frame_slide_time'] * this._drill_bossBind['frame_slide_y'];
	this.opacity += 255/this._drill_bossBind['frame_slide_time'];
	
	if( Imported.Drill_BattleCamera ){	//镜头修正
		this.x -= $gameTemp._drill_cam_pos[0];
		this.y -= $gameTemp._drill_cam_pos[1];
	}
	
}
//==============================
// * 帧刷新 - 震动效果
//==============================
Drill_GFB_StyleSprite.prototype.updateShake = function() {
	if( !this._drill_style['shake_enable'] ){ return }
	
	//触发条件
	if( this._drill_shake_cur_life <= this._drill_enemy._hp ){
		this._drill_shake_cur_life = this._drill_enemy._hp;
	}else{
		this._drill_shake_trigger = 25;
		this._drill_shake_cur_life = this._drill_enemy._hp;
	}
	
	var f = this._drill_style['shake_float'];
	if( this._drill_shake_trigger > 0 ){
		//持续震动
		if( this._drill_shake_dir == 1 ){
			this._drill_shake_diff += f/2;
			if( this._drill_shake_diff > f ){
				this._drill_shake_dir = -1;
				this._drill_shake_diff = f;
			}
		}else{
			this._drill_shake_diff -= f/2;
			if( this._drill_shake_diff < -1 * f ){
				this._drill_shake_dir = 1;
				this._drill_shake_diff = -1 * f;
			}
		}
	}else{
		//结束震动
		if(this._drill_shake_diff > 0){
			this._drill_shake_diff -= f/2;
			if(this._drill_shake_diff < 0){
				this._drill_shake_diff = 0;
			}
		}
		if(this._drill_shake_diff < 0){
			this._drill_shake_diff += f/2;
			if(this._drill_shake_diff > 0){
				this._drill_shake_diff = 0;
			}
		}
	}
	if( this._drill_style['shake_mode'] == "上下震动" ){
		this.y += this._drill_shake_diff;
	}else{
		this.x += this._drill_shake_diff;
	}
	
	this._drill_shake_trigger -= 1;
}
//==============================
// * 帧刷新 - 数值缓冲
//==============================
Drill_GFB_StyleSprite.prototype.updateNumbersValue = function() {
	if( this._drill_num_initFinished == false){ return }
	
	// >hp数值 缓冲下降
	if( this._drill_num_cur_hp != this._drill_enemy.hp ){
		this._drill_num_hp_needDraw = true;

		if( this._drill_enemy.hp < this._drill_num_cur_hp ){
			var diff = Math.max( Math.floor(( this._drill_num_cur_hp - this._drill_enemy.hp)/this._drill_style['num_hp_speed'] ) , 1 );
			this._drill_num_cur_hp -= diff;
			if( this._drill_num_cur_hp < this._drill_enemy.hp ){
				this._drill_num_cur_hp = this._drill_enemy.hp;
			}
		}
		if( this._drill_enemy.hp > this._drill_num_cur_hp ){
			var diff = Math.max( Math.floor(( this._drill_enemy.hp - this._drill_num_cur_hp)/this._drill_style['num_hp_speed'] ) , 1 );
			this._drill_num_cur_hp += diff;
			if( this._drill_num_cur_hp > this._drill_enemy.hp ){
				this._drill_num_cur_hp = this._drill_enemy.hp;
			}
		}
	}
	
	// >mp数值 缓冲下降
	if( this._drill_num_cur_mp != this._drill_enemy.mp ){
		this._drill_num_mp_needDraw = true;

		if( this._drill_enemy.mp < this._drill_num_cur_mp ){
			var diff = Math.max( Math.floor(( this._drill_num_cur_mp - this._drill_enemy.mp)/this._drill_style['num_mp_speed'] ) , 1 );
			this._drill_num_cur_mp -= diff;
			if( this._drill_num_cur_mp < this._drill_enemy.mp ){
				this._drill_num_cur_mp = this._drill_enemy.mp;
			}
		}
		if( this._drill_enemy.mp > this._drill_num_cur_mp ){
			var diff = Math.max( Math.floor(( this._drill_enemy.mp - this._drill_num_cur_mp)/this._drill_style['num_mp_speed'] ) , 1 );
			this._drill_num_cur_mp += diff;
			if( this._drill_num_cur_mp > this._drill_enemy.mp ){
				this._drill_num_cur_mp = this._drill_enemy.mp;
			}
		}
	}
	
	// >tp数值 缓冲下降
	if( this._drill_num_cur_tp != this._drill_enemy.tp ){
		this._drill_num_tp_needDraw = true;

		if( this._drill_enemy.tp < this._drill_num_cur_tp ){
			var diff = Math.max( Math.floor(( this._drill_num_cur_tp - this._drill_enemy.tp)/this._drill_style['num_tp_speed'] ) , 1 );
			this._drill_num_cur_tp -= diff;
			if( this._drill_num_cur_tp < this._drill_enemy.tp ){
				this._drill_num_cur_tp = this._drill_enemy.tp;
			}
		}
		if( this._drill_enemy.tp > this._drill_num_cur_tp ){
			var diff = Math.max( Math.floor(( this._drill_enemy.tp - this._drill_num_cur_tp)/this._drill_style['num_tp_speed'] ) , 1 );
			this._drill_num_cur_tp += diff;
			if( this._drill_num_cur_tp > this._drill_enemy.tp ){
				this._drill_num_cur_tp = this._drill_enemy.tp;
			}
		}
	}
	
}
//==============================
// * 帧刷新 - 数值绘制
//==============================
Drill_GFB_StyleSprite.prototype.updateNumbers = function() {
	if( this._drill_num_initFinished == false){ return }
	
	if( this._drill_num_hp_needDraw == true){ 
		this._drill_num_hp_needDraw = false;
		// >hp数值 分割数值符
		var hp_temp_cur_hp = this._drill_num_cur_hp;
		var hp_temp_cur_maxhp = this._drill_enemy.mhp;
		var hp_temp_tank = [];
		var align = this._drill_style['num_hp_align'];
		if( align == "右对齐" ){
			if( this._drill_style['num_hp_enable_max'] ){
				hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_maxhp ) ); 
				hp_temp_tank.push(10);	//加入"/"符号
			}
			hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_hp ) ); 
		}else{
			hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_hp ).reverse() ); 	//左对齐为反向插入
			if( this._drill_style['num_hp_enable_max'] ){
				hp_temp_tank.push(10);
				hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_maxhp ).reverse() ); 
			}
		}
		// >hp数值 显示数值符
		var hp_w = this._drill_num_hp_bitmap.width / 12;
		var hp_h = this._drill_num_hp_bitmap.height;
		for(var i=0; i<this._drill_num_hp_tank.length; i++){
			var temp_sprite = this._drill_num_hp_tank[i];
			if( i < hp_temp_tank.length ){
				var pos = hp_temp_tank[i];
				temp_sprite.setFrame(pos*hp_w,0,hp_w,hp_h);
				if( align == "右对齐" ){
					temp_sprite.x = -1 * i * hp_w - hp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * hp_w - hp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
		// >hp层级数值 分割数值符
		var hp_temp_cur_levelhp = Math.floor( this._drill_enemy.hp / this._drill_bossBind['hp_level_max'] );
		var hp_temp_level_tank = [];
		var level_align = this._drill_style['num_hp_level_align'];
		if( level_align == "右对齐" ){
			hp_temp_level_tank = hp_temp_level_tank.concat( this.drill_splitNumber( hp_temp_cur_levelhp ) ); 
		}else{ 
			hp_temp_level_tank = hp_temp_level_tank.concat( this.drill_splitNumber( hp_temp_cur_levelhp ).reverse() ); 
		}
		hp_temp_level_tank.push(11);	//加入"x"符号
		// >hp层级数值 显示数值符
		for(var i=0; i<this._drill_num_hp_level_tank.length; i++){
			var temp_sprite = this._drill_num_hp_level_tank[i];
			if( i < hp_temp_level_tank.length ){
				var pos = hp_temp_level_tank[i];
				temp_sprite.setFrame(pos*hp_w,0,hp_w,hp_h);
				if( level_align == "右对齐" ){
					temp_sprite.x = -1 * i * hp_w - hp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * hp_w - hp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
	}
	
	if( this._drill_num_mp_needDraw == true){ 
		this._drill_num_mp_needDraw = false;
		// >mp数值 分割数值符
		var mp_temp_cur_mp = this._drill_num_cur_mp;
		var mp_temp_cur_maxmp = this._drill_enemy.mmp;
		var mp_temp_tank = [];
		var align = this._drill_style['num_mp_align'];
		if( align == "右对齐" ){
			if( this._drill_style['num_mp_enable_max'] ){
				mp_temp_tank = mp_temp_tank.concat( this.drill_splitNumber( mp_temp_cur_maxmp ) ); 
				mp_temp_tank.push(10);	//加入"/"符号
			}
			mp_temp_tank = mp_temp_tank.concat( this.drill_splitNumber( mp_temp_cur_mp ) ); 
		}else{
			mp_temp_tank = mp_temp_tank.concat( this.drill_splitNumber( mp_temp_cur_mp ).reverse() ); 	//左对齐为反向插入
			if( this._drill_style['num_mp_enable_max'] ){
				mp_temp_tank.push(10);
				mp_temp_tank = mp_temp_tank.concat( this.drill_splitNumber( mp_temp_cur_maxmp ).reverse() ); 
			}
		}
		// >mp数值 显示数值符
		var mp_w = this._drill_num_mp_bitmap.width / 12;
		var mp_h = this._drill_num_mp_bitmap.height;
		for(var i=0; i<this._drill_num_mp_tank.length; i++){
			var temp_sprite = this._drill_num_mp_tank[i];
			if( i < mp_temp_tank.length ){
				var pos = mp_temp_tank[i];
				temp_sprite.setFrame(pos*mp_w,0,mp_w,mp_h);
				if( align == "右对齐" ){
					temp_sprite.x = -1 * i * mp_w - mp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * mp_w - mp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
		// >mp层级数值 分割数值符
		var mp_temp_cur_levelmp = Math.floor( this._drill_enemy.mp / this._drill_bossBind['mp_level_max'] );
		var mp_temp_level_tank = [];
		var level_align = this._drill_style['num_mp_level_align'];
		if( level_align == "右对齐" ){
			mp_temp_level_tank = mp_temp_level_tank.concat( this.drill_splitNumber( mp_temp_cur_levelmp ) ); 
		}else{ 
			mp_temp_level_tank = mp_temp_level_tank.concat( this.drill_splitNumber( mp_temp_cur_levelmp ).reverse() ); 
		}
		mp_temp_level_tank.push(11);	//加入"x"符号
		// >mp层级数值 显示数值符
		for(var i=0; i<this._drill_num_mp_level_tank.length; i++){
			var temp_sprite = this._drill_num_mp_level_tank[i];
			if( i < mp_temp_level_tank.length ){
				var pos = mp_temp_level_tank[i];
				temp_sprite.setFrame(pos*mp_w,0,mp_w,mp_h);
				if( level_align == "右对齐" ){
					temp_sprite.x = -1 * i * mp_w - mp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * mp_w - mp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
	}
	
	if( this._drill_num_tp_needDraw == true){ 
		this._drill_num_tp_needDraw = false;
		// >tp数值 分割数值符
		var tp_temp_cur_tp = this._drill_num_cur_tp;
		var tp_temp_cur_maxtp = this._drill_enemy.mtp;
		var tp_temp_tank = [];
		var align = this._drill_style['num_tp_align'];
		if( align == "右对齐" ){
			if( this._drill_style['num_tp_enable_max'] ){
				tp_temp_tank = tp_temp_tank.concat( this.drill_splitNumber( tp_temp_cur_maxtp ) ); 
				tp_temp_tank.push(10);	//加入"/"符号
			}
			tp_temp_tank = tp_temp_tank.concat( this.drill_splitNumber( tp_temp_cur_tp ) ); 
		}else{
			tp_temp_tank = tp_temp_tank.concat( this.drill_splitNumber( tp_temp_cur_tp ).reverse() ); 	//左对齐为反向插入
			if( this._drill_style['num_tp_enable_max'] ){
				tp_temp_tank.push(10);
				tp_temp_tank = tp_temp_tank.concat( this.drill_splitNumber( tp_temp_cur_maxtp ).reverse() ); 
			}
		}
		// >tp数值 显示数值符
		var tp_w = this._drill_num_tp_bitmap.width / 12;
		var tp_h = this._drill_num_tp_bitmap.height;
		for(var i=0; i<this._drill_num_tp_tank.length; i++){
			var temp_sprite = this._drill_num_tp_tank[i];
			if( i < tp_temp_tank.length ){
				var pos = tp_temp_tank[i];
				temp_sprite.setFrame(pos*tp_w,0,tp_w,tp_h);
				if( align == "右对齐" ){
					temp_sprite.x = -1 * i * tp_w - tp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * tp_w - tp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
		// >tp层级数值 分割数值符
		var tp_temp_cur_leveltp = Math.floor( this._drill_enemy.tp / this._drill_bossBind['tp_level_max'] );
		var tp_temp_level_tank = [];
		var level_align = this._drill_style['num_tp_level_align'];
		if( level_align == "右对齐" ){
			tp_temp_level_tank = tp_temp_level_tank.concat( this.drill_splitNumber( tp_temp_cur_leveltp ) ); 
		}else{ 
			tp_temp_level_tank = tp_temp_level_tank.concat( this.drill_splitNumber( tp_temp_cur_leveltp ).reverse() ); 
		}
		tp_temp_level_tank.push(11);	//加入"x"符号
		// >tp层级数值 显示数值符
		for(var i=0; i<this._drill_num_tp_level_tank.length; i++){
			var temp_sprite = this._drill_num_tp_level_tank[i];
			if( i < tp_temp_level_tank.length ){
				var pos = tp_temp_level_tank[i];
				temp_sprite.setFrame(pos*tp_w,0,tp_w,tp_h);
				if( level_align == "右对齐" ){
					temp_sprite.x = -1 * i * tp_w - tp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * tp_w - tp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
	}
}
//==============================
// * 帧刷新 - 数值分割
//==============================
Drill_GFB_StyleSprite.prototype.drill_splitNumber = function(num_value) {
	var arr = [];
	for(var i=0; i<33; i++){		//将 1234 变成 [1,2,3,4]
		var a1 = Math.floor(num_value / 10);
		var a2 = Math.floor(num_value % 10);
		if(a1 <= 0){
			arr.push(a2);
			break;
		}else{
			arr.push(a2);
		}
		num_value = a1;
	}
	return arr;
}
//==============================
// * 帧刷新 - 加满动画（生命条）
//==============================
Drill_GFB_StyleSprite.prototype.updateHPFilling = function() {
	if( !this._drill_style['hp'] ){ return }
	if( this._drill_fill_hp_is_end ){ return }
	
	//	#初始化
	if( this._drill_hp_meter.drill_isLevelsReady() && this._drill_fill_hp_needInit ){
		this._drill_fill_hp_needInit = false;
		var settings = {
			"width":this._drill_hp_meter.drill_width(),			//遮罩长度
			"height":this._drill_hp_meter.drill_height(),		//遮罩宽度
			"fill_time":this._drill_style["fill_time"],			//加满速度
			"fill_type":this._drill_style["fill_type"],			//加满方式
			"fill_delay":this._drill_style["fill_delay"]		//加满动画延迟
		};
		this._drill_hp_meter_mask.maskInit(settings);
	}
	
	//	#去除
	if( this._drill_hp_meter_mask.isEnding() ){
		this._drill_fill_hp_is_end = true;
		this._drill_hp_meter.mask = null;
		this._drill_hp_meter.removeChild(this._drill_hp_meter_mask);
	}
}
//==============================
// * 帧刷新 - 加满动画（魔法条）
//==============================
Drill_GFB_StyleSprite.prototype.updateMPFilling = function() {
	if( !this._drill_style['mp'] ){ return }
	if( this._drill_fill_mp_is_end ){ return }
	
	//	#初始化
	if( this._drill_mp_meter.drill_isLevelsReady() && this._drill_fill_mp_needInit ){
		this._drill_fill_mp_needInit = false;
		var settings = {
			"width":this._drill_mp_meter.drill_width(),			//遮罩长度
			"height":this._drill_mp_meter.drill_height(),		//遮罩宽度
			"fill_time":this._drill_style["fill_time"],			//加满速度
			"fill_type":this._drill_style["fill_type"],			//加满方式
			"fill_delay":this._drill_style["fill_delay"]		//加满动画延迟
		};
		this._drill_mp_meter_mask.maskInit(settings);
	}
	
	//	#去除
	if( this._drill_mp_meter_mask.isEnding() ){
		this._drill_fill_mp_is_end = true;
		this._drill_mp_meter.mask = null;
		this._drill_mp_meter.removeChild(this._drill_mp_meter_mask);
	}
}
//==============================
// * 帧刷新 - 加满动画（怒气条）
//==============================
Drill_GFB_StyleSprite.prototype.updateTPFilling = function() {
	if( !this._drill_style['tp'] ){ return }
	if( this._drill_fill_tp_is_end ){ return }
	
	//	#初始化
	if( this._drill_tp_meter.drill_isLevelsReady() && this._drill_fill_tp_needInit ){
		this._drill_fill_tp_needInit = false;
		var settings = {
			"width":this._drill_tp_meter.drill_width(),			//遮罩长度
			"height":this._drill_tp_meter.drill_height(),		//遮罩宽度
			"fill_time":this._drill_style["fill_time"],			//加满速度
			"fill_type":this._drill_style["fill_type"],			//加满方式
			"fill_delay":this._drill_style["fill_delay"]		//加满动画延迟
		};
		this._drill_tp_meter_mask.maskInit(settings);
	}
	
	//	#去除
	if( this._drill_tp_meter_mask.isEnding() ){
		this._drill_fill_tp_is_end = true;
		this._drill_tp_meter.mask = null;
		this._drill_tp_meter.removeChild(this._drill_tp_meter_mask);
	}
}
//==============================
// * 帧刷新 - 状态绘制
//==============================
Drill_GFB_StyleSprite.prototype.updateStates = function(){
	if( !this._drill_style['state_enable'] ){ return }
	if( this._drill_states_initFinished == false){ return }
	
	if( this._drill_style['state_mode'] == "直线并排" ){
		var icons = this._drill_enemy.allIcons();
		for(var i=0; i<this._drill_state_sprite_tank.length; i++){	
			var temp_sprite = this._drill_state_sprite_tank[i];
			var id = Number(icons[i]);
			if( id ){
				var iw = Window_Base._iconWidth;
				var ih = Window_Base._iconHeight;
				var ix = id % 16 * iw;
				var iy = Math.floor( id / 16) * ih;
				temp_sprite.setFrame(ix, iy, iw, ih);
			}else{
				temp_sprite.setFrame(0,0,0,0) ;
			}
		}
	}
	//单一闪烁不需要帧刷新，对象自己会变
}

//=============================================================================
// * 	Drill_GaugeMeter_Sprite 参数条类
//
//		初始化参数：见initialize函数中的方括号。
//		使用方法：	1.将sprite贴在任意地方即可。
//					2.实时调用函数.drill_reflashValue(value)改变参数条的值。
//					3.值减少时，凹槽条、弹出条会产生效果，值增加不会。
//=============================================================================
if( typeof(Drill_GaugeMeter_Sprite) == "undefined" ){	//防止重复定义

	function Drill_GaugeMeter_Sprite() {
		this.initialize.apply(this, arguments);
	}

	Drill_GaugeMeter_Sprite.prototype = Object.create(Sprite.prototype);
	Drill_GaugeMeter_Sprite.prototype.constructor = Drill_GaugeMeter_Sprite;

	Drill_GaugeMeter_Sprite.prototype.initialize = function(settings) {
		Sprite.prototype.initialize.call(this);
		this._drill_data = JSON.parse(JSON.stringify( settings ));	//拷贝object
		//alert(JSON.stringify(settings));
		
		// ->核心 - 变化因子
		this._drill_new_value = 0;				//新变化参数【使用时只读】
		this._drill_cur_value = 0;				//当前参数【使用时只读】
		
		// ->核心 - 层级结构
		this._drill_main = null;				//主层
		this._drill_mainMask = null;			//主层遮罩
		this._drill_up = null;					//	-上层
		this._drill_center = null;				//	-中层
		this._drill_down = null;				//	-下层
		this._drill_up_meter = null;			//  *上层条
		this._drill_center_meter = null;		//  *中层条（凹槽条）
		this._drill_down_meter = null;			//  *下层条
			
		// ->位置、图片、遮罩
		this.x = this._drill_data['x'];	
		this.y = this._drill_data['y'];	
		this.rotation = this._drill_data['rotation'] /180 * Math.PI;	
		this._drill_src_meter = this._drill_data['src_meter'];			//参数条资源（字符串）
		this._drill_src_meterMask = this._drill_data['src_meterMask'];	//参数条遮罩（字符串）
		this._drill_meter_bitmap = null;								//参数条bitmap
		this._drill_level_bitmaps = [];									//参数条层级bitmap
		this._drill_level_needInit = true;								//层级图片初始化 锁
		this._drill_level_height = 0;									//层级图高度
		this._drill_level_width = 0;									//层级图宽度（不流动的宽度）

		// ->层级
		this._drill_is_level_blocked = false;							//层级变换阻塞（每次层级降1时自动阻塞）
		this._drill_level_cur_value = 0;								//层级条缓冲值
		this._drill_level_count = this._drill_data['level_count'];		//层级数量
		this._drill_level_loop = this._drill_data['level_is_loop'];		//层级是否循环
		this._drill_cur_level = -1;										//当前所处的层级
		// ->单层条的层值
		this._drill_level_max = this._drill_data['level_max'];			//单层最大值
		
		// ->缩短效果
		this._drill_shorten_speed = this._drill_data['shorten_speed'];	//上层缩短速度（0表示瞬间缩短）
		
		// ->流动效果
		this._drill_is_meter_moving = this._drill_data['m_enable'];		//条是否流动
		this._drill_meter_moving_speed = this._drill_data['m_speed'];	//条流动速度

		// ->凹槽条
		this._drill_leaking_enable = this._drill_data['l_enable'];					//是否启用凹槽条
		this._drill_src_leaking_meter = this._drill_data['l_meter'];				//凹槽条资源（字符串）
		this._drill_leaking_cur_value = 0;											//凹槽条缓冲值
		this._drill_leaking_time = 0;												//凹槽条延时时间
		this._drill_leaking_speed = this._drill_data['l_speed'];					//条扣除速度
		this._drill_leaking_type = this._drill_data['l_type'];						//条扣除方式
		this._drill_leaking_delay = this._drill_data['l_delay'];					//条扣除延迟
		this._drill_is_leaking_delayReflash = this._drill_data['l_delayReflash'];	//连续受伤时，是否刷新延迟
		
		// ->弹出条
		this._drill_spring_enable = this._drill_data['s_enable'];		//是否启用弹出效果
		this._drill_spring = null;										//弹出层
		this._drill_spring_tank = [];									//弹出条容器
		this._drill_spring_cur_value = 0;								//弹出条缓冲值
		this._drill_spring_type = this._drill_data['s_type'];			//弹出条块模式
		this._drill_spring_formulaX = this._drill_data['s_formulaX'];	//弹出X速度公式
		this._drill_spring_formulaY = this._drill_data['s_formulaY'];	//弹出Y速度公式
		this._drill_spring_life = this._drill_data['s_life'];			//弹出条持续时间
		
		// ->粒子效果	
		this._drill_particles_enable = this._drill_data['p_enable'];	//是否启用粒子效果
		this._drill_particles_needInit = true;
		this._drill_particles = [];										//粒子容器
		this._drill_particles_mode = this._drill_data['p_mode'];		//粒子出现模式（字符串）
		this._drill_particles_speedX = this._drill_data['p_speedX'];	//粒子流动X速度
		this._drill_particles_speedY = this._drill_data['p_speedY'];	//粒子流动Y速度
		this._drill_particles_count = this._drill_data['p_count'];		//粒子数量
		this._drill_particles_life = this._drill_data['p_life'];		//粒子持续时间
		if(this._drill_particles_enable){
			this._drill_particles_bitmap = ImageManager.loadGaugeMeter(this._drill_data['p_src']);	//粒子资源
		}
		
		// ->游标
		this._drill_floating_enable = this._drill_data['f_enable'];		//是否启用游标
		this._drill_floating_needInit = true;							//游标初始化开关
		this._drill_floating_reset = this._drill_data['f_reset'];		//是否多层重置
		this._drill_floating_mode = this._drill_data['f_mode'];			//游标显示模式
		this._drill_floating_flash = 1;									//游标闪烁方向
		this._drill_floating_src = this._drill_data['f_src'];			//图片资源
		this._drill_floating_sprite = null;								//游标
		this._drill_floating_bitmaps = [];								//游标资源
		this._drill_floating_x = this._drill_data['f_x'];				//平移-游标 X
		this._drill_floating_y = this._drill_data['f_y'];				//平移-游标 Y
		this._drill_floating_time = 0;									//当前动画帧
		this._drill_floating_cur = 0;									//当前动画帧
		this._drill_floating_interval = this._drill_data['f_interval'];	//动画帧间隔
		this._drill_floating_backrun = this._drill_data['f_backrun'];	//是否倒放
		if(this._drill_floating_enable){
			for(var j=0; j<this._drill_floating_src.length; j++){
				this._drill_floating_bitmaps[j] = ImageManager.loadGaugeMeter(String(this._drill_floating_src[j]));	//游标资源
			}
		}
		
		// 初始化（create函数：可以直接初始化，init函数：必须等图片加载参数完毕后初始化）
		this.drill_createFrames();
		this.drill_createMeters();
	};

	//==============================
	// * 初始化-框架
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_createFrames = function() {
		
		this._drill_main = new Sprite();			//主层
		this._drill_mainMask = new Sprite();		//主层遮罩
		this._drill_mainMask.bitmap = ImageManager.loadGaugeMeter(this._drill_src_meterMask);
		
		this._drill_spring = new Sprite();			//弹出层
		this._drill_up = new Sprite();				//上层
		this._drill_center = new Sprite();			//中层
		this._drill_down = new Sprite();			//下层
		this._drill_up.zIndex = 30;	
		this._drill_center.zIndex = 20;	
		this._drill_down.zIndex = 10;
		this._drill_main.addChild(this._drill_down);
		this._drill_main.addChild(this._drill_center);
		this._drill_main.addChild(this._drill_up);
		
		if(this._drill_src_meterMask != ""){
			this._drill_main.addChild(this._drill_mainMask);
			this._drill_main.mask = this._drill_mainMask;
		}
		this.addChild(this._drill_main);
		this.addChild(this._drill_spring);			//弹出层在主层前面
	}
	//==============================
	// * 初始化-层条
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_createMeters = function() {
		
		this._drill_up_meter = new Sprite();				//上层条
		this._drill_center_meter = new Sprite();			//中层条（凹槽条）
		this._drill_down_meter = new Sprite();				//下层条
		this._drill_up.addChild(this._drill_up_meter);
		this._drill_center.addChild(this._drill_center_meter);
		this._drill_down.addChild(this._drill_down_meter);
		
		this._drill_up_meter_move = 0;			//流动效果-上层条初始位置
		this._drill_down_meter_move = 0;		//流动效果-下层条初始位置
		
		this._drill_meter_bitmap = ImageManager.loadGaugeMeter(this._drill_src_meter);		//参数条资源
		if(this._drill_leaking_enable ){
			this._drill_center_meter.bitmap = ImageManager.loadGaugeMeter(this._drill_src_leaking_meter);	//凹槽条资源
			this._drill_center_meter.setFrame(0,0,0,0);
		}
	}

	//==============================
	// * 初始化-层级
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initMeterBitmap = function() {
		this._drill_level_bitmaps = [];	
		
		for(var i=0; i<this._drill_level_count; i++){	//层级内容 根据资源全部切割重绘
			var _bitmap = this._drill_meter_bitmap;
			this._drill_level_height = _bitmap.height /this._drill_level_count;
			this._drill_level_width = _bitmap.width;
			var new_bitmap = new Bitmap( this._drill_level_width, this._drill_level_height );
			
			var x = 0;
			var y = this._drill_level_height * i;
			var w = this._drill_level_width;
			var h = this._drill_level_height;
			new_bitmap.blt( _bitmap,  x, y, w, h,  0,0, w, h);
			
			this._drill_level_bitmaps.push(new_bitmap);
			
			if(this._drill_src_meterMask == ""){	//根据层级信息，初始化主层的默认遮罩（遮挡粒子）
				this._drill_mainMask.bitmap = new Bitmap( this.drill_width() , this.drill_height() );
				this._drill_mainMask.bitmap.fillRect(0, 0, this.drill_width() , this.drill_height(), "#ffffff");
				this._drill_main.addChild(this._drill_mainMask);
				this._drill_main.mask = this._drill_mainMask;
			}
		}
	}
	//==============================
	// * 初始化-粒子
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initParticle = function() {
		if( !this._drill_particles_enable ){ return }
		
		for( var j = 0; j < this._drill_particles_count ; j++ ){
			var par = new Sprite(this._drill_particles_bitmap);
			par.anchor.x = 0.5;
			par.anchor.y = 0.5;
			par.opacity = 0;
			par.cur_life = Math.random() * this._drill_particles_life;
			par.cur_random = 0.3*(Math.random()-0.5)	//随机因子
			
			this._drill_particles.push(par);
			this._drill_up.addChild(par);
		}
	}
	//==============================
	// * 初始化-游标
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initFloating = function() {
		if( !this._drill_floating_enable ){ return }
		
		this._drill_floating_sprite = new Sprite(this._drill_floating_bitmaps[0]);
		this._drill_floating_sprite.anchor.x = 0.5;
		this._drill_floating_sprite.anchor.y = 0.5;
		this._drill_floating_sprite.opacity = 0;
		
		this._drill_spring.addChild(this._drill_floating_sprite);		//游标在弹出层上
		
		
	}
	//==============================
	// * 变化因子
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_reflashValue = function(value) {
		this._drill_new_value = value;
	}
	//==============================
	// * 帧刷新
	//==============================
	Drill_GaugeMeter_Sprite.prototype.update = function() {
		Sprite.prototype.update.call(this);
		
		//层级初始化
		if(this._drill_meter_bitmap.isReady() && this._drill_level_needInit){	
			this._drill_level_needInit = false;
			this.drill_initMeterBitmap();
		}
		//粒子初始化
		if( this._drill_particles_bitmap && this._drill_particles_bitmap.isReady() && this._drill_particles_needInit){	
			this._drill_particles_needInit = false;
			this.drill_initParticle();
		}
		//游标初始化
		if(this._drill_meter_bitmap.isReady() && this._drill_floating_needInit){	
			this._drill_floating_needInit = false;
			this.drill_initFloating();
		}
		
		if( this.drill_isLevelsReady() ){
			this.updateLevelValue();		//参数条数值
			this.updateLevel(); 			//参数条层级
			this.updateMeter(); 			//参数条绘制
			this.updateLeakingValue();		//凹槽条数值
			this.updateLeakingMeter(); 		//凹槽条绘制
			this.updateBlock(); 			//阻塞条件控制
			this.drill_sortByZIndex();		//层级排序
			
			if( this._drill_spring_enable ){
				this.updateSpringInit();		//弹出条建立
				this.updateSpringDestroy(); 	//弹出条销毁
			}
			this.updateParticle(); 			//粒子效果
			this.updateFloating(); 			//游标
		}
		this._drill_cur_value = this._drill_new_value;
	}
	//==============================
	// * 帧刷新 - 参数条数值（可以最直接地瞬间缩短，也可以缓冲计算）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLevelValue = function() {
		
		if( this._drill_is_level_blocked == false ){	//特殊情况阻止条缩短或增加
			
			// ->缩短效果 - 瞬间/弹性缩短
			if( this._drill_shorten_speed == 0 ){
				this._drill_level_cur_value = this._drill_new_value;
			}else{
				if(this._drill_level_cur_value < this._drill_new_value){
					var diff = Math.max( ( this._drill_new_value - this._drill_level_cur_value)/this._drill_shorten_speed , 1 );
					this._drill_level_cur_value += diff;
					if( this._drill_level_cur_value > this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				}
				if(this._drill_level_cur_value > this._drill_new_value){
					var diff = Math.max( ( this._drill_level_cur_value - this._drill_new_value)/this._drill_shorten_speed , 1 );
					this._drill_level_cur_value -= diff;
					if( this._drill_level_cur_value < this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				}
			}
			
			// #阻塞 - 小于指定层级最大值时，阻塞
			var cur_max = this._drill_cur_level * this._drill_level_max -1;
			if( this._drill_level_cur_value < cur_max ){
				this._drill_level_cur_value = cur_max;
				//alert(cur_max);
			}
		}
	}
	//==============================
	// * 帧刷新 - 参数条层级
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLevel = function() {
		
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		
		if( this._drill_cur_level != a1 ){
		
			// #层级阻塞
			// （小于层级时，必然阻塞。后面根据条件解除。）
			if(this._drill_cur_level > a1){ this._drill_cur_level -= 1;this._drill_is_level_blocked = true;}
			if(this._drill_cur_level < a1){ this._drill_cur_level = a1;this._drill_is_level_blocked = false;}
			
		
			// #层级变换
			if(a1 == 0 ){
				//只剩最后一层时
				this._drill_up_meter.bitmap = this._drill_level_bitmaps[0];	
				this._drill_down_meter.bitmap = null;
			}else if( a1 >= this._drill_level_count ){
				//参数值超过最大层时
				if( this._drill_level_loop ){
					//循环色
					var a3 = a1 % this._drill_level_count;
					if( a3 == 0  ){
						this._drill_up_meter.bitmap = this._drill_level_bitmaps[0];
						this._drill_down_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
					}else{
						this._drill_up_meter.bitmap = this._drill_level_bitmaps[a3];
						this._drill_down_meter.bitmap = this._drill_level_bitmaps[a3-1];
					}
				}else{
					//不循环色
					this._drill_up_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
					this._drill_down_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
				}
			}else{
				//	正常层
				this._drill_up_meter.bitmap = this._drill_level_bitmaps[a1];
				this._drill_down_meter.bitmap = this._drill_level_bitmaps[a1-1];
			}
			
		}
	}
	//==============================
	// * 帧刷新 - 参数条绘制（流动、长度控制）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateMeter = function() {
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		
		// #上层条长度
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if( this._drill_is_meter_moving ){ ww = ww/3 }
		if( a2 == this._drill_level_max -1 ){ ww += 1 }	//799这种差一点点的参数值，补满条
				
		// ->流动效果
		var w = Math.floor(this._drill_level_width);
		if( this._drill_is_meter_moving ){
			w = w/3;
			if(this._drill_meter_moving_speed > 0){
				this._drill_up_meter_move += this._drill_meter_moving_speed;
				if( this._drill_up_meter_move >= w*2 ){
					this._drill_up_meter_move = this._drill_up_meter_move % w ;
				}
			}else if(this._drill_meter_moving_speed < 0){
				this._drill_up_meter_move += this._drill_meter_moving_speed;
				if( this._drill_up_meter_move <= w ){
					this._drill_up_meter_move += w ;
				}
			}
			if(this._drill_meter_moving_speed > 0){
				this._drill_down_meter_move += this._drill_meter_moving_speed;
				if( this._drill_down_meter_move >= w*2 ){
					this._drill_down_meter_move = this._drill_down_meter_move % w ;
				}
			}else if(this._drill_meter_moving_speed < 0){
				this._drill_down_meter_move += this._drill_meter_moving_speed;
				if( this._drill_down_meter_move <= w ){
					this._drill_down_meter_move += w ;
				}
			}
		}
		if(this._drill_up_meter.bitmap != null){	//（流动和长度都只能通过setFrame一个函数控制，不能分开）
			this._drill_up_meter.setFrame( this._drill_up_meter_move, 0, ww, this._drill_level_height );
		}
		if(this._drill_down_meter.bitmap != null){
			this._drill_down_meter.setFrame( this._drill_down_meter_move, 0, w, this._drill_level_height );
		}
	}
	//==============================
	// * 帧刷新 - 凹槽条数值
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLeakingValue = function() {
		
		// #凹槽条持平
		if( this._drill_leaking_cur_value <= this._drill_level_cur_value ){
			this._drill_leaking_cur_value = this._drill_level_cur_value;
			this._drill_leaking_time = this._drill_leaking_delay;
		}
		
		// #延迟 - 连续受伤刷新延迟
		if( this._drill_is_leaking_delayReflash &&
			this._drill_new_value != this._drill_cur_value ){
			this._drill_leaking_time = this._drill_leaking_delay;
		}
		
		// #延迟 - 达到时间后开始缩短
		this._drill_leaking_time -= 1;
		if(this._drill_leaking_time <= 0 ){
		
			if(this._drill_leaking_cur_value > this._drill_level_cur_value){
				this._drill_leaking_cur_value -= ( this._drill_leaking_speed * this._drill_level_max / this._drill_level_width );
			}
		}
		
		// #阻塞 - 凹槽条动作
		// （单层的参数扣完，但是凹槽仍在，这时候需要等凹槽结束缩短后进行下一轮伤害）
		var a1 = Math.floor(this._drill_leaking_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_leaking_cur_value % this._drill_level_max);
		
		if( this._drill_is_level_blocked == true ){		//阻塞时，解除等待延迟
			this._drill_leaking_time = 0;
		}
		
		if(a2 == 0 && this._drill_leaking_cur_value > 0 && 
			this._drill_leaking_cur_value > this._drill_level_cur_value ){ 	//如果当前层耗尽，强制减一，确保下一层的凹槽是满的
			this._drill_leaking_cur_value -= 1; 
		}
		
	}
	//==============================
	// * 帧刷新 - 凹槽条绘制
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLeakingMeter = function() {
		var a1 = Math.floor(this._drill_leaking_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_leaking_cur_value % this._drill_level_max);
		
		// #凹槽条长度
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if( this._drill_is_meter_moving ){ ww = ww/3 }
			
		if(this._drill_center_meter.bitmap != null){
			this._drill_center_meter.setFrame( 0, 0, ww, this._drill_level_height );
		}
	}
	//==============================
	// * 帧刷新 - 阻塞条件控制
	//			（阻塞状态：指层级下降一层时，等待凹槽条流逝完毕的状态，该状态显示的参数条会卡在下层的最大值位置）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateBlock = function() {
		
		// #凹槽条 - 流逝完毕后结束阻塞
		if(this._drill_leaking_cur_value <= this._drill_level_cur_value){
			this._drill_is_level_blocked = false;
		}
		
		// #排序 - 阻塞时的中层条放在最上层
		if(this._drill_is_level_blocked){
			this._drill_center.zIndex = 40;
		}else{
			this._drill_center.zIndex = 20;
		}
	}

	//==============================
	// ** 层级排序
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_sortByZIndex = function() {
	   this._drill_main.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	};

	//==============================
	// ** 帧刷新 - 弹出条建立
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateSpringInit = function() {
		
		var w1 = Math.floor(this._drill_spring_cur_value % this._drill_level_max);
		var w2 = Math.floor(this._drill_new_value % this._drill_level_max);
		w1 = this.drill_width() / this._drill_level_max * w1;		//弹出条长度值
		w2 = this.drill_width() / this._drill_level_max * w2;
		var cur_max = this._drill_cur_level * this._drill_level_max -1;

			
		if( this._drill_spring_cur_value != this._drill_new_value ){
			if(this._drill_spring_cur_value < cur_max){ w1 = 0; }
			if(this._drill_new_value < cur_max){ w2 = 0; }
			
			if( w1>w2 ){	//扣除参数的弹出条
				var up_bitmap = this._drill_up_meter.bitmap;
				
				var spring_bitmap = new Bitmap( w1-w2 , this._drill_level_height );
				var ux = w2;
				var uy = 0;
				var uw = w1-w2;
				var uh = this._drill_level_height;
				if( this._drill_spring_type == "白色块"){
					spring_bitmap.fillRect( 0, 0, uw, uh, "#ffffff");
				}else if(this._drill_spring_type == "黑色块"){
					spring_bitmap.fillRect( 0, 0, uw, uh, "#000000");
				}else{
					spring_bitmap.blt( up_bitmap, ux, uy, uw, uh, 0, 0, uw, uh);	//当前参数条
				}
				
				var spring_setting = {};		//重新组装必要参数
				spring_setting['s_x'] = ux;
				spring_setting['s_y'] = uy;
				spring_setting['s_bitmap'] = spring_bitmap;
				spring_setting['s_type'] = this._drill_spring_type;
				spring_setting['s_formulaX'] = this._drill_spring_formulaX;
				spring_setting['s_formulaY'] = this._drill_spring_formulaY;
				spring_setting['s_life'] = this._drill_spring_life;
				var new_spring_sprite = new Drill_SpringMeter_Sprite(spring_setting);
				this._drill_spring_tank.push(new_spring_sprite);
				this._drill_spring.addChild(new_spring_sprite);
			}
			this._drill_spring_cur_value = this._drill_new_value;
		}
		
	}
	//==============================
	// ** 帧刷新 - 弹出条销毁
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateSpringDestroy = function() {
		for(var i= this._drill_spring_tank.length-1; i>= 0; i--){
			var spring_sprite = this._drill_spring_tank[i];
			if( spring_sprite._drill_time > spring_sprite._drill_life ){
				this._drill_spring_tank.splice(i,1);
				delete spring_sprite;
			}
		}
	}
	//==============================
	// ** 帧刷新 - 粒子效果
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateParticle = function() {
		if( !this._drill_particles_enable ){ return }
		if( !this._drill_particles_bitmap || !this._drill_particles_bitmap.isReady() ){ return }
		
		var pw = this._drill_particles_bitmap.width;
		var ph = this._drill_particles_bitmap.height;
		
		for(var i= 0; i< this._drill_particles.length; i++){
			var par = this._drill_particles[i];
			
			if( par.x < 0 - pw ||		 //超出边界判定
				par.x > this.drill_widthInLeft() + pw ||
				par.y < 0 - ph ||
				par.y > this.drill_height() + ph ){
				par.cur_life -= par.cur_life/3;
			}
			
			par.x += (this._drill_particles_speedX + par.cur_random);
			par.y += (this._drill_particles_speedY + par.cur_random);
			par.cur_life -= 1;
			if( this._drill_particles_mode == "随机出现" ||
				this._drill_particles_mode == "左侧出现" ){	//随机出现有先显示后消失的过程
				var q = this._drill_particles_life/4;
				if( par.cur_life < q ){
					par.opacity = 255 * ( par.cur_life / q) ;
				}else if( par.cur_life > q*3 ){
					par.opacity = 255 * (( par.cur_life-q*3)/ q) ;
				}
			}else{
				par.opacity = 255 * ( par.cur_life / this._drill_particles_life);
			}
			
			if( par.cur_life <= 0 ){	//重新出现粒子
				par.cur_life = this._drill_particles_life + Math.random()*0.4*this._drill_particles_life;
				if( this._drill_particles_mode == "底部出现" ){
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = this.drill_height() + ph/2;
				}else if( this._drill_particles_mode == "顶部出现" ){
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = 0 - ph/2;
				}else if( this._drill_particles_mode == "左侧出现" ){
					par.opacity = 0;
					par.x = 0 - pw/2 * Math.random();
					par.y = this.drill_height() * Math.random();
				}else if( this._drill_particles_mode == "右侧出现" ){
					par.x = this.drill_widthInLeft() + pw/2;
					par.y = this.drill_height() * Math.random();
				}else{
					par.opacity = 0;		//随机出现
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = this.drill_height() * Math.random();
				}
			}
		}
	}
	//==============================
	// ** 帧刷新 - 游标
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateFloating = function() {
		if( !this._drill_floating_enable ){ return }
		
		var temp_sprite = this._drill_floating_sprite;
		var float_pos;
		var float_cur = this._drill_level_cur_value;
		var float_max = this._drill_level_max;
		if(this._drill_floating_reset){
			var a2 = Math.floor( float_cur % float_max);
			float_pos = this.drill_width() * a2 / float_max;
		}else{
			float_pos = this.drill_widthInLeft(); 
		}
		temp_sprite.x = float_pos; 
		temp_sprite.y = this.drill_height()/2;
		temp_sprite.x += this._drill_floating_x;
		temp_sprite.y += this._drill_floating_y;
		
		//>动画帧
		this._drill_floating_time += 1;
		if( this._drill_floating_time > this._drill_floating_interval ){
			this._drill_floating_time = 0;
			
			this._drill_floating_cur += 1;
			var len = this._drill_floating_bitmaps.length;
			if(this._drill_floating_cur >= len ){
				this._drill_floating_cur = 0;
			}
			if( this._drill_floating_backrun ){
				temp_sprite.bitmap = this._drill_floating_bitmaps[len - 1 - this._drill_floating_cur];
			}else{
				temp_sprite.bitmap = this._drill_floating_bitmaps[this._drill_floating_cur];
			}
		}
		
		//>游标模式
		if(this._drill_floating_mode == "亮光模式"){
			var a2 = Math.floor( float_cur % float_max);
			var tar_o ;
			if( a2 < float_max/3){
				tar_o = 255 * a2/(float_max/3);
			}
			if( a2 > float_max/3*2){
				tar_o = 255 - 255 * (a2 - float_max/3*2)/(float_max/3);
			}
			if(temp_sprite.opacity > tar_o){
				temp_sprite.opacity -= 3;
				if(temp_sprite.opacity < tar_o){
					temp_sprite.opacity = tar_o;
				}
			}
			if(temp_sprite.opacity < tar_o){
				temp_sprite.opacity += 3;
				if(temp_sprite.opacity > tar_o){
					temp_sprite.opacity = tar_o;
				}
			}
		}else if(this._drill_floating_mode == "闪烁模式"){
			temp_sprite.opacity += this._drill_floating_flash * 5;
			if(temp_sprite.opacity == 255){
				this._drill_floating_flash = -1;
			}
			if(temp_sprite.opacity == 0){
				this._drill_floating_flash = 1;
			}
		}else if(this._drill_floating_mode == "受伤模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value > this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else if(this._drill_floating_mode == "增量模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value < this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else if(this._drill_floating_mode == "变化模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value > this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
			if( this._drill_cur_value < this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else{
			temp_sprite.opacity = 255;
		}
		
	}

	//==============================
	// * 获取 - 层级图片是否准备就绪
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_isLevelsReady = function() {
		if( !this._drill_level_bitmaps ){ return false; }
		if( this._drill_level_bitmaps.length == 0 ){ return false; }
		var result = true;
		for( var i=0; i<this._drill_level_bitmaps.length; i++ ){
			if( !this._drill_level_bitmaps[i].isReady() ){ result = false; }
		}
		return result;
	}
	//==============================
	// * 获取 - 宽度（如果流动，返回三分之一）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_width = function(){
		if( this._drill_level_bitmaps.length == 0 ){ return 0; } 
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		if(this._drill_is_meter_moving){
			return this._drill_level_bitmaps[0].width /3;
		}else{
			return this._drill_level_bitmaps[0].width;
		}
	}
	//==============================
	// * 获取 - 高度
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_height = function() {
		if( this._drill_level_bitmaps.length == 0 ){ return 0; }
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		return this._drill_level_bitmaps[0].height;
	}
	//==============================
	// * 获取 - 参数条宽度（根据剩余的参数条的宽度来确定）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_widthInLeft = function(){
		if( this._drill_level_bitmaps.length == 0 ){ return 0; } 
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if(this._drill_is_meter_moving){
			if(a1 == 0 ){	//只剩最后一层时
				return ww/3;
			}else{
				return this._drill_level_bitmaps[0].width /3;
			}
		}else{
			if(a1 == 0 ){	//只剩最后一层时
				return ww;
			}else{
				return this._drill_level_bitmaps[0].width;
			}
		}
	}
	//==============================
	// * 获取 - 层级数量
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_getCurLevelNum = function() {
		return Math.floor(this._drill_level_cur_value / this._drill_level_max);
	}

	//=============================================================================
	// * 	Drill_SpringMeter_Sprite 弹出条类
	//
	//		初始化参数：见initialize函数中的方括号。
	//		使用方法：	1.属参数条专用。也可以外部使用。
	//					2.在参数条中直接new，设置速度、图像、持续时间 等参数，弹出条自己刷新轨迹。
	//=============================================================================
	function Drill_SpringMeter_Sprite() {
		this.initialize.apply(this, arguments);
	}

	Drill_SpringMeter_Sprite.prototype = Object.create(Sprite.prototype);
	Drill_SpringMeter_Sprite.prototype.constructor = Drill_SpringMeter_Sprite;

	Drill_SpringMeter_Sprite.prototype.initialize = function(settings) {
		Sprite.prototype.initialize.call(this);
		this._drill_data = settings;	//链接对象（包含object）
		//alert(JSON.stringify(settings));
		
		this._drill_type = this._drill_data['s_type'];			//模式
		this._drill_formulaX = this._drill_data['s_formulaX'];	//X速度公式
		this._drill_formulaY = this._drill_data['s_formulaY'];	//Y速度公式
		this._drill_life = this._drill_data['s_life'];			//持续时间
		this._drill_time = 0;									//计时器
		this._drill_ran = Math.random();						//随机速度
		
		this.bitmap = this._drill_data['s_bitmap'];
		this.x = this._drill_data['s_x'];
		this.y = this._drill_data['s_y'];
	}
	//==============================
	// ** 帧刷新 - 弹出轨迹
	//==============================
	Drill_SpringMeter_Sprite.prototype.update = function() {
		Sprite.prototype.update.call(this);
		
		this._drill_time += 1;
		
		var time = this._drill_time;
		var ran = this._drill_ran;
		this.opacity -= 255 / this._drill_life;
		this.x += eval(this._drill_formulaX);
		this.y += eval(this._drill_formulaY);
		
	}

}


//=============================================================================
// * Drill_GaugeMeter_SpriteMask 参数条遮罩类（加满动画）
//
//		初始化参数：见maskInit函数。
//		使用方法：	1.new之后，需要延迟调用配置函数：.maskInit(setting)
//		注意事项：	黑色部分和透明部分都表示遮挡。最初的状态是全遮挡的。
//=============================================================================
if( typeof(Drill_GaugeMeter_SpriteMask) == "undefined" ){	//防止重复定义

	function Drill_GaugeMeter_SpriteMask() {
		this.initialize.apply(this, arguments);
	}

	Drill_GaugeMeter_SpriteMask.prototype = Object.create(Sprite.prototype);
	Drill_GaugeMeter_SpriteMask.prototype.constructor = Drill_GaugeMeter_SpriteMask;

	Drill_GaugeMeter_SpriteMask.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		
		this._drill_needReflashBitmap = false;		//遮罩刷新
		this._drill_is_playing = false;				//动画是否播放
		this._drill_is_ending = false;				//动画是否结束
		this._drill_w = 0;							//宽度
		this._drill_t = 0;							//时长
		
		this._drill_bitmap_width = 0;				//遮罩长度
		this._drill_bitmap_height = 0;				//遮罩宽度
		this._drill_speed = 1;						//加满速度
		this._drill_time = 0;						//加满时长
		this._drill_speedType = "";					//加满方式
		this._drill_delay = 0;						//加满延迟
	};

	//==============================
	// * 配置初始化
	//==============================
	Drill_GaugeMeter_SpriteMask.prototype.maskInit = function(settings) {
		
		this._drill_bitmap_width = settings["width"];						//遮罩长度
		this._drill_bitmap_height = settings["height"];						//遮罩宽度
		this._drill_time = settings["fill_time"];							//加满时长
		this._drill_speed = this._drill_bitmap_width/this._drill_time;		//加满速度
		this._drill_speedType = settings["fill_type"];						//加满方式
		this._drill_delay = settings["fill_delay"];							//加满延迟
		
		this._drill_w = 0;						//宽度
		this._drill_t = 0;						//时长
		this._drill_needReflashBitmap = true;	//遮罩刷新
		this._drill_is_playing = true;			//动画是否播放
	}

	//==============================
	// * 帧刷新
	//==============================
	Drill_GaugeMeter_SpriteMask.prototype.update = function() {
		Sprite.prototype.update.call(this);
		
		if(this._drill_needReflashBitmap){
			this._drill_needReflashBitmap = false;
			this.bitmap = new Bitmap( this._drill_bitmap_width , this._drill_bitmap_height );
			this.bitmap.fillRect(0, 0, this._drill_bitmap_width , this._drill_bitmap_height, "#ffffff");
			this.setFrame(0,0,0 , this._drill_bitmap_height);
		}
		
		if(this._drill_is_playing){
			this._drill_t += 1;
			if( this._drill_t > this._drill_delay ){
				
				if( this._drill_speedType == '弹性加满' ){ this._drill_speed = Math.max( (this._drill_bitmap_width +1 - this._drill_w)/this._drill_time * 3 , 1 ); }
				this._drill_w += this._drill_speed;
				if( this._drill_w > this._drill_bitmap_width +1 ){
					this._drill_w = this._drill_bitmap_width +1;
					this._drill_is_playing = false;
					this._drill_is_ending = true;		//播放完毕后需要清除遮罩影响
				}
				this.setFrame(0,0,this._drill_w,this._drill_bitmap_height);
			}
		}
	}
	//==============================
	// * 获取-是否正在播放
	//==============================
	Drill_GaugeMeter_SpriteMask.prototype.isPlaying = function() {
		return this._drill_is_playing;
	}
	//==============================
	// * 获取-是否播放结束
	//==============================
	Drill_GaugeMeter_SpriteMask.prototype.isEnding = function() {
		return this._drill_is_ending;
	}
}

