import { useState } from 'react';
import './App.css';

function App() {
  // Estado: arreglo de tareas. Cada tarea es un objeto { id, texto, hecha }
  const [tareas, setTareas] = useState([]);
  // Estado: lo que el usuario escribe en el input
  const [nuevaTarea, setNuevaTarea] = useState('');

  // 1. Agregar tarea
  const agregarTarea = (e) => {
    e.preventDefault(); // evita que el formulario recargue la página
    if (nuevaTarea.trim() === '') return; // no agregar tareas vacías

    const tarea = {
      id: Date.now(), // id único simple basado en la hora actual
      texto: nuevaTarea,
      hecha: false,
    };

    setTareas([...tareas, tarea]); // agregamos la nueva tarea al arreglo
    setNuevaTarea(''); // limpiamos el input
  };

  // 2. Marcar tarea como terminada (toggle)
  const marcarTerminada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
  };

  // 3. Borrar tarea
  const borrarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="contenedor">
      <h1>Lista de Tareas</h1>

      <form onSubmit={agregarTarea} className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una nueva tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="lista">
        {tareas.length === 0 && <p className="vacio">No hay tareas todavía.</p>}
        {tareas.map((tarea) => (
          <li key={tarea.id} className={tarea.hecha ? 'tarea hecha' : 'tarea'}>
            <span onClick={() => marcarTerminada(tarea.id)}>
              {tarea.texto}
            </span>
            <button onClick={() => borrarTarea(tarea.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;