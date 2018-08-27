import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HttpModule } from '@angular/http';
import { LoginService } from '../providers/login-service';
import { GpsService } from '../providers/gps-service'
import { VehiculoService } from '../providers/vehiculo-service'
import { LocalizacionService } from '../providers/localizacion-service'
import { PagoService } from '../providers/pago-service'

/////////////////////////////PAGINAS///////////////////////////////////

import { MyApp } from './app.component';
import { Login } from '../pages/login/login'
import { Contenido } from '../pages/contenido/contenido'
import { Mapa } from '../pages/mapa/mapa'
import { Geovalla } from '../pages/geovalla/geovalla'
import { MapaGlobal } from '../pages/mapa-global/mapa-global'
import { Cuenta } from '../pages/cuenta/cuenta'
import { Soporte } from '../pages/soporte/soporte'
import { Tutorial } from '../pages/tutorial/tutorial'
import { Rutas } from '../pages/rutas/rutas'
import { RutasMap } from '../pages/rutas-map/rutas-map'
import { ModificarVehiculo } from '../pages/modificar-vehiculo/modificar-vehiculo'
import { Tienda } from '../pages/tienda/tienda'
import { Dispositivos } from '../pages/dispositivos/dispositivos'

import { Home } from '../pages/home/home';
import { FormularioRegistro } from '../pages/formulario-registro/formulario-registro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Home,
    FormularioRegistro,
    Contenido,
    Mapa,
    Geovalla,    
    MapaGlobal,
    Cuenta,
    Soporte,
    Rutas,
    Tutorial,
    RutasMap,
    ModificarVehiculo,
    Tienda,
    Dispositivos
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Home,
    FormularioRegistro,
    Contenido,
    Mapa,
    Geovalla,
    MapaGlobal,
    Cuenta,
    Soporte,
    Rutas,
    Tutorial,
    RutasMap ,
    ModificarVehiculo   ,
    Tienda,
    Dispositivos
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    GpsService,
    VehiculoService,
    LocalizacionService,
    PagoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
