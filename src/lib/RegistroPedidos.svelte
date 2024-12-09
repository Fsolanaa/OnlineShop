<script>
    let data = JSON.parse(localStorage.getItem("datos"))
    let inventario = JSON.parse(localStorage.getItem("inventario"))
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    let clientes = JSON.parse(localStorage.getItem("clientes"));
    let nuevoPedido = {
        cliente: { nombre: "", email: "", telefono: "" },
        productos: [],
        totalUnidades: 0,
        total: 0,
        estado: "Procesando",
    };

    let cantidades = {};

function agregarPedido() {
  const id = pedidos.length + 1;
  const fecha = new Date().toISOString().split('T')[0];
  
  const productosSeleccionados = nuevoPedido.productos
    .filter(productoId => cantidades[productoId] > 0)
    .map(productoId => ({
      id: productoId,
      cantidad: cantidades[productoId]
    }));
  
  const totalUnidades = calcularTotalUnidades(productosSeleccionados);
  const total = calcularTotal(productosSeleccionados);
  
  const pedido = {
    id,
    fecha,
    cliente: nuevoPedido.cliente,
    productos: productosSeleccionados,
    totalUnidades: totalUnidades,
    total: total,
    estado: nuevoPedido.estado
  };

  const cliente = {
    id: clientes.length + 1,
    nombre: nuevoPedido.cliente.nombre,
    email: nuevoPedido.cliente.email,
    telefono: nuevoPedido.cliente.telefono,
    pedidosCliente: [{id}]
  };

  clientes = [...clientes, cliente];
  
  pedidos = [...pedidos, pedido];
  
  // Reiniciar el formulario
  nuevoPedido = {
    cliente: { nombre: '', email: '', telefono: '' },
    productos: [],
    totalUnidades: 0,
    total: 0,
    estado: 'Procesando'
  };
  cantidades = {};

  editarProducto(productosSeleccionados)
  guardarCambios();
}

function calcularTotal(productos) {
  return productos.reduce((total, producto) => {
    const item = data.inventario.find(p => p.id === producto.id);
    return total + (item.precio * producto.cantidad);
  }, 0);
}
function calcularTotalUnidades(productos) {
  return productos.reduce((total, producto) => {
    const item = data.inventario.find(p => p.id === producto.id);
    return total + (producto.cantidad);
  }, 0);
}


function editarProducto(productos) {
    productos.forEach(producto => {
        const index = inventario.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            inventario[index].stock -= producto.cantidad;
            inventario = [...inventario];
            
        }
    });
        
    }

function guardarCambios() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("inventario", JSON.stringify(inventario));
    console.log('Guardando cambios:', pedidos);
    console.log('Guardando cambios:', clientes);
}

</script>

<main>
    <h1>Pedidos</h1>

    <section>
        <h2>Registrar nuevo pedido</h2>
        <form on:submit|preventDefault={agregarPedido}>
          <label>
            Nombre del cliente:
            <input type="text" bind:value={nuevoPedido.cliente.nombre} required>
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
          {#each inventario as producto}
            <label class="inputPedido">
                <input type="checkbox" bind:group={nuevoPedido.productos} value={producto.id}>
                {#if nuevoPedido.productos.includes(producto.id)}
                    <input type="number" bind:value={cantidades[producto.id]} min="1" max={producto.stock}>
                {/if}
              {producto.nombre} - {producto.precio}
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
              <th>Total Unidades</th>
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
                <td>{pedido.totalUnidades}</td>
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
  color: #e0e0e0;
  background-color: #1a1a2e;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.3);
  padding: 20px;
}

h1, h2, h3 {
  color: #e94560;
}

section {
  background-color: #16213e;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

label {
  margin-bottom: 10px;
}

.inputPedido {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #0f3460;
  background-color: #1a1a2e;
  color: #e0e0e0;
  border-radius: 15px;
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
  background-color: #e94560;
  color: #16213e;
  box-shadow: 1px 1px 5px #e94560;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

/* Media Queries */

/* Small devices (phones, less than 600px) */
@media (max-width: 600px) {
  h1 {
    font-size: 1.8em;
  }

  section {
    padding: 15px;
  }

  .inputPedido {
    flex-direction: column;
    align-items: flex-start;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="number"] {
    font-size: 0.9em;
  }

  button {
    padding: 8px 16px;
    font-size: 0.9em;
  }

  table {
    font-size: 0.8em;
  }

  th, td {
    padding: 5px;
  }
}

/* Medium devices (tablets, 600px to 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
  h1 {
    font-size: 2.4em;
  }

  section {
    padding: 18px;
  }

  .inputPedido {
    flex-direction: row;
    align-items: center;
  }

  button {
    padding: 9px 18px;
  }

  table {
    font-size: 0.9em;
  }

  th, td {
    padding: 8px;
  }
}

  </style>
  