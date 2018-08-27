import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController, Loading, Events } from 'ionic-angular';
import { LocalizacionService } from '../../providers/localizacion-service'
import { GpsService } from '../../providers/gps-service'
import "rxjs/add/operator/takeWhile";

declare var google;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})

export class Mapa {

  loading: Loading;
  idGps: String;
  prendido: Boolean;
  private alive: boolean = true;

  datosGps;
  localizacion: any;

  public map;

  public carMarkers;

  private s;

  constructor(private alertCtrl: AlertController, private localizacionService: LocalizacionService, private gpsService: GpsService, public params: NavParams, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.idGps = params.get('idGps');

    this.gpsService.obtenerGps(this.idGps).subscribe((res) => {
      this.datosGps = res.gps;
      this.prendido = res.gps.prendido;
    });

    this.carMarkers = [];

    this.s = this.localizacionService.obtenerLocalizacion2segs(this.idGps).takeWhile(() => this.alive).subscribe((localizacion) => {
      this.actualizarMarcador(localizacion);
    })

  }

  ionViewWillLeave() {
    this.alive = false;
  }

  ngOnInit() {
    this.showLoading();
    this.localizacionService.obtenerLocalizacion(this.idGps)
      .then((localizacion: any) => {
        console.log(localizacion);
        this.map = this.createMap(new google.maps.LatLng(localizacion[0].lat, localizacion[0].lng));
        this.agregarMarcador(localizacion);
        this.loading.dismiss();
      }).catch((err) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'No disponible',
          subTitle: 'Por el momento no hay una localización disponible, por favor intente de nuevo en unos minutos.',
          buttons: ['Aceptar']
        });
        alert.present();
      })

    this.navCtrl.getPrevious();

  }

  actualizarMarcador(localizacion) {
    for (var i = 0; i < this.carMarkers.length; i++) {
      this.carMarkers[i].setPosition(new google.maps.LatLng(localizacion[0].lat, localizacion[0].lng));
      return;
    }
  }

  cargarLocalizacion() {
    this.showLoading();
    this.localizacionService.obtenerLocalizacion(this.idGps).then((localizacion: any) => {
      this.actualizarMarcador(localizacion);
      this.map.setCenter(new google.maps.LatLng(localizacion[0].lat, localizacion[0].lng));
      this.map.setZoom(18);
      this.loading.dismiss();
    })
  }

  agregarMarcador(localizacion) {
    var imagen = 'https://image.ibb.co/kjhz25/ping.png';

    let carMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(localizacion[0].lat, localizacion[0].lng)
      , icon: imagen
    });

    carMarker.set('id', 1);
    this.carMarkers.push(carMarker);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando localización...'
    });
    this.loading.present();
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


  createMap(location) {
    let mapOptions = {
      center: location,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapElement = document.getElementById('map');
    let map = new google.maps.Map(mapElement, mapOptions);

    return map;
  }

  apagar() {

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
            this.gpsService.apagarVehiculo(this.idGps)
              .subscribe((res) => {
              })
            this.prendido = false;
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  prender() {
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
            this.gpsService.activarVehiculo(this.idGps)
              .subscribe((res) => {
              })
            this.prendido = true;
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }




}
