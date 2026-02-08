import { LocalStorageStateService } from '../services/local.storage.state.service';
import { AppListener } from '../utils/listeners';


export abstract class StateProvider<T> {
  public abstract key: string;
  public lastSubKey: any;

  constructor(
    public localStorageStateService: LocalStorageStateService
  ) { }

  private getKey(subKeyState: any) {
    return `${this.key}-state-${subKeyState}`;
  }

  public saveSate<E>(state: T | E, subKeyState: any) {
    this.localStorageStateService.setItem(this.getKey(subKeyState), state);
  }

  public getSate<E>(subKeyState: any, defaultValue: T | E): T | E {
    const state = this.localStorageStateService.getItem<T | E>(
      this.getKey(subKeyState), defaultValue
    );
    return state || defaultValue;
  }

  public updateState() {
    this.findAll(this.lastSubKey, {})
  }

  public abstract findAll(filter: any, appListener: AppListener<T>): void;
}
