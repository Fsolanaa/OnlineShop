import Inicio from './App.svelte'
import Pedidos from './lib/RegistroPedidos.svelte'
import Inventario from './lib/GestionProductos.svelte'
import Ventas from './lib/InformeVentas.svelte'

const routes = {
  '/': Inicio,
  '/pedidos': Pedidos,
  '/inventario': Inventario,
  '/ventas': Ventas

}

export default routes