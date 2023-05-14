
function resultado(){   
    //pegando os dados do session storage e setando os valores
    
    // setando o valor do plano de cargos
    var plano_de_cargos = Number(sessionStorage.getItem("plano_de_cargos"))
    document.getElementById("salario").value = plano_de_cargos.toFixed(2);
        
    //setando insalubridade
    var insa = Number(sessionStorage.getItem("insa"))
    document.getElementById("insalubridade").value = insa.toFixed(2);

    //setando o adicional de tempo de serviço
    var adts = Number(sessionStorage.getItem("adts"))
    document.getElementById("adts").value = adts.toFixed(2);

    //setando o adicional de titulação
    var titulacao = Number(sessionStorage.getItem("titulacao"))
    document.getElementById("titulacao").value = titulacao.toFixed(2);

    //verificando a gratificação de nivel superior
    var gratNivSup = Number(sessionStorage.getItem("gratNivSup"))
    document.getElementById("gratNivSup").value = gratNivSup;

    //setando o salario bruto
    var bruto = Number(sessionStorage.getItem("bruto"))
    document.getElementById("bruto").value = bruto.toFixed(2);

    //calcular inss
    var inss = Number(sessionStorage.getItem("inss"))
    document.getElementById("inss").value = inss.toFixed(2);

    //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução
    var irrf = Number(sessionStorage.getItem("irrf"))
    document.getElementById("irrf").value = irrf.toFixed(2);
    
    //informa a dedução de sindicato
    var sindicatos = Number(sessionStorage.getItem("sindicatos"))
    document.getElementById("sindicatos").value = sindicatos.toFixed(2);
    
    //informa a dedução de emprestimo
    var emprestimos = Number(sessionStorage.getItem("emprestimos"))
    document.getElementById("emprestimos").value = emprestimos.toFixed(2);

    // Salario Liquido
    var liquido = Number(sessionStorage.getItem("liquido"))
    document.getElementById("liquido").value = liquido.toFixed(2);
}

resultado();

