// Gerenciador de Interface de Usuário (UI Manager)
// Tela Cheia Full HD, Seleção de Turma, Modais de Missão, Caderno de Projetos e Menus Retrô

class UIManager {
    constructor() {
        this.currentTurmaKey = null;
        this.rpgEngine = null;

        this.screenTurmaSelector = document.getElementById("screenTurmaSelector");
        this.screenGame = document.getElementById("screenGame");
        this.modalMission = document.getElementById("modalMission");
        this.modalCaderno = document.getElementById("modalCaderno");
        this.modalVocabulario = document.getElementById("modalVocabulario");
        this.modalSettings = document.getElementById("modalSettings");
        this.screenVictory = document.getElementById("screenVictory");

        this.initEventListeners();
    }

    init(rpgEngine) {
        this.rpgEngine = rpgEngine;
    }

    initEventListeners() {
        // Seleção de Turma
        document.querySelectorAll(".btn-select-turma").forEach(btn => {
            btn.addEventListener("click", () => {
                const turmaKey = btn.dataset.turma;
                this.selectTurma(turmaKey);
            });
        });

        // Botão de Tela Cheia Full HD
        const btnFullscreen = document.getElementById("btnToggleFullscreen");
        if (btnFullscreen) {
            btnFullscreen.onclick = () => this.toggleFullscreen();
        }

        // Botões do HUD
        const btnVocab = document.getElementById("btnOpenVocabulario");
        if (btnVocab) {
            btnVocab.onclick = () => this.openVocabulario();
        }

        const btnCaderno = document.getElementById("btnOpenCaderno");
        if (btnCaderno) {
            btnCaderno.onclick = () => this.openCaderno();
        }

        const btnSettings = document.getElementById("btnOpenSettings");
        if (btnSettings) {
            btnSettings.onclick = () => this.openSettings();
        }

        const btnBgm = document.getElementById("btnToggleBgm");
        if (btnBgm) {
            btnBgm.onclick = () => {
                const active = window.soundEngine.toggleBgm();
                btnBgm.innerText = active ? "🎵 Música: Ligada" : "🔇 Música: Desligada";
            };
        }

        // Fechar Modais
        document.querySelectorAll(".btn-close-modal").forEach(btn => {
            btn.onclick = () => this.closeAllModals();
        });

        // Pular para o objetivo ao clicar no pergaminho de missão no HUD
        const hudPergaminho = document.getElementById("hudPergaminho");
        if (hudPergaminho) {
            hudPergaminho.onclick = () => {
                if (this.rpgEngine) {
                    this.rpgEngine.checkInteraction();
                }
            };
        }

        // Tecla F11 ou atalho F para tela cheia
        window.addEventListener("keydown", (e) => {
            if (e.key === "f" || e.key === "F") {
                const modalOpen = this.rpgEngine ? this.rpgEngine.isModalOpen : false;
                if (!modalOpen && document.activeElement.tagName !== "INPUT") {
                    this.toggleFullscreen();
                }
            }
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
            const btn = document.getElementById("btnToggleFullscreen");
            if (btn) btn.innerText = "⛶ Sair da Tela Cheia";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            const btn = document.getElementById("btnToggleFullscreen");
            if (btn) btn.innerText = "⛶ Tela Cheia";
        }
    }

    selectTurma(turmaKey) {
        if (!TURMAS_DATA[turmaKey]) return;
        this.currentTurmaKey = turmaKey;
        const turma = TURMAS_DATA[turmaKey];

        if (window.soundEngine) window.soundEngine.playSuccess();

        this.screenTurmaSelector.style.display = "none";
        this.screenGame.style.display = "block";

        const badgeEl = document.getElementById("hudTurmaBadge");
        if (badgeEl) {
            badgeEl.innerText = turma.nome.split(" - ")[0];
            badgeEl.style.borderColor = turma.corTema;
        }

        const cenarioEl = document.getElementById("hudCenarioNome");
        if (cenarioEl) {
            cenarioEl.innerText = `📍 ${turma.cenario}`;
        }

        if (this.rpgEngine) {
            this.rpgEngine.setTurma(turma);
        } else if (window.rpgEngineInstance) {
            this.rpgEngine = window.rpgEngineInstance;
            this.rpgEngine.setTurma(turma);
        } else if (typeof RPGEngine !== 'undefined') {
            this.rpgEngine = new RPGEngine("rpgCanvas");
            window.rpgEngineInstance = this.rpgEngine;
            this.rpgEngine.setTurma(turma);
        }
    }

    openMissionModal(missao) {
        if (!this.modalMission) return;
        this.rpgEngine.isModalOpen = true;
        this.modalMission.style.display = "flex";

        const container = document.getElementById("modalMissionContent");
        window.simulationManager.renderMissionView(missao, container, () => {
            this.onMissionCompleted(missao);
        });
    }

    onMissionCompleted(missao) {
        setTimeout(() => {
            this.closeAllModals();
            this.rpgEngine.advanceMissao();
        }, 1200);
    }

    openCaderno() {
        if (!this.modalCaderno || !this.currentTurmaKey) return;
        const turma = TURMAS_DATA[this.currentTurmaKey];
        const body = document.getElementById("cadernoContent");

        this.rpgEngine.isModalOpen = true;
        this.modalCaderno.style.display = "flex";

        let html = `
            <div class="caderno-book">
                <h2>📖 Diário de Conquistas da Turma: ${turma.nome}</h2>
                <p><em>${turma.subtitulo}</em></p>
                <hr style="margin: 12px 0; border: none; border-top: 2px dashed #b45309;">
                <div class="caderno-grid">
        `;

        turma.missoes.forEach((m, idx) => {
            const isDone = idx < this.rpgEngine.currentMissaoIndex;
            const isCurrent = idx === this.rpgEngine.currentMissaoIndex;

            html += `
                <div class="caderno-phase-card ${isDone ? 'done' : (isCurrent ? 'current' : 'locked')}">
                    <div class="card-status">${isDone ? '✅ Fase Concluída' : (isCurrent ? '⭐ Fase Atual' : '🔒 Bloqueada')}</div>
                    <h3 style="font-size: 14px; margin-bottom: 6px;">${m.icone} ${m.titulo}</h3>
                    <p style="font-size: 13px; color: #475569;"><strong>Tema:</strong> ${m.codigoBNCC}</p>
                    <p style="font-size: 13px; color: #1e293b; margin-top: 4px;">${m.resumo}</p>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
        body.innerHTML = html;
        if (window.soundEngine) window.soundEngine.playSelect();
    }

    openSettings() {
        if (!this.modalSettings) return;
        this.rpgEngine.isModalOpen = true;
        this.modalSettings.style.display = "flex";

        const jumpList = document.getElementById("settingsJumpList");
        if (jumpList && this.currentTurmaKey) {
            const turma = TURMAS_DATA[this.currentTurmaKey];
            jumpList.innerHTML = "";
            turma.missoes.forEach((m, idx) => {
                const btn = document.createElement("button");
                btn.className = "btn-retro sm full-width";
                btn.style.margin = "6px 0";
                btn.innerText = `Ir para Fase ${idx + 1}: ${m.titulo.split(':')[1] || m.titulo}`;
                btn.onclick = () => {
                    this.rpgEngine.currentMissaoIndex = idx;
                    this.rpgEngine.updateHUD();
                    this.closeAllModals();
                    if (window.soundEngine) window.soundEngine.playSelect();
                };
                jumpList.appendChild(btn);
            });
        }
    }

    openVocabulario(targetTermId = null) {
        if (!this.modalVocabulario) return;
        this.rpgEngine.isModalOpen = true;
        this.modalVocabulario.style.display = "flex";

        const container = document.getElementById("vocabularioContent");
        if (!container || !window.VOCABULARIO_FISICO) return;

        let activeCategory = this.currentTurmaKey || "todas";
        let searchTerm = "";

        if (targetTermId) {
            const foundTerm = window.getTermoById ? window.getTermoById(targetTermId) : window.VOCABULARIO_FISICO.find(t => t.id === targetTermId);
            if (foundTerm) {
                activeCategory = foundTerm.categoria;
                searchTerm = foundTerm.termo;
            }
        }

        const renderUI = () => {
            const totalTermos = window.VOCABULARIO_FISICO.length;
            const turmaLabel = this.currentTurmaKey === "ano1" ? "1º Ano" : (this.currentTurmaKey === "ano2" ? "2º Ano" : (this.currentTurmaKey === "ano3" ? "3º Ano" : "Sua Turma"));

            container.innerHTML = `
                <div class="vocab-panel-wrapper">
                    <div class="vocab-panel-header">
                        <div class="vocab-header-left">
                            <span class="vocab-header-badge">📖 Letramento Científico & Interpretação</span>
                            <h2 class="vocab-title">📚 Vocabulário Físico do Cotidiano</h2>
                            <p class="vocab-subtitle">
                                Os conceitos de física traduzidos em palavras fáceis, exemplos práticos que você vê nas ruas e casas, e os mitos comuns desmentidos pela ciência.
                            </p>
                        </div>
                    </div>

                    <!-- Barra de Busca & Filtros Rápidos -->
                    <div class="vocab-toolbar">
                        <div class="vocab-search-wrap">
                            <input type="text" id="inputVocabSearch" class="vocab-search-input" 
                                placeholder="🔍 Digite uma palavra (ex: atrito, empuxo, colisão, convecção, ondas...)" 
                                value="${searchTerm}">
                            ${searchTerm ? '<button id="btnClearSearch" class="btn-clear-search">✖</button>' : ''}
                        </div>
                        <div class="vocab-filter-tabs">
                            <button class="vocab-tab-btn ${activeCategory === 'minha_turma' || activeCategory === this.currentTurmaKey ? 'active' : ''}" data-cat="minha_turma">
                                ⭐ Minha Turma (${turmaLabel})
                            </button>
                            <button class="vocab-tab-btn ${activeCategory === 'ano1' ? 'active' : ''}" data-cat="ano1">
                                🚗 1º Ano (Mecânica & Trânsito)
                            </button>
                            <button class="vocab-tab-btn ${activeCategory === 'ano2' ? 'active' : ''}" data-cat="ano2">
                                ☀️ 2º Ano (Termologia & Calor)
                            </button>
                            <button class="vocab-tab-btn ${activeCategory === 'ano3' ? 'active' : ''}" data-cat="ano3">
                                📡 3º Ano (Ondas & Comunicações)
                            </button>
                            <button class="vocab-tab-btn ${activeCategory === 'todas' ? 'active' : ''}" data-cat="todas">
                                🌐 Todos os Termos (${totalTermos})
                            </button>
                        </div>
                    </div>

                    <!-- Contador de Termos -->
                    <div class="vocab-counter-bar">
                        <span id="vocabCounterTxt">Carregando termos...</span>
                        <span class="vocab-hint-tip">💡 Dica: Você também pode clicar nos termos durante as atividades para abrir a explicação!</span>
                    </div>

                    <!-- Grade de Cartões de Vocabulário -->
                    <div class="vocab-cards-grid" id="vocabCardsGrid"></div>
                </div>
            `;

            const inputSearch = container.querySelector("#inputVocabSearch");
            const btnClear = container.querySelector("#btnClearSearch");
            const cardsGrid = container.querySelector("#vocabCardsGrid");
            const counterTxt = container.querySelector("#vocabCounterTxt");

            const filterAndDisplay = () => {
                const query = inputSearch.value.trim().toLowerCase();
                let filtered = window.VOCABULARIO_FISICO.filter(item => {
                    let matchCat = true;
                    if (activeCategory === "minha_turma") {
                        matchCat = !this.currentTurmaKey || item.categoria === this.currentTurmaKey;
                    } else if (activeCategory !== "todas") {
                        matchCat = item.categoria === activeCategory;
                    }

                    let matchQuery = true;
                    if (query) {
                        const inTermo = item.termo.toLowerCase().includes(query);
                        const inDef = item.definicaoSimples.toLowerCase().includes(query);
                        const inExemplo = item.exemploCotidiano.toLowerCase().includes(query);
                        const inTags = item.tags && item.tags.some(t => t.toLowerCase().includes(query));
                        matchQuery = inTermo || inDef || inExemplo || inTags;
                    }

                    return matchCat && matchQuery;
                });

                counterTxt.innerText = `Mostrando ${filtered.length} termo(s) científico(s)`;

                cardsGrid.innerHTML = "";
                if (filtered.length === 0) {
                    cardsGrid.innerHTML = `
                        <div class="vocab-empty-card">
                            <span style="font-size: 32px;">🔍</span>
                            <h3>Nenhum termo encontrado para "${query}"</h3>
                            <p>Tente buscar por termos como <em>atrito</em>, <em>empuxo</em>, <em>inércia</em>, <em>calor</em>, <em>convecção</em> ou <em>onda</em>, ou selecione a aba 'Todos os Termos'.</p>
                        </div>
                    `;
                    return;
                }

                filtered.forEach(item => {
                    const card = document.createElement("div");
                    card.className = "vocab-term-card";
                    card.id = `vocabCard_${item.id}`;
                    if (targetTermId && item.id === targetTermId) {
                        card.classList.add("highlighted-term");
                    }

                    card.innerHTML = `
                        <div class="vocab-card-header">
                            <div class="vocab-card-title-group">
                                <span class="vocab-card-icon">${item.icone}</span>
                                <div>
                                    <h3 class="vocab-card-term">${item.termo}</h3>
                                    <span class="vocab-card-category-badge cat-${item.categoria}">${item.turmaNome}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Definição Simples / Letramento -->
                        <div class="vocab-section-box def-box">
                            <div class="vocab-section-label">💡 O Que Significa em Palavras Simples?</div>
                            <p class="vocab-section-text">${item.definicaoSimples}</p>
                        </div>

                        <!-- Exemplo do Dia a Dia -->
                        <div class="vocab-section-box example-box">
                            <div class="vocab-section-label">🔍 Onde Você Vê Isso no Jogo e na Vida Real?</div>
                            <p class="vocab-section-text">${item.exemploCotidiano}</p>
                        </div>

                        <!-- Mito Popular Desmentido -->
                        <div class="vocab-section-box myth-box">
                            <div class="vocab-section-label">⚠️ Mito Comum que as Pessoas Confundem:</div>
                            <p class="vocab-section-text">${item.mitoComum}</p>
                        </div>

                        <!-- Tags -->
                        <div class="vocab-tags-row">
                            ${(item.tags || []).slice(0, 5).map(t => `<span class="vocab-tag-pill">#${t}</span>`).join('')}
                        </div>
                    `;
                    cardsGrid.appendChild(card);
                });

                if (targetTermId) {
                    const targetEl = document.getElementById(`vocabCard_${targetTermId}`);
                    if (targetEl) {
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 200);
                    }
                }
            };

            filterAndDisplay();

            inputSearch.oninput = () => {
                searchTerm = inputSearch.value;
                filterAndDisplay();
            };

            if (btnClear) {
                btnClear.onclick = () => {
                    inputSearch.value = "";
                    searchTerm = "";
                    targetTermId = null;
                    filterAndDisplay();
                };
            }

            container.querySelectorAll(".vocab-tab-btn").forEach(btn => {
                btn.onclick = () => {
                    activeCategory = btn.dataset.cat;
                    container.querySelectorAll(".vocab-tab-btn").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    if (window.soundEngine) window.soundEngine.playDial();
                    filterAndDisplay();
                };
            });
        };

        renderUI();
        if (window.soundEngine) window.soundEngine.playSelect();
    }

    closeAllModals() {
        if (this.modalMission) this.modalMission.style.display = "none";
        if (this.modalCaderno) this.modalCaderno.style.display = "none";
        if (this.modalVocabulario) this.modalVocabulario.style.display = "none";
        if (this.modalSettings) this.modalSettings.style.display = "none";
        if (this.rpgEngine) {
            this.rpgEngine.isModalOpen = false;
        }
        window.simulationManager.stopCurrent();
    }

    showVictoryScreen(turma) {
        if (this.screenGame) this.screenGame.style.display = "none";
        if (this.screenVictory) {
            this.screenVictory.style.display = "flex";
            const badgeEl = document.getElementById("victoryBadgeTitle");
            const turmaEl = document.getElementById("victoryTurmaNome");

            if (badgeEl) badgeEl.innerText = turma.badge;
            if (turmaEl) turmaEl.innerText = turma.nome;
            if (window.soundEngine) window.soundEngine.playSuccess();
        }
    }

    returnToClassSelection() {
        if (this.screenVictory) this.screenVictory.style.display = "none";
        if (this.screenGame) this.screenGame.style.display = "none";
        if (this.screenTurmaSelector) this.screenTurmaSelector.style.display = "flex";
        this.closeAllModals();
    }
}

window.uiManager = new UIManager();
