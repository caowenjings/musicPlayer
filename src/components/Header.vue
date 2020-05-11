<template>
  <div class="header_container">
    <div class="header_left">
      <div class="header_name">鸹貔音乐</div>
      <div>
        <img class="userimg" src="../assets/user.png" />
        <span class="usertname">管理员A</span>
      </div>
    </div>
    <div class="header_ringt" @click="jumpreturn">
      <span>退出登陆</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["num", "employeeName"],
  date() {
    return {};
  },
  computed: {},
  methods: {
    jumpreturn() {
      this.$router.push({ path: "/" });
    },
    // 跳转到账号信息
    jumpAccount() {
      this.$store.commit("set_defaultactive");
      this.$router.push({ path: "/account" });
    },
    jumpstoreIof(item) {
      if (item.menuName == "商户信息") {
        this.$router.push({ path: "/shop/info" });
      } else {
        this.$router.push({ path: "/shop/authentication" });
      }
    },
    jumplogin() {
      this.$store.commit("set_defaultactive");
      this.axios.get("platformservice/platform/auth/loginout").then(resp => {
        if (resp.data.success) {
          this.$router.push({ path: "/" });
          this.$store.commit("del_token");
        }
      });
    },
    gomessagelist() {
      this.$router.push({ path: "/messagelist" });
    }
  }
};
</script>

<style  lang="less">
.header_container {
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .header_name {
    font-size: 25px;
    font-family: Microsoft YaHei;
    font-weight: 500;
    color: rgba(0, 102, 204, 1);
  }
  .userimg {
    width: 50px;
    height: 50px;
    margin-left: 90px;
  }
  .usertname {
    font-size: 20px;
    margin-top: 15px;
    font-family: Microsoft YaHei;
    font-weight: 500;
    margin-left: 10px;
    color: rgba(0, 102, 204, 1);
  }
  .header_left {
    display: flex;
    align-items: center;
  }
  .header_ringt {
    span {
      display: inline-block;
      width: 80px;
      height: 35px;
      background: rgba(0, 102, 204, 1);
      color: #fff;
      border-radius: 10px;
      text-align: center;
      line-height: 35px;
      cursor: pointer;
      opacity: 0.8;
    }
    span:hover {
      opacity: 1;
    }
  }
}
</style>
