import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageStateService {
  private readonly armazenamento = localStorage;
  private BASE_KEY_APP = 'app:bom-kumbu:';
  constructor() { }

  public get storage() {
    return this.armazenamento;
  }

  public setItem(key: string, data: any) {
    const value = JSON.stringify(data);
    this.armazenamento.setItem(this.BASE_KEY_APP + key, value);
  }

  public getItem<T>(key: string, defaultValue: T | null = null): T | null {
    const value = this.armazenamento.getItem(this.BASE_KEY_APP + key);
    const data = value && value != 'undefined' && value != 'null' ? JSON.parse(value) : null;
    return (data as T) ?? defaultValue;
  }

  public removeItem(key: string) {
    this.armazenamento.removeItem(key);
  }

  public clearAll() {
    this.armazenamento.clear();
  }
}
