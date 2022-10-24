import React, { Component } from 'react'
 //Importar la libreria AXIOS
 import axios from 'axios';

 //Importamos Global para usar variables globales
 import Global from '../Global';


export default class ServicioCustomer extends Component {

   //Almacenamos en una variable la url del servicio recogiendola de Global
   urlCustomers = Global.urlCustomers;

   //Tendremos un array con todos los customers del servicio
   state = {
        customers:[]
   }


   //Metodo para cargar todos los elementos customer del servicio api en el array state
   loadCustomers = () => {

        //Implementamos el metodo de peticion
        //(es la parte de la url que hemos introducido ..
        // o quitado nosotros al definirla en la variable global)
        var request ="customers.json";
        //Leemos el servicio en el metodo get
        axios.get(this.urlCustomers + request).then(response => {
            this.setState({
                //results es el nombre del array en la api
                customers: response.data.results
            })
        });
   }

   //queremos cargar los customers al inciar la pagina
   componentDidMount = () => {
        this.loadCustomers();
   }


  render() {
    return (
      <div>
        <h1>Servicio Customer</h1>
        {
            //Recorremos el state de customers
            this.state.customers.map((customer, index) => {
                //Devolvemos un h2 con el nombre del customer
                return (<h2 style={{color:"red"}} key={customer.id}>
                    {customer.contactName}
                </h2>);
            })
        }
        
        </div>
    )
  }
}
