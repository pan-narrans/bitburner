
import { Player } from '@ns'
import { Server } from '@ns'
import { Spider } from 'spider'


/** @param {NS} ns **/
export async function main(ns: NS): Promise<void> {
  const s: Spider = new Spider(ns);
  const h: Hackie = new Hackie(ns);

  await s.scan();

  const servers = await s.getServers()


  servers.forEach(
    function (item) {
      if (!item.hasAdminRights)
        void h.gainRoot(item);
    }
  )

  


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

  private ns: NS;

  constructor(ns: NS) {
    this.ns = ns;
  }

  public async gainRoot(target: Server): Promise<void> {
    if (this.ns.fileExists('BruteSSH.exe') && !target.sshPortOpen) this.ns.brutessh(target.hostname);
    if (this.ns.fileExists('FTPCrack.exe') && !target.ftpPortOpen) this.ns.ftpcrack(target.hostname);
    if (this.ns.fileExists('relaySMTP.exe') && !target.smtpPortOpen) this.ns.relaysmtp(target.hostname);
    if (this.ns.fileExists('HTTPWorm.exe') && !target.httpPortOpen) this.ns.httpworm(target.hostname);
    if (this.ns.fileExists('SQLInject.exe') && !target.sqlPortOpen) this.ns.sqlinject(target.hostname);

    if (target.openPortCount >= target.numOpenPortsRequired) this.ns.nuke(target.hostname);
  }
  
  /* 
    // NEEDS TO BE RUN ON THE SERVER
    public async backdoor(target: Server): Promise<void> {
      if (await this.checkForSourceFile(4) && target.hackDifficulty <= this.ns.getHackingLevel())
        void this.ns.installBackdoor(target.hostname);
    }
   */
  
  public async checkForSourceFile(number: number): Promise<boolean> {
    let hasSourceFile = false;

    this.ns.getOwnedSourceFiles().forEach(function (item) {
      if (item.n == number && item.lvl > 0)
        hasSourceFile = true;
    });

    return hasSourceFile;
  }

}