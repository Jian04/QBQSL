//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.08] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个战斗AI插件改变了敌人和任何自动战斗演员
 * 通过实施许多新的关键组件来进行决策
 * 战斗的过程。这些新的组件是：AI样式，AI级别，
 * 评分方差、人工智能条件和影响TGR权重。
 *
 * 有了这些新的关键组件放在一起，你可以改变RPG制造商MZ的
 * 非常原始的人工智能变成了更聪明的东西。自动战斗演员
 * 也可以根据敌人的AI建立他们的AI模式，以便在
 * 在战斗中也有更理想的方法。
 *
 * Features include all (but not limited to) the following:
 * 
 * * 不同的A.I.样式，允许以各种方式设置敌人的A.I。
 * * 为敌人和自动战斗演员设置人工智能等级。
 * * 人工智能水平可以在全球范围或个人范围内设置。
 * * 设置评分差异级别以确定操作的优先级或将其随机化。
 * * 其中包括注释标签，可根据个人情况对其进行更改。
 * * 创造行动条件，使A.I.在特定情况下可以使用某些技能。
 * * 操作条件分为“ALL”和“ANY”类型，它们要求满足所有条件或至少满足一个条件。
 * * 大量可供选择的条件注释标签，用于帮助自定义何时使用技能以及选择哪个目标的最佳情况。
 * * 可以在插件参数中设置默认条件，以使整个技能数据库成为有条件的人工智能使用。
 * * 影响TGR权重，使某些目标更适合特定类型的行动。
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * 此插件需要将上面列出的插件安装在
 * 游戏的插件管理器列表，以便工作。你不能用这个开始你的游戏
 * 此插件在没有列出的插件的情况下启用。
 *
 * ------第3层------
 *
 * 此插件是第3层插件。把它放在下层的其他插件下
 * 插件管理器列表上的值（即：0、1、2、3、4、5）。这是为了确保
 * 你的插件将与系统的其他部分有最好的兼容性
 * VisuStella MZ库。
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * 这个插件为RPG制造商MZ的函数添加了一些新的硬编码特性。
 * 下面是它们的列表。
 *
 * ---
 *
 * Auto Battle A.I. for Actors
 *
 * -有了这个插件，就可以让某些类引用
 * 特定的敌人A.I.模式来决定在战斗中使用哪些技能。
 * 如果没有使用reference选项，那么参与者将使用默认的Auto-Battle
 * 评估以确定要使用哪些技能。
 *
 * ---
 * 
 * A.I. Styles
 * 
 * -目前有四种不同的人工智能样式。演员和敌人可以
 * 全局默认为另一个，或使用notetag单独更改。
 * 在A.I.样式部分阅读更多关于它们的信息。
 * 
 * ---
 *
 * A.I. Levels
 *
 * - 敌人和演员可以得到不同的人工智能等级。
 * AI级别越高，他们越是遵循条件。100AI级，
 * 人工智能永远不会违背条件。另一方面， lower
 * AI水平可能会忽略某些条件，并将其视为已满足。
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * -在RPG Maker数据库编辑器中，当决定敌人的行动模式时
 * 你可以决定行动的“评级”。额定值为1到9之间的值
 * 其中9的优先级最高，1的优先级最低。RPG制作人
 * 违约，有时会将评级下调几级，以允许更低的利率
 * 并绕过优先系统。
 *
 * -此插件允许您通过插件参数设置差异级别
 * 在全球范围内，或在单个基础上添加注释标签，以允许更大的，
 * 较小，或没有任何差异的评级。
 *
 * ---
 *
 * A.I.技能使用条件
 *
 * -敌人和任何使用自动战斗人工智能的演员只能
 * 只要满足特定条件，就要使用某些技能。这些
 * 条件在“ALL”条件集和“ANY”条件集之间拆分。
 *
 * - “所有”条件集要求满足该集的所有条件，以便A.I.使用该技能。
 *
 * - “任意”条件集要求至少满足该集的一个条件，以便A.I.使用该技能。
 *
 * -可以将各种条件插入到每个条件集中，以使
 * 对于一些非常特殊的使用条件。这些也有助于过滤掉
 * 也可以从中挑选目标。
 *
 * ---
 *
 * TGR的AI目标选择权重-------------------------------------------【仇恨值】？
 *
 * -TGR是RPG生成器MZ中的一个特殊参数，表示“目标速率”。
 * 一个人的TGR越高，他们就越有可能成为攻击的目标
 * 攻击。这个插件允许各种因素影响TGR的权重
 * 使某些目标更有可能成为攻击目标。
 *
 * -元素对TGR重量的影响率意味着
 * 元素攻击造成的伤害越多，TGR的重量就越高
 * 确定目标的技能。元素伤害越高，
 * TGR的重量越向上移动。
 *
 * -闪避率和魔法闪避率正好相反。电位越高
 * 目标的闪避和魔法闪避率为（物理和魔法技能）
 * 潜在目标的TGR权重越低。
 *
 * -在默认的插件参数设置下，TGR权重转移需要
 * 敌方部队要“知道”党的要素率、逃逸率和逃逸率
 * 魔法规避属性。敌军必须用元素攻击演员
 * 基于攻击来学习演员的抵抗力等级，物理攻击来
 * 学习演员的躲避，和魔法攻击来学习演员的魔法
 * 躲避等级。
 *
 * ---
 *
 * ============================================================================
 * A.I. 风格
 * ============================================================================
 * 
 * 目前有四种不同的人工智能样式。这些决定了人工智能的行为。
 * 您可以通过插件参数全局更改A.I.样式，
 * 也可以通过使用notetag单独更改类和敌人的A.I.样式。
 * 
 * 阅读以下内容，了解每种风格及其规则：
 * 
 * ---
 * 
 * Classic Style
 * 
 * “经典”风格是传统和默认的RPG制造商MZ AI风格。
 * 它把重点放在评分系统上，评分越高的技能就越重要
 * 在方差范围内给予较低评分的技能更多的优先权。
 * 
 * - 必须满足动作模式条件。
 * - 技能必须是可用的（能够支付其成本，并且不会被禁用）。
 * - 必须满足AI技能条件。
 * - 优先考虑评级较高的行动。
 * - 评级差异将由插件参数和/或备注便签确定。
 * - AI水平会影响是否忽略AI条件。
 * - 应用评级后，评级差异，以及A.I.条件，如果还有多个动作可供选择，
 *   从剩下的动作中随机选取。
 * - 如果没有有效的操作，则啥都不会做。
 * 
 * ---
 * 
 * Gambit Style
 * 
 * -“Gambit”风格是Yanfly引擎插件的Battle AI核心风格。
 * 它会把技能列下来，并按顺序使用它们，只要它们符合要求
 * 动作模式条件和人工智能条件。评分将被忽略。
 * 
 * - 必须满足动作模式条件。
 * - 技能必须是可用的（能够支付其成本，并且不会被禁用）。
 * - 必须满足AI技能条件。
 * - 优先考虑名单上较高的行动。
 * - 对列表底部的操作优先级较低。
 * - 评级和评级差异与是否采取行动无关。
 * - AI水平会影响是否忽略AI条件。
 * - 如果没有有效的操作，则什么也不做。
 * 
 * ---
 * 
 * Casual Style
 * 
 * -“休闲”风格对a.I.采取了一种更轻松的方式，它忽略了收视率
 * 也不关心行动的顺序。取而代之的是
 * 这种人工智能只关心人工智能的状况。全部有效
 * 之后的动作是随机选取的。
 * 
 * - 必须满足动作模式条件。
 * - 技能必须是可用的（能够支付其成本，并且不会被禁用）。
 * - 必须满足A.I.技能条件。
 * - 没有评级或顺序的优先系统。
 * - 人工智能水平在这里并不重要。
 * - 将从剩余的一组有效操作中选择一个随机操作。
 * - 如果没有有效的操作，则什么也不做。
 * 
 * ---
 * 
 * Random Style
 * 
 * -“随机”风格根本不在乎收视率或顺序。它只关心
 * 如果技能可以使用（可以支付费用）和行动模式
 * 条件。它不关心人工智能的条件、等级或顺序。
 * 
 * - 必须满足动作模式条件。
 * - 技能必须是可用的（能够支付其成本，并且不会被禁用）。
 * - 技能A.I.条件被忽略。
 * - 没有评级或顺序的优先系统。
 * - 人工智能水平在这里并不重要。
 * - 将从剩余的一组有效操作中选择一个随机操作。
 * - 如果没有有效的操作，则什么也不做。
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === 常规A.I.设置注释标签 ===
 *
 * 这些便签为敌人和任何敌人设置了与人工智能相关的常规设置
 * 使用人工智能的演员（需要自动战斗并且有一个参考人工智能）。
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - 将“x”替换为不带引号的“Classic”、“Gambit”、“Casual”或“Random”。
 *   例子: <AI Style: Gambit>
 * - 确定使用的A.I.样式。请参阅A.I.样式部分，了解各种样式。
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - 如果要使用A.I.，则指定装置的A.I.级别。
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - 设置按评级确定人工智能操作时的差异量。
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - 使任何使用该类且具有自动战斗特性的角色使用特定敌人的攻击模式
 *   (ratings, conditions, etc.)决定在战斗中使用哪种技能。
 * - 将“id”替换为表示要引用的敌人id的数字。
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - 防止类使用任何敌人作为他们的参考A.I.模式
 *   (包括在插件参数中设置的一个).
 *
 * ---
 *
 * === 技能A.I.条件注释标签 ===
 *
 * 将这些便签插入到你想要传授的技能的便签框中
 * 自定义A.I.条件。notetag的'All'版本需要
 * 当notetag的“Any”版本只需要一个时要满足的条件
 * 需要满足的条件。
 *
 * 如果两者同时使用，则“All”条件必须完全相同
 * 满足而“任何”条件只需满足一个。
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - 添加/删除技能所需的任意多个条件。
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - 添加/删除技能所需的任意多个条件。
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - 删除此技能的任何默认“All”和“any”条件。
 * 
 * ---
 *
 * -=-=- 条件列表 -=-=-
 *
 * 将上述部分的notetag中的 “condition” 替换为
 * 跟随创造条件。这些条件也在插件中使用
 * 默认条件的参数。
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - 将“x”和“y”替换为以下任一项：
 *
 * - 表示硬数字的数值。
 * - '50%' 或任何其他百分位数来表示一个比率。
 * - '0.5' 或任何其他浮点数来表示一个速率。
 *
 * - 'Variable x' （将“x”替换为数字）变量x的当前值。
 *
 * - 'HP%', 'MP%', 'TP%' 分别适用于HP、MP和TP费率。
 * - 'MaxHP', 'MaxMP', 'MaxTP' 对于潜在目标的各个值.
 * - 'Level' 潜在目标的水平。需要VisuMZ\u 0\u核心引擎才能影响敌人。
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' 潜在目标的总参数值。
 *
 * - 'param Buff Stacks' 对于潜在目标的当前Buff堆栈。
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' 对于潜在目标的当前减益堆栈。
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' 潜在目标当前buff回合持续时间。
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - 如果潜在目标不受该buff影响，则返回0。
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - 返回一个数值，该值指示潜在目标的团队中有多少活动成员。
 *
 * - 'Team Dead Members'
 *   - 返回一个数值，该值指示潜在目标的团队中有多少死亡成员。
 * 
 * - 如果找不到关键字匹配项，则比较值将为
 *   解释为JavaScript代码。如果JavaScript代码失败，它将
 *   默认值为0。
 *
 *   *注*要使这些条件中的任何一个以用户为基础，请添加
 *   条件前的 “user” 一词如下：
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - 不管怎样都是有效的。
 *
 * ---
 *
 * x% Chance
 * 
 * - 将“x”替换为表示此技能作为有效技能通过的概率百分比的数值。
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - 将“x”替换为开关的ID，以检查为开/关。
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - 要求用户或潜在目标是参与者/敌人。
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - 将“id”替换为用户或潜在目标需要的状态的id。
 * - 将“name”替换为目标需要的状态的名称。
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - 将“id”替换为用户或潜在目标不能具有的状态的id。
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I.=>TGR权重标签 ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - 设置基于元素比例的TGR权重影响大小。
 * - 将“x.x”替换为表示影响率的数值。
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - 在计算TGR权重以确定行动目标时，使作用者/敌人不考虑要素比率。
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - 设定基于EVA比率的TGR权重影响程度。
 * - 将“x.x”替换为表示影响率的数值。
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - 使行动方/敌方在计算TGR权重以确定行动目标时不考虑EVA率。
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - 设置基于MEV比例的TGR权重影响程度。
 * - 将“x.x”替换为表示影响率的数值。
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - 在计算TGR权重以确定行动目标时，使作用者/敌人不考虑MEV率。
 *
 * ---
 * 
 * === 特定A.I.目标记事本标签 ===
 * 
 * 特定的人工智能目标意味着用户在
 * 它是从一组有效的候选人中挑选出来，最终形成一个
 * 目标。这只会影响用户必须选择特定技能的技能
 * 目标，这意味着它将忽略随机范围和AoE范围的影响。
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - 绕过TGR影响，从一组有效目标中选择一个特定目标
 *  （不从有效目标组之外选择）作为技能目标。
 * - 将“type”替换为以下任一项：
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           始终选择用户（如果可用）
 *   First                          总是选择第一个有效的候选人
 *   Last                           总是选择最后一个有效的候选人
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  挑选级别最高的候选人
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  选择最大生命值最高的候选人
 *   Highest HP                     选择当前生命值最高的候选人
 *   Highest HP%                    选择HP比率最高的候选人
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  挑选最高MaxMP的候选人
 *   Highest MP                     挑选当前MP最高的候选人
 *   Highest MP%                    挑选MP比率最高的候选人
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  选择具有最高MaxTP的候选人
 *   Highest TP                     选择当前TP最高的候选对象
 *   Highest TP%                    选择TP比率最高的候选人
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    选择ATK参数最高的候选对象
 *   Highest DEF                    选择具有最高DEF参数的候选对象
 *   Highest MAT                    选择MAT参数最高的候选对象
 *   Highest MDF                    选择MDF参数最高的候选对象
 *   Highest AGI                    选择AGI参数最高的候选对象
 *   Highest LUK                    选择具有最高LUK参数的候选对象
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    选择命中率最高的候选对象
 *   Highest EVA                    选择EVA参数最高的候选人
 *   Highest CRI                    选择具有最高CRI参数的候选对象
 *   Highest CEV                    选择CEV参数最高的候选对象
 *   Highest MEV                    选择MEV参数最高的候选对象
 *   Highest MRF                    选择MRF参数最高的候选对象
 *   Highest CNT                    选择具有最高CNT参数的候选对象
 *   Highest HRG                    选择HRG参数最高的候选人
 *   Highest MRG                    选择MRG参数最高的候选对象
 *   Highest TRG                    选择TRG参数最高的候选对象
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    选择具有最高TGR参数的候选对象
 *   Highest GRD                    选择GRD参数最高的候选人
 *   Highest REC                    选择REC参数最高的候选对象
 *   Highest PHA                    选择具有最高PHA参数的候选对象
 *   Highest MCR                    选择具有最高MCR参数的候选对象
 *   Highest TCR                    选择TCR参数最高的候选对象
 *   Highest PDR                    选择具有最高PDR参数的候选对象
 *   Highest MDR                    选择MDR参数最高的候选人
 *   Highest FDR                    选择具有最高FDR参数的候选
 *   Highest EXR                    选择具有最高EXR参数的候选对象
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            选择大多数州的候选人（任何州）
 *   Highest Positive State Count   选择状态最积极的候选人
 *   Highest Negative State Count   选择最消极的候选人
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   挑选级别最低的候选人
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   选择最大生命值最低的候选人
 *   Lowest HP                      选择当前生命值最低的候选人
 *   Lowest HP%                     挑选生命值最低的候选人
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   选择MaxMP最低的候选人
 *   Lowest MP                      挑选当前MP最低的候选人
 *   Lowest MP%                     挑选MP比率最低的候选人
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   选择MaxTP最低的候选人
 *   Lowest TP                      选择当前TP最低的候选人
 *   Lowest TP%                     选择TP比率最低的候选人
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     选择ATK参数最低的候选对象
 *   Lowest DEF                     选择具有最低DEF参数的候选对象
 *   Lowest MAT                     选择具有最低MAT参数的候选对象
 *   Lowest MDF                     选择MDF参数最低的候选对象
 *   Lowest AGI                     选择AGI参数最低的候选对象
 *   Lowest LUK                     选择具有最低LUK参数的候选对象
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     选择命中率最低的候选对象
 *   Lowest EVA                     选择EVA参数最低的候选人
 *   Lowest CRI                     选择CRI参数最低的候选对象
 *   Lowest CEV                     选择CEV参数最低的候选对象
 *   Lowest MEV                     选择MEV参数最低的候选对象
 *   Lowest MRF                     选择MRF参数最低的候选对象
 *   Lowest CNT                     选择具有最低CNT参数的候选对象
 *   Lowest HRG                     选择HRG参数最低的候选人
 *   Lowest MRG                     选择MRG参数最低的候选对象
 *   Lowest TRG                     选择具有最低TRG参数的候选对象
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     选择具有最低TGR参数的候选对象
 *   Lowest GRD                     选择GRD参数最低的候选人
 *   Lowest REC                     选择具有最低REC参数的候选对象
 *   Lowest PHA                     选择具有最低PHA参数的候选对象
 *   Lowest MCR                     选择具有最低MCR参数的候选对象
 *   Lowest TCR                     选择TCR参数最低的候选对象
 *   Lowest PDR                     选择具有最低PDR参数的候选对象
 *   Lowest MDR                     选择MDR参数最低的候选人
 *   Lowest FDR                     选择具有最低FDR参数的候选对象
 *   Lowest EXR                     选择EXR参数最低的候选对象
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             选择状态最少的候选人（任意）
 *   Lowest Positive State Count    选择具有最少正态的候选
 *   Lowest Negative State Count    选择负状态最少的候选
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * (自用汉化，习惯就好 )咸鱼默汉化
 * -----------------------------------------------------------------------------
 *
 * ============================================================================
 * 插件参数：A.I.常规设置
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleAI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text AI常规设置
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I.默认条件
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR权重
 * @type struct<Weight>
 * @desc 某些属性如何转化为TGR权重？
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I风格
 *
 * @param ActorStyleAI:str
 * @text 角色风格
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc 你希望被引用的演员使用哪种人工智能风格？这不适用于未引用的参与者。
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text 敌人风格
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I.等级
 *
 * @param ActorAILevel:num
 * @text 角色A.I等级
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text 敌人A.I.等级
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I.评级
 *
 * @param ActorRatingVariance:num
 * @text 角色评分差值
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc 允许多少偏离A.I.评级？
 * 0 无差异。数字越大，差异越大。
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text 敌人评分差值
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc 允许多少偏离A.I.评级？
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text 角色 => AI参考
 * @parent Reference
 * @type enemy
 * @desc 默认情况下，角色应该引用哪个敌人A.I？
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text 学习知识
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc 要求敌人/演员在使用特定条件前测试对手的知识。
 * @default true
 *
 * @param UnknownElementRate:num
 * @text 未知元素比例
 * @parent LearnKnowledge:eval
 * @desc A.I.应将未知元素比率视为什么？
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All条件
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 为所有技能创建默认的“ALL”条件，而不使用任何AI便签？
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any条件
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 为所有技能创建默认的“ANY”条件，而不使用任何AI便签？
 * @default true
 *
 * @param HpDamage
 * @text HP伤害
 * 
 * @param HpDamageAll:json
 * @text All 条件
 * @parent HpDamage
 * @type note
 * @desc 默认的“所有”条件用于HP伤害技能。
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any 条件
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP伤害
 * 
 * @param MpDamageAll:json
 * @text All 条件
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any 条件
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP 恢复
 * 
 * @param HpRecoverAll:json
 * @text All 条件
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any 条件
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP 恢复
 * 
 * @param MpRecoverAll:json
 * @text All 条件
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any 条件
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All 条件
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any 条件
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP 消耗
 * 
 * @param MpDrainAll:json
 * @text All 条件
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any 条件
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text 添加状态
 * 
 * @param AddStateAll:json
 * @text All条件
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any条件
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text 清除状态
 * 
 * @param RemoveStateAll:json
 * @text All条件
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any条件
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text 添加Buff
 * 
 * @param AddBuffAll:json
 * @text All 条件
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any 条件
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text 清除Buff
 * 
 * @param RemoveBuffAll:json
 * @text All 条件
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any 条件
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text 添加Debuff
 * 
 * @param AddDebuffAll:json
 * @text All 条件
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any条件
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text 清除Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All条件
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any条件
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text 元素比例 => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc 在默认情况下考虑TGR重量时，使所有人工智能考虑基本元素率？
 * @default true
 *
 * @param ElementTgrRate:num
 * @text 影响率
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA比率 => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text 影响率
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV比率 => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text 影响率
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 */
//=============================================================================

const _0x27a7=['Weight','meetsPartyLevelCondition','STRUCT','_subject','makeDefaultConditions','status','forceValidTargets','EFFECT_ADD_DEBUFF','canGuard','gjiMw','GjKyi','actions','cxjgR','HRG','BattleManager_startAction','hasXParamAIKnowledge','LUK','1838930SuMmRL','RollB','MRF','EnemyRatingVariance','NUM','aIdJL','elementInfluence','level','jZLxA','VisuMZ_4_AggroControl','version','makeTargets','HP%','meetsHpCondition','MpRecover%1','random','usableSkills','YUioZ','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EFFECT_RECOVER_HP','CRI','isActor','Game_Unit_initialize','Kxept','EnemyAILevel','nOddX','PEvZu','value','EnableAnyCon','GRD','PBSCe','addElementAIKnowledge','EFFECT_ADD_STATE','LearnKnowledge','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ZOdtC','isConfused','HpDrain%1','niWgy','hpRate','includes','aliveMembers','filterForcedTargeting','max','iBeHI','action','dataId','MAXMP','jpjey','HIT','MTUUb','buff','MAT','102MCvSzj','allCondition','determineActionByAIisStillValid','aiTarget','_applyAIForcedTargetFilters','ActorAILevel','nkGQi','evaInfluenceRate','isEnemy','getAllConditions','prototype','vtGDX','PFJWA','return\x200','ilKQv','_regexp','RAsni','1560225IDRCTN','kCJKR','edQqF','currentAction','format','ConvertParams','selectAllActionsGambit','eohnI','Game_BattlerBase_sparam','FUNC','vFxIF','Game_Troop_setup','map','isPhysical','_buffTurns','EvaTgr','aiApplyEvaTgrInfluenceRate','indexOf','MAX_SAFE_INTEGER','iOoSD','QYkWK','iEkDk','anyCondition','autoRemovalTiming','MpDamage%1','EFFECT_REMOVE_DEBUFF','MpDrain%1','isStateAffected','EQfzd','RemoveState%1','enemyId','initialize','PHA','note','HpRecover%1','VlsXi','applyBattleAI','ATK','friendsUnit','currentClass','FIRST','Default','EvaTgrRate','push','xfnpO','MDR','Game_Action_apply','split','casual','applyBattleAiTgrInfluences','startAction','getDefaultAllConditions','DraRE','General','deadMembers','MCR','isPlaytest','mpRate','STR','FOLah','remove','REC','aJase','%1\x20%2\x20%3','gambit','CEV','isForOpponent','EDuxG','_aiKnowledge','RlmJR','TGR','isActionValid','GHPfT','effects','meetsMpCondition','lslwa','opponentsUnit','isMagical','YhLuO','owCph','DmPkk','Game_Temp_initialize','elementInfluenceRate','canAttack','enemy','UALgb','ZjyWU','skillId','PsnfS','mevRates','jPXzk','getStateIdWithName','BattleAI','ANKur','elementKnowledgeRate','xGhHz','makeAutoBattleActions','EFFECT_REMOVE_BUFF','qokPU','addAIKnowledge','selectAction','AddState%1','sparam','MAXTP','TP%','aiStyle','Game_Action_makeTargets','3187pDOVKz','Game_Unit_randomTarget','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ElementTgr','meetsStateCondition','elementRates','382mDvbHx','damage','attackSkillId','aiElementTgr','aiTgrInfluence','FDR','lWZMN','EFFECT_REMOVE_STATE','doesTargetMeetCondition','slice','pgnDg','LAST','RuvqS','aiMevTgr','ARRAYEVAL','hasElementAIKnowledge','UMIni','attackElements','exit','noCondition','DxRsc','ZYcHl','meetsSwitchCondition','aiLevel','setSkill','BPCZb','Game_Actor_makeAutoBattleActions','AddBuff%1','MDF','determineLineValue','initBattleAI','getDefaultAnyConditions','POSITIVE\x20STATE\x20COUNT','numActions','isAggroAffected','meetsCondition','clearAiTgrInfluence','makeDeepCopy','WbQgC','_elementIDs','EVA','toLowerCase','getAnyConditions','mev','13956AfbJYe','aiApplyMevTgrInfluenceRate','makeValidTargets','value1','elements','doesTargetMeetAllConditions','NEGATIVE','RemoveBuff%1','isConditionalAI','Any','addXParamAIKnowledge','states','actorId','isDetermineActionByAI','classic','doesAIApplyEvaTgrInfluence','setAiTgrInfluences','VisuMZ_1_ElementStatusCore','randomTarget','jTMPF','XLTBT','UaRbu','clearAIKnowledge','EFFECT_RECOVER_MP','length','mevInfluenceRate','bypassElementTgr','elementRate','ovgfA','apply','4rgzLJQ','_aiTgrInfluence','clamp','AddDebuff%1','evaRates','doesTargetMeetAIConditions','xqgIC','SsneD','emaPS','createFilterTarget','135644FDIFjy','ALWAYS','subject','value2','maxTp','user','ARRAYNUM','NcfZi','isForDeadFriend','code','hyxpu','selectAllActions','HhDAX','CNT','rating','filter','63283QDcXmJ','setup','DEF','lcpge','TmEJQ','tpRate','parse','statesByCategory','WxJER','FaAAx','kJqJB','POSITIVE','VisuMZ_1_SkillsStatesCore','JSON','qELgi','hasForcedTargets','bypassEvaTgr','lJCgx','isSkill','param','doesAIApplyElementalTgrInfluence','tUvzw','JcSGt','ptnZN','sDNwT','aiKnowledge','PDR','highestTgrMember','HpDamage%1','match','isForAliveFriend','shars','referenceEnemyForAI','elementId','passesAILevel','ymlze','pmuCI','mhp','eva','guardSkillId','ActorRatingVariance','determineNewValidAIAction','Poamr','xparam','RPgXo','DAAhk','log','reduce','isMax%1Affected','MAXHP','item','UnknownElementRate','EnemyStyleAI','ARRAYJSON','BlUHX','_forceValidTargets','makeAutoBattleActionsWithEnemyAI','jgEyB','itemTargetCandidates','setEnemyAction','_stateIDs','replace','aiApplyElementalTgrInfluenceRate','trim','This\x20is\x20a\x20static\x20class','MP%','EFBZD','JvSFz','call','charAt','doesTargetMeetAnyConditions','needsSelection','luqTh','All','actor','OpyFo','foJXt','selectAllActionsClassic','1096551khCkYy','name','aiRatingVariance','bypassMevTgr','RemoveDebuff%1','IlnQY','elementIds','ARRAYSTRUCT','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','Game_Enemy_isActionValid','vnhTY','is%1Affected','wQsOy','EVAL','ZtflB','VisuMZ_1_BattleCore','clearForcedTargets','ActorStyleAI','VisuMZ_2_AggroControlSystem','concat','ZMDsb','hasValidTargets','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','description','randomInt','forcedTargets','Settings','ShuffleArray','lSluY','toUpperCase','Game_Unit_aliveMembers','_stateTurns','AGI','YdRFX','LEVEL','doesAIApplyMevTgrInfluence','FJoaf','SnOkl','HFNkW','uuyoV','debuff','getElementIdWithName','selectAllActionsRandom','Game_Action_itemTargetCandidates','floor','aiEvaTgr'];function _0x2c2b(_0x370783,_0x4e3473){_0x370783=_0x370783-0x188;let _0x27a736=_0x27a7[_0x370783];return _0x27a736;}const _0x4c6e21=_0x2c2b;(function(_0x4994e3,_0x51b533){const _0x11b7f9=_0x2c2b;while(!![]){try{const _0x2071a0=-parseInt(_0x11b7f9(0x1fd))+parseInt(_0x11b7f9(0x1b7))+parseInt(_0x11b7f9(0x268))*-parseInt(_0x11b7f9(0x26e))+parseInt(_0x11b7f9(0x2b8))*-parseInt(_0x11b7f9(0x2c2))+parseInt(_0x11b7f9(0x320))+-parseInt(_0x11b7f9(0x2d2))+-parseInt(_0x11b7f9(0x1ec))*-parseInt(_0x11b7f9(0x29a));if(_0x2071a0===_0x51b533)break;else _0x4994e3['push'](_0x4994e3['shift']());}catch(_0x53d3d5){_0x4994e3['push'](_0x4994e3['shift']());}}}(_0x27a7,0xee273));var label=_0x4c6e21(0x259),tier=tier||0x0,dependencies=[_0x4c6e21(0x32f)],pluginData=$plugins[_0x4c6e21(0x2d1)](function(_0x4f8bed){const _0x41531e=_0x4c6e21;return _0x4f8bed[_0x41531e(0x1ab)]&&_0x4f8bed['description'][_0x41531e(0x1df)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x4c6e21(0x202)]=function(_0x12e020,_0x2f4961){const _0x195bd4=_0x4c6e21;for(const _0x127ec1 in _0x2f4961){if(_0x127ec1['match'](/(.*):(.*)/i)){if(_0x195bd4(0x32e)===_0x195bd4(0x231)){function _0x1cd782(){const _0x1487ad=_0x195bd4;if(_0x29c94e[_0x1487ad(0x1e4)]&&_0x261a88[_0x1487ad(0x1e4)][_0x1487ad(0x290)]())return 0x1;}}else{const _0x3d59ed=String(RegExp['$1']),_0x30f192=String(RegExp['$2'])[_0x195bd4(0x195)]()[_0x195bd4(0x311)]();let _0x2a151b,_0x428664,_0x338d85;switch(_0x30f192){case _0x195bd4(0x1bb):_0x2a151b=_0x2f4961[_0x127ec1]!==''?Number(_0x2f4961[_0x127ec1]):0x0;break;case _0x195bd4(0x2c8):_0x428664=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664[_0x195bd4(0x209)](_0x470f3e=>Number(_0x470f3e));break;case _0x195bd4(0x32d):_0x2a151b=_0x2f4961[_0x127ec1]!==''?eval(_0x2f4961[_0x127ec1]):null;break;case _0x195bd4(0x27c):_0x428664=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664[_0x195bd4(0x209)](_0x402137=>eval(_0x402137));break;case _0x195bd4(0x2df):_0x2a151b=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):'';break;case _0x195bd4(0x307):_0x428664=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664[_0x195bd4(0x209)](_0x2de029=>JSON[_0x195bd4(0x2d8)](_0x2de029));break;case _0x195bd4(0x206):_0x2a151b=_0x2f4961[_0x127ec1]!==''?new Function(JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1])):new Function(_0x195bd4(0x1f9));break;case'ARRAYFUNC':_0x428664=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664['map'](_0x5b8896=>new Function(JSON[_0x195bd4(0x2d8)](_0x5b8896)));break;case _0x195bd4(0x237):_0x2a151b=_0x2f4961[_0x127ec1]!==''?String(_0x2f4961[_0x127ec1]):'';break;case'ARRAYSTR':_0x428664=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664['map'](_0x12a1d8=>String(_0x12a1d8));break;case _0x195bd4(0x1a8):_0x338d85=_0x2f4961[_0x127ec1]!==''?JSON[_0x195bd4(0x2d8)](_0x2f4961[_0x127ec1]):{},_0x2a151b=VisuMZ[_0x195bd4(0x202)]({},_0x338d85);break;case _0x195bd4(0x327):_0x428664=_0x2f4961[_0x127ec1]!==''?JSON['parse'](_0x2f4961[_0x127ec1]):[],_0x2a151b=_0x428664[_0x195bd4(0x209)](_0x4e65fe=>VisuMZ['ConvertParams']({},JSON[_0x195bd4(0x2d8)](_0x4e65fe)));break;default:continue;}_0x12e020[_0x3d59ed]=_0x2a151b;}}}return _0x12e020;},(_0x47d244=>{const _0x200aa1=_0x4c6e21,_0x5ebc11=_0x47d244[_0x200aa1(0x321)];for(const _0x591871 of dependencies){if('TQlzz'!==_0x200aa1(0x1af)){if(!Imported[_0x591871]){if(_0x200aa1(0x1d5)==='pMGdL'){function _0x47a80b(){const _0xe2d328=_0x200aa1;_0x41bc5a[_0xe2d328(0x326)][_0xe2d328(0x228)](_0x31957d[_0xe2d328(0x304)]()['damage'][_0xe2d328(0x2f3)]);}}else{alert(_0x200aa1(0x1d9)[_0x200aa1(0x201)](_0x5ebc11,_0x591871)),SceneManager[_0x200aa1(0x280)]();break;}}}else{function _0x583501(){const _0x287ce2=_0x200aa1;return _0x143498[_0x287ce2(0x223)]()[_0x287ce2(0x1e0)]()[_0x287ce2(0x2b2)];}}}const _0x560f77=_0x47d244[_0x200aa1(0x18f)];if(_0x560f77[_0x200aa1(0x2ef)](/\[Version[ ](.*?)\]/i)){if(_0x200aa1(0x2ce)===_0x200aa1(0x1e9)){function _0x4e0fed(){const _0x217dd9=_0x200aa1;_0x39e4e4[_0x217dd9(0x326)]=_0x3f963b[_0x217dd9(0x326)][_0x217dd9(0x18b)](_0x54baa0[_0x217dd9(0x27f)]());}}else{const _0x69c8b9=Number(RegExp['$1']);if(_0x69c8b9!==VisuMZ[label][_0x200aa1(0x1c1)]){if('RPgXo'===_0x200aa1(0x2fe))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x200aa1(0x201)](_0x5ebc11,_0x69c8b9)),SceneManager[_0x200aa1(0x280)]();else{function _0x16de36(){const _0x3e6a0e=_0x200aa1;return this[_0x3e6a0e(0x28d)](_0x10c227);}}}}}if(_0x560f77[_0x200aa1(0x2ef)](/\[Tier[ ](\d+)\]/i)){const _0x2e918e=Number(RegExp['$1']);if(_0x2e918e<tier){if('qjnJB'!==_0x200aa1(0x31e))alert(_0x200aa1(0x26a)[_0x200aa1(0x201)](_0x5ebc11,_0x2e918e,tier)),SceneManager[_0x200aa1(0x280)]();else{function _0x440825(){const _0x1e80f2=_0x200aa1;return _0x1e80f2(0x2a8);}}}else{if('jZLxA'!==_0x200aa1(0x1bf)){function _0x4cb2d3(){const _0x1ceb7c=_0x200aa1,_0x3ef119=_0x267c39[_0x1ceb7c(0x191)]();_0xc8a174=_0x1994b9[_0x1ceb7c(0x2d1)](_0x21ae47=>_0x3ef119['includes'](_0x21ae47));}}else tier=Math[_0x200aa1(0x1e2)](_0x2e918e,tier);}}VisuMZ[_0x200aa1(0x202)](VisuMZ[label][_0x200aa1(0x192)],_0x47d244['parameters']);})(pluginData);function AIManager(){const _0xa30316=_0x4c6e21;throw new Error(_0xa30316(0x312));}AIManager[_0x4c6e21(0x1fb)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x4c6e21(0x2a2)]=function(_0x357f7c){const _0x26a09e=_0x4c6e21;if(!_0x357f7c)return![];return this[_0x26a09e(0x1f5)](_0x357f7c)[_0x26a09e(0x2b2)]>0x0||this[_0x26a09e(0x298)](_0x357f7c)[_0x26a09e(0x2b2)]>0x0;},AIManager['getAllConditions']=function(_0x289a06){const _0x211fec=_0x4c6e21;if(_0x289a06['note'][_0x211fec(0x2ef)](AIManager[_0x211fec(0x1fb)][_0x211fec(0x281)]))return[];else return _0x289a06[_0x211fec(0x21e)]['match'](AIManager[_0x211fec(0x1fb)][_0x211fec(0x1ed)])?String(RegExp['$1'])[_0x211fec(0x22c)](/[\r\n]+/)[_0x211fec(0x239)](''):this[_0x211fec(0x230)](_0x289a06);},AIManager[_0x4c6e21(0x298)]=function(_0x4238f9){const _0x417472=_0x4c6e21;if(_0x4238f9[_0x417472(0x21e)]['match'](AIManager[_0x417472(0x1fb)][_0x417472(0x281)]))return[];else return _0x4238f9[_0x417472(0x21e)]['match'](AIManager[_0x417472(0x1fb)][_0x417472(0x213)])?String(RegExp['$1'])[_0x417472(0x22c)](/[\r\n]+/)['remove'](''):this['getDefaultAnyConditions'](_0x4238f9);},AIManager[_0x4c6e21(0x230)]=function(_0x4d3b8c){const _0xb90a1e=_0x4c6e21;if(!VisuMZ['BattleAI'][_0xb90a1e(0x192)][_0xb90a1e(0x226)]['EnableAllCon'])return[];if(_0x4d3b8c[_0xb90a1e(0x21e)][_0xb90a1e(0x2ef)](AIManager[_0xb90a1e(0x1fb)][_0xb90a1e(0x213)]))return[];return this['makeDefaultConditions'](_0x4d3b8c,_0xb90a1e(0x31b));},AIManager[_0x4c6e21(0x28d)]=function(_0x4de15e){const _0x2a18a3=_0x4c6e21;if(!VisuMZ[_0x2a18a3(0x259)][_0x2a18a3(0x192)]['Default'][_0x2a18a3(0x1d3)])return[];if(_0x4de15e['note'][_0x2a18a3(0x2ef)](AIManager[_0x2a18a3(0x1fb)][_0x2a18a3(0x1ed)]))return[];return this[_0x2a18a3(0x1aa)](_0x4de15e,_0x2a18a3(0x2a3));},AIManager['makeDefaultConditions']=function(_0x3b662e,_0x365842){const _0x25f36e=_0x4c6e21;if(!_0x3b662e)return[];const _0x180020=VisuMZ[_0x25f36e(0x259)][_0x25f36e(0x192)][_0x25f36e(0x226)],_0x39f380=[_0x25f36e(0x303),_0x25f36e(0x1e6),_0x25f36e(0x222),_0x25f36e(0x2d4),'MAT',_0x25f36e(0x28a),_0x25f36e(0x198),_0x25f36e(0x1b6)],_0x47923c=_0x3b662e[_0x25f36e(0x26f)]['type'],_0x705885=_0x3b662e[_0x25f36e(0x246)];let _0x1e51e4=[],_0x5b9773='',_0xf5007c='';switch(_0x47923c){case 0x1:_0x5b9773='HpDamage%1'[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case 0x2:_0x5b9773=_0x25f36e(0x215)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case 0x3:_0x5b9773=_0x25f36e(0x21f)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)['remove'](''));break;case 0x4:_0x5b9773='MpRecover%1'[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4['concat'](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case 0x5:_0x5b9773=_0x25f36e(0x1dc)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case 0x6:_0x5b9773=_0x25f36e(0x217)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));break;}for(const _0x4b043d of _0x705885){if(!_0x4b043d)continue;switch(_0x4b043d[_0x25f36e(0x2cb)]){case Game_Action[_0x25f36e(0x1ca)]:if(_0x4b043d[_0x25f36e(0x29d)]>0x0||_0x4b043d[_0x25f36e(0x2c5)]>0x0){if(_0x25f36e(0x19c)===_0x25f36e(0x253)){function _0x54532f(){const _0x2a6662=_0x25f36e;return this[_0x2a6662(0x20d)]()>0x0;}}else _0x5b9773=_0x25f36e(0x21f)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));}else{if(_0x4b043d[_0x25f36e(0x29d)]<0x0||_0x4b043d[_0x25f36e(0x2c5)]<0x0){if('cWAbM'!=='vQiFQ')_0x5b9773=_0x25f36e(0x2ee)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4['concat'](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));else{function _0x5552a9(){const _0x4876df=_0x25f36e;for(const _0x252438 of _0x252ce3){_0x566108[_0x4876df(0x1d6)](_0x252438,this);}}}}}break;case Game_Action[_0x25f36e(0x2b1)]:if(_0x4b043d[_0x25f36e(0x29d)]>0x0||_0x4b043d[_0x25f36e(0x2c5)]>0x0)_0x5b9773=_0x25f36e(0x1c5)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)['remove'](''));else(_0x4b043d[_0x25f36e(0x29d)]<0x0||_0x4b043d[_0x25f36e(0x2c5)]<0x0)&&(_0x5b9773=_0x25f36e(0x215)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773],_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)]('')));break;case Game_Action[_0x25f36e(0x1d7)]:if(_0x4b043d['dataId']===0x0)continue;_0x5b9773=_0x25f36e(0x262)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x4b043d[_0x25f36e(0x1e5)]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case Game_Action[_0x25f36e(0x275)]:_0x5b9773=_0x25f36e(0x21a)['format'](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x4b043d[_0x25f36e(0x1e5)]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case Game_Action['EFFECT_ADD_BUFF']:_0x5b9773=_0x25f36e(0x289)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x39f380[_0x4b043d['dataId']]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c['split'](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case Game_Action[_0x25f36e(0x1ad)]:_0x5b9773=_0x25f36e(0x2bb)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x39f380[_0x4b043d[_0x25f36e(0x1e5)]]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case Game_Action[_0x25f36e(0x25e)]:_0x5b9773=_0x25f36e(0x2a1)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x39f380[_0x4b043d[_0x25f36e(0x1e5)]]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)[_0x25f36e(0x239)](''));break;case Game_Action[_0x25f36e(0x216)]:_0x5b9773=_0x25f36e(0x324)[_0x25f36e(0x201)](_0x365842),_0xf5007c=_0x180020[_0x5b9773][_0x25f36e(0x201)](_0x39f380[_0x4b043d[_0x25f36e(0x1e5)]]),_0x1e51e4=_0x1e51e4[_0x25f36e(0x18b)](_0xf5007c[_0x25f36e(0x22c)](/[\r\n]+/)['remove'](''));break;}}return _0x1e51e4;},AIManager[_0x4c6e21(0x1ac)]=function(_0x5512fb,_0x5efc57){const _0x3caf73=_0x4c6e21;this['_forceValidTargets']=this[_0x3caf73(0x29c)](_0x5512fb,_0x5efc57);},AIManager[_0x4c6e21(0x188)]=function(){this['_forceValidTargets']=[];},AIManager[_0x4c6e21(0x191)]=function(){const _0x2e094a=_0x4c6e21;return this[_0x2e094a(0x309)]=this[_0x2e094a(0x309)]||[],this[_0x2e094a(0x309)];},AIManager[_0x4c6e21(0x2e1)]=function(){const _0x2a5996=_0x4c6e21;return this[_0x2a5996(0x191)]()[_0x2a5996(0x2b2)]>0x0;},AIManager['hasValidTargets']=function(_0x1cdd67,_0x4267ca){const _0x1b1f4=_0x4c6e21;if(!_0x1cdd67)return![];if(!_0x4267ca)return![];if(!DataManager[_0x1b1f4(0x2e4)](_0x4267ca))return;if(this[_0x1b1f4(0x2a2)](_0x4267ca))return this[_0x1b1f4(0x29c)](_0x1cdd67,_0x4267ca)['length']>=0x1;else{if('wWhJw'===_0x1b1f4(0x27e)){function _0x1067fd(){const _0x3a44e9=_0x1b1f4,_0xdad725=_0x53810d['indexOf'](_0x5558ff(_0xaa68f1['$2'])['toUpperCase']()['trim']()),_0x3a877f=_0x13cf78(_0x11de1d['$3'])['toLowerCase']()[_0x3a44e9(0x311)](),_0x1d6a48=_0xcb7042(_0x7b8d6e['$1'])[_0x3a44e9(0x2ef)](/(?:USER|SUBJECT)/i)?_0x401b96:_0xec4d,_0xbc3ce6=_0x3a44e9(0x302)[_0x3a44e9(0x201)](_0x3a877f[_0x3a44e9(0x317)](0x0)[_0x3a44e9(0x195)]()+_0x3a877f[_0x3a44e9(0x277)](0x1));return!_0x1d6a48[_0xbc3ce6](_0xdad725);}}else return!![];}},AIManager[_0x4c6e21(0x29c)]=function(_0x411ba9,_0x380904){const _0x368f1d=_0x4c6e21;let _0x4bf889=[];if(this[_0x368f1d(0x2a2)](_0x380904)){if(_0x368f1d(0x25a)!=='ANKur'){function _0x2caf0a(){const _0x206460=_0x368f1d;_0x1067ed[_0x206460(0x1ac)](this[_0x206460(0x2c4)](),this[_0x206460(0x304)]()),this[_0x206460(0x319)]()&&_0x1f8313[_0x206460(0x1e1)](this[_0x206460(0x2c4)](),this[_0x206460(0x304)]());}}else{const _0x19a741=this[_0x368f1d(0x1f5)](_0x380904),_0x7bacf=this[_0x368f1d(0x298)](_0x380904),_0x1f7348=new Game_Action(_0x411ba9);_0x1f7348[_0x368f1d(0x286)](_0x380904['id']);let _0x40158b=[];if(Imported[_0x368f1d(0x18a)]&&_0x1f7348[_0x368f1d(0x290)]()){const _0x5c1631=_0x1f7348[_0x368f1d(0x23f)]()?_0x411ba9[_0x368f1d(0x249)]():_0x411ba9[_0x368f1d(0x223)]();_0x40158b=[_0x5c1631[_0x368f1d(0x2ed)]()];}else{if(_0x1f7348['isForEveryone']())_0x40158b=$gameParty[_0x368f1d(0x1e0)]()[_0x368f1d(0x18b)]($gameTroop['aliveMembers']());else{if(_0x1f7348['isForOpponent']())_0x40158b=_0x411ba9[_0x368f1d(0x249)]()[_0x368f1d(0x1e0)]();else{if(_0x1f7348[_0x368f1d(0x2ca)]())_0x40158b=_0x411ba9[_0x368f1d(0x223)]()[_0x368f1d(0x233)]();else{if(_0x1f7348[_0x368f1d(0x2f0)]()){if('ihUEv'!=='ihUEv'){function _0x53d2d1(){const _0xcbbc02=_0x368f1d;return _0x22883b['prototype']['meetsCondition'][_0xcbbc02(0x316)](this,_0x4ad290);}}else _0x40158b=_0x411ba9[_0x368f1d(0x223)]()[_0x368f1d(0x1e0)]();}}}}}_0x4bf889=_0x40158b[_0x368f1d(0x2d1)](_0x5ba1f9=>this[_0x368f1d(0x2bd)](_0x411ba9,_0x5ba1f9,_0x380904,_0x19a741,_0x7bacf));}}return _0x4bf889;},AIManager[_0x4c6e21(0x2bd)]=function(_0xc42d76,_0x3bebc1,_0x2bed52,_0x252077,_0x2cde6a){const _0x583562=_0x4c6e21;return this[_0x583562(0x29f)](_0xc42d76,_0x3bebc1,_0x2bed52,_0x252077)&&this[_0x583562(0x318)](_0xc42d76,_0x3bebc1,_0x2bed52,_0x2cde6a);},AIManager[_0x4c6e21(0x29f)]=function(_0x4256ba,_0x3d9040,_0x43b19b,_0x2a2f6a){const _0x22853b=_0x4c6e21;if(_0x2a2f6a[_0x22853b(0x2b2)]<=0x0)return!![];for(const _0x388fa1 of _0x2a2f6a){if('dHJYA'===_0x22853b(0x194)){function _0x3477ce(){const _0x553ba5=_0x22853b,_0x5cfeae=_0x3e447f(_0x23c7c1['$1'])*0.01;return _0x57e67d[_0x553ba5(0x1c6)]()<_0x5cfeae;}}else{if(!_0x388fa1)continue;if(_0x388fa1['length']<=0x0)continue;if(!this['passesAILevel'](_0x4256ba))return!![];if(!this['doesTargetMeetCondition'](_0x4256ba,_0x3d9040,_0x43b19b,_0x388fa1))return![];}}return!![];},AIManager['doesTargetMeetAnyConditions']=function(_0x505f77,_0x48fb37,_0x54e741,_0x5ee0c8){const _0x5ed46e=_0x4c6e21;if(_0x5ee0c8['length']<=0x0)return!![];for(const _0x555892 of _0x5ee0c8){if(_0x5ed46e(0x2f5)===_0x5ed46e(0x2f5)){if(!_0x555892)continue;if(_0x555892['length']<=0x0)continue;if(!this[_0x5ed46e(0x2f4)](_0x505f77))return!![];if(this[_0x5ed46e(0x276)](_0x505f77,_0x48fb37,_0x54e741,_0x555892))return!![];}else{function _0x433058(){return _0x2e79ba[_0x233389['getEnemyIdWithName'](_0x5cc89a(_0x379a3d['$1']))];}}}return![];},AIManager[_0x4c6e21(0x2f4)]=function(_0x3d501e){const _0x44d6ba=_0x4c6e21,_0x46cb76=_0x3d501e[_0x44d6ba(0x285)]();return Math[_0x44d6ba(0x190)](0x64)<_0x46cb76;},AIManager[_0x4c6e21(0x276)]=function(_0x318b4e,_0x942e6f,_0x867bc3,_0x1f5278){const _0x2725ca=_0x4c6e21,_0x2ad08f=['MAXHP','MAXMP','ATK',_0x2725ca(0x2d4),'MAT',_0x2725ca(0x28a),_0x2725ca(0x198),_0x2725ca(0x1b6)];if(_0x1f5278['toUpperCase']()[_0x2725ca(0x311)]()===_0x2725ca(0x2c3))return!![];const _0x548275=_0x318b4e;if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x41f523=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x3ececb=this['determineLineValue'](_0x318b4e,_0x942e6f,_0x867bc3,_0x41f523[0x0]),_0x422970=_0x41f523[0x1],_0x39876a=this['determineLineValue'](_0x318b4e,_0x942e6f,_0x867bc3,_0x41f523[0x2]);window[_0x2725ca(0x2c7)]=window['a']=window['b']=undefined;const _0x37cb56=_0x2725ca(0x23c)[_0x2725ca(0x201)](_0x3ececb,_0x422970,_0x39876a);try{return eval(_0x37cb56);}catch(_0x518d2b){if($gameTemp['isPlaytest']()){if('PsnfS'===_0x2725ca(0x255))console[_0x2725ca(0x300)](_0x2725ca(0x328)[_0x2725ca(0x201)](_0x1f5278)),console[_0x2725ca(0x300)](_0x518d2b);else{function _0x52ae1b(){const _0x3a56d3=_0x2725ca,_0x3c295c=this[_0x3a56d3(0x1cc)]()?this['actor']()[_0x3a56d3(0x21e)]:this['enemy']()[_0x3a56d3(0x21e)];if(_0x3c295c['match'](_0x3b22a6[_0x3a56d3(0x1fb)][_0x3a56d3(0x323)]))return![];else{if(_0x3c295c[_0x3a56d3(0x2ef)](_0x19e434[_0x3a56d3(0x1fb)]['aiMevTgr']))return this[_0x3a56d3(0x29b)]()>0x0;}}}}return!![];}}else{if(_0x1f5278['match'](/(\d+\.?\d*)([%％]) CHANCE/i)){if(_0x2725ca(0x1f2)===_0x2725ca(0x1f2)){const _0x4c1e5e=Number(RegExp['$1'])*0.01;return Math['random']()<_0x4c1e5e;}else{function _0x442221(){const _0x2f0d5a=_0x2725ca;return _0x1d8ff1[_0x2f0d5a(0x20f)];}}}else{if(_0x1f5278['match'](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x2efcac=Number(RegExp['$1']),_0x909f0=String(RegExp['$2'])[_0x2725ca(0x297)](),_0xd45ac7=_0x909f0[_0x2725ca(0x2ef)](/ON|TRUE/i);return $gameSwitches[_0x2725ca(0x1d2)](_0x2efcac)===_0xd45ac7;}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) IS ACTOR/i)){const _0x4a7a9b=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return _0x4a7a9b[_0x2725ca(0x1cc)]();}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) IS ENEMY/i)){if(_0x2725ca(0x199)!==_0x2725ca(0x199)){function _0x3f031f(){const _0xf58266=_0x2725ca,_0x270756=_0x4b752a(_0x339bca['$1']);_0x270756!==_0x41c05f[_0x536902][_0xf58266(0x1c1)]&&(_0x474fa5(_0xf58266(0x1c9)[_0xf58266(0x201)](_0x54005c,_0x270756)),_0x306892[_0xf58266(0x280)]());}}else{const _0x8a52f3=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return _0x8a52f3[_0x2725ca(0x1f4)]();}}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) HAS STATE (\d+)/i)){if(_0x2725ca(0x1da)!==_0x2725ca(0x220)){const _0x36731c=$dataStates[Number(RegExp['$2'])],_0x12ce39=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return _0x12ce39['states']()['includes'](_0x36731c);}else{function _0x209025(){const _0x51580a=_0x2725ca;_0x39a9b3[_0x51580a(0x259)][_0x51580a(0x288)][_0x51580a(0x316)](this);}}}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) HAS STATE (.*)/i)){const _0x491901=$dataStates[DataManager[_0x2725ca(0x258)](RegExp['$2'])],_0x30d9d5=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return _0x30d9d5['states']()['includes'](_0x491901);}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) NOT STATE (\d+)/i)){const _0x3b0b75=$dataStates[Number(RegExp['$2'])],_0x550e61=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return!_0x550e61['states']()[_0x2725ca(0x1df)](_0x3b0b75);}else{if(_0x1f5278['match'](/(.*) NOT STATE (.*)/i)){const _0x17b3c6=$dataStates[DataManager['getStateIdWithName'](RegExp['$2'])],_0x11173c=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f;return!_0x11173c[_0x2725ca(0x2a5)]()[_0x2725ca(0x1df)](_0x17b3c6);}else{if(_0x1f5278['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x2b0b2b=_0x2ad08f[_0x2725ca(0x20e)](String(RegExp['$2'])[_0x2725ca(0x195)]()[_0x2725ca(0x311)]()),_0x4f9f4a=String(RegExp['$3'])[_0x2725ca(0x297)]()[_0x2725ca(0x311)](),_0x7dea11=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f,_0x15005b='is%1Affected'[_0x2725ca(0x201)](_0x4f9f4a['charAt'](0x0)[_0x2725ca(0x195)]()+_0x4f9f4a[_0x2725ca(0x277)](0x1));return _0x7dea11[_0x15005b](_0x2b0b2b);}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){if('niWgy'!==_0x2725ca(0x1dd)){function _0x360f03(){return _0xe7bf42[_0x557152(_0x4e5296['$1'])];}}else{const _0x389a8e=_0x2ad08f[_0x2725ca(0x20e)](String(RegExp['$2'])['toUpperCase']()[_0x2725ca(0x311)]()),_0x4bdfae=String(RegExp['$3'])[_0x2725ca(0x297)]()[_0x2725ca(0x311)](),_0x160a4a=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f,_0x23c73d='isMax%1Affected'[_0x2725ca(0x201)](_0x4bdfae[_0x2725ca(0x317)](0x0)[_0x2725ca(0x195)]()+_0x4bdfae[_0x2725ca(0x277)](0x1));return _0x160a4a[_0x23c73d](_0x389a8e);}}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){if(_0x2725ca(0x207)===_0x2725ca(0x219)){function _0x1f15de(){if(_0x1600da&&_0x9f3c88['mp']>_0x5f4854['mp'])_0x246894=_0x43db83;if(_0x103558&&_0x5d4b5d['mp']<_0x1f60ec['mp'])_0x1cec11=_0x1e10bc;}}else{const _0x1f3dde=_0x2ad08f[_0x2725ca(0x20e)](String(RegExp['$2'])[_0x2725ca(0x195)]()[_0x2725ca(0x311)]()),_0x57f25c=String(RegExp['$3'])[_0x2725ca(0x297)]()[_0x2725ca(0x311)](),_0x3a6b61=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f,_0x3f1606=_0x2725ca(0x32b)[_0x2725ca(0x201)](_0x57f25c[_0x2725ca(0x317)](0x0)[_0x2725ca(0x195)]()+_0x57f25c['slice'](0x1));return!_0x3a6b61[_0x3f1606](_0x1f3dde);}}else{if(_0x1f5278[_0x2725ca(0x2ef)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0xf423bf=_0x2ad08f[_0x2725ca(0x20e)](String(RegExp['$2'])[_0x2725ca(0x195)]()[_0x2725ca(0x311)]()),_0x3660d3=String(RegExp['$3'])[_0x2725ca(0x297)]()[_0x2725ca(0x311)](),_0x5bc6c6=String(RegExp['$1'])[_0x2725ca(0x2ef)](/(?:USER|SUBJECT)/i)?_0x548275:_0x942e6f,_0x190faf='isMax%1Affected'[_0x2725ca(0x201)](_0x3660d3[_0x2725ca(0x317)](0x0)[_0x2725ca(0x195)]()+_0x3660d3[_0x2725ca(0x277)](0x1));return!_0x5bc6c6[_0x190faf](_0xf423bf);}}}}}}}}}}}}}return!![];},AIManager[_0x4c6e21(0x28b)]=function(_0x4ca86b,_0x46d2b9,_0x4ac474,_0x5e10d8){const _0x46666e=_0x4c6e21,_0x267776=[_0x46666e(0x303),_0x46666e(0x1e6),'ATK','DEF',_0x46666e(0x1eb),_0x46666e(0x28a),_0x46666e(0x198),_0x46666e(0x1b6)];window[_0x46666e(0x2c7)]=_0x4ca86b,window['a']=user,window['b']=_0x46d2b9;const _0x513441=_0x5e10d8,_0x41fd61=user[_0x46666e(0x249)]();let _0x32496d=_0x5e10d8[_0x46666e(0x2ef)](/(?:USER|SUBJECT)/i)?user:_0x46d2b9;_0x5e10d8=_0x5e10d8[_0x46666e(0x30f)](/\b(\d+)([%％])/gi,(_0x5abe9b,_0x1561ee)=>Number(_0x1561ee)*0.01);if(_0x5e10d8[_0x46666e(0x2ef)](/(?:VAR|VARIABLE) (\d+)/i)){if('RlmJR'===_0x46666e(0x242))return $gameVariables['value'](Number(RegExp['$1']));else{function _0x226efa(){const _0x1ce4ed=_0x46666e;this['isSkill']()&&this[_0x1ce4ed(0x2c4)]()[_0x1ce4ed(0x2a7)]()&&(_0x16de0b['forceValidTargets'](this[_0x1ce4ed(0x2c4)](),this[_0x1ce4ed(0x304)]()),this[_0x1ce4ed(0x319)]()&&_0x1bb55c[_0x1ce4ed(0x1e1)](this[_0x1ce4ed(0x2c4)](),this['item']()));_0x2ff308[_0x1ce4ed(0x2aa)](this[_0x1ce4ed(0x2c4)](),this);const _0x366f7b=_0x268303[_0x1ce4ed(0x259)]['Game_Action_makeTargets'][_0x1ce4ed(0x316)](this);return _0x3133cc[_0x1ce4ed(0x292)](),_0x18815f[_0x1ce4ed(0x188)](),_0x366f7b;}}}if(_0x5e10d8[_0x46666e(0x2ef)](/TEAM ALIVE MEMBERS/i)){if(_0x46666e(0x257)==='WKRLD'){function _0x484091(){const _0x112fb9=_0x46666e;_0xbbf994=_0x2663e7[_0x112fb9(0x223)]()[_0x112fb9(0x1e0)]();}}else return _0x32496d[_0x46666e(0x223)]()['aliveMembers']()['length'];}if(_0x5e10d8[_0x46666e(0x2ef)](/TEAM DEAD MEMBERS/i)){if(_0x46666e(0x1c8)===_0x46666e(0x1ff)){function _0x551abf(){return _0x21beff(_0xa73a5c['$1']);}}else return _0x32496d[_0x46666e(0x223)]()['deadMembers']()[_0x46666e(0x2b2)];}if(_0x5e10d8[_0x46666e(0x2ef)](/ELEMENT (\d+) RATE/i)){const _0x42432b=Number(RegExp['$1']);return this[_0x46666e(0x25b)](_0x4ca86b,_0x46d2b9,_0x32496d,_0x42432b);}else{if(_0x5e10d8['match'](/ELEMENT (.*) RATE/i)){const _0x1d07c1=DataManager[_0x46666e(0x1a1)](String(RegExp['$1']));return this[_0x46666e(0x25b)](_0x4ca86b,_0x46d2b9,_0x32496d,_0x1d07c1);}else{if(_0x5e10d8[_0x46666e(0x2ef)](/(.*) ELEMENT RATE/i)){if(_0x46666e(0x2f6)!=='pmuCI'){function _0x142eee(){_0x2dabad['hasElementAIKnowledge'](_0x2b16e3,this)&&(_0x5dadac*=this['elementRate'](_0x20cfbd)*_0x2579df['elementInfluenceRate']);}}else{const _0x49f1d7=DataManager['getElementIdWithName'](String(RegExp['$1']));return this[_0x46666e(0x25b)](_0x4ca86b,_0x46d2b9,_0x32496d,_0x49f1d7);}}}}if(_0x5e10d8[_0x46666e(0x2ef)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0xa82377=_0x267776[_0x46666e(0x20e)](String(RegExp['$1'])[_0x46666e(0x195)]()['trim']()),_0x458eec=String(RegExp['$2'])[_0x46666e(0x297)]()[_0x46666e(0x311)]();return _0x32496d[_0x46666e(0x1ea)](_0xa82377)*(_0x458eec==='buff'?0x1:-0x1);}if(_0x5e10d8['match'](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){if(_0x46666e(0x32a)!==_0x46666e(0x252)){const _0x5e3d4a=_0x267776[_0x46666e(0x20e)](String(RegExp['$1'])[_0x46666e(0x195)]()[_0x46666e(0x311)]()),_0x324080=String(RegExp['$2'])[_0x46666e(0x297)]()[_0x46666e(0x311)]();if(_0x324080==='buff'&&_0x32496d['isBuffAffected'](_0x5e3d4a)){if(_0x46666e(0x1f8)!==_0x46666e(0x1f8)){function _0xc35101(){const _0x78787f=_0x46666e;this[_0x78787f(0x2eb)]()[_0x2b1dd3]=this['aiKnowledge']()[_0x33972f]||[];const _0x17fba1=_0x25be1d[_0x78787f(0x1cc)]()?_0x489f75['actorId']():_0x1c300e['enemyId']();!this[_0x78787f(0x2eb)]()[_0x4929c0]['includes'](_0x17fba1)&&this[_0x78787f(0x2eb)]()[_0x3a85ae]['push'](_0x17fba1);}}else return _0x32496d[_0x46666e(0x20b)][_0x5e3d4a];}else{if(_0x324080===_0x46666e(0x1a0)&&_0x32496d['isDebuffAffected'](_0x5e3d4a))return _0x32496d[_0x46666e(0x20b)][_0x5e3d4a];}return 0x0;}else{function _0x2d65f4(){const _0x449b3f=_0x46666e;return _0x174534[_0x449b3f(0x2f7)];}}}if(_0x5e10d8[_0x46666e(0x2ef)](/STATE (\d+) (?:TURN|TURNS)/i)){if(_0x46666e(0x31a)===_0x46666e(0x31a)){const _0x28e7f6=Number(RegExp['$1']);if(_0x32496d[_0x46666e(0x218)](_0x28e7f6)){if(_0x46666e(0x19e)===_0x46666e(0x19e)){const _0xc77224=$dataStates[_0x28e7f6];if(_0xc77224&&_0xc77224[_0x46666e(0x214)]===0x0)return Number['MAX_SAFE_INTEGER'];else{if(_0x46666e(0x24c)!==_0x46666e(0x24c)){function _0x11c6ff(){const _0x3bbdef=_0x46666e;_0xd099bb=this[_0x3bbdef(0x309)][0x0];for(const _0x345287 of this[_0x3bbdef(0x309)]){if(_0xcaa51e&&_0x345287[_0x3bbdef(0x236)]()>_0x109cc2[_0x3bbdef(0x236)]())_0x409c17=_0x345287;if(_0x54be60&&_0x345287['mpRate']()<_0x3b9472[_0x3bbdef(0x236)]())_0x110076=_0x345287;}return _0x54fe1f;}}else return _0x32496d[_0x46666e(0x197)][_0x28e7f6]||0x0;}}else{function _0x5dbee4(){const _0x4fee60=_0x46666e;if(_0x470b80&&_0xaa91af[_0x4fee60(0x236)]()>_0x1524d8[_0x4fee60(0x236)]())_0x1a0d4d=_0x8d1839;if(_0x35c998&&_0x18fe5f[_0x4fee60(0x236)]()<_0x323465[_0x4fee60(0x236)]())_0x2473ce=_0x4cd82f;}}}else return _0x32496d[_0x46666e(0x2a5)]()[_0x46666e(0x1df)]($dataStates[_0x28e7f6])?Number[_0x46666e(0x20f)]:0x0;}else{function _0x38a6b2(){const _0x52c236=_0x1dc21b[_0x279b63(_0x1e8f05['$2'])],_0x5cfc3b=_0xdb08e7(_0x55cff9['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x26a6b7:_0xa021d1;return!_0x5cfc3b['states']()['includes'](_0x52c236);}}}else{if(_0x5e10d8[_0x46666e(0x2ef)](/STATE (.*) (?:TURN|TURNS)/i)){const _0x2b59e2=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x32496d[_0x46666e(0x218)](_0x2b59e2)){const _0x42c2ef=$dataStates[_0x2b59e2];if(_0x42c2ef&&_0x42c2ef['autoRemovalTiming']===0x0){if(_0x46666e(0x1d1)===_0x46666e(0x1d1))return Number[_0x46666e(0x20f)];else{function _0x87222f(){const _0x50357a=_0x46666e;let _0x1e9700=_0x349497['makeValidTargets'](_0x3109cf,_0x4cacd4);_0x59fedf=_0x39d0d8[_0x50357a(0x2d1)](_0x185203=>_0x1e9700['includes'](_0x185203));}}}else{if('hQJyq'!==_0x46666e(0x2c9))return _0x32496d[_0x46666e(0x197)][_0x2b59e2]||0x0;else{function _0x13a57a(){const _0x5db7d8=_0x46666e,_0x49e43f=_0x4d2226[_0x5db7d8(0x1a1)](_0x314785(_0xe8db11['$1']));return this[_0x5db7d8(0x25b)](_0x1442d4,_0x36f953,_0x53aa1c,_0x49e43f);}}}}else{if(_0x32496d[_0x46666e(0x2a5)]()[_0x46666e(0x1df)]($dataStates[_0x2b59e2])){if(_0x46666e(0x314)===_0x46666e(0x314))return Number[_0x46666e(0x20f)];else{function _0x1f55bb(){const _0x26d32d=_0x46666e;return this[_0x26d32d(0x309)]=this[_0x26d32d(0x309)]||[],this[_0x26d32d(0x309)];}}}else return 0x0;}}}if(_0x5e10d8[_0x46666e(0x2ef)](/\bHP([%％])/i)){if(_0x46666e(0x2ad)!==_0x46666e(0x2ea))return _0x32496d[_0x46666e(0x1de)]();else{function _0x1d936f(){const _0x4cb5c6=_0x46666e;this[_0x4cb5c6(0x309)]=[_0x5f27d3];}}}else{if(_0x5e10d8[_0x46666e(0x2ef)](/\bMP([%％])/i))return _0x32496d[_0x46666e(0x236)]();else{if(_0x5e10d8[_0x46666e(0x2ef)](/\bTP([%％])/i))return _0x32496d[_0x46666e(0x2d7)]();else{if(_0x5e10d8[_0x46666e(0x2ef)](/\b(?:MAXHP|MAX HP|MHP)\b/i)){if(_0x46666e(0x2e9)==='vribZ'){function _0x58679d(){const _0xac8e52=_0x46666e;return this[_0xac8e52(0x29f)](_0x417d1a,_0x253403,_0x4a6c02,_0x2212df)&&this[_0xac8e52(0x318)](_0x34d380,_0x3d1988,_0x137d15,_0x1a34bf);}}else return _0x32496d[_0x46666e(0x2f7)];}else{if(_0x5e10d8[_0x46666e(0x2ef)](/\b(?:MAXMP|MAX MP|MMP)\b/i)){if(_0x46666e(0x278)!==_0x46666e(0x278)){function _0x321927(){const _0x52f080=_0x46666e;_0x1fbb7f('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x52f080(0x201)](_0x2af1a8,_0x527996,_0x312278)),_0x1ab125[_0x52f080(0x280)]();}}else return _0x32496d['mmp'];}else{if(_0x5e10d8[_0x46666e(0x2ef)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x32496d[_0x46666e(0x2c6)]();}}}}}if(_0x5e10d8[_0x46666e(0x2ef)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i)){if(_0x46666e(0x24b)==='YhLuO')return _0x32496d[String(RegExp['$1'])[_0x46666e(0x297)]()[_0x46666e(0x311)]()];else{function _0xe5af27(){const _0x3f0fdf=_0x46666e;return _0x148e99(_0x108e3b['$1'])['toLowerCase']()[_0x3f0fdf(0x311)]();}}}try{return eval(_0x5e10d8);}catch(_0x486989){if(_0x46666e(0x25c)===_0x46666e(0x18c)){function _0x584e15(){return _0x122f8f;}}else return $gameTemp[_0x46666e(0x235)]()&&(console[_0x46666e(0x300)](_0x46666e(0x18e)[_0x46666e(0x201)](_0x513441)),console[_0x46666e(0x300)](_0x486989)),0x0;}},AIManager[_0x4c6e21(0x25b)]=function(_0x47b0a7,_0x1b4f5a,_0x296109,_0x59ad7e){const _0x255891=_0x4c6e21;if(_0x47b0a7['isActor']()===_0x296109[_0x255891(0x1cc)]()){if(_0x255891(0x2d5)===_0x255891(0x2d5))return _0x296109[_0x255891(0x2b5)](_0x59ad7e);else{function _0x187029(){const _0x3724e1=_0x255891,_0x313882=_0x1f2e80[_0x3724e1(0x20e)](_0x4c532b(_0x4d43f5['$1'])[_0x3724e1(0x195)]()[_0x3724e1(0x311)]()),_0x8014f8=_0x195d2d(_0x24895e['$2'])[_0x3724e1(0x297)]()[_0x3724e1(0x311)]();return _0x5570a5['buff'](_0x313882)*(_0x8014f8===_0x3724e1(0x1ea)?0x1:-0x1);}}}else{if(_0x296109['opponentsUnit']()[_0x255891(0x27d)](_0x59ad7e,_0x296109)){if(_0x255891(0x27a)!==_0x255891(0x27a)){function _0x28741e(){const _0x8d2e8e=_0x255891,_0x1c46e6=this[_0x8d2e8e(0x251)]()['note'];if(_0x1c46e6['match'](_0xcafdc0[_0x8d2e8e(0x1fb)][_0x8d2e8e(0x266)]))return _0x44d416(_0x40ee03['$1'])[_0x8d2e8e(0x297)]()[_0x8d2e8e(0x311)]();return _0x373cdf[_0x8d2e8e(0x259)][_0x8d2e8e(0x192)][_0x8d2e8e(0x232)]['EnemyStyleAI'];}}else return _0x296109[_0x255891(0x2b5)](_0x59ad7e);}else{if('FipBh'===_0x255891(0x31d)){function _0x55b033(){const _0x499438=_0x255891;if(_0x47a664&&_0x471bde[_0x499438(0x2d7)]()>_0x2b5d3d[_0x499438(0x2d7)]())_0x3ddacc=_0x526b10;if(_0x12129d&&_0x163035[_0x499438(0x2d7)]()<_0x284da8['tpRate']())_0x5701cd=_0x2e7947;}}else return VisuMZ[_0x255891(0x259)]['Settings'][_0x255891(0x232)][_0x255891(0x305)];}}},AIManager[_0x4c6e21(0x1e1)]=function(_0x12fbc5,_0x41d2c3){const _0x36915d=_0x4c6e21;if(!_0x41d2c3)return;if(!_0x41d2c3['note']['match'](AIManager[_0x36915d(0x1fb)][_0x36915d(0x1ef)]))return;const _0x56e2f0=String(RegExp['$1'])['toUpperCase']()[_0x36915d(0x311)]();let _0x57666c=this[_0x36915d(0x2c1)](_0x12fbc5,_0x56e2f0);if(_0x57666c){if('umqKz'!=='tNkbL')this[_0x36915d(0x309)]=[_0x57666c];else{function _0x405dee(){const _0x298043=_0x36915d;if(_0x9296a8&&_0x4b880c[_0x298043(0x2a5)]()[_0x298043(0x2b2)]>_0x2ec1e1[_0x298043(0x2a5)]()[_0x298043(0x2b2)])_0x43c4fe=_0x47456e;if(_0x52331a&&_0x112963[_0x298043(0x2a5)]()[_0x298043(0x2b2)]<_0x4fbf68[_0x298043(0x2a5)]()['length'])_0x20decb=_0x325d56;}}}},AIManager['createFilterTarget']=function(_0x514491,_0x1ab982){const _0x434053=_0x4c6e21,_0xc87651=[_0x434053(0x303),_0x434053(0x1e6),_0x434053(0x222),'DEF',_0x434053(0x1eb),_0x434053(0x28a),_0x434053(0x198),_0x434053(0x1b6)],_0x46a7a0=[_0x434053(0x1e8),_0x434053(0x296),_0x434053(0x1cb),_0x434053(0x23e),'MEV',_0x434053(0x1b9),_0x434053(0x2cf),_0x434053(0x1b3),'MRG','TRG'],_0x2d00ee=[_0x434053(0x243),_0x434053(0x1d4),_0x434053(0x23a),_0x434053(0x21d),_0x434053(0x234),'TCR',_0x434053(0x2ec),_0x434053(0x22a),_0x434053(0x273),'EXR'];let _0xee34d8=null;if(_0x1ab982==='USER'){if(this[_0x434053(0x309)][_0x434053(0x1df)](_0x514491)){if('BnJMU'===_0x434053(0x1e7)){function _0x51969d(){const _0x3da330=_0x434053;_0x44ee56[_0x3da330(0x1f6)]['determineNewValidAIAction']['call'](this);if(this[_0x3da330(0x28f)]()>0x0){const _0x283437=this['enemy']()['actions'][_0x3da330(0x2d1)](_0x1f2d59=>this[_0x3da330(0x244)](_0x1f2d59));_0x283437[_0x3da330(0x2b2)]>0x0&&this['selectAllActions'](_0x283437);}}}else return _0x514491;}}else{if(_0x1ab982===_0x434053(0x225))return this[_0x434053(0x309)][0x0];else{if(_0x1ab982===_0x434053(0x279))return this['_forceValidTargets'][this[_0x434053(0x309)][_0x434053(0x2b2)]-0x1];else{if(_0x1ab982['match'](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x3e26fd=String(RegExp['$1'])[_0x434053(0x195)]()[_0x434053(0x311)]()==='highest',_0xb49e0e=!_0x3e26fd,_0x57118d=String(RegExp['$2'])[_0x434053(0x195)]()[_0x434053(0x311)]();if(_0xc87651[_0x434053(0x1df)](_0x57118d)){const _0x53c27c=_0xc87651[_0x434053(0x20e)](_0x57118d);_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x284eb5 of this[_0x434053(0x309)]){if(_0x434053(0x19d)!=='xjjog'){if(_0x3e26fd&&_0x284eb5[_0x434053(0x2e5)](_0x53c27c)>_0xee34d8[_0x434053(0x2e5)](_0x53c27c))_0xee34d8=_0x284eb5;if(_0xb49e0e&&_0x284eb5[_0x434053(0x2e5)](_0x53c27c)<_0xee34d8[_0x434053(0x2e5)](_0x53c27c))_0xee34d8=_0x284eb5;}else{function _0x543571(){const _0x324cde=_0x434053;return _0x46379d[_0x324cde(0x1f6)][_0x324cde(0x26c)][_0x324cde(0x316)](this,_0x16376c);}}}return _0xee34d8;}if(_0x46a7a0[_0x434053(0x1df)](_0x57118d)){if(_0x434053(0x229)===_0x434053(0x308)){function _0x31774b(){const _0x512df0=_0x434053;return this[_0x512df0(0x309)][this[_0x512df0(0x309)]['length']-0x1];}}else{const _0x307d8c=_0x46a7a0[_0x434053(0x20e)](_0x57118d);_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x4c7280 of this[_0x434053(0x309)]){if(_0x3e26fd&&_0x4c7280[_0x434053(0x2fd)](_0x307d8c)>_0xee34d8[_0x434053(0x2fd)](_0x307d8c))_0xee34d8=_0x4c7280;if(_0xb49e0e&&_0x4c7280[_0x434053(0x2fd)](_0x307d8c)<_0xee34d8[_0x434053(0x2fd)](_0x307d8c))_0xee34d8=_0x4c7280;}return _0xee34d8;}}if(_0x2d00ee[_0x434053(0x1df)](_0x57118d)){const _0x31baa4=_0x2d00ee[_0x434053(0x20e)](_0x57118d);_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x45dd11 of this[_0x434053(0x309)]){if(_0x434053(0x2e0)===_0x434053(0x1d0)){function _0x93f53e(){const _0x2e3451=_0x434053;if(!_0x43eb90)return![];if(!_0x165b4c)return![];if(!_0x5e1ab4[_0x2e3451(0x2e4)](_0x35be9c))return;return this[_0x2e3451(0x2a2)](_0x50daa4)?this[_0x2e3451(0x29c)](_0x5ea40b,_0xa895bb)[_0x2e3451(0x2b2)]>=0x1:!![];}}else{if(_0x3e26fd&&_0x45dd11[_0x434053(0x263)](_0x31baa4)>_0xee34d8[_0x434053(0x263)](_0x31baa4))_0xee34d8=_0x45dd11;if(_0xb49e0e&&_0x45dd11['sparam'](_0x31baa4)<_0xee34d8[_0x434053(0x263)](_0x31baa4))_0xee34d8=_0x45dd11;}}return _0xee34d8;}if(_0x57118d==='HP'){_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x2d440c of this['_forceValidTargets']){if(_0x3e26fd&&_0x2d440c['hp']>_0xee34d8['hp'])_0xee34d8=_0x2d440c;if(_0xb49e0e&&_0x2d440c['hp']<_0xee34d8['hp'])_0xee34d8=_0x2d440c;}return _0xee34d8;}if(_0x57118d===_0x434053(0x1c3)){if(_0x434053(0x2db)==='FaAAx'){_0xee34d8=this['_forceValidTargets'][0x0];for(const _0x4354d9 of this[_0x434053(0x309)]){if(_0x3e26fd&&_0x4354d9[_0x434053(0x1de)]()>_0xee34d8[_0x434053(0x1de)]())_0xee34d8=_0x4354d9;if(_0xb49e0e&&_0x4354d9['hpRate']()<_0xee34d8[_0x434053(0x1de)]())_0xee34d8=_0x4354d9;}return _0xee34d8;}else{function _0x212794(){const _0x53812d=_0x434053,_0x38dc7f=_0x4efb2b(_0x1dda99['$1'])[_0x53812d(0x2ef)](/(?:USER|SUBJECT)/i)?_0x2cd0e4:_0x49e535;return _0x38dc7f[_0x53812d(0x1cc)]();}}}if(_0x57118d==='MP'){if(_0x434053(0x1ce)!==_0x434053(0x1ce)){function _0x382b6f(){const _0xec383b=_0x434053;if(!_0x45e505[_0xec383b(0x259)][_0xec383b(0x192)][_0xec383b(0x232)]['LearnKnowledge'])return!![];const _0x240936=_0x49d3c3[_0xec383b(0x2ef)](/EVA/i)?_0xec383b(0x2bc):_0xec383b(0x256);this[_0xec383b(0x2eb)]()[_0x240936]=this['aiKnowledge']()[_0x240936]||[];const _0x29b57c=_0x98c0ca['isActor']()?_0x10d2f2['actorId']():_0x3fbaaf['enemyId']();return this[_0xec383b(0x2eb)]()[_0x240936][_0xec383b(0x1df)](_0x29b57c);}}else{_0xee34d8=this['_forceValidTargets'][0x0];for(const _0x5caf18 of this[_0x434053(0x309)]){if('hHYMp'===_0x434053(0x245)){function _0xa328d7(){const _0x2e5657=_0x434053;_0x1833a6=_0x2da47b[_0x2e5657(0x1a4)](_0x34a9ae['random']()*(_0xec9aed+0x1)),_0x3e78b5=_0x196bf9[_0x42cf8e],_0x568eae[_0x4bd652]=_0x596213[_0x82d3db],_0x47f84a[_0x4b830c]=_0x3cd258;}}else{if(_0x3e26fd&&_0x5caf18['mp']>_0xee34d8['mp'])_0xee34d8=_0x5caf18;if(_0xb49e0e&&_0x5caf18['mp']<_0xee34d8['mp'])_0xee34d8=_0x5caf18;}}return _0xee34d8;}}if(_0x57118d===_0x434053(0x313)){_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x3edb60 of this[_0x434053(0x309)]){if(_0x434053(0x274)===_0x434053(0x30b)){function _0x42ec85(){const _0x4490ad=_0x434053;return _0x4a84bb[_0x4490ad(0x1f6)]['meetsTurnCondition'][_0x4490ad(0x316)](this,_0x17d88a,_0x140fa2);}}else{if(_0x3e26fd&&_0x3edb60[_0x434053(0x236)]()>_0xee34d8['mpRate']())_0xee34d8=_0x3edb60;if(_0xb49e0e&&_0x3edb60[_0x434053(0x236)]()<_0xee34d8[_0x434053(0x236)]())_0xee34d8=_0x3edb60;}}return _0xee34d8;}if(_0x57118d==='TP'){_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x5e16ec of this[_0x434053(0x309)]){if('lSdbg'!==_0x434053(0x204)){if(_0x3e26fd&&_0x5e16ec['tp']>_0xee34d8['tp'])_0xee34d8=_0x5e16ec;if(_0xb49e0e&&_0x5e16ec['tp']<_0xee34d8['tp'])_0xee34d8=_0x5e16ec;}else{function _0x52f5a9(){return null;}}}return _0xee34d8;}if(_0x57118d===_0x434053(0x265)){if(_0x434053(0x1f7)!==_0x434053(0x1f7)){function _0x5a5104(){const _0x137da9=_0x434053;return _0x555dce[_0x137da9(0x1f6)][_0x137da9(0x284)][_0x137da9(0x316)](this,_0x327e9e);}}else{_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x151048 of this[_0x434053(0x309)]){if(_0x3e26fd&&_0x151048[_0x434053(0x2d7)]()>_0xee34d8['tpRate']())_0xee34d8=_0x151048;if(_0xb49e0e&&_0x151048[_0x434053(0x2d7)]()<_0xee34d8['tpRate']())_0xee34d8=_0x151048;}return _0xee34d8;}}if(_0x57118d===_0x434053(0x264)){if(_0x434053(0x2bf)!==_0x434053(0x2bf)){function _0x214cc6(){const _0x38080b=_0x434053;for(const _0x47c215 of _0x149abc[_0x38080b(0x326)]){_0x4f6b31[_0x38080b(0x27d)](_0x47c215,this)&&(_0x23dc15*=this['elementRate'](_0x47c215)*_0x40b074[_0x38080b(0x24f)]);}}}else{_0xee34d8=this['_forceValidTargets'][0x0];for(const _0x5ef255 of this['_forceValidTargets']){if(_0x3e26fd&&_0x5ef255[_0x434053(0x2c6)]()>_0xee34d8[_0x434053(0x2c6)]())_0xee34d8=_0x5ef255;if(_0xb49e0e&&_0x5ef255[_0x434053(0x2c6)]()<_0xee34d8[_0x434053(0x2c6)]())_0xee34d8=_0x5ef255;}return _0xee34d8;}}if(_0x57118d===_0x434053(0x19a)){_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x1873f4 of this['_forceValidTargets']){if(_0x3e26fd&&(_0x1873f4[_0x434053(0x1be)]||0x0)>(_0xee34d8[_0x434053(0x1be)]||0x0))_0xee34d8=_0x1873f4;if(_0xb49e0e&&(_0x1873f4[_0x434053(0x1be)]||0x0)<(_0xee34d8[_0x434053(0x1be)]||0x0))_0xee34d8=_0x1873f4;}return _0xee34d8;}if(_0x57118d==='STATE\x20COUNT'&&Imported[_0x434053(0x2de)]){if(_0x434053(0x212)===_0x434053(0x212)){_0xee34d8=this[_0x434053(0x309)][0x0];for(const _0x4d6a19 of this[_0x434053(0x309)]){if(_0x3e26fd&&_0x4d6a19[_0x434053(0x2a5)]()['length']>_0xee34d8[_0x434053(0x2a5)]()['length'])_0xee34d8=_0x4d6a19;if(_0xb49e0e&&_0x4d6a19[_0x434053(0x2a5)]()[_0x434053(0x2b2)]<_0xee34d8[_0x434053(0x2a5)]()['length'])_0xee34d8=_0x4d6a19;}return _0xee34d8;}else{function _0x5971b0(){const _0x43b7be=_0x434053;return this[_0x43b7be(0x29c)](_0x37b502,_0x4d6f4f)['length']>=0x1;}}}if(_0x57118d===_0x434053(0x28e)&&Imported['VisuMZ_1_SkillsStatesCore']){if('WbQgC'!==_0x434053(0x294)){function _0x4ec66f(){const _0x1c8beb=_0x434053;let _0x5ef8cd=_0x120966[_0x1c8beb(0x190)](_0x2a62fe);for(const _0x10be60 of _0x5060b3){_0x5ef8cd-=_0x10be60['rating']-_0x336048;if(_0x5ef8cd<=0x0)return _0x10be60;}}}else{_0xee34d8=this[_0x434053(0x309)][0x0];const _0x22d807=_0x434053(0x2dd);for(const _0x458b3a of this['_forceValidTargets']){if(_0x434053(0x2da)!==_0x434053(0x2da)){function _0x5da7c0(){const _0x18475b=_0x434053;return _0x4f5f04[_0x18475b(0x20b)][_0x5041b6];}}else{if(_0x3e26fd&&_0x458b3a[_0x434053(0x2d9)](_0x22d807)[_0x434053(0x2b2)]>_0xee34d8[_0x434053(0x2d9)](_0x22d807)[_0x434053(0x2b2)])_0xee34d8=_0x458b3a;if(_0xb49e0e&&_0x458b3a[_0x434053(0x2d9)](_0x22d807)[_0x434053(0x2b2)]<_0xee34d8[_0x434053(0x2d9)](_0x22d807)[_0x434053(0x2b2)])_0xee34d8=_0x458b3a;}}return _0xee34d8;}}if(_0x57118d==='NEGATIVE\x20STATE\x20COUNT'&&Imported['VisuMZ_1_SkillsStatesCore']){_0xee34d8=this['_forceValidTargets'][0x0];const _0x403be8=_0x434053(0x2a0);for(const _0x70197d of this[_0x434053(0x309)]){if(_0x3e26fd&&_0x70197d[_0x434053(0x2d9)](_0x403be8)[_0x434053(0x2b2)]>_0xee34d8[_0x434053(0x2d9)](_0x403be8)[_0x434053(0x2b2)])_0xee34d8=_0x70197d;if(_0xb49e0e&&_0x70197d[_0x434053(0x2d9)](_0x403be8)[_0x434053(0x2b2)]<_0xee34d8[_0x434053(0x2d9)](_0x403be8)[_0x434053(0x2b2)])_0xee34d8=_0x70197d;}return _0xee34d8;}}}}}return null;},DataManager[_0x4c6e21(0x1a1)]=function(_0xc0a0a9){const _0x547a14=_0x4c6e21;_0xc0a0a9=_0xc0a0a9[_0x547a14(0x195)]()[_0x547a14(0x311)](),this['_elementIDs']=this[_0x547a14(0x295)]||{};if(this['_elementIDs'][_0xc0a0a9])return this['_elementIDs'][_0xc0a0a9];let _0x574997=0x1;for(const _0x3ab60d of $dataSystem[_0x547a14(0x29e)]){if(!_0x3ab60d)continue;let _0x2adbaf=_0x3ab60d[_0x547a14(0x195)]();_0x2adbaf=_0x2adbaf[_0x547a14(0x30f)](/\x1I\[(\d+)\]/gi,''),_0x2adbaf=_0x2adbaf[_0x547a14(0x30f)](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x2adbaf]=_0x574997,_0x574997++;}return this[_0x547a14(0x295)][_0xc0a0a9]||0x0;},DataManager[_0x4c6e21(0x258)]=function(_0xba7772){const _0x54c3c2=_0x4c6e21;_0xba7772=_0xba7772[_0x54c3c2(0x195)]()[_0x54c3c2(0x311)](),this[_0x54c3c2(0x30e)]=this['_stateIDs']||{};if(this[_0x54c3c2(0x30e)][_0xba7772])return this['_stateIDs'][_0xba7772];for(const _0x1e6567 of $dataStates){if(_0x54c3c2(0x1b2)==='cxjgR'){if(!_0x1e6567)continue;this[_0x54c3c2(0x30e)][_0x1e6567[_0x54c3c2(0x321)]['toUpperCase']()['trim']()]=_0x1e6567['id'];}else{function _0x33784f(){const _0x3c1f40=_0x54c3c2;if(this[_0x3c1f40(0x1cc)]()||this[_0x3c1f40(0x1f4)]()){const _0x33d8e1=this[_0x3c1f40(0x1cc)]()?this[_0x3c1f40(0x31c)]()['note']:this[_0x3c1f40(0x251)]()[_0x3c1f40(0x21e)];if(_0x33d8e1['match'](_0x2ea75d[_0x3c1f40(0x1fb)]['bypassElementTgr']))return![];else{if(_0x33d8e1[_0x3c1f40(0x2ef)](_0x27305a[_0x3c1f40(0x1fb)][_0x3c1f40(0x271)]))return this[_0x3c1f40(0x310)]()>0x0;}}return _0xada86[_0x3c1f40(0x259)][_0x3c1f40(0x192)]['Weight'][_0x3c1f40(0x26b)];}}}return this['_stateIDs'][_0xba7772]||0x0;},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x1b4)]=BattleManager[_0x4c6e21(0x22f)],BattleManager[_0x4c6e21(0x22f)]=function(){const _0x316dd5=_0x4c6e21;this['determineActionByAIisStillValid'](),VisuMZ[_0x316dd5(0x259)][_0x316dd5(0x1b4)]['call'](this);},BattleManager[_0x4c6e21(0x1ee)]=function(){const _0x5d3e82=_0x4c6e21,_0x207526=this[_0x5d3e82(0x1a9)];if(_0x207526[_0x5d3e82(0x266)]()==='random')return;if(!_0x207526[_0x5d3e82(0x2a7)]())return;const _0x253cc8=_0x207526[_0x5d3e82(0x200)](),_0x25c099=_0x253cc8[_0x5d3e82(0x304)]();if(_0x253cc8['_bypassAiValidCheck'])return;if(AIManager[_0x5d3e82(0x18d)](_0x207526,_0x25c099))return;_0x207526[_0x5d3e82(0x2fb)]();},VisuMZ[_0x4c6e21(0x259)]['Game_Temp_initialize']=Game_Temp[_0x4c6e21(0x1f6)]['initialize'],Game_Temp[_0x4c6e21(0x1f6)][_0x4c6e21(0x21c)]=function(){const _0x17cad4=_0x4c6e21;VisuMZ['BattleAI'][_0x17cad4(0x24e)][_0x17cad4(0x316)](this),this[_0x17cad4(0x292)]();},Game_Temp['prototype'][_0x4c6e21(0x292)]=function(){const _0x1d7731=_0x4c6e21;this[_0x1d7731(0x2b9)]={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp[_0x4c6e21(0x1f6)][_0x4c6e21(0x272)]=function(){const _0xade2c4=_0x4c6e21;if(this[_0xade2c4(0x2b9)]===undefined)this['clearAiTgrInfluence']();return this[_0xade2c4(0x2b9)];},Game_Temp[_0x4c6e21(0x1f6)][_0x4c6e21(0x2aa)]=function(_0x4ff9df,_0x565fba){const _0x457b71=_0x4c6e21;this[_0x457b71(0x292)]();const _0x565df2=this['aiTgrInfluence']();_0x565df2[_0x457b71(0x1e4)]=_0x565fba;if(_0x4ff9df[_0x457b71(0x2e6)]()){_0x565df2[_0x457b71(0x1bd)]=!![],_0x565df2[_0x457b71(0x24f)]=_0x4ff9df[_0x457b71(0x310)](),_0x565df2[_0x457b71(0x326)]=[];if(Imported[_0x457b71(0x2ab)]){if('ovgfA'!==_0x457b71(0x2b6)){function _0x4d8911(){return this['aiApplyMevTgrInfluenceRate']()>0x0;}}else _0x565df2[_0x457b71(0x326)]=_0x565df2[_0x457b71(0x326)][_0x457b71(0x18b)](_0x565fba[_0x457b71(0x29e)]());}else _0x565fba[_0x457b71(0x304)]()[_0x457b71(0x26f)][_0x457b71(0x2f3)]<0x0?_0x565df2['elementIds']=_0x565df2[_0x457b71(0x326)][_0x457b71(0x18b)](_0x4ff9df[_0x457b71(0x27f)]()):_0x565df2[_0x457b71(0x326)][_0x457b71(0x228)](_0x565fba[_0x457b71(0x304)]()[_0x457b71(0x26f)]['elementId']);}_0x565fba[_0x457b71(0x20a)]()&&_0x4ff9df[_0x457b71(0x2a9)]()&&(_0x565df2[_0x457b71(0x1f3)]=_0x4ff9df[_0x457b71(0x20d)]());if(_0x565fba[_0x457b71(0x24a)]()&&_0x4ff9df[_0x457b71(0x19b)]()){if(_0x457b71(0x24d)!==_0x457b71(0x24d)){function _0x226920(){const _0x1ebc58=_0x457b71,_0x37e033=this['currentClass']()[_0x1ebc58(0x21e)];if(_0x37e033[_0x1ebc58(0x2ef)](_0x3210cb[_0x1ebc58(0x1fb)][_0x1ebc58(0x266)]))return _0x1ad93e(_0x495b5e['$1'])[_0x1ebc58(0x297)]()['trim']();return _0x5d2bde[_0x1ebc58(0x259)]['Settings']['General'][_0x1ebc58(0x189)];}}else _0x565df2[_0x457b71(0x2b3)]=_0x4ff9df[_0x457b71(0x29b)]();}},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x267)]=Game_Action['prototype'][_0x4c6e21(0x1c2)],Game_Action['prototype']['makeTargets']=function(){const _0x528a47=_0x4c6e21;if(this[_0x528a47(0x2e4)]()&&this[_0x528a47(0x2c4)]()[_0x528a47(0x2a7)]()){if(_0x528a47(0x2af)===_0x528a47(0x210)){function _0x22a6b7(){const _0x20e0a5=_0x528a47,_0x2a4257=this[_0x20e0a5(0x1cc)]()?this['actor']()[_0x20e0a5(0x21e)]:this[_0x20e0a5(0x251)]()[_0x20e0a5(0x21e)];if(_0x2a4257[_0x20e0a5(0x2ef)](_0x2f40ab[_0x20e0a5(0x1fb)][_0x20e0a5(0x2e2)]))return![];else{if(_0x2a4257['match'](_0x35a704['_regexp'][_0x20e0a5(0x1a5)]))return this[_0x20e0a5(0x20d)]()>0x0;}}}else AIManager[_0x528a47(0x1ac)](this[_0x528a47(0x2c4)](),this[_0x528a47(0x304)]()),this[_0x528a47(0x319)]()&&AIManager['filterForcedTargeting'](this[_0x528a47(0x2c4)](),this['item']());}$gameTemp['setAiTgrInfluences'](this[_0x528a47(0x2c4)](),this);const _0x91f850=VisuMZ[_0x528a47(0x259)]['Game_Action_makeTargets']['call'](this);return $gameTemp['clearAiTgrInfluence'](),AIManager['clearForcedTargets'](),_0x91f850;},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x1a3)]=Game_Action[_0x4c6e21(0x1f6)][_0x4c6e21(0x30c)],Game_Action[_0x4c6e21(0x1f6)]['itemTargetCandidates']=function(){const _0x5f350d=_0x4c6e21,_0x45a16c=this[_0x5f350d(0x2c4)](),_0x3a6b7e=this[_0x5f350d(0x304)]();let _0x4aaeeb=VisuMZ[_0x5f350d(0x259)][_0x5f350d(0x1a3)][_0x5f350d(0x316)](this);if(_0x45a16c[_0x5f350d(0x2a7)]()&&AIManager[_0x5f350d(0x18d)](_0x45a16c,_0x3a6b7e)){let _0x1325df=AIManager[_0x5f350d(0x29c)](_0x45a16c,_0x3a6b7e);_0x4aaeeb=_0x4aaeeb[_0x5f350d(0x2d1)](_0x5a5384=>_0x1325df[_0x5f350d(0x1df)](_0x5a5384));}return _0x4aaeeb;},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x22b)]=Game_Action['prototype']['apply'],Game_Action[_0x4c6e21(0x1f6)][_0x4c6e21(0x2b7)]=function(_0x3d7791){const _0x4cf2f2=_0x4c6e21;VisuMZ[_0x4cf2f2(0x259)][_0x4cf2f2(0x22b)]['call'](this,_0x3d7791),this['applyBattleAI'](_0x3d7791);},Game_Action['prototype'][_0x4c6e21(0x221)]=function(_0x3eebdc){const _0x1700bb=_0x4c6e21;if(!_0x3eebdc)return;if(this[_0x1700bb(0x2c4)]()[_0x1700bb(0x1cc)]()===_0x3eebdc[_0x1700bb(0x1cc)]())return;let _0x1c1ea4=[];if(Imported[_0x1700bb(0x2ab)]){if(_0x1700bb(0x1b8)===_0x1700bb(0x1b8))_0x1c1ea4=this[_0x1700bb(0x29e)]();else{function _0x3c6b86(){const _0x4c40d1=_0x1700bb;if(!_0x22d778)return![];return this['getAllConditions'](_0x5680dd)[_0x4c40d1(0x2b2)]>0x0||this[_0x4c40d1(0x298)](_0x546149)['length']>0x0;}}}else{if(this[_0x1700bb(0x304)]()[_0x1700bb(0x26f)][_0x1700bb(0x2f3)]<0x0){if('KrNrg'!=='zIrty')_0x1c1ea4=this[_0x1700bb(0x2c4)]()[_0x1700bb(0x27f)]();else{function _0x1a9c5d(){const _0x81517e=_0x1700bb;_0xa1e7a6=this[_0x81517e(0x309)][0x0];for(const _0x174ea3 of this['_forceValidTargets']){if(_0x514080&&_0x174ea3['hp']>_0x287f9f['hp'])_0xd702c1=_0x174ea3;if(_0x168123&&_0x174ea3['hp']<_0x318056['hp'])_0x109144=_0x174ea3;}return _0x3a1199;}}}else _0x1c1ea4=[this[_0x1700bb(0x304)]()[_0x1700bb(0x26f)][_0x1700bb(0x2f3)]];}_0x3eebdc[_0x1700bb(0x260)](_0x1c1ea4,this[_0x1700bb(0x20a)](),this['isMagical']());},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x205)]=Game_BattlerBase[_0x4c6e21(0x1f6)]['sparam'],Game_BattlerBase['prototype'][_0x4c6e21(0x263)]=function(_0x44eda6){const _0x4a3a3d=_0x4c6e21;let _0x6d72de=VisuMZ['BattleAI'][_0x4a3a3d(0x205)][_0x4a3a3d(0x316)](this,_0x44eda6);return _0x44eda6===0x0&&(_0x6d72de*=this['applyBattleAiTgrInfluences']()),_0x6d72de;},Game_BattlerBase[_0x4c6e21(0x1f6)][_0x4c6e21(0x22e)]=function(){const _0x328244=_0x4c6e21,_0x267a9b=$gameTemp[_0x328244(0x272)](),_0xd1f04a=this[_0x328244(0x249)]();if(Imported[_0x328244(0x1c0)]){if(_0x267a9b[_0x328244(0x1e4)]&&_0x267a9b['action'][_0x328244(0x290)]())return 0x1;}let _0x33b77f=0x1;if(_0x267a9b['elementInfluence'])for(const _0x5b0d85 of _0x267a9b[_0x328244(0x326)]){if(_0xd1f04a[_0x328244(0x27d)](_0x5b0d85,this)){if(_0x328244(0x23b)!==_0x328244(0x23b)){function _0x5c3ea5(){const _0x1db20b=_0x328244;_0x5101f9[_0x1db20b(0x2a4)](_0x1db20b(0x2bc),this);}}else _0x33b77f*=this[_0x328244(0x2b5)](_0x5b0d85)*_0x267a9b[_0x328244(0x24f)];}}return _0xd1f04a['hasXParamAIKnowledge'](_0x328244(0x2f8),this)&&(_0x33b77f*=0x1-this['eva']*_0x267a9b['evaInfluenceRate']),_0xd1f04a[_0x328244(0x1b5)](_0x328244(0x299),this)&&(_0x33b77f*=0x1-this['mev']*_0x267a9b['mevInfluenceRate']),_0x33b77f[_0x328244(0x2ba)](0.001,0x3e8);},Game_BattlerBase[_0x4c6e21(0x1f6)][_0x4c6e21(0x266)]=function(){const _0x303c43=_0x4c6e21;return _0x303c43(0x2a8);},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x2a7)]=function(){const _0xc82a48=_0x4c6e21;if(this[_0xc82a48(0x1db)]())return![];return!![];},Game_Battler[_0x4c6e21(0x1f6)]['determineNewValidAIAction']=function(){},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x2e6)]=function(){const _0x420c1e=_0x4c6e21;if(this['isActor']()||this[_0x420c1e(0x1f4)]()){if(_0x420c1e(0x2be)!==_0x420c1e(0x2be)){function _0x44c3cb(){const _0x40f7e3=_0x420c1e;_0x3c0fed['hasForcedTargets']()&&(this[_0x40f7e3(0x1f0)]=!![]);const _0x1fce3e=_0x507f48[_0x40f7e3(0x259)][_0x40f7e3(0x269)]['call'](this);return this['_applyAIForcedTargetFilters']=![],_0x1fce3e;}}else{const _0x3fd93b=this[_0x420c1e(0x1cc)]()?this['actor']()[_0x420c1e(0x21e)]:this[_0x420c1e(0x251)]()[_0x420c1e(0x21e)];if(_0x3fd93b[_0x420c1e(0x2ef)](AIManager['_regexp'][_0x420c1e(0x2b4)]))return![];else{if(_0x3fd93b[_0x420c1e(0x2ef)](AIManager[_0x420c1e(0x1fb)][_0x420c1e(0x271)])){if(_0x420c1e(0x19f)!==_0x420c1e(0x19f)){function _0x5781d1(){const _0x82878c=_0x420c1e;this[_0x82878c(0x1a2)](_0x59d74b);}}else return this[_0x420c1e(0x310)]()>0x0;}}}}return VisuMZ[_0x420c1e(0x259)]['Settings']['Weight'][_0x420c1e(0x26b)];},Game_Battler['prototype'][_0x4c6e21(0x310)]=function(){const _0x3b34f6=_0x4c6e21;if(this[_0x3b34f6(0x1cc)]()||this[_0x3b34f6(0x1f4)]()){const _0x535049=this[_0x3b34f6(0x1cc)]()?this[_0x3b34f6(0x31c)]()[_0x3b34f6(0x21e)]:this[_0x3b34f6(0x251)]()[_0x3b34f6(0x21e)];if(_0x535049[_0x3b34f6(0x2ef)](AIManager[_0x3b34f6(0x1fb)][_0x3b34f6(0x271)]))return eval(RegExp['$1']);}return VisuMZ[_0x3b34f6(0x259)][_0x3b34f6(0x192)][_0x3b34f6(0x1a6)]['ElementTgrRate'];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x2a9)]=function(){const _0x3a9eb2=_0x4c6e21;if(this[_0x3a9eb2(0x1cc)]()||this[_0x3a9eb2(0x1f4)]()){const _0x2a9231=this['isActor']()?this[_0x3a9eb2(0x31c)]()['note']:this['enemy']()[_0x3a9eb2(0x21e)];if(_0x2a9231[_0x3a9eb2(0x2ef)](AIManager[_0x3a9eb2(0x1fb)][_0x3a9eb2(0x2e2)]))return![];else{if(_0x2a9231[_0x3a9eb2(0x2ef)](AIManager[_0x3a9eb2(0x1fb)][_0x3a9eb2(0x1a5)])){if('TKJro'===_0x3a9eb2(0x248)){function _0x1e0276(){const _0x389e2d=_0x3a9eb2,_0x46efb0=_0xc28194[_0x170e3f];return _0x46efb0&&_0x46efb0[_0x389e2d(0x214)]===0x0?_0x12c7d6[_0x389e2d(0x20f)]:_0x2f71c3[_0x389e2d(0x197)][_0x24f090]||0x0;}}else return this['aiApplyEvaTgrInfluenceRate']()>0x0;}}}return VisuMZ[_0x3a9eb2(0x259)][_0x3a9eb2(0x192)][_0x3a9eb2(0x1a6)][_0x3a9eb2(0x20c)];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x20d)]=function(){const _0x2fcfc9=_0x4c6e21;if(this[_0x2fcfc9(0x1cc)]()||this[_0x2fcfc9(0x1f4)]()){const _0x4efdf3=this[_0x2fcfc9(0x1cc)]()?this['actor']()[_0x2fcfc9(0x21e)]:this[_0x2fcfc9(0x251)]()[_0x2fcfc9(0x21e)];if(_0x4efdf3[_0x2fcfc9(0x2ef)](AIManager[_0x2fcfc9(0x1fb)][_0x2fcfc9(0x1a5)])){if('EkPaT'!==_0x2fcfc9(0x1e3))return eval(RegExp['$1']);else{function _0x2ca965(){const _0x549e3c=_0x2fcfc9;return _0x326f00[_0x549e3c(0x1f6)][_0x549e3c(0x1c4)][_0x549e3c(0x316)](this,_0x1ee5a6,_0x385922);}}}}return VisuMZ['BattleAI'][_0x2fcfc9(0x192)][_0x2fcfc9(0x1a6)][_0x2fcfc9(0x227)];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x19b)]=function(){const _0x5b6a14=_0x4c6e21;if(this[_0x5b6a14(0x1cc)]()||this[_0x5b6a14(0x1f4)]()){const _0x8e3939=this['isActor']()?this['actor']()[_0x5b6a14(0x21e)]:this['enemy']()[_0x5b6a14(0x21e)];if(_0x8e3939[_0x5b6a14(0x2ef)](AIManager['_regexp'][_0x5b6a14(0x323)]))return![];else{if(_0x8e3939[_0x5b6a14(0x2ef)](AIManager['_regexp'][_0x5b6a14(0x27b)])){if(_0x5b6a14(0x1fe)===_0x5b6a14(0x1fa)){function _0x3c4083(){const _0x530c55=_0x5b6a14,_0x5145b7=this[_0x530c55(0x1c7)]();if(this[_0x530c55(0x250)]())_0x5145b7[_0x530c55(0x228)](_0x4e1b3e[this[_0x530c55(0x270)]()]);if(this[_0x530c55(0x1ae)]())_0x5145b7[_0x530c55(0x228)](_0x431c53[this[_0x530c55(0x2f9)]()]);const _0x54c9a7=this[_0x530c55(0x2f2)](),_0x5c93d9=_0x5d3038[_0x530c55(0x293)](_0x54c9a7[_0x530c55(0x1b1)]);for(const _0x53d7b2 of _0x5c93d9){if(_0x53d7b2[_0x530c55(0x254)]===0x1)_0x53d7b2[_0x530c55(0x254)]=this['attackSkillId']();if(_0x53d7b2[_0x530c55(0x254)]===0x2)_0x53d7b2['skillId']=this[_0x530c55(0x2f9)]();}const _0x13c927=_0x5c93d9['filter'](_0x171986=>this['isActionValid'](_0x171986)&&_0x5145b7[_0x530c55(0x1df)](_0x4839fa[_0x171986[_0x530c55(0x254)]]));if(_0x13c927[_0x530c55(0x2b2)]>0x0){this[_0x530c55(0x2cd)](_0x13c927);return;}}}else return this[_0x5b6a14(0x29b)]()>0x0;}}}return VisuMZ['BattleAI'][_0x5b6a14(0x192)][_0x5b6a14(0x1a6)][_0x5b6a14(0x20c)];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x29b)]=function(){const _0xb0cb98=_0x4c6e21;if(this[_0xb0cb98(0x1cc)]()||this['isEnemy']()){const _0x251f7f=this[_0xb0cb98(0x1cc)]()?this['actor']()['note']:this[_0xb0cb98(0x251)]()[_0xb0cb98(0x21e)];if(_0x251f7f['match'](AIManager[_0xb0cb98(0x1fb)][_0xb0cb98(0x27b)]))return eval(RegExp['$1']);}return VisuMZ[_0xb0cb98(0x259)][_0xb0cb98(0x192)][_0xb0cb98(0x1a6)][_0xb0cb98(0x227)];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x285)]=function(){const _0x438971=_0x4c6e21,_0x440610=VisuMZ['BattleAI'][_0x438971(0x192)]['General'];if(this[_0x438971(0x1cc)]()||this[_0x438971(0x1f4)]()){const _0x4b8ed9=this[_0x438971(0x1cc)]()?this[_0x438971(0x31c)]()['note']:this['enemy']()[_0x438971(0x21e)];if(_0x4b8ed9['match'](AIManager[_0x438971(0x1fb)][_0x438971(0x285)])){if(_0x438971(0x315)!==_0x438971(0x315)){function _0x3a4cf6(){const _0x11c46a=_0x438971;return _0x527f59[_0x11c46a(0x1ba)]['clamp'](0x0,0x9);}}else return Number(RegExp['$1'])[_0x438971(0x2ba)](0x0,0x64);}else{if(this[_0x438971(0x1cc)]())return _0x440610['ActorAILevel'];else{if(this[_0x438971(0x1f4)]())return _0x440610[_0x438971(0x1cf)];}}}return _0x440610[_0x438971(0x1cf)];},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x260)]=function(_0x310018,_0x4f11fa,_0x398f3e){const _0x4a0656=_0x4c6e21,_0x210d8f=this[_0x4a0656(0x249)]();if(_0x310018&&_0x310018[_0x4a0656(0x2b2)]>0x0){if(_0x4a0656(0x2e3)==='lJCgx')for(const _0x2473a9 of _0x310018){if('efQPP'===_0x4a0656(0x2ae)){function _0xed795c(){const _0x1d5edb=_0x4a0656;return _0x2a3403(_0x5c93f9['$1'])[_0x1d5edb(0x22c)](/[\r\n]+/)[_0x1d5edb(0x239)]('');}}else _0x210d8f[_0x4a0656(0x1d6)](_0x2473a9,this);}else{function _0x114622(){const _0x364dbd=_0x4a0656;return _0x434b2c[_0x364dbd(0x197)][_0x5c8e61]||0x0;}}}_0x4f11fa&&_0x210d8f[_0x4a0656(0x2a4)](_0x4a0656(0x2bc),this),_0x398f3e&&_0x210d8f[_0x4a0656(0x2a4)](_0x4a0656(0x256),this);},Game_Battler['prototype'][_0x4c6e21(0x1b5)]=function(_0x4b4c0d){const _0x42d38d=_0x4c6e21,_0x53d695=this['opponentsUnit']();return _0x53d695[_0x42d38d(0x1b5)](_0x4b4c0d,this);},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x322)]=function(){const _0x2c2d35=_0x4c6e21,_0x1765d1=VisuMZ['BattleAI']['Settings']['General'];if(this[_0x2c2d35(0x1cc)]()||this[_0x2c2d35(0x1f4)]()){if(_0x2c2d35(0x2ff)!==_0x2c2d35(0x2ff)){function _0x114f93(){const _0x2664a0=_0x2c2d35;_0x2873b0=[this[_0x2664a0(0x304)]()[_0x2664a0(0x26f)][_0x2664a0(0x2f3)]];}}else{const _0x54b780=this[_0x2c2d35(0x1cc)]()?this[_0x2c2d35(0x31c)]()[_0x2c2d35(0x21e)]:this[_0x2c2d35(0x251)]()[_0x2c2d35(0x21e)];if(_0x54b780[_0x2c2d35(0x2ef)](AIManager[_0x2c2d35(0x1fb)][_0x2c2d35(0x322)]))return Number(RegExp['$1'])[_0x2c2d35(0x2ba)](0x0,0x9);else{if(this[_0x2c2d35(0x1cc)]()){if('OzbTs'===_0x2c2d35(0x2dc)){function _0x11aff4(){const _0x1d447f=_0x2c2d35;return this['forcedTargets']()[_0x1d447f(0x2b2)]>0x0;}}else return _0x1765d1[_0x2c2d35(0x2fa)][_0x2c2d35(0x2ba)](0x0,0x9);}else{if(this[_0x2c2d35(0x1f4)]())return _0x1765d1['EnemyRatingVariance'][_0x2c2d35(0x2ba)](0x0,0x9);}}}}return _0x1765d1['EnemyRatingVariance'][_0x2c2d35(0x2ba)](0x0,0x9);},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x2a7)]=function(){const _0x27cba8=_0x4c6e21;if(this[_0x27cba8(0x1db)]())return![];return this['isAutoBattle']()&&this[_0x27cba8(0x2f2)]();},Game_Actor['prototype'][_0x4c6e21(0x2f2)]=function(){const _0x59e572=_0x4c6e21,_0x48b7ea=this[_0x59e572(0x224)]()[_0x59e572(0x21e)];if(_0x48b7ea[_0x59e572(0x2ef)](/<NO REFERENCE AI>/i))return null;else{if(_0x48b7ea['match'](/<REFERENCE AI: ENEMY (\d+)>/i)){if(_0x59e572(0x211)!=='QYkWK'){function _0x18b29d(){if(_0x2a3ea9&&_0x63f5d4['hp']>_0x54fdf4['hp'])_0x2aa88e=_0x2666f7;if(_0x2a8797&&_0x38c3ec['hp']<_0x55de06['hp'])_0x3da7c6=_0x973c9;}}else return $dataEnemies[Number(RegExp['$1'])];}else{if(_0x48b7ea[_0x59e572(0x2ef)](/<REFERENCE AI: (.*)>/i)){if(_0x59e572(0x2e7)===_0x59e572(0x32c)){function _0x1caa3f(){const _0xb857cd=_0x59e572;if(!_0x1b8973[_0xb857cd(0x259)][_0xb857cd(0x192)][_0xb857cd(0x232)]['LearnKnowledge'])return!![];this[_0xb857cd(0x2eb)]()[_0xb857cd(0x26d)]=this[_0xb857cd(0x2eb)]()[_0xb857cd(0x26d)]||{};const _0x41b464=this[_0xb857cd(0x2eb)]()[_0xb857cd(0x26d)];_0x41b464[_0x5ab8d9]=_0x41b464[_0x505444]||[];const _0x1ad149=_0x4a1b22[_0xb857cd(0x1cc)]()?_0x5559e8[_0xb857cd(0x2a6)]():_0x2b5c6b['enemyId']();return _0x41b464[_0x50be48][_0xb857cd(0x1df)](_0x1ad149);}}else return $dataEnemies[DataManager['getEnemyIdWithName'](String(RegExp['$1']))];}}}return $dataEnemies[VisuMZ[_0x59e572(0x259)][_0x59e572(0x192)]['General']['ActorAIReference']];},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x266)]=function(){const _0x55fb4a=_0x4c6e21,_0x275b6d=this[_0x55fb4a(0x224)]()['note'];if(_0x275b6d[_0x55fb4a(0x2ef)](AIManager['_regexp'][_0x55fb4a(0x266)]))return String(RegExp['$1'])[_0x55fb4a(0x297)]()[_0x55fb4a(0x311)]();return VisuMZ[_0x55fb4a(0x259)]['Settings'][_0x55fb4a(0x232)][_0x55fb4a(0x189)];},Game_Actor[_0x4c6e21(0x1f6)]['determineNewValidAIAction']=function(){const _0x385c91=_0x4c6e21;Game_Battler[_0x385c91(0x1f6)]['determineNewValidAIAction'][_0x385c91(0x316)](this),this[_0x385c91(0x25d)]();},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x288)]=Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x25d)],Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x25d)]=function(){const _0x599f69=_0x4c6e21;if(this[_0x599f69(0x2a7)]()){if(_0x599f69(0x325)!=='TwhZo')this[_0x599f69(0x30a)]();else{function _0x67199f(){const _0x57d80e=_0x599f69,_0x276222=_0x26fcf8(_0x40330d['$1']);return this[_0x57d80e(0x25b)](_0x2ba4c4,_0x4a326f,_0x52863e,_0x276222);}}}else VisuMZ[_0x599f69(0x259)][_0x599f69(0x288)][_0x599f69(0x316)](this);},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x30a)]=function(){const _0x3b0607=_0x4c6e21;if(this[_0x3b0607(0x28f)]()>0x0){if(_0x3b0607(0x2f1)===_0x3b0607(0x2c0)){function _0x3385ea(){const _0x24e511=_0x3b0607;_0x37771d[_0x24e511(0x300)](_0x24e511(0x18e)[_0x24e511(0x201)](_0x443d26)),_0x2140a6[_0x24e511(0x300)](_0x433a97);}}else{const _0x135a04=this['usableSkills']();if(this[_0x3b0607(0x250)]())_0x135a04[_0x3b0607(0x228)]($dataSkills[this['attackSkillId']()]);if(this[_0x3b0607(0x1ae)]())_0x135a04['push']($dataSkills[this['guardSkillId']()]);const _0x53d923=this[_0x3b0607(0x2f2)](),_0x33261d=JsonEx[_0x3b0607(0x293)](_0x53d923[_0x3b0607(0x1b1)]);for(const _0x20b40d of _0x33261d){if('RAsni'===_0x3b0607(0x1fc)){if(_0x20b40d[_0x3b0607(0x254)]===0x1)_0x20b40d[_0x3b0607(0x254)]=this[_0x3b0607(0x270)]();if(_0x20b40d[_0x3b0607(0x254)]===0x2)_0x20b40d['skillId']=this['guardSkillId']();}else{function _0x329efb(){const _0x305e3b=_0x3b0607;if(_0x249b06&&(_0x28a3d6[_0x305e3b(0x1be)]||0x0)>(_0x595a55[_0x305e3b(0x1be)]||0x0))_0x37985b=_0x5ec17c;if(_0x41c138&&(_0x169734[_0x305e3b(0x1be)]||0x0)<(_0x3251be[_0x305e3b(0x1be)]||0x0))_0x3f71bb=_0x50d06b;}}}const _0x42e33f=_0x33261d[_0x3b0607(0x2d1)](_0x6ff4d2=>this[_0x3b0607(0x244)](_0x6ff4d2)&&_0x135a04[_0x3b0607(0x1df)]($dataSkills[_0x6ff4d2[_0x3b0607(0x254)]]));if(_0x42e33f['length']>0x0){if(_0x3b0607(0x240)!==_0x3b0607(0x283)){this[_0x3b0607(0x2cd)](_0x42e33f);return;}else{function _0x41ff54(){const _0x3770f4=_0x3b0607;return _0x39eaa1[_0x3770f4(0x2c6)]();}}}}}VisuMZ['BattleAI']['Game_Actor_makeAutoBattleActions'][_0x3b0607(0x316)](this);},Game_Actor['prototype'][_0x4c6e21(0x291)]=function(_0x54949b){const _0x48e138=_0x4c6e21;return Game_Enemy[_0x48e138(0x1f6)][_0x48e138(0x291)][_0x48e138(0x316)](this,_0x54949b);},Game_Actor['prototype']['meetsTurnCondition']=function(_0x49345b,_0x4d348b){const _0x5dd24c=_0x4c6e21;return Game_Enemy[_0x5dd24c(0x1f6)]['meetsTurnCondition'][_0x5dd24c(0x316)](this,_0x49345b,_0x4d348b);},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x1c4)]=function(_0x4ee772,_0x342a99){const _0x12ba5d=_0x4c6e21;return Game_Enemy[_0x12ba5d(0x1f6)][_0x12ba5d(0x1c4)][_0x12ba5d(0x316)](this,_0x4ee772,_0x342a99);},Game_Actor['prototype'][_0x4c6e21(0x247)]=function(_0x5240a6,_0x1eea6a){const _0x3617ba=_0x4c6e21;return Game_Enemy[_0x3617ba(0x1f6)]['meetsMpCondition'][_0x3617ba(0x316)](this,_0x5240a6,_0x1eea6a);},Game_Actor[_0x4c6e21(0x1f6)]['meetsStateCondition']=function(_0x275f51){const _0x50aecb=_0x4c6e21;return Game_Enemy[_0x50aecb(0x1f6)][_0x50aecb(0x26c)][_0x50aecb(0x316)](this,_0x275f51);},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x1a7)]=function(_0x4d562d){const _0x1a2398=_0x4c6e21;return Game_Enemy['prototype']['meetsPartyLevelCondition'][_0x1a2398(0x316)](this,_0x4d562d);},Game_Actor['prototype'][_0x4c6e21(0x284)]=function(_0x3caced){const _0x2a3c53=_0x4c6e21;return Game_Enemy[_0x2a3c53(0x1f6)]['meetsSwitchCondition']['call'](this,_0x3caced);},Game_Enemy[_0x4c6e21(0x1f6)]['aiStyle']=function(){const _0x5a0c8c=_0x4c6e21,_0x29457d=this[_0x5a0c8c(0x251)]()[_0x5a0c8c(0x21e)];if(_0x29457d[_0x5a0c8c(0x2ef)](AIManager['_regexp']['aiStyle']))return String(RegExp['$1'])[_0x5a0c8c(0x297)]()[_0x5a0c8c(0x311)]();return VisuMZ[_0x5a0c8c(0x259)][_0x5a0c8c(0x192)][_0x5a0c8c(0x232)][_0x5a0c8c(0x306)];},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x329)]=Game_Enemy[_0x4c6e21(0x1f6)]['isActionValid'],Game_Enemy[_0x4c6e21(0x1f6)][_0x4c6e21(0x244)]=function(_0x4e831d){const _0xd62837=_0x4c6e21;if(!VisuMZ[_0xd62837(0x259)][_0xd62837(0x329)][_0xd62837(0x316)](this,_0x4e831d))return![];if(this[_0xd62837(0x266)]()==='random')return!![];return AIManager[_0xd62837(0x18d)](this,$dataSkills[_0x4e831d[_0xd62837(0x254)]]);},Game_Actor['prototype'][_0x4c6e21(0x244)]=function(_0xa79360){const _0x185c71=_0x4c6e21;return Game_Enemy['prototype'][_0x185c71(0x244)][_0x185c71(0x316)](this,_0xa79360);},Game_Enemy['prototype'][_0x4c6e21(0x261)]=function(_0x301a9b,_0x380dbc){const _0xe75572=_0x4c6e21,_0x1a2b77=_0x301a9b[_0xe75572(0x301)]((_0x4d65d1,_0x174030)=>_0x4d65d1+_0x174030[_0xe75572(0x2d0)]-_0x380dbc,0x0);if(_0x1a2b77>=0x0){let _0x56108a=Math['randomInt'](_0x1a2b77);for(const _0x4094d9 of _0x301a9b){_0x56108a-=_0x4094d9[_0xe75572(0x2d0)]-_0x380dbc;if(_0x56108a<=0x0)return _0x4094d9;}}else{if(_0xe75572(0x1b0)!==_0xe75572(0x1b0)){function _0x5f2414(){const _0x4aca9a=_0xe75572,_0x47e241=_0x232124[_0x4aca9a(0x1e2)](..._0x44a997['map'](_0x2840f3=>_0x2840f3[_0x4aca9a(0x2d0)])),_0x1c6e73=_0x47e241-this['aiRatingVariance']();_0x91f8e6=_0x2808d2['filter'](_0x563f75=>_0x563f75['rating']>=_0x1c6e73),_0x38eb09=_0x115ccd[_0x4aca9a(0x259)][_0x4aca9a(0x193)](_0x4317c6);for(let _0x2c0fc4=0x0;_0x2c0fc4<this[_0x4aca9a(0x28f)]();_0x2c0fc4++){this[_0x4aca9a(0x1e4)](_0x2c0fc4)[_0x4aca9a(0x30d)](this[_0x4aca9a(0x261)](_0x309be8,_0x1c6e73));}}}else return null;}},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x261)]=function(_0x39bf91,_0x452b57){const _0xa5fdf6=_0x4c6e21;return Game_Enemy[_0xa5fdf6(0x1f6)][_0xa5fdf6(0x261)][_0xa5fdf6(0x316)](this,_0x39bf91,_0x452b57);},Game_Enemy['prototype'][_0x4c6e21(0x2cd)]=function(_0xcd5bea){const _0x5925cd=_0x4c6e21,_0x3ef57d=String(this['aiStyle']())[_0x5925cd(0x297)]()[_0x5925cd(0x311)]();if([_0x5925cd(0x1c6),_0x5925cd(0x22d)][_0x5925cd(0x1df)](_0x3ef57d)){if(_0x5925cd(0x282)===_0x5925cd(0x282))this['selectAllActionsRandom'](_0xcd5bea);else{function _0x42c92d(){const _0x4c791d=_0x5925cd;_0x5df5b3[_0x4c791d(0x259)]['Game_Troop_setup']['call'](this,_0x53715c),this['clearAIKnowledge']();}}}else{if(_0x3ef57d===_0x5925cd(0x23d))this[_0x5925cd(0x203)](_0xcd5bea);else{if(_0x5925cd(0x25f)!==_0x5925cd(0x25f)){function _0x57f3f3(){return _0x3e8d68['_stateTurns'][_0x4459d9]||0x0;}}else this[_0x5925cd(0x31f)](_0xcd5bea);}}},Game_Actor[_0x4c6e21(0x1f6)][_0x4c6e21(0x2cd)]=function(_0x5d760b){const _0x2a3748=_0x4c6e21;Game_Enemy[_0x2a3748(0x1f6)][_0x2a3748(0x2cd)][_0x2a3748(0x316)](this,_0x5d760b);},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x31f)]=function(_0x58dec7){const _0x563674=_0x4c6e21,_0x30986a=Math['max'](..._0x58dec7[_0x563674(0x209)](_0x5b0375=>_0x5b0375[_0x563674(0x2d0)])),_0x28efd2=_0x30986a-this['aiRatingVariance']();_0x58dec7=_0x58dec7[_0x563674(0x2d1)](_0x1e7435=>_0x1e7435[_0x563674(0x2d0)]>=_0x28efd2),_0x58dec7=VisuMZ[_0x563674(0x259)]['ShuffleArray'](_0x58dec7);for(let _0x3b1973=0x0;_0x3b1973<this[_0x563674(0x28f)]();_0x3b1973++){if(_0x563674(0x2d6)!==_0x563674(0x2e8))this[_0x563674(0x1e4)](_0x3b1973)[_0x563674(0x30d)](this[_0x563674(0x261)](_0x58dec7,_0x28efd2));else{function _0x483101(){const _0x29769d=_0x563674,_0x41e3f2=this[_0x29769d(0x1cc)]()?this['actor']()['note']:this['enemy']()[_0x29769d(0x21e)];if(_0x41e3f2[_0x29769d(0x2ef)](_0x4b6f6f[_0x29769d(0x1fb)][_0x29769d(0x285)]))return _0x367327(_0x432152['$1'])[_0x29769d(0x2ba)](0x0,0x64);else{if(this[_0x29769d(0x1cc)]())return _0x261a94[_0x29769d(0x1f1)];else{if(this[_0x29769d(0x1f4)]())return _0x25b058['EnemyAILevel'];}}}}}},VisuMZ[_0x4c6e21(0x259)]['ShuffleArray']=function(_0x778f92){const _0x5354a3=_0x4c6e21;var _0x567c0e,_0x2926c7,_0x4aa7d9;for(_0x4aa7d9=_0x778f92[_0x5354a3(0x2b2)]-0x1;_0x4aa7d9>0x0;_0x4aa7d9--){_0x567c0e=Math['floor'](Math[_0x5354a3(0x1c6)]()*(_0x4aa7d9+0x1)),_0x2926c7=_0x778f92[_0x4aa7d9],_0x778f92[_0x4aa7d9]=_0x778f92[_0x567c0e],_0x778f92[_0x567c0e]=_0x2926c7;}return _0x778f92;},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x203)]=function(_0x10f932){const _0x7c3f19=_0x4c6e21;for(let _0x1de35e=0x0;_0x1de35e<this['numActions']();_0x1de35e++){const _0x42a04b=_0x10f932[0x0];this[_0x7c3f19(0x1e4)](_0x1de35e)[_0x7c3f19(0x30d)](_0x42a04b);}},Game_Battler[_0x4c6e21(0x1f6)][_0x4c6e21(0x1a2)]=function(_0xc31076){const _0x412b8f=_0x4c6e21;for(let _0xfa267f=0x0;_0xfa267f<this[_0x412b8f(0x28f)]();_0xfa267f++){if(_0x412b8f(0x1bc)===_0x412b8f(0x1bc)){const _0x4e8dab=_0xc31076[Math[_0x412b8f(0x190)](_0xc31076[_0x412b8f(0x2b2)])];this[_0x412b8f(0x1e4)](_0xfa267f)[_0x412b8f(0x30d)](_0x4e8dab);}else{function _0x5cb969(){const _0x56486e=_0x412b8f;_0x5548ce['filterForcedTargeting'](this[_0x56486e(0x2c4)](),this[_0x56486e(0x304)]());}}}},Game_Enemy[_0x4c6e21(0x1f6)][_0x4c6e21(0x2fb)]=function(){const _0x2c3cb6=_0x4c6e21;Game_Battler[_0x2c3cb6(0x1f6)][_0x2c3cb6(0x2fb)][_0x2c3cb6(0x316)](this);if(this['numActions']()>0x0){if(_0x2c3cb6(0x287)!==_0x2c3cb6(0x2fc)){const _0x4137ab=this['enemy']()['actions'][_0x2c3cb6(0x2d1)](_0xb9e12=>this['isActionValid'](_0xb9e12));_0x4137ab[_0x2c3cb6(0x2b2)]>0x0&&this[_0x2c3cb6(0x2cd)](_0x4137ab);}else{function _0x4a5943(){const _0x5e5b39=_0x2c3cb6;if(_0x1d650f[_0x5e5b39(0x21e)][_0x5e5b39(0x2ef)](_0x6b4a50[_0x5e5b39(0x1fb)][_0x5e5b39(0x281)]))return[];else return _0x251dac[_0x5e5b39(0x21e)]['match'](_0x557004[_0x5e5b39(0x1fb)][_0x5e5b39(0x1ed)])?_0x4d630b(_0x4a62d8['$1'])[_0x5e5b39(0x22c)](/[\r\n]+/)[_0x5e5b39(0x239)](''):this[_0x5e5b39(0x230)](_0x4a1813);}}}},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x1cd)]=Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x21c)],Game_Unit['prototype'][_0x4c6e21(0x21c)]=function(){const _0x192bac=_0x4c6e21;VisuMZ['BattleAI']['Game_Unit_initialize'][_0x192bac(0x316)](this),this[_0x192bac(0x28c)]();},Game_Unit['prototype'][_0x4c6e21(0x28c)]=function(){const _0xcf92e0=_0x4c6e21;this[_0xcf92e0(0x1f0)]=![],this[_0xcf92e0(0x2b0)]();},VisuMZ[_0x4c6e21(0x259)]['Game_Unit_aliveMembers']=Game_Unit[_0x4c6e21(0x1f6)]['aliveMembers'],Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x1e0)]=function(){const _0x47671d=_0x4c6e21;let _0x281ca3=VisuMZ[_0x47671d(0x259)][_0x47671d(0x196)][_0x47671d(0x316)](this);if(this[_0x47671d(0x1f0)]){if(_0x47671d(0x238)==='hkhsG'){function _0x29fd3f(){const _0x47531f=_0x47671d;if(this[_0x47531f(0x28f)]()>0x0){const _0x382c9c=this['usableSkills']();if(this[_0x47531f(0x250)]())_0x382c9c[_0x47531f(0x228)](_0x58d723[this[_0x47531f(0x270)]()]);if(this[_0x47531f(0x1ae)]())_0x382c9c[_0x47531f(0x228)](_0x368400[this[_0x47531f(0x2f9)]()]);const _0x164005=this['referenceEnemyForAI'](),_0x2b13bd=_0xb1dc47[_0x47531f(0x293)](_0x164005[_0x47531f(0x1b1)]);for(const _0x318ef4 of _0x2b13bd){if(_0x318ef4[_0x47531f(0x254)]===0x1)_0x318ef4[_0x47531f(0x254)]=this[_0x47531f(0x270)]();if(_0x318ef4[_0x47531f(0x254)]===0x2)_0x318ef4[_0x47531f(0x254)]=this[_0x47531f(0x2f9)]();}const _0x4eb3f8=_0x2b13bd['filter'](_0x285111=>this[_0x47531f(0x244)](_0x285111)&&_0x382c9c[_0x47531f(0x1df)](_0x3d6ee5[_0x285111['skillId']]));if(_0x4eb3f8[_0x47531f(0x2b2)]>0x0){this['selectAllActions'](_0x4eb3f8);return;}}_0x1d396f[_0x47531f(0x259)][_0x47531f(0x288)]['call'](this);}}else{const _0x2c5856=AIManager['forcedTargets']();_0x281ca3=_0x281ca3[_0x47671d(0x2d1)](_0x254c7f=>_0x2c5856['includes'](_0x254c7f));}}return _0x281ca3;},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x269)]=Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x2ac)],Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x2ac)]=function(){const _0x3857cd=_0x4c6e21;AIManager['hasForcedTargets']()&&(this['_applyAIForcedTargetFilters']=!![]);const _0x363427=VisuMZ[_0x3857cd(0x259)][_0x3857cd(0x269)][_0x3857cd(0x316)](this);return this['_applyAIForcedTargetFilters']=![],_0x363427;},Game_Unit['prototype'][_0x4c6e21(0x2b0)]=function(){const _0x4e923f=_0x4c6e21;this[_0x4e923f(0x241)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x2eb)]=function(){const _0x38e342=_0x4c6e21;if(this[_0x38e342(0x241)]===undefined)this[_0x38e342(0x2b0)]();return this[_0x38e342(0x241)];},Game_Unit[_0x4c6e21(0x1f6)]['addXParamAIKnowledge']=function(_0x181ec6,_0x872854){const _0x38e16d=_0x4c6e21;this[_0x38e16d(0x2eb)]()[_0x181ec6]=this[_0x38e16d(0x2eb)]()[_0x181ec6]||[];const _0x33cb52=_0x872854[_0x38e16d(0x1cc)]()?_0x872854[_0x38e16d(0x2a6)]():_0x872854[_0x38e16d(0x21b)]();!this[_0x38e16d(0x2eb)]()[_0x181ec6][_0x38e16d(0x1df)](_0x33cb52)&&this[_0x38e16d(0x2eb)]()[_0x181ec6][_0x38e16d(0x228)](_0x33cb52);},Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x1b5)]=function(_0x361bca,_0xd26284){const _0x135aab=_0x4c6e21;if(!VisuMZ[_0x135aab(0x259)][_0x135aab(0x192)][_0x135aab(0x232)][_0x135aab(0x1d8)])return!![];const _0x4d88cd=_0x361bca[_0x135aab(0x2ef)](/EVA/i)?'evaRates':_0x135aab(0x256);this[_0x135aab(0x2eb)]()[_0x4d88cd]=this[_0x135aab(0x2eb)]()[_0x4d88cd]||[];const _0x346a47=_0xd26284[_0x135aab(0x1cc)]()?_0xd26284['actorId']():_0xd26284[_0x135aab(0x21b)]();return this[_0x135aab(0x2eb)]()[_0x4d88cd][_0x135aab(0x1df)](_0x346a47);},Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x1d6)]=function(_0x5e2644,_0x364041){const _0xe9b0bc=_0x4c6e21;this[_0xe9b0bc(0x2eb)]()['elementRates']=this[_0xe9b0bc(0x2eb)]()['elementRates']||{};const _0x5c43e3=this['aiKnowledge']()[_0xe9b0bc(0x26d)];_0x5c43e3[_0x5e2644]=_0x5c43e3[_0x5e2644]||[];const _0x21b2e3=_0x364041[_0xe9b0bc(0x1cc)]()?_0x364041[_0xe9b0bc(0x2a6)]():_0x364041[_0xe9b0bc(0x21b)]();if(!_0x5c43e3[_0x5e2644][_0xe9b0bc(0x1df)](_0x21b2e3)){if(_0xe9b0bc(0x2cc)!==_0xe9b0bc(0x2cc)){function _0x30329e(){const _0x30307b=_0xe9b0bc;return _0x26cbeb[_0x30307b(0x259)]['Settings'][_0x30307b(0x232)]['UnknownElementRate'];}}else _0x5c43e3[_0x5e2644][_0xe9b0bc(0x228)](_0x21b2e3);}},Game_Unit[_0x4c6e21(0x1f6)][_0x4c6e21(0x27d)]=function(_0x26b9af,_0xaaaf0c){const _0x2e6b23=_0x4c6e21;if(!VisuMZ[_0x2e6b23(0x259)][_0x2e6b23(0x192)][_0x2e6b23(0x232)][_0x2e6b23(0x1d8)])return!![];this[_0x2e6b23(0x2eb)]()['elementRates']=this[_0x2e6b23(0x2eb)]()[_0x2e6b23(0x26d)]||{};const _0x5689f0=this[_0x2e6b23(0x2eb)]()[_0x2e6b23(0x26d)];_0x5689f0[_0x26b9af]=_0x5689f0[_0x26b9af]||[];const _0x58d9b2=_0xaaaf0c[_0x2e6b23(0x1cc)]()?_0xaaaf0c[_0x2e6b23(0x2a6)]():_0xaaaf0c[_0x2e6b23(0x21b)]();return _0x5689f0[_0x26b9af][_0x2e6b23(0x1df)](_0x58d9b2);},VisuMZ[_0x4c6e21(0x259)][_0x4c6e21(0x208)]=Game_Troop['prototype'][_0x4c6e21(0x2d3)],Game_Troop[_0x4c6e21(0x1f6)]['setup']=function(_0x4be09c){const _0x330238=_0x4c6e21;VisuMZ[_0x330238(0x259)][_0x330238(0x208)][_0x330238(0x316)](this,_0x4be09c),this[_0x330238(0x2b0)]();};