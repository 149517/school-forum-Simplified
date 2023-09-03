<script>
import {defineComponent} from 'vue'
import top from "../top.vue";
import axios from "axios";

export default defineComponent({
  name: "goodsDetails",
  components: {top},
  data() {
    return {
      // 解决数据未找到的问题
      flag: false,
      mes: {},
      pub: {},
      title: "商品详情",
      collect: false,
      num: 1,
      tip: null,
      tipPlay:false
    }
  },
  methods: {
    getDetails() {
      let Gid = this.$route.query.Gid;
      axios.get(`/api/goods/${Gid}`)
          .then(res => {
            this.mes = res.data;
            this.pub = this.mes.publisher
          })
    },
    addCart() {
      // console.log(this.mes._id);
      axios.post('/api/shoppingCart/addCart', {
        id: this.mes._id,
        num: this.num
      })
          .then((res) => {
            this.tip = res.data
            this.tipPlay = true
            this.fixValue()
          })
          .catch(err => console.log(err.message))
    },
    fixValue(){
      setTimeout(()=>{this.tipPlay = false},2000)
    },
  },
  created() {
    this.getDetails()
    this.flag = true
  },
})
</script>

<template>
  <top :title="title"></top>
  <div class="container" v-if="flag">
    <div class="information">
      <div class="head">
        <img :src="pub.head" alt="">
      </div>
      <div class="nick">
        <p>{{ pub.nick }}</p>
        <p>{{ pub.sign }}</p>
      </div>
    </div>

    <div class="goods">
      <div class="price">￥<span>{{ mes.price }}</span></div>
      <div class="content">
        {{ mes.details }}
      </div>
      <div class="image" v-for="img in mes.imgs">
        <img :src="img" alt="">
      </div>
    </div>
  </div>
  <div class="btn">
    <div class="connection">
      <img src="/src/assets/icon/Mes.png" alt="">
    </div>
    <div class="collect" @click="collect = !collect">
      <img src="/src/assets/icon/collect.png" alt="" v-if="!collect">
      <img src="/src/assets/icon/collectClick.png" alt="" v-else>
    </div>
    <div class="button">
      <button @click="addCart">加入购物车</button>
    </div>
  </div>
  <div class="tip" v-if="tipPlay">
    {{tip}}
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  margin-top: 120px;
  //border-radius: 30px;
  padding: 50px 30px;
  background-color: white;

  .information {
    display: flex;

    .head {
      img {
        width: 120px;
        height: 120px;
        border-radius: 8px;
      }
    }

    .nick {
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;

      p {
        font-size: 28px;
      }

      p:nth-child(1) {
        font: {
          size: 30px;
          weight: bold;
        }
      }
    }
  }

  .goods {
    margin-top: 50px;

    .price {
      text-align: left;

      font: {
        size: 24px;
        weight: bold;
      };
      color: orangered;

      span {
        font-size: 44px;
        letter-spacing: 2px;
      }
    }

    .content {
      text-align: left;
      font-size: 30px;
      margin: 30px 0;
    }

    .image {
      img {
        text-align: left;
        width: 80%;
      }
    }
  }
}

.btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 120px;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 15px #adadad;

  .button {
    width: 60%;

    button {
      height: 80px;
      width: 100%;
      border-radius: 10px;
      background-color: black;
      color: var(--themeColor);
    }

    button:active {
      background-color: var(--themeColor);
      color: white;
    }
  }

  img {
    width: 60px;
  }
}

.tip{
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: #464646;
  color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
}
</style>