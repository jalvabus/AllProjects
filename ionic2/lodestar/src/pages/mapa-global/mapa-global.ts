import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service'

declare var google;

@Component({
  selector: 'page-mapa-global',
  templateUrl: 'mapa-global.html',
})
export class MapaGlobal {

  public map;
  private carMarkers = [];
  public usuario;
  public vehiculos;

  constructor(private loginService: LoginService, public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuario();

  }

  ngOnInit() {
  }

  getUsuario() {
    this.loginService.fetchUsuario()
      .then((usuario: any) => {
        this.usuario = usuario;
        this.vehiculos = usuario.vehiculos;
        this.map = this.createMap(new google.maps.LatLng(this.vehiculos[0].gps.ultimaLocalizacion.lat, this.vehiculos[0].gps.ultimaLocalizacion.lng));
        this.agregarMarcadores(this.vehiculos);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  agregarMarcadores(vehiculos) {

    var imagen = 'https://image.ibb.co/kjhz25/ping.png';
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < vehiculos.length; i++) {

      var vehiculo = vehiculos[i];
      if (vehiculo.gps.ultimaLocalizacion) {

        console.log(vehiculo.gps.ultimaLocalizacion);

        let carMarker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(vehiculo.gps.ultimaLocalizacion.lat, vehiculo.gps.ultimaLocalizacion.lng)
          , icon: imagen
        });

        google.maps.event.addListener(carMarker, 'click', (function (marker, i) {
          return function () {
            var contentString = '<b>' + vehiculos[i].marca + ' ' + vehiculos[i].modelo + ' - ' + vehiculos[i].placas + '</b><br>'

            infoWindow.setContent(contentString);
            infoWindow.open(this.map, carMarker);
          }
        })(carMarker, i));

        carMarker.set('id', i + 1);
        this.carMarkers.push(carMarker);
      }
    }
  }

  createMap(location) {

    let mapOptions = {
      center: location,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapElement = document.getElementById('map-global');
    let map = new google.maps.Map(mapElement, mapOptions);

    return map;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaGlobal');
  }

}
