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
    this.value = upgrade_value;

    this.setNode = function (node_index) {
        node = node_index;
    }
} */
/* export async function main(ns: NS): Promise<void> {
    const MONEY_PORT: NetscriptPort = ns.getPortHandle(1);
    const moneyPerS = 0;

}

async function lookForCheapestUpgrade(ns: NS): Promise<void> {
    // get all servers
    const num_nodes = NodeUpgrader.ns.hacknet.numNodes();
    const cheapestUpgrade = { uNode: 0, upgrade: "", uValue: 0 };
    const n_upgrades = 1;


    // get cheapestUpgrade from server
    // get cheapestUpgrade from all

    for (let node_index = 0; node_index < num_nodes; node_index++) {
        let auxValue: number;

        auxValue = NodeUpgrader.ns.hacknet.getLevelUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.uValue) {
            cheapestUpgrade.uNode = node_index;
            cheapestUpgrade.uValue = auxValue;
            cheapestUpgrade.upgrade = "LEVEL";
        }

        auxValue = NodeUpgrader.ns.hacknet.getRamUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.uValue) {
            cheapestUpgrade.uNode = node_index;
            cheapestUpgrade.uValue = auxValue;
            cheapestUpgrade.upgrade = "RAM";
        }

        auxValue = NodeUpgrader.ns.hacknet.getCoreUpgradeCost(node_index, n_upgrades);
        if (auxValue < cheapestUpgrade.uValue) {
            cheapestUpgrade.uNode = node_index;
            cheapestUpgrade.uValue = auxValue;
            cheapestUpgrade.upgrade = "CORE";
        }
    }

    NodeUpgrader.ns.tprint(cheapestUpgrade);

} */
export class NodeUpgrader {
    static ns;
    constructor(ns) {
        NodeUpgrader.ns = ns;
    }
    async upgrade() {
        //choose type of upgrade based on game progress
        void this.upgradeCheapest();
    }
    async upgradeCheapest() {
        // search cheapest upgrade
        const n_upgrades = 1;
        const num_nodes = NodeUpgrader.ns.hacknet.numNodes();
        let currentvalue;
        const chosenUpgrade = { uNode: 0, uName: "LEVEL", uValue: 0 };
        chosenUpgrade.uValue = NodeUpgrader.ns.hacknet.getLevelUpgradeCost(0, n_upgrades);
        //cheapest = NodeUpgrader.ns.hacknet.getLevelUpgradeCost(0, 1);
        for (let node_index = 0; node_index < num_nodes; node_index++) {
            currentvalue = NodeUpgrader.ns.hacknet.getLevelUpgradeCost(node_index, n_upgrades);
            if (currentvalue < chosenUpgrade.uValue) {
                chosenUpgrade.uNode = node_index;
                chosenUpgrade.uValue = currentvalue;
                chosenUpgrade.uName = "LEVEL";
            }
            currentvalue = NodeUpgrader.ns.hacknet.getRamUpgradeCost(node_index, n_upgrades);
            if (currentvalue < chosenUpgrade.uValue) {
                chosenUpgrade.uNode = node_index;
                chosenUpgrade.uValue = currentvalue;
                chosenUpgrade.uName = "RAM";
            }
            currentvalue = NodeUpgrader.ns.hacknet.getCoreUpgradeCost(node_index, n_upgrades);
            if (currentvalue < chosenUpgrade.uValue) {
                chosenUpgrade.uNode = node_index;
                chosenUpgrade.uValue = currentvalue;
                chosenUpgrade.uName = "CORE";
            }
        }
        NodeUpgrader.ns.tprint(chosenUpgrade);
        // buy upgrade
        switch (chosenUpgrade.uName) {
            case "LEVEL":
                NodeUpgrader.ns.hacknet.upgradeLevel(chosenUpgrade.uNode, n_upgrades);
                break;
            case "RAM":
                NodeUpgrader.ns.hacknet.upgradeRam(chosenUpgrade.uNode, n_upgrades);
                break;
            case "CORE":
                NodeUpgrader.ns.hacknet.upgradeCore(chosenUpgrade.uNode, n_upgrades);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImhhY2tuZXQvdXBncmFkZS1ub2Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7RUFRRTtBQUVGOzs7Ozs7OztJQVFJO0FBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ0k7QUFFSixNQUFNLE9BQU8sWUFBWTtJQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUs7SUFDeEIsWUFBWSxFQUFNO1FBQ2hCLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQiwrQ0FBK0M7UUFDL0MsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlO1FBQzFCLDBCQUEwQjtRQUMxQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFDcEIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckQsSUFBSSxZQUFvQixDQUFDO1FBRXpCLE1BQU0sYUFBYSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM5RCxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVsRiwrREFBK0Q7UUFFL0QsS0FBSyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUM3RCxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ25GLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2dCQUNqQyxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFDcEMsYUFBYSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7YUFDL0I7WUFFRCxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2dCQUNqQyxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFDcEMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDN0I7WUFFRCxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2dCQUNqQyxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFDcEMsYUFBYSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDOUI7U0FDRjtRQUVELFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRDLGNBQWM7UUFDZCxRQUFRLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDM0IsS0FBSyxPQUFPO2dCQUNWLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RSxNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQztDQUVGIn0=