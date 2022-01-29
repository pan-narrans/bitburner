var servers = [];


/** @param {NS} ns**/
export async function main(ns) {
	await ReadServers(ns);

	for (var id in servers) {
		if (!ns.hasRootAccess(servers[id]))
			ns.installBackdoor();
	}
}


/** @param {NS} ns **/
async function ReadServers(ns) {
	servers = await ns.read('server_list.txt');
	servers = servers.split(',');
	await ns.sleep(100);
}