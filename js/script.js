var colpito = 0;
var cuori = 2;
var round = 0;
var inizio = 0;
var id = null;
var selez;
var selez2;
var armaCambiata = 1;
var urlArma;
var urlSoldato;
var damage = -20;
var vinto = 0;

function soldatoMuovi() {
    if (inizio == 1) {
        var elem = document.getElementById("soldato");
        let maxX = 1000
        let minX = 20
        let maxY = 450
        let minY = 80
        var pos = Math.floor(Math.random() * (1000 - 20 + 1)) + 20
        var pos2 = Math.floor(Math.random() * (500 - 20 + 1)) + 20
        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY

        clearInterval(id);
        id = setInterval(frame);


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
                    elem.style.display = "block";
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
        danno.innerHTML = damage
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
            let selez3 = selez2.value + 2
            document.getElementById("armaIMG").src = `./img/${selez3}.png`
        }

        if (vita != 0) {
            vita = parseInt(vita) + damage
            document.getElementById("vita").textContent = vita
            if (vita <= 100 && vita >= 80) {
                document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
            } else if (vita <= 79 && vita >= 40) {
                document.getElementById("vita").style.backgroundColor = "yellow"
            } else {
                document.getElementById("vita").style.backgroundColor = "red"
            }
        }
        if (vita <= 0) {
            morto();
        }
    }
    setTimeout(() => {
        document.getElementById("danno").remove();
        document.getElementById("clp").remove();
        if (armaCambiata == 1) {
            document.getElementById("armaIMG").src = `./img/${selez2.value}.png`
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
        document.getElementById("soldato").style.height = `700px`
    }
    round = document.getElementById("round").textContent
    round = parseInt(round) + 1;
    document.getElementById("round").textContent = round
    let soldato = document.getElementById("soldato")
    let altezza = soldato.style.height
    altezza = parseInt(altezza)
    if (altezza > 60) {
        let altezza2 = altezza - 20
        document.getElementById("soldato").style.height = `${altezza2}px`
    }
    if (round == 20) {
        vinto = 1;
        document.getElementById("haiPerso").textContent = "HAI VINTO! Puoi continuare"
        document.getElementById("divAvviso").style.backgroundColor = "rgb(0, 255, 0)"
        document.getElementById("avviso").style.display = "flex"
        document.getElementById("haiPerso").style.fontSize = "40px"
        setTimeout(() => {
            document.getElementById("avviso").style.display = "none";
            document.getElementById("haiPerso").textContent = "HAI PERSO!"
            document.getElementById("divAvviso").style.backgroundColor = "red"
            document.getElementById("haiPerso").style.fontSize = "50px"
        }, 2500);
    }
    if (round == 5 || round == 10 || round == 15) {

        document.getElementById("avvisoArma").style.display = "flex"
        setTimeout(() => {
            document.getElementById("avvisoArma").style.display = "none"

        }, 1500);
    }
}

const respawn = () => {
    document.getElementById("vita").textContent = 100
    document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
    soldatoMuovi();
}

const wrong = () => {
    if (inizio == 1) {
        if (colpito == 0) {
            document.getElementById("cuori").children[cuori].style.display = "none";
            cuori = cuori - 1;
        }
        if (cuori == -1) {
            if (vinto == 0) {
                document.getElementById("avviso").style.display = "flex";
            }
            for (let i = 0; i < 3; i++) {
                document.getElementById("cuori").children[i].style.display = "block";
            }
            selez2.value = "pistola"
            damage = -20
            document.getElementById("armaIMG").src = `./img/${selez2.value}.png`
            round = 0;
            document.getElementById("round").textContent = round
            cuori = 2;
            document.getElementById("vita").textContent = 100
            document.getElementById("vita").style.backgroundColor = "rgb(0, 255, 0)"
            inizio = 0;
            document.getElementById("bottone").value = "RICOMINCIA"
            document.getElementById("soldato").style.display = "none"
            document.getElementById("soldato").style.height = `600px`
            setTimeout(() => { document.getElementById("avviso").style.display = "none"; }, 1200);
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
        document.getElementById("soldato").style.display = "none"
        soldatoMuovi();
    }
}
const arma = () => {
    selez = document.getElementById("selectArmi").value
}
const cambiaArma = () => {
    selez2 = document.getElementById("selectArmi")
    switch (selez2.value) {
        case "pistola":
            damage = -20;
            break;
        case "AK":
            if (round < 5) {
                cambiaScritta("Devi raggiungere il round 5 per utilizzare l'AK-47!", 3000);
                armaCambiata = 0
            } else {
                damage = -30;
                armaCambiata = 1
            }
            break;
        case "pompa":
            if (round < 10) {
                cambiaScritta("Devi raggiungere il round 10 per utilizzare il fucile a pompa!", 3000);
                armaCambiata = 0
            } else {
                damage = -40;
                armaCambiata = 1
            }
            break;
        case "cecchino":
            if (round < 15) {
                cambiaScritta("Devi raggiungere il round 15 per utilizzare il cecchino!", 3000);
                armaCambiata = 0
            } else {
                damage = -50;
                armaCambiata = 1
            }
            break;
    }
    if (armaCambiata == 1) {
        document.getElementById("armaIMG").src = `./img/${selez2.value}.png`
    } else {
        selez2.value = selez
    }

}
const cambiaScritta = (scritta, tempo) => {
    document.getElementById("haiPerso").textContent = scritta
    document.getElementById("divAvviso").style.backgroundColor = "blue"
    document.getElementById("avviso").style.display = "flex"
    document.getElementById("divAvviso").style.width = "50vw"
    setTimeout(() => {
        document.getElementById("avviso").style.display = "none";
        document.getElementById("haiPerso").textContent = "HAI PERSO!"
        document.getElementById("divAvviso").style.backgroundColor = "red"
        document.getElementById("divAvviso").style.width = "20vw"
    }, tempo);
}

const cambiaArma2 = () => {
    urlArma = document.getElementById("urlArma").value
    document.getElementById("armaIMG").src = urlArma
    armaCambiata = 0
    damage = -20;
}

const cambiaSoldato = () => {
    urlSoldato = document.getElementById("urlSoldato").value
    if (urlSoldato === "cuore") {
        cambiaScritta("Cuori aggiunti!", 700)
        cuori = 2;
        for (let i = 0; i < 3; i++) {
            document.getElementById("cuori").children[i].style.display = "block";
        }

    } else {
        document.getElementById("sold").src = urlSoldato
    }
}

const cambiaSoldato2 = () => {
    document.getElementById("sold").src = './img/soldato.png'
}
