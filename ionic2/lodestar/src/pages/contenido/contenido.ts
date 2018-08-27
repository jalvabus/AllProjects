import { Component, ViewChild } from '@angular/core';
import { Nav, ModalController, AlertController, Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoadingController, Loading } from 'ionic-angular';

import { Home } from '../home/home'
import { Login } from '../login/login'
import { MapaGlobal } from '../mapa-global/mapa-global'
import { Cuenta } from '../cuenta/cuenta'
import { Soporte } from '../soporte/soporte'
import { Tutorial } from '../tutorial/tutorial'
import { Tienda } from '../tienda/tienda'
import { Dispositivos } from '../dispositivos/dispositivos'
import { LoginService } from '../../providers/login-service'

@Component({
  selector: 'page-contenido',
  templateUrl: 'contenido.html',
})
export class Contenido {
  @ViewChild(Nav) nav: Nav;

  loading: Loading;
  usuario: any = {
    nombre: '',
    apellidos: '' 
  }
  rootPage: any = Home;
  activePage: any;
  pages: Array<{ title: string, component: any, icon: string }>;
  constructor(public loginService: LoginService, public navCtrl: NavController, public loadingCtrl: LoadingController, public platform: Platform, public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.loginService.fetchUsuario()
      .then((usuario) => {
        this.usuario = usuario;
      })
      .catch((err) => {
        this.openLogout();
      })

    this.pages = [
      { title: 'Mapa', component: MapaGlobal, icon: 'map' },
      { title: 'Vehiculos', component: Home, icon: 'car' },
      { title: 'Dispositivos/Tienda', component: Dispositivos, icon: 'cart' },
      { title: 'Soporte', component: Soporte, icon: 'chatbubbles' }];
    this.activePage = this.pages[1];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contenido');
  }

  openCuenta() {
    this.navCtrl.push(Cuenta);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cerrando sesión...'
    });
    this.loading.present();
  }

  openTutorial() {
    this.navCtrl.push(Tutorial);
  }

  openLogout() {
    this.showLoading();
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
    this.loading.dismiss();
    this.nav.setRoot(Login);
  }


  menuActive(page) {
    return page == this.activePage;
  }



}
