<template lang="pug">
v-responsive(class="border rounded")
  v-app 
    v-app-bar(color="#cb62b4" flat)
      v-app-bar-title 
        v-menu 
          template(v-slot:activator="{ props }")
            v-btn(v-bind="props" size="large") 
              v-icon( size="large") mdi-menu
              | {{title}}
          v-list
            v-list-item(v-for="item in routes" :key="item.name" @click="navigateTo(item.path)")
              v-list-item-title {{item.name}}
         
      v-spacer
      v-btn( target="_blank" 
      href="https://github.com/shadowdreamer/waibibabu") 
        | github
        v-icon(small) mdi-open-in-new
    v-main
      v-container
        slot 
</template>
<script setup lang="ts">
const title = useState('title');
const routes = [
  {
    path: '/',
    name:'歪比吧卜',
  },
  {
    path: '/gugugaga',
    name:'咕咕嘎嘎',
  },
  {
    path: '/oho',
    name:'哦齁齁！！！',
  }
]
</script>
<style>

</style>