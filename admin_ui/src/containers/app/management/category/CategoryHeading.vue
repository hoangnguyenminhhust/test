<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
          variant="primary"
          size="lg"
          v-b-modal.addGroupCategoryModal
          class="top-right-button"
          >Thêm nhóm danh mục</b-button
        >
        <b-button
          variant="primary"
          size="lg"
          v-b-modal.addCategoryModal
          class="top-right-button"
          >Thêm danh mục</b-button
        >
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2" />
      <div class="separator mb-5" />
    </b-colxx>
    <b-modal id="addGroupCategoryModal" title="Thêm nhóm danh mục">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmitGroup"
      >
        <b-form-group id="namefield" label="Tên" label-cols="1">
          <b-form-input
            id="input-1"
            v-model="$v.categoryGroup.name.$model"
            :state="!$v.categoryGroup.name.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Tên không được để trống
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="levelfield" label="Cấp" label-cols="1">
          <b-form-input
            id="input-2"
            v-model="$v.categoryGroup.level.$model"
            :state="!$v.categoryGroup.level.$error"
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
          @click="onSubmitGroup()"
          class="mr-1"
          >Thêm</b-button
        >
        <b-button variant="secondary" @click="closeGroup()">Huỷ</b-button>
      </template>
    </b-modal>
    <b-modal id="addCategoryModal" title="Thêm nhóm danh mục">
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
        <b-form-group id="levelfield" label="Nhóm" label-cols="1">
          <b-form-select
            :options="categoriesGroup"
            v-model="$v.category.parent.$model"
            :state="!$v.category.parent.$error"
            plain
          />
          <b-form-invalid-feedback
            >Danh mục không được để trống</b-form-invalid-feedback
          >
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
      categoriesGroup: [],
      categoryGroup: {
        name: "",
        level: "",
      },
      category: {
        name: "",
        parent: "",
      },
    };
  },
  validations: {
    categoryGroup: {
      name: {
        required,
      },
      level: {
        required,
        numeric,
      },
    },
    category: {
      name: {
        required,
      },
      parent: {
        required,
      },
    },
  },
  components: {},
  methods: {
    ...mapActions(["addCategory", "getAllCategory"]), // Action api
    async onSubmitGroup() {
      this.$v.categoryGroup.$touch();
      if (this.$v.categoryGroup.$anyError) return;

      try {
        await this.addCategory(this.categoryGroup); // Action api
        this.$bvModal.hide("addGroupCategoryModal");
        this.categoryGroup = {
          name: "",
          level: "",
        };
        await this.getAllCategory();
        this.$v.categoryGroup.$reset();
      } catch (error) {
        alert(error);
      }
    },
    closeGroup() {
      this.$bvModal.hide("addGroupCategoryModal");
      this.$v.categoryGroup.$reset();
      this.categoryGroup = {
        name: "",
        level: "",
      };
    },
    async onSubmit() {
      this.$v.category.$touch();
      if (this.$v.category.$anyError) return;

      try {
        await this.addCategory(this.category); // Action api
        this.$bvModal.hide("addCategoryModal");
        this.category = {
          name: "",
          parent: "",
        };
        await this.getAllCategory();
        this.$v.category.$reset();
      } catch (error) {
        alert(error);
      }
    },
    close() {
      this.$bvModal.hide("addCategoryModal");
      this.$v.category.$reset();
      this.category = {
        name: "",
        parent: "",
      };
    },
  },
};
</script>
