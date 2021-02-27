<template>
    <div class="home-container">
        <div class="home-content">
            <Button @click="getUserData">axios 测试</Button>

            <Input :rows="30" style="margin-top: 20px" v-model="userInfo" type="textarea" />
        </div>
    </div>
</template>

<script>
import { axiosTest } from '../api/index'

export default {
    name: 'home',
    data() {
        return {
            userInfo: '',
        }
    },
    methods: {
        getUserData() {
            axiosTest().then(res => {
                this.userInfo = res
            })
        },
    },
}
</script>

<style scoped>
.home-container {
    padding: 10px;
    padding-top: 5px;
}
.home-content {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
</style>