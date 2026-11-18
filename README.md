# Bíblia Ave-Maria Offline — leitor com índice dos 73 livros

Projeto Android de leitura offline com conteúdo incorporado a partir do PDF fornecido pelo usuário. O índice permite saltar diretamente para o início de cada um dos 73 livros, mantendo a sequência original do documento.

## Organização aplicada
- Índice separado em Antigo e Novo Testamento, com links para os 73 livros.
- Cada livro recebe um ponto de entrada no início correspondente do texto original.
- Capítulos destacados e centralizados quando identificados no PDF; títulos e subtítulos são apresentados conforme a tipografia extraída.
- Fluxo contínuo por páginas, sem inserir quebras de página entre os parágrafos.
- O texto original extraído por página e o PDF completo permanecem nos assets para conferência.
- Leitura offline, ajuste de fonte, modo escuro e busca.

## Limites de fidelidade
O texto não foi editorialmente reescrito nem corrigido. A extração de PDF pode, porém, perder relações de layout, marcas tipográficas ou elementos gráficos; por isso o PDF original foi mantido integralmente como referência. A conversão automática não equivale a uma revisão humana palavra por palavra. Páginas com imagens também foram preservadas nos assets.

## Compilação
O projeto usa Kotlin, Jetpack Compose e Android WebView. O workflow do GitHub Actions gera um APK de depuração.

## Direitos autorais
O próprio PDF informa que a editora reserva os direitos de reprodução total ou parcial. Mantenha este repositório privado e não publique nem redistribua o APK ou o texto incorporado sem autorização dos titulares.
