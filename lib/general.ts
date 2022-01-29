const helpers = function (): void { return; };

helpers.printArray = function (ns: NS, array: any[]): void {
    for (const id in array) {
        ns.tprint(array[id]);
    }
};

export { helpers };
