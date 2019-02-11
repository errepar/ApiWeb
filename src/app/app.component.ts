import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {String} from 'typescript-string-operations';

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
  servicios: number[]

  constructor(
    prediccionesRawTema: number[],
    prediccionesRawSubtema: number[],
    prediccionesRawBehaviour: number[],
    categoriasAsociadasTema: number[],
    categoriasAsociadasSubtema: number[],
    categoriasAsociadasBehaviour: number[],
    prediccionFinalTema: number,
    prediccionFinalSubtema: number,
    prediccionFinalBehaviour: number,
    servicios: number[]
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
    this.servicios = servicios;
  }
}

export interface PrediccionFinal {
  elemento: string;
  prediccion: number;
}

export interface PrediccionTemaSubtema {
  categoria: number;
  prediccion_raw: number;
}

export interface PrediccionBehaviour {
  categoria: number;
  prediccion_raw: number;
  lo_utiliza: string;
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
    'ENC TRIB CLASICA EOL',
    'ENC TRIB CLASICA PAPEL 13 T',
    'IMPUESTOS NACIONALES 2 TOMOS',
    'COL ERREPAR CORDOBA',
    'CONTABILIDAD Y ADMINISTRACION FULL',
    'COL ORO',
    'ENC TRIB CLASICA',
    'ENC TRIB CLASICA PAPEL 12 T',
    'ENC LAB CLASICA PAPEL 5 T',
    'DOCTRINA PENAL TRIBUTARIA Y ECONOMICA EOL'
  ];
  listaLocalidades = [
    'CIUDAD AUTONOMA BUENOS AIRES', 'CORDOBA', 'ROSARIO', 'LA PLATA', 'SANTA FE',
    'MAR DEL PLATA', 'SALTA', 'MENDOZA', 'SAN MIGUEL DE TUCUMAN', 'BAHIA BLANCA',
    'N/D'
  ];
  diccionarioTipoPersona = {'Física': 0, 'Jurídica': 1, 'N/D': 2, undefined: 2};
  diccionarioTipoDebito = {'NO': 0, 'SI': 1, 'N/D': 2, undefined: 2};
  diccionarioSuscripciones = {
    'ENC TRIB CLASICA EOL': 0,
    'ENC TRIB CLASICA PAPEL 13 T': 1,
    'IMPUESTOS NACIONALES 2 TOMOS': 2,
    'COL ERREPAR CORDOBA': 3,
    'CONTABILIDAD Y ADMINISTRACION FULL': 4,
    'COL ORO': 5,
    'ENC TRIB CLASICA': 6,
    'ENC TRIB CLASICA PAPEL 12 T': 7,
    'ENC LAB CLASICA PAPEL 5 T': 8,
    'DOCTRINA PENAL TRIBUTARIA Y ECONOMICA EOL': 9,
    'N/D': 33,
    undefined: 33
  };

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
  idClienteIngresado = undefined;

  @ViewChild('MatSortTema') sortTema: MatSort;
  @ViewChild('MatSortSubtema') sortSubtema: MatSort;
  @ViewChild('MatSortBehaviour') sortBehaviour: MatSort;

  @ViewChild('MatPaginatorTema') paginatorTema: MatPaginator;
  @ViewChild('MatPaginatorSubtema') paginatorSubtema: MatPaginator;
  @ViewChild('MatPaginatorBehaviour') paginatorBehaviour: MatPaginator;

  // TABLA PREDICCION FINAL
  headersPrediccionFinal: string[] = ['elemento', 'prediccion'];
  dataSourcePrediccionFinal: MatTableDataSource<PrediccionFinal>;

  // TABLA PREDICCION TEMA-SUBTEMA-BEHAVIOUR
  headersPrediccionTemaSubtema: string[] = ['categoria', 'prediccion_raw'];
  dataSourcePrediccionTema: MatTableDataSource = new MatTableDataSource<PrediccionTemaSubtema>();
  dataSourcePrediccionSubtema: MatTableDataSource = new MatTableDataSource<PrediccionTemaSubtema>();

  headersPrediccionBehaviour: string[] = ['categoria', 'prediccion_raw', 'lo_utiliza'];
  dataSourcePrediccionBehaviour: MatTableDataSource = new MatTableDataSource<PrediccionBehaviour>();

  constructor(private http: HttpClient) {
  }

  enviarDatos(enviarCsvMock: boolean) {
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
      localidad_1: this.domicilioIngresadoA === undefined ? '0' : this.domicilioIngresadoA,
      localidad_2: this.domicilioIngresadoB === undefined ? '0' : this.domicilioIngresadoB
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
      this.diccionarioTipoPersona[datosObtenidos.TipoPersona] + ',' +
      datosObtenidos.Edad + ',' + datosObtenidos.TasaEOL + ',' + datosObtenidos.TasaIUS + ',' +
      this.diccionarioTipoDebito[datosObtenidos.DebitoAutomatico] + ',' + datosObtenidos.Score + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_1] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_2] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_3] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_4] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_5] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_6] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_7] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_8] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_9] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_10] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_11] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_12] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_13] + ',' +
      this.diccionarioSuscripciones[datosObtenidos.suscripcion_14] + ',' +
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

    let csvFile;
    if (enviarCsvMock) {
      csvFile = new File(csvProvisorio, 'temp.csv');
      this.idClienteIngresado = 301180;
    } else {
      csvFile = new File(csvLines, 'temp.csv');
    }

    const url = String.Format('http://localhost:5000/predict/{0}', this.idClienteIngresado);

    const form = new FormData();
    form.append('client_data', csvFile);

    this.http.post(url, form).subscribe(response => {
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
        response['servicios']
      );

      console.log(datos);

      const datosPrediccionFinal = [];
      datosPrediccionFinal.push({elemento: 'tema', prediccion: datos.prediccionFinalTema});
      datosPrediccionFinal.push({elemento: 'subtema', prediccion: datos.prediccionFinalSubtema});
      datosPrediccionFinal.push({elemento: 'behaviour', prediccion: datos.prediccionFinalBehaviour});
      this.dataSourcePrediccionFinal = new MatTableDataSource<PrediccionFinal>(datosPrediccionFinal);

      const datosPrediccionTema = [];
      this.zip(datos.categoriasAsociadasTema, datos.prediccionesRawTema).forEach(x => {
        datosPrediccionTema.push({categoria: x[0], prediccion_raw: x[1]});
      });
      this.dataSourcePrediccionTema = new MatTableDataSource<PrediccionTemaSubtema>(datosPrediccionTema);
      this.dataSourcePrediccionTema.sort = this.sortTema;
      this.dataSourcePrediccionTema.paginator = this.paginatorTema;

      const datosPrediccionSubtema = [];
      this.zip(datos.categoriasAsociadasSubtema, datos.prediccionesRawSubtema).forEach(x => {
        datosPrediccionSubtema.push({categoria: x[0], prediccion_raw: x[1]});
      });
      this.dataSourcePrediccionSubtema = new MatTableDataSource<PrediccionTemaSubtema>(datosPrediccionSubtema);
      this.dataSourcePrediccionSubtema.sort = this.sortSubtema;
      this.dataSourcePrediccionSubtema.paginator = this.paginatorSubtema;

      const datosPrediccionBehaviour = [];
      this.zip(datos.categoriasAsociadasBehaviour, datos.prediccionesRawBehaviour).forEach(x => {
        const utilizaServicio = datos.servicios.includes(x[0]) ? 'SI' : '-';

        datosPrediccionBehaviour.push({categoria: x[0], prediccion_raw: Number(+x[1]), lo_utiliza: utilizaServicio});
      });
      this.dataSourcePrediccionBehaviour = new MatTableDataSource<PrediccionBehaviour>(datosPrediccionBehaviour);
      this.dataSourcePrediccionBehaviour.sort = this.sortBehaviour;
      this.dataSourcePrediccionBehaviour.paginator = this.paginatorBehaviour;

      console.log('que onda bigote');
    });
  }

  zip(a, b) {
    return a.map(function (e, i) {
      return [e, b[i]];
    });
  }
}
