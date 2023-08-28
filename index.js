const app = require('./server');
const PORT = process.env.PORT || 4000;

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
