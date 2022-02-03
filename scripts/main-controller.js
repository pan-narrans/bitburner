import { Spider } from 'spider';
export async function main(ns) {
    const spider = new Spider(ns);
    void spider.scan();
    // Kill hacking scripts
    void killAllScripts(ns);
    // Spider scans servers and writes them into files
    // await runScript(ns, 'spider.js');
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
        if (active_scripts[index].filename != 'main-controller.js')
            ns.kill(active_scripts[index].pid);
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsibWFpbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUcvQixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUduQix1QkFBdUI7SUFDdkIsS0FBSyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFeEIsa0RBQWtEO0lBQ2xELG9DQUFvQztJQUVwQyxxQkFBcUI7SUFDckIsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFFOUMsY0FBYztJQUNkLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBR3RDLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUU7UUFDckMsc0JBQXNCO1FBQ3RCLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZDLDBCQUEwQjtRQUMxQixNQUFNLFNBQVMsQ0FBQyxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztLQUM1QztBQUVILENBQUM7QUFHRCxLQUFLLFVBQVUsU0FBUyxDQUFDLEVBQU0sRUFBRSxXQUFtQixFQUFFLGtCQUEwQixXQUFXO0lBRXpGLGlDQUFpQztJQUNqQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztRQUN2QyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVyQywrQkFBK0I7SUFDL0IsSUFBSSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBRTFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLGNBQWMsQ0FBQyxFQUFNO0lBQ2xDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUMvQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLElBQUksb0JBQW9CO1lBQ3hELEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTztBQUNULENBQUMifQ==