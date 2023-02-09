const { Command } = require("commander");
const program = new Command();
const {
	getListContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			getListContacts()
				.then((data) => console.log(data))
				.catch((error) => console.log(error));
			break;

		case "get":
			getContactById(id)
				.then((data) => {
					return !data
						? console.log(`Contact with index ${id} wasn't find`)
						: console.log(data);
				})
				.catch((error) => console.log(error));
			break;

		case "add":
			addContact(name, email, phone)
				.then((data) => console.log(data))
				.catch((error) => console.log(error));
			break;

		case "remove":
			removeContact(id)
                .then((data) => {
					return !data
						? console.log(`Contact with index ${id} wasn't find`)
						: console.log(data);
				})
				.catch((error) => console.log(error));
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
