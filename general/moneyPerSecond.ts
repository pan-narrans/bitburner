import { NetscriptPort, NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const MONEY_PORT: NetscriptPort = ns.getPortHandle(1);
    const DELAY = 10;
    let moneyT1: number, moneyT2: number, moneyPerS: number;
    do {
        moneyT1 = ns.getServerMoneyAvailable('home');
        await ns.sleep(DELAY * 1000);
        moneyT2 = ns.getServerMoneyAvailable('home');
        moneyPerS = (moneyT2 - moneyT1) / DELAY;

        if (!MONEY_PORT.empty)
            void MONEY_PORT.read;
        MONEY_PORT.write(moneyPerS);

    } while (true);
}