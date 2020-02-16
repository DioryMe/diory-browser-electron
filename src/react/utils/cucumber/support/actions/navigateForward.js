export function navigateForward() {
  this.app.find('button[data-testid="navigate-right"]').simulate('click')
}
