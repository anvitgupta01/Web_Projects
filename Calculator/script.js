let string  = "";
let btn = document.getElementsByClassName('btn'); // It will be a html collection.

Array.from(btn).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        
        if((e.target).innerHTML == '='){
            string = eval(string);
            let input = document.querySelector('.input');
            input.value = string;
        }
        else if((e.target).innerHTML == 'C'){
            string = "";
            let input = document.querySelector('.input');
            input.value = string;
            
        }
        else if((e.target).innerHTML == '++'){
            let input = document.querySelector('.input');
            string  = parseInt(input.value);
            string += 1;
            string = string.toString();
            input.value = string;
        }
        else if((e.target).innerHTML == '--'){
            let input = document.querySelector('.input');
            string  = parseInt(input.value);
            string -= 1;
            string = string.toString();
            input.value = string;
        }
        else
        {
            string = string + (e.target).innerHTML;
            let input = document.querySelector('.input');
            input.value = string;
        }

        
     
    })
})