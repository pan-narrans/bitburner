/** @param {NS} ns **/
export async function main(ns) {
	var sell_now = true;
	var sell_delay;

	ns.tprint("Script Initiated");

	while (true) {
		// If over 90% sell
		if (ns.hacknet.hashCapacity() * 0.9 < ns.hacknet.numHashes())
			sell_now = true;

		// If under 80% stop selling
		if (ns.hacknet.hashCapacity() * 0.85 > ns.hacknet.numHashes())
			sell_now = false;

		// Sell
		if (sell_now)
			ns.hacknet.spendHashes("Sell for Money");
		else
			await ns.sleep(10000);

		//sell_delay = ns.hacknet..
		await ns.sleep(10);
	}
}