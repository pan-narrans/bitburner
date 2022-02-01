/*
* get a way of assesing how much revenue we get from hacknet nodes per second
*
* 2 MAIN MODES:
* 	- EARLY GAME
* 		- buy cheapest
* 	- MID GAME (formulas API)
* 		- buy most profitable
*/
/* function upgradeInfo(node_index: number, upgrade_name: string, upgrade_value: number) {
    this.node = node_index;
    this.upgrade = upgrade_name;
    this.upgradeValue = upgrade_value;

    this.setNode = function (node_index) {
        node = node_index;
    }
} */
export async function main(ns) {
    const MONEY_PORT = ns.getPortHandle(1);
    let moneyPerS = 0;
    do {
        if (!MONEY_PORT.empty())
            moneyPerS = +MONEY_PORT.read();
        // if cost server < moneypers * 3600 * 5
        // buy
        // continue
        // look for cheapest upgrade from all servers
        void lookForCheapestUpgrade(ns);
        // if cost upgrade < moneypers * 3600 * 1
        // buy
        // continue
    } while (true);
}
async function lookForCheapestUpgrade(ns) {
    // get all servers
    const num_nodes = ns.hacknet.numNodes();
    const cheapestUpgrade = { node: 0, upgrade: "", upgradeValue: 0 };
    //const cheapestUpgrade = upgradeInfo(0, "", 0);
    const n_upgrades = 1;
    // get cheapestUpgrade from server
    // get cheapestUpgrade from all
    for (let node_index = 0; node_index < num_nodes; node_index++) {
        let auxValue;
        auxValue = ns.hacknet.getLevelUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.upgradeValue) {
            cheapestUpgrade.node = node_index;
            cheapestUpgrade.upgradeValue = auxValue;
            cheapestUpgrade.upgrade = "LEVEL";
        }
        auxValue = ns.hacknet.getRamUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.upgradeValue) {
            cheapestUpgrade.node = node_index;
            cheapestUpgrade.upgradeValue = auxValue;
            cheapestUpgrade.upgrade = "RAM";
        }
        auxValue = ns.hacknet.getCoreUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.upgradeValue) {
            cheapestUpgrade.node = node_index;
            cheapestUpgrade.upgradeValue = auxValue;
            cheapestUpgrade.upgrade = "CORE";
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImhhY2tuZXQvdXBncmFkZS1ub2Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7RUFRRTtBQUVGOzs7Ozs7OztJQVFJO0FBRUosTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUM3QixNQUFNLFVBQVUsR0FBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFFbEIsR0FBRztRQUNDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ25CLFNBQVMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQyx3Q0FBd0M7UUFDeEMsTUFBTTtRQUNOLFdBQVc7UUFFWCw2Q0FBNkM7UUFDN0MsS0FBSyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQyx5Q0FBeUM7UUFDekMsTUFBTTtRQUNOLFdBQVc7S0FFZCxRQUFRLElBQUksRUFBRTtBQUNuQixDQUFDO0FBRUQsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQU07SUFDeEMsa0JBQWtCO0lBQ2xCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsTUFBTSxlQUFlLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xFLGdEQUFnRDtJQUNoRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFHckIsa0NBQWtDO0lBQ2xDLCtCQUErQjtJQUUvQixLQUFLLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFO1FBQzNELElBQUksUUFBZ0IsQ0FBQztRQUVyQixRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRTtZQUN6QyxlQUFlLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUNsQyxlQUFlLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUN4QyxlQUFlLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUNyQztRQUVELFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRSxJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFO1lBQ3pDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBQ3hDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25DO1FBRUQsUUFBUSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDekMsZUFBZSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDbEMsZUFBZSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFDeEMsZUFBZSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDcEM7S0FDSjtBQUNMLENBQUMifQ==