import { useState } from "react";
import { BOARDS } from "../../constants";
import './BoardCarrusel.css';

const BoardCarrusel = ({ handleBoard }) => {
    const [change, setChange] = useState(0);

    const titulo = `${BOARDS[change].numCasillas}x${BOARDS[change].numCasillas}`;
    const imagen = BOARDS[change].image;

    const tamanio = BOARDS.length - 1;
    const handleChangePrev = () => {
        if (change > 0) {
            setChange(prevChange => prevChange - 1);
            handleBoard(change - 1);
        }
    }
    const handleChangeNext = () => {
        if (change < tamanio) {
            setChange(prevChange => prevChange + 1);
            handleBoard(change + 1);
        }

    }
    return (
        <div className="containerCarrusel">
            <button onClick={handleChangePrev} disabled={change == 0}>{"<"}</button>
            <div className="containerCenter">
                <h2>{titulo}</h2>
                <img className="imgTable" src={imagen} alt={`Tablero de ${titulo}`}/>
            </div>
            <button onClick={handleChangeNext} disabled={change == tamanio}>{">"}</button>
        </div>
    );
}

export default BoardCarrusel;
