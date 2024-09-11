export const LOCAL_STORAGE_N_BOARD_KEY = 'numTable';
export const LOCAL_STORAGE_TURN_KEY = 'turn';
export const LOCAL_STORAGE_TABLE_KEY = 'table';

export const TURNS = {
    X: '❌',
    O: '⚪'
};

export const BOARDS = [
    {
        numCasillas: 3,
        tamanio : 9,
        image: "src/assets/table_3.jpeg",
        numFichaGanadoras: 3
    },
    {
        numCasillas: 6,
        tamanio: 36,
        image: "src/assets/table_6.jpeg",
        numFichaGanadoras: 4
    },
    {
        numCasillas: 9,
        tamanio: 81,
        image: "src/assets/table_9.jpeg",
        numFichaGanadoras: 5
    },
    {
        numCasillas: 11,
        tamanio: 121,
        image: "src/assets/table_11.jpeg",
        numFichaGanadoras: 6
    },
];