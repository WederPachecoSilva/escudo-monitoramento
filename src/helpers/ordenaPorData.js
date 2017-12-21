/**
 * Ordena um array de boletos por data
 * de vencimento em ordem crescente
 * @param {{data_vencimento: Date}[]} arrBoletos
 * @returns {void}
 */
const ordenaPorData = arrBoletos => {
   arrBoletos.sort((a, b) => {
      return a.data_vencimento > b.data_vencimento
         ? 1
         : a.data_vencimento < b.data_vencimento ? -1 : 0;
   });
};

export default ordenaPorData;
