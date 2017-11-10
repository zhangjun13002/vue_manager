<template>
<div>
    <Row type='flex'>
        <Col span="24">
            <top-layout></top-layout>
        </Col>
    </Row type='flex'>
    <!-- start: 顶部主导航  -->
    <Row>
        <Col span="24">
            <nav-layout></nav-layout>
        </Col>
    </Row>
    <!-- end  -->
    <Row type='flex'>
        <Col span="24">
            <div :class="{'layout-left-hide':spanLeft < 5}">
                <Row type='flex'>
                    <Col :span='spanLeft' class='layout-left'>
                        <div class="layout-left-header">
                            <router-link to='/'><span class="layout-left-title nav-hide"> Dashboard </span></router-link>
                            <span class="layout-left-toggle">
                                <i-button type="text" @click="toggleClick">
                                    <Icon type="navicon" size="32"></Icon>
                                </i-button>
                            </span>
                        </div>
                        <left-layout :spanValue="spanLeft"></left-layout>
                    </Col>
                    <Col :span="spanRight" class="layout-right" v-bind:style="{height: screenHeight + 'px'}">
                        <right-layout></right-layout>
                        <div class="layout-copy">
                            2017 & copy; zhangjun
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    </Row>
</div>
</template>

<script>
import TopLayout from '@/components/layout/Top.vue'
import NavLayout from '@/components/layout/Nav.vue'    // 顶部主导航
import LeftLayout from '@/components/layout/Left.vue'
import RightLayout from '@/components/layout/Right.vue'

export default {
    components: {
        TopLayout,
        NavLayout,     // 顶部主导航
        LeftLayout,
        RightLayout
    },
    data () {
        return {
            spanLeft: 5,
            spanRight: 19,
            screenHeight: 0,
        }
    },
    created () {
        this.screenHeight = document.documentElement.clientHeight - 60;
    },
    watch: {
        screenHeight () {
            const self = this;
            window.onresize = () => {
                return ( () => {
                     self.screenHeight = document.documentElement.clientHeight - 60;
                })()
            }
        }
    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 1;
                this.spanRight = 23;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layout-top {
    height: 60px;
    padding: 10px;
    background: #fff;

}

.layout-left {
    background: #464c5b;
}

.layout-left-header {
    width: 100%;
    height: 50px;
    padding: 15px;
    background: #464c5b;
}

.layout-left-title {
    color: #e8e8e8;
    font-size: 1.4em;
}

.layout-left-toggle {
    float: right;
    width: 30px;
    margin-top: -10px;
    margin-right: 10px;
}

.layout-left-toggle button {
    color: #2D8CF0;
}

.layout-left-nav {
    width: 100%;
}

.layout-right-header {
    height: 50px;
    padding: 15px;
    background: #f5f7f9;
}

.layout-right-content {
    padding: 1px;
    background: #fff;
}

.content-main {
    min-height: 490px;
    padding: 5px;
    background: #f8f8f8;
    border-radius: 4px;
}

.content-main h2 {
    padding: 5px;
}

.content-main h2 i {
   margin-right: 5px;
}

.content-main .split {
    height: 1px;
    border-top: 2px solid #ddd;
    margin-top: 2px;
    margin-bottom: 15px;
}

.layout-copy {
    height: 50px;
    padding: 15px;
    text-align: center;
    color: #808080;
    background: #f5f7f9;
}

.layout-left-hide .nav-hide {
    display: none;
}

.layout-left-hide .ivu-menu-submenu-title-icon {
    display: none;
}

.space {
    margin-left: 10px;
    margin-right: 10px;
}

.ivu-table-small tbody td {
    height: 32px;
}

.ivu-table .ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
}
.ivu-table-cell .ivu-checkbox-wrapper {
  margin-right: 0px;
}

.ivu-table .span2 {
    border-right: 0;
}

.ivu-table .failed {
    color: #ff0000;
    font-weight: bold;
}

.ivu-upload-list {
    float: right;
}

.ivu-dropdown .ivu-select-dropdown {
    z-index: 999;
}
</style>
