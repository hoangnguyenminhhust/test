<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>CHI TIẾT ĐƠN HÀNG</h1>
      <div class="top-right-button-container">
        <b-button
          variant="danger"
          size="lg"
          class="top-right-button"
          @click="save()"
          >Cập nhật</b-button
        >
        <b-button
          to="/app/management/order"
          variant="success"
          size="lg"
          class="top-right-button"
          >Quay lại</b-button
        >
      </div>
      <piaf-breadcrumb />
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
export default {
  components: {},
  props: [
    'onSubmit',
    'order'
  ],
  data() {
    return {
    };
  },
  methods: {
    async save() {
      const result = this.onSubmit();
      if (result) {
        try {
        await this.$store.dispatch('updateOrder', this.order);
        this.$swal.fire({
          icon: 'success',
          title: 'Thông báo',
          text: 'Cập nhật thành công'
        })
      } catch (error) {
        if (error) {
          this.$swal.fire({
            icon: 'error',
            title: 'Thông báo',
            text: 'Có lỗi xảy ra vui lòng thử lại'
          })
        }
      }
      }
    },
  },
};
</script>
