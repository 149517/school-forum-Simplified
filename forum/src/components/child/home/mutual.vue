<script>
import {defineComponent} from 'vue'
import axios from "axios";

axios.defaults.baseURL = "http://10.218.39.118:3000"
export default defineComponent({
  name: "mutual",
  data() {
    return {
      mutualList: [],
    }
  },
  methods: {
    getMes() {
      axios.get("/json/mutual")
          .then((res) => {
            this.mutualList = res.data;
          })
          .catch((err) => {
            console.log(err.message);
          })

    }
  },
  created() {
    this.getMes();
  }
})
</script>

<template>
  <div class="mutual">
    <div class="box" v-for="item in mutualList" key="item.id">
      <div class="left">
        <div class="mes">{{ item.mes }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div class="right">
        <div class="look" v-if="!item.complete">查看</div>
        <div class="look red" v-else>已完成</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mutual {
  background-color: #ffffff;
  border-radius: 30px;
  width: 100%;
  margin-bottom: 120px;
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    height: 150px;
    border-bottom: .5px dotted rgba(128, 128, 128, 0.48);
  .left{
    .mes {
      font-size: 36px;
      font-weight: bold;
    }
    .time{
      margin-top: 30px;
      color: #a8a8a8;
    }
  }
    .right{
      .look{
        width: 150px;
        text-align: center;
        border-radius: 10px;
        background-color: #F1F8BFFF;
        padding: 10px 30px;
      }
      .red{
        color: white;
        background-color: #c4c4c4;
      }
    }

  }
}
</style>