// O código usa o método document.getElementById() para recuperar elementos HTML com base em seus IDs exclusivos.
const emailInput = document.getElementById('Email'); // Representa o campo de entrada para o endereço de email do usuário.
const passwordInput = document.getElementById('password'); // Representa o campo de entrada para a senha do usuário.
const nameInput = document.getElementById('name'); // Representa o campo de entrada para o nome do usuário.
const CPFInput = document.getElementById('CPF'); // Representa o campo de entrada para o número de CPF (Cadastro de Pessoas Físicas) do usuário.
const data_nasInput = document.getElementById('data_nas'); // Representa o campo de entrada para a data de nascimento do usuário.
const CEPInput = document.getElementById('CEP'); // Representa o campo de entrada para o CEP (Código de Endereçamento Postal) do usuário.
const ruaInput = document.getElementById('rua'); // Representa o campo de entrada para o endereço da rua do usuário.
const numeroInput = document.getElementById('numero'); // Representa o campo de entrada para o número da casa do usuário.
const bairroInput = document.getElementById('bairro'); // Representa o campo de entrada para o bairro do usuário.
const complementoInput = document.getElementById('complemento'); // Representa o campo de entrada para qualquer informação adicional de endereço.
const cidadeInput = document.getElementById('cidade'); // Representa o campo de entrada para a cidade do usuário.
const estadoInput = document.getElementById('estado'); // Representa o campo de entrada para o estado do usuário.

const loginForm = document.getElementById('login_form');

// Validação de preenchimento de campos, CPF e E-mail
loginForm.addEventListener('submit', (event) => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields = [emailInput, passwordInput, nameInput, CPFInput, data_nasInput, CEPInput, ruaInput, numeroInput, bairroInput, cidadeInput, estadoInput];
    for (let field of requiredFields) {
        if (field.value.trim() === '') {
            event.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
            field.focus();
            return;
        }
    }

        // Verificação de E-mail válido
        if (!checarEmail(emailInput)) {
            event.preventDefault();
            return; // Impede o envio do formulário caso o e-mail seja inválido
        }
  
        // Verificação de CPF válido
        if (!validarCPF(CPFInput.value)) {
            event.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "CPF inválido!",
              });
            CPFInput.focus();
        }
    });
      
    // Função de validação de CPF
    function validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
  
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
  
        let soma = 0;
        let resto;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    
    // Valida o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
     }
      
    resto = (soma * 10) % 11;
      
    if (resto === 10 || resto === 11) {
        resto = 0;
     }
      
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
      
        return true;
    }
      