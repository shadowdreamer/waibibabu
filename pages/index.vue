<template lang="pug">
 v-card
  v-row(no-gutters class="c-tool-bar")
    v-col(cols="5" class="text-center") {{encode?"文字":"歪比吧卜"}}
    v-col(cols="2" class="text-center")
      v-btn(icon variant="plain" @click="encode=!encode")
        v-icon mdi-cached
    v-col(cols="5" class="text-center") {{encode?"歪比吧卜":"文字"}}
  v-row(class="md-12" no-gutters)
    v-col(sm="6" cols="12" class='px-4')
      v-textarea(clearable variant="plain" v-model="input" auto-grow autofocus full-width)
    v-col(sm="6" cols="12" :style="{backgroundColor:output?'#f1f1f1':'#fff'}")
      div(class="c-output d-flex flex-column justify-space-between")
        div {{output}}
        div(class="text-right align-end" v-show="!!output")
          v-btn(icon variant="plain" @click="()=>copy()")
            v-icon mdi-content-copy
</template>
<script setup lang="ts">
const title = useState('title', () => '歪比吧卜')
onMounted(()=>{
  title.value = '歪比吧卜';
})
useSeoMeta({
  title: '歪比吧卜 | 加密通信',
  description: '歪比吧卜',
})
const encode = ref(true);
const input = ref("");
import { useClipboard } from '@vueuse/core'
const { copy } = useClipboard({ source: () => output.value })
const output = computed(() => {
  if (encode.value) {
    return decodeWabibabu(input.value);
  } else {
    return encodeWabibabu(input.value);}
})

</script>
<style scoped>
  .c-tool-bar{
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    font-weight: 800;
    
  }
  .c-output{
    height: 100%; 
    padding: 10px 15px;
    border-left: 1px solid #eee; 
  }
</style>