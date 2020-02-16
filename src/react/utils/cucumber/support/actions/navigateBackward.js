export function navigateBackward() {
  this.app.find('button[data-testid="navigate-left"]').simulate('click')
}
