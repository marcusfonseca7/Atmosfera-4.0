# PVS - Template

**Vite + Sass**: uma estrutura de projeto pronta e organizada para desenvolvimento web com HTML, SCSS e Vite.

O PVS Template elimina o trabalho repetitivo do início de um projeto. Toda a estrutura de pastas já está montada, os estilos essenciais já estão configurados e o ambiente de desenvolvimento está pronto para uso.

---

## Recursos

- Estrutura de pastas organizada para projetos com Sass e Vite
- Reset global de estilos já aplicado
- Pasta dedicada à responsividade, com breakpoints centralizados em variáveis
- Mixins prontos para reutilização (flex, animações)
- Fonte **Roboto** (Google Fonts) já configurada como padrão
- Tag de favicon (PNG) já adicionada no `index.html`
- `.gitignore` preparado para npm, SCSS, VS Code e Vite
- Código de exemplo para testar se tudo está funcionando

---

## Estilos já incluídos

Para você não precisar repetir os mesmos ajustes em todo projeto, o template já vem com:

| Elemento | Padrão aplicado |
| --- | --- |
| Todos os elementos | `margin: 0`, `padding: 0` e `box-sizing: border-box` |
| `<button>` | `cursor: pointer` |
| `<a>` | `text-decoration: none` |
| Listas (`<ul>`, `<ol>`) | `list-style: none` |

---

## Responsividade

Todos os breakpoints ficam em uma pasta própria (`styles/responsivity`), com variáveis para **mobile** e **desktop**.

Basta alterar o valor da variável e todo o site se adapta ao novo breakpoint, sem precisar caçar valores espalhados pelos arquivos.

---

## Estrutura de pastas

```
pvs-template/
├── node_modules/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── pages/
│   │   └── example.html
│   ├── scripts/
│   │   ├── database/
│   │   │   └── db.js
│   │   ├── dom/
│   │   │   └── elements.js
│   │   ├── pages/
│   │   │   └── hero.js
│   │   ├── util/
│   │   └── main.js
│   └── styles/
│       ├── components/
│       │   ├── _buttons.scss
│       │   ├── _cards.scss
│       │   ├── _fonts.scss
│       │   ├── _header.scss
│       │   ├── _index.scss
│       │   ├── _links.scss
│       │   └── _lists.scss
│       ├── global/
│       ├── mixins/
│       │   ├── _animations.scss
│       │   ├── _flex.scss
│       │   └── _index.scss
│       ├── pages/
│       │   ├── _hero.scss
│       │   └── _index.scss
│       ├── responsivity/
│       │   ├── _desktop.scss
│       │   ├── _index.scss
│       │   └── _mobile.scss
│       ├── variables/
│       └── index.scss
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

### Visão geral das pastas

- **`assets/`**: ícones e imagens do projeto.
- **`pages/`**: páginas HTML adicionais.
- **`scripts/`**: código JavaScript, dividido por responsabilidade:
  - `database/`: lógica de dados
  - `dom/`: referências e manipulação de elementos do DOM
  - `pages/`: scripts específicos de cada página ou seção (ex.: `hero.js`)
  - `util/`: funções utilitárias
  - `main.js`: ponto de entrada
- **`styles/components/`**: estilos de componentes reutilizáveis (botões, cards, header, links, listas e fontes).
- **`styles/global/`**: estilos globais e reset.
- **`styles/mixins/`**: mixins Sass reutilizáveis.
- **`styles/pages/`**: estilos específicos de cada página ou seção.
- **`styles/responsivity/`**: breakpoints e regras para mobile e desktop.
- **`styles/variables/`**: variáveis do projeto.
- **`styles/index.scss`**: arquivo principal que reúne todos os estilos.

Cada pasta de estilos possui um `_index.scss` que centraliza seus arquivos, mantendo os imports organizados.

---

## Como usar

### 1. Clonar o template

```bash
git clone https://github.com/pierry-savio/pvs-template.git meu-projeto
cd meu-projeto
```

Ou, para clonar sem o histórico do Git:

```bash
npx degit pierry-savio/pvs-template meu-projeto
cd meu-projeto
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

> **Não é mais necessário usar o Live Server.** O Vite já inclui um servidor de desenvolvimento com *hot reload*: basta rodar `npm run dev` e abrir o endereço exibido no terminal (geralmente `http://localhost:5173`). A página é atualizada automaticamente a cada alteração em HTML, SCSS ou scripts, e o Sass é compilado na hora, sem extensões extras nem compilação manual.

---

## Scripts disponíveis

```json
"scripts": {
  "dev": "vite",
    "build": "vite build",
  "preview": "vite preview"
}
```

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Gera a build de produção com o Vite |
| `npm run preview` | Pré-visualiza localmente a build de produção |

---

## Código de exemplo

O template inclui um pequeno exemplo apenas para confirmar que o Sass e o Vite estão funcionando. Quando começar seu projeto, **apague os trechos abaixo**.

### `index.html`

```html
<!-- EXAMPLE CODE -->
<main>
    <section class="hero">
        <h1>Hello PVS!</h1>
        <p>The best project structure for web Sass development.</p>
        <a class="github" href="https://github.com/pierry-savio/pvs-template">Learn More</a>
    </section>
</main>
<!-- EXAMPLE CODE -->
```

### `src/styles/pages/_hero.scss`

```scss
// --- EXAMPLE CODE ---
section.hero {
    min-height: 100vh;
    @include mix.flex-center();
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 60px;
        color: rgb(107, 0, 107);
    }

    p {
        font-size: 20px;
    }

    a.github {
        padding: 10px 40px;
        font-size: 20px;
        background-color: rgb(107, 0, 107);
        color: white;

        &:hover {
            background-color: rgb(149, 0, 149);
        }
    }
}
// --- EXAMPLE CODE ---
```

---

## Configurações iniciais já feitas

- **Favicon**: a tag já está no `<head>` do `index.html`, configurada para imagens PNG. Basta trocar a imagem.
- **Fonte**: a **Roboto**, do Google Fonts, já está importada no `<head>` e definida como fonte padrão.
- **`.gitignore`**: já configurado para `node_modules`, builds do Vite, logs, variáveis de ambiente e arquivos de editor.

---

## Autor

Criado por **Pierry**.

Repositório: [github.com/pierry-savio/pvs-template](https://github.com/pierry-savio/pvs-template)
