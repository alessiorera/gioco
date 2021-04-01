var colpito = 0;
var cuori = 2;
var round = 0;
var inizio = 0;
var id = null;
var selez;
var armaCambiata = 1;
var urlArma;
var urlSoldato;

function soldatoMuovi() {
    if (inizio == 1) {
        var elem = document.getElementById("soldato");
        var pos = 0;
        var pos2 = 0
        let maxX = 1000
        let minX = 11
        let maxY = 400
        let minY = 11
        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY
        clearInterval(id);
        id = setInterval(frame, 1);

        function frame() {
            if (inizio == 1) {
                if (pos == x && pos2 == y) {
                    clearInterval(id);
                } else {
                    if (pos != x) {
                        if (pos > x) {
                            pos = pos - 1;
                        } else {
                            pos++;
                        }
                    } else {
                        x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
                    }
                    if (pos2 != y) {
                        if (pos2 > y) {
                            pos2 = pos2 - 1;
                        } else {
                            pos2++;
                        }

                    } else {
                        y = Math.floor(Math.random() * (maxY - minY + 1)) + minY
                    }
                    elem.style.top = pos2 + "px";
                    elem.style.left = pos + "px";
                }
            }
        }
    }
}


const hit = (e) => {
    if (inizio == 1) {
        colpito = 1;
        let vita = document.getElementById("vita").textContent
        let x = e.pageX - 100
        let y = e.pageY - 100
        let danno = document.createElement("div");
        let visuale = document.getElementById("visuale")
        danno.setAttribute("id", "danno")
        danno.setAttribute("onclick", "hit()")
        danno.innerHTML = "-20"
        visuale.appendChild(danno)
        danno.style.position = "absolute"
        danno.style.top = `${y}px`
        danno.style.left = `${x}px`
        let colpo = document.createElement("img");
        x = e.pageX
        y = e.pageY
        colpo.setAttribute("id", "clp")
        colpo.setAttribute("src", "./img/colpo.png")
        visuale.appendChild(colpo)
        colpo.style.position = "absolute"
        colpo.style.width = "40px"
        colpo.style.top = `${y}px`
        colpo.style.left = `${x}px`
        if (armaCambiata == 1) {
            let selez2 = selez.value + 2
            document.getElementById("armaIMG").src = `./img/${selez2}.png`
        }

        if (vita != 0) {
            vita = parseInt(vita) - 20
            document.getElementById("vita").textContent = vita
            if (vita <= 100 && vita >= 80) {
                document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
            } else if (vita <= 79 && vita >= 40) {
                document.getElementById("vita").style.backgroundColor = "yellow"
            } else {
                document.getElementById("vita").style.backgroundColor = "red"
            }
        }
        if (vita == 0) {
            morto();
        }
    }
    setTimeout(() => {
        document.getElementById("danno").remove();
        document.getElementById("clp").remove();
        if (armaCambiata == 1) {
            document.getElementById("armaIMG").src = `./img/${selez.value}.png`
        }
    }, 250);
}


const morto = () => {
    document.getElementById("soldato").style.display = "none"
    Upround();
    respawn();
}

const Upround = () => {
    if (round == 0) {
        document.getElementById("soldato").style.height = `500px`
    }
    round = document.getElementById("round").textContent
    round = parseInt(round) + 1;
    document.getElementById("round").textContent = round
    let soldato = document.getElementById("soldato")
    let altezza = soldato.style.height
    altezza = parseInt(altezza)
    if (altezza > 200) {
        altezza = altezza - round * 5
        document.getElementById("soldato").style.height = `${altezza}px`
    }
}

const respawn = () => {
    document.getElementById("vita").textContent = 100
    document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
    document.getElementById("soldato").style.display = "block"
    soldatoMuovi();
}

const wrong = () => {
    if (inizio == 1) {
        if (colpito == 0) {
            document.getElementById("cuori").children[cuori].style.display = "none";
            cuori = cuori - 1;
        }
        if (cuori == -1) {
            alert("HAI PERSO!");
            for (let i = 0; i < 3; i++) {
                document.getElementById("cuori").children[i].style.display = "block";
            }
            round = 0;
            document.getElementById("round").textContent = round
            cuori = 2;
            document.getElementById("vita").textContent = 100
            document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
            inizio = 0;
            document.getElementById("bottone").value = "RICOMINCIA"
            document.getElementById("soldato").style.height = `500px`
        }
        colpito = 0;
    }
}

const muove = (e) => {
    let y = e.pageY
    let test = y / 10
    if (test > -90 && test < 70)
        document.getElementById("arma").style.transform = `rotate(${-test}deg)`
}

const inizia = () => {
    if (inizio == 0) {
        inizio = 1;
        document.getElementById("bottone").value = "STOP"
        soldatoMuovi();
    } else {
        inizio = 0;
        document.getElementById("bottone").value = "CONTINUA"
        soldatoMuovi();
    }
}

const cambiaArma = () => {
    selez = document.getElementById("selectArmi")
    document.getElementById("armaIMG").src = `./img/${selez.value}.png`
    armaCambiata = 1
}

const cambiaArma2 = () => {
    urlArma = document.getElementById("urlArma").value
    document.getElementById("armaIMG").src = urlArma
    armaCambiata = 0
}

const cambiaSoldato = () => {
    urlSoldato = document.getElementById("urlSoldato").value
    document.getElementById("sold").src = urlSoldato
}

const cambiaSoldato2 = () => {
    document.getElementById("sold").src = './img/soldato.png'
}
