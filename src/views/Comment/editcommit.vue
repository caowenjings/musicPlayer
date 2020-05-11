<template>
  <div class="commintedit">
    <p class="usertiitle">
      评论管理
      <i>/</i>编辑评论
    </p>
    <div class="usereditfrom">
      <div class="loginContant">
        <i-form class="loginFrom" ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="info_item">
            <label for>评论人：</label>
            <Form-item prop="name">
              <i-input type="text" disabled v-model="formInline.name" style="width: 200px;"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>评论歌曲：</label>
            <Form-item prop="singer">
              <i-input type="text" 
              style="width:200px;" disabled v-model="formInline.singer"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>评论留言：</label>
            <Form-item prop="comment">
              <i-input type="text"
               style="width:200px;" v-model="formInline.comment"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <p class="surebtn" @click="handleSubmit('formInline')">确定</p>
            <p class="cancelbtn" @click="cancel">取消</p>
          </div>
        </i-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        id:null,
        name: "",
        singer: "",
        comment:""
      },
      ruleInline: {
        name: [{ required: true, message: "请填写评论人", trigger: "blur" }],
        singer: [
          { required: true, message: "请填写评论歌曲", trigger: "blur" },
        ],
        comment: [
          { required: true, message: "请填写评论留言", trigger: "blur" },
        ]
      }
    };
  },
  created(){
    var data = JSON.parse(this.$route.query.num_id);
    this.formInline.id = data.id;
    this.formInline.name = data.memberName;
    this.formInline.singer = data.musicName;
    this.formInline.comment = data.content;
  },
  methods: {
    cancel() {
      this.$router.push({
        path: "/comment"
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.initMusic();
        }
      });
    },
     initMusic() {
      this.axios
        .put("/admin/backstage/comment/"+this.formInline.id, {
          comment: this.formInline.comment,
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$router.push({
              path: "/comment"
            });
            this.$Message.success("修改成功!");
          } else {
            this.$Message.success("修改失败!");
          }
        });
    }
  }
};
</script>

<style lang="less">
.commintedit {
  .usertiitle {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 1);
    i {
      margin: 0 10px;
    }
  }
  .usereditfrom {
    .info_item {
      display: flex;
      label {
        margin-top: 8px;
        width: 60px;
      }
    }
    .surebtn,
    .cancelbtn {
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      color: #fff;
      border-radius: 5px;
    }
    .surebtn {
      background-color: skyblue;
    }
    .cancelbtn {
      background-color: #999;
    }
    .surebtn:hover {
      opacity: 0.8;
    }
    .cancelbtn:hover {
      opacity: 0.8;
    }
  }
}
</style>