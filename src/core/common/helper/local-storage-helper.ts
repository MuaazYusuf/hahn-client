export class LocalStorageHelper {
  static typeObject = 'object';

  static setItem(key: string, value: any): void {
    if (typeof value === LocalStorageHelper.typeObject) value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  static getItem(key: string): any {
    const value = localStorage.getItem(key) ?? '';
    if (typeof JSON.parse(value) === LocalStorageHelper.typeObject) return JSON.parse(value);
    else return value;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
