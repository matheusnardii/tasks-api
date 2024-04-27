# Gerenciamento de Tarefas API

You can connect to the Render server witch this link:
https://m5-template-entrega2-matheusnardii.onrender.com/

### Cadastro de usuário POST /users

Padrão de corpo

```json
{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}⁠
```

#### Possíveis erros:

STATUS (409) - E-mail já cadastrado

```json
{ "message": "This email is already registered" }
```

STATUS (400) quando o corpo não é compatível com o padrão

### Login de usuário POST /users/login

Padrão de corpo

```json
{
    "email": "johndoe@email.com",
    "password": "12345678"
}
```

Padrão de resposta (200)

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}⁠
```
#### Possíveis erros:

STATUS (404) - Usuário não existente

```json
{ "messsage": "User not exists" }
```
STATUS (401) - E-mail e senha não correspondem


```json
{ "messsage": "Email and password doesn't match" }
```

STATUS (409) quando o corpo não é compatível com o padrão

### Recuperação de usuário /users/profile (Precisa de autorização)

É necessário autorização para acessar esta rota, forneça o Token do cabeçalho da requisição 

```json
{
   "headers":{
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE0MDQwNjk0LCJleHAiOjE3MTQxMjcwOTR9.otP2tfxgFU1WLkPY9GNSvsa0P5P74EvuyU55U6RMzos"
   } 
}
```

Padrão de resposta (200)

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}⁠
```

### Possíveis erros na validação de Token:

STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```
STATUS (401) - Token inválido.

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "categoryId?": 1,
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks

Padrão de resposta  (STATUS: 200)

```json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": false,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]  
```

URL Search Params

| Parâmetro | Exemplo de uso | Descrição |
| ------ | ------ | ------ |
| category | /tasks?category=estudo | Forneça o "id" da categoria para trazer somente tarefas da categoria determinada |

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```
STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```

### Leitura de individual GET /tasks/:1

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "category": {
        "id": 1,
        "name": "Estudo"
    }
}   
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```
STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```


### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo 

```json
{
    "title?": "Lorem ipsum",
    "content?": "Lorem ipsum",
    "finished?": true,
    "categoryId?": 1,
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": true,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa PATCH /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```
STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```


### Criação de categoria POST /categories

Padrão de corpo

```json
{
    "name": "Example",
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "Example",
}
```

#### Possíveis erros:

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria POST

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```
STATUS (401) - O token é obrigatório

```json
{ "messsage": "Token is required" }
```

STATUS (403) - Categoria não pertence ao usuário

```json
{
   "message": "This user is not the category owner" 
}