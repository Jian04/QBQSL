//=============================================================================
// VisuStella MZ - Common Event Menu
// VisuMZ_2_CommonEventMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_CommonEventMenu = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CommonEventMenu = VisuMZ.CommonEventMenu || {};
VisuMZ.CommonEventMenu.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [CommonEventMenu]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Common_Event_Menu_VisuStella_MZ
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Common Event Menu allows you to create your own custom menu setups all
 * through a simple Plugin Command. When using it, you can list whatever Common
 * Events you so wish and generate a menu that when selecting the menu command,
 * it will run the Common Event. This Common Event Menu setup allows you to
 * utilize a help window, a picture window, and a subtext window to allow for
 * your own personal touch when using the Common Event list window.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Launch a Common Event Menu with the Common Events that you want, in the
 *   layout that you prefer, with the options you desire by just using a simple
 *   Plugin Command.
 * * Pick from over 100+ different premade layouts for the Common Event Menu.
 * * JavaScript users can create their own custom layouts, alongside 10 extra
 *   windows to help them show any extra data they may need.
 * * The picture window can show different images whenever a specific Common
 *   Event is selected in the List Window.
 * * A help window will show information on the selected Common Event.
 * * A subtext window can display additional information about any selected
 *   Common Event.
 * * Use switches to enable, disable, show, or hide Common Events for the
 *   Common Event Menu to make it something more dynamic.
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
 * * VisuMZ_1_EventsMoveCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_OptionsCore
 *
 * When selecting pre-made Layouts for the Common Event Menu, depending on the
 * settings for the Help Window Position and Input Window Position, the four
 * main windows for the Common Event Menu will be positioned differently to
 * account for these main settings.
 * 
 * Right Input would put the List Window towards the right side of the screen.
 * If it is off, then the List Window would appear towards the left side of the
 * screen. When a layout with "Mirror" is in place, these settings are reversed
 * to apply the mirror effect.
 * 
 * Bottom Help would put the Help Window towards the bottom of the screen and
 * the Subtext would go towards the top. If the Bottom Help position is turned
 * off, then the Help Window would appear at the top while the Subtext would
 * appear at the bottom. When a layout with "Inverse" is in place, these
 * settings are reversed to apply the inverse effect.
 * 
 * When viewing the previews on the Yanfly.moe wiki, the previews will be
 * displayed with the Help Window towards the top and the input towards the
 * right side of the screen (ie the Recommended Settings).
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
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
 * === Common Event Menu Plugin Command ===
 * 
 * This is the Plugin Command that lets you create the Common Event Menu. The
 * Common Event Menu is inaccessible from any other way.
 * 
 * ---
 *
 * Common Event Menu: Start
 * - Start a Common Event Menu with the below settings.
 *
 *   Common Events:
 *   - Select the Common Events you want shown in the menu.
 *
 *     Cancel Event:
 *     - Runs this Common Event when Cancel is pressed.
 *     - Insert 0 to disable Cancel.
 *
 *   Layout:
 *   - Pick a layout to use for the Common Event Menu.
 *   - Select "Custom" to position windows via JavaScript.
 *   - Picking '-' will not create any Common Event Menus.
 *   - Look on Yanfly.moe for a visual list of all the layouts.
 *
 *     Custom Layout:
 *     - Modify the settings for a Custom layout.
 *     - Requires the above parameter to be "Custom".
 *
 *   Optional Settings:
 *   - Optional settings for the Common Event Menu.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
 *
 * ---
 *
 * Common Events (Sub Settings)
 * - Select the Common Events you want shown in the menu.
 * 
 *   Specific ID's:
 *
 *     ID(s):
 *     - Select the Common Events you want displayed in the menu based on their
 *       exact ID's.
 *
 *   ID Range:
 * 
 *     Range Start:
 *     - Select the Common Event ID range to start from.
 *     - This will select all the ID's up to the end range.
 * 
 *     Range End:
 *     - Select the Common Event ID range to end with.
 *     - This will select all the ID's from the start range.
 * 
 *   JS:
 *
 *     Custom JS:
 *     - Create a list of Common Event ID's with JavaScript.
 * 
 *   Filters:
 *
 *     Empty Name:
 *     - Apply filter for Common Events without a name?
 *
 *     ----- Name:
 *     - Apply filter for Common Events with ----- in their name?
 *
 * ---
 *
 * Custom Layout (Sub Settings)
 * - Modify the settings for a Custom layout.
 * - Requires the above parameter to be "Custom".
 * 
 *   Main Windows:
 * 
 *     JS: List Window:
 *     JS: Picture Window:
 *     JS: Help Window:
 *     JS: Sub Window:
 *     - Determine how this Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 *   Extra Windows:
 *
 *     JS: Extra Window 1:
 *     JS: Extra Window 2:
 *     JS: Extra Window 3:
 *     JS: Extra Window 4:
 *     JS: Extra Window 5:
 *     JS: Extra Window 6:
 *     JS: Extra Window 7:
 *     JS: Extra Window 8:
 *     JS: Extra Window 9:
 *     JS: Extra Window 10:
 *     - Determine how this Extra Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 *
 * ---
 *
 * Optional Settings (Sub Settings)
 * - Optional settings for the Common Event Menu.
 * 
 *   All Windows:
 *
 *     Background Type:
 *     - Select the background type for all of the Common Event Menu windows.
 *       - 0 - Window
 *       - 1 - Dim
 *       - 2 - Transparent
 *
 *     Boundary Size:
 *     - Pick the boundary size for the layout.
 *     - Does NOT apply to Custom Layouts.
 *       - Full      (Game Screen)
 *       - UI Size   (UI Resolution)
 *       - Padded    (16 px Border)
 *       - Huge      (32 px Border)
 *       - Large     (48 px Border)
 *       - Medium    (64 px Border)
 *       - Small     (96 px Border)
 *       - Tiny      (128 px Border)
 *       - Micro     (160 px Border)
 *       - Wut       (192 px Border)
 * 
 *   List Window:
 *
 *     List Columns:
 *     - The number of columns the List Window has.
 *     - Use 'auto' to determine it automatically.
 *     - You may use JavaScript.
 *
 *     Auto Select:
 *     - Which Common Event should be selected at the start?
 *     - Use 'last' for last picked ID.
 *     - You may use JavaScript.
 *
 *     Text Alignment:
 *     - How do you want the text to be aligned for the List Window?
 * 
 *   Cancel Button:
 *
 *     Show Cancel Button:
 *     - Show the Cancel Button?
 *     - Requires a Cancel Common Event.
 *
 *     Button Scale:
 *     - Scale the button size by this much.
 *
 *     Button Position:
 *     - Select where the button appears.
 *
 *     Button Offset X:
 *     - Offset the Cancel Button X position by this much.
 *
 *     Button Offset Y:
 *     - Offset the Cancel Button Y position by this much.
 * 
 *   Picture Window:
 *
 *     Auto-Fit Image:
 *     - Automatically fit the picture to the size of the Picture Window if the
 *       picture is larger than the window?
 *
 *     Image Anchor X:
 *     - Pick how the picture is anchored horizontally in the Picture Window.
 *
 *     Image Anchor Y:
 *     - Pick how the picture is anchored vertically in the Picture Window.
 *
 * ---
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * The following are comment tags that have been added through this plugin.
 * These comment tags will not work with your game if this plugin is OFF or not
 * present. To make a comment tag, create a comment inside of the Common Event
 * and type in any of the comment tags seen below for their effects.
 *
 * ---
 * 
 * === Basic-Related Comment Tags ===
 * 
 * ---
 *
 * <Name: text>
 *
 * - Used for: Common Event Comment Tag
 * - Replaces the text that appears in the Common Event Menu List with this
 *   instead of the Common Event's name found in the database.
 * - Replace 'text' with the name you want to be displayed in the List Window.
 * - If this comment tag is not used, default to the Common Event's name.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Common Event Comment Tag
 * - Sets the icon shown next to this Common Event.
 * - Replace 'x' with a number representing the icon index used for this
 *   Common Event.
 * - If this comment tag is not used, default to the Plugin Parameters.
 *
 * ---
 *
 * <Indent: x>
 *
 * - Used for: Common Event Comment Tag
 * - Indents the name when it appears in the Common Event List.
 * - Replace 'x' with the number of times to indent the name.
 * - Each indent is equal to an icon width.
 * - Indents do not apply if there are more than 1 column for the event list.
 *
 * ---
 *
 * <Picture: filename>
 *
 * - Used for: Common Event Comment Tag
 * - Description
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 *
 * ---
 * 
 * === Description-Related Comment Tags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Help Window.
 * - Replace 'text' with the text you want to display in the Help Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Subtext Description>
 *  text
 *  text
 * </Subtext Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Sub Window.
 * - Replace 'text' with the text you want to display in the Sub Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Extra Description x>
 *  text
 *  text
 * </Extra Description x>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Extra Window.
 * - Replace 'x' with a number from 1 to 10 to determine which Extra Window to
 *   display the text in.
 * - Replace 'text' with the text you want to display in the Extra Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 * 
 * === Visibility-Related Comment Tags ===
 * 
 * ---
 *
 * <Show Switch: x>
 * 
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be hidden until
 *   all switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, the Common Event will be shown if any
 *   of the switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 * 
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be shown until
 *   all switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, the Common Event will be hidden if any
 *   of the switches are ON. Otherwise, it would be shown.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Visibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event is visible in the menu by code.
 * 
 * ---
 *
 * <JS Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Visible>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type visible status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   Common Event will be visible or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 * 
 * === Enable-Related Comment Tags ===
 * 
 * ---
 *
 * <Enable Switch: x>
 * 
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be disabled until
 *   all switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, the Common Event will be enabled if any
 *   of the switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 * 
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be enabled until
 *   all switches are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, the Common Event will be disabled if any
 *   of the switches are ON. Otherwise, it would be enabled.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Enable ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event can be selectable by code.
 * 
 * ---
 *
 * <JS Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Enable>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type enabled status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   Common Event will be enabled or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * There's only a single plugin parameter for the default settings and that's
 * to define the default icon displayed for the Common Event Menu when a Common
 * Event does not have the <Icon: x> comment tag.
 *
 * ---
 *
 * Settings
 * 
 *   Default Icon:
 *   - Select what icon will be the default Common Event entry icon.
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
 * * Irina
 * * V.Aero
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.00 Official Release Date: March 1, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CommonEventMenu
 * @text Common Event Menu: Start
 * @desc Start a Common Event Menu with the below settings.
 *
 * @arg CommonEvents:struct
 * @text Common Events
 * @type struct<CommonEvents>
 * @desc Select the Common Events you want shown in the menu.
 * @default {"Specific":"","ID:arraynum":"[]","Range":"","RangeStart:num":"0","RangeEnd:num":"0","JS":"","CustomJS:func":"\"// Declare Variables\\nlet list = [];\\n\\n// Add Common Event ID's\\n\\n\\n// Return List\\nreturn list;\"","Filters":"","FilterEmptyName:eval":"true","FilterLine:eval":"true"}
 *
 * @arg CancelEvent:num
 * @text Cancel Event
 * @parent CommonEvents:struct
 * @type common_event
 * @desc Runs this Common Event when Cancel is pressed.
 * Insert 0 to disable Cancel.
 * @default 0
 *
 * @arg Layout:str
 * @text Layout
 * @type select
 * @option -
 * @option Custom
 * @option -
 * @option Full-Screen
 * @option -
 * @option Gallery 1-Row-List
 * @option Gallery 2-Row-List
 * @option Gallery 3-Row-List
 * @option Gallery 4-Row-List
 * @option Gallery 5-Row-List
 * @option Gallery 6-Row-List
 * @option -
 * @option Gallery 1-Row-List Inverse
 * @option Gallery 2-Row-List Inverse
 * @option Gallery 3-Row-List Inverse
 * @option Gallery 4-Row-List Inverse
 * @option Gallery 5-Row-List Inverse
 * @option Gallery 6-Row-List Inverse
 * @option -
 * @option Gallery 1-Row-List No-Sub
 * @option Gallery 2-Row-List No-Sub
 * @option Gallery 3-Row-List No-Sub
 * @option Gallery 4-Row-List No-Sub
 * @option Gallery 5-Row-List No-Sub
 * @option Gallery 6-Row-List No-Sub
 * @option -
 * @option Gallery 1-Row-List No-Sub Inverse
 * @option Gallery 2-Row-List No-Sub Inverse
 * @option Gallery 3-Row-List No-Sub Inverse
 * @option Gallery 4-Row-List No-Sub Inverse
 * @option Gallery 5-Row-List No-Sub Inverse
 * @option Gallery 6-Row-List No-Sub Inverse
 * @option -
 * @option Gallery 1-Row-List Thick-Sub
 * @option Gallery 2-Row-List Thick-Sub
 * @option Gallery 3-Row-List Thick-Sub
 * @option Gallery 4-Row-List Thick-Sub
 * @option Gallery 5-Row-List Thick-Sub
 * @option Gallery 6-Row-List Thick-Sub
 * @option -
 * @option Gallery 1-Row-List Thick-Sub Inverse
 * @option Gallery 2-Row-List Thick-Sub Inverse
 * @option Gallery 3-Row-List Thick-Sub Inverse
 * @option Gallery 4-Row-List Thick-Sub Inverse
 * @option Gallery 5-Row-List Thick-Sub Inverse
 * @option Gallery 6-Row-List Thick-Sub Inverse
 * @option -
 * @option Side-Sub
 * @option Side-Sub Inverse
 * @option Side-Sub Mirror
 * @option Side-Sub Mirror Inverse
 * @option -
 * @option Side-Sub Firm-List
 * @option Side-Sub Firm-List Inverse
 * @option Side-Sub Firm-List Mirror
 * @option Side-Sub Firm-List Mirror Inverse
 * @option -
 * @option Side-Sub Half-Base-Pict
 * @option Side-Sub Half-Base-Pict Inverse
 * @option Side-Sub Half-Base-Pict Mirror
 * @option Side-Sub Half-Base-Pict Mirror Inverse
 * @option -
 * @option Side-Sub Lite-List
 * @option Side-Sub Lite-List Inverse
 * @option Side-Sub Lite-List Mirror
 * @option Side-Sub Lite-List Mirror Inverse
 * @option -
 * @option Standard
 * @option Standard Inverse
 * @option Standard Mirror
 * @option Standard Mirror Inverse
 * @option -
 * @option Standard No-Sub
 * @option Standard No-Sub Inverse
 * @option Standard No-Sub Mirror
 * @option Standard No-Sub Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-List
 * @option Standard Sub-Corner-List Inverse
 * @option Standard Sub-Corner-List Mirror
 * @option Standard Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-Pict
 * @option Standard Sub-Corner-Pict Inverse
 * @option Standard Sub-Corner-Pict Mirror
 * @option Standard Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Standard Thick-Sub
 * @option Standard Thick-Sub Inverse
 * @option Standard Thick-Sub Mirror
 * @option Standard Thick-Sub Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-List
 * @option Standard Thick-Sub-Corner-List Inverse
 * @option Standard Thick-Sub-Corner-List Mirror
 * @option Standard Thick-Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-Pict
 * @option Standard Thick-Sub-Corner-Pict Inverse
 * @option Standard Thick-Sub-Corner-Pict Mirror
 * @option Standard Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Tall
 * @option Tall Inverse
 * @option Tall Mirror
 * @option Tall Mirror Inverse
 * @option -
 * @option Tall Half-Base-Pict
 * @option Tall Half-Base-Pict Inverse
 * @option Tall Half-Base-Pict Mirror
 * @option Tall Half-Base-Pict Mirror Inverse
 * @option -
 * @option Tall No-Sub
 * @option Tall No-Sub Inverse
 * @option Tall No-Sub Mirror
 * @option Tall No-Sub Mirror Inverse
 * @option -
 * @option Tall Thick-Sub
 * @option Tall Thick-Sub Inverse
 * @option Tall Thick-Sub Mirror
 * @option Tall Thick-Sub Mirror Inverse
 * @option -
 * @option Wide-List
 * @option Wide-List Inverse
 * @option -
 * @option Wide-List Base-Pict
 * @option Wide-List Base-Pict Inverse
 * @option -
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Inverse
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Wide-List No-Sub
 * @option Wide-List No-Sub Inverse
 * @option -
 * @option Wide-List Thick-Sub
 * @option Wide-List Thick-Sub Inverse
 * @option -
 * @option Custom
 * @option -
 * @desc Pick a layout to use for the Common Event Menu.
 * Select "Custom" to position windows via JavaScript.
 * @default Standard
 *
 * @arg CustomLayout:struct
 * @text Custom Layout
 * @parent Layout:str
 * @type struct<CustomLayout>
 * @desc Modify the settings for a Custom layout.
 * Requires the above parameter to be "Custom".
 * @default 
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings for the Common Event Menu.
 * @default 
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
 * @param CommonEventMenu
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultIcon:num
 * @text Default Icon
 * @desc Select what icon will be the default Common Event entry icon.
 * @default 160
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
 * Common Events Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CommonEvents:
 *
 * @param Specific
 * @text Specific ID's
 *
 * @param ID:arraynum
 * @text ID(s)
 * @parent Specific
 * @type common_event[]
 * @desc Select the Common Events you want displayed in the menu
 * based on their exact ID's.
 * @default []
 *
 * @param Range
 * @text ID Range
 *
 * @param RangeStart:num
 * @text Range Start
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to start from.
 * This will select all the ID's up to the end range.
 * @default 0
 *
 * @param RangeEnd:num
 * @text Range End
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to end with.
 * This will select all the ID's from the start range.
 * @default 0
 *
 * @param JS
 *
 * @param CustomJS:func
 * @text Custom JS
 * @parent JS
 * @type note
 * @desc Create a list of Common Event ID's with JavaScript.
 * @default "// Declare Variables\nlet list = [];\n\n// Add Common Event ID's\n\n\n// Return List\nreturn list;"
 *
 * @param Filters
 *
 * @param FilterEmptyName:eval
 * @text Empty Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events without a name?
 * @default true
 *
 * @param FilterLine:eval
 * @text ----- Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events with ----- in their name?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * CustomLayout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomLayout:
 *
 * @param Main
 * @text Main Windows
 *
 * @param List_Window_JS:func
 * @text JS: List Window
 * @parent Main
 * @type note
 * @desc Determine how the List Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = Math.floor(Graphics.width / 2);\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.ceil(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Picture_Window_JS:func
 * @text JS: Picture Window
 * @parent Main
 * @type note
 * @desc Determine how the Picture Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.floor(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Help_Window_JS:func
 * @text JS: Help Window
 * @parent Main
 * @type note
 * @desc Determine how the Help Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Sub_Window_JS:func
 * @text JS: Sub Window
 * @parent Main
 * @type note
 * @desc Determine how the Sub Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = Graphics.height - this.calcWindowHeight(2, false);\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 * 
 * @param Extra
 * @text Extra Windows
 *
 * @param Extra_Window_1_JS:func
 * @text JS: Extra Window 1
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 1 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_2_JS:func
 * @text JS: Extra Window 2
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 2 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_3_JS:func
 * @text JS: Extra Window 3
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 3 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_4_JS:func
 * @text JS: Extra Window 4
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 4 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_5_JS:func
 * @text JS: Extra Window 5
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 5 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_6_JS:func
 * @text JS: Extra Window 6
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 6 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_7_JS:func
 * @text JS: Extra Window 7
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 7 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_8_JS:func
 * @text JS: Extra Window 8
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 8 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_9_JS:func
 * @text JS: Extra Window 9
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 9 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_10_JS:func
 * @text JS: Extra Window 10
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 10 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 *
 * @param AllWindows
 * @text All Windows
 *
 * @param WindowBgType:num
 * @text Background Type
 * @parent AllWindows
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select the background type for all of the Common Event Menu windows.
 * @default 0
 *
 * @param BoundarySize:str
 * @text Boundary Size
 * @parent AllWindows
 * @type select
 * @option Full      (Game Screen)
 * @option UI Size   (UI Resolution)
 * @option -         -
 * @option Padded    (16 px Border)
 * @option Huge      (32 px Border)
 * @option Large     (48 px Border)
 * @option Medium    (64 px Border)
 * @option Small     (96 px Border)
 * @option Tiny      (128 px Border)
 * @option Micro     (160 px Border)
 * @option Wut       (192 px Border)
 * @desc Pick the boundary size for the layout.
 * Does NOT apply to Custom Layouts.
 * @default UI Size   (UI Resolution)
 *
 * @param ListWindow
 * @text List Window
 * 
 * @param ListColumns:str
 * @text List Columns
 * @parent ListWindow
 * @desc The number of columns the List Window has. Use 'auto'
 * to determine it automatically. You may use JavaScript.
 * @default auto
 * 
 * @param AutoSelect:str
 * @text Auto Select
 * @parent ListWindow
 * @desc Which Common Event should be selected at the start?
 * Use 'last' for last picked ID. You may use JavaScript.
 * @default 0
 *
 * @param ListTextAlign:str
 * @text Text Alignment
 * @parent ListWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the text to be aligned for the List Window?
 * @default left
 *
 * @param CancelButton
 * @text Cancel Button
 *
 * @param ShowCancelButton:eval
 * @text Show Cancel Button
 * @parent CancelButton
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Cancel Button?
 * Requires a Cancel Common Event.
 * @default true
 *
 * @param CancelButtonScale:eval
 * @text Button Scale
 * @parent CancelButton
 * @desc Scale the button size by this much.
 * @default 0.8
 *
 * @param CancelButtonPosition:str
 * @text Button Position
 * @parent CancelButton
 * @type combo
 * @option upper left
 * @option upper center
 * @option upper right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Select where the button appears.
 * @default upper right
 *
 * @param CancelOffsetX:eval
 * @text Button Offset X
 * @parent CancelButton
 * @desc Offset the Cancel Button X position by this much.
 * @default -18
 *
 * @param CancelOffsetY:eval
 * @text Button Offset Y
 * @parent CancelButton
 * @desc Offset the Cancel Button Y position by this much.
 * @default 15
 *
 * @param PictureWindow
 * @text Picture Window
 *
 * @param PictureAutoFit:eval
 * @text Auto-Fit Image
 * @parent PictureWindow
 * @type boolean
 * @on Auto-Fit
 * @off Real Size
 * @desc Automatically fit the picture to the size of the Picture
 * Window if the picture is larger than the window?
 * @default true
 *
 * @param PictureAnchorX:str
 * @text Image Anchor X
 * @parent PictureWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Pick how the picture is anchored horizontally in the Picture Window.
 * @default center
 *
 * @param PictureAnchorY:str
 * @text Image Anchor Y
 * @parent PictureWindow
 * @type combo
 * @option top
 * @option middle
 * @option bottom
 * @desc Pick how the picture is anchored vertically in the Picture Window.
 * @default middle
 *
 */
//=============================================================================

const _0x4bc5=['_aidWindows','RYPpl','_commonEventMenuPicture','isInstanceOfSceneMap','No\x20Common\x20Events\x20have\x20been\x20defined!','contents','ARRAYNUM','xhAnO','INbLT','commonEventMenu_defaultIcon','pictureWindow','yeRPG','kUVzW','bwEjt','CancelOffsetY','create','CommonEvent-%1-Enable-JS','RangeStart','registerAidWindow','isPressed','boxWidth','version','max','process_VisuMZ_CommonEventMenu_JS','OwyPw','_commonEventMenuNameIndent','_commonEventMenuName','Sub','BOJJx','djDVe','FilterLine','1692741rHpecE','_lastPickedCommonEventMenuID','trim','Settings','setPicture','FweeA','createCommonEventMenuExtraWindow','_textAlign','39473OiQzZF','open','uKpJp','Scene_Base_createWindowLayer','visible','isRightInputMode','_commonEventMenuWindows','ajdaM','commonEventMenuPictureWindowRect','itemLineRect','alvnL','openness','updateOpen','concat','Extra%1','children','vzfBk','subWindow','sort','cREFZ','FBmhR','isOpen','PictureAnchorX','width','innerWidth','closeCommonEventMenu','createCommonEventMenuListWindow','return\x200','RangeEnd','oLjCI','ARRAYSTR','ARRAYFUNC','OwnuE','RegExp','_active','_commonEventMenu_ShowLayoutName','UQboC','addCommonEventMenuWindow','DfbEL','setHandler','Picture','ZGGdc','Subt\x20Window:','ToAKi','UI\x20Size','clear','zwpcd','vaZxQ','_cancelButton','constructor','ceil','bind','BZovD','parameters','iYJiK','DisableAny','toLowerCase','format','createCommonEventMenuPictureWindow','onCommonEventMenuOk','bottom','FUNC','createCommonEventMenuSubWindow','name','calcWindowHeight','qSQIh','launchCommonEventMenu','YuCuP','code','maxCols','Pict\x20Window:','Indent','CancelOffsetX','initMembers','brAIA','oQKuJ','call','fGoza','WaTis','forceSelect','GaGKV','createCommonEventMenuLayer','JSON','PjDHi','middle','setLastPickedCommonEventMenuID','_opening','EnableAll','\x5cI[%1]%2','addLoadListener','DjYbV','ESrzO','hbYuO','Custom','Scene_Boot_onDatabaseLoaded','CommonEvents','ConvertParams','setText','WYLat','RPwXm','HideAny','DisableAll','eventId','CancelEvent','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','TbwfN','_autoSelect','list','ShowAny','UuBFy','jMOgN','description','CfTpO','clamp','IVoKp','ListColumns','VXbNG','round','EnableAny','wItmn','STR','_anchorX','CancelButtonPosition','OvtSW','bzSsx','PvsoX','parse','CMhsX','Help\x20Window:','xKCPB','oDIuY','DGlxt','ShJOx','List\x20Window:','EYxtI','Help_Window_JS','autoSelect','listWindow','PsIYf','CreateCommonEventList','xFwjE','Game_System_initialize','yUvLy','_commonEventMenu_ShowDimensions','kReVT','ERQfk','loadPicture','KEmSa','drawPicture','SdzzL','commonEventMenuRectangle','addChild','wait','_settings','Axsil','value','akdBj','height','KjWCO','drawTextEx','hitIndex','eNZzZ','commonEventMenuBoundary','_autoFit','kOqaa','_anchorY','MZxGy','BaXeh','upper\x20right','258172IQxyQz','startCommonEventMenu','_scene','zlLhq','ShowAll','EVAL','helpWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYSTRUCT','log','kaENt','221041iocJCd','LhxYF','tdTAR','includes','currentExt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','commonEventMenuDescription','_filename','1lUSYGE','status','createCancelButton','cancel','exit','registerCommand','OVQyC','extraWindow_%1','1WhQZqx','ldHpX','commonEventMenuHelpWindowRect','CustomLayout','isBottomHelpMode','\x5cI[0]%1','padZero','commonEventMenuName','iswWP','_commonEventMenuNote','onDatabaseLoaded','_windowLayer','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','blt','min','JWIcV','sfmka','Layout','upDbb','ListTextAlign','Optional','VisuMZ_1_EventsMoveCore','floor','commonEventMenuListWindowRect','commonEventMenuPicture','VqFPB','innerHeight','Extra_Window_%1_JS','seFcb','map','Gbnsg','scale','match','DhsEd','_columns','isSceneBattle','OCNyl','ariGL','43iTZqLx','registerCommonEventMenuAidWindows','nAZpl','last','makeCommandList','canCreateCommonEventMenu','hVehd','2277916EXeGuH','HideAll','HPmgA','center','CommonEventMenu','_commonEventMenuLayer','wESts','EnableJS','top','WindowBgType','closeCommonEventMenuDelay','isEnabled','ARRAYEVAL','itemTextAlign','shift','CommonEvent-%1-Visible-JS','Icon','_interpreter','1523289tGsSuf','commonEvent','findExt','getLastPickedCommonEventMenuID','close','XWukL','zaLnw','OBHjT','isPlaytest','auto','PictureAnchorY','yzpVF','kYHzO','createWindowLayer','_commonEventMenuDesc','evimD','#%1','TIlqJ','setBackgroundType','length','NUM','PXSYb','Picture_Window_JS','175642MBbwmG','commonEventMenuNote','initialize','Help','hVMKU','callUpdateHelp','prototype','ZkRwA','onCommonEventMenuCancel','filter','textSizeEx'];const _0xd608bd=_0x5395;(function(_0x4d5a35,_0x3cd182){const _0x225d64=_0x5395;while(!![]){try{const _0x54651a=-parseInt(_0x225d64(0x241))*parseInt(_0x225d64(0x202))+parseInt(_0x225d64(0x1fa))*-parseInt(_0x225d64(0x282))+parseInt(_0x225d64(0x1e7))+parseInt(_0x225d64(0x258))+-parseInt(_0x225d64(0x1f2))+parseInt(_0x225d64(0x228))*parseInt(_0x225d64(0x13e))+parseInt(_0x225d64(0x22f));if(_0x54651a===_0x3cd182)break;else _0x4d5a35['push'](_0x4d5a35['shift']());}catch(_0x467982){_0x4d5a35['push'](_0x4d5a35['shift']());}}}(_0x4bc5,0xed4de));var label=_0xd608bd(0x233),tier=tier||0x0,dependencies=[_0xd608bd(0x217)],pluginData=$plugins['filter'](function(_0x10c086){const _0x22b5af=_0xd608bd;return _0x10c086[_0x22b5af(0x1fb)]&&_0x10c086[_0x22b5af(0x1ad)][_0x22b5af(0x1f5)]('['+label+']');})[0x0];function _0x5395(_0x5e4498,_0x440029){return _0x5395=function(_0x4bc555,_0x539558){_0x4bc555=_0x4bc555-0x13a;let _0x1abd7c=_0x4bc5[_0x4bc555];return _0x1abd7c;},_0x5395(_0x5e4498,_0x440029);}VisuMZ[label][_0xd608bd(0x285)]=VisuMZ[label][_0xd608bd(0x285)]||{},VisuMZ['ConvertParams']=function(_0x4b5a60,_0x1f0494){const _0x1f6358=_0xd608bd;for(const _0x4fa71e in _0x1f0494){if(_0x4fa71e[_0x1f6358(0x222)](/(.*):(.*)/i)){const _0x314700=String(RegExp['$1']),_0x2643e0=String(RegExp['$2'])['toUpperCase']()[_0x1f6358(0x284)]();let _0xfb05c6,_0x266a93,_0x5eb464;switch(_0x2643e0){case _0x1f6358(0x255):_0xfb05c6=_0x1f0494[_0x4fa71e]!==''?Number(_0x1f0494[_0x4fa71e]):0x0;break;case _0x1f6358(0x269):_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93[_0x1f6358(0x21f)](_0x5ab7c7=>Number(_0x5ab7c7));break;case _0x1f6358(0x1ec):_0xfb05c6=_0x1f0494[_0x4fa71e]!==''?eval(_0x1f0494[_0x4fa71e]):null;break;case _0x1f6358(0x23b):_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93[_0x1f6358(0x21f)](_0x4107d0=>eval(_0x4107d0));break;case _0x1f6358(0x190):_0xfb05c6=_0x1f0494[_0x4fa71e]!==''?JSON['parse'](_0x1f0494[_0x4fa71e]):'';break;case'ARRAYJSON':_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON['parse'](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93[_0x1f6358(0x21f)](_0x23a473=>JSON[_0x1f6358(0x1bc)](_0x23a473));break;case _0x1f6358(0x17b):_0xfb05c6=_0x1f0494[_0x4fa71e]!==''?new Function(JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e])):new Function(_0x1f6358(0x159));break;case _0x1f6358(0x15d):_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON['parse'](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93['map'](_0x5af7e9=>new Function(JSON[_0x1f6358(0x1bc)](_0x5af7e9)));break;case _0x1f6358(0x1b6):_0xfb05c6=_0x1f0494[_0x4fa71e]!==''?String(_0x1f0494[_0x4fa71e]):'';break;case _0x1f6358(0x15c):_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93[_0x1f6358(0x21f)](_0x4c30d2=>String(_0x4c30d2));break;case'STRUCT':_0x5eb464=_0x1f0494[_0x4fa71e]!==''?JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e]):{},_0xfb05c6=VisuMZ['ConvertParams']({},_0x5eb464);break;case _0x1f6358(0x1ef):_0x266a93=_0x1f0494[_0x4fa71e]!==''?JSON[_0x1f6358(0x1bc)](_0x1f0494[_0x4fa71e]):[],_0xfb05c6=_0x266a93['map'](_0x36d8a5=>VisuMZ[_0x1f6358(0x19e)]({},JSON[_0x1f6358(0x1bc)](_0x36d8a5)));break;default:continue;}_0x4b5a60[_0x314700]=_0xfb05c6;}}return _0x4b5a60;},(_0x2e34c0=>{const _0x48399c=_0xd608bd,_0x2b91a1=_0x2e34c0[_0x48399c(0x17d)];for(const _0x9ee3ca of dependencies){if(!Imported[_0x9ee3ca]){if(_0x48399c(0x22e)!=='hVehd')return this[_0x48399c(0x20b)][_0x55ea2f];else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x48399c(0x177)](_0x2b91a1,_0x9ee3ca)),SceneManager[_0x48399c(0x1fe)]();break;}}}const _0x46a7a2=_0x2e34c0[_0x48399c(0x1ad)];if(_0x46a7a2[_0x48399c(0x222)](/\[Version[ ](.*?)\]/i)){const _0x2b0bc9=Number(RegExp['$1']);_0x2b0bc9!==VisuMZ[label][_0x48399c(0x278)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x2b91a1,_0x2b0bc9)),SceneManager[_0x48399c(0x1fe)]());}if(_0x46a7a2[_0x48399c(0x222)](/\[Tier[ ](\d+)\]/i)){const _0x5ee9d1=Number(RegExp['$1']);_0x5ee9d1<tier?(alert(_0x48399c(0x1ee)[_0x48399c(0x177)](_0x2b91a1,_0x5ee9d1,tier)),SceneManager[_0x48399c(0x1fe)]()):_0x48399c(0x250)!=='sgKyg'?tier=Math['max'](_0x5ee9d1,tier):_0x479c0c=0x0;}VisuMZ[_0x48399c(0x19e)](VisuMZ[label][_0x48399c(0x285)],_0x2e34c0[_0x48399c(0x173)]);})(pluginData),PluginManager[_0xd608bd(0x1ff)](pluginData[_0xd608bd(0x17d)],_0xd608bd(0x233),_0x3c7fb1=>{const _0x357ef9=_0xd608bd;if(!SceneManager[_0x357ef9(0x225)]()&&!SceneManager[_0x357ef9(0x266)]())return;_0x3c7fb1=JsonEx['makeDeepCopy'](_0x3c7fb1),VisuMZ[_0x357ef9(0x19e)](_0x3c7fb1,_0x3c7fb1);const _0xb7211=$gameTemp['getLastPluginCommandInterpreter'](),_0x377e61=VisuMZ['CommonEventMenu']['CreateCommonEventList'](_0x3c7fb1[_0x357ef9(0x19d)]);if(_0x3c7fb1['Layout']==='-'){if($gameTemp[_0x357ef9(0x249)]())alert('Please\x20pick\x20a\x20proper\x20layout!');return;}if(_0x377e61[_0x357ef9(0x254)]<=0x0){if($gameTemp[_0x357ef9(0x249)]())alert(_0x357ef9(0x267));return;}if(_0x3c7fb1[_0x357ef9(0x213)]===_0x357ef9(0x19b)&&_0x3c7fb1['CustomLayout']['List_Window_JS']===undefined){if($gameTemp[_0x357ef9(0x249)]())alert('Custom\x20Layout\x20Settings\x20not\x20defined!');return;}$gameTemp[_0x357ef9(0x161)]!==undefined&&($gameTemp['_commonEventMenu_ShowLayoutName']++,console[_0x357ef9(0x1f0)](_0x357ef9(0x251)[_0x357ef9(0x177)]($gameTemp['_commonEventMenu_ShowLayoutName'][_0x357ef9(0x208)](0x3)),_0x3c7fb1[_0x357ef9(0x213)])),_0x3c7fb1[_0x357ef9(0x1a9)]=_0x377e61,SceneManager[_0x357ef9(0x1e9)][_0x357ef9(0x1e8)](_0x3c7fb1,_0xb7211),_0xb7211[_0x357ef9(0x1d6)](0xa);}),VisuMZ[_0xd608bd(0x233)][_0xd608bd(0x1c9)]=function(_0x1192ae){const _0x42694b=_0xd608bd;let _0x7649f=[];_0x7649f=_0x7649f[_0x42694b(0x14b)](_0x1192ae['ID']);for(let _0x5dc2a6=_0x1192ae[_0x42694b(0x274)];_0x5dc2a6<=_0x1192ae[_0x42694b(0x15a)];_0x5dc2a6++){const _0x2e0201=$dataCommonEvents[_0x5dc2a6];if(!_0x2e0201)continue;_0x7649f['push'](_0x5dc2a6);}const _0x214fbd=_0x1192ae['CustomJS']()||[];return _0x7649f=_0x7649f[_0x42694b(0x14b)](_0x214fbd),_0x7649f=_0x7649f[_0x42694b(0x150)]((_0x1642dc,_0x546647)=>_0x1642dc-_0x546647),_0x7649f=_0x7649f[_0x42694b(0x261)]((_0x480578,_0x4f6659,_0x1784c7)=>_0x1784c7['indexOf'](_0x480578)===_0x4f6659),_0x7649f=_0x7649f['remove'](0x0),_0x7649f=_0x7649f[_0x42694b(0x261)](_0x4bbbb4=>!!$dataCommonEvents[_0x4bbbb4]),_0x1192ae['FilterEmptyName']&&(_0x7649f=_0x7649f[_0x42694b(0x261)](_0x2a5fd6=>$dataCommonEvents[_0x2a5fd6][_0x42694b(0x17d)]!=='')),_0x1192ae[_0x42694b(0x281)]&&(_0x7649f=_0x7649f[_0x42694b(0x261)](_0x1c144b=>!$dataCommonEvents[_0x1c144b][_0x42694b(0x17d)]['match'](/-----/i))),_0x7649f;},VisuMZ[_0xd608bd(0x233)][_0xd608bd(0x15f)]={'Name':/<NAME:[ ](.*)>/i,'Icon':/<ICON:[ ](\d+)>/i,'Indent':/<INDENT:[ ](\d+)>/i,'Picture':/<PICTURE:[ ](.*)>/i,'Help':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'Sub':/<(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>/i,'Extra1':/<(?:EXTRA|EXTRA DESCRIPTION) 1>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 1>/i,'Extra2':/<(?:EXTRA|EXTRA DESCRIPTION) 2>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 2>/i,'Extra3':/<(?:EXTRA|EXTRA DESCRIPTION) 3>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 3>/i,'Extra4':/<(?:EXTRA|EXTRA DESCRIPTION) 4>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 4>/i,'Extra5':/<(?:EXTRA|EXTRA DESCRIPTION) 5>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 5>/i,'Extra6':/<(?:EXTRA|EXTRA DESCRIPTION) 6>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 6>/i,'Extra7':/<(?:EXTRA|EXTRA DESCRIPTION) 7>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 7>/i,'Extra8':/<(?:EXTRA|EXTRA DESCRIPTION) 8>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 8>/i,'Extra9':/<(?:EXTRA|EXTRA DESCRIPTION) 9>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 9>/i,'Extra10':/<(?:EXTRA|EXTRA DESCRIPTION) 10>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 10>/i,'ShowAll':/<(?:SHOW|SHOW ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'ShowAny':/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAll':/<(?:HIDE|HIDE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAny':/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'VisibleJS':/<JS (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS (?:VISIBLE|SHOW|HIDE)>/i,'EnableAll':/<(?:ENABLE|ENABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableAny':/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAll':/<(?:DISABLE|DISABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAny':/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableJS':/<JS (?:ENABLE|DISABLE)>\s*([\s\S]*)\s*<\/JS (?:ENABLE|DISABLE)>/i},VisuMZ['CommonEventMenu'][_0xd608bd(0x19c)]=Scene_Boot[_0xd608bd(0x25e)][_0xd608bd(0x20c)],Scene_Boot[_0xd608bd(0x25e)]['onDatabaseLoaded']=function(){const _0x4343cf=_0xd608bd;VisuMZ[_0x4343cf(0x233)][_0x4343cf(0x19c)][_0x4343cf(0x18a)](this),this[_0x4343cf(0x27a)]();},VisuMZ['CommonEventMenu']['JS']={},Scene_Boot[_0xd608bd(0x25e)][_0xd608bd(0x27a)]=function(){const _0x2cead0=_0xd608bd,_0x13b4a7=VisuMZ[_0x2cead0(0x233)][_0x2cead0(0x15f)];for(const _0x253dd0 of $dataCommonEvents){if(!_0x253dd0)continue;const _0x5f01ea=DataManager[_0x2cead0(0x259)](_0x253dd0['id']);if(_0x5f01ea[_0x2cead0(0x222)](_0x13b4a7['VisibleJS'])){const _0x2e035d=String(RegExp['$1']),_0x345d11=_0x2cead0(0x23e)[_0x2cead0(0x177)](_0x253dd0['id']),_0x54615b=_0x2cead0(0x1a6)['format'](_0x2e035d);VisuMZ['CommonEventMenu']['JS'][_0x345d11]=new Function(_0x54615b);}if(_0x5f01ea[_0x2cead0(0x222)](_0x13b4a7[_0x2cead0(0x236)])){const _0x231668=String(RegExp['$1']),_0x16dee9='CommonEvent-%1-Enable-JS'[_0x2cead0(0x177)](_0x253dd0['id']),_0x533d6b=_0x2cead0(0x20e)[_0x2cead0(0x177)](_0x231668);VisuMZ[_0x2cead0(0x233)]['JS'][_0x16dee9]=new Function(_0x533d6b);}}},DataManager[_0xd608bd(0x259)]=function(_0x25ed4b){const _0x45ec48=_0xd608bd;this[_0x45ec48(0x20b)]=this['_commonEventMenuNote']||[];if(this[_0x45ec48(0x20b)][_0x25ed4b]!==undefined)return this[_0x45ec48(0x20b)][_0x25ed4b];const _0x37464e=$dataCommonEvents[_0x25ed4b];if(!_0x37464e)return'';let _0x4c18e5='';for(const _0x355cc2 of _0x37464e[_0x45ec48(0x1a9)]){if([0x6c,0x198][_0x45ec48(0x1f5)](_0x355cc2[_0x45ec48(0x182)])){if(_0x45ec48(0x26e)===_0x45ec48(0x26e))_0x4c18e5+=_0x355cc2[_0x45ec48(0x173)][0x0]+'\x0a';else{for(const _0x407e09 of this['_commonEventMenuLayer']['children']){if(_0x407e09&&_0x407e09['close'])_0x407e09['close']();}_0x2feabb(this[_0x45ec48(0x239)][_0x45ec48(0x171)](this),0xc8);}}}return this[_0x45ec48(0x20b)][_0x25ed4b]=_0x4c18e5['trim'](),this[_0x45ec48(0x20b)][_0x25ed4b];},DataManager[_0xd608bd(0x209)]=function(_0x4f8b07,_0x47f827){const _0x200da3=_0xd608bd;if(_0x47f827){if('YuCuP'!==_0x200da3(0x181)){if(!_0x24b70c)return;this[_0x200da3(0x263)]=this[_0x200da3(0x263)]||{},this[_0x200da3(0x263)][_0x2c5acb]=_0x2a2e73;}else{this[_0x200da3(0x27c)]=this['_commonEventMenuNameIndent']||[];if(this[_0x200da3(0x27c)][_0x4f8b07]!==undefined)return this[_0x200da3(0x27c)][_0x4f8b07];}}else{if(_0x200da3(0x247)!==_0x200da3(0x174)){this[_0x200da3(0x27d)]=this[_0x200da3(0x27d)]||[];if(this[_0x200da3(0x27d)][_0x4f8b07]!==undefined)return this['_commonEventMenuName'][_0x4f8b07];}else{const _0x444aa9=_0x44857[_0x200da3(0x1bc)]('['+_0xdf9a4a['$1'][_0x200da3(0x222)](/\d+/g)+']');for(const _0x417dfe of _0x444aa9){if(_0x46ee57[_0x200da3(0x1d9)](_0x417dfe))return!![];}return![];}}const _0x209888=$dataCommonEvents[_0x4f8b07];if(!_0x209888)return'';let _0x2e6957=_0x209888[_0x200da3(0x17d)],_0x5d833c=0x0;const _0x5bbabb=VisuMZ[_0x200da3(0x233)][_0x200da3(0x15f)],_0x570d93=DataManager[_0x200da3(0x259)](_0x4f8b07);_0x570d93['match'](_0x5bbabb['Name'])&&(_0x2e6957=String(RegExp['$1'])['trim']());_0x570d93[_0x200da3(0x222)](_0x5bbabb[_0x200da3(0x23f)])?_0x5d833c=Number(RegExp['$1']):_0x5d833c=ImageManager[_0x200da3(0x26c)];if(_0x5d833c)_0x2e6957=_0x200da3(0x196)[_0x200da3(0x177)](_0x5d833c,_0x2e6957);if(_0x47f827&&_0x570d93['match'](_0x5bbabb[_0x200da3(0x185)])){if('nAZpl'!==_0x200da3(0x22a))this[_0x200da3(0x16e)]['y']=0x0;else{let _0x1f1b11=Number(RegExp['$1']);while(_0x1f1b11--){_0x2e6957='\x5cI[0]%1'[_0x200da3(0x177)](_0x2e6957);}}}if(_0x47f827){if(_0x200da3(0x264)===_0x200da3(0x264))return this['_commonEventMenuNameIndent'][_0x4f8b07]=_0x2e6957,this[_0x200da3(0x27c)][_0x4f8b07];else _0x1b01b4['match'](/(?:INVERSE)/i)?_0x47ddb8+=_0xe41598?this[_0x200da3(0x17e)](0x2):0x0:_0x243f7f+=_0x1f68de?0x0:this['calcWindowHeight'](0x2);}else return this[_0x200da3(0x27d)][_0x4f8b07]=_0x2e6957,this[_0x200da3(0x27d)][_0x4f8b07];},DataManager[_0xd608bd(0x21a)]=function(_0x88260e){const _0x540bed=_0xd608bd;this[_0x540bed(0x265)]=this['_commonEventMenuPicture']||[];if(this[_0x540bed(0x265)][_0x88260e]!==undefined)return this[_0x540bed(0x265)][_0x88260e];const _0x59f2df=$dataCommonEvents[_0x88260e];if(!_0x59f2df)return'';let _0x1dbb2e='';const _0x15e6e2=VisuMZ[_0x540bed(0x233)][_0x540bed(0x15f)],_0x36d3dc=DataManager[_0x540bed(0x259)](_0x88260e);if(_0x36d3dc[_0x540bed(0x222)](_0x15e6e2[_0x540bed(0x166)])){if(_0x540bed(0x188)==='brAIA')_0x1dbb2e=String(RegExp['$1'])['trim']();else{if(!_0x54b6d4['value'](_0x3c59cf))return!![];}}return this[_0x540bed(0x265)][_0x88260e]=_0x1dbb2e,this[_0x540bed(0x265)][_0x88260e];},DataManager[_0xd608bd(0x1f8)]=function(_0x3b4516,_0x2d9ea9){const _0x6fc46b=_0xd608bd;this['_commonEventMenuDesc']=this['_commonEventMenuDesc']||[],this['_commonEventMenuDesc'][_0x2d9ea9]=this[_0x6fc46b(0x24f)][_0x2d9ea9]||{};if(this[_0x6fc46b(0x24f)][_0x2d9ea9][_0x3b4516]!==undefined)return _0x6fc46b(0x220)!==_0x6fc46b(0x1bb)?this[_0x6fc46b(0x24f)][_0x2d9ea9][_0x3b4516]:this['_scene']&&this['_scene'][_0x6fc46b(0x16f)]===_0x14434e;const _0x19ba9f=$dataCommonEvents[_0x3b4516];if(!_0x19ba9f)return'';let _0x557829='';const _0x2a085b=VisuMZ[_0x6fc46b(0x233)]['RegExp'],_0x4d8b10=DataManager['commonEventMenuNote'](_0x3b4516);return _0x4d8b10[_0x6fc46b(0x222)](_0x2a085b[_0x2d9ea9])&&(_0x557829=String(RegExp['$1'])[_0x6fc46b(0x284)]()),this[_0x6fc46b(0x24f)][_0x2d9ea9][_0x3b4516]=_0x557829,this[_0x6fc46b(0x24f)][_0x2d9ea9][_0x3b4516];},ImageManager[_0xd608bd(0x26c)]=VisuMZ[_0xd608bd(0x233)]['Settings']['DefaultIcon']||0x0,SceneManager[_0xd608bd(0x225)]=function(){const _0x713e31=_0xd608bd;return this[_0x713e31(0x1e9)]&&this[_0x713e31(0x1e9)][_0x713e31(0x16f)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x2ad4d6=_0xd608bd;return this[_0x2ad4d6(0x1e9)]&&this[_0x2ad4d6(0x1e9)][_0x2ad4d6(0x16f)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x1f4b53=_0xd608bd;return this['_scene']&&this[_0x1f4b53(0x1e9)]instanceof Scene_Map;},VisuMZ[_0xd608bd(0x233)]['Game_System_initialize']=Game_System[_0xd608bd(0x25e)][_0xd608bd(0x25a)],Game_System[_0xd608bd(0x25e)][_0xd608bd(0x25a)]=function(){const _0x4eb201=_0xd608bd;VisuMZ['CommonEventMenu'][_0x4eb201(0x1cb)][_0x4eb201(0x18a)](this),this[_0x4eb201(0x283)]=0x0;},Game_System[_0xd608bd(0x25e)][_0xd608bd(0x244)]=function(){const _0x308e05=_0xd608bd;return this[_0x308e05(0x283)]=this[_0x308e05(0x283)]||0x0,this[_0x308e05(0x283)];},Game_System[_0xd608bd(0x25e)][_0xd608bd(0x193)]=function(_0x2d0597){this['_lastPickedCommonEventMenuID']=_0x2d0597;},VisuMZ['CommonEventMenu'][_0xd608bd(0x141)]=Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x24e)],Scene_Base[_0xd608bd(0x25e)]['createWindowLayer']=function(){const _0x38a9bb=_0xd608bd;VisuMZ['CommonEventMenu'][_0x38a9bb(0x141)][_0x38a9bb(0x18a)](this),this[_0x38a9bb(0x18f)]();},Scene_Base[_0xd608bd(0x25e)]['createCommonEventMenuLayer']=function(){const _0x2af3da=_0xd608bd;if(!this[_0x2af3da(0x22d)]())return;this['_commonEventMenuLayer']=new Sprite(),this['addChild'](this[_0x2af3da(0x234)]);},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x22d)]=function(){const _0x164941=_0xd608bd;return['Scene_Map','Scene_Battle'][_0x164941(0x1f5)](this[_0x164941(0x16f)][_0x164941(0x17d)]);},Scene_Base[_0xd608bd(0x25e)]['addCommonEventMenuWindow']=function(_0x34a86e){const _0x2fe08d=_0xd608bd;if(!this[_0x2fe08d(0x234)])return;this['_commonEventMenuLayer'][_0x2fe08d(0x1d5)](_0x34a86e);},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x1e8)]=function(_0x37d4d2,_0x1e108d){const _0x2ca79e=_0xd608bd;if(!this['_commonEventMenuLayer'])return;this[_0x2ca79e(0x144)]=this[_0x2ca79e(0x144)]||{},this[_0x2ca79e(0x178)](_0x37d4d2),this['createCommonEventMenuHelpWindow'](_0x37d4d2),this[_0x2ca79e(0x17c)](_0x37d4d2),this['createCommonEventMenuExtraWindows'](_0x37d4d2),this[_0x2ca79e(0x158)](_0x37d4d2,_0x1e108d),this[_0x2ca79e(0x229)]();for(const _0x16e946 of this[_0x2ca79e(0x234)]['children']){if(_0x2ca79e(0x145)!=='ajdaM'){const _0x2e7fcc=_0x272668[_0x2ca79e(0x1bc)]('['+_0x478d94['$1'][_0x2ca79e(0x222)](/\d+/g)+']');for(const _0x4473bb of _0x2e7fcc){if(_0x3903cd[_0x2ca79e(0x1d9)](_0x4473bb))return![];}return!![];}else{if(!_0x16e946)continue;_0x16e946[_0x2ca79e(0x253)]&&_0x16e946[_0x2ca79e(0x253)](_0x37d4d2['Optional'][_0x2ca79e(0x238)]??0x0);if(_0x16e946[_0x2ca79e(0x13f)]){if(_0x2ca79e(0x1ca)!==_0x2ca79e(0x1ca)){if(_0x3f7aae[_0x2ca79e(0x213)]!==_0x2ca79e(0x19b))return;for(let _0x43859f=0x1;_0x43859f<=0xa;_0x43859f++){this[_0x2ca79e(0x13c)](_0x4c3ad2,_0x43859f);}}else _0x16e946[_0x2ca79e(0x13f)]();}}}this[_0x2ca79e(0x160)]=![];},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x1e0)]=function(_0x27eb0f){const _0x234d25=_0xd608bd,_0x56ecb1=_0x27eb0f['Optional']['BoundarySize']??_0x234d25(0x16a);let _0x10142c=new Rectangle(0x0,0x0,Graphics[_0x234d25(0x155)],Graphics[_0x234d25(0x1db)]),_0x484856=0x0;if(_0x56ecb1[_0x234d25(0x222)](/(?:PADDED)/i))_0x484856=0x10;else{if(_0x56ecb1['match'](/(?:HUGE)/i))_0x234d25(0x18e)===_0x234d25(0x18e)?_0x484856=0x20:_0x5e1eb6=0x0;else{if(_0x56ecb1[_0x234d25(0x222)](/(?:LARGE)/i))_0x484856=0x30;else{if(_0x56ecb1[_0x234d25(0x222)](/(?:MEDIUM)/i)){if(_0x234d25(0x200)===_0x234d25(0x200))_0x484856=0x40;else{_0x581711-=this[_0x234d25(0x17e)](0x2),_0x54c394['match'](/(\d+)-ROW-LIST/i);const _0x38b5c5=_0x3f3886(_0x283d71['$1'])||0x0;_0xad9dad-=this[_0x234d25(0x17e)](_0x38b5c5,!![]);if(_0x2a86a1[_0x234d25(0x222)](/(?:NO-SUB)/i))_0x36cdb4-=0x0;else _0x37fe87[_0x234d25(0x222)](/(?:THICK-SUB)/i)?_0x2f859b-=this['calcWindowHeight'](0x4):_0x101a89-=this[_0x234d25(0x17e)](0x2);}}else{if(_0x56ecb1[_0x234d25(0x222)](/(?:SMALL)/i))_0x234d25(0x1da)===_0x234d25(0x1da)?_0x484856=0x60:_0x46dac5-=this[_0x234d25(0x17e)](0x4,!![]);else{if(_0x56ecb1[_0x234d25(0x222)](/(?:TINY)/i))_0x484856=0x80;else{if(_0x56ecb1['match'](/(?:MICRO)/i))_0x484856=0xa0;else _0x56ecb1[_0x234d25(0x222)](/(?:WUT)/i)&&(_0x484856=0xc0);}}}}}}if(_0x56ecb1[_0x234d25(0x222)](/(?:UI)/i))_0x234d25(0x1dc)!==_0x234d25(0x1dc)?_0xe0e8fa+=_0x490271[_0x234d25(0x173)][0x0]+'\x0a':(_0x10142c['x']=this[_0x234d25(0x20d)]['x'],_0x10142c['y']=this[_0x234d25(0x20d)]['y'],_0x10142c['width']=Graphics[_0x234d25(0x277)],_0x10142c['height']=Graphics['boxHeight']);else _0x484856&&(_0x10142c['x']+=_0x484856,_0x10142c['y']+=_0x484856,_0x10142c[_0x234d25(0x155)]-=_0x484856*0x2,_0x10142c[_0x234d25(0x1db)]-=_0x484856*0x2);return _0x10142c[_0x234d25(0x155)]=_0x10142c['width'][_0x234d25(0x1af)](0x0,Graphics[_0x234d25(0x155)]),_0x10142c['height']=_0x10142c['height'][_0x234d25(0x1af)](0x0,Graphics['height']),_0x10142c;},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x1d4)]=function(_0x4fe9d8,_0x37921d,_0x3128d5,_0xb3b029){const _0x3b8b19=_0xd608bd;return _0x4fe9d8=Math[_0x3b8b19(0x1b3)](_0x4fe9d8),_0x37921d=Math[_0x3b8b19(0x1b3)](_0x37921d),_0x3128d5=Math[_0x3b8b19(0x279)](0x0,Math[_0x3b8b19(0x1b3)](_0x3128d5)),_0xb3b029=Math[_0x3b8b19(0x279)](0x0,Math[_0x3b8b19(0x1b3)](_0xb3b029)),new Rectangle(_0x4fe9d8,_0x37921d,_0x3128d5,_0xb3b029);},Scene_Base['prototype']['createCommonEventMenuPictureWindow']=function(_0x296576){const _0x33f6f8=_0xd608bd,_0x343bea=this[_0x33f6f8(0x146)](_0x296576),_0xeacf28=new Window_CommonEventMenuPicture(_0x296576,_0x343bea);_0xeacf28[_0x33f6f8(0x149)]=0x0,this['addCommonEventMenuWindow'](_0xeacf28),this[_0x33f6f8(0x144)]['pictureWindow']=_0xeacf28;},Scene_Base[_0xd608bd(0x25e)]['commonEventMenuPictureWindowRect']=function(_0x33c13c){const _0x2dbc77=_0xd608bd,_0x2339ef=_0x33c13c[_0x2dbc77(0x213)],_0x2d5f3a=this[_0x2dbc77(0x143)](),_0x4ae0c8=this[_0x2dbc77(0x206)]();if(_0x2339ef===_0x2dbc77(0x19b))return _0x33c13c[_0x2dbc77(0x205)][_0x2dbc77(0x257)][_0x2dbc77(0x18a)](this);const _0x22b43b=this[_0x2dbc77(0x1e0)](_0x33c13c);let _0x5ec257=_0x22b43b['x'],_0x395b67=_0x22b43b['y'],_0x249f80=_0x22b43b[_0x2dbc77(0x155)],_0x5d44c5=_0x22b43b['height'];if(_0x2339ef[_0x2dbc77(0x222)](/(?:STANDARD|FIRM-LIST)/i))'BaXeh'!==_0x2dbc77(0x1e5)?_0x3d8ebd+=this[_0x2dbc77(0x17e)](_0x28c61d?0x2:0x4):_0x249f80=Math['floor'](_0x249f80/0x2);else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:HALF-BASE-PICT|LITE-LIST)/i)){if('kYHzO'!==_0x2dbc77(0x24d))return this[_0x2dbc77(0x27d)][_0x9474cd];else _0x249f80=Math[_0x2dbc77(0x170)](_0x249f80/0x2);}else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:BASE-PICT|GALLERY)/i))_0x2dbc77(0x15e)!==_0x2dbc77(0x15e)?this[_0x2dbc77(0x16e)]['x']=_0x27ee7e[_0x2dbc77(0x1b3)]((this[_0x2dbc77(0x155)]-_0x63ec40)/0x2):_0x249f80=_0x22b43b[_0x2dbc77(0x155)];else _0x2339ef[_0x2dbc77(0x222)](/(?:WIDE-LIST|FULL-SCREEN|SIDE-SUB|TALL)/i)&&(_0x249f80=0x0);}}if(_0x2339ef[_0x2dbc77(0x222)](/(?:GALLERY)/i)){_0x5d44c5-=this[_0x2dbc77(0x17e)](0x2),_0x2339ef[_0x2dbc77(0x222)](/(\d+)-ROW-LIST/i);const _0x2ee52a=Number(RegExp['$1'])||0x0;_0x5d44c5-=this[_0x2dbc77(0x17e)](_0x2ee52a,!![]);if(_0x2339ef[_0x2dbc77(0x222)](/(?:NO-SUB)/i))_0x5d44c5-=0x0;else _0x2339ef['match'](/(?:THICK-SUB)/i)?_0x5d44c5-=this[_0x2dbc77(0x17e)](0x4):_0x5d44c5-=this[_0x2dbc77(0x17e)](0x2);}else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:LITE-LIST)/i))_0x5d44c5-=this['calcWindowHeight'](0x2)+this[_0x2dbc77(0x17e)](0x4,!![]);else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i)){if(_0x2dbc77(0x248)!==_0x2dbc77(0x1f4))_0x5d44c5-=this[_0x2dbc77(0x17e)](0x2);else{const _0x5ac003=_0x1e2be0(_0x103ed0['$1']);_0x5ac003!==_0x5ed53c[_0x2b6404][_0x2dbc77(0x278)]&&(_0x435054(_0x2dbc77(0x1f7)[_0x2dbc77(0x177)](_0x1fdf17,_0x5ac003)),_0x40f6f0[_0x2dbc77(0x1fe)]());}}else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:BASE-PICT)/i)){if(_0x2dbc77(0x26f)===_0x2dbc77(0x256)){_0x3b254f['match'](/(\d+)-ROW-LIST/i);const _0x48aee6=_0x11685e(_0x7424a4['$1'])||0x1;_0x1f93e5=this[_0x2dbc77(0x17e)](_0x48aee6,!![]);}else _0x5d44c5=this[_0x2dbc77(0x17e)](0x4);}else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:THICK-SUB)/i))'oQKuJ'!==_0x2dbc77(0x189)?this[_0x2dbc77(0x16e)]['x']=0x0:_0x5d44c5-=this[_0x2dbc77(0x17e)](0x2)+this[_0x2dbc77(0x17e)](0x4);else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:FULL-SCREEN|SIDE-SUB)/i)){if(_0x2dbc77(0x25f)!==_0x2dbc77(0x1e2))_0x5d44c5=0x0;else return this[_0x2dbc77(0x13d)];}else{if(_0x2dbc77(0x140)==='yCvpX'){const _0x53652f=_0xcf4947['commonEventMenuDescription'](_0x5b4036,_0x2dbc77(0x27e));this[_0x2dbc77(0x263)][_0x2dbc77(0x14f)]['setText'](_0x53652f);}else _0x5d44c5-=this[_0x2dbc77(0x17e)](0x2)*0x2;}}}}}}if(_0x2339ef[_0x2dbc77(0x222)](/(?:BASE-PICT|LITE-LIST)/i)){if(_0x2dbc77(0x231)!==_0x2dbc77(0x231))_0x1500d0=0x60;else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:MIRROR)/i)){if(_0x2dbc77(0x1bd)===_0x2dbc77(0x1bd))_0x5ec257+=_0x2d5f3a?0x0:_0x22b43b[_0x2dbc77(0x155)]-_0x249f80;else return _0x1904e6[_0x2dbc77(0x205)]['Picture_Window_JS'][_0x2dbc77(0x18a)](this);}else _0x2dbc77(0x1c4)!=='EYxtI'?_0x435f4f-=this[_0x2dbc77(0x17e)](0x2)+this[_0x2dbc77(0x17e)](0x4):_0x5ec257+=_0x2d5f3a?_0x22b43b[_0x2dbc77(0x155)]-_0x249f80:0x0;}}else _0x2dbc77(0x270)!=='bwEjt'?_0x27e421=0x30:_0x2339ef[_0x2dbc77(0x222)](/(?:MIRROR)/i)?_0x5ec257+=_0x2d5f3a?_0x22b43b[_0x2dbc77(0x155)]-_0x249f80:0x0:_0x2dbc77(0x1ce)===_0x2dbc77(0x20a)?_0xf431d4['match'](/(?:INVERSE)/i)?_0x5d8dff+=_0x14f923?_0x490857[_0x2dbc77(0x1db)]-_0x5b48da:0x0:_0x1e37eb+=_0x4d64f2?0x0:_0x6fd586[_0x2dbc77(0x1db)]-_0x4205ae:_0x5ec257+=_0x2d5f3a?0x0:_0x22b43b[_0x2dbc77(0x155)]-_0x249f80;if(_0x2339ef[_0x2dbc77(0x222)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i)){if(_0x2dbc77(0x15b)===_0x2dbc77(0x21b))this[_0x2dbc77(0x25a)](...arguments);else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:INVERSE)/i)){if(_0x2dbc77(0x18b)===_0x2dbc77(0x18b))_0x395b67+=_0x4ae0c8?this['calcWindowHeight'](0x2):0x0;else{const _0x1e058a=this[_0x2dbc77(0x144)][_0x2dbc77(0x1c7)],_0x44ea79=_0x1e058a[_0x2dbc77(0x1f6)]();_0x54ab76[_0x2dbc77(0x193)](_0x44ea79),this[_0x2dbc77(0x180)](_0x44ea79);}}else _0x2dbc77(0x191)!==_0x2dbc77(0x191)?_0x2cdd33[_0x2dbc77(0x222)](/(?:MIRROR)/i)?_0x524777+=_0x41cf86?0x0:_0xfa0e48[_0x2dbc77(0x155)]-_0x1193a1:_0x276f3a+=_0x2591ba?_0x22b43d[_0x2dbc77(0x155)]-_0x1eda89:0x0:_0x395b67+=_0x4ae0c8?0x0:this[_0x2dbc77(0x17e)](0x2);}}else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:BASE-PICT|LITE-LIST)/i))_0x2339ef[_0x2dbc77(0x222)](/(?:INVERSE)/i)?_0x395b67+=_0x4ae0c8?_0x22b43b[_0x2dbc77(0x1db)]-_0x5d44c5:0x0:_0x395b67+=_0x4ae0c8?0x0:_0x22b43b[_0x2dbc77(0x1db)]-_0x5d44c5;else{if(_0x2339ef[_0x2dbc77(0x222)](/(?:THICK-SUB)/i)){if(_0x2dbc77(0x1ba)===_0x2dbc77(0x1a7)){const _0x524b24=_0x4e4822[_0x2dbc77(0x21a)](_0x39b94b);this[_0x2dbc77(0x263)][_0x2dbc77(0x26d)][_0x2dbc77(0x13a)](_0x524b24);}else{if(_0x2339ef['match'](/(?:INVERSE)/i))_0x395b67+=this[_0x2dbc77(0x17e)](_0x4ae0c8?0x2:0x4);else{if(_0x2dbc77(0x1b9)===_0x2dbc77(0x1e4)){this[_0x2dbc77(0x27d)]=this[_0x2dbc77(0x27d)]||[];if(this[_0x2dbc77(0x27d)][_0x1b3bb6]!==_0x379e89)return this[_0x2dbc77(0x27d)][_0x48c614];}else _0x395b67+=this[_0x2dbc77(0x17e)](_0x4ae0c8?0x4:0x2);}}}else _0x395b67+=this['calcWindowHeight'](0x2);}}return $gameTemp[_0x2dbc77(0x1cd)]&&('TIlqJ'!==_0x2dbc77(0x252)?_0x4a18bd=_0x1b0483[_0x2dbc77(0x1db)]:console['log'](_0x2dbc77(0x184),_0x5ec257,_0x395b67,_0x249f80,_0x5d44c5)),this[_0x2dbc77(0x1d4)](_0x5ec257,_0x395b67,_0x249f80,_0x5d44c5);},Scene_Base[_0xd608bd(0x25e)]['createCommonEventMenuHelpWindow']=function(_0x55271b){const _0x500cea=_0xd608bd,_0x2110c5=this[_0x500cea(0x204)](_0x55271b),_0x2a211c=new Window_Help(_0x2110c5);_0x2a211c['openness']=0x0,this['addCommonEventMenuWindow'](_0x2a211c),this['_commonEventMenuWindows'][_0x500cea(0x1ed)]=_0x2a211c;},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x204)]=function(_0x503d6b){const _0x3ade26=_0xd608bd,_0x4dae4c=_0x503d6b[_0x3ade26(0x213)],_0x35772c=this['isRightInputMode'](),_0x2e16e8=this[_0x3ade26(0x206)]();if(_0x4dae4c==='Custom')return _0x503d6b[_0x3ade26(0x205)][_0x3ade26(0x1c5)][_0x3ade26(0x18a)](this);const _0x452de1=this[_0x3ade26(0x1e0)](_0x503d6b);let _0x25d3c8=_0x452de1['x'],_0x4296e3=_0x452de1['y'],_0x4009f7=_0x452de1[_0x3ade26(0x155)],_0x55b850=this[_0x3ade26(0x17e)](0x2);if(_0x4dae4c[_0x3ade26(0x222)](/(?:NO-HELP|FULL-SCREEN)/i))_0x4009f7=0x0;else{if(_0x4dae4c['match'](/(?:TALL)/i)){if(_0x3ade26(0x172)===_0x3ade26(0x1b5)){const _0x55ed4=_0xcec13d['x']+_0x421225['floor']((_0x2764ec[_0x3ade26(0x155)]-_0x4e80eb)/0x2);this[_0x3ade26(0x1dd)](_0x13226c,_0x55ed4,_0x533007['y'],_0x48a9ec);}else _0x4009f7=Math[_0x3ade26(0x170)](_0x452de1['width']/0x2);}}return _0x4dae4c[_0x3ade26(0x222)](/(?:NO-HELP|FULL-SCREEN)/i)&&(_0x3ade26(0x1a1)===_0x3ade26(0x1a1)?_0x55b850=0x0:_0x166b63-=this[_0x3ade26(0x17e)](0x2)*0x2),_0x4dae4c['match'](/(?:MIRROR)/i)?_0x25d3c8+=_0x35772c?0x0:_0x452de1[_0x3ade26(0x155)]-_0x4009f7:_0x25d3c8+=_0x35772c?_0x452de1[_0x3ade26(0x155)]-_0x4009f7:0x0,_0x4dae4c[_0x3ade26(0x222)](/(?:INVERSE)/i)?_0x3ade26(0x211)!==_0x3ade26(0x211)?_0x4c7051=_0x5def19(_0x212593['$1']):_0x4296e3+=_0x2e16e8?0x0:_0x452de1['height']-_0x55b850:_0x4296e3+=_0x2e16e8?_0x452de1[_0x3ade26(0x1db)]-_0x55b850:0x0,$gameTemp[_0x3ade26(0x1cd)]&&('HgULv'!==_0x3ade26(0x226)?console[_0x3ade26(0x1f0)](_0x3ade26(0x1be),_0x25d3c8,_0x4296e3,_0x4009f7,_0x55b850):_0x424ea8-=this[_0x3ade26(0x17e)](0x2)),this['commonEventMenuRectangle'](_0x25d3c8,_0x4296e3,_0x4009f7,_0x55b850);},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x17c)]=function(_0x1e172e){const _0x9a691c=_0xd608bd,_0x443cd4=this['commonEventMenuSubWindowRect'](_0x1e172e),_0x33b80a=new Window_Help(_0x443cd4);_0x33b80a[_0x9a691c(0x149)]=0x0,this[_0x9a691c(0x163)](_0x33b80a),this[_0x9a691c(0x144)][_0x9a691c(0x14f)]=_0x33b80a;},Scene_Base[_0xd608bd(0x25e)]['commonEventMenuSubWindowRect']=function(_0x1f57d0){const _0x278520=_0xd608bd,_0x4eeed0=_0x1f57d0[_0x278520(0x213)],_0x471f7a=this[_0x278520(0x143)](),_0x535dbb=this[_0x278520(0x206)]();if(_0x4eeed0==='Custom')return _0x1f57d0[_0x278520(0x205)]['Sub_Window_JS'][_0x278520(0x18a)](this);const _0x22384f=this[_0x278520(0x1e0)](_0x1f57d0);let _0x596590=_0x22384f['x'],_0x2807e4=_0x22384f['y'],_0x51981b=_0x22384f[_0x278520(0x155)],_0x483cf6=this['calcWindowHeight'](0x2);if(_0x4eeed0['match'](/(?:FIRM-LIST)/i)){if(_0x278520(0x212)===_0x278520(0x212))_0x51981b=Math['ceil'](_0x22384f[_0x278520(0x155)]/0x2);else{if(_0x57dab4&&_0x20a787[_0x278520(0x245)])_0x5ca0be['close']();}}else{if(_0x4eeed0['match'](/(?:SIDE-SUB)/i))_0x51981b=Math[_0x278520(0x218)](_0x22384f[_0x278520(0x155)]/0x2);else{if(_0x4eeed0[_0x278520(0x222)](/(?:SUB-CORNER|TALL)/i)){if(_0x4eeed0[_0x278520(0x222)](/(?:SUB-CORNER-LIST|TALL)/i))_0x51981b=Math[_0x278520(0x170)](_0x22384f['width']/0x2);else _0x4eeed0[_0x278520(0x222)](/(?:SUB-CORNER-PICT)/i)&&(_0x51981b=Math['floor'](_0x22384f[_0x278520(0x155)]/0x2));}else _0x4eeed0[_0x278520(0x222)](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)&&(_0x51981b=0x0);}}if(_0x4eeed0[_0x278520(0x222)](/(?:SIDE-SUB)/i))_0x483cf6=_0x22384f['height'],_0x483cf6-=this['calcWindowHeight'](0x2),_0x4eeed0[_0x278520(0x222)](/(?:FIRM-LIST)/i)&&(_0x483cf6-=this['calcWindowHeight'](0x4,!![]));else{if(_0x4eeed0[_0x278520(0x222)](/(?:THICK-SUB)/i))'DjYbV'!==_0x278520(0x198)?_0x58b886+=_0x884620?0x0:_0x3f2779[_0x278520(0x155)]-_0x1c3187:_0x483cf6=this[_0x278520(0x17e)](0x4);else _0x4eeed0[_0x278520(0x222)](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)&&(_0x483cf6=0x0);}if(_0x4eeed0[_0x278520(0x222)](/(?:SIDE-SUB)/i)&&!_0x4eeed0['match'](/(?:FIRM-LIST)/i)){if(_0x278520(0x223)!==_0x278520(0x223)){const _0x5e2b26=_0x32c0be[_0x278520(0x1bc)]('['+_0x38f1eb['$1'][_0x278520(0x222)](/\d+/g)+']');for(const _0x56e6d6 of _0x5e2b26){if(!_0x75692e['value'](_0x56e6d6))return![];}return!![];}else _0x4eeed0['match'](/(?:MIRROR)/i)?_0x596590+=_0x471f7a?_0x22384f[_0x278520(0x155)]-_0x51981b:0x0:_0x278520(0x21e)===_0x278520(0x21e)?_0x596590+=_0x471f7a?0x0:_0x22384f[_0x278520(0x155)]-_0x51981b:this[_0x278520(0x16e)]['y']=this[_0x278520(0x1db)]-_0x3473fc;}else{if(_0x4eeed0[_0x278520(0x222)](/(?:SUB-CORNER-LIST|FIRM-LIST|TALL)/i)){if(_0x4eeed0[_0x278520(0x222)](/(?:MIRROR)/i))_0x596590+=_0x471f7a?0x0:_0x22384f[_0x278520(0x155)]-_0x51981b;else{if(_0x278520(0x13b)==='FweeA')_0x596590+=_0x471f7a?_0x22384f[_0x278520(0x155)]-_0x51981b:0x0;else{let _0xfdb263=0x0;this[_0x278520(0x1a8)][_0x278520(0x176)]()[_0x278520(0x284)]()===_0x278520(0x22b)?_0xfdb263=_0x20ce0c[_0x278520(0x244)]():_0xfdb263=_0x1fff63(this['_autoSelect']);const _0x3592b0=_0x4cda9b['max'](0x0,this[_0x278520(0x243)](_0xfdb263));this[_0x278520(0x18d)](_0x3592b0);}}}else{if(_0x4eeed0['match'](/(?:SUB-CORNER-PICT)/i)){if(_0x4eeed0['match'](/(?:MIRROR)/i))_0x596590+=_0x471f7a?_0x22384f['width']-_0x51981b:0x0;else{if(_0x278520(0x199)===_0x278520(0x199))_0x596590+=_0x471f7a?0x0:_0x22384f[_0x278520(0x155)]-_0x51981b;else{this[_0x278520(0x144)]={};while(this['_commonEventMenuLayer'][_0x278520(0x14d)]['length']>0x0){this[_0x278520(0x234)][_0x278520(0x14d)][_0x278520(0x23d)]();}this[_0x278520(0x160)]=!![];}}}}}if(_0x4eeed0['match'](/(?:SIDE-SUB)/i)&&!_0x4eeed0[_0x278520(0x222)](/(?:FIRM-LIST)/i)){if(_0x278520(0x1cc)!=='iofDk')_0x4eeed0[_0x278520(0x222)](/(?:INVERSE)/i)?_0x278520(0x164)!==_0x278520(0x280)?_0x2807e4+=_0x535dbb?this[_0x278520(0x17e)](0x2):0x0:this[_0x278520(0x224)]=_0xb80466(this[_0x278520(0x224)])||0x1:_0x2807e4+=_0x535dbb?0x0:this[_0x278520(0x17e)](0x2);else{if(_0x1d25da[_0x278520(0x249)]())_0x40483e(_0x278520(0x267));return;}}else _0x4eeed0[_0x278520(0x222)](/(?:INVERSE)/i)?_0x2807e4+=_0x535dbb?_0x22384f['height']-_0x483cf6:0x0:_0x278520(0x246)!==_0x278520(0x246)?_0x3c1a0b+=_0x4d14a4?_0x55bfcf['width']-_0x437c17:0x0:_0x2807e4+=_0x535dbb?0x0:_0x22384f[_0x278520(0x1db)]-_0x483cf6;return $gameTemp[_0x278520(0x1cd)]&&console[_0x278520(0x1f0)](_0x278520(0x168),_0x596590,_0x2807e4,_0x51981b,_0x483cf6),this[_0x278520(0x1d4)](_0x596590,_0x2807e4,_0x51981b,_0x483cf6);},Scene_Base[_0xd608bd(0x25e)]['createCommonEventMenuExtraWindows']=function(_0x2e5de7){const _0x278444=_0xd608bd;if(_0x2e5de7[_0x278444(0x213)]!==_0x278444(0x19b))return;for(let _0x3641bd=0x1;_0x3641bd<=0xa;_0x3641bd++){this['createCommonEventMenuExtraWindow'](_0x2e5de7,_0x3641bd);}},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x13c)]=function(_0x14080c,_0x17fe56){const _0x4089de=_0xd608bd;if(!_0x14080c[_0x4089de(0x205)]['Extra_Window_%1_JS'[_0x4089de(0x177)](_0x17fe56)])return;const _0x584c6d=_0x14080c[_0x4089de(0x205)][_0x4089de(0x21d)[_0x4089de(0x177)](_0x17fe56)][_0x4089de(0x18a)](this),_0x3d1a35=new Window_Help(_0x584c6d);_0x3d1a35[_0x4089de(0x149)]=0x0,this[_0x4089de(0x163)](_0x3d1a35),this[_0x4089de(0x144)][_0x4089de(0x201)[_0x4089de(0x177)](_0x17fe56)]=_0x3d1a35;},Scene_Base['prototype']['createCommonEventMenuListWindow']=function(_0x455a39,_0x4b051a){const _0x4862ac=_0xd608bd,_0x33bf45=this[_0x4862ac(0x219)](_0x455a39),_0x9c6e3d=new Window_CommonEventMenuList(_0x455a39,_0x4b051a,_0x33bf45);_0x9c6e3d[_0x4862ac(0x149)]=0x0,this['addCommonEventMenuWindow'](_0x9c6e3d),this[_0x4862ac(0x144)][_0x4862ac(0x1c7)]=_0x9c6e3d,_0x9c6e3d[_0x4862ac(0x165)](_0x4862ac(0x242),this[_0x4862ac(0x179)][_0x4862ac(0x171)](this)),_0x455a39['CancelEvent']&&$dataCommonEvents[_0x455a39[_0x4862ac(0x1a5)]]&&_0x9c6e3d[_0x4862ac(0x165)]('cancel',this[_0x4862ac(0x260)][_0x4862ac(0x171)](this));},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x219)]=function(_0x4e4f6c){const _0x5c5fec=_0xd608bd,_0x32955b=_0x4e4f6c[_0x5c5fec(0x213)],_0x130bbb=this[_0x5c5fec(0x143)](),_0x42a68f=this['isBottomHelpMode']();if(_0x32955b==='Custom'){if(_0x5c5fec(0x1c8)===_0x5c5fec(0x1c8))return _0x4e4f6c['CustomLayout']['List_Window_JS']['call'](this);else this[_0x5c5fec(0x13c)](_0x425c24,_0x3e6515);}const _0x597b3c=this[_0x5c5fec(0x1e0)](_0x4e4f6c);let _0x45f8fe=_0x597b3c['x'],_0x5c025a=_0x597b3c['y'],_0x1ef6d8=_0x597b3c[_0x5c5fec(0x155)],_0x5bba20=_0x597b3c[_0x5c5fec(0x1db)];_0x32955b['match'](/(?:STANDARD|SIDE-SUB|TALL)/i)&&(_0x1ef6d8=Math['ceil'](_0x597b3c[_0x5c5fec(0x155)]/0x2));if(_0x32955b[_0x5c5fec(0x222)](/(?:GALLERY)/i)){_0x32955b[_0x5c5fec(0x222)](/(\d+)-ROW-LIST/i);const _0x2d5613=Number(RegExp['$1'])||0x1;_0x5bba20=this['calcWindowHeight'](_0x2d5613,!![]);}else{if(_0x32955b[_0x5c5fec(0x222)](/(?:LITE-LIST|FIRM-LIST)/i))_0x5bba20=this[_0x5c5fec(0x17e)](0x4,!![]);else{if(_0x32955b[_0x5c5fec(0x222)](/(?:HALF-BASE-PICT)/i))_0x5bba20-=this['calcWindowHeight'](0x2)+this[_0x5c5fec(0x17e)](0x4);else{if(_0x32955b[_0x5c5fec(0x222)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i))_0x5bba20-=this[_0x5c5fec(0x17e)](0x2);else{if(_0x32955b[_0x5c5fec(0x222)](/(?:THICK-SUB|BASE-PICT)/i)){if(_0x5c5fec(0x227)!==_0x5c5fec(0x17f))_0x5bba20-=this[_0x5c5fec(0x17e)](0x2)+this[_0x5c5fec(0x17e)](0x4);else{const _0x5a6add=_0x1315b6[_0x5c5fec(0x1bc)]('['+_0x50ff73['$1'][_0x5c5fec(0x222)](/\d+/g)+']');for(const _0x26c07d of _0x5a6add){if(!_0x365abd[_0x5c5fec(0x1d9)](_0x26c07d))return!![];}return![];}}else _0x32955b[_0x5c5fec(0x222)](/(?:FULL-SCREEN)/i)?_0x5bba20=_0x597b3c[_0x5c5fec(0x1db)]:_0x5bba20-=this[_0x5c5fec(0x17e)](0x2)*0x2;}}}}if(_0x32955b[_0x5c5fec(0x222)](/(?:MIRROR)/i)){if(_0x5c5fec(0x1c2)!==_0x5c5fec(0x1b0))_0x45f8fe+=_0x130bbb?0x0:_0x597b3c[_0x5c5fec(0x155)]-_0x1ef6d8;else{const _0x470145=this[_0x5c5fec(0x144)][_0x5c5fec(0x1c7)],_0x21e7f0=_0x3aa62a[_0xe2773d],_0x3aeaff=_0x470145['_interpreter'];_0x3aeaff['setupChild'](_0x21e7f0[_0x5c5fec(0x1a9)],_0x3aeaff[_0x5c5fec(0x1a4)]()),this[_0x5c5fec(0x157)]();}}else _0x45f8fe+=_0x130bbb?_0x597b3c[_0x5c5fec(0x155)]-_0x1ef6d8:0x0;if(_0x32955b[_0x5c5fec(0x222)](/(?:GALLERY)/i)){if(_0x5c5fec(0x1ea)==='zlLhq'){const _0x3389db=this[_0x5c5fec(0x17e)](0x2);let _0x1d9822=this['calcWindowHeight'](0x2);if(_0x32955b[_0x5c5fec(0x222)](/(?:NO-SUB)/i))_0x5c5fec(0x1c0)!==_0x5c5fec(0x24c)?_0x1d9822=0x0:this[_0x5c5fec(0x283)]=_0x24bc00;else _0x32955b[_0x5c5fec(0x222)](/(?:THICK-SUB)/i)&&(_0x1d9822=this[_0x5c5fec(0x17e)](0x4));_0x5c025a+=_0x597b3c[_0x5c5fec(0x1db)]-_0x5bba20,_0x32955b[_0x5c5fec(0x222)](/(?:INVERSE)/i)?_0x5c025a-=_0x42a68f?_0x1d9822:_0x3389db:_0x5c025a-=_0x42a68f?_0x3389db:_0x1d9822;}else _0x3d59f4[_0x5c5fec(0x222)](/(?:MIRROR)/i)?_0x4cc14c+=_0x119102?0x0:_0x428e6d[_0x5c5fec(0x155)]-_0x2a94ac:_0x12fe65+=_0x374746?_0x3700cf[_0x5c5fec(0x155)]-_0x3a34bb:0x0;}else{if(_0x32955b['match'](/(?:LITE-LIST|FIRM-LIST)/i)){if(_0x5c5fec(0x1f3)!==_0x5c5fec(0x1f3))_0x553c1e=_0x29a4f8[_0x5c5fec(0x170)](_0x2fa28f[_0x5c5fec(0x155)]/0x2);else{const _0x335280=this[_0x5c5fec(0x17e)](0x2),_0x1755bc=_0x597b3c[_0x5c5fec(0x1db)]-_0x335280-_0x5bba20;_0x32955b[_0x5c5fec(0x222)](/(?:INVERSE)/i)?'ERQfk'!==_0x5c5fec(0x1cf)?_0x39598a[_0x5c5fec(0x253)](_0x22a67d[_0x5c5fec(0x216)][_0x5c5fec(0x238)]??0x0):_0x5c025a+=_0x42a68f?_0x335280:_0x1755bc:_0x5c025a+=_0x42a68f?_0x1755bc:_0x335280;}}else{if(_0x32955b[_0x5c5fec(0x222)](/(?:HALF-BASE-PICT)/i)){if(_0x32955b[_0x5c5fec(0x222)](/(?:INVERSE)/i)){if(_0x5c5fec(0x1c1)===_0x5c5fec(0x1c1))_0x5c025a+=this['calcWindowHeight'](_0x42a68f?0x2:0x4);else{const _0x401598=_0x41d0ae(_0x52ab42['$1']);_0x401598<_0x5e4c81?(_0x28db9c(_0x5c5fec(0x1ee)['format'](_0x3c188b,_0x401598,_0x37d1a0)),_0xcbc353['exit']()):_0x11d50b=_0x5067f1[_0x5c5fec(0x279)](_0x401598,_0x31ce57);}}else _0x5c025a+=this['calcWindowHeight'](_0x42a68f?0x4:0x2);}else{if(_0x32955b[_0x5c5fec(0x222)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i)){if(_0x5c5fec(0x169)!==_0x5c5fec(0x169))return this[_0x5c5fec(0x1e9)]&&this[_0x5c5fec(0x1e9)]instanceof _0x6cefa6;else _0x32955b[_0x5c5fec(0x222)](/(?:INVERSE)/i)?_0x5c025a+=_0x42a68f?this[_0x5c5fec(0x17e)](0x2):0x0:_0x5c025a+=_0x42a68f?0x0:this[_0x5c5fec(0x17e)](0x2);}else{if(_0x32955b[_0x5c5fec(0x222)](/(?:THICK-SUB|BASE-PICT)/i)){if(_0x32955b[_0x5c5fec(0x222)](/(?:INVERSE)/i))_0x5c025a+=this[_0x5c5fec(0x17e)](_0x42a68f?0x2:0x4);else{if(_0x5c5fec(0x1bf)!==_0x5c5fec(0x167))_0x5c025a+=this[_0x5c5fec(0x17e)](_0x42a68f?0x4:0x2);else{this[_0x5c5fec(0x27c)]=this[_0x5c5fec(0x27c)]||[];if(this[_0x5c5fec(0x27c)][_0x8f5883]!==_0x31683)return this[_0x5c5fec(0x27c)][_0x4e7058];}}}else _0x32955b['match'](/(?:FULL-SCREEN)/i)?_0x5c025a=_0x597b3c['y']:_0x5c025a+=this[_0x5c5fec(0x17e)](0x2);}}}}return $gameTemp[_0x5c5fec(0x1cd)]&&(_0x5c5fec(0x1ac)!==_0x5c5fec(0x1ac)?_0x4ae3ee=_0x3b08fb[_0x5c5fec(0x170)](_0x45e2af/0x2):console[_0x5c5fec(0x1f0)](_0x5c5fec(0x1c3),_0x45f8fe,_0x5c025a,_0x1ef6d8,_0x5bba20)),this[_0x5c5fec(0x1d4)](_0x45f8fe,_0x5c025a,_0x1ef6d8,_0x5bba20);},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x229)]=function(){const _0x181a2b=_0xd608bd,_0x5c2fd3=this[_0x181a2b(0x144)][_0x181a2b(0x1c7)];for(const _0x4bd761 in this['_commonEventMenuWindows']){if(_0x4bd761===_0x181a2b(0x1c7))continue;_0x5c2fd3[_0x181a2b(0x275)](this[_0x181a2b(0x144)][_0x4bd761],_0x4bd761);}_0x5c2fd3['callUpdateHelp']();},Scene_Base['prototype']['onCommonEventMenuOk']=function(){const _0x40595b=_0xd608bd,_0x377355=this[_0x40595b(0x144)][_0x40595b(0x1c7)],_0x1de766=_0x377355[_0x40595b(0x1f6)]();$gameSystem[_0x40595b(0x193)](_0x1de766),this[_0x40595b(0x180)](_0x1de766);},Scene_Base[_0xd608bd(0x25e)]['onCommonEventMenuCancel']=function(){const _0x3ab5a1=_0xd608bd,_0x307145=this[_0x3ab5a1(0x144)][_0x3ab5a1(0x1c7)],_0x569b36=_0x307145['_settings']['CancelEvent'];this[_0x3ab5a1(0x180)](_0x569b36);},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x180)]=function(_0x1cb24d){const _0xf90a77=_0xd608bd,_0x286746=this[_0xf90a77(0x144)]['listWindow'],_0x1a3b9a=$dataCommonEvents[_0x1cb24d],_0x2cbb1a=_0x286746[_0xf90a77(0x240)];_0x2cbb1a['setupChild'](_0x1a3b9a[_0xf90a77(0x1a9)],_0x2cbb1a['eventId']()),this[_0xf90a77(0x157)]();},Scene_Base[_0xd608bd(0x25e)][_0xd608bd(0x157)]=function(){const _0x2364e2=_0xd608bd;for(const _0x5d8fce of this[_0x2364e2(0x234)][_0x2364e2(0x14d)]){if(_0x2364e2(0x162)!=='UQboC'){const _0x20a475=_0x351194[_0x2364e2(0x1d0)](_0x78ef65);_0x20a475[_0x2364e2(0x197)](this[_0x2364e2(0x1d2)][_0x2364e2(0x171)](this,_0x594567,_0x20a475));}else{if(_0x5d8fce&&_0x5d8fce['close'])_0x5d8fce[_0x2364e2(0x245)]();}}setTimeout(this['closeCommonEventMenuDelay']['bind'](this),0xc8);},Scene_Base['prototype']['closeCommonEventMenuDelay']=function(){const _0xfe538b=_0xd608bd;this[_0xfe538b(0x144)]={};while(this['_commonEventMenuLayer'][_0xfe538b(0x14d)]['length']>0x0){this[_0xfe538b(0x234)]['children'][_0xfe538b(0x23d)]();}this[_0xfe538b(0x160)]=!![];};function Window_CommonEventMenuPicture(){const _0x3a4643=_0xd608bd;this[_0x3a4643(0x25a)](...arguments);}Window_CommonEventMenuPicture[_0xd608bd(0x25e)]=Object[_0xd608bd(0x272)](Window_Base['prototype']),Window_CommonEventMenuPicture[_0xd608bd(0x25e)]['constructor']=Window_CommonEventMenuPicture,Window_CommonEventMenuPicture[_0xd608bd(0x25e)]['initialize']=function(_0x526732,_0x1542fd){const _0x55985f=_0xd608bd;this[_0x55985f(0x1d7)]=_0x526732,this[_0x55985f(0x1f9)]='',Window_Base[_0x55985f(0x25e)][_0x55985f(0x25a)][_0x55985f(0x18a)](this,_0x1542fd),this[_0x55985f(0x187)]();},Window_CommonEventMenuPicture[_0xd608bd(0x25e)][_0xd608bd(0x187)]=function(){const _0x298a16=_0xd608bd;this[_0x298a16(0x1b7)]=this[_0x298a16(0x1d7)][_0x298a16(0x216)][_0x298a16(0x154)]??_0x298a16(0x232),this[_0x298a16(0x1e3)]=this[_0x298a16(0x1d7)][_0x298a16(0x216)][_0x298a16(0x24b)]??_0x298a16(0x192),this[_0x298a16(0x1e1)]=this[_0x298a16(0x1d7)]['Optional']['PictureAutoFit']??!![];},Window_CommonEventMenuPicture[_0xd608bd(0x25e)][_0xd608bd(0x13a)]=function(_0x256432){const _0x2b765c=_0xd608bd;_0x256432=_0x256432[_0x2b765c(0x284)]();if(this[_0x2b765c(0x1f9)]===_0x256432)return;this[_0x2b765c(0x1f9)]=_0x256432;if(_0x256432==='')this[_0x2b765c(0x268)][_0x2b765c(0x16b)]();else{const _0x461e1d=ImageManager[_0x2b765c(0x1d0)](_0x256432);_0x461e1d['addLoadListener'](this[_0x2b765c(0x1d2)][_0x2b765c(0x171)](this,_0x256432,_0x461e1d));}},Window_CommonEventMenuPicture[_0xd608bd(0x25e)][_0xd608bd(0x1d2)]=function(_0x4990a8,_0x3da1d9){const _0x52268e=_0xd608bd;if(this['_filename']!==_0x4990a8)return;if(this[_0x52268e(0x156)]<=0x0)return;this[_0x52268e(0x268)][_0x52268e(0x16b)]();const _0x830774=_0x3da1d9[_0x52268e(0x155)],_0x5c1398=_0x3da1d9[_0x52268e(0x1db)];let _0x4988ca=0x0,_0x3fd94f=0x0,_0x105987=_0x830774,_0x98d0b4=_0x5c1398;if(this['_autoFit']){const _0x458888=this['innerWidth']/_0x830774,_0x40883a=this['innerHeight']/_0x5c1398,_0x312669=Math[_0x52268e(0x210)](_0x458888,_0x40883a,0x1);_0x105987=Math['round'](_0x312669*_0x105987),_0x98d0b4=Math[_0x52268e(0x1b3)](_0x312669*_0x98d0b4);}if(this['_anchorX']==='left')_0x4988ca=0x0;else{if(this[_0x52268e(0x1b7)]===_0x52268e(0x232))_0x52268e(0x1ae)!=='taaTK'?_0x4988ca=Math['max'](0x0,Math[_0x52268e(0x1b3)]((this[_0x52268e(0x156)]-_0x105987)/0x2)):_0x4c4073=0x0;else this[_0x52268e(0x1b7)]==='right'&&(_0x4988ca=this[_0x52268e(0x156)]-_0x105987);}if(this[_0x52268e(0x1e3)]===_0x52268e(0x237)){if(_0x52268e(0x203)===_0x52268e(0x19a))return this[_0x52268e(0x27c)][_0x4e679c]=_0x5d6a24,this[_0x52268e(0x27c)][_0x19287b];else _0x3fd94f=0x0;}else{if(this['_anchorY']==='middle')'vzfBk'!==_0x52268e(0x14e)?(this[_0x52268e(0x1d7)]=_0x346549,this['_filename']='',_0x2493bc[_0x52268e(0x25e)]['initialize'][_0x52268e(0x18a)](this,_0x26d9ee),this[_0x52268e(0x187)]()):_0x3fd94f=Math[_0x52268e(0x279)](0x0,Math['round']((this[_0x52268e(0x21c)]-_0x98d0b4)/0x2));else this['_anchorY']===_0x52268e(0x17a)&&(_0x3fd94f=this[_0x52268e(0x21c)]-_0x98d0b4);}this[_0x52268e(0x268)][_0x52268e(0x20f)](_0x3da1d9,0x0,0x0,_0x830774,_0x5c1398,_0x4988ca,_0x3fd94f,_0x105987,_0x98d0b4);};function Window_CommonEventMenuList(){const _0x4271c6=_0xd608bd;this[_0x4271c6(0x25a)](...arguments);}Window_CommonEventMenuList[_0xd608bd(0x25e)]=Object['create'](Window_Command[_0xd608bd(0x25e)]),Window_CommonEventMenuList['prototype'][_0xd608bd(0x16f)]=Window_CommonEventMenuList,Window_CommonEventMenuList['prototype']['initialize']=function(_0x54e73a,_0x3b3875,_0x465ce5){const _0x31a8b0=_0xd608bd;this[_0x31a8b0(0x1d7)]=_0x54e73a,this[_0x31a8b0(0x240)]=_0x3b3875,this[_0x31a8b0(0x187)](_0x465ce5),Window_Command[_0x31a8b0(0x25e)]['initialize']['call'](this,_0x465ce5),this[_0x31a8b0(0x1fc)](),this[_0x31a8b0(0x1c6)]();},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x187)]=function(_0x47ffb0){const _0x22f24c=_0xd608bd;this[_0x22f24c(0x224)]=this['_settings'][_0x22f24c(0x216)][_0x22f24c(0x1b1)]??_0x22f24c(0x24a),this[_0x22f24c(0x224)]===_0x22f24c(0x24a)?_0x22f24c(0x25c)!==_0x22f24c(0x25c)?_0x28477a[_0x22f24c(0x222)](/(?:INVERSE)/i)?_0x2f70c8+=_0x5718b2?this[_0x22f24c(0x17e)](0x2):0x0:_0x24984c+=_0x5bae79?0x0:this['calcWindowHeight'](0x2):this[_0x22f24c(0x224)]=_0x47ffb0['width']>=Graphics['width']*0x2/0x3?0x2:0x1:this[_0x22f24c(0x224)]=eval(this['_columns'])||0x1,this[_0x22f24c(0x13d)]=this[_0x22f24c(0x1d7)][_0x22f24c(0x216)][_0x22f24c(0x215)]??'left',this[_0x22f24c(0x1a8)]=this['_settings'][_0x22f24c(0x216)]['AutoSelect']??'0';},Window_CommonEventMenuList[_0xd608bd(0x25e)]['createCancelButton']=function(){const _0x24802b=_0xd608bd;if(this['_settings']['CancelEvent']<=0x0)return;if(!$dataCommonEvents[this[_0x24802b(0x1d7)][_0x24802b(0x1a5)]])return;if(!ConfigManager['touchUI'])return;if(this['_settings'][_0x24802b(0x216)][_0x24802b(0x1a5)]===![])return;this['_cancelButton']=new Sprite_Button(_0x24802b(0x1fd)),this[_0x24802b(0x16e)][_0x24802b(0x142)]=![],this[_0x24802b(0x1d5)](this[_0x24802b(0x16e)]);const _0x90c79c=this[_0x24802b(0x1d7)]['Optional']['CancelButtonScale']??0.8;this[_0x24802b(0x16e)][_0x24802b(0x221)]['x']=this['_cancelButton'][_0x24802b(0x221)]['y']=_0x90c79c;const _0x5617a6=this[_0x24802b(0x16e)][_0x24802b(0x155)]*_0x90c79c,_0x2f6797=this['_cancelButton']['height']*_0x90c79c,_0xe9c9f0=(this[_0x24802b(0x1d7)][_0x24802b(0x216)][_0x24802b(0x1b8)]??_0x24802b(0x1e6))['toLowerCase']()[_0x24802b(0x284)]();if(_0xe9c9f0[_0x24802b(0x222)](/LEFT/i))this['_cancelButton']['x']=0x0;else{if(_0xe9c9f0[_0x24802b(0x222)](/CENTER/i))this['_cancelButton']['x']=Math['round']((this[_0x24802b(0x155)]-_0x5617a6)/0x2);else _0xe9c9f0[_0x24802b(0x222)](/RIGHT/i)&&(_0x24802b(0x1d1)!==_0x24802b(0x1b2)?this[_0x24802b(0x16e)]['x']=this[_0x24802b(0x155)]-_0x5617a6:_0x21b181=_0x1f326a['filter'](_0x132f83=>_0x14e04c[_0x132f83][_0x24802b(0x17d)]!==''));}if(_0xe9c9f0[_0x24802b(0x222)](/UPPER/i))this[_0x24802b(0x16e)]['y']=0x0;else{if(_0xe9c9f0[_0x24802b(0x222)](/MIDDLE/i))this[_0x24802b(0x16e)]['y']=Math['round']((this['height']-_0x2f6797)/0x2);else _0xe9c9f0[_0x24802b(0x222)](/BOTTOM/i)&&(this[_0x24802b(0x16e)]['y']=this[_0x24802b(0x1db)]-_0x2f6797);}this[_0x24802b(0x16e)]['x']+=this[_0x24802b(0x1d7)][_0x24802b(0x216)][_0x24802b(0x186)]??-0x12,this['_cancelButton']['y']+=this[_0x24802b(0x1d7)]['Optional'][_0x24802b(0x271)]??0xf;},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x1c6)]=function(){const _0x580ce3=_0xd608bd;let _0x5306ec=0x0;this[_0x580ce3(0x1a8)][_0x580ce3(0x176)]()[_0x580ce3(0x284)]()===_0x580ce3(0x22b)?_0x5306ec=$gameSystem['getLastPickedCommonEventMenuID']():_0x5306ec=eval(this['_autoSelect']);const _0x5ef56a=Math[_0x580ce3(0x279)](0x0,this[_0x580ce3(0x243)](_0x5306ec));this[_0x580ce3(0x18d)](_0x5ef56a);},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x1de)]=function(){const _0x52eccf=_0xd608bd;if(this[_0x52eccf(0x16e)]&&this[_0x52eccf(0x16e)][_0x52eccf(0x276)]())return-0x1;return Window_Command[_0x52eccf(0x25e)]['hitIndex'][_0x52eccf(0x18a)](this);},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x14a)]=function(){const _0x22ee59=_0xd608bd;if(this[_0x22ee59(0x194)]){this[_0x22ee59(0x149)]+=0x20;if(this[_0x22ee59(0x153)]()){this[_0x22ee59(0x194)]=![];if(this['_cancelButton']){if(_0x22ee59(0x27f)!==_0x22ee59(0x1d8))this[_0x22ee59(0x16e)][_0x22ee59(0x142)]=!![];else{const _0x4b4d37=this['commonEventMenuPictureWindowRect'](_0x3c09f1),_0x11b23f=new _0x58d432(_0x46889c,_0x4b4d37);_0x11b23f['openness']=0x0,this['addCommonEventMenuWindow'](_0x11b23f),this[_0x22ee59(0x144)][_0x22ee59(0x26d)]=_0x11b23f;}}}}},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x245)]=function(){const _0xddd5b8=_0xd608bd;this['_cancelButton']&&(_0xddd5b8(0x26b)==='INbLT'?this[_0xddd5b8(0x16e)]['visible']=![]:_0x10768a['log'](_0xddd5b8(0x1be),_0x3bacd1,_0x387a90,_0x20f072,_0x2b282b)),Window_Command[_0xddd5b8(0x25e)][_0xddd5b8(0x245)][_0xddd5b8(0x18a)](this);},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x183)]=function(){return this['_columns']||0x1;},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x23c)]=function(){const _0xc836fa=_0xd608bd;return this[_0xc836fa(0x13d)];},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x275)]=function(_0x35020f,_0x106c5c){const _0x469d65=_0xd608bd;if(!_0x35020f)return;this[_0x469d65(0x263)]=this[_0x469d65(0x263)]||{},this[_0x469d65(0x263)][_0x106c5c]=_0x35020f;},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x22c)]=function(){const _0x4903e4=_0xd608bd;for(const _0x4a7f48 of this[_0x4903e4(0x1d7)][_0x4903e4(0x1a9)]){const _0x791b8d=$dataCommonEvents[_0x4a7f48];if(!this[_0x4903e4(0x1f5)](_0x791b8d))continue;const _0xfade3b=DataManager[_0x4903e4(0x209)](_0x4a7f48,this[_0x4903e4(0x183)]()<=0x1),_0x12fd6a=this[_0x4903e4(0x23a)](_0x791b8d);this['addCommand'](_0xfade3b,_0x4903e4(0x242),_0x12fd6a,_0x4a7f48);}},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x1f5)]=function(_0x6e15fb){const _0x4b43d3=_0xd608bd;if(!_0x6e15fb)return![];const _0x32cdfd=_0x4b43d3(0x23e)[_0x4b43d3(0x177)](_0x6e15fb['id']);if(VisuMZ[_0x4b43d3(0x233)]['JS'][_0x32cdfd]){if(_0x4b43d3(0x16c)!==_0x4b43d3(0x16c))_0x419bef=_0x262588[_0x4b43d3(0x218)](_0x52772b[_0x4b43d3(0x155)]/0x2);else{if(!VisuMZ[_0x4b43d3(0x233)]['JS'][_0x32cdfd][_0x4b43d3(0x18a)](this))return![];}}const _0x41d440=VisuMZ['CommonEventMenu']['RegExp'],_0x42bcc8=DataManager[_0x4b43d3(0x259)](_0x6e15fb['id']);if(_0x42bcc8[_0x4b43d3(0x222)](_0x41d440[_0x4b43d3(0x1eb)])){const _0x4d7dd7=JSON['parse']('['+RegExp['$1'][_0x4b43d3(0x222)](/\d+/g)+']');for(const _0x44740d of _0x4d7dd7){if(_0x4b43d3(0x152)===_0x4b43d3(0x152)){if(!$gameSwitches[_0x4b43d3(0x1d9)](_0x44740d))return![];}else _0x26571d=0x80;}return!![];}if(_0x42bcc8[_0x4b43d3(0x222)](_0x41d440[_0x4b43d3(0x1aa)])){const _0x2f0dd0=JSON[_0x4b43d3(0x1bc)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4e8445 of _0x2f0dd0){if($gameSwitches[_0x4b43d3(0x1d9)](_0x4e8445))return!![];}return![];}if(_0x42bcc8[_0x4b43d3(0x222)](_0x41d440[_0x4b43d3(0x230)])){if(_0x4b43d3(0x148)!==_0x4b43d3(0x235)){const _0x45214a=JSON['parse']('['+RegExp['$1'][_0x4b43d3(0x222)](/\d+/g)+']');for(const _0x5021b1 of _0x45214a){if(!$gameSwitches[_0x4b43d3(0x1d9)](_0x5021b1))return!![];}return![];}else _0x4e3ef2=_0x9a9a80[_0x4b43d3(0x170)](_0x17dae0['width']/0x2);}if(_0x42bcc8[_0x4b43d3(0x222)](_0x41d440[_0x4b43d3(0x1a2)])){if('sGVTl'===_0x4b43d3(0x214))_0x44d577[_0x4b43d3(0x222)](/(?:MIRROR)/i)?_0x390596+=_0x4833ef?_0x5cc8bf[_0x4b43d3(0x155)]-_0x14bf72:0x0:_0x36bf38+=_0xda0b2a?0x0:_0x448c31[_0x4b43d3(0x155)]-_0x2f05f3;else{const _0x2cf307=JSON[_0x4b43d3(0x1bc)]('['+RegExp['$1'][_0x4b43d3(0x222)](/\d+/g)+']');for(const _0x1bf913 of _0x2cf307){if($gameSwitches[_0x4b43d3(0x1d9)](_0x1bf913))return![];}return!![];}}return!![];},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x23a)]=function(_0x23dabb){const _0x42487f=_0xd608bd;if(!_0x23dabb)return![];const _0x498032=_0x42487f(0x273)[_0x42487f(0x177)](_0x23dabb['id']);if(VisuMZ[_0x42487f(0x233)]['JS'][_0x498032]){if('piKrS'===_0x42487f(0x27b))_0x34c6c3=_0x42487f(0x207)['format'](_0x5702ee);else{if(!VisuMZ['CommonEventMenu']['JS'][_0x498032][_0x42487f(0x18a)](this))return![];}}const _0x1025b2=VisuMZ[_0x42487f(0x233)][_0x42487f(0x15f)],_0x328e06=DataManager[_0x42487f(0x259)](_0x23dabb['id']);if(_0x328e06[_0x42487f(0x222)](_0x1025b2[_0x42487f(0x195)])){if(_0x42487f(0x18c)===_0x42487f(0x18c)){const _0x56f480=JSON[_0x42487f(0x1bc)]('['+RegExp['$1'][_0x42487f(0x222)](/\d+/g)+']');for(const _0x2072a0 of _0x56f480){if(!$gameSwitches['value'](_0x2072a0))return![];}return!![];}else _0x13286f=_0x16d85e['filter'](_0x5b0a47=>!_0x565474[_0x5b0a47][_0x42487f(0x17d)][_0x42487f(0x222)](/-----/i));}if(_0x328e06[_0x42487f(0x222)](_0x1025b2[_0x42487f(0x1b4)])){if(_0x42487f(0x1df)===_0x42487f(0x1a0))this[_0x42487f(0x1dd)](_0x2886dc,_0x301347['x'],_0x596c8c['y'],_0xe86255);else{const _0x184a85=JSON[_0x42487f(0x1bc)]('['+RegExp['$1'][_0x42487f(0x222)](/\d+/g)+']');for(const _0xbe85e0 of _0x184a85){if(_0x42487f(0x16d)===_0x42487f(0x1d3))_0x57582a=0x0;else{if($gameSwitches[_0x42487f(0x1d9)](_0xbe85e0))return!![];}}return![];}}if(_0x328e06['match'](_0x1025b2[_0x42487f(0x1a3)])){if(_0x42487f(0x1f1)!==_0x42487f(0x1f1)){const _0x1c663d=_0x2cad1a(_0x561420['$1']),_0x57e28e=_0x42487f(0x23e)[_0x42487f(0x177)](_0x1fb408['id']),_0x3ccda7=_0x42487f(0x1a6)['format'](_0x1c663d);_0x12fd18[_0x42487f(0x233)]['JS'][_0x57e28e]=new _0x6af0a1(_0x3ccda7);}else{const _0x421a1a=JSON[_0x42487f(0x1bc)]('['+RegExp['$1'][_0x42487f(0x222)](/\d+/g)+']');for(const _0x35e4a6 of _0x421a1a){if(!$gameSwitches[_0x42487f(0x1d9)](_0x35e4a6))return!![];}return![];}}if(_0x328e06['match'](_0x1025b2[_0x42487f(0x175)])){const _0x3b1d53=JSON[_0x42487f(0x1bc)]('['+RegExp['$1'][_0x42487f(0x222)](/\d+/g)+']');for(const _0xdb0e73 of _0x3b1d53){if($gameSwitches[_0x42487f(0x1d9)](_0xdb0e73))return![];}return!![];}return!![];},Window_CommonEventMenuList['prototype']['drawItem']=function(_0x24bd12){const _0x50e014=_0xd608bd,_0x3d97c9=this[_0x50e014(0x147)](_0x24bd12),_0x4f8c12=this['commandName'](_0x24bd12),_0x2c5d02=this[_0x50e014(0x262)](_0x4f8c12)[_0x50e014(0x155)];this['changePaintOpacity'](this['isCommandEnabled'](_0x24bd12));const _0x27e22d=this[_0x50e014(0x23c)]();if(_0x27e22d==='right')this[_0x50e014(0x1dd)](_0x4f8c12,_0x3d97c9['x']+_0x3d97c9[_0x50e014(0x155)]-_0x2c5d02,_0x3d97c9['y'],_0x2c5d02);else{if(_0x27e22d===_0x50e014(0x232)){const _0x8b4812=_0x3d97c9['x']+Math[_0x50e014(0x218)]((_0x3d97c9[_0x50e014(0x155)]-_0x2c5d02)/0x2);this[_0x50e014(0x1dd)](_0x4f8c12,_0x8b4812,_0x3d97c9['y'],_0x2c5d02);}else this[_0x50e014(0x1dd)](_0x4f8c12,_0x3d97c9['x'],_0x3d97c9['y'],_0x2c5d02);}},Window_CommonEventMenuList[_0xd608bd(0x25e)][_0xd608bd(0x25d)]=function(){const _0x491243=_0xd608bd;Window_Command[_0x491243(0x25e)][_0x491243(0x25d)][_0x491243(0x18a)](this);if(!this[_0x491243(0x263)])return;const _0xa381ed=this[_0x491243(0x1f6)]();if(this[_0x491243(0x263)]['pictureWindow']){const _0x5ca35a=DataManager[_0x491243(0x21a)](_0xa381ed);this[_0x491243(0x263)][_0x491243(0x26d)][_0x491243(0x13a)](_0x5ca35a);}if(this['_aidWindows']['helpWindow']){if(_0x491243(0x1ab)===_0x491243(0x1ab)){const _0x1bd14f=DataManager[_0x491243(0x1f8)](_0xa381ed,_0x491243(0x25b));this['_aidWindows'][_0x491243(0x1ed)][_0x491243(0x19f)](_0x1bd14f);}else _0x494946=0xc0;}if(this[_0x491243(0x263)][_0x491243(0x14f)]){if(_0x491243(0x151)!==_0x491243(0x26a)){const _0x3a2bc8=DataManager[_0x491243(0x1f8)](_0xa381ed,'Sub');this[_0x491243(0x263)][_0x491243(0x14f)]['setText'](_0x3a2bc8);}else{if(!_0x5cb477[_0x491243(0x1d9)](_0x45e96b))return![];}}for(let _0x54530a=0x1;_0x54530a<=0xa;_0x54530a++){const _0x4cc302=this[_0x491243(0x263)]['extraWindow_%1'[_0x491243(0x177)](_0x54530a)];if(_0x4cc302){const _0x454976=DataManager[_0x491243(0x1f8)](_0xa381ed,_0x491243(0x14c)[_0x491243(0x177)](_0x54530a));_0x4cc302['setText'](_0x454976);}}};