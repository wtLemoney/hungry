<template>
 <div class="header">
     <div class="content-wrapper">
         <div class="avatar"><!-- 头像 -->
             <img width="64" height="64" :src="seller.avatar" alt="商家头像">
         </div>
         <div class="content"><!-- 三行文字 -->
             <div class="title">
                 <span class="brand"></span>
                 <span class="name">{{seller.name}}</span>
             </div>
             <div class="description">
                 {{seller.description}}/{{seller.deliveryTime}}分钟送达
             </div>
             <div v-if="seller.supports" class="support">
                 <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                 <span class="text">{{seller.supports[0].description}}</span>
             </div>
         </div>
        <!-- 活动个数 -->
         <div v-if="seller.supports" class="support-count" @click="showDetail">
             <span class="count">{{seller.supports.length}}个</span>
             <i class="icon-keyboard_arrow_right"></i>
         </div>
     </div>
     <!-- 公告区块 -->
     <div class="bulletin-wrapper" @click="showDetail">
         <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
         <i class="icon-keyboard_arrow_right"></i>
     </div>
     <!-- 背景图片 -->
     <div class="background">
         <img :src="seller.avatar" width="100%" height="100%" alt="">
     </div>
     <!-- 详情弹层 -->
     <!-- <transition name="fade"> -->
     <div v-show="detailShow" class="detail"> <!-- transition="fade"-->
         <div class="detail-wrapper clearfix">
             <div class="detail-main">
                 <h1 class="name">{{seller.name}}</h1>
                 <div class="star-wrapper">
                     <star :size="48" :score="seller.score"></star>
                 </div>
                 <div class="title">
                     <div class="line"></div>
                     <div class="text">优惠信息</div>
                     <div class="line"></div>
                 </div>
                 <ul v-if="seller.supports" class="supports"><!-- 几个优惠信息 -->
                     <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                         <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                         <span class="text">{{seller.supports[index].description}}</span>
                     </li>
                 </ul>
                <div class="title">
                     <div class="line"></div>
                     <div class="text">商家公告</div>
                     <div class="line"></div>
                 </div>
                 <div class="bulletin">
                     <p class="content">{{seller.bulletin}}</p>
                 </div>
             </div>
         </div>
         <div class="detail-close" @click="hideDetail">
             <i class="icon-close"></i>
         </div>
     </div>
     <!-- </transition> -->
 </div>
</template>

<script>
import star from '../star/star.vue';

 export default {
     props: {
         seller:{
             type: Object
         }
     },
     data(){
         return{
             detailShow: false
         }
     },
     methods: {
         showDetail(){
             this.detailShow = true
         },
         hideDetail(){
             this.detailShow = false
         }
     },
     created() {
         this.classMap=['decrease','discount','special','invoice','guarantee'];
     },
     components: {
         star
     }
 };
</script>

<style lang="stylus">
    @import "../../common/stylus/mixin.styl";

    .header
        position relative
        overflow hidden
        color: #ffffff
        background rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size 0 /*消除avatar和content之间的空隙*/
            .avatar
                display inline-block
                vertical-align top
                img 
                    border-radius 2px
            .content
                display inline-block
                margin-left 16px
                // font-size 14px
                .title
                    margin 2px 0 8px 0
                    .brand
                        display inline-block
                        vertical-align top
                        width 30px
                        height 18px
                        bg-image('brand')
                        background-size 30px 18px
                    .name
                        margin-left 6px
                        font-size 16px
                        line-height 18px
                        font-weight bold
                .description
                    margin-bottom 10px
                    font-size 12px
                    line-height 12px
                .support
                    .icon
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        line-height 12px
                        font-size 10px // chrome最小字体12px
            .support-count
                position absolute
                right 12px
                bottom 14px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background rgba(0,0,0,0.2)
                text-align center
                .count
                    font-size 10px
                .icon-keyboard_arrow_right
                    margin-left 2px
                    line-height 24px
                    font-size 10px
        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            // font-size 0  会导致省略号不见
            padding 0 22px 0 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            background rgba(7,17,27,0.2)
            .bulletin-title
                display inline-block
                vertical-align top
                margin-top 8px
                width 22px
                height 12px
                bg-image('bulletin')
                background-size 22px 12px
                background-repeat no-repeat
            .bulletin-text
                margin 0 4px 
                font-size 10px
            .icon-keyboard_arrow_right
                position absolute
                font-size 10px
                right 12px
                top 8px
        .background
            position absolute
            top 0px
            left 0px
            width 100%
            height 100%
            z-index -1
            filter blur(10px) //图片模糊效果
        .detail
            position fixed
            z-index 100
            top 0px
            left 0px
            width 100%
            height 100%
            overflow auto
            background rgba(7,17,27,0.8)
            // backdrop-filter blur(10px)  
            // &.fade-enter-active,&.fade-leave-active //最终显示的class
            //     transition all .5s
            //     opacity 1
            //     background rgba(7,17,27,0.8)
            // &.fade-enter,&.fade-leave
            //     opacity 0
            //     background rgba(7,17,27,0)
            .detail-wrapper  //css sticky footer
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px //保证x按钮不遮挡文字
                    .name
                        line-height 16px
                        text-align center
                        font-size 16px
                        font-weight 700
                    .star-wrapper
                        margin-top 18px
                        padding 2px 0
                        text-align center
                    .title
                        display flex
                        width 80%
                        margin 28px auto 24px auto
                        .line
                            flex 1
                            position relative
                            top -6px
                            border-bottom 1px solid rgba(255,255,255,0.2)
                        .text
                           padding 0 12px
                           font-weight 700
                           font-size 14px
                    .supports
                        width 80%
                        margin 0 auto 
                        .support-item
                            padding 0 12px
                            margin-bottom 12px
                            font-size 0
                            &.last-child
                                margin-bottom 0
                            .icon
                                display inline-block
                                width 16px
                                height 16px
                                vertical-align top
                                margin-right 6px
                                background-size 16px 16px
                                background-repeat no-repeat
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            .text
                                line-height 16px
                                font-size 12px
                    .bulletin
                        width 80%
                        margin 0 auto 
                        .content
                            padding 0 12px
                            line-height 24px
                            font-size 12px
            
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto 
                clear both
                font-size 32px
</style>
