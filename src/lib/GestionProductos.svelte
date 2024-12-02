<script>
      import data from '../assets/jsoncrack.json';
      
      let inventario = data.inventario;
      let nuevoProducto = { id: 0, nombre: '', categoria: '', precio: 0, stock: 0 };
      
      function agregarProducto() {
        nuevoProducto.id = inventario.length + 1;
        inventario = [...inventario, nuevoProducto];
        nuevoProducto = { id: 0, nombre: '', categoria: '', precio: 0, stock: 0 };
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
        // En un entorno real, aquí enviarías los datos al servidor
        console.log('Guardando cambios:', inventario);
      }
    </script>
      
      <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each inventario as producto (producto.id)}
                <tr>
                  <td>{producto.id}</td>
                  <td><input type="text" bind:value={producto.nombre} placeholder="Nombre"></td>
                  <td><input type="text" bind:value={producto.categoria} placeholder="Categoria"></td>
                  <td><input type="number" bind:value={producto.precio} placeholder="Precio"></td>
                  <td><input type="number" bind:value={producto.stock} placeholder="Stock"></td>
                  <td>
                    <button on:click={() => editarProducto(producto.id, producto)}>Editar</button>
                    <button on:click={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          
          <h3>Agregar/Editar Producto</h3>
          <input bind:value={nuevoProducto.nombre} placeholder="Nombre">
          <input bind:value={nuevoProducto.categoria} placeholder="Categoría">
          <input type="number" bind:value={nuevoProducto.precio} placeholder="Precio">
          <input type="number" bind:value={nuevoProducto.stock} placeholder="Stock">
          <button on:click={agregarProducto}>Agregar Producto</button>