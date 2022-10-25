import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';
export default class MaestroEmpleados extends Component {

  state = {
    empleados:[],
    status: false
  }

  loadEmpleados = () => {
    var idDept = this.props.iddepartamento;
    //Hacemos la peticion
    var request = "api/empleados/empleadosdepartamento/"  + idDept;
    //Definimos la url
    var url = Global.urlEmpleados + request;
    axios.get(url).then(res=> {
      this.setState({
          status:true,
          empleados: res.data
      });
    })
  }

  componentDidMount = () => {
    this.loadEmpleados();
  }

  //Este metodo debemos llamarlo con cuidado
  //Siempre hay que comprobar su tipo de cambio
  //NOrmalmente se utiliza con props cuando otro componnente nos ha cargado previamente
  //Recibe un parametro llamado props que indica el antiguo valor de props
  componentDidUpdate = (oldProps) => {
    console.log("Actual props " + this.props.iddepartamento); //iddepartamento es el props
    console.log("Viejo props " + oldProps.iddepartamento);
    //Solo haremos cambios cuando los props sean diferentes, es decir cuando los props han cambiado
    if(this.props.iddepartamento != oldProps.iddepartamento){
      this.loadEmpleados();
    }
  }

  render() {
    return (
      <div className='App'>
        <h1 style={{color:"blue"}}>Maestro Empleados</h1>
        {
          this.state.status == true &&
            this.state.empleados.map((emp,index)=> {
              return(
                <h3 style={{color:"fuchsia"}} key={index}>{emp.apellido}, {emp.oficio}</h3>
              )
            })
        }
      </div>
    )
  }
}