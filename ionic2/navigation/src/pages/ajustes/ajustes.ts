import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})

export class AjustesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController) {
  }

  activarPrincipal() {
    this.navCtrl.parent.select(3);
  }

  mostrarModal() {
    let modal = this.modalController.create(ModalPage, { nombre: "Juan", edad: 20 });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

}
