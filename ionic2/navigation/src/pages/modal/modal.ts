import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  usuario: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
    this.usuario.nombre = navParams.get("nombre");
    this.usuario.edad = navParams.get("edad");
  }

  cerrarConParametros() {
    let data = {
      nombre: "Ivonne",
      edad: 21
    }
    this.viewController.dismiss(data);
  }

  cerrarSinParametros() {
    this.viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
