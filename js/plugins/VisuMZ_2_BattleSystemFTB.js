//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * ---
 * 
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemFTB
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
 * @text General Settings
 * @type struct<General>
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

function _0x56af(_0x546e85,_0xad15b3){const _0x6db9d7=_0x6db9();return _0x56af=function(_0x56afb9,_0xc4b380){_0x56afb9=_0x56afb9-0x1ef;let _0x3a4aa6=_0x6db9d7[_0x56afb9];return _0x3a4aa6;},_0x56af(_0x546e85,_0xad15b3);}function _0x6db9(){const _0xd97df2=['appear','EHcPA','_unit','onBattleStart','battleSys','subject','addChildAt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_FTB_RECALC_SUB_DIFF','_forceAction','vaenv','Current','Window_Selectable_cursorPagedown','_forcedBattlers','ShowCostForGuard','agility','Scene_Battle_commandCancel','FUNC','NUM','PartyTeamShiftFmt','Window_Base_drawItemNumber','payActionCostFTB','4dTXLiV','Game_Actor_changeEquipById','_FTB_COST_POSITION','ajoYN','1626360sZUMsq','_action','537114KXmfEu','setLastFtbIndex','clear','some','checkNeedsUpdate','update','isSideView','processTouchFTB','SystemActionCountVisibility','_partyCommandWindow','initMembers','close','_phase','refresh','Game_Actor_changeEquip','startInputFTB','BattleManager_endAction','PictureSmoothing','vnvyn','yQqDu','uNOmi','match','366ielrCG','_FTB_RESET_INDEX','lRsrT','ftbSwitchActorDirection','cursorPageup','createActorCommandWindowFTB','setItem','processSwitchActors','random','ftbHighestAgility','Game_Action_applyGlobal','addBuff','Window_Selectable_cursorPageup','Mechanics','aliveMembers','battleMembers','Game_Battler_useItem','MaxActions','EnemyActionPicture','createActionsFTB','GIatt','isActor','createActorCommandWindow','Game_Battler_performCollapse','isSkill','setCurrentActionsFTB','gainCurrentActionsFTB','startInput','xoxva','battleEnd','fontSize','updateTurn','_FTB_COST_SHOW_ATTACK','changeEquip','isOpen','selectNextCommand','Show_1_Action_Cost','setUnit','blt','removeActionBattlersFTB','randomInt','Game_Battler_removeState','visible','CXqCy','registerCommand','battler','QikwV','commandCancel','createStartingCoordinates','isTpb','onTouchSelectFTB','reduce','item','_FTB_GUARD_PASS','maxCols','reduceActionsFTB','selectNextActor','ftbTotalAgility','ActionPointCost','pGiMS','6450uUvWTI','sort','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','lGCdM','getChildIndex','EVAL','Game_BattlerBase_canUse','PassTurn','attackSkillId','General','IktCX','makeActionOrdersFTB','bdTDq','textSizeEx','STRUCT','canActorBeSelectedFTB','_helpWindow','_FTB_FREE_CHANGE','_ftbPartyActionCountWindow','BattleManager_setup','DrawActionsRemaining','selectNextActorFTB','VfZtx','AgiBuff','HoPju','makeAdditionalSkillCostText','filter','Game_Battler_addDebuff','keepPrevSubjectFTB','active','IogSR','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','ftbActorActionsIcon','ActorActionPicture','removeState','Scene_Battle_createAllWindows','total\x20agi','_scene','repositionLogWindowFTB','_FTB_RECALC_ADD_DIFF','BGcGL','clearStates','_context','rRsLK','initBattleSystemFTB','addState','canUse','_FTB_KEEP_PREV_ACTOR','ThMln','innerHeight','Game_BattlerBase_hide','parse','lowest\x20agi','drawBigIcon','BattleManager_endAllBattlersTurn','processTurnFTB','addDebuff','neXPM','1233sFJGLR','hitIndex','BattleManager_isTpb','getCurrentActionsFTB','cursorLeft','meetEndTurnConditionsFTB','_currentActor','cFZQk','call','EnemyOffsetX','endAction','BattleManager_endTurn','Game_Actor_releaseUnequippableItems','_doubleTouch','map','agi','EnemyActionsIcon','canDrawActionsRemaining','startActorInput','_maxActions','BattleSystemFTB','clamp','EzVrl','ARRAYEVAL','getBattleSystem','addLoadListener','Nothing','Actor','BattleManager_processTurn','_actorCommandWindow','floor','Enemy','Scene_Battle_commandFight','NeutralAdvantage','createContentsArray','BattleManager_startBattle','ftbFreeRangeSwitch','ydowr','canInput','drawPicture','ftbPartyTeamShift','MaxVisible','IconSmoothing','version','CostPosition','kbsLp','finishActorInput','70563WAoDgo','updatePosition','algFl','bind','shift','description','GainDiff','loadPicture','endTurn','DrawHorz','DefaultCostSkill','guardSkillId','Window_Base_makeAdditionalSkillCostText','cXSuK','_FTB_NEUTRAL_TURN_ADVANTAGE','ScreenBufferY','ftbAliveMembers','VCaVF','startActorCommandSelection','min','getMaxActionsFTB','BattleManager_selectNextActor','ActionPointTraitPlus','smgte','ItemQuantityFmt','ADyTy','Game_Battler_addBuff','waVhf','push','concat','_subject','drawItemNumberFTB','actors','ScreenBufferX','ftbEmptyActionsIcon','ImageSize','Game_Actor_changeClass','exit','_ftbCurrentUnit','recalculateActionsFTB','drawItemNumber','updatePadding','Game_BattlerBase_updateStateTurns','changeClass','waitCount','ConvertParams','drawActionsRemaining','_ftbActionCountVisible','itaPH','trim','rWnmF','numItems','ActionCountCostFmt','Window_Help_setItem','_ftbTeamOdd','OlYBU','initMembersFTB','NgZmf','Game_Battler_removeBuff','isFTB','FreeChange','enemies','setText','hide','index','cursorPagedown','setBattleSystemFTBActionCountVisible','isTurnBased','SitTm','startTurnFTB','performTurnEndFTB','length','ActionsRemainingOffsetY','commandFight','note','drawTextEx','_FTB_COST_SHOW_1','contents','_FTB_MAX_ACTIONS','1WBRhqH','removeBuff','toLowerCase','_ftbActionsCur','Game_Actor_discardEquip','_storedBitmaps','screenX','imageSmoothingEnabled','41419KytTGc','ARRAYNUM','BattleManager_battleSys','resetFontSettings','Game_System_initialize','RegExp','PNAOD','stepBack','prototype','width','JSON','BattleManager_isActiveTpb','StateBuffUpdate','YVOyL','_ftbLastIndex','ftbEnemyActionsIcon','isPartyCommandWindowDisabled','HideActionPointCost','_bypassStateTurnUpdatesFTB','clearBuffs','ActionCountFull','_actionBattlers','makeActions','GuardPass','BattleManager_startInput','Game_BattlerBase_clearStates','commandCancelFTB','EmptyActionPicture','_FTB_ACTION_OVERFLOW','_FTB_BETWEEN_TEAMS_WAIT','startTurn','MinActions','_FTB_ACTION_BASE','height','passTurnFTB','zbuDf','DefaultCostItem','processTurn','_FTB_MIN_ACTIONS','ftbLowestAgility','getActionCostFTB','CfOcm','TPaka','addText','endActionFTB','GeNdb','speed','BattleManager_makeActionOrders','_ftbTurnAdvantageUnit','friendsUnit','LoseDiff','auaOe','applyGlobal','DxkFQ','startBattleFTB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isPassingTurnFTB','ImageGapDistance','AllowOverflow','QNNRN','changeEquipById','_FTB_ACTION_AGI_BUFF','canMove','UgKaC','Empty','turnCount','isActiveTpb','_FTB_COST_SHOW_0','enemy','\x5cI[%1]','BPRLz','toUpperCase','asHdP','loseCurrentActionsFTB','setBackgroundType','Game_Action_speed','EChgy','BattleManager_finishActorInput','%1ActionPicture','performCollapse','ARRAYFUNC','discardEquip','initialize','ftb%1ActionsIcon','Game_Actor_selectNextCommand','startBattle','max','format','updateStateTurnsFTB','IconSet','ftbCreateTeamSwitchText','makeActionOrders','zJZPI','_FTB_ACTION_AGI_DEBUFF','constructor','ActionsRemainingOffsetX','updateBuffTurns','_surprise','clearPassTurnFTB','transform','ftbActionCount','Window_Selectable_cursorLeft','Game_Battler_onTurnEnd','player','_buffs','_logWindow','Show_0_Action_Cost','_passedTurnFTB','_currentActions','create','includes','BottomPosition','members','XlWlb','_ftbTeamEven','BattleManager_startTurn','scwKX','_preemptive','_ftbTroopActionCountWindow','ftbCostFormat','TroopTeamShiftFmt','createAllWindows','9168753fUBFvI','KeepPrevActor','_handlers','ItemsEquipsCore','BWsTo','ShowActionPointCost','iconWidth','_ftbActionsMax','skillCostSeparator','_FTB_COST_SHOW_GUARD','ItemQuantityFontSize','onTurnEnd','indexOf','ARRAYJSON','BattleManager_isTurnBased','name','setup','_inBattle','playCursorSound','Visible','ActorOffsetX','inBattle','endAllBattlersTurn','ActorActionsIcon','setMaxActionsFTB','applyGlobalFTB','UYSIv','HTHDH','getNextSubject','padding','endTurnFTB','round','Scene_Battle_createActorCommandWindow','select','BattleManager_isTeamBased','Game_Battler_addState','iconHeight','unshift','isDrawItemNumber','canActFTB','NewTurnResetIndex','ftbTroopTeamShift','EnemyOffsetY','Game_Actor_forceChangeEquip','XwyCc','OUHXa','makeAdditionalCostTextFTB','forceChangeEquip','cursorRight','parameters','isTeamBased','isSceneBattle','createActionCountWindowsFTB','ARUpI','windowRect','Window_Selectable_cursorRight','textWidth','updateStateTurns','675840uXysjd','Settings','_inputting','innerWidth'];_0x6db9=function(){return _0xd97df2;};return _0x6db9();}const _0x37c6a0=_0x56af;(function(_0x27a8db,_0x4ff14b){const _0x429d23=_0x56af,_0xf0fbdc=_0x27a8db();while(!![]){try{const _0x537af8=parseInt(_0x429d23(0x24e))/0x1*(parseInt(_0x429d23(0x32a))/0x2)+-parseInt(_0x429d23(0x1ff))/0x3*(parseInt(_0x429d23(0x324))/0x4)+parseInt(_0x429d23(0x30a))/0x5+parseInt(_0x429d23(0x340))/0x6*(parseInt(_0x429d23(0x256))/0x7)+parseInt(_0x429d23(0x328))/0x8+parseInt(_0x429d23(0x3b6))/0x9*(parseInt(_0x429d23(0x37c))/0xa)+-parseInt(_0x429d23(0x2d0))/0xb;if(_0x537af8===_0x4ff14b)break;else _0xf0fbdc['push'](_0xf0fbdc['shift']());}catch(_0x47507a){_0xf0fbdc['push'](_0xf0fbdc['shift']());}}}(_0x6db9,0x30a6e));var label='BattleSystemFTB',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x45330f){const _0x5c231d=_0x56af;return _0x45330f['status']&&_0x45330f[_0x5c231d(0x204)][_0x5c231d(0x2c4)]('['+label+']');})[0x0];VisuMZ[label][_0x37c6a0(0x30b)]=VisuMZ[label][_0x37c6a0(0x30b)]||{},VisuMZ[_0x37c6a0(0x22c)]=function(_0x372fdf,_0x1811f6){const _0x4ad442=_0x37c6a0;for(const _0x5db07a in _0x1811f6){if(_0x4ad442(0x388)!==_0x4ad442(0x388)){if(_0x2ee3fe===_0x4ad442(0x3d0))return;if(_0x40c281===_0x4ad442(0x319))_0x12827a=this[_0x4ad442(0x310)]===_0x1ddbcc?_0x4ad442(0x3d1):_0x4ad442(0x1ef);const _0x30c5f7=_0x399cc6[_0x4ad442(0x30b)];if(_0x30c5f7[_0x4ad442(0x2a4)[_0x4ad442(0x2ad)](_0x10371f)]){const _0x517821=_0x30c5f7[_0x4ad442(0x2a4)[_0x4ad442(0x2ad)](_0x3fc4e5)],_0x3de24d=_0x55801f[_0x4ad442(0x206)](_0x517821);_0x3de24d[_0x4ad442(0x3cf)](this['drawPicture'][_0x4ad442(0x202)](this,_0x3de24d,_0x1d8b2a,_0x4993fe,_0x4a6fea));}else{const _0x454ecc=_0x5d87e5['ftb%1ActionsIcon'[_0x4ad442(0x2ad)](_0x403406)];this['drawBigIcon'](_0x454ecc,_0xd16c86,_0x38c2ee),this[_0x4ad442(0x3c7)](_0x427a19)&&this['drawActionsRemaining'](_0x3472c3,_0x45987d);}}else{if(_0x5db07a[_0x4ad442(0x33f)](/(.*):(.*)/i)){if('JqInl'!==_0x4ad442(0x2eb)){const _0x3f5d61=String(RegExp['$1']),_0x4888c2=String(RegExp['$2'])[_0x4ad442(0x29d)]()[_0x4ad442(0x230)]();let _0x369e5a,_0x17cbd1,_0x5f0fa0;switch(_0x4888c2){case _0x4ad442(0x320):_0x369e5a=_0x1811f6[_0x5db07a]!==''?Number(_0x1811f6[_0x5db07a]):0x0;break;case _0x4ad442(0x257):_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON[_0x4ad442(0x3af)](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1[_0x4ad442(0x3c4)](_0x206ac0=>Number(_0x206ac0));break;case _0x4ad442(0x381):_0x369e5a=_0x1811f6[_0x5db07a]!==''?eval(_0x1811f6[_0x5db07a]):null;break;case _0x4ad442(0x3cd):_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON['parse'](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1[_0x4ad442(0x3c4)](_0x42a869=>eval(_0x42a869));break;case _0x4ad442(0x260):_0x369e5a=_0x1811f6[_0x5db07a]!==''?JSON[_0x4ad442(0x3af)](_0x1811f6[_0x5db07a]):'';break;case _0x4ad442(0x2dd):_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON['parse'](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1['map'](_0x44b92f=>JSON['parse'](_0x44b92f));break;case _0x4ad442(0x31f):_0x369e5a=_0x1811f6[_0x5db07a]!==''?new Function(JSON[_0x4ad442(0x3af)](_0x1811f6[_0x5db07a])):new Function('return\x200');break;case _0x4ad442(0x2a6):_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON[_0x4ad442(0x3af)](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1[_0x4ad442(0x3c4)](_0x1237b9=>new Function(JSON['parse'](_0x1237b9)));break;case'STR':_0x369e5a=_0x1811f6[_0x5db07a]!==''?String(_0x1811f6[_0x5db07a]):'';break;case'ARRAYSTR':_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON['parse'](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1[_0x4ad442(0x3c4)](_0x13abce=>String(_0x13abce));break;case _0x4ad442(0x38a):_0x5f0fa0=_0x1811f6[_0x5db07a]!==''?JSON[_0x4ad442(0x3af)](_0x1811f6[_0x5db07a]):{},_0x369e5a=VisuMZ[_0x4ad442(0x22c)]({},_0x5f0fa0);break;case'ARRAYSTRUCT':_0x17cbd1=_0x1811f6[_0x5db07a]!==''?JSON['parse'](_0x1811f6[_0x5db07a]):[],_0x369e5a=_0x17cbd1['map'](_0x54080f=>VisuMZ[_0x4ad442(0x22c)]({},JSON[_0x4ad442(0x3af)](_0x54080f)));break;default:continue;}_0x372fdf[_0x3f5d61]=_0x369e5a;}else _0x338395[_0x4ad442(0x3ca)]['Game_Actor_changeEquip'][_0x4ad442(0x3be)](this,_0x598143,_0x1eb7e1),this[_0x4ad442(0x287)]()[_0x4ad442(0x226)]();}}}return _0x372fdf;},(_0xeea242=>{const _0x2a6571=_0x37c6a0,_0x29255d=_0xeea242[_0x2a6571(0x2df)];for(const _0x370cc3 of dependencies){if(!Imported[_0x370cc3]){alert(_0x2a6571(0x28d)[_0x2a6571(0x2ad)](_0x29255d,_0x370cc3)),SceneManager[_0x2a6571(0x224)]();break;}}const _0x403560=_0xeea242[_0x2a6571(0x204)];if(_0x403560['match'](/\[Version[ ](.*?)\]/i)){if('ukzrS'!=='ukzrS')_0x51a979-=_0x519c2f;else{const _0x3cfdab=Number(RegExp['$1']);_0x3cfdab!==VisuMZ[label][_0x2a6571(0x1fb)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2a6571(0x2ad)](_0x29255d,_0x3cfdab)),SceneManager[_0x2a6571(0x224)]());}}if(_0x403560[_0x2a6571(0x33f)](/\[Tier[ ](\d+)\]/i)){const _0x168316=Number(RegExp['$1']);_0x168316<tier?'BWsTo'!==_0x2a6571(0x2d4)?_0x5490d4=_0x3e39ee[_0x2a6571(0x2ac)](_0xe78792,_0x135876):(alert(_0x2a6571(0x37e)[_0x2a6571(0x2ad)](_0x29255d,_0x168316,tier)),SceneManager[_0x2a6571(0x224)]()):tier=Math[_0x2a6571(0x2ac)](_0x168316,tier);}VisuMZ[_0x2a6571(0x22c)](VisuMZ[label][_0x2a6571(0x30b)],_0xeea242[_0x2a6571(0x301)]);})(pluginData),PluginManager[_0x37c6a0(0x36c)](pluginData['name'],_0x37c6a0(0x332),_0x4f690d=>{const _0xdb9284=_0x37c6a0;VisuMZ['ConvertParams'](_0x4f690d,_0x4f690d);const _0x31bb7e=_0x4f690d[_0xdb9284(0x2e3)];$gameSystem[_0xdb9284(0x241)](_0x31bb7e);}),VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x25b)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager['getActionCostFTB']=function(_0x445191){const _0x26b80d=_0x37c6a0;if(!_0x445191)return 0x0;const _0x4a6e5d=VisuMZ[_0x26b80d(0x3ca)][_0x26b80d(0x30b)]['Mechanics'],_0x1f9e04=VisuMZ[_0x26b80d(0x3ca)][_0x26b80d(0x25b)],_0x34b030=_0x445191[_0x26b80d(0x249)];if(_0x34b030[_0x26b80d(0x33f)](_0x1f9e04[_0x26b80d(0x37a)]))return Number(RegExp['$1']);else{if(DataManager[_0x26b80d(0x358)](_0x445191))return _0x4a6e5d[_0x26b80d(0x209)];else{if(DataManager['isItem'](_0x445191)){if(_0x26b80d(0x327)!==_0x26b80d(0x29e))return _0x4a6e5d[_0x26b80d(0x27a)];else _0x3b1e16[_0x26b80d(0x3ca)]['Game_BattlerBase_appear'][_0x26b80d(0x3be)](this),_0x5b36ce[_0x26b80d(0x367)](),this['friendsUnit']()[_0x26b80d(0x226)]();}else{if(_0x26b80d(0x318)!==_0x26b80d(0x305))return 0x0;else{if(!_0x1ae30e[_0x26b80d(0x23a)]())return;_0xabd12e['clearPassTurnFTB'](),_0x925e9f[_0x26b80d(0x2b8)]();const _0xdd0bed=_0x2b6c1e[_0x26b80d(0x297)]()+0x1;let _0x4072ab=_0xdd0bed%0x2===0x0?this[_0x26b80d(0x2c8)]:this[_0x26b80d(0x235)],_0x42a978=_0xdd0bed%0x2===0x0?this['_ftbTeamOdd']:this['_ftbTeamEven'];_0xdd0bed>0x1&&_0x42a978[_0x26b80d(0x245)](),_0x4072ab[_0x26b80d(0x2ae)](),_0x4072ab[_0x26b80d(0x244)]();}}}}},ImageManager[_0x37c6a0(0x39c)]=VisuMZ[_0x37c6a0(0x3ca)]['Settings']['General'][_0x37c6a0(0x2e7)],ImageManager[_0x37c6a0(0x265)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x3c6)],ImageManager[_0x37c6a0(0x221)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)]['EmptyActionsIcon'],TextManager['ftbActionPointsFull']=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x26a)],TextManager['ftbActionPointsAbbr']=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)]['ActionCountAbbr'],TextManager[_0x37c6a0(0x2cd)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x233)],TextManager[_0x37c6a0(0x1f8)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x321)],TextManager[_0x37c6a0(0x2f9)]=VisuMZ['BattleSystemFTB']['Settings']['General'][_0x37c6a0(0x2ce)],SceneManager[_0x37c6a0(0x303)]=function(){const _0x1e76bf=_0x37c6a0;return this['_scene']&&this[_0x1e76bf(0x3a1)][_0x1e76bf(0x2b4)]===Scene_Battle;},BattleManager[_0x37c6a0(0x38d)]=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x23b)],BattleManager[_0x37c6a0(0x3ab)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)]['Mechanics'][_0x37c6a0(0x2d1)],BattleManager['_FTB_RESET_INDEX']=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)]['Mechanics'][_0x37c6a0(0x2f8)]??![],BattleManager['_FTB_GUARD_PASS']=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x26d)],BattleManager[_0x37c6a0(0x3a3)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x205)],BattleManager[_0x37c6a0(0x316)]=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x288)],BattleManager[_0x37c6a0(0x20d)]=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x1f1)],BattleManager['_FTB_BETWEEN_TEAMS_WAIT']=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)]['TeamShiftWait'],BattleManager['_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS']=VisuMZ[_0x37c6a0(0x3ca)]['Settings'][_0x37c6a0(0x34d)][_0x37c6a0(0x262)],VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x258)]=BattleManager['battleSys'],BattleManager[_0x37c6a0(0x312)]=function(){const _0x26d663=_0x37c6a0;if(this[_0x26d663(0x23a)]())return'FTB';return VisuMZ[_0x26d663(0x3ca)][_0x26d663(0x258)][_0x26d663(0x3be)](this);},BattleManager[_0x37c6a0(0x23a)]=function(){const _0x12141c=_0x37c6a0;return $gameSystem[_0x12141c(0x3ce)]()==='FTB';},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x3b8)]=BattleManager[_0x37c6a0(0x371)],BattleManager[_0x37c6a0(0x371)]=function(){const _0x403d52=_0x37c6a0;if(this[_0x403d52(0x23a)]())return![];return VisuMZ['BattleSystemFTB'][_0x403d52(0x3b8)][_0x403d52(0x3be)](this);},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x261)]=BattleManager[_0x37c6a0(0x298)],BattleManager[_0x37c6a0(0x298)]=function(){const _0x2aa1ad=_0x37c6a0;if(this[_0x2aa1ad(0x23a)]())return![];return VisuMZ[_0x2aa1ad(0x3ca)][_0x2aa1ad(0x261)]['call'](this);},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x2de)]=BattleManager[_0x37c6a0(0x242)],BattleManager[_0x37c6a0(0x242)]=function(){const _0x21c5b8=_0x37c6a0;if(this[_0x21c5b8(0x23a)]())return!![];return VisuMZ['BattleSystemFTB'][_0x21c5b8(0x2de)]['call'](this);},VisuMZ[_0x37c6a0(0x3ca)]['BattleManager_isTeamBased']=BattleManager['isTeamBased'],BattleManager[_0x37c6a0(0x302)]=function(){const _0x337c8a=_0x37c6a0;if(this[_0x337c8a(0x23a)]())return!![];return VisuMZ[_0x337c8a(0x3ca)][_0x337c8a(0x2f2)][_0x337c8a(0x3be)](this);},VisuMZ[_0x37c6a0(0x3ca)]['BattleManager_startInput']=BattleManager['startInput'],BattleManager[_0x37c6a0(0x35b)]=function(){const _0xdc8e1a=_0x37c6a0;if(this['isFTB']())this[_0xdc8e1a(0x2b7)]=![];VisuMZ[_0xdc8e1a(0x3ca)]['BattleManager_startInput'][_0xdc8e1a(0x3be)](this);if(this[_0xdc8e1a(0x23a)]()&&$gameParty['canInput']())this[_0xdc8e1a(0x339)]();},BattleManager[_0x37c6a0(0x339)]=function(){this['startTurn']();},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x3d2)]=BattleManager[_0x37c6a0(0x27b)],BattleManager[_0x37c6a0(0x27b)]=function(){const _0x1b228b=_0x37c6a0;if(this['isFTB']()){if('SdpPf'!=='SdpPf'){let _0x388ac5=_0x14d433['ftbAliveMembers']()[_0x1b228b(0x396)](_0x405b28=>_0x405b28[_0x1b228b(0x294)]());_0xd6cb04['isSideView']()?_0x388ac5['sort']((_0x1759de,_0x5c6d43)=>_0x5c6d43[_0x1b228b(0x254)]()-_0x1759de[_0x1b228b(0x254)]()):_0x388ac5['sort']((_0x2f81a7,_0x3b8a71)=>_0x2f81a7[_0x1b228b(0x254)]()-_0x3b8a71[_0x1b228b(0x254)]());_0x225ffc=_0x5ca2da[_0x1b228b(0x24d)];while(_0x34641f--){_0x7a5037=_0xa781da[_0x1b228b(0x21c)](_0x388ac5);}_0x5e976e['makeActions']();}else this[_0x1b228b(0x3b3)]();}else VisuMZ[_0x1b228b(0x3ca)][_0x1b228b(0x3d2)][_0x1b228b(0x3be)](this);},BattleManager['processTurnFTB']=function(){const _0x47ca65=_0x37c6a0,_0x5ce7e0=this[_0x47ca65(0x21d)];if(_0x5ce7e0&&!_0x5ce7e0[_0x47ca65(0x287)]()[_0x47ca65(0x2f7)]())_0x47ca65(0x35c)!==_0x47ca65(0x392)?(this['endAction'](),this[_0x47ca65(0x21d)]=null,this[_0x47ca65(0x35f)](![])):_0x4eeeb0=_0x25b7ef+this[_0x47ca65(0x2d8)]()+_0x3604fe;else{if(_0x5ce7e0&&_0x5ce7e0[_0x47ca65(0x355)]()&&_0x5ce7e0[_0x47ca65(0x1f6)]()){const _0x2ec01d=_0x5ce7e0['currentAction']();if(!_0x2ec01d)VisuMZ['BattleSystemFTB'][_0x47ca65(0x3d2)][_0x47ca65(0x3be)](this);else{if(_0x2ec01d[_0x47ca65(0x317)]){if('LYlrm'!=='NuirD')VisuMZ[_0x47ca65(0x3ca)][_0x47ca65(0x3d2)][_0x47ca65(0x3be)](this);else{this[_0x47ca65(0x2e1)]=!![];let _0x12e263=0x0,_0x254bb2=this[_0x47ca65(0x34e)]()[_0x47ca65(0x396)](_0x328869=>_0x328869['canMove']());_0x12e263=_0x254bb2[_0x47ca65(0x373)]((_0x372cd3,_0x8b0dd4)=>_0x372cd3+_0x8b0dd4[_0x47ca65(0x2ba)](),_0x12e263),_0x12e263=_0x12e263[_0x47ca65(0x3cb)](_0x419489['_FTB_MIN_ACTIONS'],_0x5ace22['_FTB_MAX_ACTIONS']),this[_0x47ca65(0x2d7)]=_0x12e263;}}else{if('jZLKm'===_0x47ca65(0x2ea))return this['_scene']&&this[_0x47ca65(0x3a1)]['constructor']===_0x254f56;else this[_0x47ca65(0x3bc)]=_0x5ce7e0,this[_0x47ca65(0x3c8)]();}}}else VisuMZ[_0x47ca65(0x3ca)]['BattleManager_processTurn'][_0x47ca65(0x3be)](this);}},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x2a3)]=BattleManager['finishActorInput'],BattleManager[_0x37c6a0(0x1fe)]=function(){const _0x5ac60f=_0x37c6a0;if(this['isFTB']())VisuMZ[_0x5ac60f(0x3ca)]['BattleManager_processTurn'][_0x5ac60f(0x3be)](this);else{if('sDeXU'===_0x5ac60f(0x2c7)){if(this['_bypassStateTurnUpdatesFTB'])return;_0x572c30[_0x5ac60f(0x3ca)]['Game_BattlerBase_updateStateTurns'][_0x5ac60f(0x3be)](this);}else VisuMZ[_0x5ac60f(0x3ca)]['BattleManager_finishActorInput'][_0x5ac60f(0x3be)](this);}},VisuMZ[_0x37c6a0(0x3ca)]['BattleManager_selectNextActor']=BattleManager['selectNextActor'],BattleManager[_0x37c6a0(0x378)]=function(){const _0x471d27=_0x37c6a0;this[_0x471d27(0x23a)]()?this[_0x471d27(0x391)]():_0x471d27(0x2fc)===_0x471d27(0x2fc)?VisuMZ[_0x471d27(0x3ca)]['BattleManager_selectNextActor'][_0x471d27(0x3be)](this):_0xd3fc71=_0x3c75fc[_0x471d27(0x21c)](_0x365ecc);},BattleManager[_0x37c6a0(0x391)]=function(){const _0x54ab82=_0x37c6a0;this[_0x54ab82(0x3bc)]=null,this[_0x54ab82(0x30c)]=![];},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x33a)]=BattleManager[_0x37c6a0(0x3c0)],BattleManager[_0x37c6a0(0x3c0)]=function(){const _0x4971ea=_0x37c6a0,_0x5d0593=this['_subject'];VisuMZ[_0x4971ea(0x3ca)][_0x4971ea(0x33a)][_0x4971ea(0x3be)](this),this['endActionFTB'](_0x5d0593);},BattleManager[_0x37c6a0(0x282)]=function(_0x41726b){const _0x5a834c=_0x37c6a0;if(!this[_0x5a834c(0x23a)]())return;_0x41726b&&(_0x5a834c(0x216)!==_0x5a834c(0x216)?this[_0x5a834c(0x274)]():_0x41726b[_0x5a834c(0x26c)]());if(this[_0x5a834c(0x31b)][_0x5a834c(0x246)]>0x0)'mMrUI'==='UpEXz'?_0x418d97[_0x5a834c(0x3ca)]['BattleManager_makeActionOrders']['call'](this):(this['_subject']&&(!this[_0x5a834c(0x26b)][_0x5a834c(0x2c4)](this['_subject'])&&this[_0x5a834c(0x26b)][_0x5a834c(0x2f5)](this['_subject'])),this[_0x5a834c(0x21d)]=this[_0x5a834c(0x2ec)]());else this['keepPrevSubjectFTB'](_0x41726b)&&(this[_0x5a834c(0x21d)]=_0x41726b);_0x41726b[_0x5a834c(0x287)]()[_0x5a834c(0x32b)](_0x41726b);},BattleManager[_0x37c6a0(0x398)]=function(_0x57feb4){const _0x39c58b=_0x37c6a0;if(!_0x57feb4)return![];if(!_0x57feb4['isActor']())return![];if(!_0x57feb4[_0x39c58b(0x294)]())return![];if(!_0x57feb4['canInput']())return![];if(_0x57feb4[_0x39c58b(0x28e)]())return![];return BattleManager[_0x39c58b(0x38d)]&&BattleManager[_0x39c58b(0x3ab)];},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x1f3)]=BattleManager[_0x37c6a0(0x2ab)],BattleManager['startBattle']=function(){const _0x316f84=_0x37c6a0;VisuMZ[_0x316f84(0x3ca)][_0x316f84(0x1f3)]['call'](this),this[_0x316f84(0x28c)]();},BattleManager[_0x37c6a0(0x28c)]=function(){const _0xce9653=_0x37c6a0;if(!this[_0xce9653(0x23a)]())return;if(this[_0xce9653(0x2cb)])this[_0xce9653(0x286)]=_0xce9653(0x21f);else{if(this[_0xce9653(0x2b7)])this[_0xce9653(0x286)]=_0xce9653(0x23c);else{if(_0xce9653(0x1fd)===_0xce9653(0x22f))return this[_0xce9653(0x251)]||0x0;else this['_ftbTurnAdvantageUnit']=BattleManager[_0xce9653(0x20d)];}}this['_ftbTurnAdvantageUnit']=this[_0xce9653(0x286)]||'random';let _0x2efcce=0x0,_0x18fd63=0x0;switch(this['_ftbTurnAdvantageUnit'][_0xce9653(0x250)]()[_0xce9653(0x230)]()){case _0xce9653(0x348):let _0x5ca517=[_0xce9653(0x21f),_0xce9653(0x23c)];this[_0xce9653(0x286)]=_0x5ca517[Math[_0xce9653(0x368)](_0x5ca517['length'])];break;case _0xce9653(0x2bd):this[_0xce9653(0x286)]=_0xce9653(0x21f);break;case _0xce9653(0x29a):this[_0xce9653(0x286)]=_0xce9653(0x23c);break;case _0xce9653(0x3b0):_0x2efcce=$gameParty[_0xce9653(0x27d)](),_0x18fd63=$gameTroop[_0xce9653(0x27d)](),this[_0xce9653(0x286)]=_0x2efcce>=_0x18fd63?_0xce9653(0x21f):_0xce9653(0x23c);break;case'average\x20agi':_0x2efcce=$gameParty['agility'](),_0x18fd63=$gameTroop[_0xce9653(0x31d)](),this[_0xce9653(0x286)]=_0x2efcce>=_0x18fd63?_0xce9653(0x21f):_0xce9653(0x23c);break;case'highest\x20agi':_0x2efcce=$gameParty[_0xce9653(0x349)](),_0x18fd63=$gameTroop['ftbHighestAgility'](),this[_0xce9653(0x286)]=_0x2efcce>=_0x18fd63?_0xce9653(0x21f):_0xce9653(0x23c);break;case _0xce9653(0x3a0):_0x2efcce=$gameParty['ftbTotalAgility'](),_0x18fd63=$gameTroop[_0xce9653(0x379)](),this[_0xce9653(0x286)]=_0x2efcce>=_0x18fd63?'actors':_0xce9653(0x23c);break;}this[_0xce9653(0x235)]=this['_ftbTurnAdvantageUnit']===_0xce9653(0x21f)?$gameParty:$gameTroop,this['_ftbTeamEven']=this[_0xce9653(0x286)]===_0xce9653(0x21f)?$gameTroop:$gameParty;},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x285)]=BattleManager['makeActionOrders'],BattleManager[_0x37c6a0(0x2b1)]=function(){const _0x33f692=_0x37c6a0;if(this['isFTB']())this[_0x33f692(0x387)]();else{if(_0x33f692(0x218)==='yoklo'){this['_unit']=null,this['_currentActions']=0x0,this['_maxActions']=0x0;const _0x2522c2=_0x4745f8[_0x33f692(0x30b)];this[_0x33f692(0x253)]={'ActorPicture':_0x2522c2[_0x33f692(0x39d)]?_0x2b926f['loadPicture'](_0x2522c2[_0x33f692(0x39d)]):'','EnemyPicture':_0x2522c2['EnemyActionPicture']?_0x1499c9[_0x33f692(0x206)](_0x2522c2[_0x33f692(0x352)]):'','EmptyPicture':_0x2522c2['EmptyActionPicture']?_0x13e4a6[_0x33f692(0x206)](_0x2522c2[_0x33f692(0x271)]):''};}else VisuMZ['BattleSystemFTB'][_0x33f692(0x285)][_0x33f692(0x3be)](this);}},BattleManager[_0x37c6a0(0x387)]=function(){const _0x1cb5ed=_0x37c6a0;let _0x26e51f=[],_0xd28026=[],_0x351980=0x0;const _0x405b2f=$gameTroop[_0x1cb5ed(0x297)]();let _0x2f7c36=_0x405b2f%0x2===0x0?this[_0x1cb5ed(0x2c8)]:this[_0x1cb5ed(0x235)];this['_ftbCurrentUnit']=_0x2f7c36;if(_0x2f7c36===$gameParty){let _0x3b9fb7=$gameParty[_0x1cb5ed(0x20f)]()[_0x1cb5ed(0x396)](_0x1e0e15=>_0x1e0e15[_0x1cb5ed(0x294)]()&&!_0x1e0e15['canInput']()),_0x3a3119=$gameParty[_0x1cb5ed(0x20f)]()[_0x1cb5ed(0x396)](_0x4f7452=>_0x4f7452[_0x1cb5ed(0x294)]()&&_0x4f7452[_0x1cb5ed(0x1f6)]());_0x26e51f=_0x26e51f[_0x1cb5ed(0x21c)](_0x3b9fb7),_0x351980=Game_Unit['_FTB_MAX_ACTIONS'];while(_0x351980--){_0x26e51f=_0x26e51f[_0x1cb5ed(0x21c)](_0x3a3119);}_0x351980=Game_Unit[_0x1cb5ed(0x24d)]-0x1;while(_0x351980--){_0x26e51f=_0x26e51f[_0x1cb5ed(0x21c)](_0x3b9fb7);}}if(_0x2f7c36===$gameTroop){if(_0x1cb5ed(0x263)===_0x1cb5ed(0x342)){const _0x374c15=this['members']();return _0x53afa1['min'](..._0x374c15[_0x1cb5ed(0x3c4)](_0x5e257e=>_0x5e257e[_0x1cb5ed(0x3c5)]));}else{let _0x43cce2=$gameTroop[_0x1cb5ed(0x20f)]()[_0x1cb5ed(0x396)](_0x2895af=>_0x2895af[_0x1cb5ed(0x294)]());$gameSystem[_0x1cb5ed(0x330)]()?_0x1cb5ed(0x36b)==='VqsrR'?(this[_0x1cb5ed(0x3c0)](),this['_subject']=null,this[_0x1cb5ed(0x35f)](![])):_0x43cce2[_0x1cb5ed(0x37d)]((_0x383c01,_0x4e555a)=>_0x4e555a['screenX']()-_0x383c01[_0x1cb5ed(0x254)]()):_0x43cce2[_0x1cb5ed(0x37d)]((_0x22b342,_0x4cec3)=>_0x22b342[_0x1cb5ed(0x254)]()-_0x4cec3[_0x1cb5ed(0x254)]());_0x351980=Game_Unit[_0x1cb5ed(0x24d)];while(_0x351980--){_0x1cb5ed(0x3a7)!==_0x1cb5ed(0x3a7)?(this[_0x1cb5ed(0x353)](),this[_0x1cb5ed(0x359)](this[_0x1cb5ed(0x213)]())):_0xd28026=_0xd28026[_0x1cb5ed(0x21c)](_0x43cce2);}$gameTroop[_0x1cb5ed(0x26c)]();}}this[_0x1cb5ed(0x26b)]=_0x26e51f['concat'](_0xd28026);},BattleManager[_0x37c6a0(0x367)]=function(){const _0x494173=_0x37c6a0;if(!this[_0x494173(0x23a)]())return;this[_0x494173(0x26b)]=this['_actionBattlers']||[],this[_0x494173(0x26b)]=this[_0x494173(0x26b)][_0x494173(0x396)](_0x310409=>_0x310409[_0x494173(0x294)]()&&!_0x310409[_0x494173(0x28e)]());},VisuMZ[_0x37c6a0(0x3ca)]['BattleManager_setup']=BattleManager['setup'],BattleManager[_0x37c6a0(0x2e0)]=function(_0x28dceb,_0x31a4db,_0x21ad54){const _0x45917d=_0x37c6a0;VisuMZ[_0x45917d(0x3ca)][_0x45917d(0x38f)][_0x45917d(0x3be)](this,_0x28dceb,_0x31a4db,_0x21ad54),this[_0x45917d(0x237)]();},BattleManager[_0x37c6a0(0x237)]=function(){const _0xbdfcb5=_0x37c6a0;if(!BattleManager[_0xbdfcb5(0x23a)]())return;this['_ftbCurrentUnit']=undefined,$gameParty[_0xbdfcb5(0x244)](),$gameTroop[_0xbdfcb5(0x244)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x2c9)]=BattleManager[_0x37c6a0(0x274)],BattleManager[_0x37c6a0(0x274)]=function(){const _0x40d2fc=_0x37c6a0;this[_0x40d2fc(0x244)](),VisuMZ['BattleSystemFTB'][_0x40d2fc(0x2c9)][_0x40d2fc(0x3be)](this),this[_0x40d2fc(0x2b0)]();},BattleManager[_0x37c6a0(0x244)]=function(){const _0x4f8b93=_0x37c6a0;if(!BattleManager[_0x4f8b93(0x23a)]())return;$gameParty[_0x4f8b93(0x2b8)](),$gameTroop[_0x4f8b93(0x2b8)]();const _0x1a7297=$gameTroop[_0x4f8b93(0x297)]()+0x1;let _0x13d0e7=_0x1a7297%0x2===0x0?this[_0x4f8b93(0x2c8)]:this[_0x4f8b93(0x235)],_0x5837d4=_0x1a7297%0x2===0x0?this[_0x4f8b93(0x235)]:this[_0x4f8b93(0x2c8)];_0x1a7297>0x1&&_0x5837d4[_0x4f8b93(0x245)](),_0x13d0e7[_0x4f8b93(0x2ae)](),_0x13d0e7[_0x4f8b93(0x244)]();},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x3c1)]=BattleManager[_0x37c6a0(0x207)],BattleManager[_0x37c6a0(0x207)]=function(){const _0x365f5a=_0x37c6a0;VisuMZ[_0x365f5a(0x3ca)][_0x365f5a(0x3c1)][_0x365f5a(0x3be)](this),this[_0x365f5a(0x2ee)]();},BattleManager[_0x37c6a0(0x2ee)]=function(){const _0x23e90e=_0x37c6a0;if(!BattleManager[_0x23e90e(0x23a)]())return;},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x3b2)]=BattleManager[_0x37c6a0(0x2e6)],BattleManager['endAllBattlersTurn']=function(){const _0x179c19=_0x37c6a0;if(this[_0x179c19(0x23a)]())return;VisuMZ[_0x179c19(0x3ca)][_0x179c19(0x3b2)]['call'](this);},BattleManager[_0x37c6a0(0x2b0)]=function(){const _0x5361fe=_0x37c6a0;if(!BattleManager['isFTB']())return;let _0x132aa6='';if(this[_0x5361fe(0x225)]===$gameParty){let _0x4463db=$gameParty[_0x5361fe(0x2df)]();_0x132aa6=TextManager[_0x5361fe(0x1f8)][_0x5361fe(0x2ad)](_0x4463db);}else _0x5361fe(0x283)==='GeNdb'?_0x132aa6=TextManager[_0x5361fe(0x2f9)]:this[_0x5361fe(0x1f4)]()?this['ftbSwitchActorDirection'](![]):_0x3133f0['BattleSystemFTB'][_0x5361fe(0x34c)]['call'](this);if(_0x132aa6!==''){this[_0x5361fe(0x2bf)][_0x5361fe(0x21b)](_0x5361fe(0x281),_0x132aa6);const _0x302598=BattleManager[_0x5361fe(0x273)];this[_0x5361fe(0x2bf)][_0x5361fe(0x21b)](_0x5361fe(0x22b),_0x302598),this['_logWindow'][_0x5361fe(0x21b)](_0x5361fe(0x32c));}},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x25a)]=Game_System[_0x37c6a0(0x25e)][_0x37c6a0(0x2a8)],Game_System[_0x37c6a0(0x25e)][_0x37c6a0(0x2a8)]=function(){const _0x12274e=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0x12274e(0x25a)][_0x12274e(0x3be)](this),this[_0x12274e(0x3a8)]();},Game_System[_0x37c6a0(0x25e)][_0x37c6a0(0x3a8)]=function(){const _0x4b1762=_0x37c6a0;this[_0x4b1762(0x22e)]=!![];},Game_System[_0x37c6a0(0x25e)]['isBattleSystemFTBActionCountVisible']=function(){const _0x3d4ba3=_0x37c6a0;if(BattleManager[_0x3d4ba3(0x336)]===_0x3d4ba3(0x35d))return![];if(this[_0x3d4ba3(0x22e)]===undefined){if(_0x3d4ba3(0x279)!==_0x3d4ba3(0x279)){if(!_0x47bece['isFTB']())return;const _0x415000=this['getChildIndex'](this['_windowLayer']);this[_0x3d4ba3(0x2cc)]=new _0x42a90a(),this[_0x3d4ba3(0x2cc)]['setUnit'](_0x18cd3b),this['addChildAt'](this['_ftbTroopActionCountWindow'],_0x415000),this[_0x3d4ba3(0x38e)]=new _0xb65bf1(),this['_ftbPartyActionCountWindow'][_0x3d4ba3(0x365)](_0x236a2e),this['addChildAt'](this['_ftbPartyActionCountWindow'],_0x415000),this['repositionLogWindowFTB']();}else this[_0x3d4ba3(0x3a8)]();}return this[_0x3d4ba3(0x22e)];},Game_System['prototype'][_0x37c6a0(0x241)]=function(_0x402a9d){const _0x1f2a1f=_0x37c6a0;if(this[_0x1f2a1f(0x22e)]===undefined){if(_0x1f2a1f(0x201)===_0x1f2a1f(0x27f))return _0x5cad9d[_0x1f2a1f(0x27a)];else this[_0x1f2a1f(0x3a8)]();}this[_0x1f2a1f(0x22e)]=_0x402a9d;},VisuMZ['BattleSystemFTB']['Game_Action_speed']=Game_Action['prototype']['speed'],Game_Action['prototype'][_0x37c6a0(0x284)]=function(){const _0x57d169=_0x37c6a0;if(BattleManager[_0x57d169(0x23a)]()){if(_0x57d169(0x231)===_0x57d169(0x231))return 0x0;else this[_0x57d169(0x313)]()[_0x57d169(0x278)]();}else{if('uejND'!==_0x57d169(0x2a2))return VisuMZ[_0x57d169(0x3ca)][_0x57d169(0x2a1)][_0x57d169(0x3be)](this);else{const _0x39c0bd=_0x57d169(0x296);_0x46e2de?_0x581e92[_0x57d169(0x21b)](_0x39c0bd):_0x4a41fd['unshift'](_0x39c0bd);}}},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x34a)]=Game_Action[_0x37c6a0(0x25e)]['applyGlobal'],Game_Action[_0x37c6a0(0x25e)][_0x37c6a0(0x28a)]=function(){const _0x476041=_0x37c6a0;VisuMZ[_0x476041(0x3ca)][_0x476041(0x34a)]['call'](this),this[_0x476041(0x2e9)]();},Game_Action['prototype'][_0x37c6a0(0x2e9)]=function(){const _0x32334c=_0x37c6a0;if(!BattleManager['isFTB']())return;if(!this[_0x32334c(0x313)]())return;if(!this['item']())return;this['isSkill']()&&this[_0x32334c(0x374)]()['id']===this['subject']()['guardSkillId']()&&('gTVUq'===_0x32334c(0x354)?this[_0x32334c(0x264)]=0x0:BattleManager[_0x32334c(0x375)]&&this[_0x32334c(0x313)]()['passTurnFTB']());const _0x2c3b42=VisuMZ[_0x32334c(0x3ca)][_0x32334c(0x25b)],_0x3f7893=this['item']()[_0x32334c(0x249)];_0x3f7893['match'](_0x2c3b42[_0x32334c(0x383)])&&this[_0x32334c(0x313)]()['passTurnFTB']();},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x3ae)]=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x23e)],Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x23e)]=function(){const _0x28649d=_0x37c6a0;VisuMZ['BattleSystemFTB']['Game_BattlerBase_hide'][_0x28649d(0x3be)](this),BattleManager[_0x28649d(0x367)](),this[_0x28649d(0x287)]()[_0x28649d(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x30e)],Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x30e)]=function(){const _0x84d494=_0x37c6a0;VisuMZ[_0x84d494(0x3ca)]['Game_BattlerBase_appear']['call'](this),BattleManager[_0x84d494(0x367)](),this[_0x84d494(0x287)]()[_0x84d494(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x357)]=Game_Battler['prototype'][_0x37c6a0(0x2a5)],Game_Battler['prototype']['performCollapse']=function(){const _0x4a31d3=_0x37c6a0;VisuMZ[_0x4a31d3(0x3ca)][_0x4a31d3(0x357)][_0x4a31d3(0x3be)](this),BattleManager[_0x4a31d3(0x367)](),this[_0x4a31d3(0x287)]()[_0x4a31d3(0x226)]();},Game_BattlerBase[_0x37c6a0(0x25e)]['passTurnFTB']=function(){this['_passedTurnFTB']=!![],BattleManager['removeActionBattlersFTB']();},Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x28e)]=function(){const _0x1b0c44=_0x37c6a0;return!!this[_0x1b0c44(0x2c1)];},Game_BattlerBase[_0x37c6a0(0x276)]=VisuMZ[_0x37c6a0(0x3ca)]['Settings'][_0x37c6a0(0x34d)]['GenerateBase'],Game_BattlerBase[_0x37c6a0(0x293)]=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x393)],Game_BattlerBase[_0x37c6a0(0x2b3)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)]['AgiDebuff'],Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x2ba)]=function(){const _0x2dc30e=_0x37c6a0;let _0x525b51=Game_BattlerBase[_0x2dc30e(0x276)];if(this[_0x2dc30e(0x2be)]===undefined)this[_0x2dc30e(0x269)]();const _0x1295e5=this['_buffs'][0x6]||0x0;if(_0x1295e5>0x0&&Game_BattlerBase[_0x2dc30e(0x293)])_0x2dc30e(0x2fd)!==_0x2dc30e(0x2fd)?(_0x15bceb[_0x2dc30e(0x3ca)][_0x2dc30e(0x2f0)][_0x2dc30e(0x3be)](this),_0x47655b['isFTB']()&&this[_0x2dc30e(0x345)]()):_0x525b51+=_0x1295e5;else _0x1295e5<0x0&&Game_BattlerBase[_0x2dc30e(0x2b3)]&&(_0x525b51+=_0x1295e5);const _0x526532=VisuMZ[_0x2dc30e(0x3ca)]['RegExp'],_0x55ec71=this['traitObjects']();for(const _0x14472f of _0x55ec71){if(!_0x14472f)continue;const _0x21e426=_0x14472f['note'];_0x21e426[_0x2dc30e(0x33f)](_0x526532[_0x2dc30e(0x215)])&&(_0x525b51+=Number(RegExp['$1']));}return Math[_0x2dc30e(0x2ac)](0x0,_0x525b51);},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x26f)]=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x3a5)],Game_BattlerBase['prototype'][_0x37c6a0(0x3a5)]=function(){const _0x34bfe0=_0x37c6a0;VisuMZ[_0x34bfe0(0x3ca)][_0x34bfe0(0x26f)][_0x34bfe0(0x3be)](this),this[_0x34bfe0(0x287)]()[_0x34bfe0(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x382)]=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x3aa)],Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x3aa)]=function(_0x500d80){const _0x5bafc3=_0x37c6a0;if(SceneManager['isSceneBattle']()&&BattleManager[_0x5bafc3(0x23a)]()){const _0x1a143e=DataManager[_0x5bafc3(0x27e)](_0x500d80);if(_0x1a143e>this[_0x5bafc3(0x287)]()['getCurrentActionsFTB']())return![];}return VisuMZ['BattleSystemFTB'][_0x5bafc3(0x382)][_0x5bafc3(0x3be)](this,_0x500d80);},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x350)]=Game_Battler[_0x37c6a0(0x25e)]['useItem'],Game_Battler[_0x37c6a0(0x25e)]['useItem']=function(_0x174356){const _0x37330d=_0x37c6a0;VisuMZ[_0x37330d(0x3ca)][_0x37330d(0x350)][_0x37330d(0x3be)](this,_0x174356),this[_0x37330d(0x323)](_0x174356);},Game_Battler['prototype'][_0x37c6a0(0x323)]=function(_0x4ab942){const _0x1b324e=_0x37c6a0;if(!_0x4ab942)return;if(!SceneManager[_0x1b324e(0x303)]())return;if(!BattleManager[_0x1b324e(0x23a)]())return;const _0x5da5f7=BattleManager[_0x1b324e(0x329)];if(_0x5da5f7&&_0x5da5f7[_0x1b324e(0x317)])return;const _0x163023=DataManager['getActionCostFTB'](_0x4ab942);this[_0x1b324e(0x287)]()[_0x1b324e(0x377)](_0x163023);},VisuMZ[_0x37c6a0(0x3ca)]['Game_Battler_onTurnEnd']=Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x2db)],Game_Battler[_0x37c6a0(0x25e)]['onTurnEnd']=function(){const _0x4885ca=_0x37c6a0;this[_0x4885ca(0x268)]=BattleManager['isFTB']()&&BattleManager[_0x4885ca(0x39b)],VisuMZ[_0x4885ca(0x3ca)][_0x4885ca(0x2bc)][_0x4885ca(0x3be)](this),delete this[_0x4885ca(0x268)];},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x229)]=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x309)],Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x309)]=function(){const _0xe7e775=_0x37c6a0;if(this[_0xe7e775(0x268)])return;VisuMZ[_0xe7e775(0x3ca)][_0xe7e775(0x229)]['call'](this);},VisuMZ['BattleSystemFTB']['Game_BattlerBase_updateBuffTurns']=Game_BattlerBase[_0x37c6a0(0x25e)][_0x37c6a0(0x2b6)],Game_BattlerBase['prototype'][_0x37c6a0(0x2b6)]=function(){const _0x5e43d3=_0x37c6a0;if(this[_0x5e43d3(0x268)])return;VisuMZ[_0x5e43d3(0x3ca)]['Game_BattlerBase_updateBuffTurns'][_0x5e43d3(0x3be)](this);},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x2f3)]=Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x3a9)],Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x3a9)]=function(_0x557e0a){const _0x3e6842=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0x3e6842(0x2f3)][_0x3e6842(0x3be)](this,_0x557e0a),this[_0x3e6842(0x287)]()[_0x3e6842(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x369)]=Game_Battler['prototype'][_0x37c6a0(0x39e)],Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x39e)]=function(_0x3cd9b9){const _0xd1943e=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0xd1943e(0x369)]['call'](this,_0x3cd9b9),this[_0xd1943e(0x287)]()[_0xd1943e(0x226)]();},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x219)]=Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x34b)],Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x34b)]=function(_0x1153e5,_0x5d16b5){const _0xca259=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0xca259(0x219)][_0xca259(0x3be)](this,_0x1153e5,_0x5d16b5),this[_0xca259(0x287)]()[_0xca259(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x397)]=Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x3b4)],Game_Battler['prototype'][_0x37c6a0(0x3b4)]=function(_0x1f2a04,_0x50a010){const _0xaaaa46=_0x37c6a0;VisuMZ['BattleSystemFTB']['Game_Battler_addDebuff'][_0xaaaa46(0x3be)](this,_0x1f2a04,_0x50a010),this[_0xaaaa46(0x287)]()[_0xaaaa46(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x239)]=Game_Battler[_0x37c6a0(0x25e)]['removeBuff'],Game_Battler[_0x37c6a0(0x25e)][_0x37c6a0(0x24f)]=function(_0x3a33f7){const _0x3799c0=_0x37c6a0;VisuMZ[_0x3799c0(0x3ca)]['Game_Battler_removeBuff'][_0x3799c0(0x3be)](this,_0x3a33f7),this['friendsUnit']()[_0x3799c0(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x2aa)]=Game_Actor[_0x37c6a0(0x25e)]['selectNextCommand'],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x363)]=function(){const _0x122b47=_0x37c6a0;if(BattleManager[_0x122b47(0x23a)]()){if(this[_0x122b47(0x36d)]())this[_0x122b47(0x36d)]()['stepForward']();return![];}return VisuMZ[_0x122b47(0x3ca)][_0x122b47(0x2aa)][_0x122b47(0x3be)](this);},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x338)]=Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x361)],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x361)]=function(_0x4fda1e,_0xf53f54){const _0x1ff158=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0x1ff158(0x338)][_0x1ff158(0x3be)](this,_0x4fda1e,_0xf53f54),this[_0x1ff158(0x287)]()[_0x1ff158(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x2ff)],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x2ff)]=function(_0x14cae2,_0x3b76f3){const _0x5c09d1=_0x37c6a0;VisuMZ[_0x5c09d1(0x3ca)][_0x5c09d1(0x2fb)][_0x5c09d1(0x3be)](this,_0x14cae2,_0x3b76f3),this[_0x5c09d1(0x287)]()[_0x5c09d1(0x226)]();},VisuMZ['BattleSystemFTB']['Game_Actor_changeEquipById']=Game_Actor['prototype']['changeEquipById'],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x292)]=function(_0x8d2d32,_0x40de9c){const _0x2b153d=_0x37c6a0;VisuMZ[_0x2b153d(0x3ca)][_0x2b153d(0x325)][_0x2b153d(0x3be)](this,_0x8d2d32,_0x40de9c),this[_0x2b153d(0x287)]()[_0x2b153d(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x252)]=Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x2a7)],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x2a7)]=function(_0x433964){const _0x4c52ed=_0x37c6a0;VisuMZ[_0x4c52ed(0x3ca)]['Game_Actor_discardEquip']['call'](this,_0x433964),this[_0x4c52ed(0x287)]()[_0x4c52ed(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x3c2)]=Game_Actor[_0x37c6a0(0x25e)]['releaseUnequippableItems'],Game_Actor[_0x37c6a0(0x25e)]['releaseUnequippableItems']=function(_0x5ed442){const _0x116ffc=_0x37c6a0;VisuMZ[_0x116ffc(0x3ca)]['Game_Actor_releaseUnequippableItems'][_0x116ffc(0x3be)](this,_0x5ed442),this['friendsUnit']()[_0x116ffc(0x226)]();},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x223)]=Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x22a)],Game_Actor[_0x37c6a0(0x25e)][_0x37c6a0(0x22a)]=function(_0x4e8d21,_0x521ef1){const _0x171572=_0x37c6a0;VisuMZ[_0x171572(0x3ca)]['Game_Actor_changeClass'][_0x171572(0x3be)](this,_0x4e8d21,_0x521ef1),this['friendsUnit']()[_0x171572(0x226)]();},VisuMZ['BattleSystemFTB']['Game_Enemy_transform']=Game_Enemy['prototype'][_0x37c6a0(0x2b9)],Game_Enemy['prototype']['transform']=function(_0x447f06){const _0x28831c=_0x37c6a0;VisuMZ[_0x28831c(0x3ca)]['Game_Enemy_transform']['call'](this,_0x447f06),this['friendsUnit']()[_0x28831c(0x226)]();},Game_Unit[_0x37c6a0(0x24d)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x34d)][_0x37c6a0(0x351)],Game_Unit['_FTB_MIN_ACTIONS']=VisuMZ[_0x37c6a0(0x3ca)]['Settings'][_0x37c6a0(0x34d)][_0x37c6a0(0x275)],Game_Unit[_0x37c6a0(0x272)]=VisuMZ['BattleSystemFTB']['Settings'][_0x37c6a0(0x34d)][_0x37c6a0(0x290)],Game_Unit['prototype'][_0x37c6a0(0x244)]=function(){const _0x3f3a79=_0x37c6a0;this['createActionsFTB'](),this[_0x3f3a79(0x359)](this[_0x3f3a79(0x213)]());},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x353)]=function(){const _0xfef82e=_0x37c6a0;this['_inBattle']=!![];let _0x4515ed=0x0,_0x2abada=this[_0xfef82e(0x34e)]()['filter'](_0x149592=>_0x149592[_0xfef82e(0x294)]());_0x4515ed=_0x2abada[_0xfef82e(0x373)]((_0x54538b,_0x57522b)=>_0x54538b+_0x57522b[_0xfef82e(0x2ba)](),_0x4515ed),_0x4515ed=_0x4515ed[_0xfef82e(0x3cb)](Game_Unit[_0xfef82e(0x27c)],Game_Unit['_FTB_MAX_ACTIONS']),this[_0xfef82e(0x2d7)]=_0x4515ed;},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x226)]=function(){const _0x29e318=_0x37c6a0;if(!BattleManager[_0x29e318(0x23a)]())return;if(!$gameParty[_0x29e318(0x2e5)]())return;const _0xaa5e7=this[_0x29e318(0x213)]();this[_0x29e318(0x353)]();let _0x2ab828=this['getCurrentActionsFTB']();const _0x543385=this[_0x29e318(0x213)]()-_0xaa5e7;if(BattleManager[_0x29e318(0x3a3)]&&_0x543385>0x0)_0x2ab828+=_0x543385;if(BattleManager[_0x29e318(0x316)]&&_0x543385<0x0)_0x2ab828+=_0x543385;_0x2ab828=Math[_0x29e318(0x212)](_0x2ab828,Game_Unit[_0x29e318(0x24d)]),this[_0x29e318(0x359)](_0x2ab828);},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x3b9)]=function(){const _0x4e8ea2=_0x37c6a0;return this[_0x4e8ea2(0x251)]||0x0;},Game_Unit['prototype'][_0x37c6a0(0x359)]=function(_0x224d51){const _0x343162=_0x37c6a0;this['_ftbActionsCur']=Math[_0x343162(0x2ef)](_0x224d51)[_0x343162(0x3cb)](0x0,Game_Unit[_0x343162(0x24d)]),!Game_Unit['_FTB_ACTION_OVERFLOW']&&(this[_0x343162(0x251)]=Math[_0x343162(0x212)](this[_0x343162(0x251)],this['getMaxActionsFTB']()));},Game_Unit['prototype'][_0x37c6a0(0x35a)]=function(_0x20b44e){const _0x1d247b=_0x37c6a0;this[_0x1d247b(0x359)](this[_0x1d247b(0x3b9)]()+_0x20b44e);},Game_Unit[_0x37c6a0(0x25e)]['loseCurrentActionsFTB']=function(_0x5bac2d){const _0x53bbd6=_0x37c6a0;this[_0x53bbd6(0x35a)](-_0x5bac2d);},Game_Unit[_0x37c6a0(0x25e)]['getMaxActionsFTB']=function(){return this['_ftbActionsMax']||0x0;},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x2e8)]=function(_0x5f1262){const _0x31b890=_0x37c6a0;this[_0x31b890(0x2d7)]=_0x5f1262[_0x31b890(0x3cb)](Game_Unit[_0x31b890(0x27c)],Game_Unit[_0x31b890(0x24d)]);},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x377)]=function(_0x4963f4){const _0x2f2b2e=_0x37c6a0;this[_0x2f2b2e(0x29f)](_0x4963f4);},Game_Unit[_0x37c6a0(0x25e)]['canActFTB']=function(){const _0x10c791=_0x37c6a0;return this[_0x10c791(0x251)]=this[_0x10c791(0x251)]||0x0,this[_0x10c791(0x251)]>0x0;},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x245)]=function(){const _0x3cdf80=_0x37c6a0;for(const _0x540f68 of this[_0x3cdf80(0x2c6)]()){if(!_0x540f68)continue;_0x540f68[_0x3cdf80(0x2db)](),_0x540f68['startDamagePopup']();}},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x3bb)]=function(){const _0x1e5b96=_0x37c6a0;if(this[_0x1e5b96(0x3b9)]()<=0x0)return!![];if(!this[_0x1e5b96(0x34e)]()['some'](_0x3f213d=>_0x3f213d[_0x1e5b96(0x294)]()))return!![];return![];},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x2ae)]=function(){const _0x2437c4=_0x37c6a0;for(const _0x4ef8d4 of this[_0x2437c4(0x2c6)]()){if(!_0x4ef8d4)continue;_0x4ef8d4[_0x2437c4(0x309)](),_0x4ef8d4['removeStatesAuto'](0x2),_0x4ef8d4[_0x2437c4(0x2b6)](),_0x4ef8d4['startDamagePopup']();}},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x2b8)]=function(){const _0x473657=_0x37c6a0;for(const _0x5edf3 of this[_0x473657(0x2c6)]()){if('hdXzv'==='MXtQp'){const _0x50eb1d=_0x5c23bd(_0x28f3bf['$1']);_0x50eb1d!==_0x272aaa[_0x7ca1bb][_0x473657(0x1fb)]&&(_0x542cf1(_0x473657(0x315)[_0x473657(0x2ad)](_0x4656b1,_0x50eb1d)),_0xc792f7[_0x473657(0x224)]());}else{if(!_0x5edf3)continue;_0x5edf3[_0x473657(0x2c1)]=![];}}},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x27d)]=function(){const _0x503c22=_0x37c6a0,_0x4b7dad=this[_0x503c22(0x2c6)]();return Math[_0x503c22(0x212)](..._0x4b7dad[_0x503c22(0x3c4)](_0x59fde2=>_0x59fde2[_0x503c22(0x3c5)]));},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x349)]=function(){const _0x50710d=_0x37c6a0,_0x3119b2=this[_0x50710d(0x2c6)]();return Math[_0x50710d(0x2ac)](..._0x3119b2[_0x50710d(0x3c4)](_0x49267c=>_0x49267c[_0x50710d(0x3c5)]));},Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x379)]=function(){const _0x56bb39=_0x37c6a0,_0x521a2f=this['members']();return _0x521a2f[_0x56bb39(0x373)]((_0x1fdc7a,_0x364523)=>_0x1fdc7a+_0x364523[_0x56bb39(0x3c5)],0x0);},VisuMZ[_0x37c6a0(0x3ca)]['Game_Unit_onBattleStart']=Game_Unit[_0x37c6a0(0x25e)][_0x37c6a0(0x311)],Game_Unit['prototype'][_0x37c6a0(0x311)]=function(_0x25d636){const _0x5192e3=_0x37c6a0;VisuMZ[_0x5192e3(0x3ca)]['Game_Unit_onBattleStart']['call'](this,_0x25d636),BattleManager[_0x5192e3(0x23a)]()&&(_0x5192e3(0x394)!==_0x5192e3(0x394)?this['selectNextActorFTB']():this[_0x5192e3(0x264)]=0x0);},Game_Unit['prototype'][_0x37c6a0(0x20f)]=function(){const _0x31b9cd=_0x37c6a0,_0x31e297=this['aliveMembers']();if(BattleManager[_0x31b9cd(0x341)])return _0x31e297;if(BattleManager[_0x31b9cd(0x38d)])return _0x31e297;this['_ftbLastIndex']=this['_ftbLastIndex']||0x0;while(!_0x31e297[_0x31b9cd(0x32d)](_0x5a0ff3=>_0x5a0ff3[_0x31b9cd(0x23f)]()===this[_0x31b9cd(0x264)])){const _0x126659=this[_0x31b9cd(0x2c6)](),_0x517c3d=_0x126659[this[_0x31b9cd(0x264)]];let _0x448bc9=_0x126659['indexOf'](_0x517c3d)+0x1;if(_0x448bc9>=_0x126659['length'])_0x448bc9=0x0;this[_0x31b9cd(0x264)]=_0x448bc9;}for(;;){if(_0x31b9cd(0x243)===_0x31b9cd(0x3a4))_0x20327e[_0x31b9cd(0x3ca)][_0x31b9cd(0x31a)][_0x31b9cd(0x3be)](this);else{const _0x48c879=_0x31e297[0x0][_0x31b9cd(0x23f)]();if(_0x48c879===this['_ftbLastIndex'])break;_0x31e297['push'](_0x31e297[_0x31b9cd(0x203)]());}}return _0x31e297;},Game_Unit[_0x37c6a0(0x25e)]['setLastFtbIndex']=function(_0x5e7eff){const _0x18f3e4=_0x37c6a0;this[_0x18f3e4(0x264)]=_0x5e7eff?_0x5e7eff[_0x18f3e4(0x23f)]():0x0,this[_0x18f3e4(0x264)]++;},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x2f0)]=Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x356)],Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x356)]=function(){const _0x48e532=_0x37c6a0;VisuMZ[_0x48e532(0x3ca)]['Scene_Battle_createActorCommandWindow'][_0x48e532(0x3be)](this),BattleManager[_0x48e532(0x23a)]()&&(_0x48e532(0x25c)!==_0x48e532(0x25c)?(_0x346f1d['BattleSystemFTB'][_0x48e532(0x357)][_0x48e532(0x3be)](this),_0x547115[_0x48e532(0x367)](),this[_0x48e532(0x287)]()['recalculateActionsFTB']()):this[_0x48e532(0x345)]());},Scene_Battle[_0x37c6a0(0x25e)]['createActorCommandWindowFTB']=function(){const _0x49a298=_0x37c6a0,_0x1c5b56=this[_0x49a298(0x3d3)];this[_0x49a298(0x266)]()&&delete _0x1c5b56[_0x49a298(0x2d2)]['cancel'];},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x31e)]=Scene_Battle['prototype'][_0x37c6a0(0x36f)],Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x36f)]=function(){const _0x4fbd93=_0x37c6a0;if(BattleManager['isFTB']()){if(_0x4fbd93(0x3ac)!=='DrRYW')this['commandCancelFTB']();else{let _0x20b0bf=_0x598ac7['name']();_0x1570f4=_0x21d9c7[_0x4fbd93(0x1f8)][_0x4fbd93(0x2ad)](_0x20b0bf);}}else{if(_0x4fbd93(0x39a)===_0x4fbd93(0x236)){const _0x5095af=_0x3af026[_0x4fbd93(0x2a9)['format'](_0x2cfe43)];this[_0x4fbd93(0x3b1)](_0x5095af,_0x3b7263,_0x2b89f8),this[_0x4fbd93(0x3c7)](_0x4b148f)&&this['drawActionsRemaining'](_0x2777ec,_0x372978);}else VisuMZ[_0x4fbd93(0x3ca)][_0x4fbd93(0x31e)][_0x4fbd93(0x3be)](this);}},Scene_Battle[_0x37c6a0(0x25e)]['commandCancelFTB']=function(){const _0xcecf3b=_0x37c6a0;this[_0xcecf3b(0x333)][_0xcecf3b(0x2e0)](),this['_actorCommandWindow'][_0xcecf3b(0x335)]();},VisuMZ[_0x37c6a0(0x3ca)]['Scene_Battle_commandFight']=Scene_Battle[_0x37c6a0(0x25e)]['commandFight'],Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x248)]=function(){const _0x42d531=_0x37c6a0;BattleManager[_0x42d531(0x23a)]()?this['startActorCommandSelection']():_0x42d531(0x37b)===_0x42d531(0x37b)?VisuMZ[_0x42d531(0x3ca)][_0x42d531(0x1f0)][_0x42d531(0x3be)](this):(this[_0x42d531(0x3bc)]=null,this[_0x42d531(0x30c)]=![]);},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x39f)]=Scene_Battle['prototype'][_0x37c6a0(0x2cf)],Scene_Battle[_0x37c6a0(0x25e)]['createAllWindows']=function(){const _0x2cb7dc=_0x37c6a0;VisuMZ['BattleSystemFTB'][_0x2cb7dc(0x39f)][_0x2cb7dc(0x3be)](this),this[_0x2cb7dc(0x304)]();},Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x304)]=function(){const _0x53adca=_0x37c6a0;if(!BattleManager[_0x53adca(0x23a)]())return;const _0x198363=this[_0x53adca(0x380)](this['_windowLayer']);this['_ftbTroopActionCountWindow']=new Window_FTB_ActionCount(),this[_0x53adca(0x2cc)][_0x53adca(0x365)]($gameTroop),this[_0x53adca(0x314)](this[_0x53adca(0x2cc)],_0x198363),this[_0x53adca(0x38e)]=new Window_FTB_ActionCount(),this['_ftbPartyActionCountWindow'][_0x53adca(0x365)]($gameParty),this[_0x53adca(0x314)](this['_ftbPartyActionCountWindow'],_0x198363),this['repositionLogWindowFTB']();},Scene_Battle[_0x37c6a0(0x25e)][_0x37c6a0(0x3a2)]=function(){const _0x1f80eb=_0x37c6a0;if(!BattleManager[_0x1f80eb(0x23a)]())return;if(!this[_0x1f80eb(0x2bf)])return;const _0x435166=Window_FTB_ActionCount['Settings'];if(_0x435166[_0x1f80eb(0x2c5)])return;this[_0x1f80eb(0x2bf)]['y']+=_0x435166['LogWindowTopOffsetY'];},Window_Base[_0x37c6a0(0x326)]=VisuMZ['BattleSystemFTB'][_0x37c6a0(0x30b)]['General'][_0x37c6a0(0x1fc)],Window_Base[_0x37c6a0(0x360)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)]['ShowCostForAttack'],Window_Base['_FTB_COST_SHOW_GUARD']=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x31c)],Window_Base['_FTB_COST_SHOW_0']=VisuMZ[_0x37c6a0(0x3ca)]['Settings'][_0x37c6a0(0x385)][_0x37c6a0(0x2c0)],Window_Base[_0x37c6a0(0x24b)]=VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x30b)][_0x37c6a0(0x385)][_0x37c6a0(0x364)],VisuMZ[_0x37c6a0(0x3ca)]['Window_Base_makeAdditionalSkillCostText']=Window_Base['prototype'][_0x37c6a0(0x395)],Window_Base[_0x37c6a0(0x25e)][_0x37c6a0(0x395)]=function(_0x504f77,_0xc3d43a,_0x2ee3d7){const _0xa82e68=_0x37c6a0;return _0x2ee3d7=VisuMZ['BattleSystemFTB'][_0xa82e68(0x20b)][_0xa82e68(0x3be)](this,_0x504f77,_0xc3d43a,_0x2ee3d7),_0x2ee3d7=this[_0xa82e68(0x2fe)](_0x504f77,_0xc3d43a,_0x2ee3d7),_0x2ee3d7;},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x322)]=Window_Base['prototype'][_0x37c6a0(0x227)],Window_Base[_0x37c6a0(0x25e)][_0x37c6a0(0x227)]=function(_0x50caef,_0x4cf877,_0x3f2e95,_0x5e3a66){const _0x6437e7=_0x37c6a0;BattleManager['isFTB']()&&this['constructor']===Window_BattleItem?'aZEJa'===_0x6437e7(0x36e)?_0x89684e[_0x6437e7(0x23a)]()?this[_0x6437e7(0x270)]():_0x4deb8b[_0x6437e7(0x3ca)][_0x6437e7(0x31e)][_0x6437e7(0x3be)](this):this[_0x6437e7(0x21e)](_0x50caef,_0x4cf877,_0x3f2e95,_0x5e3a66):VisuMZ['BattleSystemFTB'][_0x6437e7(0x322)]['call'](this,_0x50caef,_0x4cf877,_0x3f2e95,_0x5e3a66),this[_0x6437e7(0x259)]();},Window_Base[_0x37c6a0(0x25e)][_0x37c6a0(0x21e)]=function(_0x9a2645,_0x567a9c,_0x46bd18,_0x42fdca){const _0x2e39bc=_0x37c6a0,_0x21c866=BattleManager['_actor']||$gameParty[_0x2e39bc(0x2c6)]()[0x0],_0x231575=this['makeAdditionalCostTextFTB'](_0x21c866,_0x9a2645,''),_0x5579aa=this[_0x2e39bc(0x389)](_0x231575)[_0x2e39bc(0x25f)],_0x522883=Window_Base['_FTB_COST_POSITION'];let _0x11ef4f=_0x567a9c+_0x42fdca-_0x5579aa;if(_0x231575==='')VisuMZ[_0x2e39bc(0x3ca)][_0x2e39bc(0x322)][_0x2e39bc(0x3be)](this,_0x9a2645,_0x567a9c,_0x46bd18,_0x42fdca);else{if(this[_0x2e39bc(0x2f6)](_0x9a2645)){this[_0x2e39bc(0x259)]();const _0x3ccd05=VisuMZ[_0x2e39bc(0x2d3)]['Settings']['ItemScene'];this['contents'][_0x2e39bc(0x35e)]=_0x3ccd05[_0x2e39bc(0x2da)];if(_0x522883){if('eXrEz'!=='TkrKB'){const _0x547ffb=_0x3ccd05[_0x2e39bc(0x217)],_0x2e8752=_0x547ffb['format']($gameParty[_0x2e39bc(0x232)](_0x9a2645)),_0x490cd7=this['textWidth'](_0x2e8752+this[_0x2e39bc(0x2d8)]());_0x11ef4f-=_0x490cd7;}else _0x371d7a[_0x2e39bc(0x2f5)](_0x30bf62);}else _0x42fdca-=this[_0x2e39bc(0x308)](this[_0x2e39bc(0x2d8)]())+_0x5579aa;VisuMZ[_0x2e39bc(0x3ca)][_0x2e39bc(0x322)][_0x2e39bc(0x3be)](this,_0x9a2645,_0x567a9c,_0x46bd18,_0x42fdca);}}this[_0x2e39bc(0x24a)](_0x231575,_0x11ef4f,_0x46bd18);},Window_Base[_0x37c6a0(0x25e)][_0x37c6a0(0x2fe)]=function(_0x1df745,_0x5c4573,_0x2757f3){const _0x4d78fa=_0x37c6a0;if(!BattleManager[_0x4d78fa(0x23a)]())return _0x2757f3;if(!_0x1df745)return _0x2757f3;if(!_0x5c4573)return _0x2757f3;if(_0x5c4573['note']['match'](VisuMZ[_0x4d78fa(0x3ca)][_0x4d78fa(0x25b)][_0x4d78fa(0x267)]))return _0x2757f3;let _0x169ab4=DataManager[_0x4d78fa(0x27e)](_0x5c4573);const _0x58b661=Window_Base[_0x4d78fa(0x326)],_0x13285b=Window_Base[_0x4d78fa(0x360)],_0x51c0c5=Window_Base[_0x4d78fa(0x2d9)],_0x250c09=Window_Base[_0x4d78fa(0x299)],_0x2358d6=Window_Base[_0x4d78fa(0x24b)];if(_0x5c4573['note'][_0x4d78fa(0x33f)](VisuMZ[_0x4d78fa(0x3ca)][_0x4d78fa(0x25b)][_0x4d78fa(0x2d5)])){if(_0x169ab4<0x0)return _0x2757f3;}else{if('ZMVtu'!=='ZMVtu')this[_0x4d78fa(0x331)]();else{if(DataManager['isSkill'](_0x5c4573)&&this[_0x4d78fa(0x2b4)]===Window_ActorCommand){if(!_0x13285b&&_0x5c4573['id']===_0x1df745[_0x4d78fa(0x384)]())return _0x2757f3;if(!_0x51c0c5&&_0x5c4573['id']===_0x1df745[_0x4d78fa(0x20a)]())return _0x2757f3;}if(_0x169ab4<0x0)return _0x2757f3;if(!_0x250c09&&_0x169ab4===0x0)return _0x2757f3;if(!_0x2358d6&&_0x169ab4===0x1)return _0x2757f3;}}const _0x1babf0=_0x4d78fa(0x29b)[_0x4d78fa(0x2ad)](ImageManager[_0x4d78fa(0x39c)]),_0xbc426f=TextManager['ftbActionPointsAbbr'];let _0x4e186c=TextManager[_0x4d78fa(0x2cd)][_0x4d78fa(0x2ad)](_0x169ab4,_0xbc426f,_0x1babf0);if(_0x2757f3==='')_0x4d78fa(0x3cc)!==_0x4d78fa(0x29c)?_0x2757f3+=_0x4e186c:(_0x1d66b7[_0x4d78fa(0x3ca)][_0x4d78fa(0x350)][_0x4d78fa(0x3be)](this,_0x17e221),this[_0x4d78fa(0x323)](_0x45c1ca));else _0x58b661?_0x2757f3=_0x4e186c+this[_0x4d78fa(0x2d8)]()+_0x2757f3:_0x4d78fa(0x386)===_0x4d78fa(0x238)?this[_0x4d78fa(0x35a)](-_0x4ea3cd):_0x2757f3=_0x2757f3+this[_0x4d78fa(0x2d8)]()+_0x4e186c;return _0x2757f3;},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x234)]=Window_Help[_0x37c6a0(0x25e)][_0x37c6a0(0x346)],Window_Help[_0x37c6a0(0x25e)]['setItem']=function(_0xec43fb){const _0x101533=_0x37c6a0;BattleManager[_0x101533(0x23a)]()&&_0xec43fb&&_0xec43fb[_0x101533(0x249)]&&_0xec43fb[_0x101533(0x249)]['match'](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x101533(0x23d)](String(RegExp['$1'])):_0x101533(0x3b5)!=='KqAkp'?VisuMZ['BattleSystemFTB']['Window_Help_setItem'][_0x101533(0x3be)](this,_0xec43fb):(this[_0x101533(0x268)]=_0x47564a['isFTB']()&&_0x46613a[_0x101533(0x39b)],_0x4a5f4f[_0x101533(0x3ca)][_0x101533(0x2bc)][_0x101533(0x3be)](this),delete this[_0x101533(0x268)]);},Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x1f4)]=function(){const _0x368086=_0x37c6a0;return this['constructor']===Window_ActorCommand&&BattleManager[_0x368086(0x23a)]()&&BattleManager[_0x368086(0x38d)];},VisuMZ['BattleSystemFTB']['Window_Selectable_cursorRight']=Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x300)],Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x300)]=function(_0x20e156){const _0x4d5e27=_0x37c6a0;this['ftbFreeRangeSwitch']()&&this[_0x4d5e27(0x376)]()===0x1?this[_0x4d5e27(0x343)](!![]):VisuMZ[_0x4d5e27(0x3ca)][_0x4d5e27(0x307)][_0x4d5e27(0x3be)](this,_0x20e156);},VisuMZ['BattleSystemFTB'][_0x37c6a0(0x2bb)]=Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x3ba)],Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x3ba)]=function(_0x2a7653){const _0x3e4e4e=_0x37c6a0;if(this[_0x3e4e4e(0x1f4)]()&&this[_0x3e4e4e(0x376)]()===0x1)this[_0x3e4e4e(0x343)](![]);else{if(_0x3e4e4e(0x20c)!==_0x3e4e4e(0x30f))VisuMZ[_0x3e4e4e(0x3ca)][_0x3e4e4e(0x2bb)]['call'](this,_0x2a7653);else{if(this[_0x3e4e4e(0x23a)]())this[_0x3e4e4e(0x2b7)]=![];_0x272af8[_0x3e4e4e(0x3ca)][_0x3e4e4e(0x26e)][_0x3e4e4e(0x3be)](this);if(this[_0x3e4e4e(0x23a)]()&&_0x157ce5['canInput']())this[_0x3e4e4e(0x339)]();}}},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x31a)]=Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x240)],Window_Selectable[_0x37c6a0(0x25e)]['cursorPagedown']=function(){const _0x418c4e=_0x37c6a0;this[_0x418c4e(0x1f4)]()?_0x418c4e(0x295)===_0x418c4e(0x295)?this[_0x418c4e(0x343)](!![]):!this['_actionBattlers'][_0x418c4e(0x2c4)](this['_subject'])&&this[_0x418c4e(0x26b)][_0x418c4e(0x2f5)](this['_subject']):_0x418c4e(0x33c)!==_0x418c4e(0x33c)?(_0x1852b7===this[_0x418c4e(0x23f)]()&&(this['_doubleTouch']=!![]),this['select'](_0x440e6f),_0x2c0152[_0x418c4e(0x347)](_0x156275,_0x181c16)):VisuMZ[_0x418c4e(0x3ca)][_0x418c4e(0x31a)][_0x418c4e(0x3be)](this);},VisuMZ[_0x37c6a0(0x3ca)][_0x37c6a0(0x34c)]=Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x344)],Window_Selectable[_0x37c6a0(0x25e)][_0x37c6a0(0x344)]=function(){const _0x315800=_0x37c6a0;this[_0x315800(0x1f4)]()?'uNOmi'!==_0x315800(0x33e)?(_0x8f29c8[_0x315800(0x3ca)]['Game_Battler_addBuff'][_0x315800(0x3be)](this,_0x2be9c0,_0x3f28cc),this[_0x315800(0x287)]()['recalculateActionsFTB']()):this['ftbSwitchActorDirection'](![]):VisuMZ[_0x315800(0x3ca)][_0x315800(0x34c)]['call'](this);},Window_ActorCommand[_0x37c6a0(0x25e)][_0x37c6a0(0x343)]=function(_0x1171ef){const _0x36e29f=_0x37c6a0,_0x51b38c=BattleManager[_0x36e29f(0x3bc)];let _0x4ec971=$gameParty[_0x36e29f(0x34f)]()[_0x36e29f(0x2dc)](_0x51b38c);const _0x1e58dc=$gameParty['battleMembers']()[_0x36e29f(0x246)]-0x1;let _0x3ccc2b=$gameParty['battleMembers']()[_0x4ec971];for(;;){_0x4ec971+=_0x1171ef?0x1:-0x1;if(_0x4ec971<0x0)_0x4ec971=_0x1e58dc;if(_0x4ec971>_0x1e58dc)_0x4ec971=0x0;_0x3ccc2b=$gameParty[_0x36e29f(0x34f)]()[_0x4ec971];if(_0x3ccc2b&&_0x3ccc2b['canInput']()&&!_0x3ccc2b[_0x36e29f(0x28e)]())break;if(_0x3ccc2b===_0x51b38c)break;}this[_0x36e29f(0x347)](_0x51b38c,_0x3ccc2b);},Window_ActorCommand[_0x37c6a0(0x25e)]['processSwitchActors']=function(_0x545caa,_0x5a36a7){const _0x24cedc=_0x37c6a0;if(_0x545caa===_0x5a36a7)return;if(_0x545caa['battler']())_0x545caa['battler']()[_0x24cedc(0x25d)]();this[_0x24cedc(0x2e2)](),BattleManager['_subject']=_0x5a36a7,BattleManager[_0x24cedc(0x3bc)]=_0x5a36a7,BattleManager['startActorInput'](),SceneManager[_0x24cedc(0x3a1)][_0x24cedc(0x211)]();},VisuMZ['BattleSystemFTB']['Window_Selectable_processTouch']=Window_Selectable[_0x37c6a0(0x25e)]['processTouch'],Window_Selectable[_0x37c6a0(0x25e)]['processTouch']=function(){const _0x38b3d8=_0x37c6a0;BattleManager['isFTB']()&&BattleManager['_FTB_FREE_CHANGE']&&this[_0x38b3d8(0x2b4)]===Window_BattleStatus?this[_0x38b3d8(0x331)]():VisuMZ[_0x38b3d8(0x3ca)]['Window_Selectable_processTouch'][_0x38b3d8(0x3be)](this);},Window_BattleStatus[_0x37c6a0(0x25e)][_0x37c6a0(0x331)]=function(){const _0x3f6429=_0x37c6a0;if(this[_0x3f6429(0x362)]()){if(_0x3f6429(0x280)===_0x3f6429(0x210)){const _0x410fd9=_0x2d18ce(_0x6c2f36['$1']);_0x410fd9<_0xdaefa9?(_0x5ee692(_0x3f6429(0x37e)[_0x3f6429(0x2ad)](_0x5c7301,_0x410fd9,_0x490232)),_0x252c73[_0x3f6429(0x224)]()):_0x16162c=_0x315c5b[_0x3f6429(0x2ac)](_0x410fd9,_0x3b2949);}else TouchInput['isTriggered']()&&this[_0x3f6429(0x372)](!![]);}},Window_BattleStatus[_0x37c6a0(0x25e)][_0x37c6a0(0x372)]=function(_0x10acb4){const _0x5dd021=_0x37c6a0,_0x3784dd=SceneManager[_0x5dd021(0x3a1)][_0x5dd021(0x3d3)];if(!_0x3784dd)return;if(!_0x3784dd[_0x5dd021(0x399)])return;this['_doubleTouch']=![];const _0x5d6091=this[_0x5dd021(0x23f)](),_0x3b0f73=this[_0x5dd021(0x3b7)]();if(_0x3b0f73>=0x0){if(_0x5dd021(0x1f5)===_0x5dd021(0x1f5)){const _0x46997b=$gameParty[_0x5dd021(0x34f)]()[_0x5d6091],_0x49752c=$gameParty[_0x5dd021(0x34f)]()[_0x3b0f73];this[_0x5dd021(0x38b)](_0x49752c)&&(_0x3b0f73===this[_0x5dd021(0x23f)]()&&(this[_0x5dd021(0x3c3)]=!![]),this[_0x5dd021(0x2f1)](_0x3b0f73),_0x3784dd[_0x5dd021(0x347)](_0x46997b,_0x49752c));}else this['setCurrentActionsFTB'](this[_0x5dd021(0x3b9)]()+_0x2402c6);}},Window_BattleStatus[_0x37c6a0(0x25e)][_0x37c6a0(0x38b)]=function(_0xf6d5b7){const _0x4e1bfd=_0x37c6a0;if(!_0xf6d5b7)return![];if(!_0xf6d5b7[_0x4e1bfd(0x294)]())return![];if(!_0xf6d5b7[_0x4e1bfd(0x1f6)]())return![];if(_0xf6d5b7['isPassingTurnFTB']())return![];return!![];};function Window_FTB_ActionCount(){const _0x1fee91=_0x37c6a0;this[_0x1fee91(0x2a8)](...arguments);}Window_FTB_ActionCount[_0x37c6a0(0x25e)]=Object[_0x37c6a0(0x2c3)](Window_Base[_0x37c6a0(0x25e)]),Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x2b4)]=Window_FTB_ActionCount,Window_FTB_ActionCount['Settings']=VisuMZ[_0x37c6a0(0x3ca)]['Settings']['ActionCountDisplay'],Window_FTB_ActionCount['prototype'][_0x37c6a0(0x2a8)]=function(){const _0x34f452=_0x37c6a0,_0x1e0680=this[_0x34f452(0x306)]();Window_Base[_0x34f452(0x25e)]['initialize'][_0x34f452(0x3be)](this,_0x1e0680),this[_0x34f452(0x2a0)](0x0),this[_0x34f452(0x334)](),this['opacity']=0x0;},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x306)]=function(){const _0x1c2a64=_0x37c6a0;return new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x1c2a64(0x277)]);},Window_FTB_ActionCount[_0x37c6a0(0x25e)]['initMembers']=function(){const _0x32c5b4=_0x37c6a0;this[_0x32c5b4(0x310)]=null,this[_0x32c5b4(0x2c2)]=0x0,this[_0x32c5b4(0x3c9)]=0x0;const _0x229e89=Window_FTB_ActionCount[_0x32c5b4(0x30b)];this[_0x32c5b4(0x253)]={'ActorPicture':_0x229e89[_0x32c5b4(0x39d)]?ImageManager[_0x32c5b4(0x206)](_0x229e89['ActorActionPicture']):'','EnemyPicture':_0x229e89['EnemyActionPicture']?ImageManager[_0x32c5b4(0x206)](_0x229e89[_0x32c5b4(0x352)]):'','EmptyPicture':_0x229e89[_0x32c5b4(0x271)]?ImageManager[_0x32c5b4(0x206)](_0x229e89[_0x32c5b4(0x271)]):''};},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x228)]=function(){const _0x1fba46=_0x37c6a0;this[_0x1fba46(0x2ed)]=0x0;},Window_FTB_ActionCount[_0x37c6a0(0x25e)]['setUnit']=function(_0x555894){const _0x99cd9a=_0x37c6a0;this[_0x99cd9a(0x310)]=_0x555894,this['update']();},Window_FTB_ActionCount['prototype'][_0x37c6a0(0x32f)]=function(){const _0x37a1db=_0x37c6a0;Window_Base[_0x37a1db(0x25e)][_0x37a1db(0x32f)][_0x37a1db(0x3be)](this),this[_0x37a1db(0x32e)](),this[_0x37a1db(0x200)](),this['updateVisibility']();},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x32e)]=function(){const _0x25a2ef=_0x37c6a0;if(!this[_0x25a2ef(0x310)])return;(this[_0x25a2ef(0x2c2)]!==this[_0x25a2ef(0x310)]['getCurrentActionsFTB']()||this[_0x25a2ef(0x3c9)]!==this[_0x25a2ef(0x310)]['getMaxActionsFTB']())&&(_0x25a2ef(0x37f)==='fEsGw'?_0x3a7c36[_0x25a2ef(0x3ca)]['Window_Base_drawItemNumber']['call'](this,_0x325f94,_0x2af090,_0x3e5e7f,_0x51ef1e):(this[_0x25a2ef(0x2c2)]=this[_0x25a2ef(0x310)][_0x25a2ef(0x3b9)](),this[_0x25a2ef(0x3c9)]=this[_0x25a2ef(0x310)][_0x25a2ef(0x213)](),this['refresh']()));},Window_FTB_ActionCount[_0x37c6a0(0x25e)]['updateVisibility']=function(){const _0x362678=_0x37c6a0;this[_0x362678(0x36a)]=$gameSystem['isBattleSystemFTBActionCountVisible']();},Window_FTB_ActionCount['prototype'][_0x37c6a0(0x337)]=function(){const _0x2833bc=_0x37c6a0;this[_0x2833bc(0x24c)]['clear']();if(!this[_0x2833bc(0x310)])return;const _0x57b7de=Window_FTB_ActionCount['Settings'];if(!_0x57b7de)return;const _0x14f549=this[_0x2833bc(0x370)](),_0x51e243=this[_0x2833bc(0x1f2)](),_0x1be78f=_0x57b7de[_0x2833bc(0x222)]+_0x57b7de[_0x2833bc(0x28f)],_0x483f13=_0x57b7de[_0x2833bc(0x208)];let _0x5bb1db=_0x14f549['x'],_0x921570=_0x14f549['y'];while(_0x51e243[_0x2833bc(0x246)]>_0x57b7de[_0x2833bc(0x1f9)]){_0x2833bc(0x2ca)!==_0x2833bc(0x2ca)?_0x3cac9f[_0x2833bc(0x3ca)]['BattleManager_processTurn'][_0x2833bc(0x3be)](this):_0x51e243[_0x2833bc(0x203)]();}while(_0x51e243[_0x2833bc(0x246)]>0x0){if('hIQZO'!=='hIQZO')this[_0x2833bc(0x345)]();else{const _0x47706a=_0x51e243['shift']();this['drawImage'](_0x47706a,_0x5bb1db,_0x921570,_0x51e243['length']),_0x483f13?_0x5bb1db+=_0x1be78f:_0x921570+=_0x1be78f;}}},Window_FTB_ActionCount[_0x37c6a0(0x25e)]['createStartingCoordinates']=function(){const _0x2841af=_0x37c6a0,_0xa8a8c9=Window_FTB_ActionCount['Settings'],_0x353bb5=this['_unit']===$gameParty,_0x1bfe65=_0xa8a8c9[_0x2841af(0x222)],_0x50fa60=_0x1bfe65*(_0xa8a8c9[_0x2841af(0x1f9)]-0x1)+_0xa8a8c9[_0x2841af(0x28f)]*(_0xa8a8c9[_0x2841af(0x1f9)]-0x2),_0x2717f8=_0xa8a8c9[_0x2841af(0x208)],_0x44b2aa=SceneManager[_0x2841af(0x3a1)]['_statusWindow'][_0x2841af(0x277)];let _0x4f4209=0x0,_0x34a461=0x0;const _0x5a808=_0xa8a8c9[_0x2841af(0x2c5)];if(_0x5a808){_0x34a461=this[_0x2841af(0x3ad)]-_0x44b2aa-_0xa8a8c9['ScreenBufferY']-_0x1bfe65,_0x4f4209=_0x353bb5?this['innerWidth']-_0xa8a8c9[_0x2841af(0x220)]-_0x1bfe65:_0xa8a8c9[_0x2841af(0x220)];if(_0x2717f8&&_0x353bb5)_0x4f4209-=_0x50fa60;else!_0x2717f8&&(_0x34a461-=_0x50fa60);}else _0x34a461=_0xa8a8c9[_0x2841af(0x20e)],_0x4f4209=_0x353bb5?this[_0x2841af(0x30d)]-_0xa8a8c9[_0x2841af(0x220)]-_0x1bfe65:_0xa8a8c9['ScreenBufferX'],_0x2717f8&&_0x353bb5&&(_0x4f4209-=_0x50fa60);return _0x4f4209+=_0x353bb5?_0xa8a8c9[_0x2841af(0x2e4)]:_0xa8a8c9[_0x2841af(0x3bf)],_0x34a461+=_0x353bb5?_0xa8a8c9[_0x2841af(0x2e4)]:_0xa8a8c9[_0x2841af(0x2fa)],new Point(Math['round'](_0x4f4209),Math['round'](_0x34a461));},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x1f2)]=function(){const _0x32b7a3=_0x37c6a0,_0xce2428=Window_FTB_ActionCount[_0x32b7a3(0x30b)];let _0x1a63a2=!![];if(_0xce2428[_0x32b7a3(0x208)]){if('WQopO'===_0x32b7a3(0x33d))_0x39a737[_0x32b7a3(0x3ca)]['BattleManager_processTurn'][_0x32b7a3(0x3be)](this);else{if(this[_0x32b7a3(0x310)]===$gameParty)_0x1a63a2=!_0x1a63a2;}}else _0x1a63a2=!_0xce2428[_0x32b7a3(0x2c5)];let _0x4df728=this[_0x32b7a3(0x310)][_0x32b7a3(0x3b9)](),_0x4437ba=Math[_0x32b7a3(0x2ac)](0x0,this[_0x32b7a3(0x310)][_0x32b7a3(0x213)]()-_0x4df728);const _0x2ee76d=[];while(_0x4df728--){if('hGzoC'===_0x32b7a3(0x289))_0x5ce813[_0x32b7a3(0x3ca)][_0x32b7a3(0x214)][_0x32b7a3(0x3be)](this);else{const _0x5b5af7=_0x32b7a3(0x319);_0x2ee76d['push'](_0x5b5af7);}}while(_0x4437ba--){const _0xc26cfe='Empty';_0x1a63a2?_0x2ee76d[_0x32b7a3(0x21b)](_0xc26cfe):_0x2ee76d['unshift'](_0xc26cfe);}while(_0x2ee76d['length']<0xa){const _0x1e3d28='Nothing';if(_0x1a63a2){if(_0x32b7a3(0x291)!==_0x32b7a3(0x291)){if(!_0xfcf66e[_0x32b7a3(0x23a)]())return;if(!_0xb0d4c5[_0x32b7a3(0x2e5)]())return;const _0x34f9fc=this['getMaxActionsFTB']();this[_0x32b7a3(0x353)]();let _0xecae5e=this['getCurrentActionsFTB']();const _0x2f2d7f=this[_0x32b7a3(0x213)]()-_0x34f9fc;if(_0x5a77b9[_0x32b7a3(0x3a3)]&&_0x2f2d7f>0x0)_0xecae5e+=_0x2f2d7f;if(_0x29abe2[_0x32b7a3(0x316)]&&_0x2f2d7f<0x0)_0xecae5e+=_0x2f2d7f;_0xecae5e=_0x5433d4[_0x32b7a3(0x212)](_0xecae5e,_0x52d07e['_FTB_MAX_ACTIONS']),this['setCurrentActionsFTB'](_0xecae5e);}else _0x2ee76d[_0x32b7a3(0x21b)](_0x1e3d28);}else _0x2ee76d['unshift'](_0x1e3d28);}return _0x2ee76d;},Window_FTB_ActionCount['prototype']['drawImage']=function(_0x584ddd,_0x4f24db,_0x278dc,_0x4865dd){const _0x20c2ed=_0x37c6a0;if(_0x584ddd===_0x20c2ed(0x3d0))return;if(_0x584ddd===_0x20c2ed(0x319))_0x584ddd=this[_0x20c2ed(0x310)]===$gameParty?_0x20c2ed(0x3d1):_0x20c2ed(0x1ef);const _0x2ccc27=Window_FTB_ActionCount[_0x20c2ed(0x30b)];if(_0x2ccc27['%1ActionPicture'['format'](_0x584ddd)]){const _0x31c94b=_0x2ccc27[_0x20c2ed(0x2a4)['format'](_0x584ddd)],_0x38a152=ImageManager[_0x20c2ed(0x206)](_0x31c94b);_0x38a152[_0x20c2ed(0x3cf)](this[_0x20c2ed(0x1f7)]['bind'](this,_0x38a152,_0x4f24db,_0x278dc,_0x4865dd));}else{if(_0x20c2ed(0x3bd)!==_0x20c2ed(0x3bd)){const _0x515e44=_0x3f0223[_0x20c2ed(0x27e)](_0x15bc7d);if(_0x515e44>this[_0x20c2ed(0x287)]()['getCurrentActionsFTB']())return![];}else{const _0x2580ef=ImageManager[_0x20c2ed(0x2a9)['format'](_0x584ddd)];this['drawBigIcon'](_0x2580ef,_0x4f24db,_0x278dc),this['canDrawActionsRemaining'](_0x4865dd)&&this[_0x20c2ed(0x22d)](_0x4f24db,_0x278dc);}}},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x1f7)]=function(_0x422de7,_0x5e8cfd,_0x853ca5,_0x425b54){const _0x269970=_0x37c6a0;if(!_0x422de7)return;const _0x2e6b6a=Window_FTB_ActionCount['Settings'],_0x194819=_0x2e6b6a['ImageSize'],_0x256513=_0x194819/_0x422de7[_0x269970(0x25f)],_0x3cdfda=_0x194819/_0x422de7[_0x269970(0x277)],_0x335bf8=Math[_0x269970(0x212)](_0x256513,_0x3cdfda,0x1),_0x4d414=_0x422de7['height'],_0x7b2d0a=_0x422de7['height'],_0x4ccb71=Math[_0x269970(0x2ef)](_0x4d414*_0x335bf8),_0xdbb74b=Math[_0x269970(0x2ef)](_0x7b2d0a*_0x335bf8),_0x2a2608=Math[_0x269970(0x2ef)](_0x5e8cfd+(_0x194819-_0x4ccb71)/0x2),_0x43ae64=Math[_0x269970(0x2ef)](_0x853ca5+(_0x194819-_0xdbb74b)/0x2);this[_0x269970(0x24c)]['_context'][_0x269970(0x255)]=_0x2e6b6a[_0x269970(0x33b)],this[_0x269970(0x24c)][_0x269970(0x366)](_0x422de7,0x0,0x0,_0x4d414,_0x7b2d0a,_0x2a2608,_0x43ae64,_0x4ccb71,_0xdbb74b),this['contents'][_0x269970(0x3a6)][_0x269970(0x255)]=!![];if(this['canDrawActionsRemaining'](_0x425b54)){if(_0x269970(0x21a)===_0x269970(0x2b2)){this[_0x269970(0x2bf)][_0x269970(0x21b)](_0x269970(0x281),_0x2dce1e);const _0x4d1fcd=_0x1d9e60[_0x269970(0x273)];this[_0x269970(0x2bf)]['push'](_0x269970(0x22b),_0x4d1fcd),this[_0x269970(0x2bf)][_0x269970(0x21b)](_0x269970(0x32c));}else this[_0x269970(0x22d)](_0x5e8cfd,_0x853ca5);}},Window_FTB_ActionCount['prototype'][_0x37c6a0(0x3b1)]=function(_0x31c89e,_0x393158,_0x43507e){const _0x25a259=_0x37c6a0,_0x526afa=Window_FTB_ActionCount[_0x25a259(0x30b)];let _0x286622=_0x526afa[_0x25a259(0x222)];const _0x21c3fc=ImageManager['loadSystem'](_0x25a259(0x2af)),_0x1099fe=ImageManager[_0x25a259(0x2d6)],_0x309996=ImageManager[_0x25a259(0x2f4)],_0x4ba99a=_0x31c89e%0x10*_0x1099fe,_0x19971a=Math[_0x25a259(0x3d4)](_0x31c89e/0x10)*_0x309996;this['contents'][_0x25a259(0x3a6)][_0x25a259(0x255)]=_0x526afa[_0x25a259(0x1fa)],this[_0x25a259(0x24c)]['blt'](_0x21c3fc,_0x4ba99a,_0x19971a,_0x1099fe,_0x309996,_0x393158,_0x43507e,_0x286622,_0x286622),this[_0x25a259(0x24c)][_0x25a259(0x3a6)][_0x25a259(0x255)]=!![];},Window_FTB_ActionCount['prototype'][_0x37c6a0(0x200)]=function(){const _0x2d9cb7=_0x37c6a0,_0x2d7b20=Window_FTB_ActionCount[_0x2d9cb7(0x30b)];if(_0x2d7b20['BottomPosition'])return;if(!_0x2d7b20['RepositionTopForHelp'])return;const _0x3eeedf=SceneManager[_0x2d9cb7(0x3a1)][_0x2d9cb7(0x38c)];if(!_0x3eeedf)return;if(_0x3eeedf[_0x2d9cb7(0x36a)]){if('eatyp'!=='eatyp'){if(this[_0x2d9cb7(0x23a)]())return![];return _0x5e6a48[_0x2d9cb7(0x3ca)][_0x2d9cb7(0x3b8)][_0x2d9cb7(0x3be)](this);}else this['x']=_0x2d7b20['RepositionTopHelpX']||0x0,this['y']=_0x2d7b20['RepositionTopHelpY']||0x0;}else this['x']=0x0,this['y']=0x0;},Window_FTB_ActionCount[_0x37c6a0(0x25e)]['canDrawActionsRemaining']=function(_0x29b4d7){const _0x4ed9f7=_0x37c6a0,_0xa86b4e=Window_FTB_ActionCount[_0x4ed9f7(0x30b)];if(!_0xa86b4e[_0x4ed9f7(0x390)])return![];const _0x52b9ed=_0xa86b4e[_0x4ed9f7(0x2c5)],_0x25c1ac=_0xa86b4e[_0x4ed9f7(0x208)],_0x5ad039=this[_0x4ed9f7(0x310)]===$gameParty;if(_0x25c1ac){if(_0x4ed9f7(0x28b)!==_0x4ed9f7(0x28b))_0x38274e=_0x366a0a+this[_0x4ed9f7(0x2d8)]()+_0x1b5235;else return _0x5ad039?_0x29b4d7===0x0:_0x29b4d7===_0xa86b4e[_0x4ed9f7(0x1f9)]-0x1;}else return _0x52b9ed?_0x29b4d7===0x0:_0x29b4d7===_0xa86b4e[_0x4ed9f7(0x1f9)]-0x1;},Window_FTB_ActionCount[_0x37c6a0(0x25e)][_0x37c6a0(0x22d)]=function(_0x18c9ba,_0xee2cd7){const _0x398c4a=_0x37c6a0;this['resetFontSettings']();const _0x4eb4e9=Window_FTB_ActionCount[_0x398c4a(0x30b)],_0x59e277=new Rectangle(_0x18c9ba,_0xee2cd7,_0x4eb4e9['ImageSize'],_0x4eb4e9['ImageSize']);_0x59e277['x']+=_0x4eb4e9[_0x398c4a(0x2b5)],_0x59e277['y']+=_0x4eb4e9[_0x398c4a(0x247)];const _0x57383e=this[_0x398c4a(0x310)][_0x398c4a(0x3b9)]();this[_0x398c4a(0x24c)]['fontSize']=_0x4eb4e9['ActionsRemainingFontSize'],this[_0x398c4a(0x24c)]['drawText'](_0x57383e,_0x59e277['x'],_0x59e277['y'],_0x59e277['width'],_0x59e277[_0x398c4a(0x277)],'center'),this['resetFontSettings']();};