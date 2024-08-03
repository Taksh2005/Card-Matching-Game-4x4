let back = document.querySelectorAll('.container .row .col .inner-card .back');
let cards = document.querySelectorAll('.container .row .col');
let isChecking = false;
let attempts = 0;
let count = 0;
let matchedCard = 0;
let arr = [];

document.getElementById('moves').querySelector('span').textContent = attempts;

window.onload = function(){
    //
    for(let i of cards){
        i.classList.add('flip');
    }
    setTimeout(()=>{
        for(let i of cards){
            i.classList.remove('flip');
        }
    },2000)
    //
    let a = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    for(let i of back){
        temp = a[parseInt(Math.random()*a.length-1)]
        i.textContent = temp;
        remove(temp);
    }
    //
    function remove(num){
        let b = [a.length-1];
        for(let i = 0,j=0 ; i < a.length;i++,j++){
            if(a[i] == num){
                a.splice(i,1)
            }
        }
    }
    //
}

function showCard(item) {
    if (isChecking || item.classList.contains('flip')) {
        return;
    }
    item.classList.add('flip');
    arr.push(item);
    count++;
    //
    if (count >= 2) {
        attempts++;
        document.getElementById('moves').querySelector('span').textContent = attempts;

        if(attempts>10 && attempts<=20){
            document.getElementById('moves').querySelector('span').style.color = '#3185fc';
        }
        else if(attempts>20){
            document.getElementById('moves').querySelector('span').style.color = '#ff4c4c';
        }
        //
        isChecking = true;
        //
        setTimeout(() => {
            let item1 = arr.pop();
            let item2 = arr.pop();
            if (item1.innerHTML === item2.innerHTML) {
                item1.querySelector('.inner-card').querySelector('.back').style.backgroundColor = '#39aa51';
                item1.querySelector('.inner-card').querySelector('.back').style.borderColor = '#287539';
                item2.querySelector('.inner-card').querySelector('.back').style.backgroundColor = '#39aa51';
                item2.querySelector('.inner-card').querySelector('.back').style.borderColor = '#287539';
                matchedCard++;
                count = 0;
                //
                if (matchedCard == 8) {
                    /* this pop style is from sweetAlert2 */
                    let timerInterval;
                    Swal.fire({
                    title: "You Won!",
                    html: "Total <b></b> Moves.",
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: () => {
                        
                        const timer = Swal.getPopup().querySelector("b");
                        timer.textContent = `${attempts}`;
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                    }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                    });
                }
                //
            } else {
                item1.classList.remove('flip');
                item2.classList.remove('flip');
                count = 0;
            }
            //
            isChecking = false;
        }, 800);
    }
    
}
//
function reset() {
    location.reload();
}

