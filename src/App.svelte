<script>
  import Router, { location, link } from "svelte-spa-router";
  
  import Pedidos from "./lib/RegistroPedidos.svelte";
  import Inventario from "./lib/ControlInventario.svelte";
  import Productos from "./lib/GestionProductos.svelte";
  import Ventas from "./lib/InformeVentas.svelte";
</script>

<main>
  <nav>
    <ul>
      <li><a href="/pedidos" use:link>Pedidos</a></li>
      <li><a href="/inventario" use:link>Inventario</a></li>
      <li><a href="/productos" use:link>Productos</a></li>
      <li><a href="/ventas" use:link>Ventas</a></li>
    </ul>
  </nav>
  <Router
    routes={{      
      "/pedidos": Pedidos,
      "/inventario": Inventario,
      "/productos": Productos,
      "/ventas": Ventas,
    }}
  />
</main>

<style>
  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  nav {
        background-color: #1a1a2e; /* Fondo oscuro profundo */
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3); /* Sombra sutil */
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: #e0e0e0; /* Gris claro para texto */
        font-weight: bold;
        transition: all 0.3s ease; /* Transición suave */
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }

    a:hover {
        background-color: #16213e; /* Color de fondo al pasar el mouse */
        color: white;
        transform: scale(1.05); /* Efecto de zoom sutil */
    }

    /* Estado activo */
    a.active {
        color: #0f3460; /* Color de enlace activo */
        background-color: #e94560; /* Fondo de enlace activo */
    }
</style>
