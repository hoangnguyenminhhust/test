<template>
  <b-modal
    id="modalright"
    ref="modalright"
    title="Thêm nhân viên"
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group label="Họ">
        <b-form-input v-model="newEmployee.first_name" />
      </b-form-group>
      <b-form-group label="Tên">
        <b-form-input v-model="newEmployee.last_name" />
      </b-form-group>
      <b-form-group label="Giới tính">
        <b-form-radio v-model="newEmployee.gender" name="some-radios" value="male">Nam</b-form-radio>
        <b-form-radio v-model="newEmployee.gender" name="some-radios" value="female">Nữ</b-form-radio>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input v-model="newEmployee.email" />
      </b-form-group>
      <b-form-group label="Số điện thoại">
        <b-form-input v-model="newEmployee.phone" />
      </b-form-group>
      <b-form-group label="Địa chỉ">
        <b-form-input v-model="newEmployee.address" />
      </b-form-group>
    </b-form>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="close()">Huỷ</b-button>
      <b-button variant="primary" :disabled="checkAdd" @click="addItem()" class="mr-1">Thêm</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapMutations, mapActions } from "vuex";

const AddNewEmployeeModal = {
  components: {
    "v-select": vSelect
  },
  props: ["categories", "labels", "statuses", "skip", "limit"],
  data() {
    return {
      newEmployee: { first_name: "", last_name: "", email: "", phone: "", address: "", gender: "", role: "employee" }
    };
  },
  computed: {
    checkAdd() {
      return !this.newEmployee.first_name 
      || !this.newEmployee.last_name 
      || !this.newEmployee.email 
      || !this.newEmployee.phone 
      || !this.newEmployee.address 
      || !this.newEmployee.gender;
    }
  },
  methods: {
    ...mapActions(["addEmployee", "getAllEmployee"]),
    ...mapMutations(["addTodoItem"]),
    async close() {
      this.$bvModal.hide('modalright');
      await this.getAllEmployee({ skip: this.skip, limit: this.limit });
    },
    async addItem() {
      await this.addEmployee(this.newEmployee);
      await this.getAllEmployee({ skip: this.skip, limit: this.limit });
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
      this.newEmployee = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
      };
      this.$bvModal.hide('modalright');
    }
  }
};
export default AddNewEmployeeModal;
</script>
