const token = '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';  // Substitua pelo seu token

document.getElementById('searchButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const userInfo = document.getElementById('userInfo');
    const reposDiv = document.getElementById('repos');
    const error = document.getElementById('error');

    if (!username) {
        error.textContent = 'Por favor, digite um nome de usuário.';
        error.classList.remove('hidden');
        userInfo.classList.add('hidden');
        reposDiv.classList.add('hidden');
        return;
    }

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!userResponse.ok) {
            throw new Error('Usuário não encontrado ou erro na requisição.');
        }

        const userData = await userResponse.json();
        document.getElementById('avatar').src = userData.avatar_url;
        document.getElementById('name').textContent = userData.name || 'Nome não disponível';
        document.getElementById('bio').textContent = userData.bio || 'Biografia não disponível';

        userInfo.classList.remove('hidden');
        error.classList.add('hidden');

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!reposResponse.ok) {
            throw new Error('Não foi possível recuperar os repositórios.');
        }

        const reposData = await reposResponse.json();
        const repoList = document.getElementById('repoList');
        repoList.innerHTML = '';
        reposData.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.textContent = repo.name;
            repoList.appendChild(listItem);
        });

        reposDiv.classList.remove('hidden');
    } catch (err) {
        error.textContent = err.message;
        error.classList.remove('hidden');
        userInfo.classList.add('hidden');
        reposDiv.classList.add('hidden');
    }
});
