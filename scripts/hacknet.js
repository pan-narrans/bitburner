/** @param {NS} ns **/
export async function main(ns) {

}

/** @param {NS} ns **/
export async function upgradeNodes(ns) {
	var node_index = 0;
	var n_upgrades = 1;

	var num_nodes = ns.hacknet.numNodes();
	ns.hacknet.getNodeStats(node_index);

	ns.hacknet.getPurchaseNodeCost();
	ns.hacknet.purchaseNode();

	ns.hacknet.getLevelUpgradeCost(node_index, n_upgrades);
	ns.hacknet.getRamUpgradeCost(node_index, n_upgrades);
	ns.hacknet.getCoreUpgradeCost(node_index, n_upgrades);

	ns.hacknet.upgradeLevel(node_index, n_upgrades);
	ns.hacknet.upgradeRam(node_index, n_upgrades);
	ns.hacknet.upgradeCore(node_index, n_upgrades);
}