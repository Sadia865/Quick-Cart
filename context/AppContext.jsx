'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY || '$';
    const router = useRouter();
    const { getToken } = useAuth();
    const { user } = useUser();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // ── Fetch all products ──────────────────────────────
    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product');
            if (data.success) setProducts(data.products);
        } catch (error) {
            console.error('Failed to fetch products:', error.message);
        }
    };

    // ── Fetch user data ─────────────────────────────────
    const fetchUserData = async () => {
        try {
            // Check if seller
            if (user?.publicMetadata?.role === 'seller') {
                setIsSeller(true);
            }

            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
            }
            // 404 = user not synced yet from Clerk webhook, that's ok
        } catch (error) {
            // Silently fail - user will be created when webhook fires
            console.log('User data not available yet');
        }
    };

    // ── Add to cart ─────────────────────────────────────
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
        toast.success('Added to cart!', { icon: '🛒' });

        if (user) {
            try {
                const token = await getToken();
                await axios.post('/api/user/update-cart',
                    { cartItems: cartData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Cart sync failed:', error.message);
            }
        }
    };

    // ── Update cart quantity ────────────────────────────
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);

        if (user) {
            try {
                const token = await getToken();
                await axios.post('/api/user/update-cart',
                    { cartItems: cartData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Cart sync failed:', error.message);
            }
        }
    };

    // ── Cart helpers ────────────────────────────────────
    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0);
    };

    const getCartAmount = () => {
        let total = 0;
        for (const id in cartItems) {
            const product = products.find(p => p._id === id);
            if (product && cartItems[id] > 0) {
                total += product.offerPrice * cartItems[id];
            }
        }
        return Math.floor(total * 100) / 100;
    };

    // ── Effects ─────────────────────────────────────────
    useEffect(() => { fetchProductData(); }, []);
    useEffect(() => { if (user) fetchUserData(); }, [user]);

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        getToken, user,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};