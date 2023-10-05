export function initNavbarBottom() {
    return {
        isBottomNavActive: true,
        scroll() {
            if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 100) {
                this.isBottomNavActive = false;
            } else {
                this.isBottomNavActive = true;
            }
        },
    }
}