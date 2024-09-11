import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import BoardCarrusel from '../BoardCarrusel';
import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_N_BOARD_KEY, LOCAL_STORAGE_TURN_KEY, LOCAL_STORAGE_TABLE_KEY } from '../../constants';

const Welcome = () => {
    const [game, setGame] = useState({
        isSaveGame: false,
        numBoard : null,
    });

    const navigate = useNavigate();
    
    useEffect(() => {
    const savedBoard = localStorage.getItem(LOCAL_STORAGE_N_BOARD_KEY);
        if (savedBoard) setGame({ isSaveGame : true, numBoard: parseInt(savedBoard)});
    }, []);

    const handleBoard = (currentBoard) => {
        setGame( {... game, numBoard: currentBoard});
    }
// 
    const handleInicioJuego = () => {
        // Si no tiene un tablero, entonces que sea el inicial
        const selectedBoard = game.numBoard !== null ? game.numBoard : 0;
        localStorage.setItem(LOCAL_STORAGE_N_BOARD_KEY, selectedBoard);
        setGame({ isSaveGame: true, numBoard: selectedBoard});
        navigate('/juego')
    }

    const resetGame = () => {
        localStorage.removeItem(LOCAL_STORAGE_N_BOARD_KEY);
        setGame({isSaveGame: false, numBoard: null});
        localStorage.removeItem(LOCAL_STORAGE_TURN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_TABLE_KEY);
    }
    const renderOpciones = (
        <>
            <BoardCarrusel handleBoard={handleBoard} />
            <button onClick={handleInicioJuego}>Juguemos</button>
            <button>Configuracion</button>
            <h2>{game.numBoard}</h2>
        </>
    );

    const renderContinuar = (
        <>
            <button onClick={handleInicioJuego}> Continuar</button>
            <button onClick={resetGame}> Reset </button>
        </>
    );
    return (
        <div className="containerWelcome">
            <h1>triqui</h1>
            {game.isSaveGame ? renderContinuar : renderOpciones}
        </div>
    );
}

export default Welcome;
