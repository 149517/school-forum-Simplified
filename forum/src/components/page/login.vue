<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "login",
  data() {
    return {
      register: false,
      account: false,
      pass: false,
      pass2: false,
      phone: null,
      password: null,
      againPassword: null
    }
  },
  methods: {
    SelectEle(index) {
      let line = document.querySelectorAll('.line');
      line[index].classList.add('lineActive')
    },
    removeEle(index) {
      let line = document.querySelectorAll('.line');
      line[index].classList.remove('lineActive')
    },
    fo(id) {
      switch (id) {
        case 1:
          this.account = true;
          this.SelectEle(0);
          break;
        case 2:
          this.pass = true;
          this.SelectEle(1);
          break;
        case 3:
          this.pass2 = true;
          this.SelectEle(2)
      }
    },
    bl(id) {
      switch (id) {
        case 1:
          this.account = false;
          this.removeEle(0);
          break;
        case 2:
          this.pass = false;
          this.removeEle(1);
          break;
        case 3:
          this.pass2 = false;
          this.removeEle(2)
      }
    },
    getLogin() {
      axios.post('/api/login', {
        account: this.phone,
        password: this.password
      }).then(res => {
        console.log("验证成功");
        console.log(res.data)
      })
          .catch(err => console.log(err))
    },
    login() {
      // 验证账号信息
      let pattern = /^\d{11}$/;
      if (pattern.test(this.phone)) {
        if (this.password.length > 6 && this.password.length < 24) {
          this.getLogin()
        }
      } else {
        alert("账号或者密码格式有误")
      }
    }
  },
})
</script>

<template>
  <div class="banner">
    <img src="http://10.218.39.118:3000/public/images/house.png" alt="">
  </div>
  <div class="container">
    <div class="main">
      <div class="line">
        <img src="/src/assets/icon/account.png" alt="" v-if="!account">
        <img src="/src/assets/icon/accountSelect.png" alt="" v-if="account">
        <input type="text" v-model="phone" ref="inp1" @focus="fo(1)" @blur="bl(1)">
      </div>
      <div class="line">
        <img src="/src/assets/icon/password.png" alt="" v-if="!pass">
        <img src="/src/assets/icon/passwordSelect.png" alt="" v-if="pass">
        <input type="text" v-model="password" ref="inp2" @focus="fo(2)" @blur="bl(2)">
      </div>
      <div class="line" v-if="register">
        <img src="/src/assets/icon/password.png" alt="" v-if="!pass2">
        <img src="/src/assets/icon/passwordSelect.png" alt="" v-if="pass2">
        <input type="text" v-model="againPassword" ref="inp3" @focus="fo(3)" @blur="bl(3)">
      </div>
      <button v-if="!register" @click="login">
        登录
      </button>
      <button v-if="register" @click=regis>
        注册
      </button>
      <div class="register" @click="register = !register">
        <p v-if="!register">没有账号，立即注册。</p>
        <p v-if="register">已有账号，直接登录。</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  //background-color: var(--themeColor);
  //height: 30vh;
  width: 100%;

  img {
    width: 100%;
  }
}

.container {
  width: 100%;
  padding: 0 50px;
  margin-top: 240px;

  .main {
    width: 100%;
    //background-color: white;
    .line {
      margin-bottom: 100px;

      img {
        width: 54px;
        height: 54px;
      }

      input {
        width: calc(90% - 80px);
        border: 0;
        outline: none;
        background-color: transparent;
        border-bottom: 1px solid black;
        margin-left: 20px;
        padding-left: 10px;
        font-size: 40px;
        letter-spacing: 5px;
      }
    }

    .lineActive {
      input {
        border-bottom: 3px solid var(--themeColor);
      }
    }

    button {
      width: 90%;
      height: 80px;
      border-radius: 40px;
      background-color: var(--themeColor);
      color: black;
      font: {
        family: Geetype;
        //size: 32px;
        //weight: bold;
      };
      letter-spacing: 5px;

    }

    .register {
      margin: 200px auto;
      padding-top: 30px;
      width: 300px;
      color: #646cff;
      border-top: 1px solid grey;
    }
  }
}
</style>