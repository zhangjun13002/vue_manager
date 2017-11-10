<template>
<div>
    <div class="layout-right-header">
        <Breadcrumb>
            <Breadcrumb-item> 系统管理 </Breadcrumb-item>
            <Breadcrumb-item> 用户管理 </Breadcrumb-item>
        </Breadcrumb>
    </div>
    <div class="layout-right-content">
        <div class="content-main">
            <div class="main-title">                
                <h2><Icon type="android-people"></Icon>用户列表</h2>
            </div>
            <div class='split'></div>
            <Row>
                <Col span="24">
                    <Button type="primary" size="small" @click='getUsers'>刷新</Button>
                    <Button type="primary" size="small" @click='modal1 = true'>添加</Button>
                        <Modal
                            title="添加用户"
                            v-model="modal1"
                            :loading = "loading"
                            :mask-closable="false"                           
                            @on-ok="addUser"
                            @on-cancel="addCancel">
                            <Row>
                              <Col span='2'>
                                用户:
                              </Col>
                              <Col span='22'>
                                <Input v-model="m1_username" @on-change="userCheck"></Input>
                              </Col>
                            </Row>
                            <br>
                            <Row>
                              <Col span='2'>
                                密码: 
                              </Col>
                              <Col span='22'>
                                <Input v-model="m1_password" type="text"></Input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col span='2'>
                                角色: 
                              </Col>
                              <Col span='22'>                                    
                                    <Select v-model="m1_roles" multiple>
                                        <Option v-for="item in roleslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                              </Col>
                            </Row>
                        </Modal>
                    <Button type="primary" size="small" @click='modal2 = true'>修改</Button>
                        <Modal
                            title="修改密码"
                            v-model="modal2"
                            :mask-closable="false"
                            @on-ok="updateUser"
                            @on-cancel="updateCancel">
                            <Row>
                              <Col span='2'>
                                用户:
                              </Col>
                              <Col span='22'>
                                <Input v-model="m2_username" disabled></Input>
                              </Col>
                            </Row>
                            <br>
                            <Row>
                              <Col span='2'>
                                密码: 
                              </Col>
                              <Col span='22'>
                                <Input v-model="m2_password" type="text" @on-change="m2Change"></Input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col span='2'>
                                角色: 
                              </Col>
                              <Col span='22'>
                                    <Select v-model="m2_roles" multiple>
                                        <Option v-for="item in roleslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                              </Col>
                            </Row>
                        </Modal>
                    <Button type="warning" size="small" @click='delUser'>删除</Button>                    
                </Col>
            </Row>
            <br />
            <Row type="flex">
                <Col span='24'>
                    <Table border draggable stripe highlight-row size='small' :columns='columns1' :data='data1' @on-select="getSelKey"></Table>
                </Col>
            </Row>
        </div>
    </div>
</div>
</template>
<script>
import CryptoJS from 'crypto-js'

export default {
    data () {
        return {
            data1: [],
            columns1: [
                { type: 'selection', width:40, align: 'center'},
                { title: '用户', key: 'username', align: 'center'},
                { title: '密码', key: 'password', align: 'center', 
                  render: (h, params) => {
                    return h('span', this.hidePass(params.row.password))
                  }
                },
                { title: '角色', key: 'roles', align: 'center', 
                  render: (h, params) => {
                    return h('span', params.row.roles.join(','));
                  }
                },
                { title: '登录时间', key: 'logintime', align: 'center'},
                { title: '创建时间', key: 'gentime', align: 'center'},
            ],
            modal1: false,
            loading: true,
            m1_username: '',
            m1_password: '',
            m1_roles: [],
            usercheck: false,

            modal2: false,
            m2_username: '',
            m2_password: '',
            m2_roles: [],
            oldPassword: '',
            isM2change: false,

            roleslist: [],
        }
    },
    methods: {
        userCheck () {
            let self = this;
            let nosame = self.data1.every( value => value.username !== self.m1_username);
            if ( self.m1_username !== '' && nosame) {
                self.usercheck = true;
            } else {
                self.usercheck = false;
            }
            if (self.usercheck) {
                self.loading = false;
            } else {
                self.loading = true;
            }
        },
        addUser () {
            let self = this;            
            if ( self.usercheck ) { 
                let data = {};
                data['username'] = self.m1_username;
                data['password'] = CryptoJS.MD5(self.m1_password).toString();
                data['roles'] = self.m1_roles;
                data['gentime'] = self.$moment().format("YYYY-MM-DD HH:mm:ss");

                self.saveUsers(data, 'insert');
                self.data1.push(data);

                self.m1_username = '';
                self.m1_password = '';
                self.m1_roles = [];
                self.usercheck = false;
                self.loading = false;
            } else {
                self.loading = true;
            }
        },
        addCancel () {
            let self = this;
            self.m1_username = '';
            self.m1_password = '';
            self.m1_roles = [];
        },
        updateUser () {
            let self = this;
            let data = {};
            data['username'] = self.m2_username;
            if ( self.isM2change ) {
                data['password'] = CryptoJS.MD5(self.m2_password).toString();
                self.isM2change = false;
            } else {
                data['password'] = self.oldPassword;
            }
            data['roles'] = self.m2_roles;

            self.saveUsers(data, 'update');

            let newData = Array();
            self.data1.forEach( value => {
                if (value.username === data['username']) {
                    value.password = data['password'];
                    value.roles = data['roles'];
                    newData.push(value);
                } else {
                    newData.push(value);
                }
            });
            self.data1 = newData;

            self.m2_username = '';
            self.m2_password = '';
            self.m2_roles = [];
        },
        updateCancel () {
            let self = this;
            self.m2_username = '';
            self.m2_password = '';
            self.m2_roles = [];
        },
        delUser () {
            let self = this;
            let data = {};
            data['username'] = self.m2_username;
            self.saveUsers(data, 'delete');
            self.data1 = self.data1.filter( value => value.username !== data['username']);
        },
        saveUsers (data, method) {
            var self = this;
            var params = new Object();
            params['data']= JSON.stringify(data);
            params['method'] = method;
            self.$http.post('/user/save', params).then(
                response => {
                    return response.status;
                },
                response => {
                    return response.status;
                }
            );
        },
        getUsers () {
            var self = this;
            self.data1 = [];
            let params = new Object();
            params['user'] = 'all';
            self.$http.post('/user/info', params).then(
                response => {
                    var value = response.body;
                    self.data1 = value.data;
                },
                response => {
                    return response.status;
                }
            );
        },
        getSelKey (selection, row) {
            let self = this;
            self.m2_username = row.username;
            self.m2_password = self.hidePass(row.password);
            self.oldPassword = row.password;
            self.m2_roles = row.roles;
        },
        hidePass (value) {
            let self = this;
            let b64enc = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
            let len = b64enc.length;
            let start = b64enc.slice(0,2);
            let end = b64enc.slice(len-3, len-1);
            return start + "****" + end;
        },
        m2Change () {
            this.isM2change = true;
        }
    },
    mounted () {
        var self = this; 
        self.getUsers();
        self.$store.dispatch('SetRoleslist').then(
            response => {
                let roles = this.$store.getters.roleslist;
                let data = [];
                roles.forEach( value => {
                    let obj = new Object();
                    obj['value'] = value.name;
                    obj['label'] = value.name;
                    data.push(obj);
                });
                self.roleslist = data;
            }
        );        
    }

}
</script>
<style scope>

</style>
