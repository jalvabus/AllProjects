import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Pagina3Page } from '../index.paginas';

@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  mutantes: any = [
    {
      nombre: "Magneto",
      poder: "Controlar Metales",
      imagen: "https://vignette.wikia.nocookie.net/avatarindonesia/images/8/8b/The_Promise_hardcover.png/revision/latest?cb=20130117101749"
    },
    {
      nombre: "Wolverine",
      poder: "Regeneracion",
      imagen: "https://vignette.wikia.nocookie.net/avatarindonesia/images/8/8b/The_Promise_hardcover.png/revision/latest?cb=20130117101749"
    },
    {
      nombre: "Dr X", poder: "Mentalismo",
      imagen: "https://vignette.wikia.nocookie.net/avatarindonesia/images/8/8b/The_Promise_hardcover.png/revision/latest?cb=20130117101749"
    },
    {
      nombre: "Iron man",
      poder: "Super inteligencia",
      imagen: "https://vignette.wikia.nocookie.net/avatarindonesia/images/8/8b/The_Promise_hardcover.png/revision/latest?cb=20130117101749"
    }
  ];

  pagina3: any = Pagina3Page;

  irPagina3(mutante: any) {
    this.navCtrl.push(Pagina3Page, { mutante: mutante });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
  }

}
