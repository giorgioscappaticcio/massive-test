var s,
colorpalette = {
	
	settings: {
		objSetOfColors : datasetcolours,
		objDataSetNames : datasetnames,

		elBody: document.getElementsByTagName('body')[0],
		elDropNames : document.getElementById('drop-name'),
		elCatList : document.getElementById('cat-list'),
		elColrPalette: document.getElementById('col-palette'),
		elColrDesc : document.getElementById('color-desc-wrap'),

		aCat: []
	},
	
	init: function(){
		s = this.settings;
		this.reset();
		this._onchange();
		this.deselectOptArr();
		this.popDropDownName(s.elDropNames, s.objDataSetNames);
	},

	reset: function(){
		s.aCat = [];
		s.elDropNames.innerHTML = '<option value="-1" selected>Select a dataset</option>';
		s.elCatList.innerHTML = '';
		s.elCatList.parentNode.style.padding = '0px';
		colorpalette.resetSelected();
		
	},

	resetSelected : function(){
		s.elBody.style.background = '';
		s.elColrPalette.innerHTML = '';
		s.elColrPalette.parentNode.style.padding = '0px';
		s.elColrDesc.innerHTML = '';
		s.elColrDesc.style.padding = '0px';
	},

	deselectOptArr: function(){
		for (var key in s.objSetOfColors) {
      		if (s.objSetOfColors.hasOwnProperty(key)) {
         		s.aCat.push(key)
      		}
    	}
	},

	popDropDownName : function(el, obj){
		
		for (var key in obj) {
      		if (obj.hasOwnProperty(key)) {
      			var opt = document.createElement('option');
      			opt.value = key;
      			opt.innerHTML = obj[key];
      			opt.setAttribute('disabled','disabled');
      			for(var i=0;i<s.aCat.length;i++){
      				if (s.aCat[i] == key) {
      					opt.removeAttribute('disabled');	
      				}
      			}
         	
      			el.appendChild(opt);
         	}
    	}
	},

	_onchange: function(){
		s.elDropNames.onchange = function(){
			var selOpt = this.options[this.selectedIndex].value;
			if (parseInt(selOpt) == -1) {
				colorpalette.init();
			} else {
				var obj = s.objSetOfColors[selOpt];
				colorpalette.popCatList(s.elCatList, obj);
				colorpalette.resetSelected();
			}

		}
	},

	popCatList: function(el, obj){
		s.elCatList.innerHTML = '';
		el.parentNode.style.padding = '20px'; 
		for (var key in obj) {
      		if (obj.hasOwnProperty(key)) {
         		var opt = document.createElement('li');
      			addClass(opt, key)
      			opt.setAttribute('value',key);
      			el.appendChild(opt);

      		}
    	}
    	s.objCatList = obj;
    	colorpalette.catLinkClick();
	},

	catLinkClick: function(){
		var aOpts = s.elCatList.getElementsByTagName('li');
		// console.log(aOpts);
		for (var i=0; i<aOpts.length;i++){
			aOpts[i].setAttribute('onclick','colorpalette.showsColor(this)')
		}
	},

	showsColor: function(el){
		colorpalette.resetSelected();
		var catName = el.getAttribute('value');
		colorpalette.popColPalette(s.elColrPalette,s.objCatList[catName]['cat1'])
		removeClass(s.elCatList.getElementsByTagName('li'),'active');
		addClass(el, 'active');
	},

	popColPalette: function(el, objColors){
		el.parentNode.style.padding = '20px';
		for (key in objColors) {
			if (objColors.hasOwnProperty(key)) {
         		var opt = document.createElement('li');
      			opt.setAttribute('clr-name',key);
      			opt.setAttribute('clr-value',objColors[key]);
      			opt.style.background = objColors[key];
      			opt.style.width = (100 / Object.keys(objColors).length) - 1 + '%';
      			el.appendChild(opt);
      		}
			colorpalette.colorLink();
		}
		var arrList = el.getElementsByTagName('li');
      	setTimeout(function() {
      		for (var i=0; i<arrList.length;i++){
      				arrList[i].style.height = '100px';
      			}
      	}, 10);
      			
	},

	colorLink: function(){
		var aClrsOpts = s.elColrPalette.getElementsByTagName('li');
		// console.log(aOpts);
		for (var i=0; i<aClrsOpts.length;i++){
			aClrsOpts[i].setAttribute('onclick','colorpalette.setColor(this)')
		}
	},

	setColor: function (el){
		var colrValue = el.getAttribute('clr-value');
		var colrName = el.getAttribute('clr-name');
		s.elColrDesc.innerHTML = '';
		s.elColrDesc.style.padding = '20px';
		var title = document.createElement('h2');
		title.innerHTML = colrName + '<br><span>' + colrValue + '<span>';
		s.elColrDesc.appendChild(title);
		s.elBody.style.background = colrValue;
	}



}




function addClass(el, classNam){
	if (el.classList)
		el.classList.add(classNam);
	else
		el.className += ' ' + classNam;
}

function removeClass (setOfEl, classNam) {
	for (var i=0; i<setOfEl.length;i++){
      if (setOfEl[i].classList){
        setOfEl[i].classList.remove(classNam);
      } else {
        setOfEl[i].className = setOfEl[i].className.replace(new RegExp('(^|\\b)' + classNam.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      } 
    }
}

colorpalette.init();