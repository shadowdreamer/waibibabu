const pairToWord: { [key: string]: string } = {
  '00': '咕咕',
  '01': '嘎嘎',
  '02': '刮擦',
  '03': '哈基密',
  '10': '叮咚鸡',
  '11': '灵感菇',
  '12': '🎵',
  '13': '🎤',
  '20': '🍄',
  '21': '🥒',
  '22': '菇灵咕',
  '23': '喂喂',
  '30': '大狗叫',
  '31': '🐱',
  '32': '曼波',
  '33': '🐔'
};

// 压缩标志
const compressMap: { [key: string]: string } = {
  '00000000': '⚡',  // 4 对 00
  '0000': '🐧'      // 2 对 00
};
export function encodeWithPairsCompressed(input: string): string {
  let result = '';
  for (const char of input) {
    const codePoint = char.codePointAt(0)!;
    let base4 = codePoint.toString(4).padStart(12, '0');

    // 优先压缩
    while (base4.startsWith('00000000')) {
      result += compressMap['00000000'];
      base4 = base4.slice(8);
    }
    while (base4.startsWith('0000')) {
      result += compressMap['0000'];
      base4 = base4.slice(4);
    }

    for (let i = 0; i < base4.length; i += 2) {
      const pair = base4.slice(i, i + 2);
      result += pairToWord[pair];
    }
  }
  return result;
}

const wordToPair = Object.fromEntries(
  Object.entries(pairToWord).map(([k, v]) => [v, k])
);

// 反向压缩映射
const decompressMap: { [key: string]: string } = {
  '⚡': '00000000',
  '🐧' : '0000'
};

export function decodeWithPairsCompressed(encoded: string): string {
  let digitStr = '';
  const allTokens = [...Object.keys(decompressMap), ...Object.keys(wordToPair)]
    .sort((a, b) => b.length - a.length); // 长词优先匹配

  for (let i = 0; i < encoded.length;) {
    let matched = false;
    for (const token of allTokens) {
      if (encoded.startsWith(token, i)) {
        if (token in decompressMap) {
          digitStr += decompressMap[token];
        } else {
          digitStr += wordToPair[token];
        }
        i += token.length;
        matched = true;
        break;
      }
    }
    if (!matched) throw new Error(`未知词或颜文字：${encoded.slice(i, i + 6)}`);
  }

  let result = '';
  for (let i = 0; i < digitStr.length; i += 12) {
    const chunk = digitStr.slice(i, i + 12);
    const codePoint = parseInt(chunk, 4);
    result += String.fromCodePoint(codePoint);
  }

  return result;
}

 