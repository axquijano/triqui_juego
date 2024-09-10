import './Box.css';

const Box = ({ children, onClick , isSelect }) => {
    return (
        <div className={`box ${isSelect ? 'isSelect' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default Box;
