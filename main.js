const addBtn = document.getElementById('add-btn');
const priceInp = document.getElementById('price-inp');
const titleInp = document.querySelector('#title-inp');
const checkBox = document.querySelector('#checked');
const list = document.querySelector('#list');
const totalSpan =document.querySelector('#price-info');
const select =document.querySelector('select');
const userInp =document.querySelector('#user-inp');

//olay izzleyicileri

addBtn.addEventListener("click", addExpense);
list.addEventListener("click",handleUpdate);
select.addEventListener('change',handleFilter);
userInp.addEventListener('change',saveUser);
document.addEventListener('DOMContentLoaded',getUser);


// Functions //

//toplam fiyat bilgisi

let totalPrice = 0;


//hem toplam değişkeni hem arayüzü güncelleyen fonksiyon

function updateTotal(price){
//js de tutulan değişkeni günceller
totalPrice += price;

totalSpan.innerText = totalPrice;
}

//yeni harcama ekler
function addExpense(event) {
    event.preventDefault();

    const title = titleInp.value;
    const price = priceInp.valueAsNumber;
 console.dir(checkBox)

   //inputlardan biri bile boş ise alert ver ve fonksiyonun durdur
    if (!title || !price) {
        alert('Lütfen formu doldurunuz');
        return;
    }

    // inputlar doluysa bir kart oluiturup html' e gönder
    const expenseDiv = document.createElement('div');

    // class ekleme
    expenseDiv.classList.add('expense');

    if (checkBox?.checked) {
        expenseDiv.classList.add('paid');
    }
    

    // Divin içeriğini belirleme
    expenseDiv.innerHTML = `
        <h2 id="title">${title}</h2>
        <h2 id="price">${price}</h2>
        <div class="btns">
            <img id="update" src="img/icons8-money-100.png" alt="">
            <img  id="delete" src="img/delete.png" alt="">
        </div>
    `;

    // oluşan kartı html'e gönder
    list.appendChild(expenseDiv);

    //toplamı güncelle

    updateTotal(price);

    //inputları trmizleme
    titleInp.value='';
    priceInp.value='';
    checkBox.checked=false ;
}

//harcamayı siler veya günceller
 function handleUpdate(event){

const ele = event.target;
const parent = ele.parentElement.parentElement;
if (ele.id ==='delete' ){

    //sildiğimiz elemanın fiyatına erişme
const price = Number(parent.children[1].innerText);

//toplamı sildiğimiz fiyatı çıkarma
updateTotal(-price);

//elemanı html'den kaldırma
parent.remove();
 }

//tıklanılan eleman güncelle ise

 if( ele.id ==='update'){
   parent.classList.toggle('paid');
 }

}

function handleFilter(event){
    const selected =event.target.value;
const items = list.childNodes;

items.forEach((item)=>{ 
    //seçilen değere yapılacak işleme  karar vermek

 switch(selected){
    case 'all':
  //classında peid olsa da olmasada gösterilecek
 
    item.style.display ='flex';
 
  
   break;
   case 'paid':
  //classında paid olmayanlar gizlenecek
  if(item.classList.contains('paid')){
    item.style.display ='flex';
  }else{
    item.style.display = 'none';
  }
    break;
    case 'not-paid':
        //clasında paid olanlar gizlenecek
        if(item.classList.contains('paid')){
            item.style.display ='none';
          }else{
            item.style.display = 'flex';
          }
        break;
}

});
}
//kullanıcıyı kaydeder
function saveUser(event){
    localStorage.setItem('username',event.target.value);
}

function getUser(){
const username = localStorage.getItem('username') || '';

userInp.value = username;
}


















