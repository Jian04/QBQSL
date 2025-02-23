
/*:
 * @target MZ
 * @plugindesc 最强装备规格变更插件
 * @author さすらいのトム
 *
 * @help
 * 作为以往的MZ规格有「最强装备在能装备主角的装备中，
 * 选择参数上升率最高的装备，但是攻击上升10%的装备
 * 等比例使状态增减的装备不算作参数上升率」
 * 的方法此选项也可用于以比例增加或减少状态。
 * 
 * 另外，能力增减值总和为负数的，不属于最强装备的对象。
 * 能力增减值的总和只有减分的装备的情况下，对象的部位变成「没有装备」的状态。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 */

(() => {
    'use strict';
    //最強装備に割合装備を適用させるプラグイン
    //割合装備を適用するためアクターのステータスを変数に記憶させる
    const Game_Actor_prototype_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
    Game_Actor.prototype.optimizeEquipments = function() {
        this.clearEquipments();
        this.calcOriginaiStatus();
        Game_Actor_prototype_optimizeEquipments.call(this);
    }

    //アクターの元ステータス取得
    Game_Actor.prototype.calcOriginaiStatus = function() {
        $gameTemp._actorOriginaiStatus = [];
        for (let i = 0; i < 8; i++) {
            $gameTemp._actorOriginaiStatus[i] = this.getParams(i);
        }
    }

    const Game_Actor_prototype_calcEquipItemPerformance = Game_Actor.prototype.calcEquipItemPerformance;
    Game_Actor.prototype.calcEquipItemPerformance = function(item) {
        let result = Game_Actor_prototype_calcEquipItemPerformance.call(this,item);
        result += this.calcEquipItemPerRate(item);
        if (result < 0) {
            return -1001;
        }
        return result;
    };

    Game_Actor.prototype.calcEquipItemPerRate = function(item) {
    let result = 0;
        if (item.traits) {
            for (let i = 0;i <item.traits.length;i++){
                if (item.traits[i].code == 21){
                    result = $gameTemp._actorOriginaiStatus[item.traits[i].dataId] * item.traits[i].value - $gameTemp._actorOriginaiStatus[item.traits[i].dataId];
                }
            }
        }
        return result;
    }

    Game_Battler.prototype.getParams = function(id) {
        var result = "";
        switch(id) {
            case 0:
                result = this.mhp;
                break;
            case 1:
                result = this.mmp;
                break;
            case 2:
                result =  this.atk;
                break;
            case 3:
                result =  this.def;
                break;
            case 4:
                result =  this.mat;
                break;
            case 5:
                result =  this.mdf;
                break;
            case 6:
                result =  this.agi;
                break;
            case 7:
                result =  this.luk; 
                break;
            }
            return result;
    }

})();
