import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Errepar - Demo Recomendador';

  listaTipoPersona = ['Física', 'Jurídica', 'N/D'];
  listaTiposDebitoAutomatico = ['SI', 'NO', 'N/D'];
  listaCantidadSuscripciones = Array.from(Array(14).keys());
  listaSuscripciones = [
    'COL ERREPAR CONSULTOR TRIBUTARIO', 'ERREIUS ON LINE',
    'COL ERREPAR SANTA FE EOL (10)', 'ERREIUS ON LINE (DEMO)',
    'COL ERREPAR CONSULTOR TRIBUTARIO', 'ENC. LAB. CLASICA PAPEL- 5 T. + DP',
    'ENC. LAB. CLASICA PAPEL- 5 T.', 'COL ERREPAR RURAL',
    'ENC. TRIB. CLASICA EOL (3)', 'ERREIUS (20)'
  ];
  listaDomicilios = [
    'CIUDAD AUTONOMA BUENOS AIRES', 'CORDOBA', 'ROSARIO', 'LA PLATA', 'SANTA FE',
    'MAR DEL PLATA', 'SALTA', 'MENDOZA', 'SAN MIGUEL DE TUCUMAN', 'BAHIA BLANCA',
    'N/D'
  ];

  // Variables input del formulario
  tipoPersonaSeleccionado = undefined;
  edadIngresada = undefined;
  tasaEOLIngresada = undefined;
  tasaIUSIngresada = undefined;
  tipoDebitoAutomaticoSeleccionado = undefined;
  scoreIngresado = undefined;

  suscripcion = [];

  domicilioIngresadoA = undefined;
  domicilioIngresadoB = undefined;

  constructor(private http: HttpClient) {}

  enviarDatos() {
    const datosObtenidos = {
      TipoPersona: this.tipoPersonaSeleccionado,
      Edad: this.edadIngresada,
      TasaEOL: this.tasaEOLIngresada,
      TasaIUS: this.tasaIUSIngresada,
      DebitoAutomatico: this.tipoDebitoAutomaticoSeleccionado,
      Score: this.scoreIngresado,
      suscripcion_1: this.suscripcion[0],
      suscripcion_2: this.suscripcion[1],
      suscripcion_3: this.suscripcion[2],
      suscripcion_4: this.suscripcion[3],
      suscripcion_5: this.suscripcion[4],
      suscripcion_6: this.suscripcion[5],
      suscripcion_7: this.suscripcion[6],
      suscripcion_8: this.suscripcion[7],
      suscripcion_9: this.suscripcion[8],
      suscripcion_10: this.suscripcion[9],
      suscripcion_11: this.suscripcion[10],
      suscripcion_12: this.suscripcion[11],
      suscripcion_13: this.suscripcion[12],
      suscripcion_14: this.suscripcion[13],
      localidad_1: this.domicilioIngresadoA,
      localidad_2: this.domicilioIngresadoB
    };

    const csvLines = [];
    csvLines.push(
      'TipoPersona,Edad,TasaEOL,TasaIUS,DebitoAutomatico,Score,' +
      'suscripcion_1,suscripcion_2,suscripcion_3,suscripcion_4,suscripcion_5,' +
      'suscripcion_6,suscripcion_7,suscripcion_8,suscripcion_9,suscripcion_10,' +
      'suscripcion_11,suscripcion_12,suscripcion_13,suscripcion_14,localidad_1,' +
      'localidad_2\n'
    );
    csvLines.push(
      datosObtenidos.TipoPersona + ',' + datosObtenidos.Edad + ',' + datosObtenidos.TasaEOL + ',' +
      datosObtenidos.TasaIUS + ',' + datosObtenidos.DebitoAutomatico + ',' + datosObtenidos.Score + ',' +
      datosObtenidos.suscripcion_1 + ',' + datosObtenidos.suscripcion_2 + ',' + datosObtenidos.suscripcion_3 + ',' +
      datosObtenidos.suscripcion_4 + ',' + datosObtenidos.suscripcion_5 + ',' + datosObtenidos.suscripcion_6 + ',' +
      datosObtenidos.suscripcion_7 + ',' + datosObtenidos.suscripcion_8 + ',' + datosObtenidos.suscripcion_9 + ',' +
      datosObtenidos.suscripcion_10 + ',' + datosObtenidos.suscripcion_11 + ',' + datosObtenidos.suscripcion_12 + ',' +
      datosObtenidos.suscripcion_13 + ',' + datosObtenidos.suscripcion_14 + ',' +
      datosObtenidos.localidad_1 + ',' + datosObtenidos.localidad_2
    );

    const csvProvisorio = [
      'TipoPersona,Edad,TasaEOL,TasaIUS,DebitoAutomatico,Score,suscripcion_1,suscripcion_2,suscripcion_3,suscripcion_4,suscripcion_5,suscripcion_6,suscripcion_7,suscripcion_8,suscripcion_9,suscripcion_10,suscripcion_11,suscripcion_12,suscripcion_13,suscripcion_14,localidad_1,localidad_2\n',
      '1,0,15,0,0,9.0,0,33,33,33,33,33,33,33,33,33,33,33,33,33,CIUDAD AUTONOMA BUENOS AIRES,0'
    ];

    console.log(csvLines);

    const csvFile = new File(csvProvisorio, 'temp.csv');

    const form = new FormData();
    form.append('client_data', csvFile);

    this.http.post('http://localhost:5000/predict', form).subscribe(response => {
      console.log(response);
    });
  }
}
