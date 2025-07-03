# New Courses Angular

Uma aplicação frontend em **Angular 18** para consumo da API de Cursos (backend Spring Boot), com foco em boas práticas de mercado, arquitetura limpa e experiência do usuário.

---

## 📋 Visão Geral do Projeto

- **Objetivo**: Fornecer uma interface web para criar, listar, editar e remover cursos, consumindo a API REST do projeto “New Courses Spring”.  
- **Principais diferenciais**:  
  - Uso de **Standalone Components** e **Typed Forms** (FormBuilder / Reactive Forms)  
  - Validações de formulário em tempo real (`Validators.required`, `Validators.minLength`, etc.)  
  - Serviços Angular (`HttpClient`) desacoplados com tratamento de erros centralizado  
  - Design responsivo com SCSS 
  - Camadas bem definidas: componentes, serviços, models, interceptors, guards  
  - **Testes unitários** e de componente com **Jest**

---

## 🚀 Tecnologias e Ferramentas

| Camada                 | Ferramenta / Biblioteca                         |
|------------------------|-------------------------------------------------|
| Framework              | Angular 18 (Standalone API)                     |
| Language               | TypeScript                                     |
| HTTP Client            | `@angular/common/http` (HttpClient)             |
| State & DI             | Services + RxJS (`Observables`, `Subjects`)     |
| Formulários            | `@angular/forms` (Reactive Forms)               |
| Validação              | `Validators`, mensagens personalizadas          |
| Testes                 | Jest, ts-jest         |

---

## ⚙️ Funcionalidades Principais

1. **Listagem de Cursos**  
   - Paginação e ordenação  
   - Filtro de busca por nome ou categoria  

2. **Formulários de Criação e Edição**  
   - Campos com validações (required, tamanho mínimo, pattern)  
   - Feedback instantâneo de erros  

3. **Detalhes do Curso**  
   - Página dedicada exibe dados completos  

4. **Exclusão de Curso**  
   - Diálogo de confirmação antes da remoção  

5. **Tratamento de Erros e Loader**  
   - Interceptor para capturar erros de rede / API  
   - Spinner global enquanto carrega dados  

---

## 🛠️ Pré‑requisitos e Setup

1. **Clone** o repositório:  
   ```bash
   git clone https://github.com/gabrielcarvalhogc/new-courses-angular.git
   cd new-courses-angular
