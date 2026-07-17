function increase(btn) {
    let quantity = btn.previousElementSibling;
    let value = parseInt(quantity.innerText);

    if (value < 10) {
        quantity.innerText = value + 1;
    } else {
        alert("Maximum 10 products allowed.");
    }
}

function decrease(btn) {
    let quantity = btn.nextElementSibling;
    let value = parseInt(quantity.innerText);

    if (value > 1) {
        quantity.innerText = value - 1;
    }
}