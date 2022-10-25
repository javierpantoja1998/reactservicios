import React, { Component } from 'react'; 

import axios from 'axios'; 

import Global from '../Global'; 

export default class BuscadorCoches extends Component { 

    cajaMarcaRef = React.createRef(); 

    filtrarCoches = (e) => { 

        e.preventDefault(); 

        //NO VOY A UTILIZAR AXIOS 

        var coches = this.state.coches; 

        var marca = this.cajaMarcaRef.current.value.toLowerCase(); 

        //DEBEMOS RECORRER TODOS LOS COCHES DEL ARRAY Y 

        //TENER UN IF 

        //VOY A UTILIZAR UN METODO DE Array LLAMADO filter() 

        // Array.filter(obj => obj.propiedad == valor) 

        var cochesfiltrados =  

            coches.filter(car => car.marca.toLowerCase().includes(marca)); 

        //ASIGNAMOS DE NUEVO LOS COCHES DE STATE 

        this.setState({ 

            coches: cochesfiltrados 

        }); 

    } 

    state = { 

        coches: [], 

        status: false 

    } 

    //Funcion para cargar los coches
    loadCoches = (e) => { 
        //Si el evento es nulo hacemos el preventDefault
        if (e != null){ 

           e.preventDefault();   

        } 
        //Definimos la peticion y creamos su variable
        var request = "/webresources/coches"; 
        //Definimos la url  y creamos su variable
        var url = Global.urlCoches + request; 
        //Realizamos el metodo axios para hacer un get
        axios.get(url).then(res => { 
            //Cambiamos el state
            this.setState({ 

                status: true, 
                coches: res.data 
            }) 

        }); 

    } 

    componentDidMount = () => { 

        this.loadCoches(); 

    } 



  render() { 

    return ( 

      <div> 

        <h1>Buscador Api Coches</h1> 

        <form> 

            <label>Marca: </label> 

            <input type="text" ref={this.cajaMarcaRef}/> 

            <button onClick={this.filtrarCoches}> 

                Filtrar coches 

            </button> 

            <button onClick={this.loadCoches}> 

                Mostrar todos coches 

            </button> 

        </form> 

        <table border="1"> 

            <thead> 

                <tr> 

                    <th>MARCA</th> 

                    <th>MODELO</th> 

                    <th>CONDUCTOR</th> 

                    <th>IMAGEN</th> 

                </tr> 

            </thead> 

            <tbody> 

                { 
                    //Si el estado del state es true->
                    this.state.status == true && 

                    ( 
                        //Recorremos los coches con un map  y definimos (coche, index)
                        this.state.coches.map((coche, index) => { 

                            return (<tr key={index}> 

                                <td>{coche.marca}</td> 

                                <td>{coche.modelo}</td> 

                                <td>{coche.conductor}</td> 

                                <td> 
                                    <img style={{width: "80px", height: "80px"}} src={coche.imagen} alt="Imagen"/>

                                </td> 

                            </tr>); 

                        }) 

                    ) 

                } 

            </tbody> 

        </table> 

      </div> 

    ) 

  } 

} 