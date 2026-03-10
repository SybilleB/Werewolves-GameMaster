document.addEventListener("DOMContentLoaded", () => {
    const totalJoueursSpan = document.getElementById('total-joueurs');
    const btnReinitialiser = document.getElementById('btn-reinitialiser');
    const btnValiderRoles = document.getElementById('btn-valider-roles');
    const cartesSpeciales = document.querySelectorAll('.carte-role.special');
    const boutonsPlus = document.querySelectorAll('.btn-plus');
    const boutonsMoins = document.querySelectorAll('.btn-moins');

    const ecranParametres = document.getElementById('ecran-parametres');
    const btnValiderParametres = document.getElementById('btn-valider-parametres');
    const checkboxCapitaine = document.getElementById('checkbox-capitaine');

    const ecranCapitaine = document.getElementById('ecran-capitaine');
    const selectCapitaine = document.getElementById('select-capitaine');
    const btnValiderCapitaine = document.getElementById('btn-valider-capitaine');

    let captainEnabled = true;
    let nomCapitaine = null;

    const ecranChoixRoles = document.getElementById('ecran-choix-roles');
    const ecranSaisieJoueurs = document.getElementById('ecran-saisie-joueurs');
    const selectRoleJoueur = document.getElementById('role-joueur');
    const btnDemarrer = document.getElementById('btn-demarrer');
    const inputNomJoueur = document.getElementById('nom-joueur');
    const listeRoleJoueur = document.getElementById('liste-config-joueurs');
    const btnAjouterJoueur = document.getElementById('btn-ajouter');
    const selectTimer = document.getElementById('select-timer');

    const ecranNuit = document.getElementById('ecran-nuit');
    const contenuEtapeNuit = document.getElementById('contenu-etape-nuit');
    const btnEtapeSuivante = document.getElementById('btn-etape-suivante');
    const titreNuit = document.getElementById('titre-nuit');

    const zoneTimer = document.getElementById('zone-timer');
    const affichageChrono = document.getElementById('affichage-chrono');
    const barreTimer = document.getElementById('barre-timer');
    const btnStartTimer = document.getElementById('btn-start-timer');

    const zoneVoteVillage = document.getElementById('zone-vote-village');
    const selectElimineVillage = document.getElementById('select-elimine-village');

    const btnMasterView = document.getElementById('btn-master-view');
    const modalMasterView = document.getElementById('modal-master-view');
    const btnCloseMaster = document.getElementById('btn-close-master');
    const recapPlayersList = document.getElementById('recap-players-list');

    const zoneSentenceVillage = document.getElementById('zone-sentence-village');

    let jeuTermine = false;
    let typeVictoire = null;

    let rolesChoisis = {};
    let joueursPartie = [];
    let etapesDeCetteNuit = [];
    let indexEtapeActuelle = 0;

    let victimsTonight = [];
    let protectedByGuard = null;
    let crowTarget = null;
    let lovers = [];
    let isFirstNight = true;
    let nightCount = 1;
    let discussionTime = 180;
    let timerInterval = null;
    let enPhaseSentence = false;
    let hasRevotedToday = false;
    let lastProtectedByGuard = null;
    let protectedTonight = null;
    let attenteTirChasseur = false;
    let nomChasseurMort = "";

    let reelectionEnabled = false;
    let attenteSuccession = false;

    let witchHasSave = true;
    let witchHasKill = true;

    let mortsParAmour = [];

    document.getElementById('checkbox-capitaine').addEventListener('change', (e) => {
        const groupe = document.getElementById('groupe-option-reelection');
        if (e.target.checked) groupe.classList.remove('cache');
        else {
            groupe.classList.add('cache');
            document.getElementById('checkbox-reelection').checked = false;
        }
    });

    reelectionEnabled = document.getElementById('checkbox-reelection').checked;

    function majAffichage() {
        let total = 0;
        for (let r in rolesChoisis) total += rolesChoisis[r].quantite;
        totalJoueursSpan.textContent = total;

        ['loup', 'villageois'].forEach(id => {
            const qte = rolesChoisis[id] ? rolesChoisis[id].quantite : 0;
            const span = document.getElementById(`qte-${id}`);
            const card = document.querySelector(`.carte-role[data-role="${id}"]`);
            if (span) span.textContent = qte;
            if (card) qte > 0 ? card.classList.add('selectionne') : card.classList.remove('selectionne');
        });
    }

    cartesSpeciales.forEach(c => c.addEventListener('click', () => {
        const id = c.getAttribute('data-role'), nom = c.getAttribute('data-nom');
        if (rolesChoisis[id]) { delete rolesChoisis[id]; c.classList.remove('selectionne'); }
        else { rolesChoisis[id] = { nom, quantite: 1 }; c.classList.add('selectionne'); }
        majAffichage();
    }));

    boutonsPlus.forEach(b => b.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = b.getAttribute('data-cible'), nom = b.closest('.carte-role').getAttribute('data-nom');
        if (!rolesChoisis[id]) rolesChoisis[id] = { nom, quantite: 0 };
        rolesChoisis[id].quantite++;
        majAffichage();
    }));

    boutonsMoins.forEach(b => b.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = b.getAttribute('data-cible');
        if (rolesChoisis[id] && rolesChoisis[id].quantite > 0) {
            rolesChoisis[id].quantite--;
            if (rolesChoisis[id].quantite === 0) delete rolesChoisis[id];
        }
        majAffichage();
    }));

    btnReinitialiser.addEventListener('click', () => {
        rolesChoisis = {};
        cartesSpeciales.forEach(c => c.classList.remove('selectionne'));
        majAffichage();
    });

    btnValiderRoles.addEventListener('click', () => {
        let total = 0;
        for (let r in rolesChoisis) total += rolesChoisis[r].quantite;
        if (total === 0) return alert("Select roles first!");

        selectRoleJoueur.innerHTML = '<option value="">Role...</option>';
        for (let id in rolesChoisis) {
            const opt = document.createElement('option');
            opt.value = id; opt.textContent = `${rolesChoisis[id].nom} (x${rolesChoisis[id].quantite})`;
            selectRoleJoueur.appendChild(opt);
        }
        btnDemarrer.disabled = true;

        ecranChoixRoles.classList.add('cache');
        ecranParametres.classList.remove('cache');
    });

    btnValiderParametres.addEventListener('click', () => {
        discussionTime = parseInt(selectTimer.value);
        captainEnabled = checkboxCapitaine.checked;

        ecranParametres.classList.add('cache');
        ecranSaisieJoueurs.classList.remove('cache');
    });

    function mettreAJourNumeros() {
        const items = listeRoleJoueur.querySelectorAll('.joueur-item');
        items.forEach((item, index) => {
            const placeSpan = item.querySelector('.joueur-place');
            if (placeSpan) placeSpan.textContent = `#${index + 1}`;
        });
    }

    btnAjouterJoueur.addEventListener('click', () => {
        const nom = inputNomJoueur.value.trim(), id = selectRoleJoueur.value;
        if (!nom || !id) return;

        const nouveauJoueur = { nom, roleId: id, roleNom: rolesChoisis[id].nom, enVie: true };
        joueursPartie.push(nouveauJoueur);

        const li = document.createElement('li');
        li.className = 'joueur-item';

        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span class="joueur-place" style="background:rgba(187,134,252,0.2); color:var(--accent); padding:4px 8px; border-radius:6px; font-weight:bold;"></span>
                <div><strong>${nom}</strong><br><small>${rolesChoisis[id].nom}</small></div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="btn-up" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">⬆️</button>
                <button class="btn-down" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">⬇️</button>
                <button class="btn-supprimer-joueur" style="background:none; border:none; cursor:pointer; font-size:1.2rem; color:var(--rouge-sang);">✖</button>
            </div>
        `;
        listeRoleJoueur.appendChild(li);

        mettreAJourNumeros();

        const btnDelete = li.querySelector('.btn-supprimer-joueur');
        btnDelete.addEventListener('click', () => {
            joueursPartie = joueursPartie.filter(j => j.nom !== nom);
            li.remove();

            mettreAJourNumeros();

            rolesChoisis[id].quantite++;

            let optionExistante = false;
            for (let i = 0; i < selectRoleJoueur.options.length; i++) {
                if (selectRoleJoueur.options[i].value === id) {
                    selectRoleJoueur.options[i].text = `${rolesChoisis[id].nom} (x${rolesChoisis[id].quantite})`;
                    optionExistante = true;
                    break;
                }
            }
            if (!optionExistante) {
                const opt = document.createElement('option');
                opt.value = id;
                opt.textContent = `${rolesChoisis[id].nom} (x${rolesChoisis[id].quantite})`;
                selectRoleJoueur.appendChild(opt);
            }

            btnDemarrer.disabled = true;
            btnAjouterJoueur.disabled = false;
        });

        const btnUp = li.querySelector('.btn-up');
        btnUp.addEventListener('click', () => {
            const index = joueursPartie.findIndex(j => j.nom === nom);
            if (index > 0) {
                const temp = joueursPartie[index];
                joueursPartie[index] = joueursPartie[index - 1];
                joueursPartie[index - 1] = temp;

                li.parentNode.insertBefore(li, li.previousElementSibling);

                mettreAJourNumeros();
            }
        });

        const btnDown = li.querySelector('.btn-down');
        btnDown.addEventListener('click', () => {
            const index = joueursPartie.findIndex(j => j.nom === nom);
            if (index < joueursPartie.length - 1) {
                const temp = joueursPartie[index];
                joueursPartie[index] = joueursPartie[index + 1];
                joueursPartie[index + 1] = temp;

                li.parentNode.insertBefore(li.nextElementSibling, li);

                mettreAJourNumeros();
            }
        });

        rolesChoisis[id].quantite--;
        if (rolesChoisis[id].quantite === 0) {
            selectRoleJoueur.remove(selectRoleJoueur.selectedIndex);
            selectRoleJoueur.value = "";
        } else {
            selectRoleJoueur.options[selectRoleJoueur.selectedIndex].text = `${rolesChoisis[id].nom} (x${rolesChoisis[id].quantite})`;
        }

        inputNomJoueur.value = "";
        inputNomJoueur.focus();

        if (selectRoleJoueur.options.length === 1) {
            btnDemarrer.disabled = false;
            btnAjouterJoueur.disabled = true;
        }
    });

    btnDemarrer.addEventListener('click', () => {
        ecranSaisieJoueurs.classList.add('cache');
        ecranSaisieJoueurs.style.display = "none";

        if (captainEnabled) {
            ecranNuit.classList.add('cache');
            ecranNuit.style.display = "none";

            let optionsCapitaine = '<option value="">Who is elected?</option>';
            joueursPartie.forEach(j => {
                optionsCapitaine += `<option value="${j.nom}">${j.nom}</option>`;
            });
            selectCapitaine.innerHTML = optionsCapitaine;

            btnValiderCapitaine.disabled = true;
            ecranCapitaine.classList.remove('cache');
            ecranCapitaine.style.display = "block";
        } else {
            ecranCapitaine.classList.add('cache');
            ecranCapitaine.style.display = "none";

            ecranNuit.classList.remove('cache');
            ecranNuit.style.display = "block";
            preparerEtapesNuit();
        }
    });

    selectCapitaine.addEventListener('change', () => {
        btnValiderCapitaine.disabled = (selectCapitaine.value === "");
    });

    btnValiderCapitaine.addEventListener('click', () => {
        const cap = selectCapitaine.value;
        if (!cap) return alert("Please select a captain!");

        nomCapitaine = cap;
        ecranCapitaine.classList.add('cache');
        ecranCapitaine.style.display = "none";

        ecranNuit.classList.remove('cache');
        ecranNuit.style.display = "block";

        preparerEtapesNuit();
    });

    function lancerTimer(duree) {
        clearInterval(timerInterval);
        let tempsRestant = duree;
        barreTimer.style.width = "100%";
        barreTimer.style.backgroundColor = "var(--accent)";

        timerInterval = setInterval(() => {
            tempsRestant--;
            const mins = Math.floor(tempsRestant / 60);
            const secs = tempsRestant % 60;
            affichageChrono.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

            const pourcentage = (tempsRestant / duree) * 100;
            barreTimer.style.width = pourcentage + "%";

            if (tempsRestant <= 10) {
                barreTimer.style.backgroundColor = "var(--rouge-sang)";
                affichageChrono.style.color = "var(--rouge-sang)";
            }

            if (tempsRestant <= 0) {
                clearInterval(timerInterval);
                affichageChrono.textContent = "TIME'S UP!";
            }
        }, 1000);
    }

    btnStartTimer.addEventListener('click', () => {
        lancerTimer(discussionTime);
        btnStartTimer.disabled = true;
        btnStartTimer.textContent = "Running...";
    });

    function preparerEtapesNuit() {
        document.body.classList.remove('theme-jour');
        etapesDeCetteNuit = [];
        if (isFirstNight && joueursPartie.some(j => j.roleId === 'cupidon' && j.enVie)) {
            etapesDeCetteNuit.push({ id: 'cupidon', nom: '🏹 Cupid' }, { id: 'lovers', nom: '💕 The Lovers' });
        }
        if (joueursPartie.some(j => j.roleId === 'voyante' && j.enVie)) etapesDeCetteNuit.push({ id: 'voyante', nom: '👁️ The Seer' });
        if (joueursPartie.some(j => j.roleId === 'garde' && j.enVie)) etapesDeCetteNuit.push({ id: 'garde', nom: '🛡️ The Guard' });
        if (joueursPartie.some(j => j.roleId === 'loup' && j.enVie)) etapesDeCetteNuit.push({ id: 'loup', nom: '🐺 The Werewolves' });
        if (joueursPartie.some(j => j.roleId === 'sorciere' && j.enVie)) etapesDeCetteNuit.push({ id: 'sorciere', nom: '🧙‍♀️ The Witch' });
        if (joueursPartie.some(j => j.roleId === 'corbeau' && j.enVie)) etapesDeCetteNuit.push({ id: 'corbeau', nom: '🐦‍⬛ The Crow' });

        etapesDeCetteNuit.push({ id: 'matin', nom: 'Morning' });
        indexEtapeActuelle = 0;
        victimsTonight = [];
        mortsParAmour = [];
        protectedByGuard = null;
        crowTarget = null;
        hasRevotedToday = false;
        afficherEtapeNuit();
    }

    function afficherEtapeNuit() {
        if (btnEtapeSuivante) btnEtapeSuivante.disabled = false;

        contenuEtapeNuit.classList.remove('cache');
        contenuEtapeNuit.style.display = "";

        zoneVoteVillage.classList.add('cache');
        zoneVoteVillage.style.display = "none";

        btnEtapeSuivante.textContent = "NEXT";
        btnEtapeSuivante.classList.remove('cache');

        const etape = etapesDeCetteNuit[indexEtapeActuelle];

        if (etape.id === 'matin') {
            titreNuit.textContent = `☀️ Day ${nightCount}`;
        } else {
            titreNuit.textContent = `🌙 Night ${nightCount}`;
        }
        titreNuit.className = "titre-nuit-etape";

        const optionsVivants = joueursPartie.filter(j => j.enVie).map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');
        const joueursDeLeEtape = joueursPartie.filter(j => j.roleId === etape.id && j.enVie);
        const nomsDesJoueurs = joueursDeLeEtape.map(j => j.nom).join(', ');

        // Reset du Timer
        zoneTimer.classList.add('cache');
        zoneTimer.style.display = "none";
        clearInterval(timerInterval);
        btnStartTimer.disabled = false;
        btnStartTimer.textContent = "Start Timer";
        affichageChrono.style.color = "var(--accent)";

        let html = `<div class="etape-container">`;
        if (etape.id !== 'matin') {
            html += `<div class="etape-role">${etape.nom}</div>`;
        }
        if (etape.id !== 'matin' && etape.id !== 'lovers' && nomsDesJoueurs) {
            if (etape.id == 'loup') {
                html += `<div class="etape-joueurs">Player(s): <strong>${nomsDesJoueurs}</strong></div>`;
            } else {
                html += `<div class="etape-joueurs">Player: <strong>${nomsDesJoueurs}</strong></div>`;
            }
        }

        switch (etape.id) {
            case 'cupidon':
                html += `
                    <div class="action-mj">
                        <p class="info-bulle">Cupid chooses the two lovers:</p>
                        <div class="lovers-selection">
                            <select id="l1">
                                <option value="">Lover 1...</option>
                                ${optionsVivants}
                            </select>
                            <div class="heart-icon">❤️</div>
                            <select id="l2">
                                <option value="">Lover 2...</option>
                                ${optionsVivants}
                            </select>
                        </div>
                    </div>`;

                setTimeout(() => {
                    const sel1 = document.getElementById('l1');
                    const sel2 = document.getElementById('l2');

                    if (sel1 && sel2) {
                        const updateOptions = () => {
                            const val1 = sel1.value;
                            const val2 = sel2.value;

                            Array.from(sel2.options).forEach(opt => {
                                if (opt.value === "") return;
                                opt.style.display = (opt.value === val1) ? "none" : "block";
                            });

                            Array.from(sel1.options).forEach(opt => {
                                if (opt.value === "") return;
                                opt.style.display = (opt.value === val2) ? "none" : "block";
                            });
                        };

                        sel1.addEventListener('change', updateOptions);
                        sel2.addEventListener('change', updateOptions);
                    }
                }, 0);
                break;
            case 'lovers':
                const texteLovers = (lovers.length > 0) ? lovers.join(' & ') : "None selected";
                html += `<div class="etape-joueurs">Lovers: <strong class="text-gold">${texteLovers}</strong></div><p>They recognize each other.</p>`;
                break;
            case 'voyante':
                const optionsCiblesSeer = joueursPartie
                    .filter(j => j.enVie && j.roleId !== 'voyante')
                    .map(j => `<option value="${j.nom}">${j.nom}</option>`)
                    .join('');

                html += `
                    <div class="action-mj">
                        <p class="info-bulle">Who do they inspect tonight?</p>
                        <select id="seer-target">
                            <option value="">Select target...</option>
                            ${optionsCiblesSeer}
                        </select>
                        <div id="seer-result-container"></div>
                    </div>`;

                setTimeout(() => {
                    const sel = document.getElementById('seer-target');

                    if (btnEtapeSuivante) btnEtapeSuivante.disabled = true;

                    if (sel) {
                        sel.addEventListener('change', (e) => {
                            const target = joueursPartie.find(j => j.nom === e.target.value);
                            const container = document.getElementById('seer-result-container');

                            if (target) {
                                container.innerHTML = `
                                    <div class="seer-result">
                                        <b>${target.roleNom}</b>
                                    </div>`;
                                if (btnEtapeSuivante) btnEtapeSuivante.disabled = false;
                            } else {
                                container.innerHTML = "";
                                if (btnEtapeSuivante) btnEtapeSuivante.disabled = true;
                            }
                        });
                    }
                }, 0);
                break;
            case 'garde':
                let optionsGarde = '<option value="" disabled selected>Select a player to protect...</option>';

                const survivantsGarde = joueursPartie.filter(j => j.enVie);

                survivantsGarde.forEach(j => {
                    if (j.nom === lastProtectedByGuard) {
                        optionsGarde += `<option value="${j.nom}" disabled>${j.nom} (Protected last night)</option>`;
                    } else {
                        optionsGarde += `<option value="${j.nom}">${j.nom}</option>`;
                    }
                });

                html += `
                    <p class="info-bulle">The Guard must choose a player to protect from the wolves, not the same person twice in a row.</p>
                    <select id="select-garde">
                        ${optionsGarde}
                    </select>
                `;
                break;
            case 'loup':
                const optionsProies = joueursPartie
                    .filter(j => j.enVie)
                    .map(j => `<option value="${j.nom}">${j.nom}</option>`)
                    .join('');

                html += `
                    <div class="action-mj">
                        <p class="info-bulle">The Werewolves must choose a prey:</p>
                        <select id="kill">
                            <option value="">Select a victim...</option>
                            ${optionsProies}
                        </select>
                    </div>`;

                setTimeout(() => {
                    const sel = document.getElementById('kill');
                    if (btnEtapeSuivante) btnEtapeSuivante.disabled = true;

                    if (sel) {
                        sel.addEventListener('change', (e) => {
                            if (btnEtapeSuivante) {
                                btnEtapeSuivante.disabled = (e.target.value === "");
                            }
                        });
                    }
                }, 0);
                break;
            case 'sorciere':
                html += `
                    <div class="action-mj">
                        <div class="parametres-groupe potion-group">
                            <p class="parametre-titre">💖 Potion of Life :</p>
                            ${witchHasSave ? `
                                <p class="witch-info">
                                    Target of the wolves: <span class="witch-target">${victimsTonight.length > 0 ? victimsTonight.join(', ') : 'Nobody'}</span>
                                </p>
                                <select id="witch-save">
                                    <option value="">Don't use</option>
                                    ${victimsTonight.map(v => `<option value="${v}">${v}</option>`).join('')}
                                </select>
                            ` : `<p class="potion-used">❌ Already used</p>`}
                        </div>

                        <div class="parametres-groupe">
                            <p class="parametre-titre">💀 Potion of Death :</p>
                            ${witchHasKill ? `
                                <select id="witch-kill">
                                    <option value="">Don't use</option>
                                    ${joueursPartie.filter(j => j.enVie).map(j => `<option value="${j.nom}">${j.nom}</option>`).join('')}
                                </select>
                            ` : `<p class="potion-used">❌ Already used</p>`}
                        </div>
                    </div>
                `;
                break;
            case 'corbeau':
                const optionsObligatoires = joueursPartie
                    .filter(j => j.enVie)
                    .map(j => `<option value="${j.nom}">${j.nom}</option>`)
                    .join('');

                html += `
                    <div class="action-mj">
                        <p class="info-bulle">The Crow must curse a player tonight:</p>
                        <select id="curse">
                            <option value="">Select a target...</option>
                            ${optionsObligatoires}
                        </select>
                    </div>`;

                setTimeout(() => {
                    const sel = document.getElementById('curse');
                    if (btnEtapeSuivante) btnEtapeSuivante.disabled = true;

                    if (sel) {
                        sel.addEventListener('change', (e) => {
                            if (btnEtapeSuivante) {
                                btnEtapeSuivante.disabled = (e.target.value === "");
                            }
                        });
                    }
                }, 0);
                break;
            case 'matin':
                document.body.classList.add('theme-jour');

                victimsTonight.forEach(nom => tuerJoueur(nom));

                if (btnEtapeSuivante) {
                    if (jeuTermine) {
                        btnEtapeSuivante.innerHTML = "SHOW VICTORY";
                    } else {
                        btnEtapeSuivante.innerHTML = "Proceed to council";
                    }
                    btnEtapeSuivante.classList.remove('cache');
                    btnEtapeSuivante.style.display = "block";
                }

                const tamer = joueursPartie.find(j => j.roleId === 'montreur' && j.enVie);
                let bearMsg = "";
                if (tamer) {
                    const idx = joueursPartie.indexOf(tamer);
                    const left = joueursPartie[(idx - 1 + joueursPartie.length) % joueursPartie.length];
                    const right = joueursPartie[(idx + 1) % joueursPartie.length];
                    const growl = (left.roleId === 'loup' || right.roleId === 'loup');

                    bearMsg = growl ?
                        `<div class="bear-growl">
                            <span class="event-icon">🐻</span>
                            <div><strong>The Bear Growls!</strong> A wolf is nearby...</div>
                        </div>` :
                        `<div class="bear-silent">🐾 The Bear remains peaceful.</div>`;
                }

                let htmlMorts = "";
                if (victimsTonight.length > 0) {
                    htmlMorts = victimsTonight.map(nom => {
                        const joueur = joueursPartie.find(p => p.nom === nom);
                        const coeur = mortsParAmour.includes(nom) ? ' ❤️' : '';

                        return `<div class="annonce-mort cause-classique">
                                    <span class="annonce-mort-nom">${nom}${coeur}</span>
                                    <span class="annonce-mort-role">Role: ${joueur ? joueur.roleNom : 'Unknown'}</span>
                                </div>`;
                    }).join('');
                } else {
                    htmlMorts = `<div class="safe-night">☀️ Safe night! No one died.</div>`;
                }

                const crowHtml = crowTarget ? `
                    <div class="crow-mark">
                        <span class="event-icon">🐦‍⬛</span>
                        <div>
                            <strong>Crow's Mark</strong>
                            <span class="crow-target-name">${crowTarget}</span>
                            <span class="crow-text-info">starts with 1 vote against them.</span>
                        </div>
                    </div>` : '';

                let roleEventsHtml = bearMsg + crowHtml;

                if (roleEventsHtml !== "") {
                    roleEventsHtml = `<hr class="separator-dots">` + roleEventsHtml;
                } else if (!attenteTirChasseur && !attenteSuccession) {
                    roleEventsHtml = `
                        <hr class="separator-dots">
                        <div class="no-events-night">
                            <span class="event-icon">🍃</span>
                            <div>
                                <strong>No other events</strong><br>
                                The village wakes up without further disturbances.
                            </div>
                        </div>
                    `;
                }

                html += `
                    <div id="ecran-morning-news">
                        <div class="morning-news-container">
                            ${htmlMorts}
                            ${roleEventsHtml}
                        </div>
                    </div>
                `;

                if (attenteTirChasseur || attenteSuccession) {
                    if (btnEtapeSuivante) btnEtapeSuivante.style.display = "none";

                    if (attenteTirChasseur) html += gererTirChasseur();
                    if (attenteSuccession) html += gererSuccessionCapitaine();
                } else {
                    if (btnEtapeSuivante) {
                        btnEtapeSuivante.innerHTML = jeuTermine ? "SHOW VICTORY" : "Proceed to council";
                        btnEtapeSuivante.style.display = "block";
                    }
                }

                const survivantsReels = joueursPartie.filter(j => j.enVie);
                let optionsVote = '<option value="">Nobody (Tie / Skip)</option>';
                optionsVote += survivantsReels.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

                if (selectElimineVillage) {
                    selectElimineVillage.innerHTML = optionsVote;
                }
                break;
        }
        contenuEtapeNuit.innerHTML = html + `</div>`;
    }

    btnEtapeSuivante.addEventListener('click', () => {

        if (jeuTermine && typeVictoire) {
            afficherEcranVictoire(typeVictoire);
            typeVictoire = null;
            return;
        }

        if (enPhaseSentence) {
            lancerNuitSuivante();
            return;
        }

        const etape = etapesDeCetteNuit[indexEtapeActuelle];

        if (etape.id === 'matin') {
            const ecranNews = document.getElementById('ecran-morning-news');

            if (ecranNews && !ecranNews.classList.contains('cache')) {
                ecranNews.classList.add('cache');
                if (contenuEtapeNuit) contenuEtapeNuit.classList.add('cache');
                if (titreNuit) titreNuit.innerHTML = `☀️ Village Council`;
                if (zoneTimer) {
                    zoneTimer.classList.remove('cache');
                    zoneTimer.style.display = "block";
                    const mins = Math.floor(discussionTime / 60);
                    const secs = discussionTime % 60;
                    affichageChrono.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                }
                if (zoneVoteVillage) {
                    zoneVoteVillage.classList.remove('cache');
                    zoneVoteVillage.style.display = "block";
                }
                btnEtapeSuivante.innerHTML = "Proceed";
                return;
            }

            const elimineVillage = selectElimineVillage.value;

            if (!elimineVillage && !hasRevotedToday) {
                hasRevotedToday = true;
                titreNuit.innerHTML = `⚖️ Revote`;
                if (discussionTime > 0) {
                    const mins = Math.floor(discussionTime / 60);
                    const secs = discussionTime % 60;
                    affichageChrono.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    btnStartTimer.disabled = false;
                    btnStartTimer.textContent = "Start Timer";
                }
                return;
            }

            const tousLesMorts = [...victimsTonight];
            if (elimineVillage && !tousLesMorts.includes(elimineVillage)) {
                tousLesMorts.push(elimineVillage);
            }

            tousLesMorts.forEach(nom => tuerJoueur(nom));

            // --- NOUVEAU : On prépare la liste de TOUS les morts du conseil ---
            let mortsDuConseil = [];
            if (elimineVillage) {
                mortsDuConseil.push(elimineVillage);
                // Si l'éliminé est amoureux, on ajoute son partenaire à l'affichage
                if (lovers.includes(elimineVillage)) {
                    const partnerNom = lovers.find(n => n !== elimineVillage);
                    mortsDuConseil.push(partnerNom);
                }
            }

            enPhaseSentence = true;
            titreNuit.style.display = "none";
            contenuEtapeNuit.style.display = "none";
            zoneVoteVillage.style.display = "none";
            zoneTimer.style.display = "none";

            let htmlSentence = `<h2 class="titre-nuit-etape">☀️ Village Council</h2>`;
            htmlSentence += `<div class="etape-container"><div class="mort-conseil-wrapper">`;

            if (mortsDuConseil.length > 0) {
                htmlSentence += `<p class="resultat-conseil">The village has decided</p>`;

                mortsDuConseil.forEach(nomMort => {
                    const joueurObj = joueursPartie.find(p => p.nom === nomMort);
                    const coeur = mortsParAmour.includes(nomMort) ? ' ❤️' : '';

                    htmlSentence += `
                        <div class="annonce-mort cause-classique">
                            <span class="annonce-mort-nom">${nomMort}${coeur}</span>
                            <span class="annonce-mort-role">Role: ${joueurObj ? joueurObj.roleNom : 'Unknown'}</span>
                        </div>`;
                });
            } else {
                htmlSentence += `
                    <div class="no-death-council">
                        <span class="no-death-icon">⚖️</span>
                        <p>Equality or skip: <strong>No one was executed.</strong></p>
                    </div>`;
            }
            htmlSentence += `</div></div>`;

            zoneSentenceVillage.innerHTML = htmlSentence;
            zoneSentenceVillage.classList.remove('cache');
            zoneSentenceVillage.style.display = "block";

            if (attenteTirChasseur || attenteSuccession) {
                btnEtapeSuivante.style.display = "none";

                if (attenteTirChasseur) zoneSentenceVillage.innerHTML += gererTirChasseur();
                if (attenteSuccession) zoneSentenceVillage.innerHTML += gererSuccessionCapitaine();
            } else {
                if (jeuTermine) {
                    btnEtapeSuivante.innerHTML = "SHOW VICTORY";
                } else {
                    btnEtapeSuivante.innerHTML = "NEXT NIGHT";
                }
                btnEtapeSuivante.style.display = "block";
            }

            enPhaseSentence = true;

            return;
        }

        if (etape.id === 'cupidon') {
            const v1 = document.getElementById('l1')?.value;
            const v2 = document.getElementById('l2')?.value;
            if (v1 && v2 && v1 !== v2) {
                lovers = [v1, v2];
            } else if (v1 || v2) {
                alert("Select 2 different lovers.");
                return;
            }

        } else if (etape.id === 'garde') {
            const selectGarde = document.getElementById('select-garde');
            if (selectGarde) {
                const joueurChoisi = selectGarde.value;
                if (!joueurChoisi) {
                    alert("The Guard MUST protect someone!");
                    return;
                }
                protectedTonight = joueurChoisi;
                lastProtectedByGuard = joueurChoisi;
            }

        } else if (etape.id === 'loup') {
            const selectLoups = document.getElementById('select-loups') || document.getElementById('kill');
            if (selectLoups) {
                const k = selectLoups.value;
                if (k && k !== protectedTonight) {
                    victimsTonight.push(k);
                }
            }

        } else if (etape.id === 'sorciere') {
            const selectSave = document.getElementById('witch-save');
            const selectKill = document.getElementById('witch-kill');

            if (selectSave && selectSave.value) {
                const nomASauver = selectSave.value;
                victimsTonight = victimsTonight.filter(v => v !== nomASauver);
                witchHasSave = false;
            }

            if (selectKill && selectKill.value) {
                const nomATuer = selectKill.value;
                if (!victimsTonight.includes(nomATuer)) {
                    victimsTonight.push(nomATuer);
                }
                witchHasKill = false;
            }
        } else if (etape.id === 'corbeau') {
            const selectCrow = document.getElementById('curse');
            if (selectCrow) {
                crowTarget = selectCrow.value || null;
            }
        }

        indexEtapeActuelle++;

        if (indexEtapeActuelle < etapesDeCetteNuit.length && etapesDeCetteNuit[indexEtapeActuelle].id === 'matin') {
            const baseVictims = [...victimsTonight];
            baseVictims.forEach(nom => {
                if (lovers.includes(nom)) {
                    const partnerNom = lovers.find(n => n !== nom);
                    if (!victimsTonight.includes(partnerNom)) {
                        victimsTonight.push(partnerNom);
                        if (!mortsParAmour.includes(partnerNom)) mortsParAmour.push(partnerNom);
                    }
                }
            });
        }

        afficherEtapeNuit();
    });

    function lancerNuitSuivante() {
        enPhaseSentence = false;
        zoneSentenceVillage.classList.add('cache');
        zoneSentenceVillage.style.display = "none";

        titreNuit.style.display = "";
        contenuEtapeNuit.style.display = "";

        isFirstNight = false;
        nightCount++;
        titreNuit.textContent = `Night ${nightCount}`;

        preparerEtapesNuit();
    }

    function tuerJoueur(nom, parAmour = false) {
        if (jeuTermine) return;

        const j = joueursPartie.find(p => p.nom === nom);
        if (j && j.enVie) {
            j.enVie = false;

            if (parAmour) {
                if (!mortsParAmour.includes(nom)) mortsParAmour.push(nom);
            }

            if (nom === nomCapitaine) {
                if (reelectionEnabled) {
                    attenteSuccession = true;
                }
                nomCapitaine = null;
            }

            if (j.roleId === 'chasseur') {
                attenteTirChasseur = true;
                nomChasseurMort = nom;
            }

            if (lovers.includes(nom)) {
                const partnerNom = lovers.find(n => n !== nom);
                const partner = joueursPartie.find(p => p.nom === partnerNom);
                if (partner && partner.enVie) {
                    tuerJoueur(partnerNom, true);
                }
            }

            const resultat = verifierFinPartie();

            if (resultat && !jeuTermine) {
                attenteSuccession = false;

                if (!attenteTirChasseur) {
                    jeuTermine = true;
                    typeVictoire = resultat;
                }
            }
        }
    }

    btnMasterView.addEventListener('click', () => {
        let html = '<table class="master-table">';
        html += `
            <tr class="master-tr-header">
                <th class="master-th">Name</th>
                <th class="master-th">Role</th>
                <th class="master-th-center">Status</th>
            </tr>`;

        joueursPartie.forEach(j => {
            const estMortMaintenant = !j.enVie || victimsTonight.includes(j.nom);

            const statusClass = !estMortMaintenant ? 'status-alive' : 'status-dead';
            const heartIcon = (lovers.includes(j.nom)) ? ' ❤️' : '';
            const capIcon = (nomCapitaine === j.nom) ? ' 🎖️' : '';

            html += `
                <tr class="master-tr">
                    <td class="master-td ${statusClass}">
                        <strong>${j.nom}</strong>${heartIcon}${capIcon}
                    </td>
                    <td class="master-td master-role-text">
                        ${j.roleNom}
                    </td>
                    <td class="master-td-center ${statusClass}">
                        ${!estMortMaintenant ? 'ALIVE' : 'DEAD'}
                    </td>
                </tr>`;
        });

        html += '</table>';

        const vivants = joueursPartie.filter(j => j.enVie && !victimsTonight.includes(j.nom)).length;
        html += `<p class="master-alive-count">Players alive: ${vivants} / ${joueursPartie.length}</p>`;

        recapPlayersList.innerHTML = html;
        modalMasterView.classList.remove('cache');
        modalMasterView.style.display = "flex";
    });

    btnCloseMaster.addEventListener('click', () => {
        modalMasterView.classList.add('cache');
    });

    modalMasterView.addEventListener('click', (e) => {
        if (e.target === modalMasterView) modalMasterView.classList.add('cache');
    });

    function verifierFinPartie() {
        const vivants = joueursPartie.filter(j => j.enVie);
        const loups = vivants.filter(j => j.roleId === 'loup');
        const villageois = vivants.filter(j => j.roleId !== 'loup');

        if (vivants.length === 2 && lovers.includes(vivants[0].nom) && lovers.includes(vivants[1].nom)) {
            const camp1 = vivants[0].roleId === 'loup' ? 'loup' : 'village';
            const camp2 = vivants[1].roleId === 'loup' ? 'loup' : 'village';
            if (camp1 !== camp2) return 'amoureux';
        }

        if (villageois.length === 0 && loups.length > 0) {
            return 'loups';
        }

        if (loups.length === 0 && villageois.length > 0) {
            return 'village';
        }

        if (loups.length === 0 && villageois.length === 0) {
            return 'egalite';
        }

        return null;
    }

    function afficherEcranVictoire(type) {
        jeuTermine = true;

        const elementsToHide = [
            'zone-timer',
            'zone-vote-village',
            'contenu-etape-nuit',
            'ecran-morning-news'
        ];

        elementsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = 'none';
                el.classList.add('cache');
            }
        });

        let config = {
            icon: "🏘️",
            title: "Village Victory",
            class: "victory-village",
            desc: "The threat is gone. Peace returns to the village."
        };

        if (type === 'loups') {
            config = {
                icon: "🐺",
                title: "Wolves Victory",
                class: "victory-wolves",
                desc: "The village is silent. The pack has won."
            };
        } else if (type === 'amoureux') {
            config = {
                icon: "❤️",
                title: "Lovers Victory",
                class: "victory-lovers",
                desc: "Love was stronger than the call of the wild."
            };
        } else if (type === 'egalite') {
            config = {
                icon: "🪦",
                title: "Mutual Destruction",
                class: "victory-egalite",
                desc: "Everyone is dead. The village is nothing but a ghost town."
            };
        }

        zoneSentenceVillage.innerHTML = `
            <div class="etape-container victory-screen ${config.class}">
                <span class="victory-icon">${config.icon}</span>
                <h2 class="victory-title">${config.title}</h2>
                <p class="victory-desc">${config.desc}</p>
            </div>
        `;

        zoneSentenceVillage.style.display = "block";
        zoneSentenceVillage.classList.remove('cache');

        if (btnEtapeSuivante) {
            const nouveauBtn = btnEtapeSuivante.cloneNode(true);
            btnEtapeSuivante.parentNode.replaceChild(nouveauBtn, btnEtapeSuivante);

            nouveauBtn.id = "btn-etape-suivante";
            nouveauBtn.innerHTML = "NEW GAME";
            nouveauBtn.style.display = "block";
            nouveauBtn.classList.remove("cache");
            nouveauBtn.disabled = false;

            nouveauBtn.addEventListener("click", () => {
                location.reload();
            });
        }

        window.scrollTo(0, 0);
    }

    function gererTirChasseur() {
        const survivants = joueursPartie.filter(j => j.enVie);
        let options = survivants.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

        return `
            <div class="etape-container hunter-box" id="bloc-chasseur">
                <h3 class="hunter-title">🎯 Hunter's Revenge</h3>
                <p class="hunter-instruction">
                    <strong>${nomChasseurMort}</strong> died and must shoot someone!
                </p>
                <select id="select-cible-chasseur">
                    <option value="" disabled selected>Choose the victim...</option>
                    ${options}
                </select>
                <button onclick="validerTirChasseur()" class="btn-principal btn-hunter">SHOOT</button>
            </div>
        `;
    }

    window.validerTirChasseur = function () {
        const cible = document.getElementById('select-cible-chasseur').value;
        if (!cible) return alert("The Hunter MUST shoot someone!");

        document.getElementById('bloc-chasseur').classList.add('cache');

        attenteTirChasseur = false;
        tuerJoueur(cible);

        if (btnEtapeSuivante) {
            if (jeuTermine) {
                btnEtapeSuivante.innerHTML = "SHOW VICTORY";
            } else {
                btnEtapeSuivante.innerHTML = "Proceed";
            }
            btnEtapeSuivante.style.display = "block";
        }

        const joueurObj = joueursPartie.find(p => p.nom === cible);

        const htmlSentence = `
            <div class="mort-conseil-wrapper hunter-sentence-wrapper">
                <p class="resultat-conseil resultat-chasseur">Shot by the Hunter</p>
                <div class="annonce-mort cause-chasseur">
                    <span class="annonce-mort-nom">${cible}</span>
                    <span class="annonce-mort-role">${joueurObj ? joueurObj.roleNom : 'Unknown'}</span>
                </div>
            </div>
        `;

        const ecranNews = document.getElementById('ecran-morning-news');
        if (ecranNews && !ecranNews.classList.contains('cache')) {
            ecranNews.querySelector('.morning-news-container').innerHTML += htmlSentence;

            const survivantsReels = joueursPartie.filter(j => j.enVie);
            let optionsVote = '<option value="">Nobody (Tie / Skip)</option>';
            optionsVote += survivantsReels.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');
            if (selectElimineVillage) selectElimineVillage.innerHTML = optionsVote;
        } else {
            zoneSentenceVillage.innerHTML += htmlSentence;
        }

        if (btnEtapeSuivante) {
            btnEtapeSuivante.style.display = "block";
        }
    };

    function gererSuccessionCapitaine() {
        const survivants = joueursPartie.filter(j => j.enVie);
        let options = survivants.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

        return `
            <div class="etape-container captain-box" id="bloc-succession">
                <h3 class="captain-title">🎖️ NEW CAPTAIN</h3>
                <p class="hunter-instruction">The Captain is dead. They must designate a successor!</p>
                <select id="select-nouveau-capitaine">
                    <option value="" disabled selected>Select the next Captain...</option>
                    ${options}
                </select>
                <button onclick="validerSuccession()" class="btn-principal btn-captain">Proceed</button>
            </div>
        `;
    }

    window.validerSuccession = function () {
        const nouveau = document.getElementById('select-nouveau-capitaine').value;
        if (!nouveau) return alert("You must choose a successor!");

        nomCapitaine = nouveau;
        attenteSuccession = false;
        document.getElementById('bloc-succession').classList.add('cache');

        const msg = `<p class="annonce-succession">🎖️ ${nouveau} is the new Captain!</p>`;

        const ecranNews = document.getElementById('ecran-morning-news');
        if (ecranNews && !ecranNews.classList.contains('cache')) {
            ecranNews.querySelector('.morning-news-container').innerHTML += msg;
        } else {
            zoneSentenceVillage.innerHTML += msg;
        }

        if (!attenteTirChasseur && !attenteSuccession) {
            btnEtapeSuivante.style.display = "block";
        }
    };
});