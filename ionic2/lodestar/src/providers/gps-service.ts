import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import setToken from '../app/auth.interceptor'
import CONFIG from '../app/app.config'
import 'rxjs/add/operator/map';

@Injectable()
export class GpsService { 

  constructor(public http: Http) {
  }

  public comprobarGps(data){
    console.log(data);
    return new Promise((resolve, reject)=>{
      this.http.post(CONFIG.API+'/api/gps/comprobarCodigo', data, setToken())
      .subscribe(data => resolve(data.json()), err => reject(err.json()))
    })
  }

  public obtenerListaGps(){
    var api_url_gps = CONFIG.API + "/gps";  
    return this.http.get(api_url_gps, setToken())
    .map((res)=>res.json()); 
  }
  

  public obtenerGps(idGps){   
    return this.http.get(CONFIG.API + '/api/gps/obtenerGPS/'+idGps, setToken())
    .map((res)=>res.json());
  }

   public apagarVehiculo(idGps) {
    var api_url_location = CONFIG.API + '/api/gps/apagarVehiculo/' + idGps;    
    return this.http.get(api_url_location, setToken()).map((gps) => gps.json());

  }

  public activarVehiculo(idGps) {
    var api_url_location = CONFIG.API + '/api/gps/activarVehiculo/' + idGps;    
    return this.http.get(api_url_location, setToken()).map((gps) => gps.json());
  }

}
