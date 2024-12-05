import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

import json from "./assets/jsoncrack.json"

localStorage.setItem("datos", JSON.stringify(json));
localStorage.setItem("tienda", JSON.stringify(json.tienda));
localStorage.setItem("inventario", JSON.stringify(json.inventario));
localStorage.setItem("pedidos", JSON.stringify(json.pedidos));
localStorage.setItem("ventas", JSON.stringify(json.ventas));
localStorage.setItem("clientes", JSON.stringify(json.clientes));

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
