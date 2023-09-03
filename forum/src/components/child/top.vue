<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "top",
  props: {
    title: String,
    required: true
  }
})
</script>

<template>
  <div class="top">
    <div class="return" @click="this.$router.back()">
      <img src="/src/assets/icon/return.png" alt="">
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 120px;
  padding: 30px;
  display: flex;
  background-color: var(--bgColorAsh);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .return {
    //flex: 1;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .title {
    flex: 6;
    font: {
      weight: bold;
      size: 32px;
    }
  }
}
</style>