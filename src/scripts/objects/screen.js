const screen = {
  userProfile: document.querySelector(".profile-data"),

  renderUser(user) {
    this.userProfile.innerHTML = `<div class= "info">
                                    <img src ="${user.avatarUrl}" alt="Foto de Perfil"/>
                                      <div class="info-user">
                                        <h2>${user.name ?? "Nome não cadastrado"}</h2>
                                        <p>${user.bio ?? "Não possui bio cadastrado"}</p>
                                       <div class= "followers">
                                            <p>${user.followers} followers</p>
                                            <p>${user.following} following</p>
                                        </div>
                                          <p>${ user.location ?? "Não possui localização cadastrada" }</p>    
                                        </div>
                                   </div>`;

    let repositoriesItens = "";

    user.repositories.forEach(  (repo) => (repositoriesItens += 
                                          `<li><a href="${repo.html_url}" target=_blank>${repo.name}
                                                <ul>
                                                    <li> <i class="fa-solid fa-code-fork"></i>${repo.forks} /</li>
                                                    <li> <i class="fa-solid fa-eye"></i>${repo.watchers} /</li>
                                                    <li> <i class="fa-solid fa-laptop-code"></i>${repo.language} /</li>
                                                  <li> <i class="far fa-star"></i> ${repo.stargazers_count}</li>
                                                </ul>
                                                </a>
                                            </li>`)
    );
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItens}</ul>
                                     </div>`;
    }

    let eventsItens = "";

    user.eventos.forEach((event) => {
      let type = event.type;
      let commits = event.payload.commits;

      if (type === "PushEvent") {
                                       eventsItens += `
                                       <li class="event">
                                         <p>${event.repo.name}</p>
                                         <span>- ${commits[0].message}</span>
                                       </li>`;
                                     
      } else {
        eventsItens += `<li>
                          <p>${event.repo.name}</p> 
                          <span>- Evento de criação sem mensagem</span>
                         </li>`;
      }
    });
    if (user.eventos.length > 0) {
      this.userProfile.innerHTML += `<div class="events">
                                        <h2>Eventos</h2>
                                        <ul class="list">${eventsItens}</ul>  
                                    </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
