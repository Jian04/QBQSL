//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
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
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 *    depending on the primary class and how they're set up. To avoid
 *    conflicting with subclass resources and requirements, the Skill Learn
 *    System only makes it available for the primary class to learn skills from
 *    at a time. To learn skills from a subclass through the Skill Learn System
 *    the player would have to change to the subclass' class as the primary and
 *    then learn from it.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Class Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Job Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
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
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
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
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
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
 * @default Equip2
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much CP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type Number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much JP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x306cf5=_0x35dc;(function(_0x19c625,_0x181187){const _0x4ee2f3=_0x35dc,_0x7557b5=_0x19c625();while(!![]){try{const _0x3975c2=-parseInt(_0x4ee2f3(0x3cb))/0x1*(-parseInt(_0x4ee2f3(0x219))/0x2)+-parseInt(_0x4ee2f3(0x24d))/0x3+-parseInt(_0x4ee2f3(0x32e))/0x4*(-parseInt(_0x4ee2f3(0x30a))/0x5)+-parseInt(_0x4ee2f3(0x44d))/0x6+-parseInt(_0x4ee2f3(0x45f))/0x7+parseInt(_0x4ee2f3(0x4e1))/0x8+parseInt(_0x4ee2f3(0x25c))/0x9*(parseInt(_0x4ee2f3(0x358))/0xa);if(_0x3975c2===_0x181187)break;else _0x7557b5['push'](_0x7557b5['shift']());}catch(_0x56db24){_0x7557b5['push'](_0x7557b5['shift']());}}}(_0x4bd8,0xd3e03));var label=_0x306cf5(0x3e0),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xa26442){const _0x41d5ff=_0x306cf5;return _0xa26442[_0x41d5ff(0x2c1)]&&_0xa26442[_0x41d5ff(0x1b6)][_0x41d5ff(0x1bc)]('['+label+']');})[0x0];VisuMZ[label][_0x306cf5(0x510)]=VisuMZ[label][_0x306cf5(0x510)]||{},VisuMZ[_0x306cf5(0x309)]=function(_0x54db6a,_0x4ffccb){const _0x58778f=_0x306cf5;for(const _0x518152 in _0x4ffccb){if(_0x518152[_0x58778f(0x260)](/(.*):(.*)/i)){if(_0x58778f(0x4c7)!=='DtbUm'){const _0xbb8e62=_0x2b22d7['getSkillPoints']();if(_0xbb8e62<_0x245e1a)return![];}else{const _0x4183a0=String(RegExp['$1']),_0x5238eb=String(RegExp['$2'])[_0x58778f(0x367)]()[_0x58778f(0x2c6)]();let _0x493cec,_0x21a39b,_0x2c0d78;switch(_0x5238eb){case _0x58778f(0x2c7):_0x493cec=_0x4ffccb[_0x518152]!==''?Number(_0x4ffccb[_0x518152]):0x0;break;case _0x58778f(0x3c9):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b[_0x58778f(0x306)](_0x583d51=>Number(_0x583d51));break;case'EVAL':_0x493cec=_0x4ffccb[_0x518152]!==''?eval(_0x4ffccb[_0x518152]):null;break;case _0x58778f(0x2fb):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b['map'](_0x3ab135=>eval(_0x3ab135));break;case _0x58778f(0x40c):_0x493cec=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):'';break;case _0x58778f(0x3a8):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b['map'](_0x356734=>JSON[_0x58778f(0x3a7)](_0x356734));break;case _0x58778f(0x4f4):_0x493cec=_0x4ffccb[_0x518152]!==''?new Function(JSON['parse'](_0x4ffccb[_0x518152])):new Function('return\x200');break;case _0x58778f(0x433):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b[_0x58778f(0x306)](_0x33fc5f=>new Function(JSON[_0x58778f(0x3a7)](_0x33fc5f)));break;case _0x58778f(0x2e9):_0x493cec=_0x4ffccb[_0x518152]!==''?String(_0x4ffccb[_0x518152]):'';break;case _0x58778f(0x253):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b[_0x58778f(0x306)](_0x14e4c4=>String(_0x14e4c4));break;case _0x58778f(0x50b):_0x2c0d78=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):{},_0x493cec=VisuMZ[_0x58778f(0x309)]({},_0x2c0d78);break;case _0x58778f(0x388):_0x21a39b=_0x4ffccb[_0x518152]!==''?JSON[_0x58778f(0x3a7)](_0x4ffccb[_0x518152]):[],_0x493cec=_0x21a39b[_0x58778f(0x306)](_0x4bac12=>VisuMZ[_0x58778f(0x309)]({},JSON[_0x58778f(0x3a7)](_0x4bac12)));break;default:continue;}_0x54db6a[_0x4183a0]=_0x493cec;}}}return _0x54db6a;},(_0x31cc47=>{const _0x569949=_0x306cf5,_0x69572e=_0x31cc47[_0x569949(0x1a7)];for(const _0x522fc6 of dependencies){if(!Imported[_0x522fc6]){if(_0x569949(0x1f6)==='XmtmP'){alert(_0x569949(0x24a)['format'](_0x69572e,_0x522fc6)),SceneManager['exit']();break;}else _0x1a0edc['ClassChangeSystem']['BattleManager_makeRewards'][_0x569949(0x255)](this),this[_0x569949(0x459)](),this['gainRewardsClassPoints'](),this[_0x569949(0x3b3)](),this[_0x569949(0x2d0)]();}}const _0x8cd66d=_0x31cc47[_0x569949(0x1b6)];if(_0x8cd66d[_0x569949(0x260)](/\[Version[ ](.*?)\]/i)){const _0xd605a8=Number(RegExp['$1']);_0xd605a8!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x69572e,_0xd605a8)),SceneManager[_0x569949(0x30f)]());}if(_0x8cd66d[_0x569949(0x260)](/\[Tier[ ](\d+)\]/i)){const _0x567598=Number(RegExp['$1']);_0x567598<tier?(alert(_0x569949(0x231)[_0x569949(0x25d)](_0x69572e,_0x567598,tier)),SceneManager[_0x569949(0x30f)]()):tier=Math[_0x569949(0x36f)](_0x567598,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x31cc47[_0x569949(0x3cc)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x306cf5(0x1a7)],'ClassUnlockForActor',_0x104a0d=>{const _0x41c120=_0x306cf5;VisuMZ[_0x41c120(0x309)](_0x104a0d,_0x104a0d);const _0xf21425=_0x104a0d[_0x41c120(0x4d1)][_0x41c120(0x306)](_0x65514f=>$gameActors['actor'](_0x65514f)),_0x536acd=_0x104a0d[_0x41c120(0x26c)];for(const _0x46730a of _0xf21425){if(!_0x46730a)continue;for(const _0x14d49b of _0x536acd){_0x46730a['unlockClass'](_0x14d49b);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x515),_0x4f0b0a=>{const _0x58d014=_0x306cf5;VisuMZ[_0x58d014(0x309)](_0x4f0b0a,_0x4f0b0a);const _0x3b4d28=_0x4f0b0a['Classes'];for(const _0x4545fc of _0x3b4d28){$gameParty[_0x58d014(0x32f)](_0x4545fc);}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x424),_0x231824=>{const _0x4bf25b=_0x306cf5;VisuMZ[_0x4bf25b(0x309)](_0x231824,_0x231824);const _0x626bca=_0x231824['Actors']['map'](_0x127a11=>$gameActors[_0x4bf25b(0x505)](_0x127a11)),_0x42f6a4=_0x231824[_0x4bf25b(0x26c)];for(const _0x4cb351 of _0x626bca){if(!_0x4cb351)continue;for(const _0x242c1d of _0x42f6a4){_0x4cb351[_0x4bf25b(0x2cf)](_0x242c1d);}}}),PluginManager['registerCommand'](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x50f),_0x535af4=>{const _0x7d44ae=_0x306cf5;VisuMZ['ConvertParams'](_0x535af4,_0x535af4);const _0x55c8e5=_0x535af4[_0x7d44ae(0x26c)];for(const _0x1c7746 of _0x55c8e5){$gameParty['removeUnlockedClass'](_0x1c7746);}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'ClassChangeAddRestrictTier',_0x2157fe=>{const _0x2248a2=_0x306cf5;VisuMZ['ConvertParams'](_0x2157fe,_0x2157fe);const _0x2e5e97=_0x2157fe[_0x2248a2(0x4d1)][_0x2248a2(0x306)](_0x3bcbe1=>$gameActors[_0x2248a2(0x505)](_0x3bcbe1)),_0x225253=_0x2157fe[_0x2248a2(0x2d1)];for(const _0x39b4c3 of _0x2e5e97){if(!_0x39b4c3)continue;for(const _0x3ce563 of _0x225253){_0x39b4c3['addClassChangeTierRestriction'](_0x3ce563);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'ClassChangeRemoveRestrictTier',_0xedc43a=>{const _0x275566=_0x306cf5;VisuMZ[_0x275566(0x309)](_0xedc43a,_0xedc43a);const _0x11422e=_0xedc43a[_0x275566(0x4d1)]['map'](_0x366790=>$gameActors['actor'](_0x366790)),_0x2da417=_0xedc43a['Tiers'];for(const _0x203f2b of _0x11422e){if(!_0x203f2b)continue;for(const _0x4bda1a of _0x2da417){if('newDT'!=='newDT'){if(!_0x4759ff)return'';const _0x776cea=_0x275566(0x436)[_0x275566(0x25d)](_0x2c3c2a[_0x275566(0x1d6)](),_0x1469d8[_0x275566(0x426)]()['id']);return _0x36988f[_0x275566(0x471)][_0x776cea]||'';}else _0x203f2b['removeClassChangeTierRestriction'](_0x4bda1a);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x469),_0x570e59=>{const _0x1fc407=_0x306cf5;VisuMZ[_0x1fc407(0x309)](_0x570e59,_0x570e59);const _0x5a72a4=_0x570e59[_0x1fc407(0x4d1)][_0x1fc407(0x306)](_0x1fc8a0=>$gameActors[_0x1fc407(0x505)](_0x1fc8a0)),_0x132eab=_0x570e59['Tier'],_0x2212a3=_0x570e59[_0x1fc407(0x4b0)];for(const _0x437fc2 of _0x5a72a4){if(_0x1fc407(0x2e3)===_0x1fc407(0x316))return this['_priorityBattlePortrait'];else{if(!_0x437fc2)continue;_0x437fc2[_0x1fc407(0x27a)](_0x2212a3,_0x132eab);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x4d4),_0x173b9e=>{const _0x116ba0=_0x306cf5;VisuMZ['ConvertParams'](_0x173b9e,_0x173b9e);const _0xacc4df=_0x173b9e[_0x116ba0(0x4d1)][_0x116ba0(0x306)](_0x4a726f=>$gameActors['actor'](_0x4a726f)),_0x32aa76=_0x173b9e[_0x116ba0(0x440)];for(const _0x27134f of _0xacc4df){if(!_0x27134f)continue;_0x27134f[_0x116ba0(0x4eb)](_0x32aa76);}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x375),_0x4f14c3=>{const _0x2e87b9=_0x306cf5;VisuMZ[_0x2e87b9(0x309)](_0x4f14c3,_0x4f14c3);const _0x3fe152=_0x4f14c3[_0x2e87b9(0x4d1)]['map'](_0x2524c2=>$gameActors[_0x2e87b9(0x505)](_0x2524c2)),_0xf1c585=_0x4f14c3[_0x2e87b9(0x440)];for(const _0xfb2f2f of _0x3fe152){if(_0x2e87b9(0x4a5)===_0x2e87b9(0x45a)){const _0x347d4c=_0x5b32f8(_0x3a74d1['$1']);_0xf5bcd1[_0x2e87b9(0x487)](_0x347d4c);}else{if(!_0xfb2f2f)continue;_0xfb2f2f[_0x2e87b9(0x334)](_0xf1c585);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData['name'],_0x306cf5(0x4de),_0x3646d5=>{const _0x54c372=_0x306cf5;VisuMZ['ConvertParams'](_0x3646d5,_0x3646d5);const _0x2c842a=_0x3646d5[_0x54c372(0x4d1)][_0x54c372(0x306)](_0x10d8c6=>$gameActors[_0x54c372(0x505)](_0x10d8c6)),_0x44059e=_0x3646d5[_0x54c372(0x440)];for(const _0x10ea5c of _0x2c842a){if(!_0x10ea5c)continue;_0x10ea5c[_0x54c372(0x308)](_0x44059e);}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'ClassPointsGain',_0x43052d=>{const _0x261580=_0x306cf5;VisuMZ[_0x261580(0x309)](_0x43052d,_0x43052d);const _0x45bd15=_0x43052d[_0x261580(0x4d1)][_0x261580(0x306)](_0xce0cd3=>$gameActors[_0x261580(0x505)](_0xce0cd3)),_0x23055c=_0x43052d['Classes'],_0x14423f=_0x43052d[_0x261580(0x450)];for(const _0x4dd950 of _0x45bd15){if(_0x261580(0x1bf)!==_0x261580(0x1bf))_0x52c9a1[_0x261580(0x452)](_0x226a34);else{if(!_0x4dd950)continue;for(const _0x29af2d of _0x23055c){_0x4dd950[_0x261580(0x487)](_0x14423f,_0x29af2d);}}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'ClassPointsAdd',_0x3e2dcc=>{const _0x202f9b=_0x306cf5;VisuMZ[_0x202f9b(0x309)](_0x3e2dcc,_0x3e2dcc);const _0x4dfa2f=_0x3e2dcc[_0x202f9b(0x4d1)][_0x202f9b(0x306)](_0x385bda=>$gameActors['actor'](_0x385bda)),_0x257517=_0x3e2dcc['Classes'],_0x3fe6ab=_0x3e2dcc[_0x202f9b(0x450)];for(const _0x585879 of _0x4dfa2f){if(!_0x585879)continue;for(const _0x554886 of _0x257517){_0x202f9b(0x284)!==_0x202f9b(0x3c2)?_0x585879['addClassPoints'](_0x3fe6ab,_0x554886):_0x1f0a53[_0x202f9b(0x1fe)][_0x202f9b(0x3b1)][_0x202f9b(0x255)](this,_0x1e277c);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'ClassPointsLose',_0x460663=>{const _0x42b82d=_0x306cf5;VisuMZ['ConvertParams'](_0x460663,_0x460663);const _0x4ed5ae=_0x460663[_0x42b82d(0x4d1)][_0x42b82d(0x306)](_0x2d258d=>$gameActors[_0x42b82d(0x505)](_0x2d258d)),_0x491947=_0x460663['Classes'],_0x50e65c=_0x460663[_0x42b82d(0x450)];for(const _0x305faf of _0x4ed5ae){if(!_0x305faf)continue;for(const _0x21f1c6 of _0x491947){_0x305faf[_0x42b82d(0x40d)](_0x50e65c,_0x21f1c6);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData['name'],'ClassPointsSet',_0x25b66b=>{const _0x1f6df1=_0x306cf5;VisuMZ[_0x1f6df1(0x309)](_0x25b66b,_0x25b66b);const _0x18649c=_0x25b66b[_0x1f6df1(0x4d1)]['map'](_0x18af1e=>$gameActors['actor'](_0x18af1e)),_0x875d89=_0x25b66b[_0x1f6df1(0x26c)],_0x2a847e=_0x25b66b[_0x1f6df1(0x450)];for(const _0x494884 of _0x18649c){if(_0x1f6df1(0x522)===_0x1f6df1(0x522)){if(!_0x494884)continue;for(const _0x7eb244 of _0x875d89){if(_0x1f6df1(0x226)===_0x1f6df1(0x45c)){const _0x59638b=this[_0x1f6df1(0x1c4)]();let _0x294d28=0x0;_0x5977d4['VisuMZ_0_CoreEngine']?_0x294d28=this[_0x1f6df1(0x4f2)][_0x1f6df1(0x1d9)](_0x33c980,!![]):_0x294d28=this['_actor']['param'](_0x3f3dbd);const _0x31e503=_0x294d28;this[_0x1f6df1(0x2fa)](_0x294d28,_0x30a1e6,_0x2fd223,_0x4cbbbe-_0x59638b,'right'),this['resetTextColor']();}else _0x494884['setClassPoints'](_0x2a847e,_0x7eb244);}}else{if(!_0x4472d7[_0x1f6df1(0x523)]())return;if(!this[_0x1f6df1(0x360)]()['isActor']())return;const _0x121ae8=_0x326702['ClassChangeSystem'][_0x1f6df1(0x510)][_0x1f6df1(0x2c4)];let _0x232faa=0x0;try{_0x232faa=_0x5d4662(_0x121ae8[_0x1f6df1(0x4c4)]);}catch(_0x113d2d){if(_0x8018a0[_0x1f6df1(0x3a3)]())_0x5aaf5f[_0x1f6df1(0x252)](_0x113d2d);}this[_0x1f6df1(0x360)]()[_0x1f6df1(0x29a)](_0x232faa);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x2b8),_0x311465=>{const _0x252913=_0x306cf5;VisuMZ[_0x252913(0x309)](_0x311465,_0x311465);const _0x30bff7=_0x311465[_0x252913(0x4d1)]['map'](_0x595982=>$gameActors[_0x252913(0x505)](_0x595982)),_0x1b2e98=_0x311465[_0x252913(0x26c)],_0xc43acd=_0x311465['Points'];for(const _0x13a815 of _0x30bff7){if(!_0x13a815)continue;for(const _0xb6d80e of _0x1b2e98){_0x252913(0x373)===_0x252913(0x4bc)?_0x586127[_0x252913(0x29a)](_0x2b97a7,_0xcd6085):_0x13a815['gainJobPoints'](_0xc43acd,_0xb6d80e);}}}),PluginManager['registerCommand'](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x29b),_0x36bc40=>{const _0x39ad71=_0x306cf5;VisuMZ[_0x39ad71(0x309)](_0x36bc40,_0x36bc40);const _0x2cb415=_0x36bc40[_0x39ad71(0x4d1)]['map'](_0x37e71c=>$gameActors[_0x39ad71(0x505)](_0x37e71c)),_0x28689f=_0x36bc40[_0x39ad71(0x26c)],_0x37fbcf=_0x36bc40[_0x39ad71(0x450)];for(const _0x15096c of _0x2cb415){if(!_0x15096c)continue;for(const _0x5356af of _0x28689f){_0x15096c[_0x39ad71(0x343)](_0x37fbcf,_0x5356af);}}}),PluginManager[_0x306cf5(0x2eb)](pluginData['name'],_0x306cf5(0x481),_0x3d6518=>{const _0x53753f=_0x306cf5;VisuMZ[_0x53753f(0x309)](_0x3d6518,_0x3d6518);const _0x4c9d4d=_0x3d6518['Actors'][_0x53753f(0x306)](_0x4df064=>$gameActors['actor'](_0x4df064)),_0x40720d=_0x3d6518[_0x53753f(0x26c)],_0x5deac6=_0x3d6518['Points'];for(const _0x2a44da of _0x4c9d4d){if(_0x53753f(0x35a)==='BRRRf')return this[_0x53753f(0x26d)];else{if(!_0x2a44da)continue;for(const _0x26948e of _0x40720d){if(_0x53753f(0x2b5)!=='weqID')return _0x430ab9-_0x1c8209;else _0x2a44da[_0x53753f(0x3b5)](_0x5deac6,_0x26948e);}}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x3ff),_0x85764f=>{const _0x4bdb69=_0x306cf5;VisuMZ[_0x4bdb69(0x309)](_0x85764f,_0x85764f);const _0x4f8036=_0x85764f[_0x4bdb69(0x4d1)][_0x4bdb69(0x306)](_0x521efa=>$gameActors[_0x4bdb69(0x505)](_0x521efa)),_0x558a09=_0x85764f[_0x4bdb69(0x26c)],_0x2dcba1=_0x85764f[_0x4bdb69(0x450)];for(const _0x53803b of _0x4f8036){if(!_0x53803b)continue;for(const _0xf0f6a6 of _0x558a09){if(_0x4bdb69(0x1ba)!==_0x4bdb69(0x514))_0x53803b[_0x4bdb69(0x45d)](_0x2dcba1,_0xf0f6a6);else{const _0xc6f436=_0x472bdd[_0x4e8e95],_0x393feb=_0xc6f436[_0x4bdb69(0x3a4)][0x0],_0x25c971=_0xc6f436[_0x4bdb69(0x3a4)][0x1],_0xc09536=_0xc6f436[_0x4bdb69(0x3a4)][0x2],_0x455f1c=_0xc6f436['expParams'][0x3];return _0x4383fd[_0x4bdb69(0x507)](_0x393feb*_0x1daf8b[_0x4bdb69(0x477)](_0x195516-0x1,0.9+_0xc09536/0xfa)*_0x5eabc8*(_0x44a896+0x1)/(0x6+_0x1bf52c[_0x4bdb69(0x477)](_0x211f55,0x2)/0x32/_0x455f1c)+(_0x149cd6-0x1)*_0x25c971);}}}}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],'SystemEnableClassChangeSystemMenu',_0x19b6f1=>{const _0x24ed41=_0x306cf5;VisuMZ[_0x24ed41(0x309)](_0x19b6f1,_0x19b6f1),$gameSystem[_0x24ed41(0x34e)](_0x19b6f1[_0x24ed41(0x362)]);}),PluginManager[_0x306cf5(0x2eb)](pluginData[_0x306cf5(0x1a7)],_0x306cf5(0x300),_0x2b5300=>{const _0x30cbd6=_0x306cf5;VisuMZ[_0x30cbd6(0x309)](_0x2b5300,_0x2b5300),$gameSystem[_0x30cbd6(0x28c)](_0x2b5300['Show']);}),VisuMZ['ClassChangeSystem'][_0x306cf5(0x234)]=function(){const _0x3b8448=_0x306cf5;try{}catch(_0xd30475){if(_0x3b8448(0x2a5)!==_0x3b8448(0x2a5))return _0xc26422[_0x3b8448(0x4f7)]?_0x429ed5[_0x3b8448(0x251)][_0x3b8448(0x510)][_0x3b8448(0x482)][_0x3b8448(0x2f4)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];else{if($gameTemp[_0x3b8448(0x3a3)]())console['log'](_0xd30475);}}},VisuMZ[_0x306cf5(0x3e0)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x306cf5(0x1fe)]['onDatabaseLoaded'],Scene_Boot[_0x306cf5(0x1fe)][_0x306cf5(0x1d5)]=function(){const _0x18d71f=_0x306cf5;VisuMZ[_0x18d71f(0x3e0)][_0x18d71f(0x263)][_0x18d71f(0x255)](this),this[_0x18d71f(0x272)]();},Scene_Boot[_0x306cf5(0x1fe)][_0x306cf5(0x272)]=function(){this['process_VisuMZ_ClassChangeSystem_Notetags']();},VisuMZ['ClassChangeSystem'][_0x306cf5(0x3c3)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},Scene_Boot[_0x306cf5(0x1fe)][_0x306cf5(0x2fc)]=function(){const _0x5b4c44=_0x306cf5;if(VisuMZ[_0x5b4c44(0x1b3)])return;for(const _0x8f34f of $dataActors){if(_0x5b4c44(0x1cb)===_0x5b4c44(0x3f7))return _0x2fb803[_0x5b4c44(0x3e0)][_0x5b4c44(0x510)]['Window'][_0x5b4c44(0x3cf)]||[];else{if(!_0x8f34f)continue;ImageManager['registerActorClassImages'](_0x8f34f);}}for(const _0x49f361 of $dataClasses){if(_0x5b4c44(0x288)!==_0x5b4c44(0x319)){if(!_0x49f361)continue;VisuMZ[_0x5b4c44(0x3e0)]['Parse_Notetags_Basic'](_0x49f361);}else{const _0x5a85d9=_0x2d83b9['loadPicture'](_0x457de7[_0x5b4c44(0x3ee)]()),_0x457ff8=this[_0x5b4c44(0x4e3)]-_0x5a85d9[_0x5b4c44(0x4e7)];_0x436946+=_0x457ff8/0x2;if(_0x457ff8<0x0)_0x47ff1d-=_0x457ff8;_0x463eeb[_0x5b4c44(0x1fe)][_0x5b4c44(0x2ec)][_0x5b4c44(0x255)](this,_0x5bcc0b,_0x19f082,_0x561401,_0x55ed45,_0x3aa991);}}},VisuMZ[_0x306cf5(0x3e0)]['JS']={},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x4e6)]=function(_0x5ef85b,_0x4270d1,_0x4569ca){const _0x6745e5=_0x306cf5,_0x1a2265=_0x5ef85b['note'];if(_0x1a2265['match'](_0x4569ca)){const _0x40f142=String(RegExp['$1']),_0x49ca07=_0x6745e5(0x397)[_0x6745e5(0x25d)](_0x40f142),_0x22d0c2=VisuMZ[_0x6745e5(0x3e0)]['createKeyJS'](_0x5ef85b,_0x4270d1);VisuMZ[_0x6745e5(0x3e0)]['JS'][_0x22d0c2]=new Function(_0x49ca07);}},VisuMZ['ClassChangeSystem'][_0x306cf5(0x408)]=function(_0x1f2563,_0x30657e){const _0x564078=_0x306cf5;let _0x340be9='';if($dataActors['includes'](_0x1f2563))_0x340be9='Actor-%1-%2'[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataClasses[_0x564078(0x1bc)](_0x1f2563))_0x340be9=_0x564078(0x205)[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataSkills[_0x564078(0x1bc)](_0x1f2563))_0x340be9=_0x564078(0x257)[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataItems[_0x564078(0x1bc)](_0x1f2563))_0x340be9='Item-%1-%2'[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataWeapons[_0x564078(0x1bc)](_0x1f2563))_0x340be9=_0x564078(0x3e2)[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataArmors[_0x564078(0x1bc)](_0x1f2563))_0x340be9=_0x564078(0x3be)[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);if($dataEnemies['includes'](_0x1f2563))_0x340be9=_0x564078(0x4f8)['format'](_0x1f2563['id'],_0x30657e);if($dataStates['includes'](_0x1f2563))_0x340be9=_0x564078(0x325)[_0x564078(0x25d)](_0x1f2563['id'],_0x30657e);return _0x340be9;},VisuMZ[_0x306cf5(0x3e0)]['ParseActorNotetags']=VisuMZ[_0x306cf5(0x37a)],VisuMZ['ParseActorNotetags']=function(_0x3527f7){const _0x58e5cd=_0x306cf5;VisuMZ[_0x58e5cd(0x3e0)][_0x58e5cd(0x37a)][_0x58e5cd(0x255)](this,_0x3527f7),ImageManager[_0x58e5cd(0x1ec)](_0x3527f7);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x37f)]=VisuMZ[_0x306cf5(0x37f)],VisuMZ[_0x306cf5(0x37f)]=function(_0x24398a){const _0x5bef0c=_0x306cf5;VisuMZ['ClassChangeSystem'][_0x5bef0c(0x37f)][_0x5bef0c(0x255)](this,_0x24398a),VisuMZ[_0x5bef0c(0x3e0)]['Parse_Notetags_Basic'](_0x24398a),VisuMZ['ClassChangeSystem']['Parse_ClassIcons'](_0x24398a);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x25f)]=function(_0x288490){const _0x1ad9c3=_0x306cf5;_0x288490[_0x1ad9c3(0x240)]=ImageManager[_0x1ad9c3(0x229)]||0x0,_0x288490[_0x1ad9c3(0x1b6)]=TextManager[_0x1ad9c3(0x22a)][_0x1ad9c3(0x25d)](_0x288490['name']||'');const _0x34d63a=VisuMZ['ClassChangeSystem'][_0x1ad9c3(0x3c3)],_0x29e8c5=_0x288490['note'];_0x29e8c5[_0x1ad9c3(0x260)](_0x34d63a[_0x1ad9c3(0x474)])&&(_0x1ad9c3(0x1d0)===_0x1ad9c3(0x1d0)?_0x288490[_0x1ad9c3(0x240)]=Number(RegExp['$1']):(_0x509d83[_0x1ad9c3(0x1a7)]=_0x12d17a[_0x1ad9c3(0x1a7)]['replace'](/\x1I\[(\d+)\]/gi,''),_0x55df39[_0x1ad9c3(0x1a7)]=_0x9b5737['name'][_0x1ad9c3(0x318)](/\\I\[(\d+)\]/gi,''))),_0x29e8c5[_0x1ad9c3(0x260)](_0x34d63a[_0x1ad9c3(0x43c)])&&(_0x1ad9c3(0x472)===_0x1ad9c3(0x32c)?this[_0x1ad9c3(0x293)][_0x50c24d]=_0x3c5837['getClassIdWithName'](_0x495665):_0x288490[_0x1ad9c3(0x1b6)]=String(RegExp['$1']));},VisuMZ['ClassChangeSystem'][_0x306cf5(0x400)]=function(_0x59d047){const _0x2d7117=_0x306cf5;_0x59d047['name'][_0x2d7117(0x260)](/\\I\[(\d+)\]/i)&&(_0x2d7117(0x2ed)!=='dYDSv'?_0x59d047[_0x2d7117(0x240)]=Number(RegExp['$1']):(this[_0x2d7117(0x2ae)]=_0x24b213,this[_0x2d7117(0x26d)]=_0x1c3266));if(Imported[_0x2d7117(0x4f7)]){if(VisuMZ[_0x2d7117(0x251)][_0x2d7117(0x510)]['UI'][_0x2d7117(0x1e9)]){if(_0x2d7117(0x31a)!==_0x2d7117(0x47d)){const _0x2e9f83='\x5cI[%1]%2';_0x59d047['name']=_0x2e9f83[_0x2d7117(0x25d)](_0x59d047[_0x2d7117(0x240)],_0x59d047[_0x2d7117(0x1a7)]);}else _0x4eafe1+=this[_0x2d7117(0x314)](),this[_0x2d7117(0x308)](_0x438785);}else _0x59d047[_0x2d7117(0x1a7)]=_0x59d047['name'][_0x2d7117(0x318)](/\x1I\[(\d+)\]/gi,''),_0x59d047[_0x2d7117(0x1a7)]=_0x59d047[_0x2d7117(0x1a7)][_0x2d7117(0x318)](/\\I\[(\d+)\]/gi,'');}},DataManager[_0x306cf5(0x519)]=function(_0x486494){const _0x295d46=_0x306cf5;if(!_0x486494)return[];let _0x1fbafd=[];return _0x1fbafd=_0x1fbafd[_0x295d46(0x202)](_0x486494[_0x295d46(0x2bb)]()[_0x295d46(0x306)](_0x47fabf=>_0x47fabf['id'])),_0x1fbafd=_0x1fbafd[_0x295d46(0x202)](_0x486494[_0x295d46(0x3e4)]()),_0x1fbafd=_0x1fbafd['concat']($gameParty['getUnlockedClasses']()),_0x1fbafd=_0x1fbafd[_0x295d46(0x202)](VisuMZ[_0x295d46(0x3e0)][_0x295d46(0x510)]['General']['AlwaysUnlocked']),_0x1fbafd=_0x1fbafd[_0x295d46(0x4b5)]((_0x2fec75,_0x2e55b4,_0x3437eb)=>_0x3437eb[_0x295d46(0x223)](_0x2fec75)===_0x2e55b4),_0x1fbafd[_0x295d46(0x228)](function(_0x3c09e0,_0x352df3){const _0x35120d=_0x295d46;if(_0x35120d(0x521)!==_0x35120d(0x521))this['process_VisuMZ_ClassChangeSystem_Notetags']();else return _0x3c09e0-_0x352df3;}),_0x1fbafd[_0x295d46(0x306)](_0x23f8e8=>$dataClasses[_0x23f8e8])[_0x295d46(0x495)](null);},DataManager[_0x306cf5(0x1e6)]=function(_0x27163b){const _0x308b5c=_0x306cf5,_0xdf7d8a=[],_0x240d95=DataManager[_0x308b5c(0x519)](_0x27163b);for(const _0x280ede of $dataClasses){if(!_0x280ede)continue;if(_0x240d95[_0x308b5c(0x1bc)](_0x280ede))continue;this[_0x308b5c(0x2c9)](_0x27163b,_0x280ede)&&_0xdf7d8a[_0x308b5c(0x3a6)](_0x280ede['id']);}return _0xdf7d8a;},DataManager[_0x306cf5(0x2c9)]=function(_0x4b63da,_0x5f23c7){const _0x4a57a6=_0x306cf5;if(!_0x4b63da)return![];if(!_0x5f23c7)return![];const _0x4e42c8=VisuMZ[_0x4a57a6(0x3e0)][_0x4a57a6(0x3c3)],_0x1028f4=_0x5f23c7['note'];if(_0x1028f4[_0x4a57a6(0x260)](_0x4e42c8[_0x4a57a6(0x3f4)])){if('jSMal'!=='jjHWc'){const _0x4df1ee=String(RegExp['$1'])[_0x4a57a6(0x500)](/[\r\n]+/);for(const _0x5be153 of _0x4df1ee){if(_0x4a57a6(0x378)===_0x4a57a6(0x1c6)){const _0xd7f339=_0x437d4f[_0x4a57a6(0x251)][_0x4a57a6(0x510)]['UI']['ParamArrow'];this[_0x4a57a6(0x2fa)](_0xd7f339,_0x4d9f05,_0xe7556f,_0x29b049,'center');}else{let _0x4d43af=0x0;if(_0x5be153['match'](/(.*):[ ](.*)/i)){if(_0x4a57a6(0x396)!==_0x4a57a6(0x396))this[_0x4a57a6(0x4d2)][_0x4a57a6(0x389)](_0x7857ab[_0x4a57a6(0x23e)]);else{const _0x12c29e=String(RegExp['$1']),_0x2a7d04=String(RegExp['$2']);if(_0x12c29e['match'](/CLASS[ ](\d+)/i))'BJqHN'!==_0x4a57a6(0x1cc)?_0x4c5baa=_0x37e679[_0x4a57a6(0x31b)](_0x1f52ad):_0x4d43af=Number(RegExp['$1']);else{if(_0x12c29e[_0x4a57a6(0x260)](/CLASS[ ](.*)/i))_0x4d43af=this[_0x4a57a6(0x31b)](RegExp['$1']);else{if(_0x12c29e[_0x4a57a6(0x260)](/\b(?:AP|CP|JP|SP)\b/i)){const _0x14d7cd=_0x12c29e[_0x4a57a6(0x367)]()['trim'](),_0x562dbb=Number(_0x2a7d04)||0x0;if(Imported[_0x4a57a6(0x3dd)]){if(_0x14d7cd==='AP'){const _0x56bf72=_0x4b63da[_0x4a57a6(0x20f)]();if(_0x56bf72<_0x562dbb)return![];}else{if(_0x14d7cd==='SP'){if(_0x4a57a6(0x2a4)===_0x4a57a6(0x2a4)){const _0x33078b=_0x4b63da[_0x4a57a6(0x473)]();if(_0x33078b<_0x562dbb)return![];}else{_0x276b8b[_0x4a57a6(0x309)](_0x20f14c,_0x47cfe6);const _0x13ab34=_0x30f47b[_0x4a57a6(0x26c)];for(const _0x446a2f of _0x13ab34){_0x159adb[_0x4a57a6(0x32f)](_0x446a2f);}}}}}if(Imported[_0x4a57a6(0x3b2)]){if(_0x14d7cd==='CP'){const _0x4e41d3=_0x4b63da[_0x4a57a6(0x431)]();if(_0x4e41d3<_0x562dbb)return![];}else{if(_0x14d7cd==='JP'){const _0xae818b=_0x4b63da[_0x4a57a6(0x328)]();if(_0xae818b<_0x562dbb)return![];}}}}}}if(_0x2a7d04['match'](/LEVEL[ ](\d+)/i)){if('TRTSP'!==_0x4a57a6(0x267)){const _0x589dfe=Number(RegExp['$1']);if(_0x4b63da[_0x4a57a6(0x353)](_0x4d43af)<_0x589dfe)return![];}else{if(!_0x5193ee[_0x4a57a6(0x3b2)])return;_0x38ed53>0x0&&(_0x176f81*=this[_0x4a57a6(0x2cb)]()),this[_0x4a57a6(0x243)](_0x5a4f34,'Class');}}else{if(_0x2a7d04[_0x4a57a6(0x260)](/(\d+)[ ]CP/i)){const _0x50f0cb=Number(RegExp['$1']);if(_0x4b63da['getClassPoints'](_0x4d43af)<_0x50f0cb)return![];}else{if(_0x2a7d04[_0x4a57a6(0x260)](/(\d+)[ ]JP/i)){const _0x31d86=Number(RegExp['$1']);if(_0x4b63da[_0x4a57a6(0x328)](_0x4d43af)<_0x31d86)return![];}else{if(_0x2a7d04[_0x4a57a6(0x260)](/(\d+)[ ]AP/i)){if('FRbXp'!==_0x4a57a6(0x3ae)){if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;const _0x1cf358=Number(RegExp['$1']);if(_0x4b63da[_0x4a57a6(0x20f)](_0x4d43af)<_0x1cf358)return![];}else _0x30ab96=_0x53ea82(_0x496dc8['$1']);}else{if(_0x2a7d04[_0x4a57a6(0x260)](/(\d+)[ ]SP/i)){if(_0x4a57a6(0x1fb)===_0x4a57a6(0x1fb)){const _0x4606f3=Number(RegExp['$1']);if(_0x4b63da[_0x4a57a6(0x473)](_0x4d43af)<_0x4606f3)return![];}else{if(_0x2de998==='AP'){const _0x250ed7=_0x396faa['getAbilityPoints']();if(_0x250ed7<_0x455bec)return![];}else{if(_0x23cbbd==='SP'){const _0x37c412=_0x3b61f6[_0x4a57a6(0x473)]();if(_0x37c412<_0x361c5c)return![];}}}}}}}}}}}}return!![];}else return this[_0x4a57a6(0x245)]()[_0x4a57a6(0x43a)]((_0x57ec0d,_0x2acd44)=>{const _0xb9f934=_0x4a57a6;return _0x2acd44&&_0x2acd44['note'][_0xb9f934(0x260)](_0x5f326e[_0xb9f934(0x3e0)][_0xb9f934(0x3c3)][_0xb9f934(0x338)])?_0x57ec0d*(_0x4b6027(_0x346e1f['$1'])*0.01):_0x57ec0d;},0x1);}return![];},DataManager[_0x306cf5(0x406)]=function(_0x49f42e){const _0x1005a4=_0x306cf5;if(!_0x49f42e)return[];const _0x3fdaaa=VisuMZ['ClassChangeSystem'][_0x1005a4(0x3c3)],_0x539b3b=_0x49f42e[_0x1005a4(0x4d3)];let _0x199397=[];const _0xcd53e0=_0x539b3b[_0x1005a4(0x260)](_0x3fdaaa[_0x1005a4(0x458)]);if(_0xcd53e0){for(const _0x5915ed of _0xcd53e0){if(_0x1005a4(0x3fe)!==_0x1005a4(0x326)){if(!_0x5915ed)continue;_0x5915ed[_0x1005a4(0x260)](_0x3fdaaa[_0x1005a4(0x458)]);const _0x191477=String(RegExp['$1'])[_0x1005a4(0x500)](',')[_0x1005a4(0x306)](_0x2c6556=>Number(_0x2c6556))['remove'](null)[_0x1005a4(0x495)](undefined)[_0x1005a4(0x495)](NaN);_0x199397=_0x199397[_0x1005a4(0x202)](_0x191477);}else{if(this[_0x1005a4(0x2a1)]())this[_0x1005a4(0x432)]=_0x1005a4(0x233);let _0x4a2c17=_0xf96066[_0x1005a4(0x3e0)][_0x1005a4(0x249)][_0x1005a4(0x255)](this,_0x33d928);if(this['isActor']())this['_multiclassCheck']=_0x121038;return _0x4a2c17;}}return _0x199397;}else{const _0x12cd4f=VisuMZ[_0x1005a4(0x3e0)][_0x1005a4(0x510)][_0x1005a4(0x2d8)][_0x1005a4(0x4c9)];return Array['from']({'length':_0x12cd4f},(_0x165643,_0x485427)=>_0x485427+0x1);}},DataManager[_0x306cf5(0x31b)]=function(_0x3a7cf9){const _0x703ab=_0x306cf5;_0x3a7cf9=_0x3a7cf9[_0x703ab(0x367)]()[_0x703ab(0x2c6)](),this[_0x703ab(0x4a4)]=this[_0x703ab(0x4a4)]||{};if(this[_0x703ab(0x4a4)][_0x3a7cf9])return this[_0x703ab(0x4a4)][_0x3a7cf9];for(const _0xffdc3c of $dataClasses){if(_0x703ab(0x287)!==_0x703ab(0x287))this['_helpWindow'][_0x703ab(0x430)](this['currentExt']());else{if(!_0xffdc3c)continue;let _0x892d3f=_0xffdc3c[_0x703ab(0x1a7)];_0x892d3f=_0x892d3f[_0x703ab(0x318)](/\x1I\[(\d+)\]/gi,''),_0x892d3f=_0x892d3f[_0x703ab(0x318)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x892d3f[_0x703ab(0x367)]()[_0x703ab(0x2c6)]()]=_0xffdc3c['id'];}}return this[_0x703ab(0x4a4)][_0x3a7cf9]||0x0;},ImageManager[_0x306cf5(0x238)]=VisuMZ[_0x306cf5(0x3e0)]['Settings'][_0x306cf5(0x2b4)][_0x306cf5(0x1fa)],ImageManager[_0x306cf5(0x34d)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2c4)][_0x306cf5(0x1fa)],ImageManager[_0x306cf5(0x229)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x4ae)][_0x306cf5(0x1fa)],ImageManager[_0x306cf5(0x4cb)]={},ImageManager['actorClassFaceIndex']={},ImageManager[_0x306cf5(0x2e7)]={},ImageManager[_0x306cf5(0x301)]={},ImageManager[_0x306cf5(0x3a9)]={},ImageManager[_0x306cf5(0x363)]={},ImageManager[_0x306cf5(0x471)]={},ImageManager['registerActorClassImages']=function(_0x222903){const _0xf8121f=_0x306cf5;if(!_0x222903)return;const _0x2c6349=VisuMZ[_0xf8121f(0x3e0)][_0xf8121f(0x3c3)],_0x213489=_0x222903[_0xf8121f(0x4d3)],_0x15cbe1=_0x222903['id'],_0x5b3417=_0x213489['match'](_0x2c6349[_0xf8121f(0x304)]);if(_0x5b3417)for(const _0x36a5fa of _0x5b3417){if(!_0x36a5fa)continue;_0x36a5fa['match'](_0x2c6349[_0xf8121f(0x304)]);const _0x34ceb5=String(RegExp['$1']),_0x366df7=String(RegExp['$2'])[_0xf8121f(0x2c6)](),_0xb0b775=Number(RegExp['$3']);let _0x43e56c=0x0;if(_0x34ceb5['match'](/CLASS[ ](\d+)/i))'vhTRb'!==_0xf8121f(0x46f)?(_0x24a000=this[_0xf8121f(0x4f2)][_0xf8121f(0x1d9)](_0x136846,![]),_0x1ce70e=this[_0xf8121f(0x4b4)]['paramValueByName'](_0x4153ce,![]),_0x2bdb76=_0x303492(this[_0xf8121f(0x4f2)]['paramValueByName'](_0x1ac49c,!![]))[_0xf8121f(0x260)](/([%％])/i)):_0x43e56c=Number(RegExp['$1']);else _0x34ceb5[_0xf8121f(0x260)](/CLASS[ ](.*)/i)?_0x43e56c=DataManager[_0xf8121f(0x31b)](RegExp['$1']):_0xf8121f(0x1a9)!=='pnmNq'?_0x43e56c=DataManager['getClassIdWithName'](_0x34ceb5):(this[_0xf8121f(0x457)](),this['updateHelp']());if(_0x43e56c>0x0){const _0x2ab022=_0xf8121f(0x436)['format'](_0x15cbe1,_0x43e56c);ImageManager['actorClassFaceName'][_0x2ab022]=_0x366df7,ImageManager[_0xf8121f(0x4d6)][_0x2ab022]=_0xb0b775;}}const _0x31fd16=_0x213489[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x2b9)]);if(_0x31fd16){if(_0xf8121f(0x23a)!==_0xf8121f(0x50e))for(const _0x349f51 of _0x31fd16){if(_0xf8121f(0x2e0)===_0xf8121f(0x2ff)){const _0x1040bf=this[_0xf8121f(0x246)](_0xa77254);let _0x1a4ef2=_0x1040bf['x']+this[_0xf8121f(0x1c4)](),_0x1adb96=_0x1040bf['y']+0x4,_0x4bde48=_0x1040bf[_0xf8121f(0x4e7)]-this['itemPadding']()*0x2,_0x198a36=_0x34bbe9[_0xf8121f(0x382)](this['lineHeight']()*0x3,_0x1040bf[_0xf8121f(0x1d4)])-0x4,_0x4961ff=_0x1999c6[_0xf8121f(0x382)](_0x4bde48,_0x198a36);const _0x2d0976=_0x4961ff/_0x9eb548[_0xf8121f(0x4e7)],_0xc0f48f=_0x4961ff/_0x3c992a['height'],_0x2a4d07=_0x517edb[_0xf8121f(0x382)](_0x2d0976,_0xc0f48f,0x1);let _0xeda858=_0x59f38a[_0xf8121f(0x507)](_0x98edbb[_0xf8121f(0x4e7)]*_0x2a4d07),_0x29a2a6=_0x3c7d4b[_0xf8121f(0x507)](_0x524a2a['height']*_0x2a4d07);_0x1a4ef2+=_0x6f39e6[_0xf8121f(0x507)]((_0x4961ff-_0xeda858)/0x2),_0x1adb96+=_0x1dff72[_0xf8121f(0x507)]((_0x4961ff-_0x29a2a6)/0x2);const _0x2a09c9=_0x252b30[_0xf8121f(0x4e7)],_0x531173=_0x1f52b1[_0xf8121f(0x1d4)];this[_0xf8121f(0x2b1)][_0xf8121f(0x2c5)][_0xf8121f(0x3d8)]=!![],this['contents'][_0xf8121f(0x250)](_0x4bd8a0,0x0,0x0,_0x2a09c9,_0x531173,_0x1a4ef2,_0x1adb96,_0xeda858,_0x29a2a6),this[_0xf8121f(0x2b1)][_0xf8121f(0x2c5)][_0xf8121f(0x3d8)]=!![];}else{if(!_0x349f51)continue;_0x349f51['match'](_0x2c6349['ClassCharaName']);const _0x2f7304=String(RegExp['$1']),_0x4b4b67=String(RegExp['$2'])['trim'](),_0x44ec12=Number(RegExp['$3']);let _0x2ab3e1=0x0;if(_0x2f7304[_0xf8121f(0x260)](/CLASS[ ](\d+)/i))_0x2ab3e1=Number(RegExp['$1']);else{if(_0x2f7304[_0xf8121f(0x260)](/CLASS[ ](.*)/i)){if(_0xf8121f(0x1ee)===_0xf8121f(0x1ee))_0x2ab3e1=DataManager[_0xf8121f(0x31b)](RegExp['$1']);else{if(!_0x54c500)return _0x2a1f7b;const _0xafdb66=_0xf8121f(0x436)[_0xf8121f(0x25d)](_0x1c708b[_0xf8121f(0x1d6)](),_0x5067df[_0xf8121f(0x426)]()['id']);return _0x18155e[_0xf8121f(0x4d6)][_0xafdb66]||_0x5a605d;}}else{if(_0xf8121f(0x1c8)!==_0xf8121f(0x1c8)){const _0x49954e=_0xb1fbc5(_0x227c8e['$1']);_0x21d0a4[_0xf8121f(0x29a)](_0x49954e);}else _0x2ab3e1=DataManager[_0xf8121f(0x31b)](_0x2f7304);}}if(_0x2ab3e1>0x0){if('DhfZW'!==_0xf8121f(0x3e7)){const _0x58e467=_0xf8121f(0x436)[_0xf8121f(0x25d)](_0x15cbe1,_0x2ab3e1);ImageManager[_0xf8121f(0x2e7)][_0x58e467]=_0x4b4b67,ImageManager['actorClassCharacterIndex'][_0x58e467]=_0x44ec12;}else _0x2d0f9b[_0xf8121f(0x352)](),this[_0xf8121f(0x4f2)][_0xf8121f(0x27a)](0x0,this[_0xf8121f(0x4e5)]()+0x1),this[_0xf8121f(0x345)](),_0x24539c['_scene']['_statusWindow'][_0xf8121f(0x345)]();}}}else try{return _0x40b3dc(_0x25ca0a['$1']);}catch(_0x646c2f){if(_0x281f8b[_0xf8121f(0x3a3)]())_0x1f0c19[_0xf8121f(0x252)](_0x646c2f);return 0x0;}}const _0xae19ab=_0x213489[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x344)]);if(_0xae19ab)for(const _0x291791 of _0xae19ab){if(_0xf8121f(0x1c7)!==_0xf8121f(0x1c7)){if(this['item']())this[_0xf8121f(0x51c)](_0x268df1);}else{if(!_0x291791)continue;_0x291791[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x344)]);const _0x3d0c6d=String(RegExp['$1']),_0x32ce09=String(RegExp['$2'])[_0xf8121f(0x2c6)]();let _0x32b7a7=0x0;if(_0x3d0c6d['match'](/CLASS[ ](\d+)/i)){if(_0xf8121f(0x1f1)==='KBmJX')_0x32b7a7=Number(RegExp['$1']);else return![];}else{if(_0x3d0c6d[_0xf8121f(0x260)](/CLASS[ ](.*)/i)){if('OUXbE'===_0xf8121f(0x50c))return _0x2cda33-_0x553ef5;else _0x32b7a7=DataManager['getClassIdWithName'](RegExp['$1']);}else _0x32b7a7=DataManager['getClassIdWithName'](_0x3d0c6d);}if(_0x32b7a7>0x0){const _0x4b70f4=_0xf8121f(0x436)['format'](_0x15cbe1,_0x32b7a7);ImageManager[_0xf8121f(0x3a9)][_0x4b70f4]=_0x32ce09;}}}const _0x38e15b=_0x213489[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x278)]);if(_0x38e15b)for(const _0x43d9d3 of _0x38e15b){if(_0xf8121f(0x320)===_0xf8121f(0x320)){if(!_0x43d9d3)continue;_0x43d9d3[_0xf8121f(0x260)](_0x2c6349['ClassMenuPortrait']);const _0x552459=String(RegExp['$1']),_0x3d9ed6=String(RegExp['$2'])[_0xf8121f(0x2c6)]();let _0x2e4c5e=0x0;if(_0x552459[_0xf8121f(0x260)](/CLASS[ ](\d+)/i)){if(_0xf8121f(0x281)!==_0xf8121f(0x2d5))_0x2e4c5e=Number(RegExp['$1']);else{const _0x58ccc6=_0xf8121f(0x436)[_0xf8121f(0x25d)](_0x17d9f3,_0x494aa3);_0x33b06f[_0xf8121f(0x4cb)][_0x58ccc6]=_0x1fa934,_0x3d8a4b[_0xf8121f(0x4d6)][_0x58ccc6]=_0x63eb30;}}else _0x552459[_0xf8121f(0x260)](/CLASS[ ](.*)/i)?_0x2e4c5e=DataManager[_0xf8121f(0x31b)](RegExp['$1']):_0x2e4c5e=DataManager[_0xf8121f(0x31b)](_0x552459);if(_0x2e4c5e>0x0){const _0x4a292b=_0xf8121f(0x436)[_0xf8121f(0x25d)](_0x15cbe1,_0x2e4c5e);ImageManager[_0xf8121f(0x363)][_0x4a292b]=_0x3d9ed6;}}else{if(this[_0xf8121f(0x26d)]!==_0x392886)return this['_priorityFaceIndex'];const _0x2c2646=_0x1d8993['getActorClassFaceIndex'](this);if(_0x2c2646!==_0x33f342)return _0x2c2646;return _0x5eeb39[_0xf8121f(0x3e0)]['Game_Actor_faceIndex']['call'](this);}}const _0x31c899=_0x213489[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x2bf)]);if(_0x31c899){if(_0xf8121f(0x3d2)===_0xf8121f(0x3d2))for(const _0x2696e0 of _0x31c899){if('cqars'!==_0xf8121f(0x2d2)){if(_0x4a3563[_0xf8121f(0x27b)]&&_0x160243[_0xf8121f(0x33d)]!==_0x5cb3cb)return _0xe4b700['uiInputPosition'];else{if(this[_0xf8121f(0x4e0)]())return this['updatedLayoutStyle']()['match'](/RIGHT/i);else _0x1dc442[_0xf8121f(0x1fe)][_0xf8121f(0x427)][_0xf8121f(0x255)](this);}}else{if(!_0x2696e0)continue;_0x2696e0[_0xf8121f(0x260)](_0x2c6349[_0xf8121f(0x2bf)]);const _0x9d8725=String(RegExp['$1']),_0x49ed08=String(RegExp['$2'])[_0xf8121f(0x2c6)]();let _0x13d7ba=0x0;if(_0x9d8725[_0xf8121f(0x260)](/CLASS[ ](\d+)/i))_0x13d7ba=Number(RegExp['$1']);else _0x9d8725[_0xf8121f(0x260)](/CLASS[ ](.*)/i)?_0x13d7ba=DataManager[_0xf8121f(0x31b)](RegExp['$1']):_0x13d7ba=DataManager[_0xf8121f(0x31b)](_0x9d8725);if(_0x13d7ba>0x0){const _0x3761e1='Actor-%1-Class-%2'['format'](_0x15cbe1,_0x13d7ba);ImageManager[_0xf8121f(0x471)][_0x3761e1]=_0x49ed08;}}}else this['changeTextColor'](_0x5acb2e[_0xf8121f(0x329)](_0x312a8e)),_0x3f01ae=(_0x5d76a3>0x0?_0xf8121f(0x1af):_0xf8121f(0x4dd))[_0xf8121f(0x25d)](_0x187a06),this['drawText'](_0x413300,_0x570bcb+_0x5b2729,_0x1738b2,_0xdf4186,'left');}},ImageManager['getActorClassFaceName']=function(_0x3cfaed){const _0x2c32e8=_0x306cf5;if(!_0x3cfaed)return'';const _0x4f3547=_0x2c32e8(0x436)[_0x2c32e8(0x25d)](_0x3cfaed[_0x2c32e8(0x1d6)](),_0x3cfaed[_0x2c32e8(0x426)]()['id']);return ImageManager[_0x2c32e8(0x4cb)][_0x4f3547]||'';},ImageManager[_0x306cf5(0x3d7)]=function(_0x275552){const _0x15f3ea=_0x306cf5;if(!_0x275552)return undefined;const _0x29a2a8=_0x15f3ea(0x436)['format'](_0x275552['actorId'](),_0x275552[_0x15f3ea(0x426)]()['id']);return ImageManager[_0x15f3ea(0x4d6)][_0x29a2a8]||undefined;},ImageManager[_0x306cf5(0x275)]=function(_0x4d29f9){const _0x268d9f=_0x306cf5;if(!_0x4d29f9)return'';const _0x52bf26='Actor-%1-Class-%2'[_0x268d9f(0x25d)](_0x4d29f9[_0x268d9f(0x1d6)](),_0x4d29f9[_0x268d9f(0x426)]()['id']);return ImageManager[_0x268d9f(0x2e7)][_0x52bf26]||'';},ImageManager['getActorClassCharacterIndex']=function(_0x56a654){const _0x550a4d=_0x306cf5;if(!_0x56a654)return undefined;const _0x3c853b='Actor-%1-Class-%2'['format'](_0x56a654[_0x550a4d(0x1d6)](),_0x56a654[_0x550a4d(0x426)]()['id']);return ImageManager[_0x550a4d(0x301)][_0x3c853b]||undefined;},ImageManager[_0x306cf5(0x2bd)]=function(_0x4d6115){const _0x5e54c8=_0x306cf5;if(!_0x4d6115)return'';const _0x584d35=_0x5e54c8(0x436)[_0x5e54c8(0x25d)](_0x4d6115[_0x5e54c8(0x1d6)](),_0x4d6115[_0x5e54c8(0x426)]()['id']);return ImageManager[_0x5e54c8(0x3a9)][_0x584d35]||'';},ImageManager[_0x306cf5(0x47b)]=function(_0x49d320){const _0x29592f=_0x306cf5;if(!_0x49d320)return'';const _0x44c6b5='Actor-%1-Class-%2'[_0x29592f(0x25d)](_0x49d320[_0x29592f(0x1d6)](),_0x49d320[_0x29592f(0x426)]()['id']);return ImageManager[_0x29592f(0x363)][_0x44c6b5]||'';},ImageManager[_0x306cf5(0x2e5)]=function(_0x50bca5){const _0x2d14b2=_0x306cf5;if(!_0x50bca5)return'';const _0x17b9c6=_0x2d14b2(0x436)['format'](_0x50bca5['actorId'](),_0x50bca5[_0x2d14b2(0x426)]()['id']);return ImageManager[_0x2d14b2(0x471)][_0x17b9c6]||'';},SoundManager[_0x306cf5(0x352)]=function(_0x25bfb4){const _0x1898fc=_0x306cf5;AudioManager['playStaticSe'](VisuMZ['ClassChangeSystem'][_0x1898fc(0x510)][_0x1898fc(0x22c)]);},TextManager[_0x306cf5(0x428)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x463)][_0x306cf5(0x3af)],TextManager[_0x306cf5(0x393)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2b4)][_0x306cf5(0x38b)],TextManager[_0x306cf5(0x48a)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2b4)]['AbbrText'],TextManager['classPointsFmt']=VisuMZ[_0x306cf5(0x3e0)]['Settings'][_0x306cf5(0x2b4)][_0x306cf5(0x38e)],TextManager[_0x306cf5(0x265)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2c4)][_0x306cf5(0x38b)],TextManager[_0x306cf5(0x380)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2c4)][_0x306cf5(0x44f)],TextManager[_0x306cf5(0x49e)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x2c4)][_0x306cf5(0x38e)],TextManager[_0x306cf5(0x22a)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x4ae)][_0x306cf5(0x4bb)],TextManager[_0x306cf5(0x330)]=VisuMZ['ClassChangeSystem'][_0x306cf5(0x510)][_0x306cf5(0x4a8)][_0x306cf5(0x3e8)],TextManager[_0x306cf5(0x41b)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x4a8)][_0x306cf5(0x1b7)],TextManager[_0x306cf5(0x23b)]=VisuMZ['ClassChangeSystem'][_0x306cf5(0x510)][_0x306cf5(0x4a8)]['VocabUnassignClass'],TextManager[_0x306cf5(0x23e)]=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x4a8)][_0x306cf5(0x3c7)],ColorManager[_0x306cf5(0x417)]=function(_0x26da40){const _0x566f3a=_0x306cf5;_0x26da40=String(_0x26da40);if(_0x26da40[_0x566f3a(0x260)](/#(.*)/i))return _0x566f3a(0x1e0)[_0x566f3a(0x25d)](String(RegExp['$1']));else{if('sBiKe'!==_0x566f3a(0x35f)){if(this['_ClassChangeSystem_MainMenu']===_0x55a61b)this['initClassChangeSystem']();return this['_ClassChangeSystem_MainMenu'][_0x566f3a(0x451)];}else return this[_0x566f3a(0x1c1)](Number(_0x26da40));}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x2a7)]=BattleManager[_0x306cf5(0x2d3)],BattleManager['makeRewards']=function(){const _0x24224b=_0x306cf5;VisuMZ['ClassChangeSystem'][_0x24224b(0x2a7)][_0x24224b(0x255)](this),this[_0x24224b(0x459)](),this[_0x24224b(0x2ee)](),this[_0x24224b(0x3b3)](),this[_0x24224b(0x2d0)]();},VisuMZ[_0x306cf5(0x3e0)]['BattleManager_displayRewards']=BattleManager[_0x306cf5(0x259)],BattleManager[_0x306cf5(0x259)]=function(){const _0x219af2=_0x306cf5;VisuMZ[_0x219af2(0x3e0)]['BattleManager_displayRewards'][_0x219af2(0x255)](this),this['displayRewardsClassPoints'](),this[_0x219af2(0x483)]();},VisuMZ['ClassChangeSystem'][_0x306cf5(0x479)]=BattleManager[_0x306cf5(0x4a2)],BattleManager[_0x306cf5(0x4a2)]=function(){const _0x59782c=_0x306cf5;VisuMZ[_0x59782c(0x3e0)]['BattleManager_gainExp']['call'](this);const _0x572697=this[_0x59782c(0x480)][_0x59782c(0x4c6)];for(const _0x267854 of $gameParty[_0x59782c(0x28a)]()){_0x267854[_0x59782c(0x452)](_0x572697);}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x468)]=BattleManager[_0x306cf5(0x497)],BattleManager['endBattle']=function(_0x44446a){const _0x56839c=_0x306cf5;VisuMZ[_0x56839c(0x3e0)]['BattleManager_endBattle']['call'](this,_0x44446a);for(const _0x220eac of $gameParty[_0x56839c(0x28a)]()){_0x220eac['checkForAutoClassUnlocks']();}},BattleManager[_0x306cf5(0x459)]=function(){const _0x1be914=_0x306cf5;this[_0x1be914(0x480)][_0x1be914(0x51f)]=$gameTroop[_0x1be914(0x508)]();},BattleManager[_0x306cf5(0x456)]=function(){const _0x4ae0d9=_0x306cf5;if(!this['classPointsVisible']())return;$gameMessage[_0x4ae0d9(0x3b6)]();const _0x7f3a2b=$gameParty[_0x4ae0d9(0x517)](),_0x57255f=VisuMZ['ClassChangeSystem'][_0x4ae0d9(0x510)]['ClassPoints'],_0x59292f=_0x57255f[_0x4ae0d9(0x2c2)];for(const _0x356163 of _0x7f3a2b){if(_0x4ae0d9(0x29f)!==_0x4ae0d9(0x29f)){_0x1b0442[_0x4ae0d9(0x3e0)]['Scene_Menu_createCommandWindow'][_0x4ae0d9(0x255)](this);const _0x4e1d69=this[_0x4ae0d9(0x315)];_0x4e1d69['setHandler'](_0x4ae0d9(0x3e0),this[_0x4ae0d9(0x1d3)][_0x4ae0d9(0x313)](this));}else{if(!_0x356163)continue;const _0x304505=_0x59292f['format'](_0x356163['name'](),_0x356163[_0x4ae0d9(0x33b)](),TextManager[_0x4ae0d9(0x48a)],TextManager[_0x4ae0d9(0x1bb)]);$gameMessage[_0x4ae0d9(0x42a)]('\x5c.'+_0x304505);}}},BattleManager['gainRewardsClassPoints']=function(){const _0x208a7e=_0x306cf5;this[_0x208a7e(0x480)]['classPoints']=this[_0x208a7e(0x480)][_0x208a7e(0x51f)]||0x0;let _0xe29c23=$gameParty[_0x208a7e(0x28a)]();VisuMZ[_0x208a7e(0x3e0)][_0x208a7e(0x510)][_0x208a7e(0x2b4)][_0x208a7e(0x4c2)]&&(_0xe29c23=_0xe29c23[_0x208a7e(0x4b5)](_0x5d4cee=>_0x5d4cee[_0x208a7e(0x290)]()));for(const _0x1659f7 of _0xe29c23){if(!_0x1659f7)continue;if(!$dataSystem[_0x208a7e(0x1f7)]&&!_0x1659f7[_0x208a7e(0x449)]())continue;_0x1659f7['gainClassPoints'](this[_0x208a7e(0x480)]['classPoints']),_0x1659f7[_0x208a7e(0x4ba)](this['_rewards']['classPoints']);}},BattleManager[_0x306cf5(0x3f9)]=function(){const _0x50c8e8=_0x306cf5;return VisuMZ[_0x50c8e8(0x3e0)][_0x50c8e8(0x510)][_0x50c8e8(0x2b4)]['ShowVictory'];},BattleManager[_0x306cf5(0x3b3)]=function(){const _0x5d5c53=_0x306cf5;this[_0x5d5c53(0x480)][_0x5d5c53(0x2a2)]=$gameTroop['jobPointsTotal']();},BattleManager[_0x306cf5(0x483)]=function(){const _0x157ce0=_0x306cf5;if(!this[_0x157ce0(0x337)]())return;$gameMessage[_0x157ce0(0x3b6)]();const _0x261c2c=$gameParty[_0x157ce0(0x517)](),_0x12a088=VisuMZ[_0x157ce0(0x3e0)][_0x157ce0(0x510)][_0x157ce0(0x2c4)],_0x4a44ef=_0x12a088[_0x157ce0(0x2c2)];for(const _0x5a492a of _0x261c2c){if(_0x157ce0(0x283)===_0x157ce0(0x283)){if(!_0x5a492a)continue;const _0x10dacf=_0x4a44ef[_0x157ce0(0x25d)](_0x5a492a[_0x157ce0(0x1a7)](),_0x5a492a[_0x157ce0(0x462)](),TextManager['jobPointsAbbr'],TextManager['jobPointsFmt']);$gameMessage[_0x157ce0(0x42a)]('\x5c.'+_0x10dacf);}else{const _0x448077=this[_0x157ce0(0x43e)]();this[_0x157ce0(0x299)](_0x16211f[_0x157ce0(0x4b2)]());if(_0x47fc53[_0x157ce0(0x4f7)]){const _0x4036bf=_0x426a4b['CoreEngine']['Settings']['UI'][_0x157ce0(0x4f5)];this[_0x157ce0(0x2fa)](_0x4036bf,_0x4cf96c,_0x186b5b,_0x448077,_0x157ce0(0x460));}else this[_0x157ce0(0x2fa)]('→',_0xc7f6df,_0x27cb79,_0x448077,'center');}}},BattleManager[_0x306cf5(0x2d0)]=function(){const _0x599abd=_0x306cf5;this[_0x599abd(0x480)][_0x599abd(0x2a2)]=this[_0x599abd(0x480)]['jobPoints']||0x0;let _0x4dbcf6=$gameParty[_0x599abd(0x28a)]();VisuMZ['ClassChangeSystem'][_0x599abd(0x510)]['JobPoints'][_0x599abd(0x4c2)]&&('FygmC'===_0x599abd(0x4a3)?this[_0x599abd(0x4f0)]&&this[_0x599abd(0x2a1)]()&&_0x1c0720[_0x599abd(0x523)]()?this[_0x599abd(0x1ab)]=(this[_0x599abd(0x1ab)]+_0x235a3a)['clamp'](0x0,this[_0x599abd(0x503)]()):_0x2c0712['ClassChangeSystem']['Game_Battler_gainSilentTp'][_0x599abd(0x255)](this,_0x2bde25):_0x4dbcf6=_0x4dbcf6[_0x599abd(0x4b5)](_0x51ce00=>_0x51ce00[_0x599abd(0x290)]()));for(const _0x45589c of _0x4dbcf6){if(!_0x45589c)continue;if(!$dataSystem[_0x599abd(0x1f7)]&&!_0x45589c[_0x599abd(0x449)]())continue;_0x45589c[_0x599abd(0x29a)](this[_0x599abd(0x480)][_0x599abd(0x2a2)]),_0x45589c[_0x599abd(0x1a3)](this[_0x599abd(0x480)][_0x599abd(0x2a2)]);}},BattleManager[_0x306cf5(0x337)]=function(){const _0x176bb9=_0x306cf5;return VisuMZ['ClassChangeSystem'][_0x176bb9(0x510)][_0x176bb9(0x2c4)][_0x176bb9(0x45b)];},VisuMZ[_0x306cf5(0x3e0)]['Game_System_initialize']=Game_System[_0x306cf5(0x1fe)][_0x306cf5(0x3b1)],Game_System['prototype']['initialize']=function(){const _0x12de52=_0x306cf5;VisuMZ[_0x12de52(0x3e0)][_0x12de52(0x351)][_0x12de52(0x255)](this),this['initClassChangeSystemMainMenu']();},Game_System[_0x306cf5(0x1fe)][_0x306cf5(0x369)]=function(){const _0x4ae1cf=_0x306cf5;this[_0x4ae1cf(0x19a)]={'shown':VisuMZ[_0x4ae1cf(0x3e0)][_0x4ae1cf(0x510)][_0x4ae1cf(0x463)]['ShowMainMenu'],'enabled':VisuMZ['ClassChangeSystem'][_0x4ae1cf(0x510)][_0x4ae1cf(0x463)][_0x4ae1cf(0x322)]};},Game_System[_0x306cf5(0x1fe)][_0x306cf5(0x3d6)]=function(){const _0x249d40=_0x306cf5;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x249d40(0x20e)]();return this[_0x249d40(0x19a)][_0x249d40(0x36e)];},Game_System[_0x306cf5(0x1fe)][_0x306cf5(0x28c)]=function(_0x10e31c){const _0x24d3a8=_0x306cf5;if(this[_0x24d3a8(0x19a)]===undefined)this[_0x24d3a8(0x20e)]();this['_ClassChangeSystem_MainMenu'][_0x24d3a8(0x36e)]=_0x10e31c;},Game_System[_0x306cf5(0x1fe)]['isMainMenuClassChangeSystemEnabled']=function(){const _0x252c7b=_0x306cf5;if(this['_ClassChangeSystem_MainMenu']===undefined)this['initClassChangeSystem']();return this['_ClassChangeSystem_MainMenu'][_0x252c7b(0x451)];},Game_System[_0x306cf5(0x1fe)][_0x306cf5(0x34e)]=function(_0x397088){const _0x1b967d=_0x306cf5;if(this[_0x1b967d(0x19a)]===undefined)this[_0x1b967d(0x20e)]();this[_0x1b967d(0x19a)][_0x1b967d(0x451)]=_0x397088;},VisuMZ[_0x306cf5(0x3e0)]['Game_Action_applyItemUserEffect']=Game_Action['prototype'][_0x306cf5(0x3b0)],Game_Action['prototype']['applyItemUserEffect']=function(_0xd6e7fe){const _0x3ce581=_0x306cf5;VisuMZ[_0x3ce581(0x3e0)][_0x3ce581(0x4da)][_0x3ce581(0x255)](this,_0xd6e7fe),this['applyClassChangeSystemUserEffect'](_0xd6e7fe);},Game_Action[_0x306cf5(0x1fe)]['applyClassChangeSystemUserEffect']=function(_0x4b35fb){const _0x3dc11c=_0x306cf5;if(this[_0x3dc11c(0x286)]())this['applyItemClassChangeSystemUserEffect'](_0x4b35fb);},Game_Action[_0x306cf5(0x1fe)][_0x306cf5(0x51c)]=function(_0x12576f){const _0x191d07=_0x306cf5,_0x46c11a=VisuMZ[_0x191d07(0x3e0)]['RegExp'],_0x2eb76a=this[_0x191d07(0x286)]()[_0x191d07(0x4d3)];if($gameParty[_0x191d07(0x523)]()){if(this[_0x191d07(0x360)]()['isActor']()&&_0x2eb76a[_0x191d07(0x260)](_0x46c11a['UserGainClassPoints'])){const _0x452f63=eval(RegExp['$1']);this[_0x191d07(0x360)]()[_0x191d07(0x487)](_0x452f63);}else this[_0x191d07(0x27e)]();if(_0x12576f[_0x191d07(0x2a1)]()&&_0x2eb76a[_0x191d07(0x260)](_0x46c11a[_0x191d07(0x511)])){if(_0x191d07(0x366)===_0x191d07(0x366)){const _0x304916=eval(RegExp['$1']);_0x12576f[_0x191d07(0x487)](_0x304916);}else _0x2c0419[_0x191d07(0x311)](++_0x364f68,0x0,_0x5eaae9);}}if($gameParty[_0x191d07(0x523)]()){if(this[_0x191d07(0x360)]()['isActor']()&&_0x2eb76a['match'](_0x46c11a['UserGainJobPoints'])){if(_0x191d07(0x42f)!=='Hlatq')this[_0x191d07(0x3f3)]=this['getClassPoints'](),this['_earnedJobPoints']=this[_0x191d07(0x328)]();else{const _0x4a9883=eval(RegExp['$1']);this[_0x191d07(0x360)]()[_0x191d07(0x29a)](_0x4a9883);}}else this[_0x191d07(0x26a)]();if(_0x12576f[_0x191d07(0x2a1)]()&&_0x2eb76a[_0x191d07(0x260)](_0x46c11a[_0x191d07(0x492)])){if(_0x191d07(0x216)===_0x191d07(0x216)){const _0x263784=eval(RegExp['$1']);_0x12576f[_0x191d07(0x29a)](_0x263784);}else{if(_0x4a8c5b[_0x191d07(0x3a3)]())_0x27ac84[_0x191d07(0x252)](_0x203774);return 0x0;}}}if(_0x2eb76a[_0x191d07(0x260)](/<NOTETAG>/i)){}},Game_Action[_0x306cf5(0x1fe)]['applyClassPoints']=function(){const _0x2069de=_0x306cf5;if(!$gameParty['inBattle']())return;if(!this[_0x2069de(0x360)]()[_0x2069de(0x2a1)]())return;const _0x5c9a7e=VisuMZ[_0x2069de(0x3e0)][_0x2069de(0x510)][_0x2069de(0x2b4)];let _0x2ceb07=0x0;try{_0x2ceb07=eval(_0x5c9a7e[_0x2069de(0x4c4)]);}catch(_0x279abb){if($gameTemp['isPlaytest']())console[_0x2069de(0x252)](_0x279abb);}this[_0x2069de(0x360)]()[_0x2069de(0x487)](_0x2ceb07);},Game_Action[_0x306cf5(0x1fe)][_0x306cf5(0x26a)]=function(){const _0x32cb5f=_0x306cf5;if(!$gameParty['inBattle']())return;if(!this['subject']()[_0x32cb5f(0x2a1)]())return;const _0x362da2=VisuMZ[_0x32cb5f(0x3e0)][_0x32cb5f(0x510)][_0x32cb5f(0x2c4)];let _0x1e00a9=0x0;try{_0x1e00a9=eval(_0x362da2[_0x32cb5f(0x4c4)]);}catch(_0x5b7957){if(_0x32cb5f(0x48c)!==_0x32cb5f(0x48c))_0x2afc04=this[_0x32cb5f(0x31b)](_0x495fe7['$1']);else{if($gameTemp[_0x32cb5f(0x3a3)]())console[_0x32cb5f(0x252)](_0x5b7957);}}this[_0x32cb5f(0x360)]()[_0x32cb5f(0x29a)](_0x1e00a9);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x390)]=Game_Battler['prototype'][_0x306cf5(0x2e1)],Game_Battler[_0x306cf5(0x1fe)][_0x306cf5(0x2e1)]=function(_0x5b2ea6){const _0x2250f3=_0x306cf5;this['_cache']&&this['isActor']()&&$gameParty[_0x2250f3(0x523)]()?_0x2250f3(0x49f)!==_0x2250f3(0x4c0)?this['_tp']=(this[_0x2250f3(0x1ab)]+_0x5b2ea6)[_0x2250f3(0x4b6)](0x0,this['maxTp']()):(_0x51aec5[_0x2250f3(0x3e0)][_0x2250f3(0x3d4)][_0x2250f3(0x255)](this),this[_0x2250f3(0x456)](),this[_0x2250f3(0x483)]()):VisuMZ[_0x2250f3(0x3e0)][_0x2250f3(0x390)][_0x2250f3(0x255)](this,_0x5b2ea6);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x39a)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x513)],Game_Actor[_0x306cf5(0x1fe)]['equips']=function(){const _0x4d75c5=_0x306cf5;if(VisuMZ['ClassChangeSystem']['antiEquipsCacheClear_BattleCore_ClassChangeSystem'](this))return VisuMZ[_0x4d75c5(0x327)][_0x4d75c5(0x39a)]['call'](this);else{if('GozVf'!==_0x4d75c5(0x3e1))this['contents']['gradientFillRect'](_0x42e87e['x'],_0x3ac12e['y'],_0x56ff7e,_0x42f8a1,_0x233858,_0x50441d),this[_0x4d75c5(0x2b1)][_0x4d75c5(0x3ec)](_0x1fad9d['x']+_0x401171,_0x391954['y'],_0x57a836,_0x17a5f6,_0x50ea72,_0x2a185d);else return VisuMZ[_0x4d75c5(0x3e0)][_0x4d75c5(0x39a)][_0x4d75c5(0x255)](this);}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x2ca)]=function(_0x59cb22){const _0xc4298b=_0x306cf5;return Imported[_0xc4298b(0x416)]&&_0x59cb22[_0xc4298b(0x2a1)]()&&_0x59cb22[_0xc4298b(0x432)]!==undefined&&_0x59cb22===BattleManager['_subject']&&$gameParty[_0xc4298b(0x523)]();},VisuMZ[_0x306cf5(0x3e0)]['Game_Battler_onBattleStart']=Game_Battler[_0x306cf5(0x1fe)][_0x306cf5(0x377)],Game_Battler[_0x306cf5(0x1fe)][_0x306cf5(0x377)]=function(_0x313d0b){const _0xff58bd=_0x306cf5;VisuMZ[_0xff58bd(0x3e0)]['Game_Battler_onBattleStart']['call'](this,_0x313d0b),this['isActor']()&&(this['_earnedClassPoints']=this[_0xff58bd(0x431)](),this[_0xff58bd(0x512)]=this[_0xff58bd(0x328)]());},Game_Actor['CLASS_CHANGE_ADJUST_HP_MP']=VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x510)][_0x306cf5(0x4ae)]['ChangeAdjusHpMp'],VisuMZ[_0x306cf5(0x3e0)]['Game_Actor_setup']=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1a6)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1a6)]=function(_0x11b9da){const _0x138ec8=_0x306cf5;VisuMZ['ClassChangeSystem'][_0x138ec8(0x26e)]['call'](this,_0x11b9da),this[_0x138ec8(0x211)](),this[_0x138ec8(0x3cd)](),this[_0x138ec8(0x248)](),this[_0x138ec8(0x276)](),this[_0x138ec8(0x2aa)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2aa)]=function(){const _0x127078=_0x306cf5;this[_0x127078(0x222)](),this['initMulticlass'](),this[_0x127078(0x502)](),this['initClassChangeRestrictions'](),this[_0x127078(0x1e4)](),this[_0x127078(0x345)](),this[_0x127078(0x24c)](),this['recoverAll']();},VisuMZ['ClassChangeSystem'][_0x306cf5(0x307)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x221)],Game_Actor['prototype'][_0x306cf5(0x221)]=function(_0x3024fd,_0x510c22){const _0x26073c=_0x306cf5;_0x510c22=this['maintainLevels']();_0x510c22&&(this[_0x26073c(0x30c)]=this[_0x26073c(0x30c)]||{},this[_0x26073c(0x30c)][_0x3024fd]=this[_0x26073c(0x30c)][this[_0x26073c(0x1df)]]||0x0,_0x510c22=![]);this[_0x26073c(0x4c5)]=!![];const _0xb4f460=JsonEx['makeDeepCopy'](this);_0xb4f460[_0x26073c(0x4b4)]=!![],VisuMZ[_0x26073c(0x3e0)][_0x26073c(0x307)][_0x26073c(0x255)](this,_0x3024fd,_0x510c22),this['classAdjustHpMp'](_0xb4f460),this['checkMulticlasses'](),this[_0x26073c(0x42c)](_0x3024fd),this['_ClassChangeSystem_preventLevelUpGain']=undefined;if($gamePlayer)$gamePlayer[_0x26073c(0x345)]();},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x24f)]=Game_Actor['prototype'][_0x306cf5(0x386)],Game_Actor[_0x306cf5(0x1fe)]['tradeItemWithParty']=function(_0x3f59d5,_0x411811){const _0xff75af=_0x306cf5;if(this[_0xff75af(0x4b4)])return![];return VisuMZ[_0xff75af(0x3e0)][_0xff75af(0x24f)][_0xff75af(0x255)](this,_0x3f59d5,_0x411811);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x47e)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3f1)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3f1)]=function(_0xc99b2b){const _0x340f82=_0x306cf5;if($gameParty[_0x340f82(0x523)]())return;VisuMZ[_0x340f82(0x3e0)][_0x340f82(0x47e)][_0x340f82(0x255)](this,_0xc99b2b);},VisuMZ[_0x306cf5(0x3e0)]['Game_Actor_levelUp']=Game_Actor[_0x306cf5(0x1fe)]['levelUp'],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1e7)]=function(){const _0x4c6303=_0x306cf5;VisuMZ[_0x4c6303(0x3e0)][_0x4c6303(0x409)][_0x4c6303(0x255)](this);const _0x11c4ce=this[_0x4c6303(0x426)]()['id'];this['levelUpGainClassPoints'](_0x11c4ce),this[_0x4c6303(0x391)](_0x11c4ce),this[_0x4c6303(0x516)]=this[_0x4c6303(0x516)]||{},this[_0x4c6303(0x516)][_0x11c4ce]=this[_0x4c6303(0x3f0)],this[_0x4c6303(0x1b1)]()&&this[_0x4c6303(0x1e4)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3f8)]=function(_0xec16b7){const _0xeaec00=_0x306cf5;if(!Game_Actor['CLASS_CHANGE_ADJUST_HP_MP'])return;const _0x43f521=Math[_0xeaec00(0x507)](_0xec16b7['hpRate']()*this['mhp']),_0x2bc41b=Math[_0xeaec00(0x507)](_0xec16b7[_0xeaec00(0x44c)]()*this['mmp']);if(this['hp']>0x0)this[_0xeaec00(0x214)](_0x43f521);if(this['mp']>0x0)this[_0xeaec00(0x19f)](_0x2bc41b);},Game_Actor[_0x306cf5(0x1fe)]['initClassPoints']=function(){const _0x340bce=_0x306cf5;this[_0x340bce(0x403)]={};},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3cd)]=function(){const _0x1c0b09=_0x306cf5,_0x40fae6=VisuMZ[_0x1c0b09(0x3e0)][_0x1c0b09(0x3c3)],_0x20316d=this['actor']()[_0x1c0b09(0x4d3)];if(_0x20316d[_0x1c0b09(0x260)](_0x40fae6[_0x1c0b09(0x269)])){if('WNeHx'!==_0x1c0b09(0x1ef)){const _0x5cec66=eval(RegExp['$1']);this['gainClassPoints'](_0x5cec66);}else return this[_0x1c0b09(0x1d1)]&&this[_0x1c0b09(0x1d1)][_0x1c0b09(0x418)];}const _0x481d35=VisuMZ[_0x1c0b09(0x3e0)]['Settings'][_0x1c0b09(0x2b4)];if(!_0x481d35[_0x1c0b09(0x2fe)])return;const _0x47d4e2=_0x20316d[_0x1c0b09(0x260)](_0x40fae6['StartClassClassPoints']);if(_0x47d4e2){if(_0x1c0b09(0x3c1)!==_0x1c0b09(0x3c1))this[_0x1c0b09(0x293)][_0x59ad1a]===_0x1b56bf&&(this[_0x1c0b09(0x293)][_0x3c4d70]=0x0);else for(const _0x433c6b of _0x47d4e2){if(_0x1c0b09(0x4ad)==='jMNgT')_0x55eebf=_0x42c333['filter'](_0xd69c1c=>_0xd69c1c[_0x1c0b09(0x290)]());else{if(!_0x433c6b)continue;_0x433c6b[_0x1c0b09(0x260)](_0x40fae6[_0x1c0b09(0x331)]);const _0x38d55b=String(RegExp['$1']),_0x1e4783=eval(RegExp['$2']),_0x5e3264=/^\d+$/[_0x1c0b09(0x4d8)](_0x38d55b);let _0x18618a=0x0;_0x5e3264?_0x1c0b09(0x271)!==_0x1c0b09(0x271)?_0x16e9d3=_0x30e034(_0x36c974['$1']):_0x18618a=Number(_0x38d55b):_0x18618a=DataManager[_0x1c0b09(0x31b)](_0x38d55b),this[_0x1c0b09(0x487)](_0x1e4783,_0x18618a);}}}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x431)]=function(_0x455e49){const _0x23c62e=_0x306cf5;this[_0x23c62e(0x403)]===undefined&&this['initClassPoints']();const _0x1ba309=VisuMZ['ClassChangeSystem'][_0x23c62e(0x510)][_0x23c62e(0x2b4)];if(_0x1ba309[_0x23c62e(0x2fe)]){if(_0x23c62e(0x2f2)!==_0x23c62e(0x4c8))_0x455e49=0x0;else{const _0x1516d8=_0x1cff2d['ClassChangeSystem'][_0x23c62e(0x510)][_0x23c62e(0x4a8)];if(_0x1516d8['Window_ClassTier_RectJS'])return _0x1516d8['Window_ClassTier_RectJS'][_0x23c62e(0x255)](this);const _0x6726ef=_0x230012['boxWidth']-this[_0x23c62e(0x3df)][_0x23c62e(0x4e7)],_0x30ae3b=this['mainAreaHeight'](),_0x2c5e5d=this['isRightInputMode']()?_0x6726ef:0x0,_0x30bf01=this[_0x23c62e(0x448)]();return new _0x2692eb(_0x2c5e5d,_0x30bf01,_0x6726ef,_0x30ae3b);}}else _0x455e49=_0x455e49||this[_0x23c62e(0x426)]()['id'];return this[_0x23c62e(0x403)][_0x455e49]=this[_0x23c62e(0x403)][_0x455e49]||0x0,Math['round'](this[_0x23c62e(0x403)][_0x455e49]);},Game_Actor[_0x306cf5(0x1fe)]['setClassPoints']=function(_0x30d2eb,_0x340700){const _0x1c9504=_0x306cf5;this['_classPoints']===undefined&&this[_0x1c9504(0x211)]();const _0x4a94a2=VisuMZ[_0x1c9504(0x3e0)][_0x1c9504(0x510)]['ClassPoints'];_0x4a94a2[_0x1c9504(0x2fe)]?_0x1c9504(0x36a)===_0x1c9504(0x509)?(_0x535753[_0x1c9504(0x1fe)][_0x1c9504(0x3b1)][_0x1c9504(0x255)](this,_0xda657e),this['deselect'](),this[_0x1c9504(0x200)]()):_0x340700=0x0:_0x340700=_0x340700||this[_0x1c9504(0x426)]()['id'];this[_0x1c9504(0x403)][_0x340700]=this[_0x1c9504(0x403)][_0x340700]||0x0,this[_0x1c9504(0x403)][_0x340700]=Math[_0x1c9504(0x507)](_0x30d2eb||0x0);const _0x3ece78=_0x4a94a2[_0x1c9504(0x21c)]||Number[_0x1c9504(0x2f8)];this['_classPoints'][_0x340700]=this[_0x1c9504(0x403)][_0x340700]['clamp'](0x0,_0x3ece78);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x487)]=function(_0x34d447,_0xf759ae){const _0x172ca7=_0x306cf5;_0x34d447>0x0&&(_0x34d447*=this[_0x172ca7(0x2cb)]()),this[_0x172ca7(0x23c)](_0x34d447,_0xf759ae);},Game_Actor['prototype'][_0x306cf5(0x4ba)]=function(_0x497111){const _0x2df319=_0x306cf5;if(!Imported[_0x2df319(0x3b2)])return;if(_0x497111>0x0){if(_0x2df319(0x3b4)!==_0x2df319(0x3b4))return this[_0x2df319(0x2b2)]()>0x1?this[_0x2df319(0x4cd)]&&this[_0x2df319(0x4cd)]['active']:this[_0x2df319(0x1d1)]&&this[_0x2df319(0x1d1)][_0x2df319(0x418)];else _0x497111*=this[_0x2df319(0x2cb)]();}this[_0x2df319(0x243)](_0x497111,_0x2df319(0x4bf));},Game_Actor['prototype'][_0x306cf5(0x23c)]=function(_0x3997d1,_0x571ed5){const _0x308f82=_0x306cf5,_0xa30da0=VisuMZ['ClassChangeSystem'][_0x308f82(0x510)][_0x308f82(0x2b4)];_0xa30da0[_0x308f82(0x2fe)]?_0x571ed5=0x0:_0x308f82(0x411)==='tRqjK'?this['_actor']!==_0x3e5776&&(this[_0x308f82(0x4f2)]=_0x4c5d9f,this[_0x308f82(0x345)]()):_0x571ed5=_0x571ed5||this[_0x308f82(0x426)]()['id'],_0x3997d1+=this[_0x308f82(0x431)](_0x571ed5),this[_0x308f82(0x4ee)](_0x3997d1,_0x571ed5);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x40d)]=function(_0x3dad36,_0x2006d6){this['addClassPoints'](-_0x3dad36,_0x2006d6);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2cb)]=function(){const _0x1387cf=_0x306cf5;return this[_0x1387cf(0x245)]()[_0x1387cf(0x43a)]((_0x1ef8fd,_0x2f72e9)=>{const _0x4d1a50=_0x1387cf;if(_0x4d1a50(0x1a4)==='FuqQn')return _0x2f72e9&&_0x2f72e9[_0x4d1a50(0x4d3)][_0x4d1a50(0x260)](VisuMZ[_0x4d1a50(0x3e0)]['RegExp'][_0x4d1a50(0x2ba)])?_0x1ef8fd*(Number(RegExp['$1'])*0.01):_0x1ef8fd;else _0x5e26dd[_0x4d1a50(0x407)](_0x4d1a50(0x3c0),this[_0x4d1a50(0x399)]['bind'](this)),_0x1d77f3[_0x4d1a50(0x407)](_0x4d1a50(0x3d9),this[_0x4d1a50(0x51e)][_0x4d1a50(0x313)](this));},0x1);},Game_Actor[_0x306cf5(0x1fe)]['levelUpGainClassPoints']=function(_0x360332){const _0x549e3e=_0x306cf5;if(this[_0x549e3e(0x4c5)])return;const _0x393274=VisuMZ[_0x549e3e(0x3e0)][_0x549e3e(0x510)][_0x549e3e(0x2b4)];let _0x192b83=0x0;try{_0x192b83=eval(_0x393274[_0x549e3e(0x2d9)]);}catch(_0x2e3dcb){if($gameTemp[_0x549e3e(0x3a3)]())console[_0x549e3e(0x252)](_0x2e3dcb);}this[_0x549e3e(0x487)](_0x192b83,_0x360332);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x33b)]=function(){const _0x3168be=_0x306cf5;return this['_earnedClassPoints']=this[_0x3168be(0x3f3)]||0x0,this['getClassPoints']()-this[_0x3168be(0x3f3)];},Game_Actor['prototype'][_0x306cf5(0x248)]=function(){const _0x5e8e76=_0x306cf5;this[_0x5e8e76(0x341)]={};},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x276)]=function(){const _0x3bbc22=_0x306cf5,_0x1fd3cf=VisuMZ['ClassChangeSystem'][_0x3bbc22(0x3c3)],_0x2f0c21=this['actor']()[_0x3bbc22(0x4d3)];if(_0x2f0c21[_0x3bbc22(0x260)](_0x1fd3cf[_0x3bbc22(0x2ac)])){const _0x3e3949=eval(RegExp['$1']);this[_0x3bbc22(0x29a)](_0x3e3949);}const _0x11fdd2=VisuMZ['ClassChangeSystem']['Settings']['JobPoints'];if(!_0x11fdd2[_0x3bbc22(0x2fe)])return;const _0x8d66e6=_0x2f0c21[_0x3bbc22(0x260)](_0x1fd3cf[_0x3bbc22(0x49d)]);if(_0x8d66e6)for(const _0x2ea920 of _0x8d66e6){if(!_0x2ea920)continue;_0x2ea920[_0x3bbc22(0x260)](_0x1fd3cf[_0x3bbc22(0x49d)]);const _0x548e21=String(RegExp['$1']),_0x38c17a=eval(RegExp['$2']),_0x3a5bee=/^\d+$/['test'](_0x548e21);let _0x143451=0x0;if(_0x3a5bee){if(_0x3bbc22(0x1ea)!=='Paqji')return this['expForClassLevel'](_0x4811e3,_0xe544b+0x1);else _0x143451=Number(_0x548e21);}else{if('SZLJT'==='SZLJT')_0x143451=DataManager[_0x3bbc22(0x31b)](_0x548e21);else{if(this['buttonAssistSlotWindowShift']())return this[_0x3bbc22(0x335)][_0x3bbc22(0x4e7)]/0x5/-0x3;return _0x181203[_0x3bbc22(0x1fe)][_0x3bbc22(0x47c)][_0x3bbc22(0x255)](this);}}this[_0x3bbc22(0x29a)](_0x38c17a,_0x143451);}},Game_Actor['prototype'][_0x306cf5(0x328)]=function(_0x3a5e36){const _0x4c14c4=_0x306cf5;this[_0x4c14c4(0x341)]===undefined&&this[_0x4c14c4(0x248)]();const _0x5e2e75=VisuMZ[_0x4c14c4(0x3e0)][_0x4c14c4(0x510)][_0x4c14c4(0x2c4)];if(_0x5e2e75[_0x4c14c4(0x2fe)]){if('YSxTg'===_0x4c14c4(0x2e4))_0x3a5e36=0x0;else{if(this['isActor']())this[_0x4c14c4(0x432)]=_0x4c14c4(0x204);let _0x5be3b4=_0x347f18[_0x4c14c4(0x3e0)][_0x4c14c4(0x3fb)][_0x4c14c4(0x255)](this);if(this[_0x4c14c4(0x2a1)]())this[_0x4c14c4(0x432)]=_0x27be53;return _0x5be3b4;}}else _0x3a5e36=_0x3a5e36||this['currentClass']()['id'];return this['_jobPoints'][_0x3a5e36]=this[_0x4c14c4(0x341)][_0x3a5e36]||0x0,Math['round'](this[_0x4c14c4(0x341)][_0x3a5e36]);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x45d)]=function(_0x37d7fa,_0x1cdd07){const _0x208a14=_0x306cf5;this[_0x208a14(0x341)]===undefined&&this[_0x208a14(0x248)]();const _0xba433e=VisuMZ[_0x208a14(0x3e0)]['Settings'][_0x208a14(0x2c4)];_0xba433e['SharedResource']?_0x1cdd07=0x0:_0x1cdd07=_0x1cdd07||this[_0x208a14(0x426)]()['id'];this[_0x208a14(0x341)][_0x1cdd07]=this[_0x208a14(0x341)][_0x1cdd07]||0x0,this['_jobPoints'][_0x1cdd07]=Math[_0x208a14(0x507)](_0x37d7fa||0x0);const _0x4b52c2=_0xba433e[_0x208a14(0x21c)]||Number[_0x208a14(0x2f8)];this[_0x208a14(0x341)][_0x1cdd07]=this[_0x208a14(0x341)][_0x1cdd07][_0x208a14(0x4b6)](0x0,_0x4b52c2);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x29a)]=function(_0x88d5b4,_0x4b4e6e){const _0x31a6c6=_0x306cf5;_0x88d5b4>0x0&&(_0x88d5b4*=this['jobPointsRate']()),this[_0x31a6c6(0x343)](_0x88d5b4,_0x4b4e6e);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1a3)]=function(_0x17d7e0){const _0x210b76=_0x306cf5;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;if(_0x17d7e0>0x0){if(_0x210b76(0x2ce)!==_0x210b76(0x4d5))_0x17d7e0*=this[_0x210b76(0x4fd)]();else{if(_0xbcc239[_0x210b76(0x3a3)]())_0x59230c['log'](_0x8cffc5);}}this[_0x210b76(0x243)](_0x17d7e0,_0x210b76(0x25b));},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x343)]=function(_0x5aaa59,_0x1fb95b){const _0x39de2d=_0x306cf5,_0x233205=VisuMZ[_0x39de2d(0x3e0)][_0x39de2d(0x510)][_0x39de2d(0x2c4)];if(_0x233205[_0x39de2d(0x2fe)]){if(_0x39de2d(0x4ff)==='rliDG')_0x1fb95b=0x0;else{if(this['_highestTier']!==_0x16eac1)return this[_0x39de2d(0x3de)];return this['_highestTier']=_0x1a0d42[_0x39de2d(0x35d)](),this[_0x39de2d(0x3de)];}}else _0x1fb95b=_0x1fb95b||this[_0x39de2d(0x426)]()['id'];_0x5aaa59+=this[_0x39de2d(0x328)](_0x1fb95b),this[_0x39de2d(0x45d)](_0x5aaa59,_0x1fb95b);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3b5)]=function(_0x1cb68b,_0x2be42f){this['addJobPoints'](-_0x1cb68b,_0x2be42f);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4fd)]=function(){const _0x5a9746=_0x306cf5;return this[_0x5a9746(0x245)]()[_0x5a9746(0x43a)]((_0x4aed49,_0x320750)=>{const _0x1867df=_0x5a9746;if(_0x1867df(0x218)!==_0x1867df(0x465))return _0x320750&&_0x320750[_0x1867df(0x4d3)]['match'](VisuMZ[_0x1867df(0x3e0)]['RegExp'][_0x1867df(0x338)])?_0x4aed49*(Number(RegExp['$1'])*0.01):_0x4aed49;else _0x32200=0x0;},0x1);},Game_Actor[_0x306cf5(0x1fe)]['levelUpGainJobPoints']=function(_0x52cfc2){const _0x39f4a6=_0x306cf5;if(this[_0x39f4a6(0x4c5)])return;const _0x4d36ba=VisuMZ['ClassChangeSystem'][_0x39f4a6(0x510)]['JobPoints'];let _0x2b0ebf=0x0;try{_0x2b0ebf=eval(_0x4d36ba[_0x39f4a6(0x2d9)]);}catch(_0x486fcd){if($gameTemp['isPlaytest']())console[_0x39f4a6(0x252)](_0x486fcd);}this['gainJobPoints'](_0x2b0ebf,_0x52cfc2);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x462)]=function(){const _0x58e4=_0x306cf5;return this[_0x58e4(0x512)]=this[_0x58e4(0x512)]||0x0,this[_0x58e4(0x328)]()-this[_0x58e4(0x512)];},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x1be)]=Game_Actor[_0x306cf5(0x1fe)]['setFaceImage'],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2a3)]=function(_0x56a36c,_0x4c4a8a){const _0x174c58=_0x306cf5;if(_0x56a36c!==''){if(_0x174c58(0x47a)!=='NzDzm'){this[_0x174c58(0x341)]===_0x5a9c2c&&this[_0x174c58(0x248)]();const _0x283150=_0x24582b[_0x174c58(0x3e0)]['Settings'][_0x174c58(0x2c4)];_0x283150[_0x174c58(0x2fe)]?_0x70753f=0x0:_0x2e849b=_0x13e0d7||this[_0x174c58(0x426)]()['id'];this['_jobPoints'][_0x28dfef]=this[_0x174c58(0x341)][_0x2eb98d]||0x0,this[_0x174c58(0x341)][_0x4f6c12]=_0x3ec791[_0x174c58(0x507)](_0x3de7cf||0x0);const _0x55ebcc=_0x283150[_0x174c58(0x21c)]||_0x481587[_0x174c58(0x2f8)];this['_jobPoints'][_0x584125]=this[_0x174c58(0x341)][_0xde6754][_0x174c58(0x4b6)](0x0,_0x55ebcc);}else this[_0x174c58(0x2ae)]=_0x56a36c,this[_0x174c58(0x26d)]=_0x4c4a8a;}else this['_priorityFaceName']=undefined,this[_0x174c58(0x26d)]=undefined;},VisuMZ[_0x306cf5(0x3e0)]['Game_Actor_faceName']=Game_Actor[_0x306cf5(0x1fe)]['faceName'],Game_Actor[_0x306cf5(0x1fe)]['faceName']=function(){const _0x1cb1d7=_0x306cf5;if(this[_0x1cb1d7(0x2ae)]!==undefined)return this['_priorityFaceName'];return ImageManager['getActorClassFaceName'](this)||VisuMZ[_0x1cb1d7(0x3e0)][_0x1cb1d7(0x31e)]['call'](this);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x2f3)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x526)],Game_Actor[_0x306cf5(0x1fe)]['faceIndex']=function(){const _0x322b71=_0x306cf5;if(this[_0x322b71(0x26d)]!==undefined){if(_0x322b71(0x3ea)===_0x322b71(0x3ea))return this[_0x322b71(0x26d)];else{const _0x34ee0d=_0x44e3e1[_0x1786d9],_0x18953e=this[_0x322b71(0x353)](_0x2527bf);if(_0x18953e>0x63){const _0x4b6e05=_0x34ee0d[_0x322b71(0x524)][_0x3affe1][0x63],_0x336fe9=_0x34ee0d[_0x322b71(0x524)][_0x4da08e][0x62];return _0x4b6e05+(_0x4b6e05-_0x336fe9)*(_0x18953e-0x63);}else return _0x34ee0d[_0x322b71(0x524)][_0x3a336e][_0x18953e];}}const _0x4fd98c=ImageManager[_0x322b71(0x3d7)](this);if(_0x4fd98c!==undefined)return _0x4fd98c;return VisuMZ[_0x322b71(0x3e0)][_0x322b71(0x2f3)][_0x322b71(0x255)](this);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x22f)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4ca)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4ca)]=function(_0x2045bf,_0x2b1b91){const _0x33dc8e=_0x306cf5;if(_0x2045bf!=='')_0x33dc8e(0x38c)===_0x33dc8e(0x2bc)?_0x246894=_0x5e350c||this[_0x33dc8e(0x426)]()['id']:(this[_0x33dc8e(0x3bb)]=_0x2045bf,this[_0x33dc8e(0x3f2)]=_0x2b1b91);else{if(_0x33dc8e(0x2ad)!==_0x33dc8e(0x1cd))this[_0x33dc8e(0x3bb)]=undefined,this['_priorityCharacterIndex']=undefined;else{if(this['_priorityBattlerName']!==_0x5d9608)return this[_0x33dc8e(0x46b)];return _0x3137c3['getActorClassBattlerName'](this)||_0x4fa786[_0x33dc8e(0x3e0)][_0x33dc8e(0x273)][_0x33dc8e(0x255)](this);;}}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x30b)]=Game_Actor['prototype'][_0x306cf5(0x212)],Game_Actor['prototype'][_0x306cf5(0x212)]=function(){const _0x64840f=_0x306cf5;if(this[_0x64840f(0x3bb)]!==undefined){if('CJGEb'!==_0x64840f(0x29e))return this['_priorityCharacterName'];else{if(!_0x598468)return'';const _0x20f030='Actor-%1-Class-%2'['format'](_0x22e171['actorId'](),_0x5f1686['currentClass']()['id']);return _0x5be0e9['actorClassBattlerName'][_0x20f030]||'';}}return ImageManager['getActorClassCharacterName'](this)||VisuMZ[_0x64840f(0x3e0)]['Game_Actor_characterName'][_0x64840f(0x255)](this);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x30e)]=Game_Actor[_0x306cf5(0x1fe)]['characterIndex'],Game_Actor[_0x306cf5(0x1fe)]['characterIndex']=function(){const _0x505bd1=_0x306cf5;if(this[_0x505bd1(0x3f2)]!==undefined){if(_0x505bd1(0x207)!==_0x505bd1(0x3c8))return this[_0x505bd1(0x3f2)];else{if(!_0x49b1f9['CLASS_CHANGE_ADJUST_HP_MP'])return;const _0x4d638d=_0x1a08ef['round'](_0x442430[_0x505bd1(0x429)]()*this[_0x505bd1(0x2cc)]),_0x5312ce=_0x3cfee6['round'](_0x2cb5db[_0x505bd1(0x44c)]()*this[_0x505bd1(0x1b0)]);if(this['hp']>0x0)this[_0x505bd1(0x214)](_0x4d638d);if(this['mp']>0x0)this[_0x505bd1(0x19f)](_0x5312ce);}}const _0x21b524=ImageManager['getActorClassCharacterIndex'](this);if(_0x21b524!==undefined)return _0x21b524;return VisuMZ[_0x505bd1(0x3e0)]['Game_Actor_characterIndex'][_0x505bd1(0x255)](this);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x25a)]=Game_Actor[_0x306cf5(0x1fe)]['setBattlerImage'],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4b1)]=function(_0x379aa4){const _0x12c136=_0x306cf5;if(_0x379aa4!==''){if('jMHXF'!==_0x12c136(0x33f)){const _0xac5b40=this[_0x12c136(0x43f)](),_0x3d631d=new _0x34df41(_0xac5b40);_0x3d631d[_0x12c136(0x215)](this[_0x12c136(0x4d2)]),_0x3d631d[_0x12c136(0x34f)](_0x3be4f3[_0x12c136(0x3e0)]['Settings'][_0x12c136(0x4a8)][_0x12c136(0x296)]),this[_0x12c136(0x355)](_0x3d631d),this[_0x12c136(0x4cd)]=_0x3d631d,_0x3d631d[_0x12c136(0x407)]('cancel',this[_0x12c136(0x303)]['bind'](this)),this[_0x12c136(0x2b2)]()>0x1&&(_0x3d631d[_0x12c136(0x407)](_0x12c136(0x3c0),this[_0x12c136(0x399)][_0x12c136(0x313)](this)),_0x3d631d['setHandler'](_0x12c136(0x3d9),this[_0x12c136(0x51e)][_0x12c136(0x313)](this))),_0x3d631d['setHandler'](_0x12c136(0x3ce),this[_0x12c136(0x31f)][_0x12c136(0x313)](this));}else this[_0x12c136(0x46b)]=_0x379aa4;}else{if(_0x12c136(0x494)!==_0x12c136(0x4d9))this[_0x12c136(0x46b)]=undefined;else{const _0x5251e3=this[_0x12c136(0x4f0)]||{};this[_0x12c136(0x41e)](_0x382c5e[_0x12c136(0x4a1)]),this['_cache']=_0x5251e3;}}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x273)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x453)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x453)]=function(){const _0x4568cc=_0x306cf5;if(this[_0x4568cc(0x46b)]!==undefined)return this[_0x4568cc(0x46b)];return ImageManager[_0x4568cc(0x2bd)](this)||VisuMZ[_0x4568cc(0x3e0)][_0x4568cc(0x273)][_0x4568cc(0x255)](this);;},VisuMZ['ClassChangeSystem'][_0x306cf5(0x464)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x365)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x365)]=function(_0x4087a0){const _0x470605=_0x306cf5;if(_0x4087a0!==''){if(_0x470605(0x41f)===_0x470605(0x317)){if(this['subject']()['isActor']()&&_0x376ecd['match'](_0x2bdb87[_0x470605(0x3dc)])){const _0x18c8cb=_0xb0c863(_0x308097['$1']);this[_0x470605(0x360)]()['gainClassPoints'](_0x18c8cb);}else this['applyClassPoints']();if(_0x3ce4ae[_0x470605(0x2a1)]()&&_0x1fcfb8[_0x470605(0x260)](_0xcb9636[_0x470605(0x511)])){const _0x563b28=_0xf316ee(_0x3a27be['$1']);_0x551fe7['gainClassPoints'](_0x563b28);}}else this[_0x470605(0x1da)]=_0x4087a0;}else this[_0x470605(0x1da)]=undefined;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x3bc)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3ee)],Game_Actor['prototype'][_0x306cf5(0x3ee)]=function(){const _0x3543a2=_0x306cf5;if(this[_0x3543a2(0x1da)]!==undefined)return this[_0x3543a2(0x1da)];return ImageManager[_0x3543a2(0x47b)](this)||VisuMZ[_0x3543a2(0x3e0)][_0x3543a2(0x3bc)][_0x3543a2(0x255)](this);;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x4f9)]=Game_Actor[_0x306cf5(0x1fe)]['setBattlePortrait'],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x444)]=function(_0x629934){const _0x34355c=_0x306cf5;_0x629934!==''?this[_0x34355c(0x1dc)]=_0x629934:this[_0x34355c(0x1dc)]=undefined;if(SceneManager[_0x34355c(0x1e1)]()&&$gameParty[_0x34355c(0x1fd)]()[_0x34355c(0x1bc)](this)){const _0x351e68=SceneManager[_0x34355c(0x2be)][_0x34355c(0x3df)];if(_0x351e68)_0x351e68[_0x34355c(0x2b0)](this);}},VisuMZ['ClassChangeSystem'][_0x306cf5(0x485)]=Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1bd)],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1bd)]=function(){const _0x1bb267=_0x306cf5;if(this[_0x1bb267(0x1dc)]!==undefined)return this['_priorityBattlePortrait'];return ImageManager['getActorClassBattlePortrait'](this)||VisuMZ[_0x1bb267(0x3e0)][_0x1bb267(0x485)][_0x1bb267(0x255)](this);;},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x222)]=function(){const _0x134c6e=_0x306cf5;this[_0x134c6e(0x48b)]=[this['currentClass']()['id']];const _0x310d78=VisuMZ[_0x134c6e(0x3e0)][_0x134c6e(0x3c3)],_0x27e19f=this[_0x134c6e(0x505)]()[_0x134c6e(0x4d3)],_0x219f43=_0x27e19f[_0x134c6e(0x260)](_0x310d78['ActorUnlockedClasses']);if(_0x219f43)for(const _0xa259e6 of _0x219f43){if(!_0xa259e6)continue;_0xa259e6[_0x134c6e(0x260)](_0x310d78[_0x134c6e(0x279)]);const _0x263d12=String(RegExp['$1'])[_0x134c6e(0x500)](',');for(let _0x170427 of _0x263d12){_0x170427=(String(_0x170427)||'')['trim']();const _0x724408=/^\d+$/['test'](_0x170427);_0x724408?'DCAuN'!=='pAVoo'?this[_0x134c6e(0x48b)][_0x134c6e(0x3a6)](Number(_0x170427)):this[_0x134c6e(0x293)][_0x2f3842]=0x0:this['_unlockedClasses']['push'](DataManager['getClassIdWithName'](_0x170427));}}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3e4)]=function(){const _0x3cc6f9=_0x306cf5;if(this[_0x3cc6f9(0x48b)]===undefined)this[_0x3cc6f9(0x222)]();return this['_unlockedClasses'];},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x32f)]=function(_0x57f859){const _0x2f7804=_0x306cf5;if(this['_unlockedClasses']===undefined)this[_0x2f7804(0x222)]();if(this['_unlockedClasses'][_0x2f7804(0x1bc)](_0x57f859))return;this[_0x2f7804(0x48b)]['push'](_0x57f859),this[_0x2f7804(0x48b)][_0x2f7804(0x495)](0x0),this[_0x2f7804(0x48b)][_0x2f7804(0x228)](function(_0x5e1b06,_0x2e0c13){const _0x469986=_0x2f7804;if('aIrbG'!==_0x469986(0x1ac))return _0x5e1b06-_0x2e0c13;else this[_0x469986(0x43d)](_0x572b27),this[_0x469986(0x391)](_0x456ad6),_0x40a67c['VisuMZ_2_SkillLearnSystem']&&(this[_0x469986(0x4e4)](_0xf81fe0),this['levelUpGainSkillPoints'](_0x127015));});},Game_Actor[_0x306cf5(0x1fe)]['removeUnlockedClass']=function(_0xf38621){const _0x209d02=_0x306cf5;if(this[_0x209d02(0x48b)]===undefined)this[_0x209d02(0x222)]();if(!this['_unlockedClasses'][_0x209d02(0x1bc)](_0xf38621))return;this[_0x209d02(0x48b)][_0x209d02(0x495)](_0xf38621)[_0x209d02(0x495)](null),this[_0x209d02(0x48b)]['sort'](function(_0x840fe5,_0x405a0c){const _0x159d22=_0x209d02;if(_0x159d22(0x48f)!==_0x159d22(0x404))return _0x840fe5-_0x405a0c;else{_0x54d062=_0x473a5d||0x1,this[_0x159d22(0x241)](![]);const _0x1a3a9a=_0x5bfda2[_0x159d22(0x34b)](),_0x1d0e70=_0x11ef0b['dimColor2'](),_0x52a9fc=_0x4f782a['width']/0x2,_0x3778df=this[_0x159d22(0x268)]();while(_0x58a1a8--){this[_0x159d22(0x2b1)]['gradientFillRect'](_0x5b4128['x'],_0x40a9d0['y'],_0x52a9fc,_0x3778df,_0x1d0e70,_0x1a3a9a),this[_0x159d22(0x2b1)][_0x159d22(0x3ec)](_0x79f9dd['x']+_0x52a9fc,_0x34b233['y'],_0x52a9fc,_0x3778df,_0x1a3a9a,_0x1d0e70);}this[_0x159d22(0x241)](!![]);}});},Game_Actor[_0x306cf5(0x1fe)]['naturalUnlockClass']=function(_0xffcb98){const _0x2ff297=_0x306cf5;this[_0x2ff297(0x32f)](_0xffcb98);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1f9)]=function(){const _0x33156a=_0x306cf5;this[_0x33156a(0x4ed)]=VisuMZ[_0x33156a(0x3e0)][_0x33156a(0x510)][_0x33156a(0x4ae)][_0x33156a(0x239)],this[_0x33156a(0x293)]=[this[_0x33156a(0x1df)]];const _0x2db38f=this[_0x33156a(0x505)]()[_0x33156a(0x4d3)],_0x9c6763=VisuMZ[_0x33156a(0x3e0)][_0x33156a(0x3c3)];_0x2db38f[_0x33156a(0x260)](_0x9c6763[_0x33156a(0x239)])&&(this[_0x33156a(0x4ed)]=Number(RegExp['$1']));const _0x9ad4c=_0x2db38f[_0x33156a(0x260)](_0x9c6763[_0x33156a(0x372)]);if(_0x9ad4c)for(const _0x45c9b0 of _0x9ad4c){if(_0x33156a(0x2b6)===_0x33156a(0x402))return this[_0x33156a(0x3bb)];else{if(!_0x45c9b0)continue;_0x45c9b0[_0x33156a(0x260)](_0x9c6763[_0x33156a(0x372)]);const _0x20ec07=Number(RegExp['$1'])-0x1;if(_0x20ec07+0x1>this['_multiclassTiers'])continue;let _0x40d27e=(String(RegExp['$2'])||'')[_0x33156a(0x2c6)]();const _0x115aef=/^\d+$/[_0x33156a(0x4d8)](_0x40d27e);if(_0x115aef)_0x33156a(0x1ae)!==_0x33156a(0x2b7)?this[_0x33156a(0x293)][_0x20ec07]=Number(_0x40d27e):this[_0x33156a(0x4f2)]!==_0xe5c1f2&&(this[_0x33156a(0x4f2)]=_0x3db8a6,this['refresh']());else{if(_0x33156a(0x1d8)===_0x33156a(0x1d8))this[_0x33156a(0x293)][_0x20ec07]=DataManager[_0x33156a(0x31b)](_0x40d27e);else{if(_0x5cd473[_0x33156a(0x523)]())return;_0x6f31a5[_0x33156a(0x3e0)][_0x33156a(0x47e)][_0x33156a(0x255)](this,_0x580f4b);}}}}this['checkMulticlasses'](),this[_0x33156a(0x4ed)]=this[_0x33156a(0x4ed)]['clamp'](0x1,VisuMZ[_0x33156a(0x3e0)][_0x33156a(0x510)]['Multiclass'][_0x33156a(0x4c9)]||0x1);for(const _0x1ed13f of this[_0x33156a(0x293)]){_0x33156a(0x3ad)!=='dOUON'?_0x169a3d=_0x57ad96[_0x33156a(0x31b)](_0xcb6cc7['$1']):this['unlockClass'](_0x1ed13f);}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2bb)]=function(){const _0xbbba86=_0x306cf5;if(this[_0xbbba86(0x293)]===undefined)this[_0xbbba86(0x1f9)]();return this[_0xbbba86(0x293)][0x0]=this[_0xbbba86(0x1df)],this[_0xbbba86(0x293)][_0xbbba86(0x4b5)](_0xc7777d=>!!$dataClasses[_0xc7777d])[_0xbbba86(0x306)](_0x200cfb=>$dataClasses[_0x200cfb]);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4ab)]=function(){const _0x5e547c=_0x306cf5;return this[_0x5e547c(0x2bb)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2f6)]=function(_0x1a93b2){const _0x2d0356=_0x306cf5;if(this[_0x2d0356(0x293)]===undefined)this[_0x2d0356(0x1f9)]();return _0x1a93b2-=0x1,$dataClasses[this[_0x2d0356(0x293)][_0x1a93b2]]||null;},Game_Actor[_0x306cf5(0x1fe)]['multiclass']=function(_0x265c25){const _0x24234b=_0x306cf5;return this[_0x24234b(0x2f6)](_0x265c25);},Game_Actor[_0x306cf5(0x1fe)]['multiclassId']=function(_0x42f7b7){const _0xf754c0=_0x306cf5,_0x19ac64=this[_0xf754c0(0x2f6)](_0x42f7b7);return _0x19ac64?_0x19ac64['id']:0x0;},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x314)]=function(){const _0x3e3f92=_0x306cf5;if(this['_multiclassTiers']===undefined)this[_0x3e3f92(0x1f9)]();return this[_0x3e3f92(0x4ed)]=this[_0x3e3f92(0x4ed)][_0x3e3f92(0x4b6)](0x1,VisuMZ[_0x3e3f92(0x3e0)]['Settings'][_0x3e3f92(0x2d8)][_0x3e3f92(0x4c9)]||0x1),this[_0x3e3f92(0x4ed)];},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x308)]=function(_0xa075f9){const _0x1857c1=_0x306cf5;if(this[_0x1857c1(0x4ed)]===undefined)this[_0x1857c1(0x1f9)]();this[_0x1857c1(0x4ed)]=_0xa075f9['clamp'](0x1,VisuMZ[_0x1857c1(0x3e0)][_0x1857c1(0x510)]['Multiclass'][_0x1857c1(0x4c9)]||0x1);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4eb)]=function(_0x3d7aa9){const _0xdc882b=_0x306cf5;_0x3d7aa9+=this['totalMulticlass'](),this[_0xdc882b(0x308)](_0x3d7aa9);},Game_Actor['prototype'][_0x306cf5(0x334)]=function(_0x31bb04){const _0x93bcf0=_0x306cf5;_0x31bb04=this[_0x93bcf0(0x314)]()-_0x31bb04,this[_0x93bcf0(0x308)](_0x31bb04);},Game_Actor[_0x306cf5(0x1fe)]['checkMulticlasses']=function(){const _0x5001d7=_0x306cf5;if(this['_multiclasses']===undefined)this[_0x5001d7(0x1f9)]();let _0x5f301c=![];const _0x2bffc8=this[_0x5001d7(0x314)]();while(this['_multiclasses']['length']>_0x2bffc8){_0x5f301c=!![],this[_0x5001d7(0x293)][_0x5001d7(0x280)]();}this[_0x5001d7(0x293)][0x0]=this['currentClass']()['id'];const _0x5ac0ec=this[_0x5001d7(0x293)][_0x5001d7(0x4c9)];for(let _0xdc9033=0x1;_0xdc9033<_0x5ac0ec;_0xdc9033++){this[_0x5001d7(0x293)][_0xdc9033]===this[_0x5001d7(0x426)]()['id']&&(this[_0x5001d7(0x293)][_0xdc9033]=0x0,_0x5f301c=!![]);}if(_0x5f301c)this[_0x5001d7(0x345)]();},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x478)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x4a0)],Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x4a0)]=function(_0x3b68cc){const _0x4d0f0f=_0x306cf5;if(this['isActor']())this[_0x4d0f0f(0x432)]=_0x4d0f0f(0x379);let _0x72c144=VisuMZ[_0x4d0f0f(0x3e0)][_0x4d0f0f(0x478)]['call'](this,_0x3b68cc);if(this[_0x4d0f0f(0x2a1)]())this['_multiclassCheck']=undefined;return _0x72c144;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x336)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x3e5)],Game_BattlerBase[_0x306cf5(0x1fe)]['debuffRate']=function(_0xa9b4e7){const _0x298d20=_0x306cf5;if(this[_0x298d20(0x2a1)]())this['_multiclassCheck']='DebuffRates';let _0x3fd1ba=VisuMZ[_0x298d20(0x3e0)][_0x298d20(0x336)][_0x298d20(0x255)](this,_0xa9b4e7);if(this[_0x298d20(0x2a1)]())this[_0x298d20(0x432)]=undefined;return _0x3fd1ba;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x3ef)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x1a0)],Game_BattlerBase[_0x306cf5(0x1fe)]['stateRate']=function(_0x14340a){const _0x1b3907=_0x306cf5;if(this[_0x1b3907(0x2a1)]())this[_0x1b3907(0x432)]=_0x1b3907(0x1a1);let _0x530ff4=VisuMZ[_0x1b3907(0x3e0)][_0x1b3907(0x3ef)]['call'](this,_0x14340a);if(this['isActor']())this[_0x1b3907(0x432)]=undefined;return _0x530ff4;},VisuMZ[_0x306cf5(0x3e0)]['Game_BattlerBase_stateResistSet']=Game_BattlerBase['prototype']['stateResistSet'],Game_BattlerBase['prototype']['stateResistSet']=function(){const _0x63a477=_0x306cf5;if(this[_0x63a477(0x2a1)]())this['_multiclassCheck']='StateResistance';let _0x2b4cca=VisuMZ[_0x63a477(0x3e0)]['Game_BattlerBase_stateResistSet']['call'](this);if(this[_0x63a477(0x2a1)]())this['_multiclassCheck']=undefined;return _0x2b4cca;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x274)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x1e8)],Game_BattlerBase[_0x306cf5(0x1fe)]['paramRate']=function(_0x39ad60){const _0x81691c=_0x306cf5;if(this[_0x81691c(0x2a1)]())this[_0x81691c(0x432)]='ParamRates';let _0x4da7a4=VisuMZ[_0x81691c(0x3e0)][_0x81691c(0x274)]['call'](this,_0x39ad60);if(this['isActor']())this[_0x81691c(0x432)]=undefined;return _0x4da7a4;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x249)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x39e)],Game_BattlerBase[_0x306cf5(0x1fe)]['xparam']=function(_0x5cd451){const _0x6d4a79=_0x306cf5;if(this['isActor']())this[_0x6d4a79(0x432)]='XParamRates';let _0x3de2dd=VisuMZ[_0x6d4a79(0x3e0)][_0x6d4a79(0x249)]['call'](this,_0x5cd451);if(this['isActor']())this[_0x6d4a79(0x432)]=undefined;return _0x3de2dd;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x22d)]=Game_BattlerBase[_0x306cf5(0x1fe)]['sparam'],Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x4fa)]=function(_0x1915ac){const _0x533b5c=_0x306cf5;if(this[_0x533b5c(0x2a1)]())this[_0x533b5c(0x432)]=_0x533b5c(0x1ff);let _0xe29adc=VisuMZ[_0x533b5c(0x3e0)][_0x533b5c(0x22d)][_0x533b5c(0x255)](this,_0x1915ac);if(this['isActor']())this[_0x533b5c(0x432)]=undefined;return _0xe29adc;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x38d)]=Game_BattlerBase[_0x306cf5(0x1fe)]['attackElements'],Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x3f6)]=function(){const _0x3c4671=_0x306cf5;if(this[_0x3c4671(0x2a1)]())this[_0x3c4671(0x432)]=_0x3c4671(0x38a);let _0x2ce9a3=VisuMZ[_0x3c4671(0x3e0)][_0x3c4671(0x38d)][_0x3c4671(0x255)](this);if(this[_0x3c4671(0x2a1)]())this[_0x3c4671(0x432)]=undefined;return _0x2ce9a3;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x3fb)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x2a6)],Game_BattlerBase[_0x306cf5(0x1fe)]['attackStates']=function(){const _0x23d55d=_0x306cf5;if(this['isActor']())this[_0x23d55d(0x432)]=_0x23d55d(0x204);let _0x1eff52=VisuMZ[_0x23d55d(0x3e0)]['Game_BattlerBase_attackStates']['call'](this);if(this[_0x23d55d(0x2a1)]())this['_multiclassCheck']=undefined;return _0x1eff52;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x4d7)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x3fc)],Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x3fc)]=function(_0x8f0ea){const _0x3d820a=_0x306cf5;if(this[_0x3d820a(0x2a1)]())this[_0x3d820a(0x432)]=_0x3d820a(0x204);let _0x4fbdd9=VisuMZ['ClassChangeSystem'][_0x3d820a(0x4d7)][_0x3d820a(0x255)](this,_0x8f0ea);if(this[_0x3d820a(0x2a1)]())this[_0x3d820a(0x432)]=undefined;return _0x4fbdd9;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x3da)]=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x36b)],Game_BattlerBase[_0x306cf5(0x1fe)]['addedSkillTypes']=function(){const _0x346311=_0x306cf5;if(this['isActor']())this[_0x346311(0x432)]='AddedStypes';let _0x7da90=VisuMZ[_0x346311(0x3e0)][_0x346311(0x3da)][_0x346311(0x255)](this);if(this[_0x346311(0x2a1)]())this[_0x346311(0x432)]=undefined;return _0x7da90;},VisuMZ[_0x306cf5(0x3e0)]['Game_BattlerBase_addedSkills']=Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x41c)],Game_BattlerBase['prototype'][_0x306cf5(0x41c)]=function(){const _0x5bb5ca=_0x306cf5;if(this['isActor']())this['_multiclassCheck']=_0x5bb5ca(0x491);let _0x18ea1f=VisuMZ[_0x5bb5ca(0x3e0)]['Game_BattlerBase_addedSkills'][_0x5bb5ca(0x255)](this);if(this['isActor']())this['_multiclassCheck']=undefined;return _0x18ea1f;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x44a)]=Game_BattlerBase['prototype']['isEquipWtypeOk'],Game_BattlerBase[_0x306cf5(0x1fe)][_0x306cf5(0x40f)]=function(_0x22d169){const _0x2ddaa8=_0x306cf5;if(this[_0x2ddaa8(0x2a1)]())this['_multiclassCheck']='EquipWeapons';let _0x16a85b=VisuMZ[_0x2ddaa8(0x3e0)][_0x2ddaa8(0x44a)][_0x2ddaa8(0x255)](this,_0x22d169);if(this['isActor']())this[_0x2ddaa8(0x432)]=undefined;return _0x16a85b;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x506)]=Game_BattlerBase['prototype'][_0x306cf5(0x441)],Game_BattlerBase['prototype']['isEquipAtypeOk']=function(_0xfebec7){const _0x3d2b91=_0x306cf5;if(this[_0x3d2b91(0x2a1)]())this['_multiclassCheck']=_0x3d2b91(0x4e8);let _0x230d11=VisuMZ[_0x3d2b91(0x3e0)][_0x3d2b91(0x506)][_0x3d2b91(0x255)](this,_0xfebec7);if(this[_0x3d2b91(0x2a1)]())this[_0x3d2b91(0x432)]=undefined;return _0x230d11;},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x3db)]=Game_Actor['prototype']['traitObjects'],Game_Actor['prototype'][_0x306cf5(0x245)]=function(){const _0x2bac01=_0x306cf5;let _0xd067=VisuMZ['ClassChangeSystem'][_0x2bac01(0x3db)][_0x2bac01(0x255)](this);return this[_0x2bac01(0x432)]&&(_0xd067=this['applyMulticlassObjects'](_0xd067)),this[_0x2bac01(0x432)]=undefined,_0xd067;},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x42e)]=function(_0x5f4a58){const _0x1bbe1f=_0x306cf5;if(this[_0x1bbe1f(0x293)]===undefined)this[_0x1bbe1f(0x1f9)]();const _0x56eac7=this[_0x1bbe1f(0x432)];let _0x26e1ca=_0x5f4a58[_0x1bbe1f(0x223)](this[_0x1bbe1f(0x426)]());const _0x18425c=VisuMZ[_0x1bbe1f(0x3e0)]['Settings'][_0x1bbe1f(0x2d8)],_0x2301f7=_0x18425c[_0x1bbe1f(0x4c9)];for(let _0x818483=0x1;_0x818483<_0x2301f7;_0x818483++){if('eACJY'!==_0x1bbe1f(0x2a9)){let _0x14605d=$dataClasses[this['_multiclasses'][_0x818483]||0x0];if(!_0x14605d)continue;if(_0x14605d===this['currentClass']())continue;const _0x4ca1af=_0x18425c[_0x818483];if(!_0x4ca1af)continue;_0x4ca1af[this['_multiclassCheck']]&&_0x5f4a58[_0x1bbe1f(0x311)](++_0x26e1ca,0x0,_0x14605d);}else{_0x4b71d9['iconIndex']=_0x3cc210[_0x1bbe1f(0x229)]||0x0,_0x8afea6['description']=_0xec973e[_0x1bbe1f(0x22a)][_0x1bbe1f(0x25d)](_0x594d98[_0x1bbe1f(0x1a7)]||'');const _0x20e2b1=_0x5cce84[_0x1bbe1f(0x3e0)][_0x1bbe1f(0x3c3)],_0x199517=_0x3cc222['note'];_0x199517[_0x1bbe1f(0x260)](_0x20e2b1[_0x1bbe1f(0x474)])&&(_0x78a497['iconIndex']=_0x20705d(_0x15c300['$1'])),_0x199517[_0x1bbe1f(0x260)](_0x20e2b1[_0x1bbe1f(0x43c)])&&(_0x324dab[_0x1bbe1f(0x1b6)]=_0x1e6bab(_0x179d49['$1']));}}return _0x5f4a58;},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x243)]=function(_0x179e15,_0x22d9c5){const _0x33b7b4=_0x306cf5;if(_0x179e15<=0x0)return;if(!_0x22d9c5)return;if(!$dataSystem[_0x33b7b4(0x1f7)]&&!this[_0x33b7b4(0x449)]())return;this[_0x33b7b4(0x2bb)]();const _0x20f036=VisuMZ[_0x33b7b4(0x3e0)][_0x33b7b4(0x510)][_0x33b7b4(0x2d8)],_0x3de866=_0x20f036[_0x33b7b4(0x4c9)];for(let _0x42d896=0x1;_0x42d896<_0x3de866;_0x42d896++){let _0x3171e3=$dataClasses[this[_0x33b7b4(0x293)][_0x42d896]||0x0];if(!_0x3171e3)continue;if(_0x3171e3===this[_0x33b7b4(0x426)]())continue;const _0x343222=_0x20f036[_0x42d896];if(!_0x343222)continue;if(this['gain%1Points'[_0x33b7b4(0x25d)](_0x22d9c5)]){if(_0x33b7b4(0x2da)===_0x33b7b4(0x4f1))this[_0x33b7b4(0x210)]=_0x554c28,this['refresh']();else{const _0x33aa8b=_0x343222[_0x33b7b4(0x467)],_0x257a19=_0x33aa8b*_0x179e15;this[_0x33b7b4(0x19e)['format'](_0x22d9c5)](_0x257a19,this[_0x33b7b4(0x293)][_0x42d896]);}}}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x452)]=function(_0x234d87){const _0x3416ec=_0x306cf5;if(!_0x234d87)return;if(this[_0x3416ec(0x1b1)]())return;this[_0x3416ec(0x2bb)]();const _0x379334=VisuMZ[_0x3416ec(0x3e0)]['Settings']['Multiclass'],_0x348a5a=_0x379334['length'];for(let _0x28f339=0x1;_0x28f339<_0x348a5a;_0x28f339++){let _0x9cb646=$dataClasses[this[_0x3416ec(0x293)][_0x28f339]||0x0];if(!_0x9cb646)continue;if(_0x9cb646===this['currentClass']())continue;const _0x2d207f=_0x379334[_0x28f339];if(!_0x2d207f)continue;const _0x5f53de=_0x2d207f['expRate'],_0x1f04e8=Math[_0x3416ec(0x507)](_0x234d87*_0x5f53de*this[_0x3416ec(0x19d)]()),_0x24c274=this[_0x3416ec(0x293)][_0x28f339];this[_0x3416ec(0x30c)][_0x24c274]=this[_0x3416ec(0x30c)][_0x24c274]||0x0;const _0xb96908=this[_0x3416ec(0x30c)][_0x24c274]+_0x1f04e8;this[_0x3416ec(0x295)](_0xb96908,_0x24c274);}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x27a)]=function(_0x1d04ea,_0x2b82f4){const _0x3cb192=_0x306cf5;if(this[_0x3cb192(0x293)]===undefined)this[_0x3cb192(0x1f9)]();_0x2b82f4-=0x1;if(_0x1d04ea<=0x0&&_0x2b82f4<=0x0)return;this['unlockClass'](_0x1d04ea);const _0x1af800=this[_0x3cb192(0x293)][_0x3cb192(0x4c9)];for(let _0x446936=0x0;_0x446936<_0x1af800;_0x446936++){if(this[_0x3cb192(0x293)][_0x446936]===_0x1d04ea){if('xQmVZ'===_0x3cb192(0x36c)){if(this[_0x3cb192(0x4c5)])return;const _0x55c983=_0x496439[_0x3cb192(0x3e0)][_0x3cb192(0x510)][_0x3cb192(0x2c4)];let _0xc3d1ce=0x0;try{_0xc3d1ce=_0x41f9ce(_0x55c983['PerLevelUp']);}catch(_0x24427e){if(_0x1bab5c[_0x3cb192(0x3a3)]())_0x535f2e[_0x3cb192(0x252)](_0x24427e);}this[_0x3cb192(0x29a)](_0xc3d1ce,_0x360d2a);}else this[_0x3cb192(0x293)][_0x446936]=0x0;}}this['_multiclasses'][0x0]=this[_0x3cb192(0x426)]()['id'];if(_0x2b82f4<=0x0){if(_0x3cb192(0x220)===_0x3cb192(0x220)){this[_0x3cb192(0x221)](_0x1d04ea);return;}else this['drawBigItemIcon'](_0x3eeb23,_0x53354d);}const _0x7ad9fa=JsonEx[_0x3cb192(0x1e5)](this);_0x7ad9fa[_0x3cb192(0x4b4)]=!![],this['_multiclasses'][_0x2b82f4]=_0x1d04ea,this['checkMulticlasses'](),this['refresh'](),this['classAdjustHpMp'](_0x7ad9fa),this[_0x3cb192(0x1dd)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x442)]=function(_0x4eccc7){const _0x3d22c4=_0x306cf5;if(this['_multiclasses']===undefined)this[_0x3d22c4(0x1f9)]();return this[_0x3d22c4(0x293)][0x0]=this[_0x3d22c4(0x426)]()['id'],this[_0x3d22c4(0x293)][_0x3d22c4(0x223)](_0x4eccc7)+0x1;},Game_Actor[_0x306cf5(0x1fe)]['initClassLevels']=function(){const _0x53a650=_0x306cf5;this[_0x53a650(0x516)]={},this[_0x53a650(0x516)][this[_0x53a650(0x426)]()['id']]=this[_0x53a650(0x3f0)];},Game_Actor[_0x306cf5(0x1fe)]['maintainLevels']=function(){const _0x4a5344=_0x306cf5;return VisuMZ[_0x4a5344(0x3e0)][_0x4a5344(0x510)][_0x4a5344(0x4ae)][_0x4a5344(0x4cc)];},Game_Actor[_0x306cf5(0x1fe)]['classLevel']=function(_0x3d1c01){const _0x142ca7=_0x306cf5;if(this[_0x142ca7(0x1b1)]())return this[_0x142ca7(0x3f0)];return this[_0x142ca7(0x3bf)](_0x3d1c01),this['_classLevel'][_0x3d1c01];},Game_Actor[_0x306cf5(0x1fe)]['changeClassExp']=function(_0x3568ce,_0x18ed36){const _0x3dedd7=_0x306cf5;if(this['maintainLevels']())return this[_0x3dedd7(0x227)](_0x3568ce);this['_exp'][_0x18ed36]=Math[_0x3dedd7(0x36f)](_0x3568ce,0x0),this[_0x3dedd7(0x3bf)](_0x18ed36);if(_0x18ed36===this[_0x3dedd7(0x426)]()['id'])this[_0x3dedd7(0x345)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3bf)]=function(_0x555880){const _0x4d282c=_0x306cf5;if(this[_0x4d282c(0x1b1)]())return;this[_0x4d282c(0x30c)][_0x555880]=this['_exp'][_0x555880]||0x0,this[_0x4d282c(0x516)]=this[_0x4d282c(0x516)]||{},this['_classLevel'][_0x555880]=this[_0x4d282c(0x516)][_0x555880]||0x1;while(!(this[_0x4d282c(0x516)][_0x555880]>=this['maxLevel']())&&this[_0x4d282c(0x30c)][_0x555880]>=this[_0x4d282c(0x4cf)](_0x555880,this[_0x4d282c(0x516)][_0x555880])){this['_classLevel'][_0x555880]+=0x1,this[_0x4d282c(0x2e2)](_0x555880);}while(this[_0x4d282c(0x30c)][_0x555880]<this[_0x4d282c(0x1f8)](_0x555880,this[_0x4d282c(0x516)][_0x555880])){'UJVZi'===_0x4d282c(0x2ab)?this[_0x4d282c(0x516)][_0x555880]-=0x1:_0x29bc76[_0x4d282c(0x1b6)]=_0x2bba01(_0x38c47c['$1']);}this[_0x4d282c(0x1e4)]();},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x3ba)]=function(_0x5f04fa,_0x5c3975){const _0x57300e=_0x306cf5,_0xfc0a7b=$dataClasses[_0x5f04fa],_0x10fd44=_0xfc0a7b[_0x57300e(0x3a4)][0x0],_0x5ee0a5=_0xfc0a7b[_0x57300e(0x3a4)][0x1],_0x40eeb9=_0xfc0a7b[_0x57300e(0x3a4)][0x2],_0x4f332d=_0xfc0a7b[_0x57300e(0x3a4)][0x3];return Math['round'](_0x10fd44*Math[_0x57300e(0x477)](_0x5c3975-0x1,0.9+_0x40eeb9/0xfa)*_0x5c3975*(_0x5c3975+0x1)/(0x6+Math['pow'](_0x5c3975,0x2)/0x32/_0x4f332d)+(_0x5c3975-0x1)*_0x5ee0a5);},Game_Actor['prototype']['nextClassLevelExp']=function(_0x1f28c4,_0x150e2e){const _0xcd1275=_0x306cf5;return this[_0xcd1275(0x3ba)](_0x1f28c4,_0x150e2e+0x1);},Game_Actor['prototype'][_0x306cf5(0x1f8)]=function(_0x41af62,_0x4b02c9){const _0x41073c=_0x306cf5;return this[_0x41073c(0x3ba)](_0x41af62,_0x4b02c9);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x2e2)]=function(_0x392a7b){const _0x3da82f=_0x306cf5;this['levelUpGainClassPoints'](_0x392a7b),this[_0x3da82f(0x391)](_0x392a7b);if(Imported[_0x3da82f(0x3dd)]){if(_0x3da82f(0x461)!==_0x3da82f(0x225))this['levelUpGainAbilityPoints'](_0x392a7b),this['levelUpGainSkillPoints'](_0x392a7b);else{_0x53ffe7=this['maintainLevels']();_0x3889e9&&(this[_0x3da82f(0x30c)]=this[_0x3da82f(0x30c)]||{},this[_0x3da82f(0x30c)][_0x2e6aa7]=this[_0x3da82f(0x30c)][this[_0x3da82f(0x1df)]]||0x0,_0x1af17a=![]);this['_ClassChangeSystem_preventLevelUpGain']=!![];const _0x4b3f03=_0x270d38[_0x3da82f(0x1e5)](this);_0x4b3f03[_0x3da82f(0x4b4)]=!![],_0x55b1ea[_0x3da82f(0x3e0)]['Game_Actor_changeClass'][_0x3da82f(0x255)](this,_0x709b1e,_0x5122b4),this[_0x3da82f(0x3f8)](_0x4b3f03),this[_0x3da82f(0x1dd)](),this[_0x3da82f(0x42c)](_0x4d8daa),this[_0x3da82f(0x4c5)]=_0x43b5e3;if(_0x3bc28e)_0x8d43a4[_0x3da82f(0x345)]();}}},Game_Actor['prototype'][_0x306cf5(0x1e4)]=function(){const _0x22b3ce=_0x306cf5;if(this[_0x22b3ce(0x484)])return;this['_updateClassLearnedSkills']=!![];const _0x9eacae=DataManager[_0x22b3ce(0x519)](this);for(const _0x5c7587 of _0x9eacae){if(!_0x5c7587)continue;const _0x365797=_0x5c7587[_0x22b3ce(0x3e9)];if(!_0x365797)continue;for(const _0x49e980 of _0x365797){if(_0x22b3ce(0x1aa)==='OnHxX')return _0x1598b0['VisuMZ_1_MainMenuCore']&&this['_actor'][_0x22b3ce(0x3ee)]()!==''&&_0x2265d1[_0x22b3ce(0x3e0)]['Settings'][_0x22b3ce(0x4a8)][_0x22b3ce(0x2af)];else{if(this[_0x22b3ce(0x2ef)](_0x49e980['skillId']))continue;if(this[_0x22b3ce(0x353)](_0x5c7587['id'])>=_0x49e980['level']){const _0x46b26e=this[_0x22b3ce(0x4f0)]||{};this['learnSkill'](_0x49e980[_0x22b3ce(0x4a1)]),this[_0x22b3ce(0x4f0)]=_0x46b26e;}}}}this[_0x22b3ce(0x484)]=![];},VisuMZ['ClassChangeSystem'][_0x306cf5(0x3ab)]=Game_Actor[_0x306cf5(0x1fe)]['paramBase'],Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x445)]=function(_0x425e21){const _0xf467aa=_0x306cf5;let _0x29c1d6=VisuMZ[_0xf467aa(0x3e0)][_0xf467aa(0x3ab)][_0xf467aa(0x255)](this,_0x425e21);this[_0xf467aa(0x2bb)]();const _0x206269=VisuMZ[_0xf467aa(0x3e0)][_0xf467aa(0x510)]['Multiclass'],_0x50b81b=_0xf467aa(0x266)[_0xf467aa(0x25d)](_0x425e21),_0x1994da=_0x206269['length'];for(let _0x29d2b1=0x1;_0x29d2b1<_0x1994da;_0x29d2b1++){let _0x48a68f=$dataClasses[this[_0xf467aa(0x293)][_0x29d2b1]||0x0];if(!_0x48a68f)continue;if(_0x48a68f===this['currentClass']())continue;const _0x2faf00=_0x206269[_0x29d2b1];if(!_0x2faf00)continue;const _0x485b77=_0x2faf00[_0x50b81b];_0x29c1d6+=_0x485b77*this[_0xf467aa(0x1ca)](this[_0xf467aa(0x293)][_0x29d2b1],_0x425e21);}return _0x29c1d6;},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x1ca)]=function(_0x5abbef,_0x65f01c){const _0x53191b=_0x306cf5,_0x2cbdde=$dataClasses[_0x5abbef],_0x12e536=this['classLevel'](_0x5abbef);if(_0x12e536>0x63){if(_0x53191b(0x19c)==='kRrkc'){const _0x169ec2=_0x2cbdde[_0x53191b(0x524)][_0x65f01c][0x63],_0x5307b6=_0x2cbdde[_0x53191b(0x524)][_0x65f01c][0x62];return _0x169ec2+(_0x169ec2-_0x5307b6)*(_0x12e536-0x63);}else this['unlockClass'](_0x1edff7);}else return _0x2cbdde[_0x53191b(0x524)][_0x65f01c][_0x12e536];},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x230)]=function(_0x493f65){const _0x2ae4df=_0x306cf5;if(this[_0x2ae4df(0x516)][_0x493f65]>=this[_0x2ae4df(0x410)]())return 0x1;const _0x3d8248=this['classLevel'](_0x493f65),_0x45a7f8=this[_0x2ae4df(0x4cf)](_0x493f65,_0x3d8248)-this[_0x2ae4df(0x1f8)](_0x493f65,_0x3d8248);this['_exp'][_0x493f65]=this[_0x2ae4df(0x30c)][_0x493f65]||0x0;const _0xa70d8e=this[_0x2ae4df(0x30c)][_0x493f65]-this['currentClassLevelExp'](_0x493f65,_0x3d8248);return(_0xa70d8e/_0x45a7f8)[_0x2ae4df(0x4b6)](0x0,0x1);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x4a7)]=function(){const _0x566ae3=_0x306cf5;for(;;){const _0x2e90b1=DataManager[_0x566ae3(0x1e6)](this);if(_0x2e90b1[_0x566ae3(0x4c9)]>0x0){if(_0x566ae3(0x2c8)===_0x566ae3(0x35c)){const _0x4f4f9d=_0xf1c443[_0x3aac52];if(_0x4f4f9d){const _0x47f861=_0x48a1f9['ClassChangeSystem'][_0x566ae3(0x3c3)],_0x23859d=_0x4f4f9d['note'];if(_0x23859d[_0x566ae3(0x260)](_0x47f861[_0x566ae3(0x422)]))return _0x18438b(_0x16ec4c['$1']);}return _0x489d9f[_0x566ae3(0x3e0)][_0x566ae3(0x510)][_0x566ae3(0x4a8)][_0x566ae3(0x423)];}else for(const _0x1b0109 of _0x2e90b1){this[_0x566ae3(0x32f)](_0x1b0109);}}else break;}},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x349)]=function(){const _0x33b77b=_0x306cf5;let _0x1a3bdb=[];const _0x4c9da1=VisuMZ['ClassChangeSystem'][_0x33b77b(0x3c3)],_0x2db268=this[_0x33b77b(0x505)]()[_0x33b77b(0x4d3)],_0x5ebf54=_0x2db268[_0x33b77b(0x260)](_0x4c9da1[_0x33b77b(0x4b3)]);if(_0x5ebf54){if(_0x33b77b(0x470)!==_0x33b77b(0x30d))for(const _0x361cdb of _0x5ebf54){if(!_0x361cdb)continue;_0x361cdb[_0x33b77b(0x260)](_0x4c9da1[_0x33b77b(0x4b3)]);const _0x4421d9=String(RegExp['$1'])[_0x33b77b(0x500)](',')[_0x33b77b(0x306)](_0x7fa64c=>Number(_0x7fa64c));_0x1a3bdb=_0x1a3bdb[_0x33b77b(0x202)](_0x4421d9);}else this[_0x33b77b(0x1da)]=_0x47cabe;}_0x1a3bdb=_0x1a3bdb[_0x33b77b(0x4b5)]((_0x2897de,_0x2efc48,_0x729b6a)=>_0x729b6a[_0x33b77b(0x223)](_0x2897de)===_0x2efc48),_0x1a3bdb[_0x33b77b(0x495)](null)[_0x33b77b(0x495)](undefined),_0x1a3bdb[_0x33b77b(0x228)]((_0x2412d9,_0x57c89e)=>_0x2412d9-_0x57c89e),this[_0x33b77b(0x446)]=_0x1a3bdb;},Game_Actor[_0x306cf5(0x1fe)]['isClassChangeTierRestricted']=function(_0x4885c5){const _0x567c31=_0x306cf5;return this['_classChangeTierRestrictions']===undefined&&this['initClassChangeRestrictions'](),this['_classChangeTierRestrictions'][_0x567c31(0x1bc)](_0x4885c5);},Game_Actor[_0x306cf5(0x1fe)][_0x306cf5(0x455)]=function(_0x5cd362){const _0x3bcad7=_0x306cf5;this[_0x3bcad7(0x446)]===undefined&&this[_0x3bcad7(0x349)]();if(this[_0x3bcad7(0x446)][_0x3bcad7(0x1bc)](_0x5cd362))return;this[_0x3bcad7(0x446)][_0x3bcad7(0x3a6)](_0x5cd362),this['_classChangeTierRestrictions'][_0x3bcad7(0x228)]((_0xfafc13,_0x3322bd)=>_0xfafc13-_0x3322bd);},Game_Actor[_0x306cf5(0x1fe)]['removeClassChangeTierRestriction']=function(_0x113331){const _0x58d1b0=_0x306cf5;this['_classChangeTierRestrictions']===undefined&&this['initClassChangeRestrictions']();if(!this['_classChangeTierRestrictions'][_0x58d1b0(0x1bc)](_0x113331))return;this[_0x58d1b0(0x446)][_0x58d1b0(0x495)](_0x113331),this['_classChangeTierRestrictions'][_0x58d1b0(0x228)]((_0x5681ed,_0x629fdd)=>_0x5681ed-_0x629fdd);},Game_Enemy[_0x306cf5(0x1fe)]['classPoints']=function(){const _0x185d17=_0x306cf5,_0x586d6c=VisuMZ[_0x185d17(0x3e0)]['Settings'][_0x185d17(0x2b4)],_0x226494=VisuMZ['ClassChangeSystem'][_0x185d17(0x3c3)],_0x49f465=this[_0x185d17(0x23d)]()[_0x185d17(0x4d3)];if(_0x49f465[_0x185d17(0x260)](_0x226494['EnemyClassPoints']))try{return'cSrey'==='cSrey'?eval(RegExp['$1']):_0x4c70ca[_0x185d17(0x41b)];}catch(_0x4cc539){if($gameTemp[_0x185d17(0x3a3)]())console[_0x185d17(0x252)](_0x4cc539);return 0x0;}try{return eval(_0x586d6c['PerEnemy']);}catch(_0x33dcab){if($gameTemp[_0x185d17(0x3a3)]())console['log'](_0x33dcab);return 0x0;}},Game_Enemy[_0x306cf5(0x1fe)][_0x306cf5(0x2a2)]=function(){const _0xeecdc=_0x306cf5,_0x1d59cb=VisuMZ['ClassChangeSystem'][_0xeecdc(0x510)][_0xeecdc(0x2c4)],_0x90f885=VisuMZ[_0xeecdc(0x3e0)][_0xeecdc(0x3c3)],_0x133470=this[_0xeecdc(0x23d)]()[_0xeecdc(0x4d3)];if(_0x133470[_0xeecdc(0x260)](_0x90f885[_0xeecdc(0x359)]))try{if('QrDCk'===_0xeecdc(0x4a9))this[_0xeecdc(0x3b1)](...arguments);else return eval(RegExp['$1']);}catch(_0x3f7fba){if(_0xeecdc(0x258)==='BFuhi'){if($gameTemp[_0xeecdc(0x3a3)]())console[_0xeecdc(0x252)](_0x3f7fba);return 0x0;}else _0x613996+=0x0;}try{if(_0xeecdc(0x1fc)!=='PjTjJ')return eval(_0x1d59cb[_0xeecdc(0x21a)]);else this[_0xeecdc(0x4fc)]();}catch(_0x4a23f6){if(_0xeecdc(0x2dd)!==_0xeecdc(0x42b)){if($gameTemp[_0xeecdc(0x3a3)]())console[_0xeecdc(0x252)](_0x4a23f6);return 0x0;}else{const _0x36972b=_0x15e5d7[_0xeecdc(0x431)]();if(_0x36972b<_0x268ad4)return![];}}},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x415)]=Game_Party[_0x306cf5(0x1fe)]['initialize'],Game_Party[_0x306cf5(0x1fe)]['initialize']=function(){const _0x4035ed=_0x306cf5;VisuMZ[_0x4035ed(0x3e0)][_0x4035ed(0x415)][_0x4035ed(0x255)](this),this['initClassChangeUnlocks']();},Game_Party[_0x306cf5(0x1fe)][_0x306cf5(0x222)]=function(){const _0x3ce413=_0x306cf5;this[_0x3ce413(0x48b)]=[];},Game_Party['prototype'][_0x306cf5(0x3e4)]=function(){const _0x39efd1=_0x306cf5;if(this['_unlockedClasses']===undefined)this[_0x39efd1(0x222)]();return this[_0x39efd1(0x48b)];},Game_Party[_0x306cf5(0x1fe)]['unlockClass']=function(_0x1d459f){const _0x4a1957=_0x306cf5;for(const _0x44de81 of this[_0x4a1957(0x28a)]()){if('GuATK'!==_0x4a1957(0x2c0))return _0x1b6f47['ClassChangeSystem'][_0x4a1957(0x510)][_0x4a1957(0x2c4)][_0x4a1957(0x45b)];else{if(!_0x44de81)continue;_0x44de81[_0x4a1957(0x32f)](_0x1d459f);}}if(this['_unlockedClasses']===undefined)this[_0x4a1957(0x222)]();if(this['_unlockedClasses'][_0x4a1957(0x1bc)](_0x1d459f))return;this[_0x4a1957(0x48b)][_0x4a1957(0x3a6)](_0x1d459f),this[_0x4a1957(0x48b)][_0x4a1957(0x228)](function(_0x438024,_0x291bfc){return _0x438024-_0x291bfc;});},Game_Party[_0x306cf5(0x1fe)]['removeUnlockedClass']=function(_0x1a8821){const _0xe2b26f=_0x306cf5;for(const _0x5a00dc of this['allMembers']()){if(!_0x5a00dc)continue;_0x5a00dc['removeUnlockedClass'](_0x1a8821);}if(this['_unlockedClasses']===undefined)this[_0xe2b26f(0x222)]();if(!this[_0xe2b26f(0x48b)]['includes'](_0x1a8821))return;this[_0xe2b26f(0x48b)][_0xe2b26f(0x495)](_0x1a8821)[_0xe2b26f(0x495)](null),this['_unlockedClasses']['sort'](function(_0x389b28,_0x4b30cc){return _0x389b28-_0x4b30cc;});},Game_Party[_0x306cf5(0x1fe)][_0x306cf5(0x35d)]=function(){const _0x331c90=_0x306cf5,_0x4bdf8d=this[_0x331c90(0x28a)]();return Math[_0x331c90(0x36f)](...this[_0x331c90(0x517)]()[_0x331c90(0x306)](_0x1cd742=>_0x1cd742[_0x331c90(0x314)]()));},Game_Troop['prototype']['classPointsTotal']=function(){const _0x46c297=_0x306cf5;return this[_0x46c297(0x438)]()[_0x46c297(0x43a)]((_0x3bd8da,_0x50716a)=>_0x3bd8da+_0x50716a[_0x46c297(0x51f)](),0x0);},Game_Troop[_0x306cf5(0x1fe)][_0x306cf5(0x346)]=function(){const _0x4a9b21=_0x306cf5;return this[_0x4a9b21(0x438)]()[_0x4a9b21(0x43a)]((_0x381788,_0x3318b4)=>_0x381788+_0x3318b4[_0x4a9b21(0x2a2)](),0x0);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x4c3)]=Scene_Menu['prototype']['createCommandWindow'],Scene_Menu[_0x306cf5(0x1fe)][_0x306cf5(0x24b)]=function(){const _0x49cc9c=_0x306cf5;VisuMZ[_0x49cc9c(0x3e0)]['Scene_Menu_createCommandWindow'][_0x49cc9c(0x255)](this);const _0x1d398d=this[_0x49cc9c(0x315)];_0x1d398d['setHandler'](_0x49cc9c(0x3e0),this[_0x49cc9c(0x1d3)][_0x49cc9c(0x313)](this));},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x490)]=Scene_Menu['prototype'][_0x306cf5(0x405)],Scene_Menu[_0x306cf5(0x1fe)][_0x306cf5(0x405)]=function(){const _0x189656=_0x306cf5;this[_0x189656(0x315)][_0x189656(0x262)]()==='ClassChangeSystem'?SceneManager[_0x189656(0x3a6)](Scene_ClassChange):VisuMZ[_0x189656(0x3e0)][_0x189656(0x490)][_0x189656(0x255)](this);};function Scene_ClassChange(){const _0x28e3ca=_0x306cf5;this[_0x28e3ca(0x3b1)](...arguments);}Scene_ClassChange[_0x306cf5(0x1fe)]=Object[_0x306cf5(0x520)](Scene_MenuBase[_0x306cf5(0x1fe)]),Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x2cd)]=Scene_ClassChange,Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x3b1)]=function(){const _0x5afe7f=_0x306cf5;Scene_MenuBase[_0x5afe7f(0x1fe)][_0x5afe7f(0x3b1)][_0x5afe7f(0x255)](this),this[_0x5afe7f(0x51b)]=this[_0x5afe7f(0x51b)]||[];},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x4ef)]=function(){return!![];},Scene_ClassChange['prototype'][_0x306cf5(0x244)]=function(){const _0x55a617=_0x306cf5;if(this[_0x55a617(0x2b2)]()>0x1)return this[_0x55a617(0x4cd)]&&this['_classTierWindow'][_0x55a617(0x418)];else{if(_0x55a617(0x285)===_0x55a617(0x4ec)){if(_0x9efa7e[_0x55a617(0x3a3)]())_0x5b49c5[_0x55a617(0x252)](_0x4a4b09);}else return this['_classListWindow']&&this[_0x55a617(0x1d1)][_0x55a617(0x418)];}},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x332)]=function(){const _0x15e738=_0x306cf5;Scene_MenuBase['prototype'][_0x15e738(0x332)][_0x15e738(0x255)](this),this[_0x15e738(0x235)]();},Scene_ClassChange['prototype'][_0x306cf5(0x45e)]=function(){return!![];},Scene_ClassChange[_0x306cf5(0x1fe)]['isBottomHelpMode']=function(){const _0x331c4a=_0x306cf5;if(ConfigManager[_0x331c4a(0x27b)]&&ConfigManager[_0x331c4a(0x347)]!==undefined){if(_0x331c4a(0x476)===_0x331c4a(0x3d1)){if(!_0x17c64b[_0xa1d3f6])return;this[_0x331c4a(0x3d3)]()&&this[_0x331c4a(0x282)](_0x43bffd,_0x41fdad,_0x1ff3f9,_0x36aaf9),this[_0x331c4a(0x299)](_0x395092[_0x331c4a(0x4b2)]()),this[_0x331c4a(0x2fa)](_0x2d7423[_0x331c4a(0x420)],_0x4b1752,_0x27d3de,0x30),this[_0x331c4a(0x37c)](),this[_0x331c4a(0x2fa)](_0x3851c3[_0x331c4a(0x353)](_0x8e31ce),_0x224213+0x54,_0x4074e3,0x24,_0x331c4a(0x4c1));}else return ConfigManager[_0x331c4a(0x347)];}else{if(this[_0x331c4a(0x4e0)]())return this[_0x331c4a(0x3bd)]()[_0x331c4a(0x260)](/LOWER/i);else Scene_MenuBase[_0x331c4a(0x1fe)]['isRightInputMode'][_0x331c4a(0x255)](this);}},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x427)]=function(){const _0x31e77c=_0x306cf5;if(ConfigManager[_0x31e77c(0x27b)]&&ConfigManager[_0x31e77c(0x33d)]!==undefined){if(_0x31e77c(0x421)!==_0x31e77c(0x356))return ConfigManager[_0x31e77c(0x33d)];else _0x44784a[_0x31e77c(0x3b5)](_0x71dccb,_0xa7d2e8);}else{if(this[_0x31e77c(0x4e0)]()){if(_0x31e77c(0x209)!==_0x31e77c(0x209))this[_0x31e77c(0x480)][_0x31e77c(0x51f)]=_0x43f18e[_0x31e77c(0x508)]();else return this[_0x31e77c(0x3bd)]()[_0x31e77c(0x260)](/RIGHT/i);}else{if(_0x31e77c(0x387)!==_0x31e77c(0x217))Scene_MenuBase[_0x31e77c(0x1fe)][_0x31e77c(0x427)][_0x31e77c(0x255)](this);else{if(_0x4df74a[_0x31e77c(0x27b)]&&_0x4fa659['uiHelpPosition']!==_0x36434b)return _0x4003d[_0x31e77c(0x347)];else{if(this[_0x31e77c(0x4e0)]())return this[_0x31e77c(0x3bd)]()[_0x31e77c(0x260)](/LOWER/i);else _0x490e98[_0x31e77c(0x1fe)][_0x31e77c(0x427)][_0x31e77c(0x255)](this);}}}}},Scene_ClassChange['prototype'][_0x306cf5(0x3bd)]=function(){const _0x4bc7ea=_0x306cf5;return VisuMZ['ClassChangeSystem']['Settings'][_0x4bc7ea(0x4a8)][_0x4bc7ea(0x4e9)];},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x4e0)]=function(){const _0x42be07=_0x306cf5;return VisuMZ[_0x42be07(0x3e0)][_0x42be07(0x510)][_0x42be07(0x4a8)][_0x42be07(0x493)];},Scene_ClassChange['prototype'][_0x306cf5(0x520)]=function(){const _0xa2ec6f=_0x306cf5;Scene_MenuBase[_0xa2ec6f(0x1fe)]['create'][_0xa2ec6f(0x255)](this),this[_0xa2ec6f(0x2f7)](),this[_0xa2ec6f(0x414)](),this['createClassTierWindow'](),this[_0xa2ec6f(0x371)](),this[_0xa2ec6f(0x434)](),this['refreshActor']();},Scene_ClassChange['prototype'][_0x306cf5(0x414)]=function(){const _0x250875=_0x306cf5,_0x45bc2d=this['statusWindowRect']();this[_0x250875(0x3df)]=new Window_ClassStatus(_0x45bc2d),this[_0x250875(0x355)](this[_0x250875(0x3df)]),this[_0x250875(0x3df)][_0x250875(0x34f)](VisuMZ['ClassChangeSystem'][_0x250875(0x510)]['Window'][_0x250875(0x201)]);},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x46d)]=function(){const _0xb5a867=_0x306cf5,_0x1bebfa=VisuMZ['ClassChangeSystem'][_0xb5a867(0x510)][_0xb5a867(0x4a8)];if(_0x1bebfa[_0xb5a867(0x37b)])return _0xb5a867(0x4f6)!==_0xb5a867(0x2e6)?_0x1bebfa[_0xb5a867(0x37b)][_0xb5a867(0x255)](this):this[_0xb5a867(0x3ba)](_0x6be519,_0xbd8f4c);const _0xefa900=Math[_0xb5a867(0x1f5)](Graphics[_0xb5a867(0x292)]/0x2),_0x3120f8=this[_0xb5a867(0x518)](),_0xfde652=this[_0xb5a867(0x427)]()?0x0:_0xefa900,_0x4ad408=this['mainAreaTop']();return new Rectangle(_0xfde652,_0x4ad408,_0xefa900,_0x3120f8);},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x22b)]=function(){const _0x5c040e=_0x306cf5,_0xa667e1=this[_0x5c040e(0x43f)](),_0x35f3d8=new Window_ClassTier(_0xa667e1);_0x35f3d8[_0x5c040e(0x215)](this['_helpWindow']),_0x35f3d8[_0x5c040e(0x34f)](VisuMZ['ClassChangeSystem']['Settings'][_0x5c040e(0x4a8)][_0x5c040e(0x296)]),this[_0x5c040e(0x355)](_0x35f3d8),this[_0x5c040e(0x4cd)]=_0x35f3d8,_0x35f3d8[_0x5c040e(0x407)](_0x5c040e(0x486),this['popScene']['bind'](this)),this[_0x5c040e(0x2b2)]()>0x1&&(_0x35f3d8[_0x5c040e(0x407)](_0x5c040e(0x3c0),this['nextActor'][_0x5c040e(0x313)](this)),_0x35f3d8['setHandler'](_0x5c040e(0x3d9),this['previousActor'][_0x5c040e(0x313)](this))),_0x35f3d8[_0x5c040e(0x407)](_0x5c040e(0x3ce),this[_0x5c040e(0x31f)][_0x5c040e(0x313)](this));},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x43f)]=function(){const _0x14f98f=_0x306cf5,_0x18c8bd=VisuMZ['ClassChangeSystem'][_0x14f98f(0x510)][_0x14f98f(0x4a8)];if(_0x18c8bd[_0x14f98f(0x33a)])return _0x18c8bd[_0x14f98f(0x33a)][_0x14f98f(0x255)](this);const _0x534ae8=Graphics[_0x14f98f(0x292)]-this[_0x14f98f(0x3df)][_0x14f98f(0x4e7)],_0x34d555=this['mainAreaHeight'](),_0x2055b6=this['isRightInputMode']()?_0x534ae8:0x0,_0x1ec2e1=this[_0x14f98f(0x448)]();return new Rectangle(_0x2055b6,_0x1ec2e1,_0x534ae8,_0x34d555);},Scene_ClassChange[_0x306cf5(0x1fe)]['createClassListWindow']=function(){const _0x5c9863=_0x306cf5,_0x16a088=this[_0x5c9863(0x213)](),_0x1a2158=new Window_ClassList(_0x16a088);_0x1a2158[_0x5c9863(0x215)](this[_0x5c9863(0x4d2)]),_0x1a2158[_0x5c9863(0x1b2)](this[_0x5c9863(0x3df)]),_0x1a2158['setBackgroundType'](VisuMZ[_0x5c9863(0x3e0)][_0x5c9863(0x510)][_0x5c9863(0x4a8)][_0x5c9863(0x383)]),this[_0x5c9863(0x355)](_0x1a2158),this[_0x5c9863(0x1d1)]=_0x1a2158,_0x1a2158['setHandler'](_0x5c9863(0x486),this['onClassListCancel'][_0x5c9863(0x313)](this));if(this[_0x5c9863(0x2b2)]()<=0x1){if(_0x5c9863(0x2c3)!==_0x5c9863(0x2c3)){if(_0x198dd2[_0x5c9863(0x3a3)]())_0x3ff3db['log'](_0x26a67e);}else _0x1a2158[_0x5c9863(0x407)](_0x5c9863(0x3c0),this[_0x5c9863(0x399)][_0x5c9863(0x313)](this)),_0x1a2158[_0x5c9863(0x407)]('pageup',this['previousActor'][_0x5c9863(0x313)](this));}_0x1a2158['setHandler'](_0x5c9863(0x4af),this[_0x5c9863(0x4db)][_0x5c9863(0x313)](this));},Scene_ClassChange['prototype']['classListWindowRect']=function(){const _0x12580b=_0x306cf5,_0x352981=VisuMZ[_0x12580b(0x3e0)][_0x12580b(0x510)][_0x12580b(0x4a8)];if(_0x352981[_0x12580b(0x32a)])return _0x352981[_0x12580b(0x32a)][_0x12580b(0x255)](this);const _0x5b4aa1=Graphics['boxWidth']-this[_0x12580b(0x3df)][_0x12580b(0x4e7)],_0x343ef9=this['mainAreaHeight'](),_0x2fd48f=this[_0x12580b(0x427)]()?_0x5b4aa1:0x0,_0x4804e1=this[_0x12580b(0x448)]();return new Rectangle(_0x2fd48f,_0x4804e1,_0x5b4aa1,_0x343ef9);},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x2b2)]=function(){const _0xf30d4f=_0x306cf5;if(this[_0xf30d4f(0x3de)]!==undefined)return this[_0xf30d4f(0x3de)];return this['_highestTier']=$gameParty[_0xf30d4f(0x35d)](),this['_highestTier'];},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x434)]=function(){const _0x294925=_0x306cf5;this['highestTier']()>0x1?(this[_0x294925(0x4cd)][_0x294925(0x20b)](0x0),this['_classTierWindow']['show'](),this[_0x294925(0x4cd)][_0x294925(0x350)](),this[_0x294925(0x1d1)][_0x294925(0x302)](),this['_classListWindow'][_0x294925(0x200)]()):(this[_0x294925(0x1d1)][_0x294925(0x20b)](0x0),this[_0x294925(0x1d1)][_0x294925(0x3a1)](0x1),this[_0x294925(0x1d1)][_0x294925(0x224)](),this[_0x294925(0x1d1)][_0x294925(0x350)](),this['_classTierWindow'][_0x294925(0x302)](),this['_classTierWindow'][_0x294925(0x200)]());},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x256)]=function(){const _0x55ca7d=_0x306cf5,_0x2d1435=this[_0x55ca7d(0x505)]();_0x2d1435['checkForAutoClassUnlocks'](),this[_0x55ca7d(0x3df)][_0x55ca7d(0x46e)](_0x2d1435),this[_0x55ca7d(0x4cd)][_0x55ca7d(0x46e)](_0x2d1435),this[_0x55ca7d(0x1d1)][_0x55ca7d(0x46e)](_0x2d1435);},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x1d2)]=function(){const _0x283045=_0x306cf5;Scene_MenuBase['prototype']['onActorChange']['call'](this),this[_0x283045(0x256)](),this[_0x283045(0x434)]();},Scene_ClassChange['prototype'][_0x306cf5(0x31f)]=function(){const _0xece19c=_0x306cf5,_0xbeb66e=this[_0xece19c(0x4cd)]['currentExt']();this[_0xece19c(0x1d1)]['setTier'](_0xbeb66e),this[_0xece19c(0x1d1)][_0xece19c(0x224)](),this[_0xece19c(0x1d1)][_0xece19c(0x350)](),this['_classListWindow'][_0xece19c(0x20b)](0x0),this[_0xece19c(0x4cd)]['hide'](),this[_0xece19c(0x4cd)][_0xece19c(0x200)](),this['forceRemoveClassChangeAnimations']();},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x33c)]=function(){const _0x2dce98=_0x306cf5;this['highestTier']()>0x1?(this[_0x2dce98(0x4cd)][_0x2dce98(0x224)](),this[_0x2dce98(0x4cd)]['activate'](),this[_0x2dce98(0x1d1)][_0x2dce98(0x302)](),this[_0x2dce98(0x1d1)][_0x2dce98(0x200)](),this[_0x2dce98(0x3df)][_0x2dce98(0x361)](null)):this[_0x2dce98(0x303)]();},Scene_ClassChange['prototype'][_0x306cf5(0x4db)]=function(){const _0x13df52=_0x306cf5,_0x1fbe82=this['_classListWindow']['_tier'],_0x580a61=this[_0x13df52(0x1d1)]['currentExt'](),_0x2bd98e=this['_classListWindow'][_0x13df52(0x4e5)](),_0x4ec4e5=_0x580a61?_0x580a61['id']:0x0;this[_0x13df52(0x4f2)][_0x13df52(0x27a)](_0x4ec4e5,_0x1fbe82),this[_0x13df52(0x4cd)][_0x13df52(0x345)](),this['_classListWindow']['refresh'](),this['_statusWindow'][_0x13df52(0x361)](null),this[_0x13df52(0x4df)](_0x4ec4e5,_0x1fbe82),this[_0x13df52(0x434)]();if(this[_0x13df52(0x4cd)][_0x13df52(0x418)])this[_0x13df52(0x4cd)][_0x13df52(0x2d6)](_0x1fbe82-0x1);else this['_classListWindow']['active']&&this[_0x13df52(0x1d1)][_0x13df52(0x2d6)](_0x2bd98e);},Scene_ClassChange[_0x306cf5(0x1fe)]['startClassChangeAnimation']=function(_0x2b6c59,_0x1895a9){const _0x297f64=_0x306cf5,_0x4c4250=this[_0x297f64(0x395)](_0x1895a9);this[_0x297f64(0x3b7)](_0x2b6c59,_0x1895a9,_0x4c4250);},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x395)]=function(_0x37684e){const _0x3b55a7=_0x306cf5,_0x497ef2=new Sprite(),_0x102c9a=VisuMZ[_0x3b55a7(0x3e0)]['Settings'][_0x3b55a7(0x4a8)];if(_0x37684e<=0x1){if(_0x3b55a7(0x34a)!==_0x3b55a7(0x289)){const _0x45dd1c=this['_statusWindow'];_0x497ef2['x']=_0x45dd1c['x']+Math['round'](_0x45dd1c[_0x3b55a7(0x4e7)]/0x2),_0x497ef2['y']=_0x45dd1c['y']+Math[_0x3b55a7(0x507)](_0x45dd1c[_0x3b55a7(0x1d4)]/0x2),_0x497ef2['x']+=_0x102c9a[_0x3b55a7(0x2a0)]||0x0,_0x497ef2['y']+=_0x102c9a[_0x3b55a7(0x28b)]||0x0;}else _0xd4dcac[_0x3b55a7(0x343)](_0x38fb55,_0x8f2572);}else{if(_0x3b55a7(0x2d7)!==_0x3b55a7(0x4b7)){const _0x2ebd8e=this[_0x3b55a7(0x4cd)],_0x2d001e=_0x2ebd8e['itemRect'](_0x2ebd8e[_0x3b55a7(0x4e5)]()),_0x58782d=_0x2ebd8e[_0x3b55a7(0x1de)]||0x0;_0x497ef2['x']=_0x2ebd8e['x']+_0x2d001e['x']+Math[_0x3b55a7(0x507)](_0x2d001e[_0x3b55a7(0x4e7)]/0x2)+_0x58782d,_0x497ef2['y']=_0x2ebd8e['y']+_0x2d001e['y']+Math[_0x3b55a7(0x507)](_0x2d001e['height']/0x2)+_0x58782d,_0x497ef2['x']+=_0x102c9a[_0x3b55a7(0x3b8)]||0x0,_0x497ef2['y']+=_0x102c9a[_0x3b55a7(0x2f9)]||0x0;}else{if(this['currentExt']()){const _0x2318d8=_0x39e9f2[_0x3b55a7(0x3e0)][_0x3b55a7(0x510)][_0x3b55a7(0x2d8)];if(!_0x2318d8)return;const _0x1f5f1b=_0x2318d8[this[_0x3b55a7(0x3e3)]()-0x1];if(!_0x1f5f1b)return;this[_0x3b55a7(0x4d2)][_0x3b55a7(0x389)](_0x1f5f1b[_0x3b55a7(0x4bb)]);}else this[_0x3b55a7(0x4d2)][_0x3b55a7(0x389)]('');}}return _0x497ef2['x']+=this['_windowLayer']['x'],_0x497ef2['y']+=this[_0x3b55a7(0x40b)]['y'],_0x497ef2;},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x3b7)]=function(_0x3bab81,_0x3d90c5,_0x1ab703){const _0x48c9dd=_0x306cf5,_0x3ad877=this['getClassChangeAnimationID'](_0x3bab81),_0x4e3fe7=$dataAnimations[_0x3ad877];if(!_0x4e3fe7)return;const _0x5da015=this[_0x48c9dd(0x443)](_0x4e3fe7),_0x4d155c=new(_0x5da015?Sprite_AnimationMV:Sprite_Animation)(),_0x46d5ca=[_0x1ab703],_0x2740fc=0x0;_0x4d155c[_0x48c9dd(0x1a6)](_0x46d5ca,_0x4e3fe7,![],_0x2740fc,null),_0x4d155c[_0x48c9dd(0x324)]=_0x3d90c5,this[_0x48c9dd(0x2de)](_0x1ab703),this[_0x48c9dd(0x2de)](_0x4d155c),this[_0x48c9dd(0x51b)][_0x48c9dd(0x3a6)](_0x4d155c);},Scene_ClassChange['prototype'][_0x306cf5(0x4b9)]=function(_0x5717ad){const _0x47c000=_0x306cf5,_0x5cf956=$dataClasses[_0x5717ad];if(_0x5cf956){const _0x5a7555=VisuMZ[_0x47c000(0x3e0)][_0x47c000(0x3c3)],_0xfdfc68=_0x5cf956[_0x47c000(0x4d3)];if(_0xfdfc68[_0x47c000(0x260)](_0x5a7555[_0x47c000(0x422)])){if(_0x47c000(0x3aa)===_0x47c000(0x51d))_0x59f3e8=0x0;else return Number(RegExp['$1']);}}return VisuMZ[_0x47c000(0x3e0)][_0x47c000(0x510)][_0x47c000(0x4a8)]['ConfirmAnimationID'];},Scene_ClassChange['prototype'][_0x306cf5(0x443)]=function(_0x36da3b){const _0x422b34=_0x306cf5;return!!_0x36da3b[_0x422b34(0x20c)];},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x235)]=function(){const _0x220718=_0x306cf5,_0x493c41=[];for(const _0x2d8017 of this[_0x220718(0x51b)]){if(_0x220718(0x1a8)==='awOQj'){_0x294591=_0x2bc6ee||_0x220718(0x42d);const _0x354dd4=_0x220718(0x488)[_0x220718(0x25d)](_0xc48980[_0x220718(0x238)]),_0x386f55=_0x530124['classPointsFmt'],_0x4c414f=_0x386f55['format'](_0x27911c,_0x387f35[_0x220718(0x48a)],_0x354dd4,_0x6b279e[_0x220718(0x393)]),_0xa4e628=this['textSizeEx'](_0x4c414f)[_0x220718(0x4e7)];if(_0x28dcf3===_0x220718(0x42d))_0x358b8a+=0x0;else _0x20581b==='center'?_0x5c5856+=_0x241a87[_0x220718(0x507)]((_0x40316b-_0xa4e628)/0x2):_0x342ba5+=_0x3f43cc-_0xa4e628;this[_0x220718(0x1eb)](_0x4c414f,_0x3f38f5,_0x474275);}else{if(!_0x2d8017)continue;if(_0x2d8017[_0x220718(0x37e)]())continue;_0x493c41['push'](_0x2d8017);}}for(const _0x1f25fb of _0x493c41){if(!_0x1f25fb)continue;for(const _0x3b6b3b of _0x1f25fb[_0x220718(0x34c)]){this[_0x220718(0x3fd)](_0x3b6b3b);}this[_0x220718(0x51b)][_0x220718(0x495)](_0x1f25fb),this[_0x220718(0x3fd)](_0x1f25fb);};},Scene_ClassChange['prototype'][_0x306cf5(0x20a)]=function(){const _0x26ed2a=_0x306cf5,_0x32d2d3=[];for(const _0x304365 of this[_0x26ed2a(0x51b)]){if(_0x26ed2a(0x21b)!=='YGFzy'){if(this[_0x26ed2a(0x2ae)]!==_0x47bcb9)return this['_priorityFaceName'];return _0x58d80a[_0x26ed2a(0x3d5)](this)||_0xefa4b0['ClassChangeSystem'][_0x26ed2a(0x31e)][_0x26ed2a(0x255)](this);}else{if(!_0x304365)continue;if(_0x304365[_0x26ed2a(0x324)]<=0x1)continue;_0x32d2d3['push'](_0x304365);}}for(const _0x1612db of _0x32d2d3){if(_0x26ed2a(0x29d)!=='RAxRe'){if(!_0x1612db)continue;for(const _0x5ac781 of _0x1612db['_targets']){if(_0x26ed2a(0x475)!==_0x26ed2a(0x32b))this['removeChild'](_0x5ac781);else{if(this[_0x26ed2a(0x2a1)]())this[_0x26ed2a(0x432)]='SParamRates';let _0x3beb5f=_0x151c93[_0x26ed2a(0x3e0)][_0x26ed2a(0x22d)][_0x26ed2a(0x255)](this,_0x5c0f04);if(this[_0x26ed2a(0x2a1)]())this[_0x26ed2a(0x432)]=_0x7fe7c7;return _0x3beb5f;}}this[_0x26ed2a(0x51b)]['remove'](_0x1612db),this[_0x26ed2a(0x3fd)](_0x1612db);}else _0x433d19[_0x26ed2a(0x3e0)]['Game_Battler_gainSilentTp'][_0x26ed2a(0x255)](this,_0x454809);};},Scene_ClassChange['prototype'][_0x306cf5(0x3ac)]=function(){const _0x3a7411=_0x306cf5;if(!this['_classTierWindow'])return![];if(!this[_0x3a7411(0x4cd)][_0x3a7411(0x418)])return![];return this[_0x3a7411(0x4cd)][_0x3a7411(0x264)]();},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x323)]=function(){const _0x3494c2=_0x306cf5;if(this[_0x3494c2(0x3ac)]())return TextManager[_0x3494c2(0x439)]('shift');return Scene_MenuBase[_0x3494c2(0x1fe)][_0x3494c2(0x323)][_0x3494c2(0x255)](this);},Scene_ClassChange['prototype'][_0x306cf5(0x28f)]=function(){const _0x171936=_0x306cf5;if(this[_0x171936(0x3ac)]())return TextManager['classChange_multiclass_ShiftHelp'];return Scene_MenuBase[_0x171936(0x1fe)]['buttonAssistText3'][_0x171936(0x255)](this);},Scene_ClassChange[_0x306cf5(0x1fe)]['buttonAssistOffset3']=function(){const _0x1db2ab=_0x306cf5;if(this['buttonAssistSlotWindowShift']()){if('rLNbW'===_0x1db2ab(0x401))return this[_0x1db2ab(0x335)][_0x1db2ab(0x4e7)]/0x5/-0x3;else _0x5601aa['removeUnlockedClass'](_0xd0ecba);}return Scene_MenuBase[_0x1db2ab(0x1fe)][_0x1db2ab(0x47c)][_0x1db2ab(0x255)](this);},Scene_ClassChange['prototype']['createBackground']=function(){const _0x1a5bf3=_0x306cf5;Scene_MenuBase['prototype'][_0x1a5bf3(0x24e)]['call'](this),this[_0x1a5bf3(0x1a5)](this['getBackgroundOpacity']()),this[_0x1a5bf3(0x27d)]();},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x1ed)]=function(){const _0x5ee6f4=_0x306cf5;return VisuMZ['ClassChangeSystem'][_0x5ee6f4(0x510)]['BgSettings'][_0x5ee6f4(0x4e2)];},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x27d)]=function(){const _0x37ee51=_0x306cf5,_0x1fb603=VisuMZ[_0x37ee51(0x3e0)][_0x37ee51(0x510)][_0x37ee51(0x376)];_0x1fb603&&(_0x1fb603['BgFilename1']!==''||_0x1fb603[_0x37ee51(0x2f0)]!=='')&&('gOjwV'==='gOjwV'?(this[_0x37ee51(0x297)]=new Sprite(ImageManager[_0x37ee51(0x44b)](_0x1fb603[_0x37ee51(0x19b)]||'')),this['_backSprite2']=new Sprite(ImageManager[_0x37ee51(0x525)](_0x1fb603[_0x37ee51(0x2f0)]||'')),this[_0x37ee51(0x2de)](this[_0x37ee51(0x297)]),this[_0x37ee51(0x2de)](this[_0x37ee51(0x49c)]),this[_0x37ee51(0x297)]['bitmap'][_0x37ee51(0x47f)](this[_0x37ee51(0x261)][_0x37ee51(0x313)](this,this['_backSprite1'])),this[_0x37ee51(0x49c)][_0x37ee51(0x374)]['addLoadListener'](this[_0x37ee51(0x261)]['bind'](this,this[_0x37ee51(0x49c)]))):(_0x1cf08f['ClassChangeSystem'][_0x37ee51(0x4da)][_0x37ee51(0x255)](this,_0x5c0ef8),this[_0x37ee51(0x4d0)](_0x4573f8)));},Scene_ClassChange[_0x306cf5(0x1fe)][_0x306cf5(0x261)]=function(_0x4eef5d){const _0x278bdc=_0x306cf5;this[_0x278bdc(0x2d4)](_0x4eef5d),this[_0x278bdc(0x2b3)](_0x4eef5d);},Window_Base[_0x306cf5(0x1fe)]['drawClassPoints']=function(_0x3d5d0c,_0x32fc49,_0x391ce1,_0x6d96b9,_0x2bb7e1){const _0x5d2566=_0x306cf5;_0x2bb7e1=_0x2bb7e1||'left';const _0x3101c6=_0x5d2566(0x488)[_0x5d2566(0x25d)](ImageManager[_0x5d2566(0x238)]),_0x74e095=TextManager[_0x5d2566(0x1bb)],_0x21c669=_0x74e095[_0x5d2566(0x25d)](_0x3d5d0c,TextManager[_0x5d2566(0x48a)],_0x3101c6,TextManager['classPointsFull']),_0x2a3003=this[_0x5d2566(0x2f1)](_0x21c669)[_0x5d2566(0x4e7)];if(_0x2bb7e1===_0x5d2566(0x42d))_0x5d2566(0x43b)==='YTXea'?_0x1d116a=0x0:_0x32fc49+=0x0;else _0x2bb7e1===_0x5d2566(0x460)?_0x32fc49+=Math[_0x5d2566(0x507)]((_0x6d96b9-_0x2a3003)/0x2):_0x32fc49+=_0x6d96b9-_0x2a3003;this['drawTextEx'](_0x21c669,_0x32fc49,_0x391ce1);},Window_Base[_0x306cf5(0x1fe)][_0x306cf5(0x35e)]=function(_0x1dffd3,_0x203ffb,_0x2af473,_0x9d4606,_0x4ac206,_0x50cf11){const _0x5bb4ef=_0x306cf5,_0x1f3d10=_0x1dffd3[_0x5bb4ef(0x431)](_0x203ffb);this[_0x5bb4ef(0x437)](_0x1f3d10,_0x2af473,_0x9d4606,_0x4ac206,_0x50cf11);},Window_Base['prototype']['drawJobPoints']=function(_0x56fdf9,_0x4745a0,_0x19ac0a,_0x28b685,_0x144a17){const _0x1a102d=_0x306cf5;_0x144a17=_0x144a17||_0x1a102d(0x42d);const _0x975699='\x5cI[%1]'['format'](ImageManager[_0x1a102d(0x34d)]),_0x3ecce5=TextManager[_0x1a102d(0x49e)],_0x55ddc7=_0x3ecce5[_0x1a102d(0x25d)](_0x56fdf9,TextManager['jobPointsAbbr'],_0x975699,TextManager[_0x1a102d(0x265)]),_0x2a9105=this[_0x1a102d(0x2f1)](_0x55ddc7)[_0x1a102d(0x4e7)];if(_0x144a17===_0x1a102d(0x42d)){if(_0x1a102d(0x4ea)!==_0x1a102d(0x1ad))_0x4745a0+=0x0;else{if(this[_0x1a102d(0x2a1)]())this['_multiclassCheck']=_0x1a102d(0x379);let _0x13826f=_0x2cb716[_0x1a102d(0x3e0)][_0x1a102d(0x478)][_0x1a102d(0x255)](this,_0xde4b61);if(this[_0x1a102d(0x2a1)]())this[_0x1a102d(0x432)]=_0x3c1913;return _0x13826f;}}else{if(_0x144a17===_0x1a102d(0x460))_0x4745a0+=Math['round']((_0x28b685-_0x2a9105)/0x2);else{if('bnkbv'!==_0x1a102d(0x425))return this[_0x1a102d(0x2ae)];else _0x4745a0+=_0x28b685-_0x2a9105;}}this['drawTextEx'](_0x55ddc7,_0x4745a0,_0x19ac0a);},Window_Base[_0x306cf5(0x1fe)]['drawActorJobPoints']=function(_0x34e59d,_0x29bd02,_0x5a1fb4,_0x2c7665,_0x5cc99c,_0x5eebdd){const _0x5c3b6c=_0x306cf5,_0x2706bb=_0x34e59d[_0x5c3b6c(0x328)](_0x29bd02);this['drawJobPoints'](_0x2706bb,_0x5a1fb4,_0x2c7665,_0x5cc99c,_0x5eebdd);},Window_Base[_0x306cf5(0x1fe)]['drawClassLevel']=function(_0x5a5780,_0x4d8cae,_0x55426b,_0x505793){const _0xc888ac=_0x306cf5;if(!$dataClasses[_0x4d8cae])return;this[_0xc888ac(0x3d3)]()&&this[_0xc888ac(0x282)](_0x5a5780,_0x4d8cae,_0x55426b,_0x505793),this[_0xc888ac(0x299)](ColorManager[_0xc888ac(0x4b2)]()),this[_0xc888ac(0x2fa)](TextManager[_0xc888ac(0x420)],_0x55426b,_0x505793,0x30),this[_0xc888ac(0x37c)](),this['drawText'](_0x5a5780[_0xc888ac(0x353)](_0x4d8cae),_0x55426b+0x54,_0x505793,0x24,_0xc888ac(0x4c1));},Window_Base[_0x306cf5(0x1fe)][_0x306cf5(0x3d3)]=function(){const _0x1b31ba=_0x306cf5;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x1b31ba(0x251)][_0x1b31ba(0x510)]['UI'][_0x1b31ba(0x26f)];},Window_Base[_0x306cf5(0x1fe)][_0x306cf5(0x282)]=function(_0x2dd402,_0x1cc1e6,_0x4f6bfe,_0x3a357f){const _0x46f980=_0x306cf5;if(!_0x2dd402)return;if(!_0x2dd402[_0x46f980(0x2a1)]())return;const _0x14a3eb=0x80,_0x489418=_0x2dd402[_0x46f980(0x230)](_0x1cc1e6);let _0x2d4a23=ColorManager[_0x46f980(0x4a6)](),_0x275399=ColorManager[_0x46f980(0x2fd)]();_0x489418>=0x1&&(_0x2d4a23=ColorManager[_0x46f980(0x206)](),_0x275399=ColorManager[_0x46f980(0x2df)]()),this[_0x46f980(0x49b)](_0x4f6bfe,_0x3a357f,_0x14a3eb,_0x489418,_0x2d4a23,_0x275399);},VisuMZ[_0x306cf5(0x3e0)][_0x306cf5(0x41d)]=Window_MenuCommand[_0x306cf5(0x1fe)][_0x306cf5(0x370)],Window_MenuCommand[_0x306cf5(0x1fe)][_0x306cf5(0x370)]=function(){const _0x2b1718=_0x306cf5;VisuMZ['ClassChangeSystem'][_0x2b1718(0x41d)][_0x2b1718(0x255)](this),this[_0x2b1718(0x1ce)]();},Window_MenuCommand['prototype']['addClassChangeSystemCommand']=function(){const _0x410138=_0x306cf5;if(!this['addClassChangeSystemCommandAutomatically']())return;if(!this[_0x410138(0x394)]())return;const _0x4881fb=TextManager['classChangeMenuCommand'],_0x227bfe=this[_0x410138(0x412)]();this[_0x410138(0x3eb)](_0x4881fb,_0x410138(0x3e0),_0x227bfe);},Window_MenuCommand[_0x306cf5(0x1fe)][_0x306cf5(0x3a2)]=function(){const _0x12895b=_0x306cf5;return Imported[_0x12895b(0x41a)]?![]:!![];},Window_MenuCommand[_0x306cf5(0x1fe)]['isClassChangeCommandVisible']=function(){const _0x30c9d0=_0x306cf5;return $gameSystem[_0x30c9d0(0x3d6)]();},Window_MenuCommand[_0x306cf5(0x1fe)][_0x306cf5(0x412)]=function(){const _0x2009df=_0x306cf5;return $gameSystem[_0x2009df(0x1f0)]();};function Window_ClassStatus(){const _0x310ac5=_0x306cf5;this[_0x310ac5(0x3b1)](...arguments);}Window_ClassStatus[_0x306cf5(0x1fe)]=Object[_0x306cf5(0x520)](Window_StatusBase[_0x306cf5(0x1fe)]),Window_ClassStatus['prototype']['constructor']=Window_ClassStatus,Window_ClassStatus[_0x306cf5(0x1fe)]['initialize']=function(_0x5e6f43){const _0xa5663b=_0x306cf5;Window_StatusBase[_0xa5663b(0x1fe)][_0xa5663b(0x3b1)][_0xa5663b(0x255)](this,_0x5e6f43),this[_0xa5663b(0x4f2)]=null,this['_tempActor']=null,this['refresh']();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x46e)]=function(_0x314430){const _0x2663f4=_0x306cf5;if(this[_0x2663f4(0x4f2)]!==_0x314430){if(_0x2663f4(0x203)==='rLixw')this[_0x2663f4(0x4f2)]=_0x314430,this[_0x2663f4(0x345)]();else{if(this[_0x2663f4(0x2a1)]())this[_0x2663f4(0x432)]=_0x2663f4(0x38a);let _0xc7bdc8=_0x1c1ecb[_0x2663f4(0x3e0)][_0x2663f4(0x38d)]['call'](this);if(this[_0x2663f4(0x2a1)]())this[_0x2663f4(0x432)]=_0x1fc266;return _0xc7bdc8;}}},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x51a)]=function(){return 0x0;},Window_ClassStatus['prototype'][_0x306cf5(0x361)]=function(_0x4c5ca9){const _0x48e0b7=_0x306cf5;this['_tempActor']!==_0x4c5ca9&&(this[_0x48e0b7(0x4b4)]=_0x4c5ca9,this[_0x48e0b7(0x345)]());},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x345)]=function(){const _0x32b82d=_0x306cf5;this['hideAdditionalSprites'](),this[_0x32b82d(0x21f)]();if(this['_actor'])this[_0x32b82d(0x4f2)][_0x32b82d(0x345)]();this[_0x32b82d(0x305)]();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x305)]=function(){const _0x717c08=_0x306cf5;this[_0x717c08(0x2b1)][_0x717c08(0x48e)]();if(!this['_actor'])return;if(this[_0x717c08(0x339)]()){if(_0x717c08(0x242)===_0x717c08(0x242)){const _0x468e11=ImageManager['loadPicture'](this['_actor'][_0x717c08(0x3ee)]());_0x468e11['addLoadListener'](this['onMenuImageLoad'][_0x717c08(0x313)](this));}else _0x18b365=_0x16b1c2(_0x48f13e[_0x717c08(0x4c4)]);}else this[_0x717c08(0x4fb)]();},Window_ClassStatus[_0x306cf5(0x1fe)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x44fdfb=_0x306cf5;return Imported[_0x44fdfb(0x41a)]&&this[_0x44fdfb(0x4f2)][_0x44fdfb(0x3ee)]()!==''&&VisuMZ['ClassChangeSystem'][_0x44fdfb(0x510)]['Window'][_0x44fdfb(0x2af)];},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x270)]=function(){const _0x3a1163=_0x306cf5;VisuMZ[_0x3a1163(0x3e0)][_0x3a1163(0x510)][_0x3a1163(0x4a8)][_0x3a1163(0x1c0)][_0x3a1163(0x255)](this),this[_0x3a1163(0x236)]();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x2ec)]=function(_0x5955de,_0x19b302,_0x35817d,_0x339709,_0x31536c){const _0x1a8896=_0x306cf5,_0x30582c=ImageManager[_0x1a8896(0x38f)](_0x5955de[_0x1a8896(0x3ee)]()),_0x5257f1=this[_0x1a8896(0x4e3)]-_0x30582c[_0x1a8896(0x4e7)];_0x19b302+=_0x5257f1/0x2;if(_0x5257f1<0x0)_0x339709-=_0x5257f1;Window_StatusBase[_0x1a8896(0x1fe)][_0x1a8896(0x2ec)][_0x1a8896(0x255)](this,_0x5955de,_0x19b302,_0x35817d,_0x339709,_0x31536c);},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x4fb)]=function(){const _0x328a12=_0x306cf5;VisuMZ[_0x328a12(0x3e0)]['Settings'][_0x328a12(0x4a8)][_0x328a12(0x466)][_0x328a12(0x255)](this),this['drawParameterList']();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x236)]=function(){const _0x4809e0=_0x306cf5;this['resetFontSettings'](),VisuMZ[_0x4809e0(0x3e0)][_0x4809e0(0x510)][_0x4809e0(0x4a8)][_0x4809e0(0x4b8)]['call'](this);},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x40e)]=function(){const _0xa5ecba=_0x306cf5;if(Imported[_0xa5ecba(0x4f7)]){if(_0xa5ecba(0x28e)==='bkUXe')return VisuMZ[_0xa5ecba(0x251)][_0xa5ecba(0x510)][_0xa5ecba(0x482)][_0xa5ecba(0x2f4)];else{if(this['_priorityBattlePortrait']!==_0x18f63c)return this[_0xa5ecba(0x1dc)];return _0x12df48[_0xa5ecba(0x2e5)](this)||_0xbc1e06['ClassChangeSystem']['Game_Actor_getBattlePortraitFilename'][_0xa5ecba(0x255)](this);;}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x2db)]=function(){const _0x52dec0=_0x306cf5;return VisuMZ['ClassChangeSystem'][_0x52dec0(0x510)][_0x52dec0(0x4a8)][_0x52dec0(0x39c)];},Window_ClassStatus[_0x306cf5(0x1fe)]['isUseParamNamesWithIcons']=function(){const _0x4d1711=_0x306cf5;return Imported[_0x4d1711(0x4f7)]&&VisuMZ['CoreEngine']['Settings'][_0x4d1711(0x482)][_0x4d1711(0x31c)];},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x21d)]=function(_0x24ff1f,_0x339868,_0x41e687,_0x2b6d17,_0x5c0d63){const _0x2d8ab6=_0x306cf5;if(Imported[_0x2d8ab6(0x41a)]){if(_0x2d8ab6(0x496)!==_0x2d8ab6(0x496))return _0x2172b1-_0x5e6b2f;else switch(this[_0x2d8ab6(0x3fa)]()){case _0x2d8ab6(0x2a8):break;case _0x2d8ab6(0x3ed):this[_0x2d8ab6(0x1f2)](_0x24ff1f,_0x339868,_0x41e687,_0x2b6d17,_0x5c0d63);break;case _0x2d8ab6(0x3a5):this[_0x2d8ab6(0x4be)](_0x24ff1f,_0x339868,_0x41e687,_0x2b6d17,_0x5c0d63);break;default:Window_StatusBase[_0x2d8ab6(0x1fe)][_0x2d8ab6(0x21d)][_0x2d8ab6(0x255)](this,_0x24ff1f,_0x339868,_0x41e687,_0x2b6d17,_0x5c0d63);break;}}else Window_StatusBase['prototype'][_0x2d8ab6(0x21d)][_0x2d8ab6(0x255)](this,_0x24ff1f,_0x339868,_0x41e687,_0x2b6d17,_0x5c0d63);},Window_ClassStatus['prototype']['drawRightArrow']=function(_0x116f28,_0x3bbe41){const _0x1ba62a=_0x306cf5,_0x462447=this[_0x1ba62a(0x43e)]();this[_0x1ba62a(0x299)](ColorManager[_0x1ba62a(0x4b2)]());if(Imported['VisuMZ_0_CoreEngine']){const _0xadffb7=VisuMZ[_0x1ba62a(0x251)]['Settings']['UI'][_0x1ba62a(0x4f5)];this[_0x1ba62a(0x2fa)](_0xadffb7,_0x116f28,_0x3bbe41,_0x462447,_0x1ba62a(0x460));}else{if(_0x1ba62a(0x247)===_0x1ba62a(0x247))this[_0x1ba62a(0x2fa)]('→',_0x116f28,_0x3bbe41,_0x462447,_0x1ba62a(0x460));else return _0x40137f['ClassChangeSystem'][_0x1ba62a(0x2ca)](this)?_0x3fc4c3['BattleCore'][_0x1ba62a(0x39a)][_0x1ba62a(0x255)](this):_0x192565[_0x1ba62a(0x3e0)][_0x1ba62a(0x39a)][_0x1ba62a(0x255)](this);}},Window_ClassStatus[_0x306cf5(0x1fe)]['rightArrowWidth']=function(){return 0x20;},Window_ClassStatus['prototype'][_0x306cf5(0x2dc)]=function(_0x43eee6,_0x49a81a,_0x2a6331,_0x1b1f0f){const _0x329a6b=_0x306cf5,_0x452299=this[_0x329a6b(0x1c4)]();Imported[_0x329a6b(0x4f7)]?_0x329a6b(0x381)!==_0x329a6b(0x1d7)?this['drawParamText'](_0x49a81a+_0x452299,_0x2a6331,_0x1b1f0f,_0x43eee6,![]):this[_0x329a6b(0x48b)]=[]:(this[_0x329a6b(0x299)](ColorManager[_0x329a6b(0x4b2)]()),this[_0x329a6b(0x2fa)](TextManager[_0x329a6b(0x357)](_0x43eee6),_0x49a81a+_0x452299,_0x2a6331,_0x1b1f0f),this[_0x329a6b(0x37c)]());},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x28d)]=function(_0x342b6b,_0x3397bc,_0x247474,_0x6a3a4d){const _0x1140a4=_0x306cf5,_0x24db52=this[_0x1140a4(0x1c4)]();let _0x330673=0x0;Imported[_0x1140a4(0x4f7)]?_0x330673=this[_0x1140a4(0x4f2)]['paramValueByName'](_0x342b6b,!![]):_0x1140a4(0x21e)!=='FihyD'?(_0x30b547=_0x155be4[_0x1140a4(0x206)](),_0x25edac=_0x1e43f6[_0x1140a4(0x2df)]()):_0x330673=this[_0x1140a4(0x4f2)][_0x1140a4(0x357)](_0x342b6b);const _0x35e2be=_0x330673;this[_0x1140a4(0x2fa)](_0x330673,_0x3397bc,_0x247474,_0x6a3a4d-_0x24db52,'right'),this[_0x1140a4(0x37c)]();},Window_ClassStatus[_0x306cf5(0x1fe)]['drawUpdatedAfterParamValue']=function(_0x46b030,_0x402df2,_0x3428d7,_0xa92774){const _0x389ecc=_0x306cf5,_0x3da3df=this[_0x389ecc(0x1c4)]();let _0x3819b3=0x0,_0x34e001=0x0,_0x178309='';if(this['_tempActor']){if(Imported[_0x389ecc(0x4f7)])_0x3819b3=this['_actor'][_0x389ecc(0x1d9)](_0x46b030,![]),_0x34e001=this[_0x389ecc(0x4b4)]['paramValueByName'](_0x46b030,![]),_0x178309=this[_0x389ecc(0x4b4)][_0x389ecc(0x1d9)](_0x46b030,!![]);else{if('mVEVQ'==='UgLgG'){_0x200856['ClassChangeSystem'][_0x389ecc(0x468)]['call'](this,_0x263549);for(const _0x28e879 of _0x142bd4['allMembers']()){_0x28e879[_0x389ecc(0x4a7)]();}}else _0x3819b3=this[_0x389ecc(0x4f2)][_0x389ecc(0x357)](_0x46b030),_0x34e001=this[_0x389ecc(0x4b4)][_0x389ecc(0x357)](_0x46b030),_0x178309=this[_0x389ecc(0x4b4)]['param'](_0x46b030);}const _0x2b763f=_0x3819b3,_0xade87f=_0x34e001;diffValue=_0xade87f-_0x2b763f,this[_0x389ecc(0x299)](ColorManager['paramchangeTextColor'](diffValue)),this['drawText'](_0x178309,_0x402df2,_0x3428d7,_0xa92774-_0x3da3df,_0x389ecc(0x4c1));}this[_0x389ecc(0x37c)]();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x3d0)]=function(_0x403f7a,_0x38d199,_0x1d86e6,_0x4fd90d){const _0x3d100d=_0x306cf5,_0x35fda7=this[_0x3d100d(0x1c4)]();let _0x2d406=0x0,_0x52b0c3=0x0,_0x35fb33=![];if(this['_tempActor']){if(Imported['VisuMZ_0_CoreEngine']){if('lVECU'===_0x3d100d(0x254))return _0x341277[_0x3d100d(0x3e0)][_0x3d100d(0x510)][_0x3d100d(0x376)][_0x3d100d(0x4e2)];else _0x2d406=this[_0x3d100d(0x4f2)][_0x3d100d(0x1d9)](_0x403f7a,![]),_0x52b0c3=this[_0x3d100d(0x4b4)][_0x3d100d(0x1d9)](_0x403f7a,![]),_0x35fb33=String(this['_actor']['paramValueByName'](_0x403f7a,!![]))[_0x3d100d(0x260)](/([%％])/i);}else _0x2d406=this[_0x3d100d(0x4f2)][_0x3d100d(0x357)](_0x403f7a),_0x52b0c3=this[_0x3d100d(0x4b4)]['param'](_0x403f7a),_0x35fb33=_0x2d406%0x1!==0x0||_0x52b0c3%0x1!==0x0;const _0x41e2e0=_0x2d406,_0x4a16c2=_0x52b0c3,_0x5d05fc=_0x4a16c2-_0x41e2e0;let _0x3e5a91=_0x5d05fc;if(_0x35fb33)_0x3e5a91=Math[_0x3d100d(0x507)](_0x5d05fc*0x64)+'%';if(_0x5d05fc!==0x0){if(_0x3d100d(0x342)!=='SVuAh'){_0x5135d1['prototype'][_0x3d100d(0x345)][_0x3d100d(0x255)](this),this['refreshCursor']();if(this['active'])this[_0x3d100d(0x447)]();}else this[_0x3d100d(0x299)](ColorManager[_0x3d100d(0x329)](_0x5d05fc)),_0x3e5a91=(_0x5d05fc>0x0?_0x3d100d(0x1af):_0x3d100d(0x4dd))[_0x3d100d(0x25d)](_0x3e5a91),this[_0x3d100d(0x2fa)](_0x3e5a91,_0x38d199+_0x35fda7,_0x1d86e6,_0x4fd90d,'left');}}this[_0x3d100d(0x37c)]();},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x46a)]=function(_0x3a06f7,_0x3bd3d1,_0x318dcc,_0x596711,_0xe6f7da){const _0x1d4765=_0x306cf5;if(VisuMZ[_0x1d4765(0x3e0)][_0x1d4765(0x510)][_0x1d4765(0x4a8)][_0x1d4765(0x1c3)]===![])return;_0xe6f7da=Math[_0x1d4765(0x36f)](_0xe6f7da||0x1,0x1);while(_0xe6f7da--){_0x596711=_0x596711||this['lineHeight'](),this[_0x1d4765(0x2b1)][_0x1d4765(0x39f)]=0xa0;const _0x22f58a=ColorManager[_0x1d4765(0x25e)]();this[_0x1d4765(0x2b1)][_0x1d4765(0x36d)](_0x3a06f7+0x1,_0x3bd3d1+0x1,_0x318dcc-0x2,_0x596711-0x2,_0x22f58a),this['contents'][_0x1d4765(0x39f)]=0xff;}},ColorManager[_0x306cf5(0x25e)]=function(){const _0x61695c=_0x306cf5,_0x7f1e7f=VisuMZ[_0x61695c(0x3e0)]['Settings']['Window'];let _0x1ebfd2=_0x7f1e7f[_0x61695c(0x1b4)]!==undefined?_0x7f1e7f[_0x61695c(0x1b4)]:0x13;return ColorManager[_0x61695c(0x417)](_0x1ebfd2);},Window_ClassStatus[_0x306cf5(0x1fe)][_0x306cf5(0x2f5)]=function(_0x176129,_0x4c1695,_0x4b7f2d){const _0x4cc840=_0x306cf5,_0x2f88a9=VisuMZ[_0x4cc840(0x3e0)][_0x4cc840(0x510)][_0x4cc840(0x4a8)][_0x4cc840(0x3cf)],_0x33f4cd=this[_0x4cc840(0x4f2)][_0x4cc840(0x426)]()['id'];for(const _0x2ce138 of _0x2f88a9){if(_0x4cc840(0x1db)!==_0x4cc840(0x4f3))switch(_0x2ce138[_0x4cc840(0x367)]()[_0x4cc840(0x2c6)]()){case'AP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x4cc840(0x1f3)](this[_0x4cc840(0x4f2)],_0x33f4cd,_0x176129,_0x4c1695,_0x4b7f2d,_0x4cc840(0x4c1)),_0x4c1695+=this[_0x4cc840(0x268)]();break;case'CP':if(!Imported[_0x4cc840(0x3b2)])continue;this['drawActorClassPoints'](this[_0x4cc840(0x4f2)],_0x33f4cd,_0x176129,_0x4c1695,_0x4b7f2d,'right'),_0x4c1695+=this['lineHeight']();break;case'JP':if(!Imported[_0x4cc840(0x3b2)])continue;this[_0x4cc840(0x1e2)](this[_0x4cc840(0x4f2)],_0x33f4cd,_0x176129,_0x4c1695,_0x4b7f2d,_0x4cc840(0x4c1)),_0x4c1695+=this[_0x4cc840(0x268)]();break;case'SP':if(!Imported[_0x4cc840(0x3dd)])continue;this[_0x4cc840(0x321)](this['_actor'],_0x33f4cd,_0x176129,_0x4c1695,_0x4b7f2d,_0x4cc840(0x4c1)),_0x4c1695+=this[_0x4cc840(0x268)]();break;}else{const _0x5ed692=_0x17c7d8[_0x4cc840(0x20f)]();if(_0x5ed692<_0x68c9ef)return![];}}};function Window_ClassCommand(){const _0xb0d51d=_0x306cf5;this[_0xb0d51d(0x3b1)](...arguments);}function _0x4bd8(){const _0x138ba9=['currentExt','getUnlockedClasses','debuffRate','ShiftShortcutKey','XKBxo','VocabNoClassAssigned','learnings','oDlGq','addCommand','gradientFillRect','sprite','getMenuImage','Game_BattlerBase_stateRate','level','releaseUnequippableItems','_priorityCharacterIndex','_earnedClassPoints','AutoUnlockRequirements','HwcLL','attackElements','bFrtp','classAdjustHpMp','classPointsVisible','graphicType','Game_BattlerBase_attackStates','attackStatesRate','removeChild','nxIuk','JobPointsSet','Parse_ClassIcons','rLNbW','Wlzpp','_classPoints','iBaXh','onPersonalOk','getClassChangeTiersOnly','setHandler','createKeyJS','Game_Actor_levelUp','drawBigItemIcon','_windowLayer','JSON','loseClassPoints','actorParams','isEquipWtypeOk','maxLevel','chjWz','isClassChangeCommandEnabled','pPCfW','createStatusWindow','Game_Party_initialize','VisuMZ_1_BattleCore','getColor','active','isTriggered','VisuMZ_1_MainMenuCore','classChange_multiclass_ShiftHelp','addedSkills','Window_MenuCommand_addOriginalCommands','learnSkill','cqKjB','levelA','RDZNV','ClassChangeAnimation','ConfirmAnimationID','ClassUnlockRemoveActor','bnkbv','currentClass','isRightInputMode','classChangeMenuCommand','hpRate','add','ssWAD','naturalUnlockClass','left','applyMulticlassObjects','Hlatq','setItem','getClassPoints','_multiclassCheck','ARRAYFUNC','determineActiveWindow','RzFrN','Actor-%1-Class-%2','drawClassPoints','deadMembers','getInputButtonString','reduce','ftASe','ClassDescription','levelUpGainClassPoints','rightArrowWidth','classTierWindowRect','Limit','isEquipAtypeOk','findMulticlassTier','isMVAnimation','setBattlePortrait','paramBase','_classChangeTierRestrictions','updateHelp','mainAreaTop','isBattleMember','Game_BattlerBase_isEquipWtypeOk','loadTitle1','mpRate','4734150ECXJUb','AbilityPoints','AbbrText','Points','enabled','gainMulticlassExp','battlerName','iconHeight','addClassChangeTierRestriction','displayRewardsClassPoints','processShiftRemoveShortcut','TierOnlyClass','makeRewardsClassPoints','GIeNx','ShowVictory','aRAie','setJobPoints','isRecommendedLayout','7408149DpvgiA','center','bKIPu','earnedJobPoints','MainMenu','Game_Actor_setMenuImage','SPLHj','DrawFaceJS','resourceRate','BattleManager_endBattle','MulticlassChangeActorClass','drawItemDarkRect','_priorityBattlerName','pJGLN','statusWindowRect','setActor','vhTRb','eHluG','actorClassBattlePortrait','uGgct','getSkillPoints','ClassIcon','ZBbkc','ESebQ','pow','Game_BattlerBase_elementRate','BattleManager_gainExp','NzDzm','getActorClassMenuPortrait','buttonAssistOffset3','scFOe','Game_Actor_releaseUnequippableItems','addLoadListener','_rewards','JobPointsLose','Param','displayRewardsJobPoints','_updateClassLearnedSkills','Game_Actor_getBattlePortraitFilename','cancel','gainClassPoints','\x5cI[%1]','tdOGH','classPointsAbbr','_unlockedClasses','KbtGo','TyUBL','clear','SBzTI','Scene_Menu_onPersonalOk','AddedSkills','TargetGainJobPoints','EnableLayout','cvgol','remove','GsHoP','endBattle','makeCommandList','lOwZo','itemHeight','drawGauge','_backSprite2','StartClassJobPoints','jobPointsFmt','rhuWx','elementRate','skillId','gainExp','yQNhE','_classIDs','lEvTH','expGaugeColor1','checkForAutoClassUnlocks','Window','qlZMC','_list','multiclasses','osfHW','rgOtA','General','classChange','ClassID','setBattlerImage','systemColor','RestrictClassChangeTier','_tempActor','filter','clamp','jreZR','DrawParamJS','getClassChangeAnimationID','gainClassPointsForMulticlasses','HelpDescription','GoQnN','eyOOC','drawItemActorSvBattler','Class','zBytX','right','AliveActors','Scene_Menu_createCommandWindow','PerAction','_ClassChangeSystem_preventLevelUpGain','exp','DtbUm','IGJUu','length','setCharacterImage','actorClassFaceName','MaintainLevels','_classTierWindow','shift','nextClassLevelExp','applyClassChangeSystemUserEffect','Actors','_helpWindow','note','MulticlassRaiseLimit','aQuSx','actorClassFaceIndex','Game_BattlerBase_attackStatesRate','test','RMTUp','Game_Action_applyItemUserEffect','onClassListOk','code','(%1)','MulticlassSetLimit','startClassChangeAnimation','isUseSkillsStatesCoreUpdatedLayout','1819648JzINEi','SnapshotOpacity','innerWidth','levelUpGainAbilityPoints','index','createJS','width','EquipArmors','LayoutStyle','snmci','addMulticlassTiers','qQZDG','_multiclassTiers','setClassPoints','needsPageButtons','_cache','kAuph','_actor','qLPgN','FUNC','ParamArrow','OgpIe','VisuMZ_0_CoreEngine','Enemy-%1-%2','Game_Actor_setBattlePortrait','sparam','refreshNoMenuImage','updateStatusWindow','jobPointsRate','dataId','rliDG','split','SkillPoints','initClassLevels','maxTp','refreshCursor','actor','Game_BattlerBase_isEquipAtypeOk','round','classPointsTotal','kZxCf','ext','STRUCT','FhYLw','VisuMZ_1_MessageCore','QGSoK','ClassUnlockRemoveGlobal','Settings','TargetGainClassPoints','_earnedJobPoints','equips','lmUdb','ClassUnlockForGlobal','_classLevel','members','mainAreaHeight','getActorUnlockedClasses','colSpacing','_animations','applyItemClassChangeSystemUserEffect','azbCK','previousActor','classPoints','create','ZRJKL','IRNzh','inBattle','params','loadTitle2','faceIndex','_ClassChangeSystem_MainMenu','BgFilename1','kRrkc','finalExpRate','gain%1Points','setMp','stateRate','StateRates','dimColor2','gainJobPointsForMulticlasses','FuqQn','setBackgroundOpacity','setup','name','XAKhs','MbqhE','immWn','_tp','wSkAz','AgYpo','KdAOR','(+%1)','mmp','maintainLevels','setStatusWindow','ParseAllNotetags','BackRectColor','playOkSound','description','ShiftButtonAssistText','apply','playStaticSe','dxktH','classPointsFmt','includes','getBattlePortraitFilename','Game_Actor_setFaceImage','pkXFg','DrawPortraitJS','textColor','drawItem','DrawBackRect','itemPadding','weapon','CUfrS','sdlpt','cEMOQ','skillTypes','paramBaseForClass','rvecm','BJqHN','PVYIS','addClassChangeSystemCommand','isClassChangeTierRestricted','GRJzC','_classListWindow','onActorChange','commandPersonal','height','onDatabaseLoaded','actorId','yKlqI','hYPda','paramValueByName','_priorityMenuImage','uCqfK','_priorityBattlePortrait','checkMulticlasses','padding','_classId','#%1','isSceneBattle','drawActorJobPoints','visibleResources','updateClassLearnedSkills','makeDeepCopy','checkForNewUnlockedClasses','levelUp','paramRate','TextCodeClassNames','Paqji','drawTextEx','registerActorClassImages','getBackgroundOpacity','XWGeh','fDwzO','isMainMenuClassChangeSystemEnabled','KBmJX','drawItemActorSprite','drawActorAbilityPoints','isEnabled','floor','XmtmP','optExtraExp','currentClassLevelExp','initMulticlass','Icon','vEykJ','FXHjd','battleMembers','prototype','SParamRates','deactivate','Window_ClassStatus_BgType','concat','rLixw','AttackStates','Class-%1-%2','maxLvGaugeColor1','aeoyw','armorTypes','CLzAQ','forceRemoveClassChangeAnimations','forceSelect','frames','weaponTypes','initClassChangeSystem','getAbilityPoints','_tier','initClassPoints','characterName','classListWindowRect','setHp','setHelpWindow','nlsyd','roTXt','BSKox','1661312VhJIMn','PerEnemy','YGFzy','MaxResource','drawActorFace','FihyD','resetFontSettings','MEOqO','changeClass','initClassChangeUnlocks','indexOf','show','wJKFt','nngeW','changeExp','sort','classIcon','classDescription','createClassTierWindow','ChangeClassSound','Game_BattlerBase_sparam','drawFadedItemBackground','Game_Actor_setCharacterImage','classExpRate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','rmRRu','XParamRates','functionName','updateClassChangeAnimations','drawParameterList','pajYP','classPointsIcon','StartingMulticlasses','lfsjH','classChange_multiclass_remove','addClassPoints','enemy','classChange_multiclass_remove_help','TRAIT_EQUIP_WTYPE','iconIndex','changePaintOpacity','SjYpl','gainMulticlassRewardPoints','arePageButtonsEnabled','traitObjects','itemRectWithPadding','hEJfv','initJobPoints','Game_BattlerBase_xparam','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createCommandWindow','clearParamPlus','2265756GwNCMX','createBackground','Game_Actor_tradeItemWithParty','blt','CoreEngine','log','ARRAYSTR','aqZEs','call','refreshActor','Skill-%1-%2','BFuhi','displayRewards','Game_Actor_setBattlerImage','Job','549ywENAR','format','getClassChangeBackColor2','Parse_Notetags_Basic','match','adjustSprite','currentSymbol','Scene_Boot_onDatabaseLoaded','isShiftRemoveShortcutEnabled','jobPointsFull','paramRate%1','QuUuc','lineHeight','StartingClassPoints','applyJobPoints','<WordWrap>','Classes','_priorityFaceIndex','Game_Actor_setup','LvExpGauge','onMenuImageLoad','dhFoE','process_VisuMZ_ClassChangeSystem','Game_Actor_battlerName','Game_BattlerBase_paramRate','getActorClassCharacterName','gainStartingJobPoints','playBuzzerSound','ClassMenuPortrait','ActorUnlockedClasses','changeMulticlass','uiMenuStyle','traits','createCustomBackgroundImages','applyClassPoints','nsuNe','pop','AJcPp','drawClassExpGauge','qwUEZ','wnrmy','ZMOYW','item','RmqIJ','DorjC','XqLoZ','allMembers','ConfirmAniPrimaryOffsetY','setMainMenuClassChangeSystemVisible','drawUpdatedBeforeParamValue','bkUXe','buttonAssistText3','isAlive','TRAIT_STYPE_ADD','boxWidth','_multiclasses','EquipWeapons','changeClassExp','Window_ClassTier_BgType','_backSprite1','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','changeTextColor','gainJobPoints','JobPointsAdd','BvAai','PcWfs','foDUi','afUYp','ConfirmAniPrimaryOffsetX','isActor','jobPoints','setFaceImage','hRIIa','KJigM','attackStates','BattleManager_makeRewards','none','IpOVd','setupClassChangeSystem','UJVZi','StartingJobPoints','tsvYr','_priorityFaceName','MenuPortraits','refreshActorPortrait','contents','highestTier','centerSprite','ClassPoints','weqID','BRBdV','yHZoJ','JobPointsGain','ClassCharaName','ClassPointsRate','getMulticlasses','qKfiC','getActorClassBattlerName','_scene','ClassBattlePortrait','GuATK','status','VictoryText','DqqTQ','JobPoints','_context','trim','NUM','bFctk','isClassAutoUnlockRequirementsMet','antiEquipsCacheClear_BattleCore_ClassChangeSystem','classPointsRate','mhp','constructor','dAodD','removeUnlockedClass','gainRewardsJobPoints','Tiers','cqars','makeRewards','scaleSprite','ORIoM','smoothSelect','kJAqp','Multiclass','PerLevelUp','rtNhe','paramValueFontSize','drawUpdatedParamName','PICbA','addChild','maxLvGaugeColor2','llUSF','gainSilentTp','classLevelUp','nAupH','YSxTg','getActorClassBattlePortrait','gYxat','actorClassCharacterName','drawBigItemImage','STR','processCursorMove','registerCommand','drawItemActorMenuImage','JTOID','gainRewardsClassPoints','isLearnedSkill','BgFilename2','textSizeEx','wySsk','Game_Actor_faceIndex','ExtDisplayedParams','drawActorResources','getMulticlassAtTier','createHelpWindow','MAX_SAFE_INTEGER','ConfirmAniSubclassOffsetY','drawText','ARRAYEVAL','process_VisuMZ_ClassChangeSystem_Notetags','expGaugeColor2','SharedResource','gpvpQ','SystemShowClassChangeSystemMenu','actorClassCharacterIndex','hide','popScene','ClassFaceName','prepareRefreshItemsEquipsCoreLayout','map','Game_Actor_changeClass','setMulticlassTiers','ConvertParams','130EgyZiF','Game_Actor_characterName','_exp','FCxZX','Game_Actor_characterIndex','exit','canShiftRemoveClass','splice','TextColor','bind','totalMulticlass','_commandWindow','hLNwR','iUXLk','replace','aroIM','FdeYf','getClassIdWithName','DrawIcons','xaqkz','Game_Actor_faceName','onMulticlassOk','RdSsf','drawActorSkillPoints','EnableMainMenu','buttonAssistKey3','_classChangeTier','State-%1-%2','aXfKW','BattleCore','getJobPoints','paramchangeTextColor','Window_ClassList_RectJS','suayP','dtgXs','deselect','97592fFLdFZ','unlockClass','classChange_multiclass_noClass','StartClassClassPoints','update','AddedStypes','loseMulticlassTiers','_buttonAssistWindow','Game_BattlerBase_debuffRate','jobPointsVisible','JobPointsRate','isMainMenuCoreMenuImageOptionAvailable','Window_ClassTier_RectJS','earnedClassPoints','onClassListCancel','uiInputPosition','loadSystem','jMHXF','qzARJ','_jobPoints','SVuAh','addJobPoints','ClassBattlerName','refresh','jobPointsTotal','uiHelpPosition','TRAIT_EQUIP_ATYPE','initClassChangeRestrictions','xMYuk','dimColor1','_targets','jobPointsIcon','setMainMenuClassChangeSystemEnabled','setBackgroundType','activate','Game_System_initialize','playClassChange','classLevel','Window_ClassTier_ExtraJS','addWindow','yiGzb','param','291470UWFqtW','EnemyJobPoints','FAXSG','xMcau','kWwBI','highestMulticlassTier','drawActorClassPoints','sBiKe','subject','setTempActor','Enable','actorClassMenuPortrait','drawPicture','setMenuImage','ciUKM','toUpperCase','QVjXY','initClassChangeSystemMainMenu','lvaQB','addedSkillTypes','EbMbl','fillRect','shown','max','addOriginalCommands','createClassListWindow','StartingClassTier','QppMn','bitmap','MulticlassLowerLimit','BgSettings','onBattleStart','AZomg','ElementRates','ParseActorNotetags','Window_ClassStatus_RectJS','resetTextColor','armor','isPlaying','ParseClassNotetags','jobPointsAbbr','eJyxi','min','Window_ClassList_BgType','PWYxi','iconWidth','tradeItemWithParty','ujgaQ','ARRAYSTRUCT','setText','AttackElements','FullText','OVEhW','Game_BattlerBase_attackElements','TextFmt','loadPicture','Game_Battler_gainSilentTp','levelUpGainJobPoints','drawClassResources','classPointsFull','isClassChangeCommandVisible','createAnimationDummySprite','pIQHw','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','checkShiftRemoveShortcut','nextActor','Game_Actor_equips','join','ParamValueFontSize','classPicture','xparam','paintOpacity','SkillLearnSystem','setTier','addClassChangeSystemCommandAutomatically','isPlaytest','expParams','svbattler','push','parse','ARRAYJSON','actorClassBattlerName','gfqtF','Game_Actor_paramBase','buttonAssistSlotWindowShift','dOUON','ktznv','Name','applyItemUserEffect','initialize','VisuMZ_2_ClassChangeSystem','makeRewardsJobPoints','NlCLp','loseJobPoints','newPage','createClassChangeAnimation','ConfirmAniSubclassOffsetX','OmcSk','expForClassLevel','_priorityCharacterName','Game_Actor_getMenuImage','updatedLayoutStyle','Armor-%1-%2','updateClassLevel','pagedown','fDIsB','hEhRo','RegExp','IconSet','innerHeight','rfCUj','UnassignHelpDescription','sshlv','ARRAYNUM','drawExtraContents','1PbnofN','parameters','gainStartingClassPoints','tier','DisplayedResources','drawUpdatedParamValueDiff','xUHwM','StjKL','isClassExpGaugeDrawn','BattleManager_displayRewards','getActorClassFaceName','isMainMenuClassChangeSystemVisible','getActorClassFaceIndex','imageSmoothingEnabled','pageup','Game_BattlerBase_addedSkillTypes','Game_Actor_traitObjects','UserGainClassPoints','VisuMZ_2_SkillLearnSystem','_highestTier','_statusWindow','ClassChangeSystem','GozVf','Weapon-%1-%2'];_0x4bd8=function(){return _0x138ba9;};return _0x4bd8();}Window_ClassCommand[_0x306cf5(0x1fe)]=Object[_0x306cf5(0x520)](Window_Command[_0x306cf5(0x1fe)]),Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x2cd)]=Window_ClassCommand,Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x3b1)]=function(_0x50ad97){const _0x104337=_0x306cf5;Window_Command['prototype'][_0x104337(0x3b1)][_0x104337(0x255)](this,_0x50ad97),this[_0x104337(0x32d)](),this['deactivate']();},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x49a)]=function(){return this['lineHeight']()*0x3+0x8;},Window_ClassCommand[_0x306cf5(0x1fe)]['setActor']=function(_0x5112b2){const _0x134c41=_0x306cf5;this[_0x134c41(0x4f2)]!==_0x5112b2&&('MQofL'!==_0x134c41(0x499)?(this[_0x134c41(0x4f2)]=_0x5112b2,this[_0x134c41(0x345)]()):this[_0x134c41(0x3b1)](...arguments));},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x345)]=function(){const _0x4a7694=_0x306cf5;Window_Command[_0x4a7694(0x1fe)][_0x4a7694(0x345)][_0x4a7694(0x255)](this),this[_0x4a7694(0x504)]();if(this[_0x4a7694(0x418)])this[_0x4a7694(0x447)]();},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x22e)]=function(_0x574b5b,_0x415984){const _0x5a2974=_0x306cf5;_0x415984=_0x415984||0x1,this[_0x5a2974(0x241)](![]);const _0x41c587=ColorManager[_0x5a2974(0x34b)](),_0x576478=ColorManager[_0x5a2974(0x1a2)](),_0x81977e=_0x574b5b[_0x5a2974(0x4e7)]/0x2,_0x280ed6=this[_0x5a2974(0x268)]();while(_0x415984--){_0x5a2974(0x340)!==_0x5a2974(0x340)?_0x405c2f=_0x4f44e1['getClassIdWithName'](_0x2a5ce8['$1']):(this['contents']['gradientFillRect'](_0x574b5b['x'],_0x574b5b['y'],_0x81977e,_0x280ed6,_0x576478,_0x41c587),this['contents']['gradientFillRect'](_0x574b5b['x']+_0x81977e,_0x574b5b['y'],_0x81977e,_0x280ed6,_0x41c587,_0x576478));}this[_0x5a2974(0x241)](!![]);},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x2e8)]=function(_0xebe3b2,_0x19d696,_0x59833f){const _0x1510b4=_0x306cf5;if(!_0x19d696)return;const _0x31d064=VisuMZ[_0x1510b4(0x3e0)][_0x1510b4(0x3c3)],_0x4774db=_0x19d696[_0x1510b4(0x4d3)];let _0x801a04='';if(_0x4774db[_0x1510b4(0x260)](_0x31d064[_0x1510b4(0x39d)])){if(_0x1510b4(0x31d)===_0x1510b4(0x368)){let _0x2bb445=_0x2def21[_0x1510b4(0x27c)][_0x1510b4(0x4b5)](_0x4c6970=>_0x4c6970[_0x1510b4(0x4dc)]===_0x4fd2a9[_0x1510b4(0x348)])[_0x1510b4(0x306)](_0x2c6679=>_0x17e5d3[_0x1510b4(0x208)][_0x2c6679[_0x1510b4(0x4fe)]])['join'](',\x20'),_0x4ee7e7=_0x1510b4(0x298)[_0x1510b4(0x25d)](_0xb58142[_0x1510b4(0x37d)],_0x2bb445,_0xd6a8f||0x16);if(_0x38b173)_0x4ee7e7=_0x4ee7e7[_0x1510b4(0x318)](/\\I\[(\d+)\]/gi,'');if(_0x680fca)_0x4ee7e7=_0x1510b4(0x26b)+_0x4ee7e7;this[_0x1510b4(0x1eb)](_0x4ee7e7,_0xda6ebc,_0x467ff7,_0x34d5a2),_0x4f8450+=this[_0x1510b4(0x268)]();}else _0x801a04=String(RegExp['$1']);}else _0x4774db['match'](_0x31d064['bigPicture'])&&(_0x801a04=String(RegExp['$1']));if(_0x801a04){const _0x43c3f5=ImageManager[_0x1510b4(0x38f)](_0x801a04);_0x43c3f5[_0x1510b4(0x47f)](this[_0x1510b4(0x364)][_0x1510b4(0x313)](this,_0xebe3b2,_0x43c3f5));}else this[_0x1510b4(0x40a)](_0x19d696,_0x59833f);},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x364)]=function(_0x5894f2,_0x4cb99f){const _0x518f3e=_0x306cf5,_0x532ccf=this[_0x518f3e(0x246)](_0x5894f2);let _0xc7307b=_0x532ccf['x']+this[_0x518f3e(0x1c4)](),_0x35ef0e=_0x532ccf['y']+0x4,_0x47cf6f=_0x532ccf[_0x518f3e(0x4e7)]-this[_0x518f3e(0x1c4)]()*0x2,_0xf01ddc=Math['min'](this[_0x518f3e(0x268)]()*0x3,_0x532ccf['height'])-0x4,_0x51eac1=Math[_0x518f3e(0x382)](_0x47cf6f,_0xf01ddc);const _0x4431bd=_0x51eac1/_0x4cb99f[_0x518f3e(0x4e7)],_0xf3feb6=_0x51eac1/_0x4cb99f[_0x518f3e(0x1d4)],_0x66016b=Math[_0x518f3e(0x382)](_0x4431bd,_0xf3feb6,0x1);let _0x422f47=Math[_0x518f3e(0x507)](_0x4cb99f[_0x518f3e(0x4e7)]*_0x66016b),_0x4716b2=Math['round'](_0x4cb99f['height']*_0x66016b);_0xc7307b+=Math[_0x518f3e(0x507)]((_0x51eac1-_0x422f47)/0x2),_0x35ef0e+=Math[_0x518f3e(0x507)]((_0x51eac1-_0x4716b2)/0x2);const _0x2398ab=_0x4cb99f[_0x518f3e(0x4e7)],_0x4a2a55=_0x4cb99f[_0x518f3e(0x1d4)];this[_0x518f3e(0x2b1)][_0x518f3e(0x2c5)]['imageSmoothingEnabled']=!![],this['contents'][_0x518f3e(0x250)](_0x4cb99f,0x0,0x0,_0x2398ab,_0x4a2a55,_0xc7307b,_0x35ef0e,_0x422f47,_0x4716b2),this['contents'][_0x518f3e(0x2c5)][_0x518f3e(0x3d8)]=!![];},Window_ClassCommand[_0x306cf5(0x1fe)]['drawBigItemIcon']=function(_0x2dd24d,_0x8f9d28){const _0x1ea6b0=_0x306cf5;if(!_0x2dd24d)return;const _0xc12cd5=_0x2dd24d['iconIndex'];let _0x7b0132=_0x8f9d28['x']+this['itemPadding'](),_0x539ec7=_0x8f9d28['y']+0x4,_0x11b498=_0x8f9d28[_0x1ea6b0(0x4e7)]-this['itemPadding']()*0x2,_0x288896=Math[_0x1ea6b0(0x382)](this[_0x1ea6b0(0x268)]()*0x3,_0x8f9d28[_0x1ea6b0(0x1d4)]),_0x4d8980=Math[_0x1ea6b0(0x382)](_0x11b498,_0x288896);_0x4d8980=Math[_0x1ea6b0(0x1f5)](_0x4d8980/ImageManager['iconWidth'])*ImageManager['iconWidth'],_0x539ec7+=(_0x288896-_0x4d8980)/0x2;const _0x54c5f0=ImageManager[_0x1ea6b0(0x33e)](_0x1ea6b0(0x3c4)),_0x290d9e=ImageManager[_0x1ea6b0(0x385)],_0x1e7420=ImageManager[_0x1ea6b0(0x454)],_0x8bc138=_0xc12cd5%0x10*_0x290d9e,_0x1fa4c5=Math['floor'](_0xc12cd5/0x10)*_0x1e7420;this[_0x1ea6b0(0x2b1)][_0x1ea6b0(0x2c5)][_0x1ea6b0(0x3d8)]=![],this[_0x1ea6b0(0x2b1)][_0x1ea6b0(0x250)](_0x54c5f0,_0x8bc138,_0x1fa4c5,_0x290d9e,_0x1e7420,_0x7b0132,_0x539ec7,_0x4d8980,_0x4d8980),this[_0x1ea6b0(0x2b1)][_0x1ea6b0(0x2c5)]['imageSmoothingEnabled']=!![];},Window_ClassCommand[_0x306cf5(0x1fe)][_0x306cf5(0x1e3)]=function(){const _0x29698d=_0x306cf5;return VisuMZ[_0x29698d(0x3e0)][_0x29698d(0x510)]['Window'][_0x29698d(0x3cf)]||[];},Window_ClassCommand[_0x306cf5(0x1fe)]['drawClassResources']=function(_0x1c8c38,_0x1ea995){const _0x2841f1=_0x306cf5,_0x18f415=this[_0x2841f1(0x1e3)]();let _0x366669=_0x1ea995['y']+this[_0x2841f1(0x268)](),_0x2cece8=0x0;const _0x5b66a8=_0x1ea995[_0x2841f1(0x4e7)]-this[_0x2841f1(0x1c4)]()*0x2;for(const _0x356a8d of _0x18f415){if(_0x2cece8>=0x2)return;switch(_0x356a8d){case'AP':if(!Imported[_0x2841f1(0x3dd)])continue;let _0x2c1029=VisuMZ[_0x2841f1(0x3a0)]['Settings'][_0x2841f1(0x44e)];if(!_0x2c1029)continue;if(_0x2c1029[_0x2841f1(0x2fe)])continue;this[_0x2841f1(0x1f3)](this[_0x2841f1(0x4f2)],_0x1c8c38,_0x1ea995['x'],_0x366669,_0x5b66a8,_0x2841f1(0x4c1)),_0x366669+=this[_0x2841f1(0x268)](),_0x2cece8++;break;case'CP':if(!Imported[_0x2841f1(0x3b2)])continue;let _0x3d2fe4=VisuMZ['ClassChangeSystem'][_0x2841f1(0x510)][_0x2841f1(0x2b4)];if(!_0x3d2fe4)continue;if(_0x3d2fe4[_0x2841f1(0x2fe)])continue;this['drawActorClassPoints'](this['_actor'],_0x1c8c38,_0x1ea995['x'],_0x366669,_0x5b66a8,_0x2841f1(0x4c1)),_0x366669+=this[_0x2841f1(0x268)](),_0x2cece8++;break;case'JP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;let _0x3097ed=VisuMZ[_0x2841f1(0x3e0)][_0x2841f1(0x510)][_0x2841f1(0x2c4)];if(!_0x3097ed)continue;if(_0x3097ed['SharedResource'])continue;this[_0x2841f1(0x1e2)](this[_0x2841f1(0x4f2)],_0x1c8c38,_0x1ea995['x'],_0x366669,_0x5b66a8,'right'),_0x366669+=this[_0x2841f1(0x268)](),_0x2cece8++;break;case'SP':if(!Imported[_0x2841f1(0x3dd)])continue;let _0x3b702d=VisuMZ[_0x2841f1(0x3a0)][_0x2841f1(0x510)][_0x2841f1(0x501)];if(!_0x3b702d)continue;if(_0x3b702d[_0x2841f1(0x2fe)])continue;this[_0x2841f1(0x321)](this[_0x2841f1(0x4f2)],_0x1c8c38,_0x1ea995['x'],_0x366669,_0x5b66a8,'right'),_0x366669+=this[_0x2841f1(0x268)](),_0x2cece8++;break;}}};function Window_ClassTier(){this['initialize'](...arguments);}Window_ClassTier[_0x306cf5(0x1fe)]=Object['create'](Window_ClassCommand['prototype']),Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x2cd)]=Window_ClassTier,Window_ClassTier[_0x306cf5(0x1fe)]['initialize']=function(_0x544b83){const _0x5cf34a=_0x306cf5;Window_ClassCommand[_0x5cf34a(0x1fe)][_0x5cf34a(0x3b1)][_0x5cf34a(0x255)](this,_0x544b83);},Window_ClassTier['prototype']['isWordWrapEnabled']=function(){return this['_wordWrap'];},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x49a)]=function(){const _0x2492c6=_0x306cf5;let _0x132b13=Window_ClassCommand[_0x2492c6(0x1fe)][_0x2492c6(0x49a)]['call'](this);if(this[_0x2492c6(0x4f2)]){const _0x538844=this['_actor'][_0x2492c6(0x314)]()||0x1;_0x132b13=Math['max'](_0x132b13,this[_0x2492c6(0x3c5)]/_0x538844);}return _0x132b13;},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x447)]=function(){const _0x14e46b=_0x306cf5;if(this['_helpWindow']){if(_0x14e46b(0x4bd)!=='ecdBx'){if(this['currentExt']()){const _0x29bdb8=VisuMZ['ClassChangeSystem'][_0x14e46b(0x510)]['Multiclass'];if(!_0x29bdb8)return;const _0x2ce513=_0x29bdb8[this[_0x14e46b(0x3e3)]()-0x1];if(!_0x2ce513)return;this[_0x14e46b(0x4d2)][_0x14e46b(0x389)](_0x2ce513[_0x14e46b(0x4bb)]);}else this[_0x14e46b(0x4d2)]['setText']('');}else _0xf7fe47['removeClassChangeTierRestriction'](_0x1c2775);}},Window_ClassTier[_0x306cf5(0x1fe)]['makeCommandList']=function(){const _0x3f49c1=_0x306cf5;if(!this[_0x3f49c1(0x4f2)])return;const _0x5b8612=this[_0x3f49c1(0x4f2)]['totalMulticlass'](),_0x460d2d=VisuMZ[_0x3f49c1(0x3e0)][_0x3f49c1(0x510)][_0x3f49c1(0x2d8)];for(let _0x399069=0x0;_0x399069<_0x5b8612;_0x399069++){const _0x27a937=_0x460d2d[_0x399069];if(!_0x27a937)continue;const _0x16f3f1=_0x27a937['Name'],_0x32c13b=_0x399069+0x1,_0x2e57aa=this['isEnabled'](_0x32c13b);this[_0x3f49c1(0x3eb)](_0x16f3f1,_0x3f49c1(0x3ce),_0x2e57aa,_0x32c13b);}},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x1f4)]=function(_0x9e6cf9){const _0x3713c4=_0x306cf5;if(this[_0x3713c4(0x4f2)][_0x3713c4(0x1cf)](_0x9e6cf9))return![];return _0x9e6cf9>0x0;},Window_ClassTier['prototype'][_0x306cf5(0x1c2)]=function(_0x4189df){const _0x1ed588=_0x306cf5;if(!this[_0x1ed588(0x4f2)])return;const _0x4148b4=this[_0x1ed588(0x246)](_0x4189df),_0x1d75f1=this[_0x1ed588(0x4aa)][_0x4189df][_0x1ed588(0x50a)]||0x1,_0x504199=this[_0x1ed588(0x4f2)][_0x1ed588(0x2f6)](_0x1d75f1),_0x340adb=_0x504199?_0x504199['id']:0x0,_0x3e0dcc=VisuMZ[_0x1ed588(0x3e0)][_0x1ed588(0x510)][_0x1ed588(0x2d8)];if(!_0x3e0dcc)return;const _0x1672b6=_0x3e0dcc[_0x1d75f1-0x1];if(!_0x1672b6)return;let _0x13bb81=_0x4148b4['x'],_0x359328=_0x4148b4['y'],_0x49d44f=_0x4148b4[_0x1ed588(0x4e7)]-this[_0x1ed588(0x1c4)]()*0x2,_0xf1c639=_0x4148b4[_0x1ed588(0x1d4)],_0x150601=Math['min'](_0x49d44f,_0xf1c639,this[_0x1ed588(0x268)]()*0x3);_0x150601=Math['floor'](_0x150601/ImageManager['iconWidth'])*ImageManager[_0x1ed588(0x385)],_0x13bb81+=_0x150601+this[_0x1ed588(0x1c4)]()*0x4,this[_0x1ed588(0x21f)](),this[_0x1ed588(0x37c)](),this[_0x1ed588(0x22e)](_0x4148b4),this['changePaintOpacity'](this[_0x1ed588(0x1f4)](_0x1d75f1)),this[_0x1ed588(0x2e8)](_0x4189df,_0x504199,_0x4148b4),this[_0x1ed588(0x299)](ColorManager[_0x1ed588(0x417)](_0x1672b6[_0x1ed588(0x312)])),this[_0x1ed588(0x2fa)](_0x1672b6[_0x1ed588(0x3af)],_0x4148b4['x'],_0x4148b4['y'],_0x4148b4[_0x1ed588(0x4e7)],'center'),this[_0x1ed588(0x37c)]();if(!_0x504199){this[_0x1ed588(0x241)](![]);const _0x4c2a7c=Math[_0x1ed588(0x507)](_0x4148b4['y']+this[_0x1ed588(0x268)]()+(_0x4148b4[_0x1ed588(0x1d4)]-this[_0x1ed588(0x268)]()*0x2)/0x2);this[_0x1ed588(0x2fa)](TextManager[_0x1ed588(0x330)],_0x4148b4['x'],_0x4c2a7c,_0x4148b4['width'],_0x1ed588(0x460));return;}_0x359328+=this[_0x1ed588(0x268)]();let _0x5f12b6=_0x504199[_0x1ed588(0x1a7)];_0x5f12b6=_0x5f12b6[_0x1ed588(0x318)](/\x1I\[(\d+)\]/gi,''),_0x5f12b6=_0x5f12b6['replace'](/\\I\[(\d+)\]/gi,''),this[_0x1ed588(0x2fa)](_0x5f12b6,_0x13bb81,_0x359328,_0x4148b4[_0x1ed588(0x4e7)]-_0x13bb81),_0x359328+=this['lineHeight'](),this['drawClassLevel'](this['_actor'],_0x340adb,_0x13bb81,_0x359328-0x4),_0x359328+=this[_0x1ed588(0x268)](),this[_0x1ed588(0x392)](_0x340adb,_0x4148b4),this[_0x1ed588(0x3ca)](_0x340adb,_0x1d75f1,_0x1672b6,_0x4148b4);},Window_ClassTier['prototype'][_0x306cf5(0x3ca)]=function(){const _0x1d5006=_0x306cf5,_0x569112=VisuMZ[_0x1d5006(0x3e0)]['Settings']['Window'][_0x1d5006(0x354)];if(_0x569112){_0x569112[_0x1d5006(0x1b8)](this,arguments);return;}const _0x1c8fff=arguments[0x0],_0x4c0439=arguments[0x1],_0x371eee=arguments[0x2],_0x273bc6=arguments[0x3],_0x44ce0f=$dataClasses[_0x1c8fff],_0x4f0f05=Imported[_0x1d5006(0x50d)],_0x41d990=!![],_0x54f0c4=0x16;let _0x10b625=_0x273bc6['x']+this[_0x1d5006(0x1c4)]()*0x4,_0x538545=_0x273bc6['y']+this[_0x1d5006(0x268)]()*3.25,_0x56c6c1=_0x273bc6[_0x1d5006(0x4e7)]-this[_0x1d5006(0x1c4)]()*0x8;if(_0x371eee[_0x1d5006(0x333)]&&_0x538545+this[_0x1d5006(0x268)]()<=_0x273bc6['y']+_0x273bc6[_0x1d5006(0x1d4)]){if('xMcau'===_0x1d5006(0x35b)){let _0x22b715=_0x44ce0f[_0x1d5006(0x27c)][_0x1d5006(0x4b5)](_0x384f1a=>_0x384f1a[_0x1d5006(0x4dc)]===Game_BattlerBase[_0x1d5006(0x291)])[_0x1d5006(0x306)](_0x4cedf9=>$dataSystem[_0x1d5006(0x1c9)][_0x4cedf9[_0x1d5006(0x4fe)]])[_0x1d5006(0x39b)](',\x20'),_0x2a8910=_0x1d5006(0x298)[_0x1d5006(0x25d)](TextManager['skill'],_0x22b715,_0x54f0c4||0x16);if(_0x41d990)_0x2a8910=_0x2a8910['replace'](/\\I\[(\d+)\]/gi,'');if(_0x4f0f05)_0x2a8910=_0x1d5006(0x26b)+_0x2a8910;this[_0x1d5006(0x1eb)](_0x2a8910,_0x10b625,_0x538545,_0x56c6c1),_0x538545+=this[_0x1d5006(0x268)]();}else return _0x594afb(_0x8c102['$1']);}if(_0x371eee[_0x1d5006(0x294)]&&_0x538545+this[_0x1d5006(0x268)]()<=_0x273bc6['y']+_0x273bc6[_0x1d5006(0x1d4)]){if(_0x1d5006(0x413)===_0x1d5006(0x3b9)){if(this[_0x1d5006(0x3ac)]())return _0x303300[_0x1d5006(0x41b)];return _0x882fa4[_0x1d5006(0x1fe)][_0x1d5006(0x28f)][_0x1d5006(0x255)](this);}else{let _0x59d28b=_0x44ce0f['traits'][_0x1d5006(0x4b5)](_0xaa5444=>_0xaa5444['code']===Game_BattlerBase[_0x1d5006(0x23f)])[_0x1d5006(0x306)](_0x45bead=>$dataSystem[_0x1d5006(0x20d)][_0x45bead[_0x1d5006(0x4fe)]])[_0x1d5006(0x39b)](',\x20'),_0x23d78a=_0x1d5006(0x298)[_0x1d5006(0x25d)](TextManager[_0x1d5006(0x1c5)],_0x59d28b,_0x54f0c4||0x16);if(_0x41d990)_0x23d78a=_0x23d78a['replace'](/\\I\[(\d+)\]/gi,'');if(_0x4f0f05)_0x23d78a='<WordWrap>'+_0x23d78a;this[_0x1d5006(0x1eb)](_0x23d78a,_0x10b625,_0x538545,_0x56c6c1),_0x538545+=this[_0x1d5006(0x268)]();}}if(_0x371eee[_0x1d5006(0x4e8)]&&_0x538545+this[_0x1d5006(0x268)]()<=_0x273bc6['y']+_0x273bc6[_0x1d5006(0x1d4)]){let _0x9e159a=_0x44ce0f[_0x1d5006(0x27c)]['filter'](_0x1830b1=>_0x1830b1['code']===Game_BattlerBase[_0x1d5006(0x348)])[_0x1d5006(0x306)](_0x5575dc=>$dataSystem[_0x1d5006(0x208)][_0x5575dc['dataId']])[_0x1d5006(0x39b)](',\x20'),_0x2afeb3=_0x1d5006(0x298)[_0x1d5006(0x25d)](TextManager[_0x1d5006(0x37d)],_0x9e159a,_0x54f0c4||0x16);if(_0x41d990)_0x2afeb3=_0x2afeb3['replace'](/\\I\[(\d+)\]/gi,'');if(_0x4f0f05)_0x2afeb3=_0x1d5006(0x26b)+_0x2afeb3;this[_0x1d5006(0x1eb)](_0x2afeb3,_0x10b625,_0x538545,_0x56c6c1),_0x538545+=this[_0x1d5006(0x268)]();}},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x2ea)]=function(){const _0x1fe949=_0x306cf5;Window_ClassCommand[_0x1fe949(0x1fe)]['processCursorMove']['call'](this),this[_0x1fe949(0x398)]();},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x398)]=function(){const _0x4bd122=_0x306cf5;if(!this[_0x4bd122(0x264)]())return;if(!this[_0x4bd122(0x4f2)])return;if(Input[_0x4bd122(0x419)](_0x4bd122(0x4ce))){if('JdpwY'===_0x4bd122(0x3c6))this[_0x4bd122(0x2b2)]()>0x1?(this[_0x4bd122(0x4cd)][_0x4bd122(0x20b)](0x0),this[_0x4bd122(0x4cd)][_0x4bd122(0x224)](),this[_0x4bd122(0x4cd)][_0x4bd122(0x350)](),this[_0x4bd122(0x1d1)][_0x4bd122(0x302)](),this[_0x4bd122(0x1d1)]['deactivate']()):(this[_0x4bd122(0x1d1)][_0x4bd122(0x20b)](0x0),this[_0x4bd122(0x1d1)]['setTier'](0x1),this[_0x4bd122(0x1d1)][_0x4bd122(0x224)](),this[_0x4bd122(0x1d1)]['activate'](),this['_classTierWindow'][_0x4bd122(0x302)](),this['_classTierWindow'][_0x4bd122(0x200)]());else{if(this[_0x4bd122(0x4f2)]){if(this[_0x4bd122(0x310)](this['index']())){if(_0x4bd122(0x237)!=='pajYP'){_0x3ff8d9['apply'](this,arguments);return;}else this['processShiftRemoveShortcut'](),this[_0x4bd122(0x447)]();}else this[_0x4bd122(0x277)]();}}}},Window_ClassTier[_0x306cf5(0x1fe)]['isShiftRemoveShortcutEnabled']=function(){const _0x13f039=_0x306cf5;if(!this[_0x13f039(0x418)])return![];if(!VisuMZ[_0x13f039(0x3e0)]['Settings'][_0x13f039(0x4a8)][_0x13f039(0x3e6)])return![];return!![];},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x310)]=function(_0x2acef5){const _0x383572=_0x306cf5;if(!this['_actor'])return;const _0x1558c3=this[_0x383572(0x4e5)]()+0x1;if(_0x1558c3<=0x1)return![];if(this[_0x383572(0x4f2)][_0x383572(0x1cf)](_0x1558c3))return'zSrTU'===_0x383572(0x232)?(_0x1cdb20=_0x8e5121(_0xb7bfe2),_0x2bfe12[_0x383572(0x260)](/#(.*)/i)?'#%1'[_0x383572(0x25d)](_0x5d14f1(_0x3d11cd['$1'])):this[_0x383572(0x1c1)](_0xf4fe18(_0x594f03))):![];if(!this['_actor'][_0x383572(0x2f6)](_0x1558c3)){if(_0x383572(0x46c)!==_0x383572(0x46c)){_0x12dfe9=_0x155521||_0x383572(0x42d);const _0x562c06=_0x383572(0x488)[_0x383572(0x25d)](_0x3b5178[_0x383572(0x34d)]),_0x551ce8=_0x36311a[_0x383572(0x49e)],_0x29b7ef=_0x551ce8['format'](_0x1c06bf,_0x5eaa2f[_0x383572(0x380)],_0x562c06,_0x4e6788[_0x383572(0x265)]),_0x18a82d=this[_0x383572(0x2f1)](_0x29b7ef)['width'];if(_0x4282ee===_0x383572(0x42d))_0x3629c2+=0x0;else _0x1dfb28==='center'?_0x336925+=_0xeb476[_0x383572(0x507)]((_0x50715e-_0x18a82d)/0x2):_0x2c3ded+=_0x4ed202-_0x18a82d;this[_0x383572(0x1eb)](_0x29b7ef,_0x559194,_0x342d14);}else return![];}return!![];;},Window_ClassTier[_0x306cf5(0x1fe)][_0x306cf5(0x457)]=function(){const _0x368b5d=_0x306cf5;SoundManager[_0x368b5d(0x352)](),this[_0x368b5d(0x4f2)][_0x368b5d(0x27a)](0x0,this[_0x368b5d(0x4e5)]()+0x1),this[_0x368b5d(0x345)](),SceneManager[_0x368b5d(0x2be)]['_statusWindow'][_0x368b5d(0x345)]();};function _0x35dc(_0x561be5,_0x103367){const _0x4bd83f=_0x4bd8();return _0x35dc=function(_0x35dcf7,_0x415915){_0x35dcf7=_0x35dcf7-0x19a;let _0x41503a=_0x4bd83f[_0x35dcf7];return _0x41503a;},_0x35dc(_0x561be5,_0x103367);}function Window_ClassList(){const _0x514110=_0x306cf5;this[_0x514110(0x3b1)](...arguments);}Window_ClassList[_0x306cf5(0x1fe)]=Object[_0x306cf5(0x520)](Window_ClassCommand['prototype']),Window_ClassList[_0x306cf5(0x1fe)]['constructor']=Window_ClassList,Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x3b1)]=function(_0x5dab60){const _0x317b0a=_0x306cf5;this['_tier']=0x1,Window_ClassCommand[_0x317b0a(0x1fe)]['initialize'][_0x317b0a(0x255)](this,_0x5dab60);},Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x1b5)]=function(){SoundManager['playClassChange']();},Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x1b2)]=function(_0x229f1c){const _0x2f1163=_0x306cf5;this[_0x2f1163(0x3df)]=_0x229f1c,this['callUpdateHelp']();},Window_ClassList['prototype'][_0x306cf5(0x447)]=function(){const _0x5d7cb4=_0x306cf5;this[_0x5d7cb4(0x4d2)]&&(this[_0x5d7cb4(0x3e3)]()?this[_0x5d7cb4(0x4d2)][_0x5d7cb4(0x430)](this[_0x5d7cb4(0x3e3)]()):this[_0x5d7cb4(0x4d2)][_0x5d7cb4(0x389)](TextManager[_0x5d7cb4(0x23e)])),this[_0x5d7cb4(0x4f2)]&&this[_0x5d7cb4(0x3df)]&&this[_0x5d7cb4(0x4fc)]();},Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x4fc)]=function(){const _0x556f14=_0x306cf5,_0x1620ee=this[_0x556f14(0x3e3)](),_0x2ba5d1=JsonEx[_0x556f14(0x1e5)](this['_actor']);_0x2ba5d1['_tempActor']=!![],_0x1620ee!==this['_actor']['currentClass']()&&(_0x1620ee?_0x2ba5d1[_0x556f14(0x27a)](_0x1620ee['id'],this[_0x556f14(0x210)]):_0x2ba5d1[_0x556f14(0x27a)](0x0,this[_0x556f14(0x210)])),this[_0x556f14(0x3df)][_0x556f14(0x361)](_0x2ba5d1);},Window_ClassList[_0x306cf5(0x1fe)]['setTier']=function(_0x594474){const _0x528a1e=_0x306cf5;this[_0x528a1e(0x210)]!==_0x594474&&(_0x528a1e(0x384)===_0x528a1e(0x48d)?(this[_0x528a1e(0x297)]=new _0x54439e(_0x50fcb7[_0x528a1e(0x44b)](_0x155b8e[_0x528a1e(0x19b)]||'')),this[_0x528a1e(0x49c)]=new _0x3595b9(_0x224372[_0x528a1e(0x525)](_0x4b82bd[_0x528a1e(0x2f0)]||'')),this[_0x528a1e(0x2de)](this[_0x528a1e(0x297)]),this[_0x528a1e(0x2de)](this[_0x528a1e(0x49c)]),this[_0x528a1e(0x297)][_0x528a1e(0x374)][_0x528a1e(0x47f)](this['adjustSprite'][_0x528a1e(0x313)](this,this['_backSprite1'])),this[_0x528a1e(0x49c)]['bitmap'][_0x528a1e(0x47f)](this[_0x528a1e(0x261)][_0x528a1e(0x313)](this,this[_0x528a1e(0x49c)]))):(this[_0x528a1e(0x210)]=_0x594474,this[_0x528a1e(0x345)]()));},Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x498)]=function(){const _0x50f5c4=_0x306cf5;if(!this[_0x50f5c4(0x4f2)])return;if(this[_0x50f5c4(0x210)]<=0x0)return;const _0x94d0c4=DataManager[_0x50f5c4(0x519)](this[_0x50f5c4(0x4f2)]);for(const _0x265f68 of _0x94d0c4){if(_0x50f5c4(0x489)!==_0x50f5c4(0x4ac)){if(!_0x265f68)continue;let _0x1ffd67=_0x265f68[_0x50f5c4(0x1a7)];_0x1ffd67=_0x1ffd67[_0x50f5c4(0x318)](/\x1I\[(\d+)\]/gi,''),_0x1ffd67=_0x1ffd67[_0x50f5c4(0x318)](/\\I\[(\d+)\]/gi,'');const _0x1995cf=this[_0x50f5c4(0x1f4)](_0x265f68);this[_0x50f5c4(0x3eb)](_0x1ffd67,_0x50f5c4(0x4af),_0x1995cf,_0x265f68);}else{if(!_0x3b5b85)return _0x42194b;const _0x32ec44=_0x50f5c4(0x436)['format'](_0x28ea65[_0x50f5c4(0x1d6)](),_0x4bc4ec['currentClass']()['id']);return _0x34dacb[_0x50f5c4(0x301)][_0x32ec44]||_0x2936ff;}}this[_0x50f5c4(0x210)]>0x1&&(_0x50f5c4(0x27f)===_0x50f5c4(0x29c)?_0x40e505[_0x50f5c4(0x1b9)](_0x1d536e[_0x50f5c4(0x3e0)][_0x50f5c4(0x510)]['ChangeClassSound']):this[_0x50f5c4(0x3eb)]('',_0x50f5c4(0x4af),!![],null));},Window_ClassList['prototype'][_0x306cf5(0x1f4)]=function(_0x4dafb2){const _0x2b5d23=_0x306cf5;if(this[_0x2b5d23(0x4f2)][_0x2b5d23(0x1cf)](this[_0x2b5d23(0x210)]))return![];if(this[_0x2b5d23(0x210)]>0x1&&_0x4dafb2===this[_0x2b5d23(0x4f2)][_0x2b5d23(0x426)]())return![];if(_0x4dafb2){if(_0x2b5d23(0x435)===_0x2b5d23(0x435)){const _0xd9ab83=this['_actor'][_0x2b5d23(0x442)](_0x4dafb2['id']);if(_0xd9ab83>0x0&&this[_0x2b5d23(0x4f2)][_0x2b5d23(0x1cf)](_0xd9ab83))return![];const _0xe05322=DataManager[_0x2b5d23(0x406)](_0x4dafb2);if(!_0xe05322[_0x2b5d23(0x1bc)](this[_0x2b5d23(0x210)]))return![];}else _0x57f9de=_0xcfaa56(_0x5558aa[_0x2b5d23(0x2d9)]);}return this[_0x2b5d23(0x210)]>0x0;},Window_ClassList[_0x306cf5(0x1fe)][_0x306cf5(0x1c2)]=function(_0x4b383b){const _0x183593=_0x306cf5;if(!this['_actor'])return;const _0x2ae049=this[_0x183593(0x246)](_0x4b383b),_0x1c0aca=this[_0x183593(0x210)],_0x532950=this[_0x183593(0x4aa)][_0x4b383b][_0x183593(0x50a)],_0x55dfe4=_0x532950?_0x532950['id']:0x0,_0x36a112=VisuMZ[_0x183593(0x3e0)]['Settings']['Multiclass'];if(!_0x36a112)return;const _0x242e2c=_0x36a112[_0x1c0aca-0x1];if(!_0x242e2c)return;let _0x53b367=_0x2ae049['x'],_0x4a4e3f=_0x2ae049['y'],_0x326651=_0x2ae049[_0x183593(0x4e7)]-this['itemPadding']()*0x2,_0x421eb5=_0x2ae049[_0x183593(0x1d4)],_0x447b4d=Math[_0x183593(0x382)](_0x326651,_0x421eb5,this[_0x183593(0x268)]()*0x3);_0x447b4d=Math[_0x183593(0x1f5)](_0x447b4d/ImageManager[_0x183593(0x385)])*ImageManager[_0x183593(0x385)],_0x53b367+=_0x447b4d+this['itemPadding']()*0x4,this[_0x183593(0x21f)](),this[_0x183593(0x37c)](),this[_0x183593(0x22e)](_0x2ae049),this[_0x183593(0x241)](this[_0x183593(0x1f4)](_0x532950));if(!_0x532950){this[_0x183593(0x241)](![]);const _0x224df9=Math[_0x183593(0x507)](_0x2ae049['y']+this['lineHeight']()+(_0x2ae049[_0x183593(0x1d4)]-this[_0x183593(0x268)]()*0x2)/0x2);this[_0x183593(0x2fa)](TextManager['classChange_multiclass_remove'],_0x2ae049['x'],_0x224df9,_0x2ae049[_0x183593(0x4e7)],_0x183593(0x460));return;}this[_0x183593(0x2e8)](_0x4b383b,_0x532950,_0x2ae049);const _0x1e812f=this['_actor'][_0x183593(0x442)](_0x55dfe4);if(_0x1e812f>0x0){const _0x2973f1=_0x36a112[_0x1e812f-0x1];_0x2973f1&&('HwcLL'===_0x183593(0x3f5)?(this['changeTextColor'](ColorManager[_0x183593(0x417)](_0x2973f1[_0x183593(0x312)])),this[_0x183593(0x2fa)](_0x2973f1[_0x183593(0x3af)],_0x2ae049['x'],_0x2ae049['y'],_0x2ae049['width'],_0x183593(0x460)),this[_0x183593(0x37c)]()):(_0x2c4cb2=this['_actor']['param'](_0x3eb220),_0x59d535=this[_0x183593(0x4b4)][_0x183593(0x357)](_0x1fcdf6),_0x429743=this[_0x183593(0x4b4)]['param'](_0x40217d)));}this[_0x183593(0x241)](this[_0x183593(0x1f4)](_0x532950)),_0x4a4e3f+=this[_0x183593(0x268)]();let _0x179cc0=_0x532950[_0x183593(0x1a7)];_0x179cc0=_0x179cc0[_0x183593(0x318)](/\x1I\[(\d+)\]/gi,''),_0x179cc0=_0x179cc0['replace'](/\\I\[(\d+)\]/gi,''),this[_0x183593(0x2fa)](_0x179cc0,_0x53b367,_0x4a4e3f,_0x2ae049['width']-_0x53b367),_0x4a4e3f+=this[_0x183593(0x268)](),this['drawClassLevel'](this[_0x183593(0x4f2)],_0x55dfe4,_0x53b367,_0x4a4e3f-0x4),_0x4a4e3f+=this[_0x183593(0x268)](),this[_0x183593(0x392)](_0x55dfe4,_0x2ae049);};