<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
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
        <!-- <add-new-employee-modal :skip="currentPage" :limit="perPage" /> -->
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
            <div class="d-inline-block float-md-left mr-1 align-top">
              <!-- <datepicker
                :language="vi"
                v-model="date"
                placeholder="Chọn ngày..."
                @input="handlerDateValue(date)"
                class="mb-2"
              ></datepicker> -->
              <div style="display:flex; flex-direction: row;">
                <div>
                  <div>
                    <b-form-datepicker
                      style="height: 30px"
                      locale="vi"
                      placeholder="Ngày bắt đầu"
                      v-model="dateRange.startDate"
                      class="mb-2"
                    ></b-form-datepicker>
                  </div>
                  <div>
                    <b-form-datepicker
                      style="height: 30px"
                      locale="vi"
                      placeholder="Ngày kết thúc"
                      v-model="dateRange.endDate"
                      class="mb-2"
                      :disabled="endDateStatus"
                    ></b-form-datepicker>
                  </div>
                </div>
                <div>
                  <div style="margin-left: 20px">
                    <b-form-input
                      style="height: 30px"
                      v-model="name"
                      placeholder="Tên"
                      size="sm"
                      class="mb-2"
                    ></b-form-input>
                  </div>
                </div>
                <div style="margin-left: 20px">
                  <b-button
                    style="color: white"
                    class="mr-1"
                    size="xs"
                    variant="primary default"
                    @click="search()"
                    >Tìm kiếm</b-button
                  >
                </div>
                <div style="margin-left: 10px">
                  <b-button
                    style="color: white"
                    class="mr-1"
                    size="xs"
                    variant="primary default"
                    @click="clear()"
                    >Làm mới</b-button
                  >
                </div>
              </div>
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
import Datepicker from "vuejs-datepicker";
import dayjs from "dayjs";
import { vi } from "vuejs-datepicker/dist/locale";
export default {
  props: [
    "title",
    "changePageSize",
    "searchChange",
    "total",
    "perPage",
    "currentPage",
    "handlerPageClick",
    "handlerDateValue"
  ],
  components: {
    // 'add-new-employee-modal': AddNewEmployeeModal,
    datepicker: Datepicker
  },
  computed: {
    from() {
      return (this.currentPage - 1) * this.perPage + 1;
    },

    to() {
      return (this.currentPage - 1) * this.perPage + this.perPage;
    },
    endDateStatus() {
      if (!this.dateRange.startDate) return true;
      return false;
    }
  },
  data() {
    return {
      text: "",
      pageSizes: [5, 10],
      date: "",
      vi: vi,
      dateRange: {
        startDate: "",
        endDate: ""
      },
      name: "",
      localeData: {
        direction: "ltr",
        format: "mm/dd/yyyy",
        separator: " - ",
        applyLabel: "Lưu",
        cancelLabel: "Huỷ",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        monthNames: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
        firstDay: 0
      }
    };
  },
  watch: {
    // text: async function(val) {
    //   if (!val) await this.getAllEmployee({ skip: this.currentPage, limit: this.perPage});
    // }
  },
  methods: {
    formatDate(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    async clear() {
      this.dateRange.startDate = "";
      this.dateRange.endDate = "";
      this.name = "";
      await this.$store.dispatch("getAllOrder", {
        limit: this.perPage,
        skip: this.currentPage
      });
    },
    // ...mapActions(["searchUser", "getAllEmployee"]),
    // async searchUserHander() {
    //   try {
    //     await this.searchUser({ text: this.text, skip: this.currentPage, limmit: this.perPage });
    //   } catch (error) {
    //     alert(error);
    //   }
    // },
    async search() {
      try {
        await this.$store.dispatch("findOrder", {
          startDate: this.dateRange.startDate,
          endDate: this.dateRange.endDate,
          limit: this.perPage,
          skip: this.currentPage,
          name: this.name
        });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra"
        });
      }
    }
  }
};
</script>
