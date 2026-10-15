# Rodapé institucional completo

> Rodapé com 4 colunas de links, newsletter validada, redes sociais e linha legal com razão social e CNPJ. Passa a solidez que o comprador corporativo procura.

**Ver ao vivo, com preview e manual:** https://flowcoresolucoes.com.br/codigos/rodape-completo

Criado por **FlowCore Soluções LTDA**.

## Arquivos

- [`src/RodapeCompleto.tsx`](src/RodapeCompleto.tsx)

## Como instalar

1. **Tenha um projeto React com Tailwind** Já tem (Vite, Next.js, Remix)? Pule este passo. Se não, crie um em 1 minuto e adicione ./src/**/*.{ts,tsx} ao content do tailwind.config.

   ```bash
   npm create vite@latest minha-app -- --template react-ts
   cd minha-app
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Crie o arquivo src/components/RodapeCompleto.tsx** Copie o conteúdo de `src/RodapeCompleto.tsx` deste repositório. Ele é um arquivo só, sem dependência além de React.
3. **Use na sua página**

   ```tsx
   import RodapeCompleto from "./components/RodapeCompleto";
   
   <RodapeCompleto tema="claro" accent="#0057FF" cnpj="00.000.000/0001-00" />
   ```

4. **Personalize** Textos, dados e a cor de destaque (prop accent) são props com valor padrão. Troque pelos da sua marca ou ligue na sua API.

## Tema e cor

Abre em tema claro. Use `tema="escuro"` para o escuro e `accent` para a cor de destaque:

```tsx
<RodapeCompleto tema="claro" accent="#0057FF" cnpj="00.000.000/0001-00" />
```

## Licença

MIT. Pode usar em projeto pessoal ou comercial, de graça. A única condição é manter a linha **“Criado por FlowCore Soluções LTDA”** (ou o crédito de adaptação) onde ela está.

---

Precisa disso integrado no seu sistema? A [FlowCore](https://flowcoresolucoes.com.br) desenvolve sob medida.
