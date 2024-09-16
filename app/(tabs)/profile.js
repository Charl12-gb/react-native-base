import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../../src/redux/utils/hooks';
import { useGetAuthUserQuery, useLogoutMutation } from '../../src/redux/features/auth/authService';

export default function ProfileScreen() {
    const { isFetching, refetch } = useGetAuthUserQuery()
    const [logout, { isLoading }] = useLogoutMutation()

    const user = useAppSelector(state => state.auth.user)

    if (isFetching) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator color={"#000"} size={50} />
                <Text>
                    Veuillez patienter ...
                </Text>
            </View>
        );
    }

    return (
        <View>
            {user?.role === 'Member' ? (
                <Text>
                    {user?.first_name} ({user?.last_name})
                </Text>
            ) : (
                <Text>
                    {user?.first_name} {user?.last_name}
                </Text>
            )}
            <TouchableOpacity
                disabled={isLoading}
                onPress={() => logout()}>
                {isLoading && <ActivityIndicator color={'white'} size={20} />}
                <Text>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}
