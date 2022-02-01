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
    this.upgradeValue = upgrade_value;

    this.setNode = function (node_index) {
        node = node_index;
    }
} */

export async function main(ns: NS): Promise<void> {
    const MONEY_PORT: NetscriptPort = ns.getPortHandle(1);
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

async function lookForCheapestUpgrade(ns: NS): Promise<void> {
    // get all servers
    const num_nodes = ns.hacknet.numNodes();
    const cheapestUpgrade = { node: 0, upgrade: "", upgradeValue: 0 };
    //const cheapestUpgrade = upgradeInfo(0, "", 0);
    const n_upgrades = 1;


    // get cheapestUpgrade from server
    // get cheapestUpgrade from all

    for (let node_index = 0; node_index < num_nodes; node_index++) {
        let auxValue: number;

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