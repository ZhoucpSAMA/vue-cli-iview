import qs from 'qs'
import request from '@/utils/request'

export function axiosTest() {
    return request.get('http://localhost:8081/user/test')
}
export function getUserList(pageNum, pageSize) {
    return request.get('http://localhost:8081/user/getUserList?pageNum=' + pageNum + '&pageSize=' + pageSize)
}
export function deleteUserByID(id) {
    return request.get('http://localhost:8081/user/deleteUserByID?id=' + id)
}
export function updateUser(id, username) {
    return request.get('http://localhost:8081/user/updateUserByID?id=' + id + '&username=' + username)
}

export function getCommentList(pageNum, pageSize) {
    return request.get('http://localhost:8081/comment/getCommentList?pageNum=' + pageNum + '&pageSize=' + pageSize)
}
export function deleteCommentByID(id) {
    return request.get('http://localhost:8081/comment/deleteComment?id=' + id)
}

export function getRoleList(pageNum, pageSize) {
    return request.get('http://localhost:8081/role/getRoleList/' + pageNum + '/' + pageSize)
}
export function updateRole(id, roleName) {
    request.post('http://localhost:8081/role/updateRole', qs.stringify({
        id,
        roleName,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}
export function deleteRoleByID(id) {
    return request.get('http://localhost:8081/role/deleteRoleByID/' + id)
}
export function queryRoleList() {
    return request.get('http://localhost:8081/role/queryRoleList')
}
export function updateUserRole(userId, roleId) {
    return request.get('http://localhost:8081/userRole/updateUserRole?userId=' + userId + '&roleId=' + roleId)
}