<script>
import {defineComponent} from 'vue'
import axios from "axios";
import BottomNav from "../nav/BottomNav.vue";
axios.defaults.baseURL = "http://10.218.39.118:3000"
export default defineComponent({
  name: "Shopping",
  components: {BottomNav},
  data(){
    return{
      page: '/shopping',
      goods:[],
      NewGoods:[],
      BoutiqueGoods:[]
    }
  },
  methods:{
    getList(){
      // new-goods
      axios.get(`api/goods`)
          .then((res)=>{
            // console.log(res.data)
            this.goods = res.data;
            this.NewGoods = this.goods.slice(0,2);
            this.BoutiqueGoods = this.goods.slice(2);
          })
          .catch((err)=>{
            console.log(err.message)
          })
    },
    openDetailsPage(id){
      // console.log(id)
      this.$router.push({
        path: "/goodsDetails",
        query: {
          Gid: id
        }
      })
    },
    focus(){
      this.$refs.icon.classList.add('iconSearchMove')
    },
    blur(){
      // this.$refs.icon.style.left = "15px";
      this.$refs.icon.classList.remove('iconSearchMove')
    },

  },
  mounted() {
    this.getList();
  }
})
</script>

<template>
  <div class="top">
    <div class="search">
      <div class="in">
        <input type="text"  @focusin="focus" @focusout="blur">
        <div class="iconSearch" ref="icon">
          <img src="/src/assets/icon/Search.png" alt="">
        </div>

      </div>
    </div>
    <div class="mes" @click="this.$router.push('/shoppingCart')">
      <img src="/src/assets/icon/Gift.png" alt="">
    </div>
  </div>

  <div class="container">

    <div class="goods">
      <div class="title">
        <h2>最新发布</h2>
        <p>查看更多</p>
      </div>

      <div class="line">
        <div class="product" v-for="item in NewGoods" key="item._id" @click="openDetailsPage(item._id)">
          <img :src="item.imgs" alt="">
          <div class="price">￥ {{ item.price }}</div>
<!--          <div class="name">{{ item.name }}</div>-->
        </div>
      </div>
    </div>

    <div class="boutique">
      <div class="colorBlock">
        <p>
          热门精品<br>
          &nbsp;商品保障<br>
          &nbsp;&nbsp;校内免费送达
        </p>


      </div>

      <div class="line">
        <div class="product" v-for="item in BoutiqueGoods" key="item._id" @click="openDetailsPage(item._id)">
          <img :src="item.imgs" alt="">
          <div class="price">￥ {{ item.price }}</div>
<!--          <div class="name">{{ item.name }}</div>-->
        </div>
      </div>
      </div>


  </div>
  <BottomNav :page="page"></BottomNav>
</template>

<style scoped lang="scss">
.top {
  margin: 30px;
  display: flex;

  .search {
    flex: 5;

    .in {
      position: relative;
      top: 0;
      left: 0;

      input {
        width: 100%;
        height: 80px;
        border-radius: 20px;
        outline: none;
        border: none;
        padding-left: 20px;
      }

      .iconSearch {
        position: absolute;
        top: 15px;
        left: calc(100% - (100% - 30px));
        transition: all .3s ease;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .iconSearchMove{
        left: calc(100% - 80px);
      }

    }
  }

  .mes {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 20px;
    margin-left: 20px;
    img {
      text-align: center;
      margin-top: 15px;
      width: 50px;
      height: 50px;
    }
  }
}


.container{
  width: 100%;
  padding: 30px;
  margin-bottom: 150px;
  .goods{
    .title{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    p{
      color: var(--bgColorDeepAsh);
    }

  }
  .boutique{

    .colorBlock{
      margin: 30px 0;
      width: 100%;
      height: 300px;
      background-color: var(--themeColor);
      border-radius: 50px;
      p{
        padding-left: 80px;
        padding-top: 40px;
        text-align: left;
        font-family: Geetype,serif;
        font-weight: bold;
        font-size: 36px;
        line-height: 70px;
      }
    }
  }
}
.line{
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
  .product{
    padding: 20px 30px 30px;
    text-align: left;
    border-radius: 50px;
    background-color: white;
    img {
      width: 250px;
      height: 310px;
    }
    .price{
      font-size: 30px;
      font-weight: bold;
    }
    .name{
      text-align: center;
    }
  }
}
</style>