import { NS } from '@ns'
import { Spider } from 'spider'

export async function main(ns: NS): Promise<void> {

	/* 
	const spider = new Spider(ns);
	void spider.scan(); 
	*/

	// Kill hacking scripts
	void killAllScripts(ns);

	// Spider scans servers and writes them into files
	await runScript(ns, 'spider.js');

	// Hack sender script
	await runScript(ns, 'hack/send-self-hack.js');

	// sell hashes
	await runScript(ns, 'sell-hashes.js');


	if (ns.getServerMaxRam('home') > 2000) {
		// Stock market script
		await runScript(ns, 'stock-market.js');

		// Purchase servers script
		await runScript(ns, 'purchase-servers.js');
	}

}


async function runScript(ns: NS, script_name: string, script_location: string = script_name) {

	// Kill script if already running
	if (ns.scriptRunning(script_name, 'home'))
		ns.scriptKill(script_name, 'home');

	// If the script exists, run it
	if (await ns.run(script_location))
		ns.tprint('Running:' + script_location);

	await ns.sleep(1500);
}

/**
 * Kills all scripts except controller.js
 * @param ns bitburner variable
 */
async function killAllScripts(ns: NS): Promise<void> {
	const active_scripts = ns.ps();
	for (let index = 0; index < active_scripts.length; index++) {
		if (active_scripts[index].filename != 'controller.js')
			ns.kill(active_scripts[index].pid);
	}
	return;
}