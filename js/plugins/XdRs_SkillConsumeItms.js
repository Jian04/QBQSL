//=================================================================================================
// Skill Consume Items.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 增加技能消耗项目
 * @author 芯☆淡茹水
 * @help
 *
 * 〓 技能额外消耗备注 〓
 * 1，消耗HP => <CostHp:n>
 *    n :消耗的使用者HP数量（当前的HP与需求值相同时不能使用）
 * 
 * 2，消耗变量 => <CostVal:id=n>
 *    id :变量的ID
 *    n :消耗的变量值。
 * 
 * 3，消耗物品 => <CostItem:id=n>
 *    id :物品的ID
 *    n :消耗的物品数量。
 * 
 * 4，消耗武器 => <CostWeapon:id=n>
 *    id :武器的ID
 *    n :消耗的武器数量。
 * 
 * 5，消耗防具 => <CostArmor:id=n>
 *    id :防具的ID
 *    n :消耗的防具数量。
 * 
*/
//=================================================================================================
;(() => {
//=================================================================================================
const XR_Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return XR_Game_BattlerBase_meetsSkillConditions.call(this, skill) && this.meetsSkillAddedItems(skill);
};
Game_BattlerBase.prototype.meetsSkillAddedItems = function(skill) {
    return ['Hp','Val','Item','Weapon','Armor'].every(type => {
        const sym = 'Cost'+type;
        if (!!skill.meta[sym]) {
            const arr = skill.meta[sym].split('=').map(n => parseInt(n));
            if (type === 'Hp')  return this.hp > arr[0]
            if (type === 'Val') return $gameVariables.value(arr[0]) >= arr[1];
            const item = window['$data'+type+'s'][arr[0]];
            return $gameParty.numItems(item) >= arr[1];
        }
        return true;
    });
};
const XR_Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    XR_Game_BattlerBase_paySkillCost.call(this, skill);
    this.costSkillAddedItems(skill);
};
Game_BattlerBase.prototype.costSkillAddedItems = function(skill) {
    ['Hp','Val','Item','Weapon','Armor'].forEach(type => {
        const sym = 'Cost'+type;
        if (!!skill.meta[sym]) {
            const arr = skill.meta[sym].split('=').map(n => parseInt(n));
            if (type === 'Hp') this.gainHp(-arr[0]);
            else if (type === 'Val') {
                const n = $gameVariables.value(arr[0]);
                $gameVariables.setValue(arr[0], n - arr[1]);
            } else {
                const item = window['$data'+type+'s'][arr[0]];
                $gameParty.loseItem(item, arr[1]);
            }
        }
    });
};
//=================================================================================================
})();
//=================================================================================================
// end
//=================================================================================================