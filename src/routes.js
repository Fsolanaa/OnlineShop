import Inicio from './App.svelte'
import Pedidos from './lib/RegistroPedidos.svelte'
import Inventario from './lib/ControlInventario.svelte'
import Productos from './lib/GestionProductos.svelte'
import Ventas from './lib/InformeVentas.svelte'

const routes = {
  '/': Inicio,
  '/pedidos': Pedidos,
  '/inventario': Inventario,
  '/productos': Productos,
  '/ventas': Ventas

}

export default routes