var server_list = [];
var target_servers = [];
var attack_servers = [];

/** @param {NS} ns **/
export async function main(ns) {
	// Kill hacking scripts
	ns.scriptKill('/hack/hack-template.js', 'home');
	//ns.scriptKill(/!controller/'.js', 'home');
	//ns.tprint('allkilled');

	// Spider scans servers and writes them into files
	await runScript(ns, 'spider.js');

	// Reads the files and copies them to variables
	await ReadServers(ns);

	// Hack sender script
	await runScript(ns, '/hack/send-self-hack.js');

	// sell hashes
	await runScript(ns, 'sell-hashes.js');


	if (ns.getServerMaxRam('home') > 2000) {
		// Stock market script
		await runScript(ns, 'stock-market.js');

		// Purchase servers script
		await runScript(ns, 'purchase-servers.js');
	}

}


/** @param {NS} ns **/
async function runScript(ns, script_name, script_location = script_name) {

	// Kill script if already running
	if (ns.scriptRunning(script_name, 'home'))
		ns.scriptKill(script_name, 'home');

	// If the script exists, run it
	if (await ns.run(script_location))
		ns.tprint('Running:' + script_location);

	await ns.sleep(1500);
}


/** @param {NS} ns **/
async function ReadServers(ns) {

	server_list = await ns.read('server_list.txt');
	server_list = server_list.split(',');

	target_servers = await ns.read('target_servers.txt');
	target_servers = target_servers.split(',');

	attack_servers = await ns.read('attack_servers.txt');
	attack_servers = attack_servers.split(',');

}


/** @param {NS} ns **/
async function killAllScripts(ns) {


}