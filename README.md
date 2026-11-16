# Bíblia Ave Maria — projeto Android

Aplicativo Android independente, em português, desenvolvido com Kotlin e Jetpack Compose.

## O que já está preparado
- Tela inicial e navegação inferior.
- Lista organizada dos 73 livros da Bíblia católica.
- Pesquisa de livros.
- Seleção de livro e capítulo.
- Área de leitura preparada para receber o texto bíblico licenciado.
- Favoritos demonstrativos durante a sessão.
- Tela de configurações inicial.

## Importante sobre o texto bíblico
Este repositório **não contém o texto integral da tradução Ave-Maria**. O arquivo de referência fornecido informa reserva de direitos de reprodução. Antes de incluir essa tradução, obtenha autorização/licença do titular dos direitos. Não publique o PDF nem copie seu conteúdo para este repositório sem autorização.

O leitor atualmente exibe um texto de orientação, não versículos reais. Depois de obter uma fonte autorizada, os dados podem ser integrados em `BibleRepository.kt`.

## Como abrir e compilar
1. Instale o Android Studio atualizado.
2. No Android Studio, escolha **Open** e selecione a pasta deste projeto.
3. Aguarde a sincronização do Gradle.
4. Execute em um emulador ou celular Android (depuração USB ativada).
5. Para gerar APK: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

Requisitos indicativos: JDK 17 e Android SDK 35.

## Como publicar no GitHub
1. Crie um repositório novo no GitHub, por exemplo `biblia-ave-maria-android`.
2. Extraia este ZIP no computador.
3. Envie todos os arquivos e pastas desta pasta para o repositório (não envie `local.properties` nem pastas `build`).
4. No GitHub, confira se o `README.md` aparece na página inicial.

## Próximas etapas
- Integrar texto bíblico com licença válida.
- Salvar favoritos e histórico permanentemente.
- Implementar marcações, planos de leitura e versículo do dia.
- Criar ícone, tela de abertura e testes.
