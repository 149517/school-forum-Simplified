<template>
  <div class="nav">
    <div class="light" @click="lightLink">
      <img src="/src/assets/icon/Add.png" alt="" v-if="topic === false">
      <img src="/src/assets/icon/AddSelect.png" alt="" v-if="topic === true">
    </div>
    <div class="box" ref="firstBox" v-for="item in tar" key="item.id" @click="openLink(item.id,item.link)">
      <img :src="item.icon" alt="" v-if="!item.active && item.icon != null">
      <img :src="item.selectIcon" alt="" v-if="item.active && item.selectIcon != null" class="selectIcon">
    </div>
  </div>
</template>

<script>

export default {
  name: "BottomNav",
  data() {
    return {
      lightLeft: '',
      topic: false,
      tar: [
        {
          id: 1,
          icon: "/src/assets/icon/Home.png",
          name: "社区",
          selectIcon: "/src/assets/icon/HomeSelect.png",
          link: "/",
          active: true
        },
        {
          id: 2,
          icon: "/src/assets/icon/Discover.png",
          name: "活动",
          selectIcon: "/src/assets/icon/DiscoverSelect.png",
          link: "/discover",
          active: false
        },
        {
          id: 3,
          icon: null,
          name: "添加",
          selectIcon: null,
          link: "/add",
          active: false
        },
        {
          id: 4,
          icon: "/src/assets/icon/Shopping.png",
          name: "交易",
          selectIcon: "/src/assets/icon/ShoppingSelect.png",
          link: "/shopping",
          active: false
        },
        {
          id: 5,
          icon: "/src/assets/icon/Mine.png",
          name: "我的",
          selectIcon: "/src/assets/icon/MineSelect.png",
          link: "/mine",
          active: false
        },
      ],
    }
  },
  methods: {
    openLink(i, link) {
      // for (let n = 0; n < this.tar.length; n++) {
      //   this.tar[n].active = false;
      // }
      // this.topic = false;
      //
      // if (i === 3) {
      //   this.topic = !this.topic;
      // }
      //
      // this.tar[i - 1].active = true;

      this.$router.push(link);
    },
    lightLink() {
      this.topic = !this.topic;
      this.$router.push("/add")
    },
    changeActive(){
      for (let n = 0; n < this.tar.length; n++) {
        if (this.page === this.tar[n].link) {
          if(n === 2){
            this.topic = !this.topic;
          }
          for (let i = 0; i < this.tar.length; i++) {
            this.tar[i].active = false;
          }
          this.tar[n].active = true;
        }
      }
    }
  },
  props: {
    page: {
      default: "none"
    }
  },
  mounted() {
    this.changeActive()
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-around;
  flex-direction: row;

  .box {
    position: relative;
    padding: 20px 50px;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
      cursor: pointer;
    }

    p {
      margin-top: 0;
      font-size: 18px;
      cursor: pointer;
    }

  }


  .light {
    background-color: var(--themeColor);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 10px #fff;

    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    transition: left 0.3s ease;


    img {
      width: 48px;
      height: 48px;
      cursor: pointer;
      margin-top: 18px;
    }
  }

}
</style>