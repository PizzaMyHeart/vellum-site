// **************
// Modal overlay*
// **************
const books = document.getElementsByClassName('books-container-item');

const modal = document.getElementById('modal');

// Display overlay when clicking book thumnail
for(var i = 0; i < books.length; i++) {
    let book = books[i];
    book.onclick = function() {
    	let description = book.querySelector('.description').cloneNode(true);
    	description.style.display = 'block';
        modal.appendChild(description);
        modal.style.display = 'block';
    }
}

// Double-click to close overlay
modal.addEventListener('dblclick', function() {
	modal.style.display = 'none';
	modal.innerHTML = '';
});



// ********
// Isotope*
// ********

const elem = document.querySelector('.books-container');
const filtersSelectAll = document.querySelectorAll('.filters-select');
var filters = {};
// Reset button
const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', reset);
function reset() {
	console.log('click');
	iso.destroy();
	// Reset select values
	yearFilter.value = '';
	keywordFilter.value = '';
	// Clear Isotope selectors
	filters = {};
	console.log(filters);
	initIso();
	impossibleOff();
}

function initIso() {
	if (/list/.test(window.location.href)) {
		var iso = new Isotope(elem, {
			itemSelector: '.books-container-item',
			layoutMode: 'vertical'
		});
	} else {
		var iso = new Isotope(elem, {
			itemSelector: '.books-container-item',
		});
	};

	for(var i = 0; i < filtersSelectAll.length; i++) {
		var filtersSelect = filtersSelectAll[i];
		filtersSelect.onchange = function(event) {
			var select = event.target;
			var filterGroup = select.getAttribute('data-filter-group');
			filters[ filterGroup ] = event.target.value;
			var filterValue = concatValues(filters);
			iso.arrange({ filter: filterValue });

			console.log(iso.filteredItems);
			// If no results returned
			if(!iso.filteredItems.length) {
				impossibleOn();
			}
		}
	};
	

	

	return iso;
};
var iso = initIso();



// flatten object by concatting values
function concatValues( obj ) {
	console.log(obj);
  	var value = '';
  	for ( var prop in obj ) {
    	value += obj[ prop ];
  	};
  	return value;
};


// Insert tags as class names in each book item
const allKeywords = [];

for(var i = 0; i < books.length; i++) {
	let book = books[i];
	let keywords = book.querySelectorAll('.keyword');
	if (keywords !== null) {
		for(var j = 0; j < keywords.length; j++) {
			let keyword = keywords[j].innerHTML;
			// Store in allKeywords for use in constructing Isotope selectors
			allKeywords.push(keyword);
			// Convert spaces to dashes, to produce valid class names
			keyword = keyword.replace(/\s+/g, '-').replace(/,/g, '');
			book.classList.add(keyword);

		};
	};
};

// Create keyword filter list

const yearFilter = document.querySelector('#year-filter')


const keywordFilter = document.querySelector('#keyword-filter');
var keywordsUnique = Array.from(new Set(allKeywords)).sort();
console.log(keywordsUnique);

for(var i = 0; i < keywordsUnique.length; i++) {
	var keyword = keywordsUnique[i];
	var optionNode = document.createElement('option');
	// Prepend with '.' for use as Isotope filter value
	optionNode.value = '.' + keyword.replace(/\s+/g, '-').replace(/,/g, '');
	optionNode.innerHTML = keyword;
	keywordFilter.appendChild(optionNode);

}

const impossible = document.querySelector('#impossible');
// Show 'impossible' div 
function impossibleOn() {
	impossible.style.display = 'block';
}
// Hide 'impossible' div
function impossibleOff() {
	impossible.style.display = 'none';
}


