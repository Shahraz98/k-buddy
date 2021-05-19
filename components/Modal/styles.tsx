import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
container: {
    width:'100%',
    height: 600,
    flexDirection: 'row',
    backgroundColor: '#F3F3F4',
    borderRadius: 30,
},
headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
},
headerText: {
marginLeft: 'auto',
marginRight: 'auto',
fontSize: 24,
marginTop: 10,
marginBottom: 10,
color: '#30303b',
},
inputContainer: {
    marginLeft: 15,
},
itemInput: {
    height: 50,
    width: 325,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 14,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: 'white',
},
dateInput: {
width: 200,
marginLeft: 'auto',
marginRight: 'auto',
marginTop: 10,
borderRadius: 15,
borderColor: '#67D89A',
backgroundColor: 'white',
},
button: {
    marginVertical: 20,
    backgroundColor: '#30303b',
    borderRadius: 30,
    width: 170,
    marginRight: 'auto',
    marginLeft: 'auto',
},
buttonText: {
    paddingHorizontal: 34,
    paddingVertical: 10,
    color: 'white',
    fontSize: 16,
},

});

export default styles;