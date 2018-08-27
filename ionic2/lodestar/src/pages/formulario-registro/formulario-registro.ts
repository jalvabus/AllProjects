import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { LoadingController, Loading } from 'ionic-angular';

import { Login } from '../login/login'

@Component({
  selector: 'page-formulario-registro',
  templateUrl: 'formulario-registro.html',
})
export class FormularioRegistro {

  datosUsuario: any;
  loading: Loading;


  constructor(private alertCtrl: AlertController, public loadingCtrl: LoadingController, private login: LoginService, public navCtrl: NavController, public navParams: NavParams) {

    this.datosUsuario = {
      nombre: '',
      apellidos: '',
      telefono: '',
      celular: '',
      empresa: '',
      correo_electronico: '',
      password: ''
    }

  }

  registrar() {
    this.showLoading();
    this.login.registrarUsuario(this.datosUsuario).then((respuesta) => {
      this.loading.dismiss();
      this.alerta('Registro exitoso');
      this.navCtrl.setRoot(Login);
    })
      .catch((err) => {
        this.loading.dismiss();
        this.alerta('Error al registrar');
      })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando...'
    });
    this.loading.present();
  }


  public alerta(message) {

    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Registro',
      subTitle: message,
      buttons: ['OK ']
    });
    alert.present();
  }


}
