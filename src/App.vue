<template>
  <v-app>
    <v-app-bar
      app
      color="#e265c7"
      dark
      dense
    > 
    加 密 通 信
    <v-spacer></v-spacer>
     <v-btn   text class="text-white" target="_blank" 
        href="https://github.com/shadowdreamer/waibibabu">github
        <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>
    <v-content >
      <Wabibabu/>
    </v-content>
  </v-app>
</template>

<script>
import Wabibabu from './components/Wabibabu';

export default {
  name: 'App',
  components: {
    Wabibabu,
  },
  data: () => ({
    //
  }),
};
</script>
