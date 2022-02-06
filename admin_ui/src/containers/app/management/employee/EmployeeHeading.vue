<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
              v-b-modal.modalright
              variant="primary"
              size="lg"
              class="top-right-button"
            >Thêm mới</b-button>
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
        <add-new-employee-modal :skip="currentPage" :limit="perPage" />
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          {{ $t('pages.display-options') }}
          <i class="simple-icon-arrow-down align-middle" />
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <div class="d-block d-md-inline-block pt-1">
            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input placeholder="Tìm kiếm..." v-model="text" @keyup.enter="handlerPageClick(text)" />
            </div>
          </div>
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>
            <b-dropdown
              id="ddown2"
              right
              :text="`${perPage}`"
              variant="outline-dark"
              class="d-inline-block"
              size="xs"
            >
              <b-dropdown-item
                v-for="(size,index) in pageSizes"
                :key="index"
                @click="changePageSize(size)"
              >{{ size }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-collapse>
      </div>
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
import { mapActions } from 'vuex';
import AddNewEmployeeModal from './AddNewEmployeeModal';

export default {

  props: [
    "title",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "changePageSize",
    "searchChange",
    "total",
    "perPage",
    "currentPage",
    "handlerPageClick",
  ],
  components: {
    'add-new-employee-modal': AddNewEmployeeModal,
  },
  computed: {
    from () {
      return (this.currentPage - 1) * this.perPage + 1;
    },

    to () {
      return (this.currentPage - 1) * this.perPage + this.perPage;
    }
  },
  data() {
    return {
      text: "",
      pageSizes: [5, 10]
    };
  },
  watch: {
    text: async function(val) {
      if (!val) await this.getAllEmployee({ skip: this.currentPage, limit: this.perPage});
    }
  },
  methods: {
    ...mapActions(["searchUser", "getAllEmployee"]),
    // async searchUserHander() {
    //   try {
    //     await this.searchUser({ text: this.text, skip: this.currentPage, limmit: this.perPage });
    //   } catch (error) {
    //     alert(error);
    //   }
    // },
  }
};
</script>
