export default function Header({ 
    carrito, 
    esVacio,
    total,
    actualizarCantidadCarrito, 
    removerProductoCarrito, 
    limpiarCarrito 
})
{
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {
                                    esVacio 
                                    ?
                                        (<p className="text-center">El carrito esta vacío</p>)
                                    :
                                        (
                                            <>
                                                <table className="w-100 table">
                                                    <thead>
                                                        <tr>
                                                            <th>Imagen</th>
                                                            <th>Nombre</th>
                                                            <th>Precio</th>
                                                            <th>Cantidad</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            carrito.map(producto => (
                                                                <tr key={producto.id}>
                                                                    <td>
                                                                        <img className="img-fluid" src={`/img/${producto.image}.jpg`} alt={`imagen guitarra ${producto.name}`} />
                                                                    </td>
                                                                    <td>{ producto.name }</td>
                                                                    <td className="fw-bold">$ {producto.price} </td>
                                                                    <td className="flex align-items-start gap-4">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-dark"
                                                                            onClick={() => actualizarCantidadCarrito(producto.id, false)}
                                                                        >
                                                                            -
                                                                        </button>
                                                                            { producto.cantidad }
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-dark"
                                                                            onClick={() => actualizarCantidadCarrito(producto.id, true)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            type="button"
                                                                            onClick={() => removerProductoCarrito(producto.id)}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        
                                                    </tbody>
                                                </table>

                                                <p className="text-end">Total pagar: <span className="fw-bold">$ {total}</span></p>
                                                <button 
                                                    className="btn btn-dark w-100 mt-3 p-2"
                                                    onClick={limpiarCarrito}
                                                >Vaciar Carrito</button>
                                            </>
                                        )
                                }
                                
                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}