<template>
  <v-main>
    <v-container>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(banner, i) in banners"
          :key="i"
          :src="s3Url + banner.key"
        >
          <!-- <div class="banner">
            <div class="banner_items">
              <div class="banner_title">
                Title
              </div>
              <div class="banner_content">
                Content
              </div>
            </div>
          </div> -->
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              Slide
            </div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      slides: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },
  computed: {
    banners() {
      return this.$store.state.banner.banners;
    },
    s3Url() {
      return this.$store.state.s3Url;
    }
  },
  async created() {
    try {
      await this.$store.dispatch("banner/listBanner");
    } catch (error) {
      alert("Có lỗi xảy ra xin vui lòng thử lại");
    }
  }
};
</script>

<style lang="scss"></style>
