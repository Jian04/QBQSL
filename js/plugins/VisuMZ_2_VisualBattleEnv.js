//=============================================================================
// VisuStella MZ - Visual Battle Environment
// VisuMZ_2_VisualBattleEnv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VisualBattleEnv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualBattleEnv = VisuMZ.VisualBattleEnv || {};
VisuMZ.VisualBattleEnv.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [VisualBattleEnv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Battle_Environment_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add extra layers of images to your battle system for background purposes or
 * foreground purposes. These images can be battlebacks, pictures, parallaxes,
 * whatever you need them to be. Add extra settings to them, such as scrolling,
 * blend modes, different opacity levels, hues, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create battle environment images located behind battlers to function as a
 *   part of the background.
 * * Create battle environment images located in front of battlers to function
 *   as a part of the foreground.
 * * Apply custom settings to them, such as changing their blend modes, their
 *   scrolling speeds, and opacity levels.
 * * Customize their hue and if they have a hue shift at all.
 * * Apply color tones if needed to give more color control.
 * * Alter their opacity levels midway during battle.
 * * An unlimited amounts of back environments and front environments to add to
 *   the battle scene.
 * * Environment images are layered based on their ID's. Lower ID's appear
 *   below while higher ID's appear above.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Back Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Back Environment: Add/Change
 * - Adds/changes the target back environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Back Environment: Fade Opacity
 * - Fades the target back environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which back environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Back Environment: Remove
 * - Removes target back environment(s).
 *
 *   ID(s):
 *   - Remove which back environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Front Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Front Environment: Add/Change
 * - Adds/changes the target front environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Front Environment: Fade Opacity
 * - Fades the target front environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which front environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Front Environment: Remove
 * - Removes target front environment(s).
 *
 *   ID(s):
 *   - Remove which front environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Extra-Settings ===
 * 
 * ---
 *
 * Extra Settings
 * - These settings are used for both the "Back Environment: Add/Change" and
 *   "Front Environment: Add/Change" Plugin Commands.
 * 
 *   Appearance:
 *
 *     Scale Style:
 *     - The scaling style used for this environment image.
 *       - Battle Core Setting
 *       - MZ (MZ's default style)
 *       - 1:1 (No Scaling)
 *       - Scale To Fit (Scale to screen size)
 *       - Scale Down (Scale Downward if Larger than Screen)
 *       - Scale Up (Scale Upward if Smaller than Screen)
 *
 *     Opacity:
 *     - What is the opacity level for this image?
 *     - You may use JavaScript code.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the image?
 *     - You may use JavaScript code.
 *       - Normal
 *       - Additive
 *       - Multiply
 *       - Screen
 * 
 *     Hue: 
 *     - Do you wish to adjust this image's hue?
 *     - You may use JavaScript code.
 * 
 *     Hue Shift:
 *     - How much do you want the hue to shift each frame?
 *     - You may use JavaScript code.
 * 
 *     Color Tone:
 *     - What tone do you want for the background?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Scrolling:
 *
 *     Horizontal Scroll:
 *     - What is the horizontal scroll speed?
 *     - Use a negative value to invert the direction.
 *
 *     Vertical Scroll:
 *     - What is the vertical scroll speed?
 *     - Use a negative value to invert the direction.
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
 * Version 1.05: August 6, 2021
 * * Bug Fixes!
 * ** Environments no longer visibly vanish when changing to the Options or
 *    Party management scenes. Fix made by Irina.
 * 
 * Version 1.04: July 16, 2021
 * * Bug Fixes!
 * ** Games with UI dimensions that are different from screen dimensions should
 *    no longer be affected by the distance difference. Fix made by Irina.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 30, 2021
 * * Bug Fixes!
 * ** Added a fail safe for changing color tones in case the value fails to be
 *    an array (it will default to zero tone). Fix made by Arisu.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Crashes should no longer occur when performing a troop transition from
 *    the map. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentAddChange
 * @text Back Environment: Add/Change
 * @desc Adds/changes the target back environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentFade
 * @text Back Environment: Fade Opacity
 * @desc Fades the target back environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which back environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentRemove
 * @text Back Environment: Remove
 * @desc Removes target back environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which back environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentAddChange
 * @text Front Environment: Add/Change
 * @desc Adds/changes the target front environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentFade
 * @text Front Environment: Fade Opacity
 * @desc Fades the target front environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which front environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentRemove
 * @text Front Environment: Remove
 * @desc Removes target front environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which front environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
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
 * @param VisualBattleEnv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Appearance
 *
 * @param ScaleStyle:str
 * @text Scale Style
 * @parent Appearance
 * @type select
 * @option Battle Core Setting
 * @value BattleCore
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The scaling style used for this environment image.
 * @default BattleCore
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this image?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the image?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this image's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the background?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Scrolling
 *
 * @param ScrollHorz:eval
 * @text Horizontal Scroll
 * @parent Scrolling
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 * @param ScrollVert:eval
 * @text Vertical Scroll
 * @parent Scrolling
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 */
//=============================================================================

const _0x47ed=['getBattleEnvironmentContainer','processBitmap','return\x200','RfUDr','addChild','2522cIHTTR','includes','update','getFrontEnvironmentSettings','Scene_Battle_createSpriteset','Game_Troop_setup','setColorTone','ScrollVert','FolderFilename','355550MSrZpf','name','4xCTdCb','ScaleStyle','QoaQV','_backEnvironmentContainer','updateBlendMode','colorTone','call','find','FrontEnvironmentFade','TeUYC','DgTlE','hueShift','OtxPE','Battleback','adjustPosition','Filename','_updateColorFilter','BackEnvironmentFade','AdjustSettings','1FzebDh','img/%1/','createWeather','getBackEnvironmentSettings','updateOpacity','parse','206374NepExF','setup','setFrontEnvironmentSettings','LDhfi','qEPHL','Settings','dWDOZ','match','JeULY','prototype','createBackEnvironmentContainer','_filename','createBattleback','243172nYOZgp','_id','updateBitmap','49615aFPNBD','BackEnvironmentAddChange','origin','VisuMZ_1_BattleCore','version','updateBattleEnvironmentContainers','FUNC','Spriteset_Battle_createBattleback','ARRAYNUM','mFuqK','RegExp','bitmap','children','DefaultStyle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_folder','1:1','vlaPP','EVAL','TzBLj','opacity','FrontEnvironmentAddChange','Spriteset_Battle_update','hue','_spriteset','createBattleEnvironmentSprite','_scene','sort','settings','isPreviousSceneBattleTransitionable','_frontEnvironmentContainer','FxaQf','PkFZK','ARRAYEVAL','ARRAYSTR','bind','Extra','269032pzISRj','filter','createFrontEnvironmentContainer','_createColorFilter','initialize','updateBattleEnvironmentSprite','Folder','ARRAYJSON','isSceneBattle','ScaleDown','lZPvi','Sprite_Battleback_adjustPosition','ScaleUp','parameters','toUpperCase','1007119ySnlog','removeBattleEnvironmentSprite','VisualBattleEnv','_frontEnvironmentSettings','map','PSpTM','168cvOIkZ','ScrollHorz','_baseSprite','KpauQ','filters','ConvertParams','setupVisualBattleEnvironment','Spriteset_Battle_createWeather','list','MMmBz','split','_front','24XOuaDa','jJBAa','status','JSON','_colorFilter','battleback1Bitmap','getBattleEnvironmentSprite','exit','ucibz','max','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','mzaRP','lTbOj','trim','ARRAYFUNC','duration','updateScrolling','format','adjustPosition_ScaleToFit','UiFdH','registerCommand','createSpriteset','2fZoUkm','NUM','BattleCore','adjustPosition_1for1','BackEnvironmentRemove','blendMode','restoreVisualBattleEnv','description','fIQOZ','_backEnvironmentSettings','ARRAYSTRUCT','_battleField','addLoadListener'];const _0x2c8d7c=_0x2d23;(function(_0x2f73a7,_0x3f8df3){const _0x218f8e=_0x2d23;while(!![]){try{const _0x19c749=-parseInt(_0x218f8e(0x113))*-parseInt(_0x218f8e(0xa5))+-parseInt(_0x218f8e(0x10d))+-parseInt(_0x218f8e(0xfe))*-parseInt(_0x218f8e(0xb0))+-parseInt(_0x218f8e(0x93))*parseInt(_0x218f8e(0xc9))+-parseInt(_0x218f8e(0xd9))*-parseInt(_0x218f8e(0x11f))+-parseInt(_0x218f8e(0xae))+-parseInt(_0x218f8e(0xd6))*parseInt(_0x218f8e(0xc3));if(_0x19c749===_0x3f8df3)break;else _0x2f73a7['push'](_0x2f73a7['shift']());}catch(_0x1bd94f){_0x2f73a7['push'](_0x2f73a7['shift']());}}}(_0x47ed,0xa40fb));var label='VisualBattleEnv',tier=tier||0x0,dependencies=[_0x2c8d7c(0xdc)],pluginData=$plugins[_0x2c8d7c(0xff)](function(_0x2933fe){const _0x3f54a7=_0x2c8d7c;return _0x2933fe[_0x3f54a7(0x121)]&&_0x2933fe[_0x3f54a7(0x9a)][_0x3f54a7(0xa6)]('['+label+']');})[0x0];VisuMZ[label][_0x2c8d7c(0xce)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2c8d7c(0x118)]=function(_0x3d104f,_0x53c486){const _0x4a6766=_0x2c8d7c;for(const _0x264f65 in _0x53c486){if(_0x264f65[_0x4a6766(0xd0)](/(.*):(.*)/i)){if(_0x4a6766(0xf9)!==_0x4a6766(0xa3)){const _0x52525c=String(RegExp['$1']),_0x4ba0db=String(RegExp['$2'])[_0x4a6766(0x10c)]()[_0x4a6766(0x12c)]();let _0x591f52,_0x6ec106,_0x38774a;switch(_0x4ba0db){case _0x4a6766(0x94):_0x591f52=_0x53c486[_0x264f65]!==''?Number(_0x53c486[_0x264f65]):0x0;break;case _0x4a6766(0xe1):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106[_0x4a6766(0x111)](_0x137505=>Number(_0x137505));break;case _0x4a6766(0xeb):_0x591f52=_0x53c486[_0x264f65]!==''?eval(_0x53c486[_0x264f65]):null;break;case _0x4a6766(0xfa):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106['map'](_0x3e150d=>eval(_0x3e150d));break;case _0x4a6766(0x122):_0x591f52=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):'';break;case _0x4a6766(0x105):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106[_0x4a6766(0x111)](_0x2075e0=>JSON[_0x4a6766(0xc8)](_0x2075e0));break;case _0x4a6766(0xdf):_0x591f52=_0x53c486[_0x264f65]!==''?new Function(JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65])):new Function(_0x4a6766(0xa2));break;case _0x4a6766(0x12d):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106[_0x4a6766(0x111)](_0x19af92=>new Function(JSON['parse'](_0x19af92)));break;case'STR':_0x591f52=_0x53c486[_0x264f65]!==''?String(_0x53c486[_0x264f65]):'';break;case _0x4a6766(0xfb):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106[_0x4a6766(0x111)](_0xa64336=>String(_0xa64336));break;case'STRUCT':_0x38774a=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):{},_0x591f52=VisuMZ[_0x4a6766(0x118)]({},_0x38774a);break;case _0x4a6766(0x9d):_0x6ec106=_0x53c486[_0x264f65]!==''?JSON[_0x4a6766(0xc8)](_0x53c486[_0x264f65]):[],_0x591f52=_0x6ec106[_0x4a6766(0x111)](_0x42c269=>VisuMZ['ConvertParams']({},JSON['parse'](_0x42c269)));break;default:continue;}_0x3d104f[_0x52525c]=_0x591f52;}else _0x11dcab[_0x4a6766(0x10f)]['Game_Troop_setup'][_0x4a6766(0xb6)](this,_0x52ca18),this[_0x4a6766(0x119)]();}}return _0x3d104f;},(_0x1f0bd3=>{const _0xf0111e=_0x2c8d7c,_0x916cd9=_0x1f0bd3[_0xf0111e(0xaf)];for(const _0x16a5fa of dependencies){if(!Imported[_0x16a5fa]){if(_0xf0111e(0x12a)!==_0xf0111e(0x12a))this[_0xf0111e(0x98)]=_0x46b0b7[_0xf0111e(0xfd)][_0xf0111e(0x98)];else{alert(_0xf0111e(0x129)[_0xf0111e(0x130)](_0x916cd9,_0x16a5fa)),SceneManager['exit']();break;}}}const _0x293ea6=_0x1f0bd3[_0xf0111e(0x9a)];if(_0x293ea6[_0xf0111e(0xd0)](/\[Version[ ](.*?)\]/i)){const _0x1749a6=Number(RegExp['$1']);if(_0x1749a6!==VisuMZ[label][_0xf0111e(0xdd)]){if(_0xf0111e(0xba)===_0xf0111e(0xcf)){const _0x303099=this[_0xf0111e(0xa0)](_0x14c267);if(!_0x303099)return;if(!this[_0xf0111e(0x125)](_0x46e481,_0x59058d)){const _0x553eea=new _0x24672b(_0xce5f23,_0x200458);_0x303099[_0xf0111e(0xa4)](_0x553eea),_0x303099[_0xf0111e(0xe5)][_0xf0111e(0xf4)]((_0x2fb658,_0x410d76)=>_0x2fb658[_0xf0111e(0xd7)]-_0x410d76[_0xf0111e(0xd7)]);}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xf0111e(0x130)](_0x916cd9,_0x1749a6)),SceneManager[_0xf0111e(0x126)]();}}if(_0x293ea6[_0xf0111e(0xd0)](/\[Tier[ ](\d+)\]/i)){const _0x1bd84a=Number(RegExp['$1']);if(_0x1bd84a<tier)alert(_0xf0111e(0xe7)['format'](_0x916cd9,_0x1bd84a,tier)),SceneManager[_0xf0111e(0x126)]();else{if(_0xf0111e(0xb2)==='QoaQV')tier=Math[_0xf0111e(0x128)](_0x1bd84a,tier);else return this[_0xf0111e(0x110)]===_0x48d91a&&this[_0xf0111e(0x119)](),this[_0xf0111e(0x110)][_0x1d60d0]=this[_0xf0111e(0x110)][_0x385652]||{},this['_frontEnvironmentSettings'][_0x537dce];}}VisuMZ[_0xf0111e(0x118)](VisuMZ[label][_0xf0111e(0xce)],_0x1f0bd3[_0xf0111e(0x10b)]);})(pluginData),VisuMZ[_0x2c8d7c(0x10f)][_0x2c8d7c(0xc2)]=function(_0xf050e7){const _0x330c44=_0x2c8d7c;_0xf050e7=JsonEx['makeDeepCopy'](_0xf050e7);if(_0xf050e7[_0x330c44(0xad)]){const _0x1853e8=_0xf050e7[_0x330c44(0xad)][_0x330c44(0x11d)]('/');_0xf050e7[_0x330c44(0x104)]=_0x1853e8[0x0]||'',_0xf050e7['Filename']=_0x1853e8[0x1]||'';}else _0xf050e7['Folder']='',_0xf050e7[_0x330c44(0xbf)]='';return _0xf050e7[_0x330c44(0xfd)]=_0xf050e7['Extra']||{},_0xf050e7[_0x330c44(0xfd)][_0x330c44(0xb1)]=_0xf050e7['Extra'][_0x330c44(0xb1)]??_0x330c44(0x95),_0xf050e7[_0x330c44(0xfd)][_0x330c44(0x98)]=_0xf050e7['Extra'][_0x330c44(0x98)]??0x0,_0xf050e7[_0x330c44(0xfd)][_0x330c44(0xed)]=_0xf050e7[_0x330c44(0xfd)][_0x330c44(0xed)]??0xff,_0xf050e7['Extra']['ScrollHorz']=_0xf050e7[_0x330c44(0xfd)][_0x330c44(0x114)]??0x0,_0xf050e7[_0x330c44(0xfd)][_0x330c44(0xac)]=_0xf050e7[_0x330c44(0xfd)][_0x330c44(0xac)]??0x0,_0xf050e7;},PluginManager['registerCommand'](pluginData[_0x2c8d7c(0xaf)],_0x2c8d7c(0xda),_0x2983dd=>{const _0x5d9af6=_0x2c8d7c;if(!SceneManager[_0x5d9af6(0x106)]())return;VisuMZ[_0x5d9af6(0x118)](_0x2983dd,_0x2983dd);const _0x2b1ef9=VisuMZ['VisualBattleEnv'][_0x5d9af6(0xc2)](_0x2983dd);if(_0x2b1ef9[_0x5d9af6(0x104)][_0x5d9af6(0x12c)]()===''||_0x2b1ef9[_0x5d9af6(0xbf)]==='')return;const _0xad232e=_0x2b1ef9['ID']||0x0;$gameTroop['setBackEnvironmentSettings'](_0xad232e,_0x2b1ef9);}),PluginManager[_0x2c8d7c(0x91)](pluginData[_0x2c8d7c(0xaf)],_0x2c8d7c(0xc1),_0x2681ae=>{const _0x4e96fe=_0x2c8d7c;if(!SceneManager[_0x4e96fe(0x106)]())return;VisuMZ['ConvertParams'](_0x2681ae,_0x2681ae);const _0x1ebbe8=_0x2681ae[_0x4e96fe(0xed)],_0x45298e=_0x2681ae[_0x4e96fe(0x12e)];for(const _0x2f8b39 of _0x2681ae[_0x4e96fe(0x11b)]){const _0x3c21c5=$gameTroop[_0x4e96fe(0xc6)](_0x2f8b39);_0x3c21c5['Extra'][_0x4e96fe(0xed)]=_0x1ebbe8,_0x3c21c5[_0x4e96fe(0x12e)]=_0x45298e;}}),PluginManager[_0x2c8d7c(0x91)](pluginData[_0x2c8d7c(0xaf)],_0x2c8d7c(0x97),_0x5506eb=>{const _0xe1ec88=_0x2c8d7c;if(!SceneManager[_0xe1ec88(0x106)]())return;VisuMZ[_0xe1ec88(0x118)](_0x5506eb,_0x5506eb);const _0x3f9fd6=SceneManager['_scene'][_0xe1ec88(0xf1)],_0x48a00f=![];for(const _0x5d8804 of _0x5506eb[_0xe1ec88(0x11b)]){_0x3f9fd6[_0xe1ec88(0x10e)](_0x5d8804,_0x48a00f);}}),PluginManager[_0x2c8d7c(0x91)](pluginData[_0x2c8d7c(0xaf)],_0x2c8d7c(0xee),_0x3d4c20=>{const _0x3bbcae=_0x2c8d7c;if(!SceneManager[_0x3bbcae(0x106)]())return;VisuMZ[_0x3bbcae(0x118)](_0x3d4c20,_0x3d4c20);const _0x1563a9=VisuMZ[_0x3bbcae(0x10f)][_0x3bbcae(0xc2)](_0x3d4c20);if(_0x1563a9[_0x3bbcae(0x104)][_0x3bbcae(0x12c)]()===''||_0x1563a9['Filename']==='')return;const _0x4ed9c6=_0x1563a9['ID']||0x0;$gameTroop['setFrontEnvironmentSettings'](_0x4ed9c6,_0x1563a9);}),PluginManager[_0x2c8d7c(0x91)](pluginData[_0x2c8d7c(0xaf)],_0x2c8d7c(0xb8),_0x2b735d=>{const _0x279b7a=_0x2c8d7c;if(!SceneManager[_0x279b7a(0x106)]())return;VisuMZ[_0x279b7a(0x118)](_0x2b735d,_0x2b735d);const _0x491ffc=_0x2b735d[_0x279b7a(0xed)],_0x18192a=_0x2b735d[_0x279b7a(0x12e)];for(const _0x631578 of _0x2b735d[_0x279b7a(0x11b)]){if(_0x279b7a(0xea)!==_0x279b7a(0xea)){const _0x112871=_0x4d3295[_0x279b7a(0xad)][_0x279b7a(0x11d)]('/');_0x55ad4d[_0x279b7a(0x104)]=_0x112871[0x0]||'',_0x4ab1a7['Filename']=_0x112871[0x1]||'';}else{const _0x2c373b=$gameTroop['getFrontEnvironmentSettings'](_0x631578);_0x2c373b[_0x279b7a(0xfd)][_0x279b7a(0xed)]=_0x491ffc,_0x2c373b[_0x279b7a(0x12e)]=_0x18192a;}}}),PluginManager['registerCommand'](pluginData[_0x2c8d7c(0xaf)],'FrontEnvironmentRemove',_0x3a5cd0=>{const _0x52862d=_0x2c8d7c;if(!SceneManager[_0x52862d(0x106)]())return;VisuMZ[_0x52862d(0x118)](_0x3a5cd0,_0x3a5cd0);const _0x3f9116=SceneManager['_scene'][_0x52862d(0xf1)],_0x23a753=!![];for(const _0x1e4f5c of _0x3a5cd0['list']){_0x52862d(0xe2)===_0x52862d(0xe2)?_0x3f9116[_0x52862d(0x10e)](_0x1e4f5c,_0x23a753):(_0x281b2c[_0x52862d(0x10f)][_0x52862d(0xa9)]['call'](this),this[_0x52862d(0x99)]());}}),VisuMZ[_0x2c8d7c(0x10f)][_0x2c8d7c(0xe3)]={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},VisuMZ['VisualBattleEnv'][_0x2c8d7c(0xaa)]=Game_Troop[_0x2c8d7c(0xd2)][_0x2c8d7c(0xca)],Game_Troop[_0x2c8d7c(0xd2)][_0x2c8d7c(0xca)]=function(_0x5b8e58){const _0x591d31=_0x2c8d7c;VisuMZ[_0x591d31(0x10f)][_0x591d31(0xaa)][_0x591d31(0xb6)](this,_0x5b8e58),this[_0x591d31(0x119)]();},Game_Troop['prototype'][_0x2c8d7c(0x119)]=function(){const _0xadb35e=_0x2c8d7c;this[_0xadb35e(0x9c)]=[],this[_0xadb35e(0x110)]=[];},Game_Troop[_0x2c8d7c(0xd2)][_0x2c8d7c(0xc6)]=function(_0x104216){const _0x22dbc3=_0x2c8d7c;if(this[_0x22dbc3(0x9c)]===undefined){if(_0x22dbc3(0x12b)!==_0x22dbc3(0x9b))this[_0x22dbc3(0x119)]();else{if(!_0x34273f[_0x22dbc3(0x106)]())return;_0x5e420a[_0x22dbc3(0x118)](_0x4c7928,_0x5c8f2d);const _0x53ae3c=_0x26ce3e[_0x22dbc3(0x10f)][_0x22dbc3(0xc2)](_0x248c6f);if(_0x53ae3c['Folder']['trim']()===''||_0x53ae3c[_0x22dbc3(0xbf)]==='')return;const _0x21d169=_0x53ae3c['ID']||0x0;_0x4aba33[_0x22dbc3(0xcb)](_0x21d169,_0x53ae3c);}}return this[_0x22dbc3(0x9c)][_0x104216]=this[_0x22dbc3(0x9c)][_0x104216]||{},this[_0x22dbc3(0x9c)][_0x104216];},Game_Troop[_0x2c8d7c(0xd2)]['setBackEnvironmentSettings']=function(_0x5e8071,_0x31a765){const _0xba8057=_0x2c8d7c;this[_0xba8057(0x9c)]===undefined&&this[_0xba8057(0x119)]();this[_0xba8057(0x9c)][_0x5e8071]=JsonEx['makeDeepCopy'](_0x31a765);if(SceneManager['isSceneBattle']()){if(_0xba8057(0x11c)===_0xba8057(0x11c)){const _0x375053=SceneManager[_0xba8057(0xf3)]['_spriteset'];_0x375053[_0xba8057(0x103)](_0x5e8071,![]);}else return;}},Game_Troop[_0x2c8d7c(0xd2)]['getFrontEnvironmentSettings']=function(_0x4cecab){const _0x4f692f=_0x2c8d7c;return this['_frontEnvironmentSettings']===undefined&&this[_0x4f692f(0x119)](),this[_0x4f692f(0x110)][_0x4cecab]=this['_frontEnvironmentSettings'][_0x4cecab]||{},this['_frontEnvironmentSettings'][_0x4cecab];},Game_Troop['prototype'][_0x2c8d7c(0xcb)]=function(_0x3ba72f,_0x4a925b){const _0x4bb66e=_0x2c8d7c;this['_frontEnvironmentSettings']===undefined&&this[_0x4bb66e(0x119)]();this['_frontEnvironmentSettings'][_0x3ba72f]=JsonEx['makeDeepCopy'](_0x4a925b);if(SceneManager[_0x4bb66e(0x106)]()){if(_0x4bb66e(0x90)!==_0x4bb66e(0xbc)){const _0x5447c2=SceneManager[_0x4bb66e(0xf3)]['_spriteset'];_0x5447c2[_0x4bb66e(0x103)](_0x3ba72f,!![]);}else{const _0xec8f49=_0x418ad6[_0x4bb66e(0xf3)][_0x4bb66e(0xf1)];_0xec8f49[_0x4bb66e(0x103)](_0x1bef2a,![]);}}},VisuMZ[_0x2c8d7c(0x10f)][_0x2c8d7c(0xa9)]=Scene_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0x92)],Scene_Battle[_0x2c8d7c(0xd2)]['createSpriteset']=function(){const _0x512d63=_0x2c8d7c;VisuMZ[_0x512d63(0x10f)][_0x512d63(0xa9)]['call'](this),this['restoreVisualBattleEnv']();},Scene_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0x99)]=function(){const _0x467ae6=_0x2c8d7c;if(!SceneManager[_0x467ae6(0xf6)]())return;const _0x2e3db8=$gameTroop[_0x467ae6(0x9c)]||[];for(const _0x3f3451 of _0x2e3db8){if(!_0x3f3451)continue;const _0x337f5c=_0x3f3451['ID'];_0x3f3451[_0x467ae6(0x12e)]=0x1,$gameTroop['setBackEnvironmentSettings'](_0x337f5c,_0x3f3451);}const _0xf21815=$gameTroop[_0x467ae6(0x110)]||[];for(const _0x370920 of _0xf21815){if(!_0x370920)continue;const _0x5ea25f=_0x370920['ID'];_0x370920[_0x467ae6(0x12e)]=0x1,$gameTroop['setFrontEnvironmentSettings'](_0x5ea25f,_0x370920);}};function Sprite_BattleEnvironment(){const _0x1624ca=_0x2c8d7c;this[_0x1624ca(0x102)](...arguments);}function _0x2d23(_0x828fad,_0x440a99){return _0x2d23=function(_0x47ed35,_0x2d2375){_0x47ed35=_0x47ed35-0x90;let _0x4d9b65=_0x47ed[_0x47ed35];return _0x4d9b65;},_0x2d23(_0x828fad,_0x440a99);}Sprite_BattleEnvironment['prototype']=Object['create'](Sprite_Battleback[_0x2c8d7c(0xd2)]),Sprite_BattleEnvironment[_0x2c8d7c(0xd2)]['constructor']=Sprite_BattleEnvironment,Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0x102)]=function(_0x1633b9,_0x1aef80){const _0x43290f=_0x2c8d7c;this[_0x43290f(0xd7)]=_0x1633b9,this[_0x43290f(0x11e)]=_0x1aef80,Sprite_Battleback['prototype'][_0x43290f(0x102)]['call'](this,0x0),this[_0x43290f(0x101)](),this['opacity']=0x0;},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0x124)]=function(){},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0x101)]=function(){const _0x432a2f=_0x2c8d7c;!this[_0x432a2f(0x123)]&&(_0x432a2f(0x108)!==_0x432a2f(0x108)?this['_colorFilter']=new _0x18d395():this[_0x432a2f(0x123)]=new ColorFilter()),!this[_0x432a2f(0x117)]&&(this[_0x432a2f(0x117)]=[]),this[_0x432a2f(0x117)]['push'](this[_0x432a2f(0x123)]);},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0xf5)]=function(){const _0x1d1d12=_0x2c8d7c;return this[_0x1d1d12(0x11e)]?$gameTroop[_0x1d1d12(0xa8)](this['_id']):$gameTroop[_0x1d1d12(0xc6)](this[_0x1d1d12(0xd7)]);},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0xa7)]=function(){const _0xddaab9=_0x2c8d7c;Sprite_Battleback[_0xddaab9(0xd2)][_0xddaab9(0xa7)]['call'](this),this['updateBitmap'](),this[_0xddaab9(0xb4)](),this[_0xddaab9(0xc7)](),this['updateScrolling'](),this[_0xddaab9(0xc0)]();},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)]['updateBitmap']=function(){const _0x25d113=_0x2c8d7c,_0x55f49=this['settings']();if(!_0x55f49)return;if(this['_folder']===_0x55f49[_0x25d113(0x104)]&&this[_0x25d113(0xd4)]===_0x55f49[_0x25d113(0xbf)])return;this['_folder']=_0x55f49[_0x25d113(0x104)],this[_0x25d113(0xd4)]=_0x55f49[_0x25d113(0xbf)];const _0x2c007c=_0x25d113(0xc4)[_0x25d113(0x130)](this[_0x25d113(0xe8)][_0x25d113(0x12c)]()),_0xe076b3=ImageManager['loadBitmap'](_0x2c007c,this[_0x25d113(0xd4)][_0x25d113(0x12c)]());_0xe076b3[_0x25d113(0x9f)](this['processBitmap'][_0x25d113(0xfc)](this,_0xe076b3));},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0xa1)]=function(_0x15a552){const _0x48c7c0=_0x2c8d7c;this[_0x48c7c0(0xe4)]=_0x15a552,this['adjustPosition'](),this['origin']['x']=0x0,this[_0x48c7c0(0xdb)]['y']=0x0;},Sprite_BattleEnvironment['prototype'][_0x2c8d7c(0xbe)]=function(){const _0x44ff16=_0x2c8d7c,_0x78d107=this[_0x44ff16(0xf5)]();if(!_0x78d107)return;let _0x2afd2c=_0x78d107[_0x44ff16(0xfd)][_0x44ff16(0xb1)]||'BattleCore';_0x2afd2c===_0x44ff16(0x95)&&(_0x2afd2c=VisuMZ['BattleCore'][_0x44ff16(0xce)][_0x44ff16(0xbd)][_0x44ff16(0xe6)]||'MZ');switch(_0x2afd2c){case'MZ':VisuMZ[_0x44ff16(0x95)][_0x44ff16(0x109)][_0x44ff16(0xb6)](this);break;case _0x44ff16(0xe9):this[_0x44ff16(0x96)]();break;case'ScaleToFit':this[_0x44ff16(0x131)]();break;case _0x44ff16(0x107):this['adjustPosition_ScaleDown']();break;case _0x44ff16(0x10a):this['adjustPosition_ScaleUp']();break;}},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0xb4)]=function(){const _0x53551c=_0x2c8d7c,_0x3daf5b=this[_0x53551c(0xf5)]();if(!_0x3daf5b)return;this['blendMode']!==_0x3daf5b['Extra'][_0x53551c(0x98)]&&(_0x53551c(0xb9)!==_0x53551c(0xcd)?this[_0x53551c(0x98)]=_0x3daf5b['Extra'][_0x53551c(0x98)]:(_0x23642f(_0x53551c(0xe7)[_0x53551c(0x130)](_0xede288,_0x4ad5ec,_0x5f0b07)),_0x24e336[_0x53551c(0x126)]()));},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0xc7)]=function(){const _0x4b0863=_0x2c8d7c,_0x1db8f2=this[_0x4b0863(0xf5)]();if(!_0x1db8f2)return;if(_0x1db8f2[_0x4b0863(0x12e)]>0x0){if(_0x4b0863(0x120)===_0x4b0863(0x120)){const _0x2cf5f9=_0x1db8f2[_0x4b0863(0x12e)],_0x59d828=_0x1db8f2['Extra'][_0x4b0863(0xed)];this[_0x4b0863(0xed)]=(this[_0x4b0863(0xed)]*(_0x2cf5f9-0x1)+_0x59d828)/_0x2cf5f9,_0x1db8f2['duration']--;}else this['_backEnvironmentSettings']=[],this['_frontEnvironmentSettings']=[];}},Sprite_BattleEnvironment[_0x2c8d7c(0xd2)][_0x2c8d7c(0x12f)]=function(){const _0x7e7277=_0x2c8d7c,_0x1f70f5=this[_0x7e7277(0xf5)]();if(!_0x1f70f5)return;this[_0x7e7277(0xdb)]['x']+=_0x1f70f5['Extra'][_0x7e7277(0x114)],this['origin']['y']+=_0x1f70f5[_0x7e7277(0xfd)][_0x7e7277(0xac)];},Sprite_BattleEnvironment['prototype'][_0x2c8d7c(0xc0)]=function(){const _0x47052a=_0x2c8d7c,_0x2b31b7=this[_0x47052a(0xf5)]();if(!_0x2b31b7)return;if(!this[_0x47052a(0x123)]){if(_0x47052a(0xec)!=='xNENk')this[_0x47052a(0x101)]();else{const _0x514238=this[_0x47052a(0xf5)]();if(!_0x514238)return;if(_0x514238[_0x47052a(0x12e)]>0x0){const _0x46897d=_0x514238['duration'],_0x5d2cf6=_0x514238['Extra'][_0x47052a(0xed)];this[_0x47052a(0xed)]=(this[_0x47052a(0xed)]*(_0x46897d-0x1)+_0x5d2cf6)/_0x46897d,_0x514238[_0x47052a(0x12e)]--;}}}this[_0x47052a(0x123)]['setHue'](_0x2b31b7[_0x47052a(0xfd)][_0x47052a(0xf0)]);try{if(_0x47052a(0xd1)==='AQbqv'){if(this[_0x47052a(0xf7)]){}}else this['_colorFilter'][_0x47052a(0xab)](_0x2b31b7[_0x47052a(0xfd)][_0x47052a(0xb5)]||[0x0,0x0,0x0,0x0]);}catch(_0x575de3){this[_0x47052a(0x123)]['setColorTone']([0x0,0x0,0x0,0x0]);}_0x2b31b7[_0x47052a(0xfd)]['hue']+=_0x2b31b7[_0x47052a(0xfd)][_0x47052a(0xbb)];},VisuMZ[_0x2c8d7c(0x10f)][_0x2c8d7c(0xe0)]=Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0xd5)],Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0xd5)]=function(){const _0x15bb94=_0x2c8d7c;VisuMZ['VisualBattleEnv']['Spriteset_Battle_createBattleback']['call'](this),this[_0x15bb94(0xd3)]();},Spriteset_Battle['prototype']['createBackEnvironmentContainer']=function(){const _0x53ec32=_0x2c8d7c;this[_0x53ec32(0xb3)]=new Sprite(),this[_0x53ec32(0x115)]['addChild'](this[_0x53ec32(0xb3)]);},VisuMZ[_0x2c8d7c(0x10f)][_0x2c8d7c(0x11a)]=Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0xc5)],Spriteset_Battle['prototype'][_0x2c8d7c(0xc5)]=function(){const _0x41a123=_0x2c8d7c;this[_0x41a123(0x100)](),VisuMZ[_0x41a123(0x10f)][_0x41a123(0x11a)]['call'](this);},Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0x100)]=function(){const _0x4781d4=_0x2c8d7c;this[_0x4781d4(0xf7)]=new Sprite(),this[_0x4781d4(0x9e)][_0x4781d4(0xa4)](this[_0x4781d4(0xf7)]),this[_0x4781d4(0xf7)]['x']=-this['_battleField']['x'],this[_0x4781d4(0xf7)]['y']=-this['_battleField']['y'];},VisuMZ['VisualBattleEnv'][_0x2c8d7c(0xef)]=Spriteset_Battle[_0x2c8d7c(0xd2)]['update'],Spriteset_Battle['prototype'][_0x2c8d7c(0xa7)]=function(){const _0x4d5586=_0x2c8d7c;VisuMZ[_0x4d5586(0x10f)][_0x4d5586(0xef)][_0x4d5586(0xb6)](this);},Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0xde)]=function(){const _0x51e264=_0x2c8d7c;if(this[_0x51e264(0xf7)]){}},Spriteset_Battle[_0x2c8d7c(0xd2)]['getBattleEnvironmentContainer']=function(_0x442a93){const _0x518698=_0x2c8d7c;if(_0x442a93){if(_0x518698(0x116)===_0x518698(0xf8))_0x13c145[_0x518698(0xd2)][_0x518698(0xa7)][_0x518698(0xb6)](this),this[_0x518698(0xd8)](),this[_0x518698(0xb4)](),this['updateOpacity'](),this[_0x518698(0x12f)](),this[_0x518698(0xc0)]();else return this['_frontEnvironmentContainer'];}else return this[_0x518698(0xb3)];},Spriteset_Battle[_0x2c8d7c(0xd2)][_0x2c8d7c(0x125)]=function(_0x2d4d87,_0x3f9b50){const _0x39f799=_0x2c8d7c,_0x2b4096=this[_0x39f799(0xa0)](_0x3f9b50);return _0x2b4096[_0x39f799(0xe5)][_0x39f799(0xb7)](_0x435360=>_0x435360[_0x39f799(0xd7)]===_0x2d4d87);},Spriteset_Battle['prototype'][_0x2c8d7c(0x103)]=function(_0x5b1254,_0x510d00){const _0x33d8f0=_0x2c8d7c,_0x449af3=this['getBattleEnvironmentContainer'](_0x510d00);if(!_0x449af3)return;!this[_0x33d8f0(0x125)](_0x5b1254,_0x510d00)&&(_0x33d8f0(0x112)!=='jdEyy'?this[_0x33d8f0(0xf2)](_0x5b1254,_0x510d00):(this['createFrontEnvironmentContainer'](),_0x4c2a05[_0x33d8f0(0x10f)]['Spriteset_Battle_createWeather'][_0x33d8f0(0xb6)](this)));},Spriteset_Battle[_0x2c8d7c(0xd2)]['createBattleEnvironmentSprite']=function(_0x25ef9a,_0x201541){const _0x470472=_0x2c8d7c,_0x2fcf75=this[_0x470472(0xa0)](_0x201541);if(!_0x2fcf75)return;if(!this['getBattleEnvironmentSprite'](_0x25ef9a,_0x201541)){if(_0x470472(0x127)!=='ucibz'){const _0x554714=this[_0x470472(0xa0)](_0x47d1c5);return _0x554714[_0x470472(0xe5)][_0x470472(0xb7)](_0x124ab3=>_0x124ab3[_0x470472(0xd7)]===_0x564140);}else{const _0x3bd264=new Sprite_BattleEnvironment(_0x25ef9a,_0x201541);_0x2fcf75[_0x470472(0xa4)](_0x3bd264),_0x2fcf75['children'][_0x470472(0xf4)]((_0x45b07e,_0x33d0a9)=>_0x45b07e['_id']-_0x33d0a9[_0x470472(0xd7)]);}}},Spriteset_Battle['prototype'][_0x2c8d7c(0x10e)]=function(_0x4c7508,_0x6e6f3d){const _0x35862b=_0x2c8d7c,_0x379459=this['getBattleEnvironmentContainer'](_0x6e6f3d);if(!_0x379459)return;const _0x212012=this[_0x35862b(0x125)](_0x4c7508,_0x6e6f3d);_0x212012&&('MXHQX'===_0x35862b(0xcc)?this[_0x35862b(0x123)]['setColorTone'](_0x582d23[_0x35862b(0xfd)]['colorTone']||[0x0,0x0,0x0,0x0]):(_0x379459['removeChild'](_0x212012),_0x379459[_0x35862b(0xe5)]['sort']((_0x354851,_0x1b1e0f)=>_0x354851[_0x35862b(0xd7)]-_0x1b1e0f[_0x35862b(0xd7)])));};