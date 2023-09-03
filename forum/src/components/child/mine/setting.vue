<script>
import {defineComponent} from 'vue'
import top from "../top.vue";

export default defineComponent({
  name: "setting",
  components: {
    top,
  },
  data() {
    return {
      title: "账户设置"
    }
  }
})
</script>

<template>
  <top :title="title"></top>
  <div class="main">


    <div class="container">
      <div class="line">
        <p class="rowHead">账号与安全</p>
      </div>
    </div>
    <div class="container">
      <div class="line">
        <p class="rowHead">消息通知</p>
      </div>
      <div class="line">
        <p class="rowHead">聊天</p>
      </div>
    </div>
    <div class="container">
      <div class="line">
        <p class="rowHead">关于</p>
      </div>
    </div>
    <div class="container">
      <div class="center" @click="this.$router.push('/login')">
        <p class="rowHead">退出登录</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main{
  margin-top: 120px;
}
.container {
  width: 100%;
  background-color: white;
  padding: 0 30px;
  margin-bottom: 20px;

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    border-bottom: 2px solid var(--bgColorAsh);
  }

  .center {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rowHead {
    font: {
      size: 26px;
      weight: bold;
    };
  }

}
</style>