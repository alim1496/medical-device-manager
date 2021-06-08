class Auth {
  static authenticateUser(token: string) {
    localStorage.setItem("jwt-token", token);
  }

  static isUserAuthenticated(): boolean {
    return localStorage.getItem("jwt-token") !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem("jwt-token");
  }

  static getToken(): string | null {
    return localStorage.getItem("jwt-token");
  }
}

export default Auth;
