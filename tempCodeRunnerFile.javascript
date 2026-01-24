
let arr = [1,2,3,4,5]
let arr2 = [1,2,3,4,5]

function checking(arr, arr2,t) {
  let c = false
  for(let i=0;i<arr.length;i++){
      if(arr[i]===t){
          for(let j=0;j<arr2.length;j++){
              if(arr[j]==t){
                  return true
              }
          }
      }
  }
  return c
}

// console.log(checking(arr,arr2,1))

function check(arr, arr2, t) {
  let c = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == t) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j] == t) {
          return true;
        } else {
          c = false;
        }
      }
    }
  }
}

console.log(check(arr,arr2,3))
