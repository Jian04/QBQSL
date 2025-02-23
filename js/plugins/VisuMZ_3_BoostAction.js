//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Stealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost[text]         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0[text]        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x[text]      The text inside the brackets will only appear if at
 *                      least x Boosts are used.
 * 
 * \boost>x[text]       The text inside the brackets will only appear if more
 *                      than x Boosts are used.
 * 
 * \boost=x[text]       The text inside the brackets will only appear if
 *                      exactly x Boosts are used.
 * 
 * \boost<x[text]       The text inside the brackets will only appear if less
 *                      than x Boosts are used.
 * 
 * \boost<=x[text]      The text inside the brackets will only appear if at
 *                      most x Boosts are used.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
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
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0x3ed9c8=_0x224f;function _0x39a6(){const _0x169236=['match','convertBoostLessEscape','loadBitmap','QAhbU','boostIcon','Scene_Battle_createActorCommandWindow','DmgMultiply','_iconIndex','canUseBoostShortcut','Regen','shouldDrawBoostIcons','BoostBattleStartFlat','callUpdateHelp','schaH','Game_Battler_regenerateTp','_icons','convertBoostGreaterEqualEscape','bind','TPqqt','UNBOOST_ACTION_SHOW','jTPdl','pbGvz','setupBoostAI','map','rjdyh','hgbwY','FDfZe','meetsUsableItemConditions','boostPointsRegenValue','MWEsx','Game_BattlerBase_initialize','Equal','constructor','mGuWz','text','BOOST_ACTION_SHOW','deGIc','vJbYN','BattleCore','wSckb','_bpSubject','_turnUsedBoostPoints','exit','randomInt','initBoostAction','EVAL','minTurns','Window_Base_convertEscapeCharacters','woAqV','selectNextCommand','bpRegenAdded','BattleManager_setup','DelYi','wlgrU','isHidden','Game_BattlerBase_meetsUsableItemConditions','currentAction','partyChangeRefresh','BOOST_POINTS_MAX_TOUSE','RegExp','convertBoost0Escape','addLoadListener','applyBoostPointDamage','processEnemyUseBoost','applyBPEffects','dzDPr','tLzsd','cursorPageup','BoostGainPoints','POvms','isBoostSealed','cvgCL','subject','sVYsM','requestFauxAnimation','EffectMultiply','__Game_Action_applyItemUserEffect','VRnJl','meetsBoostShortcutRequirements','convertBoostLessEqualEscape','BOOST_POINTS_MAX_STORED','boostTransferBitmap','3153390vBiyLp','TUhZu','status','RepeatAddition','note','BOOST_POINTS_ANIMATIONS','BOOST_ACTION_BYPASS_CONSTRUCTORS','ARRAYJSON','setHandler','greater','_slot','prototype','round','allowBoostAction','placeBoostPoints','addBoostCommand','toUseBoostPoints','ARRAYSTRUCT','JHWlD','_bpTurnFlat','default','addCommand','BattleLayout','BOOST_POINTS_MULTIPLIERS','includes','regenerateBoostPoints','rzgNV','Game_Enemy_setup','_inBattle','AlwaysRegen','convertBoostEqualEscape','Game_Party_partyChangeRefresh','BoostRepeat','OcuZB','Window_Selectable_cursorPagedown','Game_Battler_addState','Settings','TargetBoostPoints','BoostSealed','mtMtU','move','HDzok','YjCSr','boostMultiplier','setupBattleBoostPointsAdded','gainToUseBoostPoints','convertEscapeCharacters','unboost','ICON_SIZE_RATE','toLowerCase','removeActor','MKmYT','width','startChangeBoostPointsAnimation','Game_Action_applyGuard','vMCJo','1311808DPlcNo','endAction','Require','endActionBoostPoints','681002OXfheZ','boostSmooth','setToUseBoostPoints','BOOST_POINTS_TURN_REGEN','iconWidth','BOOST_POINTS_ADDITION','addActor','Damage','_helpWindow','ARRAYSTR','DeathRemoval','update','ePwnH','bpRegenMultipliers','HpEBL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setupBattleBoostPoints','\x5cI[%1]%2','TWkYL','replace','BP\x20Effect','hRkLt','updateIcon','toUpperCase','Less','lineHeight','Scene_Battle_startActorCommandSelection','FUNC','numRepeats','setup','TurnMultiply','isSceneBattle','apply','convertBoostDamageEscape','boostAddition','Game_Action_numRepeats','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','MnIWe','format','STR','height','addState','create','storedBoostPoints','resetStateCounts','commandBoost','_logWindow','updateFrame','drawItemStatusBoostPointsAuto','Game_BattlerBase_resetStateCounts','USSSN','actor%1-boostPoints','VisuMZ_1_SkillsStatesCore','ARRAYEVAL','VisuMZ_1_MessageCore','_storedBoostPoints','processEnemyBPUsage','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BoostCmd','convertBoostGreaterEscape','Amount','BOOST_POINTS_DISPLAY_OFFSET_X','BattleManager_processTurn','addBuff','blt','Game_Battler_addDebuff','_battler','addDebuff','DmgAddition','isActor','_customModified','drawItemStatusBoostPoints','initMembers','createChildSprites','jGAXx','Game_Party_removeActor','Mechanics','regenerateAll','clear','Game_Party_addActor','parse','BoostPointsRegenRate','battleLayoutStyle','MHXXo','TbDdN','commandUnboost','CFMha','removeBattleStates','addGuardCommand','AnalyzeMultiply','Game_Battler_regenerateAll','playOkSound','boostCommandName','createInnerSprite','applyBoostPointTurns','parameters','actorId','itemRect','call','ARRAYNUM','84CrEnrn','description','convertBoostEscapeCharacters','setFrame','jkLTU','10661864VljJbU','BpEffect','BOOST_POINTS_DISPLAY_OFFSET_Y','BattleStatusOffsetY','gainStoredBoostPoints','GreaterEqual','convertBoostTurnEscape','_scene','Game_Battler_addBuff','BOOST_POINTS_DEATH_REMOVE','BOOST_POINTS_DEATH_REGEN','_boostAI','tdlcv','ocvDN','smooth','ceil','actor','RefreshHelpWindowInBattle','NAGbc','itemRectWithPadding','_actor','Repeat','Usable','SmoothIcons','_actorCommandWindow','meetstoUseBoostPointsRequirement','BattleStatusAutoPosition','lcJJI','trim','drawItemStatusBoostPointsDefault','KGqUY','Skill\x20','convertBoostUpEscape','Turn','loadSystem','Window_ActorCommand_addGuardCommand','VisuMZ_1_BattleCore','pTByv','BoostDamage','BOOST_POINTS_START_BATTLE','portrait','boostIconsheetBitmap','processTurn','_subject','XEtDT','unboostIcon','BoostTurns','NUM','clearBoostSubject','_stateTurns','ConvertParams','LessEqual','BattleManager_endAction','currentSymbol','AnalyzeAddition','MaxStored','Window_BattleStatus_drawItemStatus','BOOST_POINTS_DISPLAY_AUTO_POS','mgTKe','applyGuard','startActorCommandSelection','scale','name','xrZIS','SVfiV','iconHeight','refresh','pvXXk','BOOST_POINTS_ANIMATION_DELAY','BoostAction','return\x200','eDfCM','zRPYd','max','Analyze','unboostCommandName','nQMNg','BOOST_POINTS_REGEN_ALWAYS','filter','cursorPagedown','initialize','isBTB','setStoredBoostPoints','addChild','clamp','version','add','_toUseBoostPoints','enemy','STRUCT','convertBoostRepeatEscape','Scene_Battle_selectNextCommand','commandStyle','traitObjects','applyItemUserEffect','EmptyIcon','ARRAYFUNC','_bpTurnRate','processtoUseBoostPoints','JcwzE','EffectAddition','_boostIconSheet','MlBvr','900857pzdwAO','DeathRegen','drawItemStatus','members','floor','optDisplayTp','regenerateTp','calculateBPtoUse','BOOST_POINTS_DISPLAY_BATTLE_STATUS','OFotv','canUseBoostPoints','Window_Selectable_cursorPageup','addUnboostCommand','ShowFacesListStyle','split','activate','ShowUnboostCmd','border','PgUpDnShortcuts','IconSizeRate','iTmMc','convertBoostAnalyzeEscape','isSkill','show','isDead','StartBattle','canUndoBoostPoints','resize','IconSet','reset','UnboostCmd','hFCYd','setBoostSubject','setupBattleBoostPointsMultiplier','oScMB','createActorCommandWindow','convertBoostEffectEscape','85467ARogoE','Game_Battler_removeBattleStates','item','EeMfJ','boost','some','VisuMZ_0_CoreEngine','gIkXr','1704775KdFLzv','rUXrL'];_0x39a6=function(){return _0x169236;};return _0x39a6();}(function(_0x5ab670,_0x336579){const _0x58e9c6=_0x224f,_0x30cd9d=_0x5ab670();while(!![]){try{const _0x28304d=-parseInt(_0x58e9c6(0x350))/0x1+-parseInt(_0x58e9c6(0x27c))/0x2+parseInt(_0x58e9c6(0x1e8))/0x3*(parseInt(_0x58e9c6(0x2e4))/0x4)+-parseInt(_0x58e9c6(0x1f0))/0x5+parseInt(_0x58e9c6(0x244))/0x6+-parseInt(_0x58e9c6(0x280))/0x7+parseInt(_0x58e9c6(0x2e9))/0x8;if(_0x28304d===_0x336579)break;else _0x30cd9d['push'](_0x30cd9d['shift']());}catch(_0x2137ba){_0x30cd9d['push'](_0x30cd9d['shift']());}}}(_0x39a6,0x70afd));var label=_0x3ed9c8(0x32e),tier=tier||0x0,dependencies=[_0x3ed9c8(0x1ee),_0x3ed9c8(0x30d),_0x3ed9c8(0x2b4),_0x3ed9c8(0x2b6)],pluginData=$plugins[_0x3ed9c8(0x337)](function(_0x277ead){const _0x82d444=_0x3ed9c8;return _0x277ead[_0x82d444(0x246)]&&_0x277ead[_0x82d444(0x2e5)][_0x82d444(0x25c)]('['+label+']');})[0x0];VisuMZ[label][_0x3ed9c8(0x268)]=VisuMZ[label][_0x3ed9c8(0x268)]||{},VisuMZ[_0x3ed9c8(0x31b)]=function(_0x37a67c,_0x19559c){const _0x51c255=_0x3ed9c8;for(const _0x370a2b in _0x19559c){if(_0x370a2b[_0x51c255(0x1f2)](/(.*):(.*)/i)){if(_0x51c255(0x23f)!==_0x51c255(0x23f))_0x306e62=this[_0x51c255(0x2ab)]();else{const _0x280b49=String(RegExp['$1']),_0x58fe0a=String(RegExp['$2'])[_0x51c255(0x297)]()[_0x51c255(0x305)]();let _0x3cbac1,_0x5116cf,_0x2d7d0d;switch(_0x58fe0a){case _0x51c255(0x318):_0x3cbac1=_0x19559c[_0x370a2b]!==''?Number(_0x19559c[_0x370a2b]):0x0;break;case _0x51c255(0x2e3):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf['map'](_0x452376=>Number(_0x452376));break;case _0x51c255(0x21f):_0x3cbac1=_0x19559c[_0x370a2b]!==''?eval(_0x19559c[_0x370a2b]):null;break;case _0x51c255(0x2b5):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf[_0x51c255(0x209)](_0x10446f=>eval(_0x10446f));break;case'JSON':_0x3cbac1=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):'';break;case _0x51c255(0x24b):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf[_0x51c255(0x209)](_0x11a3e0=>JSON[_0x51c255(0x2d0)](_0x11a3e0));break;case _0x51c255(0x29b):_0x3cbac1=_0x19559c[_0x370a2b]!==''?new Function(JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b])):new Function(_0x51c255(0x32f));break;case _0x51c255(0x349):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf['map'](_0xe6debb=>new Function(JSON[_0x51c255(0x2d0)](_0xe6debb)));break;case _0x51c255(0x2a7):_0x3cbac1=_0x19559c[_0x370a2b]!==''?String(_0x19559c[_0x370a2b]):'';break;case _0x51c255(0x289):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf[_0x51c255(0x209)](_0x4f71ef=>String(_0x4f71ef));break;case _0x51c255(0x342):_0x2d7d0d=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):{},_0x3cbac1=VisuMZ[_0x51c255(0x31b)]({},_0x2d7d0d);break;case _0x51c255(0x255):_0x5116cf=_0x19559c[_0x370a2b]!==''?JSON[_0x51c255(0x2d0)](_0x19559c[_0x370a2b]):[],_0x3cbac1=_0x5116cf['map'](_0xc23819=>VisuMZ[_0x51c255(0x31b)]({},JSON['parse'](_0xc23819)));break;default:continue;}_0x37a67c[_0x280b49]=_0x3cbac1;}}}return _0x37a67c;},(_0xf7300e=>{const _0x4c12a6=_0x3ed9c8,_0x349f99=_0xf7300e[_0x4c12a6(0x327)];for(const _0x888c3b of dependencies){if('gYAEs'!==_0x4c12a6(0x307)){if(!Imported[_0x888c3b]){alert(_0x4c12a6(0x28f)[_0x4c12a6(0x2a6)](_0x349f99,_0x888c3b)),SceneManager[_0x4c12a6(0x21c)]();break;}}else _0x4eace4[_0x4c12a6(0x32e)][_0x4c12a6(0x225)][_0x4c12a6(0x2e2)](this,_0x44e4fa,_0x37665b,_0x473201),_0x4e1528[_0x4c12a6(0x290)](),_0x5a1b44[_0x4c12a6(0x290)]();}const _0x48d729=_0xf7300e[_0x4c12a6(0x2e5)];if(_0x48d729[_0x4c12a6(0x1f2)](/\[Version[ ](.*?)\]/i)){if(_0x4c12a6(0x219)===_0x4c12a6(0x364))this['setStoredBoostPoints'](0x0);else{const _0x26e7af=Number(RegExp['$1']);_0x26e7af!==VisuMZ[label][_0x4c12a6(0x33e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x349f99,_0x26e7af)),SceneManager[_0x4c12a6(0x21c)]());}}if(_0x48d729[_0x4c12a6(0x1f2)](/\[Tier[ ](\d+)\]/i)){if(_0x4c12a6(0x32c)===_0x4c12a6(0x265)){var _0x4760d1=_0x931b28(_0x33177a['$1']);this[_0x4c12a6(0x2ab)]()>=_0x4760d1&&(_0x2bb0e4=this['storedBoostPoints']());}else{const _0x396aa5=Number(RegExp['$1']);_0x396aa5<tier?(alert(_0x4c12a6(0x2b9)[_0x4c12a6(0x2a6)](_0x349f99,_0x396aa5,tier)),SceneManager['exit']()):tier=Math['max'](_0x396aa5,tier);}}VisuMZ[_0x4c12a6(0x31b)](VisuMZ[label][_0x4c12a6(0x268)],_0xf7300e[_0x4c12a6(0x2df)]);})(pluginData),VisuMZ['BoostAction']['RegExp']={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager['boostIcon']=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI']['BoostIcon'],ImageManager[_0x3ed9c8(0x316)]=VisuMZ['BoostAction']['Settings']['UI'][_0x3ed9c8(0x348)],ImageManager[_0x3ed9c8(0x281)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x300)],ImageManager[_0x3ed9c8(0x312)]=function(){const _0x46b9e9=_0x3ed9c8;if(!this['_boostIconSheet']){this[_0x46b9e9(0x34e)]=new Bitmap();const _0x109189=ImageManager[_0x46b9e9(0x30b)]('IconSet');_0x109189['addLoadListener'](this[_0x46b9e9(0x243)][_0x46b9e9(0x203)](this,_0x109189));}return this[_0x46b9e9(0x34e)];},ImageManager[_0x3ed9c8(0x243)]=function(_0x264555){const _0x265c86=_0x3ed9c8;this[_0x265c86(0x34e)][_0x265c86(0x1de)](_0x264555['width'],_0x264555[_0x265c86(0x2a8)]),this['_boostIconSheet'][_0x265c86(0x2c0)](_0x264555,0x0,0x0,_0x264555[_0x265c86(0x278)],_0x264555[_0x265c86(0x2a8)],0x0,0x0),this['_boostIconSheet'][_0x265c86(0x2f7)]=ImageManager[_0x265c86(0x281)],this[_0x265c86(0x34e)][_0x265c86(0x2c6)]=![];},TextManager[_0x3ed9c8(0x2dc)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x2ba)],TextManager[_0x3ed9c8(0x334)]=VisuMZ[_0x3ed9c8(0x32e)]['Settings']['UI'][_0x3ed9c8(0x1e1)],VisuMZ['BoostAction'][_0x3ed9c8(0x225)]=BattleManager['setup'],BattleManager[_0x3ed9c8(0x29d)]=function(_0x6ca1c4,_0x6bc998,_0x454471){const _0xf73c2e=_0x3ed9c8;VisuMZ[_0xf73c2e(0x32e)][_0xf73c2e(0x225)][_0xf73c2e(0x2e2)](this,_0x6ca1c4,_0x6bc998,_0x454471),$gameParty[_0xf73c2e(0x290)](),$gameTroop[_0xf73c2e(0x290)]();},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2be)]=BattleManager[_0x3ed9c8(0x313)],BattleManager[_0x3ed9c8(0x313)]=function(){const _0x5905d8=_0x3ed9c8;this[_0x5905d8(0x231)](),VisuMZ[_0x5905d8(0x32e)][_0x5905d8(0x2be)][_0x5905d8(0x2e2)](this);},BattleManager[_0x3ed9c8(0x231)]=function(){const _0x5ed832=_0x3ed9c8;var _0x4e5091=this[_0x5ed832(0x314)],_0x39b163=_0x4e5091[_0x5ed832(0x22a)]();!!_0x4e5091&&_0x4e5091['isEnemy']()&&!!_0x39b163&&_0x39b163[_0x5ed832(0x366)]()&&_0x4e5091[_0x5ed832(0x2ab)]()>0x0&&!_0x4e5091[_0x5ed832(0x238)]()&&_0x4e5091[_0x5ed832(0x34b)](_0x39b163[_0x5ed832(0x1ea)]());},BattleManager[_0x3ed9c8(0x251)]=function(){const _0x1d37f6=_0x3ed9c8;if(Imported['VisuMZ_2_BattleSystemBTB']&&this[_0x1d37f6(0x33a)]()){if(_0x1d37f6(0x329)!==_0x1d37f6(0x20c))return![];else _0x548815=_0x267267;}return!![];},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2a3)]=Game_Action['prototype'][_0x3ed9c8(0x29c)],Game_Action[_0x3ed9c8(0x24f)][_0x3ed9c8(0x29c)]=function(){const _0x1bf1a6=_0x3ed9c8;var _0x42b077=VisuMZ[_0x1bf1a6(0x32e)][_0x1bf1a6(0x2a3)][_0x1bf1a6(0x2e2)](this);_0x42b077=this['applyBoostPointRepeats'](_0x42b077);return Math[_0x1bf1a6(0x250)](_0x42b077);;},Game_Action[_0x3ed9c8(0x24f)]['applyBoostPointRepeats']=function(_0x2eb754){const _0x214505=_0x3ed9c8,_0x292c8b=VisuMZ[_0x214505(0x32e)][_0x214505(0x22d)];if(!!this[_0x214505(0x23a)]()&&this[_0x214505(0x1ea)]()[_0x214505(0x248)][_0x214505(0x1f2)](_0x292c8b[_0x214505(0x264)])){if('DydqN'==='DydqN'){var _0x40eb86=this[_0x214505(0x23a)]()['boostMultiplier'](_0x214505(0x2fe));_0x2eb754=Math[_0x214505(0x250)](_0x2eb754*_0x40eb86),_0x2eb754+=this[_0x214505(0x23a)]()[_0x214505(0x2a2)](_0x214505(0x2fe));}else this[_0x214505(0x288)][_0x214505(0x319)]();}return _0x2eb754;},VisuMZ['BoostAction'][_0x3ed9c8(0x27a)]=Game_Action['prototype'][_0x3ed9c8(0x324)],Game_Action[_0x3ed9c8(0x24f)]['applyGuard']=function(_0x463c57,_0x21089b){const _0x3d65e1=_0x3ed9c8;return _0x463c57=this[_0x3d65e1(0x230)](_0x463c57),VisuMZ[_0x3d65e1(0x32e)][_0x3d65e1(0x27a)][_0x3d65e1(0x2e2)](this,_0x463c57,_0x21089b);},Game_Action['prototype'][_0x3ed9c8(0x230)]=function(_0x407338){const _0x3fb6be=_0x3ed9c8,_0x28925c=VisuMZ[_0x3fb6be(0x32e)][_0x3fb6be(0x22d)];if(!!this[_0x3fb6be(0x23a)]()&&this['item']()['note']['match'](_0x28925c['BoostDamage'])){var _0x3582e6=this[_0x3fb6be(0x23a)]()['boostMultiplier'](_0x3fb6be(0x287));_0x407338=Math['round'](_0x407338*_0x3582e6),_0x407338+=this[_0x3fb6be(0x23a)]()[_0x3fb6be(0x2a2)](_0x3fb6be(0x287));}return _0x407338;},VisuMZ[_0x3ed9c8(0x32e)]['Game_Action_apply']=Game_Action[_0x3ed9c8(0x24f)]['apply'],Game_Action[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2a0)]=function(_0x52f43c){const _0x45a9d8=_0x3ed9c8;this['applyBoostPointTurns'](![]),VisuMZ[_0x45a9d8(0x32e)]['Game_Action_apply'][_0x45a9d8(0x2e2)](this,_0x52f43c),this[_0x45a9d8(0x2de)](!![]);},Game_Action['prototype'][_0x3ed9c8(0x2de)]=function(_0x2702ef){const _0x520239=_0x3ed9c8,_0x5cf181=VisuMZ[_0x520239(0x32e)][_0x520239(0x22d)];if(!!this['subject']()&&this['item']()[_0x520239(0x248)][_0x520239(0x1f2)](_0x5cf181['BoostTurns'])){var _0x2bbba0=this[_0x520239(0x23a)]()['boostMultiplier'](_0x520239(0x30a));$gameTemp['_bpTurnRate']=_0x2bbba0,$gameTemp['_bpTurnFlat']=this[_0x520239(0x23a)]()[_0x520239(0x2a2)](_0x520239(0x30a));}_0x2702ef&&($gameTemp[_0x520239(0x34a)]=undefined,$gameTemp[_0x520239(0x257)]=undefined);},VisuMZ[_0x3ed9c8(0x32e)]['__Game_Action_applyItemUserEffect']=Game_Action[_0x3ed9c8(0x24f)][_0x3ed9c8(0x347)],Game_Action[_0x3ed9c8(0x24f)]['applyItemUserEffect']=function(_0x3bab0c){const _0x209a03=_0x3ed9c8;VisuMZ[_0x209a03(0x32e)][_0x209a03(0x23e)]['call'](this,_0x3bab0c),this[_0x209a03(0x232)](_0x3bab0c);},Game_Action[_0x3ed9c8(0x24f)][_0x3ed9c8(0x232)]=function(_0x5b6874){const _0x5a29b8=_0x3ed9c8,_0x239949=VisuMZ[_0x5a29b8(0x32e)][_0x5a29b8(0x22d)];if(!!_0x5b6874&&this[_0x5a29b8(0x1ea)]()[_0x5a29b8(0x248)][_0x5a29b8(0x1f2)](_0x239949[_0x5a29b8(0x269)])){var _0x2c9008=parseInt(RegExp['$1']);this[_0x5a29b8(0x1ea)]()[_0x5a29b8(0x248)]['match'](_0x239949[_0x5a29b8(0x236)])&&(_0x2c9008=Math[_0x5a29b8(0x250)](this[_0x5a29b8(0x23a)]()[_0x5a29b8(0x26f)](_0x5a29b8(0x294))*_0x2c9008),_0x2c9008+=this[_0x5a29b8(0x23a)]()['boostAddition'](_0x5a29b8(0x294))),_0x5b6874[_0x5a29b8(0x2ed)](_0x2c9008);}if(!!this[_0x5a29b8(0x23a)]()&&this[_0x5a29b8(0x1ea)]()[_0x5a29b8(0x248)][_0x5a29b8(0x1f2)](_0x239949['UserBoostPoints'])){var _0x2c9008=parseInt(RegExp['$1']);if(this[_0x5a29b8(0x1ea)]()['note'][_0x5a29b8(0x1f2)](_0x239949['BoostGainPoints'])){if(_0x5a29b8(0x315)!==_0x5a29b8(0x234))_0x2c9008=Math[_0x5a29b8(0x250)](this['subject']()['boostMultiplier'](_0x5a29b8(0x294))*_0x2c9008),_0x2c9008+=this['subject']()[_0x5a29b8(0x2a2)]('BP\x20Effect');else return!![];}this['subject']()[_0x5a29b8(0x2ed)](_0x2c9008);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x320)],Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x2ff)],Game_BattlerBase[_0x3ed9c8(0x2f3)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x351)],Game_BattlerBase[_0x3ed9c8(0x2f2)]=VisuMZ[_0x3ed9c8(0x32e)]['Settings'][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x28a)],Game_BattlerBase['BOOST_POINTS_REGEN_ALWAYS']=VisuMZ[_0x3ed9c8(0x32e)]['Settings'][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x261)],Game_BattlerBase[_0x3ed9c8(0x283)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x1fb)],Game_BattlerBase[_0x3ed9c8(0x310)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x1dc)],VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x210)]=Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x339)],Game_BattlerBase[_0x3ed9c8(0x24f)]['initialize']=function(){const _0x1a51b7=_0x3ed9c8;VisuMZ[_0x1a51b7(0x32e)][_0x1a51b7(0x210)]['call'](this),this['initBoostAction']();},Game_BattlerBase[_0x3ed9c8(0x24f)]['initBoostAction']=function(){const _0x3a633b=_0x3ed9c8;this['_storedBoostPoints']=this[_0x3a633b(0x2b7)]||0x0,this[_0x3a633b(0x340)]=this[_0x3a633b(0x340)]||0x0,this[_0x3a633b(0x21b)]=this[_0x3a633b(0x21b)]||0x0;},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2ab)]=function(){const _0x4c3ca5=_0x3ed9c8;return this[_0x4c3ca5(0x2b7)]===undefined&&this[_0x4c3ca5(0x21e)](),this[_0x4c3ca5(0x2b7)];},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x33b)]=function(_0x263184){const _0x3e84ef=_0x3ed9c8;this[_0x3e84ef(0x2b7)]===undefined&&this['initBoostAction'](),_0x263184=Math['round'](_0x263184),this[_0x3e84ef(0x2b7)]=_0x263184[_0x3e84ef(0x33d)](0x0,Game_BattlerBase[_0x3e84ef(0x242)]),this[_0x3e84ef(0x32b)]();},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x254)]=function(){const _0x41ce67=_0x3ed9c8;return this['_toUseBoostPoints']===undefined&&this['initBoostAction'](),this[_0x41ce67(0x340)];},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x282)]=function(_0x2d64f2){const _0x583993=_0x3ed9c8;this[_0x583993(0x340)]===undefined&&('mGuWz'===_0x583993(0x213)?this[_0x583993(0x21e)]():this[_0x583993(0x339)](...arguments)),_0x2d64f2=Math[_0x583993(0x250)](_0x2d64f2),this[_0x583993(0x340)]=_0x2d64f2['clamp'](0x0,Game_BattlerBase[_0x583993(0x22c)]),this[_0x583993(0x32b)]();},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x20e)]=function(){const _0x33af99=_0x3ed9c8;if(!Game_BattlerBase[_0x33af99(0x2f3)]&&(this[_0x33af99(0x368)]()||this[_0x33af99(0x228)]()))return 0x0;else{var _0x369fb3=Game_BattlerBase[_0x33af99(0x283)];return _0x369fb3=this[_0x33af99(0x28d)](_0x369fb3),_0x369fb3=this[_0x33af99(0x224)](_0x369fb3),_0x369fb3;}},Game_BattlerBase['prototype']['isBoostSealed']=function(){const _0x5a6808=_0x3ed9c8,_0x5c0cfb=this[_0x5a6808(0x346)](),_0x18b44a=VisuMZ[_0x5a6808(0x32e)][_0x5a6808(0x22d)];return _0x5c0cfb[_0x5a6808(0x1ed)](_0x5cb546=>_0x5cb546&&_0x5cb546[_0x5a6808(0x248)][_0x5a6808(0x1f2)](_0x18b44a[_0x5a6808(0x26a)]));},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2b1)]=Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2ac)],Game_BattlerBase[_0x3ed9c8(0x24f)]['resetStateCounts']=function(_0x1ab68e){const _0x4bdf9d=_0x3ed9c8;var _0xa963b2=this['_stateTurns'][_0x1ab68e]||0x0;VisuMZ[_0x4bdf9d(0x32e)][_0x4bdf9d(0x2b1)][_0x4bdf9d(0x2e2)](this,_0x1ab68e);if(!!$gameTemp[_0x4bdf9d(0x34a)]){$gameTemp[_0x4bdf9d(0x257)]=$gameTemp[_0x4bdf9d(0x257)]||0x0;var _0x3a97dc=$dataStates[_0x1ab68e],_0x2454d5=Math['round'](_0x3a97dc['maxTurns']*$gameTemp[_0x4bdf9d(0x34a)])+$gameTemp[_0x4bdf9d(0x257)],_0x459f9f=Math[_0x4bdf9d(0x250)](_0x3a97dc[_0x4bdf9d(0x220)]*$gameTemp[_0x4bdf9d(0x34a)])+$gameTemp[_0x4bdf9d(0x257)],_0x4669b6=0x1+Math['max'](_0x2454d5-_0x459f9f,0x0);const _0x3e7396=this['getStateReapplyRulings'](_0x3a97dc)[_0x4bdf9d(0x275)]()[_0x4bdf9d(0x305)]();switch(_0x3e7396){case _0x4bdf9d(0x1e0):this[_0x4bdf9d(0x31a)][_0x1ab68e]=_0x459f9f+Math[_0x4bdf9d(0x21d)](_0x4669b6);break;case _0x4bdf9d(0x24d):const _0x2990ea=this['_stateTurns'][_0x1ab68e],_0x5a7b14=_0x459f9f+Math[_0x4bdf9d(0x21d)](_0x4669b6);this[_0x4bdf9d(0x31a)][_0x1ab68e]=Math[_0x4bdf9d(0x332)](_0x2990ea,_0x5a7b14);break;case _0x4bdf9d(0x33f):this['_stateTurns'][_0x1ab68e]=_0x459f9f+Math[_0x4bdf9d(0x21d)](_0x4669b6)+_0xa963b2;break;}}},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x229)]=Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x20d)],Game_BattlerBase['prototype']['meetsUsableItemConditions']=function(_0x5281a6){const _0xe4befa=_0x3ed9c8;return VisuMZ[_0xe4befa(0x32e)][_0xe4befa(0x229)]['call'](this,_0x5281a6)?this[_0xe4befa(0x302)](_0x5281a6):![];},Game_BattlerBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x302)]=function(_0x41b5e5){const _0x2ff3a4=_0x3ed9c8,_0x4e204d=VisuMZ[_0x2ff3a4(0x32e)]['RegExp'];var _0x258030=_0x41b5e5[_0x2ff3a4(0x248)];if(_0x258030[_0x2ff3a4(0x1f2)](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x2bc)])||_0x258030[_0x2ff3a4(0x1f2)](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x2ee)])){var _0xd2f439=parseInt(RegExp['$1']);return this['isActor']()?this[_0x2ff3a4(0x254)]()>=_0xd2f439:this['storedBoostPoints']()>=_0xd2f439;}else{if(_0x41b5e5[_0x2ff3a4(0x248)]['match'](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x2ee)])){var _0xd2f439=parseInt(RegExp['$1']);return this[_0x2ff3a4(0x2c5)]()?this[_0x2ff3a4(0x254)]()>_0xd2f439:this[_0x2ff3a4(0x2ab)]()>_0xd2f439;}else{if(_0x41b5e5[_0x2ff3a4(0x248)][_0x2ff3a4(0x1f2)](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x211)])){if(_0x2ff3a4(0x233)!==_0x2ff3a4(0x233)){var _0xecdfd6=_0x3f601f(_0x4a1869['$1']);this[_0x2ff3a4(0x1ea)]()[_0x2ff3a4(0x248)][_0x2ff3a4(0x1f2)](_0x20793a[_0x2ff3a4(0x236)])&&(_0xecdfd6=_0x205dc7[_0x2ff3a4(0x250)](this[_0x2ff3a4(0x23a)]()[_0x2ff3a4(0x26f)](_0x2ff3a4(0x294))*_0xecdfd6),_0xecdfd6+=this[_0x2ff3a4(0x23a)]()[_0x2ff3a4(0x2a2)]('BP\x20Effect')),this[_0x2ff3a4(0x23a)]()['gainStoredBoostPoints'](_0xecdfd6);}else{var _0xd2f439=parseInt(RegExp['$1']);return this[_0x2ff3a4(0x2c5)]()?_0x2ff3a4(0x1f5)!=='nBxEk'?this[_0x2ff3a4(0x254)]()===_0xd2f439:this[_0x2ff3a4(0x254)]()<_0x3c1324:this[_0x2ff3a4(0x2ab)]()===_0xd2f439;}}else{if(_0x41b5e5['note'][_0x2ff3a4(0x1f2)](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x298)])){if(_0x2ff3a4(0x28e)!==_0x2ff3a4(0x28e)){var _0x1ce495=_0x370efd[_0x2ff3a4(0x310)];_0x1ce495=this[_0x2ff3a4(0x1e4)](_0x1ce495),_0x1ce495=this[_0x2ff3a4(0x270)](_0x1ce495),_0x1ce495=_0x468b7c['round'](_0x1ce495),this[_0x2ff3a4(0x33b)](_0x1ce495);}else{var _0xd2f439=parseInt(RegExp['$1']);return this['isActor']()?this[_0x2ff3a4(0x254)]()<_0xd2f439:this[_0x2ff3a4(0x2ab)]()<_0xd2f439;}}else{if(_0x41b5e5[_0x2ff3a4(0x248)]['match'](_0x4e204d[_0x2ff3a4(0x27e)][_0x2ff3a4(0x31c)])){var _0xd2f439=parseInt(RegExp['$1']);return this['isActor']()?this[_0x2ff3a4(0x254)]()<=_0xd2f439:this['storedBoostPoints']()<=_0xd2f439;}else return!![];}}}}},Game_Battler[_0x3ed9c8(0x25b)]={'Damage':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x1f8)],'Turn':VisuMZ[_0x3ed9c8(0x32e)]['Settings'][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x29e)],'Repeat':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)]['RepeatMultiply'],'BpEffect':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['Mechanics'][_0x3ed9c8(0x23d)],'Analyze':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x2d9)]},Game_Battler['BOOST_POINTS_ADDITION']={'Damage':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x2c4)],'Turn':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)]['TurnAddition'],'Repeat':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x247)],'BpEffect':VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x34d)],'Analyze':VisuMZ['BoostAction'][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)][_0x3ed9c8(0x31f)]},Game_Battler[_0x3ed9c8(0x249)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['Mechanics']['Animations'],Game_Battler[_0x3ed9c8(0x24f)]['gainStoredBoostPoints']=function(_0x768ebf){const _0x40c2bb=_0x3ed9c8;this[_0x40c2bb(0x33b)](this[_0x40c2bb(0x2ab)]()+_0x768ebf);},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x271)]=function(_0xdeb708){const _0x8c7bbd=_0x3ed9c8;this[_0x8c7bbd(0x282)](this[_0x8c7bbd(0x254)]()+_0xdeb708);},Game_Battler['prototype']['boostMultiplier']=function(_0x32f5a9){const _0x405044=_0x3ed9c8,_0x583725=Game_Battler[_0x405044(0x25b)];if(_0x32f5a9['match'](/Damage/i)){if(_0x405044(0x34c)===_0x405044(0x34c))var _0x502813=_0x583725['Damage'];else{var _0x1eef8d=this['isDead']();_0x203c78['BoostAction'][_0x405044(0x267)][_0x405044(0x2e2)](this,_0x1c2dc7),_0x198e2a['BOOST_POINTS_DEATH_REMOVE']&&!_0x1eef8d&&this[_0x405044(0x368)]()&&this['setStoredBoostPoints'](0x0);}}else{if(_0x32f5a9[_0x405044(0x1f2)](/Turn/i)){if(_0x405044(0x304)===_0x405044(0x239))return this[_0x405044(0x2ab)]()===_0x1262ec;else var _0x502813=_0x583725[_0x405044(0x30a)];}else{if(_0x32f5a9[_0x405044(0x1f2)](/Repeat/i)){if(_0x405044(0x359)===_0x405044(0x359))var _0x502813=_0x583725[_0x405044(0x2fe)];else var _0x9ef8f4=_0x1abd14['Analyze'];}else{if(_0x32f5a9[_0x405044(0x1f2)](/BP Effect/i))var _0x502813=_0x583725[_0x405044(0x2ea)];else{if(_0x32f5a9[_0x405044(0x1f2)](/Analyze/i))var _0x502813=_0x583725[_0x405044(0x333)];else return this[_0x405044(0x254)]();}}}}var _0x2fef32=this[_0x405044(0x254)]();return _0x502813[_0x2fef32]||_0x502813[0x0];},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2a2)]=function(_0x445d49){const _0x362489=_0x3ed9c8,_0xe90466=Game_Battler[_0x362489(0x285)];if(_0x445d49[_0x362489(0x1f2)](/Damage/i))var _0x28493e=_0xe90466[_0x362489(0x287)];else{if(_0x445d49['match'](/Turn/i)){if('jTPdl'===_0x362489(0x206))var _0x28493e=_0xe90466[_0x362489(0x30a)];else return this[_0x362489(0x2ab)]()>_0x5868bc;}else{if(_0x445d49[_0x362489(0x1f2)](/Repeat/i))var _0x28493e=_0xe90466[_0x362489(0x2fe)];else{if(_0x445d49[_0x362489(0x1f2)](/BP Effect/i))var _0x28493e=_0xe90466['BpEffect'];else{if(_0x445d49[_0x362489(0x1f2)](/Analyze/i)){if(_0x362489(0x1ef)===_0x362489(0x1ef))var _0x28493e=_0xe90466[_0x362489(0x333)];else _0x2b36ae=_0x232ad3[_0x362489(0x250)](this[_0x362489(0x23a)]()[_0x362489(0x26f)](_0x362489(0x294))*_0x1af86f),_0x1f6f4d+=this[_0x362489(0x23a)]()[_0x362489(0x2a2)](_0x362489(0x294));}else{if(_0x362489(0x328)!==_0x362489(0x331))return this[_0x362489(0x254)]();else _0xf2426e[_0x362489(0x32e)]['Game_Party_addActor'][_0x362489(0x2e2)](this,_0xdcfd86),_0x1f8db8(_0x3ba50c[_0x362489(0x32e)][_0x362489(0x2fa)][_0x362489(0x203)](this),0x32);}}}}}var _0x1904a3=this['toUseBoostPoints']();return parseInt(_0x28493e[_0x1904a3]||_0x28493e[0x0]);},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x290)]=function(){const _0x5837bf=_0x3ed9c8;var _0x3b5d7c=Game_BattlerBase[_0x5837bf(0x310)];_0x3b5d7c=this[_0x5837bf(0x1e4)](_0x3b5d7c),_0x3b5d7c=this[_0x5837bf(0x270)](_0x3b5d7c),_0x3b5d7c=Math[_0x5837bf(0x250)](_0x3b5d7c),this[_0x5837bf(0x33b)](_0x3b5d7c);},Game_Battler[_0x3ed9c8(0x24f)]['setupBattleBoostPointsMultiplier']=function(_0x547fdb){const _0x4496a9=_0x3ed9c8,_0x57e67a=this[_0x4496a9(0x346)](),_0x22266e=VisuMZ['BoostAction'][_0x4496a9(0x22d)];for(const _0x2d34b8 of _0x57e67a){if(_0x4496a9(0x26e)===_0x4496a9(0x26e)){if(!_0x2d34b8)continue;if(_0x2d34b8[_0x4496a9(0x248)][_0x4496a9(0x1f2)](_0x22266e['BoostBattleStartRate'])){if('CFMha'===_0x4496a9(0x2d6))_0x547fdb*=Number(RegExp['$1'])*0.01;else{var _0x54d105=_0x31f55e['BoostAction'][_0x4496a9(0x2a3)][_0x4496a9(0x2e2)](this);_0x54d105=this['applyBoostPointRepeats'](_0x54d105);return _0x5c9bd1[_0x4496a9(0x250)](_0x54d105);;}}}else this[_0x4496a9(0x1f9)]=_0x50aec2['boostIcon'];}return _0x547fdb;},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x270)]=function(_0x14204b){const _0x1e5866=_0x3ed9c8,_0x41544c=this['traitObjects'](),_0x2b7ae3=VisuMZ[_0x1e5866(0x32e)][_0x1e5866(0x22d)];for(const _0x56a5ba of _0x41544c){if(!_0x56a5ba)continue;if(_0x56a5ba['note'][_0x1e5866(0x1f2)](_0x2b7ae3[_0x1e5866(0x1fd)])){if('GeTkK'!=='PHUSE')_0x14204b+=Number(RegExp['$1']);else{var _0x38b155=_0x4554a0[_0x1e5866(0x283)];return _0x38b155=this[_0x1e5866(0x28d)](_0x38b155),_0x38b155=this[_0x1e5866(0x224)](_0x38b155),_0x38b155;}}}return _0x14204b;},Game_Battler[_0x3ed9c8(0x24f)]['startChangeBoostPointsAnimation']=function(){const _0x2b3c81=_0x3ed9c8;var _0x224bc0=this[_0x2b3c81(0x254)]()['clamp'](0x0,Game_BattlerBase[_0x2b3c81(0x22c)]);const _0x192468=Game_Battler[_0x2b3c81(0x249)];var _0x14500a=Number(_0x192468[_0x224bc0]||_0x192468[0x0]);_0x14500a>0x0&&$gameTemp[_0x2b3c81(0x23c)]([this],_0x14500a,![],![]);},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x35a)]=function(){const _0x354c6f=_0x3ed9c8;if(this[_0x354c6f(0x238)]()){if(_0x354c6f(0x207)!==_0x354c6f(0x20a))return![];else _0xad133f[_0x354c6f(0x257)]=_0x3d9524[_0x354c6f(0x257)]||0x0,_0x449332=_0x4e1016[_0x354c6f(0x250)](_0xa46e4[_0x354c6f(0x34a)]*_0x2b6f72)+_0x95b48[_0x354c6f(0x257)];}return this[_0x354c6f(0x254)]()<Game_BattlerBase[_0x354c6f(0x22c)]&&this['storedBoostPoints']()>0x0;},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x1dd)]=function(){const _0x12f87c=_0x3ed9c8;return this[_0x12f87c(0x254)]()>0x0;},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x1e9)]=Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2d7)],Game_Battler[_0x3ed9c8(0x24f)]['removeBattleStates']=function(){const _0x327630=_0x3ed9c8;VisuMZ[_0x327630(0x32e)][_0x327630(0x1e9)]['call'](this),this['_storedBoostPoints']=0x0,this[_0x327630(0x340)]=0x0;},VisuMZ['BoostAction'][_0x3ed9c8(0x200)]=Game_Battler['prototype']['regenerateTp'],Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x356)]=function(){const _0xdd995=_0x3ed9c8;VisuMZ[_0xdd995(0x32e)][_0xdd995(0x200)][_0xdd995(0x2e2)](this),this[_0xdd995(0x25d)]();},VisuMZ['BoostAction'][_0x3ed9c8(0x2da)]=Game_Battler['prototype'][_0x3ed9c8(0x2cd)],Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2cd)]=function(){const _0x271de8=_0x3ed9c8;VisuMZ[_0x271de8(0x32e)][_0x271de8(0x2da)][_0x271de8(0x2e2)](this),Game_BattlerBase[_0x271de8(0x2f3)]&&this[_0x271de8(0x368)]()&&this[_0x271de8(0x25d)]();},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x25d)]=function(){const _0x416de0=_0x3ed9c8;(Game_BattlerBase[_0x416de0(0x336)]||this['_turnUsedBoostPoints']<=0x0)&&(_0x416de0(0x295)!==_0x416de0(0x295)?this[_0x416de0(0x21e)]():this[_0x416de0(0x2ed)](this[_0x416de0(0x20e)]())),this['_turnUsedBoostPoints']=0x0;},VisuMZ['BoostAction'][_0x3ed9c8(0x31d)]=BattleManager[_0x3ed9c8(0x27d)],BattleManager[_0x3ed9c8(0x27d)]=function(){const _0x17e4b4=_0x3ed9c8;if(this[_0x17e4b4(0x314)]){if(_0x17e4b4(0x2d3)==='MHXXo')this[_0x17e4b4(0x314)][_0x17e4b4(0x27f)]();else return![];}VisuMZ[_0x17e4b4(0x32e)]['BattleManager_endAction'][_0x17e4b4(0x2e2)](this);},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x27f)]=function(){const _0x452c67=_0x3ed9c8;this[_0x452c67(0x21b)]+=this[_0x452c67(0x254)](),this[_0x452c67(0x282)](0x0);},Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x28d)]=function(_0xeb3e70){const _0x438ac7=_0x3ed9c8,_0x19a168=this['traitObjects'](),_0x25a313=VisuMZ[_0x438ac7(0x32e)]['RegExp'];for(const _0x3c3388 of _0x19a168){if(!_0x3c3388)continue;if(_0x3c3388[_0x438ac7(0x248)][_0x438ac7(0x1f2)](_0x25a313[_0x438ac7(0x2d1)])){if(_0x438ac7(0x2fb)!==_0x438ac7(0x26d))_0xeb3e70*=Number(RegExp['$1'])*0.01;else return'';}}return _0xeb3e70;},Game_Battler['prototype'][_0x3ed9c8(0x224)]=function(_0x2fd5c8){const _0x88df2a=_0x3ed9c8,_0x8aa02a=this[_0x88df2a(0x346)](),_0x2ab186=VisuMZ[_0x88df2a(0x32e)]['RegExp'];for(const _0x784b7b of _0x8aa02a){if(!_0x784b7b)continue;_0x784b7b[_0x88df2a(0x248)][_0x88df2a(0x1f2)](_0x2ab186['BoostPointsRegenFlat'])&&(_0x88df2a(0x216)!==_0x88df2a(0x2d4)?_0x2fd5c8+=Number(RegExp['$1']):this[_0x88df2a(0x21e)]());}return _0x2fd5c8;},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x267)]=Game_Battler[_0x3ed9c8(0x24f)]['addState'],Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2a9)]=function(_0x3ef34d){const _0x4f0fa0=_0x3ed9c8;var _0x4f0957=this[_0x4f0fa0(0x368)]();VisuMZ[_0x4f0fa0(0x32e)][_0x4f0fa0(0x267)]['call'](this,_0x3ef34d);if(Game_BattlerBase[_0x4f0fa0(0x2f2)]&&!_0x4f0957&&this['isDead']()){if('VcRXo'!==_0x4f0fa0(0x277))this[_0x4f0fa0(0x33b)](0x0);else{const _0x293d30=_0x581107[_0x4f0fa0(0x32e)]['RegExp'];if(!!this[_0x4f0fa0(0x23a)]()&&this[_0x4f0fa0(0x1ea)]()['note'][_0x4f0fa0(0x1f2)](_0x293d30[_0x4f0fa0(0x30f)])){var _0x1d75db=this['subject']()[_0x4f0fa0(0x26f)](_0x4f0fa0(0x287));_0x4c4223=_0x4d97e7[_0x4f0fa0(0x250)](_0x17d8e2*_0x1d75db),_0x5196fc+=this[_0x4f0fa0(0x23a)]()[_0x4f0fa0(0x2a2)](_0x4f0fa0(0x287));}return _0x7127b7;}}},VisuMZ['BoostAction'][_0x3ed9c8(0x2f1)]=Game_Battler[_0x3ed9c8(0x24f)]['addBuff'],Game_Battler['prototype'][_0x3ed9c8(0x2bf)]=function(_0x3505af,_0x213d23){const _0x2c9542=_0x3ed9c8;!!$gameTemp['_bpTurnRate']&&($gameTemp[_0x2c9542(0x257)]=$gameTemp['_bpTurnFlat']||0x0,_0x213d23=Math[_0x2c9542(0x250)]($gameTemp['_bpTurnRate']*_0x213d23)+$gameTemp[_0x2c9542(0x257)]),VisuMZ[_0x2c9542(0x32e)][_0x2c9542(0x2f1)]['call'](this,_0x3505af,_0x213d23);},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2c1)]=Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2c3)],Game_Battler[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2c3)]=function(_0x5b2dbb,_0xed0724){const _0x1f26f2=_0x3ed9c8;if(!!$gameTemp[_0x1f26f2(0x34a)]){if(_0x1f26f2(0x26b)===_0x1f26f2(0x222))return this['convertBoostRepeatEscape'](_0x4ce6be(arguments[0x1]));else $gameTemp['_bpTurnFlat']=$gameTemp[_0x1f26f2(0x257)]||0x0,_0xed0724=Math[_0x1f26f2(0x250)]($gameTemp[_0x1f26f2(0x34a)]*_0xed0724)+$gameTemp[_0x1f26f2(0x257)];}VisuMZ[_0x1f26f2(0x32e)][_0x1f26f2(0x2c1)]['call'](this,_0x5b2dbb,_0xed0724);},Game_Enemy[_0x3ed9c8(0x32d)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)][_0x3ed9c8(0x2cc)]['AnimationDelay'],VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x25f)]=Game_Enemy[_0x3ed9c8(0x24f)][_0x3ed9c8(0x29d)],Game_Enemy[_0x3ed9c8(0x24f)][_0x3ed9c8(0x29d)]=function(_0x3e280f,_0x42c4b8,_0x2d42d5){const _0x1f2282=_0x3ed9c8;VisuMZ[_0x1f2282(0x32e)][_0x1f2282(0x25f)][_0x1f2282(0x2e2)](this,_0x3e280f,_0x42c4b8,_0x2d42d5),this[_0x1f2282(0x208)]();},Game_Enemy['prototype'][_0x3ed9c8(0x208)]=function(){const _0x1c5605=_0x3ed9c8,_0x21cc83=VisuMZ[_0x1c5605(0x32e)][_0x1c5605(0x22d)];if(this[_0x1c5605(0x341)]()[_0x1c5605(0x2f4)]===undefined){this[_0x1c5605(0x341)]()[_0x1c5605(0x2f4)]={};var _0x1103b4=this[_0x1c5605(0x341)]()['note'][_0x1c5605(0x35e)](/[\r\n]+/);for(var _0x51876a=0x0;_0x51876a<_0x1103b4['length'];_0x51876a++){var _0x3675f8=_0x1103b4[_0x51876a];if(_0x3675f8[_0x1c5605(0x1f2)](_0x21cc83['EnemyBoostSkillID'])){var _0x354743=_0x1c5605(0x308)+parseInt(RegExp['$1']),_0x311433=String(RegExp['$2'])[_0x1c5605(0x275)]();this[_0x1c5605(0x341)]()[_0x1c5605(0x2f4)][_0x354743]=_0x311433;}else{if(_0x3675f8['match'](_0x21cc83['EnemyBoostSkillName'])){var _0x541476=String(RegExp['$1']),_0x311433=String(RegExp['$2'])[_0x1c5605(0x275)]();this[_0x1c5605(0x341)]()[_0x1c5605(0x2f4)][_0x541476]=_0x311433;}}}}},Game_Enemy[_0x3ed9c8(0x24f)]['processtoUseBoostPoints']=function(_0x108f58){const _0x275932=_0x3ed9c8;this[_0x275932(0x208)]();var _0x20f90e=this[_0x275932(0x357)](_0x108f58);if(_0x20f90e>0x0){if(_0x275932(0x227)!==_0x275932(0x34f))this['processEnemyBPUsage'](_0x20f90e),this[_0x275932(0x279)]();else{if(!!this['_bpSubject']){var _0x48ffb6=this[_0x275932(0x21a)][_0x275932(0x26f)](_0x275932(0x294));_0x3d214c=_0x5e893c[_0x275932(0x250)](_0x198638*_0x48ffb6),_0x5c1c5b+=this[_0x275932(0x21a)][_0x275932(0x2a2)](_0x275932(0x294));}return _0x2f29bf;}}},Game_Enemy[_0x3ed9c8(0x24f)]['calculateBPtoUse']=function(_0x4aa6b1){const _0x460a17=_0x3ed9c8;if(this[_0x460a17(0x2ab)]()<=0x0)return 0x0;var _0xbda3db=_0x4aa6b1[_0x460a17(0x327)],_0xa4a9cb=_0x460a17(0x308)+_0x4aa6b1['id'],_0x550d24=0x0;if(this['enemy']()[_0x460a17(0x2f4)][_0xbda3db]||this[_0x460a17(0x341)]()[_0x460a17(0x2f4)][_0xa4a9cb]){if('QpJbT'!=='dvdWe'){var _0x3385b2=this[_0x460a17(0x341)]()[_0x460a17(0x2f4)][_0xbda3db]||this['enemy']()[_0x460a17(0x2f4)][_0xa4a9cb];if(_0x3385b2[_0x460a17(0x1f2)](/(?:ALL|FULL)/i)){if('kODoc'===_0x460a17(0x2ca))var _0x1f4c46=_0x11c679[_0x460a17(0x2fe)];else _0x550d24=this['storedBoostPoints']();}else{if(_0x3385b2['match'](/AT LEAST (\d+)/i)){var _0x399b41=parseInt(RegExp['$1']);this[_0x460a17(0x2ab)]()>=_0x399b41&&(_0x550d24=this[_0x460a17(0x2ab)]());}else{if(_0x3385b2[_0x460a17(0x1f2)](/AT MOST (\d+)/i)){if(_0x460a17(0x20b)==='hgbwY'){var _0x399b41=parseInt(RegExp['$1']);this[_0x460a17(0x2ab)]()<=_0x399b41&&(_0x550d24=this[_0x460a17(0x2ab)]());}else return this[_0x460a17(0x343)](_0x2485f8(arguments[0x1]));}else{if(_0x3385b2['match'](/EXACTLY (\d+)/i)){var _0x399b41=parseInt(RegExp['$1']);this[_0x460a17(0x2ab)]()===_0x399b41&&(_0x550d24=_0x399b41);}}}}}else this['_actorCommandWindow']['activate']();}return _0x550d24['clamp'](0x0,Game_BattlerBase[_0x460a17(0x22c)]);},Game_Enemy['prototype'][_0x3ed9c8(0x2b8)]=function(_0x5ecbbe){const _0x216dfc=_0x3ed9c8;_0x5ecbbe=_0x5ecbbe['clamp'](0x0,this[_0x216dfc(0x2ab)]()),_0x5ecbbe=_0x5ecbbe[_0x216dfc(0x33d)](0x0,Game_BattlerBase[_0x216dfc(0x22c)]),this[_0x216dfc(0x2ed)](-_0x5ecbbe),this['gainToUseBoostPoints'](_0x5ecbbe);},Game_Enemy['prototype'][_0x3ed9c8(0x279)]=function(){const _0x536b3c=_0x3ed9c8;var _0xce0e19=0x0,_0x174c18=this[_0x536b3c(0x254)]()[_0x536b3c(0x33d)](0x0,Game_BattlerBase[_0x536b3c(0x22c)]);const _0x6f2ac5=Game_Battler[_0x536b3c(0x249)],_0x4a47f0=Game_Enemy[_0x536b3c(0x32d)],_0x44b6ec=0x3e8/0x3c;for(var _0x5c5f30=0x1;_0x5c5f30<=_0x174c18;_0x5c5f30++){var _0x1f4263=_0x6f2ac5[_0x5c5f30]||_0x6f2ac5[0x0];if(_0x1f4263>0x0){let _0x353525=_0x4a47f0*(_0x5c5f30-0x1);setTimeout($gameTemp[_0x536b3c(0x23c)][_0x536b3c(0x203)]($gameTemp,[this],_0x1f4263,![],![]),_0x353525);}_0xce0e19+=_0x4a47f0/_0x44b6ec;}_0xce0e19=Math[_0x536b3c(0x2f8)](_0xce0e19),SceneManager[_0x536b3c(0x2f0)][_0x536b3c(0x2ae)]['_waitCount']=_0xce0e19;},Game_Unit[_0x3ed9c8(0x24f)]['setupBattleBoostPoints']=function(){const _0x197920=_0x3ed9c8;var _0x2ff167=this[_0x197920(0x260)];this['_inBattle']=![];for(const _0x19e581 of this[_0x197920(0x353)]()){if('YYjnt'!==_0x197920(0x23b)){if(!_0x19e581)continue;_0x19e581[_0x197920(0x290)]();}else{var _0x714be8=_0x6630c8[_0x1d1ae6]||_0x51e3b3[0x0];if(_0x714be8>0x0){let _0x33a59a=_0x3b7ea9*(_0x45dfd1-0x1);_0x332eed(_0x26fffb['requestFauxAnimation'][_0x197920(0x203)](_0x213866,[this],_0x714be8,![],![]),_0x33a59a);}_0x4f3272+=_0x5ccf67/_0x51d7ed;}}this[_0x197920(0x260)]=_0x2ff167;},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2cf)]=Game_Party[_0x3ed9c8(0x24f)][_0x3ed9c8(0x286)],Game_Party[_0x3ed9c8(0x24f)]['addActor']=function(_0x6a5bd0){const _0x26aceb=_0x3ed9c8;VisuMZ[_0x26aceb(0x32e)][_0x26aceb(0x2cf)][_0x26aceb(0x2e2)](this,_0x6a5bd0),setTimeout(VisuMZ[_0x26aceb(0x32e)][_0x26aceb(0x2fa)]['bind'](this),0x32);},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2cb)]=Game_Party[_0x3ed9c8(0x24f)][_0x3ed9c8(0x276)],Game_Party['prototype'][_0x3ed9c8(0x276)]=function(_0x32fb79){const _0x4139e9=_0x3ed9c8;VisuMZ[_0x4139e9(0x32e)][_0x4139e9(0x2cb)][_0x4139e9(0x2e2)](this,_0x32fb79),setTimeout(VisuMZ[_0x4139e9(0x32e)]['RefreshHelpWindowInBattle']['bind'](this),0x32);},VisuMZ[_0x3ed9c8(0x32e)]['Game_Party_partyChangeRefresh']=Game_Party['prototype'][_0x3ed9c8(0x22b)],Game_Party[_0x3ed9c8(0x24f)][_0x3ed9c8(0x22b)]=function(){const _0x371575=_0x3ed9c8;VisuMZ['BoostAction'][_0x371575(0x263)][_0x371575(0x2e2)](this),setTimeout(VisuMZ[_0x371575(0x32e)][_0x371575(0x2fa)]['bind'](this),0x32);},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x2fa)]=function(){const _0x3f9207=_0x3ed9c8;if(!SceneManager[_0x3f9207(0x29f)]())return;const _0x5c2b3b=SceneManager['_scene'][_0x3f9207(0x288)];if(!_0x5c2b3b)return;_0x5c2b3b[_0x3f9207(0x1e3)](BattleManager[_0x3f9207(0x2f9)]()),_0x5c2b3b[_0x3f9207(0x32b)]();},VisuMZ['BoostAction'][_0x3ed9c8(0x1f7)]=Scene_Battle[_0x3ed9c8(0x24f)][_0x3ed9c8(0x1e6)],Scene_Battle[_0x3ed9c8(0x24f)][_0x3ed9c8(0x1e6)]=function(){const _0x3472e5=_0x3ed9c8;VisuMZ[_0x3472e5(0x32e)][_0x3472e5(0x1f7)][_0x3472e5(0x2e2)](this),this[_0x3472e5(0x301)]['setHandler']('boost',this['commandBoost'][_0x3472e5(0x203)](this)),this[_0x3472e5(0x301)][_0x3472e5(0x24c)]('unboost',this[_0x3472e5(0x2d5)]['bind'](this));},Scene_Battle[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2ad)]=function(_0x3fe49e){const _0x536488=_0x3ed9c8;BattleManager[_0x536488(0x2f9)]()[_0x536488(0x2ed)](-0x1),BattleManager['actor']()[_0x536488(0x271)](0x1),BattleManager[_0x536488(0x2f9)]()[_0x536488(0x279)](),this[_0x536488(0x288)]['refresh'](),!_0x3fe49e&&this[_0x536488(0x301)][_0x536488(0x35f)](),this[_0x536488(0x301)][_0x536488(0x32b)]();},Scene_Battle['prototype'][_0x3ed9c8(0x2d5)]=function(_0x149e4b){const _0x4f2fcc=_0x3ed9c8;BattleManager[_0x4f2fcc(0x2f9)]()[_0x4f2fcc(0x271)](-0x1),BattleManager[_0x4f2fcc(0x2f9)]()[_0x4f2fcc(0x2ed)](0x1),BattleManager[_0x4f2fcc(0x2f9)]()[_0x4f2fcc(0x279)](),this[_0x4f2fcc(0x288)]['refresh'](),!_0x149e4b&&this[_0x4f2fcc(0x301)][_0x4f2fcc(0x35f)](),this[_0x4f2fcc(0x301)][_0x4f2fcc(0x32b)]();},VisuMZ['BoostAction'][_0x3ed9c8(0x344)]=Scene_Battle['prototype'][_0x3ed9c8(0x223)],Scene_Battle[_0x3ed9c8(0x24f)][_0x3ed9c8(0x223)]=function(){const _0x53017b=_0x3ed9c8;this[_0x53017b(0x288)]&&this['_helpWindow'][_0x53017b(0x319)](),VisuMZ[_0x53017b(0x32e)]['Scene_Battle_selectNextCommand'][_0x53017b(0x2e2)](this);},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x29a)]=Scene_Battle['prototype'][_0x3ed9c8(0x325)],Scene_Battle[_0x3ed9c8(0x24f)][_0x3ed9c8(0x325)]=function(){const _0xdb9092=_0x3ed9c8;VisuMZ['BoostAction'][_0xdb9092(0x29a)]['call'](this),this[_0xdb9092(0x288)]&&this[_0xdb9092(0x288)]['setBoostSubject'](BattleManager[_0xdb9092(0x2f9)]());};function Sprite_BoostContainer(){this['initialize'](...arguments);}Sprite_BoostContainer[_0x3ed9c8(0x24f)]=Object['create'](Sprite[_0x3ed9c8(0x24f)]),Sprite_BoostContainer[_0x3ed9c8(0x24f)][_0x3ed9c8(0x212)]=Sprite_BoostContainer,Sprite_BoostContainer['ICON_SIZE_RATE']=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x363)],Sprite_BoostContainer[_0x3ed9c8(0x24f)]['initialize']=function(){const _0x550368=_0x3ed9c8;Sprite[_0x550368(0x24f)][_0x550368(0x339)]['call'](this),this[_0x550368(0x2c8)](),this[_0x550368(0x2c9)]();},Sprite_BoostContainer[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2c8)]=function(){const _0x512f27=_0x3ed9c8;this[_0x512f27(0x326)]['x']=Sprite_BoostContainer['ICON_SIZE_RATE'],this[_0x512f27(0x326)]['y']=Sprite_BoostContainer[_0x512f27(0x274)];},Sprite_BoostContainer[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2c9)]=function(){const _0x36e11f=_0x3ed9c8;this[_0x36e11f(0x201)]=[];for(let _0x58021b=0x1;_0x58021b<=Game_BattlerBase[_0x36e11f(0x242)];_0x58021b++){const _0x5614f1=new Sprite_BoostIcon(_0x58021b);this[_0x36e11f(0x33c)](_0x5614f1),this['_icons']['push'](_0x5614f1);}},Sprite_BoostContainer['prototype'][_0x3ed9c8(0x29d)]=function(_0x190bca){const _0x2573a3=_0x3ed9c8;if(!this['_icons'])return;for(const _0x2b6485 of this[_0x2573a3(0x201)]){_0x2573a3(0x1eb)!=='EeMfJ'?(_0x21c3a3[_0x2573a3(0x24f)][_0x2573a3(0x339)][_0x2573a3(0x2e2)](this),this[_0x2573a3(0x2c8)](),this[_0x2573a3(0x2c9)]()):_0x2b6485[_0x2573a3(0x29d)](_0x190bca);}};function Sprite_BoostIcon(){const _0x30a045=_0x3ed9c8;this[_0x30a045(0x339)](...arguments);}function _0x224f(_0x4aa711,_0x5a83a2){const _0x39a656=_0x39a6();return _0x224f=function(_0x224f20,_0x4c519d){_0x224f20=_0x224f20-0x1dc;let _0x540abd=_0x39a656[_0x224f20];return _0x540abd;},_0x224f(_0x4aa711,_0x5a83a2);}Sprite_BoostIcon[_0x3ed9c8(0x24f)]=Object[_0x3ed9c8(0x2aa)](Sprite[_0x3ed9c8(0x24f)]),Sprite_BoostIcon['prototype']['constructor']=Sprite_BoostIcon,Sprite_BoostIcon[_0x3ed9c8(0x24f)][_0x3ed9c8(0x339)]=function(_0x41ff4b){const _0x3ae4ee=_0x3ed9c8;this[_0x3ae4ee(0x24e)]=_0x41ff4b,Sprite[_0x3ae4ee(0x24f)]['initialize'][_0x3ae4ee(0x2e2)](this),this['initMembers'](),this[_0x3ae4ee(0x1f4)]();},Sprite_BoostIcon['prototype'][_0x3ed9c8(0x2c8)]=function(){const _0x2bcec5=_0x3ed9c8;this[_0x2bcec5(0x1f9)]=ImageManager['unboostIcon'],this['x']=ImageManager['iconWidth']*(this['_slot']-0x1);},Sprite_BoostIcon['prototype'][_0x3ed9c8(0x1f4)]=function(){const _0x43944a=_0x3ed9c8;this['bitmap']=ImageManager[_0x43944a(0x312)](),this[_0x43944a(0x2e7)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon[_0x3ed9c8(0x24f)][_0x3ed9c8(0x29d)]=function(_0x57c2c1){const _0x3b3aed=_0x3ed9c8;this['_battler']!==_0x57c2c1&&(this[_0x3b3aed(0x2c2)]=_0x57c2c1);},Sprite_BoostIcon['prototype']['update']=function(){const _0x559cdc=_0x3ed9c8;Sprite[_0x559cdc(0x24f)][_0x559cdc(0x28b)][_0x559cdc(0x2e2)](this),this[_0x559cdc(0x296)](),this['updateFrame']();},Sprite_BoostIcon[_0x3ed9c8(0x24f)][_0x3ed9c8(0x296)]=function(){const _0x36575d=_0x3ed9c8;if(this[_0x36575d(0x2c2)]){let _0x1524db=this[_0x36575d(0x2c2)][_0x36575d(0x2ab)]();if(_0x1524db>=this[_0x36575d(0x24e)])this[_0x36575d(0x1f9)]=ImageManager[_0x36575d(0x1f6)];else{if(_0x36575d(0x237)!=='POvms')return'';else this[_0x36575d(0x1f9)]=ImageManager[_0x36575d(0x316)];}}else{if(_0x36575d(0x2e8)!==_0x36575d(0x2e8))return _0x230c37=_0x30aa33['BoostAction'][_0x36575d(0x221)][_0x36575d(0x2e2)](this,_0x21a15b),_0xa80f77=this[_0x36575d(0x2e6)](_0x5a4820),_0x4aad27;else this[_0x36575d(0x1f9)]=0x0;}},Sprite_BoostIcon[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2af)]=function(){const _0x3f01ce=_0x3ed9c8,_0x5bdf82=ImageManager[_0x3f01ce(0x284)],_0x108282=ImageManager[_0x3f01ce(0x32a)],_0x1fdcbc=this[_0x3f01ce(0x1f9)]%0x10*_0x5bdf82,_0x3f8bf4=Math[_0x3f01ce(0x354)](this['_iconIndex']/0x10)*_0x108282;this[_0x3f01ce(0x2e7)](_0x1fdcbc,_0x3f8bf4,_0x5bdf82,_0x108282);},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x221)]=Window_Base['prototype']['convertEscapeCharacters'],Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x272)]=function(_0x46f670){const _0x4ea515=_0x3ed9c8;return _0x46f670=VisuMZ[_0x4ea515(0x32e)][_0x4ea515(0x221)][_0x4ea515(0x2e2)](this,_0x46f670),_0x46f670=this['convertBoostEscapeCharacters'](_0x46f670),_0x46f670;},Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2e6)]=function(_0xe3cff4){const _0x286a07=_0x3ed9c8;return _0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){return this['convertBoostDamageEscape'](parseInt(arguments[0x1]));}['bind'](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x29ffa4=_0x286a07;return this[_0x29ffa4(0x2a1)](parseInt(arguments[0x1]));}['bind'](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){return this['convertBoostTurnEscape'](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x373039=_0x286a07;if(_0x373039(0x204)!==_0x373039(0x204)){const _0x1426ad=this['constructor'][_0x373039(0x327)];return _0x5b517d[_0x373039(0x24a)]['includes'](_0x1426ad)?![]:!![];}else return this[_0x373039(0x2ef)](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x6461b9=_0x286a07;return this[_0x6461b9(0x343)](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x7c468b=_0x286a07;return this[_0x7c468b(0x343)](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x12e214=_0x286a07;return this[_0x12e214(0x365)](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x1e500c=_0x286a07;return this[_0x1e500c(0x1e7)](parseInt(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x4274bb=_0x286a07;return this[_0x4274bb(0x309)](String(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x20413e=_0x286a07;return this[_0x20413e(0x22e)](String(arguments[0x1]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x37fc04=_0x286a07;return this[_0x37fc04(0x262)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){const _0x43cb07=_0x286a07;if(_0x43cb07(0x20f)!==_0x43cb07(0x27b))return this[_0x43cb07(0x241)](parseInt(arguments[0x1]),String(arguments[0x2]));else{if(!_0x231153[_0x43cb07(0x2f3)]&&(this['isDead']()||this[_0x43cb07(0x228)]()))return 0x0;else{var _0x3e86a8=_0xaae30e['BOOST_POINTS_TURN_REGEN'];return _0x3e86a8=this[_0x43cb07(0x28d)](_0x3e86a8),_0x3e86a8=this[_0x43cb07(0x224)](_0x3e86a8),_0x3e86a8;}}}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4['replace'](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x143cee=_0x286a07;return this[_0x143cee(0x1f3)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostGreaterEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x286a07(0x203)](this)),_0xe3cff4=_0xe3cff4[_0x286a07(0x293)](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x3c122f=_0x286a07;return this[_0x3c122f(0x2bb)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x286a07(0x203)](this)),_0xe3cff4;},Window_Base[_0x3ed9c8(0x24f)]['convertBoostDamageEscape']=function(_0x52a4c3){const _0x4aaa25=_0x3ed9c8;if(!!this[_0x4aaa25(0x21a)]){if(_0x4aaa25(0x330)!==_0x4aaa25(0x292)){var _0x2ae90a=this[_0x4aaa25(0x21a)][_0x4aaa25(0x26f)]('Damage');_0x52a4c3=Math['round'](_0x52a4c3*_0x2ae90a),_0x52a4c3+=this[_0x4aaa25(0x21a)][_0x4aaa25(0x2a2)](_0x4aaa25(0x287));}else return!!this[_0x4aaa25(0x21a)]&&this[_0x4aaa25(0x21a)][_0x4aaa25(0x254)]()<_0x3c928e?_0xb630fb:'';}return _0x52a4c3;},Window_Base['prototype'][_0x3ed9c8(0x2ef)]=function(_0x1e2708){const _0x2f4b24=_0x3ed9c8;if(!!this['_bpSubject']){if(_0x2f4b24(0x1e2)!==_0x2f4b24(0x2b2)){var _0x53ca35=this[_0x2f4b24(0x21a)][_0x2f4b24(0x26f)](_0x2f4b24(0x30a));_0x1e2708=Math[_0x2f4b24(0x250)](_0x1e2708*_0x53ca35),_0x1e2708+=this['_bpSubject'][_0x2f4b24(0x2a2)](_0x2f4b24(0x30a));}else{const _0x39ba34=_0x325614['iconWidth'],_0x1e36ad=_0x409faa[_0x2f4b24(0x32a)],_0xa63e3a=this[_0x2f4b24(0x1f9)]%0x10*_0x39ba34,_0xcd0ca8=_0x1bf1d1[_0x2f4b24(0x354)](this[_0x2f4b24(0x1f9)]/0x10)*_0x1e36ad;this[_0x2f4b24(0x2e7)](_0xa63e3a,_0xcd0ca8,_0x39ba34,_0x1e36ad);}}return _0x1e2708;},Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x343)]=function(_0x54bce4){const _0x3e98c2=_0x3ed9c8;if(!!this[_0x3e98c2(0x21a)]){var _0x38fa47=this[_0x3e98c2(0x21a)][_0x3e98c2(0x26f)]('Repeat');_0x54bce4=Math[_0x3e98c2(0x250)](_0x54bce4*_0x38fa47),_0x54bce4+=this[_0x3e98c2(0x21a)][_0x3e98c2(0x2a2)](_0x3e98c2(0x2fe));}return _0x54bce4;},Window_Base[_0x3ed9c8(0x24f)]['convertBoostAnalyzeEscape']=function(_0x4d1255){const _0x18f910=_0x3ed9c8;if(!!this[_0x18f910(0x21a)]){if(_0x18f910(0x335)!=='nQMNg'){var _0x4002e1=this[_0x18f910(0x23a)]()['boostMultiplier'](_0x18f910(0x2fe));_0x33b3a1=_0x1137d8['round'](_0x143dd2*_0x4002e1),_0x3d5316+=this[_0x18f910(0x23a)]()[_0x18f910(0x2a2)](_0x18f910(0x2fe));}else{var _0x22224a=this[_0x18f910(0x21a)][_0x18f910(0x26f)]('Analyze');_0x4d1255=Math[_0x18f910(0x250)](_0x4d1255*_0x22224a),_0x4d1255+=this[_0x18f910(0x21a)][_0x18f910(0x2a2)](_0x18f910(0x333));}}return _0x4d1255;},Window_Base['prototype'][_0x3ed9c8(0x1e7)]=function(_0x5b497c){const _0x51012b=_0x3ed9c8;if(!!this[_0x51012b(0x21a)]){var _0x241edb=this[_0x51012b(0x21a)][_0x51012b(0x26f)](_0x51012b(0x294));_0x5b497c=Math[_0x51012b(0x250)](_0x5b497c*_0x241edb),_0x5b497c+=this[_0x51012b(0x21a)][_0x51012b(0x2a2)]('BP\x20Effect');}return _0x5b497c;},Window_Base[_0x3ed9c8(0x24f)]['convertBoostUpEscape']=function(_0x2a2a6c){const _0x272f29=_0x3ed9c8;if(!!this[_0x272f29(0x21a)]&&this[_0x272f29(0x21a)][_0x272f29(0x254)]()>0x0)return _0x2a2a6c;else{if('EeeWK'===_0x272f29(0x2a5))_0x35e5b3[_0x272f29(0x251)]()&&(this[_0x272f29(0x253)](),this[_0x272f29(0x35c)]()),_0x42cabe[_0x272f29(0x32e)][_0x272f29(0x30c)][_0x272f29(0x2e2)](this);else return'';}},Window_Base['prototype'][_0x3ed9c8(0x22e)]=function(_0x591c25){const _0x526dc7=_0x3ed9c8;return!this[_0x526dc7(0x21a)]||this[_0x526dc7(0x21a)]['toUseBoostPoints']()<=0x0?_0x591c25:'';},Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x262)]=function(_0x1504ba,_0x4b775e){const _0x44ce36=_0x3ed9c8;return!!this[_0x44ce36(0x21a)]&&this[_0x44ce36(0x21a)]['toUseBoostPoints']()===_0x1504ba?_0x4b775e:'';},Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x262)]=function(_0x292799,_0x5b95d8){const _0x534b2f=_0x3ed9c8;return!!this[_0x534b2f(0x21a)]&&this[_0x534b2f(0x21a)]['toUseBoostPoints']()===_0x292799?_0x5b95d8:'';},Window_Base['prototype'][_0x3ed9c8(0x241)]=function(_0x300f5b,_0x5288f6){const _0x34f5f0=_0x3ed9c8;return!!this[_0x34f5f0(0x21a)]&&this[_0x34f5f0(0x21a)][_0x34f5f0(0x254)]()<=_0x300f5b?'vJbYN'===_0x34f5f0(0x217)?_0x5288f6:this[_0x34f5f0(0x254)]()>=_0x4e8fa0:_0x34f5f0(0x1e5)!==_0x34f5f0(0x25e)?'':_0x8b4ff1;},Window_Base[_0x3ed9c8(0x24f)]['convertBoostLessEscape']=function(_0x51429c,_0xd85039){const _0x5e5b97=_0x3ed9c8;if(!!this[_0x5e5b97(0x21a)]&&this[_0x5e5b97(0x21a)][_0x5e5b97(0x254)]()<_0x51429c){if(_0x5e5b97(0x1ff)===_0x5e5b97(0x1ff))return _0xd85039;else this[_0x5e5b97(0x2b7)]===_0x1fe272&&this[_0x5e5b97(0x21e)](),_0x202796=_0x22e075[_0x5e5b97(0x250)](_0x5acd38),this['_storedBoostPoints']=_0x50decb['clamp'](0x0,_0x60193b[_0x5e5b97(0x242)]),this[_0x5e5b97(0x32b)]();}else{if(_0x5e5b97(0x256)!==_0x5e5b97(0x323))return'';else{const _0x4f2ac9=this[_0x5e5b97(0x2f9)](_0x4dd94b),_0x366cec=this[_0x5e5b97(0x2fc)](_0x508bc2);let _0x54e4e1=_0x366cec['x']-0x4+_0x45986a[_0x5e5b97(0x2bd)],_0x156eb1=_0x366cec['y']+0x4+_0x3b1390[_0x5e5b97(0x2eb)];this[_0x5e5b97(0x252)](_0x4f2ac9,_0x54e4e1,_0x156eb1);}}},Window_Base[_0x3ed9c8(0x24f)][_0x3ed9c8(0x202)]=function(_0x38fdad,_0x4975b7){const _0x3d9a9a=_0x3ed9c8;if(!!this['_bpSubject']&&this[_0x3d9a9a(0x21a)][_0x3d9a9a(0x254)]()>=_0x38fdad)return _0x4975b7;else{if(_0x3d9a9a(0x245)===_0x3d9a9a(0x30e)){const _0x2f9907=_0x247590['BoostAction'][_0x3d9a9a(0x22d)];if(!!this[_0x3d9a9a(0x23a)]()&&this[_0x3d9a9a(0x1ea)]()[_0x3d9a9a(0x248)][_0x3d9a9a(0x1f2)](_0x2f9907[_0x3d9a9a(0x317)])){var _0x592eaf=this[_0x3d9a9a(0x23a)]()[_0x3d9a9a(0x26f)](_0x3d9a9a(0x30a));_0x83461e[_0x3d9a9a(0x34a)]=_0x592eaf,_0x36529e['_bpTurnFlat']=this['subject']()[_0x3d9a9a(0x2a2)](_0x3d9a9a(0x30a));}_0x4281bf&&(_0x105a19[_0x3d9a9a(0x34a)]=_0xe0203a,_0x19fd5f['_bpTurnFlat']=_0x40e9a9);}else return'';}},Window_Base['prototype'][_0x3ed9c8(0x2bb)]=function(_0x41a921,_0x5a2cfd){const _0x5ce832=_0x3ed9c8;return!!this[_0x5ce832(0x21a)]&&this[_0x5ce832(0x21a)]['toUseBoostPoints']()>_0x41a921?_0x5a2cfd:'';},Window_Selectable[_0x3ed9c8(0x2a4)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x362)],Window_Selectable[_0x3ed9c8(0x24a)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)]['UI']['BypassConstructors'],Window_Selectable[_0x3ed9c8(0x24f)][_0x3ed9c8(0x1fa)]=function(){const _0x34bdd8=_0x3ed9c8,_0x2858b0=this['constructor']['name'];if(Window_Selectable['BOOST_ACTION_BYPASS_CONSTRUCTORS'][_0x34bdd8(0x25c)](_0x2858b0))return![];else{if(_0x34bdd8(0x2f5)!==_0x34bdd8(0x2f5)){if(!_0x44b533[_0x34bdd8(0x358)])return;const _0x5c795c=this['actor'](_0x1d15f0);if(!_0x5c795c)return;!_0x457594[_0x34bdd8(0x322)]?this[_0x34bdd8(0x306)](_0x3b8072):this[_0x34bdd8(0x2b0)](_0x1dac40);}else return!![];}},Window_Selectable[_0x3ed9c8(0x24f)][_0x3ed9c8(0x240)]=function(){const _0x563ead=_0x3ed9c8;if(!SceneManager[_0x563ead(0x29f)]())return![];if(!Window_Selectable[_0x563ead(0x2a4)])return![];if(!BattleManager[_0x563ead(0x251)]())return![];return this[_0x563ead(0x1fa)]();},VisuMZ['BoostAction'][_0x3ed9c8(0x266)]=Window_Selectable[_0x3ed9c8(0x24f)]['cursorPagedown'],Window_Selectable[_0x3ed9c8(0x24f)][_0x3ed9c8(0x338)]=function(){const _0x2cc7c9=_0x3ed9c8;if(this[_0x2cc7c9(0x240)]()){const _0x390b19=BattleManager['actor']();_0x390b19&&_0x390b19[_0x2cc7c9(0x35a)]()&&(SceneManager['_scene'][_0x2cc7c9(0x2ad)](!![]),this['refresh'](),this[_0x2cc7c9(0x1fe)]()),Input[_0x2cc7c9(0x2ce)]();}else{if(_0x2cc7c9(0x226)!=='yNpoc')VisuMZ[_0x2cc7c9(0x32e)][_0x2cc7c9(0x266)][_0x2cc7c9(0x2e2)](this);else{this['_boostIconSheet']=new _0x6d26ca();const _0x419e14=_0x3aae12[_0x2cc7c9(0x30b)](_0x2cc7c9(0x1df));_0x419e14[_0x2cc7c9(0x22f)](this['boostTransferBitmap']['bind'](this,_0x419e14));}}},VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x35b)]=Window_Selectable['prototype'][_0x3ed9c8(0x235)],Window_Selectable['prototype'][_0x3ed9c8(0x235)]=function(){const _0x3afe7b=_0x3ed9c8;if(this[_0x3afe7b(0x240)]()){const _0x434811=BattleManager['actor']();_0x434811&&_0x434811[_0x3afe7b(0x1dd)]()&&(SceneManager['_scene'][_0x3afe7b(0x2d5)](!![]),this['refresh'](),this[_0x3afe7b(0x1fe)]()),Input[_0x3afe7b(0x2ce)]();}else{if(_0x3afe7b(0x28c)!=='ePwnH'){var _0xa3b91e=this[_0x3afe7b(0x21a)][_0x3afe7b(0x26f)](_0x3afe7b(0x333));_0x7f8090=_0x156966[_0x3afe7b(0x250)](_0xe81548*_0xa3b91e),_0x896ed3+=this['_bpSubject'][_0x3afe7b(0x2a2)]('Analyze');}else VisuMZ[_0x3afe7b(0x32e)][_0x3afe7b(0x35b)]['call'](this);}},Window_Help[_0x3ed9c8(0x24f)]['setBoostSubject']=function(_0x4001d2){this['_bpSubject']=_0x4001d2;},Window_Help['prototype'][_0x3ed9c8(0x319)]=function(){const _0x2d0df6=_0x3ed9c8;this[_0x2d0df6(0x21a)]=undefined;},Window_StatusBase[_0x3ed9c8(0x24f)][_0x3ed9c8(0x1fc)]=function(){const _0x4e2809=_0x3ed9c8;return BattleManager[_0x4e2809(0x251)]();},Window_StatusBase[_0x3ed9c8(0x24f)]['placeBoostPoints']=function(_0x179b10,_0x418715,_0x116d7){const _0x2a55a4=_0x3ed9c8;if(!this['shouldDrawBoostIcons']())return;const _0xfcdf0d=_0x2a55a4(0x2b3)[_0x2a55a4(0x2a6)](_0x179b10[_0x2a55a4(0x2e0)]()),_0x43ab1b=this[_0x2a55a4(0x2dd)](_0xfcdf0d,Sprite_BoostContainer);_0x43ab1b[_0x2a55a4(0x29d)](_0x179b10),_0x43ab1b[_0x2a55a4(0x26c)](_0x418715,_0x116d7),_0x43ab1b[_0x2a55a4(0x367)]();},Window_ActorCommand['BOOST_ACTION_SHOW']=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI']['ShowBoostCmd'],Window_ActorCommand[_0x3ed9c8(0x205)]=VisuMZ['BoostAction'][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x360)],VisuMZ['BoostAction'][_0x3ed9c8(0x30c)]=Window_ActorCommand[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2d8)],Window_ActorCommand['prototype'][_0x3ed9c8(0x2d8)]=function(){const _0x870960=_0x3ed9c8;if(BattleManager[_0x870960(0x251)]()){if('rUXrL'!==_0x870960(0x1f1))return this['toUseBoostPoints']();else this[_0x870960(0x253)](),this[_0x870960(0x35c)]();}VisuMZ[_0x870960(0x32e)]['Window_ActorCommand_addGuardCommand'][_0x870960(0x2e2)](this);},Window_ActorCommand[_0x3ed9c8(0x24f)][_0x3ed9c8(0x253)]=function(){const _0x1e5c3b=_0x3ed9c8;if(!Window_ActorCommand[_0x1e5c3b(0x215)])return;const _0x3341d4=this[_0x1e5c3b(0x345)](),_0x4342b9=TextManager[_0x1e5c3b(0x2dc)],_0x45791c=ImageManager[_0x1e5c3b(0x1f6)],_0x518ca7=_0x3341d4===_0x1e5c3b(0x214)?_0x4342b9:'\x5cI[%1]%2'[_0x1e5c3b(0x2a6)](_0x45791c,_0x4342b9);var _0x5bafa2=this[_0x1e5c3b(0x2fd)]['canUseBoostPoints']();this[_0x1e5c3b(0x259)](_0x518ca7,'boost',_0x5bafa2);},Window_ActorCommand[_0x3ed9c8(0x24f)][_0x3ed9c8(0x35c)]=function(){const _0x103423=_0x3ed9c8;if(!Window_ActorCommand[_0x103423(0x205)])return;const _0x194acb=this['commandStyle'](),_0x3bbbc7=TextManager[_0x103423(0x334)],_0x22ca15=ImageManager['unboostIcon'],_0x2d7854=_0x194acb===_0x103423(0x214)?_0x3bbbc7:_0x103423(0x291)[_0x103423(0x2a6)](_0x22ca15,_0x3bbbc7);var _0x48d5e2=this['_actor'][_0x103423(0x1dd)]();this[_0x103423(0x259)](_0x2d7854,'unboost',_0x48d5e2);},Window_ActorCommand['prototype']['playOkSound']=function(){const _0x2e3c08=_0x3ed9c8;this['currentSymbol']()!==_0x2e3c08(0x1ec)&&this[_0x2e3c08(0x31e)]()!==_0x2e3c08(0x273)&&Window_Selectable[_0x2e3c08(0x24f)][_0x2e3c08(0x2db)]['call'](this);},Window_BattleStatus[_0x3ed9c8(0x358)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI']['BattleStatusShow'],Window_BattleStatus[_0x3ed9c8(0x322)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x303)],Window_BattleStatus[_0x3ed9c8(0x2bd)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI']['BattleStatusOffsetX'],Window_BattleStatus[_0x3ed9c8(0x2eb)]=VisuMZ[_0x3ed9c8(0x32e)][_0x3ed9c8(0x268)]['UI'][_0x3ed9c8(0x2ec)],VisuMZ[_0x3ed9c8(0x32e)]['Window_BattleStatus_drawItemStatus']=Window_BattleStatus['prototype'][_0x3ed9c8(0x352)],Window_BattleStatus['prototype']['drawItemStatus']=function(_0x44a3be){const _0x26d6d0=_0x3ed9c8;VisuMZ[_0x26d6d0(0x32e)][_0x26d6d0(0x321)]['call'](this,_0x44a3be),this[_0x26d6d0(0x2c7)](_0x44a3be);},Window_BattleStatus['prototype']['drawItemStatusBoostPoints']=function(_0x4a7cbe){const _0x2cb39c=_0x3ed9c8;if(!Window_BattleStatus[_0x2cb39c(0x358)])return;const _0x17f27=this[_0x2cb39c(0x2f9)](_0x4a7cbe);if(!_0x17f27)return;!Window_BattleStatus['BOOST_POINTS_DISPLAY_AUTO_POS']?_0x2cb39c(0x2f6)===_0x2cb39c(0x2f6)?this[_0x2cb39c(0x306)](_0x4a7cbe):_0x38a0e9[_0x2cb39c(0x32e)][_0x2cb39c(0x35b)][_0x2cb39c(0x2e2)](this):this[_0x2cb39c(0x2b0)](_0x4a7cbe);},Window_BattleStatus[_0x3ed9c8(0x24f)][_0x3ed9c8(0x306)]=function(_0x17cbc8){const _0xe0bf00=_0x3ed9c8,_0x42842e=this[_0xe0bf00(0x2f9)](_0x17cbc8),_0x2e055f=this[_0xe0bf00(0x2fc)](_0x17cbc8);let _0x5b4779=_0x2e055f['x']-0x4+Window_BattleStatus[_0xe0bf00(0x2bd)],_0x1ccad6=_0x2e055f['y']+0x4+Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_Y'];this[_0xe0bf00(0x252)](_0x42842e,_0x5b4779,_0x1ccad6);},Window_BattleStatus[_0x3ed9c8(0x24f)][_0x3ed9c8(0x2b0)]=function(_0x3de86c){const _0x181a21=_0x3ed9c8,_0x40b5a9=this[_0x181a21(0x2f9)](_0x3de86c),_0x109016=this[_0x181a21(0x2e1)](_0x3de86c),_0x292ad1=Math[_0x181a21(0x2f8)](ImageManager['iconWidth']*Game_BattlerBase[_0x181a21(0x242)]*Sprite_BoostContainer[_0x181a21(0x274)]),_0x893ec7=Math[_0x181a21(0x2f8)](ImageManager[_0x181a21(0x32a)]*Sprite_BoostContainer['ICON_SIZE_RATE']);let _0xf9f28c=_0x109016['x']+0x4,_0x31e98b=_0x109016['y']+0x4;const _0x389ac9=this[_0x181a21(0x2d2)]();switch(_0x389ac9){case'list':VisuMZ[_0x181a21(0x218)]['Settings'][_0x181a21(0x25a)][_0x181a21(0x35d)]?_0xf9f28c+=ImageManager['faceWidth']+0x8:_0xf9f28c+=ImageManager[_0x181a21(0x284)]+0x8;_0xf9f28c+=0x88,_0xf9f28c+=0x88*0x2;$dataSystem[_0x181a21(0x355)]&&(_0xf9f28c+=0x88);_0x31e98b+=Math[_0x181a21(0x332)](0x0,Math['round']((this[_0x181a21(0x299)]()-_0x893ec7)/0x2));break;case'xp':case _0x181a21(0x258):case _0x181a21(0x361):_0xf9f28c=Math[_0x181a21(0x250)](_0x109016['x']+(_0x109016['width']-_0x292ad1)/0x2);break;case _0x181a21(0x311):_0xf9f28c=Math[_0x181a21(0x250)](_0x109016['x']+(_0x109016['width']-_0x292ad1)/0x2);const _0xe7dc27=$dataSystem[_0x181a21(0x355)]?0x4:0x3;_0x31e98b=Math[_0x181a21(0x250)](_0x109016['y']+_0x109016[_0x181a21(0x2a8)]-0x4-this['lineHeight']()*_0xe7dc27);break;}_0xf9f28c+=Window_BattleStatus[_0x181a21(0x2bd)],_0x31e98b+=Window_BattleStatus[_0x181a21(0x2eb)],this[_0x181a21(0x252)](_0x40b5a9,_0xf9f28c,_0x31e98b);};