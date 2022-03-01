import { NetscriptPort, NS } from '@ns'
 
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
  protected static ns: NS;
  constructor(ns: NS) {
    NodeUpgrader.ns = ns;
  }

  public async upgrade(): Promise<void> {
    //choose type of upgrade based on game progress
    void this.upgradeCheapest();
  }

  public async upgradeCheapest(): Promise<void> {
    // search cheapest upgrade
    const n_upgrades = 1
    const num_nodes = NodeUpgrader.ns.hacknet.numNodes();
    let currentvalue: number;

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