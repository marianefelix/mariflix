const baseURL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://mariflix.herokuapp.com';

    
export default {
    baseURL,
}