<template>
  <div class="MusicBox">
    <p class="Musictiitle">
      列表查询
      <i>/</i>歌曲管理
    </p>
    <div class="MusicSelect">
      <i-form :label-width="80">
        <Form-item label="歌名/歌手" style="width:250px">
          <i-input v-model="keyWord" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item>
          <div class="selectbtn" @click="searchuser">
            <img src="../../assets/select.png" alt />
          </div>
        </Form-item>
      </i-form>
    </div>
    <div class="musicTable">
      <Table border :columns="columns2" :data="data"></Table>
      <Page
        :total="dataCount"
        :page-size="pageSize"
        show-sizer
        class="paging"
        v-model="page"
        show-total
        @on-change="changepage"
        @on-page-size-change="pagesize"
      ></Page>
    </div>
    <div>
      <Modal v-model="deletdmodal" title="删除音乐" @on-ok="ok" @on-cancel="cancel">
        <p>你确定删除此音乐吗？</p>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deletdmodal: false,
      keyWord: "",
      dataCount: 0, // 初始化信息总条数
      pageSize: 10, // 每页显示多少条
      page: 1, // 当前页码
      columns2: [
        {
          type: "index",
          width: 60,
          title: "序号",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index + (this.page - 1) * this.pageSize + 1
            );
          }
        },
        {
          title: "歌曲名",
          key: "name",
          width: 150
        },
        {
          title: "演唱者",
          key: "singer",
          width: 160,
          render: (h, params) => {
            if (params.row.singer == "") {
              return h("span", "--");
            } else {
              return h("span", params.row.singer);
            }
          }
        },
        {
          title: '音乐图片',
          key: 'img',
          align: "center",
          render: (h, params) => {
            return h("img", {
              style: {
                width: "100px",
                height: "80px",
                "margin-top":"5px",
                "margin-bottom":"5px",
                "border-radius": "5%"
              },
              attrs: {
                src: params.row.img,
              }
            });
          }
        },
        {
          title: "专辑",
          key: "album",
          width: 100
        },
        {
          title: "音乐标签",
          key: "description",
          width: 160
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.row); //编辑方法
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.deletdmusic(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      musicId: null
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ok() {
      this.axios
        .delete("/admin/backstage/music/" + this.musicId, {})
        .then(resp => {
          if (resp.status == 200) {
            this.$Message.success("删除成功!");
            this.getUser();
          } else {
            this.$Message.info("删除失败");
          }
        });
    },
    cancel() {
      this.$Message.info("点击了取消");
    },
    deletdmusic(row) {
      this.deletdmodal = true;
      this.musicId = row.id;
    },
    getUser() {
      this.axios
        .get("/admin/backstage/music", {
          params: {
            page: this.page,
            size: this.pageSize,
            keyWord: this.keyWord
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.data = resp.data.data.list;
            this.dataCount = resp.data.data.total;
          }
        });
    },
    handleEdit(row) {
      var that = this;
      that.$router.push({
        path: "/editMusic",
        query: { num_id: JSON.stringify(row) }
      });
    },
    // 下一页，上一页
    changepage(index) {
      this.page = index;
      this.getUser();
    },
    // 换一页多少数
    pagesize(index) {
      this.pageSize = index;
      this.getUser();
    },
    // 搜索
    searchuser() {
      this.getUser();
    }
  }
};
</script>

<style lang="less">
.MusicBox {
  .Musictiitle {
    font-size: 24px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    i {
      margin: 0 10px;
    }
  }
  label {
    width: 100px;
  }
  .MusicSelect {
    margin-top: 20px;
    .ivu-form {
      display: flex;
      .ivu-form-item-content {
        margin-right: 20px;
      }
    }
  }
  .musicTable {
    .paging {
      margin-top: 20px;
    }
  }
}
</style>