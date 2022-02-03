import { Spider } from 'spider';
let servers_to_hack = [];
const hack_script = '/hack/basic-hack-template.js';
let threads_on_home;
export async function main(ns) {
    ns.tprint("Script Initiated");
    const spider = new Spider(ns);
    void spider.scan();
    servers_to_hack = await spider.getTargetServers();
    ns.tprint(servers_to_hack);
    //await ReadServers(ns);
    await CalcThreads(ns);
    await HackServers(ns);
}
async function CalcThreads(ns) {
    const script_ram = ns.getScriptRam(hack_script);
    const home_ram = ns.getServerMaxRam('home');
    const expected_scripts = servers_to_hack.length + 1;
    // const expected_scripts = 20;
    threads_on_home = Math.floor(home_ram / (expected_scripts * script_ram));
    threads_on_home = (threads_on_home == 0) ? 1 : threads_on_home;
}
async function ReadServers(ns) {
    const serverList = await ns.read('target_servers.txt');
    servers_to_hack = serverList.split(',');
}
async function HackServers(ns) {
    while (servers_to_hack.length > 0) {
        for (const id in servers_to_hack) {
            const hacked = await CrackServer(ns, servers_to_hack[id]);
            if (hacked)
                servers_to_hack.splice(id, 1);
        }
        await ns.sleep(1000);
    }
}
async function CrackServer(ns, target) {
    const script_ram = ns.getScriptRam(hack_script);
    const max_ram = ns.getServerMaxRam(target);
    let threads = Math.floor(max_ram / script_ram);
    if (!ns.hasRootAccess(target)) {
        // Try to open ports
        let open_ports = 1;
        if (ns.fileExists('BruteSSH.exe')) {
            ns.brutessh(target);
            open_ports++;
        }
        if (ns.fileExists('FTPCrack.exe')) {
            ns.ftpcrack(target);
            open_ports++;
        }
        if (ns.fileExists('relaySMTP.exe')) {
            ns.relaysmtp(target);
            open_ports++;
        }
        if (ns.fileExists('HTTPWorm.exe')) {
            ns.httpworm(target);
            open_ports++;
        }
        if (ns.fileExists('SQLInject.exe')) {
            ns.sqlinject(target);
            open_ports++;
        }
        // If all needed ports are open, nuke the target
        if (ns.getServerNumPortsRequired(target) < open_ports) {
            ns.nuke(target);
        }
    }
    else {
        ns.print("Trying to hack " + target + "... \n");
        if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
            // CAN HACK
            const min_security = ns.getServerMinSecurityLevel(target);
            const max_money = ns.getServerMaxMoney(target);
            // Upload hack script
            await ns.scp(hack_script, target);
            // Calculate threads
            threads = (threads > 1) ? threads - 1 : 1;
            ns.tprint("Hacking " + target + "... \n");
            ns.killall(target);
            // Run script on target
            ns.exec(hack_script, target, threads, target, min_security, max_money);
            // Run script on home
            // TODO:
            ns.run(hack_script, threads_on_home, target, min_security, max_money);
            return true;
        }
        else {
            // CAN'T HACK
            ns.print("Can't hack " + target + " yet... \n");
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1zZWxmLWhhY2suanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJoYWNrL3NlbmQtc2VsZi1oYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsSUFBSSxlQUFlLEdBQWEsRUFBRSxDQUFDO0FBQ25DLE1BQU0sV0FBVyxHQUFHLDhCQUE4QixDQUFDO0FBQ25ELElBQUksZUFBdUIsQ0FBQztBQUc1QixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBRWhDLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNsRCxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRTNCLHdCQUF3QjtJQUN4QixNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBR0QsS0FBSyxVQUFVLFdBQVcsQ0FBQyxFQUFNO0lBQ2hDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxNQUFNLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELCtCQUErQjtJQUUvQixlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxV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