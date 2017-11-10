<template>
<div class='page404'>
    <Row>
        <Col span="24" offset="10">
            <p class="errorImg"><Icon type="heart-broken" size="100" color="red"></Icon></p>
            <p class='errorCode'>404</p>
            <p class='errorMsg'>您访问的页面不存在...</p>
            <p class='errorLink'>
                <Icon type="ios-home"></Icon>
                <router-link to="/">回到主页</router-link>
            </p>
        </Col>
    </Row>
</div>
</template>

<script>
export default {

}
</script>
<style scoped>
.page404 {
    margin-top: 80px;
}

.errorImg {
    padding-left: 70px;
}

.errorCode {
    font-size: 72px;
    font-family: Algerian, Jokerman, "Indie Flower", "Colonna MT", Ravie,Arial,sans-serif;  
    color: red;
    padding-left: 50px;
}

.errorMsg {
    font-size: 24px;
}

.errorLink {
    padding-left: 75px;
    margin-top: 30px;
}
</style>
