import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Form, Button } from "react-bootstrap";

export default function Recover() {

	return (
        <div className="container vh-90">
		    
            <div className="row">
                <div className="col-sm-6">
                    <h2>¿Olvidó su contraseña</h2>
                    <h3>Ingrese su correo elctrónico</h3>
                </div>
            </div>

            <div className="row">
                <Form.Control type="email" placeholder="Enter email" />
            </div>

            <div className="row">
                <Button variant="dark">Enviar contraseña</Button> <Button variant="outline-dark">Cancelar</Button>{" "}
            </div>

        </div>
    );
};





