/**
 * Scans the network and stores the servers into some files.
 * 
 * @author Alejandro Pérez
 */

import { NS } from '@ns'
import { helpers } from 'scripts/lib/general'

// Declare variables
let server_list: string[] = ['home'];
let target_servers: string[] = [];
let attack_servers: string[] = [];

/** @param {NS} ns **/
export async function main(ns: NS): Promise<void> {
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

	helpers.printArray(ns, server_list);
	//debug(ns);

}

/** @param {NS} ns **/
/**
 * @param {*} ns bitburner stuff
 */
async function debug(ns: NS): Promise<void> {
	let temp_array;


	helpers.printArray(ns, server_list);
	helpers.printArray(ns, attack_servers);
	helpers.printArray(ns, target_servers);



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
async function ScanServers(ns: NS, target: string, origin: string): Promise<void> {
	const servers = ns.scan(target);

	for (const id in servers) {
		if (servers[id] == origin) {
			continue;
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
async function CategorizeServers(ns: NS, servers: string[]): Promise<void> {
	for (const id in servers) {
		if (ns.getServerMaxMoney(servers[id]) == 0) {
			attack_servers.push(servers[id]);
		} else {
			target_servers.push(servers[id]);
		}
	}
}