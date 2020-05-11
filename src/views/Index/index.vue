<template>
  <div class="welcome">
    <vue-particle-line>
      <div class="welcomebox">
        <img src="../../assets/hai.png" alt />
        <p class="shadow">欢迎来到鸹貔音乐！</p>
      </div>
    </vue-particle-line>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .welcomebox {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    z-index: 200;
    transform: translateY(-50%);
    img {
      width: 160px;
      height: 160px;
      border-radius: 10px;
    }
    p {
      margin-left: 10px;
      font-size: 36px;
      font-family: "Zurich Bold", sans-serif;
      font-weight: 400;
      color: rgba(0, 102, 204, 1);
      line-height: 50px;
      letter-spacing: 5px;
      line-height: 180px;
    }
  }
  .shadow {
    text-align: center;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, rgba(0, 102, 204, 1)),
      color-stop(0.4, rgba(0, 102, 204, 1)),
      color-stop(0.5, white),
      color-stop(0.6, rgba(0, 102, 204, 1)),
      color-stop(1, rgba(0, 102, 204, 1))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: animate 1.5s infinite;
  }
  @-webkit-keyframes animate {
    from {
      background-position: -100px;
    }
    to {
      background-position: 100px;
    }
  }
  @keyframes animate {
    from {
      background-position: -100px;
    }
    to {
      background-position: 100px;
    }
  }
}
</style>