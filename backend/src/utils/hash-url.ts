export interface HashUrlInterface {
  execute(url: string): Promise<string>;
}

export class HashUrl implements HashUrlInterface {
  execute(url: string): Promise<string> {
    //TODO Implement Hashed URL Logic
    throw new Error("Method not implemented." + url);
  }
}
