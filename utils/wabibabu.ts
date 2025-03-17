export function decodeWabibabu(input: string): string {
  let str = input                    
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
  return res;
}
export function encodeWabibabu(input: string): string {
  const charWaibi =(c)=>{
    const dic={"歪":"0","比":"1","吧":"2"}
      let l = c.length
      let r = ""
      for(let i =0;i<l;i++){
          r += dic[c[i]] || ""
      }
      return r
    }
    let arr = input.split("卜")
    arr.pop()
    let res = arr.reduce((a,c)=>{
        if(c){
            let code = parseInt(charWaibi(c)||'0',3)
            return a + String.fromCharCode(code)
        }else{
            return a
        }
    },'')
    return res
}