    /* 	Based in http://www2-fs.informatik.uni-tuebingen.de/~reinhard/krypto/English/4.5.1.e.html
		Created by Heukirne
	*/
	var i;
	var S;
	var R;
	var N = new Array();
	var X1 = new Array();
	var X2 = new Array();
	var T = new Array();
	
	function sortNumber(a, b) {return b-a;}
	
	function sumXN (arAux) {
		s = 0;
		for (j in arAux) {s += arAux[j]*N[j];}
		return s;
	}
	
	function tableX1Do(i,b) {
		X1[i]=b;
		if ((i+1)>=X1.length)  {
			T[sumXN(X1)] = X1;
			if (T[S]) {
				document.getElementById("result").innerHTML += S +" = " + T[S].join("") + "" + X2.join("") + "</br>";
				R = "done";
			}
			return false;
		} else {
			if (!(R.length>0)) tableX1Do(i+1,0);
			if (!(R.length>0)) tableX1Do(i+1,1);
		}
		return true;
	}
	
	function tableX2Do(i,b) {
		X2[i]=b;
		if ((i+1)>=X2.length)  {
			L = S - sumXN(X2);
			if (T[L]) {
				document.getElementById("result").innerHTML += S +" = " + T[L].join("") + "" + X2.join("") + "</br>";
				R = "done";
			}
			return false;
		} else {
			if (!(R.length>0)) tableX2Do(i+1,1);
			if (!(R.length>0)) tableX2Do(i+1,0);
		}
		return true;
	}
	
	function exec() {
		var d = new Date();
		var dTime = d.getTime();
		document.getElementById("result").innerHTML = "";
		R = "";
		X1 = new Array();
		X2 = new Array();
		T = new Array();
		N = document.getElementById("values").value.split(",");
		N.sort(sortNumber);
		document.getElementById("values").value = N.join(",");
		S = document.getElementById("sum").value;
		for (i=0;i<(N.length/2);i++) { X1[i]=0;}
		for (i=Math.ceil(N.length/2);i<N.length;i++) { X2[i]=0;}	
		document.getElementById("result").innerHTML += "Num. of elements: " + N.length + "</br>";
		tableX1Do(0,1);
		if (!(R.length>0)) tableX1Do(0,0);		
		if (!(R.length>0)) tableX2Do(Math.ceil(N.length/2),1);
		if (!(R.length>0)) tableX2Do(Math.ceil(N.length/2),0);
		if (!(R.length>0)) document.getElementById("result").innerHTML += "no subset found</br>";
		d = new Date();
		document.getElementById("result").innerHTML += "Time: " + (d.getTime() - dTime) + " ms</br>";
		document.getElementById("stats").innerHTML += N.length + "\t" + (d.getTime() - dTime) + "\n</br>";
		document.getElementById("execute").disabled = "";
	}
	
	function callExec() {
		document.getElementById("execute").disabled = "disabled";
		setTimeout('exec()', 0);
	}
