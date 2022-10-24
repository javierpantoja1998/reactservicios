import React, { Component } from 'react';
 //Importar la libreria AXIOS
 import axios from 'axios';

 //Importamos Global para usar variables globales
 import Global from '../Global';

export default class BuscadorCustomer extends Component {

    cajaIdRef = React.createRef();
    //Creamos el state con {} ya que asi viene recogida ahora en la api
    state = {
        customer: {},
        status: false
    }

    //Metodo para buscar Customer
    buscarCustomer = (e) => {
        e.preventDefault();
        //Customers/ALFKI.json
        //Recogemos y definimos el valor de la caja id
        var id = this.cajaIdRef.current.value;
        var request = "customers/" + id + ".json";
        var url = Global.urlCustomers + request;
        axios.get(url).then(res => {
            //cambiamos el state y metemos los datos del customer
            this.setState({
                customer: res.data.customer,
                status:true
            })
        });
    }


  render() {
    return (
      <div>
        <h1>Buscador Customer</h1>
        <form onSubmit={this.buscarCustomer}>
            <label>Introduzca Id:</label>
            <input type="text" ref={this.cajaIdRef}></input>
            <button>
                Buscar cliente
            </button>
        </form>
        {
            this.state.status == true &&
            (<div>
                <h1 style={{color:"fuchsia"}}>
                    Empresa: {this.state.customer.companyName}
                </h1>
                <h1 style={{color:"blueviolet"}}>
                    Contacto de la compañia: {this.state.customer.contactName}
                </h1>
                <h1 style={{color:"lightblue"}}>
                    Puesto del contacto: {this.state.customer.contactTitle}
                </h1>
                <h2 style={{color:"red"}}>
                    Direccion: {this.state.customer.address}
                </h2>
                <h2 style={{color:"purple"}}>
                    Ciudad: {this.state.customer.city}
                </h2>
                <h2 style={{color:"yellow"}}>
                    Pais: {this.state.customer.country}
                </h2>
                <h2 style={{color:"orange"}}>
                    Telefono: {this.state.customer.phone}
                </h2>
                <h2 style={{color:"navy"}}>
                    Fax: {this.state.customer.fax}
                </h2>

            </div>)
        }
        </div>
    )
  }
}
