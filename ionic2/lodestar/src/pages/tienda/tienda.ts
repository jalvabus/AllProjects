import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Loading, LoadingController } from 'ionic-angular';

import { PagoService } from '../../providers/pago-service'

declare var Conekta;

@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class Tienda {

  public token;
  public error;
  loading: Loading;

  precio = 6720;
  precioTotal = 0;

  datos: any = {
    gps: 0,
    tiempo: 0,
    metodoPago: ""
  }

  calcularPrecio(){
    this.precioTotal = this.precio * this.datos.gps * this.datos.tiempo;    
  }

  tokenParams = {
    "card": {
      "number": "",
      "name": "",
      "exp_year": "",
      "exp_month": "",
      "cvc": "",
      "address": {
        "street1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      }
    }
  };

  constructor(public pagoService: PagoService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    Conekta.setPublishableKey("key_BvE7eNaBW2sdGZqgpzdomnA");
    Conekta.setLanguage("es");
  }

  comprar() {
    if (this.datos.metodoPago == "tarjeta") {
      this.generarCompraTarjeta();
    } else if (this.datos.metodoPago == "oxxo") {

    }
  }

  generarCompraTarjeta() {
    this.showLoading();
    this.generarToken()
      .then((token) => {
        this.datos.token = token;
        this.pagoService.generarOrden(this.datos)
          .then((res) => {
            console.log(res);
            this.loading.dismiss();
          })
          .catch((err) => {
            console.log(err);
            this.loading.dismiss();
          })

      })
      .catch((error) => {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Los datos ingresados son inválidos.',
          buttons: ['Aceptar']
        });

        alert.present();

        console.log(error);
      })
  }

  generarToken() {
    return new Promise((resolve, reject) => {
      Conekta.token.create(this.tokenParams, function (token) { resolve(token) }, function (error) { reject(error) })
    })
  }

  generarOrden() {
    console.log('Generar orden: ' + this.token);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.loading.present();
  }
}

