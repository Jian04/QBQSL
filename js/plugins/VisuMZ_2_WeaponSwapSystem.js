//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
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
 * * VisuMZ_1_ItemsEquipsCore
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
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
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
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
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
 * @param WeaponSwapSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

const _0x648b=['_slotId','exit','IdExm','alterAttackCommand','Window_StatusBase_actorSlotName','BattleTestAllWeapons','Window_EquipItem_initialize','WEAPON_SWAP_SHOW_COMMAND','width','STRUCT','replace','_itemWindow','_statusWindow','LGErD','366008guOInD','HdcBi','_currentweapontype','Game_Actor_initEquips','attackSkillId','equipSlots','isClearEquipOk','_actor','unBCn','requiredWtypeId2','filter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SwapShortcut','changeEquip','STR','activate','isWeaponSwapShortcutEnabled','_wtypeID','nAcZM','XYAec','_firstOfEachWeaponType','cursorRight','ZPrza','gVqeX','Window_ActorCommand_addAttackCommand','Window_EquipItem_isEnabled','updateArrows','TEHsh','gvERg','isEnabledWeaponSwap','callUpdateHelp','map','createActorCommandWindow','trim','_cache','subject','RequireAnyWpn','setSlotId','itemAt','getAllEquippedSwapWeapons','WEAPON_SWAP_SHORTCUT_ENABLE','swapWeaponHelp','getSwapWeapon','performWeaponSwap','WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS','call','battleCommandName','_list','etypeId','setSwapWeapon','Window_EquipItem_setSlotId','Window_ActorCommand_initialize','isActor','Game_Actor_optimizeEquipments','kpzIG','weaponTypes','round','createWeaponSwapTypes','parent','refresh','pkipB','_checkingWeaponSwaps','lineHeight','bitmap','status','log','indexOf','findSymbol','AUtAc','itemRect','jHqCx','Window_ActorCommand','IEvCE','updateWeaponSwapShortcutSprites','DcERP','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','FyuVy','performAttack','applyGlobal','WeaponSwapSystem','KumYY','nZXHu','hHqxY','McwaP','UIGBi','aCXtA','_scene','equipSlotIndex','PUOmK','BARE\x20HANDS','MgzIH','1912123bFSyIp','requiredWtypeId1','includes','name','Switch\x20out\x20the\x20current\x20weapon.','_wtypeIDs','ChangeAttackIcon','LaRca','Game_Actor_changeEquip','weapons','VisuMZ_1_BattleCore','releaseUnequippableItems','isDualWield','wtypeId','opacity','constructor','_weaponSwapShortcutSprite_Right','commandStyle','createWeaponSwapShortcutSprites','remove','addChild','executeEquipChange','swapWeaponNext','\x5cI[%1]%2','prototype','Window','actor','initWeaponSwapSystem','Game_Actor_releaseUnequippableItems','visible','Game_Battler_requestMotionRefresh','playEquip','WEAPON_SWAP_SHORTCUT_ARROWS','isEnabled','MISSING\x20WEAPON\x20TYPE:\x20%1','VisuMZ_1_ItemsEquipsCore','hnqyR','setupBattleTestMembers','itemAtWeaponSwap','changeWeapon','max','tVlmI','avcHz','Window_EquipSlot_isEnabled','Game_BattlerBase_meetsSkillConditions','parse','padding','_swappingWeapon','actorSlotNameWeaponSwap','17hiWYfG','Game_Actor_isOptimizeEquipOk','isSkillWtypeOk','nonRemovableEtypes','updateShortcutOpacity','tradeItemWithParty','currentSymbol','_tempActor','_swapWeapons','processShiftRemoveShortcut','Window_EquipSlot_equipSlotIndex','jQwtb','MbZki','setObject','swapWeaponIcon','Game_Action_applyGlobal','Sprite_Actor_refreshMotion','Bfdxi','format','Window_EquipSlot_itemAt','_actorCommandWindow','optimizeSwappableWeapons','Game_Actor_isClearEquipOk','setHandler','Window_EquipItem_includes','text','ARRAYJSON','attack','calcEquipItemPerformance','Window_ActorCommand_updateHelp','Window_Base_playOkSound','Settings','673138MarvVE','NbERD','maxItemsWeaponSwap','setFrame','_currentWeaponType','meetsAnyWeaponEquippedCondition','push','SwapCommandIcon','anchor','4765tBXQcx','setup','addAttackCommand','kLvvV','requestMotionRefresh','mHIRf','wHGcs','RegExp','JSON','length','CPynh','weaponSwap','loadSystem','canAddSkillCommand','592817eZCLgj','meetsSkillConditions','updateHelp','QOXdI','QuGxu','37781QScYYQ','Uzhom','_inBattle','Window_ActorCommand_setup','_helpWindow','getFirstOfEachWeaponType','isEquipWtypeOk','KsBtj','setupBattleTestWeapons','ConvertParams','ARRAYNUM','toUpperCase','isOptimizeEquipOk','iconIndex','BXHQG','KajZW','splice','SwapCommandName','return\x200','cRGGj','bestEquipWeapon','removeWeaponSwapCommand','VOgyW','item','haOqV','lFZGE','cursorLeft','weaponSwapTypes','_weaponSwapShortcutSprite_Left','addWeaponSwapCommand','isWeaponSwapShortcutVisible','onWeaponSwap','swapWeaponCmd','canWeaponSwap','gbtfb','1hcMKPD','473746gbstHW','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','QbfGu','clearSwappableWeapons','IHVPC','description','playOkSound','Scene_Battle_createActorCommandWindow','applyWeaponSwapAction','XTMVj','FkYsk','actorSlotName','initEquips','Vgkpv','initialize','EVAL','match','WEAPON_SWAP_CHANGE_ATTACK_ICON','isSkill','getWtypeIdWithName','QdPkD','zUoMT','Game_Actor_clearEquipments','owifn','FUNC','Game_Actor_equipSlots','117LyuVep','Game_Party_setupBattleTestMembers','switchToWeaponType','GZDLk','clearEquipments','setText','maxItems','Window_EquipSlot_maxItems','_equips','refreshMotion','ARRAYSTR','commandWeaponSwap','ARRAYFUNC'];const _0x56b516=_0x2391;(function(_0x51b7da,_0x227657){const _0x2344f4=_0x2391;while(!![]){try{const _0x53d9c3=-parseInt(_0x2344f4(0x29b))*parseInt(_0x2344f4(0x1cb))+parseInt(_0x2344f4(0x1b1))+-parseInt(_0x2344f4(0x2ae))*parseInt(_0x2344f4(0x272))+-parseInt(_0x2344f4(0x2a9))+-parseInt(_0x2344f4(0x1e6))+parseInt(_0x2344f4(0x292))+parseInt(_0x2344f4(0x241))*parseInt(_0x2344f4(0x1b0));if(_0x53d9c3===_0x227657)break;else _0x51b7da['push'](_0x51b7da['shift']());}catch(_0x3b68c1){_0x51b7da['push'](_0x51b7da['shift']());}}}(_0x648b,0xdbd30));var label=_0x56b516(0x235),tier=tier||0x0,dependencies=[_0x56b516(0x24b),_0x56b516(0x264)],pluginData=$plugins[_0x56b516(0x1f0)](function(_0x28c1df){const _0x26d007=_0x56b516;return _0x28c1df[_0x26d007(0x226)]&&_0x28c1df[_0x26d007(0x1b6)][_0x26d007(0x243)]('['+label+']');})[0x0];function _0x2391(_0x5d5657,_0x4b82a8){return _0x2391=function(_0x648b64,_0x23915b){_0x648b64=_0x648b64-0x1a8;let _0x4bb1de=_0x648b[_0x648b64];return _0x4bb1de;},_0x2391(_0x5d5657,_0x4b82a8);}VisuMZ[label]['Settings']=VisuMZ[label][_0x56b516(0x291)]||{},VisuMZ[_0x56b516(0x2b7)]=function(_0x5113d7,_0x3723f4){const _0x45d2bb=_0x56b516;for(const _0x3774bd in _0x3723f4){if(_0x3774bd['match'](/(.*):(.*)/i)){const _0x2f793d=String(RegExp['$1']),_0x1437c6=String(RegExp['$2'])['toUpperCase']()[_0x45d2bb(0x207)]();let _0x5167fe,_0x17ec74,_0x20b625;switch(_0x1437c6){case'NUM':_0x5167fe=_0x3723f4[_0x3774bd]!==''?Number(_0x3723f4[_0x3774bd]):0x0;break;case _0x45d2bb(0x2b8):_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x4b1171=>Number(_0x4b1171));break;case _0x45d2bb(0x1c0):_0x5167fe=_0x3723f4[_0x3774bd]!==''?eval(_0x3723f4[_0x3774bd]):null;break;case'ARRAYEVAL':_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x4f3197=>eval(_0x4f3197));break;case _0x45d2bb(0x2a3):_0x5167fe=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):'';break;case _0x45d2bb(0x28c):_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x49c95e=>JSON[_0x45d2bb(0x26e)](_0x49c95e));break;case _0x45d2bb(0x1c9):_0x5167fe=_0x3723f4[_0x3774bd]!==''?new Function(JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd])):new Function(_0x45d2bb(0x2c0));break;case _0x45d2bb(0x1d7):_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x4b1142=>new Function(JSON[_0x45d2bb(0x26e)](_0x4b1142)));break;case _0x45d2bb(0x1f4):_0x5167fe=_0x3723f4[_0x3774bd]!==''?String(_0x3723f4[_0x3774bd]):'';break;case _0x45d2bb(0x1d5):_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x1ac3e3=>String(_0x1ac3e3));break;case _0x45d2bb(0x1e1):_0x20b625=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):{},_0x5167fe=VisuMZ['ConvertParams']({},_0x20b625);break;case'ARRAYSTRUCT':_0x17ec74=_0x3723f4[_0x3774bd]!==''?JSON[_0x45d2bb(0x26e)](_0x3723f4[_0x3774bd]):[],_0x5167fe=_0x17ec74[_0x45d2bb(0x205)](_0x5a8d4c=>VisuMZ['ConvertParams']({},JSON[_0x45d2bb(0x26e)](_0x5a8d4c)));break;default:continue;}_0x5113d7[_0x2f793d]=_0x5167fe;}}return _0x5113d7;},(_0x2833f7=>{const _0x4b4c28=_0x56b516,_0x84479=_0x2833f7[_0x4b4c28(0x244)];for(const _0x5962fa of dependencies){if('phGRs'!=='phGRs'){const _0x58d7ec=_0x20e384[_0x4b4c28(0x1a8)]()[_0x583e69];_0x11184a=_0x5b15cd[_0x4b4c28(0x21d)][_0x58d7ec]||'';}else{if(!Imported[_0x5962fa]){if(_0x4b4c28(0x1da)!==_0x4b4c28(0x1da))return this[_0x4b4c28(0x1ed)][_0x4b4c28(0x1a8)]()['includes'](_0x170404+0x1);else{alert(_0x4b4c28(0x1b2)[_0x4b4c28(0x284)](_0x84479,_0x5962fa)),SceneManager['exit']();break;}}}}const _0xa5bf7e=_0x2833f7['description'];if(_0xa5bf7e[_0x4b4c28(0x1c1)](/\[Version[ ](.*?)\]/i)){if('MgzIH'!==_0x4b4c28(0x240))return this[_0x4b4c28(0x203)](_0x467d10);else{const _0x134500=Number(RegExp['$1']);_0x134500!==VisuMZ[label]['version']&&(alert(_0x4b4c28(0x1f1)['format'](_0x84479,_0x134500)),SceneManager[_0x4b4c28(0x1d9)]());}}if(_0xa5bf7e[_0x4b4c28(0x1c1)](/\[Tier[ ](\d+)\]/i)){if('VOgyW'!==_0x4b4c28(0x2c4)){const _0x2137f2=_0x516989(_0x2cc48b['$1']);_0x2137f2<_0x420c46?(_0x327462('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4b4c28(0x284)](_0x4a4998,_0x2137f2,_0x44e26b)),_0x4a1173['exit']()):_0x3b64f1=_0x33216b[_0x4b4c28(0x269)](_0x2137f2,_0x4ffe24);}else{const _0x19a80c=Number(RegExp['$1']);if(_0x19a80c<tier){if('McwaP'!==_0x4b4c28(0x239))return _0x129c46-=_0x4b1a72,_0x5d0fc4['WeaponSwapSystem'][_0x4b4c28(0x26c)]['call'](this,_0x3f4bb9);else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x84479,_0x19a80c,tier)),SceneManager[_0x4b4c28(0x1d9)]();}else tier=Math[_0x4b4c28(0x269)](_0x19a80c,tier);}}VisuMZ[_0x4b4c28(0x2b7)](VisuMZ[label][_0x4b4c28(0x291)],_0x2833f7['parameters']);})(pluginData),VisuMZ['WeaponSwapSystem'][_0x56b516(0x2a2)]={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager[_0x56b516(0x2b3)]=function(){const _0x4402fd=_0x56b516;if(this[_0x4402fd(0x1fa)])return this[_0x4402fd(0x1fa)];this[_0x4402fd(0x1fa)]=[];for(let _0x394f72=0x1;_0x394f72<$dataSystem[_0x4402fd(0x21d)]['length'];_0x394f72++){if(_0x4402fd(0x23b)!==_0x4402fd(0x201)){const _0x4e748d=$dataWeapons[_0x4402fd(0x1f0)](_0x365086=>_0x365086&&_0x365086[_0x4402fd(0x24e)]===_0x394f72),_0x153098=_0x4e748d[0x0]||null;!_0x153098&&console[_0x4402fd(0x227)](_0x4402fd(0x263)['format']($dataSystem[_0x4402fd(0x21d)][_0x394f72][_0x4402fd(0x1e2)](/\\I\[(\d+)\]/gi,''))),this[_0x4402fd(0x1fa)][_0x4402fd(0x298)](_0x153098);}else{this['_swapWeapons']===_0x3a677e&&this[_0x4402fd(0x25c)]();_0x269dd8=_0xe4b041||0x0;if(!this['canWeaponSwap']())return;if(!this[_0x4402fd(0x2b4)](_0x559b6c))return;this['_currentWeaponType']=_0x433070,this[_0x4402fd(0x27a)][_0x4b4c97]=this['_swapWeapons'][_0x2db7fd]||0x0;const _0x5a013d=_0x5dcc45[this[_0x4402fd(0x27a)][_0x2bd7db]]||null;this[_0x4402fd(0x1d3)][0x0][_0x4402fd(0x27f)](_0x5a013d),this[_0x4402fd(0x208)]={};}}return this[_0x4402fd(0x1fa)]['remove'](null)[_0x4402fd(0x254)](undefined),this['_firstOfEachWeaponType'];},DataManager[_0x56b516(0x1c4)]=function(_0x42bcb3){const _0x2d26b1=_0x56b516;_0x42bcb3=_0x42bcb3[_0x2d26b1(0x2b9)]()['trim'](),this['_wtypeIDs']=this[_0x2d26b1(0x246)]||{};if(this[_0x2d26b1(0x246)][_0x42bcb3])return this['_wtypeIDs'][_0x42bcb3];for(let _0x42e26d=0x1;_0x42e26d<0x64;_0x42e26d++){if(!$dataSystem[_0x2d26b1(0x21d)][_0x42e26d])continue;let _0x5b3c0d=$dataSystem[_0x2d26b1(0x21d)][_0x42e26d][_0x2d26b1(0x2b9)]()[_0x2d26b1(0x207)]();_0x5b3c0d=_0x5b3c0d[_0x2d26b1(0x1e2)](/\x1I\[(\d+)\]/gi,''),_0x5b3c0d=_0x5b3c0d[_0x2d26b1(0x1e2)](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x5b3c0d]=_0x42e26d;}return this['_wtypeIDs'][_0x2d26b1(0x23f)]=0x0,this[_0x2d26b1(0x246)][_0x42bcb3]||0x0;},ImageManager[_0x56b516(0x280)]=VisuMZ['WeaponSwapSystem'][_0x56b516(0x291)]['UI'][_0x56b516(0x299)],TextManager[_0x56b516(0x1ad)]=VisuMZ[_0x56b516(0x235)][_0x56b516(0x291)]['UI'][_0x56b516(0x2bf)],TextManager[_0x56b516(0x20f)]=VisuMZ['WeaponSwapSystem'][_0x56b516(0x291)]['UI']['BattleHelpSwap']??_0x56b516(0x245),VisuMZ[_0x56b516(0x235)][_0x56b516(0x281)]=Game_Action[_0x56b516(0x259)][_0x56b516(0x234)],Game_Action[_0x56b516(0x259)][_0x56b516(0x234)]=function(){const _0x1778b2=_0x56b516;VisuMZ[_0x1778b2(0x235)][_0x1778b2(0x281)][_0x1778b2(0x213)](this),this['subject']()&&this[_0x1778b2(0x209)]()[_0x1778b2(0x21a)]()&&this[_0x1778b2(0x1c3)]()&&('CCHSS'===_0x1778b2(0x1ce)?this[_0x1778b2(0x1f6)]()?this[_0x1778b2(0x211)](![]):_0x22fffc['prototype'][_0x1778b2(0x2c8)][_0x1778b2(0x213)](this,_0x40ddff):this['subject']()[_0x1778b2(0x1b9)](this[_0x1778b2(0x2c5)]()));},VisuMZ[_0x56b516(0x235)][_0x56b516(0x26d)]=Game_BattlerBase['prototype'][_0x56b516(0x2aa)],Game_BattlerBase[_0x56b516(0x259)][_0x56b516(0x2aa)]=function(_0x377bc3){const _0x3eb6c2=_0x56b516;return VisuMZ['WeaponSwapSystem'][_0x3eb6c2(0x26d)]['call'](this,_0x377bc3)&&this[_0x3eb6c2(0x297)](_0x377bc3);},Game_BattlerBase[_0x56b516(0x259)][_0x56b516(0x297)]=function(_0x140627){return!![];},VisuMZ[_0x56b516(0x235)][_0x56b516(0x25f)]=Game_Battler[_0x56b516(0x259)][_0x56b516(0x29f)],Game_Battler[_0x56b516(0x259)][_0x56b516(0x29f)]=function(){const _0x340972=_0x56b516;if(this['battler']()&&this['_swappingWeapon'])return;else VisuMZ[_0x340972(0x235)][_0x340972(0x25f)][_0x340972(0x213)](this);},Game_Actor[_0x56b516(0x212)]=VisuMZ['WeaponSwapSystem'][_0x56b516(0x291)]['Mechanics'][_0x56b516(0x1dd)],VisuMZ['WeaponSwapSystem'][_0x56b516(0x1e9)]=Game_Actor['prototype'][_0x56b516(0x1bd)],Game_Actor[_0x56b516(0x259)][_0x56b516(0x1bd)]=function(_0x52bff0){const _0x755ba8=_0x56b516;VisuMZ[_0x755ba8(0x235)][_0x755ba8(0x1e9)][_0x755ba8(0x213)](this,_0x52bff0),this[_0x755ba8(0x25c)]();},Game_Actor[_0x56b516(0x259)][_0x56b516(0x25c)]=function(){const _0x3b70c8=_0x56b516;this[_0x3b70c8(0x27a)]={};for(let _0x1f149c=0x1;_0x1f149c<$dataSystem['weaponTypes'][_0x3b70c8(0x2a4)];_0x1f149c++){if('zKcXO'!=='zKcXO')return _0x59572b-=_0x1c5708,_0xa773a5[_0x3b70c8(0x235)][_0x3b70c8(0x1dc)][_0x3b70c8(0x213)](this,_0x261f7e,_0x4f2867);else this['_swapWeapons'][_0x1f149c]=0x0;}this[_0x3b70c8(0x296)]=0x0;for(const _0x53a4c1 of this[_0x3b70c8(0x24a)]()){if(!_0x53a4c1)continue;const _0x26dda8=_0x53a4c1['wtypeId'];this[_0x3b70c8(0x27a)][_0x26dda8]=_0x53a4c1['id'],this[_0x3b70c8(0x296)]=this['_currentWeaponType']||_0x26dda8;}},Game_Actor[_0x56b516(0x259)][_0x56b516(0x1ae)]=function(){const _0x509ef9=_0x56b516;return this[_0x509ef9(0x1eb)]()[_0x509ef9(0x243)](0x1);},VisuMZ['WeaponSwapSystem']['Game_Actor_isDualWield']=Game_Actor[_0x56b516(0x259)]['isDualWield'],Game_Actor[_0x56b516(0x259)][_0x56b516(0x24d)]=function(){return![];},VisuMZ['WeaponSwapSystem'][_0x56b516(0x1ca)]=Game_Actor[_0x56b516(0x259)][_0x56b516(0x1eb)],Game_Actor[_0x56b516(0x259)]['equipSlots']=function(){const _0x52582b=_0x56b516;let _0x294687=VisuMZ[_0x52582b(0x235)][_0x52582b(0x1ca)][_0x52582b(0x213)](this);return _0x294687[_0x52582b(0x243)](0x1)&&(_0x52582b(0x2af)==='AIjvS'?this['changeWeapon'](_0x61b834):(_0x294687[_0x52582b(0x254)](0x1),_0x294687['unshift'](0x1))),_0x294687;},Game_Actor['prototype'][_0x56b516(0x1a8)]=function(){const _0x3ab393=_0x56b516;let _0x351ca0=_0x3ab393(0x1a8);if(this['checkCacheKey'](_0x351ca0))return this[_0x3ab393(0x208)][_0x351ca0];return this[_0x3ab393(0x208)][_0x351ca0]=this[_0x3ab393(0x21f)](),this[_0x3ab393(0x208)][_0x351ca0];},Game_Actor[_0x56b516(0x259)][_0x56b516(0x21f)]=function(){const _0x425c46=_0x56b516,_0x37daa2=[],_0x44c412=$dataSystem['weaponTypes']['length'];for(let _0x28c94e=0x1;_0x28c94e<_0x44c412;_0x28c94e++){if(_0x425c46(0x1e7)===_0x425c46(0x1e7)){if(this[_0x425c46(0x2b4)](_0x28c94e))_0x37daa2[_0x425c46(0x298)](_0x28c94e);}else _0x46752a['isWeapon'](_0x1a9125)||_0x4d8fc6===0x0&&this[_0x425c46(0x1ae)]()?this[_0x425c46(0x268)](_0x2efa84):_0x42d635['WeaponSwapSystem']['Game_Actor_changeEquip'][_0x425c46(0x213)](this,_0x3ea940,_0x12ad5b);}return _0x37daa2;},Game_Actor['prototype'][_0x56b516(0x210)]=function(_0x4ac8d4){const _0x36d03e=_0x56b516;return this[_0x36d03e(0x27a)]===undefined&&(_0x36d03e(0x23e)!=='aFOLC'?this['initWeaponSwapSystem']():(this[_0x36d03e(0x1ed)]&&this[_0x36d03e(0x1ed)][_0x36d03e(0x270)]&&(this['_actor'][_0x36d03e(0x270)]=_0x320a3f),_0x5739d4[_0x36d03e(0x235)][_0x36d03e(0x282)][_0x36d03e(0x213)](this))),this[_0x36d03e(0x27a)][_0x4ac8d4]=this[_0x36d03e(0x27a)][_0x4ac8d4]||0x0,$dataWeapons[this['_swapWeapons'][_0x4ac8d4]]||null;},Game_Actor[_0x56b516(0x259)][_0x56b516(0x20d)]=function(){const _0x5bf2a8=_0x56b516;return this[_0x5bf2a8(0x1a8)]()[_0x5bf2a8(0x205)](_0x3a9b1b=>this[_0x5bf2a8(0x210)](_0x3a9b1b))[_0x5bf2a8(0x254)](null)[_0x5bf2a8(0x254)](undefined);},Game_Actor[_0x56b516(0x259)][_0x56b516(0x217)]=function(_0x3c3d11,_0x1f5da8){const _0x48a9a8=_0x56b516;this[_0x48a9a8(0x27a)]===undefined&&this['initWeaponSwapSystem'](),this['_swapWeapons'][_0x3c3d11]=_0x1f5da8,this[_0x48a9a8(0x221)]();},Game_Actor['prototype']['swapWeaponNext']=function(){const _0x537d2f=_0x56b516;this[_0x537d2f(0x27a)]===undefined&&this[_0x537d2f(0x25c)]();const _0xbaf951=this[_0x537d2f(0x296)],_0x157687=this[_0x537d2f(0x1a8)]();let _0xca33fe=_0x157687[_0x537d2f(0x228)](this['_currentWeaponType']);for(;;){_0xca33fe++;if(_0xca33fe>=_0x157687[_0x537d2f(0x2a4)])_0xca33fe=0x0;if(this[_0x537d2f(0x210)](_0x157687[_0xca33fe]))break;}const _0x3d2281=_0x157687[_0xca33fe];this['switchToWeaponType'](_0x3d2281),_0x3d2281!==_0xbaf951&&this[_0x537d2f(0x1ac)](!![]);},Game_Actor[_0x56b516(0x259)]['swapWeaponPrevious']=function(){const _0x43ef2c=_0x56b516;this[_0x43ef2c(0x27a)]===undefined&&this[_0x43ef2c(0x25c)]();const _0xe20fb2=this['_currentWeaponType'],_0xa321d7=this['weaponSwapTypes']();let _0x349122=_0xa321d7[_0x43ef2c(0x228)](this[_0x43ef2c(0x296)]);for(;;){if(_0x43ef2c(0x1f9)!==_0x43ef2c(0x1f9))this['removeWeaponSwapCommand']();else{_0x349122--;if(_0x349122<0x0)_0x349122=_0xa321d7[_0x43ef2c(0x2a4)]-0x1;if(this[_0x43ef2c(0x210)](_0xa321d7[_0x349122]))break;}}const _0xda627e=_0xa321d7[_0x349122];this['switchToWeaponType'](_0xda627e),_0xda627e!==_0xe20fb2&&this[_0x43ef2c(0x1ac)](!![]);},Game_Actor['prototype']['onWeaponSwap']=function(_0x123822){const _0x493acf=_0x56b516,_0x57f4d1=this[_0x493acf(0x24a)]()[0x0];_0x57f4d1&&_0x123822&&(this[_0x493acf(0x270)]=!![],this[_0x493acf(0x233)]());},Game_Actor[_0x56b516(0x259)][_0x56b516(0x1cd)]=function(_0x58280e){const _0x14d354=_0x56b516;this[_0x14d354(0x27a)]===undefined&&this['initWeaponSwapSystem']();_0x58280e=_0x58280e||0x0;if(!this[_0x14d354(0x1ae)]())return;if(!this['isEquipWtypeOk'](_0x58280e))return;this[_0x14d354(0x296)]=_0x58280e,this[_0x14d354(0x27a)][_0x58280e]=this[_0x14d354(0x27a)][_0x58280e]||0x0;const _0x222751=$dataWeapons[this[_0x14d354(0x27a)][_0x58280e]]||null;this[_0x14d354(0x1d3)][0x0][_0x14d354(0x27f)](_0x222751),this[_0x14d354(0x208)]={};},VisuMZ['WeaponSwapSystem'][_0x56b516(0x249)]=Game_Actor[_0x56b516(0x259)][_0x56b516(0x1f3)],Game_Actor[_0x56b516(0x259)]['changeEquip']=function(_0x567ebf,_0x346e12){const _0x5a3d00=_0x56b516;DataManager['isWeapon'](_0x346e12)||_0x567ebf===0x0&&this[_0x5a3d00(0x1ae)]()?this[_0x5a3d00(0x268)](_0x346e12):VisuMZ[_0x5a3d00(0x235)][_0x5a3d00(0x249)][_0x5a3d00(0x213)](this,_0x567ebf,_0x346e12);},Game_Actor[_0x56b516(0x259)][_0x56b516(0x268)]=function(_0x1096e8){const _0x9511c1=_0x56b516;if(!!_0x1096e8){if(_0x9511c1(0x22c)==='ZbhLh')_0x146e90['WeaponSwapSystem'][_0x9511c1(0x249)][_0x9511c1(0x213)](this,_0x330114,_0x414901);else{const _0x48273e=_0x1096e8['wtypeId'];this[_0x9511c1(0x1cd)](_0x48273e);const _0x50c908=this[_0x9511c1(0x24a)]()[0x0];!!_0x50c908?this[_0x9511c1(0x277)](_0x1096e8,_0x50c908):_0x9511c1(0x236)!=='KumYY'?(_0xa724ba['WeaponSwapSystem'][_0x9511c1(0x21b)]['call'](this),this[_0x9511c1(0x287)]()):this[_0x9511c1(0x277)](_0x1096e8,null),this[_0x9511c1(0x217)](_0x48273e,_0x1096e8['id']),this['switchToWeaponType'](_0x48273e);}}else{if(!!this[_0x9511c1(0x24a)]()[0x0]){const _0x5adbe0=this[_0x9511c1(0x24a)]()[0x0],_0x33c9c6=_0x5adbe0[_0x9511c1(0x24e)];this[_0x9511c1(0x1cd)](_0x33c9c6),this[_0x9511c1(0x277)](null,_0x5adbe0),this['setSwapWeapon'](_0x33c9c6,0x0),this[_0x9511c1(0x1cd)](this['weaponSwapTypes']()[0x0]||0x0);}}this['refresh']();},VisuMZ[_0x56b516(0x235)][_0x56b516(0x25d)]=Game_Actor[_0x56b516(0x259)][_0x56b516(0x24c)],Game_Actor[_0x56b516(0x259)][_0x56b516(0x24c)]=function(_0x2680b2){const _0x5d6e7f=_0x56b516;VisuMZ[_0x5d6e7f(0x235)]['Game_Actor_releaseUnequippableItems'][_0x5d6e7f(0x213)](this,_0x2680b2);if(this[_0x5d6e7f(0x223)]||_0x2680b2)return;if(this[_0x5d6e7f(0x279)])return;this[_0x5d6e7f(0x223)]=!![];let _0x233515=![];for(let _0x20a521=0x1;_0x20a521<$dataSystem[_0x5d6e7f(0x21d)][_0x5d6e7f(0x2a4)];_0x20a521++){if(this[_0x5d6e7f(0x2b4)](_0x20a521))continue;const _0xd7c459=this[_0x5d6e7f(0x210)](_0x20a521);if(!_0xd7c459)continue;this[_0x5d6e7f(0x27a)][_0x20a521]=0x0,$gameParty['gainItem'](_0xd7c459,0x1),_0x233515=!![];}if(_0x233515){const _0x488dc2=this[_0x5d6e7f(0x24a)]()[0x0]||null;this[_0x5d6e7f(0x296)]=_0x488dc2?_0x488dc2[_0x5d6e7f(0x24e)]:0x0,this[_0x5d6e7f(0x221)]();}this[_0x5d6e7f(0x223)]=undefined;},Game_Actor[_0x56b516(0x259)][_0x56b516(0x2b6)]=function(){const _0x24a683=_0x56b516,_0x42ba9a=this[_0x24a683(0x296)],_0x524e25=DataManager['getFirstOfEachWeaponType']();for(const _0x6d7ecf of this[_0x24a683(0x1a8)]()){if(this[_0x24a683(0x210)](_0x6d7ecf))continue;const _0x2c5701=_0x524e25[_0x6d7ecf-0x1];_0x2c5701&&this['setSwapWeapon'](_0x6d7ecf,_0x2c5701['id']);}this[_0x24a683(0x1cd)](_0x42ba9a);},Game_Actor[_0x56b516(0x259)][_0x56b516(0x297)]=function(_0x595d2b){const _0x1163ea=_0x56b516;if(_0x595d2b&&_0x595d2b['note'][_0x1163ea(0x1c1)](VisuMZ[_0x1163ea(0x235)][_0x1163ea(0x2a2)][_0x1163ea(0x20a)])){if(_0x1163ea(0x265)!==_0x1163ea(0x265))_0x1d55f4+=this[_0x1163ea(0x1ed)][_0x1163ea(0x1a8)]()[_0x1163ea(0x2a4)];else return!!this[_0x1163ea(0x24a)]()[0x0];}else return'AQdob'!==_0x1163ea(0x222)?!![]:_0x27e34c[_0x1163ea(0x226)]&&_0x4bee80[_0x1163ea(0x1b6)]['includes']('['+_0x523da6+']');},Game_Actor['prototype'][_0x56b516(0x274)]=function(_0x43ba9a){const _0x35de30=_0x56b516,_0x5c2108=_0x43ba9a[_0x35de30(0x242)],_0x2a2d72=_0x43ba9a[_0x35de30(0x1ef)];if(_0x5c2108===0x0&&_0x2a2d72===0x0)return!![];if(_0x5c2108>0x0&&!this['getSwapWeapon'](_0x5c2108))return![];if(_0x2a2d72>0x0&&!this[_0x35de30(0x210)](_0x2a2d72))return![];return!![];},Game_Actor['prototype'][_0x56b516(0x1b9)]=function(_0xb98f26){const _0x56a096=_0x56b516;if(!DataManager[_0x56a096(0x1c3)](_0xb98f26))return;const _0x454516=VisuMZ[_0x56a096(0x235)][_0x56a096(0x2a2)];if(_0xb98f26['note']['match'](_0x454516['SwitchWpnTypeNum'])){this[_0x56a096(0x1cd)](Number(RegExp['$1']));return;}else{if(_0xb98f26['note'][_0x56a096(0x1c1)](_0x454516['SwitchWpnTypeStr'])){const _0x495a08=DataManager[_0x56a096(0x1c4)](RegExp['$1']);this[_0x56a096(0x1cd)](_0x495a08);return;}}if(this['_currentweapontype']===_0xb98f26[_0x56a096(0x242)]||this[_0x56a096(0x1e8)]===_0xb98f26['requiredWtypeId2'])return;if(_0xb98f26[_0x56a096(0x242)]>0x0)this[_0x56a096(0x1cd)](_0xb98f26[_0x56a096(0x242)]);else{if(_0xb98f26[_0x56a096(0x1ef)]>0x0){if(_0x56a096(0x237)===_0x56a096(0x237))this[_0x56a096(0x1cd)](_0xb98f26[_0x56a096(0x1ef)]);else{this['switchToWeaponType'](_0x222395(_0x5b40f7['$1']));return;}}}},VisuMZ[_0x56b516(0x235)][_0x56b516(0x21b)]=Game_Actor[_0x56b516(0x259)]['optimizeEquipments'],Game_Actor[_0x56b516(0x259)]['optimizeEquipments']=function(){const _0x4dc63f=_0x56b516;VisuMZ['WeaponSwapSystem'][_0x4dc63f(0x21b)][_0x4dc63f(0x213)](this),this[_0x4dc63f(0x287)]();},VisuMZ[_0x56b516(0x235)]['Game_Actor_isOptimizeEquipOk']=Game_Actor[_0x56b516(0x259)]['isOptimizeEquipOk'],Game_Actor['prototype'][_0x56b516(0x2ba)]=function(_0x449736){const _0x2057b3=_0x56b516;if(this[_0x2057b3(0x1ae)]()&&_0x449736===0x0)return![];return VisuMZ[_0x2057b3(0x235)]['Game_Actor_isOptimizeEquipOk'][_0x2057b3(0x213)](this,_0x449736);},Game_Actor['prototype'][_0x56b516(0x287)]=function(){const _0x29fcc7=_0x56b516;if(!this['canWeaponSwap']())return;if(!VisuMZ[_0x29fcc7(0x235)][_0x29fcc7(0x273)][_0x29fcc7(0x213)](this,0x0))return;const _0xee711f=this[_0x29fcc7(0x296)];for(const _0x44827b of this[_0x29fcc7(0x1a8)]()){'KsBtj'!==_0x29fcc7(0x2b5)?this[_0x29fcc7(0x24f)]=0x0:(this[_0x29fcc7(0x1cd)](_0x44827b),this[_0x29fcc7(0x268)](this[_0x29fcc7(0x2c2)](_0x44827b)));}this[_0x29fcc7(0x1cd)](_0xee711f),this[_0x29fcc7(0x221)]();},Game_Actor[_0x56b516(0x259)][_0x56b516(0x2c2)]=function(_0x164bab){const _0x2f07df=_0x56b516,_0x47e864=$gameParty[_0x2f07df(0x24a)]()['filter'](_0x495913=>_0x495913[_0x2f07df(0x24e)]===_0x164bab);let _0x4984a6=null,_0x438951=-0x3e8;for(let _0x4b7c7e=0x0;_0x4b7c7e<_0x47e864[_0x2f07df(0x2a4)];_0x4b7c7e++){const _0x2a4303=this[_0x2f07df(0x28e)](_0x47e864[_0x4b7c7e]);if(_0x2a4303>_0x438951){if(_0x2f07df(0x1ba)===_0x2f07df(0x1b3))return this[_0x2f07df(0x271)](_0xd9cb19,_0x48187c);else _0x438951=_0x2a4303,_0x4984a6=_0x47e864[_0x4b7c7e];}}return _0x4984a6;},VisuMZ[_0x56b516(0x235)]['Game_Actor_clearEquipments']=Game_Actor['prototype'][_0x56b516(0x1cf)],Game_Actor['prototype']['clearEquipments']=function(){const _0x50a8bd=_0x56b516;VisuMZ['WeaponSwapSystem'][_0x50a8bd(0x1c7)][_0x50a8bd(0x213)](this),this[_0x50a8bd(0x1b4)]();},VisuMZ['WeaponSwapSystem'][_0x56b516(0x288)]=Game_Actor[_0x56b516(0x259)][_0x56b516(0x1ec)],Game_Actor[_0x56b516(0x259)][_0x56b516(0x1ec)]=function(_0x40bdee){const _0x8daa39=_0x56b516;if(this[_0x8daa39(0x1ae)]()&&_0x40bdee===0x0)return![];return VisuMZ[_0x8daa39(0x235)][_0x8daa39(0x288)][_0x8daa39(0x213)](this,_0x40bdee);},Game_Actor['prototype'][_0x56b516(0x1b4)]=function(){const _0x28d3b7=_0x56b516;if(!this[_0x28d3b7(0x1ae)]())return;if(!VisuMZ[_0x28d3b7(0x235)][_0x28d3b7(0x288)][_0x28d3b7(0x213)](this,0x0))return;for(let _0x33c530=0x1;_0x33c530<$dataSystem[_0x28d3b7(0x21d)]['length'];_0x33c530++){if('NbERD'===_0x28d3b7(0x293))this[_0x28d3b7(0x1cd)](_0x33c530),this['changeWeapon'](null);else return this[_0x28d3b7(0x27a)]===_0x3dfb34&&this[_0x28d3b7(0x25c)](),this[_0x28d3b7(0x27a)][_0x4f9bcd]=this['_swapWeapons'][_0x250ee6]||0x0,_0xa41eeb[this[_0x28d3b7(0x27a)][_0xce5f6f]]||null;}this[_0x28d3b7(0x221)]();},VisuMZ[_0x56b516(0x235)][_0x56b516(0x1cc)]=Game_Party[_0x56b516(0x259)][_0x56b516(0x266)],Game_Party[_0x56b516(0x259)][_0x56b516(0x266)]=function(){const _0x2681e2=_0x56b516;VisuMZ[_0x2681e2(0x235)][_0x2681e2(0x1cc)][_0x2681e2(0x213)](this);for(const _0x3d41a1 of this['allMembers']()){if(_0x2681e2(0x1e5)==='LGErD'){if(!_0x3d41a1)continue;_0x3d41a1[_0x2681e2(0x2b6)]();}else return;}this[_0x2681e2(0x2b0)]=!![];},Scene_Equip['prototype'][_0x56b516(0x256)]=function(){const _0x19b78c=_0x56b516,_0x20e89a=this[_0x19b78c(0x25b)](),_0x51d659=this[_0x19b78c(0x1e3)][_0x19b78c(0x1d8)],_0x5525af=this[_0x19b78c(0x1e3)]['item']();_0x20e89a[_0x19b78c(0x1f3)](_0x51d659,_0x5525af);},VisuMZ[_0x56b516(0x235)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x56b516(0x259)]['createActorCommandWindow'],Scene_Battle[_0x56b516(0x259)][_0x56b516(0x206)]=function(){const _0x427df7=_0x56b516;VisuMZ[_0x427df7(0x235)][_0x427df7(0x1b8)][_0x427df7(0x213)](this);const _0x246a56=this[_0x427df7(0x286)];_0x246a56[_0x427df7(0x289)](_0x427df7(0x2a6),this[_0x427df7(0x1d6)]['bind'](this));},Scene_Battle['prototype'][_0x56b516(0x1d6)]=function(){const _0x4ac12f=_0x56b516,_0x7d023d=BattleManager[_0x4ac12f(0x25b)]();_0x7d023d['swapWeaponNext'](),this[_0x4ac12f(0x286)][_0x4ac12f(0x1f5)](),this[_0x4ac12f(0x286)]['refresh']();},VisuMZ[_0x56b516(0x235)]['Sprite_Actor_refreshMotion']=Sprite_Actor[_0x56b516(0x259)][_0x56b516(0x1d4)],Sprite_Actor[_0x56b516(0x259)][_0x56b516(0x1d4)]=function(){const _0x3f79fe=_0x56b516;this['_actor']&&this[_0x3f79fe(0x1ed)]['_swappingWeapon']&&(this['_actor']['_swappingWeapon']=undefined),VisuMZ[_0x3f79fe(0x235)][_0x3f79fe(0x282)][_0x3f79fe(0x213)](this);},VisuMZ[_0x56b516(0x235)][_0x56b516(0x290)]=Window_Base[_0x56b516(0x259)][_0x56b516(0x1b7)],Window_Base[_0x56b516(0x259)][_0x56b516(0x1b7)]=function(){const _0x24be23=_0x56b516;this[_0x24be23(0x250)][_0x24be23(0x244)]===_0x24be23(0x22d)&&this['currentSymbol']()==='weaponSwap'?_0x24be23(0x283)===_0x24be23(0x23a)?this[_0x24be23(0x25c)]():SoundManager[_0x24be23(0x260)]():_0x24be23(0x2a1)==='wHGcs'?VisuMZ[_0x24be23(0x235)]['Window_Base_playOkSound']['call'](this):_0x51b007[_0x24be23(0x259)]['cursorRight'][_0x24be23(0x213)](this,_0x4b66ac);},VisuMZ['WeaponSwapSystem'][_0x56b516(0x1dc)]=Window_StatusBase['prototype'][_0x56b516(0x1bc)],Window_StatusBase[_0x56b516(0x259)][_0x56b516(0x1bc)]=function(_0x1aa8de,_0x3b4e2c){const _0x1fe35f=_0x56b516;if(_0x1aa8de&&_0x1aa8de[_0x1fe35f(0x1ae)]()){if('RpALD'===_0x1fe35f(0x26a))this[_0x1fe35f(0x277)](_0x51ba77,_0x2c2b32);else return this[_0x1fe35f(0x271)](_0x1aa8de,_0x3b4e2c);}else return VisuMZ[_0x1fe35f(0x235)]['Window_StatusBase_actorSlotName'][_0x1fe35f(0x213)](this,_0x1aa8de,_0x3b4e2c);},Window_StatusBase[_0x56b516(0x259)][_0x56b516(0x271)]=function(_0x3d7890,_0x10d73c){const _0x4a258d=_0x56b516;let _0x5f3eb8=_0x3d7890[_0x4a258d(0x1a8)]()[_0x4a258d(0x2a4)]-0x1;Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x5f3eb8=$dataSystem[_0x4a258d(0x21d)][_0x4a258d(0x2a4)]-0x2);if(_0x10d73c>_0x5f3eb8)return _0x10d73c-=_0x5f3eb8,VisuMZ[_0x4a258d(0x235)][_0x4a258d(0x1dc)][_0x4a258d(0x213)](this,_0x3d7890,_0x10d73c);else{let _0xee7d5='';if(Window_EquipSlot[_0x4a258d(0x231)]){if(_0x4a258d(0x1ee)==='unBCn')_0xee7d5=$dataSystem[_0x4a258d(0x21d)][_0x10d73c+0x1]||'';else{var _0x5d502d=this['parent'][_0x4a258d(0x22b)](this[_0x4a258d(0x220)][_0x4a258d(0x229)]('attack')),_0x4a7fa5=_0x5d502d['y']+this[_0x4a258d(0x220)][_0x4a258d(0x26f)];_0x4a7fa5>0x0&&_0x4a7fa5<this[_0x4a258d(0x220)]['height']-this[_0x4a258d(0x220)][_0x4a258d(0x26f)]*0x2&&(_0x4a7fa5+=_0x4da422['round'](this[_0x4a258d(0x220)][_0x4a258d(0x224)]()/0x2),this[_0x4a258d(0x24f)]=0xff,this['y']=_0x4a7fa5);}}else{if(_0x4a258d(0x202)!==_0x4a258d(0x202)){if(!this['canWeaponSwap']())return;if(!_0x5c8d2c[_0x4a258d(0x235)][_0x4a258d(0x273)][_0x4a258d(0x213)](this,0x0))return;const _0x378f27=this['_currentWeaponType'];for(const _0x5d93e8 of this[_0x4a258d(0x1a8)]()){this[_0x4a258d(0x1cd)](_0x5d93e8),this['changeWeapon'](this[_0x4a258d(0x2c2)](_0x5d93e8));}this[_0x4a258d(0x1cd)](_0x378f27),this['refresh']();}else{const _0x599b3b=_0x3d7890['weaponSwapTypes']()[_0x10d73c];_0xee7d5=$dataSystem[_0x4a258d(0x21d)][_0x599b3b]||'';}}return _0xee7d5=_0xee7d5[_0x4a258d(0x1e2)](/\\I\[(\d+)\]/gi,''),_0xee7d5;}},Window_EquipSlot[_0x56b516(0x231)]=VisuMZ['WeaponSwapSystem'][_0x56b516(0x291)]['UI']['ShowUnequippable'],VisuMZ[_0x56b516(0x235)][_0x56b516(0x1d2)]=Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x1d1)],Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x1d1)]=function(){const _0x2eab00=_0x56b516;return this[_0x2eab00(0x1ed)]&&this['_actor'][_0x2eab00(0x1ae)]()?this[_0x2eab00(0x294)]():'ZPrza'!==_0x2eab00(0x1fc)?_0x43df6e['WeaponSwapSystem']['Game_BattlerBase_meetsSkillConditions'][_0x2eab00(0x213)](this,_0x307de3)&&this[_0x2eab00(0x297)](_0x1e715d):VisuMZ['WeaponSwapSystem']['Window_EquipSlot_maxItems'][_0x2eab00(0x213)](this);},Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x294)]=function(){const _0xefdd31=_0x56b516;let _0x290d7f=this['_actor']['equipSlots']()[_0xefdd31(0x2a4)]-0x1;return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']?_0x290d7f+=$dataSystem[_0xefdd31(0x21d)]['length']-0x1:_0x290d7f+=this[_0xefdd31(0x1ed)]['weaponSwapTypes']()[_0xefdd31(0x2a4)],_0x290d7f;},VisuMZ[_0x56b516(0x235)][_0x56b516(0x285)]=Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x20c)],Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x20c)]=function(_0x47263a){const _0x21566c=_0x56b516;if(this['_actor']&&this[_0x21566c(0x1ed)]['canWeaponSwap']()){if(_0x21566c(0x2c1)!==_0x21566c(0x2c1))return;else return this[_0x21566c(0x267)](_0x47263a);}else{if(_0x21566c(0x1c5)===_0x21566c(0x238))_0x2c3bd5+=_0x394ff8[_0x21566c(0x21e)](this[_0x21566c(0x220)][_0x21566c(0x224)]()/0x2),this[_0x21566c(0x24f)]=0xff,this['y']=_0x51a46d;else return VisuMZ[_0x21566c(0x235)]['Window_EquipSlot_itemAt'][_0x21566c(0x213)](this,_0x47263a);}},Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x267)]=function(_0x55770c){const _0x3362f6=_0x56b516;let _0x15467e=this[_0x3362f6(0x1ed)]['weaponSwapTypes']()['length']-0x1;Window_EquipSlot[_0x3362f6(0x231)]&&(_0x15467e=$dataSystem[_0x3362f6(0x21d)][_0x3362f6(0x2a4)]-0x2);if(_0x55770c>_0x15467e)return _0x3362f6(0x1bb)===_0x3362f6(0x1bb)?(_0x55770c-=_0x15467e,VisuMZ[_0x3362f6(0x235)][_0x3362f6(0x285)]['call'](this,_0x55770c)):this[_0x3362f6(0x1a8)]()['map'](_0x9caa92=>this[_0x3362f6(0x210)](_0x9caa92))[_0x3362f6(0x254)](null)['remove'](_0x362ad0);else{let _0x520c85=this[_0x3362f6(0x1ed)][_0x3362f6(0x1a8)]()[_0x55770c];return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x520c85=_0x55770c+0x1),this[_0x3362f6(0x1ed)][_0x3362f6(0x210)](_0x520c85);}},VisuMZ['WeaponSwapSystem'][_0x56b516(0x26c)]=Window_EquipSlot[_0x56b516(0x259)]['isEnabled'],Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x262)]=function(_0x324082){const _0x25e00b=_0x56b516;if(this['_actor']&&this[_0x25e00b(0x1ed)][_0x25e00b(0x1ae)]()){if(_0x25e00b(0x2a5)!==_0x25e00b(0x2a5))this[_0x25e00b(0x1e4)][_0x25e00b(0x221)]();else return this[_0x25e00b(0x203)](_0x324082);}else{if(_0x25e00b(0x2c7)===_0x25e00b(0x2c7))return VisuMZ['WeaponSwapSystem']['Window_EquipSlot_isEnabled']['call'](this,_0x324082);else this[_0x25e00b(0x25c)]();}},Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x203)]=function(_0x1665c6){const _0x57b8f1=_0x56b516;let _0x374d66=this['_actor'][_0x57b8f1(0x1a8)]()[_0x57b8f1(0x2a4)]-0x1;Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x57b8f1(0x232)===_0x57b8f1(0x27d)?(this[_0x57b8f1(0x27a)]===_0xeae23e&&this['initWeaponSwapSystem'](),this[_0x57b8f1(0x27a)][_0xf3ca2]=_0x5c14a5,this[_0x57b8f1(0x221)]()):_0x374d66=$dataSystem['weaponTypes'][_0x57b8f1(0x2a4)]-0x2);if(_0x1665c6>_0x374d66){if(_0x57b8f1(0x248)!==_0x57b8f1(0x1af))return _0x1665c6-=_0x374d66,VisuMZ[_0x57b8f1(0x235)]['Window_EquipSlot_isEnabled'][_0x57b8f1(0x213)](this,_0x1665c6);else _0x53f705=_0x18fd38[_0x57b8f1(0x21d)][_0x57b8f1(0x2a4)]-0x2;}else{if(!this[_0x57b8f1(0x1ed)]['isEquipChangeOk'](0x0))return![];else return Window_EquipSlot[_0x57b8f1(0x231)]?_0x57b8f1(0x1fd)!==_0x57b8f1(0x21c)?this[_0x57b8f1(0x1ed)][_0x57b8f1(0x1a8)]()['includes'](_0x1665c6+0x1):this[_0x57b8f1(0x1ed)]&&this[_0x57b8f1(0x1ed)][_0x57b8f1(0x1ae)]()?this['isEnabledWeaponSwap'](_0x36933c):_0x5de3ab['WeaponSwapSystem']['Window_EquipSlot_isEnabled'][_0x57b8f1(0x213)](this,_0x370362):!![];}},Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x27b)]=function(){const _0x13349a=_0x56b516;SoundManager[_0x13349a(0x260)]();const _0x578f62=SceneManager[_0x13349a(0x23c)][_0x13349a(0x1ed)];this[_0x13349a(0x1e3)][_0x13349a(0x1d8)]>0x0?_0x578f62[_0x13349a(0x1f3)](this[_0x13349a(0x1e3)][_0x13349a(0x1d8)],null):_0x13349a(0x1c6)===_0x13349a(0x1c6)?(_0x578f62['switchToWeaponType'](this['_itemWindow']['_wtypeID']),_0x578f62[_0x13349a(0x268)](null)):_0x17b5cd[_0x13349a(0x260)]();this['refresh'](),this[_0x13349a(0x1e3)][_0x13349a(0x221)](),this[_0x13349a(0x204)]();const _0xc5dc36=SceneManager[_0x13349a(0x23c)][_0x13349a(0x1e4)];if(_0xc5dc36)_0xc5dc36['refresh']();},VisuMZ[_0x56b516(0x235)][_0x56b516(0x27c)]=Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x23d)],Window_EquipSlot[_0x56b516(0x259)][_0x56b516(0x23d)]=function(){const _0x3fecb7=_0x56b516;let _0x171ba1=VisuMZ[_0x3fecb7(0x235)][_0x3fecb7(0x27c)],_0x1929db=this[_0x3fecb7(0x1ed)][_0x3fecb7(0x1a8)]()[_0x3fecb7(0x2a4)]-0x1;if(Window_EquipSlot[_0x3fecb7(0x231)]){if(_0x3fecb7(0x2bd)===_0x3fecb7(0x2bd))_0x1929db=$dataSystem['weaponTypes'][_0x3fecb7(0x2a4)]-0x2;else while(this[_0x3fecb7(0x229)](_0x3fecb7(0x2a6))>=0x0){const _0x2acd6c=this[_0x3fecb7(0x229)](_0x3fecb7(0x2a6));this['_list'][_0x3fecb7(0x2be)](_0x2acd6c,0x1);}}return Math[_0x3fecb7(0x269)](0x0,_0x171ba1-_0x1929db);},VisuMZ[_0x56b516(0x235)][_0x56b516(0x1de)]=Window_EquipItem[_0x56b516(0x259)][_0x56b516(0x1bf)],Window_EquipItem['prototype'][_0x56b516(0x1bf)]=function(_0x3382cf){const _0x46518b=_0x56b516;VisuMZ['WeaponSwapSystem'][_0x46518b(0x1de)]['call'](this,_0x3382cf),this['_wtypeID']=0x0;},VisuMZ[_0x56b516(0x235)]['Window_EquipItem_setSlotId']=Window_EquipItem[_0x56b516(0x259)][_0x56b516(0x20b)],Window_EquipItem[_0x56b516(0x259)][_0x56b516(0x20b)]=function(_0x2291be){const _0x21579c=_0x56b516;if(!this['_actor'])return VisuMZ['WeaponSwapSystem']['Window_EquipItem_setSlotId'][_0x21579c(0x213)](this,_0x2291be);let _0x1af053=this[_0x21579c(0x1ed)][_0x21579c(0x1a8)]()[_0x21579c(0x2a4)]-0x1;Window_EquipSlot[_0x21579c(0x231)]&&(_0x1af053=$dataSystem[_0x21579c(0x21d)]['length']-0x2),_0x2291be>_0x1af053?(_0x2291be-=_0x1af053,this['_wtypeID']=0x0,VisuMZ[_0x21579c(0x235)][_0x21579c(0x218)][_0x21579c(0x213)](this,_0x2291be)):'UrvbL'!==_0x21579c(0x2c6)?(Window_EquipSlot[_0x21579c(0x231)]?this[_0x21579c(0x1f7)]=_0x2291be+0x1:this[_0x21579c(0x1f7)]=this[_0x21579c(0x1ed)][_0x21579c(0x1a8)]()[_0x2291be],_0x2291be=0x0,VisuMZ[_0x21579c(0x235)][_0x21579c(0x218)][_0x21579c(0x213)](this,_0x2291be),this[_0x21579c(0x1ed)]['switchToWeaponType'](this[_0x21579c(0x1f7)]),this[_0x21579c(0x1e4)]&&(_0x21579c(0x22a)!==_0x21579c(0x27e)?this[_0x21579c(0x1e4)][_0x21579c(0x221)]():_0x1b96a3+=_0x2c06e0[_0x21579c(0x21d)][_0x21579c(0x2a4)]-0x1)):_0x585449=_0x18b25b[_0x21579c(0x21d)]['length']-0x2;},VisuMZ[_0x56b516(0x235)][_0x56b516(0x28a)]=Window_EquipItem['prototype'][_0x56b516(0x243)],Window_EquipItem[_0x56b516(0x259)][_0x56b516(0x243)]=function(_0x4fbf85){const _0x27ab7f=_0x56b516;if(_0x4fbf85===null)return _0x27ab7f(0x2a0)!==_0x27ab7f(0x2a0)?_0x235e02[_0x27ab7f(0x235)][_0x27ab7f(0x1dc)]['call'](this,_0x27392f,_0x11ff01):!this[_0x27ab7f(0x275)]()[_0x27ab7f(0x243)](this[_0x27ab7f(0x216)]());else{if(this['_slotId']===0x0&&this[_0x27ab7f(0x1f7)]!==0x0){if(_0x27ab7f(0x2bc)!=='BXHQG')_0x101056=_0x5d4700[_0x27ab7f(0x21d)][_0x2b5b16+0x1]||'';else return _0x4fbf85[_0x27ab7f(0x24e)]===this['_wtypeID'];}else return VisuMZ[_0x27ab7f(0x235)][_0x27ab7f(0x28a)]['call'](this,_0x4fbf85);}},VisuMZ['WeaponSwapSystem']['Window_EquipItem_isEnabled']=Window_EquipItem['prototype'][_0x56b516(0x262)],Window_EquipItem[_0x56b516(0x259)][_0x56b516(0x262)]=function(_0x4889c6){const _0x7e4f70=_0x56b516;if(!_0x4889c6){if(_0x7e4f70(0x1be)!=='Vgkpv')this['switchToWeaponType'](_0x4ed4dc[_0x7e4f70(0x1ef)]);else return!this['nonRemovableEtypes']()[_0x7e4f70(0x243)](this[_0x7e4f70(0x216)]());}return VisuMZ[_0x7e4f70(0x235)][_0x7e4f70(0x1ff)][_0x7e4f70(0x213)](this,_0x4889c6);},Window_ActorCommand['WEAPON_SWAP_CHANGE_ATTACK_ICON']=VisuMZ[_0x56b516(0x235)]['Settings']['UI'][_0x56b516(0x247)],Window_ActorCommand[_0x56b516(0x20e)]=VisuMZ[_0x56b516(0x235)][_0x56b516(0x291)]['UI'][_0x56b516(0x1f2)],Window_ActorCommand[_0x56b516(0x261)]=VisuMZ['WeaponSwapSystem'][_0x56b516(0x291)]['UI']['ShowShortcutArrows'],Window_ActorCommand[_0x56b516(0x1df)]=VisuMZ[_0x56b516(0x235)][_0x56b516(0x291)]['UI']['ShowSwapCommand'],VisuMZ[_0x56b516(0x235)][_0x56b516(0x219)]=Window_ActorCommand[_0x56b516(0x259)]['initialize'],Window_ActorCommand['prototype'][_0x56b516(0x1bf)]=function(_0x15c095){const _0x4bf9a7=_0x56b516;VisuMZ[_0x4bf9a7(0x235)][_0x4bf9a7(0x219)][_0x4bf9a7(0x213)](this,_0x15c095),this[_0x4bf9a7(0x253)]();},VisuMZ['WeaponSwapSystem']['Window_ActorCommand_addAttackCommand']=Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x29d)],Window_ActorCommand['prototype']['addAttackCommand']=function(){const _0x5553f0=_0x56b516;VisuMZ[_0x5553f0(0x235)][_0x5553f0(0x1fe)]['call'](this);if(!this[_0x5553f0(0x1ed)]['canWeaponSwap']())return;this[_0x5553f0(0x1db)]();if(this[_0x5553f0(0x229)](_0x5553f0(0x2a6))>=0x0)return;this[_0x5553f0(0x1aa)]();},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x1db)]=function(){const _0x440723=_0x56b516,_0xe666f7=$dataSkills[this['_actor'][_0x440723(0x1ea)]()];if(!_0xe666f7)return;if(!this[_0x440723(0x2a8)](_0xe666f7))return;if(!Window_ActorCommand[_0x440723(0x1c2)])return;const _0x4c5d0a=this[_0x440723(0x1ed)]['weapons']()[0x0];if(!_0x4c5d0a)return;const _0x5541eb=this[_0x440723(0x252)](),_0x46d466=DataManager[_0x440723(0x214)](_0xe666f7),_0x558f44=_0x4c5d0a[_0x440723(0x2bb)],_0x578250=_0x5541eb===_0x440723(0x28b)?_0x46d466:'\x5cI[%1]%2'[_0x440723(0x284)](_0x558f44,_0x46d466),_0x3d5fff=this[_0x440723(0x229)](_0x440723(0x28d));if(_0x3d5fff>=0x0){const _0x4d4a72=this[_0x440723(0x215)][_0x3d5fff];_0x4d4a72['name']=_0x578250;}},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x1aa)]=function(_0x28a873){const _0x39c6e4=_0x56b516;if(!Window_ActorCommand[_0x39c6e4(0x1df)]&&!_0x28a873)return;if(this[_0x39c6e4(0x1ed)][_0x39c6e4(0x1a8)]()[_0x39c6e4(0x2a4)]<=0x1)return;if(this[_0x39c6e4(0x229)]('weaponSwap')>=0x0){if(_0x39c6e4(0x230)===_0x39c6e4(0x1c8)){let _0xfafa06='';if(_0x5a0052[_0x39c6e4(0x231)])_0xfafa06=_0x3be03d[_0x39c6e4(0x21d)][_0x527161+0x1]||'';else{const _0x1e2eab=_0x5839c2[_0x39c6e4(0x1a8)]()[_0x4446c7];_0xfafa06=_0x7621c6['weaponTypes'][_0x1e2eab]||'';}return _0xfafa06=_0xfafa06['replace'](/\\I\[(\d+)\]/gi,''),_0xfafa06;}else this['removeWeaponSwapCommand']();}const _0x41b895=this[_0x39c6e4(0x252)](),_0x1380b7=TextManager[_0x39c6e4(0x1ad)],_0x7d1634=ImageManager[_0x39c6e4(0x280)],_0x3aa3bd=_0x41b895===_0x39c6e4(0x28b)?_0x1380b7:_0x39c6e4(0x258)[_0x39c6e4(0x284)](_0x7d1634,_0x1380b7);this['addCommand'](_0x3aa3bd,_0x39c6e4(0x2a6));},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x2c3)]=function(){const _0x486ecc=_0x56b516;while(this[_0x486ecc(0x229)]('weaponSwap')>=0x0){const _0x7af7f9=this['findSymbol'](_0x486ecc(0x2a6));this['_list'][_0x486ecc(0x2be)](_0x7af7f9,0x1);}},Window_ActorCommand['prototype'][_0x56b516(0x1f6)]=function(){const _0x545336=_0x56b516;return Window_ActorCommand[_0x545336(0x20e)]&&this['currentSymbol']()==='attack'&&this[_0x545336(0x1ed)]&&this['_actor'][_0x545336(0x1ae)]()&&this[_0x545336(0x1ed)][_0x545336(0x20d)]()['length']>0x1;},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x1fb)]=function(_0x3da6c4){const _0x231442=_0x56b516;this['isWeaponSwapShortcutEnabled']()?this[_0x231442(0x211)](!![]):_0x231442(0x2ad)!==_0x231442(0x2ad)?(this[_0x231442(0x1cd)](_0x21e385),this['changeWeapon'](null)):Window_Command['prototype']['cursorRight'][_0x231442(0x213)](this,_0x3da6c4);},Window_ActorCommand['prototype'][_0x56b516(0x2c8)]=function(_0x3f2388){const _0x2bb225=_0x56b516;if(this[_0x2bb225(0x1f6)]())this[_0x2bb225(0x211)](![]);else{if('nAcZM'!==_0x2bb225(0x1f8))return _0x482b39['wtypeId']===this[_0x2bb225(0x1f7)];else Window_Command[_0x2bb225(0x259)][_0x2bb225(0x2c8)][_0x2bb225(0x213)](this,_0x3f2388);}},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x211)]=function(_0x120bd3){const _0x591dc7=_0x56b516;if(_0x120bd3)this['_actor'][_0x591dc7(0x257)]();else{if('NTwDr'!==_0x591dc7(0x1b5))this['_actor']['swapWeaponPrevious']();else return this[_0x591dc7(0x1ed)]&&this[_0x591dc7(0x1ed)][_0x591dc7(0x1ae)]()?this[_0x591dc7(0x294)]():_0x10a308[_0x591dc7(0x235)][_0x591dc7(0x1d2)][_0x591dc7(0x213)](this);}SoundManager[_0x591dc7(0x260)](),this['refresh']();},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x253)]=function(){const _0x5b3c5c=_0x56b516;if(!Window_ActorCommand[_0x5b3c5c(0x20e)])return;if(!Window_ActorCommand[_0x5b3c5c(0x261)])return;const _0x3c1773=[new Sprite(),new Sprite()];for(const _0xb3f22d of _0x3c1773){this[_0x5b3c5c(0x255)](_0xb3f22d),_0xb3f22d[_0x5b3c5c(0x24f)]=0x0,_0xb3f22d['anchor']['y']=0.5,_0xb3f22d[_0x5b3c5c(0x225)]=ImageManager[_0x5b3c5c(0x2a7)](_0x5b3c5c(0x25a));}_0x3c1773[0x0][_0x5b3c5c(0x29a)]['x']=0x0,_0x3c1773[0x0]['setFrame'](0x78,0x24,0x18,0x18),_0x3c1773[0x0]['x']=0x0,this[_0x5b3c5c(0x1a9)]=_0x3c1773[0x0],_0x3c1773[0x1][_0x5b3c5c(0x29a)]['x']=0x1,_0x3c1773[0x1][_0x5b3c5c(0x295)](0x90,0x24,0x18,0x18),_0x3c1773[0x1]['x']=this[_0x5b3c5c(0x1e0)],this[_0x5b3c5c(0x251)]=_0x3c1773[0x1];},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x200)]=function(){const _0x4e99d3=_0x56b516;Window_Scrollable[_0x4e99d3(0x259)][_0x4e99d3(0x200)][_0x4e99d3(0x213)](this),this[_0x4e99d3(0x22f)]();},Window_ActorCommand['prototype'][_0x56b516(0x22f)]=function(){const _0x41db54=_0x56b516;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE'])return;if(!Window_ActorCommand[_0x41db54(0x261)])return;VisuMZ[_0x41db54(0x235)][_0x41db54(0x276)]['call'](this['_weaponSwapShortcutSprite_Left']),VisuMZ[_0x41db54(0x235)][_0x41db54(0x276)][_0x41db54(0x213)](this[_0x41db54(0x251)]);},Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x1ab)]=function(){const _0x4ef843=_0x56b516;if(!this['_actor'])return![];if(this[_0x4ef843(0x278)]()!==_0x4ef843(0x28d))return![];if(this[_0x4ef843(0x1ed)][_0x4ef843(0x1a8)]()[_0x4ef843(0x2a4)]<=0x1)return![];return this[_0x4ef843(0x1ed)][_0x4ef843(0x20d)]()[_0x4ef843(0x2a4)]>0x1;},VisuMZ[_0x56b516(0x235)][_0x56b516(0x276)]=function(){const _0x47bdc4=_0x56b516;if(!this[_0x47bdc4(0x220)][_0x47bdc4(0x25e)]||this[_0x47bdc4(0x220)]['contentsOpacity']<0xff||this[_0x47bdc4(0x220)]['openness']<0xff)'IEvCE'===_0x47bdc4(0x22e)?this[_0x47bdc4(0x24f)]=0x0:this[_0x47bdc4(0x1ac)](!![]);else{if(this[_0x47bdc4(0x220)][_0x47bdc4(0x1ab)]()){var _0x46c4d5=this[_0x47bdc4(0x220)][_0x47bdc4(0x22b)](this[_0x47bdc4(0x220)][_0x47bdc4(0x229)]('attack')),_0x2b7bfd=_0x46c4d5['y']+this[_0x47bdc4(0x220)]['padding'];_0x2b7bfd>0x0&&_0x2b7bfd<this[_0x47bdc4(0x220)]['height']-this['parent'][_0x47bdc4(0x26f)]*0x2&&(_0x2b7bfd+=Math['round'](this[_0x47bdc4(0x220)][_0x47bdc4(0x224)]()/0x2),this[_0x47bdc4(0x24f)]=0xff,this['y']=_0x2b7bfd);}else{if(_0x47bdc4(0x2ac)!==_0x47bdc4(0x26b))this[_0x47bdc4(0x24f)]-=0x20;else{const _0x507a38=this[_0x47bdc4(0x28e)](_0x5d02e2[_0x3c4168]);_0x507a38>_0x2e4434&&(_0x2294b4=_0x507a38,_0x34bc32=_0x8c085e[_0x927e7a]);}}}},VisuMZ[_0x56b516(0x235)][_0x56b516(0x2b1)]=Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x29c)],Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x29c)]=function(_0x2c82f5){const _0x5cc50b=_0x56b516;VisuMZ['WeaponSwapSystem'][_0x5cc50b(0x2b1)][_0x5cc50b(0x213)](this,_0x2c82f5);if(this[_0x5cc50b(0x251)]){if(_0x5cc50b(0x29e)==='NfcUm'){if(this[_0x5cc50b(0x1ae)]()&&_0x18bd69===0x0)return![];return _0x24a6de[_0x5cc50b(0x235)][_0x5cc50b(0x288)][_0x5cc50b(0x213)](this,_0x5e3abb);}else this[_0x5cc50b(0x251)]['x']=this[_0x5cc50b(0x1e0)];}},VisuMZ[_0x56b516(0x235)]['Settings'][_0x56b516(0x28f)]=Window_ActorCommand[_0x56b516(0x259)][_0x56b516(0x2ab)],Window_ActorCommand[_0x56b516(0x259)]['updateHelp']=function(){const _0x44b938=_0x56b516,_0x288199=this[_0x44b938(0x278)]();switch(_0x288199){case'weaponSwap':this[_0x44b938(0x2b2)][_0x44b938(0x1d0)](TextManager[_0x44b938(0x20f)]);break;default:VisuMZ[_0x44b938(0x235)][_0x44b938(0x291)][_0x44b938(0x28f)][_0x44b938(0x213)](this);break;}};