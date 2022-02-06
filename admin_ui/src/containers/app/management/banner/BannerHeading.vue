<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>Quảng cáo</h1>
      <div class="top-right-button-container">
        <b-button
          variant="primary"
          size="lg"
          v-b-modal.addBannerModal
          class="top-right-button"
          >Thêm mới</b-button
        >
        <!-- <b-button-group>
          <b-dropdown right @click="selectAll(true)" variant="primary">
            <label
              class="custom-control custom-checkbox pl-4 mb-0 d-inline-block"
              slot="button-content"
            >
              <input
                class="custom-control-input"
                type="checkbox"
                :checked="isSelectedAll"
                v-shortkey="{select: ['ctrl','a'], undo: ['ctrl','d']}"
                @shortkey="keymap"
              />
              <span
                :class="{
                'custom-control-label' :true,
                'indeterminate' : isAnyItemSelected
                }"
              >&nbsp;</span>
            </label>
            <b-dropdown-item>delete</b-dropdown-item>
            <b-dropdown-item>edit</b-dropdown-item>
          </b-dropdown>
        </b-button-group> -->
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2" />
      <div class="separator mb-5" />
    </b-colxx>
    <b-modal id="addBannerModal" title="Thêm Banner">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmit"
      >
      <div style="display: flex; justify-content: center">
        <b-img
          :src="
            objectImage(file)
              ? objectImage(file)
              : defaultImage
          "
          fluid
          alt="Fluid image"
        ></b-img>
        </div>
        <b-form-group id="namefield" label="Banner" label-cols="2">
          <b-form-file
            id="input-1"
            v-model="$v.file.$model"
            :state="!$v.file.$error"
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
          :disabled="checkAddBanner"
          @click="onSubmit()"
          class="mr-1"
          >Thêm</b-button
        >
        <b-button variant="secondary" @click="close()">Huỷ</b-button>
      </template>
    </b-modal>
  </b-row>
</template>
<script>
import { vueS3URL } from "../../../../constants/config";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  props: [],
  data() {
    return {
      banner: {
        key: "",
        level: ""
      },
      file: null,
      defaultImage: vueS3URL + "6061da5fe0888fc85289a691/noimage.png"
    };
  },
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
      required,
    }
  },
  components: {},
  computed: {
    checkAddBanner() {
      return !this.file || !this.banner.level
    }
  },
  methods: {
    ...mapActions(["createBanner", "listBanner", "uploadFile"]),
    async onSubmit() {
      try {
        const key = await this.uploadFile({ file: this.file })
        this.banner.key = key;
        await this.createBanner(this.banner);
        this.$bvModal.hide("addBannerModal");
        this.banner = {
          name: "",
          level: ""
        };
        await this.listBanner();
        this.$v.banner.$reset();
      } catch (error) {
        alert(error);
      }
    },
    close() {
      this.$bvModal.hide("addBannerModal");
      this.$v.banner.$reset();
      this.banner = {
        name: "",
        level: ""
      };
    },
    objectImage(file) {
      if (file) {
        return URL.createObjectURL(file);
      } else {
        return "";
      }
    },
  }
};
</script>
