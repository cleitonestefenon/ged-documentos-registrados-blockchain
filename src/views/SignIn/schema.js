export default {
  email: {
    presence: { allowEmpty: false, message: 'Campo obrigatório' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'Campo obrigatório' },
    length: {
      maximum: 128
    }
  }
};
