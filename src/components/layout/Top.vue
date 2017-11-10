<template>
    <div class='layout-top'>
        <Row> 
            <Col span=4>   
                <img src="../../assets/logo.png" height='32' alt='logo' />
            </Col>
            <Col span=6 offset=12>
                <Input v-model="value" placeholder="请输入..." style="width:200px"></Input>
                <Button type="primary" shape="circle" icon="ios-search"></Button>                       
            </Col>
            <Col span=2>
                <Dropdown @on-click='onclick'>
                    <span>欢迎： </span>
                    <a href="javascript:void(0)">
                        {{ user }}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name='setting'>设置</DropdownItem>
                        <DropdownItem name='logout'>退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            user: ''
        }
    },
    methods: {
        onclick: function (event) {
            var self = this;
            if (event === 'logout') {
                self.$store.dispatch('Logout').then(() => {
                    self.$Message.success('退出成功');
                    self.$router.push({path: '/login'});
                });    
            }
            if (event === 'setting') {
                self.$Message.info('用户设置');
            }     
        }
    },
    created () {
        var self = this;
        self.user = self.$store.getters.user;
    }

}
</script>

<style scoped>

</style>
