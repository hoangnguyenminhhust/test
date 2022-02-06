<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
          to="/app/management/product/add-new"
          variant="primary"
          size="lg"
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
      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          {{ $t("pages.display-options") }}
          <i class="simple-icon-arrow-down align-middle" />
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <div class="d-block d-md-inline-block pt-1">
            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input
                placeholder="Tìm kiếm..."
                v-model="name"
                @keyup.enter="searchChange(name)"
              />
            </div>
          </div>
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2"
              >{{ from }}-{{ to >= total ? total : to }} of {{ total }}</span
            >
            <b-dropdown
              id="ddown2"
              right
              :text="`${perPage}`"
              variant="outline-dark"
              class="d-inline-block"
              size="xs"
            >
              <b-dropdown-item
                :bootstrap-styling="true"
                v-for="(size, index) in pageSizes"
                :key="index"
                @click="changePageSize(size)"
                >{{ size }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-collapse>
      </div>
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
export default {
  props: [
    "title",
    "changePageSize",
    "searchChange",
    "total",
    "perPage",
    "currentPage",
    "handlerPageClick"
  ],
  components: {},
  data() {
    return {
      pageSizes: [4, 8, 12],
      name: undefined,
    };
  },
  watch: {
    name: async function(val) {
      if (val === '') {
        try {
          await this.$store.dispatch("getAllProduct", {
            skip: this.currentPage,
            limit: this.perPage,
          });
        } catch (error) {
          alert('Có lỗi xảy ra')
        }
      }
    }
  },
  computed: {
    from() {
      return (this.currentPage - 1) * this.perPage + 1;
    },

    to() {
      return (this.currentPage - 1) * this.perPage + this.perPage;
    },
  },
  methods: {}
};
</script>
