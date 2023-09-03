<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "friends"
})
</script>

<template>
<div class="box">
  <div class="img">
    <img src="http://10.218.39.118:3000/public/images/planet.png" alt="">
  </div>
</div>
</template>

<style scoped lang="scss">
.box{
  .img{
    text-align: center;
    img{
      width: 409px;
      height: 484px;
    }
  }
}
</style>