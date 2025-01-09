import { zip } from "lodash"

export const newUserData = {
    email: `user${Math.floor(Math.random() * 10000)}@example.com`,
    password: Math.random().toString(36).slice(-10) + 'A!@#',
    securityQuestion: ' Your eldest siblings middle name? ',
    securityAnswer: 'Paul'
}

export const existingUserData = {
    email: 'test008@gmail.com',
    password: 'Test@123'
}

export const userAddressDetails = {
    country: 'Test Country',
    name: 'Test User',
    mobileNo: '1234567890',
    zipCode: '123456',
    address: '1234, Test Street',
    city: 'Test City',
    state: 'Test State'
}

export const userCardDetails = {
    name: 'Test User',
    cardNumber: Math.floor(1e15 + Math.random() * 9e15).toString(),
    expiryMonth: '2',
    expiryYear: '2087',
}