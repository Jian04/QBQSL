//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
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
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
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
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
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
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
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
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
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
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
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
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
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
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
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
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
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
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
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
//=============================================================================

const _0x325044=_0x422d;function _0x422d(_0x52c291,_0x27364c){const _0x7da35f=_0x7da3();return _0x422d=function(_0x422dcf,_0x3ca146){_0x422dcf=_0x422dcf-0x1de;let _0x1b41da=_0x7da35f[_0x422dcf];return _0x1b41da;},_0x422d(_0x52c291,_0x27364c);}(function(_0xb258f5,_0x32419a){const _0x4c9d14=_0x422d,_0x12c79e=_0xb258f5();while(!![]){try{const _0xb8abb8=parseInt(_0x4c9d14(0x21c))/0x1+parseInt(_0x4c9d14(0x24f))/0x2+parseInt(_0x4c9d14(0x3aa))/0x3*(parseInt(_0x4c9d14(0x2ce))/0x4)+-parseInt(_0x4c9d14(0x2ed))/0x5+parseInt(_0x4c9d14(0x37f))/0x6*(parseInt(_0x4c9d14(0x26b))/0x7)+parseInt(_0x4c9d14(0x3a3))/0x8*(parseInt(_0x4c9d14(0x212))/0x9)+-parseInt(_0x4c9d14(0x315))/0xa;if(_0xb8abb8===_0x32419a)break;else _0x12c79e['push'](_0x12c79e['shift']());}catch(_0x464771){_0x12c79e['push'](_0x12c79e['shift']());}}}(_0x7da3,0x23925));var label='BattleSystemSTB',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x325044(0x2e3)](function(_0x18b23a){const _0xff6919=_0x325044;return _0x18b23a[_0xff6919(0x2fd)]&&_0x18b23a[_0xff6919(0x2d9)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x325044(0x219)]||{},VisuMZ[_0x325044(0x23b)]=function(_0x2d193d,_0x516e9a){const _0x4653ea=_0x325044;for(const _0x3dd595 in _0x516e9a){if(_0x3dd595[_0x4653ea(0x355)](/(.*):(.*)/i)){const _0x4cbbf7=String(RegExp['$1']),_0x221766=String(RegExp['$2'])[_0x4653ea(0x2a5)]()[_0x4653ea(0x365)]();let _0x10c712,_0x2e65f5,_0x39bc65;switch(_0x221766){case _0x4653ea(0x35d):_0x10c712=_0x516e9a[_0x3dd595]!==''?Number(_0x516e9a[_0x3dd595]):0x0;break;case'ARRAYNUM':_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON['parse'](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5[_0x4653ea(0x1e3)](_0x496279=>Number(_0x496279));break;case _0x4653ea(0x3bc):_0x10c712=_0x516e9a[_0x3dd595]!==''?eval(_0x516e9a[_0x3dd595]):null;break;case _0x4653ea(0x384):_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON['parse'](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5['map'](_0x4b5c3c=>eval(_0x4b5c3c));break;case _0x4653ea(0x326):_0x10c712=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):'';break;case _0x4653ea(0x357):_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5['map'](_0x8b6d0e=>JSON[_0x4653ea(0x373)](_0x8b6d0e));break;case _0x4653ea(0x32f):_0x10c712=_0x516e9a[_0x3dd595]!==''?new Function(JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595])):new Function(_0x4653ea(0x2f6));break;case _0x4653ea(0x2c5):_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5[_0x4653ea(0x1e3)](_0xb7c652=>new Function(JSON[_0x4653ea(0x373)](_0xb7c652)));break;case _0x4653ea(0x1ef):_0x10c712=_0x516e9a[_0x3dd595]!==''?String(_0x516e9a[_0x3dd595]):'';break;case'ARRAYSTR':_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5[_0x4653ea(0x1e3)](_0x4f144e=>String(_0x4f144e));break;case _0x4653ea(0x335):_0x39bc65=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):{},_0x10c712=VisuMZ[_0x4653ea(0x23b)]({},_0x39bc65);break;case _0x4653ea(0x239):_0x2e65f5=_0x516e9a[_0x3dd595]!==''?JSON[_0x4653ea(0x373)](_0x516e9a[_0x3dd595]):[],_0x10c712=_0x2e65f5['map'](_0x2b76d7=>VisuMZ[_0x4653ea(0x23b)]({},JSON[_0x4653ea(0x373)](_0x2b76d7)));break;default:continue;}_0x2d193d[_0x4cbbf7]=_0x10c712;}}return _0x2d193d;},(_0x624138=>{const _0x2435c8=_0x325044,_0x521a38=_0x624138[_0x2435c8(0x368)];for(const _0x222f1c of dependencies){if(!Imported[_0x222f1c]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2435c8(0x2db)](_0x521a38,_0x222f1c)),SceneManager['exit']();break;}}const _0x1fb991=_0x624138['description'];if(_0x1fb991[_0x2435c8(0x355)](/\[Version[ ](.*?)\]/i)){const _0x3d7ddd=Number(RegExp['$1']);_0x3d7ddd!==VisuMZ[label][_0x2435c8(0x359)]&&(_0x2435c8(0x2b5)!==_0x2435c8(0x2b5)?this[_0x2435c8(0x29c)]=_0xc8cadd?_0x102a3f[_0x2435c8(0x21d)]-this[_0x2435c8(0x29c)]-_0x4b9f5f[_0x2435c8(0x265)]:0x0:(alert(_0x2435c8(0x1df)['format'](_0x521a38,_0x3d7ddd)),SceneManager[_0x2435c8(0x24a)]()));}if(_0x1fb991[_0x2435c8(0x355)](/\[Tier[ ](\d+)\]/i)){const _0x463bf1=Number(RegExp['$1']);_0x463bf1<tier?(alert(_0x2435c8(0x1f7)[_0x2435c8(0x2db)](_0x521a38,_0x463bf1,tier)),SceneManager['exit']()):_0x2435c8(0x31a)!==_0x2435c8(0x275)?tier=Math[_0x2435c8(0x32d)](_0x463bf1,tier):_0xea590c['drawText'](this[_0x2435c8(0x393)][_0x2435c8(0x365)](),0x0,_0x48d806/0x2,_0x4bd577,_0x2fc844/0x2,_0x2435c8(0x25c));}VisuMZ[_0x2435c8(0x23b)](VisuMZ[label]['Settings'],_0x624138[_0x2435c8(0x344)]);})(pluginData),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],'StbTurnOrderActorIcon',_0x5bd23e=>{const _0x5b43c8=_0x325044;VisuMZ['ConvertParams'](_0x5bd23e,_0x5bd23e);const _0x19682b=_0x5bd23e[_0x5b43c8(0x2fe)],_0x5aa018=_0x5bd23e[_0x5b43c8(0x273)];for(const _0x492be1 of _0x19682b){const _0xbc7850=$gameActors['actor'](_0x492be1);if(!_0xbc7850)continue;_0xbc7850[_0x5b43c8(0x370)]=_0x5b43c8(0x209),_0xbc7850[_0x5b43c8(0x27a)]=_0x5aa018;}}),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],'StbTurnOrderActorFace',_0x31561e=>{const _0x46dbdb=_0x325044;VisuMZ[_0x46dbdb(0x23b)](_0x31561e,_0x31561e);const _0x5273a0=_0x31561e['Actors'],_0x475a19=_0x31561e[_0x46dbdb(0x374)],_0x535620=_0x31561e[_0x46dbdb(0x26a)];for(const _0x383106 of _0x5273a0){const _0x1b68d4=$gameActors[_0x46dbdb(0x305)](_0x383106);if(!_0x1b68d4)continue;_0x1b68d4['_stbTurnOrderGraphicType']=_0x46dbdb(0x36d),_0x1b68d4[_0x46dbdb(0x264)]=_0x475a19,_0x1b68d4[_0x46dbdb(0x1fc)]=_0x535620;}}),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],'StbTurnOrderClearActorGraphic',_0x1be8c4=>{const _0x171043=_0x325044;VisuMZ[_0x171043(0x23b)](_0x1be8c4,_0x1be8c4);const _0x205c37=_0x1be8c4[_0x171043(0x2fe)];for(const _0x5c8995 of _0x205c37){if(_0x171043(0x27f)===_0x171043(0x37e))return _0x171043(0x209);else{const _0x145b43=$gameActors['actor'](_0x5c8995);if(!_0x145b43)continue;_0x145b43['clearTurnOrderSTBGraphics']();}}}),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],_0x325044(0x3ae),_0x2065ea=>{const _0xbbdad7=_0x325044;VisuMZ[_0xbbdad7(0x23b)](_0x2065ea,_0x2065ea);const _0x6d3a3c=_0x2065ea[_0xbbdad7(0x292)],_0x107fd8=_0x2065ea[_0xbbdad7(0x273)];for(const _0x3f4e80 of _0x6d3a3c){if('luPHP'!=='luPHP')_0x55f74e[_0xbbdad7(0x2bc)][_0xbbdad7(0x278)][_0xbbdad7(0x38e)](this);else{const _0x318418=$gameTroop[_0xbbdad7(0x30a)]()[_0x3f4e80];if(!_0x318418)continue;_0x318418[_0xbbdad7(0x370)]=_0xbbdad7(0x209),_0x318418['_stbTurnOrderIconIndex']=_0x107fd8;}}}),PluginManager['registerCommand'](pluginData['name'],'StbTurnOrderEnemyFace',_0x573439=>{const _0x422162=_0x325044;VisuMZ[_0x422162(0x23b)](_0x573439,_0x573439);const _0x134f00=_0x573439[_0x422162(0x292)],_0x5321da=_0x573439['FaceName'],_0x4c5e66=_0x573439['FaceIndex'];for(const _0x577a90 of _0x134f00){const _0x5e5929=$gameTroop[_0x422162(0x30a)]()[_0x577a90];if(!_0x5e5929)continue;_0x5e5929[_0x422162(0x370)]=_0x422162(0x36d),_0x5e5929[_0x422162(0x264)]=_0x5321da,_0x5e5929[_0x422162(0x1fc)]=_0x4c5e66;}}),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],_0x325044(0x2ad),_0x54e403=>{const _0x15c57d=_0x325044;VisuMZ['ConvertParams'](_0x54e403,_0x54e403);const _0xde4bf7=_0x54e403[_0x15c57d(0x292)];for(const _0x4062b3 of _0xde4bf7){const _0x591f29=$gameTroop[_0x15c57d(0x30a)]()[_0x4062b3];if(!_0x591f29)continue;_0x591f29[_0x15c57d(0x389)]();}}),PluginManager[_0x325044(0x37b)](pluginData[_0x325044(0x368)],_0x325044(0x1e4),_0x4df2fb=>{const _0x55bd6c=_0x325044;VisuMZ[_0x55bd6c(0x23b)](_0x4df2fb,_0x4df2fb);const _0x2f6323=_0x4df2fb[_0x55bd6c(0x35b)];$gameSystem[_0x55bd6c(0x2aa)](_0x2f6323);}),VisuMZ[_0x325044(0x2bc)][_0x325044(0x2e7)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x325044(0x36f)]=function(_0x10c5d2){const _0x26d652=_0x325044;_0x10c5d2=_0x10c5d2[_0x26d652(0x2a5)]()['trim'](),this[_0x26d652(0x201)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x10c5d2])return this[_0x26d652(0x201)][_0x10c5d2];for(const _0x37bd84 of $dataStates){if(!_0x37bd84)continue;this[_0x26d652(0x201)][_0x37bd84[_0x26d652(0x368)][_0x26d652(0x2a5)]()['trim']()]=_0x37bd84['id'];}return this[_0x26d652(0x201)][_0x10c5d2]||0x0;},SceneManager[_0x325044(0x361)]=function(){const _0x32d9b6=_0x325044;return this[_0x32d9b6(0x3b1)]&&this[_0x32d9b6(0x3b1)][_0x32d9b6(0x260)]===Scene_Battle;},VisuMZ[_0x325044(0x2bc)][_0x325044(0x2a2)]=BattleManager[_0x325044(0x2e9)],BattleManager[_0x325044(0x2e9)]=function(){const _0x978873=_0x325044;if(this['isSTB']())return'STB';return VisuMZ[_0x978873(0x2bc)]['BattleManager_battleSys'][_0x978873(0x38e)](this);},BattleManager[_0x325044(0x3bb)]=function(){const _0x3aabb1=_0x325044;return $gameSystem[_0x3aabb1(0x1f5)]()===_0x3aabb1(0x242);},VisuMZ[_0x325044(0x2bc)]['BattleManager_isTpb']=BattleManager[_0x325044(0x20a)],BattleManager[_0x325044(0x20a)]=function(){const _0x1d3569=_0x325044;if(this[_0x1d3569(0x3bb)]())return![];return VisuMZ[_0x1d3569(0x2bc)][_0x1d3569(0x3ba)][_0x1d3569(0x38e)](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x284)]=BattleManager[_0x325044(0x2ec)],BattleManager[_0x325044(0x2ec)]=function(){const _0x5b8819=_0x325044;if(this[_0x5b8819(0x3bb)]())return![];return VisuMZ['BattleSystemSTB'][_0x5b8819(0x284)]['call'](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x248)]=BattleManager[_0x325044(0x250)],BattleManager['isTurnBased']=function(){const _0x3c7152=_0x325044;if(this[_0x3c7152(0x3bb)]())return!![];return VisuMZ[_0x3c7152(0x2bc)][_0x3c7152(0x248)][_0x3c7152(0x38e)](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x2bb)]=BattleManager[_0x325044(0x244)],BattleManager[_0x325044(0x244)]=function(){const _0x4a86f4=_0x325044;VisuMZ[_0x4a86f4(0x2bc)][_0x4a86f4(0x2bb)][_0x4a86f4(0x38e)](this);if(this[_0x4a86f4(0x3bb)]()&&$gameParty[_0x4a86f4(0x280)]()&&!this[_0x4a86f4(0x2f4)])this[_0x4a86f4(0x29b)]();},BattleManager[_0x325044(0x29b)]=function(){this['startTurn']();},VisuMZ['BattleSystemSTB'][_0x325044(0x278)]=BattleManager[_0x325044(0x34b)],BattleManager[_0x325044(0x34b)]=function(){const _0x4420cf=_0x325044;if(this[_0x4420cf(0x3bb)]()){if(_0x4420cf(0x35f)===_0x4420cf(0x35f))this[_0x4420cf(0x300)]();else{const _0x5e97f3=this[_0x4420cf(0x386)]();if(!_0x5e97f3)return;const _0x26a636=_0x5e97f3[_0x4420cf(0x386)]();if(!_0x26a636)return;const _0x3cff49=_0x26a636[_0x4420cf(0x2d6)]();if(!_0x3cff49)return;this['setBlendColor'](_0x3cff49[_0x4420cf(0x1e1)]);}}else VisuMZ['BattleSystemSTB'][_0x4420cf(0x278)][_0x4420cf(0x38e)](this);},BattleManager[_0x325044(0x300)]=function(){const _0x38e0a6=_0x325044,_0x4a4506=this[_0x38e0a6(0x3a6)];if(_0x4a4506[_0x38e0a6(0x1ee)]()&&_0x4a4506['canInput']()){const _0x2366d0=_0x4a4506['currentAction']();if(!_0x2366d0)VisuMZ[_0x38e0a6(0x2bc)][_0x38e0a6(0x278)][_0x38e0a6(0x38e)](this);else{if(_0x2366d0[_0x38e0a6(0x36e)]){if('XsARP'===_0x38e0a6(0x340))return this['_scene']&&this[_0x38e0a6(0x3b1)][_0x38e0a6(0x260)]===_0xb0797b;else VisuMZ['BattleSystemSTB'][_0x38e0a6(0x278)][_0x38e0a6(0x38e)](this);}else'ijppk'!==_0x38e0a6(0x1ff)?(this[_0x38e0a6(0x26e)]=_0x4a4506,this[_0x38e0a6(0x2cb)]()):(_0x5950b8(_0x38e0a6(0x1f7)[_0x38e0a6(0x2db)](_0x37d372,_0x20ec0d,_0x1c6017)),_0x72d84a['exit']());}}else VisuMZ[_0x38e0a6(0x2bc)][_0x38e0a6(0x278)][_0x38e0a6(0x38e)](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x22f)]=BattleManager['finishActorInput'],BattleManager[_0x325044(0x229)]=function(){const _0x5c77e5=_0x325044;this[_0x5c77e5(0x3bb)]()?VisuMZ['BattleSystemSTB'][_0x5c77e5(0x278)][_0x5c77e5(0x38e)](this):VisuMZ['BattleSystemSTB'][_0x5c77e5(0x22f)][_0x5c77e5(0x38e)](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x208)]=BattleManager[_0x325044(0x2d1)],BattleManager['selectNextActor']=function(){const _0x29a12b=_0x325044;this['isSTB']()?this[_0x29a12b(0x272)]():VisuMZ[_0x29a12b(0x2bc)]['BattleManager_selectNextActor'][_0x29a12b(0x38e)](this);},BattleManager[_0x325044(0x272)]=function(){const _0x3243ca=_0x325044;this[_0x3243ca(0x26e)]=null,this[_0x3243ca(0x1e9)]=![];},VisuMZ['BattleSystemSTB'][_0x325044(0x218)]=BattleManager[_0x325044(0x391)],BattleManager['endAction']=function(){const _0x280965=_0x325044;VisuMZ['BattleSystemSTB'][_0x280965(0x218)][_0x280965(0x38e)](this),this['endActionSTB']();},BattleManager[_0x325044(0x259)]=function(){const _0x523d3a=_0x325044;if(!this['isSTB']())return;this[_0x523d3a(0x21b)]();if(this[_0x523d3a(0x234)][_0x523d3a(0x36a)]>0x0){if('fOyrt'===_0x523d3a(0x30d))_0x40ebd4[_0x523d3a(0x2bc)][_0x523d3a(0x29d)][_0x523d3a(0x38e)](this),this[_0x523d3a(0x207)]();else{if(this['_subject']){if(!this['_actionBattlers'][_0x523d3a(0x2f1)](this['_subject'])){if(_0x523d3a(0x261)!=='cFLfO')this[_0x523d3a(0x331)][_0x523d3a(0x304)](this[_0x523d3a(0x3a6)]);else return this[_0x523d3a(0x330)]===_0x311ef3&&this[_0x523d3a(0x227)](),this['_stbTurnOrderVisible'];}}this[_0x523d3a(0x3a6)]=this[_0x523d3a(0x31e)]();}};},BattleManager['isSTBExploitSystemEnabled']=function(){const _0x4e0bc6=_0x325044;return VisuMZ[_0x4e0bc6(0x2bc)][_0x4e0bc6(0x219)][_0x4e0bc6(0x313)]['EnableExploit'];},BattleManager[_0x325044(0x3b8)]=function(){const _0xd3fe74=_0x325044,_0x213f7e=$gameParty['aliveMembers']()[_0xd3fe74(0x2e3)](_0x3426ab=>_0x3426ab['isAppeared']()),_0x3fd28d=_0x213f7e['filter'](_0x26e081=>_0x26e081['isSTBExploited']());return _0x213f7e[_0xd3fe74(0x36a)]===_0x3fd28d[_0xd3fe74(0x36a)];},BattleManager[_0x325044(0x37d)]=function(){const _0x1557bc=_0x325044,_0x21633e=$gameTroop[_0x1557bc(0x2c6)]()['filter'](_0x4dc4fd=>_0x4dc4fd[_0x1557bc(0x306)]()),_0x16384f=_0x21633e['filter'](_0x4eb049=>_0x4eb049[_0x1557bc(0x1e6)]());return _0x21633e[_0x1557bc(0x36a)]===_0x16384f['length'];},VisuMZ[_0x325044(0x2bc)]['BattleManager_makeActionOrders']=BattleManager[_0x325044(0x2a6)],BattleManager[_0x325044(0x2a6)]=function(){const _0x444e9d=_0x325044;VisuMZ['BattleSystemSTB'][_0x444e9d(0x2e5)][_0x444e9d(0x38e)](this),this['isSTB']()&&(this[_0x444e9d(0x21b)](),this[_0x444e9d(0x24b)](),this[_0x444e9d(0x1fe)]());},BattleManager[_0x325044(0x21b)]=function(){const _0x8abefd=_0x325044;if(!this[_0x8abefd(0x3bb)]())return;this[_0x8abefd(0x331)]=this[_0x8abefd(0x331)]||[],this['_actionBattlers']=this[_0x8abefd(0x331)][_0x8abefd(0x2e3)](_0x5dcb00=>_0x5dcb00&&_0x5dcb00[_0x8abefd(0x306)]()&&_0x5dcb00[_0x8abefd(0x258)]()),this[_0x8abefd(0x24b)]();},BattleManager[_0x325044(0x24b)]=function(_0x1536a0){const _0x25bed3=_0x325044;if(!this[_0x25bed3(0x3bb)]())return;const _0x3c6100=SceneManager[_0x25bed3(0x3b1)]['_stbTurnOrderWindow'];if(!_0x3c6100)return;_0x3c6100[_0x25bed3(0x20d)](_0x1536a0);},BattleManager[_0x325044(0x1fe)]=function(){for(const _0x41843e of this['allBattleMembers']()){if(!_0x41843e)continue;_0x41843e['setSTBNextTurnSpeed'](0x0);}},VisuMZ[_0x325044(0x2bc)][_0x325044(0x349)]=Game_System['prototype']['initialize'],Game_System['prototype'][_0x325044(0x34f)]=function(){const _0x56134c=_0x325044;VisuMZ[_0x56134c(0x2bc)]['Game_System_initialize'][_0x56134c(0x38e)](this),this[_0x56134c(0x227)]();},Game_System[_0x325044(0x27e)][_0x325044(0x227)]=function(){const _0x58aada=_0x325044;this[_0x58aada(0x330)]=!![];},Game_System[_0x325044(0x27e)][_0x325044(0x2ef)]=function(){const _0x4a65b2=_0x325044;return this[_0x4a65b2(0x330)]===undefined&&this['initBattleSystemSTB'](),this[_0x4a65b2(0x330)];},Game_System[_0x325044(0x27e)][_0x325044(0x2aa)]=function(_0x2678f7){const _0x463061=_0x325044;this[_0x463061(0x330)]===undefined&&this[_0x463061(0x227)](),this['_stbTurnOrderVisible']=_0x2678f7;},VisuMZ['BattleSystemSTB'][_0x325044(0x3a5)]=Game_Action['prototype'][_0x325044(0x381)],Game_Action[_0x325044(0x27e)][_0x325044(0x381)]=function(){const _0x945d6d=_0x325044;if(BattleManager[_0x945d6d(0x3bb)]()){if(_0x945d6d(0x397)!==_0x945d6d(0x39e))return 0x0;else{const _0x969a48=_0x43132a[_0x945d6d(0x2bc)][_0x945d6d(0x2e7)]['CannotBeExploited'];return this[_0x945d6d(0x32e)]()['some'](_0x47c50d=>_0x47c50d[_0x945d6d(0x20f)]['match'](_0x969a48));}}else return VisuMZ[_0x945d6d(0x2bc)][_0x945d6d(0x3a5)]['call'](this);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x288)]=Game_Action[_0x325044(0x27e)]['applyGlobal'],Game_Action['prototype'][_0x325044(0x286)]=function(){const _0xceb084=_0x325044;VisuMZ[_0xceb084(0x2bc)]['Game_Action_applyGlobal'][_0xceb084(0x38e)](this),this['applyGlobalBattleSystemSTB']();},Game_Action['prototype'][_0x325044(0x240)]=function(){const _0x44027c=_0x325044;if(!SceneManager[_0x44027c(0x361)]())return;if(!BattleManager[_0x44027c(0x3bb)]())return;const _0x3a6008=this[_0x44027c(0x263)](),_0x23f07e=VisuMZ[_0x44027c(0x2bc)]['RegExp'],_0x44112f=VisuMZ[_0x44027c(0x2bc)][_0x44027c(0x219)][_0x44027c(0x327)];_0x3a6008&&_0x3a6008['note'][_0x44027c(0x355)](_0x23f07e[_0x44027c(0x228)])&&this[_0x44027c(0x2c0)]()['stbGainInstant'](0x1);const _0x4d6b51=_0x44112f[_0x44027c(0x235)]['call'](this);this[_0x44027c(0x2c0)]()[_0x44027c(0x3a8)](_0x4d6b51);},VisuMZ['BattleSystemSTB']['Game_Action_clear']=Game_Action[_0x325044(0x27e)][_0x325044(0x23a)],Game_Action[_0x325044(0x27e)][_0x325044(0x23a)]=function(){const _0x27b26d=_0x325044;VisuMZ['BattleSystemSTB'][_0x27b26d(0x2a0)][_0x27b26d(0x38e)](this),this[_0x27b26d(0x2d7)]();},Game_Action[_0x325044(0x27e)][_0x325044(0x2d7)]=function(){const _0xad355=_0x325044;this[_0xad355(0x366)]=![];},Game_Action['prototype'][_0x325044(0x2dd)]=function(){const _0x2bdbca=_0x325044;return this[_0x2bdbca(0x366)]===undefined&&this[_0x2bdbca(0x2d7)](),this[_0x2bdbca(0x366)];},Game_Action[_0x325044(0x27e)]['setSTBExploitedFlag']=function(_0xc195db){const _0x568372=_0x325044;this[_0x568372(0x366)]===undefined&&this[_0x568372(0x2d7)](),this[_0x568372(0x366)]=_0xc195db;},VisuMZ[_0x325044(0x2bc)]['Game_Action_executeDamage']=Game_Action[_0x325044(0x27e)][_0x325044(0x1ec)],Game_Action[_0x325044(0x27e)][_0x325044(0x1ec)]=function(_0x572d1c,_0x114340){const _0x33156f=_0x325044;VisuMZ[_0x33156f(0x2bc)][_0x33156f(0x30f)][_0x33156f(0x38e)](this,_0x572d1c,_0x114340),this[_0x33156f(0x3a1)](_0x572d1c);},Game_Action[_0x325044(0x27e)][_0x325044(0x3a1)]=function(_0x2fb7d4){const _0x3946d4=_0x325044;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x3946d4(0x3bb)]())return;if(!BattleManager[_0x3946d4(0x22d)]())return;if(_0x2fb7d4[_0x3946d4(0x2d3)]()===this[_0x3946d4(0x2c0)]()[_0x3946d4(0x2d3)]())return;const _0x3db702=VisuMZ['BattleSystemSTB'][_0x3946d4(0x219)][_0x3946d4(0x313)],_0x215572=_0x2fb7d4['result']();_0x3db702['ExploitCritical']&&_0x215572[_0x3946d4(0x2be)]&&(this[_0x3946d4(0x2c0)]()[_0x3946d4(0x2cf)](_0x2fb7d4,this),_0x2fb7d4[_0x3946d4(0x2b4)](this[_0x3946d4(0x2c0)](),this));if(_0x3db702[_0x3946d4(0x253)]){if(_0x3946d4(0x312)===_0x3946d4(0x312)){const _0x2ba65a=this[_0x3946d4(0x285)](_0x2fb7d4);_0x2ba65a>=_0x3db702['ExploitEleRate']&&(this[_0x3946d4(0x2c0)]()[_0x3946d4(0x2cf)](_0x2fb7d4,this),_0x2fb7d4[_0x3946d4(0x2b4)](this[_0x3946d4(0x2c0)](),this));}else this[_0x3946d4(0x1fc)]=this['createTurnOrderSTBGraphicFaceIndex']();}},VisuMZ[_0x325044(0x2bc)][_0x325044(0x29d)]=Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x221)],Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x221)]=function(){const _0x50c1a3=_0x325044;VisuMZ[_0x50c1a3(0x2bc)][_0x50c1a3(0x29d)][_0x50c1a3(0x38e)](this),this['initMembersBattleSystemSTB']();},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x207)]=function(){const _0x18cde9=_0x325044;this['clearSTBNextTurnSpeed'](),this[_0x18cde9(0x325)]();},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x2af)]=function(){const _0x5bd9e3=_0x325044;this[_0x5bd9e3(0x2c3)]=0x0;},Game_BattlerBase['prototype']['getSTBNextTurnSpeed']=function(){const _0x379a22=_0x325044;return this[_0x379a22(0x2c3)]===undefined&&this[_0x379a22(0x207)](),this[_0x379a22(0x2c3)];},Game_BattlerBase['prototype'][_0x325044(0x3ad)]=function(_0x24c347){const _0x2ba906=_0x325044;this[_0x2ba906(0x2c3)]===undefined&&this[_0x2ba906(0x207)](),this[_0x2ba906(0x2c3)]=_0x24c347;},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x3a8)]=function(_0x298f7b){const _0x54d080=_0x325044;if(this[_0x54d080(0x2c3)]===undefined){if(_0x54d080(0x2fa)!=='LXuMO')this[_0x54d080(0x207)]();else{const _0x1f820e=this[_0x54d080(0x2d0)]()[_0x54d080(0x20f)];if(_0x1f820e['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x2a75e4(_0x2b04ec['$1']);return _0x578eb6[_0x54d080(0x219)][_0x54d080(0x223)];}}_0x298f7b+=this[_0x54d080(0x299)](),this[_0x54d080(0x3ad)](_0x298f7b);},Game_BattlerBase['prototype']['clearSTBExploit']=function(){const _0x5375fd=_0x325044;this[_0x5375fd(0x215)]=![];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x1e6)]=function(){const _0x856d41=_0x325044;return this[_0x856d41(0x215)]===undefined&&('LUhGF'==='LUhGF'?this[_0x856d41(0x207)]():_0x2c8513[_0x856d41(0x2bd)](_0x58ac6b[_0x856d41(0x36f)](_0x4ffdd8))),this[_0x856d41(0x215)];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x271)]=function(_0x432a58){const _0x123ac6=_0x325044;this['_stbExploited']===undefined&&this[_0x123ac6(0x207)](),this['_stbExploited']=_0x432a58;},Game_BattlerBase['prototype'][_0x325044(0x30b)]=function(){const _0xf979=_0x325044,_0x2271b0=VisuMZ['BattleSystemSTB'][_0xf979(0x2e7)][_0xf979(0x3bf)];return this[_0xf979(0x32e)]()[_0xf979(0x25d)](_0x3c4f15=>_0x3c4f15[_0xf979(0x20f)][_0xf979(0x355)](_0x2271b0));},Game_BattlerBase['prototype'][_0x325044(0x21a)]=function(){const _0x36ceb4=_0x325044,_0x197012=VisuMZ['BattleSystemSTB'][_0x36ceb4(0x2e7)][_0x36ceb4(0x2d2)];return this['traitObjects']()[_0x36ceb4(0x25d)](_0x22f578=>_0x22f578[_0x36ceb4(0x20f)]['match'](_0x197012));},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x389)]=function(){const _0x44dd73=_0x325044;delete this[_0x44dd73(0x370)],delete this[_0x44dd73(0x264)],delete this[_0x44dd73(0x1fc)],delete this['_stbTurnOrderIconIndex'];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x1de)]=function(){const _0x58597e=_0x325044;return this[_0x58597e(0x370)]===undefined&&(this[_0x58597e(0x370)]=this['createTurnOrderSTBGraphicType']()),this['_stbTurnOrderGraphicType'];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x2b0)]=function(){const _0x26e3c0=_0x325044;return Window_STB_TurnOrder[_0x26e3c0(0x219)][_0x26e3c0(0x28c)];},Game_BattlerBase[_0x325044(0x27e)]['TurnOrderSTBGraphicFaceName']=function(){const _0x4bfd17=_0x325044;return this[_0x4bfd17(0x264)]===undefined&&('BKzSW'===_0x4bfd17(0x28a)?this[_0x4bfd17(0x353)]():this[_0x4bfd17(0x264)]=this['createTurnOrderSTBGraphicFaceName']()),this['_stbTurnOrderFaceName'];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x206)]=function(){const _0x23919e=_0x325044;return Window_STB_TurnOrder[_0x23919e(0x219)][_0x23919e(0x262)];},Game_BattlerBase[_0x325044(0x27e)]['TurnOrderSTBGraphicFaceIndex']=function(){const _0x4892ca=_0x325044;return this[_0x4892ca(0x1fc)]===undefined&&('pjECe'===_0x4892ca(0x224)?this[_0x4892ca(0x370)]=this[_0x4892ca(0x2b0)]():this['_stbTurnOrderFaceIndex']=this[_0x4892ca(0x2b3)]()),this['_stbTurnOrderFaceIndex'];},Game_BattlerBase['prototype'][_0x325044(0x2b3)]=function(){const _0x50c0f5=_0x325044;return Window_STB_TurnOrder[_0x50c0f5(0x219)][_0x50c0f5(0x3b0)];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x379)]=function(){const _0x43188a=_0x325044;return this['_stbTurnOrderIconIndex']===undefined&&(this[_0x43188a(0x27a)]=this[_0x43188a(0x39b)]()),this['_stbTurnOrderIconIndex'];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x39b)]=function(){const _0x17d14d=_0x325044;return Window_STB_TurnOrder['Settings'][_0x17d14d(0x223)];},Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x236)]=function(_0x5c1b52){const _0x45e904=_0x325044;this[_0x45e904(0x27a)]=_0x5c1b52;},VisuMZ[_0x325044(0x2bc)][_0x325044(0x31f)]=Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x35e)],Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x35e)]=function(){const _0x4cc0cb=_0x325044;VisuMZ['BattleSystemSTB'][_0x4cc0cb(0x31f)][_0x4cc0cb(0x38e)](this),BattleManager[_0x4cc0cb(0x21b)]();},VisuMZ[_0x325044(0x2bc)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x325044(0x27e)][_0x325044(0x2f2)],Game_BattlerBase[_0x325044(0x27e)]['appear']=function(){const _0x3f1490=_0x325044;VisuMZ[_0x3f1490(0x2bc)][_0x3f1490(0x294)][_0x3f1490(0x38e)](this),BattleManager[_0x3f1490(0x21b)]();},VisuMZ[_0x325044(0x2bc)][_0x325044(0x328)]=Game_Battler[_0x325044(0x27e)]['performCollapse'],Game_Battler[_0x325044(0x27e)][_0x325044(0x351)]=function(){const _0x2c7d1a=_0x325044;VisuMZ['BattleSystemSTB'][_0x2c7d1a(0x328)][_0x2c7d1a(0x38e)](this),BattleManager[_0x2c7d1a(0x21b)]();},VisuMZ[_0x325044(0x2bc)][_0x325044(0x2c9)]=Game_Battler[_0x325044(0x27e)][_0x325044(0x2cd)],Game_Battler['prototype'][_0x325044(0x2cd)]=function(_0x140683){const _0x31e6a8=_0x325044;VisuMZ[_0x31e6a8(0x2bc)][_0x31e6a8(0x2c9)]['call'](this,_0x140683),this[_0x31e6a8(0x2ae)](_0x140683);},Game_Battler[_0x325044(0x27e)][_0x325044(0x2ae)]=function(_0x122507){const _0x5b9ed4=_0x325044;if(!BattleManager[_0x5b9ed4(0x3bb)]())return;this[_0x5b9ed4(0x325)]();const _0x45fddd=new Game_Action(this);this[_0x5b9ed4(0x3ad)](0x0);},VisuMZ[_0x325044(0x2bc)][_0x325044(0x23d)]=Game_Battler[_0x325044(0x27e)][_0x325044(0x3b6)],Game_Battler['prototype'][_0x325044(0x3b6)]=function(){const _0x1eff3d=_0x325044;VisuMZ[_0x1eff3d(0x2bc)][_0x1eff3d(0x23d)]['call'](this),BattleManager[_0x1eff3d(0x3bb)]()&&VisuMZ[_0x1eff3d(0x2bc)][_0x1eff3d(0x219)][_0x1eff3d(0x313)][_0x1eff3d(0x372)]&&this[_0x1eff3d(0x325)]();},VisuMZ['BattleSystemSTB'][_0x325044(0x270)]=Game_Battler['prototype']['performActionEnd'],Game_Battler[_0x325044(0x27e)][_0x325044(0x2c1)]=function(){const _0x25b14d=_0x325044;VisuMZ[_0x25b14d(0x2bc)][_0x25b14d(0x270)][_0x25b14d(0x38e)](this),BattleManager['isSTB']()&&this[_0x25b14d(0x33a)]();},Game_Battler[_0x325044(0x27e)][_0x325044(0x33a)]=function(){const _0x1cb2d2=_0x325044;if(this[_0x1cb2d2(0x2fc)]()>0x0&&this===BattleManager[_0x1cb2d2(0x3a6)]){const _0x2b1d2d=BattleManager[_0x1cb2d2(0x234)];if(_0x2b1d2d[_0x1cb2d2(0x36a)]>0x0&&_0x2b1d2d[0x0]!==this)return;const _0x5db00f=this[_0x1cb2d2(0x386)]();if(_0x5db00f)_0x5db00f[_0x1cb2d2(0x3c1)]();}},Game_Battler[_0x325044(0x27e)]['allowRandomSpeed']=function(){const _0x22b88d=_0x325044;return VisuMZ['BattleCore'][_0x22b88d(0x219)][_0x22b88d(0x32b)]['AllowRandomSpeed'];},VisuMZ[_0x325044(0x2bc)][_0x325044(0x27b)]=Game_Battler[_0x325044(0x27e)][_0x325044(0x25a)],Game_Battler['prototype'][_0x325044(0x25a)]=function(){const _0x32034b=_0x325044;if(BattleManager[_0x32034b(0x3bb)]())this[_0x32034b(0x311)]();else{if(_0x32034b(0x36b)!==_0x32034b(0x36b)){if(!_0x2d68b7)return;if(_0x23dae6[_0x32034b(0x2e8)]){const _0x28e177=_0x1ebf67[_0x32034b(0x2e8)],_0x2c5f35=_0x1fa051[_0x32034b(0x35c)],_0x2acfdb=_0x957084['Mute'];_0x5d956d[_0x32034b(0x30c)]([this],_0x28e177,_0x2c5f35,_0x2acfdb);}if(this['battler']()&&_0x5404f9[_0x32034b(0x34d)]['length']>0x0){const _0x365706=_0x50fcc4[_0x32034b(0x34d)],_0x578194={'textColor':_0x2db0be['getColor'](_0x2c0816[_0x32034b(0x387)]),'flashColor':_0x157dc5[_0x32034b(0x220)],'flashDuration':_0x16abae[_0x32034b(0x371)]};this[_0x32034b(0x352)](_0x365706,_0x578194);}}else VisuMZ[_0x32034b(0x2bc)][_0x32034b(0x27b)]['call'](this);}},Game_Battler['prototype'][_0x325044(0x311)]=function(){const _0x46a460=_0x325044;this['_speed']=VisuMZ['BattleSystemSTB'][_0x46a460(0x219)]['Speed']['InitialSpeedJS']['call'](this);},Game_Battler[_0x325044(0x27e)][_0x325044(0x2c8)]=function(){const _0x1081cf=_0x325044,_0x4a287b=this[_0x1081cf(0x1ee)]()?this[_0x1081cf(0x2ac)]()['note']:this[_0x1081cf(0x2d0)]()[_0x1081cf(0x20f)];if(_0x4a287b[_0x1081cf(0x355)](VisuMZ[_0x1081cf(0x2bc)][_0x1081cf(0x2e7)][_0x1081cf(0x38f)])){if('kddVK'!==_0x1081cf(0x225))this[_0x1081cf(0x2b7)]();else return VisuMZ[_0x1081cf(0x2bc)][_0x1081cf(0x291)](RegExp['$1']);}return VisuMZ[_0x1081cf(0x2bc)][_0x1081cf(0x219)][_0x1081cf(0x321)][_0x1081cf(0x20b)]||[];},Game_Battler['prototype']['stbExploiterStates']=function(){const _0x303339=_0x325044,_0xea773e=this[_0x303339(0x1ee)]()?this[_0x303339(0x2ac)]()[_0x303339(0x20f)]:this[_0x303339(0x2d0)]()[_0x303339(0x20f)];if(_0xea773e[_0x303339(0x355)](VisuMZ[_0x303339(0x2bc)]['RegExp'][_0x303339(0x33f)]))return VisuMZ[_0x303339(0x2bc)][_0x303339(0x291)](RegExp['$1']);return VisuMZ['BattleSystemSTB'][_0x303339(0x219)][_0x303339(0x346)][_0x303339(0x20b)]||[];},VisuMZ['BattleSystemSTB'][_0x325044(0x291)]=function(_0x4dc255){const _0x4201a9=_0x325044,_0x3a8563=_0x4dc255[_0x4201a9(0x268)](','),_0x3ce5e7=[];for(let _0xac15d4 of _0x3a8563){_0xac15d4=(String(_0xac15d4)||'')[_0x4201a9(0x365)]();const _0x295123=/^\d+$/[_0x4201a9(0x318)](_0xac15d4);if(_0x295123)_0x3ce5e7['push'](Number(_0xac15d4));else{if(_0x4201a9(0x2b6)!==_0x4201a9(0x2a1))_0x3ce5e7[_0x4201a9(0x2bd)](DataManager[_0x4201a9(0x36f)](_0xac15d4));else{const _0x4720e0=this['containerWindow']();if(!_0x4720e0)return;let _0x4fd297=![];if(this[_0x4201a9(0x34e)]!==_0x4720e0[_0x4201a9(0x21d)])_0x4fd297=!![];else this[_0x4201a9(0x3a7)]!==_0x4720e0[_0x4201a9(0x1f8)]&&(_0x4fd297=!![]);_0x4fd297&&this['calculateTargetPositions']();}}}return _0x3ce5e7;},Game_Battler[_0x325044(0x27e)][_0x325044(0x2b4)]=function(_0x194adf,_0x184632){const _0xfc8e5=_0x325044;if(!BattleManager[_0xfc8e5(0x3bb)]())return;if(!BattleManager[_0xfc8e5(0x22d)]())return;if(this[_0xfc8e5(0x1e6)]())return;const _0xef7ac5=VisuMZ[_0xfc8e5(0x2bc)]['Settings']['Exploited'];if(!_0xef7ac5[_0xfc8e5(0x388)]){if(_0xfc8e5(0x39a)!==_0xfc8e5(0x33e))this[_0xfc8e5(0x271)](!![]);else{const _0x382262=_0x55c08a[_0xfc8e5(0x219)],_0x7c6df0=this[_0xfc8e5(0x348)]()?_0x382262[_0xfc8e5(0x3b2)]:_0x382262[_0xfc8e5(0x279)];return _0x7c6df0+0x1;}}if(this[_0xfc8e5(0x30b)]())return;if(this['hp']<=0x0)return;this['displayExploitedEffects'](_0xef7ac5);if(this['hp']>0x0||!this['isImmortal']())for(const _0x4ac3ba of this['stbExploitedStates']()){if(_0xfc8e5(0x256)!==_0xfc8e5(0x25b)){if(!$dataStates[_0x4ac3ba])continue;this[_0xfc8e5(0x243)](_0x4ac3ba);}else this[_0xfc8e5(0x2d7)]();}if(_0xef7ac5[_0xfc8e5(0x298)]){if(_0xfc8e5(0x378)===_0xfc8e5(0x22e))return _0x222c6f[_0xfc8e5(0x2fd)]&&_0x5308db['description'][_0xfc8e5(0x2f1)]('['+_0x188f8f+']');else _0xef7ac5[_0xfc8e5(0x298)][_0xfc8e5(0x38e)](this,_0x194adf,_0x184632);}if(this[_0xfc8e5(0x1ee)]()&&BattleManager['areAllActorsExploited']()){if('hdqxs'==='hdqxs'){const _0x1a46dd=_0xef7ac5[_0xfc8e5(0x31d)];_0x1a46dd>0x0&&$dataCommonEvents[_0x1a46dd]&&$gameTemp[_0xfc8e5(0x2c2)](_0x1a46dd);}else return _0x275a5f(_0x60ef29['$1']);}else{if(this['isEnemy']()&&BattleManager[_0xfc8e5(0x37d)]()){const _0x492b6e=_0xef7ac5[_0xfc8e5(0x252)];_0x492b6e>0x0&&$dataCommonEvents[_0x492b6e]&&$gameTemp[_0xfc8e5(0x2c2)](_0x492b6e);}}},Game_Battler[_0x325044(0x27e)][_0x325044(0x2cf)]=function(_0x17e073,_0x2b1685){const _0xcf4a99=_0x325044;if(!BattleManager['isSTB']())return;if(!BattleManager[_0xcf4a99(0x22d)]())return;if(_0x2b1685[_0xcf4a99(0x2dd)]())return;if(_0x17e073[_0xcf4a99(0x1e6)]())return;const _0x2e9d22=VisuMZ['BattleSystemSTB']['Settings'][_0xcf4a99(0x346)];!_0x2e9d22[_0xcf4a99(0x1ea)]&&_0x2b1685[_0xcf4a99(0x316)](!![]);if(this[_0xcf4a99(0x21a)]())return;this[_0xcf4a99(0x395)](_0x2e9d22);_0x2e9d22[_0xcf4a99(0x2bf)]>0x0&&this[_0xcf4a99(0x360)](_0x2e9d22[_0xcf4a99(0x2bf)]);for(const _0x105b9f of this[_0xcf4a99(0x255)]()){if('PTUtm'==='zwDlP'){const _0x4d8979=this['battler']();if(!_0x4d8979)return;if(!_0x4d8979['isEnemy']())return;if(this[_0xcf4a99(0x2e1)]===_0x4d8979['battlerHue']())return;this[_0xcf4a99(0x2e1)]=_0x4d8979[_0xcf4a99(0x281)]();if(_0x4d8979['hasSvBattler']())this[_0xcf4a99(0x2e1)]=0x0;this[_0xcf4a99(0x1e7)]['setHue'](this[_0xcf4a99(0x2e1)]);}else{if(!$dataStates[_0x105b9f])continue;this['addState'](_0x105b9f);}}if(_0x2e9d22[_0xcf4a99(0x298)]){if(_0xcf4a99(0x367)!==_0xcf4a99(0x367))return _0x61b223[_0xcf4a99(0x219)][_0xcf4a99(0x28c)];else _0x2e9d22['CustomJS'][_0xcf4a99(0x38e)](this,_0x17e073,_0x2b1685);}},Game_Battler[_0x325044(0x27e)][_0x325044(0x395)]=function(_0x222e6d){const _0x392528=_0x325044;if(!_0x222e6d)return;if(_0x222e6d['AnimationID']){const _0x493b58=_0x222e6d[_0x392528(0x2e8)],_0x2f1779=_0x222e6d[_0x392528(0x35c)],_0x24a16c=_0x222e6d['Mute'];$gameTemp['requestFauxAnimation']([this],_0x493b58,_0x2f1779,_0x24a16c);}if(this[_0x392528(0x386)]()&&_0x222e6d['PopupText']['length']>0x0){const _0x2ff568=_0x222e6d[_0x392528(0x34d)],_0x4bee78={'textColor':ColorManager[_0x392528(0x399)](_0x222e6d[_0x392528(0x387)]),'flashColor':_0x222e6d[_0x392528(0x220)],'flashDuration':_0x222e6d[_0x392528(0x371)]};this['setupTextPopup'](_0x2ff568,_0x4bee78);}},Game_Battler[_0x325044(0x27e)]['stbGainInstant']=function(_0x1dcdc0){const _0x54bbe3=_0x325044;this[_0x54bbe3(0x2dc)]=this[_0x54bbe3(0x2dc)]||[];const _0x5ad1fb=this[_0x54bbe3(0x2dc)][_0x54bbe3(0x36a)]<=0x0;if(this[_0x54bbe3(0x27d)]()){for(let _0x14ce4c=0x0;_0x14ce4c<_0x1dcdc0;_0x14ce4c++){this[_0x54bbe3(0x2dc)][_0x54bbe3(0x2bd)](new Game_Action(this));}if(this[_0x54bbe3(0x2cc)]()){if(_0x54bbe3(0x24d)==='ySadL'){const _0x39c739=_0x497ea0[_0x54bbe3(0x234)];if(_0x39c739[_0x54bbe3(0x36a)]>0x0&&_0x39c739[0x0]!==this)return;const _0x11e447=this[_0x54bbe3(0x386)]();if(_0x11e447)_0x11e447[_0x54bbe3(0x3c1)]();}else{const _0x368612=this['enemy']()[_0x54bbe3(0x363)]['filter'](_0x2687b7=>this[_0x54bbe3(0x329)](_0x2687b7));if(_0x368612[_0x54bbe3(0x36a)]>0x0){if(_0x54bbe3(0x308)!==_0x54bbe3(0x1f4)){let _0x35b0d4;!_0x5ad1fb&&(_0x35b0d4=this[_0x54bbe3(0x2dc)]['shift']()),this[_0x54bbe3(0x237)](_0x368612),!_0x5ad1fb&&this[_0x54bbe3(0x2dc)][_0x54bbe3(0x304)](_0x35b0d4);}else this['_targetHomeX']=this[_0x54bbe3(0x27c)]=_0x438285['x'],this[_0x54bbe3(0x333)]=this[_0x54bbe3(0x226)]=_0x1226a7['y'],this[_0x54bbe3(0x23f)]=_0x2aa852['width'],this[_0x54bbe3(0x3b7)]=_0x3a122b[_0x54bbe3(0x1f8)],this[_0x54bbe3(0x2fb)]=0x0;}}}}},VisuMZ[_0x325044(0x2bc)][_0x325044(0x338)]=Game_Actor[_0x325044(0x27e)][_0x325044(0x29f)],Game_Actor[_0x325044(0x27e)][_0x325044(0x29f)]=function(){const _0x23d895=_0x325044;if(BattleManager[_0x23d895(0x3bb)]()){if(this[_0x23d895(0x386)]())this[_0x23d895(0x386)]()[_0x23d895(0x3c1)]();return![];}return VisuMZ[_0x23d895(0x2bc)][_0x23d895(0x338)][_0x23d895(0x38e)](this);},Game_Actor[_0x325044(0x27e)][_0x325044(0x2b0)]=function(){const _0x2d6994=_0x325044,_0xf631b3=this[_0x2d6994(0x305)]()['note'];if(_0xf631b3['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2d6994(0x266)==='bxxbo'){if(this[_0x2d6994(0x383)]>0x0){const _0x5d39fd=this[_0x2d6994(0x383)];this[_0x2d6994(0x222)]=(this[_0x2d6994(0x222)]*(_0x5d39fd-0x1)+this['_fadeTarget'])/_0x5d39fd,this[_0x2d6994(0x383)]--,this[_0x2d6994(0x383)]<=0x0&&(this['checkPosition'](),this[_0x2d6994(0x307)]=0x0,this['updatePosition'](),this[_0x2d6994(0x222)]=this[_0x2d6994(0x254)]);}if(this[_0x2d6994(0x385)])return;_0x2fecc3['_phase']===_0x2d6994(0x21f)&&(this[_0x2d6994(0x385)]=!![],this[_0x2d6994(0x296)](0x0));}else return'face';}else{if(_0xf631b3[_0x2d6994(0x355)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x2d6994(0x209);}return Window_STB_TurnOrder[_0x2d6994(0x219)]['ActorBattlerType'];},Game_Actor[_0x325044(0x27e)][_0x325044(0x2c7)]=function(){const _0x4381aa=_0x325044,_0x4059d2=this[_0x4381aa(0x305)]()[_0x4381aa(0x20f)];if(_0x4059d2[_0x4381aa(0x355)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4381aa(0x3a2)]();},Game_Actor[_0x325044(0x27e)][_0x325044(0x232)]=function(){const _0x54a267=_0x325044,_0x5919d5=this[_0x54a267(0x305)]()['note'];if(_0x5919d5[_0x54a267(0x355)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x54a267(0x375)]();},Game_Actor[_0x325044(0x27e)][_0x325044(0x39b)]=function(){const _0x2c4a0c=_0x325044,_0x751edf=this[_0x2c4a0c(0x305)]()['note'];if(_0x751edf['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x2c4a0c(0x219)]['ActorBattlerIcon'];},Game_Enemy['prototype'][_0x325044(0x2b0)]=function(){const _0x5835f2=_0x325044,_0x213c1b=this[_0x5835f2(0x2d0)]()[_0x5835f2(0x20f)];if(_0x213c1b[_0x5835f2(0x355)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5835f2(0x36d);else{if(_0x213c1b[_0x5835f2(0x355)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x5835f2(0x209);}return Window_STB_TurnOrder[_0x5835f2(0x219)][_0x5835f2(0x28c)];},Game_Enemy[_0x325044(0x27e)][_0x325044(0x206)]=function(){const _0x7ebc87=_0x325044,_0x300292=this[_0x7ebc87(0x2d0)]()['note'];if(_0x300292[_0x7ebc87(0x355)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_STB_TurnOrder[_0x7ebc87(0x219)][_0x7ebc87(0x262)];},Game_Enemy['prototype'][_0x325044(0x2b3)]=function(){const _0x5abee1=_0x325044,_0x562cf1=this[_0x5abee1(0x2d0)]()['note'];if(_0x562cf1[_0x5abee1(0x355)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5abee1(0x302)===_0x5abee1(0x204))_0x208b50[_0x5abee1(0x2bc)]['Scene_Battle_commandCancel'][_0x5abee1(0x38e)](this);else return Number(RegExp['$2']);}return Window_STB_TurnOrder[_0x5abee1(0x219)][_0x5abee1(0x3b0)];},Game_Enemy[_0x325044(0x27e)][_0x325044(0x39b)]=function(){const _0x5dad47=_0x325044,_0x51a1b4=this[_0x5dad47(0x2d0)]()[_0x5dad47(0x20f)];if(_0x51a1b4[_0x5dad47(0x355)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x5dad47(0x219)][_0x5dad47(0x223)];},VisuMZ[_0x325044(0x2bc)][_0x325044(0x34a)]=Game_Party['prototype'][_0x325044(0x38a)],Game_Party[_0x325044(0x27e)][_0x325044(0x38a)]=function(_0x188099){const _0x3928c8=_0x325044;VisuMZ[_0x3928c8(0x2bc)]['Game_Party_removeActor']['call'](this,_0x188099),SceneManager['isSceneBattle']()&&BattleManager[_0x3928c8(0x3bb)]()&&(_0x3928c8(0x217)!=='XRBaS'?_0x2aa31d=!![]:BattleManager['_actionBattlers'][_0x3928c8(0x32c)]($gameActors['actor'](_0x188099)));},VisuMZ[_0x325044(0x2bc)][_0x325044(0x247)]=Scene_Battle[_0x325044(0x27e)][_0x325044(0x377)],Scene_Battle['prototype'][_0x325044(0x377)]=function(){const _0x15731f=_0x325044;VisuMZ[_0x15731f(0x2bc)][_0x15731f(0x247)]['call'](this),BattleManager[_0x15731f(0x3bb)]()&&this[_0x15731f(0x2b7)]();},Scene_Battle[_0x325044(0x27e)][_0x325044(0x2b7)]=function(){const _0x9b8c41=_0x325044,_0x170e99=this['_actorCommandWindow'];this['isPartyCommandWindowDisabled']()&&delete _0x170e99[_0x9b8c41(0x1fd)][_0x9b8c41(0x2b1)];},VisuMZ[_0x325044(0x2bc)][_0x325044(0x29a)]=Scene_Battle[_0x325044(0x27e)][_0x325044(0x2c4)],Scene_Battle[_0x325044(0x27e)][_0x325044(0x2c4)]=function(){const _0x49a7cd=_0x325044;BattleManager[_0x49a7cd(0x3bb)]()?this['commandCancelSTB']():'jtHpN'===_0x49a7cd(0x342)?VisuMZ[_0x49a7cd(0x2bc)]['Scene_Battle_commandCancel'][_0x49a7cd(0x38e)](this):(this[_0x49a7cd(0x2c0)]()[_0x49a7cd(0x2cf)](_0x2be60f,this),_0xe9f1c1[_0x49a7cd(0x2b4)](this[_0x49a7cd(0x2c0)](),this));},Scene_Battle[_0x325044(0x27e)][_0x325044(0x2e4)]=function(){const _0x761972=_0x325044;this['_partyCommandWindow']['setup'](),this['_actorCommandWindow'][_0x761972(0x3a4)]();},VisuMZ[_0x325044(0x2bc)][_0x325044(0x398)]=Scene_Battle[_0x325044(0x27e)]['commandFight'],Scene_Battle['prototype']['commandFight']=function(){const _0x239b03=_0x325044;BattleManager['isSTB']()?this[_0x239b03(0x39f)]():VisuMZ[_0x239b03(0x2bc)][_0x239b03(0x398)][_0x239b03(0x38e)](this);},VisuMZ['BattleSystemSTB']['Scene_Battle_createAllWindows']=Scene_Battle[_0x325044(0x27e)][_0x325044(0x246)],Scene_Battle[_0x325044(0x27e)]['createAllWindows']=function(){const _0x436022=_0x325044;VisuMZ[_0x436022(0x2bc)]['Scene_Battle_createAllWindows'][_0x436022(0x38e)](this),this[_0x436022(0x362)]();},Scene_Battle[_0x325044(0x27e)][_0x325044(0x362)]=function(){const _0x53086a=_0x325044;if(!BattleManager[_0x53086a(0x3bb)]())return;this[_0x53086a(0x364)]=new Window_STB_TurnOrder();const _0x2c25eb=this[_0x53086a(0x33c)](this['_windowLayer']);this[_0x53086a(0x2a4)](this['_stbTurnOrderWindow'],_0x2c25eb),this['repositionLogWindowSTB'](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle['prototype']['repositionLogWindowSTB']=function(){const _0x136d84=_0x325044,_0x45c07c=Window_STB_TurnOrder[_0x136d84(0x219)];if(_0x45c07c[_0x136d84(0x3a9)]!==_0x136d84(0x39d))return;if(!_0x45c07c[_0x136d84(0x3b9)])return;if(!this[_0x136d84(0x2e6)])return;const _0x22028d=this[_0x136d84(0x364)]['y']-Math[_0x136d84(0x2ff)]((Graphics['height']-Graphics['boxHeight'])/0x2),_0x4033c8=_0x22028d+this[_0x136d84(0x364)][_0x136d84(0x1f8)];this['_logWindow']['y']=_0x4033c8+_0x45c07c[_0x136d84(0x20c)];};function Sprite_STB_TurnOrder_Battler(){const _0x4e9aa9=_0x325044;this[_0x4e9aa9(0x34f)](...arguments);}Sprite_STB_TurnOrder_Battler['prototype']=Object[_0x325044(0x2f7)](Sprite_Clickable[_0x325044(0x27e)]),Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x260)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['initialize']=function(_0x4a1f87,_0x4f8538){const _0x149cb6=_0x325044;this[_0x149cb6(0x221)](_0x4a1f87,_0x4f8538),Sprite_Clickable[_0x149cb6(0x27e)][_0x149cb6(0x34f)]['call'](this),this[_0x149cb6(0x222)]=0x0,this['createChildren'](),this[_0x149cb6(0x353)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x221)]=function(_0x4641f9,_0x2d9844){const _0x403837=_0x325044;this[_0x403837(0x317)]=_0x4641f9,this[_0x403837(0x2f8)]=_0x2d9844;const _0x35e61b=Window_STB_TurnOrder[_0x403837(0x219)],_0x42f49c=this[_0x403837(0x348)](),_0x5e30a2=this[_0x403837(0x38d)]();this['_positionDuration']=0x0,this['_positionTargetX']=_0x42f49c?_0x35e61b[_0x403837(0x265)]*_0x5e30a2:0x0,this[_0x403837(0x2a9)]=_0x42f49c?0x0:_0x35e61b['SpriteThin']*_0x5e30a2,this['_fadeDuration']=0x0,this['_fadeTarget']=0xff,this['_isAlive']=![],this[_0x403837(0x24e)]=![],this['_containerWidth']=0x0,this[_0x403837(0x3a7)]=0x0;},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x1fa)]=function(){const _0x13d2c9=_0x325044;this['createInitialPositions'](),this[_0x13d2c9(0x3b3)](),this[_0x13d2c9(0x25e)](),this[_0x13d2c9(0x277)](),this[_0x13d2c9(0x2ea)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x2b2)]=function(){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x348)]=function(){const _0x42585a=_0x325044,_0x237dc1=Window_STB_TurnOrder[_0x42585a(0x219)],_0x362524=['top',_0x42585a(0x303)][_0x42585a(0x2f1)](_0x237dc1[_0x42585a(0x3a9)]);return _0x362524;},Sprite_STB_TurnOrder_Battler['prototype'][_0x325044(0x369)]=function(){const _0x3a88b2=_0x325044,_0x28273f=Window_STB_TurnOrder[_0x3a88b2(0x219)];return this['isHorz']()?_0x28273f[_0x3a88b2(0x265)]:_0x28273f[_0x3a88b2(0x2f0)];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['bitmapHeight']=function(){const _0x37779a=_0x325044,_0x827441=Window_STB_TurnOrder[_0x37779a(0x219)];return this[_0x37779a(0x348)]()?_0x827441[_0x37779a(0x2f0)]:_0x827441[_0x37779a(0x265)];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x3bd)]=function(){const _0x303823=_0x325044;this[_0x303823(0x2d8)]=new Bitmap(0x48,0x24);const _0x3792ac=this[_0x303823(0x386)]()?this[_0x303823(0x386)]()[_0x303823(0x368)]():_0x303823(0x1ed)[_0x303823(0x2db)](this['_unit'],this[_0x303823(0x2f8)]);this[_0x303823(0x2d8)]['drawText'](_0x3792ac,0x0,0x0,0x48,0x24,_0x303823(0x25c));},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x3b3)]=function(){const _0x7a9244=_0x325044;if(!Window_STB_TurnOrder['Settings'][_0x7a9244(0x31c)])return;const _0x18e388=Window_STB_TurnOrder['Settings'],_0x31d4de=this[_0x7a9244(0x317)]===$gameParty?_0x7a9244(0x3c0):_0x7a9244(0x238),_0x52dfeb='%1SystemBg'[_0x7a9244(0x2db)](_0x31d4de),_0x4ded18=new Sprite();_0x4ded18['anchor']['x']=this[_0x7a9244(0x34c)]['x'],_0x4ded18[_0x7a9244(0x34c)]['y']=this[_0x7a9244(0x34c)]['y'];if(_0x18e388[_0x52dfeb])_0x7a9244(0x22b)!==_0x7a9244(0x22b)?(this['_graphicSv']=_0xb833e[_0x7a9244(0x295)](),_0x57add4=_0x3e5cbd['loadSvActor'](this[_0x7a9244(0x35a)]),_0x125da4['addLoadListener'](this[_0x7a9244(0x274)][_0x7a9244(0x210)](this,_0x472a73))):_0x4ded18['bitmap']=ImageManager[_0x7a9244(0x251)](_0x18e388[_0x52dfeb]);else{const _0x1d2a07=this[_0x7a9244(0x369)](),_0x321bc7=this[_0x7a9244(0x28f)]();_0x4ded18['bitmap']=new Bitmap(_0x1d2a07,_0x321bc7);const _0x3d487c=ColorManager[_0x7a9244(0x399)](_0x18e388[_0x7a9244(0x3b5)[_0x7a9244(0x2db)](_0x31d4de)]),_0xc4edc6=ColorManager['getColor'](_0x18e388[_0x7a9244(0x21e)[_0x7a9244(0x2db)](_0x31d4de)]);_0x4ded18[_0x7a9244(0x2d8)][_0x7a9244(0x394)](0x0,0x0,_0x1d2a07,_0x321bc7,_0x3d487c,_0xc4edc6,!![]);}this['_backgroundSprite']=_0x4ded18,this[_0x7a9244(0x297)](this[_0x7a9244(0x33d)]),this[_0x7a9244(0x21d)]=this[_0x7a9244(0x33d)][_0x7a9244(0x21d)],this[_0x7a9244(0x1f8)]=this['_backgroundSprite'][_0x7a9244(0x1f8)];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x25e)]=function(){const _0x223ea7=_0x325044,_0x2e5566=new Sprite();_0x2e5566['anchor']['x']=this[_0x223ea7(0x34c)]['x'],_0x2e5566['anchor']['y']=this['anchor']['y'],this['_graphicSprite']=_0x2e5566,this['addChild'](this[_0x223ea7(0x1e7)]),this[_0x223ea7(0x2e2)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x277)]=function(){const _0x5936e7=_0x325044;if(!Window_STB_TurnOrder['Settings'][_0x5936e7(0x230)])return;const _0x2942cd=Window_STB_TurnOrder[_0x5936e7(0x219)],_0x36b030=this[_0x5936e7(0x317)]===$gameParty?_0x5936e7(0x3c0):_0x5936e7(0x238),_0x1d81cb='%1SystemBorder'[_0x5936e7(0x2db)](_0x36b030),_0xfd0720=new Sprite();_0xfd0720['anchor']['x']=this[_0x5936e7(0x34c)]['x'],_0xfd0720['anchor']['y']=this['anchor']['y'];if(_0x2942cd[_0x1d81cb])_0xfd0720[_0x5936e7(0x2d8)]=ImageManager[_0x5936e7(0x251)](_0x2942cd[_0x1d81cb]);else{let _0x464d16=this[_0x5936e7(0x369)](),_0x4180a7=this[_0x5936e7(0x28f)](),_0x172609=_0x2942cd[_0x5936e7(0x356)];_0xfd0720[_0x5936e7(0x2d8)]=new Bitmap(_0x464d16,_0x4180a7);const _0x28be92=_0x5936e7(0x28b),_0x8e488d=ColorManager[_0x5936e7(0x399)](_0x2942cd[_0x5936e7(0x2f9)['format'](_0x36b030)]);_0xfd0720[_0x5936e7(0x2d8)][_0x5936e7(0x38c)](0x0,0x0,_0x464d16,_0x4180a7,_0x28be92),_0x464d16-=0x2,_0x4180a7-=0x2,_0xfd0720[_0x5936e7(0x2d8)][_0x5936e7(0x38c)](0x1,0x1,_0x464d16,_0x4180a7,_0x8e488d),_0x464d16-=_0x172609*0x2,_0x4180a7-=_0x172609*0x2,_0xfd0720['bitmap'][_0x5936e7(0x38c)](0x1+_0x172609,0x1+_0x172609,_0x464d16,_0x4180a7,_0x28be92),_0x464d16-=0x2,_0x4180a7-=0x2,_0x172609+=0x1,_0xfd0720[_0x5936e7(0x2d8)][_0x5936e7(0x2e0)](0x1+_0x172609,0x1+_0x172609,_0x464d16,_0x4180a7);}this['_backgroundSprite']=_0xfd0720,this[_0x5936e7(0x297)](this[_0x5936e7(0x33d)]);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x2ea)]=function(){const _0x39c0f3=_0x325044,_0x4d7877=Window_STB_TurnOrder['Settings'];if(!_0x4d7877['EnemyBattlerDrawLetter'])return;if(this[_0x39c0f3(0x317)]===$gameParty)return;const _0x2b592a=this[_0x39c0f3(0x369)](),_0xd8ca04=this[_0x39c0f3(0x28f)](),_0x3d1de9=new Sprite();_0x3d1de9[_0x39c0f3(0x34c)]['x']=this['anchor']['x'],_0x3d1de9[_0x39c0f3(0x34c)]['y']=this[_0x39c0f3(0x34c)]['y'],_0x3d1de9[_0x39c0f3(0x2d8)]=new Bitmap(_0x2b592a,_0xd8ca04),this[_0x39c0f3(0x203)]=_0x3d1de9,this[_0x39c0f3(0x297)](this[_0x39c0f3(0x203)]);},Sprite_STB_TurnOrder_Battler['prototype'][_0x325044(0x386)]=function(){const _0xac205e=_0x325044;return this['_unit']?this[_0xac205e(0x317)]['members']()[this[_0xac205e(0x2f8)]]:null;},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x38b)]=function(){const _0x5c47af=_0x325044;Sprite_Clickable[_0x5c47af(0x27e)][_0x5c47af(0x38b)][_0x5c47af(0x38e)](this),this['checkPosition'](),this[_0x5c47af(0x25f)](),this[_0x5c47af(0x353)](),this[_0x5c47af(0x200)](),this[_0x5c47af(0x1f1)](),this['updateGraphicHue'](),this[_0x5c47af(0x2a8)](),this[_0x5c47af(0x257)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x2eb)]=function(){const _0x4bed7f=_0x325044,_0x4311f7=this[_0x4bed7f(0x26f)]();if(this[_0x4bed7f(0x39c)]===_0x4311f7)return;this[_0x4bed7f(0x39c)]=_0x4311f7;this[_0x4bed7f(0x222)]<0xff&&this[_0x4bed7f(0x386)]()&&_0x4311f7!==this['defaultPosition']()&&this['startFade'](0xff);if(_0x4311f7===this[_0x4bed7f(0x38d)]()&&this[_0x4bed7f(0x383)]<=0x0&&this[_0x4bed7f(0x222)]>0x0)this[_0x4bed7f(0x296)](0x0);else this['_fadeDuration']<=0x0&&this[_0x4bed7f(0x222)]<0xff&&this['checkOpacity']();this[_0x4bed7f(0x2b9)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x1e8)]=function(){const _0x485482=_0x325044,_0x4a527e=this[_0x485482(0x319)]();if(!_0x4a527e)return;let _0x5986ef=![];if(this[_0x485482(0x34e)]!==_0x4a527e[_0x485482(0x21d)])_0x5986ef=!![];else this[_0x485482(0x3a7)]!==_0x4a527e[_0x485482(0x1f8)]&&(_0x5986ef=!![]);_0x5986ef&&this[_0x485482(0x2b9)]();},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['calculateTargetPositions']=function(){const _0x38b4c6=_0x325044,_0x55c8ef=Window_STB_TurnOrder[_0x38b4c6(0x219)],_0x338d7d=this['isHorz'](),_0x30ff3f=_0x55c8ef[_0x38b4c6(0x233)],_0x3533db=_0x55c8ef['SubjectDistance'],_0xfb54f9=SceneManager['_scene'][_0x38b4c6(0x364)];if(!_0xfb54f9)return;const _0x15eaee=this['containerPosition']();this[_0x38b4c6(0x307)]=_0x55c8ef[_0x38b4c6(0x350)],this[_0x38b4c6(0x29c)]=_0x338d7d?_0x55c8ef[_0x38b4c6(0x265)]*_0x15eaee:0x0,this[_0x38b4c6(0x2a9)]=_0x338d7d?0x0:_0x55c8ef[_0x38b4c6(0x265)]*_0x15eaee;_0x15eaee>0x0&&(this[_0x38b4c6(0x29c)]+=_0x338d7d?_0x3533db:0x0,this['_positionTargetY']+=_0x338d7d?0x0:_0x3533db);if(_0x30ff3f){if(_0x38b4c6(0x290)===_0x38b4c6(0x2ba))return _0x5f56a5[_0x38b4c6(0x2bc)][_0x38b4c6(0x291)](_0x51d4e8['$1']);else this['_positionTargetX']=_0x338d7d?_0xfb54f9[_0x38b4c6(0x21d)]-this[_0x38b4c6(0x29c)]-_0x55c8ef[_0x38b4c6(0x265)]:0x0;}else _0x38b4c6(0x334)!==_0x38b4c6(0x334)?this['_fadeTarget']=_0x3a2aa7[_0x38b4c6(0x258)]()&&_0x2e2835[_0x38b4c6(0x306)]()?0xff:0x0:this[_0x38b4c6(0x2a9)]=_0x338d7d?0x0:_0xfb54f9['height']-this['_positionTargetY']-_0x55c8ef[_0x38b4c6(0x265)];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['updatePosition']=function(){const _0x815ba2=_0x325044;if(this['_fadeDuration']>0x0)return;if(this[_0x815ba2(0x307)]>0x0){const _0x443062=this[_0x815ba2(0x307)];this['x']=(this['x']*(_0x443062-0x1)+this[_0x815ba2(0x29c)])/_0x443062,this['y']=(this['y']*(_0x443062-0x1)+this[_0x815ba2(0x2a9)])/_0x443062,this[_0x815ba2(0x307)]--;}if(this[_0x815ba2(0x307)]<=0x0){if(_0x815ba2(0x22a)===_0x815ba2(0x22a)){this['x']=this['_positionTargetX'],this['y']=this[_0x815ba2(0x2a9)];if(this['opacity']<0xff&&!this[_0x815ba2(0x385)]&&this['_fadeDuration']<=0x0){if('dbWZP'===_0x815ba2(0x392)){const _0x34633e=this['battler']();if(_0x34633e){if(_0x815ba2(0x345)===_0x815ba2(0x3ac))return _0x4f5104(_0x14ee11['$1']);else this['_fadeTarget']=_0x34633e[_0x815ba2(0x258)]()&&_0x34633e[_0x815ba2(0x306)]()?0xff:0x0;}}else{const _0x169e75=new _0x3ccc6e(_0x1e4e7c,_0x1c4f93);this['_turnOrderInnerSprite']['addChild'](_0x169e75),this[_0x815ba2(0x2de)][_0x815ba2(0x2bd)](_0x169e75);}}}else this[_0x815ba2(0x264)]=this['createTurnOrderSTBGraphicFaceName']();}},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['defaultPosition']=function(){const _0x568e42=_0x325044,_0x12c2dc=Window_STB_TurnOrder['Settings'],_0x219a0f=this[_0x568e42(0x348)]()?_0x12c2dc[_0x568e42(0x3b2)]:_0x12c2dc[_0x568e42(0x279)];return _0x219a0f+0x1;},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x319)]=function(){const _0x5fdf6=_0x325044;return SceneManager['_scene'][_0x5fdf6(0x364)];},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x26f)]=function(){const _0x4fceeb=_0x325044,_0x353ae5=this[_0x4fceeb(0x386)]();if(!_0x353ae5)return this[_0x4fceeb(0x38d)]();if(_0x353ae5===BattleManager['_subject'])return 0x0;if(BattleManager['_actionBattlers'][_0x4fceeb(0x2f1)](_0x353ae5)){const _0x264968=BattleManager[_0x4fceeb(0x331)][_0x4fceeb(0x376)](_0x353ae5)+0x1;return _0x264968;}return this[_0x4fceeb(0x38d)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x325044(0x296)]=function(_0x5d7ab7){const _0x2636d1=_0x325044,_0x38f648=Window_STB_TurnOrder[_0x2636d1(0x219)];this[_0x2636d1(0x383)]=_0x38f648[_0x2636d1(0x350)],this[_0x2636d1(0x254)]=_0x5d7ab7;},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x353)]=function(){const _0x323297=_0x325044,_0x1a26bd=this[_0x323297(0x386)]();if(!_0x1a26bd)return;if(this[_0x323297(0x282)]===_0x1a26bd['isAlive']()&&this[_0x323297(0x24e)]===_0x1a26bd[_0x323297(0x306)]())return;this[_0x323297(0x282)]=_0x1a26bd['isAlive'](),this['_isAppeared']=_0x1a26bd[_0x323297(0x306)]();let _0x13310c=this[_0x323297(0x282)]&&this[_0x323297(0x24e)]?0xff:0x0;this['startFade'](_0x13310c);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x200)]=function(){const _0x293155=_0x325044;if(this[_0x293155(0x383)]>0x0){if(_0x293155(0x269)===_0x293155(0x269)){const _0x16c720=this[_0x293155(0x383)];this[_0x293155(0x222)]=(this[_0x293155(0x222)]*(_0x16c720-0x1)+this[_0x293155(0x254)])/_0x16c720,this[_0x293155(0x383)]--,this[_0x293155(0x383)]<=0x0&&(this[_0x293155(0x2eb)](),this[_0x293155(0x307)]=0x0,this[_0x293155(0x25f)](),this[_0x293155(0x222)]=this['_fadeTarget']);}else _0x2fa64['BattleSystemSTB'][_0x293155(0x1f2)]['call'](this),this[_0x293155(0x362)]();}if(this[_0x293155(0x385)])return;BattleManager[_0x293155(0x2d5)]===_0x293155(0x21f)&&(this[_0x293155(0x385)]=!![],this[_0x293155(0x296)](0x0));},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x1f1)]=function(){const _0x4a9df9=_0x325044,_0x5ccad6=this['battler']();if(!_0x5ccad6)return;const _0x55b71f=Window_STB_TurnOrder[_0x4a9df9(0x219)],_0x1eb31d=this[_0x4a9df9(0x317)]===$gameParty?_0x4a9df9(0x3c0):_0x4a9df9(0x238);let _0x154f03=_0x5ccad6['TurnOrderSTBGraphicType']();if(_0x5ccad6[_0x4a9df9(0x1ee)]()&&_0x154f03==='enemy')_0x154f03=_0x4a9df9(0x36d);else{if(_0x5ccad6[_0x4a9df9(0x2cc)]()&&_0x154f03===_0x4a9df9(0x336)){if('xcssS'!=='xfBsG')_0x154f03=_0x4a9df9(0x2d0);else{_0x2a0c81=(_0x4a56e7(_0x1d2322)||'')[_0x4a9df9(0x365)]();const _0x5e1e06=/^\d+$/[_0x4a9df9(0x318)](_0x4f3cfc);_0x5e1e06?_0xc9d815[_0x4a9df9(0x2bd)](_0x1119bb(_0x46ff19)):_0x3d460e['push'](_0x309041[_0x4a9df9(0x36f)](_0x4bf9a6));}}}if(this['_graphicType']!==_0x154f03)return this[_0x4a9df9(0x2e2)]();switch(this[_0x4a9df9(0x26c)]){case _0x4a9df9(0x36d):if(this[_0x4a9df9(0x1eb)]!==_0x5ccad6[_0x4a9df9(0x2c7)]())return _0x4a9df9(0x30e)!==_0x4a9df9(0x31b)?this[_0x4a9df9(0x2e2)]():this[_0x4a9df9(0x2e2)]();if(this[_0x4a9df9(0x324)]!==_0x5ccad6[_0x4a9df9(0x232)]())return this[_0x4a9df9(0x2e2)]();break;case'icon':if(this[_0x4a9df9(0x28d)]!==_0x5ccad6[_0x4a9df9(0x379)]())return this[_0x4a9df9(0x2e2)]();break;case _0x4a9df9(0x2d0):if(_0x5ccad6[_0x4a9df9(0x32a)]()){if(this[_0x4a9df9(0x35a)]!==_0x5ccad6[_0x4a9df9(0x295)]())return this['processUpdateGraphic']();}else{if(this[_0x4a9df9(0x314)]!==_0x5ccad6[_0x4a9df9(0x332)]())return this[_0x4a9df9(0x2e2)]();}break;case _0x4a9df9(0x336):if(_0x5ccad6[_0x4a9df9(0x1ee)]()){if(this[_0x4a9df9(0x35a)]!==_0x5ccad6[_0x4a9df9(0x332)]())return this[_0x4a9df9(0x2e2)]();}else{if(this['_graphicEnemy']!==_0x5ccad6[_0x4a9df9(0x332)]()){if(_0x4a9df9(0x358)!==_0x4a9df9(0x358)){const _0x5f45b6=this['containerPosition']();if(this[_0x4a9df9(0x39c)]===_0x5f45b6)return;this['_position']=_0x5f45b6;this[_0x4a9df9(0x222)]<0xff&&this['battler']()&&_0x5f45b6!==this['defaultPosition']()&&this[_0x4a9df9(0x296)](0xff);if(_0x5f45b6===this[_0x4a9df9(0x38d)]()&&this[_0x4a9df9(0x383)]<=0x0&&this[_0x4a9df9(0x222)]>0x0)this[_0x4a9df9(0x296)](0x0);else this['_fadeDuration']<=0x0&&this['opacity']<0xff&&this[_0x4a9df9(0x353)]();this[_0x4a9df9(0x2b9)]();}else return this['processUpdateGraphic']();}}break;}},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x2e2)]=function(){const _0x39c80=_0x325044,_0x43c5af=this['battler']();if(!_0x43c5af)return;this[_0x39c80(0x26c)]=_0x43c5af['TurnOrderSTBGraphicType']();if(_0x43c5af[_0x39c80(0x1ee)]()&&this[_0x39c80(0x26c)]===_0x39c80(0x2d0)){if(_0x39c80(0x339)!==_0x39c80(0x26d))this[_0x39c80(0x26c)]=_0x39c80(0x36d);else{this['x']=this[_0x39c80(0x29c)],this['y']=this[_0x39c80(0x2a9)];if(this['opacity']<0xff&&!this['_isBattleOver']&&this['_fadeDuration']<=0x0){const _0x42f041=this[_0x39c80(0x386)]();_0x42f041&&(this['_fadeTarget']=_0x42f041[_0x39c80(0x258)]()&&_0x42f041[_0x39c80(0x306)]()?0xff:0x0);}}}else _0x43c5af['isEnemy']()&&this[_0x39c80(0x26c)]==='svactor'&&(this[_0x39c80(0x26c)]=_0x39c80(0x2d0));let _0x3795cc;switch(this[_0x39c80(0x26c)]){case _0x39c80(0x36d):this[_0x39c80(0x1eb)]=_0x43c5af['TurnOrderSTBGraphicFaceName'](),this[_0x39c80(0x324)]=_0x43c5af['TurnOrderSTBGraphicFaceIndex'](),_0x3795cc=ImageManager[_0x39c80(0x1f0)](this[_0x39c80(0x1eb)]),_0x3795cc[_0x39c80(0x2df)](this['changeFaceGraphicBitmap'][_0x39c80(0x210)](this,_0x3795cc));break;case _0x39c80(0x209):this[_0x39c80(0x28d)]=_0x43c5af['createTurnOrderSTBGraphicIconIndex'](),_0x3795cc=ImageManager['loadSystem'](_0x39c80(0x214)),_0x3795cc[_0x39c80(0x2df)](this[_0x39c80(0x301)][_0x39c80(0x210)](this,_0x3795cc));break;case _0x39c80(0x2d0):if(_0x43c5af[_0x39c80(0x32a)]())_0x39c80(0x343)!==_0x39c80(0x343)?this[_0x39c80(0x300)]():(this[_0x39c80(0x35a)]=_0x43c5af[_0x39c80(0x295)](),_0x3795cc=ImageManager[_0x39c80(0x23e)](this[_0x39c80(0x35a)]),_0x3795cc['addLoadListener'](this[_0x39c80(0x274)][_0x39c80(0x210)](this,_0x3795cc)));else $gameSystem[_0x39c80(0x202)]()?_0x39c80(0x2f3)!=='gkqyB'?(this[_0x39c80(0x2b2)](),this['createBackgroundSprite'](),this['createGraphicSprite'](),this['createBorderSprite'](),this['createLetterSprite']()):(this[_0x39c80(0x314)]=_0x43c5af[_0x39c80(0x332)](),_0x3795cc=ImageManager[_0x39c80(0x249)](this[_0x39c80(0x314)]),_0x3795cc[_0x39c80(0x2df)](this['changeEnemyGraphicBitmap'][_0x39c80(0x210)](this,_0x3795cc))):(this[_0x39c80(0x314)]=_0x43c5af[_0x39c80(0x332)](),_0x3795cc=ImageManager[_0x39c80(0x354)](this['_graphicEnemy']),_0x3795cc[_0x39c80(0x2df)](this['changeEnemyGraphicBitmap'][_0x39c80(0x210)](this,_0x3795cc)));break;case _0x39c80(0x336):this[_0x39c80(0x35a)]=_0x43c5af[_0x39c80(0x332)](),_0x3795cc=ImageManager['loadSvActor'](this[_0x39c80(0x35a)]),_0x3795cc[_0x39c80(0x2df)](this[_0x39c80(0x274)][_0x39c80(0x210)](this,_0x3795cc));break;}},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)]['changeFaceGraphicBitmap']=function(_0xfa9d59){const _0x23edea=_0x325044,_0x2c65a1=this[_0x23edea(0x324)],_0x336c85=this[_0x23edea(0x369)](),_0x414852=this[_0x23edea(0x28f)](),_0x2e7a3e=Math['max'](_0x336c85,_0x414852);this[_0x23edea(0x1e7)][_0x23edea(0x2d8)]=new Bitmap(_0x336c85,_0x414852);const _0x21e7a6=this['_graphicSprite'][_0x23edea(0x2d8)],_0x3ee151=ImageManager[_0x23edea(0x1f9)],_0x35750d=ImageManager[_0x23edea(0x293)],_0x3300e5=_0x2e7a3e/Math[_0x23edea(0x32d)](_0x3ee151,_0x35750d),_0x5297f9=ImageManager[_0x23edea(0x1f9)],_0x4a4628=ImageManager[_0x23edea(0x293)],_0x48f25a=_0x2c65a1%0x4*_0x3ee151+(_0x3ee151-_0x5297f9)/0x2,_0x366833=Math['floor'](_0x2c65a1/0x4)*_0x35750d+(_0x35750d-_0x4a4628)/0x2,_0xbff56b=(_0x336c85-_0x3ee151*_0x3300e5)/0x2,_0x5061f9=(_0x414852-_0x35750d*_0x3300e5)/0x2;_0x21e7a6[_0x23edea(0x2d4)](_0xfa9d59,_0x48f25a,_0x366833,_0x5297f9,_0x4a4628,_0xbff56b,_0x5061f9,_0x2e7a3e,_0x2e7a3e);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x301)]=function(_0x5bff0f){const _0x1c2722=_0x325044,_0x273bc9=this['_graphicIconIndex'],_0x1a3bdd=this[_0x1c2722(0x369)](),_0x16ef42=this['bitmapHeight']();this[_0x1c2722(0x1e7)][_0x1c2722(0x2d8)]=new Bitmap(_0x1a3bdd,_0x16ef42);const _0xe79c40=this[_0x1c2722(0x1e7)][_0x1c2722(0x2d8)],_0x5f42b3=ImageManager[_0x1c2722(0x213)],_0x3b5900=ImageManager[_0x1c2722(0x211)],_0x30c48c=Math[_0x1c2722(0x2da)](_0x5f42b3,_0x3b5900,_0x1a3bdd,_0x16ef42),_0x3dfb16=_0x273bc9%0x10*_0x5f42b3,_0xa69745=Math[_0x1c2722(0x2ee)](_0x273bc9/0x10)*_0x3b5900,_0x5d44fe=Math['floor'](Math[_0x1c2722(0x32d)](_0x1a3bdd-_0x30c48c,0x0)/0x2),_0xc37d98=Math[_0x1c2722(0x2ee)](Math[_0x1c2722(0x32d)](_0x16ef42-_0x30c48c,0x0)/0x2);_0xe79c40[_0x1c2722(0x2d4)](_0x5bff0f,_0x3dfb16,_0xa69745,_0x5f42b3,_0x3b5900,_0x5d44fe,_0xc37d98,_0x30c48c,_0x30c48c);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x274)]=function(_0x387834){const _0x5a9d81=_0x325044,_0x160496=this['bitmapWidth'](),_0x1aa496=this['bitmapHeight'](),_0xdaed8=Math['min'](_0x160496,_0x1aa496);this['_graphicSprite'][_0x5a9d81(0x2d8)]=new Bitmap(_0x160496,_0x1aa496);const _0x1a122c=this[_0x5a9d81(0x1e7)]['bitmap'],_0x1aa169=0x9,_0x538b05=0x6,_0x1f645d=_0x387834[_0x5a9d81(0x21d)]/_0x1aa169,_0x19bcbc=_0x387834[_0x5a9d81(0x1f8)]/_0x538b05,_0x40115d=Math[_0x5a9d81(0x2da)](0x1,_0xdaed8/_0x1f645d,_0xdaed8/_0x19bcbc),_0x4c67ff=_0x1f645d*_0x40115d,_0x548705=_0x19bcbc*_0x40115d,_0x72ab67=Math['round']((_0x160496-_0x4c67ff)/0x2),_0x262710=Math[_0x5a9d81(0x2ff)]((_0x1aa496-_0x548705)/0x2);_0x1a122c[_0x5a9d81(0x2d4)](_0x387834,0x0,0x0,_0x1f645d,_0x19bcbc,_0x72ab67,_0x262710,_0x4c67ff,_0x548705);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x309)]=function(_0x54244d){const _0x316689=_0x325044,_0x442f0a=Window_STB_TurnOrder['Settings'],_0x5ba599=this[_0x316689(0x369)](),_0x41bf47=this[_0x316689(0x28f)](),_0x2fff79=Math[_0x316689(0x2da)](_0x5ba599,_0x41bf47);this[_0x316689(0x1e7)][_0x316689(0x2d8)]=new Bitmap(_0x5ba599,_0x41bf47);const _0x54067a=this['_graphicSprite'][_0x316689(0x2d8)],_0x4614e8=Math[_0x316689(0x2da)](0x1,_0x2fff79/_0x54244d[_0x316689(0x21d)],_0x2fff79/_0x54244d[_0x316689(0x1f8)]),_0x2a74c5=_0x54244d[_0x316689(0x21d)]*_0x4614e8,_0xb8eb97=_0x54244d['height']*_0x4614e8,_0x30fae2=Math[_0x316689(0x2ff)]((_0x5ba599-_0x2a74c5)/0x2),_0x1bd659=Math[_0x316689(0x2ff)]((_0x41bf47-_0xb8eb97)/0x2);_0x54067a[_0x316689(0x2d4)](_0x54244d,0x0,0x0,_0x54244d[_0x316689(0x21d)],_0x54244d[_0x316689(0x1f8)],_0x30fae2,_0x1bd659,_0x2a74c5,_0xb8eb97);},Sprite_STB_TurnOrder_Battler['prototype']['updateGraphicHue']=function(){const _0x449427=_0x325044,_0x31c5e9=this[_0x449427(0x386)]();if(!_0x31c5e9)return;if(!_0x31c5e9[_0x449427(0x2cc)]())return;if(this[_0x449427(0x2e1)]===_0x31c5e9[_0x449427(0x281)]())return;this[_0x449427(0x2e1)]=_0x31c5e9['battlerHue']();if(_0x31c5e9[_0x449427(0x32a)]())this[_0x449427(0x2e1)]=0x0;this[_0x449427(0x1e7)][_0x449427(0x216)](this[_0x449427(0x2e1)]);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x2a8)]=function(){const _0x420de0=_0x325044;if(!this[_0x420de0(0x203)])return;const _0x32ab69=this[_0x420de0(0x386)]();if(!_0x32ab69)return;if(this['_letter']===_0x32ab69[_0x420de0(0x393)]&&this[_0x420de0(0x20e)]===_0x32ab69[_0x420de0(0x20e)])return;this['_letter']=_0x32ab69['_letter'],this[_0x420de0(0x20e)]=_0x32ab69[_0x420de0(0x20e)];const _0x3d38ee=Window_STB_TurnOrder[_0x420de0(0x219)],_0xcd0c15=this['isHorz'](),_0x2af737=this[_0x420de0(0x369)](),_0x370c62=this[_0x420de0(0x28f)](),_0x33b145=this[_0x420de0(0x203)][_0x420de0(0x2d8)];_0x33b145[_0x420de0(0x23a)]();if(!this['_plural'])return;_0x33b145['fontFace']=_0x3d38ee[_0x420de0(0x267)]||$gameSystem[_0x420de0(0x276)](),_0x33b145['fontSize']=_0x3d38ee[_0x420de0(0x322)]||0x10;if(_0xcd0c15)'Orbye'!=='ZuKds'?_0x33b145['drawText'](this[_0x420de0(0x393)][_0x420de0(0x365)](),0x0,_0x370c62/0x2,_0x2af737,_0x370c62/0x2,_0x420de0(0x25c)):(this['removeActionBattlersSTB'](),this[_0x420de0(0x24b)](),this[_0x420de0(0x1fe)]());else{if('lossz'!==_0x420de0(0x396))_0x33b145[_0x420de0(0x37c)](this[_0x420de0(0x393)][_0x420de0(0x365)](),0x0,0x2,_0x2af737-0x8,_0x370c62-0x4,_0x420de0(0x23c));else{if(!_0x496e4a[_0x420de0(0x3bb)]())return;this[_0x420de0(0x364)]=new _0x5dd61e();const _0x44fdf8=this[_0x420de0(0x33c)](this['_windowLayer']);this['addChildAt'](this['_stbTurnOrderWindow'],_0x44fdf8),this['repositionLogWindowSTB'](),_0x50e7c2['updateTurnOrderSTB'](!![]);}}},Sprite_STB_TurnOrder_Battler['prototype']['updateSelectionEffect']=function(){const _0xb33676=_0x325044,_0x4108b7=this['battler']();if(!_0x4108b7)return;const _0x2d177c=_0x4108b7[_0xb33676(0x386)]();if(!_0x2d177c)return;const _0x4c84ab=_0x2d177c[_0xb33676(0x2d6)]();if(!_0x4c84ab)return;this[_0xb33676(0x320)](_0x4c84ab[_0xb33676(0x1e1)]);},Sprite_STB_TurnOrder_Battler[_0x325044(0x27e)][_0x325044(0x1e5)]=function(){const _0x51daa6=_0x325044;return this[_0x51daa6(0x386)]();},VisuMZ['BattleSystemSTB'][_0x325044(0x2a3)]=Window_Help['prototype']['setItem'],Window_Help[_0x325044(0x27e)]['setItem']=function(_0x2769ca){const _0x4b6465=_0x325044;BattleManager[_0x4b6465(0x3bb)]()&&_0x2769ca&&_0x2769ca[_0x4b6465(0x20f)]&&_0x2769ca['note'][_0x4b6465(0x355)](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x4b6465(0x2bc)]['Window_Help_setItem']['call'](this,_0x2769ca);};function Window_STB_TurnOrder(){const _0x587c8f=_0x325044;this[_0x587c8f(0x34f)](...arguments);}function _0x7da3(){const _0x16bb81=['clearRect','_graphicHue','processUpdateGraphic','filter','commandCancelSTB','BattleManager_makeActionOrders','_logWindow','RegExp','AnimationID','battleSys','createLetterSprite','checkPosition','isActiveTpb','683710AutwvD','floor','isBattleSystemSTBTurnOrderVisible','SpriteLength','includes','appear','gkqyB','_surprise','_statusWindow','return\x200','create','_index','%1BorderColor','hDVPH','_homeDuration','numActions','status','Actors','round','processTurnSTB','changeIconGraphicBitmap','SwdVH','bottom','unshift','actor','isAppeared','_positionDuration','mBbxp','changeEnemyGraphicBitmap','members','stbCannotBeExploited','requestFauxAnimation','hSorv','YoTaF','Game_Action_executeDamage','vuIrb','makeSTBSpeed','eoUjo','Exploit','_graphicEnemy','7635000HLrcXn','setSTBExploitedFlag','_unit','test','containerWindow','NAhQP','EHVSN','ShowMarkerBg','vsActorsFullExploit','getNextSubject','Game_BattlerBase_hide','setBlendColor','Exploited','EnemyBattlerFontSize','RepositionTopForHelp','_graphicFaceIndex','clearSTBExploit','JSON','Speed','Game_Battler_performCollapse','isActionValid','hasSvBattler','Mechanics','remove','max','traitObjects','FUNC','_stbTurnOrderVisible','_actionBattlers','battlerName','_targetHomeY','fZExG','STRUCT','svactor','TurnOrder','Game_Actor_selectNextCommand','fJevv','performActionEndSTB','children','getChildIndex','_backgroundSprite','rOZXx','ExploiterStates','uLFcK','SEkMi','jtHpN','tGUbI','parameters','LHzyf','Exploiter','CenterHorz','isHorz','Game_System_initialize','Game_Party_removeActor','processTurn','anchor','PopupText','_containerWidth','initialize','UpdateFrames','performCollapse','setupTextPopup','checkOpacity','loadEnemy','match','BorderThickness','ARRAYJSON','vVdXX','version','_graphicSv','Visible','Mirror','NUM','hide','IzCdg','stbGainInstant','isSceneBattle','createSTBTurnOrderWindow','actions','_stbTurnOrderWindow','trim','_stbExploitAdvantageFlag','laMKP','name','bitmapWidth','length','wkNuG','RepositionTopHelpY','face','_forceAction','getStateIdWithName','_stbTurnOrderGraphicType','FlashDuration','TurnResetExploits','parse','FaceName','faceIndex','indexOf','createActorCommandWindow','aadIB','TurnOrderSTBGraphicIconIndex','updateBattleContainerOrder','registerCommand','drawText','areAllEnemiesExploited','WKrCj','48AOMDty','_windowLayer','speed','createBattlerSprites','_fadeDuration','ARRAYEVAL','_isBattleOver','battler','TextColor','UnlimitedExploits','clearTurnOrderSTBGraphics','removeActor','update','fillRect','defaultPosition','call','ExploitedStates','sort','endAction','dbWZP','_letter','gradientFillRect','displayExploitedEffects','DkNJu','BjNQB','Scene_Battle_commandFight','getColor','CFcny','createTurnOrderSTBGraphicIconIndex','_position','top','xhkTT','startActorCommandSelection','compareBattlerSprites','executeDamageSTB','faceName','131832CiWdzx','close','Game_Action_speed','_subject','_containerHeight','addSTBNextTurnSpeed','DisplayPosition','6qAvWsE','createBattlerRect','AFABV','setSTBNextTurnSpeed','StbTurnOrderEnemyIcon','DisplayOffsetX','EnemyBattlerFaceIndex','_scene','MaxHorzSprites','createBackgroundSprite','visible','%1BgColor1','onTurnEnd','_fullHeight','areAllActorsExploited','RepositionLogWindow','BattleManager_isTpb','isSTB','EVAL','createTestBitmap','Amgfw','CannotBeExploited','Actor','stepForward','TurnOrderSTBGraphicType','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','fCTam','_blendColor','fGEAW','map','SystemTurnOrderVisibility','getStateTooltipBattler','isSTBExploited','_graphicSprite','checkTargetPositions','_inputting','MultipleExploits','_graphicFaceName','executeDamage','%1\x20%2\x20%3','isActor','STR','loadFace','updateGraphic','Scene_Battle_createAllWindows','updateHomePosition','BBvEa','getBattleSystem','_ogWindowLayerY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','height','faceWidth','createChildren','sAVxs','_stbTurnOrderFaceIndex','_handlers','clearNextTurnSpeedSTB','GBBsb','updateOpacity','_stateIDs','isSideView','_letterSprite','oppSc','SubjectDistance','createTurnOrderSTBGraphicFaceName','initMembersBattleSystemSTB','BattleManager_selectNextActor','icon','isTpb','AddedStates','ScreenBuffer','updateTurnOrder','_plural','note','bind','iconHeight','153ZapnRQ','iconWidth','IconSet','_stbExploited','setHue','XRBaS','BattleManager_endAction','Settings','stbCannotBeExploiter','removeActionBattlersSTB','270382pQWDqR','width','%1BgColor2','battleEnd','FlashColor','initMembers','opacity','EnemyBattlerIcon','Ogtvf','kddVK','_homeY','initBattleSystemSTB','Instant','finishActorInput','igIgf','Llowi','updatePadding','isSTBExploitSystemEnabled','Peozf','BattleManager_finishActorInput','ShowMarkerBorder','windowRect','TurnOrderSTBGraphicFaceIndex','OrderDirection','_forcedBattlers','NextTurnSavedSpeedJS','setSTBGraphicIconIndex','selectAllActions','Enemy','ARRAYSTRUCT','clear','ConvertParams','right','Game_Battler_onTurnEnd','loadSvActor','_fullWidth','applyGlobalBattleSystemSTB','_turnOrderInnerSprite','STB','addState','startInput','_targetHomeX','createAllWindows','Scene_Battle_createActorCommandWindow','BattleManager_isTurnBased','loadSvEnemy','exit','updateTurnOrderSTB','_helpWindow','LWWWE','_isAppeared','257772RjuaDl','isTurnBased','loadSystem','vsEnemiesFullExploit','ExploitEleWeakness','_fadeTarget','stbExploiterStates','yLNCk','updateSelectionEffect','isAlive','endActionSTB','makeSpeed','pqauw','center','some','createGraphicSprite','updatePosition','constructor','rUvMG','EnemyBattlerFaceName','item','_stbTurnOrderFaceName','SpriteThin','AsqMt','EnemyBattlerFontFace','split','tVdtw','FaceIndex','190827mxhsOX','_graphicType','UmBhD','_currentActor','containerPosition','Game_Battler_performActionEnd','setSTBExploited','selectNextActorSTB','IconIndex','changeSvActorGraphicBitmap','hRZbm','mainFontFace','createBorderSprite','BattleManager_processTurn','MaxVertSprites','_stbTurnOrderIconIndex','Game_Battler_makeSpeed','_homeX','canMove','prototype','HRiYO','canInput','battlerHue','_isAlive','padding','BattleManager_isActiveTpb','calcElementRate','applyGlobal','left','Game_Action_applyGlobal','updateVisibility','ghpYB','#000000','EnemyBattlerType','_graphicIconIndex','cBLqh','bitmapHeight','JeqWU','ParseStateData','Enemies','faceHeight','Game_BattlerBase_appear','svBattlerName','startFade','addChild','CustomJS','getSTBNextTurnSpeed','Scene_Battle_commandCancel','startInputSTB','_positionTargetX','Game_BattlerBase_initMembers','initHomePositions','selectNextCommand','Game_Action_clear','dvyMk','BattleManager_battleSys','Window_Help_setItem','addChildAt','toUpperCase','makeActionOrders','_ogWindowLayerX','updateLetter','_positionTargetY','setBattleSystemSTBTurnOrderVisible','maxBattleMembers','currentClass','StbTurnOrderClearEnemyGraphic','onBattleStartSTB','clearSTBNextTurnSpeed','createTurnOrderSTBGraphicType','cancel','createInitialPositions','createTurnOrderSTBGraphicFaceIndex','becomeSTBExploited','qQfdO','tLubJ','createActorCommandWindowSTB','recalculateHome','calculateTargetPositions','yKlYW','BattleManager_startInput','BattleSystemSTB','push','critical','ExtraActions','subject','performActionEnd','reserveCommonEvent','_stbNextTurnSpeed','commandCancel','ARRAYFUNC','aliveMembers','TurnOrderSTBGraphicFaceName','stbExploitedStates','Game_Battler_onBattleStart','ceil','startActorInput','isEnemy','onBattleStart','296888BAMZoI','performSTBExploiter','enemy','selectNextActor','CannotBeExploiter','friendsUnit','blt','_phase','mainSprite','clearSTB','bitmap','description','min','format','_actions','hasSTBExploited','_turnOrderContainer','addLoadListener'];_0x7da3=function(){return _0x16bb81;};return _0x7da3();}Window_STB_TurnOrder[_0x325044(0x27e)]=Object[_0x325044(0x2f7)](Window_Base['prototype']),Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x260)]=Window_STB_TurnOrder,Window_STB_TurnOrder['Settings']=VisuMZ[_0x325044(0x2bc)][_0x325044(0x219)][_0x325044(0x337)],Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x34f)]=function(){const _0x2eb2d3=_0x325044,_0x30e25e=this[_0x2eb2d3(0x231)]();this['initHomePositions'](_0x30e25e),Window_Base[_0x2eb2d3(0x27e)][_0x2eb2d3(0x34f)][_0x2eb2d3(0x38e)](this,_0x30e25e),this[_0x2eb2d3(0x382)](),this[_0x2eb2d3(0x289)](),this[_0x2eb2d3(0x222)]=0x0;},Window_STB_TurnOrder['prototype'][_0x325044(0x231)]=function(){const _0x3aef2b=_0x325044;return this[_0x3aef2b(0x3ab)]($gameParty[_0x3aef2b(0x2ab)](),0x9,!![]);},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x29e)]=function(_0x1b19c7){const _0x200730=_0x325044;this[_0x200730(0x245)]=this[_0x200730(0x27c)]=_0x1b19c7['x'],this[_0x200730(0x333)]=this[_0x200730(0x226)]=_0x1b19c7['y'],this[_0x200730(0x23f)]=_0x1b19c7[_0x200730(0x21d)],this[_0x200730(0x3b7)]=_0x1b19c7[_0x200730(0x1f8)],this[_0x200730(0x2fb)]=0x0;},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x3ab)]=function(_0xdd3587,_0x489798,_0x478054){const _0x27c663=_0x325044,_0x17dd04=Window_STB_TurnOrder[_0x27c663(0x219)],_0x18224f=this['isHorz']()?_0x17dd04['MaxHorzSprites']:_0x17dd04[_0x27c663(0x279)],_0x3b01f3=Math[_0x27c663(0x2da)](_0x18224f,_0xdd3587+_0x489798),_0x45cb2b=SceneManager[_0x27c663(0x3b1)][_0x27c663(0x2f5)][_0x27c663(0x1f8)],_0x3d0d0b=SceneManager[_0x27c663(0x3b1)][_0x27c663(0x24c)][_0x27c663(0x1f8)],_0x3611a4=_0x17dd04[_0x27c663(0x205)],_0x515e17=Graphics[_0x27c663(0x1f8)]-_0x45cb2b-_0x3d0d0b;let _0x59fc76=0x0,_0x1faa7c=0x0,_0x264e1f=0x0,_0x75691d=0x0;switch(_0x17dd04[_0x27c663(0x3a9)]){case _0x27c663(0x39d):_0x59fc76=_0x17dd04[_0x27c663(0x265)]*_0x3b01f3+_0x3611a4,_0x1faa7c=_0x17dd04['SpriteLength'],_0x264e1f=Math['ceil']((Graphics['width']-_0x59fc76)/0x2),_0x75691d=_0x17dd04[_0x27c663(0x20c)];break;case'bottom':_0x59fc76=_0x17dd04[_0x27c663(0x265)]*_0x3b01f3+_0x3611a4,_0x1faa7c=_0x17dd04[_0x27c663(0x2f0)],_0x264e1f=Math[_0x27c663(0x2ca)]((Graphics['width']-_0x59fc76)/0x2),_0x75691d=Graphics[_0x27c663(0x1f8)]-_0x45cb2b-_0x1faa7c-_0x17dd04['ScreenBuffer'];break;case _0x27c663(0x287):_0x59fc76=_0x17dd04[_0x27c663(0x2f0)],_0x1faa7c=_0x17dd04[_0x27c663(0x265)]*_0x3b01f3+_0x3611a4,_0x264e1f=_0x17dd04[_0x27c663(0x20c)],_0x75691d=Math[_0x27c663(0x2ca)]((_0x515e17-_0x1faa7c)/0x2),_0x75691d+=_0x3d0d0b;break;case _0x27c663(0x23c):_0x59fc76=_0x17dd04[_0x27c663(0x2f0)],_0x1faa7c=_0x17dd04['SpriteThin']*_0x3b01f3+_0x3611a4,_0x264e1f=Graphics[_0x27c663(0x21d)]-_0x59fc76-_0x17dd04['ScreenBuffer'],_0x75691d=Math[_0x27c663(0x2ca)]((_0x515e17-_0x1faa7c)/0x2),_0x75691d+=_0x3d0d0b;break;}if(!_0x478054){if('wxIpw'!=='yNGdZ'){const _0x5e1912=Window_STB_TurnOrder['Settings'][_0x27c663(0x233)];let _0x4a5929=Math[_0x27c663(0x2da)](_0x18224f,Math[_0x27c663(0x2da)]($gameParty[_0x27c663(0x2ab)]()+0x8)-_0x3b01f3);switch(_0x17dd04[_0x27c663(0x3a9)]){case'top':case _0x27c663(0x303):_0x5e1912&&(_0x264e1f-=_0x4a5929*_0x17dd04['SpriteThin']);break;}}else{const _0x5b7fc4=_0x50bb14['vsEnemiesFullExploit'];_0x5b7fc4>0x0&&_0x45d2c6[_0x5b7fc4]&&_0x3d838f['reserveCommonEvent'](_0x5b7fc4);}}return _0x264e1f+=_0x17dd04[_0x27c663(0x3af)],_0x75691d+=_0x17dd04['DisplayOffsetY'],new Rectangle(_0x264e1f,_0x75691d,_0x59fc76,_0x1faa7c);},Window_STB_TurnOrder['prototype'][_0x325044(0x22c)]=function(){const _0x217a52=_0x325044;this[_0x217a52(0x283)]=0x0;},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x348)]=function(){const _0x490faf=_0x325044,_0xf2c4f=Window_STB_TurnOrder[_0x490faf(0x219)],_0x2b3986=['top',_0x490faf(0x303)][_0x490faf(0x2f1)](_0xf2c4f[_0x490faf(0x3a9)]);return _0x2b3986;},Window_STB_TurnOrder['prototype']['createBattlerSprites']=function(){const _0x1e3824=_0x325044;this[_0x1e3824(0x241)]=new Sprite(),this['addInnerChild'](this[_0x1e3824(0x241)]),this[_0x1e3824(0x2de)]=[];for(let _0xd95651=0x0;_0xd95651<$gameParty[_0x1e3824(0x2ab)]();_0xd95651++){if('wxlTA'===_0x1e3824(0x3be))_0x171bb8=!![];else{const _0x44ca2=new Sprite_STB_TurnOrder_Battler($gameParty,_0xd95651);this[_0x1e3824(0x241)][_0x1e3824(0x297)](_0x44ca2),this[_0x1e3824(0x2de)]['push'](_0x44ca2);}}for(let _0x46438d=0x0;_0x46438d<0x8;_0x46438d++){const _0xf2e993=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x46438d);this[_0x1e3824(0x241)]['addChild'](_0xf2e993),this['_turnOrderContainer'][_0x1e3824(0x2bd)](_0xf2e993);}},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x38b)]=function(){const _0xf1677f=_0x325044;Window_Base['prototype'][_0xf1677f(0x38b)][_0xf1677f(0x38e)](this),this[_0xf1677f(0x1f3)](),this[_0xf1677f(0x25f)](),this['updateSidePosition'](),this[_0xf1677f(0x37a)](),this['updateVisibility']();},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x1f3)]=function(){const _0x40517a=_0x325044;if(this[_0x40517a(0x2fb)]>0x0){const _0x2b803d=this[_0x40517a(0x2fb)];this[_0x40517a(0x27c)]=(this[_0x40517a(0x27c)]*(_0x2b803d-0x1)+this['_targetHomeX'])/_0x2b803d,this[_0x40517a(0x226)]=(this['_homeY']*(_0x2b803d-0x1)+this['_targetHomeY'])/_0x2b803d,this[_0x40517a(0x2fb)]--,this[_0x40517a(0x2fb)]<=0x0&&(this[_0x40517a(0x27c)]=this[_0x40517a(0x245)],this[_0x40517a(0x226)]=this[_0x40517a(0x333)]);}},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x25f)]=function(){const _0xdd6a14=_0x325044,_0x32350a=Window_STB_TurnOrder[_0xdd6a14(0x219)];if(_0x32350a[_0xdd6a14(0x3a9)]!=='top')return;if(!_0x32350a[_0xdd6a14(0x323)])return;const _0x3a0a0e=SceneManager[_0xdd6a14(0x3b1)][_0xdd6a14(0x24c)];if(!_0x3a0a0e)return;_0x3a0a0e[_0xdd6a14(0x3b4)]?'oJvaA'===_0xdd6a14(0x1e0)?this[_0xdd6a14(0x366)]=![]:(this['x']=this[_0xdd6a14(0x27c)]+(_0x32350a['RepositionTopHelpX']||0x0),this['y']=this[_0xdd6a14(0x226)]+(_0x32350a[_0xdd6a14(0x36c)]||0x0)):(this['x']=this['_homeX'],this['y']=this['_homeY']);const _0x5c4482=SceneManager['_scene']['_windowLayer'];if(Window_STB_TurnOrder[_0xdd6a14(0x2a7)]===undefined){if(_0xdd6a14(0x28e)===_0xdd6a14(0x28e))Window_STB_TurnOrder[_0xdd6a14(0x2a7)]=Math[_0xdd6a14(0x2ff)]((Graphics[_0xdd6a14(0x21d)]-Math['min'](Graphics['boxWidth'],_0x5c4482['width']))/0x2),Window_STB_TurnOrder[_0xdd6a14(0x1f6)]=Math[_0xdd6a14(0x2ff)]((Graphics['height']-Math['min'](Graphics['boxHeight'],_0x5c4482[_0xdd6a14(0x1f8)]))/0x2);else{const _0x2d44fc=this['battler']();if(!_0x2d44fc)return this['defaultPosition']();if(_0x2d44fc===_0xde10f7[_0xdd6a14(0x3a6)])return 0x0;if(_0x5295f3[_0xdd6a14(0x331)][_0xdd6a14(0x2f1)](_0x2d44fc)){const _0x28b79a=_0x13d609['_actionBattlers']['indexOf'](_0x2d44fc)+0x1;return _0x28b79a;}return this[_0xdd6a14(0x38d)]();}}this['x']+=_0x5c4482['x']-Window_STB_TurnOrder[_0xdd6a14(0x2a7)],this['y']+=_0x5c4482['y']-Window_STB_TurnOrder['_ogWindowLayerY'];},Window_STB_TurnOrder[_0x325044(0x27e)]['updateSidePosition']=function(){const _0x2d11bd=_0x325044,_0x16af82=Window_STB_TurnOrder['Settings'];if([_0x2d11bd(0x39d)][_0x2d11bd(0x2f1)](_0x16af82[_0x2d11bd(0x3a9)]))return;this['x']=this['_homeX'],this['y']=this[_0x2d11bd(0x226)];const _0x2baf69=SceneManager['_scene'][_0x2d11bd(0x380)];this['x']+=_0x2baf69['x'],this['y']+=_0x2baf69['y'];},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x37a)]=function(){const _0x16b0ca=_0x325044;if(!this[_0x16b0ca(0x241)])return;const _0x56d299=this[_0x16b0ca(0x241)][_0x16b0ca(0x33b)];if(!_0x56d299)return;_0x56d299[_0x16b0ca(0x390)](this[_0x16b0ca(0x3a0)][_0x16b0ca(0x210)](this));},Window_STB_TurnOrder[_0x325044(0x27e)]['compareBattlerSprites']=function(_0x18bacd,_0x19b374){const _0xadbc6=_0x325044,_0x167e0f=this[_0xadbc6(0x348)](),_0x5fab7e=Window_STB_TurnOrder['Settings']['OrderDirection'];if(_0x167e0f&&!_0x5fab7e)return _0x18bacd['x']-_0x19b374['x'];else{if(_0x167e0f&&_0x5fab7e){if(_0xadbc6(0x341)!==_0xadbc6(0x341))this[_0xadbc6(0x34f)](...arguments);else return _0x19b374['x']-_0x18bacd['x'];}else{if(!_0x167e0f&&_0x5fab7e)return _0x18bacd['y']-_0x19b374['y'];else{if(!_0x167e0f&&!_0x5fab7e)return _0xadbc6(0x1fb)===_0xadbc6(0x1fb)?_0x19b374['y']-_0x18bacd['y']:(this[_0xadbc6(0x2c3)]===_0x4e2d61&&this['initMembersBattleSystemSTB'](),this[_0xadbc6(0x2c3)]);}}}},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x289)]=function(){const _0x5595f1=_0x325044;this[_0x5595f1(0x3b4)]=$gameSystem[_0x5595f1(0x2ef)]();},Window_STB_TurnOrder[_0x325044(0x27e)]['updateTurnOrder']=function(_0x2e92a0){const _0x44e0cb=_0x325044;this[_0x44e0cb(0x2de)]['sort']((_0x2340f2,_0x5aee1a)=>{const _0x25b90c=_0x44e0cb;return _0x2340f2[_0x25b90c(0x26f)]()-_0x5aee1a[_0x25b90c(0x26f)]();}),this[_0x44e0cb(0x2b8)]();if(!_0x2e92a0)return;for(const _0x2408f7 of this[_0x44e0cb(0x2de)]){if(_0x44e0cb(0x310)!==_0x44e0cb(0x1e2)){if(!_0x2408f7)continue;_0x2408f7['update'](),_0x2408f7[_0x44e0cb(0x307)]=0x0;}else _0x28610f=_0x328714['max'](_0x80f852,_0x557377);}},Window_STB_TurnOrder[_0x325044(0x27e)][_0x325044(0x2b8)]=function(){const _0x45eec0=_0x325044;if(!this[_0x45eec0(0x348)]())return;const _0x21e387=VisuMZ[_0x45eec0(0x2bc)]['Settings'][_0x45eec0(0x337)];if(!_0x21e387[_0x45eec0(0x347)])return;const _0x15df91=$gameParty[_0x45eec0(0x30a)]()[_0x45eec0(0x2e3)](_0x1c013d=>_0x1c013d&&_0x1c013d[_0x45eec0(0x258)]()&&_0x1c013d['isAppeared']())[_0x45eec0(0x36a)],_0x1b20e6=$gameTroop[_0x45eec0(0x30a)]()['filter'](_0x18decd=>_0x18decd&&_0x18decd[_0x45eec0(0x258)]()&&_0x18decd['isAppeared']())[_0x45eec0(0x36a)],_0x57e159=this[_0x45eec0(0x3ab)](_0x15df91,_0x1b20e6);this[_0x45eec0(0x245)]=_0x57e159['x'],this[_0x45eec0(0x333)]=_0x57e159['y'],(this[_0x45eec0(0x245)]!==this[_0x45eec0(0x27c)]||this[_0x45eec0(0x333)]!==this[_0x45eec0(0x226)])&&(this[_0x45eec0(0x2fb)]=_0x21e387['UpdateFrames']);};