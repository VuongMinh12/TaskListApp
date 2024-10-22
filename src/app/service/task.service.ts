
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInvoker } from './serviceInvoker';


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

