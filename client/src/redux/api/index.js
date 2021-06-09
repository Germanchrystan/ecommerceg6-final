import axios from 'axios';
//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea
const { GOOGLEID } = process.env;
const API = axios.create( { baseURL: REACT_APP_API} ) 

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const googleId =`${GOOGLEID}`;
//AUTHENTICATION
//export const getUserById = (_id) => API.get(`/users/:${_id}`);
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const googleLogIn = (formData) => API.post('users/google',formData);
export const changePassword = (passwords, _id) => API.put(`/users/password/${_id}`, passwords);
export const updateUser = (userBody, _id) => API.put(`users/${_id}`, userBody);

export const addAddress = (_id, addressBody) => API.post(`/users/address/${_id}`, addressBody);
export const removeAddress = (_id, addressId ) => API.put(`/users/address/remove/${_id}`,addressId);



//CART
//Trae el cart activo de un usuario particular
export const getActiveCartFromUser = (userId) => API.get(`/carts/active/${userId}`);
//Trae todos los carts de todos los usuarios (Con paginado por query)
export const getAllCarts = (state,page) => API.get(`/carts/?state=${state}&page=${page}`);
//Trae todo el historial de carts de un usuario (Con paginado por query)
export const getCartsByUser = (userId) => API.get(`/carts/${userId}`);
//Agrega un item al cart activo de un usuario. Ejemplo de body: 
//{"productId":"60a0896ee2e38c2fa0b2fe74","quantity": "5"}
//En caso de ingresarse un productId que ya esté en el cart, se reemplaza la cantidad vieja por la nueva 
//(diganme si prefieren que se sumen)
export const addItem = (product, userId) => API.post(`/carts/${userId}`, product)
//Remueve un producto por completo del cart de un usuario. Ejemplo de body : {"productId": "60a0896ee2e38c2fa0b2fe74"}
export const removeProductFromCart = (product, userId,colorName,sizeName) => API.put(`/carts/remove/${userId}?productId=${product}&colorName=${colorName}&sizeName=${sizeName}`);
//Cambia el estado de un cart de un usuario. Ejemplo de body: {"state": "cancelled"}
export const changeCartState = (state, userId) => API.put(`/carts/${userId}?state=${state}`);
//Decrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede decrementar por debajo de 0
export const decrementProductUnit = (product, userId,colorName,sizeName) => API.put(`/carts/decrement/${userId}?productId=${product}&colorName=${colorName}&sizeName=${sizeName}`);
//Incrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede aumentar por encima del stock
export const incrementProductUnit = (product, userId,colorName,sizeName) => API.put(`/carts/increment/${userId}?productId=${product}&colorName=${colorName}&sizeName=${sizeName}`)
//Trae carro por id de carro
export const getCartsById = (cartId) => API.get(`/carts/id/${cartId}`);




//PRODUCT
export const getAllProducts = (page,custom) => API.get(`/products?page=${page}&custom=${custom}`);
export const searchProducts = (name) => API.get(`/products?keyword=${name}`);
export const detailProduct = (id) => API.get(`/products/detail/${id}`);
export const addProducts = (body) => API.post('/products', body);
export const deleteProduct = (payload) => API.delete(`/products/${payload}`)
export const editProduct = (payload) => API.put(`/products/${payload.id}`, payload.data)
export const editStock = (payload,stock) => API.put(`/products/stock/${payload}`, stock)
export const deleteStock = (payload) => API.delete(`/products/delete/stock/${payload}`)

//USER
export const getUsers = (page) => API.get(`/users?page=${page}`);
export const searchUser = (payload) => API.get(`/users?keyword=${payload}`);
export const getUserById = (id) => API.get(`/users/${id}`);
export const editUser = (payload) => API.put(`/users/${payload.id}`, payload);
export const delUser = (payload) => API.delete(`/users/${payload}`);
export const toggleAdmin = (payload) => API.put(`/users/toggle/${payload}`)
export const editPassword = (id, payload) => API.put(`/users/password/${id}`, payload);

//FILTERS
export const filterByName = (filterName, filter) => API.get(`/products/aaaa/${filterName}?${filterName}=${filter}`) //return await axios.get(`${REACT_APP_API}products/${filterName}?${filterName}=${filter}`)
export const filterByBrand = (filter) => API.get(`/products/filters/?brand=${filter.brand}&size=${filter.size}&genre=${filter.genre}&price=${filter.price}&category=${filter.category}`)
export const filterByCategory = (name) => API.get(`/products/category/${name}`);

//REVIEWS
export const getAllReviews = (page) => API.get(`/reviews?page=${page}`);
export const getReviewsById = (id,page) => API.get(`/reviews/${id}?page=${page}`);
export const addReviews = (body) => API.post(`/reviews`, body);
export const filterReviewsById = (id) => API.get(`/reviews/${id}`)

//CATEGORIES
export const getCategories = (page) => API.get(`/categories?pageNumber=${page}`)
export const searchCategory = (name) => API.get(`/categories?keyword=${name}`);
export const getCategoryById = (payload) => API.get(`/categories/productCategory/${payload}`);
export const addCategory = (payload) => API.post(`/categories`, payload);
export const editCategory = (payload) => API.put(`/categories/${payload.id}`,payload)
export const deleteCategory = (payload) => API.delete(`/categories/${payload}`)

//WHISHLIST
export const getOrCreateWhishlistFromUser = (userId) => API.get(`/whishlists/${userId}`);
export const addProductToWhishlist = (userId, productId) => API.post(`/whishlists/${userId}/${productId}`);
export const removeProducFromWhishlist = (userId, productId) => API.put(`/whishlists/${userId}/${productId}`); 
export const toggleProductFromWhishlist = (userId, productId) => API.put(`/whishlists/toggle/${userId}/${productId}`);
export const isProductInWhishlist = (userId, productId) => API.get(`/whishlists/includes/${userId}/${productId}`);