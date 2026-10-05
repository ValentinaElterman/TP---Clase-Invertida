const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint de verificación de estado para el Load Balancer (Health Check)
app.get('/health', (req, res) => {
  const healthStatus = {
    uptime: process.uptime(),
    status: 'UP',
    timestamp: Date.now()
  };

  try {
    res.status(200).json(healthStatus);
  } catch (error) {
    healthStatus.status = 'DOWN';
    res.status(503).json(healthStatus);
  }
});

// Endpoint principal de la API
app.get('/api/v1/products', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Producto 1', price: 100 },
      { id: 2, name: 'Producto 2', price: 200 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});