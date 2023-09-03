<script>
import {defineComponent} from 'vue'
// import axios from "axios";
import BottomNav from "../nav/BottomNav.vue";

// axios.defaults.baseURL = "http://192.168.2.216:3000"
export default defineComponent({
  name: "discover",
  components: {BottomNav},
  data() {
    return {
      page: "/discover",
      Component: this.$route.path,
      link: ['/plaza', '/friends', '/cooperation', '/activity', '/partTime']
    }
  },
  methods: {
    changeActive(e, id) {
      // console.log(e.target);
      let navigation = document.querySelectorAll('.navigation')
      for (let i = 0; i < navigation.length; i++) {
        navigation[i].classList.remove('activeNav')
      }
      e.target.classList.add("activeNav");
      this.Component = `/discover${this.link[id]}`;
      this.$router.push(`/discover${this.link[id]}`)

    },
    // 判断当前子界面，并添加选中状态，刷新时
    openPage() {
      let navigation = document.querySelectorAll('.navigation');
      // console.log(this.$route.path);
      for (let i = 0; i < navigation.length; i++) {
        // console.log(this.$route.path);
        // console.log(`/discover${this.link[i]}`)
        if (this.$route.path === `/discover${this.link[i]}`) {
          for (let n = 0; n < navigation.length; n++) {
            navigation[n].classList.remove('activeNav')
          }
          navigation[i].classList.add('activeNav')
        }
      }
    }
  },
  mounted() {
    this.openPage()
  }
})
</script>

<template>
  <nav>
    <div class="in">
      <div class="navigation activeNav" @click="changeActive($event,0)">广场</div>
      <div class="navigation" @click="changeActive($event,1)">交友</div>
      <div class="navigation" @click="changeActive($event,2)">互助</div>
      <div class="navigation" @click="changeActive($event,3)">活动</div>
      <div class="navigation" @click="changeActive($event,4)">兼职</div>
    </div>
  </nav>

  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>

  <BottomNav :page="page"></BottomNav>
</template>

<style scoped lang="scss">

nav {
  width: 100%;
  height: 120px;
  padding: 30px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .in {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .navigation {
      width: 20%;
      height: 60px;
      line-height: 60px;
      font: {
        size: 30px;

      }
    }

    .activeNav {
      background-color: var(--themeColor);
      border-radius: 10px;
      font: {
        size: 34px;
        weight: bold;
      }
    }
  }
}
.container{
  margin-top: 180px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>