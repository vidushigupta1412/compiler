let compile = document.getElementById("compile");   
let textArea = document.getElementById("textarea");
let select = document.getElementById("select");
let output = document.getElementById("output");
let url = "https://course.codequotient.com/api/executeCode";
let language = 4;
let intr;
compile.addEventListener("click",run);

function run(){
    let req = new XMLHttpRequest();
    req.open("POST",url);
    let code = {
        'code' : textArea.value,
        'langId' : language ,
    }
    // console.log(code);
    req.setRequestHeader("Content-Type", "application/json");
    console.log(code);
    req.send(JSON.stringify(code));
    req.onreadystatechange = () => {
        if(req.readyState == 4)
        {

            let obj = JSON.parse(req.responseText);
            console.log(obj);
            if(textArea.value==""){
                output.innerHTML=obj.error;
            }
            if(obj.hasOwnProperty('codeId'))
                 intr = setInterval(() =>{
                response(obj.codeId, intr);
            },1000)

            
        }
    }
}

let response = (codeId) => {
    let req1 = new XMLHttpRequest();
    req1.open("GET",`https://course.codequotient.com/api/codeResult/${codeId}`);
    req1.send();
    req1.onreadystatechange = () => {
        if(req1.readyState == 4)
            {
                let obj = JSON.parse(req1.responseText);
                console.log(obj);
                
                
                    
                let data = JSON.parse(obj.data);
                console.log(data);

                if(data.hasOwnProperty("langid"))
                {
                    clearInterval(intr)
                    if(data.errors != "") {
                        console.log(data.errors)
                        console.log(output);
                        output.innerHTML = data.errors;
                    }
    
                    else
                    {
                        console.log(data.output)
                        output.innerHTML = data.output;
                    }
                }
                console.log(data);

               
             }
    }
}

let sub = () => {
    console.log(select.value);
    switch(select.value)
    {
        
        case "js" : language = 4;
        break;
        case "c" : language = 7;
        break;
        case "cpp" : language = 77;
        break;
    }
}

select.addEventListener("click",sub);