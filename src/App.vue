<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <keep-alive>  <!-- 缓存所有的页面,将组件状态缓存 -->
    <router-view :seller="seller">
      <div class="content">
        I am content
      </div>
    </router-view>
  </keep-alive>
  </div>
</template>

<script>
import {urlParse} from './common/js/util.js'
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller:{
        id: (() => {
          let queryParam = urlParse();
          // console.log(queryParam.id)
          return queryParam.id;
        })()
      }
    }
  },
  created(){// 钩子函数
  //拿到header部分的数据
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
      //response = response.json();//.json()返回一个Promise对象
      response = response.body;
      // console.log(response);
      if(response.errno === ERR_OK){
        // this.seller = response.data;
        console.log(this.seller);
        console.log(response.data)
        this.seller = Object.assign({},this.seller,response.data)     
      }
    });
  },
  components: {
    'v-header': header
  }
};

</script>

<style lang="stylus">
@import "./common/stylus/mixin.styl"
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        &>a  // router-link 默认会被渲染成一个 <a>标签；
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)
</style>