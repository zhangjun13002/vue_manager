<template>
<div class="navmenu">
    <Menu mode="horizontal" theme="dark" active-name="datainfo" @on-select="menuSelect">
        <template v-for="item in navMenu">
            <router-link :to="item.path">
                <MenuItem :name="item.name">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span> {{ item.title }} </span>
                </MenuItem>
            </router-link>
        </template>
    </Menu>
</div>
</template>

<script>
export default {
    data () {
        return {
            iconSize: 16,
            navMenu: [],
        }
    },
    created () {
        var self = this;
        self.navMenu = self.$store.getters.addRouters;
    },
    methods: {
        menuSelect (value) {
            this.$store.dispatch('SetNavname', value);
            this.$store.dispatch('ChangeSideRouters');
        }
    }

}
</script>

<style scoped>
.navmenu .ivu-menu-horizontal {
    height: 45px;
    line-height: 45px;
}

.navmenu .ivu-menu-horizontal .ivu-menu-item {
    float: right;
}
</style>