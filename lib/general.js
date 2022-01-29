export function General() {
    this.test_var = "hey";

    /**  @param {NS} ns **/
    // Prints an array on the terminal, one value per line
    this.printArray = function (ns, array) {
        for (var id in array) {
            ns.tprint(array[id]);
        }
    };
}