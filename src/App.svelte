<script>
  import Router, { location, link } from "svelte-spa-router";
  import Pedidos from "./lib/RegistroPedidos.svelte";
  import Inventario from "./lib/GestionProductos.svelte";
  import Ventas from "./lib/InformeVentas.svelte";
  import ExportarPDF from "./lib/Exportarpdf.svelte";

  let datos = JSON.parse(localStorage.getItem("datos"));
  let tienda = JSON.parse(localStorage.getItem("tienda"));
  let inventario = JSON.parse(localStorage.getItem("inventario"));
  let pedidos = JSON.parse(localStorage.getItem("pedidos"));
  let ventas = JSON.parse(localStorage.getItem("ventas"));
  let clientes = JSON.parse(localStorage.getItem("clientes"));

</script>

<header>
  <nav>
    <ul>
      <li><a href="/pedidos" use:link>Pedidos</a></li>
      <li><a href="/inventario" use:link>Inventario</a></li>
  </ul>
  </nav>
</header>

<main>
    <ExportarPDF/>
  <Router
    routes={{      
      "/pedidos": Pedidos,
      "/inventario": Inventario,
      "/ventas": Ventas,
    }}
  />
</main>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1000;

  }

  nav {
    width: 100%;
    background-color: #1a1a2e;
    padding: 1rem;
    box-shadow: 0 2px 5px #e94560;
    border-radius: 20px;
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
    color: #e0e0e0;
    font-weight: bold;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  a:hover {
    filter: drop-shadow(1px 1px 5px #e94560);
    color: #e94560;
    transform: scale(1.05);
  }

  a.active {
    color: #0f3460;
    background-color: #e94560;
  }

  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    padding-top: calc(1rem + 20px + 2rem); /* Ajusta esto según la altura de tu header */
  }
</style>