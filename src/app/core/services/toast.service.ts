import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject: BehaviorSubject<String[]>;
  public currentToasts: Observable<String[]>;

  constructor() {
    this.toastsSubject = new BehaviorSubject<String[]>([]);
    this.currentToasts = this.toastsSubject.asObservable();
  }

  public get toastsValue(): String[] {
    return this.toastsSubject.value;
  }

  toast(message) {
    const newToastLineUp = this.toastsValue;

    newToastLineUp.push(message);
    this.toastsSubject.next(newToastLineUp);

    setTimeout(() => {
      const newToastLineUp = this.toastsValue.filter(e => e !== message);
      this.toastsSubject.next(newToastLineUp);
    }, 5000);
  }
}
