import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import setToken from '../app/auth.interceptor'
import CONFIG from '../app/app.config'

@Injectable()
export class LoginService {

  private isLoggedin: boolean;
  private AuthToken: any;

  constructor(public http: Http) { }

  modificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + '/api/usuario', usuario, setToken())
        .subscribe(data => {
          resolve(data.json())
        }, err => {
          console.log(err);
          reject(err.json())
        });
    });
  }

  cambiarContrasena(datos) {
    return new Promise((resolve, reject) => {
      this.http.put(CONFIG.API + '/api/modificarContrasena', datos, setToken())
        .subscribe(data => {
          resolve(data.json())
        }, err => {
          console.log(err);
          reject(err.json())
        });
    });
  }

  login(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/login', datos)
        .subscribe(data => {

          resolve(this.saveToken(data.json()))
        }, err => {
          console.log(err);
          reject(err.json())
        });
    });
  }

  registrarUsuario(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/registrar', datos)
        .subscribe(data => resolve(this.saveToken(data.json())), err => reject(err.json()));
    });
  }

  saveToken(token) {
    window.localStorage.setItem('token', token);
    this.useCredentials(token);
    return token
  }

  saveUsuario(usuario) {
    window.localStorage.setItem('usuario', JSON.stringify(usuario));
    return usuario;
  }

  useCredentials(token) {
    this.isLoggedin = true;
    this.AuthToken = token;
  }

  fetchUsuario() {
    return new Promise((resolve, reject) => {
      this.http.get(CONFIG.API + '/api/usuario/getUsuario', setToken())
        .subscribe(data => resolve(this.saveUsuario(data.json())), err => reject(err));
    });
  }

  recuperarContrasena(correo_electronico) {
    return new Promise((resolve, reject) => {
      this.http.post(CONFIG.API + '/recuperarContrasena', { correo_electronico })
        .subscribe(data => resolve(this.saveToken(data.json())), err => reject(err.json()));
    });
  }

}
