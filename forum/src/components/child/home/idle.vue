<script>
import {defineComponent} from 'vue'
import axios from "axios";

axios.defaults.baseURL = "http://10.218.39.118:3000"

export default defineComponent({
  name: "RotateImg",
  data() {
    return {
      // 图片列表
      imgList: [],
    }
  },
  methods: {
    getImg() {
      axios.get('/json/idle')
          .then((res) => {
            this.imgList = res.data;
          })
          .catch((err) => {
            console.log(err.message)
          })

    },

    touchStart(e) {
      // console.log("滑动开始");
      // console.log(e)
    },

  },
  created() {
    this.getImg();

  },
  updated() {
  }
})
</script>

<template>
  <div class="container">
    <div class="goods" @touchstart="touchStart($event)">
      <div class="router_box" ref="route" v-for="item in imgList" key="item.id">
        <img :src="item.url" alt="">
        <div class="name">{{ item.name }}</div>
        <div class="price">{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 800px;
}

.goods {
  position: relative;
  height: 800px;
  top: 0;
  left: 0;
  margin-top: 50px;
  //animation: rotate 4s infinite linear;

  .router_box {
    position: absolute;
    top: 10px;
    left: 30%;
    background-color: white;
    border-radius: 50px;
    margin-left: 20px;
    margin-bottom: 30px;
    padding: 50px 30px;
    text-align: center;
    transform-origin: center bottom;
    transition: all .5s ease initial;

    img {
      width: 200px;
      height: 251px;
    }

    .price {
      font-weight: bold;
      font-size: 30px;
    }


  }

  .router_box:nth-child(5) {
    transform: rotateZ(-16deg) translate(-560px, -20px);
  }

  .router_box:nth-child(1) {
    transform: rotateZ(8deg) translate(280px, -20px);

  }

  .router_box:nth-child(2) {
    transform: rotateZ(0) translateX(0px);
  }

  .router_box:nth-child(3) {
    transform: rotateZ(-8deg) translate(-280px, -20px);
  }

  .router_box:nth-child(4) {
    transform: rotateZ(-16deg) translate(-560px, -20px);
  }

}

// 旋转动画
@keyframes rotate {
  0% {
    //transform-origin: center bottom;
    transform: rotateZ(0);
  }
  100% {
    //transform-origin: center bottom;
    transform: rotateZ(360deg);
  }
}


</style>

