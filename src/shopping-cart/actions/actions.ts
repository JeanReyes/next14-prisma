import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = (): {[id: string]: number} => {

  if(hasCookie('cart')) {
    const cookiesCart = JSON.parse(getCookie('cart') as string ?? '{}') 
    return cookiesCart;
  }

  return {}
}

export const addProduct = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id]
  setCookie("cart", JSON.stringify(cookieCart));
}

export const removeSingleProductCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (Number(cookieCart[id])) {
    cookieCart[id] = cookieCart[id] - 1;
  } else {
    delete cookieCart[id];
  }

  setCookie("cart", JSON.stringify(cookieCart));
}