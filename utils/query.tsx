const toJson = (response: Response): Promise<any> => {
    if (!response.ok) 
      throw new Error("error in the response: " + response.status)
    return response.json()
}


export const handleBarCodeScanned = async (input:any) => {
      try { //Querying data and saving it using handleAll, if data is not found simply set input as data not found
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${input}`)
      const json = await toJson(response);
      let myCategory = 'Category not found';
      let myName = 'Name not found';
      let myBrand = 'Brand not found';
      if(json.product.categories_hierarchy && json.product.categories_hierarchy.length > 0){
        const categoryName = json.product.categories_hierarchy[0].substring(3);
        myCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      }
      if(json.product.product_name){
        if (json.product.product_name > 1){
          myName = json.product.product_name[0];
        }
        else myName = json.product.product_name;
      }
      if(json.product.brands){
        if (json.product.brands > 1){
          myBrand = json.product.brands[0];
        }
        else myBrand = json.product.brands;
      }
      return [myName, myBrand, myCategory];
    } catch(err) {
      console.log("error", err)
  }
  };