"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var myStyle = {
    s1: {
        applyGradient: true,
        gradientTop: '#00ff00',
        gradientBottom: '#ff44ff',
    },
    s2: {
        size: 80,
        color: '#bfd941',
    },
    s3: {
        bold: true,
        color: '#d887e8',
    },
};
var CaptionController = (function (_super) {
    tslib_1.__extends(CaptionController, _super);
    function CaptionController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._uiRichText = _this.entity.getComponent(engine_1.default.UIRichText);
        _this._stop = true;
        _this._init = false;
        _this._poetry = "<style|applyGradient=true|gradientTop=#00ff00|gradientBottom=#ff44ff>我们的故事</style><br>\
    <style|value=s1>钟于<\/style><br>\
    2005年 我们相遇<br>是学习的竞争者 也是朋友<br>怕打扰对方 关心总是默默的<br>会在生病请假时帮记笔记<br>\
    会在中考时暗暗为对方加油打气<br>会装作不经意间路过篮球场 邂逅那个熟悉的少年<br>\
    会从高三晨读的走廊上 看你迎着阳光扬起的笑脸<br>高考结束<br>多年的沉默<br>\
    一句<style|value=s3>“你好老同学”<\/style>将其打破<br>会心一笑 六年的青葱岁月 同窗之谊，交了答卷<br>\
    <style|value=s2>忠于<\/style><br>\
    2011年 我们走进<br>六年来 一直默默关心 不敢靠近<br>怕打扰 更怕耽误<br>\
    希望对方可以成为更好的自己<br>也努力为对方成为最好的自己<br>\这是我们中学六年心照不宣的约定<br>\
    大学 天津&北京 是我们的选择<br>一句话是这样讲的<br><style|value=s3>我在等世上唯一契合的灵魂<br>\
    可我一直不明白 我要怎样感觉到<br>与我惟一契合的灵魂在哪里<br>直到我遇到了你 我们确定 就是彼此对的人<\/style><br>\
    而我们 似乎从一开始就知道<br>那个契合的灵魂 就在那里<br>我们需要做的 就是等待<br>等待时光发挥魔力<br>\
    等待在最好的时间 彼此奔赴\
    <style|value=s2>忠于<\/style><br>\
    转眼毕业工作 我们真正踏入社会<br>北京真大啊<br>大得我们两个小山村出来的懵懂少年<br>眼花缭乱 不知所措\
    压力焦虑席卷而来<br>还好有彼此<br>我们小小的爱<br>就是我们在大城市里披荆斩棘的勇气和铠甲\
    <style|value=s2>终于<\/style><br>\
    从钟于到终于<br>\
    从懵懂到成熟<br>\
    从校服到婚纱<br>\
    从相恋到相守<br>\
    你和我终于变成了<br>\
    <style|value=s1>我们<\/style><br>";
        return _this;
    }
    Object.defineProperty(CaptionController.prototype, "stop", {
        get: function () {
            return this._stop;
        },
        set: function (s) {
            this._stop = s;
            if (!this._stop && !this._init) {
                this._init = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    CaptionController.prototype.onAwake = function () {
        var _this = this;
        this._uiRichText.style = myStyle;
        engine_1.default.loader.load('fonts/myfont.font', { cacheable: true }).promise.then(function (asset) {
            console.log('Loaded font.');
            _this._uiRichText.font = asset;
        });
    };
    CaptionController.prototype.onUpdate = function (dt) {
        if (this._init) {
            this._init = false;
            this._uiRichText.fontSize = 72;
            this._uiRichText.text += this._poetry;
        }
        if (this._stop) {
            return;
        }
        this.entity.transform2D.positionY += dt * 40;
        if (this.entity.transform2D.positionY > 2000) {
            this.entity.transform2D.positionY = 0;
        }
    };
    CaptionController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], CaptionController.prototype, "name", void 0);
    CaptionController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("captionController")
    ], CaptionController);
    return CaptionController;
}(engine_1.default.Script));
exports.default = CaptionController;
//# sourceMappingURL=captionController.js.map
