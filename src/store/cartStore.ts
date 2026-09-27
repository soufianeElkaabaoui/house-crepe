import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  dietaryNotes?: string;
}

interface CartState {
  items: CartItem[];
  customerName: string;
  deliveryAddress: string;
  specialInstructions: string;
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  setCustomerName: (name: string) => void;
  setDeliveryAddress: (address: string) => void;
  setSpecialInstructions: (instructions: string) => void;

  // Computed Getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
  generateWhatsAppUrl: (whatsappNumber?: string) => string;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customerName: '',
  deliveryAddress: '',
  specialInstructions: '',
  isOpen: false,

  addItem: (newItem) => {
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return { items: updated };
      }
      return {
        items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }],
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });
  },

  clearCart: () => {
    set({ items: [], specialInstructions: '' });
  },

  setIsOpen: (isOpen) => set({ isOpen }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  setCustomerName: (customerName) => set({ customerName }),
  setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
  setSpecialInstructions: (specialInstructions) => set({ specialInstructions }),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  generateWhatsAppUrl: (overrideNumber?: string) => {
    const { items, customerName, deliveryAddress, specialInstructions, getTotalPrice } = get();
    const phone = overrideNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000';
    const total = getTotalPrice().toFixed(2);

    let message = `Hello House Crepe! I'd like to place an order:\n\n`;

    items.forEach((item) => {
      const itemSubtotal = (item.price * item.quantity).toFixed(2);
      message += `- ${item.quantity}x ${item.name} ($${itemSubtotal})\n`;
    });

    message += `\nTotal: $${total}\n`;
    message += `Name: ${customerName.trim() || 'Not specified'}\n`;
    message += `Address: ${deliveryAddress.trim() || 'Not specified'}\n`;

    if (specialInstructions.trim()) {
      message += `Special Instructions: ${specialInstructions.trim()}\n`;
    }

    message += `Payment: Cash on Delivery`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },
}));
