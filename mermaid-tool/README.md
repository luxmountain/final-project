# Mermaid Render Tool

Render tất cả Mermaid diagrams trong file `UC-09-16_Activity_Diagrams.md` ra PNG.

## Cài đặt

Mở **PowerShell** hoặc **CMD** tại thư mục này:

```bash
cd D:\project\ptit\final-project\mermaid-tool
yarn install
```

> Nếu chưa có yarn 4, chạy: `corepack enable && yarn set version 4.6.0`
> Hoặc dùng npm: `npm install`

## Sử dụng

```bash
yarn render
```

Hoặc:

```bash
node render.js
```

## Output

Tất cả file PNG sẽ nằm trong thư mục `output/`:
- `output/UC-09.png`
- `output/UC-10.png`
- `output/UC-11.png`
- `output/UC-12.png`
- `output/UC-13.png`
- `output/UC-14.png`
- `output/UC-15.png`
- `output/UC-16.png`

Copy các file PNG này vào Google Docs/Word.
