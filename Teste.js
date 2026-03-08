// Questão 08 - Função de somar números ímpares
function somaImpares(n) { //criação da função que vai receber um número qualquer
	let soma = 0 // Cria a variável para somar os valores ímpares.

	for (let i = 1; i <= n; i++) { //inicia o loop a partir do numero 1 e soma +1
        if (i % 2 !==0) { //Verificação se o resultado da soma NÃO é par.
			soma += i; //se for impar soma o valor de i (que é impar) à variável enquanto ainda não for igual ou maior que N
		}
	}
	return soma;
}
console.log(somaImpares(30));

// Questão 09 - Função de inverter palavras
function inverterPalavra(palavra) { //criação da função que recebe uma palavra qualquer
	let palavraInvertida = ""; //Cria a variável vazia.

	for (let i = palavra.length - 1; i >= 0; i--) { //inicia o loop a partir da ultima letra e subtrai 1 posição.
		palavraInvertida += palavra[i]; //A cada iteração ele adiciona uma letra, que no caso vai ser a última da palavra 
	}
	return palavraInvertida;

}

console.log(inverterPalavra("JavaScript"));

Questão 10 -  Resultado da função dividirNúmeros
function dividirNumeros(number1, number2) {
	try
	{
		if (number2 === 0)
			{
				throw new Error("Divisão por zero não é permitida.");
			}
		return number1 / number2;
	}
	catch (error)
	{
		return "Erro: " + error.message;
	}
	}
console.log(dividirNumeros(20, 2));
console.log(dividirNumeros(6, 0));
console.log(dividirNumeros(21, 3));
