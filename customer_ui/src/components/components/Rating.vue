<template>
  <v-main>
    <v-container style="padding: 0px">
      <v-card elevation="0">
        <v-card-subtitle class="font-weight-bold">
          {{ name }}
        </v-card-subtitle>
        <v-card-text>
          <p>{{ content }}</p>
          <p>{{ createdAt | formatDate }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Comment',
  components: {

  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['name', 'createdAt', 'content']
}
</script>