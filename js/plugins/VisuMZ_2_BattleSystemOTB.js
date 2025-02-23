//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
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
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
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
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
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
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
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
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
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
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
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
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
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
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
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
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
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
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
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
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
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
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
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
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
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
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
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
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
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
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
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
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
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
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
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
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
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
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

function _0x2250(_0x1e252f,_0x3d8bc2){const _0x59c5f1=_0x59c5();return _0x2250=function(_0x2250f0,_0x630b21){_0x2250f0=_0x2250f0-0x1c8;let _0x8279fa=_0x59c5f1[_0x2250f0];return _0x8279fa;},_0x2250(_0x1e252f,_0x3d8bc2);}const _0x482619=_0x2250;function _0x59c5(){const _0x116ced=['startActorCommandSelection','isBattleMember','remove','drawDimmedArea','createOrderPreviewSprite','PreviewOffsetY','enemy','min','JPTLC','isOTB','onItemOk','sVteH','#000000','Game_Battler_performCollapse','floor','ShowMarkerBorder','fillRect','EnemyBattlerIcon','Game_Battler_addState','Scene_Battle_onActorOk','sNgjg','isTurnBased','hide','clearRect','changeSourceArray','postEndActionOTB','Game_Battler_makeSpeed','fontSize','iconHeight','QiAxs','BattleManager_isTpb','RepositionTopForHelp','icon','Visible','repositionLogWindowOTB','_isAppeared','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','otbPreviewOrderChange','Scene_Battle_createAllWindows','_sourceArray','inputtingAction','EHKXO','ARRAYNUM','item','onEnemyOk','otbCalcTargetNextOrderChange','ConvertAgiBuffNext','Enemy','ELuGI','_windowLayer','xtyTU','TurnOrder','EFFECT_ADD_DEBUFF','toUpperCase','UxMWz','splice','performActionEndOTB','aTyzL','attack','BorderThickness','UserNextOrder','numActions','pgFjx','_tempActor','UiSubjectOffsetX','createActorCommandWindowOTB','Scene_Battle_createActorCommandWindow','GiBAR','_stateIDs','zfhQp','IconIndex','FaceName','LncfS','setBlendColor','JSON','moveToPosition','randomInt','setGuard','_otbTurnOrderWindow','VmrlK','_homeX','_otbTurnOrderFaceIndex','code','StatusWindow','hasSvBattler','makeDeepCopy','speed','length','commandCancel','scale','findIndex','makeActionTimes','visible','_targetHomeY','_statusWindow','EnemyBattlerFaceName','changeFaceGraphicBitmap','kpANt','AllowRandomSpeed','BattleManager_endAction','jwgSB','_helpWindow','defaultPosition','addBattlerToTurnOrderAtStart','1582131tIzKJL','BattleManager_isTurnBased','jYeXs','createAllWindows','createTurnOrderOTBGraphicFaceIndex','createOTBTurnOrderWindow','otbCalcUserCurrentOrderChange','_scene','stepForward','%1BgColor2','_contentsBackSprite','performCollapse','_handlers','isActor','PreviewOffsetX','addState','BattleManager_getNextSubject','addActor','AvUsk','pVRFB','canMove','BattleManager_battleSys','close','setOTBGraphicIconIndex','_otbTurnOrderIconIndex','UiNextOffsetY','getColor','LogWindowOffsetY','isActiveTpb','_positionDuration','bitmapHeight','allowRandomSpeed','faceWidth','_currentTurn','battler','applyItemTargetEffectOTB','adjustForPreview','OtbTurnOrderClearActorGraphic','transparent','MowMx','initialize','createLetterSprite','HzgCT','_graphicFaceName','select','getStateTooltipBattler','ConvertSpeedJS','UiSubjectText','XOxsQ','PQbwn','UiCurrentText','Scene_Battle_onEnemyCancel','wtoBc','Scene_Battle_commandCancel','status','TDnhk','HNFHP','parse','LeTtu','preEndActionOTB','processSpriteRemoval','changeIconGraphicBitmap','isAlive','fqxfK','DisplayPosition','RegExp','onTurnEnd','cancel','previewOrderByAction','containerWindow','ZekPt','Game_Battler_removeState','loadEnemy','_otb_createdFirstTurnOrders','_graphicFaceIndex','OTnON','onActorOk','otbPreviewOrderClear','%1-%2','MoveDistance','removeActionBattlersOTB','top','shift','startFade','_otbTurnOrderVisible','initHomePositions','UbqRo','isPartyCommandWindowDisabled','Game_Action_allowRandomSpeed','UQLmb','UjKqa','battlerName','szOgp','_graphicEnemy','BattleManager_processTurn','initMembersOTB','ZUdos','removeChild','processTurn','subject','updateGraphic','PreviewScale','onBattleStart','note','Scene_Battle_onItemOk','startTurn','RepositionLogWindow','faceIndex','calculateTargetIndex','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','createBorderSprite','Game_Action_applyItemUserEffect','padding','isUsingSideviewUiLayout','UserAddActionCurrent','8071848QjdDex','applyGlobalBattleSystemOTB','commandFight','TargetNextOrder','_ogWindowLayerY','selectNextActor','40004YwLEWL','wtbmx','RNoGt','loadFace','KMJLB','Scene_Battle_onSkillOk','BattleManager_isActiveTpb','UiCurrentOffsetX','xIWNB','members','isInfinitySpeedOTB','mainSprite','tzWvl','setSkill','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','BgImageOffsetY','createNewTurnOrderSprites','getNextSubject','UserAddActionNext','otbCreateNewTurnOrderSprites','cTTWA','gradient','TurnOrderOTBGraphicType','RyaNY','loadSystem','battleEnd','874642sBkHhQ','faceHeight','vssuO','_otbTimesActedThisTurn','updatePadding','EnemyBattlerFaceIndex','OvMdc','createActorCommandWindow','commandCancelOTB','_logWindow','YIWQy','BattleManager_selectNextActor','qnUWD','_otb_actionBattlersNext','exit','NgBLF','calculateTargetPositions','Scene_Battle_commandGuard','guard','OeMIl','STRUCT','OtbTurnOrderEnemyIcon','createChildren','width','FUNC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removeCurrentSubject','dcRPC','GetAllIndicies','return\x200','OTB','onItemCancel','sortContainer','hRuCK','DgUlc','FZoln','height','_unit','1194280NSjGFB','TargetFollOrder','Scene_Battle_actorCommandSingleSkill','changeEnemyGraphicBitmap','WJTSi','setup','_spriteContainer','_letter','Game_BattlerBase_hide','GKfhd','setAttack','Enemies','isNextOtbSubject','endBattlerActions','oMDKu','otbAddBattlerToTurnOrderAtStart','OtbTurnOrderEnemyFace','otbProcessActionCheck','_previewContainer','actorCommandSingleSkill','canChangeOtbTurnOrder','UiNextText','hBxIn','SpriteLength','Game_Party_addActor','contentsOpacity','createOrderPreview','battleSys','RepositionTopHelpX','blt','_isAlive','EFFECT_ADD_BUFF','needsSelection','Scene_Battle_commandAttack','addChildAt','_fadeTarget','VlwTi','qLyVH','push','isPreviousSceneBattleTransitionable','_graphicSv','xCFOs','createBackgroundSprite','hCAUw','ConvertAgiDebuffCurrent','updateVisibility','additionalTargetXAdjustments','updateOpacity','includes','Mechanics','name','endAction','TurnOrderOTBGraphicFaceIndex','PostStunInfinitySpeed','xQwrN','NUM','processTurnOTB','bRUJB','xGOvs','wAxwr','call','cZAMY','updateSelectionEffect','TGMpi','5MmxgoG','_nextTurn','Game_Party_removeActor','createTurnOrderOTBGraphicFaceName','UPwWH','OTB_STUN_INFINITY_SPEED','version','OrderDirection','QqSbB','dimColor1','obURI','qfmXW','DDBcw','222792EcPDwR','ceil','_ogWindowLayerX','UiSubjectOffsetY','TurnOrderOTBGraphicFaceName','BgImageFilename','Game_System_initialize','getBorderThickness','SQwJu','FplmU','applyBattleItemWindowOTB','drawBgImage','gradientFillRect','Mfbzi','jpALZ','commandAttack','updateGraphicHue','_bgImageSprite','ActionBattlersNextFilter','svBattlerName','FSuGM','isSceneBattle','lEksr','BgDimStyle','iLlbw','ofJgf','clearTurnOrderOTBGraphics','OtbTurnOrderClearEnemyGraphic','BattleManager_makeActionOrders','RepositionTopHelpY','update','3373002cyMSgg','TurnOrderOTBGraphicIconIndex','right','SOxkr','removeStatesAuto','initBattleSystemOTB','juLnc','_subject','_actionBattlers','initMembers','startInput','wloHt','_backgroundSprite','VisuMZ_2_PartySystem','createSpriteContainers','ARRAYSTRUCT','parameters','KVlzo','lfCAI','Window_Help_setItem','21HdqItC','onTurnEndOTB','_plural','addBattlerToTurnOrderAtEnd','isTpb','applyGlobal','Game_Actor_selectNextCommand','VHfeN','_containerWidth','CRyeS','setBattleSystemOTBTurnOrderVisible','currentAction','currentExt','otbShiftTurnOrderForSubject','requestUpdateTurnOrders','BattleSystemOTB','clear','updateStateTurns','createInitialPositions','currentSymbol','bitmapWidth','endTurn','startInputOTB','_previewNext','BattleManager_endTurn','NIXdZ','turnOrderChangeOTB','rxfsZ','Actors','_surprise','_otbTurnOrderGraphicType','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','faceName','ActorBattlerType','_hidden','face','onBattleEnd','Scene_Battle_onEnemyOk','fkZOM','_forceAction','createTurnOrderOTBGraphicIconIndex','BattleManager_setup','_inputting','refreshTurnOrder','_nextX','drawText','otbCalcUserNextOrderChange','round','iUehf','OtbTurnOrderActorFace','drawUiText','onEnemyCancel','GalYk','Jvtnk','DisplayOffsetX','EnemyBattlerFontSize','JFrcR','otbShiftNextTurnSpritesToCurrentTurn','selectNextCommand','ZuLtK','processUpdateGraphic','aagVl','EnemyBattlerType','YYHAP','LQmKJ','EVAL','ohkHF','utrLW','_homeY','txmnm','%1BgColor1','_index','svactor','removeSprite','Uspkp','description','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','trim','SpriteThin','dvpNl','bottom','InfinityClamp','filter','setText','_positionTargetY','resumeTurnOrderSprites','otbReturnBattlerToTurnOrders','tGQLb','create','_positionTargetX','SideviewBattleUI','_instance','VisuMZ_3_SideviewBattleUI','otbRemoveCurrentSubject','_currentActor','UiNextOffsetX','_actorWindow','otbUnshiftBattlerToTurnOrders','getBattleSystem','_fadeSpeed','EnableActionTimes','_blendColor','_requestTurnOrderUpdate','loadSvEnemy','_otbTurnOrderFaceName','_graphicIconIndex','UiCurrentOffsetY','updateTurnOrders','_graphicType','addChildToBack','isEnemy','clamp','applyItemAddedActionOTB','BattleManager_finishActorInput','anchor','otbApplyActionTimes','removeState','battleMembers','otbAddBattlerToTurnOrderAtEnd','KRHLb','_spriteGroupWidth','makeNextActionOrdersOTB','Game_BattlerBase_appear','max','children','_speed','isBattleItemWindowOTB','RUzoK','fontFace','commandGuard','removeActor','makeActions','JOgzK','updateLetter','nvFsm','DFYRM','swhjm','%1SystemBorder','mainFontFace','PreviewEnemy','onSkillCancel','_graphicSprite','_forcedBattlers','onBattleEndOTB','Game_Battler_onBattleStart','bitmap','effects','OTB_CONVERT_AGI_BUFF_NEXT_TURN','TargetAddActionCurrent','_graphicHue','_offset','registerCommand','bind','czpdg','Scene_Battle_onItemCancel','Scene_Battle_onSkillCancel','_fadeDuration','createGraphicSprite','_letterSprite','ActionBattlersFilter','getInfinityClamp','Conversion','left','getUnitSideSide','DIlLA','mklEn','yzynr','_containerHeight','dataId','otbCalcTargetCurrentOrderChange','onBattleStartOTB','_previewCurrent','appear','map','selectNextActorOTB','format','vPalh','Scene_Battle_commandFight','Game_Action_applyGlobal','containerPosition','finishActorInput','checkOpacity','dJvIZ','makeSpeed','_tempBattler','clearOrderPreview','Window_Selectable_select','_subjectX','allBattleMembers','createTurnOrderSprites','ARRAYEVAL','otbAddActions','ScreenBuffer','ConvertParams','battlerHue','ARRAYSTR','qVprq','boxWidth','JNqgF','refresh','sort','resetFontSettings','_phase','isAppeared','windowRect','canInput','Game_Battler_onTurnEnd','FaceIndex','Game_Action_speed','OtbTurnOrderActorIcon','otbGainInstant','fKaEc','_currentX','wXCZS','setItem','UserFollOrder','Scene_Battle_onActorCancel','UpdateFrames','onActorCancel','_actorCommandWindow','Jalsl','LvooC','WidthBase','oltof','BattleManager_startInput','makeActionOrdersOTB','updatePosition','addLoadListener','FNbdX','WwZxf','unshift','_isBattleOver','actor','match','addChild','Settings','prototype','opacity','shiftNextTurnSpritesToCurrentTurn','SubjectDistance','active','changeSvActorGraphicBitmap','isSideView','index','constructor','indexOf'];_0x59c5=function(){return _0x116ced;};return _0x59c5();}(function(_0x1e0b48,_0x4defb2){const _0x5aaae5=_0x2250,_0x56d080=_0x1e0b48();while(!![]){try{const _0x241280=-parseInt(_0x5aaae5(0x442))/0x1+parseInt(_0x5aaae5(0x45c))/0x2+-parseInt(_0x5aaae5(0x3c9))/0x3+-parseInt(_0x5aaae5(0x1eb))/0x4*(-parseInt(_0x5aaae5(0x22b))/0x5)+-parseInt(_0x5aaae5(0x257))/0x6+-parseInt(_0x5aaae5(0x26b))/0x7*(parseInt(_0x5aaae5(0x238))/0x8)+parseInt(_0x5aaae5(0x43c))/0x9;if(_0x241280===_0x4defb2)break;else _0x56d080['push'](_0x56d080['shift']());}catch(_0x59040a){_0x56d080['push'](_0x56d080['shift']());}}}(_0x59c5,0x66754));var label=_0x482619(0x27a),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x94c079){const _0x5cc4c4=_0x482619;return _0x94c079[_0x5cc4c4(0x3ff)]&&_0x94c079[_0x5cc4c4(0x2b6)][_0x5cc4c4(0x21b)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x482619(0x356)]||{},VisuMZ[_0x482619(0x32c)]=function(_0x548ca2,_0x1c1d9f){const _0x2817df=_0x482619;for(const _0xdca639 in _0x1c1d9f){if(_0xdca639[_0x2817df(0x354)](/(.*):(.*)/i)){const _0x3652d3=String(RegExp['$1']),_0x4dd27b=String(RegExp['$2'])[_0x2817df(0x396)]()[_0x2817df(0x2b8)]();let _0x113cce,_0xdca6e,_0x54fdf2;switch(_0x4dd27b){case _0x2817df(0x222):_0x113cce=_0x1c1d9f[_0xdca639]!==''?Number(_0x1c1d9f[_0xdca639]):0x0;break;case _0x2817df(0x38b):_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e[_0x2817df(0x318)](_0x5e6e73=>Number(_0x5e6e73));break;case _0x2817df(0x2ac):_0x113cce=_0x1c1d9f[_0xdca639]!==''?eval(_0x1c1d9f[_0xdca639]):null;break;case _0x2817df(0x329):_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e['map'](_0x3a6c51=>eval(_0x3a6c51));break;case _0x2817df(0x3ab):_0x113cce=_0x1c1d9f[_0xdca639]!==''?JSON['parse'](_0x1c1d9f[_0xdca639]):'';break;case'ARRAYJSON':_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON['parse'](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e['map'](_0x59da94=>JSON[_0x2817df(0x402)](_0x59da94));break;case _0x2817df(0x1dd):_0x113cce=_0x1c1d9f[_0xdca639]!==''?new Function(JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639])):new Function(_0x2817df(0x1e2));break;case'ARRAYFUNC':_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e[_0x2817df(0x318)](_0x4e6d61=>new Function(JSON[_0x2817df(0x402)](_0x4e6d61)));break;case'STR':_0x113cce=_0x1c1d9f[_0xdca639]!==''?String(_0x1c1d9f[_0xdca639]):'';break;case _0x2817df(0x32e):_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e['map'](_0x9c9b53=>String(_0x9c9b53));break;case _0x2817df(0x1d9):_0x54fdf2=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):{},_0x113cce=VisuMZ[_0x2817df(0x32c)]({},_0x54fdf2);break;case _0x2817df(0x266):_0xdca6e=_0x1c1d9f[_0xdca639]!==''?JSON[_0x2817df(0x402)](_0x1c1d9f[_0xdca639]):[],_0x113cce=_0xdca6e[_0x2817df(0x318)](_0x58b5d1=>VisuMZ[_0x2817df(0x32c)]({},JSON['parse'](_0x58b5d1)));break;default:continue;}_0x548ca2[_0x3652d3]=_0x113cce;}}return _0x548ca2;},(_0x2f1a98=>{const _0x2ebc44=_0x482619,_0xa9d1f8=_0x2f1a98[_0x2ebc44(0x21d)];for(const _0x3b2c0d of dependencies){if(_0x2ebc44(0x228)!==_0x2ebc44(0x403)){if(!Imported[_0x3b2c0d]){if(_0x2ebc44(0x1cb)!==_0x2ebc44(0x268)){alert(_0x2ebc44(0x1de)[_0x2ebc44(0x31a)](_0xa9d1f8,_0x3b2c0d)),SceneManager[_0x2ebc44(0x1d3)]();break;}else _0xb85f64['addBattlerToTurnOrderAtEnd'](_0xaca990,_0x1640a0);}}else this[_0x2ebc44(0x25c)]();}const _0x28a694=_0x2f1a98['description'];if(_0x28a694[_0x2ebc44(0x354)](/\[Version[ ](.*?)\]/i)){const _0x34aebc=Number(RegExp['$1']);_0x34aebc!==VisuMZ[label][_0x2ebc44(0x231)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2ebc44(0x31a)](_0xa9d1f8,_0x34aebc)),SceneManager['exit']());}if(_0x28a694[_0x2ebc44(0x354)](/\[Tier[ ](\d+)\]/i)){const _0x3ff98e=Number(RegExp['$1']);if(_0x3ff98e<tier){if(_0x2ebc44(0x2ef)!=='JOgzK'){const _0xe0660d=this[_0x2ebc44(0x3eb)]();_0xe0660d&&(this['_fadeTarget']=_0xe0660d[_0x2ebc44(0x407)]()&&_0xe0660d[_0x2ebc44(0x336)]()?0xff:0x0);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0xa9d1f8,_0x3ff98e,tier)),SceneManager[_0x2ebc44(0x1d3)]();}else tier=Math[_0x2ebc44(0x2e6)](_0x3ff98e,tier);}VisuMZ[_0x2ebc44(0x32c)](VisuMZ[label]['Settings'],_0x2f1a98[_0x2ebc44(0x267)]);})(pluginData),PluginManager[_0x482619(0x302)](pluginData[_0x482619(0x21d)],_0x482619(0x33c),_0x35c7c8=>{const _0x5ab530=_0x482619;VisuMZ[_0x5ab530(0x32c)](_0x35c7c8,_0x35c7c8);const _0x8bcd79=_0x35c7c8[_0x5ab530(0x287)],_0x19195f=_0x35c7c8[_0x5ab530(0x3a7)];for(const _0x570597 of _0x8bcd79){const _0x16d862=$gameActors[_0x5ab530(0x353)](_0x570597);if(!_0x16d862)continue;_0x16d862[_0x5ab530(0x289)]=_0x5ab530(0x381),_0x16d862[_0x5ab530(0x3e1)]=_0x19195f;}}),PluginManager[_0x482619(0x302)](pluginData[_0x482619(0x21d)],_0x482619(0x29c),_0x38fa7f=>{const _0x1afbe6=_0x482619;VisuMZ[_0x1afbe6(0x32c)](_0x38fa7f,_0x38fa7f);const _0x59e7b8=_0x38fa7f[_0x1afbe6(0x287)],_0x306eec=_0x38fa7f[_0x1afbe6(0x3a8)],_0x49fde5=_0x38fa7f[_0x1afbe6(0x33a)];for(const _0x3f94e9 of _0x59e7b8){if(_0x1afbe6(0x369)!=='IaaJW'){const _0x61bf97=$gameActors[_0x1afbe6(0x353)](_0x3f94e9);if(!_0x61bf97)continue;_0x61bf97[_0x1afbe6(0x289)]='face',_0x61bf97[_0x1afbe6(0x2d3)]=_0x306eec,_0x61bf97['_otbTurnOrderFaceIndex']=_0x49fde5;}else _0x51ac49[_0x1afbe6(0x27a)][_0x1afbe6(0x1d0)][_0x1afbe6(0x227)](this);}}),PluginManager[_0x482619(0x302)](pluginData[_0x482619(0x21d)],_0x482619(0x3ee),_0x5b4dc5=>{const _0x45f369=_0x482619;VisuMZ[_0x45f369(0x32c)](_0x5b4dc5,_0x5b4dc5);const _0x58870b=_0x5b4dc5[_0x45f369(0x287)];for(const _0x34326d of _0x58870b){if(_0x45f369(0x272)==='VHfeN'){const _0x125540=$gameActors[_0x45f369(0x353)](_0x34326d);if(!_0x125540)continue;_0x125540[_0x45f369(0x252)]();}else _0x10391b['turnOrderChangeOTB'](this[_0x45f369(0x42c)](),-_0x28e8b0,![]);}}),PluginManager['registerCommand'](pluginData['name'],_0x482619(0x1da),_0x165bf1=>{const _0x45277e=_0x482619;VisuMZ['ConvertParams'](_0x165bf1,_0x165bf1);const _0x147843=_0x165bf1[_0x45277e(0x1f6)],_0x185aad=_0x165bf1[_0x45277e(0x3a7)];for(const _0xdc1a of _0x147843){if(_0x45277e(0x1d4)!==_0x45277e(0x1d4))_0x3bda3c[_0x45277e(0x23a)]=_0xb77def[_0x45277e(0x29a)]((_0x24d8cc['width']-_0x8051f2[_0x45277e(0x368)](_0x412d4d[_0x45277e(0x330)],_0x4c237b[_0x45277e(0x1dc)]))/0x2);else{const _0x32ac5d=$gameTroop[_0x45277e(0x44b)]()[_0xdc1a];if(!_0x32ac5d)continue;_0x32ac5d[_0x45277e(0x289)]='icon',_0x32ac5d[_0x45277e(0x3e1)]=_0x185aad;}}}),PluginManager[_0x482619(0x302)](pluginData[_0x482619(0x21d)],_0x482619(0x1fb),_0x357bb8=>{const _0x3eec5f=_0x482619;VisuMZ[_0x3eec5f(0x32c)](_0x357bb8,_0x357bb8);const _0x23cdb=_0x357bb8[_0x3eec5f(0x1f6)],_0x4c4db1=_0x357bb8[_0x3eec5f(0x3a8)],_0x3ca39a=_0x357bb8['FaceIndex'];for(const _0x19a6f3 of _0x23cdb){if(_0x3eec5f(0x22f)===_0x3eec5f(0x224))this[_0x3eec5f(0x1f1)][_0x3eec5f(0x2e7)][_0x3eec5f(0x333)]((_0x34f245,_0x1f292b)=>_0x1f292b['x']-_0x34f245['x']);else{const _0x4f0569=$gameTroop[_0x3eec5f(0x44b)]()[_0x19a6f3];if(!_0x4f0569)continue;_0x4f0569[_0x3eec5f(0x289)]=_0x3eec5f(0x28e),_0x4f0569[_0x3eec5f(0x2d3)]=_0x4c4db1,_0x4f0569[_0x3eec5f(0x3b2)]=_0x3ca39a;}}}),PluginManager['registerCommand'](pluginData['name'],_0x482619(0x253),_0x39cebe=>{const _0x5e68e8=_0x482619;VisuMZ[_0x5e68e8(0x32c)](_0x39cebe,_0x39cebe);const _0xf28229=_0x39cebe[_0x5e68e8(0x1f6)];for(const _0x29e50a of _0xf28229){const _0xcb2868=$gameTroop[_0x5e68e8(0x44b)]()[_0x29e50a];if(!_0xcb2868)continue;_0xcb2868[_0x5e68e8(0x252)]();}}),PluginManager[_0x482619(0x302)](pluginData[_0x482619(0x21d)],'SystemTurnOrderVisibility',_0x4d2530=>{const _0x52ae94=_0x482619;VisuMZ['ConvertParams'](_0x4d2530,_0x4d2530);const _0x208a08=_0x4d2530[_0x52ae94(0x382)];$gameSystem[_0x52ae94(0x275)](_0x208a08);}),VisuMZ[_0x482619(0x27a)][_0x482619(0x40a)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager['getStateIdWithName']=function(_0x51e433){const _0x540e76=_0x482619;_0x51e433=_0x51e433['toUpperCase']()[_0x540e76(0x2b8)](),this['_stateIDs']=this[_0x540e76(0x3a5)]||{};if(this[_0x540e76(0x3a5)][_0x51e433])return this[_0x540e76(0x3a5)][_0x51e433];for(const _0x38d2cb of $dataStates){if(_0x540e76(0x401)!=='IqKCd'){if(!_0x38d2cb)continue;this[_0x540e76(0x3a5)][_0x38d2cb[_0x540e76(0x21d)][_0x540e76(0x396)]()[_0x540e76(0x2b8)]()]=_0x38d2cb['id'];}else{const _0xc38a21='%1-%2'['format'](_0x363e76[_0x540e76(0x3d6)]()?'actor':_0x540e76(0x367),_0xebecde[_0x540e76(0x35e)]());_0x512047[_0xc38a21]=_0x5ea90e[_0xc38a21]||0x0;const _0x136db3=_0x592040[_0xc38a21]++,_0x4b44e1=new _0x169cd7(_0x5f1030,_0x136db3,_0x5e7d27);this[_0x540e76(0x1f1)][_0x540e76(0x355)](_0x4b44e1),_0x540df8[_0x540e76(0x211)](_0x4b44e1);}}return this[_0x540e76(0x3a5)][_0x51e433]||0x0;},SceneManager['isSceneBattle']=function(){const _0x229ace=_0x482619;return this[_0x229ace(0x3d0)]&&this[_0x229ace(0x3d0)][_0x229ace(0x35f)]===Scene_Battle;},VisuMZ[_0x482619(0x27a)][_0x482619(0x294)]=BattleManager[_0x482619(0x1f0)],BattleManager[_0x482619(0x1f0)]=function(_0x3f6323,_0x5c5783,_0x2791f3){const _0x53041e=_0x482619;VisuMZ[_0x53041e(0x27a)]['BattleManager_setup'][_0x53041e(0x227)](this,_0x3f6323,_0x5c5783,_0x2791f3),this['initMembersOTB']();},BattleManager[_0x482619(0x428)]=function(){const _0x431eb7=_0x482619;if(!this[_0x431eb7(0x36a)]())return;this[_0x431eb7(0x1d2)]=[],this[_0x431eb7(0x412)]=![];},VisuMZ[_0x482619(0x27a)][_0x482619(0x3de)]=BattleManager['battleSys'],BattleManager[_0x482619(0x206)]=function(){const _0x3596b7=_0x482619;if(this[_0x3596b7(0x36a)]())return _0x3596b7(0x1e3);return VisuMZ['BattleSystemOTB']['BattleManager_battleSys'][_0x3596b7(0x227)](this);},BattleManager[_0x482619(0x36a)]=function(){const _0x43af85=_0x482619;return $gameSystem[_0x43af85(0x2cd)]()===_0x43af85(0x1e3);},VisuMZ['BattleSystemOTB'][_0x482619(0x37f)]=BattleManager[_0x482619(0x26f)],BattleManager[_0x482619(0x26f)]=function(){const _0x285bf2=_0x482619;if(this[_0x285bf2(0x36a)]())return![];return VisuMZ[_0x285bf2(0x27a)][_0x285bf2(0x37f)][_0x285bf2(0x227)](this);},VisuMZ[_0x482619(0x27a)]['BattleManager_isActiveTpb']=BattleManager[_0x482619(0x3e5)],BattleManager['isActiveTpb']=function(){const _0x259f86=_0x482619;if(this[_0x259f86(0x36a)]())return![];return VisuMZ['BattleSystemOTB'][_0x259f86(0x448)]['call'](this);},VisuMZ[_0x482619(0x27a)]['BattleManager_isTurnBased']=BattleManager[_0x482619(0x376)],BattleManager[_0x482619(0x376)]=function(){const _0x503ebe=_0x482619;if(this['isOTB']())return!![];return VisuMZ[_0x503ebe(0x27a)][_0x503ebe(0x3ca)][_0x503ebe(0x227)](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x34b)]=BattleManager['startInput'],BattleManager[_0x482619(0x261)]=function(){const _0x17d836=_0x482619;VisuMZ[_0x17d836(0x27a)][_0x17d836(0x34b)][_0x17d836(0x227)](this),this[_0x17d836(0x36a)]()&&$gameParty[_0x17d836(0x338)]()&&!this[_0x17d836(0x288)]&&(_0x17d836(0x2f1)===_0x17d836(0x2a8)?this['applyBattleItemWindowOTB']():this['startInputOTB']());},BattleManager[_0x482619(0x281)]=function(){const _0x98d4d7=_0x482619;this[_0x98d4d7(0x432)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x427)]=BattleManager[_0x482619(0x42b)],BattleManager[_0x482619(0x42b)]=function(){const _0x1f59f0=_0x482619;this[_0x1f59f0(0x36a)]()?_0x1f59f0(0x2b0)!==_0x1f59f0(0x2b0)?(this[_0x1f59f0(0x388)]=_0x2c3cc9,this[_0x1f59f0(0x1d5)](),this[_0x1f59f0(0x388)]===null&&(this[_0x1f59f0(0x2c6)]=-0x1)):this[_0x1f59f0(0x223)]():_0x1f59f0(0x414)==='otNUs'?(_0x3dddfa[_0x1f59f0(0x27a)]['Game_System_initialize'][_0x1f59f0(0x227)](this),this['initBattleSystemOTB']()):VisuMZ[_0x1f59f0(0x27a)][_0x1f59f0(0x427)][_0x1f59f0(0x227)](this);},BattleManager[_0x482619(0x223)]=function(){const _0x1b18e1=_0x482619,_0x341ac4=this[_0x1b18e1(0x25e)];if(_0x341ac4[_0x1b18e1(0x3d6)]()&&_0x341ac4[_0x1b18e1(0x338)]()){if(_0x1b18e1(0x397)===_0x1b18e1(0x397)){const _0x434c8c=_0x341ac4[_0x1b18e1(0x276)]();if(!_0x434c8c)_0x1b18e1(0x1d8)===_0x1b18e1(0x45e)?_0x548978=this[_0x1b18e1(0x435)]():VisuMZ[_0x1b18e1(0x27a)]['BattleManager_processTurn'][_0x1b18e1(0x227)](this);else _0x434c8c[_0x1b18e1(0x292)]?VisuMZ[_0x1b18e1(0x27a)][_0x1b18e1(0x427)][_0x1b18e1(0x227)](this):_0x1b18e1(0x310)!==_0x1b18e1(0x310)?this['isOTB']()?_0x5df349[_0x1b18e1(0x27a)][_0x1b18e1(0x427)][_0x1b18e1(0x227)](this):_0x1aa9b8[_0x1b18e1(0x27a)][_0x1b18e1(0x2dc)][_0x1b18e1(0x227)](this):(this[_0x1b18e1(0x2c9)]=_0x341ac4,this['startActorInput']());}else _0x1612e8['BattleSystemOTB'][_0x1b18e1(0x1f3)][_0x1b18e1(0x227)](this),_0x1c9715[_0x1b18e1(0x419)]();}else'vUmXB'!==_0x1b18e1(0x34a)?VisuMZ[_0x1b18e1(0x27a)][_0x1b18e1(0x427)][_0x1b18e1(0x227)](this):(_0x1a9c33[_0x1b18e1(0x416)](),_0x133436[_0x1b18e1(0x27a)][_0x1b18e1(0x3fc)][_0x1b18e1(0x227)](this));},VisuMZ[_0x482619(0x27a)][_0x482619(0x2dc)]=BattleManager[_0x482619(0x31f)],BattleManager[_0x482619(0x31f)]=function(){const _0xcacacf=_0x482619;this[_0xcacacf(0x36a)]()?VisuMZ[_0xcacacf(0x27a)][_0xcacacf(0x427)]['call'](this):VisuMZ[_0xcacacf(0x27a)][_0xcacacf(0x2dc)]['call'](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x1d0)]=BattleManager[_0x482619(0x441)],BattleManager[_0x482619(0x441)]=function(){const _0x18c4a3=_0x482619;if(this[_0x18c4a3(0x36a)]()){if(_0x18c4a3(0x251)==='ofJgf')this[_0x18c4a3(0x319)]();else{const _0x231b3b=_0x4f80a6===_0x1129f[_0x18c4a3(0x25f)]?this[_0x18c4a3(0x3ea)]:this[_0x18c4a3(0x22c)];if(!_0x231b3b)return;const _0x2ae1b8=_0x29f895[_0x18c4a3(0x27a)][_0x18c4a3(0x1e1)](_0x21c581,_0x446888),_0x2c2845=_0x2ae1b8['length']-0x1,_0x3d02de=new _0x314667(_0x40f820,_0x2c2845,_0x231b3b);this[_0x18c4a3(0x1f1)][_0x18c4a3(0x355)](_0x3d02de),_0x231b3b[_0x18c4a3(0x211)](_0x3d02de),_0x3d02de[_0x18c4a3(0x41c)](0xff),this[_0x18c4a3(0x279)]();}}else VisuMZ[_0x18c4a3(0x27a)][_0x18c4a3(0x1d0)]['call'](this);},BattleManager[_0x482619(0x319)]=function(){const _0x513854=_0x482619;this[_0x513854(0x2c9)]=null,this[_0x513854(0x295)]=![];},VisuMZ[_0x482619(0x27a)][_0x482619(0x3c4)]=BattleManager[_0x482619(0x21e)],BattleManager[_0x482619(0x21e)]=function(){const _0x1208ca=_0x482619;this[_0x1208ca(0x404)](),VisuMZ['BattleSystemOTB'][_0x1208ca(0x3c4)]['call'](this),this['postEndActionOTB']();},BattleManager[_0x482619(0x404)]=function(){const _0x44c9f8=_0x482619;if(!this[_0x44c9f8(0x36a)]())return;this['removeActionBattlersOTB']();this['_subject']&&this[_0x44c9f8(0x25e)][_0x44c9f8(0x399)]();if(this['_subject']&&this[_0x44c9f8(0x25e)][_0x44c9f8(0x3dd)]()&&this['_actionBattlers'][_0x44c9f8(0x21b)](this[_0x44c9f8(0x25e)])){if('YWBhQ'!==_0x44c9f8(0x423))this[_0x44c9f8(0x25e)]['makeActions']();else{if(!this[_0x44c9f8(0x36a)]())return;this['removeActionBattlersOTB'](),this[_0x44c9f8(0x25e)]&&this[_0x44c9f8(0x25e)]['performActionEndOTB'](),this['_subject']&&this[_0x44c9f8(0x25e)][_0x44c9f8(0x3dd)]()&&this[_0x44c9f8(0x25f)][_0x44c9f8(0x21b)](this[_0x44c9f8(0x25e)])&&this[_0x44c9f8(0x25e)][_0x44c9f8(0x2ee)]();}}},BattleManager[_0x482619(0x37a)]=function(){const _0x47bb0e=_0x482619;if(!this[_0x47bb0e(0x36a)]())return;this[_0x47bb0e(0x419)]();this[_0x47bb0e(0x25e)]&&(this[_0x47bb0e(0x1f8)](this[_0x47bb0e(0x25e)]),this['_subject']=null);this[_0x47bb0e(0x2f9)]['length']>0x0&&(_0x47bb0e(0x25a)===_0x47bb0e(0x262)?(this[_0x47bb0e(0x326)]=_0x1a1cd2[_0x47bb0e(0x1dc)]-_0x243ee4['SpriteThin'],this['_currentX']=this[_0x47bb0e(0x2e3)]+_0x27dd41['SubjectDistance'],this[_0x47bb0e(0x297)]=0x0):this['_subject']=this[_0x47bb0e(0x453)]());;},BattleManager['OTB_ADDED_ACTION_TIMES']=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x21c)][_0x482619(0x2cf)],BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']=VisuMZ['BattleSystemOTB']['Settings'][_0x482619(0x21c)]['RandomizeActionTimesOrder'],BattleManager['OTB_STUN_INFINITY_CLAMP']=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x21c)][_0x482619(0x2bc)],VisuMZ['BattleSystemOTB'][_0x482619(0x254)]=BattleManager['makeActionOrders'],BattleManager['makeActionOrders']=function(){const _0x487fb7=_0x482619;if(this[_0x487fb7(0x36a)]())_0x487fb7(0x1d1)===_0x487fb7(0x2f3)?(_0xdab8a3[_0x487fb7(0x27a)][_0x487fb7(0x31d)][_0x487fb7(0x227)](this),this[_0x487fb7(0x43d)]()):this[_0x487fb7(0x34c)]();else{if(_0x487fb7(0x225)!==_0x487fb7(0x2a3))VisuMZ[_0x487fb7(0x27a)]['BattleManager_makeActionOrders']['call'](this);else return this[_0x487fb7(0x2a7)]();}},BattleManager[_0x482619(0x34c)]=function(){const _0x542572=_0x482619;let _0x1f63a0=this[_0x542572(0x412)]?0x1:0x2;while(_0x1f63a0--){if(_0x542572(0x44a)==='TQkLP'){if(this['isOTB']())return!![];return _0x18a85d['BattleSystemOTB'][_0x542572(0x3ca)][_0x542572(0x227)](this);}else this[_0x542572(0x2e4)]();}const _0x39fb96=!this[_0x542572(0x412)];this[_0x542572(0x412)]=!![];},BattleManager['makeNextActionOrdersOTB']=function(){const _0x7e696e=_0x482619;this[_0x7e696e(0x25f)]=this['_otb_actionBattlersNext'],this[_0x7e696e(0x2a4)]();const _0x46e013=[];_0x46e013[_0x7e696e(0x211)](...$gameParty[_0x7e696e(0x2e0)]()),_0x46e013[_0x7e696e(0x211)](...$gameTroop[_0x7e696e(0x44b)]());for(const _0x1d0c6d of _0x46e013){if(_0x7e696e(0x246)!==_0x7e696e(0x246)){if(!_0x454518[_0x7e696e(0x36a)]())return;this[_0x7e696e(0x1c8)]=0x0;}else _0x1d0c6d[_0x7e696e(0x322)]();}_0x46e013['sort']((_0x101985,_0x17264a)=>_0x17264a['speed']()-_0x101985[_0x7e696e(0x3b7)]()),this[_0x7e696e(0x1d2)]=_0x46e013,this[_0x7e696e(0x2de)](),this[_0x7e696e(0x419)](),this[_0x7e696e(0x455)]();},BattleManager[_0x482619(0x2de)]=function(){const _0x5b14bc=_0x482619;if(!BattleManager['OTB_ADDED_ACTION_TIMES'])return;const _0x40ff47=this['_otb_actionBattlersNext'],_0xf0184a=this[_0x5b14bc(0x327)]();for(const _0xc252a4 of _0xf0184a){if(_0x5b14bc(0x1ef)!==_0x5b14bc(0x1ef)){const _0x4fc824=this[_0x5b14bc(0x3e6)];this['x']=(this['x']*(_0x4fc824-0x1)+this[_0x5b14bc(0x2c4)])/_0x4fc824,this['y']=(this['y']*(_0x4fc824-0x1)+this['_positionTargetY'])/_0x4fc824,this[_0x5b14bc(0x3e6)]--;}else{if(!_0xc252a4)continue;if(!_0xc252a4[_0x5b14bc(0x336)]())continue;if(!_0xc252a4[_0x5b14bc(0x407)]())continue;if(!_0x40ff47['includes'](_0xc252a4))continue;const _0x3aba59=_0x40ff47[_0x5b14bc(0x360)](_0xc252a4);let _0x32139d=_0xc252a4[_0x5b14bc(0x3bc)]()-0x1;while(_0x32139d--){if(_0x5b14bc(0x400)===_0x5b14bc(0x1e6))_0x29ab61['BattleSystemOTB'][_0x5b14bc(0x427)][_0x5b14bc(0x227)](this);else{let _0x31c7a2=_0x3aba59;BattleManager[_0x5b14bc(0x2b7)]&&(_0x31c7a2=Math[_0x5b14bc(0x3ad)](_0x40ff47['length']-_0x3aba59)+_0x3aba59),_0x40ff47[_0x5b14bc(0x398)](_0x31c7a2,0x0,_0xc252a4);}}}}},BattleManager[_0x482619(0x419)]=function(){const _0x368e54=_0x482619;if(!this[_0x368e54(0x36a)]())return;this[_0x368e54(0x25f)]=this[_0x368e54(0x25f)]||[],this[_0x368e54(0x25f)][_0x368e54(0x363)](null),this[_0x368e54(0x25f)]['remove'](undefined),this[_0x368e54(0x25f)]=this[_0x368e54(0x25f)][_0x368e54(0x2bd)](_0x4c8125=>_0x4c8125[_0x368e54(0x362)]()),this['_actionBattlers']=this[_0x368e54(0x25f)][_0x368e54(0x2bd)](_0x3b201a=>VisuMZ['BattleSystemOTB'][_0x368e54(0x30a)](_0x3b201a)),this['_surprise']&&(this[_0x368e54(0x25f)]=this['_actionBattlers'][_0x368e54(0x2bd)](_0x43c087=>!_0x43c087['isActor']())),this['_preemptive']&&(this[_0x368e54(0x25f)]=this['_actionBattlers'][_0x368e54(0x2bd)](_0x1c9391=>!_0x1c9391[_0x368e54(0x2d9)]())),this[_0x368e54(0x1d2)]=this[_0x368e54(0x1d2)]||[],this[_0x368e54(0x1d2)]['remove'](null),this['_otb_actionBattlersNext'][_0x368e54(0x363)](undefined),this['_otb_actionBattlersNext']=this['_otb_actionBattlersNext'][_0x368e54(0x2bd)](_0x105a4d=>_0x105a4d[_0x368e54(0x362)]()),this[_0x368e54(0x1d2)]=this[_0x368e54(0x1d2)][_0x368e54(0x2bd)](_0x501d8e=>VisuMZ[_0x368e54(0x27a)][_0x368e54(0x24a)](_0x501d8e)),this['otbRemoveUnableTurnOrderSprites'](),this[_0x368e54(0x296)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x30a)]=function(_0x4d500b){const _0x56f38a=_0x482619;if(!_0x4d500b)return![];if(!_0x4d500b[_0x56f38a(0x407)]())return![];if(!_0x4d500b[_0x56f38a(0x336)]())return![];return _0x4d500b[_0x56f38a(0x3dd)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x24a)]=function(_0x477c1b){const _0x4bf314=_0x482619;if(!_0x477c1b)return![];const _0x4d5241=JsonEx[_0x4bf314(0x3b6)](_0x477c1b);return _0x4d5241['_tempActor']=!![],_0x4d5241[_0x4bf314(0x323)]=!![],_0x4d5241[_0x4bf314(0x27c)](),_0x4d5241[_0x4bf314(0x25b)](0x1),_0x4d5241[_0x4bf314(0x25b)](0x2),_0x4d5241['refresh'](),VisuMZ[_0x4bf314(0x27a)][_0x4bf314(0x30a)](_0x4d5241);},BattleManager[_0x482619(0x285)]=function(_0x27bf0b,_0xada30f,_0x37009d){const _0x5dd603=_0x482619;if(!_0xada30f)return;const _0x39650c=_0x37009d?this['_otb_actionBattlersNext']:this[_0x5dd603(0x25f)];if(!_0x39650c)return;if(!_0x39650c['includes'](_0x27bf0b))return;const _0x23341b=VisuMZ['BattleSystemOTB'][_0x5dd603(0x1e1)](_0x27bf0b,_0x39650c),_0x3bb44a=_0x37009d?VisuMZ[_0x5dd603(0x27a)][_0x5dd603(0x30b)](_0x39650c):0x0,_0xcb97b=_0x23341b[_0x5dd603(0x3b8)]-0x1;for(let _0x207765=_0xcb97b;_0x207765>=0x0;_0x207765--){_0x5dd603(0x429)!==_0x5dd603(0x38a)?_0x39650c[_0x5dd603(0x398)](_0x23341b[_0x207765],0x1):(_0x2f6f51[_0x5dd603(0x358)]=0xff,_0x49595b['x']=_0x45cbf6[_0x5dd603(0x2c4)],_0x3f2c57[_0x5dd603(0x3e6)]=0x0);}for(var _0x2c4745=0x0;_0x2c4745<_0x23341b[_0x5dd603(0x3b8)];_0x2c4745++){var _0x5a596a=(_0x23341b[_0x2c4745]-_0xada30f)['clamp'](_0x3bb44a,_0x39650c[_0x5dd603(0x3b8)]);_0x39650c[_0x5dd603(0x398)](_0x5a596a,0x0,_0x27bf0b);}this[_0x5dd603(0x419)](),this[_0x5dd603(0x296)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x1e1)]=function(_0x3ecb3c,_0x180c72){const _0x9fe9ac=_0x482619,_0x405dc0=[],_0x113203=_0x180c72[_0x9fe9ac(0x3b8)];for(let _0x5a58e7=0x0;_0x5a58e7<_0x113203;_0x5a58e7++){if(_0x9fe9ac(0x1cf)==='YIWQy'){if(_0x180c72[_0x5a58e7]===_0x3ecb3c)_0x405dc0[_0x9fe9ac(0x211)](_0x5a58e7);}else this['createOrderPreview'](_0x38a2b7);}return _0x405dc0;},VisuMZ[_0x482619(0x27a)][_0x482619(0x30b)]=function(_0x554c71){const _0x3b5b2c=_0x482619;if(!BattleManager['OTB_STUN_INFINITY_CLAMP'])return 0x0;if(!_0x554c71)return 0x0;let _0x5a1d7=0x0;const _0x421606=_0x554c71[_0x3b5b2c(0x3b8)];for(let _0xd05689=0x0;_0xd05689<_0x421606;_0xd05689++){if(_0x3b5b2c(0x2b5)!==_0x3b5b2c(0x2b5))_0x35fdda[_0x3b5b2c(0x27a)][_0x3b5b2c(0x37b)][_0x3b5b2c(0x227)](this);else{const _0x452b92=_0x554c71[_0xd05689];if(!_0x452b92)continue;if(_0x452b92[_0x3b5b2c(0x3b7)]()!==Infinity)return _0xd05689;else'JObXv'!==_0x3b5b2c(0x408)?_0x5a1d7++:this['isOTB']()?this[_0x3b5b2c(0x34c)]():_0x107c36[_0x3b5b2c(0x27a)][_0x3b5b2c(0x254)]['call'](this);}}return _0x5a1d7;},BattleManager[_0x482619(0x2a4)]=function(){const _0x5e5dc9=_0x482619;if(!this[_0x5e5dc9(0x36a)]())return;const _0x116143=SceneManager[_0x5e5dc9(0x3d0)][_0x5e5dc9(0x3af)];if(!_0x116143)return;_0x116143[_0x5e5dc9(0x359)]();},BattleManager['otbCreateNewTurnOrderSprites']=function(){const _0x289d81=_0x482619;if(!this['isOTB']())return;const _0x17b106=SceneManager[_0x289d81(0x3d0)][_0x289d81(0x3af)];if(!_0x17b106)return;_0x17b106[_0x289d81(0x452)]();},VisuMZ['BattleSystemOTB'][_0x482619(0x3d9)]=BattleManager[_0x482619(0x453)],BattleManager[_0x482619(0x453)]=function(){const _0x25f9fa=_0x482619;return this[_0x25f9fa(0x25e)]=VisuMZ['BattleSystemOTB'][_0x25f9fa(0x3d9)][_0x25f9fa(0x227)](this),this['isOTB']()&&this[_0x25f9fa(0x25e)]&&this[_0x25f9fa(0x278)](this[_0x25f9fa(0x25e)]),this[_0x25f9fa(0x25e)];},BattleManager[_0x482619(0x278)]=function(_0x1152ca){const _0x51b617=_0x482619;if(!this['isOTB']())return;const _0x45c4c8=SceneManager[_0x51b617(0x3d0)][_0x51b617(0x3af)];if(!_0x45c4c8)return;if(!_0x1152ca)return;_0x45c4c8['shiftTurnOrderForSubject'](_0x1152ca);},BattleManager[_0x482619(0x296)]=function(){const _0x3c4325=_0x482619;if(!this['isOTB']())return;const _0x27adcc=SceneManager[_0x3c4325(0x3d0)]['_otbTurnOrderWindow'];if(!_0x27adcc)return;_0x27adcc[_0x3c4325(0x279)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x283)]=BattleManager['endTurn'],BattleManager[_0x482619(0x280)]=function(){const _0x4c0232=_0x482619;VisuMZ[_0x4c0232(0x27a)][_0x4c0232(0x283)][_0x4c0232(0x227)](this),this[_0x4c0232(0x36a)]()&&this['otbRemoveCurrentSubject']();},BattleManager['otbRemoveCurrentSubject']=function(){const _0x2d48d1=_0x482619;if(!this[_0x2d48d1(0x36a)]())return;const _0xe0aa8=SceneManager['_scene'][_0x2d48d1(0x3af)];if(!_0xe0aa8)return;_0xe0aa8['removeCurrentSubject']();},BattleManager['otbRemoveUnableTurnOrderSprites']=function(){const _0x27cda0=_0x482619;if(!this[_0x27cda0(0x36a)]())return;const _0x103928=SceneManager[_0x27cda0(0x3d0)]['_otbTurnOrderWindow'];if(!_0x103928)return;_0x103928['removeUnableTurnOrderSprites']();},BattleManager[_0x482619(0x2c1)]=function(_0x3f2d85){const _0x5d4f09=_0x482619;if(!_0x3f2d85)return;const _0x3385ad=_0x3f2d85[_0x5d4f09(0x3bc)]();_0x3f2d85[_0x5d4f09(0x2ee)]();if(!this[_0x5d4f09(0x25f)]['includes'](_0x3f2d85)){if(_0x5d4f09(0x221)!==_0x5d4f09(0x221)){if(!_0x226a8b)return;if(_0x3c72c6===0x0)return;const _0x482a41=_0x1e39ee?_0x1782ae[_0x5d4f09(0x1d2)]:_0x82ec7d[_0x5d4f09(0x25f)],_0x525079=_0x60fb35['BattleSystemOTB']['GetAllIndicies'](_0x565af5,_0x482a41),_0x10e10d=_0xa51245?this['_nextTurn']:this[_0x5d4f09(0x3ea)],_0x52e4dc=_0x1b5b5d?this[_0x5d4f09(0x282)]:this['_previewCurrent'];if(_0x525079['length']<=0x0)return;for(let _0x8e5105=0x0;_0x8e5105<_0x525079[_0x5d4f09(0x3b8)];_0x8e5105++){const _0x354a10=new _0x5764ab(_0x1d1258,_0x8e5105,_0x10e10d,_0x88c2cc);this[_0x5d4f09(0x1fd)]['addChild'](_0x354a10),_0x52e4dc[_0x5d4f09(0x211)](_0x354a10),_0x354a10[_0x5d4f09(0x1d5)](),_0x354a10[_0x5d4f09(0x41c)](0xff);}}else{const _0x23a02b=Math['max'](0x0,_0x3385ad-(_0x3f2d85[_0x5d4f09(0x1c8)]||0x0));this[_0x5d4f09(0x2e1)](_0x3f2d85,_0x23a02b,this['_actionBattlers']);}}if(!this[_0x5d4f09(0x1d2)][_0x5d4f09(0x21b)](_0x3f2d85)){const _0x411816=_0x3385ad;this[_0x5d4f09(0x2e1)](_0x3f2d85,_0x411816,this[_0x5d4f09(0x1d2)]);}},BattleManager[_0x482619(0x2e1)]=function(_0x3853d3,_0x50a0cb,_0x37ee31){const _0x336e9c=_0x482619;if(!this['isOTB']())return;const _0x539243=SceneManager['_scene'][_0x336e9c(0x3af)];while(_0x50a0cb--){_0x37ee31[_0x336e9c(0x211)](_0x3853d3),_0x539243&&_0x539243[_0x336e9c(0x26e)](_0x3853d3,_0x37ee31);}},BattleManager[_0x482619(0x2cc)]=function(_0x1e5cb9){const _0x40a895=_0x482619;if(!_0x1e5cb9)return;const _0x19669c=_0x1e5cb9[_0x40a895(0x3bc)]();_0x1e5cb9[_0x40a895(0x2ee)]();if(!this[_0x40a895(0x25f)][_0x40a895(0x21b)](_0x1e5cb9)){if(_0x40a895(0x3c2)===_0x40a895(0x214)){const _0x2508d2=new _0xa043a4(_0xdfd397,_0x35c1fd,_0x5c8b81,_0x33ae41);this[_0x40a895(0x1fd)][_0x40a895(0x355)](_0x2508d2),_0x129061[_0x40a895(0x211)](_0x2508d2),_0x2508d2[_0x40a895(0x1d5)](),_0x2508d2[_0x40a895(0x41c)](0xff);}else{const _0x20739f=Math[_0x40a895(0x2e6)](0x0,_0x19669c-(_0x1e5cb9[_0x40a895(0x1c8)]||0x0));this[_0x40a895(0x3c8)](_0x1e5cb9,_0x20739f,this[_0x40a895(0x25f)]);}}if(!this['_otb_actionBattlersNext'][_0x40a895(0x21b)](_0x1e5cb9)){const _0x1334fa=_0x19669c;this[_0x40a895(0x3c8)](_0x1e5cb9,_0x1334fa,this[_0x40a895(0x1d2)]);}},BattleManager[_0x482619(0x1fa)]=function(_0x5c4120,_0x173f80,_0x263880){const _0x1783c4=_0x482619;if(!this[_0x1783c4(0x36a)]())return;const _0x23f6e3=SceneManager['_scene'][_0x1783c4(0x3af)];while(_0x173f80--){_0x1783c4(0x2ba)!==_0x1783c4(0x2ba)?(_0x4623e3['otbPreviewOrderClear'](),_0x5ed5cd[_0x1783c4(0x27a)][_0x1783c4(0x1ed)][_0x1783c4(0x227)](this)):(_0x263880[_0x1783c4(0x351)](_0x5c4120),_0x23f6e3&&_0x23f6e3['addBattlerToTurnOrderAtStart'](_0x5c4120,_0x263880));}},BattleManager[_0x482619(0x416)]=function(){const _0x1b91fe=_0x482619;if(!this[_0x1b91fe(0x36a)]())return;const _0x45a07c=SceneManager[_0x1b91fe(0x3d0)][_0x1b91fe(0x3af)];if(!_0x45a07c)return;_0x45a07c[_0x1b91fe(0x40d)](null);},BattleManager[_0x482619(0x386)]=function(){const _0x4d85e4=_0x482619;if(!this[_0x4d85e4(0x36a)]())return;const _0x2fa416=SceneManager[_0x4d85e4(0x3d0)]['_otbTurnOrderWindow'];if(!_0x2fa416)return;_0x2fa416[_0x4d85e4(0x40d)](this[_0x4d85e4(0x389)]());},VisuMZ[_0x482619(0x27a)][_0x482619(0x23e)]=Game_System[_0x482619(0x357)][_0x482619(0x3f1)],Game_System[_0x482619(0x357)][_0x482619(0x3f1)]=function(){const _0x57c917=_0x482619;VisuMZ[_0x57c917(0x27a)][_0x57c917(0x23e)]['call'](this),this['initBattleSystemOTB']();},Game_System[_0x482619(0x357)]['initBattleSystemOTB']=function(){this['_otbTurnOrderVisible']=!![];},Game_System['prototype']['isBattleSystemOTBTurnOrderVisible']=function(){const _0x42c458=_0x482619;return this[_0x42c458(0x41d)]===undefined&&this[_0x42c458(0x25c)](),this[_0x42c458(0x41d)];},Game_System['prototype'][_0x482619(0x275)]=function(_0x1e2cf1){const _0x45fd07=_0x482619;this[_0x45fd07(0x41d)]===undefined&&this[_0x45fd07(0x25c)](),this[_0x45fd07(0x41d)]=_0x1e2cf1;},Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN']=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x30c)]['ConvertAgiBuffCurrent'],Game_Action[_0x482619(0x450)]=VisuMZ['BattleSystemOTB']['Settings']['Conversion'][_0x482619(0x217)],Game_Action[_0x482619(0x2fe)]=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x30c)][_0x482619(0x38f)],Game_Action[_0x482619(0x436)]=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x30c)]['ConvertAgiDebuffNext'],VisuMZ[_0x482619(0x27a)]['Game_Action_speed']=Game_Action[_0x482619(0x357)][_0x482619(0x3b7)],Game_Action[_0x482619(0x357)]['speed']=function(){const _0x2918db=_0x482619;return BattleManager[_0x2918db(0x36a)]()?0x0:VisuMZ[_0x2918db(0x27a)][_0x2918db(0x33b)][_0x2918db(0x227)](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x31d)]=Game_Action['prototype'][_0x482619(0x270)],Game_Action['prototype'][_0x482619(0x270)]=function(){const _0xaff19c=_0x482619;VisuMZ['BattleSystemOTB']['Game_Action_applyGlobal'][_0xaff19c(0x227)](this),this['applyGlobalBattleSystemOTB']();},Game_Action[_0x482619(0x357)][_0x482619(0x43d)]=function(){const _0x235e93=_0x482619;if(!SceneManager[_0x235e93(0x24d)]())return;if(!BattleManager['isOTB']())return;if(!this[_0x235e93(0x38c)]())return;if(!this['subject']())return;const _0x42e6dd=VisuMZ[_0x235e93(0x27a)][_0x235e93(0x40a)],_0x51e7e6=this[_0x235e93(0x38c)]()['note'];if(_0x51e7e6['match'](_0x42e6dd['Instant'])){if(_0x235e93(0x340)==='wXCZS')this[_0x235e93(0x42c)]()[_0x235e93(0x33d)](0x1);else{if(!_0xe36a24[_0x235e93(0x36a)]())return;this[_0x235e93(0x1c8)]=this[_0x235e93(0x1c8)]||0x0,this[_0x235e93(0x1c8)]++;if(this[_0x235e93(0x39e)]()>0x0&&this===_0x3ea49b[_0x235e93(0x25e)]){const _0x4928ce=_0x267133[_0x235e93(0x2f9)];if(_0x4928ce['length']>0x0&&_0x4928ce[0x0]!==this)return;const _0x553259=this[_0x235e93(0x3eb)]();if(_0x553259&&_0x3442b4['isNextOtbSubject'](this))_0x553259[_0x235e93(0x3d1)]();}}}let _0x20a6b1=this[_0x235e93(0x3cf)](),_0x1393da=this[_0x235e93(0x299)]();_0x20a6b1!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x235e93(0x42c)](),-_0x20a6b1,![]),_0x1393da!==0x0&&BattleManager[_0x235e93(0x285)](this[_0x235e93(0x42c)](),-_0x1393da,!![]);},Game_Action[_0x482619(0x357)][_0x482619(0x3cf)]=function(){const _0x45336f=_0x482619;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x45336f(0x36a)]())return 0x0;if(!this[_0x45336f(0x38c)]())return 0x0;if(!this[_0x45336f(0x42c)]())return 0x0;if(!this[_0x45336f(0x42c)]()[_0x45336f(0x1ff)]())return 0x0;const _0x1da21b=VisuMZ[_0x45336f(0x27a)][_0x45336f(0x40a)],_0x3f238a=this['item']()[_0x45336f(0x430)],_0x10bcb4=BattleManager[_0x45336f(0x25f)]||[];let _0x4dbfef=0x0;return _0x3f238a['match'](_0x1da21b['UserFollOrder'])&&('XoyFf'!==_0x45336f(0x269)?_0x10bcb4[_0x45336f(0x21b)](this[_0x45336f(0x42c)]())&&(_0x4dbfef+=Number(RegExp['$1'])):(_0x148cf2['BattleSystemOTB'][_0x45336f(0x283)]['call'](this),this[_0x45336f(0x36a)]()&&this[_0x45336f(0x2c8)]())),_0x3f238a[_0x45336f(0x354)](_0x1da21b['UserCurrOrder'])&&(_0x4dbfef+=Number(RegExp['$1'])),_0x4dbfef;},Game_Action[_0x482619(0x357)][_0x482619(0x299)]=function(){const _0x1cc4c9=_0x482619;if(!SceneManager[_0x1cc4c9(0x24d)]())return 0x0;if(!BattleManager[_0x1cc4c9(0x36a)]())return 0x0;if(!this[_0x1cc4c9(0x38c)]())return 0x0;if(!this['subject']())return 0x0;if(!this[_0x1cc4c9(0x42c)]()[_0x1cc4c9(0x1ff)]())return 0x0;const _0xa635ae=VisuMZ[_0x1cc4c9(0x27a)][_0x1cc4c9(0x356)]['Mechanics'],_0x4b1366=VisuMZ['BattleSystemOTB'][_0x1cc4c9(0x40a)],_0x259d53=this[_0x1cc4c9(0x38c)]()[_0x1cc4c9(0x430)],_0x5e7f40=BattleManager['_otb_actionBattlersNext']||[];let _0x143f5f=0x0;return _0xa635ae[_0x1cc4c9(0x3f7)]&&(_0x1cc4c9(0x2f2)!==_0x1cc4c9(0x2f2)?_0x389c18[_0x1cc4c9(0x285)](_0x213148,-_0x82b09f,!![]):_0x143f5f+=_0xa635ae[_0x1cc4c9(0x3f7)][_0x1cc4c9(0x227)](this)),_0x259d53[_0x1cc4c9(0x354)](_0x4b1366[_0x1cc4c9(0x342)])&&(_0x1cc4c9(0x44e)!=='zQALn'?_0x5e7f40['includes'](this['subject']())&&(_0x143f5f+=Number(RegExp['$1'])):_0x1270f5[_0x1cc4c9(0x36a)]()?this[_0x1cc4c9(0x1cd)]():_0x108913[_0x1cc4c9(0x27a)][_0x1cc4c9(0x3fe)]['call'](this)),_0x259d53[_0x1cc4c9(0x354)](_0x4b1366[_0x1cc4c9(0x39d)])&&(_0x143f5f+=Number(RegExp['$1'])),_0x143f5f;},VisuMZ[_0x482619(0x27a)][_0x482619(0x438)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x482619(0x357)]['applyItemUserEffect']=function(_0x3e6a97){const _0x5324d5=_0x482619;VisuMZ[_0x5324d5(0x27a)]['Game_Action_applyItemUserEffect'][_0x5324d5(0x227)](this,_0x3e6a97),this[_0x5324d5(0x2db)](_0x3e6a97),this['applyItemTargetEffectOTB'](_0x3e6a97);},Game_Action[_0x482619(0x357)]['applyItemAddedActionOTB']=function(_0x4244b0){const _0x57b2f5=_0x482619;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x57b2f5(0x36a)]())return;if(!this['item']())return;if(!_0x4244b0)return;const _0x3fbe43=VisuMZ[_0x57b2f5(0x27a)][_0x57b2f5(0x40a)],_0x5b4f02=this[_0x57b2f5(0x38c)]()[_0x57b2f5(0x430)];if(_0x5b4f02[_0x57b2f5(0x354)](_0x3fbe43[_0x57b2f5(0x43b)])){if(_0x57b2f5(0x443)===_0x57b2f5(0x2a6)){if(this[_0x57b2f5(0x213)]!==_0x4fd6fc[_0x57b2f5(0x24b)]())return this[_0x57b2f5(0x2a7)]();}else{const _0x36edfe=!![],_0x2e8c86=Number(RegExp['$1'])||0x0;this[_0x57b2f5(0x42c)]()[_0x57b2f5(0x32a)](_0x2e8c86,_0x36edfe);}}if(_0x5b4f02[_0x57b2f5(0x354)](_0x3fbe43[_0x57b2f5(0x454)])){if('FKgWs'==='qIsWi')this['endBattlerActions'](this['_subject']),this[_0x57b2f5(0x25e)]=null;else{const _0xab86ba=![],_0x18c78f=Number(RegExp['$1'])||0x0;this[_0x57b2f5(0x42c)]()[_0x57b2f5(0x32a)](_0x18c78f,_0xab86ba);}}if(_0x5b4f02[_0x57b2f5(0x354)](_0x3fbe43[_0x57b2f5(0x2ff)])){if(_0x57b2f5(0x216)===_0x57b2f5(0x348))this[_0x57b2f5(0x365)](_0x16c6c4,!![],_0x455156);else{const _0x7078ae=!![],_0x577f56=Number(RegExp['$1'])||0x0;_0x4244b0[_0x57b2f5(0x32a)](_0x577f56,_0x7078ae);}}if(_0x5b4f02[_0x57b2f5(0x354)](_0x3fbe43['TargetAddActionNext'])){if('sEAuW'===_0x57b2f5(0x233))_0x78830c[_0x57b2f5(0x419)]();else{const _0x58c14e=![],_0x396466=Number(RegExp['$1'])||0x0;_0x4244b0[_0x57b2f5(0x32a)](_0x396466,_0x58c14e);}}},Game_Action[_0x482619(0x357)][_0x482619(0x3ec)]=function(_0x422e20){const _0x6cbf89=_0x482619;if(!SceneManager[_0x6cbf89(0x24d)]())return;if(!BattleManager[_0x6cbf89(0x36a)]())return;if(!this[_0x6cbf89(0x38c)]())return;if(!_0x422e20)return;if(!_0x422e20[_0x6cbf89(0x1ff)]())return 0x0;let _0x6158c8=this['otbCalcTargetCurrentOrderChange'](_0x422e20),_0x32fab9=this['otbCalcTargetNextOrderChange'](_0x422e20);_0x6158c8!==0x0&&('Jvtnk'!==_0x6cbf89(0x2a0)?(this[_0x6cbf89(0x301)]=_0x1f7ff7,_0x5951b0['prototype'][_0x6cbf89(0x3f1)][_0x6cbf89(0x227)](this,_0x12a381,_0x5d9c67,_0xfb2b60),this[_0x6cbf89(0x3ed)]()):BattleManager[_0x6cbf89(0x285)](_0x422e20,-_0x6158c8,![]));if(_0x32fab9!==0x0){if('xIXGV'!==_0x6cbf89(0x3c5))BattleManager[_0x6cbf89(0x285)](_0x422e20,-_0x32fab9,!![]);else{if(!_0x3f4129['isOTB']())return;this[_0x6cbf89(0x1c8)]=0x0;}}},Game_Action[_0x482619(0x357)][_0x482619(0x314)]=function(_0x1f67a2){const _0x5dcf35=_0x482619;if(!SceneManager[_0x5dcf35(0x24d)]())return 0x0;if(!BattleManager[_0x5dcf35(0x36a)]())return 0x0;if(!this['item']())return 0x0;if(!_0x1f67a2)return 0x0;if(!_0x1f67a2[_0x5dcf35(0x1ff)]())return 0x0;const _0x1eab15=VisuMZ['BattleSystemOTB'][_0x5dcf35(0x40a)],_0x28cd59=this[_0x5dcf35(0x38c)]()[_0x5dcf35(0x430)],_0x19d432=BattleManager[_0x5dcf35(0x25f)]||[];let _0x18173e=0x0;if(_0x28cd59['match'](_0x1eab15[_0x5dcf35(0x1ec)])){if('DxevB'!=='xdxxc')_0x19d432[_0x5dcf35(0x21b)](_0x1f67a2)&&(_0x18173e+=Number(RegExp['$1']));else return _0x53bd44[_0x5dcf35(0x356)]['EnemyBattlerType'];}_0x28cd59[_0x5dcf35(0x354)](_0x1eab15['TargetCurrOrder'])&&(_0x18173e+=Number(RegExp['$1']));const _0x15a039=this[_0x5dcf35(0x38c)]()[_0x5dcf35(0x2fd)];for(const _0x38bf88 of _0x15a039){if(!_0x38bf88)continue;if(_0x38bf88['code']===Game_Action[_0x5dcf35(0x20a)]&&_0x38bf88['dataId']===0x6){if(Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0x18173e-=0x1;}if(_0x38bf88[_0x5dcf35(0x3b3)]===Game_Action[_0x5dcf35(0x395)]&&_0x38bf88[_0x5dcf35(0x313)]===0x6){if(Game_Action[_0x5dcf35(0x450)])_0x18173e+=0x1;}}return _0x18173e;},Game_Action[_0x482619(0x357)][_0x482619(0x38e)]=function(_0x43092b){const _0x5aa067=_0x482619;if(!SceneManager[_0x5aa067(0x24d)]())return 0x0;if(!BattleManager[_0x5aa067(0x36a)]())return 0x0;if(!this[_0x5aa067(0x38c)]())return 0x0;if(!_0x43092b)return 0x0;if(!_0x43092b[_0x5aa067(0x1ff)]())return 0x0;const _0x372bb4=VisuMZ[_0x5aa067(0x27a)][_0x5aa067(0x40a)],_0x311c0f=this['item']()['note'],_0x41b593=BattleManager[_0x5aa067(0x1d2)]||[];let _0x5a9775=0x0;_0x311c0f[_0x5aa067(0x354)](_0x372bb4[_0x5aa067(0x1ec)])&&(_0x41b593[_0x5aa067(0x21b)](_0x43092b)&&(_0x5a9775+=Number(RegExp['$1'])));_0x311c0f[_0x5aa067(0x354)](_0x372bb4[_0x5aa067(0x43f)])&&(_0x5aa067(0x24c)!=='FSuGM'?(this[_0x5aa067(0x426)]=_0x2ce6de[_0x5aa067(0x424)](),_0x3fbcb3=_0x44b6d2[_0x5aa067(0x411)](this[_0x5aa067(0x426)]),_0x491e79['addLoadListener'](this[_0x5aa067(0x1ee)][_0x5aa067(0x303)](this,_0x3fd810))):_0x5a9775+=Number(RegExp['$1']));const _0x1ca760=this[_0x5aa067(0x38c)]()[_0x5aa067(0x2fd)];for(const _0x261bd8 of _0x1ca760){if(_0x5aa067(0x22a)==='TGMpi'){if(!_0x261bd8)continue;if(_0x261bd8[_0x5aa067(0x3b3)]===Game_Action['EFFECT_ADD_BUFF']&&_0x261bd8[_0x5aa067(0x313)]===0x6){if(_0x5aa067(0x350)!==_0x5aa067(0x3a6)){if(Game_Action[_0x5aa067(0x2fe)])_0x5a9775-=0x1;}else this[_0x5aa067(0x25e)]=this[_0x5aa067(0x3ea)][_0x128bd7],this['_currentTurn'][_0x33276d]['calculateTargetPositions'](),this[_0x5aa067(0x3ea)][_0x5aa067(0x398)](_0x43f506,0x1);}if(_0x261bd8[_0x5aa067(0x3b3)]===Game_Action[_0x5aa067(0x395)]&&_0x261bd8[_0x5aa067(0x313)]===0x6){if(Game_Action[_0x5aa067(0x436)])_0x5a9775+=0x1;}}else _0x136e39[_0x5aa067(0x357)][_0x5aa067(0x256)][_0x5aa067(0x227)](this),this[_0x5aa067(0x34d)](),this[_0x5aa067(0x320)](),this['updateOpacity'](),this[_0x5aa067(0x42d)](),this[_0x5aa067(0x248)](),this[_0x5aa067(0x2f0)](),this[_0x5aa067(0x229)]();}return _0x5a9775;},Game_BattlerBase[_0x482619(0x357)][_0x482619(0x252)]=function(){const _0x16d454=_0x482619;delete this[_0x16d454(0x289)],delete this[_0x16d454(0x2d3)],delete this['_otbTurnOrderFaceIndex'],delete this[_0x16d454(0x3e1)];},Game_BattlerBase['prototype']['TurnOrderOTBGraphicType']=function(){const _0x5f099c=_0x482619;return this[_0x5f099c(0x289)]===undefined&&(_0x5f099c(0x311)===_0x5f099c(0x240)?(this['_subjectX']=0x0,this[_0x5f099c(0x33f)]=_0xf396db[_0x5f099c(0x2b9)]+_0x35a97c[_0x5f099c(0x35a)],this['_nextX']=this[_0x5f099c(0x33f)]+_0x1ad384[_0x5f099c(0x35a)]+this[_0x5f099c(0x2e3)]):this[_0x5f099c(0x289)]=this['createTurnOrderOTBGraphicType']()),this[_0x5f099c(0x289)];},Game_BattlerBase[_0x482619(0x357)]['createTurnOrderOTBGraphicType']=function(){const _0x113b5d=_0x482619;return Window_OTB_TurnOrder[_0x113b5d(0x356)][_0x113b5d(0x2a9)];},Game_BattlerBase[_0x482619(0x357)]['TurnOrderOTBGraphicFaceName']=function(){const _0xded51e=_0x482619;return this[_0xded51e(0x2d3)]===undefined&&(this[_0xded51e(0x2d3)]=this[_0xded51e(0x22e)]()),this[_0xded51e(0x2d3)];},Game_BattlerBase[_0x482619(0x357)][_0x482619(0x22e)]=function(){const _0x45041e=_0x482619;return Window_OTB_TurnOrder[_0x45041e(0x356)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x482619(0x357)][_0x482619(0x21f)]=function(){const _0x58fa39=_0x482619;return this[_0x58fa39(0x3b2)]===undefined&&(_0x58fa39(0x2c2)===_0x58fa39(0x425)?this[_0x58fa39(0x1fd)]['x']+=_0x36308d[_0x58fa39(0x2b9)]:this[_0x58fa39(0x3b2)]=this[_0x58fa39(0x3cd)]()),this[_0x58fa39(0x3b2)];},Game_BattlerBase['prototype']['createTurnOrderOTBGraphicFaceIndex']=function(){const _0x585057=_0x482619;return Window_OTB_TurnOrder['Settings'][_0x585057(0x1ca)];},Game_BattlerBase[_0x482619(0x357)][_0x482619(0x258)]=function(){const _0x1694cb=_0x482619;return this['_otbTurnOrderIconIndex']===undefined&&(this['_otbTurnOrderIconIndex']=this['createTurnOrderOTBGraphicIconIndex']()),this[_0x1694cb(0x3e1)];},Game_BattlerBase['prototype']['createTurnOrderOTBGraphicIconIndex']=function(){const _0xfea8fb=_0x482619;return Window_OTB_TurnOrder[_0xfea8fb(0x356)][_0xfea8fb(0x372)];},Game_BattlerBase[_0x482619(0x357)][_0x482619(0x3e0)]=function(_0x499acd){const _0x3b254e=_0x482619;this[_0x3b254e(0x3e1)]=_0x499acd;},VisuMZ[_0x482619(0x27a)]['Game_BattlerBase_hide']=Game_BattlerBase[_0x482619(0x357)][_0x482619(0x377)],Game_BattlerBase['prototype'][_0x482619(0x377)]=function(){const _0x5b6517=_0x482619;VisuMZ['BattleSystemOTB'][_0x5b6517(0x1f3)][_0x5b6517(0x227)](this),BattleManager['removeActionBattlersOTB']();},VisuMZ[_0x482619(0x27a)]['Game_BattlerBase_appear']=Game_BattlerBase['prototype'][_0x482619(0x317)],Game_BattlerBase[_0x482619(0x357)][_0x482619(0x317)]=function(){const _0x1c8370=_0x482619,_0x2c7ccf=this['_hidden'];VisuMZ['BattleSystemOTB'][_0x1c8370(0x2e5)][_0x1c8370(0x227)](this),BattleManager['isOTB']()&&SceneManager[_0x1c8370(0x24d)]()&&_0x2c7ccf&&!this[_0x1c8370(0x28d)]&&BattleManager[_0x1c8370(0x2c1)](this);},VisuMZ['BattleSystemOTB'][_0x482619(0x36e)]=Game_Battler[_0x482619(0x357)][_0x482619(0x3d4)],Game_Battler[_0x482619(0x357)][_0x482619(0x3d4)]=function(){const _0x1e4a3b=_0x482619;VisuMZ[_0x1e4a3b(0x27a)]['Game_Battler_performCollapse'][_0x1e4a3b(0x227)](this),BattleManager[_0x1e4a3b(0x419)]();},Game_Battler[_0x482619(0x230)]=VisuMZ[_0x482619(0x27a)]['Settings'][_0x482619(0x21c)][_0x482619(0x220)],VisuMZ[_0x482619(0x27a)][_0x482619(0x2fb)]=Game_Battler[_0x482619(0x357)][_0x482619(0x42f)],Game_Battler[_0x482619(0x357)][_0x482619(0x42f)]=function(_0x1f8df6){const _0x86a5d8=_0x482619;VisuMZ['BattleSystemOTB'][_0x86a5d8(0x2fb)][_0x86a5d8(0x227)](this,_0x1f8df6),this['onBattleStartOTB'](_0x1f8df6);},Game_Battler[_0x482619(0x357)][_0x482619(0x315)]=function(_0x1371f6){const _0x1fbd47=_0x482619;if(!BattleManager[_0x1fbd47(0x36a)]())return;this[_0x1fbd47(0x1c8)]=0x0;},VisuMZ['BattleSystemOTB']['Game_Battler_onBattleEnd']=Game_Battler[_0x482619(0x357)]['onBattleEnd'],Game_Battler[_0x482619(0x357)][_0x482619(0x28f)]=function(){const _0x35046e=_0x482619;VisuMZ[_0x35046e(0x27a)]['Game_Battler_onBattleEnd'][_0x35046e(0x227)](this),this[_0x35046e(0x2fa)]();},Game_Battler[_0x482619(0x357)][_0x482619(0x2fa)]=function(){const _0x5ab1bd=_0x482619;if(!BattleManager[_0x5ab1bd(0x36a)]())return;this[_0x5ab1bd(0x1c8)]=0x0;},Game_Battler['prototype'][_0x482619(0x399)]=function(){const _0x10e2e7=_0x482619;if(!BattleManager[_0x10e2e7(0x36a)]())return;this['_otbTimesActedThisTurn']=this['_otbTimesActedThisTurn']||0x0,this['_otbTimesActedThisTurn']++;if(this[_0x10e2e7(0x39e)]()>0x0&&this===BattleManager[_0x10e2e7(0x25e)]){const _0x5bd710=BattleManager[_0x10e2e7(0x2f9)];if(_0x5bd710[_0x10e2e7(0x3b8)]>0x0&&_0x5bd710[0x0]!==this)return;const _0xe916f8=this['battler']();if(_0xe916f8&&BattleManager[_0x10e2e7(0x1f7)](this))_0xe916f8[_0x10e2e7(0x3d1)]();}},BattleManager['isNextOtbSubject']=function(_0x4f84eb){const _0x3156e3=_0x482619;if(!_0x4f84eb)return![];return this[_0x3156e3(0x25f)][0x0]===_0x4f84eb;},VisuMZ['BattleSystemOTB'][_0x482619(0x339)]=Game_Battler[_0x482619(0x357)][_0x482619(0x40b)],Game_Battler['prototype'][_0x482619(0x40b)]=function(){const _0x34de6f=_0x482619;VisuMZ['BattleSystemOTB']['Game_Battler_onTurnEnd'][_0x34de6f(0x227)](this),this[_0x34de6f(0x26c)]();},Game_Battler[_0x482619(0x357)][_0x482619(0x26c)]=function(){const _0x50387b=_0x482619;if(!BattleManager[_0x50387b(0x36a)]())return;this[_0x50387b(0x1c8)]=0x0;},VisuMZ['BattleSystemOTB'][_0x482619(0x37b)]=Game_Battler['prototype'][_0x482619(0x322)],Game_Battler[_0x482619(0x357)][_0x482619(0x322)]=function(){const _0x4ea5a5=_0x482619;BattleManager[_0x4ea5a5(0x36a)]()?this['makeOTBSpeed']():_0x4ea5a5(0x3db)==='gUVPz'?_0x1662fc['BattleSystemOTB'][_0x4ea5a5(0x427)]['call'](this):VisuMZ['BattleSystemOTB']['Game_Battler_makeSpeed'][_0x4ea5a5(0x227)](this);},Game_Battler['prototype']['makeOTBSpeed']=function(){const _0x2acd7e=_0x482619;if(this[_0x2acd7e(0x44c)]()){if(_0x2acd7e(0x459)!==_0x2acd7e(0x29b))this[_0x2acd7e(0x2e8)]=Infinity;else{const _0x1ba9b8=_0x1e0635(_0x5a371d['$1']);_0x1ba9b8<_0x228eb1?(_0x57caa6(_0x2acd7e(0x28a)[_0x2acd7e(0x31a)](_0x233d0b,_0x1ba9b8,_0x4ceefb)),_0x292b4b['exit']()):_0x6d6919=_0xf9f857[_0x2acd7e(0x2e6)](_0x1ba9b8,_0x23b7fe);}}else{if('fKaEc'!==_0x2acd7e(0x33e))this['_actionBattlers']=this[_0x2acd7e(0x25f)]['filter'](_0x2ece5a=>!_0x2ece5a['isActor']());else{const _0x56b36f=this['currentAction']()||new Game_Action(this);this['_speed']=VisuMZ['BattleSystemOTB']['Settings']['Mechanics']['InitialSpeedJS']['call'](_0x56b36f);}}},Game_Battler[_0x482619(0x357)][_0x482619(0x44c)]=function(){const _0xdf4f48=_0x482619;if(!Game_Battler[_0xdf4f48(0x230)])return![];if(!this['isAlive']())return![];if(!this['isAppeared']())return![];if(this['canMove']())return![];const _0x3562d5=JsonEx['makeDeepCopy'](this);return _0x3562d5[_0xdf4f48(0x3a0)]=!![],_0x3562d5[_0xdf4f48(0x323)]=!![],_0x3562d5[_0xdf4f48(0x27c)](),_0x3562d5['removeStatesAuto'](0x1),_0x3562d5[_0xdf4f48(0x25b)](0x2),_0x3562d5[_0xdf4f48(0x332)](),_0x3562d5[_0xdf4f48(0x3dd)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x421)]=Game_Action[_0x482619(0x357)][_0x482619(0x3e8)],Game_Action[_0x482619(0x357)][_0x482619(0x3e8)]=function(){const _0x119de7=_0x482619;if(BattleManager['isOTB']())return VisuMZ['BattleSystemOTB']['Settings'][_0x119de7(0x21c)][_0x119de7(0x3c3)];else{if(_0x119de7(0x235)!==_0x119de7(0x2ae))return VisuMZ['BattleSystemOTB'][_0x119de7(0x421)][_0x119de7(0x227)](this);else _0x2416d8[_0x119de7(0x27a)]['Game_Battler_onTurnEnd'][_0x119de7(0x227)](this),this[_0x119de7(0x26c)]();}},Game_Battler['prototype'][_0x482619(0x33d)]=function(_0x464e0b){const _0x577138=_0x482619;if(!this[_0x577138(0x3dd)]())return;this[_0x577138(0x1c8)]=this[_0x577138(0x1c8)]||0x0,this[_0x577138(0x1c8)]--,BattleManager['otbAddBattlerToTurnOrderAtStart'](this,_0x464e0b,BattleManager[_0x577138(0x25f)]);},Game_Battler[_0x482619(0x357)]['otbAddActions']=function(_0x17b951,_0x8ad9fa){const _0x481eb5=_0x482619;if(!this[_0x481eb5(0x3dd)]())return;if(_0x8ad9fa){if(_0x481eb5(0x2ad)!==_0x481eb5(0x2ad)){_0x10a651[_0x481eb5(0x27a)]['Game_Party_addActor'][_0x481eb5(0x227)](this,_0x2c03eb);if(_0x439eaf[_0x481eb5(0x264)])return;_0x3df044['isSceneBattle']()&&_0x29fc5f[_0x481eb5(0x36a)]()&&(_0x33879a[_0x481eb5(0x419)](),_0x5d0c95['otbReturnBattlerToTurnOrders'](_0x331f8f['actor'](_0x17a595)));}else BattleManager[_0x481eb5(0x2e1)](this,_0x17b951,BattleManager['_actionBattlers']);}else BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x17b951,BattleManager[_0x481eb5(0x1d2)]);},Game_Battler[_0x482619(0x357)][_0x482619(0x1ff)]=function(){const _0x1272c6=_0x482619;if(this[_0x1272c6(0x3b7)]()===Infinity)return![];return!![];},Game_Battler['prototype'][_0x482619(0x1fc)]=function(_0x46a26d,_0xb59555){const _0x367744=_0x482619;if(this[_0x367744(0x323)]||this[_0x367744(0x3a0)])return;if(!SceneManager[_0x367744(0x24d)]())return;if(!BattleManager[_0x367744(0x36a)]())return;if(_0x46a26d&&!this[_0x367744(0x3dd)]())BattleManager[_0x367744(0x419)]();else!_0x46a26d&&this['canMove']()&&BattleManager[_0x367744(0x2c1)](this);if(this[_0x367744(0x3dd)]()){const _0x4db61a=this[_0x367744(0x3bc)]()-_0xb59555;_0x4db61a>0x0&&(BattleManager[_0x367744(0x2e1)](this,_0x4db61a,BattleManager['_actionBattlers']),BattleManager[_0x367744(0x2e1)](this,_0x4db61a,BattleManager[_0x367744(0x1d2)]));}},VisuMZ[_0x482619(0x27a)][_0x482619(0x373)]=Game_Battler['prototype'][_0x482619(0x3d8)],Game_Battler[_0x482619(0x357)][_0x482619(0x3d8)]=function(_0x1e425d){const _0x534df5=_0x482619,_0x5e56fa=this[_0x534df5(0x3dd)](),_0x3210c5=this[_0x534df5(0x3bc)]();VisuMZ[_0x534df5(0x27a)][_0x534df5(0x373)][_0x534df5(0x227)](this,_0x1e425d),this['otbProcessActionCheck'](_0x5e56fa,_0x3210c5);},VisuMZ[_0x482619(0x27a)][_0x482619(0x410)]=Game_Battler['prototype'][_0x482619(0x2df)],Game_Battler[_0x482619(0x357)][_0x482619(0x2df)]=function(_0x352f22){const _0x5abb1d=_0x482619,_0x29d640=this[_0x5abb1d(0x3dd)](),_0x429b43=this[_0x5abb1d(0x3bc)]();VisuMZ[_0x5abb1d(0x27a)][_0x5abb1d(0x410)][_0x5abb1d(0x227)](this,_0x352f22),this['otbProcessActionCheck'](_0x29d640,_0x429b43);},VisuMZ[_0x482619(0x27a)][_0x482619(0x271)]=Game_Actor[_0x482619(0x357)][_0x482619(0x2a5)],Game_Actor[_0x482619(0x357)][_0x482619(0x2a5)]=function(){const _0x546cc8=_0x482619;if(BattleManager[_0x546cc8(0x36a)]()){if(this['battler']())this[_0x546cc8(0x3eb)]()[_0x546cc8(0x3d1)]();return![];}return VisuMZ[_0x546cc8(0x27a)][_0x546cc8(0x271)]['call'](this);},Game_Actor[_0x482619(0x357)]['createTurnOrderOTBGraphicType']=function(){const _0x94c750=_0x482619,_0x1521d2=this['actor']()[_0x94c750(0x430)];if(_0x1521d2[_0x94c750(0x354)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('BdQjn'===_0x94c750(0x37e))this[_0x94c750(0x365)](_0x2055be,!![],_0x908617);else return _0x94c750(0x28e);}else{if(_0x1521d2[_0x94c750(0x354)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x94c750(0x381);}return Window_OTB_TurnOrder[_0x94c750(0x356)][_0x94c750(0x28c)];},Game_Actor[_0x482619(0x357)][_0x482619(0x23c)]=function(){const _0x4dad5f=_0x482619,_0x44a316=this[_0x4dad5f(0x353)]()[_0x4dad5f(0x430)];if(_0x44a316[_0x4dad5f(0x354)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4dad5f(0x28b)]();},Game_Actor[_0x482619(0x357)][_0x482619(0x21f)]=function(){const _0x23ca3a=_0x482619,_0x4166b2=this[_0x23ca3a(0x353)]()[_0x23ca3a(0x430)];if(_0x4166b2['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x23ca3a(0x226)!=='hrxMf')return Number(RegExp['$2']);else{const _0x214446=this[_0x23ca3a(0x3bc)]()-_0x1d4ed6;_0x214446>0x0&&(_0x23c574['otbAddBattlerToTurnOrderAtEnd'](this,_0x214446,_0x5695d9['_actionBattlers']),_0x4adc51['otbAddBattlerToTurnOrderAtEnd'](this,_0x214446,_0x4d0f9b[_0x23ca3a(0x1d2)]));}}return this[_0x23ca3a(0x434)]();},Game_Actor['prototype'][_0x482619(0x293)]=function(){const _0x5d8077=_0x482619,_0x1d6eea=this['actor']()[_0x5d8077(0x430)];if(_0x1d6eea['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder['Settings']['ActorBattlerIcon'];},Game_Enemy[_0x482619(0x357)]['createTurnOrderOTBGraphicType']=function(){const _0x5ac94b=_0x482619,_0x5a60f8=this['enemy']()['note'];if(_0x5a60f8[_0x5ac94b(0x354)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x5a60f8[_0x5ac94b(0x354)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder[_0x5ac94b(0x356)][_0x5ac94b(0x2a9)];},Game_Enemy[_0x482619(0x357)][_0x482619(0x22e)]=function(){const _0x2ee8c4=_0x482619,_0x431047=this[_0x2ee8c4(0x367)]()['note'];if(_0x431047[_0x2ee8c4(0x354)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2ee8c4(0x30f)!==_0x2ee8c4(0x250))return String(RegExp['$1']);else _0xb5f992=_0x2ee8c4(0x28e);}return Window_OTB_TurnOrder['Settings'][_0x2ee8c4(0x3c0)];},Game_Enemy['prototype'][_0x482619(0x3cd)]=function(){const _0x4000cc=_0x482619,_0x29045b=this[_0x4000cc(0x367)]()['note'];if(_0x29045b['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x4000cc(0x356)][_0x4000cc(0x1ca)];},Game_Enemy[_0x482619(0x357)][_0x482619(0x293)]=function(){const _0x40e09c=_0x482619,_0x5364ba=this[_0x40e09c(0x367)]()[_0x40e09c(0x430)];if(_0x5364ba[_0x40e09c(0x354)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x40e09c(0x356)][_0x40e09c(0x372)];},VisuMZ[_0x482619(0x27a)][_0x482619(0x203)]=Game_Party[_0x482619(0x357)][_0x482619(0x3da)],Game_Party[_0x482619(0x357)][_0x482619(0x3da)]=function(_0x340df2){const _0x5a4516=_0x482619;VisuMZ['BattleSystemOTB'][_0x5a4516(0x203)][_0x5a4516(0x227)](this,_0x340df2);if(Imported[_0x5a4516(0x264)])return;SceneManager[_0x5a4516(0x24d)]()&&BattleManager[_0x5a4516(0x36a)]()&&(BattleManager[_0x5a4516(0x419)](),BattleManager[_0x5a4516(0x2c1)]($gameActors[_0x5a4516(0x353)](_0x340df2)));},VisuMZ['BattleSystemOTB'][_0x482619(0x22d)]=Game_Party[_0x482619(0x357)][_0x482619(0x2ed)],Game_Party['prototype'][_0x482619(0x2ed)]=function(_0x3b42e3){const _0x835583=_0x482619;VisuMZ['BattleSystemOTB'][_0x835583(0x22d)][_0x835583(0x227)](this,_0x3b42e3),SceneManager[_0x835583(0x24d)]()&&BattleManager[_0x835583(0x36a)]()&&BattleManager[_0x835583(0x419)]();},VisuMZ[_0x482619(0x27a)][_0x482619(0x3a3)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x1cc)],Scene_Battle[_0x482619(0x357)]['createActorCommandWindow']=function(){const _0x47a8e5=_0x482619;VisuMZ[_0x47a8e5(0x27a)][_0x47a8e5(0x3a3)][_0x47a8e5(0x227)](this),BattleManager[_0x47a8e5(0x36a)]()&&(_0x47a8e5(0x201)===_0x47a8e5(0x201)?this[_0x47a8e5(0x3a2)]():_0x5257c0[_0x47a8e5(0x2c1)](this));},Scene_Battle['prototype'][_0x482619(0x3a2)]=function(){const _0x111ae5=_0x482619,_0x4ed3b3=this['_actorCommandWindow'];this[_0x111ae5(0x420)]()&&(_0x111ae5(0x274)==='QNWoS'?this['_graphicType']=_0x111ae5(0x367):delete _0x4ed3b3[_0x111ae5(0x3d5)][_0x111ae5(0x40c)]);},VisuMZ['BattleSystemOTB'][_0x482619(0x3fe)]=Scene_Battle['prototype']['commandCancel'],Scene_Battle[_0x482619(0x357)][_0x482619(0x3b9)]=function(){const _0x41a888=_0x482619;BattleManager[_0x41a888(0x36a)]()?this[_0x41a888(0x1cd)]():VisuMZ[_0x41a888(0x27a)]['Scene_Battle_commandCancel']['call'](this);},Scene_Battle[_0x482619(0x357)][_0x482619(0x1cd)]=function(){const _0x599c81=_0x482619;BattleManager['otbPreviewOrderClear'](),this['_partyCommandWindow']['setup'](),this[_0x599c81(0x346)][_0x599c81(0x3df)]();},VisuMZ['BattleSystemOTB'][_0x482619(0x31c)]=Scene_Battle['prototype'][_0x482619(0x43e)],Scene_Battle[_0x482619(0x357)][_0x482619(0x43e)]=function(){const _0x2b4c3d=_0x482619;if(BattleManager[_0x2b4c3d(0x36a)]()){if(_0x2b4c3d(0x20f)!==_0x2b4c3d(0x20f))return _0xce3e6c['isOTB']();else this[_0x2b4c3d(0x361)]();}else VisuMZ[_0x2b4c3d(0x27a)]['Scene_Battle_commandFight']['call'](this);},VisuMZ[_0x482619(0x27a)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x482619(0x357)][_0x482619(0x3cc)],Scene_Battle[_0x482619(0x357)]['createAllWindows']=function(){const _0x586e70=_0x482619;VisuMZ['BattleSystemOTB'][_0x586e70(0x387)]['call'](this),this[_0x586e70(0x3ce)]();},Scene_Battle['prototype']['createOTBTurnOrderWindow']=function(){const _0x3b1206=_0x482619;if(!BattleManager[_0x3b1206(0x36a)]())return;this[_0x3b1206(0x3af)]=new Window_OTB_TurnOrder();const _0x4e15a5=this['getChildIndex'](this[_0x3b1206(0x392)]);this[_0x3b1206(0x20d)](this[_0x3b1206(0x3af)],_0x4e15a5),this['repositionLogWindowOTB'](),SceneManager[_0x3b1206(0x212)]()&&this['_otbTurnOrderWindow']['resumeTurnOrderSprites']();},Scene_Battle[_0x482619(0x357)][_0x482619(0x383)]=function(){const _0x3b45e4=_0x482619,_0x5a015d=Window_OTB_TurnOrder[_0x3b45e4(0x356)];if(_0x5a015d[_0x3b45e4(0x409)]!==_0x3b45e4(0x41a))return;if(!_0x5a015d[_0x3b45e4(0x433)])return;if(!this[_0x3b45e4(0x1ce)])return;const _0x324439=this[_0x3b45e4(0x3af)]['y']-Math[_0x3b45e4(0x29a)]((Graphics[_0x3b45e4(0x1e9)]-Graphics['boxHeight'])/0x2),_0xdc9ddd=_0x324439+this[_0x3b45e4(0x3af)][_0x3b45e4(0x1e9)];this['_logWindow']['y']=_0xdc9ddd+(_0x5a015d[_0x3b45e4(0x3e4)]||0x0);},VisuMZ['BattleSystemOTB']['Scene_Battle_commandAttack']=Scene_Battle[_0x482619(0x357)]['commandAttack'],Scene_Battle[_0x482619(0x357)][_0x482619(0x247)]=function(){const _0x461d65=_0x482619;BattleManager[_0x461d65(0x416)](),VisuMZ[_0x461d65(0x27a)]['Scene_Battle_commandAttack'][_0x461d65(0x227)](this);},VisuMZ[_0x482619(0x27a)]['Scene_Battle_commandGuard']=Scene_Battle[_0x482619(0x357)]['commandGuard'],Scene_Battle[_0x482619(0x357)][_0x482619(0x2ec)]=function(){const _0xb5c248=_0x482619;BattleManager[_0xb5c248(0x416)](),VisuMZ[_0xb5c248(0x27a)][_0xb5c248(0x1d6)][_0xb5c248(0x227)](this);},VisuMZ[_0x482619(0x27a)]['Scene_Battle_onActorOk']=Scene_Battle['prototype'][_0x482619(0x415)],Scene_Battle[_0x482619(0x357)][_0x482619(0x415)]=function(){const _0x389832=_0x482619;BattleManager[_0x389832(0x416)](),VisuMZ[_0x389832(0x27a)][_0x389832(0x374)][_0x389832(0x227)](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x343)]=Scene_Battle[_0x482619(0x357)]['onActorCancel'],Scene_Battle[_0x482619(0x357)][_0x482619(0x345)]=function(){const _0x1bd476=_0x482619;BattleManager[_0x1bd476(0x416)](),VisuMZ[_0x1bd476(0x27a)][_0x1bd476(0x343)]['call'](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x290)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x38d)],Scene_Battle['prototype'][_0x482619(0x38d)]=function(){const _0x5c217d=_0x482619;BattleManager[_0x5c217d(0x416)](),VisuMZ['BattleSystemOTB']['Scene_Battle_onEnemyOk']['call'](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x3fc)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x29e)],Scene_Battle[_0x482619(0x357)][_0x482619(0x29e)]=function(){const _0x4e7c5b=_0x482619;BattleManager[_0x4e7c5b(0x416)](),VisuMZ[_0x4e7c5b(0x27a)]['Scene_Battle_onEnemyCancel']['call'](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x447)]=Scene_Battle[_0x482619(0x357)]['onSkillOk'],Scene_Battle['prototype']['onSkillOk']=function(){const _0x4b37c8=_0x482619;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x4b37c8(0x27a)][_0x4b37c8(0x447)]['call'](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x306)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x2f7)],Scene_Battle[_0x482619(0x357)][_0x482619(0x2f7)]=function(){const _0x451cba=_0x482619;BattleManager[_0x451cba(0x416)](),VisuMZ[_0x451cba(0x27a)][_0x451cba(0x306)]['call'](this);},VisuMZ[_0x482619(0x27a)]['Scene_Battle_onItemOk']=Scene_Battle['prototype']['onItemOk'],Scene_Battle['prototype'][_0x482619(0x36b)]=function(){const _0x3c4dd4=_0x482619;BattleManager[_0x3c4dd4(0x416)](),VisuMZ[_0x3c4dd4(0x27a)][_0x3c4dd4(0x431)][_0x3c4dd4(0x227)](this);},VisuMZ[_0x482619(0x27a)][_0x482619(0x305)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x1e4)],Scene_Battle[_0x482619(0x357)][_0x482619(0x1e4)]=function(){const _0x429513=_0x482619;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x429513(0x27a)][_0x429513(0x305)][_0x429513(0x227)](this);},VisuMZ['BattleSystemOTB'][_0x482619(0x1ed)]=Scene_Battle[_0x482619(0x357)][_0x482619(0x1fe)],Scene_Battle['prototype'][_0x482619(0x1fe)]=function(){const _0x464b07=_0x482619;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB'][_0x464b07(0x1ed)][_0x464b07(0x227)](this);};function Sprite_OTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_OTB_TurnOrder_Battler['prototype']=Object[_0x482619(0x2c3)](Sprite_Clickable[_0x482619(0x357)]),Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x35f)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x3f1)]=function(_0x2a059a,_0x59c383,_0x9432b5){const _0x5b4232=_0x482619;this[_0x5b4232(0x260)](_0x2a059a,_0x59c383,_0x9432b5),Sprite_Clickable[_0x5b4232(0x357)]['initialize'][_0x5b4232(0x227)](this),this[_0x5b4232(0x358)]=0x0,this[_0x5b4232(0x1db)](),this['checkOpacity']();},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['initMembers']=function(_0x1076ca,_0x413608,_0x1ccb09){const _0x302c32=_0x482619;this[_0x302c32(0x1ea)]=_0x1076ca[_0x302c32(0x3d6)]()?$gameParty:$gameTroop,this[_0x302c32(0x2b2)]=_0x1076ca[_0x302c32(0x35e)](),this[_0x302c32(0x2c6)]=_0x413608,this[_0x302c32(0x388)]=_0x1ccb09;const _0x23955e=Window_OTB_TurnOrder[_0x302c32(0x356)],_0x3f897c=this['isHorz']();this[_0x302c32(0x3e6)]=0x0,this[_0x302c32(0x2c4)]=_0x23955e[_0x302c32(0x232)]?-_0x23955e[_0x302c32(0x2b9)]:this['containerWindow']()[_0x302c32(0x1dc)],this[_0x302c32(0x2bf)]=0x0,this[_0x302c32(0x307)]=0x0,this['_fadeTarget']=0xff,this[_0x302c32(0x209)]=![],this[_0x302c32(0x384)]=![],this[_0x302c32(0x273)]=0x0,this[_0x302c32(0x312)]=0x0;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['createChildren']=function(){const _0x4f65a2=_0x482619;this['createInitialPositions'](),this[_0x4f65a2(0x215)](),this['createGraphicSprite'](),this[_0x4f65a2(0x437)](),this[_0x4f65a2(0x3f2)]();},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x27d)]=function(){const _0xd93002=_0x482619;this['x']=this[_0xd93002(0x2c4)],this['y']=this['_positionTargetY'];},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['isHorz']=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x27f)]=function(){const _0x49271b=_0x482619,_0x3dcdbb=Window_OTB_TurnOrder[_0x49271b(0x356)];return _0x3dcdbb[_0x49271b(0x2b9)];},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['bitmapHeight']=function(){const _0x426070=_0x482619,_0x4e1d53=Window_OTB_TurnOrder[_0x426070(0x356)];return _0x4e1d53[_0x426070(0x202)];},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x30e)]=function(){const _0x27cd7b=_0x482619;return this[_0x27cd7b(0x1ea)]===$gameParty?'Actor':_0x27cd7b(0x390);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['createBackgroundSprite']=function(){const _0x23359f=_0x482619;if(!Window_OTB_TurnOrder[_0x23359f(0x356)]['ShowMarkerBg'])return;const _0x198892=Window_OTB_TurnOrder['Settings'],_0x28ad02=this[_0x23359f(0x30e)](),_0x461896='%1SystemBg'[_0x23359f(0x31a)](_0x28ad02),_0x46dca8=new Sprite();_0x46dca8[_0x23359f(0x2dd)]['x']=this[_0x23359f(0x2dd)]['x'],_0x46dca8['anchor']['y']=this['anchor']['y'];if(_0x198892[_0x461896])_0x46dca8['bitmap']=ImageManager[_0x23359f(0x45a)](_0x198892[_0x461896]);else{const _0x2c4798=this[_0x23359f(0x27f)](),_0x257232=this[_0x23359f(0x3e7)]();_0x46dca8[_0x23359f(0x2fc)]=new Bitmap(_0x2c4798,_0x257232);const _0xa35e32=ColorManager[_0x23359f(0x3e3)](_0x198892[_0x23359f(0x2b1)[_0x23359f(0x31a)](_0x28ad02)]),_0x113d72=ColorManager['getColor'](_0x198892[_0x23359f(0x3d2)['format'](_0x28ad02)]);_0x46dca8[_0x23359f(0x2fc)]['gradientFillRect'](0x0,0x0,_0x2c4798,_0x257232,_0xa35e32,_0x113d72,!![]);}this[_0x23359f(0x263)]=_0x46dca8,this['addChild'](this[_0x23359f(0x263)]),this['width']=this[_0x23359f(0x263)][_0x23359f(0x1dc)],this[_0x23359f(0x1e9)]=this['_backgroundSprite'][_0x23359f(0x1e9)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x308)]=function(){const _0x1601db=_0x482619,_0x452370=new Sprite();_0x452370['anchor']['x']=this[_0x1601db(0x2dd)]['x'],_0x452370[_0x1601db(0x2dd)]['y']=this[_0x1601db(0x2dd)]['y'],this[_0x1601db(0x2f8)]=_0x452370,this[_0x1601db(0x355)](this[_0x1601db(0x2f8)]),this[_0x1601db(0x2a7)]();},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['createBorderSprite']=function(){const _0x5f386d=_0x482619;if(!Window_OTB_TurnOrder[_0x5f386d(0x356)][_0x5f386d(0x370)])return;const _0x2b8dfa=Window_OTB_TurnOrder['Settings'],_0x449f5c=this[_0x5f386d(0x30e)](),_0x480494=_0x5f386d(0x2f4)[_0x5f386d(0x31a)](_0x449f5c),_0x41df1c=new Sprite();_0x41df1c[_0x5f386d(0x2dd)]['x']=this['anchor']['x'],_0x41df1c[_0x5f386d(0x2dd)]['y']=this['anchor']['y'];if(_0x2b8dfa[_0x480494])_0x41df1c[_0x5f386d(0x2fc)]=ImageManager[_0x5f386d(0x45a)](_0x2b8dfa[_0x480494]);else{let _0x5e3b72=this[_0x5f386d(0x27f)](),_0x2e261d=this[_0x5f386d(0x3e7)](),_0x5e5222=this[_0x5f386d(0x23f)]();_0x41df1c[_0x5f386d(0x2fc)]=new Bitmap(_0x5e3b72,_0x2e261d);const _0x3b3ad3=_0x5f386d(0x36d),_0x511e9e=ColorManager['getColor'](_0x2b8dfa['%1BorderColor'['format'](_0x449f5c)]);_0x41df1c[_0x5f386d(0x2fc)][_0x5f386d(0x371)](0x0,0x0,_0x5e3b72,_0x2e261d,_0x3b3ad3),_0x5e3b72-=0x2,_0x2e261d-=0x2,_0x41df1c['bitmap']['fillRect'](0x1,0x1,_0x5e3b72,_0x2e261d,_0x511e9e),_0x5e3b72-=_0x5e5222*0x2,_0x2e261d-=_0x5e5222*0x2,_0x41df1c[_0x5f386d(0x2fc)][_0x5f386d(0x371)](0x1+_0x5e5222,0x1+_0x5e5222,_0x5e3b72,_0x2e261d,_0x3b3ad3),_0x5e3b72-=0x2,_0x2e261d-=0x2,_0x5e5222+=0x1,_0x41df1c[_0x5f386d(0x2fc)][_0x5f386d(0x378)](0x1+_0x5e5222,0x1+_0x5e5222,_0x5e3b72,_0x2e261d);}this['_backgroundSprite']=_0x41df1c,this[_0x5f386d(0x355)](this['_backgroundSprite']);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x23f)]=function(){const _0x1b2684=_0x482619,_0x5cca6c=Window_OTB_TurnOrder[_0x1b2684(0x356)];return _0x5cca6c['BorderThickness'];},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x3f2)]=function(){const _0x5d36db=_0x482619,_0x5c8f5a=Window_OTB_TurnOrder[_0x5d36db(0x356)];if(!_0x5c8f5a['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x419882=this[_0x5d36db(0x27f)](),_0x2763e6=this[_0x5d36db(0x3e7)](),_0x51d5ba=new Sprite();_0x51d5ba[_0x5d36db(0x2dd)]['x']=this[_0x5d36db(0x2dd)]['x'],_0x51d5ba['anchor']['y']=this[_0x5d36db(0x2dd)]['y'],_0x51d5ba[_0x5d36db(0x2fc)]=new Bitmap(_0x419882,_0x2763e6),this[_0x5d36db(0x309)]=_0x51d5ba,this[_0x5d36db(0x355)](this['_letterSprite']);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x3eb)]=function(){const _0x40b95a=_0x482619;return this[_0x40b95a(0x1ea)]?this['_unit'][_0x40b95a(0x44b)]()[this[_0x40b95a(0x2b2)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x256)]=function(){const _0x5861c7=_0x482619;Sprite_Clickable['prototype'][_0x5861c7(0x256)][_0x5861c7(0x227)](this),this[_0x5861c7(0x34d)](),this['checkOpacity'](),this[_0x5861c7(0x21a)](),this[_0x5861c7(0x42d)](),this['updateGraphicHue'](),this[_0x5861c7(0x2f0)](),this['updateSelectionEffect']();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x3ac)]=function(_0x126132,_0x2292d4){const _0xbd5a8b=_0x482619,_0x2bf9ad=Window_OTB_TurnOrder['Settings'];this['_positionDuration']=_0x2bf9ad['UpdateFrames'],this[_0xbd5a8b(0x2c4)]=_0x126132,this[_0xbd5a8b(0x2bf)]=_0x2292d4;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['updatePosition']=function(){const _0x3a5b70=_0x482619;if(this[_0x3a5b70(0x3e6)]>0x0){const _0x5881cc=this[_0x3a5b70(0x3e6)];this['x']=(this['x']*(_0x5881cc-0x1)+this[_0x3a5b70(0x2c4)])/_0x5881cc,this['y']=(this['y']*(_0x5881cc-0x1)+this[_0x3a5b70(0x2bf)])/_0x5881cc,this['_positionDuration']--;}if(this[_0x3a5b70(0x3e6)]<=0x0){this['x']=this[_0x3a5b70(0x2c4)],this['y']=this[_0x3a5b70(0x2bf)];if(this[_0x3a5b70(0x358)]<0xff&&!this[_0x3a5b70(0x352)]&&this[_0x3a5b70(0x307)]<=0x0){const _0x442c37=this['battler']();_0x442c37&&(this[_0x3a5b70(0x20e)]=_0x442c37[_0x3a5b70(0x407)]()&&_0x442c37[_0x3a5b70(0x336)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x3c7)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x40e)]=function(){const _0x30eea9=_0x482619;return SceneManager['_scene'][_0x30eea9(0x3af)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x31e)]=function(){const _0x478d22=_0x482619,_0x17f695=this[_0x478d22(0x3eb)]();if(!_0x17f695)return this[_0x478d22(0x3c7)]();if(_0x17f695===BattleManager['_subject']){if('RNoGt'===_0x478d22(0x444))return 0x0;else this[_0x478d22(0x25e)][_0x478d22(0x399)]();}if(BattleManager[_0x478d22(0x25f)][_0x478d22(0x21b)](_0x17f695)){if(_0x478d22(0x291)==='fkZOM'){const _0x150284=BattleManager[_0x478d22(0x25f)][_0x478d22(0x360)](_0x17f695)+0x1;return _0x150284;}else{if(!_0x52eb8a)return![];if(!_0x4d970e['isAlive']())return![];if(!_0x45a60d[_0x478d22(0x336)]())return![];return _0x5d3b9e[_0x478d22(0x3dd)]();}}return this[_0x478d22(0x3c7)]();},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x41c)]=function(_0x2513de){const _0x37f482=_0x482619,_0x590aaa=Window_OTB_TurnOrder[_0x37f482(0x356)];this[_0x37f482(0x307)]=_0x590aaa[_0x37f482(0x344)],this[_0x37f482(0x20e)]=_0x2513de;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x320)]=function(){const _0x24641a=_0x482619,_0x2a66ad=this[_0x24641a(0x3eb)]();if(!_0x2a66ad)return;if(this['_isAlive']===_0x2a66ad[_0x24641a(0x407)]()&&this['_isAppeared']===_0x2a66ad[_0x24641a(0x336)]())return;this[_0x24641a(0x209)]=_0x2a66ad['isAlive'](),this[_0x24641a(0x384)]=_0x2a66ad['isAppeared']();let _0x104360=this[_0x24641a(0x209)]&&this[_0x24641a(0x384)]?0xff:0x0;this[_0x24641a(0x41c)](_0x104360);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x21a)]=function(){const _0x195037=_0x482619;if(this[_0x195037(0x307)]>0x0){const _0x5603ac=this[_0x195037(0x307)];this[_0x195037(0x358)]=(this['opacity']*(_0x5603ac-0x1)+this[_0x195037(0x20e)])/_0x5603ac,this[_0x195037(0x307)]--,this[_0x195037(0x307)]<=0x0&&(this[_0x195037(0x358)]=this['_fadeTarget']);}if(this[_0x195037(0x352)])return;BattleManager['_phase']===_0x195037(0x45b)&&(this['_isBattleOver']=!![],this['startFade'](0x0));},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x42d)]=function(){const _0x5df337=_0x482619,_0x2fa730=this[_0x5df337(0x3eb)]();if(!_0x2fa730)return;const _0x4cdb63=Window_OTB_TurnOrder[_0x5df337(0x356)],_0x2e8471=this[_0x5df337(0x1ea)]===$gameParty?'Actor':_0x5df337(0x390);let _0x34e2d9=_0x2fa730['TurnOrderOTBGraphicType']();if(_0x2fa730[_0x5df337(0x3d6)]()&&_0x34e2d9==='enemy'){if('vPalh'!==_0x5df337(0x31b)){if(this[_0x5df337(0x3b7)]()===_0x2dd1b7)return![];return!![];}else _0x34e2d9=_0x5df337(0x28e);}else _0x2fa730[_0x5df337(0x2d9)]()&&_0x34e2d9===_0x5df337(0x2b3)&&(_0x34e2d9=_0x5df337(0x367));if(this['_graphicType']!==_0x34e2d9){if(_0x5df337(0x3f3)!=='HzgCT')_0x1b9fa1[_0x5df337(0x357)]['moveToPosition']['call'](this,_0x5db7b5,_0x57fcf8),this['x']=this[_0x5df337(0x2c4)],this['y']=this[_0x5df337(0x2bf)];else return this[_0x5df337(0x2a7)]();}switch(this[_0x5df337(0x2d7)]){case _0x5df337(0x28e):if(this[_0x5df337(0x3f4)]!==_0x2fa730[_0x5df337(0x23c)]())return this[_0x5df337(0x2a7)]();if(this[_0x5df337(0x413)]!==_0x2fa730['TurnOrderOTBGraphicFaceIndex']())return this[_0x5df337(0x2a7)]();break;case _0x5df337(0x381):if(this[_0x5df337(0x2d4)]!==_0x2fa730[_0x5df337(0x258)]())return this[_0x5df337(0x2a7)]();break;case _0x5df337(0x367):if(_0x2fa730['hasSvBattler']()){if(this[_0x5df337(0x213)]!==_0x2fa730['svBattlerName']())return this[_0x5df337(0x2a7)]();}else{if(this[_0x5df337(0x426)]!==_0x2fa730[_0x5df337(0x424)]()){if(_0x5df337(0x2e2)===_0x5df337(0x29f))this[_0x5df337(0x3b2)]=this[_0x5df337(0x3cd)]();else return this['processUpdateGraphic']();}}break;case _0x5df337(0x2b3):if(_0x2fa730['isActor']()){if('GiBAR'===_0x5df337(0x3a4)){if(this[_0x5df337(0x213)]!==_0x2fa730['battlerName']())return this[_0x5df337(0x2a7)]();}else{const _0x35e4e8=_0xb0aff9[_0x5df337(0x356)];if(_0x35e4e8[_0x5df337(0x409)]!==_0x5df337(0x41a))return;if(!_0x35e4e8[_0x5df337(0x433)])return;if(!this['_logWindow'])return;const _0x4af2d6=this[_0x5df337(0x3af)]['y']-_0x4c62f4[_0x5df337(0x29a)]((_0x125877['height']-_0x6dd999['boxHeight'])/0x2),_0x1f0c13=_0x4af2d6+this[_0x5df337(0x3af)]['height'];this[_0x5df337(0x1ce)]['y']=_0x1f0c13+(_0x35e4e8[_0x5df337(0x3e4)]||0x0);}}else{if(this[_0x5df337(0x426)]!==_0x2fa730[_0x5df337(0x424)]())return _0x5df337(0x3f9)===_0x5df337(0x3f0)?'icon':this[_0x5df337(0x2a7)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x2a7)]=function(){const _0xd1173e=_0x482619,_0x5c5895=this[_0xd1173e(0x3eb)]();if(!_0x5c5895)return;this[_0xd1173e(0x2d7)]=_0x5c5895[_0xd1173e(0x458)]();if(_0x5c5895[_0xd1173e(0x3d6)]()&&this[_0xd1173e(0x2d7)]==='enemy')_0xd1173e(0x3cb)!==_0xd1173e(0x24e)?this[_0xd1173e(0x2d7)]=_0xd1173e(0x28e):_0x1bf34e[_0xd1173e(0x419)]();else _0x5c5895[_0xd1173e(0x2d9)]()&&this['_graphicType']===_0xd1173e(0x2b3)&&(this[_0xd1173e(0x2d7)]='enemy');let _0x229179;switch(this[_0xd1173e(0x2d7)]){case _0xd1173e(0x28e):this['_graphicFaceName']=_0x5c5895[_0xd1173e(0x23c)](),this[_0xd1173e(0x413)]=_0x5c5895[_0xd1173e(0x21f)](),_0x229179=ImageManager[_0xd1173e(0x445)](this[_0xd1173e(0x3f4)]),_0x229179[_0xd1173e(0x34e)](this[_0xd1173e(0x3c1)][_0xd1173e(0x303)](this,_0x229179));break;case _0xd1173e(0x381):this[_0xd1173e(0x2d4)]=_0x5c5895[_0xd1173e(0x293)](),_0x229179=ImageManager['loadSystem']('IconSet'),_0x229179[_0xd1173e(0x34e)](this[_0xd1173e(0x406)]['bind'](this,_0x229179));break;case _0xd1173e(0x367):if(_0x5c5895[_0xd1173e(0x3b5)]())_0xd1173e(0x321)===_0xd1173e(0x321)?(this[_0xd1173e(0x213)]=_0x5c5895[_0xd1173e(0x24b)](),_0x229179=ImageManager['loadSvActor'](this[_0xd1173e(0x213)]),_0x229179[_0xd1173e(0x34e)](this[_0xd1173e(0x35c)][_0xd1173e(0x303)](this,_0x229179))):(_0x39879f[_0xd1173e(0x2c6)]=_0x586a3f[_0xd1173e(0x2c6)]||0x0,_0x269264[_0xd1173e(0x2c6)]++);else{if($gameSystem[_0xd1173e(0x35d)]())this['_graphicEnemy']=_0x5c5895[_0xd1173e(0x424)](),_0x229179=ImageManager[_0xd1173e(0x2d2)](this[_0xd1173e(0x426)]),_0x229179['addLoadListener'](this[_0xd1173e(0x1ee)]['bind'](this,_0x229179));else{if(_0xd1173e(0x284)===_0xd1173e(0x34f))return _0x45dca4[_0xd1173e(0x356)][_0xd1173e(0x1ca)];else this[_0xd1173e(0x426)]=_0x5c5895[_0xd1173e(0x424)](),_0x229179=ImageManager['loadEnemy'](this['_graphicEnemy']),_0x229179[_0xd1173e(0x34e)](this[_0xd1173e(0x1ee)][_0xd1173e(0x303)](this,_0x229179));}}break;case _0xd1173e(0x2b3):this[_0xd1173e(0x213)]=_0x5c5895[_0xd1173e(0x424)](),_0x229179=ImageManager['loadSvActor'](this['_graphicSv']),_0x229179[_0xd1173e(0x34e)](this[_0xd1173e(0x35c)][_0xd1173e(0x303)](this,_0x229179));break;}},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x3c1)]=function(_0x3f426d){const _0x5676d8=_0x482619,_0x45aec8=this[_0x5676d8(0x413)],_0x3cf3b3=this['bitmapWidth'](),_0x2b7536=this[_0x5676d8(0x3e7)](),_0x505944=Math[_0x5676d8(0x2e6)](_0x3cf3b3,_0x2b7536);this[_0x5676d8(0x2f8)][_0x5676d8(0x2fc)]=new Bitmap(_0x3cf3b3,_0x2b7536);const _0x1039e6=this['_graphicSprite']['bitmap'],_0xe4bae6=ImageManager['faceWidth'],_0x3875e6=ImageManager[_0x5676d8(0x45d)],_0xab147d=_0x505944/Math[_0x5676d8(0x2e6)](_0xe4bae6,_0x3875e6),_0x1a75b7=ImageManager[_0x5676d8(0x3e9)],_0x5bba1e=ImageManager[_0x5676d8(0x45d)],_0x151e7e=_0x45aec8%0x4*_0xe4bae6+(_0xe4bae6-_0x1a75b7)/0x2,_0x390f76=Math[_0x5676d8(0x36f)](_0x45aec8/0x4)*_0x3875e6+(_0x3875e6-_0x5bba1e)/0x2,_0x53a432=(_0x3cf3b3-_0xe4bae6*_0xab147d)/0x2,_0x1503da=(_0x2b7536-_0x3875e6*_0xab147d)/0x2;_0x1039e6['blt'](_0x3f426d,_0x151e7e,_0x390f76,_0x1a75b7,_0x5bba1e,_0x53a432,_0x1503da,_0x505944,_0x505944);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x482619(0x406)]=function(_0x4c41cc){const _0x2bc3e9=_0x482619,_0x1b0718=this[_0x2bc3e9(0x2d4)],_0x3f4424=this['bitmapWidth'](),_0x31e79b=this[_0x2bc3e9(0x3e7)]();this[_0x2bc3e9(0x2f8)][_0x2bc3e9(0x2fc)]=new Bitmap(_0x3f4424,_0x31e79b);const _0x1abb28=this[_0x2bc3e9(0x2f8)][_0x2bc3e9(0x2fc)],_0x23c39d=ImageManager['iconWidth'],_0x17be31=ImageManager[_0x2bc3e9(0x37d)],_0xc3f9e0=Math['min'](_0x23c39d,_0x17be31,_0x3f4424,_0x31e79b),_0x4b718f=_0x1b0718%0x10*_0x23c39d,_0x4e4ad1=Math['floor'](_0x1b0718/0x10)*_0x17be31,_0x8d495c=Math['floor'](Math[_0x2bc3e9(0x2e6)](_0x3f4424-_0xc3f9e0,0x0)/0x2),_0x2945f0=Math['floor'](Math[_0x2bc3e9(0x2e6)](_0x31e79b-_0xc3f9e0,0x0)/0x2);_0x1abb28['blt'](_0x4c41cc,_0x4b718f,_0x4e4ad1,_0x23c39d,_0x17be31,_0x8d495c,_0x2945f0,_0xc3f9e0,_0xc3f9e0);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x35c)]=function(_0x1f0b76){const _0x1dfba1=_0x482619,_0x2f6169=this[_0x1dfba1(0x27f)](),_0x26c830=this[_0x1dfba1(0x3e7)](),_0x1051bb=Math['min'](_0x2f6169,_0x26c830);this[_0x1dfba1(0x2f8)]['bitmap']=new Bitmap(_0x2f6169,_0x26c830);const _0x310de2=this[_0x1dfba1(0x2f8)][_0x1dfba1(0x2fc)],_0x554f76=0x9,_0x192c5c=0x6,_0x233348=_0x1f0b76['width']/_0x554f76,_0x10b142=_0x1f0b76[_0x1dfba1(0x1e9)]/_0x192c5c,_0x5d988f=Math[_0x1dfba1(0x368)](0x1,_0x1051bb/_0x233348,_0x1051bb/_0x10b142),_0x555446=_0x233348*_0x5d988f,_0xefe928=_0x10b142*_0x5d988f,_0x137aff=Math[_0x1dfba1(0x29a)]((_0x2f6169-_0x555446)/0x2),_0x49fcd4=Math['round']((_0x26c830-_0xefe928)/0x2);_0x310de2[_0x1dfba1(0x208)](_0x1f0b76,0x0,0x0,_0x233348,_0x10b142,_0x137aff,_0x49fcd4,_0x555446,_0xefe928);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x1ee)]=function(_0x572fb8){const _0x42301c=_0x482619,_0x5609ff=Window_OTB_TurnOrder[_0x42301c(0x356)],_0x559466=this['bitmapWidth'](),_0x1c8aff=this[_0x42301c(0x3e7)](),_0xff52ce=Math['min'](_0x559466,_0x1c8aff);this['_graphicSprite'][_0x42301c(0x2fc)]=new Bitmap(_0x559466,_0x1c8aff);const _0x255366=this['_graphicSprite'][_0x42301c(0x2fc)],_0x27d9b4=Math[_0x42301c(0x368)](0x1,_0xff52ce/_0x572fb8['width'],_0xff52ce/_0x572fb8[_0x42301c(0x1e9)]),_0x444a54=_0x572fb8[_0x42301c(0x1dc)]*_0x27d9b4,_0x3928ab=_0x572fb8[_0x42301c(0x1e9)]*_0x27d9b4,_0x7beebd=Math[_0x42301c(0x29a)]((_0x559466-_0x444a54)/0x2),_0x102d2f=Math[_0x42301c(0x29a)]((_0x1c8aff-_0x3928ab)/0x2);_0x255366[_0x42301c(0x208)](_0x572fb8,0x0,0x0,_0x572fb8[_0x42301c(0x1dc)],_0x572fb8[_0x42301c(0x1e9)],_0x7beebd,_0x102d2f,_0x444a54,_0x3928ab);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['updateGraphicHue']=function(){const _0x50d8f6=_0x482619,_0x322d3c=this[_0x50d8f6(0x3eb)]();if(!_0x322d3c)return;if(!_0x322d3c['isEnemy']())return;if(this[_0x50d8f6(0x300)]===_0x322d3c[_0x50d8f6(0x32d)]())return;this[_0x50d8f6(0x300)]=_0x322d3c[_0x50d8f6(0x32d)]();if(_0x322d3c[_0x50d8f6(0x3b5)]())this[_0x50d8f6(0x300)]=0x0;this[_0x50d8f6(0x2f8)]['setHue'](this[_0x50d8f6(0x300)]);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x2f0)]=function(){const _0x335ab4=_0x482619;if(!this[_0x335ab4(0x309)])return;const _0x4cf9c8=this[_0x335ab4(0x3eb)]();if(!_0x4cf9c8)return;if(this[_0x335ab4(0x1f2)]===_0x4cf9c8[_0x335ab4(0x1f2)]&&this[_0x335ab4(0x26d)]===_0x4cf9c8[_0x335ab4(0x26d)])return;this[_0x335ab4(0x1f2)]=_0x4cf9c8[_0x335ab4(0x1f2)],this[_0x335ab4(0x26d)]=_0x4cf9c8[_0x335ab4(0x26d)];const _0x4899a6=Window_OTB_TurnOrder['Settings'],_0x4ac0f7=this[_0x335ab4(0x27f)](),_0x1916c1=this[_0x335ab4(0x3e7)](),_0x40b735=this['_letterSprite'][_0x335ab4(0x2fc)];_0x40b735[_0x335ab4(0x27b)]();if(!this[_0x335ab4(0x26d)])return;_0x40b735[_0x335ab4(0x2eb)]=_0x4899a6['EnemyBattlerFontFace']||$gameSystem[_0x335ab4(0x2f5)](),_0x40b735[_0x335ab4(0x37c)]=_0x4899a6[_0x335ab4(0x2a2)]||0x10,_0x4899a6[_0x335ab4(0x232)]?_0x40b735['drawText'](this['_letter'][_0x335ab4(0x2b8)](),_0x4ac0f7*0x1/0x8,_0x1916c1/0x2,_0x4ac0f7,_0x1916c1/0x2,_0x335ab4(0x30d)):_0x40b735[_0x335ab4(0x298)](this[_0x335ab4(0x1f2)][_0x335ab4(0x2b8)](),0x0,_0x1916c1/0x2,_0x4ac0f7*0x7/0x8,_0x1916c1/0x2,_0x335ab4(0x259));},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x229)]=function(){const _0x3a21b0=_0x482619,_0x53e0fe=this['battler']();if(!_0x53e0fe)return;const _0x51dbe6=_0x53e0fe[_0x3a21b0(0x3eb)]();if(!_0x51dbe6)return;const _0x5b68aa=_0x51dbe6[_0x3a21b0(0x44d)]();if(!_0x5b68aa)return;this[_0x3a21b0(0x3aa)](_0x5b68aa[_0x3a21b0(0x2d0)]);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x3f6)]=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x379)]=function(_0x57ac8c){const _0xd2cb9e=_0x482619;this[_0xd2cb9e(0x388)]=_0x57ac8c,this[_0xd2cb9e(0x1d5)]();if(this[_0xd2cb9e(0x388)]===null){if(_0xd2cb9e(0x210)===_0xd2cb9e(0x210))this['_instance']=-0x1;else{const _0x311246=this[_0xd2cb9e(0x3eb)]();if(!_0x311246)return;const _0x370e50=_0x311246[_0xd2cb9e(0x3eb)]();if(!_0x370e50)return;const _0x365736=_0x370e50[_0xd2cb9e(0x44d)]();if(!_0x365736)return;this[_0xd2cb9e(0x3aa)](_0x365736['_blendColor']);}}},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]['calculateTargetPositions']=function(){const _0x1a1095=_0x482619,_0x5b200d=this[_0x1a1095(0x40e)]();if(!_0x5b200d)return;const _0x15dd00=Window_OTB_TurnOrder[_0x1a1095(0x356)],_0x5bd873=_0x15dd00[_0x1a1095(0x232)],_0x3a918a=this[_0x1a1095(0x388)]===_0x5b200d[_0x1a1095(0x22c)]?!![]:![],_0x31dc63=this[_0x1a1095(0x2c6)]===-0x1&&BattleManager[_0x1a1095(0x25e)]===this['battler'](),_0xc5892e=_0x5b200d[_0x1a1095(0x2e3)]-_0x15dd00[_0x1a1095(0x2b9)];let _0xef3f3d=Math[_0x1a1095(0x239)](_0xc5892e/(this['_sourceArray']['length']-0x1||0x1));_0xef3f3d=Math[_0x1a1095(0x368)](_0x15dd00[_0x1a1095(0x2b9)],_0xef3f3d);let _0x4d50e7=0x0,_0x55ae19=0x0,_0x30ce87=_0x31dc63?-0x1:this[_0x1a1095(0x388)][_0x1a1095(0x360)](this);!_0x31dc63&&(_0x30ce87=this[_0x1a1095(0x435)]());if(_0x31dc63){if(_0x1a1095(0x36c)===_0x1a1095(0x36c))_0x4d50e7=_0x5b200d[_0x1a1095(0x326)];else return _0x4e885d[_0x1a1095(0x36a)]()?_0xd9a035[_0x1a1095(0x27a)]['Settings'][_0x1a1095(0x21c)][_0x1a1095(0x3c3)]:_0x4ae778[_0x1a1095(0x27a)][_0x1a1095(0x421)][_0x1a1095(0x227)](this);}else _0x5bd873?(_0x4d50e7=(_0x3a918a?_0x5b200d[_0x1a1095(0x297)]:_0x5b200d[_0x1a1095(0x33f)])+_0xc5892e,_0x4d50e7-=_0x30ce87*_0xef3f3d):(_0x4d50e7=_0x3a918a?_0x5b200d[_0x1a1095(0x297)]:_0x5b200d['_currentX'],_0x4d50e7+=_0x30ce87*_0xef3f3d);_0x4d50e7+=this[_0x1a1095(0x219)](_0x30ce87,_0x15dd00[_0x1a1095(0x2b9)]-_0xef3f3d);if(!_0x31dc63&&_0x30ce87<0x0){if('RpxEi'===_0x1a1095(0x3dc)){const _0x28af3d=this[_0x1a1095(0x3eb)]();if(!_0x28af3d)return;if(this[_0x1a1095(0x209)]===_0x28af3d[_0x1a1095(0x407)]()&&this[_0x1a1095(0x384)]===_0x28af3d['isAppeared']())return;this[_0x1a1095(0x209)]=_0x28af3d[_0x1a1095(0x407)](),this['_isAppeared']=_0x28af3d[_0x1a1095(0x336)]();let _0x4357e3=this['_isAlive']&&this[_0x1a1095(0x384)]?0xff:0x0;this[_0x1a1095(0x41c)](_0x4357e3);}else _0x4d50e7=this['x'],_0x55ae19=this['y'],this[_0x1a1095(0x41c)](0x0);}this['moveToPosition'](_0x4d50e7,_0x55ae19);},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x219)]=function(_0x21b958,_0x462176){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)][_0x482619(0x435)]=function(){const _0x1bfb7f=_0x482619,_0x59b70b=this['containerWindow']();if(!_0x59b70b)return 0x0;const _0x1f687b=this['_sourceArray']===_0x59b70b[_0x1bfb7f(0x22c)]?!![]:![],_0x32ab25=_0x1f687b?BattleManager[_0x1bfb7f(0x1d2)]:BattleManager[_0x1bfb7f(0x25f)],_0x56328c=this['battler'](),_0xb2ac2a=VisuMZ[_0x1bfb7f(0x27a)][_0x1bfb7f(0x1e1)](_0x56328c,_0x32ab25);return _0xb2ac2a[this[_0x1bfb7f(0x2c6)]]??_0xb2ac2a[_0xb2ac2a[_0x1bfb7f(0x3b8)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){const _0x7e1205=_0x482619;this[_0x7e1205(0x3f1)](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)]=Object[_0x482619(0x2c3)](Sprite_OTB_TurnOrder_Battler[_0x482619(0x357)]),Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x35f)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x3f1)]=function(_0x245e68,_0x338a66,_0x13f408,_0x5b989f){const _0x44df85=_0x482619;this[_0x44df85(0x301)]=_0x5b989f,Sprite_OTB_TurnOrder_Battler['prototype'][_0x44df85(0x3f1)][_0x44df85(0x227)](this,_0x245e68,_0x338a66,_0x13f408),this['adjustForPreview']();},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x3ed)]=function(){const _0x77d266=_0x482619,_0x380cd7=Window_OTB_TurnOrder['Settings'];this[_0x77d266(0x3ba)]['x']=this[_0x77d266(0x3ba)]['y']=_0x380cd7[_0x77d266(0x42e)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x482619(0x30e)]=function(){const _0x7b3346=_0x482619;return this[_0x7b3346(0x1ea)]===$gameParty?'PreviewActor':_0x7b3346(0x2f6);},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x23f)]=function(){const _0x3927ac=_0x482619,_0x74fc57=Window_OTB_TurnOrder[_0x3927ac(0x356)];return Math[_0x3927ac(0x239)](_0x74fc57[_0x3927ac(0x39c)]/(_0x74fc57[_0x3927ac(0x42e)]||0.01));},Sprite_OTB_TurnOrder_Preview['prototype'][_0x482619(0x3ac)]=function(_0x148085,_0x5a1482){const _0xbea25d=_0x482619;Sprite_OTB_TurnOrder_Battler[_0xbea25d(0x357)][_0xbea25d(0x3ac)][_0xbea25d(0x227)](this,_0x148085,_0x5a1482),this['x']=this[_0xbea25d(0x2c4)],this['y']=this[_0xbea25d(0x2bf)];},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x41c)]=function(_0xf563e8){const _0xa338=_0x482619;Sprite_OTB_TurnOrder_Battler['prototype'][_0xa338(0x41c)]['call'](this,_0xf563e8),_0xf563e8>0x0?this[_0xa338(0x307)]=0x1:_0xa338(0x446)===_0xa338(0x446)?(this[_0xa338(0x307)]/=0x2,this[_0xa338(0x307)]=Math[_0xa338(0x36f)](this[_0xa338(0x307)])):(this['preEndActionOTB'](),_0x46bc35['BattleSystemOTB'][_0xa338(0x3c4)][_0xa338(0x227)](this),this[_0xa338(0x37a)]());},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x219)]=function(_0x1ae143,_0x2ffd04){const _0x3aa1a1=_0x482619,_0x4841eb=Window_OTB_TurnOrder[_0x3aa1a1(0x356)];if(_0x1ae143>0x0){if(this[_0x3aa1a1(0x301)]>0x0){if(_0x4841eb['OrderDirection'])return-_0x4841eb[_0x3aa1a1(0x2b9)];else{if(_0x3aa1a1(0x1f9)===_0x3aa1a1(0x347))_0x13bd25[_0x3aa1a1(0x2c1)](this);else return _0x4841eb['SpriteThin'];}}else{if(this[_0x3aa1a1(0x301)]<0x0){if(_0x3aa1a1(0x1e8)===_0x3aa1a1(0x1e8)){if(_0x4841eb[_0x3aa1a1(0x232)]){if(_0x3aa1a1(0x39f)==='pgFjx')return-_0x2ffd04;else _0x313230[_0x3aa1a1(0x2fc)]=_0x1532c8[_0x3aa1a1(0x45a)](_0x1c04f4[_0x1a72c7]);}else return'tdmuM'==='tdmuM'?_0x2ffd04:this['_scene']&&this['_scene']['constructor']===_0x236cb2;}else{const _0x22e559=new _0x4f80ed(_0x55bc14,-0x1,null);this['_spriteContainer'][_0x3aa1a1(0x355)](_0x22e559),this[_0x3aa1a1(0x25e)]=_0x22e559,_0x22e559[_0x3aa1a1(0x41c)](0xff),_0x22e559[_0x3aa1a1(0x3e6)]=0x258,_0x22e559['x']=this[_0x3aa1a1(0x326)],_0x22e559['_positionTargetX']=this[_0x3aa1a1(0x326)],_0x4567a3&&(_0x22e559[_0x3aa1a1(0x358)]=0xff);}}}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x435)]=function(){const _0x457e52=_0x482619,_0x3b4809=this[_0x457e52(0x40e)](),_0x31ce10=this[_0x457e52(0x388)]===_0x3b4809[_0x457e52(0x22c)]?!![]:![],_0x287194=_0x31ce10?BattleManager['_otb_actionBattlersNext']:BattleManager[_0x457e52(0x25f)];let _0x5b0dbf=0x0,_0x5c53c0=_0x287194[_0x457e52(0x3b8)]-0x1;if(_0x31ce10){if(_0x457e52(0x3fd)!==_0x457e52(0x456))_0x5b0dbf=Math[_0x457e52(0x2e6)](0x0,VisuMZ[_0x457e52(0x27a)][_0x457e52(0x30b)](_0x287194));else{if(!this['_spriteContainer'])return;const _0x1cf75d=_0x4ef782['Settings'],_0x394579=_0x1cf75d[_0x457e52(0x232)];_0x394579?this[_0x457e52(0x1f1)][_0x457e52(0x2e7)][_0x457e52(0x333)]((_0x433bb6,_0x456de3)=>_0x433bb6['x']-_0x456de3['x']):this['_spriteContainer']['children'][_0x457e52(0x333)]((_0x40e997,_0x415f8b)=>_0x415f8b['x']-_0x40e997['x']);}}let _0x4a9c23=Sprite_OTB_TurnOrder_Battler['prototype'][_0x457e52(0x435)][_0x457e52(0x227)](this);return _0x4a9c23+=this[_0x457e52(0x301)],_0x4a9c23[_0x457e52(0x2da)](_0x5b0dbf,_0x5c53c0);},Sprite_OTB_TurnOrder_Preview[_0x482619(0x357)][_0x482619(0x229)]=function(){},Window_Selectable[_0x482619(0x357)][_0x482619(0x2e9)]=function(){return![];},VisuMZ[_0x482619(0x27a)][_0x482619(0x325)]=Window_Selectable[_0x482619(0x357)][_0x482619(0x3f5)],Window_Selectable[_0x482619(0x357)]['select']=function(_0x28df3e){const _0x57a695=_0x482619;VisuMZ[_0x57a695(0x27a)][_0x57a695(0x325)][_0x57a695(0x227)](this,_0x28df3e),this[_0x57a695(0x2e9)]()&&this['active']&&(_0x57a695(0x3b0)==='VmrlK'?this['applyBattleItemWindowOTB']():_0x252da0['bitmap']=_0x38a7bf[_0x57a695(0x45a)](_0xe56aba[_0x4b9880]));},Window_Selectable['prototype'][_0x482619(0x242)]=function(){const _0x1cf985=_0x482619;BattleManager[_0x1cf985(0x386)]();},VisuMZ[_0x482619(0x27a)]['Window_Help_setItem']=Window_Help[_0x482619(0x357)][_0x482619(0x341)],Window_Help[_0x482619(0x357)][_0x482619(0x341)]=function(_0x51bd84){const _0x218273=_0x482619;BattleManager['isOTB']()&&_0x51bd84&&_0x51bd84[_0x218273(0x430)]&&_0x51bd84[_0x218273(0x430)][_0x218273(0x354)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?_0x218273(0x25d)==='ZiIzO'?_0x213a73+=_0x20314c(_0x3e8020['$1']):this[_0x218273(0x2be)](String(RegExp['$1'])):VisuMZ[_0x218273(0x27a)][_0x218273(0x26a)][_0x218273(0x227)](this,_0x51bd84);},Window_ActorCommand[_0x482619(0x357)][_0x482619(0x2e9)]=function(){const _0x2f8006=_0x482619;return BattleManager[_0x2f8006(0x36a)]();},Window_ActorCommand[_0x482619(0x357)]['applyBattleItemWindowOTB']=function(){const _0x2f9aaa=_0x482619,_0xaed2c2=BattleManager[_0x2f9aaa(0x389)]();if(_0xaed2c2){const _0x1b3a1f=this[_0x2f9aaa(0x27e)]();switch(_0x1b3a1f){case _0x2f9aaa(0x39b):_0xaed2c2[_0x2f9aaa(0x1f5)]();break;case _0x2f9aaa(0x1d7):_0xaed2c2[_0x2f9aaa(0x3ae)]();break;case'singleSkill':_0xaed2c2[_0x2f9aaa(0x44f)](this[_0x2f9aaa(0x277)]());break;default:_0xaed2c2['setSkill'](null);break;}}Window_Command[_0x2f9aaa(0x357)][_0x2f9aaa(0x242)]['call'](this);},Window_BattleSkill[_0x482619(0x357)][_0x482619(0x2e9)]=function(){return BattleManager['isOTB']();},Window_BattleSkill[_0x482619(0x357)]['applyBattleItemWindowOTB']=function(){const _0x1b670a=_0x482619,_0x34b2d8=this[_0x1b670a(0x38c)](),_0x26af98=BattleManager[_0x1b670a(0x389)]();if(_0x26af98)_0x26af98[_0x1b670a(0x44f)](_0x34b2d8?_0x34b2d8['id']:null);Window_SkillList[_0x1b670a(0x357)][_0x1b670a(0x242)][_0x1b670a(0x227)](this);},Window_BattleItem['prototype'][_0x482619(0x2e9)]=function(){const _0x5d3a9e=_0x482619;return BattleManager[_0x5d3a9e(0x36a)]();},Window_BattleItem[_0x482619(0x357)]['applyBattleItemWindowOTB']=function(){const _0x5dac72=_0x482619,_0x2f8947=this[_0x5dac72(0x38c)](),_0x273654=BattleManager[_0x5dac72(0x389)]();if(_0x273654)_0x273654['setItem'](_0x2f8947?_0x2f8947['id']:null);Window_ItemList['prototype'][_0x5dac72(0x242)]['call'](this);},Window_BattleActor['prototype'][_0x482619(0x2e9)]=function(){const _0x579548=_0x482619;return BattleManager[_0x579548(0x36a)]();},Window_BattleEnemy[_0x482619(0x357)][_0x482619(0x2e9)]=function(){const _0x38cdd1=_0x482619;return BattleManager[_0x38cdd1(0x36a)]();};function Window_OTB_TurnOrder(){const _0x86f6c9=_0x482619;this[_0x86f6c9(0x3f1)](...arguments);}Window_OTB_TurnOrder[_0x482619(0x357)]=Object['create'](Window_Base[_0x482619(0x357)]),Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x35f)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x482619(0x356)]=VisuMZ[_0x482619(0x27a)][_0x482619(0x356)][_0x482619(0x394)],Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x3f1)]=function(){const _0x5aaf10=_0x482619,_0x4ee27f=this[_0x5aaf10(0x337)]();this[_0x5aaf10(0x41e)](_0x4ee27f),Window_Base['prototype'][_0x5aaf10(0x3f1)][_0x5aaf10(0x227)](this,_0x4ee27f),this[_0x5aaf10(0x358)]=0x0,this[_0x5aaf10(0x364)](),this['drawUiText'](),this[_0x5aaf10(0x265)](),this[_0x5aaf10(0x218)]();},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x337)]=function(){const _0x3baca6=_0x482619,_0x17d545=Window_OTB_TurnOrder[_0x3baca6(0x356)],_0x56afc6=SceneManager['_scene'][_0x3baca6(0x3bf)][_0x3baca6(0x1e9)];let _0x12c09a=Graphics[_0x3baca6(0x1dc)]-_0x17d545['ScreenBuffer']*0x2,_0x309152=_0x17d545[_0x3baca6(0x202)]+this['lineHeight'](),_0x1f1d84=_0x17d545['ScreenBuffer'],_0x2643cd=0x0;switch(_0x17d545[_0x3baca6(0x409)]){case _0x3baca6(0x2bb):_0x2643cd=Graphics['height']-_0x56afc6-_0x17d545['ScreenBuffer']-_0x309152;break;default:_0x2643cd=_0x17d545[_0x3baca6(0x32b)];break;}if(Imported[_0x3baca6(0x2c7)]&&BattleManager[_0x3baca6(0x43a)]()){const _0x1f1a7a=VisuMZ[_0x3baca6(0x2c5)]['Settings'][_0x3baca6(0x3b4)];_0x12c09a-=_0x1f1a7a[_0x3baca6(0x349)]+_0x1f1a7a[_0x3baca6(0x418)],_0x12c09a-=_0x17d545[_0x3baca6(0x32b)];}return _0x1f1d84+=_0x17d545[_0x3baca6(0x2a1)]||0x0,_0x2643cd+=_0x17d545['DisplayOffsetY']||0x0,new Rectangle(_0x1f1d84,_0x2643cd,_0x12c09a,_0x309152);},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x41e)]=function(_0x3e084a){const _0x2476b8=_0x482619;this['_targetHomeX']=this[_0x2476b8(0x3b1)]=_0x3e084a['x'],this[_0x2476b8(0x3be)]=this[_0x2476b8(0x2af)]=_0x3e084a['y'],this['_homeDuration']=0x0;const _0x40c724=Window_OTB_TurnOrder[_0x2476b8(0x356)];this[_0x2476b8(0x2e3)]=Math[_0x2476b8(0x239)]((_0x3e084a[_0x2476b8(0x1dc)]-_0x40c724[_0x2476b8(0x2b9)]-_0x40c724['SubjectDistance']*0x2)/0x2);if(_0x40c724['OrderDirection']){if(_0x2476b8(0x3a9)===_0x2476b8(0x40f)){const _0x299156=this[_0x2476b8(0x3dd)](),_0x2eb9ee=this[_0x2476b8(0x3bc)]();_0x2c3a7f['BattleSystemOTB'][_0x2476b8(0x410)][_0x2476b8(0x227)](this,_0x3746e8),this[_0x2476b8(0x1fc)](_0x299156,_0x2eb9ee);}else this[_0x2476b8(0x326)]=_0x3e084a[_0x2476b8(0x1dc)]-_0x40c724['SpriteThin'],this['_currentX']=this[_0x2476b8(0x2e3)]+_0x40c724[_0x2476b8(0x35a)],this[_0x2476b8(0x297)]=0x0;}else{if(_0x2476b8(0x393)===_0x2476b8(0x245)){if(this[_0x2476b8(0x307)]>0x0){const _0x4ad5ae=this[_0x2476b8(0x307)];this['opacity']=(this[_0x2476b8(0x358)]*(_0x4ad5ae-0x1)+this[_0x2476b8(0x20e)])/_0x4ad5ae,this[_0x2476b8(0x307)]--,this[_0x2476b8(0x307)]<=0x0&&(this[_0x2476b8(0x358)]=this[_0x2476b8(0x20e)]);}if(this[_0x2476b8(0x352)])return;_0x33130e[_0x2476b8(0x335)]===_0x2476b8(0x45b)&&(this[_0x2476b8(0x352)]=!![],this[_0x2476b8(0x41c)](0x0));}else this[_0x2476b8(0x326)]=0x0,this[_0x2476b8(0x33f)]=_0x40c724['SpriteThin']+_0x40c724[_0x2476b8(0x35a)],this[_0x2476b8(0x297)]=this['_currentX']+_0x40c724[_0x2476b8(0x35a)]+this[_0x2476b8(0x2e3)];}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x1c9)]=function(){const _0x1a8b87=_0x482619;this[_0x1a8b87(0x439)]=0x0;},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x364)]=function(){const _0x23294c=_0x482619,_0x454f13=Window_OTB_TurnOrder[_0x23294c(0x356)];if(_0x454f13['BgDimStyle']===_0x23294c(0x3ef))return;if(_0x454f13['BgDimStyle']==='image'&&_0x454f13['BgImageFilename']!==''){if(_0x23294c(0x39a)!==_0x23294c(0x39a))_0x1dcc76['isOTB']()?this[_0x23294c(0x361)]():_0x41dbe3[_0x23294c(0x27a)][_0x23294c(0x31c)][_0x23294c(0x227)](this);else{const _0x3921b4=ImageManager[_0x23294c(0x45a)](_0x454f13[_0x23294c(0x23d)]);_0x3921b4[_0x23294c(0x34e)](this['drawBgImage'][_0x23294c(0x303)](this,_0x3921b4));return;}};const _0x36c83c=this['contentsBack'],_0x418843=ColorManager[_0x23294c(0x234)](),_0x37c5cd=ColorManager['dimColor2'](),_0x5d1126=this['_subjectX'],_0x2008de=_0x454f13[_0x23294c(0x2b9)],_0x36eb06=0x0,_0xecb042=_0x454f13['SpriteLength'],_0x5140e1=this[_0x23294c(0x33f)],_0x4d5f84=this[_0x23294c(0x297)],_0x14df44=this[_0x23294c(0x2e3)];switch(_0x454f13[_0x23294c(0x24f)]){case _0x23294c(0x457):_0x454f13[_0x23294c(0x232)]?(_0x36c83c['gradientFillRect'](_0x5d1126,_0x36eb06,_0x2008de/0x2,_0xecb042,_0x37c5cd,_0x418843,![]),_0x36c83c[_0x23294c(0x371)](_0x5d1126+_0x2008de/0x2,_0x36eb06,_0x2008de/0x2,_0xecb042,_0x418843),_0x36c83c['gradientFillRect'](_0x5140e1,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x37c5cd,_0x418843,![]),_0x36c83c[_0x23294c(0x371)](_0x5140e1+_0x14df44/0x2,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843),_0x36c83c['gradientFillRect'](_0x4d5f84,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x37c5cd,_0x418843,![]),_0x36c83c[_0x23294c(0x371)](_0x4d5f84+_0x14df44/0x2,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843)):'Hdmxc'!=='Hdmxc'?(delete this['_otbTurnOrderGraphicType'],delete this[_0x23294c(0x2d3)],delete this[_0x23294c(0x3b2)],delete this[_0x23294c(0x3e1)]):(_0x36c83c[_0x23294c(0x371)](_0x5d1126,_0x36eb06,_0x2008de/0x2,_0xecb042,_0x418843),_0x36c83c[_0x23294c(0x244)](_0x5d1126+_0x2008de/0x2,_0x36eb06,_0x2008de/0x2,_0xecb042,_0x418843,_0x37c5cd,![]),_0x36c83c[_0x23294c(0x371)](_0x5140e1,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843),_0x36c83c[_0x23294c(0x244)](_0x5140e1+_0x14df44/0x2,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843,_0x37c5cd,![]),_0x36c83c[_0x23294c(0x371)](_0x4d5f84,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843),_0x36c83c[_0x23294c(0x244)](_0x4d5f84+_0x14df44/0x2,_0x36eb06,_0x14df44/0x2,_0xecb042,_0x418843,_0x37c5cd,![]));break;default:_0x36c83c['fillRect'](_0x5d1126,_0x36eb06,_0x2008de,_0xecb042,_0x418843),_0x36c83c[_0x23294c(0x371)](_0x5140e1,_0x36eb06,_0x14df44,_0xecb042,_0x418843),_0x36c83c[_0x23294c(0x371)](_0x4d5f84,_0x36eb06,_0x14df44,_0xecb042,_0x418843);break;}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x243)]=function(_0x299dbb){const _0x330763=_0x482619;this[_0x330763(0x249)]=new Sprite(),this[_0x330763(0x249)][_0x330763(0x2fc)]=_0x299dbb,this[_0x330763(0x2d8)](this[_0x330763(0x249)]);const _0x540d81=Window_OTB_TurnOrder[_0x330763(0x356)];this[_0x330763(0x249)]['x']=_0x540d81['BgImageOffsetX'],this['_bgImageSprite']['y']=_0x540d81[_0x330763(0x451)];},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x29d)]=function(){const _0x3d56f0=_0x482619;this['contents'][_0x3d56f0(0x27b)](),this[_0x3d56f0(0x334)]();const _0x38f511=Window_OTB_TurnOrder[_0x3d56f0(0x356)];this['contents'][_0x3d56f0(0x37c)]=_0x38f511['UiFontSize'];let _0x31f7cc=_0x38f511['UiAlignment'];if(_0x31f7cc==='auto'){if(_0x3d56f0(0x1f4)==='GKfhd')_0x31f7cc=_0x38f511[_0x3d56f0(0x232)]?_0x3d56f0(0x259):_0x3d56f0(0x30d);else{if(!this['isOTB']())return;const _0xca3df9=_0x2dc076['_scene']['_otbTurnOrderWindow'];if(!_0xca3df9)return;_0xca3df9['shiftNextTurnSpritesToCurrentTurn']();}}let _0x1d7519=_0x38f511['SpriteLength'];if(_0x38f511[_0x3d56f0(0x3f8)]!==''){if(_0x3d56f0(0x331)==='JNqgF'){const _0x1434ec=this[_0x3d56f0(0x326)]+_0x38f511[_0x3d56f0(0x3a1)],_0xb2bb8=_0x1d7519+_0x38f511[_0x3d56f0(0x23b)],_0x2bf3d3=_0x38f511['SpriteThin'];this[_0x3d56f0(0x298)](_0x38f511['UiSubjectText'],_0x1434ec,_0xb2bb8,_0x2bf3d3,'center');}else _0xf64d11[_0x3d56f0(0x21b)](_0x3b5d16)&&(_0x3d4109+=_0x1ebbb8(_0x167320['$1']));}if(_0x38f511[_0x3d56f0(0x3fb)]!==''){const _0x5843bf=this['_currentX']+_0x38f511[_0x3d56f0(0x449)],_0x284f6b=_0x1d7519+_0x38f511[_0x3d56f0(0x2d5)],_0x1b8622=this[_0x3d56f0(0x2e3)];this[_0x3d56f0(0x298)](_0x38f511[_0x3d56f0(0x3fb)],_0x5843bf,_0x284f6b,_0x1b8622,_0x31f7cc);}if(_0x38f511[_0x3d56f0(0x200)]!==''){const _0x3e7e22=this[_0x3d56f0(0x297)]+_0x38f511[_0x3d56f0(0x2ca)],_0x1e7bca=_0x1d7519+_0x38f511[_0x3d56f0(0x3e2)],_0x2bbc6a=this[_0x3d56f0(0x2e3)];this[_0x3d56f0(0x298)](_0x38f511['UiNextText'],_0x3e7e22,_0x1e7bca,_0x2bbc6a,_0x31f7cc);}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x265)]=function(){const _0xc073ae=_0x482619,_0x9f345=Window_OTB_TurnOrder[_0xc073ae(0x356)];this[_0xc073ae(0x1f1)]=new Sprite(),this['addChild'](this['_spriteContainer']),this[_0xc073ae(0x25e)]=null,this[_0xc073ae(0x3ea)]=[],this[_0xc073ae(0x22c)]=[],this[_0xc073ae(0x1fd)]=new Sprite(),this[_0xc073ae(0x1fd)]['x']=_0x9f345[_0xc073ae(0x3d7)],this['_previewContainer']['y']=_0x9f345[_0xc073ae(0x366)],this[_0xc073ae(0x1fd)]['x']-=Math[_0xc073ae(0x239)](_0x9f345['SpriteThin']*0.5*_0x9f345['PreviewScale']),_0x9f345['OrderDirection']&&(this['_previewContainer']['x']+=_0x9f345[_0xc073ae(0x2b9)]),this[_0xc073ae(0x1fd)]['y']-=Math[_0xc073ae(0x239)](_0x9f345[_0xc073ae(0x202)]*0.5*_0x9f345[_0xc073ae(0x42e)]),this['addChild'](this[_0xc073ae(0x1fd)]),this['_previewCurrent']=[],this[_0xc073ae(0x282)]=[];},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x256)]=function(){const _0x1ada05=_0x482619;Window_Base[_0x1ada05(0x357)]['update'][_0x1ada05(0x227)](this),this[_0x1ada05(0x2d6)](),this[_0x1ada05(0x34d)](),this[_0x1ada05(0x218)](),this[_0x1ada05(0x1e5)]();},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x279)]=function(){const _0x525ae5=_0x482619;this[_0x525ae5(0x2d1)]=!![];},Window_OTB_TurnOrder['prototype'][_0x482619(0x2d6)]=function(){const _0x1c3d8f=_0x482619;if(!this[_0x1c3d8f(0x2d1)])return;this[_0x1c3d8f(0x2d1)]=![];for(const _0x33a5d5 of this[_0x1c3d8f(0x3ea)]){if(_0x1c3d8f(0x237)!=='DDBcw'){const _0x2b88eb=this['enemy']()[_0x1c3d8f(0x430)];if(_0x2b88eb[_0x1c3d8f(0x354)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1c3d8f(0x28e);else{if(_0x2b88eb[_0x1c3d8f(0x354)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1c3d8f(0x381);}return _0x5d9e7f['Settings']['EnemyBattlerType'];}else{if(!_0x33a5d5)continue;_0x33a5d5[_0x1c3d8f(0x1d5)]();}}for(const _0x495239 of this[_0x1c3d8f(0x22c)]){if(_0x1c3d8f(0x286)!==_0x1c3d8f(0x286)){if(!this['isOTB']())return;const _0x1395fc=_0x2a1ca0[_0x1c3d8f(0x3d0)]['_otbTurnOrderWindow'];if(!_0x1395fc)return;_0x1395fc['previewOrderByAction'](null);}else{if(!_0x495239)continue;_0x495239[_0x1c3d8f(0x1d5)]();}}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x34d)]=function(){const _0x221c55=_0x482619,_0x2b5eb5=Window_OTB_TurnOrder['Settings'];if(_0x2b5eb5[_0x221c55(0x409)]!==_0x221c55(0x41a))return;if(!_0x2b5eb5[_0x221c55(0x380)])return;const _0x593ac0=SceneManager['_scene'][_0x221c55(0x3c6)];if(!_0x593ac0)return;_0x593ac0[_0x221c55(0x3bd)]?_0x221c55(0x32f)===_0x221c55(0x1e0)?this['selectNextActorOTB']():(this['x']=this[_0x221c55(0x3b1)]+(_0x2b5eb5[_0x221c55(0x207)]||0x0),this['y']=this[_0x221c55(0x2af)]+(_0x2b5eb5[_0x221c55(0x255)]||0x0)):(this['x']=this[_0x221c55(0x3b1)],this['y']=this[_0x221c55(0x2af)]);const _0x16bffc=SceneManager['_scene']['_windowLayer'];Window_OTB_TurnOrder[_0x221c55(0x23a)]===undefined&&(Window_OTB_TurnOrder[_0x221c55(0x23a)]=Math[_0x221c55(0x29a)]((Graphics[_0x221c55(0x1dc)]-Math['min'](Graphics[_0x221c55(0x330)],_0x16bffc[_0x221c55(0x1dc)]))/0x2));Window_OTB_TurnOrder[_0x221c55(0x440)]===undefined&&(Window_OTB_TurnOrder[_0x221c55(0x440)]=Math[_0x221c55(0x29a)]((Graphics[_0x221c55(0x1e9)]-Math['min'](Graphics['boxHeight'],_0x16bffc[_0x221c55(0x1e9)]))/0x2));;this['x']+=_0x16bffc['x']-Window_OTB_TurnOrder[_0x221c55(0x23a)],this['y']+=_0x16bffc['y']-Window_OTB_TurnOrder[_0x221c55(0x440)];},Window_OTB_TurnOrder['prototype'][_0x482619(0x218)]=function(){const _0x10f7ad=_0x482619;this[_0x10f7ad(0x3bd)]=$gameSystem['isBattleSystemOTBTurnOrderVisible']();if(BattleManager['_phase']==='battleEnd'){if(!this[_0x10f7ad(0x2ce)]){const _0x745423=Window_OTB_TurnOrder[_0x10f7ad(0x356)];this[_0x10f7ad(0x2ce)]=Math[_0x10f7ad(0x239)](0xff/(_0x745423[_0x10f7ad(0x344)]||0x1));}this['opacity']-=this[_0x10f7ad(0x2ce)],this[_0x10f7ad(0x204)]-=this['_fadeSpeed'],this[_0x10f7ad(0x3d3)][_0x10f7ad(0x358)]-=this[_0x10f7ad(0x2ce)];}},Window_OTB_TurnOrder[_0x482619(0x357)]['sortContainer']=function(){const _0x4e4c7b=_0x482619;if(!this[_0x4e4c7b(0x1f1)])return;const _0x2269c7=Window_OTB_TurnOrder[_0x4e4c7b(0x356)],_0xd6b2a1=_0x2269c7['OrderDirection'];_0xd6b2a1?this['_spriteContainer'][_0x4e4c7b(0x2e7)][_0x4e4c7b(0x333)]((_0x1ec679,_0x4cb6f5)=>_0x1ec679['x']-_0x4cb6f5['x']):this[_0x4e4c7b(0x1f1)][_0x4e4c7b(0x2e7)]['sort']((_0x541d5f,_0x2d908f)=>_0x2d908f['x']-_0x541d5f['x']);},Window_OTB_TurnOrder[_0x482619(0x357)]['removeSprite']=function(_0x52a1d0){const _0x5cd60a=_0x482619;if(!_0x52a1d0)return;_0x52a1d0['_sourceArray']&&(_0x5cd60a(0x2aa)==='YYHAP'?_0x52a1d0[_0x5cd60a(0x388)][_0x5cd60a(0x363)](_0x52a1d0):(_0x464d01[_0x5cd60a(0x27a)][_0x5cd60a(0x325)]['call'](this,_0x5314ed),this[_0x5cd60a(0x2e9)]()&&this[_0x5cd60a(0x35b)]&&this[_0x5cd60a(0x242)]()));const _0x59eecd=Window_OTB_TurnOrder[_0x5cd60a(0x356)],_0x4c8bee=0x3e8/0x3c*_0x59eecd['UpdateFrames']+0x1f4;_0x52a1d0[_0x5cd60a(0x41c)](0x0),setTimeout(this[_0x5cd60a(0x405)]['bind'](this,_0x52a1d0),_0x4c8bee);},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x405)]=function(_0x21fe72){const _0x12ff7e=_0x482619;_0x21fe72[_0x12ff7e(0x388)]&&_0x21fe72['_sourceArray']['remove'](_0x21fe72),this[_0x12ff7e(0x1f1)]['removeChild'](_0x21fe72),this['_previewContainer'][_0x12ff7e(0x42a)](_0x21fe72);},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x1df)]=function(){const _0x456086=_0x482619;if(!this['_subject'])return;this['removeSprite'](this[_0x456086(0x25e)]);},Window_OTB_TurnOrder[_0x482619(0x357)]['shiftNextTurnSpritesToCurrentTurn']=function(){const _0x76ea93=_0x482619;while(this[_0x76ea93(0x3ea)][_0x76ea93(0x3b8)]){const _0x1f77a2=this[_0x76ea93(0x3ea)][_0x76ea93(0x41b)]();_0x1f77a2[_0x76ea93(0x41c)](0x0);}while(this[_0x76ea93(0x22c)][_0x76ea93(0x3b8)]){if(_0x76ea93(0x2ea)!==_0x76ea93(0x2ea)){if(!_0x462038)return;const _0x3d92e0=_0x3110c8[_0x76ea93(0x3bc)]();_0x4f8a74[_0x76ea93(0x2ee)]();if(!this['_actionBattlers'][_0x76ea93(0x21b)](_0x144f08)){const _0x2b1a26=_0x108a58[_0x76ea93(0x2e6)](0x0,_0x3d92e0-(_0xd319ef[_0x76ea93(0x1c8)]||0x0));this[_0x76ea93(0x2e1)](_0x2d76eb,_0x2b1a26,this[_0x76ea93(0x25f)]);}if(!this[_0x76ea93(0x1d2)]['includes'](_0x53bf01)){const _0x2ecbf3=_0x3d92e0;this[_0x76ea93(0x2e1)](_0x11a1e7,_0x2ecbf3,this[_0x76ea93(0x1d2)]);}}else{const _0x593f4b=this[_0x76ea93(0x22c)]['shift']();if(!_0x593f4b)continue;this[_0x76ea93(0x3ea)][_0x76ea93(0x211)](_0x593f4b);}}for(const _0x45f950 of this[_0x76ea93(0x3ea)]){if('AadQS'!==_0x76ea93(0x391)){if(!_0x45f950)continue;_0x45f950[_0x76ea93(0x379)](this[_0x76ea93(0x3ea)]);}else{const _0x224e28=_0x507623[_0x76ea93(0x2e6)](0x0,_0x52f179-(_0x20dc36[_0x76ea93(0x1c8)]||0x0));this[_0x76ea93(0x2e1)](_0x3e2291,_0x224e28,this['_actionBattlers']);}}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x328)]=function(_0x3985f9,_0x17dda5){const _0x906be=_0x482619,_0x8673a9=_0x3985f9===BattleManager[_0x906be(0x25f)]?this[_0x906be(0x3ea)]:this[_0x906be(0x22c)],_0x4407b4={};for(const _0x2fa97b of _0x3985f9){const _0x486575=_0x906be(0x417)[_0x906be(0x31a)](_0x2fa97b[_0x906be(0x3d6)]()?'actor':'enemy',_0x2fa97b[_0x906be(0x35e)]());_0x4407b4[_0x486575]=_0x4407b4[_0x486575]||0x0;const _0x5c6fc0=_0x4407b4[_0x486575]++,_0x4f8ba2=new Sprite_OTB_TurnOrder_Battler(_0x2fa97b,_0x5c6fc0,_0x8673a9);this[_0x906be(0x1f1)][_0x906be(0x355)](_0x4f8ba2),_0x8673a9[_0x906be(0x211)](_0x4f8ba2);}for(const _0x6e5403 of _0x8673a9){if(_0x906be(0x2ab)===_0x906be(0x2ab)){if(!_0x6e5403)continue;_0x6e5403[_0x906be(0x41c)](0xff),_0x6e5403[_0x906be(0x1d5)](),_0x17dda5&&(_0x6e5403['opacity']=0xff,_0x6e5403['x']=_0x6e5403[_0x906be(0x2c4)],_0x6e5403[_0x906be(0x3e6)]=0x0);}else this[_0x906be(0x2d7)]='face';}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x452)]=function(){const _0x5d018d=_0x482619,_0x472cd8=BattleManager[_0x5d018d(0x1d2)];this[_0x5d018d(0x328)](_0x472cd8);},Window_OTB_TurnOrder['prototype']['shiftTurnOrderForSubject']=function(_0x4749bb,_0x3111b6){const _0x4fb60b=_0x482619;this['removeCurrentSubject']();for(const _0x2bc6bc of this[_0x4fb60b(0x3ea)]){if(_0x4fb60b(0x375)===_0x4fb60b(0x1e7))this[_0x4fb60b(0x3e1)]=this[_0x4fb60b(0x293)]();else{if(!_0x2bc6bc)continue;_0x2bc6bc[_0x4fb60b(0x3eb)]()===_0x4749bb&&(_0x2bc6bc['_instance']=_0x2bc6bc[_0x4fb60b(0x2c6)]||0x0,_0x2bc6bc[_0x4fb60b(0x2c6)]--);}}const _0x10e368=this[_0x4fb60b(0x3ea)][_0x4fb60b(0x3bb)](_0x3a2534=>_0x3a2534['battler']()===_0x4749bb);if(this[_0x4fb60b(0x3ea)][_0x10e368])this[_0x4fb60b(0x25e)]=this[_0x4fb60b(0x3ea)][_0x10e368],this['_currentTurn'][_0x10e368][_0x4fb60b(0x1d5)](),this[_0x4fb60b(0x3ea)]['splice'](_0x10e368,0x1);else{if(_0x4749bb){if(_0x4fb60b(0x304)==='czpdg'){const _0x53beac=new Sprite_OTB_TurnOrder_Battler(_0x4749bb,-0x1,null);this['_spriteContainer'][_0x4fb60b(0x355)](_0x53beac),this['_subject']=_0x53beac,_0x53beac[_0x4fb60b(0x41c)](0xff),_0x53beac[_0x4fb60b(0x3e6)]=0x258,_0x53beac['x']=this[_0x4fb60b(0x326)],_0x53beac[_0x4fb60b(0x2c4)]=this['_subjectX'],_0x3111b6&&('CNCCE'!=='CNCCE'?(_0xbf664a[_0x4fb60b(0x416)](),_0x62830b[_0x4fb60b(0x27a)][_0x4fb60b(0x306)]['call'](this)):_0x53beac[_0x4fb60b(0x358)]=0xff);}else _0x261de6['isOTB']()&&_0x4bbd7b&&_0x494990['note']&&_0x4517fd[_0x4fb60b(0x430)][_0x4fb60b(0x354)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0x4fb60b(0x2be)](_0x4a21fa(_0x4c090d['$1'])):_0x48bd50[_0x4fb60b(0x27a)][_0x4fb60b(0x26a)]['call'](this,_0x4dbaa4);}}for(const _0x12e0da of this[_0x4fb60b(0x3ea)]){if(!_0x12e0da)continue;_0x12e0da[_0x4fb60b(0x1d5)]();}},Window_OTB_TurnOrder[_0x482619(0x357)]['removeUnableTurnOrderSprites']=function(){const _0x5f2f97=_0x482619;for(const _0x33480f of this[_0x5f2f97(0x3ea)]){if(!_0x33480f)continue;const _0x28eae5=_0x33480f[_0x5f2f97(0x3eb)]();if(BattleManager[_0x5f2f97(0x25f)][_0x5f2f97(0x21b)](_0x28eae5))continue;this[_0x5f2f97(0x2b4)](_0x33480f);}for(const _0x56ca04 of this[_0x5f2f97(0x22c)]){if(!_0x56ca04)continue;const _0x291c84=_0x56ca04[_0x5f2f97(0x3eb)]();if(BattleManager[_0x5f2f97(0x1d2)][_0x5f2f97(0x21b)](_0x291c84))continue;this[_0x5f2f97(0x2b4)](_0x56ca04);}},Window_OTB_TurnOrder['prototype']['addBattlerToTurnOrderAtEnd']=function(_0x37b36e,_0x533a4a){const _0x4e46ea=_0x482619,_0x5c938f=_0x533a4a===BattleManager['_actionBattlers']?this['_currentTurn']:this[_0x4e46ea(0x22c)];if(!_0x5c938f)return;const _0x4efc3a=VisuMZ[_0x4e46ea(0x27a)][_0x4e46ea(0x1e1)](_0x37b36e,_0x533a4a),_0x105d71=_0x4efc3a[_0x4e46ea(0x3b8)]-0x1,_0x4f80c8=new Sprite_OTB_TurnOrder_Battler(_0x37b36e,_0x105d71,_0x5c938f);this['_spriteContainer'][_0x4e46ea(0x355)](_0x4f80c8),_0x5c938f['push'](_0x4f80c8),_0x4f80c8[_0x4e46ea(0x41c)](0xff),this[_0x4e46ea(0x279)]();},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x3c8)]=function(_0x4237cc,_0x4a8e93){const _0x4a2d43=_0x482619,_0x303cad=_0x4a8e93===BattleManager['_actionBattlers']?this['_currentTurn']:this[_0x4a2d43(0x22c)];if(!_0x303cad)return;for(const _0x9897dd of _0x303cad){if('GBher'!=='GBher'){const _0x5002c3=_0x20e49f(_0x35ae43['$1']);_0x5002c3!==_0x5133ef[_0x34f723][_0x4a2d43(0x231)]&&(_0x5ad92a(_0x4a2d43(0x385)[_0x4a2d43(0x31a)](_0x2ec0d1,_0x5002c3)),_0x1b9e81[_0x4a2d43(0x1d3)]());}else{if(!_0x9897dd)continue;_0x9897dd[_0x4a2d43(0x3eb)]()===_0x4237cc&&(_0x9897dd[_0x4a2d43(0x2c6)]=_0x9897dd[_0x4a2d43(0x2c6)]||0x0,_0x9897dd[_0x4a2d43(0x2c6)]++);}}const _0x3a67e9=0x0,_0xe05d3f=new Sprite_OTB_TurnOrder_Battler(_0x4237cc,_0x3a67e9,_0x303cad);this[_0x4a2d43(0x1f1)][_0x4a2d43(0x355)](_0xe05d3f),_0x303cad[_0x4a2d43(0x211)](_0xe05d3f),_0xe05d3f[_0x4a2d43(0x41c)](0xff),_0xe05d3f[_0x4a2d43(0x3e6)]=0x258,_0xe05d3f['x']=this[_0x4a2d43(0x326)],this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder['prototype'][_0x482619(0x2c0)]=function(){const _0x2e4ab1=_0x482619;this[_0x2e4ab1(0x328)](BattleManager[_0x2e4ab1(0x25f)],!![]),this[_0x2e4ab1(0x328)](BattleManager[_0x2e4ab1(0x1d2)],!![]),this['shiftTurnOrderForSubject'](BattleManager[_0x2e4ab1(0x25e)],!![]),this['sortContainer']();},Window_OTB_TurnOrder[_0x482619(0x357)]['previewOrderByAction']=function(_0xf9848d){const _0x2bbebc=_0x482619;this[_0x2bbebc(0x324)](),_0xf9848d&&_0xf9848d[_0x2bbebc(0x38c)]()!==null&&this[_0x2bbebc(0x205)](_0xf9848d);},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x324)]=function(){const _0x202356=_0x482619;for(const _0x4ddf73 of this['_previewContainer'][_0x202356(0x2e7)]){if(_0x202356(0x3fa)===_0x202356(0x422))_0x269b52['_sourceArray'][_0x202356(0x363)](_0x31b6f1);else{if(!_0x4ddf73)continue;this[_0x202356(0x2b4)](_0x4ddf73);}}},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x205)]=function(_0x417fb6){const _0x1f72b9=_0x482619,_0x3f5834=_0x417fb6[_0x1f72b9(0x42c)](),_0x50aa15=_0x417fb6[_0x1f72b9(0x3cf)](),_0x36304e=_0x417fb6[_0x1f72b9(0x299)]();_0x50aa15!==0x0&&this[_0x1f72b9(0x365)](_0x3f5834,![],_0x50aa15);_0x36304e!==0x0&&('FplmU'!==_0x1f72b9(0x241)?(_0x17054c['otbPreviewOrderClear'](),_0x46c1ac[_0x1f72b9(0x27a)][_0x1f72b9(0x20c)][_0x1f72b9(0x227)](this)):this[_0x1f72b9(0x365)](_0x3f5834,!![],_0x36304e));if(!_0x417fb6[_0x1f72b9(0x20b)]())return;const _0x2b158c=SceneManager[_0x1f72b9(0x3d0)][_0x1f72b9(0x2cb)],_0x587e3f=SceneManager['_scene']['_enemyWindow'];let _0x368c17=null;if(_0x2b158c&&_0x2b158c[_0x1f72b9(0x35b)])_0x368c17=_0x2b158c[_0x1f72b9(0x353)](_0x2b158c[_0x1f72b9(0x35e)]());else _0x587e3f&&_0x587e3f[_0x1f72b9(0x35b)]&&(_0x1f72b9(0x236)!==_0x1f72b9(0x41f)?_0x368c17=_0x587e3f[_0x1f72b9(0x367)]():(_0x5542af[_0x1f72b9(0x416)](),_0x325e93[_0x1f72b9(0x27a)][_0x1f72b9(0x290)][_0x1f72b9(0x227)](this)));if(!_0x368c17)return;const _0x2a509c=_0x417fb6[_0x1f72b9(0x314)](_0x368c17),_0x18c482=_0x417fb6[_0x1f72b9(0x38e)](_0x368c17);_0x2a509c!==0x0&&this[_0x1f72b9(0x365)](_0x368c17,![],_0x2a509c),_0x18c482!==0x0&&this[_0x1f72b9(0x365)](_0x368c17,!![],_0x18c482);},Window_OTB_TurnOrder[_0x482619(0x357)][_0x482619(0x365)]=function(_0x5eb32d,_0xb91873,_0x5f41cd){const _0x11d135=_0x482619;if(!_0x5eb32d)return;if(_0x5f41cd===0x0)return;const _0x40b005=_0xb91873?BattleManager[_0x11d135(0x1d2)]:BattleManager[_0x11d135(0x25f)],_0x272479=VisuMZ[_0x11d135(0x27a)][_0x11d135(0x1e1)](_0x5eb32d,_0x40b005),_0x7b88fd=_0xb91873?this[_0x11d135(0x22c)]:this[_0x11d135(0x3ea)],_0x413fff=_0xb91873?this['_previewNext']:this[_0x11d135(0x316)];if(_0x272479[_0x11d135(0x3b8)]<=0x0)return;for(let _0x2e9755=0x0;_0x2e9755<_0x272479['length'];_0x2e9755++){const _0x329591=new Sprite_OTB_TurnOrder_Preview(_0x5eb32d,_0x2e9755,_0x7b88fd,_0x5f41cd);this[_0x11d135(0x1fd)][_0x11d135(0x355)](_0x329591),_0x413fff[_0x11d135(0x211)](_0x329591),_0x329591['calculateTargetPositions'](),_0x329591[_0x11d135(0x41c)](0xff);}};