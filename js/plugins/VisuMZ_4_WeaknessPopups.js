//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
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
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

const _0x4282=['updateOpacity','extraPositionX','ElementNegative','isFlipped','bitmapHeight','name','result','lcJOu','bitmap','findTargetSprite','ceil','call','_createDamageContainer','isSideView','deltaSpeedX','prototype','createWeaknessPopupsForCritical','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Element90','return\x200','isDamage','version','SAolH','text','EVAL','YEVPz','initialize','createWeaknessPopups','enabled','scale','opacity','updateScaling','qzuNF','textColor','isSceneBattle','createWeaknessPopup','_data','create','_scene','#ffffff','GVDxj','bitmapWidth','constructor','_spriteset','deltaSpeedY','mYLVY','fontSize','_scaleDuration','_createWeaknessPopupContainer','VisuMZ_1_BattleCore','Element175','parameters','initPosition','description','createWeaknessPopupType','index','loadWeaknessPopupBitmap','NUM','STRUCT','destroy','MCkpr','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ZtXWf','getColor','map','adjustFlippedBattlefield','ConvertParams','randomInt','_targetScaleY','Spriteset_Battle_adjustFlippedBattlefield','createWeaknessPopupsContainer','ARRAYFUNC','iWzUL','224774ANMkre','DefaultPopupSettings','loadSystem','max','ARRAYSTRUCT','CoBsp','CkuhA','startScaleY','_baseY','ARRAYJSON','hECNd','boxWidth','Element125','803694NqrsMn','#%1','calcElementRate','Spriteset_Battle_update','Spriteset_Battle_createBattleField','startSpeedX','boxHeight','createWeaknessPopupsForElementRate','16IPXjIu','485kUABBN','extraPositionY','executeDamage','Window_BattleStatus_createDamageContainer','_battler','outlineSize','opaqueDuration','outlineColor','none','STR','targetScaleY','fontBold','157hIOOnf','tfseD','parent','ARRAYEVAL','center','getWeaknessPopupContainer','_weaknessPopupContainer','Impact','anchor','update','parse','Element25','includes','Element200','_speedX','filename','status','684456EZApaI','offsetX','startSpeedY','_opaqueDuration','ainWD','trim','createBitmapImage','rgba(1,\x201,\x201,\x201)','_weaknessPopupsContainer','height','fontItalic','wCZHY','updateWeaknessPopupsContainer','462183zgoNbd','addChild','Element95','TEXT','toUpperCase','_battleField','scaleDuration','Game_Action_executeDamage','WpPZM','_fadeDuration','initMembers','ARRAYSTR','offsetYvariance','haEGf','startScaleX','Element99','createBitmap','Element0','fontFace','isActor','_statusWindow','Element150','lXhwx','WeaknessPopups','drawText','_damageContainer','updatePosition','_speedY','Element75','tKBTE','_baseX','createBattleField','849758nGIAaK','getWeaknessPopupData','53287jVuTfM','format','exit','Settings','match','width','BattleCore'];const _0x44fdb3=_0x4c2c;(function(_0x2e386d,_0xe8b01f){const _0x2cec93=_0x4c2c;while(!![]){try{const _0x4c08a9=parseInt(_0x2cec93(0xce))*parseInt(_0x2cec93(0x11b))+parseInt(_0x2cec93(0xec))+parseInt(_0x2cec93(0xb9))+-parseInt(_0x2cec93(0xdb))*parseInt(_0x2cec93(0xcf))+-parseInt(_0x2cec93(0x119))+parseInt(_0x2cec93(0xf9))+-parseInt(_0x2cec93(0xc6));if(_0x4c08a9===_0xe8b01f)break;else _0x2e386d['push'](_0x2e386d['shift']());}catch(_0x29e4b4){_0x2e386d['push'](_0x2e386d['shift']());}}}(_0x4282,0x78b48));var label='WeaknessPopups',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2f02fb){const _0x3e08bd=_0x4c2c;return _0x2f02fb[_0x3e08bd(0xeb)]&&_0x2f02fb[_0x3e08bd(0xa5)][_0x3e08bd(0xe7)]('['+label+']');})[0x0];function _0x4c2c(_0x457730,_0x3291f2){_0x457730=_0x457730-0x6a;let _0x4282e4=_0x4282[_0x457730];return _0x4282e4;}VisuMZ[label][_0x44fdb3(0x6c)]=VisuMZ[label][_0x44fdb3(0x6c)]||{},VisuMZ[_0x44fdb3(0xb2)]=function(_0x2b8ebb,_0x3dac23){const _0x320ef0=_0x44fdb3;for(const _0xf4ba0a in _0x3dac23){if(_0x320ef0(0xf0)!=='ainWD'){function _0xfe6a58(){const _0x30d57d=_0x320ef0;this['x']+=this[_0x30d57d(0xe9)],this['y']+=this[_0x30d57d(0x114)],this[_0x30d57d(0xe9)]+=this['_data'][_0x30d57d(0x7e)],this[_0x30d57d(0x114)]+=this[_0x30d57d(0x94)][_0x30d57d(0x9c)];}}else{if(_0xf4ba0a[_0x320ef0(0x6d)](/(.*):(.*)/i)){const _0x5202b2=String(RegExp['$1']),_0xe08b3e=String(RegExp['$2'])[_0x320ef0(0xfd)]()[_0x320ef0(0xf1)]();let _0x4263dc,_0x2d7d10,_0x297a8;switch(_0xe08b3e){case _0x320ef0(0xa9):_0x4263dc=_0x3dac23[_0xf4ba0a]!==''?Number(_0x3dac23[_0xf4ba0a]):0x0;break;case'ARRAYNUM':_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10[_0x320ef0(0xb0)](_0x404e6c=>Number(_0x404e6c));break;case _0x320ef0(0x88):_0x4263dc=_0x3dac23[_0xf4ba0a]!==''?eval(_0x3dac23[_0xf4ba0a]):null;break;case _0x320ef0(0xde):_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10['map'](_0x5e2366=>eval(_0x5e2366));break;case'JSON':_0x4263dc=_0x3dac23[_0xf4ba0a]!==''?JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a]):'';break;case _0x320ef0(0xc2):_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON['parse'](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10['map'](_0x5291a8=>JSON[_0x320ef0(0xe5)](_0x5291a8));break;case'FUNC':_0x4263dc=_0x3dac23[_0xf4ba0a]!==''?new Function(JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a])):new Function(_0x320ef0(0x83));break;case _0x320ef0(0xb7):_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10[_0x320ef0(0xb0)](_0x68af3b=>new Function(JSON[_0x320ef0(0xe5)](_0x68af3b)));break;case _0x320ef0(0xd8):_0x4263dc=_0x3dac23[_0xf4ba0a]!==''?String(_0x3dac23[_0xf4ba0a]):'';break;case _0x320ef0(0x104):_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON[_0x320ef0(0xe5)](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10['map'](_0x43b7d4=>String(_0x43b7d4));break;case _0x320ef0(0xaa):_0x297a8=_0x3dac23[_0xf4ba0a]!==''?JSON['parse'](_0x3dac23[_0xf4ba0a]):{},_0x4263dc=VisuMZ['ConvertParams']({},_0x297a8);break;case _0x320ef0(0xbd):_0x2d7d10=_0x3dac23[_0xf4ba0a]!==''?JSON['parse'](_0x3dac23[_0xf4ba0a]):[],_0x4263dc=_0x2d7d10[_0x320ef0(0xb0)](_0x1ea548=>VisuMZ[_0x320ef0(0xb2)]({},JSON[_0x320ef0(0xe5)](_0x1ea548)));break;default:continue;}_0x2b8ebb[_0x5202b2]=_0x4263dc;}}}return _0x2b8ebb;},(_0x20f5f9=>{const _0x377fd7=_0x44fdb3,_0xca88b6=_0x20f5f9[_0x377fd7(0x75)];for(const _0x2eab7f of dependencies){if(!Imported[_0x2eab7f]){if(_0x377fd7(0xf7)==='yTosK'){function _0x4dfdbb(){const _0x50ffc0=_0x377fd7;this[_0x50ffc0(0x94)][_0x50ffc0(0xea)]?this['loadWeaknessPopupBitmap']():this[_0x50ffc0(0xf2)]();}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x377fd7(0x6a)](_0xca88b6,_0x2eab7f)),SceneManager[_0x377fd7(0x6b)]();break;}}}const _0x1ed3c5=_0x20f5f9[_0x377fd7(0xa5)];if(_0x1ed3c5['match'](/\[Version[ ](.*?)\]/i)){const _0x2e50f0=Number(RegExp['$1']);_0x2e50f0!==VisuMZ[label][_0x377fd7(0x85)]&&(alert(_0x377fd7(0xad)['format'](_0xca88b6,_0x2e50f0)),SceneManager[_0x377fd7(0x6b)]());}if(_0x1ed3c5[_0x377fd7(0x6d)](/\[Tier[ ](\d+)\]/i)){const _0x3c0f87=Number(RegExp['$1']);_0x3c0f87<tier?(alert(_0x377fd7(0x81)[_0x377fd7(0x6a)](_0xca88b6,_0x3c0f87,tier)),SceneManager['exit']()):tier=Math[_0x377fd7(0xbc)](_0x3c0f87,tier);}VisuMZ[_0x377fd7(0xb2)](VisuMZ[label][_0x377fd7(0x6c)],_0x20f5f9[_0x377fd7(0xa3)]);})(pluginData),ColorManager[_0x44fdb3(0xaf)]=function(_0x20bcf5){const _0xf941a=_0x44fdb3;_0x20bcf5=String(_0x20bcf5);if(_0x20bcf5[_0xf941a(0x6d)](/#(.*)/i))return _0xf941a(0xc7)[_0xf941a(0x6a)](String(RegExp['$1']));else{if(_0xf941a(0xb8)===_0xf941a(0xb8))return this[_0xf941a(0x91)](Number(_0x20bcf5));else{function _0x3051ac(){const _0x5632e9=_0xf941a;this[_0x5632e9(0xb6)]();}}}},SceneManager[_0x44fdb3(0x92)]=function(){const _0x2c171f=_0x44fdb3;return this['_scene']&&this[_0x2c171f(0x96)][_0x2c171f(0x9a)]===Scene_Battle;},VisuMZ[_0x44fdb3(0x110)][_0x44fdb3(0x100)]=Game_Action[_0x44fdb3(0x7f)][_0x44fdb3(0xd1)],Game_Action[_0x44fdb3(0x7f)]['executeDamage']=function(_0xa71581,_0x3084bd){const _0x28971d=_0x44fdb3;VisuMZ[_0x28971d(0x110)][_0x28971d(0x100)]['call'](this,_0xa71581,_0x3084bd),this[_0x28971d(0x8b)](_0xa71581,_0x3084bd);},Game_Action[_0x44fdb3(0x7f)][_0x44fdb3(0x8b)]=function(_0x440b5f,_0x225d31){const _0x3a39bd=_0x44fdb3;if(!SceneManager[_0x3a39bd(0x92)]())return;if(!this[_0x3a39bd(0x84)]())return;this[_0x3a39bd(0x80)](_0x440b5f,_0x225d31),this[_0x3a39bd(0xcd)](_0x440b5f,_0x225d31);},Game_Action[_0x44fdb3(0x7f)][_0x44fdb3(0x80)]=function(_0x43bbc1,_0x18b644){const _0x27096d=_0x44fdb3,_0x16986c=_0x43bbc1[_0x27096d(0x76)]();if(!_0x16986c['critical'])return;const _0x4019fd=SceneManager[_0x27096d(0x96)][_0x27096d(0x9b)];if(!_0x4019fd)return;_0x4019fd[_0x27096d(0xa6)](_0x43bbc1,'Critical');},Game_Action[_0x44fdb3(0x7f)][_0x44fdb3(0xcd)]=function(_0x25c509,_0x393dba){const _0x4b3ea2=_0x44fdb3,_0x939c65=SceneManager[_0x4b3ea2(0x96)][_0x4b3ea2(0x9b)];if(!_0x939c65)return;const _0x262ab7=this[_0x4b3ea2(0xc8)](_0x25c509);let _0x3010d7=_0x4b3ea2(0xd7);if(_0x262ab7===0x0)_0x3010d7=_0x4b3ea2(0x10a);else{if(_0x262ab7<0x0){if(_0x4b3ea2(0xae)!==_0x4b3ea2(0xdc))_0x3010d7=_0x4b3ea2(0x72);else{function _0x17a86f(){const _0x763389=_0x4b3ea2;this[_0x763389(0xd3)]=_0x431b1a,this[_0x763389(0x94)]=_0x155be0,this[_0x763389(0x103)](),_0x1dbe2e[_0x763389(0x7f)][_0x763389(0x8a)][_0x763389(0x7b)](this),this[_0x763389(0x109)](),this[_0x763389(0xa4)]();}}}else{if(_0x262ab7>=0x2)_0x3010d7='Element200';else{if(_0x262ab7>=1.75){if(_0x4b3ea2(0x86)!==_0x4b3ea2(0xbe))_0x3010d7=_0x4b3ea2(0xa2);else{function _0x54218c(){const _0x5164cf=_0x4b3ea2;return _0x2fd496[_0x5164cf(0x96)]['_statusWindow'][_0x5164cf(0xe1)];}}}else{if(_0x262ab7>=1.5)_0x3010d7=_0x4b3ea2(0x10e);else{if(_0x262ab7>=1.25)_0x3010d7=_0x4b3ea2(0xc5);else{if(_0x262ab7>=1.1)_0x3010d7='Element110';else{if(_0x262ab7>=1.05){if('uNPYv'===_0x4b3ea2(0x90)){function _0x3820d5(){const _0x5bacbe=_0x4b3ea2;_0x57a165=_0x5bacbe(0x10e);}}else _0x3010d7='Element105';}else{if(_0x262ab7>=1.01){if(_0x4b3ea2(0x101)!==_0x4b3ea2(0x101)){function _0x5b1d65(){const _0x154642=_0x4b3ea2;_0x214329=_0x154642(0xe8);}}else _0x3010d7='Element101';}else{if(_0x262ab7<=0.25)_0x3010d7=_0x4b3ea2(0xe6);else{if(_0x262ab7<=0.5){if(_0x4b3ea2(0x89)===_0x4b3ea2(0x89))_0x3010d7=_0x4b3ea2(0x115);else{function _0xe0598f(){const _0x442a87=_0x4b3ea2;if(!_0x7af6c3['isSceneBattle']())return;if(!this[_0x442a87(0x84)]())return;this[_0x442a87(0x80)](_0x42f9e0,_0x3ec8b6),this['createWeaknessPopupsForElementRate'](_0x107e3b,_0x599987);}}}else{if(_0x262ab7<=0.75)_0x3010d7=_0x4b3ea2(0x82);else{if(_0x262ab7<=0.9){if(_0x4b3ea2(0x9d)!=='mYLVY'){function _0x1b3686(){const _0x45b79e=_0x4b3ea2;if(!_0x2d6191)return;if(!this[_0x45b79e(0xf4)])return;const _0x1e479d=this[_0x45b79e(0x11a)](_0x3e0a1f);if(!_0x1e479d)return;if(!_0x1e479d[_0x45b79e(0x8c)])return;this[_0x45b79e(0x93)](_0xe74965,_0x1e479d);}}else _0x3010d7=_0x4b3ea2(0xfb);}else{if(_0x262ab7<=0.99){if(_0x4b3ea2(0xbf)===_0x4b3ea2(0x116)){function _0x38f5c3(){_0x10cdb5='Element110';}}else _0x3010d7=_0x4b3ea2(0x108);}}}}}}}}}}}}}}_0x939c65[_0x4b3ea2(0xa6)](_0x25c509,_0x3010d7);};function Sprite_WeaknessPopup(){const _0x232806=_0x44fdb3;this[_0x232806(0x8a)](...arguments);}Sprite_WeaknessPopup[_0x44fdb3(0x7f)]=Object[_0x44fdb3(0x95)](Sprite[_0x44fdb3(0x7f)]),Sprite_WeaknessPopup[_0x44fdb3(0x7f)]['constructor']=Sprite_WeaknessPopup,Sprite_WeaknessPopup[_0x44fdb3(0x7f)]['initialize']=function(_0x378284,_0x57e519){const _0x4f44dc=_0x44fdb3;this[_0x4f44dc(0xd3)]=_0x378284,this['_data']=_0x57e519,this[_0x4f44dc(0x103)](),Sprite[_0x4f44dc(0x7f)][_0x4f44dc(0x8a)]['call'](this),this[_0x4f44dc(0x109)](),this[_0x4f44dc(0xa4)]();},Sprite_WeaknessPopup[_0x44fdb3(0x7f)][_0x44fdb3(0x109)]=function(){const _0xb337b2=_0x44fdb3;this['_data'][_0xb337b2(0xea)]?this[_0xb337b2(0xa8)]():this[_0xb337b2(0xf2)]();},Sprite_WeaknessPopup[_0x44fdb3(0x7f)]['loadWeaknessPopupBitmap']=function(){const _0xd7d80c=_0x44fdb3;this[_0xd7d80c(0x78)]=ImageManager[_0xd7d80c(0xbb)](this[_0xd7d80c(0x94)][_0xd7d80c(0xea)]);},Sprite_WeaknessPopup[_0x44fdb3(0x7f)]['createBitmapImage']=function(){const _0x4b51d3=_0x44fdb3;this['bitmap']=new Bitmap(this[_0x4b51d3(0x94)][_0x4b51d3(0x99)],this[_0x4b51d3(0x94)][_0x4b51d3(0x74)]),this[_0x4b51d3(0x78)][_0x4b51d3(0x10b)]=this[_0x4b51d3(0x94)][_0x4b51d3(0x10b)],this['bitmap'][_0x4b51d3(0x9e)]=this['_data'][_0x4b51d3(0x9e)],this[_0x4b51d3(0x78)]['fontBold']=this[_0x4b51d3(0x94)][_0x4b51d3(0xda)],this[_0x4b51d3(0x78)][_0x4b51d3(0xf6)]=this[_0x4b51d3(0x94)]['fontItalic'],this[_0x4b51d3(0x78)][_0x4b51d3(0x91)]=ColorManager[_0x4b51d3(0xaf)](this[_0x4b51d3(0x94)][_0x4b51d3(0x91)]),this[_0x4b51d3(0x78)][_0x4b51d3(0xd4)]=this[_0x4b51d3(0x94)]['outlineSize'],this['bitmap'][_0x4b51d3(0xd6)]=this[_0x4b51d3(0x94)]['outlineColor'],this[_0x4b51d3(0x78)][_0x4b51d3(0x111)](this[_0x4b51d3(0x94)][_0x4b51d3(0x87)],0x0,0x0,this[_0x4b51d3(0x78)]['width'],this[_0x4b51d3(0x78)][_0x4b51d3(0xf5)],_0x4b51d3(0xdf));},Sprite_WeaknessPopup['prototype']['initMembers']=function(){const _0x450458=_0x44fdb3;this[_0x450458(0xe9)]=this['_data'][_0x450458(0xcb)],this[_0x450458(0x114)]=this[_0x450458(0x94)][_0x450458(0xee)],this['_opaqueDuration']=this[_0x450458(0x94)][_0x450458(0xd5)],this[_0x450458(0x102)]=this[_0x450458(0x94)]['fadeDuration'],this[_0x450458(0x9f)]=this[_0x450458(0x94)][_0x450458(0xff)];},Sprite_WeaknessPopup[_0x44fdb3(0x7f)]['initPosition']=function(){const _0x4632aa=_0x44fdb3,_0x2dad43=SceneManager[_0x4632aa(0x96)]['_statusWindow'];!$gameSystem['isSideView']()&&this[_0x4632aa(0xd3)][_0x4632aa(0xd3)][_0x4632aa(0x10c)]()&&(Imported[_0x4632aa(0xa1)]&&_0x2dad43['centerFrontViewSprite'](this[_0x4632aa(0xd3)][_0x4632aa(0xd3)][_0x4632aa(0xa7)]()));this['x']=this['_battler'][_0x4632aa(0x117)]??this[_0x4632aa(0xd3)]['x'],this['x']+=this[_0x4632aa(0x94)][_0x4632aa(0xed)],this['y']=this[_0x4632aa(0xd3)][_0x4632aa(0xc1)]??this[_0x4632aa(0xd3)]['y'],this['y']-=this[_0x4632aa(0xd3)][_0x4632aa(0xf5)]*this[_0x4632aa(0xd3)][_0x4632aa(0x8d)]['y'],this['y']+=this[_0x4632aa(0x94)]['offsetY'];if(Imported['VisuMZ_1_BattleCore']&&VisuMZ[_0x4632aa(0x6f)]['version']>=1.38){if(_0x4632aa(0x98)==='GVDxj'){this['x']+=this['_battler'][_0x4632aa(0x71)]();const _0x5d4f98=this[_0x4632aa(0xd3)]['_distortionSprite'][_0x4632aa(0x8d)]['y'];this['y']+=this[_0x4632aa(0xd3)][_0x4632aa(0xd0)]();}else{function _0x34be19(){const _0x5c36ba=_0x4632aa;this[_0x5c36ba(0xf2)]();}}}const _0x4e4fbf=this[_0x4632aa(0x94)]['offsetXvariance']||0x0,_0x30abb8=this['_data'][_0x4632aa(0x105)]||0x0;this['x']+=Math[_0x4632aa(0xb3)](_0x4e4fbf*0x2)-_0x4e4fbf,this['y']+=Math['randomInt'](_0x30abb8*0x2)-_0x30abb8,this['anchor']['x']=0.5,this[_0x4632aa(0xe3)]['y']=0.5,this[_0x4632aa(0x8d)]['x']=this['_data'][_0x4632aa(0x107)],this[_0x4632aa(0x8d)]['y']=this[_0x4632aa(0x94)][_0x4632aa(0xc0)],this['_targetScaleX']=this[_0x4632aa(0x94)]['targetScaleX'],this[_0x4632aa(0xb4)]=this['_data'][_0x4632aa(0xd9)];},Sprite_WeaknessPopup[_0x44fdb3(0x7f)][_0x44fdb3(0xe4)]=function(){const _0x288d2e=_0x44fdb3;Sprite[_0x288d2e(0x7f)][_0x288d2e(0xe4)]['call'](this),this['updatePosition'](),this[_0x288d2e(0x8f)](),this[_0x288d2e(0x70)]();},Sprite_WeaknessPopup[_0x44fdb3(0x7f)][_0x44fdb3(0x113)]=function(){const _0xb21f0d=_0x44fdb3;this['x']+=this['_speedX'],this['y']+=this[_0xb21f0d(0x114)],this[_0xb21f0d(0xe9)]+=this[_0xb21f0d(0x94)][_0xb21f0d(0x7e)],this['_speedY']+=this['_data'][_0xb21f0d(0x9c)];},Sprite_WeaknessPopup[_0x44fdb3(0x7f)][_0x44fdb3(0x8f)]=function(){const _0x8b8184=_0x44fdb3;if(this[_0x8b8184(0x9f)]>0x0){if(_0x8b8184(0x106)===_0x8b8184(0x106)){const _0x321391=this[_0x8b8184(0x9f)];this['scale']['x']=(this[_0x8b8184(0x8d)]['x']*(_0x321391-0x1)+this['_targetScaleX'])/_0x321391,this[_0x8b8184(0x8d)]['y']=(this['scale']['y']*(_0x321391-0x1)+this[_0x8b8184(0xb4)])/_0x321391,this[_0x8b8184(0x9f)]--;}else{function _0x3803a0(){const _0x28efd1=_0x8b8184;return this[_0x28efd1(0xf4)];}}}else this[_0x8b8184(0x8d)]['x']=0x1,this[_0x8b8184(0x8d)]['y']=0x1;},Sprite_WeaknessPopup[_0x44fdb3(0x7f)][_0x44fdb3(0x70)]=function(){const _0x5c3067=_0x44fdb3;if(this[_0x5c3067(0xef)]-->0x0)return;if(this[_0x5c3067(0x102)]>0x0){const _0x754aed=this[_0x5c3067(0x102)];this[_0x5c3067(0x8e)]=(this[_0x5c3067(0x8e)]*(_0x754aed-0x1)+0x0)/_0x754aed,this[_0x5c3067(0x102)]--;}else{if(_0x5c3067(0x77)!=='lcJOu'){function _0x499cd2(){const _0x40cb00=_0x5c3067;return!_0x354d6b['isSideView']()&&_0x2d1b8c[_0x40cb00(0xd3)][_0x40cb00(0x10c)]()?_0x4f367e[_0x40cb00(0x96)][_0x40cb00(0x10d)][_0x40cb00(0xe1)]:this[_0x40cb00(0xf4)];}}else{const _0x52b05c=this[_0x5c3067(0xdd)];_0x52b05c&&(_0x52b05c['removeChild'](this),this[_0x5c3067(0xab)]());}}},VisuMZ['WeaknessPopups'][_0x44fdb3(0xca)]=Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0x118)],Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0x118)]=function(){const _0x1747af=_0x44fdb3;VisuMZ[_0x1747af(0x110)]['Spriteset_Battle_createBattleField'][_0x1747af(0x7b)](this),this['createWeaknessPopupsContainer']();},Spriteset_Battle['prototype'][_0x44fdb3(0xb6)]=function(){const _0x4642a5=_0x44fdb3;if(this[_0x4642a5(0xf4)])return;this[_0x4642a5(0xf4)]=new Sprite(),this['_weaknessPopupsContainer']['x']=this[_0x4642a5(0xfe)]['x'],this['_weaknessPopupsContainer']['y']=this[_0x4642a5(0xfe)]['y'];const _0x3bf9f8=Math[_0x4642a5(0x7a)]((Graphics[_0x4642a5(0x6e)]-Graphics[_0x4642a5(0xc4)])/0x2),_0x3f3d82=Math[_0x4642a5(0x7a)]((Graphics[_0x4642a5(0xf5)]-Graphics['boxHeight'])/0x2);this[_0x4642a5(0xf4)]['x']+=_0x3bf9f8,this[_0x4642a5(0xf4)]['y']+=_0x3f3d82,this[_0x4642a5(0xfa)](this[_0x4642a5(0xf4)]);},VisuMZ['WeaknessPopups'][_0x44fdb3(0xb5)]=Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0xb1)],Spriteset_Battle['prototype'][_0x44fdb3(0xb1)]=function(){const _0x5226dc=_0x44fdb3;VisuMZ[_0x5226dc(0x110)][_0x5226dc(0xb5)][_0x5226dc(0x7b)](this);!this[_0x5226dc(0xf4)]&&this[_0x5226dc(0xb6)]();if(!this[_0x5226dc(0x73)]())return;this['_weaknessPopupsContainer'][_0x5226dc(0x8d)]['x']=-0x1,this['_weaknessPopupsContainer']['x']=this[_0x5226dc(0xfe)]['x']+this[_0x5226dc(0xfe)][_0x5226dc(0x6e)];},VisuMZ[_0x44fdb3(0x110)][_0x44fdb3(0xc9)]=Spriteset_Battle['prototype'][_0x44fdb3(0xe4)],Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0xe4)]=function(){const _0x59cf52=_0x44fdb3;VisuMZ[_0x59cf52(0x110)][_0x59cf52(0xc9)]['call'](this),this[_0x59cf52(0xf8)]();},Spriteset_Battle['prototype'][_0x44fdb3(0xf8)]=function(){const _0x59edc2=_0x44fdb3;if(!this[_0x59edc2(0xf4)])return;if(!this[_0x59edc2(0x112)])return;this[_0x59edc2(0xf4)]['x']=this[_0x59edc2(0x112)]['x'],this[_0x59edc2(0xf4)]['y']=this[_0x59edc2(0x112)]['y'];if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x35b3ba=Math['ceil']((Graphics[_0x59edc2(0x6e)]-Graphics['boxWidth'])/0x2),_0x4487d3=Math[_0x59edc2(0x7a)]((Graphics[_0x59edc2(0xf5)]-Graphics[_0x59edc2(0xcc)])/0x2);this[_0x59edc2(0xf4)]['x']+=_0x35b3ba,this[_0x59edc2(0xf4)]['y']+=_0x4487d3;},Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0xa6)]=function(_0x3048f0,_0x3ca58b){const _0x300ea8=_0x44fdb3;if(!_0x3048f0)return;if(!this[_0x300ea8(0xf4)])return;const _0x24ceef=this[_0x300ea8(0x11a)](_0x3ca58b);if(!_0x24ceef)return;if(!_0x24ceef[_0x300ea8(0x8c)])return;this[_0x300ea8(0x93)](_0x3048f0,_0x24ceef);},VisuMZ['WeaknessPopups'][_0x44fdb3(0xba)]=function(){const _0x53a215=_0x44fdb3;return{'enabled':!![],'filename':'','text':_0x53a215(0xfc),'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x53a215(0xe2),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0x53a215(0x97),'outlineSize':0x5,'outlineColor':_0x53a215(0xf3),'offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle['prototype'][_0x44fdb3(0x11a)]=function(_0x356562){const _0x57631c=_0x44fdb3,_0x99a9ca=VisuMZ[_0x57631c(0x110)][_0x57631c(0x6c)];if(!_0x99a9ca)return null;return _0x99a9ca[_0x356562];},Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0x93)]=function(_0x25e430,_0x5e1318){const _0x2fc36c=_0x44fdb3;if(!_0x25e430)return;if(!_0x5e1318)return;if(!_0x5e1318['enabled'])return;if(!this['_weaknessPopupsContainer'])return;if(!Imported[_0x2fc36c(0xa1)]&&_0x25e430[_0x2fc36c(0x10c)]()&&!$gameSystem[_0x2fc36c(0x7d)]()){if(_0x2fc36c(0xc3)!=='hECNd'){function _0x2f8115(){const _0x27bbe0=_0x2fc36c,_0x1e225d=this['_fadeDuration'];this[_0x27bbe0(0x8e)]=(this[_0x27bbe0(0x8e)]*(_0x1e225d-0x1)+0x0)/_0x1e225d,this['_fadeDuration']--;}}else return;}const _0x5c6f7d=this[_0x2fc36c(0x79)](_0x25e430);if(!_0x5c6f7d)return;const _0x43402b=new Sprite_WeaknessPopup(_0x5c6f7d,_0x5e1318),_0x3f2c36=this['getWeaknessPopupContainer'](_0x5c6f7d);_0x3f2c36['addChild'](_0x43402b);},Spriteset_Battle[_0x44fdb3(0x7f)][_0x44fdb3(0xe0)]=function(_0xd0a217){const _0xcb1b61=_0x44fdb3;if(!$gameSystem[_0xcb1b61(0x7d)]()&&_0xd0a217[_0xcb1b61(0xd3)]['isActor']()){if(_0xcb1b61(0x10f)===_0xcb1b61(0x10f))return SceneManager['_scene'][_0xcb1b61(0x10d)]['_weaknessPopupContainer'];else{function _0x71df69(){_0x1e6c36='Element99';}}}else{if('ikGda'===_0xcb1b61(0xac)){function _0x1b987e(){_0x540ab4='Element0';}}else return this[_0xcb1b61(0xf4)];}},VisuMZ['WeaknessPopups'][_0x44fdb3(0xd2)]=Window_BattleStatus[_0x44fdb3(0x7f)][_0x44fdb3(0x7c)],Window_BattleStatus[_0x44fdb3(0x7f)][_0x44fdb3(0x7c)]=function(){const _0x5e67cf=_0x44fdb3;this['_createWeaknessPopupContainer'](),VisuMZ['WeaknessPopups'][_0x5e67cf(0xd2)]['call'](this);},Window_BattleStatus[_0x44fdb3(0x7f)][_0x44fdb3(0xa0)]=function(){const _0x3479e4=_0x44fdb3;this[_0x3479e4(0xe1)]=new Sprite(),this['addChild'](this['_weaknessPopupContainer']);};