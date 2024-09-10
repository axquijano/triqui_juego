import Box from "../Box";
import './WinnerModal.css';
// eslint-disable-next-line react/prop-types
const WinnerModal = ({ winner, resetJuego }) => {
    if(winner == null) return;
    const winnerText = winner ? 'Ganó :' : 'Empate';
    const winnerEmojin = winner ? winner : '🤝';
    return (
        <section className='winner'>
            <div className="text">
                <h3>{winnerText}</h3>
                <Box>{winnerEmojin}</Box>
                <button onClick={resetJuego} className='btnReset'> Empezar de nuevo</button>
            </div>
        </section>
    );
}

export default WinnerModal;
