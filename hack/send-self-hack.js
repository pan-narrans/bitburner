var servers_to_hack = [];
var hack_script = '/hack/hack-template.js';
var threads_on_home;

/** @param {NS} ns**/
export async function main(ns) {

	ns.tprint("Script Initiated");

	await ReadServers(ns);
	await ns.sleep(1000);
	await CalcThreads(ns);
	await HackServers(ns);
}

/** @param {NS} ns **/
async function CalcThreads(ns) {
	var script_ram = ns.getScriptRam(hack_script);
	var home_ram = ns.getServerMaxRam('home');
	// var expected_scripts = servers_to_hack.length + 1;
	var expected_scripts = 15;

	threads_on_home = Math.floor(home_ram / (expected_scripts * script_ram));
	threads_on_home = (threads_on_home == 0) ? 1 : threads_on_home;
}

/** @param {NS} ns **/
async function ReadServers(ns) {
	servers_to_hack = await ns.read('target_servers.txt');
	servers_to_hack = servers_to_hack.split(',');
}

/** @param {NS} ns**/
async function HackServers(ns) {

	while (servers_to_hack.length > 0) {
		for (var id in servers_to_hack) {
			var hacked = await CrackServer(ns, servers_to_hack[id]);
			if (hacked)
				servers_to_hack.splice(id, 1);
		}

		await ns.sleep(1000);
	}

}


/** @param {NS} ns**/
async function CrackServer(ns, target) {

	var script_ram = ns.getScriptRam(hack_script);
	var max_ram = ns.getServerMaxRam(target);
	var threads = Math.floor(max_ram / script_ram);

	if (!ns.hasRootAccess(target)) {

		// Try to open ports
		var open_ports = 1;
		if (ns.fileExists('BruteSSH.exe')) { ns.brutessh(target); open_ports++; }
		if (ns.fileExists('FTPCrack.exe')) { ns.ftpcrack(target); open_ports++; }
		if (ns.fileExists('relaySMTP.exe')) { ns.relaysmtp(target); open_ports++; }
		if (ns.fileExists('HTTPWorm.exe')) { ns.httpworm(target); open_ports++; }
		if (ns.fileExists('SQLInject.exe')) { ns.sqlinject(target); open_ports++; }

		// If all needed ports are open, nuke the target
		if (ns.getServerNumPortsRequired(target) < open_ports) { ns.nuke(target); }

	} else {

		ns.print("Trying to hack " + target + "... \n");

		if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
			// CAN HACK
			var min_security = ns.getServerMinSecurityLevel(target);
			var max_money = ns.getServerMaxMoney(target);

			// Upload hack script
			await ns.scp(hack_script, target);

			// Calculate threads
			threads = (threads > 1) ? threads - 1 : 1;

			ns.tprint("Hacking " + target + "... \n");
			ns.killall(target);

			// Run script on target
			ns.exec(hack_script, target, threads, target, min_security, max_money);

			// Run script on home
			// TODO:
			ns.run(hack_script, threads_on_home, target, min_security, max_money);

			return true;
		} else {
			// CAN'T HACK
			ns.print("Can't hack " + target + " yet... \n");
		}
	}

	return false;
}