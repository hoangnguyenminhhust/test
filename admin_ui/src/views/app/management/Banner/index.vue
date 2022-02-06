<template>
  <div>
    <heading :title="$t('menu.banner')"></heading>
    <b-row>
      <b-table bordered hover :items="banners" :fields="fields">
        <template #cell(key)="row">
          <b-img v-bind="mainProps" :src="vueS3URL + row.item.key"></b-img>
        </template>
        <template #cell(actions)="row">
          <div style="display: flex; justify-content: center">
            <div>
              <b-button
                size="sm"
                class="mr-1"
                variant="primary"
                @click="editBanner(row.item)"
              >
                Cập nhật
              </b-button>
              <b-button
                size="sm"
                variant="danger"
                @click="deleteBanner(row.item)"
              >
                Xoá
              </b-button>
            </div>
          </div>
        </template>
      </b-table>
    </b-row>
    <b-modal id="editBannerModal" title="Thêm Banner">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmit"
      >
        <div style="display: flex; justify-content: center">
          <b-img
            :src="objectImage(this.file)"
            fluid
            alt="Fluid image"
            style="margin: 10px 0px"
          ></b-img>
        </div>
        <b-form-group id="namefield" label="Banner" label-cols="2">
          <b-form-file
            id="input-1"
            v-model="file"
            placeholder="Chọn ảnh..."
            browse-text="Tệp"
          ></b-form-file>
          <b-form-invalid-feedback
            >Tên không được để trống
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="levelfield" label="Cấp" label-cols="2">
          <b-form-input
            id="input-2"
            v-model="$v.banner.level.$model"
            :state="!$v.banner.level.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Cấp không được để trống và phải là sô
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button
          variant="primary"
          type="submit"
          :disabled="!this.file"
          @click="onSubmit()"
          class="mr-1"
          >Cập nhật</b-button
        >
        <b-button variant="secondary" @click="close()">Huỷ</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Heading from "../../../../containers/app/management/banner/BannerHeading";
import { vueS3URL } from "../../../../constants/config";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  components: {
    heading: Heading
  },
  computed: {
    banners() {
      return this.$store.state.banner.banners;
    }
  },
  mixins: [validationMixin],
  data: () => ({
    fields: [
      { key: "key", label: "Ảnh" },
      { key: "level", label: "Cấp" },
      {
        key: "actions",
        label: "Thao tác",
        thClass: "text-center",
        tdClass: "actionClass"
      }
    ],
    file: null,
    mainProps: { width: 100, height: 50, class: "m1" },
    vueS3URL: vueS3URL,
    defaultImage: vueS3URL + "6061da5fe0888fc85289a691/noimage.png",
    banner: {
      key: "",
      level: 0
    }
  }),
  validations: {
    banner: {
      key: {
        required
      },
      level: {
        required,
        numeric
      }
    },
    file: {
      required
    }
  },
  methods: {
    objectImage(file) {
      if (file) {
        return URL.createObjectURL(file);
      } else {
        return this.vueS3URL + this.banner.key;
      }
    },
    async editBanner(banner) {
      this.$bvModal.show("editBannerModal");
      this.banner = banner;
    },
    async onSubmit() {
      try {
        await this.$store.dispatch("deleteImage", { key: this.banner.key });
        const key = await this.$store.dispatch("uploadFile", {
          file: this.file
        });
        await this.$store.dispatch("updateBanner", {
          _id: this.banner._id,
          key: key
        });
        this.banner = {
          key: "",
          level: 0
        };
        this.file = null;
        await this.$store.dispatch("listBanner");
        this.$swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Cập nhật thành công"
        });
        this.$bvModal.hide("editBannerModal");
      } catch (error) {
        console.log(error);
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra"
        });
      }
    },
    async deleteBanner(banner) {
      try {
        const result = await this.$swal.fire({
          title: "Bạn có chắc muốn xoá bản ghi này?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Huỷ"
        });

        if (!result.isConfirmed) return;
        await this.$store.dispatch('deleteImage', { key: banner.key });
        await this.$store.dispatch("deleteBanner", { _id: banner._id });
        await this.$store.dispatch("listBanner");
        this.$swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Xoá thành công"
        });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra"
        });
      }
    },
    close() {
      this.$bvModal.hide("editBannerModal");
      this.banner = {
        key: "",
        level: 0,
      }
    }
  },
  async created() {
    await this.$store.dispatch("listBanner");
  }
};
</script>
