import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import employeeService from "../services/employee.service";
import { Link } from "react-router-dom";

const EmployeesList = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    init();
  }, [])

  const init = () =>{
    employeeService.getAll()
      .then(response =>{
        console.log('Printing the employees data' , response.data);
        setEmployees(response.data);
      })
      .catch( error =>{
        console.log('Something went wrong' , error);
      })
  }

  const handleDelete = id => {
    employeeService.remove(id)
      .then(response =>{
        console.log('Empleado eliminado', response.data);
        init();
      })
      .catch(error=>{
        console.log('Error al eliminar' , error);
      });
  }

  return ( 
    <div className="container">
      <h3>Lista de empleados </h3>
      <hr></hr>
      <div>
        <Link to={"/add"} className="btn btn-primary mb-2">Agregar empleado</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Lugar</th>
              <th>Area</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map(employee =>(
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.location}</td>
                  <td>{employee.department}</td>
                  <td>
                      <Link className="btn btn-info" to={`/employees/edit/${employee.id}`} >Actualizar</Link>
                      <button className="btn btn-danger ml-2" 
                        onClick={(e)=>{
                          handleDelete(employee.id)
                        }}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
   );
}
 
export default EmployeesList;