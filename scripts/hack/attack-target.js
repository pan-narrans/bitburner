var servers_to_hack = [];
var attack_servers = [];
var hack_script = 'hack-template.js';


/** @param {NS} ns**/
export async function main(ns) {
	await ReadServers(ns);

	await CrackServers(ns)

	var target = ns.args[0];
	await ns.sleep(100);

	for (var id in attack_servers) {
		await HackServer(ns, attack_servers[id], target);
	}
}


/** @param {NS} ns **/
async function ReadServers(ns) {
	attack_servers = await ns.read('attack_servers.txt');
	attack_servers = attack_servers.split(',');
	await ns.sleep(100);

	servers_to_hack = await ns.read('target_servers.txt');
	servers_to_hack = servers_to_hack.split(',');
	await ns.sleep(100);
}


/** @param {NS} ns **/
async function CrackServers(ns) {
	for (var id in attack_servers) {
		var target = attack_servers[id];

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
		}
	}
}


/** @param {NS} ns **/
async function HackServer(ns, attacker, target) {

	var min_security = ns.getServerMinSecurityLevel(target);
	var max_money = ns.getServerMaxMoney(target);

	// Upload hack script
	await ns.scp(hack_script, "home", attacker);

	// Calculate threads
	var script_ram = ns.getScriptRam(hack_script);
	var max_ram = ns.getServerMaxRam(attacker);
	var threads = Math.floor(max_ram / script_ram);
	threads = (threads > 1) ? threads - 1 : 1;

	ns.tprint(attacker + " hacking " + target + "... \n");
	ns.killall(attacker);
	ns.killall(target);

	// Run script on attacker
	ns.exec(hack_script, attacker, threads, target, min_security, max_money);

}