# 📝 To-Do-List

> Projeto Fullstack de Gerenciamento de Tarefas (CRUD)  
> Front-end: Angular v20 | Back-end: Node.js + Express | TypeScript
---

## 🔹 Descrição

O **To-Do-List*** é uma aplicação completa para gerenciamento de tarefas com funcionalidades de **CRUD completo**. Desenvolvida com stack moderno, permite criar, listar, editar e excluir tarefas de forma intuitiva e eficiente. O sistema inclui organização por status, prioridades, categorias e tags, além de relatórios simples sobre produtividade.

---

## 🛠 Tecnologias Utilizadas

### Front-end
- Angular v20 - Framework principal
- TypeScript - Tipagem estática
- Tailwind - Estilização utilitária
- Angular Material (opcional)

### Back-end
- Node.js - Ambiente de execução
- Express - Framework web
- TypeScript - Desenvolvimento tipado
- Zod - Validação de schemas
- Lowdb - Banco de dados JSON

---

## ⚡ Funcionalidades

- Criar, listar, editar e excluir tarefas
- Gerenciar status (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`)
- Definir prioridade (`LOW`, `MEDIUM`, `HIGH`, `URGENT`)
- Categorias e tags para melhor organização
- Contagem de tarefas pendentes e concluídas
- Validação de dados no front-end e back-end

---

## 📝 Estrutura de Dados (Model)

```ts
export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum Status {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  category?: string;
  tags?: string[];
  isActive: boolean;
}
``` 

---

## 📡 Testes de API (Postman)

Toda a API do **To-Do-List** pode ser testada utilizando o **Postman**.  
A documentação oficial com todos os endpoints está disponível [CLIQUE AQUI](https://documenter.getpostman.com/view/40261848/2sB3QNr9Ub).

**Recomendações:**
- Importe a coleção no Postman para facilitar os testes.
- Todos os endpoints já possuem exemplos de **request** e **response**.
- Use o ambiente configurado para testar diferentes cenários (CRUD completo).

---

# 💾 Criação do Banco de Dados Local

O projeto utiliza o Lowdb como banco de dados local — um banco leve baseado em arquivo JSON.
Para iniciar o banco de dados corretamente, siga os passos abaixo:

**Passo a passo:**
- No diretório do back-end, existe um arquivo chamado: ```db-example.json```
- Renomeie o arquivo db-example.json para db.json antes de rodar o servidor

## 🗂 Estrutura esperada do arquivo db.json

Após a renomeação, o arquivo deve conter algo semelhante a isto:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Exemplo de Tarefa",
      "description": "Esta é uma tarefa inicial de exemplo.",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2025-01-01T12:00:00.000Z",
      "category": "Pessoal",
      "tags": ["importante"],
      "isActive": true
    }
  ]
}
```

---

# 🚀 Comandos de Instalação e Execução

## 📋 Pré-requisitos
- **Node.js** 18+ [Download aqui](https://nodejs.org/)
- **Git** [Download aqui](https://git-scm.com/)
- **Angular CLI** (instalado globalmente) - ```npm install -g @angular/cli ```

## 🔧 Back-end

### 1. Navegar para a pasta
```bash
cd backend
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Executar em modo desenvolvimento
```bash
npm run dev
```

## 🎨 Front-end

### 1. Navegar para a pasta
```bash
cd front-end
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Subir servidor
```bash
ng serve
```