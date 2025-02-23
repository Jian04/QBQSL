//=============================================================================
// MPP_Pseudo3DBattle.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A function to move the camera three-dimensionally during battle is added.
 * @author Mokusei Penguin
 * @url
 * 
 * @help [version 1.0.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ※ Note
 *  1. This plugin is not compatible with plugins that move or change
 *     the shape of combat characters. We cannot handle conflicts
 *     with such plugins.
 *  2. Due to the fact that 2D images are used originally,
 *     not all images can be supported.
 *  3. It is not designed to change the screen size.
 *  4. If you place an enemy character in the lower left (or lower right),
 *     you may see the edges of the background. Avoid placement or adjust
 *     with plugin parameters.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command enemyFocus
 *      @desc In the item to enter a numerical value, select the text and write v[N] to refer to the variable N.
 *      @arg index
 *          @desc -1:Entire Troop
 *          @type number
 *              @min -1
 *              @max 7
 *          @default 0
 *      @arg scale
 *          @desc 100:1x
 *          @type number
 *              @min 50
 *              @max 150
 *          @default 100
 *      @arg duration
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 *  @command actorFocus
 *      @desc In the item to enter a numerical value, select the text and write v[N] to refer to the variable N.
 *      @arg id
 *          @text ID
 *          @desc 0:Entire Party
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 1
 *      @arg scale
 *          @desc 100:1x
 *          @type number
 *              @min 50
 *              @max 150
 *          @default 100
 *      @arg duration
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 *  @command moveHome
 *      @desc In the item to enter a numerical value, select the text and write v[N] to refer to the variable N.
 *      @arg duration
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 * 
 * 
 *  @param Battleback Scale
 *      @desc Increase the value slightly only if you can see the edges of the background.
 *      @type number
 *          @min 1.0
 *          @max 9.9
 *          @decimals 1
 *      @default 1.3
 * 
 *  @param Drift Delay
 *      @desc No changes are needed unless you have a good reason.
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 120
 * 
 *  @param Battleback2 Pivot Y Fixes
 *      @desc If you don't like the position of the origin Y in the battle background, set it.
 *      @type struct<Battleback>[]
 *      @default ["{\"Battleback2 Image\":\"Town2\",\"Pivot Y\":\"182\"}"]
 * 
 */

/*~struct~Battleback:
 *  @param Battleback2 Image
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/battlebacks2
 *      @default 
 *
 *  @param Pivot Y
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 9999
 *      @default 256
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘中、立体的にカメラが移動する機能が追加されます。
 * @author 木星ペンギン
 * @url
 * 
 * @help [version 1.0.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ※ 注意
 *  1. 本プラグインは戦闘キャラを移動させたり、形を変えるプラグインとの相性は
 *     よくないです。そういったプラグインとの競合には対応できません。
 *  2. もともと2D用の画像を使用している都合上、全ての画像には対応できていません。
 *  3. 画面サイズの変更を想定した作りにはなっていません。
 *  4. 敵キャラを左下（または右下）に配置すると、背景の端が見えることがあります。
 *     配置を避けるか、プラグインパラメータで調整してください。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command enemyFocus
 *      @text 敵キャラフォーカス
 *      @desc 数値を入力する項目で、テキストを選択して v[N] と記述することで変数N番を参照します。
 *      @arg index
 *          @text インデックス
 *          @desc -1:敵全体
 *          @type number
 *              @min -1
 *              @max 7
 *          @default 0
 *      @arg scale
 *          @text 拡大率
 *          @desc 100:等倍
 *          @type number
 *              @min 50
 *              @max 150
 *          @default 100
 *      @arg duration
 *          @text 時間
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 *  @command actorFocus
 *      @text アクターフォーカス
 *      @desc 数値を入力する項目で、テキストを選択して v[N] と記述することで変数N番を参照します。
 *      @arg id
 *          @text ID
 *          @desc 0:味方全体
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 1
 *      @arg scale
 *          @text 拡大率
 *          @desc 100:等倍
 *          @type number
 *              @min 50
 *              @max 150
 *          @default 100
 *      @arg duration
 *          @text 時間
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 *  @command moveHome
 *      @text ホームに移動
 *      @desc 数値を入力する項目で、テキストを選択して v[N] と記述することで変数N番を参照します。
 *      @arg duration
 *          @text 時間
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 60
 * 
 * 
 *  @param Battleback Scale
 *      @text 戦闘背景 拡大率
 *      @desc 背景の端が見えてしまう場合に限り、値を少し上げてください。
 *      @type number
 *          @min 1.0
 *          @max 9.9
 *          @decimals 1
 *      @default 1.3
 * 
 *  @param Drift Delay
 *      @text ドリフトディレイ
 *      @desc 理由がない限り、変更の必要はありません。
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 120
 * 
 *  @param Battleback2 Pivot Y Fixes
 *      @text 戦闘背景2 原点Y修正
 *      @desc 戦闘背景の原点Yの位置が気に入らない場合、設定してください。
 *      @type struct<Battleback>[]
 *      @default ["{\"Battleback2 Image\":\"Town2\",\"Pivot Y\":\"182\"}"]
 * 
 */

/*~struct~Battleback:ja
 *  @param Battleback2 Image
 *      @text 戦闘背景2 画像
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/battlebacks2
 *      @default 
 *
 *  @param Pivot Y
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 9999
 *      @default 256
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_Pseudo3DBattle';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const reviverParse = function(key, value) {
        try {
            return JSON.parse(value, reviverParse);
        } catch (e) {
            return value;
        }
    };
    const param_BattlebackScale = Number(parameters['Battleback Scale'] || 1.3);
    const param_DriftDelay = Number(parameters['Drift Delay'] || 0);
    const param_Battleback2PivotYFixes = JSON.parse(parameters['Battleback2 Pivot Y Fixes'] || '[]', reviverParse);
    
    //-------------------------------------------------------------------------
    // Pseudo3DBattle

    function Pseudo3DBattle() {
        throw new Error('This is a static class');
    }

    Pseudo3DBattle._driftBase = { x: 20, y: 8, altitude: 16, skew: 0.25 };
    Pseudo3DBattle._moveMethods = {
        // ここのメソッドは Pseudo3DBattle を this として呼び出します。
        setup() {
            return { altitude: 50, scale: 0.7 };
        },

        startBattle() {
            return { duration: 150 };
        },

        home(duration = 60) {
            return { duration, type: 'Slow start and end' };
        },

        inputting(user) {
            const pos = this.targets2dPosition([user]);
            if (!pos) return {};
            return {
                x: this.bringInsideX(pos.x),
                y: pos.y,
                altitude: -20,
                scale: 1.15,
                duration: 30
            };
        },

        targeting(targets) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return {};
            if ($gameSystem.isSideView()) {
                pos.x = this.bringInsideX(pos.x);
            } else {
                pos.y = this.bringInsideYByRate(pos.y, 0.6);
            }
            return {
                x: pos.x,
                y: pos.y,
                altitude: targets.length > 1 ? 10 : -10,
                scale: targets.length > 1 ? 1 : 1.15,
                duration: 30
            };
        },

        endTargeting() {
            return { duration: 24 };
        },

        startAction(user) {
            if ($gameSystem.isSideView()) return null;
            const pos = this.targets2dPosition([user]);
            if (!pos) return null;
            return {
                x: this.bringInsideXByRate(pos.x, 0.7),
                y: this.bringInsideYByRate(pos.y, 0.2),
                scale: 1.05,
                duration: 24
            };
        },

        showAnimation(targets) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return null;
            if (!$gameSystem.isSideView()) {
                pos.y = this.bringInsideYByRate(pos.y, 0.2);
            }
            return {
                x: this.bringInsideXByRate(pos.x, 0.5),
                y: pos.y,
                altitude: -20,
                scale: targets.length > 1 ? 1.1 : 1.15,
                duration: 24
            };
        },

        damage(target) {
            const pos = this.targets2dPosition([target]);
            if (!pos) return null;
            if (!$gameSystem.isSideView()) {
                pos.y = this.bringInsideYByRate(pos.y, 0.2);
            }
            return {
                x: this.bringInsideXByRate(pos.x, 0.5),
                y: pos.y,
                altitude: -20,
                scale: 1.15,
                duration: 30,
                type: 'Slow start and end'
            };
        },

        collapse(target) {
            const pos = this.targets2dPosition([target]);
            if (!pos) return null;
            if (!$gameSystem.isSideView()) {
                pos.y = this.bringInsideYByRate(pos.y, 0.3);
            }
            return {
                x: this.bringInsideXByRate(pos.x, 0.6),
                y: pos.y,
                altitude: -20,
                scale: 1.2,
                duration: 12
            };
        },

        endAction() {
            return { duration: 30, type: 'Slow start and end' };
        },

        driftOn() {
            return {}; // dummy
        },

        driftOff() {
            return {}; // dummy
        },

        victory() {
            const pos = this.targets2dPosition($gameParty.members());
            if (!pos) return {};
            return {
                x: this.bringInsideX(pos.x),
                y: pos.y,
                altitude: -10,
                scale: 1.2,
                skew: pos.x < this.centerX() ? -0.2 : 0.2,
                duration: 90,
                type: 'Slow start and end'
            };
        },

        escape() {
            return {
                x: this.centerX(),
                y: this.centerY(),
                altitude: $gameSystem.isSideView() ? 50 : 20,
                scale: $gameSystem.isSideView() ? 0.87 : 0.8,
                duration: 120
            };
        },

        defeat() {
            return {
                x: this.centerX(),
                y: this.centerY(),
                altitude: 40,
                scale: 0.8,
                duration: 240
            };
        },
        
        focus(targets, scale, duration) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return null;
            return {
                x: this.bringInsideXByRate(pos.x, 0.5),
                y: pos.y,
                altitude: -10,
                scale,
                duration
            }
        }

    };
    
    Pseudo3DBattle.initMembers = function() {
        this._centerX = Graphics.boxWidth / 2;
        this._centerY = Graphics.boxHeight / 2 + 32;
        this._homeMoveParams = {
            x: this._centerX,
            y: this._centerY,
            altitude: 0,
            scale: 1.0,
            skew: 0,
            duration: 50,
            type: 'Slow end'
        };
        this._baseDisplayX = this._centerX;
        this._baseDisplayY = this._centerY;
        this._baseAltitude = 0;
        this._baseScale = 1.0;
        this._baseSkew = 0;
        this._moveDuration = 0;
        this._easingType = null;
        this.clearMoveCommands();
        this.clearMoveParams();
        this.clearDriftParams();
    };

    Pseudo3DBattle.clearMoveCommands = function() {
        this._commands = [];
    };
    
    Pseudo3DBattle.clearMoveParams = function() {
        this._targetingMoveParams = null;
        this._actionMoveParams = null;
        this._waitMoveParams = {};
    };
    
    Pseudo3DBattle.clearDriftParams = function() {
        const value = {
            current: 0,
            target: 0,
            duration: param_DriftDelay,
            wholeDuration: param_DriftDelay
        };
        this._drift = Object.assign(
            ...Object.keys(this._driftBase).map(key => ({ [key]:{...value} }))
        );
        this._isDrift = true;
    };
    
    Pseudo3DBattle.onBattleStart = function() {
        this.clearMoveCommands();
        this.clearMoveParams();
        this.clearDriftParams();
    };
    
    Pseudo3DBattle.driftOn = function() {
        if (!this._isDrift) {
            this._isDrift = true;
            this.refreahDrift();
        }
    };
    
    Pseudo3DBattle.driftOff = function() {
        if (this._isDrift) {
            this._isDrift = false;
            this.refreahDrift();
        }
    };
    
    Pseudo3DBattle.refreahDrift = function() {
        for (const [key, value] of Object.entries(this._drift)) {
            this.setupDriftParams(key, value)
        }
    };
    
    Pseudo3DBattle.isAction = function() {
        return !!this._actionMoveParams;
    };
    
    Pseudo3DBattle.isTargeting = function() {
        return !!this._targetingMoveParams;
    };
    
    Pseudo3DBattle.centerX = function() {
        return this._centerX;
    };
    
    Pseudo3DBattle.centerY = function() {
        return this._centerY;
    };
    
    Pseudo3DBattle.displayX = function() {
        return this._baseDisplayX + this._drift.x.current;
    };
    
    Pseudo3DBattle.displayY = function() {
        return this._baseDisplayY + this._drift.y.current;
    };
    
    Pseudo3DBattle.altitude = function() {
        return this._baseAltitude + this._drift.altitude.current;
    };
    
    Pseudo3DBattle.scaleX = function() {
        return this._baseScale;
    };

    Pseudo3DBattle.scaleY = function() {
        return (this._baseScale + this.altitude() / 100) / Math.cos(this.skew());
    };

    Pseudo3DBattle.skew = function() {
        const skew = this._baseSkew + this._drift.skew.current;
        const realSkew = skew + (this._centerX - this.displayX()) / 1000;
        return Math.max(Math.min(realSkew, 1), -1);
    };

    Pseudo3DBattle.adjustPosition = function(x, y) {
        const displayX = this.displayX();
        const displayY = this.displayY();
        const scaleX = this.scaleX();
        const scaleY = this.scaleY();
        const radian = this.skew();
        const dy = (y - displayY) * scaleY;
        const sx = dy * Math.sin(radian);
        const sy = dy * Math.cos(radian) - dy;
        return {
            x: (x - displayX) * scaleX + this._centerX + sx,
            y: (y - displayY) * scaleY + this._centerY + sy,
            scale: scaleX + dy / 1500
        };
    };

    Pseudo3DBattle.targets2dPosition = function(targets) {
        const sprites = BattleManager._spriteset.makeTargetSprites(targets);
        return this.targetSprites2dPosition(sprites);
    };
    
    Pseudo3DBattle.targetSprites2dPosition = function(targetSprites) {
        if (targetSprites.length === 0) {
            return null;
        }
        const pos = targetSprites.reduce((pos, target) => {
            pos.x += target.targetGroundX();
            pos.y += target.targetGroundY();
            return pos;
        }, new Point());
        pos.x /= targetSprites.length;
        pos.y /= targetSprites.length;
        return pos;
    };
    
    Pseudo3DBattle.bringInsideX = function(x) {
        return x + (x < this._centerX ? 64 : -64);
    };
    
    Pseudo3DBattle.bringInsideXByRate = function(x, rate) {
        return (x - this._centerX) * rate + this._centerX;
    };
    
    Pseudo3DBattle.bringInsideYByRate = function(y, rate) {
        return (y - this._centerY) * rate + this._centerY;
    };
    
    Pseudo3DBattle.moveTo = function(params) {
        const realParams = { ...this._homeMoveParams, ...params };
        this._baseDisplayX = realParams.x;
        this._baseDisplayY = realParams.y;
        this._baseAltitude = realParams.altitude;
        this._baseScale = realParams.scale;
        this._baseSkew = realParams.skew;
        this._moveDuration = 0;
    };

    Pseudo3DBattle.moveForTargeting = function(params) {
        const realParams = { ...this._homeMoveParams, ...params };
        if (realParams.duration > 0) {
            this._targetingMoveParams = realParams;
            this._moveDuration = realParams.duration;
            this._convergeDuration = 0;
        }
    };

    Pseudo3DBattle.endTargeting = function(params) {
        if (this.isTargeting()) {
            this._targetingMoveParams = null;
            const realParams = { ...this.currentParams(), ...params };
            if (this.isAction()) {
                this.moveForAction(realParams);
            } else {
                this._waitMoveParams = {};
                this.moveForWait(realParams);
            }
        }
    };

    Pseudo3DBattle.moveForAction = function(params) {
        const realParams = { ...this._homeMoveParams, ...params };
        this._actionMoveParams = realParams;
        if (!this.isTargeting()) {
            this._moveDuration = realParams.duration;
            this._convergeDuration = 0;
            if (this._moveDuration === 0) {
                this.moveTo(realParams);
            }
        }
    };

    Pseudo3DBattle.endAction = function(params) {
        if (this.isAction()) {
            this._actionMoveParams = null;
            if (!this.isTargeting()) {
                const realParams = { ...this._waitMoveParams, ...params };
                this._waitMoveParams = {};
                this.moveForWait(realParams);
            }
        }
    };

    Pseudo3DBattle.moveForWait = function(params) {
        const realParams = { ...this._homeMoveParams, ...params };
        if (this.differentWaitParams(realParams)) {
            this._waitMoveParams = realParams;
            if (!this.isAction() && !this.isTargeting()) {
                this._moveDuration = realParams.duration;
                this._convergeDuration = 0;
                if (this._moveDuration === 0) {
                    this.moveTo(realParams);
                }
            }
        }
    };

    Pseudo3DBattle.differentWaitParams = function(params) {
        return ['x', 'y', 'altitude', 'scale', 'skew'].some(
            prop => this._waitMoveParams[prop] !== params[prop]
        );
    };

    Pseudo3DBattle.update = function() {
        this.updateMove();
        this.updateDrift();
    };
    
    Pseudo3DBattle.updateMove = function() {
        if (this._moveDuration > 0) {
            const d = this._moveDuration;
            this.updatePosition(d, this.currentParams());
            this._moveDuration--;
        }
    };
    
    Pseudo3DBattle.currentParams = function() {
        return (
            this._targetingMoveParams ||
            this._actionMoveParams ||
            this._waitMoveParams
        );
    };

    Pseudo3DBattle.updatePosition = function(d, params) {
        const { x, y, altitude, scale, skew, duration, type } = params;
        this._easingType = type || 'Slow end';
        this._baseDisplayX = this.applyEasing(this._baseDisplayX, x, d, duration);
        this._baseDisplayY = this.applyEasing(this._baseDisplayY, y, d, duration);
        this._baseAltitude = this.applyEasing(this._baseAltitude, altitude, d, duration);
        this._baseScale = this.applyEasing(this._baseScale, scale, d, duration);
        this._baseSkew = this.applyEasing(this._baseSkew, skew, d, duration);
    };
    
    Pseudo3DBattle.updateDrift = function() {
        this._easingType = 'Slow start and end';
        for (const [key, value] of Object.entries(this._drift)) {
            const { target, duration:d, wholeDuration:wd } = value;
            value.current = this.applyEasing(value.current, target, d, wd);
            value.duration--;
            if (value.duration === 0) {
                this.setupDriftParams(key, value);
            }
        }
    };
    
    Pseudo3DBattle.setupDriftParams = function(key, value) {
        value.target = this.driftTarget(key) * (Math.random() - 0.5);
        value.duration = 100 + Math.floor(100 * Math.random());
        value.wholeDuration = value.duration;
    };
    
    Pseudo3DBattle.driftTarget = function(key) {
        if (!this._isDrift) {
            return 0;
        }
        return (this._driftBase[key] || 0) / (this.isAction() ? 2 : 1);
    };
    
    Pseudo3DBattle.applyEasing = function(current, target, d, wd) {
        const lt = this.calcEasing((wd - d) / wd);
        const t = this.calcEasing((wd - d + 1) / wd);
        const start = (current - target * lt) / (1 - lt);
        return start + (target - start) * t;
    };
    
    Pseudo3DBattle.calcEasing = function(t) {
        switch (this._easingType) {
            case 'Slow start':
                return this.easeIn(t);
            case 'Slow end':
                return this.easeOut(t);
            case 'Slow start and end':
                return this.easeInOut(t);
            default:
                return t;
        }
    };
    
    Pseudo3DBattle.easeIn = function(t) {
        return Math.pow(t, 2);
    };
    
    Pseudo3DBattle.easeOut = function(t) {
        return 1 - Math.pow(1 - t, 2);
    };
    
    Pseudo3DBattle.easeInOut = function(t) {
        if (t < 0.5) {
            return this.easeIn(t * 2) / 2;
        } else {
            return this.easeOut(t * 2 - 1) / 2 + 0.5;
        }
    };
    
    Pseudo3DBattle.addCommand = function(methodName, args) {
        const func = this._moveMethods[methodName];
        if (typeof func === 'function') {
            const callback = func.bind(this, ...args);
            this._commands.push({ methodName, callback });
        }
    };
    
    Pseudo3DBattle.executeCommands = function() {
        while (this._commands.length > 0) {
            const { methodName, callback } = this._commands[0];
            const params = callback();
            if (params) {
                if (params.isWait && this._moveDuration > 0) {
                    return;
                }
                this.applyMoveParams(methodName, params);
            }
            this._commands.shift();
        }
    };
    
    Pseudo3DBattle.applyMoveParams = function(methodName, params) {
        switch (methodName) {
            case 'setup':
                return this.moveTo(params);
            case 'startBattle':
            case 'home':
            case 'inputting':
            case 'focus':
                return this.moveForWait(params);
            case 'targeting':
                return this.moveForTargeting(params);
            case 'endTargeting':
                return this.endTargeting(params);
            case 'driftOn':
                return this.driftOn();
            case 'driftOff':
                return this.driftOff();
            case 'endAction':
                return this.endAction(params);
            default:
                return this.moveForAction(params);
        }
    };

    //-------------------------------------------------------------------------
    // BattleManager

    BattleManager.callPseudo3dMethod = function(methodName, ...args) {
        // 戦闘キャラの移動が Sprite_Battler クラスで行われている都合上、
        // Spriteset_Battle.prototype.update で実行します。
        Pseudo3DBattle.addCommand(methodName, args);
    };
    
    /**
     * 別プラグインから視点操作を行うためのメソッドです。
     * @param {string} methodName - メソッド名。
     * @param {function} func - 移動先のパラメータを入れた連想配列を返す関数。
     *     この関数は Pseudo3DBattle を this として呼び出されます。
     *     設定可能なパラメータ。
     *         [x] : 移動先のX座標。(デフォルト戦闘時の画面座標)
     *         [y] : 移動先のY座標。(同上)
     *         [altitude] : 視点の高さ。0がデフォルト。-50～50を推奨。
     *         [scale] : 拡大率。1.0がデフォルト。小さくしすぎると背景の端が見える可能性あり。
     *         [skew] : 傾き。-1.0～1.0で指定。
     *         [duration] : 時間。(フレーム数)
     *         [isWait] : true で前の移動が終わってから実行。
     *         [type] : イージングタイプ。(ピクチャにあるものと同じ)
     *             'Constant speed' : 一定速度。
     *             'Slow start' : ゆっくり始まる。
     *             'Slow end' : ゆっくり終わる。(デフォルト)
     *             'Slow start and end' : ゆっくり始まってゆっくり終わる。
     */
    BattleManager.registerPseudo3dMethod = function(methodName, func) {
        Pseudo3DBattle._moveMethods[methodName] = func;
    };
    
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.apply(this, arguments);
        Pseudo3DBattle.onBattleStart();
        this.callPseudo3dMethod('setup');
        this.callPseudo3dMethod('startBattle');
    };
    
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        _BattleManager_startAction.apply(this, arguments);
        BattleManager.callPseudo3dMethod('startAction', this._subject);
    };
    
    const _BattleManager_endBattlerActions = BattleManager.endBattlerActions;
    BattleManager.endBattlerActions = function(battler) {
        _BattleManager_endBattlerActions.apply(this, arguments);
        BattleManager.callPseudo3dMethod('endAction');
    };
    
    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.apply(this, arguments);
        this.callPseudo3dMethod('victory');
    };
    
    const _BattleManager_processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function() {
        const success = _BattleManager_processEscape.apply(this, arguments);
        this.callPseudo3dMethod('escape');
        return success;
    };
    
    const _BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function() {
        _BattleManager_processDefeat.apply(this, arguments);
        this.callPseudo3dMethod('defeat');
        this.callPseudo3dMethod('driftOff');
    };
    
    //-------------------------------------------------------------------------
    // Sprite_Battler

    Sprite_Battler.prototype.targetGroundX = function() {
        return this._homeX + (this._targetOffsetX || 0);
    };
    
    Sprite_Battler.prototype.targetGroundY = function() {
        return this._homeY + (this._targetOffsetY || 0);
    };
    
    Sprite_Battler.prototype.reset2dPosition = function() {
        this.updatePosition();
        this.scale.set(1);
    };
    
    Sprite_Battler.prototype.convertPseudo3dPosition = function() {
        const pos3d = Pseudo3DBattle.adjustPosition(this.x, this.y);
        this.x = pos3d.x;
        this.y = pos3d.y;
        this.scale.x *= pos3d.scale;
        this.scale.y *= pos3d.scale;
    };
    
    const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
    Sprite_Battler.prototype.createDamageSprite = function() {
        const last = this._damages[this._damages.length - 1];
        _Sprite_Battler_createDamageSprite.apply(this, arguments);
        const sprite = this._damages[this._damages.length - 1];
        const offsetX = last ? last._offsetX + 8 : this.damageOffsetX();
        const offsetY = last ? last._offsetY - 16 : this.damageOffsetY();
        sprite.setupPseudo3dPosition(this, offsetX, offsetY);
    };
    
    //-------------------------------------------------------------------------
    // Sprite_Enemy

    Sprite_Enemy.prototype.targetGroundY = function() {
        const groundY = Sprite_Battler.prototype.targetGroundY.call(this);
        return groundY - this.height / 8;
    };
    
    //-------------------------------------------------------------------------
    // Sprite_Animation

    const _Sprite_Animation_updateEffectGeometry = Sprite_Animation.prototype.updateEffectGeometry;
    Sprite_Animation.prototype.updateEffectGeometry = function() {
        _Sprite_Animation_updateEffectGeometry.apply(this, arguments);
        if (this._handle) {
            const scale = this._animation.scale / 100 * this.pseudo3dTargetsScale();
            this._handle.setScale(scale, scale, scale);
        }
    };
    
    Sprite_Animation.prototype.pseudo3dTargetsScale = function() {
        if (this._animation.displayType === 2) {
            return 1;
        }
        const pos = Pseudo3DBattle.targetSprites2dPosition(this._targets);
        return pos ? Pseudo3DBattle.adjustPosition(pos.x, pos.y).scale : 1;
    };
    
    //-------------------------------------------------------------------------
    // Sprite_AnimationMV
    
    Sprite_AnimationMV.prototype.convertPseudo3dPosition = function() {
        this.updatePosition();
        this.scale.set(this.pseudo3dTargetsScale());
    };
    
    Sprite_AnimationMV.prototype.pseudo3dTargetsScale = function() {
        if (this._animation.position === 3) {
            return 1;
        }
        const pos = Pseudo3DBattle.targetSprites2dPosition(this._targets);
        return pos ? Pseudo3DBattle.adjustPosition(pos.x, pos.y).scale : 1;
    };
    
    //-------------------------------------------------------------------------
    // Sprite_Battleback

    const _Sprite_Battleback_initialize = Sprite_Battleback.prototype.initialize;
    Sprite_Battleback.prototype.initialize = function(type) {
        _Sprite_Battleback_initialize.apply(this, arguments);
        this._isPseudo3dGround = false;
        this._groundX = 0;
        this._groundY = 0;
    };
    
    Sprite_Battleback.prototype.setupPseudo3dPosition = function(bfX, bfY, pivotY) {
        this._bfX = bfX;
        this._bfY = bfY;
        this._groundX = Graphics.width / 2 - bfX,
        this._groundY = $gameSystem.isSideView()
            ? Graphics.height - this.height + pivotY - bfY
            : pivotY - bfY;
        this.anchor.x = 0.5;
        this.anchor.y = pivotY / this.height;
    };
    
    Sprite_Battleback.prototype.convertPseudo3dPosition = function() {
        const pos3d = Pseudo3DBattle.adjustPosition(this._groundX, this._groundY);
        this.x = pos3d.x + this._bfX;
        this.y = pos3d.y + this._bfY;
        if (this._isPseudo3dGround) {
            this.scale.x = Pseudo3DBattle.scaleX() * param_BattlebackScale;
            this.scale.y = Pseudo3DBattle.scaleY() * param_BattlebackScale;
            this.skew.x = Pseudo3DBattle.skew();
        } else {
            this.scale.set(Pseudo3DBattle.scaleX() * param_BattlebackScale);
        }
    };
    
    //-------------------------------------------------------------------------
    // Sprite_Damage

    Sprite_Damage.prototype.setupPseudo3dPosition = function(target, ox, oy) {
        this._target = target;
        this._offsetX = ox;
        this._offsetY = oy;
    };
    
    Sprite_Damage.prototype.convertPseudo3dPosition = function() {
        this.x = this._target.x + this._offsetX;
        this.y = this._target.y + this._offsetY;
    };
    
    //-------------------------------------------------------------------------
    // Sprite_StateIcon

    const _Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
    Sprite_StateIcon.prototype.updateIcon = function() {
        _Sprite_StateIcon_updateIcon.apply(this, arguments);
        this.visible = this._iconIndex > 0;
    };
    
    //-------------------------------------------------------------------------
    // Spriteset_Battle

    const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function() {
        _Spriteset_Battle_createBattleback.apply(this, arguments);
        if (this._back1Sprite.battleback1Name() !== '') {
            this._backgroundSprite.visible = false; // ただの軽量化
        }
        if (this.fixBattlebackPivotY() > 0) {
            const index = this._baseSprite.children.indexOf(this._back1Sprite);
            this._back1FixSprite = new Sprite_Battleback(0);
            this._baseSprite.addChildAt(this._back1FixSprite, index + 1);
        }
    };
    
    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        this.resetBattlersPosition();
        _Spriteset_Battle_update.apply(this, arguments);
        this.convertPseudo3dPosition();
        Pseudo3DBattle.executeCommands();
    };
    
    Spriteset_Battle.prototype.resetBattlersPosition = function() {
        // 競合対策として、一旦デフォルトの位置とサイズに戻す
        this.battlerSprites().forEach(sprite => sprite.reset2dPosition());
    };
    
    Spriteset_Battle.prototype.convertPseudo3dPosition = function() {
        this._back1Sprite.convertPseudo3dPosition();
        this._back2Sprite.convertPseudo3dPosition();
        if (this._back1FixSprite) {
            this._back1FixSprite.convertPseudo3dPosition();
        }
        for (const sprite of this._effectsContainer.children) {
            if (sprite.convertPseudo3dPosition) {
                sprite.convertPseudo3dPosition();
            }
        }
    };
    
    const _Spriteset_Battle_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
    Spriteset_Battle.prototype.updateBattleback = function() {
        const lastBattlebackLocated = this._battlebackLocated;
        _Spriteset_Battle_updateBattleback.apply(this, arguments);
        if (!lastBattlebackLocated) {
            this.setupBattlebackCameraPosition();
        }
    };
    
    Spriteset_Battle.prototype.setupBattlebackCameraPosition = function() {
        const { x:bfX, y:bfY } = this._battleField;
        const pivotY = this.fixBattlebackPivotY() || this.getBattlebackPivotY();
        this._back1Sprite._isPseudo3dGround = true;
        this._back1Sprite.setupPseudo3dPosition(bfX, bfY, pivotY);
        this._back2Sprite.setupPseudo3dPosition(bfX, bfY, pivotY);
        if (this._back1FixSprite) {
            this._back1FixSprite.adjustPosition();
            this._back1FixSprite.setupPseudo3dPosition(bfX, bfY, pivotY);
            this._back1FixSprite.height = pivotY;
            this._back1FixSprite.anchor.y = 1;
        }
    };
    
    Spriteset_Battle.prototype.fixBattlebackPivotY = function() {
        const battleback2Name = this._back2Sprite.battleback2Name();
        const param = param_Battleback2PivotYFixes.find(
            param => param['Battleback2 Image'] === battleback2Name
        );
        return param ? param['Pivot Y'] || 0 : 0;
    };
    
    Spriteset_Battle.prototype.getBattlebackPivotY = function() {
        const bitmap = this._back2Sprite.bitmap;
        const x = Math.floor(bitmap.width / 2);
        const h = bitmap.height;
        const data = bitmap.context.getImageData(x, 0, 1, h).data;
        return [...Array(h).keys()].reverse().find(
            n => data[n * 4 + 3] > 192
        ) || 0;
    };
    
    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_performCollapse = Window_BattleLog.prototype.performCollapse;
    Window_BattleLog.prototype.performCollapse = function(target) {
        _Window_BattleLog_performCollapse.apply(this, arguments);
        BattleManager.callPseudo3dMethod('collapse', target);
    };
    
    const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function(
        subject, targets, animationId
    ) {
        _Window_BattleLog_showAnimation.apply(this, arguments);
        const realTargets = [ ...new Set(targets) ];
        BattleManager.callPseudo3dMethod('showAnimation', realTargets);
    };
    
    const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        _Window_BattleLog_displayDamage.apply(this, arguments);
        BattleManager.callPseudo3dMethod('damage', target);
    };
    
    //-------------------------------------------------------------------------
    // Scene_Boot

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
        Pseudo3DBattle.initMembers();
    };
    
    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        Pseudo3DBattle.update();
        _Scene_Battle_update.apply(this, arguments);
    };
    
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.apply(this, arguments);
        Pseudo3DBattle.clearMoveCommands();
    };
    
    const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
    Scene_Battle.prototype.hideSubInputWindows = function() {
        _Scene_Battle_hideSubInputWindows.apply(this, arguments);
        if (!$gameTroop.isEventRunning()) {
            BattleManager.callPseudo3dMethod('endTargeting');
            BattleManager.callPseudo3dMethod('home');
        }
    };
    
    const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        _Scene_Battle_startPartyCommandSelection.apply(this, arguments);
        BattleManager.callPseudo3dMethod('home');
    };
    
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.apply(this, arguments);
        BattleManager.callPseudo3dMethod('inputting', BattleManager.actor());
    };
    
    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function() {
        _Scene_Battle_startActorSelection.apply(this, arguments);
        BattleManager.callPseudo3dMethod('targeting', $gameParty.members());
    };
    
    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.apply(this, arguments);
        BattleManager.callPseudo3dMethod('endTargeting');
    };
    
    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function() {
        _Scene_Battle_startEnemySelection.apply(this, arguments);
        BattleManager.callPseudo3dMethod('targeting', $gameTroop.aliveMembers());
    };
    
    const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        _Scene_Battle_onEnemyCancel.apply(this, arguments);
        BattleManager.callPseudo3dMethod('endTargeting');
    };
    
    //-------------------------------------------------------------------------
    // PluginManager
   
    PluginManager.registerCommand(pluginName, 'enemyFocus', function(args) {
        const index = PluginManager.mppValue(args.index);
        const targets = [];
        this.iterateBattler(0, index, battler => {
            if (battler.isAlive()) {
                targets.push(battler);
            }
        });
        if (targets) {
            const scale = PluginManager.mppValue(args.scale) / 100;
            const duration = PluginManager.mppValue(args.duration);
            BattleManager.callPseudo3dMethod('focus', targets, scale, duration);
        }
    });

    PluginManager.registerCommand(pluginName, 'actorFocus', function(args) {
        const id = PluginManager.mppValue(args.id);
        const targets = [];
        this.iterateBattler(1, id, battler => {
            targets.push(battler);
        });
        if (targets) {
            const scale = PluginManager.mppValue(args.scale) / 100;
            const duration = PluginManager.mppValue(args.duration);
            BattleManager.callPseudo3dMethod('focus', targets, scale, duration);
        }
    });

    PluginManager.registerCommand(pluginName, 'moveHome', args => {
        const duration = PluginManager.mppValue(args.duration);
        BattleManager.callPseudo3dMethod('home', duration);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
})();
