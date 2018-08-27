import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertaService {

  api_url = "http://ancient2.webfactional.com/alertas"
  //api_url = "http://localhost:3000/APIv1/superAdmin"

  constructor(public http: Http) {

  }

  getAlertasActivas() {
    var api_url_activas = this.api_url + "/activas";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url_activas, options)
      .map((res) => res.json());
  }

  actualizarToken(datos) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var api = "http://ancient2.webfactional.com/push/actualizar"
    return this.http.post(api, datos, options)
      .map((res) => res.json());
  }

  resolver(idAlerta) {
    var api_url_resolver = this.api_url + "/resolver/" + idAlerta;
    console.log(api_url_resolver);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api_url_resolver, options)
      .map((res) => res.json());
  }

}
