import { useFormik } from 'formik';
import React from 'react';
import { TouchableOpacity, TextInput, View, Image, Text, ActivityIndicator } from 'react-native';
import { validate } from '../../src/formValidation/login';
import { useAppDispatch } from '../../src/redux/utils/hooks';
import { useLoginMutation } from '../../src/redux/features/auth/authService';
import { setMessage } from '../../src/redux/features/alert/alertSlice';

const LoginScreen = () => {

    const dispatch = useAppDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email_or_phone: 'admin@admin.com',
            password: 'password'
        },
        onSubmit: values => {
            handleSubmit(values)
        },
        validate: validate,
        validateOnChange: false
    })

    const handleSubmit = async (values) => {
        const data = {
            email_or_phone: values.email_or_phone,
            password: values.password
        }
        let res = await login(data)
        console.log(res)
        if (res.data) {
            let name = ''
            if(res.data?.role == 'Member') name = `${res.data?.user?.last_name} (${res.data?.user?.first_name})`
            else name = `${res.data?.user?.last_name} ${res.data?.user?.first_name}`
            dispatch(setMessage({ type: 'success', message: 'Bienvenue ' + name }))
        }

    }

    return (
        <View className='flex-1 justify-center items-center'>
            <Text>Bienvenue sur event</Text>
            <Text>
            Naviguez à travers nos catégories pour trouver rapidement ce dont vous avez besoin.
            </Text>
            <View>
                <View>
                    <TextInput
                        onChangeText={formik.handleChange('email_or_phone')}
                        value={formik.values.email_or_phone}
                        error={!!formik.errors.email_or_phone}
                        errorText={formik.errors.email_or_phone}
                        placeholder="Téléphone"
                        isSecure={false}
                    />
                    <TextInput
                        onChangeText={formik.handleChange('password')}
                        value={formik.values.password}
                        error={!!formik.errors.password}
                        errorText={formik.errors.password}
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                    />
                    <TouchableOpacity
                        onPress={formik.handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading && <ActivityIndicator color={'red'} size={20} />}
                        <Text >Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;