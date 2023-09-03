<script>
import {defineComponent} from 'vue'
import axios from "axios";

// axios.defaults.baseURL = "http://192.168.2.216:3000"
export default defineComponent({
  name: "plaza",
  data() {
    return {
      dataList: [],
      HistoryList: [],
      postList: []
    }
  },
  methods: {
    getPost() {
      // 获取帖子数量
      axios.get("/api/community")
          .then((res) => {
            this.dataList = res.data;
            for (let i = 0; i < this.dataList.length; i++) {
              this.postList.push(res.data[i]._id);
            }
            // console.log(this.postList)
            this.getUserHis()
          })
          .catch((err) => {
            console.log(err);
          })
    },
    getUserHis() {
      // 获取用户浏览列表并获取交互记录
      // 获取页面中的帖子数量，并根据相对应的PostId获取交互信息
      axios.post('/api/userHistoryList', {UserId: sessionStorage.getItem("_id"), list: this.postList})
          .then((res) => {
            this.HistoryList = res.data;
            // console.log(this.HistoryList)
            let list = res.data;

            let defaultObj = function (id) {
              return {
                record:{
                  post: id,
                  upvote: false,
                  collect: false
                }
              }
            }
            // console.log(this.dataList)
            let data = this.dataList;
            // 数组内 对象拼接
            this.dataList = data.map(obj => {
              let res2 = list.find(item => item.post === obj._id) || defaultObj(obj._id)
              return {...obj, ...{record: res2}}
            })
          })
          .catch((err) => {
            console.log(err)
          })
    },
    addUserHis(postId, upvote, collect) {
      axios.post('/api/addUserHistoryList',
          {
            UserId: sessionStorage.getItem("_id"),
            postId: postId,
            upvote: upvote,
            collect: collect
          })
          .then((res) => {
            // console.log(res.data)

          })
          .catch((err) => {
            console.log(err)
          })
    },
    focus() {
      this.$refs.icon.classList.add('iconSearchMove')
    },
    blur() {
      // this.$refs.icon.style.left = "15px";
      this.$refs.icon.classList.remove('iconSearchMove')
    },
    openDetailsPage(id) {
      let result = this.HistoryList.filter(item => item.post === id)
      // console.log(result)
      if (result !== []) {
        this.addUserHis(id, result.upvote, result.collect);
      }else{
        this.addUserHis(id,false,false)

      }
      // console.log(id);
      this.$router.push({
        path: "/discoverDetails",
        query: {
          Pid: id
        }
      })
    },
    comment(mes, PostId, upNum, colNum, col, up) {
      this.addUserHis(PostId, up, col);

      console.log(mes, PostId, upNum, colNum, col, up)
      axios.post('/api/upvote', {
        UserId: sessionStorage.getItem("_id"),
        PostId: PostId,
        action: mes,
        upvoteNum: upNum,
        collectNum: colNum,
        col: col,
        up: up
      })
          .then(mes => {
            // console.log(mes)
            this.getPost()
          })
          .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getPost();
  }
})
</script>

<template>
  <div class="container">
    <div class="post" v-for="item in dataList" key="item._id">
      <div class="content" @click="openDetailsPage(item._id)">
        <div class="mes">
          <div class="head">
            <img :src="item.publisher.head" alt="">
          </div>
          <div class="nick">{{ item.publisher.nick }}</div>
          <div class="time">
            {{ item.time }}
          </div>
        </div>

        <div class="article">
          {{ item.content }}
        </div>
        <div class="img">
          <img v-for="im in item.imgs" :src="im" alt="">
        </div>
      </div>
      <div class="comment">
        <div class="action">
          <!--          判断显示 点赞状态 分开便于传输点赞状态-->
          <div class="collect alignment" v-if="item.record != null && item.record.collect"
               @click="comment('collect',item._id,item.upvoteNum,item.collectNum,item.record.collect,item.record.upvote)">
            <img src="/src/assets/icon/collectClick.png" alt="">
            {{ item.collectNum }}
          </div>
          <div class="collect alignment" v-else
               @click="comment('collect',item._id,item.upvoteNum,item.collectNum,item.record.collect,item.record.upvote)">
            <img src="/src/assets/icon/collect.png" alt="">
            {{ item.collectNum }}
          </div>

          <div class="comm alignment" @click="comment('comm',item._id,item.commentNum )">
            <img src="/src/assets/icon/Mes.png" alt="">{{ item.commentNum }}
          </div>

          <div class="upvote alignment" v-if="item.record != null && item.record.upvote"
               @click="comment('upvote',item._id,item.upvoteNum,item.collectNum,item.record.collect,item.record.upvote)">
            <img src="/src/assets/icon/upvoteClick.png" alt="">
            {{ item.upvoteNum }}
          </div>
          <div class="upvote alignment" v-else
               @click="comment('upvote',item._id,item.upvoteNum,item.collectNum,item.record.collect,item.record.upvote)">
            <img src="/src/assets/icon/upvote.png" alt="">
            {{ item.upvoteNum }}
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 30px 30px 200px;

  .post {
    width: 100%;
    min-height: 240px;
    margin: 0 auto 30px;
    padding: 20px 10px;
    background-color: #ffffff;
    border-radius: 30px;

    .mes {
      height: 80px;
      width: 100%;
      display: flex;
      align-items: center;

      .head {
        flex: 1;

        img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
      }

      .nick {
        flex: 3;
        line-height: 80px;
        text-align: left;
        font-size: 30px;
        font-weight: bold;
      }

      .time {
        flex: 1;
        color: gray;
      }
    }

    .article {
      font-size: 28px;
      text-align: left;
      padding: 20px 30px 10px;
    }

    .img {
      padding: 0 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;

      img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }

    .action {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .delete {
        position: relative;
        top: 0;
        left: 0;

        .tip {
          position: absolute;
          top: 50px;
          left: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 150px;
          height: 50px;
          padding: 5px;
          border-radius: 5px;
          background-color: #eeeeee;
          line-height: 50px;
          opacity: 0;
          transition: all .5s ease;


          img {
            width: 28px;
            height: 28px;
          }

          span {
            line-height: 50px;
            font-size: 16px;
          }
        }

        .tipPlay {
          top: 30px;
          opacity: 1;
        }
      }

      img {
        width: 32px;
        height: 32px;
      }

      .alignment {
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
          margin-right: 10px;
        }
      }

    }
  }
}
</style>