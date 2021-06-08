import firebase from './firebase';
import { ProductType } from '../types';
import { format, add, isAfter, formatDistanceToNow} from 'date-fns'

export const getProducts = () => {
    return firebase.database().ref("Product"); 
}

export const getSingleProduct = (id:string) => {
    return firebase.database().ref("Product").child(id);
}

export const unFreeze =  (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {
        if(product.expiry){ //Check if expiry exists
            if(isAfter(new Date(), new Date(product.expiry))) { //Check if product is expired
            alert("This item is expired, you can't unfreeze an expired Item anymore.")}
            else { //If the product's expiry is in some days, months or years, it will be set to 1 day and the product will be set as Fresh
                if(formatDistanceToNow(new Date(product.expiry)).includes('year')
                || formatDistanceToNow(new Date(product.expiry)).includes('month')
                || formatDistanceToNow(new Date(product.expiry)).includes('days')){
                    const temp = add(new Date(), {
                        days: 1,
                    })
                    const minEx = format(temp, "yyyy-MM-dd'T'HH:mm")
                    ProductRef.update({
                        expiry: minEx,
                        confection: 'Fresh'
                    })
                } else { //If the product's expiry is very soon, f.e. in some hours, it will remain unchanged and only the product's confection will be affected
                    ProductRef.update({
                        confection: 'Fresh'
                    })
                }
            }
        } else alert('This item does not have an expiry date, please set an expiry date before unfreezing it.');
 } catch(error) {console.log('error',error)}
}

export const handleFreeze = async (product:ProductType) => {
const ProductRef = getSingleProduct(product.id);
//Same logic as unfreeze, this time we are adding 6 months to the product's expiry, if it exists and if it is in the future
try {
    if(product.expiry){
        if(isAfter(new Date(), new Date(product.expiry))) {
        alert("This item is expired, you can't freeze an expired Item.")}
        else { const temp = add(new Date(product.expiry!), {
            months: 6,
        })
        const extended = format(temp, "yyyy-MM-dd'T'HH:mm")
        await ProductRef.update({
         expiry: extended,
         confection: 'Frozen'
        })
        }
    } else alert('This item does not have an expiry date, please set an expiry date before freezing it.');
} catch(error) {console.log('error',error)}
}

export const handleDelete = async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {await ProductRef.remove();}
    catch(error) {console.log('error',error)}
}

export const handleAdd = async (name:string, brand?:string, category?:string, location?:string, confection?:string, maturity?:string, datepick?:Date) => {
    const ProductRef = getProducts();
    const now:string = format(new Date(),"yyyy-MM-dd'T'HH:mm");
    const temp:Date = add(new Date(), {
            days: 1,
    })
    let expiry:string = format(temp, "yyyy-MM-dd'T'HH:mm");
    if(datepick){
        if(!isAfter(new Date(), new Date(datepick))){
        expiry = format(datepick,"yyyy-MM-dd'T'HH:mm");
    }}
    if(confection != 'Fresh'){
                const product = {
                    name,
                    brand,
                    category,
                    location,
                    confection,
                    expiry,
                    addedOn:now,
                    isOpen: false,
                }
                ProductRef.push(product);
            }
            else {
                if(maturity != ''){
                    const product = {
                        name,
                        brand,
                        category,
                        location,
                        confection,
                        maturity,
                        maturitydate:now,
                        expiry,
                        addedOn:now,
                        isOpen: false,
                    }
                    ProductRef.push(product);
                }
                    else {
                        maturity = 'Not specified';
                        const product = {
                        name,
                        brand,
                        category,
                        location,
                        confection,
                        maturity,
                        maturitydate:now,
                        expiry,
                        addedOn:now,
                        isOpen: false,
                    }
                    ProductRef.push(product);
        }
    }
}

export const handleOpen =  async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    //Pretty much same logic as the unFreeze method in the RowMid component, only difference is in setting the isOpen property to true
    try {
        if(formatDistanceToNow(new Date(product.expiry!)).includes('year')
        || formatDistanceToNow(new Date(product.expiry!)).includes('month')
        || formatDistanceToNow(new Date(product.expiry!)).includes('days')){
            const temp = add(new Date(), {
                days: 1,
            })
            const minEx = format(temp, "yyyy-MM-dd'T'HH:mm")
             await ProductRef.update({
             expiry: minEx,
             isOpen: true,
            })
        } else {
             await ProductRef.update({
             isOpen: true,
            })
        }
 } catch(error) {console.log('error',error)}
}