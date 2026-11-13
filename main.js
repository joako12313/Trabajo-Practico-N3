
const form = document.getElementById('form-juego');
const mensaje = document.getElementById('mensaje');
const boton = form.querySelector('button[type="submit"]');

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = 'mensaje ' + tipo; 
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 

 
  const nuevoJuego = {
    titulo: document.getElementById('titulo').value.trim(),
    genero: document.getElementById('genero').value,
    puntuacion: Number(document.getElementById('puntuacion').value),
    resena: document.getElementById('resena').value.trim(),
    portadsa: document.getElementById('portada').value.trim(),
    porque: document.getElementById('porque').value.trim()
  };

  boton.disabled = true;
  boton.textContent = 'Guardando...';
  mostrarMensaje('Guardando tu recomendación...', 'info');

  try {
    const { error } = await supabase.from('juegos').insert([nuevoJuego]);
    if (error) throw error;

    mostrarMensaje('¡Recomendación publicada con éxito!', 'exito');
    form.reset();
  } catch (err) {

    console.error('Error al guardar:', err);
    mostrarMensaje('No se pudo guardar la recomendación: ' + err.message, 'error');
  } finally {
    boton.disabled = false;
    boton.textContent = 'Publicar recomendación';
  }
});
