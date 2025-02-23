//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x41e3=['Game_Battler_clearTpbChargeTime','isActor','VisuMZ_1_BattleCore','getSkillTypeNameFromID','push','match','call','skillTypes','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','ARRAYNUM','WvWHT','random','ygOKX','FriendsOnly','CreateNotetag','ytZYk','2459uZjAcd','BattleManager_endAction','BjIUD','deathStateId','on%2Element%1','_savedAutoSkillTriggerActions','STRUCT','isMagical','BKYez','description','aliveMembers','getSkillTypes','occasion','eWLRK','isAllDead','WtfUb','forceAutoSkillTrigger','4AYKXII','attackElements','checkDeathAutoSkillTriggerRemoval','VisuMZ_1_ElementStatusCore','FUNC','1SGLFmn','WDCcc','276418utaEdN','processAutoSkillTrigger','processDeathAutoSkillTriggerEffects','yNRpe','isSkill','meetsDeathAutoSkillTrigger','3BHnIYj','JAMrw','(?:ATTACK\x20%1|STRIKE\x20%1)','onDatabaseLoaded','_actions','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isAutoSkillTrigger','TARGET','_targets','HQMsr','VisuMZ_1_SkillsStatesCore','ARRAYFUNC','name','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','addNewState','lREof','Settings','onBattleWin','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','clear','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','onBattleStart','User','xLrfX','FRIENDS','Game_Action_isValid','CreateNotetags','replace','process_VisuMZ_AutoSkillTriggers_Notetags','isSceneBattle','jSVhM','performAutoSkillTriggers','parse','clearTpbChargeTime','hYelo','ALLY','indexOf','ARRAYEVAL','ARRAYSTRUCT','forceAction','checkBattleEnd','JHpMr','1167782VLtVGp','applyGlobal','FUhCI','canUse','FRIENDS\x20ONLY','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','STR','571682NomwGV','getElementNameFromID','on%2SType%1','Opponents','bBUlx','isOptionValid','exit','isPhysical','ARRAYSTR','on%1Magical','returnSavedAutoSkillTriggerActions','Scene_Boot_onDatabaseLoaded','JSON','1558553TkQDRY','505945hOmCfE','767559HpclNt','Game_BattlerBase_revive','elementId','subject','processAutoSkillTriggers','_CHANCE','canMove','onAllActionsEnd','isImmortal','BattleManager_checkBattleEnd','parameters','friendsUnit','isValid','Target','Game_BattlerBase_isImmortal','length','revive','stripNameTextCodes','version','skills','onDeath','Game_Battler_onBattleEnd','ENEMY','item','meOqg','Game_Unit_onBattleStart','stypeId','peWjX','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','maiqF','_inBattle','AutoSkillTriggers','wHzgq','Ally','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','_deathAutoSkillTriggerPerformed','_onBattleWinAutoSkillTriggerOn','onBattleEnd','rtYVS','_actionBattlers','clearDeathAutoSkillTrigger','on%1Attack','prototype','RegExp','trim','IAVZy','max','opponentsUnit','_autoSkillTriggerBypassTpbClear','applyAutoSkillTriggers','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','(?:GUARD\x20%1|GUARD\x20%1)','elements','CNfRz','damage','format','map','OPPONENTS','Friends','isAttack','on%1Element%2','Game_Battler_onBattleStart','Game_BattlerBase_addNewState','1181bislVe','note','getAutoSkillTriggerSTypes','BeUwe','on%1Guard','_deathAutoSkillTriggerActive','return\x200','OldFm','toUpperCase','Enemy','on%1Physical','on%1Certain','lKzMq','includes','filter','OvelO','ARRAYJSON','Game_Action_clear','setAutoSkillTrigger','_subject','isGuard','_autoSkillTrigger','_forcedBattlers','kNgZO','on%1SType%2','refresh','dsXhz','on%1Item','dGQjI','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','<AUTO\x20TRIGGER:[\x20]%1>','status','endAction','isCertainHit','_action','ConvertParams','log','EVAL','hasDeathAutoSkillTrigger'];const _0x33f718=_0x224f;(function(_0x235352,_0x539a07){const _0x3a1cec=_0x224f;while(!![]){try{const _0x4d5d18=parseInt(_0x3a1cec(0x1f5))+-parseInt(_0x3a1cec(0x1df))+-parseInt(_0x3a1cec(0x1f3))+-parseInt(_0x3a1cec(0x1f4))*-parseInt(_0x3a1cec(0x1b5))+parseInt(_0x3a1cec(0x1af))*-parseInt(_0x3a1cec(0x1a8))+-parseInt(_0x3a1cec(0x1e6))*parseInt(_0x3a1cec(0x1ad))+-parseInt(_0x3a1cec(0x160))*-parseInt(_0x3a1cec(0x197));if(_0x4d5d18===_0x539a07)break;else _0x235352['push'](_0x235352['shift']());}catch(_0x31f2db){_0x235352['push'](_0x235352['shift']());}}}(_0x41e3,0xbfd78));var label=_0x33f718(0x140),tier=tier||0x0,dependencies=[_0x33f718(0x189)],pluginData=$plugins[_0x33f718(0x16e)](function(_0x31652b){const _0x5bb777=_0x33f718;return _0x31652b[_0x5bb777(0x17f)]&&_0x31652b[_0x5bb777(0x1a0)][_0x5bb777(0x16d)]('['+label+']');})[0x0];function _0x224f(_0x3bff3c,_0x53e4b2){return _0x224f=function(_0x41e35b,_0x224f2d){_0x41e35b=_0x41e35b-0x138;let _0x355b5a=_0x41e3[_0x41e35b];return _0x355b5a;},_0x224f(_0x3bff3c,_0x53e4b2);}VisuMZ[label][_0x33f718(0x1c5)]=VisuMZ[label][_0x33f718(0x1c5)]||{},VisuMZ[_0x33f718(0x183)]=function(_0x50828d,_0x380c72){const _0x36a48e=_0x33f718;for(const _0x232b5c in _0x380c72){if('ThWlK'===_0x36a48e(0x1cc)){const _0x547c64=_0x5a6995(_0x5b987e['$1']);_0x547c64!==_0x5c7301[_0x199b0][_0x36a48e(0x207)]&&(_0x2bd208('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x36a48e(0x158)](_0x2d6010,_0x547c64)),_0x1d24c6[_0x36a48e(0x1ec)]());}else{if(_0x232b5c[_0x36a48e(0x18c)](/(.*):(.*)/i)){const _0x5ef55a=String(RegExp['$1']),_0x527564=String(RegExp['$2'])[_0x36a48e(0x168)]()[_0x36a48e(0x14d)]();let _0x42de68,_0xa42060,_0x20a97e;switch(_0x527564){case'NUM':_0x42de68=_0x380c72[_0x232b5c]!==''?Number(_0x380c72[_0x232b5c]):0x0;break;case _0x36a48e(0x190):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060['map'](_0x39bffc=>Number(_0x39bffc));break;case _0x36a48e(0x185):_0x42de68=_0x380c72[_0x232b5c]!==''?eval(_0x380c72[_0x232b5c]):null;break;case _0x36a48e(0x1da):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON['parse'](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060['map'](_0x794853=>eval(_0x794853));break;case _0x36a48e(0x1f2):_0x42de68=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):'';break;case _0x36a48e(0x170):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060[_0x36a48e(0x159)](_0x4456fa=>JSON[_0x36a48e(0x1d5)](_0x4456fa));break;case _0x36a48e(0x1ac):_0x42de68=_0x380c72[_0x232b5c]!==''?new Function(JSON['parse'](_0x380c72[_0x232b5c])):new Function(_0x36a48e(0x166));break;case _0x36a48e(0x1c0):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060[_0x36a48e(0x159)](_0x1aa44a=>new Function(JSON[_0x36a48e(0x1d5)](_0x1aa44a)));break;case _0x36a48e(0x1e5):_0x42de68=_0x380c72[_0x232b5c]!==''?String(_0x380c72[_0x232b5c]):'';break;case _0x36a48e(0x1ee):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060[_0x36a48e(0x159)](_0x598d97=>String(_0x598d97));break;case _0x36a48e(0x19d):_0x20a97e=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):{},_0x42de68=VisuMZ['ConvertParams']({},_0x20a97e);break;case _0x36a48e(0x1db):_0xa42060=_0x380c72[_0x232b5c]!==''?JSON[_0x36a48e(0x1d5)](_0x380c72[_0x232b5c]):[],_0x42de68=_0xa42060[_0x36a48e(0x159)](_0x31de29=>VisuMZ[_0x36a48e(0x183)]({},JSON[_0x36a48e(0x1d5)](_0x31de29)));break;default:continue;}_0x50828d[_0x5ef55a]=_0x42de68;}}}return _0x50828d;},(_0x7c7132=>{const _0x43c74f=_0x33f718,_0x2994ef=_0x7c7132[_0x43c74f(0x1c1)];for(const _0x167d42 of dependencies){if(!Imported[_0x167d42]){if(_0x43c74f(0x139)!==_0x43c74f(0x1ea)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x43c74f(0x158)](_0x2994ef,_0x167d42)),SceneManager[_0x43c74f(0x1ec)]();break;}else{this[_0x43c74f(0x1a7)](_0x44f03a['id']);const _0xa8c92f=_0x2b33e3[_0x43c74f(0x148)]['clone'](),_0x3b2f39=_0x400961[_0x43c74f(0x173)];_0x52ebe0[_0x43c74f(0x173)]=null,_0x4b1db1['forceAction'](this),_0x4dcf9a['_actionBattlers']=_0xa8c92f,_0xf971b7[_0x43c74f(0x173)]=_0x3b2f39;}}}const _0x54fbaf=_0x7c7132[_0x43c74f(0x1a0)];if(_0x54fbaf[_0x43c74f(0x18c)](/\[Version[ ](.*?)\]/i)){const _0x4ef887=Number(RegExp['$1']);_0x4ef887!==VisuMZ[label][_0x43c74f(0x207)]&&('BeUwe'!==_0x43c74f(0x163)?this[_0x43c74f(0x195)](_0x39e77e[0x0],_0x12a779[0x1]):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x43c74f(0x158)](_0x2994ef,_0x4ef887)),SceneManager[_0x43c74f(0x1ec)]()));}if(_0x54fbaf[_0x43c74f(0x18c)](/\[Tier[ ](\d+)\]/i)){if('mZqmO'!==_0x43c74f(0x147)){const _0x5e7af9=Number(RegExp['$1']);if(_0x5e7af9<tier)_0x43c74f(0x1b6)!=='JAMrw'?this[_0x43c74f(0x1d4)](_0x49d8d7,_0x43c74f(0x194)):(alert(_0x43c74f(0x1ba)['format'](_0x2994ef,_0x5e7af9,tier)),SceneManager[_0x43c74f(0x1ec)]());else{if('BOmCs'!==_0x43c74f(0x1d3))tier=Math[_0x43c74f(0x14f)](_0x5e7af9,tier);else{if(this[_0x43c74f(0x165)])return!![];return _0x5c6b32['AutoSkillTriggers'][_0x43c74f(0x203)][_0x43c74f(0x18d)](this);}}}else{const _0x436c43=this[_0x43c74f(0x182)]&&this[_0x43c74f(0x182)]['isAutoSkillTrigger'](),_0x27dbbc=this['_subject'];_0x436c43&&(this['_subject'][_0x43c74f(0x151)]=!![]),_0x1758e9['AutoSkillTriggers'][_0x43c74f(0x198)][_0x43c74f(0x18d)](this),_0x27dbbc&&_0x436c43&&_0x27dbbc[_0x43c74f(0x1f0)]();}}VisuMZ['ConvertParams'](VisuMZ[label][_0x43c74f(0x1c5)],_0x7c7132[_0x43c74f(0x1ff)]);})(pluginData),VisuMZ[_0x33f718(0x140)][_0x33f718(0x1f1)]=Scene_Boot[_0x33f718(0x14b)][_0x33f718(0x1b8)],Scene_Boot['prototype'][_0x33f718(0x1b8)]=function(){const _0x2dcba7=_0x33f718;VisuMZ['AutoSkillTriggers']['Scene_Boot_onDatabaseLoaded'][_0x2dcba7(0x18d)](this),this['process_VisuMZ_AutoSkillTriggers_Notetags']();},Scene_Boot['prototype'][_0x33f718(0x1d1)]=function(){const _0x55e10a=_0x33f718;VisuMZ['AutoSkillTriggers'][_0x55e10a(0x1cf)]();},VisuMZ[_0x33f718(0x140)][_0x33f718(0x14c)]={},VisuMZ[_0x33f718(0x140)]['CreateNotetags']=function(){const _0x4fe7c2=_0x33f718;let _0xfe793c=[[_0x4fe7c2(0x1cb),'USER'],[_0x4fe7c2(0x202),_0x4fe7c2(0x1bc)],[_0x4fe7c2(0x142),_0x4fe7c2(0x1d8)],['Enemy',_0x4fe7c2(0x20b)],[_0x4fe7c2(0x15b),_0x4fe7c2(0x1cd)],[_0x4fe7c2(0x194),_0x4fe7c2(0x1e3)],[_0x4fe7c2(0x1e9),_0x4fe7c2(0x15a)]],_0x2725d4=[[_0x4fe7c2(0x1ca),_0x4fe7c2(0x1c2)],[_0x4fe7c2(0x1c6),_0x4fe7c2(0x153)],[_0x4fe7c2(0x209),'(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x2090ca of _0xfe793c){if('nLgpE'!==_0x4fe7c2(0x1a4)){if(!_0x2090ca)continue;_0x2725d4['push']([_0x4fe7c2(0x14a)['format'](_0x2090ca[0x0]),_0x4fe7c2(0x1b7)[_0x4fe7c2(0x158)](_0x2090ca[0x1])]),_0x2725d4[_0x4fe7c2(0x18b)](['on%1Guard'[_0x4fe7c2(0x158)](_0x2090ca[0x0]),_0x4fe7c2(0x154)['format'](_0x2090ca[0x1])]),_0x2725d4['push']([_0x4fe7c2(0x17b)[_0x4fe7c2(0x158)](_0x2090ca[0x0]),'(?:ITEM\x20%1|ITEM\x20%1)'['format'](_0x2090ca[0x1])]),_0x2725d4[_0x4fe7c2(0x18b)]([_0x4fe7c2(0x16a)['format'](_0x2090ca[0x0]),'(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)'[_0x4fe7c2(0x158)](_0x2090ca[0x1])]),_0x2725d4['push'](['on%1Magical'[_0x4fe7c2(0x158)](_0x2090ca[0x0]),_0x4fe7c2(0x17d)[_0x4fe7c2(0x158)](_0x2090ca[0x1])]),_0x2725d4[_0x4fe7c2(0x18b)]([_0x4fe7c2(0x16b)[_0x4fe7c2(0x158)](_0x2090ca[0x0]),_0x4fe7c2(0x143)['format'](_0x2090ca[0x1])]);}else _0x35b5b2=!![];}for(const _0x8f399 of $dataSystem[_0x4fe7c2(0x18e)]){if(_0x4fe7c2(0x1b2)==='MdtAV'){if(!this[_0x4fe7c2(0x1b3)]())return[];let _0x859744=[];return _0x1aa8a4[_0x4fe7c2(0x1bf)]?_0x859744=_0x16e1e5['getSkillTypes'](this[_0x4fe7c2(0x138)]()):_0x859744[_0x4fe7c2(0x18b)](this[_0x4fe7c2(0x138)]()['stypeId']),_0x859744[_0x4fe7c2(0x159)](_0x3601f7=>_0x519f0e[_0x4fe7c2(0x18a)](_0x3601f7));}else{if(!_0x8f399)continue;let _0x39cd97=DataManager['stripNameTextCodes'](_0x8f399);for(const _0x377b6e of _0xfe793c){if(!_0x377b6e)continue;_0x2725d4[_0x4fe7c2(0x18b)]([_0x4fe7c2(0x1e8)['format'](_0x39cd97[_0x4fe7c2(0x1d0)](/[ ]/gi,''),_0x377b6e[0x0]),_0x4fe7c2(0x1e4)['format'](_0x39cd97,_0x377b6e[0x1])]);}}}for(const _0xf6cd3a of $dataSystem[_0x4fe7c2(0x155)]){if(!_0xf6cd3a)continue;let _0x2e56f1=DataManager[_0x4fe7c2(0x206)](_0xf6cd3a);for(const _0x443b3b of _0xfe793c){if(!_0x443b3b)continue;_0x2725d4[_0x4fe7c2(0x18b)]([_0x4fe7c2(0x19b)[_0x4fe7c2(0x158)](_0x2e56f1[_0x4fe7c2(0x1d0)](/[ ]/gi,''),_0x443b3b[0x0]),'(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)'[_0x4fe7c2(0x158)](_0x2e56f1,_0x443b3b[0x1])]);}}for(const _0x3d559f of _0x2725d4){this[_0x4fe7c2(0x195)](_0x3d559f[0x0],_0x3d559f[0x1]);}},VisuMZ[_0x33f718(0x140)][_0x33f718(0x195)]=function(_0x8be71c,_0x5c245f){const _0x30cd2d=_0x33f718;_0x8be71c=_0x8be71c[_0x30cd2d(0x168)]()[_0x30cd2d(0x14d)]();const _0x25a2b0=_0x30cd2d(0x17e)[_0x30cd2d(0x158)](_0x5c245f),_0x3bf563=_0x8be71c+_0x30cd2d(0x1fa),_0xe968bf=_0x30cd2d(0x18f)[_0x30cd2d(0x158)](_0x5c245f);try{_0x30cd2d(0x167)!==_0x30cd2d(0x167)?this[_0x30cd2d(0x175)]=_0x2fa26e:(VisuMZ[_0x30cd2d(0x140)][_0x30cd2d(0x14c)][_0x8be71c]=new RegExp(_0x25a2b0,'i'),VisuMZ['AutoSkillTriggers'][_0x30cd2d(0x14c)][_0x3bf563]=new RegExp(_0xe968bf,'i'));}catch(_0x4da840){Utils[_0x30cd2d(0x1eb)]('test')&&(console[_0x30cd2d(0x184)](_0x30cd2d(0x1c7)),console[_0x30cd2d(0x184)](_0x30cd2d(0x1c9)[_0x30cd2d(0x158)](_0x25a2b0,_0xe968bf)),console[_0x30cd2d(0x184)](_0x30cd2d(0x13d)),console['log']('\x20\x20\x20'));}},DataManager[_0x33f718(0x18a)]=function(_0x28def7){const _0x32f205=_0x33f718;return this[_0x32f205(0x206)]($dataSystem['skillTypes'][_0x28def7]);},DataManager[_0x33f718(0x206)]=function(_0x434aad){const _0x2edbc4=_0x33f718;if(!_0x434aad)return'';return _0x434aad=_0x434aad['replace'](/\\V\[(\d+)\]/gi,''),_0x434aad=_0x434aad[_0x2edbc4(0x1d0)](/\\I\[(\d+)\]/gi,''),_0x434aad=_0x434aad[_0x2edbc4(0x1d0)](/\\C\[(\d+)\]/gi,''),_0x434aad=_0x434aad[_0x2edbc4(0x1d0)](/\\N\[(\d+)\]/gi,''),_0x434aad=_0x434aad[_0x2edbc4(0x1d0)](/\\P\[(\d+)\]/gi,''),(_0x434aad||'')[_0x2edbc4(0x168)]()[_0x2edbc4(0x14d)]();},DataManager[_0x33f718(0x1e7)]=function(_0x14442c){const _0x28a28b=_0x33f718;return this[_0x28a28b(0x206)]($dataSystem['elements'][_0x14442c]);},VisuMZ[_0x33f718(0x140)]['BattleManager_endAction']=BattleManager[_0x33f718(0x180)],BattleManager[_0x33f718(0x180)]=function(){const _0x4e61a0=_0x33f718,_0xb81489=this[_0x4e61a0(0x182)]&&this[_0x4e61a0(0x182)][_0x4e61a0(0x1bb)](),_0x51ca56=this[_0x4e61a0(0x173)];_0xb81489&&('ytZYk'===_0x4e61a0(0x196)?this[_0x4e61a0(0x173)]['_autoSkillTriggerBypassTpbClear']=!![]:(_0x44dda0(_0x4e61a0(0x1ba)[_0x4e61a0(0x158)](_0x5bbc10,_0x4fbba3,_0x346da9)),_0x12678a[_0x4e61a0(0x1ec)]()));VisuMZ[_0x4e61a0(0x140)][_0x4e61a0(0x198)]['call'](this);if(_0x51ca56&&_0xb81489){if(_0x4e61a0(0x17c)!==_0x4e61a0(0x156))_0x51ca56['returnSavedAutoSkillTriggerActions']();else return this[_0x4e61a0(0x138)]()[_0x4e61a0(0x1a3)]=0x0,_0x5b393c=_0x4af4f8&&this['subject']()['canUse'](this[_0x4e61a0(0x138)]()),this[_0x4e61a0(0x138)]()['occasion']=_0x1e56d9,_0x26d241;}},VisuMZ[_0x33f718(0x140)][_0x33f718(0x1fe)]=BattleManager[_0x33f718(0x1dd)],BattleManager[_0x33f718(0x1dd)]=function(){const _0x2328ea=_0x33f718;if($gameTroop[_0x2328ea(0x1a5)]())$gameParty['processOnBattleWinAutoSkillTriggers']();if(this[_0x2328ea(0x176)][_0x2328ea(0x204)]>0x0)return![];return VisuMZ['AutoSkillTriggers'][_0x2328ea(0x1fe)][_0x2328ea(0x18d)](this);},VisuMZ[_0x33f718(0x140)]['Game_Action_clear']=Game_Action[_0x33f718(0x14b)][_0x33f718(0x1c8)],Game_Action[_0x33f718(0x14b)][_0x33f718(0x1c8)]=function(){const _0x289adb=_0x33f718;VisuMZ[_0x289adb(0x140)][_0x289adb(0x171)][_0x289adb(0x18d)](this),this['setAutoSkillTrigger'](![]);},Game_Action['prototype'][_0x33f718(0x172)]=function(_0x39ee6a){const _0x4635b9=_0x33f718;this[_0x4635b9(0x175)]=_0x39ee6a;},Game_Action['prototype']['isAutoSkillTrigger']=function(){return!!this['_autoSkillTrigger'];},VisuMZ[_0x33f718(0x140)]['Game_Action_isValid']=Game_Action[_0x33f718(0x14b)][_0x33f718(0x201)],Game_Action[_0x33f718(0x14b)][_0x33f718(0x201)]=function(){const _0x2c407b=_0x33f718;let _0x21324d=VisuMZ[_0x2c407b(0x140)][_0x2c407b(0x1ce)]['call'](this),_0x4dbacb=this['item']()?this[_0x2c407b(0x138)]()[_0x2c407b(0x1a3)]:-0x1;if(this[_0x2c407b(0x138)]()&&this['isAutoSkillTrigger']()){if(_0x2c407b(0x191)===_0x2c407b(0x191))return this[_0x2c407b(0x138)]()[_0x2c407b(0x1a3)]=0x0,_0x21324d=_0x21324d&&this[_0x2c407b(0x1f8)]()[_0x2c407b(0x1e2)](this['item']()),this[_0x2c407b(0x138)]()[_0x2c407b(0x1a3)]=_0x4dbacb,_0x21324d;else{if(!_0x25a577)return'';return _0x3a67aa=_0x399cb5[_0x2c407b(0x1d0)](/\\V\[(\d+)\]/gi,''),_0x3563a7=_0x40f374[_0x2c407b(0x1d0)](/\\I\[(\d+)\]/gi,''),_0x16ad57=_0x30d015['replace'](/\\C\[(\d+)\]/gi,''),_0x2c2fef=_0x1d0b9e[_0x2c407b(0x1d0)](/\\N\[(\d+)\]/gi,''),_0x3a6e63=_0x140555['replace'](/\\P\[(\d+)\]/gi,''),(_0x50bd0d||'')['toUpperCase']()['trim']();}}else return _0x21324d;},VisuMZ[_0x33f718(0x140)]['Game_Action_applyGlobal']=Game_Action[_0x33f718(0x14b)][_0x33f718(0x1e0)],Game_Action['prototype'][_0x33f718(0x1e0)]=function(){const _0x5b7f01=_0x33f718;VisuMZ['AutoSkillTriggers']['Game_Action_applyGlobal'][_0x5b7f01(0x18d)](this),this[_0x5b7f01(0x152)]();},Game_Action[_0x33f718(0x14b)][_0x33f718(0x162)]=function(){const _0x47ead5=_0x33f718;if(!this[_0x47ead5(0x1b3)]())return[];let _0x28a92b=[];return Imported[_0x47ead5(0x1bf)]?_0x28a92b=DataManager[_0x47ead5(0x1a2)](this[_0x47ead5(0x138)]()):_0x47ead5(0x1de)!=='JHpMr'?(this[_0x47ead5(0x19c)]=_0x43e6aa,_0x1c82d1[_0x47ead5(0x13f)]=!![],_0x2b9a9f[_0x47ead5(0x140)][_0x47ead5(0x15e)][_0x47ead5(0x18d)](this,_0x38ed8d),this[_0x47ead5(0x1b0)](_0x47ead5(0x1ca)),this[_0x47ead5(0x149)]()):_0x28a92b[_0x47ead5(0x18b)](this['item']()['stypeId']),_0x28a92b[_0x47ead5(0x159)](_0x172d2d=>DataManager[_0x47ead5(0x18a)](_0x172d2d));},Game_Action[_0x33f718(0x14b)]['getAutoSkillTriggerElements']=function(){const _0x29937c=_0x33f718;let _0x28f447=[];if(Imported[_0x29937c(0x1ab)])_0x29937c(0x1a6)===_0x29937c(0x1a6)?_0x28f447=this[_0x29937c(0x155)]():_0x5c9049['push'](this[_0x29937c(0x138)]()[_0x29937c(0x13b)]);else{if(this[_0x29937c(0x138)]()['damage']['elementId']<0x0){if(_0x29937c(0x16c)!==_0x29937c(0x14e)){const _0x1b09c4=this[_0x29937c(0x1f8)]();_0x28f447=_0x1b09c4[_0x29937c(0x1a9)]();}else this[_0x29937c(0x1d4)](_0x5ea7df,'Friends'),_0x5e5896!==_0x52f99c&&this[_0x29937c(0x1d4)](_0x459148,_0x29937c(0x194));}else{if('DJcLr'===_0x29937c(0x19f))return this[_0x29937c(0x206)](_0x1ba5b5['skillTypes'][_0x2667b3]);else _0x28f447=[this['item']()[_0x29937c(0x157)][_0x29937c(0x1f7)]];}}return _0x28f447[_0x29937c(0x159)](_0x3df72a=>DataManager['getElementNameFromID'](_0x3df72a));},Game_Action[_0x33f718(0x14b)][_0x33f718(0x152)]=function(){const _0x2952ac=_0x33f718;if(!SceneManager['isSceneBattle']())return;if(!this[_0x2952ac(0x138)]())return;if(this[_0x2952ac(0x138)]()[_0x2952ac(0x161)][_0x2952ac(0x18c)](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x2952ac(0x138)]()[_0x2952ac(0x161)]['match'](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x516e6c=this[_0x2952ac(0x1f8)](),_0x5b6a9e=BattleManager[_0x2952ac(0x1bd)][_0x2952ac(0x16e)]((_0x34bd0b,_0x486c84,_0x3e8992)=>_0x3e8992[_0x2952ac(0x1d9)](_0x34bd0b)===_0x486c84),_0x1e4daf=_0x516e6c[_0x2952ac(0x200)]()['aliveMembers'](),_0x4cce86=_0x516e6c[_0x2952ac(0x150)]()[_0x2952ac(0x1a1)]();this['performAutoSkillTriggers'](_0x516e6c,_0x2952ac(0x1cb));for(const _0x29062f of _0x5b6a9e){this[_0x2952ac(0x1d4)](_0x29062f,_0x2952ac(0x202));if(_0x29062f['isActor']()===_0x516e6c[_0x2952ac(0x188)]())this[_0x2952ac(0x1d4)](_0x29062f,_0x2952ac(0x142));else _0x29062f[_0x2952ac(0x188)]()!==_0x516e6c[_0x2952ac(0x188)]()&&(_0x2952ac(0x1be)!=='HQMsr'?this['performAutoSkillTriggers'](_0x201371,_0x2952ac(0x1e9)):this['performAutoSkillTriggers'](_0x29062f,_0x2952ac(0x169)));}for(const _0x2fb9da of _0x1e4daf){this[_0x2952ac(0x1d4)](_0x2fb9da,_0x2952ac(0x15b));if(_0x2fb9da!==_0x516e6c){if(_0x2952ac(0x16f)===_0x2952ac(0x16f))this[_0x2952ac(0x1d4)](_0x2fb9da,_0x2952ac(0x194));else{const _0x3cb5fc=(_0x198b37(_0x2df134['$1'])||0x0)*0.01;_0x2e2d73=_0x2e71ce['random']()<_0x3cb5fc;}}}for(const _0x16a0df of _0x4cce86){this[_0x2952ac(0x1d4)](_0x16a0df,_0x2952ac(0x1e9));}},Game_Action[_0x33f718(0x14b)][_0x33f718(0x1d4)]=function(_0x32c139,_0x6e813e){const _0x3eb535=_0x33f718;if(!_0x32c139)return;if(this[_0x3eb535(0x15c)]())_0x32c139[_0x3eb535(0x1b0)](_0x3eb535(0x14a)[_0x3eb535(0x158)](_0x6e813e));if(this[_0x3eb535(0x174)]())_0x32c139['processAutoSkillTrigger'](_0x3eb535(0x164)['format'](_0x6e813e));if(this['isItem']())_0x32c139['processAutoSkillTrigger']('on%1Item'[_0x3eb535(0x158)](_0x6e813e));if(this[_0x3eb535(0x1ed)]())_0x32c139[_0x3eb535(0x1b0)](_0x3eb535(0x16a)[_0x3eb535(0x158)](_0x6e813e));if(this[_0x3eb535(0x19e)]())_0x32c139[_0x3eb535(0x1b0)](_0x3eb535(0x1ef)[_0x3eb535(0x158)](_0x6e813e));if(this[_0x3eb535(0x181)]())_0x32c139['processAutoSkillTrigger'](_0x3eb535(0x16b)[_0x3eb535(0x158)](_0x6e813e));const _0x397438=this['getAutoSkillTriggerSTypes']();for(let _0x69ceb3 of _0x397438){if(_0x3eb535(0x13e)==='maiqF'){if(!_0x69ceb3)continue;_0x69ceb3=_0x69ceb3['replace'](/[ ]/gi,''),_0x32c139[_0x3eb535(0x1b0)](_0x3eb535(0x178)[_0x3eb535(0x158)](_0x6e813e,_0x69ceb3));}else _0x1f4fc6['returnSavedAutoSkillTriggerActions']();}const _0x319fc8=this['getAutoSkillTriggerElements']();for(let _0x352cd1 of _0x319fc8){if(_0x3eb535(0x1e1)!==_0x3eb535(0x177)){if(!_0x352cd1)continue;_0x352cd1=_0x352cd1[_0x3eb535(0x1d0)](/[ ]/gi,''),_0x32c139[_0x3eb535(0x1b0)](_0x3eb535(0x15d)[_0x3eb535(0x158)](_0x6e813e,_0x352cd1));}else{if(_0x27602f===this[_0x3eb535(0x19a)]()&&this['hasDeathAutoSkillTrigger']())return this['processDeathAutoSkillTriggerEffects']();_0x53dec7[_0x3eb535(0x140)][_0x3eb535(0x15f)][_0x3eb535(0x18d)](this,_0x207ff1);}}},VisuMZ['AutoSkillTriggers']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x33f718(0x14b)]['addNewState'],Game_BattlerBase[_0x33f718(0x14b)][_0x33f718(0x1c3)]=function(_0x2e756b){const _0x484a1f=_0x33f718;if(_0x2e756b===this['deathStateId']()&&this['hasDeathAutoSkillTrigger']())return this[_0x484a1f(0x1b1)]();VisuMZ[_0x484a1f(0x140)][_0x484a1f(0x15f)][_0x484a1f(0x18d)](this,_0x2e756b);},Game_BattlerBase['prototype'][_0x33f718(0x186)]=function(){const _0x4f5a0b=_0x33f718;if(!SceneManager[_0x4f5a0b(0x1d2)]())return![];if(!this['canMove']())return![];if(this[_0x4f5a0b(0x144)])return![];return this[_0x4f5a0b(0x208)]()['some'](_0x48eccb=>this['meetsDeathAutoSkillTrigger'](_0x48eccb));},Game_BattlerBase['prototype'][_0x33f718(0x1b4)]=function(_0x5400da){const _0xa0252f=_0x33f718,_0x325697=VisuMZ[_0xa0252f(0x140)][_0xa0252f(0x14c)]['ONDEATH'];return _0x5400da&&_0x5400da[_0xa0252f(0x161)]['match'](_0x325697)&&this[_0xa0252f(0x1e2)](_0x5400da);},VisuMZ['AutoSkillTriggers']['Game_BattlerBase_isImmortal']=Game_BattlerBase['prototype'][_0x33f718(0x1fd)],Game_BattlerBase[_0x33f718(0x14b)]['isImmortal']=function(){const _0x36d640=_0x33f718;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x36d640(0x140)][_0x36d640(0x203)][_0x36d640(0x18d)](this);},Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1b0)]=function(_0x32e1c1){const _0x429f26=_0x33f718;if(!SceneManager[_0x429f26(0x1d2)]())return;_0x32e1c1=_0x32e1c1[_0x429f26(0x168)]()[_0x429f26(0x14d)]();const _0x320c8d=VisuMZ[_0x429f26(0x140)][_0x429f26(0x14c)][_0x32e1c1],_0x51a635=_0x32e1c1+_0x429f26(0x1fa),_0x40356c=VisuMZ[_0x429f26(0x140)]['RegExp'][_0x51a635];if(!_0x320c8d&&!_0x40356c)return;if(!this[_0x429f26(0x1fb)]())return;for(const _0xf78306 of this['skills']()){if(_0x429f26(0x17a)!=='wMTJA'){if(!_0xf78306)continue;if(!this[_0x429f26(0x1e2)](_0xf78306))continue;let _0x3992a9=![];if(_0xf78306[_0x429f26(0x161)]['match'](_0x320c8d))_0x3992a9=!![];else{if(_0xf78306['note']['match'](_0x40356c)){if(_0x429f26(0x1ae)!==_0x429f26(0x1d7)){const _0x20fca6=(Number(RegExp['$1'])||0x0)*0.01;_0x3992a9=Math[_0x429f26(0x192)]()<_0x20fca6;}else{const _0x51d9a1=_0x39a670[_0x429f26(0x140)]['RegExp']['ONDEATH'];return _0x492c4e&&_0x50df7d[_0x429f26(0x161)][_0x429f26(0x18c)](_0x51d9a1)&&this[_0x429f26(0x1e2)](_0x58a8ec);}}}if(_0x3992a9){if('wHzgq'!==_0x429f26(0x141))_0x1ab50a=this['elements']();else{this['forceAutoSkillTrigger'](_0xf78306['id']);const _0x22120c=BattleManager['_actionBattlers']['clone'](),_0x5040b9=BattleManager[_0x429f26(0x173)];BattleManager['_subject']=null,BattleManager[_0x429f26(0x1dc)](this),BattleManager[_0x429f26(0x148)]=_0x22120c,BattleManager[_0x429f26(0x173)]=_0x5040b9;}}}else{const _0x4eda5b=_0x418ed4(_0x596250['$1']);_0x4eda5b<_0x41c86f?(_0x43c7c9('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x429f26(0x158)](_0x677f28,_0x4eda5b,_0x25cb3b)),_0x4a883d['exit']()):_0xfb4c20=_0x5e9052[_0x429f26(0x14f)](_0x4eda5b,_0x52f37d);}}},Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1a7)]=function(_0x567978){const _0x197e66=_0x33f718;if(!this[_0x197e66(0x19c)]){if(_0x197e66(0x199)==='BjIUD')this['_savedAutoSkillTriggerActions']=this[_0x197e66(0x1b9)]['clone']();else{if(!this[_0x197e66(0x1fb)]())return;if(!_0x19eaff[_0x197e66(0x1d2)]())return;this[_0x197e66(0x165)]=!![],this['processAutoSkillTrigger'](_0x197e66(0x209));}}this[_0x197e66(0x1dc)](_0x567978,-0x2);if(!this[_0x197e66(0x1b9)])return;const _0x589225=this[_0x197e66(0x1b9)][this['_actions'][_0x197e66(0x204)]-0x1];_0x589225[_0x197e66(0x172)](!![]);},Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1f0)]=function(){const _0x2d45f2=_0x33f718;if(!this[_0x2d45f2(0x19c)])return;if(this[_0x2d45f2(0x1b9)][_0x2d45f2(0x204)]>0x0)return;this['_actions']=this['_savedAutoSkillTriggerActions'],this[_0x2d45f2(0x19c)]=undefined;},VisuMZ[_0x33f718(0x140)][_0x33f718(0x20a)]=Game_Battler['prototype'][_0x33f718(0x146)],Game_Battler['prototype'][_0x33f718(0x146)]=function(){const _0x3263f3=_0x33f718;this[_0x3263f3(0x19c)]=undefined,VisuMZ[_0x3263f3(0x140)][_0x3263f3(0x20a)][_0x3263f3(0x18d)](this);},VisuMZ[_0x33f718(0x140)][_0x33f718(0x187)]=Game_Battler[_0x33f718(0x14b)]['clearTpbChargeTime'],Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1d6)]=function(){const _0x537efe=_0x33f718;if(this[_0x537efe(0x151)]){this[_0x537efe(0x151)]=undefined;return;}VisuMZ[_0x537efe(0x140)][_0x537efe(0x187)][_0x537efe(0x18d)](this);},VisuMZ[_0x33f718(0x140)][_0x33f718(0x15e)]=Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1ca)],Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1ca)]=function(_0x5a0df9){const _0x43e616=_0x33f718;this['_savedAutoSkillTriggerActions']=undefined,$gameParty[_0x43e616(0x13f)]=!![],VisuMZ[_0x43e616(0x140)][_0x43e616(0x15e)][_0x43e616(0x18d)](this,_0x5a0df9),this[_0x43e616(0x1b0)](_0x43e616(0x1ca)),this[_0x43e616(0x149)]();},VisuMZ[_0x33f718(0x140)][_0x33f718(0x1f6)]=Game_BattlerBase[_0x33f718(0x14b)][_0x33f718(0x205)],Game_BattlerBase[_0x33f718(0x14b)][_0x33f718(0x205)]=function(){const _0xa2aa05=_0x33f718;VisuMZ['AutoSkillTriggers']['Game_BattlerBase_revive'][_0xa2aa05(0x18d)](this),this[_0xa2aa05(0x149)]();},Game_Battler[_0x33f718(0x14b)]['clearDeathAutoSkillTrigger']=function(){const _0x120b6c=_0x33f718;this[_0x120b6c(0x165)]=![],this[_0x120b6c(0x144)]=![];},Game_Battler[_0x33f718(0x14b)]['processDeathAutoSkillTriggerEffects']=function(){const _0x22708c=_0x33f718;if(!this[_0x22708c(0x1fb)]())return;if(!SceneManager['isSceneBattle']())return;this[_0x22708c(0x165)]=!![],this['processAutoSkillTrigger'](_0x22708c(0x209));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1fc)];Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1fc)]=function(){const _0x49d532=_0x33f718;_Game_Battler_onAllActionsEnd_[_0x49d532(0x18d)](this),this[_0x49d532(0x1aa)]();},Game_Battler[_0x33f718(0x14b)][_0x33f718(0x1aa)]=function(){const _0x101b51=_0x33f718;if(!this[_0x101b51(0x165)])return;if(this[_0x101b51(0x144)])return;const _0x594945=BattleManager[_0x101b51(0x176)];for(const _0x145bcc of _0x594945){if(_0x101b51(0x13c)===_0x101b51(0x1c4))_0x4a4916[_0x101b51(0x140)][_0x101b51(0x1cf)]();else{if(!_0x145bcc)continue;if(_0x145bcc[0x0]===this)return;}}this[_0x101b51(0x165)]=![],this['_deathAutoSkillTriggerPerformed']=!![],this[_0x101b51(0x179)]();if(this['isAlive']())this[_0x101b51(0x149)]();},VisuMZ[_0x33f718(0x140)][_0x33f718(0x13a)]=Game_Unit[_0x33f718(0x14b)][_0x33f718(0x1ca)],Game_Unit['prototype'][_0x33f718(0x1ca)]=function(_0x43eecb){const _0x2f7ec1=_0x33f718;VisuMZ[_0x2f7ec1(0x140)][_0x2f7ec1(0x13a)]['call'](this,_0x43eecb);if(this['constructor']===Game_Party)this[_0x2f7ec1(0x145)]=![];},Game_Unit[_0x33f718(0x14b)][_0x33f718(0x1f9)]=function(_0x41c607,_0x4e415){const _0x1a89a0=_0x33f718;_0x4e415=_0x4e415||null;const _0x1cf3d4=this['aliveMembers']()['filter'](_0x1f3f6a=>_0x1f3f6a!==_0x4e415);for(const _0x466b15 of _0x1cf3d4){if(_0x1a89a0(0x193)!==_0x1a89a0(0x193)){let _0x6165d2=[];if(_0xf53246['VisuMZ_1_ElementStatusCore'])_0x6165d2=this[_0x1a89a0(0x155)]();else{if(this[_0x1a89a0(0x138)]()[_0x1a89a0(0x157)][_0x1a89a0(0x1f7)]<0x0){const _0x366179=this[_0x1a89a0(0x1f8)]();_0x6165d2=_0x366179[_0x1a89a0(0x1a9)]();}else _0x6165d2=[this['item']()[_0x1a89a0(0x157)][_0x1a89a0(0x1f7)]];}return _0x6165d2[_0x1a89a0(0x159)](_0x120c80=>_0x45cb7e[_0x1a89a0(0x1e7)](_0x120c80));}else{if(!_0x466b15)continue;_0x466b15[_0x1a89a0(0x1b0)](_0x41c607);}}},Game_Party[_0x33f718(0x14b)]['processOnBattleWinAutoSkillTriggers']=function(){const _0x3df41e=_0x33f718;if(this['_onBattleWinAutoSkillTriggerOn'])return;this['_onBattleWinAutoSkillTriggerOn']=!![],this[_0x3df41e(0x1f9)](_0x3df41e(0x1c6));};