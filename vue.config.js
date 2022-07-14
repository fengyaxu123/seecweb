const { defineConfig } = require("@vue/cli-service");
let API=process.env.VUE_APP_API
module.exports = defineConfig({
  transpileDependencies: true,
  "lintOnSave":false,
  "devServer":{
    proxy:{
      "/api":{
        target:"http://127.0.0.1:2222",
        changeOrigin:true,
        pathReWrite:{
          "/api":""
        }
      }
    }
  }
});
