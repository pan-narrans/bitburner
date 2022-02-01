
export async function main(ns: NS): Promise<void> {

	const server_name: string = ns.args[0];
	const min_security = ns.args[1];
	const max_money = ns.args[2];
	let server_security: number;
	let server_money: number;

	while (true) {
		// Here for display
		ns.print("\n------------------------------------------");

		server_security = ns.getServerSecurityLevel(server_name);
		ns.print("Min Security:     " + min_security);
		ns.print("Current Security: " + server_security);

		ns.print("-----------------------------");

		server_money = ns.getServerMoneyAvailable(server_name);
		ns.print("Max Money:     " + max_money);
		ns.print("Current Money: " + server_money);

		ns.print("-----------------------------");

		if (server_security > min_security) {
			await ns.weaken(server_name);
		} else if (server_money < max_money) {
			await ns.grow(server_name);
		} else {
			await ns.hack(server_name);
		}

	}
}