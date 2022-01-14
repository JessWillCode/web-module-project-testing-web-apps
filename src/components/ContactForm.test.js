import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm/>);
    
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into first name.', async () => {
    render(<ContactForm />);
    
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'jess');

    const errorMessages = await screen.findAllByTestId('error');

    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(async () => {
        const errors = screen.queryAllByTestId('error');
        expect(errors).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    
    const firstName= screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Jessica');
    
    const lastName= screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Williams');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    
    const email= screen.getByLabelText(/email*/i);
    userEvent.type(email, 'jesswill');
    
    const emailError = await screen.findByText(/email must be a valid email address/i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>); 

    const submit = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submit);

    const lastNameError = await screen.findByText(/lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    
    const firstName= screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Jessica');
    
    const lastName= screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Williams');

    const email= screen.getByLabelText(/email*/i);
    userEvent.type(email, 'jesswillcode@gmail.com');

    const submit = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submit);

    waitFor(async () => {
        const firstOutput= screen.queryByText(firstName);
        const lastOutput= screen.queryByText(lastName);
        const emailOutput= screen.queryByText(email);
        const messageOutput =screen.getByLabelText(/message/i);

        expect(firstOutput).toBeInTheDocument();
        expect(lastOutput).toBeInTheDocument();
        expect(emailOutput).toBeInTheDocument();
        expect(messageOutput).not.toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const message = screen.getByLabelText(/message/i);
    userEvent.type(message, 'Loyal, Brave, and True');
    
    const firstName= screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Jessica');
    
    const lastName= screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Williams');

    const email= screen.getByLabelText(/email*/i);
    userEvent.type(email, 'jesswillcode@gmail.com');

    const submit = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submit);

    waitFor(async () => {
        const firstOutput= screen.queryByText(firstName);
        const lastOutput= screen.queryByText(lastName);
        const emailOutput= screen.queryByText(email);
        const messageOutput =screen.getByLabelText(message);

        expect(firstOutput).toBeInTheDocument();
        expect(lastOutput).toBeInTheDocument();
        expect(emailOutput).toBeInTheDocument();
        expect(messageOutput).toBeInTheDocument();
    })

});