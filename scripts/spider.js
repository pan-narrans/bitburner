/**
 * Scans the network and stores the servers into some files.
 *
 * @author Alejandro Pérez
 */
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
    ns.tprint("Spider successfully run.");
}
/**
 * @param {*} ns bitburner stuff
 */
async function debug(ns) {
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
async function ScanServers(ns, target, origin) {
    const servers = ns.scan(target);
    for (const id in servers) {
        if (servers[id] == origin) {
            continue;
        }
        else {
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
async function CategorizeServers(ns, servers) {
    for (const id in servers) {
        if (ns.getServerMaxMoney(servers[id]) == 0) {
            attack_servers.push(servers[id]);
        }
        else {
            target_servers.push(servers[id]);
        }
    }
}
/**
 * Crawls the web and stores the names of the servers it founds.
 */
export class Spider {
    static ns;
    static server_list;
    static attack_servers;
    static target_servers;
    constructor(ns) {
        Spider.ns = ns;
        Spider.server_list = ["home"];
        Spider.target_servers = [""];
        Spider.attack_servers = [""];
    }
    // GETTERS & SETTERS
    async getServerList() {
        return Spider.server_list;
    }
    async getAttackServers() {
        return Spider.attack_servers;
    }
    async getTargetServers() {
        return Spider.target_servers;
    }
    /**
     * Scans the network and organizes the servers.
     */
    async scan() {
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
    scanNework(target, origin) {
        const scan_result = Spider.ns.scan(target);
        for (const id in scan_result) {
            if (scan_result[id] == origin) {
                continue;
            }
            else {
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
    categorizeServers() {
        for (const id in Spider.server_list) {
            if (Spider.ns.getServerMaxMoney(Spider.server_list[id]) == 0) {
                Spider.attack_servers.push(Spider.server_list[id]);
            }
            else {
                Spider.target_servers.push(Spider.server_list[id]);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic3BpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxvQkFBb0I7QUFDcEIsSUFBSSxXQUFXLEdBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxJQUFJLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDbEMsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBRWxDLHNCQUFzQjtBQUN0QixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLHVCQUF1QjtJQUN2QixXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFFcEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlCLG9CQUFvQjtJQUNwQixNQUFNLFdBQVcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXRDLHdCQUF3QjtJQUN4QixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFcEIsa0RBQWtEO0lBQ2xELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCw0REFBNEQ7SUFDNUQsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFD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