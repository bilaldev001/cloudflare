import * as actionTypes from './actionTypes';
import Axios from '@/axios/Axios';

export const tradingData = () => dispatch => {
    Axios.get('assets')
        .then(response => {
            Axios.get('payouts')
                .then(payoutResponse => {
                    const forexData = response.data.filter(forex => (forex.market === 'forex' && forex.enabled));
                    const cryptoData = response.data.filter(crypto => crypto.market === 'crypto' && crypto.enabled);
                    const stocksData = response.data.filter(stock => (stock.market !== 'crypto' && stock.market !== 'forex' && stock.enabled));

                    const finalForexData = forexData.map(forex => {
                        if (payoutResponse.data.hasOwnProperty(forex.name)) {
                            return { ...forex, isFav: false, payout: +(payoutResponse.data[forex.name] * 100).toFixed(1) };
                        }
                    }).filter(el => !!el);

                    const finalCryptoData = cryptoData.map(forex => {
                        if (payoutResponse.data.hasOwnProperty(forex.name)) {
                            return { ...forex, isFav: false, payout: +(payoutResponse.data[forex.name] * 100).toFixed(1) };
                        }
                    }).filter(el => !!el);

                    const finalStockData = stocksData.map(forex => {
                        if (payoutResponse.data.hasOwnProperty(forex.name)) {
                            return { ...forex, isFav: false, payout: +(payoutResponse.data[forex.name] * 100).toFixed(1) };
                        }
                    }).filter(el => !!el);
                    dispatch({
                        type: actionTypes.FOREX_DATA,
                        payload: finalForexData
                    });

                    dispatch({
                        type: actionTypes.CRPTO_DATA,
                        payload: finalCryptoData
                    });

                    dispatch({
                        type: actionTypes.STOCK_DATA,
                        payload: finalStockData
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
};

export const getPrices = () => dispatch => {
    Axios.get('prices')
        .then(response => {
            dispatch({
                type: actionTypes.ALL_PRICES,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
};

export const getBars = pair => dispatch => {
    Axios.get(`bars?pair=${pair}`)
        .then(response => {
            dispatch({
                type: actionTypes.PAIR_BARS,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
};