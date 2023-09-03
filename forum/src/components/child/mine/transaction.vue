<script>
import {defineComponent} from 'vue'
import top from "../top.vue";

export default defineComponent({
  name: "transaction",
  components: {top},
  data(){
    return{
      title:"交易记录"
    }
  }
})
</script>

<template>
  <top :title="title"></top>

  <div class="container">
    <div class="box">
      <div class="head">
        <div class="seller">
          <img src="http://10.218.39.118:3000/public/images/head/7.jpg" alt="">
          <div class="nick">小鑫</div>
        </div>
        <div class="state">
          交易成功
        </div>
      </div>
      <div class="commodity">
        <img src="http://10.218.39.118:3000/public/images/goods/ruye.png" alt="">
        <div class="mes">
          <div class="name">
            <p>xx保湿润滑乳液</p>
            <p>1 件</p>
          </div>
          <div class="price">
            38.9
          </div>
        </div>

      </div>
      <div class="more">
        <button>再次购买</button>
        <button>查看物流</button>
        <button class="comment">评价</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">


.container {
  width: 100%;
  padding: 0 30px;
  margin-top: 120px;

  .box {
    width: 100%;
    padding: 30px;
    border-radius: 20px;
    background-color: white;

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;

      .seller {
        display: flex;
        align-items: center;

        img {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          margin-right: 30px;
        }
        .nick{
          font-size: 26px;
        }
      }
      .state{
        color: orange;
      }

    }

    .commodity{
      margin: 30px 0;
      display: flex;
      img{
        width: 176px;
        height: 224px;
      }
      .mes{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .name{
          font-size: 28px;
          text-align: left;
          p:nth-child(2){
            margin-top: 30px;
            color: var(--bgColorDeepAsh);
          }
        }
        .price{
          font-size: 24px;
          font-weight: bold;
        }
      }
    }

    .more{
      width: 100%;
      display: flex;
      justify-content: space-around;
      button{
        height: 72px;
        padding: 0 30px;
        border: 1px solid gray;
        border-radius: 36px;
      }
      .comment{
        color: orange;
        border-color: orange;
      }
    }
  }
}
</style>