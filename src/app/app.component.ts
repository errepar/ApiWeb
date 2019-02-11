import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';

export class DatosClasificacion {
  prediccionesRawTema: number[];
  prediccionesRawSubtema: number[];
  prediccionesRawBehaviour: number[];
  categoriasAsociadasTema: number[];
  categoriasAsociadasSubtema: number[];
  categoriasAsociadasBehaviour: number[];
  prediccionFinalTema: number;
  prediccionFinalSubtema: number;
  prediccionFinalBehaviour: number;

  constructor(
    prediccionesRawTema: number[],
    prediccionesRawSubtema: number[],
    prediccionesRawBehaviour: number[],
    categoriasAsociadasTema: number[],
    categoriasAsociadasSubtema: number[],
    categoriasAsociadasBehaviour: number[],
    prediccionFinalTema: number,
    prediccionFinalSubtema: number,
    prediccionFinalBehaviour: number
  ) {
    this.prediccionesRawTema = prediccionesRawTema;
    this.prediccionesRawSubtema = prediccionesRawSubtema;
    this.prediccionesRawBehaviour = prediccionesRawBehaviour;
    this.categoriasAsociadasTema = categoriasAsociadasTema;
    this.categoriasAsociadasSubtema = categoriasAsociadasSubtema;
    this.categoriasAsociadasBehaviour = categoriasAsociadasBehaviour;
    this.prediccionFinalTema = prediccionFinalTema;
    this.prediccionFinalSubtema = prediccionFinalSubtema;
    this.prediccionFinalBehaviour = prediccionFinalBehaviour;
  }
}

export interface PrediccionFinal {
  elemento: string;
  prediccion: number;
}

export interface PrediccionTemaSubtemaBehaviour {
  categoria: number;
  prediccion_raw: string;
}

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

  // TABLA PREDICCION FINAL
  headersPrediccionFinal: string[] = ['elemento', 'prediccion'];
  dataSourcePrediccionFinal: MatTableDataSource<PrediccionFinal>;

  // TABLA PREDICCION TEMA-SUBTEMA-BEHAVIOUR
  headersPrediccionTemaSubtemaBehaviour: string[] = ['categoria', 'prediccion_raw'];
  dataSourcePrediccionTema: MatTableDataSource<PrediccionTemaSubtemaBehaviour>;
  dataSourcePrediccionSubtema: MatTableDataSource<PrediccionTemaSubtemaBehaviour>;
  dataSourcePrediccionBehaviour: MatTableDataSource<PrediccionTemaSubtemaBehaviour>;

  constructor(private http: HttpClient) {
  }

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
      'TipoPersona,Edad,TasaEOL,TasaIUS,DebitoAutomatico,Score,' +
      'suscripcion_1,suscripcion_2,suscripcion_3,suscripcion_4,suscripcion_5,suscripcion_6,suscripcion_7,' +
      'suscripcion_8,suscripcion_9,suscripcion_10,suscripcion_11,suscripcion_12,suscripcion_13,suscripcion_14,' +
      'localidad_1,localidad_2\n',
      '1,0,15,0,0,9.0,0,33,33,33,33,33,33,33,33,33,33,33,33,33,CIUDAD AUTONOMA BUENOS AIRES,0'
    ];

    console.log(csvLines);

    const csvFile = new File(csvProvisorio, 'temp.csv');

    const form = new FormData();
    form.append('client_data', csvFile);

    this.http.post('http://localhost:5000/predict', form).subscribe(response => {
      const datos = new DatosClasificacion(
        response['predicciones_raw']['tema'][0],
        response['predicciones_raw']['subtema'][0],
        response['predicciones_raw']['behaviour'][0],
        response['categorias_asociadas']['tema'],
        response['categorias_asociadas']['subtema'],
        response['categorias_asociadas']['behaviour'],
        response['prediccion_final']['tema'],
        response['prediccion_final']['subtema'],
        response['prediccion_final']['behaviour'],
      );

      const datosPrediccionFinal = [];
      datosPrediccionFinal.push({elemento: 'tema', prediccion: datos.prediccionFinalTema});
      datosPrediccionFinal.push({elemento: 'subtema', prediccion: datos.prediccionFinalSubtema});
      datosPrediccionFinal.push({elemento: 'behaviour', prediccion: datos.prediccionFinalBehaviour});
      this.dataSourcePrediccionFinal = new MatTableDataSource<PrediccionFinal>(datosPrediccionFinal);

      const datosPrediccionTema = [];
      this.zip(datos.categoriasAsociadasTema, datos.prediccionesRawTema).forEach(x => {
        datosPrediccionTema.push({categoria: x[0], prediccion_raw: x[1]});
      });
      this.dataSourcePrediccionTema = new MatTableDataSource<PrediccionTemaSubtemaBehaviour>(datosPrediccionTema);

      const datosPrediccionSubtema = [];
      this.zip(datos.categoriasAsociadasSubtema, datos.prediccionesRawSubtema).forEach(x => {
        datosPrediccionSubtema.push({categoria: x[0], prediccion_raw: x[1]});
      });
      this.dataSourcePrediccionSubtema = new MatTableDataSource<PrediccionTemaSubtemaBehaviour>(datosPrediccionSubtema);

      const datosPrediccionBehaviour = [];
      this.zip(datos.categoriasAsociadasBehaviour, datos.prediccionesRawBehaviour).forEach(x => {
        datosPrediccionBehaviour.push({categoria: x[0], prediccion_raw: x[1]});
      });
      this.dataSourcePrediccionBehaviour = new MatTableDataSource<PrediccionTemaSubtemaBehaviour>(datosPrediccionBehaviour);

      console.log(datos.prediccionesRawTema);
      console.log('que onda bigote');
    });
  }

  zip(a, b) {
    return a.map(function (e, i) {
      return [e, b[i]];
    });
  }
}
