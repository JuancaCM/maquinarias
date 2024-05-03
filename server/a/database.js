const mongoose = require('mongoose');
const dbConection = async () => {
  try {
    console.log('Conectando a la DB........');
    await mongoose.connect('mongodb://localhost/maquinaria',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    console.log('DB conectada........');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar la base de datos');
  }
}

module.exports = {
    dbConection
}