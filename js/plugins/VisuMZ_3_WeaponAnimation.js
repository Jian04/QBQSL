//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
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
 * * VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
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
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.06: June 11, 2021
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will no longer cause crashes if
 *    the user does not have a weapon equipped. Fix made by Olivia.
 * 
 * Version 1.05: April 9, 2021
 * * Bug Fixes!
 * ** Freeze Motions should now hide weapons instead of always displaying them
 *    when the hide option is enabled. Fix made by Olivia.
 * 
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
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
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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

const _0x2ff4=['refresh','setHue','map','Sprite_Weapon_updateFrame','loadSystem','return\x200','preloadCustomWeaponImage','_subject','clamp','aoRtE','Game_Battler_freezeMotion','trim','_freezeMotionData','mECBs','isCustomWeaponGraphic','weaponImageId','setFrame','42783eSBgAf','Xdxuy','startWeaponAnimation','WeaponAnimation','prototype','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','filepath','ConvertParams','call','MbxTB','aAcTU','hhcuK','filter','_uniqueStartWeaponAnimation','motionType','startAction','11QismMf','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','JSON','BattleManager_startAction','Game_Battler_startWeaponAnimation','exit','VisuMZ_1_BattleCore','286TtMvLw','format','parse','nCEyI','toUpperCase','ARRAYSTR','291750yDrrsi','XgSNF','motion','ImageStr','bitmap','Sprite_Weapon_loadBitmap','description','Fmuxo','createCustomWeaponGraphic','isActor','createCustomWeaponGraphicFromObj','_cache','number','status','oyhaH','Game_BattlerBase_refresh','max','174911CVHWJT','traitObjects','269YWZyDW','floor','PBayY','enemy','Game_BattlerBase_initMembers','biRAO','_weaponImageId','name','ARRAYSTRUCT','swing','637856IxvzhW','hue','updateFrameCustomWeaponGraphic','checkCacheKey','STR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYFUNC','Settings','loadBitmapCustomWeapon','loadBitmap','freezeMotion','initMembers','NUM','UAiyz','EVAL','397982ytjuTY','includes','Weapons','loadWeapon','customWeaponGraphic','match','weapons','CjSSx','IOakX','updateFrame','STRUCT','GBpsC','_pattern','268851YXyyGO','isEnemy','Hue','RegExp','seTVv','_customFrames','Gmqvs'];function _0x3fa5(_0x114976,_0x3047fe){_0x114976=_0x114976-0x15d;let _0x2ff412=_0x2ff4[_0x114976];return _0x2ff412;}const _0x7acd3=_0x3fa5;(function(_0x4f50c9,_0x28c76a){const _0x4da6d2=_0x3fa5;while(!![]){try{const _0x40d1d3=parseInt(_0x4da6d2(0x1b9))+parseInt(_0x4da6d2(0x173))+parseInt(_0x4da6d2(0x1bb))*parseInt(_0x4da6d2(0x1a2))+-parseInt(_0x4da6d2(0x19b))*-parseInt(_0x4da6d2(0x18b))+parseInt(_0x4da6d2(0x1a8))+-parseInt(_0x4da6d2(0x166))+-parseInt(_0x4da6d2(0x1c5));if(_0x40d1d3===_0x28c76a)break;else _0x4f50c9['push'](_0x4f50c9['shift']());}catch(_0x4a49f2){_0x4f50c9['push'](_0x4f50c9['shift']());}}}(_0x2ff4,0x3c5b5));var label=_0x7acd3(0x18e),tier=tier||0x0,dependencies=[_0x7acd3(0x1a1)],pluginData=$plugins[_0x7acd3(0x197)](function(_0x252294){const _0x3438b2=_0x7acd3;return _0x252294[_0x3438b2(0x1b5)]&&_0x252294[_0x3438b2(0x1ae)][_0x3438b2(0x167)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x7acd3(0x15e)]||{},VisuMZ[_0x7acd3(0x192)]=function(_0x1412e3,_0x389d5a){const _0x54d90a=_0x7acd3;for(const _0x40d7ec in _0x389d5a){if(_0x40d7ec[_0x54d90a(0x16b)](/(.*):(.*)/i)){const _0x48b7cc=String(RegExp['$1']),_0x55bcf4=String(RegExp['$2'])[_0x54d90a(0x1a6)]()[_0x54d90a(0x185)]();let _0x1f76fd,_0x9bfc49,_0x410dbb;switch(_0x55bcf4){case _0x54d90a(0x163):_0x1f76fd=_0x389d5a[_0x40d7ec]!==''?Number(_0x389d5a[_0x40d7ec]):0x0;break;case'ARRAYNUM':_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49[_0x54d90a(0x17c)](_0x13a082=>Number(_0x13a082));break;case _0x54d90a(0x165):_0x1f76fd=_0x389d5a[_0x40d7ec]!==''?eval(_0x389d5a[_0x40d7ec]):null;break;case'ARRAYEVAL':_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49[_0x54d90a(0x17c)](_0x2a35f4=>eval(_0x2a35f4));break;case _0x54d90a(0x19d):_0x1f76fd=_0x389d5a[_0x40d7ec]!==''?JSON['parse'](_0x389d5a[_0x40d7ec]):'';break;case'ARRAYJSON':_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49[_0x54d90a(0x17c)](_0x42ffa1=>JSON['parse'](_0x42ffa1));break;case'FUNC':_0x1f76fd=_0x389d5a[_0x40d7ec]!==''?new Function(JSON['parse'](_0x389d5a[_0x40d7ec])):new Function(_0x54d90a(0x17f));break;case _0x54d90a(0x15d):_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON['parse'](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49[_0x54d90a(0x17c)](_0x29f13b=>new Function(JSON[_0x54d90a(0x1a4)](_0x29f13b)));break;case _0x54d90a(0x1c9):_0x1f76fd=_0x389d5a[_0x40d7ec]!==''?String(_0x389d5a[_0x40d7ec]):'';break;case _0x54d90a(0x1a7):_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49['map'](_0x1481d3=>String(_0x1481d3));break;case _0x54d90a(0x170):_0x410dbb=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):{},_0x1f76fd=VisuMZ[_0x54d90a(0x192)]({},_0x410dbb);break;case _0x54d90a(0x1c3):_0x9bfc49=_0x389d5a[_0x40d7ec]!==''?JSON[_0x54d90a(0x1a4)](_0x389d5a[_0x40d7ec]):[],_0x1f76fd=_0x9bfc49[_0x54d90a(0x17c)](_0x140031=>VisuMZ[_0x54d90a(0x192)]({},JSON[_0x54d90a(0x1a4)](_0x140031)));break;default:continue;}_0x1412e3[_0x48b7cc]=_0x1f76fd;}}return _0x1412e3;},(_0x3130b6=>{const _0x2b12a9=_0x7acd3,_0x17e6c0=_0x3130b6[_0x2b12a9(0x1c2)];for(const _0x3c8ef8 of dependencies){if(_0x2b12a9(0x187)===_0x2b12a9(0x187)){if(!Imported[_0x3c8ef8]){if(_0x2b12a9(0x18c)===_0x2b12a9(0x18c)){alert(_0x2b12a9(0x190)['format'](_0x17e6c0,_0x3c8ef8)),SceneManager['exit']();break;}else{function _0x23cbb8(){const _0x20918a=_0x2b12a9;this[_0x20918a(0x1ac)]=_0x1f1ce2['loadSystem'](_0x20918a(0x168)+_0x27f2d4);}}}}else{function _0x5a4954(){const _0x1c9c3b=_0x2b12a9;return this[_0x1c9c3b(0x1b3)]=this[_0x1c9c3b(0x1b3)]||{},this[_0x1c9c3b(0x1b3)][_0x42b846]!==_0x22a0f4;}}}const _0xcda74=_0x3130b6[_0x2b12a9(0x1ae)];if(_0xcda74['match'](/\[Version[ ](.*?)\]/i)){const _0x1df05a=Number(RegExp['$1']);_0x1df05a!==VisuMZ[label]['version']&&(alert(_0x2b12a9(0x1ca)[_0x2b12a9(0x1a3)](_0x17e6c0,_0x1df05a)),SceneManager[_0x2b12a9(0x1a0)]());}if(_0xcda74['match'](/\[Tier[ ](\d+)\]/i)){const _0x390a79=Number(RegExp['$1']);_0x390a79<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x17e6c0,_0x390a79,tier)),SceneManager[_0x2b12a9(0x1a0)]()):tier=Math[_0x2b12a9(0x1b8)](_0x390a79,tier);}VisuMZ[_0x2b12a9(0x192)](VisuMZ[label][_0x2b12a9(0x15e)],_0x3130b6['parameters']);})(pluginData),VisuMZ[_0x7acd3(0x18e)]['RegExp']={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i},ImageManager[_0x7acd3(0x169)]=function(_0x2eabbf){const _0x2cc406=_0x7acd3,_0x488ca3=VisuMZ[_0x2cc406(0x18e)][_0x2cc406(0x15e)][_0x2cc406(0x191)];return this[_0x2cc406(0x160)](_0x488ca3,_0x2eabbf);},VisuMZ['WeaponAnimation'][_0x7acd3(0x19e)]=BattleManager[_0x7acd3(0x19a)],BattleManager[_0x7acd3(0x19a)]=function(){const _0x528fea=_0x7acd3;VisuMZ[_0x528fea(0x18e)][_0x528fea(0x19e)][_0x528fea(0x193)](this),this['_subject']&&this[_0x528fea(0x181)][_0x528fea(0x180)]();},VisuMZ[_0x7acd3(0x18e)][_0x7acd3(0x1bf)]=Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x162)],Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x162)]=function(){const _0x191c2c=_0x7acd3;this[_0x191c2c(0x1b3)]={},VisuMZ[_0x191c2c(0x18e)][_0x191c2c(0x1bf)][_0x191c2c(0x193)](this);},VisuMZ[_0x7acd3(0x18e)][_0x7acd3(0x1b7)]=Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x17a)],Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x17a)]=function(){const _0x5cf675=_0x7acd3;this[_0x5cf675(0x1b3)]={},VisuMZ[_0x5cf675(0x18e)]['Game_BattlerBase_refresh'][_0x5cf675(0x193)](this);},Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x1c8)]=function(_0xaeb59){const _0x2253dd=_0x7acd3;return this[_0x2253dd(0x1b3)]=this[_0x2253dd(0x1b3)]||{},this[_0x2253dd(0x1b3)][_0xaeb59]!==undefined;},Game_BattlerBase['prototype']['customWeaponGraphic']=function(){const _0x124381=_0x7acd3;let _0x4c010a=_0x124381(0x16a);if(this[_0x124381(0x1c8)](_0x4c010a))return this['_cache'][_0x4c010a];return this[_0x124381(0x1b3)][_0x4c010a]=this[_0x124381(0x1b0)](),this[_0x124381(0x1b3)][_0x4c010a];},Game_BattlerBase['prototype'][_0x7acd3(0x1b0)]=function(){const _0x10381e=_0x7acd3;for(const _0x5c5c8b of this[_0x10381e(0x1ba)]()){if(_0x10381e(0x183)!==_0x10381e(0x183)){function _0xa57ae2(){const _0x3626f9=_0x10381e,_0xc669c4=_0x3f489d(_0x5a08ba['$1']);_0xc669c4!==_0x358794[_0x4dee7d]['version']&&(_0xdbaad6(_0x3626f9(0x1ca)[_0x3626f9(0x1a3)](_0x473bab,_0xc669c4)),_0x44f3e7[_0x3626f9(0x1a0)]());}}else{if(!_0x5c5c8b)continue;const _0x25170d=this[_0x10381e(0x1b2)](_0x5c5c8b);if(_0x25170d['name']!==0x0)return{'name':_0x25170d[_0x10381e(0x1c2)],'hue':_0x25170d[_0x10381e(0x1c6)],'motion':_0x25170d[_0x10381e(0x1aa)]};}}return 0x0;},Game_BattlerBase[_0x7acd3(0x18f)][_0x7acd3(0x1b2)]=function(_0x1c0fa0){const _0x40e1db=_0x7acd3,_0x2e9ce5=VisuMZ[_0x40e1db(0x18e)][_0x40e1db(0x176)];let _0x4333ca=0x0,_0x177983=0x0,_0x23855d=VisuMZ[_0x40e1db(0x18e)][_0x40e1db(0x15e)][_0x40e1db(0x1aa)];const _0x120858=_0x1c0fa0?_0x1c0fa0['note']:'';if(_0x120858[_0x40e1db(0x16b)](_0x2e9ce5['ImageNum']))_0x4333ca=Number(RegExp['$1'])||0x1;else _0x120858[_0x40e1db(0x16b)](_0x2e9ce5[_0x40e1db(0x1ab)])&&(_0x4333ca=String(RegExp['$1']));return _0x120858[_0x40e1db(0x16b)](_0x2e9ce5[_0x40e1db(0x175)])&&(_0x177983=Number(RegExp['$1'])[_0x40e1db(0x182)](0x0,0xff)),_0x120858[_0x40e1db(0x16b)](_0x2e9ce5['Motion'])&&(_0x23855d=String(RegExp['$1'])['toLowerCase']()[_0x40e1db(0x185)]()),{'name':_0x4333ca,'hue':_0x177983,'motion':_0x23855d};},VisuMZ[_0x7acd3(0x18e)][_0x7acd3(0x19f)]=Game_Battler[_0x7acd3(0x18f)][_0x7acd3(0x18d)],Game_Battler[_0x7acd3(0x18f)]['startWeaponAnimation']=function(_0x4a1096){const _0xd14650=_0x7acd3;if(this[_0xd14650(0x198)])return;let _0x2cf5a9=![];if(this[_0xd14650(0x16a)]()&&_0x4a1096>0x0){if(_0xd14650(0x196)!==_0xd14650(0x196)){function _0x449d1f(){return;}}else _0x4a1096=this[_0xd14650(0x16a)](),_0x2cf5a9=!![];}VisuMZ[_0xd14650(0x18e)][_0xd14650(0x19f)][_0xd14650(0x193)](this,_0x4a1096);if(!_0x2cf5a9)return;if(_0x4a1096===0x0)return;this[_0xd14650(0x198)]=!![],this['requestMotion'](_0x4a1096[_0xd14650(0x1aa)]||_0xd14650(0x1c4)),this['_uniqueStartWeaponAnimation']=![];},Game_Battler[_0x7acd3(0x18f)]['preloadCustomWeaponImage']=function(){const _0x6791f3=_0x7acd3;if(!this[_0x6791f3(0x16a)]())return;const _0x44a988=this[_0x6791f3(0x16a)]();if(typeof _0x44a988[_0x6791f3(0x1c2)]==='number'){if(_0x6791f3(0x195)!==_0x6791f3(0x194)){const _0x2c95ce=Math[_0x6791f3(0x1bc)]((_0x44a988[_0x6791f3(0x1c2)]-0x1)/0xc)+0x1;ImageManager[_0x6791f3(0x17e)](_0x6791f3(0x168)+_0x2c95ce);}else{function _0x28c9e1(){const _0x5fc735=_0x6791f3;this[_0x5fc735(0x188)]()?this[_0x5fc735(0x15f)]():(this[_0x5fc735(0x178)]=![],_0x4d3501[_0x5fc735(0x18e)][_0x5fc735(0x1ad)][_0x5fc735(0x193)](this),this[_0x5fc735(0x17b)](0x0));}}}else{if(_0x6791f3(0x1a5)===_0x6791f3(0x1bd)){function _0x2853c1(){const _0x5526c6=_0x6791f3;if(!this['customWeaponGraphic']())return;const _0x1358ee=this[_0x5526c6(0x16a)]();if(typeof _0x1358ee[_0x5526c6(0x1c2)]===_0x5526c6(0x1b4)){const _0x1007fb=_0x1de384[_0x5526c6(0x1bc)]((_0x1358ee[_0x5526c6(0x1c2)]-0x1)/0xc)+0x1;_0x4d8f1c['loadSystem'](_0x5526c6(0x168)+_0x1007fb);}else _0x30e1c2[_0x5526c6(0x169)](_0x1358ee[_0x5526c6(0x1c2)]);}}else ImageManager['loadWeapon'](_0x44a988[_0x6791f3(0x1c2)]);}},VisuMZ['WeaponAnimation'][_0x7acd3(0x184)]=Game_Battler[_0x7acd3(0x18f)]['freezeMotion'],Game_Battler[_0x7acd3(0x18f)][_0x7acd3(0x161)]=function(_0xf52126,_0xf8eede,_0x58638e){const _0xdfb3fe=_0x7acd3;VisuMZ[_0xdfb3fe(0x18e)][_0xdfb3fe(0x184)][_0xdfb3fe(0x193)](this,_0xf52126,_0xf8eede,_0x58638e);if(!_0xf8eede){if('GBpsC'===_0xdfb3fe(0x171))return;else{function _0xe3f847(){const _0x26f966=_0xdfb3fe,_0x3e9957=_0x140cb3[_0x26f966(0x1bc)]((_0x38e9e1[_0x26f966(0x1c2)]-0x1)/0xc)+0x1;_0x34a7f5[_0x26f966(0x17e)](_0x26f966(0x168)+_0x3e9957);}}}let _0x3f1a0e=0x0;if(_0xf52126[_0xdfb3fe(0x16b)](/ATTACK[ ](\d+)/i)){if(_0xdfb3fe(0x1b6)!=='wayMx')_0x3f1a0e=Number(RegExp['$1']),_0x3f1a0e--;else{function _0x111178(){const _0x2e523d=_0xdfb3fe;_0x1d776b['WeaponAnimation'][_0x2e523d(0x17d)][_0x2e523d(0x193)](this);}}}if(this[_0xdfb3fe(0x1b1)]()){const _0x435ecb=this[_0xdfb3fe(0x16c)](),_0x39e375=_0x435ecb[_0x3f1a0e]||null,_0x3cbaa7=this[_0xdfb3fe(0x1b2)](_0x39e375);_0x3cbaa7[_0xdfb3fe(0x1c2)]!==0x0&&(_0xf52126[_0xdfb3fe(0x16b)](/ATTACK/i)&&(this[_0xdfb3fe(0x186)][_0xdfb3fe(0x199)]=_0x3cbaa7[_0xdfb3fe(0x1aa)]),this[_0xdfb3fe(0x186)][_0xdfb3fe(0x189)]=_0x3cbaa7[_0xdfb3fe(0x1c2)]);}else{if(this[_0xdfb3fe(0x174)]()){if('sJEJz'!=='sJEJz'){function _0x36b750(){const _0x544ab6=_0xdfb3fe;_0x3de760[_0x544ab6(0x18e)][_0x544ab6(0x19e)][_0x544ab6(0x193)](this),this[_0x544ab6(0x181)]&&this[_0x544ab6(0x181)]['preloadCustomWeaponImage']();}}else{const _0x31f036=this[_0xdfb3fe(0x1b2)](this[_0xdfb3fe(0x1be)]());if(_0x31f036[_0xdfb3fe(0x1c2)]!==0x0){if('biRAO'!==_0xdfb3fe(0x1c0)){function _0x53efc0(){const _0x346870=_0xdfb3fe;this[_0x346870(0x181)][_0x346870(0x180)]();}}else{if(_0xf52126[_0xdfb3fe(0x16b)](/ATTACK/i)){if(_0xdfb3fe(0x1a9)!=='XgSNF'){function _0xd7a73(){const _0x4bcca2=_0xdfb3fe;_0xe83217['match'](/ATTACK/i)&&(this[_0x4bcca2(0x186)][_0x4bcca2(0x199)]=_0x493842[_0x4bcca2(0x1aa)]),this[_0x4bcca2(0x186)][_0x4bcca2(0x189)]=_0x5dbe97['name'];}}else this[_0xdfb3fe(0x186)]['motionType']=_0x31f036[_0xdfb3fe(0x1aa)];}this['_freezeMotionData'][_0xdfb3fe(0x189)]=_0x31f036[_0xdfb3fe(0x1c2)];}}}}}},Sprite_Weapon[_0x7acd3(0x18f)][_0x7acd3(0x188)]=function(){const _0x4725bb=_0x7acd3;return typeof this[_0x4725bb(0x1c1)]!==_0x4725bb(0x1b4);},VisuMZ['WeaponAnimation']['Sprite_Weapon_loadBitmap']=Sprite_Weapon[_0x7acd3(0x18f)]['loadBitmap'],Sprite_Weapon['prototype'][_0x7acd3(0x160)]=function(){const _0x3aa999=_0x7acd3;if(this[_0x3aa999(0x188)]()){if('uSyQl'===_0x3aa999(0x1af)){function _0x3f9896(){const _0x6dc5c=_0x3aa999;_0x3b8bcb(_0x6dc5c(0x19c)[_0x6dc5c(0x1a3)](_0x2b8b2d,_0x42cd8b,_0x37dfd0)),_0x1f9496[_0x6dc5c(0x1a0)]();}}else this['loadBitmapCustomWeapon']();}else this[_0x3aa999(0x178)]=![],VisuMZ['WeaponAnimation'][_0x3aa999(0x1ad)][_0x3aa999(0x193)](this),this['setHue'](0x0);},Sprite_Weapon['prototype']['loadBitmapCustomWeapon']=function(){const _0x19fcf7=_0x7acd3;if(typeof this[_0x19fcf7(0x1c1)][_0x19fcf7(0x1c2)]==='number'){if(_0x19fcf7(0x164)===_0x19fcf7(0x177)){function _0x21d22e(){const _0x189792=_0x19fcf7;this[_0x189792(0x178)]=![],_0x433769['WeaponAnimation'][_0x189792(0x1ad)][_0x189792(0x193)](this),this[_0x189792(0x17b)](0x0);}}else{const _0xc6dd58=Math[_0x19fcf7(0x1bc)]((this[_0x19fcf7(0x1c1)][_0x19fcf7(0x1c2)]-0x1)/0xc)+0x1;if(_0xc6dd58>=0x1){if(_0x19fcf7(0x16e)==='AKcGC'){function _0x2a0941(){const _0x317f12=_0x19fcf7;this[_0x317f12(0x1ac)]=_0x4a734a['loadSystem']('');}}else this[_0x19fcf7(0x1ac)]=ImageManager['loadSystem']('Weapons'+_0xc6dd58);}else this[_0x19fcf7(0x1ac)]=ImageManager['loadSystem']('');}}else{if('hnbvq'===_0x19fcf7(0x179)){function _0x28ec1e(){const _0x4b0798=_0x19fcf7,_0x22b3cd=_0x30c578[_0x4b0798(0x1bc)](this[_0x4b0798(0x1ac)]['width']/0x3),_0x49241f=this['bitmap']['height'],_0x9218c=this[_0x4b0798(0x172)]*_0x22b3cd,_0x46f5ba=0x0;this['setFrame'](_0x9218c,_0x46f5ba,_0x22b3cd,_0x49241f);}}else{this['_customFrames']=!![];const _0x510d04=this[_0x19fcf7(0x1c1)][_0x19fcf7(0x1c2)]?this[_0x19fcf7(0x1c1)]['name']:this['_weaponImageId'];this['bitmap']=ImageManager[_0x19fcf7(0x169)](_0x510d04||'');}}this[_0x19fcf7(0x17b)](this[_0x19fcf7(0x1c1)]['hue']||0x0);},VisuMZ[_0x7acd3(0x18e)][_0x7acd3(0x17d)]=Sprite_Weapon['prototype'][_0x7acd3(0x16f)],Sprite_Weapon['prototype'][_0x7acd3(0x16f)]=function(){const _0x5d9534=_0x7acd3;this['isCustomWeaponGraphic']()?this[_0x5d9534(0x1c7)]():VisuMZ[_0x5d9534(0x18e)][_0x5d9534(0x17d)]['call'](this);},Sprite_Weapon[_0x7acd3(0x18f)]['updateFrameCustomWeaponGraphic']=function(){const _0x18e906=_0x7acd3;if(typeof this[_0x18e906(0x1c1)][_0x18e906(0x1c2)]==='number'){const _0x30014c=(this[_0x18e906(0x1c1)][_0x18e906(0x1c2)]-0x1)%0xc,_0x436672=0x60,_0x230d30=0x40,_0x3f5113=(Math[_0x18e906(0x1bc)](_0x30014c/0x6)*0x3+this[_0x18e906(0x172)])*_0x436672,_0xf8cc8=Math['floor'](_0x30014c%0x6)*_0x230d30;this['setFrame'](_0x3f5113,_0xf8cc8,_0x436672,_0x230d30);}else{if(_0x18e906(0x16d)===_0x18e906(0x16d)){const _0x303b40=Math[_0x18e906(0x1bc)](this[_0x18e906(0x1ac)]['width']/0x3),_0x1ac312=this[_0x18e906(0x1ac)]['height'],_0x3a9f7d=this[_0x18e906(0x172)]*_0x303b40,_0x1d12a9=0x0;this[_0x18e906(0x18a)](_0x3a9f7d,_0x1d12a9,_0x303b40,_0x1ac312);}else{function _0xbaebea(){const _0x534385=_0x18e906,_0x17597a=(this['_weaponImageId'][_0x534385(0x1c2)]-0x1)%0xc,_0xd643d6=0x60,_0x53494b=0x40,_0x2bb335=(_0x3ec769[_0x534385(0x1bc)](_0x17597a/0x6)*0x3+this[_0x534385(0x172)])*_0xd643d6,_0x5f3f47=_0x4f62f8[_0x534385(0x1bc)](_0x17597a%0x6)*_0x53494b;this[_0x534385(0x18a)](_0x2bb335,_0x5f3f47,_0xd643d6,_0x53494b);}}}};