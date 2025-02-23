//=============================================================================
// VisuStella MZ - ActSeqImpact
// VisuMZ_3_ActSeqImpact.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqImpact = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqImpact = VisuMZ.ActSeqImpact || {};
VisuMZ.ActSeqImpact.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [ActSeqImpact]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Impact_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * With the aid of Pixi JS Filters, this plugin adds more impact to battle by
 * producing special on screen filter effects to make certain actions like
 * critical hits, guarding, and dodging more visibly different adding to the
 * flavor of the battle.
 * 
 * This plugin also adds new Action Sequences for the Battle Core, allowing
 * impacting effects like color breaks, motion blurs, shockwaves, motion
 * trails, and zoom blurs.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Creating a color break effect when landing critical hits akin to a
 *   chromatic aberration effect.
 * * A battler who dodges an attack will display a motion blur effect.
 * * Guarding damage will cause a shockwave effect.
 * * Adds new Action Sequences available from the Battle Core Plugin Commands.
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
 * * Pixi JS Filters*
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 * 
 * The following are new visual effects added through this plugin. These visual
 * effects are added and modified with the sense of adding more impact to
 * visuals in battle.
 *
 * ---
 * 
 * Color Break
 * 
 * When a critical hit occurs, the colors on the screen will break apart into
 * red, green, and blue into random directions and then come back together
 * similar to a chromatic aberration. This creates a sense of weight when
 * delivering a powerful strike.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Motion Blur
 * 
 * When a battler dodges an attack (either a miss or evasion proc), then the
 * battler will generate a motion blur effect. Their image splits apart in a
 * blurred manner and then fuses back together to become whole again. This
 * generates the illusion that they're hard to hit.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * There are two versions, one that affects only the battler while another that
 * affects the whole screen.
 * 
 * ---
 * 
 * Shockwave
 * 
 * When a guarding battler would receive HP damage (or manages to defend to 0
 * damage), a shockwave effect occurs to display the impact. The shockwave will
 * ripple out from the battler to the edges of the screen before disappearing.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Motion Trail
 * 
 * If motion trails are enabled on a battler, whenever they move, they leave
 * behind a residual sprite of their motion during that particular frame. The
 * motion blurs aid in visualizing the path the battler moved in case the
 * battler's movement trajectory is normally too fast to portray. Motion trails
 * can have different hue and/or tones.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 * 
 * Zoom Blur
 * 
 * A zoom blur will direct its focus at a specific point on the screen and
 * create a visual radial distortion towards that point. The intensity of the
 * zoom effect will diminish over the duration of the zoom blur. This helps
 * draw focus towards specific parts of the screen.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Critical Color Break Settings
 * ============================================================================
 *
 * When critical hits occur, you can cause a Color Break effect to occur.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Color Break effect whenever a critical hit occurs?
 * 
 *   Intensity:
 *   - How intense do you want the Color Break effect to be?
 * 
 *   Duration:
 *   - What is the duration of the Color Break effect?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dodge Motion Blur Settings
 * ============================================================================
 *
 * When a battler dodges an attack, you can create a motion blur effect.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Motion Blur effect whenever a battler evades an
 *     attack?
 * 
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 * 
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Shockwave Settings
 * ============================================================================
 *
 * When a guarding battler receives damage, you can create a shockwave effect.
 *
 * ---
 *
 * Category
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Shockwave effect whenever a battler is attacked
 *     while guarding?
 * 
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 * 
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 * 
 *   Duration:
 *   - What is the duration of the shockwave?
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
 * Version 1.04: October 28, 2021
 * * Bug Fixes!
 * ** Guard shockwave now originates from the proper location with front view
 *    sprites enabled under specific battle layouts. Fix made by Irina.
 * 
 * Version 1.03: December 11, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Enemies with a SV Battler attached to them will no longer desynch after
 *    using a motion trail effect. Fix made by Irina.
 * 
 * Version 1.01: November 29, 2020
 * * Bug Fixes!
 * ** Motion Trails for Dragonbones armatures are now properly adjusted for
 *    their scale and offset. Fix made by Arisu.
 *
 * Version 1.00: December 2, 2020
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
 * @param ActSeqImpact
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CriticalColorBreak:struct
 * @text Critical Color Break
 * @type struct<CriticalColorBreak>
 * @desc When critical hits occur, you can cause a Color Break effect to occur.
 * @default {"Enable:eval":"true","Intensity:num":"30","Duration:num":"30","EasingType:str":"OutBack"}
 *
 * @param DodgeMotionBlur:struct
 * @text Dodge Motion Blur
 * @type struct<DodgeMotionBlur>
 * @desc When a battler dodges an attack, you can create a motion blur effect.
 * @default {"Enable:eval":"true","Rate:eval":"0.5","Duration:num":"30","EasingType:str":"InOutSine"}
 *
 * @param GuardShockWave:struct
 * @text Guard Shockwave
 * @type struct<GuardShockWave>
 * @desc When a guarding battler receives damage, you can create a shockwave effect.
 * @default {"Enable:eval":"true","Amp:num":"30","Wave:num":"160","Duration:num":"30"}
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
 * Critical Color Break Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CriticalColorBreak:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Color Break effect whenever a
 * critical hit occurs?
 * @default true
 *
 * @param Intensity:num
 * @text Intensity
 * @type Number
 * @min 1
 * @desc How intense do you want the Color Break effect to be?
 * @default 30
 *
 * @param Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc What is the duration of the Color Break effect?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 */
/* ----------------------------------------------------------------------------
 * Dodge Motion Blur Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DodgeMotionBlur:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Motion Blur effect whenever a
 * battler evades an attack?
 * @default true
 *
 * @param Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @param Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 */
/* ----------------------------------------------------------------------------
 * Guard Shock Wave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GuardShockWave:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Shockwave effect whenever a
 * battler is attacked while guarding?
 * @default true
 * 
 * @param Amp:num
 * @text Amplitude
 * @type Number
 * @min 1
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @param Wave:num
 * @text Wavelength
 * @type Number
 * @min 1
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @param Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc What is the duration of the shockwave?
 * @default 30
 *
 */
//=============================================================================

const _0x451240=_0x278d;(function(_0x34e162,_0x224cd0){const _0x57c0d9=_0x278d,_0x396e4d=_0x34e162();while(!![]){try{const _0x5a915d=-parseInt(_0x57c0d9(0x1a7))/0x1*(-parseInt(_0x57c0d9(0x192))/0x2)+-parseInt(_0x57c0d9(0x11b))/0x3+parseInt(_0x57c0d9(0x1a3))/0x4*(-parseInt(_0x57c0d9(0x1a9))/0x5)+parseInt(_0x57c0d9(0x149))/0x6+parseInt(_0x57c0d9(0x1c2))/0x7*(-parseInt(_0x57c0d9(0x191))/0x8)+-parseInt(_0x57c0d9(0x198))/0x9+parseInt(_0x57c0d9(0x148))/0xa*(parseInt(_0x57c0d9(0x1a0))/0xb);if(_0x5a915d===_0x224cd0)break;else _0x396e4d['push'](_0x396e4d['shift']());}catch(_0x59c691){_0x396e4d['push'](_0x396e4d['shift']());}}}(_0x3f1d,0x7db06));var label=_0x451240(0x1d6),tier=tier||0x0,dependencies=[_0x451240(0xfd),_0x451240(0x1a4)],pluginData=$plugins[_0x451240(0x187)](function(_0xa77b93){const _0x54e77c=_0x451240;return _0xa77b93[_0x54e77c(0x132)]&&_0xa77b93[_0x54e77c(0x19b)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x451240(0x127)]=VisuMZ[label][_0x451240(0x127)]||{},VisuMZ[_0x451240(0x170)]=function(_0x8db2e7,_0xafc70){const _0xf01f37=_0x451240;for(const _0x4b88e9 in _0xafc70){if(_0x4b88e9[_0xf01f37(0x101)](/(.*):(.*)/i)){const _0x5f2705=String(RegExp['$1']),_0x19f55c=String(RegExp['$2'])['toUpperCase']()[_0xf01f37(0x12e)]();let _0x4ec552,_0x34a0ce,_0x422c94;switch(_0x19f55c){case'NUM':_0x4ec552=_0xafc70[_0x4b88e9]!==''?Number(_0xafc70[_0x4b88e9]):0x0;break;case _0xf01f37(0x112):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce[_0xf01f37(0x14b)](_0x48979d=>Number(_0x48979d));break;case'EVAL':_0x4ec552=_0xafc70[_0x4b88e9]!==''?eval(_0xafc70[_0x4b88e9]):null;break;case _0xf01f37(0x141):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce[_0xf01f37(0x14b)](_0x48ef43=>eval(_0x48ef43));break;case _0xf01f37(0x140):_0x4ec552=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):'';break;case _0xf01f37(0x1b9):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce['map'](_0x3564ff=>JSON[_0xf01f37(0x17b)](_0x3564ff));break;case _0xf01f37(0x10e):_0x4ec552=_0xafc70[_0x4b88e9]!==''?new Function(JSON['parse'](_0xafc70[_0x4b88e9])):new Function(_0xf01f37(0x1ca));break;case _0xf01f37(0x12c):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON['parse'](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce['map'](_0x5893ec=>new Function(JSON[_0xf01f37(0x17b)](_0x5893ec)));break;case _0xf01f37(0x1a2):_0x4ec552=_0xafc70[_0x4b88e9]!==''?String(_0xafc70[_0x4b88e9]):'';break;case _0xf01f37(0x1cb):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce[_0xf01f37(0x14b)](_0x14aaef=>String(_0x14aaef));break;case _0xf01f37(0x1d3):_0x422c94=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):{},_0x4ec552=VisuMZ[_0xf01f37(0x170)]({},_0x422c94);break;case _0xf01f37(0x18b):_0x34a0ce=_0xafc70[_0x4b88e9]!==''?JSON[_0xf01f37(0x17b)](_0xafc70[_0x4b88e9]):[],_0x4ec552=_0x34a0ce[_0xf01f37(0x14b)](_0x3f8277=>VisuMZ[_0xf01f37(0x170)]({},JSON['parse'](_0x3f8277)));break;default:continue;}_0x8db2e7[_0x5f2705]=_0x4ec552;}}return _0x8db2e7;},(_0x1b7789=>{const _0x227da5=_0x451240,_0x4cc19b=_0x1b7789[_0x227da5(0x1c3)];for(const _0x376dcb of dependencies){if(_0x227da5(0x168)===_0x227da5(0x168)){if(!Imported[_0x376dcb]){if(_0x227da5(0x161)!=='mGKLW'){if(!this['_motionTrailContainer'])return![];const _0x1f97ce=this['_motionTrailContainer'][_0x227da5(0x119)][_0x227da5(0x187)](_0x18b261=>_0x18b261['constructor']!==_0xbfb8f1);for(const _0x4285ea of _0x1f97ce){this[_0x227da5(0x186)][_0x227da5(0xfb)](_0x4285ea);}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x227da5(0x117)](_0x4cc19b,_0x376dcb)),SceneManager[_0x227da5(0x10f)]();break;}}}else return;}const _0x4be498=_0x1b7789[_0x227da5(0x19b)];if(_0x4be498[_0x227da5(0x101)](/\[Version[ ](.*?)\]/i)){if(_0x227da5(0x1c0)!=='pGiYN'){const _0x21f4bb=Number(RegExp['$1']);if(_0x21f4bb!==VisuMZ[label][_0x227da5(0x183)]){if(_0x227da5(0x106)===_0x227da5(0x19a)){const _0x2ebf19=_0x286eeb[_0x227da5(0x1c5)];_0x2ebf19[_0x227da5(0xfb)](this[_0x227da5(0x1be)]),_0x3e6d5['updateBattlerContainer']();}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x4cc19b,_0x21f4bb)),SceneManager[_0x227da5(0x10f)]();}}else _0x2d9338[_0x227da5(0x1b2)]=0x0;}if(_0x4be498[_0x227da5(0x101)](/\[Tier[ ](\d+)\]/i)){const _0x2f0ba5=Number(RegExp['$1']);_0x2f0ba5<tier?_0x227da5(0x139)==='zwRSa'?(_0x573c6f[_0x227da5(0x1d6)][_0x227da5(0x1ac)]['call'](this),this[_0x227da5(0x186)]=new _0x282e2b(),this[_0x227da5(0x1ae)][_0x227da5(0xfb)](this[_0x227da5(0x186)]),this[_0x227da5(0x17a)]&&this['_battleField'][_0x227da5(0xfb)](this[_0x227da5(0x17a)])):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4cc19b,_0x2f0ba5,tier)),SceneManager[_0x227da5(0x10f)]()):_0x227da5(0x1d4)!==_0x227da5(0x1b7)?tier=Math[_0x227da5(0x158)](_0x2f0ba5,tier):this[_0x227da5(0x11f)](...arguments);}VisuMZ['ConvertParams'](VisuMZ[label][_0x227da5(0x127)],_0x1b7789['parameters']);})(pluginData),Game_BattlerBase['prototype']['battlerMotionTrailData']=function(){const _0x71e52a=_0x451240;if(this[_0x71e52a(0x110)]){if(_0x71e52a(0x13b)!==_0x71e52a(0x1d5))return this['_battlerMotionTrailData'];else this[_0x71e52a(0x133)]();}return this[_0x71e52a(0x110)]=this[_0x71e52a(0x103)](),this[_0x71e52a(0x110)];},Game_BattlerBase[_0x451240(0x116)]['clearBattlerMotionTrailData']=function(){const _0x2c0730=_0x451240;this['_battlerMotionTrailData']=this[_0x2c0730(0x103)]();},Game_BattlerBase['prototype'][_0x451240(0x1bd)]=function(_0x5dd2f5){const _0x3095fa=_0x451240;this[_0x3095fa(0x110)]=_0x5dd2f5;},Game_BattlerBase[_0x451240(0x116)][_0x451240(0x103)]=function(){return{'delay':0x1,'duration':0x1e,'hue':0x0,'opacityStart':0xc8,'tone':[0x0,0x0,0x0,0x0],'visible':![]};},VisuMZ[_0x451240(0x1d6)][_0x451240(0x156)]=Game_Battler[_0x451240(0x116)][_0x451240(0x15b)],Game_Battler[_0x451240(0x116)]['onDamage']=function(_0x13d577){const _0x23f192=_0x451240;VisuMZ['ActSeqImpact'][_0x23f192(0x156)][_0x23f192(0x1c6)](this,_0x13d577),this['onDamageActSeqImpact'](_0x13d577);},Game_Battler[_0x451240(0x116)]['onDamageActSeqImpact']=function(_0x49a952){const _0x4db752=_0x451240;if(_0x49a952<0x0)return;if(!this[_0x4db752(0x1d7)]())return;const _0x1f1681=VisuMZ['ActSeqImpact'][_0x4db752(0x127)][_0x4db752(0x1bc)];if(!_0x1f1681)return;if(!_0x1f1681[_0x4db752(0x1af)])return;if(!SceneManager[_0x4db752(0x1da)]())return;const _0x47dcbd=SceneManager['_scene'][_0x4db752(0x17e)];if(!_0x47dcbd)return;if(!this['battler']())return;let _0xf4df63=this[_0x4db752(0x167)]()[_0x4db752(0x16b)],_0x622a50=this[_0x4db752(0x167)]()[_0x4db752(0x166)]-this[_0x4db752(0x167)]()['mainSpriteHeight']()/0x2;const _0x4ac1b0=_0x1f1681[_0x4db752(0x1b1)]||0x1,_0x1b062d=_0x1f1681[_0x4db752(0x174)]||0x1,_0x3f20d0=_0x1f1681[_0x4db752(0x145)]||0x1;if(this[_0x4db752(0x12a)]()&&!$gameSystem[_0x4db752(0x128)]()){if(_0x4db752(0x1ad)!==_0x4db752(0x15e)){const _0x25ce3b=SceneManager[_0x4db752(0x131)];_0xf4df63+=_0x25ce3b[_0x4db752(0x1db)]['x'],_0xf4df63+=_0x25ce3b[_0x4db752(0x199)]['x'],_0x622a50+=_0x25ce3b[_0x4db752(0x1db)]['y'],_0x622a50+=_0x25ce3b['_statusWindow']['y'];}else _0x252366[_0x4db752(0x12f)]['x']=0x0,_0x4fd2d6[_0x4db752(0x12f)]['y']=0x0;}_0x47dcbd['setupShockwaveImpactFilter'](_0xf4df63,_0x622a50,_0x4ac1b0,_0x1b062d,_0x3f20d0);},VisuMZ[_0x451240(0x1d6)][_0x451240(0x194)]=Game_Battler[_0x451240(0x116)][_0x451240(0x135)],Game_Battler[_0x451240(0x116)][_0x451240(0x135)]=function(){const _0x189f25=_0x451240;VisuMZ[_0x189f25(0x1d6)][_0x189f25(0x194)][_0x189f25(0x1c6)](this),this[_0x189f25(0x16a)]();},VisuMZ[_0x451240(0x1d6)][_0x451240(0x124)]=Game_Battler[_0x451240(0x116)]['performEvasion'],Game_Battler[_0x451240(0x116)][_0x451240(0x13e)]=function(){const _0x36afb7=_0x451240;VisuMZ[_0x36afb7(0x1d6)][_0x36afb7(0x124)][_0x36afb7(0x1c6)](this),this[_0x36afb7(0x16a)]();},Game_Battler[_0x451240(0x116)][_0x451240(0x16a)]=function(){const _0x2a9dca=_0x451240,_0x3a5713=VisuMZ[_0x2a9dca(0x1d6)]['Settings'][_0x2a9dca(0x1c1)];if(!_0x3a5713)return;if(!_0x3a5713['Enable'])return;if(!SceneManager['isSceneBattle']())return;const _0x56ee83=SceneManager['_scene']['_spriteset'];if(!_0x56ee83)return;if(!this['battler']())return;if(this[_0x2a9dca(0x167)]()['_motionBlurImpactDuration']>0x0)return;const _0x34c605=Math[_0x2a9dca(0x18d)](0x168),_0x18b580=_0x3a5713['Rate']||0.1,_0x43000c=_0x3a5713['Duration'],_0x3ca08b=_0x3a5713[_0x2a9dca(0x1b4)]||'Linear';this[_0x2a9dca(0x167)]()[_0x2a9dca(0x155)](_0x34c605,_0x18b580,_0x43000c,_0x3ca08b);},VisuMZ['ActSeqImpact'][_0x451240(0x19c)]=Sprite_Battler[_0x451240(0x116)][_0x451240(0x107)],Sprite_Battler[_0x451240(0x116)][_0x451240(0x107)]=function(){const _0x4af173=_0x451240;VisuMZ[_0x4af173(0x1d6)][_0x4af173(0x19c)][_0x4af173(0x1c6)](this),this[_0x4af173(0x178)]();},Sprite_Battler[_0x451240(0x116)]['createActSeqImpactFilters']=function(){const _0x5dd9d4=_0x451240;if(!this['_distortionSprite'])return;this[_0x5dd9d4(0x10c)][_0x5dd9d4(0x175)]=this['_distortionSprite'][_0x5dd9d4(0x175)]||[],this[_0x5dd9d4(0x114)]();},VisuMZ[_0x451240(0x1d6)]['Sprite_Battler_update']=Sprite_Battler[_0x451240(0x116)]['update'],Sprite_Battler[_0x451240(0x116)]['update']=function(){const _0x1fe456=_0x451240;VisuMZ[_0x1fe456(0x1d6)][_0x1fe456(0x142)][_0x1fe456(0x1c6)](this),this[_0x1fe456(0x130)](),this['updateMotionBlurImpactFilter']();},Sprite_Battler[_0x451240(0x116)][_0x451240(0x130)]=function(){const _0x2246d1=_0x451240;if(this['constructor']===Sprite_SvEnemy)return;if(!this[_0x2246d1(0x1a8)])return;if(!this['_battler'][_0x2246d1(0x1c8)]())return;if(!this[_0x2246d1(0x1a8)][_0x2246d1(0x138)]())return;if(!this[_0x2246d1(0x1a6)])return;if(!this[_0x2246d1(0x10c)])return;if(this[_0x2246d1(0x19f)]){if(_0x2246d1(0x109)!==_0x2246d1(0x109)){if(!this[_0x2246d1(0x1d9)])return;if(this[_0x2246d1(0x165)]<=0x0)return;const _0x167cfc=this[_0x2246d1(0x1d9)],_0x5b1a24=this['_zoomBlurImpactDuration']||0x0,_0x1be65c=this[_0x2246d1(0x1ce)]||_0x5b1a24,_0x2119ab=0x0,_0x4275f3=this[_0x2246d1(0x1d0)];_0x167cfc[_0x2246d1(0x1b2)]=_0x570310[_0x2246d1(0x1d6)][_0x2246d1(0x15f)](_0x167cfc[_0x2246d1(0x1b2)],_0x2119ab,_0x5b1a24,_0x1be65c,_0x4275f3),this[_0x2246d1(0x165)]--,this[_0x2246d1(0x165)]<=0x0&&(_0x167cfc[_0x2246d1(0x1b2)]=0x0);}else{this[_0x2246d1(0x19f)]=![];return;}}if(Imported[_0x2246d1(0x1cd)]&&this['_dragonbones']){}const _0x4f5404=this['_battler'][_0x2246d1(0x11d)]();if(!_0x4f5404[_0x2246d1(0x113)])return;const _0x14c216=Math[_0x2246d1(0x158)](0x1,_0x4f5404['delay']);if(Graphics[_0x2246d1(0x1b6)]%_0x14c216!==0x0){if('oCPfF'!=='SwwWz')return;else{const _0x219959=_0xc983a1['ActSeqImpact'][_0x2246d1(0x127)][_0x2246d1(0x15a)];if(!_0x219959)return;if(!_0x219959[_0x2246d1(0x1af)])return;const _0x202e4e=_0x419e6c[_0x2246d1(0x131)][_0x2246d1(0x17e)];if(!_0x202e4e)return;if(_0x202e4e[_0x2246d1(0x181)]>0x0)return;const _0x396c43=_0x219959[_0x2246d1(0x1b3)]||0x1,_0x1ad532=_0x219959[_0x2246d1(0x145)]||0x1,_0x37a2da=_0x219959[_0x2246d1(0x1b4)]||_0x2246d1(0x1b5);_0x202e4e['setupRgbSplitImpactFilter'](_0x396c43,_0x1ad532,_0x37a2da);}}const _0x338bb5=SceneManager[_0x2246d1(0x131)][_0x2246d1(0x17e)]['_motionTrailContainer'];if(!_0x338bb5)return;this['_isCreatingMotionTrailSprite']=!![];const _0x1ad495=new Sprite_BattlerMotionTrail(this,_0x4f5404);_0x338bb5[_0x2246d1(0xfb)](_0x1ad495);},Sprite_Battler[_0x451240(0x116)][_0x451240(0x114)]=function(){const _0x544f99=_0x451240;if(!PIXI[_0x544f99(0x175)][_0x544f99(0x13a)])return;this['_motionBlurImpactDuration']=0x0,this[_0x544f99(0x177)]=0x0,this['_motionBlurImpactEasing']='Linear',this['_motionBlurImpactFilter']=new PIXI['filters']['MotionBlurFilter'](),this[_0x544f99(0x147)][_0x544f99(0x12f)]['x']=0x0,this[_0x544f99(0x147)][_0x544f99(0x12f)]['y']=0x0,this[_0x544f99(0x10c)][_0x544f99(0x175)][_0x544f99(0x176)](this['_motionBlurImpactFilter']);},Sprite_Battler['prototype'][_0x451240(0x155)]=function(_0x172250,_0x1ffa62,_0x5af6b6,_0x197b12){const _0x7881f9=_0x451240;if(!this[_0x7881f9(0x147)])return;const _0x41cb8b=this[_0x7881f9(0x147)];this[_0x7881f9(0x169)]=_0x5af6b6,this[_0x7881f9(0x177)]=_0x5af6b6,this[_0x7881f9(0x1b0)]=_0x197b12;const _0x4bd4ea=this[_0x7881f9(0xfc)]()*_0x1ffa62,_0x5688d9=_0x4bd4ea*Math[_0x7881f9(0x122)](_0x172250*Math['PI']/0xb4),_0x1d0381=-_0x4bd4ea*Math[_0x7881f9(0x157)](_0x172250*Math['PI']/0xb4);_0x41cb8b[_0x7881f9(0x12f)]['x']=_0x5688d9,_0x41cb8b[_0x7881f9(0x12f)]['y']=_0x1d0381;},Sprite_Battler[_0x451240(0x116)]['updateMotionBlurImpactFilter']=function(){const _0x1cfe5e=_0x451240;if(!this[_0x1cfe5e(0x147)])return;if(this[_0x1cfe5e(0x169)]<=0x0)return;const _0x5ba9b8=this[_0x1cfe5e(0x147)],_0x189fe9=this[_0x1cfe5e(0x169)]||0x0,_0x93aa6a=this['_motionBlurImpactWholeDuration']||_0x189fe9,_0x5ddf2a=0x0,_0x4cb938=this[_0x1cfe5e(0x1b0)];_0x5ba9b8[_0x1cfe5e(0x12f)]['x']=VisuMZ['ActSeqImpact']['applyEasing'](_0x5ba9b8[_0x1cfe5e(0x12f)]['x'],_0x5ddf2a,_0x189fe9,_0x93aa6a,_0x4cb938),_0x5ba9b8[_0x1cfe5e(0x12f)]['y']=VisuMZ[_0x1cfe5e(0x1d6)][_0x1cfe5e(0x15f)](_0x5ba9b8['velocity']['y'],_0x5ddf2a,_0x189fe9,_0x93aa6a,_0x4cb938),this[_0x1cfe5e(0x169)]--,this['_motionBlurImpactDuration']<=0x0&&(_0x5ba9b8['velocity']['x']=0x0,_0x5ba9b8[_0x1cfe5e(0x12f)]['y']=0x0);},VisuMZ[_0x451240(0x1d6)][_0x451240(0x102)]=Sprite_Damage[_0x451240(0x116)][_0x451240(0x125)],Sprite_Damage['prototype']['setupCriticalEffect']=function(){const _0xb4ed3a=_0x451240;VisuMZ[_0xb4ed3a(0x1d6)][_0xb4ed3a(0x102)][_0xb4ed3a(0x1c6)](this),this[_0xb4ed3a(0x190)]();},Sprite_Damage['prototype']['setupCriticalEffectActSeqImpact']=function(){const _0x45a58c=_0x451240,_0x5865f5=VisuMZ[_0x45a58c(0x1d6)]['Settings'][_0x45a58c(0x15a)];if(!_0x5865f5)return;if(!_0x5865f5[_0x45a58c(0x1af)])return;const _0x19bdc3=SceneManager[_0x45a58c(0x131)][_0x45a58c(0x17e)];if(!_0x19bdc3)return;if(_0x19bdc3[_0x45a58c(0x181)]>0x0)return;const _0x1fbcc4=_0x5865f5[_0x45a58c(0x1b3)]||0x1,_0x1e6a1f=_0x5865f5['Duration']||0x1,_0x50949f=_0x5865f5['EasingType']||_0x45a58c(0x1b5);_0x19bdc3[_0x45a58c(0x154)](_0x1fbcc4,_0x1e6a1f,_0x50949f);};function Sprite_BattlerMotionTrail(){const _0x564313=_0x451240;this[_0x564313(0x11f)](...arguments);}Sprite_BattlerMotionTrail[_0x451240(0x116)]=Object[_0x451240(0x1a1)](Sprite[_0x451240(0x116)]),Sprite_BattlerMotionTrail[_0x451240(0x116)][_0x451240(0x185)]=Sprite_BattlerMotionTrail,Sprite_BattlerMotionTrail[_0x451240(0x116)]['initialize']=function(_0x3d341b,_0x3311a8){const _0x1680ea=_0x451240;this[_0x1680ea(0x1be)]=_0x3d341b,this[_0x1680ea(0x1bf)]=_0x3311a8,Sprite[_0x1680ea(0x116)][_0x1680ea(0x11f)][_0x1680ea(0x1c6)](this),this[_0x1680ea(0x19e)](),this['setupMotionTrailProperties']();},Sprite_BattlerMotionTrail['prototype']['createChildren']=function(){const _0x102a0d=_0x451240,_0x22b9d7=this['_sourceSprite'][_0x102a0d(0x10c)];this[_0x102a0d(0x10c)]=new Sprite(),this[_0x102a0d(0xfb)](this[_0x102a0d(0x10c)]),this[_0x102a0d(0x134)](this[_0x102a0d(0x10c)],_0x22b9d7,!![]);},Sprite_BattlerMotionTrail[_0x451240(0x116)]['matchSpriteProperties']=function(_0x15b8f7,_0x4564f1,_0x3a66fe){const _0x32ffee=_0x451240;_0x15b8f7['bitmap']=_0x4564f1['bitmap'];const _0x1f9146=_0x4564f1['_frame'];_0x1f9146&&('ovVML'===_0x32ffee(0x193)?_0x15b8f7['setFrame'](_0x1f9146['x'],_0x1f9146['y'],_0x1f9146[_0x32ffee(0x108)],_0x1f9146[_0x32ffee(0x144)]):(_0x322440[_0x32ffee(0x1d6)][_0x32ffee(0x16c)][_0x32ffee(0x1c6)](this),this[_0x32ffee(0x16d)]()));_0x15b8f7[_0x32ffee(0x14e)]['x']=_0x4564f1[_0x32ffee(0x14e)]['x'],_0x15b8f7['anchor']['y']=_0x4564f1[_0x32ffee(0x14e)]['y'],_0x15b8f7[_0x32ffee(0x179)]['x']=_0x4564f1['scale']['x'],_0x15b8f7['scale']['y']=_0x4564f1[_0x32ffee(0x179)]['y'],_0x15b8f7['angle']=_0x4564f1[_0x32ffee(0x121)],_0x15b8f7[_0x32ffee(0x1a5)]['x']=_0x4564f1['skew']['x'],_0x15b8f7['skew']['y']=_0x4564f1[_0x32ffee(0x1a5)]['y'],_0x15b8f7['x']=_0x4564f1['x'],_0x15b8f7['y']=_0x4564f1['y'],_0x15b8f7[_0x32ffee(0x180)](_0x4564f1[_0x32ffee(0x171)]);if(_0x3a66fe){if(_0x32ffee(0x195)===_0x32ffee(0x195))for(const _0x375ed4 of _0x4564f1['children']){if(!_0x375ed4)continue;if(_0x375ed4['armature']){if(_0x32ffee(0x197)===_0x32ffee(0x159)){if(!this['_motionBlurImpactFilter'])return;const _0x44864f=this[_0x32ffee(0x147)];this[_0x32ffee(0x169)]=_0x180e2f,this[_0x32ffee(0x177)]=_0x54c7a4,this['_motionBlurImpactEasing']=_0x2ab42a;const _0x57437c=_0x2bc551['max'](this[_0x32ffee(0x108)],this[_0x32ffee(0x144)])*_0x3b699f,_0x2338a3=_0x57437c*_0x2ef861[_0x32ffee(0x122)](_0x41ff24*_0x365808['PI']/0xb4),_0x1f00ef=-_0x57437c*_0x28feb8[_0x32ffee(0x157)](_0x5f2da9*_0x2a17a2['PI']/0xb4);_0x44864f[_0x32ffee(0x12f)]['x']=_0x2338a3,_0x44864f[_0x32ffee(0x12f)]['y']=_0x1f00ef;}else this[_0x32ffee(0x15c)](_0x15b8f7,_0x375ed4);}else{const _0x1b286e=new Sprite();_0x15b8f7[_0x32ffee(0xfb)](_0x1b286e),this[_0x32ffee(0x134)](_0x1b286e,_0x375ed4,!![]);}}else{if(!this['_rgbSplitImpactFilter'])return;const _0x230a49=this[_0x32ffee(0x118)],_0x4d57b2=_0x545069*0x2;this[_0x32ffee(0x181)]=_0x5d5a3a,this[_0x32ffee(0x18f)]=_0x1b7b4f,this['_rgbSplitImpactEasing']=_0x4ba6ce||'Linear',_0x230a49[_0x32ffee(0x12b)]=[_0x2586ca['randomInt'](_0x4d57b2)-_0x261138,_0x3b2663[_0x32ffee(0x18d)](_0x4d57b2)-_0x29af92],_0x230a49[_0x32ffee(0xfe)]=[_0x8d1722['randomInt'](_0x4d57b2)-_0x24a810,_0x4a3875[_0x32ffee(0x18d)](_0x4d57b2)-_0x3e0207],_0x230a49[_0x32ffee(0x13d)]=[_0x3e8a69[_0x32ffee(0x18d)](_0x4d57b2)-_0x12035c,_0x5c7848['randomInt'](_0x4d57b2)-_0x2b52b7];}}},Sprite_BattlerMotionTrail[_0x451240(0x116)][_0x451240(0x15c)]=function(_0x3bc9dc,_0x388e8d){const _0x2a42d0=_0x451240,_0x28d9ad=this[_0x2a42d0(0x1be)][_0x2a42d0(0x1a8)][_0x2a42d0(0x1c7)]();this[_0x2a42d0(0x163)]=DragonbonesManager[_0x2a42d0(0x152)](_0x28d9ad[_0x2a42d0(0x167)]),_0x3bc9dc[_0x2a42d0(0xfb)](this[_0x2a42d0(0x163)]);const _0x3f2f5a=_0x388e8d[_0x2a42d0(0x13c)][_0x2a42d0(0x18e)],_0x53fc21=_0x388e8d[_0x2a42d0(0x13c)][_0x2a42d0(0x1c9)]['currentTime'];this[_0x2a42d0(0x163)]['animation'][_0x2a42d0(0x153)](_0x3f2f5a,_0x53fc21),this[_0x2a42d0(0x163)]['x']=_0x28d9ad[_0x2a42d0(0x189)],this['_dragonbones']['y']=_0x28d9ad[_0x2a42d0(0x111)],this[_0x2a42d0(0x163)][_0x2a42d0(0x179)]['x']=_0x28d9ad[_0x2a42d0(0x120)],this[_0x2a42d0(0x163)][_0x2a42d0(0x179)]['y']=_0x28d9ad[_0x2a42d0(0x17f)],_0x3bc9dc[_0x2a42d0(0x14f)]=0x0,_0x3bc9dc['nextOpacity']=0x2,_0x3bc9dc['update']();},Sprite_BattlerMotionTrail[_0x451240(0x116)][_0x451240(0x17c)]=function(){const _0x2eec76=_0x451240,_0x2732ab=this[_0x2eec76(0x1be)],_0x4acea3=this[_0x2eec76(0x1bf)];this['_duration']=_0x4acea3['duration'],this[_0x2eec76(0x14f)]=_0x4acea3['opacityStart'],this[_0x2eec76(0x134)](this,_0x2732ab),this['_baseX']=_0x2732ab[_0x2eec76(0x16b)],this[_0x2eec76(0x166)]=_0x2732ab[_0x2eec76(0x166)],this[_0x2eec76(0x180)](_0x4acea3[_0x2eec76(0x1d8)]),this['setColorTone'](_0x4acea3[_0x2eec76(0x19d)]);},Sprite_BattlerMotionTrail['prototype'][_0x451240(0x105)]=function(){const _0x54e0e0=_0x451240;Sprite['prototype'][_0x54e0e0(0x105)]['call'](this),this['updateNextOpacities'](this[_0x54e0e0(0x119)]),this[_0x54e0e0(0x11a)]();},Sprite_BattlerMotionTrail[_0x451240(0x116)][_0x451240(0x14a)]=function(_0x3600ba){const _0x4cc4fd=_0x451240;if(!_0x3600ba)return;for(const _0x2429d3 of _0x3600ba){if(!_0x2429d3)continue;_0x2429d3[_0x4cc4fd(0x14d)]&&(_0x2429d3[_0x4cc4fd(0x14d)]--,_0x2429d3[_0x4cc4fd(0x14d)]<=0x0&&(_0x4cc4fd(0x146)!==_0x4cc4fd(0x146)?(_0x2a5811[_0x4cc4fd(0x1d6)][_0x4cc4fd(0x16f)][_0x4cc4fd(0x1c6)](this),this[_0x4cc4fd(0x186)]&&this[_0x4cc4fd(0x1c5)]&&(this[_0x4cc4fd(0x186)][_0x4cc4fd(0x179)]['x']=this['_battlerContainer'][_0x4cc4fd(0x179)]['x'],this[_0x4cc4fd(0x186)][_0x4cc4fd(0x179)]['y']=this[_0x4cc4fd(0x1c5)][_0x4cc4fd(0x179)]['y'],this[_0x4cc4fd(0x186)]['x']=this['_battlerContainer']['x'],this[_0x4cc4fd(0x186)]['y']=this[_0x4cc4fd(0x1c5)]['y'])):(_0x2429d3['opacity']=0xff,_0x2429d3['nextOpacity']=undefined))),this[_0x4cc4fd(0x14a)](_0x2429d3['children']);}},Sprite_BattlerMotionTrail[_0x451240(0x116)]['updateDuration']=function(){const _0x4dac58=_0x451240;if(this['_duration']>0x0){const _0x4f1c5d=this[_0x4dac58(0x162)];this[_0x4dac58(0x14f)]=(this['opacity']*(_0x4f1c5d-0x1)+0x0)/_0x4f1c5d,this[_0x4dac58(0x162)]--,this['_duration']<=0x0&&this[_0x4dac58(0x133)]();}},Sprite_BattlerMotionTrail[_0x451240(0x116)][_0x451240(0x133)]=function(){const _0x2335a5=_0x451240;this[_0x2335a5(0x1a6)][_0x2335a5(0x11c)](this);this[_0x2335a5(0x163)]&&(this[_0x2335a5(0x163)]['dispose'](),this[_0x2335a5(0x163)]=null);const _0x239b34=SceneManager[_0x2335a5(0x131)]['_spriteset'];if(_0x239b34&&!_0x239b34[_0x2335a5(0x10b)](this[_0x2335a5(0x1be)])){if('BNKaQ'!==_0x2335a5(0x10a)){const _0xe9d7a8=_0x239b34[_0x2335a5(0x1c5)];_0xe9d7a8[_0x2335a5(0xfb)](this[_0x2335a5(0x1be)]),_0x239b34[_0x2335a5(0x184)]();}else{if(!this['_rgbSplitImpactFilter'])return;if(this[_0x2335a5(0x181)]<=0x0)return;const _0x3d2ce5=this['_rgbSplitImpactFilter'],_0x222f52=this['_rgbSplitImpactDuration']||0x0,_0x1a2729=this[_0x2335a5(0x18f)]||_0x222f52,_0x178f6e=0x0,_0x19da5b=this[_0x2335a5(0x160)];_0x3d2ce5[_0x2335a5(0x12b)][0x0]=_0x2b959f[_0x2335a5(0x1d6)][_0x2335a5(0x15f)](_0x3d2ce5[_0x2335a5(0x12b)][0x0],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),_0x3d2ce5[_0x2335a5(0x12b)][0x1]=_0x18cb55['ActSeqImpact'][_0x2335a5(0x15f)](_0x3d2ce5[_0x2335a5(0x12b)][0x1],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),_0x3d2ce5[_0x2335a5(0xfe)][0x0]=_0x2465fe[_0x2335a5(0x1d6)][_0x2335a5(0x15f)](_0x3d2ce5[_0x2335a5(0xfe)][0x0],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),_0x3d2ce5[_0x2335a5(0xfe)][0x1]=_0x4b2599[_0x2335a5(0x1d6)][_0x2335a5(0x15f)](_0x3d2ce5[_0x2335a5(0xfe)][0x1],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),_0x3d2ce5[_0x2335a5(0x13d)][0x0]=_0x4c67ad[_0x2335a5(0x1d6)][_0x2335a5(0x15f)](_0x3d2ce5['blue'][0x0],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),_0x3d2ce5['blue'][0x1]=_0x5a59de['ActSeqImpact']['applyEasing'](_0x3d2ce5[_0x2335a5(0x13d)][0x1],_0x178f6e,_0x222f52,_0x1a2729,_0x19da5b),this[_0x2335a5(0x181)]--,this[_0x2335a5(0x181)]<=0x0&&(_0x3d2ce5['red']=[0x0,0x0],_0x3d2ce5['green']=[0x0,0x0],_0x3d2ce5[_0x2335a5(0x13d)]=[0x0,0x0]);}}},VisuMZ[_0x451240(0x1d6)]['Spriteset_Base_createBaseFilters']=Spriteset_Base[_0x451240(0x116)][_0x451240(0x129)],Spriteset_Base[_0x451240(0x116)][_0x451240(0x129)]=function(){const _0x54e99e=_0x451240;VisuMZ[_0x54e99e(0x1d6)][_0x54e99e(0x16c)][_0x54e99e(0x1c6)](this),this[_0x54e99e(0x16d)]();},VisuMZ['ActSeqImpact']['Spriteset_Base_updateBaseFilters']=Spriteset_Base[_0x451240(0x116)][_0x451240(0x188)],Spriteset_Base[_0x451240(0x116)][_0x451240(0x188)]=function(){const _0x43416c=_0x451240;VisuMZ[_0x43416c(0x1d6)][_0x43416c(0x1cc)]['call'](this),this[_0x43416c(0x150)]();},Spriteset_Base['prototype'][_0x451240(0x16d)]=function(){const _0x43bcc4=_0x451240;this['createRgbSplitImpactFilter'](),this[_0x43bcc4(0x151)]=[],this['createMotionBlurImpactFilter'](),this['createZoomBlurImpactFilter']();},Spriteset_Base[_0x451240(0x116)][_0x451240(0x150)]=function(){const _0x3b3eec=_0x451240;this[_0x3b3eec(0x1ba)](),this[_0x3b3eec(0x172)](),this[_0x3b3eec(0x1d1)](),this[_0x3b3eec(0x1d2)]();},VisuMZ[_0x451240(0x1d6)][_0x451240(0x15f)]=function(_0x574e7d,_0x2fecd4,_0x2bb776,_0x117f87,_0x2126eb){const _0x2c7edc=_0x451240,_0x4d78a0=VisuMZ[_0x2c7edc(0x1c4)]((_0x117f87-_0x2bb776)/_0x117f87,_0x2126eb||_0x2c7edc(0x123)),_0x2f31df=VisuMZ[_0x2c7edc(0x1c4)]((_0x117f87-_0x2bb776+0x1)/_0x117f87,_0x2126eb||'Linear'),_0x51ef1d=(_0x574e7d-_0x2fecd4*_0x4d78a0)/(0x1-_0x4d78a0);return _0x51ef1d+(_0x2fecd4-_0x51ef1d)*_0x2f31df;},Spriteset_Base[_0x451240(0x116)][_0x451240(0x14c)]=function(){const _0x525157=_0x451240;if(!PIXI[_0x525157(0x175)][_0x525157(0x137)])return;if(this['_rgbSplitImpactFilter'])return;this[_0x525157(0x181)]=0x0,this[_0x525157(0x18f)]=0x0,this[_0x525157(0x160)]=_0x525157(0x123),this[_0x525157(0x118)]=new PIXI[(_0x525157(0x175))]['RGBSplitFilter'](),this['_rgbSplitImpactFilter'][_0x525157(0x12b)]=[0x0,0x0],this[_0x525157(0x118)][_0x525157(0xfe)]=[0x0,0x0],this['_rgbSplitImpactFilter'][_0x525157(0x13d)]=[0x0,0x0],this['_baseSprite']['filters'][_0x525157(0x176)](this['_rgbSplitImpactFilter']);},Spriteset_Base[_0x451240(0x116)][_0x451240(0x154)]=function(_0x339064,_0x2a468f,_0x4fd637){const _0x437f25=_0x451240;if(!this['_rgbSplitImpactFilter'])return;const _0x426a71=this[_0x437f25(0x118)],_0x4e2562=_0x339064*0x2;this[_0x437f25(0x181)]=_0x2a468f,this['_rgbSplitImpactWholeDuration']=_0x2a468f,this[_0x437f25(0x160)]=_0x4fd637||_0x437f25(0x123),_0x426a71[_0x437f25(0x12b)]=[Math[_0x437f25(0x18d)](_0x4e2562)-_0x339064,Math[_0x437f25(0x18d)](_0x4e2562)-_0x339064],_0x426a71[_0x437f25(0xfe)]=[Math['randomInt'](_0x4e2562)-_0x339064,Math[_0x437f25(0x18d)](_0x4e2562)-_0x339064],_0x426a71[_0x437f25(0x13d)]=[Math[_0x437f25(0x18d)](_0x4e2562)-_0x339064,Math[_0x437f25(0x18d)](_0x4e2562)-_0x339064];},Spriteset_Base[_0x451240(0x116)][_0x451240(0x1ba)]=function(){const _0x15f6d9=_0x451240;if(!this[_0x15f6d9(0x118)])return;if(this[_0x15f6d9(0x181)]<=0x0)return;const _0x45856f=this[_0x15f6d9(0x118)],_0x4efb10=this[_0x15f6d9(0x181)]||0x0,_0x2be85d=this['_rgbSplitImpactWholeDuration']||_0x4efb10,_0x29d8f5=0x0,_0x5436ac=this[_0x15f6d9(0x160)];_0x45856f[_0x15f6d9(0x12b)][0x0]=VisuMZ[_0x15f6d9(0x1d6)]['applyEasing'](_0x45856f[_0x15f6d9(0x12b)][0x0],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),_0x45856f['red'][0x1]=VisuMZ[_0x15f6d9(0x1d6)][_0x15f6d9(0x15f)](_0x45856f['red'][0x1],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),_0x45856f[_0x15f6d9(0xfe)][0x0]=VisuMZ[_0x15f6d9(0x1d6)]['applyEasing'](_0x45856f['green'][0x0],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),_0x45856f[_0x15f6d9(0xfe)][0x1]=VisuMZ[_0x15f6d9(0x1d6)][_0x15f6d9(0x15f)](_0x45856f[_0x15f6d9(0xfe)][0x1],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),_0x45856f[_0x15f6d9(0x13d)][0x0]=VisuMZ['ActSeqImpact'][_0x15f6d9(0x15f)](_0x45856f[_0x15f6d9(0x13d)][0x0],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),_0x45856f['blue'][0x1]=VisuMZ[_0x15f6d9(0x1d6)][_0x15f6d9(0x15f)](_0x45856f['blue'][0x1],_0x29d8f5,_0x4efb10,_0x2be85d,_0x5436ac),this['_rgbSplitImpactDuration']--,this['_rgbSplitImpactDuration']<=0x0&&(_0x45856f['red']=[0x0,0x0],_0x45856f['green']=[0x0,0x0],_0x45856f['blue']=[0x0,0x0]);},Spriteset_Base[_0x451240(0x116)][_0x451240(0x1cf)]=function(_0x1e4fd7,_0x317cc4,_0x1c10ec,_0x34fa85,_0x304c12){const _0x52377e=_0x451240;if(!PIXI[_0x52377e(0x175)]['ShockwaveFilter'])return;const _0x2ad03=0x2/Math[_0x52377e(0x158)](0x2,_0x304c12),_0x469d8b=new PIXI[(_0x52377e(0x175))][(_0x52377e(0x1ab))]();_0x469d8b['center']=[_0x1e4fd7,_0x317cc4],_0x469d8b[_0x52377e(0x12d)]=_0x1c10ec,_0x469d8b[_0x52377e(0x15d)]=_0x34fa85,_0x469d8b['brightness']=0x1,_0x469d8b[_0x52377e(0x173)]=-0x1,_0x469d8b['timeSpeed']=_0x2ad03,this[_0x52377e(0x151)][_0x52377e(0x176)](_0x469d8b),this[_0x52377e(0x126)]['filters'][_0x52377e(0x176)](_0x469d8b);},Spriteset_Base[_0x451240(0x116)][_0x451240(0x172)]=function(){const _0x5e542c=_0x451240;if(!this[_0x5e542c(0x151)])return;if(this[_0x5e542c(0x151)][_0x5e542c(0x136)]<=0x0)return;for(const _0x4d7387 of this[_0x5e542c(0x151)]){if(_0x5e542c(0x104)!==_0x5e542c(0x104)){if(!_0x49ef8c[_0x5e542c(0x175)][_0x5e542c(0x13a)])return;this[_0x5e542c(0x169)]=0x0,this[_0x5e542c(0x177)]=0x0,this[_0x5e542c(0x1b0)]=_0x5e542c(0x123),this[_0x5e542c(0x147)]=new _0x19b2d7[(_0x5e542c(0x175))][(_0x5e542c(0x13a))](),this[_0x5e542c(0x147)]['velocity']['x']=0x0,this['_motionBlurImpactFilter'][_0x5e542c(0x12f)]['y']=0x0,this['_baseSprite'][_0x5e542c(0x175)][_0x5e542c(0x176)](this['_motionBlurImpactFilter']);}else{if(!_0x4d7387)continue;_0x4d7387['time']+=_0x4d7387['timeSpeed'],_0x4d7387['time']>=0x2&&(this[_0x5e542c(0x151)]['remove'](_0x4d7387),this['_baseSprite'][_0x5e542c(0x175)][_0x5e542c(0x17d)](_0x4d7387));}}},Spriteset_Base[_0x451240(0x116)][_0x451240(0x114)]=function(){const _0x5bd8d5=_0x451240;if(!PIXI['filters']['MotionBlurFilter'])return;this[_0x5bd8d5(0x169)]=0x0,this[_0x5bd8d5(0x177)]=0x0,this['_motionBlurImpactEasing']='Linear',this[_0x5bd8d5(0x147)]=new PIXI[(_0x5bd8d5(0x175))][(_0x5bd8d5(0x13a))](),this[_0x5bd8d5(0x147)][_0x5bd8d5(0x12f)]['x']=0x0,this[_0x5bd8d5(0x147)][_0x5bd8d5(0x12f)]['y']=0x0,this[_0x5bd8d5(0x126)][_0x5bd8d5(0x175)][_0x5bd8d5(0x176)](this[_0x5bd8d5(0x147)]);},Spriteset_Base[_0x451240(0x116)][_0x451240(0x155)]=function(_0x122846,_0x1727b3,_0x27519b,_0x5ecfda){const _0x481693=_0x451240;if(!this[_0x481693(0x147)])return;const _0x413b2f=this['_motionBlurImpactFilter'];this['_motionBlurImpactDuration']=_0x27519b,this['_motionBlurImpactWholeDuration']=_0x27519b,this['_motionBlurImpactEasing']=_0x5ecfda;const _0x15c236=Math[_0x481693(0x158)](this[_0x481693(0x108)],this[_0x481693(0x144)])*_0x1727b3,_0x1786c5=_0x15c236*Math[_0x481693(0x122)](_0x122846*Math['PI']/0xb4),_0x224693=-_0x15c236*Math[_0x481693(0x157)](_0x122846*Math['PI']/0xb4);_0x413b2f[_0x481693(0x12f)]['x']=_0x1786c5,_0x413b2f['velocity']['y']=_0x224693;},Spriteset_Base[_0x451240(0x116)]['updateMotionBlurImpactFilter']=function(){const _0x192850=_0x451240;if(!this['_motionBlurImpactFilter'])return;if(this[_0x192850(0x169)]<=0x0)return;const _0x564eb4=this[_0x192850(0x147)],_0x3b646f=this['_motionBlurImpactDuration']||0x0,_0x298ec8=this[_0x192850(0x177)]||_0x3b646f,_0x2ad449=0x0,_0x4b9ad8=this[_0x192850(0x1b0)];_0x564eb4[_0x192850(0x12f)]['x']=VisuMZ[_0x192850(0x1d6)][_0x192850(0x15f)](_0x564eb4[_0x192850(0x12f)]['x'],_0x2ad449,_0x3b646f,_0x298ec8,_0x4b9ad8),_0x564eb4[_0x192850(0x12f)]['y']=VisuMZ[_0x192850(0x1d6)][_0x192850(0x15f)](_0x564eb4['velocity']['y'],_0x2ad449,_0x3b646f,_0x298ec8,_0x4b9ad8),this[_0x192850(0x169)]--,this[_0x192850(0x169)]<=0x0&&(_0x564eb4[_0x192850(0x12f)]['x']=0x0,_0x564eb4[_0x192850(0x12f)]['y']=0x0);},Spriteset_Base['prototype'][_0x451240(0x143)]=function(){const _0x62b1f7=_0x451240;if(!PIXI[_0x62b1f7(0x175)][_0x62b1f7(0x1b8)])return;this[_0x62b1f7(0x165)]=0x0,this[_0x62b1f7(0x1ce)]=0x0,this[_0x62b1f7(0x1d0)]=_0x62b1f7(0x123),this[_0x62b1f7(0x1d9)]=new PIXI[(_0x62b1f7(0x175))][(_0x62b1f7(0x1b8))](),this['_zoomBlurImpactFilter'][_0x62b1f7(0x1b2)]=0x0,this[_0x62b1f7(0x1d9)][_0x62b1f7(0x182)]['x']=Graphics['width']/0x2,this[_0x62b1f7(0x1d9)][_0x62b1f7(0x182)]['y']=Graphics[_0x62b1f7(0x144)]/0x2,this[_0x62b1f7(0x1d9)][_0x62b1f7(0x11e)]=0x60,this[_0x62b1f7(0x126)][_0x62b1f7(0x175)][_0x62b1f7(0x176)](this[_0x62b1f7(0x1d9)]);},Spriteset_Base[_0x451240(0x116)][_0x451240(0x196)]=function(_0x4f44fb,_0x29c3dd,_0x35cb41,_0x27a7c1,_0x306673,_0x465653){const _0x11a1d1=_0x451240;if(!this[_0x11a1d1(0x1d9)])return;const _0x13aa47=this[_0x11a1d1(0x1d9)];this[_0x11a1d1(0x165)]=_0x306673,this[_0x11a1d1(0x1ce)]=_0x306673,this[_0x11a1d1(0x1d0)]=_0x465653,_0x13aa47[_0x11a1d1(0x1b2)]=_0x4f44fb,_0x13aa47[_0x11a1d1(0x182)]['x']=_0x29c3dd,_0x13aa47[_0x11a1d1(0x182)]['y']=_0x35cb41,_0x13aa47[_0x11a1d1(0x11e)]=_0x27a7c1;},Spriteset_Base[_0x451240(0x116)]['updateZoomBlurImpactFilter']=function(){const _0x2dc132=_0x451240;if(!this[_0x2dc132(0x1d9)])return;if(this[_0x2dc132(0x165)]<=0x0)return;const _0x39f4b9=this['_zoomBlurImpactFilter'],_0x1d0779=this['_zoomBlurImpactDuration']||0x0,_0xeced73=this[_0x2dc132(0x1ce)]||_0x1d0779,_0x3555a9=0x0,_0x331519=this[_0x2dc132(0x1d0)];_0x39f4b9[_0x2dc132(0x1b2)]=VisuMZ['ActSeqImpact']['applyEasing'](_0x39f4b9[_0x2dc132(0x1b2)],_0x3555a9,_0x1d0779,_0xeced73,_0x331519),this[_0x2dc132(0x165)]--,this[_0x2dc132(0x165)]<=0x0&&(_0x2dc132(0x13f)===_0x2dc132(0x164)?(this[_0x2dc132(0x186)]['scale']['x']=this[_0x2dc132(0x1c5)]['scale']['x'],this[_0x2dc132(0x186)][_0x2dc132(0x179)]['y']=this['_battlerContainer'][_0x2dc132(0x179)]['y'],this[_0x2dc132(0x186)]['x']=this[_0x2dc132(0x1c5)]['x'],this['_motionTrailContainer']['y']=this[_0x2dc132(0x1c5)]['y']):_0x39f4b9['strength']=0x0);},VisuMZ[_0x451240(0x1d6)][_0x451240(0x1ac)]=Spriteset_Battle[_0x451240(0x116)][_0x451240(0x115)],Spriteset_Battle['prototype'][_0x451240(0x115)]=function(){const _0x10b5b1=_0x451240;VisuMZ['ActSeqImpact'][_0x10b5b1(0x1ac)][_0x10b5b1(0x1c6)](this),this['_motionTrailContainer']=new Sprite(),this['_battleField'][_0x10b5b1(0xfb)](this[_0x10b5b1(0x186)]),this[_0x10b5b1(0x17a)]&&this[_0x10b5b1(0x1ae)][_0x10b5b1(0xfb)](this[_0x10b5b1(0x17a)]);},VisuMZ[_0x451240(0x1d6)][_0x451240(0x16f)]=Spriteset_Battle['prototype'][_0x451240(0xff)],Spriteset_Battle[_0x451240(0x116)]['adjustFlippedBattlefield']=function(){const _0x2700d5=_0x451240;VisuMZ['ActSeqImpact']['Spriteset_Battle_adjustFlippedBattlefield'][_0x2700d5(0x1c6)](this),this[_0x2700d5(0x186)]&&this[_0x2700d5(0x1c5)]&&(this['_motionTrailContainer'][_0x2700d5(0x179)]['x']=this[_0x2700d5(0x1c5)]['scale']['x'],this[_0x2700d5(0x186)][_0x2700d5(0x179)]['y']=this['_battlerContainer'][_0x2700d5(0x179)]['y'],this['_motionTrailContainer']['x']=this[_0x2700d5(0x1c5)]['x'],this[_0x2700d5(0x186)]['y']=this[_0x2700d5(0x1c5)]['y']);},VisuMZ[_0x451240(0x1d6)][_0x451240(0x10d)]=Spriteset_Battle['prototype']['updateBattlerContainer'],Spriteset_Battle[_0x451240(0x116)][_0x451240(0x184)]=function(){const _0x39d7b0=_0x451240;VisuMZ['ActSeqImpact'][_0x39d7b0(0x10d)][_0x39d7b0(0x1c6)](this),this[_0x39d7b0(0x1aa)](),this[_0x39d7b0(0x1bb)]();},Spriteset_Battle[_0x451240(0x116)]['putMotionTrailBattlersOnTop']=function(){const _0x128d19=_0x451240;for(const _0x301e40 of this['_battlerContainer'][_0x128d19(0x119)]){if(_0x128d19(0x16e)!==_0x128d19(0x16e))_0xc969f(_0x128d19(0x100)[_0x128d19(0x117)](_0x5a0b38,_0x2d9e7c)),_0x5f338d[_0x128d19(0x10f)]();else{if(!_0x301e40)continue;this['hasMotionTrailSprite'](_0x301e40)&&('irwfv'===_0x128d19(0x18a)?this[_0x128d19(0x110)]=_0x1f9f32:this[_0x128d19(0x186)]['addChild'](_0x301e40));}}},Spriteset_Battle[_0x451240(0x116)]['hasMotionTrailSprite']=function(_0x52b40a){const _0x3d5d10=_0x451240;if(!this[_0x3d5d10(0x186)])return![];return this[_0x3d5d10(0x186)][_0x3d5d10(0x119)][_0x3d5d10(0x18c)](_0x172583=>_0x172583[_0x3d5d10(0x1be)]===_0x52b40a);},Spriteset_Battle[_0x451240(0x116)]['sortMotionTrailBattlers']=function(){const _0x3e27d8=_0x451240;if(!this[_0x3e27d8(0x186)])return![];const _0x2c72da=this['_motionTrailContainer'][_0x3e27d8(0x119)]['filter'](_0x5aa22d=>_0x5aa22d[_0x3e27d8(0x185)]!==Sprite_BattlerMotionTrail);for(const _0x4ac889 of _0x2c72da){this[_0x3e27d8(0x186)][_0x3e27d8(0xfb)](_0x4ac889);}};function _0x278d(_0x3d6775,_0xc7b12){const _0x3f1d0a=_0x3f1d();return _0x278d=function(_0x278d9c,_0x388fba){_0x278d9c=_0x278d9c-0xfb;let _0x177394=_0x3f1d0a[_0x278d9c];return _0x177394;},_0x278d(_0x3d6775,_0xc7b12);}function _0x3f1d(){const _0x346aeb=['trim','velocity','updateMotionTrail','_scene','status','disposeSprite','matchSpriteProperties','performMiss','length','RGBSplitFilter','isAppeared','kTwYn','MotionBlurFilter','aWkkU','animation','blue','performEvasion','wDGwm','JSON','ARRAYEVAL','Sprite_Battler_update','createZoomBlurImpactFilter','height','Duration','hSCJv','_motionBlurImpactFilter','770GYNQIK','4556394YrfMGn','updateNextOpacities','map','createRgbSplitImpactFilter','nextOpacity','anchor','opacity','updateActSeqImpactBaseFilters','_shockwaveImpactFilters','createArmature','gotoAndStopByTime','setupRgbSplitImpactFilter','setupMotionBlurImpactFilter','Game_Battler_onDamage','sin','max','HlgUk','CriticalColorBreak','onDamage','createDragonbonesArmature','waveLength','gbguQ','applyEasing','_rgbSplitImpactEasing','mGKLW','_duration','_dragonbones','QQfYt','_zoomBlurImpactDuration','_baseY','battler','vfXcj','_motionBlurImpactDuration','performDodgeActSeqImpact','_baseX','Spriteset_Base_createBaseFilters','createActSeqImpactBaseFilters','fLGob','Spriteset_Battle_adjustFlippedBattlefield','ConvertParams','_hue','updateShockwaveImpactFilters','radius','Wave','filters','push','_motionBlurImpactWholeDuration','createActSeqImpactFilters','scale','_projectilesContainer','parse','setupMotionTrailProperties','remove','_spriteset','scaleY','setHue','_rgbSplitImpactDuration','center','version','updateBattlerContainer','constructor','_motionTrailContainer','filter','updateBaseFilters','offsetX','RAmPz','ARRAYSTRUCT','some','randomInt','lastAnimationName','_rgbSplitImpactWholeDuration','setupCriticalEffectActSeqImpact','175736SSbWjw','2LVlASM','ovVML','Game_Battler_performMiss','RNJyn','setupZoomBlurImpactFilter','LiwCK','5455998uAEsXy','_statusWindow','gXMyh','description','Sprite_Battler_createDistortionSprite','tone','createChildren','_isCreatingMotionTrailSprite','163273yGLSUT','create','STR','2320cbmDBR','VisuMZ_1_BattleCore','skew','parent','986023ADnygE','_battler','830vNABhB','putMotionTrailBattlersOnTop','ShockwaveFilter','Spriteset_Battle_createBattleFieldContainer','Xlepv','_battleField','Enable','_motionBlurImpactEasing','Amp','strength','Intensity','EasingType','OutBack','frameCount','zgLLw','ZoomBlurFilter','ARRAYJSON','updateRgbSplitImpactFilter','sortMotionTrailBattlers','GuardShockWave','setBattlerMotionTrailData','_sourceSprite','_sourceData','TJuku','DodgeMotionBlur','301WoROJo','name','ApplyEasing','_battlerContainer','call','dragonbonesData','isAlive','lastAnimationState','return\x200','ARRAYSTR','Spriteset_Base_updateBaseFilters','VisuMZ_2_DragonbonesUnion','_zoomBlurImpactWholeDuration','setupShockwaveImpactFilter','_zoomBlurImpactEasing','updateMotionBlurImpactFilter','updateZoomBlurImpactFilter','STRUCT','oCgmN','EAGHo','ActSeqImpact','isGuard','hue','_zoomBlurImpactFilter','isSceneBattle','_windowLayer','addChild','mainSpriteWidth','VisuMZ_0_CoreEngine','green','adjustFlippedBattlefield','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','match','Sprite_Damage_setupCriticalEffect','createDefaultBattlerMotionTrailData','MEaWs','update','VerYN','createDistortionSprite','width','epKtB','jSmDb','hasMotionTrailSprite','_distortionSprite','Spriteset_Battle_updateBattlerContainer','FUNC','exit','_battlerMotionTrailData','offsetY','ARRAYNUM','visible','createMotionBlurImpactFilter','createBattleFieldContainer','prototype','format','_rgbSplitImpactFilter','children','updateDuration','2179284UjmDQq','removeChild','battlerMotionTrailData','innerRadius','initialize','scaleX','angle','cos','Linear','Game_Battler_performEvasion','setupCriticalEffect','_baseSprite','Settings','isSideView','createBaseFilters','isActor','red','ARRAYFUNC','amplitude'];_0x3f1d=function(){return _0x346aeb;};return _0x3f1d();}