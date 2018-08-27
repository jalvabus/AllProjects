import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Pagina2Page } from '../index.paginas';
import { Pagina3Page } from '../index.paginas';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuController: MenuController) {
  }

  pagina3: any = Pagina3Page;
  
  cambiarPagina() {
    this.navCtrl.push(Pagina2Page);
  }

  mostrarMenu() {
    this.menuController.toggle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

}
