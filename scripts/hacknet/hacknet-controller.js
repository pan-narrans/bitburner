import { NodeUpgrader } from "/hacknet/upgrade-nodes";
export async function main(ns) {
    // necesitamos comprar antes un nodo para poder comprobarlo
    const hasSourceFile9 = await checkSF9(ns);
    const upgrader = new NodeUpgrader(ns);
    await upgrader.upgradeCheapest();
}
async function checkSF9(ns) {
    try {
        ns.tprint(ns.hacknet.getNodeStats(0).hashCapacity);
        return true;
    }
    catch (error) {
        return false;
    }
}
export async function upgradeNodes(ns) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja25ldC1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsiaGFja25ldC9oYWNrbmV0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS3RELE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFFaEMsMkRBQTJEO0lBQzNELE1BQU0sY0FBYyxHQUFZLE1BQU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBRWxDLENBQUM7QUFFRCxLQUFLLFVBQVUsUUFBUSxDQUFDLEVBQU07SUFDN0IsSUFBSTtRQUNILEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUM7S0FDWjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2YsT0FBTyxLQUFLLENBQUM7S0FDYjtBQUNGLENBQUM7QUFJRCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FBQyxFQUFNO0lBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JFO0FBQ0gsQ0FBQyJ9