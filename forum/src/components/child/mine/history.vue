<script>
import {defineComponent} from 'vue'
import top from '../top.vue'
import axios from "axios";

export default defineComponent({
  name: "history",
  components: {
    top,
  },
  data() {
    return {
      title: "历史记录",
      List: []
    }
  },
  methods: {
    getData() {
      axios.post('/api/userHistory', {UserId: sessionStorage.getItem("_id")})
          .then(res => {
            console.log(res.data)
            this.List = res.data;
          })
          .catch(err => {
            console.log(err)
          })
    },
    openPostDetails(id){
      this.$router.push({
        path: "/discoverDetails",
        query: {
          Pid: id
        }
      })
    }
  },
  created() {
    this.getData()
  }
})
</script>

<template>
  <top :title="title"></top>
  <div class="container">
    <div class="main">
      <div class="line" v-for="item in List" key="item._id" @click="openPostDetails(item._id)">
        <div class="left">
          <div class="title">
            <div class="head">
              <img :src="item.publisher.head" alt="">
              <div class="nick">{{ item.publisher.nick }}</div>
            </div>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
        <div class="right">
          <img :src="item.imgs[0]" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 0 30px;
  margin-top: 120px;

  .main {
    padding: 30px 30px 0;
    border-radius: 30px;
    background-color: white;

    .line {
      width: 100%;
      padding-bottom: 20px;
      //height: 300px;
      //background-color: #646cff;
      margin-bottom: 30px;
      border-bottom: 1px solid #c5c5c5;
      display: flex;
      justify-content: space-between;

      .left {
        .title {
          margin-bottom: 30px;
          .head {
            display: flex;
            align-items: center;

            img {
              width: 60px;
              height: 60px;
              border-radius: 10px;
            }

            .nick {
              margin-left: 30px;
            }
          }
          font: {
            size: 24px;
            //weight: bold;
          }
        }
      }

      .right {
        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
        }
      }
    }

    .line:last-child {
      border: 0;
    }
  }
}
</style>