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
        <b-form-input v-model="customerProp.first_name" />
      </b-form-group>
      <b-form-group label="Tên">
        <b-form-input v-model="customerProp.last_name" />
      </b-form-group>
      <b-form-group label="Giới tính">
        <b-form-radio v-model="customerProp.gender" name="some-radios" value="male">Nam</b-form-radio>
        <b-form-radio v-model="customerProp.gender" name="some-radios" value="female">Nữ</b-form-radio>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input v-model="customerProp.email" />
      </b-form-group>
      <b-form-group label="Số điện thoại">
        <b-form-input v-model="customerProp.phone" />
      </b-form-group>
      <b-form-group label="Địa chỉ">
        <b-form-input v-model="customerProp.address" />
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

const EditCustomerModal = {
  components: {
    "v-select": vSelect
  },
  props: ["customerProp", "skip", "limit"],
  data() {
    return {
      // customer: this.customerProp
    };
  },
  computed: {
    customer() {
      return this.customerProp
    },
    checkStatus() {
      return (!this.customer.first_name || this.customer.first_name === "")
      || (!this.customer.last_name || this.customer.last_name === "")
      || (!this.customer.email || this.customer.email === "")
      || (!this.customer.phone  || this.customer.phone  === "")
      || (!this.customer.address  || this.customer.address === "")
      || (!this.customer.gender || this.customer.gender === "");
    }
  },
  methods: {
    ...mapActions(["updateUser", "getAllCustomer"]),
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    async editItem() {
      await this.updateUser(this.customerProp)
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
      await this.getAllCustomer({ skip: this.skip, limit: this.limit});
    }
  }
};
export default EditCustomerModal;
</script>
