# Gerenciador de Tarefas - Angular 19/20 (Zoneless) - Desenvolvido por Luis Silva –  https://www.linkedin.com/in/luisgabrielsilva/

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Este projeto é uma aplicação de gerenciamento de tarefas de alta performance, desenvolvida para explorar as fronteiras mais recentes do ecossistema Angular. O foco principal foi a implementação de uma arquitetura **Zoneless** e a reatividade granular com **Signals API**.

---

## Funcionalidades

- **Gestão de Estado Reativa**: Adição, conclusão e remoção de tarefas em tempo real.
- **Filtros Avançados**: Listagem dinâmica (Todas, Pendentes, Concluídas) utilizando lógica computada.
- **Consumo de API REST**: Integração com a API JSONPlaceholder via HttpClient.
- **Data Mapping & UX**: Tratamento de dados externos para converter conteúdos genéricos em tarefas contextuais de desenvolvimento.
- **Persistência de Dados**: Sincronização automática com o LocalStorage do navegador para resiliência de dados.

---

##  Diferenciais Técnicos

### 1. Arquitetura Zoneless
A aplicação foi configurada utilizando `provideZonelessChangeDetection()`, eliminando a dependência do `zone.js`. Isso resulta em um bundle mais leve e uma detecção de mudanças muito mais performática e previsível.

### 2. Signals API (O Futuro do Angular)
Utilizei o novo padrão de reatividade do Angular para evitar ciclos de renderização desnecessários:
- **`signal`**: Para o estado síncrono da lista de tarefas e filtros.
- **`computed`**: Para derivação automática de valores (como o contador de tarefas concluídas), garantindo que o cálculo ocorra apenas quando necessário.
- **`effect`**: Para operações colaterais, como a persistência automática no armazenamento local.

### 3. Service-less Architecture (Component-Based)
Demonstração de como componentes standalone modernos podem gerenciar lógica de negócio e injeção de dependências (como o `HttpClient`) de forma limpa e direta usando a função `inject()`.

---

##  Estrutura do Projeto

```text
src/
 ├── app/
 │    ├── app.component.ts    # Lógica de negócio, Signals e Integração de API
 │    ├── app.component.html  # Template declarativo com novas diretivas (@for, @if)
 │    ├── app.component.css   # Estilização moderna e responsiva
 │    └── app.config.ts       # Configuração de Providers (HttpClient, Zoneless)
 └── main.ts                  # Bootstrapping do componente Standalone
```

## Como Instalar e Rodar

Siga os passos abaixo para executar o projeto em sua máquina local:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/luissilva3112/projeto-angular-to-do-list.git](https://github.com/luissilva3112/projeto-angular-to-do-list.git)
   ``` 
2. **Entre na pasta do projeto:**
   ```bash
   cd projeto-angular-to-do-list
   ```
3. **Instale as dependências:*
   ```bash
   npm install
   ```
4. **Instale o Zone.js:**
* Observação: Embora o projeto utilize a arquitetura Zoneless, a biblioteca é mantida para garantir a compatibilidade de inicialização e de dependências externas, evitando o erros.
   ```bash
    npm install zone.js
   ```
5. **Inicie o projeto:**
   ```bash
    ng serve
   ```
6. **Acesse:**
   ```bash
    http://localhost:4200
   ```
