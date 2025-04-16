require('cypress-xpath');
describe('Acessando a página de login do BLL Compras', () => {
    it('Deve acessar a página de login com sucesso', () => {
        // Visita a página de login
        cy.visit('https://bllcompras.com/Home/Login');

        // Verifica se o título da página contém "Login"
        cy.get('b').should('have.text', 'Acesso ao usuário');

        // Verifica se o campo de usuário está visível
        cy.get('#Email').should('be.visible');

        // Insere o e-mail no campo de login
        cy.get('#Email').type('carolinaucv.licitacoes@gmail.com');

        // Chama a função para identificar os botões
        identificarBotoes('124578');

        // Verifica se o botão "Entrar" está visível
        cy.get('[onclick="doLogin()"]').should('be.visible');

        // Clica no botão "Entrar"
        cy.get('[onclick="doLogin()"]').click();

        // Clica no botão "Operador" na tela de aviso
        cy.get(':nth-child(3) > .tablebutton > .btn').click(); 

        // Verifica se o botão de fechar está visível
        cy.get('.close > span').should('be.visible');

        // Clica no botão de fechar
        cy.get('.close > span').click(); 

        // Verifica se o botão "Dia" está visível e clica
        cy.get('.fc-dayGridDay-button').should('be.visible').click();

        //
        cy.get('.fc-event-title').should('be.visible').then(($element) => {
            const texto = $element.text().trim(); // Remove espaços em branco
            cy.log('Texto do elemento: ' + texto); // Loga o texto do elemento
            cy.get('.fc-event-title').click(); // Clica no elemento
        });


    });

    // Função para identificar os botões presentes na tela
    function identificarBotoes(senha) {


        // Separa os caracteres da senha em um array
        const senhaArray = senha.split('');

        // Itera para identificar os botões na tela
        for (let i = 1; i <= 5; i++) { // Ajustado para começar de 1, pois XPath usa índices baseados em 1
            // Constrói o XPath dinamicamente com o índice
            const xpathSelector = `//tbody/tr[1]/td[1]/input[${i}]`;

            // Pega o texto do botão
            cy.xpath(xpathSelector).invoke('val').then((textoBotao) => {
            cy.log('Texto do botão: ' + textoBotao); // Loga o texto do botão

            // Verifica se o texto do botão corresponde ao próximo caractere da senha
            if (textoBotao && textoBotao.includes(senhaArray[0])) {
                cy.log(`Execução ${i}: O valor do botão corresponde a um caractere da senha`);
                
                // Clica no botão se o valor corresponder a um caractere da senha
                cy.xpath(xpathSelector).click();

                // Remove o caractere correspondente do array
                senhaArray.shift();
            } else {
                cy.log(`Execução ${i}: O valor do botão não corresponde a um caractere da senha`);
            }

            // Verifica se todos os caracteres da senha foram processados
            if (senhaArray.length === 0) {
                cy.log('Todos os caracteres da senha foram processados. Processo concluído com sucesso.');
                return; // Para a execução quando todos os caracteres forem processados
            }

            if (i === 5) { // Ajuste para garantir que seja exibido ao final do loop
                cy.log('Reiniciando o loop para processar os caracteres restantes...');
                identificarBotoes(senhaArray.join('')); // Reexecuta o loop com os caracteres restantes
            }


            });
        }




    }
});
