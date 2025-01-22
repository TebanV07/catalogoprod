import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurtainService {
  private curtainShown = true;

  // Verificar si el telón debe mostrarse
  getCurtainState(): boolean {
    return this.curtainShown;
  }

  // Actualizar el estado del telón
  setCurtainState(state: boolean): void {
    this.curtainShown = state;
  }
}
