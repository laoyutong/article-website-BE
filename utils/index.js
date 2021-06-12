const sucModal = (data) => ({
  code: 200,
  data,
});

const errModal = (message) => ({
  code: -100,
  message,
});

module.exports = {
  sucModal,
  errModal,
};
