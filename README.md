# 📋 Cadastro de Funcionários - Desafio Frontend

Aplicação web desenvolvida em React + TypeScript + Material UI, com persistência de dados utilizando Firebase.

O sistema permite o cadastro de funcionários através de um formulário multi-step (várias etapas) com validações entre as etapas.

Além dos requisitos solicitados no desafio, foram adicionadas funcionalidades extras para melhorar a experiência da aplicação.

# 🚀 Funcionalidades

- Cadastro de funcionários em formulário multi-etapas
- Validação de campos obrigatórios em cada etapa
- Feedback visual para o usuário
- Persistência de dados no Firebase
- Listagem de funcionários cadastrados
- ✏️ Edição de funcionários
- 🗑️ Exclusão de funcionários

# 🛠 Tecnologias utilizadas
- React
- TypeScript
- Material UI
- Firebase (Firestore)
- Vite
- Axios

# 📦 Como rodar o projeto localmente
## 1️⃣ Clonar o repositório
git clone git@github.com:Darlison1398/cadastro-funcionario.git

## 2️⃣ Acessar a pasta do projeto
cd nome-do-repositorio

## 3️⃣ Instalar as dependências
npm install   ou   yarn install

## 4️⃣ Configurar o Firebase
No arquivo "firebase.ts", que está na pasta src/services/firebase.ts, adicione as configurações do firebase ("Você deve criar um banco no firebase e obter as chaves de conexão").
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
 ** Basta substituir os nomes entre as aspas "" pelas chaves geradas no seu banco criado no Firebase.
 
## 5️⃣ Rodar o projeto
npm run dev

sua aplicação estará disponível no navegador através do link: http://localhost:5173
