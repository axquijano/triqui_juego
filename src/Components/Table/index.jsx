import {  useState, useRef } from 'react';
import Box from '../Box/index'
import './Table.css'
import confetti from 'canvas-confetti';
import { TURNS, BOARDS, LOCAL_STORAGE_N_BOARD_KEY, LOCAL_STORAGE_TABLE_KEY, LOCAL_STORAGE_TURN_KEY } from '../../constants';
import { checkEndGame, checkWinner } from '../../logic/board';
import WinnerModal from "../WinnerModal";


const Table = () => {
    // Recuperar tablero guardado de localStorage
    const numTable = useRef(JSON.parse(localStorage.getItem(LOCAL_STORAGE_N_BOARD_KEY)) || 0);
    const boardConfig = BOARDS[numTable.current];

    const [table, setTable] = useState(
        () => {
            const savedTable = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TABLE_KEY));
            return savedTable || Array(boardConfig.tamanio).fill(null);
        }
    );

    const [activeTurn, setActiveTurn] = useState(
        () => {
            const savedTurn = localStorage.getItem(LOCAL_STORAGE_TURN_KEY);
            return savedTurn || TURNS.X
        }
    );

    //null no hay ganador, false empate 
    const [winner, setWinner] = useState(null);

    const resetPartida = () => {
        const newBoard = Array(boardConfig.tamanio).fill(null);
        setTable(newBoard);
        setActiveTurn(TURNS.X);
        setWinner(null);
        localStorage.removeItem(LOCAL_STORAGE_TURN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_TABLE_KEY);
    };

    const handleOnClick = (index) => {

        if (table[index] || winner) return

        const updateBoard = [...table];
        updateBoard[index] = activeTurn;
        setTable(updateBoard);

        const newTurn = activeTurn == TURNS.X ? TURNS.O : TURNS.X;
        setActiveTurn(newTurn);
        localStorage.setItem(LOCAL_STORAGE_TURN_KEY, newTurn);
        localStorage.setItem(LOCAL_STORAGE_TABLE_KEY, JSON.stringify(updateBoard));

        const newWinner = checkWinner(updateBoard, index, boardConfig);

        if (newWinner) {
            setWinner(newWinner);
            confetti();
        } else if (checkEndGame(updateBoard)) {
            setWinner(false);
        }
    }

    const renderBox = table.map((value, index) => (
        <Box
            key={`box-${index}-${value}`}
            onClick={() => handleOnClick(index)}
        >
            {value}
        </Box>
    ));

    return (
        <div>
            <h2>Triqui</h2>
            <button className='btnReset' onClick={resetPartida}>
                Reset del juego
            </button>

            <div className={` table containerTable_${numTable.current}`}>
                {renderBox}
            </div>
            <section className='turn'>
                <Box isSelect={activeTurn === TURNS.X} >{TURNS.X}</Box>
                <Box isSelect={activeTurn === TURNS.O} >{TURNS.O}</Box>
            </section>
            <WinnerModal winner={winner} resetJuego={resetPartida} />
        </div>
    );
}

export default Table;
