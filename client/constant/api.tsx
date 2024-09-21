export const api = {
  URL: process.env.NEXT_PUBLIC_API_URL
}

export const endPoint = {
  DISH_DETAIL: `${api.URL}/dish`,
  ORDER: `${api.URL}/order`,
  CREATE_ORDER: `${api.URL}/order/create`,
  UPDATE_ORDER: `${api.URL}/order/update`,
  DELETE_ORDER: `${api.URL}/order/delete`,
  RESTAURANT_DETAIL: `${api.URL}/restaurant`,
  ROOM: `${api.URL}/room`,
  SIGN_UP: `${api.URL}/auth/guest/sign-up`
}