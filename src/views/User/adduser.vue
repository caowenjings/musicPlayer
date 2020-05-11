<template>
  <div class="useredit">
    <p class="usertiitle">
      用户管理
      <i>/</i>新增用户
    </p>
    <div class="usereditfrom">
      <div class="loginContant">
        <i-form class="loginFrom" ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="info_item">
            <label for>用户名：</label>
            <Form-item prop="name">
              <i-input
                type="text"
                v-model="formInline.name"
                placeholder="用户名"
                style="width: 200px;"
              ></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>昵称：</label>
            <Form-item prop="nickName">
              <i-input
                type="text"
                style="width: 200px;"
                v-model="formInline.nickName"
                placeholder="昵称"
              ></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>性别：</label>
            <Form-item prop="gender">
              <i-select v-model="formInline.gender" style="width:200px">
                <i-option
                  v-for="item in genderList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</i-option>
              </i-select>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>手机号：</label>
            <Form-item prop="tel">
              <i-input type="text" style="width: 200px;"
               v-model="formInline.tel" placeholder="手机号"></i-input>
            </Form-item>
          </div>
           <div class="info_item">
            <label for>密码：</label>
            <Form-item prop="password">
              <i-input type="text" style="width: 200px;"
               v-model="formInline.password" placeholder="密码"></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>加入时间：</label>
            <Form-item prop="birthday">
              <Date-picker
                type="date"
                  :options="optionsDate"
                v-model="formInline.birthday"
                placeholder="选择日期"
                style="width: 200px"
              ></Date-picker>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>邮箱：</label>
            <Form-item prop="eMaile">
              <i-input
                type="text"
                style="width: 200px;"
                v-model="formInline.eMaile"
                placeholder="邮箱"
              ></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <label for>个性签名：</label>
            <Form-item prop="sign">
              <i-input
                type="text"
                style="width: 200px;"
                v-model="formInline.sign"
                placeholder="个性签名"
              ></i-input>
            </Form-item>
          </div>
          <div class="info_item">
            <p class="surebtn" @click="handleSubmit('formInline')">确定</p>
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
       optionsDate: {
        disabledDate: function(date) {
          var disabledDay = date.getFullYear(); //取1950年至今的时间范围.
          return disabledDay <= 1949 || date.valueOf() > Date.now();
        }
      },
      formInline: {
        id: null,
        name: "",
        tel: "",
        birthday: "",
        eMaile: "",
        gender: "",
        nickName: "",
        sign: "",
        password:""
      },
      genderList: [
        {
          value: '2',
          label: "女"
        },
        {
          value: '1',
          label: "男"
        }
      ],
      ruleInline: {
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        sign: [{ required: true, message: "请填写个性签名", trigger: "blur" }],
        nickName: [{ required: true, message: "请选择昵称", trigger: "blur" }],
        eMaile: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
           { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
        birthday: [
          { required: true, message: "请选择加入时间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请设置密码", trigger: "blur" },
           {
            type: "string",
            min:6,
            message: "长度不能小于6位",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        tel: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          {
            type: "string",
            min:11,
            message: "长度不能小于11位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.formInline.birthday = this.Moment(
        new Date(this.formInline.birthday).getTime()
      ).format("YYYY-MM-DD");

      this.$refs[name].validate(valid => {
        if (valid) {
          this.addUser();
        }
      });
    },
    addUser() {
      this.axios
        .post("/admin/member", {
          birthday: this.formInline.birthday,
          eMaile: this.formInline.eMaile,
          gender: this.formInline.gender,
          nickName: this.formInline.nickName,
          phone: this.formInline.tel,
          sign: this.formInline.sign,
          username: this.formInline.name,
          password:this.formInline.password,
        })
        .then(resp => {
          if (resp.status == 200) {
          this.$router.push({
              path: "/user"
            });
               this.$Message.success("添加成功!");
          }else{
               this.$Message.success("添加失败!");
          }
        });
    }
  }
};
</script>

<style lang="less">
.useredit {
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
        width: 80px;
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