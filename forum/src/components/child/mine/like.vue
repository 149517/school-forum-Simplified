<script>
import {defineComponent} from 'vue'
import top from "../top.vue"
export default defineComponent({
  name: "like",
  components:{
    top
  },
  data(){
    return{
      title:"喜欢"
    }
  }
})
</script>

<template>
<top :title="title"></top>
</template>

<style scoped lang="scss">

</style>