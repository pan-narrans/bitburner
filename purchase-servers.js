var server_name = "server:(-.--.)";
var money_keep = 1000000000000;

/** @param {NS} ns **/
export async function main(ns) {

	var max_servers = ns.getPurchasedServerLimit();
	var purchased_servers = ns.getPurchasedServers();
	var max_ram = ns.getPurchasedServerMaxRam();

	while (purchased_servers.length < max_servers) {

		if (ns.getServerMoneyAvailable('home') < money_keep) {
			await ns.sleep(10000); // Sleep 10s
			continue;
		}

		if (ns.purchaseServer(server_name, max_ram) != "") {
			purchased_servers = ns.getPurchasedServers();
			ns.tprint("New server purchased: " + purchased_servers[purchased_servers.length - 1]);
		}

		await ns.run('spider.js')
		await ns.sleep(1000);
	}

	ns.print("Max number of server purchased.")

}