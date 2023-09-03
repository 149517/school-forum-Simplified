<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "shoppingCart",
  data() {
    return {
      List: [],
      sum: 0
    }
  },
  methods: {
    getData() {
      axios.get('/api/shoppingCart')
          .then(res => {
            this.List = res.data
            this.getSum()
          })
          .catch(err => console.log(err))
    },
    getSum() {
      this.sum = 0;
      for (let i = 0; i < this.List.length; i++) {
        this.sum += this.List[i].details.price * this.List[i].num;
      }
    },
    removeGood(id) {
      console.log("删除")
      axios.post('/api/shoppingCart/delete', {id: id})
          .then((data) => {
            // console.log(data)
            console.log("数据删除成功")
            // 重新获取数据
            this.getData()
          })
          .catch((err) => console.log(err))
    },
    fixNum(id,num,op){
      axios.post('/api/shoppingCart/fixNum', {id: id,num:num,op:op})
          .then((data) => console.log("修改成功"))
          .catch((err) => console.log(err))
      this.getData()
    }
  },
  created() {
    this.getData()

  }
})
</script>

<template>
  <div class="container">
    <div class="top">
      <img src="/src/assets/icon/return.png" alt="" @click="this.$router.back()">
      <img src="/src/assets/icon/delete.png" alt="">
    </div>
    <div class="content">
      <h2>Shopping Cart</h2>
      <div class="block">
        <div class="line" v-for="item in List" key="item._id">
          <img v-for="url in item.details.imgs" :src="url" alt="">
          <div class="text">
            <div class="left">
              <h2>{{ item.details.name }}</h2>
              <p>{{ item.details.details }}</p>
              <div class="price">￥ {{ item.details.price }}</div>
            </div>
            <div class="right">
              <div class="deleteIcon" @click="removeGood(item._id)">
                <img src="/src/assets/icon/fork.png" alt="">
              </div>
              <div class="addNum">
                <img src="/src/assets/icon/reduceNum.png" alt="" @click="fixNum(item._id,item.num,'-')">
                <div class="number" >{{ item.num }}</div>
                <img src="/src/assets/icon/addNum.png" alt="" @click="fixNum(item._id,item.num,'+')">
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div class="settlement">
      <button>结算 ({{ sum }})</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  padding: 30px;
}

.top {
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    width: 50px;
  }
}

.content {
  margin-top: 50px;
  text-align: left;

  .block {
    width: 100%;
    //height: 800px;
    background-color: white;
    border-radius: 50px;
    padding: 30px;
    margin-top: 20px;

    .line {
      display: flex;
      margin-bottom: 30px;

      img {
        width: 200px;
        //box-shadow: 1px 1px 5px #e0e0e0;
        border-radius: 20px;
      }

      .text {
        width: calc(100% - 230px);
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        margin-left: 30px;

        .left {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .price {
            margin-top: 20px;
            font: {
              size: 30px;
              weight: bold;
            }
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;

          .deleteIcon {
            width: 50px;
            height: 50px;
            position: relative;
            top: 20px;
            left: 80px;
          }

          img {
            width: 30px;
            height: 30px;
          }

          .addNum {
            width: 150px;
            display: flex;
            justify-content: space-around;

            img {
              margin: 0 10px;
              //box-sizing: content-box;
              padding: 5px;
              background-color: var(--bgColorAsh);
              border-radius: 0;
            }
          }
        }
      }
    }
  }
}

.settlement {
  width: 100%;
  padding: 0 30px;
  position: absolute;
  bottom: 60px;
  left: 0;

  button {
    height: 80px;
    color: var(--themeColor);
    margin-top: 30px;
    width: 100%;
    background-color: #000000;
    border-radius: 20px;
  }
}
</style>