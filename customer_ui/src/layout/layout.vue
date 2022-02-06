<template>
  <v-app>
    <v-main>
      <Header />
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/Header/index';
import Footer from '../components/Footer/index';
export default {
    name: 'Layout',
    components: {
        Header,
        Footer
    }
}
</script>