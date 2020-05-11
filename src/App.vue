<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.selectbtn {
  width: 40px;
  height: 32px;
  border-radius: 5px;
  background: skyblue;
  margin-left: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  img {
    width: 20px;
    height: 20px;
  }
}
.selectbtn:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
