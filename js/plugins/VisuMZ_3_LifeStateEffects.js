//=============================================================================
// VisuStella MZ - Life State Effects
// VisuMZ_3_LifeStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LifeStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LifeStateEffects = VisuMZ.LifeStateEffects || {};
VisuMZ.LifeStateEffects.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [LifeStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Life_State_Effects_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Life State Effects plugin allow for trait objects and/or states to
 * create specific, though, commonly used effects found in many traditional
 * JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
 * whole new layer of strategy when it comes to status effects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto Life effect, which is a state effect that recovers a percentage of
 *   the user's HP and disappears upon triggering.
 * * Curse effect, which prevents HP, MP, and/or TP recovery.
 * * Doom effect, which is a state effect that will kill the affected battler
 *   once the state's timer wears off and expires.
 * * Fragile effect, which causes any time a user receives HP damage from a
 *   direct action, that user will instantly lose all HP.
 * * Guts, which prevents HP from dropping below 1, unless the battler's HP is
 *   at 1, itself.
 * * Undead, which causes normal HP healing to inflict damage instead, instant
 *   death effects to fully restore HP, and Drain effects to be inverted.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * === State-Only Effects ===
 * 
 * ---
 *
 * <Auto Life: x%>
 *
 * - Used for: State Notetags
 * - When the affected battler dies with this state present, this state will
 *   automatically remove itself (and any other states with <Auto Life: x%>) to
 *   restore that much HP% for the battler.
 * - Replace 'x' with a number representing that percentage of HP to heal the
 *   battler upon dying.
 *
 * ---
 *
 * <Doom>
 *
 * - Used for: State Notetags
 * - When this state expires naturally (without direct removal), kill the
 *   affected battler.
 *
 * ---
 * 
 * === Trait-Object Effects ===
 * 
 * ---
 *
 * <Curse HP>
 * <Curse MP>
 * <Curse TP>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the affected battler from being able to recover HP, MP, and/or TP
 *   depending on which notetag is being used.
 *
 * ---
 *
 * <Fragile>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If a battler affected by <Fragile> receives a direct attack and takes any
 *   HP damage (as opposed to event command damage or regeneration damage),
 *   then instantly kill the affected battler.
 *
 * ---
 *
 * <Guts>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This will prevent the battler from taking any fatal damage and leaves them
 *   with only 1 HP. However, if the battler has 1 HP and receives damage, then
 *   the battler will actually die.
 *
 * ---
 *
 * <Undead>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If the battler receives HP Healing, it receives damage instead.
 * - If the battler is a target of an instant death skill or item, then the
 *   battler will recover full HP.
 * - If the battler is the target of an HP Drain action, then the battler will
 *   drain HP from the attacker instead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effect Settings
 * ============================================================================
 * 
 * Auto-Life Settings
 * Curse Settings
 * Doom Settings
 * Fragile Settings
 * Guts Settings
 * Undead Settings
 *
 * When certain effects trigger, you can have an animation play (if the
 * VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
 * Each of the six effects provided by this plugin have animation and popup
 * effects that can be adjusted.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.03: June 24, 2021
 * * Bug Fixes!
 * ** Doom expiration should no longer affect temporary actors during
 *    calculations and causing crashes. Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Bug Fixes!
 * ** When Doom is applied but the battler later gains state resistance to
 *    Doom, Doom will no longer instantly kill the battler. Fix made by Irina.
 * 
 * Version 1.01: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent an infinite loop with Doom. Fix made by Olivia.
 *
 * Version 1.00: October 7, 2020
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
 * @param LifeStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoLife:struct
 * @text Auto Life Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Auto Life effect.
 * @default {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"[0, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Curse:struct
 * @text Curse Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Curse effect.
 * @default {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"[0, 0, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Doom:struct
 * @text Doom Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Doom effect.
 * @default {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"[128, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Fragile:struct
 * @text Fragile Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Fragile effect.
 * @default {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Guts:struct
 * @text Guts Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Guts effect.
 * @default {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Undead:struct
 * @text Undead Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Undead effect.
 * @default {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"[128, 128, 128, 160]","FlashDuration:num":"60"}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default TEXT
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x4df0=['status','4pIwTmo','Game_Battler_gainMpCurse','Game_Action_executeHpDamage','undead','fcIAx','traitObjects','setHp','removeState','ARRAYEVAL','Game_BattlerBase_eraseState','some','DldZF','71329fiCxHW','skills','gainMp','ARRAYSTRUCT','LAHbQ','version','onLifeStateAutoLifeEffect','Curse','clamp','requestFauxAnimation','parse','Game_Battler_removeStatesAuto','Game_Action_executeDamage','pOZki','subject','hasLifeStateFragileEffect','ARRAYNUM','Undead','eraseState','map','QwHWo','LifeStateEffects_AutoLife','Game_Action_itemEffectAddAttackState','LifeStateEffects','hasLifeStateCurseMpEffect','Fragile','onLifeStateEffect','AnimationID','_cache','Mute','boYtD','TextColor','description','LifeStateEffects_Guts','322906uJEfzd','noHealMp','1QrwCKt','NUM','prototype','Game_BattlerBase_addNewState','removeStatesAuto','Settings','checkCacheKey','return\x200','noHealHp','match','ARRAYJSON','322501kOhuho','Game_Battler_gainHpCurse','dataId','RegExp','toUpperCase','fragile','guJOP','isDead','46791gdGQlQ','TmhQN','28751RHmgEX','call','FlashDuration','233169AwNfSZ','Game_BattlerBase_setHp','itemEffectAddNormalState','format','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Battler_gainHp','startDamagePopup','onLifeStateDoomEffect','Game_Action_itemEffectAddNormalState','JSON','_allowUndeadHpHeal','ceil','hpAffected','Mirror','VisuMZ_1_BattleCore','rmldp','deathStateId','_tempBattler','isDrain','4sZdLkh','EVAL','addNewState','executeHpDamage','guts','STRUCT','aIjge','MqHWT','_processingVisuMzDoomEffect','isHpEffect','Doom','FUNC','gainHp','max','hasLifeStateCurseHpEffect','executeDamage','filter','RPrNu','PopupText','itemEffectAddAttackState','isStateAffected','VisuMZ_1_SkillsStatesCore','makeDeepCopy','LifeStateEffects_Fragile','requestMotion','RPhoc','dead','Game_Battler_addState','_result','parameters','autoLife','mhp','LifeStateEffects_CurseHp','11SlbgIf','rXsPf','doom','_removeStatesAutoInEffect','hasLifeStateCurseTpEffect','Guts','21566TpVeKh','isSceneBattle','FlashColor','hasLifeStateUndeadEffect','Game_Battler_gainTp','states','trim','VisuMZ_0_CoreEngine','includes','setupTextPopup','hasLifeStateGutsEffect','ConvertParams','concat','hasLifeStateAutoLifeEffect','addState','note','_motion','clearResult','RKMaU','exit','reduce'];const _0x255a34=_0x42f2;(function(_0x49ccc5,_0x328952){const _0x355dd6=_0x42f2;while(!![]){try{const _0x57b51c=parseInt(_0x355dd6(0x15a))*parseInt(_0x355dd6(0x165))+-parseInt(_0x355dd6(0x158))+-parseInt(_0x355dd6(0x1ac))*parseInt(_0x355dd6(0x1a6))+-parseInt(_0x355dd6(0x16f))*parseInt(_0x355dd6(0x1c2))+parseInt(_0x355dd6(0x172))+parseInt(_0x355dd6(0x16d))+-parseInt(_0x355dd6(0x1ce))*-parseInt(_0x355dd6(0x185));if(_0x57b51c===_0x328952)break;else _0x49ccc5['push'](_0x49ccc5['shift']());}catch(_0xa7ba13){_0x49ccc5['push'](_0x49ccc5['shift']());}}}(_0x4df0,0x33ea1));function _0x42f2(_0xbd9fb2,_0x3c7455){return _0x42f2=function(_0x4df05b,_0x42f2d0){_0x4df05b=_0x4df05b-0x138;let _0x2b984e=_0x4df0[_0x4df05b];return _0x2b984e;},_0x42f2(_0xbd9fb2,_0x3c7455);}var label=_0x255a34(0x14d),tier=tier||0x0,dependencies=[_0x255a34(0x180),_0x255a34(0x19a)],pluginData=$plugins[_0x255a34(0x195)](function(_0x3b3de1){const _0x16084b=_0x255a34;return _0x3b3de1[_0x16084b(0x1c1)]&&_0x3b3de1[_0x16084b(0x156)][_0x16084b(0x1b4)]('['+label+']');})[0x0];VisuMZ[label][_0x255a34(0x15f)]=VisuMZ[label][_0x255a34(0x15f)]||{},VisuMZ[_0x255a34(0x1b7)]=function(_0x26ceee,_0x4ff290){const _0x270bd0=_0x255a34;for(const _0x109a4e in _0x4ff290){if(_0x109a4e['match'](/(.*):(.*)/i)){if(_0x270bd0(0x196)===_0x270bd0(0x16b))this['onLifeStateAutoLifeEffect']();else{const _0x17778c=String(RegExp['$1']),_0x530d6d=String(RegExp['$2'])[_0x270bd0(0x169)]()[_0x270bd0(0x1b2)]();let _0x2d3662,_0x282932,_0x3dd485;switch(_0x530d6d){case _0x270bd0(0x15b):_0x2d3662=_0x4ff290[_0x109a4e]!==''?Number(_0x4ff290[_0x109a4e]):0x0;break;case _0x270bd0(0x146):_0x282932=_0x4ff290[_0x109a4e]!==''?JSON[_0x270bd0(0x140)](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932[_0x270bd0(0x149)](_0x3f4d3f=>Number(_0x3f4d3f));break;case _0x270bd0(0x186):_0x2d3662=_0x4ff290[_0x109a4e]!==''?eval(_0x4ff290[_0x109a4e]):null;break;case _0x270bd0(0x1ca):_0x282932=_0x4ff290[_0x109a4e]!==''?JSON[_0x270bd0(0x140)](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932[_0x270bd0(0x149)](_0x16663d=>eval(_0x16663d));break;case _0x270bd0(0x17b):_0x2d3662=_0x4ff290[_0x109a4e]!==''?JSON['parse'](_0x4ff290[_0x109a4e]):'';break;case _0x270bd0(0x164):_0x282932=_0x4ff290[_0x109a4e]!==''?JSON[_0x270bd0(0x140)](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932[_0x270bd0(0x149)](_0x4175bf=>JSON[_0x270bd0(0x140)](_0x4175bf));break;case _0x270bd0(0x190):_0x2d3662=_0x4ff290[_0x109a4e]!==''?new Function(JSON['parse'](_0x4ff290[_0x109a4e])):new Function(_0x270bd0(0x161));break;case'ARRAYFUNC':_0x282932=_0x4ff290[_0x109a4e]!==''?JSON['parse'](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932['map'](_0x3d33c5=>new Function(JSON[_0x270bd0(0x140)](_0x3d33c5)));break;case'STR':_0x2d3662=_0x4ff290[_0x109a4e]!==''?String(_0x4ff290[_0x109a4e]):'';break;case'ARRAYSTR':_0x282932=_0x4ff290[_0x109a4e]!==''?JSON['parse'](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932[_0x270bd0(0x149)](_0x53be60=>String(_0x53be60));break;case _0x270bd0(0x18a):_0x3dd485=_0x4ff290[_0x109a4e]!==''?JSON[_0x270bd0(0x140)](_0x4ff290[_0x109a4e]):{},_0x2d3662=VisuMZ[_0x270bd0(0x1b7)]({},_0x3dd485);break;case _0x270bd0(0x139):_0x282932=_0x4ff290[_0x109a4e]!==''?JSON[_0x270bd0(0x140)](_0x4ff290[_0x109a4e]):[],_0x2d3662=_0x282932['map'](_0xc25c09=>VisuMZ[_0x270bd0(0x1b7)]({},JSON[_0x270bd0(0x140)](_0xc25c09)));break;default:continue;}_0x26ceee[_0x17778c]=_0x2d3662;}}}return _0x26ceee;},(_0x544915=>{const _0x429869=_0x255a34,_0x28a6bb=_0x544915['name'];for(const _0x181cfe of dependencies){if(!Imported[_0x181cfe]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x429869(0x175)](_0x28a6bb,_0x181cfe)),SceneManager[_0x429869(0x1bf)]();break;}}const _0x3e3202=_0x544915['description'];if(_0x3e3202[_0x429869(0x163)](/\[Version[ ](.*?)\]/i)){if(_0x429869(0x18c)!==_0x429869(0x154)){const _0x5c72bf=Number(RegExp['$1']);_0x5c72bf!==VisuMZ[label][_0x429869(0x13b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x28a6bb,_0x5c72bf)),SceneManager[_0x429869(0x1bf)]());}else _0x29c32b[_0x429869(0x17c)]=!![],_0x120086[_0x429869(0x191)](_0x3c46a0[_0x429869(0x1a4)]),_0x178914[_0x429869(0x17c)]=_0x2e147a,_0xebc5ff['onLifeStateEffect'](_0x429869(0x147));}if(_0x3e3202[_0x429869(0x163)](/\[Tier[ ](\d+)\]/i)){const _0x52b5d5=Number(RegExp['$1']);_0x52b5d5<tier?(alert(_0x429869(0x176)[_0x429869(0x175)](_0x28a6bb,_0x52b5d5,tier)),SceneManager['exit']()):_0x429869(0x181)===_0x429869(0x1cd)?(_0x4ad953('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x429869(0x175)](_0x1c6b71,_0x2b713c)),_0x2bd4af[_0x429869(0x1bf)]()):tier=Math[_0x429869(0x192)](_0x52b5d5,tier);}VisuMZ[_0x429869(0x1b7)](VisuMZ[label]['Settings'],_0x544915[_0x429869(0x1a2)]);})(pluginData),VisuMZ['LifeStateEffects'][_0x255a34(0x168)]={'guts':/<(?:GUTS)>/i,'undead':/<(?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING)>/i,'fragile':/<(?:FRAGILE|ONE HIT KILL|DEATH ON HP DAMAGE)>/i,'noHealHp':/<(?:CANNOT HEAL HP|CANNOT RECOVER HP|CURSE HP)>/i,'noHealMp':/<(?:CANNOT HEAL MP|CANNOT RECOVER MP|CURSE MP)>/i,'noHealTp':/<(?:CANNOT HEAL TP|CANNOT RECOVER TP|CURSE TP)>/i,'autoLife':/<(?:AUTOLIFE|AUTO LIFE):[ ](\d+)([%％])>/i,'doom':/<(?:DOOM|DEATH SENTENCE)>/i},Game_Battler[_0x255a34(0x15c)][_0x255a34(0x150)]=function(_0x2bc281){const _0x2d9d41=_0x255a34;if(!SceneManager[_0x2d9d41(0x1ad)]())return![];const _0x4384a9=VisuMZ['LifeStateEffects']['Settings'][_0x2bc281];if(!_0x4384a9)return;if(Imported[_0x2d9d41(0x1b3)]&&_0x4384a9[_0x2d9d41(0x151)]>0x0){const _0x285cf7=[this],_0x22c82d=_0x4384a9['AnimationID'],_0x5683f1=_0x4384a9[_0x2d9d41(0x17f)],_0x30ae80=_0x4384a9[_0x2d9d41(0x153)];$gameTemp[_0x2d9d41(0x13f)](_0x285cf7,_0x22c82d,_0x5683f1,_0x30ae80);}if(_0x4384a9['PopupText']!==''){if(_0x2d9d41(0x19e)!==_0x2d9d41(0x19e))_0x1b4b69=_0x3994ff[_0x2d9d41(0x192)](_0x47180e,_0xfb725a);else{const _0x2360b0={'textColor':_0x4384a9['TextColor'],'flashColor':_0x4384a9[_0x2d9d41(0x1ae)],'flashDuration':_0x4384a9[_0x2d9d41(0x171)]};this['setupTextPopup'](_0x4384a9[_0x2d9d41(0x197)],_0x2360b0);}}},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1b9)]=function(){const _0x336883=_0x255a34;if(!SceneManager[_0x336883(0x1ad)]())return![];const _0x4bc32f=_0x336883(0x14b);if(this[_0x336883(0x160)](_0x4bc32f))return this[_0x336883(0x152)][_0x4bc32f];const _0x56db49=this[_0x336883(0x1c7)]()[_0x336883(0x1b8)](this[_0x336883(0x1cf)]());return this[_0x336883(0x152)][_0x4bc32f]=_0x56db49[_0x336883(0x1cc)](_0x364df9=>_0x364df9&&_0x364df9['note'][_0x336883(0x163)](VisuMZ[_0x336883(0x14d)][_0x336883(0x168)][_0x336883(0x1a3)])),this['_cache'][_0x4bc32f];},VisuMZ['LifeStateEffects']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x187)],Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x187)]=function(_0x293914){const _0x4f8ae8=_0x255a34;_0x293914===this[_0x4f8ae8(0x182)]()&&this[_0x4f8ae8(0x1b9)]()?this[_0x4f8ae8(0x13c)]():VisuMZ['LifeStateEffects'][_0x4f8ae8(0x15d)]['call'](this,_0x293914);},Game_Battler[_0x255a34(0x15c)]['onLifeStateAutoLifeEffect']=function(){const _0x2be7bb=_0x255a34,_0x344418=JsonEx[_0x2be7bb(0x19b)](this['_result']),_0x2a682c=VisuMZ[_0x2be7bb(0x14d)][_0x2be7bb(0x168)][_0x2be7bb(0x1a3)];let _0x3e9d88=this[_0x2be7bb(0x1b1)]()[_0x2be7bb(0x149)](_0x3d45e6=>_0x3d45e6&&_0x3d45e6[_0x2be7bb(0x1bb)][_0x2be7bb(0x163)](_0x2a682c)?Number(RegExp['$1'])*0.01:0x0);const _0x16cb26=_0x3e9d88[_0x2be7bb(0x1c0)]((_0x47bf93,_0x302258)=>_0x47bf93+_0x302258,0x0);let _0x282193=Math[_0x2be7bb(0x17d)](_0x16cb26*this[_0x2be7bb(0x1a4)]);_0x282193=_0x282193[_0x2be7bb(0x13e)](0x0,this[_0x2be7bb(0x1a4)]);if(_0x282193<=0x0)return;this[_0x2be7bb(0x1c8)](_0x282193),this[_0x2be7bb(0x1bd)](),this['_result']['hpDamage']=-_0x282193,this[_0x2be7bb(0x1a1)][_0x2be7bb(0x17e)]=!![],this[_0x2be7bb(0x178)]();for(const _0xb694e3 of this[_0x2be7bb(0x1b1)]()){if(!_0xb694e3)continue;if(_0xb694e3[_0x2be7bb(0x1bb)][_0x2be7bb(0x163)](_0x2a682c)){if('OvVNv'===_0x2be7bb(0x1be)){if(!_0x5249f8[_0x2be7bb(0x1ad)]())return![];const _0x4eaa02=_0x8b8ed0[_0x2be7bb(0x14d)]['Settings'][_0x3a2598];if(!_0x4eaa02)return;if(_0x8fb340[_0x2be7bb(0x1b3)]&&_0x4eaa02[_0x2be7bb(0x151)]>0x0){const _0x4da05e=[this],_0x1692a2=_0x4eaa02[_0x2be7bb(0x151)],_0x3b6348=_0x4eaa02[_0x2be7bb(0x17f)],_0x15859e=_0x4eaa02['Mute'];_0xfa7d9f[_0x2be7bb(0x13f)](_0x4da05e,_0x1692a2,_0x3b6348,_0x15859e);}if(_0x4eaa02[_0x2be7bb(0x197)]!==''){const _0x975e12={'textColor':_0x4eaa02[_0x2be7bb(0x155)],'flashColor':_0x4eaa02[_0x2be7bb(0x1ae)],'flashDuration':_0x4eaa02[_0x2be7bb(0x171)]};this[_0x2be7bb(0x1b5)](_0x4eaa02[_0x2be7bb(0x197)],_0x975e12);}}else this[_0x2be7bb(0x1c9)](_0xb694e3['id']);}}this[_0x2be7bb(0x150)]('AutoLife'),this['_result']=_0x344418;},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x141)]=Game_Battler['prototype']['removeStatesAuto'],Game_Battler[_0x255a34(0x15c)][_0x255a34(0x15e)]=function(_0x38c89a){const _0x352b69=_0x255a34;this['_removeStatesAutoInEffect']=!![],VisuMZ[_0x352b69(0x14d)][_0x352b69(0x141)][_0x352b69(0x170)](this,_0x38c89a),this[_0x352b69(0x1a9)]=undefined;},VisuMZ['LifeStateEffects'][_0x255a34(0x1cb)]=Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x148)],Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x148)]=function(_0x3883ba){const _0x355466=_0x255a34,_0x48b9d3=this[_0x355466(0x199)](_0x3883ba);VisuMZ[_0x355466(0x14d)]['Game_BattlerBase_eraseState'][_0x355466(0x170)](this,_0x3883ba);const _0x18d1ab=$dataStates[_0x3883ba];this['_removeStatesAutoInEffect']&&_0x18d1ab&&_0x18d1ab[_0x355466(0x1bb)][_0x355466(0x163)](VisuMZ[_0x355466(0x14d)][_0x355466(0x168)]['doom'])&&_0x48b9d3&&this[_0x355466(0x179)]();},Game_Battler[_0x255a34(0x15c)][_0x255a34(0x179)]=function(){const _0x19f502=_0x255a34;if(this[_0x19f502(0x18d)])return;if(this[_0x19f502(0x183)])return;this[_0x19f502(0x18d)]=!![],this[_0x19f502(0x1c8)](0x0),this['refresh'](),this[_0x19f502(0x18d)]=undefined;if(!this[_0x19f502(0x16c)]())return;this[_0x19f502(0x150)](_0x19f502(0x18f)),this['performCollapse'](),this[_0x19f502(0x19d)](_0x19f502(0x19f));const _0x481d22=this['battler']();_0x481d22&&(_0x19f502(0x1a7)!==_0x19f502(0x1a7)?(_0x3be9c7*=-0x1,this[_0x19f502(0x150)](_0x19f502(0x147))):_0x481d22[_0x19f502(0x1bc)]='dead');},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x145)]=function(){const _0x33bcdf=_0x255a34;if(!SceneManager[_0x33bcdf(0x1ad)]())return![];const _0x36caf7=_0x33bcdf(0x19c);if(this[_0x33bcdf(0x160)](_0x36caf7))return this[_0x33bcdf(0x152)][_0x36caf7];const _0x3d961e=this[_0x33bcdf(0x1c7)]()[_0x33bcdf(0x1b8)](this[_0x33bcdf(0x1cf)]());return this[_0x33bcdf(0x152)][_0x36caf7]=_0x3d961e[_0x33bcdf(0x1cc)](_0x4b2150=>_0x4b2150&&_0x4b2150['note']['match'](VisuMZ[_0x33bcdf(0x14d)][_0x33bcdf(0x168)][_0x33bcdf(0x16a)])),this[_0x33bcdf(0x152)][_0x36caf7];},VisuMZ['LifeStateEffects'][_0x255a34(0x1c4)]=Game_Action[_0x255a34(0x15c)][_0x255a34(0x188)],Game_Action[_0x255a34(0x15c)][_0x255a34(0x188)]=function(_0x334005,_0x115c6d){const _0x425de2=_0x255a34;VisuMZ['LifeStateEffects']['Game_Action_executeHpDamage'][_0x425de2(0x170)](this,_0x334005,_0x115c6d);if(_0x115c6d>0x0&&_0x334005[_0x425de2(0x145)]()){if(_0x425de2(0x16e)!==_0x425de2(0x16e)){const _0x2fb85b={'textColor':_0x254b67[_0x425de2(0x155)],'flashColor':_0x4a4bf9[_0x425de2(0x1ae)],'flashDuration':_0x58cd10['FlashDuration']};this[_0x425de2(0x1b5)](_0x54a3cf['PopupText'],_0x2fb85b);}else _0x334005[_0x425de2(0x1c8)](0x0),_0x334005[_0x425de2(0x150)](_0x425de2(0x14f));}},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1b6)]=function(){const _0x24ea35=_0x255a34;if(!SceneManager['isSceneBattle']())return![];if(this['hp']<=0x1)return![];const _0x25539e=_0x24ea35(0x157);if(this[_0x24ea35(0x160)](_0x25539e))return this['_cache'][_0x25539e];const _0x39cf3b=this['traitObjects']()[_0x24ea35(0x1b8)](this['skills']());return this[_0x24ea35(0x152)][_0x25539e]=_0x39cf3b[_0x24ea35(0x1cc)](_0x568ecc=>_0x568ecc&&_0x568ecc[_0x24ea35(0x1bb)][_0x24ea35(0x163)](VisuMZ[_0x24ea35(0x14d)][_0x24ea35(0x168)][_0x24ea35(0x189)])),this['_cache'][_0x25539e];},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x173)]=Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1c8)],Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1c8)]=function(_0x23c86a){const _0x1813ae=_0x255a34;if(this[_0x1813ae(0x1b6)]()&&_0x23c86a<=0x0){if(_0x1813ae(0x14a)!==_0x1813ae(0x14a))return _0x4dfbab[_0x1813ae(0x1c1)]&&_0x4aeed1[_0x1813ae(0x156)][_0x1813ae(0x1b4)]('['+_0x1dca31+']');else this[_0x1813ae(0x150)](_0x1813ae(0x1ab)),_0x23c86a=0x1;}VisuMZ[_0x1813ae(0x14d)][_0x1813ae(0x173)]['call'](this,_0x23c86a);},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1af)]=function(){const _0x5996d8=_0x255a34;if(this[_0x5996d8(0x17c)])return![];const _0x391764='LifeStateEffects_Undead';if(this[_0x5996d8(0x160)](_0x391764))return this[_0x5996d8(0x152)][_0x391764];const _0x2331b9=this[_0x5996d8(0x1c7)]()['concat'](this[_0x5996d8(0x1cf)]());return this[_0x5996d8(0x152)][_0x391764]=_0x2331b9[_0x5996d8(0x1cc)](_0x4fa985=>_0x4fa985&&_0x4fa985[_0x5996d8(0x1bb)][_0x5996d8(0x163)](VisuMZ[_0x5996d8(0x14d)][_0x5996d8(0x168)][_0x5996d8(0x1c5)])),this[_0x5996d8(0x152)][_0x391764];},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x177)]=Game_Battler[_0x255a34(0x15c)][_0x255a34(0x191)],Game_Battler[_0x255a34(0x15c)][_0x255a34(0x191)]=function(_0xb37630){const _0x310137=_0x255a34;this['hasLifeStateUndeadEffect']()&&_0xb37630>0x0&&(_0xb37630*=-0x1,this[_0x310137(0x150)](_0x310137(0x147))),VisuMZ[_0x310137(0x14d)][_0x310137(0x177)][_0x310137(0x170)](this,_0xb37630);},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x142)]=Game_Action[_0x255a34(0x15c)][_0x255a34(0x194)],Game_Action[_0x255a34(0x15c)][_0x255a34(0x194)]=function(_0x3a76fa,_0x53e0fc){const _0x5b1bf0=_0x255a34;if(this[_0x5b1bf0(0x184)]()&&this[_0x5b1bf0(0x18e)]()&&_0x53e0fc>0x0){this['subject']()[_0x5b1bf0(0x1af)]()&&(this[_0x5b1bf0(0x144)]()[_0x5b1bf0(0x17c)]=!![]);if(_0x3a76fa['hasLifeStateUndeadEffect']()){if(_0x5b1bf0(0x18b)===_0x5b1bf0(0x143)){const _0x2157ca=this[_0x5b1bf0(0x199)](_0x1abdf8);_0x1fe3e6[_0x5b1bf0(0x14d)]['Game_BattlerBase_eraseState'][_0x5b1bf0(0x170)](this,_0x1b220b);const _0x527b8d=_0xff7d70[_0x12b003];this[_0x5b1bf0(0x1a9)]&&_0x527b8d&&_0x527b8d['note'][_0x5b1bf0(0x163)](_0x5d92dc['LifeStateEffects']['RegExp'][_0x5b1bf0(0x1a8)])&&_0x2157ca&&this['onLifeStateDoomEffect']();}else _0x53e0fc*=-0x1,_0x3a76fa['_allowUndeadHpHeal']=!![],_0x3a76fa[_0x5b1bf0(0x150)](_0x5b1bf0(0x147));}}VisuMZ[_0x5b1bf0(0x14d)][_0x5b1bf0(0x142)][_0x5b1bf0(0x170)](this,_0x3a76fa,_0x53e0fc),_0x3a76fa[_0x5b1bf0(0x17c)]=undefined,this[_0x5b1bf0(0x144)]()[_0x5b1bf0(0x17c)]=undefined;},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x14c)]=Game_Action[_0x255a34(0x15c)][_0x255a34(0x198)],Game_Action[_0x255a34(0x15c)]['itemEffectAddAttackState']=function(_0x415c39,_0x4e0e5b){const _0x17529f=_0x255a34;_0x415c39['hasLifeStateUndeadEffect']()&&(_0x415c39[_0x17529f(0x17c)]=!![]),VisuMZ['LifeStateEffects'][_0x17529f(0x14c)][_0x17529f(0x170)](this,_0x415c39,_0x4e0e5b),_0x415c39[_0x17529f(0x17c)]=undefined;},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x1a0)]=Game_Battler[_0x255a34(0x15c)][_0x255a34(0x1ba)],Game_Battler[_0x255a34(0x15c)][_0x255a34(0x1ba)]=function(_0x136f88){const _0x4ac772=_0x255a34;_0x136f88===this[_0x4ac772(0x182)]()&&this['_allowUndeadHpHeal']?(this[_0x4ac772(0x191)](this[_0x4ac772(0x1a4)]),this[_0x4ac772(0x150)](_0x4ac772(0x147))):VisuMZ[_0x4ac772(0x14d)]['Game_Battler_addState']['call'](this,_0x136f88);},VisuMZ['LifeStateEffects'][_0x255a34(0x17a)]=Game_Action[_0x255a34(0x15c)][_0x255a34(0x174)],Game_Action['prototype'][_0x255a34(0x174)]=function(_0x5c7826,_0x35f1c3){const _0x42c511=_0x255a34;_0x35f1c3[_0x42c511(0x167)]===_0x5c7826[_0x42c511(0x182)]()&&_0x5c7826['hasLifeStateUndeadEffect']()?(_0x5c7826[_0x42c511(0x17c)]=!![],_0x5c7826['gainHp'](_0x5c7826[_0x42c511(0x1a4)]),_0x5c7826[_0x42c511(0x17c)]=undefined,_0x5c7826['onLifeStateEffect'](_0x42c511(0x147))):VisuMZ[_0x42c511(0x14d)][_0x42c511(0x17a)][_0x42c511(0x170)](this,_0x5c7826,_0x35f1c3);},Game_BattlerBase['prototype']['hasLifeStateCurseHpEffect']=function(){const _0x24bd4f=_0x255a34,_0x5e32b6=_0x24bd4f(0x1a5);if(this[_0x24bd4f(0x160)](_0x5e32b6))return this['_cache'][_0x5e32b6];const _0x4edffa=this[_0x24bd4f(0x1c7)]()[_0x24bd4f(0x1b8)](this[_0x24bd4f(0x1cf)]());return this[_0x24bd4f(0x152)][_0x5e32b6]=_0x4edffa[_0x24bd4f(0x1cc)](_0x3757b2=>_0x3757b2&&_0x3757b2[_0x24bd4f(0x1bb)][_0x24bd4f(0x163)](VisuMZ[_0x24bd4f(0x14d)]['RegExp'][_0x24bd4f(0x162)])),this[_0x24bd4f(0x152)][_0x5e32b6];},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x14e)]=function(){const _0x9d26c0=_0x255a34,_0x4a51f2='LifeStateEffects_CurseMp';if(this[_0x9d26c0(0x160)](_0x4a51f2))return this[_0x9d26c0(0x152)][_0x4a51f2];const _0x35a21a=this[_0x9d26c0(0x1c7)]()['concat'](this[_0x9d26c0(0x1cf)]());return this[_0x9d26c0(0x152)][_0x4a51f2]=_0x35a21a['some'](_0xe056a0=>_0xe056a0&&_0xe056a0[_0x9d26c0(0x1bb)][_0x9d26c0(0x163)](VisuMZ[_0x9d26c0(0x14d)][_0x9d26c0(0x168)][_0x9d26c0(0x159)])),this[_0x9d26c0(0x152)][_0x4a51f2];},Game_BattlerBase[_0x255a34(0x15c)][_0x255a34(0x1aa)]=function(){const _0x5b4bcf=_0x255a34,_0x175b07='LifeStateEffects_CurseTp';if(this[_0x5b4bcf(0x160)](_0x175b07))return this[_0x5b4bcf(0x152)][_0x175b07];const _0x1fedc7=this['traitObjects']()[_0x5b4bcf(0x1b8)](this['skills']());return this[_0x5b4bcf(0x152)][_0x175b07]=_0x1fedc7['some'](_0x57abb1=>_0x57abb1&&_0x57abb1[_0x5b4bcf(0x1bb)][_0x5b4bcf(0x163)](VisuMZ['LifeStateEffects'][_0x5b4bcf(0x168)]['noHealTp'])),this[_0x5b4bcf(0x152)][_0x175b07];},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x166)]=Game_Battler[_0x255a34(0x15c)][_0x255a34(0x191)],Game_Battler[_0x255a34(0x15c)][_0x255a34(0x191)]=function(_0x3c9e4f){const _0x1be283=_0x255a34;_0x3c9e4f>0x0&&this[_0x1be283(0x193)]()&&(_0x1be283(0x13a)===_0x1be283(0x13a)?(_0x3c9e4f=0x0,this[_0x1be283(0x150)](_0x1be283(0x13d))):_0xe7ce52[_0x1be283(0x167)]===_0x2c232e['deathStateId']()&&_0x46d564['hasLifeStateUndeadEffect']()?(_0x24cd3b['_allowUndeadHpHeal']=!![],_0x46fc6d[_0x1be283(0x191)](_0x34825a[_0x1be283(0x1a4)]),_0x404853[_0x1be283(0x17c)]=_0x472482,_0xe82f05[_0x1be283(0x150)](_0x1be283(0x147))):_0x3ff7a8[_0x1be283(0x14d)][_0x1be283(0x17a)][_0x1be283(0x170)](this,_0xcbda89,_0x4589f1)),VisuMZ[_0x1be283(0x14d)]['Game_Battler_gainHpCurse'][_0x1be283(0x170)](this,_0x3c9e4f);},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x1c3)]=Game_Battler['prototype'][_0x255a34(0x138)],Game_Battler[_0x255a34(0x15c)][_0x255a34(0x138)]=function(_0x5294b6){const _0x5cdf5f=_0x255a34;if(_0x5294b6>0x0&&this[_0x5cdf5f(0x14e)]()){if(_0x5cdf5f(0x1c6)!=='fcIAx'){const _0x2e411e=_0x30cc75(_0x510428['$1']);_0x2e411e<_0xf650e8?(_0x26106d(_0x5cdf5f(0x176)[_0x5cdf5f(0x175)](_0xf0fc6f,_0x2e411e,_0x186bd1)),_0x3ccd20[_0x5cdf5f(0x1bf)]()):_0x4bd8bd=_0x2b7c25[_0x5cdf5f(0x192)](_0x2e411e,_0x41e868);}else _0x5294b6=0x0,this[_0x5cdf5f(0x150)](_0x5cdf5f(0x13d));}VisuMZ[_0x5cdf5f(0x14d)][_0x5cdf5f(0x1c3)][_0x5cdf5f(0x170)](this,_0x5294b6);},VisuMZ[_0x255a34(0x14d)][_0x255a34(0x1b0)]=Game_Battler[_0x255a34(0x15c)]['gainTp'],Game_Battler[_0x255a34(0x15c)]['gainTp']=function(_0xcc6779){const _0x1b1951=_0x255a34;_0xcc6779>0x0&&this['hasLifeStateCurseTpEffect']()&&(_0xcc6779=0x0,this['onLifeStateEffect']('Curse')),VisuMZ[_0x1b1951(0x14d)][_0x1b1951(0x1b0)][_0x1b1951(0x170)](this,_0xcc6779);};