//=============================================================================
// VisuStella MZ - Sideview Battle UI
// VisuMZ_3_SideviewBattleUI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SideviewBattleUI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SideviewBattleUI = VisuMZ.SideviewBattleUI || {};
VisuMZ.SideviewBattleUI.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [SideviewBattleUI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Sideview_Battle_UI_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ Battle UI for Sideview Battle Systems
 * into something more minimalistic. The menus are placed towards the player's
 * party to let the player focus their attention to the center of the screen
 * instead of to the lower ledges of the screen. The input command windows show
 * up near the inputting actor to give the player a clear understanding of who
 * is performing what action.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * Features include all (but not limited to) the following:
 * 
 * * This plugin changes the UI for the RPG Maker MZ Sideview Battle System.
 * * Status windows appear on the side of the screen for each actor in battle.
 * * The appearance is more compact for both the status windows and input
 *   command windows.
 * * More of the battlefield can be seen with this kind of layout.
 * * Lots of customization options to adjust the status windows.
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
 * Sideview Only
 * 
 * This plugin only works for the sideview battle system. If this layout is
 * selected in the Battle Core, the battle system will automatically shift to
 * sideview regardless of the settings.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * ---
 * 
 * Window Properties
 * 
 * With how the battle layout works, many of the command windows used in the
 * battle system will have preset and hardcoded properties to them in order to
 * maintain a specific aesthetic. These include columns, padding, and scaling
 * types to name a few.
 * 
 * Therefore, any plugins that may alter these effects may not have any effect
 * at all provided that this plugin is in a higher tier than those modifying
 * it. This is an intended change to maintain the aesthetic and is not a bug.
 * 
 * ---
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
 * VisuMZ_2_AggroControlSystem
 * VisuMZ_2_BattleSystemBTB
 * VisuMZ_3_BoostAction
 * VisuMZ_3_StateTooltips
 * VisuMZ_4_BreakShields
 *
 * There are features provided in this plugin for the above plugins. Their UI
 * elements can be shown with this plugin's status windows.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Offset Settings
 * ============================================================================
 *
 * Settings for battler sprite offsets when using the Sideview Battle UI.
 * Since there's more room on the screen, placing them lower will help adjust
 * for the player's visual comfort.
 *
 * ---
 *
 * Settings
 * 
 *   Perform Offset?:
 *   - Offsets the battler sprite positions when using Sideview Battle UI.
 * 
 *   Offset X:
 *   - How much to offset the sprite positions by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the sprite positions by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Window Settings
 * ============================================================================
 *
 * Settings for general windows when using the Sideview Battle UI. These
 * settings are made for the windows that aren't the status windows but are
 * affected by this plugin.
 *
 * ---
 *
 * Global
 * 
 *   UI Scale:
 *   - What is the scaling rate for battle windows?
 *   - Use a number between 0 and 1 for the best results.
 *
 * ---
 *
 * Help Window
 * 
 *   Fade BG Style?:
 *   - Fade the Help Window background with this UI?
 *
 * ---
 *
 * Actor Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the actor command window with
 *     this UI?
 *
 * ---
 *
 * Party Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the party command window with
 *     this UI?
 *
 * ---
 *
 * Item Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the item window with this UI?
 * 
 *   Width:
 *   - What is the width item window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Skill Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the skill window with this UI?
 * 
 *   Width:
 *   - What is the width skill window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Window Settings
 * ============================================================================
 *
 * Settings for the status window when using the Sideview Battle UI. Each of
 * these plugin parameters allow you to adjust many of the various elements
 * found inside of this window.
 *
 * ---
 *
 * Dimensions
 * 
 *   Width Base:
 *   - How width is each actor's status window?
 *   - This is the width AFTER scaling.
 * 
 *   Height Base:
 *   - How tall do you want the status window to be?
 *   - 'auto' for automatic calculations.
 *   - This is the height BEFORE scaling.
 * 
 *     Height Buffer:
 *     - How much space do you want there to be vertically from window
 *       to window?
 *     - This is the height BEFORE scaling.
 * 
 *   Move Distance:
 *   - How far will the status window move when the actor is selected
 *     or active?
 * 
 *     Move Speed:
 *     - How many pixels with the status window move per frame?
 *
 * ---
 *
 * Standard UI > Name
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > States
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TPB/ATB Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > HP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > MP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Aggro Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_AggroControlSystem!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Boost Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_BoostAction!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Brave Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Break Shield
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > State Tooltips
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_StateTooltips!
 *
 * ---
 * 
 * JS
 * 
 *   JS: Custom UI:
 *   - JavaScript used to add custom elements to each status window.
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
 * Version 1.03: July 30, 2021
 * * Bug Fixes!
 * ** Plugin Parameters for adjusting row quantity should now work properly.
 *    Fix made by Olivia.
 * 
 * Version 1.02: June 18, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: April 23, 2021
 * * Bug Fixes!
 * ** Item window during battle should now align properly. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 12, 2021
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
 * @param SideviewBattleUI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Battler:struct
 * @text Battler Offset Settings
 * @type struct<Battler>
 * @desc Settings for battler sprite offsets when using the Sideview Battle UI.
 * @default {"Enable:eval":"true","OffsetX:num":"+0","OffsetY:num":"+128"}
 *
 * @param GeneralWindow:struct
 * @text General Window Settings
 * @type struct<GeneralWindow>
 * @desc Settings for general windows when using the Sideview Battle UI.
 * @default {"Global":"","UiScale:num":"0.80","HelpWindow":"","HelpFadeStyle:eval":"true","ActorCommandWindow":"","ActorCommandWindowMaxRows:num":"8","PartyCommandWindow":"","PartyCommandWindowMaxRows:num":"8","ItemWindow":"","ItemWindowMaxRows:num":"8","ItemWindowWidth:num":"400","ItemWindowOffsetX:num":"+16","ItemWindowOffsetY:num":"+16","SkillWindow":"","SkillWindowMaxRows:num":"8","SkillWindowWidth:num":"400","SkillWindowOffsetX:num":"+16","SkillWindowOffsetY:num":"+16"}
 *
 * @param StatusWindow:struct
 * @text Status Window Settings
 * @type struct<StatusWindow>
 * @desc Settings for the status window when using the Sideview Battle UI.
 * @default {"Dimensions":"","WidthBase:num":"200","HeightBase:str":"auto","HeightBuffer:num":"4","MoveDistance:num":"48","MoveSpeed:num":"4","Standard":"","Name":"","NameShow:eval":"true","NameOffsetX:num":"+48","NameOffsetY:num":"+0","States":"","StatesShow:eval":"true","StatesIgnoreScale:eval":"true","StatesOffsetX:num":"+20","StatesOffsetY:num":"+20","Tpb":"","TpbShow:eval":"true","TpbOffsetX:num":"+44","TpbOffsetY:num":"+0","Hp":"","HpShow:eval":"true","HpOffsetX:num":"+60","HpOffsetY:num":"+0","Mp":"","MpShow:eval":"true","MpOffsetX:num":"+68","MpOffsetY:num":"+0","Tp":"","TpShow:eval":"true","TpOffsetX:num":"+74","TpOffsetY:num":"+0","Compatibility":"","Aggro":"","AggroShow:eval":"true","AggroOffsetX:num":"+44","AggroOffsetY:num":"+0","Boost":"","BoostShow:eval":"true","BoostOffsetX:num":"+52","BoostOffsetY:num":"+2","Brave":"","BraveShow:eval":"true","BraveOffsetX:num":"+52","BraveOffsetY:num":"-6","BreakShield":"","BreakShieldShow:eval":"true","BreakShieldIgnoreScale:eval":"true","BreakShieldOffsetX:num":"+20","BreakShieldOffsetY:num":"+20","StateTooltips":"","StateTooltipsShow:eval":"true","JS":"","CustomUi:func":"\"// Declare Variables\\nconst actor = arguments[0];\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\n\\n// Draw Custom Elements\\n// Put in code you want here used for windows classes\""}
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
 * Battler Offset Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Enable:eval
 * @text Perform Offset?
 * @type boolean
 * @on Do Offset
 * @off Don't Offset
 * @desc Offsets the battler sprite positions when using Sideview Battle UI.
 * @default true
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the sprite positions by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the sprite positions by?
 * Negative goes up. Positive goes down.
 * @default +128
 *
 */
/* ----------------------------------------------------------------------------
 * GeneralWindow Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GeneralWindow:
 *
 * @param Global
 *
 * @param UiScale:num
 * @text UI Scale
 * @parent Global
 * @desc What is the scaling rate for battle windows?
 * Use a number between 0 and 1 for the best results.
 * @default 0.80
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFadeStyle:eval
 * @text Fade BG Style?
 * @parent HelpWindow
 * @type boolean
 * @on Fade Background
 * @off Default Background
 * @desc Fade the Help Window background with this UI?
 * @default true
 *
 * @param ActorCommandWindow
 * @text Actor Command Window
 *
 * @param ActorCommandWindowMaxRows:num
 * @text Max Rows
 * @parent ActorCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the actor command window with this UI?
 * @default 8
 *
 * @param PartyCommandWindow
 * @text Party Command Window
 *
 * @param PartyCommandWindowMaxRows:num
 * @text Max Rows
 * @parent PartyCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the party command window with this UI?
 * @default 8
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemWindowMaxRows:num
 * @text Max Rows
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the item window with this UI?
 * @default 8
 *
 * @param ItemWindowWidth:num
 * @text Width
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the width item window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param ItemWindowOffsetX:num
 * @text Offset X
 * @parent ItemWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param ItemWindowOffsetY:num
 * @text Offset Y
 * @parent ItemWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 * @param SkillWindow
 * @text Skill Window
 *
 * @param SkillWindowMaxRows:num
 * @text Max Rows
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the skill window with this UI?
 * @default 8
 *
 * @param SkillWindowWidth:num
 * @text Width
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the width skill window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param SkillWindowOffsetX:num
 * @text Offset X
 * @parent SkillWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param SkillWindowOffsetY:num
 * @text Offset Y
 * @parent SkillWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 */
/* ----------------------------------------------------------------------------
 * Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param Dimensions
 *
 * @param WidthBase:num
 * @text Width Base
 * @parent Dimensions
 * @type number
 * @desc How width is each actor's status window?
 * This is the width AFTER scaling.
 * @default 200
 *
 * @param HeightBase:str
 * @text Height Base
 * @parent Dimensions
 * @type number
 * @desc How tall do you want the status window to be?
 * 'auto' for automatic calculations. Value is BEFORE scaling.
 * @default auto
 *
 * @param HeightBuffer:num
 * @text Height Buffer
 * @parent HeightBase:str
 * @type number
 * @desc How much space do you want there to be vertically from window to window?
 * @default 4
 *
 * @param MoveDistance:num
 * @text Move Distance
 * @parent Dimensions
 * @type number
 * @desc How far will the status window move when
 * the actor is selected or active?
 * @default 48
 *
 * @param MoveSpeed:num
 * @text Move Speed
 * @parent MoveDistance:num
 * @type number
 * @desc How many pixels with the status window move per frame?
 * @default 4
 *
 * @param Standard
 * @text Standard UI
 * 
 * @param Name
 * @parent Standard
 *
 * @param NameShow:eval
 * @text Show?
 * @parent Name
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param NameOffsetX:num
 * @text Offset X
 * @parent Name
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +48
 *
 * @param NameOffsetY:num
 * @text Offset Y
 * @parent Name
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param States
 * @parent Standard
 *
 * @param StatesShow:eval
 * @text Show?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param StatesIgnoreScale:eval
 * @text Ignore Scale?
 * @parent States
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param StatesOffsetX:num
 * @text Offset X
 * @parent States
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param StatesOffsetY:num
 * @text Offset Y
 * @parent States
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param Tpb
 * @text TPB/ATB Gauge
 * @parent Standard
 *
 * @param TpbShow:eval
 * @text Show?
 * @parent Tpb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpbOffsetX:num
 * @text Offset X
 * @parent Tpb
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param TpbOffsetY:num
 * @text Offset Y
 * @parent Tpb
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Hp
 * @text HP Gauge
 * @parent Standard
 *
 * @param HpShow:eval
 * @text Show?
 * @parent Hp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param HpOffsetX:num
 * @text Offset X
 * @parent Hp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +60
 *
 * @param HpOffsetY:num
 * @text Offset Y
 * @parent Hp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Mp
 * @text MP Gauge
 * @parent Standard
 *
 * @param MpShow:eval
 * @text Show?
 * @parent Mp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param MpOffsetX:num
 * @text Offset X
 * @parent Mp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +68
 *
 * @param MpOffsetY:num
 * @text Offset Y
 * @parent Mp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Tp
 * @text TP Gauge
 * @parent Standard
 *
 * @param TpShow:eval
 * @text Show?
 * @parent Tp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpOffsetX:num
 * @text Offset X
 * @parent Tp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +74
 *
 * @param TpOffsetY:num
 * @text Offset Y
 * @parent Tp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Compatibility
 * @text Compatibility UI
 * 
 * @param Aggro
 * @text Aggro Gauge
 * @parent Compatibility
 * @default VisuMZ_2_AggroControlSystem
 *
 * @param AggroShow:eval
 * @text Show?
 * @parent Aggro
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_AggroControlSystem!
 * @default true
 *
 * @param AggroOffsetX:num
 * @text Offset X
 * @parent Aggro
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param AggroOffsetY:num
 * @text Offset Y
 * @parent Aggro
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Boost
 * @text Boost Points
 * @parent Compatibility
 * @default VisuMZ_3_BoostAction
 *
 * @param BoostShow:eval
 * @text Show?
 * @parent Boost
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_BoostAction!
 * @default true
 *
 * @param BoostOffsetX:num
 * @text Offset X
 * @parent Boost
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BoostOffsetY:num
 * @text Offset Y
 * @parent Boost
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param Brave
 * @text Brave Points
 * @parent Compatibility
 * @default VisuMZ_2_BattleSystemBTB
 *
 * @param BraveShow:eval
 * @text Show?
 * @parent Brave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_BattleSystemBTB!
 * @default true
 *
 * @param BraveOffsetX:num
 * @text Offset X
 * @parent Brave
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BraveOffsetY:num
 * @text Offset Y
 * @parent Brave
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default -6
 * 
 * @param BreakShield
 * @text Break Shield
 * @parent Compatibility
 * @default VisuMZ_4_BreakShields
 *
 * @param BreakShieldShow:eval
 * @text Show?
 * @parent BreakShield
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param BreakShieldIgnoreScale:eval
 * @text Ignore Scale?
 * @parent BreakShield
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param BreakShieldOffsetX:num
 * @text Offset X
 * @parent BreakShield
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param BreakShieldOffsetY:num
 * @text Offset Y
 * @parent BreakShield
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param StateTooltips
 * @text State Tooltips
 * @parent Compatibility
 * @default VisuMZ_3_StateTooltips
 *
 * @param StateTooltipsShow:eval
 * @text Show?
 * @parent StateTooltips
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param JS
 *
 * @param CustomUi:func
 * @text JS: Custom UI
 * @parent JS
 * @type note
 * @desc JavaScript used to add custom elements to each status window.
 * @default "// Declare Variables\nconst actor = arguments[0];\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\n\n// Draw Custom Elements\n// Put in code you want here used for windows classes"
 *
 */
//=============================================================================

const _0x43f1=['STATE_TOOLTIPS_SHOWN','1079446axmJNz','_scene','TenxR','padding','pVOgF','BraveShow','StateTooltipsShow','xaPwk','BOOST_OFFSET_Y','BOOST_OFFSET_X','round','call','createContents','BreakShieldIgnoreScale','HeightBase','QjjyD','updateSideviewUiFadeIn','_requestRefresh','placeTimeGauge','Scene_Battle_createStatusWindow','placeGauge','isCTB','fillRect','maxSideviewUiRows','DliSp','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_Y','BattleLayout','left','updateRefreshSideviewUi','_actor','gaugeHeight','AggroControlSystem','ARRAYSTRUCT','STRUCT','TP_GAUGE_OFFSET_Y','isSelected','toUpperCase','updateSideviewBattleUIPositions','PartyCommandWindowMaxRows','FUNC','adjustSideviewUiWidth','MP_GAUGE_SHOWN','STR','isShowAggro','_activeX','59pIegHH','_currentActor','isAdjustBravePoints','THIMa','contains','battleMembers','BREAK_SHIELD_SHOWN','FfBWH','updatePosition','createWindowRect','boxWidth','resize','battler','Sprite_Battler_setHome','1018683OquURm','Window_ActorCommand_makeCommandList','MoveSpeed','ActorCommandWindowMaxRows','BreakShieldShow','_list','innerRect','TP_GAUGE_OFFSET_X','TP_GAUGE_SHOWN','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X','STATES_SHOWN','parameters','MP_GAUGE_OFFSET_X','MP_GAUGE_OFFSET_Y','VisuMZ_2_BattleSystemCTB','CustomUi','sideviewUiPositionOffsetY','iconHeight','Aggro','EVAL','Window_SkillList_colSpacing','scale','Settings','BOOST_SHOWN','Scene_Battle_statusWindowRect','_additionalSprites','AGGRO_OFFSET_Y','TcRox','WidthBase','SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS','JqvtS','TpbOffsetY','NAME_OFFSET_X','updateBattler','BRAVE_OFFSET_X','Window_ItemList_makeItemList','NMLxc','push','map','Scene_Battle_createCancelButton','ItemWindowMaxRows','isStateTooltipTouched','BRAVE_SHOWN','AGGRO_SHOWN','isActivePosition','_actorCommandWindow','_partyCommandWindow','Window_SkillList_maxCols','applyInverse','UiScale','autoRowCount','14281ULOcSd','gaugeLineHeight','floor','MoveDistance','Scene_Base_isWindowMaskingEnabled','176vRIhqh','NameOffsetX','ARRAYSTR','STATES_REVERSE_SCALE','TPB_OFFSET_X','boxHeight','ItemWindowOffsetX','XKGQt','updateStatusWindowPosition','OffsetY','BRAVE_OFFSET_Y','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y','SkillWindowOffsetX','BREAK_SHIELD_OFFSET_X','drawCustomJS','match','ICON_SIZE_RATE','refreshSideviewUiBattleStatusWindows','_enemyWindow','_skillWindow','HP_GAUGE_OFFSET_Y','bitmap','ceil','STATES_OFFSET_X','BREAK_SHIELD_REVERSE_SCALE','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateSideviewUiPosition','_homeX','Window_Help_initialize','_battleField','XYlQg','HEIGHT_BASE','AsbXK','TpShow','isWindowMaskingEnabled','BraveOffsetX','Window_ItemList_maxCols','makeCommandList','Window_ItemList_initialize','sideview_ui','GeneralWindow','SkillWindowOffsetY','battleLayoutStyle','actor','isAdjustBoostPoints','JMyhy','statusWindowRect','includes','pkdup','format','StatesIgnoreScale','WIDTH_BASE','HbrjL','_actorWindow','_subject','isBTB','createSideviewUiBattleStatusWindows','parse','Enable','trim','VisuMZ_4_BreakShields','exit','ARRAYFUNC','SIDEVIEW_BATTLE_UI_FADE_STYLE','SIDEVIEW_BATTLE_UI_MOVE_BATTLERS','gTNHS','dimColor2','fittingHeight','_sideviewUiBattleStatusWindows','VisuMZ_2_AggroControlSystem','_spriteset','constructor','HEIGHT_BUFFER','StatusWindow','setBackgroundType','HpShow','createCancelButton','StatusGauge','VisuMZ_1_BattleCore','AggroShow','742000GrIwZn','_targetX','_dimmerSprite','drawBasicStatus','Window_BattleStatus_updateRefresh','UBclG','TuEbL','updatePadding','initMembersSideviewUi','refresh','allowBoostAction','SIDEVIEW_BATTLE_UI_WINDOW_WIDTH','SkillWindowMaxRows','AggroOffsetY','updateSideviewUiFadeOut','hFdQz','setHome','ARRAYEVAL','makeItemList','MpOffsetX','_battler','198648IKMwBG','JSON','VisuMZ_3_BoostAction','SIDEVIEW_BATTLE_UI_SCALE','WIXiU','clampSideviewUiPlacementPosition','max','SNpuu','ItemWindowOffsetY','sideviewUiTargetActor','isShowTpbGauge','dimColor1','actorId','AGGRO_OFFSET_X','Window_ItemList_colSpacing','Battler','AggroOffsetX','1730984oAderG','isUsingSideviewUiLayout','WIDTH_MOVE','dataSideviewUiLength','Window_PartyCommand_initialize','TPB_OFFSET_Y','createStatusWindow','clamp','maxCols','Scene_Battle_updateStatusWindowPosition','Game_System_isSideView','SkillWindowWidth','Window_PartyCommand_makeCommandList','hideAdditionalSprites','version','TZNEn','HpOffsetY','HP_GAUGE_SHOWN','description','filter','drawAllItems','createSideviewUiDimmerSprite','HP_GAUGE_OFFSET_X','width','9219VdWPQi','_itemWindow','wBBiL','activate','JUWfU','adjustSideviewUiHeight','sideviewUiPositionOffsetX','update','active','status','Gbgzk','isSideView','updateRefresh','actor%1-breakShieldIcon','visible','sideviewUiWidth','isTpb','NAME_OFFSET_Y','STATES_OFFSET_Y','initialize','isStateTooltipEnabled','HeightBuffer','min','_data','ScZEj','addChildToBack','drawActorBravePoints','worldTransform','addWindow','colSpacing','return\x200','TPB_SHOWN','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X','NAME_SHOWN','TpbOffsetX','prototype','length','StatesOffsetX','clearBattleRefreshRequest','placeBoostPoints','VeTGz','BreakShieldOffsetY','height','StatesShow','MpShow','Window_ActorCommand_initialize','_partyIndex','SideviewBattleUI','CommandWidth','ConvertParams','placeBreakShieldIcon','BattleCore','ItemWindowWidth'];const _0x5d800b=_0x50a2;(function(_0x358cc3,_0x40e2f3){const _0x1e666c=_0x50a2;while(!![]){try{const _0x106cf8=-parseInt(_0x1e666c(0xd8))+-parseInt(_0x1e666c(0x101))*-parseInt(_0x1e666c(0x1aa))+parseInt(_0x1e666c(0xe9))+-parseInt(_0x1e666c(0x164))*parseInt(_0x1e666c(0x1a5))+-parseInt(_0x1e666c(0x137))+-parseInt(_0x1e666c(0x172))+parseInt(_0x1e666c(0xc3));if(_0x106cf8===_0x40e2f3)break;else _0x358cc3['push'](_0x358cc3['shift']());}catch(_0x3a9d55){_0x358cc3['push'](_0x358cc3['shift']());}}}(_0x43f1,0xe970c));var label=_0x5d800b(0x130),tier=tier||0x0,dependencies=[_0x5d800b(0xc1)],pluginData=$plugins[_0x5d800b(0xfc)](function(_0x1ee3b1){const _0x2d5a7d=_0x5d800b;return _0x1ee3b1[_0x2d5a7d(0x10a)]&&_0x1ee3b1[_0x2d5a7d(0xfb)][_0x2d5a7d(0xa2)]('['+label+']');})[0x0];VisuMZ[label][_0x5d800b(0x188)]=VisuMZ[label][_0x5d800b(0x188)]||{},VisuMZ[_0x5d800b(0x132)]=function(_0x3fc069,_0x5944a0){const _0x4636a9=_0x5d800b;for(const _0x4e742f in _0x5944a0){if(_0x4e742f[_0x4636a9(0x1b9)](/(.*):(.*)/i)){if('ZRnJx'!=='DvdJJ'){const _0x13a00c=String(RegExp['$1']),_0x2c4016=String(RegExp['$2'])[_0x4636a9(0x15b)]()[_0x4636a9(0xae)]();let _0xcc31cb,_0x3fba59,_0x584bd7;switch(_0x2c4016){case'NUM':_0xcc31cb=_0x5944a0[_0x4e742f]!==''?Number(_0x5944a0[_0x4e742f]):0x0;break;case'ARRAYNUM':_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59['map'](_0x35a623=>Number(_0x35a623));break;case _0x4636a9(0x185):_0xcc31cb=_0x5944a0[_0x4e742f]!==''?eval(_0x5944a0[_0x4e742f]):null;break;case _0x4636a9(0xd4):_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON['parse'](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59['map'](_0x305108=>eval(_0x305108));break;case _0x4636a9(0xd9):_0xcc31cb=_0x5944a0[_0x4e742f]!==''?JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f]):'';break;case'ARRAYJSON':_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON['parse'](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59[_0x4636a9(0x198)](_0x883dc7=>JSON[_0x4636a9(0xac)](_0x883dc7));break;case _0x4636a9(0x15e):_0xcc31cb=_0x5944a0[_0x4e742f]!==''?new Function(JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f])):new Function(_0x4636a9(0x11f));break;case _0x4636a9(0xb1):_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59[_0x4636a9(0x198)](_0x6d248f=>new Function(JSON['parse'](_0x6d248f)));break;case _0x4636a9(0x161):_0xcc31cb=_0x5944a0[_0x4e742f]!==''?String(_0x5944a0[_0x4e742f]):'';break;case _0x4636a9(0x1ac):_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59[_0x4636a9(0x198)](_0x17ba48=>String(_0x17ba48));break;case _0x4636a9(0x158):_0x584bd7=_0x5944a0[_0x4e742f]!==''?JSON[_0x4636a9(0xac)](_0x5944a0[_0x4e742f]):{},_0xcc31cb=VisuMZ[_0x4636a9(0x132)]({},_0x584bd7);break;case _0x4636a9(0x157):_0x3fba59=_0x5944a0[_0x4e742f]!==''?JSON['parse'](_0x5944a0[_0x4e742f]):[],_0xcc31cb=_0x3fba59[_0x4636a9(0x198)](_0x4a910c=>VisuMZ[_0x4636a9(0x132)]({},JSON[_0x4636a9(0xac)](_0x4a910c)));break;default:continue;}_0x3fc069[_0x13a00c]=_0xcc31cb;}else _0x438de0['SideviewBattleUI']['Window_ActorCommand_makeCommandList'][_0x4636a9(0x142)](this),this[_0x4636a9(0x15f)](),this[_0x4636a9(0x106)](),this[_0x4636a9(0x1c4)]();}}return _0x3fc069;},(_0x347e15=>{const _0x1ec027=_0x5d800b,_0x36c7e7=_0x347e15['name'];for(const _0x1c18a1 of dependencies){if(!Imported[_0x1c18a1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1ec027(0xa4)](_0x36c7e7,_0x1c18a1)),SceneManager[_0x1ec027(0xb0)]();break;}}const _0x2acf36=_0x347e15[_0x1ec027(0xfb)];if(_0x2acf36[_0x1ec027(0x1b9)](/\[Version[ ](.*?)\]/i)){const _0x595fd1=Number(RegExp['$1']);_0x595fd1!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1ec027(0xa4)](_0x36c7e7,_0x595fd1)),SceneManager['exit']());}if(_0x2acf36['match'](/\[Tier[ ](\d+)\]/i)){const _0xd9dcb3=Number(RegExp['$1']);_0xd9dcb3<tier?(alert(_0x1ec027(0x1c3)[_0x1ec027(0xa4)](_0x36c7e7,_0xd9dcb3,tier)),SceneManager[_0x1ec027(0xb0)]()):tier=Math['max'](_0xd9dcb3,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1ec027(0x188)],_0x347e15[_0x1ec027(0x17d)]);})(pluginData),BattleManager[_0x5d800b(0xea)]=function(){const _0x556473=_0x5d800b;return SceneManager['isSceneBattle']()&&SceneManager[_0x556473(0x138)][_0x556473(0x9d)]()===_0x556473(0x1d1);},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0xf3)]=Game_System[_0x5d800b(0x124)][_0x5d800b(0x10c)],Game_System[_0x5d800b(0x124)][_0x5d800b(0x10c)]=function(){const _0x41cdbd=_0x5d800b;if(BattleManager[_0x41cdbd(0xea)]())return!![];return VisuMZ[_0x41cdbd(0x130)][_0x41cdbd(0xf3)][_0x41cdbd(0x142)](this);},VisuMZ[_0x5d800b(0x130)]['Scene_Base_isWindowMaskingEnabled']=Scene_Base[_0x5d800b(0x124)]['isWindowMaskingEnabled'],Scene_Base[_0x5d800b(0x124)][_0x5d800b(0x1cc)]=function(){const _0x3d7144=_0x5d800b;if(BattleManager['isUsingSideviewUiLayout']()){if(_0x3d7144(0xb4)!==_0x3d7144(0x13e))return![];else _0x438e9d[_0x3d7144(0x130)]['Window_BattleStatus_updateRefresh'][_0x3d7144(0x142)](this);}else return VisuMZ[_0x3d7144(0x130)][_0x3d7144(0x1a9)][_0x3d7144(0x142)](this);},VisuMZ[_0x5d800b(0x130)]['Scene_Battle_statusWindowRect']=Scene_Battle[_0x5d800b(0x124)]['statusWindowRect'],Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0xa1)]=function(){const _0x348c7f=_0x5d800b,_0x11e454=VisuMZ['SideviewBattleUI'][_0x348c7f(0x18a)][_0x348c7f(0x142)](this);return BattleManager[_0x348c7f(0xea)]()&&(_0x11e454['y']=Graphics[_0x348c7f(0x12b)]*0xa,_0x11e454[_0x348c7f(0x12b)]=0x0),_0x11e454;},VisuMZ[_0x5d800b(0x130)]['Scene_Battle_actorWindowRect']=Scene_Battle['prototype']['actorWindowRect'],Scene_Battle['prototype']['actorWindowRect']=function(){const _0x6bd4a2=_0x5d800b,_0x5ae6d2=VisuMZ[_0x6bd4a2(0x130)]['Scene_Battle_actorWindowRect'][_0x6bd4a2(0x142)](this);return BattleManager[_0x6bd4a2(0xea)]()&&(_0x5ae6d2['y']=Graphics[_0x6bd4a2(0x12b)]*0xa,_0x5ae6d2[_0x6bd4a2(0x12b)]=0x0),_0x5ae6d2;},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0xf2)]=Scene_Battle['prototype'][_0x5d800b(0x1b2)],Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0x1b2)]=function(){const _0x1ff973=_0x5d800b;VisuMZ[_0x1ff973(0x130)][_0x1ff973(0xf2)]['call'](this),this[_0x1ff973(0x15c)]();},Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0x15c)]=function(){const _0x2ff7be=_0x5d800b;if(!BattleManager['isInputting']())return;if(!BattleManager[_0x2ff7be(0xea)]())return;this[_0x2ff7be(0x1a0)][_0x2ff7be(0x109)]&&this[_0x2ff7be(0x1a0)]['updateSideviewUiPosition'](),this[_0x2ff7be(0x19f)][_0x2ff7be(0x109)]&&this[_0x2ff7be(0x19f)][_0x2ff7be(0x1c4)](),this[_0x2ff7be(0x1bd)][_0x2ff7be(0x109)]&&(this[_0x2ff7be(0x19f)][_0x2ff7be(0x1c4)](),this[_0x2ff7be(0x1bd)][_0x2ff7be(0x1c4)]()),this[_0x2ff7be(0x102)][_0x2ff7be(0x109)]&&(this[_0x2ff7be(0x19f)]['updateSideviewUiPosition'](),this['_itemWindow']['updateSideviewUiPosition']()),this[_0x2ff7be(0xa8)][_0x2ff7be(0x109)]&&(this[_0x2ff7be(0x19f)][_0x2ff7be(0xd1)](),this[_0x2ff7be(0x1bd)][_0x2ff7be(0xd1)](),this[_0x2ff7be(0x102)][_0x2ff7be(0xd1)]()),this[_0x2ff7be(0x1bc)][_0x2ff7be(0x109)]&&(this[_0x2ff7be(0x19f)][_0x2ff7be(0xd1)](),this[_0x2ff7be(0x1bd)][_0x2ff7be(0xd1)](),this[_0x2ff7be(0x102)][_0x2ff7be(0xd1)]());},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x14a)]=Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0xef)],Scene_Battle[_0x5d800b(0x124)]['createStatusWindow']=function(){const _0x394240=_0x5d800b;VisuMZ[_0x394240(0x130)][_0x394240(0x14a)]['call'](this),this[_0x394240(0xab)]();},Scene_Battle['prototype'][_0x5d800b(0xab)]=function(){const _0x398689=_0x5d800b;if(!BattleManager[_0x398689(0xea)]())return;this[_0x398689(0xb7)]=[];const _0x58239d=$gameParty['maxBattleMembers']();for(let _0x390cc0=0x0;_0x390cc0<_0x58239d;_0x390cc0++){const _0xa478e0=new Window_SideviewUiBattleStatus(_0x390cc0);this[_0x398689(0x11d)](_0xa478e0),this[_0x398689(0xb7)][_0x398689(0x197)](_0xa478e0);}},Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0x1bb)]=function(){const _0x20ee86=_0x5d800b;if(!this[_0x20ee86(0xb7)])return;for(const _0x1890b8 of this[_0x20ee86(0xb7)]){if(_0x20ee86(0xa0)===_0x20ee86(0xa0)){if(!_0x1890b8)continue;_0x1890b8[_0x20ee86(0xcc)]();}else this[_0x20ee86(0x153)]();}},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x199)]=Scene_Battle[_0x5d800b(0x124)]['createCancelButton'],Scene_Battle[_0x5d800b(0x124)][_0x5d800b(0xbf)]=function(){const _0x1db833=_0x5d800b;if(BattleManager[_0x1db833(0xea)]())return;VisuMZ['SideviewBattleUI'][_0x1db833(0x199)][_0x1db833(0x142)](this);},Sprite_Battler[_0x5d800b(0xb3)]=VisuMZ['SideviewBattleUI']['Settings'][_0x5d800b(0xe7)][_0x5d800b(0xad)]??!![],Sprite_Battler['SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X']=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xe7)]['OffsetX']??0x0,Sprite_Battler[_0x5d800b(0x150)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['Battler'][_0x5d800b(0x1b3)]??0x80,VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x171)]=Sprite_Battler[_0x5d800b(0x124)][_0x5d800b(0xd3)],Sprite_Battler['prototype']['setHome']=function(_0x427054,_0x496a12){const _0x18c8da=_0x5d800b;BattleManager[_0x18c8da(0xea)]()&&Sprite_Battler['SIDEVIEW_BATTLE_UI_MOVE_BATTLERS']&&(_0x427054+=Sprite_Battler[_0x18c8da(0x17b)],_0x496a12+=Sprite_Battler[_0x18c8da(0x150)]),VisuMZ[_0x18c8da(0x130)]['Sprite_Battler_setHome']['call'](this,_0x427054,_0x496a12);},Window_Base[_0x5d800b(0xdb)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0x1a3)]??0.8,Window_Base[_0x5d800b(0x121)]=0x0,Window_Base[_0x5d800b(0x1b5)]=0x0,Window_Base[_0x5d800b(0x124)][_0x5d800b(0xcb)]=function(){const _0x2e4964=_0x5d800b;if(!this[_0x2e4964(0xea)]())return;const _0x543061=Window_Base[_0x2e4964(0xdb)];this[_0x2e4964(0x187)]['x']=this['scale']['y']=_0x543061;},Window_Base[_0x5d800b(0x124)][_0x5d800b(0xea)]=function(){const _0x388829=_0x5d800b;return BattleManager[_0x388829(0xea)]();},Window_Base[_0x5d800b(0x124)][_0x5d800b(0xdd)]=function(){const _0x2cede1=_0x5d800b;if(!this[_0x2cede1(0xea)]())return;const _0x566bd0=this[_0x2cede1(0x187)]['x'],_0x532ba6=-(Math['floor'](Graphics[_0x2cede1(0x100)]-Graphics[_0x2cede1(0x16e)])/0x2),_0x30a70f=_0x532ba6+Graphics[_0x2cede1(0x100)]-Math[_0x2cede1(0x1c0)](this[_0x2cede1(0x100)]*_0x566bd0),_0x3c7cf2=-(Math[_0x2cede1(0x1a7)](Graphics[_0x2cede1(0x12b)]-Graphics['boxHeight'])/0x2),_0x54e230=_0x3c7cf2+Graphics['height']-Math[_0x2cede1(0x1c0)](this[_0x2cede1(0x12b)]*_0x566bd0);this['x']=this['x']['clamp'](_0x532ba6,_0x30a70f),this['y']=this['y']['clamp'](_0x3c7cf2,_0x54e230);},Window_Base[_0x5d800b(0x124)][_0x5d800b(0xe1)]=function(){const _0x2aee=_0x5d800b;return BattleManager[_0x2aee(0x165)]||$gameParty['aliveMembers']()[0x0];},Window_Base[_0x5d800b(0x124)][_0x5d800b(0x1c4)]=function(){const _0x5c9a7c=_0x5d800b;if(!this[_0x5c9a7c(0xea)]())return;const _0x2fbb85=this[_0x5c9a7c(0xe1)]();if(!_0x2fbb85)return;const _0x3331ed=_0x2fbb85[_0x5c9a7c(0x170)]();this['x']=_0x3331ed['x']+Math[_0x5c9a7c(0x141)](_0x3331ed[_0x5c9a7c(0x100)]/0x2),this['x']-=Math[_0x5c9a7c(0x141)]((Graphics[_0x5c9a7c(0x100)]-Graphics['boxWidth'])/0x2),this['x']+=SceneManager['_scene'][_0x5c9a7c(0xb9)][_0x5c9a7c(0x1c7)]['x'],this['x']+=this['sideviewUiPositionOffsetX'](),this['y']=_0x3331ed['y']-_0x3331ed[_0x5c9a7c(0x12b)],this['y']-=Math[_0x5c9a7c(0x141)]((Graphics['height']-Graphics['boxHeight'])/0x2),this['y']+=SceneManager[_0x5c9a7c(0x138)][_0x5c9a7c(0xb9)][_0x5c9a7c(0x1c7)]['y'],this['y']+=this[_0x5c9a7c(0x182)](),this['clampSideviewUiPlacementPosition'](),this[_0x5c9a7c(0x147)]();},Window_Base['prototype'][_0x5d800b(0x107)]=function(){return Window_Base['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X'];},Window_Base[_0x5d800b(0x124)][_0x5d800b(0x182)]=function(){const _0x212fd1=_0x5d800b;return Window_Base[_0x212fd1(0x1b5)];},Window_Base[_0x5d800b(0x124)]['adjustSideviewUiWidth']=function(){const _0x5c54ef=_0x5d800b;if(!this['isUsingSideviewUiLayout']())return;const _0x17a13c=this['width'];this['width']=this['sideviewUiWidth'](),_0x17a13c!==this[_0x5c54ef(0x100)]&&(_0x5c54ef(0xa3)!==_0x5c54ef(0x14f)?this[_0x5c54ef(0x143)]():this[_0x5c54ef(0xbd)](0x1));},Window_Base[_0x5d800b(0x124)][_0x5d800b(0x110)]=function(){const _0x45a259=_0x5d800b;return VisuMZ[_0x45a259(0x134)]['Settings'][_0x45a259(0x151)][_0x45a259(0x131)]||0xc0;},Window_Base[_0x5d800b(0x124)][_0x5d800b(0x106)]=function(){const _0x2d7d4a=_0x5d800b;if(!this[_0x2d7d4a(0xea)]())return;const _0x871acd=this[_0x2d7d4a(0x12b)],_0x390938=this[_0x2d7d4a(0xec)](),_0x2b5dee=this['fittingHeight'](_0x390938),_0x3b7e44=this[_0x2d7d4a(0xb6)](this['maxSideviewUiRows']());this[_0x2d7d4a(0x12b)]=Math[_0x2d7d4a(0x117)](_0x2b5dee,_0x3b7e44);if(_0x871acd!==this[_0x2d7d4a(0x12b)]){if(_0x2d7d4a(0x190)==='Yjnsa'){if(this['_battler']===_0x4525f5['actor']())return!![];if(this['_battler']===_0x557107[_0x2d7d4a(0xa9)])return!![];if(this[_0x2d7d4a(0xd7)][_0x2d7d4a(0x15a)]())return!![];return![];}else this[_0x2d7d4a(0x143)]();}},Window_Base[_0x5d800b(0x124)][_0x5d800b(0xec)]=function(){const _0x9fab2c=_0x5d800b;if(this[_0x9fab2c(0x118)])return this['_data'][_0x9fab2c(0x125)];if(this[_0x9fab2c(0x177)])return this[_0x9fab2c(0x177)][_0x9fab2c(0x125)];return 0x4;},Window_Base['prototype'][_0x5d800b(0x14e)]=function(){return 0x8;},Window_Base[_0x5d800b(0x124)][_0x5d800b(0x147)]=function(){const _0x887bb4=_0x5d800b;if(this[_0x887bb4(0x104)]&&!this[_0x887bb4(0x109)])return;this[_0x887bb4(0x10f)]=!![];},Window_Base['prototype'][_0x5d800b(0xd1)]=function(){const _0x25f9c0=_0x5d800b;this[_0x25f9c0(0x10f)]=![];},Window_Help['SIDEVIEW_BATTLE_UI_FADE_STYLE']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0x1d2)]['HelpFadeStyle']??!![],VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x1c6)]=Window_Help[_0x5d800b(0x124)][_0x5d800b(0x114)],Window_Help['prototype'][_0x5d800b(0x114)]=function(_0x28a204){const _0x37b50b=_0x5d800b;VisuMZ[_0x37b50b(0x130)][_0x37b50b(0x1c6)]['call'](this,_0x28a204),this[_0x37b50b(0xfe)]();},Window_Help[_0x5d800b(0x124)][_0x5d800b(0xfe)]=function(){const _0x338178=_0x5d800b;if(!this[_0x338178(0xea)]())return;if(!Window_Help[_0x338178(0xb2)])return;this['opacity']=0x0;!this[_0x338178(0xc5)]&&(this[_0x338178(0xc5)]=new Sprite(),this[_0x338178(0x11a)](this['_dimmerSprite']));const _0x9ae498=this['width']-Window_SideviewUiBattleStatus['WIDTH_BASE'],_0x41b597=this['lineHeight']()*0x2;this['_dimmerSprite'][_0x338178(0x1bf)]=new Bitmap(_0x9ae498,_0x41b597),this[_0x338178(0xc5)]['x']=-0x4,this[_0x338178(0xc5)]['y']=this[_0x338178(0x13a)];const _0x25d70c=this[_0x338178(0xc5)]['bitmap'],_0x461741=ColorManager[_0x338178(0xe3)](),_0x5719e6=ColorManager[_0x338178(0xb5)]();_0x25d70c[_0x338178(0x14d)](0x0,0x0,Math[_0x338178(0x141)](_0x9ae498/0x2),_0x41b597,_0x461741),_0x25d70c['gradientFillRect'](Math[_0x338178(0x141)](_0x9ae498/0x2),0x0,Math[_0x338178(0x141)](_0x9ae498/0x2),_0x41b597,_0x461741,_0x5719e6);},Window_ItemList['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0x19a)]??0x8,Window_ItemList[_0x5d800b(0xce)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0x135)]??0x190,Window_ItemList[_0x5d800b(0x121)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0x1d2)][_0x5d800b(0x1b0)]??0x10,Window_ItemList[_0x5d800b(0x1b5)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['GeneralWindow'][_0x5d800b(0xe0)]??0x10,VisuMZ[_0x5d800b(0x130)]['Window_ItemList_initialize']=Window_ItemList[_0x5d800b(0x124)]['initialize'],Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0x114)]=function(_0x167e15){const _0x138933=_0x5d800b;VisuMZ[_0x138933(0x130)][_0x138933(0x1d0)]['call'](this,_0x167e15),this[_0x138933(0xcb)]();},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x1ce)]=Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0xf1)],Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0xf1)]=function(){const _0x4a04ec=_0x5d800b;if(this[_0x4a04ec(0xea)]()){if(_0x4a04ec(0x139)!==_0x4a04ec(0xdf))return 0x1;else _0x511461=_0x509384[_0x4a04ec(0xbb)]*0x2,_0x2e083c+=this[_0x4a04ec(0x1a6)]()*this['autoRowCount'](),_0x56ed44=_0x1e2510['ceil'](_0x54f373*_0x25dd6f),_0xcb41c4/=_0x425e8a;}else return VisuMZ[_0x4a04ec(0x130)][_0x4a04ec(0x1ce)]['call'](this);},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0xe6)]=Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0x11e)],Window_ItemList[_0x5d800b(0x124)]['colSpacing']=function(){const _0x1fac5e=_0x5d800b;if(this[_0x1fac5e(0xea)]()){if(_0x1fac5e(0x105)===_0x1fac5e(0x105))return 0x0;else{if(!this[_0x1fac5e(0xea)]())return;const _0x417f90=this['height'],_0x2d6966=this[_0x1fac5e(0xec)](),_0x718b05=this[_0x1fac5e(0xb6)](_0x2d6966),_0x5a18ce=this[_0x1fac5e(0xb6)](this[_0x1fac5e(0x14e)]());this[_0x1fac5e(0x12b)]=_0x47a2d9[_0x1fac5e(0x117)](_0x718b05,_0x5a18ce),_0x417f90!==this['height']&&this[_0x1fac5e(0x143)]();}}else{if(_0x1fac5e(0xdc)!==_0x1fac5e(0xc8))return VisuMZ[_0x1fac5e(0x130)][_0x1fac5e(0xe6)][_0x1fac5e(0x142)](this);else{const _0xcadee3=_0x2f6a99[_0x3526ad];_0xcadee3[_0x1fac5e(0x187)]['x']=_0xcadee3['scale']['y']=0x1/this[_0x1fac5e(0x187)]['y'];}}},VisuMZ['SideviewBattleUI'][_0x5d800b(0x195)]=Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0xd5)],Window_ItemList[_0x5d800b(0x124)]['makeItemList']=function(){const _0x4037f6=_0x5d800b;VisuMZ[_0x4037f6(0x130)]['Window_ItemList_makeItemList'][_0x4037f6(0x142)](this),this['adjustSideviewUiWidth'](),this[_0x4037f6(0x106)](),this[_0x4037f6(0x1c4)]();},Window_ItemList[_0x5d800b(0x124)]['sideviewUiTargetActor']=function(){const _0x51702e=_0x5d800b;return this[_0x51702e(0x154)]||Window_Base[_0x51702e(0x124)]['sideviewUiTargetActor'][_0x51702e(0x142)](this);},Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0x110)]=function(){const _0x3ae847=_0x5d800b;return Window_ItemList[_0x3ae847(0xce)]||0xc0;},Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0x107)]=function(){const _0x3cfe8d=_0x5d800b;let _0x4b282f=Window_Selectable[_0x3cfe8d(0x124)]['sideviewUiPositionOffsetX'][_0x3cfe8d(0x142)](this);return _0x4b282f+Window_ItemList[_0x3cfe8d(0x121)];},Window_ItemList[_0x5d800b(0x124)][_0x5d800b(0x182)]=function(){const _0x561713=_0x5d800b;let _0x3a97af=Window_Selectable[_0x561713(0x124)][_0x561713(0x182)][_0x561713(0x142)](this);return _0x3a97af+Window_ItemList[_0x561713(0x1b5)];},Window_SkillList[_0x5d800b(0x18f)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0xcf)]??0x8,Window_SkillList['SIDEVIEW_BATTLE_UI_WINDOW_WIDTH']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0xf4)]??0x190,Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X']=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0x1b6)]??0x10,Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['GeneralWindow'][_0x5d800b(0x1d3)]??0x10,VisuMZ[_0x5d800b(0x130)]['Window_SkillList_initialize']=Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x114)],Window_SkillList['prototype'][_0x5d800b(0x114)]=function(_0xa7b989){const _0x171568=_0x5d800b;VisuMZ[_0x171568(0x130)]['Window_SkillList_initialize'][_0x171568(0x142)](this,_0xa7b989),this[_0x171568(0xcb)]();},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x1a1)]=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0xf1)]=function(){const _0x41019f=_0x5d800b;if(this[_0x41019f(0xea)]()){if(_0x41019f(0x1b1)!==_0x41019f(0x16b))return 0x1;else{if(this[_0x41019f(0xd7)]===this[_0x41019f(0x170)]())return;this[_0x41019f(0xd7)]=this[_0x41019f(0x170)](),this[_0x41019f(0xcc)](),this[_0x41019f(0xd7)]?this[_0x41019f(0xbd)](0x1):this['setBackgroundType'](0x2);}}else return VisuMZ[_0x41019f(0x130)]['Window_SkillList_maxCols'][_0x41019f(0x142)](this);},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x186)]=Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x11e)],Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x11e)]=function(){const _0xabd632=_0x5d800b;return this[_0xabd632(0xea)]()?0x0:VisuMZ[_0xabd632(0x130)][_0xabd632(0x186)][_0xabd632(0x142)](this);},VisuMZ['SideviewBattleUI']['Window_SkillList_makeItemList']=Window_SkillList['prototype'][_0x5d800b(0xd5)],Window_SkillList['prototype'][_0x5d800b(0xd5)]=function(){const _0x2081f0=_0x5d800b;VisuMZ[_0x2081f0(0x130)]['Window_SkillList_makeItemList']['call'](this),this[_0x2081f0(0x15f)](),this[_0x2081f0(0x106)](),this[_0x2081f0(0x1c4)]();},Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0xe1)]=function(){const _0x5a50af=_0x5d800b;return this[_0x5a50af(0x154)]||Window_Base[_0x5a50af(0x124)][_0x5a50af(0xe1)][_0x5a50af(0x142)](this);},Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x110)]=function(){const _0x12e6ef=_0x5d800b;return Window_SkillList[_0x12e6ef(0xce)]||0xc0;},Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x107)]=function(){const _0x1f5682=_0x5d800b;let _0x2e2ed7=Window_Selectable[_0x1f5682(0x124)][_0x1f5682(0x107)]['call'](this);return _0x2e2ed7+Window_SkillList[_0x1f5682(0x121)];},Window_SkillList[_0x5d800b(0x124)][_0x5d800b(0x182)]=function(){const _0x7923e9=_0x5d800b;let _0x285a1b=Window_Selectable['prototype'][_0x7923e9(0x182)][_0x7923e9(0x142)](this);return _0x285a1b+Window_SkillList[_0x7923e9(0x1b5)];},Window_BattleSkill[_0x5d800b(0x124)][_0x5d800b(0x14e)]=function(){const _0x4e4185=_0x5d800b;return Window_SkillList[_0x4e4185(0x18f)];},Window_BattleItem['prototype']['maxSideviewUiRows']=function(){const _0x18ec41=_0x5d800b;return Window_ItemList[_0x18ec41(0x18f)];},Window_PartyCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['GeneralWindow'][_0x5d800b(0x15d)]??0x8,VisuMZ[_0x5d800b(0x130)]['Window_PartyCommand_initialize']=Window_PartyCommand[_0x5d800b(0x124)][_0x5d800b(0x114)],Window_PartyCommand['prototype'][_0x5d800b(0x114)]=function(_0x4fb4e2){const _0x290288=_0x5d800b;VisuMZ['SideviewBattleUI'][_0x290288(0xed)]['call'](this,_0x4fb4e2),this[_0x290288(0xcb)]();},VisuMZ[_0x5d800b(0x130)][_0x5d800b(0xf5)]=Window_PartyCommand[_0x5d800b(0x124)][_0x5d800b(0x1cf)],Window_PartyCommand[_0x5d800b(0x124)][_0x5d800b(0x1cf)]=function(){const _0x48ae31=_0x5d800b;VisuMZ[_0x48ae31(0x130)][_0x48ae31(0xf5)]['call'](this),this[_0x48ae31(0x15f)](),this[_0x48ae31(0x106)]();},Window_PartyCommand['prototype']['sideviewUiTargetActor']=function(){return $gameParty['aliveMembers']()[0x0];},Window_PartyCommand[_0x5d800b(0x124)]['maxSideviewUiRows']=function(){const _0xe6a82c=_0x5d800b;return Window_PartyCommand[_0xe6a82c(0x18f)];},Window_ActorCommand[_0x5d800b(0x18f)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0x1d2)][_0x5d800b(0x175)]??0x8,VisuMZ['SideviewBattleUI']['Window_ActorCommand_initialize']=Window_ActorCommand[_0x5d800b(0x124)][_0x5d800b(0x114)],Window_ActorCommand['prototype'][_0x5d800b(0x114)]=function(_0x5890f0){const _0x2d1027=_0x5d800b;VisuMZ[_0x2d1027(0x130)][_0x2d1027(0x12e)][_0x2d1027(0x142)](this,_0x5890f0),this[_0x2d1027(0xcb)]();},VisuMZ['SideviewBattleUI']['Window_ActorCommand_makeCommandList']=Window_ActorCommand['prototype']['makeCommandList'],Window_ActorCommand[_0x5d800b(0x124)][_0x5d800b(0x1cf)]=function(){const _0x534b66=_0x5d800b;VisuMZ[_0x534b66(0x130)][_0x534b66(0x173)][_0x534b66(0x142)](this),this[_0x534b66(0x15f)](),this[_0x534b66(0x106)](),this[_0x534b66(0x1c4)]();},Window_ActorCommand[_0x5d800b(0x124)][_0x5d800b(0xe1)]=function(){const _0x10277d=_0x5d800b;return this['_actor']||Window_Base[_0x10277d(0x124)]['sideviewUiTargetActor']['call'](this);},Window_ActorCommand[_0x5d800b(0x124)][_0x5d800b(0x14e)]=function(){const _0x2a1f82=_0x5d800b;return Window_ActorCommand[_0x2a1f82(0x18f)];},VisuMZ['SideviewBattleUI'][_0x5d800b(0xc7)]=Window_BattleStatus[_0x5d800b(0x124)][_0x5d800b(0x10d)],Window_BattleStatus[_0x5d800b(0x124)][_0x5d800b(0x10d)]=function(){const _0x4b8c2f=_0x5d800b;if(this[_0x4b8c2f(0xea)]()){if('NDPCo'!=='EgrTd')this[_0x4b8c2f(0x153)]();else{const _0x32a457=_0x1bd23a(_0x3609bd['$1']);_0x32a457!==_0x10bedb[_0x16529b][_0x4b8c2f(0xf7)]&&(_0x17b9a5('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4b8c2f(0xa4)](_0x79e6cb,_0x32a457)),_0x4baefb[_0x4b8c2f(0xb0)]());}}else VisuMZ['SideviewBattleUI'][_0x4b8c2f(0xc7)][_0x4b8c2f(0x142)](this);},Window_BattleStatus['prototype']['updateRefreshSideviewUi']=function(){const _0x20da77=_0x5d800b;if($gameTemp['isBattleRefreshRequested']())this[_0x20da77(0x148)]=![],$gameTemp[_0x20da77(0x127)](),SceneManager['_scene']['refreshSideviewUiBattleStatusWindows']();else{if(this[_0x20da77(0x148)]){if(_0x20da77(0x1ca)===_0x20da77(0x1c8)){if(this['activate']&&!this[_0x20da77(0x109)])return;this[_0x20da77(0x10f)]=!![];}else this[_0x20da77(0x148)]=![],SceneManager[_0x20da77(0x138)][_0x20da77(0x1bb)]();}}};function Window_SideviewUiBattleStatus(){const _0x3c1c45=_0x5d800b;this[_0x3c1c45(0x114)](...arguments);}function _0x50a2(_0x1bde9b,_0x14514f){return _0x50a2=function(_0x43f177,_0x50a225){_0x43f177=_0x43f177-0x9d;let _0x3a73d8=_0x43f1[_0x43f177];return _0x3a73d8;},_0x50a2(_0x1bde9b,_0x14514f);}Window_SideviewUiBattleStatus[_0x5d800b(0x124)]=Object['create'](Window_StatusBase[_0x5d800b(0x124)]),Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0xba)]=Window_SideviewUiBattleStatus,Window_SideviewUiBattleStatus[_0x5d800b(0xa6)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0x18e)]??0xc8,Window_SideviewUiBattleStatus[_0x5d800b(0x1c9)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0x145)]??'auto',Window_SideviewUiBattleStatus[_0x5d800b(0xbb)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x116)]??0x4,Window_SideviewUiBattleStatus[_0x5d800b(0xeb)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x1a8)]??0x30,Window_SideviewUiBattleStatus['MOVE_SPEED']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x174)]??0x4,Window_SideviewUiBattleStatus[_0x5d800b(0x122)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['NameShow']??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x192)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x1ab)]??0x30,Window_SideviewUiBattleStatus[_0x5d800b(0x112)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)]['NameOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x5d800b(0x17c)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x12c)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x1ad)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0xa5)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x1c1)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0x126)]??0x14,Window_SideviewUiBattleStatus[_0x5d800b(0x113)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['StatesOffsetY']??0x14,Window_SideviewUiBattleStatus[_0x5d800b(0x120)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['TpbShow']??!![],Window_SideviewUiBattleStatus['TPB_OFFSET_X']=VisuMZ[_0x5d800b(0x130)]['Settings']['StatusWindow'][_0x5d800b(0x123)]??0x2c,Window_SideviewUiBattleStatus[_0x5d800b(0xee)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['StatusWindow'][_0x5d800b(0x191)]??0x0,Window_SideviewUiBattleStatus[_0x5d800b(0xfa)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0xbe)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0xff)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['HpOffsetX']??0x3c,Window_SideviewUiBattleStatus[_0x5d800b(0x1be)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0xf9)]??0x0,Window_SideviewUiBattleStatus[_0x5d800b(0x160)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['StatusWindow'][_0x5d800b(0x12d)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x17e)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['StatusWindow'][_0x5d800b(0xd6)]??0x44,Window_SideviewUiBattleStatus[_0x5d800b(0x17f)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['MpOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x5d800b(0x17a)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x1cb)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x179)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['TpOffsetX']??0x4a,Window_SideviewUiBattleStatus[_0x5d800b(0x159)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['TpOffsetY']??0x0,Window_SideviewUiBattleStatus['AGGRO_SHOWN']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0xc2)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0xe5)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0xe8)]??0x2c,Window_SideviewUiBattleStatus[_0x5d800b(0x18c)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0xd0)]??0x0,Window_SideviewUiBattleStatus['BOOST_SHOWN']=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['BoostShow']??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x140)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['BoostOffsetX']??0x34,Window_SideviewUiBattleStatus[_0x5d800b(0x13f)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)]['BoostOffsetY']??0x2,Window_SideviewUiBattleStatus[_0x5d800b(0x19c)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x13c)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x194)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)][_0x5d800b(0x1cd)]??0x34,Window_SideviewUiBattleStatus[_0x5d800b(0x1b4)]=VisuMZ[_0x5d800b(0x130)]['Settings'][_0x5d800b(0xbc)]['BraveOffsetY']??-0x6,Window_SideviewUiBattleStatus[_0x5d800b(0x16a)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x176)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x1c2)]=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x144)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x1b7)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)][_0x5d800b(0xbc)]['BreakShieldOffsetX']??0x14,Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_Y']=VisuMZ['SideviewBattleUI'][_0x5d800b(0x188)][_0x5d800b(0xbc)][_0x5d800b(0x12a)]??0x14,Window_SideviewUiBattleStatus[_0x5d800b(0x136)]=VisuMZ[_0x5d800b(0x130)][_0x5d800b(0x188)]['StatusWindow'][_0x5d800b(0x13d)]??!![],Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x114)]=function(_0x28c768){const _0x5de5f5=_0x5d800b;this[_0x5de5f5(0x12f)]=_0x28c768;const _0x465531=this['createWindowRect']();Window_StatusBase[_0x5de5f5(0x124)]['initialize'][_0x5de5f5(0x142)](this,_0x465531),this[_0x5de5f5(0xcb)](),this['setBackgroundType'](0x2);},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x16d)]=function(){const _0x2cd1ac=_0x5d800b,_0x3904f6=Window_Base['SIDEVIEW_BATTLE_UI_SCALE'];let _0x360244=Window_SideviewUiBattleStatus['WIDTH_BASE'],_0x1242b4=Graphics['boxWidth']-_0x360244;_0x1242b4+=Math[_0x2cd1ac(0x1c0)]((Graphics[_0x2cd1ac(0x100)]-Graphics[_0x2cd1ac(0x16e)])/0x2),_0x360244/=_0x3904f6,_0x360244=Math['ceil'](_0x360244),_0x360244+=Math[_0x2cd1ac(0x1c0)](Window_SideviewUiBattleStatus[_0x2cd1ac(0xeb)]*0x4/_0x3904f6);let _0x51d1cb=Window_SideviewUiBattleStatus[_0x2cd1ac(0x1c9)];_0x51d1cb==='auto'?(_0x51d1cb=Window_SideviewUiBattleStatus[_0x2cd1ac(0xbb)]*0x2,_0x51d1cb+=this[_0x2cd1ac(0x1a6)]()*this[_0x2cd1ac(0x1a4)](),_0x51d1cb=Math['ceil'](_0x51d1cb*_0x3904f6),_0x51d1cb/=_0x3904f6):_0x51d1cb=eval(_0x51d1cb)||0x0;let _0xc0cf93=Math[_0x2cd1ac(0x1c0)](_0x51d1cb*_0x3904f6)*this[_0x2cd1ac(0x12f)];return _0xc0cf93-=Math[_0x2cd1ac(0x1c0)]((Graphics[_0x2cd1ac(0x12b)]-Graphics[_0x2cd1ac(0x1af)])/0x2),this[_0x2cd1ac(0x1c5)]=_0x1242b4,this[_0x2cd1ac(0x163)]=this[_0x2cd1ac(0x1c5)]-Math[_0x2cd1ac(0x1c0)](Window_SideviewUiBattleStatus['WIDTH_MOVE']/_0x3904f6),this['_targetX']=this[_0x2cd1ac(0x1c5)],new Rectangle(_0x1242b4,_0xc0cf93,_0x360244,_0x51d1cb);},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x1a4)]=function(){const _0x1217c5=_0x5d800b;let _0x42f253=0x0;if(Window_SideviewUiBattleStatus[_0x1217c5(0x122)])_0x42f253+=0x1;if(Window_SideviewUiBattleStatus[_0x1217c5(0xfa)])_0x42f253+=0x1;if(Window_SideviewUiBattleStatus[_0x1217c5(0x160)])_0x42f253+=0x1;if(Window_SideviewUiBattleStatus[_0x1217c5(0x17a)])_0x42f253+=0x1;if(this[_0x1217c5(0x9f)]())_0x42f253+=0x1;if(this[_0x1217c5(0x166)]())_0x42f253+=0x1;return _0x42f253||0x1;},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0xca)]=function(){const _0x11b500=_0x5d800b;this[_0x11b500(0x13a)]=0x0;},Window_SideviewUiBattleStatus[_0x5d800b(0x124)]['refreshDimmerBitmap']=function(){const _0x57cafc=_0x5d800b;if(!this[_0x57cafc(0xc5)])return;const _0x20eddb=this[_0x57cafc(0xc5)][_0x57cafc(0x1bf)];var _0x2b6425=ColorManager['dimColor1'](),_0x56502c=ColorManager['dimColor2'](),_0x16379e=Math[_0x57cafc(0x1c0)](this['width']/0x4),_0x11d076=this[_0x57cafc(0x100)]-_0x16379e,_0x4da838=this[_0x57cafc(0x12b)];_0x20eddb[_0x57cafc(0x16f)](this['width'],_0x4da838),_0x20eddb['gradientFillRect'](0x0,0x0,_0x16379e,_0x4da838,_0x56502c,_0x2b6425),_0x20eddb[_0x57cafc(0x14d)](_0x16379e,0x0,_0x11d076,_0x4da838,_0x2b6425),this['_dimmerSprite']['setFrame'](0x0,0x0,_0x11d076,_0x4da838);},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0x108)]=function(){const _0x4aefcd=_0x5d800b;Window_StatusBase[_0x4aefcd(0x124)][_0x4aefcd(0x108)][_0x4aefcd(0x142)](this),this[_0x4aefcd(0x193)](),this[_0x4aefcd(0x16c)]();},Window_SideviewUiBattleStatus['prototype']['battler']=function(){const _0x407318=_0x5d800b;return $gameParty[_0x407318(0x169)]()[this[_0x407318(0x12f)]];},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x193)]=function(){const _0x2f26d4=_0x5d800b;if(this[_0x2f26d4(0xd7)]===this[_0x2f26d4(0x170)]())return;this[_0x2f26d4(0xd7)]=this[_0x2f26d4(0x170)](),this[_0x2f26d4(0xcc)]();if(this[_0x2f26d4(0xd7)]){if('JFZql'===_0x2f26d4(0x129)){let _0x34d669=_0x31e05c+_0x2c7b72[_0x2f26d4(0x1ae)],_0x5cdbde=_0x313370+_0x2ded15[_0x2f26d4(0xee)];this[_0x2f26d4(0x149)](_0x328dd8,_0x34d669,_0x5cdbde);}else this[_0x2f26d4(0xbd)](0x1);}else this[_0x2f26d4(0xbd)](0x2);},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x16c)]=function(){const _0x9c231=_0x5d800b;if(!this[_0x9c231(0xd7)])return;this[_0x9c231(0xc4)]=this[_0x9c231(0x19e)]()?this['_activeX']:this[_0x9c231(0x1c5)];const _0x5b9cdb=Window_SideviewUiBattleStatus['MOVE_SPEED'];if(this[_0x9c231(0xc4)]>this['x'])this['x']=Math['min'](this['x']+_0x5b9cdb,this[_0x9c231(0xc4)]);else this['_targetX']<this['x']&&('uBUWW'==='uBUWW'?this['x']=Math[_0x9c231(0xde)](this['x']-_0x5b9cdb,this[_0x9c231(0xc4)]):(this[_0x9c231(0x19f)]['updateSideviewUiFadeOut'](),this[_0x9c231(0x1bd)][_0x9c231(0xd1)](),this[_0x9c231(0x102)]['updateSideviewUiFadeOut']()));},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x19e)]=function(){const _0x2a5e8d=_0x5d800b;if(this['_battler']===BattleManager[_0x2a5e8d(0x9e)]())return!![];if(this['_battler']===BattleManager[_0x2a5e8d(0xa9)])return!![];if(this[_0x2a5e8d(0xd7)]['isSelected']())return!![];return![];},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0x115)]=function(){const _0x2b7855=_0x5d800b;return Window_SideviewUiBattleStatus[_0x2b7855(0x136)];},Window_SideviewUiBattleStatus[_0x5d800b(0x124)]['getStateTooltipBattler']=function(){const _0x2bef32=_0x5d800b;return this[_0x2bef32(0xd7)];},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0x19b)]=function(){const _0x57e95b=_0x5d800b,_0x51de73=new Point(TouchInput['x'],TouchInput['y']),_0x363967=this[_0x57e95b(0x11c)][_0x57e95b(0x1a2)](_0x51de73);return this[_0x57e95b(0x178)][_0x57e95b(0x168)](_0x363967['x'],_0x363967['y']);},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0xfd)]=function(){const _0x5006e9=_0x5d800b;this[_0x5006e9(0xf6)]();if(!this[_0x5006e9(0xd7)])return;this[_0x5006e9(0xc6)](),this[_0x5006e9(0x1b8)]();},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0xc6)]=function(){const _0x2f6a67=_0x5d800b,_0x555bc6=this[_0x2f6a67(0xd7)];let _0x47cf57=0x4,_0x1a6161=Window_SideviewUiBattleStatus['HEIGHT_BUFFER'];if(Imported[_0x2f6a67(0xaf)]&&Window_SideviewUiBattleStatus[_0x2f6a67(0x16a)]){if('jZoix'===_0x2f6a67(0x103)){const _0x21c136=_0x4639ea[_0x2f6a67(0x1c0)](_0x40679c[_0x2f6a67(0x183)]*_0x1dd3c7[_0x2f6a67(0x1ba)]);let _0x58f5b6=_0x2e44c0+_0x4d8737[_0x2f6a67(0x140)],_0x3a8b2b=_0x727960+_0x383665[_0x2f6a67(0x13f)];_0x3a8b2b+=_0x10384b['max'](0x0,_0x860bb0['round']((this[_0x2f6a67(0x1a6)]()-_0x21c136)/0x2)),this['placeBoostPoints'](_0x38f48f,_0x58f5b6,_0x3a8b2b),_0x43048e+=this['gaugeLineHeight']();}else{let _0xd30e2=_0x47cf57+Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_X'],_0x83f99=_0x1a6161+Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_Y'];this[_0x2f6a67(0x133)](_0x555bc6,_0xd30e2,_0x83f99);if(Window_SideviewUiBattleStatus[_0x2f6a67(0x1ad)]){if(_0x2f6a67(0xc9)===_0x2f6a67(0xc9)){const _0x46ebbb=_0x2f6a67(0x10e)[_0x2f6a67(0xa4)](_0x555bc6[_0x2f6a67(0xe4)]()),_0x34be53=this[_0x2f6a67(0x18b)];if(_0x34be53[_0x46ebbb]){if(_0x2f6a67(0xa7)!==_0x2f6a67(0x196)){const _0x5045b8=_0x34be53[_0x46ebbb];_0x5045b8[_0x2f6a67(0x187)]['x']=_0x5045b8['scale']['y']=0x1/this['scale']['y'];}else return![];};}else return _0x104147[_0x2f6a67(0x121)];}}}if(Window_SideviewUiBattleStatus['STATES_SHOWN']){let _0x3c7ae6=_0x47cf57+Window_SideviewUiBattleStatus['STATES_OFFSET_X'],_0x3d1b2e=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x113)];if(Imported[_0x2f6a67(0xaf)]&&Window_SideviewUiBattleStatus[_0x2f6a67(0x16a)]){if('TXNPu'!=='TXNPu'){const _0x54e771=new _0x5cc076(_0x186bc9['x'],_0x5c2e65['y']),_0x583dd1=this[_0x2f6a67(0x11c)]['applyInverse'](_0x54e771);return this[_0x2f6a67(0x178)][_0x2f6a67(0x168)](_0x583dd1['x'],_0x583dd1['y']);}else{if(Window_SideviewUiBattleStatus[_0x2f6a67(0x1c2)]){if(_0x2f6a67(0x167)==='THIMa')_0x3d1b2e+=Math[_0x2f6a67(0x1c0)](ImageManager['iconHeight']/this[_0x2f6a67(0x187)]['y']);else{if(!this[_0x2f6a67(0xea)]())return;const _0x5e3781=this[_0x2f6a67(0x187)]['x'],_0xabf34a=-(_0x1d9fb3[_0x2f6a67(0x1a7)](_0x25a0de[_0x2f6a67(0x100)]-_0x36bf09[_0x2f6a67(0x16e)])/0x2),_0x44c95c=_0xabf34a+_0x3b4287[_0x2f6a67(0x100)]-_0x3cdc46[_0x2f6a67(0x1c0)](this[_0x2f6a67(0x100)]*_0x5e3781),_0x421eed=-(_0x454869['floor'](_0x189028[_0x2f6a67(0x12b)]-_0x412826[_0x2f6a67(0x1af)])/0x2),_0x12eb64=_0x421eed+_0x57c4ca[_0x2f6a67(0x12b)]-_0x4c66d6[_0x2f6a67(0x1c0)](this[_0x2f6a67(0x12b)]*_0x5e3781);this['x']=this['x']['clamp'](_0xabf34a,_0x44c95c),this['y']=this['y'][_0x2f6a67(0xf0)](_0x421eed,_0x12eb64);}}else _0x3d1b2e+=ImageManager[_0x2f6a67(0x183)];_0x3d1b2e+=0x4;}}this['placeStateIcon'](_0x555bc6,_0x3c7ae6,_0x3d1b2e);if(Window_SideviewUiBattleStatus[_0x2f6a67(0x1ad)]){if('QjjyD'===_0x2f6a67(0x146)){const _0x7eb786='actor%1-stateIcon'[_0x2f6a67(0xa4)](_0x555bc6[_0x2f6a67(0xe4)]()),_0x2c3297=this[_0x2f6a67(0x18b)];if(_0x2c3297[_0x7eb786]){const _0x2bed0f=_0x2c3297[_0x7eb786];_0x2bed0f[_0x2f6a67(0x187)]['x']=_0x2bed0f[_0x2f6a67(0x187)]['y']=0x1/this[_0x2f6a67(0x187)]['y'];};}else return 0x1;}}if(this[_0x2f6a67(0xe2)]()){let _0x587e41=_0x47cf57+Window_SideviewUiBattleStatus[_0x2f6a67(0x1ae)],_0x7d8f21=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0xee)];this[_0x2f6a67(0x149)](_0x555bc6,_0x587e41,_0x7d8f21);}if(this[_0x2f6a67(0x162)]()){if(_0x2f6a67(0xf8)!=='TZNEn')this[_0x2f6a67(0xea)]()?this['updateRefreshSideviewUi']():_0x2a39ab['SideviewBattleUI'][_0x2f6a67(0xc7)]['call'](this);else{let _0x3ce559=_0x47cf57+Window_SideviewUiBattleStatus['AGGRO_OFFSET_X'],_0x20a21b=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x18c)];this[_0x2f6a67(0xe2)]()&&(_0x20a21b-=Sprite_Gauge['prototype'][_0x2f6a67(0x155)]()-0x1),this['placeAggroGauge'](_0x555bc6,_0x3ce559,_0x20a21b);}}if(Window_SideviewUiBattleStatus[_0x2f6a67(0x122)]){let _0x3ddc88=_0x47cf57+Window_SideviewUiBattleStatus[_0x2f6a67(0x192)],_0x260699=_0x1a6161+Window_SideviewUiBattleStatus['NAME_OFFSET_Y'];this['placeActorName'](_0x555bc6,_0x3ddc88,_0x260699);}(Window_SideviewUiBattleStatus[_0x2f6a67(0x122)]||this[_0x2f6a67(0xe2)]()||this[_0x2f6a67(0x162)]())&&(_0x1a6161+=this[_0x2f6a67(0x1a6)]());if(this[_0x2f6a67(0x9f)]()){if(_0x2f6a67(0x10b)===_0x2f6a67(0x10b)){const _0x231efd=Math[_0x2f6a67(0x1c0)](ImageManager['iconHeight']*Sprite_BoostContainer[_0x2f6a67(0x1ba)]);let _0x176116=_0x47cf57+Window_SideviewUiBattleStatus['BOOST_OFFSET_X'],_0x377f84=_0x1a6161+Window_SideviewUiBattleStatus['BOOST_OFFSET_Y'];_0x377f84+=Math['max'](0x0,Math['round']((this[_0x2f6a67(0x1a6)]()-_0x231efd)/0x2)),this[_0x2f6a67(0x128)](_0x555bc6,_0x176116,_0x377f84),_0x1a6161+=this[_0x2f6a67(0x1a6)]();}else _0x57e820[_0x2f6a67(0x130)]['Scene_Battle_updateStatusWindowPosition'][_0x2f6a67(0x142)](this),this[_0x2f6a67(0x15c)]();}if(this[_0x2f6a67(0x166)]()){let _0x23661c=_0x47cf57+Window_SideviewUiBattleStatus[_0x2f6a67(0x194)],_0x4fd431=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x1b4)],_0x103180=Math[_0x2f6a67(0x1c0)](Window_SideviewUiBattleStatus[_0x2f6a67(0xa6)]/this['scale']['x']);this[_0x2f6a67(0x11b)](_0x555bc6,_0x23661c,_0x4fd431,_0x103180,_0x2f6a67(0x152)),_0x1a6161+=this[_0x2f6a67(0x1a6)]();}if(Window_SideviewUiBattleStatus[_0x2f6a67(0xfa)]){if('ZvUIJ'!==_0x2f6a67(0x18d)){let _0x32d23b=_0x47cf57+Window_SideviewUiBattleStatus['HP_GAUGE_OFFSET_X'],_0x49dccf=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x1be)];this[_0x2f6a67(0x14b)](_0x555bc6,'hp',_0x32d23b,_0x49dccf),_0x1a6161+=this[_0x2f6a67(0x1a6)]();}else return 0x8;}if(Window_SideviewUiBattleStatus[_0x2f6a67(0x160)]){let _0x28b4be=_0x47cf57+Window_SideviewUiBattleStatus[_0x2f6a67(0x17e)],_0x20f28c=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x17f)];this[_0x2f6a67(0x14b)](_0x555bc6,'mp',_0x28b4be,_0x20f28c),_0x1a6161+=this['gaugeLineHeight']();}if(Window_SideviewUiBattleStatus[_0x2f6a67(0x17a)]){if(_0x2f6a67(0x119)!==_0x2f6a67(0x13b)){let _0xc42bf9=_0x47cf57+Window_SideviewUiBattleStatus[_0x2f6a67(0x179)],_0x23428c=_0x1a6161+Window_SideviewUiBattleStatus[_0x2f6a67(0x159)];this[_0x2f6a67(0x14b)](_0x555bc6,'tp',_0xc42bf9,_0x23428c),_0x1a6161+=this[_0x2f6a67(0x1a6)]();}else{if(!this[_0x2f6a67(0xea)]())return;const _0x43f326=_0x538d7d[_0x2f6a67(0xdb)];this['scale']['x']=this[_0x2f6a67(0x187)]['y']=_0x43f326;}}},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0xe2)]=function(){const _0x185ee1=_0x5d800b;if(Imported[_0x185ee1(0x180)]&&BattleManager[_0x185ee1(0x14c)]())return![];return BattleManager[_0x185ee1(0x111)]()&&Window_SideviewUiBattleStatus[_0x185ee1(0x122)]&&Window_SideviewUiBattleStatus['TPB_SHOWN'];},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x162)]=function(){const _0x179435=_0x5d800b;return Window_SideviewUiBattleStatus['NAME_SHOWN']&&Window_SideviewUiBattleStatus[_0x179435(0x19d)]&&Imported[_0x179435(0xb8)]&&ConfigManager['aggroGauge']&&VisuMZ[_0x179435(0x156)][_0x179435(0x188)][_0x179435(0x184)][_0x179435(0xc0)];},Window_SideviewUiBattleStatus[_0x5d800b(0x124)]['isAdjustBoostPoints']=function(){const _0x1c4300=_0x5d800b;return Imported[_0x1c4300(0xda)]&&Window_SideviewUiBattleStatus[_0x1c4300(0x189)]&&BattleManager[_0x1c4300(0xcd)]();},Window_SideviewUiBattleStatus['prototype'][_0x5d800b(0x166)]=function(){const _0x3fd4a6=_0x5d800b;return Imported['VisuMZ_2_BattleSystemBTB']&&Window_SideviewUiBattleStatus[_0x3fd4a6(0x19c)]&&BattleManager[_0x3fd4a6(0xaa)]();},Window_SideviewUiBattleStatus[_0x5d800b(0x124)][_0x5d800b(0x1b8)]=function(){const _0x45df31=_0x5d800b;if(VisuMZ[_0x45df31(0x130)][_0x45df31(0x188)][_0x45df31(0xbc)][_0x45df31(0x181)]){if(_0x45df31(0xd2)!==_0x45df31(0xd2)){let _0x5199e1=_0x5f36c5['prototype']['sideviewUiPositionOffsetY'][_0x45df31(0x142)](this);return _0x5199e1+_0x1f308a['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y'];}else VisuMZ[_0x45df31(0x130)][_0x45df31(0x188)]['StatusWindow']['CustomUi'][_0x45df31(0x142)](this,this[_0x45df31(0xd7)]);}};