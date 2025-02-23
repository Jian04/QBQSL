//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [ActSeqCamera]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Camera_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds new Action Sequences functions to the VisuStella MZ
 * Battle Core plugin to give you, the game dev, control over the battle camera
 * and zoom functions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Attach the camera to a specific point on the screen.
 * * Attach the camera to a specific target(s) on the screen.
 * * Pan the camera to be off center using the offset functions.
 * * Remove camera clamping to let the camera go out of bounds.
 * * Set the camera zoom level as you want.
 * * Tilt the camera by adjust the angle.
 * * New Options added to let the player turn on/off the battle camera.
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
 * - VisuMZ_0_CoreEngine
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Spriteset Position Rewrite
 *
 * - The Spriteset_Battle function for updatePosition needed to be rewritten in
 * order to allow all the new features and functions added by the battle camera
 * and zoom.
 * 
 * - Camera tricks like zooming, panning, and tilting will be reset during the
 * input phase to ensure the player is able to see the whole battlefield.
 * 
 * - The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Angle (Camera) ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Camera Control ===
 *
 * These Action Sequences are battle camera-related.
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 * 
 * === Action Sequences - Skew (Camera) ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Zoom (Camera) ===
 *
 * These Action Sequences are zoom-related.
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These plugin parameters add a new options command in order to let the player
 * decide if they want the battle camera ON or OFF.
 * 
 * The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Battle Camera options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Options Name:
 *   - Command name of the option.
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
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Show Pictures should now appear in the right positions. Fix by Irina.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Damage offsets are now corrected and in line with the latest Battle Core
 *    version.
 *
 * Version 1.00: September 23, 2020
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
 * @param ActSeqCamera
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Options:struct
 * @text Options Menu
 * @type struct<Options>
 * @desc Settings for the Options Menu
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"}
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
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Battle Camera options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionsName:str
 * @text Options Name
 * @parent Options
 * @desc Command name of the option.
 * @default Battle Camera
 *
 */
//=============================================================================

const _0x4da2=['setBattleZoom','cameraClamp','boxWidth','exit','Sprite_Battler_damageOffsetY','ApplyEasing','updatePositionZoom','cameraFocusTargetsX','updatePosition','zoomWholeDuration','cameraDurationWhole','applyAnchorsForTiltEffect','anchor','ARRAYJSON','InOutSine','XZrhW','cameraXTarget','cameraYTarget','max','setBattleCameraTargets','width','description','version','ceil','ePOAi','cameraOffsetDuration','makeData','Game_Screen_update','cameraFocusTargetsY','height','zoomScale','skewEasing','cameraOffsetDurationWhole','ConfigManager_applyData','status','boxHeight','ActSeqCamera','applyEasing','BattleManager_setup','addGeneralOptions','setup','angleTarget','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','advanced','format','cameraEasing','updatePositionCoreEngine','Game_Screen_clear','NUM','EVAL','initialBattleCameraSettings','ARRAYEVAL','createLowerLayer','ARRAYSTRUCT','eVDMN','map','battler','Spriteset_Battle_initialize','cameraFocusTargets','_cameraFocusTargets','mToTm','applyData','indexOf','_cacheScaleY','LeVJE','Sprite_Battler_damageOffsetX','updateBattleZoom','setCameraFocusTargets','angleEasing','ConfigManager_makeData','Settings','cameraY','zoomScaleTarget','isSceneBattle','NCMQD','parse','initialize','return\x200','cameraOffsetEasing','xtbNu','skewTargetX','STRUCT','setBattleAngle','updateBattleSkew','round','filter','ConvertParams','BKZwG','skewWholeDuration','getBattleCameraClamp','updatePositionCamera','setBattleCameraOffset','_cacheScaleX','trim','maxCommands','_damageContainer','setBattleCameraPoint','cameraOffsetX','updatePositionAngle','includes','zoomDuration','skewX','skewY','screenWidth','cameraOffsetXTarget','cameraX','reduce','name','updatePositionShake','ARRAYNUM','damageOffsetX','VisuMZ_0_CoreEngine','scale','prototype','updatePositionCameraNeutral','skewTargetY','shake','mArWm','JSON','length','update','cameraFocusTarget','ARRAYFUNC','getBattleZoom','ARRAYSTR','AddOption','updatePositionCameraRoamNew','_baseSprite','clamp','setBattleSkew','updatePositionCameraRoamOld','call','battleCamera','VqVNt','DHKxR','cameraOffsetY','angleDuration','getBattleAngle','skew','Options','clear','updateBattleCameraOffset','oEaqS','updatePositionSkew','isInputting','battleCameraOption','Nmtbt','Window_Options_addGeneralOptions','skewDuration','cameraOffsetYTarget','toUpperCase','zoomEasing','Spriteset_Battle_createLowerLayer','clearCameraFocusTargets','battleCameraData','addBattleCameraCommand','angle','match','_oldCamera','_battleCamera','angleWholeDuration','KQavh','addBattleCameraCommands','nimPV','clearBattleCamera','damageOffsetY','cameraDuration'];(function(_0x3b67e2,_0x134661){const _0x4da25f=function(_0x58a2e7){while(--_0x58a2e7){_0x3b67e2['push'](_0x3b67e2['shift']());}};_0x4da25f(++_0x134661);}(_0x4da2,0x1db));const _0x58a2=function(_0x3b67e2,_0x134661){_0x3b67e2=_0x3b67e2-0xd2;let _0x4da25f=_0x4da2[_0x3b67e2];return _0x4da25f;};const _0xc1ad1=_0x58a2;var label='ActSeqCamera',tier=tier||0x0,dependencies=[_0xc1ad1(0x15b),'VisuMZ_1_BattleCore'],pluginData=$plugins[_0xc1ad1(0x141)](function(_0x4727d5){const _0x413310=_0xc1ad1;return _0x4727d5[_0x413310(0x10e)]&&_0x4727d5[_0x413310(0x101)][_0x413310(0x14f)]('['+label+']');})[0x0];VisuMZ[label][_0xc1ad1(0x132)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x586b26,_0x2e7dc0){const _0x199f2c=_0xc1ad1;for(const _0xd26de4 in _0x2e7dc0){if(_0xd26de4[_0x199f2c(0xe2)](/(.*):(.*)/i)){const _0x27c0ac=String(RegExp['$1']),_0x1e37f5=String(RegExp['$2'])[_0x199f2c(0xdb)]()[_0x199f2c(0x149)]();let _0x3b224,_0x3d177d,_0x6b4f92;switch(_0x1e37f5){case _0x199f2c(0x11c):_0x3b224=_0x2e7dc0[_0xd26de4]!==''?Number(_0x2e7dc0[_0xd26de4]):0x0;break;case _0x199f2c(0x159):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d[_0x199f2c(0x123)](_0x5e5e9e=>Number(_0x5e5e9e));break;case _0x199f2c(0x11d):_0x3b224=_0x2e7dc0[_0xd26de4]!==''?eval(_0x2e7dc0[_0xd26de4]):null;break;case _0x199f2c(0x11f):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d[_0x199f2c(0x123)](_0x2ffbf6=>eval(_0x2ffbf6));break;case _0x199f2c(0x162):_0x3b224=_0x2e7dc0[_0xd26de4]!==''?JSON['parse'](_0x2e7dc0[_0xd26de4]):'';break;case _0x199f2c(0xf9):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON['parse'](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d['map'](_0x2a36ff=>JSON[_0x199f2c(0x137)](_0x2a36ff));break;case'FUNC':_0x3b224=_0x2e7dc0[_0xd26de4]!==''?new Function(JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4])):new Function(_0x199f2c(0x139));break;case _0x199f2c(0x166):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d[_0x199f2c(0x123)](_0x15d9d4=>new Function(JSON[_0x199f2c(0x137)](_0x15d9d4)));break;case'STR':_0x3b224=_0x2e7dc0[_0xd26de4]!==''?String(_0x2e7dc0[_0xd26de4]):'';break;case _0x199f2c(0x168):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d['map'](_0x48c0bc=>String(_0x48c0bc));break;case _0x199f2c(0x13d):_0x6b4f92=_0x2e7dc0[_0xd26de4]!==''?JSON['parse'](_0x2e7dc0[_0xd26de4]):{},_0x3b224=VisuMZ[_0x199f2c(0x142)]({},_0x6b4f92);break;case _0x199f2c(0x121):_0x3d177d=_0x2e7dc0[_0xd26de4]!==''?JSON[_0x199f2c(0x137)](_0x2e7dc0[_0xd26de4]):[],_0x3b224=_0x3d177d[_0x199f2c(0x123)](_0x5bcbbc=>VisuMZ[_0x199f2c(0x142)]({},JSON[_0x199f2c(0x137)](_0x5bcbbc)));break;default:continue;}_0x586b26[_0x27c0ac]=_0x3b224;}}return _0x586b26;},(_0x5b71fd=>{const _0x48b5c9=_0xc1ad1,_0x9df138=_0x5b71fd[_0x48b5c9(0x157)];for(const _0x5ca050 of dependencies){if(!Imported[_0x5ca050]){if(_0x48b5c9(0x172)!=='FxYgy'){alert(_0x48b5c9(0x116)[_0x48b5c9(0x118)](_0x9df138,_0x5ca050)),SceneManager[_0x48b5c9(0xef)]();break;}else{function _0x4280c5(){const _0x5f0330=_0x48b5c9;_0x473125[_0x5f0330(0x14d)]=this['applyEasing'](_0x279df6[_0x5f0330(0x14d)],_0x53d9c5['cameraOffsetXTarget'],_0x3d24ac,_0x3f4468,_0x46786e),_0x14b743['cameraOffsetY']=this[_0x5f0330(0x111)](_0x7eaae2[_0x5f0330(0x173)],_0x5c7ff9[_0x5f0330(0xda)],_0x3d405f,_0x46e4ab,_0x3bda61),_0xcd9e50['cameraOffsetDuration']--;}}}}const _0x358756=_0x5b71fd[_0x48b5c9(0x101)];if(_0x358756[_0x48b5c9(0xe2)](/\[Version[ ](.*?)\]/i)){const _0x21e9e3=Number(RegExp['$1']);_0x21e9e3!==VisuMZ[label][_0x48b5c9(0x102)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x9df138,_0x21e9e3)),SceneManager[_0x48b5c9(0xef)]());}if(_0x358756['match'](/\[Tier[ ](\d+)\]/i)){if('sPVYX'===_0x48b5c9(0xe8)){function _0x46e246(){const _0x39256e=_0x48b5c9;if(!_0x1a3540[_0x39256e(0x170)])return 0x1;if(_0x2ac7e5[_0x39256e(0xd5)]())return 0x1;return _0x1e6a7e[_0x39256e(0xdf)]()[_0x39256e(0x10a)];}}else{const _0x346ea4=Number(RegExp['$1']);if(_0x346ea4<tier){if(_0x48b5c9(0x12c)===_0x48b5c9(0xd3)){function _0x4a11fe(){const _0x397aeb=_0x48b5c9;this['x']=_0x312c16[_0x397aeb(0x140)](_0x18032f),this['y']=_0x5cfa28[_0x397aeb(0x140)](_0x27830e);}}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x9df138,_0x346ea4,tier)),SceneManager[_0x48b5c9(0xef)]();}else tier=Math[_0x48b5c9(0xfe)](_0x346ea4,tier);}}VisuMZ[_0x48b5c9(0x142)](VisuMZ[label][_0x48b5c9(0x132)],_0x5b71fd['parameters']);})(pluginData),ConfigManager[_0xc1ad1(0x170)]=!![],VisuMZ[_0xc1ad1(0x110)]['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0xc1ad1(0x106)]=function(){const _0x5b6339=_0xc1ad1,_0x3fabb6=VisuMZ['ActSeqCamera'][_0x5b6339(0x131)][_0x5b6339(0x16f)](this);return _0x3fabb6[_0x5b6339(0x170)]=this['battleCamera'],_0x3fabb6;},VisuMZ[_0xc1ad1(0x110)][_0xc1ad1(0x10d)]=ConfigManager[_0xc1ad1(0x129)],ConfigManager[_0xc1ad1(0x129)]=function(_0x42c0be){const _0x1c180a=_0xc1ad1;VisuMZ[_0x1c180a(0x110)][_0x1c180a(0x10d)][_0x1c180a(0x16f)](this,_0x42c0be),_0x1c180a(0x170)in _0x42c0be?this[_0x1c180a(0x170)]=_0x42c0be['battleCamera']:this[_0x1c180a(0x170)]=!![];},TextManager[_0xc1ad1(0xd6)]=VisuMZ[_0xc1ad1(0x110)]['Settings']['Options']['OptionsName'],VisuMZ[_0xc1ad1(0x110)]['BattleManager_setup']=BattleManager[_0xc1ad1(0x114)],BattleManager[_0xc1ad1(0x114)]=function(_0xdb9522,_0x36d948,_0x14e6cf){const _0x53baa2=_0xc1ad1;VisuMZ[_0x53baa2(0x110)][_0x53baa2(0x112)][_0x53baa2(0x16f)](this,_0xdb9522,_0x36d948,_0x14e6cf),this[_0x53baa2(0xde)]();},BattleManager[_0xc1ad1(0xde)]=function(){const _0x2d2427=_0xc1ad1;this[_0x2d2427(0x127)]=[];},BattleManager[_0xc1ad1(0x126)]=function(){const _0x3a12c5=_0xc1ad1;if(this[_0x3a12c5(0x127)]===undefined)this['clearCameraFocusTargets']();return this[_0x3a12c5(0x127)];},BattleManager[_0xc1ad1(0x12f)]=function(_0x5507df){const _0x42b096=_0xc1ad1;this[_0x42b096(0x127)]=_0x5507df[_0x42b096(0x141)]((_0xb3f110,_0x195177,_0x1b320b)=>_0x1b320b[_0x42b096(0x12a)](_0xb3f110)===_0x195177);},BattleManager[_0xc1ad1(0xf3)]=function(){const _0x15077e=_0xc1ad1,_0x1399a7=this[_0x15077e(0x126)]();if(_0x1399a7[_0x15077e(0x163)]<=0x0)return Math[_0x15077e(0x140)](Graphics[_0x15077e(0x100)]/0x2);let _0x186bb6=_0x1399a7[_0x15077e(0x156)]((_0x314eb0,_0x39f20b)=>_0x314eb0+=_0x39f20b[_0x15077e(0x124)]()['x'],0x0)/_0x1399a7[_0x15077e(0x163)];return _0x186bb6+=Math['round']((Graphics[_0x15077e(0x100)]-Graphics[_0x15077e(0xee)])/0x2),_0x186bb6;},BattleManager[_0xc1ad1(0x108)]=function(){const _0x23c912=_0xc1ad1,_0x1008b2=this[_0x23c912(0x126)]();if(_0x1008b2[_0x23c912(0x163)]<=0x0)return Math[_0x23c912(0x140)](Graphics['height']/0x2);let _0x5c875d=_0x1008b2[_0x23c912(0x156)]((_0x264f6a,_0x526b6b)=>_0x264f6a+=_0x526b6b[_0x23c912(0x124)]()['y']-Math['round'](_0x526b6b[_0x23c912(0x124)]()[_0x23c912(0x109)]/0x2),0x0)/_0x1008b2[_0x23c912(0x163)];return _0x5c875d+=Math['round']((Graphics[_0x23c912(0x109)]-Graphics[_0x23c912(0x10f)])/0x2),_0x5c875d;},VisuMZ[_0xc1ad1(0x110)][_0xc1ad1(0x11b)]=Game_Screen['prototype'][_0xc1ad1(0x178)],Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0x178)]=function(){const _0x9f747b=_0xc1ad1;VisuMZ[_0x9f747b(0x110)][_0x9f747b(0x11b)][_0x9f747b(0x16f)](this),this[_0x9f747b(0xe9)]();},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0xe9)]=function(){const _0x2eb155=_0xc1ad1;this['_battleCamera']=this[_0x2eb155(0x11e)]();},Game_Screen[_0xc1ad1(0x15d)]['initialBattleCameraSettings']=function(){const _0x44bf50=_0xc1ad1,_0x268744=$dataSystem['advanced'][_0x44bf50(0x153)],_0x449e27=$dataSystem[_0x44bf50(0x117)]['screenHeight'];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x44bf50(0xfa),'cameraFocusTarget':![],'cameraX':Math[_0x44bf50(0x140)](_0x268744/0x2),'cameraY':Math[_0x44bf50(0x140)](_0x449e27/0x2),'cameraXTarget':Math['round'](_0x268744/0x2),'cameraYTarget':Math[_0x44bf50(0x140)](_0x449e27/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x44bf50(0xfa),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':_0x44bf50(0xfa),'skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':_0x44bf50(0xfa),'zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':'InOutSine'};},Game_Screen['prototype'][_0xc1ad1(0xdf)]=function(){const _0x1dda35=_0xc1ad1;if(this[_0x1dda35(0xe4)]===undefined)this['clearBattleCamera']();if(!ConfigManager[_0x1dda35(0x170)])return this[_0x1dda35(0x11e)]();return this[_0x1dda35(0xe4)];},VisuMZ['ActSeqCamera'][_0xc1ad1(0x107)]=Game_Screen[_0xc1ad1(0x15d)]['update'],Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0x164)]=function(){const _0x2f4b46=_0xc1ad1;VisuMZ['ActSeqCamera'][_0x2f4b46(0x107)]['call'](this),this['updateBattleAngle'](),this['updateBattleCamera'](),this['updateBattleCameraOffset'](),this['updateBattleSkew'](),this[_0x2f4b46(0x12e)]();},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0x13e)]=function(_0x21d89a,_0x5e8009,_0xe63227){const _0x2be892=_0xc1ad1,_0x5d30d6=this['battleCameraData']();_0x5d30d6[_0x2be892(0x115)]=-_0x21d89a,_0x5d30d6[_0x2be892(0x174)]=_0x5e8009,_0x5d30d6[_0x2be892(0xe5)]=_0x5e8009,_0x5d30d6['angleEasing']=_0xe63227;},Game_Screen['prototype']['updateBattleAngle']=function(){const _0xe30b10=_0xc1ad1;if(!SceneManager[_0xe30b10(0x135)]())return;const _0x2161d4=this[_0xe30b10(0xdf)](),_0x3e6619=_0x2161d4[_0xe30b10(0x174)],_0xafb1d8=_0x2161d4[_0xe30b10(0xe5)],_0x4b3263=_0x2161d4[_0xe30b10(0x130)];if(_0x3e6619>0x0)_0x2161d4[_0xe30b10(0xe1)]=this[_0xe30b10(0x111)](_0x2161d4['angle'],_0x2161d4[_0xe30b10(0x115)],_0x3e6619,_0xafb1d8,_0x4b3263),_0x2161d4[_0xe30b10(0x174)]--;else{if(_0xe30b10(0x122)===_0xe30b10(0x161)){function _0x4f900a(){const _0x56350a=_0xe30b10;this[_0x56350a(0x16e)]();}}else _0x2161d4[_0xe30b10(0xe1)]=_0x2161d4[_0xe30b10(0x115)];}},Game_Screen['prototype'][_0xc1ad1(0x14c)]=function(_0x5752f0,_0x312772,_0x86e40b,_0x22fa50){const _0x47c159=_0xc1ad1,_0x1c93c4=this['battleCameraData']();_0x1c93c4[_0x47c159(0x165)]=![],_0x1c93c4[_0x47c159(0xfc)]=Math[_0x47c159(0x140)](_0x5752f0),_0x1c93c4[_0x47c159(0xfd)]=Math[_0x47c159(0x140)](_0x312772),_0x1c93c4[_0x47c159(0xeb)]=_0x86e40b,_0x1c93c4[_0x47c159(0xf6)]=_0x86e40b,_0x1c93c4[_0x47c159(0x119)]=_0x22fa50;},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0xff)]=function(_0x5ecdee,_0x585a4a,_0x3fceee){const _0x59c17f=_0xc1ad1;if(_0x5ecdee[_0x59c17f(0x163)]<=0x0)return;const _0x319b31=this[_0x59c17f(0xdf)]();_0x319b31[_0x59c17f(0x165)]=!![],BattleManager[_0x59c17f(0x12f)](_0x5ecdee),_0x319b31[_0x59c17f(0xeb)]=_0x585a4a,_0x319b31[_0x59c17f(0xf6)]=_0x585a4a,_0x319b31['cameraEasing']=_0x3fceee;},Game_Screen[_0xc1ad1(0x15d)]['updateBattleCamera']=function(){const _0x2148a0=_0xc1ad1;if(!SceneManager['isSceneBattle']())return;const _0x5d9cce=this[_0x2148a0(0xdf)](),_0x315cc5=_0x5d9cce[_0x2148a0(0xeb)],_0x15b5e5=_0x5d9cce[_0x2148a0(0xf6)],_0x2dc145=_0x5d9cce[_0x2148a0(0x119)];if(_0x5d9cce['cameraFocusTarget']){if('jPMIT'==='jPMIT')_0x5d9cce['cameraXTarget']=BattleManager[_0x2148a0(0xf3)](),_0x5d9cce[_0x2148a0(0xfd)]=BattleManager[_0x2148a0(0x108)]();else{function _0x1753d0(){const _0x3f5a0f=_0x2148a0;_0x486f8c['ActSeqCamera'][_0x3f5a0f(0x10d)][_0x3f5a0f(0x16f)](this,_0x587f70),_0x3f5a0f(0x170)in _0x3d4008?this['battleCamera']=_0x3e0695[_0x3f5a0f(0x170)]:this[_0x3f5a0f(0x170)]=!![];}}}_0x315cc5>0x0?(_0x5d9cce[_0x2148a0(0x155)]=this[_0x2148a0(0x111)](_0x5d9cce[_0x2148a0(0x155)],_0x5d9cce[_0x2148a0(0xfc)],_0x315cc5,_0x15b5e5,_0x2dc145),_0x5d9cce[_0x2148a0(0x133)]=this['applyEasing'](_0x5d9cce['cameraY'],_0x5d9cce[_0x2148a0(0xfd)],_0x315cc5,_0x15b5e5,_0x2dc145),_0x5d9cce[_0x2148a0(0xeb)]--):(_0x5d9cce[_0x2148a0(0x155)]=_0x5d9cce['cameraXTarget'],_0x5d9cce[_0x2148a0(0x133)]=_0x5d9cce[_0x2148a0(0xfd)]);},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0x147)]=function(_0x33e922,_0x2cbb1e,_0x195f2a,_0x8d9239){const _0x33de27=_0xc1ad1,_0x370244=this['battleCameraData']();_0x370244[_0x33de27(0x154)]=Math[_0x33de27(0x140)](_0x33e922),_0x370244['cameraOffsetYTarget']=Math[_0x33de27(0x140)](_0x2cbb1e),_0x370244[_0x33de27(0x105)]=_0x195f2a,_0x370244['cameraOffsetDurationWhole']=_0x195f2a,_0x370244[_0x33de27(0x13a)]=_0x8d9239;},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0xd2)]=function(){const _0x5cbd67=_0xc1ad1;if(!SceneManager[_0x5cbd67(0x135)]())return;const _0x1bec40=this[_0x5cbd67(0xdf)](),_0x3e1c56=_0x1bec40[_0x5cbd67(0x105)],_0x5566c3=_0x1bec40[_0x5cbd67(0x10c)],_0x11290d=_0x1bec40['cameraOffsetEasing'];if(_0x3e1c56>0x0){if('ihHDV'===_0x5cbd67(0x143)){function _0x471b43(){const _0xe901f0=_0x5cbd67;_0x31c336[_0xe901f0(0x110)][_0xe901f0(0x125)]['call'](this),this[_0xe901f0(0x148)]=_0xcf157e,this[_0xe901f0(0x12b)]=_0xda5a6a;}}else _0x1bec40[_0x5cbd67(0x14d)]=this[_0x5cbd67(0x111)](_0x1bec40['cameraOffsetX'],_0x1bec40[_0x5cbd67(0x154)],_0x3e1c56,_0x5566c3,_0x11290d),_0x1bec40[_0x5cbd67(0x173)]=this['applyEasing'](_0x1bec40[_0x5cbd67(0x173)],_0x1bec40[_0x5cbd67(0xda)],_0x3e1c56,_0x5566c3,_0x11290d),_0x1bec40[_0x5cbd67(0x105)]--;}else _0x1bec40['cameraOffsetX']=_0x1bec40[_0x5cbd67(0x154)],_0x1bec40[_0x5cbd67(0x173)]=_0x1bec40[_0x5cbd67(0xda)];},Game_Screen['prototype'][_0xc1ad1(0x16d)]=function(_0x3008df,_0x25ae6a,_0x2fd9b3,_0x2aa3e7){const _0x5d6ea4=_0xc1ad1,_0x1493d3=this[_0x5d6ea4(0xdf)]();_0x1493d3[_0x5d6ea4(0x13c)]=_0x3008df,_0x1493d3[_0x5d6ea4(0x15f)]=_0x25ae6a,_0x1493d3['skewDuration']=_0x2fd9b3,_0x1493d3[_0x5d6ea4(0x144)]=_0x2fd9b3,_0x1493d3[_0x5d6ea4(0x10b)]=_0x2aa3e7;},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0x13f)]=function(){const _0x2b0a5a=_0xc1ad1;if(!SceneManager[_0x2b0a5a(0x135)]())return;const _0x2bd1b2=this[_0x2b0a5a(0xdf)](),_0x511886=_0x2bd1b2[_0x2b0a5a(0xd9)],_0x52a5ca=_0x2bd1b2[_0x2b0a5a(0x144)],_0x5bb804=_0x2bd1b2[_0x2b0a5a(0x10b)];_0x511886>0x0?(_0x2bd1b2[_0x2b0a5a(0x151)]=this['applyEasing'](_0x2bd1b2[_0x2b0a5a(0x151)],_0x2bd1b2[_0x2b0a5a(0x13c)],_0x511886,_0x52a5ca,_0x5bb804),_0x2bd1b2[_0x2b0a5a(0x152)]=this['applyEasing'](_0x2bd1b2[_0x2b0a5a(0x152)],_0x2bd1b2[_0x2b0a5a(0x15f)],_0x511886,_0x52a5ca,_0x5bb804),_0x2bd1b2['skewDuration']--):(_0x2bd1b2[_0x2b0a5a(0x151)]=_0x2bd1b2[_0x2b0a5a(0x13c)],_0x2bd1b2[_0x2b0a5a(0x152)]=_0x2bd1b2[_0x2b0a5a(0x15f)]);},Game_Screen[_0xc1ad1(0x15d)][_0xc1ad1(0xec)]=function(_0xb9357f,_0x123522,_0x44780a){const _0x23cc8=_0xc1ad1,_0x11bf74=this['battleCameraData']();_0x11bf74[_0x23cc8(0x134)]=_0xb9357f,_0x11bf74[_0x23cc8(0x150)]=_0x123522,_0x11bf74[_0x23cc8(0xf5)]=_0x123522,_0x11bf74[_0x23cc8(0xdc)]=_0x44780a;},Game_Screen[_0xc1ad1(0x15d)]['updateBattleZoom']=function(){const _0x301318=_0xc1ad1;if(!SceneManager[_0x301318(0x135)]())return;const _0x2fffba=this[_0x301318(0xdf)](),_0x3b4918=_0x2fffba[_0x301318(0x150)],_0x2b9c8d=_0x2fffba[_0x301318(0xf5)],_0x3adb1e=_0x2fffba[_0x301318(0xdc)];if(_0x3b4918>0x0)_0x2fffba[_0x301318(0x10a)]=this['applyEasing'](_0x2fffba[_0x301318(0x10a)],_0x2fffba['zoomScaleTarget'],_0x3b4918,_0x2b9c8d,_0x3adb1e),_0x2fffba['zoomDuration']--;else{if(_0x301318(0x136)===_0x301318(0xd7)){function _0x3d58d1(){const _0x1acd1b=_0x301318,_0xbd50a1=-_0x3cf213[_0x1acd1b(0x100)]*_0xe6c418+_0x5320e8[_0x1acd1b(0x100)]/0x2,_0x2efe6d=-_0xdab010[_0x1acd1b(0x109)]*_0x1c7781+_0x252126[_0x1acd1b(0x109)]/0x2;this['x']=_0x4b1512[_0x1acd1b(0x140)](_0x7e3181['clamp'](_0xbd50a1,0x0)),this['y']=_0x33383a[_0x1acd1b(0x140)](_0x1bb762['clamp'](_0x2efe6d,0x0));}}else _0x2fffba[_0x301318(0x10a)]=_0x2fffba[_0x301318(0x134)];}},Game_Screen['prototype'][_0xc1ad1(0x111)]=function(_0x1fbe53,_0x39832c,_0x139d27,_0x3aa7bc,_0x31cd91){const _0x307a04=_0xc1ad1,_0x4bcf8d=VisuMZ[_0x307a04(0xf1)]((_0x3aa7bc-_0x139d27)/_0x3aa7bc,_0x31cd91||'Linear'),_0x30dda5=VisuMZ['ApplyEasing']((_0x3aa7bc-_0x139d27+0x1)/_0x3aa7bc,_0x31cd91||'Linear'),_0xad4e48=(_0x1fbe53-_0x39832c*_0x4bcf8d)/(0x1-_0x4bcf8d);return _0xad4e48+(_0x39832c-_0xad4e48)*_0x30dda5;},VisuMZ['ActSeqCamera']['Scene_Options_maxCommands']=Scene_Options['prototype'][_0xc1ad1(0x14a)],Scene_Options['prototype'][_0xc1ad1(0x14a)]=function(){const _0x1f8cf5=_0xc1ad1;let _0x191ac8=VisuMZ[_0x1f8cf5(0x110)]['Scene_Options_maxCommands']['call'](this);const _0x25a591=VisuMZ['ActSeqCamera'][_0x1f8cf5(0x132)];if(_0x25a591[_0x1f8cf5(0x177)][_0x1f8cf5(0x169)]&&_0x25a591['Options']['AdjustRect'])_0x191ac8++;return _0x191ac8;},VisuMZ[_0xc1ad1(0x110)][_0xc1ad1(0x12d)]=Sprite_Battler[_0xc1ad1(0x15d)][_0xc1ad1(0x15a)],Sprite_Battler[_0xc1ad1(0x15d)][_0xc1ad1(0x15a)]=function(){const _0x5b5e8e=_0xc1ad1;let _0x50f80d=VisuMZ[_0x5b5e8e(0x110)][_0x5b5e8e(0x12d)][_0x5b5e8e(0x16f)](this);return _0x50f80d+=Math[_0x5b5e8e(0x140)]((Graphics[_0x5b5e8e(0x100)]-Graphics[_0x5b5e8e(0xee)])/0x2),_0x50f80d;},VisuMZ[_0xc1ad1(0x110)][_0xc1ad1(0xf0)]=Sprite_Battler[_0xc1ad1(0x15d)]['damageOffsetY'],Sprite_Battler['prototype'][_0xc1ad1(0xea)]=function(){const _0x2f0bb4=_0xc1ad1;let _0x3e5000=VisuMZ[_0x2f0bb4(0x110)]['Sprite_Battler_damageOffsetY']['call'](this);return _0x3e5000+=Math[_0x2f0bb4(0x140)]((Graphics[_0x2f0bb4(0x109)]-Graphics[_0x2f0bb4(0x10f)])/0x2),_0x3e5000;},VisuMZ[_0xc1ad1(0x110)][_0xc1ad1(0x125)]=Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x138)],Spriteset_Battle[_0xc1ad1(0x15d)]['initialize']=function(){const _0x1e7a3e=_0xc1ad1;VisuMZ['ActSeqCamera'][_0x1e7a3e(0x125)]['call'](this),this['_cacheScaleX']=undefined,this[_0x1e7a3e(0x12b)]=undefined;},VisuMZ['ActSeqCamera'][_0xc1ad1(0xdd)]=Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x120)],Spriteset_Battle['prototype'][_0xc1ad1(0x120)]=function(){const _0x5215c6=_0xc1ad1;VisuMZ[_0x5215c6(0x110)][_0x5215c6(0xdd)][_0x5215c6(0x16f)](this),this[_0x5215c6(0xf7)]();},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0xf7)]=function(){const _0x3f73dd=_0xc1ad1;if(Spriteset_Battle[_0x3f73dd(0xe3)])return;const _0x393944=-Math[_0x3f73dd(0x103)](Graphics[_0x3f73dd(0x100)]/0x2),_0x5c78c3=-Math[_0x3f73dd(0x103)](Graphics[_0x3f73dd(0x109)]/0x2);this[_0x3f73dd(0xf8)]['x']=0.5,this['anchor']['y']=0.5;const _0x3dbc4c=[this[_0x3f73dd(0x16b)],this[_0x3f73dd(0x14b)]];for(const _0x229d96 of _0x3dbc4c){if('NMMaZ'===_0x3f73dd(0xe6)){function _0x258e6a(){const _0x61a430=_0x3f73dd;_0x8b2687['_oldCamera']?this[_0x61a430(0x16e)]():this[_0x61a430(0x16a)]();}}else{if(!_0x229d96)continue;_0x229d96['x']=_0x393944,_0x229d96['y']=_0x5c78c3;}}},Spriteset_Battle['prototype'][_0xc1ad1(0xf4)]=function(){const _0x6093df=_0xc1ad1;this[_0x6093df(0x14e)](),this[_0x6093df(0xd4)](),this[_0x6093df(0xf2)](),this[_0x6093df(0x146)](),this[_0x6093df(0x158)]();},Spriteset_Battle['prototype']['updatePositionAngle']=function(){const _0x4db371=_0xc1ad1,_0x5a5a32=this['getBattleAngle']();this[_0x4db371(0xe1)]=_0x5a5a32;},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x175)]=function(){const _0x289aef=_0xc1ad1;if(!ConfigManager[_0x289aef(0x170)])return 0x0;if(BattleManager['isInputting']())return 0x0;return $gameScreen['battleCameraData']()[_0x289aef(0xe1)];},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0xd4)]=function(){const _0x5bf899=_0xc1ad1;if(BattleManager[_0x5bf899(0xd5)]()||!ConfigManager[_0x5bf899(0x170)])this[_0x5bf899(0x176)]['x']=0x0,this[_0x5bf899(0x176)]['y']=0x0;else{const _0x531a03=$gameScreen[_0x5bf899(0xdf)]();this[_0x5bf899(0x176)]['x']=_0x531a03['skewX'],this['skew']['y']=_0x531a03[_0x5bf899(0x152)];}},Spriteset_Battle['prototype'][_0xc1ad1(0xf2)]=function(){const _0x167e74=_0xc1ad1,_0x44c5a3=this['getBattleZoom']();this[_0x167e74(0x15c)]['x']=this[_0x167e74(0x15c)]['y']=_0x44c5a3;},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x167)]=function(){const _0xdf807b=_0xc1ad1;if(!ConfigManager[_0xdf807b(0x170)])return 0x1;if(BattleManager['isInputting']())return 0x1;return $gameScreen[_0xdf807b(0xdf)]()[_0xdf807b(0x10a)];},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x146)]=function(){const _0x1e0c67=_0xc1ad1;if(BattleManager[_0x1e0c67(0xd5)]()||!ConfigManager[_0x1e0c67(0x170)]){if(_0x1e0c67(0x13b)===_0x1e0c67(0x171)){function _0x5e83b6(){const _0x428e37=_0x1e0c67,_0x57bf5f=_0x28c34a[_0x428e37(0xdf)]();let _0x1a71e9=this[_0x428e37(0x145)](),_0x26b470=this[_0x428e37(0x167)](),_0x4ece9e=-(_0x57bf5f['cameraX']+_0x57bf5f[_0x428e37(0x14d)])+_0x5ba298[_0x428e37(0x100)];_0x4ece9e-=(0x1-_0x26b470)*(_0x459a73[_0x428e37(0x100)]/0x2-_0x57bf5f[_0x428e37(0x155)]-_0x57bf5f[_0x428e37(0x14d)]);let _0xb9ed92=-(_0x57bf5f[_0x428e37(0x133)]+_0x57bf5f[_0x428e37(0x173)])+_0x1b918d['height'];if(_0x1a71e9){if(_0x26b470>=0x1){const _0x250d8f=_0x43ed72[_0x428e37(0x100)]-_0x2f8240[_0x428e37(0x100)]/0x2*_0x26b470,_0x3dba4b=_0x6912ad[_0x428e37(0x100)]/0x2*_0x26b470;_0x4ece9e=_0x4ece9e[_0x428e37(0x16c)](_0x250d8f,_0x3dba4b);const _0x3bc922=_0x3417fa[_0x428e37(0x109)]-_0x289241['height']/0x2*_0x26b470,_0x23b651=_0x4ace55[_0x428e37(0x109)]/0x2*_0x26b470;_0xb9ed92=_0xb9ed92[_0x428e37(0x16c)](_0x3bc922,_0x23b651);}else _0x26b470<0x1&&(_0x4ece9e=_0x274867[_0x428e37(0x100)]/0x2,_0xb9ed92=_0x4c9213['height']/0x2);}this['x']=_0x44163c[_0x428e37(0x140)](_0x4ece9e),this['y']=_0x1ce81f[_0x428e37(0x140)](_0xb9ed92);}}else this[_0x1e0c67(0x15e)]();}else{if(_0x1e0c67(0x128)!==_0x1e0c67(0x128)){function _0x234cb4(){const _0x571b59=_0x1e0c67;if(!_0x4485ee[_0x571b59(0x170)])return!![];if(_0x14c823[_0x571b59(0xd5)]())return!![];return _0xc141fc['battleCameraData']()[_0x571b59(0xed)];}}else Spriteset_Battle[_0x1e0c67(0xe3)]?this['updatePositionCameraRoamOld']():this['updatePositionCameraRoamNew']();}},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x15e)]=function(){const _0x408102=_0xc1ad1;if(Spriteset_Battle['_oldCamera'])return;this['x']=Math[_0x408102(0x103)](Graphics['width']/0x2),this['y']=Math['ceil'](Graphics['height']/0x2);},Spriteset_Battle[_0xc1ad1(0x15d)][_0xc1ad1(0x16e)]=function(){const _0x4c0212=_0xc1ad1,_0x59ea89=$gameScreen[_0x4c0212(0xdf)](),_0x484718=this[_0x4c0212(0x145)](),_0x247851=this[_0x4c0212(0x167)]();let _0x2377ca=-(_0x59ea89[_0x4c0212(0x155)]+_0x59ea89[_0x4c0212(0x14d)])*_0x247851+Graphics[_0x4c0212(0x100)]/0x2,_0x3dd35e=-(_0x59ea89['cameraY']+_0x59ea89[_0x4c0212(0x173)])*_0x247851+Graphics[_0x4c0212(0x109)]/0x2;if(_0x484718&&_0x247851>=0x1){const _0x4f9b99=-Graphics[_0x4c0212(0x100)]*_0x247851+Graphics[_0x4c0212(0x100)]/0x2,_0x42e98a=-Graphics[_0x4c0212(0x109)]*_0x247851+Graphics[_0x4c0212(0x109)]/0x2;this['x']=Math[_0x4c0212(0x140)](_0x2377ca[_0x4c0212(0x16c)](_0x4f9b99,0x0)),this['y']=Math[_0x4c0212(0x140)](_0x3dd35e[_0x4c0212(0x16c)](_0x42e98a,0x0));}else _0x484718&&_0x247851<0x1?(this['x']=Math[_0x4c0212(0x140)]((Graphics[_0x4c0212(0x100)]-Graphics[_0x4c0212(0x100)]*_0x247851)/0x2),this['y']=Math[_0x4c0212(0x140)]((Graphics[_0x4c0212(0x109)]-Graphics[_0x4c0212(0x109)]*_0x247851)/0x2)):(this['x']=Math[_0x4c0212(0x140)](_0x2377ca),this['y']=Math[_0x4c0212(0x140)](_0x3dd35e));},Spriteset_Battle['_oldCamera']=![],Spriteset_Battle['prototype'][_0xc1ad1(0x16a)]=function(){const _0x59518a=_0xc1ad1,_0x4af427=$gameScreen[_0x59518a(0xdf)]();let _0x12976c=this[_0x59518a(0x145)](),_0x3c3af8=this['getBattleZoom'](),_0x5ab5c2=-(_0x4af427[_0x59518a(0x155)]+_0x4af427[_0x59518a(0x14d)])+Graphics['width'];_0x5ab5c2-=(0x1-_0x3c3af8)*(Graphics[_0x59518a(0x100)]/0x2-_0x4af427[_0x59518a(0x155)]-_0x4af427[_0x59518a(0x14d)]);let _0x23eafa=-(_0x4af427['cameraY']+_0x4af427[_0x59518a(0x173)])+Graphics[_0x59518a(0x109)];if(_0x12976c){if('JnKxi'!==_0x59518a(0x104)){if(_0x3c3af8>=0x1){const _0x5b4c34=Graphics[_0x59518a(0x100)]-Graphics['width']/0x2*_0x3c3af8,_0x3588d0=Graphics['width']/0x2*_0x3c3af8;_0x5ab5c2=_0x5ab5c2[_0x59518a(0x16c)](_0x5b4c34,_0x3588d0);const _0xc2ae13=Graphics[_0x59518a(0x109)]-Graphics[_0x59518a(0x109)]/0x2*_0x3c3af8,_0x400986=Graphics[_0x59518a(0x109)]/0x2*_0x3c3af8;_0x23eafa=_0x23eafa[_0x59518a(0x16c)](_0xc2ae13,_0x400986);}else _0x3c3af8<0x1&&(_0x5ab5c2=Graphics[_0x59518a(0x100)]/0x2,_0x23eafa=Graphics[_0x59518a(0x109)]/0x2);}else{function _0x514632(){const _0x1451d7=_0x59518a;_0x5a7264[_0x1451d7(0x155)]=_0x385695[_0x1451d7(0xfc)],_0x59a78c[_0x1451d7(0x133)]=_0x47abab['cameraYTarget'];}}}this['x']=Math[_0x59518a(0x140)](_0x5ab5c2),this['y']=Math[_0x59518a(0x140)](_0x23eafa);},Spriteset_Battle[_0xc1ad1(0x15d)]['getBattleCameraClamp']=function(){const _0x4c48ca=_0xc1ad1;if(!ConfigManager[_0x4c48ca(0x170)])return!![];if(BattleManager[_0x4c48ca(0xd5)]())return!![];return $gameScreen['battleCameraData']()[_0x4c48ca(0xed)];},Spriteset_Battle['prototype'][_0xc1ad1(0x158)]=function(){const _0x26c32a=_0xc1ad1;this['x']+=Math[_0x26c32a(0x140)]($gameScreen[_0x26c32a(0x160)]());if(Imported[_0x26c32a(0x15b)]&&this['updatePositionCoreEngine']){if(_0x26c32a(0xfb)==='EoIVE'){function _0xf15311(){const _0x470534=_0x26c32a;this['x']+=_0x5da27d['round'](_0x1945ed[_0x470534(0x160)]()),_0x157610[_0x470534(0x15b)]&&this['updatePositionCoreEngine']&&this['updatePositionCoreEngine']();}}else this[_0x26c32a(0x11a)]();}},VisuMZ['ActSeqCamera'][_0xc1ad1(0xd8)]=Window_Options['prototype'][_0xc1ad1(0x113)],Window_Options[_0xc1ad1(0x15d)]['addGeneralOptions']=function(){const _0x54d598=_0xc1ad1;VisuMZ[_0x54d598(0x110)][_0x54d598(0xd8)][_0x54d598(0x16f)](this),this[_0x54d598(0xe7)]();},Window_Options[_0xc1ad1(0x15d)][_0xc1ad1(0xe7)]=function(){const _0x5a6389=_0xc1ad1;VisuMZ['ActSeqCamera'][_0x5a6389(0x132)]['Options'][_0x5a6389(0x169)]&&this['addBattleCameraCommand']();},Window_Options['prototype'][_0xc1ad1(0xe0)]=function(){const _0x182d22=_0xc1ad1,_0x3f89c8=TextManager[_0x182d22(0xd6)],_0x30bbac=_0x182d22(0x170);this['addCommand'](_0x3f89c8,_0x30bbac);};