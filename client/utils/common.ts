export const formatPrice = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const capitalize = (text: string) => text && text[0].toUpperCase() + text.slice(1)
