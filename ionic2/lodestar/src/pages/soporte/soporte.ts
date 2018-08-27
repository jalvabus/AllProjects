import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-soporte',
  templateUrl: 'soporte.html',
})
export class Soporte {

  mensaje: any = {
    titulo: '',
    descripcion: '',
    mensaje: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Soporte');
  }

}
