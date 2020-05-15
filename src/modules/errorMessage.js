/**
 *  Returns a string with html to output an error message.
 * @param {string} message - error text
 * @return {string}
 */
const errorMessage = (message) => `
  <span class="error-msg"> ${message}</span>
`;

export default errorMessage;
