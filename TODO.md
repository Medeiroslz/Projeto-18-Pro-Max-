# TODO - Plano de Implementação

## ✅ Passo 1: IPhoneModel.jsx
- [x] Dividir rotação em 4 segmentos de 180° (720° total = 2 voltas)
- [x] Manter animação de docking no final

## ✅ Passo 2: ProductScene.jsx - Cards Overlay
- [x] 4 cards HTML sobrepostos ao Canvas com AnimatePresence
- [x] Card 1 (esq) → Card 2 (dir) → Card 3 (esq) → Card 4 (dir)
- [x] Cards somem no dock (progress > 0.65)
- [x] Transições suaves com framer-motion

## ✅ Passo 3: ProductScene.jsx - Melhorias 3D
- [x] Key light + Fill light dourado + Rim light + Top accent
- [x] Environment preset "studio" com giro
- [x] ContactShadows com resolução 1024
- [x] dpr [1, 1.5] para performance

## ✅ Passo 4: Features.jsx - Novo conteúdo
- [x] Card 1: "Sobre a marca"
- [x] Card 2: "Formas de pagamento"
- [x] Card 3: "Condição especial de lançamento"
- [x] Card 4: "Brinde especial"

## ⬜ Passo 5: Testes
- [ ] Verificar se o servidor compila sem erros
- [ ] Testar a rotação dos cards

