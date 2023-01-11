import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const token = {
    "response_code":0,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
  };

describe('Testa a página de Login', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(token),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    const idName = 'input-player-name';
    const idEmail = 'input-gravatar-email';
    const idButtonPlay = 'btn-play';
    const idButtonSettings = 'btn-settings';

    it('Testa se a tela possui input de Nome e Email', () => {
        renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId(idName);
        const inputEmail = screen.getByTestId(idEmail);
        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
    });

    it('Testa se a tela possui um Botão com o nome "Play" e se este fica habilitado ao ser preenchido todos os inputs.', () => {
        renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId(idName);
        const inputEmail = screen.getByTestId(idEmail);
        const button = screen.getByTestId(idButtonPlay);

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();

        userEvent.type(inputName, 'Maria');
        userEvent.type(inputEmail, 'maria@trybe.com');

        expect(button).toBeEnabled();
    });
    
    it('Testa se ao clicar no Botão "Play" é realizado uma requisição para buscar um token para o jogador.', () => {
        renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId(idName);
        const inputEmail = screen.getByTestId(idEmail);
        const button = screen.getByTestId(idButtonPlay);

        userEvent.type(inputName, 'Maria');
        userEvent.type(inputEmail, 'maria@trybe.com');
        userEvent.click(button);

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('Verifica se o token recebido pela requisição foi armazenado no Local Storage com a chave "token".', () => {
        renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId(idName);
        const inputEmail = screen.getByTestId(idEmail);
        const button = screen.getByTestId(idButtonPlay);

        userEvent.type(inputName, 'Maria');
        userEvent.type(inputEmail, 'maria@trybe.com');
        userEvent.click(button);

        expect(localStorage.getItem('token')).toBe(token.token);
    });

    it('Testa se ao clicar no Botão "Play" é redirecionado para a tela do jogo.', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId(idName);
        const inputEmail = screen.getByTestId(idEmail);
        const button = screen.getByTestId(idButtonPlay);

        userEvent.type(inputName, 'Maria');
        userEvent.type(inputEmail, 'maria@trybe.com');
        userEvent.click(button);

        expect(history.location.pathname).toBe('/game');
    });

    it('Testa se a tela possui um botão com o nome "Settings", e ao ser clicado ele direciona para a tela de configurações.', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttonSettings = screen.getByTestId(idButtonSettings);

        expect(buttonSettings).toBeInTheDocument();

        userEvent.click(buttonSettings);
        expect(history.location.pathname).toBe('/settings'); 

        const title = screen.getByTestId('settings-title');
        expect(title).toBeInTheDocument();
    });

});