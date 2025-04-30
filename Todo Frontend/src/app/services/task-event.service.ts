import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskEventService {
  private taskAddSource = new Subject<any>();
  taskAdded$ = this.taskAddSource.asObservable();


  emitTaskAdd(task: any) {
    this.taskAddSource.next(task);
  }
}
