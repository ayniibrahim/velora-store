import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  customers: number;
  conversionRate: string;
  adminUsers: number;
}

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: string;
  date: string;
  items: number;
}

interface AdminCustomer {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  subcategory: string;
  stock: number;
  featured: boolean;
  inStock: boolean;
}

const statusOptions = ['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};

export const AdminDashboardPage: React.FC = () => {
  const { user, navigateTo } = useShop();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'VELORA',
    price: '0',
    category: 'women',
    subcategory: 'New Arrival',
    stock: '0',
    featured: false,
    inStock: true,
  });

  const refreshAdminData = async () => {
    const token = localStorage.getItem('velora_token');
    if (!token) {
      return;
    }

    try {
      const [statsResponse, ordersResponse, customersResponse, productsResponse] = await Promise.all([
        fetch(apiUrl('/api/admin/stats'), {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(apiUrl('/api/admin/orders'), {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(apiUrl('/api/admin/customers'), {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(apiUrl('/api/admin/products'), {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!statsResponse.ok || !ordersResponse.ok || !customersResponse.ok || !productsResponse.ok) {
        throw new Error('Unable to load dashboard data.');
      }

      const statsData = await statsResponse.json();
      const ordersData = await ordersResponse.json();
      const customersData = await customersResponse.json();
      const productsData = await productsResponse.json();

      setStats(statsData.stats);
      setOrders(ordersData.orders || []);
      setCustomers(customersData.customers || []);
      setProducts(productsData.products || []);
    } catch {
      setError('Failed to load admin data. Please log in again as admin.');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const token = localStorage.getItem('velora_token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/orders/${orderId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Could not update order status.');
      }

      await refreshAdminData();
    } catch {
      setError('Unable to update the order status right now.');
    }
  };

  const acceptOrder = async (orderId: string) => {
    const token = localStorage.getItem('velora_token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/orders/${orderId}/accept`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Could not accept order.');
      }

      await refreshAdminData();
    } catch {
      setError('Unable to accept the order right now.');
    }
  };

  const addProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('velora_token');

    if (!token) {
      return;
    }

    try {
      const response = await fetch(apiUrl('/api/admin/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          stock: Number(productForm.stock),
        }),
      });

      if (!response.ok) {
        throw new Error('Could not add product.');
      }

      setProductForm({
        name: '',
        brand: 'VELORA',
        price: '0',
        category: 'women',
        subcategory: 'New Arrival',
        stock: '0',
        featured: false,
        inStock: true,
      });

      await refreshAdminData();
    } catch {
      setError('Unable to add a new product at the moment.');
    }
  };

  const deleteProduct = async (productId: string) => {
    const token = localStorage.getItem('velora_token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/products/${productId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Could not delete product.');
      }

      await refreshAdminData();
    } catch {
      setError('Unable to remove the product right now.');
    }
  };

  useEffect(() => {
    if (!user) {
      navigateTo('login');
      return;
    }

    if (user.role !== 'admin') {
      setError('You do not have permission to access the admin dashboard.');
      setLoading(false);
      return;
    }

    refreshAdminData().finally(() => setLoading(false));
  }, [user, navigateTo]);

  if (!user) {
    return null;
  }

  if (user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="border border-[#d2c4ba] bg-white p-10 text-center rounded-3xl">
          <h1 className="font-serif text-3xl mb-4 text-[#1b1c1a]">Access denied</h1>
          <p className="text-[#5f5e5e] mb-6">This dashboard is only available to the admin account.</p>
          <button
            onClick={() => navigateTo('login')}
            className="bg-[#1b1c1a] text-white px-6 py-3 text-xs uppercase tracking-[0.2em]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">Admin panel</p>
          <h1 className="font-serif text-4xl mt-2 text-[#1b1c1a]">Velora Dashboard</h1>
        </div>
        <div className="text-sm text-[#5f5e5e]">
          Logged in as <span className="font-semibold text-[#1b1c1a]">{user.fullName}</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 border border-[#d2c4ba] bg-[#f5f3ef] px-4 py-3 text-sm text-[#1b1c1a]">
          {error}
        </div>
      )}

      {loading && !stats ? (
        <div className="text-[#5f5e5e]">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
            <StatCard label="Revenue" value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} detail="This month" />
            <StatCard label="Orders" value={String(stats?.totalOrders || 0)} detail="Total sales" />
            <StatCard label="Customers" value={String(stats?.customers || 0)} detail="Registered users" />
            <StatCard label="Conversion" value={stats?.conversionRate || '0.0%'} detail="Avg. rate" />
            <StatCard label="Admins" value={String(stats?.adminUsers || 0)} detail="Team access" />
            <StatCard label="Inventory" value={String(stats?.productsInStock || 0)} detail="Products live" />
          </div>

          <div className="mb-8 rounded-3xl border border-[#d2c4ba] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#1b1c1a]">Add New Product</h2>
            </div>
            <form onSubmit={addProduct} className="grid md:grid-cols-3 gap-4">
              <input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} placeholder="Product name" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <input value={productForm.brand} onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })} placeholder="Brand" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} placeholder="Price" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <input value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} placeholder="Category" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <input value={productForm.subcategory} onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })} placeholder="Subcategory" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} placeholder="Stock" className="border border-[#d2c4ba] px-3 py-2 text-sm" required />
              <label className="flex items-center gap-2 text-sm text-[#5f5e5e]">
                <input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-[#5f5e5e]">
                <input type="checkbox" checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} />
                In stock
              </label>
              <button type="submit" className="bg-[#1b1c1a] text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-[#2f2f2d]">Add Product</button>
            </form>
          </div>

          <div className="grid xl:grid-cols-2 gap-8 mb-8">
            <div className="rounded-3xl border border-[#d2c4ba] bg-white overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-[#d2c4ba] bg-[#f5f3ef]">
                <h2 className="font-serif text-2xl text-[#1b1c1a]">Customer List</h2>
              </div>
              <div className="divide-y divide-[#f0ebe3]">
                {customers.map((customer) => (
                  <div key={customer.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-[#1b1c1a]">{customer.fullName}</div>
                      <div className="text-xs text-[#5f5e5e]">{customer.email}</div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#715a44]">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#d2c4ba] bg-white overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-[#d2c4ba] bg-[#f5f3ef]">
                <h2 className="font-serif text-2xl text-[#1b1c1a]">Inventory</h2>
              </div>
              <div className="divide-y divide-[#f0ebe3]">
                {products.map((product) => (
                  <div key={product.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-[#1b1c1a]">{product.name}</div>
                      <div className="text-xs text-[#5f5e5e]">{product.category} / {product.subcategory}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#5f5e5e]">{product.stock} in stock</span>
                      <button onClick={() => deleteProduct(product.id)} className="text-[10px] uppercase tracking-[0.15em] text-[#6b3b3b]">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#d2c4ba] bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-[#d2c4ba] bg-[#f5f3ef]">
              <h2 className="font-serif text-2xl text-[#1b1c1a]">Recent Orders</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#fbf9f5] text-[#715a44] uppercase tracking-[0.15em] text-[10px]">
                  <tr>
                    <th className="px-6 py-3">Order</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-[#f0ebe3] align-top">
                      <td className="px-6 py-4 font-medium text-[#1b1c1a]">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 text-[#5f5e5e]">{order.email}</td>
                      <td className="px-6 py-4">{order.items}</td>
                      <td className="px-6 py-4">${order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block border px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {order.status === 'Pending' && (
                            <button
                              onClick={() => acceptOrder(order.id)}
                              className="bg-[#1b1c1a] text-white px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] hover:bg-[#2f2f2d]"
                            >
                              Accept
                            </button>
                          )}

                          <select
                            value={order.status}
                            onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                            className="bg-[#f5f3ef] border border-[#d2c4ba] px-2 py-1.5 text-[10px] uppercase tracking-[0.12em] focus:outline-none"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'border-[#d2c4ba] bg-[#f5f3ef] text-[#1b1c1a]';
    case 'Accepted':
      return 'border-[#c4a78d] bg-[#f3ebdf] text-[#715a44]';
    case 'Processing':
      return 'border-[#d7c3a4] bg-[#f8f4eb] text-[#5b4a39]';
    case 'Shipped':
      return 'border-[#a9b69a] bg-[#edf3ea] text-[#2d4b32]';
    case 'Delivered':
      return 'border-[#7f9a89] bg-[#ebf5ee] text-[#26493a]';
    case 'Cancelled':
      return 'border-[#b59a9a] bg-[#f9efef] text-[#6b3b3b]';
    default:
      return 'border-[#d2c4ba] bg-[#f5f3ef] text-[#1b1c1a]';
  }
};

const StatCard: React.FC<{ label: string; value: string; detail: string }> = ({ label, value, detail }) => (
  <div className="bg-white border border-[#d2c4ba] p-5 rounded-2xl shadow-sm">
    <p className="text-[10px] uppercase tracking-[0.2em] text-[#715a44]">{label}</p>
    <div className="mt-3 text-3xl font-serif text-[#1b1c1a]">{value}</div>
    <p className="mt-2 text-xs text-[#5f5e5e]">{detail}</p>
  </div>
);
