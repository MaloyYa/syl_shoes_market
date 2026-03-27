import { FormProvider, useForm } from 'react-hook-form';
import styles from './Profile.module.css';
import { useUserStore } from './useUserStore';
import { ChangeFullname } from './components/ChangeFullname';
import { ChangePassword } from './components/ChangePassword';
import { ChangeAddress } from './components/ChangeAddress';
import { ChangeContact } from './components/ChangeContact';
import { ExitIcon } from '../../components/ui/ExitIcon';
export const Profile = () => {
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

    const submit = (data, event) => {
        event.preventDefault();
        alert(JSON.stringify(data));
    };
    const handleExitButton = () => {
        alert('exit');
    };
    return (
        <main className={styles.main}>
            <button
                className={styles.btnExitProfile}
                onClick={handleExitButton}>
                <span className={styles.exitProfileText}>
                    Выйти
                </span>
                <ExitIcon
                    size={24}
                    fill="red"
                />
            </button>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(submit)}
                    className={styles.profileForm}>
                    <ChangeFullname
                        titleSection={'Личные данные'}
                    />
                    <ChangePassword />
                    <div
                        className={
                            styles.addressAndContactData
                        }>
                        <h3 className={styles.categoryInfo}>
                            Адрес доставки и контакты
                        </h3>

                        <div
                            className={
                                styles.wrapperAddAndCont
                            }>
                            <ChangeAddress />
                            <ChangeContact />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}>
                        Сохранить изменения
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};
