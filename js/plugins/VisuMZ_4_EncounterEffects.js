//=============================================================================
// VisuStella MZ - Enemy Encounter Effects
// VisuMZ_4_EncounterEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EncounterEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EncounterEffects = VisuMZ.EncounterEffects || {};
VisuMZ.EncounterEffects.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [EncounterEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Encounter_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Both random encounters and on-screen encounters are pretty limited in what
 * they're able to do in RPG Maker MZ. This plugin expands their functionality
 * with some unique effects added through this plugin.
 * 
 * Both types of encounters can benefit from having more control over the
 * occurrence of Preemptive and Surprise Attacks. These can be enforced through
 * Plugin Commands and set up in a queue.
 * 
 * On-screen encounters can utilize alert functions that will cause events to
 * chase the player (or flee from them) once the player steps within their
 * visible detection range.
 * 
 * On-screen encounters can also utilize new functions added for use with the
 * Conditional Branch to determine which direction the player has approached
 * the on-screen encounter event from.
 * 
 * Random encounters can utilize repel and lure effects to nullify any random
 * encounters for a certain amount of steps or to increase their rate of
 * occurrence.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Take control of battle advantage. Enforce preemptive attacks, surprise
 *   attacks, neither, or chance it.
 * * Battle advantages can be set up in a queue for more interesting gameplay.
 * * Events can be given alert functionality to chase the player if the player
 *   steps within their vision range.
 * * Use Terrain Tags and Regions to set up tiles that will block detection
 *   range through line of sight usage.
 * * Events can trigger themselves upon touching followers instead of just
 *   players.
 * * Events can lock themselves in the direction they're facing when interacted
 *   with to make it easier to apply side attack and back attack effects.
 * * Random encounters can be bypassed through repel effects.
 * * Increase the rate of random encounters with lure effects.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Battle Advantage
 * 
 * Upon starting a battle with forced advantages, any calculations made by
 * other means will be overwritten in favor of the declared forced advantage.
 *
 * ---
 * 
 * Game_Player.encounterProgressValue
 * 
 * This function has been overwritten to allow for more flexibility over the
 * multipliers and effects applied through various effects and to allow for
 * the repel and lure effects to work as best as they can.
 * 
 * ---
 * 
 * Game_Event.updateSelfMovement
 * 
 * This function's original code will be ignored when the event is set to chase
 * or flee from the player after being alerted. After the alert and return
 * periods are over, self movement will resume as normal.
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
 * === Battle Advantage-Related Tags ===
 * 
 * ---
 *
 * <Preemptive>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the preemptive advantage (in favor of the player party).
 *
 * ---
 *
 * <Surprise>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the surprise advantage (in favor of the enemy party).
 *
 * ---
 *
 * <No Advantage>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   no advantage at all.
 *
 * ---
 *
 * <Chance>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   a chance for preemptive, surprise, or no advantages (calculated normally).
 *
 * ---
 * 
 * === Event Encounter-Related Notetags ===
 * 
 * ---
 *
 * <Follower Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This event can trigger by touching a follower instead of only the player.
 *
 * ---
 *
 * <Encounter Direction Lock>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Normally when an event triggers without Direction Fix, it will face the
 *   player character. This tag prevents the event from facing the player, but
 *   still allows the event to freely turn directions.
 * - This is best used in conjunction with the Conditional Branch scripts.
 *
 * ---
 * 
 * === Alert-Related Notetags ===
 * 
 * ---
 *
 * <Alert>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This will use the default settings unless changed by other tags.
 *
 * ---
 *
 * <Alert Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Changes the event's alert detection range to 'x' tiles.
 * - Replace 'x' with a number value representing the number of tiles to use
 *   for its detection range.
 *
 * ---
 *
 * <Alert Dash>
 * <Alert Walk>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - If alerted, the event will dash/walk instead of whatever is set as a
 *   default setting within the Plugin Parameters.
 *
 * ---
 *
 * <Alert Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines the amount of time in frames for the event to chase the
 *   player continuously while the player is outside of the detection range.
 * - Replace 'x' with a number value representing the number of frames for the
 *   event to keep chasing the player with.
 * - If the player steps back into the alert detection range, the timer will be
 *   reset.
 *
 * ---
 * 
 * <Alert FoV Angle: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the Field of View angle to 'x' for the event.
 * - Replace 'x' with a number value representing the degrees of for the field
 *   of view angle used by the event to detect players.
 * - The angle will always be centered to the event's line of sight.
 * 
 * ---
 * 
 * <Alert Show FoV>
 * <Alert Hide FoV>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Shows/hides the field of view for the event.
 * - If an event's field of view is hidden, it can still chase players when
 *   entering the event's range.
 * 
 * ---
 *
 * <Alert Response: chase>
 * <Alert Response: rush>
 * <Alert Response: flee>
 * <Alert Response: random>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines how an alerted event will react.
 * - Chase: Use path finding to find a route to the player
 * - Rush: Rush directly at the player
 * - Flee: Run away from the player
 * - Random: Move in random directions
 *
 * ---
 *
 * <Response Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when initially alerted and responding.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Alert React Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - When initially alerted, there is a small window of waiting before starting
 *   the chase.
 * - Replace 'x' with a number representing the number of frames for the
 *   initial reaction delay.
 *
 * ---
 *
 * <Alert Common Event: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Runs a Common Event when initially alerted.
 * - Replace 'x' with a number representing the ID of the Common Event to run.
 * - Use 0 to run no Common Events.
 *
 * ---
 *
 * <Alert Sound Name: name>
 * <Alert Sound Volume: x>
 * <Alert Sound Pitch: y>
 * <Alert Sound Pan: z>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Play this sound effect when the event is initially alerted.
 * - Replace 'name' with the filename of the sound effect found in /audio/se/
 *   to play. Do NOT include the file extension.
 * - Replace 'x' with a number representing the volume of the sound effect.
 * - Replace 'y' with a number representing the pitch of the sound effect.
 * - Replace 'z' with a number representing the pan of the sound effect.
 *
 * ---
 *
 * <Return Position>
 * <Stay Position>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Decide if the event will return back to its initial position after an
 *   alert chase is over.
 * - Or if it will stay where it currently is.
 *
 * ---
 *
 * <Return Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This is the amount of time spent (in frames) after an alert chase is over
 *   but returning back to the event's original position.
 * - Replace 'x' with a number representing the number of frames for the
 *   duration between idling and returning.
 *
 * ---
 *
 * <Idle Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when beginning the idle phase after an
 *   alert chase is over but before returning back to the original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Returning Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when the event starts returning back to
 *   the event's original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 * 
 * === Alert Vision Blocking-Related Notetags ===
 * 
 * ---
 *
 * <Block Vision Tag: x>
 * <Block Vision Tags: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   terrain tag 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the terrain tag used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * <Block Vision Region: x>
 * <Block Vision Regions: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   region ID 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the region ID used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * ============================================================================
 * Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Conditional Branch event commands with this plugin
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerFront()
 * 
 * - Returns true if the event is facing the player's front.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerBack()
 * 
 * - Returns true if the event is facing the player's back.
 * - Best used with a Surprise attack.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerSide()
 * 
 * - Returns true if the event is facing the player's side.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventFront()
 * 
 * - Returns true if the player is facing the event's front.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventBack()
 * 
 * - Returns true if the player is facing the event's back.
 * - Best used with a Preemptive attack.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventSide()
 * 
 * - Returns true if the player is facing the event's side.
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
 * === Advantage Plugin Commands ===
 * 
 * ---
 *
 * Advantage: Add to Queue
 * - Add (at the end) to the existing advantage queue the following encounter
 *  advantages for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Set Queue
 * - Declare the exact advantage queue for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Reset Queue
 * - Resets the advantage queue for battles.
 *
 * ---
 * 
 * === Alert Plugin Commands ===
 * 
 * ---
 *
 * Alert: Stealth Mode
 * - Changes the stealth mode setting for the player.
 *
 *   Stealth Mode:
 *   - If Stealth Mode is on, bypass unnoticed alerts.
 *   - Already alerted events will stay alert.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Advantage Settings
 * ============================================================================
 *
 * Advantage common event settings related to enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Preemptive Event:
 *   - Run this Common Event upon a preemptive advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   Surprise Event:
 *   - Run this Common Event upon a surprise advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   No Advantage Event:
 *   - Run this Common Event when no advantage is given.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Alert Settings
 * ============================================================================
 *
 * These are settings for alerting events. Used mainly for events chasing the
 * player.
 * 
 * How alert detection works is when the player steps with an event (who has
 * an alert notetag or comment tag), the event will enter alert mode. At the
 * very start, a response balloon will play along with an initialy delay. If
 * there is a common event set, the common event will play immediately.
 * 
 * After the initial delay is over, the event will begin its chasing phase.
 * Although it's called the chasing phase, it can react differently by using
 * path finding to find a way to the player, rushing directly in a straight
 * line at the player, running away from the player, or moving about randomly.
 * 
 * If the player stays out of the event's alert detection range for a specific
 * amount of time, the event will enter its idle phase. An idle balloon will
 * play and the event will wait a short duration.
 * 
 * After this short duration is over, the event will return back to its
 * original position (if desired). Upon starting its return to its original
 * position, it will play the returning balloon.
 * 
 * During the idle and return phases, if the player steps in range of the
 * event's alert range, it will begin the chase all over again.
 *
 * ---
 *
 * Alert
 * 
 *   Detection Range:
 *   - Default tile range for event to detect the player in.
 * 
 *   Alert Dash:
 *   - Alerted events use dashing speed.
 * 
 *   Alert Time:
 *   - Number of frames the alerted event will attempt to chase the player.
 *
 * ---
 *
 * Field of View
 * 
 *   Angle Range:
 *   - The angle range used to determine the event's field of view.
 * 
 *   Show Range:
 *   - Show the field of view of events?
 * 
 *   Color 1:
 *   Color 2:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Response
 * 
 *   Response Type:
 *   - What kind of default response behavior do you want?
 *     - Chase: Use path finding to find a route to the player
 *     - Rush: Rush directly at the player
 *     - Flee: Run away from the player
 *     - Random: Move in random directions
 * 
 *   Response Balloon:
 *   - What kind of balloon should the event play when detecting the player?
 * 
 *   Common Event:
 *   - Run this Common Event when the player is detected.
 *   - Use 0 for no Common Event.
 * 
 *   Reaction Delay:
 *   - Number of frames for the event to stand still before beginning
 *     the chase.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played when alerted.
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
 * Return
 * 
 *   Return Home:
 *   - After finishing a chase, return back to the home position?
 * 
 *   Idle Wait:
 *   - Number of frames to wait before returning home.
 * 
 *   Idle Balloon:
 *   - Play this balloon when an event is about to return.
 * 
 *   Returning Balloon:
 *   - Play this balloon when an event begins returning.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Encounter Multipliers
 * ============================================================================
 *
 * Encounter multiplier settings regarding enemy encounters.
 *
 * ---
 *
 * Bush Multiplier
 * 
 *   Parameter:
 *   - Multiplier for how fast encounters occur by when the player is walking
 *     through bushes.
 * 
 *   Boat Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via boat.
 * 
 *   Ship Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via ship.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Repel/Lure Settings
 * ============================================================================
 *
 * Repel/Lure settings regarding enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Repel Variable:
 *   - Select a variable where if the value is above 0, it will
 *     repel encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Repel reaches 0.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * Settings
 * 
 *   Lure Variable:
 *   - Select a variable where if the value is above 0, it will
 *     lure encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Lure reaches 0.
 *   - Use 0 to run no Common Events.
 * 
 *   Lure Multiplier:
 *   - Multiplier for how fast encounters occur by when the lure
 *     effect is active.
 * 
 *   Lure Increase:
 *   - Flat increase for how fast encounters occur by when the lure
 *     effect is active.
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
 * Version 1.06: August 20, 2021
 * * Compatibility Update!
 * ** Better compatibility with Event and Movement Core's spawn functions.
 *    Update made by Arisu.
 * 
 * Version 1.05: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for features that were left out by accident.
 * *** Notetag/Comment Tag: <Alert FoV Angle: x>
 * *** Notetag/Comment Tag: <Alert Hide FoV>
 * *** Notetag/Comment Tag: <Alert Show FoV>
 * 
 * Version 1.04: December 11, 2020
 * * Bug Fixes!
 * ** Without the Events and Movement Core, events returning home after a
 *    failed alert chase will no longer crash the game.
 *    Fix by Yanfly and Shiro.
 * 
 * Version 1.03: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: November 29, 2020
 * * Feature Update!
 * ** Initialization of the encounter effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu and Shaz.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Certain notetags will no longer cause crashes. Fix made by Yanfly.
 * ** Erased events will have their alert sprite removed, too. Fix made by
 *    Yanfly.
 *
 * Version 1.00: December 11, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageAddQueue
 * @text Advantage: Add to Queue
 * @desc Add (at the end) to the existing advantage queue the following
 * encounter advantages for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Add to the queue the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageSetQueue
 * @text Advantage: Set Queue
 * @desc Declare the exact advantage queue for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Change the queue to the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageResetQueue
 * @text Advantage: Reset Queue
 * @desc Resets the advantage queue for battles.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AlertStealthMode
 * @text Alert: Stealth Mode
 * @desc Changes the stealth mode setting for the player.
 *
 * @arg StealthMode:eval
 * @text Stealth Mode
 * @type boolean
 * @on Stealth On
 * @off No Steath
 * @desc If Stealth Mode is on, bypass unnoticed alerts.
 * Already alerted events will stay alert.
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
 * @param EncounterEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Advantage:struct
 * @text Advantage Settings
 * @type struct<Advantage>
 * @desc Advantage common event settings related to enemy encounters.
 * @default {"Preemptive:num":"0","Surprise:num":"0","Normal:num":"0"}
 *
 * @param Alert:struct
 * @text Alert Settings
 * @type struct<Alert>
 * @desc Settings alerting events. Used mainly for events chasing the player.
 * @default {"Alert":"","AlertRange:num":"4","AlertDash:eval":"true","AlertLock:num":"600","FoV":"","FovAngle:num":"120","ShowFoV:eval":"true","FovColor1:str":"rgba(255, 0, 0, 0)","FovColor2:str":"rgba(255, 0, 0, 0.5)","Response":"","ResponseType:str":"chase","ResponseBalloon:str":"Exclamation","CommonEvent:num":"0","ReactDelay:num":"80","Sound":"","SoundName:str":"Attack1","SoundVolume:num":"90","SoundPitch:num":"120","SoundPan:num":"0","Return":"","ReturnHome:eval":"true","ReturnWait:num":"180","ReturnStartBalloon:str":"Silence","ReturnEndBalloon:str":"Frustration"}
 *
 * @param EncounterMultiplier:struct
 * @text Encounter Multipliers
 * @type struct<EncounterMultiplier>
 * @desc Encounter multiplier settings regarding enemy encounters.
 * @default {"BushMultiplier:num":"2.00","BoatMultiplier:num":"1.00","ShipMultiplier:num":"0.50"}
 *
 * @param RepelLure:struct
 * @text Repel/Lure Settings
 * @type struct<RepelLure>
 * @desc Repel/Lure settings regarding enemy encounters.
 * @default {"RepelVariable:num":"31","RepelEvent:num":"6","LureVariable:num":"32","LureEvent:num":"8","LureRate:num":"4.0","LureFlat:num":"1"}
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
 * Advantage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Advantage:
 *
 * @param Preemptive:num
 * @text Preemptive Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a preemptive advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Surprise:num
 * @text Surprise Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a surprise advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Normal:num
 * @text No Advantage Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event when no advantage is given.
 * Use 0 to run no Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Alert Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Alert:
 *
 * @param Alert
 * 
 * @param AlertRange:num
 * @text Detection Range
 * @parent Alert
 * @type number
 * @min 1
 * @desc Default tile range for event to detect the player in.
 * @default 4
 *
 * @param AlertDash:eval
 * @text Alert Dash
 * @parent Alert
 * @type boolean
 * @on Dash
 * @off Walk
 * @desc Alerted events use dashing speed.
 * @default true
 * 
 * @param AlertLock:num
 * @text Alert Time
 * @parent Alert
 * @type number
 * @min 1
 * @desc Number of frames the alerted event will attempt to chase the player.
 * @default 600
 *
 * @param FoV
 * @text Field of View
 * 
 * @param FovAngle:num
 * @text Angle Range
 * @parent FoV
 * @type number
 * @min 1
 * @max 360
 * @desc The angle range used to determine the event's field of view.
 * @default 120
 *
 * @param ShowFoV:eval
 * @text Show Range
 * @parent FoV
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the field of view of events?
 * @default true
 *
 * @param FovColor1:str
 * @text Color 1
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0)
 *
 * @param FovColor2:str
 * @text Color 2
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0.5)
 *
 * @param Response
 *
 * @param ResponseType:str
 * @text Response Type
 * @parent Response
 * @type select
 * @option Chase: Use path finding to find a route to the player
 * @value chase
 * @option Rush: Rush directly at the player
 * @value rush
 * @option Flee: Run away from the player
 * @value flee
 * @option Random: Move in random directions
 * @value random
 * @desc What kind of default response behavior do you want?
 * @default chase
 *
 * @param ResponseBalloon:str
 * @text Response Balloon
 * @parent Response
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc What kind of balloon should the event play when detecting the player?
 * @default Exclamation
 *
 * @param CommonEvent:num
 * @text Common Event
 * @parent Response
 * @type common_event
 * @desc Run this Common Event when the player is detected.
 * Use 0 for no Common Event.
 * @default 0
 * 
 * @param ReactDelay:num
 * @text Reaction Delay
 * @parent Response
 * @type number
 * @min 1
 * @desc Number of frames for the event to stand still before beginning the chase.
 * @default 80
 *
 * @param Sound
 *
 * @param SoundName:str
 * @text Filename
 * @type file
 * @parent Sound
 * @dir audio/se/
 * @desc Filename of the sound effect played when alerted.
 * @default Attack1
 *
 * @param SoundVolume:num
 * @text Volume
 * @type number
 * @parent Sound
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param SoundPitch:num
 * @text Pitch
 * @type number
 * @parent Sound
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param SoundPan:num
 * @text Pan
 * @parent Sound
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Return
 *
 * @param ReturnHome:eval
 * @text Return Home
 * @parent Return
 * @type boolean
 * @on Return
 * @off Stay
 * @desc After finishing a chase, return back to the home position?
 * @default true
 * 
 * @param ReturnWait:num
 * @text Idle Wait
 * @parent Return
 * @type number
 * @min 1
 * @desc Number of frames to wait before returning home.
 * @default 180
 *
 * @param ReturnStartBalloon:str
 * @text Idle Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event is about to return.
 * @default Silence
 *
 * @param ReturnEndBalloon:str
 * @text Returning Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event begins returning.
 * @default Frustration
 *
 */
/* ----------------------------------------------------------------------------
 * Encounter Multipliers Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EncounterMultiplier:
 *
 * @param BushMultiplier:num
 * @text Bush Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is walking through bushes.
 * @default 2.00
 *
 * @param BoatMultiplier:num
 * @text Boat Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via boat.
 * @default 1.00
 *
 * @param ShipMultiplier:num
 * @text Ship Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via ship.
 * @default 0.50
 *
 */
/* ----------------------------------------------------------------------------
 * Repel/Lure Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~RepelLure:
 *
 * @param RepelVariable:num
 * @text Repel Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * repel encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param RepelEvent:num
 * @text Wear Off Common Event
 * @parent RepelVariable:num
 * @type common_event
 * @desc Run this Common Event when Repel reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureVariable:num
 * @text Lure Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * lure encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param LureEvent:num
 * @text Wear Off Common Event
 * @parent LureVariable:num
 * @type common_event
 * @desc Run this Common Event when Lure reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureRate:num
 * @text Lure Multiplier
 * @parent LureVariable:num
 * @desc Multiplier for how fast encounters occur by when the
 * lure effect is active.
 * @default 4.0
 *
 * @param LureFlat:num
 * @text Lure Increase
 * @parent LureVariable:num
 * @desc Flat increase for how fast encounters occur by when the
 * lure effect is active.
 * @default 1
 *
 */
//=============================================================================

function _0x52a2(_0x348fde,_0x41d64d){const _0x34e9f3=_0x34e9();return _0x52a2=function(_0x52a2b1,_0x1eb041){_0x52a2b1=_0x52a2b1-0x159;let _0x2b97da=_0x34e9f3[_0x52a2b1];return _0x2b97da;},_0x52a2(_0x348fde,_0x41d64d);}const _0x1883c9=_0x52a2;(function(_0x11492a,_0x267f1f){const _0x3df1f9=_0x52a2,_0x38fc0b=_0x11492a();while(!![]){try{const _0x17849c=parseInt(_0x3df1f9(0x265))/0x1+-parseInt(_0x3df1f9(0x1a5))/0x2*(parseInt(_0x3df1f9(0x2b8))/0x3)+-parseInt(_0x3df1f9(0x271))/0x4+parseInt(_0x3df1f9(0x229))/0x5*(parseInt(_0x3df1f9(0x214))/0x6)+parseInt(_0x3df1f9(0x209))/0x7*(parseInt(_0x3df1f9(0x26f))/0x8)+-parseInt(_0x3df1f9(0x203))/0x9+parseInt(_0x3df1f9(0x26c))/0xa*(parseInt(_0x3df1f9(0x1dc))/0xb);if(_0x17849c===_0x267f1f)break;else _0x38fc0b['push'](_0x38fc0b['shift']());}catch(_0x9a031b){_0x38fc0b['push'](_0x38fc0b['shift']());}}}(_0x34e9,0x86d3f));var label='EncounterEffects',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1883c9(0x2eb)](function(_0x1eab6c){const _0x3e953b=_0x1883c9;return _0x1eab6c[_0x3e953b(0x1fd)]&&_0x1eab6c[_0x3e953b(0x254)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1883c9(0x1b8)]=VisuMZ[label][_0x1883c9(0x1b8)]||{},VisuMZ[_0x1883c9(0x26d)]=function(_0x58e507,_0x233e46){const _0x286e90=_0x1883c9;for(const _0x2e21de in _0x233e46){if(_0x286e90(0x278)==='jWLmy'){if(_0x2e21de[_0x286e90(0x28c)](/(.*):(.*)/i)){const _0x3c064a=String(RegExp['$1']),_0x159e90=String(RegExp['$2'])[_0x286e90(0x164)]()[_0x286e90(0x292)]();let _0x2f82ec,_0x56f4ab,_0x2f8ac9;switch(_0x159e90){case _0x286e90(0x208):_0x2f82ec=_0x233e46[_0x2e21de]!==''?Number(_0x233e46[_0x2e21de]):0x0;break;case _0x286e90(0x21a):_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON[_0x286e90(0x205)](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab[_0x286e90(0x24c)](_0x250f3d=>Number(_0x250f3d));break;case'EVAL':_0x2f82ec=_0x233e46[_0x2e21de]!==''?eval(_0x233e46[_0x2e21de]):null;break;case'ARRAYEVAL':_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON['parse'](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab['map'](_0x54790b=>eval(_0x54790b));break;case'JSON':_0x2f82ec=_0x233e46[_0x2e21de]!==''?JSON['parse'](_0x233e46[_0x2e21de]):'';break;case _0x286e90(0x1ab):_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON[_0x286e90(0x205)](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab[_0x286e90(0x24c)](_0x4f6304=>JSON[_0x286e90(0x205)](_0x4f6304));break;case _0x286e90(0x2a7):_0x2f82ec=_0x233e46[_0x2e21de]!==''?new Function(JSON['parse'](_0x233e46[_0x2e21de])):new Function(_0x286e90(0x287));break;case _0x286e90(0x29b):_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON[_0x286e90(0x205)](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab[_0x286e90(0x24c)](_0x2385e3=>new Function(JSON[_0x286e90(0x205)](_0x2385e3)));break;case _0x286e90(0x1cb):_0x2f82ec=_0x233e46[_0x2e21de]!==''?String(_0x233e46[_0x2e21de]):'';break;case'ARRAYSTR':_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON['parse'](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab['map'](_0x30395f=>String(_0x30395f));break;case _0x286e90(0x2b2):_0x2f8ac9=_0x233e46[_0x2e21de]!==''?JSON[_0x286e90(0x205)](_0x233e46[_0x2e21de]):{},_0x2f82ec=VisuMZ['ConvertParams']({},_0x2f8ac9);break;case _0x286e90(0x2d7):_0x56f4ab=_0x233e46[_0x2e21de]!==''?JSON[_0x286e90(0x205)](_0x233e46[_0x2e21de]):[],_0x2f82ec=_0x56f4ab['map'](_0x3ed9aa=>VisuMZ[_0x286e90(0x26d)]({},JSON[_0x286e90(0x205)](_0x3ed9aa)));break;default:continue;}_0x58e507[_0x3c064a]=_0x2f82ec;}}else{const _0x25eb9=this['x'],_0x442057=this['y'],_0x1582bb=_0x19bd72['x'],_0x680435=_0x218962['y'],_0x2bbc65=_0x489d97[_0x286e90(0x253)](_0x1582bb-_0x25eb9,0x2),_0x1f59d3=_0x5d1ab5[_0x286e90(0x253)](_0x680435-_0x442057,0x2);return _0x3c520d[_0x286e90(0x1a8)](_0x2bbc65+_0x1f59d3);}}return _0x58e507;},(_0x21aa19=>{const _0x292f44=_0x1883c9,_0x7a8168=_0x21aa19[_0x292f44(0x20c)];for(const _0x6df80b of dependencies){if('SFLOy'===_0x292f44(0x1c3)){if(!this[_0x292f44(0x167)]())return;const _0xe976fd=this[_0x292f44(0x167)]()[_0x292f44(0x18f)];if(_0xe976fd==='')return;this[_0x292f44(0x242)](_0xe976fd);}else{if(!Imported[_0x6df80b]){alert(_0x292f44(0x1ce)[_0x292f44(0x15b)](_0x7a8168,_0x6df80b)),SceneManager[_0x292f44(0x219)]();break;}}}const _0x2b5cff=_0x21aa19[_0x292f44(0x254)];if(_0x2b5cff[_0x292f44(0x28c)](/\[Version[ ](.*?)\]/i)){if(_0x292f44(0x274)!==_0x292f44(0x281)){const _0x3429bb=Number(RegExp['$1']);_0x3429bb!==VisuMZ[label]['version']&&(alert(_0x292f44(0x2ca)[_0x292f44(0x15b)](_0x7a8168,_0x3429bb)),SceneManager[_0x292f44(0x219)]());}else _0x5b545f=this[_0x292f44(0x216)](_0x592b6c);}if(_0x2b5cff[_0x292f44(0x28c)](/\[Tier[ ](\d+)\]/i)){const _0x11a5e4=Number(RegExp['$1']);if(_0x11a5e4<tier){if('AysNw'===_0x292f44(0x17d))alert(_0x292f44(0x183)[_0x292f44(0x15b)](_0x7a8168,_0x11a5e4,tier)),SceneManager[_0x292f44(0x219)]();else return this['isMovementSucceeded']();}else tier=Math['max'](_0x11a5e4,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x21aa19[_0x292f44(0x29d)]);})(pluginData),PluginManager[_0x1883c9(0x1c4)](pluginData[_0x1883c9(0x20c)],_0x1883c9(0x2a4),_0xd67d92=>{const _0x36ce12=_0x1883c9;VisuMZ[_0x36ce12(0x26d)](_0xd67d92,_0xd67d92);const _0xefacab=_0xd67d92[_0x36ce12(0x249)];$gameSystem[_0x36ce12(0x2ae)](_0xefacab);}),PluginManager[_0x1883c9(0x1c4)](pluginData[_0x1883c9(0x20c)],_0x1883c9(0x1ae),_0x5ba4b3=>{const _0x390f77=_0x1883c9;VisuMZ[_0x390f77(0x26d)](_0x5ba4b3,_0x5ba4b3);const _0x58c21d=_0x5ba4b3['Queue'];$gameSystem[_0x390f77(0x297)](_0x58c21d);}),PluginManager[_0x1883c9(0x1c4)](pluginData[_0x1883c9(0x20c)],'AdvantageResetQueue',_0x28f534=>{const _0x4da1df=_0x1883c9;VisuMZ[_0x4da1df(0x26d)](_0x28f534,_0x28f534),$gameSystem['setForcedAdvantage']([]);}),PluginManager[_0x1883c9(0x1c4)](pluginData['name'],_0x1883c9(0x178),_0x4f0c93=>{const _0x52ba12=_0x1883c9;VisuMZ[_0x52ba12(0x26d)](_0x4f0c93,_0x4f0c93);const _0x3ce8a2=_0x4f0c93[_0x52ba12(0x179)];$gamePlayer[_0x52ba12(0x28d)](_0x3ce8a2);}),VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x235)]={'Preemptive':/<(?:PREEMPTIVE|PRE-EMPTIVE|PRE EMPTIVE)>/i,'Surprise':/<(?:SURPRISE|SURPRISED)>/i,'NoAdvantage':/<NO ADVANTAGE>/i,'Chance':/<CHANCE>/i,'FollowerTrigger':/<(?:FOLLOWER TRIGGER|FOLLOWERTRIGGER)>/i,'TouchDirectionLock':/<(?:ENCOUNTER LOCK|ENCOUNTER DIRECTION LOCK)>/i,'AlertDefault':/<ALERT>/i,'AlertRange':/<ALERT RANGE:[ ](\d+)>/i,'AlertDash':/<ALERT DASH>/i,'AlertWalk':/<ALERT WALK>/i,'AlertLock':/<ALERT TIME:[ ](\d+)>/i,'AlertFovAngle':/<ALERT FOV ANGLE:[ ](\d+)>/i,'AlertShowFov':/<ALERT SHOW FOV>/i,'AlertHideFov':/<ALERT HIDE FOV>/i,'AlertResponse':/<ALERT RESPONSE:[ ](.*)>/i,'AlertBalloon':/<(?:ALERT|RESPONSE) BALLOON:[ ](.*)>/i,'AlertReactDelay':/<ALERT REACT DELAY:[ ](\d+)>/i,'AlertCommonEvent':/<ALERT COMMON EVENT:[ ](\d+)>/i,'AlertSoundName':/<ALERT SOUND NAME:[ ](.*)>/i,'AlertSoundVolume':/<ALERT SOUND VOLUME:[ ](\d+)>/i,'AlertSoundPitch':/<ALERT SOUND PITCH:[ ](\d+)>/i,'AlertSoundPan':/<ALERT SOUND PAN:[ ](.*)>/i,'ReturnPosition':/<RETURN POSITION>/i,'StayPosition':/<STAY POSITION>/i,'ReturnStartBalloon':/<IDLE BALLOON:[ ](.*)>/i,'ReturnEndBalloon':/<RETURNING BALLOON:[ ](.*)>/i,'ReturnWait':/<RETURN TIME:[ ](\d+)>/i,'BlockVisionTag':/<(?:BLOCK|BLOCKED) VISION (?:TAG|TAGS):[ ](.*)>/i,'BlockVisionRegion':/<(?:BLOCK|BLOCKED) VISION (?:REGION|REGIONS):[ ](.*)>/i},VisuMZ[_0x1883c9(0x194)]['BattleManager_startBattle']=BattleManager['startBattle'],BattleManager[_0x1883c9(0x2b5)]=function(){const _0x3d5e32=_0x1883c9;this[_0x3d5e32(0x2e6)](),VisuMZ[_0x3d5e32(0x194)][_0x3d5e32(0x16d)][_0x3d5e32(0x20a)](this),this[_0x3d5e32(0x1f7)]();},BattleManager[_0x1883c9(0x2e6)]=function(){const _0xf983ff=_0x1883c9,_0x2de9c0=$gameSystem[_0xf983ff(0x1e3)]();if(!_0x2de9c0)return;switch(_0x2de9c0['toLowerCase']()[_0xf983ff(0x292)]()){case'preemptive':this[_0xf983ff(0x2cb)]=!![],this[_0xf983ff(0x2dc)]=![];break;case _0xf983ff(0x195):this[_0xf983ff(0x2cb)]=![],this[_0xf983ff(0x2dc)]=!![];break;case _0xf983ff(0x1cd):this[_0xf983ff(0x2cb)]=![],this[_0xf983ff(0x2dc)]=![];break;case'chance':VisuMZ[_0xf983ff(0x289)]['BattleManager_onEncounter']['call'](this);break;}},BattleManager[_0x1883c9(0x1f7)]=function(){const _0x4fe05c=_0x1883c9,_0x493f18=VisuMZ[_0x4fe05c(0x194)][_0x4fe05c(0x1b8)][_0x4fe05c(0x1e9)];if(!_0x493f18)return;let _0xb4e5f8=0x0;if(this[_0x4fe05c(0x2cb)])_0x4fe05c(0x2d4)!==_0x4fe05c(0x1a0)?_0xb4e5f8=_0x493f18['Preemptive']||0x0:(this['x']=this['_source']['x'],this['y']=this[_0x4fe05c(0x19b)]['y']-this[_0x4fe05c(0x19b)][_0x4fe05c(0x257)]/0x2);else this['_surprise']?_0xb4e5f8=_0x493f18['Surprise']||0x0:_0xb4e5f8=_0x493f18[_0x4fe05c(0x215)]||0x0;_0xb4e5f8>0x0&&('xlYKb'===_0x4fe05c(0x20d)?this[_0x4fe05c(0x1c5)]():$gameTemp['reserveCommonEvent'](_0xb4e5f8));},VisuMZ[_0x1883c9(0x194)]['Game_System_initialize']=Game_System[_0x1883c9(0x2e4)][_0x1883c9(0x2b0)],Game_System[_0x1883c9(0x2e4)][_0x1883c9(0x2b0)]=function(){const _0x2b29cf=_0x1883c9;VisuMZ['EncounterEffects']['Game_System_initialize'][_0x2b29cf(0x20a)](this),this[_0x2b29cf(0x237)]();},Game_System[_0x1883c9(0x2e4)][_0x1883c9(0x237)]=function(){const _0x1f35ae=_0x1883c9;this[_0x1f35ae(0x263)]=[];},Game_System['prototype'][_0x1883c9(0x2e5)]=function(){const _0x32623c=_0x1883c9;return this[_0x32623c(0x263)]===undefined&&this[_0x32623c(0x237)](),this[_0x32623c(0x263)];},Game_System[_0x1883c9(0x2e4)][_0x1883c9(0x1e3)]=function(){const _0xc296a=_0x1883c9;if($gameTroop&&$gameTroop[_0xc296a(0x20f)]()){if(_0xc296a(0x197)!==_0xc296a(0x1d1)){const _0xe0e927=VisuMZ[_0xc296a(0x194)]['RegExp'],_0x2208ee=$gameTroop[_0xc296a(0x20f)]()[_0xc296a(0x20c)];if(_0x2208ee[_0xc296a(0x28c)](_0xe0e927[_0xc296a(0x25d)])){if(_0xc296a(0x268)===_0xc296a(0x2b4))_0x35f114['push'](this[_0xc296a(0x27b)](_0x147bbe));else return _0xc296a(0x1c6);}else{if(_0x2208ee[_0xc296a(0x28c)](_0xe0e927[_0xc296a(0x2ad)]))return _0xc296a(0x195);else{if(_0x2208ee[_0xc296a(0x28c)](_0xe0e927[_0xc296a(0x2a0)])){if(_0xc296a(0x252)!=='CtFmL')_0x52658d=_0x43d7d5[_0xc296a(0x2ad)]||0x0;else return _0xc296a(0x1cd);}else{if(_0x2208ee[_0xc296a(0x28c)](_0xe0e927[_0xc296a(0x222)]))return _0xc296a(0x2e2);}}}}else _0x4a9c0b[_0xc296a(0x2ba)]=!![],_0x507686[_0xc296a(0x213)]=_0x15a15f(_0x514a06['$1'])||0x1;}return this['getForcedAdvantage']()['shift']();},Game_System['prototype']['setForcedAdvantage']=function(_0x292419){const _0x4966d2=_0x1883c9;this['_forcedAdvantage']===undefined&&this[_0x4966d2(0x237)](),this['_forcedAdvantage']=_0x292419;},Game_System['prototype'][_0x1883c9(0x2ae)]=function(_0x218886){const _0x3a46c7=_0x1883c9;this[_0x3a46c7(0x263)]===undefined&&(_0x3a46c7(0x22e)===_0x3a46c7(0x22e)?this[_0x3a46c7(0x237)]():this['refresh']()),this[_0x3a46c7(0x263)]=this[_0x3a46c7(0x263)][_0x3a46c7(0x2e9)](_0x218886);},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x2a5)]=Game_Map[_0x1883c9(0x2e4)][_0x1883c9(0x2d3)],Game_Map[_0x1883c9(0x2e4)][_0x1883c9(0x2d3)]=function(_0x41240a){const _0x3a0404=_0x1883c9;VisuMZ['EncounterEffects'][_0x3a0404(0x2a5)][_0x3a0404(0x20a)](this,_0x41240a),this[_0x3a0404(0x17c)](),this['setupEncounterEffectsData']();},Game_Map[_0x1883c9(0x2e4)]['initEncounterEffectsData']=function(){const _0x5d5b90=_0x1883c9;this[_0x5d5b90(0x264)]=[],this[_0x5d5b90(0x2af)]=[];},Game_Map[_0x1883c9(0x2e4)][_0x1883c9(0x2e1)]=function(){const _0x251408=_0x1883c9,_0x2cb44d=this[_0x251408(0x15d)]();if(!_0x2cb44d)return;const _0x5d857f=VisuMZ['EncounterEffects'][_0x251408(0x235)],_0x5d7f1f=_0x2cb44d['note'],_0x5ba4a5=$dataMap?$dataMap[_0x251408(0x18f)]:'';if(_0x5d7f1f[_0x251408(0x28c)](_0x5d857f[_0x251408(0x172)])){const _0x382f6d=String(RegExp['$1'])[_0x251408(0x168)](',')[_0x251408(0x24c)](_0x31c69b=>Number(_0x31c69b));this[_0x251408(0x264)]=this['_alertBlockVisionTags'][_0x251408(0x2e9)](_0x382f6d);}if(_0x5d7f1f[_0x251408(0x28c)](_0x5d857f[_0x251408(0x2ea)])){const _0x530739=String(RegExp['$1'])['split'](',')['map'](_0x2559bc=>Number(_0x2559bc));this[_0x251408(0x2af)]=this['_alertBlockVisionRegions']['concat'](_0x530739);}if(_0x5ba4a5['match'](_0x5d857f[_0x251408(0x172)])){if('FVIUQ'===_0x251408(0x29a)){const _0x4cc27a=String(RegExp['$1'])[_0x251408(0x168)](',')['map'](_0x292e89=>Number(_0x292e89));this['_alertBlockVisionTags']=this[_0x251408(0x264)][_0x251408(0x2e9)](_0x4cc27a);}else{const _0x23e7a6=this[_0x251408(0x2c7)],_0x5946c4=_0x1e0fe8*(_0x7067e6['PI']/0xb4),_0x3e321a=_0xe4b5e*0x2,_0x136a63=_0x23e7a6['createRadialGradient'](_0x13b201,_0x38aa82,0x18,_0x356c9,_0x19957e,_0x31a47d);_0x136a63[_0x251408(0x2e0)](0x0,_0x5b9838),_0x136a63[_0x251408(0x2e0)](0.85,_0x53ac94),_0x136a63[_0x251408(0x2e0)](0x1,_0x13a42e),_0x23e7a6[_0x251408(0x217)](),_0x23e7a6[_0x251408(0x1c2)]=_0x136a63,_0x23e7a6[_0x251408(0x1f1)](),_0x23e7a6['moveTo'](_0x2c73df,_0x569aa6),_0x23e7a6[_0x251408(0x2b3)](_0x3e321a,_0x52bcc3),_0x23e7a6[_0x251408(0x27d)](_0x248c2c,_0x4e03db,_0x271e83,0x0,_0x5946c4),_0x23e7a6['lineTo'](_0x1fede1,_0x4148f2),_0x23e7a6['fill'](),_0x23e7a6[_0x251408(0x23b)](),this[_0x251408(0x262)]['update']();}}if(_0x5ba4a5[_0x251408(0x28c)](_0x5d857f['BlockVisionRegion'])){const _0x3de954=String(RegExp['$1'])[_0x251408(0x168)](',')['map'](_0x429a09=>Number(_0x429a09));this[_0x251408(0x2af)]=this[_0x251408(0x2af)][_0x251408(0x2e9)](_0x3de954);}},Game_Map[_0x1883c9(0x2e4)][_0x1883c9(0x16c)]=function(_0x5013d4,_0x2f1697){const _0x298f13=_0x1883c9;if(this['_alertBlockVisionTags']===undefined)return![];if(this['_alertBlockVisionRegions']===undefined)return![];const _0x549c22=this[_0x298f13(0x2da)](_0x5013d4,_0x2f1697);if(this[_0x298f13(0x264)][_0x298f13(0x1c8)](_0x549c22))return!![];const _0x20743d=this['regionId'](_0x5013d4,_0x2f1697);if(this['_alertBlockVisionRegions'][_0x298f13(0x1c8)](_0x20743d))return!![];return![];},Game_CharacterBase['prototype'][_0x1883c9(0x2a8)]=function(_0x5796a7){const _0x2a9270=_0x1883c9;return;console['log'](_0x2a9270(0x25a)+this['x']+_0x2a9270(0x2c1)+this['y']),console['log'](_0x2a9270(0x1b9)+_0x5796a7['x']+_0x2a9270(0x27f)+_0x5796a7['y']);},Game_CharacterBase[_0x1883c9(0x2e4)][_0x1883c9(0x2e7)]=function(_0x3834af){const _0x229f8d=_0x1883c9;switch(this[_0x229f8d(0x1df)]()){case 0x1:return[0x8,0x9,0x6]['contains'](_0x3834af[_0x229f8d(0x1df)]());case 0x2:return[0x7,0x8,0x9][_0x229f8d(0x230)](_0x3834af['direction']());case 0x3:return[0x4,0x7,0x8]['contains'](_0x3834af['direction']());case 0x4:return[0x9,0x6,0x3][_0x229f8d(0x230)](_0x3834af['direction']());case 0x6:return[0x7,0x4,0x1][_0x229f8d(0x230)](_0x3834af[_0x229f8d(0x1df)]());case 0x7:return[0x2,0x3,0x6][_0x229f8d(0x230)](_0x3834af[_0x229f8d(0x1df)]());case 0x8:return[0x1,0x2,0x3][_0x229f8d(0x230)](_0x3834af[_0x229f8d(0x1df)]());case 0x9:return[0x4,0x1,0x2]['contains'](_0x3834af[_0x229f8d(0x1df)]());}return![];},Game_CharacterBase[_0x1883c9(0x2e4)]['isFacingAway']=function(_0x2c09fc){const _0x18c626=_0x1883c9;switch(this[_0x18c626(0x1df)]()){case 0x1:return[0x4,0x1,0x2]['contains'](_0x2c09fc[_0x18c626(0x1df)]());case 0x2:return[0x1,0x2,0x3][_0x18c626(0x230)](_0x2c09fc[_0x18c626(0x1df)]());case 0x3:return[0x2,0x3,0x6][_0x18c626(0x230)](_0x2c09fc['direction']());case 0x4:return[0x7,0x4,0x1][_0x18c626(0x230)](_0x2c09fc['direction']());case 0x6:return[0x9,0x6,0x3][_0x18c626(0x230)](_0x2c09fc[_0x18c626(0x1df)]());case 0x7:return[0x4,0x7,0x8][_0x18c626(0x230)](_0x2c09fc[_0x18c626(0x1df)]());case 0x8:return[0x7,0x8,0x9][_0x18c626(0x230)](_0x2c09fc[_0x18c626(0x1df)]());case 0x9:return[0x8,0x9,0x6][_0x18c626(0x230)](_0x2c09fc[_0x18c626(0x1df)]());}return![];},Game_CharacterBase[_0x1883c9(0x2e4)][_0x1883c9(0x1cc)]=function(_0x37d18a){const _0x54dfbb=_0x1883c9;switch(this['direction']()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x37d18a[_0x54dfbb(0x1df)]());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x54dfbb(0x230)](_0x37d18a[_0x54dfbb(0x1df)]());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x54dfbb(0x230)](_0x37d18a[_0x54dfbb(0x1df)]());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x54dfbb(0x230)](_0x37d18a['direction']());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x54dfbb(0x230)](_0x37d18a[_0x54dfbb(0x1df)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6]['contains'](_0x37d18a[_0x54dfbb(0x1df)]());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3]['contains'](_0x37d18a[_0x54dfbb(0x1df)]());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6][_0x54dfbb(0x230)](_0x37d18a[_0x54dfbb(0x1df)]());}return![];},Game_CharacterBase[_0x1883c9(0x2e4)][_0x1883c9(0x236)]=function(_0x3701a8){const _0x9df41b=_0x1883c9;this[_0x9df41b(0x2a8)](_0x3701a8);switch(this[_0x9df41b(0x1df)]()){case 0x1:return _0x3701a8['y']>this['y'];case 0x2:return _0x3701a8['y']>this['y'];case 0x3:return _0x3701a8['y']>this['y'];case 0x4:return _0x3701a8['x']<this['x'];case 0x6:return _0x3701a8['x']>this['x'];case 0x7:return _0x3701a8['y']<this['y'];case 0x8:return _0x3701a8['y']<this['y'];case 0x9:return _0x3701a8['y']<this['y'];}return![];},Game_CharacterBase['prototype'][_0x1883c9(0x1ed)]=function(_0x141a73){const _0x548711=_0x1883c9;this[_0x548711(0x2a8)](_0x141a73);switch(this[_0x548711(0x1df)]()){case 0x1:return _0x141a73['y']<this['y'];case 0x2:return _0x141a73['y']<this['y'];case 0x3:return _0x141a73['y']<this['y'];case 0x4:return _0x141a73['x']>this['x'];case 0x6:return _0x141a73['x']<this['x'];case 0x7:return _0x141a73['y']>this['y'];case 0x8:return _0x141a73['y']>this['y'];case 0x9:return _0x141a73['y']>this['y'];}return![];},Game_CharacterBase[_0x1883c9(0x2e4)]['isPositionSideOf']=function(_0x1a7963){const _0x195a05=_0x1883c9;this[_0x195a05(0x2a8)](_0x1a7963);switch(this[_0x195a05(0x1df)]()){case 0x1:return this['x']<_0x1a7963['x']&&this['y']>_0x1a7963['y']||this['x']>_0x1a7963['x']&&this['y']<_0x1a7963['y'];case 0x2:return this['x']!==_0x1a7963['x'];case 0x3:return this['x']>_0x1a7963['x']&&this['y']>_0x1a7963['y']||this['x']<_0x1a7963['x']&&this['y']<_0x1a7963['y'];case 0x4:return this['y']!==_0x1a7963['y'];break;case 0x6:return this['y']!==_0x1a7963['y'];break;case 0x7:return this['x']>_0x1a7963['x']&&this['y']>_0x1a7963['y']||this['x']<_0x1a7963['x']&&this['y']<_0x1a7963['y'];case 0x8:return this['x']!==_0x1a7963['x'];case 0x9:return this['x']<_0x1a7963['x']&&this['y']>_0x1a7963['y']||this['x']>_0x1a7963['x']&&this['y']<_0x1a7963['y'];}return![];},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x21d)]=Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x1ac)],Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x1ac)]=function(){const _0x1361e7=_0x1883c9;VisuMZ[_0x1361e7(0x194)]['Game_Player_initMembers'][_0x1361e7(0x20a)](this),this[_0x1361e7(0x1dd)]();},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x1dd)]=function(){const _0x1cfad5=_0x1883c9;this[_0x1cfad5(0x2a3)]=![];},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x1c0)]=function(){const _0x5a2e38=_0x1883c9;if(this[_0x5a2e38(0x2a3)]===undefined){if(_0x5a2e38(0x202)!==_0x5a2e38(0x169))this[_0x5a2e38(0x1dd)]();else{this['debugShowDirections'](_0x31df2f);switch(this[_0x5a2e38(0x1df)]()){case 0x1:return _0x285df5['y']>this['y'];case 0x2:return _0x28d7bc['y']>this['y'];case 0x3:return _0x4d9c18['y']>this['y'];case 0x4:return _0x2b4298['x']<this['x'];case 0x6:return _0x593bca['x']>this['x'];case 0x7:return _0x1c91c3['y']<this['y'];case 0x8:return _0x11c28e['y']<this['y'];case 0x9:return _0x3e7d22['y']<this['y'];}return![];}}return this[_0x5a2e38(0x2a3)];},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x28d)]=function(_0x542ecc){const _0x554d62=_0x1883c9;if(this['_alertStealthMode']===undefined){if(_0x554d62(0x1fb)!==_0x554d62(0x1fb)){_0x50f5e3[_0x554d62(0x1da)]-=0x1;return;}else this['initEncounterEffects']();}this['_alertStealthMode']=_0x542ecc;},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x261)]=function(){const _0x289874=_0x1883c9;if(this[_0x289874(0x15c)]()){if(_0x289874(0x1e6)!=='xcuiT'){const _0x2bd77a=this[_0x289874(0x1f8)];if(!_0x2bd77a[_0x289874(0x1c7)])return;const _0x5cd44a=_0x17af2c['EncounterEffects'][_0x289874(0x1b8)]['Alert'],_0x57d439=_0x2bd77a['fovAngle'],_0xdc54c9=_0xdf7f5c[_0x289874(0x1bf)]((_0x2bd77a[_0x289874(0x2b6)]+0.4)*_0x2ef333[_0x289874(0x2a6)]()),_0x30aa46=_0x5cd44a['FovColor1'],_0x385c5f=_0x5cd44a[_0x289874(0x200)];this[_0x289874(0x1bd)]=new _0x31f168(_0xdc54c9*0x2,_0xdc54c9*0x2),this[_0x289874(0x1bd)]['drawAlertCircle'](_0xdc54c9,_0x57d439,_0x30aa46,_0x385c5f),this['blendMode']=0x1;}else return this[_0x289874(0x2c8)](),0x0;}const _0x1f327=VisuMZ[_0x289874(0x194)][_0x289874(0x1b8)][_0x289874(0x24f)];if(!_0x1f327)return 0x1;let _0x4a44ce=0x1;return $gameMap['isBush'](this['x'],this['y'])&&(_0x4a44ce*=_0x1f327[_0x289874(0x2bf)]),$gameParty[_0x289874(0x2d5)]()&&(_0x4a44ce*=0.5),this[_0x289874(0x22b)]()&&(_0x289874(0x248)!==_0x289874(0x293)?_0x4a44ce*=_0x1f327[_0x289874(0x2d0)]:(_0x18dec0[_0x289874(0x18b)]=![],this[_0x289874(0x25c)]=0x0,this[_0x289874(0x161)](_0x2da9ff[_0x289874(0x26b)]))),this[_0x289874(0x1e5)]()&&(_0x289874(0x299)!=='mWauj'?_0x4a44ce*=_0x1f327['ShipMultiplier']:(_0x32e210--,_0x59ba0d[_0x289874(0x26e)](_0x2a04cc['LureVariable'],_0x584823),_0x319b34<=0x0&&_0x5f451a['LureEvent']>0x0&&_0x3e9db1[_0x289874(0x19e)](_0x1cf819[_0x289874(0x28b)]))),this[_0x289874(0x15e)]()&&(_0x4a44ce=this['processLureEncounters'](_0x4a44ce)),_0x4a44ce;},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x15c)]=function(){const _0x24142c=_0x1883c9,_0x299b55=VisuMZ[_0x24142c(0x194)][_0x24142c(0x1b8)]['RepelLure'];if(!_0x299b55)return![];if(_0x299b55['RepelVariable']<=0x0)return![];const _0x24d212=$gameVariables[_0x24142c(0x2b1)](_0x299b55['RepelVariable'])||0x0;return _0x24d212>0x0;},Game_Player[_0x1883c9(0x2e4)][_0x1883c9(0x2c8)]=function(){const _0x158c3e=_0x1883c9,_0x471744=VisuMZ[_0x158c3e(0x194)][_0x158c3e(0x1b8)][_0x158c3e(0x1d5)];if(!_0x471744)return;if(_0x471744['RepelVariable']<=0x0)return;let _0x2dca3a=$gameVariables[_0x158c3e(0x2b1)](_0x471744['RepelVariable'])||0x0;const _0x5cb813=_0x2dca3a>0x0;_0x5cb813&&(_0x2dca3a--,$gameVariables[_0x158c3e(0x26e)](_0x471744['RepelVariable'],_0x2dca3a),_0x2dca3a<=0x0&&_0x471744['RepelEvent']>0x0&&(_0x158c3e(0x20b)!==_0x158c3e(0x23c)?$gameTemp[_0x158c3e(0x19e)](_0x471744[_0x158c3e(0x1b2)]):(this['_forcedAdvantage']===_0x56e2c7&&this[_0x158c3e(0x237)](),this['_forcedAdvantage']=_0x45733f)));},Game_Player[_0x1883c9(0x2e4)]['isLureEncounters']=function(){const _0x323c7e=_0x1883c9,_0x23b63d=VisuMZ[_0x323c7e(0x194)][_0x323c7e(0x1b8)][_0x323c7e(0x1d5)];if(!_0x23b63d)return![];if(_0x23b63d[_0x323c7e(0x17e)]<=0x0)return![];const _0x2d621f=$gameVariables[_0x323c7e(0x2b1)](_0x23b63d[_0x323c7e(0x17e)])||0x0;return _0x2d621f>0x0;},Game_Player[_0x1883c9(0x2e4)]['processLureEncounters']=function(_0x356edc){const _0x510a39=_0x1883c9,_0x3c6d03=VisuMZ[_0x510a39(0x194)][_0x510a39(0x1b8)]['RepelLure'];if(!_0x3c6d03)return _0x356edc;if(_0x3c6d03[_0x510a39(0x17e)]<=0x0)return _0x356edc;let _0x1fcc54=$gameVariables[_0x510a39(0x2b1)](_0x3c6d03[_0x510a39(0x17e)])||0x0;const _0x118ce8=_0x1fcc54>0x0;if(_0x118ce8){if('FQGvl'!==_0x510a39(0x1aa))_0x1fcc54--,$gameVariables['setValue'](_0x3c6d03[_0x510a39(0x17e)],_0x1fcc54),_0x1fcc54<=0x0&&_0x3c6d03[_0x510a39(0x28b)]>0x0&&$gameTemp[_0x510a39(0x19e)](_0x3c6d03[_0x510a39(0x28b)]);else{switch(this[_0x510a39(0x1df)]()){case 0x1:return[0x4,0x1,0x2][_0x510a39(0x230)](_0x47dd94[_0x510a39(0x1df)]());case 0x2:return[0x1,0x2,0x3][_0x510a39(0x230)](_0x35dc80[_0x510a39(0x1df)]());case 0x3:return[0x2,0x3,0x6]['contains'](_0x302b34['direction']());case 0x4:return[0x7,0x4,0x1][_0x510a39(0x230)](_0x187e50[_0x510a39(0x1df)]());case 0x6:return[0x9,0x6,0x3][_0x510a39(0x230)](_0x598563[_0x510a39(0x1df)]());case 0x7:return[0x4,0x7,0x8][_0x510a39(0x230)](_0x29697f[_0x510a39(0x1df)]());case 0x8:return[0x7,0x8,0x9]['contains'](_0x5122c3[_0x510a39(0x1df)]());case 0x9:return[0x8,0x9,0x6][_0x510a39(0x230)](_0xbbdd2c[_0x510a39(0x1df)]());}return![];}}return _0x356edc*=_0x3c6d03[_0x510a39(0x16f)],_0x356edc+=_0x3c6d03[_0x510a39(0x285)],_0x356edc;},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x2ac)]=Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x234)],Game_Event[_0x1883c9(0x2e4)]['refresh']=function(){const _0x2c19a0=_0x1883c9,_0x5062bb=this[_0x2c19a0(0x231)];VisuMZ[_0x2c19a0(0x194)][_0x2c19a0(0x2ac)][_0x2c19a0(0x20a)](this),_0x5062bb!==this[_0x2c19a0(0x231)]&&this[_0x2c19a0(0x2c0)]();},VisuMZ[_0x1883c9(0x194)]['Game_Event_clearPageSettings']=Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x189)],Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x189)]=function(){const _0x5df2a4=_0x1883c9;VisuMZ['EncounterEffects'][_0x5df2a4(0x1d0)][_0x5df2a4(0x20a)](this),this['initEncounterEffectsEffects']();},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x276)]=Game_Event[_0x1883c9(0x2e4)]['setupPageSettings'],Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x2d8)]=function(){const _0x1f734a=_0x1883c9;VisuMZ['EncounterEffects'][_0x1f734a(0x276)][_0x1f734a(0x20a)](this),this['setupEncounterEffectsEffects']();},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x2c0)]=function(){const _0x18de81=_0x1883c9;this[_0x18de81(0x2cd)](),this[_0x18de81(0x280)](),this[_0x18de81(0x23f)]();},Game_Event['prototype'][_0x1883c9(0x280)]=function(_0xb1c9a7){const _0x40e29a=_0x1883c9;if(!this[_0x40e29a(0x167)]())return;const _0x2b4a73=this[_0x40e29a(0x167)]()[_0x40e29a(0x18f)];if(_0x2b4a73==='')return;this['checkEncounterEffectsStringTags'](_0x2b4a73);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x23f)]=function(_0x3515a6){const _0x5b67cf=_0x1883c9;if(!this[_0x5b67cf(0x167)]())return;if(!this[_0x5b67cf(0x2dd)]())return;const _0x1f135b=this[_0x5b67cf(0x246)]();let _0x4a9a43='';for(const _0x5f3267 of _0x1f135b){if([0x6c,0x198][_0x5b67cf(0x1c8)](_0x5f3267['code'])){if(_0x4a9a43!=='')_0x4a9a43+='\x0a';_0x4a9a43+=_0x5f3267[_0x5b67cf(0x29d)][0x0];}}this[_0x5b67cf(0x242)](_0x4a9a43);},Game_Event[_0x1883c9(0x2e4)]['initEncounterEffectsEffects']=function(){const _0x4c366f=_0x1883c9;this['_EncounterEffectsFollowerTrigger']=![],this[_0x4c366f(0x218)]=![],this['initEventChaseData']();},Game_Event[_0x1883c9(0x2e4)]['checkEncounterEffectsStringTags']=function(_0x29ea0b){const _0x5c5754=_0x1883c9,_0x247aa3=VisuMZ['EncounterEffects'][_0x5c5754(0x235)];_0x29ea0b[_0x5c5754(0x28c)](_0x247aa3[_0x5c5754(0x228)])&&(_0x5c5754(0x1bc)!==_0x5c5754(0x2cc)?(this[_0x5c5754(0x2c6)]=!![],this['_trigger']=0x2):this[_0x5c5754(0x237)]()),_0x29ea0b[_0x5c5754(0x28c)](_0x247aa3[_0x5c5754(0x27e)])&&(this[_0x5c5754(0x218)]=!![]),this[_0x5c5754(0x181)](_0x29ea0b);},VisuMZ['EncounterEffects'][_0x1883c9(0x23e)]=Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x1b3)],Game_Event['prototype']['checkEventTriggerTouch']=function(_0x439228,_0x267b2f){const _0x2fb36c=_0x1883c9;VisuMZ['EncounterEffects'][_0x2fb36c(0x23e)]['call'](this,_0x439228,_0x267b2f),this['checkEventFollowerTriggerTouch'](_0x439228,_0x267b2f);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x19d)]=function(_0x4a4464,_0x5d1709){const _0x2f93a3=_0x1883c9;if(!this[_0x2f93a3(0x2c6)])return;if($gameMap[_0x2f93a3(0x1d6)]())return;if(this[_0x2f93a3(0x1d9)]!==0x2)return;if(this['isJumping']())return;if(!this[_0x2f93a3(0x29f)]())return;const _0x1c39b8=$gamePlayer[_0x2f93a3(0x296)]()[_0x2f93a3(0x1e2)]();for(const _0x25f1cc of _0x1c39b8){if(_0x2f93a3(0x2ec)!==_0x2f93a3(0x2ec)){if(!this['isChaseEnabled']())return;this['isChaseAlerted']()?this[_0x2f93a3(0x1c5)]():(this[_0x2f93a3(0x1ff)](),this['updateAlertIdle']());}else{if(!_0x25f1cc)continue;if(_0x25f1cc[_0x2f93a3(0x204)](_0x4a4464,_0x5d1709)){this[_0x2f93a3(0x190)]();break;}}}},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x2a9)]=Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x182)],Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x182)]=function(){const _0x344375=_0x1883c9;this[_0x344375(0x239)]=!!this['_EncounterEffectsTouchDirectionLock'],VisuMZ[_0x344375(0x194)][_0x344375(0x2a9)][_0x344375(0x20a)](this),this[_0x344375(0x239)]=undefined;},VisuMZ['EncounterEffects']['Game_Character_turnTowardPlayer']=Game_Character[_0x1883c9(0x2e4)][_0x1883c9(0x225)],Game_Character['prototype'][_0x1883c9(0x225)]=function(){const _0x34c0ca=_0x1883c9;if(this[_0x34c0ca(0x239)])return;VisuMZ[_0x34c0ca(0x194)]['Game_Character_turnTowardPlayer'][_0x34c0ca(0x20a)](this);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x25e)]=function(){const _0x39f309=_0x1883c9,_0x42e031=VisuMZ[_0x39f309(0x194)][_0x39f309(0x1b8)][_0x39f309(0x223)];this[_0x39f309(0x1a4)]={'enabled':![],'alerted':![],'alertRange':_0x42e031[_0x39f309(0x286)],'alertDash':_0x42e031['AlertDash'],'alertLock':_0x42e031['AlertLock'],'chaseTime':_0x42e031[_0x39f309(0x24b)],'fovAngle':_0x42e031[_0x39f309(0x22f)],'showFov':_0x42e031[_0x39f309(0x277)],'response':_0x42e031[_0x39f309(0x16e)],'alertBalloon':VisuMZ[_0x39f309(0x194)][_0x39f309(0x21c)](_0x42e031[_0x39f309(0x2aa)]),'commonEvent':_0x42e031[_0x39f309(0x28f)],'reactDelay':_0x42e031['ReactDelay'],'reactTime':_0x42e031[_0x39f309(0x24d)],'alertSoundName':_0x42e031[_0x39f309(0x1fa)],'alertSoundVolume':_0x42e031['SoundVolume'],'alertSoundPitch':_0x42e031[_0x39f309(0x2d2)],'alertSoundPan':_0x42e031[_0x39f309(0x2bb)],'returnStartBalloon':VisuMZ[_0x39f309(0x194)][_0x39f309(0x21c)](_0x42e031[_0x39f309(0x1a1)]),'returnEndBalloon':VisuMZ[_0x39f309(0x194)][_0x39f309(0x21c)](_0x42e031[_0x39f309(0x2c5)]),'returnAfter':_0x42e031[_0x39f309(0x282)],'returnWaiting':![],'returnTime':_0x42e031[_0x39f309(0x22c)],'returnWait':_0x42e031['ReturnWait'],'returning':![],'returnX':this['x'],'returnY':this['y'],'returnDir':this[_0x39f309(0x1df)]()};},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x21c)]=function(_0x45bf46){const _0x17657a=_0x1883c9;let _0x14e810=0x0;switch(_0x45bf46['toUpperCase']()[_0x17657a(0x292)]()){case'!':case _0x17657a(0x295):_0x14e810=0x1;break;case'?':case _0x17657a(0x171):_0x14e810=0x2;break;case'MUSIC':case _0x17657a(0x275):case _0x17657a(0x233):case _0x17657a(0x1f4):case _0x17657a(0x21f):_0x14e810=0x3;break;case _0x17657a(0x176):case'LOVE':_0x14e810=0x4;break;case _0x17657a(0x17f):_0x14e810=0x5;break;case _0x17657a(0x160):_0x14e810=0x6;break;case _0x17657a(0x25f):case'ANNOYED':case'FRUSTRATION':_0x14e810=0x7;break;case'SILENCE':case _0x17657a(0x1de):_0x14e810=0x8;break;case _0x17657a(0x1f6):case _0x17657a(0x1b6):case'LIGHT\x20BULB':case _0x17657a(0x1a7):case _0x17657a(0x1af):_0x14e810=0x9;break;case'Z':case'ZZ':case _0x17657a(0x28a):case _0x17657a(0x250):_0x14e810=0xa;break;case _0x17657a(0x2b7):_0x14e810=0xb;break;case _0x17657a(0x1bb):_0x14e810=0xc;break;case _0x17657a(0x211):_0x14e810=0xd;break;case'USER-DEFINED\x204':_0x14e810=0xe;break;case _0x17657a(0x187):_0x14e810=0xf;break;}return _0x14e810;},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x181)]=function(_0x5c51a2){const _0xe25d68=_0x1883c9,_0x188b8f=VisuMZ['EncounterEffects'][_0xe25d68(0x235)],_0x55d8dc=this['_EncounterEffects_EventChaseData'];_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x256)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![]);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f['AlertRange'])&&('qGFmr'!==_0xe25d68(0x177)?(_0x40173b[_0xe25d68(0x2ba)]=!![],_0x4f114b[_0xe25d68(0x23a)]=!![]):(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x2b6)]=Number(RegExp['$1'])||0x1));_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x288)])&&(_0x55d8dc['enabled']=!![],_0x55d8dc[_0xe25d68(0x1a2)]=![]);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f['AlertWalk'])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x1a2)]=![]);_0x5c51a2['match'](_0x188b8f[_0xe25d68(0x24b)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc['alertLock']=Number(RegExp['$1'])||0x1,_0x55d8dc[_0xe25d68(0x1c9)]=Number(RegExp['$1'])||0x1);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x2bd)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x18c)]=Number(RegExp['$1'])||0x1);if(_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f['AlertShowFov'])){if('elzhD'!==_0xe25d68(0x2a1))_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc['showFov']=!![];else{const _0x3ceaa5=_0x596e3b[_0xe25d68(0x167)](this['eventId']());if(!_0x3ceaa5)return![];const _0x267386=_0x1d49c6;return _0x267386[_0xe25d68(0x1cc)](_0x3ceaa5)&&_0x3ceaa5[_0xe25d68(0x175)](_0x267386);}}_0x5c51a2['match'](_0x188b8f[_0xe25d68(0x21e)])&&(_0x55d8dc['enabled']=!![],_0x55d8dc[_0xe25d68(0x1c7)]=![]);_0x5c51a2['match'](_0x188b8f[_0xe25d68(0x2d1)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x24e)]=String(RegExp['$1'])[_0xe25d68(0x196)]()[_0xe25d68(0x292)]());if(_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x240)])){if('pvMyC'!==_0xe25d68(0x226)){_0x55d8dc[_0xe25d68(0x2ba)]=!![];const _0x236cb2=VisuMZ[_0xe25d68(0x194)][_0xe25d68(0x21c)](String(RegExp['$1']));_0x55d8dc[_0xe25d68(0x1a9)]=_0x236cb2;}else _0x3febfb[_0xe25d68(0x19e)](_0x1ffeb8[_0xe25d68(0x244)]);}_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x198)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x2e8)]=Number(RegExp['$1'])||0x1,_0x55d8dc[_0xe25d68(0x1da)]=Number(RegExp['$1'])||0x1);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f['AlertCommonEvent'])&&(_0x55d8dc['enabled']=!![],_0x55d8dc[_0xe25d68(0x244)]=Number(RegExp['$1'])||0x0);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x2ab)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x163)]=String(RegExp['$1']));_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x298)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x1fc)]=Number(RegExp['$1'])||0x1);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x243)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x213)]=Number(RegExp['$1'])||0x1);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x192)])&&(_0xe25d68(0x1ca)===_0xe25d68(0x1ca)?(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc['alertSoundPan']=Number(RegExp['$1'])||0x1):_0x23b74d[_0xe25d68(0x19e)](_0x4317b2[_0xe25d68(0x28b)]));_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x260)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc[_0xe25d68(0x23a)]=!![]);_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x2df)])&&(_0x55d8dc[_0xe25d68(0x2ba)]=!![],_0x55d8dc['returnAfter']=![]);if(_0x5c51a2['match'](_0x188b8f['ReturnStartBalloon'])){if(_0xe25d68(0x186)!==_0xe25d68(0x186))return'no\x20advantage';else{_0x55d8dc[_0xe25d68(0x2ba)]=!![];const _0x264000=VisuMZ[_0xe25d68(0x194)][_0xe25d68(0x21c)](String(RegExp['$1']));_0x55d8dc['returnStartBalloon']=_0x264000;}}if(_0x5c51a2['match'](_0x188b8f['ReturnEndBalloon'])){if(_0xe25d68(0x18d)==='omdwe'){switch(this[_0xe25d68(0x1df)]()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x49860e[_0xe25d68(0x1df)]());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0xe25d68(0x230)](_0x2858c1[_0xe25d68(0x1df)]());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0xe25d68(0x230)](_0x49696e[_0xe25d68(0x1df)]());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3]['contains'](_0x45681f['direction']());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0xe25d68(0x230)](_0x311f95[_0xe25d68(0x1df)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6][_0xe25d68(0x230)](_0xf15e9b['direction']());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3][_0xe25d68(0x230)](_0x1e3733[_0xe25d68(0x1df)]());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6][_0xe25d68(0x230)](_0x1ce8b6[_0xe25d68(0x1df)]());}return![];}else{_0x55d8dc[_0xe25d68(0x2ba)]=!![];const _0x422397=VisuMZ[_0xe25d68(0x194)]['ConvertBallonTextToID'](String(RegExp['$1']));_0x55d8dc[_0xe25d68(0x291)]=_0x422397;}}_0x5c51a2[_0xe25d68(0x28c)](_0x188b8f[_0xe25d68(0x22c)])&&(_0x55d8dc['enabled']=!![],_0x55d8dc[_0xe25d68(0x206)]=Number(RegExp['$1'])||0x1,_0x55d8dc[_0xe25d68(0x294)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x1883c9(0x2e4)]['chaseData']=function(){const _0x10c4a8=_0x1883c9;return this['_EncounterEffects_EventChaseData']===undefined&&this[_0x10c4a8(0x234)](),this[_0x10c4a8(0x1a4)];},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x1a6)]=function(){const _0x385eea=_0x1883c9;if(this[_0x385eea(0x251)])return![];return this[_0x385eea(0x1ee)]()[_0x385eea(0x2ba)];},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x19f)]=function(){const _0x361485=_0x1883c9;return this[_0x361485(0x1ee)]()['returnWaiting']||this[_0x361485(0x1ee)]()['returning'];},Game_Event['prototype'][_0x1883c9(0x1c1)]=function(){const _0x2ac016=_0x1883c9;return this[_0x2ac016(0x1ee)]()[_0x2ac016(0x273)];},VisuMZ[_0x1883c9(0x194)]['Game_Event_updateSelfMovement']=Game_Event['prototype'][_0x1883c9(0x1d7)],Game_Event[_0x1883c9(0x2e4)]['updateSelfMovement']=function(){const _0xaa047f=_0x1883c9;if(this[_0xaa047f(0x1c1)]())_0xaa047f(0x24a)===_0xaa047f(0x24a)?this[_0xaa047f(0x22d)]():(this[_0xaa047f(0x264)]=[],this[_0xaa047f(0x2af)]=[]);else{if(this['isChaseReturning']())this['updateSelfMovementReturnFromChase']();else{if(_0xaa047f(0x1eb)!==_0xaa047f(0x1eb)){if(this['_alertBlockVisionTags']===_0xf7267e)return![];if(this[_0xaa047f(0x2af)]===_0x3c66c2)return![];const _0xed43b7=this[_0xaa047f(0x2da)](_0xf5127c,_0x533783);if(this[_0xaa047f(0x264)][_0xaa047f(0x1c8)](_0xed43b7))return!![];const _0x3127e6=this[_0xaa047f(0x25b)](_0x342288,_0x3be7ed);if(this[_0xaa047f(0x2af)][_0xaa047f(0x1c8)](_0x3127e6))return!![];return![];}else VisuMZ['EncounterEffects'][_0xaa047f(0x1a3)][_0xaa047f(0x20a)](this);}}},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x22d)]=function(){const _0x4e9b1d=_0x1883c9,_0xda537d=this['chaseData']();if(_0xda537d[_0x4e9b1d(0x1da)]>0x0){_0xda537d['reactTime']-=0x1;return;}switch(_0xda537d[_0x4e9b1d(0x24e)]){case _0x4e9b1d(0x1b4):this[_0x4e9b1d(0x2ce)]();break;case'rush':this[_0x4e9b1d(0x1d3)]();break;case _0x4e9b1d(0x270):this['moveAwayFromPlayer']();break;case _0x4e9b1d(0x210):this[_0x4e9b1d(0x290)]();break;default:VisuMZ[_0x4e9b1d(0x194)][_0x4e9b1d(0x1a3)][_0x4e9b1d(0x20a)](this);break;}},Game_Event['prototype'][_0x1883c9(0x2ce)]=function(){const _0x45030a=_0x1883c9;if(!this[_0x45030a(0x26a)]())return;this[_0x45030a(0x16a)]=this['_eventAlertChaseCache']||{},this['_eventAlertChaseCache'][_0x45030a(0x1e0)]=$gamePlayer['x'],this[_0x45030a(0x16a)][_0x45030a(0x1d2)]=$gamePlayer['y'],this['_eventAlertChaseCache'][_0x45030a(0x224)]=this['x'],this[_0x45030a(0x16a)][_0x45030a(0x241)]=this['y'];const _0x1e8903=Imported[_0x45030a(0x247)]&&$gameMap[_0x45030a(0x1f5)]();let _0x5df000=$gamePlayer['x'],_0x3271f9=$gamePlayer['y'],_0x50d27d=0x0;_0x1e8903?(_0x50d27d=this[_0x45030a(0x20e)](_0x5df000,_0x3271f9),this['executeMoveDir8'](_0x50d27d)):(_0x50d27d=this[_0x45030a(0x173)](_0x5df000,_0x3271f9),this[_0x45030a(0x1cf)](_0x50d27d));},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x26a)]=function(){const _0xf5fe5c=_0x1883c9;if(this[_0xf5fe5c(0x191)]())return![];this[_0xf5fe5c(0x16a)]=this[_0xf5fe5c(0x16a)]||{};if(this[_0xf5fe5c(0x16a)][_0xf5fe5c(0x1e0)]!==$gamePlayer['x'])return!![];if(this['_eventAlertChaseCache']['playerY']!==$gamePlayer['y'])return!![];if(this[_0xf5fe5c(0x16a)][_0xf5fe5c(0x224)]!==this['x'])return!![];if(this[_0xf5fe5c(0x16a)][_0xf5fe5c(0x241)]!==this['y'])return!![];return![];},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x207)]=function(){const _0x601b78=_0x1883c9,_0x3e93fc=this[_0x601b78(0x1ee)]();if(!_0x3e93fc[_0x601b78(0x18b)])return;let _0x71889c=_0x3e93fc[_0x601b78(0x2d6)],_0x224b35=_0x3e93fc[_0x601b78(0x29c)];if(this['x']===_0x71889c&&this['y']===_0x224b35){if(_0x601b78(0x1e8)!==_0x601b78(0x1f2))_0x3e93fc[_0x601b78(0x18b)]=![],this['_moveRouteIndex']=0x0,this['setDirection'](_0x3e93fc[_0x601b78(0x26b)]);else{const _0x34af2f=_0x2be539(_0x28d2a9['$1']);_0x34af2f!==_0x3f62a8[_0x482751][_0x601b78(0x174)]&&(_0x3a08e4('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x98290e,_0x34af2f)),_0x52cd2f['exit']());}}const _0x9c1af8=Imported[_0x601b78(0x247)]&&$gameMap['isSupportDiagonalMovement']();let _0x28074d=0x0;_0x9c1af8?'Bkuig'!==_0x601b78(0x1d4)?(_0x28074d=this['findDiagonalDirectionTo'](_0x71889c,_0x224b35),this[_0x601b78(0x279)](_0x28074d)):(this[_0x601b78(0x2a3)]===_0x544ddc&&this[_0x601b78(0x1dd)](),this[_0x601b78(0x2a3)]=_0x95d021):(_0x28074d=this[_0x601b78(0x173)](_0x71889c,_0x224b35),this[_0x601b78(0x1cf)](_0x28074d));},VisuMZ['EncounterEffects'][_0x1883c9(0x1b5)]=Game_Event['prototype'][_0x1883c9(0x21b)],Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x21b)]=function(){const _0x100597=_0x1883c9;VisuMZ['EncounterEffects'][_0x100597(0x1b5)][_0x100597(0x20a)](this),this[_0x100597(0x266)]();},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x266)]=function(){const _0x1faf93=_0x1883c9;if(!this[_0x1faf93(0x1a6)]())return;if(this['isChaseAlerted']()){if(_0x1faf93(0x2e3)!=='QFvKP'){const _0x15dc9c=this['chaseData']();if(!_0x15dc9c[_0x1faf93(0x18b)])return;let _0x65d83b=_0x15dc9c[_0x1faf93(0x2d6)],_0x15fc4a=_0x15dc9c['returnY'];this['x']===_0x65d83b&&this['y']===_0x15fc4a&&(_0x15dc9c['returning']=![],this[_0x1faf93(0x25c)]=0x0,this[_0x1faf93(0x161)](_0x15dc9c['returnDir']));const _0x28dade=_0x387a09[_0x1faf93(0x247)]&&_0x411eee[_0x1faf93(0x1f5)]();let _0x57e77b=0x0;_0x28dade?(_0x57e77b=this[_0x1faf93(0x20e)](_0x65d83b,_0x15fc4a),this['executeMoveDir8'](_0x57e77b)):(_0x57e77b=this['findDirectionTo'](_0x65d83b,_0x15fc4a),this['moveStraight'](_0x57e77b));}else this['updateAlertChase']();}else this[_0x1faf93(0x1ff)](),this[_0x1faf93(0x188)]();},Game_Event['prototype'][_0x1883c9(0x1c5)]=function(){const _0x31db77=_0x1883c9,_0x1cc328=this[_0x31db77(0x1ee)](),_0x2b7391=this['getAlertDistanceToClosest']();if(_0x2b7391>_0x1cc328[_0x31db77(0x2b6)]){_0x1cc328[_0x31db77(0x1c9)]--;if(_0x1cc328[_0x31db77(0x1c9)]>0x0)return;_0x1cc328['alerted']=![];if(_0x1cc328[_0x31db77(0x23a)])_0x1cc328[_0x31db77(0x1fe)]=!![],_0x1cc328[_0x31db77(0x206)]=_0x1cc328['returnWait'],$gameTemp[_0x31db77(0x232)](this,_0x1cc328[_0x31db77(0x2d9)]);else{if(_0x31db77(0x199)===_0x31db77(0x1b7))return this['chaseData']()['alerted'];else $gameTemp['requestBalloon'](this,_0x1cc328[_0x31db77(0x291)]);}}else _0x31db77(0x2c2)===_0x31db77(0x1ef)?(_0x9ad274['enabled']=!![],_0x436a79[_0x31db77(0x1c7)]=![]):_0x1cc328['chaseTime']=_0x1cc328[_0x31db77(0x259)];},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x1ff)]=function(){const _0x4815d5=_0x1883c9,_0x29187b=this['chaseData']();if(!_0x29187b[_0x4815d5(0x1fe)])return;_0x29187b['returnTime']-=0x1,_0x29187b[_0x4815d5(0x206)]<=0x0&&(_0x29187b[_0x4815d5(0x1fe)]=![],_0x29187b['returning']=!![],$gameTemp['requestBalloon'](this,_0x29187b['returnEndBalloon']));},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x188)]=function(){const _0x36c8aa=_0x1883c9;if($gamePlayer[_0x36c8aa(0x1c0)]())return;const _0x28c438=this[_0x36c8aa(0x1ee)](),_0x179652=Math[_0x36c8aa(0x22a)](this[_0x36c8aa(0x1f0)]());if(_0x179652>_0x28c438[_0x36c8aa(0x2b6)])return;const _0x3955f6=this['getAlertAngleToPlayer']();if(_0x3955f6>_0x28c438[_0x36c8aa(0x18c)])return;if(!this[_0x36c8aa(0x27c)]())return;_0x28c438['alerted']=!![],_0x28c438[_0x36c8aa(0x1c9)]=_0x28c438[_0x36c8aa(0x259)],_0x28c438['returnWaiting']=![],_0x28c438[_0x36c8aa(0x18b)]=![],$gameTemp[_0x36c8aa(0x232)](this,_0x28c438[_0x36c8aa(0x1a9)]),_0x28c438[_0x36c8aa(0x1da)]=_0x28c438[_0x36c8aa(0x2e8)];_0x28c438[_0x36c8aa(0x244)]>0x0&&$gameTemp[_0x36c8aa(0x19e)](_0x28c438['commonEvent']);if(_0x28c438[_0x36c8aa(0x163)]!==''){const _0x52f6dd={'name':_0x28c438[_0x36c8aa(0x163)],'volume':_0x28c438[_0x36c8aa(0x1fc)],'pitch':_0x28c438[_0x36c8aa(0x213)],'pan':_0x28c438[_0x36c8aa(0x258)]};AudioManager['playSe'](_0x52f6dd);}},Game_Event[_0x1883c9(0x2e4)]['getAlertTargets']=function(){const _0x177b03=_0x1883c9,_0x19c7dc=[$gamePlayer];if($gamePlayer[_0x177b03(0x296)]()[_0x177b03(0x1f9)])for(let _0x421fba=0x0;_0x421fba<$gamePlayer['followers']()['_data']['length'];_0x421fba++){const _0x481539=$gamePlayer[_0x177b03(0x296)]()[_0x177b03(0x1b1)](_0x421fba);if(!_0x481539)continue;if(!_0x481539[_0x177b03(0x1db)]())continue;_0x19c7dc[_0x177b03(0x18e)](_0x481539);}return _0x19c7dc;},Game_Event['prototype'][_0x1883c9(0x1f0)]=function(){const _0xb7fcd=_0x1883c9,_0x152d56=[];_0x152d56['push'](this[_0xb7fcd(0x2c4)]());for(let _0x4d21cc=0x0;_0x4d21cc<$gamePlayer[_0xb7fcd(0x296)]()[_0xb7fcd(0x1f8)][_0xb7fcd(0x1e4)];_0x4d21cc++){_0x152d56[_0xb7fcd(0x18e)](this['getAlertDistanceToFollower'](_0x4d21cc));}return Math['min'](..._0x152d56);},Game_Event[_0x1883c9(0x2e4)]['getAlertDistanceToPlayer']=function(){const _0x1c50e0=_0x1883c9;return this[_0x1c50e0(0x19c)]($gamePlayer);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x27b)]=function(_0xc1cbcd){const _0x31ed49=_0x1883c9;if(!$gamePlayer[_0x31ed49(0x296)]()[_0x31ed49(0x1f9)])return 0x3e7;const _0x4e092b=$gamePlayer[_0x31ed49(0x296)]()[_0x31ed49(0x1b1)](_0xc1cbcd);if(!_0x4e092b[_0x31ed49(0x1db)]())return 0x3e7;return this[_0x31ed49(0x19c)](_0x4e092b);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x19c)]=function(_0x2cebf0){const _0x47de86=_0x1883c9,_0x3012f1=this['x'],_0x1ac610=this['y'],_0x6dc94c=_0x2cebf0['x'],_0x41c8cf=_0x2cebf0['y'],_0x321cf9=Math[_0x47de86(0x253)](_0x6dc94c-_0x3012f1,0x2),_0x364bef=Math['pow'](_0x41c8cf-_0x1ac610,0x2);return Math['sqrt'](_0x321cf9+_0x364bef);},Game_Event[_0x1883c9(0x2e4)]['getAlertAngleToPlayer']=function(_0x46e97a){const _0x1cc58d=_0x1883c9;return this[_0x1cc58d(0x16b)]($gamePlayer,_0x46e97a);},Game_Event['prototype'][_0x1883c9(0x1be)]=function(_0x4bcfbb,_0x2e4571){const _0x2e2e80=_0x1883c9;if(!$gamePlayer['followers']()['_visible'])return 0x3e7;const _0x189b8a=$gamePlayer['followers']()[_0x2e2e80(0x1b1)](_0x4bcfbb);if(!_0x189b8a[_0x2e2e80(0x1db)]())return 0x3e7;return this[_0x2e2e80(0x16b)](_0x189b8a,_0x2e4571);},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x16b)]=function(_0x5f2b5f,_0x320313){const _0x72b3e4=_0x1883c9,_0x188926=this['x'],_0x4005d1=this['y'],_0x368fda=_0x5f2b5f['x'],_0x221a2a=_0x5f2b5f['y'];let _0x5068bf=Math[_0x72b3e4(0x238)](_0x221a2a-_0x4005d1,_0x368fda-_0x188926)*0xb4/Math['PI'];if(!_0x320313){const _0x38e346=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this[_0x72b3e4(0x1df)]()];_0x5068bf+=_0x38e346,_0x5068bf+=this[_0x72b3e4(0x1ee)]()['fovAngle']/0x2;}while(_0x5068bf<0x0)_0x5068bf+=0x168;while(_0x5068bf>=0x168)_0x5068bf-=0x168;return _0x5068bf;},Game_Event[_0x1883c9(0x2e4)][_0x1883c9(0x27c)]=function(){const _0x28eca0=_0x1883c9;let _0x1182f5=![];const _0x452c28=this[_0x28eca0(0x1f0)]();if(_0x1182f5){if(_0x28eca0(0x28e)!==_0x28eca0(0x28e)){_0x13e9c2['ConvertParams'](_0x314a4c,_0x531f3c);const _0x39e7f8=_0x2f2b1f[_0x28eca0(0x249)];_0xdf19e7['addForcedAdvantage'](_0x39e7f8);}else console[_0x28eca0(0x1f3)](_0x28eca0(0x180),$gamePlayer['x'],$gamePlayer['y']),console['log']('Event:\x20',this['x'],this['y']);}const _0x56a24f=this[_0x28eca0(0x1ea)]();for(const _0x3c7c80 of _0x56a24f){if(_0x28eca0(0x1ba)!==_0x28eca0(0x255)){if(!_0x3c7c80)continue;let _0x551fd0=_0x452c28,_0x459f41=this[_0x28eca0(0x16b)](_0x3c7c80,!![]),_0x1a1a79=_0x459f41*Math['PI']/0xb4;while(_0x551fd0>=0x0){const _0x4838e0=Math['round'](this['x']+_0x551fd0*Math[_0x28eca0(0x23d)](_0x1a1a79)),_0x42eeff=Math['round'](this['y']+_0x551fd0*Math['sin'](_0x1a1a79));_0x551fd0-=0x1;if(_0x1182f5){if(_0x28eca0(0x162)===_0x28eca0(0x170)){const _0x3c8e68=_0x41808a(_0x339a18['$1']);_0x3c8e68<_0x37ceb3?(_0x48ba61(_0x28eca0(0x183)['format'](_0xaa0ee1,_0x3c8e68,_0x3917ad)),_0x3cc598[_0x28eca0(0x219)]()):_0x186c84=_0x589900[_0x28eca0(0x1ec)](_0x3c8e68,_0x49e3a);}else console[_0x28eca0(0x1f3)](_0x28eca0(0x166),_0x459f41,_0x551fd0,_0x4838e0,_0x42eeff);}if($gameMap[_0x28eca0(0x16c)](_0x4838e0,_0x42eeff))return![];}}else{const _0x33c48f=this[_0x28eca0(0x1f8)];let _0x7d95ef=_0x33c48f[_0x28eca0(0x18c)]/-0x2;_0x7d95ef+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this[_0x28eca0(0x1b0)][_0x28eca0(0x15a)]],this[_0x28eca0(0x184)]=_0x7d95ef;}}return!![];},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x165)]=Game_CharacterBase[_0x1883c9(0x2e4)]['isDashing'],Game_CharacterBase[_0x1883c9(0x2e4)][_0x1883c9(0x17a)]=function(){const _0xb2f981=_0x1883c9;if(this[_0xb2f981(0x2ed)]===Game_Event&&this[_0xb2f981(0x1c1)]()&&this[_0xb2f981(0x1ee)]()[_0xb2f981(0x1a2)]){if(_0xb2f981(0x284)===_0xb2f981(0x284))return this[_0xb2f981(0x2db)]();else _0x38c17c[_0xb2f981(0x2ba)]=!![],_0x5e7f2f[_0xb2f981(0x259)]=_0x4a8de8(_0x29db73['$1'])||0x1,_0x386e99[_0xb2f981(0x1c9)]=_0x12cb1f(_0x258813['$1'])||0x1;}return VisuMZ['EncounterEffects'][_0xb2f981(0x165)]['call'](this);},VisuMZ[_0x1883c9(0x194)]['Game_CharacterBase_setBalloonPose']=Game_CharacterBase[_0x1883c9(0x2e4)]['setBalloonPose'],Game_CharacterBase[_0x1883c9(0x2e4)][_0x1883c9(0x1d8)]=function(_0x2e1746,_0x355bb6){const _0x310690=_0x1883c9;if(this[_0x310690(0x2ed)]===Game_Event){if(this[_0x310690(0x19f)]()||this['isChaseAlerted']())return;}VisuMZ[_0x310690(0x194)][_0x310690(0x1e1)][_0x310690(0x20a)](this,_0x2e1746,_0x355bb6);},Game_Interpreter['prototype']['checkEventFacingPlayerFront']=function(){const _0x5b0061=_0x1883c9,_0x10c536=$gameMap['event'](this[_0x5b0061(0x2c9)]());if(!_0x10c536)return![];const _0x599d8f=$gamePlayer;return _0x10c536['isFacingTowards'](_0x599d8f)&&_0x599d8f[_0x5b0061(0x236)](_0x10c536);},Game_Interpreter[_0x1883c9(0x2e4)][_0x1883c9(0x2b9)]=function(){const _0x464ca7=_0x1883c9,_0x56280d=$gameMap['event'](this[_0x464ca7(0x2c9)]());if(!_0x56280d)return![];const _0x316a7a=$gamePlayer;return _0x56280d[_0x464ca7(0x2c3)](_0x316a7a)&&_0x316a7a[_0x464ca7(0x1ed)](_0x56280d);},Game_Interpreter['prototype'][_0x1883c9(0x212)]=function(){const _0x41ad29=_0x1883c9,_0x5063c4=$gameMap[_0x41ad29(0x167)](this[_0x41ad29(0x2c9)]());if(!_0x5063c4)return![];const _0x213cc5=$gamePlayer;return _0x5063c4[_0x41ad29(0x1cc)](_0x213cc5)&&_0x213cc5[_0x41ad29(0x175)](_0x5063c4);},Game_Interpreter[_0x1883c9(0x2e4)]['checkPlayerFacingEventFront']=function(){const _0x17892a=_0x1883c9,_0x129f6=$gameMap[_0x17892a(0x167)](this[_0x17892a(0x2c9)]());if(!_0x129f6)return![];const _0x357911=$gamePlayer;return _0x357911[_0x17892a(0x2e7)](_0x129f6)&&_0x129f6[_0x17892a(0x236)](_0x357911);},Game_Interpreter[_0x1883c9(0x2e4)][_0x1883c9(0x27a)]=function(){const _0x3cb538=_0x1883c9,_0x998687=$gameMap[_0x3cb538(0x167)](this[_0x3cb538(0x2c9)]());if(!_0x998687)return![];const _0x513e34=$gamePlayer;return _0x513e34[_0x3cb538(0x2c3)](_0x998687)&&_0x998687[_0x3cb538(0x1ed)](_0x513e34);},Game_Interpreter[_0x1883c9(0x2e4)]['checkPlayerFacingEventSide']=function(){const _0x326725=_0x1883c9,_0x48c507=$gameMap[_0x326725(0x167)](this[_0x326725(0x2c9)]());if(!_0x48c507)return![];const _0x3f11f4=$gamePlayer;return _0x3f11f4[_0x326725(0x1cc)](_0x48c507)&&_0x48c507[_0x326725(0x175)](_0x3f11f4);},VisuMZ[_0x1883c9(0x194)][_0x1883c9(0x201)]=Sprite_Character[_0x1883c9(0x2e4)][_0x1883c9(0x21b)],Sprite_Character[_0x1883c9(0x2e4)][_0x1883c9(0x21b)]=function(){const _0x509973=_0x1883c9;VisuMZ[_0x509973(0x194)][_0x509973(0x201)][_0x509973(0x20a)](this),this['updateEncounterEffects']();},Sprite_Character['prototype']['updateEncounterEffects']=function(){const _0x2e8a04=_0x1883c9;this[_0x2e8a04(0x2de)]();},Sprite_Character[_0x1883c9(0x2e4)]['createAlertFovSprite']=function(){const _0x1be605=_0x1883c9;if(this[_0x1be605(0x15f)])return;if(!this[_0x1be605(0x1ad)])return;this['_alertFovSprite']=new Sprite_AlertFovSprite(this),this[_0x1be605(0x15f)]['z']=0x6,this[_0x1be605(0x1ad)][_0x1be605(0x221)](this[_0x1be605(0x15f)]);};function Sprite_AlertFovSprite(){this['initialize'](...arguments);}function _0x34e9(){const _0x53c338=['_preemptive','EjcCI','initEncounterEffectsEffects','updateSelfMovementSmartChase','createFovBitmap','BoatMultiplier','AlertResponse','SoundPitch','setup','hrxhO','hasEncounterHalf','returnX','ARRAYSTRUCT','setupPageSettings','returnStartBalloon','terrainTag','isMovementSucceeded','_surprise','page','createAlertFovSprite','StayPosition','addColorStop','setupEncounterEffectsData','chance','QFvKP','prototype','getForcedAdvantage','checkForcedAdvantage','isFacingTowards','reactDelay','concat','BlockVisionRegion','filter','vcxFC','constructor','fill','_direction','format','isRepelEncounters','tileset','isLureEncounters','_alertFovSprite','SWEAT','setDirection','ijETD','alertSoundName','toUpperCase','Game_CharacterBase_isDashing','Data:\x20','event','split','UNZNO','_eventAlertChaseCache','getAlertAngleToTarget','isAlertVisionBlocked','BattleManager_startBattle','ResponseType','LureRate','pQGSE','QUESTION','BlockVisionTag','findDirectionTo','version','isPositionSideOf','HEART','qGFmr','AlertStealthMode','StealthMode','isDashing','blendMode','initEncounterEffectsData','AysNw','LureVariable','ANGER','Player:\x20','checkEncounterEffectsStringTagsChase','lock','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','angle','MQcPn','MRUlf','USER-DEFINED\x205','updateAlertIdle','clearPageSettings','updateBitmap','returning','fovAngle','aqZNx','push','note','start','isMoving','AlertSoundPan','updatePosition','EncounterEffects','surprise','toLowerCase','mOKWb','AlertReactDelay','rgjTu','_characterErased','_source','getAlertDistanceToTarget','checkEventFollowerTriggerTouch','reserveCommonEvent','isChaseReturning','EmtVa','ReturnStartBalloon','alertDash','Game_Event_updateSelfMovement','_EncounterEffects_EventChaseData','6fLGCfF','isChaseEnabled','LIGHT-BULB','sqrt','alertBalloon','zEkRP','ARRAYJSON','initMembers','parent','AdvantageSetQueue','LIGHTBULB','_character','follower','RepelEvent','checkEventTriggerTouch','chase','Game_Event_update','BULB','OgpkS','Settings','Event\x20X:\x20','cLsXM','USER-DEFINED\x202','KgRdI','bitmap','getAlertAngleToFollower','ceil','getAlertStealthMode','isChaseAlerted','fillStyle','Ybrwj','registerCommand','updateAlertChase','preemptive','showFov','includes','chaseTime','eORMa','STR','isFacingSideways','no\x20advantage','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','moveStraight','Game_Event_clearPageSettings','FcZVH','playerY','moveTowardPlayer','FcVcl','RepelLure','isEventRunning','updateSelfMovement','setBalloonPose','_trigger','reactTime','actor','77lxMyDq','initEncounterEffects','...','direction','playerX','Game_CharacterBase_setBalloonPose','visibleFollowers','shiftForcedAdvantage','length','isInShip','xcuiT','updateEncounterEffects','JlBjP','Advantage','getAlertTargets','UYPFN','max','isPositionBackOf','chaseData','clWrn','getAlertDistanceToClosest','beginPath','cBfIK','log','MUSIC-NOTE','isSupportDiagonalMovement','LIGHT','runAdvantageCommonEvents','_data','_visible','SoundName','sEQXO','alertSoundVolume','status','returnWaiting','updateAlertReturnWait','FovColor2','Sprite_Character_update','BVshp','1082034xyccNJ','pos','parse','returnTime','updateSelfMovementReturnFromChase','NUM','28jWPhkP','call','CXJNy','name','vJLdf','findDiagonalDirectionTo','troop','random','USER-DEFINED\x203','checkEventFacingPlayerSide','alertSoundPitch','622956IhGtME','Normal','processLureEncounters','save','_EncounterEffectsTouchDirectionLock','exit','ARRAYNUM','update','ConvertBallonTextToID','Game_Player_initMembers','AlertHideFov','MUSICNOTE','create','addChild','Chance','Alert','eventX','turnTowardPlayer','mCdaK','createRadialGradient','FollowerTrigger','30VFcBHT','round','isInBoat','ReturnWait','updateSelfMovementAlerted','WmeRa','FovAngle','contains','_pageIndex','requestBalloon','MUSIC\x20NOTE','refresh','RegExp','isPositionFrontOf','initEncounterEffects_ForcedAdvantage','atan2','_processEncounterDirectionLock','returnAfter','restore','aaEAt','cos','Game_Event_checkEventTriggerTouch','setupEncounterEffectsCommentTags','AlertBalloon','eventY','checkEncounterEffectsStringTags','AlertSoundPitch','commonEvent','anchor','list','VisuMZ_1_EventsMoveCore','nNyUW','Queue','xweUg','AlertLock','map','ReactDelay','response','EncounterMultiplier','SLEEP','_erased','CtFmL','pow','description','xjKgv','AlertDefault','height','alertSoundPan','alertLock','\x20This\x20X:\x20','regionId','_moveRouteIndex','Preemptive','initEventChaseData','COBWEB','ReturnPosition','encounterProgressValue','_baseTexture','_forcedAdvantage','_alertBlockVisionTags','251200cNqsAb','updateAlert','FovColor1','TRiqu','updateAngle','needsSmartChaseUpdate','returnDir','824830lwvWiR','ConvertParams','setValue','1461160wpnGEc','flee','3350700HkFnee','needsBitmapRedraw','alerted','QAilm','NOTE','Game_Event_setupPageSettings','ShowFoV','jWLmy','executeMoveDir8','checkPlayerFacingEventBack','getAlertDistanceToFollower','isAlertLineOfVisionClear','arc','TouchDirectionLock',',\x20Event\x20Y:\x20','setupEncounterEffectsNotetags','GdrBt','ReturnHome','destroy','UEsOv','LureFlat','AlertRange','return\x200','AlertDash','BattleCore','ZZZ','LureEvent','match','setAlertStealthMode','hYSsv','CommonEvent','moveTypeRandom','returnEndBalloon','trim','jHdBY','returnWait','EXCLAMATION','followers','setForcedAdvantage','AlertSoundVolume','yNPCB','FVIUQ','ARRAYFUNC','returnY','parameters','moveTo','isNormalPriority','NoAdvantage','pJzWJ','IRvlm','_alertStealthMode','AdvantageAddQueue','Game_Map_setup','tileWidth','FUNC','debugShowDirections','Game_Event_lock','ResponseBalloon','AlertSoundName','Game_Event_refresh','Surprise','addForcedAdvantage','_alertBlockVisionRegions','initialize','value','STRUCT','lineTo','kzpvH','startBattle','alertRange','USER-DEFINED\x201','671961VxnMKw','checkEventFacingPlayerBack','enabled','SoundPan','vrTzQ','AlertFovAngle','drawAlertCircle','BushMultiplier','setupEncounterEffectsEffects',',\x20\x20This\x20Y:\x20','iguPp','isFacingAway','getAlertDistanceToPlayer','ReturnEndBalloon','_EncounterEffectsFollowerTrigger','context','processRepelEncounters','eventId','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'];_0x34e9=function(){return _0x53c338;};return _0x34e9();}Sprite_AlertFovSprite[_0x1883c9(0x2e4)]=Object[_0x1883c9(0x220)](Sprite[_0x1883c9(0x2e4)]),Sprite_AlertFovSprite[_0x1883c9(0x2e4)][_0x1883c9(0x2ed)]=Sprite_AlertFovSprite,Sprite_AlertFovSprite[_0x1883c9(0x2e4)][_0x1883c9(0x2b0)]=function(_0x1d9523){const _0x133d13=_0x1883c9;this[_0x133d13(0x19b)]=_0x1d9523,this['_character']=_0x1d9523['_character'],Sprite[_0x133d13(0x2e4)]['initialize'][_0x133d13(0x20a)](this),this['initMembers'](),this[_0x133d13(0x21b)]();},Sprite_AlertFovSprite[_0x1883c9(0x2e4)]['initMembers']=function(){const _0x3f4bb=_0x1883c9;this[_0x3f4bb(0x245)]['x']=0.5,this[_0x3f4bb(0x245)]['y']=0.5,this[_0x3f4bb(0x19a)]=![];if(!this[_0x3f4bb(0x1b0)])return;if(this['_character'][_0x3f4bb(0x2ed)]!==Game_Event)return;this[_0x3f4bb(0x1f8)]={};},Sprite_AlertFovSprite['prototype'][_0x1883c9(0x21b)]=function(){const _0x39596d=_0x1883c9;Sprite[_0x39596d(0x2e4)][_0x39596d(0x21b)][_0x39596d(0x20a)](this);if(!this[_0x39596d(0x1b0)])return;if(this[_0x39596d(0x1b0)][_0x39596d(0x2ed)]!==Game_Event)return;this[_0x39596d(0x18a)]();if(!this[_0x39596d(0x1f8)][_0x39596d(0x2ba)])return;this[_0x39596d(0x193)](),this[_0x39596d(0x269)]();},Sprite_AlertFovSprite['prototype'][_0x1883c9(0x18a)]=function(){const _0x1168d7=_0x1883c9;if(!this[_0x1168d7(0x272)]())return;this[_0x1168d7(0x1f8)]=JsonEx['makeDeepCopy'](this[_0x1168d7(0x1b0)]['chaseData']());if(this[_0x1168d7(0x1f8)][_0x1168d7(0x2ba)]&&!this[_0x1168d7(0x1b0)][_0x1168d7(0x251)])_0x1168d7(0x185)===_0x1168d7(0x2bc)?(_0x209299['EncounterEffects']['Sprite_Character_update'][_0x1168d7(0x20a)](this),this[_0x1168d7(0x1e7)]()):this[_0x1168d7(0x2cf)]();else{if('wJsqz'!==_0x1168d7(0x2a2)){this[_0x1168d7(0x19a)]=this[_0x1168d7(0x1b0)][_0x1168d7(0x251)];if(this[_0x1168d7(0x1bd)])this[_0x1168d7(0x1bd)][_0x1168d7(0x283)]();this[_0x1168d7(0x1bd)]=new Bitmap(0x1,0x1);}else this[_0x1168d7(0x2e6)](),_0x54c72b[_0x1168d7(0x194)]['BattleManager_startBattle'][_0x1168d7(0x20a)](this),this[_0x1168d7(0x1f7)]();}},Sprite_AlertFovSprite[_0x1883c9(0x2e4)][_0x1883c9(0x272)]=function(){const _0x2fd6fa=_0x1883c9,_0x39394e=this[_0x2fd6fa(0x1b0)][_0x2fd6fa(0x1ee)](),_0x539f58=this[_0x2fd6fa(0x1f8)];if(_0x39394e['enabled']!==_0x539f58[_0x2fd6fa(0x2ba)])return!![];if(_0x39394e[_0x2fd6fa(0x2b6)]!==_0x539f58[_0x2fd6fa(0x2b6)])return!![];if(_0x39394e[_0x2fd6fa(0x18c)]!==_0x539f58['fovAngle'])return!![];if(this['_characterErased']!==this['_character'][_0x2fd6fa(0x251)])return!![];return![];},Sprite_AlertFovSprite['prototype'][_0x1883c9(0x2cf)]=function(){const _0x56c4b9=_0x1883c9,_0xe1f529=this[_0x56c4b9(0x1f8)];if(!_0xe1f529[_0x56c4b9(0x1c7)])return;const _0xb76d11=VisuMZ[_0x56c4b9(0x194)]['Settings'][_0x56c4b9(0x223)],_0x4a4a08=_0xe1f529['fovAngle'],_0x26138a=Math['ceil']((_0xe1f529['alertRange']+0.4)*$gameMap[_0x56c4b9(0x2a6)]()),_0x10aee4=_0xb76d11[_0x56c4b9(0x267)],_0x3e2485=_0xb76d11['FovColor2'];this[_0x56c4b9(0x1bd)]=new Bitmap(_0x26138a*0x2,_0x26138a*0x2),this[_0x56c4b9(0x1bd)][_0x56c4b9(0x2be)](_0x26138a,_0x4a4a08,_0x10aee4,_0x3e2485),this[_0x56c4b9(0x17b)]=0x1;},Bitmap[_0x1883c9(0x2e4)][_0x1883c9(0x2be)]=function(_0x35412a,_0x300969,_0x1293ad,_0x4ca8ff){const _0x5a9d7b=_0x1883c9,_0x35a134=this[_0x5a9d7b(0x2c7)],_0x2350b0=_0x300969*(Math['PI']/0xb4),_0x57602d=_0x35412a*0x2,_0x23f783=_0x35a134[_0x5a9d7b(0x227)](_0x35412a,_0x35412a,0x18,_0x35412a,_0x35412a,_0x35412a);_0x23f783[_0x5a9d7b(0x2e0)](0x0,_0x1293ad),_0x23f783[_0x5a9d7b(0x2e0)](0.85,_0x4ca8ff),_0x23f783[_0x5a9d7b(0x2e0)](0x1,_0x1293ad),_0x35a134['save'](),_0x35a134[_0x5a9d7b(0x1c2)]=_0x23f783,_0x35a134[_0x5a9d7b(0x1f1)](),_0x35a134[_0x5a9d7b(0x29e)](_0x35412a,_0x35412a),_0x35a134['lineTo'](_0x57602d,_0x35412a),_0x35a134[_0x5a9d7b(0x27d)](_0x35412a,_0x35412a,_0x35412a,0x0,_0x2350b0),_0x35a134[_0x5a9d7b(0x2b3)](_0x35412a,_0x35412a),_0x35a134[_0x5a9d7b(0x159)](),_0x35a134[_0x5a9d7b(0x23b)](),this[_0x5a9d7b(0x262)][_0x5a9d7b(0x21b)]();},Sprite_AlertFovSprite[_0x1883c9(0x2e4)][_0x1883c9(0x193)]=function(){const _0x3ed1b3=_0x1883c9;this['x']=this[_0x3ed1b3(0x19b)]['x'],this['y']=this['_source']['y']-this['_source'][_0x3ed1b3(0x257)]/0x2;},Sprite_AlertFovSprite['prototype']['updateAngle']=function(){const _0x28930d=_0x1883c9,_0x37fb9c=this['_data'];let _0x18e541=_0x37fb9c[_0x28930d(0x18c)]/-0x2;_0x18e541+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this[_0x28930d(0x1b0)][_0x28930d(0x15a)]],this['angle']=_0x18e541;};