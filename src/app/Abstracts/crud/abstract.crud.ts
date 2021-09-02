import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

export class AbstractCrud<T>{

  constructor(protected httpClient: HttpClient,
              protected getAllRoute: string,
              protected getByIdRoute: string,
              protected createRoute: string,
              protected updateRoute: string,
              protected deleteRoute: string) {
  }

  getAll() {
    return this.httpClient.get<T[]>(environment.baseUrl + this.getAllRoute, {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      }
    });
  }

  getById(id: string) {
    return this.httpClient.get<T>(environment.baseUrl + this.getByIdRoute + id, {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      }
    });
  }

  create(model: T) {
    return this.httpClient.post(environment.baseUrl + this.createRoute, model, {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      }
    });
  }

  update(id:string, model: T) {
    return this.httpClient.put(environment.baseUrl + this.updateRoute, model, {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      },
      params: {
        id: id
      }
    });
  }

  delete(id: string) {
    return this.httpClient.delete(environment.baseUrl + this.deleteRoute+ id, {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      }
    });
  }
}
