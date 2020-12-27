/**
 * Wrapper for specific event handler which resolves the Promise
 * returned by the specific event handler and then replies to the event.
 * On success replies with {Object} and on error with {Error}
 *
 * @param {function(): Promise} specificEventHandler - Function which returns Promise which resolves with {Object} and rejects with {Error}
 * @return {function(): void} Specific eventHandler function to be given for ipcMain.on as a second argument
 */
export const eventHandlerWrapper = (channelName, eventHandler) => {
  /**
   * Injects specific eventHandler function into the generic eventHandler
   * @param event {Event}
   * @param params {Object}
   * @returns {undefined}
   */

  // TÄMÄ EI OLE MIKÄÄN PROMISE
  // - tää on se, minkä ipcMain laukaisee
  // - tämä solvaa sitten tuon eventHandler promisen
  //   ja vastaa objektilla tai virheellä

  // Yhteneväiset logitukset tämän yhteyteen olis kova kans
  // - ei tarttis erikseen määrittää, vaan aina logittais kaikille samat
  // - tyyliin: console.log('Backend IPC: GENERATE_DIOGRAPH', path)
  //            console.log('Backend IPC: SAVE_ROOM', path, id)
  //            console.log('SAVE_HOME', home)
  // console.log(JSON.stringify(diograph, null, 2))
  // console.log(err.message)

  const specificEventHandler = (event, params) => {
    const success = (responseObject) => {
      event.reply(channelName, responseObject)
    }

    const err = (errorObject) => {
      event.reply(channelName, errorObject)
    }

    eventHandler(event, params).then(success, err)
  }

  return specificEventHandler
}
