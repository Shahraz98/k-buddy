import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors'


const styles = StyleSheet.create({
container: {
    width: '100%',
    marginBottom: 'auto',
    marginTop: 20,
},
headerText: {
    marginLeft: 'auto',
    marginTop: 30,
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#30303b',
},
filterRow: {
    marginLeft: 'auto',
    marginTop: 24,
    marginRight: 'auto',
    height: 40,
    width: 200,
},
filterText: {
    marginLeft: 'auto',
    paddingTop: 5,
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.gray,
}

});

export default styles;