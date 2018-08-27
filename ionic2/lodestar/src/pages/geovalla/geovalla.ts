import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GpsService } from '../../providers/gps-service';
import { LocalizacionService } from '../../providers/localizacion-service';
import { AlertController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-geovalla',
  templateUrl: 'geovalla.html',
})



export class Geovalla {

  public map;

  idGps;
  gps;
  localizacion;
  public carMarkers = [];
  geovalla;

  constructor(private alertCtrl: AlertController, private localizacionService: LocalizacionService, private gpsService: GpsService, public navCtrl: NavController, public navParams: NavParams) {
  }

  agregarMarcador(localizacion) {

    var imagen = 'https://image.ibb.co/kjhz25/ping.png';

    let carMarker = new google.maps.Marker({
      map: this.map,
      position: localizacion,
      icon: imagen
    });

    carMarker.set('id', 1);
    this.carMarkers.push(carMarker);
  }

  ngOnInit() {

    this.idGps = this.navParams.get('idGps');

    this.gpsService.obtenerGps(this.idGps).subscribe((res) => {
      this.gps = res.gps;
      this.geovalla = res.gps.geovalla;
      if (this.geovalla.features.length > 0) {
        console.log(this.geovalla.features[0].geometry.coordinates);
      }
      else {
        console.log('No hay geovalla');
      }
    })

    this.localizacionService.obtenerLocalizacion(this.idGps).then((res: any) => {
      this.localizacion = new google.maps.LatLng(res[0].lat, res[0].lng);
      this.map = this.createMap(this.localizacion);
      this.agregarMarcador(new google.maps.LatLng(res[0].lat, res[0].lng));

      this.map.data.setControls(['Polygon']);
      this.map.data.setStyle({
        editable: true,
        draggable: true
      });
    })




  }

  showCheckbox() {

    var datos;

    this.map.data.toGeoJson(function (json) {
      datos = json;
    });

    if (datos.features.length > 0) {

      let alert = this.alertCtrl.create();
      alert.setTitle('¿Qué función tiene la geovalla?');
      alert.addInput({
        type: 'checkbox',
        label: 'Alertar',
        value: 'alertar true',
        checked: true
      });

      alert.addInput({
        type: 'checkbox',
        label: 'Apagar',
        value: 'apagar true'
      });

      alert.addButton('Cancelar');

      alert.addButton({
        text: 'Guardar',
        handler: data => {

          var funciones = {
            alertar: false,
            apagar: false
          };

          for (var i = 0; i < data.length; i++) {
            var datos = data[i].split(' ');
            if (datos[0] === 'alertar' && datos[1] === 'true') {
              funciones.alertar = true;
            } else if (datos[0] === 'apagar' && datos[1] === 'true') {
              funciones.apagar = true;
            }

          }
          console.log(funciones);
          
          this.savePolygon();


        }
      });
      alert.present();
    }
    else {


    }

  }

  createMap(location) {

    let mapOptions = {
      center: location,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapElement = document.getElementById('mapGeofence');
    let map = new google.maps.Map(mapElement, mapOptions);

    return map;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Geovalla');
  }

  savePolygon() {

    var datos;

    this.map.data.toGeoJson(function (json) {
      datos = json;
    });

    this.localizacionService.guardarGeovalla(this.idGps, datos)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  guardarFuncionesGeovalla(funciones) {
    this.localizacionService.guardarFuncionGeovalla(this.idGps, funciones)
    .then()
    .catch()
    
  }

  borrar() {
    var map = this.map;
    this.map.data.forEach(function (f) {
      map.data.remove(f);
    });
  }

  cargarValla(map) {
    map.data.addGeoJson(this.geovalla);
  }

}
