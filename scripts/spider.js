/**
 * Scans the network and stores the servers into some files.
 *
 * @author Alejandro Pérez
 */
import { helpers } from 'scripts/lib/general';
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
    await ns.tprint("Spider successfully run.");
    helpers.printArray(ns, server_list);
    //debug(ns);
}
/** @param {NS} ns **/
/**
 * @param {*} ns bitburner stuff
 */
async function debug(ns) {
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
/** @param {NS} ns **/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic3BpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFN0Msb0JBQW9CO0FBQ3BCLElBQUksV0FBVyxHQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBQ2xDLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUVsQyxzQkFBc0I7QUFDdEIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUNoQyx1QkFBdUI7SUFDdkIsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkIsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUNwQixjQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXBCLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixvQkFBb0I7SUFDcEIsTUFBTSxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0Qyx3QkFBd0I7SUFDeEIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXBCLGtEQUFrRDtJQUNsRCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDOUIsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgsNERBQTREO0lBQzVELE1BQU0saUJBQWlCLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXpDLHlCQUF5QjtJQUN6QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLEdB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