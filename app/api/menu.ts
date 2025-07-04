export async function getMenuItems() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}

export async function createOrder(orderData: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
} 