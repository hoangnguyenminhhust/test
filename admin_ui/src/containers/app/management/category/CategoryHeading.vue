<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
          variant="primary"
          size="lg"
          v-b-modal.addCategoryModal
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
    <b-modal id="addCategoryModal" title="Thêm danh mục">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmit"
      >
        <b-form-group id="namefield" label="Tên" label-cols="1">
          <b-form-input
            id="input-1"
            v-model="$v.category.name.$model"
            :state="!$v.category.name.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Tên không được để trống
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="levelfield" label="Cấp" label-cols="1">
          <b-form-input
            id="input-2"
            v-model="$v.category.level.$model"
            :state="!$v.category.level.$error"
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
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  props: [
    "title",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "changePageSize",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage",
  ],
  data() {
    return {
      category: {
        name: "",
        level: "",
      },
    };
  },
  validations: {
    category: {
      name: {
        required,
      },
      level: {
        required,
        numeric,
      },
    },
  },
  components: {},
  methods: {
    ...mapActions(["addCategory", "getAllCategory"]),
    async onSubmit() {
      this.$v.category.$touch();
      if (this.$v.category.$anyError) return;

      try {
        await this.addCategory(this.category);
        this.$bvModal.hide("addCategoryModal");
        this.category = {
          name: "",
          level: "",
        };
        await this.getAllCategory();
        this.$v.category.$reset()
      } catch (error) {
        alert(error);
      }
    },
    close() {
      this.$bvModal.hide("addCategoryModal");
      this.$v.category.$reset()
      this.category = {
        name: "",
        level: "",
      };
    },
  },
};
</script>
