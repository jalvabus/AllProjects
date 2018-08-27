import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class Tutorial {

  slides = [
    {
      title: "Bienvenido a Lodestar" /*"Welcome to the Docs!"*/,
      description: "Conoce todas las funciones de la aplicación y aprende a utilizarlas."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/logo.png"/*"assets/img/ica-slidebox-img-1.png"*/
    },
    {
      title: "Registra tu vehículo" /*"Welcome to the Docs!"*/,
      description: "Llena el formulario con los datos de tu auto o máquina, después ingresa el ID que viene en el equipo rastreador que compraste con nosotros."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/registro.gif"/*"assets/img/ica-slidebox-img-1.png"*/
    },
    {
      title: "Localización en tiempo real" /*"Welcome to the Docs!"*/,
      description: "Localiza tu vehículo en tiempo real. ¿Sabías que somos el único servicio que rastrea cada 2 segundos?."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/tutorial.png"/*"assets/img/ica-slidebox-img-1.png"*/
    },
    {
      title: "Geovalla" /*"Welcome to the Docs!"*/,
      description: "Delimita el area en la que te gustaría que permanezan tus vehículos y selecciona la acción deseada."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/geovalla.gif"/*"assets/img/ica-slidebox-img-1.png"*/
    },
    {
      title: "Historial de Rutas" /*"Welcome to the Docs!"*/,
      description: "Consulta la ruta tomada por tu vehículo de una manera sencilla."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/rutas.gif"/*"assets/img/ica-slidebox-img-1.png"*/
    },
    {
      title: "Tienda" /*"Welcome to the Docs!"*/,
      description: "Aquiere más dispositivos para tu flotilla de una manera sencilla."/*"The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic."*/,
      image: "assets/img/tienda.gif"/*"assets/img/ica-slidebox-img-1.png"*/
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tutorial');
  }

}
