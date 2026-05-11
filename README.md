# Landing Page — dimasqiramadhani.com

Personal landing page untuk root domain `dimasqiramadhani.com`.
Konsisten dengan desain cyberfolio-cms (dark theme, accent `#10b981`, font yang sama).

## Struktur

```
landing-page/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
```

## Deploy ke cPanel

1. Upload semua file ke **document root** domain `dimasqiramadhani.com`
   (biasanya `/home/dimr9945/public_html/`)
2. Pastikan `index.html` ada di root folder
3. Tidak perlu server-side setup — pure static HTML/CSS/JS

## Kustomisasi

- **Portfolio URL**: Ubah `https://portfolio.dimasqiramadhani.com` di `index.html`
- **Status badge**: Edit teks "Open to opportunities" di `index.html`
- **Bio**: Edit paragraf `.bio` di `index.html`
- **Skill tags**: Tambah/hapus `.skill-tag` di `index.html`
- **Warna accent**: Ubah `--accent` di `assets/css/style.css`
