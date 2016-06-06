/**
 * Created by benny on 2016/5/31.
 */
;(function ($) {
    var div_mask = {
        id: 'pop_box_mask',
        css: {
            "clear": "both",
            "float": "left",
            "z-index": "9999",
            "position": "fixed",
            "cursor": "not-allowed",
            'border': 'none',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
            'visibility': 'inherit',
            'background': 'rgba(0,0,0,0.6)',
            'opacity':'0.8'
        }
    };

    var div_pop_box_css = {
        id: 'pop_box',
        css: {
            'width': 'auto',
            'height': 'auto',
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'z-index': '99999',
            'width': 'auto',
            'height': 'auto',
            'box-sizing': 'border-box',
            'background': '#FF9E9E',
            'transform': 'translateX(-50%) translateY(-50%)'
        }
    }


    /*标题*/
    var div_pop_box_title_css = {
        id: "pop_box_title_id",
        css: {
            'margin': '0',
            'padding': '0.1em',
            'text-align': 'center',
            'font-size': '1em',
            'font-weight': '200',
            'opacity': '0.8',
            'background': 'rgba(0,0,0,0.1)',
            'border-radius': '3px 3px 0 0'
        }
    }

    /*内容区域*/
    div_pop_box_content_css = {
        id: "",
        css: {
            'padding': '15px 40px 30px',
            'margin': '0',
            'font-weight': '300',
            'font-size': '1.15em'
        }
    }
    /*按钮外层div的样式*/
    var div_pop_box_btn_div_css = {
        id: "",
        css: {
            'padding': '0 20px 10px',
            'text-align': 'center'
        }
    }

    var div_pop_box_btn_css = {
        id: "",
        css: {
            'background': '#ff706f',
            'color': '#000000',
            'min-width': '120px',
            'text-align': 'center',
            'border': 'none',
            'margin': '2% 6px',
            'padding': '0.6em 0.6em',
            'display': 'inline-block',
            'width': 'auto',
            'min-width': '120px'
        }
    }
    var div_pop_box_btns_css


    /*处理按钮*/
    function handleButton($btn, opt, options) {

        $btn.on("click", function () {
            if (opt.action) {
                (opt.action)();
            }
            new PopBox(this, options).close();
        })
        $btn.css("background", getButtonColor(opt.style));
        if (opt.backgroundColor) {
            $btn.css("background", opt.backgroundColor);
        }
        if (opt.color) {
            $btn.css("color", opt.color);
        }

        return $btn;
    }

    /*最外层最大的容器*/
    function mainContainer(options) {
        PopBox.container = $("<div id='" + div_pop_box_css.id + "'></div>").css(div_pop_box_css.css);
        handleMainContainer(PopBox.container, options);
        return PopBox.container;
    }

    /*设置最外层容器的样式*/
    function handleMainContainer(ele, options) {
        if (options.backgroundColor) {
            PopBox.container.css("background", options.backgroundColor);
        }
        if (options.color) {
            PopBox.container.css("color", options.color);
        }
        return PopBox.container;
    }

    /*是否有标题*/
    function checkTitle(options) {
        if (!options.noTitle) {
            return PopBox.container.append(handleTitle($("<div id='" + div_pop_box_title_css.id + "'><h3>" + options.title + "</h3></div>").css(div_pop_box_title_css.css), options));
        }

    }

    /*处理标题样式*/
    function handleTitle($ele, options) {
        if (options.titleBackgroundColor) {
            $ele.css("background", options.titleBackgroundColor);
        }
        if (options.titleColor) {
            $ele.css("color", options.titleColor);
        }
        return $ele;
    }


    /*检查是否有内容*/
    function checkContent(options) {
        if (options.content) {
            PopBox.container.append($("<div id='pop_content'>" + " <div class='pop_box_content'>" + options.content + "</div>" + "</div>").css(div_pop_box_content_css.css));
        }
        return PopBox.container;
    }

    /*检查是否有多个按钮*/
    function checkButtons(options) {
        if (!options.noButton && $(options.buttons)[0]) {
            PopBox.container.append("<hr>").append(addBtn(options).appendTo($("<div id='" + div_pop_box_btn_div_css.id + "'></div>").css(div_pop_box_btn_div_css.css)));
        }
        return PopBox.container;
    }

    /*添加button*/
    function addBtn(options) {
        var buttonContainer = $("<div id='" + div_pop_box_btn_div_css.id + "'></div>").css(div_pop_box_btn_div_css.css);
        if (options.buttons) {
            for (var key in options.buttons) {
                var $btn = addBtnId(key, options.buttons).css(div_pop_box_btn_css.css);
                buttonContainer.append(handleButton($btn, (options.buttons)[key], options));
            }
        }
        return buttonContainer;
    }

    /*给button加id 返回<button></button>*/
    function addBtnId(key, btn_options) {
        if (btn_options[key].id) {
            return $("<button id='" + btn_options[key].id + "'>" + key + "</button> ");
        } else {
            return $("<button>" + key + "</button> ")
        }

    }

    /*生成弹窗div*/
    function generatePopBoxHtml(options) {
        mainContainer(options);
        checkTitle(options);
        checkContent(options);
        checkButtons(options);
        return PopBox.container;
    }

    /*创建div*/
    function createDiv(id, css) {
        return $("<div id='" + id + "'></div>").css(css);
    }

    /*背景蒙版div*/
    function mask_div() {
        return createDiv(div_mask.id, div_mask.css);
    }

    /*按钮的颜色  primary success info waring danger close*/
    function getButtonColor(style) {
        var color = "#FF9E9E";
        switch (style) {
            case "primary":
                color = "#2980b9";
                break;
            case "success":
                color = "#27ae60";
                break;
            case "info":
                color = "#1fb5ad";
                break;
            case "warning":
                color = "#f39c12";
                break;
            case "danger":
                color = "#f44a56";
                break;
            case "close":
                color = "#795aac";
                break;
            default:
                color = "#FF9E9E";
        }
        return color;
    }

    /*弹窗进入动画*/
    function popBoxFadeIn($ele) {
        return $ele.animate({'left': '0'}, 80)
            .animate({'left': '52%'}, 100)
            .animate({'left': '48%'}, 120)
            .animate({'left': '52%'}, 140)
            .animate({'left': '49%'}, 150)
            .animate({'left': '50%'}, 160);
    }


    /*关闭提示框*/
    function closeMask() {
        $("#" + div_mask.id).remove();
        $("#" + div_pop_box_css.id).remove();
    }

    /*背景蒙版点击事件*/
    function addEventOnMask() {
        $("#" + div_mask.id).on("click", function () {
            $("#" + div_mask.id).remove();
            $("#" + div_pop_box_css.id).remove();
        })
    }


    var PopBox = function (ele, opt) {
        this.$ele = ele;
        this.default = {
            id: "pop_box",
            title: "友情提示",
            content: "",
            noAnimate: false,
            backgroundColor: "#2e3846",//背景颜色
            color: "white",//字体颜色
            titleBackgroundColor: "",//标题背景颜色
            titleColor: "white",//标题字体颜色
            buttons: {
                buttons: {
                    "关闭": {
                        id: "",
                        style: "close",
                        action: "",
                        onLoad: "",
                        onClose: true,
                        onShow: "",
                        backgroundColor: "",
                        color: ""
                    }
                }
            },
            /*标题是否显示开关*/
            noTitle: false,
            /*按钮是否显示开关*/
            noButton: false,
            /*弹出框消失时间*/
            delay: 0,
            /*默认失效时间*/
            timeOut: 2000,
            /*自动关闭弹窗*/
            autoCloseSwitch: false,
            iconButtonSwitch: false,
            /*是否有回调函数*/
            callBack: null,
            /*弹窗的宽高*/
            boxWH: {
                height: 400,
                width: 300
            }
        }
        this.options = $.extend({}, this.default, opt);
    }

    PopBox.prototype = {
        container: "",
        show: function (ele) {
            var $ele = ele;
            var $pop_box = generatePopBoxHtml(this.options);
            /*设置标题*/
            if (this.options.noAnimate) {
                $("body").append($pop_box).append(mask_div());
            } else {

                $("body").append(mask_div()).append((popBoxFadeIn($pop_box)));
            }
            addEventOnMask();
        },

        close: function () {
            closeMask();
        }
    }
    /*自定义弹窗*/
    $.fn.showBox = function (options) {
        var popBox = new PopBox(this, options);
        return popBox.show();
    }

    $.fn.closeMaskDiv = function () {
        closeMask();
    }

    /*alert弹窗*/
    $.fn.alertBox = function (option) {
        new PopBox().show(this, option);
    }
})(jQuery);

$(function () {
    $("#btn").on("click", function () {
        $("this").showBox({
            timeOut: 50000000000,
            content: "您有未读短消息，注意查收哦！",
            title: "温馨提示",
            noAnimate: false,//动画开关
            //backgroundColor: 'pink',//设置背景颜色
            //color:'green',
            //titleBackgroundColor:'purple',
            //titleColor: 'red',
            buttons: {
                "确认": {
                    id: "btn_close",
                    style: "close",
                    action: function(){alert('1')},//注意此处不能有""
                    onLoad: "",
                    onClose: true,
                    onShow: "",
                    //backgroundColor: "yellow",
                    //color: "blue"


                },
                 "修改": {
                 style: "info",
                 action: "",
                 onLoad: "",
                 onClose: true,
                 onShow: ""

                 },
                /*"确认": {
                 style: "success",
                 action: "",
                 onLoad: "",
                 onClose: true,
                 onShow: ""

                 },
                 "警告": {
                 style: "warning",
                 action: "",
                 onLoad: "",
                 onClose: true,
                 onShow: ""

                 },
                 "危险": {
                 style: "danger",
                 action: "",
                 onLoad: "",
                 onClose: true,
                 onShow: ""

                 }*/
            },
            //noButton: true, //不显示按钮
            //noTitle: true //不显示标题
        });
        //$(this).closeMaskDiv();  手动调用此方法关闭遮罩层 和 弹窗
    })
})
