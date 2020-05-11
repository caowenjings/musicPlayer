<template>
  <div class="asideBox">
    <div class="top">
      <Header></Header>
    </div>
    <div class="asodeContent" style="height: calc(100% - 80px);">
      <div class="aside-left">
        <Row>
          <Menu :theme="theme2">
            <Menu-item name="首页">
              <div class="mainindex" @click="jumpIndex">
                <Icon type="ios-paper"></Icon>
                <div>首页</div>
              </div>
            </Menu-item>
            <Submenu key="1" name="1">
              <template slot="title">
                <Icon type="ios-paper"></Icon>列表管理
              </template>
              <Menu-item v-for="item in liebiao" :key="item.key" :name="item.key" :path="item.path">
                <div @click="jumpList(item)">{{item.name}}</div>
              </Menu-item>
            </Submenu>
            <Submenu key="2" name="2">
              <template slot="title">
                <Icon type="ios-people"></Icon>添加管理
              </template>
              <Menu-item
                v-for="item in liebiao1"
                :key="item.key"
                :name="item.key"
                :path="item.path"
              >
                <div @click="jumpList(item)">{{item.name}}</div>
              </Menu-item>
            </Submenu>
          </Menu>
        </Row>
      </div>
      <div class="aside-right">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Header";
export default {
  data() {
    return {
      theme2: "dark",
      liebiao: [
        { key: "1-1", name: "用户管理", path: "/user" },
        { key: "1-2", name: "歌曲管理", path: "/music" },
        { key: "1-3", name: "评论管理", path: "/comment" },
        { key: "1-4", name: "歌手管理", path: "/singerlist" }
      ],
      liebiao1: [
        { key: "2-1", name: "新增用户", path: "/adduser" },
        { key: "2-2", name: "新增歌曲", path: "/addmusic" },
        { key: "2-3", name: "新增歌手", path: "/addSinger" }
        // {key:'2-4',name:'新增歌单',path:"/addAblum"},
      ]
    };
  },
  components: {
    Header
  },
  methods: {
    jumpIndex() {
      this.$router.push({ path: "/index" });
    },
    jumpList(s) {
      this.$router.push({ path: s.path });
    }
  }
};
</script>

<style lang="less">
.asideBox {
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  .asodeContent {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    height: 100%;
    width: 100%;
    .aside-left {
      background-color: #fff;
      border-radius: 10px;
      margin-left: 5px;
      background: #515a6e;
      height: 100%;

      .ivu-menu {
        border-radius: 10px;
      }
    }
    .aside-right {
      flex: 1;
      margin-right: 10px;
      background-color: #fff;
      margin-left: 10px;
      border-radius: 10px;
      padding: 20px 20px 60px 20px;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow-y: auto;
    }
  }
  .mainindex {
    display: flex;
    align-items: center;
    div{
      margin-left: 12px;
    }
  }
}
</style>