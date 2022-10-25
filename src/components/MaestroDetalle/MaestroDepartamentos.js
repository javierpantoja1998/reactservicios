import React, { Component } from 'react'

import axios from 'axios';
import Global from '../../Global';
import MaestroEmpleados from './MaestroEmpleados';
export default class MaestroDepartamentos extends Component {
    cajaSelect = React.createRef();
    state = {
        departamentos: [],
        statusDept: false,
        idDepartamento: 0
    }
    mostrarNombresSelect = () => {
        var request = "api/departamentos";
        var url = Global.urlDepartamentos+ request;
        axios.get(url).then(response => {
            this.setState({
                departamentos: response.data,
                statusDept: true
            }) 
        });
    }
    componentDidMount = () => {
        this.mostrarNombresSelect();
    }
    
    mostrarEmpleados = (e) => {
        e.preventDefault();
        var numero = this.cajaSelect.current.value;
        this.setState({
            idDepartamento: numero
        });
    }
  render() {
    return (
      <div className='App'>
        <h1 style={{color:"blue"}}>Maestro Departamentos</h1>
        <form onSubmit={this.mostrarEmpleados}>
            <select ref={this.cajaSelect}>
            {
                this.state.statusDept == true &&
                (
                    this.state.departamentos.map((departamento, index) =>{
                        return(<option key={index} value={departamento.Numero}>{departamento.Nombre}</option>);
                    })
                )
            }
            </select>
            <button>Enviar</button>

            {
                this.state.idDepartamento != 0 &&
                <div>
                    <h2>Departamento seleccionado {this.state.idDepartamento}</h2>
                    <MaestroEmpleados iddepartamento={this.state.idDepartamento}/>
                </div>
                    
            }
        </form>
      </div>
    )
  }
}