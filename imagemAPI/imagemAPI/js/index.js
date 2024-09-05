document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
        document.getElementById('usuarioId').textContent = usuarioId;
    } else {
        alert('Usuário não está logado.');
        window.location.href = 'usuario.html';
    }
});
async function carregarListaCasas() {
    try {
        const response = await fetch('http://localhost:5090/api/Imovel/Imoveis');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista de casas.');
        }
        const listaCasas = await response.json();
        const listaCasasElement = document.getElementById('listaCasas');

        for (const casa of listaCasas) {
            const listItem = document.createElement('li');
            listItem.className = 'casa';
            
            const imageResponse = await fetch(`http://localhost:5090/api/Imovel/Imoveis/${casa.id}/imagem`);
            let imageUrl = '';
            if (imageResponse.ok) {
                const blob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(blob);
            } else {
                imageUrl = 'default.jpg'; // Caminho para uma imagem padrão caso não exista imagem para o imóvel
            }

            listItem.innerHTML = `
                <img src="${imageUrl}"alt="Imagem do Imóvel"><br>
                <strong>Endereço:</strong> ${casa.endereço}<br>
                <strong>Descrição:</strong> ${casa.descrição}<br>
                <strong>IPTU:</strong> ${casa.iptu}<br>
                <strong>Condições:</strong> ${casa.condicoes}<br>
                <button onclick="verDetalhes(${casa.id})">Ver Detalhes</button>
                <hr>
            `;
            listaCasasElement.appendChild(listItem);
        }
    } catch (error) {
        console.error('Erro ao carregar lista de casas:', error);
        alert('Erro ao carregar lista de casas. Tente novamente mais tarde.');
    }
}

function verDetalhes(imovelId) {
    // Redirecionar para a página de detalhes do imóvel com o ID correspondente
    window.location.href = `detalhes.html?id=${imovelId}`;
}

// Carregar a lista de casas ao carregar a página
carregarListaCasas();