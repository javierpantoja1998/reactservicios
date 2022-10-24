import React, { Component } from 'react';
//Importar la libreria AXIOS
import axios from 'axios';
//Importamos Global para usar variables globales
import Global from '../Global';


export default class BuscadorCoches extends Component {
    //Definimos la refencia de la caja del input de la marca
    cajaMarcaCoche = React.createRef();
    //Creamos el state con {} ya que asi viene recogida ahora en la api
    state = {
        coche: [],
        status: false
    }

    // buscarCoche = (e) => {
    //     e.preventDefault();
    //      //Recogemos y definimos el valor de la caja marca
    //      var marca = this.cajaMarcaCoche.current.value;
    //      var request = "/webresources/coches";
    //      var url = Global.urlCoches + request;

    //      axios.get(url).then(res => {
    //         //cambiamos el state y metemos los datos del customer
    //         this.setState({
    //             coche: res.data.coche,
    //             status:true
    //         })
    //     });

    // }

    //Metodo para cargar todos los elementos customer del servicio api en el array state
   loadCoches = () => {

        //Implementamos el metodo de peticion
        //(es la parte de la url que hemos introducido ..
        // o quitado nosotros al definirla en la variable global)
        var request ="/webresources/coches.json";
        //Leemos el servicio en el metodo get
        axios.get(this.urlCoches + request).then(response => {
            this.setState({
                //results es el nombre del array en la api
                customers: response.data
            })
        });
    }


        //queremos cargar los customers al inciar la pagina
   componentDidMount = () => {
        this.loadCoches();
    }
  render() {
    return (
      <div>
        <h1>Ejemplo Api Buscador Coches</h1>
        <label>Marca:</label>
        <input type="text"  ref={this.cajaMarcaCoche}></input>
        <button>
            Filtrar Coches
        </button>
        <button>
            Cargar todos los coches
        </button>
        <table border="1px">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Conductor</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.customers.map((customer, index) => {
                        
                    })
                }
            </tbody>
        </table>
        </div>
    )
  }
}
