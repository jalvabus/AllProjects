import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehiculoService } from '../../providers/vehiculo-service'

@Component({
  selector: 'page-modificar-vehiculo',
  templateUrl: 'modificar-vehiculo.html',
})
export class ModificarVehiculo {

  vehiculo: any = {

  } 

  constructor(private vehiculoService: VehiculoService, public navCtrl: NavController, public navParams: NavParams) {
    this.vehiculo = navParams.get('vehiculo');  
    console.log(this.vehiculo);
  }

  modificar(){
    this.vehiculoService.modificarVehiculo(this.vehiculo)
    .then((vehiculo)=>{
      this.vehiculo = vehiculo;      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarVehiculo');
  }

}
