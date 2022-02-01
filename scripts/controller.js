let server_list = [];
let target_servers = [];
let attack_servers = [];
/** @param {NS} ns **/
export async function main(ns) {
    // Kill hacking scripts
    ns.scriptKill('/hack/hack-template.js', 'home');
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
    let aux = "";
    aux = await ns.read('server_list.txt');
    server_list = aux.split(',');
    aux = await ns.read('target_servers.txt');
    target_servers = aux.split(',');
    aux = await ns.read('attack_servers.txt');
    attack_servers = aux.split(',');
}
/** @param {NS} ns **/
async function killAllScripts(ns) {
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO0FBQy9CLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNsQyxJQUFJLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFFbEMsc0JBQXNCO0FBQ3RCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDaEMsdUJBQXVCO0lBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFaEQsa0RBQWtEO0lBQ2xELE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVqQywrQ0FBK0M7SUFDL0MsTUFBTSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFdEIscUJBQXFCO0lBQ3JCLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBRS9DLGNBQWM7SUFDZCxNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUd0QyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFO1FBQ3RDLHNCQUFzQjtRQUN0QixNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUV2QywwQkFBMEI7UUFDMUIsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQUM7S0FDM0M7QUFFRixDQUFDO0FBR0Qsc0JBQXNCO0FBQ3RCLEtBQUssVUFBVSxTQUFTLENBQUMsRUFBTSxFQUFFLFdBQW1CLEVBQUUsa0JBQTBCLFdBQVc7SUFFMUYsaUNBQWlDO0lBQ2pDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQixJQUFJLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDaEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLENBQUM7SUFFekMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFHRCxzQkFBc0I7QUFDdEIsS0FBSyxVQUFVLFdBQVcsQ0FBQyxFQUFNO0lBQ2hDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUViLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QixHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDMUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFDLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWpDLENBQUM7QUFHRCxzQkFBc0I7QUFDdEIsS0FBSyxVQUFVLGNBQWMsQ0FBQyxFQUFNO0lBQ25DLE9BQU87QUFDUixDQUFDIn0=