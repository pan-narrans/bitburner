import { NodeStats } from "/../NetscriptDefinitions";
import { NodeUpgrader } from "/hacknet/upgrade-nodes";


 

export async function main(ns: NS): Promise<void> {

	// necesitamos comprar antes un nodo para poder comprobarlo
	const hasSourceFile9: boolean = await checkSF9(ns);
	const upgrader = new NodeUpgrader(ns);

	await upgrader.upgradeCheapest();

}

async function checkSF9(ns: NS) {
	try {
		ns.tprint(ns.hacknet.getNodeStats(0).hashCapacity);
		return true;
	} catch (error) {
		return false;
	}
}



export async function upgradeNodes(ns: NS): Promise<void> {
	/* const node_index = 0;
	const n_upgrades = 1;

	const num_nodes = ns.hacknet.numNodes();
	ns.hacknet.getNodeStats(node_index);

	ns.hacknet.getPurchaseNodeCost();
	ns.hacknet.purchaseNode();

	ns.hacknet.getLevelUpgradeCost(node_index, n_upgrades);
	ns.hacknet.getRamUpgradeCost(node_index, n_upgrades);
	ns.hacknet.getCoreUpgradeCost(node_index, n_upgrades);

	ns.hacknet.upgradeLevel(node_index, n_upgrades);
	ns.hacknet.upgradeRam(node_index, n_upgrades);
	ns.hacknet.upgradeCore(node_index, n_upgrades);
	*/
}