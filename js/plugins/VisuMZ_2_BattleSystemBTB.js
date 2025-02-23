//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
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
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x52f9=['updateTurnOrderBTB','1mpAiCL','Class-%1-%2','getChildIndex','SXYzB','btbParseFusionData','right','checkActionsBTB','_turnOrderContainer','PgmWn','2698ISULOB','createBTBTurnOrderWindow','_btbItemStrictFusion','BtbTurnOrderActorFace','ShowMarkerBg','isBattleItemWindowBTB','speed','9691DRJAdP','remove','_skillIDs','updateLetter','loseBravePoints','cursorPagedown','_weapons','qHhtR','ARRAYJSON','aFiah','drawTextEx','maxBravePoints','Window_Base_drawItemNumber','ParseAllNotetags','_bravePoints','fisyG','_btbTurnOrderGraphicType','loadSvActor','_btbActionSprite','QesKJ','BXAdv','UpdateFrames','maxBattleMembers','createBattlerSprites','OnHLF','KTfgb','BattleCore','gradientFillRect','2158569YkCpYr','canProcessActionFusionsBTB','bitmap','calculateTargetPositions','isActor','BTB_MIN_BRAVEPOINTS_HARD_CAP','createBattlerRect','DrawActionCountersJS','updateTurnOrder','%1BgColor1','version','itemLineRect','split','Window_Help_setItem','cancel','QkRJS','battlerName','initHomePositions','BattleManager_battleSys','tTxQk','_btbTurnOrderWindow','hasSvBattler','waitForAnimation','NUM','isEnemy','includes','predictedBravePointCost','RepositionTopHelpX','mainFontFace','requestRefresh','changeFaceGraphicBitmap','EnemyBattlerType','ItemsEquipsCore','mDAfn','onTurnEnd','sMbBu','nJVsM','DSYuK','ActionSlot','_graphicHue','klMoW','isSkipPartyCommandWindow','lKBEx','currentSymbol','initialize','QaXop','BJdKt','Visible','iconHeight','ErJba','RcICo','icon','zvTFI','\x5cI[%1]','update','_scene','visible','addCommand','btbBravePointsFull','getSkillIdWithName','createBorderSprite','Actor','compareBattlerSprites','showBravePoints','_ogWindowLayerX','BravePointAlterTarget','onBattleStartBTB','getActionFusionRecipeSkills','makeSpeed','LwfFG','createAllWindows','MvqsY','_homeY','DisplayPosition','Scene_Battle_createActorCommandWindow','addChildAt','tRjJB','process_VisuMZ_BattleSystemBTB_JS','ZLaTJ','call','_graphicFaceIndex','RWTGO','_containerHeight','enemy','BtbTurnOrderClearEnemyGraphic','lzegS','EnemyActionFusions','SpriteThin','setHue','formFlexCombo','Window_Selectable_select','Scene_Boot_onDatabaseLoaded','BravePointSetUser','_actions','pThVw','regenerateBravePoints','isTurnBased','BTB_MAX_ACTIONS_HARD_CAP','Settings','Game_System_initialize','TurnOrderBTBGraphicFaceIndex','_letterSprite','Parse_Notetags_BravePointsUserJS','performCollapse','_scrollX','BattleManager_startTurn','_graphicFaceName','JsBravePointsTarget','btbPayItemFusionCosts','Game_BattlerBase_canUse','11HZtBwA','onDatabaseLoaded','ParseItemNotetags','_actor','Game_BattlerBase_hide','BravePointPredictedCost','\x5cC[%1]%2\x5cC[0]','lJSQK','Game_Action_speed','prototype','OKPkE','BravePointCost','numItems','fbfxy','FaceName','_position','makeActionTimes','iZCEZ','isSideView','BattleManager_makeActionOrders','UfJnh','isAlive','addInnerChild','BraveAnimation','createGraphicSprite','iKvqF','jFEuz','EnemyBattlerFontSize','ShowFacesListStyle','initMembers','allowRandomSpeed','Window_BattleStatus_drawItemStatusXPStyle','splice','ScreenBuffer','updateVisibility','btbBravePointsIcon','SubjectDistance','trim','Scene_Battle_onDisabledPartyCommandSelection','_graphicIconIndex','startTurn','guardSkillId','requestFauxAnimation','_tempBattler','filter','BravePointRegen','Game_BattlerBase_canGuard','canActionFusionWithBTB','1628594KjDkAs','TurnOrderBTBGraphicIconIndex','hyQGa','Window_Base_makeAdditionalSkillCostText','_graphicEnemy','modifyBTBActionCounterSprite_Fallback','iconWidth','some','bravePointsCost','TWjch','Game_Action_setItem','makeDeepCopy','getOffsetY_BTB','grSKZ','osGUk','\x5cI[%1]%2','hzvKb','actor','BravePointsIcon','isTpb','skillCostSeparator','index','Window_Base_close','optDisplayTp','_actionBattlers','setup','parameters','defaultPosition','Game_Battler_onTurnEnd','_items','IconSet','_fadeDuration','applyItemBattleSystemBTBUserEffect','bitmapHeight','_fullHeight','battler','process_VisuMZ_BattleSystemBTB_Notetags','xuVfU','padding','Window_ActorCommand_makeCommandList','indexOf','NamTO','status','jEGeG','cursorPageup','faceIndex','PBdrT','performBrave','BravePointsAbbr','height','_graphicSprite','canGuard','note','lineHeight','onBattleStart','Armor-%1-%2','zKgMg','BattleSystemBTB','applyBattleItemWindowBTB','repeat','children','FaceIndex','svBattlerName','npaSi','_guardUnleash','ARRAYEVAL','WaitFrames','textSizeEx','makeAdditionalSkillCostText','EnemyBattlerFaceName','getActionFusionCombinationsBTB','destroyBTBActionCounters','zPXcr','TurnOrderBTBGraphicFaceName','Show_1_BP_Cost','Window','getActionFusionRecipeItems','select','_containerWidth','concat','BattleManager_startAction','text','registerCommand','_logWindow','BtbTurnOrderClearActorGraphic','setActionFusionBTB','createBTBActionCounters','drawItemNumberBTB','btbPaySkillFusionCosts','ShowCommand','bottom','BravePointSkillCost','_btbItemFlexFusion','sort','JeoJd','uVYnf','%1BgColor2','_itemIDs','addBraveCommand','_armors','TurnOrderBTBGraphicType','clamp','BattleManager_isActiveTpb','drawItemNumber','createTurnOrderBTBGraphicType','createLetterSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','FUNC','containerWindow','left','mngdT','_ogWindowLayerY','itemRectPortraitBTB','bitmapWidth','useItem','toUpperCase','Game_Party_removeActor','RepositionTopHelpY','_homeX','ooEgU','process_VisuMZ_BattleSystemBTB','onTurnEndBTB','fontFace','startActionBTB','updateOpacity','getBattleSystem','cqNeK','refresh','constructor','StatusPredictFmt','updateSelectionEffect','applyBattleSystemBTBUserEffect','BravePointsFull','%1\x20%2\x20%3','_actionFusionRecipe','addChild','BtbTurnOrderActorIcon','sortActionOrdersBTB','ParseSkillNotetags','isBattleSystemBTBTurnOrderVisible','GNtoV','showBraveAnimationBTB','Window_BattleLog_startAction','_index','DokDv','currentAction','_btbSkillFlexFusion','btbRegisterFusions','hideBraveTrait','YJGwz','BTB_MAX_ACTIONS_DEFAULT','BravePointItemCost','BTB_MAX_BRAVEPOINTS_DEFAULT','updateBattleContainerOrder','battleSys','close','ShowEnemyBrave','BravePointCostFmt','General','canInput','JSON','Game_Action_setSkill','IalhT','HMKOl','_homeDuration','MohaD','BtbTurnOrderEnemyFace','fontSize','Scene_Battle_createAllWindows','test','yThvm','getTotalActionFusionRecipes','reduceBrave','createInitialPositions','getAlignmentBTB','setText','btbBraveCommand','slice','showNormalAnimation','_actorCommandWindow','BFEMv','Enemies','textWidth','_targetIndex','btbActionSlot','isSceneBattle','recalculateHome','loadSvEnemy','ShowMarkerBorder','_unit','Mechanics','%1-%2','isSTB','MinBravePoints','BattleManager_startInput','_isAppeared','queueBraveAnimationsBTB','EnemyBattlerFaceIndex','ItemQuantityFmt','_targetHomeY','currentExt','clearTurnOrderBTBGraphics','Window_BattleStatus_drawItemStatusListStyle','ipZnH','createTurnOrderBTBGraphicFaceIndex','GQnoJ','MaxActions','Ronll','_positionTargetY','Game_Battler_makeActionTimes','boxHeight','_helpWindow','join','Cancel','map','attackSkillId','isInputting','subject','appear','attack','waitCount','RepositionTopForHelp','BraveAnimationID','pZTBo','isItem','DisplayOffsetX','_targetHomeX','uQjJs','isForFriend','_isAlive','face','EHnvq','drawText','CaMQl','GXwED','yPlwZ','_backgroundSprite','onDisabledPartyCommandSelection','ARRAYFUNC','removeChild','LvOSR','_isBattleOver','Game_Actor_makeActions','width','initBattleSystemBTB','CostPosition','battlerHue','resetFontSettings','152334DDVmJO','push','createKeyJS','faceWidth','containerPosition','yRZIm','NXPps','isDrawItemNumber','_turnOrderInnerSprite','NegativeColor','AllowRandomSpeed','minBravePoints','ARRAYSTR','setSkill','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','CkLWY','opacity','_btbSkillStrictFusion','_braveStartupAnimation','EnemyBattlerDrawLetter','BorderThickness','%1Mute','_subject','makeMultiActionsBTB','braveAnimationTimes','addLoadListener','Actor-%1-%2','FusionFlex','ZNiXY','ARRAYNUM','_positionDuration','Enemy','createTurnOrderBTBGraphicIconIndex','description','CenterHorz','MaxHorzSprites','_surprise','TurnOrder','makeCommandList','_btbTurnOrderFaceName','Chftn','ConvertParams','dbJyf','DYDdz','oQkVn','predictedBravePoints','2167wEpHgY','isUsePageUpDnShortcutBTB','FTKWD','FusionStrict','singleSkill','ceil','max','ItemScene','getColor','csNOX','applyItemUserEffect','%1AnimationID','RepositionLogWindow','createChildren','Skill-%1-%2','changeIconGraphicBitmap','drawItemStatusListStyle','%1_align','%1SystemBg','useItemBTB','drawActorBravePoints','BravePointStartNeutral','lZHRo','_graphicSv','_btbTurnOrderIconIndex','%1SystemBorder','destroy','Game_Unit_makeActions','_letter','makeAdditionalCostTextBTB','1192909mUSOYD','canAddBraveCommand','ActorBattlerIcon','makeActionOrders','cannotBraveTrait','isActiveTpb','EnableFusion','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createTestBitmap','Window_Selectable_cursorPageup','top','BTB_MIN_BRAVEPOINTS_DEFAULT','faceName','Game_Action_allowRandomSpeed','calcRegenBravePoints','XgATT','cancelBrave','battleLayoutStyle','FbnDA','SpriteLength','loadEnemy','_positionTargetX','commandBrave','_plural','repositionLogWindowBTB','8HHLmbO','MaxVertSprites','BravePointsRegenAlive','isAppeared','MinBravePointsHardCap','ZOIgZ','BattleLayout','isSkill','BTB_Help','Game_Battler_useItem','CalcActionSpeedJS','removeActionFusionIngredients','MmLya','hide','%1_display','%1Mirror','setBravePoints','QjXkm','Game_Enemy_makeActions','CannotFusion','updateGraphicHue','zMeDc','traitObjects','getItemIdWithName','needsSelection','startAction','checkOpacity','isHorz','nAzod','gqZXo','fillRect','faceHeight','mvbdI','getOffsetX_BTB','AzMEt','loadSystem','format','exit','brave','fecAK','ghlzi','Game_BattlerBase_appear','updateGraphic','setItem','Window_ActorCommand_addGuardCommand','canUse','shift','_bypassAiValidCheck','Game_Battler_onBattleStart','MaxBravePoints','UlCUr','Actors','NeutralColor','drawItemStatusXPStyle','createBackgroundSprite','isBTB','_actionInputIndex','BTB_MAX_BRAVEPOINTS_HARD_CAP','center','MoVFm','selectNextCommand','addGuardCommand','pvkQu','startFade','checkPosition','btbMatchesCurrentFusionAction','SystemTurnOrderVisibility','updateHomePosition','removeActor','ActionCurrent','PositiveColor','RegExp','round','checkTargetPositions','BattleManager_isTpb','_scrollY','match','btbBravePointsAbbr','%1BorderColor','_fadeTarget','Game_Action_applyItemUserEffect','clearRect','_btbTurnOrderVisible','svactor','createActorCommandWindowBTB','processUpdateGraphic','IconIndex','create','createActorCommandWindow','bravePoints','BravePointAlterUser','Window_Selectable_cursorPagedown','createTurnOrderBTBGraphicFaceName','ReduceShownBPCost','btbActionCurrent','setAttack','item','updatePosition','_graphicType','btbCostFormat','pmvey','_fullWidth','startInput','name','updateSidePosition','makeActions','setBTBGraphicIconIndex','698NncGhC','length','_phase','_btbTurnOrderFaceIndex','pop','refreshStatusBTB','auBfm','BattleManager_isTurnBased','substring','Game_BattlerBase_canInput','commandCancel','ItemQuantityFontSize','anchor','floor','canBrave','BtbTurnOrderEnemyIcon','Weapon-%1-%2','oWyct','KwONO','min','itemRect','oZmpj','EUyMN','yekZc','RioMB','Game_Battler_performCollapse','numActions','canPayActionFusionCombination','_statusWindow','allBattleMembers','removeActionBattlersBTB','BravePointBattleStart','payBravePointsCost','Show_0_BP_Cost','OrderDirection','IrLHz','changeEnemyGraphicBitmap','parse','JsBravePointsUser','active','STRUCT','setBattleSystemBTBTurnOrderVisible','BTB','LWRfy','BravePointRegenBase','maxBraveActions','inputtingAction','members','SDKvZ','clearActions','battleEnd','contents','setHandler','ActorActionFusions','359KmKopW','changeSvActorGraphicBitmap','gainBravePoints','_windowLayer','windowRect','RnooX','setGuard','blt','VyluR','bind','Brave','ActorBattlerType','#000000','CommandName','HCyfe','processActionFusionsBTB'];const _0x4f4031=_0x23ad;function _0x23ad(_0x2ebd57,_0x3d5d82){_0x2ebd57=_0x2ebd57-0x13e;let _0x52f91b=_0x52f9[_0x2ebd57];return _0x52f91b;}(function(_0x598584,_0x15ddeb){const _0x1dc6c1=_0x23ad;while(!![]){try{const _0x994c04=-parseInt(_0x1dc6c1(0x335))*-parseInt(_0x1dc6c1(0x26a))+-parseInt(_0x1dc6c1(0x345))*-parseInt(_0x1dc6c1(0x283))+parseInt(_0x1dc6c1(0x24c))*-parseInt(_0x1dc6c1(0x2ee))+-parseInt(_0x1dc6c1(0x33e))*parseInt(_0x1dc6c1(0x324))+-parseInt(_0x1dc6c1(0x3cf))*-parseInt(_0x1dc6c1(0x21e))+-parseInt(_0x1dc6c1(0x3ff))+parseInt(_0x1dc6c1(0x361));if(_0x994c04===_0x15ddeb)break;else _0x598584['push'](_0x598584['shift']());}catch(_0xf0a9bf){_0x598584['push'](_0x598584['shift']());}}}(_0x52f9,0xf2e7a));var label=_0x4f4031(0x15f),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x519027){const _0x5a6fdf=_0x4f4031;return _0x519027[_0x5a6fdf(0x150)]&&_0x519027[_0x5a6fdf(0x23f)][_0x5a6fdf(0x37a)]('['+label+']');})[0x0];VisuMZ[label][_0x4f4031(0x3c3)]=VisuMZ[label][_0x4f4031(0x3c3)]||{},VisuMZ[_0x4f4031(0x247)]=function(_0x394a7d,_0x5eb27d){const _0x3ea3ca=_0x4f4031;for(const _0x4de897 in _0x5eb27d){if(_0x4de897['match'](/(.*):(.*)/i)){if(_0x3ea3ca(0x1f1)!==_0x3ea3ca(0x1f1)){function _0xdc364f(){const _0x2c39a5=_0x3ea3ca;if(!this[_0x2c39a5(0x29e)]())return;const _0x5b9ff4=_0x22fcc0[_0x2c39a5(0x15f)][_0x2c39a5(0x3c3)][_0x2c39a5(0x243)];if(!_0x5b9ff4[_0x2c39a5(0x240)])return;const _0x162e53=_0x1dad1f[_0x2c39a5(0x31d)]()[_0x2c39a5(0x3fb)](_0x3c5b28=>_0x3c5b28&&_0x3c5b28['isAlive']()&&_0x3c5b28[_0x2c39a5(0x286)]())[_0x2c39a5(0x2ef)],_0x496a02=_0x548986[_0x2c39a5(0x31d)]()[_0x2c39a5(0x3fb)](_0x17b355=>_0x17b355&&_0x17b355[_0x2c39a5(0x3e4)]()&&_0x17b355[_0x2c39a5(0x286)]())[_0x2c39a5(0x2ef)],_0x30ab01=this[_0x2c39a5(0x367)](_0x162e53,_0x496a02);this[_0x2c39a5(0x208)]=_0x30ab01['x'],this[_0x2c39a5(0x1ed)]=_0x30ab01['y'],(this[_0x2c39a5(0x208)]!==this[_0x2c39a5(0x19c)]||this[_0x2c39a5(0x1ed)]!==this['_homeY'])&&(this[_0x2c39a5(0x1ca)]=_0x5b9ff4[_0x2c39a5(0x35a)]);}}else{const _0x5a6cdb=String(RegExp['$1']),_0xcd6a24=String(RegExp['$2'])[_0x3ea3ca(0x199)]()['trim']();let _0x4de8d5,_0x25e677,_0x3a3d5b;switch(_0xcd6a24){case _0x3ea3ca(0x378):_0x4de8d5=_0x5eb27d[_0x4de897]!==''?Number(_0x5eb27d[_0x4de897]):0x0;break;case _0x3ea3ca(0x23b):_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x1cc0df=>Number(_0x1cc0df));break;case'EVAL':_0x4de8d5=_0x5eb27d[_0x4de897]!==''?eval(_0x5eb27d[_0x4de897]):null;break;case _0x3ea3ca(0x167):_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON['parse'](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x5a8831=>eval(_0x5a8831));break;case _0x3ea3ca(0x1c6):_0x4de8d5=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):'';break;case _0x3ea3ca(0x34d):_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x6c377b=>JSON[_0x3ea3ca(0x313)](_0x6c377b));break;case _0x3ea3ca(0x191):_0x4de8d5=_0x5eb27d[_0x4de897]!==''?new Function(JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897])):new Function('return\x200');break;case _0x3ea3ca(0x214):_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x18d1b4=>new Function(JSON[_0x3ea3ca(0x313)](_0x18d1b4)));break;case'STR':_0x4de8d5=_0x5eb27d[_0x4de897]!==''?String(_0x5eb27d[_0x4de897]):'';break;case _0x3ea3ca(0x22a):_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x477512=>String(_0x477512));break;case _0x3ea3ca(0x316):_0x3a3d5b=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):{},_0x4de8d5=VisuMZ[_0x3ea3ca(0x247)]({},_0x3a3d5b);break;case'ARRAYSTRUCT':_0x25e677=_0x5eb27d[_0x4de897]!==''?JSON[_0x3ea3ca(0x313)](_0x5eb27d[_0x4de897]):[],_0x4de8d5=_0x25e677[_0x3ea3ca(0x1fc)](_0x12991c=>VisuMZ[_0x3ea3ca(0x247)]({},JSON['parse'](_0x12991c)));break;default:continue;}_0x394a7d[_0x5a6cdb]=_0x4de8d5;}}}return _0x394a7d;},(_0x24f879=>{const _0x114930=_0x4f4031,_0x52c2f5=_0x24f879[_0x114930(0x2ea)];for(const _0x4cc093 of dependencies){if(!Imported[_0x4cc093]){alert(_0x114930(0x190)[_0x114930(0x2a7)](_0x52c2f5,_0x4cc093)),SceneManager['exit']();break;}}const _0x4c0688=_0x24f879['description'];if(_0x4c0688[_0x114930(0x2cf)](/\[Version[ ](.*?)\]/i)){if(_0x114930(0x338)!==_0x114930(0x35d)){const _0x337d65=Number(RegExp['$1']);_0x337d65!==VisuMZ[label][_0x114930(0x36b)]&&(alert(_0x114930(0x22c)[_0x114930(0x2a7)](_0x52c2f5,_0x337d65)),SceneManager[_0x114930(0x2a8)]());}else{function _0x448568(){const _0x2debb6=_0x114930;_0x268162[_0x2debb6(0x21f)](_0x451309['getSkillIdWithName'](_0x3c01e6));}}}if(_0x4c0688[_0x114930(0x2cf)](/\[Tier[ ](\d+)\]/i)){if(_0x114930(0x1d0)!=='Ttroh'){const _0x521e71=Number(RegExp['$1']);if(_0x521e71<tier){if(_0x114930(0x14b)===_0x114930(0x2e7)){function _0x3f5187(){return _0x3bdd69['btbPaySkillFusionCosts']();}}else alert(_0x114930(0x271)[_0x114930(0x2a7)](_0x52c2f5,_0x521e71,tier)),SceneManager[_0x114930(0x2a8)]();}else tier=Math[_0x114930(0x252)](_0x521e71,tier);}else{function _0x524386(){const _0x14a257=_0x114930;this[_0x14a257(0x2c2)](0x0);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x114930(0x3c3)],_0x24f879[_0x114930(0x140)]);})(pluginData),PluginManager[_0x4f4031(0x178)](pluginData['name'],_0x4f4031(0x1ae),_0x512425=>{const _0xe94e48=_0x4f4031;VisuMZ[_0xe94e48(0x247)](_0x512425,_0x512425);const _0x2fcdc7=_0x512425[_0xe94e48(0x2b6)],_0x1888ea=_0x512425[_0xe94e48(0x2d9)];for(const _0x2c93f6 of _0x2fcdc7){if(_0xe94e48(0x151)!==_0xe94e48(0x1f3)){const _0x6347df=$gameActors[_0xe94e48(0x410)](_0x2c93f6);if(!_0x6347df)continue;_0x6347df['_btbTurnOrderGraphicType']=_0xe94e48(0x394),_0x6347df['_btbTurnOrderIconIndex']=_0x1888ea;}else{function _0x5c748c(){_0x3b609a['pop']();}}}}),PluginManager[_0x4f4031(0x178)](pluginData[_0x4f4031(0x2ea)],_0x4f4031(0x341),_0x28f3bc=>{const _0x1f67d1=_0x4f4031;VisuMZ[_0x1f67d1(0x247)](_0x28f3bc,_0x28f3bc);const _0x5d0304=_0x28f3bc[_0x1f67d1(0x2b6)],_0x500f9d=_0x28f3bc[_0x1f67d1(0x3dd)],_0x4874b7=_0x28f3bc[_0x1f67d1(0x163)];for(const _0x43eff7 of _0x5d0304){if(_0x1f67d1(0x3b6)!=='lzegS'){function _0x40eff1(){const _0xa6dec7=_0x1f67d1,_0x3a667d=_0x5d4dda[_0xa6dec7(0x3c3)];this[_0xa6dec7(0x145)]=_0x3a667d[_0xa6dec7(0x35a)],this[_0xa6dec7(0x2d2)]=_0x137c9e;}}else{const _0x2f1483=$gameActors[_0x1f67d1(0x410)](_0x43eff7);if(!_0x2f1483)continue;_0x2f1483[_0x1f67d1(0x355)]=_0x1f67d1(0x20c),_0x2f1483[_0x1f67d1(0x245)]=_0x500f9d,_0x2f1483[_0x1f67d1(0x2f1)]=_0x4874b7;}}}),PluginManager[_0x4f4031(0x178)](pluginData[_0x4f4031(0x2ea)],_0x4f4031(0x17a),_0x5e5b56=>{const _0x2b5d60=_0x4f4031;VisuMZ[_0x2b5d60(0x247)](_0x5e5b56,_0x5e5b56);const _0x206258=_0x5e5b56[_0x2b5d60(0x2b6)];for(const _0x6a833e of _0x206258){const _0x361bd3=$gameActors['actor'](_0x6a833e);if(!_0x361bd3)continue;_0x361bd3['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x4f4031(0x178)](pluginData[_0x4f4031(0x2ea)],_0x4f4031(0x2fd),_0x2b41e1=>{const _0x471fac=_0x4f4031;VisuMZ[_0x471fac(0x247)](_0x2b41e1,_0x2b41e1);const _0x2ae42d=_0x2b41e1[_0x471fac(0x1db)],_0x40e7ef=_0x2b41e1[_0x471fac(0x2d9)];for(const _0x274565 of _0x2ae42d){const _0x5ac5ec=$gameTroop['members']()[_0x274565];if(!_0x5ac5ec)continue;_0x5ac5ec[_0x471fac(0x355)]=_0x471fac(0x394),_0x5ac5ec[_0x471fac(0x264)]=_0x40e7ef;}}),PluginManager['registerCommand'](pluginData['name'],_0x4f4031(0x1cc),_0x191174=>{const _0x2ee7f9=_0x4f4031;VisuMZ[_0x2ee7f9(0x247)](_0x191174,_0x191174);const _0x265695=_0x191174[_0x2ee7f9(0x1db)],_0x26f89b=_0x191174[_0x2ee7f9(0x3dd)],_0x1e69ba=_0x191174[_0x2ee7f9(0x163)];for(const _0x5ed7c8 of _0x265695){const _0x2dd647=$gameTroop[_0x2ee7f9(0x31d)]()[_0x5ed7c8];if(!_0x2dd647)continue;_0x2dd647['_btbTurnOrderGraphicType']=_0x2ee7f9(0x20c),_0x2dd647['_btbTurnOrderFaceName']=_0x26f89b,_0x2dd647[_0x2ee7f9(0x2f1)]=_0x1e69ba;}}),PluginManager['registerCommand'](pluginData[_0x4f4031(0x2ea)],_0x4f4031(0x3b5),_0x48bbcf=>{const _0x24887c=_0x4f4031;VisuMZ[_0x24887c(0x247)](_0x48bbcf,_0x48bbcf);const _0x3b3342=_0x48bbcf['Enemies'];for(const _0x79e2df of _0x3b3342){const _0x44b118=$gameTroop[_0x24887c(0x31d)]()[_0x79e2df];if(!_0x44b118)continue;_0x44b118[_0x24887c(0x1ef)]();}}),PluginManager[_0x4f4031(0x178)](pluginData[_0x4f4031(0x2ea)],_0x4f4031(0x2c5),_0x1d14b8=>{const _0x1738e2=_0x4f4031;VisuMZ[_0x1738e2(0x247)](_0x1d14b8,_0x1d14b8);const _0x6a8a06=_0x1d14b8[_0x1738e2(0x390)];$gameSystem[_0x1738e2(0x317)](_0x6a8a06);}),VisuMZ[_0x4f4031(0x15f)]['RegExp']={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ['BattleSystemBTB'][_0x4f4031(0x3bc)]=Scene_Boot[_0x4f4031(0x3d8)][_0x4f4031(0x3d0)],Scene_Boot['prototype'][_0x4f4031(0x3d0)]=function(){const _0x4c6c78=_0x4f4031;VisuMZ['BattleSystemBTB']['Scene_Boot_onDatabaseLoaded'][_0x4c6c78(0x3b0)](this),this[_0x4c6c78(0x19e)]();},Scene_Boot[_0x4f4031(0x3d8)][_0x4f4031(0x19e)]=function(){const _0x2c88c9=_0x4f4031;this[_0x2c88c9(0x14a)](),this[_0x2c88c9(0x3ae)]();},Scene_Boot[_0x4f4031(0x3d8)]['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x4d5950=_0x4f4031;if(VisuMZ[_0x4d5950(0x352)])return;const _0x2def2c=$dataSkills[_0x4d5950(0x175)]($dataItems);for(const _0x28ccf9 of _0x2def2c){if(!_0x28ccf9)continue;DataManager['btbRegisterFusions'](_0x28ccf9);}},VisuMZ[_0x4f4031(0x15f)]['JS']={},Scene_Boot[_0x4f4031(0x3d8)][_0x4f4031(0x3ae)]=function(){const _0x3fe0af=_0x4f4031;if(VisuMZ['ParseAllNotetags'])return;const _0x2688f2=VisuMZ[_0x3fe0af(0x15f)][_0x3fe0af(0x2ca)],_0x3c2220=$dataSkills[_0x3fe0af(0x175)](dataItems);for(const _0x4ce200 of _0x3c2220){if(_0x3fe0af(0x319)!==_0x3fe0af(0x298)){if(!_0x4ce200)continue;VisuMZ[_0x3fe0af(0x15f)]['Parse_Notetags_BravePointsUserJS'](_0x4ce200,_0x3fe0af(0x314)),VisuMZ['BattleSystemBTB'][_0x3fe0af(0x3c7)](_0x4ce200,_0x3fe0af(0x3cc));}else{function _0x52569a(){const _0x3b7e26=_0x3fe0af,_0x29a8a5=this[_0x3b7e26(0x302)](_0x47509c);if(_0x29a8a5[_0x3b7e26(0x219)]<_0x153f29['faceWidth'])return _0x29a8a5;let _0x500289=_0xd20d82[_0x3b7e26(0x2cb)]((_0x29a8a5[_0x3b7e26(0x219)]-_0x222fc3[_0x3b7e26(0x221)])/0x2);return _0x29a8a5[_0x3b7e26(0x219)]=_0x100727[_0x3b7e26(0x221)],_0x29a8a5['x']+=_0x500289,_0x29a8a5;}}}},VisuMZ[_0x4f4031(0x15f)]['Parse_Notetags_BravePointsUserJS']=function(_0x1d345d,_0x4f6796){const _0x199998=_0x4f4031,_0x2ba78c=VisuMZ[_0x199998(0x15f)][_0x199998(0x2ca)][_0x4f6796],_0x16b0f0=_0x1d345d['note'];if(_0x16b0f0[_0x199998(0x2cf)](_0x2ba78c)){const _0x157628=String(RegExp['$1']),_0x1fcd80='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x157628),_0x430eb6=VisuMZ[_0x199998(0x15f)]['createKeyJS'](_0x1d345d,_0x4f6796);VisuMZ[_0x199998(0x15f)]['JS'][_0x430eb6]=new Function(_0x1fcd80);}},VisuMZ['BattleSystemBTB'][_0x4f4031(0x220)]=function(_0x5035f0,_0x5d55fc){const _0x298060=_0x4f4031;let _0x65e21f='';if($dataActors[_0x298060(0x37a)](_0x5035f0))_0x65e21f=_0x298060(0x238)[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataClasses[_0x298060(0x37a)](_0x5035f0))_0x65e21f=_0x298060(0x336)[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataSkills['includes'](_0x5035f0))_0x65e21f=_0x298060(0x25a)['format'](_0x5035f0['id'],_0x5d55fc);if($dataItems['includes'](_0x5035f0))_0x65e21f='Item-%1-%2'[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataWeapons[_0x298060(0x37a)](_0x5035f0))_0x65e21f=_0x298060(0x2fe)[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataArmors['includes'](_0x5035f0))_0x65e21f=_0x298060(0x15d)[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataEnemies['includes'](_0x5035f0))_0x65e21f='Enemy-%1-%2'[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);if($dataStates[_0x298060(0x37a)](_0x5035f0))_0x65e21f='State-%1-%2'[_0x298060(0x2a7)](_0x5035f0['id'],_0x5d55fc);return _0x65e21f;},VisuMZ['BattleSystemBTB'][_0x4f4031(0x1b0)]=VisuMZ[_0x4f4031(0x1b0)],VisuMZ[_0x4f4031(0x1b0)]=function(_0x5259a3){const _0xd89b5=_0x4f4031;VisuMZ[_0xd89b5(0x15f)][_0xd89b5(0x1b0)][_0xd89b5(0x3b0)](this,_0x5259a3),DataManager[_0xd89b5(0x1b9)](_0x5259a3),VisuMZ[_0xd89b5(0x15f)][_0xd89b5(0x3c7)](_0x5259a3,_0xd89b5(0x314)),VisuMZ[_0xd89b5(0x15f)][_0xd89b5(0x3c7)](_0x5259a3,_0xd89b5(0x3cc));},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3d1)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x4f4031(0x3d1)]=function(_0x31cc88){const _0x22fbe1=_0x4f4031;VisuMZ[_0x22fbe1(0x15f)][_0x22fbe1(0x3d1)][_0x22fbe1(0x3b0)](this,_0x31cc88),DataManager[_0x22fbe1(0x1b9)](_0x31cc88),VisuMZ[_0x22fbe1(0x15f)][_0x22fbe1(0x3c7)](_0x31cc88,_0x22fbe1(0x314)),VisuMZ[_0x22fbe1(0x15f)][_0x22fbe1(0x3c7)](_0x31cc88,_0x22fbe1(0x3cc));},DataManager[_0x4f4031(0x39c)]=function(_0x304d49){const _0x44c6cd=_0x4f4031;_0x304d49=_0x304d49[_0x44c6cd(0x199)]()[_0x44c6cd(0x3f4)](),this[_0x44c6cd(0x347)]=this[_0x44c6cd(0x347)]||{};if(this[_0x44c6cd(0x347)][_0x304d49])return this[_0x44c6cd(0x347)][_0x304d49];for(const _0x22bf8e of $dataSkills){if(!_0x22bf8e)continue;this[_0x44c6cd(0x347)][_0x22bf8e[_0x44c6cd(0x2ea)][_0x44c6cd(0x199)]()[_0x44c6cd(0x3f4)]()]=_0x22bf8e['id'];}return this['_skillIDs'][_0x304d49]||0x0;},DataManager[_0x4f4031(0x29a)]=function(_0x44ccb0){const _0xe2996d=_0x4f4031;_0x44ccb0=_0x44ccb0[_0xe2996d(0x199)]()['trim'](),this[_0xe2996d(0x187)]=this[_0xe2996d(0x187)]||{};if(this[_0xe2996d(0x187)][_0x44ccb0])return this[_0xe2996d(0x187)][_0x44ccb0];for(const _0x59d5b3 of $dataItems){if(!_0x59d5b3)continue;this[_0xe2996d(0x187)][_0x59d5b3[_0xe2996d(0x2ea)]['toUpperCase']()[_0xe2996d(0x3f4)]()]=_0x59d5b3['id'];}return this[_0xe2996d(0x187)][_0x44ccb0]||0x0;},DataManager[_0x4f4031(0x1b8)]={},DataManager['_btbSkillStrictFusion']={},DataManager[_0x4f4031(0x182)]={},DataManager[_0x4f4031(0x340)]={},DataManager[_0x4f4031(0x1b9)]=function(_0x4c80fe){const _0x141a5e=_0x4f4031;if(!_0x4c80fe)return;const _0x2ec363=VisuMZ[_0x141a5e(0x15f)][_0x141a5e(0x2ca)],_0x111896=_0x4c80fe[_0x141a5e(0x15a)],_0x46c431=DataManager[_0x141a5e(0x28a)](_0x4c80fe),_0x1802e6=_0x111896[_0x141a5e(0x2cf)](_0x2ec363[_0x141a5e(0x239)]);if(_0x1802e6)for(const _0x38e46f of _0x1802e6){if('kXlvC'===_0x141a5e(0x38f)){function _0x21cbdb(){const _0x174a25=_0x141a5e;return this[_0x174a25(0x1e3)]?this[_0x174a25(0x1e3)][_0x174a25(0x31d)]()[this[_0x174a25(0x1b5)]]:null;}}else{if(!_0x38e46f)continue;_0x38e46f[_0x141a5e(0x2cf)](_0x2ec363[_0x141a5e(0x239)]);const _0x3e65b7=String(RegExp['$1'])[_0x141a5e(0x36d)](','),_0x2e24ba=this['btbParseFusionData'](_0x3e65b7,_0x46c431)[_0x141a5e(0x183)]((_0x5b2df2,_0x8b7f5b)=>_0x5b2df2-_0x8b7f5b);if(_0x2e24ba['length']<=0x1)continue;const _0x461897=_0x2e24ba[_0x141a5e(0x1fa)]('-'),_0x3bf714=_0x46c431?DataManager['_btbSkillFlexFusion']:DataManager[_0x141a5e(0x182)];_0x3bf714[_0x461897]=_0x4c80fe['id'];}}const _0x1b626b=_0x111896[_0x141a5e(0x2cf)](_0x2ec363[_0x141a5e(0x24f)]);if(_0x1b626b)for(const _0x582113 of _0x1b626b){if(!_0x582113)continue;_0x582113[_0x141a5e(0x2cf)](_0x2ec363['FusionStrict']);const _0x40a9fe=String(RegExp['$1'])[_0x141a5e(0x36d)](','),_0x4b6a7c=this[_0x141a5e(0x339)](_0x40a9fe,_0x46c431);if(_0x4b6a7c['length']<=0x1)continue;const _0x258eb2=_0x4b6a7c['join']('-'),_0x33dcc2=_0x46c431?DataManager[_0x141a5e(0x1b8)]:DataManager['_btbItemFlexFusion'];_0x33dcc2[_0x258eb2]=_0x4c80fe['id'];}},DataManager['btbParseFusionData']=function(_0x27529c,_0x582ea1){const _0x439ddd=_0x4f4031,_0x2fbe23=[];for(let _0x4c248c of _0x27529c){if(_0x439ddd(0x249)==='eayWP'){function _0xc95a03(){const _0x659f7b=_0x439ddd;return _0x53cf8e[_0x659f7b(0x15f)][_0x659f7b(0x277)]['call'](this);}}else{_0x4c248c=(String(_0x4c248c)||'')[_0x439ddd(0x3f4)]();const _0x18bced=/^\d+$/['test'](_0x4c248c);if(_0x18bced){if(_0x439ddd(0x3af)===_0x439ddd(0x19d)){function _0x512d6a(){const _0x2316b5=_0x439ddd;_0x3ad477[_0x2316b5(0x3a5)]();}}else _0x2fbe23[_0x439ddd(0x21f)](Number(_0x4c248c));}else{if(_0x582ea1)_0x2fbe23['push'](DataManager['getSkillIdWithName'](_0x4c248c));else{if('BwIcQ'!==_0x439ddd(0x382))_0x2fbe23[_0x439ddd(0x21f)](DataManager[_0x439ddd(0x29a)](_0x4c248c));else{function _0x3d24b1(){const _0x308d14=_0x439ddd,_0x4c9d9a=_0x575cf8[_0x308d14(0x1ec)],_0x8074ec=_0x4c9d9a[_0x308d14(0x2a7)](_0x1f09a9[_0x308d14(0x3db)](_0x105f2c)),_0xa44915=this[_0x308d14(0x1dc)](_0x8074ec+this['skillCostSeparator']());_0x4ab503-=_0xa44915;}}}}}}return _0x2fbe23;},ImageManager[_0x4f4031(0x3f2)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)][_0x4f4031(0x1c4)][_0x4f4031(0x411)],TextManager[_0x4f4031(0x39b)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)][_0x4f4031(0x1c4)][_0x4f4031(0x1aa)],TextManager[_0x4f4031(0x2d0)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)][_0x4f4031(0x1c4)][_0x4f4031(0x156)],TextManager['btbCostFormat']=VisuMZ['BattleSystemBTB']['Settings'][_0x4f4031(0x1c4)][_0x4f4031(0x1c3)],TextManager[_0x4f4031(0x1d6)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)][_0x4f4031(0x171)][_0x4f4031(0x331)],TextManager[_0x4f4031(0x1de)]=VisuMZ['BattleSystemBTB'][_0x4f4031(0x3c3)][_0x4f4031(0x171)][_0x4f4031(0x387)],TextManager[_0x4f4031(0x2e1)]=VisuMZ['BattleSystemBTB'][_0x4f4031(0x3c3)][_0x4f4031(0x171)][_0x4f4031(0x2c8)],SceneManager[_0x4f4031(0x1df)]=function(){const _0x39fb08=_0x4f4031;return this[_0x39fb08(0x398)]&&this['_scene'][_0x39fb08(0x1a6)]===Scene_Battle;},VisuMZ[_0x4f4031(0x15f)]['BattleManager_battleSys']=BattleManager[_0x4f4031(0x1c0)],BattleManager[_0x4f4031(0x1c0)]=function(){const _0xb146d4=_0x4f4031;if(this[_0xb146d4(0x2ba)]())return'BTB';return VisuMZ[_0xb146d4(0x15f)][_0xb146d4(0x373)]['call'](this);},BattleManager[_0x4f4031(0x2ba)]=function(){const _0x1744d0=_0x4f4031;return $gameSystem[_0x1744d0(0x1a3)]()===_0x1744d0(0x318);},VisuMZ['BattleSystemBTB'][_0x4f4031(0x2cd)]=BattleManager[_0x4f4031(0x412)],BattleManager[_0x4f4031(0x412)]=function(){const _0x2fa54d=_0x4f4031;if(this[_0x2fa54d(0x2ba)]())return![];return VisuMZ[_0x2fa54d(0x15f)][_0x2fa54d(0x2cd)][_0x2fa54d(0x3b0)](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x18c)]=BattleManager[_0x4f4031(0x26f)],BattleManager['isActiveTpb']=function(){const _0x85bc2c=_0x4f4031;if(this[_0x85bc2c(0x2ba)]())return![];return VisuMZ['BattleSystemBTB'][_0x85bc2c(0x18c)]['call'](this);},VisuMZ[_0x4f4031(0x15f)]['BattleManager_isTurnBased']=BattleManager[_0x4f4031(0x3c1)],BattleManager[_0x4f4031(0x3c1)]=function(){const _0x5a7a62=_0x4f4031;if(this[_0x5a7a62(0x2ba)]())return!![];return VisuMZ[_0x5a7a62(0x15f)][_0x5a7a62(0x2f5)]['call'](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1e8)]=BattleManager[_0x4f4031(0x2e9)],BattleManager['startInput']=function(){const _0x21e515=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x21e515(0x1e8)][_0x21e515(0x3b0)](this);if(this['isBTB']()&&this[_0x21e515(0x38a)]()&&!this[_0x21e515(0x242)]&&$gameParty['canInput']()){if(_0x21e515(0x154)!==_0x21e515(0x154)){function _0x38160c(){const _0xbfb7a2=_0x21e515;_0x3ad1d0['_braveStartupAnimation']=!![];let _0x2d49d2=_0x2b7790[_0xbfb7a2(0x236)]();const _0x5f4217=_0x212511[_0xbfb7a2(0x15f)][_0xbfb7a2(0x3c3)]['BraveAnimation'],_0x5efe2c=_0x5f4217[_0xbfb7a2(0x204)],_0x23773c=_0x5f4217['WaitFrames'];while(_0x2d49d2--){this[_0xbfb7a2(0x21f)](_0xbfb7a2(0x1d8),[_0x2350d5],_0x5efe2c),_0x2d49d2>0x0?this[_0xbfb7a2(0x21f)](_0xbfb7a2(0x202),_0x23773c):this[_0xbfb7a2(0x21f)](_0xbfb7a2(0x377));}this[_0xbfb7a2(0x21f)](_0xbfb7a2(0x1a1),_0x48978b,_0x1ad37d,_0x40b173);}}else this['selectNextCommand']();}},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3ca)]=BattleManager['startTurn'],BattleManager[_0x4f4031(0x3f7)]=function(){const _0x5dd895=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x5dd895(0x3ca)][_0x5dd895(0x3b0)](this),this[_0x5dd895(0x2f3)]();},BattleManager[_0x4f4031(0x2f3)]=function(){const _0x1f338a=_0x4f4031;if(!SceneManager[_0x1f338a(0x1df)]())return;if(!this[_0x1f338a(0x2ba)]())return;const _0x1defdf=SceneManager[_0x1f338a(0x398)];if(!_0x1defdf)return;const _0x3a1896=_0x1defdf[_0x1f338a(0x30a)];if(!_0x3a1896)return;_0x3a1896[_0x1f338a(0x37e)]();},VisuMZ[_0x4f4031(0x15f)]['BattleManager_makeActionOrders']=BattleManager[_0x4f4031(0x26d)],BattleManager[_0x4f4031(0x26d)]=function(){const _0x3daf69=_0x4f4031;VisuMZ[_0x3daf69(0x15f)][_0x3daf69(0x3e2)]['call'](this);if(this[_0x3daf69(0x2ba)]()){if(_0x3daf69(0x3e9)!=='jFEuz'){function _0x537ac8(){const _0x210a3a=_0x3daf69;this['isUsePageUpDnShortcutBTB']()?this['_actor']&&!this[_0x210a3a(0x3d2)][_0x210a3a(0x1ba)]()&&this[_0x210a3a(0x3d2)][_0x210a3a(0x308)]()>0x1&&_0x37e0a9[_0x210a3a(0x398)][_0x210a3a(0x1d2)]():_0x826548['BattleSystemBTB'][_0x210a3a(0x273)]['call'](this);}}else this[_0x3daf69(0x13e)]=this[_0x3daf69(0x13e)][_0x3daf69(0x3fb)](_0x291153=>_0x291153&&_0x291153[_0x3daf69(0x3be)]['length']>0x0),this['updateTurnOrderBTB']();}},BattleManager[_0x4f4031(0x1af)]=function(){const _0x32b64a=_0x4f4031;if(!this[_0x32b64a(0x2ba)]())return;if(!SceneManager[_0x32b64a(0x1df)]())return;const _0x3ea1bb=this[_0x32b64a(0x13e)];for(const _0x30400e of _0x3ea1bb){if(_0x32b64a(0x216)!==_0x32b64a(0x28f))_0x30400e['makeSpeed']();else{function _0x12d20c(){_0x265016=!![];}}}_0x3ea1bb[_0x32b64a(0x183)]((_0x22ac65,_0x344c7b)=>_0x344c7b[_0x32b64a(0x344)]()-_0x22ac65[_0x32b64a(0x344)]());if(this[_0x32b64a(0x2ba)]()){if(_0x32b64a(0x40f)===_0x32b64a(0x40f))this[_0x32b64a(0x334)]();else{function _0xc46d58(){const _0x5040a6=_0x32b64a,_0x5291b5=_0x2df782(_0x23d63d['$1']);_0x5366ac[_0x5040a6(0x326)](_0x5291b5);}}}},BattleManager[_0x4f4031(0x30c)]=function(){const _0x3a0da9=_0x4f4031;if(!this[_0x3a0da9(0x2ba)]())return;this[_0x3a0da9(0x13e)]=this[_0x3a0da9(0x13e)]||[],this['_actionBattlers']=this[_0x3a0da9(0x13e)][_0x3a0da9(0x3fb)](_0x1d645b=>_0x1d645b&&_0x1d645b[_0x3a0da9(0x286)]()&&_0x1d645b[_0x3a0da9(0x3e4)]()),this[_0x3a0da9(0x334)]();},BattleManager[_0x4f4031(0x334)]=function(_0x5f2bb6){const _0x596287=_0x4f4031;if(!this['isBTB']())return;const _0x2d4e1b=SceneManager[_0x596287(0x398)][_0x596287(0x375)];if(!_0x2d4e1b)return;_0x2d4e1b[_0x596287(0x369)](_0x5f2bb6);},VisuMZ[_0x4f4031(0x15f)]['BattleManager_startAction']=BattleManager[_0x4f4031(0x29c)],BattleManager[_0x4f4031(0x29c)]=function(){const _0x27fe24=_0x4f4031;BattleManager[_0x27fe24(0x2ba)]()&&this[_0x27fe24(0x234)]&&this['_subject'][_0x27fe24(0x333)](),VisuMZ['BattleSystemBTB'][_0x27fe24(0x176)][_0x27fe24(0x3b0)](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c4)]=Game_System[_0x4f4031(0x3d8)]['initialize'],Game_System['prototype']['initialize']=function(){const _0x4656e1=_0x4f4031;VisuMZ[_0x4656e1(0x15f)][_0x4656e1(0x3c4)]['call'](this),this[_0x4656e1(0x21a)]();},Game_System[_0x4f4031(0x3d8)]['initBattleSystemBTB']=function(){const _0x1063d1=_0x4f4031;this[_0x1063d1(0x2d5)]=!![];},Game_System[_0x4f4031(0x3d8)][_0x4f4031(0x1b1)]=function(){const _0x307888=_0x4f4031;if(this['_btbTurnOrderVisible']===undefined){if(_0x307888(0x210)!==_0x307888(0x210)){function _0x8fbc4c(){const _0x4273fb=_0x307888,_0x583d16=_0xce8dee['Settings'],_0x53e6da=[_0x4273fb(0x274),_0x4273fb(0x180)][_0x4273fb(0x37a)](_0x583d16[_0x4273fb(0x3aa)]);return _0x53e6da;}}else this[_0x307888(0x21a)]();}return this['_btbTurnOrderVisible'];},Game_System['prototype']['setBattleSystemBTBTurnOrderVisible']=function(_0x5d3890){const _0x339ffb=_0x4f4031;this[_0x339ffb(0x2d5)]===undefined&&this[_0x339ffb(0x21a)](),this[_0x339ffb(0x2d5)]=_0x5d3890;},VisuMZ['BattleSystemBTB'][_0x4f4031(0x2d3)]=Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x256)],Game_Action['prototype'][_0x4f4031(0x256)]=function(_0x5a21bb){const _0x368ab6=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x368ab6(0x2d3)]['call'](this,_0x5a21bb),this['applyBattleSystemBTBUserEffect'](_0x5a21bb);},Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x1a9)]=function(_0x22ae32){const _0x5756ec=_0x4f4031;if(!BattleManager[_0x5756ec(0x2ba)]())return;if(this[_0x5756ec(0x2e3)]())this['applyItemBattleSystemBTBUserEffect'](_0x22ae32);},Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x146)]=function(_0x1dba94){const _0x519cb9=_0x4f4031,_0x38a92c=VisuMZ[_0x519cb9(0x15f)][_0x519cb9(0x2ca)],_0x3094a8=this[_0x519cb9(0x2e3)]()[_0x519cb9(0x15a)],_0x1f8c7c=this[_0x519cb9(0x2e3)]();if(this['subject']()){if(_0x519cb9(0x408)===_0x519cb9(0x408)){if(_0x3094a8[_0x519cb9(0x2cf)](_0x38a92c[_0x519cb9(0x3bd)])){const _0x31b826=Number(RegExp['$1']);this[_0x519cb9(0x1ff)]()[_0x519cb9(0x293)](_0x31b826);}if(_0x3094a8[_0x519cb9(0x2cf)](_0x38a92c[_0x519cb9(0x2dd)])){const _0x1e724c=Number(RegExp['$1']);this['subject']()['gainBravePoints'](_0x1e724c);}const _0x24c461='JsBravePointsUser',_0x4d019e=VisuMZ['BattleSystemBTB'][_0x519cb9(0x220)](_0x1f8c7c,_0x24c461);if(VisuMZ['BattleSystemBTB']['JS'][_0x4d019e]){const _0x1c62c6=VisuMZ[_0x519cb9(0x15f)]['JS'][_0x4d019e][_0x519cb9(0x3b0)](this,this[_0x519cb9(0x1ff)](),_0x1dba94,this[_0x519cb9(0x1ff)]()[_0x519cb9(0x2dc)]());this['subject']()[_0x519cb9(0x293)](_0x1c62c6);}}else{function _0xc86a2a(){const _0x405756=_0x519cb9;return this[_0x405756(0x353)]||0x0;}}}if(_0x1dba94){if(_0x519cb9(0x2ff)===_0x519cb9(0x2ff)){if(_0x3094a8[_0x519cb9(0x2cf)](_0x38a92c['BravePointSetTarget'])){const _0x201d30=Number(RegExp['$1']);_0x1dba94[_0x519cb9(0x293)](_0x201d30);}if(_0x3094a8['match'](_0x38a92c[_0x519cb9(0x3a2)])){if(_0x519cb9(0x40c)!=='XgaRw'){const _0x2b3c60=Number(RegExp['$1']);_0x1dba94[_0x519cb9(0x326)](_0x2b3c60);}else{function _0x2f0411(){const _0x2d1384=_0x519cb9;this[_0x2d1384(0x2c3)](),this['_positionDuration']=0x0,this[_0x2d1384(0x2e4)](),this[_0x2d1384(0x22e)]=this[_0x2d1384(0x2d2)];}}}const _0x3d9ccc=_0x519cb9(0x3cc),_0xa5b56b=VisuMZ['BattleSystemBTB']['createKeyJS'](_0x1f8c7c,_0x3d9ccc);if(VisuMZ[_0x519cb9(0x15f)]['JS'][_0xa5b56b]){const _0x1f2bf1=VisuMZ['BattleSystemBTB']['JS'][_0xa5b56b][_0x519cb9(0x3b0)](this,this[_0x519cb9(0x1ff)](),_0x1dba94,_0x1dba94[_0x519cb9(0x2dc)]());_0x1dba94[_0x519cb9(0x293)](_0x1f2bf1);}}else{function _0x1efef5(){const _0x10d7a5=_0x519cb9;if(this[_0x10d7a5(0x2ba)]())return![];return _0xebc98a[_0x10d7a5(0x15f)]['BattleManager_isActiveTpb']['call'](this);}}}},VisuMZ['BattleSystemBTB'][_0x4f4031(0x3d7)]=Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x344)],Game_Action[_0x4f4031(0x3d8)]['speed']=function(){const _0x37a7ec=_0x4f4031;return BattleManager['isBTB']()?VisuMZ[_0x37a7ec(0x15f)][_0x37a7ec(0x3c3)][_0x37a7ec(0x1e4)][_0x37a7ec(0x28d)][_0x37a7ec(0x3b0)](this):VisuMZ['BattleSystemBTB'][_0x37a7ec(0x3d7)]['call'](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x277)]=Game_Action['prototype'][_0x4f4031(0x3ed)],Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x3ed)]=function(){const _0x40ad31=_0x4f4031;if(BattleManager[_0x40ad31(0x2ba)]()){if(_0x40ad31(0x401)!==_0x40ad31(0x1b6))return VisuMZ[_0x40ad31(0x15f)][_0x40ad31(0x3c3)][_0x40ad31(0x1e4)][_0x40ad31(0x228)];else{function _0x34b2a3(){const _0x4b9630=_0x40ad31,_0x57d594=this[_0x4b9630(0x197)](),_0x1afa6c=this[_0x4b9630(0x147)]();_0x4827ea[_0x4b9630(0x363)]=new _0xd77d2f(_0x57d594,_0x1afa6c);const _0x3ee606=_0x124e74[_0x4b9630(0x254)](_0x4a177a[_0x4b9630(0x36a)[_0x4b9630(0x2a7)](_0x4354ec)]),_0x1ecf2b=_0x2c4b24['getColor'](_0x10b5d5['%1BgColor2'[_0x4b9630(0x2a7)](_0x3384de)]);_0x18e9a7['bitmap'][_0x4b9630(0x360)](0x0,0x0,_0x57d594,_0x1afa6c,_0x3ee606,_0x1ecf2b,!![]);}}}else{if(_0x40ad31(0x2b5)!==_0x40ad31(0x2b5)){function _0x3e8e45(){const _0xe8823f=_0x40ad31;return _0x96b4c1['Settings'][_0xe8823f(0x16b)];}}else return VisuMZ['BattleSystemBTB'][_0x40ad31(0x277)][_0x40ad31(0x3b0)](this);}},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1c7)]=Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x22b)],Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x22b)]=function(_0x53cbf5){const _0x1479e4=_0x4f4031;VisuMZ[_0x1479e4(0x15f)][_0x1479e4(0x1c7)][_0x1479e4(0x3b0)](this,_0x53cbf5),BattleManager[_0x1479e4(0x1af)]();},VisuMZ['BattleSystemBTB'][_0x4f4031(0x409)]=Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x2ae)],Game_Action['prototype'][_0x4f4031(0x2ae)]=function(_0x4a5032){const _0x4a6795=_0x4f4031;VisuMZ[_0x4a6795(0x15f)][_0x4a6795(0x409)][_0x4a6795(0x3b0)](this,_0x4a5032),BattleManager['sortActionOrdersBTB']();},Game_Action[_0x4f4031(0x3d8)]['setActionFusionBTB']=function(_0x1275db){this['_actionFusionRecipe']=_0x1275db;},Game_Action[_0x4f4031(0x3d8)][_0x4f4031(0x1d1)]=function(){const _0x4c53c9=_0x4f4031;if(this[_0x4c53c9(0x1ac)]===undefined)return 0x0;return this['_actionFusionRecipe']['split']('-')[_0x4c53c9(0x2ef)]-0x1;},Game_Action['prototype']['getActionFusionRecipeSkills']=function(){const _0x3267f6=_0x4f4031;if(this[_0x3267f6(0x1ac)]===undefined)return[];return this[_0x3267f6(0x1ac)][_0x3267f6(0x36d)]('-')[_0x3267f6(0x1fc)](_0x111095=>$dataSkills[Number(_0x111095)]);},Game_Action['prototype'][_0x4f4031(0x172)]=function(){const _0x38bf71=_0x4f4031;if(this[_0x38bf71(0x1ac)]===undefined)return[];return this[_0x38bf71(0x1ac)][_0x38bf71(0x36d)]('-')['map'](_0x4b28b9=>$dataItems[Number(_0x4b28b9)]);},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x2dc)]=function(){const _0xfc1613=_0x4f4031;return this[_0xfc1613(0x353)]||0x0;},Game_BattlerBase[_0x4f4031(0x1bc)]=VisuMZ['BattleSystemBTB'][_0x4f4031(0x3c3)][_0x4f4031(0x1e4)]['MaxActionsDefault'],Game_BattlerBase[_0x4f4031(0x3c2)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)]['Mechanics']['MaxActionsHardCap'],Game_BattlerBase['prototype'][_0x4f4031(0x31b)]=function(){const _0xff0c64=_0x4f4031;if(this[_0xff0c64(0x26e)]())return 0x1;if(this[_0xff0c64(0x1ba)]())return 0x1;const _0x5281f7=VisuMZ['BattleSystemBTB'][_0xff0c64(0x2ca)],_0x77d567=_0x5281f7[_0xff0c64(0x1f4)];let _0x37127a=Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT'];const _0x55d426=this[_0xff0c64(0x299)]();for(const _0x2b37de of _0x55d426){if('xuTTW'!==_0xff0c64(0x24a)){if(!_0x2b37de)continue;const _0x1e7ccb=_0x2b37de['note'];_0x1e7ccb['match'](_0x77d567)&&(_0x37127a+=Number(RegExp['$1']));}else{function _0x4e5ef6(){const _0x505d49=_0xff0c64;_0x11801d[_0x505d49(0x15f)][_0x505d49(0x14d)][_0x505d49(0x3b0)](this),this[_0x505d49(0x17c)]();}}}return _0x37127a[_0xff0c64(0x18b)](0x1,Game_BattlerBase[_0xff0c64(0x3c2)]);},Game_BattlerBase[_0x4f4031(0x1be)]=VisuMZ['BattleSystemBTB']['Settings'][_0x4f4031(0x1e4)]['MaxBravePointsDefault'],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_DEFAULT']=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)]['Mechanics']['MinBravePointsDefault'],Game_BattlerBase[_0x4f4031(0x2bc)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)]['Mechanics']['MaxBravePointsHardCap'],Game_BattlerBase[_0x4f4031(0x366)]=VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3c3)][_0x4f4031(0x1e4)][_0x4f4031(0x287)],Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x350)]=function(){const _0x17bdfa=_0x4f4031,_0x3809b6=VisuMZ['BattleSystemBTB'][_0x17bdfa(0x2ca)],_0x5c0390=_0x3809b6[_0x17bdfa(0x2b4)];let _0x43aaeb=Game_BattlerBase[_0x17bdfa(0x1be)];const _0x1cfd68=this[_0x17bdfa(0x299)]();for(const _0x218a94 of _0x1cfd68){if(!_0x218a94)continue;const _0x546f81=_0x218a94['note'];if(_0x546f81['match'](_0x5c0390)){if(_0x17bdfa(0x31e)===_0x17bdfa(0x31e))_0x43aaeb+=Number(RegExp['$1']);else{function _0x1d2070(){const _0x316eda=_0x17bdfa;this[_0x316eda(0x19c)]=this[_0x316eda(0x208)],this[_0x316eda(0x3a9)]=this['_targetHomeY'];}}}}return Math[_0x17bdfa(0x301)](_0x43aaeb,Game_BattlerBase[_0x17bdfa(0x2bc)]);},Game_BattlerBase['prototype'][_0x4f4031(0x229)]=function(){const _0x1958b1=_0x4f4031,_0x207edd=VisuMZ[_0x1958b1(0x15f)][_0x1958b1(0x2ca)],_0x450377=_0x207edd[_0x1958b1(0x1e7)];let _0x182093=Game_BattlerBase[_0x1958b1(0x275)];const _0x53fc47=this[_0x1958b1(0x299)]();for(const _0x36ae0d of _0x53fc47){if(!_0x36ae0d)continue;const _0x27e534=_0x36ae0d[_0x1958b1(0x15a)];_0x27e534['match'](_0x450377)&&(_0x182093+=Number(RegExp['$1']));}return Math[_0x1958b1(0x252)](_0x182093,Game_BattlerBase[_0x1958b1(0x366)]);},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x293)]=function(_0x132e8){const _0x4da0c6=_0x4f4031;this[_0x4da0c6(0x353)]=Math[_0x4da0c6(0x301)](_0x132e8,this[_0x4da0c6(0x350)]()),this[_0x4da0c6(0x1a5)]();},Game_BattlerBase[_0x4f4031(0x3d8)]['gainBravePoints']=function(_0x4072f9){const _0x21b762=_0x4f4031;_0x4072f9+=this['_bravePoints']||0x0,this[_0x21b762(0x293)](_0x4072f9);},Game_BattlerBase['prototype'][_0x4f4031(0x349)]=function(_0x419b17){const _0x364a5c=_0x4f4031;this[_0x364a5c(0x326)](-_0x419b17);},Game_BattlerBase['prototype']['bravePointsCost']=function(_0x35e47d){const _0x5cbc1e=_0x4f4031,_0x3a5515=VisuMZ['BattleSystemBTB'][_0x5cbc1e(0x3c3)][_0x5cbc1e(0x1e4)];if(!_0x35e47d)return _0x3a5515[_0x5cbc1e(0x3d4)];if(DataManager['isSkill'](_0x35e47d)){if('xbFRx'!==_0x5cbc1e(0x288)){if(_0x35e47d['id']===this[_0x5cbc1e(0x3f8)]())return 0x0;if(this['currentAction']()&&this['currentAction']()[_0x5cbc1e(0x2e3)]()===_0x35e47d&&this[_0x5cbc1e(0x1b7)]()[_0x5cbc1e(0x166)]){if('BXAdv'===_0x5cbc1e(0x359))return 0x0;else{function _0x15dc69(){const _0x5360d5=_0x5cbc1e;if(!this[_0x5360d5(0x2ba)]())return;this['_actionBattlers']=this[_0x5360d5(0x13e)]||[],this[_0x5360d5(0x13e)]=this[_0x5360d5(0x13e)][_0x5360d5(0x3fb)](_0x3cd3a7=>_0x3cd3a7&&_0x3cd3a7[_0x5360d5(0x286)]()&&_0x3cd3a7[_0x5360d5(0x3e4)]()),this[_0x5360d5(0x334)]();}}}}else{function _0x1bf1ff(){_0x57722b+=_0x4bcf52(_0x33d9d0['$1']);}}}const _0x352ae2=VisuMZ[_0x5cbc1e(0x15f)][_0x5cbc1e(0x2ca)],_0x2af655=_0x35e47d[_0x5cbc1e(0x15a)];if(_0x2af655[_0x5cbc1e(0x2cf)](_0x352ae2[_0x5cbc1e(0x3da)]))return Number(RegExp['$1']);let _0x48f357=0x0;if(DataManager[_0x5cbc1e(0x28a)](_0x35e47d))_0x48f357=_0x3a5515[_0x5cbc1e(0x181)];else{if(DataManager[_0x5cbc1e(0x206)](_0x35e47d)){if('QkbwU'==='QkbwU')_0x48f357=_0x3a5515[_0x5cbc1e(0x1bd)];else{function _0x27a018(){const _0x47d1c4=_0x5cbc1e,_0x12d6a0=_0x4c7e20(_0x110674['$1'])[_0x47d1c4(0x36d)](',');for(let _0x2bf797 of _0x12d6a0){_0x2bf797=(_0x4428d3(_0x2bf797)||'')[_0x47d1c4(0x3f4)]();const _0x3037be=/^\d+$/[_0x47d1c4(0x1cf)](_0x2bf797);_0x3037be?_0x5490bb['push'](_0x4da498(_0x2bf797)):_0x33524d[_0x47d1c4(0x21f)](_0x5e17d1['getSkillIdWithName'](_0x2bf797));}}}}}return _0x48f357['clamp'](0x0,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3ce)]=Game_BattlerBase['prototype'][_0x4f4031(0x2b0)],Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x2b0)]=function(_0x3da619){const _0x5d821f=_0x4f4031;if(_0x3da619&&SceneManager[_0x5d821f(0x1df)]()&&BattleManager['isBTB']()){const _0x3e0b2c=this['bravePointsCost'](_0x3da619);if(this[_0x5d821f(0x2dc)]()-_0x3e0b2c<this[_0x5d821f(0x229)]())return![];}return VisuMZ[_0x5d821f(0x15f)][_0x5d821f(0x3ce)][_0x5d821f(0x3b0)](this,_0x3da619);},Game_BattlerBase['prototype'][_0x4f4031(0x30e)]=function(_0x2c87d5){const _0x43e25e=_0x4f4031;if(!BattleManager['isBTB']())return;const _0x1d9a6c=this[_0x43e25e(0x407)](_0x2c87d5);this[_0x43e25e(0x349)](_0x1d9a6c);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x28c)]=Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x198)],Game_Battler['prototype'][_0x4f4031(0x198)]=function(_0xc1181c){const _0xead25e=_0x4f4031;if(this[_0xead25e(0x2c4)](_0xc1181c)){if(_0xead25e(0x20f)!=='CaMQl'){function _0x1eaf66(){const _0x1b8eca=_0xead25e;if(this[_0x1b8eca(0x263)]!==_0x59d87e[_0x1b8eca(0x164)]())return this['processUpdateGraphic']();}}else{this['useItemBTB'](_0xc1181c);return;}}VisuMZ['BattleSystemBTB'][_0xead25e(0x28c)][_0xead25e(0x3b0)](this,_0xc1181c),this['payBravePointsCost'](_0xc1181c);},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2c4)]=function(_0x2d1ced){const _0x136ea8=_0x4f4031;if(!BattleManager[_0x136ea8(0x2ba)]())return![];if(!SceneManager[_0x136ea8(0x1df)]())return![];if(!this['isActor']())return![];if(this!==BattleManager[_0x136ea8(0x234)])return![];if(!this[_0x136ea8(0x1b7)]())return![];if(!this[_0x136ea8(0x1b7)]()[_0x136ea8(0x2e3)]())return![];if(this['currentAction']()[_0x136ea8(0x2e3)]()!==_0x2d1ced)return![];if(this[_0x136ea8(0x1b7)]()[_0x136ea8(0x28a)]()){if(_0x136ea8(0x23a)!==_0x136ea8(0x23a)){function _0x2b068b(){const _0x444fa0=_0x136ea8;this[_0x444fa0(0x31f)]();}}else return this[_0x136ea8(0x1b7)]()['getActionFusionRecipeSkills']()[_0x136ea8(0x2ef)]>0x0;}else return this[_0x136ea8(0x1b7)]()[_0x136ea8(0x206)]()?this[_0x136ea8(0x1b7)]()['getActionFusionRecipeItems']()['length']>0x0:![];},Game_Battler['prototype'][_0x4f4031(0x25f)]=function(_0x222cb8){const _0x46f41a=_0x4f4031;if(!SceneManager[_0x46f41a(0x1df)]())return;if(DataManager[_0x46f41a(0x28a)](_0x222cb8)){if(_0x46f41a(0x300)!==_0x46f41a(0x300)){function _0x31a307(){const _0x450a61=_0x46f41a;if(!this[_0x450a61(0x26b)]())return;const _0x43afc4=this['commandStyle'](),_0x35140b=_0x255ae6[_0x450a61(0x1d6)],_0x25673a=_0x3eace0[_0x450a61(0x3f2)],_0x4e73c8=_0x43afc4===_0x450a61(0x177)?_0x35140b:_0x450a61(0x40e)[_0x450a61(0x2a7)](_0x25673a,_0x35140b);this['addCommand'](_0x4e73c8,_0x450a61(0x2a9),this[_0x450a61(0x3d2)][_0x450a61(0x2fc)]()),_0x596716[_0x450a61(0x2f3)]();}}else this[_0x46f41a(0x17e)]();}else{if(_0x46f41a(0x370)!==_0x46f41a(0x370)){function _0x45d5f5(){const _0x3bb85b=_0x46f41a,_0x515857=_0x1bb062['Settings'],_0x23f797=['top','bottom'][_0x3bb85b(0x37a)](_0x515857['DisplayPosition']);return _0x23f797;}}else this[_0x46f41a(0x3cd)]();}},Game_Battler[_0x4f4031(0x3d8)]['btbPaySkillFusionCosts']=function(){const _0x1c0ac9=_0x4f4031,_0x15a941=this[_0x1c0ac9(0x1b7)]()[_0x1c0ac9(0x3a4)]();if(!_0x15a941)return;for(const _0x4a971c of _0x15a941){if(!_0x4a971c)continue;if(!this[_0x1c0ac9(0x2b0)](_0x4a971c))return![];VisuMZ[_0x1c0ac9(0x15f)][_0x1c0ac9(0x28c)][_0x1c0ac9(0x3b0)](this,_0x4a971c),this[_0x1c0ac9(0x30e)](_0x4a971c);}return!![];},Game_Battler['prototype'][_0x4f4031(0x3cd)]=function(){const _0x2c4ade=_0x4f4031,_0x4d9bce=this[_0x2c4ade(0x1b7)]()[_0x2c4ade(0x172)]();if(!_0x4d9bce)return;for(const _0x1117c8 of _0x4d9bce){if(!_0x1117c8)continue;if(!this['canUse'](_0x1117c8))return![];VisuMZ['BattleSystemBTB'][_0x2c4ade(0x28c)][_0x2c4ade(0x3b0)](this,_0x1117c8),this[_0x2c4ade(0x30e)](_0x1117c8);}return!![];},Game_BattlerBase['prototype'][_0x4f4031(0x24b)]=function(){const _0x347f5b=_0x4f4031,_0x4e905e=this[_0x347f5b(0x2dc)]()-this[_0x347f5b(0x37b)]()+this['calcRegenBravePoints']();return _0x4e905e[_0x347f5b(0x18b)](Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this[_0x347f5b(0x350)]());},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x37b)]=function(){const _0x356bbc=_0x4f4031;let _0x1c0220=0x0;for(const _0x1e06b1 of this[_0x356bbc(0x3be)]){if(!_0x1e06b1)continue;const _0x863fc7=_0x1e06b1['item']();_0x1c0220+=this[_0x356bbc(0x407)](_0x863fc7);}return _0x1c0220;},VisuMZ[_0x4f4031(0x15f)]['Game_BattlerBase_canInput']=Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x1c5)],Game_BattlerBase['prototype'][_0x4f4031(0x1c5)]=function(){const _0x53e50c=_0x4f4031;if(BattleManager[_0x53e50c(0x2ba)]()&&this[_0x53e50c(0x2dc)]()<0x0){if('hRiEm'!==_0x53e50c(0x35e))return![];else{function _0x2ff70b(){const _0x423859=_0x53e50c;_0xf32e5f[_0x423859(0x15f)][_0x423859(0x19a)][_0x423859(0x3b0)](this,_0x4cedb3),_0x3352cc['isSceneBattle']()&&_0x4819b6[_0x423859(0x1e6)]()&&_0x2c382d['_actionBattlers']['remove'](_0x565680[_0x423859(0x410)](_0x4c0cdc));}}}else return VisuMZ['BattleSystemBTB'][_0x53e50c(0x2f7)][_0x53e50c(0x3b0)](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3fd)]=Game_BattlerBase['prototype'][_0x4f4031(0x159)],Game_BattlerBase['prototype']['canGuard']=function(){const _0x2795f5=_0x4f4031;if(BattleManager['isBTB']()&&this[_0x2795f5(0x308)]()>0x1){if('abMCA'===_0x2795f5(0x185)){function _0x1ed00f(){const _0x35a50b=_0x2795f5;if(this[_0x35a50b(0x145)]>0x0){const _0x23e25a=this['_fadeDuration'];this[_0x35a50b(0x22e)]=(this[_0x35a50b(0x22e)]*(_0x23e25a-0x1)+this[_0x35a50b(0x2d2)])/_0x23e25a,this['_fadeDuration']--,this[_0x35a50b(0x145)]<=0x0&&(this['checkPosition'](),this[_0x35a50b(0x23c)]=0x0,this[_0x35a50b(0x2e4)](),this[_0x35a50b(0x22e)]=this[_0x35a50b(0x2d2)]);}if(this[_0x35a50b(0x217)])return;_0x3278e6[_0x35a50b(0x2f0)]===_0x35a50b(0x320)&&(this['_isBattleOver']=!![],this[_0x35a50b(0x2c2)](0x0));}}else return![];}else return VisuMZ[_0x2795f5(0x15f)][_0x2795f5(0x3fd)]['call'](this);},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x2fc)]=function(){const _0x3259e0=_0x4f4031;if(this[_0x3259e0(0x26e)]())return![];return this[_0x3259e0(0x308)]()<this[_0x3259e0(0x31b)]()&&this[_0x3259e0(0x353)]>this[_0x3259e0(0x229)]();},Game_BattlerBase[_0x4f4031(0x3d8)]['cannotBraveTrait']=function(){const _0x4877e9=_0x4f4031,_0x4d6c20=VisuMZ[_0x4877e9(0x15f)][_0x4877e9(0x2ca)],_0xb7edf5=_0x4d6c20['CannotBrave'];return this['traitObjects']()[_0x4877e9(0x406)](_0x1dccaf=>_0x1dccaf&&_0x1dccaf['note']['match'](_0xb7edf5));},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x1ba)]=function(){const _0xedb58e=_0x4f4031,_0x5cd1fc=VisuMZ[_0xedb58e(0x15f)]['RegExp'],_0x14d1ce=_0x5cd1fc['HideBrave'];return this['traitObjects']()[_0xedb58e(0x406)](_0x49756f=>_0x49756f&&_0x49756f['note'][_0xedb58e(0x2cf)](_0x14d1ce));},Game_BattlerBase[_0x4f4031(0x3d8)]['clearTurnOrderBTBGraphics']=function(){const _0x4e2a2f=_0x4f4031;delete this[_0x4e2a2f(0x355)],delete this['_btbTurnOrderFaceName'],delete this['_btbTurnOrderFaceIndex'],delete this[_0x4e2a2f(0x264)];},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x18a)]=function(){const _0x5ec342=_0x4f4031;if(this[_0x5ec342(0x355)]===undefined){if(_0x5ec342(0x332)!==_0x5ec342(0x332)){function _0x10a86e(){const _0x46f061=_0x5ec342;_0x3a15b7[_0x46f061(0x37a)](_0x38a13d[_0x46f061(0x2e3)]()['id'])&&(_0x2f5987[_0x46f061(0x21f)](_0x34823a),_0x22d7e6[_0x46f061(0x3ef)](_0xfadf5c['indexOf'](_0x31a979[_0x46f061(0x2e3)]()['id']),0x1));}}else this['_btbTurnOrderGraphicType']=this['createTurnOrderBTBGraphicType']();}return this[_0x5ec342(0x355)];},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x18e)]=function(){const _0x2459e4=_0x4f4031;return Window_BTB_TurnOrder[_0x2459e4(0x3c3)][_0x2459e4(0x380)];},Game_BattlerBase['prototype'][_0x4f4031(0x16f)]=function(){const _0x3acccf=_0x4f4031;return this['_btbTurnOrderFaceName']===undefined&&(this['_btbTurnOrderFaceName']=this['createTurnOrderBTBGraphicFaceName']()),this[_0x3acccf(0x245)];},Game_BattlerBase[_0x4f4031(0x3d8)]['createTurnOrderBTBGraphicFaceName']=function(){const _0x8254d9=_0x4f4031;return Window_BTB_TurnOrder[_0x8254d9(0x3c3)][_0x8254d9(0x16b)];},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x3c5)]=function(){const _0x5019f5=_0x4f4031;if(this[_0x5019f5(0x2f1)]===undefined){if('klMoW'===_0x5019f5(0x389))this[_0x5019f5(0x2f1)]=this[_0x5019f5(0x1f2)]();else{function _0x20a628(){const _0x41c91e=_0x5019f5;if(!_0x24a5d3[_0x41c91e(0x3c3)][_0x41c91e(0x1e2)])return;const _0x128285=_0x28eaa5[_0x41c91e(0x3c3)],_0x486ec6=this['_unit']===_0x1d2902?'Actor':_0x41c91e(0x23d),_0x4a2940=_0x41c91e(0x265)[_0x41c91e(0x2a7)](_0x486ec6),_0x18078d=new _0x176a56();_0x18078d[_0x41c91e(0x2fa)]['x']=this[_0x41c91e(0x2fa)]['x'],_0x18078d['anchor']['y']=this[_0x41c91e(0x2fa)]['y'];if(_0x128285[_0x4a2940])_0x18078d[_0x41c91e(0x363)]=_0x42cb1f[_0x41c91e(0x2a6)](_0x128285[_0x4a2940]);else{let _0x3c84ac=this[_0x41c91e(0x197)](),_0x2e59d3=this[_0x41c91e(0x147)](),_0x4672c9=_0x128285[_0x41c91e(0x232)];_0x18078d[_0x41c91e(0x363)]=new _0x375cd2(_0x3c84ac,_0x2e59d3);const _0x4348c5=_0x41c91e(0x330),_0x55f972=_0x2e241b[_0x41c91e(0x254)](_0x128285[_0x41c91e(0x2d1)['format'](_0x486ec6)]);_0x18078d[_0x41c91e(0x363)][_0x41c91e(0x2a1)](0x0,0x0,_0x3c84ac,_0x2e59d3,_0x4348c5),_0x3c84ac-=0x2,_0x2e59d3-=0x2,_0x18078d[_0x41c91e(0x363)][_0x41c91e(0x2a1)](0x1,0x1,_0x3c84ac,_0x2e59d3,_0x55f972),_0x3c84ac-=_0x4672c9*0x2,_0x2e59d3-=_0x4672c9*0x2,_0x18078d[_0x41c91e(0x363)][_0x41c91e(0x2a1)](0x1+_0x4672c9,0x1+_0x4672c9,_0x3c84ac,_0x2e59d3,_0x4348c5),_0x3c84ac-=0x2,_0x2e59d3-=0x2,_0x4672c9+=0x1,_0x18078d[_0x41c91e(0x363)][_0x41c91e(0x2d4)](0x1+_0x4672c9,0x1+_0x4672c9,_0x3c84ac,_0x2e59d3);}this[_0x41c91e(0x212)]=_0x18078d,this['addChild'](this[_0x41c91e(0x212)]),this[_0x41c91e(0x219)]=this[_0x41c91e(0x212)][_0x41c91e(0x219)],this[_0x41c91e(0x157)]=this[_0x41c91e(0x212)][_0x41c91e(0x157)];}}}return this[_0x5019f5(0x2f1)];},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x1f2)]=function(){const _0x466f87=_0x4f4031;return Window_BTB_TurnOrder[_0x466f87(0x3c3)]['EnemyBattlerFaceIndex'];},Game_BattlerBase['prototype']['TurnOrderBTBGraphicIconIndex']=function(){const _0x3ebb3f=_0x4f4031;return this['_btbTurnOrderIconIndex']===undefined&&(this[_0x3ebb3f(0x264)]=this[_0x3ebb3f(0x23e)]()),this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x23e)]=function(){const _0x281420=_0x4f4031;return Window_BTB_TurnOrder[_0x281420(0x3c3)]['EnemyBattlerIcon'];},Game_BattlerBase['prototype'][_0x4f4031(0x2ed)]=function(_0x15ccd3){const _0x1a6937=_0x4f4031;this[_0x1a6937(0x264)]=_0x15ccd3;},VisuMZ['BattleSystemBTB'][_0x4f4031(0x3d3)]=Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x290)],Game_BattlerBase[_0x4f4031(0x3d8)]['hide']=function(){const _0x3e90c5=_0x4f4031;VisuMZ[_0x3e90c5(0x15f)][_0x3e90c5(0x3d3)][_0x3e90c5(0x3b0)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ['BattleSystemBTB'][_0x4f4031(0x2ac)]=Game_BattlerBase[_0x4f4031(0x3d8)][_0x4f4031(0x200)],Game_BattlerBase['prototype']['appear']=function(){const _0x2da078=_0x4f4031;VisuMZ[_0x2da078(0x15f)][_0x2da078(0x2ac)][_0x2da078(0x3b0)](this),BattleManager[_0x2da078(0x30c)]();},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x307)]=Game_Battler[_0x4f4031(0x3d8)]['performCollapse'],Game_Battler['prototype'][_0x4f4031(0x3c8)]=function(){const _0x2e2e34=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x2e2e34(0x307)][_0x2e2e34(0x3b0)](this),BattleManager[_0x2e2e34(0x30c)]();},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1f7)]=Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x3df)],Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x3df)]=function(){const _0x494838=_0x4f4031;return BattleManager[_0x494838(0x2ba)]()?0x1:VisuMZ[_0x494838(0x15f)][_0x494838(0x1f7)]['call'](this);},VisuMZ['BattleSystemBTB'][_0x4f4031(0x2b3)]=Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x15c)],Game_Battler['prototype'][_0x4f4031(0x15c)]=function(_0x3e2d2a){const _0x465c42=_0x4f4031;VisuMZ[_0x465c42(0x15f)][_0x465c42(0x2b3)][_0x465c42(0x3b0)](this,_0x3e2d2a),this[_0x465c42(0x3a3)](_0x3e2d2a);},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x3a3)]=function(_0x26db31){const _0x2c6bed=_0x4f4031;if(!BattleManager[_0x2c6bed(0x2ba)]())return;const _0x4941ec=VisuMZ['BattleSystemBTB'][_0x2c6bed(0x3c3)][_0x2c6bed(0x1e4)],_0x44122e=VisuMZ['BattleSystemBTB'][_0x2c6bed(0x2ca)];let _0x9c2222=_0x26db31?_0x4941ec['BravePointStartFavor']:_0x4941ec[_0x2c6bed(0x261)];const _0x5f3ea2=this[_0x2c6bed(0x299)]();for(const _0x40261a of _0x5f3ea2){if(_0x2c6bed(0x395)!=='RxwTE'){if(!_0x40261a)continue;const _0x2daf48=_0x40261a['note'];_0x2daf48['match'](_0x44122e[_0x2c6bed(0x30d)])&&(_0x9c2222+=Number(RegExp['$1']));}else{function _0x189619(){const _0x36024f=_0x2c6bed;this[_0x36024f(0x2c2)](0xff);}}}this[_0x2c6bed(0x293)](_0x9c2222);},Game_Battler['prototype'][_0x4f4031(0x155)]=function(){const _0x3c16e3=_0x4f4031;this[_0x3c16e3(0x3be)][_0x3c16e3(0x21f)](new Game_Action(this));const _0x73635a=VisuMZ[_0x3c16e3(0x15f)][_0x3c16e3(0x3c3)][_0x3c16e3(0x3e6)];if(_0x73635a[_0x3c16e3(0x204)]){const _0x55bf28=_0x3c16e3(0x32e),_0x3cd2ed=_0x73635a[_0x3c16e3(0x257)['format'](_0x55bf28)],_0x99334b=_0x73635a['%1Mirror'[_0x3c16e3(0x2a7)](_0x55bf28)],_0x5bc968=_0x73635a['%1Mute'[_0x3c16e3(0x2a7)](_0x55bf28)];$gameTemp[_0x3c16e3(0x3f9)]([this],_0x3cd2ed,_0x99334b,_0x5bc968);}},Game_Battler[_0x4f4031(0x3d8)]['cancelBrave']=function(){const _0x90aba3=_0x4f4031;if(this[_0x90aba3(0x3be)][_0x90aba3(0x2ef)]<=0x1)return;this[_0x90aba3(0x3be)][_0x90aba3(0x2f2)]();const _0x221f90=VisuMZ[_0x90aba3(0x15f)][_0x90aba3(0x3c3)][_0x90aba3(0x3e6)];if(_0x221f90['CancelAnimationID']){const _0x121499=_0x90aba3(0x1fb),_0x39b387=_0x221f90[_0x90aba3(0x257)[_0x90aba3(0x2a7)](_0x121499)],_0x6aa716=_0x221f90[_0x90aba3(0x292)[_0x90aba3(0x2a7)](_0x121499)],_0x53ac87=_0x221f90[_0x90aba3(0x233)[_0x90aba3(0x2a7)](_0x121499)];$gameTemp['requestFauxAnimation']([this],_0x39b387,_0x6aa716,_0x53ac87);}},VisuMZ[_0x4f4031(0x15f)]['Game_Battler_onTurnEnd']=Game_Battler['prototype'][_0x4f4031(0x383)],Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x383)]=function(){const _0x4bddec=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x4bddec(0x142)][_0x4bddec(0x3b0)](this),this['onTurnEndBTB']();},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x19f)]=function(){const _0x522c8d=_0x4f4031;if(!BattleManager['isBTB']())return;this[_0x522c8d(0x3c0)]();},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x3c0)]=function(){const _0x356312=_0x4f4031,_0x59dc5c=VisuMZ[_0x356312(0x15f)]['Settings'][_0x356312(0x1e4)],_0x308ebf=_0x59dc5c[_0x356312(0x285)];if(_0x308ebf&&!this[_0x356312(0x3e4)]())return;const _0x442316=this['calcRegenBravePoints']();this['gainBravePoints'](_0x442316);},Game_Battler['prototype'][_0x4f4031(0x278)]=function(){const _0xcd9047=_0x4f4031,_0x31261a=VisuMZ[_0xcd9047(0x15f)][_0xcd9047(0x2ca)],_0x5e17c5=VisuMZ['BattleSystemBTB'][_0xcd9047(0x3c3)][_0xcd9047(0x1e4)];let _0x26be06=_0x5e17c5[_0xcd9047(0x31a)]||0x0;const _0x256dab=this[_0xcd9047(0x299)]();for(const _0x464df8 of _0x256dab){if(!_0x464df8)continue;const _0x1288f6=_0x464df8[_0xcd9047(0x15a)];if(_0x1288f6[_0xcd9047(0x2cf)](_0x31261a[_0xcd9047(0x3fc)])){if('ozVIS'!==_0xcd9047(0x248))_0x26be06+=Number(RegExp['$1']);else{function _0x5f0a96(){const _0x1803a9=_0xcd9047;if(!_0x250131)return![];if(!_0x161368[_0x1803a9(0x2ba)]())return![];if(!this['battleLayoutStyle'])return![];if(_0x5be300[_0x1803a9(0x1ba)]())return![];const _0x11810d=_0x44c677['BattleSystemBTB'][_0x1803a9(0x3c3)][_0x1803a9(0x171)],_0x23e90f=this[_0x1803a9(0x27b)]();return _0x11810d[_0x1803a9(0x291)[_0x1803a9(0x2a7)](_0x23e90f)];}}}}return _0x26be06;},Game_Battler['prototype']['processActionFusionsBTB']=function(){const _0x3c6f3a=_0x4f4031;if(!this['canProcessActionFusionsBTB']())return;if(this[_0x3c6f3a(0x308)]()<=0x1)return;if(!this['currentAction']())return;if(!this[_0x3c6f3a(0x1b7)]()[_0x3c6f3a(0x2e3)]())return;const _0x2b3495=this['getActionFusionCombinationsBTB']();if(_0x2b3495[_0x3c6f3a(0x2ef)]<=0x0)return;let _0x45f3e3='',_0x438091=0x0;const _0x3afc09=this[_0x3c6f3a(0x1b7)]()[_0x3c6f3a(0x28a)](),_0x5a3645=_0x3afc09?DataManager[_0x3c6f3a(0x1b8)]:DataManager[_0x3c6f3a(0x182)],_0x463bb7=_0x3afc09?DataManager[_0x3c6f3a(0x22f)]:DataManager[_0x3c6f3a(0x340)];for(const _0x231689 of _0x2b3495){if(_0x3c6f3a(0x1cb)==='OHkjK'){function _0x2087db(){const _0x41dc0e=_0x3c6f3a;if(!_0x2ab5f8[_0x41dc0e(0x2ba)]())return;const _0x293450=this[_0x41dc0e(0x1d9)];if(!_0x293450)return;_0x293450[_0x41dc0e(0x322)](_0x41dc0e(0x2a9),this[_0x41dc0e(0x280)][_0x41dc0e(0x32d)](this)),_0x293450[_0x41dc0e(0x322)](_0x41dc0e(0x36f),this['commandCancelBTB']['bind'](this));}}else{if(!_0x231689)continue;if(_0x5a3645[_0x231689]&&_0x5a3645[_0x231689]>=_0x438091){if('XgATT'===_0x3c6f3a(0x279)){if(this[_0x3c6f3a(0x309)](_0x231689)){if('jsbSO'!==_0x3c6f3a(0x3e0))_0x45f3e3=_0x231689,_0x438091=_0x5a3645[_0x231689];else{function _0x2eb22a(){const _0x1e644d=_0x3c6f3a;_0xd9a49b['BattleSystemBTB'][_0x1e644d(0x3d1)][_0x1e644d(0x3b0)](this,_0x255ebf),_0x2deedb[_0x1e644d(0x1b9)](_0x59f55c),_0x231f57[_0x1e644d(0x15f)][_0x1e644d(0x3c7)](_0x797204,'JsBravePointsUser'),_0x3d3044[_0x1e644d(0x15f)]['Parse_Notetags_BravePointsUserJS'](_0x337b24,'JsBravePointsTarget');}}}}else{function _0x1a9c98(){const _0x35f7dd=_0x3c6f3a;_0x549909=_0x35f7dd(0x1e5)[_0x35f7dd(0x2a7)](_0x294af8,_0x507474[_0x35f7dd(0x2e3)]()['id']),_0x2feea5[_0x35f7dd(0x21f)](_0x4b722e);}}}if(_0x463bb7[_0x231689]&&_0x463bb7[_0x231689]>=_0x438091){if(_0x3c6f3a(0x358)!==_0x3c6f3a(0x255))this[_0x3c6f3a(0x309)](_0x231689)&&(_0x45f3e3=_0x231689,_0x438091=_0x5a3645[_0x231689]);else{function _0x18e63f(){_0x4e7875=_0x56306b,_0x1bf8ed=_0x114b3d[_0xc8d72];}}}}}if(_0x438091<=0x0)return;this[_0x3c6f3a(0x28e)](_0x45f3e3),this[_0x3c6f3a(0x1b7)]()[_0x3c6f3a(0x17b)](_0x45f3e3),_0x3afc09?this[_0x3c6f3a(0x1b7)]()['setSkill'](_0x438091):this[_0x3c6f3a(0x1b7)]()[_0x3c6f3a(0x2ae)](_0x438091);},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x362)]=function(){const _0x109ced=_0x4f4031;if(this['cannotFusionNotetagBTB']())return![];const _0x2afd4f=VisuMZ['BattleSystemBTB'][_0x109ced(0x3c3)][_0x109ced(0x1e4)];if(this[_0x109ced(0x365)]()){if(_0x109ced(0x2aa)!==_0x109ced(0x223)){if(_0x2afd4f[_0x109ced(0x323)]===undefined)return!![];return _0x2afd4f[_0x109ced(0x323)];}else{function _0x352624(){const _0x22efa9=_0x109ced;return _0x140d5d=_0x11fffd[_0x22efa9(0x15f)]['Window_Base_makeAdditionalSkillCostText'][_0x22efa9(0x3b0)](this,_0x2010fe,_0xe64fdf,_0xd7648b),_0x55df89=this[_0x22efa9(0x269)](_0x2c2a62,_0x341eb7,_0x2089bc),_0x2acf1f;}}}else{if(_0x109ced(0x393)===_0x109ced(0x1c9)){function _0xd62dcf(){const _0x4d258b=_0x109ced;if(this['_actionFusionRecipe']===_0x3ebcc)return[];return this[_0x4d258b(0x1ac)]['split']('-')[_0x4d258b(0x1fc)](_0x812a2d=>_0x509e83[_0x509b53(_0x812a2d)]);}}else{if(_0x2afd4f['EnemyActionFusions']===undefined)return!![];return _0x2afd4f[_0x109ced(0x3b7)];}}},Game_BattlerBase[_0x4f4031(0x3d8)]['cannotFusionNotetagBTB']=function(){const _0x504bfa=_0x4f4031,_0x1fbdf6=VisuMZ[_0x504bfa(0x15f)]['RegExp'],_0xb93725=this['traitObjects']();for(const _0x1c3cab of _0xb93725){if(_0x504bfa(0x27c)!=='KuOTJ'){if(!_0x1c3cab)continue;const _0x19bc99=_0x1c3cab[_0x504bfa(0x15a)];if(_0x19bc99[_0x504bfa(0x2cf)](_0x1fbdf6[_0x504bfa(0x296)]))return!![];if(_0x19bc99['match'](_0x1fbdf6[_0x504bfa(0x270)]))return![];}else{function _0x537edf(){const _0x49b1c2=_0x504bfa;_0x42b3c9['BattleSystemBTB'][_0x49b1c2(0x409)]['call'](this,_0x1cf9f5),_0x16a906['sortActionOrdersBTB']();}}}return![];},Game_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x16c)]=function(){const _0x24f153=_0x4f4031,_0x15ff2f=this[_0x24f153(0x1b7)](),_0x1f7f5d=this[_0x24f153(0x3be)],_0x3cd432=_0x1f7f5d[_0x24f153(0x3fb)](_0x230f1e=>this[_0x24f153(0x3fe)](_0x15ff2f,_0x230f1e)),_0x5589d6=_0x3cd432[_0x24f153(0x1fc)](_0x74e8a=>_0x74e8a[_0x24f153(0x2e3)]()['id']),_0x49c617=VisuMZ[_0x24f153(0x15f)][_0x24f153(0x3ba)](_0x15ff2f['item']()['id'],_0x5589d6);let _0x19071e=String(_0x15ff2f['item']()['id']);for(let _0x3b819a=0x1;_0x3b819a<_0x1f7f5d['length'];_0x3b819a++){if(_0x24f153(0x311)!==_0x24f153(0x24e)){const _0x179a8a=_0x1f7f5d[_0x3b819a];if(this['canActionFusionWithBTB'](_0x15ff2f,_0x179a8a)){if(_0x24f153(0x374)!==_0x24f153(0x294))_0x19071e=_0x24f153(0x1e5)[_0x24f153(0x2a7)](_0x19071e,_0x179a8a[_0x24f153(0x2e3)]()['id']),_0x49c617['push'](_0x19071e);else{function _0xa4244d(){const _0x2b6929=_0x24f153,_0x3c11d8=this['actor']()[_0x2b6929(0x15a)];if(_0x3c11d8[_0x2b6929(0x2cf)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2be8d5(_0x4641ee['$2']);return this[_0x2b6929(0x153)]();}}}else break;}else{function _0x510709(){const _0x5de327=_0x24f153;_0xcc54ad+=this[_0x5de327(0x353)]||0x0,this[_0x5de327(0x293)](_0x1439ad);}}}return _0x49c617[_0x24f153(0x3fb)]((_0x52bf7d,_0x23bf9a,_0x4b67a)=>_0x4b67a[_0x24f153(0x14e)](_0x52bf7d)===_0x23bf9a);},VisuMZ['BattleSystemBTB'][_0x4f4031(0x3ba)]=function(_0x398605,_0xeeea2e){const _0x5706b6=[],_0x578e12=function(_0x3d38df,_0xcce190){const _0x2a38ff=_0x23ad;for(var _0x52f6d2=0x0;_0x52f6d2<_0xcce190[_0x2a38ff(0x2ef)];_0x52f6d2++){if('wjoFC'===_0x2a38ff(0x3e3)){function _0x54edc7(){const _0x3253c7=_0x2a38ff;this[_0x3253c7(0x1e3)]=_0x4f294c,this[_0x3253c7(0x1b5)]=_0x5dac82;const _0x1aec9d=_0x5b19c5[_0x3253c7(0x3c3)],_0x366fc3=this[_0x3253c7(0x29e)](),_0x29c103=this[_0x3253c7(0x141)]();this[_0x3253c7(0x23c)]=0x0,this['_positionTargetX']=_0x366fc3?_0x1aec9d[_0x3253c7(0x3b8)]*_0x29c103:0x0,this[_0x3253c7(0x1f6)]=_0x366fc3?0x0:_0x1aec9d[_0x3253c7(0x3b8)]*_0x29c103,this['_fadeDuration']=0x0,this['_fadeTarget']=0xff,this[_0x3253c7(0x20b)]=![],this[_0x3253c7(0x1e9)]=![],this['_containerWidth']=0x0,this[_0x3253c7(0x3b3)]=0x0;}}else _0x5706b6['push'](_0x3d38df+'-'+_0xcce190[_0x52f6d2]),_0x578e12(_0x3d38df+'-'+_0xcce190[_0x52f6d2],_0xcce190[_0x2a38ff(0x1d7)](_0x52f6d2+0x1));}};return _0x578e12(_0x398605,_0xeeea2e),_0x5706b6;},Game_Battler['prototype']['canActionFusionWithBTB']=function(_0x3c1de3,_0x30dd9b){const _0x57c6da=_0x4f4031;if(!_0x3c1de3||!_0x30dd9b)return![];if(_0x3c1de3===_0x30dd9b)return![];if(!_0x3c1de3[_0x57c6da(0x2e3)]()||!_0x30dd9b[_0x57c6da(0x2e3)]())return![];if(_0x3c1de3[_0x57c6da(0x28a)]()!==_0x30dd9b[_0x57c6da(0x28a)]())return![];return!![];},Game_Battler[_0x4f4031(0x3d8)]['canPayActionFusionCombination']=function(_0x3e19dc){const _0x1fe793=_0x4f4031,_0x4888ab=this['currentAction']()[_0x1fe793(0x28a)](),_0x4e2b4c=JsonEx[_0x1fe793(0x40a)](this);_0x4e2b4c[_0x1fe793(0x3fa)]=!![],_0x4e2b4c[_0x1fe793(0x1b7)]()[_0x1fe793(0x17b)](_0x3e19dc);if(_0x4888ab)return _0x4e2b4c[_0x1fe793(0x17e)]();else{if(_0x1fe793(0x306)!==_0x1fe793(0x306)){function _0x44c189(){const _0x48a168=_0x1fe793,_0xb492c9=this[_0x48a168(0x410)]()['note'];if(_0xb492c9[_0x48a168(0x2cf)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x24ea74(_0x40cd96['$1']);return _0x3e23ee[_0x48a168(0x3c3)]['ActorBattlerIcon'];}}else{const _0x1ce113=JsonEx[_0x1fe793(0x40a)]($gameParty[_0x1fe793(0x143)]),_0x22d74e=JsonEx['makeDeepCopy']($gameParty['_weapons']),_0x151969=JsonEx[_0x1fe793(0x40a)]($gameParty[_0x1fe793(0x189)]);let _0x5a1939=_0x4e2b4c[_0x1fe793(0x3cd)]();return $gameParty[_0x1fe793(0x143)]=_0x1ce113,$gameParty[_0x1fe793(0x34b)]=_0x22d74e,$gameParty[_0x1fe793(0x189)]=_0x151969,_0x5a1939;}}},Game_Battler[_0x4f4031(0x3d8)]['removeActionFusionIngredients']=function(_0x1440e1){const _0x1588ed=_0x4f4031,_0x5ea6b3=this[_0x1588ed(0x1b7)](),_0x4fd858=_0x1440e1[_0x1588ed(0x36d)]('-')['map'](_0x12178f=>Number(_0x12178f));_0x4fd858[_0x1588ed(0x2b1)]();const _0x1b1ad1=this[_0x1588ed(0x3be)],_0x5d1acf=[];for(const _0x1be3b8 of _0x1b1ad1){if(this[_0x1588ed(0x3fe)](_0x5ea6b3,_0x1be3b8)){if('VZhwB'!=='lOklU'){if(_0x4fd858[_0x1588ed(0x37a)](_0x1be3b8[_0x1588ed(0x2e3)]()['id'])){if(_0x1588ed(0x3dc)!==_0x1588ed(0x3dc)){function _0x1833aa(){this['visible']=_0x3d8f1f['isBattleSystemBTBTurnOrderVisible']();}}else _0x5d1acf['push'](_0x1be3b8),_0x4fd858[_0x1588ed(0x3ef)](_0x4fd858[_0x1588ed(0x14e)](_0x1be3b8[_0x1588ed(0x2e3)]()['id']),0x1);}}else{function _0x21bb11(){const _0x36e606=_0x1588ed;_0x18069f[_0x36e606(0x15f)]['BattleManager_startInput'][_0x36e606(0x3b0)](this),this[_0x36e606(0x2ba)]()&&this[_0x36e606(0x38a)]()&&!this[_0x36e606(0x242)]&&_0x283833[_0x36e606(0x1c5)]()&&this[_0x36e606(0x2bf)]();}}}}for(const _0x24a81c of _0x5d1acf){_0x1b1ad1['remove'](_0x24a81c);}},Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x293)]=function(_0x469977){const _0x293ad8=_0x4f4031;Game_Battler['prototype'][_0x293ad8(0x293)][_0x293ad8(0x3b0)](this,_0x469977);if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x293ad8(0x30b)]()['includes'](this))return;BattleManager[_0x293ad8(0x2f3)]();},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x218)]=Game_Actor[_0x4f4031(0x3d8)]['makeActions'],Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x2ec)]=function(){const _0x3eb827=_0x4f4031;VisuMZ[_0x3eb827(0x15f)]['Game_Actor_makeActions'][_0x3eb827(0x3b0)](this);if(BattleManager[_0x3eb827(0x2ba)]()&&this[_0x3eb827(0x2dc)]()<0x0){if(_0x3eb827(0x2f4)==='auBfm')this[_0x3eb827(0x31f)]();else{function _0x3fc34c(){const _0x97b79c=_0x3eb827;return this[_0x97b79c(0x2d8)]();}}}},Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x18e)]=function(){const _0x506b7d=_0x4f4031,_0x985882=this['actor']()[_0x506b7d(0x15a)];if(_0x985882[_0x506b7d(0x2cf)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x506b7d(0x1b2)===_0x506b7d(0x194)){function _0x3751d0(){const _0x2bea67=_0x506b7d;_0xa532a8['BattleSystemBTB'][_0x2bea67(0x295)][_0x2bea67(0x3b0)](this),this[_0x2bea67(0x33b)](),this[_0x2bea67(0x235)]();}}else return _0x506b7d(0x20c);}else{if(_0x985882[_0x506b7d(0x2cf)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x506b7d(0x394);}return Window_BTB_TurnOrder['Settings'][_0x506b7d(0x32f)];},Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x16f)]=function(){const _0x236789=_0x4f4031,_0x1cb1dd=this[_0x236789(0x410)]()[_0x236789(0x15a)];if(_0x1cb1dd[_0x236789(0x2cf)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('ptUan'!==_0x236789(0x2be))return String(RegExp['$1']);else{function _0x18e83d(){const _0x182186=_0x236789;_0x2213dd[_0x182186(0x15f)][_0x182186(0x3d3)]['call'](this),_0x565db9['removeActionBattlersBTB']();}}}return this[_0x236789(0x276)]();},Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x3c5)]=function(){const _0x541d8b=_0x4f4031,_0x1772d1=this[_0x541d8b(0x410)]()[_0x541d8b(0x15a)];if(_0x1772d1['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x4f4031(0x3d8)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x2ae6dc=_0x4f4031,_0x3813cc=this[_0x2ae6dc(0x410)]()['note'];if(_0x3813cc[_0x2ae6dc(0x2cf)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x2ae6dc(0x3c3)][_0x2ae6dc(0x26c)];},Game_Actor[_0x4f4031(0x3d8)][_0x4f4031(0x3fe)]=function(_0x5aa5c9,_0x4206ba){const _0x2cee0a=_0x4f4031;if(!Game_Battler[_0x2cee0a(0x3d8)][_0x2cee0a(0x3fe)]['call'](this,_0x5aa5c9,_0x4206ba))return![];if(_0x5aa5c9[_0x2cee0a(0x29b)]()&&_0x4206ba[_0x2cee0a(0x29b)]()){if(_0x2cee0a(0x2a0)!==_0x2cee0a(0x14f)){if(_0x5aa5c9[_0x2cee0a(0x20a)]()!==_0x4206ba[_0x2cee0a(0x20a)]())return![];if(_0x5aa5c9['_targetIndex']!==_0x4206ba[_0x2cee0a(0x1dd)])return![];}else{function _0x516617(){const _0x4969ba=_0x2cee0a;return this[_0x4969ba(0x367)](_0x486f60[_0x4969ba(0x35b)](),0x9,!![]);}}}return!![];},Game_Enemy['prototype']['createTurnOrderBTBGraphicType']=function(){const _0x343270=_0x4f4031,_0x4f41f0=this[_0x343270(0x3b4)]()['note'];if(_0x4f41f0['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x343270(0x224)===_0x343270(0x224))return _0x343270(0x20c);else{function _0x35638b(){const _0x4b218d=_0x343270;_0x15b5df[_0x4b218d(0x2ba)]()&&_0x403cc1&&_0x1eceee[_0x4b218d(0x15a)]&&_0x2cfabf['note'][_0x4b218d(0x2cf)](_0x3652ad['BattleSystemBTB'][_0x4b218d(0x2ca)]['BTB_Help'])?this[_0x4b218d(0x1d5)](_0x52d6e1(_0x47a8a1['$1'])):_0x2a05f0[_0x4b218d(0x15f)][_0x4b218d(0x36e)][_0x4b218d(0x3b0)](this,_0x42d916);}}}else{if(_0x4f41f0[_0x343270(0x2cf)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x343270(0x246)==='Chftn')return _0x343270(0x394);else{function _0x25e67b(){const _0x201e10=_0x343270,_0x4f1792=this[_0x201e10(0x410)]()['note'];if(_0x4f1792[_0x201e10(0x2cf)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3d93b1(_0x16baba['$1']);return this[_0x201e10(0x276)]();}}}}return Window_BTB_TurnOrder['Settings']['EnemyBattlerType'];},Game_Enemy[_0x4f4031(0x3d8)][_0x4f4031(0x2df)]=function(){const _0x3ef27b=_0x4f4031,_0x5114a8=this['enemy']()['note'];if(_0x5114a8['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x3ef27b(0x3c3)][_0x3ef27b(0x16b)];},Game_Enemy['prototype']['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x5e5a36=_0x4f4031,_0x13e997=this[_0x5e5a36(0x3b4)]()[_0x5e5a36(0x15a)];if(_0x13e997[_0x5e5a36(0x2cf)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x5e5a36(0x3c3)][_0x5e5a36(0x1eb)];},Game_Enemy[_0x4f4031(0x3d8)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x3c2ec4=_0x4f4031,_0x802f02=this['enemy']()[_0x3c2ec4(0x15a)];if(_0x802f02[_0x3c2ec4(0x2cf)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x3c2ec4(0x3ad)===_0x3c2ec4(0x1f5)){function _0x4fe75f(){const _0x29177e=_0x3c2ec4;if(this['isBTB']())return!![];return _0x25cd8f[_0x29177e(0x15f)][_0x29177e(0x2f5)]['call'](this);}}else return Number(RegExp['$1']);}return Window_BTB_TurnOrder['Settings']['EnemyBattlerIcon'];},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x295)]=Game_Enemy[_0x4f4031(0x3d8)]['makeActions'],Game_Enemy[_0x4f4031(0x3d8)][_0x4f4031(0x2ec)]=function(){const _0x515c4c=_0x4f4031;VisuMZ[_0x515c4c(0x15f)][_0x515c4c(0x295)][_0x515c4c(0x3b0)](this),this[_0x515c4c(0x33b)](),this[_0x515c4c(0x235)]();},Game_Enemy[_0x4f4031(0x3d8)]['checkActionsBTB']=function(){const _0x7219c2=_0x4f4031;if(!BattleManager[_0x7219c2(0x2ba)]())return;if(this[_0x7219c2(0x308)]()<=0x0)return;this[_0x7219c2(0x230)]=![],this[_0x7219c2(0x2dc)]()<0x0&&this[_0x7219c2(0x31f)]();},Game_Enemy[_0x4f4031(0x3d8)][_0x4f4031(0x235)]=function(){const _0x1700be=_0x4f4031;if(!BattleManager[_0x1700be(0x2ba)]())return;if(this[_0x1700be(0x308)]()<=0x0)return;const _0x4aeab4=this[_0x1700be(0x3be)][0x0];if(!_0x4aeab4)return;const _0x2ffb0f=_0x4aeab4[_0x1700be(0x2e3)]();if(!_0x2ffb0f)return;const _0x112fdb=VisuMZ['BattleSystemBTB'][_0x1700be(0x2ca)],_0x23c670=_0x2ffb0f[_0x1700be(0x15a)];let _0x480e3c=[];if(_0x23c670[_0x1700be(0x2cf)](_0x112fdb['EnemyMultiAction'])){const _0x3432e3=String(RegExp['$1'])[_0x1700be(0x36d)](',');for(let _0x56236d of _0x3432e3){_0x56236d=(String(_0x56236d)||'')[_0x1700be(0x3f4)]();const _0x1621bb=/^\d+$/[_0x1700be(0x1cf)](_0x56236d);_0x1621bb?_0x480e3c[_0x1700be(0x21f)](Number(_0x56236d)):_0x480e3c['push'](DataManager[_0x1700be(0x39c)](_0x56236d));}}if(_0x480e3c['length']<=0x0)return;while(_0x480e3c[_0x1700be(0x2ef)]>this[_0x1700be(0x31b)]()){_0x480e3c[_0x1700be(0x2f2)]();}if(_0x480e3c['length']<=0x0)return;this[_0x1700be(0x31f)]();for(const _0x1bc688 of _0x480e3c){const _0x7ab940=new Game_Action(this);_0x7ab940['setSkill'](_0x1bc688),_0x7ab940[_0x1700be(0x2b2)]=!![],this['_actions'][_0x1700be(0x21f)](_0x7ab940);}},Game_Enemy[_0x4f4031(0x3d8)][_0x4f4031(0x236)]=function(){const _0xcdfe13=_0x4f4031;let _0x37dff0=this['numActions']();for(const _0x53e6f5 of this[_0xcdfe13(0x3be)]){if(!_0x53e6f5)continue;_0x37dff0+=_0x53e6f5[_0xcdfe13(0x1d1)]();}return _0x37dff0-0x1;},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x267)]=Game_Unit[_0x4f4031(0x3d8)][_0x4f4031(0x2ec)],Game_Unit[_0x4f4031(0x3d8)][_0x4f4031(0x2ec)]=function(){const _0x37fb55=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x37fb55(0x267)]['call'](this);if(BattleManager[_0x37fb55(0x2ba)]()&&this===$gameTroop&&SceneManager[_0x37fb55(0x1df)]()){if(_0x37fb55(0x3a8)!==_0x37fb55(0x3a8)){function _0x479dd4(){const _0x769ba8=_0x37fb55;_0x372260+=_0x590df6[_0x769ba8(0x405)];}}else BattleManager[_0x37fb55(0x26d)]();}},VisuMZ['BattleSystemBTB'][_0x4f4031(0x19a)]=Game_Party[_0x4f4031(0x3d8)][_0x4f4031(0x2c7)],Game_Party[_0x4f4031(0x3d8)][_0x4f4031(0x2c7)]=function(_0x2fb861){const _0x1934da=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x1934da(0x19a)][_0x1934da(0x3b0)](this,_0x2fb861),SceneManager[_0x1934da(0x1df)]()&&BattleManager[_0x1934da(0x1e6)]()&&BattleManager[_0x1934da(0x13e)][_0x1934da(0x346)]($gameActors['actor'](_0x2fb861));},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3f5)]=Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x213)],Scene_Battle[_0x4f4031(0x3d8)]['onDisabledPartyCommandSelection']=function(){const _0x1aadb0=_0x4f4031;BattleManager['isBTB']()?this['selectNextCommand']():VisuMZ[_0x1aadb0(0x15f)][_0x1aadb0(0x3f5)][_0x1aadb0(0x3b0)](this);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3ab)]=Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x2db)],Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x2db)]=function(){const _0x1ee43d=_0x4f4031;VisuMZ[_0x1ee43d(0x15f)][_0x1ee43d(0x3ab)][_0x1ee43d(0x3b0)](this),this[_0x1ee43d(0x2d7)]();},Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x2d7)]=function(){const _0x17a2bc=_0x4f4031;if(!BattleManager[_0x17a2bc(0x2ba)]())return;const _0x670cb3=this['_actorCommandWindow'];if(!_0x670cb3)return;_0x670cb3['setHandler'](_0x17a2bc(0x2a9),this[_0x17a2bc(0x280)][_0x17a2bc(0x32d)](this)),_0x670cb3[_0x17a2bc(0x322)](_0x17a2bc(0x36f),this['commandCancelBTB']['bind'](this));},Scene_Battle['prototype'][_0x4f4031(0x280)]=function(){const _0x1969a6=_0x4f4031;this[_0x1969a6(0x155)]();},Scene_Battle[_0x4f4031(0x3d8)]['commandCancelBTB']=function(){const _0x305a41=_0x4f4031,_0x38dbba=BattleManager[_0x305a41(0x410)]();if(!_0x38dbba)this[_0x305a41(0x2f8)]();else{if(_0x38dbba[_0x305a41(0x308)]()<=0x1)this[_0x305a41(0x2f8)]();else{if(_0x38dbba[_0x305a41(0x2bb)]>0x0)this['commandCancel']();else{if('xeKVj'==='xeKVj')this['reduceBrave']();else{function _0x5422df(){const _0x2f56b6=_0x305a41;_0x447949[_0x2f56b6(0x15f)][_0x2f56b6(0x2ac)][_0x2f56b6(0x3b0)](this),_0x2228d6[_0x2f56b6(0x30c)]();}}}}}},Scene_Battle['prototype']['performBrave']=function(){const _0x12aac3=_0x4f4031,_0x493dec=BattleManager[_0x12aac3(0x410)]();if(!_0x493dec)return;_0x493dec[_0x12aac3(0x155)]();const _0x1bbf20=this[_0x12aac3(0x1d9)]['_scrollX'],_0xa7ef81=this[_0x12aac3(0x1d9)]['_scrollY'],_0x5264f4=this['_actorCommandWindow'][_0x12aac3(0x414)]();this[_0x12aac3(0x1d9)][_0x12aac3(0x13f)](_0x493dec),this[_0x12aac3(0x1d9)][_0x12aac3(0x173)](_0x5264f4),this['_actorCommandWindow'][_0x12aac3(0x3c9)]=_0x1bbf20,this[_0x12aac3(0x1d9)][_0x12aac3(0x2ce)]=_0xa7ef81;},Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x1d2)]=function(){const _0x222c1b=_0x4f4031,_0xdc7d57=BattleManager[_0x222c1b(0x410)]();if(!_0xdc7d57)return;_0xdc7d57[_0x222c1b(0x27a)]();const _0x252fca=this[_0x222c1b(0x1d9)][_0x222c1b(0x3c9)],_0x5a468b=this[_0x222c1b(0x1d9)][_0x222c1b(0x2ce)],_0x49e2ae=this[_0x222c1b(0x1d9)]['index']();this[_0x222c1b(0x1d9)][_0x222c1b(0x13f)](_0xdc7d57),this[_0x222c1b(0x1d9)][_0x222c1b(0x173)](_0x49e2ae),this[_0x222c1b(0x1d9)][_0x222c1b(0x3c9)]=_0x252fca,this['_actorCommandWindow'][_0x222c1b(0x2ce)]=_0x5a468b;},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1ce)]=Scene_Battle[_0x4f4031(0x3d8)][_0x4f4031(0x3a7)],Scene_Battle['prototype']['createAllWindows']=function(){const _0x1024bb=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x1024bb(0x1ce)][_0x1024bb(0x3b0)](this),this['createBTBTurnOrderWindow']();},Scene_Battle['prototype'][_0x4f4031(0x33f)]=function(){const _0x28b190=_0x4f4031;if(!BattleManager[_0x28b190(0x2ba)]())return;this[_0x28b190(0x375)]=new Window_BTB_TurnOrder();const _0x2a4123=this[_0x28b190(0x337)](this[_0x28b190(0x327)]);this[_0x28b190(0x3ac)](this[_0x28b190(0x375)],_0x2a4123),this[_0x28b190(0x282)](),BattleManager[_0x28b190(0x334)](!![]);},Scene_Battle[_0x4f4031(0x3d8)]['repositionLogWindowBTB']=function(){const _0x8dcc7d=_0x4f4031,_0x37ecb5=Window_BTB_TurnOrder[_0x8dcc7d(0x3c3)];if(_0x37ecb5['DisplayPosition']!==_0x8dcc7d(0x274))return;if(!_0x37ecb5[_0x8dcc7d(0x258)])return;if(!this[_0x8dcc7d(0x179)])return;const _0x2d8aa2=this[_0x8dcc7d(0x375)]['y']-Math['round']((Graphics['height']-Graphics[_0x8dcc7d(0x1f8)])/0x2),_0x540d29=_0x2d8aa2+this['_btbTurnOrderWindow'][_0x8dcc7d(0x157)];this[_0x8dcc7d(0x179)]['y']=_0x540d29+_0x37ecb5[_0x8dcc7d(0x3f0)];};function Sprite_BTB_TurnOrder_Battler(){const _0x58d12b=_0x4f4031;this[_0x58d12b(0x38d)](...arguments);}Sprite_BTB_TurnOrder_Battler['prototype']=Object['create'](Sprite_Clickable[_0x4f4031(0x3d8)]),Sprite_BTB_TurnOrder_Battler['prototype']['constructor']=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['initialize']=function(_0x326d63,_0x329889){const _0x20a237=_0x4f4031;this[_0x20a237(0x3ec)](_0x326d63,_0x329889),Sprite_Clickable[_0x20a237(0x3d8)][_0x20a237(0x38d)][_0x20a237(0x3b0)](this),this[_0x20a237(0x22e)]=0x0,this[_0x20a237(0x259)](),this[_0x20a237(0x29d)]();},Sprite_BTB_TurnOrder_Battler['prototype']['initMembers']=function(_0x6fa8d3,_0x187454){const _0x3f67b1=_0x4f4031;this[_0x3f67b1(0x1e3)]=_0x6fa8d3,this[_0x3f67b1(0x1b5)]=_0x187454;const _0x586cfd=Window_BTB_TurnOrder['Settings'],_0xf51272=this['isHorz'](),_0x4177e0=this['defaultPosition']();this[_0x3f67b1(0x23c)]=0x0,this[_0x3f67b1(0x27f)]=_0xf51272?_0x586cfd[_0x3f67b1(0x3b8)]*_0x4177e0:0x0,this[_0x3f67b1(0x1f6)]=_0xf51272?0x0:_0x586cfd[_0x3f67b1(0x3b8)]*_0x4177e0,this['_fadeDuration']=0x0,this[_0x3f67b1(0x2d2)]=0xff,this[_0x3f67b1(0x20b)]=![],this[_0x3f67b1(0x1e9)]=![],this[_0x3f67b1(0x174)]=0x0,this[_0x3f67b1(0x3b3)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x259)]=function(){const _0x1a9628=_0x4f4031;this['createInitialPositions'](),this[_0x1a9628(0x2b9)](),this[_0x1a9628(0x3e7)](),this[_0x1a9628(0x39d)](),this['createLetterSprite']();},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x1d3)]=function(){const _0x4dca5e=_0x4f4031;this['x']=this[_0x4dca5e(0x27f)],this['y']=this[_0x4dca5e(0x1f6)];},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['isHorz']=function(){const _0x5353c8=_0x4f4031,_0x589cd7=Window_BTB_TurnOrder[_0x5353c8(0x3c3)],_0x22a7b8=[_0x5353c8(0x274),'bottom'][_0x5353c8(0x37a)](_0x589cd7[_0x5353c8(0x3aa)]);return _0x22a7b8;},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x197)]=function(){const _0x454f52=_0x4f4031,_0x254cdb=Window_BTB_TurnOrder[_0x454f52(0x3c3)];return this['isHorz']()?_0x254cdb[_0x454f52(0x3b8)]:_0x254cdb[_0x454f52(0x27d)];},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['bitmapHeight']=function(){const _0x52fe32=_0x4f4031,_0x52adaf=Window_BTB_TurnOrder[_0x52fe32(0x3c3)];return this[_0x52fe32(0x29e)]()?_0x52adaf[_0x52fe32(0x27d)]:_0x52adaf[_0x52fe32(0x3b8)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x272)]=function(){const _0x67295a=_0x4f4031;this[_0x67295a(0x363)]=new Bitmap(0x48,0x24);const _0x141db4=this['battler']()?this[_0x67295a(0x149)]()[_0x67295a(0x2ea)]():'%1\x20%2\x20%3'[_0x67295a(0x2a7)](this[_0x67295a(0x1e3)],this['_index']);this[_0x67295a(0x363)][_0x67295a(0x20e)](_0x141db4,0x0,0x0,0x48,0x24,'center');},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x2b9)]=function(){const _0x19d2f7=_0x4f4031;if(!Window_BTB_TurnOrder[_0x19d2f7(0x3c3)][_0x19d2f7(0x342)])return;const _0x49cc7b=Window_BTB_TurnOrder[_0x19d2f7(0x3c3)],_0x51e665=this[_0x19d2f7(0x1e3)]===$gameParty?'Actor':_0x19d2f7(0x23d),_0xeb6169=_0x19d2f7(0x25e)[_0x19d2f7(0x2a7)](_0x51e665),_0xd4fc4f=new Sprite();_0xd4fc4f[_0x19d2f7(0x2fa)]['x']=this[_0x19d2f7(0x2fa)]['x'],_0xd4fc4f[_0x19d2f7(0x2fa)]['y']=this[_0x19d2f7(0x2fa)]['y'];if(_0x49cc7b[_0xeb6169]){if(_0x19d2f7(0x38b)!==_0x19d2f7(0x184))_0xd4fc4f[_0x19d2f7(0x363)]=ImageManager[_0x19d2f7(0x2a6)](_0x49cc7b[_0xeb6169]);else{function _0x4ce660(){const _0x347b17=_0x19d2f7;_0x26b062[_0x347b17(0x15f)]['Window_Selectable_select']['call'](this,_0x125bbe),this[_0x347b17(0x343)]()&&this[_0x347b17(0x315)]&&this[_0x347b17(0x160)]();}}}else{const _0x409a8b=this['bitmapWidth'](),_0xd278c6=this[_0x19d2f7(0x147)]();_0xd4fc4f['bitmap']=new Bitmap(_0x409a8b,_0xd278c6);const _0x3e8a65=ColorManager[_0x19d2f7(0x254)](_0x49cc7b[_0x19d2f7(0x36a)[_0x19d2f7(0x2a7)](_0x51e665)]),_0x1c59f5=ColorManager[_0x19d2f7(0x254)](_0x49cc7b[_0x19d2f7(0x186)[_0x19d2f7(0x2a7)](_0x51e665)]);_0xd4fc4f['bitmap'][_0x19d2f7(0x360)](0x0,0x0,_0x409a8b,_0xd278c6,_0x3e8a65,_0x1c59f5,!![]);}this[_0x19d2f7(0x212)]=_0xd4fc4f,this[_0x19d2f7(0x1ad)](this[_0x19d2f7(0x212)]);},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x3e7)]=function(){const _0x27542d=_0x4f4031,_0x5bf397=new Sprite();_0x5bf397[_0x27542d(0x2fa)]['x']=this['anchor']['x'],_0x5bf397[_0x27542d(0x2fa)]['y']=this[_0x27542d(0x2fa)]['y'],this['_graphicSprite']=_0x5bf397,this[_0x27542d(0x1ad)](this[_0x27542d(0x158)]),this[_0x27542d(0x2d8)]();},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x39d)]=function(){const _0x49c1e0=_0x4f4031;if(!Window_BTB_TurnOrder['Settings']['ShowMarkerBorder'])return;const _0x357811=Window_BTB_TurnOrder[_0x49c1e0(0x3c3)],_0x30bc0a=this['_unit']===$gameParty?_0x49c1e0(0x39e):_0x49c1e0(0x23d),_0xc8bbc1=_0x49c1e0(0x265)[_0x49c1e0(0x2a7)](_0x30bc0a),_0x30da7a=new Sprite();_0x30da7a[_0x49c1e0(0x2fa)]['x']=this[_0x49c1e0(0x2fa)]['x'],_0x30da7a[_0x49c1e0(0x2fa)]['y']=this['anchor']['y'];if(_0x357811[_0xc8bbc1])_0x30da7a[_0x49c1e0(0x363)]=ImageManager[_0x49c1e0(0x2a6)](_0x357811[_0xc8bbc1]);else{let _0x1b1a00=this[_0x49c1e0(0x197)](),_0x356aed=this[_0x49c1e0(0x147)](),_0xc9c04=_0x357811[_0x49c1e0(0x232)];_0x30da7a['bitmap']=new Bitmap(_0x1b1a00,_0x356aed);const _0x2f131c=_0x49c1e0(0x330),_0x1a7a2d=ColorManager['getColor'](_0x357811['%1BorderColor'[_0x49c1e0(0x2a7)](_0x30bc0a)]);_0x30da7a[_0x49c1e0(0x363)][_0x49c1e0(0x2a1)](0x0,0x0,_0x1b1a00,_0x356aed,_0x2f131c),_0x1b1a00-=0x2,_0x356aed-=0x2,_0x30da7a[_0x49c1e0(0x363)][_0x49c1e0(0x2a1)](0x1,0x1,_0x1b1a00,_0x356aed,_0x1a7a2d),_0x1b1a00-=_0xc9c04*0x2,_0x356aed-=_0xc9c04*0x2,_0x30da7a[_0x49c1e0(0x363)][_0x49c1e0(0x2a1)](0x1+_0xc9c04,0x1+_0xc9c04,_0x1b1a00,_0x356aed,_0x2f131c),_0x1b1a00-=0x2,_0x356aed-=0x2,_0xc9c04+=0x1,_0x30da7a[_0x49c1e0(0x363)][_0x49c1e0(0x2d4)](0x1+_0xc9c04,0x1+_0xc9c04,_0x1b1a00,_0x356aed);}this[_0x49c1e0(0x212)]=_0x30da7a,this[_0x49c1e0(0x1ad)](this[_0x49c1e0(0x212)]),this[_0x49c1e0(0x219)]=this['_backgroundSprite']['width'],this[_0x49c1e0(0x157)]=this[_0x49c1e0(0x212)][_0x49c1e0(0x157)];},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x18f)]=function(){const _0x442261=_0x4f4031,_0x33e156=Window_BTB_TurnOrder[_0x442261(0x3c3)];if(!_0x33e156[_0x442261(0x231)])return;if(this['_unit']===$gameParty)return;const _0x2bb99b=this[_0x442261(0x197)](),_0x93fd1a=this[_0x442261(0x147)](),_0x10dc2e=new Sprite();_0x10dc2e[_0x442261(0x2fa)]['x']=this[_0x442261(0x2fa)]['x'],_0x10dc2e[_0x442261(0x2fa)]['y']=this[_0x442261(0x2fa)]['y'],_0x10dc2e[_0x442261(0x363)]=new Bitmap(_0x2bb99b,_0x93fd1a),this[_0x442261(0x3c6)]=_0x10dc2e,this[_0x442261(0x1ad)](this[_0x442261(0x3c6)]);},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['battler']=function(){const _0x4dda13=_0x4f4031;return this[_0x4dda13(0x1e3)]?this[_0x4dda13(0x1e3)][_0x4dda13(0x31d)]()[this[_0x4dda13(0x1b5)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x397)]=function(){const _0x59acd8=_0x4f4031;Sprite_Clickable[_0x59acd8(0x3d8)]['update'][_0x59acd8(0x3b0)](this),this[_0x59acd8(0x2c3)](),this[_0x59acd8(0x2e4)](),this[_0x59acd8(0x29d)](),this[_0x59acd8(0x1a2)](),this[_0x59acd8(0x2ad)](),this[_0x59acd8(0x297)](),this[_0x59acd8(0x348)](),this[_0x59acd8(0x1a8)]();},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2c3)]=function(){const _0x36021e=_0x4f4031,_0x539666=this[_0x36021e(0x222)]();if(this[_0x36021e(0x3de)]===_0x539666)return;this['_position']=_0x539666;this[_0x36021e(0x22e)]<0xff&&this[_0x36021e(0x149)]()&&_0x539666!==this[_0x36021e(0x141)]()&&this['startFade'](0xff);if(_0x539666===this[_0x36021e(0x141)]()&&this[_0x36021e(0x145)]<=0x0&&this[_0x36021e(0x22e)]>0x0){if(_0x36021e(0x384)!==_0x36021e(0x1bb))this[_0x36021e(0x2c2)](0x0);else{function _0x26f396(){const _0x4654bc=_0x36021e;if(!this[_0x4654bc(0x226)])return;const _0x3cbddc=this['_turnOrderInnerSprite'][_0x4654bc(0x162)];if(!_0x3cbddc)return;_0x3cbddc[_0x4654bc(0x183)](this[_0x4654bc(0x39f)][_0x4654bc(0x32d)](this));}}}else this['_fadeDuration']<=0x0&&this['opacity']<0xff&&this[_0x36021e(0x29d)]();this[_0x36021e(0x364)]();},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2cc)]=function(){const _0x1b95d4=_0x4f4031,_0x2ec426=this['containerWindow']();if(!_0x2ec426)return;let _0x5f49d2=![];if(this['_containerWidth']!==_0x2ec426[_0x1b95d4(0x219)]){if(_0x1b95d4(0x22d)!=='CkLWY'){function _0xb3d0f4(){const _0x481325=_0x1b95d4;_0x44fa3e[_0x481325(0x15f)][_0x481325(0x142)]['call'](this),this[_0x481325(0x19f)]();}}else _0x5f49d2=!![];}else{if(this[_0x1b95d4(0x3b3)]!==_0x2ec426[_0x1b95d4(0x157)]){if('QaXop'===_0x1b95d4(0x38e))_0x5f49d2=!![];else{function _0x5eef5c(){const _0x3e458d=_0x1b95d4;if(!this[_0x3e458d(0x2ba)]())return;if(!_0x22f667['isSceneBattle']())return;const _0x2664bf=this[_0x3e458d(0x13e)];for(const _0x384017 of _0x2664bf){_0x384017[_0x3e458d(0x3a5)]();}_0x2664bf[_0x3e458d(0x183)]((_0x5caa8f,_0x3d9660)=>_0x3d9660[_0x3e458d(0x344)]()-_0x5caa8f[_0x3e458d(0x344)]()),this[_0x3e458d(0x2ba)]()&&this[_0x3e458d(0x334)]();}}}}if(_0x5f49d2){if(_0x1b95d4(0x34e)===_0x1b95d4(0x34e))this[_0x1b95d4(0x364)]();else{function _0x18f345(){return![];}}}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['calculateTargetPositions']=function(){const _0x33b319=_0x4f4031,_0x198505=Window_BTB_TurnOrder[_0x33b319(0x3c3)],_0x396051=this[_0x33b319(0x29e)](),_0x39c0d1=_0x198505[_0x33b319(0x310)],_0x218e0c=_0x198505[_0x33b319(0x3f3)],_0x5fab7=SceneManager[_0x33b319(0x398)][_0x33b319(0x375)];if(!_0x5fab7)return;const _0x18a5c7=this[_0x33b319(0x222)]();this[_0x33b319(0x23c)]=_0x198505[_0x33b319(0x35a)],this[_0x33b319(0x27f)]=_0x396051?_0x198505['SpriteThin']*_0x18a5c7:0x0,this['_positionTargetY']=_0x396051?0x0:_0x198505['SpriteThin']*_0x18a5c7;_0x18a5c7>0x0&&(this[_0x33b319(0x27f)]+=_0x396051?_0x218e0c:0x0,this[_0x33b319(0x1f6)]+=_0x396051?0x0:_0x218e0c);if(_0x39c0d1){if(_0x33b319(0x205)===_0x33b319(0x33d)){function _0x3965be(){const _0x514be0=_0x33b319;delete this[_0x514be0(0x355)],delete this[_0x514be0(0x245)],delete this[_0x514be0(0x2f1)],delete this[_0x514be0(0x264)];}}else this[_0x33b319(0x27f)]=_0x396051?_0x5fab7[_0x33b319(0x219)]-this[_0x33b319(0x27f)]-_0x198505[_0x33b319(0x3b8)]:0x0;}else this['_positionTargetY']=_0x396051?0x0:_0x5fab7['height']-this[_0x33b319(0x1f6)]-_0x198505[_0x33b319(0x3b8)];},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2e4)]=function(){const _0x347e04=_0x4f4031;if(this[_0x347e04(0x145)]>0x0)return;if(this[_0x347e04(0x23c)]>0x0){const _0x2e9786=this[_0x347e04(0x23c)];this['x']=(this['x']*(_0x2e9786-0x1)+this[_0x347e04(0x27f)])/_0x2e9786,this['y']=(this['y']*(_0x2e9786-0x1)+this[_0x347e04(0x1f6)])/_0x2e9786,this['_positionDuration']--;}if(this[_0x347e04(0x23c)]<=0x0){this['x']=this['_positionTargetX'],this['y']=this[_0x347e04(0x1f6)];if(this[_0x347e04(0x22e)]<0xff&&!this[_0x347e04(0x217)]&&this['_fadeDuration']<=0x0){if(_0x347e04(0x304)===_0x347e04(0x304)){const _0x120c88=this['battler']();if(_0x120c88){if(_0x347e04(0x2a3)!==_0x347e04(0x165))this['_fadeTarget']=_0x120c88['isAlive']()&&_0x120c88['isAppeared']()?0xff:0x0;else{function _0x1e0ef9(){const _0x3a0bfd=_0x347e04;this[_0x3a0bfd(0x21f)](_0x3a0bfd(0x377));}}}}else{function _0x30d1b8(){const _0x1d0211=_0x347e04;this[_0x1d0211(0x21a)]();}}}}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x141)]=function(){const _0x1767cb=_0x4f4031,_0x33eb1e=Window_BTB_TurnOrder['Settings'],_0x32da20=this['isHorz']()?_0x33eb1e[_0x1767cb(0x241)]:_0x33eb1e[_0x1767cb(0x284)];return _0x32da20+0x1;},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x192)]=function(){const _0x39860d=_0x4f4031;return SceneManager['_scene'][_0x39860d(0x375)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x222)]=function(){const _0x4ee98e=_0x4f4031,_0x42bd66=this['battler']();if(!_0x42bd66)return this[_0x4ee98e(0x141)]();if(_0x42bd66===BattleManager['_subject']){if('sbsEW'===_0x4ee98e(0x262)){function _0x334591(){const _0x252618=_0x4ee98e;_0x3f8af1[_0x252618(0x15f)][_0x252618(0x3f5)][_0x252618(0x3b0)](this);}}else return 0x0;}if(BattleManager[_0x4ee98e(0x13e)][_0x4ee98e(0x37a)](_0x42bd66)){const _0x53677a=BattleManager[_0x4ee98e(0x13e)][_0x4ee98e(0x14e)](_0x42bd66)+0x1;return _0x53677a;}return this['defaultPosition']();},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['startFade']=function(_0x5a0973){const _0x22824c=_0x4f4031,_0x54a5e1=Window_BTB_TurnOrder[_0x22824c(0x3c3)];this[_0x22824c(0x145)]=_0x54a5e1[_0x22824c(0x35a)],this[_0x22824c(0x2d2)]=_0x5a0973;},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x29d)]=function(){const _0x179ad5=_0x4f4031,_0x17c7c2=this[_0x179ad5(0x149)]();if(!_0x17c7c2)return;if(this['_isAlive']===_0x17c7c2[_0x179ad5(0x3e4)]()&&this['_isAppeared']===_0x17c7c2[_0x179ad5(0x286)]())return;this['_isAlive']=_0x17c7c2[_0x179ad5(0x3e4)](),this[_0x179ad5(0x1e9)]=_0x17c7c2[_0x179ad5(0x286)]();let _0x24d3d1=this['_isAlive']&&this['_isAppeared']?0xff:0x0;this[_0x179ad5(0x2c2)](_0x24d3d1);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x1a2)]=function(){const _0x38cc9c=_0x4f4031;if(this[_0x38cc9c(0x145)]>0x0){if(_0x38cc9c(0x16e)!==_0x38cc9c(0x16e)){function _0x5c809b(){const _0x48c300=_0x38cc9c;this[_0x48c300(0x38d)](...arguments);}}else{const _0x350279=this[_0x38cc9c(0x145)];this[_0x38cc9c(0x22e)]=(this[_0x38cc9c(0x22e)]*(_0x350279-0x1)+this[_0x38cc9c(0x2d2)])/_0x350279,this[_0x38cc9c(0x145)]--,this[_0x38cc9c(0x145)]<=0x0&&(this[_0x38cc9c(0x2c3)](),this[_0x38cc9c(0x23c)]=0x0,this[_0x38cc9c(0x2e4)](),this[_0x38cc9c(0x22e)]=this['_fadeTarget']);}}if(this['_isBattleOver'])return;if(BattleManager[_0x38cc9c(0x2f0)]===_0x38cc9c(0x320)){if(_0x38cc9c(0x3d9)===_0x38cc9c(0x2ab)){function _0x32857b(){const _0xa30cc9=_0x38cc9c;return _0x5ca060[_0xa30cc9(0x2ba)]();}}else this[_0x38cc9c(0x217)]=!![],this[_0x38cc9c(0x2c2)](0x0);}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2ad)]=function(){const _0x2271ba=_0x4f4031,_0x1d763c=this[_0x2271ba(0x149)]();if(!_0x1d763c)return;const _0x4e3042=Window_BTB_TurnOrder[_0x2271ba(0x3c3)],_0x4f78b6=this[_0x2271ba(0x1e3)]===$gameParty?_0x2271ba(0x39e):_0x2271ba(0x23d);let _0x58ffbe=_0x1d763c[_0x2271ba(0x18a)]();if(_0x1d763c['isActor']()&&_0x58ffbe===_0x2271ba(0x3b4)){if(_0x2271ba(0x1a4)!=='cqNeK'){function _0x4492bf(){const _0x5ad364=_0x2271ba;_0x219f06[_0x5ad364(0x398)][_0x5ad364(0x1d2)]();}}else _0x58ffbe='face';}else{if(_0x1d763c[_0x2271ba(0x379)]()&&_0x58ffbe==='svactor'){if(_0x2271ba(0x1c8)!==_0x2271ba(0x1c8)){function _0x1e606a(){const _0x1f6768=_0x2271ba,_0x3b0635=this[_0x1f6768(0x23c)];this['x']=(this['x']*(_0x3b0635-0x1)+this[_0x1f6768(0x27f)])/_0x3b0635,this['y']=(this['y']*(_0x3b0635-0x1)+this[_0x1f6768(0x1f6)])/_0x3b0635,this[_0x1f6768(0x23c)]--;}}else _0x58ffbe=_0x2271ba(0x3b4);}}if(this['_graphicType']!==_0x58ffbe)return this[_0x2271ba(0x2d8)]();switch(this['_graphicType']){case _0x2271ba(0x20c):if(this[_0x2271ba(0x3cb)]!==_0x1d763c['TurnOrderBTBGraphicFaceName']()){if(_0x2271ba(0x3bf)!==_0x2271ba(0x3d6))return this[_0x2271ba(0x2d8)]();else{function _0x5e7644(){const _0x162287=_0x2271ba;_0x4db184[_0x162287(0x3d8)][_0x162287(0x397)]['call'](this),this[_0x162287(0x2c6)](),this[_0x162287(0x2e4)](),this[_0x162287(0x2eb)](),this[_0x162287(0x1bf)](),this[_0x162287(0x3f1)]();}}}if(this[_0x2271ba(0x3b1)]!==_0x1d763c[_0x2271ba(0x3c5)]()){if(_0x2271ba(0x211)!==_0x2271ba(0x211)){function _0x5b15e6(){const _0x5f3fb5=_0x2271ba;for(var _0x1115f7=0x0;_0x1115f7<_0x5c3d31['length'];_0x1115f7++){_0xf43c14['push'](_0x31f61e+'-'+_0x158a01[_0x1115f7]),_0x571432(_0x21a697+'-'+_0x50235f[_0x1115f7],_0x4f6ba7[_0x5f3fb5(0x1d7)](_0x1115f7+0x1));}}}else return this[_0x2271ba(0x2d8)]();}break;case _0x2271ba(0x394):if(this[_0x2271ba(0x3f6)]!==_0x1d763c[_0x2271ba(0x400)]())return this[_0x2271ba(0x2d8)]();break;case _0x2271ba(0x3b4):if(_0x1d763c[_0x2271ba(0x376)]()){if(_0x2271ba(0x15e)===_0x2271ba(0x20d)){function _0x3c41eb(){const _0x444f1f=_0x2271ba;_0x31b886[_0x444f1f(0x15f)][_0x444f1f(0x273)]['call'](this);}}else{if(this[_0x2271ba(0x263)]!==_0x1d763c[_0x2271ba(0x164)]()){if('BfQTM'==='DXJCb'){function _0x1c2036(){return _0xf4b77e(_0x30b83a['$1']);}}else return this[_0x2271ba(0x2d8)]();}}}else{if(this[_0x2271ba(0x403)]!==_0x1d763c['battlerName']()){if(_0x2271ba(0x3e8)!==_0x2271ba(0x2a5))return this[_0x2271ba(0x2d8)]();else{function _0x5390d4(){const _0x12b99c=_0x2271ba;_0xd7ad26=_0x12b99c(0x3b4);}}}}break;case _0x2271ba(0x2d6):if(_0x1d763c['isActor']()){if(this[_0x2271ba(0x263)]!==_0x1d763c['battlerName']())return this[_0x2271ba(0x2d8)]();}else{if(this['_graphicEnemy']!==_0x1d763c[_0x2271ba(0x371)]())return this[_0x2271ba(0x2d8)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x2d8)]=function(){const _0x3a9a4d=_0x4f4031,_0x42a2fb=this[_0x3a9a4d(0x149)]();if(!_0x42a2fb)return;this['_graphicType']=_0x42a2fb[_0x3a9a4d(0x18a)]();if(_0x42a2fb[_0x3a9a4d(0x365)]()&&this['_graphicType']===_0x3a9a4d(0x3b4)){if(_0x3a9a4d(0x2c1)===_0x3a9a4d(0x2c1))this[_0x3a9a4d(0x2e5)]=_0x3a9a4d(0x20c);else{function _0x490751(){const _0x2d91f4=_0x3a9a4d,_0x5bf2f5=this[_0x2d91f4(0x2e3)](),_0x5282a3=_0x743d0a[_0x2d91f4(0x31c)]();if(_0x5282a3)_0x5282a3['setItem'](_0x5bf2f5?_0x5bf2f5['id']:null);_0x2a7b98['prototype'][_0x2d91f4(0x160)][_0x2d91f4(0x3b0)](this);}}}else _0x42a2fb['isEnemy']()&&this[_0x3a9a4d(0x2e5)]===_0x3a9a4d(0x2d6)&&(this[_0x3a9a4d(0x2e5)]=_0x3a9a4d(0x3b4));let _0x3d265e;switch(this[_0x3a9a4d(0x2e5)]){case _0x3a9a4d(0x20c):this[_0x3a9a4d(0x3cb)]=_0x42a2fb[_0x3a9a4d(0x16f)](),this[_0x3a9a4d(0x3b1)]=_0x42a2fb[_0x3a9a4d(0x3c5)](),_0x3d265e=ImageManager['loadFace'](this[_0x3a9a4d(0x3cb)]),_0x3d265e[_0x3a9a4d(0x237)](this[_0x3a9a4d(0x37f)][_0x3a9a4d(0x32d)](this,_0x3d265e));break;case'icon':this[_0x3a9a4d(0x3f6)]=_0x42a2fb[_0x3a9a4d(0x23e)](),_0x3d265e=ImageManager['loadSystem'](_0x3a9a4d(0x144)),_0x3d265e[_0x3a9a4d(0x237)](this[_0x3a9a4d(0x25b)][_0x3a9a4d(0x32d)](this,_0x3d265e));break;case _0x3a9a4d(0x3b4):if(_0x42a2fb[_0x3a9a4d(0x376)]())this[_0x3a9a4d(0x263)]=_0x42a2fb[_0x3a9a4d(0x164)](),_0x3d265e=ImageManager[_0x3a9a4d(0x356)](this[_0x3a9a4d(0x263)]),_0x3d265e['addLoadListener'](this[_0x3a9a4d(0x325)][_0x3a9a4d(0x32d)](this,_0x3d265e));else $gameSystem[_0x3a9a4d(0x3e1)]()?(this[_0x3a9a4d(0x403)]=_0x42a2fb[_0x3a9a4d(0x371)](),_0x3d265e=ImageManager[_0x3a9a4d(0x1e1)](this[_0x3a9a4d(0x403)]),_0x3d265e[_0x3a9a4d(0x237)](this['changeEnemyGraphicBitmap']['bind'](this,_0x3d265e))):(this[_0x3a9a4d(0x403)]=_0x42a2fb[_0x3a9a4d(0x371)](),_0x3d265e=ImageManager[_0x3a9a4d(0x27e)](this['_graphicEnemy']),_0x3d265e[_0x3a9a4d(0x237)](this[_0x3a9a4d(0x312)][_0x3a9a4d(0x32d)](this,_0x3d265e)));break;case _0x3a9a4d(0x2d6):this['_graphicSv']=_0x42a2fb[_0x3a9a4d(0x371)](),_0x3d265e=ImageManager[_0x3a9a4d(0x356)](this[_0x3a9a4d(0x263)]),_0x3d265e['addLoadListener'](this[_0x3a9a4d(0x325)][_0x3a9a4d(0x32d)](this,_0x3d265e));break;}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['changeFaceGraphicBitmap']=function(_0x52919f){const _0x54fafc=_0x4f4031,_0x135d23=this['_graphicFaceIndex'],_0x5e44f7=this[_0x54fafc(0x197)](),_0x25ee7f=this[_0x54fafc(0x147)](),_0x54988e=Math['max'](_0x5e44f7,_0x25ee7f);this[_0x54fafc(0x158)][_0x54fafc(0x363)]=new Bitmap(_0x5e44f7,_0x25ee7f);const _0x1d7869=this['_graphicSprite'][_0x54fafc(0x363)],_0x507a01=ImageManager[_0x54fafc(0x221)],_0xa65c01=ImageManager['faceHeight'],_0x419fb3=_0x54988e/Math[_0x54fafc(0x252)](_0x507a01,_0xa65c01),_0x3cc236=ImageManager[_0x54fafc(0x221)],_0x5ba673=ImageManager[_0x54fafc(0x2a2)],_0x2e4757=_0x135d23%0x4*_0x507a01+(_0x507a01-_0x3cc236)/0x2,_0x3d1dd0=Math[_0x54fafc(0x2fb)](_0x135d23/0x4)*_0xa65c01+(_0xa65c01-_0x5ba673)/0x2,_0x31b4b3=(_0x5e44f7-_0x507a01*_0x419fb3)/0x2,_0x2e01f0=(_0x25ee7f-_0xa65c01*_0x419fb3)/0x2;_0x1d7869['blt'](_0x52919f,_0x2e4757,_0x3d1dd0,_0x3cc236,_0x5ba673,_0x31b4b3,_0x2e01f0,_0x54988e,_0x54988e);},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x25b)]=function(_0x4302ff){const _0x33b392=_0x4f4031,_0x56f1dc=this[_0x33b392(0x3f6)],_0xa6ff47=this[_0x33b392(0x197)](),_0x29d1e0=this[_0x33b392(0x147)]();this[_0x33b392(0x158)][_0x33b392(0x363)]=new Bitmap(_0xa6ff47,_0x29d1e0);const _0x519891=this[_0x33b392(0x158)]['bitmap'],_0x7a93f3=ImageManager[_0x33b392(0x405)],_0x521fe6=ImageManager[_0x33b392(0x391)],_0x157013=Math['min'](_0x7a93f3,_0x521fe6,_0xa6ff47,_0x29d1e0),_0x35b760=_0x56f1dc%0x10*_0x7a93f3,_0x20a87f=Math[_0x33b392(0x2fb)](_0x56f1dc/0x10)*_0x521fe6,_0x259749=Math[_0x33b392(0x2fb)](Math[_0x33b392(0x252)](_0xa6ff47-_0x157013,0x0)/0x2),_0x3e5d79=Math[_0x33b392(0x2fb)](Math[_0x33b392(0x252)](_0x29d1e0-_0x157013,0x0)/0x2);_0x519891[_0x33b392(0x32b)](_0x4302ff,_0x35b760,_0x20a87f,_0x7a93f3,_0x521fe6,_0x259749,_0x3e5d79,_0x157013,_0x157013);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x325)]=function(_0xc94723){const _0x50f5d8=_0x4f4031,_0x2380ef=this['bitmapWidth'](),_0x3fecec=this[_0x50f5d8(0x147)](),_0x2eaa08=Math['min'](_0x2380ef,_0x3fecec);this[_0x50f5d8(0x158)][_0x50f5d8(0x363)]=new Bitmap(_0x2380ef,_0x3fecec);const _0x48426d=this[_0x50f5d8(0x158)][_0x50f5d8(0x363)],_0x40bd17=0x9,_0x9a9526=0x6,_0x477ec9=_0xc94723[_0x50f5d8(0x219)]/_0x40bd17,_0x578988=_0xc94723[_0x50f5d8(0x157)]/_0x9a9526,_0x27faf8=Math[_0x50f5d8(0x301)](0x1,_0x2eaa08/_0x477ec9,_0x2eaa08/_0x578988),_0x2fbbad=_0x477ec9*_0x27faf8,_0x43a881=_0x578988*_0x27faf8,_0x5b695b=Math[_0x50f5d8(0x2cb)]((_0x2380ef-_0x2fbbad)/0x2),_0x3c8f81=Math[_0x50f5d8(0x2cb)]((_0x3fecec-_0x43a881)/0x2);_0x48426d[_0x50f5d8(0x32b)](_0xc94723,0x0,0x0,_0x477ec9,_0x578988,_0x5b695b,_0x3c8f81,_0x2fbbad,_0x43a881);},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x312)]=function(_0x395f6d){const _0x4fd029=_0x4f4031,_0x45b9a2=Window_BTB_TurnOrder[_0x4fd029(0x3c3)],_0x4f7069=this[_0x4fd029(0x197)](),_0x44c250=this[_0x4fd029(0x147)](),_0x491809=Math[_0x4fd029(0x301)](_0x4f7069,_0x44c250);this[_0x4fd029(0x158)][_0x4fd029(0x363)]=new Bitmap(_0x4f7069,_0x44c250);const _0x2c07a8=this[_0x4fd029(0x158)][_0x4fd029(0x363)],_0x49e22b=Math['min'](0x1,_0x491809/_0x395f6d[_0x4fd029(0x219)],_0x491809/_0x395f6d[_0x4fd029(0x157)]),_0x198920=_0x395f6d[_0x4fd029(0x219)]*_0x49e22b,_0x294c14=_0x395f6d['height']*_0x49e22b,_0x3bf519=Math[_0x4fd029(0x2cb)]((_0x4f7069-_0x198920)/0x2),_0x53dfa7=Math[_0x4fd029(0x2cb)]((_0x44c250-_0x294c14)/0x2);_0x2c07a8['blt'](_0x395f6d,0x0,0x0,_0x395f6d[_0x4fd029(0x219)],_0x395f6d[_0x4fd029(0x157)],_0x3bf519,_0x53dfa7,_0x198920,_0x294c14);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x297)]=function(){const _0x40ed42=_0x4f4031,_0x1c4968=this[_0x40ed42(0x149)]();if(!_0x1c4968)return;if(!_0x1c4968[_0x40ed42(0x379)]())return;if(this[_0x40ed42(0x388)]===_0x1c4968[_0x40ed42(0x21c)]())return;this[_0x40ed42(0x388)]=_0x1c4968[_0x40ed42(0x21c)]();if(_0x1c4968[_0x40ed42(0x376)]())this['_graphicHue']=0x0;this['_graphicSprite'][_0x40ed42(0x3b9)](this['_graphicHue']);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4f4031(0x348)]=function(){const _0x14f988=_0x4f4031;if(!this[_0x14f988(0x3c6)])return;const _0x107192=this['battler']();if(!_0x107192)return;if(this['_letter']===_0x107192[_0x14f988(0x268)]&&this[_0x14f988(0x281)]===_0x107192[_0x14f988(0x281)])return;this['_letter']=_0x107192[_0x14f988(0x268)],this[_0x14f988(0x281)]=_0x107192['_plural'];const _0x1042f4=Window_BTB_TurnOrder[_0x14f988(0x3c3)],_0x4cfbe5=this[_0x14f988(0x29e)](),_0xb57af5=this['bitmapWidth'](),_0x14ffdb=this[_0x14f988(0x147)](),_0x21781b=this[_0x14f988(0x3c6)][_0x14f988(0x363)];_0x21781b['clear']();if(!this[_0x14f988(0x281)])return;_0x21781b[_0x14f988(0x1a0)]=_0x1042f4['EnemyBattlerFontFace']||$gameSystem[_0x14f988(0x37d)](),_0x21781b['fontSize']=_0x1042f4[_0x14f988(0x3ea)]||0x10;if(_0x4cfbe5)_0x21781b['drawText'](this[_0x14f988(0x268)]['trim'](),0x0,_0x14ffdb/0x2,_0xb57af5,_0x14ffdb/0x2,_0x14f988(0x2bd));else{if(_0x14f988(0x3b2)==='RWTGO')_0x21781b[_0x14f988(0x20e)](this[_0x14f988(0x268)][_0x14f988(0x3f4)](),0x0,0x2,_0xb57af5-0x8,_0x14ffdb-0x4,_0x14f988(0x33a));else{function _0x4b6d17(){const _0x2be6b4=_0x14f988;this[_0x2be6b4(0x363)]=new _0x242700(0x48,0x24);const _0x45b283=this[_0x2be6b4(0x149)]()?this['battler']()[_0x2be6b4(0x2ea)]():_0x2be6b4(0x1ab)['format'](this[_0x2be6b4(0x1e3)],this[_0x2be6b4(0x1b5)]);this[_0x2be6b4(0x363)][_0x2be6b4(0x20e)](_0x45b283,0x0,0x0,0x48,0x24,'center');}}}},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)][_0x4f4031(0x1a8)]=function(){const _0x156841=_0x4f4031,_0x242009=this[_0x156841(0x149)]();if(!_0x242009)return;const _0x50fcae=_0x242009[_0x156841(0x149)]();if(!_0x50fcae)return;const _0x4f1406=_0x50fcae['mainSprite']();if(!_0x4f1406)return;this['setBlendColor'](_0x4f1406['_blendColor']);},Sprite_BTB_TurnOrder_Battler[_0x4f4031(0x3d8)]['getStateTooltipBattler']=function(){return this['battler']();},VisuMZ['BattleSystemBTB'][_0x4f4031(0x402)]=Window_Base['prototype'][_0x4f4031(0x16a)],Window_Base[_0x4f4031(0x3d8)][_0x4f4031(0x16a)]=function(_0x30955f,_0x1972d3,_0xda738a){const _0x2d2ef2=_0x4f4031;return _0xda738a=VisuMZ[_0x2d2ef2(0x15f)][_0x2d2ef2(0x402)][_0x2d2ef2(0x3b0)](this,_0x30955f,_0x1972d3,_0xda738a),_0xda738a=this[_0x2d2ef2(0x269)](_0x30955f,_0x1972d3,_0xda738a),_0xda738a;},VisuMZ['BattleSystemBTB'][_0x4f4031(0x351)]=Window_Base['prototype'][_0x4f4031(0x18d)],Window_Base[_0x4f4031(0x3d8)]['drawItemNumber']=function(_0x383820,_0x4b59d8,_0x12ddca,_0xa5a097){const _0xd36f0f=_0x4f4031;if(BattleManager[_0xd36f0f(0x2ba)]()&&this[_0xd36f0f(0x1a6)]===Window_BattleItem){if(_0xd36f0f(0x329)==='RnooX')this[_0xd36f0f(0x17d)](_0x383820,_0x4b59d8,_0x12ddca,_0xa5a097);else{function _0x27502f(){const _0x33a792=_0xd36f0f;_0x310282['BattleSystemBTB'][_0x33a792(0x1c7)][_0x33a792(0x3b0)](this,_0x55207e),_0x5f118f[_0x33a792(0x1af)]();}}}else{if('rEYVv'==='rEYVv')VisuMZ[_0xd36f0f(0x15f)][_0xd36f0f(0x351)][_0xd36f0f(0x3b0)](this,_0x383820,_0x4b59d8,_0x12ddca,_0xa5a097);else{function _0x3eea78(){const _0x49b07b=_0xd36f0f;return _0xd00a1c[_0x49b07b(0x2ba)]()?_0x418d4b['BattleSystemBTB'][_0x49b07b(0x3c3)]['Mechanics'][_0x49b07b(0x228)]:_0x22f5f9[_0x49b07b(0x15f)][_0x49b07b(0x277)][_0x49b07b(0x3b0)](this);}}}this['resetFontSettings']();},Window_Base[_0x4f4031(0x3d8)][_0x4f4031(0x17d)]=function(_0x5b65c8,_0x506eb3,_0x146a44,_0x91aeeb){const _0x34b8c1=_0x4f4031,_0x3de287=VisuMZ[_0x34b8c1(0x15f)][_0x34b8c1(0x3c3)][_0x34b8c1(0x1c4)],_0x3de04e=BattleManager[_0x34b8c1(0x3d2)]||$gameParty['members']()[0x0],_0x1a9d38=this[_0x34b8c1(0x269)](_0x3de04e,_0x5b65c8,''),_0xe1bd5d=this['textSizeEx'](_0x1a9d38)['width'],_0x4f8f0a=_0x3de287['CostPosition'];let _0x2353e9=_0x506eb3+_0x91aeeb-_0xe1bd5d;if(_0x1a9d38==='')VisuMZ[_0x34b8c1(0x15f)]['Window_Base_drawItemNumber'][_0x34b8c1(0x3b0)](this,_0x5b65c8,_0x506eb3,_0x146a44,_0x91aeeb);else{if(this[_0x34b8c1(0x225)](_0x5b65c8)){this[_0x34b8c1(0x21d)]();const _0x54caec=VisuMZ[_0x34b8c1(0x381)][_0x34b8c1(0x3c3)]['ItemScene'];this[_0x34b8c1(0x321)][_0x34b8c1(0x1cd)]=_0x54caec['ItemQuantityFontSize'];if(_0x4f8f0a){const _0x3cca7e=_0x54caec[_0x34b8c1(0x1ec)],_0x2d512c=_0x3cca7e[_0x34b8c1(0x2a7)]($gameParty[_0x34b8c1(0x3db)](_0x5b65c8)),_0x151868=this[_0x34b8c1(0x1dc)](_0x2d512c+this['skillCostSeparator']());_0x2353e9-=_0x151868;}else _0x91aeeb-=this[_0x34b8c1(0x1dc)](this[_0x34b8c1(0x413)]())+_0xe1bd5d;VisuMZ['BattleSystemBTB'][_0x34b8c1(0x351)][_0x34b8c1(0x3b0)](this,_0x5b65c8,_0x506eb3,_0x146a44,_0x91aeeb);}}this[_0x34b8c1(0x34f)](_0x1a9d38,_0x2353e9,_0x146a44);},Window_Base[_0x4f4031(0x3d8)][_0x4f4031(0x269)]=function(_0x3a24ae,_0x394dab,_0x3dd002){const _0x669294=_0x4f4031;if(!BattleManager[_0x669294(0x2ba)]())return _0x3dd002;if(!_0x3a24ae)return _0x3dd002;if(!_0x394dab)return _0x3dd002;if(_0x394dab[_0x669294(0x15a)][_0x669294(0x2cf)](VisuMZ[_0x669294(0x15f)][_0x669294(0x2ca)]['HideBravePointCost']))return _0x3dd002;let _0x5dc37b=_0x3a24ae[_0x669294(0x407)](_0x394dab);const _0x29a3d1=VisuMZ[_0x669294(0x15f)][_0x669294(0x3c3)][_0x669294(0x1c4)],_0x7fb6af=_0x29a3d1[_0x669294(0x21b)],_0x137635=_0x29a3d1['ShowCostForAttack'],_0x2ad273=_0x29a3d1['ShowCostForGuard'],_0x31e81a=_0x29a3d1[_0x669294(0x2e0)]||0x0,_0x577244=_0x29a3d1[_0x669294(0x30f)],_0x3b5c1e=_0x29a3d1[_0x669294(0x170)];if(DataManager[_0x669294(0x28a)](_0x394dab)&&this['constructor']===Window_ActorCommand){if(!_0x137635&&_0x394dab['id']===_0x3a24ae['attackSkillId']())return _0x3dd002;if(!_0x2ad273&&_0x394dab['id']===_0x3a24ae[_0x669294(0x3f8)]())return _0x3dd002;}_0x5dc37b-=_0x31e81a;if(_0x5dc37b<0x0)return _0x3dd002;if(!_0x577244&&_0x5dc37b===0x0)return _0x3dd002;if(!_0x3b5c1e&&_0x5dc37b===0x1)return _0x3dd002;const _0x58b93f='\x5cI[%1]'['format'](ImageManager[_0x669294(0x3f2)]),_0x3ad618=TextManager[_0x669294(0x2d0)];let _0x2900a2=TextManager[_0x669294(0x2e6)]['format'](_0x5dc37b,_0x3ad618,_0x58b93f);if(_0x3dd002==='')_0x3dd002+=_0x2900a2;else{if(_0x7fb6af)_0x3dd002=_0x2900a2+this[_0x669294(0x413)]()+_0x3dd002;else{if(_0x669294(0x392)!==_0x669294(0x392)){function _0x1cd9fa(){const _0xb0e83a=_0x669294;_0x918a71[_0xb0e83a(0x2ba)]()&&this[_0xb0e83a(0x1a6)]===_0x1af9d7?this[_0xb0e83a(0x17d)](_0x36c7cc,_0x565273,_0x1da66b,_0x34333f):_0x25dac7['BattleSystemBTB'][_0xb0e83a(0x351)][_0xb0e83a(0x3b0)](this,_0x551015,_0x22f25e,_0x461a15,_0x30e7b9),this[_0xb0e83a(0x21d)]();}}else _0x3dd002=_0x3dd002+this[_0x669294(0x413)]()+_0x2900a2;}}return _0x3dd002;},Window_Selectable[_0x4f4031(0x3d8)]['isBattleItemWindowBTB']=function(){return![];},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3bb)]=Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x173)],Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x173)]=function(_0x537237){const _0x1d5cf8=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x1d5cf8(0x3bb)][_0x1d5cf8(0x3b0)](this,_0x537237),this['isBattleItemWindowBTB']()&&this[_0x1d5cf8(0x315)]&&this['applyBattleItemWindowBTB']();},Window_Selectable['prototype'][_0x4f4031(0x160)]=function(){const _0x3b0da7=_0x4f4031;BattleManager[_0x3b0da7(0x1af)]();},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x36e)]=Window_Help[_0x4f4031(0x3d8)]['setItem'],Window_Help[_0x4f4031(0x3d8)][_0x4f4031(0x2ae)]=function(_0x6cb85d){const _0x13481b=_0x4f4031;if(BattleManager[_0x13481b(0x2ba)]()&&_0x6cb85d&&_0x6cb85d[_0x13481b(0x15a)]&&_0x6cb85d[_0x13481b(0x15a)][_0x13481b(0x2cf)](VisuMZ[_0x13481b(0x15f)][_0x13481b(0x2ca)][_0x13481b(0x28b)]))this[_0x13481b(0x1d5)](String(RegExp['$1']));else{if(_0x13481b(0x3a6)===_0x13481b(0x303)){function _0x4c85f3(){const _0x1513ed=_0x13481b;if(!_0x2e6675[_0x1513ed(0x1df)]())return;if(!this[_0x1513ed(0x2ba)]())return;const _0x252074=_0x11fceb[_0x1513ed(0x398)];if(!_0x252074)return;const _0x4a7828=_0x252074['_statusWindow'];if(!_0x4a7828)return;_0x4a7828['requestRefresh']();}}else VisuMZ[_0x13481b(0x15f)][_0x13481b(0x36e)][_0x13481b(0x3b0)](this,_0x6cb85d);}},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1b4)]=Window_BattleLog[_0x4f4031(0x3d8)][_0x4f4031(0x29c)],Window_BattleLog['prototype'][_0x4f4031(0x29c)]=function(_0x21562c,_0x14b53f,_0x450b4b){const _0x570eea=_0x4f4031;this[_0x570eea(0x1b3)](_0x21562c)?this[_0x570eea(0x1ea)](_0x21562c,_0x14b53f,_0x450b4b):VisuMZ['BattleSystemBTB'][_0x570eea(0x1b4)][_0x570eea(0x3b0)](this,_0x21562c,_0x14b53f,_0x450b4b);},Window_BattleLog[_0x4f4031(0x3d8)][_0x4f4031(0x1a1)]=function(_0x28a370,_0x1a0912,_0x522f0e){const _0x50f2ba=_0x4f4031;VisuMZ['BattleSystemBTB'][_0x50f2ba(0x1b4)][_0x50f2ba(0x3b0)](this,_0x28a370,_0x1a0912,_0x522f0e);},Window_BattleLog[_0x4f4031(0x3d8)][_0x4f4031(0x1b3)]=function(_0x52d2d9){const _0x14a36c=_0x4f4031;if(!BattleManager['isBTB']())return![];if(!_0x52d2d9)return![];if(!_0x52d2d9['isEnemy']())return![];if(_0x52d2d9[_0x14a36c(0x230)])return![];const _0x2c8706=VisuMZ[_0x14a36c(0x15f)]['Settings'][_0x14a36c(0x3e6)];if(!_0x2c8706[_0x14a36c(0x1c2)])return![];if(_0x2c8706['BraveAnimationID']<=0x0)return![];return VisuMZ[_0x14a36c(0x15f)][_0x14a36c(0x3c3)]['BraveAnimation']['ShowEnemyBrave'];},Window_BattleLog[_0x4f4031(0x3d8)][_0x4f4031(0x1ea)]=function(_0x522647,_0x195085,_0x498b77){const _0x426654=_0x4f4031;_0x522647[_0x426654(0x230)]=!![];let _0x440a65=_0x522647['braveAnimationTimes']();const _0x2b3cf0=VisuMZ['BattleSystemBTB']['Settings'][_0x426654(0x3e6)],_0x56b9c6=_0x2b3cf0[_0x426654(0x204)],_0x4eddf8=_0x2b3cf0[_0x426654(0x168)];while(_0x440a65--){if('czzLY'===_0x426654(0x386)){function _0x274f2a(){const _0x30c908=_0x426654;if(!_0x53c389&&_0x924173['id']===_0x5e742d[_0x30c908(0x1fd)]())return _0x2cd971;if(!_0x10d70e&&_0x48db9a['id']===_0x4fd807['guardSkillId']())return _0x45c82f;}}else this[_0x426654(0x21f)](_0x426654(0x1d8),[_0x522647],_0x56b9c6),_0x440a65>0x0?this['push']('waitCount',_0x4eddf8):this[_0x426654(0x21f)](_0x426654(0x377));}this['push'](_0x426654(0x1a1),_0x522647,_0x195085,_0x498b77);},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x2af)]=Window_ActorCommand[_0x4f4031(0x3d8)]['addGuardCommand'],Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x2c0)]=function(){const _0x2a486e=_0x4f4031;this['addBraveCommand'](),VisuMZ[_0x2a486e(0x15f)][_0x2a486e(0x2af)]['call'](this);},Window_ActorCommand['prototype'][_0x4f4031(0x188)]=function(){const _0x50cfbf=_0x4f4031;if(!this['canAddBraveCommand']())return;const _0x13cbf6=this['commandStyle'](),_0x1cd8f4=TextManager[_0x50cfbf(0x1d6)],_0x3acfd4=ImageManager['btbBravePointsIcon'],_0x5adf9a=_0x13cbf6===_0x50cfbf(0x177)?_0x1cd8f4:'\x5cI[%1]%2'['format'](_0x3acfd4,_0x1cd8f4);this[_0x50cfbf(0x39a)](_0x5adf9a,'brave',this[_0x50cfbf(0x3d2)][_0x50cfbf(0x2fc)]()),BattleManager['refreshStatusBTB']();},Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x26b)]=function(){const _0x272138=_0x4f4031;if(!BattleManager['isBTB']())return![];if(!VisuMZ[_0x272138(0x15f)][_0x272138(0x3c3)][_0x272138(0x171)][_0x272138(0x17f)])return![];if(this[_0x272138(0x3d2)]&&this[_0x272138(0x3d2)][_0x272138(0x1ba)]())return![];return!![];},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x2de)]=Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x34a)],Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x34a)]=function(){const _0x5b9230=_0x4f4031;if(this[_0x5b9230(0x24d)]()){if(_0x5b9230(0x34c)==='bUEFn'){function _0x4ac043(){const _0x3d10c8=_0x5b9230,_0x2136fe=this[_0x3d10c8(0x149)]();if(!_0x2136fe)return;if(this['_isAlive']===_0x2136fe['isAlive']()&&this['_isAppeared']===_0x2136fe[_0x3d10c8(0x286)]())return;this[_0x3d10c8(0x20b)]=_0x2136fe[_0x3d10c8(0x3e4)](),this['_isAppeared']=_0x2136fe['isAppeared']();let _0x10d4e8=this['_isAlive']&&this[_0x3d10c8(0x1e9)]?0xff:0x0;this[_0x3d10c8(0x2c2)](_0x10d4e8);}}else this[_0x5b9230(0x3d2)]&&!this[_0x5b9230(0x3d2)]['hideBraveTrait']()&&this[_0x5b9230(0x3d2)]['canBrave']()&&SceneManager['_scene']['performBrave']();}else{if('uQjJs'!==_0x5b9230(0x209)){function _0x16b479(){return _0x9c3beb(_0x42e843['$2']);}}else VisuMZ[_0x5b9230(0x15f)][_0x5b9230(0x2de)][_0x5b9230(0x3b0)](this);}},VisuMZ[_0x4f4031(0x15f)]['Window_Selectable_cursorPageup']=Window_Selectable['prototype'][_0x4f4031(0x152)],Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x152)]=function(){const _0x196914=_0x4f4031;this['isUsePageUpDnShortcutBTB']()?this['_actor']&&!this['_actor']['hideBraveTrait']()&&this[_0x196914(0x3d2)][_0x196914(0x308)]()>0x1&&SceneManager['_scene']['reduceBrave']():VisuMZ[_0x196914(0x15f)][_0x196914(0x273)][_0x196914(0x3b0)](this);},Window_Selectable[_0x4f4031(0x3d8)][_0x4f4031(0x24d)]=function(){const _0x290f0b=_0x4f4031;if(this['constructor']!==Window_ActorCommand)return![];if(!SceneManager[_0x290f0b(0x1df)]())return![];if(!BattleManager[_0x290f0b(0x2ba)]())return![];return VisuMZ[_0x290f0b(0x15f)][_0x290f0b(0x3c3)][_0x290f0b(0x171)]['BraveShortcuts'];},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x14d)]=Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x244)],Window_ActorCommand['prototype'][_0x4f4031(0x244)]=function(){const _0x191355=_0x4f4031;VisuMZ[_0x191355(0x15f)][_0x191355(0x14d)][_0x191355(0x3b0)](this),this[_0x191355(0x17c)]();},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x415)]=Window_Base[_0x4f4031(0x3d8)][_0x4f4031(0x1c1)],Window_Base['prototype']['close']=function(){const _0x4a7c02=_0x4f4031;VisuMZ[_0x4a7c02(0x15f)][_0x4a7c02(0x415)][_0x4a7c02(0x3b0)](this),SceneManager[_0x4a7c02(0x1df)]()&&this[_0x4a7c02(0x16d)]&&this[_0x4a7c02(0x16d)]();},Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x16d)]=function(){const _0xbba304=_0x4f4031;if(!this[_0xbba304(0x357)])return;this[_0xbba304(0x357)][_0xbba304(0x363)]&&this[_0xbba304(0x357)][_0xbba304(0x363)][_0xbba304(0x266)](),this[_0xbba304(0x215)](this[_0xbba304(0x357)]),delete this['_btbActionSprite'];},Window_ActorCommand[_0x4f4031(0x3d8)]['createBTBActionCounters']=function(){const _0x5b4e2a=_0x4f4031;if(!BattleManager['isBTB']())return;if(!this[_0x5b4e2a(0x3d2)])return;this[_0x5b4e2a(0x16d)]();if(this[_0x5b4e2a(0x3d2)]['hideBraveTrait']())return;this[_0x5b4e2a(0x357)]=new Sprite(),this[_0x5b4e2a(0x1ad)](this[_0x5b4e2a(0x357)]),this['modifyBTBActionCounterSprite']();},Window_ActorCommand[_0x4f4031(0x3d8)]['modifyBTBActionCounterSprite']=function(){const _0x5ec211=_0x4f4031,_0x2ee124=VisuMZ[_0x5ec211(0x15f)][_0x5ec211(0x3c3)][_0x5ec211(0x171)][_0x5ec211(0x368)];if(_0x2ee124){if(_0x5ec211(0x385)===_0x5ec211(0x29f)){function _0xab70c6(){const _0x47cee7=_0x5ec211;return _0x1e00c4[_0x47cee7(0x222)]()-_0x1df26b[_0x47cee7(0x222)]();}}else _0x2ee124['call'](this,this[_0x5ec211(0x357)],this,this[_0x5ec211(0x3d2)]);}else this[_0x5ec211(0x404)]['call'](this,this[_0x5ec211(0x357)],this,this[_0x5ec211(0x3d2)]);},Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x404)]=function(){const _0x5d78e5=_0x4f4031,_0x25b8fa=arguments[0x0],_0x4d2fee=arguments[0x1],_0x1b01d7=arguments[0x2];_0x25b8fa['x']=Math['round'](_0x4d2fee['width']/0x2),_0x25b8fa['y']=0x0,_0x25b8fa[_0x5d78e5(0x2fa)]['x']=0.5,_0x25b8fa['anchor']['y']=0.5;const _0x5a5a0e=TextManager[_0x5d78e5(0x1de)],_0x1162de=TextManager[_0x5d78e5(0x2e1)];let _0x54f150=_0x5a5a0e[_0x5d78e5(0x161)](_0x1b01d7['numActions']());const _0x571c6b=_0x1b01d7['_actionInputIndex'];_0x54f150=_0x54f150[_0x5d78e5(0x2f6)](0x0,_0x571c6b)+_0x1162de+_0x54f150['substring'](_0x571c6b+0x1);const _0x3c4de9=new Bitmap(_0x4d2fee[_0x5d78e5(0x219)],_0x4d2fee[_0x5d78e5(0x15b)]());_0x3c4de9[_0x5d78e5(0x1cd)]=0x24,_0x3c4de9[_0x5d78e5(0x20e)](_0x54f150,0x0,0x0,_0x3c4de9[_0x5d78e5(0x219)],_0x3c4de9[_0x5d78e5(0x157)],_0x5d78e5(0x2bd)),_0x25b8fa[_0x5d78e5(0x363)]=_0x3c4de9;},Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x343)]=function(){const _0x4b6232=_0x4f4031;return BattleManager[_0x4b6232(0x2ba)]();},Window_ActorCommand[_0x4f4031(0x3d8)][_0x4f4031(0x160)]=function(){const _0x3d76ca=_0x4f4031,_0x2f14f0=BattleManager[_0x3d76ca(0x31c)]();if(_0x2f14f0){const _0x1cf679=this[_0x3d76ca(0x38c)]();switch(_0x1cf679){case _0x3d76ca(0x201):_0x2f14f0[_0x3d76ca(0x2e2)]();break;case'guard':_0x2f14f0[_0x3d76ca(0x32a)]();break;case _0x3d76ca(0x250):_0x2f14f0[_0x3d76ca(0x22b)](this[_0x3d76ca(0x1ee)]());break;default:_0x2f14f0[_0x3d76ca(0x22b)](null);break;}}Window_Command['prototype'][_0x3d76ca(0x160)][_0x3d76ca(0x3b0)](this);},Window_Base['prototype'][_0x4f4031(0x260)]=function(_0x4d994f,_0x3a6469,_0xfbfd57,_0x10eaf5,_0x5f15fd){const _0x1edc4e=_0x4f4031;if(!_0x4d994f)return;if(!BattleManager[_0x1edc4e(0x2ba)]())return;const _0x68aaca=VisuMZ[_0x1edc4e(0x15f)]['Settings']['Window'],_0x5d23eb=BattleManager[_0x1edc4e(0x1fe)]()?_0x68aaca[_0x1edc4e(0x1a7)]:_0x68aaca['StatusDisplayFmt'],_0x22b3df=_0x68aaca[_0x1edc4e(0x2b7)],_0x12156f=_0x68aaca[_0x1edc4e(0x2c9)],_0x420e00=_0x68aaca[_0x1edc4e(0x227)];let _0x5aca04=0x0,_0x204aaf=0x0;_0x204aaf=_0x4d994f[_0x1edc4e(0x2dc)]();if(_0x204aaf>0x0)_0x5aca04=_0x12156f;if(_0x204aaf===0x0)_0x5aca04=_0x22b3df;if(_0x204aaf<0x0)_0x5aca04=_0x420e00;const _0x43e77b='\x5cC[%1]%2\x5cC[0]'[_0x1edc4e(0x2a7)](_0x5aca04,_0x204aaf),_0x3f7b0a=_0x1edc4e(0x396)[_0x1edc4e(0x2a7)](ImageManager['btbBravePointsIcon']);_0x204aaf=_0x4d994f[_0x1edc4e(0x24b)]();if(_0x204aaf>0x0)_0x5aca04=_0x12156f;if(_0x204aaf===0x0)_0x5aca04=_0x22b3df;_0x204aaf<0x0&&(_0x5aca04=_0x420e00);const _0x252c9a=_0x1edc4e(0x3d5)[_0x1edc4e(0x2a7)](_0x5aca04,_0x204aaf);let _0xbfcebf=_0x5d23eb[_0x1edc4e(0x2a7)](_0x43e77b,TextManager[_0x1edc4e(0x2d0)],_0x3f7b0a,_0x252c9a);const _0x438ac4=this[_0x1edc4e(0x169)](_0xbfcebf)[_0x1edc4e(0x219)];if(_0x5f15fd===_0x1edc4e(0x2bd))_0x3a6469+=Math[_0x1edc4e(0x2cb)]((_0x10eaf5-_0x438ac4)/0x2);else _0x5f15fd===_0x1edc4e(0x33a)&&(_0x3a6469+=Math[_0x1edc4e(0x2cb)](_0x10eaf5-_0x438ac4));this[_0x1edc4e(0x34f)](_0xbfcebf,_0x3a6469,_0xfbfd57,_0x10eaf5);},Window_StatusBase[_0x4f4031(0x3d8)][_0x4f4031(0x3a0)]=function(_0x59622b){const _0x1d2b05=_0x4f4031;if(!_0x59622b)return![];if(!BattleManager[_0x1d2b05(0x2ba)]())return![];if(!this[_0x1d2b05(0x27b)])return![];if(_0x59622b[_0x1d2b05(0x1ba)]())return![];const _0x192f90=VisuMZ[_0x1d2b05(0x15f)][_0x1d2b05(0x3c3)]['Window'],_0x422515=this[_0x1d2b05(0x27b)]();return _0x192f90['%1_display'[_0x1d2b05(0x2a7)](_0x422515)];},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x1f0)]=Window_BattleStatus[_0x4f4031(0x3d8)][_0x4f4031(0x25c)],Window_BattleStatus['prototype'][_0x4f4031(0x25c)]=function(_0xbfe40a){const _0x3ac9a6=_0x4f4031;VisuMZ[_0x3ac9a6(0x15f)]['Window_BattleStatus_drawItemStatusListStyle']['call'](this,_0xbfe40a);const _0x27038b=this[_0x3ac9a6(0x410)](_0xbfe40a);if(this['showBravePoints'](_0x27038b)){const _0x359a19=this[_0x3ac9a6(0x36c)](_0xbfe40a),_0x30c72c=$dataSystem['optDisplayTp']?0x4:0x3,_0x182c42=_0x30c72c*0x80+(_0x30c72c-0x1)*0x8+0x4;let _0x422d82=_0x359a19['x']+this[_0x3ac9a6(0x14c)];VisuMZ[_0x3ac9a6(0x35f)][_0x3ac9a6(0x3c3)][_0x3ac9a6(0x289)][_0x3ac9a6(0x3eb)]?_0x422d82=_0x359a19['x']+ImageManager[_0x3ac9a6(0x221)]+0x8:_0x422d82+=ImageManager[_0x3ac9a6(0x405)];const _0xd616c6=Math['round'](Math[_0x3ac9a6(0x301)](_0x359a19['x']+_0x359a19[_0x3ac9a6(0x219)]-_0x182c42,_0x422d82));let _0x31fbad=_0xd616c6+0x88,_0x3a1e05=_0x359a19['y'];_0x31fbad+=0x88*($dataSystem[_0x3ac9a6(0x416)]?0x3:0x2),_0x31fbad+=this['getOffsetX_BTB'](),_0x3a1e05+=this[_0x3ac9a6(0x40b)]();const _0x2ef741=this[_0x3ac9a6(0x1d4)]();if(_0x31fbad>_0x359a19['x']+_0x359a19[_0x3ac9a6(0x219)])return;this[_0x3ac9a6(0x260)](_0x27038b,_0x31fbad,_0x3a1e05,_0x359a19['width'],_0x2ef741);}},VisuMZ[_0x4f4031(0x15f)][_0x4f4031(0x3ee)]=Window_BattleStatus[_0x4f4031(0x3d8)][_0x4f4031(0x2b8)],Window_BattleStatus[_0x4f4031(0x3d8)]['drawItemStatusXPStyle']=function(_0x4b6c1b){const _0x2777a6=_0x4f4031;VisuMZ[_0x2777a6(0x15f)]['Window_BattleStatus_drawItemStatusXPStyle']['call'](this,_0x4b6c1b);const _0x56effd=this[_0x2777a6(0x410)](_0x4b6c1b);if(this[_0x2777a6(0x3a0)](_0x56effd)){if('osGUk'!==_0x2777a6(0x40d)){function _0x56d27a(){const _0x52c08a=_0x2777a6;this['x']=this[_0x52c08a(0x27f)],this['y']=this[_0x52c08a(0x1f6)];if(this[_0x52c08a(0x22e)]<0xff&&!this['_isBattleOver']&&this['_fadeDuration']<=0x0){const _0x5b65e7=this[_0x52c08a(0x149)]();_0x5b65e7&&(this['_fadeTarget']=_0x5b65e7[_0x52c08a(0x3e4)]()&&_0x5b65e7[_0x52c08a(0x286)]()?0xff:0x0);}}}else{const _0x3a0049=this['itemRectPortraitBTB'](_0x4b6c1b);let _0x582d94=_0x3a0049['x'],_0x9fcc88=_0x3a0049['y'];_0x582d94+=this['getOffsetX_BTB'](),_0x9fcc88+=this[_0x2777a6(0x40b)]();const _0x119e82=this[_0x2777a6(0x1d4)]();this[_0x2777a6(0x260)](_0x56effd,_0x582d94,_0x9fcc88,_0x3a0049[_0x2777a6(0x219)],_0x119e82);}}},Window_BattleStatus[_0x4f4031(0x3d8)][_0x4f4031(0x196)]=function(_0x24039c){const _0x110afc=_0x4f4031,_0x415122=this['itemRect'](_0x24039c);if(_0x415122['width']<ImageManager['faceWidth'])return _0x415122;let _0x520003=Math[_0x110afc(0x2cb)]((_0x415122[_0x110afc(0x219)]-ImageManager['faceWidth'])/0x2);return _0x415122[_0x110afc(0x219)]=ImageManager['faceWidth'],_0x415122['x']+=_0x520003,_0x415122;},Window_BattleStatus[_0x4f4031(0x3d8)]['getAlignmentBTB']=function(){const _0x3c689c=_0x4f4031,_0xa2ecde=VisuMZ[_0x3c689c(0x15f)]['Settings'][_0x3c689c(0x171)],_0x52be01=this[_0x3c689c(0x27b)]();return _0xa2ecde[_0x3c689c(0x25d)[_0x3c689c(0x2a7)](_0x52be01)]||0x0;},Window_BattleStatus[_0x4f4031(0x3d8)][_0x4f4031(0x2a4)]=function(){const _0x3a3131=_0x4f4031,_0x21f91a=VisuMZ[_0x3a3131(0x15f)][_0x3a3131(0x3c3)]['Window'],_0x3fb55e=this[_0x3a3131(0x27b)]();return _0x21f91a['%1_offsetX'[_0x3a3131(0x2a7)](_0x3fb55e)]||0x0;},Window_BattleStatus[_0x4f4031(0x3d8)]['getOffsetY_BTB']=function(){const _0x2f877b=_0x4f4031,_0x334788=VisuMZ['BattleSystemBTB'][_0x2f877b(0x3c3)]['Window'],_0x480988=this[_0x2f877b(0x27b)]();return _0x334788['%1_offsetY'[_0x2f877b(0x2a7)](_0x480988)]||0x0;},Window_BattleSkill[_0x4f4031(0x3d8)][_0x4f4031(0x343)]=function(){const _0x3e7670=_0x4f4031;return BattleManager[_0x3e7670(0x2ba)]();},Window_BattleSkill[_0x4f4031(0x3d8)]['applyBattleItemWindowBTB']=function(){const _0x3d2c4c=_0x4f4031,_0x46f7fc=this[_0x3d2c4c(0x2e3)](),_0xd44e4f=BattleManager[_0x3d2c4c(0x31c)]();if(_0xd44e4f)_0xd44e4f['setSkill'](_0x46f7fc?_0x46f7fc['id']:null);Window_SkillList['prototype'][_0x3d2c4c(0x160)]['call'](this);},Window_BattleItem['prototype'][_0x4f4031(0x343)]=function(){const _0x33e106=_0x4f4031;return BattleManager[_0x33e106(0x2ba)]();},Window_BattleItem[_0x4f4031(0x3d8)]['applyBattleItemWindowBTB']=function(){const _0x56e00b=_0x4f4031,_0x53e313=this['item'](),_0x2e460f=BattleManager['inputtingAction']();if(_0x2e460f)_0x2e460f[_0x56e00b(0x2ae)](_0x53e313?_0x53e313['id']:null);Window_ItemList[_0x56e00b(0x3d8)][_0x56e00b(0x160)]['call'](this);};function Window_BTB_TurnOrder(){this['initialize'](...arguments);}Window_BTB_TurnOrder[_0x4f4031(0x3d8)]=Object[_0x4f4031(0x2da)](Window_Base[_0x4f4031(0x3d8)]),Window_BTB_TurnOrder['prototype'][_0x4f4031(0x1a6)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x4f4031(0x3c3)]=VisuMZ['BattleSystemBTB'][_0x4f4031(0x3c3)]['TurnOrder'],Window_BTB_TurnOrder['prototype']['initialize']=function(){const _0xb214af=_0x4f4031,_0x5622a3=this[_0xb214af(0x328)]();this[_0xb214af(0x372)](_0x5622a3),Window_Base['prototype']['initialize']['call'](this,_0x5622a3),this[_0xb214af(0x35c)](),this[_0xb214af(0x3f1)](),this['opacity']=0x0;},Window_BTB_TurnOrder['prototype'][_0x4f4031(0x328)]=function(){const _0x1bba68=_0x4f4031;return this['createBattlerRect']($gameParty[_0x1bba68(0x35b)](),0x9,!![]);},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['initHomePositions']=function(_0x4339f1){const _0x2ab129=_0x4f4031;this[_0x2ab129(0x208)]=this[_0x2ab129(0x19c)]=_0x4339f1['x'],this[_0x2ab129(0x1ed)]=this['_homeY']=_0x4339f1['y'],this[_0x2ab129(0x2e8)]=_0x4339f1[_0x2ab129(0x219)],this[_0x2ab129(0x148)]=_0x4339f1[_0x2ab129(0x157)],this[_0x2ab129(0x1ca)]=0x0;},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['createBattlerRect']=function(_0x445498,_0x571c73,_0x5d9875){const _0x12e929=_0x4f4031,_0x5d6838=Window_BTB_TurnOrder['Settings'],_0x5d0c99=this[_0x12e929(0x29e)]()?_0x5d6838[_0x12e929(0x241)]:_0x5d6838[_0x12e929(0x284)],_0x545f26=Math[_0x12e929(0x301)](_0x5d0c99,_0x445498+_0x571c73),_0x40e8c9=SceneManager[_0x12e929(0x398)][_0x12e929(0x30a)][_0x12e929(0x157)],_0x1805db=SceneManager[_0x12e929(0x398)][_0x12e929(0x1f9)]['height'],_0x2aeec5=_0x5d6838[_0x12e929(0x3f3)],_0x1c9635=Graphics[_0x12e929(0x157)]-_0x40e8c9-_0x1805db;let _0xc8d40=0x0,_0xb68871=0x0,_0x583b5e=0x0,_0x3ef2b7=0x0;switch(_0x5d6838['DisplayPosition']){case _0x12e929(0x274):_0xc8d40=_0x5d6838[_0x12e929(0x3b8)]*_0x545f26+_0x2aeec5,_0xb68871=_0x5d6838[_0x12e929(0x27d)],_0x583b5e=Math[_0x12e929(0x251)]((Graphics[_0x12e929(0x219)]-_0xc8d40)/0x2),_0x3ef2b7=_0x5d6838['ScreenBuffer'];break;case _0x12e929(0x180):_0xc8d40=_0x5d6838[_0x12e929(0x3b8)]*_0x545f26+_0x2aeec5,_0xb68871=_0x5d6838[_0x12e929(0x27d)],_0x583b5e=Math[_0x12e929(0x251)]((Graphics[_0x12e929(0x219)]-_0xc8d40)/0x2),_0x3ef2b7=Graphics[_0x12e929(0x157)]-_0x40e8c9-_0xb68871-_0x5d6838[_0x12e929(0x3f0)];break;case _0x12e929(0x193):_0xc8d40=_0x5d6838[_0x12e929(0x27d)],_0xb68871=_0x5d6838[_0x12e929(0x3b8)]*_0x545f26+_0x2aeec5,_0x583b5e=_0x5d6838['ScreenBuffer'],_0x3ef2b7=Math['ceil']((_0x1c9635-_0xb68871)/0x2),_0x3ef2b7+=_0x1805db;break;case'right':_0xc8d40=_0x5d6838['SpriteLength'],_0xb68871=_0x5d6838['SpriteThin']*_0x545f26+_0x2aeec5,_0x583b5e=Graphics['width']-_0xc8d40-_0x5d6838[_0x12e929(0x3f0)],_0x3ef2b7=Math[_0x12e929(0x251)]((_0x1c9635-_0xb68871)/0x2),_0x3ef2b7+=_0x1805db;break;}if(!_0x5d9875){const _0x3dc099=Window_BTB_TurnOrder['Settings'][_0x12e929(0x310)];let _0x42090=Math[_0x12e929(0x301)](_0x5d0c99,Math['min']($gameParty[_0x12e929(0x35b)]()+0x8)-_0x545f26);switch(_0x5d6838[_0x12e929(0x3aa)]){case _0x12e929(0x274):case _0x12e929(0x180):_0x3dc099&&(_0x583b5e-=_0x42090*_0x5d6838[_0x12e929(0x3b8)]);break;}}return _0x583b5e+=_0x5d6838[_0x12e929(0x207)],_0x3ef2b7+=_0x5d6838['DisplayOffsetY'],new Rectangle(_0x583b5e,_0x3ef2b7,_0xc8d40,_0xb68871);},Window_BTB_TurnOrder['prototype']['updatePadding']=function(){const _0x51b9d9=_0x4f4031;this[_0x51b9d9(0x14c)]=0x0;},Window_BTB_TurnOrder[_0x4f4031(0x3d8)][_0x4f4031(0x29e)]=function(){const _0x7b653f=_0x4f4031,_0x528705=Window_BTB_TurnOrder[_0x7b653f(0x3c3)],_0x3f014b=[_0x7b653f(0x274),_0x7b653f(0x180)]['includes'](_0x528705[_0x7b653f(0x3aa)]);return _0x3f014b;},Window_BTB_TurnOrder['prototype']['createBattlerSprites']=function(){const _0x423b41=_0x4f4031;this[_0x423b41(0x226)]=new Sprite(),this[_0x423b41(0x3e5)](this[_0x423b41(0x226)]),this[_0x423b41(0x33c)]=[];for(let _0x48502b=0x0;_0x48502b<$gameParty[_0x423b41(0x35b)]();_0x48502b++){const _0x340adf=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x48502b);this['_turnOrderInnerSprite']['addChild'](_0x340adf),this['_turnOrderContainer'][_0x423b41(0x21f)](_0x340adf);}for(let _0x488b1b=0x0;_0x488b1b<0x8;_0x488b1b++){const _0x31bcd4=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x488b1b);this['_turnOrderInnerSprite']['addChild'](_0x31bcd4),this['_turnOrderContainer'][_0x423b41(0x21f)](_0x31bcd4);}},Window_BTB_TurnOrder[_0x4f4031(0x3d8)][_0x4f4031(0x397)]=function(){const _0x5dcc7b=_0x4f4031;Window_Base[_0x5dcc7b(0x3d8)]['update'][_0x5dcc7b(0x3b0)](this),this[_0x5dcc7b(0x2c6)](),this[_0x5dcc7b(0x2e4)](),this[_0x5dcc7b(0x2eb)](),this[_0x5dcc7b(0x1bf)](),this[_0x5dcc7b(0x3f1)]();},Window_BTB_TurnOrder['prototype'][_0x4f4031(0x2c6)]=function(){const _0x75d851=_0x4f4031;if(this[_0x75d851(0x1ca)]>0x0){const _0x1cfe0e=this[_0x75d851(0x1ca)];this[_0x75d851(0x19c)]=(this['_homeX']*(_0x1cfe0e-0x1)+this[_0x75d851(0x208)])/_0x1cfe0e,this[_0x75d851(0x3a9)]=(this['_homeY']*(_0x1cfe0e-0x1)+this[_0x75d851(0x1ed)])/_0x1cfe0e,this[_0x75d851(0x1ca)]--,this[_0x75d851(0x1ca)]<=0x0&&(this[_0x75d851(0x19c)]=this[_0x75d851(0x208)],this[_0x75d851(0x3a9)]=this[_0x75d851(0x1ed)]);}},Window_BTB_TurnOrder[_0x4f4031(0x3d8)][_0x4f4031(0x2e4)]=function(){const _0x2d641c=_0x4f4031,_0x47bd56=Window_BTB_TurnOrder[_0x2d641c(0x3c3)];if(_0x47bd56['DisplayPosition']!==_0x2d641c(0x274))return;if(!_0x47bd56[_0x2d641c(0x203)])return;const _0x1ac88a=SceneManager['_scene']['_helpWindow'];if(!_0x1ac88a)return;if(_0x1ac88a['visible']){if(_0x2d641c(0x1da)!==_0x2d641c(0x1da)){function _0x2564aa(){const _0x45faeb=_0x2d641c;this[_0x45faeb(0x21d)]();const _0x466bd6=_0x277ae2[_0x45faeb(0x381)]['Settings'][_0x45faeb(0x253)];this['contents'][_0x45faeb(0x1cd)]=_0x466bd6[_0x45faeb(0x2f9)];if(_0xbd327e){const _0x1c9ef2=_0x466bd6[_0x45faeb(0x1ec)],_0x4590d7=_0x1c9ef2[_0x45faeb(0x2a7)](_0x4d14fe[_0x45faeb(0x3db)](_0xe4a1f6)),_0x467843=this[_0x45faeb(0x1dc)](_0x4590d7+this[_0x45faeb(0x413)]());_0x2ce186-=_0x467843;}else _0x61fd3a-=this[_0x45faeb(0x1dc)](this['skillCostSeparator']())+_0x375bce;_0x2ec662[_0x45faeb(0x15f)][_0x45faeb(0x351)][_0x45faeb(0x3b0)](this,_0x47ec21,_0x8a1b38,_0x479b60,_0x27fc0c);}}else this['x']=this[_0x2d641c(0x19c)]+(_0x47bd56[_0x2d641c(0x37c)]||0x0),this['y']=this[_0x2d641c(0x3a9)]+(_0x47bd56[_0x2d641c(0x19b)]||0x0);}else this['x']=this[_0x2d641c(0x19c)],this['y']=this[_0x2d641c(0x3a9)];const _0x49139b=SceneManager[_0x2d641c(0x398)][_0x2d641c(0x327)];if(this[_0x2d641c(0x3a1)]===undefined){if('HeJzj'===_0x2d641c(0x305)){function _0x127cf9(){const _0x453147=_0x2d641c;this[_0x453147(0x1f6)]=_0x38955d?0x0:_0x26af8b[_0x453147(0x157)]-this[_0x453147(0x1f6)]-_0x17ba3f[_0x453147(0x3b8)];}}else this['_ogWindowLayerX']=Math[_0x2d641c(0x2cb)]((Graphics[_0x2d641c(0x219)]-Math[_0x2d641c(0x301)](Graphics['boxWidth'],_0x49139b[_0x2d641c(0x219)]))/0x2),this[_0x2d641c(0x195)]=Math[_0x2d641c(0x2cb)]((Graphics[_0x2d641c(0x157)]-Math[_0x2d641c(0x301)](Graphics[_0x2d641c(0x1f8)],_0x49139b[_0x2d641c(0x157)]))/0x2);}this['x']+=_0x49139b['x']-this[_0x2d641c(0x3a1)],this['y']+=_0x49139b['y']-this[_0x2d641c(0x195)];},Window_BTB_TurnOrder['prototype'][_0x4f4031(0x2eb)]=function(){const _0x518515=_0x4f4031,_0xb6922c=Window_BTB_TurnOrder[_0x518515(0x3c3)];if([_0x518515(0x274)]['includes'](_0xb6922c[_0x518515(0x3aa)]))return;this['x']=this[_0x518515(0x19c)],this['y']=this[_0x518515(0x3a9)];const _0x52ef75=SceneManager[_0x518515(0x398)][_0x518515(0x327)];this['x']+=_0x52ef75['x'],this['y']+=_0x52ef75['y'];},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['updateBattleContainerOrder']=function(){const _0x2447c0=_0x4f4031;if(!this[_0x2447c0(0x226)])return;const _0x1e716a=this[_0x2447c0(0x226)][_0x2447c0(0x162)];if(!_0x1e716a)return;_0x1e716a['sort'](this[_0x2447c0(0x39f)]['bind'](this));},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['compareBattlerSprites']=function(_0x521005,_0x1c97eb){const _0x1b0deb=_0x4f4031,_0x331e69=this[_0x1b0deb(0x29e)](),_0x2bfec8=Window_BTB_TurnOrder['Settings']['OrderDirection'];if(_0x331e69&&!_0x2bfec8){if(_0x1b0deb(0x32c)!=='zFNSG')return _0x521005['x']-_0x1c97eb['x'];else{function _0xde54cb(){const _0x67cd14=_0x1b0deb;this[_0x67cd14(0x2e5)]=_0x67cd14(0x20c);}}}else{if(_0x331e69&&_0x2bfec8)return _0x1c97eb['x']-_0x521005['x'];else{if(!_0x331e69&&_0x2bfec8)return _0x521005['y']-_0x1c97eb['y'];else{if(!_0x331e69&&!_0x2bfec8)return _0x1c97eb['y']-_0x521005['y'];}}}},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['updateVisibility']=function(){const _0x1ac705=_0x4f4031;this[_0x1ac705(0x399)]=$gameSystem['isBattleSystemBTBTurnOrderVisible']();},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['updateTurnOrder']=function(_0x2bc74f){const _0x57c929=_0x4f4031;this['_turnOrderContainer'][_0x57c929(0x183)]((_0x4ce20b,_0x144dc0)=>{const _0x2a9bf9=_0x57c929;if(_0x2a9bf9(0x354)!==_0x2a9bf9(0x354)){function _0xdc7530(){const _0x3730f2=_0x2a9bf9;if(!_0x338be5['isBTB']())return;const _0xa25b19=this[_0x3730f2(0x407)](_0x1c89f4);this[_0x3730f2(0x349)](_0xa25b19);}}else return _0x4ce20b[_0x2a9bf9(0x222)]()-_0x144dc0[_0x2a9bf9(0x222)]();}),this[_0x57c929(0x1e0)]();if(!_0x2bc74f)return;for(const _0x3cd77c of this[_0x57c929(0x33c)]){if(!_0x3cd77c)continue;_0x3cd77c[_0x57c929(0x397)](),_0x3cd77c[_0x57c929(0x23c)]=0x0;}},Window_BTB_TurnOrder[_0x4f4031(0x3d8)]['recalculateHome']=function(){const _0x34f1de=_0x4f4031;if(!this[_0x34f1de(0x29e)]())return;const _0x11688a=VisuMZ[_0x34f1de(0x15f)][_0x34f1de(0x3c3)]['TurnOrder'];if(!_0x11688a[_0x34f1de(0x240)])return;const _0x476574=$gameParty[_0x34f1de(0x31d)]()['filter'](_0x433c31=>_0x433c31&&_0x433c31[_0x34f1de(0x3e4)]()&&_0x433c31[_0x34f1de(0x286)]())[_0x34f1de(0x2ef)],_0x14638a=$gameTroop[_0x34f1de(0x31d)]()['filter'](_0x3ba90f=>_0x3ba90f&&_0x3ba90f['isAlive']()&&_0x3ba90f['isAppeared']())['length'],_0x1dfe57=this[_0x34f1de(0x367)](_0x476574,_0x14638a);this[_0x34f1de(0x208)]=_0x1dfe57['x'],this['_targetHomeY']=_0x1dfe57['y'],(this[_0x34f1de(0x208)]!==this[_0x34f1de(0x19c)]||this[_0x34f1de(0x1ed)]!==this[_0x34f1de(0x3a9)])&&(this[_0x34f1de(0x1ca)]=_0x11688a[_0x34f1de(0x35a)]);};