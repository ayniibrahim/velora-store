import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'velora-secret-key';
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const ordersFile = path.join(dataDir, 'orders.json');
const productsFile = path.join(dataDir, 'products.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const readJsonFile = (filePath, fallback) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeJsonFile = (filePath, value) => {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
};

const createToken = (user) => jwt.sign(
  {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  },
  JWT_SECRET,
  { expiresIn: '7d' }
);

const ensureAdminUser = () => {
  const users = readJsonFile(usersFile, []);
  const adminExists = users.some((user) => user.email === 'admin@velora.com');

  if (!adminExists) {
    users.push({
      id: crypto.randomUUID(),
      fullName: 'Velora Admin',
      email: 'admin@velora.com',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    writeJsonFile(usersFile, users);
  }
};

const validOrderStatuses = ['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const defaultProducts = [
  {
    id: 'sofia-silk-blouse',
    name: 'The Sofia Silk Blouse',
    brand: 'VELORA COLLECTION',
    price: 395,
    category: 'women',
    subcategory: 'Tops & Blouses',
    stock: 18,
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
  },
  {
    id: 'camel-tailored-coat',
    name: 'The Camel Tailored Coat',
    brand: 'VELORA ATELIER',
    price: 450,
    category: 'outerwear',
    subcategory: 'Coats & Jackets',
    stock: 9,
    featured: true,
    inStock: true,
    rating: 5,
    reviewsCount: 24,
  },
  {
    id: 'namola-maxima',
    name: 'Namola Maxima Slip Dress',
    brand: 'VELORA COLLECTION',
    price: 125,
    category: 'women',
    subcategory: 'Dresses',
    stock: 22,
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 24,
  },
];

const ensureSeedOrders = () => {
  const orders = readJsonFile(ordersFile, [
    {
      id: 'ORD-1001',
      customer: 'Amina Ali',
      email: 'amina@example.com',
      total: 1245,
      status: 'Pending',
      date: '2026-08-20',
      items: 2,
    },
    {
      id: 'ORD-1002',
      customer: 'Elias Noor',
      email: 'elias@example.com',
      total: 890,
      status: 'Accepted',
      date: '2026-08-21',
      items: 1,
    },
    {
      id: 'ORD-1003',
      customer: 'Lina Hassan',
      email: 'lina@example.com',
      total: 1430,
      status: 'Processing',
      date: '2026-08-22',
      items: 3,
    },
  ]);

  if (!Array.isArray(orders)) {
    writeJsonFile(ordersFile, []);
  } else {
    const normalizedOrders = orders.map((order) => ({
      ...order,
      status: validOrderStatuses.includes(order.status) ? order.status : 'Pending',
    }));
    writeJsonFile(ordersFile, normalizedOrders);
  }
};

const ensureSeedProducts = () => {
  const products = readJsonFile(productsFile, defaultProducts);

  if (!Array.isArray(products) || products.length === 0) {
    writeJsonFile(productsFile, defaultProducts);
    return;
  }

  writeJsonFile(productsFile, products.map((product) => ({
    ...product,
    inStock: product.inStock ?? true,
    featured: product.featured ?? false,
    stock: product.stock ?? 0,
  })));
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

app.use(cors());
app.use(express.json());

ensureAdminUser();
ensureSeedOrders();
ensureSeedProducts();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'velora-api' });
});

app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, password } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Full name, email and password are required.' });
  }

  const cleanName = String(fullName).trim();
  const cleanEmail = String(email).trim().toLowerCase();

  if (cleanName.length < 2) {
    return res.status(400).json({ message: 'Full name is too short.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  const users = readJsonFile(usersFile, []);
  const exists = users.some((user) => user.email.toLowerCase() === cleanEmail);

  if (exists) {
    return res.status(409).json({ message: 'This email is already registered.' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    fullName: cleanName,
    email: cleanEmail,
    passwordHash: bcrypt.hashSync(String(password), 10),
    role: 'customer',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeJsonFile(usersFile, users);

  const safeUser = {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
  };

  return res.status(201).json({
    message: 'Account created successfully.',
    token: createToken(safeUser),
    user: safeUser,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const users = readJsonFile(usersFile, []);
  const user = users.find((entry) => entry.email.toLowerCase() === cleanEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isValid = bcrypt.compareSync(String(password), user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const safeUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  return res.json({
    message: 'Login successful.',
    token: createToken(safeUser),
    user: safeUser,
  });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const users = readJsonFile(usersFile, []);
  const user = users.find((entry) => entry.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

app.get('/api/admin/stats', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJsonFile(usersFile, []);
  const orders = readJsonFile(ordersFile, []);
  const products = readJsonFile(productsFile, []);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const recentOrders = orders.length;
  const customerCount = users.filter((user) => user.role === 'customer').length;
  const conversionRate = recentOrders > 0 ? ((recentOrders / Math.max(customerCount + recentOrders, 1)) * 100).toFixed(1) : '0.0';

  res.json({
    stats: {
      totalRevenue,
      totalOrders: recentOrders,
      customers: customerCount,
      conversionRate: `${conversionRate}%`,
      adminUsers: users.filter((user) => user.role === 'admin').length,
      productsInStock: products.filter((product) => product.inStock).length,
    },
  });
});

app.get('/api/admin/customers', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJsonFile(usersFile, []);
  const customers = users
    .filter((user) => user.role === 'customer')
    .map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    }));

  res.json({ customers });
});

app.get('/api/admin/products', authMiddleware, adminMiddleware, (req, res) => {
  const products = readJsonFile(productsFile, defaultProducts);
  res.json({ products: products.slice().sort((a, b) => a.name.localeCompare(b.name)) });
});

app.post('/api/admin/products', authMiddleware, adminMiddleware, (req, res) => {
  const { name, brand, price, category, subcategory, stock, featured, inStock } = req.body || {};

  if (!name || !brand || !price || !category) {
    return res.status(400).json({ message: 'Product name, brand, price and category are required.' });
  }

  const products = readJsonFile(productsFile, defaultProducts);
  const newProduct = {
    id: crypto.randomUUID(),
    name: String(name),
    brand: String(brand),
    price: Number(price),
    category: String(category),
    subcategory: String(subcategory || 'General'),
    stock: Number(stock || 0),
    featured: Boolean(featured),
    inStock: inStock !== undefined ? Boolean(inStock) : Number(stock || 0) > 0,
    rating: 4.8,
    reviewsCount: 0,
  };

  products.push(newProduct);
  writeJsonFile(productsFile, products);
  return res.status(201).json({ message: 'Product created successfully.', product: newProduct });
});

app.put('/api/admin/products/:productId', authMiddleware, adminMiddleware, (req, res) => {
  const { productId } = req.params;
  const payload = req.body || {};
  const products = readJsonFile(productsFile, defaultProducts);
  const target = products.find((product) => product.id === productId);

  if (!target) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  Object.assign(target, {
    ...payload,
    price: Number(payload.price ?? target.price),
    stock: Number(payload.stock ?? target.stock ?? 0),
    inStock: payload.inStock !== undefined ? Boolean(payload.inStock) : target.inStock,
    featured: payload.featured !== undefined ? Boolean(payload.featured) : target.featured,
  });

  writeJsonFile(productsFile, products);
  return res.json({ message: 'Product updated.', product: target });
});

app.delete('/api/admin/products/:productId', authMiddleware, adminMiddleware, (req, res) => {
  const { productId } = req.params;
  const products = readJsonFile(productsFile, defaultProducts);
  const filtered = products.filter((product) => product.id !== productId);

  if (filtered.length === products.length) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  writeJsonFile(productsFile, filtered);
  return res.json({ message: 'Product removed.' });
});

app.get('/api/admin/orders', authMiddleware, adminMiddleware, (req, res) => {
  const orders = readJsonFile(ordersFile, []);
  res.json({ orders: orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 30) });
});

app.put('/api/admin/orders/:orderId/status', authMiddleware, adminMiddleware, (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body || {};

  if (!status || !validOrderStatuses.includes(status)) {
    return res.status(400).json({ message: 'A valid order status is required.' });
  }

  const orders = readJsonFile(ordersFile, []);
  const targetOrder = orders.find((order) => order.id === orderId);

  if (!targetOrder) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  targetOrder.status = status;
  writeJsonFile(ordersFile, orders);

  return res.json({
    message: `Order ${orderId} updated to ${status}.`,
    order: targetOrder,
  });
});

app.post('/api/admin/orders/:orderId/accept', authMiddleware, adminMiddleware, (req, res) => {
  const { orderId } = req.params;
  const orders = readJsonFile(ordersFile, []);
  const targetOrder = orders.find((order) => order.id === orderId);

  if (!targetOrder) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  targetOrder.status = 'Accepted';
  writeJsonFile(ordersFile, orders);

  return res.json({ message: `Order ${orderId} accepted.`, order: targetOrder });
});

app.listen(port, () => {
  console.log(`Velora API running on http://localhost:${port}`);
});
