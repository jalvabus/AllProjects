import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service'
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class Cuenta {

  datosUsuario: any = {

  }

  datosForm: any = {

  }

  constructor(private alertCtrl: AlertController, private loginService: LoginService, public navCtrl: NavController, public navParams: NavParams) {
    loginService.fetchUsuario().then((usuario: any) => {

      this.datosUsuario = usuario;
      this.datosForm._id = usuario._id;
      this.datosForm.nombre = usuario.nombre;
      this.datosForm.apellidos = usuario.apellidos;
      this.datosForm.telefono = usuario.telefono;
      this.datosForm.celular = usuario.celular;
      this.datosForm.empresa = usuario.empresa;

    })
  }

  alertContrasena() {
    let alert = this.alertCtrl.create({
      title: 'Modificar contraseña',
      inputs: [
        {
          name: 'actual',
          placeholder: 'Contraseña actual',
          type: 'password'
        },
        {
          name: 'nueva',
          placeholder: 'Nueva contraseña',
          type: 'password'
        },
        {
          name: 'confirmacion',
          placeholder: 'Confirmar contraseña',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: datos => {
            if (datos.nueva === datos.confirmacion) {
              this.loginService.cambiarContrasena(datos)
                .then((respuesta) => {
                  let alert = this.alertCtrl.create({
                    title: 'Éxito',
                    subTitle: 'Contraseña modificada con éxito',
                    buttons: ['Aceptar']
                  });
                  alert.present();
                })
                .catch((err) => {
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Verifique que los datos son correctos.',
                    buttons: ['Aceptar']
                  });
                  alert.present();
                })
            } else {
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Verifique que los datos son correctos.',
                buttons: ['Aceptar']
              });
              alert.present();
            }
          }
        }
      ]
    });
    alert.present();
  }

  modificar() {
    this.loginService.modificarUsuario(this.datosForm)
      .then((usuario) => {
        let alert = this.alertCtrl.create({
          title: 'Éxito',
          subTitle: 'Usuario modificado con éxito',
          buttons: ['Aceptar']
        });
        alert.present();
      })
      .catch((err) => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Error al modificar usuario, intente de nuevo.',
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cuenta');
  }

}
