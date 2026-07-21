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

**Número de WhatsApp** — abra `src/components/CTA.jsx` e troque
`55SEUNUMEROAQUI` pelo número real, com DDI + DDD, sem espaços/símbolos
(ex.: `5551999998888`).

## Modelo 3D

O modelo do iPhone 18 está em `public/models/iphone-18-pro-max.glb`.
Ele é recentralizado e escalado automaticamente em tempo de execução
(`src/lib/normalizeModel.js`). Se o arquivo não carregar (404, erro de rede
etc.), a Seção 2 cai automaticamente para um placeholder geométrico simples
— o site nunca quebra por causa disso.

## Estrutura

```
src/
  components/
    Hero.jsx              Seção 1 — hero em tela cheia
    ProductScene.jsx       Seção 2 — container sticky 400vh com o Canvas 3D
    IPhoneModel.jsx         modelo GLTF real do iPhone, animado pelo scroll
    PlaceholderPhone.jsx    placeholder exibido se o .glb do iPhone não carregar
    ModelErrorBoundary.jsx  captura erro de carregamento do modelo
    Features.jsx           Seção 3 — grid de diferenciais com scroll reveal
    Header.jsx             Header fixo com logo
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

- **Ângulo do iPhone no zoom** — em `IPhoneModel.jsx`, o `g.rotation.y` e
  `g.rotation.x` no fim do `useFrame` controlam o ângulo final do aparelho
  mostrando o módulo da câmera.
- **Zoom da câmera** — o `g.scale.setScalar(THREE.MathUtils.lerp(1, 1.8, eased))`
  controla o quanto o iPhone aproxima. Ajuste o `1.8` para mais ou menos zoom.

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

