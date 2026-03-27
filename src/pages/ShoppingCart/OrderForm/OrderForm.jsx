import { FormProvider, useForm } from 'react-hook-form';
import { useUserStore } from '../../Profile/useUserStore';
import { ChangeAddress } from '../../Profile/components/ChangeAddress';
import { ChangeFullname } from '../../Profile/components/ChangeFullname';
import { ChangeMessanger } from '../../Profile/components/ChangeMessanger';
import { ChangeEmailAndPhone } from '../../Profile/components/ChangeEmailAndPhone';

import styles from './OrderForm.module.css';
import { useState } from 'react';

export const OrderForm = ({ products = [] }) => {
    const user = useUserStore((state) => state.user);

    const methods = useForm({
        defaultValues: {
            surname: user.surname,
            name: user.name,
            patronomic: user.patronomic,
            email: user.email,
            number: user.number,
            social_link: user.social_link,
            region: user?.address?.region,
            city: user?.address?.city,
            street: user?.address?.street,
            house: user?.address?.house,
            entrance: user?.address?.entrance,
            apartment: user?.address?.apartment,
            postscode: user?.address?.postcode,
        },
    });
    const { handleSubmit } = methods;

    const rusPost =
        '/src/assets/icons/svg/mailRussiaIcon.svg';
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
    const [deliveryMethod, setDeliveryMethod] = useState(
        availableMethodsDelivery[0],
    );

    const submit = (data) => {
        if (products.length) {
            data.products = products;

            alert(JSON.stringify(data));
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
                                        (
                                        {
                                            method.availabilityOfFitting
                                        }
                                        )
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
                    Подтвердить заказ
                </button>
            </form>
        </FormProvider>
    );
};
