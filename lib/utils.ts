import { clsx, type ClassValue } from 'clsx'
export function cn(...inputs: ClassValue[]) { return clsx(inputs) }
export const WHATSAPP_NUMBER = '233547981348'
export const WHATSAPP_LINK = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/JZ3GzucwCml0yTb2P7TeTr?s=cl&p=i&ilr=2&amv=0'
export const WHATSAPP_DISPLAY = '+233 547 981 348'
