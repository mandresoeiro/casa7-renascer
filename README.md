# Casa 7 — Renascer Belém 2026

Site estático responsivo para a comunidade Casa 7, com **Início, Comunidade, Espiritualidade, Agenda, Clube de Leitura e Participe**. HTML, CSS e JavaScript puro; sem dependências de build.

## Antes de publicar

1. Abra `assets/js/config.js` e configure o link do WhatsApp, o e-mail da comunidade, o e-mail técnico e os eventos **confirmados**. Campos vazios aparecem como indisponíveis.
2. Peça autorização antes de publicar fotos, nomes e testemunhos. A imagem do botton original está em `assets/img/botton-original.jpeg`.
3. A playlist é opcional: use URL `https://open.spotify.com/embed/...` ou `https://www.youtube.com/embed/...`.
4. Revise a declaração de privacidade e confirme que os responsáveis concordam com a publicação.

## Testar localmente

Abra `index.html` no navegador. Para testar com servidor local (recomendado):

```bash
cd casa7-renascer
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `casa7-renascer`.
2. Envie **o conteúdo desta pasta** para a raiz do repositório (o arquivo `index.html` deve ficar na raiz).
3. Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**; Branch: **main**; Folder: **/(root)**; clique em Save.
4. Aguarde a implantação. A URL normalmente será `https://SEU-USUARIO.github.io/casa7-renascer/`.
5. Abra no celular e teste o menu, a agenda e o formulário.

### Com Git no terminal

```bash
git init
git add .
git commit -m "feat: primeira versão da Casa 7"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casa7-renascer.git
git push -u origin main
```

Crie o repositório vazio no GitHub antes de executar `git push`. Não inclua senhas nem chaves de API no código público.

## Como editar

- Estilo base: `assets/css/style.css`
- Ajustes visuais profissionais e responsivos: `assets/css/professional.css`
- Banner principal da página inicial: `assets/css/hero.css`
- Textos das páginas: arquivos `.html`
- Eventos, contatos e playlist: `assets/js/config.js`
- Lógica de menu, agenda, calendário e formulário: `assets/js/app.js`

## Adicionar músicas ao mini player

1. Coloque os arquivos `.mp3` na pasta `assets/audio/`. Prefira nomes sem espaços ou acentos, como `nome-da-musica.mp3`.
2. Abra `assets/js/config.js` e inclua cada faixa na lista `musicas`:

```js
musicas: [
  {
    titulo: "Nome da música",
    artista: "Nome do artista",
    arquivo: "assets/audio/nome-da-musica.mp3"
  }
]
```

O player aparece automaticamente na página inicial quando existe ao menos uma faixa cadastrada. Publique apenas áudios que você tem autorização para disponibilizar.

## Limites desta versão

- O formulário usa `mailto:`: exige aplicativo de e-mail configurado e **não envia automaticamente**.
- O site não tem login, chat, painel administrativo nem banco de dados.
- O mural de oração é um convite para enviar intenções privadamente; nenhuma mensagem é publicada automaticamente.
- O contador só aparece quando há um evento futuro configurado.
- O site usa Google Fonts; sem internet, recorre a fontes locais.
