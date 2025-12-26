# French Café Billing Website

A complete café billing system for a French café with menu management, shopping cart, tax calculations, bill generation, and UPI QR code payment integration.

## Features

### 🏠 Homepage
- Clean French café theme with warm beige, brown, and pastel colors
- Responsive navigation bar
- Welcome page with café information

### 📋 Menu Management (Items Page)
- **4 Categories**: Pastries, Bakes, Breads, Beverages
- **Full CRUD Operations**:
  - Create new menu items
  - Read/View all items with category filtering
  - Update item details (name, price, category)
  - Delete items
- Category filter tabs
- Grid layout for easy browsing
- Add to Cart functionality

### 🛒 Shopping Cart
- Add items to cart
- Remove items from cart
- Increase/decrease quantity
- Real-time subtotal calculation
- Empty cart option

### 💰 Taxes & Charges
- **CGST**: Custom percentage (optional)
- **SGST**: Custom percentage (optional)
- **Service Tax**: Custom percentage (optional)
- **Packing Charge**: ₹10 per item (only if takeaway is selected)
- Real-time bill updates based on tax settings

### 🧾 Billing Page
- Formatted bill with:
  - Café logo and name
  - Date & time
  - Itemized list (name, quantity, unit price, total)
  - Subtotal
  - Individual tax breakdown with percentages and amounts
  - Packing charges
  - Grand total
- **Print Bill**: Print-ready layout
- **Save as PDF**: Export bill as PDF file
- **UPI QR Code**: Auto-generated QR code with payment amount

### 🎨 UI/UX Features
- French café theme (warm beige, brown, pastel pink, cream)
- Smooth animations (fade-in, slide-in)
- Toast notifications for user actions
- Mobile-responsive design
- Print-friendly CSS

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Storage**: LocalStorage
- **QR Code**: qrcode.js
- **PDF Generation**: jsPDF + html2canvas
- **Build Tool**: Vite

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Default Menu Items

### Pastries
- Chocolate Cake - ₹250
- Tiramisu - ₹280
- Cheesecake - ₹300

### Bakes
- Croissant - ₹80
- Pain au Chocolat - ₹90
- Choco Chip Cookie - ₹60
- Cinnamon Roll - ₹100

### Breads
- French Loaf - ₹120
- Brioche - ₹150

### Beverages
- Latte - ₹150
- Cappuccino - ₹140
- Espresso - ₹100
- Flat White - ₹160
- Iced Tea – Peach - ₹120
- Iced Tea – Lemon - ₹120

## Usage

1. **Browse Menu**: Navigate to "Items" to view all menu items
2. **Add Items**: Click "Add to Cart" on any item
3. **Manage Cart**: Go to "Cart" to adjust quantities or remove items
4. **Configure Taxes**: On the billing page, enable and set tax percentages
5. **Generate Bill**: Click "Generate Bill" to view the formatted bill
6. **Print/Export**: Use "Print Bill" or "Save as PDF" buttons
7. **Pay**: Scan the QR code to pay via UPI

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── HomePage.jsx        # Homepage
│   ├── ItemsPage.jsx       # Menu management page
│   ├── ItemCard.jsx        # Individual item card
│   ├── ItemForm.jsx        # Add/Edit item form
│   ├── CartPage.jsx        # Shopping cart page
│   ├── CartItem.jsx        # Individual cart item
│   ├── BillingPage.jsx     # Bill generation page
│   ├── TaxControls.jsx     # Tax configuration component
│   └── Toast.jsx           # Toast notification component
├── context/
│   └── AppContext.jsx      # Global state management
├── utils/
│   ├── storage.js          # LocalStorage helpers
│   ├── calculations.js     # Tax and total calculations
│   └── qrGenerator.js      # QR code generation
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Customization

### UPI ID
To change the UPI ID for QR code payments, edit `src/utils/qrGenerator.js`:
```javascript
const upiId = 'your-upi-id@bank';
```

### Theme Colors
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  'cafe-beige': '#F5E6D3',
  'cafe-brown': '#8B4513',
  // ... more colors
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

