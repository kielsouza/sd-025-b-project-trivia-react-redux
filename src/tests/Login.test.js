import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { tokenResponseMock, questionResponseMock } from './mocks';

describe('Testa a página de Login', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest
          .fn(() => tokenResponseMock)
          .mockImplementationOnce(() => tokenResponseMock)
          .mockImplementationOnce(() => questionResponseMock),
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
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('Testa se a tela possui um Botão com o nome "Play" e se este fica habilitado ao ser preenchido todos os inputs.', async () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const button = screen.getByTestId(idButtonPlay);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await act(() => userEvent.type(inputName, 'Maria'));
    await act(() => userEvent.type(inputEmail, 'maria@trybe.com'));

    expect(button).toBeEnabled();
  });

  it('Testa se ao clicar no Botão "Play" é realizado uma requisição para buscar um token para o jogador.', async () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const button = screen.getByTestId(idButtonPlay);

    await act(() => userEvent.type(inputName, 'Maria'));
    await act(() => userEvent.type(inputEmail, 'maria@trybe.com'));
    await act(() => userEvent.click(button));

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('Verifica se o token recebido pela requisição foi armazenado no Local Storage com a chave "token".', async () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const button = screen.getByTestId(idButtonPlay);

    await act(() => userEvent.type(inputName, 'Maria'));
    await act(() => userEvent.type(inputEmail, 'maria@trybe.com'));
    await act(() => userEvent.click(button));

    expect(localStorage.getItem('token')).toBe(tokenResponseMock.token);
  });

  it('Testa se ao clicar no Botão "Play" é redirecionado para a tela do jogo.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);
    const button = screen.getByTestId(idButtonPlay);

    await act(() => userEvent.type(inputName, 'Maria'));
    await act(() => userEvent.type(inputEmail, 'maria@trybe.com'));
    await act(() => userEvent.click(button));

    expect(history.location.pathname).toBe('/game');
  });

  it('Testa se a tela possui um botão com o nome "Settings", e ao ser clicado ele direciona para a tela de configurações.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByTestId(idButtonSettings);

    expect(buttonSettings).toBeInTheDocument();

    await act(() => userEvent.click(buttonSettings));
    expect(history.location.pathname).toBe('/settings');

    const title = screen.getByTestId('settings-title');
    expect(title).toBeInTheDocument();
  });

});