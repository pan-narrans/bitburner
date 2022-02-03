/**
 * @typedef {Object} Spider
 * @property {NS} ns
 * @property {string[]} server_list
 * @property {string[]} attack_servers
 * @property {string[]} target_servers
 */
/**
 * Crawls the web and stores the names of the servers it founds.
 * @author Alejandro Pérez
 */
export class Spider {
    static ns;
    static server_list;
    static attack_servers;
    static target_servers;
    constructor(ns) {
        Spider.ns = ns;
        Spider.server_list = ["home"];
        Spider.target_servers = [""];
        Spider.attack_servers = [""];
    }
    // GETTERS & SETTERS
    async getServerList() {
        return Spider.server_list;
    }
    async getAttackServers() {
        return Spider.attack_servers;
    }
    /**
     * @returns {string[]} {@link Spider.target_servers}
     */
    async getTargetServers() {
        return Spider.target_servers;
    }
    /**
     * Updates the values of the following attributes of {@link Spider}:
     *
     * 		- {@link Spider.server_list}
     * 		- {@link Spider.target_servers}
     * 		- {@link Spider.attack_servers}
     */
    async scan() {
        // Reset the variables
        Spider.server_list = ["home"];
        Spider.target_servers = [];
        Spider.attack_servers = [];
        this.scanNework('home', 'home');
        this.categorizeServers();
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
                Spider.server_list.push(scan_result[id]);
                void this.scanNework(scan_result[id], target);
            }
        }
    }
    /**
     * Categorizes servers bases on whether  ther their maxMoney is 0 or not.
     * Servers we can't get money from will be attack servers while the others will be targets.
     *
     * @param {*} servers server array to categorize
     */
    categorizeServers() {
        for (const id in Spider.server_list) {
            if (Spider.ns.getServerMaxMoney(Spider.server_list[id]) == 0) {
                Spider.attack_servers.push(Spider.server_list[id]);
            }
            else {
                Spider.target_servers.push(Spider.server_list[id]);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZGVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsic3BpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7R0FNRztBQUVIOzs7R0FHRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBQ1IsTUFBTSxDQUFDLEVBQUUsQ0FBSztJQUNkLE1BQU0sQ0FBQyxXQUFXLENBQVc7SUFDN0IsTUFBTSxDQUFDLGNBQWMsQ0FBVztJQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFXO0lBRTFDLFlBQVksRUFBTTtRQUNqQixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxvQkFBb0I7SUFDYixLQUFLLENBQUMsYUFBYTtRQUN6QixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxnQkFBZ0I7UUFDNUIsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0I7UUFDNUIsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNoQixzQkFBc0I7UUFDdEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDaEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0MsS0FBSyxNQUFNLEVBQUUsSUFBSSxXQUFXLEVBQUU7WUFDN0IsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUM5QixTQUFTO2FBQ1Q7aUJBQU07Z0JBQ04sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDOUM7U0FDRDtJQUNGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGlCQUFpQjtRQUN4QixLQUFLLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDcEMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7U0FDRDtJQUNGLENBQUM7Q0FDRCJ9