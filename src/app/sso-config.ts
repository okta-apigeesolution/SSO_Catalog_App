import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  
  // Url of the Identity Provider
  //issuer: 'https://idsvr4.azurewebsites.net',
  issuer: 'https://dev-551692.okta.com/oauth2/default',
  //issuer: 'https://dev-c2mu98m1.us.auth0.com/authorize',
  
  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin
  //   + ((localStorage.getItem('useHashLocationStrategy') === 'true')
  //     ? '/#/index.html'
  //     : '/index.html'),
  

  redirectUri: window.location.origin,

  // URL of the SPA to redirect the user after silent refresh
  //silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  //clientId: 'implicit',

  clientId: '0oa1k1j0phI6NKxYZ4x7',

  //clientId: 'Wx6aAHAis8xmfaAHVNw35eACzd7FY8io',


  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

   silentRefreshShowIFrame: true,

  showDebugInformation: true,

  sessionChecksEnabled: true

  // timeoutFactor: 0.01,
};