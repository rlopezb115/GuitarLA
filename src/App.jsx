import { useCarrito } from "./hooks/useCarrito";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Productos from "./components/Productos";

function App() 
{
    const {
        carrito,
        esVacio,
        total,
        agregarProductoCarrito,
        actualizarCantidadCarrito,
        removerProductoCarrito,
        limpiarCarrito
    } = useCarrito([]);

    return (
        <>
            <Header 
                carrito={carrito}
                esVacio={esVacio}
                total={total}
                actualizarCantidadCarrito={actualizarCantidadCarrito}
                removerProductoCarrito={removerProductoCarrito}
                limpiarCarrito={limpiarCarrito}
            />
            <Productos 
                agregarProductoCarrito={agregarProductoCarrito}
            />
            <Footer />
        </>
    )
}

export default App
