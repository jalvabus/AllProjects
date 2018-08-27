import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import setToken from '../app/auth.interceptor'
import CONFIG from '../app/app.config'

@Injectable()
export class PagoService {

  constructor(public http: Http) {
  }

  generarOrden(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/api/pago/generarOrden', datos, setToken())
        .subscribe(data => resolve(this.verDatos(data)), err => reject(err.json()));
    });
  }

  verDatos(datos) {
    console.log(JSON.parse(datos._body));
    return JSON.parse(datos._body);
  }
}
