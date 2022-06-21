import CryptoJS from 'crypto-js';

interface UserTokenProps {
  accessToken: string;
  refreshToken: string;
  tenant: string;
}

const localstorageName = process.env.REACT_APP_PROJECT_NAME || 'pocz';
const tokenSecret = process.env.REACT_APP_TOKEN_SECRET || 'secret';

function encryptUser(data: UserTokenProps): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), tokenSecret).toString();
}

function decryptUser(): UserTokenProps {
  let user = { accessToken: '', refreshToken: '', tenant: '' };
  const cypherdata = localStorage.getItem(localstorageName) as string;
  if (cypherdata) {
    const bytes = CryptoJS.AES.decrypt(cypherdata, tokenSecret);
    user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return user;
}

function getLocalTenantId(): string {
  const user = decryptUser();
  return user.tenant;
}

function getLocalRefreshToken(): string {
  const user = decryptUser();
  return user.refreshToken;
}

function getLocalAccessToken(): string {
  const user = decryptUser();
  return user.accessToken;
}

function updateLocalAccessToken(token: string): void {
  const user = decryptUser();
  user.accessToken = token;
  const cypherdata = encryptUser({
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    tenant: user.tenant,
  });
  localStorage.setItem(localstorageName, cypherdata);
}

function getUser(): UserTokenProps {
  return decryptUser();
}

function setUser(data: UserTokenProps): void {
  localStorage.setItem(
    localstorageName,
    encryptUser({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tenant: data.tenant,
    }),
  );
}

function removeUser(): void {
  localStorage.removeItem(localstorageName);
}

export const TokenService = {
  getLocalTenantId,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
