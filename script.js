document.addEventListener("DOMContentLoaded", () => {
    const i18n = {
        en: {
            mainTitle: "The Werewolf - Game Master Edition",
            placeholderName: "Enter name...",
            day: "☀️ Day", night: "🌙 Night", council: "☀️ Village Council", revote: "⚖️ Revote",
            btnNext: "NEXT", btnProceed: "Proceed to council", btnProceedShort: "Proceed", btnVictory: "SHOW VICTORY", btnNextNight: "NEXT NIGHT", btnNewGame: "NEW GAME", btnShoot: "SHOOT", btnStartTimer: "Start Timer", btnPauseTimer: "Pause", btnResumeTimer: "Resume", btnResetTimer: "Reset", btnRunning: "Running...",
            roleCupid: "🏹 Cupid", roleLovers: "💕 The Lovers", roleSeer: "👁️ The Seer", roleGuard: "🛡️ The Guard", roleWolves: "🐺 The Werewolves", roleWitch: "🧙‍♀️ The Witch", roleCrow: "🐦‍⬛ The Crow", roleMorning: "Morning",
            cupidInst: "Cupid chooses the two lovers:", lover1: "Lover 1...", lover2: "Lover 2...", playerLabel: "Player(s):",
            loversLabel: "Lovers:", noneSelected: "None selected", loversRec: "They recognize each other.",
            seerInst: "Who do they inspect tonight?", selTarget: "Select target...",
            guardInst: "The Guard must choose a player to protect from the wolves, not the same person twice in a row.", selProtect: "Select a player to protect...", protLastNight: "Protected last night", guardMust: "The Guard MUST protect someone!",
            wolvesInst: "The Werewolves must choose a prey:", selVictim: "Select a victim...",
            witchLife: "💖 Potion of Life :", witchDeath: "💀 Potion of Death :", targetWolves: "Target of the wolves:", nobody: "Nobody", dontUse: "Don't use", save: "Save", kill: "Kill", used: "❌ Already used",
            crowInst: "The Crow must curse a player tonight:", startsVote: "starts with 1 vote against them.", crowMark: "Crow's Mark",
            bearGrowls: "The Bear Growls!", wolfNearby: "A wolf is nearby...", bearPeaceful: "🐾 The Bear remains peaceful.",
            safeNight: "☀️ Safe night! No one died.", noEvents: "No other events", villageWakes: "The village wakes up without further disturbances.",
            nobodyTie: "Nobody (Tie / Skip)", villageDecided: "The village has decided", role: "Role:", noDeath: "Equality or skip: No one was executed.",
            vicVillTitle: "Village Victory", vicVillDesc: "The threat is gone. Peace returns to the village.",
            vicWolfTitle: "Wolves Victory", vicWolfDesc: "The village is silent. The pack has won.",
            vicLoveTitle: "Lovers Victory", vicLoveDesc: "Love was stronger than the call of the wild.",
            vicTieTitle: "Mutual Destruction", vicTieDesc: "Everyone is dead. The village is nothing but a ghost town.",
            huntRev: "🎯 Hunter's Revenge", huntDied: "died and must shoot someone!", huntMust: "The Hunter MUST shoot someone!", shotBy: "Shot by the Hunter",
            capElected: "Who is elected?", selCaptain: "Please select a captain!", newCap: "🎖️ NEW CAPTAIN", capDead: "The Captain is dead. They must designate a successor!", selNextCap: "Select the next Captain...", isNewCap: "is the new Captain!", capMust: "You must choose a successor!",
            timesUp: "TIME'S UP!", mvName: "Name", mvRole: "Role", mvStatus: "Status", mvAlive: "ALIVE", mvDead: "DEAD", mvPlayers: "Players alive:", errRoles: "Select roles first!", errLovers: "Select 2 different lovers.",

            setupTitle: "Create your deck", totalPlayers: "Total players:", roleVillagerName: "Villager", roleWolfName: "Werewolf", roleSeerName: "Seer", roleWitchName: "Witch", roleCupidName: "Cupid", roleGuardName: "Guard", roleHunterName: "Hunter", roleCrowName: "Crow", roleBearName: "Bear Tamer", btnReset: "Reset", btnValidateRoles: "Validate Roles", settingsTitle: "Game Settings",
            timerLabel: "⏳ Council Discussion Time:", time2m: "2 Minutes", time3m: "3 Minutes", time5m: "5 Minutes", time8m: "8 Minutes", timeUnl: "Unlimited",
            capSectionTitle: "🎖️ Captain Election:", capEnableDesc: "Enable Captain Election before Night 1", capReelectDesc: "Successor Designation (on death)",
            tiebreakerTitle: "⚖️ Tiebreaker (Revote):", tiebreakerDesc: "Allow a second vote in case of a tie",
            btnContinue: "Next Step", playersTitle: "Add Players", btnAdd: "Add", btnStart: "Start Game", capTitle: "Captain Election", capDesc: "The village elects its Captain before the first night.", btnValidateCap: "Confirm Captain", timerTitle: "Debate Timer", voteTitle: "Village Vote", btnClose: "Close"
        },
        fr: {
            mainTitle: "Loups-Garous - Edition Maître du Jeu",
            placeholderName: "Entrez un nom...",
            day: "☀️ Jour", night: "🌙 Nuit", council: "☀️ Conseil du Village", revote: "⚖️ Revote",
            btnNext: "SUIVANT", btnProceed: "Passer au conseil", btnProceedShort: "Continuer", btnVictory: "VOIR LA VICTOIRE", btnNextNight: "NUIT SUIVANTE", btnNewGame: "NOUVELLE PARTIE", btnShoot: "TIRER", btnStartTimer: "Lancer le Timer", btnPauseTimer: "Pause", btnResumeTimer: "Reprendre", btnResetTimer: "Reset", btnRunning: "En cours...",
            roleCupid: "🏹 Cupidon", roleLovers: "💕 Les Amoureux", roleSeer: "👁️ La Voyante", roleGuard: "🛡️ Le Garde", roleWolves: "🐺 Les Loups-Garous", roleWitch: "🧙‍♀️ La Sorcière", roleCrow: "🐦‍⬛ Le Corbeau", roleMorning: "Matin",
            cupidInst: "Cupidon choisit les deux amoureux :", lover1: "Amoureux 1...", lover2: "Amoureux 2...", playerLabel: "Joueur(s) :",
            loversLabel: "Amoureux :", noneSelected: "Aucun sélectionné", loversRec: "Ils se reconnaissent.",
            seerInst: "Qui inspecte-t-elle cette nuit ?", selTarget: "Sélectionnez une cible...",
            guardInst: "Le Garde doit protéger un joueur des loups (pas la même personne deux nuits de suite).", selProtect: "Sélectionnez un joueur à protéger...", protLastNight: "Protégé la nuit dernière", guardMust: "Le Garde DOIT protéger quelqu'un !",
            wolvesInst: "Les Loups-Garous choisissent leur proie :", selVictim: "Sélectionnez une victime...",
            witchLife: "💖 Potion de Vie :", witchDeath: "💀 Potion de Mort :", targetWolves: "Cible des loups :", nobody: "Personne", dontUse: "Ne pas utiliser", save: "Sauver", kill: "Tuer", used: "❌ Déjà utilisée",
            crowInst: "Le Corbeau doit maudire un joueur cette nuit :", startsVote: "commence avec 1 vote contre lui.", crowMark: "Marque du Corbeau",
            bearGrowls: "L'Ours Grogne !", wolfNearby: "Un loup est proche...", bearPeaceful: "🐾 L'Ours reste paisible.",
            safeNight: "☀️ Nuit calme ! Personne n'est mort.", noEvents: "Aucun autre événement", villageWakes: "Le village se réveille sans autres perturbations.",
            nobodyTie: "Personne (Égalité / Passer)", villageDecided: "Le village a tranché", role: "Rôle :", noDeath: "Égalité ou vote blanc : Personne n'a été exécuté.",
            vicVillTitle: "Victoire du Village", vicVillDesc: "La menace est écartée. La paix revient au village.",
            vicWolfTitle: "Victoire des Loups", vicWolfDesc: "Le village est silencieux. La meute a gagné.",
            vicLoveTitle: "Victoire des Amoureux", vicLoveDesc: "L'amour a été plus fort que l'appel de la nature.",
            vicTieTitle: "Destruction Mutuelle", vicTieDesc: "Tout le monde est mort. Le village n'est plus qu'une ville fantôme.",
            huntRev: "🎯 Vengeance du Chasseur", huntDied: "est mort et doit tirer sur quelqu'un !", huntMust: "Le Chasseur DOIT tirer sur quelqu'un !", shotBy: "Abattu par le Chasseur",
            capElected: "Qui est élu ?", selCaptain: "Veuillez sélectionner un capitaine !", newCap: "🎖️ NOUVEAU CAPITAINE", capDead: "Le Capitaine est mort. Il doit désigner un successeur !", selNextCap: "Sélectionnez le prochain Capitaine...", isNewCap: "est le nouveau Capitaine !", capMust: "Vous devez choisir un successeur !",
            timesUp: "TEMPS ÉCOULÉ !", mvName: "Nom", mvRole: "Rôle", mvStatus: "Statut", mvAlive: "VIVANT", mvDead: "MORT", mvPlayers: "Joueurs en vie :", errRoles: "Sélectionnez les rôles d'abord !", errLovers: "Sélectionnez 2 amoureux différents.",

            setupTitle: "Composition du village", totalPlayers: "Joueurs totaux :", roleVillagerName: "Villageois", roleWolfName: "Loup-Garou", roleSeerName: "Voyante", roleWitchName: "Sorcière", roleCupidName: "Cupidon", roleGuardName: "Garde", roleHunterName: "Chasseur", roleCrowName: "Corbeau", roleBearName: "Montreur d'Ours", btnReset: "Réinitialiser", btnValidateRoles: "Valider les rôles", settingsTitle: "Paramètres de la partie",
            timerLabel: "⏳ Temps de débat (Conseil) :", time2m: "2 Minutes", time3m: "3 Minutes", time5m: "5 Minutes", time8m: "8 Minutes", timeUnl: "Illimité",
            capSectionTitle: "🎖️ Élection du Capitaine :", capEnableDesc: "Activer l'élection du Capitaine avant la Nuit 1", capReelectDesc: "Désignation d'un successeur (en cas de mort)",
            tiebreakerTitle: "⚖️ Égalité (Revote) :", tiebreakerDesc: "Autoriser un second vote en cas d'égalité",
            btnContinue: "Étape suivante", playersTitle: "Ajouter les joueurs", btnAdd: "Ajouter", btnStart: "Démarrer la partie", capTitle: "Élection du Capitaine", capDesc: "Le village élit son Capitaine avant la première nuit.", btnValidateCap: "Valider le Capitaine", timerTitle: "Chronomètre de débat", voteTitle: "Vote du Village", btnClose: "Fermer"
        }
    };

    const idVersCle = {
        'villageois': 'roleVillagerName',
        'loup': 'roleWolfName',
        'voyante': 'roleSeerName',
        'sorciere': 'roleWitchName',
        'cupidon': 'roleCupidName',
        'garde': 'roleGuardName',
        'chasseur': 'roleHunterName',
        'corbeau': 'roleCrowName',
        'montreur': 'roleBearName'
    };

    let currentLang = 'fr';

    const langToggle = document.getElementById('lang-toggle-checkbox');
    if (langToggle) {
        langToggle.addEventListener('change', (e) => {
            currentLang = e.target.checked ? 'en' : 'fr';
            const t = i18n[currentLang];


            for (const id in rolesChoisis) {
                const roleKey = "role" + id.charAt(0).toUpperCase() + id.slice(1) + "Name";
                if (t[roleKey]) {
                    rolesChoisis[id].nom = t[roleKey];
                }
            }

            joueursPartie.forEach(joueur => {
                const roleKey = idVersCle[joueur.roleId];
                if (roleKey && t[roleKey]) {
                    joueur.roleNom = t[roleKey];
                }
            });

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    if (el.tagName === 'INPUT') el.placeholder = t[key];
                    else el.textContent = t[key];
                }
            });

            document.querySelectorAll('.role-dynamique').forEach(small => {
                const roleKey = small.getAttribute('data-i18n');
                if (t[roleKey]) {
                    small.textContent = t[roleKey];
                }
            });

            if (selectRoleJoueur && selectRoleJoueur.options) {
                Array.from(selectRoleJoueur.options).forEach(opt => {
                    if (!opt.value) return;

                    const id = opt.value;
                    const roleKey = idVersCle[id];

                    if (rolesChoisis[id]) {
                        const quantite = rolesChoisis[id].quantite;
                        const nomTraduit = t[roleKey] || rolesChoisis[id].nom;

                        opt.textContent = `${nomTraduit} (x${quantite})`;
                    }
                });
            }

            const ecranNuit = document.getElementById('ecran-nuit');
            if (ecranNuit && !ecranNuit.classList.contains('cache')) {
                afficherEtapeNuit();
            }
        });
    }

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

    const ecranNuit = document.getElementById('ecran-nuit');
    const contenuEtapeNuit = document.getElementById('contenu-etape-nuit');
    const btnEtapeSuivante = document.getElementById('btn-etape-suivante');
    const titreNuit = document.getElementById('titre-nuit');

    const selectTimer = document.getElementById('select-timer');
    const zoneTimer = document.getElementById('zone-timer');
    const affichageChrono = document.getElementById('affichage-chrono');
    const barreTimer = document.getElementById('barre-timer');
    const btnStartTimer = document.getElementById('btn-start-timer');
    const btnTimerPlus = document.getElementById('btn-timer-plus');
    const btnTimerMoins = document.getElementById('btn-timer-moins');
    const btnTimerReset = document.getElementById('btn-timer-reset');

    let timerInterval = null;
    let dureeInitiale = 180;
    let tempsRestant = 180;
    let estEnMarche = false;
    let chronoAteLanceUneFois = false;

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
    let mortsParAmour = [];
    let protectedByGuard = null;
    let crowTarget = null;
    let lovers = [];
    let isFirstNight = true;
    let nightCount = 1;
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
        const t = i18n[currentLang];
        let total = 0;
        for (let r in rolesChoisis) total += rolesChoisis[r].quantite;
        if (total === 0) return alert(t.errRoles);

        selectRoleJoueur.innerHTML = `<option value="">Role...</option>`;
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
            const placeSpan = item.querySelector('.numero-place');
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

        const roleKey = idVersCle[id];
        const nomTraduit = i18n[currentLang][roleKey] || rolesChoisis[id].nom;

        li.innerHTML = `
            <div class="container-info-joueur">
                <span class="numero-place"></span>
                <div>
                    <strong>${nom}</strong><br>
                    <small class="role-dynamique" data-i18n="${roleKey}">${i18n[currentLang][roleKey] || rolesChoisis[id].nom}</small>
                </div>
            </div>
            <div class="container-btn-joueur">
                <button class="btn-up btn-ordre">⬆️</button>
                <button class="btn-down btn-ordre">⬇️</button>
                <button class="btn-supprimer-joueur">✖</button>
            </div>
        `;

        const small = li.querySelector('.role-dynamique');
        small.textContent = i18n[currentLang][roleKey] || id;

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
                    selectRoleJoueur.options[i].text = `${nomTraduit} (x${rolesChoisis[id].quantite})`;
                    optionExistante = true;
                    break;
                }
            }
            if (!optionExistante) {
                const opt = document.createElement('option');
                opt.value = id;
                opt.textContent = `${nomTraduit} (x${rolesChoisis[id].quantite})`;
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
            selectRoleJoueur.options[selectRoleJoueur.selectedIndex].text = `${nomTraduit} (x${rolesChoisis[id].quantite})`;
        }

        inputNomJoueur.value = "";
        inputNomJoueur.focus();

        if (selectRoleJoueur.options.length === 1) {
            btnDemarrer.disabled = false;
            btnAjouterJoueur.disabled = true;
        }
    });

    btnDemarrer.addEventListener('click', () => {
        const t = i18n[currentLang];
        ecranSaisieJoueurs.classList.add('cache');
        ecranSaisieJoueurs.style.display = "none";

        if (captainEnabled) {
            ecranNuit.classList.add('cache');
            ecranNuit.style.display = "none";

            let optionsCapitaine = `<option value="">${t.capElected}</option>`;
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
        const t = i18n[currentLang];
        const cap = selectCapitaine.value;
        if (!cap) return alert(t.selCaptain);

        nomCapitaine = cap;
        ecranCapitaine.classList.add('cache');
        ecranCapitaine.style.display = "none";

        ecranNuit.classList.remove('cache');
        ecranNuit.style.display = "block";

        preparerEtapesNuit();
    });


    // --- FONCTIONS ---
    function mettreAJourAffichage() {
        const mins = Math.floor(tempsRestant / 60);
        const secs = tempsRestant % 60;

        if (affichageChrono) {
            affichageChrono.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (tempsRestant <= 0) {
                affichageChrono.textContent = i18n[currentLang].timesUp || "Terminé";
            }
        }

        if (barreTimer) {
            const ratio = Math.max(0, Math.min(1, tempsRestant / dureeInitiale));
            const circonference = 283;
            const offset = circonference - (ratio * circonference);

            barreTimer.style.strokeDashoffset = offset;

            if (tempsRestant <= 10 && tempsRestant > 0) {
                barreTimer.style.stroke = "var(--rouge-sang)";
                if (affichageChrono) affichageChrono.style.color = "var(--rouge-sang)";
            } else {
                barreTimer.style.stroke = "var(--accent)";
                if (affichageChrono) affichageChrono.style.color = "var(--accent)";
            }
        }
    }

    function tickTimer() {
        if (tempsRestant > 0) {
            tempsRestant--;
            mettreAJourAffichage();
        } else {
            clearInterval(timerInterval);
            estEnMarche = false;
            if (btnStartTimer) {
                btnStartTimer.textContent = i18n[currentLang].btnStartTimer || "Démarrer";
                btnStartTimer.classList.remove('btn-timer-pause');
            }
        }
    }

    // --- ÉVÉNEMENTS ---
    if (btnStartTimer) {
        btnStartTimer.addEventListener('click', () => {
            const t = i18n[currentLang];
            if (!chronoAteLanceUneFois) {
                dureeInitiale = typeof discussionTime !== 'undefined' ? discussionTime : 180;
                tempsRestant = dureeInitiale;
                chronoAteLanceUneFois = true;
                mettreAJourAffichage();
            }

            if (estEnMarche) {
                clearInterval(timerInterval);
                estEnMarche = false;
                btnStartTimer.textContent = t.btnResumeTimer || "Reprendre";
                btnStartTimer.classList.add('btn-timer-pause');
            } else {
                if (tempsRestant <= 0) tempsRestant = dureeInitiale;
                timerInterval = setInterval(tickTimer, 1000);
                estEnMarche = true;
                btnStartTimer.textContent = t.btnPauseTimer || "Pause";
                btnStartTimer.classList.remove('btn-timer-pause');
            }
        });
    }

    if (btnTimerReset) {
        btnTimerReset.addEventListener('click', () => {
            clearInterval(timerInterval);
            estEnMarche = false;
            if (typeof discussionTime !== 'undefined') dureeInitiale = discussionTime;
            tempsRestant = dureeInitiale;
            mettreAJourAffichage();
            if (btnStartTimer) {
                btnStartTimer.textContent = i18n[currentLang].btnStartTimer || "Démarrer";
                btnStartTimer.classList.remove('btn-timer-pause');
            }
        });
    }

    if (btnTimerPlus) {
        btnTimerPlus.addEventListener('click', () => {
            if (!chronoAteLanceUneFois) {
                dureeInitiale = typeof discussionTime !== 'undefined' ? discussionTime : 180;
                tempsRestant = dureeInitiale;
                chronoAteLanceUneFois = true;
            }
            tempsRestant += 30;
            if (tempsRestant > dureeInitiale) dureeInitiale = tempsRestant;
            mettreAJourAffichage();
        });
    }

    if (btnTimerMoins) {
        btnTimerMoins.addEventListener('click', () => {
            if (!chronoAteLanceUneFois) {
                dureeInitiale = typeof discussionTime !== 'undefined' ? discussionTime : 180;
                tempsRestant = dureeInitiale;
                chronoAteLanceUneFois = true;
            }
            tempsRestant = Math.max(0, tempsRestant - 30);
            mettreAJourAffichage();
            if (tempsRestant === 0 && estEnMarche) {
                clearInterval(timerInterval);
                estEnMarche = false;
                if (btnStartTimer) {
                    btnStartTimer.textContent = i18n[currentLang].btnStartTimer || "Démarrer";
                    btnStartTimer.classList.remove('btn-timer-pause');
                }
            }
        });
    }


    function preparerEtapesNuit() {
        const t = i18n[currentLang];
        document.body.classList.remove('theme-jour');
        etapesDeCetteNuit = [];

        if (isFirstNight && joueursPartie.some(j => j.roleId === 'cupidon' && j.enVie)) {
            etapesDeCetteNuit.push({ id: 'cupidon', nom: t.roleCupid }, { id: 'lovers', nom: t.roleLovers });
        }
        if (joueursPartie.some(j => j.roleId === 'voyante' && j.enVie)) etapesDeCetteNuit.push({ id: 'voyante', nom: t.roleSeer });
        if (joueursPartie.some(j => j.roleId === 'garde' && j.enVie)) etapesDeCetteNuit.push({ id: 'garde', nom: t.roleGuard });
        if (joueursPartie.some(j => j.roleId === 'loup' && j.enVie)) etapesDeCetteNuit.push({ id: 'loup', nom: t.roleWolves });
        if (joueursPartie.some(j => j.roleId === 'sorciere' && j.enVie)) etapesDeCetteNuit.push({ id: 'sorciere', nom: t.roleWitch });
        if (joueursPartie.some(j => j.roleId === 'corbeau' && j.enVie)) etapesDeCetteNuit.push({ id: 'corbeau', nom: t.roleCrow });

        etapesDeCetteNuit.push({ id: 'matin', nom: t.roleMorning });

        indexEtapeActuelle = 0;
        victimsTonight = [];
        mortsParAmour = [];
        protectedByGuard = null;
        crowTarget = null;
        hasRevotedToday = false;
        afficherEtapeNuit();
    }

    function afficherEtapeNuit() {
        const t = i18n[currentLang];
        const etape = etapesDeCetteNuit[indexEtapeActuelle];
        if (btnEtapeSuivante) btnEtapeSuivante.disabled = false;

        contenuEtapeNuit.classList.remove('cache');
        contenuEtapeNuit.style.display = "";

        zoneVoteVillage.classList.add('cache');
        zoneVoteVillage.style.display = "none";

        btnEtapeSuivante.textContent = t.btnNext;
        btnEtapeSuivante.classList.remove('cache');

        if (etape.id === 'matin') {
            titreNuit.textContent = `${t.day} ${nightCount}`;
        } else {
            titreNuit.textContent = `${t.night} ${nightCount}`;
        }
        titreNuit.className = "titre-nuit-etape";

        const optionsVivants = joueursPartie.filter(j => j.enVie).map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');
        const joueursDeCetteEtape = joueursPartie.filter(j => j.roleId === etape.id && j.enVie);
        const nomsDesJoueurs = joueursDeCetteEtape.map(j => j.nom).join(', ');

        zoneTimer.classList.add('cache');
        zoneTimer.style.display = "none";
        clearInterval(timerInterval);
        btnStartTimer.disabled = false;
        btnStartTimer.textContent = t.btnStartTimer;
        affichageChrono.style.color = "var(--accent)";


        let html = `<div class="etape-container">`;

        if (etape.id !== 'matin') {

            let roleKey = "";
            if (etape.id === 'voyante') roleKey = "roleSeer";
            else if (etape.id === 'loup') roleKey = "roleWolves";
            else if (etape.id === 'sorciere') roleKey = "roleWitch";
            else if (etape.id === 'cupidon') roleKey = "roleCupid";
            else if (etape.id === 'garde') roleKey = "roleGuard";
            else if (etape.id === 'corbeau') roleKey = "roleCrow";
            else if (etape.id === 'lovers') roleKey = "roleLovers";

            const titreTraduit = i18n[currentLang][roleKey] || etape.nom;

            html += `<div class="etape-role" data-i18n="${roleKey}">${titreTraduit}</div>`;
        }

        if (etape.id !== 'matin' && etape.id !== 'lovers' && nomsDesJoueurs) {
            html += `<div class="etape-joueurs">
                    <span data-i18n="playerLabel">${i18n[currentLang].playerLabel}</span> 
                    <strong>${nomsDesJoueurs}</strong> 
                 </div>`;
        }

        switch (etape.id) {
            case 'cupidon':
                html += `
                    <div class="action-mj">
                        <p class="info-bulle">${t.cupidInst}</p>
                        <div class="lovers-selection">
                            <select id="l1">
                                <option value="">${t.lover1}</option>
                                ${optionsVivants}
                            </select>
                            <div class="heart-icon">❤️</div>
                            <select id="l2">
                                <option value="">${t.lover2}</option>
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
                const texteLovers = (lovers.length > 0) ? lovers.join(' & ') : t.noneSelected;
                html += `<div class="etape-joueurs">${t.loversLabel} <strong class="text-gold">${texteLovers}</strong></div><p>${t.loversRec}</p>`;
                break;

            case 'voyante':
                const optionsCiblesSeer = joueursPartie
                    .filter(j => j.enVie && j.roleId !== 'voyante')
                    .map(j => `<option value="${j.nom}">${j.nom}</option>`)
                    .join('');

                html += `
                    <div class="action-mj">
                        <p class="info-bulle">${t.seerInst}</p>
                        <select id="seer-target">
                            <option value="">${t.selTarget}</option>
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
                let optionsGarde = `<option value="" disabled selected>${t.selProtect}</option>`;
                const survivantsGarde = joueursPartie.filter(j => j.enVie);

                survivantsGarde.forEach(j => {
                    if (j.nom === lastProtectedByGuard) {
                        optionsGarde += `<option value="${j.nom}" disabled>${j.nom} (${t.protLastNight})</option>`;
                    } else {
                        optionsGarde += `<option value="${j.nom}">${j.nom}</option>`;
                    }
                });

                html += `
                    <p class="info-bulle">${t.guardInst}</p>
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
                        <p class="info-bulle">${t.wolvesInst}</p>
                        <select id="kill">
                            <option value="">${t.selVictim}</option>
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
                            <p class="parametre-titre">${t.witchLife}</p>
                            ${witchHasSave ? `
                                <p class="witch-info">
                                    ${t.targetWolves} <span class="witch-target">${victimsTonight.length > 0 ? victimsTonight.join(', ') : t.nobody}</span>
                                </p>
                                <select id="witch-save">
                                    <option value="">${t.dontUse}</option>
                                    ${victimsTonight.map(v => `<option value="${v}">${t.save} ${v}</option>`).join('')}
                                </select>
                            ` : `<p class="potion-used">${t.used}</p>`}
                        </div>

                        <div class="parametres-groupe">
                            <p class="parametre-titre">${t.witchDeath}</p>
                            ${witchHasKill ? `
                                <select id="witch-kill">
                                    <option value="">${t.dontUse}</option>
                                    ${joueursPartie.filter(j => j.enVie).map(j => `<option value="${j.nom}">${t.kill} ${j.nom}</option>`).join('')}
                                </select>
                            ` : `<p class="potion-used">${t.used}</p>`}
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
                        <p class="info-bulle">${t.crowInst}</p>
                        <select id="curse">
                            <option value="">${t.selTarget}</option>
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
                        btnEtapeSuivante.innerHTML = t.btnVictory;
                    } else {
                        btnEtapeSuivante.innerHTML = t.btnProceed;
                    }
                    btnEtapeSuivante.classList.remove('cache');
                    btnEtapeSuivante.style.display = "block";
                }

                const survivantsMatin = joueursPartie.filter(j => j.enVie);
                const tamerAlive = survivantsMatin.find(j => j.roleId === 'montreur');

                let bearMsg = "";
                if (tamerAlive) {
                    const idx = survivantsMatin.indexOf(tamerAlive);
                    const left = survivantsMatin[(idx - 1 + survivantsMatin.length) % survivantsMatin.length];
                    const right = survivantsMatin[(idx + 1) % survivantsMatin.length];
                    const growl = (left.roleId === 'loup' || right.roleId === 'loup');

                    bearMsg = growl ?
                        `<div class="bear-growl">
                            <span class="event-icon">🐻</span>
                            <div><strong>${t.bearGrowls}</strong> ${t.wolfNearby}</div>
                        </div>` :
                        `<div class="bear-silent">${t.bearPeaceful}</div>`;
                }

                let htmlMorts = "";
                if (victimsTonight.length > 0) {
                    htmlMorts = victimsTonight.map(nom => {
                        const joueur = joueursPartie.find(p => p.nom === nom);
                        const coeur = mortsParAmour.includes(nom) ? ' ❤️' : '';

                        return `<div class="annonce-mort cause-classique">
                                    <span class="annonce-mort-nom">${nom}${coeur}</span>
                                    <span class="annonce-mort-role">${t.role} ${joueur ? joueur.roleNom : 'Unknown'}</span>
                                </div>`;
                    }).join('');
                } else {
                    htmlMorts = `<div class="safe-night">${t.safeNight}</div>`;
                }

                const crowHtml = crowTarget ? `
                    <div class="crow-mark">
                        <span class="event-icon">🐦‍⬛</span>
                        <div>
                            <strong>${t.crowMark}</strong>
                            <span class="crow-target-name">${crowTarget}</span>
                            <span class="crow-text-info">${t.startsVote}</span>
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
                                <strong>${t.noEvents}</strong><br>
                                ${t.villageWakes}
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
                        btnEtapeSuivante.innerHTML = jeuTermine ? t.btnVictory : t.btnProceed;
                        btnEtapeSuivante.style.display = "block";
                    }
                }

                const survivantsReels = joueursPartie.filter(j => j.enVie);
                let optionsVote = `<option value="">${t.nobodyTie}</option>`;
                optionsVote += survivantsReels.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

                if (selectElimineVillage) {
                    selectElimineVillage.innerHTML = optionsVote;
                }
                break;
        }
        contenuEtapeNuit.innerHTML = html + `</div>`;
    }

    btnEtapeSuivante.addEventListener('click', () => {
        const t = i18n[currentLang];

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
                if (titreNuit) titreNuit.innerHTML = t.council;
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
                btnEtapeSuivante.innerHTML = t.btnProceedShort;
                return;
            }

            const elimineVillage = selectElimineVillage.value;

            if (!elimineVillage && !hasRevotedToday) {
                hasRevotedToday = true;
                titreNuit.innerHTML = t.revote;
                if (discussionTime > 0) {
                    const mins = Math.floor(discussionTime / 60);
                    const secs = discussionTime % 60;
                    affichageChrono.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    btnStartTimer.disabled = false;
                    btnStartTimer.textContent = t.btnStartTimer;
                }
                return;
            }

            const tousLesMorts = [...victimsTonight];
            if (elimineVillage && !tousLesMorts.includes(elimineVillage)) {
                tousLesMorts.push(elimineVillage);
            }

            tousLesMorts.forEach(nom => tuerJoueur(nom));

            let mortsDuConseil = [];
            if (elimineVillage) {
                mortsDuConseil.push(elimineVillage);
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

            let htmlSentence = `<h2 class="titre-nuit-etape">${t.council}</h2>`;
            htmlSentence += `<div class="etape-container"><div class="mort-conseil-wrapper">`;

            if (mortsDuConseil.length > 0) {
                htmlSentence += `<p class="resultat-conseil">${t.villageDecided}</p>`;
                mortsDuConseil.forEach(nomMort => {
                    const joueurObj = joueursPartie.find(p => p.nom === nomMort);
                    const coeur = mortsParAmour.includes(nomMort) ? ' ❤️' : '';

                    htmlSentence += `
                        <div class="annonce-mort cause-classique">
                            <span class="annonce-mort-nom">${nomMort}${coeur}</span>
                            <span class="annonce-mort-role">${t.role} ${joueurObj ? joueurObj.roleNom : 'Unknown'}</span>
                        </div>`;
                });
            } else {
                htmlSentence += `
                    <div class="no-death-council">
                        <span class="no-death-icon">⚖️</span>
                        <p>${t.noDeath}</p>
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
                    btnEtapeSuivante.innerHTML = t.btnVictory;
                } else {
                    btnEtapeSuivante.innerHTML = t.btnNextNight;
                }
                btnEtapeSuivante.style.display = "block";
            }
            return;
        }

        if (etape.id === 'cupidon') {
            const v1 = document.getElementById('l1')?.value;
            const v2 = document.getElementById('l2')?.value;
            if (v1 && v2 && v1 !== v2) {
                lovers = [v1, v2];
            } else if (v1 || v2) {
                alert(t.errLovers);
                return;
            }

        } else if (etape.id === 'garde') {
            const selectGarde = document.getElementById('select-garde');
            if (selectGarde) {
                const joueurChoisi = selectGarde.value;
                if (!joueurChoisi) {
                    alert(t.guardMust);
                    return;
                }
                protectedTonight = joueurChoisi;
                lastProtectedByGuard = joueurChoisi;
            }

        } else if (etape.id === 'loup') {
            const selectLoups = document.getElementById('kill');
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
        const t = i18n[currentLang];
        enPhaseSentence = false;
        zoneSentenceVillage.classList.add('cache');
        zoneSentenceVillage.style.display = "none";

        titreNuit.style.display = "";
        contenuEtapeNuit.style.display = "";

        isFirstNight = false;
        nightCount++;
        titreNuit.textContent = `${t.night} ${nightCount}`;

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
        const t = i18n[currentLang];
        let html = '<table class="master-table">';
        html += `
            <tr class="master-tr-header">
                <th class="master-th">${t.mvName}</th>
                <th class="master-th">${t.mvRole}</th>
                <th class="master-th-center">${t.mvStatus}</th>
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
                        ${!estMortMaintenant ? t.mvAlive : t.mvDead}
                    </td>
                </tr>`;
        });

        html += '</table>';

        const vivants = joueursPartie.filter(j => j.enVie && !victimsTonight.includes(j.nom)).length;
        html += `<p class="master-alive-count">${t.mvPlayers} ${vivants} / ${joueursPartie.length}</p>`;

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
        if (villageois.length === 0 && loups.length > 0) return 'loups';
        if (loups.length === 0 && villageois.length > 0) return 'village';
        if (loups.length === 0 && villageois.length === 0) return 'egalite';

        return null;
    }

    function afficherEcranVictoire(type) {
        const t = i18n[currentLang];
        jeuTermine = true;

        if (titreNuit) {
            titreNuit.style.display = "block";
        }

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
            title: t.vicVillTitle,
            class: "victory-village",
            desc: t.vicVillDesc
        };

        if (type === 'loups') {
            config = { icon: "🐺", title: t.vicWolfTitle, class: "victory-wolves", desc: t.vicWolfDesc };
        } else if (type === 'amoureux') {
            config = { icon: "❤️", title: t.vicLoveTitle, class: "victory-lovers", desc: t.vicLoveDesc };
        } else if (type === 'egalite') {
            config = { icon: "🪦", title: t.vicTieTitle, class: "victory-egalite", desc: t.vicTieDesc };
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
            nouveauBtn.innerHTML = t.btnNewGame;
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
        const t = i18n[currentLang];
        const survivants = joueursPartie.filter(j => j.enVie);
        let options = survivants.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

        return `
            <div class="etape-container hunter-box" id="bloc-chasseur">
                <h3 class="hunter-title">${t.huntRev}</h3>
                <p class="hunter-instruction">
                    <strong>${nomChasseurMort}</strong> ${t.huntDied}
                </p>
                <select id="select-cible-chasseur">
                    <option value="" disabled selected>${t.selVictim}</option>
                    ${options}
                </select>
                <button onclick="validerTirChasseur()" class="btn-principal btn-hunter">${t.btnShoot}</button>
            </div>
        `;
    }

    window.validerTirChasseur = function () {
        const t = i18n[currentLang];
        const cible = document.getElementById('select-cible-chasseur').value;
        if (!cible) return alert(t.huntMust);

        document.getElementById('bloc-chasseur').classList.add('cache');

        attenteTirChasseur = false;
        tuerJoueur(cible);

        if (btnEtapeSuivante) {
            if (jeuTermine) {
                btnEtapeSuivante.innerHTML = t.btnVictory;
            } else {
                btnEtapeSuivante.innerHTML = t.btnProceedShort;
            }
            btnEtapeSuivante.style.display = "block";
        }

        const joueurObj = joueursPartie.find(p => p.nom === cible);

        const htmlSentence = `
            <div class="mort-conseil-wrapper hunter-sentence-wrapper">
                <p class="resultat-conseil resultat-chasseur">${t.shotBy}</p>
                <div class="annonce-mort cause-chasseur">
                    <span class="annonce-mort-nom">${cible}</span>
                    <span class="annonce-mort-role">${t.role} ${joueurObj ? joueurObj.roleNom : 'Unknown'}</span>
                </div>
            </div>
        `;

        const ecranNews = document.getElementById('ecran-morning-news');
        if (ecranNews && !ecranNews.classList.contains('cache')) {
            ecranNews.querySelector('.morning-news-container').innerHTML += htmlSentence;

            const survivantsReels = joueursPartie.filter(j => j.enVie);
            let optionsVote = `<option value="">${t.nobodyTie}</option>`;
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
        const t = i18n[currentLang];
        const survivants = joueursPartie.filter(j => j.enVie);
        let options = survivants.map(j => `<option value="${j.nom}">${j.nom}</option>`).join('');

        return `
            <div class="etape-container captain-box" id="bloc-succession">
                <h3 class="captain-title">${t.newCap}</h3>
                <p class="hunter-instruction">${t.capDead}</p>
                <select id="select-nouveau-capitaine">
                    <option value="" disabled selected>${t.selNextCap}</option>
                    ${options}
                </select>
                <button onclick="validerSuccession()" class="btn-principal btn-captain">${t.btnProceedShort}</button>
            </div>
        `;
    }

    window.validerSuccession = function () {
        const t = i18n[currentLang];
        const nouveau = document.getElementById('select-nouveau-capitaine').value;
        if (!nouveau) return alert(t.capMust);

        nomCapitaine = nouveau;
        attenteSuccession = false;
        document.getElementById('bloc-succession').classList.add('cache');

        const msg = `<p class="annonce-succession">🎖️ ${nouveau} ${t.isNewCap}</p>`;

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