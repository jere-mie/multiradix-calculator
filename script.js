
function clearExpr(){
    var test=document.getElementById('expr');
    test.value = '';
}
function bsExpr(){
    var test = document.getElementById('expr');
    test.value = test.value.slice(0,-1);
}
function addExpr(num){
    var test=document.getElementById('expr');
    test.value = test.value.concat(num);
    
}
function convert(value, base = 2) {
    var [integer, fraction = ''] = value.toString().split('.');

    return parseInt(integer, base) + (integer[0] !== '-' || -1) * fraction
      .split('')
      .reduceRight((r, a) => (r + parseInt(a, base)) / base, 0);
}
function flipBit(bit){
    return (bit == '0') ? '1' : '0';
}
function onecf(num){
    num = num.toString();
    flipped = "";
    for(var i=0; i<num.length; i++){
        if(num[i]!='.'){
            flipped+=flipBit(num[i]);
        }else{
            flipped+='.'
        }
    }
    return flipped;
}
function twocf(num){
    num = onecf(num);
    num = num.split('');
    var i = num.length-1;
    for (i=num.length-1; i>=0; i--){
        if(num[i]=='1'){
            num[i]='0';
        }else if(num[i]=='0'){
            num[i] = '1';
            break;
        }
    }
    if(i==-1){
        return '1'+num.join('');
    }
    return num.join('');
}

function oneandtwo(){
    let num = document.getElementById('complimentNum').value;
    let cf1 = document.getElementById('answer1cf');
    let cf2 = document.getElementById('answer2cf');
    cf1.value = onecf(num);
    cf2.value = twocf(num);
}

  
function matmult(){
    var a = document.getElementById('mat1').value.split('\n');
    var b = document.getElementById('mat2').value.split('\n');
    let answer = document.getElementById('matanswer'); 
    for(var i=0; i<a.length; i++){
        a[i] = a[i].split(' ');
    }        
    for(var i=0; i<b.length; i++){
        b[i] = b[i].split(' ');
    }
    var c = math.multiply(a,b);
    console.log(c[0]);
    let result = "";
    for (var i=0; i<c.length; i++){
        for(var j=0; j<c[i].length; j++){
            result+=c[i][j];
            result+=' ';
        }
        result+='\n';
    }
    answer.value = result;        
}

function matinfo(){
    var a = document.getElementById('mat3').value.split('\n');
    let answer = document.getElementById('matinfoans'); 
    let select = document.getElementById('matselect').value;
    var c = "X";
    var d = "";
    var result = "";
    for(var i=0; i<a.length; i++){
        a[i] = a[i].split(' ');
        for(var j=0; j<a[i].length; j++){
            a[i][j] = parseFloat(a[i][j]);
        }
    }
    switch(select){
        case "Invert Matrix":
            c = math.inv(a);
            break;
        case "Transpose Matrix":
            c = math.transpose(a);
            break;
        case "Calculate Determinant":
            result = math.det(a);
            break;
        case "Calculate Trace":
            result = math.trace(a);
            break;
        case "Calculate Eigenvalues":
            console.log(math.eigs(a).values);
            d = math.eigs(a).values;
            for(var i=0; i<d.length; i++){
                result+="=> "+d[i]+'\n';
            }
            break;
        case "Calculate Eigenvectors":
            console.log(math.eigs(a).vectors);
            d = math.eigs(a).vectors;
            for(var i=0; i<d.length; i++){
                result+="Vector "+(i+1)+": ";
                for(var j=0; j<d[i].length; j++){
                    result+=d[i][j]+" ";
                }
                result+='\n';
            }
            break;
    }
    if(c=="X"){
        answer.value = result;
    }else{
    for (var i=0; i<c.length; i++){
        for(var j=0; j<c[i].length; j++){
            result+=c[i][j];
            result+=' ';
        }
        result+='\n';
    }
    answer.value = result;
    }

}


function run(){
    r1=parseInt(document.getElementById('r1').value);
    r2=parseInt(document.getElementById('r2').value);
    num=document.getElementById('num').value;
    // var newnum = parseInt(num,r1);
    var newnum = convert(num,r1); //converts to base 10
    newnum = newnum.toString(r2); //converts to base r2
    answer = document.getElementById('answer');
    answer.value = newnum;
}
function solve(){
    exprrad=parseInt(document.getElementById('exprrad').value);
    expr=document.getElementById('expr').value;
    var result = 0;
    console.log(exprrad);
    if (exprrad==10){
      result = math.evaluate(expr);
    }else{
      result = convertExpr(expr,exprrad);
    }
    answer2 = document.getElementById('expr');
    answer2.value = result;
    // expr.value=result;
    
}

function convertExpr(expr, base){
    var isAlpha = function(ch){
      return /^[A-Z]$/i.test(ch);
    }
    var arr = [''];
    var arrConvert = [false];
    for (var i=0; i<expr.length; i++){

      if(!isNaN(expr[i]) || expr[i]=='.' || (isAlpha(expr[i]) && base > 10)){
        arr[arr.length-1] = arr[arr.length-1].concat(expr[i]);
        arrConvert[arrConvert.length-1] = true;
      }else{
        arr.push(expr[i]);
        arrConvert.push(false);
        arr.push('');
        arrConvert.push(false);
      }
    }
    for (var i=0; i<arr.length; i++){
      if(arrConvert[i]){
        arr[i] = convert(arr[i],base);
      }
      // if (!isNaN(arr[i]) && arr[i]!='' && arr[i]!=' '){
      //   arr[i] = convert(arr[i],base);
      // }
    }
    console.log(arr);
    // if(arr[0]==NaN){
    //   // arr[0]=''
    //   delete arr[0];
    // }
    console.log(arr);
    var q = arr.join('');
    console.log(q);
    return math.evaluate(q).toString(base);
}