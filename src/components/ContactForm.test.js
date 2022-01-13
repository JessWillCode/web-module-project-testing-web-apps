import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(
        <h1>Contact Form</h1>
    );
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'jess');
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName= screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, '');
    
    const lastName= screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, '');

    const email= screen.getByPlaceholderText(/bluebill/i);
    userEvent.type(email, '');
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName= screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'Jessica');
    
    const lastName= screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, 'Williams');

    const email= screen.getByPlaceholderText(/bluebill/i);
    userEvent.type(email, '');
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});