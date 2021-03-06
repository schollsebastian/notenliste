function declareForm() {

    for (let klasse in schueler) {
        schueler[klasse].sort();
    }
    for (let klasse in faecher) {
        faecher[klasse].sort();
    }

    let innerHTML = '<option disabled selected>Klasse</option>';

    document.getElementById('rows').value = 1;

    for (let klasse in schueler) {
        innerHTML += '<option value="' + klasse + '">' + klasse + '</option>';
    }
    document.getElementById('klasse').innerHTML = innerHTML;

    refreshForm();
    
    setHeadingPadding();

}

function setHeadingPadding() {
    document.getElementById('heading').style.paddingRight = getScrollbarWidth() / window.innerWidth * 100 + 'vw';
}

function refreshForm() {

    let innerHTML = '<option disabled selected>Schüler</option>';
    let index = document.getElementById('klasse').value;

    for (let i in schueler[index]) {
      innerHTML += '<option value="' + schueler[index][i] + '">' + schueler[index][i] + '</option>';
    }
    document.getElementById('schueler').innerHTML = innerHTML;

    innerHTML = '<option disabled selected>Fach</option>';
    index = document.getElementById('klasse').value.charAt(0) + '. Klassen';
    for (let i in faecher[index]) {
      innerHTML += '<option value="' + faecher[index][i] + '">' + faecher[index][i] + '</option>';
    }
    document.getElementById('fach').innerHTML = innerHTML;

}

function assignMark() {

    let klasseValue = document.getElementById('klasse').value;
    let schuelerValue = document.getElementById('schueler').value;
    let fachValue = document.getElementById('fach').value;
    let noteValue = document.getElementById('note').value;

    if (klasseValue != 'Klasse'
        && schuelerValue != 'Schüler'
        && fachValue != 'Fach'
        && noteValue != 'Note') {
        printMarks();
    } else {
        alert('Füllen Sie bitte alle Felder aus.');
    }

}

function printMarks() {
    let newDiv = document.createElement('div');

    let klasseDiv = document.createElement('div');
    let nachnameDiv = document.createElement('div');
    let vornameDiv = document.createElement('div');
    let fachDiv = document.createElement('div');
    let noteDiv = document.createElement('div');

    let klasseValue = document.getElementById('klasse').value;
    let nachnameValue = document.getElementById('schueler').value.split(' ')[0];
    let vornameValue = document.getElementById('schueler').value.split(' ')[1];
    let fachValue = document.getElementById('fach').value;
    let noteValue = document.getElementById('note').value;

    let outputBox = document.getElementById('outputBox');
    let override = false;

    for (let i = 0; i < outputBox.childNodes.length; i++) {
        if (outputBox.childNodes[i].childNodes[0].textContent == klasseValue
            && outputBox.childNodes[i].childNodes[1].textContent == nachnameValue
            && outputBox.childNodes[i].childNodes[2].textContent == vornameValue
            && outputBox.childNodes[i].childNodes[3].textContent == fachValue) {
                outputBox.childNodes[i].childNodes[4].textContent = noteValue;
                override = true;
        }
    }

    if (!override) {
        outputBox.appendChild(newDiv);

        klasseDiv.textContent = klasseValue;
        nachnameDiv.textContent = nachnameValue;
        vornameDiv.textContent = vornameValue;
        fachDiv.textContent = fachValue;
        noteDiv.textContent = noteValue;

        newDiv.appendChild(klasseDiv);
        newDiv.appendChild(nachnameDiv);
        newDiv.appendChild(vornameDiv);
        newDiv.appendChild(fachDiv);
        newDiv.appendChild(noteDiv);
    }
}

function removeRow() {
    let rowsCount = parseInt(document.getElementById('rows').value) - 1;
    let outputBox = document.getElementById('outputBox');

    if (rowsCount < 0 || rowsCount > outputBox.childElementCount - 1) {
        alert("Bitte wählen Sie eine gültige Zeile aus.");
    } else {
        outputBox.removeChild(outputBox.childNodes[rowsCount]);
    }
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";

    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}