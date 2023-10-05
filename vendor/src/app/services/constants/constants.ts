export const servingCities = [
  'Nagpur','Pune','Mumbai','Goa','Kolkata','Delhi','Dubai'
];

export const arrayToSelectSrc = function(arr){
  let ret = [];
  for(let i=0;i<arr.length;i++){
    ret.push({key:arr[i],value:arr[i]});
  }
  return ret;
}

export const designations = {
  customer:'customer',
  vendor: 'vendor',
  manager: 'manager',
  superAdmin: 'admin'

}



