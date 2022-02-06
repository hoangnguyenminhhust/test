<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Chào mừng bạn đến với sàn giao dịch điện thoại và phụ kiện thoại. Trang web này tạo nên nhằm mục đích mua bán và trao đổi các loại thiết bị điện thoại thông minh. Tạo ra 1 cộng đồng mua bán, trao đổi lành mạnh tiện lợi, đáp ứng giao dịch nhanh nhất
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Sàn giao dịch điện thoại và thiết bị di động thông minh</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    items: [
      {
        title: "Brunch this weekend?",
      },
      {
        title: "Summer BBQ",
      },
      {
        title: "Oui oui",
      },
      {
        title: "Birthday gift",
      },
      {
        title: "Recipe to try",
      },
    ],
  }),
};
</script>