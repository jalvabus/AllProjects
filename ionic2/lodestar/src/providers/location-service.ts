import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  api_url = 'http://ancient2.webfactional.com/APIv1/geolocalizacion';
  //api_url = 'http://localhost:3000/APIv1/geolocalizacion';


  constructor(public http: Http) {
  }

  public getLocation(idGps) {
    var api_url_login = this.api_url + '/obtenerLocalizacion/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return Observable
      .interval(2000)
      .switchMap(() => this.http.get(api_url_login, options).map((res) => res.json()))
      .share();
  }

  public getLocationOne(idGps) {
    var api_url_location = this.api_url + '/obtenerLocalizacion/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url_location, options).map((localizacion) => localizacion.json());
  }

  public getLoctionDates(idGps, dates) {
    console.log(dates);
    var api_url_location = this.api_url + '/historial/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(api_url_location, dates, options).map((localizaciones) => localizaciones.json());
  }

  public apagarVehiculo(idGps) {
    var api_url_location = this.api_url + '/apagarVehiculo/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url_location, options).map((gps) => gps.json());

  }

  public activarVehiculo(idGps) {

    var api_url_location = this.api_url + '/activarVehiculo/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url_location, options).map((gps) => gps.json());

  }

  public guardarGeovalla(idGps, geovalla) {

    var api_url_location = this.api_url + '/geovalla/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(api_url_location, { geovalla: geovalla }, options).map((res) => res.json());
  }

  public guardarFuncionGeovalla(idGps, funciones) {
    var api_url_location = this.api_url + '/funcionesGeovalla/' + idGps;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(api_url_location, funciones, options).map((res) => res.json());
  }

}
