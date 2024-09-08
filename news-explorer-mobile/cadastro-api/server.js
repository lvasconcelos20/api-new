const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();

// Middleware para leitura de JSON
app.use(bodyParser.json());

// POST CREATE
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se todos os campos estão presentes
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// GET
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});

// GET ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
});

// PUT
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se a senha for fornecida, criptografe-a novamente
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});

// DELETE
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Rodando na porta http://localhost:${PORT}`);
});
