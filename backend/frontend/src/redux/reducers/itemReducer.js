const initialData = {
     items: "",
 }
 
 const itemReducer = (state=initialData, action) => {
     switch(action.type){
         case "UPDATE_ITEM":
             return {items: action.payload}
 
         default:
             return state
     }
 }
 
 export default itemReducer