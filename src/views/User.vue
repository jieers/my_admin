<template>
  <div class="manage">
    <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync="isShow"
    >
      <compForm :form-label="operateFormLabel" :form="operateForm" :inline="true" ref="form"></compForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <compForm :form-label="formLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </compForm>
    </div>
    <compTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList"
        @edit="editUser"
        @del="delUser"
    ></compTable>
  </div>
</template>

<script>
import compForm from "@/components/compForm";
import compTable from "@/components/compTable";
import {getUser} from "../../api/data";

export default {
  name: "User",
  components: {
    compForm,
    compTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        },

      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    confirm() {
      if(this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()

        })
      }
    },
    addUser() {
      //打开弹窗
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList(name) {
      this.config.loading = true
      // name ? (this.config.page = 1) : ''
      if(name) {
        this.config.page = 1
      }
      getUser({
        page: this.config.page,
        name
      }).then(res => {
        console.log(res,'1')
        this.tableData = res.data.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女": "男"
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm('是否删除此信息','提示',{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        this.$http.get("/user/del", {
          params: {id}
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.manage {
  height: 100%;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>