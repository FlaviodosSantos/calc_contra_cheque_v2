

function calculaContraCheque(entrada, tempo, tit, nivSup, numDependentes, protetor, sindicatos, emprestimos, ferias) {
  //pegando os inputs
  var entrada = document.getElementById("entrada").value;
  var tempo = document.getElementById("tempo").value;
  var tit = document.getElementById("porcentagem").value;
  var nivSup = document.getElementById("gratificacao").value;
  var numDependentes = Number(document.getElementById("dependentes").value);
  var protetor = document.getElementById("protetor").value;
  var sindicatos = Number(document.getElementById("sindicatos").value);
  var emprestimos = Number(document.getElementById("emprestimos").value);
  var ferias = document.getElementById("ferias").value;

  //calculando o salario do plano de cargos
  console.log("entrada " + entrada);
  var plano_de_cargos = calcula_plano(entrada, tempo);
  
  //calculando insalubridade
  var insa = calcula_insalubridade(plano_de_cargos);    

  //calculando o adicional de tempo de serviço
  var adts = calcula_tempo_seviço(plano_de_cargos, tempo);  

  //calculando o adicional de titulação
  var titulacao = calcula_titulacao(plano_de_cargos, tit);
  
  //verificando a gratificação de nivel superior
  var gratNivSup = verif_gratificacao(nivSup); 
  
  //verificando adicional de protetor
  var prot = verif_protetor(protetor);  
  
  //verificando desconto sindicatos
  var sind =  Math.trunc(plano_de_cargos) * 0.01 * sindicatos;  
  
  //verificando desconto de emprestimos
  var emprestimo = emprestimos;

  //calculando o salario bruto
  var bruto = calcula_sal_bruto(
    plano_de_cargos,
    insa,
    adts,
    titulacao,
    gratNivSup, 
    prot
  );    
  
  //verificando e calculando ferias
  var terco_ferias = verif_ferias(ferias, prot, bruto);
  
  
  // calculando bruto mais ferias
  var bruto_ferias = calcula_bruto_ferias(bruto, terco_ferias);

  //calcular inss
  var inss = calcula_inss(bruto, insa, prot);  

  //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução
  var irrf = calcula_irrf(bruto, inss, numDependentes, prot);  

  // Salario Liquido
  var liquido = calcula_sal_liquido(bruto, inss, irrf, emprestimo, sind, terco_ferias);  

  // setando no session storage
  // "banco de dados" temporario do browser
  sessionStorage.setItem("plano_de_cargos", plano_de_cargos)
  sessionStorage.setItem("insa", insa)
  sessionStorage.setItem("adts", adts)
  sessionStorage.setItem("titulacao", titulacao)
  sessionStorage.setItem("gratNivSup", gratNivSup)
  sessionStorage.setItem("bruto", bruto)
  sessionStorage.setItem("inss", inss);
  sessionStorage.setItem("irrf", irrf)
  sessionStorage.setItem("prot", prot)
  sessionStorage.setItem("sind", sind)
  sessionStorage.setItem("emprestimo", emprestimo)
  sessionStorage.setItem("liquido", liquido)
  sessionStorage.setItem("terco_ferias", terco_ferias)
  sessionStorage.setItem("bruto_ferias", bruto_ferias)

  return liquido;
}

function calcula_plano(entrada, tempo) {
  //calculando o salario do plano de cargos
  var capital = entrada;
  var taxaJuros = 5 / 100;
  var tempoAplicacao = Math.trunc(tempo / 5);
  var montante = Number((capital * Math.pow(1 + taxaJuros, tempoAplicacao)).toFixed(2));
 
  console.log("montante : " + montante);
  return montante;
}

function calcula_insalubridade(plano_de_cargos) {
  var insalubridade = Number((plano_de_cargos * (30 / 100)).toFixed(2));
  console.log("insalubridade :" + insalubridade);
  return insalubridade;
}

function calcula_tempo_seviço(plano_de_cargos, tempo) {
  var tempoAplicacao = Math.trunc(tempo / 5);
  var adts = Number((plano_de_cargos * ((tempoAplicacao * 5) / 100)).toFixed(2));
  console.log("adts : " + adts);
  return adts;
}

function calcula_titulacao(plano_de_cargos, tit) {
  var titulacao = Number(((plano_de_cargos * tit) / 100).toFixed(2));
  console.log("titulacao : " + titulacao);
  return titulacao;
}

function verif_gratificacao(nivSup) {
  if (nivSup == "s" || nivSup == "S") {
    var grat = 103.32;
  } else {
    grat = 0;
  }
  console.log("nivSup : " + grat);
  return grat;
}

function verif_protetor(protetor) {
  if (protetor == "s" || protetor == "S") {
    var grat_protetor = 50.00;
  } else {
    grat_protetor = 0;
  }
  console.log("protetor : " + grat_protetor);
  return grat_protetor;
}

function verif_ferias(ferias, prot, bruto) {
  if (ferias == "s" || ferias == "S"){
    // ( bruto - protetor ) / 3 
    var grat_ferias = Number(((bruto - prot)/3).toFixed(2));        
  } else {
    grat_ferias = 0;
  }
  console.log("grat ferias : " + grat_ferias)
  return grat_ferias;
}

function calcula_sal_bruto(plano_de_cargos, insa, adts, titulacao, gratNivSup, prot) {
  var bruto = Number((plano_de_cargos + insa + adts + titulacao + gratNivSup + prot).toFixed(2));
  console.log("bruto : " + bruto);
  return bruto;
}


function calcula_bruto_ferias(bruto, terco_ferias) {
  var bruto_ferias = bruto + terco_ferias;
  console.log("bruto : " + bruto);
  return bruto_ferias;
}

function calcula_inss(bruto, insa, prot) {
  var baseInss = bruto - insa - prot;
  var inss = 0;
  
  /* novo calculo 2025 */
    //1ªfaixa
  if (baseInss <= 1518.0) {    
    inss = baseInss * 0.075;

    //2ªfaixa
  } else if (baseInss > 1518.0 && baseInss <= 2793.88) {    
    inss = 113.85 + (baseInss - 1518.0) * 0.09;

    //3ªfaixa
  } else if (baseInss > 2793.88 && baseInss <= 4190.83) {    
    inss = 113.85 + 114.83 + (baseInss - 2793.88) * 0.12;

    //4ªfaixa
  } else if (baseInss > 4190.83 && baseInss <= 8157.41) {    
    inss = 113.85 + 114.83 + 167.63 + (baseInss - 4190.83) * 0.14;

    //5ªfaixa
  } else {
    inss = 975.57;
  }
  var insss = Number(inss.toFixed(2))
  console.log("inss: " + insss);

  return insss;
}

function calcula_irrf(bruto, inss, numDependentes, prot) {
  //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução

  //verificando os dependentes
  if (numDependentes == "") {
    numDependentes = 0;
  }
  console.log("numDependentes :" + numDependentes);

  var irrf = 0;
  // var baseIrrf = bruto - prot - inss - numDependentes * 189.59;

  // calculo 2025  
  // quando as deduções forem menor que 607.20 e salario menor que 5mil
  //  if (inss + numDependentes * 189.59 < 607.20 && bruto - prot < 5200) 
  if (inss + numDependentes * 189.59 < 607.20 ) {
    var baseIrrf = bruto - prot - 607.20;
  } else {
    baseIrrf = bruto - prot - inss - numDependentes * 189.59;
  }

  console.log("baseIrrf : " + baseIrrf);
  
  // calculo 2025
  // se numDependentes menor que 2 e salario menor que 5mil
  if (baseIrrf <= 2428.8) {
    irrf = 0;
  } else if (baseIrrf > 2428.81 && baseIrrf <= 2826.65) {
    irrf = baseIrrf * 0.075 - 182.16;
  } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
    irrf = baseIrrf * 0.15 - 394.16;
  } else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) {
    irrf = baseIrrf * 0.225 - 675.49;
  } else {
    irrf = baseIrrf * 0.275 - 908.73;
  }

  console.log(" irrf :" + irrf);

  return irrf;
}


function calcula_sal_liquido(bruto, inss, irrf, emprestimo, sind, terco_ferias) {
  var liquido = bruto + terco_ferias - inss - irrf - emprestimo - sind;
  console.log("liquido : " + liquido);
  return liquido;
}

