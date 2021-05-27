import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors'


const styles = StyleSheet.create({
    inputContainer: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headerText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        color: Colors.light.background,
    },
    mainInput: {
        height: 40,
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 14,
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 0,
        color: Colors.light.background,
        backgroundColor: Colors.light.gray,
    },
    button: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    scanButton: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: '#30303b',
        borderRadius: 30,
        width: 185,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonText: {
        paddingHorizontal: 33,
        paddingVertical: 10,
        color: Colors.light.gray,
        textTransform: 'uppercase',
        fontSize: 16,
    }
});

export default styles;