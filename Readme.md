# Proyecto Final
## E-commerce
Mi proyecto trata de compra en comida en restaurantes 
### Rutas 
#### Vistas:
*http://localhost:8080/static/
Pagina principal para registrarse

*http://localhost:8080/static/login.html
Pagina para hacer login con la cuenta que creaste

*http://localhost:8080/static/me.html
Pagina privada donde pode ver tus datos y podes chatear con otros usuarios 

#### Usuarios:

*http://localhost:8080/static/api/sessions/user
Metodo get: Trae a todos los usuarios. (Se necesita autenticación y autorizacion rol 'admin')

*http://localhost:8080/static/api/sessions/user
Metodo post: Crea usuarios tiene que colocar nombre, apellido, dni, email, password, phone, avatar(opcional), edad

*http://localhost:8080/static/api/sessions/user/:uid
Metodo put: Puede modificar las propiedades del o los usuarios dependiendo del rol
"admin": Cualquier Usuario.
"user": Solo puede modificar tu usuario.

*http://localhost:8080/static/api/sessions/user/:uid
Metodo delelte: Puede eliminar al usuario dependiendo del rol
"admin": Cualquier Usuario.
"user": Solo puede eliminar tu usuario.

*http://localhost:8080/static/api/sessions/user/:uid
Metodo get: puede traer a un usuario en especifico dependiendo del rol,
"admin": Cualquier Usuario.
"user": Solo puede trer tu usuario.

#### Order:

*http://localhost:8080/static/order
Metodo get: Trae todas las ordenes creadas.(Solo con el rol de "admin").

*http://localhost:8080/static/order
Metodo post: Puede crear ordenes de con el formato de:
user:(id del usuario),
business:(id del negocio),
products:[product(id del producto creado en business), quantity(Cantidad en la que lo vas a comprar), price(Cuanto cuesta comprarlo)]

*http://localhost:8080/static/order/:id
Metodo get: Puede traer al informacion de una orden especifica dependiendo el rol:
"admin": Cualquier Orden.
"user": Solo puede trer tu Orden.

*http://localhost:8080/static/order/:id/resolve
Metodo put: Puede completar o cancelar tu orden dependiendo de lo que elijas, por default esta en pending con el formato:
status:completed o canceled

*http://localhost:8080/static/order/:id
Metodo delelte: Puedes borrar una orden solo si eres de rol "admin"

#### Business:
*http://localhost:8080/static/order/business
Metodo get: Puede traer todas los business, solo lo puede hacer con el rol "admin"

*http://localhost:8080/static/order/business
Metodo post: Puede crear los business, con el formato;
name:(Nombre del negocio)
products:[
    id:(numero de identificador del producto),
    name:(nombre del Negocio),
    price:(precio del producto)
]

*http://localhost:8080/static/order/business/:id
Metodo get: Puede traer un business en especifico, solo lo puede hacer con el rol "admin"

*http://localhost:8080/static/order/business/:id
Metodo put: Puede modificar los business especificados, solo se puede hacer con el rol "admin"

*http://localhost:8080/static/order/business/:id
Metodo delete: Puede eliminar el business especificado, solo lo puede hacer con el rol "admin"