export async function main(ns) {
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
async function runScript(ns, script_name, script_location = script_name) {
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
async function killAllScripts(ns) {
    const active_scripts = ns.ps();
    for (let index = 0; index < active_scripts.length; index++) {
        if (active_scripts[index].filename != 'controller.js')
            ns.kill(active_scripts[index].pid);
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsibWFpbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFFaEM7OztNQUdFO0lBRUYsdUJBQXVCO0lBQ3ZCLEtBQUssY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLGtEQUFrRDtJQUNsRCxNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFakMscUJBQXFCO0lBQ3JCLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBRTlDLGNBQWM7SUFDZCxNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUd0QyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFO1FBQ3RDLHNCQUFzQjtRQUN0QixNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUV2QywwQkFBMEI7UUFDMUIsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQUM7S0FDM0M7QUFFRixDQUFDO0FBR0QsS0FBSyxVQUFVLFNBQVMsQ0FBQyxFQUFNLEVBQUUsV0FBbUIsRUFBRSxrQkFBMEIsV0FBVztJQUUxRixpQ0FBaUM7SUFDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFDeEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLElBQUksTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsQ0FBQztJQUV6QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7R0FHRztBQUNILEtBQUssVUFBVSxjQUFjLENBQUMsRUFBTTtJQUNuQyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDL0IsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxJQUFJLGVBQWU7WUFDcEQsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEM7SUFDRCxPQUFPO0FBQ1IsQ0FBQyJ9