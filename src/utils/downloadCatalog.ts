import { products } from '../products';

export const downloadCatalogPDF = (language: 'en' | 'ms' = 'en') => {
  const isMs = language === 'ms';
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download or print the menu catalog.');
    return;
  }

  const itemsHtml = products
    .map(
      (p) => `
    <div style="border: 1px solid #e2d9cd; border-radius: 12px; padding: 16px; background-color: #ffffff; display: flex; gap: 16px; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <img src="${p.image}" alt="${p.id}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; flex-shrink: 0;" />
      <div style="flex-grow: 1;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #3b281b; font-family: 'Playfair Display', Georgia, serif;">
            ${p.id === 'zen-matcha-white-chocolate' ? 'Zen Matcha White Chocolate' : p.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </h3>
          <span style="font-size: 16px; font-weight: 800; color: #8c531b; font-family: system-ui, sans-serif;">
            RM ${p.price.toFixed(2)}
          </span>
        </div>
        <p style="margin: 6px 0 0 0; font-size: 12px; color: #6e5849; line-height: 1.4; font-family: system-ui, sans-serif;">
          Category: <strong style="text-transform: capitalize; color: #8c531b;">${p.category}</strong> | Rating: ⭐ ${p.rating} (${p.reviewsCount} reviews)
        </p>
      </div>
    </div>
  `
    )
    .join('');

  const docContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SofiaAtikah Cookies - Menu Catalogue</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: #fdfaf6;
            color: #3b281b;
            margin: 0;
            padding: 32px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #e8dfd3;
            padding-bottom: 20px;
            margin-bottom: 24px;
          }
          .title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            font-weight: 800;
            color: #4a3321;
            margin: 0 0 4px 0;
          }
          .subtitle {
            font-size: 13px;
            color: #8c531b;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            margin: 0;
          }
          .tagline {
            font-size: 13px;
            color: #7a6352;
            margin-top: 8px;
            font-style: italic;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .footer {
            margin-top: 32px;
            text-align: center;
            border-top: 1px dashed #d1c4b2;
            padding-top: 16px;
            font-size: 12px;
            color: #8c7360;
          }
          @media print {
            body { padding: 16px; background-color: #fff; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="background-color: #8c531b; color: white; border: none; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 14px;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="header">
          <p class="subtitle">by SofiaGPMG</p>
          <h1 class="title">SofiaAtikah Cookies</h1>
          <p class="tagline">${isMs ? 'Kebahagiaan segar dibakar dalam setiap gigitan' : 'Freshly Baked Happiness in Every Bite'}</p>
        </div>

        <div style="margin-bottom: 20px; text-align: center;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #4a3321; margin: 0;">
            ${isMs ? 'Katalog Menu Biskut Gourmet' : 'Gourmet Cookie Menu Catalogue'}
          </h2>
        </div>

        <div class="grid">
          ${itemsHtml}
        </div>

        <div class="footer">
          <p><strong>SofiaAtikah Cookies (by SofiaGPMG)</strong> • Freshly Baked Daily • Order Online at our Web App</p>
          <p>Contact: hello@sofiagpmg-cookies.com | Tel: +60 12-345 6789</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(docContent);
  printWindow.document.close();
};

export const downloadOrderReceipt = (
  cartItems: Array<{ product: { id: string; price: number; nameKey: string }; quantity: number }>,
  totalAmount: number,
  language: 'en' | 'ms' = 'en'
) => {
  const isMs = language === 'ms';
  const orderNumber = `SAC-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString(isMs ? 'ms-MY' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let receiptText = `=========================================\n`;
  receiptText += `      SOFIAATIKAH COOKIES (by SofiaGPMG)  \n`;
  receiptText += `        Official Order Receipt / Resit    \n`;
  receiptText += `=========================================\n\n`;
  receiptText += `Order Ref : ${orderNumber}\n`;
  receiptText += `Date      : ${dateStr}\n`;
  receiptText += `Status    : PAID / CONFIRMED\n\n`;
  receiptText += `-----------------------------------------\n`;
  receiptText += `ITEMS ORDERED:\n`;
  receiptText += `-----------------------------------------\n`;

  cartItems.forEach((item) => {
    const itemTotal = (item.product.price * item.quantity).toFixed(2);
    const name = item.product.id === 'zen-matcha-white-chocolate'
      ? 'Zen Matcha White Chocolate'
      : item.product.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    receiptText += `${name}\n  ${item.quantity} x RM ${item.product.price.toFixed(2)} = RM ${itemTotal}\n`;
  });

  receiptText += `-----------------------------------------\n`;
  receiptText += `TOTAL PAID: RM ${totalAmount.toFixed(2)}\n`;
  receiptText += `=========================================\n\n`;
  receiptText += `Thank you for choosing SofiaAtikah Cookies!\n`;
  receiptText += `We hope every bite brings you pure happiness.\n`;

  const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `SofiaAtikah_Cookies_Receipt_${orderNumber}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
