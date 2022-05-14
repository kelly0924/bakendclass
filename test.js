//변수 선언 방법
//함수 선언 법




//호이스팅(Hoisting) 이라는 개념이 존재 한다. --> 개발자들이 편리르 위해 나온 것 

//호이스팅 전
console.log(number);
console.log(number2); // 다른 언어는 무조건 에로 가 나오지만 자바스크립트는 돌려 준다. undifinded라고 라온다.

var number=10
var number2=20

//호이스팅 후  --> 다음 과 같이 나와게 된다.  그러나 결국  에로를 알려 주지 않아서 힘들다. 

var number
var number2
console.log(number);
console.log(number2);
number=10
number2=20

// var 을 쓰면 안되는 이유
// 1. 호이스팅이 적용되므로 쓰면 안된다. 
//2. var은 중복 변수 허용하고, 


//변수 쓸때는 
const number=10
let number=20
//const, let 호이스팅을 막아 준다. 
//const 는 한번 값을 넣으면 바꿀수가 없다.  바꾸려고 하면 에로를 반환 한다.
//let 일반 변수, 우리가 사용하는 변수, 바꿀 수도 있다. 



// 함수도 호이스팅이 된다. 

printMessage(10) //다른 언어에서는 안되지만 자바스크립트에선 된다. 함수도 호이스팅 된다.  중복선언이 된다. 
function printMessage(number){
    console.log(number)
}

// 1.  방법: 함수 표현식
const printMessage=function(number){//중복선언은 const로 해결  호이스팅도 된다. 
    console.log(number) 
}


printMessage(10)
const printMessage=function(number){//중복선언은 const로 해결  호이스팅도 된다. 
    console.log(number) 
}

//호이스팅 된후 

//const printMessage
printMessage(10)// -- > 에로를 출력한다. printMessage는 함수가 아니라고 
printMessage=function(number){//중복선언은 const로 해결  호이스팅도 된다. 
    console.log(number) 
}


//2. 함수 람다식

const printMessage =(number) =>{
    console.log(nubmer)
}
// 변수가 하나 일때 소괄호 생략 가능
const printMessage =number =>{
    console.log(nubmer)
}

//함수 람다식 내용이 1줄일 경우 중괄호 생략 가능
const printMessage =number =>console.log(nubmer)


//새로운 문법

//Array Helper
//map, reduce, filter, forEach 
//Array 와 반복문을 같이 쓸때, 코드를 효과적으로 줄여줌


const dataList = [1,2,3,4,5]
let sum =0;
dataList.forEach((value)=>{
    sum+=value
})

//기본에 처리 하던 방법
for(let index=0; index<dataList.length; index++){
    dataList[index]=dataList[index]*dataList[index]
}

//Array Helper을 이요한 방법
dataList.forEach((value)=>{

}) // 함수를 쓴다. 

//forEach
//무조건 value 하나는 들어 오고 이 값은 요소를 의미 한다. 1~5까지 의미 한다. 사용에 따라 더 받을 수도 있다. 
//forEach 각 뭐 해 줄것이다.  출력 같은 것에 많이 사용한다. forEach(함수를 인자로 받는다. 함수 인자는 꼭 하나의 인자가 존재 한다.)
dataList.forEach((value ,index)=>{
 dataList[index]=value*value
})


//map 도 각각 뭘 해주겠다. 결과를 다른 배열에 저장 가능해 진다.  map 다른 배열에 저장 해줄 것이야  map은 기본형은 return 이 필요하다. 
//한줄만 쓸때는 줄여서 return 없게 쓸수도 있다. 
const  resultList=dataList.map((value)=>{
    return value*value
})


//filter 다른 배열로 옮겨 준다.  필터를 해서 다른 배열에 옮겨 준다. 즉 내가 원하는 조건에 맞게 걸러서 다른 리스트에 저장 해 준다. 

const result2List=dataList.filter((value)=>{
    return value<3//내가 원하는 조건 넣어 주면 된다. 
})


//reduce 다른 곳에 옮긴다. 근데 다른 곳에 옮기는 곳이 변수 이다. 어떤 룰에 의해서 하나의 변수로 줄여 주겠다 라는 뜻. 번수하나 더 필요함 

const result = dataList.reduce((value,current)=>{
    return value + current// 배열의 합구하기 
    //current 직전 단계까지 결과를 저장 하는 변수 이다. 
    //current의 초기 값을 0으로 준다. 
},0)//current c초기 값 





//백티?
const center="stagus"
const member="ah"

console.log(center + "2의 팀원 " + member +"입니다.")
//템플릿 리터럴 template literal   
// console.log({center} 의 팀원 ${number} 입니다.)// {안에 함수, 숫자 식 다 들어 간다.} 앞에 백티{}
