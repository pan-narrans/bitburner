import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {

  // Kill hacking scripts
  void killAllScripts(ns);

  await ns.run('server/controller.js');

  // temp
  await ns.run('hack/send-self-hack.js');
  await ns.run('stocks/stock-market.js');
  await ns.run('sell-hashes.js');

}

/**
 * Kills all scripts except controller.js
 * @param ns bitburner variable
 */
async function killAllScripts(ns: NS): Promise<void> {
  const active_scripts = ns.ps();

  for (let index = 0; index < active_scripts.length; index++) {
    if (active_scripts[index].filename != 'starter.js')
      ns.kill(active_scripts[index].pid);
  }

  return;
}