/* according to first condition, number should have divisors that meanse number is definately not a prime number */

var allPrimeNostillThousand = [];
var beerNos = []


for (let n = 1; n <= 150; n++) {

    if(!isPrimeNo(n)){

        let numDivisiors = getDivisors(n);
        let divisorTotal = 0;
        numDivisiors.forEach(e=>{
            divisorTotal+=e;
        })
        if(divisorTotal > n){ //satisfyin condition 1 i.e sum of divisors > number
            let subsets = getSubsets(numDivisiors);
            let isSumGreater = false;
            subsets.forEach(s=>{
                let sum =0;
                s.forEach(e=>{
                    sum+=e;
                });
                // console.log("num",n,"sum", sum)
                if(sum > n){ //satisfying condition 2 i.e No subset of those divisors sums up to the tap number itself 
                    // console.log("!!!Oops subset sum is greater than num",n,"sum", sum)
                    isSumGreater = true;
                }
            });
            if(!isSumGreater){
                beerNos.push(n);
            }
        }
    }

}

console.log(beerNos);
if(beerNos.length > 0){
    console.log("Please orde beer no ",beerNos[0]);
}else{
    console.log("Sorry today I will not order beer");
}


function isPrimeNo(num){
    for (let i = 2; i < num; i++)
        if((num % i) === 0) return false;
    return num >1;
}

function getDivisors(num){
    let divisors = [];
    let divisor = num;
    while(divisor >0){
        if(num % divisor == 0){
            divisors.push(divisor);
        }
        divisor--;
    }
    divisors = divisors.slice(0).reverse(); //to remove 12 from its divisors
    divisors.pop();
    return divisors;
}

function getSubsets(divisors){

        let result = [];
        result.push([]);
        divisors.forEach(a => {
            let length = result.length;
            let i =0;
            while(i < length){
                let temp = result[i].slice(0);
                temp.push(a);
                    result.push(temp);
                i++;
            }
        });
        let finalResult = [];
        result.forEach((e,i)=>{
            if(e.length <= 1){
                // result.splice(i,1);
            }else{
                finalResult.push(e)
            }
        });
        // console.log(divisors,'splice result ',result)
        return finalResult;
    }

