/**
 * Wrapper for specific event handler which resolves the Promise
 * returned by the specific event handler and then replies to the event.
 * On success replies with {Object} and on error with {Error}
 *
 * @param {function(): Promise} specificEventHandler - Function which returns Promise which resolves with {Object} and rejects with {Error}
 * @return {function(): void} Specific eventHandler function to be given for ipcMain.on as a second argument
 */
export const handleEvent = (eventHandler) => {
  /**
   * Injects specific eventHandler function into the generic eventHandler
   * @param event {Event}
   * @param params {Object}
   * @returns {undefined}
   */
  const specificEventHandler = (event, params) => {
    eventHandler(event, params).then(
      (responseObject) => {
        event.reply(responseObject)
      },
      (errorObject) => {
        event.reply(errorObject)
      }
    )
  }
  return specificEventHandler
}
