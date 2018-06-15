<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span @click="select(2)" class="block positive" :class="{'active':selecttype===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0)" class="block positive" :class="{'active':selecttype===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1)" class="block negative" :class="{'active':selecttype===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlycontent===true}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
//评价常量,增加代码可读性
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: true
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    data () {
        return {
            selecttype: this.selectType, //selectType不可写，为了防止子组件无意修改了父组件的状态
            onlycontent: this.onlyContent
        }
    },
    computed: {
        positives() {//正面评价
            return this.ratings.filter((rating)=>{
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {//负面评价
            return this.ratings.filter((rating)=>{
                return rating.rateType === NEGATIVE;
        });
        }
    },
    methods: {
        select(type){
            if(!event._constructed) {
                return;
            }
            this.selecttype = type;
            this.$emit('ratingtype-select',this.selecttype);//子组件告诉父组件的变化
        },
        toggleContent(){
            if(!event._constructed) {
                return;
            }
            this.onlycontent = !this.onlycontent;
            this.$emit('content-toggle',this.onlycontent);
        }
    }
}
</script>

<style lang='stylus'>
@import '../../common/stylus/mixin.styl';
    .ratingselect
        .rating-type
            padding 18px 
            font-size 0
            border-1px(rgba(7,17,27,0.1))
            .block
                display inline-block
                padding 8px 12px
                margin-right 8px
                line-height 16px
                border-radius 1px
                font-size 12px
                color rgb(77,85,93)
                &.active
                    color #fff
                .count
                    font-size 8px
                    margin-left 2px
                &.positive
                    background rgba(0,160,220,0.2)
                    &.active
                        background rgb(0,160,220)
                &.negative
                    background rgba(77,85,93,0.2)
                    &.active
                        background rgb(77,85,93)
        .switch
            padding 12px 18px
            line-height 24px
            border-bottom 1px solid rgba(7,17,27,0.1)
            color rgb(147,153,159)
            font-size 0
            &.on
                .icon-check_circle
                    color #00c850
            .icon-check_circle
                display inline-block
                vertical-align top
                margin-right 4px
                font-size 24px
            .text
                display inline-block
                vertical-align top
                font-size 12px
 
</style>
