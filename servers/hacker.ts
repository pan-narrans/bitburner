import { NS } from '@ns'
import { Server } from '@ns'

/* export async function main(ns : NS) : Promise<void> {
  //
}
 */

export class Hacker {
  private ns: NS;

  constructor(ns: NS) {
    this.ns = ns;
  }

  private CalcThreads(hack_script: string): number {
    let threads_on_home: number;
    const script_ram = this.ns.getScriptRam(hack_script);
    const home_ram = this.ns.getServerMaxRam('home');
    // const expected_scripts = servers_to_hack.length + 1;
    const expected_scripts = 20;

    threads_on_home = Math.floor(home_ram / (expected_scripts * script_ram));
    threads_on_home = (threads_on_home == 0) ? 1 : threads_on_home;

    return threads_on_home;
  }

  private selfHack(target: Server, hack_script: string): bool {

    this.ns.print("Trying to hack " + target.hostname + "... \n");

    if (this.ns.getHackingLevel() >= this.ns.getServerRequiredHackingLevel(target.hostname)) {
    
      const script_ram = this.ns.getScriptRam(hack_script);
      const max_ram = this.ns.getServerMaxRam(target.hostname);
      let threads = Math.floor(max_ram / script_ram);

      const min_security = this.ns.getServerMinSecurityLevel(target.hostname);
      const max_money = this.ns.getServerMaxMoney(target.hostname);

      // Upload hack script
      await this.ns.scp(hack_script, target.hostname);

      // Calculate threads, -1 accounts for float to in conversion
      threads = (threads > 1) ? threads - 1 : 1;

      this.ns.tprint("Hacking " + target.hostname + "... \n");
      this.ns.killall(target.hostname);

      // Run script on target
      this.ns.exec(hack_script, target.hostname, threads, target.hostname, min_security, max_money);

      return true;
    }

    return false;
  }
}


/* import { Spider } from 'spider'

let servers_to_hack: string[] = [];
const hack_script = '/hack/basic-hack-template.js';
let threads_on_home: number;


export async function main(ns: NS): Promise<void> {

  ns.tprint("Script Initiated");

  const spider = new Spider(ns);
  void spider.scan();
  servers_to_hack = await spider.getTargetServers();
  ns.tprint(servers_to_hack);

  //await ReadServers(ns);
  await CalcThreads(ns);
  await HackServers(ns);
}


async function CalcThreads(ns: NS): Promise<void> {
  const script_ram = ns.getScriptRam(hack_script);
  const home_ram = ns.getServerMaxRam('home');
  // const expected_scripts = servers_to_hack.length + 1;
  const expected_scripts = 20;

  threads_on_home = Math.floor(home_ram / (expected_scripts * script_ram));
  threads_on_home = (threads_on_home == 0) ? 1 : threads_on_home;
}


async function ReadServers(ns: NS): Promise<void> {
  const serverList = await ns.read('target_servers.txt');
  servers_to_hack = serverList.split(',');
}


async function HackServers(ns: NS): Promise<void> {

  while (servers_to_hack.length > 0) {
    for (const id in servers_to_hack) {
      const hacked = await CrackServer(ns, servers_to_hack[id]);
      if (hacked)
        servers_to_hack.splice(id, 1);
    }

    await ns.sleep(1000);
  }

}


async function CrackServer(ns: NS, target: string) {

  const script_ram = ns.getScriptRam(hack_script);
  const max_ram = ns.getServerMaxRam(target);
  let threads = Math.floor(max_ram / script_ram);

  if (!ns.hasRootAccess(target)) {

    // Try to open ports
    let open_ports = 1;
    if (ns.fileExists('BruteSSH.exe')) { ns.brutessh(target); open_ports++; }
    if (ns.fileExists('FTPCrack.exe')) { ns.ftpcrack(target); open_ports++; }
    if (ns.fileExists('relaySMTP.exe')) { ns.relaysmtp(target); open_ports++; }
    if (ns.fileExists('HTTPWorm.exe')) { ns.httpworm(target); open_ports++; }
    if (ns.fileExists('SQLInject.exe')) { ns.sqlinject(target); open_ports++; }

    // If all needed ports are open, nuke the target
    if (ns.getServerNumPortsRequired(target) < open_ports) { ns.nuke(target); }

  } else {

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
    } else {
      // CAN'T HACK
      ns.print("Can't hack " + target + " yet... \n");
    }
  }

  return false;
} */