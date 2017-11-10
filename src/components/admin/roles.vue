<template>
<div>
    <div class="layout-right-header">
        <Breadcrumb>
            <Breadcrumb-item> 系统管理 </Breadcrumb-item>
            <Breadcrumb-item> 角色管理 </Breadcrumb-item>
        </Breadcrumb>
    </div>
    <div class="layout-right-content">
        <div class="content-main">
            <div class="main-title">                
                <h2><Icon type="android-people"></Icon>角色列表</h2>
            </div>
            <div class='split'></div>
            <Row>
                <Col span="24">
                    <Button type="primary" size="small" @click='getRoles'>刷新</Button>
                    <Button type="primary" size="small" @click='modal1 = true'>添加</Button>
                        <Modal
                            title="添加角色"
                            v-model="modal1"
                            :loading = "loading"
                            :mask-closable="false"
                            @on-ok="addRole"
                            @on-cancel="addCancel">
                            <Row>
                              <Col span='2'>
                                ID:
                              </Col>
                              <Col span='22'>
                                <InputNumber v-model="m1_id" :max="100" :min="1" @on-change="idchange"></InputNumber>
                              </Col>
                            </Row>
                            <br>
                            <Row>
                              <Col span='2'>
                                角色: 
                              </Col>
                              <Col span='22'>
                                <Input v-model="m1_role" @on-change="rolechange"></Input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col span='2'>
                                说明: 
                              </Col>
                              <Col span='22'>
                                <Input v-model="m1_desc" type="textarea"></Input>
                              </Col>
                            </Row>
                            <Row>
                                <Col span='22' offset='2'>
                                  {{ msg }}                                  
                                </Col>
                            </Row>
                        </Modal>
                    <Button type="warning" size="small" @click='delRole'>删除</Button>                   
                </Col>
            </Row>
            <br />
            <Row type="flex">
                <Col span='24'>
                    <Table border draggable stripe size='small' highlight-row ref="selection" :columns='columns1' :data='data1' @on-select="getSelKey"></Table>
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
                { title: 'ID', key: 'id', width:40, align: 'center'},
                { title: '角色', key: 'name', align: 'center'},
                { title: '说明', key: 'desc'},
            ],
            modal1: false,
            loading: true,
            m1_id: 0,
            m1_role: '',
            m1_desc: '',
            msg: '',
            idcheck: false,
            rolecheck: false
        }
    },
    methods: { 
        idchange (num) {
            let self = this;
            self.idcheck = self.data1.every( value => value.id !== num);
            if (self.rolecheck && self.idcheck) {
                self.loading = false;
            } else {
                self.loading = true;
            }
        },
        rolechange () {
            let self = this;
            self.rolecheck = self.data1.every( value => value.name !== self.m1_role);
            if (self.rolecheck && self.idcheck) {
                self.loading = false;
            } else {
                self.loading = true;
            }
        },       
        addRole () {
            let self = this;          
            if ( self.rolecheck && self.idcheck) {
                let data = new Object();
                data['id'] =  self.m1_id;
                data['name'] = self.m1_role;
                data['desc'] = self.m1_desc;
                self.saveRoles(data, 'insert');
                self.data1.push(data);

                self.m1_id = 0;
                self.m1_role = '';
                self.m1_desc = '';
                self.idcheck = false;
                self.rolecheck = false;
                self.loading = false;
                self.msg = ""; 
            } else {
                self.msg = "输入不正确";
                self.loading = true;
            };
        },
        addCancel () {
            let self = this;
            self.m1_id = 0;
            self.m1_role = '';
            self.m1_desc = '';
            self.msg = "";
        },
        delRole () {
            let self = this;
            let data = {};
            data['id'] =  self.m1_id; 
            self.saveRoles(data, 'delete');
            self.data1 = self.data1.filter( value => value.id != self.m1_id);
        
            self.m1_id = 0;
            self.m1_role = '';
            self.m1_desc = '';
        },
        saveRoles (data, method) {
            var self = this;
            var params = new Object();
            params['data'] = JSON.stringify(data);
            params['method'] = method;
            self.$http.post('/user/saverole', params).then(
                response => {
                    this.$store.dispatch('SetRoleslist');
                    return response.status;
                },
                response => {
                    return response.status;
                }
            );
        },
        getRoles () {
            this.$store.dispatch('SetRoleslist').then(
                response => {
                    this.data1 = this.$store.getters.roleslist;
                }
            );                     
        },
        getSelKey (selection, row) {
            let self = this;
            self.msg = "";
            self.m1_id = row.id;
            self.m1_role = row.role;
            self.m1_desc = row.desc;                      
        },
    },
    mounted () {
        this.getRoles();
    }

}
</script>
<style scope>

</style>
