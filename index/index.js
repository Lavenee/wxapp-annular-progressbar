const app = getApp()

Page({
    data: {
        left_circle_transform: -180,
        left_circle_transition: 0.5,
        right_circle_transform: -180,
        right_circle_transition: 0.5,
        button_text: '点我开启',
        progressbar_opacity: '0.6',
        message: '点击按钮开始归还',
        message_color: 'dodgerblue',
    },
    give_back: function() {
        let _this = this;
        _this.setData({
            button_text: '请投袋'
        })
        _this.setProgressbar(100);

        setTimeout(function() {
            _this.setData({
                left_circle_transform: -180,
                left_circle_transition: 0,
                right_circle_transform: -180,
                right_circle_transition: 0,
                button_text: '归还完成'
            })
        }, 2000)
    },
    /**
     *设置进度条的变化
     *@param {number} curPercent    进度条当前要设置的值 
     */
    setProgressbar: function(curPercent) {
        if (curPercent < 0) {
            curPercent = 0;
        }
        let speed = 1; //改变50%进度所需的时间，单位秒   
        let time = 0; //进度条改变的时间
        let _this = this;
        // 计算历史数据
        let old_left_deg = this.data.left_circle_transform; //左半圆已转动的角度
        let old_right_deg = this.data.right_circle_transform; //右半圆已转动的角度
        let old_deg = 0;
        old_deg += 360 - (Math.abs(old_left_deg) + Math.abs(old_right_deg));
        let oldPercent = (old_deg / 360) * 100;
        //计算变化时间和角度
        time = Math.abs(curPercent - oldPercent) / 50 * speed;
        let new_deg = Math.abs(curPercent) / 100 * 360;
        let change_deg = Math.abs(new_deg - old_deg) //本次需要变化的角度

        if (new_deg <= 180) {
            /**右侧半圆变化 */
            let left_time = 0;
            let left_change = Math.abs(180 + old_left_deg)
            //右边进度条改变之前，清空左边。
            if (old_left_deg > -180) {
                left_time = Math.abs(50 - oldPercent) / 50 * speed;
                _this.setData({
                    left_circle_transform: old_left_deg - left_change,
                    left_circle_transition: left_time
                })
            }
            time -= left_time;
            change_deg -= left_change;
            // 右边进度条增加
            if (oldPercent <= curPercent) {
                _this.setData({
                    right_circle_transform: old_right_deg + change_deg,
                    right_circle_transition: time
                })
            } else {
                // 右边进度条减小
                setTimeout(function() {
                    _this.setData({
                        right_circle_transform: old_right_deg - change_deg,
                        right_circle_transition: time
                    })
                }, left_time * 1000)
            }
        } else if (new_deg <= 360) {
            /**左侧半圆变化 */
            let right_time = 0;
            let right_change = Math.abs(0 - old_right_deg)
            //左边进度条改变之前，填满右边。
            if (old_right_deg < 0) {
                right_time = Math.abs(50 - oldPercent) / 50 * speed;
                _this.setData({
                    right_circle_transform: old_right_deg + right_change,
                    right_circle_transition: right_time
                })
            }
            time -= right_time;
            if (oldPercent <= curPercent) {
                // 左边进度条增加
                let left_deg = change_deg - right_change;
                if (change_deg > 180) {
                    left_deg -= 180;
                } else {
                    left_deg = old_left_deg + change_deg;
                }
                setTimeout(function() {
                    _this.setData({
                        left_circle_transform: left_deg,
                        left_circle_transition: time
                    });
                }, right_time * 1000)
            } else {
                // 左边进度条减小
                setTimeout(function() {
                    _this.setData({
                        left_circle_transform: old_left_deg - change_deg,
                        left_circle_transition: time
                    });
                }, time * 1000)
            }
        } else {
            console.log('进度百分比 ' + 101 + '% 超过范围。')
        }
    },
    onReady: function() {
        let _this = this;
        setTimeout(function() {
            _this.setProgressbar(40)
            setTimeout(function() {
                // _this.setProgressbar(60)
                setTimeout(function() {
                    // _this.setProgressbar(40)
                    setTimeout(function() {
                        // _this.setProgressbar(0)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    },
})