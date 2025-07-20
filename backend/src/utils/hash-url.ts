export interface HashUrlInterface {
  execute(url: string): string;
}

export class HashUrl implements HashUrlInterface {
  execute(url: string): string {
    function convertToBase62(number: number) {
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";

      do {
        result = characters[number % 62] + result;
        number = Math.floor(number / 62);
      } while (number > 0);

      return result;
    }

    // Gera um hash da string de entrada
    let hash = 0;
    const codeEncryptLength = 7;

    // Algoritmo simples de hash
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    // Garante que o número seja positivo
    hash = Math.abs(hash);

    // Adiciona timestamp para garantir unicidade mesmo para entradas idênticas
    // se chamadas em momentos diferentes
    const timestamp = Date.now();
    hash = hash * 1000000 + (timestamp % 1000000);

    // Converte para Base62 e garante o tamanho desejado
    let code = convertToBase62(hash);

    // Ajusta o tamanho do código
    if (code.length > codeEncryptLength) {
      code = code.substring(0, codeEncryptLength);
    } else {
      // Preenche com caracteres adicionais se for menor que o codeEncryptLength desejado
      while (code.length < codeEncryptLength) {
        code += convertToBase62(Math.floor(Math.random() * 62));
      }
    }

    return code;
  }
}
