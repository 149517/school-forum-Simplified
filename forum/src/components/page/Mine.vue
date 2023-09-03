<script>
import {defineComponent} from 'vue'
import BottomNav from "../nav/BottomNav.vue";

export default defineComponent({
  name: "Mine",
  components: {BottomNav},
  data(){
    return{
      page:"/mine"
    }
  }
})
</script>

<template>
  <div class="topBanner">
    <div class="nav">
      <p>账户</p>
      <img src="/src/assets/icon/Like.png" alt="" @click="this.$router.push('/like')">
    </div>

    <div class="character">
      <div class="bigBox" @click="this.$router.push('/setting')">
        <div class="suc">
          <img src="http://10.218.39.118:3000/public/images/head/12.jpg" alt="">
          <h2>泽泽木</h2>
          <p>编写网站,逐步实现网站功能</p>
        </div>
      </div>
      <div class="small">
        <div class="smallUp" @click="this.$router.push('/shoppingCart')">
          <p>34</p>
          <p>购物</p>
        </div>
        <div class="smallDown" @click="this.$router.push('/collect')">
          <p>126</p>
          <p>收藏</p>
        </div>
      </div>

    </div>
  </div>

  <div class="container">
    <div class="line" @click="this.$router.push('/account')">
      <p>账户信息</p>
      <img src="/src/assets/icon/Right.png" alt="">
    </div>
    <div class="line" @click="this.$router.push('/transaction')">
      <p>购物和交易记录</p>
      <img src="/src/assets/icon/Right.png" alt="">
    </div>
    <div class="line" @click="this.$router.push('/bill')">
      <p>账单</p>
      <img src="/src/assets/icon/Right.png" alt="">
    </div>
    <div class="line" @click="this.$router.push('/history')">
      <p>浏览记录</p>
      <img src="/src/assets/icon/Right.png" alt="">
    </div>
    <div class="line" @click="this.$router.push('/setting')">
      <p>账户设置</p>
      <img src="/src/assets/icon/Right.png" alt="">
    </div>
  </div>
  <BottomNav :page="page"></BottomNav>
</template>

<style scoped lang="scss">
.topBanner {
  width: 100%;
  height: 50vh;
  padding: 0 30px;
  text-align: left;
  background-color: var(--themeColor);

  .nav {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 52px;
      font-weight: bold;
    }

    img {
      width: 60px;
      height: 60px;
    }

  }

  .character {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    .bigBox {
      flex: 7;
      background-color: white;
      padding: 30px;
      border-radius: 50px;

      .suc {
        padding: 20px 20px 0;

        img {
          width: 240px;
          height: 240px;
          border-radius: 50px;
        }
      }
    }

    .small {
      margin-left: 30px;
      flex: 4;

      .smallUp, .smallDown {
        padding: 50px;
        border-radius: 50px;
        background-color: white;
        p:nth-child(1){
          font-weight: bold;
          font-size: 40px;
        }
        p:nth-child(2){
          padding-left: 5px;
        }

      }
      .smallDown {
        margin-top: 30px;
      }

    }
  }
}
.container{
  width: 100%;
  height: 55vh;
  background-color: white;
  padding: 30px;
  border-radius: 50px;
  margin-top: -100px;
  .line{
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      padding-left: 30px;
      font-size: 32px;
      font-weight: bold;
      line-height: 120px;
    }
    img{
      height: 60px;
      width: 60px;
      padding-right: 20px;

    }
  }
}
</style>