import { Component } from '@angular/core';

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
}
