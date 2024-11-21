import FabricaUsuario from './FabricaUsuario.js';

//============================[Parte das funções de Operação]==================================

// Função para obter usuários do Local Storage
function obterUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

// Função para salvar usuários no Local Storage
function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Função para adicionar um novo usuário
function adicionarUsuario(usuario) {
    const usuarios = obterUsuarios();
    usuarios.push(usuario);
    salvarUsuarios(usuarios);
    renderizarTabelaUsuarios();
    alert('Usuário cadastrado com sucesso!');
}

// Função para deletar um usuário
window.deletarUsuario = function(index) {
    const confirmacao = confirm("Você realmente deseja deletar este item?");
    if (confirmacao) {
        let usuarios = obterUsuarios();
        usuarios.splice(index, 1);
        salvarUsuarios(usuarios);
        renderizarTabelaUsuarios();
    }
}

// Função para renderizar a tabela de usuários
function renderizarTabelaUsuarios() {
    const usuarios = obterUsuarios();
    const tabelaUsuarios = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
    tabelaUsuarios.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const row = tabelaUsuarios.insertRow();
        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.dataNascimento}</td>
            <td><button onclick="deletarUsuario(${index})">Deletar</button></td>
        `;
    });
}

//============================[Parte de Inicialização]==================================

document.addEventListener('DOMContentLoaded', () => {
    const formUsuario = document.getElementById('formUsuario');

    formUsuario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;

        const usuario = FabricaUsuario.criarUsuario(nome, email, telefone, dataNascimento);
        adicionarUsuario(usuario);
        formUsuario.reset();
    });

    renderizarTabelaUsuarios();
});