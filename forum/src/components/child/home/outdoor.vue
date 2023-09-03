<script>
import {defineComponent} from 'vue'
import axios from "axios";
axios.defaults.baseURL = "http://10.218.39.118:3000"
export default defineComponent({
  name: "outdoor",
  data(){
    return{
      outList:[],
    }
  },
  methods:{
    getList(){
      axios.get("/json/outdoor")
          .then((res)=>{
            this.outList = res.data;
          })
          .catch((err)=>{
            console.log(err.message)
          })
    }
  },
  created() {
    this.getList()
  }
})
</script>

<template>
<div class="outdoor">
  <div class="box" v-for="item in outList" key="item.id">
    <img :src="item.img" alt="">
    <div class="down">
      <div class="name">{{item.name}}</div>
      <div class="people">
        推荐人数 ：<span>{{item.num}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.outdoor{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin: auto auto 150px;

  .box{
    width: 340px;
    padding: 10px;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    img{
      width: 100%;
      height: 300px;
      border-radius: 20px;
    }
    .down{
      padding: 20px 30px 10px;
      text-align: center;
    }
    .name{
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .people span{
      font-weight: bold;
      font-size: 24px;
    }

  }

}
</style>