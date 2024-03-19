import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {

  const signUp = jest.fn();

  beforeEach(() => {
    render(<SignUpForm signUp={signUp} />); 
  });

  test('calls signUp function on submit with form data', async () => {
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const firstNameInput = screen.getByLabelText('First name');
    const lastNameInput = screen.getByLabelText('Last name');
    const emailInput = screen.getByLabelText('Email');

    userEvent.type(usernameInput, 'testusername');
    userEvent.type(passwordInput, 'testpassword');
    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Doe');
    userEvent.type(emailInput, 'john@doe.com');

    userEvent.click(screen.getByText('Submit'));

    expect(signUp).toHaveBeenCalledWith({
      username: 'testusername',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com'
    });

  });

  test('displays alert on error', async () => {

    signUp.mockRejectedValueOnce({
      errors: ['Invalid username']
    });

    const usernameInput = screen.getByLabelText('Username');
    const submitBtn = screen.getByText('Submit');

    userEvent.type(usernameInput, 'badusername');
    userEvent.click(submitBtn);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Invalid username');

  });

  test('redirects to /companies on success', async () => {
    
    signUp.mockResolvedValueOnce({ success: true });

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitBtn = screen.getByText('Submit');

    userEvent.type(usernameInput, 'testusername');
    userEvent.type(passwordInput, 'testpassword');  
    userEvent.click(submitBtn);

    expect(window.location.pathname).toBe('/companies');

  });

});

