import { useProducto } from '../hooks/useProducto';
import Producto from "./Producto";

export default function Productos({ agregarProductoCarrito })
{
    const [productos] = useProducto([]);

    return (
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5">
                
                {
                    productos.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                            agregarProductoCarrito={agregarProductoCarrito}
                        />
                    ))
                }
            </div>
        </main>
    );
}