export const CATEGORIES = [
  { id: 'vitamins', name: 'Vitamins & Supplements', description: 'Daily vitamins, minerals and supplements for immunity, energy and heart health.', icon: 'solar:pills-3-linear', sort_order: 1, is_active: true },
  { id: 'cold-flu', name: 'Cold & Flu', description: 'Relief for cough, fever, blocked nose and sore throat.', icon: 'solar:thermometer-linear', sort_order: 2, is_active: true },
  { id: 'pain-relief', name: 'Pain Relief', description: 'Tablets for headaches, muscle aches, period pain and fever.', icon: 'solar:bandage-linear', sort_order: 3, is_active: true },
  { id: 'skincare', name: 'Skincare', description: 'Moisturisers and sun protection for everyday skin health.', icon: 'solar:sun-2-linear', sort_order: 4, is_active: true },
  { id: 'digestive', name: 'Digestive Health', description: 'Antacids and probiotics for heartburn, indigestion and gut balance.', icon: 'solar:health-linear', sort_order: 5, is_active: true },
  { id: 'first-aid', name: 'First Aid', description: 'Bandages, antiseptics and kits for cuts, scrapes and emergencies.', icon: 'solar:medical-kit-linear', sort_order: 6, is_active: true },
  { id: 'prescription', name: 'Prescription Medicines', description: 'Prescription-only medicines, dispensed after a pharmacist checks your prescription.', icon: 'solar:document-medicine-linear', sort_order: 7, is_active: true },
];

const PRODUCT_SEED = [
  { id: 1, category_id: 'vitamins', name: 'Vitamin C 1000mg', generic_name: 'Ascorbic acid (Vitamin C)', dosage_form: 'Tablet', strength: '1000 mg', pack_size: '120 tablets', price: 1930, compare_at_price: 2580, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85', badge: 'Best Seller', description: 'High-potency Vitamin C with Rose Hips for immune support. Each tablet delivers 1000mg of ascorbic acid to support your immune system, skin health, and antioxidant protection.', details: ['1000mg per tablet', '120 tablets per bottle', 'With Rose Hips', 'Non-GMO', 'Gluten Free'], is_featured: true, is_active: true },
  { id: 2, category_id: 'vitamins', name: 'Omega-3 Fish Oil', generic_name: 'Omega-3 fatty acids (fish oil)', dosage_form: 'Softgel', strength: '1200 mg', pack_size: '90 softgels', price: 2970, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=85', badge: null, description: 'Premium Omega-3 fatty acids from wild-caught fish. Supports heart health, brain function, and joint mobility.', details: ['1200mg per softgel', '90 softgels', 'Wild-caught fish', 'Enteric coated', 'No fishy aftertaste'], is_featured: true, is_active: true },
  { id: 3, category_id: 'cold-flu', name: 'DayQuil Cold & Flu', brand: 'DayQuil', generic_name: 'Acetaminophen (paracetamol) combination', dosage_form: 'Liquid capsule', strength: '325 mg', pack_size: '24 LiquiCaps', price: 1480, compare_at_price: 1800, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=85', badge: 'Sale', description: 'Non-drowsy daytime relief for cold and flu symptoms including fever, cough, sore throat, and nasal congestion.', details: ['24 LiquiCaps', 'Non-drowsy formula', 'Relieves 6 symptoms', 'Acetaminophen 325mg'], is_featured: false, is_active: true },
  { id: 4, category_id: 'pain-relief', name: 'Ibuprofen 200mg', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200 mg', pack_size: '100 coated tablets', price: 1160, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85', badge: 'Top Rated', description: 'Fast-acting pain reliever and fever reducer. Effective for headaches, muscle aches, arthritis, backache, and menstrual cramps.', details: ['200mg per tablet', '100 coated tablets', 'NSAID pain reliever', 'Fever reducer'], is_featured: true, is_active: true },
  { id: 5, category_id: 'skincare', name: 'Hydrating Face Moisturizer', generic_name: 'Hyaluronic acid, SPF 30', dosage_form: 'Cream', strength: null, pack_size: '60 ml', price: 2450, compare_at_price: 3220, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=85', badge: 'New', description: 'Lightweight daily moisturizer with hyaluronic acid and SPF 30. Hydrates, protects, and improves skin texture.', details: ['SPF 30 protection', 'Hyaluronic acid', '2oz / 60ml', 'Fragrance-free', 'Dermatologist tested'], is_featured: false, is_active: true },
  { id: 6, category_id: 'digestive', name: 'Probiotic 50 Billion CFU', generic_name: 'Probiotic blend (20 strains)', dosage_form: 'Capsule', strength: '50 billion CFU', pack_size: '60 capsules', price: 3870, compare_at_price: 4510, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=85', badge: 'Sale', description: 'Advanced probiotic formula with 50 billion CFU and 20 strains to support digestive health and immune function.', details: ['50 Billion CFU', '20 probiotic strains', '60 capsules', 'Shelf stable', 'Delayed release'], is_featured: true, is_active: true },
  { id: 7, category_id: 'first-aid', name: 'First Aid Kit Deluxe', generic_name: null, dosage_form: 'Kit', strength: null, pack_size: '200 pieces', price: 4510, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=85', badge: null, description: '200-piece comprehensive first aid kit for home, car, or travel. Includes bandages, antiseptics, gauze, and more.', details: ['200 pieces', 'Hard case included', 'Contents suited to home, car & travel', 'Ideal for home & travel'], is_featured: true, is_active: true },
  { id: 8, category_id: 'vitamins', name: 'Melatonin 5mg', generic_name: 'Melatonin', dosage_form: 'Tablet', strength: '5 mg', pack_size: '90 tablets', price: 1290, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=85', badge: null, description: 'Melatonin supplement to help you fall asleep faster. Speak to a pharmacist or doctor before using it with other medicines, or if you are pregnant or breastfeeding.', details: ['5mg per tablet', '90 tablets', 'Dietary supplement', 'Vegetarian'], is_featured: false, is_active: true },
  { id: 9, category_id: 'cold-flu', name: 'NyQuil Nighttime Relief', brand: 'NyQuil', generic_name: 'Acetaminophen, dextromethorphan, doxylamine', dosage_form: 'Liquid capsule', strength: null, pack_size: '24 LiquiCaps', price: 1680, compare_at_price: null, stock_qty: 0, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=85', badge: null, description: 'Nighttime cold and flu relief to help you sleep through symptoms. Relieves cough, sore throat, headache, and fever.', details: ['24 LiquiCaps', 'Nighttime formula', 'Relieves 6 symptoms', 'Doxylamine succinate'], is_featured: false, is_active: true },
  { id: 10, category_id: 'skincare', name: 'Sunscreen SPF 50', generic_name: 'Broad-spectrum sunscreen, SPF 50', dosage_form: 'Lotion', strength: null, pack_size: '90 ml tube', price: 2060, compare_at_price: 2580, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=85', badge: 'Sale', description: 'Broad spectrum SPF 50 sunscreen. Water resistant for 80 minutes. Lightweight, non-greasy formula.', details: ['SPF 50', 'Broad spectrum UVA/UVB', 'Water resistant 80 min', '3oz tube'], is_featured: true, is_active: true },
  { id: 11, category_id: 'digestive', name: 'Antacid Chewable Tablets', generic_name: 'Calcium carbonate', dosage_form: 'Chewable tablet', strength: '750 mg', pack_size: '96 tablets', price: 970, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85', badge: null, description: 'Fast-acting antacid for heartburn, acid indigestion, and upset stomach. Calcium carbonate 750mg.', details: ['750mg calcium carbonate', '96 chewable tablets', 'Assorted fruit flavors', 'Fast acting'], is_featured: false, is_active: true },
  { id: 12, category_id: 'first-aid', name: 'Adhesive Bandages 100ct', generic_name: null, dosage_form: 'Bandage', strength: null, pack_size: '100 bandages', price: 900, compare_at_price: null, stock_qty: 50, requires_prescription: false, image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85', badge: 'Best Seller', description: 'Flexible fabric bandages that move with you. Sterile, latex-free, and comfortable for all-day wear.', details: ['100 bandages', 'Assorted sizes', 'Latex-free', 'Sterile', 'Flexible fabric'], is_featured: true, is_active: true },
];

// Remove placeholder inventory from the data exposed to the static catalog.
export const PRODUCTS = PRODUCT_SEED.map(product => {
  const catalogProduct = { ...product };
  delete catalogProduct.stock_qty;
  return catalogProduct;
});

export const PROMOTIONS = [
  { id: 'hero', placement: 'hero', title: 'Explore medicines and health essentials', subtitle: 'Browse product information for everyday health needs.', badge_text: 'Online pharmacy', cta_label: 'Shop now', cta_link: '/shop', icon: 'solar:delivery-linear', theme: 'green', sort_order: 1, is_active: true },
  { id: 'home-vitamins', placement: 'home_card', title: 'Boost your immunity', subtitle: 'Vitamin C, Omega-3 and probiotics to keep you going all season.', badge_text: 'Vitamins', cta_label: 'Shop vitamins', cta_link: '/shop?cat=vitamins', icon: 'solar:shield-plus-linear', theme: 'green', sort_order: 1, is_active: true },
  { id: 'home-payment', placement: 'home_card', title: 'Browse the catalog', subtitle: 'Find medicines and health essentials for your needs.', badge_text: 'Our range', cta_label: 'Start shopping', cta_link: '/shop', icon: 'solar:smartphone-2-linear', theme: 'dark', sort_order: 2, is_active: true },
  { id: 'home-cold-flu', placement: 'home_card', title: 'Cold & flu season essentials', subtitle: 'Explore daytime and nighttime products for cold and flu symptoms.', badge_text: 'Cold & Flu', cta_label: 'Shop cold & flu', cta_link: '/shop?cat=cold-flu', icon: 'solar:thermometer-linear', theme: 'amber', sort_order: 3, is_active: true },
  { id: 'home-skin', placement: 'home_card', title: 'Sun & skin care', subtitle: 'SPF protection and daily moisturisers for healthy skin.', badge_text: 'Skincare', cta_label: 'Shop skincare', cta_link: '/shop?cat=skincare', icon: 'solar:sun-2-linear', theme: 'light', sort_order: 4, is_active: true },
  { id: 'shop-rx', placement: 'shop_banner', title: 'Have a prescription?', subtitle: 'Contact the pharmacy before buying prescription-only medicine.', badge_text: 'Prescriptions', cta_label: 'How it works', cta_link: '/about', icon: 'solar:document-medicine-linear', theme: 'dark', sort_order: 1, is_active: true },
];

export const SERVICES = [
  { id: 'prescriptions', tag: 'Prescriptions', title: 'Prescription information', description: 'Check with a qualified pharmacist about prescription medicines before use.', icon: 'solar:document-medicine-linear', link: '/contact', sort_order: 1, is_active: true },
  { id: 'advice', tag: 'Advice', title: 'Ask a pharmacist', description: 'For questions about a dose or interaction, consult a pharmacist or doctor.', icon: 'solar:chat-round-dots-linear', link: '/contact', sort_order: 2, is_active: true },
  { id: 'delivery', tag: 'Delivery', title: 'Browse from home', description: 'Explore the catalog online and check product details before visiting your pharmacy.', icon: 'solar:delivery-linear', link: '/shop', sort_order: 3, is_active: true },
];

export const FAQS = [
  { id: 1, question: 'How do I pay for my order?', answer: 'This website is a product catalog and does not process orders or payments. Contact the pharmacy directly for availability and purchasing information.', sort_order: 1, is_active: true },
  { id: 2, question: 'Do I need a prescription?', answer: 'Some medicines require a prescription. Check the product information and consult a licensed pharmacist before use.', sort_order: 2, is_active: true },
  { id: 3, question: 'How much is delivery?', answer: 'This website does not arrange delivery. Contact the pharmacy directly to ask about delivery options.', sort_order: 3, is_active: true },
  { id: 4, question: 'How can I find a product?', answer: 'Browse by category or search by product name or active ingredient.', sort_order: 4, is_active: true },
  { id: 5, question: 'Can I ask a pharmacist a question before buying?', answer: 'Yes. Use the contact details shown on this website to speak with a qualified pharmacist.', sort_order: 5, is_active: true },
  { id: 6, question: 'Is this website medical advice?', answer: 'No. Website information is not a substitute for professional medical advice. In an emergency, go to the nearest hospital.', sort_order: 6, is_active: true },
];

export const TEAM = [];

export const SETTINGS = {
  brand_name: 'MediCare',
  tagline: 'Trusted health information.',
  hero_title: 'Explore medicines and health essentials.',
  hero_subtitle: 'Browse vitamins, cold & flu, pain relief, skincare and first aid. Contact the pharmacy for availability and purchasing information.',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  opening_hours: '',
  ppb_license: '',
  about_title: 'Pharmacy care you can learn about from home.',
  about_intro: 'Browse health products and medicines. Contact the pharmacy with questions about availability and safe use.',
  about_mission_title: 'Clear information for everyday healthcare shopping.',
  about_mission_body: 'Product descriptions are for general information and are not a substitute for advice from a qualified healthcare professional.',
  about_points: ['Browse medicines and health essentials by category', 'Check product details and active ingredients', 'Consult a pharmacist about medicines before use'],
  about_stats: [],
};
