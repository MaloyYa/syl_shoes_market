import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useShoppingCartStore = create(
    devtools(
        persist(
            (set) => ({
                shoppingCartData: null,

                setShoppingCartData: (
                    newShoppingCartData,
                ) => {
                    set({
                        shoppingCartData:
                            newShoppingCartData,
                    });
                },

                addToCart: (product) => {
                    set((state) => {
                        const indexItem =
                            state.shoppingCartData.items.findIndex(
                                (item) =>
                                    item.product_id ===
                                    product.id,
                            );
                        if (indexItem === -1) {
                            const total_amount =
                                state.shoppingCartData.items.reduce(
                                    (acc, current) => {
                                        const {
                                            quantity,
                                            price,
                                        } = current;
                                        return (
                                            acc +
                                            quantity * price
                                        );
                                    },
                                    0,
                                );
                            return {
                                shoppingCartData: {
                                    ...state.shoppingCartData,
                                    items: [
                                        ...state
                                            .shoppingCartData
                                            .items,
                                        product,
                                    ],
                                    total_amount:
                                        total_amount +
                                        product.price,
                                },
                            };
                        } else {
                            const copyArr = [
                                ...state.shoppingCartData
                                    .items,
                            ];

                            const newItem = {
                                ...copyArr[indexItem],
                            };
                            copyArr[indexItem] = {
                                ...copyArr[indexItem],
                                quantity:
                                    newItem.quantity + 1,
                            };

                            const total_amount =
                                copyArr.reduce(
                                    (acc, current) => {
                                        const {
                                            quantity,
                                            price,
                                        } = current;
                                        return (
                                            acc +
                                            quantity * price
                                        );
                                    },
                                    0,
                                );

                            return {
                                shoppingCartData: {
                                    ...state.shoppingCartData,
                                    items: [...copyArr],
                                    total_amount,
                                },
                            };
                        }
                    });
                },

                increaseProduct: (productId) => {
                    set((state) => {
                        console.log(productId);
                        const index =
                            state.shoppingCartData.items.findIndex(
                                (item) =>
                                    item.product_id ===
                                    productId,
                            );

                        if (index !== -1) {
                            const updatedItems =
                                state.shoppingCartData.items.map(
                                    (item, idx) => {
                                        if (idx === index) {
                                            return {
                                                ...item,
                                                quantity:
                                                    (item.quantity ||
                                                        1) +
                                                    1,
                                            };
                                        }
                                        return item;
                                    },
                                );
                            const total_amount =
                                updatedItems.reduce(
                                    (
                                        accumulator,
                                        current,
                                    ) => {
                                        const {
                                            quantity,
                                            price,
                                        } = current;
                                        return (
                                            accumulator +
                                            quantity * price
                                        );
                                    },
                                    0,
                                );

                            return {
                                shoppingCartData: {
                                    ...state.shoppingCartData,
                                    items: updatedItems,
                                    total_amount,
                                },
                            };
                        }

                        return state;
                    });
                },

                decreaseProduct: (productId) => {
                    set((state) => {
                        const updatedItems =
                            state.shoppingCartData.items.map(
                                (item) => {
                                    if (
                                        item.product_id ===
                                        productId
                                    ) {
                                        const newQty =
                                            (item.quantity ||
                                                1) - 1;

                                        return {
                                            ...item,
                                            quantity:
                                                newQty > 0
                                                    ? newQty
                                                    : 1,
                                        };
                                    }
                                    return item;
                                },
                            );
                        const total_amount =
                            updatedItems.reduce(
                                (accumulator, current) => {
                                    const {
                                        quantity,
                                        price,
                                    } = current;
                                    return (
                                        accumulator +
                                        quantity * price
                                    );
                                },
                                0,
                            );

                        return {
                            shoppingCartData: {
                                ...state.shoppingCartData,
                                items: updatedItems,
                                total_amount,
                            },
                        };
                    });
                },

                deleteProduct: (id) => {
                    set((state) => {
                        if (
                            !state?.shoppingCartData?.items
                        ) {
                            return state;
                        }
                        const indexItem =
                            state.shoppingCartData.items.findIndex(
                                (item) => item.id === id,
                            );

                        if (indexItem !== -1) {
                            const copyArr =
                                state.shoppingCartData.items.filter(
                                    (_, index) =>
                                        index !== indexItem,
                                );
                            const total_amount =
                                copyArr.reduce(
                                    (acc, current) => {
                                        const {
                                            quantity,
                                            price,
                                        } = current;
                                        return (
                                            acc +
                                            quantity * price
                                        );
                                    },
                                    0,
                                );
                            return {
                                shoppingCartData: {
                                    ...state.shoppingCartData,
                                    items: copyArr,
                                    total_amount,
                                },
                            };
                        }
                    });
                },
            }),
            { name: 'shoppingCart-store' },
        ),
    ),
);
