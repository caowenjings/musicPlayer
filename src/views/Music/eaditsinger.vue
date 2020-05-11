<template>
  <div class="MusicBox">
    <p class="Musictiitle">
      歌曲管理
      <i>/</i>修改歌手
    </p>
    <div class="addmusicfrom">
      <div class="loginContant">
        <i-form class="loginFrom" ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="info_item">
            <label for>歌手名字：</label>
            <Form-item prop="musicname">
              <i-input type="text" v-model="formInline.musicname" style="width: 200px;"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>歌手排序：</label>
            <Form-item prop="sort">
              <i-input type="text" v-model="formInline.sort" style="width: 200px;"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>音乐图片：</label>
            <Form-item prop="musicimg">
              <Upload
                v-if="formInline.musicimg==null||formInline.musicimg==''"
                action="http://193.112.73.103:8080/upload/tengxun"
                :show-upload-list="false"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="['jpg','jpeg','png']"
                class="upload"
                style="display: inline-block;width:68px;height:68px;"
              >
                <div class="uploadbtn" style="width: 68px;height:68px;line-height: 58px;">
                  <img src="../../assets/ponto.png" alt />
                </div>
              </Upload>
              <div class="demo-upload-list" v-else>
                <template>
                  <img :src="formInline.musicimg" />
                  <div class="demo-upload-list-cover">
                    <!-- <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon> -->
                    <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                  </div>
                </template>
              </div>
              <Modal title="查看图片" v-if="visible">
                <img :src="formInline.musicimg" style="width: 100%" />
              </Modal>
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
      visible: false,
      formInline: {
        musicname: "",
        musicimg: "",
        sort: "",
        id: null
      },
      ruleInline: {
        musicname: [
          { required: true, message: "请填写歌手名字", trigger: "blur" }
        ],
        musicimg: [{ required: true, message: "请上传图片", trigger: "blur" }],
        sort: [
          { required: true, message: "请填写排序", trigger: "blur" },
          {
            type: "string",
            pattern: /^\d+$/,
            message: "请输入数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    var data = JSON.parse(this.$route.query.num_id);
    this.formInline.id = data.id;
    this.formInline.musicname = data.name;
    this.formInline.musicimg = data.img;
    this.formInline.sort = String(data.sort);
  },
  methods: {
    // 图片
    handleFormatErrorImg() {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件格式不正确，请上传'jpg','jpeg','png'的格式。"
      });
    },
    handleSuccessImg(res, file) {
      this.formInline.musicimg = file.response.path;
    },
    handleRemove() {
      this.formInline.musicimg = null;
    },
    handleView() {
      this.visible = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.initMusic();
        }
      });
    },
    cancel() {
      this.$router.push({
        path: "/singerlist"
      });
    },
    initMusic() {
      this.axios
        .put("admin/backstage/singer", {
          id: this.formInline.id,
          img: this.formInline.musicimg,
          name: this.formInline.musicname,
          sort: this.formInline.sort
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$router.push({
              path: "/singerlist"
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
.Musictiitle {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 1);
  i {
    margin: 0 10px;
  }
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.upload {
  border: 1px solid #dcdee2;
}
.uploadbtn {
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 22px;
    height: 22px;
  }
}
.addmusicfrom {
  .info_item {
    display: flex;
    label {
      margin-top: 8px;
      width: 66px;
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
</style>