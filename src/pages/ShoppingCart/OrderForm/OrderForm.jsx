import { FormProvider, useForm } from 'react-hook-form';

import { ChangeAddress } from '../../Profile/components/ChangeAddress';
import { ChangeFullname } from '../../Profile/components/ChangeFullname';
import { ChangeMessanger } from '../../Profile/components/ChangeMessanger';
import { ChangeEmailAndPhone } from '../../Profile/components/ChangeEmailAndPhone';

import styles from './OrderForm.module.css';
import { useState } from 'react';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { orderService } from '../../../service/orderService';
import { userService } from '../../../service/userService';
import { useShoppingCartStore } from '../store/useShoppingCartStore';

const rusPost = '/src/assets/icons/svg/mailRussiaIcon.svg';
const sdekPost = '/src/assets/icons/svg/sdekIcon.svg';
const availableMethodsDelivery = [
    {
        icon: rusPost,
        alt: 'Почта России',
        description: 'Почта России',
        availabilityOfFitting: 'без примерки',
        price: 620,
    },
    {
        icon: sdekPost,
        alt: 'СДЭК',
        description: 'СДЭК курьер до двери',
        availabilityOfFitting: 'Есть примерка',
        price: 440,
    },
    {
        icon: sdekPost,
        alt: 'СДЭК',
        description: 'СДЭК Пункт выдачи заказов',
        availabilityOfFitting: 'Есть примерка',
        price: 300,
    },
];

const getDataFromData = (data) => {
    const {
        region,
        city,
        street,
        house,
        entrance,
        apartment,
        postcode,
    } = data;

    return {
        region,
        city,
        street,
        house,
        entrance,
        apartment,
        postcode,
    };
};

export const OrderForm = ({
    createNotification,
    isLoading,
    setLoading,
    setShoppingCartData,
}) => {
    const user = useAuthStore((state) => state.user);
    const addressId = user?.addresses?.[0]?.id || '';

    const methods = useForm({
        defaultValues: {
            surname: user?.surname || '',
            name: user?.name || '',
            patronymic: user.patronymic,
            email: user.email || '',
            phone: user.phone || '',
            social_link: user.social_link || '',
            region: user?.addresses[0]?.region || '',
            city: user?.addresses[0]?.city || '',
            street: user?.addresses[0]?.street || '',
            house: user?.addresses[0]?.house || '',
            entrance: user?.addresses[0]?.entrance || '',
            apartment: user?.addresses[0]?.apartment || '',
            postcode: user?.addresses[0]?.postcode || '',
        },
    });
    const { handleSubmit } = methods;

    const [deliveryMethod, setDeliveryMethod] = useState(
        availableMethodsDelivery[0],
    );

    const submit = async (data) => {
        try {
            setLoading(true);
            let targetAddressId = addressId;

            if (addressId === '') {
                const address = getDataFromData(data);
                const newAddress =
                    await userService.createAddress(
                        address,
                    );
                useAuthStore
                    .getState()
                    .setNewAddress(newAddress);
                targetAddressId = newAddress.id;
            }

            const { success, id } =
                await orderService.createOrderFromShoppingCart(
                    targetAddressId,
                );
            setLoading(false);
            if (success) {
                createNotification(
                    true,
                    `Заказ ${id} успешно создан`,
                );
                setTimeout(() => {
                    setShoppingCartData([]);
                    useShoppingCartStore
                        .getState()
                        .setShoppingCartData({
                            items: [],
                            total_amount: 0,
                        });
                }, 2000);
            } else {
                createNotification(
                    false,
                    'Произошла ошибка при создании заказа',
                );
            }
        } catch {
            createNotification(
                false,
                'Произошла ошибка при создании заказа',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(submit)}
                className={styles.orderForm}>
                <div className={styles.formItem}>
                    <ChangeFullname />
                    <ChangeEmailAndPhone />
                </div>

                <div className={styles.formItem}>
                    <ChangeAddress />
                </div>

                <div className={styles.tableDelivery}>
                    <div className={styles.headTable}>
                        <div className={styles.columnTitle}>
                            Способ доставки
                        </div>
                        <div className={styles.columnTitle}>
                            Описание
                        </div>
                        <div className={styles.columnTitle}>
                            Стоимость
                        </div>
                    </div>
                    {availableMethodsDelivery.map(
                        (method, index) => (
                            <div
                                onClick={() =>
                                    setDeliveryMethod(
                                        method,
                                    )
                                }
                                className={`${
                                    styles.rowData
                                } ${
                                    method.description ===
                                        deliveryMethod.description &&
                                    styles.selectRowData
                                }`}
                                key={index}>
                                <div
                                    className={
                                        styles.selectDelivery
                                    }>
                                    <label
                                        className={
                                            styles.checkboxContainer
                                        }>
                                        <input
                                            type="checkbox"
                                            name="deliveryMethod"
                                            className={
                                                styles.inputCheckbox
                                            }
                                            value={
                                                method.description
                                            }
                                            checked={
                                                method.description ===
                                                deliveryMethod.description
                                            }
                                            onChange={() =>
                                                setDeliveryMethod(
                                                    method,
                                                )
                                            }
                                        />
                                        <img
                                            src={
                                                method.icon
                                            }
                                            alt={method.alt}
                                            className={
                                                styles.methodImg
                                            }
                                        />
                                    </label>
                                </div>
                                <div
                                    className={
                                        styles.descriptionBlock
                                    }>
                                    <p
                                        className={
                                            styles.description
                                        }>
                                        {method.description}
                                    </p>
                                    <p
                                        className={
                                            styles.availabilityOfFitting
                                        }>
                                        {
                                            method.availabilityOfFitting
                                        }
                                    </p>
                                </div>
                                <div
                                    className={
                                        styles.priceBlock
                                    }>
                                    {method.price} ₽
                                </div>
                                <div />
                            </div>
                        ),
                    )}
                </div>

                <ChangeMessanger />

                <button
                    type="submit"
                    className={styles.btnSubmitOrder}>
                    {isLoading
                        ? 'Создаем заказ...'
                        : 'Оформить заказ'}
                </button>
            </form>
        </FormProvider>
    );
};
