import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const arr = ns.ls(ns.getHostname(), "js");
    for (const i in arr) {
        if (ns.rm(arr[i]))
            ns.tprint("successfully deleted " + arr[i]);
        else
            ns.tprint("failed to delete " + arr[i]);
    }
}