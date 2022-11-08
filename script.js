//Dom assignment
const graphs = document.querySelectorAll('.graph');
const values = document.querySelectorAll('.value');
const grandTotal = document.getElementById('total');

//Local assignment
let total = 0;
let max = 0;
const maxHeight = 8; //Assigning width roughly
const valueNum = [];

// Fetching data
const jsonData = async () => {
    const res = await fetch('./data.json');
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
        const amount = data[i].amount;


        if (amount > max) {
            max = amount;
        }
        if (max === amount)
            total += amount;
        valueNum.push(amount);
    }

    //Looping to get correct height
    for (let i = 0; i < graphs.length; i++) {
        let calc = maxHeight / max * valueNum[i];
        values[i].innerHTML = `$${valueNum[i]}`;

        if (valueNum[i] === max) {
            graphs[i].classList.add('high');
        }
        graphs[i].style.height = `${calc}rem`;
    }
    grandTotal.innerHTML = `$${total}`;
}

jsonData();

for (let i = 0; i < graphs.length; i++) {
    graphs[i].addEventListener('mouseover', () => {
        values[i].style.display = 'inline-block';
    })
    graphs[i].addEventListener('mouseout', () => {
        values[i].style.display = 'none';
    })
}

