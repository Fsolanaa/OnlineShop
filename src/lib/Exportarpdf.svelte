<script>
    import { onMount } from 'svelte';
    import { jsPDF } from 'jspdf';
  
    let jsonData;
  
    onMount(() => {
      const storedData = localStorage.getItem('datos');
      jsonData = JSON.parse(storedData);
    });
  
    function generatePDF() {
      const doc = new jsPDF();
      let yOffset = 20;
      const pageHeight = doc.internal.pageSize.height;
  
      function addText(text, y, x = 20) {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(text, x, y);
        return y + 7;
      }
  
      function addSection(title, content) {
        if (yOffset > pageHeight - 40) {
          doc.addPage();
          yOffset = 20;
        }
  
        doc.setFontSize(16);
        yOffset = addText(title, yOffset);
        doc.setFontSize(12);
        yOffset += 5;
  
        content.forEach(item => {
          if (yOffset > pageHeight - 40) {
            doc.addPage();
            yOffset = 20;
          }
          Object.entries(item).forEach(([key, value]) => {
            yOffset = addText(`${key}: ${value}`, yOffset, 25);
          });
          yOffset += 5;
        });
        yOffset += 10;
      }
  
      // Información de la tienda
      addSection("Información de la Tienda", [{
        Nombre: jsonData.tienda.nombre,
        Dirección: jsonData.tienda.direccion,
        Teléfono: jsonData.tienda.telefono
      }]);
  
      // Inventario
      addSection("Inventario", jsonData.inventario.map(item => ({
        ID: item.id,
        Nombre: item.nombre,
        Categoría: item.categoria,
        Precio: `$${item.precio}`,
        Stock: item.stock
      })));
  
      // Pedidos
      addSection("Pedidos", jsonData.pedidos.map(pedido => ({
        ID: pedido.id,
        Fecha: pedido.fecha,
        Cliente: pedido.cliente.nombre,
        Total: `$${pedido.total}`,
        Estado: pedido.estado
      })));
  
      // Ventas
      addSection("Ventas", jsonData.ventas.map(venta => ({
        ID: venta.id,
        Fecha: venta.fecha,
        Total: `$${venta.total}`,
        "Método de pago": venta.metodo_pago
      })));
  
      // Clientes
      addSection("Clientes", jsonData.clientes.map(cliente => ({
        ID: cliente.id,
        Nombre: cliente.nombre,
        Email: cliente.email,
        Teléfono: cliente.telefono
      })));
  
      doc.save('datos-tienda.pdf');
    }
  </script>
  
  <button on:click={generatePDF}>Exportar a PDF</button>