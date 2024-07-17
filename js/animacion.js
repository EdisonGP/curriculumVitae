const bubbles = document.querySelectorAll('.bubbles span');
const lines = document.getElementById('lines');

// Función para dibujar una línea entre dos partículas
function drawLine(x1, y1, x2, y2) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', '#519EF7');
  line.setAttribute('stroke-width', '0.15');
  lines.appendChild(line);
}

// Función para actualizar las líneas
function updateLines() {
  // Limpiar las líneas anteriores
  while (lines.firstChild) {
    lines.removeChild(lines.firstChild);
  }

  // Dibujar líneas entre partículas cercanas
  bubbles.forEach((bubble, i) => {
    const rect = bubble.getBoundingClientRect();
    const x1 = rect.left + rect.width / 2;
    const y1 = rect.top + rect.height / 2;

    for (let j = i + 1; j < bubbles.length; j++) {
      const otherBubble = bubbles[j];
      const otherRect = otherBubble.getBoundingClientRect();
      const x2 = otherRect.left + otherRect.width / 2;
      const y2 = otherRect.top + otherRect.height / 2;

      // Calcular la distancia entre las partículas
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      // Si la distancia es menor que un umbral, dibujar una línea
      if (distance < 200) {
        drawLine(x1, y1, x2, y2);
      }
    }
  });

  // Actualizar las líneas cada 16ms (aproximadamente 60fps)
  requestAnimationFrame(updateLines);
}

// Iniciar la actualización de líneas
updateLines();