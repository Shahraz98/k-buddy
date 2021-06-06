import {StyleSheet} from 'react-native';
import Colors from './Colors';


const mystyle = StyleSheet.create({
    centered: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    bigText: {
        fontSize: Colors.light.bigText
    },
    stnText: {
        fontSize: Colors.light.stnText
    },
    smText: {
        fontSize: Colors.light.smText
    },
    xsText: {
        fontSize: Colors.light.xsText
    },
    coloredText: {
        color: Colors.light.tint
    },
    secondaryColored: {
        color: Colors.light.tsecondary
    },
    blackText: {
        color: Colors.light.gray
    },
    secondaryBlack: {
        color: Colors.light.dsecondary
    },
    whiteText: {
        color: Colors.light.background
    },
    myMainBtn: {
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 30,
        maxWidth: 190
    },
    myMainColoredBtn: {
        backgroundColor: Colors.light.tint,
    },
    myMainBlackBtn: {
        backgroundColor: Colors.light.gray,
    },
    myMainWhiteBtn: {
        backgroundColor: Colors.light.background,
    },
    myHeaderText: {
        marginVertical: 15,
    },
    myFormContainer: {
        width: '95%',
        height: '110%',
    },
    myModalContainer: {
        width:'95%',
        height: 600,
        flexDirection: 'row',
        borderRadius: 30,
    },
    myMainInput: {
        height: 40,
        width: '45%',
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: 10,
        borderRadius: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.tint
    },
    myScannerText: {
        fontSize: 35, 
        marginVertical: 30
    },
    myScannerImg: {
        height: 200, 
        width: 200, 
        marginVertical: 50
    },
    myformBtnText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        textTransform: 'uppercase',
    },
    mydTable: {
        borderRadius: 15, 
        width: 160, 
        marginVertical: 10,   
        shadowColor: Colors.light.gray,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
    },
    mydTableheader: {
        marginRight: 'auto', 
        marginTop: 10, 
        marginBottom: 'auto', 
        fontWeight: 'bold', 
    },
    mydTableCellRight: {
        borderRightColor: Colors.light.gray, 
        borderRightWidth: 0.3
    },
    myRectangle: {
        width: 175, 
        maxHeight: 185,
        marginVertical: 15
    },
    myMainBlock: {
       marginTop: 15,
       marginBottom: 10,
       shadowColor: Colors.light.gray,
       shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
    },
    myClmContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    myProgress: {
        height: 10, 
        width:230, 
        borderRadius: 5, 
        marginTop: 10
    },
    myRowHeader: {
        marginTop: 5,
        flexDirection:'row',
    },
    myFeedContainer: {
        width: '100%',
        marginBottom: 'auto',
        marginTop: 20,
    },
    myQueriesRow: {
        marginTop: 24,
        height: 40,
        width: 200,
    },
    myQueriesText: {
        paddingTop: 5,
    },
    myNav: {
        height: 60, 
        marginBottom: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15
    },
    myNavBtn: {
        maxHeight: 50, 
        marginVertical: 5, 
        marginHorizontal: 5, 
        borderRadius: 15
    }
});

export default mystyle;