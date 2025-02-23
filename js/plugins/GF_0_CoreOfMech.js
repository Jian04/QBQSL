//=============================================================================
// Ganfly Plugins - CoreOfMech
// GF_0_CoreOfMech.js
//=============================================================================

var Imported = Imported || {};
Imported.GF_0_CoreOfMech = true;

var GF = GF || {};
GF.COM = GF.COM || {};
GF.COM.version = 1.0;
GF.COM.pluginName = document.currentScript.src.match(/([^\/]+)\.js/)[1];

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0]        系统 - 物理核心
 * @author ganfly, Drill_up
 * @url https://github.com/gt1395546357/RPGMakerMZ-Plugin
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 *  本插件用于建立额外的游戏基础物理系统。
 *
 * 主要功能包括：
 *       轨道路径计算
 *
 * ============================================================================
 *  前置需求
 * ============================================================================
 *
 * 这个插件只能在RPGMakerMZ上运行。
 *
 * ---- 第0层 ----
 *
 * 这个插件是第0层插件，必须放在所有1，2，3，4，5层GF插件的上面。
 *
 * ============================================================================
 *  用户规约
 * ============================================================================
 *
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 *
 * ============================================================================
 *  更新日志
 * ============================================================================
 *
 * [v1.0] 完成插件。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 *
 */

//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GF.Parameters = PluginManager.parameters(GF.COM.pluginName);
GF.Param = GF.Param || {};

//=============================================================================
// OrbitManager
//=============================================================================

class OrbitManager {

/**
 * 移动弹道 - 初始化（接口，单次调用）
 *
 *		 说明：> 给传来的data进行初始赋值，主要功能为数学计算。
 *             > 注意，锚点列表的格式固定为：[ {'x':0,'y':0}
 *		 参数：见默认值，执行接口后，data指针中将被赋值弹道数据。
 *		 返回：无
 */

    static setMoveOrbitData(inputData) {
        this._moveData = {};
        const data = this._moveData;
        data.movementNum = inputData.movementNum || 1; //移动 - 子弹数量
        data.movementTime = inputData.movementTime || 1; //移动 - 时长
        data.movementDelay = inputData.movementDelay || 0; //移动 - 延迟时间
        data.movementMode = inputData.movementMode || '极坐标模式'; //移动 - 移动模式（极坐标模式/直角坐标模式/两点式/…）
        if (data.movementMode === "极坐标模式") {
            this.setMoveOrbitDataPolar(inputData);
        } else if (data.movementMode === "直角坐标模式") {
            this.setMoveOrbitDataCart(inputData);
        } else if (data.movementMode === "轨道锚点模式") {
            this.setMoveOrbitDataTrack(inputData);
        } else if (data.movementMode === "两点式") {
            this.setMoveOrbitDataDualPoint(inputData);
        }
    }
    //=================极坐标=================
    static setMoveOrbitDataPolar(inputData) {
        const data = this._moveData;
        data.polarSpeedType = inputData.polarSpeedType || '只初速度'; //速度 - 类型
        data.polarSpeedBase = Number(inputData.polarSpeedBase) || 0; //速度 - 初速度
        data.polarSpeedRandom = Number(inputData.polarSpeedRandom) || 0; //速度 - 速度随机波动量
        data.polarSpeedInc = Number(inputData.polarSpeedInc) || 0; //速度 - 加速度
        data.polarSpeedMax = Number(inputData.polarSpeedMax) || 0; //速度 - 最大速度
        data.polarSpeedMin = Number(inputData.polarSpeedMin) || 0; //速度 - 最小速度
        data.polarDistanceFormula = inputData.polarDistanceFormula || 'return 0'; //速度 - 路程计算公式
        data.polarDistanceFunction = new Function('p', data.polarDistanceFormula);
        data.polarSpeedRandomFactor = Number(inputData.polarSpeedRandomFactor) || -1; //速度 - 随机因子（锁定随机值专用,0-1之间）

        data.polarDirType = inputData.polarDirType || '固定方向'; //方向 - 类型
        data.polarDirFixed = Number(inputData.polarDirFixed) || 0; //方向 - 固定方向
        data.polarDirSectorFace = Number(inputData.polarDirSectorFace) || 0; //方向 - 扇形朝向
        data.polarDirSectorDegree = Number(inputData.polarDirSectorDegree) || 0; //方向 - 扇形角度
        const formula = inputData.polarDirFormula || 'return 0'; 
        data.polarDirFunction = new Function('p', formula);//方向 - 方向计算公式
        data.polarDirRandomFactor = Number(inputData.polarDirRandomFactor) || -1; //方向 - 随机因子（锁定随机值专用,0-1之间）
    }
    //=================直角坐标=================
    static setMoveOrbitDataCart(inputData) {
        const data = this._moveData;
        data.cartRotation = Number(inputData.cartRotation) || 0; //整体坐标轴旋转角度
        data.cartXSpeedType = inputData.cartXSpeedType || '只初速度'; //x - 类型
        data.cartXSpeedBase = Number(inputData.cartXSpeedBase) || 0; //x - 初速度
        data.cartXSpeedRandom = Number(inputData.cartXSpeedRandom) || 0; //x - 速度随机波动量
        data.cartXSpeedInc = Number(inputData.cartXSpeedInc) || 0; //x - 加速度
        data.cartXSpeedMax = Number(inputData.cartXSpeedMax) || 0; //x - 最大速度
        data.cartXSpeedMin = Number(inputData.cartXSpeedMin) || 0; //x - 最小速度
        const formula_x = inputData.cartXDistanceFormula || 'return 0'; 
        data.cartXDistanceFunction = new Function('p', formula_x);//x - 路程计算公式
        data.cartXSpeedRandomFactor = Number(inputData.cartXSpeedRandomFactor) || -1; //x - 随机因子（锁定随机值专用,0-1之间）

        data.cartYSpeedType = inputData.cartYSpeedType || '只初速度'; //y - 类型
        data.cartYSpeedBase = Number(inputData.cartYSpeedBase) || 0; //y - 初速度
        data.cartYSpeedRandom = Number(inputData.cartYSpeedRandom) || 0; //y - 速度随机波动量
        data.cartYSpeedInc = Number(inputData.cartYSpeedInc) || 0; //y - 加速度
        data.cartYSpeedMax = Number(inputData.cartYSpeedMax) || 0; //y - 最大速度
        data.cartYSpeedMin = Number(inputData.cartYSpeedMin) || 0; //y - 最小速度
        const formula_y = inputData.cartYDistanceFormula || 'return 0'; 
        data.cartYDistanceFunction = new Function('p', formula_y);//y - 路程计算公式
        data.cartYSpeedRandomFactor = Number(inputData.cartYSpeedRandomFactor) || -1; //y - 随机因子（锁定随机值专用,0-1之间）
    }
    //=================轨道锚点=================
    static setMoveOrbitDataTrack(inputData) {
        const data = this._moveData;
        data.trackSpeedType = inputData.trackSpeedType || '只初速度'; //速度 - 类型
        data.trackSpeedBase = Number(inputData.trackSpeedBase) || 0; //速度 - 初速度
        data.trackSpeedRandom = Number(inputData.trackSpeedRandom) || 0; //速度 - 速度随机波动量
        data.trackSpeedInc = Number(inputData.trackSpeedInc) || 0; //速度 - 加速度
        data.trackSpeedMax = Number(inputData.trackSpeedMax) || 0; //速度 - 最大速度
        data.trackSpeedMin = Number(inputData.trackSpeedMin) || 0; //速度 - 最小速度
        const formula = inputData.trackDistanceFormula || 'return 0'; 
        data.trackDistanceFunction = new Function('p', formula);//速度 - 路程计算公式
        data.trackSpeedRandomFactor = Number(inputData.trackSpeedRandomFactor) || -1; //速度 - 随机因子（锁定随机值专用,0-1之间）

        data.trackPointTank = JSON.parse(inputData.trackPointTank) || []; //轨道 - 锚点列表
        data.trackRotation = Number(inputData.trackRotation) || 0; //轨道 - 整体旋转角度
    }
    //=================两点式=================
    static setMoveOrbitDataDualPoint(inputData) {
        const data = this._moveData;
        data.twoPointType = inputData.twoPointType || '不移动'; //类型（不移动/匀速移动/弹性移动/……）
        data.twoPointDifferenceX = Number(inputData.twoPointDifferenceX) || 0; //距离差值x（终点减起点）
        data.twoPointDifferenceY = Number(inputData.twoPointDifferenceY) || 0; //距离差值y（终点减起点）
        data.twoPointParabolaDir = Number(inputData.twoPointParabolaDir) || 0; //抛物线移动 - 初始方向（单位角度）
        data.twoPointParabolaSpeed = Number(inputData.twoPointParabolaSpeed) || 0; //抛物线移动 - 初始速度
    }
/**
 * 移动弹道 - 预推演（接口，单次调用）
 *
 *			说明：根据当前的弹道参数设置，开始计算轨迹，主要功能为数学计算。
 *			参数：对象容器，对象编号，初始x位置，初始y位置
 *				  执行后，obj_data指针中将被赋值弹道结果。
 *			返回：无
 */

    static calculateMoveOrbit(obj_data, obj_index, orgX, orgY) {
        const data = this._moveData;
        obj_data._drill_COBa_x = [];
        obj_data._drill_COBa_y = [];
        if (data.movementMode === "极坐标模式") {
            this.calculateMoveOrbitPolar(obj_data, obj_index, orgX, orgY);
        } else if (data.movementMode === "直角坐标模式") {
            this.calculateMoveOrbitCart(obj_data, obj_index, orgX, orgY);
        } else if (data.movementMode === "轨道锚点模式") {
            this.calculateMoveOrbitTrack(obj_data, obj_index, orgX, orgY);
        } else if (data.movementMode === "两点式") {
            this.calculateMoveOrbitDualPoint(obj_data, obj_index, orgX, orgY);
        }
        // > 延迟
        for (let i = 0; i < data['movementDelay']; i++) {
            obj_data._drill_COBa_x.unshift(obj_data._drill_COBa_x[0]);
            obj_data._drill_COBa_y.unshift(obj_data._drill_COBa_y[0]);
        }
    }

    static calculateMoveOrbitPolar(obj_data, obj_index, orgX, orgY) {
        const data = this._moveData;
        // > 起点值
        obj_data._drill_COBa_x.push(orgX);
        obj_data._drill_COBa_y.push(orgY);

        // > 随机值（只有随机值和时间没有关系）
        let randomSpeed = Math.random(); //速度随机因子
        let randomDirValue = Math.random(); //方向随机因子
        if (data['polarSpeedRandomFactor'] !== -1) {
            randomSpeed = data['polarSpeedRandomFactor'];
        }
        if (data['polarDirRandomFactor'] !== -1) {
            randomDirValue = data['polarDirRandomFactor'];
        }
        for (let time = 1; time < data['movementTime']; time++) {
            // > 方向
            let dir = null;
            let p = null;
            p = {
                index: obj_index, //索引
                time: time,
                ran: randomDirValue,
                num: data.movementNum,
                d0: data.polarDirFixed,
                sDegree: data.polarDirSectorDegree,
                sFace: data.polarDirSectorFace
            };
            if (data['polarDirType'] == "固定方向") {
                dir = this.drill_COBa_directionFunction_1(p);
            } else if (data['polarDirType'] == "四周扩散(线性)") {
                dir = this.drill_COBa_directionFunction_2(p);
            } else if (data['polarDirType'] == "四周扩散(随机)") {
                dir = this.drill_COBa_directionFunction_3(p);
            } else if (data['polarDirType'] == "四周扩散(抖动)") {
                dir = this.drill_COBa_directionFunction_4(p);
            } else if (data['polarDirType'] == "扇形范围方向(线性)") {
                dir = this.drill_COBa_directionFunction_5(p);
            } else if (data['polarDirType'] == "扇形范围方向(随机)") { //扇形的线性和随机的配置角度是反的，目前不明原因
                dir = this.drill_COBa_directionFunction_6(p);
            } else if (data['polarDirType'] == "方向计算公式") {
                dir = data['polarDirFunction'].call(this, p);
            }
            GF.Util.drill_COBa_checkValue(p, dir); //（校验）
            dir = dir / 180 * Math.PI;

            // > 速度
            let radius = null;
            p = {
                index: obj_index,
                time: time,
                ran: randomSpeed,
                num: data.movementNum,
                v0: data.polarSpeedBase,
                wave: data.polarSpeedRandom,
                a: data.polarSpeedInc,
                vMax: data.polarSpeedMax,
                vMin: data.polarSpeedMin
            };
            if (data['polarSpeedType'] == "只初速度") {
                radius = this.drill_COBa_speedFunction_1(p);
            } else if (data['polarSpeedType'] == "初速度+波动量") {
                radius = this.drill_COBa_speedFunction_2(p);
            } else if (data['polarSpeedType'] == "初速度+波动量+加速度") {
                radius = this.drill_COBa_speedFunction_3(p);
            } else if (data['polarSpeedType'] == "初速度+波动量+加速度+最大最小") {
                radius = this.drill_COBa_speedFunction_4(p);
            } else if (data['polarSpeedType'] == "路程计算公式") {
                radius = data['polarDistanceFunction'].call(this, p);
            }
            GF.Util.drill_COBa_checkValue(p, radius); //（校验）
            let xx = orgX + radius * Math.cos(dir);
            let yy = orgY + radius * Math.sin(dir);
            obj_data._drill_COBa_x.push(xx);
            obj_data._drill_COBa_y.push(yy);
        }
    }

    static calculateMoveOrbitCart(obj_data, obj_index, orgX, orgY) {
        const data = this._moveData;
        // > 起点值
        obj_data._drill_COBa_x.push(orgX);
        obj_data._drill_COBa_y.push(orgY);
        // > 随机值（只有随机值和时间没有关系）
        let x_randomSpeed = Math.random(); //速度随机因子
        let y_randomSpeed = Math.random(); //方向随机因子
        if (data['cartXSpeedRandomFactor'] !== -1) {
            x_randomSpeed = data['cartXSpeedRandomFactor'];
        }
        if (data['cartYSpeedRandomFactor'] !== -1) {
            y_randomSpeed = data['cartYSpeedRandomFactor'];
        }
        for (let time = 1; time < data['movementTime']; time++) {

            // > x速度
            let xx = null;
            let p = null;
            p = {
                index: obj_index,
                time: time,
                ran: x_randomSpeed,
                num: data.movementNum,
                v0: data.cartXSpeedBase,
                wave: data.cartXSpeedRandom,
                a: data.cartXSpeedInc,
                vMax: data.cartXSpeedMax,
                vMin: data.cartXSpeedMin
            };
            if (data['cartXSpeedType'] === "只初速度") {
                xx = this.drill_COBa_speedFunction_1(p);
            } else if (data['cartXSpeedType'] === "初速度+波动量") {
                xx = this.drill_COBa_speedFunction_2(p);
            } else if (data['cartXSpeedType'] === "初速度+波动量+加速度") {
                xx = this.drill_COBa_speedFunction_3(p);
            } else if (data['cartXSpeedType'] === "初速度+波动量+加速度+最大最小") {
                xx = this.drill_COBa_speedFunction_4(p);
            } else if (data['cartXSpeedType'] === "路程计算公式") {
                xx = data['cartXDistanceFunction'].call(this, p);
            }
            GF.Util.drill_COBa_checkValue(p, xx); //（校验）

            // > y速度
            let yy = null;
            p = {
                index: obj_index,
                time: time,
                ran: y_randomSpeed,
                num: data.movementNum,
                v0: data.cartYSpeedBase,
                wave: data.cartYSpeedRandom,
                a: data.cartYSpeedInc,
                vMax: data.cartYSpeedMax,
                vMin: data.cartYSpeedMin
            };
            if (data['cartYSpeedType'] == "只初速度") {
                yy = this.drill_COBa_speedFunction_1(p);
            } else if (data['cartYSpeedType'] == "初速度+波动量") {
                yy = this.drill_COBa_speedFunction_2(p);
            } else if (data['cartYSpeedType'] == "初速度+波动量+加速度") {
                yy = this.drill_COBa_speedFunction_3(p);
            } else if (data['cartYSpeedType'] == "初速度+波动量+加速度+最大最小") {
                yy = this.drill_COBa_speedFunction_4(p);
            } else if (data['cartYSpeedType'] == "路程计算公式") {
                yy = data['cartYDistanceFunction'].call(this, p);
            }
            GF.Util.drill_COBa_checkValue(p, yy); //（校验）

            // > 坐标轴整体旋转
            let rotate = data.cartRotation / 180 * Math.PI;
            let r_xx = xx * Math.cos(rotate) - yy * Math.sin(rotate);
            let r_yy = xx * Math.sin(rotate) + yy * Math.cos(rotate);
            xx = orgX + r_xx;
            yy = orgY + r_yy;
            obj_data._drill_COBa_x.push(xx);
            obj_data._drill_COBa_y.push(yy);
        }
    }

    static calculateMoveOrbitTrack(obj_data, obj_index, orgX, orgY) {
        const data = this._moveData;
        // > 起点值
        obj_data._drill_COBa_x.push(orgX);
        obj_data._drill_COBa_y.push(orgY);
        // > 随机值（只有随机值和时间没有关系）
        let randomSpeed = Math.random(); //速度随机因子
        if (data['trackSpeedRandomFactor'] !== -1) {
            randomSpeed = data['trackSpeedRandomFactor'];
        }
        // > 轨道点初始化
        if (data['trackPointTank'].length < 2) { //（至少要两个点才能计算）
            data['trackPointTank'] = [{
                    'x': 0,
                    'y': 0
                }, {
                    'x': 0,
                    'y': 200
                }
            ];
        }
        let distance_total = 0; //总距离
        let distance_tank = [0]; //距离容器
        let time_overflow = false; //时间冗余标记
        for (let i = 1; i < data['trackPointTank'].length; i++) {
            let cur_point = data['trackPointTank'][i];
            let last_point = data['trackPointTank'][i - 1];

            let dx = cur_point.x - last_point.x;
            let dy = cur_point.y - last_point.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            distance_tank.push(distance);
            distance_total += distance;
        };

        for (let time = 1; time < data['movementTime']; time++) {

            // > 速度
            let distance = null;
            let p = null;
            p = {
                index: obj_index,
                time: time,
                ran: randomSpeed,
                num: data.movementNum,
                v0: data.trackSpeedBase,
                wave: data.trackSpeedRandom,
                a: data.trackSpeedInc,
                vMax: data.trackSpeedMax,
                vMin: data.trackSpeedMin
            };

            if (data['trackSpeedType'] == "只初速度") {
                distance = this.drill_COBa_speedFunction_1(p);
            } else if (data['trackSpeedType'] == "初速度+波动量") {
                distance = this.drill_COBa_speedFunction_2(p);
            } else if (data['trackSpeedType'] == "初速度+波动量+加速度") {
                distance = this.drill_COBa_speedFunction_3(p);
            } else if (data['trackSpeedType'] == "初速度+波动量+加速度+最大最小") {
                distance = this.drill_COBa_speedFunction_4(p);
            } else if (data['trackSpeedType'] == "路程计算公式") {
                distance = data['trackDistanceFunction'].call(this, p);
            }
            GF.Util.drill_COBa_checkValue(p, distance); //（校验）

            // > 轨道计算（根据每个落脚点的距离计算）
            let p_xx = 0;
            let p_yy = 0;
            for (let j = 1; j < distance_tank.length; j++) {
                let cur_distance = distance_tank[j];
                let last_distance = distance_tank[j - 1];
                distance -= last_distance;

                // > 距离冗余，说明不在当前落脚点
                if (distance > cur_distance) {
                    if (j == distance_tank.length - 1) { //（已是终点且距离冗余时，直接为终点位置）
                        p_xx = data['trackPointTank'][j].x;
                        p_yy = data['trackPointTank'][j].y;
                        time_overflow = true; //（标记为时间冗余，要去掉后面的时间）
                        break;
                    } else {
                        continue;
                    }
                }

                // > 不冗余，说明落脚点在 cur和last之间
                let cur_point = data['trackPointTank'][j];
                let last_point = data['trackPointTank'][j - 1];
                let per = distance / cur_distance; //（距离比）

                p_xx = last_point.x + (cur_point.x - last_point.x) * per;
                p_yy = last_point.y + (cur_point.y - last_point.y) * per;
                break;
            }

            // > 轨道整体旋转
            let rotate = data['trackRotation'] / 180 * Math.PI;
            p_xx = p_xx * Math.cos(rotate) - p_xx * Math.sin(rotate);
            p_yy = p_yy * Math.sin(rotate) + p_yy * Math.cos(rotate);

            let xx = orgX + p_xx;
            let yy = orgY + p_yy;
            obj_data._drill_COBa_x.push(xx);
            obj_data._drill_COBa_y.push(yy);

            // > 时间冗余（走完全程后，结束弹道移动）
            if (time_overflow) {
                data.movementTime = obj_data._drill_COBa_x.length;
                break;
            }
        }
    }

    static calculateMoveOrbitDualPoint(obj_data, obj_index, orgX, orgY) {
        const data = this._moveData;
        for (let time = 0; time <= data['movementTime']; time++) {
            // > 速度
            let xx = 0;
            let yy = 0;

            if (data['twoPointType'] === "不移动") {
                xx = 0; //（一直待在原位置）
                yy = 0;
            } else if (data['twoPointType'] === "匀速移动") {
                let dx = data['twoPointDifferenceX'];
                let dy = data['twoPointDifferenceY'];
                let dt = data['movementTime'];

                xx = time * dx / dt;
                yy = time * dy / dt;
            } else if (data['twoPointType'] === "增减速移动") {
                let dx = data['twoPointDifferenceX'];
                let dy = data['twoPointDifferenceY'];
                let dt = data['movementTime'];

                let v_max = dx / dt * 2; //（先加速后减速）
                let a = v_max / dt * 2;
                if (time < dt / 2) {
                    xx = a * time * time / 2;
                } else {
                    let t_p = time - dt / 2;
                    xx = dx / 2 + v_max * t_p - a * t_p * t_p / 2;
                }

                v_max = dy / dt * 2;
                a = v_max / dt * 2;
                if (time < dt / 2) {
                    yy = a * time * time / 2;
                } else {
                    let t_p = time - dt / 2;
                    yy = dy / 2 + v_max * t_p - a * t_p * t_p / 2;
                }
            } else if (data['twoPointType'] === "弹性移动") {
                let dx = data['twoPointDifferenceX'];
                let dy = data['twoPointDifferenceY'];
                let dt = data['movementTime'];

                let ax = 2 * dx / dt / dt; //r = 1/2*a*t^2
                let ay = 2 * dy / dt / dt; //（匀减速移动到目标点）
                let c_time = dt - time;
                xx = 0.5 * ax * dt * dt - 0.5 * ax * c_time * c_time;
                yy = 0.5 * ay * dt * dt - 0.5 * ay * c_time * c_time;
            } else if (data['twoPointType'] === "抛物线移动") {
                let dx = data['twoPointDifferenceX'];
                let dy = data['twoPointDifferenceY'];
                let dt = data['movementTime'];
                let org_speed = data['twoPointParabolaSpeed'];
                let org_dir = data['twoPointParabolaDir'] / 180 * Math.PI;

                // >（单独旋转轴公式测试）
                //var c_dx = dx * Math.cos( -1*org_dir ) - dy * Math.sin( -1*org_dir );
                //var c_dy = dx * Math.sin( -1*org_dir ) + dy * Math.cos( -1*org_dir );
                //var c_xx = c_dx / dt * time;
                //var c_yy = c_dy / dt * time;
                //var c_xx = org_speed * time;
                //var c_yy = 0 * time;
                //xx = c_xx * Math.cos( org_dir ) - c_yy * Math.sin( org_dir );
                //yy = c_xx * Math.sin( org_dir ) + c_yy * Math.cos( org_dir );

                // > 旋转坐标轴
                let c_dx = dx * Math.cos(-1 * org_dir) - dy * Math.sin(-1 * org_dir);
                let c_dy = dx * Math.sin(-1 * org_dir) + dy * Math.cos(-1 * org_dir);
                let c_speedX = c_dx / dt;
                let c_speedY = c_dy / dt;

                // > 加速度公式（抛物线）
                let c_x_v1 = 0 + org_speed - c_speedX;
                let c_y_v1 = 0 - c_speedY;
                let c_x_a = c_x_v1 / dt;
                let c_y_a = c_y_v1 / dt;

                let c_xx = org_speed * time - c_x_a * time * time; //（粒子初速度一定是 原方向+原速度，通过匀加速改变朝向）
                let c_yy = 0 * time - c_y_a * time * time;

                // > 转回坐标轴
                xx = c_xx * Math.cos(org_dir) - c_yy * Math.sin(org_dir);
                yy = c_xx * Math.sin(org_dir) + c_yy * Math.cos(org_dir);
            }
            xx = orgX + xx;
            yy = orgY + yy;
            obj_data._drill_COBa_x.push(xx);
            obj_data._drill_COBa_y.push(yy);
        }
    }

    static drill_COBa_directionFunction_1(p) {
        const result = p.d0; //（固定方向）
        return result;
    }

    static drill_COBa_directionFunction_2(p) {
        const result = p.d0 + 360 * p.index / p.num; //（在一个圆圈里，线性放入固定数量的粒子）
        return result;
    }
	
	static drill_COBa_directionFunction_3(p) {
		const result = p.d0 + 360 * p.ran;
		return result;
	}
	
	static drill_COBa_directionFunction_4(p) {
		const result = p.d0 + 360 * p.ran + 30 * Math.random(); //（ Math.random() 虽然是随机的，但是不可控）
		return result; //（ 如果系统要记录随机弹幕的轨迹，那么尽量要避免用 Math.random()，改用随机因子 ）
	}
	
	static drill_COBa_directionFunction_5(p) {
		let result = p.sFace;
		if (p.num > 1) {
			result = p.sFace + p.sDegree * p.index / (p.num - 1) - p.sDegree / 2;
		} else {
			result = p.sFace;
		}
		return result;
	}
	
	static drill_COBa_directionFunction_6(p) {
		const result = p.sFace + p.sDegree * (p.ran - 0.5); //（根据p.sDegree，算出波动范围方向，与朝向相加即可）
		return result;
	}
	
	static drill_COBa_speedFunction_1(p) {
		const result = p.v0 * p.time; //（速度x时间）
		return result;
	}
	
	static drill_COBa_speedFunction_2(p) {
		const v_ran = p.wave * (p.ran - 0.5); //（根据波动量，算出波动速度）
		const result = (p.v0 + v_ran) * p.time; //（随机速度x时间）
		return result;
	}
	
	static drill_COBa_speedFunction_3(p) {
		const v_ran = p.wave * (p.ran - 0.5); //（根据波动量，算出波动速度）
		const result = (p.v0 + v_ran) * p.time + 0.5 * p.a * p.time * p.time; //（加速度公式）
		return result;
	}
	
	static drill_COBa_speedFunction_4(p) {
		const v_ran = p.wave * (p.ran - 0.5); //（根据波动量，算出波动速度）
		// > 加速度公式
		const v1 = (p.v0 + v_ran) + p.a * p.time;
		const d = (p.v0 + v_ran) * p.time + 0.5 * p.a * p.time * p.time;
		let result = d;

		// > 分段函数（超过上限/下限，将减去多出的路程值）
		if (v1 >= p.vMax) {
			const m_v = v1 - p.vMax;
			const m_t = (v1 - p.vMax) / p.a;
			result = d - m_v * m_t + 0.5 * p.a * m_t * m_t;
		}
		if (v1 <= p.vMin) {
			const m_v = v1 - p.vMin;
			const m_t = (v1 - p.vMin) / p.a;
			result = d - m_v * m_t + 0.5 * p.a * m_t * m_t;
		}
		return result;
	}
/**
 * 透明度弹道 - 初始化（接口，单次调用）
 *
 *			说明：给传来的data进行初始赋值，主要功能为数学计算。
 *			参数：见默认值，执行接口后，data指针中将被赋值旋转角数据。
 *			返回：无
 */	
	static setOpacityOrbitData(inputData) {
        this._opacityData = {};
        const data = this._opacityData;
		data.opacityTime = Number(inputData.opacityTime) || 1;//透明度 - 变化时长
		data.opacityType = inputData.opacityType || '固定数值';//透明度 - 类型（固定数值/线性变化/锚点控制/计算公式）
		data.opacityFix = Number(inputData.opacityFix) || 0;//透明度 - 固定值
		data.opacityFixRandom = Number(inputData.opacityFixRandom) || 0;//透明度 - 固定值(随机)
		data.opacityTarget = Number(inputData.opacityTarget) || 0;//透明度 - 目标透明度
		data.opacityDelay = Number(inputData.opacityDelay) || 30;//透明度 - 变化延迟
		data.opacityTranTime = Number(inputData.opacityTranTime) || 30;//透明度 - 变化时长
		data.opacityPoints = JSON.parse(inputData.opacityPoints) || [{
                'x': 0,
                'y': 0
            }, {
                'x': 45,
                'y': 255
            }, {
                'x': 65,
                'y': 255
            }, {
                'x': 100,
                'y': 0
            }
        ];//透明度 - 默认锚点
		data.opacityFormula = inputData.opacityFormula || 'return 0';//透明度 - 计算公式
		data.opacityFunction = new Function('id', 'time', 'oRan', 'o0', 'o1', 'o2','t1', 't2', data.opacityFormula);
		data.opacityRandomFactor = Number(inputData.opacityRandomFactor) || -1;//透明度 - 随机因子（锁定随机值专用,0-1之间）
	}


/**
 * 透明度弹道 - 预推演（接口，单次调用）
 *
 *			说明：根据当前的弹道参数设置，开始计算轨迹，主要功能为数学计算。
 *			参数：对象容器，对象编号，初始旋转角
 *				  执行后，obj_data指针中将被赋值弹道结果。
 *			返回：无
 */
 
	static calculateMoveOrbit(obj_data, obj_index, orgOpacity) {
        const data = this._opacityData;
		obj_data['_drill_COBa_opacity'] = [];
		obj_data['_drill_COBa_opacity'][0] = orgOpacity;

		// > 随机值
		let randomOpacity = Math.random(); //透明度随机因子
		if (data['opacityRandomFactor'] !== -1) {
			randomOpacity = data['opacityRandomFactor'];
		}

		for (let time = 1; time < data['opacityTime']; time++) {
			// > 透明度（直角坐标模式）
			let opacity = 0;
			if (data['opacityType'] == "固定数值") {
				let o1 = data['opacityFix'];
				opacity = o1;
			} else if (data['opacityType'] == "固定数值(随机)") {
				let o1 = data['opacityFix'];
				let oRan = data['opacityFixRandom'] * (randomOpacity - 0.5);
				opacity = o1 + oRan;
			} else if (data['opacityType'] == "线性变化") {
				let o2 = data['opacityTarget'];
				let t1 = data['opacityDelay'];
				let t2 = data['opacityTranTime'];
				if (time <= t1) {
					opacity = orgOpacity;
				} else if (time <= t1 + t2) {
					let p_time = time - t1;
					opacity = orgOpacity + (o2 - orgOpacity) / t2 * p_time;
				} else {
					opacity = o2;
				}
			} else if (data['opacityType'] == "锚点控制") {
				//...
			} else if (data['opacityType'] == "计算公式") {
				let o0 = orgOpacity;
				let o1 = data['opacityFix'];
				let oRan = data['opacityFixRandom'] * (randomOpacity - 0.5);
				let o2 = data['opacityTarget'];
				let t1 = data['opacityDelay'];
				let t2 = data['opacityTranTime'];
				opacity = data['opacityFunction'].call(this, obj_index, time, oRan, o0, o1, o2, t1, t2);
			}
			obj_data['_drill_COBa_opacity'].push(opacity);
		}
	}
}

//=============================================================================
// Utilities
//=============================================================================

GF.Util = GF.Util || {};

// * 工具 - 字符串 转 锚点列表
GF.Util.drill_COBa_convertStringToPointList = function (str) {
    str = str.replace(/[ ]/g, ""); //（去空格）
    str = str.replace(/[\(（]/g, ""); //（去左括号，包括中文）
    str = str.replace(/[\)）]/g, ""); //（去右括号，包括中文）
    str = str.split(/[,，]/g); //（根据逗号分隔，包括中文）

    // > 格式不符则返回空数组
    if (str.length == 0 || str.length % 2 == 1) {
        return [];
    }

    // > 锚点列表
    var point_list = [];
    for (var j = 0; j < str.length; j += 2) {
        var x = Number(str[j]);
        var y = Number(str[j + 1]);
        point_list.push({
            'x': x,
            'y': y
        });
    }
    return point_list;
};

// * 工具 - 锚点列表 转 字符串
GF.Util.drill_COBa_convertPointListToString = function (point_list) {
    var str = "";
    for (var j = 0; j < point_list.length; j++) {
        var point = point_list[j]
            str += "(" + point.x + "," + point.y + ")";
        if (j < point_list.length - 1) {
            str += ",";
        }
    }
    return str;
};

// * 值校验
GF._drill_COBa_checkOn = true; //（出错一次后，永久关闭）
GF.Util.drill_COBa_checkValue = function (p, result) {
    if (!GF._drill_COBa_checkOn) return;
    if (result === undefined) {
        GF._drill_COBa_checkOn = false;
        alert(
            "【GF_0_CoreOfMech.js 系统 - 物理核心】" +
            "\n检测到公式值出现undefined未定义，请及时检查你的公式是否正确。" +
            "\n当前取值：" + JSON.stringify(p));
    }
    if (isNaN(result)) {
        GF._drill_COBa_checkOn = false;
        alert(
            "【GF_0_CoreOfMech.js 系统 - 物理核心】" +
            "\n检测到公式值出现NaN值，请及时检查你的公式是否正确。" +
            "\n当前取值：" + JSON.stringify(p));
    } else if (!isFinite(result)) {
        GF._drill_COBa_checkOn = false;
        alert(
            "【GF_0_CoreOfMech.js 系统 - 物理核心】" +
            "\n检测到公式值出现无穷大/无穷小，请及时检查你的公式是否正确。" +
            "\n当前取值：" + JSON.stringify(p));
    }
};

//=============================================================================
// End of File
//=============================================================================
