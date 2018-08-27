import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import setToken from '../app/auth.interceptor'
import CONFIG from '../app/app.config'

@Injectable()
export class LocalizacionService {

  constructor(public http: Http) {
  }

  public getLocalizacionesFecha(idGps, fecha) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/api/localizacion/historial/' + idGps, fecha ,setToken())
        .subscribe(localizacion => resolve(localizacion.json()), err => reject(err.json()))
    })
  }

  public obtenerLocalizacion(idGps) {
    return new Promise((resolve, reject) => {
      this.http.get(CONFIG.API + '/api/localizacion/' + idGps, setToken())
        .subscribe(localizacion => resolve(localizacion.json()), err => reject(err.json()))
    })
  }

  public obtenerLocalizacion2segs(idGps) {
    var api_url_login = CONFIG.API + '/api/localizacion/' + idGps;
    return Observable
      .interval(2000)
      .switchMap(() => this.http.get(api_url_login, setToken()).map((res) => res.json()))
      .share();
  }

  public guardarGeovalla(idGps, funciones) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/api/localizacion/geovalla/' + idGps, funciones, setToken())
        .subscribe((res) => resolve(res.json()), (err) => reject(err.json()))
    })
  }

  public guardarFuncionGeovalla(idGps, funciones) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/api/localizacion/funcionesGeovalla/' + idGps, funciones, setToken())
        .subscribe((res) => resolve(res.json()), (err) => reject(err.json()))
    })
  }
  public obtenerDireccion(ultimaLocalizacion) {
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ultimaLocalizacion.lat},${ultimaLocalizacion.lng}&key=AIzaSyDoc4Acw9GUubQxodlDdgFImLvKMzrk7NM`)
      .subscribe((res) => {
        console.log(res);
        return res;
      })
  }
}
