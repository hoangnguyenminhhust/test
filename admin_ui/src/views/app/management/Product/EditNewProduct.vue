<template>
  <div>
    <datatable-heading
      :title="$t('menu.add-new')"
      :product="product"
      :productImage="productImage"
      :validate="onSubmit"
    ></datatable-heading>
    <b-row>
      <b-col style="padding-left: 0px">
        <b-card class="mb-4" title="Thông tin cơ bản" style="width: 100%">
          <b-form
            @submit.prevent="onSubmit"
            class="av-tooltip tooltip-label-right"
          >
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="name-input"
              label="Tên"
              style="width: 80%"
            >
              <b-form-input
                v-model="$v.product.name.$model"
                :state="!$v.product.name.$error"
              ></b-form-input>
              <b-form-invalid-feedback
                >Tên không được để trống
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="category-input"
              label="Danh mục"
              style="width: 80%"
            >
              <b-form-select
                :options="categories"
                v-model="$v.product.category_id.$model"
                :state="!$v.product.category_id.$error"
                plain
              />
              <b-form-invalid-feedback
                >Danh mục không được để trống</b-form-invalid-feedback
              >
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="cost-price-input"
              label="Giá vốn"
              style="width: 80%"
            >
              <b-form-input
                v-model="$v.product.cost_price.$model"
                :state="!$v.product.cost_price.$error"
              ></b-form-input>
              <b-form-invalid-feedback
                >Giá vốn không được để trống và là số</b-form-invalid-feedback
              >
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="price-input"
              label="Giá bán"
              style="width: 80%"
            >
              <b-form-input
                v-model="$v.product.price.$model"
                :state="!$v.product.price.$error"
              ></b-form-input>
              <b-form-invalid-feedback
                >Giá không được để trống và là số</b-form-invalid-feedback
              >
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="amount-input"
              label="Số lượng"
              style="width: 80%"
            >
              <b-form-input
                v-model="$v.product.amount.$model"
                :state="!$v.product.amount.$error"
              ></b-form-input>
              <b-form-invalid-feedback
                >Số lượng phải là số</b-form-invalid-feedback
              >
            </b-form-group>
            <b-form-group
              label-cols="3"
              label-cols-lg="4"
              id="unit-input"
              label="Đơn vị"
              style="width: 80%"
            >
              <b-form-input
                v-model="$v.product.unit.$model"
                :state="!$v.product.unit.$error"
              ></b-form-input>
              <b-form-invalid-feedback
                >Đơn vị không được để trống</b-form-invalid-feedback
              >
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mb-4" title="Hình ảnh">
          <b-row>
            <b-col>
              <b-img
                :src="
                  objectImage(productImage.selectedFile)
                    ? objectImage(productImage.selectedFile)
                    : defaultImage
                "
                fluid
                alt="Fluid image"
              ></b-img>
              <b-form-group>
                <b-form-file
                  size="sm"
                  browse-text="Thêm"
                  v-if="!productImage.selectedFile"
                  v-model="productImage.selectedFile"
                ></b-form-file>
                <div
                  style="display: flex; justify-content: center; padding: 10px"
                  v-if="productImage.selectedFile"
                >
                  <b-button
                    class="mb-1"
                    size="sm"
                    variant="danger default"
                    @click="productImage.selectedFile = undefined"
                    >Xoá</b-button
                  >
                </div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-img
                :src="
                  objectImage(productImage.selectedFile1)
                    ? objectImage(productImage.selectedFile1)
                    : defaultImage
                "
                fluid
                alt="Fluid image"
              ></b-img>
              <b-form-group>
                <b-form-file
                  size="sm"
                  browse-text="Thêm"
                  v-if="!productImage.selectedFile1"
                  v-model="productImage.selectedFile1"
                ></b-form-file>
                <div
                  style="display: flex; justify-content: center; padding: 10px"
                  v-if="productImage.selectedFile1"
                >
                  <b-button
                    class="mb-1"
                    size="sm"
                    variant="danger default"
                    @click="productImage.selectedFile1 = undefined"
                    >Xoá</b-button
                  >
                </div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-img
                :src="
                  objectImage(productImage.selectedFile2)
                    ? objectImage(productImage.selectedFile2)
                    : defaultImage
                "
                fluid
                alt="Fluid image"
              ></b-img>
              <b-form-group>
                <b-form-file
                  size="sm"
                  v-if="!productImage.selectedFile2"
                  v-model="productImage.selectedFile2"
                  browse-text="Thêm"
                ></b-form-file>
                <div
                  style="display: flex; justify-content: center; padding: 10px"
                  v-if="productImage.selectedFile2"
                >
                  <b-button
                    class="mb-1"
                    size="sm"
                    variant="danger default"
                    @click="productImage.selectedFile2 = undefined"
                    >Xoá</b-button
                  >
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-card class="mb-4" title="Thuộc tính" style="width: 100%">
        <div>
          <div v-for="(property, i) in product.properties" :key="i">
            <b-row>
              <b-col cols="3">
                <b-form-group
                  id="property-input"
                  label="Thuộc tính"
                  style="padding: 10px"
                >
                  <b-form-input v-model="property.key"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group
                  id="value-input"
                  label="Giá trị"
                  style="padding: 10px"
                >
                  <b-form-input v-model="property.value"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3" style="display: flex; align-items: center">
                <div>
                  <b-button pill variant="danger" @click="deleteProperty(i)"
                    >-</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </div>
          <b-button pill variant="primary" @click="addProperty()"
            >+ Thêm</b-button
          >
        </div>
      </b-card>
    </b-row>
    <b-row>
      <b-card class="mb-4" title="Mô tả" style="width: 100%">
        <!-- <input type="file" @change="uploadFunction" id="file" hidden /> -->
        <quill-editor
          ref="myTextEditor"
          id="myTextEditor"
          v-model="product.description"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import DatatableHeading from "../../../../containers/app/management/product/EditProductHeading";
import { vueS3URL } from "../../../../constants/config";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];
export default {
  components: {
    "datatable-heading": DatatableHeading,
    "quill-editor": quillEditor,
    "v-select": vSelect
  },
  mixins: [validationMixin],
  data: () => ({
    defaultImage: vueS3URL + "6061da5fe0888fc85289a691/noimage.png",
    imageFiles: ["", "", ""],
    productImage: {
      selectedFile: undefined,
      selectedFile1: undefined,
      selectedFile2: undefined
    },
    product: {
      properties: [],
      name: "",
      category_id: null,
      cost_price: "",
      price: "",
      unit: "",
      amount: 0,
    },
    content: "",
    editorOption: {
      placeholder: "",
      modules: {
        toolbar: {
          container: toolbarOptions
          // handlers: {
          //   image: function (value) {
          //     if (value) {
          //       // alert ('custom picture')
          //       document.getElementById("file").click();
          //     } else {
          //       this.quill.format("image", false);
          //     }
          //   },
          // },
        }
      }
    },
    categories: [{ value: null, text: "Chọn danh mục" }]
  }),
  validations: {
    product: {
      name: {
        required
      },
      category_id: {
        required
      },
      cost_price: {
        required,
        numeric
      },
      price: {
        required,
        numeric
      },
      unit: {
        required
      },
      amount: {
        required,
        numeric
      }
    }
  },
  computed: {
    checkName() {
      return this.product.name.length > 2 ? true : false;
    }
  },
  methods: {
    objectImage(file) {
      if (typeof file === "string") {
        return vueS3URL + file;
      } else if (typeof file === "object") {
        return URL.createObjectURL(file);
      } else {
        return "";
      }
    },
    uploadImageProduct(file, image) {},
    // async uploadFunction(e) {
    //   try {
    //     this.selectedFile = e.target.files[0];
    //     const key = await this.$store.dispatch("uploadFile", this.selectedFile);
    //     this.selectedFile = [];
    //     const quill = this.$refs.myTextEditor.quill;
    //     if (key) {
    //       const length = quill.getSelection().index;
    //       quill.insertEmbed(
    //         length,
    //         "image",
    //         `https://my-ecommerce-bucket-123.s3-ap-southeast-1.amazonaws.com/${key}`
    //       );
    //       quill.setSelection(length + 1);
    //       document.getElementById("file").value = "";
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    //   // console.log(this.selectedFile);
    //   //do your post
    // },
    onEditorBlur(editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      // const quill = this.$refs.myTextEditor.quill;
      // quill.on("text-change", async (delta, oldContent, soure) => {
      //   if (oldContent.ops && oldContent.ops.length >= 2) {
      //     if (
      //       oldContent.ops[oldContent.ops.length - 2].insert &&
      //       oldContent.ops[oldContent.ops.length - 2].insert
      //     ) {
      //       const url = oldContent.ops[oldContent.ops.length - 2].insert.image;
      //       const urlSplitArray = url.split("/");
      //       const key =
      //         urlSplitArray[urlSplitArray.length - 2] +
      //         "/" +
      //         urlSplitArray[urlSplitArray.length - 1];
      //       await this.$store.dispatch("deleteImage", { key: key });
      //     }
      //   }
      // });
    },
    addProperty() {
      this.product.properties.push({ key: "", value: "" });
    },
    deleteProperty(index) {
      this.product.properties.splice(index, index + 1);
    },
    setupEventListener() {
      this.$store.subscribe(mutation => {
        if (mutation.type === "RETURN_CATEGORY") {
          this.categories = mutation.payload.map(item => {
            return { value: item._id, text: item.name };
          });
        }
        if (mutation.type === "GET_PRODUCT") {
          this.product = mutation.payload;
          if (this.product.images[0])
            this.productImage.selectedFile = this.product.images[0];
          if (this.product.images[1])
            this.productImage.selectedFile1 = this.product.images[1];
          if (this.product.images[2])
            this.productImage.selectedFile2 = this.product.images[2];
        }
      });
    },
    onSubmit() {
      this.$v.product.$touch();
      if (this.$v.product.$anyError) {
        return false;
      } else {
        return true;
      }
    }
  },
  async created() {
    this.setupEventListener();
    await Promise.all([
      this.$store.dispatch("getAllCategory"),
      this.$store.dispatch("getProduct", {
        productId: this.$route.params.productId
      })
    ]);
  }
};
</script>
