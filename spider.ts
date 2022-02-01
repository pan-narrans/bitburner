/**
 * Scans the network and stores the servers into some files.
 * 
 * @author Alejandro Pérez
 */

import { NS } from '@ns'

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

	ns.tprint("Spider successfully run.")

}

/**
 * @param {*} ns bitburner stuff
 */
async function debug(ns: NS): Promise<void> {
	let temp_array;

	ns.tprint(server_list.toString());
	ns.tprint(attack_servers.toString());
	ns.tprint(target_servers.toString());

	temp_array = await ns.read('server_list.txt');
	ns.tprint("server_list: \n" + temp_array + "\n\n");
	temp_array = await ns.read('attack_servers.txt');
	ns.tprint("attack_servers: \n" + temp_array + "\n\n");
	temp_array = await ns.read('target_servers.txt');
	ns.tprint("target_servers: \n" + temp_array + "\n\n");
}

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

/**
 * Crawls the web and stores the names of the servers it founds.
 */
export class Spider {
	protected static ns: NS;
	protected static server_list: string[];
	protected static attack_servers: string[];
	protected static target_servers: string[];

	constructor(ns: NS) {
		Spider.ns = ns;
		Spider.server_list = ["home"];
		Spider.target_servers = [""];
		Spider.attack_servers = [""];
	}

	// GETTERS & SETTERS
	public async getServerList(): Promise<string[]> {
		return Spider.server_list;
	}

	public async getAttackServers(): Promise<string[]> {
		return Spider.attack_servers;
	}

	public async getTargetServers(): Promise<string[]> {
		return Spider.target_servers;
	}

	/**
	 * Scans the network and organizes the servers.
	 */
	public async scan(): Promise<void> {
		Spider.server_list = ["home"];
		Spider.target_servers = [];
		Spider.attack_servers = [];

		this.scanNework('home', 'home');
		this.categorizeServers();
	}

	/**
	 * Recursive funcion scanning the network for all servers
	 * 
	 * @param {*} target target of the scan command
	 * @param {*} origin server from which we call the scan command
	 */
	private scanNework(target: string, origin: string) {
		const scan_result = Spider.ns.scan(target);

		for (const id in scan_result) {
			if (scan_result[id] == origin) {
				continue;
			} else {
				Spider.server_list.push(scan_result[id]);
				void this.scanNework(scan_result[id], target);
			}
		}
	}

	/**
	 * Categorizes servers bases on wether their maxMoney is 0 or not.
	 * Servers we can't get money from will be attack servers while the others will be targets.
	 * 
	 * @param {*} servers server array to categorize
	 */
	private categorizeServers() {
		for (const id in Spider.server_list) {
			if (Spider.ns.getServerMaxMoney(Spider.server_list[id]) == 0) {
				Spider.attack_servers.push(Spider.server_list[id]);
			} else {
				Spider.target_servers.push(Spider.server_list[id]);
			}
		}
	}
}