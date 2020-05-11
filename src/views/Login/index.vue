<template>
  <div class="loginBox">
    <div>
      <div class="logonTop">
        <img src="../../assets/logo.png" alt />
        <div class="logintitle">
          <p>鸹貔音乐</p>
          <span>guapi music</span>
        </div>
        <div class="line"></div>
        <div class="loginname">管理员登录</div>
      </div>
      <div class="loginContant">
        <i-form class="loginFrom" ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <Form-item prop="user">
            <i-input
              type="text"
              v-model="formInline.user"
              placeholder="管理者手机号"
              style="width: 300px;"
            ></i-input>
          </Form-item>
          <Form-item prop="password">
            <i-input
              type="password"
              style="width: 300px;"
              v-model="formInline.password"
              placeholder="密码"
            ></i-input>
          </Form-item>
          <Form-item>
            <p class="btn" @click="handleSubmit('formInline')">登 录</p>
          </Form-item>
        </i-form>
      </div>
    </div>

    <ul class="bg-bubbles">
      <li v-for="(item, index) in 20" :key="index"></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getLogin();
        }
      });
    },
    getLogin() {
      this.axios
        .post("/admin/backstage/login", {
          password: this.formInline.password,
          username: this.formInline.user
        })
        .then(resp => {
          if (resp.data.code == 200) {
            this.$Message.success("登录成功!");
            this.$router.push({ path: "/index" });
          } else {
            this.$Message.success(resp.data.message);
          }
        });
    }
  }
};
</script>
<style lang="less">
body {
  width: 100%;
  height: 100%;
}
.loginBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 100;
  background: skyblue;
  .logonTop {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 55px;
      margin-left: 10px;
      margin-top: 10px;
    }
    .logintitle {
      margin: 0 10px;
      color: rgba(255, 255, 255, 1);
      p {
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: 500;
        font-family: Microsoft YaHei;
      }
    }
    .line {
      width: 2px;
      height: 41px;
      background-color: #fff;
    }
    .loginname {
      margin-left: 10px;
      margin-top: 15px;
      color: #eee;
    }
  }
  .loginContant {
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    .loginFrom {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ivu-input {
      height: 40px;
      background: rgba(255, 255, 255, 1);
    }
    .btn {
      width: 240px;
      height: 40px;
      font-size: 18px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 3px 0px rgba(0, 0, 51, 0.26),
        0px 0px 6px 0px rgba(0, 0, 0, 0.35);
      border-radius: 10px;
      color: #3366cc;
      text-align: center;
      line-height: 40px;
    }
  }
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  li {
    position: absolute;
    bottom: -160px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    // background-color: rgba(255, 255, 255, 0.15);
    background-color: #fff;
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 10s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 15%;
      width: 20px;
      height: 20px;
    }
    &:nth-child(2) {
      left: 5%;
      width: 35px;
      height: 35px;
      animation-delay: 2s;
      animation-duration: 10s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 80px;
      height: 80px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 80px;
      height:80px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 80px;
      height: 80px;
      animation-delay: 5s;
    }
    &:nth-child(11) {
      left: 80%;
      width: 70px;
      height: 70px;
      animation-delay: 1s;
      animation-duration: 10s;
    }
    &:nth-child(11) {
      left: 60%;
      width: 60px;
      height: 60px;
      animation-delay: 1s;
      animation-duration: 10s;
    }
    &:nth-child(12) {
      left: 20%;
      width: 60px;
      height: 60px;
      animation-delay: 1s;
      animation-duration: 7s;
    }
    &:nth-child(13) {
      left: 80%;
      width: 30px;
      height: 30px;
      animation-delay: 2s;
      animation-duration: 10s;
    }
    &:nth-child(14) {
      left: 650%;
      width: 30px;
      height: 30px;
      animation-delay: 1s;
      animation-duration: 15s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
</style>