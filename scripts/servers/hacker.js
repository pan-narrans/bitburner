/* export async function main(ns : NS) : Promise<void> {
  //
}
 */
export class Hacker {
    ns;
    constructor(ns) {
        this.ns = ns;
    }
    CalcThreads(hack_script) {
        let threads_on_home;
        const script_ram = this.ns.getScriptRam(hack_script);
        const home_ram = this.ns.getServerMaxRam('home');
        // const expected_scripts = servers_to_hack.length + 1;
        const expected_scripts = 20;
        threads_on_home = Math.floor(home_ram / (expected_scripts * script_ram));
        threads_on_home = (threads_on_home == 0) ? 1 : threads_on_home;
        return threads_on_home;
    }
    selfHack(target, hack_script) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja2VyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic2VydmVycy9oYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7OztHQUdHO0FBRUgsTUFBTSxPQUFPLE1BQU07SUFDVCxFQUFFLENBQUs7SUFFZixZQUFZLEVBQU07UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU8sV0FBVyxDQUFDLFdBQW1CO1FBQ3JDLElBQUksZUFBdUIsQ0FBQztRQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCx1REFBdUQ7UUFDdkQsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFNUIsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6RSxlQUFlLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO1FBRS9ELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxRQUFRLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBRWxELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFOUQsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBRXZGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQztZQUUvQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3RCxxQkFBcUI7WUFDckIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELDREQUE0RDtZQUM1RCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakMsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU5RixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBHSSJ9