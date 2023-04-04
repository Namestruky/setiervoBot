module.exports = {
  /**
   * Número aleatorio entre min y max (max no incluido)
   * @param {Number} min Mínimo
   * @param {Number} max Máximo
   * @returns number
   */
  randomRange(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  },
  /**
 * Envía un mensaje texto plano al canal definido en {{CHANNEL_ID}}
 * @param {string} messageBody Texto del mensaje
 */
  sendMessage(messageBody) {
  client.channels.cache.get(CHANNEL_ID).send(messageBody).then(() => {
      console.log('Mensaje enviado', messageBody);
  });
}
}