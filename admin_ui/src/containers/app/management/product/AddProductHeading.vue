<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>THÊM SẢN PHẨM</h1>
      <div class="top-right-button-container">
        <b-button
          variant="danger"
          size="lg"
          class="top-right-button"
          @click="save()"
          >Thêm</b-button
        >
        <b-button
          to="/app/management/product"
          variant="success"
          size="lg"
          class="top-right-button"
          >Quay lại</b-button
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
      <!-- <div class="mb-2 mt-2">
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
              <b-input :placeholder="$t('menu.search')"  @input="(val) => searchChange(val)" />
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
      </div> -->
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
import { mapActions } from "vuex";
import { vueS3URL } from '../../../../constants/config';
export default {
  props: ["product", "productImage", "validate"],
  components: {},
  data() {
    return {
      pageSizes: [4, 8, 12],
    };
  },
  methods: {
    ...mapActions(["uploadFileBase64", "uploadFile", "createProduct"]),
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    async save() {
      try {
        const valid = this.validate();
        if (!valid) return;
        if (this.product.description) {
          let content = this.product.description;
          let temp = document.createElement("div");
          temp.innerHTML = content;
          let images = temp.getElementsByTagName("img");
          for (let i = 0; i < images.length; i++) {
            if (!this.validURL(images[i])) {
              const key = await this.uploadFileBase64({
                dataImage: images[i].src,
              });
              images[i].src = vueS3URL + key;
            }
          }
          this.product.description = temp.innerHTML;
        }
        const promiseArray = [];
        if (this.productImage.selectedFile && !this.validURL(this.productImage.selectedFile)) {
          promiseArray.push(
            await this.uploadFile({ file: this.productImage.selectedFile })
          );
        }
        if (this.productImage.selectedFile1 && !this.validURL(this.productImage.selectedFile1)) {
          promiseArray.push(
            await this.uploadFile({ file: this.productImage.selectedFile1 })
          );
        }
        if (this.productImage.selectedFile2 && !this.validURL(this.productImage.selectedFile2)) {
          promiseArray.push(
            await this.uploadFile({ file: this.productImage.selectedFile2 })
          );
        }
        const resData = await Promise.all([promiseArray]);
        console.log(resData);
        this.product.images = resData[0];
        await this.createProduct(this.product);
        this.$router.push({ path: '/app/management/product'});
      } catch (error) {
        alert("Có lỗi xảy ra vui lòng thử lại");
      }
    },
  },
};
</script>
