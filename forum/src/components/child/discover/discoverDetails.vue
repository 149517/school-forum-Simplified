<script>
import {defineComponent} from 'vue'
import Top from "../top.vue";
import axios from "axios";

export default defineComponent({
  name: "discoverDetails",
  components: {Top},
  data(){
    return{
      title:"广场",
      flag:false,
      mes:{},
      pub:{}
    }
  },
  methods:{
    getDiscoverDetails(){
      let Pid = this.$route.query.Pid;
      axios.get(`/api/discover/${Pid}`)
          .then(res=>{
            this.mes = res.data;
            this.pub = this.mes.publisher
            // console.log(this.mes)
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  created() {
    this.getDiscoverDetails()
    this.flag = true
  }
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
        <p>{{pub.nick}}</p>
        <p>{{pub.sign}}</p>
      </div>
    </div>

    <div class="content">
      <div class="text">
        {{mes.content}}
      </div>
      <div class="image" v-for="img in mes.imgs">
        <img :src="img" alt="">
      </div>
    </div>
  </div>
  <div class="bottom">
    <img src="/src/assets/icon/share.png" alt="">
    <img src="/src/assets/icon/Mes.png" alt="">
    <img src="/src/assets/icon/collect.png" alt="">
    <img src="/src/assets/icon/upvote.png" alt="">
  </div>
</template>

<style scoped lang="scss">
.container{
  width: 100%;
  //height: calc(100vh - 150px);
  margin-top: 120px;
  padding: 50px 30px;
  background-color: white;
  .information{
    display: flex;
    .head{
      img{
        width: 120px;
        height: 120px;
        border-radius: 8px;
      }
    }
    .nick{
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;
      p{
        font-size: 28px;
      }
      p:nth-child(1){
        font:{
          size: 30px;
          weight: bold;
        }
      }

    }
  }
  .content{
    margin-top: 50px;
    .text{
      text-align: left;
      font-size: 30px;
      margin: 30px 0;
    }
    .image{
      img{
        width: 100%;
      }
    }
  }
}
.bottom{
  width: 100%;
  height: 120px;
  padding: 10px 50px;
  border-top: #eeeeee 2px solid;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    width: 64px;
    height: 64px;
  }
}
</style>