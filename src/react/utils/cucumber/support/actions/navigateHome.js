export function navigateHome() {
  this.app.find('button[data-testid="home"]').simulate('click')
}
