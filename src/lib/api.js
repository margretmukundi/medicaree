import { CATEGORIES, FAQS, PRODUCTS, PROMOTIONS, SERVICES, SETTINGS, TEAM } from '../data/store';

export const getCategories = async () => CATEGORIES.filter(item => item.is_active);
export const getProducts = async () => PRODUCTS.filter(item => item.is_active);
export const getProduct = async id => PRODUCTS.find(item => item.id === Number(id) && item.is_active) || null;
export const getPromotions = async placement => PROMOTIONS.filter(item => item.placement === placement && item.is_active);
export const getServices = async () => SERVICES.filter(item => item.is_active);
export const getFaqs = async () => FAQS.filter(item => item.is_active);
export const getTeam = async () => TEAM;
export const getSettings = async () => ({ ...SETTINGS });

export async function submitContact(message) {
  if (!SETTINGS.email) throw new Error('Contact email is not configured yet.');
  const subject = encodeURIComponent(message.topic || 'Website enquiry');
  const body = encodeURIComponent(`${message.message}\n\nFrom: ${message.name}\nReply to: ${message.email || message.phone || ''}`);
  window.location.href = `mailto:${SETTINGS.email}?subject=${subject}&body=${body}`;
  return true;
}
