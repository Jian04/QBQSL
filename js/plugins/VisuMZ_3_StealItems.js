//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
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
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
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
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
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
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x330a=['gPeXw','snatchGoldNameFmt','createKeyJS','3YUxLTu','numberWidth','SJnBF','createStealResist','drop','_enemyWindow','FailureTextColor','addWindow','processStealItemsFailureSFX','getStealableItems','getWeaponIdWithName','floor','708718nyvjkz','EmptyPopupText','stealRate','GsPAR','active','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_lines','all','random','ARMOR','getArmorIdWithName','_weaponIDs','setupStealableItems','processStealItemsSuccessEquipDebuff','stealPlus','empty','max','ITEM','WEAPON','Gold','concat','_cache','DetermineStealData','name','width','%1_volume','createOnStealJS','%1_pitch','Game_BattlerBase_refresh','_armorIDs','%1_pan','ParseAllNotetags','JsOnStealEmpty','SuccessTextColor','createStealPlus','Game_Enemy_gold','onStealSnatchOk','currencyUnit','push','makeSuccess','BattleLog','lUyHX','%1_name','StealEmpty','plus','SuccessFlashColor','BNCKZ','KQgWu','JsOnStealSuccess','inputtingAction','JsOnStealFail','AutoGold','textWidth','StealResist','description','EmptyFlashColor','EmptyTextColor','parameters','JSON','AlreadyStolen','88.88%','yAqlH','AutoItem','Auto','_numberWidth','WcWXd','setHelpWindowItem','call','328490JfxcxT','Actor-%1-%2','Scene_Boot_onDatabaseLoaded','stealResist','State-%1-%2','item','addParam','itemWindowRect','setHelpWindow','processStealItemsNothingLogWindow','setup','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setItem','gainGold','applyItemUserEffect','weapon','Scene_Battle_createEnemyWindow','hideSubInputWindows','CreateVisualGoldText','JsOnStealNothing','format','ShuffleArray','snatchGoldHelpText','refresh','dropIndex','JsBonusSteal','_action','StealItem','GoldRate','iconIndex','toLowerCase','_scene','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','isForOpponent','addStealText','Mechanics','ARRAYJSON','VisuMZ_3_VisualGoldDisplay','HOJPg','toUpperCase','startStealSnatchSelection','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','prototype','\x5cI[%1]','fail','TYPJw','needsSelection','processStealItemsFailureJS','setupIconTextPopup','isEnemy','stolen','create','JsStealRateArmor','drawItemName','CoreEngine','JsStealRateWeapon','1153120hwtdGj','processStealItemsSuccessJS','StealGold','onStealSnatchCancel','textSizeEx','SuccessItemName','StealItems','split','processStealItemsNothingJS','parse','GoldHelp','return\x200','createEnemyWindow','RDXsT','filter','status','setHandler','DSmFk','Weapon-%1-%2','tpaMA','deactivate','Scene_Battle_isAnyInputWindowActive','show','VisuMZ_1_BattleCore','STR','drawItemNumber','CSrTs','JsStealRateGold','StealPlus','map','traitObjects','ParseSkillNotetags','nVWzH','none','nCgha','eLMvs','Armor-%1-%2','enemy','params','JsStealRate','Item-%1-%2','jKRvn','isSnatchEffect','ARRAYSTR','FailureFlashColor','types','setText','RegExp','Popup','ViJUN','GoldRemoval','processStealItemsSuccessSFX','Game_Enemy_setup','Skill-%1-%2','activate','armor','checkCacheKey','makeDeepCopy','Game_Action_applyItemUserEffect','hide','Settings','toFixed','Game_Enemy_setupEnemyLevels','SuccessFlashDuration','process_VisuMZ_StealItems','rate','makeDropItems','_helpWindow','startStealItemsUserEffect','snatchAlreadyStolen','gpvga','indexOf','type','isAnyInputWindowActive','EVAL','processStealItemsFailureLogWindow','clamp','FUNC','autoSelect','Scene_Battle_onEnemyOk','getSnatchTarget','wTfho','registerSnatchTarget','ItemRate','102923zaxbmA','Parse_Notetags_JS','cQYRW','initialize','StealableItemSingle','ParseStealObject','FailureFlashDuration','trim','XwdgF','StealData','ARRAYSTRUCT','_logWindow','697410fOLjEc','subject','JsStealResist','_stealSnatchWindow','VisuMZ_4_ExtraEnemyDrops','ARRAYNUM','GoldIcon','hRRKz','_itemIDs','ConvertParams','ParseItemNotetags','Game_Enemy_makeDropItems','DisplaySuccess','226239mxUdyZ','setDetails','_visualDrops','ouoMO','_enemy','StealFail','EmptyFlashDuration','processStealItemsAttempt','forceSelect','Lceju','note','ShowMessages','Snatch','FLvLy','VYdqD','Sound','length','VisuMZ_0_CoreEngine','gXiLR','createStealRateJS','processStealItemsNothing','makeItemList','gainItem','EquipDebuff','processStealItemsSuccessPopup','KusgI','constructor','_snatchItemIndex','drawTextEx','cancel','SuccessPopupText','_stealableItems','gold','568676QeVwcI','processStealItemsNothingPopup','StealAction2','setupEnemyLevels','exit','process_VisuMZ_StealItems_JS','ouZsf','GOLD','version','includes','isEnabled','setupTextPopup','dropItems','WJNXW','enemyIndex','dataId','processStealItemsFailurePopup','StealAction1','processStealItemsSuccess','CEVqO','index','kETik','match','NUM','Enemy-%1-%2','createStealRate','znzKV','processStealItemsNothingSFX','Scene_Battle_hideSubInputWindows','getItemIdWithName','createStealSnatchWindow','twwCx','iJhxe','JsStealRateItem','playSe','FailurePopupText','TfNbu','_snatchEnemyIndex','bind','processStealItemsSuccessLogWindow','onEnemyOk','kind'];const _0x1517f9=_0x5cec;(function(_0x43fe53,_0x2f9660){const _0x3510a4=_0x5cec;while(!![]){try{const _0xca5146=-parseInt(_0x3510a4(0x271))+parseInt(_0x3510a4(0x1e3))+parseInt(_0x3510a4(0x250))+-parseInt(_0x3510a4(0x243))+-parseInt(_0x3510a4(0x1ab))+parseInt(_0x3510a4(0x167))+-parseInt(_0x3510a4(0x15b))*-parseInt(_0x3510a4(0x237));if(_0xca5146===_0x2f9660)break;else _0x43fe53['push'](_0x43fe53['shift']());}catch(_0x1b4dd8){_0x43fe53['push'](_0x43fe53['shift']());}}}(_0x330a,0xc3dde));function _0x5cec(_0x58d86f,_0x32871d){return _0x5cec=function(_0x330a67,_0x5cec00){_0x330a67=_0x330a67-0x134;let _0x1296f3=_0x330a[_0x330a67];return _0x1296f3;},_0x5cec(_0x58d86f,_0x32871d);}var label=_0x1517f9(0x1e9),tier=tier||0x0,dependencies=[_0x1517f9(0x1fa)],pluginData=$plugins[_0x1517f9(0x1f1)](function(_0x5547e0){const _0x1c7876=_0x1517f9;return _0x5547e0[_0x1c7876(0x1f2)]&&_0x5547e0[_0x1c7876(0x19d)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1517f9(0x21f)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x23f72c,_0x44650){const _0x54a782=_0x1517f9;for(const _0x46304e in _0x44650){if(_0x46304e[_0x54a782(0x144)](/(.*):(.*)/i)){const _0x51e2c8=String(RegExp['$1']),_0x1f8c48=String(RegExp['$2'])['toUpperCase']()['trim']();let _0xb87307,_0x34666c,_0x1f095c;switch(_0x1f8c48){case _0x54a782(0x145):_0xb87307=_0x44650[_0x46304e]!==''?Number(_0x44650[_0x46304e]):0x0;break;case _0x54a782(0x248):_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c['map'](_0x2824e2=>Number(_0x2824e2));break;case _0x54a782(0x22d):_0xb87307=_0x44650[_0x46304e]!==''?eval(_0x44650[_0x46304e]):null;break;case'ARRAYEVAL':_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c['map'](_0x1e2f1d=>eval(_0x1e2f1d));break;case _0x54a782(0x1a1):_0xb87307=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):'';break;case _0x54a782(0x1cf):_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c[_0x54a782(0x200)](_0x315e12=>JSON['parse'](_0x315e12));break;case _0x54a782(0x230):_0xb87307=_0x44650[_0x46304e]!==''?new Function(JSON['parse'](_0x44650[_0x46304e])):new Function(_0x54a782(0x1ee));break;case'ARRAYFUNC':_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c[_0x54a782(0x200)](_0x447e2e=>new Function(JSON[_0x54a782(0x1ec)](_0x447e2e)));break;case _0x54a782(0x1fb):_0xb87307=_0x44650[_0x46304e]!==''?String(_0x44650[_0x46304e]):'';break;case _0x54a782(0x20e):_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c['map'](_0x496f55=>String(_0x496f55));break;case'STRUCT':_0x1f095c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):{},_0xb87307=VisuMZ[_0x54a782(0x24c)]({},_0x1f095c);break;case _0x54a782(0x241):_0x34666c=_0x44650[_0x46304e]!==''?JSON[_0x54a782(0x1ec)](_0x44650[_0x46304e]):[],_0xb87307=_0x34666c[_0x54a782(0x200)](_0x4f972d=>VisuMZ['ConvertParams']({},JSON[_0x54a782(0x1ec)](_0x4f972d)));break;default:continue;}_0x23f72c[_0x51e2c8]=_0xb87307;}}return _0x23f72c;},(_0x5836ee=>{const _0x42b711=_0x1517f9,_0xaa517a=_0x5836ee[_0x42b711(0x17e)];for(const _0x2bd59d of dependencies){if(!Imported[_0x2bd59d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x42b711(0x1bf)](_0xaa517a,_0x2bd59d)),SceneManager['exit']();break;}}const _0x3b617d=_0x5836ee[_0x42b711(0x19d)];if(_0x3b617d['match'](/\[Version[ ](.*?)\]/i)){const _0x9f25ce=Number(RegExp['$1']);_0x9f25ce!==VisuMZ[label][_0x42b711(0x136)]&&(_0x42b711(0x15d)!==_0x42b711(0x15d)?(_0x4582f4[_0x42b711(0x22b)]='ARMOR',_0x24e820['id']=_0xf02623[_0x42b711(0x171)](_0x92ad4f['$1'])):(alert(_0x42b711(0x1d4)[_0x42b711(0x1bf)](_0xaa517a,_0x9f25ce)),SceneManager[_0x42b711(0x275)]()));}if(_0x3b617d['match'](/\[Tier[ ](\d+)\]/i)){const _0x1f6087=Number(RegExp['$1']);_0x1f6087<tier?(alert(_0x42b711(0x16c)[_0x42b711(0x1bf)](_0xaa517a,_0x1f6087,tier)),SceneManager[_0x42b711(0x275)]()):tier=Math[_0x42b711(0x177)](_0x1f6087,tier);}VisuMZ[_0x42b711(0x24c)](VisuMZ[label][_0x42b711(0x21f)],_0x5836ee[_0x42b711(0x1a0)]);})(pluginData),VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x1ad)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x1c2ff0=_0x1517f9;VisuMZ[_0x1c2ff0(0x1e9)][_0x1c2ff0(0x1ad)][_0x1c2ff0(0x1aa)](this),this[_0x1c2ff0(0x223)]();},Scene_Boot[_0x1517f9(0x1d5)][_0x1517f9(0x223)]=function(){const _0x1f1a43=_0x1517f9;if(VisuMZ[_0x1f1a43(0x186)])return;this[_0x1f1a43(0x276)]();},VisuMZ['StealItems'][_0x1517f9(0x212)]={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot['prototype'][_0x1517f9(0x276)]=function(){const _0xfd8b81=_0x1517f9,_0x14dd79=$dataSkills[_0xfd8b81(0x17b)]($dataItems);for(const _0x53449b of _0x14dd79){if(!_0x53449b)continue;VisuMZ['StealItems']['Parse_Notetags_JS'](_0x53449b);}},VisuMZ[_0x1517f9(0x1e9)]['ParseSkillNotetags']=VisuMZ[_0x1517f9(0x202)],VisuMZ[_0x1517f9(0x202)]=function(_0x495e07){const _0x2f14de=_0x1517f9;VisuMZ[_0x2f14de(0x1e9)][_0x2f14de(0x202)][_0x2f14de(0x1aa)](this,_0x495e07),VisuMZ[_0x2f14de(0x1e9)][_0x2f14de(0x238)](_0x495e07);},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x24d)]=VisuMZ[_0x1517f9(0x24d)],VisuMZ[_0x1517f9(0x24d)]=function(_0x455f84){const _0x29459d=_0x1517f9;VisuMZ[_0x29459d(0x1e9)][_0x29459d(0x24d)][_0x29459d(0x1aa)](this,_0x455f84),VisuMZ[_0x29459d(0x1e9)][_0x29459d(0x238)](_0x455f84);},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x238)]=function(_0x2f2ab5){const _0x4aa7e1=_0x1517f9,_0x4cd36e=VisuMZ['StealItems']['RegExp'];let _0x4d6c76='JsStealRate',_0x4c0f44=_0x4cd36e[_0x4aa7e1(0x20a)];VisuMZ[_0x4aa7e1(0x1e9)]['createStealRateJS'](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76=_0x4aa7e1(0x1fe),_0x4c0f44=_0x4cd36e[_0x4aa7e1(0x1fe)],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x263)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76='JsStealRateItem',_0x4c0f44=_0x4cd36e['JsStealRateItem'],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x263)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76=_0x4aa7e1(0x1e2),_0x4c0f44=_0x4cd36e['JsStealRateWeapon'],VisuMZ['StealItems'][_0x4aa7e1(0x263)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76=_0x4aa7e1(0x1df),_0x4c0f44=_0x4cd36e[_0x4aa7e1(0x1df)],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x263)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76=_0x4aa7e1(0x197),_0x4c0f44=_0x4cd36e['JsOnStealSuccess'],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x181)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76=_0x4aa7e1(0x199),_0x4c0f44=_0x4cd36e['JsOnStealFail'],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x181)](_0x2f2ab5,_0x4d6c76,_0x4c0f44),_0x4d6c76='JsOnStealNothing',_0x4c0f44=_0x4cd36e[_0x4aa7e1(0x1be)],VisuMZ[_0x4aa7e1(0x1e9)][_0x4aa7e1(0x181)](_0x2f2ab5,_0x4d6c76,_0x4c0f44);},VisuMZ[_0x1517f9(0x1e9)]['JS']={},VisuMZ['StealItems'][_0x1517f9(0x263)]=function(_0x18e3de,_0x5a24c9,_0xd22d5e){const _0xca4b45=_0x1517f9,_0x5cfab9=_0x18e3de['note'];if(_0x5cfab9[_0xca4b45(0x144)](_0xd22d5e)){const _0x58a1cc=String(RegExp['$1']),_0x46631d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x58a1cc),_0x408add=VisuMZ[_0xca4b45(0x1e9)]['createKeyJS'](_0x18e3de,_0x5a24c9);VisuMZ[_0xca4b45(0x1e9)]['JS'][_0x408add]=new Function(_0x46631d);}},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x181)]=function(_0x5f45ce,_0x27c53b,_0x427d16){const _0x3f89a9=_0x1517f9,_0x1e2cbd=_0x5f45ce[_0x3f89a9(0x25a)];if(_0x1e2cbd[_0x3f89a9(0x144)](_0x427d16)){if(_0x3f89a9(0x203)===_0x3f89a9(0x196)){const _0x18648b=_0x2e6186[_0x3f89a9(0x192)],_0x106cde=_0x3f123f[_0x3f89a9(0x1ca)][_0x3f89a9(0x242)];if(_0x106cde&&_0x18648b!=='')_0x106cde[_0x3f89a9(0x1cd)](_0x18648b);}else{const _0x36a744=String(RegExp['$1']),_0x4c9698=_0x3f89a9(0x1b6)[_0x3f89a9(0x1bf)](_0x36a744),_0xb37cae=VisuMZ[_0x3f89a9(0x1e9)][_0x3f89a9(0x15a)](_0x5f45ce,_0x27c53b);VisuMZ[_0x3f89a9(0x1e9)]['JS'][_0xb37cae]=new Function(_0x4c9698);}}},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x15a)]=function(_0x293979,_0x163b4d){const _0x834fa1=_0x1517f9;let _0x512d5c='';if($dataActors[_0x834fa1(0x137)](_0x293979))_0x512d5c=_0x834fa1(0x1ac)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataClasses['includes'](_0x293979))_0x512d5c='Class-%1-%2'[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataSkills['includes'](_0x293979))_0x512d5c=_0x834fa1(0x218)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataItems['includes'](_0x293979))_0x512d5c=_0x834fa1(0x20b)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataWeapons['includes'](_0x293979))_0x512d5c=_0x834fa1(0x1f5)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataArmors[_0x834fa1(0x137)](_0x293979))_0x512d5c=_0x834fa1(0x207)['format'](_0x293979['id'],_0x163b4d);if($dataEnemies['includes'](_0x293979))_0x512d5c=_0x834fa1(0x146)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);if($dataStates[_0x834fa1(0x137)](_0x293979))_0x512d5c=_0x834fa1(0x1af)[_0x834fa1(0x1bf)](_0x293979['id'],_0x163b4d);return _0x512d5c;},DataManager[_0x1517f9(0x14b)]=function(_0x1e96ad){const _0x2ee8ad=_0x1517f9;_0x1e96ad=_0x1e96ad[_0x2ee8ad(0x1d2)]()[_0x2ee8ad(0x23e)](),this[_0x2ee8ad(0x24b)]=this[_0x2ee8ad(0x24b)]||{};if(this[_0x2ee8ad(0x24b)][_0x1e96ad])return this[_0x2ee8ad(0x24b)][_0x1e96ad];for(const _0x73957e of $dataItems){if('QIbEV'!=='mTDxx'){if(!_0x73957e)continue;this[_0x2ee8ad(0x24b)][_0x73957e[_0x2ee8ad(0x17e)][_0x2ee8ad(0x1d2)]()[_0x2ee8ad(0x23e)]()]=_0x73957e['id'];}else _0x4bfb64[_0x2ee8ad(0x21a)]=_0x4b59a7[_0x2ee8ad(0x1e9)]['JS'][_0x1cc898][_0x2ee8ad(0x1aa)](_0x1c350c,_0xa2882[_0x2ee8ad(0x244)](),_0x492afa,_0x1f9484[_0x2ee8ad(0x21a)]);}return this[_0x2ee8ad(0x24b)][_0x1e96ad]||0x0;},DataManager[_0x1517f9(0x165)]=function(_0x5a6197){const _0x53c29c=_0x1517f9;_0x5a6197=_0x5a6197[_0x53c29c(0x1d2)]()['trim'](),this['_weaponIDs']=this['_weaponIDs']||{};if(this[_0x53c29c(0x172)][_0x5a6197])return this[_0x53c29c(0x172)][_0x5a6197];for(const _0x230ec6 of $dataWeapons){if(!_0x230ec6)continue;this[_0x53c29c(0x172)][_0x230ec6[_0x53c29c(0x17e)][_0x53c29c(0x1d2)]()[_0x53c29c(0x23e)]()]=_0x230ec6['id'];}return this[_0x53c29c(0x172)][_0x5a6197]||0x0;},DataManager[_0x1517f9(0x171)]=function(_0x22d6e1){const _0x3056e0=_0x1517f9;_0x22d6e1=_0x22d6e1[_0x3056e0(0x1d2)]()[_0x3056e0(0x23e)](),this['_armorIDs']=this[_0x3056e0(0x184)]||{};if(this[_0x3056e0(0x184)][_0x22d6e1])return this[_0x3056e0(0x184)][_0x22d6e1];for(const _0x5a86ae of $dataArmors){if(!_0x5a86ae)continue;this[_0x3056e0(0x184)][_0x5a86ae[_0x3056e0(0x17e)]['toUpperCase']()[_0x3056e0(0x23e)]()]=_0x5a86ae['id'];}return this[_0x3056e0(0x184)][_0x22d6e1]||0x0;},ImageManager['snatchGoldIcon']=Imported[_0x1517f9(0x261)]?VisuMZ[_0x1517f9(0x1e1)][_0x1517f9(0x21f)][_0x1517f9(0x17a)][_0x1517f9(0x249)]:VisuMZ[_0x1517f9(0x1e9)]['Settings']['Snatch'][_0x1517f9(0x249)],TextManager['snatchGoldNameFmt']=VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x21f)]['Snatch']['GoldNameFmt'],TextManager[_0x1517f9(0x1c1)]=VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x21f)][_0x1517f9(0x25c)][_0x1517f9(0x1ed)],TextManager[_0x1517f9(0x228)]=VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x21f)]['Snatch'][_0x1517f9(0x1a2)],VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x21d)]=Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1b9)],Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1b9)]=function(_0xee8a4){const _0xb11789=_0x1517f9;VisuMZ[_0xb11789(0x1e9)]['Game_Action_applyItemUserEffect'][_0xb11789(0x1aa)](this,_0xee8a4),this[_0xb11789(0x227)](_0xee8a4);},Game_Action['prototype']['startStealItemsUserEffect']=function(_0x3c4cd9){const _0x3a5a7a=_0x1517f9;if(!this[_0x3a5a7a(0x1b0)]())return;if(!_0x3c4cd9[_0x3a5a7a(0x1dc)]())return;if(this[_0x3a5a7a(0x244)]()[_0x3a5a7a(0x1dc)]())return;const _0x5e923b=VisuMZ[_0x3a5a7a(0x1e9)]['DetermineStealData'](this,_0x3c4cd9);if(_0x5e923b[_0x3a5a7a(0x210)][_0x3a5a7a(0x260)]<=0x0)return;const _0x56765a=_0x3c4cd9['getStealableItems']();if(_0x56765a[_0x3a5a7a(0x260)]<=0x0)return;let _0x44d7b9=[];if(this[_0x3a5a7a(0x20d)]()){if(_0x3a5a7a(0x143)===_0x3a5a7a(0x143))_0x44d7b9=this[_0x3a5a7a(0x233)](_0x3c4cd9);else{const _0x44fca8=_0x47f927(_0x3ba1c2['$1']);_0x44fca8!==_0x456f17[_0x40fae2][_0x3a5a7a(0x136)]&&(_0x53e5d1(_0x3a5a7a(0x1d4)['format'](_0x490d34,_0x44fca8)),_0x5291c5[_0x3a5a7a(0x275)]());}}else _0x44d7b9=_0x56765a[_0x3a5a7a(0x1f1)](_0x25b213=>{const _0x376366=_0x3a5a7a;return _0x5e923b[_0x376366(0x210)]['includes'](_0x25b213[_0x376366(0x22b)]);});_0x44d7b9=_0x44d7b9['filter'](_0x56b42b=>{return!_0x56b42b['stolen'];});if(_0x44d7b9[_0x3a5a7a(0x260)]<=0x0){if(_0x3a5a7a(0x1a4)!==_0x3a5a7a(0x234))return this['processStealItemsNothing'](_0x3c4cd9);else _0x1f64fd[_0x3a5a7a(0x22b)]='ITEM',_0x315c5a['id']=_0x293447(_0xe21fd['$1']);}this[_0x3a5a7a(0x257)](_0x3c4cd9,_0x5e923b,_0x44d7b9);},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x17d)]=function(_0x186651,_0x765f93){const _0x5c0306=_0x1517f9,_0x55f390=VisuMZ[_0x5c0306(0x1e9)][_0x5c0306(0x212)],_0x41b9e3=_0x186651['item']()[_0x5c0306(0x25a)];let _0x407eee=[],_0x3f24db={'all':_0x186651[_0x5c0306(0x244)]()[_0x5c0306(0x169)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x2b92cf={'all':_0x186651[_0x5c0306(0x244)]()['stealPlus']()-_0x765f93[_0x5c0306(0x1ae)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0x41b9e3[_0x5c0306(0x144)](_0x55f390[_0x5c0306(0x13f)])&&(_0x407eee=['GOLD',_0x5c0306(0x178),'WEAPON','ARMOR']);const _0x217511=_0x41b9e3[_0x5c0306(0x144)](_0x55f390[_0x5c0306(0x273)]);if(_0x217511)for(const _0x3bb7a0 of _0x217511){if(!_0x3bb7a0)continue;if(_0x3bb7a0[_0x5c0306(0x144)](/ALL/i)){_0x407eee=[_0x5c0306(0x135),_0x5c0306(0x178),'WEAPON','ARMOR'];if(_0x3bb7a0[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x2b92cf['all']+=Number(RegExp['$1'])*0.01;else _0x3bb7a0[_0x5c0306(0x144)](/(\d+)([%％])/i)&&(_0x3f24db[_0x5c0306(0x16e)]*=Number(RegExp['$1'])*0.01);}if(_0x3bb7a0[_0x5c0306(0x144)](/GOLD/i)){_0x407eee['push']('GOLD');if(_0x3bb7a0[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x2b92cf[_0x5c0306(0x270)]+=Number(RegExp['$1'])*0.01;else _0x3bb7a0[_0x5c0306(0x144)](/(\d+)([%％])/i)&&(_0x3f24db[_0x5c0306(0x270)]*=Number(RegExp['$1'])*0.01);}if(_0x3bb7a0[_0x5c0306(0x144)](/ITEM/i)){if(_0x5c0306(0x1f4)===_0x5c0306(0x1f4)){_0x407eee[_0x5c0306(0x18d)](_0x5c0306(0x178));if(_0x3bb7a0[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x2b92cf['item']+=Number(RegExp['$1'])*0.01;else _0x3bb7a0[_0x5c0306(0x144)](/(\d+)([%％])/i)&&('SLLsf'!=='DQVWf'?_0x3f24db[_0x5c0306(0x1b0)]*=Number(RegExp['$1'])*0.01:_0x2bc4ca=_0x50a917[_0x26a809['id']]);}else _0x31d61a[_0x5c0306(0x1d5)]['initialize'][_0x5c0306(0x1aa)](this,_0x1e4aa1),this['hide'](),this['_enemy']=null,this[_0x5c0306(0x1c5)]=null;}if(_0x3bb7a0[_0x5c0306(0x144)](/WEAPON/i)){_0x407eee[_0x5c0306(0x18d)]('WEAPON');if(_0x3bb7a0[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i)){if('WYlHp'===_0x5c0306(0x269)){const _0x495841=_0x3d30b8[_0x5c0306(0x1ca)][_0x5c0306(0x242)];if(_0x495841&&_0x1a5757!=='')_0x495841[_0x5c0306(0x1cd)](_0x47894e);}else _0x2b92cf['weapon']+=Number(RegExp['$1'])*0.01;}else _0x3bb7a0['match'](/(\d+)([%％])/i)&&(_0x3f24db['weapon']*=Number(RegExp['$1'])*0.01);}if(_0x3bb7a0[_0x5c0306(0x144)](/ARMOR/i)){if(_0x5c0306(0x148)===_0x5c0306(0x148)){_0x407eee[_0x5c0306(0x18d)](_0x5c0306(0x170));if(_0x3bb7a0[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x2b92cf[_0x5c0306(0x21a)]+=Number(RegExp['$1'])*0.01;else{if(_0x3bb7a0[_0x5c0306(0x144)](/(\d+)([%％])/i)){if(_0x5c0306(0x205)!==_0x5c0306(0x205)){if(this[_0x5c0306(0x26f)]===_0x15bcb0)this[_0x5c0306(0x173)]();return this['_stealableItems'];}else _0x3f24db['armor']*=Number(RegExp['$1'])*0.01;}}}else{_0x3cf525['push'](_0x5c0306(0x178));if(_0x34fad5[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x5b718e['item']+=_0x526acf(_0x4dba26['$1'])*0.01;else _0x4d76ac['match'](/(\d+)([%％])/i)&&(_0x57331d[_0x5c0306(0x1b0)]*=_0x93fc5a(_0x903131['$1'])*0.01);}}}let _0x4b9e6d=VisuMZ['StealItems'][_0x5c0306(0x15a)](_0x186651[_0x5c0306(0x1b0)](),'JsStealRate');VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]&&(_0x3f24db[_0x5c0306(0x16e)]=VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]['call'](_0x186651,_0x186651[_0x5c0306(0x244)](),_0x765f93,_0x3f24db[_0x5c0306(0x16e)]));_0x4b9e6d=VisuMZ[_0x5c0306(0x1e9)][_0x5c0306(0x15a)](_0x186651[_0x5c0306(0x1b0)](),_0x5c0306(0x1fe));VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]&&(_0x5c0306(0x206)==='zTDNi'?_0x1aa8e2[_0x5c0306(0x270)]*=_0x17eb13(_0x47ffa8['$1'])*0.01:_0x3f24db[_0x5c0306(0x270)]=VisuMZ['StealItems']['JS'][_0x4b9e6d]['call'](_0x186651,_0x186651[_0x5c0306(0x244)](),_0x765f93,_0x3f24db['gold']));_0x4b9e6d=VisuMZ['StealItems'][_0x5c0306(0x15a)](_0x186651[_0x5c0306(0x1b0)](),_0x5c0306(0x14f));if(VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]){if('lUyHX'===_0x5c0306(0x190))_0x3f24db[_0x5c0306(0x1b0)]=VisuMZ['StealItems']['JS'][_0x4b9e6d][_0x5c0306(0x1aa)](_0x186651,_0x186651['subject'](),_0x765f93,_0x3f24db[_0x5c0306(0x1b0)]);else{_0x4aca10[_0x5c0306(0x18d)](_0x5c0306(0x170));if(_0x4a6549[_0x5c0306(0x144)](/([\+\-]\d+)([%％])/i))_0x8548ec['armor']+=_0x469940(_0x67a59a['$1'])*0.01;else _0x30071e[_0x5c0306(0x144)](/(\d+)([%％])/i)&&(_0x5b1617[_0x5c0306(0x21a)]*=_0x37ba73(_0x214f4f['$1'])*0.01);}}return _0x4b9e6d=VisuMZ['StealItems'][_0x5c0306(0x15a)](_0x186651[_0x5c0306(0x1b0)](),'JsStealRateWeapon'),VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]&&('HOJPg'===_0x5c0306(0x1d1)?_0x3f24db[_0x5c0306(0x1ba)]=VisuMZ['StealItems']['JS'][_0x4b9e6d][_0x5c0306(0x1aa)](_0x186651,_0x186651[_0x5c0306(0x244)](),_0x765f93,_0x3f24db[_0x5c0306(0x1ba)]):_0x5844c1=_0x2269f3[_0x26f494['id']]),_0x4b9e6d=VisuMZ[_0x5c0306(0x1e9)][_0x5c0306(0x15a)](_0x186651[_0x5c0306(0x1b0)](),_0x5c0306(0x1df)),VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d]&&(_0x3f24db[_0x5c0306(0x21a)]=VisuMZ[_0x5c0306(0x1e9)]['JS'][_0x4b9e6d][_0x5c0306(0x1aa)](_0x186651,_0x186651[_0x5c0306(0x244)](),_0x765f93,_0x3f24db[_0x5c0306(0x21a)])),{'types':_0x407eee,'rate':_0x3f24db,'plus':_0x2b92cf};},VisuMZ['StealItems'][_0x1517f9(0x1c0)]=function(_0x10a777){const _0x21bbe0=_0x1517f9;var _0x41128c,_0x2c7507,_0x335774;for(_0x335774=_0x10a777[_0x21bbe0(0x260)]-0x1;_0x335774>0x0;_0x335774--){_0x41128c=Math[_0x21bbe0(0x166)](Math[_0x21bbe0(0x16f)]()*(_0x335774+0x1)),_0x2c7507=_0x10a777[_0x335774],_0x10a777[_0x335774]=_0x10a777[_0x41128c],_0x10a777[_0x41128c]=_0x2c7507;}return _0x10a777;},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x257)]=function(_0x358775,_0x29a356,_0x50194e){const _0x133638=_0x1517f9;VisuMZ[_0x133638(0x1e9)][_0x133638(0x1c0)](_0x50194e),this[_0x133638(0x18e)](_0x358775);for(const _0x8f420c of _0x50194e){if(_0x133638(0x1fd)!=='hpOys'){if(!_0x8f420c)continue;let _0x4cfe9e=_0x29a356[_0x133638(0x224)][_0x133638(0x16e)]*_0x8f420c[_0x133638(0x224)],_0xe93226=_0x29a356[_0x133638(0x193)][_0x133638(0x16e)];_0x4cfe9e*=_0x29a356[_0x133638(0x224)][_0x8f420c[_0x133638(0x22b)][_0x133638(0x1c9)]()],_0xe93226+=_0x29a356[_0x133638(0x193)][_0x8f420c['type'][_0x133638(0x1c9)]()];const _0x33fc9b=_0x4cfe9e+_0xe93226;if(Math[_0x133638(0x16f)]()<_0x33fc9b){if(_0x133638(0x1f6)!==_0x133638(0x229))return this[_0x133638(0x140)](_0x358775,_0x8f420c);else{const _0x24cf89=this[_0x133638(0x1b2)]();this[_0x133638(0x246)]=new _0x165a76(_0x24cf89),this[_0x133638(0x246)][_0x133638(0x1b3)](this['_helpWindow']),this[_0x133638(0x246)]['setHandler']('ok',this[_0x133638(0x18b)][_0x133638(0x154)](this)),this['_stealSnatchWindow'][_0x133638(0x1f3)](_0x133638(0x26d),this[_0x133638(0x1e6)][_0x133638(0x154)](this)),this[_0x133638(0x162)](this[_0x133638(0x246)]);}}}else _0x1ee244(_0x133638(0x1d4)[_0x133638(0x1bf)](_0xdb3dfc,_0x2918f8)),_0x5780f4[_0x133638(0x275)]();}this['processStealItemsFailure'](_0x358775);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x20d)]=function(){const _0x163e7d=_0x1517f9;if(!this['isForOne']())return![];if(!this[_0x163e7d(0x1cc)]())return![];if(!this[_0x163e7d(0x1d9)]())return![];const _0x3626b5=VisuMZ[_0x163e7d(0x1e9)][_0x163e7d(0x212)],_0x282bb3=this[_0x163e7d(0x1b0)]()['note'];return _0x282bb3[_0x163e7d(0x144)](_0x3626b5['Snatch'])&&(_0x282bb3[_0x163e7d(0x144)](_0x3626b5[_0x163e7d(0x13f)])||_0x282bb3['match'](_0x3626b5['StealAction2']));},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x235)]=function(_0x3faa70,_0x419a80){const _0x170053=_0x1517f9;this[_0x170053(0x153)]=_0x3faa70[_0x170053(0x142)]();const _0x2593fc=_0x3faa70[_0x170053(0x164)]();this[_0x170053(0x26b)]=_0x2593fc[_0x170053(0x22a)](_0x419a80);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x233)]=function(_0x4886de){const _0x4b22d1=_0x1517f9;if(_0x4886de[_0x4b22d1(0x142)]()!==this[_0x4b22d1(0x153)])return[];this[_0x4b22d1(0x26b)]=this[_0x4b22d1(0x26b)]||0x0;const _0x1f7d4b=_0x4886de[_0x4b22d1(0x164)]();return[_0x1f7d4b[this['_snatchItemIndex']]];},Game_Action[_0x1517f9(0x1d5)]['processStealItemsSuccess']=function(_0x3a45c8,_0x55b9aa){const _0x16f4e8=_0x1517f9;_0x55b9aa[_0x16f4e8(0x1dd)]=!![],this[_0x16f4e8(0x155)](_0x3a45c8,_0x55b9aa),this[_0x16f4e8(0x216)](_0x55b9aa),this[_0x16f4e8(0x268)](_0x3a45c8,_0x55b9aa),this[_0x16f4e8(0x174)](_0x3a45c8,_0x55b9aa),this[_0x16f4e8(0x1e4)](_0x3a45c8,_0x55b9aa);},Game_Action['prototype']['processStealItemsSuccessLogWindow']=function(_0x8d78bc,_0x236358){const _0x41e67c=_0x1517f9,_0x13a4ff=VisuMZ[_0x41e67c(0x1e9)][_0x41e67c(0x21f)][_0x41e67c(0x18f)];let _0x4f118e=_0x13a4ff[_0x41e67c(0x1c6)],_0x4c467d='';if(_0x236358[_0x41e67c(0x22b)]==='GOLD'){$gameParty[_0x41e67c(0x1b8)](_0x236358['id']);if(Imported[_0x41e67c(0x1d0)]){if('RPXqR'==='DhBLE')return!_0x5e0d1f[_0x41e67c(0x1dd)];else{const _0x3c84e4=Window_Base[_0x41e67c(0x1cb)],_0x556600=VisuMZ['VisualGoldDisplay'][_0x41e67c(0x1bd)](_0x236358['id'],_0x3c84e4,![]);_0x4c467d=_0x4f118e['format'](_0x556600,'');}}else _0x4f118e=_0x13a4ff[_0x41e67c(0x1e5)],_0x4c467d=_0x4f118e[_0x41e67c(0x1bf)](TextManager['currencyUnit'],_0x236358['id']);Imported[_0x41e67c(0x247)]&&(_0x8d78bc[_0x41e67c(0x252)]=_0x8d78bc['_visualDrops']||{},_0x8d78bc[_0x41e67c(0x252)][_0x41e67c(0x270)]=0x0);}else{if(_0x236358[_0x41e67c(0x22b)]==='ITEM'){if(_0x41e67c(0x158)!=='nVMQg'){const _0x13886d=$dataItems[_0x236358['id']];if(!_0x13886d)return;$gameParty[_0x41e67c(0x266)](_0x13886d,0x1);const _0x4f04cc='\x5cI[%1]'['format'](_0x13886d['iconIndex']);_0x4c467d=_0x4f118e[_0x41e67c(0x1bf)](_0x13886d['name'],_0x4f04cc);}else{let _0xd9d70=_0x41e67c(0x1ae);if(this[_0x41e67c(0x21b)](_0xd9d70))return this[_0x41e67c(0x17c)][_0xd9d70];return this[_0x41e67c(0x17c)][_0xd9d70]=this[_0x41e67c(0x15e)](),this[_0x41e67c(0x17c)][_0xd9d70];}}else{if(_0x236358[_0x41e67c(0x22b)]==='WEAPON'){if(_0x41e67c(0x1f0)!=='RoTPt'){const _0x26e588=$dataWeapons[_0x236358['id']];if(!_0x26e588)return;$gameParty[_0x41e67c(0x266)](_0x26e588,0x1);const _0x308f87='\x5cI[%1]'[_0x41e67c(0x1bf)](_0x26e588[_0x41e67c(0x1c8)]);_0x4c467d=_0x4f118e['format'](_0x26e588[_0x41e67c(0x17e)],_0x308f87);}else _0x1e1fb0[_0x41e67c(0x1ba)]*=_0x1359fd(_0x5ca02b['$1'])*0.01;}else{if(_0x236358[_0x41e67c(0x22b)]==='ARMOR'){const _0x3d1113=$dataArmors[_0x236358['id']];if(!_0x3d1113)return;$gameParty[_0x41e67c(0x266)](_0x3d1113,0x1);const _0x39dbed=_0x41e67c(0x1d6)[_0x41e67c(0x1bf)](_0x3d1113[_0x41e67c(0x1c8)]);_0x4c467d=_0x4f118e[_0x41e67c(0x1bf)](_0x3d1113[_0x41e67c(0x17e)],_0x39dbed);}}}}if(_0x13a4ff['ShowMessages']){const _0x43b1b0=SceneManager[_0x41e67c(0x1ca)][_0x41e67c(0x242)];if(_0x43b1b0&&_0x4c467d!=='')_0x43b1b0['addStealText'](_0x4c467d);}},Game_Action['prototype'][_0x1517f9(0x216)]=function(_0x58c4dc){const _0x34fd06=_0x1517f9,_0xe34558=VisuMZ[_0x34fd06(0x1e9)][_0x34fd06(0x21f)][_0x34fd06(0x25f)];if(!_0xe34558)return;const _0x3d7dd5=_0x58c4dc[_0x34fd06(0x22b)]['toLowerCase']()[_0x34fd06(0x23e)](),_0x11ecb2={'name':_0xe34558[_0x34fd06(0x191)[_0x34fd06(0x1bf)](_0x3d7dd5)]||'','volume':_0xe34558[_0x34fd06(0x180)[_0x34fd06(0x1bf)](_0x3d7dd5)]||0x0,'pitch':_0xe34558[_0x34fd06(0x182)[_0x34fd06(0x1bf)](_0x3d7dd5)]||0x0,'pan':_0xe34558['%1_pan'[_0x34fd06(0x1bf)](_0x3d7dd5)]||0x0};if(_0x11ecb2[_0x34fd06(0x17e)]!=='')AudioManager['playSe'](_0x11ecb2);},Game_Action['prototype'][_0x1517f9(0x268)]=function(_0x5091d3,_0x130b7a){const _0x2adf88=_0x1517f9;if(!_0x130b7a)return;if(!_0x5091d3)return;const _0x3dbcca=VisuMZ[_0x2adf88(0x1e9)][_0x2adf88(0x21f)][_0x2adf88(0x213)];if(!_0x3dbcca)return;if(_0x3dbcca['SuccessPopupText']==='')return;const _0x386fbb=_0x3dbcca[_0x2adf88(0x26e)],_0x46f429={'textColor':_0x3dbcca[_0x2adf88(0x188)]||0x0,'flashColor':_0x3dbcca[_0x2adf88(0x194)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x3dbcca[_0x2adf88(0x222)]||0x3c};_0x5091d3[_0x2adf88(0x139)](_0x386fbb,_0x46f429);if(_0x3dbcca[_0x2adf88(0x1e8)]&&_0x130b7a[_0x2adf88(0x22b)]!==_0x2adf88(0x135)){let _0x532b50=null;if(_0x130b7a[_0x2adf88(0x22b)]==='ITEM')_0x532b50=$dataItems[_0x130b7a['id']];else{if(_0x130b7a['type']==='WEAPON')'cxpYo'!==_0x2adf88(0x141)?_0x532b50=$dataWeapons[_0x130b7a['id']]:_0x1ebc0a['gold']=_0x56992d[_0x2adf88(0x1e9)]['JS'][_0x3b8cb6][_0x2adf88(0x1aa)](_0x96132e,_0x1c7bf5[_0x2adf88(0x244)](),_0x5ce5b0,_0x55732f[_0x2adf88(0x270)]);else _0x130b7a[_0x2adf88(0x22b)]===_0x2adf88(0x170)&&(_0x532b50=$dataArmors[_0x130b7a['id']]);}if(_0x532b50){if(_0x2adf88(0x134)==='ouZsf')_0x5091d3[_0x2adf88(0x1db)](_0x532b50[_0x2adf88(0x1c8)],_0x532b50[_0x2adf88(0x17e)],_0x46f429);else{const _0x4bcbe3=_0x5ed2e9['StealItems'][_0x2adf88(0x21f)][_0x2adf88(0x18f)];if(_0x4bcbe3[_0x2adf88(0x25b)]){const _0x2c3116=_0x4bcbe3[_0x2adf88(0x255)],_0x13146a=_0x5a847f[_0x2adf88(0x1ca)][_0x2adf88(0x242)];if(_0x13146a&&_0x2c3116!=='')_0x13146a[_0x2adf88(0x1cd)](_0x2c3116);}}}}},Game_Action['prototype'][_0x1517f9(0x174)]=function(_0x4566bb,_0x348c40){const _0x5a0b72=_0x1517f9;if(!_0x4566bb)return;const _0x5e38a2=VisuMZ[_0x5a0b72(0x1e9)][_0x5a0b72(0x21f)][_0x5a0b72(0x1ce)];if(!_0x5e38a2)return;if(!_0x5e38a2[_0x5a0b72(0x267)])return;if(![_0x5a0b72(0x179),_0x5a0b72(0x170)][_0x5a0b72(0x137)](_0x348c40['type']))return;let _0x437b61=null;if(_0x348c40[_0x5a0b72(0x22b)]==='WEAPON')_0x437b61=$dataWeapons[_0x348c40['id']];else _0x348c40[_0x5a0b72(0x22b)]===_0x5a0b72(0x170)&&(_0x437b61=$dataArmors[_0x348c40['id']]);if(!_0x437b61)return;for(let _0x5b0b00=0x0;_0x5b0b00<0x8;_0x5b0b00++){const _0x190af9=_0x437b61[_0x5a0b72(0x209)][_0x5b0b00];_0x4566bb[_0x5a0b72(0x1b1)](_0x5b0b00,-_0x190af9);}},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1e4)]=function(_0x4f075a,_0x65a2cb){const _0x43a6ad=_0x1517f9;if(!_0x4f075a)return;let _0x5b5074=null,_0x4c4b15=0x0;if(_0x65a2cb[_0x43a6ad(0x22b)]===_0x43a6ad(0x135)){if('VYdqD'===_0x43a6ad(0x25e))_0x4c4b15=_0x65a2cb['id'];else{_0x1c313['gainGold'](_0xf313b5['id']);if(_0x3a4f8a[_0x43a6ad(0x1d0)]){const _0x27829f=_0x20af61[_0x43a6ad(0x1cb)],_0x2ad51d=_0x1c6b77['VisualGoldDisplay'][_0x43a6ad(0x1bd)](_0x31d32f['id'],_0x27829f,![]);_0x4f6909=_0x5d2cc5[_0x43a6ad(0x1bf)](_0x2ad51d,'');}else _0x3b8df1=_0x189591[_0x43a6ad(0x1e5)],_0x4597d1=_0x10d1a1[_0x43a6ad(0x1bf)](_0x1e48cc[_0x43a6ad(0x18c)],_0x3f3c10['id']);_0x126297[_0x43a6ad(0x247)]&&(_0x59060c[_0x43a6ad(0x252)]=_0x5966ba['_visualDrops']||{},_0x5f4890['_visualDrops'][_0x43a6ad(0x270)]=0x0);}}else{if(_0x65a2cb[_0x43a6ad(0x22b)]===_0x43a6ad(0x178))_0x5b5074=$dataItems[_0x65a2cb['id']];else{if(_0x65a2cb[_0x43a6ad(0x22b)]==='WEAPON')_0x5b5074=$dataWeapons[_0x65a2cb['id']];else _0x65a2cb[_0x43a6ad(0x22b)]===_0x43a6ad(0x170)&&(_0x43a6ad(0x1a8)!==_0x43a6ad(0x1a8)?_0x5ecc79=['GOLD',_0x43a6ad(0x178),_0x43a6ad(0x179),'ARMOR']:_0x5b5074=$dataArmors[_0x65a2cb['id']]);}}const _0x272c68=VisuMZ['StealItems'][_0x43a6ad(0x21f)][_0x43a6ad(0x1ce)];if(_0x272c68&&_0x272c68[_0x43a6ad(0x197)]){if('bkiBZ'===_0x43a6ad(0x16a)){const _0x2aa007=_0x1d1335(_0x553788['$1']);_0x2aa007<_0x1053f4?(_0x5f1707(_0x43a6ad(0x16c)[_0x43a6ad(0x1bf)](_0x47290a,_0x2aa007,_0x77253)),_0x3ef8e9[_0x43a6ad(0x275)]()):_0x7b9881=_0x302a50['max'](_0x2aa007,_0x3bd6d0);}else _0x272c68['JsOnStealSuccess'][_0x43a6ad(0x1aa)](this,this[_0x43a6ad(0x244)](),_0x4f075a,_0x5b5074,_0x4c4b15);}const _0x46af2e=VisuMZ[_0x43a6ad(0x1e9)][_0x43a6ad(0x15a)](this[_0x43a6ad(0x1b0)](),_0x43a6ad(0x197));VisuMZ[_0x43a6ad(0x1e9)]['JS'][_0x46af2e]&&VisuMZ[_0x43a6ad(0x1e9)]['JS'][_0x46af2e][_0x43a6ad(0x1aa)](this,this['subject'](),_0x4f075a,_0x5b5074,_0x4c4b15);},Game_Action['prototype']['processStealItemsFailure']=function(_0x5dfe45){const _0x482ce4=_0x1517f9;this[_0x482ce4(0x22e)](_0x5dfe45),this[_0x482ce4(0x163)](),this[_0x482ce4(0x13e)](_0x5dfe45),this[_0x482ce4(0x1da)](_0x5dfe45);},Game_Action['prototype'][_0x1517f9(0x22e)]=function(_0xdebb43){const _0x5bb856=_0x1517f9,_0x3e48f1=VisuMZ['StealItems'][_0x5bb856(0x21f)][_0x5bb856(0x18f)];if(_0x3e48f1['ShowMessages']){const _0x27b8e0=_0x3e48f1[_0x5bb856(0x255)],_0x3bd592=SceneManager[_0x5bb856(0x1ca)][_0x5bb856(0x242)];if(_0x3bd592&&_0x27b8e0!=='')_0x3bd592[_0x5bb856(0x1cd)](_0x27b8e0);}},Game_Action['prototype'][_0x1517f9(0x163)]=function(){const _0x353e72=_0x1517f9,_0x3316e9=VisuMZ[_0x353e72(0x1e9)][_0x353e72(0x21f)][_0x353e72(0x25f)];if(!_0x3316e9)return;const _0x5b64ef=_0x353e72(0x1d7),_0x479ebe={'name':_0x3316e9[_0x353e72(0x191)['format'](_0x5b64ef)]||'','volume':_0x3316e9[_0x353e72(0x180)['format'](_0x5b64ef)]||0x0,'pitch':_0x3316e9[_0x353e72(0x182)[_0x353e72(0x1bf)](_0x5b64ef)]||0x0,'pan':_0x3316e9[_0x353e72(0x185)['format'](_0x5b64ef)]||0x0};if(_0x479ebe[_0x353e72(0x17e)]!=='')AudioManager[_0x353e72(0x150)](_0x479ebe);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x13e)]=function(_0x50c6db){const _0x5258fd=_0x1517f9;if(!_0x50c6db)return;const _0x396ce8=VisuMZ[_0x5258fd(0x1e9)][_0x5258fd(0x21f)]['Popup'];if(!_0x396ce8)return;if(_0x396ce8['FailurePopupText']==='')return;const _0x368b1b=_0x396ce8['FailurePopupText'],_0x5d45ef={'textColor':_0x396ce8[_0x5258fd(0x161)]||0x0,'flashColor':_0x396ce8[_0x5258fd(0x20f)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x396ce8[_0x5258fd(0x23d)]||0x3c};_0x50c6db[_0x5258fd(0x139)](_0x368b1b,_0x5d45ef);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1da)]=function(_0x304d17){const _0x19dbde=_0x1517f9;if(!_0x304d17)return;const _0xf7f03b=VisuMZ[_0x19dbde(0x1e9)]['Settings'][_0x19dbde(0x1ce)];_0xf7f03b&&_0xf7f03b[_0x19dbde(0x199)]&&_0xf7f03b[_0x19dbde(0x199)]['call'](this,this[_0x19dbde(0x244)](),_0x304d17);const _0x53d0f5=VisuMZ[_0x19dbde(0x1e9)]['createKeyJS'](this[_0x19dbde(0x1b0)](),_0x19dbde(0x199));VisuMZ[_0x19dbde(0x1e9)]['JS'][_0x53d0f5]&&VisuMZ[_0x19dbde(0x1e9)]['JS'][_0x53d0f5][_0x19dbde(0x1aa)](this,this[_0x19dbde(0x244)](),_0x304d17);},Game_Action['prototype'][_0x1517f9(0x264)]=function(_0x27220a){const _0xe71d04=_0x1517f9;this[_0xe71d04(0x1b4)](_0x27220a),this[_0xe71d04(0x149)](),this[_0xe71d04(0x272)](_0x27220a),this[_0xe71d04(0x1eb)](_0x27220a);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1b4)]=function(_0x5d20be){const _0x3f5639=_0x1517f9,_0x656c3c=VisuMZ['StealItems'][_0x3f5639(0x21f)][_0x3f5639(0x18f)];if(_0x656c3c[_0x3f5639(0x25b)]){const _0x16e8f4=_0x656c3c[_0x3f5639(0x192)],_0x4a0a79=SceneManager[_0x3f5639(0x1ca)][_0x3f5639(0x242)];if(_0x4a0a79&&_0x16e8f4!=='')_0x4a0a79[_0x3f5639(0x1cd)](_0x16e8f4);}},Game_Action['prototype']['processStealItemsNothingSFX']=function(){const _0x5b5eac=_0x1517f9,_0x2236a1=VisuMZ[_0x5b5eac(0x1e9)][_0x5b5eac(0x21f)][_0x5b5eac(0x25f)];if(!_0x2236a1)return;const _0x2ed029=_0x5b5eac(0x176),_0x376b2c={'name':_0x2236a1[_0x5b5eac(0x191)[_0x5b5eac(0x1bf)](_0x2ed029)]||'','volume':_0x2236a1[_0x5b5eac(0x180)[_0x5b5eac(0x1bf)](_0x2ed029)]||0x0,'pitch':_0x2236a1[_0x5b5eac(0x182)[_0x5b5eac(0x1bf)](_0x2ed029)]||0x0,'pan':_0x2236a1['%1_pan'[_0x5b5eac(0x1bf)](_0x2ed029)]||0x0};if(_0x376b2c['name']!=='')AudioManager['playSe'](_0x376b2c);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x272)]=function(_0x2ca838){const _0x4b52f9=_0x1517f9;if(!_0x2ca838)return;const _0x2e58b8=VisuMZ[_0x4b52f9(0x1e9)][_0x4b52f9(0x21f)]['Popup'];if(!_0x2e58b8)return;if(_0x2e58b8[_0x4b52f9(0x151)]==='')return;const _0x190736=_0x2e58b8[_0x4b52f9(0x168)],_0x17630a={'textColor':_0x2e58b8[_0x4b52f9(0x19f)]||0x0,'flashColor':_0x2e58b8[_0x4b52f9(0x19e)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x2e58b8[_0x4b52f9(0x256)]||0x3c};_0x2ca838[_0x4b52f9(0x139)](_0x190736,_0x17630a);},Game_Action[_0x1517f9(0x1d5)][_0x1517f9(0x1eb)]=function(_0x326ee8){const _0x3bdaf6=_0x1517f9;if(!_0x326ee8)return;const _0x4e616e=VisuMZ[_0x3bdaf6(0x1e9)][_0x3bdaf6(0x21f)][_0x3bdaf6(0x1ce)];_0x4e616e&&_0x4e616e[_0x3bdaf6(0x187)]&&_0x4e616e['JsOnStealEmpty'][_0x3bdaf6(0x1aa)](this,this[_0x3bdaf6(0x244)](),_0x326ee8);const _0x404d0e=VisuMZ[_0x3bdaf6(0x1e9)][_0x3bdaf6(0x15a)](this[_0x3bdaf6(0x1b0)](),'JsOnStealNothing');VisuMZ[_0x3bdaf6(0x1e9)]['JS'][_0x404d0e]&&VisuMZ[_0x3bdaf6(0x1e9)]['JS'][_0x404d0e]['call'](this,this[_0x3bdaf6(0x244)](),_0x326ee8);},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x183)]=Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x1c2)],Game_BattlerBase['prototype'][_0x1517f9(0x1c2)]=function(){const _0x15080c=_0x1517f9;this[_0x15080c(0x17c)]={},VisuMZ['StealItems'][_0x15080c(0x183)][_0x15080c(0x1aa)](this);},Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x21b)]=function(_0x5be62e){const _0x490d46=_0x1517f9;return this[_0x490d46(0x17c)]=this['_cache']||{},this['_cache'][_0x5be62e]!==undefined;},Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x169)]=function(){const _0x40ad6d=_0x1517f9;let _0x3fce55=_0x40ad6d(0x169);if(this[_0x40ad6d(0x21b)](_0x3fce55))return this['_cache'][_0x3fce55];return this[_0x40ad6d(0x17c)][_0x3fce55]=this[_0x40ad6d(0x147)](),this[_0x40ad6d(0x17c)][_0x3fce55];},Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x147)]=function(){const _0x1e52ca=_0x1517f9,_0x3eeff5=VisuMZ[_0x1e52ca(0x1e9)][_0x1e52ca(0x212)];let _0x572ec6=0x1;for(const _0x283084 of this[_0x1e52ca(0x201)]()){if(!_0x283084)continue;const _0x2d4de7=_0x283084[_0x1e52ca(0x25a)];_0x2d4de7[_0x1e52ca(0x144)](_0x3eeff5['StealRate'])&&('NiylA'===_0x1e52ca(0x1d8)?(this[_0x1e52ca(0x246)]['hide'](),this[_0x1e52ca(0x246)][_0x1e52ca(0x1f7)](),this[_0x1e52ca(0x160)][_0x1e52ca(0x1f9)](),this[_0x1e52ca(0x160)][_0x1e52ca(0x219)](),_0x476a94[_0x1e52ca(0x1fa)]&&this['_enemyWindow'][_0x1e52ca(0x231)]()):_0x572ec6*=Number(RegExp['$1'])*0.01);}return Math[_0x1e52ca(0x177)](0x0,_0x572ec6);},Game_BattlerBase['prototype']['stealPlus']=function(){const _0x5316df=_0x1517f9;let _0x5bb778=_0x5316df(0x175);if(this[_0x5316df(0x21b)](_0x5bb778))return this[_0x5316df(0x17c)][_0x5bb778];return this['_cache'][_0x5bb778]=this['createStealPlus'](),this[_0x5316df(0x17c)][_0x5bb778];},Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x189)]=function(){const _0x2fcdf8=_0x1517f9,_0x5124fe=VisuMZ[_0x2fcdf8(0x1e9)]['RegExp'];let _0x7f5729=0x0;const _0x75a48=VisuMZ[_0x2fcdf8(0x1e9)][_0x2fcdf8(0x21f)][_0x2fcdf8(0x1ce)];_0x75a48&&_0x75a48['JsBonusSteal']&&(_0x7f5729+=_0x75a48[_0x2fcdf8(0x1c4)][_0x2fcdf8(0x1aa)](this));for(const _0x23fac1 of this['traitObjects']()){if(!_0x23fac1)continue;const _0x170edf=_0x23fac1[_0x2fcdf8(0x25a)];_0x170edf[_0x2fcdf8(0x144)](_0x5124fe[_0x2fcdf8(0x1ff)])&&(_0x7f5729+=Number(RegExp['$1'])*0.01);}return _0x7f5729;},Game_BattlerBase[_0x1517f9(0x1d5)][_0x1517f9(0x1ae)]=function(){const _0x4e3094=_0x1517f9;let _0xb9a5e0=_0x4e3094(0x1ae);if(this[_0x4e3094(0x21b)](_0xb9a5e0))return this[_0x4e3094(0x17c)][_0xb9a5e0];return this[_0x4e3094(0x17c)][_0xb9a5e0]=this[_0x4e3094(0x15e)](),this[_0x4e3094(0x17c)][_0xb9a5e0];},Game_BattlerBase['prototype'][_0x1517f9(0x15e)]=function(){const _0x27f953=_0x1517f9,_0x9e9acd=VisuMZ[_0x27f953(0x1e9)][_0x27f953(0x212)];let _0x1c2267=0x0;const _0x5ef992=VisuMZ[_0x27f953(0x1e9)][_0x27f953(0x21f)][_0x27f953(0x1ce)];_0x5ef992&&_0x5ef992[_0x27f953(0x245)]&&(_0x1c2267+=_0x5ef992[_0x27f953(0x245)][_0x27f953(0x1aa)](this));for(const _0x4217d1 of this[_0x27f953(0x201)]()){if(_0x27f953(0x14e)==='poUGP'){var _0x532e30,_0x3be4bf,_0x567f38;for(_0x567f38=_0x6ef2b['length']-0x1;_0x567f38>0x0;_0x567f38--){_0x532e30=_0x24b957['floor'](_0x5ce778['random']()*(_0x567f38+0x1)),_0x3be4bf=_0x4a7f03[_0x567f38],_0x5a80f9[_0x567f38]=_0x57b12e[_0x532e30],_0x3a7395[_0x532e30]=_0x3be4bf;}return _0x2e4019;}else{if(!_0x4217d1)continue;const _0x43ef59=_0x4217d1[_0x27f953(0x25a)];_0x43ef59[_0x27f953(0x144)](_0x9e9acd[_0x27f953(0x19c)])&&(_0x1c2267+=Number(RegExp['$1'])*0.01);}}return _0x1c2267;},VisuMZ['StealItems'][_0x1517f9(0x217)]=Game_Enemy[_0x1517f9(0x1d5)]['setup'],Game_Enemy['prototype'][_0x1517f9(0x1b5)]=function(_0x475057,_0x1bb16c,_0x46f248){const _0x3f91ba=_0x1517f9;VisuMZ['StealItems']['Game_Enemy_setup'][_0x3f91ba(0x1aa)](this,_0x475057,_0x1bb16c,_0x46f248);if(!Imported['VisuMZ_3_EnemyLevels']){if(_0x3f91ba(0x24a)!=='hRRKz'){const _0x596f80={'type':_0x3f91ba(0x135),'id':_0x103e03[_0x3f91ba(0x270)],'rate':_0x476631[_0x3f91ba(0x1c7)],'stolen':![],'drop':!![]};_0x354994[_0x3f91ba(0x1e9)][_0x3f91ba(0x240)][_0x4158c4['id']][_0x3f91ba(0x18d)](_0x596f80);}else this[_0x3f91ba(0x173)]();}},VisuMZ[_0x1517f9(0x1e9)]['Game_Enemy_setupEnemyLevels']=Game_Enemy['prototype'][_0x1517f9(0x274)],Game_Enemy['prototype'][_0x1517f9(0x274)]=function(){const _0x2ce12b=_0x1517f9;VisuMZ[_0x2ce12b(0x1e9)][_0x2ce12b(0x221)][_0x2ce12b(0x1aa)](this),this[_0x2ce12b(0x173)]();},Game_Enemy[_0x1517f9(0x1d5)][_0x1517f9(0x164)]=function(){const _0x1c78b7=_0x1517f9;if(this[_0x1c78b7(0x26f)]===undefined)this[_0x1c78b7(0x173)]();return this['_stealableItems'];},Game_Enemy[_0x1517f9(0x1d5)][_0x1517f9(0x173)]=function(){const _0x39aae7=_0x1517f9,_0x21cebb=this[_0x39aae7(0x208)]();if(!_0x21cebb)return;this[_0x39aae7(0x26f)]=VisuMZ['StealItems']['StealableItems'](this,_0x21cebb);},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x240)]={},VisuMZ[_0x1517f9(0x1e9)]['StealableItems']=function(_0x2498b5,_0x841e1c){const _0x27b9db=_0x1517f9;if(!_0x841e1c)return[];if(VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']])return JsonEx[_0x27b9db(0x21c)](VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']]);VisuMZ[_0x27b9db(0x1e9)]['StealData'][_0x841e1c['id']]=[];const _0x216162=VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x21f)]['Auto'],_0x2726d4=VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x212)],_0x1ae1df=_0x841e1c[_0x27b9db(0x25a)];if(_0x216162[_0x27b9db(0x19a)]&&_0x841e1c[_0x27b9db(0x270)]>0x0){const _0x3def97={'type':_0x27b9db(0x135),'id':_0x841e1c[_0x27b9db(0x270)],'rate':_0x216162[_0x27b9db(0x1c7)],'stolen':![],'drop':!![]};VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']][_0x27b9db(0x18d)](_0x3def97);}if(_0x216162[_0x27b9db(0x1a5)]){const _0x79687=_0x841e1c['dropItems'];for(const _0x396453 of _0x79687){if(_0x27b9db(0x25d)!=='bBDPE'){if(_0x396453){if('WJNXW'===_0x27b9db(0x13b)){const _0x2b2d4d={'type':_0x27b9db(0x204),'id':_0x396453[_0x27b9db(0x13d)],'rate':0x1/Math[_0x27b9db(0x177)](0x1,_0x396453['denominator'])*_0x216162[_0x27b9db(0x236)],'stolen':![],'drop':!![],'dropIndex':_0x79687[_0x27b9db(0x22a)](_0x396453)};_0x2b2d4d[_0x27b9db(0x22b)]=['none',_0x27b9db(0x178),_0x27b9db(0x179),_0x27b9db(0x170)][_0x396453[_0x27b9db(0x157)]];if(_0x2b2d4d['type']==='none')continue;VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']][_0x27b9db(0x18d)](_0x2b2d4d);}else _0x15f067['all']*=_0x371929(_0x3b92c8['$1'])*0.01;}}else _0x637949[_0x27b9db(0x1b0)]+=_0x3f7c14(_0x13369a['$1'])*0.01;}}const _0x555df3=_0x1ae1df['match'](_0x2726d4[_0x27b9db(0x23b)]);if(_0x555df3)for(const _0xd02688 of _0x555df3){if('ZTOuY'!=='SArZN'){if(!_0xd02688)continue;_0xd02688[_0x27b9db(0x144)](_0x2726d4[_0x27b9db(0x23b)]);const _0x332d50=String(RegExp['$1'])[_0x27b9db(0x23e)](),_0x1e0e69=Number(RegExp['$2'])*0.01,_0x309c38=VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x23c)](_0x332d50,_0x1e0e69);if(!!_0x309c38)VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']][_0x27b9db(0x18d)](_0x309c38);}else _0x57c0ff=_0x11e138[_0x486fbe['id']];}if(_0x1ae1df[_0x27b9db(0x144)](_0x2726d4['StealableItemBatch'])){if('coner'===_0x27b9db(0x14d)){let _0x494fd1=_0x27b9db(0x175);if(this[_0x27b9db(0x21b)](_0x494fd1))return this['_cache'][_0x494fd1];return this[_0x27b9db(0x17c)][_0x494fd1]=this['createStealPlus'](),this['_cache'][_0x494fd1];}else{const _0x3ea53d=String(RegExp['$1'])[_0x27b9db(0x1ea)](/[\r\n]+/);for(const _0x29eaf5 of _0x3ea53d){if(_0x29eaf5[_0x27b9db(0x144)](/(.*):[ ](.*)([%％])/i)){if(_0x27b9db(0x20c)!==_0x27b9db(0x20c))_0xcdf0c5[_0x27b9db(0x16e)]=_0x51eaf9[_0x27b9db(0x1e9)]['JS'][_0x3ed7de][_0x27b9db(0x1aa)](_0x5b008f,_0x1848b0[_0x27b9db(0x244)](),_0x4c6982,_0x731822[_0x27b9db(0x16e)]);else{const _0x5df21b=String(RegExp['$1'])[_0x27b9db(0x23e)](),_0x34a753=Number(RegExp['$2'])*0.01,_0x4eb929=VisuMZ[_0x27b9db(0x1e9)]['ParseStealObject'](_0x5df21b,_0x34a753);if(!!_0x4eb929)VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']]['push'](_0x4eb929);}}}}}return JsonEx[_0x27b9db(0x21c)](VisuMZ[_0x27b9db(0x1e9)][_0x27b9db(0x240)][_0x841e1c['id']]);},VisuMZ[_0x1517f9(0x1e9)]['ParseStealObject']=function(_0x551c5c,_0x1f71b1){const _0x9706c6=_0x1517f9,_0x26880f={'type':_0x9706c6(0x204),'id':0x0,'rate':_0x1f71b1,'stolen':![],'drop':![]};_0x551c5c[_0x9706c6(0x144)](/GOLD[ ](\d+)/i)&&(_0x26880f[_0x9706c6(0x22b)]=_0x9706c6(0x135),_0x26880f['id']=Number(RegExp['$1']));if(_0x551c5c['match'](/ITEM[ ](\d+)/i)){if(_0x9706c6(0x239)===_0x9706c6(0x195)){if(_0x5dbe0a['stolen'])return 0x0;}else _0x26880f[_0x9706c6(0x22b)]=_0x9706c6(0x178),_0x26880f['id']=Number(RegExp['$1']);}else _0x551c5c[_0x9706c6(0x144)](/ITEM[ ](.*)/i)&&(_0x26880f[_0x9706c6(0x22b)]=_0x9706c6(0x178),_0x26880f['id']=DataManager[_0x9706c6(0x14b)](RegExp['$1']));if(_0x551c5c[_0x9706c6(0x144)](/WEAPON[ ](\d+)/i))_0x26880f['type']=_0x9706c6(0x179),_0x26880f['id']=Number(RegExp['$1']);else _0x551c5c[_0x9706c6(0x144)](/WEAPON[ ](.*)/i)&&(_0x9706c6(0x214)===_0x9706c6(0x253)?(_0x2edf15[_0x9706c6(0x22b)]='ITEM',_0x309a81['id']=_0x4565f4[_0x9706c6(0x14b)](_0x387d08['$1'])):(_0x26880f['type']=_0x9706c6(0x179),_0x26880f['id']=DataManager['getWeaponIdWithName'](RegExp['$1'])));if(_0x551c5c[_0x9706c6(0x144)](/ARMOR[ ](\d+)/i)){if(_0x9706c6(0x23f)==='XwdgF')_0x26880f['type']=_0x9706c6(0x170),_0x26880f['id']=Number(RegExp['$1']);else{this[_0x9706c6(0x153)]=_0x1cfc90[_0x9706c6(0x142)]();const _0x42207a=_0x4c5397[_0x9706c6(0x164)]();this[_0x9706c6(0x26b)]=_0x42207a[_0x9706c6(0x22a)](_0x6d8fbc);}}else _0x551c5c[_0x9706c6(0x144)](/ARMOR[ ](.*)/i)&&(_0x26880f[_0x9706c6(0x22b)]=_0x9706c6(0x170),_0x26880f['id']=DataManager['getArmorIdWithName'](RegExp['$1']));return _0x26880f;},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x18a)]=Game_Enemy[_0x1517f9(0x1d5)][_0x1517f9(0x270)],Game_Enemy[_0x1517f9(0x1d5)][_0x1517f9(0x270)]=function(){const _0x17d8cc=_0x1517f9,_0x74d24=VisuMZ['StealItems'][_0x17d8cc(0x21f)][_0x17d8cc(0x1a6)];if(_0x74d24[_0x17d8cc(0x19a)]&&_0x74d24[_0x17d8cc(0x215)]){const _0x5b3023=this[_0x17d8cc(0x164)]();for(const _0x4cf0a7 of _0x5b3023){if(!_0x4cf0a7)continue;if(_0x4cf0a7[_0x17d8cc(0x15f)]&&_0x4cf0a7[_0x17d8cc(0x22b)]===_0x17d8cc(0x135)){if('lvjud'!==_0x17d8cc(0x262)){if(_0x4cf0a7[_0x17d8cc(0x1dd)])return 0x0;}else{const _0x5c30b9=_0x113d68['inputtingAction'](),_0x2567a3=_0xcfec99['members']()[this['_enemyWindow'][_0x17d8cc(0x13c)]()],_0x4a10a2=this[_0x17d8cc(0x246)][_0x17d8cc(0x1b0)]();_0x5c30b9[_0x17d8cc(0x235)](_0x2567a3,_0x4a10a2),_0x557f6d[_0x17d8cc(0x1e9)][_0x17d8cc(0x232)][_0x17d8cc(0x1aa)](this);}}}}return VisuMZ['StealItems'][_0x17d8cc(0x18a)]['call'](this);},VisuMZ['StealItems'][_0x1517f9(0x24e)]=Game_Enemy[_0x1517f9(0x1d5)]['makeDropItems'],Game_Enemy[_0x1517f9(0x1d5)][_0x1517f9(0x225)]=function(){const _0x3519a5=_0x1517f9,_0x26beb9=JsonEx['makeDeepCopy'](this[_0x3519a5(0x208)]()['dropItems']),_0xd78202=VisuMZ[_0x3519a5(0x1e9)][_0x3519a5(0x21f)][_0x3519a5(0x1a6)];if(_0xd78202['AutoItem']&&_0xd78202['ItemRemoval']){if('Lceju'!==_0x3519a5(0x259)){const _0x35dd91=_0x51c773['inputtingAction']();this[_0x3519a5(0x246)]&&_0x35dd91[_0x3519a5(0x20d)]()?this['startStealSnatchSelection']():_0x1b7fb3['StealItems'][_0x3519a5(0x232)][_0x3519a5(0x1aa)](this);}else{const _0x4744ce=this[_0x3519a5(0x164)]();for(const _0x42165d of _0x4744ce){if(!_0x42165d)continue;if(_0x42165d[_0x3519a5(0x15f)]&&_0x42165d[_0x3519a5(0x22b)]!=='GOLD'){if(_0x3519a5(0x152)!==_0x3519a5(0x152))_0xf373b=this[_0x3519a5(0x233)](_0x5d0391);else{if(!_0x42165d['stolen'])continue;const _0x425862=_0x42165d[_0x3519a5(0x1c3)],_0x5f42d9=this[_0x3519a5(0x208)]()[_0x3519a5(0x13a)][_0x425862];_0x5f42d9['kind']=0x0;}}}}}let _0x2eb640=VisuMZ[_0x3519a5(0x1e9)]['Game_Enemy_makeDropItems']['call'](this);return this[_0x3519a5(0x208)]()[_0x3519a5(0x13a)]=_0x26beb9,_0x2eb640;},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x1bb)]=Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x1ef)],Scene_Battle[_0x1517f9(0x1d5)]['createEnemyWindow']=function(){const _0x276cd1=_0x1517f9;VisuMZ['StealItems']['Scene_Battle_createEnemyWindow']['call'](this),this[_0x276cd1(0x14c)]();},Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x14c)]=function(){const _0x1e2503=_0x1517f9,_0x21c752=this[_0x1e2503(0x1b2)]();this['_stealSnatchWindow']=new Window_StealSnatch(_0x21c752),this[_0x1e2503(0x246)][_0x1e2503(0x1b3)](this[_0x1e2503(0x226)]),this[_0x1e2503(0x246)][_0x1e2503(0x1f3)]('ok',this[_0x1e2503(0x18b)][_0x1e2503(0x154)](this)),this[_0x1e2503(0x246)][_0x1e2503(0x1f3)](_0x1e2503(0x26d),this[_0x1e2503(0x1e6)][_0x1e2503(0x154)](this)),this['addWindow'](this['_stealSnatchWindow']);},VisuMZ[_0x1517f9(0x1e9)]['Scene_Battle_isAnyInputWindowActive']=Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x22c)],Scene_Battle['prototype'][_0x1517f9(0x22c)]=function(){const _0x2ba0ad=_0x1517f9;if(this[_0x2ba0ad(0x246)]&&this[_0x2ba0ad(0x246)][_0x2ba0ad(0x16b)])return!![];return VisuMZ['StealItems'][_0x2ba0ad(0x1f8)][_0x2ba0ad(0x1aa)](this);},VisuMZ['StealItems'][_0x1517f9(0x14a)]=Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x1bc)],Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x1bc)]=function(){const _0x26994c=_0x1517f9;VisuMZ[_0x26994c(0x1e9)][_0x26994c(0x14a)][_0x26994c(0x1aa)](this),this[_0x26994c(0x246)]&&(this[_0x26994c(0x246)]['deactivate'](),this['_stealSnatchWindow']['hide']());},VisuMZ[_0x1517f9(0x1e9)][_0x1517f9(0x232)]=Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x156)],Scene_Battle['prototype']['onEnemyOk']=function(){const _0x1dfdc2=_0x1517f9,_0x1c3dea=BattleManager['inputtingAction']();this[_0x1dfdc2(0x246)]&&_0x1c3dea[_0x1dfdc2(0x20d)]()?this[_0x1dfdc2(0x1d3)]():VisuMZ[_0x1dfdc2(0x1e9)][_0x1dfdc2(0x232)][_0x1dfdc2(0x1aa)](this);},Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x1d3)]=function(){const _0x1fbabb=_0x1517f9,_0x376958=$gameTroop['members']()[this[_0x1fbabb(0x160)][_0x1fbabb(0x13c)]()],_0x163c2f=BattleManager[_0x1fbabb(0x198)]();this[_0x1fbabb(0x246)][_0x1fbabb(0x251)](_0x376958,_0x163c2f),this['_stealSnatchWindow'][_0x1fbabb(0x1c2)](),this[_0x1fbabb(0x246)]['show'](),this[_0x1fbabb(0x246)]['activate']();},Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x18b)]=function(){const _0x4931c6=_0x1517f9,_0x4d997c=BattleManager['inputtingAction'](),_0x2ac085=$gameTroop['members']()[this[_0x4931c6(0x160)][_0x4931c6(0x13c)]()],_0x12dbcb=this[_0x4931c6(0x246)]['item']();_0x4d997c[_0x4931c6(0x235)](_0x2ac085,_0x12dbcb),VisuMZ[_0x4931c6(0x1e9)]['Scene_Battle_onEnemyOk'][_0x4931c6(0x1aa)](this);},Scene_Battle[_0x1517f9(0x1d5)][_0x1517f9(0x1e6)]=function(){const _0x53ddfa=_0x1517f9;this[_0x53ddfa(0x246)][_0x53ddfa(0x21e)](),this['_stealSnatchWindow']['deactivate'](),this['_enemyWindow'][_0x53ddfa(0x1f9)](),this[_0x53ddfa(0x160)][_0x53ddfa(0x219)](),Imported[_0x53ddfa(0x1fa)]&&this['_enemyWindow'][_0x53ddfa(0x231)]();},Window_BattleLog['prototype']['addStealText']=function(_0xc686b9){const _0x55d7f2=_0x1517f9;this[_0x55d7f2(0x16d)][_0x55d7f2(0x18d)](_0xc686b9),this[_0x55d7f2(0x1c2)]();};function Window_StealSnatch(){const _0x43f320=_0x1517f9;this[_0x43f320(0x23a)](...arguments);}Window_StealSnatch[_0x1517f9(0x1d5)]=Object[_0x1517f9(0x1de)](Window_ItemList[_0x1517f9(0x1d5)]),Window_StealSnatch[_0x1517f9(0x1d5)][_0x1517f9(0x26a)]=Window_StealSnatch,Window_StealSnatch['prototype'][_0x1517f9(0x23a)]=function(_0x291124){const _0x19c780=_0x1517f9;Window_ItemList[_0x19c780(0x1d5)][_0x19c780(0x23a)][_0x19c780(0x1aa)](this,_0x291124),this['hide'](),this[_0x19c780(0x254)]=null,this[_0x19c780(0x1c5)]=null;},Window_StealSnatch[_0x1517f9(0x1d5)][_0x1517f9(0x251)]=function(_0x5d6632,_0x4e5ad3){const _0x5f5d76=_0x1517f9;this[_0x5f5d76(0x254)]=_0x5d6632,this[_0x5f5d76(0x1c5)]=_0x4e5ad3,this[_0x5f5d76(0x1c2)](),this['show'](),this[_0x5f5d76(0x258)](0x0);},Window_StealSnatch[_0x1517f9(0x1d5)][_0x1517f9(0x265)]=function(){const _0x15d9a1=_0x1517f9;this['_data']=[];if(!this[_0x15d9a1(0x254)])return;const _0xaea629=VisuMZ['StealItems'][_0x15d9a1(0x17d)](this[_0x15d9a1(0x1c5)],this['_enemy']);if(_0xaea629['types']['length']<=0x0)return;this['_data']=this[_0x15d9a1(0x254)]['getStealableItems']()['filter'](_0x46ad08=>{const _0x495ec8=_0x15d9a1;return _0xaea629[_0x495ec8(0x210)][_0x495ec8(0x137)](_0x46ad08[_0x495ec8(0x22b)]);});},Window_StealSnatch[_0x1517f9(0x1d5)][_0x1517f9(0x138)]=function(_0x3abfcd){return _0x3abfcd&&!_0x3abfcd['stolen'];},Window_StealSnatch['prototype'][_0x1517f9(0x15c)]=function(){const _0xdec3b9=_0x1517f9;if(this[_0xdec3b9(0x1a7)])return this[_0xdec3b9(0x1a7)];return this[_0xdec3b9(0x1a7)]=this[_0xdec3b9(0x19b)](_0xdec3b9(0x1a3)),this['_numberWidth']=Math[_0xdec3b9(0x177)](this[_0xdec3b9(0x1a7)],this[_0xdec3b9(0x1e7)](TextManager[_0xdec3b9(0x228)])['width']),this[_0xdec3b9(0x1a7)];},Window_StealSnatch['prototype']['drawItemName']=function(_0x496a50,_0x3d14af,_0x5c017e,_0x2be9c0){const _0x555567=_0x1517f9;if(!_0x496a50)return;switch(_0x496a50[_0x555567(0x22b)]['toUpperCase']()[_0x555567(0x23e)]()){case _0x555567(0x135):const _0x3f57b3=TextManager[_0x555567(0x159)][_0x555567(0x1bf)](_0x555567(0x1d6)[_0x555567(0x1bf)](ImageManager['snatchGoldIcon']),_0x496a50['id'],TextManager[_0x555567(0x18c)]);this[_0x555567(0x26c)](_0x3f57b3,_0x3d14af,_0x5c017e);break;case'ITEM':Window_Base[_0x555567(0x1d5)]['drawItemName'][_0x555567(0x1aa)](this,$dataItems[_0x496a50['id']],_0x3d14af,_0x5c017e,_0x2be9c0);break;case _0x555567(0x179):Window_Base['prototype'][_0x555567(0x1e0)]['call'](this,$dataWeapons[_0x496a50['id']],_0x3d14af,_0x5c017e,_0x2be9c0);break;case'ARMOR':Window_Base[_0x555567(0x1d5)][_0x555567(0x1e0)][_0x555567(0x1aa)](this,$dataArmors[_0x496a50['id']],_0x3d14af,_0x5c017e,_0x2be9c0);break;}},Window_StealSnatch['prototype'][_0x1517f9(0x1fc)]=function(_0x5e62a5,_0x1afdce,_0xad5260,_0x1b90d2){const _0x2bd583=_0x1517f9;if(_0x5e62a5[_0x2bd583(0x1dd)]){const _0x8d90c7=TextManager[_0x2bd583(0x228)];_0x1afdce+=_0x1b90d2-this[_0x2bd583(0x1e7)](_0x8d90c7)[_0x2bd583(0x17f)],this[_0x2bd583(0x26c)](_0x8d90c7,_0x1afdce,_0xad5260);}else{if(VisuMZ[_0x2bd583(0x1e9)][_0x2bd583(0x21f)][_0x2bd583(0x25c)][_0x2bd583(0x24f)]){const _0x593822=VisuMZ[_0x2bd583(0x1e9)]['DetermineStealData'](this[_0x2bd583(0x1c5)],this[_0x2bd583(0x254)]);let _0xb2861d=_0x593822['rate'][_0x2bd583(0x16e)]*_0x5e62a5[_0x2bd583(0x224)],_0x3d431b=_0x593822['plus'][_0x2bd583(0x16e)];_0xb2861d*=_0x593822[_0x2bd583(0x224)][_0x5e62a5['type'][_0x2bd583(0x1c9)]()],_0x3d431b+=_0x593822['plus'][_0x5e62a5[_0x2bd583(0x22b)][_0x2bd583(0x1c9)]()];let _0x253b5=(_0xb2861d+_0x3d431b)[_0x2bd583(0x22f)](0x0,0x1)*0x64;_0x253b5>0x0&&_0x253b5<0x64&&(_0x253b5=_0x253b5[_0x2bd583(0x220)](0x2)),_0x253b5=String(_0x253b5)+'%',_0x1afdce+=_0x1b90d2-this[_0x2bd583(0x1e7)](_0x253b5)[_0x2bd583(0x17f)],this['drawTextEx'](_0x253b5,_0x1afdce,_0xad5260);}}},Window_StealSnatch[_0x1517f9(0x1d5)][_0x1517f9(0x1a9)]=function(_0x4dbd10){const _0x20f6aa=_0x1517f9;if(this[_0x20f6aa(0x226)])switch(_0x4dbd10['type'][_0x20f6aa(0x1d2)]()[_0x20f6aa(0x23e)]()){case _0x20f6aa(0x135):this[_0x20f6aa(0x226)][_0x20f6aa(0x211)](TextManager[_0x20f6aa(0x1c1)]);break;case _0x20f6aa(0x178):this[_0x20f6aa(0x226)][_0x20f6aa(0x1b7)]($dataItems[_0x4dbd10['id']]);break;case'WEAPON':this[_0x20f6aa(0x226)][_0x20f6aa(0x1b7)]($dataWeapons[_0x4dbd10['id']]);break;case _0x20f6aa(0x170):this['_helpWindow'][_0x20f6aa(0x1b7)]($dataArmors[_0x4dbd10['id']]);break;}};