document.querySelector('.scroll_down').style.width = getComputedStyle(document.querySelector('.main')).height;

//sticky ------------------
const menu = document.querySelector('.header_menu')
// var menuPosition = menu.getBoundingClientRect().top;
const menuPosition = 120;
window.addEventListener('scroll', function() {
    if (window.pageYOffset >= menuPosition && window.screen.width > 991) {
        menu.style.position = 'fixed';
        menu.style.top = '0px';
		menu.style.left = '0px';
		menu.style.width = '100%';
		menu.style.zIndex = 1;
		
    } else {
        menu.style.position = 'static';
        // menu.style.top = '';
		// menu.style.left = '';
		// menu.style.backgroundColor = '';
		// menu.style.width = '';
		// menu.style.marginLeft = '0';
		// menu.style.paddingLeft = '';
		// menu.style.paddingRight = '';
		// menu.style.paddingTop = '';
		// menu.style.paddingBottom = '';
    }
});

//burger------------------------
const burger = document.querySelector('.burger');
const mobMenu = document.querySelector('.header_menu');
const body = document.body;

burger.addEventListener('click', (e)=>{
	e.stopPropagation()
	mobMenu.classList.toggle('active');
	body.classList.toggle('lock');
})

body.addEventListener('click', ()=>{
	if(mobMenu.classList.contains('active')){
		mobMenu.classList.remove('active');
		body.classList.remove('lock');
	}
})

//callback-------------------------------
const headerCallbackPopup = document.querySelector('.header_info_callback_popup');
const headerPopup = document.querySelector('.header_popup');
const headerPopupClose = document.querySelector('.header_popup_close');

headerCallbackPopup.addEventListener('click', ()=>{
	headerPopup.classList.add('active');
	body.classList.add('lock');
});

headerPopupClose.addEventListener('click', ()=>{
	headerPopup.classList.remove('active');
	body.classList.remove('lock');
});

// send mail--------------------
const form = document.querySelector('.header_form');

form.addEventListener('submit', (e)=>{
	e.preventDefault();

	fetch('mail.php', {
	   method: 'POST',
	   body: new FormData(form) 
	})
	.then(response => {
		if(response.status === 200 && response.statusText == "OK"){
			console.log('OK',response);
			form.reset();
		}else{
			form.reset();
			alert("Пример: форма отправлена или Спасибо");
		}
	})
})

//mask=========================
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

maskPhone('.tel');