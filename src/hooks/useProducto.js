import { useState, useEffect } from "react";
import { db } from '../data/db';

export const useProducto = (valorInicial) => 
{
    const [productos, useProductos] = useState(valorInicial);

    // ideal para mandar a llamar una API.
    useEffect(() => {

        useProductos(db);

    }, []);

    return [
        productos,
        useProductos
    ];
}