<template>
  <v-container>
    <v-card>
      <v-row no-gutters class="c-tool-bar" >
        <v-col cols="5" class="text-center">{{encode?'文字':'歪比吧卜'}}</v-col>
        <v-col cols="2" class="text-center">
           <v-btn icon @click="encode=!encode">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="5" class="text-center">{{encode?'歪比吧卜':'文字'}}</v-col>
      </v-row>
    <v-row class="md-12" no-gutters>
      <v-col sm="6" cols="12">
         <v-textarea
          clearable 
          solo
          flat
          v-model="input"
          auto-grow
          autofocus
          full-width
        ></v-textarea>
      </v-col>
      <v-col sm="6" cols="12" :style="{backgroundColor:output?'#f1f1f1':'#fff'}">
        <div class="c-output d-flex flex-column justify-space-between" >
          <div>{{output}}</div>
          <div class="text-right align-end" v-show="!!output">
            <v-btn icon
              v-clipboard:copy="output"
            ><v-icon>mdi-content-copy</v-icon></v-btn>
          </div>
        </div>
      </v-col>
    </v-row> 
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Wabibabu',
    data: () => ({
       input:"",
       output:"",
       encode:true
    }),
    watch:{
      input(){
        this.encode?this.waibi():this.biwai()
      },
      encode(){
        this.encode?this.waibi():this.biwai()
      }
    },
    methods:{
      waibi(){
        let str = this.input                    
        let len = str.length                    
        let res = '' 
        const charWaibi =(c)=>{
          const dic=["歪","比","吧"]
          let l = c.length
          let r = ""
          for(let i =0;i<l;i++){
              r += dic[c[i]]
          }
          return r
        }
        for(let i=0; i<len;i++){
            let tmp = str[i].charCodeAt(0).toString(3)
            res += charWaibi(tmp) +"卜"
        }
        this.output = res
      },
      biwai(){
        const charWaibi =(c)=>{
        const dic={"歪":"0","比":"1","吧":"2"}
          let l = c.length
          let r = ""
          for(let i =0;i<l;i++){
              r += dic[c[i]] || ""
          }
          return r
        }
        let arr = this.input.split("卜")
        arr.pop()
        let res = arr.reduce((a,c)=>{
            if(c){
                let code = parseInt(charWaibi(c)||0,3)
                return a + String.fromCharCode(code)
            }else{
                return a
            }
        },'')
        this.output = res
      },
      onCopy(){

      }
    }
  }
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