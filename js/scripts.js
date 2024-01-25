

function calculaContraCheque(entrada, tempo, tit, nivSup, numDependentes, protetor, sindicatos, emprestimos) {
  //pegando os inputs
  var entrada = document.getElementById("entrada").value;
  var tempo = document.getElementById("tempo").value;
  var tit = document.getElementById("porcentagem").value;
  var nivSup = document.getElementById("gratificacao").value;
  var numDependentes = Number(document.getElementById("dependentes").value);
  var protetor = document.getElementById("protetor").value;
  var sindicatos = Number(document.getElementById("sindicatos").value);
  var emprestimos = Number(document.getElementById("emprestimos").value);

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
  var sind =  plano_de_cargos * 0.01 * sindicatos;  
  
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

  //calcular inss
  var inss = calcula_inss(bruto, insa, prot);  

  //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução
  var irrf = calcula_irrf(bruto, inss, numDependentes, prot);  

  // Salario Liquido
  var liquido = calcula_sal_liquido(bruto, inss, irrf, emprestimo, sind);  

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

  return liquido;
}

function calcula_plano(entrada, tempo) {
  //calculando o salario do plano de cargos
  var capital = entrada;
  var taxaJuros = 5 / 100;
  var tempoAplicacao = Math.trunc(tempo / 5);
  var montante = Number(capital * Math.pow(1 + taxaJuros, tempoAplicacao));
 
  console.log("montante : " + montante);
  return montante;
}

function calcula_insalubridade(plano_de_cargos) {
  var insalubridade = Number(plano_de_cargos * (30 / 100));
  console.log("insalubridade :" + insalubridade);
  return insalubridade;
}

function calcula_tempo_seviço(plano_de_cargos, tempo) {
  var tempoAplicacao = Math.trunc(tempo / 5);
  var adts = Number(plano_de_cargos * ((tempoAplicacao * 5) / 100));
  console.log("adts : " + adts);
  return adts;
}

function calcula_titulacao(plano_de_cargos, tit) {
  var titulacao = Number((plano_de_cargos * tit) / 100);
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

function calcula_sal_bruto(plano_de_cargos, insa, adts, titulacao, gratNivSup, prot) {
  var bruto = plano_de_cargos + insa + adts + titulacao + gratNivSup + prot;
  console.log("bruto : " + bruto);
  return bruto;
}

function calcula_inss(bruto, insa, prot) {
  var baseInss = bruto - insa - prot;
  var inss = 0;
  /* calculo 2023
  if (baseInss <= 1320.0) {
    //1ªfaixa
    inss = baseInss * 0.075;
  } else if (baseInss > 1320.0 && baseInss <= 2571.29) {
    //2ªfaixa
    inss = 99.0 + (baseInss - 1320.0) * 0.09;
  } else if (baseInss > 2571.29 && baseInss <= 3856.94) {
    //3ªfaixa
    inss = 99.0 + 112.62 + (baseInss - 2571.29) * 0.12;
  } else if (baseInss > 3856.94 && baseInss <= 7507.49) {
    //4ªfaixa
    inss = 99.0 + 112.62 + 154.28 + (baseInss - 3856.94) * 0.14;
  } else {
    inss = 876.97;
  }*/

  /* novo calculo 2024 */
  if (baseInss <= 1412.0) {
    //1ªfaixa
    inss = baseInss * 0.075;
  } else if (baseInss > 1412.0 && baseInss <= 2666.68) {
    //2ªfaixa
    inss = 105.09 + (baseInss - 1412.0) * 0.09;
  } else if (baseInss > 2666.68 && baseInss <= 4000.03) {
    //3ªfaixa
    inss = 105.09 + 112.92 + (baseInss - 2666.68) * 0.12;
  } else if (baseInss > 4000.03 && baseInss <= 7507.49) {
    //4ªfaixa
    inss = 105.09 + 112.92 + 160.00 + (baseInss - 4000.03) * 0.14;
  } else {
    inss = 876.97;
  }
  console.log("inss: " + inss);

  return inss;
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

  // calculo 2024  
  // quando as deduções forem menor que 528 e salario menor que 5mil
  if (inss + numDependentes * 189.59 < 528 && bruto - prot < 5000) {
    var baseIrrf = bruto - prot - 528;
  } else {
    baseIrrf = bruto - prot - inss - numDependentes * 189.59;
  }

  console.log("baseIrrf : " + baseIrrf);

  /*if (baseIrrf <= 2112.0) {
    irrf = 0;
  } else if (baseIrrf > 2112.0 && baseIrrf <= 2826.65) {
    irrf = baseIrrf * 0.075 - 158.4;
  } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
    irrf = baseIrrf * 0.15 - 370.4;
  } else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) {
    irrf = baseIrrf * 0.225 - 651.73;
  } else {
    irrf = baseIrrf * 0.275 - 884.96;
  }*/

  // calculo 2024
  // se numDependentes menor que 2 e salario menor que 5mil
  if (baseIrrf <= 2112.0) {
    irrf = 0;
  } else if (baseIrrf > 2112.0 && baseIrrf <= 2826.65) {
    irrf = baseIrrf * 0.075 - 158.4;
  } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
    irrf = baseIrrf * 0.15 - 370.4;
  } else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) {
    irrf = baseIrrf * 0.225 - 651.73;
  } else {
    irrf = baseIrrf * 0.275 - 884.96;
  }

  console.log(" irrf :" + irrf);

  return irrf;
}


function calcula_sal_liquido(bruto, inss, irrf, emprestimo, sind) {
  var liquido = bruto - inss - irrf - emprestimo - sind;
  console.log("liquido : " + liquido);
  return liquido;
}

