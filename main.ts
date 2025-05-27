import fetch from 'node-fetch';

interface User{
    id: number;
    name: string;
    email: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function isClipboardEmail(email: string) : boolean {
    return email.toLowerCase().endsWith('@clipboardhealth.com');
}

async function main(){
    try{
        const response = await fetch(API_URL);
        const users = await response.json() as User[];

        users[0].email = "alice@clipboardhealth.com";
        users[1].email = "bob@clipboardhealth.com";


        const filteredUsers = users
            .filter((user: any) => isClipboardEmail(user.email))
            .sort((a: any, b: any) => a.name.localeCompare(b.name));

        console.log('Valid Clipboard Health Users: \n');
        filteredUsers.forEach((user: any) =>
            console.log(`- ${user.name} <${user.email}>`)
        );
        console.log(`\nTotal: ${filteredUsers.length}`);
    }
    catch(err){
        console.error('Failed to fetch data:', err);
    }
}

main();