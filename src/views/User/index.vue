<template>
  <div class="userBox">
    <p class="usertiitle">
      列表查询
      <i>/</i>用户管理
    </p>
    <div class="userSelect">
      <i-form :label-width="60">
        <Form-item label="用户名" style="width:250px">
          <i-input v-model="userName" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item>
          <div class="selectbtn" @click="searchuser">
            <img src="../../assets/select.png" alt />
          </div>
        </Form-item>
      </i-form>
    </div>
    <div class="userTable">
      <!-- <i-table width="883" border :columns="columns2" :data="data3"></i-table> -->
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
      <Modal v-model="deletdmodal" title="删除用户" @on-ok="ok" @on-cancel="cancel">
        <p>你确定删除此用户吗？</p>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deletdmodal: false,
      userName: "",
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
          title: "用户名",
          key: "username",
          width: 100
        },
        {
          title: "昵称",
          key: "nickName",
          width: 100,
          render: (h, params) => {
            if (params.row.nickName == "") {
              return h("span", "--");
            } else {
              return h("span", params.row.nickName);
            }
          }
        },
        {
          title: "性别",
          key: "gender",
          width: 70,
          render: (h, params) => {
            if (params.row.gender == 1) {
              return h("span", "男");
            } else if (params.row.gender == 2) {
              return h("span", "女");
            } else {
              return h("span", "--");
            }
          }
        },
        {
          title: "手机号",
          key: "phone",
          width: 150,
          render: (h, params) => {
            if (params.row.nickName == null) {
              return h("span", "--");
            } else {
              return h("span", params.row.phone);
            }
          }
        },
        {
          title: "邮箱",
          key: "emaile",
          width: 200,
          render: (h, params) => {
            if (params.row.emaile == null || params.row.emaile == "") {
              return h("span", "--");
            } else {
              return h("span", params.row.emaile);
            }
          }
        },
        {
          title: "加入时间",
          key: "birthday",
          width: 160
        },
        {
          title: "个性签名",
          key: "sign",
          width: 110
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
      deleteId: null
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ok() {
      this.axios.delete("/admin/member/" + this.deleteId, {}).then(resp => {
        if (resp.status == 200) {
          this.$Message.success("删除成功!");
          this.getUser();
        }else {
            this.$Message.info("删除失败");
          }
      });
    },
    cancel() {
      this.$Message.info("点击了取消");
    },
    deletdmusic(row) {
      this.deletdmodal = true;
      this.deleteId = row.id;
    },
    getUser() {
      this.axios
        .get("/admin/member", {
          params: {
            page: this.page,
            size: this.pageSize,
            name: this.userName
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
        path: "/useredit",
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
.userBox {
  .paging {
    margin-top: 20px;
  }
  .usertiitle {
    font-size: 24px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    i {
      margin: 0 10px;
    }
  }
  .userSelect {
    margin-top: 20px;
    .ivu-form {
      display: flex;
    }
  }
  .userTable {
    margin-top: 20px;
    .ivu-table-wrapper {
      border-bottom: none;
      border-right: none;
    }
    .ivu-table-cell {
      div {
        display: flex;
      }
    }
  }
}
</style>