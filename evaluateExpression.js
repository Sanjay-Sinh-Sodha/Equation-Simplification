var input = {
    "op": "equal",
    "lhs": {
        "op": "add",
        "lhs": 1,
        "rhs": {
            "op": "multiply",
            "lhs": "x",
            "rhs": 10
        }
    },
    "rhs": 21
};

//outut 1 + (x * 10) = 21

var expressions = [];
var exp = '';
var finalExp = '';

//generate expression

const generateExpressions = (input) => {
    Object.keys(input).forEach(key => {
        if (typeof input[key] === 'object') {
            expressions.push( input[key])
            generateExpressions(input[key]);
        }
    });
}

generateExpressions(input);
expressions = expressions.slice(0).reverse();
expressions.push(input);


for (var i = 0, len = expressions.length; i < len; i++) {
    var item = expressions[i];
    var exp = createExp(item);
    finalExp = exp;
    var nextEle = expressions[i+1];
    for (const key in nextEle) {
        if (nextEle.hasOwnProperty(key)) {
            const element =nextEle[key];
            if (typeof element === 'object') {
                expressions[i+1][key] = exp;
            }
        }
    }
}


function createExp(ip){
    var lhs = (ip.lhs);
    var rhs = (ip.rhs);

        switch (ip.op) {
            case 'multiply':
                return '('+lhs +'*'+ rhs+')';
                break;
                case 'add':
                    return '('+lhs +'+'+ rhs+')';
                    break;
                    case 'subtract':
                        return '('+lhs +'-'+ rhs+')';
                        break;
                        case 'divide':
                            return '('+lhs +'/'+ rhs+')';
                            case 'equal':
                            return lhs +'='+ rhs;
                            break;
        
            default:
                break;
        }
}


console.log("Generated equation is :::",finalExp);

//tranform expression

var tranExp =  transformExpression(finalExp);


function transformExpression(exp){
    let arr = exp.split('=');
    let evalThis = arr.find(e=>isNaN(e));
    let rhsVal = arr.find(e=>!isNaN(e));
    let lhsVal = '';
    let allChars = evalThis.split('');
    let openingIndexes = [];
    let closingIndexes = [];
    let bracketValues = [];
    let charBuffer = [];

    allChars.forEach((e,i)=>{
        if(e == '('){
            openingIndexes.push(i);
        }else if(e == ')'){
            closingIndexes.push(i);
        }
    });
    openingIndexes = openingIndexes.slice(0).reverse();

    for(let i=0;i<openingIndexes.length;i++){
        bracketValues.push(evalThis.substring(openingIndexes[i]+1,closingIndexes[i]));
    }

    bracketValues = bracketValues.slice(0).reverse();
    bracketValues.forEach(e=>{
        let charArr = e.split('');
        let isBracketSkip =[false];
        for (let i = 0; i < charArr.length; i++) {
            const charval = charArr[i];
            if(isBracketSkip[isBracketSkip.length-1]){
                continue;
            }else{
                if(charval == '('){
                    isBracketSkip.push(true)
                }else if(charval == '('){
                    isBracketSkip.pop();
                }else{
                    if(isNaN(charval)){
                        let checkArr = ['*','+','-','*','/'];
                        let isvariable = checkArr.findIndex(e=>e==charval)==-1?true:false;
                        if(isvariable){
                            lhsVal += charval;
                        }else{
                            switch (charval) {
                                case '*':
                                    rhsVal += ' / ';
                                    break;
                                    case '+':
                                        rhsVal += ' - ';
                                        break;
                                        case '-':
                                            rhsVal += ' + ';
                                            break;
                                            case '/':
                                                rhsVal += ' * ';
                                default:
                                    break;
                            }
                            if(charBuffer.length>0)
                            rhsVal+=charBuffer.pop();
                        }
                    }else{
                        charBuffer.push(charval);
                    }
                }
              
            }
        }
        charBuffer.forEach(e=>{
            rhsVal+=e;
        })
    });
    var parseExp = lhsVal+' = '+rhsVal+'';
    return parseExp;
}

console.log('Evaluated expression is :::',tranExp);


/*
    to get the final result value we can use the library Math.js
    referencee : https://mathjs.org/docs/expressions/parsing.html
    const parser = math.parser();
    var result = parser.evaluate(parseExp);   
    parser.evaluate('x = 7 / 2')   // output : 3.5
    console.log("Final result value:::",result);
 */