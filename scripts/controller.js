let server_list = [];
let target_servers = [];
let attack_servers = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO0FBQy9CLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNsQyxJQUFJLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFFbEMsc0JBQXNCO0FBQ3RCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDaEMsdUJBQXVCO0lBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUV6QixrREFBa0Q7SUFDbEQsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRWpDLCtDQUErQztJQUMvQyxNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV0QixxQkFBcUI7SUFDckIsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFFL0MsY0FBYztJQUNkLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBR3RDLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUU7UUFDdEMsc0JBQXNCO1FBQ3RCLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZDLDBCQUEwQjtRQUMxQixNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztLQUMzQztBQUVGLENBQUM7QUFHRCxzQkFBc0I7QUFDdEIsS0FBSyxVQUFVLFNBQVMsQ0FBQyxFQUFNLEVBQUUsV0FBbUIsRUFBRSxrQkFBMEIsV0FBVztJQUUxRixpQ0FBaUM7SUFDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFDeEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLElBQUksTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsQ0FBQztJQUV6QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUdELHNCQUFzQjtBQUN0QixLQUFLLFVBQVUsV0FBVyxDQUFDLEVBQU07SUFDaEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdCLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMxQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDMUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFakMsQ0FBQztBQUdELHNCQUFzQjtBQUN0QixLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQU07SUFDbkMsT0FBTztBQUNSLENBQUMifQ==