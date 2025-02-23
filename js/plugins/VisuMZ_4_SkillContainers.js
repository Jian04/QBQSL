//=============================================================================
// VisuStella MZ - Skill Containers
// VisuMZ_4_SkillContainers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillContainers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillContainers = VisuMZ.SkillContainers || {};
VisuMZ.SkillContainers.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [SkillContainers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Containers_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Containers let you transform skills in-game to contain an inner list
 * of skills, accessible to players. These container skills will draw from a
 * list of skills that either require the player to already have them or allow
 * them to even use skills they don't normally have access to.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill Containers let you condense skills to become containers for lists of
 *   other skills accessible to the player.
 * * Reduce the size of a skill library by grouping them together.
 * * Skill Containers can contain skills that require the actor to already know
 *   them (either through learning or traits) or forcefully allow them to be
 *   accessible regardless.
 * * These container skills don't appear unless the container itself has access
 *   to at least one skill.
 * * These container skills are usable from the skill menu or in-battle!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * === Skill Container-Related Notetags ===
 * 
 * ---
 *
 * <Known Skill List: id>
 * <Known Skills List: id, id, id>
 *
 * <Known Skill List: name>
 * <Known Skills List: name, name, name>
 * 
 * <Known Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills require the actor to have learned the skill or to have access
 *   to the skill 
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Known Skills List: 51, 52, 53>
 *   <Known Skills List: Heal I, Heal II, Heal III>
 *   <Known Skills List: 51 To 53>
 *
 * ---
 *
 * <Force Skill List: id>
 * <Force Skills List: id, id, id>
 *
 * <Force Skill List: name>
 * <Force Skills List: name, name, name>
 * 
 * <Force Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills do NOT require the actor to have learned the skill. These
 *   listed skills will always be accessible.
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Force Skills List: 51, 52, 53>
 *   <Force Skills List: Heal I, Heal II, Heal III>
 *   <Force Skills List: 51 To 53>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The Plugin Parameters allow you to adjust how the text for Skill Containers
 * appear in-game. This way, you can help your players differentiate them from
 * regular skills.
 *
 * ---
 *
 * General
 * 
 *   Skill Container Text:
 *   - Determines the text that appears where the skill costs normally would
 *     appear instead.
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
 * Version 1.02: June 4, 2021
 * * Compatibility Update!
 * ** Skill containers should now work with Auto Battle. This does not apply
 *    to enemies, however. Enemies will still require the actual skills to be
 *    used properly. Update made by Olivia.
 * 
 * Version 1.01: April 30, 2021
 * * Compatibility Update!
 * ** Skills displayed inside the containers are now affected by the visibility
 *    notetags such as <Show Switch: x> and <Hide Switch :x> as well as the
 *    <JS Skill Visible> notetags. Update made by Arisu.
 * * Feature Update!
 * ** When using the VisuMZ_3_SideviewBattleUI plugin, resize the window
 *    according to the title items inside of the container window instead of
 *    basing it off the skill window's size. Update made by Olivia.
 *
 * Version 1.00 Official Release Date: May 7, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableSkillContainersMenu
 * @text System: Enable SkillContainers in Menu?
 * @desc Enables/disables SkillContainers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables SkillContainers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillContainersMenu
 * @text System: Show SkillContainers in Menu?
 * @desc Shows/hides SkillContainers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides SkillContainers menu inside the main menu.
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
 * @param SkillContainers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ContainerText:str
 * @text Skill Container Text
 * @desc Determines the text that appears where the skill costs
 * normally would appear instead.
 * @default \FS[22]......
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
//=============================================================================

const _0x36fa=['filter','index','AMina','pop','drawTextEx','onItemOk','ARRAYEVAL','HrTdl','bNUBT','uCJEm','Window_SkillList_makeItemList','processSkillContainerCancel','textSizeEx','RegExp','Scene_Battle_onSkillCancel','_data','usableSkills','Dexia','Scene_Battle_onSkillOk','item','Window_SkillList_initialize','Window_SkillList_includes','max','NUM','ARRAYSTR','_skillWindow','Game_Actor_usableSkills','ntxLT','HAsaT','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','tMDWS','getSkillContainerList','OIAYW','getSkillIdWithName','sQRnp','containerIncludes','parse','1267401cMhlMp','wUBid','Settings','indexOf','skill','1ERMWxf','XJMwl','exjZW','onSkillCancel','test','processSkillContainerOk','log','Window_SkillList_drawSkillCost','Window_ActorCommand_canAddSkillCommand','status','Dgxup','prototype','5wWZHSP','addSkillContainerStack','canAddSkillCommand','BKKGm','_skillContainerStack','activate','bNMkE','match','SkillContainers','hasSkill','note','JWUgu','ConvertParams','parameters','format','ExEVI','trim','isSkillContainer','_skillContainerLoops','igMJO','STR','map','44540aZFxYO','Scene_Battle_selectNextCommand','Scene_Skill_onItemCancel','onSkillOk','call','selectNextCommand','bnDHo','parseSkillContainerList','sort','drawSkillContainerText','isShowingSkillContainerList','222020YbDmYl','skillContainerText','KnownListRange','push','\x5cFS[22]...','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ForceListRange','toUpperCase','22804nhMuQg','2yduMmO','makeSkillContainerList','_skillIDs','gVYjZ','FUNC','split','version','drawSkillCost','removeSkillContainerStack','_actor','name','length','onItemCancel','WeSjM','97126DLUGLn','BLuNf','description','forceSelect','BXRVM','checkShowHideJS','247389cWHeWK','concat','DGwuX','VisuMZ_1_BattleCore','TZejM','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','exit','includes','adjustSideviewUiWidth','703613Fzkvlt','11TSYgAg','ARRAYJSON','Scene_Skill_onItemOk','width','addSkillContainerSkills','wmzZp','refresh','initialize','ForceList','resetFontSettings','KnownList','YyAJP','_itemWindow','checkShowHideNotetags','clearSkillContainerStacks','ARRAYNUM'];const _0x39d1eb=_0x3a61;function _0x3a61(_0x558e49,_0x57a8dd){_0x558e49=_0x558e49-0xe5;let _0x36faca=_0x36fa[_0x558e49];return _0x36faca;}(function(_0x5118ab,_0xa6dbb4){const _0x5e9885=_0x3a61;while(!![]){try{const _0x3b1d46=parseInt(_0x5e9885(0x138))*parseInt(_0x5e9885(0x10f))+parseInt(_0x5e9885(0x156))*-parseInt(_0x5e9885(0x103))+-parseInt(_0x5e9885(0x130))+parseInt(_0x5e9885(0x139))*-parseInt(_0x5e9885(0x14d))+-parseInt(_0x5e9885(0x147))+parseInt(_0x5e9885(0x157))*parseInt(_0x5e9885(0x125))+parseInt(_0x5e9885(0xfe));if(_0x3b1d46===_0xa6dbb4)break;else _0x5118ab['push'](_0x5118ab['shift']());}catch(_0x23ae0c){_0x5118ab['push'](_0x5118ab['shift']());}}}(_0x36fa,0x56620));var label='SkillContainers',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x39d1eb(0x167)](function(_0x2c0195){const _0x3a6997=_0x39d1eb;return _0x2c0195[_0x3a6997(0x10c)]&&_0x2c0195[_0x3a6997(0x149)][_0x3a6997(0x154)]('['+label+']');})[0x0];VisuMZ[label][_0x39d1eb(0x100)]=VisuMZ[label][_0x39d1eb(0x100)]||{},VisuMZ[_0x39d1eb(0x11b)]=function(_0x1d66af,_0x5b3d1f){const _0x22ae43=_0x39d1eb;for(const _0x8fd661 in _0x5b3d1f){if(_0x8fd661[_0x22ae43(0x116)](/(.*):(.*)/i)){if(_0x22ae43(0x146)===_0x22ae43(0x146)){const _0x287233=String(RegExp['$1']),_0x1f13c3=String(RegExp['$2'])[_0x22ae43(0x137)]()['trim']();let _0x22ec90,_0x2522d3,_0x2d4125;switch(_0x1f13c3){case _0x22ae43(0xf0):_0x22ec90=_0x5b3d1f[_0x8fd661]!==''?Number(_0x5b3d1f[_0x8fd661]):0x0;break;case _0x22ae43(0x166):_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON['parse'](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3[_0x22ae43(0x124)](_0x3a73ab=>Number(_0x3a73ab));break;case'EVAL':_0x22ec90=_0x5b3d1f[_0x8fd661]!==''?eval(_0x5b3d1f[_0x8fd661]):null;break;case _0x22ae43(0x16d):_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3[_0x22ae43(0x124)](_0x5bca44=>eval(_0x5bca44));break;case'JSON':_0x22ec90=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):'';break;case _0x22ae43(0x158):_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3[_0x22ae43(0x124)](_0x1c6f1e=>JSON[_0x22ae43(0xfd)](_0x1c6f1e));break;case _0x22ae43(0x13d):_0x22ec90=_0x5b3d1f[_0x8fd661]!==''?new Function(JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661])):new Function('return\x200');break;case'ARRAYFUNC':_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3[_0x22ae43(0x124)](_0xf2112a=>new Function(JSON['parse'](_0xf2112a)));break;case _0x22ae43(0x123):_0x22ec90=_0x5b3d1f[_0x8fd661]!==''?String(_0x5b3d1f[_0x8fd661]):'';break;case _0x22ae43(0xf1):_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3['map'](_0x507568=>String(_0x507568));break;case'STRUCT':_0x2d4125=_0x5b3d1f[_0x8fd661]!==''?JSON[_0x22ae43(0xfd)](_0x5b3d1f[_0x8fd661]):{},_0x22ec90=VisuMZ[_0x22ae43(0x11b)]({},_0x2d4125);break;case'ARRAYSTRUCT':_0x2522d3=_0x5b3d1f[_0x8fd661]!==''?JSON['parse'](_0x5b3d1f[_0x8fd661]):[],_0x22ec90=_0x2522d3[_0x22ae43(0x124)](_0xaf595c=>VisuMZ['ConvertParams']({},JSON['parse'](_0xaf595c)));break;default:continue;}_0x1d66af[_0x287233]=_0x22ec90;}else{function _0x44d70e(){const _0x3b7cc1=_0x22ae43;return _0x3e045d[_0x3b7cc1(0x10c)]&&_0x24a173[_0x3b7cc1(0x149)][_0x3b7cc1(0x154)]('['+_0x2b2e6b+']');}}}}return _0x1d66af;},(_0x52eb30=>{const _0x591b7b=_0x39d1eb,_0x246306=_0x52eb30['name'];for(const _0x168d02 of dependencies){if(_0x591b7b(0x170)!==_0x591b7b(0x170)){function _0x1d4e86(){const _0x428001=_0x591b7b;this[_0x428001(0x172)]();}}else{if(!Imported[_0x168d02]){if(_0x591b7b(0xea)!=='LTYIX'){alert(_0x591b7b(0x135)[_0x591b7b(0x11d)](_0x246306,_0x168d02)),SceneManager[_0x591b7b(0x153)]();break;}else{function _0x37b562(){const _0x4c9623=_0x591b7b;for(const _0x3afa80 of _0x5bcad1){_0x3afa80[_0x4c9623(0x116)](_0x4da199['KnownList']);let _0x547184=_0x5b4974[_0x4c9623(0x12c)](_0x458992['$1']);_0x547184=_0x547184[_0x4c9623(0x167)](_0x3be89e=>_0x1b2768[_0x4c9623(0x118)](_0x3be89e)),_0x1d4647=_0x4acb87['concat'](_0x547184);}}}}}}const _0x3cb2c8=_0x52eb30[_0x591b7b(0x149)];if(_0x3cb2c8[_0x591b7b(0x116)](/\[Version[ ](.*?)\]/i)){const _0xaaad5=Number(RegExp['$1']);_0xaaad5!==VisuMZ[label][_0x591b7b(0x13f)]&&(alert(_0x591b7b(0x152)['format'](_0x246306,_0xaaad5)),SceneManager[_0x591b7b(0x153)]());}if(_0x3cb2c8[_0x591b7b(0x116)](/\[Tier[ ](\d+)\]/i)){const _0x2824a3=Number(RegExp['$1']);if(_0x2824a3<tier)alert(_0x591b7b(0xf6)[_0x591b7b(0x11d)](_0x246306,_0x2824a3,tier)),SceneManager['exit']();else{if(_0x591b7b(0x13c)===_0x591b7b(0x169)){function _0x2bf4b2(){const _0x3a0c3a=_0x591b7b,_0x4b1b56=_0x68023b(_0x5a3778['$1']);_0x4b1b56<_0x3fafd6?(_0x87c960(_0x3a0c3a(0xf6)[_0x3a0c3a(0x11d)](_0x3590dc,_0x4b1b56,_0x48b7b2)),_0x4cd233['exit']()):_0x25ca60=_0xa25d8f[_0x3a0c3a(0xef)](_0x4b1b56,_0x1ff12b);}}else tier=Math[_0x591b7b(0xef)](_0x2824a3,tier);}}VisuMZ[_0x591b7b(0x11b)](VisuMZ[label]['Settings'],_0x52eb30[_0x591b7b(0x11c)]);})(pluginData),VisuMZ['SkillContainers'][_0x39d1eb(0xe6)]={'KnownList':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'KnownListRange':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'ForceList':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'ForceListRange':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},DataManager['isSkillContainer']=function(_0x1c2a92){const _0x3f79b0=_0x39d1eb;if(!_0x1c2a92)return![];if(typeof _0x1c2a92===Number){if('gYqUk'==='gYqUk')console[_0x3f79b0(0x109)](_0x3f79b0(0x107)),_0x1c2a92=$dataSkills[_0x1c2a92];else{function _0x5f08a6(){const _0x19c5e3=_0x3f79b0;let _0x52dd8f=_0x756d94[_0x19c5e3(0x117)][_0x19c5e3(0xf3)][_0x19c5e3(0x129)](this);return this[_0x19c5e3(0x121)]=0x0,_0x52dd8f=this[_0x19c5e3(0x15b)](_0x52dd8f),_0x52dd8f;}}}const _0x16068a=VisuMZ[_0x3f79b0(0x117)][_0x3f79b0(0xe6)],_0x2da2d1=_0x1c2a92[_0x3f79b0(0x119)];return _0x2da2d1[_0x3f79b0(0x116)](_0x16068a['KnownList'])||_0x2da2d1[_0x3f79b0(0x116)](_0x16068a[_0x3f79b0(0x15f)]);},DataManager[_0x39d1eb(0xf8)]=function(_0x5cec1c,_0x292574){const _0x285f99=_0x39d1eb;if(!_0x292574)return[];const _0xde2ae=VisuMZ[_0x285f99(0x117)][_0x285f99(0xe6)],_0x56114c=_0x292574['note'];let _0x3f9fd6=[];if(_0x5cec1c){if(!![]){const _0xc3144d=_0x56114c[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x161)]);if(_0xc3144d)for(const _0x2f9f5d of _0xc3144d){if('Qelcw'==='Qelcw'){_0x2f9f5d[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x161)]);let _0x46d8fa=DataManager[_0x285f99(0x12c)](RegExp['$1']);_0x46d8fa=_0x46d8fa[_0x285f99(0x167)](_0x4997d2=>_0x5cec1c[_0x285f99(0x118)](_0x4997d2)),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x14e)](_0x46d8fa);}else{function _0x52e767(){const _0x51673d=_0x285f99;_0x123a8d[_0x51673d(0x117)]['Window_SkillList_initialize'][_0x51673d(0x129)](this,_0xaf6743),this[_0x51673d(0x113)]=[];}}}}if(!![]){const _0x3f4a82=_0x56114c[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x132)]);if(_0x3f4a82)for(const _0x276ce1 of _0x3f4a82){_0x276ce1[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x132)]);const _0x5dfce1=Number(RegExp['$1']),_0x2c178e=Number(RegExp['$2']);let _0x402f42=[];for(let _0x2482a1=_0x5dfce1;_0x2482a1<=_0x2c178e;_0x2482a1++){_0x402f42[_0x285f99(0x133)](_0x2482a1);}_0x402f42=_0x402f42[_0x285f99(0x167)](_0x535a20=>_0x5cec1c['hasSkill'](_0x535a20)),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x14e)](_0x402f42);}}}if(!![]){if(_0x285f99(0x14b)!==_0x285f99(0xff)){if(!![]){if(_0x285f99(0xf7)!==_0x285f99(0xf7)){function _0x139edd(){const _0x4bf334=_0x285f99;this[_0x4bf334(0x108)]();}}else{const _0x363529=_0x56114c[_0x285f99(0x116)](_0xde2ae['ForceList']);if(_0x363529)for(const _0x327607 of _0x363529){_0x327607['match'](_0xde2ae['ForceList']);let _0x354754=DataManager[_0x285f99(0x12c)](RegExp['$1']);_0x3f9fd6=_0x3f9fd6[_0x285f99(0x14e)](_0x354754);}}}if(!![]){if(_0x285f99(0x12b)==='WbZwk'){function _0x5953e7(){const _0x1f2190=_0x285f99,_0x43a2a0={'skill':this['_skillWindow']['item'](),'index':this[_0x1f2190(0xf2)][_0x1f2190(0x168)]()};this[_0x1f2190(0xf2)][_0x1f2190(0x110)](_0x43a2a0),this[_0x1f2190(0xf2)][_0x1f2190(0x114)]();}}else{const _0x7296fe=_0x56114c[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x136)]);if(_0x7296fe){if('sbmmg'==='sbmmg')for(const _0x4de795 of _0x7296fe){_0x4de795[_0x285f99(0x116)](_0xde2ae[_0x285f99(0x136)]);const _0x22285a=Number(RegExp['$1']),_0x218cf2=Number(RegExp['$2']);let _0xfa1977=[];for(let _0x8b601d=_0x22285a;_0x8b601d<=_0x218cf2;_0x8b601d++){_0xfa1977[_0x285f99(0x133)](_0x8b601d);}_0x3f9fd6=_0x3f9fd6[_0x285f99(0x14e)](_0xfa1977);}else{function _0x2e176e(){const _0xa272f0=_0x285f99;_0x1161e8[_0xa272f0(0x117)][_0xa272f0(0x159)]['call'](this);}}}}}}else{function _0x4fce77(){return![];}}}return _0x3f9fd6=_0x3f9fd6[_0x285f99(0x167)](_0x5aa423=>!!$dataSkills[_0x5aa423]),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x167)](_0x367de7=>_0x367de7!==_0x292574['id']),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x167)](_0x332ed9=>$dataSkills[_0x332ed9][_0x285f99(0x143)][_0x285f99(0x11f)]()!==''),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x167)](_0x48d183=>!$dataSkills[_0x48d183]['name']['match'](/-----/i)),_0x3f9fd6=_0x3f9fd6[_0x285f99(0x167)]((_0x5d2af1,_0x666451,_0x555ff2)=>_0x555ff2[_0x285f99(0x101)](_0x5d2af1)===_0x666451),_0x3f9fd6[_0x285f99(0x12d)]((_0x1b36d1,_0xe1d966)=>_0x1b36d1-_0xe1d966),_0x3f9fd6;},DataManager['parseSkillContainerList']=function(_0x190bc9){const _0x596337=_0x39d1eb;_0x190bc9=_0x190bc9['split'](',')[_0x596337(0x124)](_0x919ebf=>_0x919ebf['trim']());let _0x422aa3=[];for(let _0x3bc804 of _0x190bc9){if('XblGK'===_0x596337(0x162)){function _0x232bd7(){const _0x1443e6=_0x596337;_0x5e0998('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1443e6(0x11d)](_0x35ce3b,_0x58f724)),_0xc94238['exit']();}}else{_0x3bc804=(String(_0x3bc804)||'')[_0x596337(0x11f)]();const _0x323f64=/^\d+$/[_0x596337(0x107)](_0x3bc804);_0x323f64?_0x422aa3[_0x596337(0x133)](Number(_0x3bc804)):_0x422aa3['push'](DataManager[_0x596337(0xfa)](_0x3bc804));}}return _0x422aa3;},DataManager['getSkillIdWithName']=function(_0x3a10fe){const _0x4cdd27=_0x39d1eb;_0x3a10fe=_0x3a10fe[_0x4cdd27(0x137)]()[_0x4cdd27(0x11f)](),this[_0x4cdd27(0x13b)]=this[_0x4cdd27(0x13b)]||{};if(this[_0x4cdd27(0x13b)][_0x3a10fe])return this[_0x4cdd27(0x13b)][_0x3a10fe];for(const _0x4ac1f4 of $dataSkills){if(!_0x4ac1f4)continue;this[_0x4cdd27(0x13b)][_0x4ac1f4[_0x4cdd27(0x143)][_0x4cdd27(0x137)]()[_0x4cdd27(0x11f)]()]=_0x4ac1f4['id'];}return this[_0x4cdd27(0x13b)][_0x3a10fe]||0x0;},TextManager['skillContainerText']=_0x39d1eb(0x134),VisuMZ['SkillContainers'][_0x39d1eb(0x159)]=Scene_Skill['prototype'][_0x39d1eb(0x16c)],Scene_Skill['prototype'][_0x39d1eb(0x16c)]=function(){const _0x3b8981=_0x39d1eb,_0x2eba4c=this[_0x3b8981(0xec)]();if(DataManager[_0x3b8981(0x120)](_0x2eba4c))this[_0x3b8981(0x108)]();else{if(_0x3b8981(0x11e)!==_0x3b8981(0x11e)){function _0x5952cb(){const _0x30bb96=_0x3b8981;_0xf1c408[_0x30bb96(0x120)](_0x2b87a6)?this[_0x30bb96(0x12e)](_0x37267e,_0x32e6f8,_0x1217a5,_0x1a8c0b):_0x136cdd[_0x30bb96(0x117)][_0x30bb96(0x10a)][_0x30bb96(0x129)](this,_0x370e9b,_0x21f662,_0x4f77c2,_0x2c63c2);}}else VisuMZ[_0x3b8981(0x117)]['Scene_Skill_onItemOk'][_0x3b8981(0x129)](this);}},Scene_Skill[_0x39d1eb(0x10e)]['processSkillContainerOk']=function(){const _0x99d301=_0x39d1eb,_0x51e09e={'skill':this[_0x99d301(0x163)][_0x99d301(0xec)](),'index':this[_0x99d301(0x163)][_0x99d301(0x168)]()};this[_0x99d301(0x163)][_0x99d301(0x110)](_0x51e09e),this[_0x99d301(0x163)][_0x99d301(0x114)]();},VisuMZ['SkillContainers'][_0x39d1eb(0x127)]=Scene_Skill['prototype'][_0x39d1eb(0x145)],Scene_Skill['prototype']['onItemCancel']=function(){const _0x890e68=_0x39d1eb;if(this[_0x890e68(0x163)][_0x890e68(0x12f)]())this[_0x890e68(0x172)]();else{if(_0x890e68(0xf5)!==_0x890e68(0x16e))VisuMZ['SkillContainers'][_0x890e68(0x127)][_0x890e68(0x129)](this);else{function _0x1afb33(){const _0x2285ef=_0x890e68;this[_0x2285ef(0x108)]();}}}},Scene_Skill['prototype']['processSkillContainerCancel']=function(){const _0x58a743=_0x39d1eb;this[_0x58a743(0x163)][_0x58a743(0x141)](),this[_0x58a743(0x163)][_0x58a743(0x114)]();},VisuMZ[_0x39d1eb(0x117)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x128)],Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x128)]=function(){const _0x2b22c0=_0x39d1eb,_0x124eda=this['_skillWindow'][_0x2b22c0(0xec)]();if(DataManager['isSkillContainer'](_0x124eda)){if(_0x2b22c0(0xfb)===_0x2b22c0(0x122)){function _0xa3149b(){const _0x50f589=_0x2b22c0;_0x201950['match'](_0x27a151[_0x50f589(0x136)]);const _0x324c06=_0x120785(_0x125995['$1']),_0x6333c1=_0xbe60c5(_0x268335['$2']);let _0x7f8367=[];for(let _0x44c9b5=_0x324c06;_0x44c9b5<=_0x6333c1;_0x44c9b5++){_0x7f8367[_0x50f589(0x133)](_0x44c9b5);}_0x500ace=_0x27b40b['concat'](_0x7f8367);}}else this[_0x2b22c0(0x108)]();}else{if(_0x2b22c0(0x115)!==_0x2b22c0(0x104))VisuMZ[_0x2b22c0(0x117)][_0x2b22c0(0xeb)][_0x2b22c0(0x129)](this);else{function _0x50b90d(){const _0x3bbef3=_0x2b22c0;if(this[_0x3bbef3(0x113)]['length']<=0x0)return;const _0x16c68c=this[_0x3bbef3(0x113)][this[_0x3bbef3(0x113)][_0x3bbef3(0x144)]-0x1],_0x95c150=_0x16c68c['index']||0x0;this[_0x3bbef3(0x113)][_0x3bbef3(0x16a)](),this[_0x3bbef3(0x15d)](),this['forceSelect'](_0x95c150);}}}},Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x108)]=function(){const _0x567813=_0x39d1eb,_0x1ead97={'skill':this[_0x567813(0xf2)][_0x567813(0xec)](),'index':this[_0x567813(0xf2)][_0x567813(0x168)]()};this[_0x567813(0xf2)]['addSkillContainerStack'](_0x1ead97),this['_skillWindow'][_0x567813(0x114)]();},VisuMZ[_0x39d1eb(0x117)][_0x39d1eb(0xe7)]=Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x106)],Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x106)]=function(){const _0x4a1b4d=_0x39d1eb;if(this[_0x4a1b4d(0xf2)][_0x4a1b4d(0x12f)]()){if(_0x4a1b4d(0x148)===_0x4a1b4d(0x105)){function _0x53834b(){const _0x2ce198=_0x4a1b4d;_0xba1a1e[_0x2ce198(0x117)]['Scene_Battle_onSkillCancel'][_0x2ce198(0x129)](this);}}else this[_0x4a1b4d(0x172)]();}else{if(_0x4a1b4d(0x14f)===_0x4a1b4d(0x14f))VisuMZ[_0x4a1b4d(0x117)][_0x4a1b4d(0xe7)][_0x4a1b4d(0x129)](this);else{function _0x28d94e(){const _0x29806f=_0x4a1b4d;return _0xc9781[_0x29806f(0x120)](_0x12a274)?![]:_0x5cd5d8[_0x29806f(0x117)]['Window_ActorCommand_canAddSkillCommand'][_0x29806f(0x129)](this,_0x20c4ad);}}}},Scene_Battle[_0x39d1eb(0x10e)]['processSkillContainerCancel']=function(){const _0x2a6fc2=_0x39d1eb;this[_0x2a6fc2(0xf2)][_0x2a6fc2(0x141)](),this[_0x2a6fc2(0xf2)][_0x2a6fc2(0x114)]();},VisuMZ[_0x39d1eb(0x117)]['Scene_Battle_selectNextCommand']=Scene_Battle[_0x39d1eb(0x10e)]['selectNextCommand'],Scene_Battle[_0x39d1eb(0x10e)][_0x39d1eb(0x12a)]=function(){const _0x3f89ce=_0x39d1eb;this['_skillWindow']&&this['_skillWindow'][_0x3f89ce(0x165)](![]),VisuMZ[_0x3f89ce(0x117)][_0x3f89ce(0x126)][_0x3f89ce(0x129)](this);},VisuMZ[_0x39d1eb(0x117)]['Game_Actor_usableSkills']=Game_Actor['prototype'][_0x39d1eb(0xe9)],Game_Actor[_0x39d1eb(0x10e)]['usableSkills']=function(){const _0x33d5bf=_0x39d1eb;let _0x21e509=VisuMZ['SkillContainers'][_0x33d5bf(0xf3)]['call'](this);return this[_0x33d5bf(0x121)]=0x0,_0x21e509=this[_0x33d5bf(0x15b)](_0x21e509),_0x21e509;},Game_Actor['prototype'][_0x39d1eb(0x15b)]=function(_0xac040d){const _0x400dc6=_0x39d1eb;if(this['_skillContainerLoops']>=0x64)return _0xac040d;for(const _0x227c1d of _0xac040d){if(!_0x227c1d)continue;if(DataManager[_0x400dc6(0x120)](_0x227c1d)){let _0x3c842f=DataManager['getSkillContainerList'](this,_0x227c1d);_0x3c842f=_0x3c842f['map'](_0x146726=>$dataSkills[_0x146726]),_0x3c842f=_0x3c842f[_0x400dc6(0x167)](_0xbb17df=>!!_0xbb17df),_0x3c842f=this[_0x400dc6(0x15b)](_0x3c842f),_0xac040d=_0xac040d[_0x400dc6(0x14e)](_0x3c842f);}}return _0xac040d;},VisuMZ[_0x39d1eb(0x117)]['Window_SkillList_initialize']=Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x15e)],Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x15e)]=function(_0x5e9f19){const _0x1d9528=_0x39d1eb;VisuMZ['SkillContainers'][_0x1d9528(0xed)][_0x1d9528(0x129)](this,_0x5e9f19),this[_0x1d9528(0x113)]=[];},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x110)]=function(_0x155b2a){const _0x61e4a0=_0x39d1eb;this['_skillContainerStack']['push'](_0x155b2a),this[_0x61e4a0(0x15d)](),this[_0x61e4a0(0x14a)](0x0);},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x141)]=function(){const _0xd6b067=_0x39d1eb;if(this[_0xd6b067(0x113)]['length']<=0x0)return;const _0x6596f7=this[_0xd6b067(0x113)][this[_0xd6b067(0x113)][_0xd6b067(0x144)]-0x1],_0xba506e=_0x6596f7[_0xd6b067(0x168)]||0x0;this[_0xd6b067(0x113)]['pop'](),this[_0xd6b067(0x15d)](),this[_0xd6b067(0x14a)](_0xba506e);},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x165)]=function(_0x57ceac){const _0x1f4d83=_0x39d1eb;if(this[_0x1f4d83(0x113)][_0x1f4d83(0x144)]<=0x0)return;const _0x4ee645=this[_0x1f4d83(0x113)][0x0],_0x229662=_0x4ee645[_0x1f4d83(0x168)]||0x0;this[_0x1f4d83(0x113)]=[];if(_0x57ceac){if(_0x1f4d83(0x15c)!==_0x1f4d83(0x15c)){function _0x66dd61(){const _0x20a395=_0x1f4d83,_0x573f96=_0x5bc869[_0x20a395(0xf8)](this[_0x20a395(0x142)],_0x45c4cf);if(_0x573f96[_0x20a395(0x144)]<=0x0)return![];}}else this[_0x1f4d83(0x15d)](),this[_0x1f4d83(0x14a)](_0x229662);}},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x12f)]=function(){const _0x198bbf=_0x39d1eb;return this[_0x198bbf(0x113)][_0x198bbf(0x144)]>0x0;},VisuMZ[_0x39d1eb(0x117)][_0x39d1eb(0x171)]=Window_SkillList[_0x39d1eb(0x10e)]['makeItemList'],Window_SkillList[_0x39d1eb(0x10e)]['makeItemList']=function(){const _0xa22e17=_0x39d1eb;this['isShowingSkillContainerList']()?this[_0xa22e17(0x13a)]():VisuMZ[_0xa22e17(0x117)]['Window_SkillList_makeItemList'][_0xa22e17(0x129)](this);},VisuMZ[_0x39d1eb(0x117)][_0x39d1eb(0xee)]=Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x154)],Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x154)]=function(_0x1e8f2b){const _0x3d82d8=_0x39d1eb;if(_0x1e8f2b&&DataManager[_0x3d82d8(0x120)](_0x1e8f2b)){if(_0x3d82d8(0x112)===_0x3d82d8(0xf4)){function _0x28c3ef(){const _0x4d17df=_0x3d82d8,_0x463170=_0x31c5d2[_0x4d17df(0x116)](_0x2aca38['KnownList']);if(_0x463170)for(const _0x513807 of _0x463170){_0x513807['match'](_0x24ad41[_0x4d17df(0x161)]);let _0x50a0ea=_0x5f3bcb[_0x4d17df(0x12c)](_0x41770c['$1']);_0x50a0ea=_0x50a0ea[_0x4d17df(0x167)](_0xe61be5=>_0x22cca8[_0x4d17df(0x118)](_0xe61be5)),_0x94784=_0x497f33['concat'](_0x50a0ea);}}}else{const _0x186a1e=DataManager['getSkillContainerList'](this[_0x3d82d8(0x142)],_0x1e8f2b);if(_0x186a1e[_0x3d82d8(0x144)]<=0x0)return![];}}return VisuMZ['SkillContainers'][_0x3d82d8(0xee)][_0x3d82d8(0x129)](this,_0x1e8f2b);},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x13a)]=function(){const _0x2e2bd3=_0x39d1eb,_0x185aca=this[_0x2e2bd3(0x113)][this[_0x2e2bd3(0x113)][_0x2e2bd3(0x144)]-0x1],_0xff36a8=_0x185aca[_0x2e2bd3(0x102)],_0x47b50d=DataManager['getSkillContainerList'](this[_0x2e2bd3(0x142)],_0xff36a8);this[_0x2e2bd3(0xe8)]=_0x47b50d[_0x2e2bd3(0x124)](_0x135089=>$dataSkills[_0x135089])[_0x2e2bd3(0x167)](_0x1a9ffa=>!!_0x1a9ffa&&this[_0x2e2bd3(0xfc)](_0x1a9ffa));if(Imported['VisuMZ_3_SideviewBattleUI']){if('wNzoL'==='NPJMo'){function _0x36580c(){const _0x27fcfd=_0x2e2bd3;_0x109dd1=_0x76a543[_0x27fcfd(0x13e)](',')[_0x27fcfd(0x124)](_0x2bf4bd=>_0x2bf4bd[_0x27fcfd(0x11f)]());let _0xd9e538=[];for(let _0x21c849 of _0x3dfb08){_0x21c849=(_0x2b0b9e(_0x21c849)||'')[_0x27fcfd(0x11f)]();const _0x17bc0b=/^\d+$/[_0x27fcfd(0x107)](_0x21c849);_0x17bc0b?_0xd9e538['push'](_0x98417(_0x21c849)):_0xd9e538[_0x27fcfd(0x133)](_0x4885cc[_0x27fcfd(0xfa)](_0x21c849));}return _0xd9e538;}}else this[_0x2e2bd3(0x155)](),this['adjustSideviewUiHeight'](),this['updateSideviewUiPosition']();}},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0xfc)]=function(_0x12413c){const _0x13e192=_0x39d1eb;if(!this[_0x13e192(0x164)](_0x12413c))return![];if(!this[_0x13e192(0x14c)](_0x12413c))return![];return!![];},VisuMZ['SkillContainers'][_0x39d1eb(0x10a)]=Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x140)],Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x140)]=function(_0x44f003,_0x2695fb,_0x15ea06,_0x31540c){const _0x3ff865=_0x39d1eb;if(DataManager[_0x3ff865(0x120)](_0x44f003)){if(_0x3ff865(0x11a)==='tkosu'){function _0x517e00(){const _0x485513=_0x3ff865;_0x30c225=_0x1fa3ec[_0x485513(0xef)](_0x57e804,_0x4941ec);}}else this['drawSkillContainerText'](_0x44f003,_0x2695fb,_0x15ea06,_0x31540c);}else{if(_0x3ff865(0x16f)===_0x3ff865(0x151)){function _0x38f1fa(){const _0x1dda83=_0x3ff865;return this[_0x1dda83(0x113)][_0x1dda83(0x144)]>0x0;}}else VisuMZ[_0x3ff865(0x117)][_0x3ff865(0x10a)]['call'](this,_0x44f003,_0x2695fb,_0x15ea06,_0x31540c);}},Window_SkillList[_0x39d1eb(0x10e)][_0x39d1eb(0x12e)]=function(_0x459a47,_0xd4a1cc,_0xd895dc,_0x544bf9){const _0xeb382e=_0x39d1eb;if(!_0x459a47)return;this[_0xeb382e(0x160)]();const _0x511525=TextManager[_0xeb382e(0x131)],_0xb0eb42=this[_0xeb382e(0xe5)](_0x511525)[_0xeb382e(0x15a)];_0xd4a1cc+=_0x544bf9-_0xb0eb42,this[_0xeb382e(0x16b)](_0x511525,_0xd4a1cc,_0xd895dc,_0xb0eb42),this[_0xeb382e(0x160)]();};Imported[_0x39d1eb(0x150)]&&(VisuMZ[_0x39d1eb(0x117)][_0x39d1eb(0x10b)]=Window_ActorCommand['prototype']['canAddSkillCommand'],Window_ActorCommand[_0x39d1eb(0x10e)][_0x39d1eb(0x111)]=function(_0x5e1c71){const _0x242369=_0x39d1eb;if(DataManager[_0x242369(0x120)](_0x5e1c71))return![];else{if(_0x242369(0x10d)!==_0x242369(0xf9))return VisuMZ['SkillContainers'][_0x242369(0x10b)][_0x242369(0x129)](this,_0x5e1c71);else{function _0x2a2948(){const _0x34b04c=_0x242369;this[_0x34b04c(0x113)][_0x34b04c(0x133)](_0x11079c),this[_0x34b04c(0x15d)](),this[_0x34b04c(0x14a)](0x0);}}}});;