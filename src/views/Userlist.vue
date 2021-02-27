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

            <Table :columns="columns" :data="userList">
    <template slot-scope="{ row, index }" slot="id">
      <Input type="text" v-model="editId" v-if="editIndex === index" readonly />
      <span v-else>{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="username">
      <Input type="text" v-model="editUsername" v-if="editIndex === index" />
      <span v-else>{{ row.username }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="role">
      <Select type="text" v-model="editRoleID" v-if="editIndex === index">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span v-else>{{ row.role }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gmtCreate">
      <Input type="date" v-model="editGmtCreate" v-if="editIndex === index" readonly />
      <span v-else>{{ row.gmtCreate }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(row)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)" type="primary">修改</Button>
        <Button @click="deleteUser(row)" type="error">删除</Button>
      </div>
    </template>
  </Table>
            <br>
            <Page :total="pageInfo.total" @on-change="pageChange" :current="pageNum"/>
        </div>
    </div>
</template>

<script>
import { getUserList, deleteUserByID, updateUser, queryRoleList, updateUserRole } from '../api/index'

export default {
    name: 'userlist',
    data() {
        return {
            roleList: [],
            columns: [
                {
                    title: '用户ID',
                    slot: 'id',
                },
                {
                    title: '用户名',
                    slot: 'username',
                },
                {
                    title: '角色',
                    slot: 'role',
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
            userList: [],
            pageNum: 1,
            pageSize: 10,
            pageInfo: {},
            editIndex: -1, // 当前聚焦的输入框的行数
            // editId: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            editUsername: '', // 第二列输入框
            editRoleID: '', // 第三列输入框
            // editGmtCreate: '', // 第四列输入框
        }
    },
    created() {
        this.getList()
        this.getRoleList()
    },
    methods: {
        // async getRole(id) {
        //     const result = await getRoleByID(id)
        //     console.log(result)
        //     return result.role.roleName
        // },
        // eslint-disable-next-line no-unused-vars
        pageChange(curPage) {
            getUserList(curPage, this.pageSize).then(res => {
                this.userList = res.list
                this.pageInfo = res
            })
        },
        getRoleList() {
            queryRoleList().then(res => {
                console.log(res)
                this.roleList = res
            })
        },
        getList() {
            getUserList(this.pageNum, this.pageSize).then(res => {
                console.log(res)
                this.userList = res.list
                this.pageInfo = res
            })
        },
        deleteUser(row) {
            deleteUserByID(row.id).then(res => {
                this.$Message.success(res.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
        },
        handleEdit(row, index) {
            this.editId = row.id
            this.editUsername = row.username
            this.editGmtCreate = row.gmtCreate
            this.editIndex = index
        },
        handleSave() {
            updateUser(this.editId, this.editUsername).then(() => {

            })
            updateUserRole(this.editId, this.editRoleID).then(res => {
                this.$Message.success(res.msg)
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        },
    },
}
</script>