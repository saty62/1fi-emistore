import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedProducts = [
  {
    slug: 'iphone-17-pro',
    name: 'Apple iPhone 17 Pro',
    brand: 'Apple',
    description:
      'Forged in aerospace-grade titanium with the next-generation A19 Pro chip, pro camera system with 48MP lenses across all cameras, and up to 60 months of flexible mutual-fund-backed EMI financing.',
    category: 'smartphones',
    mrp: 134900,
    basePrice: 127400,
    isNew: true,
    variants: [
      {
        color: 'Silver',
        colorCode: '#E3E4E5',
        storage: '256GB',
        mrp: 134900,
        price: 127400,
        imageUrl: '/images/iphone-17-pro-silver.svg',
        available: true,
      },
      {
        color: 'Cosmic Orange',
        colorCode: '#E86A38',
        storage: '256GB',
        mrp: 134900,
        price: 127400,
        imageUrl: '/images/iphone-17-pro-orange.svg',
        available: true,
      },
      {
        color: 'Silver',
        colorCode: '#E3E4E5',
        storage: '512GB',
        mrp: 154900,
        price: 147400,
        imageUrl: '/images/iphone-17-pro-silver.svg',
        available: true,
      },
      {
        color: 'Cosmic Orange',
        colorCode: '#E86A38',
        storage: '512GB',
        mrp: 154900,
        price: 147400,
        imageUrl: '/images/iphone-17-pro-orange.svg',
        available: true,
      },
    ],
    emiPlans: [
      {
        tenureMonths: 3,
        monthlyAmount: 44967,
        interestRate: 0.0,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 6,
        monthlyAmount: 22483,
        interestRate: 0.0,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: true,
      },
      {
        tenureMonths: 12,
        monthlyAmount: 11242,
        interestRate: 0.0,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 24,
        monthlyAmount: 5621,
        interestRate: 0.0,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 36,
        monthlyAmount: 4297,
        interestRate: 10.5,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 48,
        monthlyAmount: 3385,
        interestRate: 10.5,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 60,
        monthlyAmount: 2842,
        interestRate: 10.5,
        cashbackAmount: 7500,
        processingFee: 0,
        isPopular: false,
      },
    ],
  },
  {
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    description:
      'Galaxy AI flagship crafted with Titanium shield, Corning Gorilla Armor, integrated S Pen stylus, and quad-telephoto optical zoom system.',
    category: 'smartphones',
    mrp: 139999,
    basePrice: 129999,
    isNew: true,
    variants: [
      {
        color: 'Titanium Black',
        colorCode: '#2B2B2A',
        storage: '256GB',
        mrp: 139999,
        price: 129999,
        imageUrl: '/images/samsung-s24-ultra-black.svg',
        available: true,
      },
      {
        color: 'Titanium Gray',
        colorCode: '#7B7B78',
        storage: '256GB',
        mrp: 139999,
        price: 129999,
        imageUrl: '/images/samsung-s24-ultra-gray.svg',
        available: true,
      },
      {
        color: 'Titanium Black',
        colorCode: '#2B2B2A',
        storage: '512GB',
        mrp: 149999,
        price: 139999,
        imageUrl: '/images/samsung-s24-ultra-black.svg',
        available: true,
      },
      {
        color: 'Titanium Violet',
        colorCode: '#58546A',
        storage: '512GB',
        mrp: 149999,
        price: 139999,
        imageUrl: '/images/samsung-s24-ultra-violet.svg',
        available: true,
      },
    ],
    emiPlans: [
      {
        tenureMonths: 3,
        monthlyAmount: 43333,
        interestRate: 0.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 6,
        monthlyAmount: 21667,
        interestRate: 0.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: true,
      },
      {
        tenureMonths: 12,
        monthlyAmount: 10833,
        interestRate: 0.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 24,
        monthlyAmount: 5417,
        interestRate: 0.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 36,
        monthlyAmount: 4285,
        interestRate: 11.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 48,
        monthlyAmount: 3354,
        interestRate: 11.0,
        cashbackAmount: 6000,
        processingFee: 0,
        isPopular: false,
      },
    ],
  },
  {
    slug: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    description:
      'Engineered with Google Tensor G4 for advanced Gemini AI, 50MP triple rear camera system, and ultra-bright Super Actua OLED display.',
    category: 'smartphones',
    mrp: 119999,
    basePrice: 109999,
    isNew: true,
    variants: [
      {
        color: 'Obsidian',
        colorCode: '#2D2E30',
        storage: '256GB',
        mrp: 119999,
        price: 109999,
        imageUrl: '/images/google-pixel-9-pro-obsidian.svg',
        available: true,
      },
      {
        color: 'Porcelain',
        colorCode: '#F0EFEA',
        storage: '256GB',
        mrp: 119999,
        price: 109999,
        imageUrl: '/images/google-pixel-9-pro-porcelain.svg',
        available: true,
      },
      {
        color: 'Obsidian',
        colorCode: '#2D2E30',
        storage: '512GB',
        mrp: 132999,
        price: 121999,
        imageUrl: '/images/google-pixel-9-pro-obsidian.svg',
        available: true,
      },
      {
        color: 'Hazel',
        colorCode: '#8E968E',
        storage: '512GB',
        mrp: 132999,
        price: 121999,
        imageUrl: '/images/google-pixel-9-pro-hazel.svg',
        available: true,
      },
    ],
    emiPlans: [
      {
        tenureMonths: 3,
        monthlyAmount: 36666,
        interestRate: 0.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 6,
        monthlyAmount: 18333,
        interestRate: 0.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: true,
      },
      {
        tenureMonths: 12,
        monthlyAmount: 9167,
        interestRate: 0.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 24,
        monthlyAmount: 4583,
        interestRate: 0.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 36,
        monthlyAmount: 3550,
        interestRate: 10.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: false,
      },
      {
        tenureMonths: 48,
        monthlyAmount: 2790,
        interestRate: 10.0,
        cashbackAmount: 5000,
        processingFee: 0,
        isPopular: false,
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data in reverse order of foreign keys
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('Cleared existing products, variants, and EMI plans.');

  for (const productData of seedProducts) {
    const { variants, emiPlans, ...productFields } = productData;

    const createdProduct = await prisma.product.create({
      data: {
        ...productFields,
        variants: {
          create: variants,
        },
        emiPlans: {
          create: emiPlans,
        },
      },
      include: {
        variants: true,
        emiPlans: true,
      },
    });

    console.log(
      ` Created ${createdProduct.name} with ${createdProduct.variants.length} variants and ${createdProduct.emiPlans.length} EMI plans.`
    );
  }

  console.log(' Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
