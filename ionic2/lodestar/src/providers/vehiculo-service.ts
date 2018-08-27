import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import setToken from '../app/auth.interceptor'
import CONFIG from '../app/app.config'
import 'rxjs/add/operator/map';

@Injectable()
export class VehiculoService {

  constructor(public http: Http) {
  }

  registrarVehiculo(datos){
    return new Promise((resolve, reject)=>{
      this.http.post(CONFIG.API + '/api/vehiculo/',datos,setToken())
      .subscribe(data=>resolve(data.json()) , err => reject(err.json()))
    })
  }

  modificarVehiculo(datos){
    return new Promise((resolve, reject)=>{
      this.http.put(CONFIG.API + '/api/vehiculo/',datos,setToken())
      .subscribe(data=>resolve(data.json()) , err => reject(err.json()))
    })
  }

}
