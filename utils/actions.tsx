import firebase from './firebase';
import { ProductType } from '../types';
import { format, add, isAfter, formatDistanceToNow, intervalToDuration} from 'date-fns'

export const getProducts = () => {
    return firebase.database().ref("Product"); 
}

export const getSingleProduct = (id:string) => {
    return firebase.database().ref("Product").child(id);
}

export const unFreeze =  (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {
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
 } catch(error) {console.log('error',error)}
}

export const handleFreeze = async (product:ProductType) => {
const ProductRef = getSingleProduct(product.id);
//Same logic as unfreeze, this time we are adding 6 months to the product's expiry, if it exists and if it is in the future
try {
        const temp = add(new Date(product.expiry), {
            months: 6,
        })
        const future = add(new Date(), {
            months: 6,
        })
        if(isAfter(new Date(product.expiry), future)){
            await ProductRef.update({
                confection: 'Frozen'
            })
        } else {
        const extended = format(temp, "yyyy-MM-dd'T'HH:mm")
        await ProductRef.update({
         expiry: extended,
         confection: 'Frozen'
        })
        }
} catch(error) {console.log('error',error)}
}

export const handleReNew = async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {   
            const interval = intervalToDuration({
                start: new Date(product.addedOn),
                end: new Date(product.expiry!)
            })
            const temp = add(new Date(), interval)
            const now = format(new Date(), "yyyy-MM-dd'T'HH:mm")
            const extended = format(temp, "yyyy-MM-dd'T'HH:mm")

            if(product.confection === 'Fresh' || product.confection === 'Frozen'){
                await ProductRef.update({
                    expiry: extended,
                    isOpen: false,
                    addedOn: now,
                    maturitydate: now,
                    maturity: 'Not specified',
                    recentlyBought: true,
                    boughtOn: now,
                   })
            } else {
                await ProductRef.update({
                    expiry: extended,
                    isOpen: false,
                    addedOn: now,
                    recentlyBought: true,
                    boughtOn: now,
                   })
            }
    } catch(error) {console.log('error',error)}
}

export const handleSetExpired = async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {   
            const now = format(new Date(), "yyyy-MM-dd'T'HH:mm")
                await ProductRef.update({
                    expiry: now,
                   })
    } catch(error) {console.log('error',error)}
}

export const handleDelete = async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    try {await ProductRef.remove();}
    catch(error) {console.log('error',error)}
}

export const handleUpdate = async (
    item:ProductType,
    nname?:string,
    nbrand?:string,
    ncategory?:string,
    nlocation?:string,
    nconfection?:string,
    nmaturity?:string, 
    nexpiry?:Date) => {
    try {
       const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
       const ProductRef = getSingleProduct(item.id);
       if(nmaturity){ //handling products with maturity separately to avoid errors related to additional properties
        await ProductRef.update({
           name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           maturity: nmaturity,
           maturitydate: now,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
        })
       } else { //handling standard products without maturity
           await ProductRef.update({
           name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
       })};
       }
       catch(error) {console.log('error', error)}
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
                    recentlyBought: false,
                }
                ProductRef.push(product);
            }
            else {
                if(maturity === ''){
                    maturity = 'Not specified'}
                    
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
                        recentlyBought: false,
                    }
                    ProductRef.push(product);
                }
}

export const handleOpen =  async (product:ProductType) => {
    const ProductRef = getSingleProduct(product.id);
    //Pretty much same logic as the unFreeze method in the RowMid component, only difference is in setting the isOpen property to true
    try {
        if(formatDistanceToNow(new Date(product.expiry)).includes('year')
        || formatDistanceToNow(new Date(product.expiry)).includes('month')
        || formatDistanceToNow(new Date(product.expiry)).includes('days')){
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