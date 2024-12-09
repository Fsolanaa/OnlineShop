<script>
    let nuevoProducto = { id: null, nombre: '', categoria: '', precio: null, stock: null };
    let inventario = JSON.parse(localStorage.getItem("inventario"));

    function agregarProducto() {
        nuevoProducto.id = inventario.length + 1;
        inventario = [...inventario, nuevoProducto];
        nuevoProducto = { id: null, nombre: '', categoria: '', precio: null, stock: null };
        guardarCambios();
    }
      
    function editarProducto(id, producto) {
        const index = inventario.findIndex(item => item.id === id);
        if (index !== -1) {
            inventario[index] = { ...inventario[index], ...producto };
            inventario = [...inventario];
            guardarCambios();
        }
    }
      
    function eliminarProducto(id) {
        inventario = inventario.filter(item => item.id !== id);
        guardarCambios();
    }
      
    function guardarCambios() {
        localStorage.setItem("inventario", JSON.stringify(inventario));
        console.log('Guardando cambios:', inventario);
    }
</script>
<section>
    <div class="cajaGestion">
        <h2 class="tituloGestion">Gestion de Productos</h2>
        <table class="tablaGestion">
            <thead class="encabezadoTablaGestion">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th colspan="2">Acciones</th>
                </tr>
            </thead>
            <tbody class="cuerpoTablaGestion">
                {#each inventario as producto (producto.id)}
                <tr>
                    <td>{producto.id}</td>
                    <td><input type="text" bind:value={producto.nombre} placeholder="Nombre"></td>
                    <td><input type="text" bind:value={producto.categoria} placeholder="Categoria"></td>
                    <td><input type="number" bind:value={producto.precio} placeholder="Precio"></td>
                    <td><input type="number" bind:value={producto.stock} placeholder="Stock"></td>
                    <td>
                        <button on:click={() => editarProducto(producto.id, producto)}>Editar</button>
                    </td>
                    <td>
                        <button on:click={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </td>
                </tr>
                {/each}
                <tr>
                    <td></td>
                    <td><input bind:value={nuevoProducto.nombre} placeholder="Nombre"></td>
                    <td><input bind:value={nuevoProducto.categoria} placeholder="Categoría"></td>
                    <td><input type="number" bind:value={nuevoProducto.precio} placeholder="Precio"></td>
                    <td><input type="number" bind:value={nuevoProducto.stock} placeholder="Stock"></td>
                    <td colspan="2">
                        <button on:click={agregarProducto}>Agregar Producto</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<style>
section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #e0e0e0;
    background-color: #1a1a2e;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.3);
}

.cajaGestion {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    background-color: #16213e;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-content: center;
}

.tituloGestion, .tablaGestion {
    width: 70%;
}

.tituloGestion {
    color: #e94560;
    margin: 20px 0 0 0;
}

.tablaGestion {
    text-align: left;
    border-collapse: collapse;
    margin: 20px 0 30px 0;
}

.tablaGestion th, td {
    padding: 10px;
    max-height: 20px;
}

.tablaGestion th {
    background-color: #0f3460;
}

.tablaGestion td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #0f3460;
}

.tablaGestion td button {
    width: 100%;
}

.encabezadoTablaGestion {
    background-color: #16213e;
    color: #e94560;
}

.tablaGestion tr:hover td {
    background-color: #1e2749;
}

.tablaGestion input {
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    background-color: transparent;
}

.tablaGestion input::placeholder {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
}

button {
    background-color: #fff;
    color: #e94560;
}

button:hover {
    background-color: #e94560;
    color: #0f3460;
    box-shadow: 1px 1px 5px #e94560;
    border-color: solid 1px #e94560;
}

/* Responsive styles */
@media (max-width: 1024px) {
    .tituloGestion, .tablaGestion {
        width: 90%;
    }

    section {
        padding: 15px;
    }

    .tablaGestion th, .tablaGestion td {
        padding: 8px;
        font-size: 14px;
    }
}

@media (max-width: 768px) {
    .tituloGestion {
        font-size: 1.5rem;
    }

    .tablaGestion th, .tablaGestion td {
        font-size: 12px;
        padding: 6px;
    }

    button {
        font-size: 14px;
        padding: 8px;
    }
}

@media (max-width: 480px) {
    section {
        padding: 10px;
    }

    .tituloGestion {
        font-size: 1.2rem;
        text-align: center;
    }

    .tablaGestion {
        width: 100%;
        margin: 10px 0;
    }

    .tablaGestion th, .tablaGestion td {
        font-size: 10px;
        padding: 4px;
    }

    button {
        font-size: 12px;
    }
}

</style>