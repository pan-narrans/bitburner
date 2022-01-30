import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {

    ns.tprint("Script Initiated");

    while (true) {
        ns.hacknet.spendHashes("Sell for Money");
        await ns.sleep(10);
    }
}