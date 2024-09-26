
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvocer';
import { StatusRequest } from '../model/status';
import { TaskUpdateCreate } from '../model/task';

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

  GetStatus(request: any){
    return this.invoker.get(request, "Status");
  }
  EditTask(request : any){
    return this.invoker.put(request, "Task");
  }
  AddTask (request : any){
    return this.invoker.post(request,"Task");
  }

  DeleteTask(request : any){
    return this.invoker.delete(request,"Task");
  }

}

