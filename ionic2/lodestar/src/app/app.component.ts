import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Nav, ModalController, AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LocalStorageService } from 'angular-2-local-storage';

import { Contenido } from '../pages/contenido/contenido'
import { Login } from '../pages/login/login'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  usuarioActual: any;

  constructor(private localStorage: LocalStorageService, public platform: Platform, public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.usuarioActual = window.localStorage.getItem('usuario');

    if (this.usuarioActual != null) {
      this.rootPage = Contenido;
    } else {
      this.rootPage = Login;
    }

    this.initializeApp();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
