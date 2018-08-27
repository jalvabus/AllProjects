import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Tienda } from '../tienda/tienda'
import { AlertController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service'

@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class Dispositivos {
 
  vehiculos;

  constructor(private loginService: LoginService,private alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuario();
}

  presentTiendaModal() {

    let alert = this.alertCtrl.create({
      title: 'Estamos en eso...',
      subTitle: 'Módulo en desarrollo.',
      buttons: ['Aceptar']
    });
    alert.present();

   /* let profileModal = this.modalCtrl.create(Tienda);
    profileModal.present();*/
  }

   getUsuario() {
    this.loginService.fetchUsuario()
      .then((usuario: any) => {
        this.vehiculos = usuario.vehiculos;

      })
      .catch((err) => {
        console.log(err);
      })
  }

}
