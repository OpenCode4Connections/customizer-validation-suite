import prodNA from '../env/prod-na';
import prodEU from '../env/prod-eu';
import prodAP from '../env/prod-ap';

export const PROD_NA = 'PROD_NA';
export const PROD_EU = 'PROD_EU';
export const PROD_AP = 'PROD_AP';

export default class ServerHelper {
  static getServer(serverName) {
    if (serverName === PROD_NA) {
      return prodNA;
    }
    if (serverName === PROD_EU) {
      return prodEU;
    }
    if (serverName === PROD_AP) {
      return prodAP;
    }
    return prodNA;
  }
}
