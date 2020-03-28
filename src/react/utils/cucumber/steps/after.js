import { After } from 'cucumber'

After(function () {
  if (this.app) {
    this.app.detach()
  }
})
