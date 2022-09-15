let seireki = document.getElementById('seireki');//西暦
let gengo;//元号
let gengoNum;//西暦年
let warekiSupp = document.getElementById('wareki-supp');//注釈
let warekiValue;
let seirekiValue;
let wareki = document.getElementById('wareki');//和暦
let warekiNum = document.getElementById('warekiNum');//和暦年

/* 和暦のプルダウン連携 */
let warekiNumArray = new Array();
warekiNumArray[''] = new Array('');
warekiNumArray['令和'] = new Array(4);
warekiNumArray['平成'] = new Array(31);
warekiNumArray['昭和'] = new Array(64);
warekiNumArray['大正'] = new Array(15);
warekiNumArray['明治'] = new Array(45);

let serial_num = 1;// 連番用

for (let i = 1; i <= warekiNumArray['令和'].length; i++) {
	warekiNumArray['令和'][i - 1] = i;
}
for (let i = 1; i <= warekiNumArray['平成'].length; i++) {
	warekiNumArray['平成'][i - 1] = i;
}
for (let i = 1; i <= warekiNumArray['昭和'].length; i++) {
	warekiNumArray['昭和'][i - 1] = i;
}
for (let i = 1; i <= warekiNumArray['大正'].length; i++) {
	warekiNumArray['大正'][i - 1] = i;
}
for (let i = 1; i <= warekiNumArray['明治'].length; i++) {
	warekiNumArray['明治'][i - 1] = i;
}

document.getElementById('wareki').onchange = function () {
	let onWareki = this.value;
	let elm = document.getElementsByName('warekiNum')[0];
	elm.options.length = 0;
	for (let i = 0; i < warekiNumArray[onWareki].length; i++) {
		let op = document.createElement('option');
		op.value = warekiNumArray[onWareki][i];
		op.textContent = warekiNumArray[onWareki][i];
		elm.appendChild(op);
	}
	elm.options[0].innerHTML = '元';
};

window.onload = function () {
	document.getElementById('wareki').onchange();
	warekiValue = calcGengo(seireki.value);
	warekiNum = document.getElementById('warekiNum');
	wareki.value = warekiValue[0];
	warekiNum.value = warekiValue[1];
};

/* 和暦のプルダウン連携 */

/* 西暦>元号に変換プログラム */
let calcGengo = function (seireki) {

	//令和判定
	if (seireki >= 2019) {
		gengo = '令和';
		gengoNum = seireki - 2018;
		//平成判定   
	} else if (seireki < 2019 && seireki >= 1989) {
		gengo = '平成';
		gengoNum = Number(seireki) + 12;
		if ((gengoNum).toString().substr(2, 1) == 0) {
			gengoNum = gengoNum.toString().substr(3, 1);
		} else {
			gengoNum = gengoNum.toString().substr(2, 2);
		}
		//昭和判定    
	} else if (seireki < 1989 && seireki >= 1926) {
		gengo = '昭和';
		gengoNum = (seireki - 25).toString();
		if ((gengoNum).substr(2, 1) == 0) {
			gengoNum = gengoNum.toString().substr(3, 1);
		} else {
			gengoNum = gengoNum.toString().substr(2, 2);
		}
		//大正判定       
	} else if (seireki < 1926 && seireki >= 1912) {
		gengo = '大正';
		gengoNum = Number(seireki) - 11;
		if ((gengoNum).toString().substr(2, 1) == 0) {
			gengoNum = gengoNum.toString().substr(3, 1);
		} else {
			gengoNum = gengoNum.toString().substr(2, 2);
		}
	}
	//明治判定  
	else if (seireki < 1912 && seireki >= 1868) {
		gengo = '明治';
		gengoNum = Number(seireki) + 33;
		if ((gengoNum).toString().substr(2, 1) == 0) {
			gengoNum = gengoNum.toString().substr(3, 1);
		} else {
			gengoNum = gengoNum.toString().substr(2, 2);
		}
	}
	return [gengo, Number(gengoNum)];
}
/* 西暦>元号に変換プログラム */

/* 元号>西暦に変換プログラム */
let calcSeireki = function (gengo, gengoNum) {
	let seirekiNum;

	//令和の場合  
	if (gengo == `令和`) {
		seirekiNum = '20' + (Number(gengoNum) + 18).toString();
	}
	//平成の場合  
	else if (gengo == `平成`) {
		let mathNum = Number(gengoNum) + 88;
		if (mathNum >= 100) {
			mathNum = mathNum.toString().substr(1, 2);
			seirekiNum = '20' + mathNum;
		} else {
			seirekiNum = '19' + mathNum;
		}
	}
	//昭和の場合  
	else if (gengo == `昭和`) {
		let mathNum = Number(gengoNum) + 25;
		seirekiNum = '19' + mathNum;
	}
	//大正の場合  
	else if (gengo == `大正`) {
		let mathNum = Number(gengoNum) + 11;
		seirekiNum = '19' + mathNum;
	}
	//明治の場合  
	else if (gengo == `明治`) {
		let mathNum = Number(gengoNum) + 67;
		if (mathNum >= 100) {
			mathNum = mathNum.toString().substr(1, 2);
			seirekiNum = '19' + mathNum;
		} else {
			seirekiNum = '18' + mathNum;
		}
	}

	return (Number(seirekiNum));
}
/* 元号>西暦に変換プログラム */

/*補足*/
let calcSupp = function () {
	let supSeireki = document.getElementById('seireki').value;
	warekiSupp.innerHTML = '';
	if (supSeireki == '2019') {
		warekiSupp.innerHTML = '※平成31年(～4月30日) - 令和元年(5月1日～)';
	}
	if (supSeireki == '1989') {
		warekiSupp.innerHTML = '※昭和64年(～1月7日) - 平成元年(1月8日～)';
	}
	if (supSeireki == '1926') {
		warekiSupp.innerHTML = '※大正15年(～12月26日) - 昭和元年(12月26日～)';
	}
	if (supSeireki == '1912') {
		warekiSupp.innerHTML = '※明治45年(～7月30日) - 大正元年(7月30日～)';
	}
	if (supSeireki == '1868') {
		warekiSupp.innerHTML = '※慶応4年(～9月4日) - 明治元年(9月4日～)';
	}
}
/*補足*/

/*トリガー*/
//西暦変更
seireki.addEventListener('change', function (event) {
	event.preventDefault();

	warekiValue = calcGengo(seireki.value);
	warekiNum = document.getElementById('warekiNum');

	wareki.value = warekiValue[0];
	document.getElementById('wareki').onchange();
	warekiNum.value = warekiValue[1];
	calcSupp();

}, false);

//和暦変更
wareki.addEventListener('change', function (event) {
	event.preventDefault();

	seireki = document.getElementById('seireki');
	warekiNum = document.getElementById('warekiNum');
	seirekiValue = calcSeireki(wareki.value, warekiNum.value);

	seireki.value = seirekiValue.toString();
	calcSupp();

}, false);

//和暦年変更
warekiNum.addEventListener('change', function (event) {
	event.preventDefault();

	seireki = document.getElementById('seireki');
	warekiNum = document.getElementById('warekiNum');
	seirekiValue = calcSeireki(wareki.value, warekiNum.value);
	calcGengo(seireki);

	seireki.value = seirekiValue.toString();
	calcSupp();

}, false);
/*トリガー*/
