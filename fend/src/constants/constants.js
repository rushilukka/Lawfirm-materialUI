export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const APP_NAME = process.env.REACT_APP_NAME || 'Davda Associates';
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || 'en';
export const PHONE_NUMBER = process.env.REACT_APP_PHONE_NUMBER || '9428669848';
export const EMAIL_ID = process.env.REACT_APP_EMAIL_ID || 'rushi.lukka.315@gmail.com';

export const BOOKING_SERVICE = {
    CREATE_BOOKING: '/api/bookings/create-booking',
    GET_AVAILABLE_SLOTS: '/api/bookings/available-slots',
    DELETE_ALL_BOOKINGS: '/api/bookings/delete-enteries',
    SEARCH_BOOKINGS: '/api/bookings/fetch-records'
}
