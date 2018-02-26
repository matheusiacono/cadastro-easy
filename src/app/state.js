const initialState = {
  loadingUsers: true,
  users: [],

  submittingForm: false,

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

export default initialState;
