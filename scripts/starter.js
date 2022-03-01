export async function main(ns) {
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
async function killAllScripts(ns) {
    const active_scripts = ns.ps();
    for (let index = 0; index < active_scripts.length; index++) {
        if (active_scripts[index].filename != 'starter.js')
            ns.kill(active_scripts[index].pid);
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInN0YXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUUvQix1QkFBdUI7SUFDdkIsS0FBSyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFeEIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFckMsT0FBTztJQUNQLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWpDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsY0FBYyxDQUFDLEVBQU07SUFDbEMsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRS9CLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzFELElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsSUFBSSxZQUFZO1lBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsT0FBTztBQUNULENBQUMifQ==