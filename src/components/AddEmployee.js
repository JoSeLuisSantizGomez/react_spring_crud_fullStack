import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import employeeService from "../services/employee.service";

const AddEmployee = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [department, setDepartment] = useState('');
    const history = useHistory();
    const {id}= useParams();

    const saveEmploye =(e)=>{
        e.preventDefault();

        const employee = {name, location, department, id};
        if (id) {
            //actualizar nuevo empleado
            employeeService.update(employee)
            .then(response =>{
                console.log('Empleado actualizado', response.data)
                history.push('/');
            })
            .catch(error=>{
                console.log('Error al actualizar' , error)
            });
        } else {
            //agregar nuevo empleado
            employeeService.create(employee)
            .then(response=>{
                console.log('Empleado registrado' , response.data);
                history.push('/');
            })
            .catch(error =>{
                console.log('No se registro el empleado' , error);
            });
        }
    }

    useEffect(()=>{
        if (id) {
            employeeService.get(id)
            .then(employee => {
                setName(employee.data.name);
                setLocation(employee.data.location);
                setDepartment(employee.data.department);
            })
            .catch(error =>{
                console.log('Erro con metodo get ', error);
            });
        }
    }, [])

    return ( 
        <div className="container">
            <h3>Agregar nuevo empleado</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control col-4" id="name" value={name}
                        onChange={(e)=> setName(e.target.value)} placeholder="Ingresa el nombre"
                    />
                </div>    
                <div className="form-group">
                    <input type="text" className="form-control col-4" id="department" value={department}
                        onChange={(e)=> setDepartment(e.target.value)} placeholder="Ingresa el area"
                    />
                </div>    
                <div className="form-group">    
                    <input type="text" className="form-control col-4" id="location" value={location}
                        onChange={(e)=> setLocation(e.target.value)} placeholder="Ingresa el lugar"
                    />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e)=>saveEmploye(e)}>Agregar</button>
                </div>
            </form>
            <hr/>
            <Link to={"/"}>Regresar</Link>
        </div>
     );
}
 
export default AddEmployee;