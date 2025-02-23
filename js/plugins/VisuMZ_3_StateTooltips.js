//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [StateTooltips]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/State_Tooltips_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a tooltip window in battle (and other scenes) whenever the
 * player's mouse cursor is hovered over specific areas of the screen. The
 * tooltip window will display a list of the states, buffs, and debuffs the
 * hovered battler has along with a description of the entities and their
 * remaining duration.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Tooltip window displays when hovering over battlers and specific windows
 *   to display their states, buffs, and debuffs.
 * * Adjust the text format in which information is displayed inside the
 *   tooltip window.
 * * Modify the descriptions for states, buffs, and debuffs to your liking.
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
 * * VisuMZ_1_MessageCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_2_PartySystem
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * These plugins have scenes that also support tooltips if this plugin is also
 * installed while those are active in your game's project.
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
 * VisuMZ_1_ElementStatusCore
 * 
 * The updated Status Menu currently does not contain tooltip support for the
 * "General" pages that may display the actor's states. This is due to the
 * customization aspect for the various Status Menu pages. There will be a
 * future update where we will adapt this feature.
 * 
 * ---
 *
 * VisuMZ_2_DragonbonesUnion
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Description-Related Notetags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 *
 * ---
 * 
 * <Exclude From Tooltips>
 * 
 * - Used for: State Notetags
 * - Excludes the state from being displayed in the state tooltips.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * General settings for the State Tooltips Window.
 *
 * ---
 *
 * Appearance
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * Vocabulary settings for the State Tooltips Window.
 *
 * ---
 *
 * General
 * 
 *   Default Description:
 *   - This is the default description that appears for a state without a
 *     declared description. %1 - State's Name
 *   - Can use text codes.
 *
 * ---
 *
 * Entries
 * 
 *   State Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color
 * 
 *   Buff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color
 * 
 *   Debuff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * 
 *   Replace Whites?:
 *   - If state, buff, debuff names are white, replace them?
 * 
 *     Replacement Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Action End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Turn End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Passive Text:
 *   - Can use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Choose which windows to enable tooltip support for.
 *
 * ---
 *
 * Settings
 * 
 *   Window_BattleStatus:
 *   Window_ClassStatus:
 *   Window_EquipStatus:
 *   Window_MenuActor:
 *   Window_MenuStatus:
 *   Window_PartyStatus:
 *   Window_SkillStatus:
 *   Window_Status:
 *   - Enable State Tooltips for this window?
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
 * Version 1.04: October 21, 2021
 * * Documentation Update!
 * ** Added a section for VisuMZ_1_ElementStatusCore in the "VisuStella MZ
 *    Compatibility" section since we received a very good question on it.
 * *** The updated Status Menu currently does not contain tooltip support for
 *     the "General" pages that may display the actor's states. This is due to
 *     the customization aspect for the various Status Menu pages. There will
 *     be a future update where we will adapt this feature.
 * 
 * Version 1.03: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina.
 * *** <Exclude From Tooltips>
 * **** Excludes the state from being displayed in the state tooltips.
 * 
 * Version 1.01: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.00 Official Release Date: February 24, 2021
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
 * @param StateTooltips
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc General settings for the State Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc Vocabulary settings for the State Tooltips Window.
 * @default {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C[%5]%1%2:\\C[0] %3 %4","BuffFmt:str":"\\C[%5]%1%2:\\C[0] Increases unit's %2 to \\C[%5]%3%\\C[0] %4","DebuffFmt:str":"\\C[%5]%1%2:\\C[0] Decreases unit's %2 to \\C[%5]%3%\\C[0] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C[6](Actions \\C[%2]%1\\C[6])\\C[0]","TurnsFmt:str":"\\C[5](Turns \\C[%2]%1\\C[5])\\C[0]","PassiveText:str":"\\C[4](Passive)\\C[0]"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Choose which windows to enable tooltip support for.
 * @default {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"}
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
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Vocab Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param HelpDescription:json
 * @text Default Description
 * @parent General
 * @type note
 * @desc This is the default description that appears for a state
 * without a declared description. %1 - State's Name
 * @default "-"
 * 
 * @param Entries
 *
 * @param StateFmt:str
 * @text State Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Duration, %5 - State Color
 * @default \C[%5]%1%2:\C[0] %3 %4
 *
 * @param BuffFmt:str
 * @text Buff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Buff Color
 * @default \C[%5]%1%2:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param DebuffFmt:str
 * @text Debuff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * @default \C[%5]%1%2:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param ReplaceWhite:eval
 * @text Replace Whites?
 * @parent Entries
 * @type boolean
 * @on Replace
 * @off Don't Replace
 * @desc If state, buff, debuff names are white, replace them?
 * @default true
 *
 * @param WhiteReplaceColor:str
 * @text Replacement Color
 * @parent ReplaceWhite:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 5
 * 
 * @param Turns
 * @text Turns Remaining
 *
 * @param ActionsFmt:str
 * @text Action End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[6](Actions \C[%2]%1\C[6])\C[0]
 *
 * @param TurnsFmt:str
 * @text Turn End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[5](Turns \C[%2]%1\C[5])\C[0]
 *
 * @param PassiveText:str
 * @text Passive Text
 * @parent Turns
 * @desc Can use text codes.
 * @default \C[4](Passive)\C[0]
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_BattleStatus:eval
 * @text Window_BattleStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_ClassStatus:eval
 * @text Window_ClassStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_EquipStatus:eval
 * @text Window_EquipStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuActor:eval
 * @text Window_MenuActor
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuStatus:eval
 * @text Window_MenuStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_PartyStatus:eval
 * @text Window_PartyStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_SkillStatus:eval
 * @text Window_SkillStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_Status:eval
 * @text Window_Status
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 */
//=============================================================================

const _0x2b136c=_0x1f4f;(function(_0x16b94e,_0x5d5791){const _0x3cd8c9=_0x1f4f,_0x3d2004=_0x16b94e();while(!![]){try{const _0x25b2a1=parseInt(_0x3cd8c9(0x163))/0x1*(parseInt(_0x3cd8c9(0x129))/0x2)+-parseInt(_0x3cd8c9(0x17a))/0x3+-parseInt(_0x3cd8c9(0x128))/0x4*(parseInt(_0x3cd8c9(0x19a))/0x5)+-parseInt(_0x3cd8c9(0x184))/0x6*(-parseInt(_0x3cd8c9(0x16f))/0x7)+-parseInt(_0x3cd8c9(0x13a))/0x8*(parseInt(_0x3cd8c9(0x17d))/0x9)+-parseInt(_0x3cd8c9(0x1c2))/0xa*(-parseInt(_0x3cd8c9(0x181))/0xb)+parseInt(_0x3cd8c9(0x171))/0xc*(parseInt(_0x3cd8c9(0x1c6))/0xd);if(_0x25b2a1===_0x5d5791)break;else _0x3d2004['push'](_0x3d2004['shift']());}catch(_0x2520e5){_0x3d2004['push'](_0x3d2004['shift']());}}}(_0x2e8d,0x416c1));var label=_0x2b136c(0x16a),tier=tier||0x0,dependencies=[_0x2b136c(0x173)],pluginData=$plugins['filter'](function(_0x307975){const _0x512e0a=_0x2b136c;return _0x307975[_0x512e0a(0x140)]&&_0x307975[_0x512e0a(0x162)][_0x512e0a(0x199)]('['+label+']');})[0x0];VisuMZ[label][_0x2b136c(0x18e)]=VisuMZ[label][_0x2b136c(0x18e)]||{},VisuMZ[_0x2b136c(0x1aa)]=function(_0x1a0099,_0x21d160){const _0x49b25c=_0x2b136c;for(const _0x1dd427 in _0x21d160){if(_0x1dd427['match'](/(.*):(.*)/i)){const _0x5cb78c=String(RegExp['$1']),_0x2a1eb0=String(RegExp['$2'])['toUpperCase']()[_0x49b25c(0x12e)]();let _0x4e2bf4,_0x1cf055,_0x51f715;switch(_0x2a1eb0){case'NUM':_0x4e2bf4=_0x21d160[_0x1dd427]!==''?Number(_0x21d160[_0x1dd427]):0x0;break;case _0x49b25c(0x133):_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055['map'](_0x48a56f=>Number(_0x48a56f));break;case _0x49b25c(0x1a0):_0x4e2bf4=_0x21d160[_0x1dd427]!==''?eval(_0x21d160[_0x1dd427]):null;break;case _0x49b25c(0x154):_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055[_0x49b25c(0x1b8)](_0x3d4a4f=>eval(_0x3d4a4f));break;case _0x49b25c(0x185):_0x4e2bf4=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):'';break;case'ARRAYJSON':_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON['parse'](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055[_0x49b25c(0x1b8)](_0x714720=>JSON[_0x49b25c(0x1cd)](_0x714720));break;case _0x49b25c(0x178):_0x4e2bf4=_0x21d160[_0x1dd427]!==''?new Function(JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427])):new Function('return\x200');break;case _0x49b25c(0x158):_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055[_0x49b25c(0x1b8)](_0x151144=>new Function(JSON['parse'](_0x151144)));break;case _0x49b25c(0x175):_0x4e2bf4=_0x21d160[_0x1dd427]!==''?String(_0x21d160[_0x1dd427]):'';break;case _0x49b25c(0x1d2):_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055[_0x49b25c(0x1b8)](_0x3b4c9a=>String(_0x3b4c9a));break;case _0x49b25c(0x192):_0x51f715=_0x21d160[_0x1dd427]!==''?JSON['parse'](_0x21d160[_0x1dd427]):{},_0x4e2bf4=VisuMZ[_0x49b25c(0x1aa)]({},_0x51f715);break;case _0x49b25c(0x132):_0x1cf055=_0x21d160[_0x1dd427]!==''?JSON[_0x49b25c(0x1cd)](_0x21d160[_0x1dd427]):[],_0x4e2bf4=_0x1cf055['map'](_0x29dd2e=>VisuMZ[_0x49b25c(0x1aa)]({},JSON['parse'](_0x29dd2e)));break;default:continue;}_0x1a0099[_0x5cb78c]=_0x4e2bf4;}}return _0x1a0099;},(_0x2520cc=>{const _0x2d6718=_0x2b136c,_0x58a56f=_0x2520cc['name'];for(const _0x136cbf of dependencies){if('lsqOb'===_0x2d6718(0x1d1))_0x25c5d8[_0x2d6718(0x162)]=_0xf3caab(_0x3f1c74['$1'])[_0x2d6718(0x12e)]();else{if(!Imported[_0x136cbf]){if(_0x2d6718(0x1b9)!==_0x2d6718(0x12d)){alert(_0x2d6718(0x17e)[_0x2d6718(0x152)](_0x58a56f,_0x136cbf)),SceneManager[_0x2d6718(0x159)]();break;}else{const _0x339844=_0x3cebec(_0x5592eb['$1']);_0x339844!==_0x2947af[_0xe8e894][_0x2d6718(0x18c)]&&(_0x40aedf('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x250add,_0x339844)),_0x432868['exit']());}}}}const _0x30bc9f=_0x2520cc['description'];if(_0x30bc9f[_0x2d6718(0x1a8)](/\[Version[ ](.*?)\]/i)){if(_0x2d6718(0x15b)!==_0x2d6718(0x1bd)){const _0x5b1864=Number(RegExp['$1']);_0x5b1864!==VisuMZ[label][_0x2d6718(0x18c)]&&(_0x2d6718(0x1e3)===_0x2d6718(0x1e3)?(alert(_0x2d6718(0x1de)[_0x2d6718(0x152)](_0x58a56f,_0x5b1864)),SceneManager[_0x2d6718(0x159)]()):(_0x29ecec[_0x2d6718(0x19f)](null),this['_cache_StateTooltips'][_0x2d6718(0x1df)]=null));}else{const _0x3d643a=this[_0x2d6718(0x1b0)]();_0x3d643a&&_0x4e5858[_0x2d6718(0x125)]()===_0x3d643a&&_0x331eb3[_0x2d6718(0x19f)](null);}}if(_0x30bc9f[_0x2d6718(0x1a8)](/\[Tier[ ](\d+)\]/i)){const _0x2c5ac5=Number(RegExp['$1']);if(_0x2c5ac5<tier){if(_0x2d6718(0x119)===_0x2d6718(0x1b5))return this['isStateTooltipHovered']();else alert(_0x2d6718(0x10d)[_0x2d6718(0x152)](_0x58a56f,_0x2c5ac5,tier)),SceneManager[_0x2d6718(0x159)]();}else tier=Math['max'](_0x2c5ac5,tier);}VisuMZ[_0x2d6718(0x1aa)](VisuMZ[label][_0x2d6718(0x18e)],_0x2520cc[_0x2d6718(0x148)]);})(pluginData),VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x1b4)]={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,'Exclude':/<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i},VisuMZ['StateTooltips'][_0x2b136c(0x11f)]=Scene_Boot[_0x2b136c(0x143)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x2b136c(0x1a3)]=function(){const _0x1b25c3=_0x2b136c;VisuMZ[_0x1b25c3(0x16a)][_0x1b25c3(0x11f)]['call'](this),this[_0x1b25c3(0x123)]();},Scene_Boot[_0x2b136c(0x143)][_0x2b136c(0x123)]=function(){const _0x4dbd4c=_0x2b136c;this[_0x4dbd4c(0x15f)]();},Scene_Boot[_0x2b136c(0x143)][_0x2b136c(0x15f)]=function(){const _0x46c442=_0x2b136c;if(VisuMZ['ParseAllNotetags'])return;for(const _0x17450d of $dataStates){if(_0x46c442(0x165)==='KtWSS'){if(!_0x17450d)continue;VisuMZ[_0x46c442(0x16a)][_0x46c442(0x19c)](_0x17450d);}else this['_cache_StateTooltips']['visible']=!![];}},VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x197)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x2b136c(0x197)]=function(_0x2d0c45){const _0x4d546e=_0x2b136c;VisuMZ[_0x4d546e(0x16a)][_0x4d546e(0x197)][_0x4d546e(0x14c)](this,_0x2d0c45),VisuMZ[_0x4d546e(0x16a)][_0x4d546e(0x19c)](_0x2d0c45);},VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x19c)]=function(_0xa14500){const _0x161f02=_0x2b136c;_0xa14500[_0x161f02(0x162)]=VisuMZ[_0x161f02(0x16a)][_0x161f02(0x18e)]['Vocab'][_0x161f02(0x16e)];const _0x35445f=VisuMZ['StateTooltips'][_0x161f02(0x1b4)],_0x24615b=_0xa14500[_0x161f02(0x18f)];_0x24615b[_0x161f02(0x1a8)](_0x35445f[_0x161f02(0x16e)])&&(_0xa14500['description']=String(RegExp['$1'])['trim']());},ColorManager[_0x2b136c(0x168)]=function(_0x2ab610){const _0x39aaec=_0x2b136c;return _0x2ab610=String(_0x2ab610),_0x2ab610['match'](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this[_0x39aaec(0x194)](Number(_0x2ab610));},SceneManager[_0x2b136c(0x1dc)]=function(){const _0x75db6d=_0x2b136c;return this['_scene']&&this[_0x75db6d(0x1a2)][_0x75db6d(0x1b3)]===Scene_Battle;},SceneManager[_0x2b136c(0x125)]=function(){const _0x54a0b9=_0x2b136c,_0x59b1da=SceneManager[_0x54a0b9(0x1a2)][_0x54a0b9(0x14e)];if(!_0x59b1da)return null;return _0x59b1da[_0x54a0b9(0x188)];},SceneManager[_0x2b136c(0x19f)]=function(_0x1325dd){const _0x3cae33=_0x2b136c;if(_0x1325dd&&!_0x1325dd[_0x3cae33(0x1b7)]())return;if(_0x1325dd&&_0x1325dd[_0x3cae33(0x172)]())return;const _0x213038=SceneManager[_0x3cae33(0x1a2)][_0x3cae33(0x14e)];if(!_0x213038)return;_0x213038[_0x3cae33(0x190)](_0x1325dd);},SceneManager['refreshStateTooltipBattler']=function(_0x34fa47){const _0x2c80d1=_0x2b136c;if(_0x34fa47&&!_0x34fa47['isAppeared']())return;const _0x2c9f67=SceneManager['_scene']['_stateTooltipWindow'];if(!_0x2c9f67)return;if(_0x2c9f67[_0x2c80d1(0x188)]!==_0x34fa47)return;_0x2c9f67[_0x2c80d1(0x176)]();},VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x11e)]=Game_Battler[_0x2b136c(0x143)][_0x2b136c(0x1ab)],Game_Battler[_0x2b136c(0x143)][_0x2b136c(0x1ab)]=function(){const _0xea1309=_0x2b136c;VisuMZ[_0xea1309(0x16a)][_0xea1309(0x11e)]['call'](this),SceneManager[_0xea1309(0x169)](this);},VisuMZ['StateTooltips']['Scene_Base_createWindowLayer']=Scene_Base['prototype'][_0x2b136c(0x1ba)],Scene_Base[_0x2b136c(0x143)][_0x2b136c(0x1ba)]=function(){const _0x332c6e=_0x2b136c;VisuMZ[_0x332c6e(0x16a)]['Scene_Base_createWindowLayer'][_0x332c6e(0x14c)](this),this['createStateTooltipWindow']();},Scene_Base['prototype'][_0x2b136c(0x18b)]=function(){const _0x18d256=_0x2b136c;this[_0x18d256(0x14e)]=new Window_StateTooltip(),this[_0x18d256(0x1a5)](this[_0x18d256(0x14e)]);},VisuMZ[_0x2b136c(0x16a)]['Sprite_Clickable_onMouseEnter']=Sprite_Clickable[_0x2b136c(0x143)][_0x2b136c(0x153)],Sprite_Clickable['prototype'][_0x2b136c(0x153)]=function(){const _0xbe12c=_0x2b136c;VisuMZ[_0xbe12c(0x16a)]['Sprite_Clickable_onMouseEnter']['call'](this),this['onMouseEnterStateTooltips']();},VisuMZ[_0x2b136c(0x16a)]['Sprite_Clickable_onMouseExit']=Sprite_Clickable[_0x2b136c(0x143)]['onMouseExit'],Sprite_Clickable[_0x2b136c(0x143)][_0x2b136c(0x155)]=function(){const _0x155c76=_0x2b136c;VisuMZ[_0x155c76(0x16a)][_0x155c76(0x1be)][_0x155c76(0x14c)](this),this[_0x155c76(0x147)]();},Sprite_Clickable[_0x2b136c(0x143)]['onMouseEnterStateTooltips']=function(){const _0x3cf85d=_0x2b136c;this[_0x3cf85d(0x19f)]();},Sprite_Clickable[_0x2b136c(0x143)][_0x2b136c(0x147)]=function(){const _0x528214=_0x2b136c,_0x171722=this[_0x528214(0x1b0)]();_0x171722&&SceneManager['currentTooltipBattler']()===_0x171722&&SceneManager['setStateTooltipBattler'](null);},Sprite_Clickable[_0x2b136c(0x143)][_0x2b136c(0x19f)]=function(){const _0x319b8a=_0x2b136c,_0x1a49eb=this[_0x319b8a(0x1b0)]();_0x1a49eb&&SceneManager['setStateTooltipBattler'](_0x1a49eb);},Sprite_Clickable[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){return null;},VisuMZ[_0x2b136c(0x16a)]['Sprite_Battler_onMouseEnter']=Sprite_Battler[_0x2b136c(0x143)][_0x2b136c(0x153)],Sprite_Battler[_0x2b136c(0x143)][_0x2b136c(0x153)]=function(){const _0x585334=_0x2b136c;VisuMZ['StateTooltips'][_0x585334(0x145)][_0x585334(0x14c)](this),this[_0x585334(0x19f)]();},Sprite_Battler[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){const _0x5aaa5b=_0x2b136c;return this[_0x5aaa5b(0x188)];},Window_Base['prototype']['isMouseHovered']=function(){const _0xafff0e=_0x2b136c,_0x11be9b=new Point(TouchInput['x'],TouchInput['y']),_0x3ad331=this[_0xafff0e(0x1cc)][_0xafff0e(0x13c)](_0x11be9b);return this[_0xafff0e(0x1b6)]()[_0xafff0e(0x193)](_0x3ad331['x'],_0x3ad331['y']);},Window_Base['prototype']['dimensionRect']=function(){const _0x2656da=_0x2b136c;return new Rectangle(0x0,0x0,this['width'],this[_0x2656da(0x167)]);},VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x151)]=Window_Selectable[_0x2b136c(0x143)]['processTouch'],Window_Selectable['prototype'][_0x2b136c(0x19b)]=function(){const _0x2145d3=_0x2b136c;VisuMZ[_0x2145d3(0x16a)][_0x2145d3(0x151)][_0x2145d3(0x14c)](this);if(this[_0x2145d3(0x1b3)]['name']['match'](/Debug/i))return;this[_0x2145d3(0x117)]();},Window_Selectable['prototype']['processTouchStateTooltips']=function(){const _0x3e7c60=_0x2b136c;if(!this[_0x3e7c60(0x18a)]())return;this[_0x3e7c60(0x15d)]=this['_cache_StateTooltips']||{};if(!this[_0x3e7c60(0x146)]()){if('ZUqzp'===_0x3e7c60(0x183))this[_0x3e7c60(0x1c4)]();else{this[_0x3e7c60(0x15d)][_0x3e7c60(0x17c)]&&this[_0x3e7c60(0x120)]();return;}}else this[_0x3e7c60(0x15d)]['open']=!![];if(!this[_0x3e7c60(0x189)]){this['_cache_StateTooltips'][_0x3e7c60(0x189)]&&(_0x3e7c60(0x1e2)!=='FuBaW'?(_0x1de1cd[_0x3e7c60(0x16a)][_0x3e7c60(0x197)][_0x3e7c60(0x14c)](this,_0x3e7c85),_0x8437ff[_0x3e7c60(0x16a)][_0x3e7c60(0x19c)](_0x11321e)):this[_0x3e7c60(0x120)]());return;}else _0x3e7c60(0x10e)!==_0x3e7c60(0x10e)?this[_0x3e7c60(0x15d)]['open']=!![]:this[_0x3e7c60(0x15d)]['visible']=!![];(this[_0x3e7c60(0x15d)]['x']!==this['x']||this['_cache_StateTooltips']['y']!==this['y']||this[_0x3e7c60(0x15d)]['touchX']!==TouchInput['x']||this[_0x3e7c60(0x15d)][_0x3e7c60(0x11a)]!==TouchInput['y'])&&(this[_0x3e7c60(0x15d)]['x']=this['x'],this['_cache_StateTooltips']['y']=this['y'],this[_0x3e7c60(0x15d)][_0x3e7c60(0x11a)]=TouchInput['x'],this[_0x3e7c60(0x15d)][_0x3e7c60(0x1e0)]=TouchInput['y'],this[_0x3e7c60(0x144)]()?(this[_0x3e7c60(0x15d)]['hitTest']=!![],this[_0x3e7c60(0x1e1)]()):this['_cache_StateTooltips']['hitTest']&&this[_0x3e7c60(0x120)]());},Window_Selectable[_0x2b136c(0x143)][_0x2b136c(0x18a)]=function(){const _0x3d7e50=_0x2b136c;return VisuMZ[_0x3d7e50(0x16a)][_0x3d7e50(0x18e)][_0x3d7e50(0x195)][this[_0x3d7e50(0x1b3)]['name']];},Window_Selectable[_0x2b136c(0x143)][_0x2b136c(0x144)]=function(){return this['hitIndex']()>=0x0;},Window_Selectable['prototype'][_0x2b136c(0x130)]=function(){const _0x36e8e4=_0x2b136c,_0x387b29=new Point(TouchInput['x'],TouchInput['y']),_0x27fe61=this[_0x36e8e4(0x1cc)][_0x36e8e4(0x13c)](_0x387b29),_0x2ca1b3=new Rectangle(0x0,0x0,this[_0x36e8e4(0x187)],this['height']);return _0x2ca1b3[_0x36e8e4(0x193)](_0x27fe61['x'],_0x27fe61['y']);},Window_Selectable['prototype'][_0x2b136c(0x1e1)]=function(){const _0xa30532=_0x2b136c,_0xc36834=this['getStateTooltipBattler']();_0xc36834?(this[_0xa30532(0x15d)][_0xa30532(0x1df)]=_0xc36834,SceneManager[_0xa30532(0x19f)](_0xc36834)):this['closeTouchStateTooltips']();},Window_Selectable[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){return null;},Window_Selectable[_0x2b136c(0x143)]['closeTouchStateTooltips']=function(){const _0x51453a=_0x2b136c;this[_0x51453a(0x15d)][_0x51453a(0x17c)]=![],this['_cache_StateTooltips'][_0x51453a(0x189)]=![],this[_0x51453a(0x15d)][_0x51453a(0x161)]=![],this[_0x51453a(0x15d)][_0x51453a(0x1df)]&&(SceneManager[_0x51453a(0x19f)](null),this['_cache_StateTooltips'][_0x51453a(0x1df)]=null);},Window_MenuStatus[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){const _0xcb5f25=_0x2b136c,_0x55dd7b=this[_0xcb5f25(0x1cf)](),_0x324b2a=this[_0xcb5f25(0x12c)](_0x55dd7b);return _0x324b2a;},Window_SkillStatus[_0x2b136c(0x143)][_0x2b136c(0x144)]=function(){const _0x12dfcc=_0x2b136c;return this[_0x12dfcc(0x130)]();},Window_SkillStatus[_0x2b136c(0x143)]['getStateTooltipBattler']=function(){return this['_actor'];},Window_EquipStatus['prototype']['isStateTooltipTouched']=function(){const _0x443b45=_0x2b136c;return this[_0x443b45(0x130)]();},Window_EquipStatus[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){const _0x854bb5=_0x2b136c;return this[_0x854bb5(0x131)];},Window_Status[_0x2b136c(0x143)][_0x2b136c(0x144)]=function(){const _0x21edf7=_0x2b136c;return this[_0x21edf7(0x130)]();},Window_Status[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){const _0x312d4f=_0x2b136c;return this[_0x312d4f(0x131)];},Window_BattleStatus['prototype'][_0x2b136c(0x1b0)]=function(){const _0x479441=this['hitIndex'](),_0x395a97=this['actor'](_0x479441);return _0x395a97;};function _0x2e8d(){const _0x3c9e0a=['param','\x5cI[%1]','4763CUtMjz','StateFmt','ozDbE','551934iOZOiw','JSON','_requestRefresh','width','_battler','visible','isStateTooltipEnabled','createStateTooltipWindow','version','updateBackOpacity','Settings','note','setBattler','name','STRUCT','contains','textColor','Window','HEXCOLOR','ParseStateNotetags','BUFF_FMT','includes','2020930zuIIkB','processTouch','Parse_Notetags_Description','buffTurns','show','setStateTooltipBattler','EVAL','autoRemovalTiming','_scene','onDatabaseLoaded','Vocab','addChild','setupStateText','Wtnhf','match','setupBuffText','ConvertParams','refresh','rpBaU','updateOpacity','WINDOW_SCALE','VisuMZ_2_ClassChangeSystem','getStateTooltipBattler','WINDOW_SKIN_FILENAME','buffColor','constructor','RegExp','cuxLu','dimensionRect','isAppeared','map','unWoP','createWindowLayer','stateTurns','baseTextRect','PuKTI','Sprite_Clickable_onMouseExit','contents','loadSystem','debuffColor','7860dkqLzd','paramBuffRate','hide','MOUSE_OFFSET_Y','26nQZEpl','ZkYXh','floor','_skillWindow','isSupportMessageKeywords','replace','worldTransform','parse','Exclude','hitIndex','knBmx','KrbKJ','ARRAYSTR','_actorCommandWindow','resizeWindow','TurnsFmt','obtainEscapeString','round','isColorLocked','IeWsq','WINDOW_SKIN_OPACITY','DEBUFF_FMT','isSceneBattle','PassiveText','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','battler','touchY','openTouchStateTooltips','FuBaW','DnYKN','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VEZxA','convertMessageKeywords','iconIndex','getStateDisplay','isBuffAffected','_itemWindow','Tooltip','stateColor','WkcJw','processTouchStateTooltips','PASSIVE_TEXT','sexHT','touchX','setupStateTurnText','setupBuffTurnText','WhiteReplaceColor','Game_Battler_refresh','Scene_Boot_onDatabaseLoaded','closeTouchStateTooltips','REPLACE_WHITE','clamp','process_VisuMZ_StateTooltips','updatePosition','currentTooltipBattler','resetFontSettings','padding','4xjTeae','150018mgfcwp','Scene_Base_createWindowLayer','update','actor','JinAO','trim','initialize','isStateTooltipHovered','_actor','ARRAYSTRUCT','ARRAYNUM','targetOpacity','textSizeEx','ffffff','backOpacity','cSqfG','replaceHexColors','8kXSQyX','WindowOpacity','applyInverse','changeTextColor','MOUSE_OFFSET_X','_buffs','status','isBuffOrDebuffAffected','NONWHITE_COLOR','prototype','isStateTooltipTouched','Sprite_Battler_onMouseEnter','isOpen','onMouseExitStateTooltips','parameters','itemPadding','WindowSkin','push','call','ReplaceWhite','_stateTooltipWindow','opacity','passiveStates','Window_Selectable_processTouch','format','onMouseEnter','ARRAYEVAL','onMouseExit','drawing','\x5cHEXCOLOR<#%1>','ARRAYFUNC','exit','windowskin','AzsFj','setupText','_cache_StateTooltips','scale','process_VisuMZ_StateTooltips_Notetags','_text','hitTest','description','4lkMOBP','OffsetX','KtWSS','isMouseHovered','height','getColor','refreshStateTooltipBattler','StateTooltips','loadWindowskin','updateDeath','Scale','HelpDescription','14MXiaYx','clampPosition','3876996dIerBt','isDead','VisuMZ_1_BattleCore','ActionsFmt','STR','requestRefresh','createContents','FUNC','TURNS_FMT','1188762ZDXADK','states','open','3618981JArgix','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'];_0x2e8d=function(){return _0x3c9e0a;};return _0x2e8d();}Imported[_0x2b136c(0x1af)]&&(Window_ClassStatus[_0x2b136c(0x143)][_0x2b136c(0x144)]=function(){const _0x330373=_0x2b136c;return this[_0x330373(0x130)]();},Window_ClassStatus['prototype']['getStateTooltipBattler']=function(){const _0x2e14db=_0x2b136c;return this[_0x2e14db(0x131)];});;Imported['VisuMZ_2_PartySystem']&&(Window_PartyStatus[_0x2b136c(0x143)][_0x2b136c(0x144)]=function(){const _0x3151ae=_0x2b136c;return this[_0x3151ae(0x130)]();},Window_PartyStatus[_0x2b136c(0x143)][_0x2b136c(0x1b0)]=function(){const _0x53b737=_0x2b136c;return this[_0x53b737(0x131)];});;function _0x1f4f(_0x2b4f48,_0x4eaed0){const _0x2e8d85=_0x2e8d();return _0x1f4f=function(_0x1f4ff0,_0x3e96ff){_0x1f4ff0=_0x1f4ff0-0x10d;let _0x332644=_0x2e8d85[_0x1f4ff0];return _0x332644;},_0x1f4f(_0x2b4f48,_0x4eaed0);}function Window_StateTooltip(){this['initialize'](...arguments);}Window_StateTooltip[_0x2b136c(0x143)]=Object['create'](Window_Base[_0x2b136c(0x143)]),Window_StateTooltip[_0x2b136c(0x143)]['constructor']=Window_StateTooltip,Window_StateTooltip['WINDOW_SCALE']=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x114)][_0x2b136c(0x16d)],Window_StateTooltip[_0x2b136c(0x1b1)]=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)]['Tooltip'][_0x2b136c(0x14a)],Window_StateTooltip['WINDOW_SKIN_OPACITY']=VisuMZ['StateTooltips'][_0x2b136c(0x18e)][_0x2b136c(0x114)][_0x2b136c(0x13b)],Window_StateTooltip['STATE_FMT']=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x1a4)][_0x2b136c(0x182)],Window_StateTooltip[_0x2b136c(0x198)]=VisuMZ['StateTooltips']['Settings'][_0x2b136c(0x1a4)]['BuffFmt'],Window_StateTooltip['DEBUFF_FMT']=VisuMZ['StateTooltips'][_0x2b136c(0x18e)][_0x2b136c(0x1a4)]['DebuffFmt'],Window_StateTooltip['ACTIONS_FMT']=VisuMZ[_0x2b136c(0x16a)]['Settings']['Vocab'][_0x2b136c(0x174)],Window_StateTooltip[_0x2b136c(0x179)]=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x1a4)][_0x2b136c(0x1d5)],Window_StateTooltip[_0x2b136c(0x118)]=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x1a4)][_0x2b136c(0x1dd)],Window_StateTooltip[_0x2b136c(0x121)]=VisuMZ['StateTooltips'][_0x2b136c(0x18e)][_0x2b136c(0x1a4)][_0x2b136c(0x14d)],Window_StateTooltip['NONWHITE_COLOR']=VisuMZ['StateTooltips'][_0x2b136c(0x18e)][_0x2b136c(0x1a4)][_0x2b136c(0x11d)],Window_StateTooltip[_0x2b136c(0x13e)]=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x114)][_0x2b136c(0x164)],Window_StateTooltip[_0x2b136c(0x1c5)]=VisuMZ[_0x2b136c(0x16a)][_0x2b136c(0x18e)][_0x2b136c(0x114)]['OffsetY'],Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x12f)]=function(){const _0x13d436=_0x2b136c,_0x4d6fdc=new Rectangle(0x0,0x0,Graphics[_0x13d436(0x187)],Graphics[_0x13d436(0x167)]);Window_Base[_0x13d436(0x143)][_0x13d436(0x12f)]['call'](this,_0x4d6fdc),this[_0x13d436(0x15e)]['x']=this[_0x13d436(0x15e)]['y']=Window_StateTooltip['WINDOW_SCALE'],this[_0x13d436(0x1c4)](),this[_0x13d436(0x188)]=null;},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x16b)]=function(){const _0x5e2622=_0x2b136c;this[_0x5e2622(0x15a)]=ImageManager[_0x5e2622(0x1c0)](Window_StateTooltip['WINDOW_SKIN_FILENAME']);},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x18d)]=function(){const _0x14e442=_0x2b136c;this[_0x14e442(0x137)]=Window_StateTooltip[_0x14e442(0x1da)];},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x190)]=function(_0x414fe5){const _0xa1df0e=_0x2b136c;if(this[_0xa1df0e(0x188)]===_0x414fe5)return;this[_0xa1df0e(0x188)]=_0x414fe5,this[_0xa1df0e(0x188)]?'WtuTb'===_0xa1df0e(0x1d9)?(_0x5cfaca('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xa1df0e(0x152)](_0x514266,_0x117c72)),_0x3991ad['exit']()):this[_0xa1df0e(0x1ab)]():this[_0xa1df0e(0x1c4)]();},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x1ab)]=function(){const _0x441bb5=_0x2b136c;this[_0x441bb5(0x1bf)]['clear'](),this['setupText']();if(this[_0x441bb5(0x160)]['length']>0x0){if('YDexf'==='tGpqg'){const _0x247d0c=this[_0x441bb5(0x135)](this[_0x441bb5(0x160)]);this[_0x441bb5(0x187)]=_0x247d0c[_0x441bb5(0x187)]+(this['itemPadding']()+this['padding'])*0x2,this['height']=_0x247d0c[_0x441bb5(0x167)]+this[_0x441bb5(0x127)]*0x2,this[_0x441bb5(0x177)](),this[_0x441bb5(0x126)]();}else{this[_0x441bb5(0x1d4)]();const _0x177c3f=this[_0x441bb5(0x1bc)]();this['drawTextEx'](this['_text'],_0x177c3f['x'],_0x177c3f['y'],_0x177c3f[_0x441bb5(0x187)]),this[_0x441bb5(0x19e)]();}}else this[_0x441bb5(0x1c4)]();},Window_StateTooltip['prototype'][_0x2b136c(0x10f)]=function(_0x4999f3){return _0x4999f3;},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x1ca)]=function(){return![];},Window_StateTooltip['prototype'][_0x2b136c(0x15c)]=function(){const _0x365678=_0x2b136c;this['_text']='';if(!this['_battler'])return;this[_0x365678(0x1a6)](),this[_0x365678(0x1a9)](),this[_0x365678(0x139)](),this[_0x365678(0x160)]=this[_0x365678(0x160)][_0x365678(0x12e)]();},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x1a6)]=function(){const _0xb8d5a2=_0x2b136c,_0x4c78ce=Window_StateTooltip['STATE_FMT'],_0x46e481=this[_0xb8d5a2(0x188)][_0xb8d5a2(0x17b)]();for(const _0x4955d0 of _0x46e481){if(!_0x4955d0)continue;if(!_0x4955d0[_0xb8d5a2(0x191)][_0xb8d5a2(0x12e)]())continue;if(_0x4955d0[_0xb8d5a2(0x191)]['match'](/-----/i))continue;if(_0x4955d0[_0xb8d5a2(0x110)]<=0x0)continue;const _0x40d769=VisuMZ[_0xb8d5a2(0x16a)]['RegExp'];if(_0x4955d0[_0xb8d5a2(0x18f)][_0xb8d5a2(0x1a8)](_0x40d769[_0xb8d5a2(0x1ce)]))continue;const _0x75019e=_0xb8d5a2(0x180)['format'](_0x4955d0[_0xb8d5a2(0x110)]),_0x3b4da2=_0x4955d0[_0xb8d5a2(0x191)][_0xb8d5a2(0x12e)](),_0x3b9731=_0x4955d0[_0xb8d5a2(0x162)][_0xb8d5a2(0x152)](this[_0xb8d5a2(0x188)][_0xb8d5a2(0x111)](_0x4955d0['id'])),_0x3d5ffa=this[_0xb8d5a2(0x11b)](_0x4955d0),_0x139bab=ColorManager[_0xb8d5a2(0x115)](_0x4955d0),_0x45b1d1=_0x4c78ce[_0xb8d5a2(0x152)](_0x75019e,_0x3b4da2,_0x3b9731,_0x3d5ffa,_0x139bab)[_0xb8d5a2(0x12e)]();_0x45b1d1&&(this[_0xb8d5a2(0x160)]+=_0x45b1d1+'\x0a');}},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x11b)]=function(_0x12de33){const _0x377bd9=_0x2b136c;if(_0x12de33[_0x377bd9(0x1a1)]===0x0)return'';if(this['_battler'][_0x377bd9(0x150)]()[_0x377bd9(0x199)](_0x12de33)){if('MPLSP'!=='nJitD')return Window_StateTooltip['PASSIVE_TEXT'];else this[_0x377bd9(0x1ab)]();}let _0x22bf6c=_0x12de33[_0x377bd9(0x1a1)]===0x1?Window_StateTooltip['ACTIONS_FMT']:Window_StateTooltip[_0x377bd9(0x179)];const _0x235764=this[_0x377bd9(0x188)][_0x377bd9(0x1bb)](_0x12de33['id'])||0x0,_0x21651c=ColorManager['stateColor'](_0x12de33);return _0x22bf6c[_0x377bd9(0x152)](_0x235764,_0x21651c)[_0x377bd9(0x12e)]();},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x1a9)]=function(){const _0x16e5e1=_0x2b136c,_0x14a477=Window_StateTooltip[_0x16e5e1(0x198)],_0x2c6cba=Window_StateTooltip[_0x16e5e1(0x1db)];for(let _0x49134f=0x0;_0x49134f<0x8;_0x49134f++){if(!this[_0x16e5e1(0x188)][_0x16e5e1(0x141)](_0x49134f))continue;const _0x26c07a=this[_0x16e5e1(0x188)][_0x16e5e1(0x112)](_0x49134f),_0x35a5f9=_0x26c07a?_0x14a477:_0x2c6cba,_0x273447=this[_0x16e5e1(0x188)]['buffIconIndex'](this[_0x16e5e1(0x188)][_0x16e5e1(0x13f)][_0x49134f],_0x49134f),_0x388c41=_0x16e5e1(0x180)['format'](_0x273447),_0x94fc3b=TextManager[_0x16e5e1(0x17f)](_0x49134f),_0x515955=Math[_0x16e5e1(0x1c8)](this[_0x16e5e1(0x188)][_0x16e5e1(0x1c3)](_0x49134f)*0x64),_0x1178e1=this['setupBuffTurnText'](_0x49134f),_0x3595d1=_0x26c07a?ColorManager[_0x16e5e1(0x1b2)]():ColorManager[_0x16e5e1(0x1c1)](),_0x18e9ec=_0x35a5f9['format'](_0x388c41,_0x94fc3b,_0x515955,_0x1178e1,_0x3595d1)['trim']();_0x18e9ec&&(this[_0x16e5e1(0x160)]+=_0x18e9ec+'\x0a');}},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x11c)]=function(_0x3b6d0e){const _0x51b5d8=_0x2b136c,_0x2fac95=Window_StateTooltip[_0x51b5d8(0x179)],_0x33d4bb=this['_battler'][_0x51b5d8(0x19d)](_0x3b6d0e),_0x51e7b8=this[_0x51b5d8(0x188)][_0x51b5d8(0x112)](_0x3b6d0e),_0x3d27f1=_0x51e7b8?ColorManager[_0x51b5d8(0x1b2)]():ColorManager[_0x51b5d8(0x1c1)]();return _0x2fac95[_0x51b5d8(0x152)](_0x33d4bb,_0x3d27f1)['trim']();},Window_StateTooltip[_0x2b136c(0x143)]['replaceHexColors']=function(){const _0x4b5ff2=_0x2b136c,_0x37b474=/\\C\[#(.*?)\]/g;this['_text']=this[_0x4b5ff2(0x160)][_0x4b5ff2(0x1cb)](_0x37b474,(_0xde2a9d,_0xe783c)=>{const _0x1af169=_0x4b5ff2;if('pqJIS'!==_0x1af169(0x138)){if(_0xe783c==='ffffff'){if(_0x1af169(0x116)!==_0x1af169(0x116))_0x446c06[_0x1af169(0x16a)][_0x1af169(0x12a)][_0x1af169(0x14c)](this),this[_0x1af169(0x18b)]();else{const _0x4fb975=ColorManager[_0x1af169(0x168)](Window_StateTooltip[_0x1af169(0x142)]);_0xe783c=_0x4fb975[_0x1af169(0x1cb)](/#/g,'');}}return _0x1af169(0x157)[_0x1af169(0x152)](_0xe783c);}else this[_0x1af169(0x13d)](_0x49ba30);});},Window_StateTooltip[_0x2b136c(0x143)]['processEscapeCharacter']=function(_0x3829f5,_0x17f31a){const _0x411c88=_0x2b136c;switch(_0x3829f5){case _0x411c88(0x196):const _0x6acda4=this[_0x411c88(0x1d6)](_0x17f31a);if(!this[_0x411c88(0x1d8)]()&&_0x17f31a[_0x411c88(0x156)]){if(_0x411c88(0x1c7)===_0x411c88(0x1c7))this[_0x411c88(0x13d)](_0x6acda4);else{const _0x2f2dd1=/\\C\[#(.*?)\]/g;this[_0x411c88(0x160)]=this[_0x411c88(0x160)]['replace'](_0x2f2dd1,(_0x2d7070,_0x511a00)=>{const _0x143431=_0x411c88;if(_0x511a00===_0x143431(0x136)){const _0x1c8a86=_0x1d1c60['getColor'](_0x30d054[_0x143431(0x142)]);_0x511a00=_0x1c8a86[_0x143431(0x1cb)](/#/g,'');}return'\x5cHEXCOLOR<#%1>'['format'](_0x511a00);});}}break;default:Window_Base['prototype']['processEscapeCharacter'][_0x411c88(0x14c)](this,_0x3829f5,_0x17f31a);}},Window_StateTooltip[_0x2b136c(0x143)]['resizeWindow']=function(){const _0x326114=_0x2b136c,_0x712479=this[_0x326114(0x135)](this[_0x326114(0x160)]);this[_0x326114(0x187)]=_0x712479['width']+(this[_0x326114(0x149)]()+this[_0x326114(0x127)])*0x2,this[_0x326114(0x167)]=_0x712479['height']+this[_0x326114(0x127)]*0x2,this[_0x326114(0x177)](),this[_0x326114(0x126)]();},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x12b)]=function(){const _0x3cb0e2=_0x2b136c;Window_Base[_0x3cb0e2(0x143)]['update'][_0x3cb0e2(0x14c)](this),this[_0x3cb0e2(0x186)]&&(this['_requestRefresh']=![],this['refresh']()),this[_0x3cb0e2(0x124)](),this[_0x3cb0e2(0x16c)](),this[_0x3cb0e2(0x1ad)]();},Window_StateTooltip[_0x2b136c(0x143)]['requestRefresh']=function(){const _0x2cca15=_0x2b136c;this[_0x2cca15(0x186)]=!![];},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x124)]=function(){const _0x10ded6=_0x2b136c;if(!this[_0x10ded6(0x189)])return;this['x']=TouchInput['x']+Window_StateTooltip['MOUSE_OFFSET_X'],this['y']=TouchInput['y']+Window_StateTooltip[_0x10ded6(0x1c5)],this[_0x10ded6(0x170)]();},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x170)]=function(){const _0x4d57df=_0x2b136c,_0x232f8f=this[_0x4d57df(0x187)]*(Window_StateTooltip[_0x4d57df(0x1ae)]||0.01),_0x25bdd1=this[_0x4d57df(0x167)]*(Window_StateTooltip[_0x4d57df(0x1ae)]||0.01);this['x']=Math[_0x4d57df(0x1d7)](this['x'][_0x4d57df(0x122)](0x0,Graphics[_0x4d57df(0x187)]-_0x232f8f)),this['y']=Math[_0x4d57df(0x1d7)](this['y']['clamp'](0x0,Graphics[_0x4d57df(0x167)]-_0x25bdd1));},Window_StateTooltip[_0x2b136c(0x143)]['updateDeath']=function(){const _0x1762e9=_0x2b136c;this[_0x1762e9(0x188)]&&this['_battler'][_0x1762e9(0x172)]()&&this[_0x1762e9(0x190)](null);},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x1ad)]=function(){const _0x53a70e=_0x2b136c,_0x3f1312=this['targetOpacity']();this[_0x53a70e(0x14f)]=this['contentsOpacity']=_0x3f1312;},Window_StateTooltip[_0x2b136c(0x143)][_0x2b136c(0x134)]=function(){const _0x256e2e=_0x2b136c;if(SceneManager[_0x256e2e(0x1dc)]()){if(_0x256e2e(0x1ac)===_0x256e2e(0x1d0)){const _0x4569d8=new _0xcb3dde(_0x2a2f55['x'],_0x4fdbb8['y']),_0x46ef2b=this[_0x256e2e(0x1cc)][_0x256e2e(0x13c)](_0x4569d8),_0x4dbc9b=new _0x8d7d0b(0x0,0x0,this[_0x256e2e(0x187)],this[_0x256e2e(0x167)]);return _0x4dbc9b[_0x256e2e(0x193)](_0x46ef2b['x'],_0x46ef2b['y']);}else{const _0x4dae73=[];_0x4dae73[_0x256e2e(0x14b)](SceneManager['_scene'][_0x256e2e(0x1d3)]),_0x4dae73[_0x256e2e(0x14b)](SceneManager[_0x256e2e(0x1a2)][_0x256e2e(0x113)]),_0x4dae73['push'](SceneManager[_0x256e2e(0x1a2)][_0x256e2e(0x1c9)]);for(const _0x3b1be8 of _0x4dae73){if(_0x256e2e(0x1a7)!==_0x256e2e(0x1a7))return this[_0x256e2e(0x188)];else{if(_0x3b1be8&&_0x3b1be8[_0x256e2e(0x146)]()&&_0x3b1be8['active']&&_0x3b1be8[_0x256e2e(0x166)]())return 0x0;}}}}return 0xff;};