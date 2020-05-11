<template>
  <div class="commentBox">
    <p class="commenttiitle">
      列表查询
      <i>/</i>评论管理
    </p>
    <div class="commentSelect">
      <i-form :label-width="80">
        <Form-item label="评论歌曲" style="width:250px">
           <i-input v-model="comment" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item>
          <div class="selectbtn" @click="searchuser">
            <img src="../../assets/select.png" alt />
          </div>
        </Form-item>
      </i-form>
    </div>
    <div class="commentTable">
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
      <Modal v-model="deletdmodal" title="删除评论" @on-ok="ok" @on-cancel="cancel">
        <p>你确定删除此评论吗？</p>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletdmodal: false,
      comment:null,
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
          title: "评论歌曲",
          key: "musicName",
          width: 150
        },
        {
          title: "评论人",
          key: "username",
          width: 160
        },
        {
          title: "评论留言",
          key: "content",
          width: 220
        },
        {
          title: "评论时间",
          key: "createTime",
          width: 220
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
      deletemusicId: null
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ok() {
      this.getdelete();
    },
    cancel() {
      this.deletdmodal = false;
    },
    deletdmusic(row) {
      this.deletemusicId = row.id;
      this.deletdmodal = true;
    },
    getdelete() {
      this.axios
        .delete("/admin/backstage/comment/" + this.deletemusicId, {})
        .then(resp => {
          if (resp.status == 200) {
            this.$Message.info("删除成功");
            this.getUser();
          } else {
            this.$Message.info("删除失败");
          }
        });
    },
    getUser() {
      this.axios
        .get("/admin/backstage/comment", {
          params: {
            page: this.page,
            size: this.pageSize,
            comment: this.comment
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
        path: "/editcommit",
         query: { num_id: JSON.stringify(row)}
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
.commentBox {
  .commenttiitle {
    font-size: 24px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    i {
      margin: 0 10px;
    }
  }
  .commentSelect {
    margin-top: 20px;
    .ivu-form {
      display: flex;
      .ivu-form-item-content {
        margin-right: 15px;
      }
    }
  }
  .commentTable {
    .paging {
      margin-top: 20px;
    }
  }
}
</style>