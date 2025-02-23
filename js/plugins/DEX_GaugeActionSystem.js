/*:
 * @plugindesc v2.2 仿星霞谷垂钓插件（Duang 魔改福利版）。
 * @author Procraftynation（Duang 魔改版）
 *  
 * @help
 * ============================================================================
 * https://github.com/procraftynation 
* 文档：
* 
* @param yu_frame
* @desc 用于调节播放鱼 序列图标的间隔  （数值越大 序列播放的越慢）
* @default 2
* 概述：
* 仿星霞谷垂钓插件
*  
* 原作者为 仪表插件作者为  Procraftynation  Duang在此基础上做了大量改动
* 
* 使用素材建议与按测试用素材规格来
*
* 注意： ！！！！！
* 此版本为个人魔改福利版 未得到允许不可商用
* 若想商用请下载原版  https://github.com/procraftynation 
* 或联系 Duang  qq：546566631
* 已加入863966119 的群友的可以商用  这是群主给大家的福利嘿嘿
* 如果你使用了本插件，请在致谢中包含'Duang' 谢啦！
 *    使用方式
 *    $gameSystem.gauge("fishing").fill("DefaultFill",81,27).cursor("yu");
 *    $gameSystem.gauge("fishing").rotateCounter90();
 *    $gameSystem.gauge("fishing").offset(181,577);
 *    $gameSystem.gauge("fishing").background("DefaultBackground");
 *    $gameSystem.gauge("fishing").lifetime("DefaultTimer",81,77);
    
 *    //设置基础鱼的参数
 *    $gameSystem.gauge("fishing").Duang_Set(1,1,1.1,0.5,0);
 *    Duang_Set 参数讲解
 *    参数1: 鱼的游泳类型 分为 1 基础型  2突进型 3鬼畜型 4 鱼王乱窜型  例：1
 *    参数2: 等级 默认1  理论上可以随意加 建议不要加的太过分 不然鱼会飞玩家钓不到 例：1
 *    参数3: 时间条上升速度 例：1
 *    参数4: 时间条下降速度 例：0.5
 *    参数5: 阻力  用于降低绿块上升速度  例：0
 *
 *  //开始
    $gameSystem.gauge("fishing").waitToFinish().start();
    
    判断是否成功  $gameSystem.gauge("fishing").isSuccess();
    判断是否失败  $gameSystem.gauge("fishing").isFailed();
    具体用法看示例！
* v2.2 -  鱼 支持序列图标。 优化滑块判定
* v1.00 - 初始版本！
* ================================================== =====================
* 使用条款
* ================================================== =====================
* 此版本为个人魔改福利版 未得到允许不可商用
* 若想商用请下载原版  https://github.com/procraftynation 
* 已加入863966119 的群友的可以商用 
* 如果你使用了本插件，请在致谢中包含'Duang' 谢啦！
* ================================================== =====================*/
(function () 
{
	
	    var parameters = PluginManager.parameters('DEX_GaugeActionSystem');
		var yu_frame = Number(parameters['yu_frame']) || 2;
	
    var Imported = Imported || {};
    Imported.DEX_GAS = true;
    var DEX = DEX || {};
    DEX.GAS = DEX.GAS || {};
    DEX.GAS.CONS = 
    {
        ROTATE00 : 0, ROTATE90C : 90, ROTATE90CC : - 90, POS_LOWER_LEFT : 1, POS_LOWER_CENTER : 2, POS_LOWER_RIGHT : 3, 
        POS_CENTER_LEFT : 4, POS_CENTER_CENTER : 5, POS_CENTER_RIGHT : 6, POS_UPPER_LEFT : 7, POS_UPPER_CENTER : 8, 
        POS_UPPER_RIGHT : 9, POS_ABOVE_PLAYER : 10, POS_BELOW_PLAYER : 11, POS_ABOVE_EVENT : 12, POS_BELOW_EVENT : 13, 
        RESULT_NONE : 0, RESULT_SUCCESS : 1, RESULT_FAILURE : 2, RESULT_CANCEL : 3, ACTION_NONE : 0, ACTION_FILL : 1, 
        ACTION_CURSOR : 2, DIR_LEFT : - 1, DIR_RIGHT : 1 
    };
    function GaugeComponent() 
    {
        this.initialize.apply(this, arguments);
    }
    GaugeComponent.prototype = Object.create(Sprite.prototype);
    GaugeComponent.prototype.constructor = GaugeComponent;
    GaugeComponent.prototype.initialize = function (bitmap, offsetX, offsetY) 
    {
        Sprite.prototype.initialize.call(this, bitmap);
        this.__offsetX = offsetX || 0;
        this.__offsetY = offsetY || 0;
        this.__isReady = false;
        this.__offsetUpdate = false;
    };
    GaugeComponent.prototype.isReady = function () 
    {
        if (this.bitmap && this.bitmap.height !== 0 && this.bitmap.width !== 0) {
            return true;
        }
        return false;
    };
    GaugeComponent.prototype.updateOffsetPosition = function () 
    {
        if (this.__offsetUpdate) {
            return;
        }
        this.x += this.__offsetX;
        this.y += this.__offsetY;
        this.__offsetUpdate = true;
    };
    GaugeComponent.prototype.reset = function () 
    {
        this.__offsetUpdate = false;
    };
    function GaugeFillComponent() 
    {
        this.initialize.apply(this, arguments);
    }
    GaugeFillComponent.prototype = Object.create(GaugeComponent.prototype);
    GaugeFillComponent.prototype.constructor = GaugeFillComponent;
    GaugeFillComponent.prototype.initialize = function (bitmap, offsetX, offsetY) 
    {
	
        GaugeComponent.prototype.initialize.call(this, bitmap, offsetX, offsetY);
        this.__isMoving = true;
        this.__fillSpeed = 3;
        this.__emptySpeed = 0;
        this.__startAt = 0;
        this.__reset = true;
        this.__nowel = 0;
    	 this. youbiao = new Sprite();
   
        this.addChild(this. youbiao);
        this.__value = 0;
    };
    GaugeFillComponent.prototype.handleFilling = function () 
    {
        if (!this.__isMoving || !this.bitmap) {
            return false;
        }
        if (this.__fillSpeed - this.__nowel > 0) {
            this.__fillSpeed = this.__fillSpeed - this.__nowel;
        }
        else {
            this.__fillSpeed = 1;
        }	
        this.__value += this.__fillSpeed;
        if (this.__value >= this.bitmap.width - this. youbiao.bitmap.width) {
            if (this.__reset) {
                this.__value = this.bitmap.width - this. youbiao.bitmap.width;
            }
            else {
                this.__value = 0;
            }
        }
        this.setFrame(0, 0, this.__value, this.bitmap.height);
        this. youbiao.x = this.__value;
    };
    GaugeFillComponent.prototype.handleEmptying = function () 
    {
        if (!this.__isMoving || !this.bitmap) {
            return false;
        }
        if (this.__emptySpeed === 0) {
            this.__value -= this.__fillSpeed;
        }
        else {
            this.__value -= this.__emptySpeed;
        }
        this.setFrame(0, 0, this.__value, this.bitmap.height);
        if (this.__value < 0) {
            this.__value = 0;
        }
        this. youbiao.x = this.__value;
    };
    GaugeFillComponent.prototype.reset = function () 
    {
        this.__value = 0;
    };
    function GaugeCursorComponent() 
    {
        this.initialize.apply(this, arguments);
    }
    GaugeCursorComponent.prototype = Object.create(GaugeComponent.prototype);
    GaugeCursorComponent.prototype.constructor = GaugeCursorComponent;
    GaugeCursorComponent.prototype.initialize = function (bitmap, offsetX, offsetY) 
    {
        GaugeComponent.prototype.initialize.call(this, bitmap, offsetX, offsetY);
        this.__isMoving = true;
        this.__speed = 1;
        this.__bounce = true;
        this.__direction = DEX.GAS.CONS.DIR_RIGHT;
        // 1
		this._frameCount = 0;
		
		this.__hit_Shake=false;

		this.__hit_Shakey=0;
		
        this.__maxMovementX = 0;
        this.__minMovementX = 0;
        this.__unMovedX = 50;
        this.__fishLevel = 1;
        // 1 基础型：移动平缓偶尔停止（鲤鱼）  2 急升（降）型：会突然上升或下降一大段，之后简单 3鬼畜型：会短距离不断上下运动（冰柱鱼，蝎鲤鱼） 4 乱窜型：上蹿下跳毫无规律（鲶鱼，春季鱼王）
        this.__movetype = 1;
        this.__eventTime = 40;
        //默认先执行40帧默认移动
        this.__eventcount = 0;
        this.__eventtype = 0;
        this.__eventBBcount = 0;
        this.__eventBB_interval = 0;
    };
    //////////////////////////
    //基础型 移动平缓偶尔停止
    GaugeCursorComponent.prototype.movetype111 = function (x) 
    {
        if (this.__eventTime > 0)
        {
            if (this.__eventtype == 1) { }
            else {
                x += (this.__direction * this.__speed);
            }
            this.__eventTime--;
            return x;
        }
        this.__speed = this.__fishLevel / 10 + 1;
        var ra = 30 - (1 / 5 * this.__fishLevel) - this.__eventcount * 2;
        var randomstr = parseInt(Math.random() * 100);
        var boo = randomstr < ra;
        if (boo) {
            this.__eventTime = 150;
            this.__eventcount++;
            this.__eventtype = 1;
        }
        else {
            x += (this.__direction * this.__speed);
            this.__eventtype = 0;
            this.__eventTime = 300;
        }
        return x;
    };
    //////////////////////////
    GaugeCursorComponent.prototype.movetype222 = function (x) 
    {
        var addspeed = this.__fishLevel / 10 + 2;
        if (this.__eventTime > 0)
        {
            if (this.__eventtype == 2) {
                x += (this.__direction * (this.__speed + addspeed));
            }
            else {
                x += (this.__direction * this.__speed);
            }
            this.__eventTime--;
            return x;
        }
        this.__speed = this.__fishLevel / 10 + 1;
        var ra = 70 + (1 / 5 * this.__fishLevel) - this.__eventcount * 10;
        if (this.__eventcount >= 3) {
            ra = 0;
        }
        var randomstr = parseInt(Math.random() * 100);
        var boo = randomstr < ra;
        if (boo)
        {
            x += (this.__direction * (this.__speed + addspeed));
            this.__eventTime = 45;
            this.__eventcount++;
            this.__eventtype = 2;
        }
        else {
            x += (this.__direction * this.__speed);
            this.__eventtype = 0;
            this.__eventTime = 300;
        }
        return x;
    };
    //////////////////////////
    //鬼畜型：会短距离不断上下运动（冰柱鱼，蝎鲤鱼）
    GaugeCursorComponent.prototype.movetype333 = function (x) 
    {
        var addspeed = this.__fishLevel / 10 + 4;
        if (this.__eventTime > 0)
        {
            if (this.__eventtype == 1) { }
            else if (this.__eventtype == 3)
            {
                if (this.__eventBBcount != 0)
                {
                    if (this.__eventTime % this.__eventBB_interval == 0)
                    {
                        var falg = parseInt(Math.random() * 2);
                        if (falg != 0)
                        {
                            if (this.__direction == 1) {
                                this.__direction =- 1;
                            }
                            else if (this.__direction ==- 1) {
                                this.__direction == 1;
                            }
                        }
                    }
                }
                x += (this.__direction * (this.__speed + addspeed));
            }
            else {
                x += (this.__direction * this.__speed);
            }
            this.__eventTime--;
            return x;
        }
        this.__speed = this.__fishLevel / 10 + 1;
        var ra = 80 + (1 / 5 * this.__fishLevel);
        var randomstr = parseInt(Math.random() * 100);
        var boo = randomstr < ra;
        if (boo)
        {
            var i = this.randomNum(0, 4);
            if (i != 0)
            {
                x += (this.__direction * (this.__speed + addspeed));
                this.__eventTime = 30 + parseInt(this.__fishLevel / 10 + 2);
                this.__eventcount++;
                this.__eventtype = 3;
                var min = Math.ceil(this.__fishLevel / 30);
                var eventBBcount = this.randomNum(min, 4 + min);
                this.__eventBBcount = eventBBcount;
                if (this.__eventBBcount != 0) {
                    this.__eventBB_interval = parseInt(this.__eventTime / this.__eventBBcount);
                }
            }
            else {
                this.__eventTime = 50 - parseInt(this.__fishLevel / 10 + 2);
                this.__eventtype = 1;
            }
        }
        else {
            x += (this.__direction * this.__speed);
            this.__eventtype = 0;
            this.__eventTime = 60;
        }
        if (this.__eventcount % 5 == 0) {
            this.__eventtype = 0;
            this.__eventTime = 120 - this.__fishLevel;
        }
        return x;
    };
    //////////////////////////
    //鱼王型：乱窜型：上蹿下跳毫无规律（鲶鱼，春季鱼王）
    GaugeCursorComponent.prototype.movetype444 = function (x) 
    {
        var addspeed = this.__fishLevel / 10 + 5;
        if (this.__eventTime > 0)
        {
            if (this.__eventtype == 4) {
                x += (this.__direction * this.__speed);
            }
            else if (this.__eventtype == 3)
            {
                if (this.__eventBBcount != 0)
                {
                    if (this.__eventTime % this.__eventBB_interval == 0)
                    {
                        var falg = parseInt(Math.random() * 2);
                        if (falg != 0)
                        {
                            if (this.__direction == 1) {
                                this.__direction =- 1;
                            }
                            else if (this.__direction ==- 1) {
                                this.__direction == 1;
                            }
                            var addspeeddir = this.randomNum(2, 4);
                            addspeed = addspeed + parseInt(addspeed * addspeeddir);
                        }
                    }
                }
                x += (this.__direction * (this.__speed + addspeed));
            }
            else {
                x += (this.__direction * this.__speed);
            }
            this.__eventTime--;
            return x;
        }
        this.__speed = this.__fishLevel / 10 + 1;
        var ra = 85 + (1 / 5 * this.__fishLevel);
        var randomstr = parseInt(Math.random() * 100);
        var boo = randomstr < ra;
        if (boo)
        {
            var i = this.randomNum(0, 3);
            if (i != 0)
            {
                x += (this.__direction * (this.__speed + addspeed));
                this.__eventTime = 30 + parseInt(this.__fishLevel / 10 + 2);
                this.__eventcount++;
                this.__eventtype = 3;
                var min = Math.ceil(this.__fishLevel / 30);
                var eventBBcount = this.randomNum(min, 4 + min);
                this.__eventBBcount = eventBBcount;
                if (this.__eventBBcount != 0) {
                    this.__eventBB_interval = parseInt(this.__eventTime / this.__eventBBcount);
                }
            }
            else
            {
                this.__eventTime = 20 - parseInt(this.__fishLevel / 10 + 2);
                this.__eventtype = 4;
                if (this.__direction == 1) {
                    this.__direction =- 1;
                }
                else if (this.__direction ==- 1) {
                    this.__direction == 1;
                }
                x += (this.__direction * this.__speed);
            }
        }
        else {
            x += (this.__direction * this.__speed);
            this.__eventtype = 0;
            this.__eventTime = 30;
        }
        if (this.__eventcount % 6 == 0) {
            this.__eventtype = 0;
            this.__eventTime = 60 - this.__fishLevel;
        }
        return x;
    };
    //生成从minNum到maxNum的随机数
    GaugeCursorComponent.prototype.randomNum = function (minNum, maxNum)
    {
        switch (arguments.length)
        {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
    GaugeCursorComponent.prototype.handleMovement = function () 
    {
        if (!this.__isMoving) {
            return;
        }
        if (this.__unMovedX === - 1) {
            this.__unMovedX = this.x;
        }
        switch (this.__movetype)
        {
            case 1:
                this.x = this.movetype111(this.x);
                break;
            case 2:
                this.x = this.movetype222(this.x);
                break;
            case 3:
                this.x = this.movetype333(this.x);
                break;
            case 4:
                this.x = this.movetype444(this.x);
                break;
            default:
                this.x = this.movetype111(this.x);
                break;
        }
		if(this.__hit_oldvalue==0){
			this.__hit_oldvalue=this.y;
		}
		if( this.__hit_Shake){
				if (this.__direction == 1) {
                    this.__hit_Shakey =1;
                }
                else if (this.__direction ==- 1) {
                     this.__hit_Shakey =2;
                }
		}else{
				if (this.__direction == 1) {
                    this.__hit_Shakey =0;
                }
                else if (this.__direction ==- 1) {
                     this.__hit_Shakey =3;
                }
		}
        var boo = this.__maxMovementX;
        if ( this.x >= boo) {
            this.__direction = DEX.GAS.CONS.DIR_LEFT;
        }
        else if ( this.x <= this.__minMovementX) {
            this.__direction = DEX.GAS.CONS.DIR_RIGHT;
            // 1
        }
    };
    GaugeCursorComponent.prototype.movementRange = function (min, max) 
    {
        this.__minMovementX = min;
        this.__maxMovementX = max;
    };
    GaugeCursorComponent.prototype.reset = function () 
    {
        this.x = this.__unMovedX;
        this.__eventTime = 40;
        this.__eventcount = 0;
        this.__eventtype = 0;
        this.__eventBBcount = 0;
        this.__eventBB_interval = 0;
        this.__direction = DEX.GAS.CONS.DIR_RIGHT;
    };
	
	
	GaugeCursorComponent.prototype.update = function() {
        if (this._frameCount %yu_frame === 0) this.updateSprite();
        this._frameCount++;
    };
	 GaugeCursorComponent.prototype.updateSprite = function() {
            var frame = Math.floor(this._frameCount / yu_frame) % 3;
		//	console.log(frame);
            var sw = this.bitmap.width / 3;
            var sh = this.bitmap.height / 4;
            var ox = 0;
            var oy = 0;
            this.setFrame(sw * frame + ox * sw,this.__hit_Shakey*sh+ oy * sh, sw, sh);
    };
	
    /*GaugeLifetimeComponent 时间类
     * GaugeLifetimeComponent Class
     */
    function GaugeLifetimeComponent() 
    {
        this.initialize.apply(this, arguments);
    }
    GaugeLifetimeComponent.prototype = Object.create(GaugeComponent.prototype);
    GaugeLifetimeComponent.prototype.constructor = GaugeLifetimeComponent;
    GaugeLifetimeComponent.prototype.initialize = function (bitmap, offsetX, offsetY) 
    {
        GaugeComponent.prototype.initialize.call(this, bitmap, offsetX, offsetY);
        this.__direction = DEX.GAS.CONS.DIR_LEFT;
        //decreasing 递减
        this.__isDead = false;
        this.__isEternal = false;
        this.__fillSpeedup = 1.2;
        this.__fillSpeeddown = 0.6;
        this.__lifevalue = 0;
    };
    GaugeLifetimeComponent.prototype.handleLifetime = function () 
    {
        if (this.__isEternal || this.__isDead) {
            return false;
        }
        if (this.bitmap) 
        {
            this.__lifevalue += this.__fillSpeedup;
            if (this.__lifevalue >= this.bitmap.width) {
                this.__isEternal = true;
				this.__isDead = true;
            }
            this.setFrame(0, 0, this.__lifevalue, this.bitmap.height);
        }
    };
    GaugeLifetimeComponent.prototype.handleLifetimeDown = function () 
    {
        if (this.__isEternal || this.__isDead) {
            return false;
        }
        if (this.bitmap) 
        {
            this.__lifevalue -= this.__fillSpeeddown;
            if (this.__lifevalue <= 0) {
               this.__isDead = true;
            }
            this.setFrame(0, 0, this.__lifevalue, this.bitmap.height);
        }
    };
    GaugeLifetimeComponent.prototype.kill = function () 
    {
        this.__lifevalue = 0;
        this.__isDead = true;
    };
    GaugeLifetimeComponent.prototype.reset = function () 
    {
        this.__lifevalue = 0;
        this.__isDead = false;
		 this.__isEternal = false;
    };
    /*
     * GaugeContainer Class
     */
    function GaugeContainer() 
    {
        this.initialize.apply(this, arguments);
    }
    GaugeContainer.prototype = Object.create(Sprite.prototype);
    GaugeContainer.prototype.constructor = GaugeContainer;
    GaugeContainer.prototype.initialize = function (gaugeId) 
    {
        Sprite.prototype.initialize.call(this);
        this.width = 0;
        // auto computed based on child images  根据子图像自动计算
        this.height = 0;
        // auto computed based on child images 根据子图像自动计算
        //To avoid collision with Sprite variables we use double underscores (__) as variable prefixes  为了避免与 Sprite 变量发生冲突，我们使用双下划线 (__) 作为变量前缀
        this.__gaugeId = gaugeId;
        this.__action = DEX.GAS.CONS.ACTION_FILL;
        this.__waitToFinish = false;
        //IMAGE components 图像组件
        this.__components = {};
        this.__components.fill = new GaugeFillComponent();
        this.__components.cursor = new GaugeCursorComponent();
        this.__components.lifetime = new GaugeLifetimeComponent();
        this.__components.background = new GaugeComponent();
        this.__components.foreground = new GaugeComponent();
        //POSITIONING 定位
        this.__position = DEX.GAS.CONS.POS_UPPER_CENTER;
        this.__rotation = DEX.GAS.CONS.ROTATE00;
        this.__offsetX = 0;
        this.__offsetY = 0;
        this.__attachedMapEventId = 0;
        this.__successPoint = 50;
        //percentage center position based on fill width. 1-100  基于填充宽度的百分比中心位置。1-100
        this.__successPointAbove = false;
        this.__successPointBelow = false;
        this.__successPointMin = 0;
        this.__successPointMax = 0;
        //RESULT RELATED  结果相关
        this.__result = DEX.GAS.CONS.RESULT_NONE;
        //ON SUCCESS 成功
        this.__mapEventId = 0;
        this.__commonEventId = 0;
        //ACTION VARIABLE 动作变量
        this.__resultVariableId = 0;
        //values 1,2,3 which indicates success, failure & cancel respectively  值1,2,3分别表示成功，失败和取消
        this.__staringOpacity = 255;
        //FADE OUT OPTIONS 淡出选项
        this.__fadeOutSpeed = 10;
        //frames  帧
        this.__pauseBeforeFadeOut = 45;
        //frames 帧
        this.__pausedFrames = 0;
        //flags used inside plugin only  仅在插件内部使用的标志
        this.__componentsDisplayed = false;
        this.__isFinished = false;
    };
    GaugeContainer.prototype.update = function () 
    {
        Sprite.prototype.update.call(this);
        //setup  设置
        if (!this.__componentsDisplayed) {
            this.__setUpComponents();
        }
        if (this.__attachedMapEventId !== 0) {
            this.__moveGaugeToPosition();
        }
        this.__handleCancel();
        //iscanceled 已取消
		if (this.__components.lifetime.__isEternal) 
        {
           this.__determineResult();
        }
        if (this.__components.lifetime.__isDead) 
        {
			if(!this.__components.lifetime.__isEternal){
				  this.__determineResultD();
			}
            this.__updateFadeOut();
            return false;
            //stop code to reach handleFilling  停止代码到达handleFilling
        }
		
        //do the gauge filling here  在这里进行仪表填充
        /* if (this.__components.cursor.__isMoving) {
            this.__handleMovingCursor();
        } else {
            this.__handleFilling();
        } */
        //////////////////////////////////自己修改
        this.__handleFilling();
        this.__components.cursor.handleMovement();
        //////////////////////////////////
        this.__handleLifetime();
		
      
    };
    GaugeContainer.prototype.reset = function () 
    {
        this.opacity = this.__staringOpacity;
        this.__componentsDisplayed = false;
        this.__pausedFrames = 0;
        this.__isFinished = false;
        this.__result = DEX.GAS.CONS.RESULT_NONE;
        //reset for reuse  重用
        for (var key in this.__components) {
            this.__components[key].reset();
        }
    };
    //==================
    // Private methods 私有方法
    //==================
    GaugeContainer.prototype.__finish = function () 
    {
        if (this.__isFinished) {
            return false;
        }
        if (this.__resultVariableId !== 0) {
            $gameVariables.setValue(this.__resultVariableId, this.__result);
        }
        if (this.__commonEventId !== 0) {
            $gameTemp.reserveCommonEvent(this.__commonEventId);
        }
        else if (this.__mapEventId !== 0) {
            $gameMap.event(this.__mapEventId).start();
        }
        //enable character movement  启用角色移动
        if (this.__action !== DEX.GAS.CONS.ACTION_NONE) {
            $gameTemp._gaugeActionStop();
            $gameSystem.enableMenu();
        }
        this.__isFinished = true;
        SceneManager._scene.removeChild(this);
    };
    GaugeContainer.prototype.__updateFadeOut = function () 
    {
        this.__pausedFrames++;
        if (this.__pausedFrames >= this.__pauseBeforeFadeOut) 
        {
            this.opacity -= this.__fadeOutSpeed;
            if (this.opacity <= 0) {
                //only remove from scene if not visible anymore  仅在不再可见时从场景中删除
                this.__finish();
            }
        }
    };
    GaugeContainer.prototype.__handleMovingCursor = function () 
    {
        if (this.__action !== DEX.GAS.CONS.ACTION_NONE && (Input.isTriggered("ok") || TouchInput.isTriggered())) {
            this.__components.lifetime.kill();
        }
        else {
            this.__components.cursor.handleMovement();
        }
    };
    GaugeContainer.prototype.__handleFilling = function () 
    {
        if (this.__action !== DEX.GAS.CONS.ACTION_NONE && (Input.isPressed("ok") || TouchInput.isPressed())) {
            this.__components.fill.handleFilling();
        }
        else {
            this.__components.fill.handleEmptying();
        }
    };
    GaugeContainer.prototype.__handleLifetime = function () 
    {
        var falg = this.__determineResultMY();
        if (falg) {
			this.__components.cursor.__hit_Shake=true;
            this.__components.lifetime.handleLifetime();
        }
        else {
			this.__components.cursor.__hit_Shake=false;
            this.__components.lifetime.handleLifetimeDown();
        }
    };
    GaugeContainer.prototype.__determineResult = function () 
    {
         this.__result = DEX.GAS.CONS.RESULT_SUCCESS;
    };
	    GaugeContainer.prototype.__determineResultD = function () 
    {
         this.__result = DEX.GAS.CONS.RESULT_FAILURE;
    };
    GaugeContainer.prototype.__determineResultMY = function () 
    {
        if (this.__action === DEX.GAS.CONS.ACTION_FILL) 
        {
            var minSuccessPoint = 0;
            var maxSuccessPoint = 0;
       
            if (this.__successPointMin === 0 && this.__successPointMax === 0) 
            {
                if (this.__successPointAbove) 
                {
                    minSuccessPoint = this.__components.cursor.x + this.__components.cursor.bitmap.width / 3  / 2;
                    maxSuccessPoint = this.__components.cursor.x + this.__components.fill.bitmap.width;
                }
                else if (this.__successPointBelow) 
                {
                    minSuccessPoint = 0;
                    maxSuccessPoint = this.__components.cursor.x + this.__components.cursor.bitmap.width / 3  / 2;
                }
                else 
                {
                    minSuccessPoint = this.__components.cursor.x;
                    maxSuccessPoint = this.__components.cursor.x + this.__components.cursor.bitmap.width / 3;
                }
            }
            else 
            {
                minSuccessPoint = this.__components.fill.bitmap.width * this.__successPointMin  / 100;
                maxSuccessPoint = this.__components.fill.bitmap.width * this.__successPointMax  / 100;
            }
		
				var youbiaoW =this.__components.fill.youbiao.bitmap.width;
				var cursorW =this.__components.cursor.bitmap.width / 3;
			var   maxresult = this.__components.fill.width + this.__components.fill.__offsetX+ youbiaoW+cursorW;
			var   minresult = this.__components.fill.width + this.__components.fill.__offsetX;
		
            if (minSuccessPoint >= minresult && maxSuccessPoint <= maxresult ) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    GaugeContainer.prototype.__handleCancel = function () 
    {
        if (this.__action !== DEX.GAS.CONS.ACTION_NONE && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
            this.__result = DEX.GAS.CONS.RESULT_CANCEL;
            this.__components.lifetime.kill();
        }
    };
    GaugeContainer.prototype.__setUpComponents = function () 
    {
        if (this.__requiredComponentsReady()) 
        {
            this.__computeDimensions();
            this.__moveGaugeToPosition();
            this.__positionComponents();
            this.__componentsDisplayed = true;
            if (this.__components.cursor.__isMoving) 
            {
                this.__components.cursor.movementRange(this.__components.fill.x+22, this.__components.fill.x + this.__components.fill.bitmap.width+8);
				 this.__components.cursor.rotation= -1*this.__rotation * Math.PI  / 180
            }
            //rotate gauge  旋转仪表
            this.rotation = this.__rotation * Math.PI  / 180;
        }
    };
    GaugeContainer.prototype.__requiredComponentsReady = function () 
    {
        if (this.__action === DEX.GAS.CONS.ACTION_FILL || this.__action === DEX.GAS.CONS.ACTION_CURSOR) {
            return this.__components.fill.isReady() && this.__components.cursor.isReady();
        }
        else if (this.__action === DEX.GAS.CONS.ACTION_NONE) {
            return this.__components.lifetime.isReady();
        }
        return false;
    };
    GaugeContainer.prototype.__positionComponents = function () 
    {
        //update offsets  更新偏移量
        for (var key in this.__components) {
            this.__components[key].updateOffsetPosition();
        }
        if (this.__action === DEX.GAS.CONS.ACTION_NONE) {
            return false;
        }
        //vertically center cursor to fill  垂直居中光标填充
        this.__components.cursor.y = this.__components.fill.y + (this.__components.fill.bitmap.height - this.__components.cursor.bitmap.height/4)  / 2;
        //move cursor based on successpoint 根据成功点移动光标
        if (!this.__components.cursor.__isMoving) 
        {
            this.__components.cursor.x = this.__components.fill.x + (this.__components.fill.bitmap.width * (this.__successPoint  / 100)) - (this.__components.cursor.bitmap.width / 3  / 2);
            //bound to border only 只绑定到边框
            if (this.__components.cursor.x + this.__components.cursor.bitmap.width / 3 > this.__components.fill.bitmap.width) 
            {
                this.__components.cursor.x = this.__components.fill.bitmap.width - this.__components.cursor.bitmap.width / 3;
            }
            else if (this.__components.cursor.x - this.__components.cursor.bitmap.width / 3 < 0) {
                this.__components.cursor.x = 0;
                //this is relative to parent  这是相对于父级的
            }
        }
    };
    GaugeContainer.prototype.__computeDimensions = function () 
    {
        if (this.__components.background.isReady()) 
        {
            this.height = this.__components.background.bitmap.height;
            this.width = this.__components.background.bitmap.width;
        }
        else 
        {
            if (this.__action === DEX.GAS.CONS.ACTION_NONE) 
            {
                this.height = this.__components.lifetime.bitmap.height;
                this.width = this.__components.lifetime.bitmap.width;
            }
            else 
            {
                this.height = Math.max(this.__components.fill.bitmap.height, this.__components.cursor.bitmap.height/4);
                this.width = Math.max(this.__components.fill.bitmap.width, this.__components.cursor.bitmap.width / 3);
            }
        }
    };
    GaugeContainer.prototype.__moveGaugeToPosition = function () 
    {
        var x;
        var y;
        var baseWidth = Graphics.width;
        var baseHeight = Graphics.height;
        switch (this.__position) 
        {
            case DEX.GAS.CONS.POS_ABOVE_EVENT:
                x = this.__offsetX + $gameMap.event(this.__attachedMapEventId).screenX() - this.width  / 2;
                y = this.__offsetY + $gameMap.event(this.__attachedMapEventId).screenY() - this.height - $gameMap.tileHeight();
                break;
            case DEX.GAS.CONS.POS_BELOW_EVENT:
                x = this.__offsetX + $gameMap.event(this.__attachedMapEventId).screenX() - this.width  / 2;
                y = this.__offsetY + $gameMap.event(this.__attachedMapEventId).screenY();
                break;
            case DEX.GAS.CONS.POS_ABOVE_PLAYER:
                x = this.__offsetX + $gamePlayer.screenX() - this.width  / 2;
                y = this.__offsetY + $gamePlayer.screenY() - this.height - $gameMap.tileHeight();
                break;
            case DEX.GAS.CONS.POS_BELOW_PLAYER:
                x = this.__offsetX + $gamePlayer.screenX() - this.width  / 2;
                y = this.__offsetY + $gamePlayer.screenY();
                break;
            case DEX.GAS.CONS.POS_LOWER_LEFT:
                x = this.__offsetX;
                y = this.__offsetY + baseHeight - this.height;
                break;
            case DEX.GAS.CONS.POS_LOWER_CENTER:
                x = this.__offsetX + baseWidth  / 2 - this.width  / 2;
                y = this.__offsetY + baseHeight - this.height;
                break;
            case DEX.GAS.CONS.POS_LOWER_RIGHT:
                x = this.__offsetX + baseWidth - this.width;
                y = this.__offsetY + baseHeight - this.height;
                break;
            case DEX.GAS.CONS.POS_CENTER_LEFT:
                x = this.__offsetX;
                y = this.__offsetY + baseHeight  / 2 - this.height  / 2;
                break;
            case DEX.GAS.CONS.POS_CENTER_CENTER:
                x = this.__offsetX + baseWidth  / 2 - this.width  / 2;
                y = this.__offsetY + baseHeight  / 2 - this.height  / 2;
                break;
            case DEX.GAS.CONS.POS_CENTER_RIGHT:
                x = this.__offsetX + baseWidth - this.width;
                y = this.__offsetY + baseHeight  / 2 - this.height  / 2;
                break;
            case DEX.GAS.CONS.POS_UPPER_LEFT:
                x = this.__offsetX;
                y = this.__offsetY;
                break;
            case DEX.GAS.CONS.POS_UPPER_CENTER:
                x = this.__offsetX + baseWidth  / 2 - this.width  / 2;
                y = this.__offsetY;
                break;
            case DEX.GAS.CONS.POS_UPPER_RIGHT:
                x = this.__offsetX + baseWidth - this.width;
                y = this.__offsetY;
                break;
        }
        this.x = x;
        this.y = y;
    };
    //====================================
    // Called after setup through chained methods  通过链式方法设置后调用
    //====================================
    GaugeContainer.prototype.start = function () 
    {
        this.reset();
        //add children  添加孩子
        this.addChild(this.__components.background);
        this.addChild(this.__components.fill);
        this.addChild(this.__components.cursor);
        this.addChild(this.__components.lifetime);
        this.addChild(this.__components.foreground);
        SceneManager._scene.addChild(this);
        //only action gauge should stop movement or wait for action  只有动作仪表应该停止移动或等待动作
        if (this.__action === DEX.GAS.CONS.ACTION_FILL || this.__action === DEX.GAS.CONS.ACTION_CURSOR) {
            $gameTemp._gaugeActionStart(this.__waitToFinish);
            $gameSystem.disableMenu();
        }
    };
    //=====================================
    // CHAINED PUBLIC METHODS for setting up gauge  用于设置仪表的链式公共方法
    //=====================================
    //=====================================
    // GaugeFillComponent: setup methods  设置方法
    //=====================================
    GaugeContainer.prototype.fill = function (imageName, offsetX, offsetY) 
    {
        //immediately set up and add to child 立即设置并添加到孩子
        this.__components.fill.bitmap = ImageManager.loadPicture(imageName);
        this.__components.fill.__offsetX = offsetX || 0;
        this.__components.fill.__offsetY = offsetY || 0;
        return this;
    };
    GaugeContainer.prototype.fillSpeed = function (value) 
    {
        this.__components.fill.__fillSpeed = value;
        return this;
    };
    GaugeContainer.prototype.emptySpeed = function (value) 
    {
        this.__components.fill.__emptySpeed = value;
        return this;
    };
    GaugeContainer.prototype.fillReset = function () 
    {
        this.__components.fill.__reset = true;
        return this;
    };  
	GaugeContainer.prototype.youbiao = function (imageName) 
		{
			this.__components.fill.youbiao.bitmap = ImageManager.loadPicture(imageName);
			return this;
		};
    //=====================================
    // GaugeCursorComponent: helper setup methods 辅助设置方法
    //=====================================
    GaugeContainer.prototype.cursor = function (imageName) 
    {
        this.__components.cursor.bitmap = ImageManager.loadPicture(imageName);
		    var frame = 1;
		    var sw = 32;
            var sh = 32;
            var ox = 0;
            var oy = 0;
            this.__components.cursor.setFrame(sw * frame + ox * sw, oy * sh, sw, sh);
        return this;
    };
    GaugeContainer.prototype.movingCursor = function () 
    {
        this.__action = DEX.GAS.CONS.ACTION_CURSOR;
        this.__components.cursor.__isMoving = true;
        this.__components.fill.__isMoving = false;
        return this;
    };
    GaugeContainer.prototype.bounceCursor = function () 
    {
        this.__components.cursor.__bounce = true;
        return this;
    };
    GaugeContainer.prototype.cursorStartLeft = function () 
    {
        this.__components.cursor.__direction = DEX.GAS.CONS.DIR_RIGHT;
        return this;
    };
    GaugeContainer.prototype.cursorStartRight = function () 
    {
        this.__components.cursor.__direction = DEX.GAS.CONS.DIR_LEFT;
        return this;
    };
    GaugeContainer.prototype.cursorSpeed = function (value) 
    {
        this.__components.cursor.__speed = value;
        return this;
    };
    //=====================================
    // GaugeLifetimeComponent: helper setup methods  辅助设置方法
    //=====================================
    GaugeContainer.prototype.lifetime = function (imageName, offsetX, offsetY) 
    {
        this.__components.lifetime.bitmap = ImageManager.loadPicture(imageName);
        this.__components.lifetime.__offsetX = offsetX || 0;
        this.__components.lifetime.__offsetY = offsetY || 0;
        return this;
    };
    GaugeContainer.prototype.lifetimeValue = function (value) 
    {
        this.__components.lifetime.__lifevalue = value;
        return this;
    };
    GaugeContainer.prototype.eternalLife = function () 
    {
        this.__components.lifetime.__isEternal = true;
        return this;
    };
    GaugeContainer.prototype.lifetimeDecreasing = function () 
    {
        this.__components.lifetime.__direction = DEX.GAS.CONS.DIR_LEFT;
        return this;
    };
    GaugeContainer.prototype.lifetimeIncreasing = function () 
    {
        this.__components.lifetime.__direction = DEX.GAS.CONS.DIR_RIGHT;
        return this;
    };
    //=====================================
    // Rotation functions  旋转函数
    //=====================================
    GaugeContainer.prototype.rotateClockwise90 = function () 
    {
        this.__rotation = DEX.GAS.CONS.ROTATE90C;
        return this;
    };
    GaugeContainer.prototype.rotateCounter90 = function () 
    {
        this.__rotation = DEX.GAS.CONS.ROTATE90CC;
        return this;
    };
    GaugeContainer.prototype.rotateClockwise = function (degrees) 
    {
        this.__rotation = degrees;
        return this;
    };
    GaugeContainer.prototype.rotateCounter = function (degrees) 
    {
        this.__rotation = - (degrees);
        return this;
    };
    //=====================================
    // Positioning functions  定位函数
    //=====================================
    GaugeContainer.prototype.upperLeft = function () 
    {
        this.__position = DEX.GAS.CONS.POS_UPPER_LEFT;
        return this;
    };
    GaugeContainer.prototype.upperCenter = function () 
    {
        this.__position = DEX.GAS.CONS.POS_UPPER_CENTER;
        return this;
    };
    GaugeContainer.prototype.upperRight = function () 
    {
        this.__position = DEX.GAS.CONS.POS_UPPER_RIGHT;
        return this;
    };
    GaugeContainer.prototype.centerLeft = function () 
    {
        this.__gaugePosition = DEX.GAS.CONS.POS_CENTER_LEFT;
        return this;
    };
    GaugeContainer.prototype.centerCenter = function () 
    {
        this.__position = DEX.GAS.CONS.POS_CENTER_CENTER;
        return this;
    };
    GaugeContainer.prototype.centerRight = function () 
    {
        this.__position = DEX.GAS.CONS.POS_CENTER_RIGHT;
        return this;
    };
    GaugeContainer.prototype.lowerLeft = function () 
    {
        this.__position = DEX.GAS.CONS.POS_LOWER_LEFT;
        return this;
    };
    GaugeContainer.prototype.lowerCenter = function () 
    {
        this.__position = DEX.GAS.CONS.POS_LOWER_CENTER;
        return this;
    };
    GaugeContainer.prototype.lowerRight = function () 
    {
        this.__position = DEX.GAS.CONS.POS_LOWER_RIGHT;
        return this;
    };
    GaugeContainer.prototype.abovePlayer = function () 
    {
        this.__position = DEX.GAS.CONS.POS_ABOVE_PLAYER;
        return this;
    };
    GaugeContainer.prototype.belowPlayer = function () 
    {
        this.__position = DEX.GAS.CONS.POS_BELOW_PLAYER;
        return this;
    };
    GaugeContainer.prototype.aboveEvent = function (mapEventId) 
    {
        this.__position = DEX.GAS.CONS.POS_ABOVE_EVENT;
        this.__attachedMapEventId = mapEventId;
        return this;
    };
    GaugeContainer.prototype.belowEvent = function (mapEventId) 
    {
        this.__position = DEX.GAS.CONS.POS_BELOW_EVENT;
        this.__attachedMapEventId = mapEventId;
        return this;
    };
    GaugeContainer.prototype.offset = function (x, y) 
    {
        this.__offsetX = x;
        this.__offsetY = y;
        return this;
    };
    //=====================================
    // Finishing related functions  完成相关函数
    //=====================================
    GaugeContainer.prototype.fadeOutSpeed = function (fadeOutSpeed) 
    {
        this.__fadeOutSpeed = fadeOutSpeed;
        return this;
    };
    GaugeContainer.prototype.fadeOutInstant = function () 
    {
        this.__fadeOutSpeed = 255;
        return this;
    };
    GaugeContainer.prototype.pauseBeforeFadeOut = function (pauseFrames) 
    {
        this.__pauseBeforeFadeOut = pauseFrames;
        return this;
    };
    GaugeContainer.prototype.waitToFinish = function () 
    {
        this.__waitToFinish = true;
        return this;
    };
    //=====================================
    // Result related functions  结果相关函数
    //=====================================
    GaugeContainer.prototype.successPoint = function (value) 
    {
        this.__successPoint = value;
        return this;
    };
    GaugeContainer.prototype.successPointAbove = function () 
    {
        this.__successPointAbove = true;
        this.__successPointBelow = false;
        return this;
    };
    GaugeContainer.prototype.successPointBelow = function () 
    {
        this.__successPointBelow = true;
        this.__successPointAbove = false;
        return this;
    };
    GaugeContainer.prototype.successPointRange = function (min, max) 
    {
        this.__successPointMin = min;
        this.__successPointMax = max;
        return this;
    };
    GaugeContainer.prototype.mapEventId = function (mapEventId) 
    {
        this.__mapEventId = mapEventId;
        return this;
    };
    GaugeContainer.prototype.commonEventId = function (commonEventId) 
    {
        this.__commonEventId = commonEventId;
        return this;
    };
    GaugeContainer.prototype.resultVariableId = function (variableId) 
    {
        this.__resultVariableId = variableId;
        return this;
    };
    GaugeContainer.prototype.isMoving = function () 
    {
        return this.__components.fill.__value > 0;
    };
    GaugeContainer.prototype.isDead = function () 
    {
        return this.__components.lifetime.__isDead;
    };
    GaugeContainer.prototype.isSuccess = function () 
    {
        return this.__result === DEX.GAS.CONS.RESULT_SUCCESS;
    };
    GaugeContainer.prototype.isFailed = function () 
    {
        return this.__result === DEX.GAS.CONS.RESULT_FAILURE;
    };
    GaugeContainer.prototype.isCancelled = function () 
    {
        return this.__result === DEX.GAS.CONS.RESULT_CANCEL;
    };
    //=====================================
    // Other functions  其他函数
    //=====================================
    GaugeContainer.prototype.background = function (imageName, offsetX, offsetY) 
    {
        this.__components.background.bitmap = ImageManager.loadPicture(imageName);
        this.__components.background.__offsetX = offsetX || 0;
        this.__components.background.__offsetY = offsetY || 0;
        return this;
    };
    GaugeContainer.prototype.foreground = function (imageName, offsetX, offsetY) 
    {
        this.__components.foreground.bitmap = ImageManager.loadPicture(imageName);
        this.__components.foreground.__offsetX = offsetX || 0;
        this.__components.foreground.__offsetY = offsetY || 0;
        return this;
    };
    GaugeContainer.prototype.noAction = function () 
    {
        this.__action = DEX.GAS.CONS.ACTION_NONE;
        return this;
    };
    GaugeContainer.prototype.allowMovement = function () 
    {
        this.__allowMovement = true;
        return this;
    };
    GaugeContainer.prototype.Duang_Set = function (swimType, fishLevel, fillSpeedup, fillSpeeddown, nowel) 
    {
        // 1 基础型：移动平缓偶尔停止（鲤鱼）  2 急升（降）型：会突然上升或下降一大段，之后简单 3鬼畜型：会短距离不断上下运动（冰柱鱼，蝎鲤鱼） 4 乱窜型：上蹿下跳毫无规律（鲶鱼，春季鱼王）
        //配置鱼的难度
        this.__components.cursor.__movetype = swimType;
        this.__components.cursor.__fishLevel = fishLevel;
        this.__components.lifetime.__fillSpeedup = fillSpeedup;
        this.__components.lifetime.__fillSpeeddown = fillSpeeddown;
        this.__components.fill.__nowel = nowel;
        return this;
    };
    //=====================================
    // Returns the current gauge where you can call chained methods to update options.  返回当前仪表，您可以在其中调用链式方法来更新选项。
    //=====================================
    Game_System.prototype.gauge = function (gaugeId) 
    {
        $gameTemp.__gauges = $gameTemp.__gauges || {};
        gaugeId = gaugeId || "default";
        if (!(gaugeId in $gameTemp.__gauges) && $gameTemp.__gauges[gaugeId] === undefined) 
        {
            //create new and add to gaugeactions  创建新的并添加到gaugeactions
            $gameTemp.__gauges[gaugeId] = new GaugeContainer(gaugeId);
        }
        return $gameTemp.__gauges[gaugeId];
    };
    //=====================================
    // Game_Temp
    //=====================================
    Game_Temp.prototype._gaugeActionStart = function (waitToFinish) 
    {
        this._gaugeActionRunning = true;
        this._gaugeActionWaitToFinish = waitToFinish;
    };
    Game_Temp.prototype._gaugeActionStop = function () 
    {
        this._gaugeActionRunning = false;
        this._gaugeActionWaitToFinish = false;
    };
    Game_Temp.prototype._gaugeAction_Game_Player_canMove = function () 
    {
        //determine context 
        if (SceneManager._scene instanceof Scene_Map) {
            return !this._gaugeActionRunning;
        }
        return true;
    };
    Game_Temp.prototype._gaugeAction_Game_Interpreter_updateWait = function () 
    {
        //determine context 
        return this._gaugeActionWaitToFinish && this._gaugeActionRunning;
    };
    //=====================================
    // Game_Player
    //============================================================
    DEX.GAS.Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function () 
    {
        return $gameTemp._gaugeAction_Game_Player_canMove() && DEX.GAS.Game_Player_canMove.call(this);
    };
    //============================================================
    // Game_Interpreter
    //============================================================
    DEX.GAS.Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
    Game_Interpreter.prototype.updateWait = function () 
    {
        return $gameTemp._gaugeAction_Game_Interpreter_updateWait() || DEX.GAS.Game_Interpreter_updateWait.call(this);
    };
})();
