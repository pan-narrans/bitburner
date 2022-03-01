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
    // const expected_scripts = servers_to_hack.length + 1;
    const expected_scripts = 20;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1zZWxmLWhhY2suanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJoYWNrL3NlbmQtc2VsZi1oYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsSUFBSSxlQUFlLEdBQWEsRUFBRSxDQUFDO0FBQ25DLE1BQU0sV0FBVyxHQUFHLDhCQUE4QixDQUFDO0FBQ25ELElBQUksZUFBdUIsQ0FBQztBQUc1QixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBRS9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNsRCxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRTNCLHdCQUF3QjtJQUN4QixNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBR0QsS0FBSyxVQUFVLFdBQVcsQ0FBQyxFQUFNO0lBQy9CLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1Qyx1REFBdUQ7SUFDdkQsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFFNUIsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztJ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