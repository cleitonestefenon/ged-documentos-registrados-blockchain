export const isAuthenticated = () => {
      return sessionStorage.getItem('token') != null;
}
