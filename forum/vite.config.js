import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0'
  },
  css:{
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue:75,
          propList:['*'],
        })
      ]
    }
  }
})
