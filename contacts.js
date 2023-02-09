const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContactsList(newList) {
	await fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function getListContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		const parcedData = await JSON.parse(data);
		return parcedData;
	} catch (error) {
		console.log(error);
	}
}

async function getContactById(contactId) {
	try {
		const contactsList = await getListContacts();
		const findContact = await contactsList.find(
			(contact) => contact.id === contactId
		);
		return findContact;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const contactsList = await getListContacts();
		const idx = contactsList.findIndex((contact) => contact.id === contactId);
		if (idx === -1) {
			return null;
		}
		const [filteredContact] = contactsList.splice(idx, 1);
		await updateContactsList(contactsList);
		return filteredContact;
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	try {
		const contactsList = await getListContacts();
		const newContact = {
			id: shortid.generate(),
			name,
			email,
			phone,
		};
		contactsList.unshift(newContact);
		updateContactsList(contactsList);
		return contactsList;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getListContacts,
	getContactById,
	removeContact,
	addContact,
};

