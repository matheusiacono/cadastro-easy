const actions = (db, request) => ({
  // List Users
  requestUsers: () => (state, { selectUsers }) => {
    request()
      .then((users) => {
        Promise.all(users.map(u => db.insert(u)));
      })
      .then(() => selectUsers());
    return { loadingUsers: true };
  },

  selectUsers: () => (state, { selectUsersCompleted }) => {
    db.selectAll().then(users => selectUsersCompleted(users));
    return { loadingUsers: true };
  },

  selectUsersCompleted: users => () => ({ users: [...users], loadingUsers: false }),

  removeUser: id => (state, { selectUsers }) => db.remove(id).then(() => selectUsers()),

  loadUsers: () => (state, { selectUsers, requestUsers }) =>
    db.exists().then((exists) => {
      if (exists) {
        selectUsers();
      } else {
        requestUsers();
      }
    }),

  // Submit Form
  redirectToHome: () => ({ root }, { selectUsers, navigate }) => {
    selectUsers();
    navigate(root);
    return { submittingForm: false };
  },

  // Create User
  redirectToCreate: () => ({ root }, { navigate }) => {
    setTimeout(() => navigate(`${root}create`));
    return {
      formState: {
        name: '',
        cpf: '',
        phone: '',
        email: '',
      },

      formValid: {
        name: true,
        cpf: true,
        phone: true,
        email: true,
      },
    };
  },

  addUser: user => (state, { insertUser }) => {
    setTimeout(() => insertUser(user), 500);
    return { submittingForm: true };
  },

  insertUser: user => (state, { redirectToHome }) => {
    db.insert(user).then(() => redirectToHome());
  },

  // Edit User
  getUser: id => (state, { redirectToEdit }) => {
    db.select(id).then((user) => {
      redirectToEdit(user);
    });
  },

  redirectToEdit: user => ({ root }, { navigate }) => {
    setTimeout(() => navigate(`${root}edit/${user.id}`));
    return { formState: user };
  },

  editUser: (user, id) => (state, { updateUser }) => {
    setTimeout(() => updateUser(user, id), 500);
    return { submittingForm: true };
  },

  updateUser: (user, id) => (state, { redirectToHome }) => {
    db.update(user, id).then(() => redirectToHome());
  },
});

export default actions;
