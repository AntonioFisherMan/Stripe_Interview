
export const required = value => {
    if (value) {
      return undefined;
    } else {
      return "Field is required";
    }
  };
  
  export const MaxLength=(maxLength)=>(value)=>{
    if(value.length>maxLength)return `max length is ${maxLength}`
  }
  export const MinLength=()=>(values)=>{
      if(values.length<5)return `MinLength is: ${5}`
  }