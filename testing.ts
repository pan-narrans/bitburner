import { NS } from '@ns'

import { Spider } from 'spider'

export async function main(ns: NS): Promise<void> {

  const spider = new Spider(ns);
  void spider.scan();

  //ns.tprint(spider.toString());


  await ns.run('servers/controller.js');


}

