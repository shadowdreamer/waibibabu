/**
 * OHO编码系统 v3 - 简单可靠的打表编码
 * 格式：A个哦 + B个齁 + C个！（固定顺序）
 * A、B、C 都是 0-9 的数字
 *
 * 编码原理：
 * - 每个字符转为 Unicode 码点
 * - 将码点转为 base-10，每3位一组（补齐到3位）
 * - 每组数字用：百位=哦数量，十位=齁数量，个位=！数量
 * - 每个字符的编码块之间用 `卜` 分隔
 *
 * 例如：
 * - 'A'(65) -> "065" -> 0哦+6齁+5！ -> "齁齁齁齁齁齁！！！！！"
 * - 'AB'(65,66) -> "065卜066" -> "齁齁齁齁齁齁！！！！！卜齁齁齁齁齁齁！！！！！！"
 * - '你'(20320) -> "020卜320" -> "哦哦齁！！！！！！！！！卜哦哦哦齁齁！！！！！"
 */

/**
 * 将一个数字（0-999）编码为 oho 格式
 * @param num 0-999 的数字
 * @returns 编码后的字符串
 */
function encodeNumber(num: number): string {
  if (num < 0 || num > 999) {
    throw new Error(`数字超出范围: ${num}`);
  }

  const hundreds = Math.floor(num / 100);      // 百位 0-9
  const tens = Math.floor((num % 100) / 10);   // 十位 0-9
  const ones = num % 10;                        // 个位 0-9

  return '哦'.repeat(hundreds) + '齁'.repeat(tens) + '！'.repeat(ones);
}

/**
 * 将 oho 格式解码为数字（0-999）
 * @param str 编码后的字符串（不包含分隔符）
 * @returns 解码后的数字
 */
function decodeNumber(str: string): number {
  let i = 0;

  // 统计哦的数量（百位）
  let ohCount = 0;
  while (i < str.length && str[i] === '哦') {
    ohCount++;
    i++;
  }

  // 统计齁的数量（十位）
  let houCount = 0;
  while (i < str.length && str[i] === '齁') {
    houCount++;
    i++;
  }

  // 统计！的数量（个位）
  let exclamCount = 0;
  while (i < str.length && str[i] === '！') {
    exclamCount++;
    i++;
  }

  return ohCount * 100 + houCount * 10 + exclamCount;
}

/**
 * 编码：将文本转为 oho 格式
 * @param input 原始文本
 * @returns 编码后的字符串
 */
export function encodeOho(input: string): string {
  const charBlocks: string[] = [];

  for (const char of input) {
    const code = char.codePointAt(0)!;
    const codeStr = code.toString();
    const blocks: string[] = [];

    // 从左到右每3位一组
    for (let i = 0; i < codeStr.length; i += 3) {
      const chunk = codeStr.slice(i, i + 3);
      // 补齐到3位
      const padded = chunk.padStart(3, '0');
      const num = parseInt(padded, 10);
      blocks.push(encodeNumber(num));
    }

    // 同一个字符的块用卜连接
    charBlocks.push(blocks.join('卜'));
  }

  // 不同字符之间用两个卜分隔
  return charBlocks.join('卜卜');
}

/**
 * 解码：将 oho 格式转回文本
 * @param input 编码后的字符串
 * @returns 原始文本
 */
export function decodeOho(input: string): string {
  // 按 `卜卜` 分隔得到每个字符的编码
  const charEncodings = input.split('卜卜');

  const codes: number[] = [];

  for (const charEncoding of charEncodings) {
    if (charEncoding === '') continue;

    // 按 `卜` 分隔得到每个块的编码
    const blocks = charEncoding.split('卜');

    // 拼接所有块的数字
    let codeStr = '';
    for (const block of blocks) {
      if (block === '') continue;
      const num = decodeNumber(block);
      codeStr += num.toString();
    }

    // 转为数字
    const code = parseInt(codeStr, 10);
    codes.push(code);
  }

  return String.fromCodePoint(...codes);
}
