<template>
  <div class="box">


    <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
        :pagination="{
      clickable: true,
    }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="item in List" key="item.id">
        <img :src="item.url" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axios from "axios";

axios.defaults.baseURL = "http://10.218.39.118:3000"
// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      List: [],
    }
  },
  created() {
    axios.get("json/banner")
        .then((res) => {
          this.List = res.data
        })
        .catch((err) => {
          console.log(err.message)
        })
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>
<style scoped>
.box {
  position: relative;
  height: 100%;
}

.box {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

</style>