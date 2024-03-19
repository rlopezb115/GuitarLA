import { useState, useEffect, useRef, useMemo } from "react";

export const useCarrito = (valorInicial) =>
{
    const [carrito, useCarrito] = useState(valorInicial);
    const primeraRenderizacion = useRef(true);
    const CLAVE = "PRODUCTOS_CARRITO";

    // ideal para mandar a llamar una API.
    useEffect(() => {

        if (primeraRenderizacion.current)
        {
            primeraRenderizacion.current = false;
            useCarrito(obtenerCarritoLocalStorage());
            return;
        }

        actualizarCarritoLocalStorage();

    }, [carrito]);


    function actualizarCarritoLocalStorage()
    {
        var objetoJSON = JSON.stringify(carrito);
        localStorage.setItem(CLAVE, objetoJSON);
    }

    function obtenerCarritoLocalStorage()
    {
        var objetoJSON = localStorage.getItem(CLAVE);
        return JSON.parse(objetoJSON) || [];
    }

    function agregarProductoCarrito(producto)
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

    // Definicion de state derivado
    const esVacio = useMemo(() => carrito.length == 0, [carrito]);
    const total = useMemo(() => carrito.reduce((sumatoria, producto) => sumatoria + (producto.cantidad * producto.price), 0), [carrito]);

    return {
        carrito,
        esVacio,
        total,
        agregarProductoCarrito,
        actualizarCantidadCarrito,
        removerProductoCarrito,
        limpiarCarrito
    }
}