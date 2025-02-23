//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
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
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
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
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
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
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
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

function _0x339e(_0x505cef,_0x768efd){const _0x16c042=_0x16c0();return _0x339e=function(_0x339eae,_0x85d92a){_0x339eae=_0x339eae-0x17f;let _0x5bb6bd=_0x16c042[_0x339eae];return _0x5bb6bd;},_0x339e(_0x505cef,_0x768efd);}function _0x16c0(){const _0x33a227=['ZmnZV','zXXrP','isPlaytest','isPassCTB','updateTpbCastTimeCTB','_phase','%1BorderColor','ParseSkillNotetags','loadSvEnemy','currentAction','applyGlobal','%1FlashDuration','IconIndex','gPZQQ','RepositionTopHelpY','ARRAYSTRUCT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Scene_Boot_onDatabaseLoaded','isSideView','isAnyBattlerReadyCTB','requestMotionRefresh','mainSprite','EnemyBattlerIcon','Actors','Game_Battler_tpbBaseSpeed','%1BgColor2','UpdateFrames','VisuMZ_0_CoreEngine','Lrtwa','BattleManager_startBattle','applyItemUserEffect','RegExp','containerWindow','push','OyICD','jKtQj','1409665rDWhDk','createOrderJS','JSON','ARRAYJSON','After','checkCtbAntiSoftlock','DisplayOffsetX','kANlT','112AGjNha','turn','OrderJS','Window_StatusBase_placeGauge','changeSvActorGraphicBitmap','iconWidth','note','indexOf','jrfOb','KrNMq','process_VisuMZ_BattleSystemCTB_JS_Notetags','_homeY','Game_BattlerBase_appear','log','ZnfTn','startAction','JKIFQ','getStateTooltipBattler','hMKJM','NMeyN','checkOpacity','rotateDupeNumber','_ctbTurnOrderIconIndex','initMembers','initTpbChargeTimeCTB','isAppeared','updateLetter','_graphicFaceIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','casting','windowRect','_dupe','svBattlerName','endAction','processCtbAntiSoftlock','TYyoO','some','initBattleSystemCTB','concat','ActorBattlerIcon','createTurnOrderCTBGraphicType','Game_Battler_clearTpbChargeTime','ScreenBuffer','tpbRequiredCastTime','gfEEV','compareBattlerSprites','bitmapHeight','round','oWkYE','faceWidth','hasSvBattler','MAX_SAFE_INTEGER','_graphicFaceName','cTSwZ','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','Game_Battler_applyTpbPenalty','updatePosition','hide','appear','_fadeTarget','TQhMG','find','actor','setText','CtbTurnOrderActorIcon','isCTB','defaultPosition','left','373596FnvhrZ','ParseItemNotetags','isBattleSystemCTBTurnOrderVisible','mqHTG','postEndActionCTB','width','icon','Enemy-%1-%2','SystemTurnOrderVisibility','changeFaceGraphicBitmap','CtbTurnOrderClearActorGraphic','sort','face','updateTurnCTB','canMove','setCtbCastTime','_index','isAlive','parse','Delay','isTpbCharged','vdVYX','PVpvG','updateSelectionEffect','Game_Battler_updateTpb','_ctbTurnOrderWindow','TpbBaseSpeedCalcJS','SpriteThin','_tpbState','DppOJ','processUpdateGraphic','isHorz','allBattleMembers','_anti_CTB_SoftlockCount','CtbTurnOrderClearEnemyGraphic','BattleManager_isActiveTpb','map','tZQJw','_position','getCurrentTurnOrderPositionCTB','return\x200','_ogWindowLayerX','enemy','applyItemBattleSystemCTBUserEffect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','lpigA','ceil','rotateCTBSprites','MzqLS','BattleSystemCTB','ctbStopped','_windowLayer','initialize','SIbhQ','CtbTurnOrderActorFace','isInputting','oGqNN','boxWidth','_ogWindowLayerY','tpbBaseSpeed','EnemyBattlerDrawLetter','min','addInnerChild','TurnOrderCTBGraphicIconIndex','tuuup','createBackgroundSprite','nWeYb','%1\x20%2\x20%3','DisplayOffsetY','142RbWUxT','bitmap','KLEdO','RepositionTopForHelp','fWzVN','pOTFr','changeEnemyGraphicBitmap','faceHeight','nYVZK','_graphicSv','BattleManager_processTurn','createBattlerSprites','loadFace','traitObjects','yEBMn','BorderThickness','_actionBattlers','createKeyJS','TpbSpeedCalcJS','cfjDu','length','process_VisuMZ_BattleSystemCTB_CreateRegExp','createGraphicSprite','_fadeDuration','%1SystemBg','isTpb','BattleManager_battleSys','reduce','EnemyBattlerType','OYQMP','_backgroundSprite','CqQcj','svactor','ParseAllNotetags','YwAUK','yuwGe','iJPZC','onCtbOrderChange','12vEuuRf','KFHFs','visible','TotalHorzSprites','processTurnOrderChangeCTB','VisuMZ_1_BattleCore','eRpAZ','DeviceFriendly','getColor','prototype','sCxwd','hpbuN','%1PopupText','ShowMarkerBorder','Class-%1-%2','FaceName','changeCtbCastTime','Actor','(?:CTB)','setupTextPopup','loadEnemy','STRUCT','BIFHC','_isAlive','_graphicIconIndex','Game_Battler_tpbAcceleration','max','DTxvk','kcZsI','_autoBattle','BattleManager_updateAllTpbBattlers','setActionState','children','Settings','checkPosition','getBattleSystem','_graphicType','name','LWOaN','skills','cUVvM','_ctbTurnOrderVisible','uhKdL','isCtbCastingState','setBattleSystemCTBTurnOrderVisible','updateTpbBattler','isActor','bzzKi','EnemyBattlerFaceIndex','Scene_Battle_createAllWindows','updateTurnOrderCTB','BattleManager_isTpb','UjfOn','includes','Parse_Notetags_CreateJS','%1Mirror','padding','_onRestrictBypassCtbReset','fillRect','clamp','loadSvActor','Order','Anti-CTB\x20Softlock\x20Count:','undecided','Game_Battler_updateTpbChargeTime','ShowMarkerBg','height','EukFh','processTurn','_graphicEnemy','_ctbAfterSpeed','FiOGn','GyhOR','120378woyqgP','updateTpb','188530OfQHfd','zAkQh','#000000','_positionTargetX','startFade','_logWindow','ctbTicksToGoalAddedCastTime','createTurnOrderCTBGraphicIconIndex','EnemyBattlerFontFace','YaamT','bitmapWidth','changeIconGraphicBitmap','bind','battlerHue','FUNC','battlerName','Jjzuz','createTurnOrderCTBGraphicFaceIndex','tpbChargeTime','isActing','RepositionLogWindow','_positionDuration','HvYoS','Mechanics','getCtbCastTimeRate','rotateCTBSprite','subject','match','eBEpN','CbHTe','tpbAcceleration','jEyzx','toUpperCase','onTpbCharged','blt','Window_Help_setItem','otherCtbChecksPassed','updateAllTpbBattlers','right','changeCtbChargeTime','Weapon-%1-%2','createChildren','_scene','isDead','applyBattleSystemCTBUserEffect','format','updateGraphic','FaceIndex','item','updateGraphicHue','Visible','updateAllTpbBattlersCTB','ZTUpD','createAllWindows','preEndActionCTB','EVAL','updateTpbChargeTime','SubjectDistance','State-%1-%2','IwaHY','removeCurrentAction','fyhrv','fontSize','prepare','members','TlsvU','applyGlobalBattleSystemCTBEffects','_tpbCastTime','STR','CtbTurnOrderEnemyFace','repositionLogWindowCTB','isAttack','_tpbChargeTime','applyCTBPenalty','EnemyBattlerFaceName','Skill-%1-%2','2193884oUBNGg','addChild','clearRect','clearTurnOrderCTBGraphics','createInitialPositions','%1Mute','drawText','applyTpbPenalty','HjEkh','qIHLZ','onDatabaseLoaded','time','ticksLeft','setItem','Armor-%1-%2','_graphicSprite','3841aKNFWk','mainFontFace','clearTpbChargeTime','_blendColor','updateTpbCastTime','center','Game_Battler_tpbSpeed','constructor','registerCommand','_letter','WNtVh','ARRAYEVAL','setTurnOrderCTB','ConvertParams','opacity','Game_Battler_tpbRequiredCastTime','BattleManager_startActorInput','floor','RepositionTopHelpX','TotalVertSprites','lHypN','EnemyBattlerFontSize','addLoadListener','_ctbTurnOrderFaceIndex','ActorBattlerType','ctbTicksToGoal','createCTBTurnOrderWindow','TpbAccelerationJS','_ctbTurnOrderFaceName','isSceneBattle','filter','_graphicHue','_homeX','_inputting','ZLVSJ','addChildAt','boxHeight','_plural','_turnOrderContainer','%1SystemBorder','Enemy','requestFauxAnimation','tpbRelativeSpeed','aEWoT','processTurnCTB','updateTurn','loadSystem','SpriteLength','RqJqZ','updateBattleContainerOrder','startActorInput','trim','isValid','DDyep','kFseQ','updateTpbChargeTimeCTB','TpbCastTimeJS','ready','isEnemy','Enemies','nyilY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','OrderDirection','top','changeTurnOrderByCTB','update','Game_Action_applyItemUserEffect','CtbTurnOrderEnemyIcon','containerPosition','updateVisibility','63NTNIfQ','InitialGaugeJS','updateOpacity','xulyu','_letterSprite','initTpbChargeTime','placeGauge','kmkHJ','fontFace','Charge','_helpWindow','jJIKl','Game_Battler_updateTpbCastTime','ctbHasInstantActionAfter','Game_Battler_tpbRelativeSpeed','tpbSpeed','description','1882328LhmcWx','MIN_SAFE_INTEGER','TurnOrderCTBGraphicType','faceName','kXYtE','Effect','ARRAYSTR','speed','status','battler','TurnOrderCTBGraphicFaceIndex','createRateJS','Game_BattlerBase_hide','bottom','anchor','_isAppeared','setCtbChargeTime','Game_Battler_onRestrict','isCtbChargingState','setHue','FZfNk','LOMql','setCtbAfterSpeed','Actor-%1-%2','charging','isActiveTpb','%1BgColor1','vOdvy','_positionTargetY','xscYj','clear','_forcing','_ctbTurnOrderGraphicType','createTurnOrderCTBGraphicFaceName','%1FlashColor','_isBattleOver','krreB','_turnOrderInnerSprite','startBattle','call','DisplayPosition','%1TextColor','Game_Action_applyGlobal','Cast','%1AnimationID','attackSpeed','_unit','hvQqK','_subject','IconSet','battleSys','fVNAI','CTB','createBorderSprite','BattleManager_endAction','exit','createLetterSprite'];_0x16c0=function(){return _0x33a227;};return _0x16c0();}const _0x361969=_0x339e;(function(_0x5a0534,_0x3ef325){const _0x7ed409=_0x339e,_0x555527=_0x5a0534();while(!![]){try{const _0x301fee=parseInt(_0x7ed409(0x1f9))/0x1*(parseInt(_0x7ed409(0x33e))/0x2)+parseInt(_0x7ed409(0x2f9))/0x3*(-parseInt(_0x7ed409(0x364))/0x4)+parseInt(_0x7ed409(0x2ad))/0x5+parseInt(_0x7ed409(0x19b))/0x6*(parseInt(_0x7ed409(0x2b5))/0x7)+-parseInt(_0x7ed409(0x250))/0x8+parseInt(_0x7ed409(0x23f))/0x9*(parseInt(_0x7ed409(0x19d))/0xa)+-parseInt(_0x7ed409(0x1e9))/0xb;if(_0x301fee===_0x3ef325)break;else _0x555527['push'](_0x555527['shift']());}catch(_0x32979d){_0x555527['push'](_0x555527['shift']());}}}(_0x16c0,0x30a7c));var label=_0x361969(0x32a),tier=tier||0x0,dependencies=[_0x361969(0x2a4),_0x361969(0x369)],pluginData=$plugins[_0x361969(0x217)](function(_0x3b7c9b){const _0x787ead=_0x361969;return _0x3b7c9b[_0x787ead(0x258)]&&_0x3b7c9b['description'][_0x787ead(0x187)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x361969(0x385)]||{},VisuMZ[_0x361969(0x206)]=function(_0x14e74c,_0xce9e0c){const _0x2020ef=_0x361969;for(const _0xda96ad in _0xce9e0c){if(_0xda96ad[_0x2020ef(0x1b8)](/(.*):(.*)/i)){if(_0x2020ef(0x2c5)==='Wrnnp'){const _0x144692=_0x25964f[_0x2020ef(0x32a)]['createKeyJS'](this[_0x2020ef(0x1cd)](),'Charge');if(_0x1b3c7e[_0x2020ef(0x32a)]['JS'][_0x144692]){const _0x5bb1b4=_0x174f66['BattleSystemCTB']['JS'][_0x144692][_0x2020ef(0x277)](this,this[_0x2020ef(0x1b7)](),_0x22d9a0);_0x26dd2a['setCtbChargeTime'](_0x5bb1b4);}_0x2fcc51['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x416581[_0x2020ef(0x260)](_0x398a48(_0x442f2f['$1'])*0.01),_0x183b03[_0x2020ef(0x1b8)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3ef7c6['changeCtbChargeTime'](_0x3f8181(_0x5bc888['$1'])*0.01);}else{const _0x3cc955=String(RegExp['$1']),_0x22b8c1=String(RegExp['$2'])[_0x2020ef(0x1bd)]()['trim']();let _0x4075f0,_0x29bb31,_0x4aad9e;switch(_0x22b8c1){case'NUM':_0x4075f0=_0xce9e0c[_0xda96ad]!==''?Number(_0xce9e0c[_0xda96ad]):0x0;break;case'ARRAYNUM':_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON['parse'](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31[_0x2020ef(0x31d)](_0x13e3f1=>Number(_0x13e3f1));break;case _0x2020ef(0x1d4):_0x4075f0=_0xce9e0c[_0xda96ad]!==''?eval(_0xce9e0c[_0xda96ad]):null;break;case _0x2020ef(0x204):_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31['map'](_0x57bec5=>eval(_0x57bec5));break;case _0x2020ef(0x2af):_0x4075f0=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):'';break;case _0x2020ef(0x2b0):_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31[_0x2020ef(0x31d)](_0x1d0620=>JSON[_0x2020ef(0x30b)](_0x1d0620));break;case _0x2020ef(0x1ab):_0x4075f0=_0xce9e0c[_0xda96ad]!==''?new Function(JSON['parse'](_0xce9e0c[_0xda96ad])):new Function(_0x2020ef(0x321));break;case'ARRAYFUNC':_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31[_0x2020ef(0x31d)](_0x5704b7=>new Function(JSON['parse'](_0x5704b7)));break;case _0x2020ef(0x1e1):_0x4075f0=_0xce9e0c[_0xda96ad]!==''?String(_0xce9e0c[_0xda96ad]):'';break;case _0x2020ef(0x256):_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31[_0x2020ef(0x31d)](_0x1865e1=>String(_0x1865e1));break;case _0x2020ef(0x379):_0x4aad9e=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):{},_0x4075f0=VisuMZ['ConvertParams']({},_0x4aad9e);break;case _0x2020ef(0x298):_0x29bb31=_0xce9e0c[_0xda96ad]!==''?JSON[_0x2020ef(0x30b)](_0xce9e0c[_0xda96ad]):[],_0x4075f0=_0x29bb31[_0x2020ef(0x31d)](_0x467954=>VisuMZ[_0x2020ef(0x206)]({},JSON['parse'](_0x467954)));break;default:continue;}_0x14e74c[_0x3cc955]=_0x4075f0;}}}return _0x14e74c;},(_0x1e17e0=>{const _0x45dc1c=_0x361969,_0x1a404c=_0x1e17e0[_0x45dc1c(0x389)];for(const _0x19d098 of dependencies){if(!Imported[_0x19d098]){alert(_0x45dc1c(0x236)[_0x45dc1c(0x1ca)](_0x1a404c,_0x19d098)),SceneManager[_0x45dc1c(0x287)]();break;}}const _0x2901c8=_0x1e17e0[_0x45dc1c(0x24f)];if(_0x2901c8[_0x45dc1c(0x1b8)](/\[Version[ ](.*?)\]/i)){if(_0x45dc1c(0x2be)!=='cwZhJ'){const _0x59e6e2=Number(RegExp['$1']);_0x59e6e2!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x45dc1c(0x1ca)](_0x1a404c,_0x59e6e2)),SceneManager[_0x45dc1c(0x287)]());}else _0x21e96f['BattleSystemCTB']['Scene_Battle_createAllWindows'][_0x45dc1c(0x277)](this),this['createCTBTurnOrderWindow']();}if(_0x2901c8[_0x45dc1c(0x1b8)](/\[Tier[ ](\d+)\]/i)){if(_0x45dc1c(0x38a)!==_0x45dc1c(0x1b9)){const _0x39a73d=Number(RegExp['$1']);_0x39a73d<tier?_0x45dc1c(0x30f)!==_0x45dc1c(0x38c)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x45dc1c(0x1ca)](_0x1a404c,_0x39a73d,tier)),SceneManager[_0x45dc1c(0x287)]()):this[_0x45dc1c(0x2cb)]=this[_0x45dc1c(0x1a4)]():tier=Math[_0x45dc1c(0x37e)](_0x39a73d,tier);}else _0x287047[_0x45dc1c(0x32a)][_0x45dc1c(0x2ec)][_0x45dc1c(0x277)](this);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x1e17e0['parameters']);})(pluginData),PluginManager[_0x361969(0x201)](pluginData[_0x361969(0x389)],_0x361969(0x2f5),_0x9512ba=>{const _0x2270dd=_0x361969;VisuMZ[_0x2270dd(0x206)](_0x9512ba,_0x9512ba);const _0x39d50d=_0x9512ba[_0x2270dd(0x2a0)],_0x15af48=_0x9512ba[_0x2270dd(0x295)];for(const _0x52fb97 of _0x39d50d){const _0x3feefd=$gameActors['actor'](_0x52fb97);if(!_0x3feefd)continue;_0x3feefd['_ctbTurnOrderGraphicType']=_0x2270dd(0x2ff),_0x3feefd[_0x2270dd(0x2cb)]=_0x15af48;}}),PluginManager[_0x361969(0x201)](pluginData[_0x361969(0x389)],_0x361969(0x32f),_0x1c65a2=>{const _0x19c89d=_0x361969;VisuMZ[_0x19c89d(0x206)](_0x1c65a2,_0x1c65a2);const _0x3fc0a8=_0x1c65a2[_0x19c89d(0x2a0)],_0x1c9422=_0x1c65a2[_0x19c89d(0x373)],_0x503161=_0x1c65a2[_0x19c89d(0x1cc)];for(const _0x827c53 of _0x3fc0a8){const _0x5ea474=$gameActors['actor'](_0x827c53);if(!_0x5ea474)continue;_0x5ea474[_0x19c89d(0x270)]=_0x19c89d(0x305),_0x5ea474[_0x19c89d(0x215)]=_0x1c9422,_0x5ea474[_0x19c89d(0x210)]=_0x503161;}}),PluginManager[_0x361969(0x201)](pluginData['name'],_0x361969(0x303),_0x23c1f4=>{const _0x161617=_0x361969;VisuMZ[_0x161617(0x206)](_0x23c1f4,_0x23c1f4);const _0x48a94d=_0x23c1f4['Actors'];for(const _0x26d098 of _0x48a94d){const _0x294955=$gameActors[_0x161617(0x2f3)](_0x26d098);if(!_0x294955)continue;_0x294955['clearTurnOrderCTBGraphics']();}}),PluginManager[_0x361969(0x201)](pluginData[_0x361969(0x389)],_0x361969(0x23c),_0x269b48=>{const _0xa2e96b=_0x361969;VisuMZ[_0xa2e96b(0x206)](_0x269b48,_0x269b48);const _0x1c22e9=_0x269b48[_0xa2e96b(0x234)],_0x53fd24=_0x269b48[_0xa2e96b(0x295)];for(const _0x32deb2 of _0x1c22e9){if('zAkQh'!==_0xa2e96b(0x19e))return _0xffdaaf[_0xa2e96b(0x212)](0x1)-_0x4bb065[_0xa2e96b(0x212)](0x1);else{const _0x157dd5=$gameTroop[_0xa2e96b(0x1dd)]()[_0x32deb2];if(!_0x157dd5)continue;_0x157dd5[_0xa2e96b(0x270)]=_0xa2e96b(0x2ff),_0x157dd5[_0xa2e96b(0x2cb)]=_0x53fd24;}}}),PluginManager[_0x361969(0x201)](pluginData[_0x361969(0x389)],_0x361969(0x1e2),_0xff272e=>{const _0x32256b=_0x361969;VisuMZ[_0x32256b(0x206)](_0xff272e,_0xff272e);const _0x4f36f4=_0xff272e[_0x32256b(0x234)],_0x5f3def=_0xff272e['FaceName'],_0x436a30=_0xff272e[_0x32256b(0x1cc)];for(const _0x5dbb16 of _0x4f36f4){const _0x42c354=$gameTroop[_0x32256b(0x1dd)]()[_0x5dbb16];if(!_0x42c354)continue;_0x42c354['_ctbTurnOrderGraphicType']=_0x32256b(0x305),_0x42c354[_0x32256b(0x215)]=_0x5f3def,_0x42c354[_0x32256b(0x210)]=_0x436a30;}}),PluginManager[_0x361969(0x201)](pluginData['name'],_0x361969(0x31b),_0x379493=>{const _0x30c4c2=_0x361969;VisuMZ[_0x30c4c2(0x206)](_0x379493,_0x379493);const _0x226508=_0x379493[_0x30c4c2(0x234)];for(const _0x126e95 of _0x226508){if(_0x30c4c2(0x20d)===_0x30c4c2(0x331))this[_0x30c4c2(0x1e6)]();else{const _0x1f61a9=$gameTroop[_0x30c4c2(0x1dd)]()[_0x126e95];if(!_0x1f61a9)continue;_0x1f61a9['clearTurnOrderCTBGraphics']();}}}),PluginManager[_0x361969(0x201)](pluginData[_0x361969(0x389)],_0x361969(0x301),_0x3410a0=>{const _0x310968=_0x361969;VisuMZ[_0x310968(0x206)](_0x3410a0,_0x3410a0);const _0x5f25fa=_0x3410a0[_0x310968(0x1cf)];$gameSystem[_0x310968(0x390)](_0x5f25fa);}),VisuMZ[_0x361969(0x32a)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x361969(0x36d)][_0x361969(0x1f3)],Scene_Boot[_0x361969(0x36d)][_0x361969(0x1f3)]=function(){const _0x4e7f0e=_0x361969;this['process_VisuMZ_BattleSystemCTB_CreateRegExp'](),VisuMZ[_0x4e7f0e(0x32a)][_0x4e7f0e(0x29a)][_0x4e7f0e(0x277)](this),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ['BattleSystemCTB'][_0x361969(0x2a8)]={},Scene_Boot[_0x361969(0x36d)][_0x361969(0x353)]=function(){const _0x1a6856=_0x361969,_0x301bd1=VisuMZ['BattleSystemCTB']['RegExp'],_0x3d3fea=_0x1a6856(0x2eb),_0x57db78=[_0x1a6856(0x248),_0x1a6856(0x27b),'After'];for(const _0x402a01 of _0x57db78){const _0x583569=_0x3d3fea['format'](_0x402a01[_0x1a6856(0x1bd)]()[_0x1a6856(0x22c)](),_0x1a6856(0x376),'(?:GAUGE|TIME|SPEED)'),_0x40e85f=new RegExp(_0x583569,'i');VisuMZ[_0x1a6856(0x32a)]['RegExp'][_0x402a01]=_0x40e85f;}VisuMZ['BattleSystemCTB'][_0x1a6856(0x2a8)]['OrderJS']=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x361969(0x36d)][_0x361969(0x2bf)]=function(){const _0xb1ecea=_0x361969;if(VisuMZ[_0xb1ecea(0x35f)])return;const _0x39670c=$dataSkills[_0xb1ecea(0x2db)]($dataItems);for(const _0x36fbf2 of _0x39670c){if(_0xb1ecea(0x2ac)!==_0xb1ecea(0x22f)){if(!_0x36fbf2)continue;VisuMZ[_0xb1ecea(0x32a)][_0xb1ecea(0x188)](_0x36fbf2);}else _0x11d433[_0xb1ecea(0x1d9)](),_0xe62968['setCtbAfterSpeed'](0x0),this[_0xb1ecea(0x2d6)](),this['_subject']=null;}},VisuMZ['BattleSystemCTB'][_0x361969(0x290)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x361969(0x290)]=function(_0x19bb25){const _0x4b09bf=_0x361969;VisuMZ[_0x4b09bf(0x32a)][_0x4b09bf(0x290)][_0x4b09bf(0x277)](this,_0x19bb25),VisuMZ[_0x4b09bf(0x32a)]['Parse_Notetags_CreateJS'](_0x19bb25);},VisuMZ[_0x361969(0x32a)][_0x361969(0x2fa)]=VisuMZ[_0x361969(0x2fa)],VisuMZ[_0x361969(0x2fa)]=function(_0x324ee9){const _0x5baeff=_0x361969;VisuMZ[_0x5baeff(0x32a)][_0x5baeff(0x2fa)][_0x5baeff(0x277)](this,_0x324ee9),VisuMZ['BattleSystemCTB'][_0x5baeff(0x188)](_0x324ee9);},VisuMZ[_0x361969(0x32a)][_0x361969(0x188)]=function(_0xbf513d){const _0x55fc5a=_0x361969,_0x59428a=['Charge',_0x55fc5a(0x27b),_0x55fc5a(0x2b1)];for(const _0x68bb95 of _0x59428a){if('yuwGe'===_0x55fc5a(0x361))VisuMZ[_0x55fc5a(0x32a)][_0x55fc5a(0x25b)](_0xbf513d,_0x68bb95);else{const _0x474d4b=_0x37249d(_0x253cca['$1']);_0x474d4b!==_0x4db59c[_0x4c6c9f]['version']&&(_0x5d3ad0('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x55fc5a(0x1ca)](_0x50381e,_0x474d4b)),_0x4f265f['exit']());}}VisuMZ[_0x55fc5a(0x32a)]['createOrderJS'](_0xbf513d,'Order');},VisuMZ['BattleSystemCTB']['JS']={},VisuMZ[_0x361969(0x32a)][_0x361969(0x25b)]=function(_0x256ed9,_0x30cbcf){const _0x31170f=_0x361969,_0x432d34=_0x256ed9[_0x31170f(0x2bb)];if(_0x432d34[_0x31170f(0x1b8)](VisuMZ[_0x31170f(0x32a)]['RegExp'][_0x30cbcf])){const _0x440efe=String(RegExp['$1']),_0x1da5d4=_0x31170f(0x299)['format'](_0x440efe,_0x30cbcf),_0x2f377e=VisuMZ[_0x31170f(0x32a)]['createKeyJS'](_0x256ed9,_0x30cbcf);VisuMZ[_0x31170f(0x32a)]['JS'][_0x2f377e]=new Function(_0x1da5d4);}},VisuMZ[_0x361969(0x32a)][_0x361969(0x2ae)]=function(_0x16f57f,_0xea6b3f){const _0x112dde=_0x361969,_0xcae699=_0x16f57f[_0x112dde(0x2bb)];if(_0xcae699['match'](VisuMZ[_0x112dde(0x32a)]['RegExp'][_0x112dde(0x2b7)])){const _0x33ca13=String(RegExp['$1']),_0x530419=_0x112dde(0x2d1)[_0x112dde(0x1ca)](_0x33ca13,_0xea6b3f),_0xbaa01f=VisuMZ[_0x112dde(0x32a)]['createKeyJS'](_0x16f57f,_0xea6b3f);VisuMZ['BattleSystemCTB']['JS'][_0xbaa01f]=new Function(_0x530419);}},VisuMZ[_0x361969(0x32a)][_0x361969(0x34f)]=function(_0xea878a,_0xbd426d){const _0x533657=_0x361969;let _0x2bfb48='';if($dataActors['includes'](_0xea878a))_0x2bfb48=_0x533657(0x267)['format'](_0xea878a['id'],_0xbd426d);if($dataClasses['includes'](_0xea878a))_0x2bfb48=_0x533657(0x372)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataSkills[_0x533657(0x187)](_0xea878a))_0x2bfb48=_0x533657(0x1e8)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataItems['includes'](_0xea878a))_0x2bfb48='Item-%1-%2'[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataWeapons[_0x533657(0x187)](_0xea878a))_0x2bfb48=_0x533657(0x1c5)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataArmors[_0x533657(0x187)](_0xea878a))_0x2bfb48=_0x533657(0x1f7)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataEnemies[_0x533657(0x187)](_0xea878a))_0x2bfb48=_0x533657(0x300)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);if($dataStates['includes'](_0xea878a))_0x2bfb48=_0x533657(0x1d7)[_0x533657(0x1ca)](_0xea878a['id'],_0xbd426d);return _0x2bfb48;},VisuMZ[_0x361969(0x32a)][_0x361969(0x358)]=BattleManager[_0x361969(0x282)],BattleManager['battleSys']=function(){const _0x5a2d90=_0x361969;if(this[_0x5a2d90(0x2f6)]())return _0x5a2d90(0x284);return VisuMZ[_0x5a2d90(0x32a)][_0x5a2d90(0x358)]['call'](this);},BattleManager[_0x361969(0x2f6)]=function(){const _0x301ec2=_0x361969;return $gameSystem['getBattleSystem']()===_0x301ec2(0x284);},VisuMZ['BattleSystemCTB'][_0x361969(0x185)]=BattleManager['isTpb'],BattleManager[_0x361969(0x357)]=function(){const _0x980cbc=_0x361969;if(this['isCTB']())return!![];return VisuMZ[_0x980cbc(0x32a)][_0x980cbc(0x185)][_0x980cbc(0x277)](this);},VisuMZ['BattleSystemCTB'][_0x361969(0x31c)]=BattleManager[_0x361969(0x269)],BattleManager[_0x361969(0x269)]=function(){const _0x4e1cea=_0x361969;if(this[_0x4e1cea(0x2f6)]())return![];return VisuMZ[_0x4e1cea(0x32a)][_0x4e1cea(0x31c)][_0x4e1cea(0x277)](this);},VisuMZ[_0x361969(0x32a)]['BattleManager_updateTurn']=BattleManager[_0x361969(0x226)],BattleManager[_0x361969(0x226)]=function(_0x2b5fab){const _0x351278=_0x361969;this['isCTB']()?this[_0x351278(0x306)](_0x2b5fab):VisuMZ[_0x351278(0x32a)]['BattleManager_updateTurn'][_0x351278(0x277)](this,_0x2b5fab);},BattleManager[_0x361969(0x306)]=function(_0x300cf2){const _0x494d1c=_0x361969;$gameParty[_0x494d1c(0x29d)]();for(;;){if(_0x494d1c(0x274)!=='vcSFy'){if(this[_0x494d1c(0x29c)]())break;if(_0x300cf2){if(_0x494d1c(0x1bc)!==_0x494d1c(0x1bc)){if(!this['item']())return;if(!_0x1a8e9b[_0x494d1c(0x2f6)]())return;const _0x1c0c87=this[_0x494d1c(0x1cd)]()[_0x494d1c(0x2bb)];let _0x3fb664=0x0;this[_0x494d1c(0x26f)]&&(_0x3fb664=this[_0x494d1c(0x1b7)]()[_0x494d1c(0x1e5)]);const _0x49f276=_0x1143c4[_0x494d1c(0x32a)]['createKeyJS'](this[_0x494d1c(0x1cd)](),'After');_0xe98584['BattleSystemCTB']['JS'][_0x49f276]&&(_0x3fb664+=_0x37436c[_0x494d1c(0x32a)]['JS'][_0x49f276][_0x494d1c(0x277)](this,this[_0x494d1c(0x1b7)](),this[_0x494d1c(0x1b7)]()));let _0x29d0be=this[_0x494d1c(0x1cd)]()['speed']>0x0?this[_0x494d1c(0x1cd)]()[_0x494d1c(0x257)]:0x0;if(this[_0x494d1c(0x1e4)]())_0x29d0be+=this['subject']()[_0x494d1c(0x27d)]();_0x3fb664+=(_0x29d0be/0xfa0)[_0x494d1c(0x18d)](0x0,0x1);this[_0x494d1c(0x1cd)]()[_0x494d1c(0x2bb)]['match'](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x3fb664+=_0x23a0e2(_0xdf3c42['$1'])*0.01);const _0x288393=this[_0x494d1c(0x1b7)]()[_0x494d1c(0x34b)]()[_0x494d1c(0x2db)](this['subject']()[_0x494d1c(0x38b)]()),_0x242bf1=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x139bbc=_0x288393[_0x494d1c(0x31d)](_0x5810bc=>_0x5810bc&&_0x5810bc[_0x494d1c(0x2bb)]['match'](_0x242bf1)?_0x552411(_0x1c2bc3['$1'])*0.01:0x0);_0x3fb664=_0x139bbc[_0x494d1c(0x359)]((_0x210b93,_0x279b3d)=>_0x210b93+_0x279b3d,_0x3fb664),this['subject']()[_0x494d1c(0x266)](_0x3fb664);}else this[_0x494d1c(0x19c)]();}if(!this[_0x494d1c(0x280)]){if(_0x494d1c(0x2a5)===_0x494d1c(0x2a5))this[_0x494d1c(0x280)]=this['getNextSubject']();else{if(this['_graphicSv']!==_0x20a6fc['svBattlerName']())return this[_0x494d1c(0x317)]();}}this['_subject']&&(this['processTurn'](),this['updateTurnOrderCTB']());if(VisuMZ[_0x494d1c(0x32a)]['Settings'][_0x494d1c(0x1b4)]['DeviceFriendly'])break;}else this[_0x494d1c(0x196)]();}this[_0x494d1c(0x2b2)]();},VisuMZ[_0x361969(0x32a)][_0x361969(0x348)]=BattleManager['processTurn'],BattleManager[_0x361969(0x196)]=function(){const _0x25af1f=_0x361969;this[_0x25af1f(0x2f6)]()?this['processTurnCTB']():VisuMZ[_0x25af1f(0x32a)]['BattleManager_processTurn'][_0x25af1f(0x277)](this);},BattleManager[_0x361969(0x225)]=function(){const _0x4c5606=_0x361969,_0x567726=this['_subject'],_0x16b467=_0x567726[_0x4c5606(0x292)]();if(_0x16b467)_0x16b467['prepare'](),_0x16b467[_0x4c5606(0x22d)]()?_0x4c5606(0x329)!==_0x4c5606(0x329)?this[_0x4c5606(0x315)]=_0x4c5606(0x232):(this[_0x4c5606(0x2c4)](),_0x567726[_0x4c5606(0x1d9)]()):(_0x567726[_0x4c5606(0x1d9)](),_0x567726[_0x4c5606(0x266)](0x0),this[_0x4c5606(0x2d6)](),this[_0x4c5606(0x280)]=null);else{if(_0x4c5606(0x365)!==_0x4c5606(0x365))return(this['tpbRequiredCastTime']()-this[_0x4c5606(0x1e0)])/this[_0x4c5606(0x1bb)]();else _0x567726['setCtbAfterSpeed'](0x0),this[_0x4c5606(0x2d6)](),this[_0x4c5606(0x280)]=null;}},BattleManager[_0x361969(0x29c)]=function(){const _0x191ebf=_0x361969;if(this[_0x191ebf(0x280)])return!![];if(this['_phase']!=='turn')return!![];if(this[_0x191ebf(0x330)]())return!![];if(this[_0x191ebf(0x381)])return![];const _0x613f36=this['allBattleMembers']()[_0x191ebf(0x217)](_0x53fde9=>_0x53fde9&&_0x53fde9[_0x191ebf(0x2ce)]());return _0x613f36[_0x191ebf(0x2d9)](_0x1309ba=>_0x1309ba['isPassCTB']());},Game_Battler[_0x361969(0x36d)][_0x361969(0x28c)]=function(){const _0x35910b=_0x361969;if(this[_0x35910b(0x30d)]())return!![];if(this['isTpbReady']())return!![];if(this[_0x35910b(0x1b0)]())return!![];return![];},BattleManager[_0x361969(0x2b2)]=function(){const _0x49d8e9=_0x361969;let _0xfaff37=VisuMZ[_0x49d8e9(0x32a)][_0x49d8e9(0x385)]['Mechanics'][_0x49d8e9(0x36b)]?0x1e:0xa;if(this[_0x49d8e9(0x29c)]()&&this[_0x49d8e9(0x1c1)]()){if(_0x49d8e9(0x1a6)===_0x49d8e9(0x2ab)){const _0x29b896=this[_0x49d8e9(0x2d3)]();this[_0x49d8e9(0x219)]=_0x29b896['x'],this['_homeY']=_0x29b896['y'],_0x24da4a[_0x49d8e9(0x36d)]['initialize'][_0x49d8e9(0x277)](this,_0x29b896),this[_0x49d8e9(0x349)](),this[_0x49d8e9(0x23e)](),this[_0x49d8e9(0x207)]=0x0;}else{this[_0x49d8e9(0x31a)]=this[_0x49d8e9(0x31a)]||0x0,this[_0x49d8e9(0x31a)]++;if(this[_0x49d8e9(0x31a)]>=_0xfaff37){if(_0x49d8e9(0x37f)===_0x49d8e9(0x316))return this[_0x49d8e9(0x317)]();else this[_0x49d8e9(0x2d7)]();}}}else'aEWoT'===_0x49d8e9(0x224)?this['_anti_CTB_SoftlockCount']=0x0:_0x75dbec+=0x1;},BattleManager['otherCtbChecksPassed']=function(){const _0x339fc1=_0x361969;if(this['_subject'])return![];if(this['_phase']!==_0x339fc1(0x2b6))return![];if(this[_0x339fc1(0x330)]())return![];return!![];},BattleManager['processCtbAntiSoftlock']=function(){const _0xdb20f1=_0x361969;$gameTemp[_0xdb20f1(0x28b)]()&&(_0xdb20f1(0x1ad)!==_0xdb20f1(0x1d1)?console[_0xdb20f1(0x2c2)]('Anti-CTB\x20Softlock\x20Count:',this['_anti_CTB_SoftlockCount']):(this['x']=this[_0xdb20f1(0x219)]+(_0x8d8351[_0xdb20f1(0x20b)]||0x0),this['y']=this[_0xdb20f1(0x2c0)]+(_0x83abd2['RepositionTopHelpY']||0x0)));for(const _0xb829b of this[_0xdb20f1(0x319)]()){if('AWudg'===_0xdb20f1(0x1da))return this[_0xdb20f1(0x259)]();else{if(!_0xb829b)continue;if(_0xb829b['isAlive']()){if(_0xdb20f1(0x2e1)==='gfEEV')_0xb829b[_0xdb20f1(0x383)]('undecided'),_0xb829b[_0xdb20f1(0x315)]=_0xdb20f1(0x268);else{if(this['_graphicSv']!==_0x164773[_0xdb20f1(0x1ac)]())return this['processUpdateGraphic']();}}}}this[_0xdb20f1(0x280)]=null,this[_0xdb20f1(0x28e)]=_0xdb20f1(0x2b6),this[_0xdb20f1(0x21a)]=![];},VisuMZ[_0x361969(0x32a)][_0x361969(0x382)]=BattleManager[_0x361969(0x1c2)],BattleManager[_0x361969(0x1c2)]=function(){const _0xa4a30a=_0x361969;this[_0xa4a30a(0x2f6)]()?this[_0xa4a30a(0x1d0)]():VisuMZ['BattleSystemCTB'][_0xa4a30a(0x382)][_0xa4a30a(0x277)](this);},BattleManager[_0x361969(0x1d0)]=function(){const _0x5f5d12=_0x361969,_0x10ba92=this['allBattleMembers']();_0x10ba92[_0x5f5d12(0x304)]((_0x34332b,_0x1dd2dc)=>{const _0x117a32=_0x5f5d12;if(_0x117a32(0x195)===_0x117a32(0x1ba))this[_0x117a32(0x184)](),_0x51ef58[_0x117a32(0x32a)][_0x117a32(0x209)]['call'](this);else return _0x34332b[_0x117a32(0x212)](0x1)-_0x1dd2dc[_0x117a32(0x212)](0x1);});for(const _0x26a57d of _0x10ba92){_0x5f5d12(0x35b)!==_0x5f5d12(0x35b)?this[_0x5f5d12(0x17f)](_0x8e73b1):this['updateTpbBattler'](_0x26a57d);}},VisuMZ[_0x361969(0x32a)][_0x361969(0x2a6)]=BattleManager['startBattle'],BattleManager[_0x361969(0x276)]=function(){const _0x4e23a0=_0x361969;VisuMZ[_0x4e23a0(0x32a)]['BattleManager_startBattle'][_0x4e23a0(0x277)](this),this['updateTurnOrderCTB'](!![]);},VisuMZ[_0x361969(0x32a)]['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x361969(0x2d6)]=function(){const _0x444b90=_0x361969;this['preEndActionCTB'](),VisuMZ[_0x444b90(0x32a)][_0x444b90(0x286)][_0x444b90(0x277)](this),this[_0x444b90(0x2fd)]();},BattleManager[_0x361969(0x1d3)]=function(){const _0x207c8e=_0x361969;if(!this[_0x207c8e(0x2f6)]())return;this[_0x207c8e(0x280)]&&this['_subject']['numActions']()<=0x0&&(this[_0x207c8e(0x328)](),this[_0x207c8e(0x280)][_0x207c8e(0x383)](_0x207c8e(0x191)));},BattleManager[_0x361969(0x2fd)]=function(){const _0x2e3eeb=_0x361969;if(!this[_0x2e3eeb(0x2f6)]())return;this[_0x2e3eeb(0x184)](),this[_0x2e3eeb(0x280)]&&this['processTurn']();},VisuMZ[_0x361969(0x32a)][_0x361969(0x209)]=BattleManager[_0x361969(0x22b)],BattleManager['startActorInput']=function(){const _0x48719f=_0x361969;this[_0x48719f(0x184)](),VisuMZ[_0x48719f(0x32a)]['BattleManager_startActorInput'][_0x48719f(0x277)](this);},BattleManager[_0x361969(0x184)]=function(_0x103c93){const _0x3eddce=_0x361969;if(!this['isCTB']())return;const _0xec2723=SceneManager[_0x3eddce(0x1c7)][_0x3eddce(0x312)];if(!_0xec2723)return;_0xec2723['updateTurnOrder'](_0x103c93);},BattleManager[_0x361969(0x328)]=function(){const _0x275013=_0x361969;if(!this['isCTB']())return;const _0x1054ff=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x1054ff)return;_0x1054ff['rotateCTBSprite'](this[_0x275013(0x280)]);},VisuMZ['BattleSystemCTB']['Game_System_initialize']=Game_System['prototype'][_0x361969(0x32d)],Game_System['prototype'][_0x361969(0x32d)]=function(){const _0x1416d7=_0x361969;VisuMZ[_0x1416d7(0x32a)]['Game_System_initialize']['call'](this),this[_0x1416d7(0x2da)]();},Game_System[_0x361969(0x36d)][_0x361969(0x2da)]=function(){const _0x13b706=_0x361969;this[_0x13b706(0x38d)]=!![];},Game_System[_0x361969(0x36d)]['isBattleSystemCTBTurnOrderVisible']=function(){const _0x224dc7=_0x361969;return this[_0x224dc7(0x38d)]===undefined&&(_0x224dc7(0x21b)!==_0x224dc7(0x1f2)?this['initBattleSystemCTB']():this[_0x224dc7(0x363)](_0x356c38-_0x5da3ad)),this['_ctbTurnOrderVisible'];},Game_System[_0x361969(0x36d)][_0x361969(0x390)]=function(_0x570fb8){const _0x3d28b1=_0x361969;this[_0x3d28b1(0x38d)]===undefined&&this['initBattleSystemCTB'](),this['_ctbTurnOrderVisible']=_0x570fb8;},VisuMZ[_0x361969(0x32a)][_0x361969(0x23b)]=Game_Action[_0x361969(0x36d)][_0x361969(0x2a7)],Game_Action['prototype'][_0x361969(0x2a7)]=function(_0xa17757){const _0x97906c=_0x361969;VisuMZ[_0x97906c(0x32a)][_0x97906c(0x23b)][_0x97906c(0x277)](this,_0xa17757),this[_0x97906c(0x1c9)](_0xa17757);},Game_Action[_0x361969(0x36d)][_0x361969(0x1c9)]=function(_0x4b50f8){const _0x3e57f2=_0x361969;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x3e57f2(0x2f6)]())return;if(this[_0x3e57f2(0x1cd)]())this[_0x3e57f2(0x324)](_0x4b50f8);},Game_Action[_0x361969(0x36d)]['applyItemBattleSystemCTBUserEffect']=function(_0x576507){const _0x26956a=_0x361969,_0x56d702=this[_0x26956a(0x1cd)]()['note'];if(_0x576507[_0x26956a(0x262)]()){if(_0x26956a(0x254)!==_0x26956a(0x254))this['createInitialPositions'](),this['createBackgroundSprite'](),this['createGraphicSprite'](),this[_0x26956a(0x285)](),this[_0x26956a(0x288)]();else{const _0x14aee9=VisuMZ[_0x26956a(0x32a)][_0x26956a(0x34f)](this['item'](),'Charge');if(VisuMZ[_0x26956a(0x32a)]['JS'][_0x14aee9]){if(_0x26956a(0x36e)!=='MNwTM'){const _0x30dc18=VisuMZ['BattleSystemCTB']['JS'][_0x14aee9][_0x26956a(0x277)](this,this['subject'](),_0x576507);_0x576507['setCtbChargeTime'](_0x30dc18);}else _0xca3131[_0x26956a(0x2f6)]()?this[_0x26956a(0x230)]():_0x178781[_0x26956a(0x32a)][_0x26956a(0x192)][_0x26956a(0x277)](this);}_0x56d702[_0x26956a(0x1b8)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x26956a(0x235)===_0x26956a(0x235)?_0x576507['setCtbChargeTime'](Number(RegExp['$1'])*0.01):(_0x4a051c[_0x26956a(0x1dc)](),_0x4a3edf['isValid']()?(this[_0x26956a(0x2c4)](),_0x4438d9['removeCurrentAction']()):(_0x545e5e['removeCurrentAction'](),_0x25b1df['setCtbAfterSpeed'](0x0),this[_0x26956a(0x2d6)](),this['_subject']=null))),_0x56d702[_0x26956a(0x1b8)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x576507[_0x26956a(0x1c4)](Number(RegExp['$1'])*0.01);}}else{if(_0x576507[_0x26956a(0x38f)]()){const _0x4375a5=VisuMZ[_0x26956a(0x32a)]['createKeyJS'](this[_0x26956a(0x1cd)](),_0x26956a(0x27b));if(VisuMZ[_0x26956a(0x32a)]['JS'][_0x4375a5]){const _0x3c3f11=VisuMZ['BattleSystemCTB']['JS'][_0x4375a5][_0x26956a(0x277)](this,this['subject'](),_0x576507);_0x576507['setCtbCastTime'](_0x3c3f11);}if(_0x56d702[_0x26956a(0x1b8)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if('DDyep'!==_0x26956a(0x22e))return _0x1ef15a[_0x26956a(0x385)][_0x26956a(0x1e7)];else _0x576507[_0x26956a(0x308)](Number(RegExp['$1'])*0.01);}_0x56d702[_0x26956a(0x1b8)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x576507[_0x26956a(0x374)](Number(RegExp['$1'])*0.01);}}const _0x1cba18=VisuMZ[_0x26956a(0x32a)][_0x26956a(0x34f)](this[_0x26956a(0x1cd)](),_0x26956a(0x18f));if(VisuMZ['BattleSystemCTB']['JS'][_0x1cba18]){const _0x534d74=VisuMZ['BattleSystemCTB']['JS'][_0x1cba18][_0x26956a(0x277)](this,this[_0x26956a(0x1b7)](),_0x576507);_0x576507[_0x26956a(0x205)](_0x534d74);}_0x56d702[_0x26956a(0x1b8)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x576507['setTurnOrderCTB'](Number(RegExp['$1'])),_0x56d702['match'](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x576507[_0x26956a(0x239)](Number(RegExp['$1']));},VisuMZ[_0x361969(0x32a)][_0x361969(0x27a)]=Game_Action[_0x361969(0x36d)][_0x361969(0x293)],Game_Action[_0x361969(0x36d)][_0x361969(0x293)]=function(){const _0x5550d4=_0x361969;VisuMZ[_0x5550d4(0x32a)][_0x5550d4(0x27a)][_0x5550d4(0x277)](this),this[_0x5550d4(0x1df)]();},Game_Action[_0x361969(0x36d)]['applyGlobalBattleSystemCTBEffects']=function(){const _0x334237=_0x361969;if(!this[_0x334237(0x1cd)]())return;if(!BattleManager[_0x334237(0x2f6)]())return;const _0x2e5d2f=this['item']()[_0x334237(0x2bb)];let _0xd9d996=0x0;this[_0x334237(0x26f)]&&(_0xd9d996=this[_0x334237(0x1b7)]()[_0x334237(0x1e5)]);const _0x12c2c0=VisuMZ[_0x334237(0x32a)]['createKeyJS'](this[_0x334237(0x1cd)](),_0x334237(0x2b1));VisuMZ[_0x334237(0x32a)]['JS'][_0x12c2c0]&&(_0x334237(0x26d)==='xscYj'?_0xd9d996+=VisuMZ[_0x334237(0x32a)]['JS'][_0x12c2c0][_0x334237(0x277)](this,this['subject'](),this[_0x334237(0x1b7)]()):_0x3f4573[_0x334237(0x32a)][_0x334237(0x382)][_0x334237(0x277)](this));let _0x6e4b6c=this[_0x334237(0x1cd)]()[_0x334237(0x257)]>0x0?this[_0x334237(0x1cd)]()[_0x334237(0x257)]:0x0;if(this[_0x334237(0x1e4)]())_0x6e4b6c+=this[_0x334237(0x1b7)]()['attackSpeed']();_0xd9d996+=(_0x6e4b6c/0xfa0)['clamp'](0x0,0x1);this['item']()[_0x334237(0x2bb)][_0x334237(0x1b8)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('WNtVh'!==_0x334237(0x203)?_0xe1b3f['changeCtbChargeTime'](_0x1538ff(_0x1b19cb['$1'])*0.01):_0xd9d996+=Number(RegExp['$1'])*0.01);const _0x6c1dab=this[_0x334237(0x1b7)]()[_0x334237(0x34b)]()['concat'](this[_0x334237(0x1b7)]()['skills']()),_0x13460e=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x440d78=_0x6c1dab[_0x334237(0x31d)](_0x4bc2e5=>_0x4bc2e5&&_0x4bc2e5[_0x334237(0x2bb)]['match'](_0x13460e)?Number(RegExp['$1'])*0.01:0x0);_0xd9d996=_0x440d78[_0x334237(0x359)]((_0x3f50bd,_0x1b4eb4)=>_0x3f50bd+_0x1b4eb4,_0xd9d996),this[_0x334237(0x1b7)]()['setCtbAfterSpeed'](_0xd9d996);},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x260)]=function(_0x20060d){this['_tpbChargeTime']=_0x20060d;},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1c4)]=function(_0x2a106b){const _0x3f89b4=_0x361969;this[_0x3f89b4(0x260)](this['_tpbChargeTime']+_0x2a106b);},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x308)]=function(_0x18037f){const _0x4e2e27=_0x361969,_0x14e97e=this[_0x4e2e27(0x2e0)]();this[_0x4e2e27(0x1e0)]=_0x14e97e*_0x18037f;},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x374)]=function(_0x58e469){const _0x5ce721=_0x361969,_0x31ab6f=this[_0x5ce721(0x2e0)](),_0x56fa18=_0x31ab6f*_0x58e469;this[_0x5ce721(0x1e0)]=this['_tpbCastTime']+_0x56fa18;},VisuMZ[_0x361969(0x32a)][_0x361969(0x2c1)]=Game_BattlerBase[_0x361969(0x36d)]['appear'],Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x2ef)]=function(){const _0x5147e0=_0x361969;VisuMZ[_0x5147e0(0x32a)][_0x5147e0(0x2c1)][_0x5147e0(0x277)](this),BattleManager['updateTurnOrderCTB']();},VisuMZ[_0x361969(0x32a)][_0x361969(0x25c)]=Game_BattlerBase['prototype'][_0x361969(0x2ee)],Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x2ee)]=function(){const _0x2922bc=_0x361969;VisuMZ[_0x2922bc(0x32a)]['Game_BattlerBase_hide'][_0x2922bc(0x277)](this),BattleManager[_0x2922bc(0x184)]();},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1ec)]=function(){const _0x2b91ef=_0x361969;delete this[_0x2b91ef(0x270)],delete this[_0x2b91ef(0x215)],delete this[_0x2b91ef(0x210)],delete this[_0x2b91ef(0x2cb)];},Game_BattlerBase[_0x361969(0x36d)]['TurnOrderCTBGraphicType']=function(){const _0x1431e6=_0x361969;if(this[_0x1431e6(0x270)]===undefined){if(_0x1431e6(0x27f)===_0x1431e6(0x27f))this[_0x1431e6(0x270)]=this[_0x1431e6(0x2dd)]();else{const _0x3a9198=_0x2e9c4e[_0x1431e6(0x370)[_0x1431e6(0x1ca)](_0x273ac8)],_0xb5fe9b={'textColor':_0x722324[_0x1431e6(0x36c)](_0x13af22[_0x1431e6(0x279)['format'](_0x3a006d)]),'flashColor':_0x15c3cd[_0x1431e6(0x272)[_0x1431e6(0x1ca)](_0x475c20)],'flashDuration':_0x939a96[_0x1431e6(0x294)[_0x1431e6(0x1ca)](_0x438f94)]};this[_0x1431e6(0x377)](_0x3a9198,_0xb5fe9b);}}return this[_0x1431e6(0x270)];},Game_BattlerBase[_0x361969(0x36d)]['createTurnOrderCTBGraphicType']=function(){const _0x1a4659=_0x361969;return Window_CTB_TurnOrder[_0x1a4659(0x385)][_0x1a4659(0x35a)];},Game_BattlerBase[_0x361969(0x36d)]['TurnOrderCTBGraphicFaceName']=function(){const _0x534c33=_0x361969;return this['_ctbTurnOrderFaceName']===undefined&&(this['_ctbTurnOrderFaceName']=this[_0x534c33(0x271)]()),this[_0x534c33(0x215)];},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x271)]=function(){const _0x4d4a15=_0x361969;return Window_CTB_TurnOrder[_0x4d4a15(0x385)][_0x4d4a15(0x1e7)];},Game_BattlerBase[_0x361969(0x36d)]['TurnOrderCTBGraphicFaceIndex']=function(){const _0x4fec5e=_0x361969;return this[_0x4fec5e(0x210)]===undefined&&(this[_0x4fec5e(0x210)]=this[_0x4fec5e(0x1ae)]()),this['_ctbTurnOrderFaceIndex'];},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1ae)]=function(){const _0x39c8c5=_0x361969;return Window_CTB_TurnOrder[_0x39c8c5(0x385)][_0x39c8c5(0x182)];},Game_BattlerBase[_0x361969(0x36d)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x199ca3=_0x361969;if(this[_0x199ca3(0x2cb)]===undefined){if(_0x199ca3(0x351)===_0x199ca3(0x351))this[_0x199ca3(0x2cb)]=this[_0x199ca3(0x1a4)]();else return _0xd53a63[_0x199ca3(0x251)]/0xa;}return this[_0x199ca3(0x2cb)];},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1a4)]=function(){const _0x1d41e5=_0x361969;return Window_CTB_TurnOrder[_0x1d41e5(0x385)][_0x1d41e5(0x29f)];},Game_BattlerBase['prototype']['setCTBGraphicIconIndex']=function(_0x29edfd){const _0x5e4fbc=_0x361969;this[_0x5e4fbc(0x2cb)]=_0x29edfd;},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x212)]=function(_0x508ffe,_0x423988){const _0x2851d8=_0x361969;if(this[_0x2851d8(0x1c8)]())return Number[_0x2851d8(0x2e8)];if(!this[_0x2851d8(0x2ce)]())return Number[_0x2851d8(0x2e8)];if(_0x508ffe===0x1&&!_0x423988){if(this===BattleManager[_0x2851d8(0x280)])return Number[_0x2851d8(0x251)]/0xa;if(this===BattleManager[_0x2851d8(0x2f3)]())return Number[_0x2851d8(0x251)]/0xa;if(BattleManager['_actionBattlers']&&BattleManager[_0x2851d8(0x34e)]['includes'](this)){let _0x563900=Number[_0x2851d8(0x251)]/0x1388;return _0x563900+=BattleManager[_0x2851d8(0x34e)][_0x2851d8(0x2bc)](this)*0x5,_0x563900;}}return _0x508ffe-=this[_0x2851d8(0x1af)](),_0x508ffe/=this[_0x2851d8(0x1bb)](),_0x508ffe+=this[_0x2851d8(0x1a3)](),_0x508ffe;},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1a3)]=function(){const _0x288f13=_0x361969;return this[_0x288f13(0x315)]===_0x288f13(0x2d2)?(this['tpbRequiredCastTime']()-this[_0x288f13(0x1e0)])/this[_0x288f13(0x1bb)]():0x0;},VisuMZ[_0x361969(0x32a)]['Game_Battler_initTpbChargeTime']=Game_Battler[_0x361969(0x36d)][_0x361969(0x244)],Game_Battler['prototype'][_0x361969(0x244)]=function(_0x2f2ceb){const _0xe1f756=_0x361969;if(BattleManager[_0xe1f756(0x2f6)]())this[_0xe1f756(0x2cd)](_0x2f2ceb);else{if(_0xe1f756(0x1b3)===_0xe1f756(0x1b3))VisuMZ[_0xe1f756(0x32a)]['Game_Battler_initTpbChargeTime'][_0xe1f756(0x277)](this,_0x2f2ceb);else return this[_0xe1f756(0x27e)]?this[_0xe1f756(0x27e)][_0xe1f756(0x1dd)]()[this['_index']]:null;}},Game_Battler[_0x361969(0x36d)][_0x361969(0x2cd)]=function(_0x5be51b){const _0x438d7f=_0x361969,_0x5706e9=VisuMZ[_0x438d7f(0x32a)]['Settings']['Mechanics'];let _0x4d35d7=this[_0x438d7f(0x223)]()*eval(_0x5706e9[_0x438d7f(0x240)]);const _0x4b6418=this[_0x438d7f(0x34b)]()[_0x438d7f(0x2db)](this[_0x438d7f(0x38b)]()),_0x12420f=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x44fbb2=_0x4b6418[_0x438d7f(0x31d)](_0x5b01f7=>_0x5b01f7&&_0x5b01f7[_0x438d7f(0x2bb)][_0x438d7f(0x1b8)](_0x12420f)?Number(RegExp['$1'])*0.01:0x0);_0x4d35d7=_0x44fbb2[_0x438d7f(0x359)]((_0x443ad9,_0x3e8ca2)=>_0x443ad9+_0x3e8ca2,_0x4d35d7),this['_tpbState']=_0x438d7f(0x268),this[_0x438d7f(0x1e5)]=(_0x5be51b?0x1:_0x4d35d7)['clamp'](0x0,0x1),this['isRestricted']()&&(_0x438d7f(0x289)===_0x438d7f(0x342)?this['updateTpb']():this[_0x438d7f(0x1e5)]=0x0);},Game_Battler[_0x361969(0x36d)][_0x361969(0x262)]=function(){const _0x17d11c=_0x361969;return this[_0x17d11c(0x315)]===_0x17d11c(0x268);},Game_Battler[_0x361969(0x36d)]['isCtbCastingState']=function(){const _0x2d40d5=_0x361969;return this[_0x2d40d5(0x315)]===_0x2d40d5(0x2d2)&&this[_0x2d40d5(0x292)]()&&this[_0x2d40d5(0x292)]()[_0x2d40d5(0x1cd)]()&&this[_0x2d40d5(0x292)]()[_0x2d40d5(0x1cd)]()[_0x2d40d5(0x257)]<0x0;},Game_BattlerBase[_0x361969(0x36d)][_0x361969(0x1b5)]=function(){const _0xa218d2=_0x361969;if(this[_0xa218d2(0x38f)]()){if(_0xa218d2(0x360)!==_0xa218d2(0x296))return this[_0xa218d2(0x1e0)]/this['tpbRequiredCastTime']();else{const _0x575101=_0x581b7f[_0xa218d2(0x385)];if(!_0x575101['EnemyBattlerDrawLetter'])return;if(this[_0xa218d2(0x27e)]===_0x30f1b8)return;const _0x113b0c=this['bitmapWidth'](),_0x3e3ca9=this[_0xa218d2(0x2e3)](),_0x1d9e5d=new _0x39ca3f();_0x1d9e5d[_0xa218d2(0x25e)]['x']=this[_0xa218d2(0x25e)]['x'],_0x1d9e5d[_0xa218d2(0x25e)]['y']=this['anchor']['y'],_0x1d9e5d['bitmap']=new _0x19e385(_0x113b0c,_0x3e3ca9),this[_0xa218d2(0x243)]=_0x1d9e5d,this['addChild'](this[_0xa218d2(0x243)]);}}else return 0x0;},Game_Battler[_0x361969(0x36d)][_0x361969(0x32b)]=function(){return!this['canMove']();},Game_Battler[_0x361969(0x36d)][_0x361969(0x266)]=function(_0x7919a){const _0x515ebe=_0x361969;this[_0x515ebe(0x198)]=_0x7919a;},VisuMZ[_0x361969(0x32a)]['Game_Battler_onRestrict']=Game_Battler[_0x361969(0x36d)]['onRestrict'],Game_Battler[_0x361969(0x36d)]['onRestrict']=function(){const _0x268bb1=_0x361969;this['_onRestrictBypassCtbReset']=BattleManager[_0x268bb1(0x2f6)](),VisuMZ[_0x268bb1(0x32a)][_0x268bb1(0x261)]['call'](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x361969(0x32a)][_0x361969(0x2de)]=Game_Battler[_0x361969(0x36d)][_0x361969(0x1fb)],Game_Battler[_0x361969(0x36d)]['clearTpbChargeTime']=function(){const _0x231204=_0x361969;BattleManager[_0x231204(0x2f6)]()?this['clearTpbChargeTimeCTB']():VisuMZ[_0x231204(0x32a)][_0x231204(0x2de)][_0x231204(0x277)](this);},Game_Battler['prototype']['clearTpbChargeTimeCTB']=function(){const _0x72ca54=_0x361969;if(this[_0x72ca54(0x18b)])return;this[_0x72ca54(0x315)]=_0x72ca54(0x268),this['_tpbChargeTime']-=0x1,this[_0x72ca54(0x1e5)]+=this['_ctbAfterSpeed']||0x0;},VisuMZ[_0x361969(0x32a)][_0x361969(0x2ec)]=Game_Battler['prototype'][_0x361969(0x1f0)],Game_Battler['prototype'][_0x361969(0x1f0)]=function(){const _0x912604=_0x361969;BattleManager[_0x912604(0x2f6)]()?this[_0x912604(0x1e6)]():_0x912604(0x37a)==='BIFHC'?VisuMZ[_0x912604(0x32a)][_0x912604(0x2ec)]['call'](this):this[_0x912604(0x1a0)]=_0x226ec8?_0x5aff7f[_0x912604(0x2fe)]-this[_0x912604(0x1a0)]-_0x1286cc[_0x912604(0x314)]:0x0;},Game_Battler[_0x361969(0x36d)][_0x361969(0x1e6)]=function(){const _0x2f0bbc=_0x361969;this['_tpbState']=_0x2f0bbc(0x268),this[_0x2f0bbc(0x1e5)]+=VisuMZ[_0x2f0bbc(0x32a)][_0x2f0bbc(0x385)][_0x2f0bbc(0x1b4)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x361969(0x32a)]['Game_Battler_tpbSpeed']=Game_Battler[_0x361969(0x36d)][_0x361969(0x24e)],Game_Battler['prototype']['tpbSpeed']=function(){const _0x15ed18=_0x361969;if(BattleManager[_0x15ed18(0x2f6)]())return VisuMZ[_0x15ed18(0x32a)][_0x15ed18(0x385)][_0x15ed18(0x1b4)][_0x15ed18(0x350)][_0x15ed18(0x277)](this,this);else{if(_0x15ed18(0x2f1)!==_0x15ed18(0x36a))return VisuMZ[_0x15ed18(0x32a)][_0x15ed18(0x1ff)][_0x15ed18(0x277)](this);else{if(this[_0x15ed18(0x18b)])return;this[_0x15ed18(0x315)]=_0x15ed18(0x268),this[_0x15ed18(0x1e5)]-=0x1,this[_0x15ed18(0x1e5)]+=this[_0x15ed18(0x198)]||0x0;}}},VisuMZ[_0x361969(0x32a)]['Game_Battler_tpbBaseSpeed']=Game_Battler[_0x361969(0x36d)][_0x361969(0x334)],Game_Battler[_0x361969(0x36d)][_0x361969(0x334)]=function(){const _0x1c69e6=_0x361969;return BattleManager[_0x1c69e6(0x2f6)]()?VisuMZ[_0x1c69e6(0x32a)][_0x1c69e6(0x385)][_0x1c69e6(0x1b4)][_0x1c69e6(0x313)]['call'](this,this):VisuMZ[_0x1c69e6(0x32a)][_0x1c69e6(0x2a1)][_0x1c69e6(0x277)](this);},VisuMZ['BattleSystemCTB'][_0x361969(0x24d)]=Game_Battler['prototype'][_0x361969(0x223)],Game_Battler['prototype'][_0x361969(0x223)]=function(){const _0x2d4db7=_0x361969;if(BattleManager[_0x2d4db7(0x2f6)]())return VisuMZ[_0x2d4db7(0x32a)]['Settings'][_0x2d4db7(0x1b4)]['BattlerRelativeSpeedJS'][_0x2d4db7(0x277)](this,this);else{if(_0x2d4db7(0x2c3)===_0x2d4db7(0x346)){this[_0x2d4db7(0x33f)]=new _0x3f48ca(0x48,0x24);const _0x56e25f=this[_0x2d4db7(0x259)]()?this[_0x2d4db7(0x259)]()['name']():'%1\x20%2\x20%3'[_0x2d4db7(0x1ca)](this[_0x2d4db7(0x27e)],this[_0x2d4db7(0x309)],this[_0x2d4db7(0x2d4)]);this[_0x2d4db7(0x33f)][_0x2d4db7(0x1ef)](_0x56e25f,0x0,0x0,0x48,0x24,_0x2d4db7(0x1fe));}else return VisuMZ[_0x2d4db7(0x32a)][_0x2d4db7(0x24d)][_0x2d4db7(0x277)](this);}},VisuMZ[_0x361969(0x32a)][_0x361969(0x37d)]=Game_Battler['prototype']['tpbAcceleration'],Game_Battler[_0x361969(0x36d)][_0x361969(0x1bb)]=function(){const _0xeb78ea=_0x361969;if(BattleManager[_0xeb78ea(0x2f6)]()){let _0x55dc18=VisuMZ[_0xeb78ea(0x32a)]['Settings'][_0xeb78ea(0x1b4)][_0xeb78ea(0x214)][_0xeb78ea(0x277)](this,this);const _0x583ace=0x0;return _0x55dc18+_0x583ace;}else return VisuMZ[_0xeb78ea(0x32a)][_0xeb78ea(0x37d)][_0xeb78ea(0x277)](this);},VisuMZ[_0x361969(0x32a)][_0x361969(0x208)]=Game_Battler['prototype'][_0x361969(0x2e0)],Game_Battler['prototype'][_0x361969(0x2e0)]=function(){const _0x1323de=_0x361969;return BattleManager[_0x1323de(0x2f6)]()?VisuMZ['BattleSystemCTB'][_0x1323de(0x385)][_0x1323de(0x1b4)][_0x1323de(0x231)][_0x1323de(0x277)](this,this):VisuMZ[_0x1323de(0x32a)]['Game_Battler_tpbRequiredCastTime'][_0x1323de(0x277)](this);},Game_Battler[_0x361969(0x36d)]['getCurrentTurnOrderPositionCTB']=function(){const _0x414a99=_0x361969,_0x3f4f6a=SceneManager[_0x414a99(0x1c7)][_0x414a99(0x312)];if(!_0x3f4f6a)return-0x1;const _0x3f0574=_0x3f4f6a[_0x414a99(0x21f)];if(!_0x3f0574)return-0x1;const _0x22c4d3=_0x3f0574[_0x414a99(0x2f2)](_0x50bc82=>_0x50bc82[_0x414a99(0x259)]()===this);return _0x3f0574[_0x414a99(0x2bc)](_0x22c4d3);},Game_Battler['prototype'][_0x361969(0x239)]=function(_0x525e27){const _0x5d4a1f=_0x361969;if(!BattleManager[_0x5d4a1f(0x2f6)]())return;if(!SceneManager[_0x5d4a1f(0x216)]())return;if(this===BattleManager[_0x5d4a1f(0x2f3)]())return;if(this===BattleManager[_0x5d4a1f(0x280)])return;const _0x2cfa18=this[_0x5d4a1f(0x320)]();if(_0x2cfa18<0x0)return;this[_0x5d4a1f(0x205)](_0x2cfa18+_0x525e27);},Game_Battler[_0x361969(0x36d)][_0x361969(0x205)]=function(_0x4ca648){const _0x1202e8=_0x361969;if(!BattleManager[_0x1202e8(0x2f6)]())return;if(!SceneManager[_0x1202e8(0x216)]())return;if(this===BattleManager[_0x1202e8(0x2f3)]())return;if(this===BattleManager[_0x1202e8(0x280)])return;_0x4ca648=Math['max'](_0x4ca648,0x1),this[_0x1202e8(0x368)](_0x4ca648);},Game_Battler[_0x361969(0x36d)]['processTurnOrderChangeCTB']=function(_0x4ad69d){const _0x33f7f3=_0x361969;if(!BattleManager[_0x33f7f3(0x2f6)]())return;if(!SceneManager[_0x33f7f3(0x216)]())return;if(this===BattleManager[_0x33f7f3(0x2f3)]())return;if(this===BattleManager[_0x33f7f3(0x280)])return;const _0x42e5bf=SceneManager[_0x33f7f3(0x1c7)][_0x33f7f3(0x312)];if(!_0x42e5bf)return;const _0x6c3362=_0x42e5bf['_turnOrderContainer'];if(!_0x6c3362)return;const _0x5da990=this['getCurrentTurnOrderPositionCTB']();_0x5da990!==_0x4ad69d&&this[_0x33f7f3(0x363)](_0x4ad69d-_0x5da990);let _0x4f2425=_0x4ad69d,_0x44713f=_0x4ad69d;_0x5da990>_0x4ad69d?_0x4f2425-=0x1:_0x33f7f3(0x242)===_0x33f7f3(0x38e)?this[_0x33f7f3(0x215)]=this['createTurnOrderCTBGraphicFaceName']():_0x44713f+=0x1;const _0x556534=_0x6c3362[_0x4f2425]['ticksLeft'](!![]),_0x46d7a3=_0x6c3362[_0x44713f][_0x33f7f3(0x1f5)](!![]),_0x4416ae=(_0x556534+_0x46d7a3)/0x2;let _0x59f091=_0x4416ae*this[_0x33f7f3(0x1bb)]();if(this[_0x33f7f3(0x315)]==='charging')this[_0x33f7f3(0x1e5)]=0x1-_0x59f091;else this['_tpbState']===_0x33f7f3(0x2d2)&&(_0x33f7f3(0x1d8)!==_0x33f7f3(0x1d8)?(this[_0x33f7f3(0x2d4)]=_0x257536-0x1,this[_0x33f7f3(0x1a1)](0x0)):this[_0x33f7f3(0x1e0)]=this['tpbRequiredCastTime']()-_0x59f091);BattleManager[_0x33f7f3(0x34e)]=[],BattleManager[_0x33f7f3(0x184)]();},Game_Battler[_0x361969(0x36d)][_0x361969(0x363)]=function(_0x3a8ec6){const _0x3eee8e=_0x361969,_0x1476aa=VisuMZ[_0x3eee8e(0x32a)][_0x3eee8e(0x385)][_0x3eee8e(0x255)],_0x4ae5f2=_0x3a8ec6>0x0?_0x3eee8e(0x30c):'Rush';if(_0x1476aa[_0x3eee8e(0x27c)[_0x3eee8e(0x1ca)](_0x4ae5f2)]){if(_0x3eee8e(0x339)===_0x3eee8e(0x339)){const _0x2930d8=_0x1476aa['%1AnimationID'[_0x3eee8e(0x1ca)](_0x4ae5f2)],_0x87fb88=_0x1476aa[_0x3eee8e(0x189)['format'](_0x4ae5f2)],_0x5cd8e1=_0x1476aa[_0x3eee8e(0x1ee)[_0x3eee8e(0x1ca)](_0x4ae5f2)];$gameTemp[_0x3eee8e(0x222)]([this],_0x2930d8,_0x87fb88,_0x5cd8e1);}else{const _0x324f01=_0xb2362f(_0x2bb15b['$1']),_0x451466=_0x3eee8e(0x2d1)['format'](_0x324f01,_0x5f1053),_0x5d21e3=_0x3237e0['BattleSystemCTB'][_0x3eee8e(0x34f)](_0x4d6a1c,_0xf71801);_0x467501[_0x3eee8e(0x32a)]['JS'][_0x5d21e3]=new _0x175cdf(_0x451466);}}if(this[_0x3eee8e(0x259)]()&&_0x1476aa[_0x3eee8e(0x370)[_0x3eee8e(0x1ca)](_0x4ae5f2)][_0x3eee8e(0x352)]>0x0){const _0x5a4d52=_0x1476aa[_0x3eee8e(0x370)['format'](_0x4ae5f2)],_0x3b0580={'textColor':ColorManager[_0x3eee8e(0x36c)](_0x1476aa[_0x3eee8e(0x279)['format'](_0x4ae5f2)]),'flashColor':_0x1476aa[_0x3eee8e(0x272)[_0x3eee8e(0x1ca)](_0x4ae5f2)],'flashDuration':_0x1476aa['%1FlashDuration'[_0x3eee8e(0x1ca)](_0x4ae5f2)]};this[_0x3eee8e(0x377)](_0x5a4d52,_0x3b0580);}},VisuMZ[_0x361969(0x32a)][_0x361969(0x311)]=Game_Battler['prototype'][_0x361969(0x19c)],Game_Battler['prototype'][_0x361969(0x19c)]=function(){const _0x630a81=_0x361969;if(BattleManager[_0x630a81(0x24c)](this))return;VisuMZ[_0x630a81(0x32a)][_0x630a81(0x311)][_0x630a81(0x277)](this);},BattleManager[_0x361969(0x24c)]=function(_0x32a8af){const _0x7860c3=_0x361969;return BattleManager[_0x7860c3(0x319)]()[_0x7860c3(0x217)](_0x42cba9=>_0x42cba9!==_0x32a8af)[_0x7860c3(0x2d9)](_0x58c62c=>_0x58c62c[_0x7860c3(0x30a)]()&&_0x58c62c[_0x7860c3(0x307)]()&&_0x58c62c[_0x7860c3(0x198)]>=0x1);},VisuMZ['BattleSystemCTB']['Game_Battler_updateTpbChargeTime']=Game_Battler[_0x361969(0x36d)]['updateTpbChargeTime'],Game_Battler[_0x361969(0x36d)][_0x361969(0x1d5)]=function(){const _0x378a41=_0x361969;BattleManager[_0x378a41(0x2f6)]()?this['updateTpbChargeTimeCTB']():VisuMZ[_0x378a41(0x32a)][_0x378a41(0x192)][_0x378a41(0x277)](this);},Game_Battler[_0x361969(0x36d)][_0x361969(0x230)]=function(){const _0x5507e0=_0x361969;this['_tpbState']==='charging'&&(this[_0x5507e0(0x1e5)]+=this[_0x5507e0(0x1bb)](),this[_0x5507e0(0x1e5)]>=0x1&&this[_0x5507e0(0x1be)]());},VisuMZ[_0x361969(0x32a)][_0x361969(0x24b)]=Game_Battler[_0x361969(0x36d)][_0x361969(0x1fd)],Game_Battler[_0x361969(0x36d)]['updateTpbCastTime']=function(){const _0x431437=_0x361969;BattleManager['isCTB']()?this['updateTpbCastTimeCTB']():VisuMZ[_0x431437(0x32a)]['Game_Battler_updateTpbCastTime'][_0x431437(0x277)](this);},Game_Battler[_0x361969(0x36d)][_0x361969(0x28d)]=function(){const _0x49d0de=_0x361969;if(this[_0x49d0de(0x315)]==='casting'){if(_0x49d0de(0x380)==='RHlLY')_0x3ea36c='enemy';else{this[_0x49d0de(0x1e0)]+=this[_0x49d0de(0x1bb)]();if(this['_tpbCastTime']>=this[_0x49d0de(0x2e0)]()){if('bzzKi'!==_0x49d0de(0x181))return this[_0x49d0de(0x2cb)]===_0x408ea5&&(this[_0x49d0de(0x2cb)]=this[_0x49d0de(0x1a4)]()),this[_0x49d0de(0x2cb)];else this['_tpbState']='ready';}}}},Game_Actor[_0x361969(0x36d)][_0x361969(0x2dd)]=function(){const _0x2dc050=_0x361969,_0xf2533e=this['actor']()[_0x2dc050(0x2bb)];if(_0xf2533e[_0x2dc050(0x1b8)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0xf2533e[_0x2dc050(0x1b8)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x2dc050(0x36f)===_0x2dc050(0x36f))return'icon';else{const _0x307feb=this[_0x2dc050(0x259)]();if(!_0x307feb)return;if(this[_0x2dc050(0x37b)]===_0x307feb[_0x2dc050(0x30a)]()&&this[_0x2dc050(0x25f)]===_0x307feb['isAppeared']())return;this[_0x2dc050(0x37b)]=_0x307feb[_0x2dc050(0x30a)](),this[_0x2dc050(0x25f)]=_0x307feb[_0x2dc050(0x2ce)]();let _0x3f7411=this['_isAlive']&&this[_0x2dc050(0x25f)]?0xff:0x0;this['startFade'](_0x3f7411);}}}return Window_CTB_TurnOrder[_0x2dc050(0x385)][_0x2dc050(0x211)];},Game_Actor[_0x361969(0x36d)]['TurnOrderCTBGraphicFaceName']=function(){const _0x41c303=_0x361969,_0x43e30c=this[_0x41c303(0x2f3)]()[_0x41c303(0x2bb)];if(_0x43e30c['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x41c303(0x26b)===_0x41c303(0x2e5))this[_0x41c303(0x1a1)](0xff);else return String(RegExp['$1']);}return this[_0x41c303(0x253)]();},Game_Actor[_0x361969(0x36d)]['TurnOrderCTBGraphicFaceIndex']=function(){const _0x368cc9=_0x361969,_0x3ddff5=this[_0x368cc9(0x2f3)]()[_0x368cc9(0x2bb)];if(_0x3ddff5[_0x368cc9(0x1b8)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('UQHzJ'!=='pzUck')return Number(RegExp['$2']);else _0x26752b[_0x368cc9(0x1ef)](this[_0x368cc9(0x202)][_0x368cc9(0x22c)](),0x0,_0x213d65/0x2,_0x25bc93,_0xa63393/0x2,_0x368cc9(0x1fe));}return this['faceIndex']();},Game_Actor[_0x361969(0x36d)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x576718=_0x361969,_0x384090=this['actor']()[_0x576718(0x2bb)];if(_0x384090['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x576718(0x385)][_0x576718(0x2dc)];},Game_Enemy[_0x361969(0x36d)][_0x361969(0x2dd)]=function(){const _0x32bce9=_0x361969,_0x330c6c=this[_0x32bce9(0x323)]()['note'];if(_0x330c6c[_0x32bce9(0x1b8)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x32bce9(0x340)==='mRpTp')for(let _0x37694a=0x0;_0x37694a<_0x90bb5a;_0x37694a++){const _0x5cf7ba=new _0x31673e(_0x36026f,_0x8e9a54,_0x37694a);this[_0x32bce9(0x275)][_0x32bce9(0x1ea)](_0x5cf7ba),this[_0x32bce9(0x21f)]['push'](_0x5cf7ba);}else return _0x32bce9(0x305);}else{if(_0x330c6c[_0x32bce9(0x1b8)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x32bce9(0x199)!=='WcPyj')return _0x32bce9(0x2ff);else{const _0x19d636=this[_0x32bce9(0x2e0)](),_0x1a1b46=_0x19d636*_0x4ffd43;this[_0x32bce9(0x1e0)]=this[_0x32bce9(0x1e0)]+_0x1a1b46;}}}return Window_CTB_TurnOrder['Settings']['EnemyBattlerType'];},Game_Enemy[_0x361969(0x36d)][_0x361969(0x271)]=function(){const _0x3686b4=_0x361969,_0x35da4f=this[_0x3686b4(0x323)]()['note'];if(_0x35da4f['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x3686b4(0x385)][_0x3686b4(0x1e7)];},Game_Enemy[_0x361969(0x36d)][_0x361969(0x1ae)]=function(){const _0x4947ef=_0x361969,_0x31e37d=this['enemy']()[_0x4947ef(0x2bb)];if(_0x31e37d['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4947ef(0x2fc)!=='soSxU'?Number(RegExp['$2']):_0x1b0c4f['y']-_0x2e500d['y'];return Window_CTB_TurnOrder[_0x4947ef(0x385)][_0x4947ef(0x182)];},Game_Enemy[_0x361969(0x36d)][_0x361969(0x1a4)]=function(){const _0x54a210=_0x361969,_0x2090ac=this['enemy']()[_0x54a210(0x2bb)];if(_0x2090ac[_0x54a210(0x1b8)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if('hMKJM'!==_0x54a210(0x2c7)){const _0x12169c=this[_0x54a210(0x323)]()[_0x54a210(0x2bb)];if(_0x12169c[_0x54a210(0x1b8)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x276a5a(_0x58b0c6['$1']);return _0x1a1a14[_0x54a210(0x385)]['EnemyBattlerFaceName'];}else return Number(RegExp['$1']);}return Window_CTB_TurnOrder[_0x54a210(0x385)][_0x54a210(0x29f)];},VisuMZ['BattleSystemCTB'][_0x361969(0x183)]=Scene_Battle['prototype'][_0x361969(0x1d2)],Scene_Battle[_0x361969(0x36d)]['createAllWindows']=function(){const _0x28ca03=_0x361969;VisuMZ[_0x28ca03(0x32a)][_0x28ca03(0x183)][_0x28ca03(0x277)](this),this[_0x28ca03(0x213)]();},Scene_Battle[_0x361969(0x36d)][_0x361969(0x213)]=function(){const _0x1a1aaa=_0x361969;if(!BattleManager['isCTB']())return;this[_0x1a1aaa(0x312)]=new Window_CTB_TurnOrder();const _0x3cb0a0=this['getChildIndex'](this[_0x1a1aaa(0x32c)]);this[_0x1a1aaa(0x21c)](this['_ctbTurnOrderWindow'],_0x3cb0a0),this[_0x1a1aaa(0x1e3)](),BattleManager[_0x1a1aaa(0x184)](!![]);},Scene_Battle[_0x361969(0x36d)][_0x361969(0x1e3)]=function(){const _0xdc7f87=_0x361969,_0x245764=Window_CTB_TurnOrder[_0xdc7f87(0x385)];if(_0x245764[_0xdc7f87(0x278)]!==_0xdc7f87(0x238))return;if(!_0x245764[_0xdc7f87(0x1b1)])return;if(!this[_0xdc7f87(0x1a2)])return;const _0x17c9d7=this[_0xdc7f87(0x312)]['y']-Math[_0xdc7f87(0x2e4)]((Graphics[_0xdc7f87(0x194)]-Graphics[_0xdc7f87(0x21d)])/0x2),_0xc85dd2=_0x17c9d7+this['_ctbTurnOrderWindow']['height'];this[_0xdc7f87(0x1a2)]['y']=_0xc85dd2+_0x245764[_0xdc7f87(0x2df)];};function Sprite_CTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]=Object['create'](Sprite_Clickable[_0x361969(0x36d)]),Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x200)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x32d)]=function(_0x554ff6,_0x245bd5,_0x31c8a6){const _0x3f78d7=_0x361969;this['initMembers'](_0x554ff6,_0x245bd5,_0x31c8a6),Sprite_Clickable[_0x3f78d7(0x36d)]['initialize'][_0x3f78d7(0x277)](this),this[_0x3f78d7(0x1c6)]();},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2cc)]=function(_0x3e1d9f,_0x26d897,_0x1c1b02){const _0x1b92a3=_0x361969;this[_0x1b92a3(0x27e)]=_0x3e1d9f,this[_0x1b92a3(0x309)]=_0x26d897,this['_dupe']=_0x1c1b02;const _0x2a0a56=Window_CTB_TurnOrder[_0x1b92a3(0x385)],_0x11d5c4=this[_0x1b92a3(0x318)](),_0x2c68b2=this[_0x1b92a3(0x2f7)]();this['_positionDuration']=0x0,this[_0x1b92a3(0x1a0)]=_0x11d5c4?_0x2a0a56[_0x1b92a3(0x314)]*_0x2c68b2:0x0,this[_0x1b92a3(0x26c)]=_0x11d5c4?0x0:_0x2a0a56[_0x1b92a3(0x314)]*_0x2c68b2,this['_fadeDuration']=0x0,this['_fadeTarget']=0xff,this[_0x1b92a3(0x37b)]=!![],this[_0x1b92a3(0x25f)]=!![];},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['createChildren']=function(){const _0x50398b=_0x361969;this[_0x50398b(0x1ed)](),this[_0x50398b(0x33a)](),this[_0x50398b(0x354)](),this['createBorderSprite'](),this['createLetterSprite']();},Sprite_CTB_TurnOrder_Battler['prototype'][_0x361969(0x1ed)]=function(){const _0x4086f9=_0x361969;this['x']=this[_0x4086f9(0x1a0)],this['y']=this[_0x4086f9(0x26c)];},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x318)]=function(){const _0x2487bd=_0x361969,_0x4b8766=Window_CTB_TurnOrder[_0x2487bd(0x385)],_0x595525=[_0x2487bd(0x238),'bottom'][_0x2487bd(0x187)](_0x4b8766[_0x2487bd(0x278)]);return _0x595525;},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x1a7)]=function(){const _0x569c2e=_0x361969,_0x13f4fe=Window_CTB_TurnOrder['Settings'];return this[_0x569c2e(0x318)]()?_0x13f4fe[_0x569c2e(0x314)]:_0x13f4fe[_0x569c2e(0x228)];},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['bitmapHeight']=function(){const _0x321e0a=_0x361969,_0x5af11d=Window_CTB_TurnOrder[_0x321e0a(0x385)];return this[_0x321e0a(0x318)]()?_0x5af11d[_0x321e0a(0x228)]:_0x5af11d[_0x321e0a(0x314)];},Sprite_CTB_TurnOrder_Battler['prototype']['createTestBitmap']=function(){const _0x221da4=_0x361969;this[_0x221da4(0x33f)]=new Bitmap(0x48,0x24);const _0x15e5f4=this[_0x221da4(0x259)]()?this[_0x221da4(0x259)]()[_0x221da4(0x389)]():_0x221da4(0x33c)[_0x221da4(0x1ca)](this[_0x221da4(0x27e)],this[_0x221da4(0x309)],this['_dupe']);this[_0x221da4(0x33f)][_0x221da4(0x1ef)](_0x15e5f4,0x0,0x0,0x48,0x24,_0x221da4(0x1fe));},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x33a)]=function(){const _0x1c5340=_0x361969;if(!Window_CTB_TurnOrder[_0x1c5340(0x385)][_0x1c5340(0x193)])return;const _0x3e84e6=Window_CTB_TurnOrder[_0x1c5340(0x385)],_0x45202a=this[_0x1c5340(0x27e)]===$gameParty?_0x1c5340(0x375):_0x1c5340(0x221),_0x5e1d31=_0x1c5340(0x356)[_0x1c5340(0x1ca)](_0x45202a),_0x3d2c92=new Sprite();_0x3d2c92[_0x1c5340(0x25e)]['x']=this[_0x1c5340(0x25e)]['x'],_0x3d2c92['anchor']['y']=this['anchor']['y'];if(_0x3e84e6[_0x5e1d31])_0x3d2c92[_0x1c5340(0x33f)]=ImageManager[_0x1c5340(0x227)](_0x3e84e6[_0x5e1d31]);else{const _0x43e58e=this[_0x1c5340(0x1a7)](),_0x286a74=this[_0x1c5340(0x2e3)]();_0x3d2c92['bitmap']=new Bitmap(_0x43e58e,_0x286a74);const _0x4b3a1f=ColorManager['getColor'](_0x3e84e6[_0x1c5340(0x26a)['format'](_0x45202a)]),_0x1eb09e=ColorManager[_0x1c5340(0x36c)](_0x3e84e6[_0x1c5340(0x2a2)['format'](_0x45202a)]);_0x3d2c92[_0x1c5340(0x33f)]['gradientFillRect'](0x0,0x0,_0x43e58e,_0x286a74,_0x4b3a1f,_0x1eb09e,!![]);}this[_0x1c5340(0x35c)]=_0x3d2c92,this['addChild'](this[_0x1c5340(0x35c)]),this[_0x1c5340(0x2fe)]=this[_0x1c5340(0x35c)][_0x1c5340(0x2fe)],this[_0x1c5340(0x194)]=this[_0x1c5340(0x35c)]['height'];},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x354)]=function(){const _0x2418c8=_0x361969,_0x2860e0=new Sprite();_0x2860e0[_0x2418c8(0x25e)]['x']=this['anchor']['x'],_0x2860e0[_0x2418c8(0x25e)]['y']=this[_0x2418c8(0x25e)]['y'],this['_graphicSprite']=_0x2860e0,this['addChild'](this[_0x2418c8(0x1f8)]),this[_0x2418c8(0x317)]();},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['createBorderSprite']=function(){const _0x35ac57=_0x361969;if(!Window_CTB_TurnOrder['Settings'][_0x35ac57(0x371)])return;const _0x3ebf0b=Window_CTB_TurnOrder[_0x35ac57(0x385)],_0x1ff6fc=this[_0x35ac57(0x27e)]===$gameParty?_0x35ac57(0x375):_0x35ac57(0x221),_0x34ee84=_0x35ac57(0x220)[_0x35ac57(0x1ca)](_0x1ff6fc),_0xb524fc=new Sprite();_0xb524fc['anchor']['x']=this['anchor']['x'],_0xb524fc[_0x35ac57(0x25e)]['y']=this[_0x35ac57(0x25e)]['y'];if(_0x3ebf0b[_0x34ee84]){if(_0x35ac57(0x2d8)==='TYyoO')_0xb524fc[_0x35ac57(0x33f)]=ImageManager['loadSystem'](_0x3ebf0b[_0x34ee84]);else{const _0x1065a7=_0x3578c3[_0x35ac57(0x2bb)];if(_0x1065a7[_0x35ac57(0x1b8)](_0x2b8410[_0x35ac57(0x32a)]['RegExp'][_0x35ac57(0x2b7)])){const _0x186907=_0x2e8e8f(_0x58e830['$1']),_0x56dd49='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x35ac57(0x1ca)](_0x186907,_0x2215ed),_0x3b0623=_0x52a7b1[_0x35ac57(0x32a)][_0x35ac57(0x34f)](_0x20a8b0,_0x3dcc9c);_0x56f69a[_0x35ac57(0x32a)]['JS'][_0x3b0623]=new _0x3dfa99(_0x56dd49);}}}else{let _0x1c2fad=this[_0x35ac57(0x1a7)](),_0x29090e=this[_0x35ac57(0x2e3)](),_0x350552=_0x3ebf0b[_0x35ac57(0x34d)];_0xb524fc[_0x35ac57(0x33f)]=new Bitmap(_0x1c2fad,_0x29090e);const _0x18c1c7='#000000',_0x2d9852=ColorManager[_0x35ac57(0x36c)](_0x3ebf0b[_0x35ac57(0x28f)[_0x35ac57(0x1ca)](_0x1ff6fc)]);_0xb524fc[_0x35ac57(0x33f)][_0x35ac57(0x18c)](0x0,0x0,_0x1c2fad,_0x29090e,_0x18c1c7),_0x1c2fad-=0x2,_0x29090e-=0x2,_0xb524fc[_0x35ac57(0x33f)][_0x35ac57(0x18c)](0x1,0x1,_0x1c2fad,_0x29090e,_0x2d9852),_0x1c2fad-=_0x350552*0x2,_0x29090e-=_0x350552*0x2,_0xb524fc['bitmap'][_0x35ac57(0x18c)](0x1+_0x350552,0x1+_0x350552,_0x1c2fad,_0x29090e,_0x18c1c7),_0x1c2fad-=0x2,_0x29090e-=0x2,_0x350552+=0x1,_0xb524fc['bitmap'][_0x35ac57(0x1eb)](0x1+_0x350552,0x1+_0x350552,_0x1c2fad,_0x29090e);}this[_0x35ac57(0x35c)]=_0xb524fc,this[_0x35ac57(0x1ea)](this[_0x35ac57(0x35c)]);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x288)]=function(){const _0x320a44=_0x361969,_0x217193=Window_CTB_TurnOrder[_0x320a44(0x385)];if(!_0x217193[_0x320a44(0x335)])return;if(this['_unit']===$gameParty)return;const _0x21e0df=this[_0x320a44(0x1a7)](),_0x56423f=this[_0x320a44(0x2e3)](),_0x5211fe=new Sprite();_0x5211fe[_0x320a44(0x25e)]['x']=this['anchor']['x'],_0x5211fe[_0x320a44(0x25e)]['y']=this[_0x320a44(0x25e)]['y'],_0x5211fe[_0x320a44(0x33f)]=new Bitmap(_0x21e0df,_0x56423f),this['_letterSprite']=_0x5211fe,this[_0x320a44(0x1ea)](this[_0x320a44(0x243)]);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x259)]=function(){const _0xc13cf7=_0x361969;return this[_0xc13cf7(0x27e)]?this[_0xc13cf7(0x27e)][_0xc13cf7(0x1dd)]()[this[_0xc13cf7(0x309)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x1f5)]=function(_0x57d98){const _0x52c816=_0x361969,_0x3a299e=this[_0x52c816(0x259)]();if(!_0x3a299e)return Number['MAX_SAFE_INTEGER'];const _0x2ac329=0x1*(this[_0x52c816(0x2d4)]+0x1);return _0x3a299e[_0x52c816(0x212)](_0x2ac329,_0x57d98);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x23a)]=function(){const _0x2c1621=_0x361969;Sprite_Clickable[_0x2c1621(0x36d)][_0x2c1621(0x23a)]['call'](this),this[_0x2c1621(0x386)](),this['updatePosition'](),this[_0x2c1621(0x2c9)](),this['updateOpacity'](),this[_0x2c1621(0x1cb)](),this[_0x2c1621(0x1ce)](),this[_0x2c1621(0x2cf)](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x386)]=function(){const _0x313481=_0x361969,_0x27cf02=this[_0x313481(0x23d)]();if(this[_0x313481(0x31f)]===_0x27cf02)return;this[_0x313481(0x31f)]=_0x27cf02;const _0x3fbf4a=Window_CTB_TurnOrder['Settings'],_0xdb5cb8=this[_0x313481(0x318)](),_0x44c4a4=_0x3fbf4a[_0x313481(0x237)],_0x43e7ac=_0x3fbf4a[_0x313481(0x1d6)],_0x53a7ae=SceneManager[_0x313481(0x1c7)]['_ctbTurnOrderWindow'];if(!_0x53a7ae)return;this[_0x313481(0x1b2)]=_0x3fbf4a[_0x313481(0x2a3)],this[_0x313481(0x1a0)]=_0xdb5cb8?_0x3fbf4a['SpriteThin']*_0x27cf02:0x0,this['_positionTargetY']=_0xdb5cb8?0x0:_0x3fbf4a['SpriteThin']*_0x27cf02;_0x27cf02>0x0&&(_0x313481(0x265)!==_0x313481(0x32e)?(this[_0x313481(0x1a0)]+=_0xdb5cb8?_0x43e7ac:0x0,this[_0x313481(0x26c)]+=_0xdb5cb8?0x0:_0x43e7ac):(this[_0x313481(0x31a)]=this[_0x313481(0x31a)]||0x0,this[_0x313481(0x31a)]++,this[_0x313481(0x31a)]>=_0x5cca75&&this[_0x313481(0x2d7)]()));if(_0x44c4a4)this[_0x313481(0x1a0)]=_0xdb5cb8?_0x53a7ae[_0x313481(0x2fe)]-this[_0x313481(0x1a0)]-_0x3fbf4a[_0x313481(0x314)]:0x0;else{if(_0x313481(0x2b4)===_0x313481(0x2b4))this[_0x313481(0x26c)]=_0xdb5cb8?0x0:_0x53a7ae[_0x313481(0x194)]-this[_0x313481(0x26c)]-_0x3fbf4a[_0x313481(0x314)];else{const _0x278713=this[_0x313481(0x259)]();if(!_0x278713)return _0x3277e0[_0x313481(0x2e8)];const _0x2cd408=0x1*(this[_0x313481(0x2d4)]+0x1);return _0x278713['ctbTicksToGoal'](_0x2cd408,_0x1f4d62);}}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x361969(0x2ed)]=function(){const _0xbacb93=_0x361969;if(this[_0xbacb93(0x355)]>0x0)return;if(this[_0xbacb93(0x1b2)]>0x0){const _0x338c5a=this[_0xbacb93(0x1b2)];this['x']=(this['x']*(_0x338c5a-0x1)+this['_positionTargetX'])/_0x338c5a,this['y']=(this['y']*(_0x338c5a-0x1)+this['_positionTargetY'])/_0x338c5a,this['_positionDuration']--;}if(this['_positionDuration']<=0x0&&this['_isAlive']){if(_0xbacb93(0x362)===_0xbacb93(0x343)){if(!this[_0xbacb93(0x243)])return;const _0x6e0b1c=this[_0xbacb93(0x259)]();if(!_0x6e0b1c)return;if(this[_0xbacb93(0x202)]===_0x6e0b1c[_0xbacb93(0x202)]&&this['_plural']===_0x6e0b1c['_plural'])return;this[_0xbacb93(0x202)]=_0x6e0b1c[_0xbacb93(0x202)],this[_0xbacb93(0x21e)]=_0x6e0b1c['_plural'];const _0x117a5b=_0x536325[_0xbacb93(0x385)],_0x5cb437=this['isHorz'](),_0x1a639b=this[_0xbacb93(0x1a7)](),_0x5e4b16=this[_0xbacb93(0x2e3)](),_0x30975e=this['_letterSprite'][_0xbacb93(0x33f)];_0x30975e[_0xbacb93(0x26e)]();if(!this[_0xbacb93(0x21e)])return;_0x30975e[_0xbacb93(0x247)]=_0x117a5b[_0xbacb93(0x1a5)]||_0x312fa2[_0xbacb93(0x1fa)](),_0x30975e[_0xbacb93(0x1db)]=_0x117a5b[_0xbacb93(0x20e)]||0x10,_0x5cb437?_0x30975e[_0xbacb93(0x1ef)](this['_letter'][_0xbacb93(0x22c)](),0x0,_0x5e4b16/0x2,_0x1a639b,_0x5e4b16/0x2,'center'):_0x30975e[_0xbacb93(0x1ef)](this[_0xbacb93(0x202)][_0xbacb93(0x22c)](),0x0,0x2,_0x1a639b-0x8,_0x5e4b16-0x4,_0xbacb93(0x1c3));}else this['x']=this[_0xbacb93(0x1a0)],this['y']=this[_0xbacb93(0x26c)],this[_0xbacb93(0x207)]<=0x0&&!this['_isBattleOver']&&this['startFade'](0xff);}},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2f7)]=function(){return Window_CTB_TurnOrder['Settings']['TotalHorzSprites']*0x14;},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['containerWindow']=function(){const _0xd444ff=_0x361969;return SceneManager[_0xd444ff(0x1c7)][_0xd444ff(0x312)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x361969(0x23d)]=function(){const _0x74d722=_0x361969;if(!this[_0x74d722(0x2a9)]())return this[_0x74d722(0x2f7)]();const _0x10611e=this[_0x74d722(0x2a9)]()[_0x74d722(0x21f)];return _0x10611e[_0x74d722(0x2bc)](this);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2ca)]=function(){const _0x596ddc=_0x361969,_0xd9ab77=Window_CTB_TurnOrder[_0x596ddc(0x385)],_0x196e68=this[_0x596ddc(0x318)](),_0x2088f3=_0x196e68?_0xd9ab77[_0x596ddc(0x367)]:_0xd9ab77[_0x596ddc(0x20c)];this[_0x596ddc(0x2d4)]-=0x1;if(this['_dupe']<0x0){if('WVJXZ'!=='fnzuX')this['_dupe']=_0x2088f3-0x1,this[_0x596ddc(0x1a1)](0x0);else return this[_0x596ddc(0x270)]===_0x1b16ec&&(this[_0x596ddc(0x270)]=this[_0x596ddc(0x2dd)]()),this[_0x596ddc(0x270)];}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x361969(0x1a1)]=function(_0x21c4e0){const _0x4dd1de=_0x361969,_0x24d89f=Window_CTB_TurnOrder[_0x4dd1de(0x385)];this[_0x4dd1de(0x355)]=_0x24d89f['UpdateFrames'],this[_0x4dd1de(0x2f0)]=_0x21c4e0;},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2c9)]=function(){const _0x5cec73=_0x361969,_0x5b025c=this[_0x5cec73(0x259)]();if(!_0x5b025c)return;if(this[_0x5cec73(0x37b)]===_0x5b025c['isAlive']()&&this['_isAppeared']===_0x5b025c[_0x5cec73(0x2ce)]())return;this[_0x5cec73(0x37b)]=_0x5b025c[_0x5cec73(0x30a)](),this['_isAppeared']=_0x5b025c[_0x5cec73(0x2ce)]();let _0x5df586=this[_0x5cec73(0x37b)]&&this[_0x5cec73(0x25f)]?0xff:0x0;this['startFade'](_0x5df586);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x361969(0x241)]=function(){const _0x14892d=_0x361969;if(this['_fadeDuration']>0x0){const _0x793cdd=this[_0x14892d(0x355)];this[_0x14892d(0x207)]=(this[_0x14892d(0x207)]*(_0x793cdd-0x1)+this[_0x14892d(0x2f0)])/_0x793cdd,this[_0x14892d(0x355)]--,this[_0x14892d(0x355)]<=0x0&&(this[_0x14892d(0x386)](),this[_0x14892d(0x1b2)]=0x0,this[_0x14892d(0x2ed)](),this[_0x14892d(0x207)]=this[_0x14892d(0x2f0)]);}if(this[_0x14892d(0x273)])return;BattleManager['_phase']==='battleEnd'&&(this['_isBattleOver']=!![],this[_0x14892d(0x1a1)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x1cb)]=function(){const _0x1c1396=_0x361969,_0x14cdcd=this['battler']();if(!_0x14cdcd)return;const _0x5c1840=Window_CTB_TurnOrder[_0x1c1396(0x385)],_0x3ffa4c=this[_0x1c1396(0x27e)]===$gameParty?_0x1c1396(0x375):_0x1c1396(0x221);let _0x20cacc=_0x14cdcd[_0x1c1396(0x252)]();if(_0x14cdcd[_0x1c1396(0x180)]()&&_0x20cacc===_0x1c1396(0x323))_0x20cacc=_0x1c1396(0x305);else{if(_0x14cdcd[_0x1c1396(0x233)]()&&_0x20cacc===_0x1c1396(0x35e)){if(_0x1c1396(0x30e)!==_0x1c1396(0x30e)){const _0xd072db=this[_0x1c1396(0x319)]();_0xd072db[_0x1c1396(0x304)]((_0x29a773,_0x27e1e1)=>{const _0x46e230=_0x1c1396;return _0x29a773[_0x46e230(0x212)](0x1)-_0x27e1e1['ctbTicksToGoal'](0x1);});for(const _0x5e7b82 of _0xd072db){this[_0x1c1396(0x17f)](_0x5e7b82);}}else _0x20cacc=_0x1c1396(0x323);}}if(this[_0x1c1396(0x388)]!==_0x20cacc){if(_0x1c1396(0x2bd)===_0x1c1396(0x2bd))return this['processUpdateGraphic']();else{if(!_0x17201d[_0x1c1396(0x385)][_0x1c1396(0x371)])return;const _0x34e5f=_0x5ce029['Settings'],_0x5e8a4a=this['_unit']===_0x305ce2?_0x1c1396(0x375):'Enemy',_0x51f11d=_0x1c1396(0x220)[_0x1c1396(0x1ca)](_0x5e8a4a),_0x1ec5b2=new _0x1ab1a3();_0x1ec5b2[_0x1c1396(0x25e)]['x']=this['anchor']['x'],_0x1ec5b2['anchor']['y']=this['anchor']['y'];if(_0x34e5f[_0x51f11d])_0x1ec5b2[_0x1c1396(0x33f)]=_0x14229e[_0x1c1396(0x227)](_0x34e5f[_0x51f11d]);else{let _0x32b48b=this[_0x1c1396(0x1a7)](),_0x18ed6e=this['bitmapHeight'](),_0xb41c98=_0x34e5f[_0x1c1396(0x34d)];_0x1ec5b2[_0x1c1396(0x33f)]=new _0x27e172(_0x32b48b,_0x18ed6e);const _0x117f4a=_0x1c1396(0x19f),_0x3e02c0=_0x231c3d[_0x1c1396(0x36c)](_0x34e5f['%1BorderColor'[_0x1c1396(0x1ca)](_0x5e8a4a)]);_0x1ec5b2[_0x1c1396(0x33f)][_0x1c1396(0x18c)](0x0,0x0,_0x32b48b,_0x18ed6e,_0x117f4a),_0x32b48b-=0x2,_0x18ed6e-=0x2,_0x1ec5b2[_0x1c1396(0x33f)][_0x1c1396(0x18c)](0x1,0x1,_0x32b48b,_0x18ed6e,_0x3e02c0),_0x32b48b-=_0xb41c98*0x2,_0x18ed6e-=_0xb41c98*0x2,_0x1ec5b2[_0x1c1396(0x33f)][_0x1c1396(0x18c)](0x1+_0xb41c98,0x1+_0xb41c98,_0x32b48b,_0x18ed6e,_0x117f4a),_0x32b48b-=0x2,_0x18ed6e-=0x2,_0xb41c98+=0x1,_0x1ec5b2[_0x1c1396(0x33f)][_0x1c1396(0x1eb)](0x1+_0xb41c98,0x1+_0xb41c98,_0x32b48b,_0x18ed6e);}this[_0x1c1396(0x35c)]=_0x1ec5b2,this[_0x1c1396(0x1ea)](this[_0x1c1396(0x35c)]);}}switch(this['_graphicType']){case _0x1c1396(0x305):if(this[_0x1c1396(0x2e9)]!==_0x14cdcd['TurnOrderCTBGraphicFaceName']()){if(_0x1c1396(0x1f1)===_0x1c1396(0x1f1))return this[_0x1c1396(0x317)]();else this['_tpbState']===_0x1c1396(0x2d2)&&(this[_0x1c1396(0x1e0)]+=this[_0x1c1396(0x1bb)](),this[_0x1c1396(0x1e0)]>=this[_0x1c1396(0x2e0)]()&&(this[_0x1c1396(0x315)]='ready'));}if(this[_0x1c1396(0x2d0)]!==_0x14cdcd[_0x1c1396(0x25a)]())return this['processUpdateGraphic']();break;case _0x1c1396(0x2ff):if(this[_0x1c1396(0x37c)]!==_0x14cdcd[_0x1c1396(0x338)]())return this[_0x1c1396(0x317)]();break;case _0x1c1396(0x323):if(_0x14cdcd[_0x1c1396(0x2e7)]()){if(_0x1c1396(0x24a)==='jJIKl'){if(this[_0x1c1396(0x347)]!==_0x14cdcd['svBattlerName']())return this[_0x1c1396(0x317)]();}else _0x3bd144[_0x1c1396(0x32a)][_0x1c1396(0x1c0)][_0x1c1396(0x277)](this,_0x42aea1);}else{if(this[_0x1c1396(0x197)]!==_0x14cdcd[_0x1c1396(0x1ac)]())return this['processUpdateGraphic']();}break;case _0x1c1396(0x35e):if(_0x14cdcd[_0x1c1396(0x180)]()){if(this[_0x1c1396(0x347)]!==_0x14cdcd['battlerName']())return this[_0x1c1396(0x317)]();}else{if(this['_graphicEnemy']!==_0x14cdcd[_0x1c1396(0x1ac)]())return _0x1c1396(0x1de)!==_0x1c1396(0x31e)?this['processUpdateGraphic']():_0x520513[_0x1c1396(0x32a)][_0x1c1396(0x1ff)][_0x1c1396(0x277)](this);}break;}},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x317)]=function(){const _0x25f048=_0x361969,_0x26216b=this['battler']();if(!_0x26216b)return;this['_graphicType']=_0x26216b[_0x25f048(0x252)]();if(_0x26216b[_0x25f048(0x180)]()&&this[_0x25f048(0x388)]===_0x25f048(0x323))this[_0x25f048(0x388)]=_0x25f048(0x305);else _0x26216b[_0x25f048(0x233)]()&&this[_0x25f048(0x388)]===_0x25f048(0x35e)&&(this['_graphicType']=_0x25f048(0x323));let _0x1566e5;switch(this['_graphicType']){case _0x25f048(0x305):this[_0x25f048(0x2e9)]=_0x26216b['TurnOrderCTBGraphicFaceName'](),this[_0x25f048(0x2d0)]=_0x26216b[_0x25f048(0x25a)](),_0x1566e5=ImageManager[_0x25f048(0x34a)](this['_graphicFaceName']),_0x1566e5[_0x25f048(0x20f)](this[_0x25f048(0x302)][_0x25f048(0x1a9)](this,_0x1566e5));break;case _0x25f048(0x2ff):this[_0x25f048(0x37c)]=_0x26216b[_0x25f048(0x1a4)](),_0x1566e5=ImageManager[_0x25f048(0x227)](_0x25f048(0x281)),_0x1566e5['addLoadListener'](this[_0x25f048(0x1a8)][_0x25f048(0x1a9)](this,_0x1566e5));break;case _0x25f048(0x323):if(_0x26216b[_0x25f048(0x2e7)]())this[_0x25f048(0x347)]=_0x26216b[_0x25f048(0x2d5)](),_0x1566e5=ImageManager[_0x25f048(0x18e)](this[_0x25f048(0x347)]),_0x1566e5['addLoadListener'](this[_0x25f048(0x2b9)]['bind'](this,_0x1566e5));else{if($gameSystem[_0x25f048(0x29b)]())_0x25f048(0x326)!==_0x25f048(0x326)?this[_0x25f048(0x2cb)]=_0x42f615:(this[_0x25f048(0x197)]=_0x26216b[_0x25f048(0x1ac)](),_0x1566e5=ImageManager[_0x25f048(0x291)](this['_graphicEnemy']),_0x1566e5[_0x25f048(0x20f)](this[_0x25f048(0x344)]['bind'](this,_0x1566e5)));else{if(_0x25f048(0x19a)==='hsUnm')return _0x4b0a6a[_0x25f048(0x258)]&&_0x5748fd[_0x25f048(0x24f)][_0x25f048(0x187)]('['+_0x1e72fb+']');else this[_0x25f048(0x197)]=_0x26216b[_0x25f048(0x1ac)](),_0x1566e5=ImageManager[_0x25f048(0x378)](this[_0x25f048(0x197)]),_0x1566e5[_0x25f048(0x20f)](this[_0x25f048(0x344)]['bind'](this,_0x1566e5));}}break;case'svactor':this[_0x25f048(0x347)]=_0x26216b[_0x25f048(0x1ac)](),_0x1566e5=ImageManager['loadSvActor'](this[_0x25f048(0x347)]),_0x1566e5[_0x25f048(0x20f)](this[_0x25f048(0x2b9)]['bind'](this,_0x1566e5));break;}},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x302)]=function(_0x2c9d17){const _0x2f407c=_0x361969,_0x1b58f5=this[_0x2f407c(0x2d0)],_0x58e336=this[_0x2f407c(0x1a7)](),_0x2ebb99=this['bitmapHeight'](),_0x2d5261=Math[_0x2f407c(0x37e)](_0x58e336,_0x2ebb99);this[_0x2f407c(0x1f8)][_0x2f407c(0x33f)]=new Bitmap(_0x58e336,_0x2ebb99);const _0x51bbb0=this[_0x2f407c(0x1f8)][_0x2f407c(0x33f)],_0x52ea18=ImageManager[_0x2f407c(0x2e6)],_0x8bcbdb=ImageManager[_0x2f407c(0x345)],_0x433815=_0x2d5261/Math['max'](_0x52ea18,_0x8bcbdb),_0x2c0a11=ImageManager[_0x2f407c(0x2e6)],_0x41ecbc=ImageManager[_0x2f407c(0x345)],_0x14e14a=_0x1b58f5%0x4*_0x52ea18+(_0x52ea18-_0x2c0a11)/0x2,_0x194281=Math['floor'](_0x1b58f5/0x4)*_0x8bcbdb+(_0x8bcbdb-_0x41ecbc)/0x2,_0x5a2d9c=(_0x58e336-_0x52ea18*_0x433815)/0x2,_0x15b14f=(_0x2ebb99-_0x8bcbdb*_0x433815)/0x2;_0x51bbb0[_0x2f407c(0x1bf)](_0x2c9d17,_0x14e14a,_0x194281,_0x2c0a11,_0x41ecbc,_0x5a2d9c,_0x15b14f,_0x2d5261,_0x2d5261);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['changeIconGraphicBitmap']=function(_0x1bde33){const _0x2d88ca=_0x361969,_0x4c0cb9=this[_0x2d88ca(0x37c)],_0x162866=this['bitmapWidth'](),_0x1ce3cf=this['bitmapHeight']();this['_graphicSprite'][_0x2d88ca(0x33f)]=new Bitmap(_0x162866,_0x1ce3cf);const _0x53b7d8=this[_0x2d88ca(0x1f8)][_0x2d88ca(0x33f)],_0xf05ed0=ImageManager[_0x2d88ca(0x2ba)],_0x1a352c=ImageManager['iconHeight'],_0x462eff=Math[_0x2d88ca(0x336)](_0xf05ed0,_0x1a352c,_0x162866,_0x1ce3cf),_0x281a22=_0x4c0cb9%0x10*_0xf05ed0,_0x518bee=Math['floor'](_0x4c0cb9/0x10)*_0x1a352c,_0x4a8697=Math[_0x2d88ca(0x20a)](Math[_0x2d88ca(0x37e)](_0x162866-_0x462eff,0x0)/0x2),_0x5be115=Math[_0x2d88ca(0x20a)](Math[_0x2d88ca(0x37e)](_0x1ce3cf-_0x462eff,0x0)/0x2);_0x53b7d8[_0x2d88ca(0x1bf)](_0x1bde33,_0x281a22,_0x518bee,_0xf05ed0,_0x1a352c,_0x4a8697,_0x5be115,_0x462eff,_0x462eff);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2b9)]=function(_0x2c7427){const _0x2463e3=_0x361969,_0x5e244b=this[_0x2463e3(0x1a7)](),_0x5ef9fb=this[_0x2463e3(0x2e3)](),_0x1b1a2e=Math['min'](_0x5e244b,_0x5ef9fb);this['_graphicSprite'][_0x2463e3(0x33f)]=new Bitmap(_0x5e244b,_0x5ef9fb);const _0x3eaf3a=this['_graphicSprite'][_0x2463e3(0x33f)],_0xf51426=0x9,_0x16fb85=0x6,_0x18dd87=_0x2c7427[_0x2463e3(0x2fe)]/_0xf51426,_0xa20bb9=_0x2c7427[_0x2463e3(0x194)]/_0x16fb85,_0x36cdf6=Math['min'](0x1,_0x1b1a2e/_0x18dd87,_0x1b1a2e/_0xa20bb9),_0x573976=_0x18dd87*_0x36cdf6,_0x44f770=_0xa20bb9*_0x36cdf6,_0x3b3695=Math[_0x2463e3(0x2e4)]((_0x5e244b-_0x573976)/0x2),_0x366e74=Math[_0x2463e3(0x2e4)]((_0x5ef9fb-_0x44f770)/0x2);_0x3eaf3a[_0x2463e3(0x1bf)](_0x2c7427,0x0,0x0,_0x18dd87,_0xa20bb9,_0x3b3695,_0x366e74,_0x573976,_0x44f770);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['changeEnemyGraphicBitmap']=function(_0x4027b7){const _0x2ef16e=_0x361969,_0x55c6b8=Window_CTB_TurnOrder[_0x2ef16e(0x385)],_0x1e9d82=this[_0x2ef16e(0x1a7)](),_0x3606ae=this[_0x2ef16e(0x2e3)](),_0x16101a=Math['min'](_0x1e9d82,_0x3606ae);this['_graphicSprite'][_0x2ef16e(0x33f)]=new Bitmap(_0x1e9d82,_0x3606ae);const _0x3ffed0=this[_0x2ef16e(0x1f8)][_0x2ef16e(0x33f)],_0x359b86=Math[_0x2ef16e(0x336)](0x1,_0x16101a/_0x4027b7[_0x2ef16e(0x2fe)],_0x16101a/_0x4027b7['height']),_0x34c456=_0x4027b7[_0x2ef16e(0x2fe)]*_0x359b86,_0x5abbc7=_0x4027b7[_0x2ef16e(0x194)]*_0x359b86,_0x471e73=Math[_0x2ef16e(0x2e4)]((_0x1e9d82-_0x34c456)/0x2),_0x1fd0ca=Math[_0x2ef16e(0x2e4)]((_0x3606ae-_0x5abbc7)/0x2);_0x3ffed0['blt'](_0x4027b7,0x0,0x0,_0x4027b7[_0x2ef16e(0x2fe)],_0x4027b7['height'],_0x471e73,_0x1fd0ca,_0x34c456,_0x5abbc7);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)]['updateGraphicHue']=function(){const _0xce2144=_0x361969,_0x3f9035=this[_0xce2144(0x259)]();if(!_0x3f9035)return;if(!_0x3f9035['isEnemy']())return;if(this[_0xce2144(0x218)]===_0x3f9035[_0xce2144(0x1aa)]())return;this[_0xce2144(0x218)]=_0x3f9035['battlerHue']();if(_0x3f9035[_0xce2144(0x2e7)]())this['_graphicHue']=0x0;this['_graphicSprite'][_0xce2144(0x263)](this[_0xce2144(0x218)]);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2cf)]=function(){const _0x34a492=_0x361969;if(!this['_letterSprite'])return;const _0x2b54e9=this[_0x34a492(0x259)]();if(!_0x2b54e9)return;if(this[_0x34a492(0x202)]===_0x2b54e9['_letter']&&this[_0x34a492(0x21e)]===_0x2b54e9[_0x34a492(0x21e)])return;this[_0x34a492(0x202)]=_0x2b54e9[_0x34a492(0x202)],this[_0x34a492(0x21e)]=_0x2b54e9[_0x34a492(0x21e)];const _0x36061a=Window_CTB_TurnOrder[_0x34a492(0x385)],_0x3976c9=this[_0x34a492(0x318)](),_0x3b3e7c=this[_0x34a492(0x1a7)](),_0x852fc2=this['bitmapHeight'](),_0x44ab6f=this[_0x34a492(0x243)][_0x34a492(0x33f)];_0x44ab6f[_0x34a492(0x26e)]();if(!this['_plural'])return;_0x44ab6f[_0x34a492(0x247)]=_0x36061a[_0x34a492(0x1a5)]||$gameSystem[_0x34a492(0x1fa)](),_0x44ab6f['fontSize']=_0x36061a['EnemyBattlerFontSize']||0x10,_0x3976c9?_0x44ab6f[_0x34a492(0x1ef)](this[_0x34a492(0x202)][_0x34a492(0x22c)](),0x0,_0x852fc2/0x2,_0x3b3e7c,_0x852fc2/0x2,_0x34a492(0x1fe)):'RqJqZ'!==_0x34a492(0x229)?_0x5abf5e['log'](_0x34a492(0x190),this['_anti_CTB_SoftlockCount']):_0x44ab6f[_0x34a492(0x1ef)](this[_0x34a492(0x202)]['trim'](),0x0,0x2,_0x3b3e7c-0x8,_0x852fc2-0x4,_0x34a492(0x1c3));},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x310)]=function(){const _0x53c90d=_0x361969,_0x48ddff=this[_0x53c90d(0x259)]();if(!_0x48ddff)return;const _0x4f3741=_0x48ddff['battler']();if(!_0x4f3741)return;const _0x224f71=_0x4f3741[_0x53c90d(0x29e)]();if(!_0x224f71)return;this['setBlendColor'](_0x224f71[_0x53c90d(0x1fc)]);},Sprite_CTB_TurnOrder_Battler[_0x361969(0x36d)][_0x361969(0x2c6)]=function(){const _0x44b78c=_0x361969;return this[_0x44b78c(0x259)]();},VisuMZ[_0x361969(0x32a)][_0x361969(0x1c0)]=Window_Help[_0x361969(0x36d)]['setItem'],Window_Help[_0x361969(0x36d)][_0x361969(0x1f6)]=function(_0x3e53db){const _0x422c72=_0x361969;if(BattleManager['isCTB']()&&_0x3e53db&&_0x3e53db[_0x422c72(0x2bb)]&&_0x3e53db[_0x422c72(0x2bb)][_0x422c72(0x1b8)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i))this[_0x422c72(0x2f4)](String(RegExp['$1']));else{if('UWHxi'==='Irfaf')return _0x1dd32c[_0x422c72(0x387)]()===_0x422c72(0x284);else VisuMZ[_0x422c72(0x32a)][_0x422c72(0x1c0)]['call'](this,_0x3e53db);}},VisuMZ[_0x361969(0x32a)]['Window_StatusBase_placeGauge']=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase['prototype'][_0x361969(0x245)]=function(_0x353476,_0x143fbc,_0x171024,_0x2522ed){const _0x443e3a=_0x361969;if(BattleManager[_0x443e3a(0x2f6)]()&&_0x143fbc===_0x443e3a(0x1f4))return;VisuMZ[_0x443e3a(0x32a)][_0x443e3a(0x2b8)][_0x443e3a(0x277)](this,_0x353476,_0x143fbc,_0x171024,_0x2522ed);};function Window_CTB_TurnOrder(){const _0x1b621b=_0x361969;this[_0x1b621b(0x32d)](...arguments);}Window_CTB_TurnOrder[_0x361969(0x36d)]=Object['create'](Window_Base[_0x361969(0x36d)]),Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x200)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x361969(0x32a)][_0x361969(0x385)]['TurnOrder'],Window_CTB_TurnOrder[_0x361969(0x36d)]['initialize']=function(){const _0x5c1b56=_0x361969,_0x3d13d8=this[_0x5c1b56(0x2d3)]();this['_homeX']=_0x3d13d8['x'],this[_0x5c1b56(0x2c0)]=_0x3d13d8['y'],Window_Base[_0x5c1b56(0x36d)][_0x5c1b56(0x32d)]['call'](this,_0x3d13d8),this[_0x5c1b56(0x349)](),this[_0x5c1b56(0x23e)](),this[_0x5c1b56(0x207)]=0x0;},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x2d3)]=function(){const _0x5a4b7d=_0x361969,_0x537d49=Window_CTB_TurnOrder[_0x5a4b7d(0x385)],_0xfc1cf6=SceneManager[_0x5a4b7d(0x1c7)]['_statusWindow'][_0x5a4b7d(0x194)],_0x479915=SceneManager[_0x5a4b7d(0x1c7)][_0x5a4b7d(0x249)]['height'],_0x15caf2=_0x537d49[_0x5a4b7d(0x1d6)];let _0x17f38e=0x0,_0x1ae031=0x0,_0x3352b5=0x0,_0x2e612e=0x0;switch(_0x537d49[_0x5a4b7d(0x278)]){case _0x5a4b7d(0x238):_0x17f38e=_0x537d49['SpriteThin']*_0x537d49[_0x5a4b7d(0x367)]+_0x15caf2,_0x1ae031=_0x537d49[_0x5a4b7d(0x228)],_0x3352b5=Math[_0x5a4b7d(0x327)]((Graphics[_0x5a4b7d(0x2fe)]-_0x17f38e)/0x2),_0x2e612e=_0x537d49['ScreenBuffer'];break;case _0x5a4b7d(0x25d):_0x17f38e=_0x537d49[_0x5a4b7d(0x314)]*_0x537d49[_0x5a4b7d(0x367)]+_0x15caf2,_0x1ae031=_0x537d49[_0x5a4b7d(0x228)],_0x3352b5=Math[_0x5a4b7d(0x327)]((Graphics['width']-_0x17f38e)/0x2),_0x2e612e=Graphics['height']-_0xfc1cf6-_0x1ae031-_0x537d49[_0x5a4b7d(0x2df)];break;case _0x5a4b7d(0x2f8):_0x17f38e=_0x537d49[_0x5a4b7d(0x228)],_0x1ae031=_0x537d49['SpriteThin']*_0x537d49['TotalVertSprites']+_0x15caf2,_0x3352b5=_0x537d49['ScreenBuffer'],_0x2e612e=Math[_0x5a4b7d(0x327)]((Graphics[_0x5a4b7d(0x194)]-_0xfc1cf6+_0x479915-_0x1ae031)/0x2);break;case _0x5a4b7d(0x1c3):_0x17f38e=_0x537d49[_0x5a4b7d(0x228)],_0x1ae031=_0x537d49['SpriteThin']*_0x537d49[_0x5a4b7d(0x20c)]+_0x15caf2,_0x3352b5=Graphics[_0x5a4b7d(0x2fe)]-_0x17f38e-_0x537d49[_0x5a4b7d(0x2df)],_0x2e612e=Math[_0x5a4b7d(0x327)]((Graphics[_0x5a4b7d(0x194)]-_0xfc1cf6+_0x479915-_0x1ae031)/0x2);break;}return _0x3352b5+=_0x537d49[_0x5a4b7d(0x2b3)],_0x2e612e+=_0x537d49[_0x5a4b7d(0x33d)],new Rectangle(_0x3352b5,_0x2e612e,_0x17f38e,_0x1ae031);},Window_CTB_TurnOrder['prototype']['updatePadding']=function(){const _0x32219b=_0x361969;this[_0x32219b(0x18a)]=0x0;},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x318)]=function(){const _0x1b879a=_0x361969,_0x401ef4=Window_CTB_TurnOrder[_0x1b879a(0x385)],_0x1d2821=['top',_0x1b879a(0x25d)][_0x1b879a(0x187)](_0x401ef4[_0x1b879a(0x278)]);return _0x1d2821;},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x349)]=function(){const _0xbfffb1=_0x361969,_0x1dd49a=Window_CTB_TurnOrder[_0xbfffb1(0x385)],_0x420a69=this[_0xbfffb1(0x318)](),_0x3c36b1=_0x420a69?_0x1dd49a[_0xbfffb1(0x367)]:_0x1dd49a[_0xbfffb1(0x20c)];this[_0xbfffb1(0x275)]=new Sprite(),this[_0xbfffb1(0x337)](this[_0xbfffb1(0x275)]),this['_turnOrderContainer']=[];for(let _0x1977b1=0x0;_0x1977b1<$gameParty['maxBattleMembers']();_0x1977b1++){if(_0xbfffb1(0x35d)==='CqQcj')for(let _0x635f5b=0x0;_0x635f5b<_0x3c36b1;_0x635f5b++){const _0x4ea5a9=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x1977b1,_0x635f5b);this[_0xbfffb1(0x275)][_0xbfffb1(0x1ea)](_0x4ea5a9),this[_0xbfffb1(0x21f)][_0xbfffb1(0x2aa)](_0x4ea5a9);}else this[_0xbfffb1(0x1e0)]+=this['tpbAcceleration'](),this[_0xbfffb1(0x1e0)]>=this[_0xbfffb1(0x2e0)]()&&(this[_0xbfffb1(0x315)]=_0xbfffb1(0x232));}for(let _0x10ad05=0x0;_0x10ad05<0x8;_0x10ad05++){for(let _0x4c7a4c=0x0;_0x4c7a4c<_0x3c36b1;_0x4c7a4c++){if(_0xbfffb1(0x246)===_0xbfffb1(0x34c)){if(!_0x5063cd['isCTB']())return;if(!_0x479d84[_0xbfffb1(0x216)]())return;if(this===_0x401aed[_0xbfffb1(0x2f3)]())return;if(this===_0x2c368c[_0xbfffb1(0x280)])return;const _0x3304b8=this[_0xbfffb1(0x320)]();if(_0x3304b8<0x0)return;this['setTurnOrderCTB'](_0x3304b8+_0x51cc93);}else{const _0x129505=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x10ad05,_0x4c7a4c);this[_0xbfffb1(0x275)][_0xbfffb1(0x1ea)](_0x129505),this[_0xbfffb1(0x21f)][_0xbfffb1(0x2aa)](_0x129505);}}}},Window_CTB_TurnOrder[_0x361969(0x36d)]['update']=function(){const _0x4f0aff=_0x361969;Window_Base[_0x4f0aff(0x36d)][_0x4f0aff(0x23a)]['call'](this),this[_0x4f0aff(0x2ed)](),this['updateBattleContainerOrder'](),this[_0x4f0aff(0x23e)]();},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x2ed)]=function(){const _0x3bfd38=_0x361969,_0x1c1d2b=Window_CTB_TurnOrder['Settings'];if(_0x1c1d2b[_0x3bfd38(0x278)]!==_0x3bfd38(0x238))return;if(!_0x1c1d2b[_0x3bfd38(0x341)])return;const _0x569fad=SceneManager[_0x3bfd38(0x1c7)][_0x3bfd38(0x249)];if(!_0x569fad)return;_0x569fad['visible']?(this['x']=this[_0x3bfd38(0x219)]+(_0x1c1d2b[_0x3bfd38(0x20b)]||0x0),this['y']=this[_0x3bfd38(0x2c0)]+(_0x1c1d2b[_0x3bfd38(0x297)]||0x0)):(this['x']=this[_0x3bfd38(0x219)],this['y']=this[_0x3bfd38(0x2c0)]);const _0x5b4158=SceneManager[_0x3bfd38(0x1c7)]['_windowLayer'];Window_CTB_TurnOrder['_ogWindowLayerX']===undefined&&(_0x3bfd38(0x28a)!==_0x3bfd38(0x28a)?(_0x423a45(_0x3bfd38(0x325)[_0x3bfd38(0x1ca)](_0x4fd2c6,_0x539482)),_0x59384e[_0x3bfd38(0x287)]()):(Window_CTB_TurnOrder[_0x3bfd38(0x322)]=Math[_0x3bfd38(0x2e4)]((Graphics[_0x3bfd38(0x2fe)]-Math[_0x3bfd38(0x336)](Graphics[_0x3bfd38(0x332)],_0x5b4158[_0x3bfd38(0x2fe)]))/0x2),Window_CTB_TurnOrder[_0x3bfd38(0x333)]=Math[_0x3bfd38(0x2e4)]((Graphics[_0x3bfd38(0x194)]-Math[_0x3bfd38(0x336)](Graphics['boxHeight'],_0x5b4158[_0x3bfd38(0x194)]))/0x2))),this['x']+=_0x5b4158['x']-Window_CTB_TurnOrder[_0x3bfd38(0x322)],this['y']+=_0x5b4158['y']-Window_CTB_TurnOrder['_ogWindowLayerY'];},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x22a)]=function(){const _0x202364=_0x361969;if(!this['_turnOrderInnerSprite'])return;const _0x425b82=this[_0x202364(0x275)][_0x202364(0x384)];if(!_0x425b82)return;_0x425b82['sort'](this[_0x202364(0x2e2)][_0x202364(0x1a9)](this));},Window_CTB_TurnOrder[_0x361969(0x36d)]['compareBattlerSprites']=function(_0x34a233,_0x22762f){const _0x20f47f=_0x361969,_0x1c64cd=this[_0x20f47f(0x318)](),_0x27cf6b=Window_CTB_TurnOrder[_0x20f47f(0x385)][_0x20f47f(0x237)];if(_0x1c64cd&&!_0x27cf6b){if(_0x20f47f(0x283)!==_0x20f47f(0x2c8))return _0x34a233['x']-_0x22762f['x'];else this[_0x20f47f(0x315)]===_0x20f47f(0x268)&&(this[_0x20f47f(0x1e5)]+=this[_0x20f47f(0x1bb)](),this['_tpbChargeTime']>=0x1&&this[_0x20f47f(0x1be)]());}else{if(_0x1c64cd&&_0x27cf6b)return _0x22762f['x']-_0x34a233['x'];else{if(!_0x1c64cd&&_0x27cf6b)return _0x34a233['y']-_0x22762f['y'];else{if(!_0x1c64cd&&!_0x27cf6b)return'nWeYb'===_0x20f47f(0x33b)?_0x22762f['y']-_0x34a233['y']:this[_0x20f47f(0x317)]();}}}},Window_CTB_TurnOrder['prototype'][_0x361969(0x23e)]=function(){const _0x20da05=_0x361969;this[_0x20da05(0x366)]=$gameSystem[_0x20da05(0x2fb)]();},Window_CTB_TurnOrder[_0x361969(0x36d)]['updateTurnOrder']=function(_0x314ea8){const _0x2ba358=_0x361969;this[_0x2ba358(0x21f)][_0x2ba358(0x304)]((_0x18f165,_0x231d1d)=>{const _0x2b1ab4=_0x2ba358;if(_0x2b1ab4(0x264)===_0x2b1ab4(0x186)){const _0x28e096=this[_0x2b1ab4(0x2f3)]()[_0x2b1ab4(0x2bb)];if(_0x28e096['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x42d38f(_0x567ed6['$2']);return this['faceIndex']();}else return _0x18f165[_0x2b1ab4(0x1f5)]()-_0x231d1d['ticksLeft']();});if(!_0x314ea8)return;for(const _0x17fe0e of this[_0x2ba358(0x21f)]){if(!_0x17fe0e)continue;_0x17fe0e[_0x2ba358(0x23a)](),_0x17fe0e[_0x2ba358(0x1b2)]=0x0;}},Window_CTB_TurnOrder[_0x361969(0x36d)][_0x361969(0x1b6)]=function(_0x1c6228){const _0x4a29fe=_0x361969;for(const _0x4ecc3e of this[_0x4a29fe(0x21f)]){if(_0x4a29fe(0x2ea)==='byNNT')this[_0x4a29fe(0x388)]=_0x4a29fe(0x305);else{if(!_0x4ecc3e)continue;if(_0x4ecc3e['battler']()!==_0x1c6228)continue;_0x4ecc3e['rotateDupeNumber']();}}};