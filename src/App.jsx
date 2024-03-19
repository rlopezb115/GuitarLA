import { useState, useEffect, useRef } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Productos from "./components/Productos";
import { db } from "./data/db";

function App() 
{
    const [productos, useProductos] = useState([]);
    const [carrito, useCarrito] = useState([]);
    const [eliminar, setEliminar] = useState(0);
    const primeraRenderizacion = useRef(true);

    const CLAVE = "PRODUCTOS_CARRITO";

    // ideal para mandar a llamar una API.
    useEffect(() => {

        if (primeraRenderizacion.current)
        {
            primeraRenderizacion.current = false;
            useProductos(db);
            useCarrito(obtenerProductosLocalStorage());
            return;
        }

        actualizarProductosLocalStorage();

    }, [carrito]);


    function actualizarProductosLocalStorage()
    {
        var objetoJSON = JSON.stringify(carrito);
        localStorage.setItem(CLAVE, objetoJSON);
    }

    function obtenerProductosLocalStorage()
    {
        var objetoJSON = localStorage.getItem(CLAVE);
        return JSON.parse(objetoJSON) || [];
    }

    function agregarCarrito(producto)
    {
        const indice = carrito.findIndex(productoExistente => productoExistente.id === producto.id);
        if (indice == -1)
        {
            producto.cantidad = 1;
            useCarrito([...carrito, producto]);
            return;
        }

        const carritoClonado = [...carrito];
        carritoClonado[indice].cantidad++;
        useCarrito(carritoClonado);
    }

    function actualizarCantidadCarrito(id, incrementar)
    {
        const indice = carrito.findIndex(productoExistente => productoExistente.id === id);
        const carritoClonado = [...carrito];
        if (incrementar)
        {
            carritoClonado[indice].cantidad++;
        }
        else if (carritoClonado[indice].cantidad > 1)
        {
            carritoClonado[indice].cantidad--;
        }

        useCarrito(carritoClonado);
    }

    function removerProductoCarrito(id)
    {
        const productosFiltrados = carrito.filter(productoExistente => productoExistente.id !== id);
        useCarrito(productosFiltrados);
    }

    function limpiarCarrito()
    {
        useCarrito([]);
    }

    return (
        <>
            <Header 
                carrito={carrito}
                actualizarCantidadCarrito={actualizarCantidadCarrito}
                removerProductoCarrito={removerProductoCarrito}
                limpiarCarrito={limpiarCarrito}
            />
            <Productos 
                productos={productos} 
                agregarCarrito={agregarCarrito}
            />
            <Footer />
            <button type="button" onClick={() => setEliminar(eliminar + 1)}>Actualizar Estado</button>
        </>
    )
}

export default App
