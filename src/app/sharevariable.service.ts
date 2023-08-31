import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharevariableService {

  private sharedVariableSubject = new BehaviorSubject<any>(null);

  setSharedVariable(value: any[]) {
    this.sharedVariableSubject.next(value);
  }

  getSharedVariable(): Observable<any[]> {
    return this.sharedVariableSubject.asObservable();
  }
}
