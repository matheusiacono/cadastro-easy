const url = 'https://private-21e8de-rafaellucio.apiary-mock.com/users';

const getUsers = () => window.fetch(url).then(res => res.json());

export default getUsers;
