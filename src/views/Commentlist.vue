/* eslint-disable radix */
<template>
    <div style="padding: 10px">
        <div style="background: #fff; border-radius: 8px; padding: 20px;">
            <!-- <div class="query-c">
                查询：
                <Input search placeholder="请输入查询内容" style="width: auto" />
            </div> -->
            <br>
            <!-- <Table max-height="670" border stripe :columns="columns1" :data="data1"></Table> -->

            <Table :columns="columns" :data="commentList">
    <template slot-scope="{ row, index }" slot="id">
      <Input type="text" v-model="editId" v-if="editIndex === index" readonly />
      <span v-else>{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="content">
      <Input type="text" v-model="editContent" v-if="editIndex === index" />
      <span v-else>{{ row.content }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="username">
      <Input type="text" v-model="editUsername" v-if="editIndex === index" />
      <span v-else>{{ row.username }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gmtCreate">
      <Input type="date" v-model="editGmtCreate" v-if="editIndex === index" readonly />
      <span v-else>{{ row.gmtCreate }}</span>
    </template>

    <template slot-scope="{ row }" slot="action">
      <div>
        <Button @click="deleteComment(row)" type="error">删除</Button>
      </div>
    </template>
  </Table>
            <br>
            <Page :total="pageInfo.total" @on-change="pageChange" :current="pageNum"/>
        </div>
    </div>
</template>

<script>
import { getCommentList, deleteCommentByID } from '../api/index'

export default {
    name: 'commentlist',
    data() {
        return {
            columns: [
                {
                    title: '评论ID',
                    slot: 'id',
                },
                {
                    title: '评论内容',
                    slot: 'content',
                },
                {
                    title: '用户名',
                    slot: 'username',
                },
                {
                    title: '创建时间',
                    slot: 'gmtCreate',
                },
                {
                    title: '操作',
                    slot: 'action',
                },
            ],
            commentList: [],
            pageNum: 1,
            pageSize: 10,
            pageInfo: {},
            editIndex: -1, // 当前聚焦的输入框的行数
            // editId: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            editContent: '', // 第二列输入框
            editUsername: '', // 第三列输入框
            // editGmtCreate: '', // 第四列输入框
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // async getRole(id) {
        //     const result = await getRoleByID(id)
        //     console.log(result)
        //     return result.role.roleName
        // },
        // eslint-disable-next-line no-unused-vars
        pageChange(curPage) {
            getCommentList(curPage, this.pageSize).then(res => {
                this.commentList = res.list
                this.pageInfo = res
            })
        },
        getList() {
            getCommentList(this.pageNum, this.pageSize).then(res => {
                console.log(res)
                this.commentList = res.list
                this.pageInfo = res
            })
        },
        deleteComment(row) {
            deleteCommentByID(row.id).then(res => {
                this.$Message.success(res.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
        },
    },
}
</script>