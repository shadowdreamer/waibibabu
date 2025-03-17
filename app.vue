<template lang="pug">
NuxtLoadingIndicator
v-responsive(class="border rounded")
  v-app 
    v-app-bar(color="#cb62b4" flat)
      v-app-bar-title 歪比吧卜
      v-spacer
      v-btn( target="_blank" 
      href="https://github.com/shadowdreamer/waibibabu") 
        | github
        v-icon(small) mdi-open-in-new
    v-main
      v-container
        NuxtPage 
</template>
<script setup lang="ts">

</script>
<style>

</style>