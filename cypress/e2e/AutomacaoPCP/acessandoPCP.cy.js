require('cypress-xpath');

describe('Acessando o Portal de Compras Públicas', () => {

    it('Deve carregar a página inicial com sucesso', () => {
        cy.visit('https://operacao.portaldecompraspublicas.com.br/18/loginext/');

        cy.get('#onetrust-accept-btn-handler').click({ force: true });

        //Digitar o email no campo de login 
        cy.get('#nome').type("carolinaucv.licitacoes@gmail.com", { force: true });

        //Digitar a senha no campo de login
        cy.get('#senha').type("1q2w!Q@W", { force: true });

        //Clicar no botão Enviar
        cy.get('.btn-submit').click({ force: true });

        //Clica no item de menu Processo
        cy.get(':nth-child(4) > span > .menuClose').click({ force: true });

        //Clica no item Pesquisa
        cy.get(':nth-child(4) > ul > :nth-child(1) > a').click({ force: true });

        //Valida se o título da página contém "Pesquisa de Processo"
        cy.get('.centerBlockTitle').should('have.text', 'Processos');

        // Entrar com as informações no campo de pesquisa
        cy.get('#ttBusca').type("027/2025", { force: true });
        
        //cy.get('#slCD_UF').type("SP", { force: true });
        cy.get('#ttObjeto').type("Disco", { force: true });
        
        //Digitar enter para pesquisar
        cy.get('#ttObjeto').type('{enter}', { force: true });
        
        //Espera a tela carregar o elemento desejado
        cy.get('#searchTableSorter').should('be.visible', { timeout: 10000 });
        
        //Teclar pg-down para rolar a tela para baixo
        cy.get('body').type('{pageDown}', { force: true });

        //Seleciona o primeiro elemento da tabela no ícone cy.get('.actionIcons > img')
        cy.get('.actionIcons > img').first().click({ force: true });

        //Valida se o título da página contém "Dados do Processo"
        cy.get('.centerBlockTitle').should('have.text', 'Dados do Processo');

        //Teclar pg-down para rolar a tela para baixo
        cy.get('body').type('{pageDown}', { force: true });

        //Clica no botão de acesso a sessão pública
        cy.get('[href="/4/SessaoPublica/?ttCD_CHAVE=380022"]').click({ force: true });

        

        
    });
});