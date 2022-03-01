import { Spider } from 'spider';
/** @param {NS} ns **/
export async function main(ns) {
    const s = new Spider(ns);
    const h = new Hackie(ns);
    await s.scan();
    const servers = await s.getServers();
    servers.forEach(function (item) {
        if (!item.hasAdminRights)
            void h.gainRoot(item);
    });
    /*
    SELL OVER HASHES
  
    WHILE TRUE
      LOOP SERVERS
        GAIN ROOT
        IF TARGET OR PLAYER
          HACK
        IF HACKNET
          UPGRADE
        IF FACTION
          BACKDOOR
    
    */
}
export class Hackie {
    ns;
    constructor(ns) {
        this.ns = ns;
    }
    async gainRoot(target) {
        if (this.ns.fileExists('BruteSSH.exe') && !target.sshPortOpen)
            this.ns.brutessh(target.hostname);
        if (this.ns.fileExists('FTPCrack.exe') && !target.ftpPortOpen)
            this.ns.ftpcrack(target.hostname);
        if (this.ns.fileExists('relaySMTP.exe') && !target.smtpPortOpen)
            this.ns.relaysmtp(target.hostname);
        if (this.ns.fileExists('HTTPWorm.exe') && !target.httpPortOpen)
            this.ns.httpworm(target.hostname);
        if (this.ns.fileExists('SQLInject.exe') && !target.sqlPortOpen)
            this.ns.sqlinject(target.hostname);
        if (target.openPortCount >= target.numOpenPortsRequired)
            this.ns.nuke(target.hostname);
    }
    /*
      // NEEDS TO BE RUN ON THE SERVER
      public async backdoor(target: Server): Promise<void> {
        if (await this.checkForSourceFile(4) && target.hackDifficulty <= this.ns.getHackingLevel())
          void this.ns.installBackdoor(target.hostname);
      }
     */
    async checkForSourceFile(number) {
        let hasSourceFile = false;
        this.ns.getOwnedSourceFiles().forEach(function (item) {
            if (item.n == number && item.lvl > 0)
                hasSourceFile = true;
        });
        return hasSourceFile;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNlcnZlcnMvY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRy9CLHNCQUFzQjtBQUN0QixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLE1BQU0sQ0FBQyxHQUFXLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxHQUFXLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUE7SUFHcEMsT0FBTyxDQUFDLE9BQU8sQ0FDYixVQUFVLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7WUFDdEIsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FDRixDQUFBO0lBS0Q7Ozs7Ozs7Ozs7Ozs7TUFhRTtBQUVKLENBQUM7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQUVULEVBQUUsQ0FBSztJQUVmLFlBQVksRUFBTTtRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDbEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztZQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztZQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLG9CQUFvQjtZQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBRUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQWM7UUFDNUMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQ2xELElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztDQUVGIn0=