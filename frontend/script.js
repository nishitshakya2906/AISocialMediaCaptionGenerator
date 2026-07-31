const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const button = document.getElementById("generateBtn");
const caption = document.getElementById("caption");
const promptBox = document.getElementById("prompt");


let uploadedImages = [];

imageInput.addEventListener("change", function () {

    preview.innerHTML = "";

    uploadedImages = [];

    const files = imageInput.files;

    for(let file of files){

        const reader = new FileReader();

        reader.onload = function(e){

            uploadedImages.push(e.target.result);

            const img = document.createElement("img");

            img.src = e.target.result;

            preview.appendChild(img);

        }

        reader.readAsDataURL(file);

    }

});

button.addEventListener("click", generateCaption);

async function generateCaption(){

    if(uploadedImages.length==0){

        alert("Upload images first");

        return;

    }

    caption.value="Generating caption...";

    const parts=[];

   const userPrompt = promptBox.value.trim();

    parts.push({

        text:
    `You are a professional social media caption writer.

    Analyze every uploaded image together.

    User Instructions:
    ${userPrompt}

    Generate:

    • One engaging caption
    • Include suitable emojis
    • Include relevant hashtags
    • Keep it natural
    • Only describe things actually visible in the images.`

    });

    uploadedImages.forEach(img=>{

        parts.push({

            inlineData:{

                mimeType:"image/jpeg",

                data:img.split(",")[1]

            }

        });

    });

    const body={

        contents:[

            {

                parts:parts

            }

        ]

    };

    const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
});

    if (!response.ok) {
    const errorText = await response.text();
    console.error(errorText);
    throw new Error(`Server error: ${response.status}`);
}

const data = await response.json();

caption.value = data.text;
}