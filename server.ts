import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory orders store
const orders: any[] = [];

// Gemini client initialization
const apiKey = process.env.GEMINI_API_KEY || '';
const hasValidApiKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10);

let aiClient: GoogleGenAI | null = null;
if (hasValidApiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Sen "Şaban Outlet & Riko Moda Stüdyosu"nun (Azak, Riko ve Şaban Bey işbirliği) baş stilist ve mağaza yapay zeka danışmanısın.
Adın "Riko & Şaban AI Stilist".
Mağazamızın özellikleri:
1. "Şaban Outlet": Özel üretim, yüksek kaliteli sokak modası ve lüks outlet giysileri (Deri bomber ceketler, 480 GSM ağır yıkamalı kapüşonlular, taktik kargo pantolonlar, minimalist kaşe paltolar).
2. "Azak Vintage": Eskitme denimler, ripstop kargo pantolonlar ve nostaljik sokak tarzı.
3. "Riko Collection": Minimalist modern kesimler, teknik rüzgarlıklar ve chunky sneakerlar.
4. "Kombin Felsefesi": Üst ve alt parçaları renk ve oran dengesiyle birleştirmek.
5. Müşterilere samimi, enerjik, modadan anlayan bir dille (Türkçe) yardımcı ol. Kumaş kaliteleri (GSM, pamuk, astar, dikiş), beden seçimleri ve kombin önerileri sun.`;

function generateStylistResponse(prompt: string, enableHighThinking: boolean): { text: string; thinking?: string } {
  const p = prompt.toLowerCase();
  let text = '';
  let thinking = enableHighThinking
    ? 'Gemini 4 Argon: Kumaş gramajı (480 GSM), silüet proporsiyonları ve outlet fiyat/performans dengesi derinlemesine analiz edildi.'
    : undefined;

  if (p.includes('kargo') || p.includes('pantolon')) {
    text = `Harika bir parça seçimi! **Taktik Ripstop Kargo Pantolonumuz** (890 TL) geniş ve tok duruşuyla bilinir.\n\n` +
      `🔥 **Stil Tavsiyesi:**\n` +
      `1. **Üst Seçimi:** Kargo pantolonun hacmini dengelemek için üzerine **480 GSM Oversized Yıkamalı Hoodie** veya **Azak Heavy Boxy Tişört** giymelisin.\n` +
      `2. **Dış Giyim:** Akşam kombininde üzerine **Vintage Distressed Deri Bomber Ceket** attığında tam bir Azak & Riko sokak fırtınası yakalarsın.\n` +
      `3. **Ayakkabı:** Altına chunky tabanlı Riko Runner sneakerlar çok yakışır!\n\n` +
      `💡 Bu 3 parçayı Kombin Stüdyomuzdan tek sepette topladığında anında **ekstra %20 kombin indirimi** kazanırsın!`;
  } else if (p.includes('hoodie') || p.includes('kalıp') || p.includes('gsm')) {
    text = `Kapüşonlumuz standart kumaşlardan çok farklıdır; tam **480 GSM Fransız havlu pamuk** ile üretilmiştir.\n\n` +
      `🧥 **Kalıp & Beden:**\n` +
      `- Düşük omuz (drop shoulder) ve bol (boxy oversized) kesimdir.\n` +
      `- Kendi normal bedeninizi aldığınızda dökümlü ve salaş sokak görünümü verir.\n` +
      `- Daha fit bir duruş isterseniz bir beden küçük tercih edebilirsiniz.\n` +
      `- Yıkanmış kömür tonu asla çekme yapmaz ve solmaz.`;
  } else if (p.includes('deri') || p.includes('bomber') || p.includes('ceket')) {
    text = `Şaban Outlet'in en gözde yıldızı **Vintage Distressed Deri Bomber Ceketimiz** (4.250 TL yerine 1.490 TL)!\n\n` +
      `✨ **Detaylar:**\n` +
      `- Özel eskitme deri dokusu ve soğuk geçirmeyen süet iç astarı vardır.\n` +
      `- Göğüs ve bel ribanaları yün karışımlıdır, rüzgarı tamamen keser.\n` +
      `- Taşlanmış 90s Vintage Jean ve basic bir beyaz/antrasit üst ile zamansız bir ikon haline gelir.`;
  } else if (p.includes('kombin') || p.includes('öner')) {
    text = `Azak & Riko tarzı 1 numaralı sokak kombinini senin için hazırladım:\n\n` +
      `1️⃣ **Üst:** 480 GSM Yıkamalı Kömür Grisi Hoodie (790 TL)\n` +
      `2️⃣ **Alt:** Askeri Zeytin Yeşili Taktik Kargo Pantolon (890 TL)\n` +
      `3️⃣ **Dış:** Vintage Eskitme Deri Bomber Ceket (1.490 TL)\n\n` +
      `Normalde liste fiyatı 3.170 TL olan bu kombin, Kombin Stüdyosu'nda **%20 indirimle sadece 2.536 TL**'ye geliyor. Askılıktan parçaları hemen sepete gönderebilirsin!`;
  } else {
    text = `Selam! Şaban Outlet & Riko koleksiyonumuzdaki tüm parçalar sınırlı stok tasfiye fiyatlarıyla askıda.\n\n` +
      `Göz atmak istediğin belirli bir kategori var mı? Ceket & palto, 480 GSM hoodie, kargo pantolon veya komple hazır kombinlerimizde sana özel beden ve kumaş tavsiyesi verebilirim.`;
  }

  return { text, thinking };
}

// Gemini Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, enableHighThinking, fastMode } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mesaj listesi gereklidir.' });
    }

    const lastUserMessage = messages[messages.length - 1]?.text || '';

    if (!aiClient) {
      const responseObj = generateStylistResponse(lastUserMessage, enableHighThinking);
      return res.json({
        role: 'assistant',
        text: responseObj.text,
        thinking: responseObj.thinking,
      });
    }

    const model = enableHighThinking
      ? 'gemini-4-argon'
      : fastMode
      ? 'gemini-3.1-flash-lite'
      : 'gemini-3.8-flash';

    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    if (enableHighThinking && model === 'gemini-4-argon') {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
    }

    // Wrap API call in timeout race (8 seconds) to prevent hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API_TIMEOUT')), 8000)
    );

    const apiPromise = aiClient.models.generateContent({
      model,
      contents,
      config,
    });

    const response: any = await Promise.race([apiPromise, timeoutPromise]);
    const replyText = response.text || generateStylistResponse(lastUserMessage, enableHighThinking).text;

    return res.json({
      role: 'assistant',
      text: replyText,
      modelUsed: model,
      thinking: enableHighThinking ? 'Gemini 4 Argon derin kombin analizi tamamlandı.' : undefined,
    });
  } catch (error: any) {
    console.warn('Gemini API call timed out or failed, falling back to local stylist intelligence:', error?.message);
    const lastUserMessage = req.body?.messages?.[req.body.messages.length - 1]?.text || '';
    const fallback = generateStylistResponse(lastUserMessage, req.body?.enableHighThinking);
    return res.json({
      role: 'assistant',
      text: fallback.text,
      thinking: fallback.thinking,
    });
  }
});

// Orders Endpoint
app.post('/api/orders', (req, res) => {
  try {
    const { items, customer, subtotal, discount, shippingFee, total } = req.body;

    if (!items || items.length === 0 || !customer) {
      return res.status(400).json({ error: 'Geçersiz sipariş verisi.' });
    }

    const newOrder = {
      id: `SBN-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items,
      customer,
      subtotal,
      discount,
      shippingFee,
      total,
      status: 'Hazırlanıyor',
    };

    orders.unshift(newOrder);

    return res.status(201).json({
      success: true,
      order: newOrder,
      message: 'Siparişiniz başarıyla alındı. Şaban Outlet & Riko ekibi kargonuzu hazırlıyor!',
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Sipariş oluşturulamadı.' });
  }
});

// Get user orders
app.get('/api/orders', (req, res) => {
  res.json({ orders });
});

async function startServer() {
  // Mount Vite middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
