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
      
<div id="main-container">
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

<style>

#main-container{
	width: auto;
}

.tablaGestion{
	background-color: white;
	text-align: left;
	border-collapse: collapse;
	width: 100%;
}

.tablaGestion th, td{
	padding: 10px;
    max-height: 20px;
}

.tablaGestion td{
    color: black;
}

.tablaGestion td button{
    width: 100%;
}

.encabezadoTablaGestion{
	background-color: #246355;
	color: white;
}

.tablaGestion tr:nth-child(even){
	background-color: #ddd;
}

.tablaGestion tr:hover td{
	background-color: #369681;
	color: black;
}


.tablaGestion input{
    width: 100%;
    height: 100%;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: transparent;
    color: black;
}

.tablaGestion input::placeholder{
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.7);
}
</style>