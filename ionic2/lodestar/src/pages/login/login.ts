import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoadingController, Loading } from 'ionic-angular';
import { Contenido } from '../contenido/contenido'
import { LoginService } from '../../providers/login-service';
import { FormularioRegistro } from '../formulario-registro/formulario-registro'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loading: Loading;
  datos: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private auth: LoginService, private alertCtrl: AlertController, private localStorage: LocalStorageService) {
    this.datos = {
      correo_electronico: '',
      password: ''
    };
  }

  public login() {

    this.showLoading();
    this.auth.login(this.datos).then((datos: any) => {
      window.localStorage.setItem('token', datos.token);
      window.localStorage.setItem('usuario', datos.usuario);

      this.loading.dismiss();
      this.navCtrl.setRoot(Contenido);

    }).catch((err) => {
      this.datos = { correo_electronico: '', contrasena: '' }
      this.alerta("Correo electrónico y/o contraseña inválidos.");
    })
  }

  formularioRegistro() {
    this.navCtrl.push(FormularioRegistro);
  }

  public olvideContrasena() {
    let prompt = this.alertCtrl.create({
      title: 'Olvidé mi contraseña...',
      message: "Ingrese su correo electrónico para recuperar su contraseña...",
      inputs: [
        {
          name: 'correo_electronico',
          placeholder: 'Correo electrónico'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Enviar',
          handler: data => {

            this.auth.recuperarContrasena(data.correo_electronico)
              .then((ok) => {
                let alert = this.alertCtrl.create({
                  title: 'Recuperación de contraseña',
                  subTitle: "Te hemos enviado un correo electrónico con los datos necesarios.",
                  buttons: ['Aceptar']
                });
                alert.present();
              })
              .catch((err) => {
                let alert = this.alertCtrl.create({
                  title: 'Algo salió mal...',
                  subTitle: "Usuario no encontrado.",
                  buttons: ['Aceptar']
                });
                alert.present();
              })



          }
        }
      ]
    });
    prompt.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    this.loading.present();
  }


  public alerta(message) {

    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Algo salió mal...',
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }



}
