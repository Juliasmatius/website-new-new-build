function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function load_animal() {
    images = ["https://api.tinyfox.dev/img?animal=caracal","https://api.tinyfox.dev/img?animal=chee","https://api.tinyfox.dev/img?animal=yote","https://api.tinyfox.dev/img?animal=dook","https://api.tinyfox.dev/img?animal=fox","https://api.tinyfox.dev/img?animal=mane","https://api.tinyfox.dev/img?animal=ott","https://api.tinyfox.dev/img?animal=marten","https://api.tinyfox.dev/img?animal=wah","https://api.tinyfox.dev/img?animal=serval","https://api.tinyfox.dev/img?animal=woof","https://api.tinyfox.dev/img?animal=yeen"]
    names = ["caracal", "cheetah","cayote","ferret","fox","maned wolf","otter","marten","red panda","serval","wolf","hyena"]
    number = getRandomInt(images.length)
    document.getElementById('animal_subtitle').innerText = "Current animal is "+names[number]+"."
    document.getElementById('animal_img').alt = "A "+names[number]
    document.getElementById('animal_img').title = "A "+names[number]
    document.getElementById("animal_img").src = images[number];
}

window.addEventListener('load', function () {
    load_animal()
  })