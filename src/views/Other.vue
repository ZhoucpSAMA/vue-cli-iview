<template>
  <div class="page">
      <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">

                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon  type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <div :style="{margin: '20px 0'}">

                </div>
                <Card>
                    <div style="min-height: 200px;">
                        <Row>
                            <Col span="8">
                                <Input v-model="matrix" autofocus :rows="8"
                                type="textarea"
                                placeholder="输入矩阵，以空格隔开" />
                            </Col>
                            <Col span="7" offset="1" >
                                <Select v-model="algoID" style="width:200px">
                                    <Option v-for="item in algoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                &nbsp;
                                <Button type="primary">Calculate</Button>
                                <Button @click="clearMatrix">Clear</Button>
                            </Col>
                            <Col span="8">
                                <Input v-model="result" readonly :rows="8" type="textarea"  placeholder="此处显示结果" />
                            </Col>
                        </Row>
                        <Divider>讨论区</Divider>
                        <Row v-show="isShowEditor">
                            <Col span="14" offset="5" >
                                <div id="wang">
                                    <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
                                </div>
                                <br>
                                <Row type="flex" justify="end" class="code-row-bg">
                                    <Col >
                                        <Button type="primary">Submit</Button>
                                    </Col>
                                    <Col>
                                         <Button @click="clearContent">Clear</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>

  </div>
</template>

<script>
import E from 'wangeditor'

export default {
    name: 'other',
    data() {
        return {
            algoList: [
                {
                    value: '',
                    label: '',
                },
            ],
            algoID: '',
            isShowEditor: true,
            matrix: '',
            result: '',

        }
    },
    created() {
        this.getAlgoList()
    },
    methods: {
        getAlgoList() {
            this.axios.get('http://localhost:8081/algo/getAlgoList')
            .then(res => {
                this.algoList = res.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        clearMatrix() {
            this.matrix = ''
            this.result = ''
        },
        clearContent() {
            this.editor.txt.clear()
        },

    },
    mounted() {
        const editor = new E('#wang')

        // 去掉不需要的菜单
        editor.config.excludeMenus = [
            'image',
            'video',
            'todo',
            'undo',
            'redo',
            'indent',
        ]
        editor.create()
    },
    beforeDestroy() {
    // 销毁编辑器
        this.editor.destroy()
        this.editor = null
    },
    components: {

    },
}
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
