/**
 * Crawls the web and stores the names of the servers it founds.
 *
 * @author Alejandro Pérez
 */
export class Spider {
    static ns;
    // servers
    static servers;
    static target_servers;
    static player_servers;
    static hacknet_servers;
    static faction_servers;
    // names (for debugging)
    static server_names;
    static target_servers_names;
    static player_servers_names;
    static hacknet_servers_names;
    static faction_servers_names;
    constructor(ns) {
        Spider.ns = ns;
        Spider.servers = [];
        Spider.target_servers = [];
        Spider.player_servers = [];
        Spider.hacknet_servers = [];
        Spider.faction_servers = [];
        // For debug purposes mainly
        Spider.server_names = [];
        Spider.target_servers_names = [];
        Spider.player_servers_names = [];
        Spider.hacknet_servers_names = [];
        Spider.faction_servers_names = [];
    }
    // Legacy
    getTargetServers() {
        return Spider.target_servers_names;
    }
    getServers() {
        return Spider.servers;
    }
    /**
     * Updates the values of the following attributes of {@link Spider}:
     *
     * 		- {@link Spider.server_names}
     * 		- {@link Spider.target_servers_names}
     * 		- {@link Spider.player_servers_names}
     */
    async scan() {
        // Reset the variables
        Spider.servers = [];
        Spider.target_servers = [];
        Spider.player_servers = [];
        Spider.hacknet_servers = [];
        Spider.faction_servers = [];
        this.scanNework('home', 'home');
        this.categorizeServers();
        this.writeNames();
    }
    /**
     * Recursive function scanning the network for all servers
     *
     * @param {string} target - target of the scan command
     * @param {string} origin - server from which we call the scan command
     * @returns {void} Nothing
     */
    scanNework(target, origin) {
        const scan_result = Spider.ns.scan(target);
        for (const id in scan_result) {
            if (scan_result[id] == origin) {
                continue;
            }
            else {
                Spider.servers.push(Spider.ns.getServer(scan_result[id]));
                void this.scanNework(scan_result[id], target);
            }
        }
    }
    /**
     * Categorizes servers on:
     *  - target    -> money > 0 (we hack those)
     *  - player    -> contains "-.--." (bought by the player)
     *  - hacknet   -> contains "hacknet" (hacknet nodes or servers)
     *  - faction   -> rest (backdoor these and join a faction)
     * @param {*} servers server array to categorize
     */
    categorizeServers() {
        Spider.servers.forEach(function (item) {
            // Checks server for money
            if (item.moneyMax > 0)
                Spider.target_servers.push(item);
            // Ignores home
            else if (item.hostname.includes("home"))
                return;
            // Checks for hacknet servers
            else if (item.hostname.includes("hacknet"))
                Spider.hacknet_servers.push(item);
            // Checks for player servers
            else if (item.hostname.includes("-.--."))
                Spider.hacknet_servers.push(item);
            // Adds player servers to a list
            else
                Spider.faction_servers.push(item);
        });
    }
    writeNames() {
        // Reset values
        Spider.server_names = [];
        Spider.target_servers_names = [];
        Spider.player_servers_names = [];
        Spider.hacknet_servers_names = [];
        Spider.faction_servers_names = [];
        Spider.servers.forEach(function (item) { Spider.server_names.push(item.hostname); });
        Spider.target_servers.forEach(function (item) { Spider.target_servers_names.push(item.hostname); });
        Spider.player_servers.forEach(function (item) { Spider.player_servers_names.push(item.hostname); });
        Spider.hacknet_servers.forEach(function (item) { Spider.hacknet_servers_names.push(item.hostname); });
        Spider.faction_servers.forEach(function (item) { Spider.faction_servers_names.push(item.hostname); });
    }
    async toString() {
        Spider.ns.tprintf("\nserver_names:      \n" + Spider.server_names + "\n");
        Spider.ns.tprintf("\ntarget_servers_names:   \n" + Spider.target_servers_names + "\n");
        Spider.ns.tprintf("\nplayer_servers_names:   \n" + Spider.player_servers_names + "\n");
        Spider.ns.tprintf("\nhacknet_servers_names:  \n" + Spider.hacknet_servers_names + "\n");
        Spider.ns.tprintf("\nfaction_servers_names:  \n" + Spider.faction_servers_names + "\n");
    }
} // End Spider
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic3BpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQUNQLE1BQU0sQ0FBQyxFQUFFLENBQUs7SUFFeEIsVUFBVTtJQUNBLE1BQU0sQ0FBQyxPQUFPLENBQVc7SUFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBVztJQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFXO0lBQ2hDLE1BQU0sQ0FBQyxlQUFlLENBQVc7SUFDakMsTUFBTSxDQUFDLGVBQWUsQ0FBVztJQUUzQyx3QkFBd0I7SUFDZCxNQUFNLENBQUMsWUFBWSxDQUFXO0lBQzlCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBVztJQUN0QyxNQUFNLENBQUMsb0JBQW9CLENBQVc7SUFDdEMsTUFBTSxDQUFDLHFCQUFxQixDQUFXO0lBQ3ZDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBVztJQUdqRCxZQUFZLEVBQU07UUFDaEIsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFZixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUU1Qiw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLHFCQUFxQixHQUFHLEVBQUUs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