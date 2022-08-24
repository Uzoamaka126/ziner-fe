import decode from 'jwt-decode';
import api from '../plugins/api';

const TOKEN = 'token';

// clear token from LS
export function clearToken() {
    return localStorage.removeItem(TOKEN);
}

// set token on LS
export function setToken(token) {
    var jwt_token = token;
    return localStorage.setItem(TOKEN, jwt_token);
}

// fetch token from LS
function getToken() {
    return localStorage.getItem(TOKEN);
}

// Takes in a token, decodes it and returns its expiry date
function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

// Check if token in LS is expired
function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

export const isUserAuthenticated = () => {
    const token = getToken();
    return !!token
}

export function isRouteAuthRequired(to, from, next) {
    if (!isUserAuthenticated()) {
        console.log('!isUserAuthenticated:', !isUserAuthenticated);
        console.log('fullPath:', to);
        next({ name : 'login'});
    } else {
        next();
    }
}

export function logout() {
    clearToken();
}

export function getUserDetails (){
    return localStorage.getItem('userDetails')
}