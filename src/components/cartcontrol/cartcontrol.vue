<template>
    <div class="cartcontrol">
        <transition-group name='move'>
            <div key="out" class="cart-decrease" @click="decreaseCart" v-show="food.count>0">
            <span key="in" class="inner icon-remove_circle_outline"></span>
            </div>
        </transition-group>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
        
    </div>
</template>

<script>
import Vue from 'vue';//可使用Vue.set()
 export default {
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        addCart(event) {
            if(!event._constructed){//减少网页点击时的每次双击
                return;
            }
            if(!this.food.count){
                // this.food.count =1;
                Vue.set(this.food,'count',1);
            }else{
                this.food.count++;
            }
            // this.$dispatch('cart.add',event.target);//把加号的位置传给父组件
            this.$emit('cart-add',event.target);
        },
        decreaseCart() {
            if(this.food.count){
                this.food.count--;
            }
        }
    }
 }
</script>

<style lang="stylus">
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px
            opacity 1 //整体进入后透明度为1
            transform translate3d(0,0,0)
            .inner
                display inline-block
                line-height 24px
                font-size 24px
                color rgb(0,160,220)
                transition all 0.4s linear //这个不能继承，还需再写一次
                transform rotate(0) //进入角度
            &.move-enter-active,&.move-leave-active//小球进入，和离开过程的样式，transition: all .8s ease  只能应用到div.decrease上，不能继承到i.icon,所以需要另外在i.icon上写transition: all .8s ease  
                transition: all 0.4s linear 
            &.move-enter,&.move-leave-to
                opacity 0 //进入前和离开后整体的透明度
                transform translate3d(24px,0,0)
                .inner
                    transform rotate(180deg)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
        .cart-add
            display inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color rgb(0,160,220)
 
        // vue 1.0 transition
        // .cart-decrease
        //     display inline-block
        //     padding 6px
        //     transition all 0.4s linear      
        //     &.move-transition
        //         opacity 1 //整体进入后透明度为1
        //         transform translate3d(0,0,0)
        //         .inner
        //             display inline-block
        //             line-height 24px
        //             font-size 24px
        //             color rgb(0,160,220)
        //             transition all 0.4s linear //这个不能继承，还需再写一次
        //             transform rotate(0) //进入角度
        //     &.move-enter,&.move-leave
        //         opacity 0 //进入前和离开后整体的透明度
        //         transform translate3d(24px,0,0)
        //         .inner
        //             transform rotate(180deg)
</style>
