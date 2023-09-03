<script>
import {defineComponent} from 'vue'
import axios from "axios";
import BottomNav from "../nav/BottomNav.vue";

axios.defaults.baseURL = "http://10.218.39.118:3000"
export default defineComponent({
  name: "Chat",
  components: {BottomNav},
  data() {
    return {
      page:"/add",
      inputPlay: false,
      img:null,
      tip:[],
      tipList:[],
      switch:false,
      text:"",
      upload: {
        head: null,
        nick: null,
        article: null,
        imgs: null,
        time: new Date().toLocaleDateString()
      }
    }
  },
  methods: {
    putFocus() {
      this.$refs.down.style.top = "100px";
      this.$refs.text.style.opacity = "0";
      this.$refs.image.style.opacity = "0";
      this.$refs.title.style.opacity = "1";
      this.$refs.glide.classList.add("glidePlay")

      this.inputPlay = true;
      setTimeout(() => {
        this.$refs.input.focus();

        this.$refs.addImg.style.height = "150px"
      }, 600)
    },
    putBlur() {
      this.inputPlay = false
      this.$refs.down.style.top = "40%"
      this.$refs.text.style.opacity = "1";
      this.$refs.image.style.opacity = "1";
      this.$refs.title.style.opacity = "0";
      this.$refs.addImg.style.height = "1px"
      this.$refs.glide.classList.remove("glidePlay")
    },
    handleFileUpload(event) {
      this.img = event.target.files[0];
      console.log(this.img)
    },
    getTip(){
      axios.get('/json/tip')
          .then(res => {
            console.log(res.data)
            this.tip = res.data;
            this.changeSwitch()
          }).catch(err => console.log(err))
    },
    submitData() {
      const formData = new FormData();
      formData.append('upload', this.img)

      console.log(formData)

      axios.post('/api/upload', formData)
          .then(response => {
            console.log(response.data);
            // Do something with the response from the backend
          })
          .catch(error => {
            console.log(error);
            // Handle any error that occurs during the request
          });
    },
    changeSwitch(){
      this.switch = !this.switch;
      if(this.switch !== false){
        this.tipList = this.tip.slice(0,2);
      }else{
        this.tipList = this.tip.slice(2,4)
      }
    },
    titleSelect(e){
      // console.log(e.target.innerText)
      this.text = e.target.innerText;
    }
  },

  created() {
    this.getTip();
  }
})
</script>

<template>
  <div class="page">

    <div class="topColorBlock">
      <div class="title" ref="title">发布动态</div>
      <div class="text" ref="text">
        欢迎来到
        <br>
        &nbsp;&nbsp;&nbsp;校园社区
      </div>
      <div class="image" ref="image">
        <img src="http://10.218.39.118:3000/public/images/BaseBall_girl.png" alt="">
      </div>
    </div>

    <div class="container" ref="down">
      <div class="glide" ref="glide" @click="putBlur">
        <img src="http://10.218.39.118:3000/public/icon/glide.png" alt="">
      </div>

      <div class="search">
        <div class="input">
          <div class="put">

            <input type="text" v-model="text" v-if="inputPlay" ref="input">
            <div class="hat" v-else @click="putFocus"></div>
            <img src="/src/assets/icon/Voice.png" alt="">
          </div>

        </div>
        <div class="submit" @click="submitData">
          <img src="/src/assets/icon/Success.png" alt="">
        </div>

      </div>
      <div class="addImgOut" ref="addImg">
        <label for="fileUpload" class="addImg">
          <img src="http://10.218.39.118:3000/public/icon/addImg.png" alt="">
        </label>
        <input type="file" id="fileUpload" @change="handleFileUpload">
      </div>

      <div class="linkMove" ref="linkMove">
        <div class="link" v-for="item in tipList" key="item.id">
          <h3>{{item.title}}</h3>
          <div class="phrase" v-for="li in item.list">
            <div>
              <p @click="titleSelect($event)">{{li}}</p>
            </div>
          </div>
        </div>

        <div class="button">
          <button @click="changeSwitch">换一换</button>
        </div>
      </div>
    </div>
  </div>
  <BottomNav :page="page"></BottomNav>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  background-color: white;
}

.topColorBlock {
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    transform: translateX(-50%);
    font: {
      size: 38px;
      weight: bold;
      family: Geetype;
    }
    color: white;
    opacity: 0;
    transition: all .6s ease;
  }

  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--themeColor);

  .text {
    font-family: Geetype, serif;
    font-style: italic;
    color: #fff;
    font-size: 80px;
    transition: all .6s ease;
  }

  .image {
    width: 300px;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
    }

    transition: all .6s ease;
  }
}


.container {
  width: 100%;
  height: 60vh;
  text-align: left;
  background-color: white;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: -50px;
  padding: 50px 30px 100px;
  position: absolute;
  top: 40%;
  left: 0;
  transition: top .6s ease;

  .glide {
    width: calc(100% + 60px);
    height: 50px;
    line-height: 50px;
    background-color: #f8f8f8;
    text-align: center;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    box-shadow: #dedede 1px 1px 20px;
    margin: -50px -30px 0px;
    opacity: 0;
    transition: all .5s ease;

    img {
      vertical-align: middle;
      width: 32px;
      height: 32px;
    }
  }

  .glidePlay {
    opacity: 1;
    margin-bottom: 30px;
  }

  .search {
    display: flex;

    .input {
      flex: 5;

      .put {
        position: relative;
        top: 0;
        left: 0;

        input,
        .hat {
          width: 100%;
          height: 100px;
          padding-left: 20px;
          background-color: var(--bgColorAsh);
          border-radius: 25px;
          border: 0;
          outline: none;
        }

        img {
          position: absolute;
          top: 15px;
          right: 20px;
          width: 60px;
          height: 60px;
        }
      }

    }

    .submit {
      width: 100px;
      height: 100px;
      text-align: center;
      margin-left: 20px;
      background-color: var(--themeColor);
      border-radius: 25px;

      img {
        width: 60px;
        height: 60px;
        margin-top: 20px;
      }
    }

  }

  .addImgOut {
    margin: 20px 0;
    width: 200px;
    height: 1px;
    transition: all .5s ease;
    overflow: hidden;
  }

  .addImg {
    width: 200px;
    height: 200px;
    line-height: 200px;
    //border: 3px solid rgba(175, 175, 175, 0.27);
    text-align: center;
    //overflow: hidden;
    //animation: upMove .5s linear forwards;

    img {
      width: 200px;
      vertical-align: middle;
      opacity: 0.5;
    }
  }

  #fileUpload {
    display: none;
  }

  .linkMove {
    position: relative;
    bottom: 0;
    left: 0;
    transition: all .5s ease;
  }

  .transitionBottom {
    bottom: -200px;
  }

  .link {
    margin: 30px 0;

    .phrase {
      padding-left: 30px;

      p {
        border: 3px solid gray;
        height: 50px;
        padding: 5px 20px;
        margin: 10px 0;

        //width: 300px;
        border-radius: 25px;
        display: inline-block;
      }
    }

  }

  .button {
    width: 100%;
    height: 50px;
    text-align: center;

    button {
      //background-color: var(--bgColorDeepAsh);
      border: 1px solid var(--bgColorDeepAsh);
      //color: white;
      font-size: 16px;
      padding: 8px 40px;
      height: 50px;
      border-radius: 25px;
    }

    button:active {
      background-color: black;
      color: white;
    }
  }
}

</style>