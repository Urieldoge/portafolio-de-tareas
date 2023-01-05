const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-File");
let files;

button.addEventListener("click", (e) =>{
    input.click();

});

input,addEventListener("change", (e) =>{
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files)
    dropArea.classList.remove("active");
}); 

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "arrastra y suelta los archivos";  
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "arrastra y suelta los archivos";  
});


function showFiles(files){
    if(files.lenght= undefined){
        processFile(files);
    }
    else{
        for(const file of files){
            processFile(files);

        }
    }

}

function processFile(file){
const doctype = file.type;
const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif", "document/pdf"];
if(validExtensions.includes(doctype)){
    //archivo es valido
    const fileReader = new FileReader();
    const id =`file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener(`load`, e => {
        const fileUrl = fileReader.result;
        const image = `
        <div id="${id}" class="file-container">
        <img scr="${fileUrl}"  alt"${file.name}">
        <div class="status">
        <span>${file.name}</span>
        <span class="status-text">
        loading...
        </span>
        
        </div>
        
        </div>
        `;  
        const html = document.querySelector("#preview").innerHTML;
        document.querySelector("#preview").innerHTML = image + html;

    });

    fileReader.readAsDataURL(file);
    uploadFile(file, id);
}else{
    //no es valido
    alert("Archivo no es valido");
}
}

function uploadFile(file){
    const formData = new formData();
    formData.append("file", file);

    try {
        const response = fetch("http://localhost:3000/upload",{
            method: "POST",
            body: formData,
        });

        const responseText = response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="sucess">Archivo subido correctamente...</span>`;
    } catch(error){
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="failure"> El Archivo no pudo subirse...</span>`;
    }
    

    

}