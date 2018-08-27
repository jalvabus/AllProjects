import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { GpsService } from '../../providers/gps-service'
import { VehiculoService } from '../../providers/vehiculo-service'
import { LoginService } from '../../providers/login-service'
import { LocalizacionService } from '../../providers/localizacion-service'
import { Http } from '@angular/http';
import { LoadingController, Loading, Events } from 'ionic-angular';

import { ActionSheetController } from 'ionic-angular';

import { Mapa } from '../mapa/mapa'
import { Geovalla } from '../geovalla/geovalla'
import { Rutas } from '../rutas/rutas'
import { ModificarVehiculo } from '../modificar-vehiculo/modificar-vehiculo'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  loading: Loading;

  usuario: any;
  vehiculos: any = [];

  constructor(private loadingCtrl: LoadingController, public http: Http, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, private localizacionService: LocalizacionService, private loginService: LoginService, private vehiculoService: VehiculoService, private gpsService: GpsService, private alertCtrl: AlertController, private localStorage: LocalStorageService, public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuario();
  }

  goMap(gps) {
    this.navCtrl.push(Mapa, { idGps: gps });
  }

  goGeovalla(gps) {
    this.navCtrl.push(Geovalla, { idGps: gps });
  }

  goHistorial(gps) {
    this.navCtrl.push(Rutas, { idGps: gps });
  }

  presentActionSheet(vehiculo) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones',
      buttons: [
        {
          text: 'Geovalla',
          handler: () => {
            this.goGeovalla(vehiculo.gps._id);
          }
        }, {
          text: 'Historial',
          handler: () => {
            this.goHistorial(vehiculo.gps._id);
          }
        }, {
          text: 'Inicializar Dispositivo',
          handler: () => {

          }
        },

      ]
    });
    actionSheet.present();
  }

  modificarVehiculo(vehiculo) {
    this.navCtrl.push(ModificarVehiculo, { vehiculo });
  }

  getUsuario() {
    this.loginService.fetchUsuario()
      .then((usuario: any) => {
        this.usuario = usuario;
        this.vehiculos = usuario.vehiculos;

      })
      .catch((err) => {
        console.log(err);
      })
  }

  abrirRegistrarVehiculo() {
    let prompt = this.alertCtrl.create({
      title: 'Registrar vehículo',
      message: "Ingrese el ID de su GPS.",
      inputs: [
        {
          name: 'modelo',
          placeholder: 'Modelo'
        }, {
          name: 'marca',
          placeholder: 'Marca'
        }, {
          name: 'placas',
          placeholder: 'Placas'
        },
        {
          name: 'id_gps',
          placeholder: 'ID GPS'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.gpsService.comprobarGps(data)
              .then((respuesta) => {
                data.gps = respuesta
                this.vehiculoService.registrarVehiculo(data)
                  .then((registrado) => {
                    this.getUsuario();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              })
              .catch((err) => {
                console.log(err);
                let alert = this.alertCtrl.create({
                  title: err.title,
                  subTitle: err.message,
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

  obtenerDireccion(ultimaLocalizacion) {

  }

  apagar(idGps) {

    let confirm = this.alertCtrl.create({
      title: 'Apagar vehículo',
      message: '¿Seguro que desea apagar el vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.apagando();
            this.gpsService.apagarVehiculo(idGps)
              .subscribe((res) => {
                this.getUsuario();
              })
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  prender(idGps) {
    let confirm = this.alertCtrl.create({
      title: 'Encender vehículo',
      message: '¿Seguro que desea encender el vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.prendiendo();
            this.gpsService.activarVehiculo(idGps)
              .subscribe((res) => {
                this.getUsuario();
              })
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }


  apagando() {
    this.loading = this.loadingCtrl.create({
      content: 'Apagando vehiculo...'
    });
    this.loading.present();
  }

  prendiendo() {
    this.loading = this.loadingCtrl.create({
      content: 'Encendiendo vehiculo...'
    });
    this.loading.present();
  }
}
