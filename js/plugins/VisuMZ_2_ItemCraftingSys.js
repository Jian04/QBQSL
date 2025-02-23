//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
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
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
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
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

const _0x38e3=['isPlaying','applyInverse','innerHeight','ShopScene','commandItemCrafting','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','FGivB','DXrPc','Animations','commandWindowRectItemsEquipsCore','DEyTq','drawCraftingIngredients','Weapon','placeButtons','wkPnH','drawTextEx','MoSgv','trim','setItemSpriteOpacity','buttonAssistText1','setFrame','_itemWindow','createCustomBackgroundImages','determineMax','_data','MRrEy','getWeaponIdWithName','changePaintOpacity','processFinishAnimation','status','jgMKZ','_allCraftableArmors','_armorIDs','SystemShowItemCraftingMenu','LBqIB','KrUrE','center','bigPicture','JSON','prototype','CeQQA','createBackground','sgBMJ','ieGWg','helpWindowRect','iczEW','drawIcon','isItemCraftingCategoryValid','buttonAssistItemListRequirement','GKYjt','buyWindowRectItemsEquipsCore','createStatusWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','itemPadding','windowPadding','destroyItemSprite','setBackgroundOpacity','getInputMultiButtonStrings','ItemsEquipsCore','weapons','iAgGs','XIBTz','dLBav','drawCraftingItemName','contains','index','items','createUncategorizedItemCategory','craftPicture','update','Scene_Boot_onDatabaseLoaded','EVgRZ','Sound','YOCcG','dNghH','52iwJOze','isCraftItemListed','Ingredients','BePOd','customCraftingOnly','buttonAssistCategory','ARRAYSTR','statusWindowRectItemsEquipsCore','Game_System_initialize','_animationIDs','410666GbkSKW','dimColor1','createNumberWindow','createAnimationIDs','_max','Armor','itemCrafting','Window_ItemCategory_addItemCategory','addCommand','helpWindowRectItemsEquipsCore','_windowLayer','Parse_Notetags_CreateJS','Animation','#%1','UNgzq','UbEsk','category','drawItemBackground','IconSet','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BXLnU','Hbfnb','playCancel','hegfc','smoothSelect','itemCraftingMask','isItemCrafted','parseCraftingIngredientsData','NoMask','GoldIcon','EnableMainMenu','create','ZPKQd','setItemWindow','drawCurrentItemNameMasked','_nonCategoryItemCraftingItems','loadSystem','_buttons','registerCommand','TOeHZ','startAnimation','addOriginalCommands','NoCategoryIcon','isShowNew','getCustomItemCraftingSettings','isMainMenuItemCraftingVisible','initialize','setupSelectIngredientWindow','ItemCraftingSys','GoldFontSize','length','systemColor','_ingredientsList','drawTotalPrice','CoreEngine','call','adjustSprite','setupNumberWindow','join','itemCraftingIngredientsBridge','innerWidth','isTouchOkEnabled','enabled','_animationSprite','version','_ingredientIndex','CheckAnySwitches','loadPicture','shown','addUncategorizedItemCategory','ItemCraftingNoCategory','EVAL','buttonAssistLargeIncrement','xxcsA','playStaticSe','JGBCH','ItemScene','VisuMZ_1_ItemsEquipsCore','itemCraftingNumberWindowOk','isItemCraftingCommandEnabled','updateTooltipWindow','clearUserSelectedIngredients','_itemsCrafted','selectLast','isMainMenuItemCraftingEnabled','jEdMz','getColor','MaskLetter','iconWidth','IngredientBridge','%1%2','constructor','_goldWindow','OnSwitches','boxWidth','item','worldTransform','remove','isItem','CGbHZ','allCraftableArmors','maskItalics','_clickHandler','OffSwitches','Window_ItemCategory_needsSelection','ToolTips','\x5cI[%1]%2','onItemCrafted','setText','ARRAYNUM','opacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_animationPlaying','NprGU','parameters','_item','%1/%2','lineHeight','_statusWindow','StatusBgType','loadTitle1','hitIndex','LNASC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','allowCreateStatusWindow','_iconSprite','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','changeOkButtonEnable','multiplicationSignX','STR','enableCraftingSwitches','MaskText','_backSprite1','gUxZP','name','CraftAssistButton','isUseModernControls','Icon','Gold','filter','tdjTo','postCreateItemWindowModernControls','floor','fittingHeight','Armors','itemNameY','303734WJjpYu','CraftedIcon','1064596ioIouQ','changeTextColor','updateHelp','setup','1DcUWAC','ParseItemNotetags','initItemCraftingSys','UqzKV','onNumberOk','left','drawHorzLine','windowskin','fillRect','SFlpC','hasCustomWindowSkin','quantityFontSize','initItemCraftingMainMenu','destroy','ListBgType','_buttonAssistWindow','createCraftingIngredientsLists','createIngredientSelectionList','createCommandWindow','_itemIDs','drawTotalGold','STRUCT','958701viDfie','ZqGPO','isFinishedAnimating','terminate','_ItemCrafting_MainMenu','maxItems','fontSize','Window_ItemCategory_makeCommandList','powerDownColor','numItems','drawItemName','_itemSprite','GwhAT','goldWindowRect','addItemCraftingCommand','Uncategorized','_ingredientSelectTitle','drawNumber','BekEi','textColor','isCraftingItemMasked','format','craftableWeapons','uCgcj','IngredientTitle','_commandWindow','craftableItems','iconIndex','drawBigItemIcon','concat','setItemSpritePosition','process_VisuMZ_ItemCraftingSys_Notetags','_ingredientSelectList','iacFX','resetCraftingSwitches','createItemWindow','_scene','loadWindowskin','itemRectWithPadding','riSmG','parse','yTOCe','doesItemHaveOpenCategories','makeItemList','makeFontBigger','needsSelection','_categoryWindow','makeCommandList','_animationWait','380399IcEujZ','tooltipFrameCheckRequirements','VisuMZ_0_CoreEngine','drawText','ItemQuantityFmt','exit','categoryList','playItemCrafting','centerSprite','boxHeight','toLowerCase','nDbji','nDvUh','EXQFv','_context','addChild','frames','ShowWindows','buttonY','AllSwitches','fontItalic','categoryWindowRect','clone','tohSH','CustomItemCraftingSceneOpen','max','cancel','_allCraftableItems','isReleased','Window','htDOi','isArmor','Items','RegExp','armors','number','registerCraftedItem','activate','callUpdateHelp','_ingredientAmounts','category:\x20%1','BypassSwitches','_craftPicture','onItemOk','setMainMenuItemCraftingVisible','note','KrhjX','armor','addWindow','Type','LHJsV','onItemCancel','bitmap','selectedIngredientList','drawTooltipBackground','Scene_Menu_createCommandWindow','setStatusWindow','textWidth','refresh','width','createJS','currencyUnit','description','map','createTooltipWindow','jsGlobalCraftEffect','round','EMBBe','bind','gold','GoldBgType','itemAt','XmrYa','SwitchCraft','iconHeight','IngredientList','setTooltipWindowText','ShowMainMenu','getArmorIdWithName','blt','isPlaytest','addItemCategory','string','createCraftingItemKey','imageSmoothingEnabled','oIcKP','MaskItalics','isWeapon','pop','bAwSc','setWindowBackgroundTypes','yHdtY','onCategoryOk','Window_MenuCommand_addOriginalCommands','drawCurrentItemName','setItemSpriteBitmap','TurnSwitches','loseItem','drawFadedItemBackground','drawCurrencyValue','onDatabaseLoaded','weapon','addItemCraftingCommandAutomatically','CBgmm','push','isSceneItemCrafting','BgFilename1','_maxIngredientsSize','currentCraftableItems','BgSettings','clearCustomItemCraftingSettings','opacitySpeed','setItem','includes','GdYJG','goldWindowRectItemsEquipsCore','_tooltipWindow','jsGlobalListing','Mask','itemCraftedIcon','MainMenu','qHDWz','CategoryIcon','updateCraftingAnimation','resetFontSettings','clear','_weaponIDs','WarningMsg','processItemCrafting','resetTextColor','drawItem','_allCraftableWeapons','BoSFn','buttonAssistKey1','SelectedText','getBackgroundOpacity','_ingredientCategories','animationIDs','Settings','createItemSprite','_itemSpriteOpacitySpeed','setHelpWindow','BypassMasks','General','NumberBgType','setBackgroundType','createIngredientSelectionTitle','totalPriceY','shift','allCraftableItems','16829rgUGVQ','drawMultiplicationSign','drawIngredientCategory','_text','setHandler','dimColor2','setCustomItemCraftingSettings','KQpqn','mqycN','setMainMenuItemCraftingEnabled','HelpBgType','Item','CheckAllSwitches','_amount','isItemCraftingCommandVisible','drawIngredientGold','maskItemName','buttonAssistKey2','ParseWeaponNotetags','PjWqL','ARRAYEVAL','Weapons','categories','URATO','anchor','SnapshotOpacity','_customItemCraftingSettings','visible','jsOnCraft','setItemSpriteFrame','onNumberCancel','isSceneBattle','createAnimation','_craftingIngredients','toUpperCase','buttonAssistText4','_category','BgFilename2','maxCols','itemHeight','split','RavaM','isTriggered','allCraftableWeapons','lQqPk','fGAYl','finishAnimation','checkItemCraftingResultsValid','destroyAnimationSprite','itemWindowRect','716987tEzzBB','tooltipSkin','CategoryTitle','getItemIdWithName','urWPd','GoldOverlap','gkwRj','ShowAnimations','ConvertParams','_helpWindow','createGoldWindow','setHelpWindowItem','removeChild','XeUus','drawIngredientItem','scale','buttonAssistText2','gradientFillRect','show','dvbuw','min','_alreadySelected','loseGold','NUM','baseTextRect','_numberWindow','gWxUq','drawPicture','active','setValue','setClickHandler','drawBigItemImage','NFKGq','addLoadListener','isOkEnabled','ParseArmorNotetags','activateItemWindow','ddyGR','onIngredientListOk','statusWindowRect','hcPDB','_backSprite2','right','ParseAllNotetags','VisuMZ_3_VisualGoldDisplay','LLsCJ','_number','value','height','Axdkj','updateItemSpriteOpacity','all','contents','getCraftingIngredients','drawCraftedIcon','onIngredientListCancel','ItemCraftingMenuCommand','hide','createItemWindowBase','FadeSpeed','isTouchedInsideFrame'];const _0x314c19=_0x2fc9;function _0x2fc9(_0x1fdc0d,_0x9f8be){return _0x2fc9=function(_0x38e319,_0x2fc9b4){_0x38e319=_0x38e319-0xf2;let _0x358cfe=_0x38e3[_0x38e319];return _0x358cfe;},_0x2fc9(_0x1fdc0d,_0x9f8be);}(function(_0x4e0b97,_0xce349){const _0x3727c1=_0x2fc9;while(!![]){try{const _0x1d8886=-parseInt(_0x3727c1(0x147))*-parseInt(_0x3727c1(0x201))+parseInt(_0x3727c1(0x2a0))+parseInt(_0x3727c1(0x179))*-parseInt(_0x3727c1(0x2a4))+parseInt(_0x3727c1(0x2eb))+-parseInt(_0x3727c1(0x20b))+-parseInt(_0x3727c1(0x2ba))+parseInt(_0x3727c1(0x29e));if(_0x1d8886===_0xce349)break;else _0x4e0b97['push'](_0x4e0b97['shift']());}catch(_0x4c42ad){_0x4e0b97['push'](_0x4e0b97['shift']());}}}(_0x38e3,0x8338b));var label=_0x314c19(0x23c),tier=tier||0x0,dependencies=[_0x314c19(0x259)],pluginData=$plugins[_0x314c19(0x297)](function(_0x299315){const _0x2f1d43=_0x314c19;return _0x299315[_0x2f1d43(0x1d3)]&&_0x299315[_0x2f1d43(0x329)][_0x2f1d43(0x122)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x314c19(0x181)]=function(_0x472b09,_0x5e2cd0){const _0x2cdd1c=_0x314c19;for(const _0x4b0c4d in _0x5e2cd0){if(_0x2cdd1c(0x15e)===_0x2cdd1c(0x15e)){if(_0x4b0c4d[_0x2cdd1c(0x21e)](/(.*):(.*)/i)){const _0x4b619d=String(RegExp['$1']),_0x2bb64b=String(RegExp['$2'])['toUpperCase']()[_0x2cdd1c(0x1c7)]();let _0x106fcd,_0x548c8e,_0x10ea88;switch(_0x2bb64b){case _0x2cdd1c(0x190):_0x106fcd=_0x5e2cd0[_0x4b0c4d]!==''?Number(_0x5e2cd0[_0x4b0c4d]):0x0;break;case _0x2cdd1c(0x279):_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x5451d8=>Number(_0x5451d8));break;case _0x2cdd1c(0x253):_0x106fcd=_0x5e2cd0[_0x4b0c4d]!==''?eval(_0x5e2cd0[_0x4b0c4d]):null;break;case _0x2cdd1c(0x15b):_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x3155e8=>eval(_0x3155e8));break;case _0x2cdd1c(0x1dc):_0x106fcd=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):'';break;case'ARRAYJSON':_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON['parse'](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x502903=>JSON[_0x2cdd1c(0x2e2)](_0x502903));break;case'FUNC':_0x106fcd=_0x5e2cd0[_0x4b0c4d]!==''?new Function(JSON['parse'](_0x5e2cd0[_0x4b0c4d])):new Function('return\x200');break;case'ARRAYFUNC':_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON['parse'](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x1d949a=>new Function(JSON['parse'](_0x1d949a)));break;case _0x2cdd1c(0x28d):_0x106fcd=_0x5e2cd0[_0x4b0c4d]!==''?String(_0x5e2cd0[_0x4b0c4d]):'';break;case _0x2cdd1c(0x207):_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x2c20e3=>String(_0x2c20e3));break;case _0x2cdd1c(0x2b9):_0x10ea88=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):{},_0x106fcd=VisuMZ[_0x2cdd1c(0x181)]({},_0x10ea88);break;case'ARRAYSTRUCT':_0x548c8e=_0x5e2cd0[_0x4b0c4d]!==''?JSON[_0x2cdd1c(0x2e2)](_0x5e2cd0[_0x4b0c4d]):[],_0x106fcd=_0x548c8e[_0x2cdd1c(0x32a)](_0x5a61e3=>VisuMZ[_0x2cdd1c(0x181)]({},JSON[_0x2cdd1c(0x2e2)](_0x5a61e3)));break;default:continue;}_0x472b09[_0x4b619d]=_0x106fcd;}}else{let _0x176649=_0x1e25a5-_0x2f4494[_0x2cdd1c(0xf3)](_0x35e813/0x2),_0x3265bf=_0x2310d1+_0x554b70[_0x2cdd1c(0xf3)]((this['lineHeight']()-_0x5420c3[_0x2cdd1c(0xfb)])/0x2);this[_0x2cdd1c(0x2a1)](_0x21a9e8[_0x2cdd1c(0x23f)]()),this[_0x2cdd1c(0x2e6)](),this['drawText'](_0x39b588[_0x2cdd1c(0x328)],_0x176649,_0x3265bf,_0x369a0c,_0x2cdd1c(0x1da)),this[_0x2cdd1c(0x12d)]();}}return _0x472b09;},(_0x3becb2=>{const _0x5450a3=_0x314c19,_0x19c12d=_0x3becb2[_0x5450a3(0x292)];for(const _0x2b7068 of dependencies){if(!Imported[_0x2b7068]){alert(_0x5450a3(0x287)['format'](_0x19c12d,_0x2b7068)),SceneManager[_0x5450a3(0x2f0)]();break;}}const _0x510cd9=_0x3becb2['description'];if(_0x510cd9[_0x5450a3(0x21e)](/\[Version[ ](.*?)\]/i)){const _0x332748=Number(RegExp['$1']);_0x332748!==VisuMZ[label][_0x5450a3(0x24c)]&&(_0x5450a3(0x2f6)!==_0x5450a3(0x10c)?(alert(_0x5450a3(0x27b)[_0x5450a3(0x2cf)](_0x19c12d,_0x332748)),SceneManager[_0x5450a3(0x2f0)]()):(this[_0x5450a3(0x1ad)][_0x5450a3(0x12e)](),this[_0x5450a3(0x326)]=0x0));}if(_0x510cd9[_0x5450a3(0x21e)](/\[Tier[ ](\d+)\]/i)){if(_0x5450a3(0x199)!==_0x5450a3(0x319)){const _0x2f01a2=Number(RegExp['$1']);_0x2f01a2<tier?(alert(_0x5450a3(0x21f)[_0x5450a3(0x2cf)](_0x19c12d,_0x2f01a2,tier)),SceneManager[_0x5450a3(0x2f0)]()):_0x5450a3(0x123)===_0x5450a3(0x2d1)?(_0x372a8d=_0x1d9d9c[_0x5450a3(0x2de)][_0x5450a3(0x240)][_0x576310],_0x50ee4d+=0x1):tier=Math['max'](_0x2f01a2,tier);}else return _0x241851[_0x5450a3(0x1dd)]['statusWindowRectItemsEquipsCore']['call'](this);}VisuMZ[_0x5450a3(0x181)](VisuMZ[label][_0x5450a3(0x13b)],_0x3becb2[_0x5450a3(0x27e)]);})(pluginData),VisuMZ[_0x314c19(0x23c)]['WarningMsg']=_0x314c19(0x1bb),PluginManager[_0x314c19(0x232)](pluginData[_0x314c19(0x292)],'ItemCraftingSceneOpen',_0x138a04=>{const _0x581228=_0x314c19;if(SceneManager[_0x581228(0x166)]())return;if(SceneManager[_0x581228(0x11a)]())return;if(DataManager[_0x581228(0x11d)]()[_0x581228(0x23e)]<=0x0){$gameTemp[_0x581228(0x101)]()&&alert(VisuMZ[_0x581228(0x23c)][_0x581228(0x130)]);return;}SceneManager[_0x581228(0x119)](Scene_ItemCrafting);}),PluginManager[_0x314c19(0x232)](pluginData[_0x314c19(0x292)],_0x314c19(0x303),_0x230699=>{const _0x8f0e14=_0x314c19;if(SceneManager[_0x8f0e14(0x166)]())return;if(SceneManager[_0x8f0e14(0x11a)]())return;VisuMZ[_0x8f0e14(0x181)](_0x230699,_0x230699);const _0x399e0e={'items':_0x230699[_0x8f0e14(0x30b)]['map'](_0x2abd6e=>$dataItems[_0x2abd6e])['filter'](_0x4286f6=>DataManager[_0x8f0e14(0x146)]()['includes'](_0x4286f6)),'weapons':_0x230699[_0x8f0e14(0x15c)]['map'](_0x5455e0=>$dataWeapons[_0x5455e0])['filter'](_0x5c1b12=>DataManager[_0x8f0e14(0x172)]()[_0x8f0e14(0x122)](_0x5c1b12)),'armors':_0x230699[_0x8f0e14(0x29c)][_0x8f0e14(0x32a)](_0x58d57b=>$dataArmors[_0x58d57b])[_0x8f0e14(0x297)](_0x1b7e5b=>DataManager['allCraftableArmors']()[_0x8f0e14(0x122)](_0x1b7e5b)),'BypassSwitches':_0x230699[_0x8f0e14(0x314)],'BypassMasks':_0x230699[_0x8f0e14(0x13f)]};_0x399e0e['all']=_0x399e0e[_0x8f0e14(0x1f8)][_0x8f0e14(0x2d7)](_0x399e0e[_0x8f0e14(0x1f1)],_0x399e0e[_0x8f0e14(0x30d)]);if(_0x399e0e[_0x8f0e14(0x1ac)][_0x8f0e14(0x23e)]<=0x0){if(_0x8f0e14(0x27d)===_0x8f0e14(0x27d)){$gameTemp[_0x8f0e14(0x101)]()&&alert(VisuMZ[_0x8f0e14(0x23c)]['WarningMsg']);return;}else{const _0x4bc254='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x8f0e14(0x2cf)](_0x3e55ce),_0x6cdb8b=_0x32d220[_0x8f0e14(0x104)](_0x557575);_0x3e1105[_0x8f0e14(0x23c)]['JS'][_0x6cdb8b]=new _0x15ee67(_0x4bc254);}}$gameTemp[_0x8f0e14(0x14d)](_0x399e0e),SceneManager[_0x8f0e14(0x119)](Scene_ItemCrafting);}),PluginManager[_0x314c19(0x232)](pluginData[_0x314c19(0x292)],'SystemEnableItemCraftingMenu',_0x34efa5=>{const _0x274486=_0x314c19;VisuMZ['ConvertParams'](_0x34efa5,_0x34efa5),$gameSystem[_0x274486(0x150)](_0x34efa5['Enable']);}),PluginManager[_0x314c19(0x232)](pluginData[_0x314c19(0x292)],_0x314c19(0x1d7),_0x51eeeb=>{const _0x9005b3=_0x314c19;VisuMZ[_0x9005b3(0x181)](_0x51eeeb,_0x51eeeb),$gameSystem['setMainMenuItemCraftingVisible'](_0x51eeeb['Show']);}),VisuMZ[_0x314c19(0x23c)][_0x314c19(0x1fc)]=Scene_Boot['prototype'][_0x314c19(0x115)],Scene_Boot[_0x314c19(0x1dd)][_0x314c19(0x115)]=function(){const _0xabab5c=_0x314c19;VisuMZ['ItemCraftingSys'][_0xabab5c(0x1fc)][_0xabab5c(0x243)](this),this[_0xabab5c(0x2d9)]();},Scene_Boot[_0x314c19(0x1dd)][_0x314c19(0x2d9)]=function(){this['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']();},VisuMZ[_0x314c19(0x23c)]['RegExp']={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i},Scene_Boot[_0x314c19(0x1dd)][_0x314c19(0x28a)]=function(){const _0x43eef5=_0x314c19;if(VisuMZ[_0x43eef5(0x1a4)])return;const _0x43da5d=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0x4a61f3 of _0x43da5d){if(_0x43eef5(0x1d4)!=='jgMKZ'){if(!_0x2ab895)return![];if(_0x14e638['getCraftingIngredients'](_0xc6e6ee)[_0x43eef5(0x23e)]<=0x0)return![];if(_0x67329b[_0x43eef5(0x318)][_0x43eef5(0x21e)](_0x2df7c9[_0x43eef5(0x23c)][_0x43eef5(0x30c)][_0x43eef5(0x205)])){if(!_0x2e3caf[_0x43eef5(0x238)]())return![];}if(!_0x31f122['ItemCraftingSys'][_0x43eef5(0x13b)][_0x43eef5(0x140)][_0x43eef5(0x126)]['call'](this,_0x4fcdfd))return![];if(!_0x4de1fe['ItemCraftingSys'][_0x43eef5(0x153)](_0x23f531))return![];if(!_0x1c53c6[_0x43eef5(0x23c)][_0x43eef5(0x24e)](_0x551aaa))return![];return!![];}else{if(!_0x4a61f3)continue;VisuMZ[_0x43eef5(0x23c)][_0x43eef5(0x216)](_0x4a61f3);}}},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x2a5)]=VisuMZ[_0x314c19(0x2a5)],VisuMZ[_0x314c19(0x2a5)]=function(_0x26180d){const _0x475d3e=_0x314c19;VisuMZ['ItemCraftingSys'][_0x475d3e(0x2a5)][_0x475d3e(0x243)](this,_0x26180d),VisuMZ[_0x475d3e(0x23c)][_0x475d3e(0x216)](_0x26180d);},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x159)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x314c19(0x159)]=function(_0x5218fd){const _0xd960a5=_0x314c19;VisuMZ[_0xd960a5(0x23c)][_0xd960a5(0x159)][_0xd960a5(0x243)](this,_0x5218fd),VisuMZ[_0xd960a5(0x23c)][_0xd960a5(0x216)](_0x5218fd);},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x19c)]=VisuMZ[_0x314c19(0x19c)],VisuMZ[_0x314c19(0x19c)]=function(_0x596480){const _0x12c1dd=_0x314c19;VisuMZ[_0x12c1dd(0x23c)]['ParseArmorNotetags'][_0x12c1dd(0x243)](this,_0x596480),VisuMZ[_0x12c1dd(0x23c)][_0x12c1dd(0x216)](_0x596480);},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x216)]=function(_0x53d4ed){const _0x3ec63d=_0x314c19;_0x53d4ed['note'][_0x3ec63d(0x21e)](VisuMZ[_0x3ec63d(0x23c)][_0x3ec63d(0x30c)][_0x3ec63d(0x163)])&&(_0x3ec63d(0x1bd)!=='LqEYM'?VisuMZ['ItemCraftingSys'][_0x3ec63d(0x327)](_0x53d4ed,RegExp['$1']):this[_0x3ec63d(0x161)]=_0xb815b7);},VisuMZ['ItemCraftingSys']['JS']={},VisuMZ['ItemCraftingSys'][_0x314c19(0x327)]=function(_0x1d8a33,_0x4459e3){const _0x24a1d4=_0x314c19,_0x252354=_0x24a1d4(0x1ea)['format'](_0x4459e3),_0xc70da2=DataManager[_0x24a1d4(0x104)](_0x1d8a33);VisuMZ[_0x24a1d4(0x23c)]['JS'][_0xc70da2]=new Function(_0x252354);},DataManager['isCraftItemListed']=function(_0x34ea22){const _0x2a4bd2=_0x314c19;if(!_0x34ea22)return![];if(DataManager[_0x2a4bd2(0x1ae)](_0x34ea22)[_0x2a4bd2(0x23e)]<=0x0)return![];if(_0x34ea22[_0x2a4bd2(0x318)][_0x2a4bd2(0x21e)](VisuMZ[_0x2a4bd2(0x23c)]['RegExp'][_0x2a4bd2(0x205)])){if(!$gameTemp['getCustomItemCraftingSettings']())return![];}if(!VisuMZ['ItemCraftingSys']['Settings'][_0x2a4bd2(0x140)][_0x2a4bd2(0x126)]['call'](this,_0x34ea22))return![];if(!VisuMZ[_0x2a4bd2(0x23c)][_0x2a4bd2(0x153)](_0x34ea22))return![];if(!VisuMZ[_0x2a4bd2(0x23c)][_0x2a4bd2(0x24e)](_0x34ea22))return![];return!![];},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x153)]=function(_0x1d834f){const _0x1dbf99=_0x314c19,_0x3a777f=$gameTemp['getCustomItemCraftingSettings']();if(_0x3a777f&&_0x3a777f[_0x1dbf99(0x314)])return!![];const _0x59f3d8=VisuMZ[_0x1dbf99(0x23c)][_0x1dbf99(0x30c)][_0x1dbf99(0x2fe)],_0x2f1ab2=_0x1d834f['note']['match'](_0x59f3d8);if(_0x2f1ab2){if(_0x1dbf99(0x291)===_0x1dbf99(0x291))for(const _0x92675c of _0x2f1ab2){if(_0x1dbf99(0x14e)!==_0x1dbf99(0x14e))this[_0x1dbf99(0x19d)]();else{if(!_0x92675c)continue;_0x92675c[_0x1dbf99(0x21e)](_0x59f3d8);const _0x3917b6=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33a81f of _0x3917b6){if('iacFX'!==_0x1dbf99(0x2db))_0x2848e3[_0x1dbf99(0x1dd)]['createBackground']['call'](this),this[_0x1dbf99(0x1ee)](this[_0x1dbf99(0x138)]()),this[_0x1dbf99(0x1cc)]();else{if(!$gameSwitches[_0x1dbf99(0x1a8)](_0x33a81f))return![];}}}}else _0xa72ecc['VisuMZ_0_CoreEngine']?this[_0x1dbf99(0x2b8)](_0x3804c4,_0x23bd8d,_0x467e08,_0x44f348):this['drawCurrencyValue'](_0x5898dd,_0x338beb['currencyUnit'],0x0,_0x1a5d5b,_0x3e4bd4+_0xb05adc*0x2);}return!![];},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x24e)]=function(_0x18d553){const _0x11f3c9=_0x314c19,_0x408a85=$gameTemp[_0x11f3c9(0x238)]();if(_0x408a85&&_0x408a85['BypassSwitches'])return!![];const _0x3ee5ea=VisuMZ[_0x11f3c9(0x23c)][_0x11f3c9(0x30c)]['AnySwitches'],_0x532acf=_0x18d553[_0x11f3c9(0x318)]['match'](_0x3ee5ea);if(_0x532acf){for(const _0x231fda of _0x532acf){if(_0x11f3c9(0x135)==='BoSFn'){if(!_0x231fda)continue;_0x231fda[_0x11f3c9(0x21e)](_0x3ee5ea);const _0x179b02=JSON[_0x11f3c9(0x2e2)]('['+RegExp['$1'][_0x11f3c9(0x21e)](/\d+/g)+']');for(const _0x174118 of _0x179b02){if($gameSwitches['value'](_0x174118))return!![];}}else _0x344bb1[_0x11f3c9(0x119)](_0x8a17e1);}return![];}return!![];},DataManager[_0x314c19(0x11d)]=function(){const _0xdeb74e=_0x314c19,_0xa67e96=$gameTemp[_0xdeb74e(0x238)]();if(_0xa67e96)return _0xa67e96[_0xdeb74e(0x1ac)][_0xdeb74e(0x297)](_0x221658=>this[_0xdeb74e(0x202)](_0x221658));const _0x5305a8=this[_0xdeb74e(0x2d4)](),_0x2b0bae=this[_0xdeb74e(0x2d0)](),_0x5dc625=this['craftableArmors']();return _0x5305a8[_0xdeb74e(0x2d7)](_0x2b0bae,_0x5dc625);},DataManager[_0x314c19(0x2d4)]=function(){const _0x2e7cc6=_0x314c19;return this[_0x2e7cc6(0x146)]()[_0x2e7cc6(0x297)](_0xae6ccb=>this[_0x2e7cc6(0x202)](_0xae6ccb));},DataManager[_0x314c19(0x146)]=function(){const _0x16ff69=_0x314c19;if(this[_0x16ff69(0x306)]!==undefined)return this[_0x16ff69(0x306)];this[_0x16ff69(0x306)]=[];for(const _0x23f6d8 of $dataItems){if(_0x16ff69(0x261)===_0x16ff69(0x19e))return this[_0x16ff69(0x270)]()[_0x16ff69(0x297)](_0x9b9534=>this[_0x16ff69(0x202)](_0x9b9534));else{if(!_0x23f6d8)continue;if(_0x23f6d8[_0x16ff69(0x318)][_0x16ff69(0x21e)](VisuMZ[_0x16ff69(0x23c)][_0x16ff69(0x30c)][_0x16ff69(0x203)])){if(_0x16ff69(0x1e7)!==_0x16ff69(0x1e7)){if(!_0x20209a)return![];if(this[_0x16ff69(0x25e)]===_0x4ae800)this[_0x16ff69(0x2a6)]();_0x19258c=_0x2aa4f2||0x1;let _0x26986e={};if(_0x1dd4ea[_0x16ff69(0x26e)](_0x270bfd))_0x26986e=this[_0x16ff69(0x25e)][_0x16ff69(0x1f8)];if(_0x1da5c9[_0x16ff69(0x108)](_0x446549))_0x26986e=this[_0x16ff69(0x25e)][_0x16ff69(0x1f1)];if(_0x5687b3[_0x16ff69(0x30a)](_0xb881a4))_0x26986e=this[_0x16ff69(0x25e)][_0x16ff69(0x30d)];_0x26986e[_0x35292b['id']]=_0x26986e[_0x2e292d['id']]||0x0,_0x26986e[_0x1a1941['id']]+=_0x52f831;}else this[_0x16ff69(0x306)]['push'](_0x23f6d8);}}}return this[_0x16ff69(0x306)];},DataManager[_0x314c19(0x2d0)]=function(){const _0x33fbf1=_0x314c19;return this[_0x33fbf1(0x172)]()['filter'](_0x1ea1c1=>this[_0x33fbf1(0x202)](_0x1ea1c1));},DataManager[_0x314c19(0x172)]=function(){const _0x5789dc=_0x314c19;if(this[_0x5789dc(0x134)]!==undefined)return this[_0x5789dc(0x134)];this['_allCraftableWeapons']=[];for(const _0xf92d76 of $dataWeapons){if(!_0xf92d76)continue;_0xf92d76['note'][_0x5789dc(0x21e)](VisuMZ[_0x5789dc(0x23c)][_0x5789dc(0x30c)]['Ingredients'])&&this[_0x5789dc(0x134)][_0x5789dc(0x119)](_0xf92d76);}return this[_0x5789dc(0x134)];},DataManager['craftableArmors']=function(){const _0x31f255=_0x314c19;return this[_0x31f255(0x270)]()['filter'](_0x4eef9d=>this[_0x31f255(0x202)](_0x4eef9d));},DataManager['allCraftableArmors']=function(){const _0x3f9d23=_0x314c19;if(this['_allCraftableArmors']!==undefined)return this[_0x3f9d23(0x1d5)];this[_0x3f9d23(0x1d5)]=[];for(const _0x131853 of $dataArmors){if('yJMPn'!=='ewLaV'){if(!_0x131853)continue;_0x131853[_0x3f9d23(0x318)][_0x3f9d23(0x21e)](VisuMZ[_0x3f9d23(0x23c)][_0x3f9d23(0x30c)][_0x3f9d23(0x203)])&&this[_0x3f9d23(0x1d5)][_0x3f9d23(0x119)](_0x131853);}else{const _0x50a5b1=_0x7775d8(_0x4e7cfb['$1']);_0x50a5b1<_0x1b49b7?(_0x34aa65(_0x3f9d23(0x21f)['format'](_0xa6e002,_0x50a5b1,_0x5f1088)),_0x4941d6[_0x3f9d23(0x2f0)]()):_0x8ebc2f=_0x4bbf73[_0x3f9d23(0x304)](_0x50a5b1,_0x1ea19e);}}return this[_0x3f9d23(0x1d5)];},DataManager['getCraftingIngredients']=function(_0x137a32){const _0x98d1cd=_0x314c19;if(!_0x137a32)return[];const _0x26596c=this[_0x98d1cd(0x104)](_0x137a32);return this['_craftingIngredients']===undefined&&(_0x98d1cd(0x223)===_0x98d1cd(0x1e3)?this[_0x98d1cd(0x2b4)]():this[_0x98d1cd(0x2b4)]()),this['_craftingIngredients'][_0x26596c]||[];},DataManager['createCraftingItemKey']=function(_0x159834){const _0xc9c424=_0x314c19;let _0x830f24=_0xc9c424(0x266);if(this[_0xc9c424(0x26e)](_0x159834))return _0x830f24[_0xc9c424(0x2cf)](_0xc9c424(0x152),_0x159834['id']);if(this[_0xc9c424(0x108)](_0x159834))return _0x830f24[_0xc9c424(0x2cf)](_0xc9c424(0x1c2),_0x159834['id']);if(this[_0xc9c424(0x30a)](_0x159834))return _0x830f24[_0xc9c424(0x2cf)](_0xc9c424(0x210),_0x159834['id']);return'';},DataManager[_0x314c19(0x2b4)]=function(){const _0x2bf5b4=_0x314c19;this[_0x2bf5b4(0x168)]={};const _0x1a5034=$dataItems[_0x2bf5b4(0x2d7)]($dataWeapons,$dataArmors);for(const _0x2b40b1 of _0x1a5034){if('UtIVO'!=='LJHyP'){if(!_0x2b40b1)continue;if(_0x2b40b1[_0x2bf5b4(0x318)][_0x2bf5b4(0x21e)](VisuMZ['ItemCraftingSys'][_0x2bf5b4(0x30c)][_0x2bf5b4(0x203)])){if(_0x2bf5b4(0x220)===_0x2bf5b4(0x219))this[_0x2bf5b4(0x23a)](...arguments);else{const _0x587364=String(RegExp['$1'])['split'](/[\r\n]+/),_0x46d9c6=this[_0x2bf5b4(0x227)](_0x2b40b1,_0x587364);if(_0x46d9c6[_0x2bf5b4(0x23e)]<=0x0)continue;const _0x5927e1=this[_0x2bf5b4(0x104)](_0x2b40b1);this['_craftingIngredients'][_0x5927e1]=_0x46d9c6;}}}else{if(!_0x267240)return[];const _0x932bd1=this[_0x2bf5b4(0x104)](_0x63f308);return this['_craftingIngredients']===_0x17a4b4&&this[_0x2bf5b4(0x2b4)](),this[_0x2bf5b4(0x168)][_0x932bd1]||[];}}},DataManager['parseCraftingIngredientsData']=function(_0x3ac62d,_0x549489){const _0x546bbb=_0x314c19;let _0x50d925=[];for(let _0x3ce765 of _0x549489){if(_0x546bbb(0x257)!==_0x546bbb(0x257))this[_0x546bbb(0x2ab)]=_0x11638b['loadSystem'](_0x1f1779[_0x546bbb(0x17a)]);else{_0x3ce765=_0x3ce765[_0x546bbb(0x1c7)]();if(_0x3ce765[_0x546bbb(0x21e)](/GOLD:[ ](\d+)/i))_0x50d925[_0x546bbb(0x119)](['gold',Number(RegExp['$1'])]);else{if(_0x3ce765[_0x546bbb(0x21e)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x5e9689=String(RegExp['$1'])[_0x546bbb(0x1c7)](),_0x38947d=Number(RegExp['$2'])||0x1,_0x4da51c=_0x546bbb(0x313)['format'](_0x5e9689);_0x50d925[_0x546bbb(0x119)]([_0x4da51c,_0x38947d]);}else{if(_0x3ce765['match'](/(.*?)[ ](\d+):[ ](\d+)/i)){if(_0x546bbb(0x106)===_0x546bbb(0x106)){const _0x312e6a=RegExp['$1'][_0x546bbb(0x2f5)]()[_0x546bbb(0x1c7)](),_0x2d3758=Number(RegExp['$2'])||0x0,_0x5decb4=Number(RegExp['$3'])||0x1;let _0x4f2718=null;if([_0x546bbb(0x26b),'items'][_0x546bbb(0x122)](_0x312e6a))_0x4f2718=$dataItems;if(['weapon',_0x546bbb(0x1f1)][_0x546bbb(0x122)](_0x312e6a))_0x4f2718=$dataWeapons;if(['armor',_0x546bbb(0x30d)][_0x546bbb(0x122)](_0x312e6a))_0x4f2718=$dataArmors;if(this[_0x546bbb(0x176)](_0x3ac62d,_0x4f2718,_0x2d3758,_0x50d925)){if(_0x546bbb(0x1aa)!=='CQsiA')_0x50d925['push']([_0x4f2718[_0x2d3758],_0x5decb4]);else{if(_0x42f432[_0x546bbb(0x166)]())return;if(_0x4d2a15[_0x546bbb(0x11a)]())return;if(_0x50b42a[_0x546bbb(0x11d)]()[_0x546bbb(0x23e)]<=0x0){_0x2be8a4[_0x546bbb(0x101)]()&&_0x372584(_0x58ffe3[_0x546bbb(0x23c)]['WarningMsg']);return;}_0x22d567[_0x546bbb(0x119)](_0x199aa4);}}}else _0x8cd212[_0x546bbb(0x23c)][_0x546bbb(0x1fc)][_0x546bbb(0x243)](this),this[_0x546bbb(0x2d9)]();}else{if(_0x3ce765[_0x546bbb(0x21e)](/(.*?)[ ](.*):[ ](\d+)/i)){if(_0x546bbb(0x1c4)!=='wkPnH')this['_animationIDs']=this[_0x546bbb(0x20a)][_0x546bbb(0x2d7)](_0x5c46e3[_0x546bbb(0x23c)]['Settings'][_0x546bbb(0x217)]['Animations']);else{const _0x5c1f8c=RegExp['$1'][_0x546bbb(0x2f5)]()[_0x546bbb(0x1c7)](),_0x591c23=RegExp['$2'][_0x546bbb(0x1c7)](),_0x592d99=Number(RegExp['$3'])||0x1;let _0x271640=null,_0x19799b=0x0;[_0x546bbb(0x26b),_0x546bbb(0x1f8)][_0x546bbb(0x122)](_0x5c1f8c)&&(_0x546bbb(0x170)==='ItoAX'?_0x8c1d20[_0x546bbb(0x2f2)]():(_0x271640=$dataItems,_0x19799b=this[_0x546bbb(0x17c)](_0x591c23))),[_0x546bbb(0x116),_0x546bbb(0x1f1)][_0x546bbb(0x122)](_0x5c1f8c)&&(_0x271640=$dataWeapons,_0x19799b=this['getWeaponIdWithName'](_0x591c23)),[_0x546bbb(0x31a),_0x546bbb(0x30d)]['includes'](_0x5c1f8c)&&(_0x271640=$dataArmors,_0x19799b=this['getArmorIdWithName'](_0x591c23)),this['checkItemCraftingResultsValid'](_0x3ac62d,_0x271640,_0x19799b,_0x50d925)&&_0x50d925[_0x546bbb(0x119)]([_0x271640[_0x19799b],_0x592d99]);}}}}}}}return _0x50d925;},DataManager['checkItemCraftingResultsValid']=function(_0x1a0c13,_0x223dac,_0x4d2923,_0x5ab949){const _0x4e997b=_0x314c19;if(!_0x223dac)return![];if(!_0x223dac[_0x4d2923])return![];const _0x37cb52=_0x223dac[_0x4d2923];if(_0x37cb52===_0x1a0c13)return![];for(const _0x15adc8 of _0x5ab949){if(_0x4e997b(0x14f)!=='zJAlh'){if(!_0x15adc8)continue;if(_0x15adc8[0x0]===_0x37cb52)return![];}else{if(!this['active'])return![];if(!this[_0x4e997b(0x26b)]())return![];if(!this[_0x4e997b(0x1b5)]())return![];if(this[_0x4e997b(0x285)]()!==this[_0x4e997b(0x1f7)]())return![];return!![];}}return!![];},DataManager[_0x314c19(0x17c)]=function(_0x12e4f1){const _0xca8d3a=_0x314c19;_0x12e4f1=_0x12e4f1[_0xca8d3a(0x169)]()['trim'](),this[_0xca8d3a(0x2b7)]=this[_0xca8d3a(0x2b7)]||{};if(this[_0xca8d3a(0x2b7)][_0x12e4f1])return this['_itemIDs'][_0x12e4f1];for(const _0x341f94 of $dataItems){if(_0xca8d3a(0x221)!=='umTPX'){if(!_0x341f94)continue;this['_itemIDs'][_0x341f94[_0xca8d3a(0x292)][_0xca8d3a(0x169)]()[_0xca8d3a(0x1c7)]()]=_0x341f94['id'];}else this['initialize'](...arguments);}return this[_0xca8d3a(0x2b7)][_0x12e4f1]||0x0;},DataManager[_0x314c19(0x1d0)]=function(_0x103563){const _0x11cd3e=_0x314c19;_0x103563=_0x103563[_0x11cd3e(0x169)]()[_0x11cd3e(0x1c7)](),this[_0x11cd3e(0x12f)]=this[_0x11cd3e(0x12f)]||{};if(this[_0x11cd3e(0x12f)][_0x103563])return this['_weaponIDs'][_0x103563];for(const _0xc39f9e of $dataWeapons){if(!_0xc39f9e)continue;this[_0x11cd3e(0x12f)][_0xc39f9e[_0x11cd3e(0x292)]['toUpperCase']()[_0x11cd3e(0x1c7)]()]=_0xc39f9e['id'];}return this['_weaponIDs'][_0x103563]||0x0;},DataManager[_0x314c19(0xff)]=function(_0x5c329a){const _0x5cfdaa=_0x314c19;_0x5c329a=_0x5c329a['toUpperCase']()['trim'](),this[_0x5cfdaa(0x1d6)]=this['_armorIDs']||{};if(this[_0x5cfdaa(0x1d6)][_0x5c329a])return this[_0x5cfdaa(0x1d6)][_0x5c329a];for(const _0xe4bbcc of $dataArmors){if(!_0xe4bbcc)continue;this[_0x5cfdaa(0x1d6)][_0xe4bbcc[_0x5cfdaa(0x292)][_0x5cfdaa(0x169)]()[_0x5cfdaa(0x1c7)]()]=_0xe4bbcc['id'];}return this[_0x5cfdaa(0x1d6)][_0x5c329a]||0x0;},DataManager[_0x314c19(0x2ce)]=function(_0x2ec1cd){const _0x3815b6=_0x314c19;if(!_0x2ec1cd)return![];if(!VisuMZ['ItemCraftingSys']['Settings'][_0x3815b6(0x127)]['Enable'])return![];const _0x390454=$gameTemp['getCustomItemCraftingSettings']();if(_0x390454&&_0x390454[_0x3815b6(0x13f)])return![];if(_0x2ec1cd[_0x3815b6(0x318)][_0x3815b6(0x21e)](VisuMZ[_0x3815b6(0x23c)][_0x3815b6(0x30c)][_0x3815b6(0x228)]))return![];return!$gameSystem[_0x3815b6(0x226)](_0x2ec1cd);},ImageManager[_0x314c19(0x128)]=VisuMZ[_0x314c19(0x23c)][_0x314c19(0x13b)]['General'][_0x314c19(0x29f)],SoundManager[_0x314c19(0x2f2)]=function(_0x18b69d){const _0x3cd12e=_0x314c19;AudioManager[_0x3cd12e(0x256)](VisuMZ[_0x3cd12e(0x23c)][_0x3cd12e(0x13b)][_0x3cd12e(0x1fe)]);},TextManager[_0x314c19(0x247)]=VisuMZ[_0x314c19(0x23c)][_0x314c19(0x13b)][_0x314c19(0x140)][_0x314c19(0x265)],TextManager['itemCraftingNumberWindowOk']=VisuMZ[_0x314c19(0x23c)][_0x314c19(0x13b)][_0x314c19(0x140)][_0x314c19(0x293)],TextManager['itemCraftingMask']=VisuMZ['ItemCraftingSys'][_0x314c19(0x13b)][_0x314c19(0x127)][_0x314c19(0x263)],TextManager[_0x314c19(0x1b1)]=VisuMZ['ItemCraftingSys'][_0x314c19(0x13b)][_0x314c19(0x129)]['Name'],ColorManager[_0x314c19(0x262)]=function(_0x20d757){const _0x5ab2a2=_0x314c19;_0x20d757=String(_0x20d757);if(_0x20d757[_0x5ab2a2(0x21e)](/#(.*)/i)){if(_0x5ab2a2(0x1e1)!==_0x5ab2a2(0x1e1))_0x3cd193[_0x5ab2a2(0x119)](_0x28649b['floor'](_0x4cf508[_0x5ab2a2(0xf6)]()/_0x5bfce7));else return'#%1'[_0x5ab2a2(0x2cf)](String(RegExp['$1']));}else return this[_0x5ab2a2(0x2cd)](Number(_0x20d757));},SceneManager['isSceneBattle']=function(){const _0x2107ac=_0x314c19;return this[_0x2107ac(0x2de)]&&this['_scene']['constructor']===Scene_Battle;},SceneManager[_0x314c19(0x11a)]=function(){const _0x593884=_0x314c19;return this['_scene']&&this[_0x593884(0x2de)]['constructor']===Scene_ItemCrafting;},Game_Temp[_0x314c19(0x1dd)][_0x314c19(0x238)]=function(){const _0x1b67ee=_0x314c19;return this[_0x1b67ee(0x161)];},Game_Temp[_0x314c19(0x1dd)]['clearCustomItemCraftingSettings']=function(){const _0x8f301f=_0x314c19;this[_0x8f301f(0x161)]=undefined;},Game_Temp[_0x314c19(0x1dd)][_0x314c19(0x14d)]=function(_0x167dc1){this['_customItemCraftingSettings']=_0x167dc1;},VisuMZ['ItemCraftingSys'][_0x314c19(0x209)]=Game_System[_0x314c19(0x1dd)][_0x314c19(0x23a)],Game_System[_0x314c19(0x1dd)][_0x314c19(0x23a)]=function(){const _0x45aa3c=_0x314c19;VisuMZ[_0x45aa3c(0x23c)][_0x45aa3c(0x209)][_0x45aa3c(0x243)](this),this['initItemCraftingMainMenu'](),this[_0x45aa3c(0x2a6)]();},Game_System[_0x314c19(0x1dd)]['initItemCraftingMainMenu']=function(){const _0x3d5709=_0x314c19;this[_0x3d5709(0x2be)]={'shown':VisuMZ[_0x3d5709(0x23c)][_0x3d5709(0x13b)][_0x3d5709(0x129)][_0x3d5709(0xfe)],'enabled':VisuMZ[_0x3d5709(0x23c)][_0x3d5709(0x13b)][_0x3d5709(0x129)][_0x3d5709(0x22a)]};},Game_System[_0x314c19(0x1dd)][_0x314c19(0x239)]=function(){const _0x1246a0=_0x314c19;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x1246a0(0x2b0)]();return this[_0x1246a0(0x2be)][_0x1246a0(0x250)];},Game_System['prototype'][_0x314c19(0x317)]=function(_0x4e8a86){const _0x2a8fac=_0x314c19;if(this[_0x2a8fac(0x2be)]===undefined)this[_0x2a8fac(0x2b0)]();this['_ItemCrafting_MainMenu'][_0x2a8fac(0x250)]=_0x4e8a86;},Game_System['prototype']['isMainMenuItemCraftingEnabled']=function(){const _0xb41d81=_0x314c19;if(this['_ItemCrafting_MainMenu']===undefined)this[_0xb41d81(0x2b0)]();return this[_0xb41d81(0x2be)]['enabled'];},Game_System[_0x314c19(0x1dd)][_0x314c19(0x150)]=function(_0x589ad3){const _0x142707=_0x314c19;if(this[_0x142707(0x2be)]===undefined)this[_0x142707(0x2b0)]();this[_0x142707(0x2be)][_0x142707(0x24a)]=_0x589ad3;},Game_System[_0x314c19(0x1dd)][_0x314c19(0x2a6)]=function(){const _0x29444f=_0x314c19;this[_0x29444f(0x25e)]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x314c19(0x1dd)]['isItemCrafted']=function(_0x14ed6e){return!!this['getItemCraftedTimes'](_0x14ed6e);},Game_System[_0x314c19(0x1dd)]['getItemCraftedTimes']=function(_0x58b185){const _0x468d61=_0x314c19;if(!_0x58b185)return![];if(this[_0x468d61(0x25e)]===undefined)this['initItemCraftingSys']();let _0x2a219a={};if(DataManager[_0x468d61(0x26e)](_0x58b185))_0x2a219a=this[_0x468d61(0x25e)]['items'];if(DataManager[_0x468d61(0x108)](_0x58b185))_0x2a219a=this['_itemsCrafted'][_0x468d61(0x1f1)];if(DataManager[_0x468d61(0x30a)](_0x58b185))_0x2a219a=this[_0x468d61(0x25e)][_0x468d61(0x30d)];return _0x2a219a[_0x58b185['id']]||0x0;},Game_System[_0x314c19(0x1dd)][_0x314c19(0x30f)]=function(_0x478e71,_0x21c664){const _0x1eae92=_0x314c19;if(!_0x478e71)return![];if(this[_0x1eae92(0x25e)]===undefined)this[_0x1eae92(0x2a6)]();_0x21c664=_0x21c664||0x1;let _0x3ad4ee={};if(DataManager[_0x1eae92(0x26e)](_0x478e71))_0x3ad4ee=this[_0x1eae92(0x25e)][_0x1eae92(0x1f8)];if(DataManager['isWeapon'](_0x478e71))_0x3ad4ee=this['_itemsCrafted']['weapons'];if(DataManager[_0x1eae92(0x30a)](_0x478e71))_0x3ad4ee=this['_itemsCrafted'][_0x1eae92(0x30d)];_0x3ad4ee[_0x478e71['id']]=_0x3ad4ee[_0x478e71['id']]||0x0,_0x3ad4ee[_0x478e71['id']]+=_0x21c664;},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x322)]=Scene_Menu[_0x314c19(0x1dd)]['createCommandWindow'],Scene_Menu[_0x314c19(0x1dd)][_0x314c19(0x2b6)]=function(){const _0x9ce177=_0x314c19;VisuMZ[_0x9ce177(0x23c)][_0x9ce177(0x322)][_0x9ce177(0x243)](this);const _0x3e7740=this[_0x9ce177(0x2d3)];_0x3e7740[_0x9ce177(0x14b)](_0x9ce177(0x211),this[_0x9ce177(0x1ba)][_0x9ce177(0xf5)](this));},Scene_Menu[_0x314c19(0x1dd)][_0x314c19(0x1ba)]=function(){const _0xbb66db=_0x314c19;SceneManager[_0xbb66db(0x119)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x522280=_0x314c19;this[_0x522280(0x23a)](...arguments);}Scene_ItemCrafting[_0x314c19(0x1dd)]=Object[_0x314c19(0x22b)](Scene_Item['prototype']),Scene_ItemCrafting['prototype']['constructor']=Scene_ItemCrafting,Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x23a)]=function(){const _0x36a74f=_0x314c19;Scene_Item[_0x36a74f(0x1dd)]['initialize'][_0x36a74f(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1fb)]=function(){const _0x460596=_0x314c19;Scene_Item['prototype'][_0x460596(0x1fb)][_0x460596(0x243)](this),this[_0x460596(0x12c)]();},Scene_ItemCrafting['prototype']['create']=function(){const _0x35caf0=_0x314c19;Scene_Item[_0x35caf0(0x1dd)][_0x35caf0(0x22b)][_0x35caf0(0x243)](this),this[_0x35caf0(0x183)](),this[_0x35caf0(0x20d)](),this[_0x35caf0(0x143)](),this['createIngredientSelectionList'](),this[_0x35caf0(0x294)]()&&(_0x35caf0(0x1bc)===_0x35caf0(0x1bc)?this[_0x35caf0(0x10d)]():this[_0x35caf0(0x23b)]()),this[_0x35caf0(0x10b)](),this['resetCraftingSwitches']();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x10b)]=function(){const _0xd0366d=_0x314c19,_0x3319de=VisuMZ['ItemCraftingSys'][_0xd0366d(0x13b)][_0xd0366d(0x308)];this[_0xd0366d(0x182)]&&(_0xd0366d(0x2a7)!==_0xd0366d(0x2a7)?this[_0xd0366d(0xfd)]():this[_0xd0366d(0x182)][_0xd0366d(0x142)](_0x3319de[_0xd0366d(0x151)]));this[_0xd0366d(0x2e8)]&&this[_0xd0366d(0x2e8)][_0xd0366d(0x142)](_0x3319de['CategoryBgType']);this[_0xd0366d(0x268)]&&this[_0xd0366d(0x268)][_0xd0366d(0x142)](_0x3319de[_0xd0366d(0xf7)]);if(this[_0xd0366d(0x1cb)]){if('KrUrE'===_0xd0366d(0x1d9))this[_0xd0366d(0x1cb)][_0xd0366d(0x142)](_0x3319de[_0xd0366d(0x2b2)]);else{let _0x2c94b9=_0x4730b9[0x0],_0xa8bd9='';if(_0x2c94b9===_0xd0366d(0xf6))_0xa8bd9=_0x3232d0['currencyUnit'];else typeof _0x2c94b9===_0xd0366d(0x103)&&_0x2c94b9['match'](/CATEGORY/i)?(_0x2c94b9[_0xd0366d(0x21e)](/CATEGORY: (.*)/i),_0xa8bd9=_0x17173e(_0x247a36['$1'])['trim']()):_0xa8bd9=_0x2c94b9[_0xd0366d(0x292)];this[_0xd0366d(0x125)][_0xd0366d(0x278)](_0xa8bd9[_0xd0366d(0x1c7)]());return;}}this[_0xd0366d(0x282)]&&this[_0xd0366d(0x282)][_0xd0366d(0x142)](_0x3319de[_0xd0366d(0x283)]);if(this[_0xd0366d(0x2ca)]){if('GRSyd'!==_0xd0366d(0x12a))this[_0xd0366d(0x2ca)]['setBackgroundType'](_0x3319de[_0xd0366d(0x2d2)]);else return _0x7e7a=_0x3d12c8(_0x3aa51b),_0x502dd8[_0xd0366d(0x21e)](/#(.*)/i)?_0xd0366d(0x218)['format'](_0x4bff2c(_0x805d35['$1'])):this[_0xd0366d(0x2cd)](_0x3cbb80(_0x4136a7));}this[_0xd0366d(0x2da)]&&(_0xd0366d(0x2f8)==='TtxZM'?_0x1ef01b['remove'](_0xd32304):this[_0xd0366d(0x2da)]['setBackgroundType'](_0x3319de[_0xd0366d(0xfc)]));this['_numberWindow']&&this['_numberWindow'][_0xd0366d(0x142)](_0x3319de[_0xd0366d(0x141)]);if(this[_0xd0366d(0x2b3)]){if(_0xd0366d(0x193)!=='loFYQ')this[_0xd0366d(0x2b3)][_0xd0366d(0x142)](_0x3319de['ButtonAssistBgType']);else return this[_0xd0366d(0x2cd)](_0x37f7bb(_0x5efb75));}},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1e2)]=function(){const _0x139499=_0x314c19;return Scene_Shop[_0x139499(0x1dd)][_0x139499(0x214)]['call'](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x183)]=function(){const _0x265bf0=_0x314c19,_0xd83005=this[_0x265bf0(0x2c7)]();this[_0x265bf0(0x268)]=new Window_Gold(_0xd83005),this[_0x265bf0(0x31b)](this[_0x265bf0(0x268)]);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2c7)]=function(){const _0x4da635=_0x314c19;return Scene_Shop[_0x4da635(0x1dd)][_0x4da635(0x124)][_0x4da635(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)]['categoryWindowRect']=function(){const _0x5f26f8=_0x314c19;return Scene_Shop[_0x5f26f8(0x1dd)][_0x5f26f8(0x1bf)][_0x5f26f8(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2dd)]=function(){const _0x2e38e7=_0x314c19;this[_0x2e38e7(0x1b3)]();if(this[_0x2e38e7(0x294)]()){if(_0x2e38e7(0x21a)==='UbEsk')this[_0x2e38e7(0x299)]();else{if(!_0xe62d1a[_0x2e38e7(0x226)](_0x23e505))return;const _0x3cb280=_0x114066[_0x2e38e7(0x128)];let _0x7e548f=_0x4402d3['x']+_0x47e20f['width']-_0x47f5e5[_0x2e38e7(0x264)],_0x155bbc=_0xbd689['y']+0x2;this[_0x2e38e7(0x1e4)](_0x3cb280,_0x7e548f,_0x155bbc);}}this[_0x2e38e7(0x288)]()&&(this[_0x2e38e7(0x1e9)](),this[_0x2e38e7(0x31b)](this[_0x2e38e7(0x1cb)]));},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1b3)]=function(){const _0x4da44c=_0x314c19,_0x33b60a=this['itemWindowRect']();this[_0x4da44c(0x1cb)]=new Window_ItemCraftingList(_0x33b60a),this[_0x4da44c(0x1cb)][_0x4da44c(0x13e)](this[_0x4da44c(0x182)]),this[_0x4da44c(0x1cb)]['setHandler']('ok',this['onItemOk'][_0x4da44c(0xf5)](this)),this[_0x4da44c(0x1cb)]['setHandler'](_0x4da44c(0x305),this[_0x4da44c(0x31e)][_0x4da44c(0xf5)](this)),this[_0x4da44c(0x31b)](this[_0x4da44c(0x1cb)]),this[_0x4da44c(0x2e8)][_0x4da44c(0x22d)](this[_0x4da44c(0x1cb)]),!this[_0x4da44c(0x2e8)][_0x4da44c(0x2e7)]()&&(this[_0x4da44c(0x1cb)]['y']-=this[_0x4da44c(0x2e8)][_0x4da44c(0x1a9)],this[_0x4da44c(0x1cb)]['height']+=this['_categoryWindow']['height'],this['_categoryWindow'][_0x4da44c(0x1b2)](),this[_0x4da44c(0x2e8)]['deactivate'](),this[_0x4da44c(0x10d)]());},Scene_ItemCrafting['prototype'][_0x314c19(0x178)]=function(){const _0x50720f=_0x314c19;return this[_0x50720f(0x2d3)]=this[_0x50720f(0x2e8)],Scene_Shop[_0x50720f(0x1dd)][_0x50720f(0x1e8)][_0x50720f(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1a0)]=function(){const _0x51bacc=_0x314c19;return Scene_Shop[_0x51bacc(0x1dd)][_0x51bacc(0x208)][_0x51bacc(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)]['createNumberWindow']=function(){const _0x4143a7=_0x314c19,_0x1c0d3e=this[_0x4143a7(0x178)]();this[_0x4143a7(0x192)]=new Window_ItemCraftingNumber(_0x1c0d3e),this['_numberWindow']['hide'](),this[_0x4143a7(0x192)][_0x4143a7(0x14b)]('ok',this['onNumberOk'][_0x4143a7(0xf5)](this)),this[_0x4143a7(0x192)][_0x4143a7(0x14b)](_0x4143a7(0x305),this[_0x4143a7(0x165)][_0x4143a7(0xf5)](this)),this[_0x4143a7(0x31b)](this['_numberWindow']);},Scene_ItemCrafting['prototype'][_0x314c19(0x143)]=function(){const _0x5d31bf=_0x314c19,_0x1d1ff4=this[_0x5d31bf(0x300)]();this[_0x5d31bf(0x2ca)]=new Window_Selectable(_0x1d1ff4),this['_ingredientSelectTitle'][_0x5d31bf(0x1b2)](),this[_0x5d31bf(0x31b)](this[_0x5d31bf(0x2ca)]);},Scene_ItemCrafting['prototype'][_0x314c19(0x2b5)]=function(){const _0x421353=_0x314c19,_0x53b7a5=this[_0x421353(0x178)](),_0x1eb031=new Window_ItemCraftingIngredient(_0x53b7a5);_0x1eb031[_0x421353(0x1b2)](),_0x1eb031[_0x421353(0x13e)](this['_helpWindow']),_0x1eb031[_0x421353(0x323)](this[_0x421353(0x282)]),_0x1eb031[_0x421353(0x14b)]('ok',this[_0x421353(0x19f)][_0x421353(0xf5)](this)),_0x1eb031[_0x421353(0x14b)](_0x421353(0x305),this[_0x421353(0x1b0)][_0x421353(0xf5)](this)),this[_0x421353(0x2da)]=_0x1eb031,this['addWindow'](this[_0x421353(0x2da)]);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x10d)]=function(){const _0x55641c=_0x314c19;this[_0x55641c(0x1cb)][_0x55641c(0x310)](),this[_0x55641c(0x1cb)][_0x55641c(0x224)](0x0);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x316)]=function(){const _0x48b1d2=_0x314c19;this[_0x48b1d2(0x27f)]=this[_0x48b1d2(0x1cb)]['item'](),this[_0x48b1d2(0x1cb)][_0x48b1d2(0x1b2)](),this[_0x48b1d2(0x25d)]();if(this[_0x48b1d2(0x2e4)]())this[_0x48b1d2(0x23b)]();else{if(_0x48b1d2(0x22c)===_0x48b1d2(0x22c))this[_0x48b1d2(0x245)]();else return _0x15ea15['_categoryWindow'][_0x48b1d2(0x22f)]['includes'](_0xc4600e);}},Scene_ItemCrafting[_0x314c19(0x1dd)]['setupNumberWindow']=function(){const _0x286eb6=_0x314c19;this['_ingredientSelectTitle'][_0x286eb6(0x1b2)](),this['_ingredientSelectList'][_0x286eb6(0x1b2)](),this[_0x286eb6(0x2e8)][_0x286eb6(0x18b)](),this[_0x286eb6(0x192)][_0x286eb6(0x2a3)](this['_item']),this['_numberWindow'][_0x286eb6(0x18b)](),this[_0x286eb6(0x192)]['activate']();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x19d)]=function(){const _0xaf7c2d=_0x314c19;this[_0xaf7c2d(0x192)][_0xaf7c2d(0x1b2)](),this[_0xaf7c2d(0x2ca)]['hide'](),this[_0xaf7c2d(0x2da)]['hide'](),this[_0xaf7c2d(0x2e8)][_0xaf7c2d(0x18b)](),this[_0xaf7c2d(0x1cb)][_0xaf7c2d(0x18b)](),this[_0xaf7c2d(0x1cb)][_0xaf7c2d(0x310)](),this[_0xaf7c2d(0x1cb)][_0xaf7c2d(0x2a2)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2a8)]=function(){const _0x1f4f61=_0x314c19;VisuMZ[_0x1f4f61(0x23c)][_0x1f4f61(0x13b)]['Animation'][_0x1f4f61(0x180)]?_0x1f4f61(0x1a1)!==_0x1f4f61(0x1a1)?(this['_animationIDs']=[],this[_0x1f4f61(0x27f)]['note'][_0x1f4f61(0x21e)](_0x1c26ce['ItemCraftingSys'][_0x1f4f61(0x30c)][_0x1f4f61(0x13a)])?this[_0x1f4f61(0x20a)]=_0x27b4e6['$1'][_0x1f4f61(0x16f)](',')['map'](_0x33752c=>_0x384598(_0x33752c)):this[_0x1f4f61(0x20a)]=this[_0x1f4f61(0x20a)][_0x1f4f61(0x2d7)](_0x2c66e9[_0x1f4f61(0x23c)][_0x1f4f61(0x13b)]['Animation'][_0x1f4f61(0x1be)])):this[_0x1f4f61(0x234)]():this[_0x1f4f61(0x175)]();},Scene_ItemCrafting['prototype'][_0x314c19(0x175)]=function(){const _0x273c6e=_0x314c19;this[_0x273c6e(0x215)]['visible']=!![],this[_0x273c6e(0x27c)]=![],this['processItemCrafting'](),this['onItemCrafted'](),this[_0x273c6e(0x19d)](),this[_0x273c6e(0x1cb)]['refresh'](),this['_categoryWindow'][_0x273c6e(0x325)](),this[_0x273c6e(0x2e8)]['refreshCursor'](),this[_0x273c6e(0x2e8)][_0x273c6e(0x311)](),this[_0x273c6e(0x268)][_0x273c6e(0x325)](),this[_0x273c6e(0x1cb)][_0x273c6e(0x2a2)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x131)]=function(){const _0x2a30c9=_0x314c19,_0x578916=this[_0x2a30c9(0x27f)],_0x116362=this[_0x2a30c9(0x192)][_0x2a30c9(0x30e)](),_0x13d701=DataManager[_0x2a30c9(0x1ae)](_0x578916);let _0x3846b6=0x0;for(const _0x2050b0 of _0x13d701){if(!_0x2050b0)continue;let _0x5c25d3=_0x2050b0[0x0];const _0xa2bdd7=_0x2050b0[0x1]*_0x116362;if(_0x5c25d3===_0x2a30c9(0xf6))_0x2a30c9(0x174)!==_0x2a30c9(0x174)?_0x394dba=_0x72ea98(_0x435406['$1']):$gameParty[_0x2a30c9(0x18f)](_0xa2bdd7);else{if(_0x2a30c9(0x2e3)===_0x2a30c9(0x255))_0x448553[_0x2a30c9(0x1dd)][_0x2a30c9(0x23a)][_0x2a30c9(0x243)](this,_0x528baa),this['createTooltipWindow']();else{if(typeof _0x5c25d3===_0x2a30c9(0x103)&&_0x5c25d3[_0x2a30c9(0x21e)](/CATEGORY/i)){if(_0x2a30c9(0x1cf)!=='SxZsH')_0x5c25d3=this['_ingredientsList'][_0x3846b6],_0x3846b6+=0x1;else{const _0x367229=this[_0x2a30c9(0xf8)](_0x320310);if(!_0x367229)return;const _0x4b81db=this[_0x2a30c9(0x2e0)](_0x19ba34);this[_0x2a30c9(0x12d)](),this[_0x2a30c9(0x113)](_0x4b81db,0x2),this[_0x2a30c9(0x198)](_0x1debb0,_0x367229,_0x4b81db),this[_0x2a30c9(0x1af)](_0x367229,_0x4b81db),this[_0x2a30c9(0x1f5)](_0x367229,_0x4b81db),this['drawCraftingIngredients'](_0x367229,_0x4b81db);}}$gameParty[_0x2a30c9(0x112)](_0x5c25d3,_0xa2bdd7,![]);}}}$gameParty['gainItem'](_0x578916,_0x116362);if(this[_0x2a30c9(0x192)]['number']()>0x0)_0x2a30c9(0x1f4)!==_0x2a30c9(0x1f4)?_0x3943f6[_0x2a30c9(0x1dd)]['initialize']['call'](this):SoundManager[_0x2a30c9(0x2f2)]();else{if(_0x2a30c9(0x2f7)===_0x2a30c9(0x2f7))SoundManager['playCancel']();else{const _0x17ce98={'BgFilename1':_0x5d73a9[_0x2a30c9(0x23c)][_0x2a30c9(0x13b)][_0x2a30c9(0x11e)][_0x2a30c9(0x11b)],'BgFilename2':_0x28bb05[_0x2a30c9(0x23c)][_0x2a30c9(0x13b)][_0x2a30c9(0x11e)][_0x2a30c9(0x16c)]};_0x17ce98&&(_0x17ce98['BgFilename1']!==''||_0x17ce98[_0x2a30c9(0x16c)]!=='')&&(this['_backSprite1']=new _0x52fb26(_0xc0d6ee['loadTitle1'](_0x17ce98[_0x2a30c9(0x11b)])),this[_0x2a30c9(0x1a2)]=new _0x1fbc64(_0x386ba6['loadTitle2'](_0x17ce98[_0x2a30c9(0x16c)])),this[_0x2a30c9(0x2fa)](this[_0x2a30c9(0x290)]),this['addChild'](this['_backSprite2']),this['_backSprite1'][_0x2a30c9(0x31f)][_0x2a30c9(0x19a)](this['adjustSprite'][_0x2a30c9(0xf5)](this,this[_0x2a30c9(0x290)])),this['_backSprite2'][_0x2a30c9(0x31f)][_0x2a30c9(0x19a)](this[_0x2a30c9(0x244)][_0x2a30c9(0xf5)](this,this[_0x2a30c9(0x1a2)])));}}$gameSystem['registerCraftedItem'](_0x578916,_0x116362);},Scene_ItemCrafting['prototype'][_0x314c19(0x277)]=function(){const _0x3f5075=_0x314c19,_0x9d3b1c=this[_0x3f5075(0x27f)],_0x5c1757=this[_0x3f5075(0x192)][_0x3f5075(0x30e)]();VisuMZ['ItemCraftingSys'][_0x3f5075(0x111)](_0x9d3b1c,!![]),VisuMZ[_0x3f5075(0x23c)][_0x3f5075(0x111)](_0x9d3b1c,![]),this[_0x3f5075(0x28e)]();const _0x24355a=DataManager[_0x3f5075(0x104)](_0x9d3b1c);VisuMZ['ItemCraftingSys']['JS'][_0x24355a]&&VisuMZ['ItemCraftingSys']['JS'][_0x24355a][_0x3f5075(0x243)](this,_0x9d3b1c,_0x5c1757),VisuMZ[_0x3f5075(0x23c)]['Settings'][_0x3f5075(0x140)][_0x3f5075(0xf2)][_0x3f5075(0x243)](this,_0x9d3b1c,_0x5c1757);},VisuMZ[_0x314c19(0x23c)]['TurnSwitches']=function(_0x5b85be,_0x2dd971){const _0x2d6287=_0x314c19,_0x5a7698=_0x2dd971?VisuMZ[_0x2d6287(0x23c)][_0x2d6287(0x30c)][_0x2d6287(0x269)]:VisuMZ[_0x2d6287(0x23c)][_0x2d6287(0x30c)][_0x2d6287(0x273)],_0x1244f6=_0x5b85be[_0x2d6287(0x318)][_0x2d6287(0x21e)](_0x5a7698);if(_0x1244f6){if(_0x2d6287(0x10a)!==_0x2d6287(0x10a))this[_0x2d6287(0x2a1)](_0xc0916b[_0x2d6287(0x2c2)]());else for(const _0x2ec032 of _0x1244f6){if(_0x2d6287(0x1d8)===_0x2d6287(0x1d8)){if(!_0x2ec032)continue;_0x2ec032[_0x2d6287(0x21e)](_0x5a7698);const _0x23cb8a=JSON[_0x2d6287(0x2e2)]('['+RegExp['$1'][_0x2d6287(0x21e)](/\d+/g)+']');for(const _0x421596 of _0x23cb8a){$gameSwitches[_0x2d6287(0x196)](_0x421596,_0x2dd971);}}else this[_0x2d6287(0x2e8)][_0x2d6287(0x142)](_0x30a6bc['CategoryBgType']);}}},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x165)]=function(){const _0x54d545=_0x314c19;SoundManager[_0x54d545(0x222)](),this[_0x54d545(0x1b0)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x19f)]=function(){const _0x2129ce=_0x314c19,_0x53834f=this[_0x2129ce(0x2da)][_0x2129ce(0x26b)]();this['_ingredientsList'][this[_0x2129ce(0x24d)]]=_0x53834f,this[_0x2129ce(0x24d)]++,this['setupSelectIngredientWindow']();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1b0)]=function(){const _0x148284=_0x314c19;this['_ingredientsList'][_0x148284(0x109)](),this[_0x148284(0x24d)]--,this[_0x148284(0x24d)]<0x0?this[_0x148284(0x19d)]():_0x148284(0x302)!==_0x148284(0x302)?this[_0x148284(0x18e)]=!![]:this[_0x148284(0x23b)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x25d)]=function(){const _0x4a323b=_0x314c19;this[_0x4a323b(0x139)]=[],this['_ingredientAmounts']=[],this[_0x4a323b(0x240)]=[],this[_0x4a323b(0x24d)]=0x0;},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2e4)]=function(){const _0x44defd=_0x314c19;if(!this[_0x44defd(0x27f)])return![];const _0x4424cb=DataManager[_0x44defd(0x1ae)](this[_0x44defd(0x27f)]);for(const _0x135168 of _0x4424cb){if(!_0x135168)continue;const _0x461110=_0x135168[0x0];if(!_0x461110)continue;if(typeof _0x461110===_0x44defd(0x103)&&_0x461110[_0x44defd(0x21e)](/CATEGORY/i)){if(_0x44defd(0x298)!==_0x44defd(0x1c6)){_0x461110[_0x44defd(0x21e)](/CATEGORY: (.*)/i);const _0x2d8c1e=String(RegExp['$1'])[_0x44defd(0x1c7)]();this[_0x44defd(0x139)][_0x44defd(0x119)](_0x2d8c1e),this[_0x44defd(0x312)][_0x44defd(0x119)](_0x135168[0x1]||0x1);}else return _0x219b0c[_0x44defd(0x1dd)][_0x44defd(0x16e)][_0x44defd(0x243)](this)*0x3+0x8;}}return this[_0x44defd(0x139)][_0x44defd(0x23e)]>0x0;},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x23b)]=function(){const _0x41fced=_0x314c19;if(this[_0x41fced(0x24d)]>=this[_0x41fced(0x139)][_0x41fced(0x23e)])return this[_0x41fced(0x245)]();this[_0x41fced(0x2e8)]['hide'](),this[_0x41fced(0x192)][_0x41fced(0x1b2)]();const _0x5b8999=this[_0x41fced(0x139)][this[_0x41fced(0x24d)]],_0x56d7d2=this['_ingredientAmounts'][this[_0x41fced(0x24d)]];this[_0x41fced(0x2ca)][_0x41fced(0x18b)](),this['_ingredientSelectList'][_0x41fced(0x18b)](),this[_0x41fced(0x2ca)]['contents']['clear']();const _0x341469=VisuMZ[_0x41fced(0x23c)]['Settings'][_0x41fced(0x140)][_0x41fced(0x17b)],_0x5b4823=VisuMZ[_0x41fced(0x1f0)][_0x41fced(0x13b)][_0x41fced(0x258)][_0x41fced(0x2ef)],_0x56d0dd=_0x341469[_0x41fced(0x2cf)](_0x5b8999,_0x5b4823[_0x41fced(0x2cf)](_0x56d7d2)),_0x6cfb6a=this[_0x41fced(0x2ca)]['itemLineRect'](0x0);this[_0x41fced(0x2ca)][_0x41fced(0x1c5)](_0x56d0dd,_0x6cfb6a['x'],_0x6cfb6a['y']),this['_ingredientSelectList'][_0x41fced(0x2a3)](_0x5b8999,_0x56d7d2);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x136)]=function(){const _0x693e56=_0x314c19;if(this[_0x693e56(0x192)]&&this[_0x693e56(0x192)][_0x693e56(0x195)])return TextManager[_0x693e56(0x1ef)](_0x693e56(0x2a9),_0x693e56(0x1a3));return Scene_Item[_0x693e56(0x1dd)][_0x693e56(0x136)][_0x693e56(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x158)]=function(){const _0x2717ca=_0x314c19;if(this[_0x2717ca(0x192)]&&this['_numberWindow']['active'])return TextManager[_0x2717ca(0x1ef)]('up','down');return Scene_Item[_0x2717ca(0x1dd)][_0x2717ca(0x158)][_0x2717ca(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)]['buttonAssistText1']=function(){const _0x20f16f=_0x314c19;if(this[_0x20f16f(0x1e6)]()){if(_0x20f16f(0x2cc)!==_0x20f16f(0x2cc))this['_itemSprite']=new _0xf6c88c(),this['addChild'](this[_0x20f16f(0x2c5)]),this[_0x20f16f(0x110)](),this[_0x20f16f(0x164)](),this['setItemSpritePosition'](),this[_0x20f16f(0x1c8)](),this[_0x20f16f(0x20e)](),this[_0x20f16f(0x167)](this['_animationIDs'][_0x20f16f(0x145)]());else return VisuMZ[_0x20f16f(0x1f0)][_0x20f16f(0x13b)][_0x20f16f(0x258)][_0x20f16f(0x206)];}else{if(this[_0x20f16f(0x192)]&&this['_numberWindow'][_0x20f16f(0x195)])return VisuMZ[_0x20f16f(0x1f0)]['Settings']['ShopScene']['buttonAssistSmallIncrement'];}return Scene_Item[_0x20f16f(0x1dd)][_0x20f16f(0x1c9)]['call'](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x189)]=function(){const _0x53553c=_0x314c19;if(this[_0x53553c(0x192)]&&this['_numberWindow'][_0x53553c(0x195)])return VisuMZ[_0x53553c(0x1f0)][_0x53553c(0x13b)][_0x53553c(0x1b9)][_0x53553c(0x254)];return Scene_Item[_0x53553c(0x1dd)]['buttonAssistText2'][_0x53553c(0x243)](this);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x16a)]=function(){const _0x372b69=_0x314c19;if(this[_0x372b69(0x192)]&&this['_numberWindow'][_0x372b69(0x195)]){if(_0x372b69(0x173)===_0x372b69(0x173))return TextManager[_0x372b69(0x25a)];else this[_0x372b69(0x2ee)](_0x229361['CoreEngine'][_0x372b69(0x13b)][_0x372b69(0x296)]['GoldOverlap'],_0x2c6206,_0xaa724,_0x5ceafc,_0x372b69(0x1a3));}else return Scene_Item['prototype'][_0x372b69(0x16a)]['call'](this);},Scene_ItemCrafting[_0x314c19(0x1dd)]['createBackground']=function(){const _0x59bb03=_0x314c19;Scene_MenuBase[_0x59bb03(0x1dd)][_0x59bb03(0x1df)][_0x59bb03(0x243)](this),this[_0x59bb03(0x1ee)](this[_0x59bb03(0x138)]()),this[_0x59bb03(0x1cc)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x138)]=function(){const _0x2ee53b=_0x314c19;return VisuMZ[_0x2ee53b(0x23c)][_0x2ee53b(0x13b)][_0x2ee53b(0x11e)][_0x2ee53b(0x160)];},Scene_ItemCrafting['prototype'][_0x314c19(0x1cc)]=function(){const _0xb2fde5=_0x314c19,_0x5cf171={'BgFilename1':VisuMZ[_0xb2fde5(0x23c)][_0xb2fde5(0x13b)][_0xb2fde5(0x11e)][_0xb2fde5(0x11b)],'BgFilename2':VisuMZ[_0xb2fde5(0x23c)]['Settings'][_0xb2fde5(0x11e)][_0xb2fde5(0x16c)]};_0x5cf171&&(_0x5cf171[_0xb2fde5(0x11b)]!==''||_0x5cf171[_0xb2fde5(0x16c)]!=='')&&(this[_0xb2fde5(0x290)]=new Sprite(ImageManager[_0xb2fde5(0x284)](_0x5cf171[_0xb2fde5(0x11b)])),this[_0xb2fde5(0x1a2)]=new Sprite(ImageManager['loadTitle2'](_0x5cf171['BgFilename2'])),this[_0xb2fde5(0x2fa)](this['_backSprite1']),this['addChild'](this[_0xb2fde5(0x1a2)]),this[_0xb2fde5(0x290)]['bitmap'][_0xb2fde5(0x19a)](this[_0xb2fde5(0x244)][_0xb2fde5(0xf5)](this,this['_backSprite1'])),this[_0xb2fde5(0x1a2)]['bitmap'][_0xb2fde5(0x19a)](this[_0xb2fde5(0x244)][_0xb2fde5(0xf5)](this,this[_0xb2fde5(0x1a2)])));},Scene_ItemCrafting['prototype'][_0x314c19(0x244)]=function(_0x2060fe){const _0x136a29=_0x314c19;this['scaleSprite'](_0x2060fe),this[_0x136a29(0x2f3)](_0x2060fe);},Scene_ItemCrafting['prototype'][_0x314c19(0x234)]=function(){const _0x1d7c91=_0x314c19;this[_0x1d7c91(0x27c)]=!![],this[_0x1d7c91(0x2ea)]=0x14,this[_0x1d7c91(0x215)][_0x1d7c91(0x162)]=VisuMZ['ItemCraftingSys']['Settings'][_0x1d7c91(0x217)][_0x1d7c91(0x2fc)]||![],this[_0x1d7c91(0x13c)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x13c)]=function(){const _0x4253af=_0x314c19;this[_0x4253af(0x2c5)]=new Sprite(),this['addChild'](this[_0x4253af(0x2c5)]),this[_0x4253af(0x110)](),this[_0x4253af(0x164)](),this[_0x4253af(0x2d8)](),this[_0x4253af(0x1c8)](),this[_0x4253af(0x20e)](),this[_0x4253af(0x167)](this['_animationIDs'][_0x4253af(0x145)]());},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x110)]=function(){const _0x467f1f=_0x314c19,_0x509083=VisuMZ[_0x467f1f(0x23c)][_0x467f1f(0x30c)],_0x3216fe=this[_0x467f1f(0x27f)][_0x467f1f(0x318)];this['_craftPicture']='';if(_0x3216fe[_0x467f1f(0x21e)](_0x509083[_0x467f1f(0x1fa)])){if(_0x467f1f(0x1ff)!==_0x467f1f(0x1ff)){if(this['_ItemCrafting_MainMenu']===_0x36f714)this[_0x467f1f(0x2b0)]();this['_ItemCrafting_MainMenu'][_0x467f1f(0x24a)]=_0x1eef21;}else this[_0x467f1f(0x315)]=String(RegExp['$1']);}else _0x3216fe[_0x467f1f(0x21e)](_0x509083[_0x467f1f(0x1db)])&&(this[_0x467f1f(0x315)]=String(RegExp['$1']));this['_iconSprite']=new Sprite();this[_0x467f1f(0x315)]?this['_iconSprite'][_0x467f1f(0x31f)]=ImageManager[_0x467f1f(0x24f)](this[_0x467f1f(0x315)]):(this['_iconSprite']['bitmap']=ImageManager[_0x467f1f(0x230)](_0x467f1f(0x21d)),this[_0x467f1f(0x289)]['bitmap']['smooth']=![]);this['_iconSprite']['anchor']['x']=0.5,this[_0x467f1f(0x289)][_0x467f1f(0x15f)]['y']=0.5;if(!this[_0x467f1f(0x315)]){const _0x4e7f9c=VisuMZ[_0x467f1f(0x23c)][_0x467f1f(0x13b)][_0x467f1f(0x217)]['Scale']||0x8;this[_0x467f1f(0x289)]['scale']['x']=_0x4e7f9c,this[_0x467f1f(0x289)][_0x467f1f(0x188)]['y']=_0x4e7f9c;}this[_0x467f1f(0x2c5)][_0x467f1f(0x2fa)](this[_0x467f1f(0x289)]);},Scene_ItemCrafting[_0x314c19(0x1dd)]['setItemSpriteFrame']=function(){const _0x4af83d=_0x314c19;if(this[_0x4af83d(0x315)])return;const _0x4a6e0e=this['_item'],_0x39b73a=_0x4a6e0e[_0x4af83d(0x2d5)],_0x297d97=ImageManager['iconWidth'],_0x302729=ImageManager[_0x4af83d(0xfb)],_0x23f50d=_0x39b73a%0x10*_0x297d97,_0x19beb3=Math[_0x4af83d(0x29a)](_0x39b73a/0x10)*_0x302729;this['_iconSprite'][_0x4af83d(0x1ca)](_0x23f50d,_0x19beb3,_0x297d97,_0x302729);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2d8)]=function(){const _0x5652d9=_0x314c19;this[_0x5652d9(0x2c5)]['x']=Math[_0x5652d9(0xf3)](Graphics[_0x5652d9(0x326)]/0x2);const _0x444013=Math[_0x5652d9(0xf3)](ImageManager['iconHeight']*this[_0x5652d9(0x2c5)]['scale']['y']);this[_0x5652d9(0x2c5)]['y']=Math[_0x5652d9(0xf3)]((Graphics[_0x5652d9(0x1a9)]+_0x444013)/0x2);},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1c8)]=function(){const _0x19f97e=_0x314c19;this[_0x19f97e(0x13d)]=VisuMZ['ItemCraftingSys']['Settings'][_0x19f97e(0x217)][_0x19f97e(0x1b4)]||0x1;if(this[_0x19f97e(0x27f)][_0x19f97e(0x318)]['match'](VisuMZ['ItemCraftingSys'][_0x19f97e(0x30c)][_0x19f97e(0x120)])){if('cpgzT'===_0x19f97e(0x286))return _0x1a54b1['getInputMultiButtonStrings'](_0x19f97e(0x2a9),_0x19f97e(0x1a3));else this[_0x19f97e(0x13d)]=Math[_0x19f97e(0x304)](Number(RegExp['$1']),0x1);}this['_itemSprite'][_0x19f97e(0x27a)]=0x0;},Scene_ItemCrafting[_0x314c19(0x1dd)]['createAnimationIDs']=function(){const _0x575490=_0x314c19;this[_0x575490(0x20a)]=[],this[_0x575490(0x27f)]['note']['match'](VisuMZ[_0x575490(0x23c)][_0x575490(0x30c)][_0x575490(0x13a)])?this[_0x575490(0x20a)]=RegExp['$1']['split'](',')[_0x575490(0x32a)](_0x1fb8ef=>Number(_0x1fb8ef)):this['_animationIDs']=this[_0x575490(0x20a)][_0x575490(0x2d7)](VisuMZ[_0x575490(0x23c)][_0x575490(0x13b)][_0x575490(0x217)][_0x575490(0x1be)]);},Scene_ItemCrafting['prototype'][_0x314c19(0x167)]=function(_0x44445d){const _0x364691=_0x314c19,_0x1c3171=$dataAnimations[_0x44445d];if(!_0x1c3171)return;const _0x1e634a=this['isMVAnimation'](_0x1c3171);this[_0x364691(0x24b)]=new(_0x1e634a?Sprite_AnimationMV:Sprite_Animation)();const _0x37da95=[this['_itemSprite']],_0x304d0a=0x0;this[_0x364691(0x24b)][_0x364691(0x2a3)](_0x37da95,_0x1c3171,![],_0x304d0a,null),this[_0x364691(0x2fa)](this[_0x364691(0x24b)]);},Scene_ItemCrafting[_0x314c19(0x1dd)]['isMVAnimation']=function(_0x481324){const _0x1dd56f=_0x314c19;return!!_0x481324[_0x1dd56f(0x2fb)];},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x12c)]=function(){const _0x5e86c9=_0x314c19;if(!this[_0x5e86c9(0x27c)])return;this[_0x5e86c9(0x1ab)](),this['updateAnimationSprite']();if(this[_0x5e86c9(0x2bc)]()){if('WZBgq'!==_0x5e86c9(0x15a))this[_0x5e86c9(0x1d2)]();else return this[_0x5e86c9(0x172)]()[_0x5e86c9(0x297)](_0x128b67=>this[_0x5e86c9(0x202)](_0x128b67));}},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x1ab)]=function(){const _0x6434b2=_0x314c19;this['_itemSprite'][_0x6434b2(0x27a)]+=this['_itemSpriteOpacitySpeed'];},Scene_ItemCrafting['prototype']['updateAnimationSprite']=function(){const _0x270632=_0x314c19;if(!this[_0x270632(0x24b)])return;if(this[_0x270632(0x24b)][_0x270632(0x1b6)]())return;this[_0x270632(0x177)](),this[_0x270632(0x167)](this[_0x270632(0x20a)][_0x270632(0x145)]());},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x177)]=function(){const _0x324190=_0x314c19;if(!this[_0x324190(0x24b)])return;this['removeChild'](this[_0x324190(0x24b)]),this[_0x324190(0x24b)][_0x324190(0x2b1)](),this['_animationSprite']=undefined;},Scene_ItemCrafting[_0x314c19(0x1dd)]['destroyItemSprite']=function(){const _0x388013=_0x314c19;if(!this[_0x388013(0x2c5)])return;this[_0x388013(0x185)](this[_0x388013(0x2c5)]),this[_0x388013(0x2c5)][_0x388013(0x2b1)](),this[_0x388013(0x2c5)]=undefined;},Scene_ItemCrafting[_0x314c19(0x1dd)]['isFinishedAnimating']=function(){const _0x450275=_0x314c19;if(TouchInput[_0x450275(0x307)]())return!![];if(Input[_0x450275(0x171)]('ok'))return!![];if(Input[_0x450275(0x171)](_0x450275(0x305)))return!![];if(this[_0x450275(0x2c5)]['opacity']<0xff)return![];if(this[_0x450275(0x24b)])return![];return this['_animationWait']--<=0x0;},Scene_ItemCrafting['prototype'][_0x314c19(0x1d2)]=function(){const _0x533c2e=_0x314c19;this[_0x533c2e(0x177)](),this[_0x533c2e(0x1ed)](),this[_0x533c2e(0x175)](),TouchInput[_0x533c2e(0x12e)](),Input[_0x533c2e(0x12e)]();},Scene_ItemCrafting[_0x314c19(0x1dd)]['terminate']=function(){const _0x44859a=_0x314c19;Scene_Item[_0x44859a(0x1dd)][_0x44859a(0x2bd)][_0x44859a(0x243)](this),$gameTemp[_0x44859a(0x11f)]();},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x2dc)]=function(){const _0x4a404e=_0x314c19;if(!SceneManager[_0x4a404e(0x11a)]())return;const _0x57bae1=VisuMZ[_0x4a404e(0x23c)][_0x4a404e(0x13b)][_0x4a404e(0x140)];_0x57bae1[_0x4a404e(0xfa)]&&(_0x4a404e(0x233)!==_0x4a404e(0x233)?(_0x5c72f0[_0x4a404e(0x1dd)][_0x4a404e(0x22b)][_0x4a404e(0x243)](this),this[_0x4a404e(0x183)](),this['createNumberWindow'](),this['createIngredientSelectionTitle'](),this[_0x4a404e(0x2b5)](),this[_0x4a404e(0x294)]()&&this[_0x4a404e(0x10d)](),this['setWindowBackgroundTypes'](),this[_0x4a404e(0x2dc)]()):$gameSwitches[_0x4a404e(0x196)](_0x57bae1[_0x4a404e(0xfa)],![]));},Scene_ItemCrafting[_0x314c19(0x1dd)][_0x314c19(0x28e)]=function(){const _0x1e05ae=_0x314c19;if(!SceneManager[_0x1e05ae(0x11a)]())return;const _0x511b29=VisuMZ[_0x1e05ae(0x23c)][_0x1e05ae(0x13b)][_0x1e05ae(0x140)];_0x511b29[_0x1e05ae(0xfa)]&&$gameSwitches[_0x1e05ae(0x196)](_0x511b29[_0x1e05ae(0xfa)],!![]);},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x10e)]=Window_MenuCommand[_0x314c19(0x1dd)][_0x314c19(0x235)],Window_MenuCommand[_0x314c19(0x1dd)][_0x314c19(0x235)]=function(){const _0x2d7ad2=_0x314c19;VisuMZ['ItemCraftingSys'][_0x2d7ad2(0x10e)][_0x2d7ad2(0x243)](this),this[_0x2d7ad2(0x2c8)]();},Window_MenuCommand[_0x314c19(0x1dd)]['addItemCraftingCommand']=function(){const _0x300bce=_0x314c19;if(!this[_0x300bce(0x117)]())return;if(!this[_0x300bce(0x155)]())return;const _0xe5d13b=TextManager[_0x300bce(0x1b1)],_0x2085b2=this['isItemCraftingCommandEnabled']();this[_0x300bce(0x213)](_0xe5d13b,_0x300bce(0x211),_0x2085b2);},Window_MenuCommand[_0x314c19(0x1dd)][_0x314c19(0x117)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x314c19(0x1dd)][_0x314c19(0x155)]=function(){const _0x350a9b=_0x314c19;return $gameSystem[_0x350a9b(0x239)]();},Window_MenuCommand['prototype'][_0x314c19(0x25b)]=function(){const _0x34897d=_0x314c19;if(DataManager[_0x34897d(0x11d)]()[_0x34897d(0x23e)]<=0x0)return![];return $gameSystem[_0x34897d(0x260)]();},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x2c1)]=Window_ItemCategory[_0x314c19(0x1dd)][_0x314c19(0x2e9)],Window_ItemCategory[_0x314c19(0x1dd)][_0x314c19(0x2e9)]=function(){const _0x47c81a=_0x314c19;VisuMZ[_0x47c81a(0x23c)]['Window_ItemCategory_makeCommandList'][_0x47c81a(0x243)](this),SceneManager['isSceneItemCrafting']()&&this[_0x47c81a(0x1f9)]();},Window_ItemCategory[_0x314c19(0x1dd)][_0x314c19(0x1f9)]=function(){const _0x1f752e=_0x314c19,_0x519507=Window_ItemCategory[_0x1f752e(0x2f1)],_0x21b171=DataManager['currentCraftableItems']()[_0x1f752e(0x301)](),_0x28f0bc=[];for(const _0xd1f43a of _0x519507){this[_0x1f752e(0x16b)]=_0xd1f43a[_0x1f752e(0x31c)];for(const _0x204fb8 of _0x21b171){if(Window_ItemList[_0x1f752e(0x1dd)][_0x1f752e(0x122)][_0x1f752e(0x243)](this,_0x204fb8)){if(_0x1f752e(0x204)==='VCtMK'){if(this[_0x1f752e(0x2be)]===_0x53a81e)this[_0x1f752e(0x2b0)]();return this[_0x1f752e(0x2be)]['shown'];}else _0x28f0bc[_0x1f752e(0x119)](_0x204fb8);}}}this[_0x1f752e(0x16b)]=null;for(const _0xd6fd07 of _0x28f0bc){_0x21b171[_0x1f752e(0x26d)](_0xd6fd07);}_0x21b171[_0x1f752e(0x23e)]>0x0&&this[_0x1f752e(0x251)](),this[_0x1f752e(0x22f)]=_0x21b171;},Window_ItemCategory[_0x314c19(0x1dd)]['addUncategorizedItemCategory']=function(){const _0x40db96=_0x314c19,_0x1ee18b=VisuMZ['ItemCraftingSys'][_0x40db96(0x13b)][_0x40db96(0x140)];let _0x3b4552=_0x1ee18b[_0x40db96(0x2c9)]||'Uncategorized',_0x2c470c=_0x1ee18b[_0x40db96(0x236)]||0xa0;_0x3b4552=_0x40db96(0x276)['format'](_0x2c470c,_0x3b4552),this['addCommand'](_0x3b4552,_0x40db96(0x21b),!![],_0x40db96(0x252));},VisuMZ[_0x314c19(0x23c)]['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x314c19(0x1dd)][_0x314c19(0x102)],Window_ItemCategory[_0x314c19(0x1dd)]['addItemCategory']=function(_0x3b2936){const _0x53abfe=_0x314c19;if(SceneManager[_0x53abfe(0x11a)]()&&!this['isItemCraftingCategoryValid'](_0x3b2936))return;VisuMZ[_0x53abfe(0x23c)][_0x53abfe(0x212)]['call'](this,_0x3b2936);},Window_ItemCategory['prototype'][_0x314c19(0x1e5)]=function(_0x283976){const _0x2441f5=_0x314c19,_0x2a065d=DataManager[_0x2441f5(0x11d)](),_0x3eb83b=_0x283976['Type'],_0x1c38a8=_0x283976[_0x2441f5(0x295)];this[_0x2441f5(0x16b)]=_0x3eb83b;for(const _0x34f029 of _0x2a065d){if(_0x2441f5(0x1a6)==='LLsCJ'){if(!_0x34f029)continue;if(Window_ItemList[_0x2441f5(0x1dd)][_0x2441f5(0x122)][_0x2441f5(0x243)](this,_0x34f029))return this[_0x2441f5(0x16b)]=null,!![];}else this[_0x2441f5(0x20a)]=_0x1955b4['$1'][_0x2441f5(0x16f)](',')['map'](_0x464f36=>_0x577762(_0x464f36));}return this[_0x2441f5(0x16b)]=null,![];},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x274)]=Window_ItemCategory[_0x314c19(0x1dd)]['needsSelection'],Window_ItemCategory[_0x314c19(0x1dd)][_0x314c19(0x2e7)]=function(){const _0x3d28fd=_0x314c19;if(SceneManager['isSceneItemCrafting']())return!![];return VisuMZ[_0x3d28fd(0x23c)][_0x3d28fd(0x274)]['call'](this);};function Window_ItemCraftingList(){const _0x2791d7=_0x314c19;this[_0x2791d7(0x23a)](...arguments);}Window_ItemCraftingList[_0x314c19(0x1dd)]=Object['create'](Window_ItemList[_0x314c19(0x1dd)]),Window_ItemCraftingList[_0x314c19(0x1dd)]['constructor']=Window_ItemCraftingList,Window_ItemCraftingList[_0x314c19(0x2af)]=VisuMZ[_0x314c19(0x23c)][_0x314c19(0x13b)][_0x314c19(0x308)]['ReqQuantityFontSize'],Window_ItemCraftingList[_0x314c19(0x271)]=VisuMZ[_0x314c19(0x23c)][_0x314c19(0x13b)][_0x314c19(0x127)][_0x314c19(0x107)],Window_ItemCraftingList[_0x314c19(0x1dd)]['initialize']=function(_0x171188){const _0x42c5ca=_0x314c19;Window_ItemList[_0x42c5ca(0x1dd)]['initialize']['call'](this,_0x171188),this['createTooltipWindow']();},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x16d)]=function(){return 0x1;},Window_ItemCraftingList[_0x314c19(0x1dd)]['itemHeight']=function(){return Window_Scrollable['prototype']['itemHeight']['call'](this)*0x3+0x8;},Window_ItemCraftingList['prototype']['isEnabled']=function(_0x5b650c){return!![];},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x2e5)]=function(){const _0x48ad73=_0x314c19;this[_0x48ad73(0x1ce)]=DataManager[_0x48ad73(0x11d)]()[_0x48ad73(0x297)](_0x34a1d3=>this[_0x48ad73(0x122)](_0x34a1d3));const _0x54fc9f=this[_0x48ad73(0x1ce)][_0x48ad73(0x32a)](_0x291abe=>DataManager[_0x48ad73(0x1ae)](_0x291abe)[_0x48ad73(0x23e)]);this[_0x48ad73(0x11c)]=Math['max'](..._0x54fc9f)+0x1;},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x122)]=function(_0x20a9ec){const _0x235422=_0x314c19;if(this[_0x235422(0x16b)]===_0x235422(0x252)){if(_0x235422(0x17d)===_0x235422(0x17d)){const _0x28b7d4=SceneManager[_0x235422(0x2de)];if(_0x28b7d4&&_0x28b7d4[_0x235422(0x2e8)]&&_0x28b7d4['_categoryWindow'][_0x235422(0x22f)]){if(_0x235422(0x1f3)!==_0x235422(0x1f3))this[_0x235422(0x1cb)][_0x235422(0x142)](_0x337093[_0x235422(0x2b2)]);else return _0x28b7d4['_categoryWindow'][_0x235422(0x22f)][_0x235422(0x122)](_0x20a9ec);}}else this[_0x235422(0x23b)]();}return Window_ItemList['prototype'][_0x235422(0x122)][_0x235422(0x243)](this,_0x20a9ec);},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x25f)]=function(){},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x133)]=function(_0x1cf115){const _0x47f26a=_0x314c19,_0xd2508f=this[_0x47f26a(0xf8)](_0x1cf115);if(!_0xd2508f)return;const _0x304f8d=this[_0x47f26a(0x2e0)](_0x1cf115);this[_0x47f26a(0x12d)](),this['drawFadedItemBackground'](_0x304f8d,0x2),this[_0x47f26a(0x198)](_0x1cf115,_0xd2508f,_0x304f8d),this[_0x47f26a(0x1af)](_0xd2508f,_0x304f8d),this[_0x47f26a(0x1f5)](_0xd2508f,_0x304f8d),this[_0x47f26a(0x1c1)](_0xd2508f,_0x304f8d);},Window_ItemCraftingList[_0x314c19(0x1dd)]['drawFadedItemBackground']=function(_0x5e3c71,_0x5e86de){const _0xea5be3=_0x314c19;_0x5e86de=_0x5e86de||0x1,this['changePaintOpacity'](![]);const _0x1cbf28=ColorManager[_0xea5be3(0x20c)](),_0x4a234d=ColorManager[_0xea5be3(0x14c)](),_0x24bf85=_0x5e3c71[_0xea5be3(0x326)]/0x2,_0xa2f540=this[_0xea5be3(0x281)]();while(_0x5e86de--){this['contents'][_0xea5be3(0x18a)](_0x5e3c71['x'],_0x5e3c71['y'],_0x24bf85,_0xa2f540,_0x4a234d,_0x1cbf28),this[_0xea5be3(0x1ad)]['gradientFillRect'](_0x5e3c71['x']+_0x24bf85,_0x5e3c71['y'],_0x24bf85,_0xa2f540,_0x1cbf28,_0x4a234d);}this[_0xea5be3(0x1d1)](!![]);},Window_Base[_0x314c19(0x1dd)][_0x314c19(0x1f5)]=function(_0x10e506,_0x8608c0){const _0x4d1360=_0x314c19;let _0x46ede3=_0x10e506['name'],_0x5b2327=_0x8608c0[_0x4d1360(0x1a9)]+this[_0x4d1360(0x1eb)]()*0x2,_0x5b15e1=_0x8608c0['y'],_0x270880=_0x8608c0[_0x4d1360(0x326)]-_0x5b2327-this[_0x4d1360(0x1eb)]()-ImageManager[_0x4d1360(0x264)];DataManager[_0x4d1360(0x2ce)](_0x10e506)&&(_0x46ede3=VisuMZ[_0x4d1360(0x23c)]['maskItemName'](_0x10e506),this['contents'][_0x4d1360(0x2ff)]=Window_ItemCraftingList[_0x4d1360(0x271)]),this[_0x4d1360(0x2ee)](_0x46ede3,_0x5b2327,_0x5b15e1,_0x270880,_0x4d1360(0x2a9)),this[_0x4d1360(0x1ad)][_0x4d1360(0x2ff)]=![];},VisuMZ[_0x314c19(0x23c)][_0x314c19(0x157)]=function(_0x296764){const _0x2fa72a=_0x314c19;if(_0x296764['note']['match'](VisuMZ[_0x2fa72a(0x23c)][_0x2fa72a(0x30c)][_0x2fa72a(0x28f)]))return String(RegExp['$1']);else{const _0x4f0dcd=TextManager[_0x2fa72a(0x225)];return Array(_0x296764[_0x2fa72a(0x292)][_0x2fa72a(0x23e)]+0x1)[_0x2fa72a(0x246)](_0x4f0dcd);}},Window_ItemCraftingList[_0x314c19(0x1dd)]['drawBigItemImage']=function(_0x1cf866,_0x2f0129,_0x7f4373){const _0x7de3f5=_0x314c19,_0x48ab92=VisuMZ[_0x7de3f5(0x23c)][_0x7de3f5(0x30c)],_0x298f65=_0x2f0129[_0x7de3f5(0x318)];let _0x27a8be='';if(_0x298f65[_0x7de3f5(0x21e)](_0x48ab92[_0x7de3f5(0x1fa)])){if('gkwRj'!==_0x7de3f5(0x17f)){const _0x554f50=_0xc67342['ItemCraftingSys'][_0x7de3f5(0x13b)][_0x7de3f5(0x140)];let _0x42bb81=_0x554f50[_0x7de3f5(0x2c9)]||_0x7de3f5(0x2c9),_0x281cf5=_0x554f50['NoCategoryIcon']||0xa0;_0x42bb81=_0x7de3f5(0x276)[_0x7de3f5(0x2cf)](_0x281cf5,_0x42bb81),this['addCommand'](_0x42bb81,_0x7de3f5(0x21b),!![],_0x7de3f5(0x252));}else _0x27a8be=String(RegExp['$1']);}else _0x298f65[_0x7de3f5(0x21e)](_0x48ab92[_0x7de3f5(0x1db)])&&(_0x27a8be=String(RegExp['$1']));if(_0x27a8be){if(_0x7de3f5(0x2c6)!==_0x7de3f5(0x26f)){const _0x5ccbb4=ImageManager['loadPicture'](_0x27a8be);_0x5ccbb4[_0x7de3f5(0x19a)](this[_0x7de3f5(0x194)]['bind'](this,_0x1cf866,_0x5ccbb4));}else _0x3a9d91[_0x7de3f5(0x256)](_0x417a49[_0x7de3f5(0x23c)]['Settings']['Sound']);}else this[_0x7de3f5(0x2d6)](_0x2f0129,_0x7f4373);},Window_ItemCraftingList['prototype'][_0x314c19(0x194)]=function(_0x5b9880,_0x290ec1){const _0x3d7319=_0x314c19,_0xf7a4f2=this[_0x3d7319(0x2e0)](_0x5b9880);let _0x149e4a=_0xf7a4f2['x']+this[_0x3d7319(0x1eb)](),_0x2afc6b=_0xf7a4f2['y']+0x4,_0x2205cc=_0xf7a4f2[_0x3d7319(0x326)]-this['itemPadding']()*0x2,_0x4cf399=_0xf7a4f2[_0x3d7319(0x1a9)]-0x8,_0x56e15c=Math['min'](_0x2205cc,_0x4cf399);const _0x4a7e87=_0x56e15c/_0x290ec1[_0x3d7319(0x326)],_0x4fe077=_0x56e15c/_0x290ec1[_0x3d7319(0x1a9)],_0xdfa644=Math[_0x3d7319(0x18d)](_0x4a7e87,_0x4fe077,0x1);let _0x274c39=Math[_0x3d7319(0xf3)](_0x290ec1[_0x3d7319(0x326)]*_0xdfa644),_0x37044b=Math[_0x3d7319(0xf3)](_0x290ec1['height']*_0xdfa644);_0x149e4a+=Math[_0x3d7319(0xf3)]((_0x56e15c-_0x274c39)/0x2),_0x2afc6b+=Math[_0x3d7319(0xf3)]((_0x56e15c-_0x37044b)/0x2);const _0x2ecbe6=_0x290ec1[_0x3d7319(0x326)],_0x4f197b=_0x290ec1[_0x3d7319(0x1a9)];this['contents'][_0x3d7319(0x2f9)][_0x3d7319(0x105)]=!![],this[_0x3d7319(0x1ad)][_0x3d7319(0x100)](_0x290ec1,0x0,0x0,_0x2ecbe6,_0x4f197b,_0x149e4a,_0x2afc6b,_0x274c39,_0x37044b),this[_0x3d7319(0x1ad)]['_context'][_0x3d7319(0x105)]=!![];},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x2d6)]=function(_0x422e70,_0x1f22f8){const _0x132e3c=_0x314c19,_0x471547=_0x422e70[_0x132e3c(0x2d5)];let _0x4b5cf7=_0x1f22f8['x']+this[_0x132e3c(0x1eb)](),_0x24a6dc=_0x1f22f8['y']+0x4,_0x3aa39d=_0x1f22f8[_0x132e3c(0x326)]-this[_0x132e3c(0x1eb)]()*0x2,_0x49ade8=_0x1f22f8[_0x132e3c(0x1a9)]-0x8,_0x33f3fb=Math[_0x132e3c(0x18d)](_0x3aa39d,_0x49ade8);_0x33f3fb=Math[_0x132e3c(0x29a)](_0x33f3fb/ImageManager['iconWidth'])*ImageManager['iconWidth'],_0x24a6dc+=(_0x49ade8-_0x33f3fb)/0x2;const _0x395743=ImageManager[_0x132e3c(0x230)](_0x132e3c(0x21d)),_0x389b0a=ImageManager[_0x132e3c(0x264)],_0xfd9f5c=ImageManager[_0x132e3c(0xfb)],_0x493369=_0x471547%0x10*_0x389b0a,_0x48312e=Math[_0x132e3c(0x29a)](_0x471547/0x10)*_0xfd9f5c;this[_0x132e3c(0x1ad)][_0x132e3c(0x2f9)][_0x132e3c(0x105)]=![],this['contents'][_0x132e3c(0x100)](_0x395743,_0x493369,_0x48312e,_0x389b0a,_0xfd9f5c,_0x4b5cf7,_0x24a6dc,_0x33f3fb,_0x33f3fb),this[_0x132e3c(0x1ad)][_0x132e3c(0x2f9)][_0x132e3c(0x105)]=!![];},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x1af)]=function(_0x4ff454,_0x20f8ee){const _0x4db9a3=_0x314c19;if(!$gameSystem[_0x4db9a3(0x226)](_0x4ff454))return;const _0x5be04e=ImageManager['itemCraftedIcon'];let _0x42c318=_0x20f8ee['x']+_0x20f8ee['width']-ImageManager[_0x4db9a3(0x264)],_0x176f46=_0x20f8ee['y']+0x2;this['drawIcon'](_0x5be04e,_0x42c318,_0x176f46);},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x1c1)]=function(_0x33c022,_0x4524c0){const _0x3e738f=_0x314c19,_0x314bac=DataManager[_0x3e738f(0x1ae)](_0x33c022);let _0x38f995=_0x4524c0['height']+this['itemPadding']()*0x2,_0x3fb442=_0x4524c0['y']+Math[_0x3e738f(0xf3)](this[_0x3e738f(0x281)]()*1.2),_0x178d7f=_0x4524c0['width']-_0x38f995-this[_0x3e738f(0x1eb)](),_0x2924bd=Math[_0x3e738f(0x29a)](_0x178d7f/this['_maxIngredientsSize']),_0x55a62e=!![];for(const _0x3a3d29 of _0x314bac){if(!_0x55a62e){if('pKDDi'!==_0x3e738f(0x186)){let _0xb1e0d6=TextManager[_0x3e738f(0x247)],_0x90c800=_0x4524c0['y']+(_0x4524c0[_0x3e738f(0x1a9)]-this[_0x3e738f(0x281)]()*1.5);this[_0x3e738f(0x2ee)](_0xb1e0d6,_0x38f995,_0x90c800,_0x2924bd,_0x3e738f(0x1da));}else this[_0x3e738f(0x27f)]=this[_0x3e738f(0x1cb)][_0x3e738f(0x26b)](),this[_0x3e738f(0x1cb)][_0x3e738f(0x1b2)](),this[_0x3e738f(0x25d)](),this[_0x3e738f(0x2e4)]()?this[_0x3e738f(0x23b)]():this[_0x3e738f(0x245)]();}_0x38f995+=_0x2924bd;const _0x346f37=_0x3a3d29[0x0],_0xf3f46f=_0x3a3d29[0x1],_0x258f34=_0x346f37===_0x3e738f(0xf6)?$gameParty['gold']():$gameParty[_0x3e738f(0x2c3)](_0x346f37);if(_0x346f37===_0x3e738f(0xf6))this[_0x3e738f(0x156)](_0xf3f46f,_0x258f34,_0x38f995,_0x3fb442,_0x2924bd);else{if(typeof _0x346f37==='string'&&_0x346f37['match'](/CATEGORY/i)){if('TVxxW'==='efMrp'){if(this[_0x3e738f(0x192)]&&this[_0x3e738f(0x192)][_0x3e738f(0x195)])return _0x23b575['ItemsEquipsCore'][_0x3e738f(0x13b)]['ShopScene'][_0x3e738f(0x254)];return _0x1f4311[_0x3e738f(0x1dd)]['buttonAssistText2'][_0x3e738f(0x243)](this);}else this['drawIngredientCategory'](_0x346f37,_0xf3f46f,_0x38f995,_0x3fb442,_0x2924bd);}else{if(_0x3e738f(0xf9)!==_0x3e738f(0xf9)){if(!_0x3ad9fb)return![];if(this['_itemsCrafted']===_0x5e727e)this['initItemCraftingSys']();let _0x3e288f={};if(_0xbc37dd[_0x3e738f(0x26e)](_0x571f7c))_0x3e288f=this[_0x3e738f(0x25e)][_0x3e738f(0x1f8)];if(_0xc4d5a8['isWeapon'](_0x1b2a21))_0x3e288f=this['_itemsCrafted'][_0x3e738f(0x1f1)];if(_0xc0811a[_0x3e738f(0x30a)](_0x294a1d))_0x3e288f=this['_itemsCrafted'][_0x3e738f(0x30d)];return _0x3e288f[_0x59a15b['id']]||0x0;}else this[_0x3e738f(0x187)](_0x346f37,_0xf3f46f,_0x258f34,_0x38f995,_0x3fb442,_0x2924bd);}}this['resetFontSettings'](),_0x55a62e=![];}},Window_ItemCraftingList[_0x314c19(0x1dd)]['drawIngredientGold']=function(_0x3941a5,_0x187055,_0x3adba4,_0x2d406a,_0xf11d3d){const _0x454572=_0x314c19;if(Imported[_0x454572(0x2ed)]){let _0x8d340c=_0x3adba4-Math[_0x454572(0xf3)](ImageManager[_0x454572(0x264)]/0x2),_0xffd735=_0x2d406a+Math[_0x454572(0xf3)]((this[_0x454572(0x281)]()-ImageManager[_0x454572(0xfb)])/0x2);const _0x3196ba=VisuMZ['CoreEngine'][_0x454572(0x13b)][_0x454572(0x296)][_0x454572(0x229)];this[_0x454572(0x1e4)](_0x3196ba,_0x8d340c,_0xffd735);}else{if(_0x454572(0x309)!==_0x454572(0x309)){_0x53bebb=_0xc83bce||0x1,this[_0x454572(0x1d1)](![]);const _0x2fd170=_0x82c584[_0x454572(0x20c)](),_0x11e36e=_0x244a48[_0x454572(0x14c)](),_0xea06b0=_0x33b122[_0x454572(0x326)]/0x2,_0x15e119=this[_0x454572(0x281)]();while(_0x405cff--){this[_0x454572(0x1ad)][_0x454572(0x18a)](_0x72adfb['x'],_0x8447b0['y'],_0xea06b0,_0x15e119,_0x11e36e,_0x2fd170),this[_0x454572(0x1ad)][_0x454572(0x18a)](_0xc18095['x']+_0xea06b0,_0x3b0900['y'],_0xea06b0,_0x15e119,_0x2fd170,_0x11e36e);}this['changePaintOpacity'](!![]);}else{let _0x5eb13b=_0x3adba4-Math[_0x454572(0xf3)](_0xf11d3d/0x2),_0x5663a=_0x2d406a+Math['round']((this[_0x454572(0x281)]()-ImageManager[_0x454572(0xfb)])/0x2);this['changeTextColor'](ColorManager[_0x454572(0x23f)]()),this[_0x454572(0x2e6)](),this[_0x454572(0x2ee)](TextManager[_0x454572(0x328)],_0x5eb13b,_0x5663a,_0xf11d3d,'center'),this['resetFontSettings']();}}let _0x552624=_0x3adba4-Math[_0x454572(0xf3)](_0xf11d3d/0x2),_0x5cb692=_0x2d406a+this[_0x454572(0x281)]();const _0x55f5cf=VisuMZ[_0x454572(0x1f0)][_0x454572(0x13b)][_0x454572(0x258)][_0x454572(0x2ef)];let _0x4f5091=_0x55f5cf[_0x454572(0x2cf)](_0x3941a5);_0x3941a5>_0x187055&&this[_0x454572(0x2a1)](ColorManager[_0x454572(0x2c2)]()),this[_0x454572(0x1ad)][_0x454572(0x2c0)]=Window_ItemCraftingList['quantityFontSize'],this[_0x454572(0x2ee)](_0x4f5091,_0x552624,_0x5cb692,_0xf11d3d,_0x454572(0x1da));},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x149)]=function(_0x1e0790,_0x131f11,_0x94ae54,_0x3d6270,_0x53b55b){const _0x345bb1=_0x314c19,_0x1e3318=VisuMZ[_0x345bb1(0x23c)][_0x345bb1(0x13b)][_0x345bb1(0x140)];let _0x7b0587=_0x94ae54-Math[_0x345bb1(0xf3)](ImageManager[_0x345bb1(0x264)]/0x2),_0xe20ccd=_0x3d6270+Math[_0x345bb1(0xf3)]((this['lineHeight']()-ImageManager[_0x345bb1(0xfb)])/0x2);this[_0x345bb1(0x1e4)](_0x1e3318[_0x345bb1(0x12b)],_0x7b0587,_0xe20ccd),_0x1e0790[_0x345bb1(0x21e)](/CATEGORY: (.*)/i);const _0x141b8d=String(RegExp['$1'])['trim']();let _0x258856=_0x94ae54-Math[_0x345bb1(0xf3)](_0x53b55b/0x2),_0x15e250=_0x3d6270;this[_0x345bb1(0x1ad)][_0x345bb1(0x2c0)]=Window_ItemCraftingList['quantityFontSize'],this['drawText'](_0x141b8d,_0x258856,_0x15e250,_0x53b55b,_0x345bb1(0x1da));let _0x249660=_0x94ae54-Math['round'](_0x53b55b/0x2),_0x3ef09b=_0x3d6270+this[_0x345bb1(0x281)]();const _0x3f3944=VisuMZ[_0x345bb1(0x1f0)][_0x345bb1(0x13b)][_0x345bb1(0x258)][_0x345bb1(0x2ef)];let _0x2aa7ee=_0x3f3944[_0x345bb1(0x2cf)](_0x131f11);this['contents'][_0x345bb1(0x2c0)]=Window_ItemCraftingList[_0x345bb1(0x2af)],this[_0x345bb1(0x2ee)](_0x2aa7ee,_0x249660,_0x3ef09b,_0x53b55b,_0x345bb1(0x1da));},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x187)]=function(_0x25776c,_0x5ea201,_0x4229e5,_0x4c915c,_0x2dc189,_0x4a4aa6){const _0x558084=_0x314c19;let _0x42f1a1=_0x4c915c-Math[_0x558084(0xf3)](ImageManager[_0x558084(0x264)]/0x2),_0x3a015d=_0x2dc189+Math[_0x558084(0xf3)]((this['lineHeight']()-ImageManager[_0x558084(0xfb)])/0x2);this[_0x558084(0x1e4)](_0x25776c[_0x558084(0x2d5)],_0x42f1a1,_0x3a015d);let _0x481811=_0x4c915c-Math['round'](_0x4a4aa6/0x2),_0x2f8de7=_0x2dc189+this[_0x558084(0x281)]();const _0x214a75=VisuMZ['ItemsEquipsCore']['Settings'][_0x558084(0x258)][_0x558084(0x2ef)];let _0x13111a=_0x214a75[_0x558084(0x2cf)](_0x558084(0x280)[_0x558084(0x2cf)](_0x4229e5,_0x5ea201));if(_0x5ea201>_0x4229e5){if('MKTox'==='MKTox')this['changeTextColor'](ColorManager[_0x558084(0x2c2)]());else return this['_scene']&&this['_scene'][_0x558084(0x267)]===_0x32260b;}this[_0x558084(0x1ad)]['fontSize']=Window_ItemCraftingList[_0x558084(0x2af)],this[_0x558084(0x2ee)](_0x13111a,_0x481811,_0x2f8de7,_0x4a4aa6,_0x558084(0x1da));},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x32b)]=function(){const _0xba04ed=_0x314c19;if(!VisuMZ[_0xba04ed(0x23c)][_0xba04ed(0x13b)][_0xba04ed(0x308)][_0xba04ed(0x275)])return;const _0x48fde2=new Rectangle(0x0,0x0,Graphics[_0xba04ed(0x26a)],Window_Base['prototype'][_0xba04ed(0x29b)](0x1));this[_0xba04ed(0x125)]=new Window_ItemCraftingTooltip(_0x48fde2),this[_0xba04ed(0x2fa)](this[_0xba04ed(0x125)]);},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x1fb)]=function(){const _0x4893fd=_0x314c19;Window_ItemList['prototype']['update'][_0x4893fd(0x243)](this),this['updateTooltipWindow']();},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x25c)]=function(){const _0x1edee1=_0x314c19;if(!this[_0x1edee1(0x125)])return;if(this[_0x1edee1(0x2ec)]()){if('GHUNs'!=='GHUNs')return _0x26fe86['prototype'][_0x1edee1(0x16a)][_0x1edee1(0x243)](this);else this['setTooltipWindowText']();}else{if(_0x1edee1(0x1de)!==_0x1edee1(0x2bb))this[_0x1edee1(0x125)][_0x1edee1(0x278)]('');else{if(!this[_0x1edee1(0x117)]())return;if(!this['isItemCraftingCommandVisible']())return;const _0x425440=_0x24406a[_0x1edee1(0x1b1)],_0x5d1123=this[_0x1edee1(0x25b)]();this['addCommand'](_0x425440,'itemCrafting',_0x5d1123);}}const _0xe524a7=new Point(TouchInput['x'],TouchInput['y']),_0x418102=this[_0x1edee1(0x26c)][_0x1edee1(0x1b7)](_0xe524a7);this['_tooltipWindow']['x']=_0x418102['x']-this[_0x1edee1(0x125)][_0x1edee1(0x326)]/0x2,this[_0x1edee1(0x125)]['y']=_0x418102['y']-this[_0x1edee1(0x125)]['height'];},Window_ItemCraftingList['prototype']['tooltipFrameCheckRequirements']=function(){const _0x16df57=_0x314c19;if(!this[_0x16df57(0x195)])return![];if(!this[_0x16df57(0x26b)]())return![];if(!this[_0x16df57(0x1b5)]())return![];if(this[_0x16df57(0x285)]()!==this[_0x16df57(0x1f7)]())return![];return!![];},Window_ItemCraftingList[_0x314c19(0x1dd)]['setTooltipWindowText']=function(){const _0x38302a=_0x314c19,_0x1a326e=this[_0x38302a(0x2e0)](this[_0x38302a(0x1f7)]()),_0x1c003d=DataManager['getCraftingIngredients'](this[_0x38302a(0x26b)]()),_0x59fbde=new Point(TouchInput['x'],TouchInput['y']),_0xe878a9=this[_0x38302a(0x26c)][_0x38302a(0x1b7)](_0x59fbde);let _0x439cbc=_0x1a326e[_0x38302a(0x1a9)]+this['itemPadding']()*0x2,_0x391e45=_0x1a326e['y']+this[_0x38302a(0x281)](),_0x2fbef3=_0x1a326e[_0x38302a(0x326)]-_0x439cbc-this[_0x38302a(0x1eb)](),_0x2c490e=Math[_0x38302a(0x29a)](_0x2fbef3/this[_0x38302a(0x11c)]);for(const _0x29ba39 of _0x1c003d){_0x439cbc+=_0x2c490e;const _0x86a103=new Rectangle(_0x439cbc-ImageManager[_0x38302a(0x264)],0x0,ImageManager['iconWidth']*0x2,Graphics[_0x38302a(0x2f4)]);if(_0x86a103[_0x38302a(0x1f6)](_0xe878a9['x'],_0xe878a9['y'])){let _0x326e24=_0x29ba39[0x0],_0x36f54f='';if(_0x326e24===_0x38302a(0xf6))_0x36f54f=TextManager['currencyUnit'];else typeof _0x326e24===_0x38302a(0x103)&&_0x326e24['match'](/CATEGORY/i)?_0x38302a(0x1c0)!==_0x38302a(0x2e1)?(_0x326e24[_0x38302a(0x21e)](/CATEGORY: (.*)/i),_0x36f54f=String(RegExp['$1'])[_0x38302a(0x1c7)]()):_0x54250d[_0x38302a(0x196)](_0x512574[_0x38302a(0xfa)],!![]):_0x36f54f=_0x326e24['name'];this[_0x38302a(0x125)][_0x38302a(0x278)](_0x36f54f[_0x38302a(0x1c7)]());return;}}this[_0x38302a(0x125)][_0x38302a(0x278)]('');},Window_ItemCraftingList[_0x314c19(0x1dd)][_0x314c19(0x2a2)]=function(){const _0x52c33f=_0x314c19,_0x9d07fa=this[_0x52c33f(0x26b)]()&&DataManager[_0x52c33f(0x2ce)](this['item']())?null:this[_0x52c33f(0x26b)]();this[_0x52c33f(0x184)](_0x9d07fa),this[_0x52c33f(0x282)]&&this[_0x52c33f(0x282)][_0x52c33f(0x267)]===Window_ShopStatus&&this[_0x52c33f(0x282)][_0x52c33f(0x121)](_0x9d07fa);};function Window_ItemCraftingTooltip(){const _0x3cb8e6=_0x314c19;this[_0x3cb8e6(0x23a)](...arguments);}Window_ItemCraftingTooltip[_0x314c19(0x1dd)]=Object[_0x314c19(0x22b)](Window_Base[_0x314c19(0x1dd)]),Window_ItemCraftingTooltip[_0x314c19(0x1dd)][_0x314c19(0x267)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip['tooltipSkin']=VisuMZ[_0x314c19(0x23c)]['Settings'][_0x314c19(0x308)][_0x314c19(0x292)],Window_ItemCraftingTooltip[_0x314c19(0x1dd)][_0x314c19(0x23a)]=function(_0x222b92){const _0x1b6550=_0x314c19;Window_Base[_0x1b6550(0x1dd)][_0x1b6550(0x23a)][_0x1b6550(0x243)](this,_0x222b92),this[_0x1b6550(0x142)](this[_0x1b6550(0x2ae)]()?0x0:0x2),this[_0x1b6550(0x278)]('');},Window_ItemCraftingTooltip[_0x314c19(0x1dd)]['hasCustomWindowSkin']=function(){return Window_ItemCraftingTooltip['tooltipSkin']!=='';},Window_ItemCraftingTooltip[_0x314c19(0x1dd)][_0x314c19(0x2df)]=function(){const _0x3353ee=_0x314c19;Window_ItemCraftingTooltip['tooltipSkin']!==''?this[_0x3353ee(0x2ab)]=ImageManager[_0x3353ee(0x230)](Window_ItemCraftingTooltip[_0x3353ee(0x17a)]):Window_Base['prototype'][_0x3353ee(0x2df)][_0x3353ee(0x243)](this);},Window_ItemCraftingTooltip['prototype']['setText']=function(_0x5cda82){const _0x5c9184=_0x314c19;this['_text']!==_0x5cda82&&(_0x5c9184(0x1fd)==='oBAql'?(_0x3fce68[_0x5c9184(0x23c)][_0x5c9184(0x19c)][_0x5c9184(0x243)](this,_0x440e73),_0x3c25b4['ItemCraftingSys']['Parse_Notetags_CreateJS'](_0x20e21b)):(this[_0x5c9184(0x14a)]=_0x5cda82,this[_0x5c9184(0x325)]()));},Window_ItemCraftingTooltip[_0x314c19(0x1dd)][_0x314c19(0x12e)]=function(){const _0x23a055=_0x314c19;this[_0x23a055(0x278)]('');},Window_ItemCraftingTooltip[_0x314c19(0x1dd)][_0x314c19(0x121)]=function(_0x1f9790){this['setText'](_0x1f9790?_0x1f9790['name']:'');},Window_ItemCraftingTooltip['prototype'][_0x314c19(0x325)]=function(){const _0x2108d2=_0x314c19,_0x2971ba=this[_0x2108d2(0x191)]();this[_0x2108d2(0x321)](),this['drawText'](this[_0x2108d2(0x14a)],0x0,0x0,this[_0x2108d2(0x248)],_0x2108d2(0x1da));},Window_ItemCraftingTooltip[_0x314c19(0x1dd)]['drawTooltipBackground']=function(){const _0x42b8ac=_0x314c19;if(this[_0x42b8ac(0x14a)]==='')this['contents'][_0x42b8ac(0x12e)](),this[_0x42b8ac(0x326)]=0x0;else{let _0x286c99=this[_0x42b8ac(0x324)](this[_0x42b8ac(0x14a)])+this[_0x42b8ac(0x1eb)]()*0x4;this[_0x42b8ac(0x326)]=_0x286c99+$gameSystem[_0x42b8ac(0x1ec)]()*0x2,this['createContents']();if(this['hasCustomWindowSkin']())return;const _0x178b5d=ColorManager[_0x42b8ac(0x20c)]();this[_0x42b8ac(0x1ad)][_0x42b8ac(0x2ac)](0x0,0x0,this[_0x42b8ac(0x248)],this[_0x42b8ac(0x1b8)],_0x178b5d);}};function Window_ItemCraftingNumber(){this['initialize'](...arguments);}Window_ItemCraftingNumber['prototype']=Object[_0x314c19(0x22b)](Window_ShopNumber[_0x314c19(0x1dd)]),Window_ItemCraftingNumber[_0x314c19(0x1dd)]['constructor']=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x23a)]=function(_0x45476e){const _0x45b1e3=_0x314c19;Window_ShopNumber[_0x45b1e3(0x1dd)]['initialize'][_0x45b1e3(0x243)](this,_0x45476e);},Window_ItemCraftingNumber[_0x314c19(0x1dd)]['setup']=function(_0x458e50){const _0x513de4=_0x314c19;this['_item']=_0x458e50,this[_0x513de4(0x20f)]=this[_0x513de4(0x1cd)](),this[_0x513de4(0x1a7)]=Math[_0x513de4(0x18d)](0x1,this['_max']),this[_0x513de4(0x1c3)](),this[_0x513de4(0x325)]();},Window_ItemCraftingNumber['prototype']['determineMax']=function(){const _0x4e9254=_0x314c19,_0x14aa42=[],_0x3782e4=this[_0x4e9254(0x27f)],_0x4a1414=DataManager[_0x4e9254(0x1ae)](_0x3782e4);let _0x59e0d0=0x0;for(const _0xa05302 of _0x4a1414){if(!_0xa05302)continue;let _0x56284f=_0xa05302[0x0];const _0x2451cb=_0xa05302[0x1];if(_0x56284f===_0x4e9254(0xf6))_0x14aa42[_0x4e9254(0x119)](Math[_0x4e9254(0x29a)]($gameParty['gold']()/_0x2451cb));else{if(_0x4e9254(0x18c)==='XdCJZ'){if(_0x26eb53[_0x4e9254(0x1a8)](_0x5d3385))return!![];}else{if(typeof _0x56284f===_0x4e9254(0x103)&&_0x56284f[_0x4e9254(0x21e)](/CATEGORY/i)){if(_0x4e9254(0x118)!==_0x4e9254(0x118))return this[_0x4e9254(0x19b)]();else _0x56284f=SceneManager[_0x4e9254(0x2de)][_0x4e9254(0x240)][_0x59e0d0],_0x59e0d0+=0x1;}_0x14aa42['push'](Math[_0x4e9254(0x29a)]($gameParty[_0x4e9254(0x2c3)](_0x56284f)/_0x2451cb));}}}if(_0x14aa42[_0x4e9254(0x23e)]<=0x0)_0x14aa42[_0x4e9254(0x119)](0x0);return _0x14aa42[_0x4e9254(0x119)]($gameParty[_0x4e9254(0x2bf)](_0x3782e4)-$gameParty['numItems'](_0x3782e4)),Math[_0x4e9254(0x18d)](..._0x14aa42);},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x325)]=function(){const _0x210898=_0x314c19;Window_Selectable[_0x210898(0x1dd)][_0x210898(0x325)][_0x210898(0x243)](this),this[_0x210898(0x28b)](),this[_0x210898(0x21c)](0x0),this[_0x210898(0x241)](),this[_0x210898(0x2aa)](),this[_0x210898(0x10f)](),this[_0x210898(0x148)](),this[_0x210898(0x2cb)]();},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x28b)]=function(){const _0xe4727a=_0x314c19,_0x9d6852=this[_0xe4727a(0x231)][0x4];if(!_0x9d6852)return;this['isOkEnabled']()?_0x9d6852[_0xe4727a(0x197)](this['onButtonOk'][_0xe4727a(0xf5)](this)):_0xe4727a(0x200)===_0xe4727a(0xf4)?_0x59e83c['prototype'][_0xe4727a(0x10f)][_0xe4727a(0x243)](this):_0x9d6852[_0xe4727a(0x272)]=null;},Window_ItemCraftingNumber[_0x314c19(0x1dd)]['itemNameY']=function(){const _0x41e800=_0x314c19;return Math[_0x41e800(0x29a)](this[_0x41e800(0x144)]()+this[_0x41e800(0x281)]()*0x2);},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x144)]=function(){const _0x4beea9=_0x314c19;return Math['floor'](this[_0x4beea9(0x1b8)]-this[_0x4beea9(0x281)]()*6.5);},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x2fd)]=function(){const _0x40e3b5=_0x314c19;return Math['floor'](this[_0x40e3b5(0x29d)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber['prototype'][_0x314c19(0x241)]=function(){const _0x15cec2=_0x314c19,_0x38a77d=DataManager[_0x15cec2(0x1ae)](this[_0x15cec2(0x27f)]),_0x127b90=this['itemPadding'](),_0x114325=_0x127b90*0x2;let _0xcdc324=this[_0x15cec2(0x144)]();_0xcdc324-=this[_0x15cec2(0x281)]()*_0x38a77d['length'];const _0x431609=this[_0x15cec2(0x248)]-_0x114325-_0x127b90*0x2;let _0x183b25=0x0;for(const _0x223a14 of _0x38a77d){_0xcdc324+=this[_0x15cec2(0x281)]();if(!_0x223a14)continue;let _0x2cab8e=_0x223a14[0x0];const _0x2f1363=_0x223a14[0x1]*(this[_0x15cec2(0x1a7)]||0x1);if(_0x2cab8e==='gold')_0x15cec2(0x1e0)!==_0x15cec2(0x1e0)?(_0x56c60f['ConvertParams'](_0x2f30a6,_0x47fa66),_0x19c38d[_0x15cec2(0x317)](_0x15b599['Show'])):Imported[_0x15cec2(0x2ed)]?this[_0x15cec2(0x2b8)](_0x2f1363,_0x114325,_0xcdc324,_0x431609):this[_0x15cec2(0x114)](_0x2f1363,TextManager[_0x15cec2(0x328)],0x0,_0xcdc324,_0x431609+_0x127b90*0x2);else{if(_0x15cec2(0x1f2)===_0x15cec2(0x2ad)){if(!_0x548cca[_0x15cec2(0x11a)]())return;const _0xa741d2=_0x3f3cc0['ItemCraftingSys'][_0x15cec2(0x13b)][_0x15cec2(0x140)];_0xa741d2['SwitchCraft']&&_0x3c263b['setValue'](_0xa741d2[_0x15cec2(0xfa)],!![]);}else{typeof _0x2cab8e===_0x15cec2(0x103)&&_0x2cab8e[_0x15cec2(0x21e)](/CATEGORY/i)&&(_0x2cab8e=SceneManager[_0x15cec2(0x2de)]['_ingredientsList'][_0x183b25],_0x183b25+=0x1);this[_0x15cec2(0x2c4)](_0x2cab8e,_0x114325,_0xcdc324,_0x431609),this[_0x15cec2(0x2ee)](_0x2f1363,_0x114325,_0xcdc324,_0x431609-_0x127b90,_0x15cec2(0x1a3));const _0x2c7b76=this['multiplicationSign'](),_0x465685=this['textWidth'](_0x2c7b76),_0x52e62a=this[_0x15cec2(0x28c)]();this[_0x15cec2(0x132)](),this[_0x15cec2(0x2ee)](_0x2c7b76,_0x52e62a,_0xcdc324,_0x465685);}}}},Window_ItemCraftingNumber[_0x314c19(0x1dd)]['drawTotalGold']=function(_0x1497e3,_0x264caa,_0xc193c5,_0x1dea32){const _0x416dc3=_0x314c19;this[_0x416dc3(0x12d)](),this[_0x416dc3(0x1ad)][_0x416dc3(0x2c0)]=VisuMZ[_0x416dc3(0x242)][_0x416dc3(0x13b)]['Gold'][_0x416dc3(0x23d)];const _0x1fd00b=VisuMZ[_0x416dc3(0x242)]['Settings'][_0x416dc3(0x296)][_0x416dc3(0x229)];if(_0x1fd00b>0x0){const _0x403f0e=_0xc193c5+(this[_0x416dc3(0x281)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x1fd00b,_0x264caa,_0x403f0e);const _0x3de9a3=ImageManager[_0x416dc3(0x264)]+0x4;_0x264caa+=_0x3de9a3,_0x1dea32-=_0x3de9a3;}this['changeTextColor'](ColorManager[_0x416dc3(0x23f)]()),this[_0x416dc3(0x2ee)](TextManager[_0x416dc3(0x328)],_0x264caa,_0xc193c5,_0x1dea32,_0x416dc3(0x2a9)),this['resetTextColor']();const _0x278800=VisuMZ['ItemsEquipsCore'][_0x416dc3(0x13b)][_0x416dc3(0x258)][_0x416dc3(0x2ef)],_0x55eaf5=_0x278800[_0x416dc3(0x2cf)](_0x1497e3),_0x93406=this[_0x416dc3(0x324)](this['_digitGrouping']?VisuMZ['GroupDigits'](_0x55eaf5):_0x55eaf5);_0x1dea32-=this['itemPadding']();if(_0x93406>_0x1dea32)_0x416dc3(0x31d)!==_0x416dc3(0x31d)?(_0x401585[_0x416dc3(0x23c)]['Window_ItemCategory_makeCommandList'][_0x416dc3(0x243)](this),_0x572c9a[_0x416dc3(0x11a)]()&&this['createUncategorizedItemCategory']()):this['drawText'](VisuMZ['CoreEngine'][_0x416dc3(0x13b)][_0x416dc3(0x296)][_0x416dc3(0x17e)],_0x264caa,_0xc193c5,_0x1dea32,_0x416dc3(0x1a3));else Imported[_0x416dc3(0x1a5)]?this['drawCurrencyValue'](_0x1497e3,TextManager[_0x416dc3(0x328)],_0x264caa,_0xc193c5,_0x1dea32):this[_0x416dc3(0x2ee)](_0x55eaf5,_0x264caa,_0xc193c5,_0x1dea32,_0x416dc3(0x1a3));this[_0x416dc3(0x12d)]();},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x10f)]=function(){const _0x4e456a=_0x314c19;DataManager[_0x4e456a(0x2ce)](this[_0x4e456a(0x27f)])?this['drawCurrentItemNameMasked']():Window_ShopNumber['prototype'][_0x4e456a(0x10f)]['call'](this);},Window_ItemCraftingNumber['prototype'][_0x314c19(0x22e)]=function(){const _0x29544c=_0x314c19,_0x4fdefe=this['itemPadding']();let _0x4989fc=_0x4fdefe*0x2;const _0x25c5d3=this[_0x29544c(0x29d)](),_0x42ca9d=_0x25c5d3+(this[_0x29544c(0x281)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](this[_0x29544c(0x27f)]['iconIndex'],_0x4989fc,_0x42ca9d),_0x4989fc+=ImageManager[_0x29544c(0x264)]+0x4;let _0x109d8c=this[_0x29544c(0x28c)]()-_0x4fdefe*0x3;_0x109d8c-=ImageManager[_0x29544c(0x264)]+0x4;const _0x4dea56=new Rectangle(_0x4989fc,_0x25c5d3,_0x109d8c,this[_0x29544c(0x281)]());this['drawCraftingItemName'](this[_0x29544c(0x27f)],_0x4dea56);},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x19b)]=function(){const _0x38294c=_0x314c19;if((this[_0x38294c(0x1a7)]||0x0)<=0x0)return![];return Window_ShopNumber[_0x38294c(0x1dd)][_0x38294c(0x19b)][_0x38294c(0x243)](this);},Window_ItemCraftingNumber[_0x314c19(0x1dd)][_0x314c19(0x249)]=function(){return this['isOkEnabled']();};function Window_ItemCraftingIngredient(){const _0x581a31=_0x314c19;this[_0x581a31(0x23a)](...arguments);}Window_ItemCraftingIngredient['prototype']=Object[_0x314c19(0x22b)](Window_ItemList[_0x314c19(0x1dd)]),Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x267)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x23a)]=function(_0x31859e){const _0x2b2f84=_0x314c19;Window_Selectable[_0x2b2f84(0x1dd)][_0x2b2f84(0x23a)][_0x2b2f84(0x243)](this,_0x31859e),this[_0x2b2f84(0x154)]=0x0;},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x237)]=function(){return![];},Window_ItemCraftingIngredient[_0x314c19(0x1dd)]['setup']=function(_0x1154d6,_0x42b4ce){const _0x66ade4=_0x314c19;this[_0x66ade4(0x16b)]=_0x1154d6,this[_0x66ade4(0x154)]=_0x42b4ce||0x1,this[_0x66ade4(0x325)](),this['scrollTo'](0x0,0x0),this['activate'](),this['smoothSelect'](0x0);},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x2e5)]=function(){const _0x1488be=_0x314c19;this['_data']=$gameParty['allItems']()[_0x1488be(0x297)](_0x3e7001=>this['includes'](_0x3e7001));},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x122)]=function(_0x1d1be8){const _0xb02b24=_0x314c19;if(!_0x1d1be8)return![];if(_0x1d1be8===SceneManager[_0xb02b24(0x2de)][_0xb02b24(0x27f)])return![];return _0x1d1be8[_0xb02b24(0x15d)][_0xb02b24(0x122)](this[_0xb02b24(0x16b)][_0xb02b24(0x169)]()['trim']());},Window_ItemCraftingIngredient[_0x314c19(0x1dd)]['isEnabled']=function(_0x2666c1){const _0x1103bc=_0x314c19;if(!_0x2666c1)return![];if(this[_0x1103bc(0x320)]()[_0x1103bc(0x122)](_0x2666c1))return![];return $gameParty[_0x1103bc(0x2c3)](_0x2666c1)>=this['_amount'];},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x320)]=function(){const _0x99c6fd=_0x314c19,_0x401a9c=[],_0x4ec34c=DataManager[_0x99c6fd(0x1ae)](SceneManager['_scene']['_item']);for(const _0x1f2edb of _0x4ec34c){if(!_0x1f2edb)continue;const _0x27d52b=_0x1f2edb[0x0];(DataManager[_0x99c6fd(0x26e)](_0x27d52b)||DataManager[_0x99c6fd(0x108)](_0x27d52b)||DataManager[_0x99c6fd(0x30a)](_0x27d52b))&&_0x401a9c[_0x99c6fd(0x119)](_0x27d52b);}return _0x401a9c['concat'](SceneManager[_0x99c6fd(0x2de)][_0x99c6fd(0x240)]);},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x2c4)]=function(_0x5322fc,_0x3b8c36,_0x5613c8,_0x19db67){const _0x5a7414=_0x314c19;_0x5322fc&&this['selectedIngredientList']()[_0x5a7414(0x122)](_0x5322fc)&&(this[_0x5a7414(0x18e)]=!![]),Window_ItemList['prototype'][_0x5a7414(0x2c4)][_0x5a7414(0x243)](this,_0x5322fc,_0x3b8c36,_0x5613c8,_0x19db67),this[_0x5a7414(0x18e)]=![];},Window_ItemCraftingIngredient[_0x314c19(0x1dd)][_0x314c19(0x2ee)]=function(_0x4facd4,_0x4f2022,_0x4147bb,_0x3547bb,_0x249525){const _0x52a6f9=_0x314c19;if(this[_0x52a6f9(0x18e)]){const _0x5e9622=VisuMZ['ItemCraftingSys'][_0x52a6f9(0x13b)][_0x52a6f9(0x140)];this['contents'][_0x52a6f9(0x2cd)]=ColorManager[_0x52a6f9(0x262)](_0x5e9622['SelectedColor']),_0x4facd4+=_0x5e9622[_0x52a6f9(0x137)];}Window_Base[_0x52a6f9(0x1dd)][_0x52a6f9(0x2ee)]['call'](this,_0x4facd4,_0x4f2022,_0x4147bb,_0x3547bb,_0x249525);};