
/*:
 * @plugindesc 技能使用条件扩展插件
 * @target MZ
 * @url https://drive.google.com/drive/u/1/my-drive
 * @author さすらいのトム
 *
 *
 * @help ExtendSkillCondition.js
 * 在技能的使用条件中追加开关、变量、状态等各种各样的东西。
 * 可以在对象技能的备注栏中记述如下内容。
 * 
 * 非常粗略的使用例子：
 * <checkGameSwitch:1>             
 * 只有在开关ID为1时才能使用该技能
 * 
 * <higherGameVariables:1,2>       
 * 只有变量1高于2时才能使用该技能
 * 
 * <lowerGameVariables:3,4>        
 * 只有变量3小于4时才能使用该技能
 * 
 * <checkHasItem:7>                
 * 只有持有道具ID7的道具时才能使用该技能
 * <checkLearnedSkill:100>         
 * 只有在主角学习了技能ID 100的技能时才能使用该技能
 * 
 * <checkStateAffected:4>          
 * 只有在反应器处于状态ID4时才能使用该技能
 * 
 * <isNotStateAffected:5>          
 * 只有在使用者没有状态ID5时才能使用该技能
 * 
 * <checkHasTrait:test>            
 * 在备注栏中<test>装备着与之相关的武器和防具、
 * 或者在状态下可以使用该技能
 * 
 * <checkExecuteScript:JavaScript計算式>
 * 只有在JavaScript计算公式是true的情况下才能使用该技能
 * 另外，JavaScript计算公式不正确时，不能使用该技能。
 * 
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 */

(() => {
    'use strict';

    Game_BattlerBase.prototype.readSkillObjects = function(skill,metatag) {
        let skillid = skill.id;
        if( $dataSkills[skillid].meta[metatag]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.SkillValue = function(skill,metatag) {
        let skillid = skill.id;
        if($dataSkills[skillid].meta[metatag]) {
            return $dataSkills[skillid].meta[metatag];
        }
        return null;
    }

    Game_BattlerBase.prototype.SkillValues = function(skill,metatag) {
        let skillid = skill.id;
        if($dataSkills[skillid].meta[metatag]) {
            let values = [];
            values = $dataSkills[skillid].meta[metatag].split(',');
            return values;
        }
        return null;
    }

    Game_BattlerBase.prototype.searchTraitObject = function(obj) {
        var result = false;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta[obj]) {
                result = true;
                }
            }
        );
        return result;
    }
    
    const Game_BattlerBase_prototype_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;  
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        var result = Game_BattlerBase_prototype_meetsSkillConditions.call(this,skill);
        if (result == false) {
            return false;
        }
        if (this.readSkillObjects(skill,'checkGameSwitch')) {
            result = this.checkGameSwitch(skill);
        }
        if (this.readSkillObjects(skill,'higherGameVariables')) {
            result = this.higherGameVariables(skill);
        }
        if (this.readSkillObjects(skill,'lowerGameVariables')) {
            result = this.lowerGameVariables(skill);
        }
        if (this.readSkillObjects(skill,'checkHasItem')) {
            result = this.checkHasItem(skill);
        }
        if (this.readSkillObjects(skill,'checkLearnedSkill')) {
            result = this.checkLearnedSkill(skill);
        }
        if (this.readSkillObjects(skill,'checkActorLevel')) {
            result = this.checkActorLevel(skill);
        }
        if (this.readSkillObjects(skill,'checkStateAffected')) {
            result = this.checkStateAffected(skill);
        }
        if (this.readSkillObjects(skill,'isNotStateAffected')) {
            result = this.isNotStateAffected(skill);
        }
        if (this.readSkillObjects(skill,'checkHasTrait')) {
            result = this.checkHasTrait(skill);
        }
        if (this.readSkillObjects(skill,'checkExecuteScript')) {
            result = this.checkExecuteScript(skill);
        }
        return result;
    };

    Game_BattlerBase.prototype.checkGameSwitch = function(skill) {
        let gameSwitch = this.SkillValue(skill,'checkGameSwitch');
        if ($gameSwitches.value(gameSwitch)) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.higherGameVariables = function(skill) {
        let Variables = this.SkillValues(skill,'higherGameVariables');
        if (Variables == null || Variables.length != 2) {
            return false;
        }
        let value = $gameVariables.value(Variables[0])
        if (value > Variables[1]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.lowerGameVariables = function(skill) {
        let Variables = this.SkillValues(skill,'lowerGameVariables');
        if (Variables == null || Variables.length != 2) {
            return false;
        }
        let value = $gameVariables.value(Variables[0])
        if (value < Variables[1]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.checkHasItem = function(skill) {
        let itemID = this.SkillValue(skill,'checkHasItem');
        if (itemID == null) {
            return false;
        }
        if ($gameParty.hasItem($dataItems[Number(itemID)])) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkLearnedSkill = function(skill) {
        if (!this.isActor()) {
            return false;
        }
        let skillID = this.SkillValue(skill,'checkLearnedSkill');
        if (this.isLearnedSkill(Number(skillID))) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkActorLevel = function(skill) {
        if (!this.isActor()) {
            return false;
        }
        let Level = this.SkillValue(skill,'checkActorLevel');
        if (this._level > Number(Level)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkStateAffected = function(skill) {
        let stateID = Number(this.SkillValue(skill,'checkStateAffected'));
        if(!$dataStates[stateID]) {
            return false
        }
        if (this.isStateAffected(stateID)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.isNotStateAffected = function(skill) {
        let stateID = Number(this.SkillValue(skill,'isNotStateAffected'));
        if(!$dataStates[stateID]) {
            return false
        }
        if (!this.isStateAffected(stateID)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkHasTrait = function(skill) {
        let traits = this.SkillValue(skill,'checkHasTrait');
        if (this.searchTraitObject(traits)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkExecuteScript = function(skill) {
        let cond = this.SkillValue(skill,'checkExecuteScript');
        try {
            const value = eval(cond);
            if (value) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

})();
