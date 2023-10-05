export function initLogin() {
  return {
    isLoading: false,
    login() {
      this.isLoading = true;
      setTimeout(() => {
        this.$store.app.isLoggedIn = true;
        window.location.href = '/';
      }, 1500);
    }
  }
}