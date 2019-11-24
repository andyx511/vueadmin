<template>
  <div class="login">
    <!-- slogin -->
    <!--<div class="slogin">
      <h1>诚邀优质品牌加盟</h1>
      <h2>共赢美好未来</h2>
      <h2></h2>
    </div>-->
    <!-- /slogin -->
    <!-- login-box -->
    <div class="login-box">
      <div v-show="show === 'login'">
        <h2 class="login-title">登录</h2>
        <el-form class="clearfix" ref="Login" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" class="form-control" auto-complete="off" type="text" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" class="form-control" auto-complete="off"  type="password" @keyup.enter.native="login" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="tcode">
            <el-row :gutter="5">
              <el-col :span="16">
                <el-input v-model="loginForm.tcode" class="form-control" :maxlength="6" :minlength="6" auto-complete="off" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="8" style="text-align: right">
                <img @click="changeTime" width="100%" height="40px" :src="tCodeUrl" alt="验证码">
              </el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary" class="login-btn" @click="login" :loading="loading">确认登录</el-button>
        </el-form>
      </div>
      <div v-show="show === 'login.vue'">
        <h2 class="login-title">注册</h2>
        <el-form class="clearfix" ref="Register" :model="registerForm" :rules="registerRules">
          <el-form-item prop="nickname">
            <el-input v-model="registerForm.nickname" auto-complete="off" class="form-control" type="text" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" class="form-control" auto-complete="off" :type="regPassType" placeholder="密码" @focus="regPassType = 'password'"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input v-model="registerForm.repassword" class="form-control" auto-complete="off" :type="regRePassType" placeholder="验证密码" @focus="regRePassType = 'password'"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" class="form-control" type="text" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="mCode">
            <el-row>
              <el-col :span="12">
                <el-input v-model="registerForm.vcode" class="form-control" :maxlength="6" :minlength="6" auto-complete="off" placeholder="短信验证码"></el-input>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button size="mini" :type="timer !== 0? 'info': 'default'" style="width: 90%; line-height: 26px;" :disabled="timer !== 0" @click="getCode()">
                  {{btnName}}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="register" :loading="loading">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="show === 'resetPwd'">
        <h2 class="login-title">重置密码</h2>
        <el-form class="clearfix" ref="Reset" :model="resetForm" :rules="resetRules">
          <el-form-item prop="username">
            <el-input v-model="resetForm.username" class="form-control" type="text" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-row>
              <el-col :span="12">
                <el-input v-model="resetForm.vcode" class="form-control" type="text" placeholder="短信验证码"></el-input>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button :type="resetTimer !== 0? 'info': 'default'" style="width: 90%;line-height: 26px;" :disabled="resetTimer !== 0" @click="getResetCode" size="mini">{{resetBtnName}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="resetForm.password" class="form-control" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input v-model="resetForm.repassword" class="form-control" type="password" placeholder="验证密码"></el-input>
          </el-form-item>
          <el-button type="primary" class="login-btn" @click="resetPwd" :loading="loading">重置密码</el-button>
        </el-form>
      </div>
      <div class="login-more">
        <el-button type="text" @click="changeShow('resetPwd')">忘记密码</el-button>
        <el-button type="text" @click="changeShow('login.vue')">注册新账号</el-button>
      </div>
      <a v-show="show !== 'login'" class="login-back">
        <span style="font-size: 12px;color: #000">已有账号</span>
        <el-button type="text" @click="changeShow('login')">立即登录</el-button>
      </a>
    </div>
    <!-- /login-box -->
    <!--    <FooterView class="footer" color="white"></FooterView>-->
  </div>
</template>

<script>
  import "@/assets/css/base.css";
  import "@/assets/css/login.css";
  import axios from 'axios'
  import {getVCode,register,reset} from "../../api/user";

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.registerForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };
      let validateRestPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.resetForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };

      return {
        regPassType: 'text',
        regRePassType: 'text',
        show: "login",
        btnName: "获取验证码",
        resetBtnName: "获取验证码",
        timer: 0,
        resetTimer: 0,
        tCodeUrl: '',
        loginForm: {
          username: "",
          password: "",
          tcode: ""
        },
        registerForm: {
          username: "",
          nickname: "",
          password: "",
          repassword: "",
          vcode: ""
        },
        resetForm: {
          username: "",
          password: "",
          repassword: "",
          vcode: ""
        },
        loginRules: {
          username: [
            {
              required: true,
              // pattern: /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$)/,
              message: "请输入手机号",
              trigger: "blur"
            }
          ],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          tcode: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }],
        },
        registerRules: {
          username: [
            {
              required: true,
              pattern: /^1[3456789]\d{9}$/,
              message: "请输入正确的手机号",
              trigger: "blur"
            }
          ],
          nickname: [
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            }
          ],
          vCode: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          repassword: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
            {
              validator: validatePass,
              trigger: "blur"
            }
          ]
        },
        resetRules: {
          username: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: "请输入正确的手机号",
              trigger: "blur"
            }
          ],
          vcode: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          repassword: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
            {
              validator: validateRestPass,
              trigger: "blur"
            }
          ]
        },
        loading: false,
        agreementShow: false
      };
    },
    created(){
      /*this.tCodeUrl = ImgCodeUrl + '?t=' + new Date().getTime();*/
      axios.get('http://114.55.94.250:8888/admin/getTCode').then((res) => {
        this.tCodeUrl = 'http://114.55.94.250:8888/admin/getTCode' + '?t=' + new Date().getTime()
      })
    },
    methods: {
      // 切换验证码
      changeTime(){
        axios.get('http://114.55.94.250:8888/admin/getTCode').then((res) => {
          this.tCodeUrl = 'http://114.55.94.250:8888/admin/getTCode' + '?t=' + new Date().getTime()
        })
      },

      // 切换登录注册
      changeShow(type) {
        this.show = type;
        this.$nextTick(() => {
          this.$refs["Login"] && this.$refs["Login"].resetFields();
          this.$refs["Login"] && this.$refs["Login"].clearValidate();
          this.$refs["Register"] && this.$refs["Register"].resetFields();
          this.$refs["Register"] && this.$refs["Register"].clearValidate();
          this.$refs["Reset"] && this.$refs["Reset"].resetFields();
          this.$refs["Reset"] && this.$refs["Reset"].clearValidate();
        });
      },
      // 获取密码重置验证码
      getResetCode() {
        if (/^1[3456789]\d{9}$/.test(this.resetForm.username)) {
          this.sendSmsCode("reset");
        } else {
          this.$refs["Reset"].validateField("userName");
        }
      },
      // 密码重置倒计时
      resetCodeTimer(wait) {
        if (wait === 1) {
          this.resetTimer = 0;
          this.resetBtnName = "获取验证码";
        } else {
          this.resetTimer = wait;
          this.resetTimer--;
          this.resetBtnName = this.resetTimer + "s";
          window.setTimeout(() => {
            this.resetCodeTimer(this.resetTimer);
          }, 1000);
        }
      },
      // 获取注册验证码
      getCode() {
        if (/^1[3456789]\d{9}$/.test(this.registerForm.username)) {
          this.sendSmsCode("register");
        } else {
          this.$refs["Register"].validateField("username");
        }
      },
      // 注册倒计时
      codeTimer(wait) {
        if (wait === 1) {
          this.timer = 0;
          this.btnName = "获取验证码";
        } else {
          this.timer = wait;
          this.timer--;
          this.btnName = this.timer + "s";
          window.setTimeout(() => {
            this.codeTimer(this.timer);
          }, 1000);
        }
      },
      // 登录
      login() {
        this.$refs["Login"].validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {

                this.$message.success("登录成功");
                this.$router.push({
                  path: '/shop'
                });
                this.loading = false;

              }).catch(e => {
              this.loading = false;
            })
          }
        });
      },
      // 注册
      register() {
        this.$refs["Register"].validate(valid => {
          if (valid) {
            register(this.registerForm)
              .then(res => {
                this.$message.success("恭喜您账号注册成功, 请使用注册使用的手机号进行登录");
                this.show = 'login'
              })
          }
        });
      },
      // 重置密码
      resetPwd() {
        this.$refs["Reset"].validate(valid => {
          if (valid) {
            reset(this.resetForm).then(res =>{
              this.$message.success("恭喜您账号重置密码成功, 请使用注册使用的手机号进行登录");
              this.show = 'login'
            })
           /* let arg = {
              url: this.Config.apiUrl.forgetPwd,
              params: {
                phone: this.resetForm.userName,
                passwd: this.resetForm.passwd,
                mCode: this.resetForm.code
              }
            };
            _post(arg)
              .then(res => {
                this.$message.success('密码重置成功, 请使用新密码登录');
                this.show = "login";
              })
              .catch(e => {
                this.$message.error(e);
              });*/
          }
        });
      },
      // 发送验证码
      sendSmsCode(type) {
        let arg = {
          phone: type === "register" ?
            this.registerForm.username :
            this.resetForm.username,
          type: type
        };
        getVCode(arg)
          .then(res => {
            this.$message.success('短信验证码已发送,请注意查收');
            if(type === "register"){
              this.codeTimer(60);
            } else {
              this.resetCodeTimer(60);
            }
          })
      },
      showAgreement() {
        this.agreementShow = true;
      }
    }
  };
</script>
