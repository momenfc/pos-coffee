const TOKEN_LOCALSTORAGE_KEY = 'access-token';

interface TokenStorage {
  getToken: () => string | undefined;
  setToken: (token: string) => void;
  clearToken: () => void;
}

function getToken() {
  const Token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  return Token ? JSON.parse(Token) : undefined;
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(token));
}

function clearToken() {
  localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
}

const tokenStorage: TokenStorage = { getToken, setToken, clearToken };
export default tokenStorage;
