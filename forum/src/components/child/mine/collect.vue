<script>
import {defineComponent} from 'vue'
import top from "../top.vue";

export default defineComponent({
  name: "collect",
  components: {top},
  data(){
    return{
      title:"收藏"
    }
  }
})
</script>

<template>
  <top :title="title"></top>
</template>

<style scoped lang="scss">

</style>