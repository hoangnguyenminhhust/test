<template>
  <b-modal
    id="modaleditright"
    ref="modaleditright"
    title="Cập nhật thông tin"
    no-close-on-backdrop
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group label="Họ">
        <b-form-input v-model="employeeProp.first_name" />
      </b-form-group>
      <b-form-group label="Tên">
        <b-form-input v-model="employeeProp.last_name" />
      </b-form-group>
      <b-form-group label="Giới tính">
        <b-form-radio v-model="employeeProp.gender" name="some-radios" value="male">Nam</b-form-radio>
        <b-form-radio v-model="employeeProp.gender" name="some-radios" value="female">Nữ</b-form-radio>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input v-model="employeeProp.email" />
      </b-form-group>
      <b-form-group label="Số điện thoại">
        <b-form-input v-model="employeeProp.phone" />
      </b-form-group>
      <b-form-group label="Địa chỉ">
        <b-form-input v-model="employeeProp.address" />
      </b-form-group>
    </b-form>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="close">Huỷ</b-button>
      <b-button variant="primary" :disabled="checkStatus" @click="editItem()" class="mr-1">Lưu</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";

const EditEmployeeModal = {
  components: {
    "v-select": vSelect
  },
  props: ["employeeProp", "skip", "limit"],
  data() {
    return {
      // employee: this.employeeProp
    };
  },
  computed: {
    employee() {
      return this.employeeProp
    },
    checkStatus() {
      return (!this.employee.first_name || this.employee.first_name === "")
      || (!this.employee.last_name || this.employee.last_name === "")
      || (!this.employee.email || this.employee.email === "")
      || (!this.employee.phone  || this.employee.phone  === "")
      || (!this.employee.address  || this.employee.address === "")
      || (!this.employee.gender || this.employee.gender === "");
    }
  },
  methods: {
    ...mapActions(["updateUser", "getAllEmployee"]),
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    async editItem() {
      await this.updateUser(this.employeeProp)
      // this.addTodoItem({
      //   title: this.newItem.first_name,
      //   detail: this.newItem.last_name,
      //   category: this.newItem.email,
      //   label: this.newItem.label.value,
      //   status: this.newItem.status,
      //   date:
      //     date.getDay() + "." + date.getMonth() + 1 + "." + date.getFullYear(),
      //   labelColor: this.newItem.label.color
      // });
      this.hideModal("modaleditright");
    },
    async close() {
      this.hideModal("modaleditright");
      console.log(this.skip);
      await this.getAllEmployee({ skip: this.skip, limit: this.limit});
    }
  }
};
export default EditEmployeeModal;
</script>
