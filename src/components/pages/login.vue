<template>
<div class='login'>
    <Row>        
        <Col span="24"><h2>后台管理系统</h2></Col>        
    </Row>
    <Form ref='formLogin' :model='formLogin' :rules='formrule' :label-width="80">
    <Row>
        <Col span="6" offset="9">
            <FormItem label="用户:" prop="username">
                <Input type="text" v-model="formLogin.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="密码:" prop="password">
                <Input type="password" v-model="formLogin.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="验证码:" prop="veritycode">
                <Row :gutter="2">
                    <Col span="8">
                        <Input type="text" v-model="formLogin.veritycode"></Input>
                    </Col>
                    <Col span="4">
                        <img v-bind:src="imageUrl" style="width: 50px; height: 32px" v-model='vcode'/>
                    </Col>
                    <Col span="1" offset="3">
                        <Button @click="updateVeritycode">刷新</Button>
                    </Col>
                </Row> 
            </FormItem>
            <FormItem>
                <Row :gutter="8">
                    <Col span="12">
                        <Button type="primary" @click="handleSubmit('formLogin')" long>登录</Button>
                    </Col>
                    <Col span="12">
                        <Button type="warning" @click="handleReset()" long>重置</Button>
                    </Col>
                </Row>
                
            </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="5" offset="10">            
            <div class='msg'>{{ msg }}</div>
            <p> 管理员用户： admin  123456</p>
            <p> 组权限用户： test   123456</p>
            <p>   普通用户： test2  123456</p>
        </Col>
    </Row>
    </Form>
</div>
</template>

<script>
export default {
    data () {
        const validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else if ( value !== this.vcode ) {
                callback(new Error('验证码不正确'));
            } else {
                callback();
            }
        };
        return {            
            formLogin: {username:'', password:'', veritycode: ''},
            formrule: {
                username: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                //veritycode: [
                //    { validator: validateCode, trigger: 'blur'}
                //]
            },
            imageUrl: '',
            vcode: '',
            msg: ''
        }
    },
    methods: {
        handleSubmit(value) {
            var self = this;
            self.$refs[value].validate((valid) => {
                if (valid) { 
                    self.$store.dispatch('Login', self.formLogin).then(() => {
                        self.$Message.success('登录成功');
                        self.msg = "登录成功";
                        self.$router.push({path: '/'});
                    }).catch( error => {
                        self.$Message.error(error);
                        self.msg = error;
                    })
                }
            })
        },
        handleReset () {
            var self = this;
            self.formLogin.username = '';
            self.formLogin.password = '';
        },
        updateVeritycode () {
            var self = this;
            self.$store.dispatch('UpdateVcode').then( () => {                
                self.vcode = self.$store.getters.vcode;
                self.imageUrl = "data:image/png;base64,"+self.$store.getters.imgurl;
            }).catch( error => {
                self.msg = error;
            })
        },        
    },
    created () {
        var self = this;
        self.$store.dispatch('UpdateVcode').then( () => {
            self.vcode = self.$store.getters.vcode;
            self.imageUrl = "data:image/png;base64,"+self.$store.getters.imgurl;
        }).catch( error => {
            return error;
        })
    }

} 
</script>
<style scoped>
.login {
    margin-top: 150px;
    text-align: center;
}

.login h2 {
    margin-bottom: 20px;
}

.login .msg {
    color: #ff0000;
}
</style>
