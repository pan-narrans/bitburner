import { NS } from '@ns'

/**
 * @typedef {Object} Spider
 * @property {NS} ns 
 * @property {string[]} server_list 
 * @property {string[]} attack_servers
 * @property {string[]} target_servers
 */

/**
 * Crawls the web and stores the names of the servers it founds.
 * @author Alejandro Pérez
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

	/**
	 * @returns {string[]} {@link Spider.target_servers} 
	 */
	public async getTargetServers(): Promise<string[]> {
		return Spider.target_servers;
	}

	/**
	 * Updates the values of the following attributes of {@link Spider}:
	 * 
	 * 		- {@link Spider.server_list}	
	 * 		- {@link Spider.target_servers}	
	 * 		- {@link Spider.attack_servers}
	 */
	public async scan(): Promise<void> {
		// Reset the variables
		Spider.server_list = ["home"];
		Spider.target_servers = [];
		Spider.attack_servers = [];

		this.scanNework('home', 'home');
		this.categorizeServers();
	}

	/**
	 * Recursive function scanning the network for all servers
	 * 
	 * @param {string} target - target of the scan command
	 * @param {string} origin - server from which we call the scan command
	 * @returns {void} Nothing
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
	 * Categorizes servers bases on whether  ther their maxMoney is 0 or not.
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