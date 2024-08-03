export const api = {
  URL: process.env.NEXT_PUBLIC_API_URL
}

export const endPoint = {
  DISH_DETAIL: `${api.URL}/dish`,
  ORDER: `${api.URL}/order`,
  RESTAURANT_DETAIL: `${api.URL}/restaurant`,
  ROOM: `${api.URL}/room`
}