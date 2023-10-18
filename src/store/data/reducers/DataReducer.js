import * as actionTypes from '../actions/actionTypes';

const initialState = {
    forexData: [],
    cryptoData: [],
    stockData: [],
    prices: {},
    bars: []
};

const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FOREX_DATA:
            return {
                ...state,
                forexData: action.payload
            };
        case actionTypes.CRPTO_DATA:
            return {
                ...state,
                cryptoData: action.payload
            };
        case actionTypes.STOCK_DATA:
            return {
                ...state,
                stockData: action.payload
            };
        case actionTypes.ALL_PRICES:
            return {
                ...state,
                prices: action.payload
            };
        case actionTypes.PAIR_BARS:
            return {
                ...state,
                bars: action.payload
            };
        default:
            return state;
    }
}

export default DataReducer;
