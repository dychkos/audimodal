let body = document.querySelector('body');

let memberList = [
    { id: 1, name: "Audi RS 7 Sportback", img: "images/audi-rs7-sportback.jpg", desc: "Шалений і неприборканий чи незалежний та естетичний? Для Audi RS 7 Sportback правильні обидва варіанти. ", modalDesc: "Елегантні лінії купеподібного дизайну поєднуються з грубою силою V-подібної «вісімки» TFSI. Інноваційна технологія поєднується з інтуїтивною динамікою. Насолоджуйтесь відчуттям захвату завдяки відсутності потреби в компромісах.", price: 45000 },
    { id: 2, name: "Audi Q5", img: "images/Q5-2.jpg", desc: "Audi SQ5 пропонує потужний двигун із турбонаддувом, передбачений у базовій комплектації постійний повний привод quattro та дизайн, завдяки якому автомобіль виглядає надзвичайно динамічно навіть тоді, коли стоїть.", modalDesc: "V-подібний 6-циліндровий двигун, оснащений турбокомпресором з електроприводом, забезпечує Audi SQ5 розгін до максимальної швидкості, обмеженої електронікою на позначці 250 км/год. За передачу потужності відповідає 8-ступенева АКП tiptronic, яка вирізняється швидкістю та плавністю перемикання передач", price: 37000 },
    { id: 3, name: "Audi RS Q8", img: "images/audi-rs-q8.jpg", desc: "Найпотужніший позашляховик-купе від Audi Sport: Audi RS Q8 потужністю 600 к.с. На додачу до традиційної для RS динаміки він переконує надзвичайною мінливістю вражень від керування та дизайну.", modalDesc: "Динамічний потенціал Audi RS Q8 кидається у вічі з першого погляду. Цьому сприяють ексклюзивні для серії RS елементи, які підкреслюють атлетичний характер автомобіля з будь-якого погляду. Виразна задня частина являє собою нову інтерпретацію динаміки, зокрема завдяки ексклюзивній вставці дифузора в стилі RS глянцево-чорного кольору з карбоновою горизонтальною планкою та характерними для серії RS овальними патрубками випускної системи. ", price: 52500 },


]
const toHTML = member => `<div class="col">
<div class="card" style="width: 18rem;">
    <img src="${member.img}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${member.name}</h5>
        <p class="card-text">${member.desc}</p>
        <a href="#" class="btn btn-primary" data-id="${member.id}"  data-btn="click" >Подробнее</a>
        <a href="#" class="btn" data-id="${member.id}"  data-btn="confirm" >Предзаказ</a>
    </div>
</div>
</div>`

const anchors = document.querySelectorAll('a[href*="#"]')

function removeActiveClass(){
    for (let anchor of anchors) {
        anchor.classList.remove('active');
    }
}

for (let anchor of anchors) {
   
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    removeActiveClass()
    anchor.classList.add('active')
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
let a = document.getElementById("feedback");




function render() {
    const html = memberList.map(toHTML).join('');
    document.getElementById('members').innerHTML = html;

}

render();
let select = document.getElementById('chooseCar');

function fillSelect(options) {


    options.forEach(opt => {
        let newOption = new Option(opt.name, opt.id);
        select.append(newOption)
    })

}

fillSelect(memberList)

let createModal = new Modal({
    modalTitle: "Подробная информация",
    modalText: "Desc",
    modalFooter: [,
        {
            text: "ЗАКРЫТЬ",
            type: "danger",
            closable: true,
            handler() {
                createModal.close()
                console.log('Danger btn was clicked')
            }
        }
    ]

});

//const createModal = $.modal()
// const confirmModal = $.modal({
//     modalTitle: "Вы уверены?",
//     modalText: "",
//     modalFooter: [,
//         {
//             text: "YES",
//             type: "danger",
//             closable: true,
//             handler() {
//                 confirmModal.close()
//                 console.log('Danger btn was clicked')
//             }
//         },
//         {
//             text: "NO",
//             type: "danger",
//             closable: true,
//             handler() {
//                 confirmModal.close()
//                 console.log('Danger btn was clicked')
//             }
//         }
//     ]

// })



document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const memberId = +event.target.dataset.id;

    if (btnType === "click") {
        const member = memberList.find(f => f.id === memberId);
        console.log(member);
        createModal.setContent(`<p>${member.modalDesc}</p>`);
        createModal.open();
    } else if (btnType == 'confirm') {
        const member = memberList.find(f => f.id === memberId);
        openByPromise({
                modalTitle: "Новое авто - новые возможности!",
                modalText: `<p> Вы можете оставить предзаказ и получить <strong>10%</strong> скидки на авто <strong> ${member.name} </strong></p>
                <p>Цена для вас : <strong>${member.price}$</strong></p>
                `,

            }).then(() => {
                console.log("remove");
                document.querySelector('#feedback').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                select.options[member.id - 1].selected = true;
                // memberList = memberList.filter(f => f.id !== memberId)
                // render()
            }).catch(() => {
                console.log("cancel");
            })
            // confirmModal.setContent()
            // confirmModal.open();
    }
})

const formSubmit = document.querySelector('#submitButton');

formSubmit.addEventListener('click',(e)=>{
    
    e.preventDefault();
    let content=`Отлично, мы свяжемся с вами!`;
   let inputs = document.querySelectorAll('.formInput');
    for(inp of inputs){
        if(inp.value==""){

            content="Заполните все поля формы!";

        }
    }
    modalNotification({
        modalTitle: "Уведоление",
        modalText: content,

    }).then(() => {
        console.log("remove");
        
        // memberList = memberList.filter(f => f.id !== memberId)
        // render()
    })
  })

