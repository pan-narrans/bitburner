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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImhhY2tuZXQvdXBncmFkZS1ub2Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7RUFRRTtBQUVGOzs7Ozs7OztJQVFJO0FBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ0k7QUFFSixNQUFNLE9BQU8sWUFBWTtJQUNYLE1BQU0sQ0FBQyxFQUFFLENBQUs7SUFDeEIsWUFBWSxFQUFNO1FBQ2QsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLCtDQUErQztRQUMvQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWU7UUFDeEIsMEJBQTBCO1FBQzFCLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQTtRQUNwQixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRCxJQUFJLFlBQW9CLENBQUM7UUFFekIsTUFBTSxhQUFhLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlELGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWxGLCtEQUErRDtRQUUvRCxLQUFLLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQzNELFlBQVksR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkYsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsYUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBQ2pDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxhQUFhLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNqQztZQUVELFlBQVksR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakYsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsYUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBQ2pDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUMvQjtZQUVELFlBQVksR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEYsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsYUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBQ2pDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUNoQztTQUNKO1FBRUQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEMsY0FBYztRQUNkLFFBQVEsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUN6QixLQUFLLE9BQU87Z0JBQ1IsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3RFLE1BQU07WUFDVixLQUFLLEtBQUs7Z0JBQ04sWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3JFLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0NBRUoifQ==