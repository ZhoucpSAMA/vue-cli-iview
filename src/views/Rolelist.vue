/* eslint-disable radix */
<template>
    <div style="padding: 10px">
        <div style="background: #fff; border-radius: 8px; padding: 20px;">
            <div class="query-c">
                <!-- 查询：
                <Input search placeholder="请输入查询内容" style="width: auto" /> -->
                 <Button type="info" style="width: auto">添加角色</Button>
            </div>
            <br>
            <!-- <Table max-height="670" border stripe :columns="columns1" :data="data1"></Table> -->

            <Table :columns="columns" :data="roleList">
    <template slot-scope="{ row, index }" slot="id">
      <Input type="text" v-model="editId" v-if="editIndex === index" readonly />
      <span v-else>{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="roleName">
      <Input type="text" v-model="editRoleName" v-if="editIndex === index" />
      <span v-else>{{ row.roleName }}</span>
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
        <Button @click="deleteRole(row)" type="error">删除</Button>
      </div>
    </template>
  </Table>
            <br>
            <Page :total="pageInfo.total" @on-change="pageChange" :current="pageNum"/>
        </div>
    </div>
</template>

<script>
import { getRoleList, deleteRoleByID, updateRole } from '../api/index'

export default {
    name: 'rolelist',
    data() {
        return {
            columns: [
                {
                    title: '角色ID',
                    slot: 'id',
                },
                {
                    title: '角色名',
                    slot: 'roleName',
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
            roleList: [],
            pageNum: 1,
            pageSize: 10,
            pageInfo: {},
            editIndex: -1, // 当前聚焦的输入框的行数
            // editId: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            editRoleName: '', // 第二列输入框
            editRole: '', // 第三列输入框
            // editGmtCreate: '', // 第四列输入框
        }
    },
    created() {
        this.getList()
    },
    methods: {
        pageChange(curPage) {
            getRoleList(curPage, this.pageSize).then(res => {
                this.roleList = res.list
                this.pageInfo = res
            })
        },
        getList() {
            getRoleList(this.pageNum, this.pageSize).then(res => {
                console.log(res)
                this.roleList = res.list
                this.pageInfo = res
            })
        },
        deleteRole(row) {
            deleteRoleByID(row.id).then(res => {
                this.$Message.success(res.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
        },
        handleEdit(row, index) {
            this.editId = row.id
            this.editRoleName = row.roleName
            this.editGmtCreate = row.gmtCreate
            this.editIndex = index
        },
        handleSave() {
            updateRole(this.editId, this.editRoleName).then(res => {
                this.$Message.success(res.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
        },
    },
}
</script>