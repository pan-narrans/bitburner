/**
 * Scans for all the servers and writes them onto some files. 
 */

import { General as generalFuncs } from './lib/general.js';


// Declare variables
let server_list = ['home'];
let target_servers = [];
let attack_servers = [];



/** @param {NS} ns **/
export async function main(ns) {
	// Initialize variables
	server_list = ['home'];
	target_servers = [];
	attack_servers = [];

	ns.tprint("Script Initiated");

	// Scans all servers
	await ScanServers(ns, 'home', 'home');

	// Deletes 'home' server
	server_list.shift();

	// Sorts from lowest to highest based on max money
	server_list.sort(function (a, b) {
		return ns.getServerMaxMoney(a) - ns.getServerMaxMoney(b);
	});

	// Categorizes servers into target or attack based on money
	await CategorizeServers(ns, server_list);

	// Writes info onto files
	await ns.write('server_list.txt', server_list, 'w');
	await ns.write('attack_servers.txt', attack_servers, 'w');
	await ns.write('target_servers.txt', target_servers, 'w');

	await ns.tprint("Spider successfully run.")

	//debug(ns);

}

/** @param {NS} ns **/
/**
 * @param {*} ns bitburner stuff
 */
async function debug(ns) {
	let temp_array;

	/* 
	const g = new generalFuncs();
	g.printArray(ns, server_list);
	g.printArray(ns, attack_servers);
	g.printArray(ns, target_servers);
	 */

	temp_array = await ns.read('server_list.txt');
	ns.tprint("server_list: \n" + temp_array + "\n\n");
	temp_array = await ns.read('attack_servers.txt');
	ns.tprint("attack_servers: \n" + temp_array + "\n\n");
	temp_array = await ns.read('target_servers.txt');
	ns.tprint("target_servers: \n" + temp_array + "\n\n");
}

/** @param {NS} ns **/
/**
 * Recursive funcion scanning the network for all servers
 * 
 * @param {*} ns bitburner stuff
 * @param {*} target target of the scan command
 * @param {*} origin server from which we call the scan command
 */
async function ScanServers(ns, target, origin) {
	var servers = ns.scan(target);

	for (var id in servers) {
		if (servers[id] == origin) {
			;
		} else {
			server_list.push(servers[id]);
			await ScanServers(ns, servers[id], target);
		}
	}

}


/** @param {NS} ns **/
/**
 * Categorizes servers bases on wether their maxMoney is 0 or not.
 * Servers we can't get money from will be attack servers while the others will be targets.
 * 
 * @param {*} ns bitburner stuff
 * @param {*} servers server array to categorize
 */
async function CategorizeServers(ns, servers) {
	for (var id in servers) {
		if (ns.getServerMaxMoney(servers[id]) == 0) {
			attack_servers.push(servers[id]);
		} else {
			target_servers.push(servers[id]);
		}
	}
}