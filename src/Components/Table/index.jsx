import { useEffect, useState, } from 'react';
import Box from '../Box/index'
import './Table.css'
import confetti from 'canvas-confetti';
import { TURNS } from '../../constants';
import { checkEndGame, checkWinner } from '../../logic/board';
import WinnerModal from "../WinnerModal";


const Table = () => {
    const [activeTurn, setActiveTurn] = useState(TURNS.X);
    const [table, setTable] = useState(
        Array(9).fill(null)
    );
    //null no hay ganador, false empate 
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const turnStorage = localStorage.getItem('turn') || '';
        const tableStorage = JSON.parse(localStorage.getItem('table')) || [];

        if (turnStorage.length != 0) {
            setActiveTurn(turnStorage);
        }
        if (tableStorage.length != 0) {
            setTable(tableStorage);
        }
    }, []);

    const resetPartida = () => {

        const arrayTable = Array(9).fill(null);
        setTable(arrayTable);
        setActiveTurn(TURNS.X);
        setWinner(null);
        localStorage.removeItem('turn');
        localStorage.removeItem('table');
    };

    const handleOnClick = (index) => {

        if (table[index] || winner) return
        const tableArray = [...table];
        tableArray[index] = activeTurn;
        setTable(tableArray);
        const valor = activeTurn == TURNS.X ? TURNS.O : TURNS.X;
        setActiveTurn(valor);
        localStorage.setItem('turn', valor);
        localStorage.setItem('table', JSON.stringify(tableArray));
        const newWinner = checkWinner(tableArray);
        if (newWinner) {
            setWinner(newWinner);
            confetti();
        } else if (checkEndGame(tableArray)) {
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

            <div className={` table containerTable_0`}>
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
