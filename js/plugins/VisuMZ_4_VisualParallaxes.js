//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
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
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Does not alter the map editor's parallax.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the parallax?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Parallax: Remove
 * - Removes target parallax(es).
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.02: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.01: May 28, 2021
 * * Feature Update!
 * ** Fail safe added for those without Pixi JS Filters added.
 * ** Removed the VisuStella MZ Core Engine requirement.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax.
 * Does not alter the map editor's parallax.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
 * @default ["1"]
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the parallax?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

const _0x3375=['updateTone','updateVisualParallaxSettings','settings','getWaterReflectionWavelength','_parallaxLoopX','DPHrI','Game_Event_setupPageSettings','OpacityFlat','loEUl','getWaterReflectionBoundary','prototype','parse','Game_Map_scrollUp','updateHue','JSON','Argument\x20must\x20be\x20an\x20array','setHue','37718qqRUnF','gndSU','Spriteset_Map_update','NUM','KrVwm','scrollDown','map','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setupVisualParallaxesNotetags','parameters','createSolidReflectionLayer','wasolidter','HorzLoop','reverseData','wCuiU','loadBitmap','height','followers','ujfyJ','_parallaxLoopY','_parallaxName','End','NORMAL','#ffffff','CTukW','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','DEFAULT_WATER_REFLECTION_FILTER_TOP','checkVisualParallaxesStringTags','scale','jqXPo','STR','Game_Map_updateParallax','Regions','_colorTone','_blurFilter','WaterOpacityFlat','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','removeVisualParallax','getWaterReflectionBlur','lBEmN','Qjnny','ParallaxRemove','createMaskSprite','vehicles','createCharacters','_parallaxSx','call','registerCommand','abDdA','removeVisualParallaxLayer','sortVisualParallaxes','move','1069681NvUBwZ','maskTerrainTags','filter','filters','Boundary','LuVfh','DEFAULT_WATER_REFLECTION_FILTER_BLUR','VertLoop','findTargetVisualParallax','WaterOpacityRate','getSolidReflectionRegions','terrainTag','_mask','displayX','cxZzy','getWaterReflectionRegions','addChild','setupVisualParallaxesCommentTags','page','makeDeepCopy','_updateColorFilter','CfhFo','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','RHpXN','ReflectionFilter','note','TGTsP','version','match','updateMask','charAt','67skptLE','floor','alpXm','rwupV','updateSolidReflections','getWaterReflectionTerrainTags','_hue','qUFoS','DEFAULT_WATER_REFLECTION_TERRAINTAGS','nvHyv','displayY','TemplateSettings','oUfaQ','HueShift','constructor','destroy','NTxda','FFuxP','Game_Event_clearPageSettings','_scene','update','name','_reflectFilter','clearPageSettings','regionId','targetOpacity','WaterTerrainTags','WaterTop','dVNwz','loadParallax','getVisualParallaxSettings','clone','GXFyL','length','screenTileX','hJncn','aNVwn','setColorTone','KemLG','_displayY','updateParallax','_parallaxDataRef','createMaskBitmap','DEFAULT_WATER_REFLECTION_REGIONS','WaterBlur','setupPageSettings','_parallaxContainer','WaterAmplitude','meHfx','includes','Settings','WaveStart','opacityDuration','createNewParallaxLayer','blendMode','isInstanceOfSceneMap','313277NoGWvk','round','KNwYR','ParallaxFadeOpacity','SolidTerrainTags','Game_Map_scrollLeft','description','type','ARRAYEVAL','getSolidReflectionTerrainTags','Blur','Filename','hueShift','setupVisualParallaxesEffects','fVfKX','143GmZLBY','qtwub','1gmbOov','OXBfe','GomBX','split','OpacityRate','getWaterReflectionOpacity','exit','Top','_createColorFilter','list','_visualParallaxSettings','Spriteset_Map_createCharacters','RegExp','remove','_baseSprite','Optional','SolidOpacityFlat','ixfPv','getVisualParallaxes','266207ofLVSp','Opacity','WaveEnd','opacity','Game_Event_refresh','BlurFilter','NoReflection','max','Hue','rakXA','scrollRight','trim','yocuX','himwH','KwgBo','getWaterReflectionTop','WaterReflect','return\x200','ARRAYFUNC','atovq','MQoes','createCharacterReflections','TerrainTags','_parallaxY','refresh','_parallaxX','format','updateOrigin','DJujX','wJarh','DEFAULT_SOLID_REFLECTION_FILTER_TOP','YZzCL','Game_Map_setup','Spriteset_Map_createParallax','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','Game_Map_setDisplayPos','getSolidReflectionBlur','PDrUu','MaskRegions','screenTileY','events','equals','_solidReflectLayer','initVisualParallaxesEffects','GKAUx','mask','_reflection','createWaterReflectionLayer','Start','isLoopVertical','time','_waterReflectLayer','lLCDx','tileHeight','_id','origin','QxGMA','_noReflection','MULTIPLY','scrollLeft','updateOpacity','ARRAYNUM','Game_Map_scrollRight','GTuPh','SolidRegions','code','_colorFilter','_parallaxZero','bind','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','toUpperCase','event','createSolidReflectionMask','JdETk','isEventTest','indexOf','423941HUbGTR','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','nPYNj','ConvertParams','createWaterReflectionMask','WaterBottom','hue','ldeOs','cyfGC','ScrollLock','bitmap','dZTEX','AmpStart','clamp','>>>ATTENTION<<<','290719CKzbjN','setup','addChangeVisualParallax','width','push','zmkBh','iWrUK','fillRect','setDisplayPos','VisualParallaxes','filename','scrollUp','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','initialize','tileWidth','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','create','children','getVisualParallaxOy','noReflections','maskRegions','water','CreateLayerData','SolidOpacityRate','getWaterReflectionAmplitude','lberW','_maskSprite','getVisualParallaxOx','createParallaxLayers','MaskTerrainTags','colorTone','_displayX','_parallaxSy','setupVisualParallaxes','createReflectionMask','addLoadListener','isLoopHorizontal','SolidReflect','getSolidReflectionOpacity','updateBlendMode'];const _0x4572d1=_0x24ab;(function(_0x2d5870,_0x3803aa){const _0x3609e0=_0x24ab;while(!![]){try{const _0x3835a6=parseInt(_0x3609e0(0x193))+-parseInt(_0x3609e0(0x17e))*parseInt(_0x3609e0(0x137))+parseInt(_0x3609e0(0xe4))+parseInt(_0x3609e0(0x9c))+parseInt(_0x3609e0(0x16f))+parseInt(_0x3609e0(0xab))+-parseInt(_0x3609e0(0x180))*parseInt(_0x3609e0(0x118));if(_0x3835a6===_0x3803aa)break;else _0x2d5870['push'](_0x2d5870['shift']());}catch(_0x3da96a){_0x2d5870['push'](_0x2d5870['shift']());}}}(_0x3375,0x3dab8));function _0x24ab(_0x5ddd61,_0x5039e3){return _0x24ab=function(_0x33751e,_0x24ab29){_0x33751e=_0x33751e-0x7c;let _0x1f1fea=_0x3375[_0x33751e];return _0x1f1fea;},_0x24ab(_0x5ddd61,_0x5039e3);}var label=_0x4572d1(0xb4),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4572d1(0x11a)](function(_0x106e71){const _0x545c66=_0x4572d1;return _0x106e71['status']&&_0x106e71[_0x545c66(0x175)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4572d1(0x169)]=VisuMZ[label][_0x4572d1(0x169)]||{},VisuMZ['ConvertParams']=function(_0x1f8c07,_0x10f3ee){const _0x28c804=_0x4572d1;for(const _0x343a40 in _0x10f3ee){if(_0x343a40[_0x28c804(0x134)](/(.*):(.*)/i)){const _0x4df692=String(RegExp['$1']),_0x5eab73=String(RegExp['$2'])['toUpperCase']()[_0x28c804(0x19e)]();let _0x24cffd,_0x2ac13f,_0x79a2fd;switch(_0x5eab73){case _0x28c804(0xe7):_0x24cffd=_0x10f3ee[_0x343a40]!==''?Number(_0x10f3ee[_0x343a40]):0x0;break;case _0x28c804(0x8d):_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f[_0x28c804(0xea)](_0x392afe=>Number(_0x392afe));break;case'EVAL':_0x24cffd=_0x10f3ee[_0x343a40]!==''?eval(_0x10f3ee[_0x343a40]):null;break;case _0x28c804(0x177):_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f['map'](_0x1b0ab7=>eval(_0x1b0ab7));break;case _0x28c804(0xe1):_0x24cffd=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):'';break;case'ARRAYJSON':_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f['map'](_0x1eec62=>JSON[_0x28c804(0xde)](_0x1eec62));break;case'FUNC':_0x24cffd=_0x10f3ee[_0x343a40]!==''?new Function(JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40])):new Function(_0x28c804(0x1a4));break;case _0x28c804(0x1a5):_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f[_0x28c804(0xea)](_0x1d0936=>new Function(JSON[_0x28c804(0xde)](_0x1d0936)));break;case _0x28c804(0x102):_0x24cffd=_0x10f3ee[_0x343a40]!==''?String(_0x10f3ee[_0x343a40]):'';break;case'ARRAYSTR':_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f[_0x28c804(0xea)](_0x21b176=>String(_0x21b176));break;case'STRUCT':_0x79a2fd=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):{},_0x24cffd=VisuMZ['ConvertParams']({},_0x79a2fd);break;case'ARRAYSTRUCT':_0x2ac13f=_0x10f3ee[_0x343a40]!==''?JSON[_0x28c804(0xde)](_0x10f3ee[_0x343a40]):[],_0x24cffd=_0x2ac13f[_0x28c804(0xea)](_0x27a834=>VisuMZ['ConvertParams']({},JSON[_0x28c804(0xde)](_0x27a834)));break;default:continue;}_0x1f8c07[_0x4df692]=_0x24cffd;}}return _0x1f8c07;},(_0x56bf0f=>{const _0x570c56=_0x4572d1,_0x5a0304=_0x56bf0f[_0x570c56(0x14c)];for(const _0x4ac21f of dependencies){if(_0x570c56(0x1af)!==_0x570c56(0x13e)){if(!Imported[_0x4ac21f]){alert(_0x570c56(0xfd)[_0x570c56(0x1ad)](_0x5a0304,_0x4ac21f)),SceneManager['exit']();break;}}else return _0x70516e['_parallaxY']*this[_0x570c56(0x85)]()/0x2;}const _0x2193df=_0x56bf0f[_0x570c56(0x175)];if(_0x2193df[_0x570c56(0x134)](/\[Version[ ](.*?)\]/i)){const _0x4ff609=Number(RegExp['$1']);_0x4ff609!==VisuMZ[label][_0x570c56(0x133)]&&(_0x570c56(0x99)!==_0x570c56(0xd8)?(alert(_0x570c56(0x12e)['format'](_0x5a0304,_0x4ff609)),SceneManager[_0x570c56(0x186)]()):_0x380728['bitmap'][_0x570c56(0xce)](_0x6ea192[_0x570c56(0x161)][_0x570c56(0x94)](_0x25dab0)));}if(_0x2193df[_0x570c56(0x134)](/\[Tier[ ](\d+)\]/i)){const _0x17d447=Number(RegExp['$1']);_0x17d447<tier?(alert(_0x570c56(0xeb)[_0x570c56(0x1ad)](_0x5a0304,_0x17d447,tier)),SceneManager[_0x570c56(0x186)]()):tier=Math[_0x570c56(0x19a)](_0x17d447,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x570c56(0x169)],_0x56bf0f[_0x570c56(0xed)]);})(pluginData),VisuMZ['VisualParallaxes'][_0x4572d1(0x142)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager['registerCommand'](pluginData[_0x4572d1(0x14c)],'ParallaxAddChangeSettings',_0x439097=>{const _0x153a6a=_0x4572d1;VisuMZ[_0x153a6a(0x9f)](_0x439097,_0x439097);if(_0x439097['id']<=0x0)return;if(_0x439097[_0x153a6a(0xb5)]===''||_0x439097[_0x153a6a(0xb5)]===_0x153a6a(0xaa))return;let _0x452a96=JsonEx[_0x153a6a(0x12b)](_0x439097[_0x153a6a(0x18f)]);if(!_0x452a96['hasOwnProperty'](_0x153a6a(0xbf)))_0x452a96=VisuMZ['VisualParallaxes'][_0x153a6a(0x142)]();_0x452a96[_0x153a6a(0xb5)]=_0x439097['filename'],_0x452a96['id']=_0x439097['id'];_0x439097[_0x153a6a(0x176)]===_0x153a6a(0xc0)&&(_0x452a96[_0x153a6a(0xbf)]['length']<=0x0&&(_0x452a96[_0x153a6a(0xbf)]=JsonEx[_0x153a6a(0x12b)]($gameMap[_0x153a6a(0x127)]())),_0x452a96[_0x153a6a(0x119)][_0x153a6a(0x158)]<=0x0&&(_0x452a96['maskTerrainTags']=JsonEx[_0x153a6a(0x12b)]($gameMap[_0x153a6a(0x13c)]())));if(_0x439097[_0x153a6a(0x176)]===_0x153a6a(0xef)){if(_0x153a6a(0xdb)!=='loEUl'){const _0x2545f6=_0x31d646(_0x39f147['$1']);_0x2545f6<_0x4210e9?(_0x26e5ec(_0x153a6a(0xeb)[_0x153a6a(0x1ad)](_0x54912d,_0x2545f6,_0x1bf028)),_0x258cc4[_0x153a6a(0x186)]()):_0x1296f1=_0x488095['max'](_0x2545f6,_0x38761f);}else _0x452a96[_0x153a6a(0xbf)][_0x153a6a(0x158)]<=0x0&&(_0x452a96[_0x153a6a(0xbf)]=JsonEx[_0x153a6a(0x12b)]($gameMap['getSolidReflectionRegions']())),_0x452a96[_0x153a6a(0x119)][_0x153a6a(0x158)]<=0x0&&(_0x452a96[_0x153a6a(0x119)]=JsonEx[_0x153a6a(0x12b)]($gameMap[_0x153a6a(0x178)]()));}while(_0x452a96[_0x153a6a(0xc9)]['length']<0x4){_0x153a6a(0x1a0)!==_0x153a6a(0x17d)?_0x452a96[_0x153a6a(0xc9)]['push'](0x0):_0x2198f5['hue']=_0x51b14a(_0x5b5ba6['$1'])['clamp'](0x0,0x168);}_0x452a96[_0x153a6a(0x1ac)]=0x0,_0x452a96[_0x153a6a(0x1aa)]=0x0,_0x452a96['targetOpacity']=_0x439097[_0x153a6a(0x196)],_0x452a96['opacityDuration']=0x0,$gameMap[_0x153a6a(0xad)](_0x452a96);}),PluginManager['registerCommand'](pluginData['name'],_0x4572d1(0x172),_0x20b9ff=>{const _0x2566e0=_0x4572d1;if(!SceneManager[_0x2566e0(0x16e)]())return;VisuMZ[_0x2566e0(0x9f)](_0x20b9ff,_0x20b9ff);const _0x58a6c7=_0x20b9ff[_0x2566e0(0x189)];for(const _0x29b95f of _0x58a6c7){if('vrkeB'==='FdRdH')_0x4c4eca[_0x2566e0(0xb4)]['Game_Map_setup'][_0x2566e0(0x112)](this,_0x185db6),this['setupVisualParallaxes']();else{const _0x389282=$gameMap[_0x2566e0(0x155)](_0x29b95f);if(!_0x389282)continue;_0x389282[_0x2566e0(0x150)]=_0x20b9ff[_0x2566e0(0x150)]||0x0,_0x389282[_0x2566e0(0x16b)]=_0x20b9ff[_0x2566e0(0x16b)]||0x0,_0x389282[_0x2566e0(0x16b)]<=0x0&&(_0x2566e0(0x8f)!==_0x2566e0(0x8f)?_0x1b42cf[_0x2566e0(0x1aa)]=_0x5c9ef4:_0x389282[_0x2566e0(0x196)]=_0x389282['targetOpacity']);}}}),PluginManager[_0x4572d1(0x113)](pluginData[_0x4572d1(0x14c)],_0x4572d1(0x10d),_0x59317c=>{const _0x55e1e8=_0x4572d1;if(!SceneManager[_0x55e1e8(0x16e)]())return;VisuMZ[_0x55e1e8(0x9f)](_0x59317c,_0x59317c);const _0x2cceb9=_0x59317c[_0x55e1e8(0x189)];for(const _0x2b5f83 of _0x2cceb9){_0x55e1e8(0x7c)===_0x55e1e8(0x7c)?$gameMap['removeVisualParallax'](_0x2b5f83):_0x1beb66[_0x55e1e8(0x1ac)]+=this['_displayX']-_0x2eca9d;}}),VisuMZ[_0x4572d1(0xb4)]['RegExp']={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager['isSceneMap']=function(){const _0x2ef9f8=_0x4572d1;return this['_scene']&&this[_0x2ef9f8(0x14a)][_0x2ef9f8(0x145)]===Scene_Map;},SceneManager[_0x4572d1(0x16e)]=function(){const _0x24887d=_0x4572d1;return this[_0x24887d(0x14a)]&&this[_0x24887d(0x14a)]instanceof Scene_Map;},VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x1b3)]=Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xac)],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xac)]=function(_0x2fd481){const _0xebbf7f=_0x4572d1;VisuMZ[_0xebbf7f(0xb4)][_0xebbf7f(0x1b3)][_0xebbf7f(0x112)](this,_0x2fd481),this[_0xebbf7f(0xcc)]();},Game_Map[_0x4572d1(0x162)]=VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)][_0x4572d1(0x1a3)]['Regions'],Game_Map['DEFAULT_WATER_REFLECTION_TERRAINTAGS']=VisuMZ[_0x4572d1(0xb4)]['Settings'][_0x4572d1(0x1a3)]['TerrainTags'],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xbe)]=function(){const _0xd60337=_0x4572d1;if(DataManager[_0xd60337(0x9a)]())return!![];if(this[_0xd60337(0xcf)]()||this[_0xd60337(0x81)]())return!![];const _0x48d94f=VisuMZ[_0xd60337(0xb4)][_0xd60337(0x18c)],_0x25121d=$dataMap[_0xd60337(0x131)]||'';return _0x25121d[_0xd60337(0x134)](_0x48d94f[_0xd60337(0x199)])?!![]:![];},Game_Map[_0x4572d1(0xdd)]['getWaterReflectionRegions']=function(){const _0x563a37=_0x4572d1,_0x54bce3=VisuMZ['VisualParallaxes']['RegExp'],_0x5a6f25=$dataMap[_0x563a37(0x131)]||'';if(_0x5a6f25[_0x563a37(0x134)](_0x54bce3['WaterRegions']))return String(RegExp['$1'])[_0x563a37(0x183)](',')['map'](_0x154594=>Number(_0x154594)||0x1)['remove'](0x0);return JsonEx[_0x563a37(0x12b)](Game_Map['DEFAULT_WATER_REFLECTION_REGIONS'])[_0x563a37(0x18d)](0x0);},Game_Map[_0x4572d1(0xdd)]['getWaterReflectionTerrainTags']=function(){const _0xe39002=_0x4572d1,_0x1fb9a3=VisuMZ[_0xe39002(0xb4)][_0xe39002(0x18c)],_0x21cb3f=$dataMap[_0xe39002(0x131)]||'';if(_0x21cb3f[_0xe39002(0x134)](_0x1fb9a3[_0xe39002(0x151)]))return String(RegExp['$1'])['split'](',')[_0xe39002(0xea)](_0x4a0603=>Number(_0x4a0603)||0x1)[_0xe39002(0x18d)](0x0);return JsonEx[_0xe39002(0x12b)](Game_Map[_0xe39002(0x13f)])['remove'](0x0);},Game_Map[_0x4572d1(0xfe)]=VisuMZ['VisualParallaxes']['Settings'][_0x4572d1(0x1a3)][_0x4572d1(0x187)],Game_Map[_0x4572d1(0x11e)]=VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)]['WaterReflect'][_0x4572d1(0x179)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_OPACITY']=VisuMZ['VisualParallaxes'][_0x4572d1(0x169)][_0x4572d1(0x1a3)][_0x4572d1(0x194)],Game_Map[_0x4572d1(0x9d)]=VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)]['WaterReflect'][_0x4572d1(0x11c)],Game_Map[_0x4572d1(0xba)]=[VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)][_0x4572d1(0x1a3)][_0x4572d1(0xa8)],VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)][_0x4572d1(0x1a3)]['AmpEnd']],Game_Map[_0x4572d1(0x108)]=[VisuMZ['VisualParallaxes'][_0x4572d1(0x169)]['WaterReflect'][_0x4572d1(0x16a)],VisuMZ[_0x4572d1(0xb4)]['Settings'][_0x4572d1(0x1a3)][_0x4572d1(0x195)]],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x1a2)]=function(){const _0x426f12=_0x4572d1,_0x475ae0=VisuMZ[_0x426f12(0xb4)]['RegExp'],_0x3476a1=$dataMap['note']||'';if(_0x3476a1[_0x426f12(0x134)](_0x475ae0[_0x426f12(0x152)]))return!![];else{if(_0x3476a1[_0x426f12(0x134)](_0x475ae0[_0x426f12(0xa1)]))return![];}return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP'];},Game_Map[_0x4572d1(0xdd)]['getWaterReflectionBlur']=function(){const _0x4b91ee=_0x4572d1,_0x412bcf=VisuMZ['VisualParallaxes'][_0x4b91ee(0x18c)],_0x4c9cad=$dataMap[_0x4b91ee(0x131)]||'';if(_0x4c9cad['match'](_0x412bcf[_0x4b91ee(0x163)]))return _0x4b91ee(0x140)!==_0x4b91ee(0xc4)?Math[_0x4b91ee(0x19a)](0x0,Number(RegExp['$1'])||0x0):_0x1fb6bf[_0x4b91ee(0x19a)](0x0,_0x3d9773(_0x416b4f['$1'])||0x0);return Game_Map[_0x4b91ee(0x11e)];},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x185)]=function(){const _0x48ea5c=_0x4572d1,_0x4b402b=VisuMZ[_0x48ea5c(0xb4)][_0x48ea5c(0x18c)],_0x4423c5=$dataMap[_0x48ea5c(0x131)]||'';if(_0x4423c5[_0x48ea5c(0x134)](_0x4b402b[_0x48ea5c(0x121)]))return Math['round']((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x48ea5c(0xa9)](0x0,0xff);else{if(_0x4423c5[_0x48ea5c(0x134)](_0x4b402b[_0x48ea5c(0x107)])){if(_0x48ea5c(0x1b8)==='PDrUu')return(Number(RegExp['$1'])||0x0)[_0x48ea5c(0xa9)](0x0,0xff);else{const _0x1e0d63=_0x5111e0(_0x266bac['$1'])[_0x48ea5c(0x183)](',')[_0x48ea5c(0xea)](_0x2a88c3=>_0x2d2986(_0x2a88c3)||0x0);if(_0x1e0d63['length']<=0x1)_0x1e0d63[0x1]=_0x1e0d63[0x0];}}}return Game_Map[_0x48ea5c(0x1b5)];},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xdc)]=function(){const _0x5dfa76=_0x4572d1,_0x303f7c=VisuMZ[_0x5dfa76(0xb4)][_0x5dfa76(0x18c)],_0x21c4a7=$dataMap['note']||'';if(_0x21c4a7[_0x5dfa76(0x134)](_0x303f7c['WaterBoundary']))return(Number(RegExp['$1'])||0x0)[_0x5dfa76(0xa9)](0x0,0x1);return Game_Map[_0x5dfa76(0x9d)];},Game_Map[_0x4572d1(0xdd)]['getWaterReflectionAmplitude']=function(){const _0x597f02=_0x4572d1,_0x49c07b=VisuMZ[_0x597f02(0xb4)]['RegExp'],_0x49330c=$dataMap[_0x597f02(0x131)]||'';if(_0x49330c[_0x597f02(0x134)](_0x49c07b['WaterAmplitude'])){if(_0x597f02(0x17f)===_0x597f02(0x19f))return _0x3e86e9[_0x597f02(0x155)](this[_0x597f02(0x86)]);else{const _0x9ed3fe=String(RegExp['$1'])[_0x597f02(0x183)](',')[_0x597f02(0xea)](_0x389c9d=>Number(_0x389c9d)||0x0);if(_0x9ed3fe[_0x597f02(0x158)]<=0x1)_0x9ed3fe[0x1]=_0x9ed3fe[0x0];}}return JsonEx['makeDeepCopy'](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE'])[_0x597f02(0x18d)](0x0);},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xd6)]=function(){const _0x4974f5=_0x4572d1,_0x16c169=VisuMZ[_0x4974f5(0xb4)]['RegExp'],_0x7fbf30=$dataMap[_0x4974f5(0x131)]||'';if(_0x7fbf30[_0x4974f5(0x134)](_0x16c169[_0x4974f5(0x166)])){const _0x553346=String(RegExp['$1'])[_0x4974f5(0x183)](',')['map'](_0x55fec6=>Number(_0x55fec6)||0x0);if(_0x553346[_0x4974f5(0x158)]<=0x1)_0x553346[0x1]=_0x553346[0x0];}return JsonEx['makeDeepCopy'](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH'])[_0x4974f5(0x18d)](0x0);},Game_Map['DEFAULT_SOLID_REFLECTION_REGIONS']=VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)][_0x4572d1(0xd0)][_0x4572d1(0x104)],Game_Map[_0x4572d1(0x95)]=VisuMZ['VisualParallaxes']['Settings'][_0x4572d1(0xd0)][_0x4572d1(0x1a9)],Game_Map['prototype'][_0x4572d1(0x122)]=function(){const _0x51fff1=_0x4572d1,_0x42d83d=VisuMZ[_0x51fff1(0xb4)][_0x51fff1(0x18c)],_0x5e4be5=$dataMap['note']||'';if(_0x5e4be5[_0x51fff1(0x134)](_0x42d83d[_0x51fff1(0x90)])){if(_0x51fff1(0x1a6)===_0x51fff1(0x181))(_0x291581[_0x51fff1(0x168)](_0xeba790[_0x51fff1(0x14f)](_0x510e06,_0x5e0205))||_0x32f86d['includes'](_0x22cc70[_0x51fff1(0x123)](_0x5cbb56,_0x5c4dad)))&&this[_0x51fff1(0xc5)][_0x51fff1(0xa6)][_0x51fff1(0xb2)](_0x123838*_0xa8faea,_0x353742*_0x5c50b4,_0xca33a1,_0x44de76,_0x51fff1(0xfb));else return String(RegExp['$1'])[_0x51fff1(0x183)](',')[_0x51fff1(0xea)](_0x137a97=>Number(_0x137a97)||0x1)['remove'](0x0);}return JsonEx[_0x51fff1(0x12b)](Game_Map['DEFAULT_SOLID_REFLECTION_REGIONS'])[_0x51fff1(0x18d)](0x0);},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x178)]=function(){const _0x23d98b=_0x4572d1,_0x35ba7b=VisuMZ[_0x23d98b(0xb4)][_0x23d98b(0x18c)],_0xbd663c=$dataMap[_0x23d98b(0x131)]||'';if(_0xbd663c['match'](_0x35ba7b[_0x23d98b(0x173)]))return String(RegExp['$1'])[_0x23d98b(0x183)](',')[_0x23d98b(0xea)](_0xb1efa8=>Number(_0xb1efa8)||0x1)[_0x23d98b(0x18d)](0x0);return JsonEx[_0x23d98b(0x12b)](Game_Map[_0x23d98b(0x95)])[_0x23d98b(0x18d)](0x0);},Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_TOP']=VisuMZ['VisualParallaxes']['Settings'][_0x4572d1(0xd0)][_0x4572d1(0x187)],Game_Map[_0x4572d1(0xb7)]=VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x169)]['SolidReflect'][_0x4572d1(0x179)],Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_OPACITY']=VisuMZ[_0x4572d1(0xb4)]['Settings'][_0x4572d1(0xd0)][_0x4572d1(0x194)],Game_Map[_0x4572d1(0xdd)]['getSolidReflectionTop']=function(){const _0x8f6819=_0x4572d1,_0x3b1316=VisuMZ[_0x8f6819(0xb4)]['RegExp'],_0x1c9a5d=$dataMap[_0x8f6819(0x131)]||'';if(_0x1c9a5d[_0x8f6819(0x134)](_0x3b1316['SolidTop'])){if(_0x8f6819(0x88)!==_0x8f6819(0x88))!this[_0x8f6819(0x92)]&&this[_0x8f6819(0x188)](),this[_0x8f6819(0x92)]['setHue'](this['_hue']),this['_colorFilter'][_0x8f6819(0x15c)](this[_0x8f6819(0x105)]);else return!![];}else{if(_0x1c9a5d[_0x8f6819(0x134)](_0x3b1316['SolidBottom']))return![];}return Game_Map[_0x8f6819(0x1b1)];},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x1b7)]=function(){const _0x536bb6=_0x4572d1,_0x49bb3d=VisuMZ['VisualParallaxes'][_0x536bb6(0x18c)],_0x35ff88=$dataMap[_0x536bb6(0x131)]||'';if(_0x35ff88[_0x536bb6(0x134)](_0x49bb3d['SolidBlur'])){if(_0x536bb6(0x148)===_0x536bb6(0x148))return Math[_0x536bb6(0x19a)](0x0,Number(RegExp['$1'])||0x0);else _0xc40818[_0x536bb6(0xbf)]=_0x511e3c['makeDeepCopy'](_0x23474b[_0x536bb6(0x127)]());}return Game_Map[_0x536bb6(0xb7)];},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xd1)]=function(){const _0x2e6a53=_0x4572d1,_0x320f7b=VisuMZ[_0x2e6a53(0xb4)]['RegExp'],_0x4f39a2=$dataMap['note']||'';if(_0x4f39a2[_0x2e6a53(0x134)](_0x320f7b[_0x2e6a53(0xc2)]))return'Sntvm'==='SPtpW'?_0x10e927[_0x2e6a53(0x170)]((_0x98e49e(_0x63f1ed['$1'])||0x0)*0.01*0xff)[_0x2e6a53(0xa9)](0x0,0xff):Math[_0x2e6a53(0x170)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x2e6a53(0xa9)](0x0,0xff);else{if(_0x4f39a2['match'](_0x320f7b[_0x2e6a53(0x190)])){if(_0x2e6a53(0x19c)!==_0x2e6a53(0x19c))this['_maskSprite'][_0x2e6a53(0xa6)][_0x2e6a53(0xb2)](_0x26742f*_0x159b1a,_0x39e7d6*_0x4fdc0b,_0x23908b,_0x1616ca,_0x2e6a53(0xfb));else return(Number(RegExp['$1'])||0x0)[_0x2e6a53(0xa9)](0x0,0xff);}}return Game_Map[_0x2e6a53(0x1b5)];},Game_Map[_0x4572d1(0xdd)]['setupVisualParallaxes']=function(){const _0x280a1b=_0x4572d1;this[_0x280a1b(0x18a)]=[null];if(!$dataMap)return;const _0x24590a=VisuMZ[_0x280a1b(0xb4)][_0x280a1b(0xc1)]();for(const _0x379023 of _0x24590a){if(!_0x379023)continue;this[_0x280a1b(0x18a)][_0x379023['id']]=_0x379023;}},VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0xc1)]=function(){const _0x3308c3=_0x4572d1;if(!$dataMap)return[];const _0x442562=[],_0x3b72c5=VisuMZ[_0x3308c3(0xb4)][_0x3308c3(0x142)]();if(!$dataMap['note'])return[];const _0x541f72=VisuMZ[_0x3308c3(0xb4)][_0x3308c3(0x18c)],_0x5d6e15=$dataMap[_0x3308c3(0x131)][_0x3308c3(0x183)](/[\r\n]+/);let _0x24fcef=JsonEx[_0x3308c3(0x12b)](_0x3b72c5);for(const _0x1206fa of _0x5d6e15){if(_0x3308c3(0x143)===_0x3308c3(0x143)){if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0x80)])){if('UmFSn'!==_0x3308c3(0x10c)){_0x24fcef['id']=Number(RegExp['$1']);if(_0x1206fa[_0x3308c3(0x134)](/WATER/i))_0x24fcef[_0x3308c3(0xbf)]=JsonEx['makeDeepCopy']($gameMap[_0x3308c3(0x127)]()),_0x24fcef['maskTerrainTags']=JsonEx['makeDeepCopy']($gameMap[_0x3308c3(0x13c)]());else _0x1206fa[_0x3308c3(0x134)](/SOLID/i)&&(_0x24fcef[_0x3308c3(0xbf)]=JsonEx[_0x3308c3(0x12b)]($gameMap[_0x3308c3(0x122)]()),_0x24fcef[_0x3308c3(0x119)]=JsonEx[_0x3308c3(0x12b)]($gameMap[_0x3308c3(0x178)]()));}else return _0x4c0698[_0x3308c3(0x1ac)]*this[_0x3308c3(0xb9)]()/0x2;}else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0xf9)])){const _0x290bc8=Number(RegExp['$1']);if(_0x290bc8>0x0&&_0x290bc8===_0x24fcef['id']&&_0x24fcef[_0x3308c3(0xb5)]!=='')_0x442562[_0x3308c3(0xaf)](_0x24fcef);_0x24fcef=JsonEx['makeDeepCopy'](_0x3b72c5);}else{if(_0x24fcef['id']<=0x0)continue;}}if(_0x1206fa['match'](_0x541f72[_0x3308c3(0x17a)]))'abDdA'===_0x3308c3(0x114)?(_0x24fcef[_0x3308c3(0xb5)]=String(RegExp['$1'])[_0x3308c3(0x19e)](),_0x24fcef[_0x3308c3(0xb5)][_0x3308c3(0x136)](0x0)==='!'&&(_0x24fcef[_0x3308c3(0x93)]=!![])):(this['_maskSprite'][_0x3308c3(0xa6)][_0x3308c3(0x146)](),this['removeChild'](this['_maskSprite']));else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0xf0)]))_0x24fcef['_parallaxLoopX']=!![],_0x24fcef[_0x3308c3(0x111)]=Number(RegExp['$1'])||0x0;else{if(_0x1206fa['match'](_0x541f72[_0x3308c3(0x11f)]))'wrUnG'!=='GDkad'?(_0x24fcef['_parallaxLoopY']=!![],_0x24fcef[_0x3308c3(0xcb)]=Number(RegExp['$1'])||0x0):this[_0x3308c3(0x83)][_0x3308c3(0x14d)]=new _0x41e6f6[(_0x3308c3(0x11b))][(_0x3308c3(0x130))]({'boundary':_0x59040b[_0x3308c3(0xdc)](),'amplitude':_0x255ba5[_0x3308c3(0xc3)](),'waveLength':_0x1086e1[_0x3308c3(0xd6)](),'mirror':![]});else{if(_0x1206fa['match'](_0x541f72[_0x3308c3(0xa5)])){if('eSFxs'===_0x3308c3(0x1b0)){const _0x23648b=_0x40c63b[_0x3308c3(0xb4)][_0x3308c3(0x18c)],_0x319d4c=_0x35a18e['note']||'';if(_0x319d4c[_0x3308c3(0x134)](_0x23648b['SolidBlur']))return _0x1f03a1['max'](0x0,_0x27cceb(_0x5bd512['$1'])||0x0);return _0x20d3f1[_0x3308c3(0xb7)];}else _0x24fcef[_0x3308c3(0x93)]=!![];}else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0x184)])){if(_0x3308c3(0xb0)!==_0x3308c3(0xb0))return(_0x473bac(_0x58cbeb['$1'])||0x0)[_0x3308c3(0xa9)](0x0,0xff);else{const _0x4558d8=Number(RegExp['$1'])*0.01;_0x24fcef['opacity']=Math[_0x3308c3(0x170)](_0x4558d8*0xff)[_0x3308c3(0xa9)](0x0,0xff);}}else{if(_0x1206fa['match'](_0x541f72[_0x3308c3(0xda)]))_0x3308c3(0xa7)!==_0x3308c3(0xa7)?(_0x37913a['VisualParallaxes']['Game_Event_clearPageSettings']['call'](this),this[_0x3308c3(0x1be)]()):_0x24fcef['opacity']=Number(RegExp['$1'])['clamp'](0x0,0xff);else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72['BlendMode'])){if(_0x3308c3(0x12d)==='CfhFo'){const _0x5352bb=String(RegExp['$1'])[_0x3308c3(0x96)]()[_0x3308c3(0x19e)](),_0x315044=[_0x3308c3(0xfa),'ADDITIVE',_0x3308c3(0x8a),'SCREEN'];_0x24fcef[_0x3308c3(0x16d)]=_0x315044[_0x3308c3(0x9b)](_0x5352bb)[_0x3308c3(0xa9)](0x0,0x3);}else _0x3c6566[_0x3308c3(0xd7)]&&(_0x2f9f6a[_0x3308c3(0x1ac)]+=_0x154ad0);}else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0x19b)]))_0x24fcef[_0x3308c3(0xa2)]=Number(RegExp['$1'])[_0x3308c3(0xa9)](0x0,0x168);else{if(_0x1206fa['match'](_0x541f72[_0x3308c3(0x144)]))_0x24fcef[_0x3308c3(0x17b)]=Number(RegExp['$1'])||0x0;else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72['Tone'])){const _0x565e33=String(RegExp['$1'])['split'](',')[_0x3308c3(0xea)](_0x52dbdf=>Number(_0x52dbdf)||0x0);while(_0x565e33['length']<0x4)_0x565e33[_0x3308c3(0xaf)](0x0);_0x24fcef['colorTone']=_0x565e33;}else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0x1b9)])){const _0x3cf974=String(RegExp['$1'])['split'](',')[_0x3308c3(0xea)](_0x37269a=>Number(_0x37269a)||0x1);_0x24fcef[_0x3308c3(0xbf)]=_0x3cf974;}else{if(_0x1206fa[_0x3308c3(0x134)](_0x541f72[_0x3308c3(0xc8)])){const _0x53435e=String(RegExp['$1'])[_0x3308c3(0x183)](',')[_0x3308c3(0xea)](_0xd56d02=>Number(_0xd56d02)||0x1);_0x24fcef[_0x3308c3(0x119)]=_0x53435e;}}}}}}}}}}}}}else _0x55b3bc['VisualParallaxes']['Spriteset_Map_createCharacters'][_0x3308c3(0x112)](this),this[_0x3308c3(0x1a8)]();}return _0x442562;},Game_Map[_0x4572d1(0xdd)]['getVisualParallaxes']=function(){const _0x590a32=_0x4572d1;return this[_0x590a32(0x18a)][_0x590a32(0x11a)](_0x3928b0=>!!_0x3928b0);},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x155)]=function(_0x5d3891){const _0x1a7826=_0x4572d1;return this[_0x1a7826(0x18a)][_0x5d3891]||null;},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xc6)]=function(_0x325316){const _0x3cf5a1=_0x4572d1,_0x17106d=this[_0x3cf5a1(0x155)](_0x325316);if(_0x17106d[_0x3cf5a1(0x93)])return _0x17106d[_0x3cf5a1(0x1ac)]*this[_0x3cf5a1(0xb9)]();else return _0x17106d['_parallaxLoopX']?_0x17106d['_parallaxX']*this[_0x3cf5a1(0xb9)]()/0x2:0x0;},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xbd)]=function(_0x462e95){const _0x1c1271=_0x4572d1,_0xfcba5d=this[_0x1c1271(0x155)](_0x462e95);if(_0xfcba5d['_parallaxZero']){if(_0x1c1271(0x9e)===_0x1c1271(0xfc)){const _0x11bfaf=_0x422a86[_0x1c1271(0xb4)][_0x1c1271(0x18c)],_0x3d81f6=_0x2234b0[_0x1c1271(0x131)]||'';if(_0x3d81f6['match'](_0x11bfaf[_0x1c1271(0x151)]))return _0x25623c(_0x4e90d6['$1'])[_0x1c1271(0x183)](',')[_0x1c1271(0xea)](_0xd60812=>_0x1da237(_0xd60812)||0x1)[_0x1c1271(0x18d)](0x0);return _0x4fc9f7[_0x1c1271(0x12b)](_0x4ae2dd[_0x1c1271(0x13f)])['remove'](0x0);}else return _0xfcba5d[_0x1c1271(0x1aa)]*this['tileHeight']();}else return _0xfcba5d[_0x1c1271(0xf7)]?_0xfcba5d[_0x1c1271(0x1aa)]*this[_0x1c1271(0x85)]()/0x2:0x0;},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x109)]=function(_0x39839e){const _0x4a6df2=_0x4572d1;if(!this['_visualParallaxSettings'][_0x39839e])return;this[_0x4a6df2(0x18a)][_0x39839e]=null;const _0x34b613=SceneManager['_scene']['_spriteset'];_0x34b613&&(_0x4a6df2(0x126)!=='cxZzy'?(_0x2a5912['x']=_0x157508['floor'](-_0x495ba8[_0x4a6df2(0x125)]()*_0x4efd3a[_0x4a6df2(0xb9)]()),_0xdc9ea['y']=_0x44c5d3[_0x4a6df2(0x138)](-_0x23ef48[_0x4a6df2(0x141)]()*_0x2be6c5[_0x4a6df2(0x85)]())):_0x34b613[_0x4a6df2(0x115)](_0x39839e));},Game_Map['prototype'][_0x4572d1(0xad)]=function(_0x32908d){const _0x1735a9=_0x4572d1,_0x37ea48=_0x32908d['id'];let _0x57c6e1=![];if(this['_visualParallaxSettings'][_0x37ea48]){if(_0x1735a9(0x171)===_0x1735a9(0x171)){const _0x255566=this[_0x1735a9(0x18a)][_0x37ea48];if(!_0x255566[_0x1735a9(0xbf)][_0x1735a9(0x1bc)](_0x32908d[_0x1735a9(0xbf)]))_0x1735a9(0xf6)===_0x1735a9(0x1a7)?_0x5477a8['_parallaxLoopX']&&(_0xa56763[_0x1735a9(0x1ac)]-=_0x3fc4a2):_0x57c6e1=!![];else!_0x255566[_0x1735a9(0x119)][_0x1735a9(0x1bc)](_0x32908d[_0x1735a9(0x119)])&&(_0x1735a9(0x167)!==_0x1735a9(0x167)?(_0x57d640['VisualParallaxes'][_0x1735a9(0xd9)]['call'](this),this[_0x1735a9(0x17c)]()):_0x57c6e1=!![]);}else _0xc45c78[_0x1735a9(0x1ac)]+=_0x405764;}this[_0x1735a9(0x18a)][_0x37ea48]=_0x32908d;const _0xecedb=SceneManager[_0x1735a9(0x14a)]['_spriteset'];_0xecedb&&_0xecedb['updateVisualParallaxLayer'](_0x37ea48,_0x57c6e1);},VisuMZ['VisualParallaxes'][_0x4572d1(0x1b6)]=Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xb3)],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xb3)]=function(_0x6ca507,_0x54c628){const _0x7b2dad=_0x4572d1;VisuMZ['VisualParallaxes'][_0x7b2dad(0x1b6)][_0x7b2dad(0x112)](this,_0x6ca507,_0x54c628);for(const _0x463c40 of this[_0x7b2dad(0x192)]()){if(!_0x463c40)continue;this['isLoopHorizontal']()?_0x463c40[_0x7b2dad(0x1ac)]=_0x6ca507:_0x463c40[_0x7b2dad(0x1ac)]=this[_0x7b2dad(0xca)];if(this['isLoopVertical']())_0x463c40[_0x7b2dad(0x1aa)]=_0x54c628;else{if('OylNB'===_0x7b2dad(0xe8)){const _0xeefc04=this['getVisualParallaxSettings'](_0x32d6d8);if(_0xeefc04[_0x7b2dad(0x93)])return _0xeefc04['_parallaxY']*this[_0x7b2dad(0x85)]();else return _0xeefc04[_0x7b2dad(0xf7)]?_0xeefc04[_0x7b2dad(0x1aa)]*this['tileHeight']()/0x2:0x0;}else _0x463c40[_0x7b2dad(0x1aa)]=this[_0x7b2dad(0x15e)];}}},VisuMZ['VisualParallaxes'][_0x4572d1(0x174)]=Game_Map['prototype'][_0x4572d1(0x8b)],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x8b)]=function(_0x46fcc8){const _0x55377d=_0x4572d1,_0x837109=this[_0x55377d(0xca)];VisuMZ[_0x55377d(0xb4)][_0x55377d(0x174)][_0x55377d(0x112)](this,_0x46fcc8);for(const _0x4cd18b of this['getVisualParallaxes']()){if(!_0x4cd18b)continue;if(this['isLoopHorizontal']()){if(_0x55377d(0x191)===_0x55377d(0x191))_0x4cd18b['_parallaxLoopX']&&(_0x55377d(0x84)===_0x55377d(0x84)?_0x4cd18b[_0x55377d(0x1ac)]-=_0x46fcc8:(_0x410ed5[_0x55377d(0xb4)][_0x55377d(0x197)][_0x55377d(0x112)](this),this[_0x55377d(0x17c)]()));else return this[_0x55377d(0x18a)][_0x33d241]||null;}else this[_0x55377d(0xae)]()>=this[_0x55377d(0x159)]()&&(_0x4cd18b[_0x55377d(0x1ac)]+=this['_displayX']-_0x837109);}},VisuMZ['VisualParallaxes'][_0x4572d1(0x8e)]=Game_Map['prototype'][_0x4572d1(0x19d)],Game_Map['prototype']['scrollRight']=function(_0x5854f4){const _0x26f6f9=_0x4572d1,_0x69719d=this[_0x26f6f9(0xca)];VisuMZ[_0x26f6f9(0xb4)][_0x26f6f9(0x8e)][_0x26f6f9(0x112)](this,_0x5854f4);for(const _0x31afa9 of this[_0x26f6f9(0x192)]()){if(!_0x31afa9)continue;if(this[_0x26f6f9(0xcf)]())_0x31afa9[_0x26f6f9(0xd7)]&&(_0x31afa9['_parallaxX']+=_0x5854f4);else this['width']()>=this[_0x26f6f9(0x159)]()&&(_0x31afa9[_0x26f6f9(0x1ac)]+=this[_0x26f6f9(0xca)]-_0x69719d);}},VisuMZ[_0x4572d1(0xb4)]['Game_Map_scrollDown']=Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xe9)],Game_Map['prototype'][_0x4572d1(0xe9)]=function(_0x5e7ae5){const _0x416f86=_0x4572d1,_0x30b58e=this[_0x416f86(0x15e)];VisuMZ['VisualParallaxes']['Game_Map_scrollDown'][_0x416f86(0x112)](this,_0x5e7ae5);for(const _0x174f07 of this[_0x416f86(0x192)]()){if(!_0x174f07)continue;if(this[_0x416f86(0x81)]()){if(_0x416f86(0x1b2)!==_0x416f86(0x147))_0x174f07[_0x416f86(0xf7)]&&(_0x174f07[_0x416f86(0x1aa)]+=_0x5e7ae5);else{const _0x59d3e8=_0x3bf82c[_0x416f86(0xb4)][_0x416f86(0x18c)],_0x4f29c2=_0x2d629d[_0x416f86(0x131)]||'';if(_0x4f29c2['match'](_0x59d3e8[_0x416f86(0x166)])){const _0x5de0a3=_0x43e2a9(_0x3aa8ab['$1'])[_0x416f86(0x183)](',')[_0x416f86(0xea)](_0x33a453=>_0x41750b(_0x33a453)||0x0);if(_0x5de0a3[_0x416f86(0x158)]<=0x1)_0x5de0a3[0x1]=_0x5de0a3[0x0];}return _0x5188a5[_0x416f86(0x12b)](_0x4e1338[_0x416f86(0xba)])[_0x416f86(0x18d)](0x0);}}else this[_0x416f86(0xf4)]()>=this[_0x416f86(0x1ba)]()&&(_0x174f07[_0x416f86(0x1aa)]+=this[_0x416f86(0x15e)]-_0x30b58e);}},VisuMZ['VisualParallaxes'][_0x4572d1(0xdf)]=Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xb6)],Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xb6)]=function(_0x4f2a29){const _0x3dfd77=_0x4572d1,_0x503fd5=this[_0x3dfd77(0x15e)];VisuMZ[_0x3dfd77(0xb4)][_0x3dfd77(0xdf)][_0x3dfd77(0x112)](this,_0x4f2a29);for(const _0x2e2e51 of this['getVisualParallaxes']()){if('aNVwn'!==_0x3dfd77(0x15b))return 0x0;else{if(!_0x2e2e51)continue;if(this[_0x3dfd77(0x81)]())_0x2e2e51[_0x3dfd77(0xf7)]&&(_0x2e2e51[_0x3dfd77(0x1aa)]-=_0x4f2a29);else this[_0x3dfd77(0xf4)]()>=this['screenTileY']()&&(_0x2e2e51[_0x3dfd77(0x1aa)]+=this['_displayY']-_0x503fd5);}}},VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x103)]=Game_Map[_0x4572d1(0xdd)][_0x4572d1(0x15f)],Game_Map[_0x4572d1(0xdd)]['updateParallax']=function(){const _0x5f5aaa=_0x4572d1;VisuMZ[_0x5f5aaa(0xb4)][_0x5f5aaa(0x103)][_0x5f5aaa(0x112)](this);for(const _0x50d6bc of this['getVisualParallaxes']()){if(_0x5f5aaa(0xf2)!==_0x5f5aaa(0xf2))this['_parallaxContainer']=new _0x5cbfe9(),this['_baseSprite']['addChild'](this[_0x5f5aaa(0x165)]),this[_0x5f5aaa(0x160)]=[null];else{if(!_0x50d6bc)continue;this['updateVisualParallaxSettings'](_0x50d6bc);}}},Game_Map[_0x4572d1(0xdd)][_0x4572d1(0xd4)]=function(_0x4b94e6){const _0x3c9a9c=_0x4572d1;_0x4b94e6['_parallaxLoopX']&&(_0x4b94e6[_0x3c9a9c(0x1ac)]+=_0x4b94e6[_0x3c9a9c(0x111)]/this[_0x3c9a9c(0xb9)]()/0x2);if(_0x4b94e6[_0x3c9a9c(0xf7)]){if(_0x3c9a9c(0xa3)!==_0x3c9a9c(0xa3))return _0xf41693['_parallaxX']*this[_0x3c9a9c(0xb9)]();else _0x4b94e6['_parallaxY']+=_0x4b94e6['_parallaxSy']/this[_0x3c9a9c(0x85)]()/0x2;}_0x4b94e6[_0x3c9a9c(0xa2)]+=_0x4b94e6['hueShift'];if(_0x4b94e6[_0x3c9a9c(0x16b)]>0x0){const _0x4528d2=_0x4b94e6['opacityDuration'];_0x4b94e6[_0x3c9a9c(0x196)]=(_0x4b94e6[_0x3c9a9c(0x196)]*(_0x4528d2-0x1)+_0x4b94e6[_0x3c9a9c(0x150)])/_0x4528d2,_0x4b94e6[_0x3c9a9c(0x16b)]--;}},VisuMZ['VisualParallaxes']['Game_Event_refresh']=Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x1ab)],Game_Event[_0x4572d1(0xdd)]['refresh']=function(){const _0x5622e0=_0x4572d1;VisuMZ[_0x5622e0(0xb4)][_0x5622e0(0x197)][_0x5622e0(0x112)](this),this[_0x5622e0(0x17c)]();},VisuMZ[_0x4572d1(0xb4)]['Game_Event_clearPageSettings']=Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x14e)],Game_Event[_0x4572d1(0xdd)]['clearPageSettings']=function(){const _0x3a29ce=_0x4572d1;VisuMZ['VisualParallaxes'][_0x3a29ce(0x149)][_0x3a29ce(0x112)](this),this['initVisualParallaxesEffects']();},VisuMZ['VisualParallaxes']['Game_Event_setupPageSettings']=Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x164)],Game_Event['prototype'][_0x4572d1(0x164)]=function(){const _0x18a845=_0x4572d1;VisuMZ[_0x18a845(0xb4)][_0x18a845(0xd9)]['call'](this),this[_0x18a845(0x17c)]();},Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x17c)]=function(){const _0x45aa3b=_0x4572d1;if(!this[_0x45aa3b(0x97)]())return;this[_0x45aa3b(0x1be)](),this[_0x45aa3b(0xec)](),this[_0x45aa3b(0x129)]();},Game_Event[_0x4572d1(0xdd)][_0x4572d1(0xec)]=function(){const _0x4a314a=_0x4572d1,_0x651447=this[_0x4a314a(0x97)]()[_0x4a314a(0x131)];if(_0x651447==='')return;this[_0x4a314a(0xff)](_0x651447);},Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x129)]=function(){const _0xaad8cd=_0x4572d1;if(!this[_0xaad8cd(0x12a)]())return;const _0x4d10cb=this[_0xaad8cd(0x189)]();let _0x35e1d4='';for(const _0x486f1d of _0x4d10cb){if(_0xaad8cd(0x15d)===_0xaad8cd(0x15d)){if([0x6c,0x198][_0xaad8cd(0x168)](_0x486f1d[_0xaad8cd(0x91)])){if(_0xaad8cd(0xe5)===_0xaad8cd(0xe5)){if(_0x35e1d4!=='')_0x35e1d4+='\x0a';_0x35e1d4+=_0x486f1d[_0xaad8cd(0xed)][0x0];}else _0x105546[_0xaad8cd(0xf7)]&&(_0x4ec40d[_0xaad8cd(0x1aa)]+=_0x1256d6);}}else{if(_0x1646fc!=='')_0x52d7c4+='\x0a';_0x1c88c8+=_0x337df0[_0xaad8cd(0xed)][0x0];}}this[_0xaad8cd(0xff)](_0x35e1d4);},Game_Event[_0x4572d1(0xdd)][_0x4572d1(0x1be)]=function(){this['_noReflection']=![];},Game_Event[_0x4572d1(0xdd)]['checkVisualParallaxesStringTags']=function(_0x3e4409){const _0x24b0e2=_0x4572d1,_0x4a26fa=VisuMZ['VisualParallaxes']['RegExp'];if(_0x3e4409[_0x24b0e2(0x134)](_0x4a26fa['NoReflection'])){if(_0x24b0e2(0x1a1)!=='KwgBo')for(const _0x450066 of _0xa7f49c){_0x450066[_0x24b0e2(0x7e)]=!![],this[_0x24b0e2(0x1bd)][_0x24b0e2(0x128)](_0x450066),_0x450066[_0x24b0e2(0x100)]['y']=-0.85;}else this['_noReflection']=!![];}};function Sprite_VisualParallax(){const _0x13ad6e=_0x4572d1;this[_0x13ad6e(0xb8)](...arguments);}Sprite_VisualParallax[_0x4572d1(0xdd)]=Object[_0x4572d1(0xbb)](TilingSprite['prototype']),Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0x145)]=Sprite_VisualParallax,Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0xb8)]=function(_0x4e06a5){const _0x70b497=_0x4572d1;this[_0x70b497(0x86)]=_0x4e06a5,TilingSprite[_0x70b497(0xdd)][_0x70b497(0xb8)][_0x70b497(0x112)](this),this[_0x70b497(0x188)](),this[_0x70b497(0xf3)](),this[_0x70b497(0xa6)][_0x70b497(0xce)](this[_0x70b497(0x10e)]['bind'](this));},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0xd5)]=function(){const _0x53a7e4=_0x4572d1;return $gameMap[_0x53a7e4(0x155)](this[_0x53a7e4(0x86)]);},Sprite_VisualParallax['prototype'][_0x4572d1(0x188)]=function(){const _0x2b47fd=_0x4572d1;this[_0x2b47fd(0x13d)]=0x0,this[_0x2b47fd(0x105)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this[_0x2b47fd(0x11b)]&&(this[_0x2b47fd(0x11b)]=[]),this[_0x2b47fd(0x11b)][_0x2b47fd(0xaf)](this['_colorFilter']);},Sprite_VisualParallax['prototype'][_0x4572d1(0x12c)]=function(){const _0xb8aceb=_0x4572d1;!this[_0xb8aceb(0x92)]&&(_0xb8aceb(0x182)===_0xb8aceb(0x182)?this[_0xb8aceb(0x188)]():_0x27a058[_0xb8aceb(0x93)]=!![]),this['_colorFilter'][_0xb8aceb(0xe3)](this[_0xb8aceb(0x13d)]),this[_0xb8aceb(0x92)][_0xb8aceb(0x15c)](this['_colorTone']);},Sprite_VisualParallax[_0x4572d1(0xdd)]['loadBitmap']=function(){const _0x11243f=_0x4572d1;this[_0x11243f(0xf8)]=this['settings']()[_0x11243f(0xb5)],this[_0x11243f(0xa6)]=ImageManager[_0x11243f(0x154)](this[_0x11243f(0xf8)]);},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0x10e)]=function(){const _0x29ebb2=_0x4572d1;this[_0x29ebb2(0xc5)]=new Sprite(),this['createMaskBitmap']();},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0x161)]=function(){const _0x3ffa4d=_0x4572d1;this['_maskSprite']['bitmap']&&(this[_0x3ffa4d(0xc5)][_0x3ffa4d(0xa6)][_0x3ffa4d(0x146)](),this['removeChild'](this['_maskSprite']));this[_0x3ffa4d(0x7d)]=undefined;const _0x445d2c=this[_0x3ffa4d(0xd5)]()[_0x3ffa4d(0xbf)],_0x3e13bd=this[_0x3ffa4d(0xd5)]()[_0x3ffa4d(0x119)];if(_0x445d2c['length']<=0x0&&_0x3e13bd[_0x3ffa4d(0x158)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x3ffa4d(0x81)]())return;const _0x130199=$gameMap[_0x3ffa4d(0xae)](),_0x537779=$gameMap[_0x3ffa4d(0xf4)](),_0x29eaf3=$gameMap[_0x3ffa4d(0xb9)](),_0x2f87ab=$gameMap[_0x3ffa4d(0x85)]();this[_0x3ffa4d(0xc5)]['bitmap']=new Bitmap(_0x130199*_0x29eaf3,_0x537779*_0x2f87ab);for(let _0x5ac1a4=0x0;_0x5ac1a4<_0x130199;_0x5ac1a4++){for(let _0x34e0aa=0x0;_0x34e0aa<_0x537779;_0x34e0aa++){(_0x445d2c['includes']($gameMap[_0x3ffa4d(0x14f)](_0x5ac1a4,_0x34e0aa))||_0x3e13bd[_0x3ffa4d(0x168)]($gameMap['terrainTag'](_0x5ac1a4,_0x34e0aa)))&&this[_0x3ffa4d(0xc5)][_0x3ffa4d(0xa6)]['fillRect'](_0x5ac1a4*_0x29eaf3,_0x34e0aa*_0x2f87ab,_0x29eaf3,_0x2f87ab,_0x3ffa4d(0xfb));}}this[_0x3ffa4d(0x7d)]=this[_0x3ffa4d(0xc5)],this[_0x3ffa4d(0x128)](this[_0x3ffa4d(0xc5)]);},Sprite_VisualParallax['prototype'][_0x4572d1(0x14b)]=function(){const _0x27e109=_0x4572d1;TilingSprite[_0x27e109(0xdd)][_0x27e109(0x14b)][_0x27e109(0x112)](this);if(!this[_0x27e109(0xa6)])return;this[_0x27e109(0x8c)](),this[_0x27e109(0x1ae)](),this[_0x27e109(0xd2)](),this['updateHue'](),this[_0x27e109(0xd3)](),this['updateMask']();},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0x8c)]=function(){const _0x50f714=_0x4572d1;this['opacity']=this['settings']()[_0x50f714(0x196)];},Sprite_VisualParallax[_0x4572d1(0xdd)]['updateOrigin']=function(){const _0x303142=_0x4572d1;this[_0x303142(0x87)]['x']=$gameMap[_0x303142(0xc6)](this[_0x303142(0x86)]),this[_0x303142(0x87)]['y']=$gameMap[_0x303142(0xbd)](this['_id']);},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0xd2)]=function(){const _0x4cad0e=_0x4572d1;this['blendMode']=this['settings']()[_0x4cad0e(0x16d)];},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0xe0)]=function(){const _0x31b32c=_0x4572d1;this[_0x31b32c(0xe3)](this[_0x31b32c(0xd5)]()[_0x31b32c(0xa2)]);},Sprite_VisualParallax[_0x4572d1(0xdd)][_0x4572d1(0xe3)]=function(_0xd756af){const _0x2eab83=_0x4572d1;this[_0x2eab83(0x13d)]!==Number(_0xd756af)&&(this['_hue']=Number(_0xd756af),this[_0x2eab83(0x12c)]());},Sprite_VisualParallax['prototype'][_0x4572d1(0xd3)]=function(){const _0x5df582=_0x4572d1;this[_0x5df582(0x15c)](this[_0x5df582(0xd5)]()[_0x5df582(0xc9)]);},Sprite_VisualParallax[_0x4572d1(0xdd)]['setColorTone']=function(_0x1288b5){const _0x3abc3a=_0x4572d1;if(!(_0x1288b5 instanceof Array))throw new Error(_0x3abc3a(0xe2));if(!this['_colorTone'][_0x3abc3a(0x1bc)](_0x1288b5)){if(_0x3abc3a(0x15a)===_0x3abc3a(0x10b)){const _0x332db4=_0x20ad7e(_0x3dc70f['$1'])[_0x3abc3a(0x183)](',')[_0x3abc3a(0xea)](_0x585e7f=>_0x270743(_0x585e7f)||0x1);_0x27a7af[_0x3abc3a(0xbf)]=_0x332db4;}else this[_0x3abc3a(0x105)]=_0x1288b5[_0x3abc3a(0x156)](),this['_updateColorFilter']();}},Sprite_VisualParallax['prototype'][_0x4572d1(0x135)]=function(){const _0x41f198=_0x4572d1;if(!this[_0x41f198(0x7d)])return;this['_maskSprite']['x']=Math[_0x41f198(0x138)](-$gameMap['displayX']()*$gameMap[_0x41f198(0xb9)]()),this['_maskSprite']['y']=Math[_0x41f198(0x138)](-$gameMap[_0x41f198(0x141)]()*$gameMap['tileHeight']());},VisuMZ['VisualParallaxes'][_0x4572d1(0x1b4)]=Spriteset_Map[_0x4572d1(0xdd)]['createParallax'],Spriteset_Map[_0x4572d1(0xdd)]['createParallax']=function(){const _0x3d4b67=_0x4572d1;VisuMZ[_0x3d4b67(0xb4)][_0x3d4b67(0x1b4)]['call'](this);if(!$gameMap['getWaterReflectionTop']())this[_0x3d4b67(0x7f)]();if(!$gameMap[_0x3d4b67(0x122)]())this['createSolidReflectionLayer']();this['createParallaxContainer'](),this['createParallaxLayers'](),this['sortVisualParallaxes']();if($gameMap[_0x3d4b67(0x1a2)]())this[_0x3d4b67(0x7f)]();if($gameMap[_0x3d4b67(0x122)]())this[_0x3d4b67(0xee)]();},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x7f)]=function(){const _0x5ae0d7=_0x4572d1;if(!PIXI[_0x5ae0d7(0x11b)])return;if($gameMap[_0x5ae0d7(0xcf)]()||$gameMap['isLoopVertical']())return;if($gameMap[_0x5ae0d7(0xbe)]())return;this[_0x5ae0d7(0x83)]=new Sprite(),this[_0x5ae0d7(0x18e)]['addChild'](this['_waterReflectLayer']),this[_0x5ae0d7(0x83)][_0x5ae0d7(0x11b)]=[],this[_0x5ae0d7(0x83)][_0x5ae0d7(0x196)]=$gameMap[_0x5ae0d7(0x185)](),!!PIXI[_0x5ae0d7(0x11b)][_0x5ae0d7(0x130)]&&(_0x5ae0d7(0x12f)!==_0x5ae0d7(0x11d)?this['_waterReflectLayer']['_reflectFilter']=new PIXI[(_0x5ae0d7(0x11b))][(_0x5ae0d7(0x130))]({'boundary':$gameMap[_0x5ae0d7(0xdc)](),'amplitude':$gameMap[_0x5ae0d7(0xc3)](),'waveLength':$gameMap[_0x5ae0d7(0xd6)](),'mirror':![]}):(this[_0x5ae0d7(0x13d)]=0x0,this[_0x5ae0d7(0x105)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new _0xd34cc7(),!this[_0x5ae0d7(0x11b)]&&(this['filters']=[]),this[_0x5ae0d7(0x11b)][_0x5ae0d7(0xaf)](this[_0x5ae0d7(0x92)]))),!!PIXI['filters'][_0x5ae0d7(0x198)]&&(this[_0x5ae0d7(0x83)]['_blurFilter']=new PIXI[(_0x5ae0d7(0x11b))]['BlurFilter']($gameMap[_0x5ae0d7(0x10a)]()),this[_0x5ae0d7(0x83)][_0x5ae0d7(0x11b)]['push'](this[_0x5ae0d7(0x83)][_0x5ae0d7(0x106)])),this[_0x5ae0d7(0xa0)]();},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0xa0)]=function(){const _0x140b46=_0x4572d1,_0x59698a=$gameMap[_0x140b46(0x127)](),_0x391340=$gameMap[_0x140b46(0x13c)](),_0x118dc3=this['createReflectionMask'](_0x59698a,_0x391340);_0x118dc3&&(_0x140b46(0xb1)===_0x140b46(0x139)?(this[_0x140b46(0x87)]['x']=_0x375740[_0x140b46(0xc6)](this['_id']),this[_0x140b46(0x87)]['y']=_0x555877[_0x140b46(0xbd)](this[_0x140b46(0x86)])):(this['addChild'](_0x118dc3),this[_0x140b46(0x83)][_0x140b46(0x7d)]=_0x118dc3));},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0xee)]=function(){const _0x4235d9=_0x4572d1;if(!PIXI['filters'])return;if($gameMap[_0x4235d9(0xcf)]()||$gameMap[_0x4235d9(0x81)]())return;if($gameMap[_0x4235d9(0xbe)]())return;this['_solidReflectLayer']=new Sprite(),this['_baseSprite'][_0x4235d9(0x128)](this['_solidReflectLayer']),this[_0x4235d9(0x1bd)]['filters']=[],this[_0x4235d9(0x1bd)]['opacity']=$gameMap[_0x4235d9(0xd1)](),!!PIXI['filters']['BlurFilter']&&(this[_0x4235d9(0x1bd)]['_blurFilter']=new PIXI[(_0x4235d9(0x11b))][(_0x4235d9(0x198))]($gameMap['getSolidReflectionBlur']()),this['_solidReflectLayer'][_0x4235d9(0x11b)][_0x4235d9(0xaf)](this[_0x4235d9(0x1bd)][_0x4235d9(0x106)])),this[_0x4235d9(0x98)]();},Spriteset_Map[_0x4572d1(0xdd)]['createSolidReflectionMask']=function(){const _0x119d3b=_0x4572d1,_0x2a1ee4=$gameMap[_0x119d3b(0x122)](),_0x452a2f=$gameMap[_0x119d3b(0x178)](),_0x540b0c=this[_0x119d3b(0xcd)](_0x2a1ee4,_0x452a2f);_0x540b0c&&(this[_0x119d3b(0x128)](_0x540b0c),this['_solidReflectLayer'][_0x119d3b(0x7d)]=_0x540b0c);},Spriteset_Map['prototype'][_0x4572d1(0xcd)]=function(_0x334eac,_0x776e23){const _0x3d506d=_0x4572d1;if(_0x334eac['length']<=0x0&&_0x776e23[_0x3d506d(0x158)]<=0x0)return null;const _0x286b09=$gameMap['width'](),_0x42d149=$gameMap[_0x3d506d(0xf4)](),_0x2a2a77=$gameMap[_0x3d506d(0xb9)](),_0x102ca4=$gameMap[_0x3d506d(0x85)](),_0x519412=0x0,_0x1ff0cd=_0x519412*0x2,_0x4fd87c=new Sprite();_0x4fd87c[_0x3d506d(0xa6)]=new Bitmap(_0x286b09*_0x2a2a77,_0x42d149*_0x102ca4);for(let _0x1b1c97=0x0;_0x1b1c97<_0x286b09;_0x1b1c97++){for(let _0x453f0f=0x0;_0x453f0f<_0x42d149;_0x453f0f++){(_0x334eac[_0x3d506d(0x168)]($gameMap[_0x3d506d(0x14f)](_0x1b1c97,_0x453f0f))||_0x776e23[_0x3d506d(0x168)]($gameMap[_0x3d506d(0x123)](_0x1b1c97,_0x453f0f)))&&_0x4fd87c[_0x3d506d(0xa6)][_0x3d506d(0xb2)](_0x1b1c97*_0x2a2a77+_0x519412,_0x453f0f*_0x102ca4+_0x519412,_0x2a2a77-_0x1ff0cd,_0x102ca4-_0x1ff0cd,'#ffffff');}}return _0x4fd87c;},VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0x18b)]=Spriteset_Map['prototype'][_0x4572d1(0x110)],Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x110)]=function(){const _0x343b94=_0x4572d1;VisuMZ[_0x343b94(0xb4)]['Spriteset_Map_createCharacters'][_0x343b94(0x112)](this),this['createCharacterReflections']();},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x1a8)]=function(){const _0x3e1081=_0x4572d1;if($gameMap['noReflections']())return;const _0x1ba3d9=[],_0x47aa0a=[];for(const _0x32f205 of $gameMap[_0x3e1081(0x1bb)]()){if(_0x32f205[_0x3e1081(0x89)])continue;_0x1ba3d9['push'](new Sprite_Character(_0x32f205)),_0x47aa0a['push'](new Sprite_Character(_0x32f205));}for(const _0x49ad0b of $gameMap[_0x3e1081(0x10f)]()){if(_0x3e1081(0x132)!==_0x3e1081(0x101))_0x1ba3d9['push'](new Sprite_Character(_0x49ad0b)),_0x47aa0a[_0x3e1081(0xaf)](new Sprite_Character(_0x49ad0b));else return!![];}for(const _0x13d3b1 of $gamePlayer[_0x3e1081(0xf5)]()[_0x3e1081(0xf1)]()){_0x3e1081(0x157)===_0x3e1081(0x157)?(_0x1ba3d9[_0x3e1081(0xaf)](new Sprite_Character(_0x13d3b1)),_0x47aa0a['push'](new Sprite_Character(_0x13d3b1))):(_0x39ef46['_parallaxLoopX']=!![],_0x533f72[_0x3e1081(0x111)]=_0x2297a7(_0x1cff0b['$1'])||0x0);}_0x1ba3d9[_0x3e1081(0xaf)](new Sprite_Character($gamePlayer)),_0x47aa0a[_0x3e1081(0xaf)](new Sprite_Character($gamePlayer));if(this[_0x3e1081(0x83)])for(const _0x40c4a3 of _0x1ba3d9){_0x40c4a3['_reflection']=!![],this[_0x3e1081(0x83)][_0x3e1081(0x128)](_0x40c4a3),_0x40c4a3[_0x3e1081(0x100)]['y']=-0.85,_0x40c4a3[_0x3e1081(0x11b)]=_0x40c4a3[_0x3e1081(0x11b)]||[],this['_waterReflectLayer'][_0x3e1081(0x14d)]&&(_0x3e1081(0x13a)===_0x3e1081(0x153)?(this[_0x3e1081(0xc5)]=new _0x211b18(),this[_0x3e1081(0x161)]()):_0x40c4a3['filters'][_0x3e1081(0xaf)](this[_0x3e1081(0x83)][_0x3e1081(0x14d)]));}if(this[_0x3e1081(0x1bd)])for(const _0x14cb7e of _0x47aa0a){_0x14cb7e[_0x3e1081(0x7e)]=!![],this[_0x3e1081(0x1bd)][_0x3e1081(0x128)](_0x14cb7e),_0x14cb7e[_0x3e1081(0x100)]['y']=-0.85;}},VisuMZ[_0x4572d1(0xb4)][_0x4572d1(0xe6)]=Spriteset_Map['prototype']['update'],Spriteset_Map[_0x4572d1(0xdd)]['update']=function(){const _0x30ef12=_0x4572d1;VisuMZ[_0x30ef12(0xb4)]['Spriteset_Map_update'][_0x30ef12(0x112)](this),this['updateWaterReflections'](),this[_0x30ef12(0x13b)]();},Spriteset_Map[_0x4572d1(0xdd)]['updateWaterReflections']=function(){const _0x18325e=_0x4572d1;if(!this[_0x18325e(0x83)])return;this[_0x18325e(0x83)][_0x18325e(0x14d)]&&(this[_0x18325e(0x83)][_0x18325e(0x14d)][_0x18325e(0x82)]+=0.05);const _0x21cc68=this[_0x18325e(0x83)][_0x18325e(0x124)];if(_0x21cc68){if(_0x18325e(0xa4)==='OEAuT')return this[_0x18325e(0x14a)]&&this[_0x18325e(0x14a)]instanceof _0x341c86;else _0x21cc68['x']=Math[_0x18325e(0x138)](-$gameMap[_0x18325e(0x125)]()*$gameMap['tileWidth']()),_0x21cc68['y']=Math[_0x18325e(0x138)](-$gameMap[_0x18325e(0x141)]()*$gameMap[_0x18325e(0x85)]());}},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x13b)]=function(){const _0x29d5fe=_0x4572d1;if(!this[_0x29d5fe(0x1bd)])return;const _0x5248b6=this[_0x29d5fe(0x1bd)][_0x29d5fe(0x124)];_0x5248b6&&(_0x5248b6['x']=Math[_0x29d5fe(0x138)](-$gameMap[_0x29d5fe(0x125)]()*$gameMap[_0x29d5fe(0xb9)]()),_0x5248b6['y']=Math[_0x29d5fe(0x138)](-$gameMap[_0x29d5fe(0x141)]()*$gameMap[_0x29d5fe(0x85)]()));},Spriteset_Map[_0x4572d1(0xdd)]['createParallaxContainer']=function(){const _0x4a367a=_0x4572d1;this[_0x4a367a(0x165)]=new Sprite(),this[_0x4a367a(0x18e)]['addChild'](this[_0x4a367a(0x165)]),this[_0x4a367a(0x160)]=[null];},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0xc7)]=function(){const _0x355382=$gameMap['getVisualParallaxes']();for(const _0x21bfe5 of _0x355382){if(!_0x21bfe5)continue;this['createNewParallaxLayer'](_0x21bfe5);}},Spriteset_Map['prototype'][_0x4572d1(0x16c)]=function(_0x500fef){const _0x546b0d=_0x4572d1;if(!_0x500fef)return;const _0x404e1f=new Sprite_VisualParallax(_0x500fef['id']);_0x404e1f[_0x546b0d(0x117)](0x0,0x0,Graphics[_0x546b0d(0xae)],Graphics[_0x546b0d(0xf4)]),this['_parallaxContainer']['addChild'](_0x404e1f);},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x116)]=function(){const _0x23e332=_0x4572d1;this[_0x23e332(0x165)][_0x23e332(0xbc)]['sort']((_0x1891c8,_0x468acf)=>_0x1891c8[_0x23e332(0x86)]-_0x468acf[_0x23e332(0x86)]);},Spriteset_Map[_0x4572d1(0xdd)][_0x4572d1(0x120)]=function(_0x3d1acf){const _0x22e41b=_0x4572d1;return this[_0x22e41b(0x165)][_0x22e41b(0xbc)]['find'](_0x4a78d6=>_0x4a78d6[_0x22e41b(0x86)]===_0x3d1acf);},Spriteset_Map[_0x4572d1(0xdd)]['removeVisualParallaxLayer']=function(_0x209890){const _0x3b819f=_0x4572d1,_0xa01e01=this[_0x3b819f(0x120)](_0x209890);_0xa01e01&&this[_0x3b819f(0x165)]['removeChild'](_0xa01e01);},Spriteset_Map[_0x4572d1(0xdd)]['updateVisualParallaxLayer']=function(_0x2202b1,_0x1d6516){const _0x530620=_0x4572d1,_0xd50000=this[_0x530620(0x120)](_0x2202b1);!_0xd50000?(this['createNewParallaxLayer']($gameMap['getVisualParallaxSettings'](_0x2202b1)),this[_0x530620(0x116)]()):(_0xd50000[_0x530620(0xf3)](),_0x1d6516&&_0xd50000['bitmap'][_0x530620(0xce)](_0xd50000[_0x530620(0x161)][_0x530620(0x94)](_0xd50000)));};