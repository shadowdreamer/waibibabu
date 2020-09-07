<template>
  <v-app>
    <v-app-bar
      app
      color="#cb62b4"
      dark
      dense
    > 
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#cb62b4"
          dark
          v-bind="attrs"
          v-on="on"
          elevation=0
        >
          {{active}}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="active = item"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
     <v-btn   text class="text-white" target="_blank" 
        href="https://github.com/shadowdreamer/waibibabu">github
        <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>
    <v-content >
      <Wabibabu v-if="active === '歪比吧卜'"/>
      <Abaaba v-else/>
    </v-content>
  </v-app>
</template>

<script>
import Wabibabu from './components/Wabibabu';

export default {
  name: 'App',
  components: {
    Wabibabu,
    Abaaba:()=>import('./components/Abaaba')
  },
  data: () => ({
    items:['歪比吧卜','阿巴阿巴'],
    active:'歪比吧卜'
  }),
};
</script>
<style >
  .v-input__append-inner{
    align-self: start !important;
    margin-top:10px !important;
  }
</style>
