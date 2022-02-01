import { NS } from '@ns'

import { Spider } from 'spider'

export async function main(ns: NS): Promise<void> {

    const spider = new Spider(ns);
    const spider2 = new Spider(ns);
    void spider.scan();

    ns.tprint(await spider.getServerList());
    ns.tprint(await spider2.getServerList());

}