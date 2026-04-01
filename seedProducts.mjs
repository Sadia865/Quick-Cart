// seedProducts.mjs
// Run with: node seedProducts.mjs

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    price: Number,
    offerPrice: Number,
    image: Array,
    category: String,
    date: Number,
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const products = [
    {
        userId: "admin",
        name: "Apple AirPods Pro 2nd gen",
        description: "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
        price: 499.99,
        offerPrice: 399.99,
        image: [
            "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp",
            "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/j212frakb8hdrhvhajhg.webp",
            "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/imwuugqxsajuwqpkegb5.webp",
            "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k1oqaslw5tb3ebw01vvj.webp"
        ],
        category: "Earphone",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Bose QuietComfort 45",
        description: "The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment.",
        price: 429.99,
        offerPrice: 329.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp"],
        category: "Headphone",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Samsung Galaxy S23",
        description: "The Samsung Galaxy S23 offers an all-encompassing mobile experience with its advanced AMOLED display, offering vibrant visuals and smooth interactions. With powerful hardware, a sleek design, and long battery life, the S23 is perfect for those who demand the best.",
        price: 899.99,
        offerPrice: 799.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp"],
        category: "Smartphone",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Garmin Venu 2",
        description: "The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design, offering heart rate monitoring, GPS, and sleep tracking. Built with a 24-hour battery life, this watch is ideal for fitness enthusiasts.",
        price: 399.99,
        offerPrice: 349.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp"],
        category: "Accessories",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "PlayStation 5",
        description: "The PlayStation 5 takes gaming to the next level with ultra-HD graphics, a powerful 825GB SSD, and ray tracing technology for realistic visuals. Fast loading times, seamless gameplay, and stunning visuals make it a must-have for any serious gamer.",
        price: 599.99,
        offerPrice: 499.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp"],
        category: "Accessories",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Canon EOS R5",
        description: "The Canon EOS R5 is a game-changing mirrorless camera with a 45MP full-frame sensor, offering ultra-high resolution and the ability to shoot 8K video. With advanced autofocus and in-body stabilization, the R5 is ideal for photographers and videographers alike.",
        price: 4199.99,
        offerPrice: 3899.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp"],
        category: "Camera",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "MacBook Pro 16",
        description: "The MacBook Pro 16, powered by Apple's M2 Pro chip, offers outstanding performance with 16GB RAM and a 512GB SSD. It features a stunning Retina display with True Tone technology, making it a top choice for professionals in creative industries.",
        price: 2799.99,
        offerPrice: 2499.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp"],
        category: "Laptop",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Sony WF-1000XM5",
        description: "Sony WF-1000XM5 true wireless earbuds deliver immersive sound with Hi-Res Audio and advanced noise cancellation technology. Designed for comfort and quality, they provide a stable snug fit for a secure listening experience.",
        price: 349.99,
        offerPrice: 299.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/e3zjaupyumdkladmytke.webp"],
        category: "Earphone",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "Samsung Projector 4K",
        description: "The Samsung 4K Projector offers an immersive cinematic experience with ultra-high-definition visuals and realistic color accuracy. Perfect for movie nights, gaming, or presentations.",
        price: 1699.99,
        offerPrice: 1499.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp"],
        category: "Accessories",
        date: Date.now(),
    },
    {
        userId: "admin",
        name: "ASUS ROG Zephyrus G16",
        description: "The ASUS ROG Zephyrus G16 gaming laptop is powered by Intel Core i9 and features an RTX 4070 GPU. With 16GB RAM and a 1TB SSD, this laptop is designed for gamers who demand extreme power, speed, and storage.",
        price: 2199.99,
        offerPrice: 1999.99,
        image: ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/wig1urqgnkeyp4t2rtso.webp"],
        category: "Laptop",
        date: Date.now(),
    },
];

const seed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "quickcart" });
        console.log("✅ Connected!");

        console.log("Clearing existing products...");
        await Product.deleteMany({});

        console.log("Inserting 10 products...");
        await Product.insertMany(products);

        console.log("✅ 10 products seeded successfully!");
        console.log("Products added:");
        products.forEach((p, i) => console.log(`  ${i + 1}. ${p.name} — $${p.offerPrice}`));

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

seed();
