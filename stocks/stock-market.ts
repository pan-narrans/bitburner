// Built upon u/pwillia7 's stock script.
// u/ferrus_aub stock script using simple portfolio algorithm.
import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
  const maxSharePer = 1.00
  const stockBuyPer = 0.60
  const stockVolPer = 0.05
  const moneyKeep = 500000000
  const minSharePer = 5
  let position: number[];

  while (true) {
    ns.disableLog('disableLog');
    ns.disableLog('sleep');
    ns.disableLog('getServerMoneyAvailable');
    const stocks = ns.stock.getSymbols().sort(function (a, b) { return ns.stock.getForecast(b) - ns.stock.getForecast(a); })
    for (const stock of stocks) {
      position = ns.stock.getPosition(stock);
      if (position[0]) {
        //ns.print('Position: ' + stock + ', ')
        sellPositions(stock);
      }
      buyPositions(stock);
    }
    ns.print('Cycle Complete');
    await ns.sleep(6000);
  }
  function buyPositions(stock: string) {
    const maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[0];
    const askPrice = ns.stock.getAskPrice(stock);
    const forecast = ns.stock.getForecast(stock);
    const volPer = ns.stock.getVolatility(stock);
    const playerMoney = ns.getServerMoneyAvailable('home');

    if (forecast >= stockBuyPer && volPer <= stockVolPer) {
      if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock, minSharePer, "Long")) {
        const shares = Math.min((playerMoney - moneyKeep - 100000) / askPrice, maxShares);
        ns.stock.buy(stock, shares);
        //ns.print('Bought: '+ stock + '')
      }
    }
  }
  function sellPositions(stock: string) {
    const forecast = ns.stock.getForecast(stock);
    if (forecast < 0.5) {
      ns.stock.sell(stock, position[0]);
      //ns.print('Sold: '+ stock + '')
    }
  }
}