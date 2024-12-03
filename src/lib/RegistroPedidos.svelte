<script>
    import data from "../assets/jsoncrack.json";
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    let nuevoPedido = {
        cliente: { nombre: "", email: "", telefono: "" },
        productos: [],
        total: 0,
        estado: "Procesando",
    };

function agregarPedido() {
  const id = pedidos.length + 1;
  const fecha = new Date().toISOString().split('T')[0];
  const productosSeleccionados = nuevoPedido.productos.map(id => {
    const producto = data.inventario.find(p => p.id === id);
    return { id, cantidad: 1 }; // Asumimos cantidad 1 por simplicidad
  });
  
  const total = calcularTotal(productosSeleccionados);
  
  const pedido = {
    id,
    fecha,
    cliente: nuevoPedido.cliente,
    productos: productosSeleccionados,
    total,
    estado: nuevoPedido.estado
  };
  
  pedidos = [...pedidos, pedido];
  
  // Reiniciar el formulario
  nuevoPedido = {
    cliente: { nombre: '', email: '', telefono: '' },
    productos: [],
    total: 0,
    estado: 'Procesando'
  };
  guardarCambios();
}

function calcularTotal(productos) {
  return productos.reduce((total, producto) => {
    const item = data.inventario.find(p => p.id === producto.id);
    return total + (item.precio * producto.cantidad);
  }, 0);
}

function guardarCambios() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    console.log('Guardando cambios:', pedidos);
}

</script>

<main>
    <h1>Pedidos</h1>

    <section>
        <h2>Registrar nuevo pedido</h2>
        <form on:submit|preventDefault={agregarPedido}>
          <label>
            Nombre del cliente:
            <input bind:value={nuevoPedido.cliente.nombre} required>
          </label>
          <label>
            Email del cliente:
            <input type="email" bind:value={nuevoPedido.cliente.email} required>
          </label>
          <label>
            Teléfono del cliente:
            <input type="tel" bind:value={nuevoPedido.cliente.telefono} required>
          </label>
          
          <h3>Productos</h3>
          {#each data.inventario as producto}
            <label>
              <input type="checkbox" bind:group={nuevoPedido.productos} value={producto.id}>
              {producto.nombre} - ${producto.precio}
            </label>
          {/each}
          
          <button type="submit">Registrar pedido</button>
        </form>
      </section>
      

      <section>
        <h2>Lista de pedidos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {#each pedidos as pedido}
              <tr>
                <td>{pedido.id}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.cliente.nombre}</td>
                <td>${pedido.total.toFixed(2)}</td>
                <td>{pedido.estado}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
      
</main>
<style>
    main {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      color: #e0e0e0;
      background-color: #1a1a2e;
      border-radius: 20px;
      box-shadow: 0 2px 5px rgba(255, 255, 255, 0.3);
    }
  
    h1, h2, h3 {
      color: #e94560;
    }
  
    section {
      background-color: #16213e;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
  
    form {
      display: flex;
      flex-direction: column;
    }
  
    label {
      margin-bottom: 10px;
    }
  
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #0f3460;
      background-color: #1a1a2e;
      color: #e0e0e0;
      border-radius: 3px;
    }
  
    input[type="checkbox"] {
      margin-right: 10px;
    }
  
    button {
      background-color: #e94560;
      color: #1a1a2e;
      border: none;
      padding: 10px 20px;
      margin-top: 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
  
    button:hover {
      background-color: #0f3460;
      color: #e0e0e0;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #0f3460;
    }
  
    th {
      background-color: #0f3460;
      color: #e94560;
    }
  
    tr:hover {
      background-color: #1e2749;
    }
  </style>
  