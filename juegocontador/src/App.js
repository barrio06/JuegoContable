import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [isGameActive, setIsGameActive] = useState(false); // Controla si el juego está activo
  const [score, setScore] = useState(0); // Puntaje actual
  const [maxScore, setMaxScore] = useState(0); // Puntaje máximo alcanzado
  const [gameTime, setGameTime] = useState(5); // Tiempo restante del juego

  // Función para finalizar el juego (envuelta en useCallback)
  const finalizarJuego = useCallback(() => {
    setIsGameActive(false); // Desactiva el juego
    setMaxScore((prevMax) => (score > prevMax ? score : prevMax)); // Actualiza el puntaje máximo
  }, [score]); // Solo cambia cuando `score` cambia

  useEffect(() => {
    let timer;

    if (isGameActive && gameTime > 0) {
      // Inicia el temporizador cuando el juego está activo
      timer = setInterval(() => {
        setGameTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (gameTime === 0) {
      // Detiene el juego cuando el tiempo llega a 0
      finalizarJuego();
    }

    // Limpia el temporizador al desmontar o reiniciar
    return () => clearInterval(timer);
  }, [isGameActive, gameTime, finalizarJuego]); // Se agregó `finalizarJuego` como dependencia

  // Función para iniciar el juego
  const iniciarJuego = () => {
    setIsGameActive(true); // Activa el juego
    setScore(0); // Reinicia el puntaje
    setGameTime(5); // Reinicia el tiempo
  };

  // Función para incrementar el puntaje
  const incrementarPuntaje = () => {
    if (isGameActive) {
      setScore((prevScore) => prevScore + 1); // Incrementa el puntaje
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Juego Contador</h1>

      {/* Mostrar puntaje máximo y puntaje actual */}
      <h2>Puntaje Máximo: {maxScore}</h2>
      <h2>Puntaje Actual: {score}</h2>

      {/* Mostrar el tiempo restante si el juego está activo */}
      {isGameActive && gameTime > 0 && <h2>Tiempo restante: {gameTime}s</h2>}

      {/* Botón para iniciar el juego o sumar puntos */}
      {!isGameActive ? (
        <button onClick={iniciarJuego}>Iniciar Juego</button>
      ) : (
        <button onClick={incrementarPuntaje} disabled={!isGameActive}>
          ¡Haz clic para sumar puntos!
        </button>
      )}

      {/* Mensaje cuando el tiempo se acaba */}
      {!isGameActive && gameTime === 0 && <h2>¡Juego Terminado!</h2>}
    </div>
  );
}

export default App;
