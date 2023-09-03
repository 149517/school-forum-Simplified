<script>
import {defineComponent} from 'vue'
import top from "../top.vue";

export default defineComponent({
  name: "bill",
  components: {top},
  data(){
    return{
      title:"账单"
    }
  }
})
</script>

<template>
  <top :title="title"></top>
  <div class="container">

  </div>
</template>

<style scoped lang="scss">
.container{
  margin-top: 120px;
}

</style>