import { NS } from '@ns';
import { Server } from '@ns'


/**
 * Crawls the web and stores the names of the servers it founds.
 * 
 * @author Alejandro Pérez
 */
export class Spider {
  protected static ns: NS;

  // servers
  protected static servers: Server[];
  protected static target_servers: Server[];
  protected static player_servers: Server[];
  protected static hacknet_servers: Server[];
  protected static faction_servers: Server[];

  // names (for debugging)
  protected static server_names: string[];
  protected static target_servers_names: string[];
  protected static player_servers_names: string[];
  protected static hacknet_servers_names: string[];
  protected static faction_servers_names: string[];


  constructor(ns: NS) {
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
  public getTargetServers(): string[] {
    return Spider.target_servers_names;
  }

  public getServers(): Server[] {
    return Spider.servers;
  }


  /**
   * Updates the values of the following attributes of {@link Spider}:
   * 
   * 		- {@link Spider.server_names}	
   * 		- {@link Spider.target_servers_names}	
   * 		- {@link Spider.player_servers_names}
   */
  public async scan(): Promise<void> {
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
  private scanNework(target: string, origin: string) {
    const scan_result = Spider.ns.scan(target);

    for (const id in scan_result) {
      if (scan_result[id] == origin) {
        continue;
      } else {
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
  private categorizeServers() {
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

  private writeNames() {
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

  public async toString(): Promise<void> {
    Spider.ns.tprintf("\nserver_names:      \n" + Spider.server_names + "\n");
    Spider.ns.tprintf("\ntarget_servers_names:   \n" + Spider.target_servers_names + "\n");
    Spider.ns.tprintf("\nplayer_servers_names:   \n" + Spider.player_servers_names + "\n");
    Spider.ns.tprintf("\nhacknet_servers_names:  \n" + Spider.hacknet_servers_names + "\n");
    Spider.ns.tprintf("\nfaction_servers_names:  \n" + Spider.faction_servers_names + "\n");
  }


} // End Spider