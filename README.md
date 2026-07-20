<<<<<<< HEAD
# Projeto-18-Pro-Max-
=======
# iPhone 18 — Landing Page

Landing page premium estilo Apple para o lançamento do iPhone 18, com React + Tailwind CSS + React Three Fiber (Three.js).

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente http://localhost:5173).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Antes de publicar

1. **Número de WhatsApp** — abra `src/components/CTA.jsx` e troque
   `55SEUNUMEROAQUI` pelo número real, com DDI + DDD, sem espaços/símbolos
   (ex.: `5551999998888`).
2. **Suporte MagSafe** — como não havia um modelo 3D dele, foi feito de
   forma procedural (geometrias simples em Three.js) em
   `src/components/DockAccessories.jsx`. Se depois você tiver um `.glb`
   real para o suporte, é só trocar esse componente para usar `useGLTF` do
   mesmo jeito que `IPhoneModel.jsx` / `WatchModel.jsx`.

## Modelos 3D

Os dois modelos enviados já estão em `public/models/` e foram otimizados
com `@gltf-transform` (texturas redimensionadas para 1024px + convertidas
para WebP, geometria comprimida com Meshopt) para carregar rápido:

| Arquivo | Original | Otimizado |
|---|---|---|
| `iphone-17-pro-max-silver.glb` | 5.24 MB | 1.96 MB |
| `apple_watch_ultra_2.glb` | 15.34 MB | 2.81 MB |

Cada modelo é recentralizado e escalado automaticamente em tempo de
execução (`src/lib/normalizeModel.js`), então funcionam mesmo tendo sido
modelados em escalas/pivôs diferentes. Se algum dos dois arquivos não
carregar (404, erro de rede etc.), a Seção 2 cai automaticamente para um
placeholder geométrico simples — o site nunca quebra por causa disso.

## Estrutura

```
src/
  components/
    Hero.jsx              Seção 1 — hero em tela cheia
    ProductScene.jsx       Seção 2 — container sticky 400vh com o Canvas 3D
    IPhoneModel.jsx         modelo GLTF real do iPhone, animado pelo scroll
    WatchModel.jsx          modelo GLTF real do Apple Watch, animado pelo scroll
    DockAccessories.jsx     suporte MagSafe (procedural, sem modelo enviado)
    PlaceholderPhone.jsx    placeholder exibido se o .glb do iPhone não carregar
    PlaceholderWatch.jsx    placeholder exibido se o .glb do Watch não carregar
    ModelErrorBoundary.jsx  captura erro de carregamento de cada modelo
    Features.jsx           Seção 3 — grid de diferenciais com scroll reveal
    CTA.jsx                Seção 4 — chamada final + botão do WhatsApp
  hooks/
    useSectionScrollProgress.js   calcula o progresso do scroll (0→1) de uma seção alta, sem re-render do React a cada frame
  lib/
    normalizeModel.js       clona, recentraliza e normaliza a escala de um modelo GLTF carregado
```

## Ajuste fino (recomendado)

Não tenho como renderizar WebGL neste ambiente para conferir visualmente o
resultado final, então vale a pena abrir `npm run dev` e olhar a Seção 2 na
prática. Os pontos mais prováveis de precisar de ajuste fino, se algo não
estiver perfeito:

- **Ângulo do Watch ao pousar** — em `WatchModel.jsx`, o `g.rotation.y` no
  fim do `useFrame` controla o ângulo final dele ao lado do suporte.
- **Posição relativa dos dois produtos** — os valores de `position.x` em
  `IPhoneModel.jsx` e `WatchModel.jsx` (fase de "dock") controlam o quanto
  cada um se afasta do centro.
- **Tamanho do Watch** — `TARGET_SIZE` no topo de `WatchModel.jsx` normaliza
  pela maior dimensão do modelo (caixa + pulseira), então aumentar/diminuir
  esse número deixa o Watch maior/menor perto do iPhone.

## Notas técnicas

- O Canvas 3D (`ProductScene`) é carregado via `React.lazy`, então o bundle
  do Three.js só baixa quando o usuário chega perto da Seção 2 — mantém o
  carregamento inicial leve.
- A rotação/posição do iPhone é lida de um `ref` (não `state`) dentro do
  loop `useFrame`, para animar a 60fps sem re-renderizar a árvore React a
  cada evento de scroll.
- Os cards da Seção 3 usam `whileInView` do Framer Motion (fade + slide-up)
  conforme entram na viewport.
- `prefers-reduced-motion` é respeitado globalmente em `index.css`.
>>>>>>> 4678b43 (feat: iPhone 18 landing page com 3D, scroll sync cards e zoom na câmera)
