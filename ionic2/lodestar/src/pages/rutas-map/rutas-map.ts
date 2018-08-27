import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalizacionService } from '../../providers/localizacion-service';

declare var google;

@Component({
  selector: 'page-rutas-map',
  templateUrl: 'rutas-map.html',
})
export class RutasMap {

  localizacionInicial;
  localizaciones;
  public map;

  valores = {
    lower: 0,
    upper: 24
  }

  fechas: any = {
    fechaInicial: '',
    fechaFinal: ''
  }

  horas = {
    horaIncial: '00:00',
    horaFinal: '24:00'
  }

  localizacionesMapa = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private localizacionService: LocalizacionService) {

    this.localizaciones = navParams.get('localizaciones');
    this.localizacionInicial = this.localizaciones[0];

    this.cargarLocalizaciones(navParams.get('fechas'));

  }

  ngOnInit() {
    this.localizaciones = this.navParams.get('localizaciones');
    this.map = this.createMap();

  }



  createMap() {

    var myOptions = {
      zoom: 16,
      center: this.localizacionInicial
    },

    map = new google.maps.Map(document.getElementById('mapHistorial'), myOptions);

    var coord = this.localizacionesMapa;
    var line = new google.maps.Polyline({
      path: coord,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    line.setMap(map);
    return map;
  }

  cargarLocalizaciones(fechas) {
    this.formatearHora();
    this.localizacionService.getLocalizacionesFecha(this.navParams.get('idGps'), fechas).then((localizaciones: any) => {
      this.localizacionesMapa = [];

      for (var i = 0; i < localizaciones.length; i++) {
        if (i % 2 == 0) {
          this.localizacionesMapa.push(localizaciones[i]);
        }
      }

      var locT = [];

      for (var i = 0; i < this.localizacionesMapa.length; i++) {
        if (i % 2 == 0) {
          locT.push(this.localizacionesMapa[i]);
        }
      }

      locT = [];

      for (var i = 0; i < this.localizacionesMapa.length; i++) {
        if (i % 2 == 0) {
          locT.push(this.localizacionesMapa[i]);
        }
      }

      this.localizacionesMapa = locT;

      this.createMap();
    });
  }

  formatearHora() {

    var fechasP = this.navParams.get('fechas');

    var fecha = fechasP.fechaInicial;
    var horaInicio = new Date(fecha);
    horaInicio.setHours(this.valores.lower);
    var horaFinal = new Date(fecha);
    horaFinal.setHours(this.valores.upper);

    this.fechas = {
      fechaInicial: horaInicio,
      fechaFinal: horaFinal
    }

    if (this.valores.lower < 10) {
      this.horas.horaIncial = '0' + this.valores.lower + ':00'
    } else {
      this.horas.horaIncial = this.valores.lower + ':00'
    }

    if (this.valores.upper < 10) {
      this.horas.horaFinal = '0' + this.valores.upper + ':00'
    } else {
      this.horas.horaFinal = this.valores.upper + ':00'
    }
  }


}
