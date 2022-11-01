function update_values(){
    $('#value').load(document.URL +  ' #value');    //dynamic update with ajax GET request #value - from return in python
    console.log(intv_sec);

    clearInterval(chkh);
    intv_sec = document.getElementById('upd_interv').value*multiplier;
    chkh = setInterval(update_values, intv_sec);

}


var chkh = setInterval(update_values, intv_sec);