import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalizacionService } from '../../providers/localizacion-service';
import { RutasMap } from '../rutas-map/rutas-map'
@Component({
  selector: 'page-rutas',
  templateUrl: 'rutas.html',
})
export class Rutas {

 idGps;

  fechaSeleccionada = false;

  valores = {
    lower: 0,
    upper: 24
  }

  fechas = {
    fechaInicial: ''
  }

  horas = {
    horaIncial: '00:00',
    horaFinal: '24:00'
  }

  constructor(public alertCtrl: AlertController, public localizacionService: LocalizacionService, public navCtrl: NavController, public navParams: NavParams) {
    this.idGps = navParams.get('idGps');
  }

  eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        this.fechas.fechaInicial = ev.selectedTime;
        this.fechaSeleccionada = true;
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

  ingresarFecha() {
    this.fechaSeleccionada = true;
  }

  goMap() {
    var fecha = this.fechas.fechaInicial;
    var horaInicio = new Date(fecha);
    horaInicio.setHours(this.valores.lower);
    var horaFinal = new Date(fecha);
    horaFinal.setHours(this.valores.upper);



    var fechas = {
      fechaInicial: horaInicio,
      fechaFinal: horaFinal
    }

    console.log(fechas);

    this.localizacionService.getLocalizacionesFecha(this.idGps, fechas).then((localizaciones: any) => {
      if (localizaciones.length > 0) {
        this.navCtrl.push(RutasMap, { idGps: this.idGps, fechas, localizaciones });
      } else {
        let alert = this.alertCtrl.create({
          title: 'Historial',
          subTitle: "No se encontraron rutas",
          buttons: ['OK ']
        });
        alert.present();
      }
    });

  }

  formatearHoras() {
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
