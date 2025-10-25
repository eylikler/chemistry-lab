# 🧪 Kimya Laboratuvarı - İnteraktif Element Karıştırma Oyunu

Modern ve eğlenceli bir React uygulaması! Elementleri sürükle-bırak ile karıştırarak kimyasal bileşikler keşfedin.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple?logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-ff69b4)

## ✨ Özellikler

### 🎮 Oyun Mekanikleri
- **20 Farklı Element:** Periyodik tablodan istediğiniz elementi ekleyin!
- **14 Keşfedilebilir Bileşik:** Su, Karbondioksit, Amonyak, Tuz, Sülfürik Asit, Kalsiyum Karbonat, Asetik Asit, Etanol, Metan, Hidroklorik Asit, Azot Dioksit, Sodyum Hidroksit, Magnezyum Oksit, Glikoz
- **Puan Sistemi:** Her doğru kombinasyon puan kazandırır
- **İlerleme Takibi:** Keşfedilen bileşikleri görüntüleyin

### 🎨 Görsel Efektler
- **Parçacık Sistemleri:** tsparticles ile gerçekçi efektler
  - 💧 Kabarcık efekti (Su)
  - 💨 Duman efekti (CO₂)
  - ☁️ Buhar efekti (Amonyak)
  - ✨ Pırıltı efekti (Tuz)
  - ⚠️ Patlama efekti (Asit)
  - 💎 Kristalleşme efekti (Kalsiyum Karbonat)
- **Smooth Animasyonlar:** Framer Motion ile akıcı geçişler
- **Glassmorphism:** Modern cam efekti tasarımı
- **Responsive:** Tüm cihazlarda mükemmel görünüm

### 🔧 Teknolojiler

- **React 18.3.1** - Modern hooks (useState, useEffect)
- **Vite 6.0.1** - Hızlı geliştirme ortamı
- **@dnd-kit** - Sürükle-bırak işlevselliği
- **Framer Motion** - Animasyonlar
- **tsparticles** - Parçacık efektleri
- **canvas-confetti** - Konfeti animasyonları
- **react-hot-toast** - Bildirimler
- **Web Audio API** - Ses efektleri

## 🚀 Kurulum

```bash
# Projeyi klonlayın
git clone [repository-url]

# Proje dizinine gidin
cd chemistry-lab

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 🎯 Nasıl Oynanır?

1. **Element Seçin:** Sol taraftaki element kartlarından birini seçin
2. **Beaker'a Sürükleyin:** Elementi ortadaki cam beaker'a sürükleyin
3. **Kombinasyon Oluşturun:** Doğru element miktarlarını ekleyin
4. **Karıştırın:** "Karıştır" butonuna basın
5. **Keşfedin:** Doğru kombinasyon ise bileşiği keşfedersiniz!

### 💡 İpuçları

**Basit Bileşikler:**
- **Su (H₂O):** H + H + O
- **Karbondioksit (CO₂):** C + O + O
- **Amonyak (NH₃):** N + H + H + H
- **Tuz (NaCl):** Na + Cl
- **Metan (CH₄):** C + H + H + H + H
- **Hidroklorik Asit (HCl):** H + Cl

**Orta Seviye:**
- **Azot Dioksit (NO₂):** N + O + O
- **Sodyum Hidroksit (NaOH):** Na + O + H
- **Magnezyum Oksit (MgO):** Mg + O (Periyodik tablodan Mg ekleyin!)
- **Kalsiyum Karbonat (CaCO₃):** Ca + C + O + O + O

**Zorlu Bileşikler:**
- **Sülfürik Asit (H₂SO₄):** H + H + S + O + O + O + O
- **Asetik Asit (CH₃COOH):** C + H + H + H + C + O + O + H
- **Etanol (C₂H₅OH):** C + C + H + H + H + H + H + O + H
- **Glikoz (C₆H₁₂O₆):** 6C + 12H + 6O (24 element! En zor bileşik!)

## 📁 Proje Yapısı

```
chemistry-lab/
├── src/
│   ├── components/
│   │   ├── ElementCard.jsx      # Sürüklenebilir element kartları
│   │   ├── Beaker.jsx           # Cam beaker bırakma alanı
│   │   ├── ParticleEffect.jsx   # Parçacık efektleri
│   │   └── ReactionDisplay.jsx  # Bileşik listesi
│   ├── App.jsx                  # Ana uygulama
│   ├── App.css                  # Ana stiller
│   ├── reactions.js             # Reaksiyon veritabanı
│   └── main.jsx                 # Giriş noktası
├── public/
├── package.json
└── vite.config.js
```

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Linting
npm run lint
```

## 🎨 Özelleştirme

### Yeni Element Ekleme

`src/reactions.js` dosyasında `elements` dizisine yeni element ekleyin:

```javascript
{
  symbol: 'Fe',
  name: 'Demir',
  atomicNumber: 26,
  color: '#D4A574',
  textColor: '#5D4E37'
}
```

### Yeni Reaksiyon Ekleme

`src/reactions.js` dosyasında `reactions` objesine yeni reaksiyon ekleyin:

```javascript
'Fe2O3': {
  name: 'Demir Oksit',
  elements: ['Fe', 'Fe', 'O', 'O', 'O'],
  color: '#CD5C5C',
  effect: 'rust',
  description: 'Pas!',
  points: 200
}
```

## 📱 Responsive Tasarım

- **Desktop:** 3 sütunlu grid layout
- **Tablet (< 1400px):** Tek sütun, optimized düzen
- **Mobile (< 768px):** Tam ekran, dokunmatik optimizasyon
- **Small Mobile (< 480px):** Kompakt tasarım

## 🌟 Öne Çıkan Özellikler

- ✅ Modern React Hooks kullanımı
- ✅ Tam TypeScript uyumlu (JSX)
- ✅ Glass morphism UI tasarımı
- ✅ Performanslı animasyonlar
- ✅ Ses efektleri (Web Audio API)
- ✅ Toast bildirimleri
- ✅ Kullanım talimatları modalı
- ✅ İlerleme takip sistemi
- ✅ Tam responsive

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje eğitim amaçlı oluşturulmuştur.

## 👨‍💻 Geliştirici

Cursor AI Hackathon projesi olarak geliştirilmiştir.

---

**Eğlenceli öğrenmeler! 🧪✨**
