/**
 *  Возвращает строку с html для вывода сообщения об ошибку
 * @param {string} message Строка с текстом ошибки
 * @return {string}
 */
const errorMessage = (message) => `
  <span class="error-msg"> ${message}</span>
`;

export default errorMessage;
