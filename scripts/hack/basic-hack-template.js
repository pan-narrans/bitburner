export async function main(ns) {
    const server_name = ns.args[0];
    const min_security = ns.args[1];
    const max_money = ns.args[2];
    let server_security;
    let server_money;
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
        }
        else if (server_money < max_money) {
            await ns.grow(server_name);
        }
        else {
            await ns.hack(server_name);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtaGFjay10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImhhY2svYmFzaWMtaGFjay10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBRWhDLE1BQU0sV0FBVyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdCLElBQUksZUFBdUIsQ0FBQztJQUM1QixJQUFJLFlBQW9CLENBQUM7SUFFekIsT0FBTyxJQUFJLEVBQUU7UUFDWixtQkFBbUI7UUFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRXpELGVBQWUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBRWpELEVBQUUsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUUxQyxZQUFZLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUUzQyxFQUFFLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFMUMsSUFBSSxlQUFlLEdBQUcsWUFBWSxFQUFFO1lBQ25DLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQUksWUFBWSxHQUFHLFNBQVMsRUFBRTtZQUNwQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNOLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzQjtLQUVEO0FBQ0YsQ0FBQyJ9