<script>
import {defineComponent} from 'vue'
import axios from "axios";

axios.defaults.baseURL = "http://10.218.39.118:3000"
export default defineComponent({
  name: "job",
  data(){
    return{
      jobList:[],
    }
  },
  methods:{
    getJob(){
      axios.get("/json/job")
          .then((res) => {
            this.jobList = res.data;
          })
          .catch((err) => {
            console.log(err.message);
          })
    },
  },
  created() {
    this.getJob()
  }
})
</script>

<template>
  <div class="job">
    <div class="box" v-for="item in jobList" key="item.id">
      <div class="left">
        <div class="content">{{ item.job }}</div>
        <div class="place">{{ item.place }}</div>
      </div>
      <div class="right">
        <div class="salary">{{item.salary}}</div>
        <div class="time">发布时间：{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.job{
  background-color: #ffffff;
  border-radius: 30px;
  width: 100%;
  margin-bottom: 120px;
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    height: 240px;
    border-bottom: .5px dotted rgba(128, 128, 128, 0.48);
    .left{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .content{
        font-size: 36px;
        font-weight: bold;
      }
      .place{
        font-size: 30px;
      }
    }
    .right{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .salary{
        font-size: 40px;
        font-weight: bold;
      }
      .time{
        color: #a8a8a8;
      }
    }

  }
}
</style>