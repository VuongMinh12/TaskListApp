
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvocer';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private invoker: ServiceInvoker
  ) {}

  GetListTask(request: any){
    return this.invoker.get(request, "Task");
  }
}

