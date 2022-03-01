export async function main(ns) {
    const maxSharePer = 1.00;
    const stockBuyPer = 0.60;
    const stockVolPer = 0.05;
    const moneyKeep = 500000000;
    const minSharePer = 5;
    let position;
    while (true) {
        ns.disableLog('disableLog');
        ns.disableLog('sleep');
        ns.disableLog('getServerMoneyAvailable');
        const stocks = ns.stock.getSymbols().sort(function (a, b) { return ns.stock.getForecast(b) - ns.stock.getForecast(a); });
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
    function buyPositions(stock) {
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
    function sellPositions(stock) {
        const forecast = ns.stock.getForecast(stock);
        if (forecast < 0.5) {
            ns.stock.sell(stock, position[0]);
            //ns.print('Sold: '+ stock + '')
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2stbWFya2V0LmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic3RvY2tzL3N0b2NrLW1hcmtldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQTtJQUN4QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUE7SUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBQ3hCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUE7SUFDckIsSUFBSSxRQUFrQixDQUFDO0lBRXZCLE9BQU8sSUFBSSxFQUFFO1FBQ1gsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hILEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZix1Q0FBdUM7Z0JBQ3ZDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtZQUNELFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQjtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzQixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEI7SUFDRCxTQUFTLFlBQVksQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2RCxJQUFJLFFBQVEsSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLFdBQVcsRUFBRTtZQUNwRCxJQUFJLFdBQVcsR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDbEYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLGtDQUFrQzthQUNuQztTQUNGO0lBQ0gsQ0FBQztJQUNELFNBQVMsYUFBYSxDQUFDLEtBQWE7UUFDbEMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxnQ0FBZ0M7U0FDakM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyJ9