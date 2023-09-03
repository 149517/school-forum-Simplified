<template>
  <div class="top">
    <div class="search">
      <div class="in">
        <input type="text" @focusin="focus" @focusout="blur">
        <div class="iconSearch" ref="icon">
          <img src="/src/assets/icon/Search.png" alt="">
        </div>

      </div>
    </div>
    <div class="mes" @click="this.$router.push('/message')">
      <img src="/src/assets/icon/Mes.png" alt="">
    </div>
  </div>


  <div class="banner">
    <Swiper></Swiper>
  </div>

  <div class="content">

    <h2>商品 & 活动</h2>


    <div class="box">
      <div class="button-group">
        <button v-for="item in buttonList" key="item.id" :class="item.active ? 'buttonActive':''"
                @click="openChild(item.link,item.id)">
          {{ item.name }}
        </button>

      </div>
    </div>
    <div class="hidden">
      <!--      用于隐藏滚动条，覆盖-->
    </div>

    <div class="more" @click="openChildPage">
      查看更多>>
    </div>

    <div class="listPlay">
<router-view></router-view>
    </div>
  </div>



  <BottomNav :page="page"></BottomNav>


</template>


<script>
import {defineComponent} from 'vue'
import Swiper from "../func/Swiper.vue";
import BottomNav from "../nav/BottomNav.vue";


export default defineComponent({
  name: "Home",
  components: {
    BottomNav,
    Swiper
  },
  data() {
    return {
      page:"/home",
      active:0,
      openLink:this.$route.path,
      Component:this.$route.path,
      buttonList: [
        {
          id: 0,
          name: "闲置",
          link: "/home/idle",
          active: true
        },
        {
          id: 1,
          name: "扩列",
          link: "/home/expansion",
          active: false
        },
        {
          id: 2,
          name: "万能互助",
          link: "/home/mutual",
          active: false
        },
        {
          id: 3,
          name: "兼职",
          link: "/home/job",
          active: false
        },
        {
          id: 4,
          name: "户外活动",
          link: "/home/outdoor",
          active: false
        },

      ]
    }
  },
  methods: {
    openChild(link, id) {
      for (let i = 0; i < this.buttonList.length; i++) {
        this.buttonList[i].active = false;
      }
      this.buttonList[id].active = true;
      this.active = id;
      this.Component = link;
      this.$router.push(link);
    },
    focus(){
      this.$refs.icon.classList.add('iconSearchMove')
    },
    blur(){
      // this.$refs.icon.style.left = "15px";
      this.$refs.icon.classList.remove('iconSearchMove')
    },
    openPage(){
      // 判断当前子界面，在对应的按钮上显示选中样式
      for(let i = 0;i<this.buttonList.length;i++){
        if(this.buttonList[i].link === this.openLink){
          for(let n = 0;n<this.buttonList.length;n++){
            this.buttonList[n].active = false;
          }
          this.buttonList[i].active = true;
          this.active = i;
        }
      }
    },
    openChildPage(){
      // 获取选中转态 active，标记了当前的子页面
      console.log(this.active)
      // 跳转页面

      switch (this.active){
        case 0:
          this.$router.push('/shopping');
          break
        case 1:
          this.$router.push('/discover/friends');
          break;
        case 2:
          this.$router.push('/discover/cooperation');
          break;
        case 3:
          this.$router.push('/discover/partTime');
          break
        case 4:
          this.$router.push('/discover/activity')
      }

    }
  },
  created() {
    this.openPage()
  }
})
</script>


<style scoped lang="scss">


.top {
  margin: 30px;
  display: flex;
  .search {
    flex: 5;
    .in {
      position: relative;
      top: 0;
      left: 0;

      input {
        width: 100%;
        height: 80px;
        padding-left: 20px;
        border-radius: 20px;
        outline: none;
        border: none;
      }
      .iconSearch {
        position: absolute;
        top: 15px;
        left: calc(100% - (100% - 30px));
        transition: all .3s ease;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .iconSearchMove{
        left: calc(100% - 80px);
      }
    }
  }

  .mes {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 20px;
    margin-left: 20px;

    img {
      text-align: center;
      margin-top: 15px;
      width: 50px;
      height: 50px;
    }
  }
}

.banner {
  padding: 20px 30px;
  width: 100%;
  height: 440px;

}

.content {
  width: 100%;
  padding: 30px;
  text-align: left;
  overflow: hidden;

  .box {
    margin: 30px 0;
    overflow-x: scroll;

    .button-group {
      width: 120%;
      height: 100px;
      display: flex;
      justify-content: space-around;
      //align-items: center;
      flex-wrap: nowrap;
      //overflow-x: scroll;
      button {
        height: 70px;
      }

    }

    .button-group::-webkit-scrollbar {
      display: none
    }
  }

  .hidden {
    position: relative;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 50px;
    background-color: var(--bgColorAsh);
    margin-top: -50px;

  }

  .swiper2 {
    height: 500px;
    width: 100%;
  }

}

.buttonActive {
  background: #000;
  color: white;
}

.more{
  //margin: 30px 0;
  width: 100%;
  height: 60px;
  text-align: right;
  font-size: 24px;
  color: #626262;
}


</style>