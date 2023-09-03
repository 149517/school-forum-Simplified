<script>
import {defineComponent} from 'vue'
import top from "../top.vue";
import axios from "axios";

export default defineComponent({
  name: "message",
  components: {
    top,
  },
  data() {
    return {
      title: "消息列表",
      mesList:[],
    }
  },
  methods:{
    getMes(){
      axios.get('/json/message')
          .then((res)=>{
            this.mesList = res.data
          })
          .catch((err)=>{
            console.log(err.message)
          })
    }
  },
  created() {
    this.getMes()
  }
})
</script>

<template>
  <top :title="title"></top>

  <div class="content">
    <div class="line" v-for="item in mesList">
      <div class="left">
        <div class="head">
          <img :src="item.head" alt="">
        </div>
        <div class="middle">
          <div class="nick">
            {{item.nick}}
          </div>
          <div class="new">
            {{item.newMes}}
          </div>
        </div>
      </div>

      <div class="time">
        {{item.time}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  width: 100%;
  //padding: 30px;
  .line{
    background-color: white;
    padding: 20px 30px;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    .left{
      display: flex;
      text-align: left;
      .middle{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 30px;
        .nick{
          font:{
            size: 26px;
            weight: bold;
          }
        }
      }
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
  }
}
</style>