import { Heading, HStack, IconButton, IIconButtonProps, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }: HeaderProps) {
    const { colors } = useTheme();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

  return (
    <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pb={6}
        pt={12}
        px={6}
        {...rest}
    >
        <IconButton
            icon={<CaretLeft color={colors.gray[200]} size={24} />}
            onPress={handleGoBack}
        />

        <Heading color='gray.100' textAlign='center' fontSize='lg' flex={1} mr={6}>
            {title}
        </Heading>
    </HStack>
  );
}