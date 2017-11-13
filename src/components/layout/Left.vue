<template>
    <div class="leftmenu">
        <Menu active-name="" theme="dark" width="auto" :open-names="['']">
            <template v-for="item in sideRouters" v-if="!item.hidden">
                <Submenu name='menu'>
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="nav-hide"> {{ item.title }}</span>
                    </template>

                    <template v-for="child in item.children" v-if="!child.hidden">
                        <router-link :to="PathRegex(child.path)"><MenuItem :name="child.name" class="nav-hide"> {{ child.title }} </MenuItem></router-link>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['spanValue'],
    methods: {
        PathRegex: function(value) {
            let reg = this.$pathregex.compile(value);
            return reg({cate: 'a', id:'1'});
        }
    },
    computed: {
        iconSize () {
            return this.spanValue === 5 ? 16 : 22;
        },
        ...mapGetters([
            'sideRouters'
        ])
    }
}
</script>

<style scoped>
.leftmenu .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-top: 8px;
    padding-bottom: 8px;
}

.leftmenu .ivu-menu-vertical .ivu-menu-submenu i {
    margin-left: -10px;
}
</style>