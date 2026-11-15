# Bíblia Ave-Maria — leitor digital

Leitor web responsivo com o texto extraído do PDF fornecido, organizado por página. O PDF não faz parte do projeto e não é carregado pelo aplicativo.

## Recursos incluídos
- 5.163 páginas na ordem do documento.
- Navegação por páginas e acesso aos livros bíblicos.
- Busca por palavras e trechos no conteúdo textual.
- Tema claro, sépia e escuro.
- Ajuste do tamanho da letra, família tipográfica e brilho.
- Favoritos por página.
- Anotações por página.
- Salvamento da última página, aparência, favoritos e anotações no armazenamento local do navegador/dispositivo.
- Fac-símiles de páginas com mapas, diagramas, imagens e tabelas para preservar a disposição visual original.

## Funcionamento offline

O projeto inclui um Service Worker (`sw.js`) que baixa e guarda no dispositivo o aplicativo, o texto integral extraído e os fac-símiles locais. **A primeira abertura/publicação precisa de internet** para instalar o cache; aguarde o carregamento inicial terminar. Depois disso, abra pelo ícone instalado ou pelo endereço já visitado e o leitor funciona sem conexão. O Service Worker exige HTTPS (o GitHub Pages oferece HTTPS) ou localhost; abrir `index.html` diretamente como arquivo não ativa o modo offline.

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie o conteúdo da pasta `BibliaAveMariaLeitor` para a raiz do repositório (incluindo `data/` e `images/`).
3. No GitHub, acesse **Settings → Pages**, selecione a branch principal e a pasta `/ (root)`.
4. Abra o endereço publicado.

Não renomeie nem mova `data/pages.json`, `data/images.json` ou a pasta `images/`.

## Verificação e limites
- A extração textual foi gerada diretamente do PDF com `pdftotext` em ordem de leitura.
- O documento tem 5.163 páginas. Onze páginas não possuem camada de texto no PDF; seus fac-símiles foram incluídos como imagens. As páginas com tabelas/diagramas ou imagens também têm fac-símile para consulta visual.
- A extração automática não permite prometer ausência absoluta de erros de OCR/ordenação em todo o documento. Por isso, as páginas visuais preservam o original para conferência, especialmente tabelas e diagramas.
- O leitor usa apenas arquivos locais; não há APIs, fontes, bibliotecas ou conteúdo remoto. O Service Worker pré-armazena os arquivos do leitor e os fac-símiles para leitura offline após a primeira instalação. O teste automatizado em navegador não pôde ser concluído neste ambiente.

## Direitos autorais
Antes de publicar publicamente a íntegra desta edição, verifique se você tem autorização para reproduzir e distribuir a tradução e o material editorial. O ZIP não contém o PDF original.
